import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Zap,
  Gauge,
  Server,
  Globe,
  Wifi,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Router,
  Signal,
  Activity,
  Timer,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import { LastUpdated } from "@/components/last-updated";
import { generateAlternates } from "@/lib/seo-utils";

// Type definitions
type OptimizationTip = {
  number: number;
  title: string;
  description: string;
};

type TestingStep = {
  number: number;
  title: string;
  description: string;
};

type SpeedTestTool = {
  name: string;
  description: string;
};

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Speed Guide: How to Get the Fastest VPN Connection (2026) - ZeroToVPN",
    description:
      "Learn what affects VPN speed and how to optimize your connection. Get tips to maximize your VPN performance for streaming, gaming, and downloads.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN Speed Guide: How to Get the Fastest VPN Connection (2026)",
      description:
        "Learn what affects VPN speed and how to optimize your connection for the best performance.",
      type: "article",
    },
    alternates: generateAlternates("/guides/vpn-speed-guide", locale),
  };
}

export default async function VpnSpeedGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnSpeedGuide");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-speed-guide` : `${baseUrl}/${locale}/guides/vpn-speed-guide`;

  const tocItems = t.raw("toc.items") as string[];
  const relatedGuides = t.raw("relatedGuides.guides") as Array<{ title: string; description: string; url: string }>;
  const speedRequirements = t.raw("sections.understandingVpnSpeed.speedRequirements.items") as string[];
  const optimizationTips = t.raw("sections.speedOptimizationTips.tips") as OptimizationTip[];
  const testingSteps = t.raw("sections.howToTestVpnSpeed.testingProcess.steps") as TestingStep[];
  const speedTestTools = t.raw("sections.howToTestVpnSpeed.popularTools.tools") as SpeedTestTool[];
  const keyTakeaways = t.raw("sections.keyTakeaways.items") as string[];
  const premiumVpnItems = t.raw("sections.expectedSpeedLoss.premiumVpns.items") as string[];
  const freeVpnItems = t.raw("sections.expectedSpeedLoss.freeVpns.items") as string[];

  return (
    <>
      <ArticleJsonLd
        title="VPN Speed Guide: How to Get the Fastest VPN Connection (2026)"
        description="Learn what affects VPN speed and how to optimize your connection. Get tips to maximize your VPN performance for streaming, gaming, and downloads."
        url={pageUrl}
        datePublished="2026-01-01"
        dateModified="2026-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN Speed Guide", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-yellow-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN Speed Guide", href: "/guides/vpn-speed-guide" }]} className="mb-6" />
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
              {tocItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
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
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* Understanding VPN Speed */}
            <div id="1-understanding-vpn-speed" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Gauge className="h-6 w-6 text-primary" />
                {tocItems[0]}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.understandingVpnSpeed.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.understandingVpnSpeed.keyMetrics.title")}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Download className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-semibold text-sm">{t("sections.understandingVpnSpeed.keyMetrics.download.title")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("sections.understandingVpnSpeed.keyMetrics.download.description")}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold text-sm">{t("sections.understandingVpnSpeed.keyMetrics.upload.title")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("sections.understandingVpnSpeed.keyMetrics.upload.description")}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Timer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-semibold text-sm">{t("sections.understandingVpnSpeed.keyMetrics.ping.title")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("sections.understandingVpnSpeed.keyMetrics.ping.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t("sections.understandingVpnSpeed.speedRequirements.title")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {speedRequirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Factors That Affect Speed */}
            <div id="2-factors-that-affect-speed" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Settings className="h-6 w-6 text-primary" />
                {tocItems[1]}
              </h2>

              <div className="space-y-4 my-6">
                {/* Server Distance */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Globe className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{t("sections.factorsThatAffectSpeed.serverDistance.title")}</h3>
                        <Badge variant="destructive" className="text-xs">{t("sections.factorsThatAffectSpeed.serverDistance.impact")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("sections.factorsThatAffectSpeed.serverDistance.description")}
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs">
                          <strong>Tip:</strong> {t("sections.factorsThatAffectSpeed.serverDistance.tip")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Server Load */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Server className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{t("sections.factorsThatAffectSpeed.serverLoad.title")}</h3>
                        <Badge className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">{t("sections.factorsThatAffectSpeed.serverLoad.impact")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("sections.factorsThatAffectSpeed.serverLoad.description")}
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs">
                          <strong>Tip:</strong> {t("sections.factorsThatAffectSpeed.serverLoad.tip")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VPN Protocol */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Router className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{t("sections.factorsThatAffectSpeed.vpnProtocol.title")}</h3>
                        <Badge className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">{t("sections.factorsThatAffectSpeed.vpnProtocol.impact")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("sections.factorsThatAffectSpeed.vpnProtocol.description")}
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs">
                          <strong>Tip:</strong> {t("sections.factorsThatAffectSpeed.vpnProtocol.tip")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Encryption Level */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Signal className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{t("sections.factorsThatAffectSpeed.encryptionLevel.title")}</h3>
                        <Badge variant="secondary" className="text-xs">{t("sections.factorsThatAffectSpeed.encryptionLevel.impact")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("sections.factorsThatAffectSpeed.encryptionLevel.description")}
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs">
                          <strong>Tip:</strong> {t("sections.factorsThatAffectSpeed.encryptionLevel.tip")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Base Internet Speed */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Wifi className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{t("sections.factorsThatAffectSpeed.baseInternetSpeed.title")}</h3>
                        <Badge variant="destructive" className="text-xs">{t("sections.factorsThatAffectSpeed.baseInternetSpeed.impact")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("sections.factorsThatAffectSpeed.baseInternetSpeed.description")}
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs">
                          <strong>Tip:</strong> {t("sections.factorsThatAffectSpeed.baseInternetSpeed.tip")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Speed Loss */}
            <div id="3-expected-speed-loss" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <TrendingDown className="h-6 w-6 text-primary" />
                {tocItems[2]}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.expectedSpeedLoss.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.expectedSpeedLoss.typicalRetention.title")}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t("sections.expectedSpeedLoss.typicalRetention.nearbySameCountry.label")}</span>
                      <span className="text-sm text-green-500 font-bold">{t("sections.expectedSpeedLoss.typicalRetention.nearbySameCountry.percentage")}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t("sections.expectedSpeedLoss.typicalRetention.regionalNearbyCountry.label")}</span>
                      <span className="text-sm text-green-500 font-bold">{t("sections.expectedSpeedLoss.typicalRetention.regionalNearbyCountry.percentage")}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t("sections.expectedSpeedLoss.typicalRetention.sameContinent.label")}</span>
                      <span className="text-sm text-yellow-500 font-bold">{t("sections.expectedSpeedLoss.typicalRetention.sameContinent.percentage")}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t("sections.expectedSpeedLoss.typicalRetention.crossContinental.label")}</span>
                      <span className="text-sm text-orange-500 font-bold">{t("sections.expectedSpeedLoss.typicalRetention.crossContinental.percentage")}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {t("sections.expectedSpeedLoss.premiumVpns.title")}
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {premiumVpnItems.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    {t("sections.expectedSpeedLoss.freeVpns.title")}
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {freeVpnItems.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Speed Optimization Tips */}
            <div id="4-speed-optimization-tips" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                {tocItems[3]}
              </h2>

              <div className="space-y-4 my-6">
                {optimizationTips.map((tip) => (
                  <div key={tip.number} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">{tip.number}</div>
                    <div>
                      <h4 className="font-bold">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fastest VPN Protocols */}
            <div id="5-fastest-vpn-protocols" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Zap className="h-6 w-6 text-primary" />
                {tocItems[4]}
              </h2>

              <div className="space-y-4 my-6">
                {/* WireGuard */}
                <div className="bg-card border-2 border-green-500 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      {t("sections.fastestVpnProtocols.wireGuard.title")}
                    </h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{t("sections.fastestVpnProtocols.wireGuard.badge")}</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.wireGuard.speedLoss")}</div>
                      <div className="text-xs text-muted-foreground">Speed Loss</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold">{t("sections.fastestVpnProtocols.wireGuard.linesOfCode")}</div>
                      <div className="text-xs text-muted-foreground">Lines of Code</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.wireGuard.latency")}</div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-yellow-500">{t("sections.fastestVpnProtocols.wireGuard.compatibility")}</div>
                      <div className="text-xs text-muted-foreground">Compatibility</div>
                    </div>
                  </div>
                </div>

                {/* IKEv2 */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Router className="h-5 w-5 text-blue-500" />
                      {t("sections.fastestVpnProtocols.ikev2.title")}
                    </h3>
                    <Badge variant="secondary">{t("sections.fastestVpnProtocols.ikev2.badge")}</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.ikev2.speedLoss")}</div>
                      <div className="text-xs text-muted-foreground">Speed Loss</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold">{t("sections.fastestVpnProtocols.ikev2.linesOfCode")}</div>
                      <div className="text-xs text-muted-foreground">Lines of Code</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.ikev2.latency")}</div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.ikev2.compatibility")}</div>
                      <div className="text-xs text-muted-foreground">Compatibility</div>
                    </div>
                  </div>
                </div>

                {/* OpenVPN */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-500" />
                      {t("sections.fastestVpnProtocols.openVpn.title")}
                    </h3>
                    <Badge variant="outline">{t("sections.fastestVpnProtocols.openVpn.badge")}</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-yellow-500">{t("sections.fastestVpnProtocols.openVpn.speedLoss")}</div>
                      <div className="text-xs text-muted-foreground">Speed Loss</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold">{t("sections.fastestVpnProtocols.openVpn.linesOfCode")}</div>
                      <div className="text-xs text-muted-foreground">Lines of Code</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-yellow-500">{t("sections.fastestVpnProtocols.openVpn.latency")}</div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <div className="font-bold text-green-500">{t("sections.fastestVpnProtocols.openVpn.compatibility")}</div>
                      <div className="text-xs text-muted-foreground">Compatibility</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t("sections.fastestVpnProtocols.recommendation.title")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("sections.fastestVpnProtocols.recommendation.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Test VPN Speed */}
            <div id="6-how-to-test-vpn-speed" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
                {tocItems[5]}
              </h2>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.howToTestVpnSpeed.testingProcess.title")}</h3>
                <div className="space-y-4">
                  {testingSteps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{step.number}</div>
                      <div>
                        <h4 className="font-bold text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.howToTestVpnSpeed.popularTools.title")}</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {speedTestTools.map((tool, index) => (
                  <div key={index} className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h2 className="font-bold mb-3">{t("sections.keyTakeaways.title")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {takeaway}
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
              title="Related Performance Guides"
              pages={[
                { title: "VPN Protocols Explained", description: "Compare WireGuard, OpenVPN speeds", href: "/guides/vpn-protocols-explained", icon: "lock" },
                { title: "VPN for Streaming", description: "Optimize for 4K streaming", href: "/guides/vpn-for-streaming", icon: "play" },
                { title: "Best Gaming VPNs", description: "Low-latency gaming VPNs", href: "/best/best-gaming-vpn", icon: "gamepad" },
                { title: "Best VPNs 2026", description: "Fastest VPN recommendations", href: "/best/best-vpn", icon: "trophy" }
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
              <Zap className="mr-2 h-5 w-5" />
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
