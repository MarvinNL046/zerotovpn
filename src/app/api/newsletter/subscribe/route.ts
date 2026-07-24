import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/resend";

// Nieuwsbrief-inschrijvingen gaan sinds de Neon-uitfasering naar de
// gedeelde wetry-sites-leads Convex-backend (zelfde plek als de andere
// content-sites). Deze route houdt de rate-limit, validatie en welkomstmail
// en stuurt de inschrijving server-side door.
const SITES_LEADS_URL =
  process.env.SITES_LEADS_URL ?? "https://beaming-ermine-172.convex.site";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(key) || [];
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  rateLimitMap.set(key, recentRequests);
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
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

    // Doorsturen naar de gedeelde subscribers-backend. "already_subscribed"
    // geeft daar ook ok:true terug, dus e-mail-enumeratie blijft onmogelijk.
    const res = await fetch(`${SITES_LEADS_URL}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site: "zerotovpn",
        email: normalizedEmail,
        locale: normalizedLanguage,
        source: typeof source === "string" ? source : "website",
      }),
    });

    if (!res.ok) {
      console.error("Subscribe-backend gaf status", res.status);
      return NextResponse.json(
        { error: "An error occurred. Please try again later." },
        { status: 500 }
      );
    }

    const result = (await res.json()) as { status?: string };
    const isNew = result.status !== "already_subscribed";

    // Send welcome email (non-blocking — alleen bij een nieuwe inschrijving)
    if (isNew) {
      sendWelcomeEmail({
        email: normalizedEmail,
        language: normalizedLanguage,
      }).catch((error) => {
        console.error("Failed to send welcome email:", error);
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
      },
      { status: isNew ? 201 : 200 }
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
