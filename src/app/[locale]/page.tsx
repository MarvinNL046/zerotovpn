import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ComparisonTable } from "@/components/vpn/comparison-table";
import { VpnCard } from "@/components/vpn/vpn-card";
import { getFeaturedVpns } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { Shield, Zap, Globe, CheckCircle, ArrowRight, Server, Users, Clock } from "lucide-react";
import {
  OrganizationSchema,
  WebsiteSchema,
  ComparisonTableSchema,
  FaqSchema,
} from "@/components/structured-data";
import { FAQSchema } from "@/components/seo/faq-schema";
import { routing } from "@/i18n/routing";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { HeroIllustration } from "@/components/hero-illustration";
import { MetricBadge } from "@/components/ui/metric-badge";
import { PulseIndicator } from "@/components/ui/pulse-indicator";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": baseUrl };
  routing.locales.forEach((l) => {
    languages[l] = l === "en" ? baseUrl : `${baseUrl}/${l}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
  };
}

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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background dark:from-primary/5" />
          {/* Background Decorations - PostForge style ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/8 dark:bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 dark:bg-primary/2 rounded-full blur-3xl" />
          </div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <PulseIndicator variant="success" label={t("hero.badge")} size="sm" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up">
                {t("hero.title")}{" "}
                <HighlightedText variant="primary">
                  {t("hero.titleHighlight")}
                </HighlightedText>
                {" "}
                <HighlightedText variant="cursive" className="text-3xl md:text-4xl lg:text-5xl">
                  {t("hero.titleAccent")}
                </HighlightedText>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
                <Button size="lg" asChild className="group">
                  <a href="#comparison">
                    {t("hero.primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides/what-is-vpn">{t("hero.secondaryCta")}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground animate-fade-in-up stagger-3">
                {t("hero.trusted")}
              </p>
            </div>

            {/* Hero Illustration - Dashboard Preview */}
            <div className="mt-16 lg:mt-24">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 relative">
          {/* Soft gradient background that fades at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/40 to-transparent" />
          <div className="container relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up stagger-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 icon-glow">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {t("trustIndicators.vpnsTested.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.vpnsTested.label")}
                </div>
              </div>
              <div className="text-center animate-fade-in-up stagger-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-3 icon-glow">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {t("trustIndicators.monthlyReaders.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.monthlyReaders.label")}
                </div>
              </div>
              <div className="text-center animate-fade-in-up stagger-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3 icon-glow">
                  <Server className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {t("trustIndicators.speedTests.value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("trustIndicators.speedTests.label")}
                </div>
              </div>
              <div className="text-center animate-fade-in-up stagger-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 mb-3 icon-glow">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
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
        <section className="py-16 relative">
          {/* Flowing gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
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
                const iconColors = ["text-primary bg-primary/10", "text-green-500 bg-green-500/10", "text-orange-500 bg-orange-500/10"];
                return (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-xl border bg-card card-hover animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className={`w-14 h-14 rounded-xl ${iconColors[index]} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-7 w-7" />
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
        <section className="py-16 relative">
          {/* Flowing gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
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

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 relative">
          {/* Flowing gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={faqData}
                title={t("faqSection.title")}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 animate-gradient" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm rounded-2xl border p-8 md:p-12 card-hover">
              <div className="inline-flex items-center gap-2 mb-2">
                <MetricBadge value="Free" label="to compare" variant="success" icon="trending-up" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("ctaSection.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("ctaSection.subtitle")}
              </p>
              <Button size="lg" asChild className="group">
                <a href="#comparison">
                  {t("ctaSection.button")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
