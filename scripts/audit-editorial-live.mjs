import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE = (process.env.EDITORIAL_AUDIT_BASE ?? "https://www.zerotovpn.com").replace(/\/$/, "");
const timeoutMs = Math.max(1000, Number(process.env.EDITORIAL_AUDIT_TIMEOUT_MS ?? 15000));

const targets = [
  { path: "/", name: "Homepage hub", ids: [], links: ["/best/best-vpn", "/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/guides/vpn-protocols-explained"], expectFaq: true, expectTable: false },
  { path: "/about", name: "About methodology page", ids: [], links: [], expectFaq: false, expectTable: false },
  { path: "/compare", name: "VPN comparison", ids: ["shortlist", "comparison", "method", "faq", "sources"], links: ["/best/best-vpn", "/best/vpn-cheap", "/best/vpn-privacy", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "vpn comparison", intent: "commercial", cluster: "provider-reviews-and-comparisons", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-linux", name: "Linux VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/guides/vpn-protocols-explained", "/best/vpn-privacy", "/best/vpn-android", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for linux", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-windows", name: "Windows VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/best/vpn-linux", "/best/vpn-android", "/best/vpn-privacy", "/guides/vpn-protocols-explained", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for windows", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-laptops", name: "Laptop VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/best/vpn-windows", "/best/vpn-macos", "/best/vpn-mobile", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for laptop", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-privacy", name: "Privacy VPN comparison", ids: ["quick-picks", "comparison", "threat-model", "faq", "sources"], links: ["/methodology", "/guides/vpn-privacy-guide", "/blog/can-vpn-hide-from-isp", "/best/best-vpn"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for privacy", intent: "commercial", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-gaming", name: "Gaming VPN comparison", ids: ["quick-picks", "comparison", "test", "faq", "sources"], links: ["/best/vpn-privacy", "/best/vpn-port-forwarding", "/guides/vpn-for-streaming", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for gaming", intent: "commercial", cluster: "gaming-and-performance", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/blog/does-vpn-reduce-ping-gaming-2026", name: "VPN gaming latency guide", ids: ["cluster-links", "comparison", "test", "faq", "sources", "related-content"], links: ["/best/vpn-gaming", "/guides/vpn-speed-guide", "/best/vpn-port-forwarding"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "vpn reduce ping", intent: "informational", cluster: "gaming-and-performance", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/speed-test", name: "Internet speed test", ids: ["test", "metrics", "compare", "cluster-links", "faq", "sources"], links: ["/best/fastest-vpn", "/guides/vpn-speed-guide", "/blog/does-vpn-reduce-ping-gaming-2026"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "internet speed test", intent: "informational", cluster: "speed-and-performance", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/tools/dns-leak-test", name: "DNS leak diagnostic tool", ids: ["test", "interpret", "fix", "faq", "sources"], links: ["/best/vpn-privacy", "/blog/vpn-leak-testing-tools-compared-2026", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "dns leak test", intent: "informational", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/nl/speed-test", name: "Dutch speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/de/speed-test", name: "German speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/fr/speed-test", name: "French speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/es/speed-test", name: "Spanish speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/ja/speed-test", name: "Japanese speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/ko/speed-test", name: "Korean speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/th/speed-test", name: "Thai speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/zh/speed-test", name: "Chinese speed test", ids: [], links: [], expectFaq: true, expectTable: true },
  { path: "/best/vpn-chromebook", name: "Chromebook VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/best/vpn-android", "/best/vpn-mobile", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for chromebook", intent: "informational", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-firestick", name: "Fire TV VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/best/vpn-streaming", "/guides/vpn-for-streaming", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for firestick", intent: "informational", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-mobile", name: "Mobile VPN comparison", ids: ["comparison", "setup", "battery", "faq", "sources"], links: ["/best/vpn-privacy", "/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best mobile vpn", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/blog/best-vpn-for-chatgpt-2026", name: "ChatGPT VPN editorial guide", ids: ["quick-picks", "comparison", "availability", "setup", "faq", "sources"], links: ["/blog/vpn-generative-ai-privacy-chatgpt-claude-gemini-data-leaks", "/guides/vpn-for-restricted-networks", "/best/vpn-mobile", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for chatgpt", intent: "commercial", cluster: "ai-privacy-and-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/blog/best-free-vpn-reddit-2026", name: "Reddit free VPN editorial guide", ids: ["quick-picks", "comparison", "safety", "paid-upgrade", "faq", "sources"], links: ["/best/free-vpn", "/blog/is-brave-vpn-free-2026", "/best/vpn-cheap", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best free vpn reddit", intent: "commercial", cluster: "free-and-low-cost-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/best/vpn-android", name: "Android VPN comparison", ids: ["quick-picks", "comparison", "setup", "battery", "faq", "sources"], links: ["/best/vpn-mobile", "/best/vpn-privacy", "/best/free-vpn", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for android", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-android-tablet", name: "Android tablet VPN comparison", ids: ["quick-picks", "comparison", "setup", "faq", "sources"], links: ["/best/vpn-android", "/best/vpn-mobile", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for android tablet", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/best-vpn", name: "Best VPN commercial pillar", ids: ["comparison", "methodology", "faq"], links: ["/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/guides/vpn-protocols-explained", "/best/free-vpn", "/best/vpn-privacy", "/best/vpn-streaming", "/best/vpn-cheap", "/best/vpn-free-trial"], expectFaq: true, brief: { primaryKeyword: "best vpn", intent: "commercial", cluster: "commercial-choice", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/fr/best/best-vpn", name: "French Best VPN commercial pillar", ids: ["quick-picks", "rankings", "comparison", "methodology", "faq", "sources"], links: ["/fr/best/free-vpn", "/fr/best/vpn-privacy", "/fr/best/vpn-streaming", "/fr/best/vpn-cheap", "/fr/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "meilleur vpn", intent: "commercial", cluster: "commercial-choice", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/es/best/best-vpn", name: "Spanish Best VPN commercial pillar", ids: ["quick-picks", "rankings", "comparison", "methodology", "faq", "sources"], links: ["/es/best/free-vpn", "/es/best/vpn-privacy", "/es/best/vpn-streaming", "/es/best/vpn-cheap", "/es/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "mejor vpn", intent: "commercial", cluster: "commercial-choice", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/best/vpn-cheap", name: "Cheap VPN value pillar", ids: ["quick-picks", "comparison", "value-checks", "faq", "sources"], links: ["/best/best-vpn", "/best/free-vpn", "/best/vpn-free-trial", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best cheap vpn", intent: "commercial", cluster: "free-and-low-cost-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
    { path: "/reviews/nordvpn", name: "NordVPN review", ids: ["quick-picks", "evidence", "performance", "faq", "sources"], links: ["/best/best-vpn", "/best/vpn-privacy", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true },
    { path: "/reviews/protonvpn", name: "Proton VPN review", ids: ["quick-picks", "evidence", "performance", "faq", "sources"], links: ["/reviews/nordvpn", "/compare", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "proton vpn review", intent: "commercial", cluster: "provider-reviews-and-comparisons", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
    { path: "/reviews/urban-vpn", name: "Urban VPN review", ids: ["quick-picks", "evidence", "alternatives", "faq", "sources"], links: ["/reviews/protonvpn", "/reviews/nordvpn", "/best/free-vpn", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "urban vpn review", intent: "commercial", cluster: "provider-reviews-and-comparisons", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
    { path: "/reviews/surfshark", name: "Surfshark review", ids: ["quick-picks", "evidence", "performance", "faq", "sources"], links: ["/reviews/nordvpn", "/reviews/protonvpn", "/compare", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "surfshark review", intent: "commercial", cluster: "provider-reviews-and-comparisons", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
    { path: "/reviews/airvpn", name: "AirVPN review", ids: ["quick-picks", "evidence", "performance", "alternatives", "faq", "sources"], links: ["/reviews/protonvpn", "/reviews/nordvpn", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "airvpn review", intent: "commercial", cluster: "provider-reviews-and-comparisons", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/reviews/mullvad", name: "Mullvad review", ids: [], links: ["/reviews/nordvpn", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: false },
  { path: "/blog/best-vpn-for-iran-2026-bypass-internet-censorship", name: "Iran editorial hub", ids: ["cluster-links", "quick-picks", "sources"], links: ["/countries/russia", "/blog/best-vpn-for-telegram-2026", "/guides/vpn-obfuscation-explained"], expectFaq: true, brief: { primaryKeyword: "best vpn for iran", intent: "commercial", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-11", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/blog/best-vpn-for-telegram-2026", name: "Telegram editorial hub", ids: ["cluster-links", "quick-picks", "sources"], links: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"], expectFaq: true, brief: { primaryKeyword: "best vpn for telegram", intent: "commercial", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-12", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/countries/iran", name: "Iran evidence checklist", ids: ["summary", "evidence-matrix", "failure-conditions", "evidence-checklist", "provider-dossiers", "verification", "faq", "related-guides"], links: ["/blog/best-vpn-for-iran-2026-bypass-internet-censorship", "/countries/russia", "/countries/china"], expectFaq: true },
  { path: "/countries/russia", name: "Russia country cluster", ids: ["faq", "sources"], links: ["/countries/iran", "/countries/china", "/blog/best-vpn-for-telegram-2026"], expectFaq: true, brief: { primaryKeyword: "vpn for russia", intent: "commercial", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/countries/china", name: "China country cluster", ids: ["faq", "sources"], links: ["/countries/iran", "/countries/russia", "/guides/vpn-obfuscation-explained"], expectFaq: true, brief: { primaryKeyword: "vpn for china", intent: "commercial", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-11", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/countries/vietnam", name: "Vietnam country cluster", ids: ["quick-picks", "decision-table", "cluster-links", "faq", "sources"], links: ["/countries/china", "/countries/thailand", "/guides/vpn-obfuscation-explained"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for vietnam", intent: "commercial", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/guides/vpn-protocols-explained", name: "Protocol support page", ids: ["comparison", "test-plan", "faq"], links: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-restricted-networks", "/blog/best-vpn-for-telegram-2026"], expectFaq: true, brief: { primaryKeyword: "vpn protocols", intent: "informational", cluster: "protocol-and-technical-literacy", lastReviewedAt: "2026-08-11", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/guides/vpn-obfuscation-explained", name: "Obfuscation support page", ids: ["compare", "test-plan", "faq"], links: ["/guides/vpn-protocols-explained", "/guides/vpn-for-restricted-networks", "/countries/china"], expectFaq: true, brief: { primaryKeyword: "vpn obfuscation", intent: "informational", cluster: "protocol-and-technical-literacy", lastReviewedAt: "2026-08-11", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/guides/vpn-for-restricted-networks", name: "Restricted-network support page", ids: ["restriction-types", "prepare", "test-plan", "faq"], links: ["/guides/vpn-obfuscation-explained", "/guides/vpn-for-travel", "/countries/iran"], expectFaq: true, brief: { primaryKeyword: "vpn on a restricted network", intent: "informational", cluster: "censorship-restricted-networks", lastReviewedAt: "2026-08-11", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/guides/vpn-for-travel", name: "Travel support page", ids: ["prepare", "compare", "faq"], links: ["/guides/vpn-for-restricted-networks", "/countries/iran", "/best/best-vpn"], expectFaq: true, brief: { primaryKeyword: "vpn for travel", intent: "commercial", cluster: "travel-and-public-wifi", lastReviewedAt: "2026-08-12", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/best/free-vpn", name: "Free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/best/best-vpn", "/guides/vpn-for-travel", "/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false, brief: { primaryKeyword: "best free vpn", intent: "commercial", cluster: "free-and-low-cost-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/fr/best/free-vpn", name: "French free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/fr/best/best-vpn", "/fr/guides/vpn-for-travel", "/fr/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false, brief: { primaryKeyword: "best free vpn", intent: "commercial", cluster: "free-and-low-cost-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/nl/best/free-vpn", name: "Dutch free VPN support page", ids: ["free-tiers", "safety", "faq"], links: ["/nl/best/best-vpn", "/nl/guides/vpn-for-travel", "/nl/guides/vpn-for-restricted-networks"], expectFaq: true, expectTable: false, brief: { primaryKeyword: "best free vpn", intent: "commercial", cluster: "free-and-low-cost-access", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/best/vpn-free-trial", name: "Free-trial comparison", ids: ["comparison", "faq", "sources"], links: ["/best/free-vpn", "/best/best-vpn", "/methodology"], expectFaq: true, expectTable: true },
  { path: "/best/vpn-port-forwarding", name: "Port-forwarding comparison", ids: ["quick-picks", "evidence", "comparison", "alternatives", "context", "faq", "sources"], links: ["/best/best-vpn", "/best/vpn-torrenting", "/best/vpn-gaming", "/guides/vpn-protocols-explained", "/methodology", "/affiliate-disclosure"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn with port forwarding", intent: "commercial", cluster: "gaming-and-performance", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "CollectionPage" } },
  { path: "/blog/vpn-connection-drops-why-disconnects-how-to-fix-2026", name: "VPN connection troubleshooting guide", ids: ["sources", "related-content"], links: ["/guides/vpn-protocols-explained", "/guides/vpn-speed-guide", "/best/vpn-mobile", "/best/best-vpn"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "vpn keeps disconnecting", intent: "informational", cluster: "protocol-and-technical-literacy", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/best-country-for-vpn-server-location-2026", name: "VPN server location guide", ids: ["sources", "related-content"], links: ["/guides/vpn-speed-guide", "/best/vpn-privacy", "/guides/vpn-for-travel"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn server location", intent: "commercial", cluster: "travel-and-public-wifi", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/can-vpn-hide-from-isp", name: "VPN ISP privacy guide", ids: ["sources", "related-content"], links: ["/vpn-encryption-explained", "/tools/dns-leak-test", "/best/vpn-privacy"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "can a vpn hide you from your isp", intent: "informational", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/is-brave-vpn-free-2026", name: "Brave VPN free-tier guide", ids: ["sources", "related-content"], links: ["/best/free-vpn", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "is brave vpn free", intent: "commercial", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/vpn-leak-testing-tools-compared-2026", name: "VPN leak-testing tools guide", ids: ["sources", "related-content"], links: ["/tools/dns-leak-test", "/vpn-encryption-explained", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "vpn leak testing tools", intent: "informational", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/best-vpn-for-torrenting-reddit-2026", name: "Reddit torrenting VPN guide", ids: ["cluster-links", "sources", "related-content"], links: ["/best/vpn-torrenting", "/best/vpn-port-forwarding", "/guides/vpn-protocols-explained", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "best vpn for torrenting reddit", intent: "commercial", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/vpn-account-sharing-safe-guide-2026", name: "VPN account-sharing guide", ids: ["sources", "related-content"], links: ["/best/vpn-privacy", "/methodology", "/terms"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "can you share a vpn account", intent: "informational", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "none", schemaType: "Article" } },
  { path: "/blog/vpn-simultaneous-connections-limits-workarounds-2026", name: "VPN simultaneous-connections guide", ids: ["sources", "related-content"], links: ["/blog/vpn-account-sharing-safe-guide-2026", "/best/vpn-privacy", "/methodology"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "how many devices can use a vpn", intent: "commercial", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
  { path: "/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy", name: "Fitness tracking privacy guide", ids: ["sources", "related-content"], links: ["/best/vpn-privacy", "/blog/can-vpn-hide-from-isp", "/best/vpn-mobile"], expectFaq: true, expectTable: true, brief: { primaryKeyword: "fitness app privacy", intent: "informational", cluster: "privacy-and-trust", lastReviewedAt: "2026-08-13", affiliateContext: "vpn-selection", schemaType: "Article" } },
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

function extractContentBrief(html, target) {
  if (!target.brief) return { missing: [], present: false };
  const section = html.match(/<section[^>]+data-editorial-brief=["']true["'][^>]*>/i)?.[0] ?? "";
  const attributeNames = {
    primaryKeyword: "data-primary-keyword",
    intent: "data-editorial-intent",
    cluster: "data-editorial-cluster",
    affiliateContext: "data-affiliate-context",
    schemaType: "data-schema-type",
  };
  const missing = Object.entries(target.brief)
    .filter(([key, expected]) => key !== "lastReviewedAt" && !new RegExp(`${attributeNames[key] ?? `data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`}=["']${String(expected).replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}["']`, "i").test(section))
    .map(([key]) => key);
  const reviewedAt = target.brief.lastReviewedAt;
  if (!new RegExp(`data-last-reviewed-at=["']${reviewedAt}["']`, "i").test(section)) missing.push("lastReviewedAt");
  if (!new RegExp(`data-evidence-count=["'][1-9][0-9]*["']`, "i").test(section)) missing.push("evidence");
  return { missing, present: Boolean(section) };
}

function extractSignals(html, target, url) {
  const meta = extractMeta(html);
  const anchors = extractAnchors(html);
  const images = extractImages(html);
  const contentBrief = extractContentBrief(html, target);
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
    contentBrief: contentBrief.missing.length === 0,
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
    contentBrief,
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
  contentBriefFailureCount: records.filter((record) => !record.checks?.contentBrief).length,
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
  `- Target pages: **${summary.targetCount}**`, `- Passing pages: **${summary.okCount}**`, `- Pages needing review: **${summary.failedCount}**`, `- Affiliate links checked: **${summary.affiliateLinkCount}**`, `- Affiliate links missing sponsored/nofollow: **${summary.missingAffiliateRelCount}**`, `- Affiliate links missing Short.io slug telemetry: **${summary.missingAffiliateSlugCount}**`, `- Missing required cluster links: **${summary.missingClusterLinkCount}**`, `- Pages missing complete Open Graph metadata: **${summary.openGraphFailureCount}**`, `- Pages missing complete Twitter metadata: **${summary.twitterFailureCount}**`, `- Pages failing image alt/dimension checks: **${summary.imageSeoFailureCount}**`, `- Pages with future structured-data dates: **${summary.futureSchemaDateFailureCount}**`, `- Pages missing a freshness signal: **${summary.freshnessFailureCount}**`, `- Pages missing a required content brief: **${summary.contentBriefFailureCount}**`, `- Pages with a broken social-image URL: **${summary.socialImageFailureCount}**`, "",
  "| Status | Page | Title | H1s | Internal links | Affiliate links | Missing required IDs | Missing cluster links |", "|---|---|---|---:|---:|---:|---|---|", ...rows, "", `Raw records: [editorial-live-audit-${label}.json](./editorial-live-audit-${label}.json)`,
].join("\n") + "\n";
await writeFile(mdPath, markdown, "utf8");
console.log(JSON.stringify({ summary, jsonPath, mdPath }, null, 2));
if (summary.failedCount > 0) process.exitCode = 1;
