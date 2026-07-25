// VPN-data komt uit één bron: src/lib/vpn-data.ts.
//
// Tot juli 2026 las dit bestand src/data/vpns.json — een rauwe Postgres-export
// uit de Neon-tijd. Dat gaf twee bronnen die uit elkaar konden lopen, en dat
// deden ze ook: prijscorrecties in de .ts bereikten productie niet, omdat
// vpn-data-layer op Vercel juist de JSON las. Erger nog, de JSON had de oude
// database-UUIDs als id, dus klik-tracking stuurde op productie een UUID en in
// een lokale build een leesbare id.
//
// Nu is er één bron en is dat verschil weg. Wijzigingen gaan via een commit in
// vpn-data.ts.
import { vpnProviders, type VpnProvider } from "../vpn-data";

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

// vpn-data.ts kent twee velden die de oude database niet had
// (priceLastVerified, priceSource) en gebruikt undefined waar de database
// null had. Deze mapper vertaalt dat naar de vorm die de site verwacht.
function toVpnData(vpn: VpnProvider): VpnData {
  return {
    ...vpn,
    priceTwoYear: vpn.priceTwoYear ?? null,
    protocols: vpn.protocols ?? [],
    pros: vpn.pros ?? [],
    cons: vpn.cons ?? [],
  } as VpnData;
}

const ALL_VPNS: VpnData[] = vpnProviders
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
