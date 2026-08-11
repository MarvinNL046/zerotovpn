import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE = "https://www.zerotovpn.com";
const sitemapUrl = process.env.SITEMAP_URL ?? `${BASE}/sitemap.xml`;
const outputLabel = process.env.AUDIT_LABEL ?? new Date().toISOString().slice(0, 10);
const concurrency = Math.max(1, Number(process.env.AUDIT_CONCURRENCY ?? 8));
const timeoutMs = Math.max(1000, Number(process.env.AUDIT_TIMEOUT_MS ?? 15000));
const limit = Number(process.env.AUDIT_LIMIT ?? 0);

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return value;
  }
}

function decodeXml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1])).filter((url) => /^https?:\/\//i.test(url));
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function extractPageSignals(html) {
  const canonical = firstMatch(html, /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/i)
    ?? firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i);
  const robots = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    ?? firstMatch(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["'][^>]*>/i);
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() ?? null;
  return { canonical, robots, h1Count, title };
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "ZeroToVPN-sitemap-audit/1.0" } });
    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    return { status: response.status, finalUrl: response.url, contentType, durationMs: Date.now() - started, ...extractPageSignals(html) };
  } catch (error) {
    return { status: null, finalUrl: null, contentType: null, durationMs: Date.now() - started, error: error instanceof Error ? error.name === "AbortError" ? "timeout" : error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

async function mapConcurrent(values, worker, size) {
  const output = new Array(values.length);
  let cursor = 0;
  async function run() {
    while (true) {
      const index = cursor++;
      if (index >= values.length) return;
      output[index] = await worker(values[index], index);
      if ((index + 1) % 100 === 0 || index === values.length - 1) console.log(`[sitemap-audit] ${index + 1}/${values.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, values.length) }, run));
  return output;
}

async function main() {
  const sitemapResponse = await fetch(sitemapUrl, { headers: { "user-agent": "ZeroToVPN-sitemap-audit/1.0" } });
  if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}: ${sitemapUrl}`);
  const sitemapXml = await sitemapResponse.text();
  const allUrls = [...new Set(urlsFromSitemap(sitemapXml))];
  const urls = limit > 0 ? allUrls.slice(0, limit) : allUrls;
  console.log(`[sitemap-audit] checking ${urls.length} URLs from ${sitemapUrl} (concurrency ${concurrency})`);
  const checked = await mapConcurrent(urls, async (url) => ({ url, ...(await fetchWithTimeout(url)) }), concurrency);
  const records = checked.map((record) => {
    const canonicalAbsolute = record.canonical ? new URL(record.canonical, record.finalUrl ?? record.url).toString() : null;
    const canonicalMatch = canonicalAbsolute ? normalizeUrl(canonicalAbsolute) === normalizeUrl(record.url) : false;
    const noindex = /(?:^|[,\s])noindex(?:$|[,\s])/i.test(record.robots ?? "");
    const ok = record.status === 200 && !noindex && canonicalMatch && record.h1Count === 1;
    return { ...record, canonicalAbsolute, canonicalMatch, noindex, ok };
  });
  const summary = {
    generatedAt: new Date().toISOString(), sitemapUrl, sitemapUrlCount: allUrls.length, checkedUrlCount: records.length,
    concurrency, timeoutMs, statusCounts: Object.fromEntries(Object.entries(Object.groupBy(records, (row) => String(row.status))).map(([key, rows]) => [key, rows.length])),
    okCount: records.filter((row) => row.ok).length,
    notOkCount: records.filter((row) => !row.ok).length,
    noindexCount: records.filter((row) => row.noindex).length,
    canonicalMismatchCount: records.filter((row) => !row.canonicalMatch).length,
    missingCanonicalCount: records.filter((row) => !row.canonicalAbsolute).length,
    h1CountProblems: records.filter((row) => row.h1Count !== 1).length,
    slowOver2sCount: records.filter((row) => row.durationMs > 2000).length,
  };
  const payload = { schemaVersion: 1, summary, failures: records.filter((row) => !row.ok), records };
  const outDir = resolve(ROOT, "docs", "metrics");
  await mkdir(outDir, { recursive: true });
  const jsonPath = resolve(outDir, `sitemap-audit-${outputLabel}.json`);
  const mdPath = resolve(outDir, `sitemap-audit-${outputLabel}.md`);
  await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  const failureRows = payload.failures.slice(0, 100).map((row) => `| ${row.status ?? "error"} | ${row.url} | ${row.canonicalMatch ? "yes" : "no"} | ${row.noindex ? "noindex" : "indexable"} | ${row.h1Count ?? "n/a"} | ${row.error ?? ""} |`);
  const markdown = [`# Live sitemap audit`, ``, `Generated: ${summary.generatedAt}`, ``, `- Sitemap URLs discovered: **${summary.sitemapUrlCount}**`, `- URLs checked: **${summary.checkedUrlCount}**`, `- Healthy (200, indexable, self-canonical, one H1): **${summary.okCount}**`, `- Needs review: **${summary.notOkCount}**`, `- Canonical mismatches: **${summary.canonicalMismatchCount}**`, `- Noindex URLs in sitemap: **${summary.noindexCount}**`, `- Missing/invalid H1 count: **${summary.h1CountProblems}**`, `- Responses over 2 seconds: **${summary.slowOver2sCount}**`, ``, `## First failures`, ``, `| Status | URL | Self-canonical | Robots | H1s | Error |`, `|---:|---|---|---|---:|---|`, ...(failureRows.length ? failureRows : ["| - | No failures | - | - | - | - |"]), ``, `Raw records: [sitemap-audit-${outputLabel}.json](./sitemap-audit-${outputLabel}.json)`].join("\n") + "\n";
  await writeFile(mdPath, markdown, "utf8");
  console.log(JSON.stringify({ summary, jsonPath, mdPath }, null, 2));
}

main().catch((error) => { console.error(error instanceof Error ? error.stack ?? error.message : error); process.exitCode = 1; });
