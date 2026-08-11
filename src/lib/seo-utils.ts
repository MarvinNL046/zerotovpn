/**
 * SEO utility functions for dynamic date/month-year generation.
 * Used to keep title tags and meta descriptions fresh with the current month/year.
 */

import { routing } from "@/i18n/routing";

// Altijd www: de apex stuurt met een 307 door, dus een apex-URL in een
// canonical, breadcrumb of JSON-LD laat elke crawler op een omleiding landen.
export const BASE_URL = "https://www.zerotovpn.com";

/** Shared social preview used whenever a child page supplies its own metadata. */
export const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "ZeroToVPN — independent VPN reviews and comparisons",
} as const;

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

/**
 * Haalt een achterliggende sitenaam van een titel af.
 *
 * De layout plakt via `title.template` zelf al " | ZeroToVPN" achter elke
 * paginatitel. Titels die de merknaam ook zelf meedroegen kwamen daardoor
 * dubbel in de SERP: "VPN Testing Methodology | ZeroToVPN | ZeroToVPN".
 * Dat kostte 12 zichtbare tekens in een titelbalk waar er maar ~60 tellen.
 *
 * Gebruik dit rond elke titel die uit een vertaalbestand of een handmatige
 * lijst komt; de template zorgt daarna voor één consistente merknaam.
 */
export function stripBrand(title: string): string {
  return title.replace(/\s*[|\-–—]\s*ZeroToVPN\s*$/u, "").trim();
}

/** Wat Google in de zoekresultaten kwijt kan voor hij afkapt. */
const TITEL_MAX = 60;
const MERK = " | ZeroToVPN";

/**
 * Zet de sitenaam achter de titel, maar alleen als het geheel binnen de
 * zoekresultaten past.
 *
 * De layout deed dit onvoorwaardelijk via `title.template`. Daardoor was 328
 * van de 465 titels langer dan 60 tekens — en bij 288 daarvan kwam dat puur
 * door die twaalf tekens. De merknaam achteraan is nu net het stuk dat Google
 * als eerste wegkapt, dus je betaalt de ruimte zonder er iets voor te krijgen.
 *
 * Gebruik dit met `title: { absolute: titelMetMerk(...) }`, zodat de template
 * van de layout er niet nog eens overheen gaat.
 */
export function titelMetMerk(titel: string): string {
  const schoon = stripBrand(titel);
  return schoon.length + MERK.length <= TITEL_MAX ? schoon + MERK : schoon;
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
 *  - "en" → "July 2026"
 *  - "nl" → "juli 2026"
 *  - "de" → "Juli 2026"
 *  - "es" → "julio de 2026"
 *  - "ja" → "2026年7月"
 *  - "ko" → "2026년 7월"
 *  - "th" → "กรกฎาคม 2026"
 *
 * Supported locales: en, nl, de, es, fr, zh, ja, ko, th
 */
export function getLocalizedMonthYear(locale: string): string {
  const now = new Date();

  // Map our internal locale codes to BCP-47 tags understood by Intl.
  //
  // Thai needs -u-ca-gregory expliciet: het Thaise gebied gebruikt standaard
  // de boeddhistische jaartelling, en dan wordt 2026 gerenderd als 2569.
  const bcp47Map: Record<string, string> = {
    zh: "zh-CN",
    th: "th-TH-u-ca-gregory",
  };

  const bcp47Locale = bcp47Map[locale] ?? locale;

  // Jaar en maand in één opmaakopdracht, niet zelf aan elkaar plakken. Intl
  // kiest dan per taal de juiste volgorde en voegwoorden: "julio de 2026" in
  // het Spaans, "2026年7月" in het Chinees en Japans.
  return new Intl.DateTimeFormat(bcp47Locale, {
    year: "numeric",
    month: "long",
  }).format(now);
}
