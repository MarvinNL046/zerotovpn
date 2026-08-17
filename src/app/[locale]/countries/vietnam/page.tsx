import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegacyCountryEvidencePage } from "@/components/countries/legacy-country-evidence-page";
import { VietnamVpnEditorialPage } from "@/components/editorial/vietnam-vpn-editorial-page";
import { createLegacyCountryEvidenceMetadata } from "@/lib/legacy-country-evidence";
import { getAllVpns } from "@/lib/vpn-data-layer";
import {
  DEFAULT_OG_IMAGE,
  generateAlternates,
  titelMetMerk,
} from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const slug = "vietnam";
const fallbackName = "Vietnam";
const title =
  "VPN for Vietnam 2026: What to Verify Before You Connect | ZeroToVPN";
const description =
  "Evidence-led Vietnam VPN guidance covering network conditions, preparation, provider features, legal uncertainty and a repeatable device/ISP test plan.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    return createLegacyCountryEvidenceMetadata(locale, slug, fallbackName);
  }

  return {
    metadataBase: new URL("https://www.zerotovpn.com"),
    title: { absolute: titelMetMerk(title) },
    description,
    openGraph: {
      locale: "en_US",
      title,
      description,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: generateAlternates(`/countries/${slug}`, locale),
  };
}

export default async function VietnamVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale !== "en") {
    return (
      <LegacyCountryEvidencePage
        locale={locale}
        slug={slug}
        fallbackName={fallbackName}
      />
    );
  }

  return <VietnamVpnEditorialPage vpns={await getAllVpns()} />;
}
