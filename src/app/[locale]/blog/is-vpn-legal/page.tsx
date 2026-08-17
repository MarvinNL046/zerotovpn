import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EvidenceFirstRoutePage } from "@/components/editorial/evidence-first-route-page";
import { createEvidenceFirstMetadata } from "@/lib/evidence-first-route";

type Props = {
  params: Promise<{ locale: string }>;
};

function getCopy(locale: string) {
  if (locale === "nl") {
    return {
      title: "Is een VPN legaal? Bewijscontrole loopt",
      description:
        "VPN-wetgeving en handhaving kunnen per land en moment verschillen. We controleren de primaire bronnen opnieuw en publiceren tot die tijd geen landenlijst als actueel juridisch advies.",
      subject: "de juridische status van VPN-gebruik per land",
      sectionLabel: "Blog",
      notes: [
        "Controleer vóór gebruik de actuele wetgeving en officiële informatie voor het land waarin je bent.",
        "Deze pagina is geen juridisch advies.",
      ],
    };
  }

  return {
    title: "Is a VPN legal? Evidence review in progress",
    description:
      "VPN laws and enforcement can differ by country and change over time. We are rechecking primary sources and do not present a country list as current legal advice while that work is pending.",
    subject: "the legal status of VPN use by country",
    sectionLabel: "Blog",
    notes: [
      "Check current law and official guidance for the country you are in before using a VPN.",
      "This page is not legal advice.",
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);

  return createEvidenceFirstMetadata({
    locale,
    path: "/blog/is-vpn-legal",
    title: copy.title,
    description: copy.description,
  });
}

export default async function VpnLegalityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = getCopy(locale);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind="article"
      title={copy.title}
      description={copy.description}
      subject={copy.subject}
      sectionHref="/blog"
      sectionLabel={copy.sectionLabel}
      notes={copy.notes}
    />
  );
}
