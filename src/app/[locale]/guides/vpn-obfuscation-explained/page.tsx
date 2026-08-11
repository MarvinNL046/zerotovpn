import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { generateAlternates } from "@/lib/seo-utils";
import { ObfuscationEditorialPage } from "@/components/editorial/obfuscation-editorial-page";

type Props = { params: Promise<{ locale: string }> };
const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      metadataBase: new URL(baseUrl),
      title: { absolute: "VPN Obfuscation Explained: Stealth and OpenVPN | ZeroToVPN" },
      description: "Understand VPN obfuscation, stealth features and OpenVPN trade-offs with an evidence-led test plan and current provider documentation.",
      robots: { index: true, follow: true },
      alternates: generateAlternates("/guides/vpn-obfuscation-explained", locale),
      openGraph: {
        locale: "en_US",
        title: "VPN Obfuscation Explained: Stealth and OpenVPN",
        description: "What VPN obfuscation changes, what it cannot promise and how to verify a provider feature on your setup.",
        type: "article",
      },
    };
  }
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Obfuscation Explained | ZeroToVPN",
    description: "Learn how VPN obfuscation and stealth modes work and what to verify.",
    robots: { index: false, follow: true },
    alternates: generateAlternates("/guides/vpn-obfuscation-explained", locale),
  };
}

export default async function VpnObfuscationExplainedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const vpns = await getAllVpns();
  if (locale === "en") return <ObfuscationEditorialPage vpns={vpns} />;
  redirect("/guides/vpn-obfuscation-explained");
}
