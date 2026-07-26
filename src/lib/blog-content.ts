// De artikelinhoud in src/data/posts komt uit een import die de titel nog
// eens als <h1> bovenaan het artikel zette. De blogtemplate rendert de titel
// zelf al als <h1>, dus stond hij op 373 van de 405 postbestanden twee keer
// op de pagina: dubbele tekst voor de lezer en twee H1's voor een crawler.
//
// Dit wordt bij het renderen rechtgezet in plaats van in de databestanden,
// zodat een volgende import hetzelfde probleem niet opnieuw binnenbrengt.

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
