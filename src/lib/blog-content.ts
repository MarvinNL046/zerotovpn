// De artikelinhoud in src/data/posts komt uit een import die de titel nog
// eens als <h1> bovenaan het artikel zette. De blogtemplate rendert de titel
// zelf al als <h1>, dus stond hij op 373 van de 405 postbestanden twee keer
// op de pagina: dubbele tekst voor de lezer en twee H1's voor een crawler.
//
// Dit wordt bij het renderen rechtgezet in plaats van in de databestanden,
// zodat een volgende import hetzelfde probleem niet opnieuw binnenbrengt.

import { buildPublicAffiliateSubId, isNordAffiliateUrl, withNordAffiliateSubId } from "./affiliate-attribution";

/** Een openende h1 helemaal aan het begin van het artikel. */
const LEIDENDE_H1 = /^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i;

/** Elke overige h1, waar hij ook staat. */
const OVERIGE_H1_OPEN = /<h1\b([^>]*)>/gi;
const OVERIGE_H1_DICHT = /<\/h1>/gi;

/**
 * Maakt artikel-HTML geschikt om onder een bestaande <h1> te plaatsen:
 *
 * 1. Een h1 die het artikel opent wordt weggelaten — die herhaalt alleen de
 *    titel die er vlak boven al staat.
 * 2. Elke andere h1 zakt naar h2, zodat de pagina er precies één houdt en de
 *    koppen op volgorde blijven lopen.
 */
export function normaliseerArtikelKoppen(html: string): string {
  if (!html) return html;

  const zonderLeidende = html.replace(LEIDENDE_H1, "");

  return zonderLeidende
    .replace(OVERIGE_H1_OPEN, "<h2$1>")
    .replace(OVERIGE_H1_DICHT, "</h2>");
}

const AFFILIATE_HREF = /(?:go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv|[?&](?:offer_id|aff_id|url_id)=)/i;

export function isAffiliateUrl(url: string): boolean {
  return AFFILIATE_HREF.test(url);
}

/**
 * Normalize legacy article HTML so affiliate links carry the disclosure
 * attributes required by search engines and partner programs. New content
 * should use AffiliateButton/AffiliateTextLink; this protects imported posts
 * that still contain raw anchors.
 */
export function normaliseerAffiliateLinks(html: string, pathname?: string): string {
  if (!html) return html;

  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const hrefMatch = tag.match(/\bhref=(["'])([^"']+)\1/i);
    const href = hrefMatch?.[2] ?? "";
    if (!isAffiliateUrl(href)) return tag;

    let normalizedTag = tag;
    if (pathname && isNordAffiliateUrl(href)) {
      const trackedHref = withNordAffiliateSubId(href, pathname);
      if (trackedHref !== href && hrefMatch) {
        const quote = hrefMatch[1];
        const htmlHref = trackedHref.replace(/&/g, "&amp;");
        normalizedTag = normalizedTag.replace(hrefMatch[0], `href=${quote}${htmlHref}${quote}`);
      }
      if (!/\bdata-affiliate-sub-id=/i.test(normalizedTag)) {
        normalizedTag = normalizedTag.replace(/>$/, ` data-affiliate-sub-id="${buildPublicAffiliateSubId(pathname)}">`);
      }
    }

    const relMatch = normalizedTag.match(/\brel=["']([^"']*)["']/i);
    const tokens = (relMatch?.[1] ?? "")
      .split(/\s+/)
      .filter(Boolean);
    for (const token of ["sponsored", "nofollow"]) {
      if (!tokens.includes(token)) tokens.push(token);
    }
    const rel = `rel="${tokens.join(" ")}"`;

    if (relMatch) {
      return normalizedTag.replace(relMatch[0], rel);
    }
    return normalizedTag.replace(/>$/, ` ${rel}>`);
  });
}

/**
 * Remove affiliate anchors from an article that contains a restricted or
 * otherwise unsuitable adjacent context. The provider name remains readable,
 * but the commercial destination is not rendered on that page.
 */
export function verwijderAffiliateLinks(html: string): string {
  if (!html) return html;

  return html.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (anchor) => {
    const href = anchor.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
    if (!isAffiliateUrl(href)) return anchor;

    return anchor
      .replace(/^<a\b[^>]*>/i, "")
      .replace(/<\/a>$/i, "");
  });
}
