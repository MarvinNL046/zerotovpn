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
  CheckCircle,
  XCircle,
  Crown,
  Server,
  Monitor,
  Database,
  Wifi,
  Star,
  Award,
  Tablet,
  Split,
  Users,
  Play,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";
import { OG_LOCALE_MAP, generateAlternates } from "@/lib/seo-utils";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";

import { getRequiredDiscountPercent } from "@/lib/vpn-discount";
type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ipadVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: t("meta.title"),
      description: t("meta.description"),
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-ipad", locale),
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

// Structured Data for iPad VPN List
function IpadVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for iPad (iPadOS) 2026",
    description: "Expert-tested VPN apps for iPad with iPadOS optimization, multitasking support, and large-screen interface",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NordVPN for iPad",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Best iPad VPN with optimized interface, NordLynx protocol, and split tunneling",
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
        position: 2,
        name: "Surfshark for iPad",
        item: {
          "@type": "Product",
          name: "Surfshark",
          description: "Best value iPad VPN with unlimited devices and Family Sharing support",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "ExpressVPN for iPad",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Most stable iPad VPN for travel and restricted countries",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function IpadVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ipadVpn");

  const s = await getTranslations("specs");

  // Cijfer en prijs komen uit vpn-data, niet uit deze pagina: ze stonden
  // hier los uitgeschreven en waren daardoor gaan afwijken van de rest
  // van de site. De score is afgeleid van datzelfde cijfer.
  const reviewCards = [
    {
      vpn: getVpnById("nordvpn")!,
      name: "NordVPN",
      accent: "blue" as const,
      badge: t("reviews.nordvpn.badge"),
      badgeClassName: "bg-blue-500 text-blue-950",
      badgeIcon: <Crown className="mr-1 size-3" aria-hidden="true" />,
      affiliateUrl: getVpnAffiliateUrl("nordvpn"),
      score: "outOfFive" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: undefined,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.nordvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("protocol")}</>, value: <>NordLynx</> },
        { icon: <Split className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("splitTunnel")}</>, value: <>{s("yes")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("servers")}</>, value: <>6400+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("devices")}</>, value: <>10</> },
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
      score: "outOfFive" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: undefined,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.surfshark.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("protocol")}</>, value: <>WireGuard</> },
        { icon: <Split className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("splitTunnel")}</>, value: <>{s("yes")}</>, valueClassName: "text-green-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("servers")}</>, value: <>3200+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("devices")}</>, value: <>{s("unlimited")}</> },
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
      score: "outOfFive" as VpnReviewScoreKind | undefined,
      scoreIcon: <Star className="h-3 w-3 mr-1 fill-yellow-700" aria-hidden="true" />,
      scoreLiteral: undefined,
      scoreClassName: "bg-yellow-50 text-yellow-700 border-yellow-200",
      showRating: false,
      description: <>{t("reviews.expressvpn.description")}</>,
      stats: [
        { icon: <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("protocol")}</>, value: <>Lightway</> },
        { icon: <Split className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("splitTunnel")}</>, value: <>{s("no")}</>, valueClassName: "text-orange-600" },
        { icon: <Server className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("servers")}</>, value: <>3000+</> },
        { icon: <Monitor className="h-4 w-4 text-muted-foreground" aria-hidden="true" />, label: <>{s("devices")}</>, value: <>8</> },
      ],
      pros: t.raw("reviews.expressvpn.pros") as string[],
      cons: t.raw("reviews.expressvpn.cons") as string[],
      cta: <>{t("reviews.getButton")} ExpressVPN</>,
    },
  ];

  return (
    <>
      <IpadVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-background" />
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

        {/* Quick Comparison Table */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("comparison.title")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">{t("comparison.vpn")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.interface")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.splitTunnel")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.multitasking")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">NordVPN</td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">${getVpnById("nordvpn")!.priceTwoYear}/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </td>
                    <td className="p-4 text-green-600">{t("comparison.good")}</td>
                    <td className="p-4">${getVpnById("surfshark")!.priceTwoYear}/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4 text-green-600">{t("comparison.good")}</td>
                    <td className="p-4">
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">${getVpnById("expressvpn")!.priceTwoYear}/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why iPad Needs VPN */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("why.title")}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Monitor className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("why.largeScreen.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("why.largeScreen.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Wifi className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("why.publicWifi.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("why.publicWifi.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("why.familySharing.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("why.familySharing.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 VPNs for iPad - Detailed Reviews */}
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

        {/* iPadOS-Specific Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("features.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("features.profiles.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.profiles.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("features.familySharing.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.familySharing.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("features.privacyLabels.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.privacyLabels.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Split className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">{t("features.multitasking.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("features.multitasking.description")}
                    </p>
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
                {t("setup.title")}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    {(t.raw("setup.steps") as string[]).map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Streaming on iPad */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("streaming.title")}
              </h2>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground">{t("streaming.description")}</p>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Streaming Services:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {(t.raw("streaming.services") as string[]).map((service, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Play className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Is iPad VPN Safe? */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("safety.title")}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">{t("safety.description")}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        {t("safety.premium.title")}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {(t.raw("safety.premium.features") as string[]).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-semibold mb-3 text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        {t("safety.free.title")}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {(t.raw("safety.free.dangers") as string[]).map((danger, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>{danger}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Free iPad VPNs to Avoid */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("avoid.title")}
              </h2>
              <Card className="border-orange-500/50">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">{t("avoid.description")}</p>
                  <div className="space-y-3">
                    {(t.raw("avoid.vpns") as { name: string; reason: string }[]).map((vpn, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                        <XCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">{vpn.name}</p>
                          <p className="text-sm text-muted-foreground">{vpn.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  title: "VPN for iPhone",
                  description: "Best VPN apps optimized for iPhone with iOS features",
                  href: "/best/vpn-iphone",
                  icon: "smartphone",
                },
                {
                  title: "VPN for Streaming",
                  description: "Access global streaming services with the best VPNs",
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
                      Best Overall
                    </Badge>
                    <CardTitle className="text-xl">NordVPN</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Best iPad interface with NordLynx protocol and split tunneling
                    </p>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl={getVpnAffiliateUrl("nordvpn")}
                    >
                      {t("conclusion.getBest", { discount: getRequiredDiscountPercent("surfshark") })}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Badge variant="secondary" className="mx-auto mb-2">
                      Best Value
                    </Badge>
                    <CardTitle className="text-xl">Surfshark</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Unlimited devices and Family Sharing support at the best price
                    </p>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl={getVpnAffiliateUrl("surfshark")}
                    >
                      {t("conclusion.getValue", { discount: getRequiredDiscountPercent("surfshark") })}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Badge variant="secondary" className="mx-auto mb-2">
                      Best for Travel
                    </Badge>
                    <CardTitle className="text-xl">ExpressVPN</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Most stable connections for travel and restricted countries
                    </p>
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
