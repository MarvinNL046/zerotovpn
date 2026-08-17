import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ReviewsDirectoryPage } from "@/components/editorial/reviews-directory-page";
import {
  getReviewsDirectoryCopy,
  isReviewsDirectoryLocale,
} from "@/data/reviews-directory";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/reviews";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isReviewsDirectoryLocale(locale);
  const copy = getReviewsDirectoryCopy(locale);
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: copy.hero.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.meta.description,
      images: [image],
    },
  };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isReviewsDirectoryLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);
  return <ReviewsDirectoryPage copy={getReviewsDirectoryCopy(locale)} />;
}
