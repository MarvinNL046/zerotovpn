import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { ProtocolsEditorialPage } from "@/components/editorial/protocols-editorial-page";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";
import { getAllVpns } from "@/lib/vpn-data-layer";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/guides/vpn-protocols-explained";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function VpnProtocolsExplainedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "en") {
    return <ProtocolsEditorialPage vpns={await getAllVpns()} />;
  }
  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path={PATH}
      kind="guide"
      sectionHref="/guides"
    />
  );
}
