import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const importer = resolve(ROOT, "scripts/measure-editorial.mjs");
const temp = mkdtempSync(join(tmpdir(), "zerotovpn-measure-"));

function write(name, content) {
  const path = join(temp, name);
  writeFileSync(path, content);
  return path;
}

function run(args) {
  const result = spawnSync(process.execPath, [importer, ...args], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`measure-editorial failed:\n${result.stdout}\n${result.stderr}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const pages = write(
    "pages.csv",
    "Top pages,Clicks,Impressions,CTR,Position\nhttps://www.zerotovpn.com/,30,1409,2.13%,15.0\nhttps://www.zerotovpn.com/blog/best-vpn-for-iran-2026-bypass-internet-censorship,24,12034,0.20%,9.0\n",
  );
  const queries = write(
    "queries.csv",
    "Top queries,Clicks,Impressions,CTR,Position\nfree vpn,3,329,0.91%,22.0\nrussia vpn,3,255,1.18%,18.0\n",
  );
  const shortIo = write(
    "shortio.csv",
    "Link,Country,Referrer,Clicks,Human clicks\nhttps://go.zerotovpn.com/nordvpn,China,Unknown,134,120\nhttps://go.zerotovpn.com/nordvpn,The Netherlands,go.zerotovpn.com,11,10\n",
  );
  const partner = write(
    "partner.csv",
    "date,link,clicks,conversions,revenue,epc\n2026-08-01,go.zerotovpn.com/nordvpn,100,4,120,1.20\n2026-08-02,go.zerotovpn.com/nordvpn,50,1,35,0.70\n",
  );
  const chart = write(
    "chart.csv",
    "Date,Clicks,Impressions,CTR,Position\n2026-07-28,5,2780,0.18%,35.8\n2026-07-29,5,2735,0.18%,36.2\n",
  );
  const englishOut = join(temp, "english.json");
  run(["--label", "test-english", "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--shortio", shortIo, "--gsc-chart", chart, "--partner", partner, "--out", englishOut]);
  const english = JSON.parse(readFileSync(englishOut, "utf8"));
  assert(english.measurementWindow.start === "2026-07-28" && english.measurementWindow.end === "2026-08-10", "Measurement window should be recorded exactly");
  assert(english.searchConsole.siteTotals.clicks === 10 && english.searchConsole.siteTotals.impressions === 5515, "Chart totals should be aggregated separately from top-page rows");
  assert(english.dataQuality.missingMetrics.length === 0, "English fixture should have no missing metrics");
  assert(english.searchConsole.pages.totals.clicks === 54, "English clicks should total 54");
  assert(english.searchConsole.pages.totals.impressions === 13443, "English impressions should total 13443");
  assert(Math.abs(english.searchConsole.pages.totals.ctr - 54 / 13443) < 1e-12, "English CTR should be normalized");
  assert(english.searchConsole.pages.byCluster.find((row) => row.cluster === "censorship")?.clicks === 24, "Censorship cluster should retain page clicks");
  assert(english.searchConsole.pages.byCluster.find((row) => row.cluster === "commercial-pillar")?.impressions === 1409, "Commercial pillar cluster should retain homepage impressions");
  assert(english.affiliate.bySlug[0].slug === "nordvpn" && english.affiliate.bySlug[0].clicks === 145, "Short.io clicks should be grouped by slug");
  assert(Math.abs(english.affiliate.partner.totals.epc - 155 / 150) < 1e-12, "Partner EPC should be revenue per click");
  assert(english.affiliate.partner.bySlug[0].slug === "nordvpn" && english.affiliate.partner.bySlug[0].conversions === 5, "Partner conversions should be grouped by slug");

  const nordPartner = write(
    "nord-partner.csv",
    "Offer.name,OfferUrl.name,Stat.impressions,Stat.conversions,Stat.clicks,Stat.payout,Stat.date,Stat.ctr,Stat.ltr,Stat.erpc\nNordVPN,Cyber 3y deal,0,0,1,0,2026-08-10,0.00000,0.00000,0.00000\nNordVPN Arabia,,0,0,1,0,2026-08-10,0.00000,0.00000,0.00000\n,,0,0,2,0,,,0.00000\n",
  );
  const nordOut = join(temp, "nord.json");
  run(["--label", "test-nord-export", "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortIo, "--partner", nordPartner, "--out", nordOut]);
  const nord = JSON.parse(readFileSync(nordOut, "utf8"));
  assert(nord.dataQuality.partnerWindow.status === "matched", "Nord-prefixed date headers should match the measurement window");
  assert(nord.affiliate.partner.totals.clicks === 2 && nord.affiliate.partner.totals.conversions === 0, "Nord-prefixed performance fields should normalize clicks and conversions");
  assert(nord.affiliate.partner.totals.epc === 0, "Nord ERPC should normalize to EPC");
  assert(nord.affiliate.partner.bySlug.length === 2, "Unlabeled Nord aggregate rows should not be double-counted");
  assert(nord.affiliate.partner.bySlug.some((row) => row.slug === "cyber-3y-deal"), "Nord offer URL names should remain inspectable partner slugs");

  const localizedPages = write(
    "localized-pages.csv",
    "Pagina;Klikken;Vertoningen;Gemiddelde CTR;Gemiddelde positie\nhttps://www.zerotovpn.com/;30;1.409;2,13%;15,0\nhttps://www.zerotovpn.com/blog/best-vpn-for-iran-2026-bypass-internet-censorship;24;12.034;0,20%;9,0\n",
  );
  const localizedOut = join(temp, "localized.json");
  run(["--label", "test-localized", "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", localizedPages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortIo, "--out", localizedOut]);
  const localized = JSON.parse(readFileSync(localizedOut, "utf8"));
  assert(localized.searchConsole.pages.totals.impressions === 13443, "Localized thousands separators should parse");
  assert(Math.abs(localized.searchConsole.pages.rows[0].ctr - 0.0213) < 1e-12, "Localized decimal comma should parse");
  assert(localized.dataQuality.partnerExportProvided === false, "Partner export should be marked absent");
  assert(localized.dataQuality.partnerWindow.status === "not-provided", "Missing partner export should have an explicit window status");
  assert(localized.dataQuality.missingMetrics.includes("affiliate.partner.conversions"), "Missing partner metrics should be explicit");

  const emptyPartner = write("empty-partner.csv", "date,link,clicks\n2026-08-01,go.zerotovpn.com/nordvpn,10\n");
  const emptyPartnerOut = join(temp, "empty-partner.json");
  run(["--label", "test-empty-partner", "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortIo, "--partner", emptyPartner, "--out", emptyPartnerOut]);
  const emptyPartnerReport = JSON.parse(readFileSync(emptyPartnerOut, "utf8"));
  assert(emptyPartnerReport.dataQuality.missingMetrics.includes("affiliate.partner"), "Empty partner export should be flagged");
  assert(emptyPartnerReport.dataQuality.partnerWindow.status === "matched", "Partner dates should be checked even when metrics are empty");

  const missing = spawnSync(process.execPath, [importer, "--label", "missing", "--out", join(temp, "missing.json")], { encoding: "utf8" });
  assert(missing.status !== 0, "Missing required inputs should fail");
  assert(missing.stderr.includes("--gsc-pages"), "Missing-input error should identify the required flag");

  const mismatchedWindow = spawnSync(process.execPath, [importer, "--label", "bad-window", "--window-start", "2026-08-10", "--window-end", "2026-07-28", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortIo, "--out", join(temp, "bad-window.json")], { encoding: "utf8" });
  assert(mismatchedWindow.status !== 0 && mismatchedWindow.stderr.includes("on or before"), "Reversed measurement windows should fail closed");

  const outsidePartner = write("outside-partner.csv", "date,link,clicks,conversions,revenue,epc\n2026-08-11,go.zerotovpn.com/nordvpn,10,1,10,1\n");
  const outsideWindow = spawnSync(process.execPath, [importer, "--label", "outside-partner", "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortIo, "--partner", outsidePartner, "--out", join(temp, "outside-partner.json")], { encoding: "utf8" });
  assert(outsideWindow.status !== 0 && outsideWindow.stderr.includes("does not match"), "Partner rows outside the measurement window should fail closed");

  console.log(JSON.stringify({ passed: true, cases: ["english-window", "nord-prefixed-partner", "localized", "empty-partner", "missing-required-input", "reversed-window", "partner-window-mismatch"] }, null, 2));
} finally {
  rmSync(temp, { recursive: true, force: true });
}
