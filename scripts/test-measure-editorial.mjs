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
    "Top pages,Clicks,Impressions,CTR,Position\nhttps://www.zerotovpn.com/,30,1409,2.13%,15.0\nhttps://www.zerotovpn.com/blog/test,24,12034,0.20%,9.0\n",
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
  const englishOut = join(temp, "english.json");
  run(["--label", "test-english", "--gsc-pages", pages, "--gsc-queries", queries, "--shortio", shortIo, "--partner", partner, "--out", englishOut]);
  const english = JSON.parse(readFileSync(englishOut, "utf8"));
  assert(english.dataQuality.missingMetrics.length === 0, "English fixture should have no missing metrics");
  assert(english.searchConsole.pages.totals.clicks === 54, "English clicks should total 54");
  assert(english.searchConsole.pages.totals.impressions === 13443, "English impressions should total 13443");
  assert(Math.abs(english.searchConsole.pages.totals.ctr - 54 / 13443) < 1e-12, "English CTR should be normalized");
  assert(Math.abs(english.affiliate.partner.totals.epc - 155 / 150) < 1e-12, "Partner EPC should be revenue per click");

  const localizedPages = write(
    "localized-pages.csv",
    "Pagina;Klikken;Vertoningen;Gemiddelde CTR;Gemiddelde positie\nhttps://www.zerotovpn.com/;30;1.409;2,13%;15,0\nhttps://www.zerotovpn.com/blog/test;24;12.034;0,20%;9,0\n",
  );
  const localizedOut = join(temp, "localized.json");
  run(["--label", "test-localized", "--gsc-pages", localizedPages, "--gsc-queries", queries, "--shortio", shortIo, "--out", localizedOut]);
  const localized = JSON.parse(readFileSync(localizedOut, "utf8"));
  assert(localized.searchConsole.pages.totals.impressions === 13443, "Localized thousands separators should parse");
  assert(Math.abs(localized.searchConsole.pages.rows[0].ctr - 0.0213) < 1e-12, "Localized decimal comma should parse");
  assert(localized.dataQuality.partnerExportProvided === false, "Partner export should be marked absent");
  assert(localized.dataQuality.missingMetrics.includes("affiliate.partner.conversions"), "Missing partner metrics should be explicit");

  const missing = spawnSync(process.execPath, [importer, "--label", "missing", "--out", join(temp, "missing.json")], { encoding: "utf8" });
  assert(missing.status !== 0, "Missing required inputs should fail");
  assert(missing.stderr.includes("--gsc-pages"), "Missing-input error should identify the required flag");

  console.log(JSON.stringify({ passed: true, cases: ["english", "localized", "missing-required-input"] }, null, 2));
} finally {
  rmSync(temp, { recursive: true, force: true });
}
