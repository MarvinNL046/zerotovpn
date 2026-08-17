import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegacyCountryEvidencePage } from "@/components/countries/legacy-country-evidence-page";
import { createLegacyCountryEvidenceMetadata } from "@/lib/legacy-country-evidence";

type Props = {
  params: Promise<{ locale: string }>;
};

const slug = "india";
const fallbackName = "India";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createLegacyCountryEvidenceMetadata(locale, slug, fallbackName);
}

export default async function IndiaVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegacyCountryEvidencePage
      locale={locale}
      slug={slug}
      fallbackName={fallbackName}
    />
  );
}
