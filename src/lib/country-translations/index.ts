import { TranslatedCountryContent, CountryPageLabels } from "./types";
import { nlTranslations, nlLabels } from "./nl";
import { deTranslations, deLabels } from "./de";
import { esTranslations, esLabels } from "./es";
import { frTranslations, frLabels } from "./fr";
import { zhTranslations, zhLabels } from "./zh";
import { jaTranslations, jaLabels } from "./ja";
import { koTranslations, koLabels } from "./ko";
import { thTranslations, thLabels } from "./th";

const translationMap: Record<string, Record<string, TranslatedCountryContent>> = {
  nl: nlTranslations,
  de: deTranslations,
  es: esTranslations,
  fr: frTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  th: thTranslations,
};

const labelsMap: Record<string, CountryPageLabels> = {
  nl: nlLabels,
  de: deLabels,
  es: esLabels,
  fr: frLabels,
  zh: zhLabels,
  ja: jaLabels,
  ko: koLabels,
  th: thLabels,
};

// English labels (default)
export const enLabels: CountryPageLabels = {
  badge: "Updated February 2026",
  bestVpnFor: "Best VPN for {country}",
  legalStatusTitle: "VPN Legal Status in {country}",
  internetFreedomScore: "Internet Freedom Score: {score}/100 (Freedom House)",
  whyTitle: "Why You Need a VPN in {country}",
  blockedTitle: "Blocked Services in {country}",
  bestVpnsTitle: "Best VPNs for {country} in 2026",
  bestVpnsSubtitle: "Tested and verified to work reliably in {country}",
  topPick: "#1 Pick for {country}",
  servers: "Servers",
  countries: "Countries",
  devices: "Devices",
  unlimited: "Unlimited",
  save: "Save {n}%",
  visitVpn: "Visit {vpnName}",
  readFullReview: "Read Full Review",
  killSwitch: "Kill Switch",
  noLogs: "No Logs",
  netflix: "Netflix",
  p2p: "P2P",
  featuresTitle: "Key VPN Features for {country}",
  tipsTitle: "Tips for Using a VPN in {country}",
  faqTitle: "Frequently Asked Questions",
  relatedTitle: "Related Guides",
  allCountryGuides: "All Country Guides",
  allCountryGuidesDesc: "Browse VPN guides for all countries",
  bestVpn2026: "Best VPN 2026",
  bestVpn2026Desc: "Top VPN providers ranked and reviewed",
  vpnComparison: "VPN Comparison",
  vpnComparisonDesc: "Compare VPN providers side by side",
  whatIsVpn: "What is a VPN?",
  whatIsVpnDesc: "Learn how VPNs protect your privacy",
  readMore: "Read more",
};

/**
 * Get translated country content for a specific locale and slug.
 * Returns undefined if no translation exists (falls back to English in country-data.ts).
 */
export function getCountryTranslation(
  slug: string,
  locale: string
): TranslatedCountryContent | undefined {
  if (locale === "en") return undefined; // English is in country-data.ts
  return translationMap[locale]?.[slug];
}

/**
 * Get UI labels for the country page template in a specific locale.
 */
export function getCountryPageLabels(locale: string): CountryPageLabels {
  if (locale === "en") return enLabels;
  return labelsMap[locale] || enLabels;
}
