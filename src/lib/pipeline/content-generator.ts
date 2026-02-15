import { generateContent, type AiModel } from "./ai-provider";
import { generateBlogImage, generateImage, toDataUrl } from "./image-generator";

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
    maxTokens: 16384,
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

  // Generate infographic images and replace placeholders in content
  await replaceInfographicPlaceholders(post);

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

// Replace INFOGRAPHIC_1 and INFOGRAPHIC_2 placeholders with Gemini-generated images
async function replaceInfographicPlaceholders(post: GeneratedPost): Promise<void> {
  const placeholders = [
    { src: "INFOGRAPHIC_1", index: 1 },
    { src: "INFOGRAPHIC_2", index: 2 },
  ];

  for (const { src, index } of placeholders) {
    if (!post.content.includes(`src="${src}"`)) continue;

    // Extract the alt text from the placeholder to use as prompt
    const altMatch = post.content.match(
      new RegExp(`src="${src}"\\s+alt="([^"]*)"`)
    );
    const altText = altMatch?.[1] || `Infographic for ${post.title} - part ${index}`;

    try {
      const prompt = `Create a clean, professional infographic for a VPN blog article.
The infographic should visualize: ${altText}
Style: modern flat design, clean data visualization, professional color palette (blues, greens, white).
Use icons, charts, or diagrams. Landscape format (16:9).
Do NOT include any readable text — use abstract shapes, icons, and visual metaphors only.`;

      const image = await generateImage(prompt);
      const dataUrl = toDataUrl(image);
      post.content = post.content.replace(`src="${src}"`, `src="${dataUrl}"`);
    } catch (error) {
      console.warn(`Failed to generate infographic ${index}:`, error);
      // Remove the broken placeholder img tag entirely
      post.content = post.content.replace(
        new RegExp(`<img\\s+src="${src}"[^>]*/>`, "g"),
        ""
      );
    }
  }
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

3. NUMBERED H2 SECTIONS: Use 10-11 numbered H2 headings like:
   <h2>1. Section Title Here</h2>
   Each H2 section should have:
   - 2 intro paragraphs with <strong>bold keywords</strong> on first mention
   - TWO H3 subheadings, each with a specific angle and 1-2 paragraphs
   - At least half the sections should include a bullet list (<ul><li>) with 3-5 practical points, each starting with a <strong>bold label</strong>

4. DID YOU KNOW CALLOUTS: Add 2-3 throughout the article:
   <p><strong>Did You Know?</strong></p>
   <p><strong>The actual fact with a stat here.</strong></p>
   <p>Source: <a href="https://source-url.com">Source Name</a></p>

5. COMPARISON TABLE: Include at least one data comparison table:
   <h3>Comparison subtitle</h3>
   <table><thead><tr><th>VPN</th><th>Feature</th><th>Price</th></tr></thead>
   <tbody><tr><td><strong>VPN Name</strong></td><td>Details</td><td><strong>$X.XX/mo</strong></td></tr></tbody></table>

6. CONCLUSION: Final H2 "Conclusion" section with 2 paragraphs summarizing key points and a CTA linking to the relevant ZeroToVPN page.

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
Use ONLY these trusted VPN industry sources for stats and claims:
- Statista VPN market data: https://www.statista.com/topics/7142/virtual-private-network-vpn-usage-worldwide/
- Security.org VPN research: https://www.security.org/vpn/
- Top10VPN free VPN reports: https://www.top10vpn.com/research/
- Comparitech VPN stats: https://www.comparitech.com/vpn/
- Freedom House internet freedom: https://freedomhouse.org/report/freedom-net
- CISA cybersecurity guidance: https://www.cisa.gov/topics/cybersecurity-best-practices
- EFF surveillance self-defense: https://ssd.eff.org/
- AV-TEST VPN testing: https://www.av-test.org/en/
Pick 3-5 that match the topic. Use descriptive anchor text, not "click here".

INFOGRAPHIC IMAGE PLACEHOLDERS (critical — include exactly 2 per article):
Place these HTML blocks between sections to mark where infographic images will be generated:

After section 3, add:
<img src="INFOGRAPHIC_1" alt="Infographic of [describe key visual: e.g., '5 key benefits of using a VPN for streaming with comparison data']." />
<p><em>A visual guide to [describe what the infographic shows]. Following these steps can [describe the benefit].</em></p>

After section 7, add:
<img src="INFOGRAPHIC_2" alt="Infographic showing [describe visual: e.g., 'VPN speed comparison across 6 providers with bar chart data']." />
<p><em>[Descriptive caption explaining what the infographic visualizes and its key takeaway].</em></p>

Rules for image placeholders:
- Use descriptive, specific alt text (not generic like "VPN image")
- Always include an italic caption below using <em> tags
- The caption should explain what the visual shows and why it matters
- Use src="INFOGRAPHIC_1" and src="INFOGRAPHIC_2" exactly — they will be replaced with generated images

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
  jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```\s*$/, "");

  // Try to find a JSON object in the response (handles leading/trailing text)
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonStr = jsonMatch[0];
  }

  try {
    const parsed = JSON.parse(jsonStr);

    return {
      title: parsed.title || "Untitled Post",
      slug: parsed.slug || slugify(parsed.title || "untitled"),
      excerpt: (parsed.excerpt || "").slice(0, 160),
      content: parsed.content || "",
      metaTitle: (parsed.metaTitle || parsed.title || "").slice(0, 60),
      metaDescription: (parsed.metaDescription || parsed.excerpt || "").slice(0, 155),
      category: postType,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    };
  } catch {
    // If JSON parsing fails completely, try to extract fields manually
    const titleMatch = rawResponse.match(/"title"\s*:\s*"([^"]+)"/);
    const slugMatch = rawResponse.match(/"slug"\s*:\s*"([^"]+)"/);
    const excerptMatch = rawResponse.match(/"excerpt"\s*:\s*"([^"]+)"/);
    const contentMatch = rawResponse.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"meta|"\s*,\s*"tags|"\s*\})/);

    if (titleMatch && contentMatch) {
      // Partial JSON recovery - unescape the content string
      const content = contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      const title = titleMatch[1];
      return {
        title,
        slug: slugMatch?.[1] || slugify(title),
        excerpt: (excerptMatch?.[1] || content.slice(0, 155)).slice(0, 160),
        content,
        metaTitle: title.slice(0, 60),
        metaDescription: (excerptMatch?.[1] || content.slice(0, 155)).slice(0, 155),
        category: postType,
        tags: [],
      };
    }

    // Last resort: treat the whole response as HTML content
    const title = rawResponse.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1] ||
      rawResponse.match(/^#\s+(.+)/m)?.[1] || "Generated Post";
    return {
      title,
      slug: slugify(title),
      excerpt: rawResponse.replace(/<[^>]+>/g, "").slice(0, 155),
      content: rawResponse,
      metaTitle: title.slice(0, 60),
      metaDescription: rawResponse.replace(/<[^>]+>/g, "").slice(0, 155),
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
