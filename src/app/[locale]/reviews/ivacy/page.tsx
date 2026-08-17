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
      title: "Ivacy-review: bewijscontrole loopt",
      description:
        "We controleren de bronnen en actuele productinformatie voor Ivacy opnieuw. Tot die controle klaar is, tonen we geen score, prijs of aanbeveling.",
      subject: "Ivacy en de huidige productclaims",
      sectionLabel: "VPN-reviews",
      notes: [
        "Ivacy en IVPN zijn verschillende aanbieders; deze URL verwijst daarom niet langer door naar een IVPN-review.",
      ],
    };
  }

  return {
    title: "Ivacy review: evidence check in progress",
    description:
      "We are rechecking the sources and current product information for Ivacy. Until that review is complete, this page does not publish a score, price or recommendation.",
    subject: "Ivacy and its current product claims",
    sectionLabel: "VPN reviews",
    notes: [
      "Ivacy and IVPN are different providers, so this URL no longer redirects to an IVPN review.",
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);

  return createEvidenceFirstMetadata({
    locale,
    path: "/reviews/ivacy",
    title: copy.title,
    description: copy.description,
  });
}

export default async function IvacyReviewPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = getCopy(locale);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind="review"
      title={copy.title}
      description={copy.description}
      subject={copy.subject}
      sectionHref="/reviews"
      sectionLabel={copy.sectionLabel}
      notes={copy.notes}
    />
  );
}
