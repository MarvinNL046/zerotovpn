import { getDb, scrapeJobs } from "@/lib/db";

const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_READER_URL = "https://r.jina.ai";

export interface ScrapedPricing {
  vpnSlug: string;
  priceMonthly?: number;
  priceYearly?: number;
  priceTwoYear?: number;
  moneyBackDays?: number;
  freeTier?: boolean;
  rawContent: string;
}

export interface ScrapedNews {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
  vpnMentions: string[];
}

// Fetch a URL's content as markdown using Jina.ai Reader
export async function scrapeUrl(url: string): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "text/markdown",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const response = await fetch(`${JINA_READER_URL}/${url}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Jina.ai scrape failed for ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

// VPN pricing page URLs
const VPN_PRICING_URLS: Record<string, string> = {
  nordvpn: "https://nordvpn.com/pricing/",
  surfshark: "https://surfshark.com/pricing",
  expressvpn: "https://www.expressvpn.com/order",
  cyberghost: "https://www.cyberghostvpn.com/buy/cyberghost-vpn-4",
  protonvpn: "https://protonvpn.com/pricing",
  "private-internet-access": "https://www.privateinternetaccess.com/buy-vpn-online",
  mullvad: "https://mullvad.net/pricing",
  ipvanish: "https://www.ipvanish.com/pricing/",
};

// Scrape pricing data for a specific VPN
export async function scrapeVpnPricing(
  vpnSlug: string
): Promise<ScrapedPricing> {
  const url = VPN_PRICING_URLS[vpnSlug];
  if (!url) {
    throw new Error(`No pricing URL configured for VPN: ${vpnSlug}`);
  }

  const rawContent = await scrapeUrl(url);

  return {
    vpnSlug,
    rawContent,
    // Actual price extraction would need AI parsing — raw content is stored
    // and the content-generator can parse it later
  };
}

// VPN news sources to scrape
const NEWS_SOURCES = [
  "https://www.techradar.com/vpn/best-vpn",
  "https://www.tomsguide.com/best-picks/best-vpn",
  "https://www.cnet.com/tech/services-and-software/best-vpn-services-2026/",
];

// Scrape VPN news from major tech outlets
export async function scrapeVpnNews(): Promise<ScrapedNews[]> {
  const results: ScrapedNews[] = [];

  for (const sourceUrl of NEWS_SOURCES) {
    try {
      const content = await scrapeUrl(sourceUrl);

      results.push({
        title: `VPN News from ${new URL(sourceUrl).hostname}`,
        summary: content.slice(0, 2000),
        source: new URL(sourceUrl).hostname,
        url: sourceUrl,
        date: new Date().toISOString(),
        vpnMentions: extractVpnMentions(content),
      });
    } catch (error) {
      console.error(`Failed to scrape ${sourceUrl}:`, error);
    }
  }

  return results;
}

// Scrape all known VPN pricing pages
export async function scrapeAllVpnData(): Promise<ScrapedPricing[]> {
  const results: ScrapedPricing[] = [];

  for (const [slug, url] of Object.entries(VPN_PRICING_URLS)) {
    try {
      const pricing = await scrapeVpnPricing(slug);
      results.push(pricing);
    } catch (error) {
      console.error(`Failed to scrape ${slug} (${url}):`, error);
    }
  }

  return results;
}

// Extract VPN brand mentions from scraped content
function extractVpnMentions(content: string): string[] {
  const vpnNames = [
    "NordVPN",
    "Surfshark",
    "ExpressVPN",
    "CyberGhost",
    "ProtonVPN",
    "Private Internet Access",
    "PIA",
    "Mullvad",
    "IPVanish",
    "TunnelBear",
    "Windscribe",
  ];

  return vpnNames.filter((name) =>
    content.toLowerCase().includes(name.toLowerCase())
  );
}

// Save a scrape job record to the database
export async function saveScrapeJob(job: {
  type: string;
  source: string;
  vpnSlug?: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}): Promise<string> {
  const db = getDb();
  const [record] = await db
    .insert(scrapeJobs)
    .values({
      type: job.type,
      source: job.source,
      vpnSlug: job.vpnSlug ?? null,
      status: job.status,
      result: job.result ?? null,
      error: job.error ?? null,
      startedAt: job.startedAt,
      completedAt: job.completedAt ?? null,
    })
    .returning({ id: scrapeJobs.id });

  return record.id;
}
