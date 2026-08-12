import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const DOMAIN = "go.zerotovpn.com";
const API = "https://api.short.io";
const STATS_API = "https://statistics.short.io";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const startDate = arg("--start");
const endDate = arg("--end");
const out = arg("--out");
const jsonOut = arg("--json");
const apiKey = process.env.SHORTIO_API_KEY;

if (!apiKey || !startDate || !endDate || !out) {
  console.error("Usage: SHORTIO_API_KEY=... node scripts/export-shortio-metrics.mjs --start YYYY-MM-DD --end YYYY-MM-DD --out clicks.csv [--json details.json]");
  process.exitCode = 1;
}

async function request(path, options = {}, base = API) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${path}: ${String(text).slice(0, 240)}`);
  return body;
}

async function getDomain() {
  const domains = await request("/api/domains");
  const domain = domains.find((item) => item.hostname === DOMAIN);
  if (!domain) throw new Error(`Short.io domain not found: ${DOMAIN}`);
  return domain;
}

async function getLinks(domainId) {
  const links = [];
  let pageToken;
  do {
    const query = new URLSearchParams({ domain_id: String(domainId), limit: "150" });
    if (pageToken) query.set("pageToken", pageToken);
    const page = await request(`/api/links?${query}`);
    links.push(...(page.links ?? []));
    pageToken = page.nextPageToken || undefined;
  } while (pageToken);
  return links;
}

async function getStats(link) {
  const stats = await request(`/statistics/link/${encodeURIComponent(link.idString)}`, {
    method: "POST",
    body: JSON.stringify({
      period: "custom",
      startDate,
      endDate,
      tz: "UTC",
      skipTops: true,
      clicksChartInterval: "day",
    }),
  }, STATS_API);
  return {
    date: `${startDate}/${endDate}`,
    link: `https://${DOMAIN}/${link.path}`,
    short_url: `https://${DOMAIN}/${link.path}`,
    path: link.path,
    original_url: link.originalURL ?? "",
    clicks: stats.totalClicks ?? 0,
    human_clicks: stats.humanClicks ?? 0,
  };
}

async function getDomainStats(domainId) {
  return request(`/statistics/domain/${domainId}`, {
    method: "POST",
    body: JSON.stringify({
      period: "custom",
      startDate,
      endDate,
      tz: "UTC",
      skipTops: false,
      clicksChartInterval: "day",
    }),
  }, STATS_API);
}

async function getPopularPaths(domainId) {
  const query = new URLSearchParams({ period: "custom", startDate, endDate, tz: "UTC" });
  return request(`/statistics/domain/${domainId}/paths?${query}`, {}, STATS_API);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

if (apiKey && startDate && endDate && out) {
  try {
    const domain = await getDomain();
    const links = await getLinks(domain.id);
    const rows = [];
    const failures = [];
    for (let index = 0; index < links.length; index += 5) {
      const batch = links.slice(index, index + 5);
      const results = await Promise.all(batch.map(async (link) => {
        try { return { row: await getStats(link) }; }
        catch (error) { return { error: `${link.path}: ${error instanceof Error ? error.message : String(error)}` }; }
      }));
      for (const result of results) {
        if (result.row) rows.push(result.row);
        if (result.error) failures.push(result.error);
      }
    }
    if (failures.length) throw new Error(`Short.io stats failed for ${failures.length} link(s): ${failures.join(" | ")}`);
    const domainStats = await getDomainStats(domain.id);
    const popularPaths = await getPopularPaths(domain.id);
    const output = [
      ["date", "link", "short_url", "path", "original_url", "clicks", "human_clicks"],
      ...rows.map((row) => [row.date, row.link, row.short_url, row.path, row.original_url, row.clicks, row.human_clicks]),
    ].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
    const outputPath = resolve(out);
    mkdirSync(resolve(outputPath, ".."), { recursive: true });
    writeFileSync(outputPath, output);
    const details = {
      domain,
      startDate,
      endDate,
      coverage: "current-links-only",
      note: "Per-link statistics cover the 39 links currently returned by the Short.io link API. Domain totals and popular paths are retained separately because wildcard/deleted paths cannot be joined to a current link slug.",
      domainStats,
      popularPaths,
      links: rows,
    };
    if (jsonOut) {
      const jsonPath = resolve(jsonOut);
      mkdirSync(resolve(jsonPath, ".."), { recursive: true });
      writeFileSync(jsonPath, `${JSON.stringify(details, null, 2)}\n`);
    }
    console.log(JSON.stringify({ domainId: domain.id, domain: DOMAIN, startDate, endDate, links: rows.length, totalClicks: rows.reduce((sum, row) => sum + row.clicks, 0), totalHumanClicks: rows.reduce((sum, row) => sum + row.human_clicks, 0), domainTotalClicks: domainStats.clicks, domainHumanClicks: domainStats.humanClicks, popularPathRows: popularPaths.length, coverage: details.coverage, output: outputPath, json: jsonOut ? resolve(jsonOut) : null }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
