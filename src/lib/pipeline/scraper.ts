import { getDb, scrapeJobs } from "@/lib/db";

const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_READER_URL = "https://r.jina.ai";
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || "web_unlocker1";

export interface ScrapedPricing {
  vpnSlug: string;
  priceMonthly?: number;
  priceYearly?: number;
  priceTwoYear?: number;
  moneyBackDays?: number;
  freeTier?: boolean;
  rawContent: string;
  scrapedWith: "jina" | "brightdata";
}

export interface ScrapedNews {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
  vpnMentions: string[];
}

// Fetch via Jina.ai Reader
async function scrapeWithJina(url: string): Promise<string> {
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

// Fetch via Bright Data Web Unlocker API
async function scrapeWithBrightData(url: string): Promise<string> {
  if (!BRIGHT_DATA_API_KEY) {
    throw new Error("BRIGHT_DATA_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.brightdata.com/request",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
      },
      body: JSON.stringify({
        zone: BRIGHT_DATA_ZONE,
        url,
        format: "raw",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Bright Data scrape failed for ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

// Main scrape function: tries Jina first, falls back to Bright Data
export async function scrapeUrl(url: string): Promise<{ content: string; provider: "jina" | "brightdata" }> {
  // Try Jina.ai first
  try {
    const content = await scrapeWithJina(url);
    if (content && content.length > 100) {
      return { content, provider: "jina" };
    }
    throw new Error("Jina returned empty or too short content");
  } catch (jinaError) {
    console.warn(
      `Jina.ai failed for ${url}, falling back to Bright Data:`,
      jinaError instanceof Error ? jinaError.message : jinaError
    );
  }

  // Fallback to Bright Data
  if (BRIGHT_DATA_API_KEY) {
    try {
      const content = await scrapeWithBrightData(url);
      return { content, provider: "brightdata" };
    } catch (brightError) {
      console.error(
        `Bright Data also failed for ${url}:`,
        brightError instanceof Error ? brightError.message : brightError
      );
      throw new Error(
        `All scrapers failed for ${url}. Jina and Bright Data both returned errors.`
      );
    }
  }

  throw new Error(
    `Jina.ai failed for ${url} and Bright Data is not configured (set BRIGHT_DATA_API_KEY)`
  );
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

  const { content, provider } = await scrapeUrl(url);

  return {
    vpnSlug,
    rawContent: content,
    scrapedWith: provider,
  };
}

// VPN news sources to scrape
const NEWS_SOURCES = [
  "https://www.techradar.com/vpn/best-vpn",
  "https://www.tomsguide.com/best-picks/best-vpn",
  "https://www.cnet.com/tech/services-and-software/best-vpn-services-2026/",
];

// Scrape VPN news from major tech outlets (parallel)
export async function scrapeVpnNews(): Promise<ScrapedNews[]> {
  const settled = await Promise.allSettled(
    NEWS_SOURCES.map(async (sourceUrl) => {
      const { content } = await scrapeUrl(sourceUrl);
      return {
        title: `VPN News from ${new URL(sourceUrl).hostname}`,
        summary: content.slice(0, 2000),
        source: new URL(sourceUrl).hostname,
        url: sourceUrl,
        date: new Date().toISOString(),
        vpnMentions: extractVpnMentions(content),
      };
    })
  );

  const results: ScrapedNews[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") results.push(r.value);
    else console.error("News scrape failed:", r.reason);
  }
  return results;
}

// Scrape all known VPN pricing pages (parallel in batches of 4)
export async function scrapeAllVpnData(): Promise<ScrapedPricing[]> {
  const entries = Object.entries(VPN_PRICING_URLS);
  const results: ScrapedPricing[] = [];
  const BATCH_SIZE = 4;

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);

    const settled = await Promise.allSettled(
      batch.map(async ([slug]) => scrapeVpnPricing(slug))
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        console.error("Scrape failed:", result.reason);
      }
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
