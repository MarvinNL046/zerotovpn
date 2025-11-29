import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, language = "en", source = "homepage" } = body;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await sql`
      SELECT id FROM "Subscriber" WHERE email = ${email.toLowerCase()}
    `;

    if (existing.length > 0) {
      // Already subscribed, return success anyway (don't reveal subscription status)
      return NextResponse.json({ success: true });
    }

    // Create subscriber
    await sql`
      INSERT INTO "Subscriber" (id, email, language, source, confirmed, created_at)
      VALUES (gen_random_uuid()::text, ${email.toLowerCase()}, ${language}, ${source}, false, NOW())
    `;

    console.log("New subscriber:", {
      email: email.toLowerCase(),
      language,
      source,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
