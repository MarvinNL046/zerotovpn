import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import {
  WindowsVpnEditorialPage,
  windowsVpnEditorialDescription,
  windowsVpnEditorialTitle,
} from "@/components/editorial/windows-vpn-editorial-page";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";
import { BASE_URL } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/best/vpn-windows";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function WindowsVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") {
    return (
      <>
        <ArticleJsonLd
          title={windowsVpnEditorialTitle}
          description={windowsVpnEditorialDescription}
          url={`${BASE_URL}${PATH}`}
          datePublished="2026-01-01"
          dateModified="2026-08-13"
        />
        <WindowsVpnEditorialPage />
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
