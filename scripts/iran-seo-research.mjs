import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { dfs, DFS_DEFAULTS } from "./dfs.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const CACHE_DIR = resolve(ROOT, ".cache", "dataforseo", "iran");
const REPORT_DIR = resolve(ROOT, "docs", "research");
const context = { ...DFS_DEFAULTS };
const seeds = [
  "best vpn for iran",
  "iran vpn",
  "vpn iran censorship",
  "best vpn for iran 2026",
  "how to use vpn in iran",
  "vpn obfuscation iran",
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
  writeFileSync(path, JSON.stringify({ endpoint, task, fetchedAt: new Date().toISOString(), result }, null, 2));
  return { endpoint, task, fetchedAt: new Date().toISOString(), result };
}

function resultItems(payload) {
  const result = payload?.result;
  if (!Array.isArray(result)) return [];
  return result.flatMap((entry) => {
    if (Array.isArray(entry?.items)) return entry.items;
    return entry && typeof entry === "object" ? [entry] : [];
  });
}

function collectPaa(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) {
    for (const child of value) collectPaa(child, output);
    return output;
  }
  if (value.type === "people_also_ask") {
    for (const child of value.items ?? []) {
      if (child?.title || child?.question) output.push(child.title ?? child.question);
    }
  }
  for (const child of Object.values(value)) collectPaa(child, output);
  return output;
}

function overviewRows(payload) {
  return resultItems(payload).map((item) => {
    const keywordInfo = item.keyword_info ?? item.keyword_data?.keyword_info ?? {};
    const monthlySearches = Array.isArray(keywordInfo.monthly_searches) ? keywordInfo.monthly_searches : [];
    const latestNonZero = monthlySearches.find((entry) => Number(entry?.search_volume) > 0) ?? null;
    return {
    keyword: item.keyword ?? item.keyword_data?.keyword ?? null,
    searchVolume: keywordInfo.search_volume ?? null,
    latestNonZeroVolume: latestNonZero?.search_volume ?? null,
    latestNonZeroMonth: latestNonZero ? `${latestNonZero.year}-${String(latestNonZero.month).padStart(2, "0")}` : null,
    difficulty: item.keyword_properties?.keyword_difficulty ?? item.keyword_data?.keyword_properties?.keyword_difficulty ?? null,
    intent: item.search_intent_info?.main_intent ?? item.keyword_data?.search_intent_info?.main_intent ?? null,
    trend: monthlySearches,
    };
  }).filter((row) => row.keyword);
}

async function main() {
  const refreshed = process.argv.includes("--refresh");
  const startedAt = new Date().toISOString();
  const overviewPayload = await cached("dataforseo_labs/google/keyword_overview/live", { ...context, keywords: seeds });
  const overview = overviewRows(overviewPayload);
  const relatedKeywords = [];
  for (const seed of seeds) {
    for (const [type, endpoint] of [["suggestion", "dataforseo_labs/google/keyword_suggestions/live"], ["related", "dataforseo_labs/google/related_keywords/live"]]) {
      const payload = await cached(endpoint, { ...context, keyword: seed, limit: 10, ...(type === "suggestion" ? { include_seed_keyword: true } : {}) });
      for (const item of resultItems(payload)) {
        const keyword = item.keyword ?? item.keyword_data?.keyword;
        if (keyword) relatedKeywords.push({ seed, type, keyword, searchVolume: item.keyword_info?.search_volume ?? item.keyword_data?.keyword_info?.search_volume ?? null });
      }
    }
  }
  const serp = [];
  for (const keyword of seeds.slice(0, 5)) {
    const payload = await cached("serp/google/organic/live/advanced", { ...context, keyword, depth: 20 });
    const paa = [...new Set(collectPaa(payload.result))].slice(0, 12);
    serp.push({ keyword, paa, hasAiOverview: JSON.stringify(payload.result).includes('"type":"ai_overview"') });
  }

  let domainCompetitors = [];
  try {
    const payload = await cached("dataforseo_labs/google/competitors_domain/live", { ...context, target: "zerotovpn.com", limit: 20 });
    domainCompetitors = resultItems(payload).map((item) => item.domain ?? item.competitor_domain).filter(Boolean).filter((domain) => domain.replace(/^www\./, "") !== "zerotovpn.com").slice(0, 20);
  } catch (error) {
    domainCompetitors = [`Unavailable: ${error instanceof Error ? error.message : String(error)}`];
  }

  const report = {
    schemaVersion: 1,
    cluster: "VPN for Iran / censorship",
    targetDomain: "zerotovpn.com",
    location_code: context.location_code,
    language_code: context.language_code,
    startedAt,
    completedAt: new Date().toISOString(),
    refreshed,
    seeds,
    overview,
    relatedKeywords: [...new Map(relatedKeywords.map((row) => [`${row.type}:${row.keyword}`, row])).values()],
    serp,
    domainCompetitors,
    sourcePolicy: "DataForSEO API responses cached locally; no volume or difficulty is treated as editorial proof without a dated source check.",
  };
  mkdirSync(REPORT_DIR, { recursive: true });
  const jsonPath = resolve(REPORT_DIR, "dataforseo-iran-cluster-2026-08-11.json");
  const mdPath = resolve(REPORT_DIR, "dataforseo-iran-cluster-2026-08-11.md");
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  const lines = [
    "# DataForSEO research — Iran VPN cluster",
    "",
    `Fetched: ${report.completedAt} · location ${report.location_code} · language ${report.language_code}`,
    "",
    "## Keyword overview",
    "",
    "| Keyword | Current monthly volume | Latest non-zero month | KD | Intent |",
    "|---|---:|---:|---:|---|",
    ...overview.map((row) => `| ${row.keyword} | ${row.searchVolume ?? "n/a"} | ${row.latestNonZeroVolume ?? "n/a"}${row.latestNonZeroMonth ? ` (${row.latestNonZeroMonth})` : ""} | ${row.difficulty ?? "n/a"} | ${row.intent ?? "n/a"} |`),
    "",
    "## PAA and SERP features",
    "",
    ...serp.flatMap((row) => [`### ${row.keyword}`, `- AI Overview detected: ${row.hasAiOverview ? "yes" : "no"}`, ...(row.paa.length ? row.paa.map((question) => `- PAA: ${question}`) : ["- No PAA questions returned"]) , ""]),
    "## Related keyword candidates",
    "",
    "| Seed | Type | Keyword | Volume |",
    "|---|---|---|---:|",
    ...[...new Map(relatedKeywords.map((row) => [`${row.type}:${row.keyword}`, row])).values()].slice(0, 40).map((row) => `| ${row.seed} | ${row.type} | ${row.keyword} | ${row.searchVolume ?? "n/a"} |`),
    "## Competitor domains",
    "",
    ...(domainCompetitors.length ? domainCompetitors.map((domain) => `- ${domain}`) : ["- No competitor domains returned"]),
    "",
    "## Editorial interpretation",
    "",
    "Use these values to prioritise research and page structure, not as proof that a provider works in Iran. The article must retain the current evidence boundary, source dates, legal caveat and failure-safe setup guidance.",
  ];
  writeFileSync(mdPath, `${lines.join("\n")}\n`);
  console.log(JSON.stringify({ jsonPath, mdPath, cacheDir: CACHE_DIR, overviewRows: overview.length, relatedKeywordRows: report.relatedKeywords.length, serpRows: serp.length, competitorCount: domainCompetitors.length }, null, 2));
}

main().catch((error) => { console.error(error instanceof Error ? error.stack ?? error.message : error); process.exitCode = 1; });
