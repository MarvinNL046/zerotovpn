import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { HowToSchema } from "@/components/seo/howto-schema";
import {
  Wifi,
  WifiOff,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  BookOpen,
  AlertTriangle,
  Eye,
  EyeOff,
  Users,
  Coffee,
  Plane,
  Building,
  CreditCard,
  Key,
  Smartphone,
  Laptop,
  ShieldAlert,
  ShieldCheck,
  Bug,
  Radio,
  Server,
} from "lucide-react";
import { LastUpdated } from "@/components/last-updated";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Public WiFi Safety: How to Stay Secure on Open Networks (2026) - ZeroToVPN",
    description:
      "Learn about public WiFi risks and how to protect yourself. Discover essential security tips for using WiFi at cafes, airports, hotels, and other public places.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Public WiFi Safety: How to Stay Secure on Open Networks (2026)",
      description:
        "Learn about public WiFi risks and how to protect yourself. Essential security tips for cafes, airports, and hotels.",
      type: "article",
    },
  };
}

export default async function PublicWifiSafetyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.publicWifiSafety");

  const pageUrl = locale === "en" ? `${baseUrl}/guides/public-wifi-safety` : `${baseUrl}/${locale}/guides/public-wifi-safety`;

  return (
    <>
      <ArticleJsonLd
        title="Public WiFi Safety: How to Stay Secure on Open Networks (2026)"
        description="Learn about public WiFi risks and how to protect yourself. Discover essential security tips for using WiFi at cafes, airports, hotels, and other public places."
        url={pageUrl}
        datePublished="2026-01-01"
        dateModified="2026-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "Public WiFi Safety", url: pageUrl },
        ]}
      />
      <HowToSchema
        name="How to Safely Use Public WiFi with a VPN"
        description="Essential steps to protect your data and privacy when connecting to public WiFi networks at cafes, airports, and hotels."
        totalTime="PT3M"
        steps={[
          {
            name: "Enable VPN Before Connecting",
            text: "Before connecting to any public WiFi network, launch your VPN application and connect to a server. This ensures all your data is encrypted from the moment you access the network."
          },
          {
            name: "Verify VPN Connection",
            text: "Check that your VPN is actively connected and the kill switch is enabled. Confirm your IP address shows the VPN server location, not your actual location. This prevents any data leaks if the VPN disconnects."
          },
          {
            name: "Browse Securely",
            text: "With your VPN active, you can safely access websites, check emails, and use online banking. All your traffic is encrypted and protected from hackers on the public network. Still avoid accessing highly sensitive accounts unless necessary."
          },
          {
            name: "Disconnect Safely",
            text: "When finished, close sensitive applications first, then disconnect from the WiFi network. Keep your VPN enabled until you're on a trusted network. Turn off WiFi auto-connect to prevent automatic connections to unsafe networks."
          }
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "Public WiFi Safety", href: "/guides/public-wifi-safety" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{t("hero.badge")}</Badge>
              <Badge variant="outline">{t("hero.readTime")}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {t("hero.title")}
            </h1>
            <LastUpdated locale={locale} className="mb-4" />
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
              {(t.raw("toc.items") as string[]).map((item, index) => {
                const anchors = ["wifi-risks", "attack-types", "protection-tips", "vpn-protection", "location-guide", "checklist"];
                return (
                  <a key={index} href={`#${anchors[index]}`} className="text-primary hover:underline">
                    {item}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* WiFi Risks */}
            <section id="wifi-risks">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.wifiRisks.title")}</h2>
              </div>

              {(t.raw("sections.wifiRisks.intro") as string[]).map((para, index) => (
                <p key={index} className="text-muted-foreground mb-6">
                  {para}
                </p>
              ))}

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">
                      {t("sections.wifiRisks.scaryTruth.title")}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {t("sections.wifiRisks.scaryTruth.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {(t.raw("sections.wifiRisks.risks") as Array<{ title: string; description: string }>).map((risk, index) => {
                  const icons = [Eye, Users, Server];
                  const colors = ["text-red-500", "text-orange-500", "text-purple-500"];
                  const IconComponent = icons[index];
                  return (
                    <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${colors[index]} flex-shrink-0 mt-1`} />
                      <div>
                        <h4 className="font-semibold mb-1">{risk.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {risk.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Attack Types */}
            <section id="attack-types">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Bug className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.attackTypes.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.attackTypes.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {(t.raw("sections.attackTypes.attacks") as Array<{ title: string; description: string; protection: string }>).map((attack, index) => {
                  const icons = [Radio, Eye, WifiOff, CreditCard];
                  const colors = ["text-red-500", "text-orange-500", "text-purple-500", "text-green-500"];
                  const IconComponent = icons[index];
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className={`h-5 w-5 ${colors[index]}`} />
                        <h4 className="font-semibold">{attack.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {attack.description}
                      </p>
                      <div className="bg-muted/50 rounded p-2 text-xs">
                        <strong>Protection:</strong> {attack.protection}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Protection Tips */}
            <section id="protection-tips">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.protectionTips.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.protectionTips.intro")}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t("sections.protectionTips.doThis.title")}
                  </h4>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                    {(t.raw("sections.protectionTips.doThis.items") as string[]).map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {t("sections.protectionTips.neverDoThis.title")}
                  </h4>
                  <ul className="text-sm text-red-600 dark:text-red-400 space-y-2">
                    {(t.raw("sections.protectionTips.neverDoThis.items") as string[]).map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  {t("sections.protectionTips.deviceSettings.title")}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t.raw("sections.protectionTips.deviceSettings.items") as string[]).map((item, index) => {
                    const icons = [Lock, EyeOff, Laptop, Shield];
                    const IconComponent = icons[index];
                    return (
                      <li key={index} className="flex items-start gap-2">
                        <IconComponent className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            {/* VPN Protection */}
            <section id="vpn-protection">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.vpnProtection.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.vpnProtection.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {(t.raw("sections.vpnProtection.benefits") as Array<{ title: string; description: string }>).map((benefit, index) => {
                  const icons = [Lock, EyeOff, Key];
                  const IconComponent = icons[index];
                  return (
                    <div key={index} className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <IconComponent className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3">{t("sections.vpnProtection.comparison.title")}</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>{t("sections.vpnProtection.comparison.withoutVpn.label")}</strong> {t("sections.vpnProtection.comparison.withoutVpn.description")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>{t("sections.vpnProtection.comparison.withVpn.label")}</strong> {t("sections.vpnProtection.comparison.withVpn.description")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Pro Tip:</strong> {t("sections.vpnProtection.proTip")}
                </p>
              </div>
            </section>

            {/* Location Guide */}
            <section id="location-guide">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Building className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.locationGuide.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.locationGuide.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {(t.raw("sections.locationGuide.locations") as Array<{ name: string; riskLevel: string; description: string; tips: string }>).map((location, index) => {
                  const icons = [Coffee, Plane, Building, Wifi];
                  const colors = ["text-amber-600", "text-blue-500", "text-purple-500", "text-green-500"];
                  const IconComponent = icons[index];
                  const riskVariants: Record<string, "destructive" | "secondary"> = {
                    "High Risk": "destructive",
                    "Medium Risk": "secondary"
                  };
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className={`h-5 w-5 ${colors[index]}`} />
                        <h4 className="font-semibold">{location.name}</h4>
                        <Badge variant={riskVariants[location.riskLevel]}>{location.riskLevel}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {location.description}
                      </p>
                      <p className="text-sm">
                        <strong>Safety Tips:</strong> {location.tips}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Checklist */}
            <section id="checklist">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.checklist.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.checklist.intro")}
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-4">{t("sections.checklist.beforeConnecting.title")}</h4>
                  <ul className="space-y-2 mb-6">
                    {(t.raw("sections.checklist.beforeConnecting.items") as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 border rounded" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t("sections.checklist.whileConnected.title")}</h4>
                  <ul className="space-y-2 mb-6">
                    {(t.raw("sections.checklist.whileConnected.items") as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 border rounded" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t("sections.checklist.beforeLeaving.title")}</h4>
                  <ul className="space-y-2">
                    {(t.raw("sections.checklist.beforeLeaving.items") as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 border rounded" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{t("sections.summary.title")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("sections.summary.content")}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>{t("sections.summary.costBenefit")}</span>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-8 text-center">
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
                {(t.raw("relatedGuides.guides") as Array<{ title: string; description: string; url: string }>).map((guide, index) => (
                  index === 0 && (
                    <Link
                      key={index}
                      href={guide.url}
                      className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                    >
                      {guide.title}
                    </Link>
                  )
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <FAQSchema
              faqs={[
                {
                  question: "Is public WiFi really dangerous?",
                  answer: "Yes, public WiFi poses significant security risks. Unencrypted networks allow hackers to intercept your data, including passwords, emails, and credit card information. Attackers can perform man-in-the-middle attacks, set up fake WiFi hotspots, and monitor your browsing activity. Even legitimate public WiFi networks are vulnerable because they're shared with potentially malicious users."
                },
                {
                  question: "What can hackers see on public WiFi?",
                  answer: "On unencrypted public WiFi, hackers can see almost everything you do online: websites you visit, login credentials, emails, messages, files you download, and even intercept your session cookies to access your accounts. They can also see the apps you're using and potentially inject malware into your device. HTTPS provides some protection, but isn't foolproof without additional security measures."
                },
                {
                  question: "Does a VPN protect me on public WiFi?",
                  answer: "Yes, a VPN provides excellent protection on public WiFi by encrypting all your internet traffic before it leaves your device. This encryption prevents hackers, ISPs, and network administrators from seeing what you're doing online or stealing your data. A VPN creates a secure tunnel for your data, making public WiFi nearly as safe as your home network."
                },
                {
                  question: "Should I use a VPN at hotels?",
                  answer: "Absolutely. Hotel WiFi is often poorly secured and used by many guests, making it a prime target for hackers. Hotels may also monitor and log your internet activity. Using a VPN at hotels protects your sensitive data, prevents tracking, and ensures your online banking, work emails, and personal information remain private. It's a small precaution that provides significant security benefits."
                }
              ]}
            />

            {/* Related Pages */}
            <RelatedPages
              title="Related Security Guides"
              pages={[
                { title: "VPN for Travel", description: "Stay secure while traveling", href: "/guides/vpn-for-travel", icon: "globe" },
                { title: "VPN on Mobile", description: "Secure your smartphone", href: "/guides/vpn-on-mobile", icon: "smartphone" },
                { title: "VPN Privacy Guide", description: "Maximize online privacy", href: "/guides/vpn-privacy-guide", icon: "shield" },
                { title: "Best VPNs 2026", description: "Top-rated secure VPNs", href: "/best/best-vpn", icon: "trophy" }
              ]}
            />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
