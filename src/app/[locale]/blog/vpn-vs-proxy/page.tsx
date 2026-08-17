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
      title: "VPN of proxy? Bewijscontrole voor de uitleg",
      description:
        "We controleren deze technische vergelijking opnieuw. Tot dat klaar is, publiceren we geen algemene privacy-, beveiligings- of snelheidsbelofte voor VPN's of proxy's.",
      subject: "de technische verschillen tussen een VPN en een proxy",
      sectionLabel: "Blog",
      notes: [
        "Het werkelijke gedrag hangt af van het protocol, de configuratie, de app en de beheerder van de dienst.",
      ],
    };
  }

  return {
    title: "VPN or proxy? Explanation under evidence review",
    description:
      "We are rechecking this technical comparison. Until that work is complete, we do not make a general privacy, security or speed promise for VPNs or proxies.",
    subject: "the technical differences between a VPN and a proxy",
    sectionLabel: "Blog",
    notes: [
      "Actual behavior depends on the protocol, configuration, app and service operator.",
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);

  return createEvidenceFirstMetadata({
    locale,
    path: "/blog/vpn-vs-proxy",
    title: copy.title,
    description: copy.description,
  });
}

export default async function VpnVsProxyPage({ params }: Props) {
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
