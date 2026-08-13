import { setRequestLocale } from "next-intl/server";
import { DEFAULT_OG_IMAGE, OG_LOCALE_MAP, getLocalizedMonthYear, stripBrand, titelMetMerk } from "@/lib/seo-utils";
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
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Server,
  Monitor,
  Database,
  Wifi,
  Smartphone,
  Battery,
  Star,
  Award,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";
import { generateAlternates } from "@/lib/seo-utils";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { IphoneVpnEditorialPage, iphoneVpnEditorialDescription, iphoneVpnEditorialTitle } from "@/components/editorial/iphone-vpn-editorial-page";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      metadataBase: new URL(baseUrl),
      title: { absolute: titelMetMerk(iphoneVpnEditorialTitle) },
      description: iphoneVpnEditorialDescription,
      openGraph: { locale: "en_US", title: iphoneVpnEditorialTitle, description: iphoneVpnEditorialDescription, type: "article", images: [DEFAULT_OG_IMAGE] },
      alternates: generateAlternates("/best/vpn-iphone", locale),
    };
  }
  const t = await getTranslations({ locale, namespace: "iphoneVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: titelMetMerk(stripBrand(t("meta.title", { month: getLocalizedMonthYear(locale) }))) },
    description: t("meta.description"),
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: stripBrand(t("meta.title", { month: getLocalizedMonthYear(locale) })),
      description: t("meta.description"),
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-iphone", locale),
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

// Structured Data for iPhone VPN List
function IphoneVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for iPhone & iOS 2026",
    description: "Expert-tested VPN apps for iPhone with native iOS support, optimal battery life, and App Store ratings",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ExpressVPN for iPhone",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Best overall iPhone VPN with Lightway protocol and 4.7 App Store rating",
          brand: { "@type": "Brand", name: "ExpressVPN" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.7",
              bestRating: "5",
            },
          },
          offers: {
            "@type": "Offer",
            price: 3.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "NordVPN for iPhone",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Best value iPhone VPN with NordLynx protocol and Siri Shortcuts",
          brand: { "@type": "Brand", name: "NordVPN" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.8",
              bestRating: "5",
            },
          },
          offers: {
            "@type": "Offer",
            price: 3.09,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Surfshark for iPhone",
        item: {
          "@type": "Product",
          name: "Surfshark",
          description: "Best budget iPhone VPN with unlimited devices and clean iOS design",
          brand: { "@type": "Brand", name: "Surfshark" },
          review: {
            "@type": "Review",
            author: { "@type": "Organization", name: "ZeroToVPN" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.6",
              bestRating: "5",
            },
          },
          offers: {
            "@type": "Offer",
            price: 2.49,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
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

export default async function IphoneVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") {
    const allVpns = await getAllVpns();
    return <IphoneVpnEditorialPage vpns={allVpns} />;
  }

  const t = await getTranslations("iphoneVpn");

  // Cijfer en prijs komen uit vpn-data, niet uit deze pagina: ze stonden
  // hier los uitgeschreven en waren daardoor gaan afwijken van de rest
  // van de site. De score is afgeleid van datzelfde cijfer.
  const reviewCards = [
    {
      vpn: getVpnById("expressvpn")!,
      name: "ExpressVPN",
      accent: "blue" as const,
      badge: t("reviews.expressvpn.badge"),
      badgeClassName: "bg-blue-500 text-blue-950",
      badgeIcon: <Crown className="mr-1 size-3" aria-hidden="true" />,
      affiliateUrl: getVpnAffiliateUrl("expressvpn"),
      score: "literal" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: <>{t("reviews.expressvpn.appStoreRating")}</>,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.expressvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.protocol")}</>, value: <>Lightway</> },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.excellent")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.servers")}</>, value: <>3000+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>8</> },
      ],
      pros: t.raw("reviews.expressvpn.pros") as string[],
      cons: t.raw("reviews.expressvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} ExpressVPN</>,
    },
    {
      vpn: getVpnById("nordvpn")!,
      name: "NordVPN",
      accent: undefined,
      badge: undefined,
      badgeClassName: undefined,
      badgeIcon: undefined,
      affiliateUrl: getVpnAffiliateUrl("nordvpn"),
      score: "literal" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: <>{t("reviews.nordvpn.appStoreRating")}</>,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.nordvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.protocol")}</>, value: <>NordLynx</> },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.excellent")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.servers")}</>, value: <>{getVpnById("nordvpn")!.servers.toLocaleString()}+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>10</> },
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
      score: "literal" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: <>{t("reviews.surfshark.appStoreRating")}</>,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.surfshark.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.protocol")}</>, value: <>WireGuard</> },
        { icon: <Battery className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.battery")}</>, value: <>{t("reviews.good")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.servers")}</>, value: <>3200+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{t("reviews.devices")}</>, value: <>{t("reviews.unlimited")}</> },
      ],
      pros: t.raw("reviews.surfshark.pros") as string[],
      cons: t.raw("reviews.surfshark.cons") as string[],
      cta: <>{t("reviews.getButton")} Surfshark</>,
    },
  ];

  return (
    <>
      <IphoneVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-background" />
          <div className="container relative">
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

        {/* Quick Comparison Table */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("comparison.title")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">{t("comparison.vpn")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.rating")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.protocol")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.battery")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.7</span>
                      </div>
                    </td>
                    <td className="p-4">Lightway</td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">${getVpnById("expressvpn")!.priceTwoYear}/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">NordVPN</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.6</span>
                      </div>
                    </td>
                    <td className="p-4">NordLynx</td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">${getVpnById("nordvpn")!.priceTwoYear}/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.5</span>
                      </div>
                    </td>
                    <td className="p-4">WireGuard</td>
                    <td className="p-4 text-green-600">{t("comparison.good")}</td>
                    <td className="p-4">${getVpnById("surfshark")!.priceTwoYear}/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why iPhone Needs VPN */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("whyIos.title")}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("whyIos.appStore.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyIos.appStore.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("whyIos.privacy.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyIos.privacy.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Wifi className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("whyIos.publicWifi.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyIos.publicWifi.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 VPNs for iPhone - Detailed Reviews */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("reviews.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("reviews.subtitle")}
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {/* ExpressVPN */}
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

        {/* iOS-Specific Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("iosFeatures.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Star className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("iosFeatures.appStore.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("iosFeatures.appStore.description")}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("iosFeatures.appStore.ratings") as string[]).map((rating, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{rating}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("iosFeatures.protocols.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("iosFeatures.protocols.description")}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("iosFeatures.protocols.list") as string[]).map((protocol, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{protocol}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Battery className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("iosFeatures.battery.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("iosFeatures.battery.description")}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("iosFeatures.battery.tips") as string[]).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Smartphone className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("iosFeatures.integration.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("iosFeatures.integration.description")}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("iosFeatures.integration.features") as string[]).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guide */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("setupGuide.title")}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-6">
                    {(t.raw("setupGuide.steps") as { title: string; description: string }[]).map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* iOS VPN Limitations */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("limitations.title")}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {(t.raw("limitations.items") as { title: string; description: string }[]).map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Free iPhone VPNs to Avoid */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("avoidFree.title")}
              </h2>
              <Card className="border-orange-500/50">
                <CardContent className="pt-6">
                  <div className="space-y-4 mb-6">
                    {(t.raw("avoidFree.reasons") as string[]).map((reason, i) => (
                      <div key={i} className="flex gap-3">
                        <XCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium mb-2">{t("avoidFree.recommendation.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("avoidFree.recommendation.description")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <RelatedPages
              title="Related Guides"
              pages={[
                {
                  title: "All Mobile VPNs",
                  description: "Comprehensive comparison of the best VPN apps for iPhone and Android devices",
                  href: "/best/vpn-mobile",
                  icon: "smartphone",
                },
                {
                  title: "VPN for iPad",
                  description: "Best VPN apps optimized for iPad with split-screen support and tablet-friendly interfaces",
                  href: "/best/vpn-ipad",
                  icon: "monitor",
                },
                {
                  title: "VPN for Streaming",
                  description: "Top VPN services for streaming Netflix, Hulu, BBC iPlayer and other platforms",
                  href: "/guides/vpn-for-streaming",
                  icon: "play",
                },
              ]}
            />
          </div>
        </section>

        {/* Conclusion & CTAs */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500/5 via-background to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">{t("conclusion.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("conclusion.description")}
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card className="text-center border-2 border-blue-500/50">
                  <CardHeader>
                    <Badge className="bg-blue-500 text-blue-950 mx-auto mb-2">
                      <Award className="h-3 w-3 mr-1" />
                      {t("conclusion.cards.best.badge")}
                    </Badge>
                    <CardTitle className="text-xl">ExpressVPN</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("conclusion.cards.best.description")}
                    </p>
                    <AffiliateButton
                      vpnId="expressvpn"
                      vpnName="ExpressVPN"
                      affiliateUrl={getVpnAffiliateUrl("expressvpn")}
                    >
                      {t("conclusion.tryButton")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Badge variant="secondary" className="mx-auto mb-2">
                      {t("conclusion.cards.value.badge")}
                    </Badge>
                    <CardTitle className="text-xl">NordVPN</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("conclusion.cards.value.description")}
                    </p>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl={getVpnAffiliateUrl("nordvpn")}
                    >
                      {t("conclusion.tryButton")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Badge variant="secondary" className="mx-auto mb-2">
                      {t("conclusion.cards.budget.badge")}
                    </Badge>
                    <CardTitle className="text-xl">Surfshark</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("conclusion.cards.budget.description")}
                    </p>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl={getVpnAffiliateUrl("surfshark")}
                    >
                      {t("conclusion.tryButton")}
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
