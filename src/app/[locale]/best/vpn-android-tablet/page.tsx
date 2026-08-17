import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AndroidTabletEditorialPage,
  androidTabletEditorialDescription,
  androidTabletEditorialTitle,
} from "@/components/editorial/android-tablet-editorial-page";
import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";
import { BASE_URL } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/best/vpn-android-tablet";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function AndroidTabletVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") {
    return (
      <>
        <ArticleJsonLd
          title={androidTabletEditorialTitle}
          description={androidTabletEditorialDescription}
          url={`${BASE_URL}${PATH}`}
          datePublished="2026-01-01"
          dateModified="2026-08-13"
        />
        <AndroidTabletEditorialPage />
      </>
    );
  }

  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path={PATH}
      kind="roundup"
      sectionHref="/best/best-vpn"
    />
  );
}
