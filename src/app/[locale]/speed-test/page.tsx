import { getTranslations, setRequestLocale } from "next-intl/server";
import { SpeedTestWidget } from "@/components/tools/speed-test-widget";
import { VpnCard } from "@/components/vpn/vpn-card";
import { vpnProviders } from "@/lib/vpn-data";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Zap, Shield, Info } from "lucide-react";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "speedTest" });

  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: generateAlternates("/speed-test", locale),
  };
}

export default async function SpeedTestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("speedTest");

  // Get top 3 fastest VPNs
  const fastestVpns = [...vpnProviders]
    .sort((a, b) => b.speedScore - a.speedScore)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <BreadcrumbSchema items={[{ name: "Speed Test", href: "/speed-test" }]} className="mb-8" />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="h-4 w-4" />
          {t("title")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("pageSubtitle")}
        </p>
      </div>

      {/* Speed Test Widget */}
      <div className="mb-12">
        <SpeedTestWidget />
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Info className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t("whyTest")}</h3>
              <p className="text-muted-foreground">{t("whyTestDesc")}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t("vpnImpact")}</h3>
              <p className="text-muted-foreground">{t("vpnImpactDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended VPNs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          {t("recommendedVpns")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {fastestVpns.map((vpn, index) => (
            <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
