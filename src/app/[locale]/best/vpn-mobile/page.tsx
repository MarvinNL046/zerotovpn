import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Clock,
  Server,
  Wifi,
  Battery,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mobileVpn" });

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

// Structured Data for Mobile VPN List
function MobileVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Mobile VPN Services 2025",
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
          description: "Best mobile VPN with unlimited devices and 82% OFF deal",
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
        position: 2,
        name: "NordVPN Mobile",
        item: {
          "@type": "Product",
          name: "NordVPN",
          description: "Fastest mobile VPN with NordLynx protocol and 30-day guarantee",
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
        position: 3,
        name: "ExpressVPN Mobile",
        item: {
          "@type": "Product",
          name: "ExpressVPN",
          description: "Best mobile VPN for travel, works in China and UAE",
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

export default async function MobileVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("mobileVpn");

  return (
    <>
      <MobileVpnListSchema />

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
              <Card className="border-2 border-blue-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-blue-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.surfshark.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      1. Surfshark
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        95%
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
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.unlimited")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.battery")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.low")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.speed")}</div>
                        <div className="font-semibold">90/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.security")}</div>
                        <div className="font-semibold text-green-600">95/100</div>
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

              {/* NordVPN */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      2. NordVPN
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        93%
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
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">10</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.battery")}</div>
                        <div className="font-semibold">{t("reviews.moderate")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.speed")}</div>
                        <div className="font-semibold text-green-600">94/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">7,400+</div>
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
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">8</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.battery")}</div>
                        <div className="font-semibold">{t("reviews.moderate")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.speed")}</div>
                        <div className="font-semibold text-green-600">96/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.countries")}</div>
                        <div className="font-semibold">105</div>
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
                      affiliateUrl="https://go.zerotovpn.com/surfshark"
                    >
                      {t("conclusion.getBest")}
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
                      affiliateUrl="https://go.zerotovpn.com/nordvpn"
                    >
                      {t("conclusion.getFastest")}
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
