import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  AirVpnReviewEditorialPage,
  airvpnReviewDescription,
  airvpnReviewTitle,
} from "@/components/editorial/airvpn-review-editorial-page";
import { EvidenceFirstRoutePage } from "@/components/editorial/evidence-first-route-page";
import {
  getNordVpnReviewMetadataCopy,
  NordVpnReviewEditorialPage,
} from "@/components/editorial/nordvpn-review-editorial-page";
import {
  ProtonVpnReviewEditorialPage,
  protonvpnReviewDescription,
  protonvpnReviewTitle,
} from "@/components/editorial/protonvpn-review-editorial-page";
import {
  SurfsharkReviewEditorialPage,
  surfsharkReviewDescription,
  surfsharkReviewTitle,
} from "@/components/editorial/surfshark-review-editorial-page";
import {
  UrbanVpnReviewEditorialPage,
  urbanVpnReviewDescription,
  urbanVpnReviewTitle,
} from "@/components/editorial/urban-vpn-review-editorial-page";
import { routing } from "@/i18n/routing";
import { createEvidenceFirstMetadata } from "@/lib/evidence-first-route";
import {
  getIndexableReviewLocales,
  isIndexableReviewRoute,
} from "@/lib/review-route-policy";
import { OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";
import { getAllVpns, getVpnBySlug } from "@/lib/vpn-data-layer";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type ReviewedReview = {
  title: string;
  description: string;
  image?: string;
  twitterImage?: string;
  imageAlt: string;
};

const baseUrl = "https://www.zerotovpn.com";

export const revalidate = 86400;

export async function generateStaticParams() {
  const vpns = await getAllVpns();

  return routing.locales.flatMap((locale) =>
    vpns.map((vpn) => ({ locale, slug: vpn.slug })),
  );
}

function getFallbackCopy(vpnName: string, locale: string) {
  if (locale === "nl") {
    return {
      title: `${vpnName}-review: bewijscontrole loopt`,
      description: `We controleren de bronnen en praktijktests voor ${vpnName} opnieuw. Tot die controle klaar is, tonen we geen actuele score, prijs of aanbeveling.`,
      subject: `${vpnName} en de huidige productclaims`,
      sectionLabel: "VPN-reviews",
      notes: [
        "Er worden op deze route geen prijs, korting, score of prestatiebelofte gepubliceerd.",
      ],
    };
  }

  return {
    title: `${vpnName} review: evidence check in progress`,
    description: `We are rechecking the sources and hands-on evidence for ${vpnName}. Until that review is complete, this page does not publish a current score, price or recommendation.`,
    subject: `${vpnName} and its current product claims`,
    sectionLabel: "VPN reviews",
    notes: [
      "This route does not publish a price, discount, score or performance promise while review is pending.",
    ],
  };
}

function getReviewedReview(
  slug: string,
  locale: string,
): ReviewedReview | null {
  if (!isIndexableReviewRoute(slug, locale)) {
    return null;
  }

  if (slug === "nordvpn") {
    const copy = getNordVpnReviewMetadataCopy(locale);

    return {
      title: copy.metaTitle,
      description: copy.metaDescription,
      image: "/images/reviews/nordvpn/editorial-review-og-v1.webp",
      twitterImage: "/images/reviews/nordvpn/editorial-review-twitter-v1.webp",
      imageAlt:
        locale === "nl"
          ? "ZeroToVPN-redactionele NordVPN-reviewillustratie met een laptop en telefoon met een generieke VPN-interface"
          : "ZeroToVPN editorial NordVPN review artwork showing a laptop and phone with a generic VPN interface",
    };
  }

  if (locale !== "en") {
    return null;
  }

  switch (slug) {
    case "protonvpn":
      return {
        title: protonvpnReviewTitle,
        description: protonvpnReviewDescription,
        imageAlt: "Proton VPN review",
      };
    case "urban-vpn":
      return {
        title: urbanVpnReviewTitle,
        description: urbanVpnReviewDescription,
        imageAlt: "Urban VPN review",
      };
    case "surfshark":
      return {
        title: surfsharkReviewTitle,
        description: surfsharkReviewDescription,
        imageAlt: "Surfshark review",
      };
    case "airvpn":
      return {
        title: airvpnReviewTitle,
        description: airvpnReviewDescription,
        imageAlt: "AirVPN review",
      };
    default:
      return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const vpn = await getVpnBySlug(slug);

  if (!vpn) {
    notFound();
  }

  const reviewed = getReviewedReview(vpn.slug, locale);
  if (!reviewed) {
    const copy = getFallbackCopy(vpn.name, locale);

    return createEvidenceFirstMetadata({
      locale,
      path: `/reviews/${vpn.slug}`,
      title: copy.title,
      description: copy.description,
    });
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews/${vpn.slug}`;
  const indexableLocales = getIndexableReviewLocales(vpn.slug) ?? [];
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/reviews/${vpn.slug}`,
  };

  for (const supportedLocale of indexableLocales) {
    const supportedPrefix =
      supportedLocale === "en" ? "" : `/${supportedLocale}`;
    languages[supportedLocale] =
      `${baseUrl}${supportedPrefix}/reviews/${vpn.slug}`;
  }

  const image = reviewed.image ?? (vpn.ogImage ? `${vpn.ogImage}` : undefined);

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: titelMetMerk(reviewed.title) },
    description: reviewed.description,
    alternates: { canonical: canonicalUrl, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title: reviewed.title,
      description: reviewed.description,
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      type: "article",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: reviewed.imageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: reviewed.title,
      description: reviewed.description,
      images: reviewed.twitterImage
        ? [reviewed.twitterImage]
        : image
          ? [image]
          : undefined,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vpn = await getVpnBySlug(slug);
  if (!vpn) {
    notFound();
  }

  const reviewed = getReviewedReview(vpn.slug, locale);

  if (reviewed && vpn.slug === "nordvpn") {
    return <NordVpnReviewEditorialPage locale={locale} />;
  }
  if (reviewed && vpn.slug === "protonvpn") {
    return <ProtonVpnReviewEditorialPage />;
  }
  if (reviewed && vpn.slug === "urban-vpn") {
    return <UrbanVpnReviewEditorialPage />;
  }
  if (reviewed && vpn.slug === "surfshark") {
    return <SurfsharkReviewEditorialPage />;
  }
  if (reviewed && vpn.slug === "airvpn") {
    return <AirVpnReviewEditorialPage />;
  }

  const copy = getFallbackCopy(vpn.name, locale);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind="review"
      title={copy.title}
      description={copy.description}
      subject={copy.subject}
      sectionHref="/reviews"
      sectionLabel={copy.sectionLabel}
      notes={copy.notes}
    />
  );
}
