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

export interface ScrapedCountryData {
  countrySlug: string;
  countryName: string;
  freedomReport: string | null;
  recentNews: Array<{ title: string; summary: string; url: string }>;
  rawContent: string;
  scrapedAt: string;
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

// VPN pricing page URLs — all 38 providers
const VPN_PRICING_URLS: Record<string, string> = {
  nordvpn: "https://nordvpn.com/pricing/",
  surfshark: "https://surfshark.com/pricing",
  expressvpn: "https://www.expressvpn.com/order",
  cyberghost: "https://www.cyberghostvpn.com/buy/cyberghost-vpn-4",
  protonvpn: "https://protonvpn.com/pricing",
  "private-internet-access": "https://www.privateinternetaccess.com/buy-vpn-online",
  mullvad: "https://mullvad.net/pricing",
  ipvanish: "https://www.ipvanish.com/pricing/",
  vyprvpn: "https://www.vyprvpn.com/buy-vpn",
  tunnelbear: "https://www.tunnelbear.com/pricing",
  windscribe: "https://windscribe.com/upgrade",
  "hotspot-shield": "https://www.hotspotshield.com/pricing/",
  strongvpn: "https://strongvpn.com/pricing/",
  purevpn: "https://www.purevpn.com/order",
  "atlas-vpn": "https://atlasvpn.com/pricing",
  privatevpn: "https://privatevpn.com/prices",
  torguard: "https://torguard.net/pricing.php",
  airvpn: "https://airvpn.org/plans/",
  ivpn: "https://www.ivpn.net/pricing/",
  "mozilla-vpn": "https://vpn.mozilla.org/products/vpn/",
  "hide-me": "https://hide.me/en/pricing",
  zenmate: "https://zenmate.com/pricing",
  privadovpn: "https://privadovpn.com/pricing/",
  hma: "https://www.hidemyass.com/pricing",
  astrill: "https://www.astrill.com/pricing",
  "perfect-privacy": "https://www.perfect-privacy.com/en/order",
  "goose-vpn": "https://goosevpn.com/pricing",
  "trust-zone": "https://trust.zone/pricing",
  fastestvpn: "https://fastestvpn.com/buy-vpn",
  ovpn: "https://www.ovpn.com/en/pricing",
  cactusvpn: "https://www.cactusvpn.com/pricing/",
  betternet: "https://www.betternet.co/pricing",
  speedify: "https://speedify.com/pricing/",
  "vpn-unlimited": "https://www.vpnunlimitedapp.com/pricing",
  nordlayer: "https://nordlayer.com/pricing/",
  "perimeter-81": "https://www.perimeter81.com/pricing",
  "urban-vpn": "https://www.urban-vpn.com/pricing",
  "x-vpn": "https://xvpn.io/pricing",
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
    "NordVPN", "Surfshark", "ExpressVPN", "CyberGhost", "ProtonVPN",
    "Private Internet Access", "PIA", "Mullvad", "IPVanish",
    "VyprVPN", "TunnelBear", "Windscribe", "Hotspot Shield",
    "StrongVPN", "PureVPN", "Atlas VPN", "PrivateVPN", "TorGuard",
    "AirVPN", "IVPN", "Mozilla VPN", "Hide.me", "ZenMate",
    "PrivadoVPN", "HMA", "Hide My Ass", "Astrill", "Perfect Privacy",
    "Goose VPN", "Trust.Zone", "FastestVPN", "OVPN", "CactusVPN",
    "Betternet", "Speedify", "VPN Unlimited", "NordLayer", "Perimeter 81",
    "Urban VPN", "X-VPN",
  ];

  return vpnNames.filter((name) =>
    content.toLowerCase().includes(name.toLowerCase())
  );
}

// Country slug to name mapping for scraping
const COUNTRY_NAMES: Record<string, string> = {
  iran: "Iran",
  china: "China",
  russia: "Russia",
  uae: "United Arab Emirates",
  turkey: "Turkey",
  "saudi-arabia": "Saudi Arabia",
  egypt: "Egypt",
  vietnam: "Vietnam",
  pakistan: "Pakistan",
  indonesia: "Indonesia",
  india: "India",
  thailand: "Thailand",
  myanmar: "Myanmar",
  cuba: "Cuba",
  venezuela: "Venezuela",
  belarus: "Belarus",
  turkmenistan: "Turkmenistan",
  "north-korea": "North Korea",
  bangladesh: "Bangladesh",
  ethiopia: "Ethiopia",
};

// Freedom House URL slug mapping (some differ from our slugs)
const FREEDOM_HOUSE_SLUGS: Record<string, string> = {
  uae: "united-arab-emirates",
  "saudi-arabia": "saudi-arabia",
  "north-korea": "north-korea",
};

// Scrape country-specific VPN/censorship data from multiple sources
export async function scrapeCountryVpnData(
  countrySlug: string
): Promise<ScrapedCountryData> {
  const countryName = COUNTRY_NAMES[countrySlug];
  if (!countryName) {
    throw new Error(`Unknown country slug: ${countrySlug}`);
  }

  const freedomHouseSlug = FREEDOM_HOUSE_SLUGS[countrySlug] || countrySlug;
  const freedomUrl = `https://freedomhouse.org/country/${freedomHouseSlug}/freedom-net`;
  const year = new Date().getFullYear();

  // Scrape 4 sources in parallel for comprehensive data
  const results = await Promise.allSettled([
    // 1. Freedom House country report
    scrapeUrl(freedomUrl),
    // 2. VPN/censorship news search
    scrapeCountryNews(`https://s.jina.ai/${encodeURIComponent(`${countryName} VPN censorship internet freedom ${year}`)}`),
    // 3. Best VPN reviews for this country
    scrapeCountryNews(`https://s.jina.ai/${encodeURIComponent(`best VPN for ${countryName} ${year} review`)}`)
      .then((items) => items.map((item) => ({ ...item, title: `[Review] ${item.title}` }))),
    // 4. VPN legality / internet laws
    scrapeCountryNews(`https://s.jina.ai/${encodeURIComponent(`VPN legal ${countryName} ${year} internet censorship laws`)}`)
      .then((items) => items.map((item) => ({ ...item, title: `[Legal] ${item.title}` }))),
  ]);

  const freedomReport =
    results[0].status === "fulfilled"
      ? results[0].value.content.slice(0, 3000)
      : null;

  if (results[0].status === "rejected") {
    console.warn(
      `[scraper] Freedom House scrape failed for ${countrySlug}:`,
      results[0].reason
    );
  }

  const recentNews: ScrapedCountryData["recentNews"] = [];
  for (let i = 1; i < results.length; i++) {
    if (results[i].status === "fulfilled") {
      const newsItems = (results[i] as PromiseFulfilledResult<ScrapedCountryData["recentNews"]>).value;
      recentNews.push(...newsItems);
    } else {
      console.warn(
        `[scraper] Source ${i} scrape failed for ${countrySlug}:`,
        (results[i] as PromiseRejectedResult).reason
      );
    }
  }

  const rawContent = [
    freedomReport ? `FREEDOM HOUSE REPORT:\n${freedomReport}` : "",
    recentNews.length > 0
      ? `RECENT NEWS & SOURCES (${recentNews.length} items):\n${recentNews.map((n) => `- ${n.title}: ${n.summary} (${n.url})`).join("\n")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.log(`[scraper] ${countryName}: ${successCount}/${results.length} sources scraped, ${recentNews.length} news items`);

  if (!freedomReport && recentNews.length === 0) {
    throw new Error(
      `No data could be scraped for ${countryName}. All ${results.length} sources failed.`
    );
  }

  return {
    countrySlug,
    countryName,
    freedomReport,
    recentNews,
    rawContent,
    scrapedAt: new Date().toISOString(),
  };
}

// Scrape country-specific VPN news via Jina.ai search
async function scrapeCountryNews(
  searchUrl: string
): Promise<Array<{ title: string; summary: string; url: string }>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const response = await fetch(searchUrl, { method: "GET", headers });

  if (!response.ok) {
    throw new Error(`Jina search failed: ${response.status}`);
  }

  const data = await response.json();
  const items: Array<{ title: string; summary: string; url: string }> = [];

  // Jina search API returns { data: [{ title, description, url, content }] }
  const results = data.data || data.results || [];
  for (const item of results.slice(0, 5)) {
    items.push({
      title: item.title || "Untitled",
      summary: (item.description || item.content || "").slice(0, 300),
      url: item.url || "",
    });
  }

  return items;
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
