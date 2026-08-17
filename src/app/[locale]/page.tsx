import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "next/navigation";
import { EditorialHomepage } from "@/components/home/editorial-homepage";
import { getHomepageEditorialCopy } from "@/data/homepage";
import { getFeaturedVpns } from "@/lib/vpn-data-layer";
import { OG_LOCALE_MAP } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";
const HOMEPAGE_RESEARCH_REVIEWED_AT = new Date("2026-08-17T00:00:00.000Z");

const titles: Record<string, string> = {
  en: "ZeroToVPN: Clear VPN Guides, Reviews & Tools",
  nl: "ZeroToVPN: duidelijke VPN-gidsen, reviews en tools",
};

const descriptions: Record<string, string> = {
  en: "Compare VPN evidence, read plain-language guides and use free browser tools. ZeroToVPN shows sources, dates and limits instead of mystery scores.",
  nl: "Vergelijk VPN-bewijs, lees duidelijke gidsen en gebruik gratis browsertools. ZeroToVPN toont bronnen, datums en grenzen in plaats van vage scores.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const contentLocale = locale === "nl" ? "nl" : "en";
  const canonicalUrl = contentLocale === "en" ? baseUrl : `${baseUrl}/nl`;
  const title = titles[contentLocale];
  const description = descriptions[contentLocale];

  const languages: Record<string, string> = {
    "x-default": baseUrl,
    en: baseUrl,
    nl: `${baseUrl}/nl`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    robots:
      locale === "en" || locale === "nl"
        ? { index: true, follow: true }
        : { index: false, follow: true },
    alternates: { canonical: canonicalUrl, languages },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "ZeroToVPN",
      locale: OG_LOCALE_MAP[contentLocale] ?? "en_US",
      images: [
        {
          url: "/images/home/og-homepage.webp",
          width: 1200,
          height: 630,
          alt: getHomepageEditorialCopy(contentLocale).lead.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/home/og-homepage.webp"],
    },
  };
}
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "nl") permanentRedirect("/en");
  setRequestLocale(locale);

  const featuredVpns = await getFeaturedVpns();
  const shortlist = featuredVpns
    .filter((vpn) => ["nordvpn", "surfshark", "protonvpn"].includes(vpn.slug))
    .toSorted((a, b) => a.name.localeCompare(b.name, locale));
  const copy = getHomepageEditorialCopy(locale);
  const currentReview = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(HOMEPAGE_RESEARCH_REVIEWED_AT);

  return (
    <EditorialHomepage
      currentReview={currentReview}
      featuredVpns={shortlist}
      copy={copy}
      locale={locale}
    />
  );
}
