// Hybrid data layer that uses database when available, falls back to static data
import { vpnProviders, type VpnProvider as StaticVpnProvider } from "./vpn-data";
import {
  getAllVpnsFromDb,
  getFeaturedVpnsFromDb,
  getVpnBySlugFromDb,
  type VpnData,
} from "./db/vpn-service";

// Check if we're in a build phase - use static data during build for faster builds
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NODE_ENV === "production" && typeof window === "undefined" && !process.env.VERCEL;

// Re-export the VpnProvider type for consistency
export type VpnProvider = StaticVpnProvider | VpnData;

// Helper to convert static VPN data to match VpnData interface
function staticToVpnData(vpn: StaticVpnProvider): VpnData {
  return {
    id: vpn.id,
    name: vpn.name,
    slug: vpn.slug,
    logo: vpn.logo,
    screenshot: vpn.screenshot,
    thumbnailImage: vpn.thumbnailImage,
    cardImage: vpn.cardImage,
    ogImage: vpn.ogImage,
    website: vpn.website,
    affiliateUrl: vpn.affiliateUrl,
    priceMonthly: vpn.priceMonthly,
    priceYearly: vpn.priceYearly,
    priceTwoYear: vpn.priceTwoYear ?? null,
    moneyBackDays: vpn.moneyBackDays,
    freeTier: vpn.freeTier,
    servers: vpn.servers,
    countries: vpn.countries,
    maxDevices: vpn.maxDevices,
    speedScore: vpn.speedScore,
    securityScore: vpn.securityScore,
    streamingScore: vpn.streamingScore,
    protocols: vpn.protocols,
    encryption: vpn.encryption,
    killSwitch: vpn.killSwitch,
    noLogs: vpn.noLogs,
    netflixSupport: vpn.netflixSupport,
    torrentSupport: vpn.torrentSupport,
    overallRating: vpn.overallRating,
    editorChoice: vpn.editorChoice,
    shortDescription: vpn.shortDescription,
    pros: vpn.pros,
    cons: vpn.cons,
    featured: vpn.featured,
    sortOrder: vpn.sortOrder,
  };
}

// Get all VPNs - tries database first, falls back to static data
export async function getAllVpns(): Promise<VpnData[]> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    return vpnProviders.map(staticToVpnData).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  try {
    const dbVpns = await getAllVpnsFromDb();
    if (dbVpns.length > 0) {
      return dbVpns;
    }
  } catch (error) {
    console.warn("Database unavailable, using static VPN data:", error);
  }

  // Fallback to static data
  return vpnProviders.map(staticToVpnData).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get featured VPNs - tries database first, falls back to static data
export async function getFeaturedVpns(): Promise<VpnData[]> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    return vpnProviders
      .filter((vpn) => vpn.featured)
      .map(staticToVpnData)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  try {
    const dbVpns = await getFeaturedVpnsFromDb();
    if (dbVpns.length > 0) {
      return dbVpns;
    }
  } catch (error) {
    console.warn("Database unavailable, using static VPN data:", error);
  }

  // Fallback to static data
  return vpnProviders
    .filter((vpn) => vpn.featured)
    .map(staticToVpnData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get VPN by slug - tries database first, falls back to static data
export async function getVpnBySlug(slug: string): Promise<VpnData | null> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    const staticVpn = vpnProviders.find((vpn) => vpn.slug === slug);
    return staticVpn ? staticToVpnData(staticVpn) : null;
  }

  try {
    const dbVpn = await getVpnBySlugFromDb(slug);
    if (dbVpn) {
      return dbVpn;
    }
  } catch (error) {
    console.warn("Database unavailable, using static VPN data:", error);
  }

  // Fallback to static data
  const staticVpn = vpnProviders.find((vpn) => vpn.slug === slug);
  return staticVpn ? staticToVpnData(staticVpn) : null;
}
