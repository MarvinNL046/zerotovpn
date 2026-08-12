import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE = (process.env.CLUSTER_AUDIT_BASE ?? "https://www.zerotovpn.com").replace(/\/$/, "");
const timeoutMs = Math.max(1000, Number(process.env.CLUSTER_AUDIT_TIMEOUT_MS ?? 15000));

const clusters = {
  commercial: {
    label: "Commercial choice",
    pages: [
      { path: "/best/best-vpn", required: ["/best/vpn-privacy", "/best/vpn-streaming", "/best/vpn-cheap", "/best/free-vpn", "/best/vpn-free-trial"] },
      { path: "/best/vpn-privacy", required: ["/best/best-vpn", "/best/vpn-streaming"] },
      { path: "/best/vpn-streaming", required: ["/best/best-vpn", "/best/vpn-netflix", "/best/vpn-cheap"] },
      { path: "/best/vpn-netflix", required: ["/best/best-vpn", "/best/vpn-streaming"] },
      { path: "/best/vpn-cheap", required: ["/best/best-vpn", "/best/free-vpn", "/best/vpn-free-trial"] },
      { path: "/best/fastest-vpn", required: ["/best/best-vpn", "/guides/vpn-speed-guide"] },
      { path: "/best/vpn-free-trial", required: ["/best/best-vpn", "/best/free-vpn"] },
    ],
  },
  censorship: {
    label: "Censorship and restricted networks",
    pages: [
      { path: "/blog/best-vpn-for-iran-2026-bypass-internet-censorship", required: ["/countries/iran", "/countries/russia", "/blog/best-vpn-for-telegram-2026", "/guides/vpn-obfuscation-explained"] },
      { path: "/countries/iran", required: ["/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/countries/russia", "/countries/china"] },
      { path: "/countries/russia", required: ["/countries/iran", "/countries/china", "/blog/best-vpn-for-telegram-2026"] },
      { path: "/countries/china", required: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"] },
      { path: "/blog/best-vpn-for-telegram-2026", required: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"] },
      { path: "/guides/vpn-obfuscation-explained", required: ["/guides/vpn-protocols-explained", "/guides/vpn-for-restricted-networks", "/countries/china"] },
      { path: "/guides/vpn-for-restricted-networks", required: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-travel", "/countries/iran"] },
    ],
  },
  technical: {
    label: "Protocol and technical literacy",
    pages: [
      { path: "/guides/vpn-protocols-explained", required: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-restricted-networks", "/best/best-vpn"] },
      { path: "/guides/vpn-obfuscation-explained", required: ["/guides/vpn-protocols-explained", "/guides/vpn-for-restricted-networks", "/best/best-vpn"] },
      { path: "/guides/vpn-speed-guide", required: ["/guides/vpn-protocols-explained", "/best/best-vpn"] },
      { path: "/what-is-a-vpn", required: ["/guides/vpn-protocols-explained"] },
      { path: "/how-does-a-vpn-work", required: ["/guides/vpn-protocols-explained", "/guides/vpn-speed-guide"] },
    ],
  },
  travel: {
    label: "Travel and public Wi-Fi",
    pages: [
      { path: "/guides/vpn-for-travel", required: ["/guides/vpn-for-restricted-networks", "/countries/iran", "/best/best-vpn"] },
      { path: "/guides/public-wifi-safety", required: ["/guides/vpn-for-travel", "/best/best-vpn"] },
    ],
  },
};

function normalizePath(href) {
  try {
    const url = new URL(href, BASE);
    if (url.origin !== new URL(BASE).origin) return null;
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

function extractInternalPaths(html) {
  return new Set([...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => normalizePath(match[1]))
    .filter(Boolean));
}

async function fetchPage(path) {
  const url = `${BASE}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "ZeroToVPN-cluster-link-audit/1.0" } });
    const html = await response.text();
    const links = extractInternalPaths(html);
    return { path, status: response.status, durationMs: Date.now() - started, internalLinkCount: links.size, internalPaths: [...links], required: [], missing: [], ok: response.status === 200 };
  } catch (error) {
    return { path, status: null, durationMs: Date.now() - started, internalLinkCount: 0, required: [], missing: [], ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const records = [];
for (const [cluster, config] of Object.entries(clusters)) {
  for (const page of config.pages) {
    const record = await fetchPage(page.path);
    const links = new Set(record.internalPaths ?? []);
    record.cluster = cluster;
    record.required = page.required;
    record.missing = page.required.filter((path) => !links.has(path));
    record.ok = record.ok && record.missing.length === 0;
    records.push(record);
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  clusterCount: Object.keys(clusters).length,
  pageCount: records.length,
  passingPages: records.filter((record) => record.ok).length,
  failingPages: records.filter((record) => !record.ok).length,
  missingLinkCount: records.reduce((sum, record) => sum + record.missing.length, 0),
  fetchFailureCount: records.filter((record) => record.status !== 200).length,
};
const report = { summary, clusters: Object.fromEntries(Object.entries(clusters).map(([key, value]) => [key, { label: value.label, pages: value.pages.map((page) => page.path) }])), records };
const label = new Date().toISOString().slice(0, 10);
const metricsDir = resolve(ROOT, "docs", "metrics");
await mkdir(metricsDir, { recursive: true });
await writeFile(resolve(metricsDir, `cluster-link-audit-${label}.json`), `${JSON.stringify(report, null, 2)}\n`);
const lines = ["# Cluster link audit", "", `Generated: ${summary.generatedAt}`, `Base: ${BASE}`, "", `- Clusters: **${summary.clusterCount}**`, `- Pages checked: **${summary.pageCount}**`, `- Passing pages: **${summary.passingPages}**`, `- Failing pages: **${summary.failingPages}**`, `- Missing required links: **${summary.missingLinkCount}**`, `- Fetch failures: **${summary.fetchFailureCount}**`, "", "| Cluster | Page | Required links | Missing | Status |", "|---|---|---:|---|---|"];
for (const record of records) lines.push(`| ${record.cluster} | \`${record.path}\` | ${record.required.length} | ${record.missing.length ? record.missing.map((path) => `\`${path}\``).join(", ") : "—"} | ${record.ok ? "PASS" : "FAIL"} |`);
await writeFile(resolve(metricsDir, `cluster-link-audit-${label}.md`), `${lines.join("\n")}\n`);
console.log(JSON.stringify({ summary, jsonPath: resolve(metricsDir, `cluster-link-audit-${label}.json`), mdPath: resolve(metricsDir, `cluster-link-audit-${label}.md`) }, null, 2));
if (summary.failingPages > 0) process.exitCode = 1;
