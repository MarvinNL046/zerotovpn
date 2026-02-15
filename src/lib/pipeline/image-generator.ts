const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

export interface GeneratedImage {
  base64: string;
  mimeType: string;
  prompt: string;
}

// Generate an image using Gemini API
export async function generateImage(prompt: string): Promise<GeneratedImage> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini image API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;

  if (!parts) {
    throw new Error("No content in Gemini response");
  }

  // Gemini API may use either inline_data (snake_case) or inlineData (camelCase)
  const imagePart = parts.find(
    (p: { inline_data?: { mime_type: string; data: string }; inlineData?: { mimeType: string; data: string } }) =>
      p.inline_data || p.inlineData
  );

  if (imagePart?.inlineData) {
    return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType || "image/png", prompt };
  }
  if (imagePart?.inline_data) {
    return { base64: imagePart.inline_data.data, mimeType: imagePart.inline_data.mime_type || "image/png", prompt };
  }

  throw new Error("No image generated in Gemini response");
}

// Generate a blog post featured image
export async function generateBlogImage(
  title: string,
  category: string
): Promise<GeneratedImage> {
  const styleMap: Record<string, string> = {
    news: "modern tech news illustration, digital, clean lines, blue tones",
    guide:
      "informative infographic style, step-by-step visual, friendly colors",
    comparison:
      "side-by-side comparison chart visual, clean data visualization",
    deal: "exciting promotional banner, bold colors, discount theme, savings",
  };

  const style = styleMap[category] || styleMap.guide;

  const prompt = `Create a professional blog header image for an article titled "${title}".
Style: ${style}.
The image should be landscape format (16:9), modern, and suitable for a VPN comparison website called ZeroToVPN.
Do NOT include any text in the image. Use abstract tech visuals, shields, locks, or network imagery.`;

  return generateImage(prompt);
}

// Generate a VPN comparison diagram
export async function generateComparisonDiagram(
  vpnNames: string[],
  metric: string
): Promise<GeneratedImage> {
  const prompt = `Create a clean, professional comparison diagram showing ${vpnNames.join(", ")} compared by ${metric}.
Use a modern infographic style with clear data visualization.
Bar chart or radar chart format. Professional color palette.
No text labels needed - just clean visual shapes and colors.`;

  return generateImage(prompt);
}

// Convert base64 image to a data URL for embedding
export function toDataUrl(image: GeneratedImage): string {
  return `data:${image.mimeType};base64,${image.base64}`;
}
