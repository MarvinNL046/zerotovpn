import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { dfs, DFS_DEFAULTS } from "./dfs.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const isDutch = process.argv.includes("--nl");
const localeKey = isDutch ? "nl" : "en";
const CACHE = resolve(ROOT, ".cache", "dataforseo", `nordvpn-review-${localeKey}`);
const OUT = resolve(ROOT, "docs", "research");
const reportDate = new Date().toISOString().slice(0, 10);
const context = isDutch
  ? { location_code: 2528, language_code: "nl" }
  : { ...DFS_DEFAULTS };
const seeds = isDutch ? [
  "nordvpn review",
  "is nordvpn goed",
  "is nordvpn betrouwbaar",
  "nordvpn nadelen",
  "nordvpn prijs",
  "nordvpn netflix",
  "nordvpn snelheid",
] : [
  "nordvpn review",
  "nordvpn review 2026",
  "nordvpn price",
  "nordvpn speed test",
  "nordvpn netflix",
  "is nordvpn worth it",
  "nordvpn vs expressvpn",
  "nordvpn no logs audit",
  "nordvpn free trial",
];

const stable = (value) => value && typeof value === "object" ? JSON.stringify(value, Object.keys(value).sort()) : JSON.stringify(value);
const cachePath = (endpoint, task) => resolve(CACHE, `${createHash("sha256").update(`${endpoint}:${stable(task)}`).digest("hex")}.json`);

async function cached(endpoint, task) {
  const path = cachePath(endpoint, task);
  if (existsSync(path) && !process.argv.includes("--refresh")) return JSON.parse(readFileSync(path, "utf8"));
  const result = await dfs(endpoint, task);
  mkdirSync(CACHE, { recursive: true });
  const payload = { endpoint, task, fetchedAt: new Date().toISOString(), result };
  writeFileSync(path, JSON.stringify(payload, null, 2));
  return payload;
}

const items = (payload) => (payload?.result ?? []).flatMap((entry) => Array.isArray(entry?.items) ? entry.items : entry && typeof entry === "object" ? [entry] : []);

function collectPaa(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) { value.forEach((item) => collectPaa(item, output)); return output; }
  if (value.type === "people_also_ask") for (const item of value.items ?? []) if (item?.title || item?.question) output.push(item.title ?? item.question);
  Object.values(value).forEach((item) => collectPaa(item, output));
  return output;
}

function overviewRows(payload) {
  return items(payload).map((item) => {
    const info = item.keyword_info ?? item.keyword_data?.keyword_info ?? {};
    const history = Array.isArray(info.monthly_searches) ? info.monthly_searches : [];
    const latest = history.find((row) => Number(row?.search_volume) > 0);
    return {
      keyword: item.keyword ?? item.keyword_data?.keyword,
      currentVolume: info.search_volume ?? null,
      latestVolume: latest?.search_volume ?? null,
      latestMonth: latest ? `${latest.year}-${String(latest.month).padStart(2, "0")}` : null,
      difficulty: item.keyword_properties?.keyword_difficulty ?? item.keyword_data?.keyword_properties?.keyword_difficulty ?? null,
      intent: item.search_intent_info?.main_intent ?? item.keyword_data?.search_intent_info?.main_intent ?? null,
    };
  }).filter((row) => row.keyword);
}

async function main() {
  const overview = overviewRows(await cached("dataforseo_labs/google/keyword_overview/live", { ...context, keywords: seeds }));
  const suggestionPayloads = await Promise.all(seeds.map((seed) => cached("dataforseo_labs/google/keyword_suggestions/live", { ...context, keyword: seed, limit: 15, include_seed_keyword: true })));
  const suggestions = suggestionPayloads.flatMap((payload, index) => items(payload).flatMap((item) => {
    const keyword = item.keyword ?? item.keyword_data?.keyword;
    return keyword ? [{ seed: seeds[index], keyword, volume: item.keyword_info?.search_volume ?? item.keyword_data?.keyword_info?.search_volume ?? null }] : [];
  }));
  // SERP calls are deliberately limited to the three highest-intent seeds so a
  // refresh stays within the API time budget while still capturing PAA shape.
  const serpSeeds = seeds.slice(0, 3);
  const serpPayloads = await Promise.all(serpSeeds.map((keyword) => cached("serp/google/organic/live/advanced", { ...context, keyword, depth: 10 })));
  const serp = serpPayloads.map((payload, index) => ({ keyword: serpSeeds[index], paa: [...new Set(collectPaa(payload.result))].slice(0, 12), hasAiOverview: JSON.stringify(payload.result).includes('"type":"ai_overview"') }));
  const report = {
    schemaVersion: 1,
    cluster: "NordVPN review / price / speed / privacy / streaming",
    targetDomain: "zerotovpn.com",
    ...context,
    fetchedAt: new Date().toISOString(),
    refreshed: process.argv.includes("--refresh"),
    seeds,
    overview,
    suggestions: [...new Map(suggestions.map((row) => [row.keyword, row])).values()],
    serp,
    sourcePolicy: "DataForSEO signals prioritise query intent, comparison structure and FAQ coverage; they do not prove NordVPN performance, current pricing, audit scope or conversion value. Provider facts must be tied to dated first-party sources or reproducible tests.",
  };
  mkdirSync(OUT, { recursive: true });
  const localeSuffix = isDutch ? "-nl" : "";
  const jsonPath = resolve(OUT, `dataforseo-nordvpn-review-cluster${localeSuffix}-${reportDate}.json`);
  const mdPath = resolve(OUT, `dataforseo-nordvpn-review-cluster${localeSuffix}-${reportDate}.md`);
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  const lines = [
    `# DataForSEO research — NordVPN review cluster${isDutch ? " (Netherlands / Dutch)" : ""}`,
    "",
    `Fetched: ${report.fetchedAt} | location ${report.location_code} | language ${report.language_code}`,
    "",
    "## Keyword overview",
    "",
    "| Keyword | Current | Latest non-zero | KD | Intent |",
    "|---|---:|---:|---:|---|",
    ...overview.map((row) => `| ${row.keyword} | ${row.currentVolume ?? "n/a"} | ${row.latestVolume ?? "n/a"}${row.latestMonth ? ` (${row.latestMonth})` : ""} | ${row.difficulty ?? "n/a"} | ${row.intent ?? "n/a"} |`),
    "",
    "## PAA and SERP features",
    "",
    ...serp.flatMap((row) => [`### ${row.keyword}`, `- AI Overview: ${row.hasAiOverview ? "yes" : "no"}`, ...(row.paa.length ? row.paa.map((question) => `- PAA: ${question}`) : ["- No PAA returned"]), ""]),
    "## Suggestion candidates",
    "",
    "| Seed | Keyword | Volume |",
    "|---|---|---:|",
    ...report.suggestions.slice(0, 140).map((row) => `| ${row.seed} | ${row.keyword} | ${row.volume ?? "n/a"} |`),
    "",
    "## Editorial interpretation",
    "",
    "Use the signals to structure one evidence-led review around decision questions: current plan terms, privacy evidence, reproducible performance testing, streaming boundaries, device coverage and renewal risk. Remove fixed percentages, universal unblocking language and unsupported testing claims. Keep tracked affiliate links in relevant VPN-selection contexts with clear disclosure; this dossier does not justify a new URL batch before the matched partner measurement is available.",
    "",
  ];
  writeFileSync(mdPath, `${lines.join("\n")}\n`);
  console.log(JSON.stringify({ jsonPath, mdPath, cacheDir: CACHE, overviewRows: overview.length, suggestionRows: report.suggestions.length, serpRows: serp.length }, null, 2));
}

main().catch((error) => { console.error(error instanceof Error ? error.stack ?? error.message : error); process.exitCode = 1; });
