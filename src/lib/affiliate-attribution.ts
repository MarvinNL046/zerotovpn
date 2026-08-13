/**
 * Build a deterministic, public placement identifier for partner reporting.
 * It intentionally contains only the rendered path; never add user, cookie or
 * session data here.
 */
export function buildPublicAffiliateSubId(pathname: string): string {
  const page = pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 90);

  return `zt_${page || "home"}`.slice(0, 100);
}

export function isNordAffiliateUrl(affiliateUrl: string): boolean {
  try {
    const url = new URL(affiliateUrl, "https://www.zerotovpn.com");
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

    return (
      (hostname === "go.zerotovpn.com" && path === "nordvpn") ||
      hostname === "go.nordvpn.net" ||
      hostname === "nordvpn.tpo.lv"
    );
  } catch {
    return false;
  }
}

/**
 * Add the publisher placement ID to a Nord destination while preserving the
 * original URL when it is malformed or belongs to another provider.
 */
export function withNordAffiliateSubId(affiliateUrl: string, pathname: string): string {
  if (!isNordAffiliateUrl(affiliateUrl)) return affiliateUrl;

  try {
    const url = new URL(affiliateUrl, "https://www.zerotovpn.com");
    url.searchParams.set("aff_sub", buildPublicAffiliateSubId(pathname));
    return url.toString();
  } catch {
    return affiliateUrl;
  }
}

