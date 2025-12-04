import { NextRequest, NextResponse } from "next/server";
import { db, subscribers } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendWelcomeEmail } from "@/lib/resend";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(key) || [];

  // Filter out old requests outside the window
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  // Update the map
  rateLimitMap.set(key, recentRequests);

  // Check if rate limited
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(key, recentRequests);

  return false;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email, language = "en", source = "website" } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"];
    const normalizedLanguage = validLanguages.includes(language) ? language : "en";

    // Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, normalizedEmail))
      .limit(1);

    if (existingSubscriber.length > 0) {
      // Don't reveal that email exists (prevent email enumeration)
      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed!"
        },
        { status: 200 }
      );
    }

    // Insert new subscriber
    await db.insert(subscribers).values({
      email: normalizedEmail,
      language: normalizedLanguage,
      source,
      confirmed: false,
      createdAt: new Date(),
    });

    // Send welcome email (non-blocking - don't wait for it)
    sendWelcomeEmail({
      email: normalizedEmail,
      language: normalizedLanguage,
    }).catch((error) => {
      // Log error but don't fail the subscription
      console.error("Failed to send welcome email:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!"
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
