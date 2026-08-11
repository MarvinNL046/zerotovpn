import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SITE = "https://www.zerotovpn.com";
const SITEMAP = `${SITE}/sitemap.xml`;
const concurrency = Number(process.env.AFFILIATE_AUDIT_CONCURRENCY || 24);
const limit = Number(process.env.AFFILIATE_AUDIT_LIMIT || 0);
const timeoutMs = 15_000;
const today = new Date().toISOString().slice(0, 10);

const affiliateUrlPatterns = [
  /go\.zerotovpn\.com/i,
  /go\.nordvpn\.net/i,
  /nordvpn\.tpo\.lv/i,
  /[?&](?:offer_id|aff_id|url_id)=/i,
];
const promoPatterns = [
  /coupon(?:s)?/gi,
  /discount\s+code/gi,
  /promo(?:tion)?\s+code/gi,
  /cash\s*back/gi,
  /\b\d{1,3}%\s*(?:off|discount)/gi,
  /free\s+(?:months?|trial)/gi,
  /incentive(?:s)?/gi,
];

function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim()).filter(Boolean);
}

function stripHtml(value) {
  return value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function pageMeta(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1])).filter(Boolean);
  return { title: stripHtml(title), h1 };
}

function findAffiliateLinks(html) {
  const links = [];
  for (const match of html.matchAll(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>/gi)) {
    const tag = `${match[1]} ${match[3]}`;
    const href = match[2].replace(/&amp;/g, "&");
    if (!affiliateUrlPatterns.some((pattern) => pattern.test(href))) continue;
    const rel = (tag.match(/\brel=["']([^"']*)["']/i)?.[1] ?? "").toLowerCase().split(/\s+/).filter(Boolean);
    const textStart = match.index + match[0].length;
    const textEnd = html.indexOf("</a>", textStart);
    const anchorText = stripHtml(html.slice(textStart, textEnd >= 0 ? textEnd : textStart + 300)).slice(0, 240);
    links.push({ index: match.index, href, anchorText, rel, hasSponsored: rel.includes("sponsored"), hasNofollow: rel.includes("nofollow") });
  }
  return links;
}

function matches(patterns, text) {
  const values = [];
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) values.push(pattern.source);
  }
  return values;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { "user-agent": "ZeroToVPN editorial audit/1.0" } });
    const html = await response.text();
    return { status: response.status, durationMs: Date.now() - started, html, error: null };
  } catch (error) {
    return { status: null, durationMs: Date.now() - started, html: "", error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

async function mapConcurrent(values, worker, size) {
  const output = new Array(values.length);
  let next = 0;
  async function run() {
    while (true) {
      const index = next++;
      if (index >= values.length) return;
      output[index] = await worker(values[index], index);
      if ((index + 1) % 100 === 0 || index + 1 === values.length) console.log(`[affiliate-audit] ${index + 1}/${values.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, values.length) }, () => run()));
  return output;
}

const sitemapResponse = await fetchWithTimeout(SITEMAP);
if (sitemapResponse.status !== 200) throw new Error(`Sitemap request failed: ${sitemapResponse.status ?? sitemapResponse.error}`);
const discoveredUrls = urlsFromSitemap(sitemapResponse.html);
const urls = (limit > 0 ? discoveredUrls.slice(0, limit) : discoveredUrls);
console.log(`[affiliate-audit] checking ${urls.length} sitemap URLs (concurrency ${concurrency})`);

const records = await mapConcurrent(urls, async (url) => {
  const response = await fetchWithTimeout(url);
  const { title, h1 } = pageMeta(response.html);
  const affiliateLinks = findAffiliateLinks(response.html);
  const bodyText = stripHtml(response.html);
  const disclosure = /(?:affiliate\s+(?:links?|disclosure)|commission)/i.test(bodyText)
    || /href=["'][^"']*\/affiliate-disclosure(?:["'?#])/i.test(response.html);
  const promoContext = affiliateLinks
    .map((link) => stripHtml(response.html.slice(Math.max(0, link.index - 500), link.index + 1500)))
    .join(" ");
  const promoTerms = [...new Set(matches(promoPatterns, promoContext))];
  // Avoid serialized translation chunks: only flag actual rendered popup/modal markers.
  const interruptiveTerms = [];
  if (/data-slot=["'][^"']*(?:exit-intent|newsletter-popup|popunder)[^"']*["']/i.test(response.html)) interruptiveTerms.push("popup-marker");
  if (/<dialog\b[^>]*\bopen(?:=|\s|>)/i.test(response.html)) interruptiveTerms.push("open-dialog");
  const missingRel = affiliateLinks.filter((link) => !link.hasSponsored || !link.hasNofollow);
  return {
    url,
    status: response.status,
    durationMs: response.durationMs,
    title,
    h1Count: h1.length,
    affiliateCount: affiliateLinks.length,
    affiliateLinks,
    disclosure,
    missingRelCount: missingRel.length,
    missingRel,
    promoTerms,
    interruptiveTerms,
    ok: response.status === 200 && missingRel.length === 0 && (!affiliateLinks.length || disclosure),
    error: response.error,
  };
}, concurrency);

const affiliatePages = records.filter((record) => record.affiliateCount > 0);
const missingRelPages = records.filter((record) => record.missingRelCount > 0);
const noDisclosurePages = records.filter((record) => record.affiliateCount > 0 && !record.disclosure);
const promoFlagPages = records.filter((record) => record.affiliateCount > 0 && record.promoTerms.length > 0);
const interruptiveFlagPages = records.filter((record) => record.interruptiveTerms.length > 0);
const summary = {
  generatedAt: new Date().toISOString(),
  sitemapUrl: SITEMAP,
  sitemapUrlCount: discoveredUrls.length,
  checkedUrlCount: records.length,
  affiliatePageCount: affiliatePages.length,
  affiliateLinkCount: affiliatePages.reduce((sum, record) => sum + record.affiliateCount, 0),
  missingRelPageCount: missingRelPages.length,
  noDisclosurePageCount: noDisclosurePages.length,
  promoFlagPageCount: promoFlagPages.length,
  interruptiveFlagPageCount: interruptiveFlagPages.length,
  failedFetchCount: records.filter((record) => record.status !== 200).length,
  slowOver2sCount: records.filter((record) => record.durationMs > 2000).length,
};
const report = { schemaVersion: 2, summary, records };
const outputDir = resolve(ROOT, "docs", "metrics");
mkdirSync(outputDir, { recursive: true });
const jsonPath = resolve(outputDir, `affiliate-context-audit-${today}.json`);
const mdPath = resolve(outputDir, `affiliate-context-audit-${today}.md`);
writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
const rows = (items) => items.length ? items.slice(0, 50).map((record) => `| ${record.status ?? "-"} | ${record.url} | ${record.affiliateCount} | ${record.missingRelCount} | ${record.disclosure ? "yes" : "no"} | ${[...record.promoTerms, ...record.interruptiveTerms].join(", ") || "-"} |`) : ["| - | None | - | - | - | - |"];
const markdown = [
  "# Live affiliate context audit", "", `Generated: ${summary.generatedAt}`, "",
  `- Sitemap URLs discovered: **${summary.sitemapUrlCount}**`,
  `- URLs checked: **${summary.checkedUrlCount}**`,
  `- Pages with affiliate links: **${summary.affiliatePageCount}**`,
  `- Affiliate links checked: **${summary.affiliateLinkCount}**`,
  `- Pages with missing \`sponsored\` + \`nofollow\`: **${summary.missingRelPageCount}**`,
  `- Affiliate pages without visible disclosure text: **${summary.noDisclosurePageCount}**`,
  `- Affiliate pages with promotion terms requiring review: **${summary.promoFlagPageCount}**`,
  `- Pages with interruptive-promotion markers: **${summary.interruptiveFlagPageCount}**`,
  `- Non-200 fetches: **${summary.failedFetchCount}**`,
  "", "## Pages requiring review", "", "| Status | URL | Affiliate links | Missing rel | Disclosure | Flags |", "|---:|---|---:|---:|---|---|",
  ...rows([...missingRelPages, ...noDisclosurePages, ...promoFlagPages, ...interruptiveFlagPages].filter((record, index, all) => all.findIndex((item) => item.url === record.url) === index)),
  "", `Raw records: [affiliate-context-audit-${today}.json](./affiliate-context-audit-${today}.json)`, "",
  "Promotion-term and interruptive-marker rows are review flags, not automatic violations; editorial-policy pages can mention prohibited practices while explaining them.",
].join("\n") + "\n";
writeFileSync(mdPath, markdown);
console.log(JSON.stringify({ summary, jsonPath, mdPath }, null, 2));
