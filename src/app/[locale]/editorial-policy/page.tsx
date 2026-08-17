import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { EditorialPolicyPageView } from "@/components/trust/editorial-policy-page";
import {
  getEditorialPolicyPageCopy,
  isEditorialPolicyLocale,
} from "@/data/editorial-policy-page";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/editorial-policy";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isEditorialPolicyLocale(locale);
  const copy = getEditorialPolicyPageCopy(locale);
  const canonical = localizedUrl(localized ? locale : "en");
  const title = titelMetMerk(copy.meta.title);
  const image = `${canonical}/opengraph-image`;
  const aboutUrl = `${BASE_URL}${localized && locale === "nl" ? "/nl" : ""}/about`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: title },
    description: copy.meta.description,
    authors: [{ name: "ZeroToVPN editorial team", url: aboutUrl }],
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
      locale: OG_LOCALE_MAP[localized ? locale : "en"] ?? "en_US",
      title,
      description: copy.meta.description,
      modifiedTime: "2026-08-16T00:00:00.000Z",
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

export default async function EditorialPolicyPage({ params }: Props) {
  const { locale } = await params;
  if (!isEditorialPolicyLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  const copy = getEditorialPolicyPageCopy(locale);
  const canonical = localizedUrl(locale);
  const home = `${BASE_URL}${locale === "en" ? "" : `/${locale}`}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: locale,
        dateModified: "2026-08-16",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${BASE_URL}#website`,
          name: "ZeroToVPN",
          url: BASE_URL,
        },
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: copy.hero.title,
        description: copy.meta.description,
        inLanguage: locale,
        dateModified: "2026-08-16",
        mainEntityOfPage: { "@id": `${canonical}#webpage` },
        author: {
          "@type": "Organization",
          name: "ZeroToVPN editorial team",
          url: `${home}/about`,
        },
        publisher: {
          "@type": "Organization",
          name: "ZeroToVPN",
          url: BASE_URL,
        },
      },
      {
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
            name: copy.breadcrumb.current,
            item: canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialPolicyPageView copy={copy} />
    </>
  );
}
