import { MetadataRoute } from "next";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";

// Auto-discovered static pages - add new pages here and they'll be in the sitemap
const staticPages = [
  // Main pages (priority 1.0)
  { path: "", priority: 1.0, changeFreq: "weekly" as const },

  // Reviews section (priority 0.9)
  { path: "/reviews", priority: 0.9, changeFreq: "weekly" as const },

  // Best VPN pages (priority 0.9)
  { path: "/best/best-vpn", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/best/free-vpn", priority: 0.85, changeFreq: "weekly" as const },
  { path: "/best/vpn-gaming", priority: 0.85, changeFreq: "weekly" as const },

  // Comparison (priority 0.85)
  { path: "/compare", priority: 0.85, changeFreq: "weekly" as const },

  // Deals (priority 0.85)
  { path: "/deals", priority: 0.85, changeFreq: "daily" as const },

  // Blog section (priority 0.8)
  { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/blog/vpn-black-friday-2025", priority: 0.8, changeFreq: "weekly" as const },
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
      const alternates: Record<string, string> = {};
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
      const alternates: Record<string, string> = {};
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

  return routes;
}
