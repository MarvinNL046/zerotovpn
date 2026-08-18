import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { IpCheckerEditorialPage } from "@/components/editorial/ip-checker-editorial-page";
import { getIpCheckerCopy, isIpCheckerLocale } from "@/data/ip-checker";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/tools/what-is-my-ip";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isIpCheckerLocale(locale);
  const copy = getIpCheckerCopy(locale);
  const canonical = localizedUrl(localized ? locale : "en");
  const image = `${BASE_URL}${PATH}/opengraph-image`;
  const title = titelMetMerk(copy.metadata.title);

  return {
    title: { absolute: title },
    description: copy.metadata.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      ...(localized
        ? {
            languages: {
              en: localizedUrl("en"),
              nl: localizedUrl("nl"),
              "x-default": localizedUrl("en"),
            },
          }
        : {}),
    },
    robots: localized
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "ZeroToVPN",
      url: canonical,
      locale: OG_LOCALE_MAP[localized ? locale : "en"] ?? "en_US",
      title,
      description: copy.metadata.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: copy.metadata.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.metadata.description,
      images: [image],
    },
  };
}

export default async function WhatIsMyIpPage({ params }: Props) {
  const { locale } = await params;
  if (!isIpCheckerLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);
  return (
    <IpCheckerEditorialPage
      copy={getIpCheckerCopy(locale)}
      nordAffiliateUrl={getVpnAffiliateUrl("nordvpn")}
    />
  );
}
