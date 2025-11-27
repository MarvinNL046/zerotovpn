import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db"; // Uncomment when database is connected

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vpnId, page, referrer } = body;

    // Get geo information from headers (Netlify/Vercel provide these)
    const country = request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-country") ||
      "unknown";
    const city = request.headers.get("x-vercel-ip-city") ||
      request.headers.get("x-city") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Log click for now (replace with database insert when connected)
    console.log("Affiliate click:", {
      vpnId,
      country,
      city,
      referrer,
      userAgent,
      page,
      timestamp: new Date().toISOString(),
    });

    // Uncomment when database is connected:
    // await prisma.click.create({
    //   data: {
    //     vpnId,
    //     country,
    //     city,
    //     referrer,
    //     userAgent,
    //     page,
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track click:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track click" },
      { status: 500 }
    );
  }
}
