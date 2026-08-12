import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE = (process.env.EDITORIAL_AUDIT_BASE ?? "https://www.zerotovpn.com").replace(/\/$/, "");
const timeoutMs = Math.max(1000, Number(process.env.EDITORIAL_AUDIT_TIMEOUT_MS ?? 15000));

const targets = [
  { path: "/", name: "Homepage hub", ids: [], links: ["/best/best-vpn", "/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/guides/vpn-protocols-explained"], expectFaq: true, expectTable: false },
  { path: "/about", name: "About methodology page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-linux", name: "Linux use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-windows", name: "Windows use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-laptops", name: "Laptop use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-privacy", name: "Privacy use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-gaming", name: "Gaming use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/vpn-chromebook", name: "Chromebook use-case page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/best/best-vpn", name: "Best VPN commercial pillar", ids: ["comparison", "methodology", "faq"], links: ["/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/guides/vpn-protocols-explained", "/best/free-vpn", "/best/vpn-privacy", "/best/vpn-streaming", "/best/vpn-cheap", "/best/vpn-free-trial"], expectFaq: true },
  { path: "/blog/best-vpn-for-iran-2026-bypass-internet-censorship", name: "Iran editorial hub", ids: ["cluster-links", "quick-picks", "sources"], links: ["/countries/russia", "/blog/best-vpn-for-telegram-2026", "/guides/vpn-obfuscation-explained"], expectFaq: true },
  { path: "/blog/best-vpn-for-telegram-2026", name: "Telegram editorial hub", ids: ["cluster-links", "quick-picks", "sources"], links: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"], expectFaq: true },
  { path: "/countries/iran", name: "Iran evidence checklist", ids: ["summary", "evidence-matrix", "failure-conditions", "evidence-checklist", "provider-dossiers", "verification", "faq", "related-guides"], links: ["/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/countries/russia", "/countries/china"], expectFaq: true },
  { path: "/countries/russia", name: "Russia country cluster", ids: ["faq", "sources"], links: ["/countries/iran", "/countries/china", "/blog/best-vpn-for-telegram-2026"], expectFaq: true },
  { path: "/countries/china", name: "China country cluster", ids: ["faq", "sources"], links: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"], expectFaq: true },
  { path: "/guides/vpn-protocols-explained", name: "Protocol support page", ids: ["comparison", "test-plan", "faq"], links: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-restricted-networks", "/blog/best-vpn-for-telegram-2026"], expectFaq: true },
  { path: "/guides/vpn-obfuscation-explained", name: "Obfuscation support page", ids: ["compare", "test-plan", "faq"], links: ["/guides/vpn-protocols-explained", "/guides/vpn-for-restricted-networks", "/countries/china"], expectFaq: true },
  { path: "/guides/vpn-for-restricted-networks", name: "Restricted-network support page", ids: ["restriction-types", "prepare", "test-plan", "faq"], links: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-travel", "/countries/iran"], expectFaq: true },
  { path: "/guides/vpn-for-travel", name: "Travel support page", ids: ["prepare", "compare", "faq"], links: ["/guides/vpn-for-restricted-networks", "/countries/iran", "/best/best-vpn"], expectFaq: true },
  { path: "/best/free-vpn", name: "Free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/best/best-vpn", "/guides/vpn-for-travel", "/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false },
  { path: "/fr/best/free-vpn", name: "French free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/fr/best/best-vpn", "/fr/guides/vpn-for-travel", "/fr/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false },
  { path: "/nl/best/free-vpn", name: "Dutch free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/nl/best/best-vpn", "/nl/guides/vpn-for-travel", "/nl/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false },
  { path: "/best/vpn-free-trial", name: "Free-trial comparison", ids: ["sources"], links: ["/best/free-vpn", "/best/best-vpn", "/methodology"], expectFaq: true },
];

const affiliateHref = /(?:go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv|[?&](?:offer_id|aff_id|url_id)=)/i;

function normalizeUrl(value) {
  try {
    const url = new URL(value, BASE);
    url.hash = "";
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return value;
  }
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function metaContent(html, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return firstMatch(html, new RegExp(`<meta[^>]+${attribute}=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"))
    ?? firstMatch(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escaped}["']`, "i"));
}

function extractMeta(html) {
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() ?? null;
  const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    ?? firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = firstMatch(html, /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)["']/i)
    ?? firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*canonical[^"']*["']/i);
  const robots = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
    ?? firstMatch(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
  return {
    title,
    description,
    canonical,
    robots,
    ogTitle: metaContent(html, "property", "og:title"),
    ogDescription: metaContent(html, "property", "og:description"),
    ogImage: metaContent(html, "property", "og:image"),
    twitterCard: metaContent(html, "name", "twitter:card"),
    twitterTitle: metaContent(html, "name", "twitter:title"),
    twitterDescription: metaContent(html, "name", "twitter:description"),
    twitterImage: metaContent(html, "name", "twitter:image"),
  };
}

function extractAnchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>/gi)].map((match) => {
    const attrs = match[1];
    return {
      href: attrs.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "",
      rel: attrs.match(/\brel=["']([^"']*)["']/i)?.[1]?.split(/\s+/).filter(Boolean) ?? [],
      affiliateSlug: attrs.match(/\bdata-affiliate-slug=["']([^"']+)["']/i)?.[1] ?? "",
    };
  });
}

function extractImages(html) {
  return [...html.matchAll(/<img\b([^>]*)>/gi)].map((match) => {
    const attrs = match[1];
    return {
      alt: attrs.match(/\balt=["']([^"']*)["']/i)?.[1] ?? "",
      width: attrs.match(/\bwidth=["']([^"']*)["']/i)?.[1] ?? "",
      height: attrs.match(/\bheight=["']([^"']*)["']/i)?.[1] ?? "",
      fill: /\bdata-nimg=["']fill["']/i.test(attrs) || /\bfill(?:=["'][^"']*["'])?/i.test(attrs),
    };
  });
}

function extractSignals(html, target, url) {
  const meta = extractMeta(html);
  const anchors = extractAnchors(html);
  const images = extractImages(html);
  const internalLinks = anchors.filter(({ href }) => href.startsWith("/") || href.startsWith(BASE)).length;
  const affiliateLinks = anchors.filter(({ href }) => affiliateHref.test(href));
  const missingAffiliateRel = affiliateLinks.filter(({ rel }) => !rel.includes("sponsored") || !rel.includes("nofollow"));
  const missingAffiliateSlug = affiliateLinks.filter(({ affiliateSlug }) => !/^[a-z0-9][a-z0-9-]*$/i.test(affiliateSlug));
  const hasDisclosure = /affiliate links? may earn|affiliate disclosure|commission/i.test(html) || /href=["'][^"']*affiliate-disclosure/i.test(html);
  const hasMethodology = /href=["'][^"']*(?:methodology|how-we-test)/i.test(html);
  const faqSchema = /["']@type["']\s*:\s*["']FAQPage["']/i.test(html);
  const missingIds = target.ids.filter((id) => !new RegExp(`(?:id|aria-labelledby)=["']${id}["']`, "i").test(html));
  const normalizedHrefs = anchors.map(({ href }) => {
    try { return new URL(href, BASE).pathname.replace(/\/$/, "") || "/"; } catch { return href; }
  });
  const missingLinks = (target.links ?? []).filter((path) => !normalizedHrefs.includes(path));
  const missingImageAltCount = images.filter(({ alt }) => !alt.trim()).length;
  const missingImageDimensionsCount = images.filter(({ width, height, fill }) => !fill && (!width || !height)).length;
  const futureSchemaDates = [...html.matchAll(/"(?:datePublished|dateModified)"\s*:\s*"([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((value) => Number.isFinite(Date.parse(value)) && Date.parse(value) > Date.now() + 86400000);
  const canonicalAbsolute = meta.canonical ? normalizeUrl(new URL(meta.canonical, url).toString()) : null;
  const checks = {
    status200: true,
    title: Boolean(meta.title),
    description: Boolean(meta.description),
    openGraph: Boolean(meta.ogTitle && meta.ogDescription && meta.ogImage),
    twitter: Boolean(meta.twitterCard && meta.twitterTitle && meta.twitterDescription && meta.twitterImage),
    selfCanonical: canonicalAbsolute === normalizeUrl(url),
    indexable: !/(?:^|[\s,])noindex(?:$|[\s,])/i.test(meta.robots ?? ""),
    oneH1: [...html.matchAll(/<h1\b/gi)].length === 1,
    disclosure: hasDisclosure,
    methodology: hasMethodology,
    table: target.expectTable === false || /<table\b/i.test(html),
    internalLinks: internalLinks >= 3,
    affiliateRel: missingAffiliateRel.length === 0,
    affiliateSlug: missingAffiliateSlug.length === 0,
    freshness: target.path === "/" || /(?:updated|last\s+updated|last\s+reviewed|reviewed|dateModified)/i.test(html),
    requiredIds: missingIds.length === 0,
    clusterLinks: missingLinks.length === 0,
    faqSchema: !target.expectFaq || faqSchema,
    imageSeo: missingImageAltCount === 0 && missingImageDimensionsCount === 0,
    structuredDataDates: futureSchemaDates.length === 0,
  };
  return {
    ...meta,
    h1Count: [...html.matchAll(/<h1\b/gi)].length,
    internalLinkCount: internalLinks,
    tableCount: [...html.matchAll(/<table\b/gi)].length,
    imageCount: images.length,
    missingImageAltCount,
    missingImageDimensionsCount,
    futureSchemaDates,
    affiliateLinkCount: affiliateLinks.length,
    missingAffiliateRelCount: missingAffiliateRel.length,
    missingAffiliateSlugCount: missingAffiliateSlug.length,
    missingIds,
    missingLinks,
    faqSchema,
    checks,
    ok: Object.values(checks).every(Boolean),
  };
}

async function fetchTarget(target) {
  const url = `${BASE}${target.path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "ZeroToVPN-editorial-audit/1.0" } });
    const html = response.headers.get("content-type")?.includes("text/html") ? await response.text() : "";
    const signals = extractSignals(html, target, response.url || url);
    const socialImageUrl = signals.ogImage || signals.twitterImage;
    let socialImage = { status: null, contentType: null, ok: false };
    if (socialImageUrl) {
      try {
        const imageTarget = new URL(socialImageUrl, response.url || url);
        if (BASE !== "https://www.zerotovpn.com" && imageTarget.origin === "https://www.zerotovpn.com") {
          imageTarget.protocol = new URL(BASE).protocol;
          imageTarget.host = new URL(BASE).host;
        }
        const imageResponse = await fetch(imageTarget, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "ZeroToVPN-editorial-audit/1.0" } });
        socialImage = {
          status: imageResponse.status,
          contentType: imageResponse.headers.get("content-type"),
          ok: imageResponse.ok && (imageResponse.headers.get("content-type") ?? "").startsWith("image/"),
        };
        await imageResponse.arrayBuffer();
      } catch (error) {
        socialImage = { status: null, contentType: null, ok: false, error: error instanceof Error ? error.message : String(error) };
      }
    }
    const checks = { ...signals.checks, status200: response.status === 200, socialImage: socialImage.ok };
    return { ...target, url, status: response.status, finalUrl: response.url, durationMs: Date.now() - started, ...signals, socialImage, checks, ok: response.status === 200 && Object.values(checks).every(Boolean) };
  } catch (error) {
    return { ...target, url, status: null, durationMs: Date.now() - started, ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const records = await Promise.all(targets.map(fetchTarget));
const summary = {
  generatedAt: new Date().toISOString(),
  targetCount: records.length,
  okCount: records.filter((record) => record.ok).length,
  failedCount: records.filter((record) => !record.ok).length,
  affiliateLinkCount: records.reduce((sum, record) => sum + (record.affiliateLinkCount ?? 0), 0),
  missingAffiliateRelCount: records.reduce((sum, record) => sum + (record.missingAffiliateRelCount ?? 0), 0),
  missingAffiliateSlugCount: records.reduce((sum, record) => sum + (record.missingAffiliateSlugCount ?? 0), 0),
  missingClusterLinkCount: records.reduce((sum, record) => sum + (record.missingLinks?.length ?? 0), 0),
  openGraphFailureCount: records.filter((record) => !record.checks?.openGraph).length,
  twitterFailureCount: records.filter((record) => !record.checks?.twitter).length,
  imageSeoFailureCount: records.filter((record) => !record.checks?.imageSeo).length,
  futureSchemaDateFailureCount: records.filter((record) => !record.checks?.structuredDataDates).length,
  freshnessFailureCount: records.filter((record) => !record.checks?.freshness).length,
  socialImageFailureCount: records.filter((record) => !record.checks?.socialImage).length,
};
const payload = { schemaVersion: 1, summary, records };
const outDir = resolve(ROOT, "docs", "metrics");
await mkdir(outDir, { recursive: true });
const label = new Date().toISOString().slice(0, 10);
const jsonPath = resolve(outDir, `editorial-live-audit-${label}.json`);
const mdPath = resolve(outDir, `editorial-live-audit-${label}.md`);
await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
const rows = records.map((record) => `| ${record.ok ? "pass" : "FAIL"} | ${record.path} | ${record.title ?? ""} | ${record.h1Count ?? "n/a"} | ${record.internalLinkCount ?? "n/a"} | ${record.affiliateLinkCount ?? "n/a"} | ${record.missingIds?.join(", ") || "—"} | ${record.missingLinks?.join(", ") || "—"} |`);
const markdown = [
  "# Live editorial page audit", "", `Generated: ${summary.generatedAt}`, "",
  `- Target pages: **${summary.targetCount}**`, `- Passing pages: **${summary.okCount}**`, `- Pages needing review: **${summary.failedCount}**`, `- Affiliate links checked: **${summary.affiliateLinkCount}**`, `- Affiliate links missing sponsored/nofollow: **${summary.missingAffiliateRelCount}**`, `- Affiliate links missing Short.io slug telemetry: **${summary.missingAffiliateSlugCount}**`, `- Missing required cluster links: **${summary.missingClusterLinkCount}**`, `- Pages missing complete Open Graph metadata: **${summary.openGraphFailureCount}**`, `- Pages missing complete Twitter metadata: **${summary.twitterFailureCount}**`, `- Pages failing image alt/dimension checks: **${summary.imageSeoFailureCount}**`, `- Pages with future structured-data dates: **${summary.futureSchemaDateFailureCount}**`, `- Pages missing a freshness signal: **${summary.freshnessFailureCount}**`, `- Pages with a broken social-image URL: **${summary.socialImageFailureCount}**`, "",
  "| Status | Page | Title | H1s | Internal links | Affiliate links | Missing required IDs | Missing cluster links |", "|---|---|---|---:|---:|---:|---|---|", ...rows, "", `Raw records: [editorial-live-audit-${label}.json](./editorial-live-audit-${label}.json)`,
].join("\n") + "\n";
await writeFile(mdPath, markdown, "utf8");
console.log(JSON.stringify({ summary, jsonPath, mdPath }, null, 2));
if (summary.failedCount > 0) process.exitCode = 1;
