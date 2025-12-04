import { eq, asc, count } from "drizzle-orm";
import { getDb, vpnProviders, type VpnProvider } from "./index";

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

// Convert Drizzle VpnProvider to frontend VpnData
function toVpnData(vpn: VpnProvider): VpnData {
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
    priceMonthly: Number(vpn.priceMonthly),
    priceYearly: Number(vpn.priceYearly),
    priceTwoYear: vpn.priceTwoYear ? Number(vpn.priceTwoYear) : null,
    moneyBackDays: vpn.moneyBackDays,
    freeTier: vpn.freeTier,
    servers: vpn.servers,
    countries: vpn.countries,
    maxDevices: vpn.maxDevices,
    speedScore: vpn.speedScore,
    securityScore: vpn.securityScore,
    streamingScore: vpn.streamingScore,
    protocols: vpn.protocols ?? [],
    encryption: vpn.encryption,
    killSwitch: vpn.killSwitch,
    noLogs: vpn.noLogs,
    netflixSupport: vpn.netflixSupport,
    torrentSupport: vpn.torrentSupport,
    overallRating: Number(vpn.overallRating),
    editorChoice: vpn.editorChoice,
    shortDescription: vpn.shortDescription,
    pros: vpn.pros ?? [],
    cons: vpn.cons ?? [],
    featured: vpn.featured,
    sortOrder: vpn.sortOrder,
  };
}

// Get all VPNs sorted by sortOrder
export async function getAllVpnsFromDb(): Promise<VpnData[]> {
  const db = getDb();
  const vpns = await db
    .select()
    .from(vpnProviders)
    .orderBy(asc(vpnProviders.sortOrder));
  return vpns.map(toVpnData);
}

// Get featured VPNs
export async function getFeaturedVpnsFromDb(): Promise<VpnData[]> {
  const db = getDb();
  const vpns = await db
    .select()
    .from(vpnProviders)
    .where(eq(vpnProviders.featured, true))
    .orderBy(asc(vpnProviders.sortOrder));
  return vpns.map(toVpnData);
}

// Get VPN by slug
export async function getVpnBySlugFromDb(slug: string): Promise<VpnData | null> {
  const db = getDb();
  const vpns = await db
    .select()
    .from(vpnProviders)
    .where(eq(vpnProviders.slug, slug))
    .limit(1);
  return vpns[0] ? toVpnData(vpns[0]) : null;
}

// Get VPN by ID
export async function getVpnByIdFromDb(id: string): Promise<VpnData | null> {
  const db = getDb();
  const vpns = await db
    .select()
    .from(vpnProviders)
    .where(eq(vpnProviders.id, id))
    .limit(1);
  return vpns[0] ? toVpnData(vpns[0]) : null;
}

// Admin functions for CRUD operations

export type VpnCreateInput = Omit<VpnData, "id">;
export type VpnUpdateInput = Partial<VpnCreateInput>;

// Create VPN
export async function createVpn(data: VpnCreateInput): Promise<VpnData> {
  const db = getDb();
  const result = await db
    .insert(vpnProviders)
    .values({
      name: data.name,
      slug: data.slug,
      logo: data.logo,
      screenshot: data.screenshot,
      thumbnailImage: data.thumbnailImage,
      cardImage: data.cardImage,
      ogImage: data.ogImage,
      website: data.website,
      affiliateUrl: data.affiliateUrl,
      priceMonthly: String(data.priceMonthly),
      priceYearly: String(data.priceYearly),
      priceTwoYear: data.priceTwoYear ? String(data.priceTwoYear) : null,
      moneyBackDays: data.moneyBackDays,
      freeTier: data.freeTier,
      servers: data.servers,
      countries: data.countries,
      maxDevices: data.maxDevices,
      speedScore: data.speedScore,
      securityScore: data.securityScore,
      streamingScore: data.streamingScore,
      protocols: data.protocols,
      encryption: data.encryption,
      killSwitch: data.killSwitch,
      noLogs: data.noLogs,
      netflixSupport: data.netflixSupport,
      torrentSupport: data.torrentSupport,
      overallRating: String(data.overallRating),
      editorChoice: data.editorChoice,
      shortDescription: data.shortDescription,
      pros: data.pros,
      cons: data.cons,
      featured: data.featured,
      sortOrder: data.sortOrder,
    })
    .returning();
  return toVpnData(result[0]);
}

// Update VPN
export async function updateVpn(id: string, data: VpnUpdateInput): Promise<VpnData> {
  const db = getDb();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {};

  // Only include fields that are provided
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.logo !== undefined) updateData.logo = data.logo;
  if (data.screenshot !== undefined) updateData.screenshot = data.screenshot;
  if (data.thumbnailImage !== undefined) updateData.thumbnailImage = data.thumbnailImage;
  if (data.cardImage !== undefined) updateData.cardImage = data.cardImage;
  if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
  if (data.website !== undefined) updateData.website = data.website;
  if (data.affiliateUrl !== undefined) updateData.affiliateUrl = data.affiliateUrl;
  if (data.priceMonthly !== undefined) updateData.priceMonthly = String(data.priceMonthly);
  if (data.priceYearly !== undefined) updateData.priceYearly = String(data.priceYearly);
  if (data.priceTwoYear !== undefined) updateData.priceTwoYear = data.priceTwoYear ? String(data.priceTwoYear) : null;
  if (data.moneyBackDays !== undefined) updateData.moneyBackDays = data.moneyBackDays;
  if (data.freeTier !== undefined) updateData.freeTier = data.freeTier;
  if (data.servers !== undefined) updateData.servers = data.servers;
  if (data.countries !== undefined) updateData.countries = data.countries;
  if (data.maxDevices !== undefined) updateData.maxDevices = data.maxDevices;
  if (data.speedScore !== undefined) updateData.speedScore = data.speedScore;
  if (data.securityScore !== undefined) updateData.securityScore = data.securityScore;
  if (data.streamingScore !== undefined) updateData.streamingScore = data.streamingScore;
  if (data.protocols !== undefined) updateData.protocols = data.protocols;
  if (data.encryption !== undefined) updateData.encryption = data.encryption;
  if (data.killSwitch !== undefined) updateData.killSwitch = data.killSwitch;
  if (data.noLogs !== undefined) updateData.noLogs = data.noLogs;
  if (data.netflixSupport !== undefined) updateData.netflixSupport = data.netflixSupport;
  if (data.torrentSupport !== undefined) updateData.torrentSupport = data.torrentSupport;
  if (data.overallRating !== undefined) updateData.overallRating = String(data.overallRating);
  if (data.editorChoice !== undefined) updateData.editorChoice = data.editorChoice;
  if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
  if (data.pros !== undefined) updateData.pros = data.pros;
  if (data.cons !== undefined) updateData.cons = data.cons;
  if (data.featured !== undefined) updateData.featured = data.featured;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  updateData.updatedAt = new Date();

  const result = await db
    .update(vpnProviders)
    .set(updateData)
    .where(eq(vpnProviders.id, id))
    .returning();
  return toVpnData(result[0]);
}

// Delete VPN
export async function deleteVpn(id: string): Promise<void> {
  const db = getDb();
  await db.delete(vpnProviders).where(eq(vpnProviders.id, id));
}

// Get VPN count
export async function getVpnCount(): Promise<number> {
  const db = getDb();
  const result = await db.select({ count: count() }).from(vpnProviders);
  return result[0]?.count ?? 0;
}
