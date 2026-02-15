import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs, blogPosts, contentQueue } from "@/lib/db";
import {
  generateBlogPostText,
  generateBlogPostImages,
  autoSelectTopic,
} from "@/lib/pipeline/content-generator";
import { createPost, publishPost, getPostById } from "@/lib/pipeline/blog-service";
import { sendPostPublishedNotification } from "@/lib/resend";
import type { AiModel } from "@/lib/pipeline/ai-provider";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

// Uses fire-and-forget pattern with `after()` to avoid Netlify CDN timeout:
//
// phase "text"    → Creates job, returns jobId immediately, generates in background
// phase "status"  → Poll job status (pending → processing → completed/failed)
// phase "images"  → Generate images for an existing postId (sync, ~20s per image)
// phase "publish" → Publish an existing postId (sync, ~2s)

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      phase = "text",
      jobId,
      postId,
      topic: rawTopic,
      model = "claude-haiku",
    } = body as {
      type: string;
      phase?: "text" | "status" | "images" | "publish";
      jobId?: string;
      postId?: string;
      topic?: string;
      model?: AiModel;
    };

    if (type !== "blog-post") {
      return NextResponse.json(
        { error: "Currently only type 'blog-post' is supported" },
        { status: 400 }
      );
    }

    switch (phase) {
      case "status":
        return handleStatusPhase(jobId);
      case "images":
        return handleImagesPhase(postId);
      case "publish":
        return handlePublishPhase(postId);
      case "text":
      default:
        return handleTextPhase(rawTopic, model);
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

// Phase 1: Create job → return immediately → generate in background via after()
async function handleTextPhase(rawTopic: string | undefined, model: AiModel) {
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
      ? autoSelectTopic(recentScrapes)
      : rawTopic;

  const scrapeContext = recentScrapes
    .map((s) => s.result)
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 4000);

  // Create a job in contentQueue
  const [job] = await db
    .insert(contentQueue)
    .values({
      type: "blog-post",
      status: "pending",
      priority: 0,
      input: JSON.stringify({ topic, scrapeContext: scrapeContext || null }),
      aiModel: model,
    })
    .returning();

  // Run generation in the background AFTER response is sent
  after(async () => {
    try {
      // Mark as processing
      await db
        .update(contentQueue)
        .set({ status: "processing", attempts: job.attempts + 1 })
        .where(eq(contentQueue.id, job.id));

      // Generate text
      const generated = await generateBlogPostText(topic, scrapeContext || null, model as AiModel);

      // Save blog post
      const post = await createPost({
        slug: generated.slug,
        language: "en",
        title: generated.title,
        excerpt: generated.excerpt,
        content: generated.content,
        metaTitle: generated.metaTitle,
        metaDescription: generated.metaDescription,
        category: generated.category,
        tags: generated.tags,
        featuredImage: null,
        aiModel: model,
        aiPrompt: topic,
        sourceData: scrapeContext || null,
        published: false,
      });

      // Mark job as completed
      await db
        .update(contentQueue)
        .set({
          status: "completed",
          output: JSON.stringify({
            postId: post.id,
            slug: post.slug,
            title: post.title,
          }),
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, job.id));

      console.log(`Blog post generated: "${post.title}" (${post.id})`);
    } catch (error) {
      console.error("Background generation failed:", error);
      await db
        .update(contentQueue)
        .set({
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, job.id));
    }
  });

  // Return immediately — generation runs in background
  return NextResponse.json({
    jobId: job.id,
    topic,
    status: "pending",
    message: "Generation started. Poll with phase=status&jobId=... to check progress.",
  });
}

// Poll job status
async function handleStatusPhase(jobId: string | undefined) {
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
  }

  if (job.status === "failed") {
    result.error = job.error;
  }

  return NextResponse.json(result);
}

// Generate images for an existing draft post
async function handleImagesPhase(postId: string | undefined) {
  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

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
    category: (post.category || "guide") as "news" | "guide" | "comparison" | "deal",
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

// Publish an existing draft post
async function handlePublishPhase(postId: string | undefined) {
  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
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
