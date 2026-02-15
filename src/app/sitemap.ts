import { MetadataRoute } from "next";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";
import { getAllDynamicCountries } from "@/lib/country-data";
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";

// Auto-discovered static pages - add new pages here and they'll be in the sitemap
const staticPages = [
  // Main pages (priority 1.0)
  { path: "", priority: 1.0, changeFreq: "weekly" as const },

  // Reviews section (priority 0.9)
  { path: "/reviews", priority: 0.9, changeFreq: "weekly" as const },

  // Best VPN pages - General (priority 0.9)
  { path: "/best/best-vpn", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/best/free-vpn", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-gaming", priority: 0.85, changeFreq: "weekly" as const },

  // Best VPN pages - Mobile devices (priority 0.85)
  { path: "/best/vpn-mobile", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-iphone", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-android", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-tablet", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-ipad", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-android-tablet", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-windows-tablet", priority: 0.85, changeFreq: "weekly" as const },

  // Best VPN pages - Desktop devices (priority 0.85)
  { path: "/best/vpn-laptops", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-linux", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-macos", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-windows", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-chromebook", priority: 0.85, changeFreq: "weekly" as const },

  // Best VPN pages - Use case (priority 0.9)
  { path: "/best/vpn-netflix", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/best/vpn-streaming", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/best/vpn-torrenting", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-cheap", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/best/vpn-firestick", priority: 0.85, changeFreq: "weekly" as const },

  // Best VPN pages - Countries (priority 0.85)
  { path: "/best/vpn-china", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-russia", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-uae", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-iran", priority: 0.85, changeFreq: "weekly" as const },

  // Comparison (priority 0.85)
  { path: "/compare", priority: 0.85, changeFreq: "weekly" as const },

  // Deals & Promotions (priority 0.85)
  { path: "/deals", priority: 0.85, changeFreq: "daily" as const },
  { path: "/coupons", priority: 0.85, changeFreq: "daily" as const },

  // Interactive tools (priority 0.8)
  { path: "/quiz", priority: 0.8, changeFreq: "weekly" as const },

  // Countries section (priority 0.8)
  { path: "/countries", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/china", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/russia", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/uae", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/iran", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/turkey", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/netherlands", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/india", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/pakistan", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/egypt", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/indonesia", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/saudi-arabia", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/countries/vietnam", priority: 0.8, changeFreq: "weekly" as const },

  // Blog section (priority 0.8)
  { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/blog/vpn-black-friday-2026", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/blog/is-vpn-legal", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/blog/vpn-vs-proxy", priority: 0.75, changeFreq: "monthly" as const },

  // Guides section (priority 0.8)
  { path: "/guides", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/guides/what-is-vpn", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/how-vpn-works", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-for-streaming", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-for-torrenting", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-for-travel", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-on-mobile", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-privacy-guide", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-protocols-explained", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/vpn-speed-guide", priority: 0.75, changeFreq: "monthly" as const },
  { path: "/guides/public-wifi-safety", priority: 0.75, changeFreq: "monthly" as const },

  // Tools (priority 0.7)
  { path: "/speed-test", priority: 0.7, changeFreq: "weekly" as const },

  // Info pages (priority 0.5)
  { path: "/about", priority: 0.5, changeFreq: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFreq: "monthly" as const },
  { path: "/affiliate-disclosure", priority: 0.3, changeFreq: "yearly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFreq: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zerotovpn.com";
  const vpns = await getAllVpns();
  const locales = routing.locales;
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [];

  // Add all static pages for each locale
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const url = `${baseUrl}${prefix}${page.path}`;

      // Generate alternates for all languages
      const alternates: Record<string, string> = {
        "x-default": `${baseUrl}${page.path}`
      };
      locales.forEach((l) => {
        const altPrefix = l === "en" ? "" : `/${l}`;
        alternates[l] = `${baseUrl}${altPrefix}${page.path}`;
      });

      routes.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Add individual VPN review pages for each locale
  vpns.forEach((vpn) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const url = `${baseUrl}${prefix}/reviews/${vpn.slug}`;

      // Generate alternates for all languages
      const alternates: Record<string, string> = {
        "x-default": `${baseUrl}/reviews/${vpn.slug}`
      };
      locales.forEach((l) => {
        const altPrefix = l === "en" ? "" : `/${l}`;
        alternates[l] = `${baseUrl}${altPrefix}/reviews/${vpn.slug}`;
      });

      routes.push({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Add top comparison pages for each locale
  const topComparisons = [
    // Top tier vs each other
    ['nordvpn', 'surfshark'],
    ['nordvpn', 'expressvpn'],
    ['surfshark', 'expressvpn'],
    ['nordvpn', 'cyberghost'],
    ['surfshark', 'cyberghost'],
    ['expressvpn', 'cyberghost'],

    // Top tier vs ProtonVPN
    ['nordvpn', 'protonvpn'],
    ['surfshark', 'protonvpn'],
    ['expressvpn', 'protonvpn'],

    // Top tier vs PIA and Mullvad
    ['nordvpn', 'private-internet-access'],
    ['surfshark', 'private-internet-access'],
    ['nordvpn', 'mullvad'],
    ['expressvpn', 'mullvad'],

    // Other popular comparisons
    ['cyberghost', 'protonvpn'],
    ['protonvpn', 'mullvad'],
    ['ipvanish', 'vyprvpn'],
    ['tunnelbear', 'windscribe'],
    ['hotspotshield', 'strongvpn'],
    ['purevpn', 'atlasvpn'],
    ['privatevpn', 'torguard'],
  ];

  // Add dynamic country pages for each locale
  const dynamicCountries = getAllDynamicCountries();
  dynamicCountries.forEach((country) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const path = `/countries/${country.slug}`;
      const url = `${baseUrl}${prefix}${path}`;

      const alternates: Record<string, string> = {
        "x-default": `${baseUrl}${path}`
      };
      locales.forEach((l) => {
        const altPrefix = l === "en" ? "" : `/${l}`;
        alternates[l] = `${baseUrl}${altPrefix}${path}`;
      });

      routes.push({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  topComparisons.forEach(([slug1, slug2]) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const path = `/compare/${slug1}-vs-${slug2}`;
      const url = `${baseUrl}${prefix}${path}`;

      // Generate alternates for all languages
      const alternates: Record<string, string> = {
        "x-default": `${baseUrl}${path}`
      };
      locales.forEach((l) => {
        const altPrefix = l === "en" ? "" : `/${l}`;
        alternates[l] = `${baseUrl}${altPrefix}${path}`;
      });

      routes.push({
        url,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Add dynamic blog posts from DB
  try {
    const dynamicSlugs = await getAllPublishedSlugs();

    // Group slugs by slug to get available languages
    const slugMap = new Map<string, { languages: string[]; updatedAt: Date }>();
    for (const entry of dynamicSlugs) {
      const existing = slugMap.get(entry.slug);
      if (existing) {
        existing.languages.push(entry.language);
        if (entry.updatedAt > existing.updatedAt) {
          existing.updatedAt = entry.updatedAt;
        }
      } else {
        slugMap.set(entry.slug, {
          languages: [entry.language],
          updatedAt: entry.updatedAt,
        });
      }
    }

    for (const [slug, data] of slugMap) {
      // Skip if this slug already exists in static pages
      const isStatic = staticPages.some((p) => p.path === `/blog/${slug}`);
      if (isStatic) continue;

      locales.forEach((locale) => {
        const prefix = locale === "en" ? "" : `/${locale}`;
        const path = `/blog/${slug}`;
        const url = `${baseUrl}${prefix}${path}`;

        const alternates: Record<string, string> = {
          "x-default": `${baseUrl}${path}`,
        };
        locales.forEach((l) => {
          const altPrefix = l === "en" ? "" : `/${l}`;
          alternates[l] = `${baseUrl}${altPrefix}${path}`;
        });

        routes.push({
          url,
          lastModified: data.updatedAt.toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: {
            languages: alternates,
          },
        });
      });
    }
  } catch {
    // DB might not be available during build — skip dynamic posts
  }

  return routes;
}
