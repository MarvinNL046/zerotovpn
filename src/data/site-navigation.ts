export type SiteNavigationItemId =
  | "best-vpn"
  | "reviews"
  | "compare"
  | "vpn-picker"
  | "gaming"
  | "privacy"
  | "macos"
  | "android"
  | "countries"
  | "china"
  | "iran"
  | "netherlands";

type NavigationLabels = {
  en: string;
  nl: string;
};

type SiteNavigationItem = {
  id: SiteNavigationItemId;
  href: string;
  labels: NavigationLabels;
  availableLocales: readonly string[];
};

type SiteNavigationGroup = {
  id: "choose" | "needs" | "countries";
  labels: NavigationLabels;
  itemIds: readonly SiteNavigationItemId[];
};

export type ResolvedSiteNavigationItem = {
  id: SiteNavigationItemId;
  href: string;
  label: string;
  targetLocale?: "en";
};

export type ResolvedSiteNavigationGroup = {
  id: SiteNavigationGroup["id"];
  label: string;
  items: ResolvedSiteNavigationItem[];
};

const allLocales = [
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

const items: Record<SiteNavigationItemId, SiteNavigationItem> = {
  "best-vpn": {
    id: "best-vpn",
    href: "/best/best-vpn",
    labels: { en: "Best VPNs 2026", nl: "Beste VPN's 2026" },
    availableLocales: ["en", "nl"],
  },
  reviews: {
    id: "reviews",
    href: "/reviews",
    labels: { en: "VPN reviews", nl: "VPN-reviews" },
    availableLocales: ["en", "nl"],
  },
  compare: {
    id: "compare",
    href: "/compare",
    labels: { en: "Compare VPNs", nl: "VPN's vergelijken" },
    availableLocales: ["en", "nl"],
  },
  "vpn-picker": {
    id: "vpn-picker",
    href: "/quiz",
    labels: { en: "VPN picker", nl: "VPN-keuzehulp" },
    availableLocales: ["en", "nl"],
  },
  gaming: {
    id: "gaming",
    href: "/best/vpn-gaming",
    labels: { en: "VPN for gaming", nl: "VPN voor gaming" },
    availableLocales: ["en"],
  },
  privacy: {
    id: "privacy",
    href: "/best/vpn-privacy",
    labels: { en: "VPN for privacy", nl: "VPN voor privacy" },
    availableLocales: ["en"],
  },
  macos: {
    id: "macos",
    href: "/best/vpn-macos",
    labels: { en: "VPN for macOS", nl: "VPN voor macOS" },
    availableLocales: allLocales,
  },
  android: {
    id: "android",
    href: "/best/vpn-android",
    labels: { en: "VPN for Android", nl: "VPN voor Android" },
    availableLocales: ["en"],
  },
  countries: {
    id: "countries",
    href: "/countries",
    labels: { en: "All country guides", nl: "Alle landengidsen" },
    availableLocales: ["en", "nl"],
  },
  china: {
    id: "china",
    href: "/countries/china",
    labels: { en: "VPN in China", nl: "VPN in China" },
    availableLocales: ["en"],
  },
  iran: {
    id: "iran",
    href: "/countries/iran",
    labels: { en: "VPN in Iran", nl: "VPN in Iran" },
    availableLocales: ["en"],
  },
  netherlands: {
    id: "netherlands",
    href: "/countries/netherlands",
    labels: { en: "VPN in the Netherlands", nl: "VPN in Nederland" },
    availableLocales: ["en", "nl"],
  },
};

const bestVpnGroups: readonly SiteNavigationGroup[] = [
  {
    id: "choose",
    labels: { en: "Compare", nl: "Vergelijken" },
    itemIds: ["best-vpn", "reviews", "compare", "vpn-picker"],
  },
  {
    id: "needs",
    labels: { en: "By need and device", nl: "Per doel en apparaat" },
    itemIds: ["gaming", "privacy", "macos", "android"],
  },
  {
    id: "countries",
    labels: { en: "By country", nl: "Per land" },
    itemIds: ["countries", "china", "iran", "netherlands"],
  },
] as const;

function resolveItem(
  item: SiteNavigationItem,
  locale: string,
): ResolvedSiteNavigationItem {
  const isNl = locale === "nl";
  const fallsBackToEnglish = !item.availableLocales.includes(locale);
  const suffix = fallsBackToEnglish
    ? isNl
      ? " (Engels)"
      : locale === "en"
        ? ""
        : " (English)"
    : "";

  return {
    id: item.id,
    href: item.href,
    label: `${item.labels[isNl ? "nl" : "en"]}${suffix}`,
    targetLocale: fallsBackToEnglish ? "en" : undefined,
  };
}

export function getBestVpnNavigationGroups(
  locale: string,
): ResolvedSiteNavigationGroup[] {
  const labelLocale = locale === "nl" ? "nl" : "en";

  return bestVpnGroups.map((group) => ({
    id: group.id,
    label: group.labels[labelLocale],
    items: group.itemIds.map((itemId) => resolveItem(items[itemId], locale)),
  }));
}

export function getFooterExploreNavigation(
  locale: string,
): ResolvedSiteNavigationItem[] {
  return [
    "reviews",
    "best-vpn",
    "gaming",
    "macos",
    "compare",
    "countries",
    "vpn-picker",
  ].map((itemId) => resolveItem(items[itemId as SiteNavigationItemId], locale));
}
