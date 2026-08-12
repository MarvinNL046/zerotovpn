import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE = (process.env.CLAIMS_AUDIT_BASE ?? "https://www.zerotovpn.com").replace(/\/$/, "");
const label = process.env.CLAIMS_AUDIT_LABEL ?? new Date().toISOString().slice(0, 10);
const concurrency = Math.max(1, Number(process.env.CLAIMS_AUDIT_CONCURRENCY ?? 20));
const timeoutMs = Math.max(1000, Number(process.env.CLAIMS_AUDIT_TIMEOUT_MS ?? 15000));
const limit = Math.max(0, Number(process.env.CLAIMS_AUDIT_LIMIT ?? 0));

const patterns = [
  { id: "provider-count", label: "unsupported provider/test count", regex: /\b(?:35|38|50)\+?\s+(?:VPNs?|VPN\s+(?:providers?|services?))\b/i },
  { id: "reader-count", label: "unsupported reader count", regex: /\b(?:100K\+|100,000\+)\s+(?:monthly\s+)?readers?\b/i },
  { id: "speed-test-count", label: "unsupported speed-test count", regex: /\b500\+\s+speed\s+tests?\b/i },
  { id: "max-speed", label: "unqualified maximum speed claim", regex: /\b6[,.]730\s*Mbps\b/i },
  { id: "speed-retention", label: "unqualified speed-retention claim", regex: /\bspeed\s+retention(?:\s+hit)?\s+(?:94|95|96)%\b/i },
  { id: "rank-claim", label: "unqualified ranking claim", regex: /\b(?:consistently\s+)?ranks?\s+#?1\b/i },
];

function decodeXml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function stripNonVisible(html) {
  return decodeXml(html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "ZeroToVPN-claims-audit/1.0" } });
    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    const body = stripNonVisible(html);
    const matches = patterns.flatMap((pattern) => {
      const match = body.match(pattern.regex);
      return match ? [{ id: pattern.id, label: pattern.label, excerpt: body.slice(Math.max(0, match.index - 90), Math.min(body.length, (match.index ?? 0) + match[0].length + 150)).replace(/\s+/g, " ").trim() }] : [];
    });
    return { url, status: response.status, finalUrl: response.url, matches };
  } catch (error) {
    return { url, status: null, finalUrl: null, matches: [], error: error instanceof Error ? error.name === "AbortError" ? "timeout" : error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const sitemapResponse = await fetch(`${BASE}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1])).filter((url) => /^https?:\/\//i.test(url)).slice(0, limit || undefined);

const results = [];
let cursor = 0;
async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= urls.length) return;
    results[index] = await fetchPage(urls[index]);
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

const findings = results.filter((result) => result.matches.length > 0);
const errors = results.filter((result) => result.error);
const counts = Object.fromEntries(patterns.map((pattern) => [pattern.id, findings.filter((result) => result.matches.some((match) => match.id === pattern.id)).length]));
const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), base: BASE, urlCount: urls.length, checkedUrlCount: results.length, errorCount: errors.length, findingCount: findings.length, counts, findings, errors };
const metricsDir = resolve(ROOT, "docs", "metrics");
await mkdir(metricsDir, { recursive: true });
await writeFile(resolve(metricsDir, `claim-audit-${label}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
const lines = ["# Live editorial claim audit", "", `Generated: ${report.generatedAt}`, "", `- URLs checked: **${report.checkedUrlCount}**`, `- Pages with flagged claims: **${report.findingCount}**`, `- Fetch errors: **${report.errorCount}**`, "", "## Pattern counts", "", "| Pattern | Pages |", "|---|---:|", ...patterns.map((pattern) => `| ${pattern.label} | ${counts[pattern.id]} |`), "", "## Findings", ""];
for (const finding of findings) for (const match of finding.matches) lines.push("- `" + new URL(finding.url).pathname + "` — **" + match.label + "**: " + match.excerpt);
if (findings.length === 0) lines.push("No configured claim patterns were found in visible production HTML.");
await writeFile(resolve(metricsDir, `claim-audit-${label}.md`), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({ urlCount: urls.length, checkedUrlCount: results.length, errorCount: errors.length, findingCount: findings.length, counts }));
