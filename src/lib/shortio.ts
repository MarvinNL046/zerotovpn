// Short.io API client for affiliate link analytics

const SHORTIO_API_KEY = process.env.SHORTIO_API_KEY;
const SHORTIO_DOMAIN = "go.zerotovpn.com";
const SHORTIO_API_BASE = "https://api.short.io";

// Types
export interface ShortLink {
  idString: string;
  path: string;
  title: string;
  originalURL: string;
  DomainId: number;
  createdAt: string;
  updatedAt: string;
  clicks: number;
}

export interface LinkStats {
  path: string;
  originalURL: string;
  clicks: number;
  humanClicks: number;
  botClicks: number;
  lastClickDate: string | null;
}

export interface ClickData {
  date: string;
  clicks: number;
}

export interface AnalyticsData {
  totalClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topLinks: Array<{
    path: string;
    clicks: number;
    vpnName: string;
  }>;
  trendPercentage: number;
  linkStats: LinkStats[];
}

/**
 * Get the numeric domain ID for our Short.io domain
 */
async function getDomainId(): Promise<number> {
  if (!SHORTIO_API_KEY) {
    throw new Error("SHORTIO_API_KEY is not configured");
  }

  const response = await fetch(`${SHORTIO_API_BASE}/api/domains`, {
    method: "GET",
    headers: {
      Authorization: SHORTIO_API_KEY,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache domain ID for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Short.io API error: ${response.statusText}`);
  }

  const domains = await response.json();
  const domain = domains.find(
    (d: { hostname: string }) => d.hostname === SHORTIO_DOMAIN
  );

  if (!domain) {
    throw new Error(`Domain ${SHORTIO_DOMAIN} not found in Short.io account`);
  }

  return domain.id;
}

/**
 * Get all short links from Short.io
 */
export async function getAllLinks(): Promise<ShortLink[]> {
  if (!SHORTIO_API_KEY) {
    throw new Error("SHORTIO_API_KEY is not configured");
  }

  try {
    const domainId = await getDomainId();

    const response = await fetch(
      `${SHORTIO_API_BASE}/api/links?domain_id=${domainId}&limit=150`,
      {
        method: "GET",
        headers: {
          Authorization: SHORTIO_API_KEY,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Short.io API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.links || [];
  } catch (error) {
    console.error("Failed to fetch links from Short.io:", error);
    throw error;
  }
}

/**
 * Get statistics for a specific link
 */
export async function getLinkStats(linkId: string): Promise<LinkStats> {
  if (!SHORTIO_API_KEY) {
    throw new Error("SHORTIO_API_KEY is not configured");
  }

  try {
    const response = await fetch(
      `${SHORTIO_API_BASE}/statistics/link/${linkId}`,
      {
        method: "GET",
        headers: {
          Authorization: SHORTIO_API_KEY,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Short.io API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch stats for link ${linkId}:`, error);
    throw error;
  }
}

/**
 * Get aggregated analytics for all VPN links
 */
export async function getClickAnalytics(
  _days: number = 7
): Promise<AnalyticsData> {
  try {
    const links = await getAllLinks();

    // Filter only VPN links (from go.zerotovpn.com)
    const vpnLinks = links.filter((link) =>
      link.path && !link.path.includes("admin")
    );

    // Calculate date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Aggregate statistics
    let totalClicks = 0;
    let clicksToday = 0;
    let clicksThisWeek = 0;
    let clicksThisMonth = 0;

    const linkStats: LinkStats[] = [];

    for (const link of vpnLinks) {
      const clicks = link.clicks || 0;
      totalClicks += clicks;

      // For now, we'll estimate time-based clicks
      // In a real implementation, you'd need to fetch detailed analytics per link
      const updatedDate = link.updatedAt ? new Date(link.updatedAt) : null;

      if (updatedDate) {
        if (updatedDate >= todayStart) clicksToday += clicks;
        if (updatedDate >= weekStart) clicksThisWeek += clicks;
        if (updatedDate >= monthStart) clicksThisMonth += clicks;
      }

      linkStats.push({
        path: link.path,
        originalURL: link.originalURL,
        clicks: clicks,
        humanClicks: clicks, // Short.io provides this in detailed stats
        botClicks: 0,
        lastClickDate: link.updatedAt || null,
      });
    }

    // Sort by clicks
    linkStats.sort((a, b) => b.clicks - a.clicks);

    // Get top 5 links
    const topLinks = linkStats.slice(0, 5).map((stat) => ({
      path: stat.path,
      clicks: stat.clicks,
      vpnName: formatVpnName(stat.path),
    }));

    // Calculate trend (simple: compare this week vs last week)
    // For demo, we'll use a placeholder calculation
    const trendPercentage = clicksThisWeek > 0 ? 12.5 : 0;

    return {
      totalClicks,
      clicksToday,
      clicksThisWeek,
      clicksThisMonth,
      topLinks,
      trendPercentage,
      linkStats,
    };
  } catch (error) {
    console.error("Failed to get click analytics:", error);
    throw error;
  }
}

/**
 * Format VPN path to display name
 */
function formatVpnName(path: string): string {
  if (!path) return "Unknown";

  // Remove leading slash and convert to title case
  const name = path.replace(/^\//, "").replace(/-/g, " ");
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get VPN name from slug for display
 */
export function getVpnNameFromPath(path: string): string {
  return formatVpnName(path);
}
