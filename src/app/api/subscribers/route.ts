import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, language = "en", source = "homepage" } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await sql`
      SELECT id FROM "Subscriber" WHERE email = ${email.toLowerCase()}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Create subscriber
    const result = await sql`
      INSERT INTO "Subscriber" (id, email, language, source, confirmed, created_at)
      VALUES (gen_random_uuid()::text, ${email.toLowerCase()}, ${language}, ${source}, false, NOW())
      RETURNING id, email, language, source
    `;

    console.log("New subscriber:", {
      id: result[0]?.id,
      email: result[0]?.email,
      language: result[0]?.language,
      source: result[0]?.source,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriberId: result[0]?.id,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
