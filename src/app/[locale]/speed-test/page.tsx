import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SpeedTestEditorialPage } from "@/components/editorial/speed-test-editorial-page";
import { getSpeedTestCopy, isSpeedTestLocale } from "@/data/speed-test";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

function speedTestAlternates(locale: string) {
  const canonical =
    locale === "nl" ? `${BASE_URL}/nl/speed-test` : `${BASE_URL}/speed-test`;
  return {
    canonical,
    languages: {
      en: `${BASE_URL}/speed-test`,
      nl: `${BASE_URL}/nl/speed-test`,
      "x-default": `${BASE_URL}/speed-test`,
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getSpeedTestCopy(locale);
  const localized = isSpeedTestLocale(locale);
  const canonical =
    locale === "nl" ? `${BASE_URL}/nl/speed-test` : `${BASE_URL}/speed-test`;
  const image = `${BASE_URL}/speed-test/opengraph-image`;
  const title = titelMetMerk(copy.metadata.title);

  return {
    title: { absolute: title },
    description: copy.metadata.description,
    metadataBase: new URL(BASE_URL),
    alternates: speedTestAlternates(localized ? locale : "en"),
    robots: localized
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "ZeroToVPN",
      locale: OG_LOCALE_MAP[localized ? locale : "en"] ?? "en_US",
      title,
      description: copy.metadata.description,
      url: localized ? canonical : `${BASE_URL}/speed-test`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "ZeroToVPN internet speed test with blank download, upload and response-time readings",
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

export default async function SpeedTestPage({ params }: Props) {
  const { locale } = await params;
  if (!isSpeedTestLocale(locale)) permanentRedirect("/en/speed-test");
  setRequestLocale(locale);
  return <SpeedTestEditorialPage copy={getSpeedTestCopy(locale)} />;
}
