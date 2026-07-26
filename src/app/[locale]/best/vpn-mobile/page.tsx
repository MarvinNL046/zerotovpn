import { setRequestLocale } from "next-intl/server";
import { getLocalizedMonthYear } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import {
  VpnReviewCard,
  type VpnReviewScoreKind,
} from "@/components/vpn/vpn-review-card";
import { getVpnById } from "@/lib/vpn-data";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Server,
  Wifi,
  Battery,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { generateAlternates } from "@/lib/seo-utils";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";

import { getMoneyBackDays, getRequiredDiscountPercent } from "@/lib/vpn-discount";
type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mobileVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("meta.title", { month: getLocalizedMonthYear(locale) }),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title", { month: getLocalizedMonthYear(locale) }),
      description: t("meta.description"),
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-mobile", locale),
  };
}

// Generate static params for all supported locales
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

// Structured Data for Mobile VPN List
function MobileVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Mobile VPN Services 2026",
    description: "Expert-tested mobile VPN services for iPhone and Android with comparison of features, battery usage, and performance",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Surfshark Mobile VPN",
        item: {
          "@type": "Product",
          name: "Surfshark",
          description: `Best mobile VPN with unlimited devices and ${getRequiredDiscountPercent("surfshark")}% OFF deal`,
          brand: { "@type": "Brand", name: "Surfshark" },
          offers: {
            "@type": "Offer",
            price: 2.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.6",
              bestRating: "5",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "NordVPN Mobile",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Fastest mobile VPN with NordLynx protocol and 30-day guarantee",
          brand: { "@type": "Brand", name: "NordVPN" },
          offers: {
            "@type": "Offer",
            price: 3.09,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.8",
              bestRating: "5",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ExpressVPN Mobile",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Best mobile VPN for travel, works in China and UAE",
          brand: { "@type": "Brand", name: "ExpressVPN" },
          offers: {
            "@type": "Offer",
            price: 3.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.70",
              bestRating: "5",
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

export default async function MobileVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("mobileVpn");

  // Cijfer en prijs komen uit vpn-data, niet uit deze pagina: ze stonden
  // hier los uitgeschreven en waren daardoor gaan afwijken van de rest
  // van de site. De score is afgeleid van datzelfde cijfer.
  const reviewCards = [
    {
      vpn: getVpnById("surfshark")!,
      name: "Surfshark",
      accent: "blue" as const,
      badge: t("reviews.surfshark.badge"),
      badgeClassName: "bg-blue-500 text-white",
      badgeIcon: <Crown className="mr-1 size-3" aria-hidden="true" />,
      affiliateUrl: getVpnAffiliateUrl("surfshark"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: "bg-blue-50 text-blue-700 border-blue-200",
      showRating: true,
      description: <>{t("reviews.surfshark.description")}</>,
      stats: [
        { icon: <Smartphone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>{t("reviews.unlimited")}</>, valueClassName: "text-green-600" },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.low")}</>, valueClassName: "text-green-600" },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>90/100</> },
        { icon: <Shield className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.security")}</>, value: <>95/100</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.surfshark.pros") as string[],
      cons: t.raw("reviews.surfshark.cons") as string[],
      cta: <>{t("reviews.getButton")} Surfshark - {getRequiredDiscountPercent("surfshark")}% OFF</>,
    },
    {
      vpn: getVpnById("nordvpn")!,
      name: "NordVPN",
      accent: undefined,
      badge: undefined,
      badgeClassName: undefined,
      badgeIcon: undefined,
      affiliateUrl: getVpnAffiliateUrl("nordvpn"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: "bg-green-50 text-green-700 border-green-200",
      showRating: true,
      description: <>{t("reviews.nordvpn.description")}</>,
      stats: [
        { icon: <Smartphone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>10</> },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.moderate")}</> },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>94/100</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.servers")}</>, value: <>7,400+</> },
      ],
      pros: t.raw("reviews.nordvpn.pros") as string[],
      cons: t.raw("reviews.nordvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} NordVPN</>,
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
      scoreClassName: "bg-purple-50 text-purple-700 border-purple-200",
      showRating: true,
      description: <>{t("reviews.expressvpn.description")}</>,
      stats: [
        { icon: <Smartphone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>8</> },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.moderate")}</> },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>96/100</>, valueClassName: "text-green-600" },
        { icon: <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.countries")}</>, value: <>105</> },
      ],
      pros: t.raw("reviews.expressvpn.pros") as string[],
      cons: t.raw("reviews.expressvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} ExpressVPN</>,
    },
  ];

  return (
    <>
      <MobileVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[
                { name: "Best VPNs", href: "/best/best-vpn" },
                { name: "Mobile VPNs", href: "/best/vpn-mobile" }
              ]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Smartphone className="h-3 w-3 mr-1" />
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

        {/* Why You Need Mobile VPN */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("why.title")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Wifi className="h-8 w-8 text-blue-500" />
                <h3 className="font-semibold">{t("why.publicWifi.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.publicWifi.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Shield className="h-8 w-8 text-green-500" />
                <h3 className="font-semibold">{t("why.dataProtection.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.dataProtection.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Globe className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">{t("why.travel.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.travel.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Zap className="h-8 w-8 text-orange-500" />
                <h3 className="font-semibold">{t("why.streaming.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.streaming.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Mobile VPNs - Detailed Reviews */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("reviews.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("reviews.subtitle")}
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Surfshark */}
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

        {/* Platform-Specific Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("platforms.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* iPhone/iOS */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    {t("platforms.ios.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t("platforms.ios.description")}</p>
                  <ul className="space-y-2">
                    {(t.raw("platforms.ios.features") as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/best/vpn-iphone" className="flex items-center gap-2">
                      {t("platforms.ios.readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Android */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    {t("platforms.android.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t("platforms.android.description")}</p>
                  <ul className="space-y-2">
                    {(t.raw("platforms.android.features") as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/best/vpn-android" className="flex items-center gap-2">
                      {t("platforms.android.readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("useCases.title")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {(t.raw("useCases.cases") as Array<{ title: string; description: string }>).map((useCase, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("performance.title")}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">{t("performance.vpn")}</th>
                      <th className="text-left p-4 font-semibold">{t("performance.speed")}</th>
                      <th className="text-left p-4 font-semibold">{t("performance.battery")}</th>
                      <th className="text-left p-4 font-semibold">{t("performance.protocol")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">NordVPN</td>
                      <td className="p-4"><span className="text-green-600 font-semibold">{t("performance.fastest")}</span></td>
                      <td className="p-4">{t("performance.moderate")}</td>
                      <td className="p-4">NordLynx</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Surfshark</td>
                      <td className="p-4">{t("performance.fast")}</td>
                      <td className="p-4"><span className="text-green-600 font-semibold">{t("performance.lowest")}</span></td>
                      <td className="p-4">WireGuard</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">ExpressVPN</td>
                      <td className="p-4"><span className="text-green-600 font-semibold">{t("performance.fastest")}</span></td>
                      <td className="p-4">{t("performance.moderate")}</td>
                      <td className="p-4">Lightway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guides */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("setup.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* iOS Setup */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("setup.ios.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 list-decimal list-inside">
                    {(t.raw("setup.ios.steps") as string[]).map((step, i) => (
                      <li key={i} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Android Setup */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("setup.android.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 list-decimal list-inside">
                    {(t.raw("setup.android.steps") as string[]).map((step, i) => (
                      <li key={i} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Is Mobile VPN Safe? */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Lock className="h-8 w-8 text-green-500" />
                <h2 className="text-3xl md:text-4xl font-bold">{t("safety.title")}</h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">{t("safety.description")}</p>

                <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      {t("safety.premium.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(t.raw("safety.premium.features") as string[]).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                      <XCircle className="h-5 w-5" />
                      {t("safety.free.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(t.raw("safety.free.dangers") as string[]).map((danger, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{danger}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Free VPNs to Avoid */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-3xl md:text-4xl font-bold">{t("avoid.title")}</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8">{t("avoid.description")}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {(t.raw("avoid.vpns") as Array<{ name: string; reason: string }>).map((vpn, i) => (
                  <Card key={i} className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        {vpn.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{vpn.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                  title: "VPN for iPhone",
                  description: "Best VPN apps optimized for iOS with excellent App Store ratings and battery efficiency",
                  href: "/best/vpn-iphone",
                  icon: "smartphone",
                },
                {
                  title: "VPN for Android",
                  description: "Top-rated Android VPN apps with split tunneling and GPS spoofing features",
                  href: "/best/vpn-android",
                  icon: "smartphone",
                },
                {
                  title: "VPN for Tablets",
                  description: "VPN solutions designed for tablets with optimized interfaces and multi-device support",
                  href: "/best/vpn-tablet",
                  icon: "monitor",
                },
                {
                  title: "Mobile VPN Setup Guide",
                  description: "Complete guide to installing and configuring VPN on your mobile device",
                  href: "/guides/vpn-on-mobile",
                  icon: "document",
                },
              ]}
            />
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">{t("conclusion.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("conclusion.description")}</p>

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Crown className="h-10 w-10 mx-auto text-blue-500" />
                    <h3 className="font-semibold">{t("conclusion.best.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("conclusion.best.description")}</p>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl={getVpnAffiliateUrl("surfshark")}
                    >
                      {t("conclusion.getBest", { discount: getRequiredDiscountPercent("surfshark") })}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Zap className="h-10 w-10 mx-auto text-green-500" />
                    <h3 className="font-semibold">{t("conclusion.fastest.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("conclusion.fastest.description")}</p>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl={getVpnAffiliateUrl("nordvpn")}
                    >
                      {t("conclusion.getFastest", { days: getMoneyBackDays("nordvpn") ?? 30 })}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Globe className="h-10 w-10 mx-auto text-purple-500" />
                    <h3 className="font-semibold">{t("conclusion.travel.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("conclusion.travel.description")}</p>
                    <AffiliateButton
                      vpnId="expressvpn"
                      vpnName="ExpressVPN"
                      affiliateUrl={getVpnAffiliateUrl("expressvpn")}
                    >
                      {t("conclusion.getTravel", { discount: getRequiredDiscountPercent("expressvpn") })}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
