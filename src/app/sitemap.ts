import { MetadataRoute } from "next";
import { getAllVpns } from "@/lib/vpn-data";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zerotovpn.com";
  const vpns = getAllVpns();
  const locales = routing.locales;
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: locale === "en" ? baseUrl : `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
        ),
      },
    });
  });

  // Reviews index for each locale
  locales.forEach((locale) => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    routes.push({
      url: `${baseUrl}${prefix}/reviews`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Individual VPN reviews for each locale
  vpns.forEach((vpn) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      routes.push({
        url: `${baseUrl}${prefix}/reviews/${vpn.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  // Static pages for each locale
  const staticPages = [
    { path: "/best/best-vpn", priority: 0.9 },
    { path: "/best/best-free-vpn", priority: 0.8 },
    { path: "/best/best-vpn-streaming", priority: 0.8 },
    { path: "/guides/what-is-vpn", priority: 0.7 },
    { path: "/compare", priority: 0.8 },
  ];

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      routes.push({
        url: `${baseUrl}${prefix}${page.path}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: page.priority,
      });
    });
  });

  return routes;
}
