import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs, blogPosts } from "@/lib/db";
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

// Split into phases to avoid Netlify CDN timeout (~26s inactivity):
// phase "text"   → Generate AI text, save as draft → returns { postId }
// phase "images" → Generate images for postId → returns { updated: true }
// phase "publish"→ Publish postId → returns { published: true }
// (no phase)     → Legacy: text-only without images, for quick generation

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      phase,
      postId,
      topic: rawTopic,
      model = "claude-haiku",
      publish = false,
    } = body as {
      type: string;
      phase?: "text" | "images" | "publish";
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

    // Phase: generate images for an existing post
    if (phase === "images") {
      if (!postId) {
        return NextResponse.json({ error: "postId is required for images phase" }, { status: 400 });
      }
      return handleImagesPhase(postId);
    }

    // Phase: publish an existing post
    if (phase === "publish") {
      if (!postId) {
        return NextResponse.json({ error: "postId is required for publish phase" }, { status: 400 });
      }
      return handlePublishPhase(postId);
    }

    // Phase: generate text (default / "text" phase)
    return handleTextPhase(rawTopic, model, publish, phase === undefined);
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

// Phase 1: Generate blog post text via AI, save as draft
async function handleTextPhase(
  rawTopic: string | undefined,
  model: AiModel,
  publish: boolean,
  legacy: boolean
) {
  const db = getDb();
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

  const generated = await generateBlogPostText(topic, scrapeContext || null, model);

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

  // Legacy mode (no phase): also publish if requested
  if (legacy && publish) {
    await publishPost(post.id);
  }

  return NextResponse.json({
    postId: post.id,
    slug: post.slug,
    title: post.title,
    topic,
    status: legacy && publish ? "published" : "draft",
  });
}

// Phase 2: Generate images for an existing draft post
async function handleImagesPhase(postId: string) {
  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, postId))
    .limit(1);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Build a GeneratedPost-like object for image generation
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

  // Update the post with generated images
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

// Phase 3: Publish an existing draft post
async function handlePublishPhase(postId: string) {
  const post = await getPostById(postId);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await publishPost(postId);

  // Send email notification (non-blocking)
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
