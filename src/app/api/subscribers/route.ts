import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    const existing = await prisma.subscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Create subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email: email.toLowerCase(),
        language,
        source,
        confirmed: false, // Email confirmation can be added later
      },
    });

    console.log("New subscriber:", {
      id: subscriber.id,
      email: subscriber.email,
      language: subscriber.language,
      source: subscriber.source,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriberId: subscriber.id,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
