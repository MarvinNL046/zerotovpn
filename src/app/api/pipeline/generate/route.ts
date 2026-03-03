import { NextRequest, NextResponse } from "next/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs, blogPosts, contentQueue } from "@/lib/db";
import { autoSelectTopic } from "@/lib/pipeline/content-generator";
import { publishPost, getPostById } from "@/lib/pipeline/blog-service";
import { sendPostPublishedNotification } from "@/lib/resend";
import type { AiModel } from "@/lib/pipeline/ai-provider";

export const maxDuration = 60;

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

// Phases:
// "start"   → Create job, trigger background function → { jobId }
// "status"  → Poll job status → { status, postId?, error? }
// "images"  → Generate images for postId (sync) → { updated }
// "publish" → Publish postId (sync) → { published }

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      phase = "start",
      jobId,
      postId,
      topic: rawTopic,
      model = "claude-haiku",
      publish = false,
      factCheck = true,
      queueFixes = true,
      autoApplyFixes = true,
    } = body as {
      type: string;
      phase?: "start" | "status" | "images" | "publish";
      jobId?: string;
      postId?: string;
      topic?: string;
      model?: AiModel;
      publish?: boolean;
      factCheck?: boolean;
      queueFixes?: boolean;
      autoApplyFixes?: boolean;
    };

    if (type !== "blog-post") {
      return NextResponse.json(
        { error: "Currently only type 'blog-post' is supported" },
        { status: 400 }
      );
    }

    switch (phase) {
      case "status":
        return handleStatus(jobId);
      case "images":
        return handleImages(postId);
      case "publish":
        return handlePublish(postId);
      case "start":
      default:
        return handleStart(
          request,
          rawTopic,
          model,
          publish,
          factCheck,
          queueFixes,
          autoApplyFixes
        );
    }
  } catch (error) {
    console.error("Pipeline generate error:", error);
    return NextResponse.json(
      {
        error: "Generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Create a job and trigger the Vercel background route
async function handleStart(
  request: NextRequest,
  rawTopic: string | undefined,
  model: AiModel,
  publish: boolean,
  factCheck: boolean,
  queueFixes: boolean,
  autoApplyFixes: boolean
) {
  const db = getDb();

  let topic = rawTopic && rawTopic !== "auto" ? rawTopic : "";
  let jobId: string | null = null;
  let topicSource: "manual" | "queue" | "auto" =
    rawTopic && rawTopic !== "auto" ? "manual" : "auto";

  let resolvedPublish = publish;
  let resolvedFactCheck = factCheck;
  let resolvedQueueFixes = queueFixes;
  let resolvedAutoApplyFixes = autoApplyFixes;

  if (!rawTopic || rawTopic === "auto") {
    const queuedItems = await db
      .select({
        id: contentQueue.id,
        input: contentQueue.input,
      })
      .from(contentQueue)
      .where(
        and(
          eq(contentQueue.type, "blog-post"),
          eq(contentQueue.status, "pending")
        )
      )
      .orderBy(desc(contentQueue.priority), asc(contentQueue.createdAt))
      .limit(20);

    for (const item of queuedItems) {
      let parsed: Record<string, unknown> | null = null;
      try {
        parsed = JSON.parse(item.input) as Record<string, unknown>;
      } catch {
        parsed = null;
      }
      if (!parsed) continue;

      const queuedTopic =
        typeof parsed.topic === "string" ? parsed.topic.trim() : "";
      if (!queuedTopic) continue;

      topic = queuedTopic;
      jobId = item.id;
      topicSource = "queue";

      if (typeof parsed.publish === "boolean") {
        resolvedPublish = parsed.publish;
      }
      if (typeof parsed.factCheck === "boolean") {
        resolvedFactCheck = parsed.factCheck;
      }
      if (typeof parsed.queueFixes === "boolean") {
        resolvedQueueFixes = parsed.queueFixes;
      }
      if (typeof parsed.autoApplyFixes === "boolean") {
        resolvedAutoApplyFixes = parsed.autoApplyFixes;
      }
      break;
    }
  }

  if (!topic) {
    const recentScrapes = await db
      .select()
      .from(scrapeJobs)
      .where(eq(scrapeJobs.status, "completed"))
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(5);
    topic = await autoSelectTopic(recentScrapes);
    topicSource = "auto";
  }

  if (!jobId) {
    const [job] = await db
      .insert(contentQueue)
      .values({
        type: "blog-post",
        status: "pending",
        priority: 0,
        input: JSON.stringify({
          topic,
          publish: resolvedPublish,
          factCheck: resolvedFactCheck,
          queueFixes: resolvedQueueFixes,
          autoApplyFixes: resolvedAutoApplyFixes,
        }),
        aiModel: model,
      })
      .returning();
    jobId = job.id;
  }

  // Fire-and-forget: trigger background route without waiting for response
  const siteUrl = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") || "";
  const pipelineKey = process.env.PIPELINE_SECRET || "";

  fetch(`${siteUrl}/api/pipeline/generate-background`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pipeline-key": pipelineKey,
    },
    body: JSON.stringify({
      topic,
      model,
      publish: resolvedPublish,
      factCheck: resolvedFactCheck,
      queueFixes: resolvedQueueFixes,
      autoApplyFixes: resolvedAutoApplyFixes,
      jobId,
    }),
  }).then(res => {
    console.log(`[generate] Background function triggered: ${res.status}`);
  }).catch(err => {
    console.error("[generate] Failed to trigger background function:", err);
  });

  return NextResponse.json({
    jobId,
    topic,
    status: "pending",
    topicSource,
    factCheckEnabled: resolvedFactCheck,
    queueFixesEnabled: resolvedQueueFixes,
    autoApplyFixesEnabled: resolvedAutoApplyFixes,
  });
}

// Poll job status
async function handleStatus(jobId: string | undefined) {
  if (!jobId) {
    return NextResponse.json({ error: "jobId is required" }, { status: 400 });
  }

  const db = getDb();
  const [job] = await db
    .select()
    .from(contentQueue)
    .where(eq(contentQueue.id, jobId))
    .limit(1);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const result: Record<string, unknown> = {
    jobId: job.id,
    status: job.status,
  };

  if (job.status === "completed" && job.output) {
    const output = JSON.parse(job.output);
    result.postId = output.postId;
    result.slug = output.slug;
    result.title = output.title;
    result.published = output.published;
    if (output.factCheck) {
      result.factCheck = output.factCheck;
    }
  }

  if (job.status === "failed") {
    result.error = job.error;
  }

  return NextResponse.json(result);
}

// Generate images for an existing post (sync — each image ~15-20s)
async function handleImages(postId: string | undefined) {
  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }

  // Dynamic import to avoid loading image gen code for other phases
  const { generateBlogPostImages } = await import(
    "@/lib/pipeline/content-generator"
  );

  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, postId))
    .limit(1);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const generatedPost = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content,
    metaTitle: post.metaTitle || "",
    metaDescription: post.metaDescription || "",
    category: (post.category || "guide") as
      | "news"
      | "guide"
      | "comparison"
      | "deal",
    tags: post.tags || [],
    featuredImage: post.featuredImage ?? undefined,
  };

  await generateBlogPostImages(generatedPost);

  await db
    .update(blogPosts)
    .set({
      content: generatedPost.content,
      featuredImage: generatedPost.featuredImage ?? null,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, postId));

  return NextResponse.json({
    postId,
    updated: true,
    hasFeaturedImage: !!generatedPost.featuredImage,
  });
}

// Publish a post
async function handlePublish(postId: string | undefined) {
  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }

  const post = await getPostById(postId);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await publishPost(postId);

  sendPostPublishedNotification({
    title: post.title,
    slug: post.slug,
    category: post.category || "guide",
    excerpt: post.excerpt || "",
  }).catch((err) => console.warn("Notification email failed:", err));

  return NextResponse.json({
    postId,
    slug: post.slug,
    title: post.title,
    published: true,
  });
}
