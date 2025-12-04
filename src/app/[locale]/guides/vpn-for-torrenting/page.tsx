import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Eye,
  EyeOff,
  Server,
  Lock,
  Zap,
  Globe,
  FileWarning,
  Scale,
  ShieldCheck,
  ShieldOff,
  Wifi,
  Star,
  ExternalLink,
} from "lucide-react";

const affiliateLinks = {
  expressvpn: "https://go.zerotovpn.com/expressvpn",
  nordvpn: "https://go.zerotovpn.com/nordvpn",
  surfshark: "https://go.zerotovpn.com/surfshark",
  cyberghost: "https://go.zerotovpn.com/cyberghost",
  protonvpn: "https://go.zerotovpn.com/protonvpn",
  pia: "https://go.zerotovpn.com/pia",
};

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN for Torrenting: Stay Safe While Downloading (2025 Guide) - ZeroToVPN",
    description:
      "Learn how to use a VPN for safe torrenting. Understand P2P-friendly VPNs, kill switches, and leak protection to download securely and anonymously.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN for Torrenting: Stay Safe While Downloading (2025)",
      description:
        "Learn how to use a VPN for safe torrenting with P2P-friendly servers and essential security features.",
      type: "article",
    },
  };
}

export default async function VpnForTorrentingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnForTorrenting");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-for-torrenting` : `${baseUrl}/${locale}/guides/vpn-for-torrenting`;

  return (
    <>
      <ArticleJsonLd
        title={t("meta.title")}
        description={t("meta.description")}
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: t("hero.title"), url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN for Torrenting", href: "/guides/vpn-for-torrenting" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{t("hero.badge")}</Badge>
              <Badge variant="outline">{t("hero.readTime")}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {t("hero.subtitle")}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {t("hero.updated")}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {t("hero.level")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold mb-4">{t("toc.title")}</h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {(t.raw("toc.items") as string[]).map((item, index) => (
                <a
                  key={index}
                  href={`#${["why-vpn", "risks", "features", "best-vpns", "setup", "legal"][index]}`}
                  className="text-primary hover:underline"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong>{t("sections.disclaimer.intro")}</strong> {t("sections.disclaimer.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* Why Use VPN for Torrenting */}
            <div id="why-vpn" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Shield className="h-6 w-6 text-primary" />
                {t("sections.whyVpn.title")}
              </h2>
              {(t.raw("sections.whyVpn.intro") as string[]).map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.whyVpn.exposureBox.title")}</h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Wifi className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium">{t("sections.whyVpn.exposureBox.you")}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("sections.whyVpn.exposureBox.yourIp")}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-6 w-6 text-red-500 rotate-0 md:rotate-0" />
                    <span className="text-xs text-red-500 font-medium">{t("sections.whyVpn.exposureBox.exposed")}</span>
                    <ArrowRight className="h-6 w-6 text-red-500 rotate-180 md:rotate-180" />
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <span className="text-sm font-medium">{t("sections.whyVpn.exposureBox.swarm")}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("sections.whyVpn.exposureBox.peers")}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.whyVpn.whoCanSee.title")}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {(t.raw("sections.whyVpn.whoCanSee.items") as Array<{ title: string; description: string }>).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Eye className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>{item.title}</strong> {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks of Torrenting Without VPN */}
            <div id="risks" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                {t("sections.risks.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.risks.items") as Array<{ title: string; description: string; color: string }>).map((item, index) => {
                  const colorClasses = {
                    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                    orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                    yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                  };
                  const icons = [FileWarning, Zap, ShieldOff, Eye];
                  const iconColors = ["text-red-500", "text-orange-500", "text-yellow-600", "text-purple-500"];
                  const Icon = icons[index];

                  return (
                    <div key={index} className={`${colorClasses[item.color as keyof typeof colorClasses]} border rounded-xl p-5`}>
                      <div className="flex items-start gap-4">
                        <Icon className={`h-6 w-6 ${iconColors[index]} flex-shrink-0`} />
                        <div>
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Essential VPN Features */}
            <div id="features" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
                {t("sections.features.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.features.items") as Array<{
                  title: string;
                  badge: string;
                  description: string;
                  critical: boolean;
                  whyItMatters?: string;
                  lookFor?: string;
                  testIt?: string;
                  tip?: string;
                  note?: string;
                }>).map((item, index) => {
                  const icons = [EyeOff, Lock, Server, Shield, Zap];
                  const iconColors = ["text-green-500", "text-green-500", "text-blue-500", "text-purple-500", "text-yellow-500"];
                  const Icon = icons[index];

                  return (
                    <div key={index} className={`bg-card ${item.critical ? 'border-2 border-green-500' : 'border'} rounded-xl p-5`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${iconColors[index]}`} />
                          {item.title}
                        </h3>
                        <Badge className={item.critical ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""} variant={item.critical ? undefined : item.badge === "Important" ? "secondary" : "outline"}>
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs">
                          <strong>{item.whyItMatters || item.lookFor || item.testIt || item.tip}</strong> {item.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Best VPNs for Torrenting */}
            <div id="best-vpns" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Star className="h-6 w-6 text-primary" />
                {t("sections.bestVpns.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.bestVpns.vpns") as Array<{
                  name: string;
                  badge: string;
                  rating: string;
                  description: string;
                  features: string[];
                  visitLink?: string;
                }>).map((vpn, index) => {
                  const isFirst = index === 0;
                  const link = vpn.name.toLowerCase().replace(/\s+/g, '');
                  const hasLink = affiliateLinks[link as keyof typeof affiliateLinks];

                  return (
                    <div key={index} className={`bg-card ${isFirst ? 'border-2 border-primary' : 'border'} rounded-xl p-5`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <Badge className={isFirst ? "mb-2 bg-primary/10 text-primary" : "mb-2"} variant={isFirst ? undefined : "secondary"}>
                            {vpn.badge}
                          </Badge>
                          <h3 className="font-bold text-lg">
                            {hasLink ? (
                              <a
                                href={affiliateLinks[link as keyof typeof affiliateLinks]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary inline-flex items-center gap-1"
                              >
                                {vpn.name}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : vpn.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${parseFloat(vpn.rating) >= star * 2 - 0.5 ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{vpn.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {vpn.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        {vpn.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      {hasLink && vpn.visitLink && (
                        <a
                          href={affiliateLinks[link as keyof typeof affiliateLinks]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-3"
                        >
                          {vpn.visitLink}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/best/best-vpn"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {t("sections.bestVpns.viewFullComparison")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* How to Set Up */}
            <div id="setup" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Download className="h-6 w-6 text-primary" />
                {t("sections.setup.title")}
              </h2>

              <div className="bg-card border rounded-xl p-6 my-6">
                <div className="space-y-4">
                  {(t.raw("sections.setup.steps") as Array<{ number: number; title: string; description: string }>).map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-bold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 my-6">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t("sections.setup.proTip.title")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("sections.setup.proTip.description")}
                </p>
              </div>
            </div>

            {/* Legal Considerations */}
            <div id="legal" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Scale className="h-6 w-6 text-primary" />
                {t("sections.legal.title")}
              </h2>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.legal.question")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("sections.legal.intro")}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {t("sections.legal.legalTitle")}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {(t.raw("sections.legal.legalItems") as string[]).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      {t("sections.legal.illegalTitle")}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {(t.raw("sections.legal.illegalItems") as string[]).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t("sections.legal.warning.title")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("sections.legal.warning.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h2 className="font-bold mb-3">{t("sections.keyTakeaways.title")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(t.raw("sections.keyTakeaways.items") as string[]).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <RelatedPages
              title="Related Guides"
              pages={[
                { title: "VPN Privacy Guide", description: "No-logs policies explained", href: "/guides/vpn-privacy-guide", icon: "shield" },
                { title: "VPN Speed Guide", description: "Optimize for fast downloads", href: "/guides/vpn-speed-guide", icon: "zap" },
                { title: "Public WiFi Safety", description: "Secure connections everywhere", href: "/guides/public-wifi-safety", icon: "wifi" },
                { title: "Best VPNs 2025", description: "Top-rated P2P-friendly VPNs", href: "/best/best-vpn", icon: "trophy" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("cta.title")}</h2>
            <p className="text-muted-foreground">
              {t("cta.description")}
            </p>
            <Link
              href="/best/best-vpn"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Shield className="mr-2 h-5 w-5" />
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
