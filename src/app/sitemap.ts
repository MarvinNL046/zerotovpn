import { MetadataRoute } from "next";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";
import { getAllDynamicCountries } from "@/lib/country-data";
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";
import discoveredStaticRoutes from "@/lib/sitemap-static-routes.generated.json";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

function getPageProfile(path: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
} {
  if (path === "") return { priority: 1.0, changeFrequency: "weekly" };
  if (path === "/deals" || path === "/coupons") {
    return { priority: 0.85, changeFrequency: "daily" };
  }
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
  const baseUrl = "https://zerotovpn.com";
  const locales = routing.locales;
  const nowIso = new Date().toISOString();
  const vpns = await getAllVpns();
  const routeMap = new Map<string, SitemapEntry>();
  const staticPaths = discoveredStaticRoutes.paths as string[];
  const staticPathSet = new Set(staticPaths);

  const addLocalizedPath = (
    path: string,
    opts?: Partial<Pick<SitemapEntry, "priority" | "changeFrequency" | "lastModified">>
  ) => {
    const profile = getPageProfile(path);
    const alternates: Record<string, string> = {
      "x-default": `${baseUrl}${path}`,
    };

    for (const locale of locales) {
      const altPrefix = locale === "en" ? "" : `/${locale}`;
      alternates[locale] = `${baseUrl}${altPrefix}${path}`;
    }

    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const url = `${baseUrl}${prefix}${path}`;
      const basePriority = opts?.priority ?? profile.priority;
      // English pages get a +0.05 priority boost (capped at 1.0)
      const localePriority = locale === "en"
        ? Math.min(1.0, basePriority + 0.05)
        : basePriority;

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
    // NordVPN review gets highest priority among review pages
    const reviewPriority = vpn.slug === "nordvpn" ? 0.95 : 0.8;
    addLocalizedPath(`/reviews/${vpn.slug}`, {
      priority: reviewPriority,
      changeFrequency: "monthly",
    });
  }

  // 3) Dynamic comparison pages: all generated combinations.
  for (let i = 0; i < vpns.length; i++) {
    for (let j = i + 1; j < vpns.length; j++) {
      const slug1 = vpns[i].slug;
      const slug2 = vpns[j].slug;
      // NordVPN comparison pages get higher priority (0.85 vs 0.7)
      const isNordVpnComparison = slug1 === "nordvpn" || slug2 === "nordvpn";
      addLocalizedPath(`/compare/${slug1}-vs-${slug2}`, {
        priority: isNordVpnComparison ? 0.85 : 0.7,
        changeFrequency: "weekly",
      });
    }
  }

  // 4) Dynamic country pages.
  for (const country of getAllDynamicCountries()) {
    addLocalizedPath(`/countries/${country.slug}`, {
      priority: 0.75,
      changeFrequency: "monthly",
    });
  }

  // 5) Dynamic blog posts from DB (skip static blog files already discovered).
  //    Only generate entries for locales where a translation actually exists.
  try {
    const dynamicSlugs = await getAllPublishedSlugs();

    // Group by slug: { slug → { languages: Set, updatedAt: Date } }
    const slugInfoMap = new Map<string, { languages: Set<string>; updatedAt: Date }>();
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

    for (const [slug, info] of slugInfoMap) {
      const path = `/blog/${slug}`;
      if (staticPathSet.has(path)) continue;

      const profile = getPageProfile(path);

      // Build alternates only for locales that have a real translation (or English fallback)
      const availableLocales = locales.filter(
        (l) => info.languages.has(l) || l === "en"
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
        const localePriority = locale === "en"
          ? Math.min(1.0, basePriority + 0.05)
          : basePriority;

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
