const PUBLIC_LOCALES = new Set([
  "en",
  "nl",
  "de",
  "es",
  "fr",
  "zh",
  "ja",
  "ko",
  "th",
]);

const NORDVPN_BANNER_PROMOTION_PATHS = new Set([
  "/",
  "/reviews",
  "/compare",
  "/quiz",
  "/best/best-vpn",
  "/best/vpn-android-tablet",
  "/best/vpn-android",
  "/best/vpn-cheap",
  "/best/vpn-chromebook",
  "/best/vpn-firestick",
  "/best/vpn-gaming",
  "/best/vpn-ipad",
  "/best/vpn-iphone",
  "/best/vpn-laptops",
  "/best/vpn-linux",
  "/best/vpn-macos",
  "/best/vpn-mobile",
  "/best/vpn-privacy",
  "/best/vpn-windows",
  "/guides/vpn-privacy-guide",
  "/guides/vpn-speed-guide",
]);

/**
 * Normalizes the optional next-intl locale prefix without depending on any
 * server-only module. This helper is intentionally safe to import in a Client
 * Component.
 */
export function normalizeNordPromotionPath(pathname: string): string {
  const cleanPath = pathname.trim().split(/[?#]/, 1)[0] || "/";
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments[0] && PUBLIC_LOCALES.has(segments[0].toLowerCase())) {
    segments.shift();
  }

  return segments.length > 0 ? `/${segments.join("/").toLowerCase()}` : "/";
}

/**
 * Nord promotion is deliberately fail-closed. The warning itself can appear
 * on every public page, but the commercial action belongs only in genuine VPN
 * selection contexts. Unknown articles, country/circumvention pages, free-VPN
 * pages and P2P/port-forwarding content therefore receive the neutral IP-tool
 * action instead.
 */
export function isNordVpnBannerPromotionAllowed(pathname: string): boolean {
  const normalizedPath = normalizeNordPromotionPath(pathname);

  return (
    NORDVPN_BANNER_PROMOTION_PATHS.has(normalizedPath) ||
    normalizedPath.startsWith("/reviews/") ||
    normalizedPath.startsWith("/compare/")
  );
}
