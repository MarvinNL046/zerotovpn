import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ToolsHubEditorialPage } from "@/components/editorial/tools-hub-editorial-page";
import { getToolsHubCopy, isToolsHubLocale } from "@/data/tools-hub";
import { BASE_URL, OG_LOCALE_MAP, titelMetMerk } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/tools";

function localizedUrl(locale: string) {
  return `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localized = isToolsHubLocale(locale);
  const copy = getToolsHubCopy(locale);
  const canonical = localizedUrl(localized ? locale : "en");
  const title = titelMetMerk(copy.metadata.title);
  const image = `${BASE_URL}${PATH}/opengraph-image`;

  return {
    title: { absolute: title },
    description: copy.metadata.description,
    metadataBase: new URL(BASE_URL),
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
      description: copy.metadata.description,
      images: [
        { url: image, width: 1200, height: 630, alt: copy.metadata.ogAlt },
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

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  if (!isToolsHubLocale(locale)) permanentRedirect(`/en${PATH}`);
  setRequestLocale(locale);
  return <ToolsHubEditorialPage copy={getToolsHubCopy(locale)} />;
}
