/**
 * SEO utility functions for dynamic date/month-year generation.
 * Used to keep title tags and meta descriptions fresh with the current month/year.
 */

import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.zerotovpn.com";

/**
 * Generates correct canonical URL and hreflang alternates for any page path.
 * Use this in every page's generateMetadata to ensure correct SEO tags.
 *
 * @param path - The path WITHOUT locale prefix (e.g., "/reviews/nordvpn", "/deals", "")
 * @param locale - Current locale code (e.g., "en", "nl")
 */
export function generateAlternates(path: string, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${BASE_URL}${prefix}${path}`;

  const languages: Record<string, string> = {
    "x-default": `${BASE_URL}${path}`,
  };
  for (const l of routing.locales) {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${BASE_URL}${p}${path}`;
  }

  return {
    canonical: canonicalUrl,
    languages,
  };
}

/** OG locale mapping (ISO 639-1 → Open Graph format) */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US", nl: "nl_NL", de: "de_DE", es: "es_ES",
  fr: "fr_FR", zh: "zh_CN", ja: "ja_JP", ko: "ko_KR", th: "th_TH",
};

/** Short 3-letter English month abbreviations, indexed 0-11. */
const SHORT_MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Returns a short month+year string in English format.
 * Examples: "Feb 2026", "Dec 2025"
 *
 * The locale parameter is accepted but ignored for the short version –
 * this always returns English abbreviations so they can be embedded
 * consistently inside English title tags that are also used as fallbacks.
 */
export function getShortMonthYear(): string {
  const now = new Date();
  const month = SHORT_MONTH_ABBR[now.getMonth()];
  const year = now.getFullYear();
  return `${month} ${year}`;
}

/**
 * Returns the full month name in the given locale's language, followed by
 * the 4-digit year.  Uses the Intl.DateTimeFormat API so no hardcoded
 * translations are needed.
 *
 * Examples:
 *  - "en" → "February 2026"
 *  - "nl" → "februari 2026"
 *  - "de" → "Februar 2026"
 *  - "ja" → "2月 2026"
 *
 * Supported locales: en, nl, de, es, fr, zh, ja, ko, th
 */
export function getLocalizedMonthYear(locale: string): string {
  const now = new Date();

  // Map our internal locale codes to BCP-47 tags understood by Intl.
  // Most are identity mappings; we only need to handle the edge cases.
  const bcp47Map: Record<string, string> = {
    zh: "zh-CN",
  };

  const bcp47Locale = bcp47Map[locale] ?? locale;

  const monthName = new Intl.DateTimeFormat(bcp47Locale, { month: "long" }).format(now);
  const year = now.getFullYear();

  // Some locales (Japanese, Korean, Chinese) traditionally place the year
  // before the month in date expressions, but for our SEO title tags we
  // always want a consistent "month year" reading order.
  return `${monthName} ${year}`;
}
