import { setRequestLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/vpn/comparison-table";
import { VpnCard } from "@/components/vpn/vpn-card";
import { getFeaturedVpns } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { Shield, Zap, Globe, CheckCircle, ArrowRight } from "lucide-react";
import {
  OrganizationSchema,
  WebsiteSchema,
  ComparisonTableSchema,
  FaqSchema,
} from "@/components/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const featuredVpns = await getFeaturedVpns();

  // Get FAQ data from translations
  const faqData = t.raw("faq") as Array<{ question: string; answer: string }>;

  // Icons for whyVpn features
  const featureIcons = [Shield, Globe, Zap];

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <ComparisonTableSchema vpns={featuredVpns} />
      <FaqSchema faqs={faqData} />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="px-4 py-1">
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#comparison">
                    {t("hero.primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides/what-is-vpn">{t("hero.secondaryCta")}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("hero.trusted")}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {t("trustIndicators.vpnsTested.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.vpnsTested.label")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {t("trustIndicators.monthlyReaders.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.monthlyReaders.label")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {t("trustIndicators.speedTests.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.speedTests.label")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {t("trustIndicators.updated.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.updated.label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("comparison.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("comparison.subtitle")}
              </p>
            </div>
            <ComparisonTable vpns={featuredVpns} />
          </div>
        </section>

        {/* VPN Cards (Mobile-friendly alternative) */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("topPicks.title")}</h2>
              <p className="text-muted-foreground">{t("topPicks.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVpns.slice(0, 3).map((vpn, index) => (
                <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Use a VPN */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("whyVpn.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("whyVpn.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(t.raw("whyVpn.features") as Array<{ title: string; description: string; icon: string }>).map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div key={index} className="text-center p-6 rounded-lg border bg-card">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Test */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t("howWeTest.title")}</h2>
                <p className="text-muted-foreground">{t("howWeTest.subtitle")}</p>
              </div>
              <div className="space-y-4">
                {(t.raw("howWeTest.items") as string[]).map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("ctaSection.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("ctaSection.subtitle")}
              </p>
              <Button size="lg" asChild>
                <a href="#comparison">
                  {t("ctaSection.button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
