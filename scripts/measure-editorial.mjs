import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function usage() {
  console.log("Usage: node scripts/measure-editorial.mjs --label post-14d --window-start YYYY-MM-DD --window-end YYYY-MM-DD --gsc-pages export.csv --gsc-queries queries.csv --shortio clicks.csv [--gsc-chart chart.csv] [--partner partner.csv] --out docs/metrics/post-14d.json [--baseline docs/metrics/zerotovpn-baseline-2026-08-11.json]");
}

function parseCsv(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = [",", ";", "\t"]
    .map((candidate) => ({ candidate, count: firstLine.split(candidate).length - 1 }))
    .sort((a, b) => b.count - a.count)[0].candidate;
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') { value += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === delimiter && !quoted) { row.push(value); value = ""; continue; }
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
  const raw = String(value)
    .trim()
    .replace(/[%\s\u00a0]/g, "")
    .replace(/[^0-9,.'+\-]/g, "");
  if (!raw) return null;

  const comma = raw.lastIndexOf(",");
  const dot = raw.lastIndexOf(".");
  let normalized = raw.replace(/'/g, "");

  if (comma >= 0 && dot >= 0) {
    // The last separator is the decimal separator in mixed locale exports.
    normalized = comma > dot
      ? normalized.replace(/\./g, "").replace(",", ".")
      : normalized.replace(/,/g, "");
  } else if (comma >= 0) {
    const decimals = raw.length - comma - 1;
    normalized = decimals === 3 ? normalized.replace(/,/g, "") : normalized.replace(",", ".");
  } else if (dot >= 0) {
    const decimals = raw.length - dot - 1;
    normalized = decimals === 3 ? normalized.replace(/\./g, "") : normalized;
  }

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

function classifyCluster(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (/(iran|telegram|russia|china|obfuscation|restricted-network)/.test(normalized)) return "censorship";
  if (/(best\/free-vpn|free-vpn)/.test(normalized)) return "free-vpn";
  if (/(best\/best-vpn|^https?:\/\/www\.zerotovpn\.com\/?$)/.test(normalized)) return "commercial-pillar";
  if (/protocol/.test(normalized)) return "protocols";
  if (/travel/.test(normalized)) return "travel";
  return "other";
}

function slugFromLink(value) {
  if (!value) return "unknown";
  try {
    const pathname = new URL(value).pathname.replace(/\/+$/, "");
    return pathname.split("/").filter(Boolean).pop() || "root";
  } catch {
    const cleaned = String(value).split(/[?#]/, 1)[0].replace(/\/+$/, "");
    return cleaned.split("/").filter(Boolean).pop() || "unknown";
  }
}

function summarizeSearchClusters(rows) {
  const grouped = rows.reduce((map, row) => {
    const cluster = row.cluster ?? "other";
    const current = map[cluster] ?? { cluster, clicks: 0, impressions: 0, weightedPosition: 0, positionImpressions: 0 };
    current.clicks += row.clicks ?? 0;
    current.impressions += row.impressions ?? 0;
    if (row.position !== null && (row.impressions ?? 0) > 0) {
      current.weightedPosition += row.position * row.impressions;
      current.positionImpressions += row.impressions;
    }
    map[cluster] = current;
    return map;
  }, {});
  return Object.values(grouped)
    .map(({ cluster, clicks, impressions, weightedPosition, positionImpressions }) => ({
      cluster,
      clicks,
      impressions,
      ctr: impressions ? clicks / impressions : null,
      averagePosition: positionImpressions ? weightedPosition / positionImpressions : null,
    }))
    .sort((a, b) => b.impressions - a.impressions);
}

function summarizeAffiliateSlugs(rows) {
  const grouped = rows.reduce((map, row) => {
    const slug = row.slug ?? "unknown";
    const current = map[slug] ?? { slug, clicks: 0, humanClicks: 0, rows: 0 };
    current.clicks += row.clicks ?? 0;
    current.humanClicks += row.humanClicks ?? 0;
    current.rows += 1;
    map[slug] = current;
    return map;
  }, {});
  return Object.values(grouped).sort((a, b) => b.clicks - a.clicks);
}

function summarizePartnerSlugs(rows) {
  const grouped = rows.reduce((map, row) => {
    const slug = row.slug ?? "unknown";
    const current = map[slug] ?? { slug, clicks: 0, conversions: 0, revenue: 0, hasConversions: false, hasRevenue: false, rows: 0 };
    current.clicks += row.clicks ?? 0;
    if (row.conversions !== null) { current.conversions += row.conversions; current.hasConversions = true; }
    if (row.revenue !== null) { current.revenue += row.revenue; current.hasRevenue = true; }
    current.rows += 1;
    map[slug] = current;
    return map;
  }, {});
  return Object.values(grouped)
    .map(({ slug, clicks, conversions, revenue, hasConversions, hasRevenue, rows }) => ({
      slug,
      clicks: clicks || null,
      conversions: hasConversions ? conversions : null,
      revenue: hasRevenue ? revenue : null,
      conversionRate: clicks && hasConversions ? conversions / clicks : null,
      epc: clicks && hasRevenue ? revenue / clicks : null,
      rows,
    }))
    .sort((a, b) => (b.revenue ?? b.clicks ?? 0) - (a.revenue ?? a.clicks ?? 0));
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
    const key = kind === "pages" ? "page" : "query";
    return { [key]: label ?? "", cluster: classifyCluster(label), clicks, impressions, ctr, position };
  }).filter((row) => row[kind === "pages" ? "page" : "query"]);
  const clicks = normalized.reduce((sum, row) => sum + (row.clicks ?? 0), 0);
  const impressions = normalized.reduce((sum, row) => sum + (row.impressions ?? 0), 0);
  const weightedPositions = normalized.filter((row) => row.position !== null && (row.impressions ?? 0) > 0);
  const averagePosition = weightedPositions.length ? weightedPositions.reduce((sum, row) => sum + row.position * row.impressions, 0) / weightedPositions.reduce((sum, row) => sum + row.impressions, 0) : null;
  return { rows: normalized, totals: { clicks, impressions, ctr: impressions ? clicks / impressions : null, averagePosition }, byCluster: summarizeSearchClusters(normalized) };
}

function summarizeSearchChart(rows) {
  const normalized = rows.map((row) => ({
    date: pick(row, ["date", "datum"]),
    clicks: number(pick(row, ["clicks", "klikken", "aantal_klikken"])),
    impressions: number(pick(row, ["impressions", "vertoningen", "aantal_vertoningen"])),
    ctr: ratio(pick(row, ["ctr", "gemiddelde_ctr"])),
    position: number(pick(row, ["position", "positie", "gemiddelde_positie"])),
  })).filter((row) => row.date);
  const clicks = normalized.reduce((sum, row) => sum + (row.clicks ?? 0), 0);
  const impressions = normalized.reduce((sum, row) => sum + (row.impressions ?? 0), 0);
  const weightedPositions = normalized.filter((row) => row.position !== null && (row.impressions ?? 0) > 0);
  const averagePosition = weightedPositions.length
    ? weightedPositions.reduce((sum, row) => sum + row.position * row.impressions, 0) / weightedPositions.reduce((sum, row) => sum + row.impressions, 0)
    : null;
  return { rows: normalized, totals: { clicks, impressions, ctr: impressions ? clicks / impressions : null, averagePosition } };
}

function summarizeShortIo(rows) {
  const normalized = rows.map((row) => ({
    date: pick(row, ["date", "datum", "created_at"]),
    link: pick(row, ["link", "short_url", "short_link", "url", "short_url_slug"]),
    country: pick(row, ["country", "land", "country_name"]) ?? "Unknown",
    referrer: pick(row, ["referrer", "doorverwijzer", "referer"]) ?? "Unknown",
    clicks: number(pick(row, ["clicks", "kliks", "total_clicks"])) ?? 0,
    humanClicks: number(pick(row, ["human_clicks", "menselijke_clicks"])),
    slug: slugFromLink(pick(row, ["link", "short_url", "short_link", "url", "short_url_slug"])),
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
    bySlug: summarizeAffiliateSlugs(normalized),
  };
}

function summarizePartner(rows) {
  const normalized = rows.map((row) => ({
    date: pick(row, ["date", "datum", "created_at"]),
    link: pick(row, ["link", "short_url", "short_link", "url", "offer"]),
    clicks: number(pick(row, ["clicks", "kliks", "total_clicks"])),
    conversions: number(pick(row, ["conversions", "conversion", "sales", "orders", "transactions"])),
    revenue: number(pick(row, ["revenue", "commission", "earnings", "payout", "total_revenue"])),
    epc: number(pick(row, ["epc", "earnings_per_click", "revenue_per_click"])),
    slug: slugFromLink(pick(row, ["link", "short_url", "short_link", "url", "offer"])),
  })).filter((row) => row.conversions !== null || row.revenue !== null || row.epc !== null);
  const clicks = normalized.reduce((sum, row) => sum + (row.clicks ?? 0), 0);
  const conversions = normalized.reduce((sum, row) => sum + (row.conversions ?? 0), 0);
  const revenue = normalized.reduce((sum, row) => sum + (row.revenue ?? 0), 0);
  const epcRows = normalized.filter((row) => row.epc !== null);
  const reportedEpc = epcRows.length
    ? epcRows.reduce((sum, row) => sum + row.epc, 0) / epcRows.length
    : null;
  return {
    rows: normalized,
    totals: {
      clicks: clicks || null,
      conversions: normalized.some((row) => row.conversions !== null) ? conversions : null,
      revenue: normalized.some((row) => row.revenue !== null) ? revenue : null,
      conversionRate: clicks && normalized.some((row) => row.conversions !== null) ? conversions / clicks : null,
      epc: clicks && normalized.some((row) => row.revenue !== null) ? revenue / clicks : reportedEpc,
    },
    bySlug: summarizePartnerSlugs(normalized),
  };
}

function delta(current, baseline) {
  if (typeof current !== "number" || typeof baseline !== "number") return null;
  return { absolute: current - baseline, relative: baseline === 0 ? null : (current - baseline) / baseline };
}

const label = arg("--label");
const out = arg("--out");
const windowStart = arg("--window-start");
const windowEnd = arg("--window-end");
const requiredInputFlags = ["--gsc-pages", "--gsc-queries", "--shortio"];
const missingInputFlags = requiredInputFlags.filter((flag) => !arg(flag));
if (process.argv.includes("--help") || !label || !out) {
  usage();
  process.exitCode = 1;
} else if (missingInputFlags.length) {
  console.error(`Missing required input flag(s): ${missingInputFlags.join(", ")}`);
  usage();
  process.exitCode = 1;
} else if ((windowStart && !windowEnd) || (!windowStart && windowEnd)) {
  console.error("Both --window-start and --window-end are required together.");
  usage();
  process.exitCode = 1;
} else if ((windowStart && !/^\d{4}-\d{2}-\d{2}$/.test(windowStart)) || (windowEnd && !/^\d{4}-\d{2}-\d{2}$/.test(windowEnd))) {
  console.error("Measurement window dates must use YYYY-MM-DD.");
  usage();
  process.exitCode = 1;
} else if (windowStart && windowEnd && windowStart > windowEnd) {
  console.error("--window-start must be on or before --window-end.");
  usage();
  process.exitCode = 1;
} else {
  try {
    const gscPagesPath = arg("--gsc-pages");
    const gscQueriesPath = arg("--gsc-queries");
    const shortIoPath = arg("--shortio");
    const gscChartPath = arg("--gsc-chart");
    const partnerPath = arg("--partner");
    const gscPagesRows = readRows(gscPagesPath);
    const gscQueriesRows = readRows(gscQueriesPath);
    const shortIoRows = readRows(shortIoPath);
    const gscChartRows = readRows(gscChartPath);
    const partnerRows = readRows(partnerPath);
    const gscPages = summarizeSearchConsole(gscPagesRows, "pages");
    const gscQueries = summarizeSearchConsole(gscQueriesRows, "queries");
    const shortIo = summarizeShortIo(shortIoRows);
    const gscChart = gscChartRows.length ? summarizeSearchChart(gscChartRows) : null;
    const partner = summarizePartner(partnerRows);
    const partnerMissingMetrics = partnerPath
      ? [
          ...(partner.rows.length ? [] : ["affiliate.partner"]),
          ...(partner.rows.some((row) => row.conversions !== null) ? [] : ["affiliate.partner.conversions"]),
          ...(partner.rows.some((row) => row.revenue !== null) ? [] : ["affiliate.partner.revenue"]),
          ...(partner.rows.some((row) => row.epc !== null) ? [] : ["affiliate.partner.epc"]),
        ]
      : ["affiliate.partner.conversions", "affiliate.partner.revenue", "affiliate.partner.epc"];
    const report = {
      schemaVersion: 1,
      label,
      capturedAt: new Date().toISOString(),
      measurementWindow: windowStart && windowEnd ? { start: windowStart, end: windowEnd } : null,
      sourceFiles: [gscPagesPath, gscQueriesPath, shortIoPath, gscChartPath, partnerPath].filter(Boolean),
      dataQuality: {
        requiredInputsPresent: true,
        rowCounts: {
          gscPages: gscPagesRows.length,
          gscQueries: gscQueriesRows.length,
          shortIo: shortIoRows.length,
          gscChart: gscChartRows.length,
          partner: partnerRows.length,
        },
        partnerExportProvided: Boolean(partnerPath),
        missingMetrics: [
          ...partnerMissingMetrics,
          ...(gscPagesRows.length ? [] : ["searchConsole.pages"]),
          ...(gscQueriesRows.length ? [] : ["searchConsole.queries"]),
          ...(shortIoRows.length ? [] : ["affiliate.rows"]),
        ],
      },
      searchConsole: { pages: gscPages, queries: gscQueries, siteTotals: gscChart?.totals ?? null, chartRows: gscChart?.rows ?? [] },
      affiliate: { ...shortIo, partner },
    };
    const baselinePath = arg("--baseline");
    if (baselinePath) {
      const baseline = JSON.parse(readFileSync(resolve(ROOT, baselinePath), "utf8"));
      report.comparison = { baseline: baselinePath, searchConsole: { clicks: delta(gscPages.totals.clicks, baseline.searchConsole?.totals?.clicks), impressions: delta(gscPages.totals.impressions, baseline.searchConsole?.totals?.impressions), ctr: delta(gscPages.totals.ctr, baseline.searchConsole?.totals?.ctr), averagePosition: delta(gscPages.totals.averagePosition, baseline.searchConsole?.totals?.averagePosition) }, affiliate: { clicks: delta(shortIo.totals.clicks, baseline.affiliate?.totalClicks), humanClicks: delta(shortIo.totals.humanClicks, baseline.affiliate?.humanClicks), conversions: delta(partner.totals.conversions, baseline.affiliate?.conversions), epc: delta(partner.totals.epc, baseline.affiliate?.epc), conversionRate: delta(partner.totals.conversionRate, baseline.affiliate?.conversionRate) } };
    }
    const outputPath = resolve(ROOT, out);
    mkdirSync(resolve(outputPath, ".."), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({ outputPath, label, gscPageRows: gscPages.rows.length, gscQueryRows: gscQueries.rows.length, shortIoRows: shortIo.rows.length, partnerRows: partner.rows.length, compared: Boolean(report.comparison) }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
