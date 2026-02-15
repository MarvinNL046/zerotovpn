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
    news: "Write a VPN news roundup article. Cover 3-4 recent developments with analysis. Each news item gets its own numbered H2 section. Include \"Why This Matters\" subheadings.",
    comparison: "Write a detailed VPN comparison article. The Key Takeaways table should compare the VPNs directly. Include a main comparison table and individual analysis per VPN. End with a clear winner and runner-up.",
    deal: "Write a VPN deals roundup article. Each deal gets its own numbered H2 section. Show original price vs deal price with savings percentage. Include urgency with expiration context. Add a \"deal score\" rating.",
    guide: "Write an in-depth VPN guide article. Start with fundamentals, progress to advanced tips. Include step-by-step instructions with numbered lists. Add practical examples and real-world scenarios.",
  };

  const ctx = scrapeData ? `\nREFERENCE DATA (use this for accuracy — cite real numbers):\n${scrapeData.slice(0, 3000)}\n` : "";

  return `You are a senior VPN expert writer for ZeroToVPN.com, an independent VPN comparison and review site run by cybersecurity professionals.
Your team has personally tested 50+ VPN services through rigorous speed tests, security audits, and real-world usage. You write from first-hand experience.

Write a comprehensive, fact-checked blog post about: "${topic}"

${typeInstructions[postType] || typeInstructions.guide}

CONTENT STRUCTURE (follow this EXACT structure — modeled after high-performing blog posts):

1. OPENING: Start with a compelling intro paragraph (2-3 sentences) with a hook stat. Bold the most important keyword on first use.

2. KEY TAKEAWAYS TABLE: Immediately after intro, add an HTML table with Q&A format:
   <h2>Key Takeaways</h2>
   <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>
   <tr><td><strong>Question here?</strong></td><td>Answer with <strong>bold keywords</strong> and <a href="https://zerotovpn.com/relevant-page">internal links</a>.</td></tr>
   </tbody></table>
   Include 5-7 rows covering the main points of the article.

3. NUMBERED H2 SECTIONS: Use 10-11 numbered H2 headings like:
   <h2>1. Section Title Here</h2>
   Each H2 section should have:
   - 2 intro paragraphs with <strong>bold keywords</strong> on first mention
   - TWO H3 subheadings, each with a specific angle and 1-2 paragraphs
   - At least half the sections should include a bullet list (<ul><li>) with 3-5 practical points, each starting with a <strong>bold label</strong>

4. DID YOU KNOW CALLOUTS: Add 2-3 throughout the article:
   <blockquote><p><strong>Did You Know?</strong> The actual fact with a stat here.</p><p>Source: <a href="https://source-url.com">Source Name</a></p></blockquote>

5. COMPARISON TABLE: Include at least one data comparison table:
   <h3>Comparison subtitle</h3>
   <table><thead><tr><th>VPN</th><th>Feature</th><th>Price</th></tr></thead>
   <tbody><tr><td><strong>VPN Name</strong></td><td>Details</td><td><strong>$X.XX/mo</strong></td></tr></tbody></table>

6. INFOGRAPHIC PLACEHOLDERS: Include exactly 2 image placeholders:
   After section 3: <img src="INFOGRAPHIC_1" alt="Infographic of [describe key visual with specific data points]." />
   <p><em>A visual guide to [what the infographic shows].</em></p>
   After section 7: <img src="INFOGRAPHIC_2" alt="Infographic showing [describe visual with comparison data]." />
   <p><em>[Descriptive caption explaining the key takeaway].</em></p>
   Use src="INFOGRAPHIC_1" and src="INFOGRAPHIC_2" EXACTLY — they will be replaced with generated images.

7. CONCLUSION: Final H2 "Conclusion" section with 2 paragraphs summarizing key points, a CTA linking to the relevant ZeroToVPN page, and a trust statement like "Based on our independent testing of 50+ VPN services, we stand behind these recommendations. Learn more about <a href=\\"https://zerotovpn.com/about\\">our testing methodology</a>."

INTERNAL LINKING (critical for SEO — include 8-12 internal links naturally, spread across sections):
Reviews:
- <a href="https://zerotovpn.com/reviews/nordvpn">NordVPN review</a>
- <a href="https://zerotovpn.com/reviews/surfshark">Surfshark review</a>
- <a href="https://zerotovpn.com/reviews/expressvpn">ExpressVPN review</a>
- <a href="https://zerotovpn.com/reviews/cyberghost">CyberGhost review</a>
- <a href="https://zerotovpn.com/reviews/protonvpn">ProtonVPN review</a>
Best-of pages:
- <a href="https://zerotovpn.com/best/best-vpn">best VPNs of 2026</a>
- <a href="https://zerotovpn.com/best/free-vpn">best free VPNs</a>
- <a href="https://zerotovpn.com/best/vpn-streaming">best VPNs for streaming</a>
- <a href="https://zerotovpn.com/best/vpn-cheap">cheapest VPNs</a>
- <a href="https://zerotovpn.com/best/vpn-netflix">best VPNs for Netflix</a>
Tools & pages:
- <a href="https://zerotovpn.com/compare">VPN comparison tool</a>
- <a href="https://zerotovpn.com/deals">current VPN deals</a>
- <a href="https://zerotovpn.com/coupons">VPN coupon codes</a>
- <a href="https://zerotovpn.com/speed-test">VPN speed test</a>
- <a href="https://zerotovpn.com/quiz">VPN recommendation quiz</a>
Guides:
- <a href="https://zerotovpn.com/guides/what-is-vpn">what is a VPN</a>
- <a href="https://zerotovpn.com/guides/how-vpn-works">how VPNs work</a>
- <a href="https://zerotovpn.com/guides/vpn-protocols-explained">VPN protocols explained</a>
- <a href="https://zerotovpn.com/guides/vpn-for-streaming">VPN streaming guide</a>
- <a href="https://zerotovpn.com/guides/public-wifi-safety">public Wi-Fi safety</a>
Blog:
- <a href="https://zerotovpn.com/blog/is-vpn-legal">is using a VPN legal</a>
- <a href="https://zerotovpn.com/blog/vpn-vs-proxy">VPN vs proxy comparison</a>
Pick 8-12 of these that are RELEVANT to the topic. Do NOT force irrelevant links.

EXTERNAL LINKING (include 3-5 credible VPN-niche sources):
- Statista VPN market data: https://www.statista.com/topics/7142/virtual-private-network-vpn-usage-worldwide/
- Security.org VPN research: https://www.security.org/vpn/
- Top10VPN free VPN reports: https://www.top10vpn.com/research/
- Comparitech VPN stats: https://www.comparitech.com/vpn/
- Freedom House internet freedom: https://freedomhouse.org/report/freedom-net
- CISA cybersecurity guidance: https://www.cisa.gov/topics/cybersecurity-best-practices
- EFF surveillance self-defense: https://ssd.eff.org/
Pick 3-5 that match the topic. Use descriptive anchor text, not "click here".

E-E-A-T SIGNALS (critical for Google rankings — weave throughout):
- EXPERIENCE: Reference hands-on testing ("In our testing...", "When we benchmarked...", "Our team measured...")
- EXPERTISE: Use precise technical terms (server counts, encryption standards, protocol names)
- AUTHORITATIVENESS: Cite credible external sources in "Did You Know?" callouts
- TRUSTWORTHINESS: Be balanced — mention downsides too. Include "Based on our independent testing"
- Every stat MUST have a source. Use "we" voice for team expertise.

FORMATTING RULES:
- Bold VPN names and key terms on first mention in each section
- Use <strong> for emphasis, never <b>
- All links use full absolute URLs (https://zerotovpn.com/...)
- Target 1800-2500 words for comprehensive SEO coverage
- Write in authoritative but accessible tone
- Include specific data points (prices, server counts, speeds, percentages)
${ctx}
IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown code blocks, no text before or after the JSON):
{
  "title": "The Blog Post Title In Title Case",
  "slug": "url-friendly-slug-with-keywords",
  "excerpt": "A compelling 1-2 sentence excerpt for previews (max 160 chars)",
  "content": "The full blog post content in HTML format following the structure above",
  "metaTitle": "SEO optimized title with primary keyword (max 60 chars)",
  "metaDescription": "Compelling SEO meta description with CTA (max 155 chars)",
  "tags": ["primary-keyword", "secondary-keyword", "vpn", "related-tag"]
}`;
}

function parsePost(raw: string, postType: string) {
  let json = raw.trim();

  // Remove markdown code block wrappers if present
  json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```\s*$/, "");

  // Try to find a JSON object in the response (handles leading/trailing text)
  const match = json.match(/\{[\s\S]*\}/);
  if (match) json = match[0];

  try {
    const p = JSON.parse(json);
    return {
      title: p.title || "Untitled Post",
      slug: p.slug || slugify(p.title || "untitled"),
      excerpt: (p.excerpt || "").slice(0, 160),
      content: p.content || "",
      metaTitle: (p.metaTitle || p.title || "").slice(0, 60),
      metaDescription: (p.metaDescription || p.excerpt || "").slice(0, 155),
      category: postType,
      tags: Array.isArray(p.tags) ? p.tags : [],
    };
  } catch {
    // If JSON parsing fails, try to extract fields manually via regex
    const titleMatch = raw.match(/"title"\s*:\s*"([^"]+)"/);
    const slugMatch = raw.match(/"slug"\s*:\s*"([^"]+)"/);
    const excerptMatch = raw.match(/"excerpt"\s*:\s*"([^"]+)"/);
    const contentMatch = raw.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"meta|"\s*,\s*"tags|"\s*\})/);

    if (titleMatch && contentMatch) {
      // Partial JSON recovery - unescape the content string
      const content = contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      const title = titleMatch[1];
      console.log("[bg-generate] JSON parse failed, recovered via regex:", title);
      return {
        title,
        slug: slugMatch?.[1] || slugify(title),
        excerpt: (excerptMatch?.[1] || content.replace(/<[^>]+>/g, "").slice(0, 155)).slice(0, 160),
        content,
        metaTitle: title.slice(0, 60),
        metaDescription: (excerptMatch?.[1] || content.replace(/<[^>]+>/g, "").slice(0, 155)).slice(0, 155),
        category: postType,
        tags: [],
      };
    }

    // Last resort: try to find an H1 or heading in the raw content
    const h1Match = raw.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = h1Match?.[1] || raw.match(/^#\s+(.+)/m)?.[1] || "Generated Post";
    console.error("[bg-generate] Could not parse AI response, using fallback. First 200 chars:", raw.slice(0, 200));
    return {
      title,
      slug: slugify(title) + "-" + Date.now(),
      excerpt: raw.replace(/<[^>]+>/g, "").slice(0, 155),
      content: raw,
      metaTitle: title.slice(0, 60),
      metaDescription: raw.replace(/<[^>]+>/g, "").slice(0, 155),
      category: postType,
      tags: [],
    };
  }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

// --- Gemini Image Generation ---

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

async function generateGeminiImage(prompt: string): Promise<{ base64: string; mimeType: string } | null> {
  if (!GEMINI_API_KEY) {
    console.warn("[bg-generate] GEMINI_API_KEY not set, skipping image generation");
    return null;
  }

  const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error(`[bg-generate] Gemini API error ${response.status}: ${errBody.slice(0, 300)}`);
    return null;
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) return null;

  // Gemini API may use either inline_data (snake_case) or inlineData (camelCase)
  const imagePart = parts.find(
    (p: { inline_data?: { mime_type: string; data: string }; inlineData?: { mimeType: string; data: string } }) =>
      p.inline_data || p.inlineData
  );

  if (imagePart?.inlineData) {
    return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType || "image/png" };
  }
  if (imagePart?.inline_data) {
    return { base64: imagePart.inline_data.data, mimeType: imagePart.inline_data.mime_type || "image/png" };
  }
  return null;
}

async function generateFeaturedImage(title: string, category: string): Promise<string | null> {
  const styleMap: Record<string, string> = {
    news: "modern tech news illustration, digital, clean lines, blue tones",
    guide: "informative infographic style, step-by-step visual, friendly colors",
    comparison: "side-by-side comparison chart visual, clean data visualization",
    deal: "exciting promotional banner, bold colors, discount theme, savings",
  };
  const style = styleMap[category] || styleMap.guide;

  const prompt = `Create a professional blog header image for an article titled "${title}".
Style: ${style}.
The image should be landscape format (16:9), modern, and suitable for a VPN comparison website called ZeroToVPN.
Do NOT include any text in the image. Use abstract tech visuals, shields, locks, or network imagery.`;

  const image = await generateGeminiImage(prompt);
  if (!image) return null;
  return `data:${image.mimeType};base64,${image.base64}`;
}

async function replaceInfographicPlaceholders(content: string, title: string): Promise<string> {
  const placeholders = [
    { src: "INFOGRAPHIC_1", index: 1 },
    { src: "INFOGRAPHIC_2", index: 2 },
  ];

  let updatedContent = content;

  for (const { src, index } of placeholders) {
    if (!updatedContent.includes(`src="${src}"`)) continue;

    // Extract alt text for the prompt
    const altMatch = updatedContent.match(new RegExp(`src="${src}"\\s+alt="([^"]*)"`));
    const altText = altMatch?.[1] || `Infographic for ${title} - part ${index}`;

    const prompt = `Create a clean, professional infographic for a VPN blog article.
The infographic should visualize: ${altText}
Style: modern flat design, clean data visualization, professional color palette (blues, greens, white).
Use icons, charts, or diagrams. Landscape format (16:9).
Do NOT include any readable text — use abstract shapes, icons, and visual metaphors only.`;

    console.log(`[bg-generate] Generating infographic ${index}...`);
    const image = await generateGeminiImage(prompt);

    if (image) {
      const dataUrl = `data:${image.mimeType};base64,${image.base64}`;
      updatedContent = updatedContent.replace(`src="${src}"`, `src="${dataUrl}"`);
      console.log(`[bg-generate] Infographic ${index} done`);
    } else {
      // Remove broken placeholder
      updatedContent = updatedContent.replace(
        new RegExp(`<img\\s+src="${src}"[^>]*/>`, "g"),
        ""
      );
      console.warn(`[bg-generate] Infographic ${index} failed, removed placeholder`);
    }
  }

  return updatedContent;
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

    // Save text-only post to DB first (so we have a record even if image gen fails)
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

    // Generate images via Gemini (featured + infographics)
    let featuredImage: string | null = null;
    let updatedContent = parsed.content;

    try {
      console.log("[bg-generate] Generating featured image...");
      featuredImage = await generateFeaturedImage(parsed.title, parsed.category);
      if (featuredImage) {
        console.log("[bg-generate] Featured image done");
      }
    } catch (imgErr) {
      console.warn("[bg-generate] Featured image failed:", imgErr);
    }

    try {
      updatedContent = await replaceInfographicPlaceholders(parsed.content, parsed.title);
    } catch (imgErr) {
      console.warn("[bg-generate] Infographic replacement failed:", imgErr);
    }

    // Update post with images if any were generated
    if (featuredImage || updatedContent !== parsed.content) {
      await db
        .update(blogPosts)
        .set({
          ...(featuredImage ? { featuredImage } : {}),
          ...(updatedContent !== parsed.content ? { content: updatedContent } : {}),
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, post.id));
      console.log("[bg-generate] Post updated with images");
    }

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
