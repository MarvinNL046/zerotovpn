import { setRequestLocale } from "next-intl/server";
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
  Tablet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Wifi,
  Globe,
  Lock,
  ArrowRight,
  Plane,
  Monitor,
  Video,
  Server,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { generateAlternates } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tabletVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-tablet", locale),
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

// Structured Data for Tablet VPN List
function TabletVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Tablet VPN Services 2026",
    description: "Expert-tested tablet VPN services for iPad, Android tablets, and Windows tablets with comparison of features and performance",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NordVPN Tablet VPN",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Best overall tablet VPN with NordLynx speed and split tunneling",
          brand: { "@type": "Brand", name: "NordVPN" },
          offers: {
            "@type": "Offer",
            price: 3.09,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            bestRating: "5",
            worstRating: "1",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Surfshark Tablet",
        item: {
          "@type": "Product",
          name: "Surfshark",
          description: "Best price tablet VPN with unlimited devices and family-friendly features",
          brand: { "@type": "Brand", name: "Surfshark" },
          offers: {
            "@type": "Offer",
            price: 2.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.6",
            bestRating: "5",
            worstRating: "1",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ExpressVPN Tablet",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Best tablet VPN for travel, works in China and UAE",
          brand: { "@type": "Brand", name: "ExpressVPN" },
          offers: {
            "@type": "Offer",
            price: 3.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.70",
            bestRating: "5",
            worstRating: "1",
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

export default async function TabletVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tabletVpn");

  // Cijfer en prijs komen uit vpn-data, niet uit deze pagina: ze stonden
  // hier los uitgeschreven en waren daardoor gaan afwijken van de rest
  // van de site. De score is afgeleid van datzelfde cijfer.
  const reviewCards = [
    {
      vpn: getVpnById("nordvpn")!,
      name: "NordVPN",
      accent: "blue" as const,
      badge: t("reviews.nordvpn.badge"),
      badgeClassName: "bg-blue-500 text-white",
      badgeIcon: <Crown className="mr-1 size-3" aria-hidden="true" />,
      affiliateUrl: getVpnAffiliateUrl("nordvpn"),
      score: "percent" as VpnReviewScoreKind | undefined,
      scoreIcon: undefined,
      scoreLiteral: undefined,
      scoreClassName: "bg-blue-50 text-blue-700 border-blue-200",
      showRating: true,
      description: <>{t("reviews.nordvpn.description")}</>,
      stats: [
        { icon: <Tablet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>10</> },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>94/100</>, valueClassName: "text-green-600" },
        { icon: <Shield className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>Security</>, value: <>95/100</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.servers")}</>, value: <>7,400+</> },
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
      scoreClassName: "bg-green-50 text-green-700 border-green-200",
      showRating: true,
      description: <>{t("reviews.surfshark.description")}</>,
      stats: [
        { icon: <Tablet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>{t("reviews.unlimited")}</>, valueClassName: "text-green-600" },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>90/100</> },
        { icon: <Shield className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>Security</>, value: <>95/100</>, valueClassName: "text-green-600" },
        { icon: <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>Price</>, value: <>${getVpnById("surfshark")!.priceTwoYear}/mo</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.surfshark.pros") as string[],
      cons: t.raw("reviews.surfshark.cons") as string[],
      cta: <>{t("reviews.getButton")} Surfshark - 82% OFF</>,
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
        { icon: <Tablet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>8</> },
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.speed")}</>, value: <>96/100</>, valueClassName: "text-green-600" },
        { icon: <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.countries")}</>, value: <>105</> },
        { icon: <Plane className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>Travel</>, value: <>Best</>, valueClassName: "text-green-600" },
      ],
      pros: t.raw("reviews.expressvpn.pros") as string[],
      cons: t.raw("reviews.expressvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} ExpressVPN</>,
    },
  ];

  return (
    <>
      <TabletVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[
                { name: "Best VPNs", href: "/best/best-vpn" },
                { name: "Tablet VPNs", href: "/best/vpn-tablet" }
              ]}
              className="mb-6"
            />
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

        {/* Why You Need Tablet VPN */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("why.title")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Wifi className="h-8 w-8 text-blue-500" />
                <h3 className="font-semibold">{t("why.publicWifi.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.publicWifi.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Shield className="h-8 w-8 text-green-500" />
                <h3 className="font-semibold">{t("why.tracking.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.tracking.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Video className="h-8 w-8 text-red-500" />
                <h3 className="font-semibold">{t("why.streaming.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.streaming.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Monitor className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">{t("why.largeScreen.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.largeScreen.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Plane className="h-8 w-8 text-orange-500" />
                <h3 className="font-semibold">{t("why.travel.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.travel.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Zap className="h-8 w-8 text-yellow-500" />
                <h3 className="font-semibold">{t("why.throttling.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.throttling.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Tablet VPNs - Detailed Reviews */}
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

        {/* Platform-Specific Sections */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("platforms.title")}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* iPad */}
              <Card className="border-2 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tablet className="h-5 w-5 text-blue-500" />
                    {t("platforms.ipad.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t("platforms.ipad.description")}</p>
                  <ul className="space-y-2">
                    {(t.raw("platforms.ipad.features") as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/best/vpn-ipad" className="flex items-center gap-2">
                      {t("platforms.ipad.readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Android Tablet */}
              <Card className="border-2 hover:border-green-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tablet className="h-5 w-5 text-green-500" />
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
                    <Link href="/best/vpn-android-tablet" className="flex items-center gap-2">
                      {t("platforms.android.readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Windows Tablet */}
              <Card className="border-2 hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-purple-500" />
                    {t("platforms.windows.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t("platforms.windows.description")}</p>
                  <ul className="space-y-2">
                    {(t.raw("platforms.windows.features") as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/best/vpn-windows-tablet" className="flex items-center gap-2">
                      {t("platforms.windows.readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Streaming Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("streaming.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {["uk", "usa", "netherlands", "germany"].map((countryKey) => (
                <Card key={countryKey}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-500" />
                      {t(`streaming.${countryKey}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-semibold text-sm">{t(`streaming.${countryKey}.services`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`streaming.${countryKey}.recommended`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="flex items-center gap-3 justify-center mb-12">
              <Plane className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl md:text-4xl font-bold">{t("travel.title")}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {["airport", "hotel", "regionLocks", "socialMedia"].map((scenarioKey) => (
                <Card key={scenarioKey}>
                  <CardHeader>
                    <CardTitle className="text-lg">{t(`travel.${scenarioKey}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t(`travel.${scenarioKey}.description`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Is Tablet VPN Safe? */}
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
                  title: "VPN for Mobile",
                  description: "Best VPN apps for smartphones with optimized mobile performance",
                  href: "/best/vpn-mobile",
                  icon: "smartphone",
                },
                {
                  title: "VPN for iPad",
                  description: "Specialized VPN solutions for iPad with iPadOS optimization",
                  href: "/best/vpn-ipad",
                  icon: "monitor",
                },
                {
                  title: "VPN for Android Tablet",
                  description: "Best VPNs for Android tablets with split tunneling and GPS spoofing",
                  href: "/best/vpn-android-tablet",
                  icon: "monitor",
                },
                {
                  title: "VPN for Windows Tablet",
                  description: "Complete VPN solutions for Windows tablets and Surface devices",
                  href: "/best/vpn-windows-tablet",
                  icon: "laptop",
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
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl={getVpnAffiliateUrl("nordvpn")}
                    >
                      {t("conclusion.getBest")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Globe className="h-10 w-10 mx-auto text-green-500" />
                    <h3 className="font-semibold">{t("conclusion.value.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("conclusion.value.description")}</p>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl={getVpnAffiliateUrl("surfshark")}
                    >
                      {t("conclusion.getValue")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Plane className="h-10 w-10 mx-auto text-purple-500" />
                    <h3 className="font-semibold">{t("conclusion.travel.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("conclusion.travel.description")}</p>
                    <AffiliateButton
                      vpnId="expressvpn"
                      vpnName="ExpressVPN"
                      affiliateUrl={getVpnAffiliateUrl("expressvpn")}
                    >
                      {t("conclusion.getTravel")}
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
