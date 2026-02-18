import { getTranslations, setRequestLocale } from "next-intl/server";
import { IpLookupWidget } from "@/components/tools/ip-lookup-widget";
import { VpnCard } from "@/components/vpn/vpn-card";
import { vpnProviders } from "@/lib/vpn-data";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Globe, Shield, Eye, Wifi } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ipTool" });

  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `https://zerotovpn.com/${locale}/tools/what-is-my-ip`,
    },
  };
}

export default async function WhatIsMyIpPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ipTool");

  // Get top 3 VPNs by security score for recommendations
  const secureVpns = [...vpnProviders]
    .sort((a, b) => b.securityScore - a.securityScore)
    .slice(0, 3);

  // FAQ data
  const faqData = t.raw("faq") as Array<{ question: string; answer: string }>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          { name: "Tools", href: "/tools" },
          { name: t("pageTitle"), href: "/tools/what-is-my-ip" },
        ]}
        className="mb-8"
      />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Globe className="h-4 w-4" />
          {t("title")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("pageSubtitle")}
        </p>
      </div>

      {/* IP Lookup Widget */}
      <div className="mb-12">
        <IpLookupWidget />
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-500/10">
              <Eye className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">{t("whyHideIp")}</h2>
              <p className="text-muted-foreground text-sm">{t("whyHideIpDesc")}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Wifi className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">{t("whatIsIp")}</h2>
              <p className="text-muted-foreground text-sm">{t("whatIsIpDesc")}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">{t("howVpnHelps")}</h2>
              <p className="text-muted-foreground text-sm">{t("howVpnHelpsDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <FAQSchema
          faqs={faqData}
          title="Frequently Asked Questions"
        />
      </div>

      {/* Recommended VPNs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          {t("recommendedVpns")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {secureVpns.map((vpn, index) => (
            <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
