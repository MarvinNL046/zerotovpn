import { eq } from "drizzle-orm";
import { getDb, affiliateLinks } from "@/lib/db";
import { getAllLinks, type ShortLink } from "@/lib/shortio";

// Sync all Short.io links to the affiliateLinks table
export async function syncAffiliateLinks(): Promise<{
  synced: number;
  total: number;
}> {
  const links = await getAllLinks();
  const db = getDb();
  let synced = 0;

  for (const link of links) {
    try {
      // Check if this link already exists by shortId
      const [existing] = await db
        .select()
        .from(affiliateLinks)
        .where(eq(affiliateLinks.shortId, link.idString))
        .limit(1);

      const vpnSlug = guessVpnSlug(link.path);
      const now = new Date();

      if (existing) {
        // Update existing record
        await db
          .update(affiliateLinks)
          .set({
            path: link.path,
            originalUrl: link.originalURL,
            vpnSlug,
            clicks: link.clicks || 0,
            lastSyncedAt: now,
          })
          .where(eq(affiliateLinks.id, existing.id));
      } else {
        // Insert new record
        await db.insert(affiliateLinks).values({
          shortId: link.idString,
          path: link.path,
          originalUrl: link.originalURL,
          vpnSlug,
          clicks: link.clicks || 0,
          lastSyncedAt: now,
        });
      }

      synced++;
    } catch (error) {
      console.error(`Failed to sync link ${link.idString}:`, error);
    }
  }

  return { synced, total: links.length };
}

// Try to match a Short.io link path to a known VPN slug
function guessVpnSlug(path: string): string | null {
  if (!path) return null;

  const cleaned = path.replace(/^\//, "").toLowerCase();

  // Direct slug matches
  const knownSlugs = [
    "nordvpn",
    "surfshark",
    "expressvpn",
    "cyberghost",
    "protonvpn",
    "private-internet-access",
    "mullvad",
    "ipvanish",
    "tunnelbear",
    "windscribe",
    "purevpn",
    "atlasvpn",
    "hotspotshield",
    "strongvpn",
    "vyprvpn",
    "privatevpn",
    "torguard",
  ];

  for (const slug of knownSlugs) {
    if (cleaned === slug || cleaned.startsWith(`${slug}/`) || cleaned.startsWith(`${slug}-`)) {
      return slug;
    }
  }

  // Handle "pia" shorthand
  if (cleaned === "pia" || cleaned.startsWith("pia/")) {
    return "private-internet-access";
  }

  return null;
}
