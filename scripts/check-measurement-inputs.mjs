import { access, readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const required = ["gsc-pages", "gsc-queries", "shortio"];
const optional = ["partner"];
const args = process.argv.slice(2);
const inputs = {};
for (let index = 0; index < args.length; index += 1) {
  if (!args[index].startsWith("--")) continue;
  const key = args[index].slice(2);
  inputs[key] = args[index + 1];
  index += 1;
}

const rules = {
  "gsc-pages": { label: "Search Console pages", patterns: [/page|url/i, /click|impression/i] },
  "gsc-queries": { label: "Search Console queries", patterns: [/query|search/i, /click|impression/i] },
  shortio: { label: "Short.io", patterns: [/click|human/i, /link|slug|short/i] },
  partner: { label: "Partner dashboard", patterns: [/conversion|sale|commission|revenue|epc/i] },
};

const results = [];
for (const key of [...required, ...optional]) {
  const value = inputs[key];
  if (!value) {
    results.push({ key, label: rules[key].label, status: key === "partner" ? "optional-missing" : "missing", path: null });
    continue;
  }
  const path = resolve(value);
  const name = basename(path);
  const record = { key, label: rules[key].label, path, status: "ready" };
  if (/fixture|sample|example/i.test(name) || /[\\/]\.cache[\\/]metrics[\\/]/i.test(path) && /fixture|sample|example/i.test(path)) {
    record.status = "fixture-rejected";
    results.push(record);
    continue;
  }
  try {
    await access(path);
    const text = await readFile(path, "utf8");
    const header = text.split(/\r?\n/).slice(0, 5).join(" ");
    record.bytes = Buffer.byteLength(text);
    record.headerMatches = rules[key].patterns.map((pattern) => pattern.test(header));
    if (!record.bytes) record.status = "empty";
    else if (record.headerMatches.some((match) => !match)) record.status = "header-review";
  } catch (error) {
    record.status = "unreadable";
    record.error = error instanceof Error ? error.message : String(error);
  }
  results.push(record);
}

const blocking = results.filter((record) => ["missing", "fixture-rejected", "empty", "header-review", "unreadable"].includes(record.status));
const report = {
  ready: blocking.length === 0 && results.some((record) => record.key === "partner" && record.status === "ready"),
  note: "Fixtures and inferred values are never accepted as production KPI inputs.",
  results,
};
console.log(JSON.stringify(report, null, 2));
if (!report.ready) process.exitCode = 1;
