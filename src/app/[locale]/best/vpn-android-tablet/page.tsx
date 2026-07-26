import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import {
  VpnReviewCard,
  type VpnReviewScoreKind,
} from "@/components/vpn/vpn-review-card";
import { getVpnById } from "@/lib/vpn-data";
import {
  Shield,
  Zap,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Server,
  Tablet,
  Database,
  Wifi,
  MapPin,
  Settings,
  Download,
  Gamepad2,
  Monitor,
  SplitSquareVertical,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";
import { generateAlternates } from "@/lib/seo-utils";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";

import { getRequiredDiscountPercent } from "@/lib/vpn-discount";
type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "androidTabletVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-android-tablet", locale),
  };
}

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "nl" },
    { locale: "de" },
    { locale: "es" },
    { locale: "fr" },
    { locale: "zh" },
    { locale: "ja" },
    { locale: "ko" },
    { locale: "th" },
  ];
}

// Structured Data for Android Tablet VPN List
function AndroidTabletVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for Android Tablets 2026",
    description: "Expert-tested VPN apps for Android tablets with split tunneling, APK sideloading, and optimized performance for Samsung, Lenovo, and Xiaomi tablets",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NordVPN",
        item: {
          "@type": "Product",
          name: "NordVPN for Android Tablets",
          description: "Fastest VPN for Android tablets with NordLynx protocol, tablet-optimized UI, and 95% rating",
          brand: { "@type": "Brand", name: "NordVPN" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "9.6",
              bestRating: "10",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Surfshark",
        item: {
          "@type": "Product",
          name: "Surfshark for Android Tablets",
          description: "Lightest Android tablet VPN app with GPS spoofing, unlimited devices, and 94% rating",
          brand: { "@type": "Brand", name: "Surfshark" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "9.2",
              bestRating: "10",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ExpressVPN",
        item: {
          "@type": "Product",
          name: "ExpressVPN for Android Tablets",
          description: "Best travel VPN for Android tablets with stable 4G/5G connection and 93% rating",
          brand: { "@type": "Brand", name: "ExpressVPN" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "9.4",
              bestRating: "10",
            },
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function AndroidTabletVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("androidTabletVpn");

  const s = await getTranslations("specs");

  // Cijfer en prijs komen uit vpn-data, niet uit deze pagina: ze stonden
  // hier los uitgeschreven en waren daardoor gaan afwijken van de rest
  // van de site. De score is afgeleid van datzelfde cijfer.
  const reviewCards = [
    {
      vpn: getVpnById("nordvpn")!,
      name: "NordVPN",
      accent: "purple" as const,
      badge: t("reviews.nordvpn.badge"),
      badgeClassName: "bg-purple-500 text-purple-950",
      badgeIcon: <Crown className="mr-1 size-3" aria-hidden="true" />,
      affiliateUrl: getVpnAffiliateUrl("nordvpn"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: "bg-purple-50 text-purple-700 border-purple-200",
      showRating: false,
      description: <>{t("reviews.nordvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("protocol")}</>, value: <>NordLynx</> },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("servers")}</>, value: <>7000+</> },
        { icon: <Settings className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("killSwitch")}</>, value: <>{s("yes")}</>, valueClassName: "text-green-600" },
        { icon: <Tablet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("tabletUi")}</>, value: <>{s("optimized")}</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.nordvpn.pros") as string[],
      cons: t.raw("reviews.nordvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} NordVPN</>,
    },
    {
      vpn: getVpnById("surfshark")!,
      name: "Surfshark",
      accent: undefined,
      badge: undefined,
      badgeClassName: undefined,
      badgeIcon: undefined,
      affiliateUrl: getVpnAffiliateUrl("surfshark"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: undefined,
      showRating: false,
      description: <>{t("reviews.surfshark.description")}</>,
      stats: [
        { icon: <Database className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.appSize")}</>, value: <>45MB</> },
        { icon: <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("gpsSpoofing")}</>, value: <>{s("yes")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("servers")}</>, value: <>3200+</> },
        { icon: <Tablet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("devices")}</>, value: <>{s("unlimited")}</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.surfshark.pros") as string[],
      cons: t.raw("reviews.surfshark.cons") as string[],
      cta: <>{t("reviews.getButton")} Surfshark</>,
    },
    {
      vpn: getVpnById("expressvpn")!,
      name: "ExpressVPN",
      accent: undefined,
      badge: undefined,
      badgeClassName: undefined,
      badgeIcon: undefined,
      affiliateUrl: getVpnAffiliateUrl("expressvpn"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: undefined,
      showRating: false,
      description: <>{t("reviews.expressvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("protocol")}</>, value: <>Lightway</> },
        { icon: <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("countries")}</>, value: <>94</> },
        { icon: <Wifi className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("mobileStability")}</>, value: <>{s("excellent")}</>, valueClassName: "text-green-600" },
        { icon: <Settings className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("splitTunnel")}</>, value: <>{s("yes")}</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.expressvpn.pros") as string[],
      cons: t.raw("reviews.expressvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} ExpressVPN</>,
    },
  ];

  return (
    <>
      <AndroidTabletVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-background" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Tablet className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("hero.title")}
              </h1>
              <div className="flex justify-center">
                <LastUpdated locale={locale} />
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Why Android Tablet Needs VPN */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("why.title")}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(t.raw("why.items") as string[]).map((item, i) => {
                  const icons = [Monitor, Wifi, Download, SplitSquareVertical, Gamepad2, Shield];
                  const colors = ["text-purple-500", "text-orange-500", "text-blue-500", "text-green-500", "text-pink-500", "text-red-500"];
                  const Icon = icons[i];

                  return (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Icon className={`h-6 w-6 ${colors[i]}`} />
                          <CardTitle className="text-lg">{item}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="py-12 border-y">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("comparison.title")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">{t("comparison.vpn")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.rating")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.protocol")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.tabletOptimized")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50 bg-purple-50/50 dark:bg-purple-950/20">
                    <td className="p-4 font-medium">NordVPN</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">95%</span>
                        <Badge variant="secondary" className="ml-2 text-xs bg-purple-100 text-purple-700">
                          Recommended
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">NordLynx</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">${getVpnById("nordvpn")!.priceTwoYear}/month</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4">
                      <span className="font-semibold">94%</span>
                    </td>
                    <td className="p-4">WireGuard</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">${getVpnById("surfshark")!.priceTwoYear}/month</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4">
                      <span className="font-semibold">93%</span>
                    </td>
                    <td className="p-4">Lightway</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">${getVpnById("expressvpn")!.priceTwoYear}/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Top 3 VPNs for Android Tablets - Detailed Reviews */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("reviews.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("reviews.subtitle")}
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {/* NordVPN */}
              {reviewCards.map((card, index) => (
                <VpnReviewCard
                  key={card.vpn.id}
                  rank={index + 1}
                  name={card.name}
                  vpnId={card.vpn.id}
                  affiliateUrl={card.affiliateUrl}
                  accent={card.accent}
                  badge={card.badge}
                  badgeClassName={card.badgeClassName}
                  badgeIcon={card.badgeIcon}
                  score={
                    card.score === "percent"
                      ? `${Math.round(card.vpn.overallRating * 20)}%`
                      : card.score === "outOfFive"
                        ? `${card.vpn.overallRating}/5`
                        : card.scoreLiteral
                  }
                  scoreIcon={card.scoreIcon}
                  scoreMono={card.score !== "literal"}
                  scoreClassName={card.scoreClassName}
                  rating={card.showRating ? card.vpn.overallRating : undefined}
                  description={card.description}
                  stats={card.stats}
                  pros={card.pros}
                  cons={card.cons}
                  labels={{ pros: <>{t("reviews.pros")}</>, cons: <>{t("reviews.cons")}</>, cta: card.cta }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Android Tablet Specific Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("features.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <SplitSquareVertical className="h-5 w-5 text-blue-500" />
                      {t("features.splitTunneling.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.splitTunneling.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Download className="h-5 w-5 text-purple-500" />
                      {t("features.apkSideload.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.apkSideload.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-green-500" />
                      {t("features.customDns.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.customDns.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      {t("features.alwaysOn.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.alwaysOn.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tablet className="h-5 w-5 text-orange-500" />
                      {t("features.widgets.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.widgets.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      {t("features.gpsSpoofing.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.gpsSpoofing.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Android Tablets */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("tablets.title")}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("tablets.samsung.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{t("tablets.samsung.models")}</p>
                    <Badge variant="secondary" className="text-xs">{t("tablets.samsung.status")}</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("tablets.lenovo.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{t("tablets.lenovo.models")}</p>
                    <Badge variant="secondary" className="text-xs">{t("tablets.lenovo.status")}</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("tablets.xiaomi.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{t("tablets.xiaomi.models")}</p>
                    <Badge variant="secondary" className="text-xs">{t("tablets.xiaomi.status")}</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guide */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("setup.title")}</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    {(t.raw("setup.steps") as string[]).map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                          {i + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-muted-foreground">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Streaming on Android Tablet */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("streaming.title")}</h2>
              <p className="text-center text-muted-foreground mb-8">
                {t("streaming.description")}
              </p>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {(t.raw("streaming.services") as string[]).map((service, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gaming VPN for Android Tablet */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("gaming.title")}</h2>
              <p className="text-center text-muted-foreground mb-8">
                {t("gaming.description")}
              </p>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {(t.raw("gaming.games") as string[]).map((game, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Gamepad2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span>{game}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Torrenting on Android Tablet */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("torrenting.title")}</h2>
              <Card className="border-orange-200 dark:border-orange-900">
                <CardHeader>
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    <CardTitle className="text-lg">Warning</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("torrenting.warning")}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Requirements:</h4>
                    <ul className="space-y-2">
                      {(t.raw("torrenting.requirements") as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Is Android Tablet VPN Safe? */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("safety.title")}</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-2">
                    {(t.raw("safety.tips") as string[]).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Free Android Tablet VPNs to Avoid */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">{t("avoid.title")}</h2>
              <p className="text-center text-muted-foreground mb-8">{t("avoid.description")}</p>
              <Card className="border-red-200 dark:border-red-900">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {(t.raw("avoid.reasons") as string[]).map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <RelatedPages
              title="Related Guides"
              pages={[
                {
                  title: "All Tablet VPNs",
                  description: "Complete comparison of VPN services for all tablet types",
                  href: "/best/vpn-tablet",
                  icon: "monitor",
                },
                {
                  title: "VPN for Android",
                  description: "Best VPN apps for Android smartphones with advanced features",
                  href: "/best/vpn-android",
                  icon: "smartphone",
                },
                {
                  title: "VPN Privacy Guide",
                  description: "Learn how VPNs protect your privacy and online security",
                  href: "/guides/vpn-privacy-guide",
                  icon: "shield",
                },
              ]}
            />
          </div>
        </section>

        {/* Conclusion & CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-500/10 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{t("conclusion.title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("conclusion.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <AffiliateButton
                  vpnId="nordvpn"
                  vpnName="NordVPN"
                  affiliateUrl={getVpnAffiliateUrl("nordvpn")}
                  size="lg"
                >
                  {t("conclusion.getBest", { discount: getRequiredDiscountPercent("surfshark") })}
                </AffiliateButton>
                <AffiliateButton
                  vpnId="surfshark"
                  vpnName="Surfshark"
                  affiliateUrl={getVpnAffiliateUrl("surfshark")}
                  size="lg"
                  variant="outline"
                >
                  {t("conclusion.getValue", { discount: getRequiredDiscountPercent("surfshark") })}
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
