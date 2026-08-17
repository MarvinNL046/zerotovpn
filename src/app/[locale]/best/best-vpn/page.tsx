import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BestVpnRoundupPage } from "@/components/best/best-vpn-roundup-page";
import {
  getBestVpnRoundupCopy,
  isBestVpnRoundupLocale,
} from "@/data/best-vpn-roundup";
import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  OG_LOCALE_MAP,
  titelMetMerk,
} from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/best/best-vpn";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const supported = isBestVpnRoundupLocale(locale);
  const copy = getBestVpnRoundupCopy(locale);
  const canonical = localizedUrl(supported ? locale : "en");
  const title = titelMetMerk(copy.meta.title);

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: title },
    description: copy.meta.description,
    alternates: {
      canonical,
      ...(supported
        ? {
            languages: {
              en: localizedUrl("en"),
              nl: localizedUrl("nl"),
              "x-default": localizedUrl("en"),
            },
          }
        : {}),
    },
    robots: supported
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "article",
      siteName: "ZeroToVPN",
      url: canonical,
      locale: OG_LOCALE_MAP[supported ? locale : "en"] ?? "en_US",
      title,
      description: copy.meta.description,
      images: [{ ...DEFAULT_OG_IMAGE, alt: copy.hero.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.meta.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function BestVpnPage({ params }: Props) {
  const { locale } = await params;
  if (!isBestVpnRoundupLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  return <BestVpnRoundupPage copy={getBestVpnRoundupCopy(locale)} />;
}
