import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, scrapeJobs } from "@/lib/db";
import {
  generateBlogPostText,
  generateBlogPostImages,
  autoSelectTopic,
} from "@/lib/pipeline/content-generator";
import { createPost, publishPost } from "@/lib/pipeline/blog-service";
import { sendPostPublishedNotification } from "@/lib/resend";
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

  let body: {
    type: string;
    topic?: string;
    model?: AiModel;
    publish?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    type,
    topic: rawTopic,
    model = "claude-haiku",
    publish = false,
  } = body;

  if (type !== "blog-post") {
    return NextResponse.json(
      { error: "Currently only type 'blog-post' is supported" },
      { status: 400 }
    );
  }

  // Use streaming response to keep Netlify CDN connection alive
  // during the long AI generation + image generation process
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
      };

      try {
        send({ step: "init", message: "Starting blog generation..." });

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

        send({ step: "topic", message: `Topic: ${topic}` });

        // Build scrape context for the AI
        const scrapeContext = recentScrapes
          .map((s) => s.result)
          .filter(Boolean)
          .join("\n\n")
          .slice(0, 4000);

        // Step 1: Generate blog post text via AI
        send({ step: "generating-text", message: `Generating text with ${model}...` });
        const post = await generateBlogPostText(topic, scrapeContext || null, model);
        send({ step: "text-done", message: `Text generated: "${post.title}"` });

        // Step 2: Generate images (featured + infographics) — each sends a keepalive
        send({ step: "generating-images", message: "Generating images..." });
        await generateBlogPostImages(post, (progress) => {
          send({ step: "image-progress", message: progress });
        });
        send({ step: "images-done", message: "Images generated" });

        // Step 3: Save to database
        send({ step: "saving", message: "Saving to database..." });
        const savedPost = await createPost({
          slug: post.slug,
          language: "en",
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          category: post.category,
          tags: post.tags,
          featuredImage: post.featuredImage ?? null,
          aiModel: model,
          aiPrompt: topic,
          sourceData: scrapeContext || null,
          published: false,
        });

        // Step 4: Optionally publish
        if (publish) {
          await publishPost(savedPost.id);
          send({ step: "published", message: "Post published" });

          // Send email notification (non-blocking)
          sendPostPublishedNotification({
            title: savedPost.title,
            slug: savedPost.slug,
            category: post.category,
            excerpt: post.excerpt,
          }).catch((err) => console.warn("Notification email failed:", err));
        }

        // Final result line
        send({
          step: "completed",
          postId: savedPost.id,
          slug: savedPost.slug,
          title: savedPost.title,
          status: publish ? "published" : "draft",
        });
      } catch (error) {
        console.error("Pipeline generate error:", error);
        send({
          step: "error",
          error: "Generation failed",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
