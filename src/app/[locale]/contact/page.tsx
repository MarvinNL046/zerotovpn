import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ContactPageView } from "@/components/trust/contact-page";
import { getContactPageCopy, isContactLocale } from "@/data/contact-page";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/contact";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isContactLocale(locale);
  const copy = getContactPageCopy(locale);
  const canonical = localizedUrl(localized ? locale : "en");
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
      locale: OG_LOCALE_MAP[localized ? locale : "en"] ?? "en_US",
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isContactLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);

  const copy = getContactPageCopy(locale);
  const canonical = localizedUrl(locale);
  const home = `${BASE_URL}${locale === "en" ? "" : `/${locale}`}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: copy.meta.title,
      description: copy.meta.description,
      url: canonical,
      inLanguage: locale,
      mainEntity: {
        "@type": "Organization",
        name: "ZeroToVPN",
        url: BASE_URL,
        email: "hello@zerotovpn.com",
      },
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
      <ContactPageView copy={copy} />
    </>
  );
}
