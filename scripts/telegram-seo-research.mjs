import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { dfs, DFS_DEFAULTS } from "./dfs.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const CACHE_DIR = resolve(ROOT, ".cache", "dataforseo", "telegram");
const REPORT_DIR = resolve(ROOT, "docs", "research");
const context = { ...DFS_DEFAULTS };
const seeds = [
  "best vpn for telegram",
  "vpn for telegram",
  "unblock telegram",
  "telegram vpn",
  "best vpn for telegram 2026",
  "telegram blocked countries",
  "telegram calls vpn",
];

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`).join(",")}}`;
  return JSON.stringify(value);
}

function cachePath(endpoint, task) {
  const hash = createHash("sha256").update(`${endpoint}:${stable(task)}`).digest("hex");
  return resolve(CACHE_DIR, `${hash}.json`);
}

async function cached(endpoint, task) {
  const path = cachePath(endpoint, task);
  if (existsSync(path) && !process.argv.includes("--refresh")) return JSON.parse(readFileSync(path, "utf8"));
  const result = await dfs(endpoint, task);
  mkdirSync(CACHE_DIR, { recursive: true });
  const payload = { endpoint, task, fetchedAt: new Date().toISOString(), result };
  writeFileSync(path, JSON.stringify(payload, null, 2));
  return payload;
}

function items(payload) {
  return (payload?.result ?? []).flatMap((entry) => Array.isArray(entry?.items) ? entry.items : entry && typeof entry === "object" ? [entry] : []);
}

function collectPaa(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) { value.forEach((child) => collectPaa(child, output)); return output; }
  if (value.type === "people_also_ask") for (const child of value.items ?? []) if (child?.title || child?.question) output.push(child.title ?? child.question);
  Object.values(value).forEach((child) => collectPaa(child, output));
  return output;
}

function overviewRows(payload) {
  return items(payload).map((item) => {
    const info = item.keyword_info ?? item.keyword_data?.keyword_info ?? {};
    const history = Array.isArray(info.monthly_searches) ? info.monthly_searches : [];
    const latest = history.find((entry) => Number(entry?.search_volume) > 0);
    return {
      keyword: item.keyword ?? item.keyword_data?.keyword ?? null,
      searchVolume: info.search_volume ?? null,
      latestNonZeroVolume: latest?.search_volume ?? null,
      latestNonZeroMonth: latest ? `${latest.year}-${String(latest.month).padStart(2, "0")}` : null,
      difficulty: item.keyword_properties?.keyword_difficulty ?? item.keyword_data?.keyword_properties?.keyword_difficulty ?? null,
      intent: item.search_intent_info?.main_intent ?? item.keyword_data?.search_intent_info?.main_intent ?? null,
    };
  }).filter((row) => row.keyword);
}

async function main() {
  const startedAt = new Date().toISOString();
  const overview = overviewRows(await cached("dataforseo_labs/google/keyword_overview/live", { ...context, keywords: seeds }));
  const related = [];
  for (const seed of seeds) {
    for (const [type, endpoint] of [["suggestion", "dataforseo_labs/google/keyword_suggestions/live"], ["related", "dataforseo_labs/google/related_keywords/live"]]) {
      const payload = await cached(endpoint, { ...context, keyword: seed, limit: 10, ...(type === "suggestion" ? { include_seed_keyword: true } : {}) });
      for (const item of items(payload)) {
        const keyword = item.keyword ?? item.keyword_data?.keyword;
        if (keyword) related.push({ seed, type, keyword, searchVolume: item.keyword_info?.search_volume ?? item.keyword_data?.keyword_info?.search_volume ?? null });
      }
    }
  }
  const serp = [];
  for (const keyword of seeds.slice(0, 5)) {
    const payload = await cached("serp/google/organic/live/advanced", { ...context, keyword, depth: 20 });
    serp.push({ keyword, paa: [...new Set(collectPaa(payload.result))].slice(0, 12), hasAiOverview: JSON.stringify(payload.result).includes('"type":"ai_overview"') });
  }
  let competitors = [];
  try {
    const payload = await cached("dataforseo_labs/google/competitors_domain/live", { ...context, target: "zerotovpn.com", limit: 20 });
    competitors = items(payload).map((item) => item.domain ?? item.competitor_domain).filter(Boolean).filter((domain) => domain.replace(/^www\./, "") !== "zerotovpn.com").slice(0, 20);
  } catch (error) { competitors = [`Unavailable: ${error instanceof Error ? error.message : String(error)}`]; }

  const report = { schemaVersion: 1, cluster: "VPN for Telegram / censored messaging", targetDomain: "zerotovpn.com", ...context, startedAt, completedAt: new Date().toISOString(), refreshed: process.argv.includes("--refresh"), seeds, overview, relatedKeywords: [...new Map(related.map((row) => [`${row.type}:${row.keyword}`, row])).values()], serp, competitors, sourcePolicy: "DataForSEO responses are cached locally and used for prioritisation, not as proof that a provider currently connects in a particular country." };
  mkdirSync(REPORT_DIR, { recursive: true });
  const jsonPath = resolve(REPORT_DIR, "dataforseo-telegram-cluster-2026-08-11.json");
  const mdPath = resolve(REPORT_DIR, "dataforseo-telegram-cluster-2026-08-11.md");
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  const lines = ["# DataForSEO research - Telegram VPN cluster", "", `Fetched: ${report.completedAt} | location ${report.location_code} | language ${report.language_code}`, "", "## Keyword overview", "", "| Keyword | Current volume | Latest non-zero | KD | Intent |", "|---|---:|---:|---:|---|", ...overview.map((row) => `| ${row.keyword} | ${row.searchVolume ?? "n/a"} | ${row.latestNonZeroVolume ?? "n/a"}${row.latestNonZeroMonth ? ` (${row.latestNonZeroMonth})` : ""} | ${row.difficulty ?? "n/a"} | ${row.intent ?? "n/a"} |`), "", "## SERP and PAA signals", "", ...serp.flatMap((row) => [`### ${row.keyword}`, `- AI Overview detected: ${row.hasAiOverview ? "yes" : "no"}`, ...(row.paa.length ? row.paa.map((question) => `- PAA: ${question}`) : ["- No PAA questions returned"]), ""]), "## Related keyword candidates", "", "| Seed | Type | Keyword | Volume |", "|---|---|---|---:|", ...report.relatedKeywords.slice(0, 50).map((row) => `| ${row.seed} | ${row.type} | ${row.keyword} | ${row.searchVolume ?? "n/a"} |`), "", "## Competitor domains", "", ...competitors.map((domain) => `- ${domain}`), "", "## Editorial interpretation", "", "Use the signals to shape intent coverage and internal links. Keep provider claims dated and separate from reproducible ZeroToVPN tests."];
  writeFileSync(mdPath, `${lines.join("\n")}\n`);
  console.log(JSON.stringify({ jsonPath, mdPath, cacheDir: CACHE_DIR, overviewRows: overview.length, relatedKeywordRows: report.relatedKeywords.length, serpRows: serp.length, competitorCount: competitors.length }, null, 2));
}

main().catch((error) => { console.error(error instanceof Error ? error.stack ?? error.message : error); process.exitCode = 1; });
