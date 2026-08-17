import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
};

type IpVersion = 4 | 6;

function boundedHeader(value: string | null, maxLength = 100): string | null {
  if (!value) return null;
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the original value when a platform header is not URI encoded.
  }
  const normalized = decoded.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

function normalizeIp(value: string): string | null {
  const candidate = value.trim().replace(/^\[|\]$/g, "");
  const mappedIpv4 = candidate.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  const normalized = mappedIpv4?.[1] ?? candidate;
  return isIP(normalized) === 0 ? null : normalized;
}

function readTrustedIp(request: NextRequest): string | null {
  // Vercel documents both headers as platform-managed client-IP headers. The
  // x-vercel variant stays distinct when another proxy sits in front.
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");
  if (!forwarded) return null;

  for (const value of forwarded.split(",")) {
    const ip = normalizeIp(value);
    if (ip) return ip;
  }
  return null;
}

function isLocalOrSpecialIpv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) {
    return true;
  }
  const [a, b, c] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113)
  );
}

function isLocalOrSpecialIp(ip: string, version: IpVersion): boolean {
  if (version === 4) return isLocalOrSpecialIpv4(ip);
  const normalized = ip.toLowerCase();
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    /^fe[89ab]/.test(normalized) ||
    normalized.startsWith("2001:db8:")
  );
}

function countryCode(value: string | null): string | null {
  const normalized = boundedHeader(value, 2)?.toUpperCase() ?? null;
  return normalized && /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

export async function GET(request: NextRequest) {
  const ip = readTrustedIp(request);
  if (!ip) {
    return NextResponse.json(
      {
        ok: false,
        schemaVersion: 1,
        code: "PUBLIC_IP_UNAVAILABLE",
        retryable: true,
      },
      { status: 503, headers: RESPONSE_HEADERS },
    );
  }

  const version = isIP(ip) as IpVersion;
  const scope = isLocalOrSpecialIp(ip, version)
    ? "local_preview"
    : "public";
  const observedAt = new Date().toISOString();

  const city = boundedHeader(request.headers.get("x-vercel-ip-city"));
  const region = boundedHeader(
    request.headers.get("x-vercel-ip-country-region"),
    80,
  );
  const detectedCountryCode = countryCode(
    request.headers.get("x-vercel-ip-country"),
  );
  const timezone = boundedHeader(
    request.headers.get("x-vercel-ip-timezone"),
    80,
  );
  const geoAvailable =
    scope === "public" &&
    Boolean(city || region || detectedCountryCode || timezone);

  const result = {
    ok: true as const,
    schemaVersion: 1,
    observedAt,
    route: { ip, version, scope },
    geo: {
      status: geoAvailable ? ("available" as const) : ("unavailable" as const),
      accuracy: "approximate" as const,
      city,
      region,
      country: null,
      countryCode: detectedCountryCode,
      timezone,
    },
    network: { organization: null, asn: null },
    checks: {
      vpn: "not_performed" as const,
      proxy: "not_performed" as const,
      dns: "not_performed" as const,
      webrtc: "not_performed" as const,
      encryption: "not_performed" as const,
    },

    // Compatibility fields for existing read-only consumers. Detection
    // results stay null because this endpoint does not perform these checks.
    ip,
    city: city ?? (scope === "local_preview" ? "Local Network" : ""),
    region: region ?? "",
    country: detectedCountryCode ?? (scope === "local_preview" ? "Local" : ""),
    countryCode: detectedCountryCode ?? "",
    isp: "",
    org: "",
    timezone: timezone ?? "",
    lat: 0,
    lon: 0,
    isVpn: null,
    isProxy: null,
    isHosting: null,
    vpnDetection: "unsupported" as const,
    zip: "",
    as: "",
  };

  return NextResponse.json(result, { headers: RESPONSE_HEADERS });
}
