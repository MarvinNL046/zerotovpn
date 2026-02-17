import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import {
  Shield,
  Zap,
  Tablet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Monitor,
  Server,
  Lock,
  Globe,
  Laptop,
  Settings,
  Users,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";
import { LastUpdated } from "@/components/last-updated";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "windowsTabletVpn" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "article",
    },
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

// Structured Data for Windows Tablet VPN List
function WindowsTabletVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for Windows Tablets 2026",
    description: "Expert-tested VPN services for Windows tablets including Surface Pro and Surface Go with full Windows features",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NordVPN Windows Tablet",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Best Windows tablet VPN with native app, NordLynx protocol, and full kill switch",
          brand: { "@type": "Brand", name: "NordVPN" },
          offers: {
            "@type": "Offer",
            price: 2.99,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.65",
            bestRating: "5",
            worstRating: "1",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Surfshark Windows Tablet",
        item: {
          "@type": "Product",
          name: "Surfshark",
          description: "Best value Windows tablet VPN with unlimited devices and lightweight performance",
          brand: { "@type": "Brand", name: "Surfshark" },
          offers: {
            "@type": "Offer",
            price: 1.99,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.75",
            bestRating: "5",
            worstRating: "1",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ExpressVPN Windows Tablet",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Most stable Windows tablet VPN with Lightway protocol for travelers",
          brand: { "@type": "Brand", name: "ExpressVPN" },
          offers: {
            "@type": "Offer",
            price: 8.32,
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

export default async function WindowsTabletVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("windowsTabletVpn");

  return (
    <>
      <WindowsTabletVpnListSchema />

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

        {/* Why You Need VPN on Windows Tablet */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t("why.title")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Users className="h-8 w-8 text-blue-500" />
                <h3 className="font-semibold">{t("why.remoteWork.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.remoteWork.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Monitor className="h-8 w-8 text-green-500" />
                <h3 className="font-semibold">{t("why.fullWindows.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.fullWindows.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Globe className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">{t("why.travel.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.travel.description")}</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-background">
                <Shield className="h-8 w-8 text-orange-500" />
                <h3 className="font-semibold">{t("why.enterprise.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("why.enterprise.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Windows Tablet VPNs - Detailed Reviews */}
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
              <Card className="border-2 border-blue-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-blue-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.nordvpn.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      1. NordVPN
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        95%
                      </Badge>
                    </CardTitle>
                    <RatingStars rating={4.65} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.nordvpn.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold">10</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Speed</div>
                        <div className="font-semibold text-green-600">94/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Servers</div>
                        <div className="font-semibold">7,400+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">NordLynx</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.nordvpn.pros") as string[]).map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-600">{t("reviews.cons")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.nordvpn.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="nordvpn"
                    vpnName="NordVPN"
                    affiliateUrl="https://go.zerotovpn.com/nordvpn"
                    size="lg"
                  >
                    {t("reviews.getButton")} NordVPN
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* Surfshark */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      2. Surfshark
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        93%
                      </Badge>
                    </CardTitle>
                    <RatingStars rating={4.75} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.surfshark.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold text-green-600">Unlimited</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Speed</div>
                        <div className="font-semibold">90/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className="font-semibold text-green-600">Lightweight</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">WireGuard</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.surfshark.pros") as string[]).map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-600">{t("reviews.cons")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.surfshark.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="surfshark"
                    vpnName="Surfshark"
                    affiliateUrl="https://go.zerotovpn.com/surfshark"
                    size="lg"
                  >
                    {t("reviews.getButton")} Surfshark - 82% OFF
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* ExpressVPN */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      3. ExpressVPN
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        94%
                      </Badge>
                    </CardTitle>
                    <RatingStars rating={4.70} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.expressvpn.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold">8</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Speed</div>
                        <div className="font-semibold text-green-600">96/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Countries</div>
                        <div className="font-semibold">105</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">Lightway</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.expressvpn.pros") as string[]).map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-600">{t("reviews.cons")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.expressvpn.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="expressvpn"
                    vpnName="ExpressVPN"
                    affiliateUrl="https://go.zerotovpn.com/expressvpn"
                    size="lg"
                  >
                    {t("reviews.getButton")} ExpressVPN
                  </AffiliateButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Windows Tablet Specific Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("features.title")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-blue-500" />
                    {t("features.killSwitch.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("features.killSwitch.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5 text-blue-500" />
                    {t("features.splitTunneling.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("features.splitTunneling.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Monitor className="h-5 w-5 text-blue-500" />
                    {t("features.protocols.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("features.protocols.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tablet className="h-5 w-5 text-blue-500" />
                    {t("features.touchUi.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("features.touchUi.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="h-5 w-5 text-blue-500" />
                    {t("features.security.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("features.security.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Surface Pro & Surface Go Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("surface.title")}</h2>
            <p className="text-center text-muted-foreground mb-8">{t("surface.description")}</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Surface Pro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5" />
                    {t("surface.pro.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("surface.pro.description")}</p>
                </CardContent>
              </Card>

              {/* Surface Go */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tablet className="h-5 w-5" />
                    {t("surface.go.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("surface.go.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Setup Guide */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("setup.title")}</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-4 list-decimal list-inside">
                    {(t.raw("setup.steps") as string[]).map((step, i) => (
                      <li key={i} className="text-sm pl-2">{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Remote Work Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl md:text-4xl font-bold">{t("remoteWork.title")}</h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">{t("remoteWork.description")}</p>
                <ul className="space-y-3">
                  {(t.raw("remoteWork.benefits") as string[]).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Is Windows Tablet VPN Safe? */}
        <section className="py-16 lg:py-24 bg-muted/30">
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
        <section className="py-16 lg:py-24">
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
        <section className="py-16 lg:py-24">
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
                  title: "VPN for Travel",
                  description: "Stay secure while traveling with the best VPNs for travelers",
                  href: "/guides/vpn-for-travel",
                  icon: "globe",
                },
                {
                  title: "Public WiFi Safety",
                  description: "Learn how to stay safe on public WiFi networks",
                  href: "/guides/public-wifi-safety",
                  icon: "shield",
                },
              ]}
            />
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">{t("conclusion.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("conclusion.description")}</p>

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Crown className="h-10 w-10 mx-auto text-blue-500" />
                    <h3 className="font-semibold">NordVPN</h3>
                    <p className="text-sm text-muted-foreground">Best overall for Windows tablets</p>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl="https://go.zerotovpn.com/nordvpn"
                    >
                      {t("conclusion.getBest")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Zap className="h-10 w-10 mx-auto text-green-500" />
                    <h3 className="font-semibold">Surfshark</h3>
                    <p className="text-sm text-muted-foreground">Best value with unlimited devices</p>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl="https://go.zerotovpn.com/surfshark"
                    >
                      {t("conclusion.getValue")}
                    </AffiliateButton>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-4">
                    <Globe className="h-10 w-10 mx-auto text-purple-500" />
                    <h3 className="font-semibold">ExpressVPN</h3>
                    <p className="text-sm text-muted-foreground">Most stable for travel</p>
                    <AffiliateButton
                      vpnId="expressvpn"
                      vpnName="ExpressVPN"
                      affiliateUrl="https://go.zerotovpn.com/expressvpn"
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
