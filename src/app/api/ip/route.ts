import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1. Get IP from request headers (Cloudflare, Netlify, generic proxies)
  const cfIp = request.headers.get("cf-connecting-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip =
    cfIp ||
    (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
    realIp ||
    "unknown";

  // 2. Return basic info for private/localhost addresses without geo lookup
  const isPrivate =
    ip === "unknown" ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.20.") ||
    ip.startsWith("172.21.") ||
    ip.startsWith("172.22.") ||
    ip.startsWith("172.23.") ||
    ip.startsWith("172.24.") ||
    ip.startsWith("172.25.") ||
    ip.startsWith("172.26.") ||
    ip.startsWith("172.27.") ||
    ip.startsWith("172.28.") ||
    ip.startsWith("172.29.") ||
    ip.startsWith("172.30.") ||
    ip.startsWith("172.31.");

  if (isPrivate) {
    return NextResponse.json(
      {
        ip,
        city: "Local Network",
        region: "",
        country: "Local",
        countryCode: "",
        isp: "Local Network",
        org: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        lat: 0,
        lon: 0,
        isVpn: false,
        isProxy: false,
        isHosting: false,
        zip: "",
        as: "",
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // 3. Fetch geo data from ipapi.co (HTTPS, free tier 1000 req/day, no key needed)
  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        // User-Agent avoids 403 on some free tier endpoints
        "User-Agent": "zerotovpn.com/1.0",
      },
    });

    if (!geoResponse.ok) {
      throw new Error(`Geo API returned ${geoResponse.status}`);
    }

    const geo = await geoResponse.json();

    // ipapi.co signals errors with an "error" boolean field
    if (geo.error) {
      throw new Error(geo.reason || "Geo lookup failed");
    }

    return NextResponse.json(
      {
        ip: geo.ip || ip,
        city: geo.city || "",
        region: geo.region || "",
        country: geo.country_name || "",
        countryCode: geo.country_code || "",
        isp: geo.org || "",
        org: geo.org || "",
        timezone: geo.timezone || "",
        lat: geo.latitude || 0,
        lon: geo.longitude || 0,
        // ipapi.co free tier does not expose proxy/VPN flags; default to false
        isVpn: false,
        isProxy: false,
        isHosting: false,
        zip: geo.postal || "",
        as: geo.asn || "",
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("IP geo lookup failed:", error);

    // Fallback: return the raw IP without geo data so callers still have the IP
    return NextResponse.json(
      {
        ip,
        city: "",
        region: "",
        country: "",
        countryCode: "",
        isp: "",
        org: "",
        timezone: "",
        lat: 0,
        lon: 0,
        isVpn: false,
        isProxy: false,
        isHosting: false,
        zip: "",
        as: "",
        error: "Geo lookup unavailable",
      },
      {
        status: 200, // Still 200 so callers can use the IP even without geo
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
