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
  const result = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--gsc-pages", pages, "--gsc-queries", queries, "--gsc-chart", chart, "--shortio", shortio], { encoding: "utf8" });
  if (result.status !== 1) throw new Error(`Expected missing partner input to keep the gate closed:\n${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  const query = report.results.find((item) => item.key === "gsc-queries");
  if (query?.status !== "ready") throw new Error(`Plural Top queries header was not accepted: ${result.stdout}`);
  const chartResult = report.results.find((item) => item.key === "gsc-chart");
  if (chartResult?.status !== "ready") throw new Error(`Search Console Chart.csv header was not accepted: ${result.stdout}`);
  const missingChart = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--gsc-pages", pages, "--gsc-queries", queries, "--shortio", shortio], { encoding: "utf8" });
  if (missingChart.status !== 1 || !JSON.parse(missingChart.stdout).results.some((item) => item.key === "gsc-chart" && item.status === "missing")) throw new Error(`Missing Chart.csv should keep the gate closed:\n${missingChart.stdout}`);
  console.log(JSON.stringify({ passed: true, cases: ["plural-search-console-query-header", "chart-required"] }, null, 2));
} finally {
  rmSync(temp, { recursive: true, force: true });
}
