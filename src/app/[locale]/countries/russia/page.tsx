import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegacyCountryEvidencePage } from "@/components/countries/legacy-country-evidence-page";
import { RussiaVpnEditorialPage } from "@/components/editorial/russia-vpn-editorial-page";
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

const slug = "russia";
const fallbackName = "Russia";
const title =
  "VPN for Russia 2026: Obfuscation, Setup & What to Verify | ZeroToVPN";
const description =
  "Compare VPN options for Russia by obfuscation, app access and privacy evidence. Prepare before travel and test your ISP, device and protocol—no permanent access guarantee.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    return createLegacyCountryEvidenceMetadata(locale, slug, fallbackName);
  }

  return {
    metadataBase: new URL("https://www.zerotovpn.com"),
    title: { absolute: titelMetMerk(title.replace(" | ZeroToVPN", "")) },
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

export default async function RussiaVpnPage({ params }: Props) {
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

  return <RussiaVpnEditorialPage vpns={await getAllVpns()} />;
}
