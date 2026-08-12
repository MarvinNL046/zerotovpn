import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, OG_LOCALE_MAP, generateAlternates } from "@/lib/seo-utils";
import { FreeVpnEditorialPage } from "@/components/editorial/free-vpn-editorial-page";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";
const metadataByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Best Free VPNs: Limits and Trade-offs | ZeroToVPN",
    description: "Compare free VPN tiers by data limits, privacy evidence, locations and realistic use cases. Verify current plan terms before installing.",
  },
  fr: {
    title: "Meilleurs VPN gratuits 2026 : limites, sécurité et comparatif | ZeroToVPN",
    description: "Comparez les VPN gratuits selon leurs limites de données, leur confidentialité, leurs pays disponibles et leurs usages réels. Vérifiez les conditions actuelles avant l’installation.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = metadataByLocale[locale] ?? metadataByLocale.en;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: metadata.title },
    description: metadata.description,
    robots: { index: true, follow: true },
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: metadata.title,
      description: metadata.description,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: generateAlternates("/best/free-vpn", locale),
  };
}

export default async function FreeVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // All locales use the same audited template until translated copy passes the
  // evidence and claim gate independently. This prevents legacy percentage,
  // test-count and universal-safety claims from returning in localized HTML.
  return <FreeVpnEditorialPage locale={locale} />;
}
