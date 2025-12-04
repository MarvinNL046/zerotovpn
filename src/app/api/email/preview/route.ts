import { NextRequest, NextResponse } from "next/server";
import { generateWelcomeEmailHtml, getWelcomeEmailSubject } from "@/lib/resend";

// Valid languages matching the supported locales
const validLanguages = ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"];

/**
 * GET /api/email/preview?lang=en&type=welcome
 *
 * Preview email templates without sending them.
 * Returns HTML that can be viewed in browser.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";
  const type = searchParams.get("type") || "welcome";

  // Validate language
  const language = validLanguages.includes(lang) ? lang : "en";

  // Generate email based on type
  if (type === "welcome") {
    const html = generateWelcomeEmailHtml({
      email: "preview@example.com",
      language,
    });

    // Return as HTML for browser preview
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  // Unknown email type
  return NextResponse.json(
    { error: "Unknown email type. Available types: welcome" },
    { status: 400 }
  );
}

/**
 * POST /api/email/preview
 *
 * Get email metadata (subject, etc.) for a given language.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language = "en", type = "welcome" } = body;

    const normalizedLanguage = validLanguages.includes(language) ? language : "en";

    if (type === "welcome") {
      const subject = getWelcomeEmailSubject(normalizedLanguage);
      const html = generateWelcomeEmailHtml({
        email: "preview@example.com",
        language: normalizedLanguage,
      });

      return NextResponse.json({
        type: "welcome",
        language: normalizedLanguage,
        subject,
        html,
        supportedLanguages: validLanguages,
      });
    }

    return NextResponse.json(
      { error: "Unknown email type" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
