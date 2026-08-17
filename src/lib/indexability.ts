/**
 * Edge-safe admission policy for routes that have completed the evidence-led
 * editorial migration. Route metadata and sitemap generation can share these
 * constants, while the proxy uses `shouldNoindexPath` as a final HTTP guard.
 */
export const INDEXABILITY_LOCALES = [
  "en",
  "nl",
  "de",
  "es",
  "fr",
  "zh",
  "ja",
  "ko",
  "th",
] as const;

export type IndexabilityLocale = (typeof INDEXABILITY_LOCALES)[number];

const DEFAULT_LOCALE: IndexabilityLocale = "en";
const INDEXABILITY_LOCALE_SET = new Set<string>(INDEXABILITY_LOCALES);

export const INDEXABLE_HOMEPAGE_LOCALES = ["en", "nl"] as const;

export const INDEXABLE_SECTION_HUB_LOCALES = {
  "/reviews": ["en", "nl"],
  "/compare": ["en", "nl"],
  "/countries": ["en", "nl"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_REVIEW_LOCALES = {
  nordvpn: ["en", "nl"],
  surfshark: ["en"],
  protonvpn: ["en"],
  airvpn: ["en"],
  "urban-vpn": ["en"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_COMPARISON_LOCALES = {
  "nordvpn-vs-surfshark": ["en", "nl"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_COUNTRY_LOCALES = {
  netherlands: ["en", "nl"],
  iran: ["en"],
  china: ["en"],
  russia: ["en"],
  vietnam: ["en"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_BEST_ROUTE_LOCALES = {
  "/best/best-vpn": ["en", "nl"],
  "/best/vpn-macos": INDEXABILITY_LOCALES,
  "/best/free-vpn": ["en", "fr", "es"],
  "/best/vpn-android-tablet": ["en"],
  "/best/vpn-android": ["en"],
  "/best/vpn-cheap": ["en"],
  "/best/vpn-chromebook": ["en"],
  "/best/vpn-firestick": ["en"],
  "/best/vpn-gaming": ["en"],
  "/best/vpn-ipad": ["en"],
  "/best/vpn-iphone": ["en"],
  "/best/vpn-laptops": ["en"],
  "/best/vpn-linux": ["en"],
  "/best/vpn-mobile": ["en"],
  "/best/vpn-port-forwarding": ["en"],
  "/best/vpn-privacy": ["en"],
  "/best/vpn-windows": ["en"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_GUIDE_ROUTE_LOCALES = {
  "/guides": ["en", "nl"],
  "/guides/what-is-vpn": ["en", "nl"],
  "/guides/vpn-privacy-guide": ["en", "nl"],
  "/guides/vpn-speed-guide": ["en", "nl"],
  "/guides/vpn-obfuscation-explained": ["en"],
  "/guides/vpn-for-restricted-networks": ["en"],
  "/guides/vpn-protocols-explained": ["en"],
  "/guides/vpn-for-travel": ["en"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

/**
 * Blog posts are admitted only after a claim-level editorial review. The
 * remaining generated corpus stays reachable for remediation, but is kept out
 * of search and out of the Journal shelves until its evidence is checked.
 */
export const INDEXABLE_BLOG_SLUG_LOCALES = {
  "vpn-connection-drops-why-disconnects-how-to-fix-2026": ["en", "nl"],
  "best-vpn-for-iran-2026-bypass-internet-censorship": ["en", "nl"],
  "best-vpn-for-telegram-2026": ["en"],
  "best-vpn-for-chatgpt-2026": ["en"],
  "best-country-for-vpn-server-location-2026": ["en"],
  "can-vpn-hide-from-isp": ["en"],
  "is-brave-vpn-free-2026": ["en"],
  "vpn-leak-testing-tools-compared-2026": ["en"],
  "vpn-account-sharing-safe-guide-2026": ["en"],
  "vpn-simultaneous-connections-limits-workarounds-2026": ["en"],
  "vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy": ["en"],
  "does-vpn-reduce-ping-gaming-2026": ["en"],
  "best-free-vpn-reddit-2026": ["en"],
  "best-vpn-for-torrenting-reddit-2026": ["en"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

export const INDEXABLE_STATIC_ROUTE_LOCALES = {
  "/": INDEXABLE_HOMEPAGE_LOCALES,
  "/about": ["en", "nl"],
  "/affiliate-disclosure": ["en", "nl"],
  "/authors/marvin-smit": ["en", "nl"],
  "/best/best-vpn": ["en", "nl"],
  "/blog": ["en", "nl"],
  "/compare": ["en", "nl"],
  "/contact": ["en", "nl"],
  "/cookie-policy": ["en", "nl"],
  "/countries": ["en", "nl"],
  "/countries/netherlands": ["en", "nl"],
  "/editorial-policy": ["en", "nl"],
  "/guides": ["en", "nl"],
  "/guides/vpn-privacy-guide": ["en", "nl"],
  "/guides/vpn-speed-guide": ["en", "nl"],
  "/guides/what-is-vpn": ["en", "nl"],
  "/methodology": ["en", "nl"],
  "/privacy-policy": ["en", "nl"],
  "/quiz": ["en", "nl"],
  "/reports": ["en", "nl"],
  "/reviews": ["en", "nl"],
  "/speed-test": ["en", "nl"],
  "/terms": ["en", "nl"],
  "/tools": ["en", "nl"],
  "/tools/what-is-my-ip": ["en", "nl"],
} as const satisfies Record<string, readonly IndexabilityLocale[]>;

const ALWAYS_NOINDEX_PATHS = new Set([
  "/are-vpns-legal",
  "/blog/is-vpn-legal",
  "/best-no-log-vpn",
  "/best-vpn-for-digital-nomads",
  "/best-vpn-for-public-wifi",
  "/best-vpn-for-torrenting",
  "/are-vpns-safe",
  "/how-we-test",
  "/is-nordvpn-safe",
  "/reports/vpn-transparency-performance-index-2026",
  "/tools/dns-leak-test",
  "/vpn-index",
  "/vpn-index/2026",
]);

export type NormalizedIndexabilityPath = {
  locale: IndexabilityLocale;
  pathname: string;
};

function isIndexabilityLocale(value: string): value is IndexabilityLocale {
  return INDEXABILITY_LOCALE_SET.has(value);
}

/**
 * Removes a supported locale prefix and trailing slash. Locale-less paths use
 * English, matching next-intl's `as-needed` default-locale routing.
 */
export function normalizeIndexabilityPath(
  pathname: string,
): NormalizedIndexabilityPath {
  const pathnameWithoutQuery = pathname.trim().split(/[?#]/, 1)[0] || "/";
  const absolutePathname = pathnameWithoutQuery.startsWith("/")
    ? pathnameWithoutQuery
    : `/${pathnameWithoutQuery}`;
  const segments = absolutePathname.split("/").filter(Boolean);
  const possibleLocale = segments[0]?.toLowerCase();
  let locale = DEFAULT_LOCALE;

  if (possibleLocale && isIndexabilityLocale(possibleLocale)) {
    locale = possibleLocale;
    segments.shift();
  }

  return {
    locale,
    pathname:
      segments.length > 0 ? `/${segments.join("/").toLowerCase()}` : "/",
  };
}

/**
 * Returns the reviewed locale set for route families managed by this policy.
 * An empty array means that every locale is quarantined; `undefined` means the
 * route is outside this admission contract and keeps its existing behavior.
 */
export function getIndexableLocalesForPath(
  pathname: string,
): readonly IndexabilityLocale[] | undefined {
  const normalized = normalizeIndexabilityPath(pathname);
  const path = normalized.pathname;

  const staticLocales =
    INDEXABLE_STATIC_ROUTE_LOCALES[
      path as keyof typeof INDEXABLE_STATIC_ROUTE_LOCALES
    ];
  if (staticLocales) return staticLocales;
  if (ALWAYS_NOINDEX_PATHS.has(path)) return [];

  if (path === "/reviews" || path === "/compare" || path === "/countries") {
    return INDEXABLE_SECTION_HUB_LOCALES[
      path as keyof typeof INDEXABLE_SECTION_HUB_LOCALES
    ];
  }
  if (path.startsWith("/reviews/")) {
    return (
      INDEXABLE_REVIEW_LOCALES[
        path.slice("/reviews/".length) as keyof typeof INDEXABLE_REVIEW_LOCALES
      ] ?? []
    );
  }
  if (path.startsWith("/compare/")) {
    return (
      INDEXABLE_COMPARISON_LOCALES[
        path.slice(
          "/compare/".length,
        ) as keyof typeof INDEXABLE_COMPARISON_LOCALES
      ] ?? []
    );
  }
  if (path.startsWith("/countries/")) {
    return (
      INDEXABLE_COUNTRY_LOCALES[
        path.slice(
          "/countries/".length,
        ) as keyof typeof INDEXABLE_COUNTRY_LOCALES
      ] ?? []
    );
  }
  if (path === "/best" || path.startsWith("/best/")) {
    return (
      INDEXABLE_BEST_ROUTE_LOCALES[
        path as keyof typeof INDEXABLE_BEST_ROUTE_LOCALES
      ] ?? []
    );
  }
  if (path === "/guides" || path.startsWith("/guides/")) {
    return (
      INDEXABLE_GUIDE_ROUTE_LOCALES[
        path as keyof typeof INDEXABLE_GUIDE_ROUTE_LOCALES
      ] ?? []
    );
  }
  if (path.startsWith("/blog/")) {
    return (
      INDEXABLE_BLOG_SLUG_LOCALES[
        path.slice("/blog/".length) as keyof typeof INDEXABLE_BLOG_SLUG_LOCALES
      ] ?? []
    );
  }

  return undefined;
}

/**
 * Returns true only for route families covered by this migration policy. Other
 * site routes retain their existing metadata behavior.
 */
export function shouldNoindexPath(pathname: string): boolean {
  const normalized = normalizeIndexabilityPath(pathname);
  const indexableLocales = getIndexableLocalesForPath(pathname);
  return indexableLocales === undefined
    ? false
    : !indexableLocales.includes(normalized.locale);
}
