import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getShortMonthYear } from "@/lib/seo-utils";
import { LastUpdated } from "@/components/last-updated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  TrendingUp,
  Clock,
  ArrowRight,
  Server,
  Monitor,
  Database,
  Wifi,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `4 Best Free VPNs (Tested ${shortMonthYear}) - No Hidden Costs | ZeroToVPN`,
    nl: `4 Beste Gratis VPNs (Getest ${shortMonthYear}) - Geen Verborgen Kosten | ZeroToVPN`,
    de: `4 Beste Gratis VPNs (Getestet ${shortMonthYear}) - Keine Versteckten Kosten | ZeroToVPN`,
    es: `4 Mejores VPNs Gratis (Probadas ${shortMonthYear}) - Sin Costos Ocultos | ZeroToVPN`,
    fr: `4 Meilleurs VPNs Gratuits (Testés ${shortMonthYear}) - Sans Frais Cachés | ZeroToVPN`,
    zh: `4款最佳免费VPN (测试于 ${shortMonthYear}) - 无隐藏费用 | ZeroToVPN`,
    ja: `4つのベスト無料VPN (テスト済み ${shortMonthYear}) - 隠れた費用なし | ZeroToVPN`,
    ko: `4가지 최고의 무료 VPN (테스트됨 ${shortMonthYear}) - 숨겨진 비용 없음 | ZeroToVPN`,
    th: `4 VPN ฟรีที่ดีที่สุด (ทดสอบ ${shortMonthYear}) - ไม่มีค่าใช้จ่ายแอบแฝง | ZeroToVPN`,
  };

  const descriptions: Record<string, string> = {
    en: `We tested 30+ free VPNs to find the best ones. Expert picks updated ${shortMonthYear} — only these pass our security & speed tests. No credit card required.`,
    nl: "99% van de gratis VPNs verkoopt je data. We vonden 4 die echt gratis, veilig en snel genoeg zijn om te gebruiken. Geen creditcard nodig.",
    de: "99% der kostenlosen VPNs verkaufen Ihre Daten. Wir haben 4 gefunden, die wirklich kostenlos, sicher und schnell genug sind. Keine Kreditkarte nötig.",
    es: "El 99% de las VPNs gratis venden tus datos. Encontramos 4 que son realmente gratis, seguras y lo suficientemente rápidas. Sin tarjeta de crédito.",
    fr: "99% des VPNs gratuits vendent vos données. Nous en avons trouvé 4 vraiment gratuits, sûrs et assez rapides. Pas de carte bancaire requise.",
    zh: "99%的免费VPN出售您的数据。我们找到4个真正免费、安全且足够快的VPN。无需信用卡。",
    ja: "無料VPNの99%はデータを販売しています。本当に無料で安全、実用的な速度の4つを見つけました。クレジットカード不要。",
    ko: "무료 VPN의 99%가 데이터를 판매합니다. 진짜 무료이고 안전하며 실제로 사용할 만큼 빠른 4개를 찾았습니다. 신용카드 필요 없음.",
    th: "99% ของ VPN ฟรีขายข้อมูลของคุณ เราพบ 4 ตัวที่ฟรีจริง ปลอดภัย และเร็วพอใช้งานได้จริง ไม่ต้องใช้บัตรเครดิต",
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

// Structured Data for Free VPN List
function FreeVpnListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Free VPN Services 2026",
    description: "Expert-tested free VPN services with comparison of data limits, features, and security",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ProtonVPN Free",
        item: {
          "@type": "Product",
          name: "ProtonVPN Free",
          description: "Unlimited data free VPN with no-logs policy and Swiss privacy",
          brand: { "@type": "Brand", name: "ProtonVPN" },
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Windscribe Free",
        item: {
          "@type": "Product",
          name: "Windscribe Free",
          description: "10GB per month with ad blocker and unlimited device connections",
          brand: { "@type": "Brand", name: "Windscribe" },
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hide.me Free",
        item: {
          "@type": "Product",
          name: "Hide.me Free",
          description: "10GB monthly data with no-logs policy and strong privacy",
          brand: { "@type": "Brand", name: "Hide.me" },
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "TunnelBear Free",
        item: {
          "@type": "Product",
          name: "TunnelBear Free",
          description: "2GB monthly data with beginner-friendly interface and audited security",
          brand: { "@type": "Brand", name: "TunnelBear" },
          offers: {
            "@type": "Offer",
            price: 0,
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

export default async function FreeVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("freeVpn");

  return (
    <>
      <FreeVpnListSchema />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[
                { name: "Best VPNs", href: "/best/best-vpn" },
                { name: "Free VPNs", href: "/best/free-vpn" }
              ]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
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
                    <th className="text-left p-4 font-semibold">{t("comparison.dataLimit")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.servers")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.devices")}</th>
                    <th className="text-left p-4 font-semibold">{t("comparison.streaming")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">ProtonVPN</td>
                    <td className="p-4 text-green-600 font-semibold">{t("comparison.unlimited")}</td>
                    <td className="p-4">5 {t("comparison.countries")}</td>
                    <td className="p-4">1</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Windscribe</td>
                    <td className="p-4">10GB/{t("comparison.month")}</td>
                    <td className="p-4">10 {t("comparison.countries")}</td>
                    <td className="p-4">{t("comparison.unlimited")}</td>
                    <td className="p-4"><CheckCircle className="h-4 w-4 text-green-500" /></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Hide.me</td>
                    <td className="p-4">10GB/{t("comparison.month")}</td>
                    <td className="p-4">5 {t("comparison.locations")}</td>
                    <td className="p-4">1</td>
                    <td className="p-4"><XCircle className="h-4 w-4 text-muted-foreground" /></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">TunnelBear</td>
                    <td className="p-4 text-orange-600">2GB/{t("comparison.month")}</td>
                    <td className="p-4">49 {t("comparison.countries")}</td>
                    <td className="p-4">{t("comparison.unlimited")}</td>
                    <td className="p-4"><XCircle className="h-4 w-4 text-muted-foreground" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Top Free VPNs - Detailed Reviews */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("reviews.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("reviews.subtitle")}
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {/* ProtonVPN */}
              <Card className="border-2 border-green-500/50">
                <div className="absolute -top-3 left-8">
                  <Badge className="bg-green-500 text-green-950">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("reviews.protonvpn.badge")}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    1. ProtonVPN Free
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {t("reviews.protonvpn.unlimitedData")}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.protonvpn.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.dataLimit")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.unlimited")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">5 {t("reviews.countries")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">1</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.logs")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.noLogs")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.protonvpn.pros") as string[]).map((pro, i) => (
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
                        {(t.raw("reviews.protonvpn.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="protonvpn"
                    vpnName="ProtonVPN"
                    affiliateUrl="https://go.zerotovpn.com/protonvpn"
                    size="lg"
                  >
                    {t("reviews.getButton")} ProtonVPN
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* Windscribe */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">2. Windscribe Free</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.windscribe.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.dataLimit")}</div>
                        <div className="font-semibold">10GB/{t("reviews.month")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">10 {t("reviews.countries")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">{t("reviews.unlimited")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.adBlocker")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.included")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.windscribe.pros") as string[]).map((pro, i) => (
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
                        {(t.raw("reviews.windscribe.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="windscribe"
                    vpnName="Windscribe"
                    affiliateUrl="https://go.zerotovpn.com/windscribe"
                    size="lg"
                  >
                    {t("reviews.getButton")} Windscribe
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* Hide.me */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">3. Hide.me Free</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.hideme.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.dataLimit")}</div>
                        <div className="font-semibold">10GB/{t("reviews.month")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">5 {t("reviews.locations")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">1</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.logs")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.noLogs")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.hideme.pros") as string[]).map((pro, i) => (
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
                        {(t.raw("reviews.hideme.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="hideme"
                    vpnName="Hide.me"
                    affiliateUrl="https://go.zerotovpn.com/hideme"
                    size="lg"
                  >
                    {t("reviews.getButton")} Hide.me
                  </AffiliateButton>
                </CardContent>
              </Card>

              {/* TunnelBear */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">4. TunnelBear Free</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{t("reviews.tunnelbear.description")}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.dataLimit")}</div>
                        <div className="font-semibold text-orange-600">2GB/{t("reviews.month")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.servers")}</div>
                        <div className="font-semibold">49 {t("reviews.countries")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.devices")}</div>
                        <div className="font-semibold">{t("reviews.unlimited")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t("reviews.audited")}</div>
                        <div className="font-semibold text-green-600">{t("reviews.yes")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">{t("reviews.pros")}</h4>
                      <ul className="space-y-2">
                        {(t.raw("reviews.tunnelbear.pros") as string[]).map((pro, i) => (
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
                        {(t.raw("reviews.tunnelbear.cons") as string[]).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <AffiliateButton
                    vpnId="tunnelbear"
                    vpnName="TunnelBear"
                    affiliateUrl="https://go.zerotovpn.com/tunnelbear"
                    size="lg"
                  >
                    {t("reviews.getButton")} TunnelBear
                  </AffiliateButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-16 bg-orange-50 dark:bg-orange-950/20 border-y border-orange-200 dark:border-orange-900">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-500 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("warning.title")}</h2>
                  <p className="text-muted-foreground mb-6">{t("warning.intro")}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(t.raw("warning.risks") as string[]).map((risk, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Paid VPN Recommendation */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div>
                <Badge className="mb-4">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {t("upgrade.badge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("upgrade.title")}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("upgrade.subtitle")}
                </p>
              </div>

              {/* Paid VPN Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* NordVPN */}
                <Card className="border-2 border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      NordVPN
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">$2.99</div>
                      <div className="text-sm text-muted-foreground">/{t("upgrade.month")}</div>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("upgrade.nordvpn.features") as string[]).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl="https://go.zerotovpn.com/nordvpn"
                      className="w-full"
                    >
                      {t("upgrade.getButton")} NordVPN
                    </AffiliateButton>
                  </CardContent>
                </Card>

                {/* Surfshark */}
                <Card className="border-2 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Surfshark
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">$1.99</div>
                      <div className="text-sm text-muted-foreground">/{t("upgrade.month")}</div>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {(t.raw("upgrade.surfshark.features") as string[]).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <AffiliateButton
                      vpnId="surfshark"
                      vpnName="Surfshark"
                      affiliateUrl="https://go.zerotovpn.com/surfshark"
                      className="w-full"
                    >
                      {t("upgrade.getButton")} Surfshark
                    </AffiliateButton>
                  </CardContent>
                </Card>
              </div>

              <Button size="lg" variant="outline" asChild>
                <Link href="/best/best-vpn">
                  {t("upgrade.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                title="Free VPN FAQs"
                faqs={[
                  {
                    question: "Are free VPNs safe to use?",
                    answer: "Most free VPNs are NOT safe and should be avoided. Many free VPNs log your data and sell it to third parties, inject ads, or contain malware. However, ProtonVPN's free tier is a notable exception - it's operated by a reputable Swiss company with a strict no-logs policy and strong encryption. If you must use a free VPN, stick to ProtonVPN, Windscribe, or Hide.me from our recommended list."
                  },
                  {
                    question: "What are the limitations of free VPNs?",
                    answer: "Free VPNs typically have several limitations: data caps (2-10GB per month, except ProtonVPN which is unlimited), slower speeds, fewer server locations, limited device connections, no customer support, and no access to streaming services. They may also display ads or restrict bandwidth. These limitations exist because running VPN servers is expensive, so free tiers are designed to encourage upgrades to paid plans."
                  },
                  {
                    question: "Which free VPN is best for streaming?",
                    answer: "ProtonVPN Free and Windscribe Free are the only free VPNs that work with some streaming services. However, both have significant limitations - ProtonVPN Free only allows 1 device and has slower speeds, while Windscribe limits you to 10GB/month. For reliable streaming access to Netflix, Hulu, and other platforms, you'll need a paid VPN like NordVPN ($2.99/month) or Surfshark ($1.99/month)."
                  },
                  {
                    question: "Do free VPNs sell your data?",
                    answer: "Yes, many free VPNs sell user data to advertisers and third parties - this is how they make money. They may track your browsing history, inject tracking cookies, or share your information with data brokers. Notable exceptions are ProtonVPN, Windscribe, and Hide.me, which have verified no-logs policies and are funded by their premium tiers. Always read the privacy policy before using any free VPN."
                  },
                  {
                    question: "Should I use a free VPN or pay for one?",
                    answer: "For serious privacy, security, and unrestricted access, paying for a VPN is strongly recommended. Premium VPNs like Surfshark ($1.99/month) or NordVPN ($2.99/month) offer unlimited data, faster speeds, better security, streaming access, and customer support. Free VPNs are only suitable for light, occasional use. If budget is a concern, premium VPNs often have sales and money-back guarantees, making them very affordable."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <RelatedPages
              title="Explore More VPN Options"
              pages={[
                { title: "Best Overall VPNs", description: "Top-rated premium VPN services", href: "/best/best-vpn", icon: "trophy" },
                { title: "Best VPN for Gaming", description: "Low-latency VPNs for online gaming", href: "/best/vpn-gaming", icon: "gamepad" },
                { title: "Best VPN for Streaming", description: "Unblock Netflix, Hulu, and more", href: "/guides/vpn-streaming", icon: "play" },
                { title: "Best VPN for China", description: "VPNs that bypass the Great Firewall", href: "/best/vpn-china", icon: "globe" },
                { title: "Best Mobile VPNs", description: "VPNs optimized for smartphones", href: "/best/vpn-mobile", icon: "smartphone" },
                { title: "VPN Setup Guides", description: "Learn how to set up your VPN", href: "/guides", icon: "map" },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
