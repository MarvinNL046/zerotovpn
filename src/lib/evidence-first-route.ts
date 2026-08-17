import type { Metadata } from "next";

import { BASE_URL, titelMetMerk } from "@/lib/seo-utils";

type EvidenceFirstMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

type PublishedRouteMetadataInput = Omit<EvidenceFirstMetadataInput, "locale">;

function localizedPath(locale: string, path: string) {
  return locale === "en" ? path : `/${locale}${path}`;
}

export function createEvidenceFirstMetadata({
  locale,
  path,
  title,
  description,
}: EvidenceFirstMetadataInput): Metadata {
  const canonicalPath = localizedPath(locale, path);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: titelMetMerk(title) },
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "ZeroToVPN",
      images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon-512.png"],
    },
  };
}

/** Metadata for the retained English V2 branch of a hybrid route. */
export function createPublishedRouteMetadata({
  path,
  title,
  description,
}: PublishedRouteMetadataInput): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: titelMetMerk(title) },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: canonicalUrl, "x-default": canonicalUrl },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      locale: "en_US",
      title,
      description,
      siteName: "ZeroToVPN",
      images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon-512.png"],
    },
  };
}
