import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs } from "@/lib/db";
import {
  generateBlogPost,
  autoSelectTopic,
} from "@/lib/pipeline/content-generator";
import { createPost, publishPost } from "@/lib/pipeline/blog-service";
import type { AiModel } from "@/lib/pipeline/ai-provider";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      topic: rawTopic,
      model = "claude-haiku",
      publish = false,
    } = body as {
      type: string;
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

    // Get latest scrape data for context
    const db = getDb();
    const recentScrapes = await db
      .select()
      .from(scrapeJobs)
      .where(eq(scrapeJobs.status, "completed"))
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(5);

    // Auto-select topic if "auto" or not provided
    const topic =
      !rawTopic || rawTopic === "auto"
        ? autoSelectTopic(recentScrapes)
        : rawTopic;

    // Build scrape context for the AI
    const scrapeContext = recentScrapes
      .map((s) => s.result)
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000);

    // Generate the blog post
    const generated = await generateBlogPost(
      topic,
      scrapeContext || null,
      model
    );

    // Save to database
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
      featuredImage: generated.featuredImage ?? null,
      aiModel: model,
      aiPrompt: topic,
      sourceData: scrapeContext || null,
      published: false,
    });

    // Optionally publish immediately
    if (publish) {
      await publishPost(post.id);
    }

    return NextResponse.json({
      postId: post.id,
      slug: post.slug,
      title: post.title,
      status: publish ? "published" : "draft",
    });
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
