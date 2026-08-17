import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { GuidesDirectoryPage } from "@/components/guides/guides-directory-page";
import {
  getGuidesDirectoryCopy,
  type GuidesLocale,
} from "@/data/guides-directory";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://www.zerotovpn.com";
const supportedLocales = new Set<GuidesLocale>(["en", "nl"]);

function isGuidesLocale(locale: string): locale is GuidesLocale {
  return supportedLocales.has(locale as GuidesLocale);
}

function localizedPath(locale: GuidesLocale) {
  return `${locale === "nl" ? "/nl" : ""}/guides`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isGuidesLocale(locale)) {
    const copy = getGuidesDirectoryCopy("en");
    return {
      metadataBase: new URL(BASE_URL),
      title: { absolute: copy.meta.title },
      description: copy.meta.description,
      robots: { index: false, follow: true },
      alternates: { canonical: `${BASE_URL}/guides` },
    };
  }

  const copy = getGuidesDirectoryCopy(locale);
  const canonicalPath = localizedPath(locale);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: copy.meta.title },
    description: copy.meta.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/guides`,
        nl: `${BASE_URL}/nl/guides`,
        "x-default": `${BASE_URL}/guides`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      locale: locale === "nl" ? "nl_NL" : "en_US",
      title: copy.meta.title,
      description: copy.meta.description,
      siteName: "ZeroToVPN",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;

  if (!isGuidesLocale(locale)) {
    permanentRedirect("/en/guides");
  }

  setRequestLocale(locale);
  return <GuidesDirectoryPage copy={getGuidesDirectoryCopy(locale)} />;
}
