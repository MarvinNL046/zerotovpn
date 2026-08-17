import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { LaptopVpnEditorialPage } from "@/components/editorial/laptop-vpn-editorial-page";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";
import { getAllVpns } from "@/lib/vpn-data-layer";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/best/vpn-laptops";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function LaptopVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "en") {
    return <LaptopVpnEditorialPage vpns={await getAllVpns()} />;
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
