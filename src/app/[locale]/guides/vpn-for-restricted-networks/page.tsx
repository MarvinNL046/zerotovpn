import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { DEFAULT_OG_IMAGE, generateAlternates } from "@/lib/seo-utils";
import { RestrictedNetworksEditorialPage } from "@/components/editorial/restricted-networks-editorial-page";
import { EvidenceFirstStaticRoute } from "@/components/editorial/evidence-first-static-route";
import { createStaticEvidenceFirstMetadata } from "@/lib/evidence-first-static-route";

type Props = { params: Promise<{ locale: string }> };
const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      metadataBase: new URL(baseUrl),
      title: {
        absolute: "How to Use a VPN on a Restricted Network | ZeroToVPN",
      },
      description:
        "Identify the restriction, prepare a VPN lawfully and run a bounded test without assuming access or bypass guarantees.",
      robots: { index: true, follow: true },
      alternates: generateAlternates(
        "/guides/vpn-for-restricted-networks",
        locale,
      ),
      openGraph: {
        locale: "en_US",
        title: "How to Use a VPN on a Restricted Network",
        description:
          "A preparation and testing guide for restricted Wi-Fi, ISP filtering and country-level censorship.",
        type: "article",
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }
  return createStaticEvidenceFirstMetadata(
    "/guides/vpn-for-restricted-networks",
    locale,
  );
}

export default async function VpnForRestrictedNetworksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const vpns = await getAllVpns();
  if (locale === "en") return <RestrictedNetworksEditorialPage vpns={vpns} />;
  return (
    <EvidenceFirstStaticRoute
      locale={locale}
      path="/guides/vpn-for-restricted-networks"
      kind="guide"
      sectionHref="/guides"
    />
  );
}
