import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";

import { EvidenceFirstRoutePage } from "@/components/editorial/evidence-first-route-page";
import { NordvpnSurfsharkComparisonPage } from "@/components/editorial/nordvpn-surfshark-comparison-page";
import {
  ProtonAirvpnComparisonEditorialPage,
  protonAirvpnComparisonDescription,
  protonAirvpnComparisonTitle,
} from "@/components/editorial/proton-airvpn-comparison-editorial-page";
import {
  getNordvpnSurfsharkCopy,
  isIndexableNordvpnSurfsharkLocale,
  NORDVPN_SURFSHARK_SLUG,
} from "@/data/nordvpn-surfshark-comparison";
import { routing } from "@/i18n/routing";
import { createEvidenceFirstMetadata } from "@/lib/evidence-first-route";
import { LINKED_COMPARISONS } from "@/lib/linked-comparisons";
import { OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";
import { getVpnBySlug } from "@/lib/vpn-data-layer";

type Props = {
  params: Promise<{ locale: string; comparison: string }>;
};

const baseUrl = "https://www.zerotovpn.com";
const REVERSED_NORDVPN_SURFSHARK_SLUG = "surfshark-vs-nordvpn";
const PROTONVPN_AIRVPN_SLUG = "protonvpn-vs-airvpn";

export const revalidate = 86400;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LINKED_COMPARISONS.map((comparison) => ({ locale, comparison })),
  );
}

function parseComparisonSlug(
  comparison: string,
): { slug1: string; slug2: string } | null {
  const parts = comparison.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }

  return { slug1: parts[0], slug2: parts[1] };
}

function getFallbackCopy(vpn1Name: string, vpn2Name: string, locale: string) {
  if (locale === "nl") {
    return {
      title: `${vpn1Name} en ${vpn2Name}: bewijscontrole voor de vergelijking`,
      description: `We controleren de bronnen voor deze vergelijking opnieuw. Tot dat klaar is, wijzen we geen winnaar aan en tonen we geen actuele prijs, score of prestatiebelofte.`,
      subject: `de verschillen tussen ${vpn1Name} en ${vpn2Name}`,
      sectionLabel: "VPN's vergelijken",
      notes: [
        "Vergelijk functies altijd voor jouw apparaat, abonnement en locatie.",
      ],
    };
  }

  return {
    title: `${vpn1Name} and ${vpn2Name}: comparison evidence check`,
    description:
      "We are rechecking the sources for this comparison. Until that work is complete, we do not name a winner or publish a current price, score or performance promise.",
    subject: `the differences between ${vpn1Name} and ${vpn2Name}`,
    sectionLabel: "Compare VPNs",
    notes: ["Always compare features for your own device, plan and location."],
  };
}

function nordvpnSurfsharkMetadata(
  locale: string,
  comparison: string,
): Metadata {
  const copy = getNordvpnSurfsharkCopy(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/compare/${NORDVPN_SURFSHARK_SLUG}`;
  const languages = {
    en: `${baseUrl}/compare/${NORDVPN_SURFSHARK_SLUG}`,
    nl: `${baseUrl}/nl/compare/${NORDVPN_SURFSHARK_SLUG}`,
    "x-default": `${baseUrl}/compare/${NORDVPN_SURFSHARK_SLUG}`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: titelMetMerk(copy.metadata.title) },
    description: copy.metadata.description,
    alternates: { canonical: canonicalUrl, languages },
    robots: {
      index:
        comparison === NORDVPN_SURFSHARK_SLUG &&
        isIndexableNordvpnSurfsharkLocale(locale),
      follow: true,
    },
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: copy.metadata.title,
      description: copy.metadata.description,
      url: canonicalUrl,
      type: "article",
      siteName: "ZeroToVPN",
      images: [
        {
          url: `${canonicalUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: copy.metadata.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.description,
      images: [`${canonicalUrl}/opengraph-image`],
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, comparison } = await params;

  if (comparison === REVERSED_NORDVPN_SURFSHARK_SLUG) {
    return nordvpnSurfsharkMetadata(locale, comparison);
  }

  if (comparison === NORDVPN_SURFSHARK_SLUG) {
    if (isIndexableNordvpnSurfsharkLocale(locale)) {
      return nordvpnSurfsharkMetadata(locale, comparison);
    }

    const copy = getFallbackCopy("NordVPN", "Surfshark", locale);
    return createEvidenceFirstMetadata({
      locale,
      path: `/compare/${comparison}`,
      title: copy.title,
      description: copy.description,
    });
  }

  const slugs = parseComparisonSlug(comparison);
  if (!slugs || slugs.slug1 === slugs.slug2) {
    notFound();
  }

  const [vpn1, vpn2] = await Promise.all([
    getVpnBySlug(slugs.slug1),
    getVpnBySlug(slugs.slug2),
  ]);

  if (!vpn1 || !vpn2) {
    notFound();
  }

  if (locale === "en" && comparison === PROTONVPN_AIRVPN_SLUG) {
    const canonicalUrl = `${baseUrl}/compare/${comparison}`;

    return {
      metadataBase: new URL(baseUrl),
      title: { absolute: titelMetMerk(protonAirvpnComparisonTitle) },
      description: protonAirvpnComparisonDescription,
      alternates: { canonical: canonicalUrl },
      robots: { index: false, follow: true },
      openGraph: {
        locale: "en_US",
        title: protonAirvpnComparisonTitle,
        description: protonAirvpnComparisonDescription,
        url: canonicalUrl,
        type: "article",
        siteName: "ZeroToVPN",
        images: [
          {
            url: `${baseUrl}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: "Proton VPN and AirVPN comparison",
          },
        ],
      },
    };
  }

  const copy = getFallbackCopy(vpn1.name, vpn2.name, locale);
  return createEvidenceFirstMetadata({
    locale,
    path: `/compare/${comparison}`,
    title: copy.title,
    description: copy.description,
  });
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, comparison } = await params;
  setRequestLocale(locale);

  if (comparison === REVERSED_NORDVPN_SURFSHARK_SLUG) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    permanentRedirect(`${prefix}/compare/${NORDVPN_SURFSHARK_SLUG}`);
  }

  if (
    comparison === NORDVPN_SURFSHARK_SLUG &&
    isIndexableNordvpnSurfsharkLocale(locale)
  ) {
    return <NordvpnSurfsharkComparisonPage locale={locale} />;
  }

  const slugs = parseComparisonSlug(comparison);
  if (!slugs || slugs.slug1 === slugs.slug2) {
    notFound();
  }

  const [vpn1, vpn2] = await Promise.all([
    getVpnBySlug(slugs.slug1),
    getVpnBySlug(slugs.slug2),
  ]);

  if (!vpn1 || !vpn2) {
    notFound();
  }

  if (locale === "en" && comparison === PROTONVPN_AIRVPN_SLUG) {
    return <ProtonAirvpnComparisonEditorialPage />;
  }

  const copy = getFallbackCopy(vpn1.name, vpn2.name, locale);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind="comparison"
      title={copy.title}
      description={copy.description}
      subject={copy.subject}
      sectionHref="/compare"
      sectionLabel={copy.sectionLabel}
      notes={copy.notes}
    />
  );
}
