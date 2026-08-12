import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const temp = mkdtempSync(join(tmpdir(), "zerotovpn-input-check-"));
const pages = join(temp, "Pages.csv");
const queries = join(temp, "Queries.csv");
const shortio = join(temp, "clicks.csv");

try {
  writeFileSync(pages, "Top pages,Clicks,Impressions\nhttps://www.zerotovpn.com/,1,10\n");
  writeFileSync(queries, "Top queries,Clicks,Impressions\nvpn free,1,10\n");
  writeFileSync(shortio, "Link,Clicks,Human clicks\nhttps://go.zerotovpn.com/nordvpn,1,1\n");
  const result = spawnSync(process.execPath, [resolve(root, "scripts/check-measurement-inputs.mjs"), "--gsc-pages", pages, "--gsc-queries", queries, "--shortio", shortio], { encoding: "utf8" });
  if (result.status !== 1) throw new Error(`Expected missing partner input to keep the gate closed:\n${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  const query = report.results.find((item) => item.key === "gsc-queries");
  if (query?.status !== "ready") throw new Error(`Plural Top queries header was not accepted: ${result.stdout}`);
  console.log(JSON.stringify({ passed: true, case: "plural-search-console-query-header" }, null, 2));
} finally {
  rmSync(temp, { recursive: true, force: true });
}
