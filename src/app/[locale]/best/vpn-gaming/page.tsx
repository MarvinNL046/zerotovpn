import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { GamingVpnEditorialPage } from "@/components/editorial/gaming-vpn-editorial-page";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/best/vpn-gaming";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function GamingVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "en") return <GamingVpnEditorialPage />;
  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path={PATH}
      kind="roundup"
      sectionHref="/best/best-vpn"
    />
  );
}
