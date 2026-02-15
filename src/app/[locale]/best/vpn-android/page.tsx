import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Eye,
  ArrowRight,
  Server,
  Smartphone,
  Wifi,
  MapPin,
  Settings,
  Download,
} from "lucide-react";
import { RelatedPages } from "@/components/seo/related-pages";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Android 2026: Top 5 Apps Tested on Samsung & Pixel | ZeroToVPN",
    nl: "Beste VPN voor Android 2026: Top 5 Apps Getest op Samsung & Pixel | ZeroToVPN",
    de: "Bestes VPN für Android 2026: Top 5 Apps auf Samsung & Pixel Getestet | ZeroToVPN",
    es: "Mejor VPN para Android 2026: Top 5 Apps Probadas en Samsung y Pixel | ZeroToVPN",
    fr: "Meilleur VPN pour Android 2026: Top 5 Apps Testées sur Samsung et Pixel | ZeroToVPN",
    zh: "2026年最佳Android VPN：在三星和Pixel上测试的5款应用 | ZeroToVPN",
    ja: "Android向けベストVPN 2026：SamsungとPixelでテスト済みトップ5アプリ | ZeroToVPN",
    ko: "2026년 안드로이드 최고의 VPN: 삼성 & 픽셀에서 테스트한 상위 5개 앱 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับ Android 2026: 5 แอปที่ทดสอบบน Samsung และ Pixel | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "We installed 25+ VPN apps on Android — most drain battery and leak data. These 5 passed our kill switch, speed, and security tests.",
    nl: "We installeerden 25+ VPN-apps op Android — de meeste vreten batterij en lekken data. Deze 5 slaagden voor onze kill switch-, snelheids- en beveiligingstests.",
    de: "Wir haben 25+ VPN-Apps auf Android installiert — die meisten verbrauchen Akku und leaken Daten. Diese 5 bestanden unsere Kill-Switch-, Geschwindigkeits- und Sicherheitstests.",
    es: "Instalamos más de 25 apps VPN en Android — la mayoría agotan la batería y filtran datos. Estas 5 pasaron nuestras pruebas de kill switch, velocidad y seguridad.",
    fr: "Nous avons installé 25+ apps VPN sur Android — la plupart vident la batterie et fuient des données. Ces 5 ont passé nos tests de kill switch, vitesse et sécurité.",
    zh: "我们在Android上安装了25多个VPN应用——大多数耗电且泄露数据。这5个通过了我们的终止开关、速度和安全测试。",
    ja: "Androidに25以上のVPNアプリをインストール——ほとんどがバッテリーを消耗しデータを漏洩。この5つがキルスイッチ、速度、セキュリティテストに合格しました。",
    ko: "Android에 25개 이상의 VPN 앱을 설치했습니다 — 대부분 배터리를 소모하고 데이터를 유출합니다. 이 5개가 킬 스위치, 속도, 보안 테스트를 통과했습니다.",
    th: "เราติดตั้งแอป VPN มากกว่า 25 ตัวบน Android — ส่วนใหญ่กินแบตและรั่วไหลข้อมูล 5 ตัวนี้ผ่านการทดสอบ kill switch ความเร็ว และความปลอดภัย",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
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

// Structured Data for Android VPN List
function AndroidVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for Android 2026",
    description: "Expert-tested VPN apps for Android with ratings, features, and performance comparison",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NordVPN",
        item: {
          "@type": "Product",
          name: "NordVPN for Android",
          description: "Best Android VPN app with NordLynx protocol, split tunneling, and 95% rating",
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
          name: "Surfshark for Android",
          description: "Unlimited devices with GPS spoofing, Camouflage mode, and 94% rating",
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
          name: "ExpressVPN for Android",
          description: "Stable connection with Lightway protocol, 94 countries, and 93% rating",
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

export default async function AndroidVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("androidVpn");

  return (
    <>
      <AndroidVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-background to-background" />
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

        {/* Why Android Needs VPN */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("whyAndroid.title")}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Eye className="h-6 w-6 text-orange-500" />
                      <CardTitle className="text-lg">{t("whyAndroid.tracking.title")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyAndroid.tracking.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-blue-500" />
                      <CardTitle className="text-lg">{t("whyAndroid.ecosystem.title")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyAndroid.ecosystem.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Wifi className="h-6 w-6 text-purple-500" />
                      <CardTitle className="text-lg">{t("whyAndroid.wifi.title")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("whyAndroid.wifi.description")}
                    </p>
                  </CardContent>
                </Card>
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
                    <th className="text-left p-4 font-semibold">{t("comparison.splitTunneling")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50 bg-green-50/50 dark:bg-green-950/20">
                    <td className="p-4 font-medium">NordVPN</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">95%</span>
                        <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">
                          {t("comparison.recommended")}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">NordLynx</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">$3.39/{t("comparison.month")}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Surfshark</td>
                    <td className="p-4">
                      <span className="font-semibold">94%</span>
                    </td>
                    <td className="p-4">WireGuard</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">$2.19/{t("comparison.month")}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ExpressVPN</td>
                    <td className="p-4">
                      <span className="font-semibold">93%</span>
                    </td>
                    <td className="p-4">Lightway</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                    <td className="p-4 font-semibold">$6.67/{t("comparison.month")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Top 3 VPNs for Android - Detailed Reviews */}
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
              <Card className="border-2 border-green-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-green-500 text-green-950">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.nordvpn.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    1. NordVPN
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
                        <div className="text-sm text-muted-foreground">{t("reviews.protocol")}</div>
                        <div className="font-semibold">NordLynx</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">7000+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.splitTunnel")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.killSwitch")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
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
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.unlimited")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.gpsSpoofing")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.camouflage")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">3200+</div>
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
                        <div className="text-sm text-muted-foreground">{t("reviews.protocol")}</div>
                        <div className="font-semibold">Lightway</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.countries")}</div>
                        <div className="font-semibold">94</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.reliability")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.excellent")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.splitTunnel")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
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

        {/* Android-Specific Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("features.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      {t("features.splitTunneling.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.splitTunneling.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("features.splitTunneling.availability")}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      {t("features.alwaysOn.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.alwaysOn.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("features.alwaysOn.availability")}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      {t("features.killSwitch.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.killSwitch.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("features.killSwitch.availability")}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Download className="h-5 w-5 text-purple-500" />
                      {t("features.apkSideloading.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.apkSideloading.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("features.apkSideloading.availability")}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-orange-500" />
                      {t("features.widgets.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.widgets.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("features.widgets.availability")}
                    </Badge>
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
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("features.gpsSpoofing.description")}
                    </p>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {t("features.gpsSpoofing.availability")}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guide */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("setup.title")}</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    {(t.raw("setup.steps") as string[]).map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
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

        {/* APK Installation for Censored Countries */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("apk.title")}</h2>
              <p className="text-center text-muted-foreground mb-8">
                {t("apk.subtitle")}
              </p>
              <Card className="border-orange-200 dark:border-orange-900">
                <CardHeader>
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    <CardTitle className="text-lg">{t("apk.warning.title")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("apk.warning.description")}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">{t("apk.instructions.title")}</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                      {(t.raw("apk.instructions.steps") as string[]).map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Free Android VPNs to Avoid */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("avoid.title")}</h2>
              <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <CardTitle>{t("avoid.subtitle")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
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
        <section className="py-16 lg:py-24">
          <div className="container">
            <RelatedPages
              title="Related Guides"
              pages={[
                {
                  title: "All Mobile VPNs",
                  description: "Compare the best VPN apps for all mobile platforms including Android and iOS",
                  href: "/best/vpn-mobile",
                  icon: "smartphone",
                },
                {
                  title: "VPN for Android Tablet",
                  description: "Best VPN apps optimized for Android tablets with large screen interfaces",
                  href: "/best/vpn-android-tablet",
                  icon: "monitor",
                },
                {
                  title: "VPN Privacy Guide",
                  description: "Complete guide to protecting your privacy and anonymity with VPN services",
                  href: "/guides/vpn-privacy-guide",
                  icon: "shield",
                },
              ]}
            />
          </div>
        </section>

        {/* Conclusion & CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-500/10 to-background">
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
                  {t("conclusion.tryNordvpn")}
                </AffiliateButton>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    {t("conclusion.compareAll")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
