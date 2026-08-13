const BASE = (process.env.AFFILIATE_SUBID_AUDIT_BASE ?? "https://www.zerotovpn.com").replace(/\/$/, "");
const timeoutMs = Math.max(1000, Number(process.env.AFFILIATE_SUBID_AUDIT_TIMEOUT_MS ?? 15000));

// Keep this list intentionally small and representative. It is a deployment
// guard, not a replacement for the full affiliate-context crawl.
const targets = [
  { path: "/blog/vpn-simultaneous-connections-limits-workarounds-2026", expectNord: true },
  { path: "/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy", expectNord: true },
  { path: "/blog/vpn-connection-drops-why-disconnects-how-to-fix-2026", expectNord: false },
  { path: "/blog/vpn-account-sharing-safe-guide-2026", expectNord: false },
];

const nordHosts = new Set(["go.nordvpn.net", "nordvpn.tpo.lv"]);

function decodeHtml(value) {
  return value.replace(/&amp;/gi, "&").replace(/&#x2f;/gi, "/").replace(/&#47;/gi, "/");
}

function isNord(url) {
  const host = url.hostname.toLowerCase();
  const path = url.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  return nordHosts.has(host) || (host === "go.zerotovpn.com" && path === "nordvpn");
}

function isRedirectAffiliate(url) {
  return url.hostname.toLowerCase() === "go.zerotovpn.com";
}

function buildExpectedSubId(pathname) {
  const page = pathname.replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase().slice(0, 90);
  return `zt_${page || "home"}`.slice(0, 100);
}

function extractAnchors(html) {
  const anchors = [];
  for (const match of html.matchAll(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>/gi)) {
    const href = decodeHtml(match[2]);
    try {
      const url = new URL(href, BASE);
      anchors.push({ href, url });
    } catch {
      // Ignore malformed/non-URL anchors; they cannot be an attribution link.
    }
  }
  return anchors;
}

async function fetchHtml(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(`${BASE}${path}`, {
      signal: controller.signal,
      headers: { "user-agent": "ZeroToVPN affiliate sub-ID audit/1.0" },
    });
    return { status: response.status, durationMs: Date.now() - started, html: await response.text(), error: null };
  } catch (error) {
    return { status: null, durationMs: Date.now() - started, html: "", error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const records = [];
for (const target of targets) {
  const response = await fetchHtml(target.path);
  const anchors = extractAnchors(response.html);
  const nord = anchors.filter(({ url }) => isNord(url));
  const redirect = anchors.filter(({ url }) => isRedirectAffiliate(url));
  // The default production locale is `en`, even when its prefix is omitted
  // from the public canonical URL.
  const expected = buildExpectedSubId(target.expectedAttributionPath ?? `/en${target.path}`);
  const nordMissingOrWrong = nord
    .filter(({ url }) => url.searchParams.get("aff_sub") !== expected)
    .map(({ href }) => href);
  const nonNordTagged = redirect
    .filter(({ url }) => !isNord(url) && url.searchParams.has("aff_sub"))
    .map(({ href }) => href);
  const failures = [];
  if (response.status !== 200) failures.push(`HTTP ${response.status ?? response.error}`);
  if (target.expectNord && nord.length === 0) failures.push("expected at least one Nord affiliate anchor");
  if (nordMissingOrWrong.length > 0) failures.push(`Nord anchors missing expected aff_sub (${expected})`);
  if (nonNordTagged.length > 0) failures.push("non-Nord redirect carries aff_sub");
  records.push({ path: target.path, status: response.status, durationMs: response.durationMs, expectedSubId: expected, nordAnchorCount: nord.length, redirectAffiliateCount: redirect.length, nordMissingOrWrong, nonNordTagged, ok: failures.length === 0, failures, error: response.error });
}

const summary = {
  base: BASE,
  checked: records.length,
  ok: records.every((record) => record.ok),
  nordAnchors: records.reduce((sum, record) => sum + record.nordAnchorCount, 0),
  taggedNordAnchors: records.reduce((sum, record) => sum + record.nordAnchorCount - record.nordMissingOrWrong.length, 0),
  failures: records.flatMap((record) => record.failures.map((failure) => `${record.path}: ${failure}`)),
};

console.log(JSON.stringify({ summary, records }, null, 2));
if (!summary.ok) process.exitCode = 1;
