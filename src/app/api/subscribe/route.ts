import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db"; // Uncomment when database is connected

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

    // Log subscription for now (replace with database insert when connected)
    console.log("New subscriber:", {
      email,
      language,
      source,
      timestamp: new Date().toISOString(),
    });

    // Uncomment when database is connected:
    // await prisma.subscriber.upsert({
    //   where: { email },
    //   update: { language, source },
    //   create: { email, language, source },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
