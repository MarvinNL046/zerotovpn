import { MetadataRoute } from "next";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";
import { getAllDynamicCountries } from "@/lib/country-data";
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";
import discoveredStaticRoutes from "@/lib/sitemap-static-routes.generated.json";
import { getIndexableReviewLocales } from "@/lib/review-route-policy";
import {
  INDEXABLE_BLOG_SLUG_LOCALES,
  INDEXABLE_COMPARISON_LOCALES,
  INDEXABLE_COUNTRY_LOCALES,
  INDEXABLE_STATIC_ROUTE_LOCALES,
  shouldNoindexPath,
} from "@/lib/indexability";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

// These evidence-led routes deliberately contain locale-aware redirects in
// their page modules. The static-route generator cannot safely distinguish
// those redirects from redirect-only legacy stubs, so sitemap admission for
// this set is explicit and reviewed here.
const CURATED_INDEXABLE_STATIC_PATHS = Object.entries(
  INDEXABLE_STATIC_ROUTE_LOCALES,
)
  .filter(([, locales]) => locales.length > 0)
  .map(([path]) => (path === "/" ? "" : path));

function getPageProfile(path: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
} {
  if (path === "") return { priority: 1.0, changeFrequency: "weekly" };
  if (path.startsWith("/reviews")) {
    return { priority: 0.9, changeFrequency: "weekly" };
  }
  if (path.startsWith("/best/")) {
    return { priority: 0.85, changeFrequency: "weekly" };
  }
  if (path.startsWith("/compare")) {
    return { priority: 0.85, changeFrequency: "weekly" };
  }
  if (path.startsWith("/countries")) {
    return { priority: 0.8, changeFrequency: "weekly" };
  }
  if (path.startsWith("/blog")) {
    return { priority: 0.8, changeFrequency: "weekly" };
  }
  if (path.startsWith("/guides")) {
    return { priority: 0.75, changeFrequency: "monthly" };
  }
  if (path === "/speed-test") {
    return { priority: 0.7, changeFrequency: "weekly" };
  }
  if (
    path === "/about" ||
    path === "/authors/marvin-smit" ||
    path === "/contact" ||
    path === "/affiliate-disclosure" ||
    path === "/privacy-policy" ||
    path === "/terms"
  ) {
    return { priority: 0.5, changeFrequency: "monthly" };
  }
  return { priority: 0.7, changeFrequency: "weekly" };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.zerotovpn.com";
  const locales = routing.locales;
  const nowIso = new Date().toISOString();
  const vpns = await getAllVpns();
  const routeMap = new Map<string, SitemapEntry>();
  const staticPaths = Array.from(
    new Set<string>([
      ...(discoveredStaticRoutes.paths as string[]),
      ...CURATED_INDEXABLE_STATIC_PATHS,
    ]),
  );
  const staticPathSet = new Set(staticPaths);
  // Translated fallbacks for these pages remain noindex until localized
  // evidence exists; the English canonical route stays indexable.
  const noindexLocalesByPath: Record<string, Set<string>> = {
    "/about": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/are-vpns-safe": new Set(locales),
    "/affiliate-disclosure": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/contact": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/cookie-policy": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/best/best-vpn": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/best/fastest-vpn": new Set(locales),
    "/compare": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/countries": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/countries/netherlands": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/guides": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/guides/what-is-vpn": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/guides/vpn-privacy-guide": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/guides/vpn-speed-guide": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/how-we-test": new Set(locales),
    "/is-nordvpn-safe": new Set(locales),
    "/editorial-policy": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/methodology": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/privacy-policy": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/reviews": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/reports": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/reports/vpn-transparency-performance-index-2026": new Set(locales),
    "/vpn-index": new Set(locales),
    "/vpn-index/2026": new Set(locales),
    "/tools": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/quiz": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/speed-test": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/terms": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    // Keep the DNS guide out of the sitemap until its built-in check uses a
    // real authoritative resolver probe instead of public-route context.
    "/tools/dns-leak-test": new Set(locales),
    "/tools/what-is-my-ip": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/authors/marvin-smit": new Set(
      locales.filter((locale) => locale !== "en" && locale !== "nl"),
    ),
    "/countries/iran": new Set(locales.filter((locale) => locale !== "en")),
    "/guides/vpn-obfuscation-explained": new Set(
      locales.filter((locale) => locale !== "en"),
    ),
    "/guides/vpn-for-restricted-networks": new Set(
      locales.filter((locale) => locale !== "en"),
    ),
  };

  const addLocalizedPath = (
    path: string,
    opts?: Partial<
      Pick<SitemapEntry, "priority" | "changeFrequency" | "lastModified">
    >,
  ) => {
    const profile = getPageProfile(path);
    const alternates: Record<string, string> = {
      "x-default": `${baseUrl}${path}`,
    };

    for (const locale of locales) {
      const altPrefix = locale === "en" ? "" : `/${locale}`;
      if (
        noindexLocalesByPath[path]?.has(locale) ||
        shouldNoindexPath(`${altPrefix}${path}`)
      ) {
        continue;
      }
      alternates[locale] = `${baseUrl}${altPrefix}${path}`;
    }

    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      if (
        noindexLocalesByPath[path]?.has(locale) ||
        shouldNoindexPath(`${prefix}${path}`)
      ) {
        continue;
      }
      const url = `${baseUrl}${prefix}${path}`;
      const basePriority = opts?.priority ?? profile.priority;
      // English pages get a +0.05 priority boost (capped at 1.0)
      const localePriority =
        locale === "en" ? Math.min(1.0, basePriority + 0.05) : basePriority;

      routeMap.set(url, {
        url,
        lastModified: opts?.lastModified ?? nowIso,
        changeFrequency: opts?.changeFrequency ?? profile.changeFrequency,
        priority: localePriority,
        alternates: { languages: alternates },
      });
    }
  };

  // 1) Auto-discovered static routes for locale pages.
  for (const path of staticPaths) {
    addLocalizedPath(path);
  }

  // 2) Dynamic review pages.
  for (const vpn of vpns) {
    const indexableLocales = getIndexableReviewLocales(vpn.slug);
    if (!indexableLocales) continue;

    const path = `/reviews/${vpn.slug}`;
    noindexLocalesByPath[path] = new Set(
      locales.filter((locale) => !indexableLocales.includes(locale)),
    );

    // NordVPN review gets highest priority among review pages
    const reviewPriority = vpn.slug === "nordvpn" ? 0.95 : 0.8;
    addLocalizedPath(path, {
      priority: reviewPriority,
      changeFrequency: "monthly",
    });
  }

  // 3) Comparison pages admitted by the evidence-led route contract.
  for (const comparison of Object.keys(INDEXABLE_COMPARISON_LOCALES)) {
    const isNordVpnComparison = comparison.includes("nordvpn");
    addLocalizedPath(`/compare/${comparison}`, {
      priority: isNordVpnComparison ? 0.85 : 0.7,
      changeFrequency: "weekly",
    });
  }

  // 4) Country pages admitted by the evidence-led route contract.
  const dynamicCountrySlugs = new Set(
    getAllDynamicCountries().map((country) => country.slug),
  );
  for (const country of Object.keys(INDEXABLE_COUNTRY_LOCALES)) {
    if (
      !dynamicCountrySlugs.has(country) &&
      !staticPathSet.has(`/countries/${country}`)
    ) {
      continue;
    }
    addLocalizedPath(`/countries/${country}`, {
      priority: 0.75,
      changeFrequency: "monthly",
    });
  }

  // 5) Dynamic blog posts from DB (skip static blog files already discovered).
  //    Only generate entries for locales where a translation actually exists.
  try {
    const dynamicSlugs = await getAllPublishedSlugs();

    // Group by slug: { slug → { languages: Set, updatedAt: Date } }
    const slugInfoMap = new Map<
      string,
      { languages: Set<string>; updatedAt: Date }
    >();
    for (const entry of dynamicSlugs) {
      const existing = slugInfoMap.get(entry.slug);
      if (existing) {
        existing.languages.add(entry.language);
        if (entry.updatedAt > existing.updatedAt) {
          existing.updatedAt = entry.updatedAt;
        }
      } else {
        slugInfoMap.set(entry.slug, {
          languages: new Set([entry.language]),
          updatedAt: entry.updatedAt,
        });
      }
    }

    for (const [slug, approvedLocales] of Object.entries(
      INDEXABLE_BLOG_SLUG_LOCALES,
    )) {
      const info = slugInfoMap.get(slug);
      if (!info) continue;
      const path = `/blog/${slug}`;
      if (staticPathSet.has(path)) continue;

      const profile = getPageProfile(path);

      // The admission map is also the translation contract. A locale enters
      // this list only after its dedicated route/copy has been reviewed.
      const approvedLocaleSet = new Set<string>(approvedLocales);
      const availableLocales = locales.filter((locale) =>
        approvedLocaleSet.has(locale),
      );
      const alternates: Record<string, string> = {
        "x-default": `${baseUrl}${path}`,
      };
      for (const l of availableLocales) {
        const p = l === "en" ? "" : `/${l}`;
        alternates[l] = `${baseUrl}${p}${path}`;
      }

      // Only add entries for locales with translations
      for (const locale of availableLocales) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        const url = `${baseUrl}${prefix}${path}`;
        const basePriority = 0.7;
        const localePriority =
          locale === "en" ? Math.min(1.0, basePriority + 0.05) : basePriority;

        routeMap.set(url, {
          url,
          lastModified: info.updatedAt.toISOString(),
          changeFrequency: profile.changeFrequency,
          priority: localePriority,
          alternates: { languages: alternates },
        });
      }
    }
  } catch {
    // DB can be unavailable during build.
  }

  return Array.from(routeMap.values());
}
