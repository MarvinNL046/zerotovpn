import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs, blogPosts, contentQueue } from "@/lib/db";
import { autoSelectTopic } from "@/lib/pipeline/content-generator";
import { publishPost, getPostById } from "@/lib/pipeline/blog-service";
import { sendPostPublishedNotification } from "@/lib/resend";
import type { AiModel } from "@/lib/pipeline/ai-provider";

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
    } = body as {
      type: string;
      phase?: "start" | "status" | "images" | "publish";
      jobId?: string;
      postId?: string;
      topic?: string;
      model?: AiModel;
      publish?: boolean;
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
        return handleStart(request, rawTopic, model, publish);
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

// Create a job and trigger the Netlify Background Function
async function handleStart(
  request: NextRequest,
  rawTopic: string | undefined,
  model: AiModel,
  publish: boolean
) {
  const db = getDb();

  // Resolve topic
  const recentScrapes = await db
    .select()
    .from(scrapeJobs)
    .where(eq(scrapeJobs.status, "completed"))
    .orderBy(desc(scrapeJobs.createdAt))
    .limit(5);

  const topic =
    !rawTopic || rawTopic === "auto"
      ? await autoSelectTopic(recentScrapes)
      : rawTopic;

  // Create job in contentQueue
  const [job] = await db
    .insert(contentQueue)
    .values({
      type: "blog-post",
      status: "pending",
      priority: 0,
      input: JSON.stringify({ topic, publish }),
      aiModel: model,
    })
    .returning();

  // Trigger the background generation route (fire-and-forget; Vercel Pro maxDuration=300)
  const siteUrl = process.env.SITE_URL || process.env.URL || "";
  const pipelineKey = process.env.PIPELINE_SECRET || "";

  try {
    const bgRes = await fetch(`${siteUrl}/api/pipeline/generate-background`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pipeline-key": pipelineKey,
      },
      body: JSON.stringify({
        topic,
        model,
        publish,
        jobId: job.id,
      }),
    });
    console.log(`[generate] Background function triggered: ${bgRes.status}`);
  } catch (err) {
    console.error("[generate] Failed to trigger background function:", err);
  }

  return NextResponse.json({
    jobId: job.id,
    topic,
    status: "pending",
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
