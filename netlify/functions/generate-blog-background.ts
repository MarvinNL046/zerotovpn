// Netlify Background Function (v1 format) for blog generation.
// The "-background" suffix + v1 Handler export makes Netlify
// return 202 immediately and run this for up to 15 minutes.

import type { Handler } from "@netlify/functions";
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

// --- Inline schema (Netlify functions can't import from src/) ---

const contentQueue = pgTable(
  "ContentQueue",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
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
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
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
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    language: text("language").notNull().default("en"),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    category: text("category"),
    tags: text("tags").array().default([]).notNull(),
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
    index("BlogPost_published_idx").on(table.language, table.published, table.category),
  ]
);

// --- Helpers ---

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return drizzle(neon(url));
}

type AiModel = "claude-haiku" | "gpt-5-nano";

async function callClaude(prompt: string, maxTokens: number, temperature: number): Promise<string> {
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
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  if (!block?.text) throw new Error("No text in Claude response");
  return block.text;
}

async function callOpenAI(prompt: string, maxTokens: number, temperature: number): Promise<string> {
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

async function generateAI(prompt: string, model: AiModel): Promise<string> {
  return model === "claude-haiku"
    ? callClaude(prompt, 16384, 0.7)
    : callOpenAI(prompt, 16384, 0.7);
}

function autoSelectTopic(scrapeData: Array<{ type: string; result: string | null }>): string {
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
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return topics[week % topics.length];
}

function detectPostType(topic: string): "news" | "comparison" | "deal" | "guide" {
  const lower = topic.toLowerCase();
  if (lower.includes("deal") || lower.includes("price") || lower.includes("discount")) return "deal";
  if (lower.includes("vs") || lower.includes("comparison")) return "comparison";
  if (lower.includes("news") || lower.includes("update") || lower.includes("week in")) return "news";
  return "guide";
}

function buildPrompt(topic: string, postType: string, scrapeData: string | null): string {
  const typeInstructions: Record<string, string> = {
    news: "Write a VPN news roundup. Cover 3-4 developments with analysis.",
    comparison: "Write a VPN comparison. Include main comparison table and per-VPN analysis.",
    deal: "Write a VPN deals roundup. Show original vs deal price with savings percentage.",
    guide: "Write an in-depth VPN guide with step-by-step instructions.",
  };

  const ctx = scrapeData ? `\nREFERENCE DATA (use for accuracy):\n${scrapeData.slice(0, 3000)}\n` : "";

  return `You are a senior VPN expert writer for ZeroToVPN.com, an independent VPN comparison site.
Your team has tested 50+ VPN services. Write from first-hand experience.

Write a comprehensive blog post about: "${topic}"

${typeInstructions[postType] || typeInstructions.guide}

STRUCTURE:
1. Hook intro (2-3 sentences with a stat). Bold the main keyword.
2. Key Takeaways table: <h2>Key Takeaways</h2><table> with 5-7 Q&A rows.
3. 10-11 numbered H2 sections, each with 2 paragraphs + H3 subheadings + bullet lists.
4. 2-3 "Did You Know?" callouts with sources.
5. At least 1 comparison table.
6. Conclusion with CTA and trust statement.

INTERNAL LINKS (include 8-12, use https://zerotovpn.com prefix):
/reviews/nordvpn, /reviews/surfshark, /reviews/expressvpn, /reviews/cyberghost, /reviews/protonvpn,
/best/best-vpn, /best/free-vpn, /best/vpn-streaming, /best/vpn-cheap, /best/vpn-netflix,
/compare, /deals, /coupons, /speed-test, /quiz,
/guides/what-is-vpn, /guides/how-vpn-works, /guides/vpn-protocols-explained,
/blog/is-vpn-legal, /blog/vpn-vs-proxy

EXTERNAL LINKS (3-5 credible sources):
statista.com, security.org, top10vpn.com, comparitech.com, freedomhouse.org, cisa.gov, eff.org

E-E-A-T: Use "we tested", "our analysis shows", cite sources for every stat, mention downsides too.
Target 1800-2500 words. Use <strong> for emphasis. All links use full absolute URLs.
${ctx}
Respond ONLY with JSON (no markdown blocks):
{
  "title": "Title Here",
  "slug": "url-slug",
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
      slug: p.slug || slugify(p.title || "post"),
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
      excerpt: raw.replace(/<[^>]+>/g, "").slice(0, 155),
      content: raw,
      metaTitle: "Generated Post",
      metaDescription: raw.replace(/<[^>]+>/g, "").slice(0, 155),
      category: postType,
      tags: [],
    };
  }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

// --- Handler (v1 format for background function support) ---

const handler: Handler = async (event) => {
  // Validate
  const key = event.headers["x-pipeline-key"] || event.headers["x-admin-key"];
  if (key !== process.env.PIPELINE_SECRET) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const body = JSON.parse(event.body || "{}");
  const {
    topic: rawTopic,
    model = "claude-haiku",
    publish = false,
    jobId,
  } = body as {
    topic?: string;
    model?: AiModel;
    publish?: boolean;
    jobId?: string;
  };

  const db = getDb();

  try {
    console.log("[bg-generate] Starting, jobId:", jobId);

    // Mark job as processing
    if (jobId) {
      await db.update(contentQueue).set({ status: "processing", attempts: 1 }).where(eq(contentQueue.id, jobId));
    }

    // Get scrape data
    const recentScrapes = await db
      .select()
      .from(scrapeJobs)
      .where(eq(scrapeJobs.status, "completed"))
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(5);

    const topic = !rawTopic || rawTopic === "auto" ? autoSelectTopic(recentScrapes) : rawTopic;
    console.log("[bg-generate] Topic:", topic, "Model:", model);

    const scrapeContext = recentScrapes.map((s) => s.result).filter(Boolean).join("\n\n").slice(0, 4000);

    // Generate text
    const postType = detectPostType(topic);
    const prompt = buildPrompt(topic, postType, scrapeContext || null);
    console.log("[bg-generate] Calling AI...");
    const rawResponse = await generateAI(prompt, model);
    console.log("[bg-generate] AI done, parsing...");

    const parsed = parsePost(rawResponse, postType);

    // Save to DB
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
      await db.update(blogPosts).set({ published: true, publishedAt: new Date() }).where(eq(blogPosts.id, post.id));
      console.log("[bg-generate] Published");
    }

    // Update job
    if (jobId) {
      await db
        .update(contentQueue)
        .set({
          status: "completed",
          output: JSON.stringify({ postId: post.id, slug: post.slug, title: post.title, published: publish }),
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, jobId));
    }

    console.log("[bg-generate] Done!");
    return { statusCode: 200, body: JSON.stringify({ postId: post.id, title: post.title }) };
  } catch (error) {
    console.error("[bg-generate] Failed:", error);

    if (jobId) {
      await db
        .update(contentQueue)
        .set({
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, jobId))
        .catch(() => {});
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
    };
  }
};

export { handler };
