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

// Generate a full blog post using AI (text + images in one call)
export async function generateBlogPost(
  topic: string,
  scrapeData: string | null,
  model: AiModel
): Promise<GeneratedPost> {
  const post = await generateBlogPostText(topic, scrapeData, model);
  await generateBlogPostImages(post);
  return post;
}

// Generate blog post text only (no images) — fast step
export async function generateBlogPostText(
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

  return parseGeneratedPost(rawResponse, postType);
}

// Generate images for a blog post (featured + infographics) — slow step
// Accepts optional onProgress callback for streaming progress updates
export async function generateBlogPostImages(
  post: GeneratedPost,
  onProgress?: (message: string) => void
): Promise<void> {
  // Generate featured image via Gemini
  try {
    onProgress?.("Generating featured image...");
    const image = await generateBlogImage(post.title, post.category);
    post.featuredImage = toDataUrl(image);
    onProgress?.("Featured image done");
  } catch (error) {
    console.warn("Failed to generate featured image:", error);
    onProgress?.("Featured image skipped (error)");
  }

  // Generate infographic images and replace placeholders in content
  await replaceInfographicPlaceholders(post, onProgress);
}

// Auto-select a topic dynamically using AI — avoids duplicates by checking existing posts
export async function autoSelectTopic(
  scrapeData: Array<{ type: string; result?: string | null }>,
  existingTitles?: string[]
): Promise<string> {
  const { getDb, blogPosts } = await import("@/lib/db");
  const { eq } = await import("drizzle-orm");

  // Get existing titles from DB if not provided
  let titles = existingTitles;
  if (!titles) {
    const db = getDb();
    const existingPosts = await db
      .select({ title: blogPosts.title })
      .from(blogPosts)
      .where(eq(blogPosts.language, "en"));
    titles = existingPosts.map((p) => p.title);
  }

  const scrapeContext = scrapeData
    .map((s) => s.result)
    .filter(Boolean)
    .join("\n")
    .slice(0, 2000);

  const now = new Date();
  const month = now.toLocaleString("en", { month: "long" });
  const year = now.getFullYear();

  const topicPrompt = `You are a senior VPN content strategist for ZeroToVPN.com, a VPN comparison and review website.

Pick ONE compelling blog post topic that will rank well on Google and drive organic traffic.

The topic should be:
- About VPNs, online privacy, cybersecurity, or related subjects
- Specific and searchable (not too broad, not too niche)
- Timely for ${month} ${year}
- Different from ALL of these already-published titles:
${titles.map((t) => `  - ${t}`).join("\n") || "  (none yet)"}

${scrapeContext ? `Recent industry data for inspiration:\n${scrapeContext}\n` : ""}

Topic categories to rotate between: reviews, comparisons (VPN vs VPN), how-to guides, best-of lists, security news analysis, protocol deep-dives, use-case guides (streaming, gaming, travel, torrenting), myth-busting, deal roundups.

Respond with ONLY the blog post title — nothing else. No quotes, no explanation.`;

  try {
    const topicResponse = await generateContent(topicPrompt, {
      model: "claude-haiku",
      maxTokens: 100,
      temperature: 0.9,
    });
    const topic = topicResponse.trim().replace(/^["']|["']$/g, "");
    if (topic && topic.length > 10 && topic.length < 120) {
      return topic;
    }
  } catch (err) {
    console.warn("AI topic selection failed, using fallback:", err);
  }

  // Fallback with date to ensure uniqueness
  return `VPN Guide and Tips - ${month} ${year}`;
}

// Replace INFOGRAPHIC_1 and INFOGRAPHIC_2 placeholders with Gemini-generated images
async function replaceInfographicPlaceholders(
  post: GeneratedPost,
  onProgress?: (message: string) => void
): Promise<void> {
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
      onProgress?.(`Generating infographic ${index}...`);
      const prompt = `Create a clean, professional infographic-style illustration for a VPN blog article.
The illustration should visualize: ${altText}
Style: modern flat design, clean data visualization, professional color palette (blues, greens, white).
Use icons, charts, diagrams, abstract shapes, and visual metaphors. Landscape format (16:9).
CRITICAL RULE: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO labels, ZERO watermarks, ZERO captions. No characters of any language or alphabet whatsoever. Only use icons, shapes, colors, and visual elements to convey meaning.`;

      const image = await generateImage(prompt);
      const dataUrl = toDataUrl(image);
      post.content = post.content.replace(`src="${src}"`, `src="${dataUrl}"`);
      onProgress?.(`Infographic ${index} done`);
    } catch (error) {
      console.warn(`Failed to generate infographic ${index}:`, error);
      onProgress?.(`Infographic ${index} skipped (error)`);
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

6. CONCLUSION: Final H2 "Conclusion" section with 2 paragraphs summarizing key points, a CTA linking to the relevant ZeroToVPN page, and a trust statement like "Based on our independent testing of 50+ VPN services, we stand behind these recommendations. Learn more about <a href=\"https://zerotovpn.com/about\">our testing methodology</a>."

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

E-E-A-T SIGNALS (critical for Google rankings — weave these throughout):
- EXPERIENCE: Reference hands-on testing (e.g., "In our testing...", "When we benchmarked...", "Our team measured...")
- EXPERTISE: Use precise technical terms and data (server counts, encryption standards, protocol names)
- AUTHORITATIVENESS: Cite credible external sources in "Did You Know?" callouts and comparison data
- TRUSTWORTHINESS: Be balanced — mention downsides too, not just positives. Include phrases like "Based on our independent testing" or "According to verified data from..."
- Every claim with a specific number MUST have a source (either in a "Did You Know?" callout or inline)
- Use "we" voice to show team expertise: "We tested...", "Our analysis shows...", "We recommend..."

FORMATTING RULES:
- Bold VPN names and key terms on first mention in each section
- Use <strong> for emphasis, never <b>
- All links use full absolute URLs (https://zerotovpn.com/...)
- Target 1800-2500 words for comprehensive SEO coverage
- Write in authoritative but accessible tone — expert but not jargon-heavy
- Include specific data points (prices, server counts, speeds, percentages)
- Every stat or claim must be attributable to a real source
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

  return `You are a senior VPN expert writer for ZeroToVPN.com, an independent VPN comparison and review site run by cybersecurity professionals.
Your team has personally tested 50+ VPN services through rigorous speed tests, security audits, and real-world usage. You write from first-hand experience.

Write a comprehensive, fact-checked blog post about: "${topic}"

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
