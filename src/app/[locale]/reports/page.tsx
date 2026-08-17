import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ReportsHubPage } from "@/components/reports/reports-hub-page";
import { getReportsHubCopy, isReportsHubLocale } from "@/data/reports-hub";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/reports";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isReportsHubLocale(locale);
  const contentLocale = localized ? locale : "en";
  const copy = getReportsHubCopy(contentLocale);
  const canonical = localizedUrl(contentLocale);
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
      type: "website",
      siteName: "ZeroToVPN",
      url: canonical,
      locale: OG_LOCALE_MAP[contentLocale] ?? "en_US",
      title,
      description: copy.meta.description,
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

export default async function ReportsPage({ params }: Props) {
  const { locale } = await params;
  if (!isReportsHubLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  const copy = getReportsHubCopy(locale);
  const canonical = localizedUrl(locale);
  const home = `${BASE_URL}${locale === "en" ? "" : `/${locale}`}`;
  const listId = `${canonical}#research-register-list`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: locale,
        dateModified: "2026-08-16",
        mainEntity: { "@id": listId },
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
        "@type": "ItemList",
        "@id": listId,
        name: copy.register.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: copy.register.items.length,
        itemListElement: copy.register.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Thing",
            name: item.title,
            description: `${item.status}. ${item.summary} ${item.gapLabel}: ${item.gap}`,
          },
        })),
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <ReportsHubPage copy={copy} />
    </>
  );
}
