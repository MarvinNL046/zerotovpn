import { NextResponse } from "next/server";
import { getClickAnalytics } from "@/lib/shortio";

export async function GET(request: Request) {
  try {
    // Get days parameter from URL
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7", 10);

    // Fetch analytics from Short.io
    const analytics = await getClickAnalytics(days);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch analytics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
