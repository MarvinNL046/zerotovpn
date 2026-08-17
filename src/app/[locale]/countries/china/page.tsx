import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegacyCountryEvidencePage } from "@/components/countries/legacy-country-evidence-page";
import { ChinaVpnEditorialPage } from "@/components/editorial/china-vpn-editorial-page";
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

const slug = "china";
const fallbackName = "China";
const title =
  "VPN for China in 2026: What to Verify Before You Connect | ZeroToVPN";
const description =
  "China's internet environment is highly restricted and can change by network and date. Compare obfuscation, preparation, legal uncertainty and a bounded VPN test plan.";

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

export default async function ChinaVpnPage({ params }: Props) {
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

  return <ChinaVpnEditorialPage vpns={await getAllVpns()} />;
}
