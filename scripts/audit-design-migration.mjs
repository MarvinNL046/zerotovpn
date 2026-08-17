import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const localeRoot = path.join(root, "src", "app", "[locale]");

const reviewedV2Routes = new Set([
  "/",
  "/about",
  "/affiliate-disclosure",
  "/authors/marvin-smit",
  "/best/best-vpn",
  "/best/free-vpn",
  "/best/vpn-macos",
  "/blog",
  "/compare",
  "/contact",
  "/cookie-policy",
  "/countries",
  "/countries/iran",
  "/countries/netherlands",
  "/editorial-policy",
  "/guides",
  "/guides/vpn-for-restricted-networks",
  "/guides/vpn-obfuscation-explained",
  "/guides/vpn-privacy-guide",
  "/guides/vpn-speed-guide",
  "/guides/what-is-vpn",
  "/methodology",
  "/privacy-policy",
  "/quiz",
  "/reports",
  "/reviews",
  "/speed-test",
  "/terms",
  "/tools",
  "/tools/dns-leak-test",
  "/tools/what-is-my-ip",
]);

const hybridFallbackRoutes = new Set([
  "/best/vpn-android-tablet",
  "/best/vpn-android",
  "/best/vpn-cheap",
  "/best/vpn-chromebook",
  "/best/vpn-firestick",
  "/best/vpn-gaming",
  "/best/vpn-ipad",
  "/best/vpn-iphone",
  "/best/vpn-laptops",
  "/best/vpn-linux",
  "/best/vpn-mobile",
  "/best/vpn-port-forwarding",
  "/best/vpn-privacy",
  "/best/vpn-windows",
  "/countries/china",
  "/countries/russia",
  "/countries/vietnam",
  "/guides/vpn-for-travel",
  "/guides/vpn-protocols-explained",
]);

const evidenceFallbackRoutes = new Set([
  "/best-no-log-vpn",
  "/best-vpn-for-digital-nomads",
  "/best/vpn-bali",
  "/best/vpn-free-trial",
  "/best/vpn-morocco",
  "/best/vpn-netflix",
  "/best/vpn-streaming",
  "/best/vpn-tablet",
  "/best/vpn-torrenting",
  "/best/vpn-usa",
  "/best/vpn-windows-tablet",
  "/blog/is-vpn-legal",
  "/blog/vpn-vs-proxy",
  "/countries/australia",
  "/countries/brazil",
  "/countries/egypt",
  "/countries/france",
  "/countries/germany",
  "/countries/india",
  "/countries/indonesia",
  "/countries/japan",
  "/countries/malaysia",
  "/countries/mexico",
  "/countries/pakistan",
  "/countries/saudi-arabia",
  "/countries/south-korea",
  "/countries/thailand",
  "/countries/turkey",
  "/countries/uae",
  "/countries/united-kingdom",
  "/guides/public-wifi-safety",
  "/guides/vpn-for-streaming",
  "/guides/vpn-for-torrenting",
  "/guides/vpn-on-mobile",
  "/reviews/ivacy",
]);

const dynamicFallbackRoutes = new Set([
  "/blog/[slug]",
  "/compare/[comparison]",
  "/countries/[country]",
  "/reviews/[slug]",
]);

const redirectRoutes = new Set([
  "/are-vpns-legal",
  "/are-vpns-safe",
  "/best-cheap-vpn",
  "/best-vpn-for-android",
  "/best-vpn-for-gaming",
  "/best-vpn-for-ios",
  "/best-vpn-for-mac",
  "/best-vpn-for-netflix",
  "/best-vpn-for-privacy",
  "/best-vpn-for-public-wifi",
  "/best-vpn-for-torrenting",
  "/best-vpn-for-travel",
  "/best-vpn-for-windows",
  "/best-vpn",
  "/best/fastest-vpn",
  "/common-vpn-myths",
  "/disclosure",
  "/guides/how-vpn-works",
  "/how-does-a-vpn-work",
  "/how-to-set-up-vpn",
  "/how-we-test",
  "/is-nordvpn-safe",
  "/reports/vpn-transparency-performance-index-2026",
  "/vpn-encryption-explained",
  "/vpn-for-china",
  "/vpn-for-dubai",
  "/vpn-for-germany",
  "/vpn-for-netherlands",
  "/vpn-for-thailand",
  "/vpn-for-turkey",
  "/vpn-for-uae",
  "/vpn-for-uk",
  "/vpn-for-usa",
  "/vpn-index/2026",
  "/vpn-index",
  "/vpn-vs-proxy",
  "/vpn-vs-tor",
  "/what-is-a-vpn",
  "/what-is-no-log-policy",
]);

async function findPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...(await findPages(absolute)));
    if (entry.isFile() && entry.name === "page.tsx") pages.push(absolute);
  }
  return pages;
}

function routeFromFile(file) {
  const relative = path.relative(localeRoot, file).replaceAll("\\", "/");
  const route = relative.replace(/\/?page\.tsx$/, "");
  return route ? `/${route}` : "/";
}

const pages = await findPages(localeRoot);
const failures = [];
const counts = {
  reviewedV2: 0,
  hybridFallback: 0,
  evidenceFallback: 0,
  dynamicFallback: 0,
  redirect: 0,
};

for (const file of pages) {
  const route = routeFromFile(file);
  const source = await readFile(file, "utf8");

  if (reviewedV2Routes.has(route)) {
    counts.reviewedV2 += 1;
    continue;
  }

  if (hybridFallbackRoutes.has(route)) {
    counts.hybridFallback += 1;
    if (
      !/(?:EvidenceFirstRoutePage|EvidenceFirstStaticRoute|LegacyCountryEvidencePage)/.test(
        source,
      )
    ) {
      failures.push(`${route}: non-English legacy fallback is still present`);
    }
    if (
      !/(?:createEvidenceFirstMetadata|createLegacyCountryEvidenceMetadata|createStaticEvidenceFirstMetadata)/.test(
        source,
      )
    ) {
      failures.push(`${route}: fallback metadata is not fail-closed`);
    }
    continue;
  }

  if (evidenceFallbackRoutes.has(route)) {
    counts.evidenceFallback += 1;
    if (
      !/(?:EvidenceFirstRoutePage|EvidenceFirstStaticRoute|LegacyCountryEvidencePage)/.test(
        source,
      )
    ) {
      failures.push(`${route}: evidence-first V2 page is missing`);
    }
    if (
      !/(?:createEvidenceFirstMetadata|createLegacyCountryEvidenceMetadata|createStaticEvidenceFirstMetadata)/.test(
        source,
      )
    ) {
      failures.push(`${route}: evidence-first metadata is missing`);
    }
    for (const forbidden of ["VpnCard", "overallRating", "AffiliateButton"]) {
      if (source.includes(forbidden)) {
        failures.push(`${route}: legacy commercial token ${forbidden} remains`);
      }
    }
    continue;
  }

  if (dynamicFallbackRoutes.has(route)) {
    counts.dynamicFallback += 1;
    if (!/(?:EvidenceFirstRoutePage|LegacyCountryEvidencePage)/.test(source)) {
      failures.push(`${route}: dynamic evidence-first fallback is missing`);
    }
    if (
      !/(?:createEvidenceFirstMetadata|createLegacyCountryEvidenceMetadata)/.test(
        source,
      )
    ) {
      failures.push(`${route}: dynamic fallback metadata is missing`);
    }
    continue;
  }

  if (redirectRoutes.has(route)) {
    counts.redirect += 1;
    if (!/\b(?:permanentRedirect|redirect)\s*\(/.test(source)) {
      failures.push(`${route}: expected a redirect-only adapter`);
    }
    continue;
  }

  failures.push(`${route}: route is not covered by the design-migration audit`);
}

const expectedLocalePageCount =
  reviewedV2Routes.size +
  hybridFallbackRoutes.size +
  evidenceFallbackRoutes.size +
  dynamicFallbackRoutes.size +
  redirectRoutes.size;

if (pages.length !== expectedLocalePageCount) {
  failures.push(
    `route count mismatch: found ${pages.length}, contract covers ${expectedLocalePageCount}`,
  );
}

if (failures.length > 0) {
  console.error("Design migration audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Design migration audit passed for ${pages.length} locale page routes: ` +
    `${counts.reviewedV2} reviewed V2, ` +
    `${counts.hybridFallback} reviewed+fallback, ` +
    `${counts.evidenceFallback} evidence-first, ` +
    `${counts.dynamicFallback} dynamic fallback, ` +
    `${counts.redirect} redirects.`,
);
