import { generateContent, type AiModel } from "./ai-provider";
import { generateBlogImage, toDataUrl } from "./image-generator";

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  category: "news" | "guide" | "comparison" | "deal";
  tags: string[];
  featuredImage?: string; // data URL of generated image
}

type PostType = "news" | "comparison" | "deal" | "guide";

// Generate a full blog post using AI
export async function generateBlogPost(
  topic: string,
  scrapeData: string | null,
  model: AiModel
): Promise<GeneratedPost> {
  const postType = detectPostType(topic);
  const prompt = buildPrompt(topic, postType, scrapeData);

  const rawResponse = await generateContent(prompt, {
    model,
    maxTokens: 4096,
    temperature: 0.7,
  });

  const post = parseGeneratedPost(rawResponse, postType);

  // Generate featured image via Gemini (non-blocking — post still works without it)
  try {
    const image = await generateBlogImage(post.title, post.category);
    post.featuredImage = toDataUrl(image);
  } catch (error) {
    console.warn("Failed to generate featured image:", error);
  }

  return post;
}

// Auto-select a topic based on available scrape data
export function autoSelectTopic(
  scrapeData: Array<{ type: string; result?: string | null }>
): string {
  const hasNews = scrapeData.some((d) => d.type === "news" && d.result);
  const hasPricing = scrapeData.some((d) => d.type === "pricing" && d.result);

  if (hasPricing) {
    return "VPN Price Comparison Update: Best Deals This Month";
  }
  if (hasNews) {
    return "This Week in VPN: Latest News and Security Updates";
  }

  // Rotating default topics
  const defaultTopics = [
    "Best Free VPNs That Actually Work in 2026",
    "VPN Speed Test Results: Which VPN Is Fastest?",
    "How to Choose the Right VPN for Streaming",
    "Top 5 VPNs for Privacy-Conscious Users",
    "VPN Security Features Explained: What Really Matters",
  ];

  const weekOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  return defaultTopics[weekOfYear % defaultTopics.length];
}

function detectPostType(topic: string): PostType {
  const lower = topic.toLowerCase();
  if (lower.includes("deal") || lower.includes("discount") || lower.includes("price") || lower.includes("coupon")) {
    return "deal";
  }
  if (lower.includes("vs") || lower.includes("comparison") || lower.includes("compare")) {
    return "comparison";
  }
  if (lower.includes("news") || lower.includes("update") || lower.includes("week in")) {
    return "news";
  }
  return "guide";
}

function buildPrompt(
  topic: string,
  postType: PostType,
  scrapeData: string | null
): string {
  const styleGuide = `
CONTENT STRUCTURE (follow this EXACT structure — modeled after high-performing blog posts):

1. OPENING: Start with a compelling intro paragraph (2-3 sentences) with a hook stat. Bold the most important keyword on first use.

2. KEY TAKEAWAYS TABLE: Immediately after intro, add an HTML table with Q&A format:
   <h2>Key Takeaways</h2>
   <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>
   <tr><td><strong>Question here?</strong></td><td>Answer with <strong>bold keywords</strong> and <a href="https://zerotovpn.com/relevant-page">internal links</a>.</td></tr>
   </tbody></table>
   Include 5-7 rows covering the main points of the article.

3. NUMBERED H2 SECTIONS: Use 8-11 numbered H2 headings like:
   <h2>1. Section Title Here</h2>
   Each H2 section should have:
   - 2-3 intro paragraphs with <strong>bold keywords</strong> on first mention
   - An H3 subheading with a specific angle
   - A bullet list (<ul><li>) with 3-5 practical points, each starting with a <strong>bold label</strong>

4. DID YOU KNOW CALLOUTS: Add 2-3 throughout the article:
   <p><strong>Did You Know?</strong></p>
   <p><strong>The actual fact with a stat here.</strong></p>
   <p>Source: <a href="https://source-url.com">Source Name</a></p>

5. COMPARISON TABLE: Include at least one data comparison table:
   <h3>Comparison subtitle</h3>
   <table><thead><tr><th>VPN</th><th>Feature</th><th>Price</th></tr></thead>
   <tbody><tr><td><strong>VPN Name</strong></td><td>Details</td><td><strong>$X.XX/mo</strong></td></tr></tbody></table>

6. CONCLUSION: Final H2 "Conclusion" section with 2 paragraphs summarizing key points and a CTA linking to the relevant ZeroToVPN page.

INTERNAL LINKING (critical for SEO — include 6-10 internal links naturally):
- Link to VPN reviews: <a href="https://zerotovpn.com/reviews/nordvpn">NordVPN review</a>
- Link to best pages: <a href="https://zerotovpn.com/best/best-vpn">best VPNs</a>
- Link to compare: <a href="https://zerotovpn.com/compare">VPN comparison tool</a>
- Link to deals: <a href="https://zerotovpn.com/deals">current VPN deals</a>
- Link to guides: <a href="https://zerotovpn.com/guides/what-is-vpn">what is a VPN</a>
- Link to other blog posts: <a href="https://zerotovpn.com/blog/is-vpn-legal">VPN legality guide</a>

EXTERNAL LINKING (include 2-4 credible sources):
- Link to authoritative sources for stats and claims
- Use descriptive anchor text, not "click here"

IMAGE ALT TEXT HINTS (for AI image generation):
- After section 3, add: <!-- IMAGE: descriptive scene for featured image -->
- After section 6, add: <!-- IMAGE: descriptive scene for mid-article image -->

FORMATTING RULES:
- Bold VPN names and key terms on first mention in each section
- Use <strong> for emphasis, never <b>
- All links use full absolute URLs (https://zerotovpn.com/...)
- Target 1800-2500 words for comprehensive SEO coverage
- Write in authoritative but accessible tone
- Include specific data points (prices, server counts, speeds, percentages)
`;

  const contextSection = scrapeData
    ? `\nREFERENCE DATA (use this for accuracy — cite real numbers):\n${scrapeData.slice(0, 3000)}\n`
    : "";

  const typeInstructions: Record<PostType, string> = {
    news: `Write a VPN news roundup article. Cover 3-4 recent developments with analysis. Each news item gets its own numbered H2 section. Include "Why This Matters" subheadings.`,
    comparison: `Write a detailed VPN comparison article. The Key Takeaways table should compare the VPNs directly. Include a main comparison table and individual analysis per VPN. End with a clear winner and runner-up.`,
    deal: `Write a VPN deals roundup article. Each deal gets its own numbered H2 section. Show original price vs deal price with savings percentage. Include urgency with expiration context. Add a "deal score" rating.`,
    guide: `Write an in-depth VPN guide article. Start with fundamentals, progress to advanced tips. Include step-by-step instructions with numbered lists. Add practical examples and real-world scenarios.`,
  };

  return `You are a senior VPN expert writer for ZeroToVPN.com, the leading VPN comparison and review site.

Write a comprehensive blog post about: "${topic}"

${typeInstructions[postType]}

${styleGuide}
${contextSection}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown code blocks):
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

function parseGeneratedPost(
  rawResponse: string,
  postType: PostType
): GeneratedPost {
  // Try to extract JSON from the response
  let jsonStr = rawResponse.trim();

  // Remove markdown code block wrappers if present
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr);

    return {
      title: parsed.title || "Untitled Post",
      slug: parsed.slug || slugify(parsed.title || "untitled"),
      excerpt: parsed.excerpt || "",
      content: parsed.content || "",
      metaTitle: parsed.metaTitle || parsed.title || "",
      metaDescription: parsed.metaDescription || parsed.excerpt || "",
      category: postType,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    };
  } catch {
    // If JSON parsing fails, treat the whole response as content
    const title = rawResponse.match(/^#\s+(.+)/m)?.[1] || "Generated Post";
    return {
      title,
      slug: slugify(title),
      excerpt: rawResponse.slice(0, 155),
      content: rawResponse,
      metaTitle: title,
      metaDescription: rawResponse.slice(0, 155),
      category: postType,
      tags: [],
    };
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
