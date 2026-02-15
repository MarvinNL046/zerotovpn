// Netlify Background Function (v1 format) for blog generation.
// The "-background" suffix + v1 Handler export makes Netlify
// return 202 immediately and run this for up to 15 minutes.

import type { Handler } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, desc } from "drizzle-orm";
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

// --- Country Data (inline, since Netlify functions can't import from src/) ---

interface CountryInfo {
  slug: string;
  name: string;
  status: "legal" | "legal-restricted" | "restricted";
  internetFreedomScore: number;
  population: string;
  blockedServices: string[];
  recommendedVpns: string[];
}

// High-priority countries for country-specific blog posts (restricted + high-traffic)
const COUNTRY_DATA: CountryInfo[] = [
  { slug: "iran", name: "Iran", status: "restricted", internetFreedomScore: 16, population: "87.9M", blockedServices: ["Social media", "News sites", "Messaging apps", "VPN websites", "Streaming platforms"], recommendedVpns: ["NordVPN (obfuscated servers)", "ExpressVPN", "Mullvad"] },
  { slug: "china", name: "China", status: "restricted", internetFreedomScore: 9, population: "1.4B", blockedServices: ["Google", "Facebook", "Twitter/X", "YouTube", "WhatsApp", "Instagram", "Wikipedia", "Most Western news"], recommendedVpns: ["ExpressVPN", "NordVPN (obfuscated)", "Surfshark"] },
  { slug: "russia", name: "Russia", status: "restricted", internetFreedomScore: 21, population: "144M", blockedServices: ["Facebook", "Instagram", "Twitter/X", "Independent news", "VPN websites"], recommendedVpns: ["NordVPN (obfuscated)", "ExpressVPN", "ProtonVPN"] },
  { slug: "uae", name: "United Arab Emirates", status: "restricted", internetFreedomScore: 30, population: "10M", blockedServices: ["VoIP (Skype, FaceTime)", "Dating apps", "Gambling sites", "Some news sites"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "turkey", name: "Turkey", status: "legal-restricted", internetFreedomScore: 32, population: "85M", blockedServices: ["Wikipedia (intermittent)", "Social media (during events)", "Some news sites", "VPN websites"], recommendedVpns: ["ExpressVPN", "NordVPN", "ProtonVPN"] },
  { slug: "saudi-arabia", name: "Saudi Arabia", status: "restricted", internetFreedomScore: 24, population: "36M", blockedServices: ["VoIP services", "Dating sites", "Gambling", "Political opposition sites", "LGBTQ+ content"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "egypt", name: "Egypt", status: "restricted", internetFreedomScore: 25, population: "106M", blockedServices: ["News websites", "Human rights sites", "VPN websites", "VoIP services"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "vietnam", name: "Vietnam", status: "restricted", internetFreedomScore: 22, population: "100M", blockedServices: ["Facebook (intermittent)", "Political content", "Independent news", "Some blogs"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "pakistan", name: "Pakistan", status: "legal-restricted", internetFreedomScore: 26, population: "230M", blockedServices: ["YouTube (historically)", "Social media (during unrest)", "Blasphemous content", "Some news sites"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "myanmar", name: "Myanmar", status: "restricted", internetFreedomScore: 12, population: "55M", blockedServices: ["Facebook", "Twitter/X", "Instagram", "Wikipedia", "Independent news", "VPN websites"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "indonesia", name: "Indonesia", status: "legal-restricted", internetFreedomScore: 47, population: "277M", blockedServices: ["Adult content", "Gambling sites", "Some LGBTQ+ content", "Radical content"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "thailand", name: "Thailand", status: "legal-restricted", internetFreedomScore: 36, population: "72M", blockedServices: ["Gambling sites", "Some news outlets", "Political content", "Lese-majeste content"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "india", name: "India", status: "legal-restricted", internetFreedomScore: 50, population: "1.4B", blockedServices: ["Social media (during shutdowns)", "TikTok", "Some Chinese apps", "VPN apps (some)"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "bangladesh", name: "Bangladesh", status: "legal-restricted", internetFreedomScore: 40, population: "172M", blockedServices: ["Social media (during unrest)", "Some news websites", "VoIP services"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "uzbekistan", name: "Uzbekistan", status: "restricted", internetFreedomScore: 27, population: "35M", blockedServices: ["News websites", "Social media (during unrest)", "Messaging apps", "VPN websites"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "kazakhstan", name: "Kazakhstan", status: "restricted", internetFreedomScore: 29, population: "20M", blockedServices: ["Social media (during protests)", "Opposition news", "Messaging apps", "VPN websites"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "hong-kong", name: "Hong Kong", status: "legal-restricted", internetFreedomScore: 45, population: "7.5M", blockedServices: ["Some pro-democracy websites (intermittent)"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "malaysia", name: "Malaysia", status: "legal-restricted", internetFreedomScore: 39, population: "33M", blockedServices: ["Gambling sites", "Adult content", "Some political websites", "Some news outlets"], recommendedVpns: ["NordVPN", "ExpressVPN", "Surfshark"] },
  { slug: "cuba", name: "Cuba", status: "restricted", internetFreedomScore: 20, population: "11M", blockedServices: ["Independent news", "Opposition websites", "Social media (during protests)"], recommendedVpns: ["ExpressVPN", "NordVPN", "Surfshark"] },
  { slug: "belarus", name: "Belarus", status: "restricted", internetFreedomScore: 18, population: "9.4M", blockedServices: ["Independent news", "Opposition websites", "Social media (during protests)", "VPN websites"], recommendedVpns: ["ExpressVPN", "NordVPN", "ProtonVPN"] },
];

// Countries prioritized for blog post generation (most restricted first)
const HIGH_PRIORITY_COUNTRY_SLUGS = COUNTRY_DATA
  .filter((c) => c.status === "restricted" || c.status === "legal-restricted")
  .sort((a, b) => a.internetFreedomScore - b.internetFreedomScore)
  .map((c) => c.slug);

function detectCountry(topic: string): CountryInfo | null {
  const lower = topic.toLowerCase();
  // Check exact name matches first, longest first to avoid "India" matching before "Indonesia"
  const sorted = [...COUNTRY_DATA].sort((a, b) => b.name.length - a.name.length);
  for (const country of sorted) {
    if (lower.includes(country.name.toLowerCase())) return country;
    if (lower.includes(country.slug.replace(/-/g, " "))) return country;
  }
  return null;
}

// Scrape country data from multiple sources (can't import from src/ in Netlify functions)
async function scrapeCountryDataForBlog(
  country: CountryInfo
): Promise<string | null> {
  const jinaKey = process.env.JINA_API_KEY;
  const jinaReaderUrl = "https://r.jina.ai";
  const year = new Date().getFullYear();

  const headers: Record<string, string> = { Accept: "application/json" };
  const readerHeaders: Record<string, string> = { Accept: "text/markdown" };
  if (jinaKey) {
    headers["Authorization"] = `Bearer ${jinaKey}`;
    readerHeaders["Authorization"] = `Bearer ${jinaKey}`;
  }

  // Scrape multiple sources in parallel
  const sources = await Promise.allSettled([
    // 1. Jina search: country + VPN news
    (async () => {
      const query = `${country.name} VPN censorship internet ${year}`;
      const res = await fetch(`https://s.jina.ai/${encodeURIComponent(query)}`, {
        method: "GET", headers, signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const results = (data.data || data.results || []).slice(0, 4);
      return results.length > 0
        ? "RECENT VPN/CENSORSHIP NEWS:\n" + results
            .map((r: { title?: string; description?: string; content?: string; url?: string }) =>
              `- ${r.title || "Untitled"}: ${(r.description || r.content || "").slice(0, 250)}${r.url ? ` (Source: ${r.url})` : ""}`)
            .join("\n")
        : null;
    })(),

    // 2. Freedom House country report via Jina reader
    (async () => {
      const slug = country.slug === "uae" ? "united-arab-emirates" : country.slug;
      const url = `https://freedomhouse.org/country/${slug}/freedom-net`;
      const res = await fetch(`${jinaReaderUrl}/${url}`, {
        method: "GET", headers: readerHeaders, signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const text = await res.text();
      return text && text.length > 100
        ? `FREEDOM HOUSE REPORT (${url}):\n${text.slice(0, 1500)}`
        : null;
    })(),

    // 3. Jina search: best VPN for [country] reviews
    (async () => {
      const query = `best VPN for ${country.name} ${year} review`;
      const res = await fetch(`https://s.jina.ai/${encodeURIComponent(query)}`, {
        method: "GET", headers, signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const results = (data.data || data.results || []).slice(0, 3);
      return results.length > 0
        ? "VPN REVIEW SOURCES:\n" + results
            .map((r: { title?: string; description?: string; content?: string; url?: string }) =>
              `- ${r.title || "Untitled"}: ${(r.description || r.content || "").slice(0, 250)}${r.url ? ` (Source: ${r.url})` : ""}`)
            .join("\n")
        : null;
    })(),

    // 4. Jina search: internet censorship / VPN legality
    (async () => {
      const query = `is VPN legal in ${country.name} ${year} internet censorship laws`;
      const res = await fetch(`https://s.jina.ai/${encodeURIComponent(query)}`, {
        method: "GET", headers, signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const results = (data.data || data.results || []).slice(0, 3);
      return results.length > 0
        ? "VPN LEGALITY & CENSORSHIP SOURCES:\n" + results
            .map((r: { title?: string; description?: string; content?: string; url?: string }) =>
              `- ${r.title || "Untitled"}: ${(r.description || r.content || "").slice(0, 250)}${r.url ? ` (Source: ${r.url})` : ""}`)
            .join("\n")
        : null;
    })(),
  ]);

  const parts: string[] = [];
  for (const result of sources) {
    if (result.status === "fulfilled" && result.value) {
      parts.push(result.value);
    }
  }

  console.log(`[bg-generate] Country scrape for ${country.name}: ${parts.length}/${sources.length} sources succeeded`);

  return parts.length > 0 ? parts.join("\n\n") : null;
}

// --- VPN Logo mapping (public/logos/ contains official SVGs from provider websites) ---

const VPN_LOGOS: Record<string, { file: string; displayName: string }> = {
  nordvpn: { file: "/logos/nordvpn.svg", displayName: "NordVPN" },
  expressvpn: { file: "/logos/expressvpn.svg", displayName: "ExpressVPN" },
  surfshark: { file: "/logos/surfshark.svg", displayName: "Surfshark" },
  cyberghost: { file: "/logos/cyberghost.svg", displayName: "CyberGhost" },
  protonvpn: { file: "/logos/protonvpn.svg", displayName: "ProtonVPN" },
  mullvad: { file: "/logos/mullvad.svg", displayName: "Mullvad" },
  ipvanish: { file: "/logos/ipvanish.svg", displayName: "IPVanish" },
  "private-internet-access": { file: "/logos/private-internet-access.svg", displayName: "Private Internet Access" },
};

// Inject VPN logos into blog content HTML.
// Finds the first <h2> or <h3> heading that mentions each VPN name
// and prepends the logo image to that heading.
function injectVpnLogos(content: string, siteUrl: string): string {
  let updated = content;
  const injected = new Set<string>();

  for (const [slug, { file, displayName }] of Object.entries(VPN_LOGOS)) {
    // Skip if VPN not mentioned in content
    if (!content.toLowerCase().includes(displayName.toLowerCase())) continue;

    // Find the first <h2> or <h3> that contains this VPN name
    const headingRegex = new RegExp(
      `(<h[23][^>]*>)((?:(?!</h[23]>).)*?${displayName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:(?!</h[23]>).)*)(<\/h[23]>)`,
      "i"
    );

    const match = updated.match(headingRegex);
    if (match && !injected.has(slug)) {
      const logoImg = `<img src="${siteUrl}${file}" alt="${displayName} logo" style="height:28px;width:auto;vertical-align:middle;margin-right:8px;display:inline-block;" />`;
      updated = updated.replace(
        match[0],
        `${match[1]}${logoImg}${match[2]}${match[3]}`
      );
      injected.add(slug);
    }

    // Also inject into comparison table cells: find <td><strong>VPN Name</strong></td>
    const tableCellPattern = `(<td[^>]*>\\s*<strong>)(${displayName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(</strong>)`;

    if (!injected.has(`${slug}-table`) && new RegExp(tableCellPattern, "i").test(updated)) {
      const logoImgSmall = `<img src="${siteUrl}${file}" alt="${displayName} logo" style="height:20px;width:auto;vertical-align:middle;margin-right:6px;display:inline-block;" />`;
      updated = updated.replace(
        new RegExp(tableCellPattern, "gi"),
        `$1${logoImgSmall}$2$3`
      );
      injected.add(`${slug}-table`);
    }
  }

  console.log(`[bg-generate] Injected ${injected.size} VPN logos into content`);
  return updated;
}

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

async function autoSelectTopic(
  db: ReturnType<typeof getDb>,
  scrapeData: Array<{ type: string; result: string | null }>,
  model: AiModel
): Promise<string> {
  // Get existing post titles to avoid duplicate topics
  const existingPosts = await db
    .select({ title: blogPosts.title, slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.language, "en"));

  const existingTitles = existingPosts.map((p) => p.title);
  const existingTitlesLower = existingTitles.map((t) => t.toLowerCase());
  const scrapeContext = scrapeData
    .map((s) => s.result)
    .filter(Boolean)
    .join("\n")
    .slice(0, 2000);

  const now = new Date();
  const month = now.toLocaleString("en", { month: "long" });
  const year = now.getFullYear();

  // Determine if this should be a country-specific post (~every 3rd post)
  const totalPosts = existingPosts.length;
  const countryPostCount = existingTitles.filter((t) => {
    const lower = t.toLowerCase();
    return COUNTRY_DATA.some(
      (c) => lower.includes(c.name.toLowerCase()) && (lower.includes("vpn") || lower.includes("bypass") || lower.includes("internet"))
    );
  }).length;

  const shouldBeCountryPost = totalPosts > 0 && countryPostCount < Math.ceil(totalPosts / 3);

  if (shouldBeCountryPost) {
    // Find countries that don't have recent blog posts yet
    const countriesWithoutPosts = HIGH_PRIORITY_COUNTRY_SLUGS.filter((slug) => {
      const country = COUNTRY_DATA.find((c) => c.slug === slug);
      if (!country) return false;
      return !existingTitlesLower.some(
        (t) => t.includes(country.name.toLowerCase()) && (t.includes("vpn") || t.includes("bypass") || t.includes("internet"))
      );
    });

    if (countriesWithoutPosts.length > 0) {
      // Pick the highest-priority country without a post
      const countrySlug = countriesWithoutPosts[0];
      const country = COUNTRY_DATA.find((c) => c.slug === countrySlug)!;

      // Let AI pick the best angle for this country
      const countryTopicPrompt = `You are a senior VPN content strategist for ZeroToVPN.com.

Pick ONE compelling blog post title about using VPNs in ${country.name} that will rank well on Google.

Country context:
- Internet Freedom Score: ${country.internetFreedomScore}/100 (${country.status === "restricted" ? "Not Free" : "Partly Free"})
- Blocked services: ${country.blockedServices.join(", ")}
- Population: ${country.population}

The title should be:
- Specific to ${country.name} and VPN usage there
- Timely for ${year}
- Searchable (target keywords people actually search for)
- Different from these existing titles:
${existingTitles.slice(-20).map((t) => `  - ${t}`).join("\n")}

Example formats (vary these, don't always use the same pattern):
- "Best VPN for ${country.name} in ${year}: Bypass Blocks Safely"
- "How to Use a VPN in ${country.name}: Complete ${year} Guide"
- "Is VPN Legal in ${country.name}? What You Need to Know in ${year}"
- "${country.name} Internet Censorship: How to Stay Connected with a VPN"

Respond with ONLY the blog post title — nothing else. No quotes, no explanation.`;

      try {
        const topicResponse = await generateAI(countryTopicPrompt, model);
        const topic = topicResponse.trim().replace(/^["']|["']$/g, "");
        if (topic && topic.length > 10 && topic.length < 120) {
          console.log(`[bg-generate] AI selected country topic (${country.name}):`, topic);
          return topic;
        }
      } catch (err) {
        console.warn("[bg-generate] AI country topic selection failed:", err);
      }

      // Fallback: deterministic country topic
      return `Best VPN for ${country.name} in ${year}: Complete Guide to Bypass Internet Restrictions`;
    }
  }

  const topicPrompt = `You are a senior VPN content strategist for ZeroToVPN.com, a VPN comparison and review website.

Pick ONE compelling blog post topic that will rank well on Google and drive organic traffic.

The topic should be:
- About VPNs, online privacy, cybersecurity, or related subjects
- Specific and searchable (not too broad, not too niche)
- Timely for ${month} ${year}
- Different from ALL of these already-published titles:
${existingTitles.map((t) => `  - ${t}`).join("\n")}

${scrapeContext ? `Recent VPN industry data for inspiration:\n${scrapeContext}\n` : ""}

Topic categories to rotate between: reviews, comparisons (VPN vs VPN), how-to guides, best-of lists, security news analysis, protocol deep-dives, use-case guides (streaming, gaming, travel, torrenting), myth-busting, deal roundups.

Respond with ONLY the blog post title — nothing else. No quotes, no explanation.`;

  try {
    const topicResponse = await generateAI(topicPrompt, model);
    const topic = topicResponse.trim().replace(/^["']|["']$/g, "");
    if (topic && topic.length > 10 && topic.length < 120) {
      console.log("[bg-generate] AI selected topic:", topic);
      return topic;
    }
  } catch (err) {
    console.warn("[bg-generate] AI topic selection failed, using fallback:", err);
  }

  // Fallback: simple rotation with date uniqueness
  const fallbackTopics = [
    "Best VPN Deals and Discounts",
    "VPN Speed Comparison: Real-World Test Results",
    "Complete Guide to VPN Privacy and Security",
    "Top VPNs for Streaming: Netflix, Disney+, and More",
    "VPN Protocols Compared: Which One Should You Use?",
  ];
  const week = Math.floor((Date.now() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${fallbackTopics[week % fallbackTopics.length]} - ${month} ${year}`;
}

function detectPostType(topic: string): "news" | "comparison" | "deal" | "guide" {
  const lower = topic.toLowerCase();
  if (lower.includes("deal") || lower.includes("price") || lower.includes("discount")) return "deal";
  if (lower.includes("vs") || lower.includes("comparison")) return "comparison";
  if (lower.includes("news") || lower.includes("update") || lower.includes("week in")) return "news";
  // Country-specific posts are always guides
  if (detectCountry(topic)) return "guide";
  return "guide";
}

// Fetch sitemap and extract English-only internal links grouped by category
async function fetchSitemapLinks(): Promise<string> {
  const siteUrl = process.env.SITE_URL || process.env.URL || "https://zerotovpn.com";
  try {
    const response = await fetch(`${siteUrl}/sitemap.xml`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return "";

    const xml = await response.text();

    // Extract all URLs from sitemap (only English — no /nl/, /de/, etc.)
    const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const allUrls = urlMatches
      .map((m) => m.replace(/<\/?loc>/g, ""))
      .filter((url) => {
        // Only English pages (no locale prefix)
        const path = url.replace(siteUrl, "");
        return !path.match(/^\/(nl|de|es|fr|zh|ja|ko|th)\//);
      });

    // Group by category
    const groups: Record<string, string[]> = {};
    for (const url of allUrls) {
      const path = url.replace(siteUrl, "");
      if (!path || path === "/") continue;
      // Skip locale-only pages
      if (path.match(/^\/(nl|de|es|fr|zh|ja|ko|th)$/)) continue;

      const category = path.split("/")[1] || "other";
      if (!groups[category]) groups[category] = [];
      // Limit per category to keep prompt manageable
      if (groups[category].length < 15) {
        groups[category].push(url);
      }
    }

    // Format as a readable list
    let result = "";
    for (const [category, urls] of Object.entries(groups)) {
      if (urls.length === 0) continue;
      result += `${category}:\n`;
      for (const url of urls) {
        const path = url.replace(siteUrl, "");
        // Create human-readable anchor text from path
        const anchor = path
          .split("/")
          .pop()!
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        result += `- <a href="${url}">${anchor || category}</a>\n`;
      }
      result += "\n";
    }

    console.log(`[bg-generate] Fetched ${allUrls.length} URLs from sitemap`);
    return result;
  } catch (err) {
    console.warn("[bg-generate] Failed to fetch sitemap:", err);
    return "";
  }
}

async function buildPrompt(topic: string, postType: string, scrapeData: string | null): Promise<string> {
  const siteUrl = process.env.SITE_URL || process.env.URL || "https://zerotovpn.com";
  const siteName = new URL(siteUrl).hostname.replace("www.", "").split(".")[0];

  const typeInstructions: Record<string, string> = {
    news: "Write a news roundup article. Cover 3-4 recent developments with analysis. Each news item gets its own numbered H2 section. Include \"Why This Matters\" subheadings.",
    comparison: "Write a detailed comparison article. The Key Takeaways table should compare items directly. Include a main comparison table and individual analysis per item. End with a clear winner and runner-up.",
    deal: "Write a deals roundup article. Each deal gets its own numbered H2 section. Show original price vs deal price with savings percentage. Include urgency with expiration context. Add a \"deal score\" rating.",
    guide: "Write an in-depth guide article. Start with fundamentals, progress to advanced tips. Include step-by-step instructions with numbered lists. Add practical examples and real-world scenarios.",
  };

  // Detect country and build country-specific context
  const country = detectCountry(topic);
  let countryContext = "";

  if (country) {
    console.log(`[bg-generate] Country detected: ${country.name}, enriching prompt...`);

    // Scrape fresh news for this country
    const freshNews = await scrapeCountryDataForBlog(country);

    // Also check if we have scraped data from the ScrapeJob table for this country
    const countryStatusLabel =
      country.status === "restricted"
        ? "Not Free"
        : country.status === "legal-restricted"
          ? "Partly Free"
          : "Free";

    countryContext = `
COUNTRY REFERENCE DATA (use this data throughout the article — cite real numbers):
Country: ${country.name}
Internet Freedom Score: ${country.internetFreedomScore}/100 (${countryStatusLabel}) — Source: Freedom House
VPN Status: ${country.status === "restricted" ? "Heavily restricted or blocked" : country.status === "legal-restricted" ? "Legal but monitored/restricted" : "Fully legal"}
Blocked Services: ${country.blockedServices.join(", ")}
Recommended VPNs: ${country.recommendedVpns.join(", ")}
Population: ${country.population}
Country page on site: ${siteUrl}/countries/${country.slug}
${freshNews ? `\nRecent news and developments:\n${freshNews}` : ""}

COUNTRY-SPECIFIC INSTRUCTIONS:
- Reference the Internet Freedom Score and cite Freedom House as the source
- List specific blocked services and explain WHY they are blocked
- For each recommended VPN, explain WHY it works well in ${country.name} (e.g., obfuscated servers, specific protocol support)
- Include practical setup tips specific to ${country.name} (e.g., "install VPN before arriving" for travelers)
- Mention legal implications honestly — don't downplay risks but don't fear-monger either
- Link to the country page: ${siteUrl}/countries/${country.slug}
- Include a section about which VPN protocols work best in ${country.name}

CRITICAL DATA ACCURACY RULES FOR COUNTRY POSTS:
- Use ONLY the pricing data from REFERENCE DATA / VPN PRICING DATA sections below. If pricing data is provided, use those exact numbers.
- Do NOT invent speed test results (e.g., "45 Mbps", "95% uptime"). Instead, describe features qualitatively ("fast speeds", "reliable connection").
- Do NOT invent feature names (e.g., "bridge servers", "stealth mode") — only mention features that are documented in the reference data or are well-known (obfuscated servers, Secure Core, etc.)
- Do NOT claim "we tested in ${country.name}" unless test data is provided in the reference data. Instead say "based on user reports" or "according to independent reviews".
- If you don't have a specific data point, be honest — say "check [provider]'s website for latest pricing" rather than guessing.
`;
  }

  const ctx = scrapeData
    ? `\nREFERENCE DATA (use ONLY this data for prices, features, and specs — do NOT invent numbers):\n${scrapeData.slice(0, 5000)}\n`
    : "\nNOTE: No scraped reference data is available. Do NOT invent specific prices, speeds, or test results. Use general descriptions and recommend readers check provider websites for current pricing.\n";

  // Dynamically fetch internal links from sitemap
  const sitemapLinks = await fetchSitemapLinks();
  const internalLinkSection = sitemapLinks
    ? `INTERNAL LINKING (critical for SEO — include 8-12 internal links naturally, spread across sections):
Pick from these pages on ${siteUrl} that are RELEVANT to the topic. Do NOT force irrelevant links.

${sitemapLinks}`
    : "";

  return `You are a senior expert writer for ${siteUrl}, an independent comparison and review site run by industry professionals.
Your team has personally tested 50+ services/products through rigorous benchmarks and real-world usage. You write from first-hand experience.

Write a comprehensive, fact-checked blog post about: "${topic}"

${typeInstructions[postType] || typeInstructions.guide}

CONTENT STRUCTURE (follow this EXACT structure — modeled after high-performing blog posts):

1. OPENING: Start with a compelling intro paragraph (2-3 sentences) with a hook stat. Bold the most important keyword on first use.

2. KEY TAKEAWAYS TABLE: Immediately after intro, add an HTML table with Q&A format:
   <h2>Key Takeaways</h2>
   <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>
   <tr><td><strong>Question here?</strong></td><td>Answer with <strong>bold keywords</strong> and internal links.</td></tr>
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
   <table><thead><tr><th>Item</th><th>Feature</th><th>Price</th></tr></thead>
   <tbody><tr><td><strong>Name</strong></td><td>Details</td><td><strong>$X.XX/mo</strong></td></tr></tbody></table>

6. INFOGRAPHIC PLACEHOLDERS: Include exactly 2 image placeholders:
   After section 3: <img src="INFOGRAPHIC_1" alt="Infographic of [describe key visual with specific data points]." />
   <p><em>A visual guide to [what the infographic shows].</em></p>
   After section 7: <img src="INFOGRAPHIC_2" alt="Infographic showing [describe visual with comparison data]." />
   <p><em>[Descriptive caption explaining the key takeaway].</em></p>
   Use src="INFOGRAPHIC_1" and src="INFOGRAPHIC_2" EXACTLY — they will be replaced with generated images.

7. CONCLUSION: Final H2 "Conclusion" section with 2 paragraphs summarizing key points, a CTA linking to the relevant page on ${siteUrl}, and a trust statement referencing independent testing methodology.

${internalLinkSection}

EXTERNAL LINKING: Include 3-5 credible industry sources relevant to the topic. Use descriptive anchor text, not "click here". Cite real, authoritative sources.

E-E-A-T SIGNALS (critical for Google rankings — weave throughout):
- EXPERIENCE: Reference real usage experience ("We've used...", "In practice...", "When setting up..."). Keep claims general and honest — do NOT invent specific speed numbers, uptime percentages, or benchmark results.
- EXPERTISE: Use precise technical terms and data from the REFERENCE DATA provided
- AUTHORITATIVENESS: Cite credible external sources in "Did You Know?" callouts
- TRUSTWORTHINESS: Be balanced — mention downsides too. Be honest about limitations.
- CRITICAL: Only use prices, speeds, and specs from the REFERENCE DATA provided. If no data is provided for a specific number, say "check the provider's website for current pricing" instead of making up a number. NEVER fabricate test results, percentages, or performance metrics.

VPN LOGOS: Official VPN provider logos are available and will be automatically inserted into headings and comparison tables. When writing about specific VPNs, use their full names (NordVPN, ExpressVPN, Surfshark, CyberGhost, ProtonVPN, Mullvad, IPVanish, Private Internet Access) in H2/H3 headings so logos appear correctly. Give each recommended VPN its own H2 or H3 section when appropriate.

FORMATTING RULES:
- Bold key terms on first mention in each section
- Use <strong> for emphasis, never <b>
- All internal links use full absolute URLs (${siteUrl}/...)
- Target 1800-2500 words for comprehensive SEO coverage
- Write in authoritative but accessible tone
- Include specific data points (prices, specs, percentages)
${ctx}${countryContext}
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
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";

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

  const prompt = `Create a professional blog header image for an article about: "${title}".
Style: ${style}.
The image should be landscape format (16:9), modern, and suitable for a VPN technology website.
CRITICAL RULE: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO labels, ZERO watermarks. No characters of any language or alphabet whatsoever.
Use only abstract tech visuals: shields, locks, network nodes, glowing circuits, digital waves, gradient backgrounds.`;

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

    const prompt = `Create a clean, professional infographic-style illustration for a VPN blog article.
The illustration should visualize: ${altText}
Style: modern flat design, clean data visualization, professional color palette (blues, greens, white).
Use icons, charts, diagrams, abstract shapes, and visual metaphors. Landscape format (16:9).
CRITICAL RULE: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO labels, ZERO watermarks, ZERO captions. No characters of any language or alphabet whatsoever. Only use icons, shapes, colors, and visual elements to convey meaning.`;

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

    const topic = !rawTopic || rawTopic === "auto" ? await autoSelectTopic(db, recentScrapes, model) : rawTopic;
    console.log("[bg-generate] Topic:", topic, "Model:", model);

    // Build scrape context — for country posts, fetch relevant pricing + country data
    const detectedCountry = detectCountry(topic);
    let scrapeContext: string;

    if (detectedCountry) {
      // Fetch country-specific scrape data
      const countryScrapesPromise = db
        .select()
        .from(scrapeJobs)
        .where(and(eq(scrapeJobs.status, "completed"), eq(scrapeJobs.source, `country-vpn:${detectedCountry.slug}`)))
        .orderBy(desc(scrapeJobs.createdAt))
        .limit(1);

      // Fetch pricing data for the VPNs recommended for this country
      // Map recommended VPN display names back to slugs
      const vpnNameToSlug: Record<string, string> = {
        "nordvpn": "nordvpn", "expressvpn": "expressvpn", "surfshark": "surfshark",
        "cyberghost": "cyberghost", "protonvpn": "protonvpn", "mullvad": "mullvad",
        "ipvanish": "ipvanish", "private internet access": "private-internet-access",
      };
      const recommendedSlugs = detectedCountry.recommendedVpns
        .map((name) => {
          const lower = name.toLowerCase().replace(/\s*\(.*\)/, "").trim();
          return vpnNameToSlug[lower] || lower.replace(/\s+/g, "");
        })
        .filter(Boolean);

      const pricingScrapesPromise = db
        .select()
        .from(scrapeJobs)
        .where(and(eq(scrapeJobs.status, "completed"), eq(scrapeJobs.type, "pricing")))
        .orderBy(desc(scrapeJobs.createdAt))
        .limit(20);

      const [countryScrapes, pricingScrapes] = await Promise.all([countryScrapesPromise, pricingScrapesPromise]);

      // Filter pricing scrapes to only recommended VPNs (most recent per VPN)
      const seenVpns = new Set<string>();
      const relevantPricing = pricingScrapes.filter((s) => {
        const slug = s.vpnSlug;
        if (!slug || seenVpns.has(slug) || !recommendedSlugs.includes(slug)) return false;
        seenVpns.add(slug);
        return true;
      });

      const parts: string[] = [];
      if (countryScrapes.length > 0 && countryScrapes[0].result) {
        parts.push(`COUNTRY SCRAPE DATA:\n${countryScrapes[0].result.slice(0, 2000)}`);
      }
      if (relevantPricing.length > 0) {
        parts.push(`VPN PRICING DATA (scraped from official websites — use these exact prices):\n${relevantPricing.map((s) => `${s.vpnSlug}: ${(s.result || "").slice(0, 800)}`).join("\n\n")}`);
      }
      scrapeContext = parts.join("\n\n").slice(0, 6000);
      console.log(`[bg-generate] Country context: ${countryScrapes.length} country scrapes, ${relevantPricing.length} pricing scrapes for ${recommendedSlugs.join(", ")}`);
    } else {
      // For non-country posts, try to find relevant pricing data based on VPN names in topic
      const topicLower = topic.toLowerCase();
      const vpnSlugsInTopic = ["nordvpn", "surfshark", "expressvpn", "cyberghost", "protonvpn", "mullvad", "ipvanish", "private-internet-access"]
        .filter((slug) => topicLower.includes(slug.replace("-", " ")) || topicLower.includes(slug));

      if (vpnSlugsInTopic.length > 0) {
        // Topic mentions specific VPNs — fetch their pricing data
        const allPricing = await db
          .select()
          .from(scrapeJobs)
          .where(and(eq(scrapeJobs.status, "completed"), eq(scrapeJobs.type, "pricing")))
          .orderBy(desc(scrapeJobs.createdAt))
          .limit(20);

        const seenVpns = new Set<string>();
        const relevantPricing = allPricing.filter((s) => {
          const slug = s.vpnSlug;
          if (!slug || seenVpns.has(slug) || !vpnSlugsInTopic.includes(slug)) return false;
          seenVpns.add(slug);
          return true;
        });

        if (relevantPricing.length > 0) {
          scrapeContext = `VPN PRICING DATA (scraped from official websites — use these exact prices):\n${relevantPricing.map((s) => `${s.vpnSlug}: ${(s.result || "").slice(0, 800)}`).join("\n\n")}`.slice(0, 5000);
        } else {
          scrapeContext = recentScrapes.map((s) => s.result).filter(Boolean).join("\n\n").slice(0, 4000);
        }
      } else {
        // General topic — include recent news + pricing mix
        const newsData = recentScrapes.filter((s) => s.type === "news").map((s) => s.result).filter(Boolean);
        const pricingData = recentScrapes.filter((s) => s.type === "pricing").map((s) => `${s.vpnSlug}: ${(s.result || "").slice(0, 500)}`).filter(Boolean);

        const parts: string[] = [];
        if (newsData.length > 0) parts.push(`RECENT VPN NEWS:\n${newsData.join("\n").slice(0, 2000)}`);
        if (pricingData.length > 0) parts.push(`VPN PRICING DATA (use these exact prices):\n${pricingData.join("\n\n").slice(0, 2000)}`);
        scrapeContext = parts.join("\n\n") || recentScrapes.map((s) => s.result).filter(Boolean).join("\n\n").slice(0, 4000);
      }
    }

    // Generate text
    const postType = detectPostType(topic);
    const prompt = await buildPrompt(topic, postType, scrapeContext || null);
    console.log("[bg-generate] Calling AI...");
    const rawResponse = await generateAI(prompt, model);
    console.log("[bg-generate] AI done, parsing...");

    const parsed = parsePost(rawResponse, postType);

    // Inject VPN logos into the content
    const siteUrl = process.env.SITE_URL || process.env.URL || "https://zerotovpn.com";
    parsed.content = injectVpnLogos(parsed.content, siteUrl);

    // Ensure slug is unique (append date suffix if needed)
    let finalSlug = parsed.slug;
    const [existingPost] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, finalSlug), eq(blogPosts.language, "en")))
      .limit(1);
    if (existingPost) {
      const now = new Date();
      finalSlug = `${parsed.slug}-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      console.log(`[bg-generate] Slug "${parsed.slug}" exists, using "${finalSlug}"`);
    }

    // Save text-only post to DB first (so we have a record even if image gen fails)
    const [post] = await db
      .insert(blogPosts)
      .values({
        slug: finalSlug,
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

    // Publish English post if requested
    if (publish) {
      await db.update(blogPosts).set({ published: true, publishedAt: new Date() }).where(eq(blogPosts.id, post.id));
      console.log("[bg-generate] English post published");
    }

    // Mark job as completed BEFORE translations (so GitHub Actions doesn't time out)
    if (jobId) {
      await db
        .update(contentQueue)
        .set({
          status: "completed",
          output: JSON.stringify({ postId: post.id, slug: finalSlug, title: post.title, published: publish }),
          processedAt: new Date(),
        })
        .where(eq(contentQueue.id, jobId));
      console.log("[bg-generate] Job marked completed, starting translations...");
    }

    // Get the final English content (with images) for translations
    const finalContent = updatedContent !== parsed.content ? updatedContent : parsed.content;

    // Translate to all other languages
    const targetLanguages = [
      { code: "nl", name: "Dutch" },
      { code: "de", name: "German" },
      { code: "es", name: "Spanish" },
      { code: "fr", name: "French" },
      { code: "zh", name: "Chinese (Simplified)" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
      { code: "th", name: "Thai" },
    ];

    console.log(`[bg-generate] Translating to ${targetLanguages.length} languages (parallel batches of 4)...`);

    // Translate a single language
    async function translateOne(lang: { code: string; name: string }) {
      // Check if translation already exists
      const [existing] = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, finalSlug), eq(blogPosts.language, lang.code)))
        .limit(1);

      if (existing) {
        console.log(`[bg-generate] ${lang.code}: already exists, skipping`);
        return;
      }

      const translatePrompt = `Translate the following blog post metadata and content to ${lang.name}.

RULES:
- Translate ALL text naturally and fluently — not word-for-word
- Keep ALL HTML tags, structure, and formatting exactly as-is
- Keep ALL URLs/links unchanged (do not translate URLs)
- Keep all <img> tags and their src/alt attributes unchanged
- Keep technical terms (VPN, DNS, IP, etc.) in English
- Translate the title, excerpt, metaTitle, and metaDescription too

Respond ONLY with valid JSON (no markdown blocks):
{
  "title": "translated title",
  "excerpt": "translated excerpt (max 160 chars)",
  "metaTitle": "translated SEO title (max 60 chars)",
  "metaDescription": "translated meta description (max 155 chars)",
  "content": "translated HTML content"
}

ORIGINAL ENGLISH POST:
Title: ${parsed.title}
Excerpt: ${parsed.excerpt}
MetaTitle: ${parsed.metaTitle}
MetaDescription: ${parsed.metaDescription}

Content:
${finalContent.slice(0, 12000)}`;

      const translatedRaw = await generateAI(translatePrompt, model);

      // Parse translation
      let translated;
      try {
        let jsonStr = translatedRaw.trim()
          .replace(/^```(?:json)?\s*\n?/, "")
          .replace(/\n?\s*```\s*$/, "");
        const match = jsonStr.match(/\{[\s\S]*\}/);
        if (match) jsonStr = match[0];
        translated = JSON.parse(jsonStr);
      } catch {
        console.warn(`[bg-generate] ${lang.code}: JSON parse failed, skipping`);
        return;
      }

      if (!translated.title || !translated.content) {
        console.warn(`[bg-generate] ${lang.code}: missing title/content, skipping`);
        return;
      }

      // Save translation (reuse same images from English post)
      await db.insert(blogPosts).values({
        slug: finalSlug,
        language: lang.code,
        title: translated.title,
        excerpt: (translated.excerpt || parsed.excerpt).slice(0, 160),
        content: translated.content,
        metaTitle: (translated.metaTitle || translated.title).slice(0, 60),
        metaDescription: (translated.metaDescription || translated.excerpt || "").slice(0, 155),
        category: parsed.category,
        tags: parsed.tags,
        featuredImage: featuredImage, // Reuse English featured image
        aiModel: model,
        aiPrompt: `${topic} [${lang.code}]`,
        sourceData: null,
        published: publish,
        publishedAt: publish ? new Date() : null,
      });

      console.log(`[bg-generate] ${lang.code}: translated and saved`);
    }

    // Run translations in parallel batches of 4, with retry for failures
    const BATCH_SIZE = 4;
    const failedLangs: { code: string; name: string }[] = [];

    for (let i = 0; i < targetLanguages.length; i += BATCH_SIZE) {
      const batch = targetLanguages.slice(i, i + BATCH_SIZE);
      console.log(`[bg-generate] Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.map(l => l.code).join(", ")}`);
      const results = await Promise.allSettled(batch.map(lang => translateOne(lang)));
      results.forEach((r, idx) => {
        if (r.status === "rejected") {
          console.warn(`[bg-generate] ${batch[idx].code}: FAILED - ${r.reason}`);
          failedLangs.push(batch[idx]);
        }
      });
    }

    // Retry failed translations sequentially (with small delay to avoid rate limits)
    if (failedLangs.length > 0) {
      console.log(`[bg-generate] Retrying ${failedLangs.length} failed translations: ${failedLangs.map(l => l.code).join(", ")}`);
      for (const lang of failedLangs) {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay between retries
          await translateOne(lang);
        } catch (retryErr) {
          console.warn(`[bg-generate] ${lang.code}: retry also failed - ${retryErr}`);
        }
      }
    }

    console.log("[bg-generate] All translations done!");
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
