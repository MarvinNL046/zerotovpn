import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  TrendingUp,
  Clock,
  ArrowRight,
  Server,
  Tablet,
  Database,
  Wifi,
  Eye,
  MapPin,
  Settings,
  Download,
  Gamepad2,
  Monitor,
  SplitSquareVertical,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

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
    name: "Best VPN for Android Tablets 2025",
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "9.5",
            bestRating: "10",
            worstRating: "1",
            ratingCount: "12847",
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "9.4",
            bestRating: "10",
            worstRating: "1",
            ratingCount: "9532",
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
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "9.3",
            bestRating: "10",
            worstRating: "1",
            ratingCount: "11204",
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
                    <td className="p-4 font-semibold">$3.39/month</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4">
                      <span className="font-semibold">94%</span>
                    </td>
                    <td className="p-4">WireGuard</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">$2.19/month</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4">
                      <span className="font-semibold">93%</span>
                    </td>
                    <td className="p-4">Lightway</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">$6.67/month</td>
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
              <Card className="border-2 border-purple-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-purple-500 text-purple-950">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.nordvpn.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    1. NordVPN
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      95%
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
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Servers</div>
                        <div className="font-semibold">7000+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Kill Switch</div>
                        <div className="font-semibold text-green-600">Yes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Tablet UI</div>
                        <div className="font-semibold text-green-600">Optimized</div>
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
                  <CardTitle className="text-2xl flex items-center gap-3">
                    2. Surfshark
                    <Badge variant="outline">94%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.surfshark.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.appSize")}</div>
                        <div className="font-semibold">45MB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">GPS Spoofing</div>
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
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Devices</div>
                        <div className="font-semibold text-green-600">Unlimited</div>
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
                  <CardTitle className="text-2xl flex items-center gap-3">
                    3. ExpressVPN
                    <Badge variant="outline">93%</Badge>
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
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Countries</div>
                        <div className="font-semibold">94</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Mobile Stability</div>
                        <div className="font-semibold text-green-600">Excellent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Split Tunnel</div>
                        <div className="font-semibold text-green-600">Yes</div>
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
                  affiliateUrl="https://go.zerotovpn.com/nordvpn"
                  size="lg"
                >
                  {t("conclusion.getBest")}
                </AffiliateButton>
                <AffiliateButton
                  vpnId="surfshark"
                  vpnName="Surfshark"
                  affiliateUrl="https://go.zerotovpn.com/surfshark"
                  size="lg"
                  variant="outline"
                >
                  {t("conclusion.getValue")}
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
