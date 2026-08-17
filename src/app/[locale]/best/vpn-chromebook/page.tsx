import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ChromebookVpnEditorialPage } from "@/components/editorial/chromebook-vpn-editorial-page";
import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import {
  createStaticEvidenceFirstMetadata,
  createStaticPublishedMetadata,
} from "@/lib/evidence-first-static-route";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/best/vpn-chromebook";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? createStaticPublishedMetadata(PATH)
    : createStaticEvidenceFirstMetadata(PATH, locale);
}

export default async function ChromebookVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "en") return <ChromebookVpnEditorialPage />;
  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path={PATH}
      kind="roundup"
      sectionHref="/best/best-vpn"
    />
  );
}
