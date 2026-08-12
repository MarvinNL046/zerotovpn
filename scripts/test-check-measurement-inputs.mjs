import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const temp = mkdtempSync(join(tmpdir(), "zerotovpn-input-check-"));
const pages = join(temp, "Pages.csv");
const queries = join(temp, "Queries.csv");
const chart = join(temp, "Chart.csv");
const shortio = join(temp, "clicks.csv");

try {
  writeFileSync(pages, "Top pages,Clicks,Impressions\nhttps://www.zerotovpn.com/,1,10\n");
  writeFileSync(queries, "Top queries,Clicks,Impressions\nvpn free,1,10\n");
  writeFileSync(chart, "Date,Clicks,Impressions,CTR,Position\n2026-07-28,1,10,10%,1\n");
  writeFileSync(shortio, "Link,Clicks,Human clicks\nhttps://go.zerotovpn.com/nordvpn,1,1\n");
  const result = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortio], { encoding: "utf8" });
  if (result.status !== 1) throw new Error(`Expected missing partner input to keep the gate closed:\n${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  const query = report.results.find((item) => item.key === "gsc-queries");
  if (query?.status !== "ready") throw new Error(`Plural Top queries header was not accepted: ${result.stdout}`);
  const chartResult = report.results.find((item) => item.key === "gsc-chart");
  if (chartResult?.status !== "ready") throw new Error(`Search Console Chart.csv header was not accepted: ${result.stdout}`);
  if (chartResult.window?.status !== "matched") throw new Error(`Chart.csv window was not matched: ${result.stdout}`);
  if (report.measurementWindow?.start !== "2026-07-28") throw new Error(`Measurement window was not recorded: ${result.stdout}`);
  const missingChart = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--shortio", shortio], { encoding: "utf8" });
  if (missingChart.status !== 1 || !JSON.parse(missingChart.stdout).results.some((item) => item.key === "gsc-chart" && item.status === "missing")) throw new Error(`Missing Chart.csv should keep the gate closed:\n${missingChart.stdout}`);
  const outsidePartner = join(temp, "outside-partner.csv");
  writeFileSync(outsidePartner, "date,link,clicks,conversions,revenue,epc\n2026-08-11,go.zerotovpn.com/nordvpn,10,1,10,1\n");
  const outside = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--window-start", "2026-07-28", "--window-end", "2026-08-10", "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortio, "--partner", outsidePartner], { encoding: "utf8" });
  if (outside.status !== 1 || !JSON.parse(outside.stdout).results.some((item) => item.key === "partner" && item.status === "window-mismatch")) throw new Error(`Out-of-window partner input should be rejected: ${outside.stdout}`);
  console.log(JSON.stringify({ passed: true, cases: ["plural-search-console-query-header", "chart-required", "window-match", "partner-window-mismatch"] }, null, 2));
} finally {
  rmSync(temp, { recursive: true, force: true });
}
