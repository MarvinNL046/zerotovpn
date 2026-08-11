import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function usage() {
  console.log("Usage: node scripts/measure-editorial.mjs --label post-14d --gsc-pages export.csv --gsc-queries queries.csv --shortio clicks.csv --out docs/metrics/post-14d.json [--baseline docs/metrics/zerotovpn-baseline-2026-08-11.json]");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') { value += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === "," && !quoted) { row.push(value); value = ""; continue; }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value); value = "";
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      continue;
    }
    value += char;
  }
  if (value !== "" || row.length) { row.push(value); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map((header) => normalizeHeader(header));
  return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, (cells[index] ?? "").trim()])));
}

function normalizeHeader(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function number(value) {
  if (value === undefined || value === null || value === "") return null;
  const normalized = String(value).replace(/%/g, "").replace(/\s/g, "").replace(/,/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function ratio(value) {
  const parsed = number(value);
  if (parsed === null) return null;
  return String(value).includes("%") || parsed > 1 ? parsed / 100 : parsed;
}

function pick(row, names) {
  for (const name of names) if (row[name] !== undefined && row[name] !== "") return row[name];
  return undefined;
}

function readRows(path) {
  if (!path) return [];
  const absolute = resolve(ROOT, path);
  if (!existsSync(absolute)) throw new Error(`CSV not found: ${absolute}`);
  return parseCsv(readFileSync(absolute, "utf8"));
}

function summarizeSearchConsole(rows, kind) {
  const normalized = rows.map((row) => {
    const label = pick(row, kind === "pages" ? ["top_pages", "page", "url", "pagina"] : ["top_queries", "query", "zoekopdracht", "zoekterm"]);
    const clicks = number(pick(row, ["clicks", "klikken", "aantal_klikken"]));
    const impressions = number(pick(row, ["impressions", "vertoningen", "aantal_vertoningen"]));
    const ctr = ratio(pick(row, ["ctr", "gemiddelde_ctr"]));
    const position = number(pick(row, ["position", "positie", "gemiddelde_positie"]));
    return { [kind === "pages" ? "page" : "query"]: label ?? "", clicks, impressions, ctr, position };
  }).filter((row) => row[kind === "pages" ? "page" : "query"]);
  const clicks = normalized.reduce((sum, row) => sum + (row.clicks ?? 0), 0);
  const impressions = normalized.reduce((sum, row) => sum + (row.impressions ?? 0), 0);
  const weightedPositions = normalized.filter((row) => row.position !== null && (row.impressions ?? 0) > 0);
  const averagePosition = weightedPositions.length ? weightedPositions.reduce((sum, row) => sum + row.position * row.impressions, 0) / weightedPositions.reduce((sum, row) => sum + row.impressions, 0) : null;
  return { rows: normalized, totals: { clicks, impressions, ctr: impressions ? clicks / impressions : null, averagePosition } };
}

function summarizeShortIo(rows) {
  const normalized = rows.map((row) => ({
    date: pick(row, ["date", "datum", "created_at"]),
    link: pick(row, ["link", "short_url", "short_link", "url", "short_url_slug"]),
    country: pick(row, ["country", "land", "country_name"]) ?? "Unknown",
    referrer: pick(row, ["referrer", "doorverwijzer", "referer"]) ?? "Unknown",
    clicks: number(pick(row, ["clicks", "kliks", "total_clicks"])) ?? 0,
    humanClicks: number(pick(row, ["human_clicks", "menselijke_clicks"]))
  }));
  const sumBy = (field) => Object.entries(normalized.reduce((map, row) => { const key = row[field] || "Unknown"; map[key] = (map[key] ?? 0) + row.clicks; return map; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([name, clicks]) => ({ [field]: name, clicks }));
  return {
    rows: normalized,
    totals: {
      clicks: normalized.reduce((sum, row) => sum + row.clicks, 0),
      humanClicks: normalized.reduce((sum, row) => sum + (row.humanClicks ?? 0), 0),
    },
    topCountries: sumBy("country"),
    topReferrers: sumBy("referrer"),
    topLinks: sumBy("link"),
  };
}

function delta(current, baseline) {
  if (typeof current !== "number" || typeof baseline !== "number") return null;
  return { absolute: current - baseline, relative: baseline === 0 ? null : (current - baseline) / baseline };
}

const label = arg("--label");
const out = arg("--out");
if (process.argv.includes("--help") || !label || !out) { usage(); process.exitCode = 1; }
else {
  try {
    const gscPages = summarizeSearchConsole(readRows(arg("--gsc-pages")), "pages");
    const gscQueries = summarizeSearchConsole(readRows(arg("--gsc-queries")), "queries");
    const shortIo = summarizeShortIo(readRows(arg("--shortio")));
    const report = { schemaVersion: 1, label, capturedAt: new Date().toISOString(), sourceFiles: [arg("--gsc-pages"), arg("--gsc-queries"), arg("--shortio")].filter(Boolean), searchConsole: { pages: gscPages, queries: gscQueries }, affiliate: shortIo };
    const baselinePath = arg("--baseline");
    if (baselinePath) {
      const baseline = JSON.parse(readFileSync(resolve(ROOT, baselinePath), "utf8"));
      report.comparison = { baseline: baselinePath, searchConsole: { clicks: delta(gscPages.totals.clicks, baseline.searchConsole?.totals?.clicks), impressions: delta(gscPages.totals.impressions, baseline.searchConsole?.totals?.impressions), ctr: delta(gscPages.totals.ctr, baseline.searchConsole?.totals?.ctr), averagePosition: delta(gscPages.totals.averagePosition, baseline.searchConsole?.totals?.averagePosition) }, affiliate: { clicks: delta(shortIo.totals.clicks, baseline.affiliate?.totalClicks), humanClicks: delta(shortIo.totals.humanClicks, baseline.affiliate?.humanClicks) } };
    }
    const outputPath = resolve(ROOT, out);
    mkdirSync(resolve(outputPath, ".."), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({ outputPath, label, gscPageRows: gscPages.rows.length, gscQueryRows: gscQueries.rows.length, shortIoRows: shortIo.rows.length, compared: Boolean(report.comparison) }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
