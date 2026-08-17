import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { createStaticEvidenceFirstMetadata } from "@/lib/evidence-first-static-route";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/guides/vpn-for-torrenting";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return createStaticEvidenceFirstMetadata(PATH, (await params).locale);
}

export default async function VpnForTorrentingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path={PATH}
      kind="guide"
      sectionHref="/guides"
    />
  );
}
