// VPN-data komt sinds de Neon-uitfasering uit een statische JSON in het repo
// (src/data/vpns.json, 38 providers). Wijzigingen gaan via een commit — de
// oude admin-UI en de live Postgres-reads zijn verdwenen, en daarmee ook de
// unstable_cache-laag die de Neon-compute wakker moest houden.
import vpnsRaw from "@/data/vpns.json";

// Type for VPN data that matches the frontend interface
export interface VpnData {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  screenshot: string | null;
  thumbnailImage: string | null;
  cardImage: string | null;
  ogImage: string | null;
  website: string;
  affiliateUrl: string;
  priceMonthly: number;
  priceYearly: number;
  priceTwoYear: number | null;
  moneyBackDays: number;
  freeTier: boolean;
  servers: number;
  countries: number;
  maxDevices: number;
  speedScore: number;
  securityScore: number;
  streamingScore: number;
  protocols: string[];
  encryption: string;
  killSwitch: boolean;
  noLogs: boolean;
  netflixSupport: boolean;
  torrentSupport: boolean;
  overallRating: number;
  editorChoice: boolean;
  shortDescription: string | null;
  pros: string[];
  cons: string[];
  featured: boolean;
  sortOrder: number;
}

// De JSON bevat de rauwe Postgres-export: numeric-kolommen zijn strings.
type RawVpn = Omit<
  VpnData,
  | "priceMonthly"
  | "priceYearly"
  | "priceTwoYear"
  | "overallRating"
  | "protocols"
  | "pros"
  | "cons"
> & {
  priceMonthly: string | number;
  priceYearly: string | number;
  priceTwoYear: string | number | null;
  overallRating: string | number;
  protocols: string[] | null;
  pros: string[] | null;
  cons: string[] | null;
};

function toVpnData(vpn: RawVpn): VpnData {
  return {
    ...vpn,
    priceMonthly: Number(vpn.priceMonthly),
    priceYearly: Number(vpn.priceYearly),
    priceTwoYear: vpn.priceTwoYear ? Number(vpn.priceTwoYear) : null,
    overallRating: Number(vpn.overallRating),
    protocols: vpn.protocols ?? [],
    pros: vpn.pros ?? [],
    cons: vpn.cons ?? [],
  };
}

const ALL_VPNS: VpnData[] = (vpnsRaw as unknown as RawVpn[])
  .map(toVpnData)
  .sort((a, b) => a.sortOrder - b.sortOrder);

// Get all VPNs sorted by sortOrder
export async function getAllVpnsFromDb(): Promise<VpnData[]> {
  return ALL_VPNS;
}

// Featured VPNs (homepage e.d.)
export async function getFeaturedVpnsFromDb(): Promise<VpnData[]> {
  return ALL_VPNS.filter((v) => v.featured);
}

// Eén VPN op slug (reviews/[slug], compare/[comparison], countries/[country])
export async function getVpnBySlugFromDb(slug: string): Promise<VpnData | null> {
  return ALL_VPNS.find((v) => v.slug === slug) ?? null;
}

// Totaal aantal providers
export async function getVpnCount(): Promise<number> {
  return ALL_VPNS.length;
}
