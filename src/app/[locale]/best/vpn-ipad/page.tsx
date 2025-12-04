import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
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

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ipadVpn" });

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
    name: "Best VPN for iPad (iPadOS) 2025",
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.6",
            bestRating: "5",
            ratingCount: "360000",
          },
          offers: {
            "@type": "Offer",
            price: 3.39,
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            bestRating: "5",
            ratingCount: "180000",
          },
          offers: {
            "@type": "Offer",
            price: 2.19,
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            bestRating: "5",
            ratingCount: "580000",
          },
          offers: {
            "@type": "Offer",
            price: 6.67,
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
                    <td className="p-4">$3.39/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </td>
                    <td className="p-4 text-green-600">{t("comparison.good")}</td>
                    <td className="p-4">$2.19/mo</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4 text-green-600">{t("comparison.good")}</td>
                    <td className="p-4">
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="p-4 text-green-600">{t("comparison.excellent")}</td>
                    <td className="p-4">$6.67/mo</td>
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
              <Card className="border-2 border-blue-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-blue-500 text-blue-950">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.nordvpn.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 flex-wrap">
                    1. NordVPN
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="h-3 w-3 mr-1 fill-yellow-700" />
                      4.6/5
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.nordvpn.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">NordLynx</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Split className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Split Tunnel</div>
                        <div className="font-semibold text-green-600">Yes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Servers</div>
                        <div className="font-semibold">6400+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold">10</div>
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
                  <CardTitle className="text-2xl flex items-center gap-3 flex-wrap">
                    2. Surfshark
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="h-3 w-3 mr-1 fill-yellow-700" />
                      4.5/5
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.surfshark.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">WireGuard</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Split className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Split Tunnel</div>
                        <div className="font-semibold text-green-600">Yes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Servers</div>
                        <div className="font-semibold">3200+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold">Unlimited</div>
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
                    {t("reviews.getButton")} Surfshark
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* ExpressVPN */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 flex-wrap">
                    3. ExpressVPN
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="h-3 w-3 mr-1 fill-yellow-700" />
                      4.7/5
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.expressvpn.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Protocol</div>
                        <div className="font-semibold">Lightway</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Split className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Split Tunnel</div>
                        <div className="font-semibold text-orange-600">No</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Servers</div>
                        <div className="font-semibold">3000+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold">8</div>
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
                      affiliateUrl="https://go.zerotovpn.com/nordvpn"
                    >
                      {t("conclusion.getBest")}
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
                      affiliateUrl="https://go.zerotovpn.com/surfshark"
                    >
                      {t("conclusion.getValue")}
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
