import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CountryVpnVerificationPage } from "@/components/editorial/country-vpn-verification-page";
import { DEFAULT_OG_IMAGE, generateAlternates, OG_LOCALE_MAP } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };
const route = "/countries/iran";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = "VPN Use in Iran: Evidence and Safety Checklist";
  const description = "Use current authoritative guidance, provider records, network-specific checks, and a failure-safe plan before considering VPN use in Iran.";

  return {
    metadataBase: new URL("https://www.zerotovpn.com"),
    title,
    description,
    alternates: generateAlternates(route, locale),
    robots: locale === "en" ? undefined : { index: false, follow: true },
    openGraph: { title, description, type: "article", locale: OG_LOCALE_MAP[locale] ?? "en_US", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE.url] },
  };
}

export default async function IranVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CountryVpnVerificationPage
      locale={locale}
      route={route}
      country="Iran"
      context="The consequences of a failed or misunderstood setup may be more important than a successful connection."
    />
  );
}
