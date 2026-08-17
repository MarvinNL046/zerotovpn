import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AboutPageView } from "@/components/trust/about-page";
import { getAboutPageCopy, isAboutLocale } from "@/data/about-page";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/about";
const UPDATED_AT = "2026-08-16";

function localizedUrl(locale: string, path = PATH) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${path}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isAboutLocale(locale);
  const pageLocale = localized ? locale : "en";
  const copy = getAboutPageCopy(pageLocale);
  const canonical = localizedUrl(pageLocale);
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
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "ZeroToVPN",
      url: canonical,
      locale: OG_LOCALE_MAP[pageLocale] ?? "en_US",
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isAboutLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  const copy = getAboutPageCopy(locale);
  const canonical = localizedUrl(locale);
  const home = localizedUrl(locale, "");
  const authorUrl = localizedUrl(locale, "/authors/marvin-smit");
  const organizationId = `${BASE_URL}/#organization`;
  const personId = `${BASE_URL}/authors/marvin-smit#person`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "ZeroToVPN",
        url: BASE_URL,
        email: "hello@zerotovpn.com",
        founder: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Marvin Smit",
        url: authorUrl,
        image: `${BASE_URL}/images/team/marvin.webp`,
        jobTitle: copy.founder.role,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "AboutPage",
        "@id": `${canonical}#aboutpage`,
        url: canonical,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: locale,
        dateModified: UPDATED_AT,
        about: [{ "@id": organizationId }, { "@id": personId }],
        mainEntity: { "@id": organizationId },
        publisher: { "@id": organizationId },
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
      <AboutPageView copy={copy} />
    </>
  );
}
