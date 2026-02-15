import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  BookOpen,
  Shield,
  Zap,
  Globe,
  Tv,
  Lock,
  Smartphone,
  Download,
  Server,
  Eye,
  Wifi,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guidesIndex.meta");
  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Guide data - metadata only (text comes from translations)
const guides = [
  {
    slug: "what-is-vpn",
    translationKey: "whatIsVpn",
    icon: Shield,
    category: "basics",
    featured: true,
  },
  {
    slug: "how-vpn-works",
    translationKey: "howVpnWorks",
    icon: Lock,
    category: "basics",
    featured: true,
  },
  {
    slug: "vpn-for-streaming",
    translationKey: "vpnForStreaming",
    icon: Tv,
    category: "useCases",
    featured: true,
  },
  {
    slug: "vpn-speed-guide",
    translationKey: "vpnSpeedGuide",
    icon: Zap,
    category: "performance",
    featured: false,
  },
  {
    slug: "vpn-protocols-explained",
    translationKey: "vpnProtocolsExplained",
    icon: Server,
    category: "technical",
    featured: false,
  },
  {
    slug: "vpn-for-torrenting",
    translationKey: "vpnForTorrenting",
    icon: Download,
    category: "useCases",
    featured: false,
  },
  {
    slug: "vpn-on-mobile",
    translationKey: "vpnOnMobile",
    icon: Smartphone,
    category: "setup",
    featured: false,
  },
  {
    slug: "vpn-for-travel",
    translationKey: "vpnForTravel",
    icon: Globe,
    category: "useCases",
    featured: false,
  },
  {
    slug: "public-wifi-safety",
    translationKey: "publicWifiSafety",
    icon: Wifi,
    category: "security",
    featured: false,
  },
  {
    slug: "vpn-privacy-guide",
    translationKey: "vpnPrivacyGuide",
    icon: Eye,
    category: "privacy",
    featured: false,
  },
];

const categoryKeys = ["all", "basics", "useCases", "security", "technical", "performance", "setup", "privacy"];

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guidesIndex");

  const featuredGuides = guides.filter((g) => g.featured);
  const otherGuides = guides.filter((g) => !g.featured);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }]} />
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryKeys.map((categoryKey, index) => {
              const count = categoryKey === "all"
                ? guides.length
                : guides.filter((g) => g.category === categoryKey).length;

              return (
                <Badge
                  key={categoryKey}
                  variant={index === 0 ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {t(`categories.${categoryKey}`)} ({count})
                </Badge>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("sections.startHere.title")}</h2>
            <p className="text-muted-foreground">
              {t("sections.startHere.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-xl p-6 h-full hover:shadow-lg hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {t(`categories.${guide.category}`)}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(`guides.${guide.translationKey}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {t(`guides.${guide.translationKey}.description`)}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t(`guides.${guide.translationKey}.readTime`)}
                      </span>
                      <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t("buttons.readGuide")}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("sections.allGuides.title")}</h2>
            <p className="text-muted-foreground">
              {t("sections.allGuides.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {otherGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-lg p-5 flex items-start gap-4 hover:shadow-md hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          {t(`guides.${guide.translationKey}.title`)}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {t(`categories.${guide.category}`)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {t(`guides.${guide.translationKey}.description`)}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {t(`guides.${guide.translationKey}.readTime`)}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">{t("sections.topics.title")}</h2>
            <p className="text-muted-foreground">
              {t("sections.topics.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-2">{t("topicCards.basics.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("topicCards.basics.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">{t("topicCards.securityPrivacy.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("topicCards.securityPrivacy.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <Tv className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold mb-2">{t("topicCards.streaming.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("topicCards.streaming.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold mb-2">{t("topicCards.setup.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("topicCards.setup.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("sections.cta.title")}</h2>
            <p className="text-muted-foreground">
              {t("sections.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides/what-is-vpn"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                {t("buttons.startLearning")}
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                {t("buttons.compareVpns")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <RelatedPages
            title="Top Guides"
            pages={[
              { title: "What is a VPN?", description: "Complete beginner's guide to VPN technology", href: "/guides/what-is-vpn", icon: "shield" },
              { title: "How VPNs Work", description: "Technical deep-dive into VPN technology", href: "/guides/how-vpn-works", icon: "lock" },
              { title: "Best VPNs 2026", description: "Our top-rated VPN recommendations", href: "/best/best-vpn", icon: "trophy" },
              { title: "VPN for Streaming", description: "Access Netflix, Disney+ and more", href: "/guides/vpn-for-streaming", icon: "play" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
