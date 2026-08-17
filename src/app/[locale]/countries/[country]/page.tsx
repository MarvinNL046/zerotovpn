import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LegacyCountryEvidencePage } from "@/components/countries/legacy-country-evidence-page";
import {
  getAllDynamicCountries,
  getCountryBySlug,
  STATIC_COUNTRY_SLUGS,
} from "@/lib/country-data";
import { createLegacyCountryEvidenceMetadata } from "@/lib/legacy-country-evidence";

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

export async function generateStaticParams() {
  const { routing } = await import("@/i18n/routing");

  return routing.locales.flatMap((locale) =>
    getAllDynamicCountries().map(({ slug }) => ({ locale, country: slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const data = getCountryBySlug(country);

  if (!data || STATIC_COUNTRY_SLUGS.includes(country)) {
    return {
      title: "Country not found",
      robots: { index: false, follow: false },
    };
  }

  return createLegacyCountryEvidenceMetadata(locale, country, data.name);
}

export default async function DynamicCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);

  if (STATIC_COUNTRY_SLUGS.includes(country)) {
    notFound();
  }

  const data = getCountryBySlug(country);
  if (!data) {
    notFound();
  }

  return (
    <LegacyCountryEvidencePage
      locale={locale}
      slug={country}
      fallbackName={data.name}
    />
  );
}
