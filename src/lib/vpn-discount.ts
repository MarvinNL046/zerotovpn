// Derive pricing claims from the same provider data used by comparison tables.
// Keeping this calculation centralized prevents disconnected hardcoded claims.
import { vpnProviders } from "./vpn-data";

/** Discount of the lowest long-term price versus the monthly price. */
export function getDiscountPercent(slug: string): number | null {
  const vpn = vpnProviders.find((v) => v.slug === slug);
  if (!vpn) return null;

  const lowest = vpn.priceTwoYear ?? vpn.priceYearly;
  if (!lowest || !vpn.priceMonthly || vpn.priceMonthly <= 0) return null;
  if (lowest >= vpn.priceMonthly) return null;

  return Math.round((1 - lowest / vpn.priceMonthly) * 100);
}

/** Throw during build when a page requires a pricing claim without valid data. */
export function getRequiredDiscountPercent(slug: string): number {
  const pct = getDiscountPercent(slug);
  if (pct === null) {
    throw new Error(
      `No discount can be calculated for "${slug}": monthly or long-term ` +
        "pricing is missing in vpn-data.ts. Add it or remove the claim.",
    );
  }
  return pct;
}

/** Highest calculated discount across the provider catalogue. */
export function getMaxDiscountPercent(): number {
  const all = vpnProviders
    .map((v) => getDiscountPercent(v.slug))
    .filter((n): n is number => n !== null);

  return all.length ? Math.max(...all) : 0;
}

/** Money-back guarantee days, distinct from a free trial. */
export function getMoneyBackDays(slug: string): number | null {
  return vpnProviders.find((v) => v.slug === slug)?.moneyBackDays ?? null;
}
