import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Smartphone,
  Shield,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Apple,
  Download,
  Settings,
  Wifi,
  Battery,
  Lock,
  ToggleLeft,
  AlertTriangle,
  Zap,
  Globe,
  Key,
  RefreshCw,
  MapPin,
  ExternalLink,
} from "lucide-react";

// Affiliate links
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
    title: "VPN on Mobile: Complete iOS & Android Setup Guide (2025) - ZeroToVPN",
    description:
      "Learn how to set up and use a VPN on your iPhone or Android device. Step-by-step guides, best practices, and tips for mobile VPN security.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN on Mobile: Complete iOS & Android Setup Guide (2025)",
      description:
        "Learn how to set up and use a VPN on your iPhone or Android device. Step-by-step guides and best practices.",
      type: "article",
    },
  };
}

export default async function VpnOnMobilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnOnMobile");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-on-mobile` : `${baseUrl}/${locale}/guides/vpn-on-mobile`;

  const whyMobileVpn = t.raw("sections.whyMobileVpn") as any;
  const iosSetup = t.raw("sections.iosSetup") as any;
  const androidSetup = t.raw("sections.androidSetup") as any;
  const bestSettings = t.raw("sections.bestSettings") as any;
  const batteryTips = t.raw("sections.batteryTips") as any;
  const bestVpns = t.raw("sections.bestVpns") as any;
  const quickTips = t.raw("sections.quickTips") as any;

  return (
    <>
      <ArticleJsonLd
        title="VPN on Mobile: Complete iOS & Android Setup Guide (2025)"
        description="Learn how to set up and use a VPN on your iPhone or Android device. Step-by-step guides, best practices, and tips for mobile VPN security."
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN on Mobile", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN on Mobile", href: "/guides/vpn-on-mobile" }]} className="mb-6" />
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
                  href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  className="text-primary hover:underline"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Why Mobile VPN */}
            <section id="why-use-vpn-on-mobile">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Smartphone className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">{whyMobileVpn.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {whyMobileVpn.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {whyMobileVpn.benefits.map((benefit: any, index: number) => {
                  const IconComponent = benefit.icon === "Wifi" ? Wifi : benefit.icon === "Globe" ? Globe : benefit.icon === "Shield" ? Shield : Lock;
                  const iconColor = benefit.icon === "Wifi" ? "text-blue-500" : benefit.icon === "Globe" ? "text-green-500" : benefit.icon === "Shield" ? "text-purple-500" : "text-orange-500";

                  return (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Did you know?</strong> {whyMobileVpn.didYouKnow}
                </p>
              </div>
            </section>

            {/* iOS Setup */}
            <section id="vpn-setup-on-iphoneipad">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gray-500/10">
                  <Apple className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold">{iosSetup.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {iosSetup.intro}
              </p>

              <div className="space-y-4 mb-6">
                {iosSetup.steps.map((step: any) => (
                  <div key={step.number} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {iosSetup.iosSettings.title}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {iosSetup.iosSettings.settings.map((setting: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{setting}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Android Setup */}
            <section id="vpn-setup-on-android">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Smartphone className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">{androidSetup.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {androidSetup.intro}
              </p>

              <div className="space-y-4 mb-6">
                {androidSetup.steps.map((step: any) => (
                  <div key={step.number} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {androidSetup.androidFeatures.title}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {androidSetup.androidFeatures.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Best Settings */}
            <section id="optimal-mobile-vpn-settings">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Settings className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold">{bestSettings.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {bestSettings.intro}
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Setting</th>
                      <th className="text-left py-3 px-4 font-semibold">Recommended</th>
                      <th className="text-left py-3 px-4 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {bestSettings.settings.map((setting: any, index: number) => (
                      <tr key={index}>
                        <td className="py-3 px-4 font-medium">{setting.setting}</td>
                        <td className="py-3 px-4">{setting.recommended}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {setting.why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {bestSettings.iosWarning.title}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {bestSettings.iosWarning.text}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Battery Tips */}
            <section id="battery-performance-tips">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Battery className="h-6 w-6 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold">{batteryTips.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {batteryTips.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {batteryTips.doThis.title}
                  </h4>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                    {batteryTips.doThis.items.map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {batteryTips.avoidThis.title}
                  </h4>
                  <ul className="text-sm text-red-600 dark:text-red-400 space-y-2">
                    {batteryTips.avoidThis.items.map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  {batteryTips.protocolImpact.title}
                </h4>
                <div className="space-y-3">
                  {batteryTips.protocolImpact.protocols.map((protocol: any, index: number) => {
                    const color = protocol.impact === "Low Impact" ? "green-500" : "yellow-500";
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{protocol.name}</span>
                          <span className={`text-${color}`}>{protocol.impact}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className={`h-2 bg-${color} rounded-full`} style={{ width: `${protocol.percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Best VPNs */}
            <section id="best-vpns-for-mobile">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{bestVpns.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {bestVpns.intro}
              </p>

              <div className="space-y-4 mb-6">
                {bestVpns.vpns.map((vpn: any, index: number) => {
                  const vpnKey = vpn.name.toLowerCase().replace(/\s+/g, "") as keyof typeof affiliateLinks;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <a
                            href={affiliateLinks[vpnKey]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {vpn.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <p className="text-sm text-muted-foreground">
                            {vpn.description}
                          </p>
                        </div>
                        <Badge variant={vpn.badge === "Editor's Choice" ? "default" : "secondary"}>{vpn.badge}</Badge>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                        {vpn.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={affiliateLinks[vpnKey]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Visit {vpn.name}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Pro tip:</strong> {bestVpns.proTip}
                </p>
              </div>
            </section>

            {/* Quick Tips */}
            <section className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{quickTips.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {quickTips.tips.map((tip: any, index: number) => {
                  const IconComponent = tip.icon === "Key" ? Key : tip.icon === "RefreshCw" ? RefreshCw : tip.icon === "MapPin" ? MapPin : ToggleLeft;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-1 rounded bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t("cta.title")}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/best/best-vpn"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/guides/public-wifi-safety"
                  className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  WiFi Safety Guide
                </Link>
              </div>
            </section>

            {/* Related Pages */}
            <RelatedPages
              title="Related Mobile Security Guides"
              pages={[
                { title: "Public WiFi Safety", description: "Secure mobile connections on public WiFi", href: "/guides/public-wifi-safety", icon: "wifi" },
                { title: "VPN for Travel", description: "Essential travel security tips", href: "/guides/vpn-for-travel", icon: "globe" },
                { title: "VPN Speed Guide", description: "Optimize mobile VPN performance", href: "/guides/vpn-speed-guide", icon: "zap" },
                { title: "Best VPNs 2025", description: "Top-rated mobile VPN apps", href: "/best/best-vpn", icon: "trophy" }
              ]}
            />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
