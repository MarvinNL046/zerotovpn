import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vpnId, page, referrer } = body;

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-country") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    console.log("[affiliate-click]", JSON.stringify({
      vpnId,
      page,
      referrer,
      country,
      userAgent,
      ts: new Date().toISOString(),
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track click:", error);
    return NextResponse.json({ success: true });
  }
}
