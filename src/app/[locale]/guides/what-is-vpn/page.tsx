import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { WhatIsVpnGuidePage } from "@/components/guides/what-is-vpn-guide";
import {
  getWhatIsVpnGuideCopy,
  isWhatIsVpnLocale,
} from "@/data/what-is-vpn-guide";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/guides/what-is-vpn";

function localizedUrl(locale: string, path = PATH) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${path}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isWhatIsVpnLocale(locale);
  const selectedLocale = localized ? locale : "en";
  const copy = getWhatIsVpnGuideCopy(selectedLocale);
  const canonical = localizedUrl(selectedLocale);
  const title = titelMetMerk(copy.meta.title);
  const image = `${canonical}/opengraph-image`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: title },
    description: copy.meta.description,
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
      type: "article",
      siteName: "ZeroToVPN",
      url: canonical,
      locale: OG_LOCALE_MAP[selectedLocale] ?? "en_US",
      title,
      description: copy.meta.description,
      modifiedTime: "2026-08-16T00:00:00.000Z",
      authors: ["ZeroToVPN editorial team"],
      images: [{ url: image, width: 1200, height: 630, alt: copy.hero.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.meta.description,
      images: [image],
    },
  };
}

export default async function WhatIsVpnPage({ params }: Props) {
  const { locale } = await params;
  if (!isWhatIsVpnLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  const copy = getWhatIsVpnGuideCopy(locale);
  const canonical = localizedUrl(locale);
  const home = localizedUrl(locale, "");
  const guides = localizedUrl(locale, "/guides");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: canonical,
      headline: copy.hero.title,
      description: copy.meta.description,
      url: canonical,
      inLanguage: locale,
      dateModified: "2026-08-16",
      author: {
        "@type": "Organization",
        name: "ZeroToVPN editorial team",
        url: `${home}/about`,
      },
      editor: {
        "@type": "Person",
        name: "Marvin Smit",
        url: `${home}/authors/marvin-smit`,
      },
      publisher: {
        "@type": "Organization",
        name: "ZeroToVPN",
        url: BASE_URL,
      },
      articleSection: copy.hero.eyebrow,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: copy.breadcrumb.home,
          item: home,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.breadcrumb.guides,
          item: guides,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.breadcrumb.current,
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhatIsVpnGuidePage copy={copy} />
    </>
  );
}
