// Kortingspercentages afleiden uit de prijzen die we zelf bijhouden.
//
// Waarom niet hardcoderen: tot juli 2026 stond er "82% OFF" voor Surfshark,
// "68% Off" voor NordVPN en "49% OFF" voor ExpressVPN. Geen van drieën klopte
// met de prijstabel op diezelfde pagina — de echte verhoudingen waren 84%, 76%
// en 73%. Een bezoeker die de knop met de tabel vergelijkt, ziet dat.
//
// Nu komt het percentage uit vpn-data.ts, dezelfde bron als de getoonde
// prijzen. Corrigeer je daar een prijs, dan verschuift de claim mee.
import { vpnProviders } from "./vpn-data";

/**
 * Korting van het voordeligste langlopende abonnement ten opzichte van het
 * maandtarief — precies de verhouding die aanbieders zelf als "% off"
 * adverteren. Geeft null als een van beide prijzen ontbreekt, zodat de
 * aanroeper de claim kan weglaten in plaats van een verzonnen getal te tonen.
 */
export function getDiscountPercent(slug: string): number | null {
  const vpn = vpnProviders.find((v) => v.slug === slug);
  if (!vpn) return null;

  const laagste = vpn.priceTwoYear ?? vpn.priceYearly;
  if (!laagste || !vpn.priceMonthly || vpn.priceMonthly <= 0) return null;
  if (laagste >= vpn.priceMonthly) return null;

  return Math.round((1 - laagste / vpn.priceMonthly) * 100);
}

/**
 * Zelfde berekening, maar voor plekken waar de claim in de tekst vastzit en
 * een ontbrekend getal een kapot label zou opleveren ("Get Surfshark – % OFF").
 *
 * Gooit bewust een fout in plaats van iets te verzinnen. De site wordt statisch
 * gebouwd, dus dit valt om tijdens de build en kan nooit bij een bezoeker
 * terechtkomen.
 */
export function getRequiredDiscountPercent(slug: string): number {
  const pct = getDiscountPercent(slug);
  if (pct === null) {
    throw new Error(
      `Geen korting te berekenen voor "${slug}": maandprijs of langlopende ` +
        `prijs ontbreekt in vpn-data.ts. Vul die aan, of haal de ` +
        `kortingsclaim weg op de plek die deze functie aanroept.`,
    );
  }
  return pct;
}

/**
 * Hoogste korting in het hele aanbod, voor "bespaar tot X%"-teksten.
 */
export function getMaxDiscountPercent(): number {
  const alle = vpnProviders
    .map((v) => getDiscountPercent(v.slug))
    .filter((n): n is number => n !== null);

  return alle.length ? Math.max(...alle) : 0;
}

/**
 * Aantal dagen niet-goed-geld-terug. Let op het verschil met een gratis
 * proefperiode: dit is een terugbetaling achteraf, geen gratis gebruik vooraf.
 * Zie src/lib/vpn-trials.ts voor de echte proefperiodes.
 */
export function getMoneyBackDays(slug: string): number | null {
  return vpnProviders.find((v) => v.slug === slug)?.moneyBackDays ?? null;
}
