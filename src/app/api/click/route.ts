import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vpnId, page, referrer } = body;

    // Get geo information from headers (Netlify/Vercel provide these)
    const country = request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-country") ||
      request.headers.get("x-nf-client-connection-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // First check if VPN exists in database
    const vpn = await sql`
      SELECT id FROM "VpnProvider" WHERE slug = ${vpnId} OR id = ${vpnId}
    `;

    if (vpn.length > 0) {
      // Insert click record
      await sql`
        INSERT INTO "Click" (id, vpn_id, page, country, referrer, user_agent, created_at)
        VALUES (gen_random_uuid()::text, ${vpn[0].id}, ${page}, ${country}, ${referrer}, ${userAgent}, NOW())
      `;
    } else {
      // Log click even if VPN not in DB yet
      console.log("Affiliate click (VPN not in DB):", {
        vpnId,
        country,
        referrer,
        page,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track click:", error);
    // Still return success - don't block user experience for tracking failures
    return NextResponse.json({ success: true });
  }
}
