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
CONTENT STYLE GUIDE:
- Start with a "Key Takeaways" section as a bullet-point summary box
- Use numbered H2 headings for main sections (e.g., "1. Best Overall VPN", "2. Fastest VPN")
- Bold important keywords and VPN names on first mention
- Include comparison tables where relevant (markdown table format)
- Add "Did You Know?" callout boxes for interesting facts (format: > **Did You Know?** ...)
- Write in an authoritative but accessible tone
- Include specific data points (prices, server counts, speeds)
- End with a clear "Bottom Line" or "Our Verdict" section
- Target 1200-1800 words
- Optimize for SEO — naturally include the topic keywords
`;

  const contextSection = scrapeData
    ? `\nREFERENCE DATA (use this for accuracy):\n${scrapeData.slice(0, 3000)}\n`
    : "";

  const typeInstructions: Record<PostType, string> = {
    news: `Write a VPN news roundup article. Summarize recent developments, new features, and industry changes. Include quotes or data points where possible.`,
    comparison: `Write a detailed VPN comparison article. Include a comparison table with key metrics (price, servers, speed, features). Give a clear winner recommendation.`,
    deal: `Write a VPN deals roundup article. Highlight the best current discounts, include original vs discounted prices, and explain what makes each deal worth it. Create urgency with expiration dates.`,
    guide: `Write an informative VPN guide article. Explain concepts clearly for beginners while including enough depth for intermediate users. Include practical examples and actionable advice.`,
  };

  return `You are a VPN expert writer for ZeroToVPN.com, a VPN comparison and review site.

Write a blog post about: "${topic}"

${typeInstructions[postType]}

${styleGuide}
${contextSection}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown code blocks):
{
  "title": "The blog post title",
  "slug": "url-friendly-slug",
  "excerpt": "A compelling 1-2 sentence excerpt for previews (max 160 chars)",
  "content": "The full blog post content in HTML format",
  "metaTitle": "SEO optimized title (max 60 chars)",
  "metaDescription": "SEO meta description (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3"]
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
