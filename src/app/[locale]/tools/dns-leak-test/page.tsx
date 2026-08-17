import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DnsLeakEditorialPage } from "@/components/editorial/dns-leak-editorial-page";
import {
  getDnsLeakCopy,
  isDnsLeakLocaleFullyLocalized,
} from "@/data/dns-leak-test";
import { BASE_URL, OG_LOCALE_MAP } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const PATH = "/tools/dns-leak-test";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isLocalized = isDnsLeakLocaleFullyLocalized(locale);
  const copy = getDnsLeakCopy(locale);
  const canonical = isLocalized
    ? localizedUrl(copy.locale)
    : localizedUrl("en");
  const languages = {
    "x-default": localizedUrl("en"),
    en: localizedUrl("en"),
    nl: localizedUrl("nl"),
  };

  return {
    title: { absolute: copy.metadata.title },
    description: copy.metadata.description,
    alternates: {
      canonical,
      ...(isLocalized ? { languages } : {}),
    },
    // The content and route check are useful, but this URL stays out of the
    // index until a real resolver-probe backend replaces the public-IP route.
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.metadata.title,
      description: copy.metadata.description,
      locale: OG_LOCALE_MAP[copy.locale],
      images: [
        {
          url: `${BASE_URL}${PATH}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: copy.metadata.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.description,
      images: [`${BASE_URL}${PATH}/opengraph-image`],
    },
  };
}

export default async function DnsLeakTestPage({ params }: Props) {
  const { locale } = await params;

  if (!isDnsLeakLocaleFullyLocalized(locale)) {
    permanentRedirect(`/en${PATH}`);
  }

  setRequestLocale(locale);
  const copy = getDnsLeakCopy(locale);

  return <DnsLeakEditorialPage copy={copy} />;
}
