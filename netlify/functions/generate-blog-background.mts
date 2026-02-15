// Netlify Background Function for blog generation
// The "-background" suffix makes Netlify return 202 immediately
// and run this function for up to 15 minutes in the background.
// This bypasses the CDN's ~26s timeout completely.

import type { Context } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

// --- Inline schema (can't import from src/ in Netlify functions) ---

const contentQueue = pgTable(
  "ContentQueue",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    type: text("type").notNull(),
    status: text("status").notNull().default("pending"),
    priority: integer("priority").default(0).notNull(),
    input: text("input").notNull(),
    output: text("output"),
    aiModel: text("aiModel").notNull(),
    error: text("error"),
    attempts: integer("attempts").default(0).notNull(),
    maxAttempts: integer("maxAttempts").default(3).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    processedAt: timestamp("processedAt"),
  },
  (table) => [
    index("ContentQueue_status_priority_idx").on(table.status, table.priority),
  ]
);

const scrapeJobs = pgTable("ScrapeJob", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type").notNull(),
  status: text("status").notNull().default("pending"),
  source: text("source").notNull(),
  vpnSlug: text("vpnSlug"),
  result: text("result"),
  error: text("error"),
  startedAt: timestamp("startedAt").notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

const blogPosts = pgTable(
  "BlogPost",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    language: text("language").notNull().default("en"),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    category: text("category"),
    tags: text("tags")
      .array()
      .default([])
      .notNull(),
    featuredImage: text("featuredImage"),
    aiModel: text("aiModel"),
    aiPrompt: text("aiPrompt"),
    sourceData: text("sourceData"),
    published: boolean("published").default(false).notNull(),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    index("BlogPost_slug_language_idx").on(table.slug, table.language),
    index("BlogPost_published_idx").on(
      table.language,
      table.published,
      table.category
    ),
  ]
);

// --- Helpers ---

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return drizzle(neon(url));
}

type AiModel = "claude-haiku" | "gpt-5-nano";

async function callClaude(
  prompt: string,
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const block = data.content?.find(
    (b: { type: string }) => b.type === "text"
  );
  if (!block?.text) throw new Error("No text in Claude response");
  return block.text;
}

async function callOpenAI(
  prompt: string,
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-nano-2025-08-07",
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function generateAI(
  prompt: string,
  model: AiModel,
  maxTokens = 4096,
  temperature = 0.7
): Promise<string> {
  return model === "claude-haiku"
    ? callClaude(prompt, maxTokens, temperature)
    : callOpenAI(prompt, maxTokens, temperature);
}

function autoSelectTopic(
  scrapeData: Array<{ type: string; result: string | null }>
): string {
  const hasPricing = scrapeData.some((d) => d.type === "pricing" && d.result);
  const hasNews = scrapeData.some((d) => d.type === "news" && d.result);

  if (hasPricing) return "VPN Price Comparison Update: Best Deals This Month";
  if (hasNews) return "This Week in VPN: Latest News and Security Updates";

  const topics = [
    "Best Free VPNs That Actually Work in 2026",
    "VPN Speed Test Results: Which VPN Is Fastest?",
    "How to Choose the Right VPN for Streaming",
    "Top 5 VPNs for Privacy-Conscious Users",
    "VPN Security Features Explained: What Really Matters",
  ];
  const week = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  return topics[week % topics.length];
}

function detectPostType(
  topic: string
): "news" | "comparison" | "deal" | "guide" {
  const lower = topic.toLowerCase();
  if (lower.includes("deal") || lower.includes("price") || lower.includes("discount"))
    return "deal";
  if (lower.includes("vs") || lower.includes("comparison")) return "comparison";
  if (lower.includes("news") || lower.includes("update") || lower.includes("week in"))
    return "news";
  return "guide";
}

function buildPrompt(
  topic: string,
  postType: string,
  scrapeData: string | null
): string {
  const ctx = scrapeData
    ? `\nREFERENCE DATA:\n${scrapeData.slice(0, 3000)}\n`
    : "";

  return `You are a senior VPN expert writer for ZeroToVPN.com.

Write a blog post about: "${topic}"
Type: ${postType}

STRUCTURE:
1. Hook intro paragraph (2-3 sentences)
2. Key Takeaways table (5-7 Q&A rows in HTML)
3. 5-6 numbered H2 sections, each with 1-2 paragraphs and bullet points
4. 1 comparison table
5. 1 "Did You Know?" callout
6. Conclusion with CTA

Include 6-8 internal links to: /reviews/nordvpn, /reviews/surfshark, /reviews/expressvpn, /best/best-vpn, /best/free-vpn, /compare, /deals, /guides/what-is-vpn (use https://zerotovpn.com prefix).
Include 2-3 external links to credible sources.
Use <strong> for emphasis. Write 800-1200 words.
${ctx}
Respond ONLY with JSON (no markdown blocks):
{
  "title": "Title Here",
  "slug": "url-slug-here",
  "excerpt": "1-2 sentence excerpt (max 160 chars)",
  "content": "Full HTML content",
  "metaTitle": "SEO title (max 60 chars)",
  "metaDescription": "Meta description (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3"]
}`;
}

function parsePost(raw: string, postType: string) {
  let json = raw.trim();
  json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```\s*$/, "");
  const match = json.match(/\{[\s\S]*\}/);
  if (match) json = match[0];

  try {
    const p = JSON.parse(json);
    return {
      title: p.title || "Untitled",
      slug:
        p.slug ||
        (p.title || "post")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 80),
      excerpt: (p.excerpt || "").slice(0, 160),
      content: p.content || "",
      metaTitle: (p.metaTitle || p.title || "").slice(0, 60),
      metaDescription: (p.metaDescription || "").slice(0, 155),
      category: postType,
      tags: Array.isArray(p.tags) ? p.tags : [],
    };
  } catch {
    return {
      title: "Generated Post",
      slug: "generated-post-" + Date.now(),
      excerpt: raw.slice(0, 155),
      content: raw,
      metaTitle: "Generated Post",
      metaDescription: raw.slice(0, 155),
      category: postType,
      tags: [],
    };
  }
}

// --- Main handler ---

export default async function handler(req: Request, _context: Context) {
  // Validate pipeline key
  const key =
    req.headers.get("x-pipeline-key") || req.headers.get("x-admin-key");
  if (key !== process.env.PIPELINE_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const {
    topic: rawTopic,
    model = "claude-haiku",
    publish = false,
    jobId: existingJobId,
  } = body as {
    topic?: string;
    model?: AiModel;
    publish?: boolean;
    jobId?: string;
  };

  const db = getDb();

  try {
    console.log("[bg-generate] Starting blog generation...");

    // Get latest scrape data
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

    console.log(`[bg-generate] Topic: ${topic}, Model: ${model}`);

    // Update job status if we have one
    if (existingJobId) {
      await db
        .update(contentQueue)
        .set({ status: "processing" })
        .where(eq(contentQueue.id, existingJobId));
    }

    // Build context
    const scrapeContext = recentScrapes
      .map((s) => s.result)
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000);

    // Generate text
    const postType = detectPostType(topic);
    const prompt = buildPrompt(topic, postType, scrapeContext || null);
    console.log("[bg-generate] Calling AI...");
    const rawResponse = await generateAI(prompt, model, 4096, 0.7);
    console.log("[bg-generate] AI response received");

    const parsed = parsePost(rawResponse, postType);

    // Save to database
    const [post] = await db
      .insert(blogPosts)
      .values({
        slug: parsed.slug,
        language: "en",
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        category: parsed.category,
        tags: parsed.tags,
        featuredImage: null,
        aiModel: model,
        aiPrompt: topic,
        sourceData: scrapeContext || null,
        published: false,
      })
      .returning();

    console.log(`[bg-generate] Post saved: ${post.id} "${post.title}"`);

    // Publish if requested
    if (publish) {
      await db
        .update(blogPosts)
        .set({ published: true, publishedAt: new Date() })
        .where(eq(blogPosts.id, post.id));
      console.log("[bg-generate] Post published");
    }

    // Update job if we have one
    if (existingJobId) {
      await db
        .update(contentQueue)
        .set({
          status: "completed",
          output: JSON.stringify({
            postId: post.id,
            slug: post.slug,
            title: post.title,
            published: publish,
          }),
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, existingJobId));
    }

    console.log("[bg-generate] Done!");
  } catch (error) {
    console.error("[bg-generate] Failed:", error);

    if (existingJobId) {
      await db
        .update(contentQueue)
        .set({
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, existingJobId))
        .catch(() => {});
    }
  }
}

export const config = {
  path: "/.netlify/functions/generate-blog-background",
};
