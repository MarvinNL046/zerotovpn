import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleJsonLd } from "@/components/structured-data";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { AuthorBox, FactCheckedBadge } from "@/components/blog/author-box";
import {
  Calendar,
  Clock,
  Globe,
  Shield,
  Zap,
  Lock,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";
const publishDate = "2026-01-10";
const slug = "vpn-vs-proxy";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN vs Proxy: What's the Difference? Complete Guide 2026 | ZeroToVPN",
    nl: "VPN vs Proxy: Wat is het verschil? Volledige gids 2026 | ZeroToVPN",
    de: "VPN vs Proxy: Was ist der Unterschied? Vollständiger Leitfaden 2026 | ZeroToVPN",
    es: "VPN vs Proxy: ¿Cuál es la diferencia? Guía completa 2026 | ZeroToVPN",
    fr: "VPN vs Proxy: Quelle est la différence? Guide complet 2026 | ZeroToVPN",
    zh: "VPN与代理：有什么区别？2026完整指南 | ZeroToVPN",
    ja: "VPN vs プロキシ：違いは何？完全ガイド2026 | ZeroToVPN",
    ko: "VPN 대 프록시: 차이점은? 완전한 가이드 2026 | ZeroToVPN",
    th: "VPN vs Proxy: ความแตกต่างคืออะไร? คู่มือฉบับสมบูรณ์ 2026 | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Understand the key differences between VPNs and proxies. Learn which one is better for privacy, security, and speed. Complete comparison guide.",
    nl: "Begrijp de belangrijkste verschillen tussen VPN's en proxies. Leer welke beter is voor privacy, beveiliging en snelheid. Volledige vergelijkingsgids.",
    de: "Verstehen Sie die Hauptunterschiede zwischen VPNs und Proxys. Erfahren Sie, welcher für Datenschutz, Sicherheit und Geschwindigkeit besser ist. Vollständiger Vergleichsleitfaden.",
    es: "Comprende las diferencias clave entre VPN y proxies. Descubre cuál es mejor para privacidad, seguridad y velocidad. Guía de comparación completa.",
    fr: "Comprenez les différences clés entre VPN et proxies. Découvrez lequel est le meilleur pour la confidentialité, la sécurité et la vitesse. Guide de comparaison complet.",
    zh: "了解VPN和代理之间的主要区别。了解哪个在隐私、安全性和速度方面更好。完整的比较指南。",
    ja: "VPNとプロキシの主な違いを理解しましょう。プライバシー、セキュリティ、速度のどれに優れているかを学びます。完全な比較ガイド。",
    ko: "VPN과 프록시의 주요 차이점을 이해하세요. 개인 정보 보호, 보안 및 속도 면에서 어느 것이 더 나은지 알아보세요. 완전한 비교 가이드.",
    th: "ทำความเข้าใจความแตกต่างหลักระหว่าง VPN และพร็อกซี เรียนรู้ว่าอันไหนดีกว่าสำหรับความเป็นส่วนตัว ความปลอดภัย และความเร็ว คู่มือเปรียบเทียบฉบับสมบูรณ์",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
      publishedTime: publishDate,
      authors: ["ZeroToVPN Expert Team"],
    },
    alternates: generateAlternates("/blog/vpn-vs-proxy", locale),
  };
}

export default async function VpnVsProxyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(`blog.posts.${slug}`);
  const blogT = await getTranslations("blog");

  const comparisonData = [
    {
      feature: "Encryption",
      vpn: { value: "Military-grade (AES-256)", icon: CheckCircle, color: "green" },
      proxy: { value: "None", icon: XCircle, color: "red" },
    },
    {
      feature: "Privacy",
      vpn: { value: "High - Full traffic encryption", icon: CheckCircle, color: "green" },
      proxy: { value: "Low - IP masking only", icon: AlertTriangle, color: "yellow" },
    },
    {
      feature: "Security",
      vpn: { value: "Very High", icon: CheckCircle, color: "green" },
      proxy: { value: "Low", icon: XCircle, color: "red" },
    },
    {
      feature: "Speed",
      vpn: { value: "Fast (slight overhead)", icon: CheckCircle, color: "green" },
      proxy: { value: "Faster (no encryption)", icon: CheckCircle, color: "green" },
    },
    {
      feature: "Price",
      vpn: { value: "$2-10/month", icon: AlertTriangle, color: "yellow" },
      proxy: { value: "Often free or cheaper", icon: CheckCircle, color: "green" },
    },
    {
      feature: "Ease of Use",
      vpn: { value: "Very Easy (apps)", icon: CheckCircle, color: "green" },
      proxy: { value: "Manual setup required", icon: AlertTriangle, color: "yellow" },
    },
  ];

  return (
    <>
      <ArticleJsonLd
        title={t("title")}
        description={t("excerpt")}
        datePublished={publishDate}
        url={`${baseUrl}/${locale}/blog/${slug}`}
      />

      <article className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Blog", href: "/blog" },
              { name: "VPN vs Proxy", href: "/blog/vpn-vs-proxy" }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="default" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {t("category")}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(publishDate).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t("readTime")}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {t("excerpt")}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>{t("author")}</span>
              </div>
              <FactCheckedBadge lastUpdated="January 10, 2026" />
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="lead">{t("intro.paragraph1")}</p>
              <p>{t("intro.paragraph2")}</p>
            </div>
          </div>
        </section>

        {/* What is a VPN */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">
                        {t("whatIsVpn.title")}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {t("whatIsVpn.description")}
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="text-sm">{t("whatIsVpn.feature1")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-sm">{t("whatIsVpn.feature2")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="text-sm">{t("whatIsVpn.feature3")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What is a Proxy */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-muted">
                      <Globe className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">
                        {t("whatIsProxy.title")}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {t("whatIsProxy.description")}
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t("whatIsProxy.feature1")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t("whatIsProxy.feature2")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{t("whatIsProxy.feature3")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  {t("comparison.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("comparison.subtitle")}
                </p>
              </div>

              <div className="grid gap-4">
                {comparisonData.map((item, index) => {
                  const VpnIcon = item.vpn.icon;
                  const ProxyIcon = item.proxy.icon;

                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="font-semibold text-lg">
                            {item.feature}
                          </div>
                          <div className="flex items-center gap-2">
                            <VpnIcon className={`h-5 w-5 text-${item.vpn.color}-500`} />
                            <div>
                              <div className="text-sm font-medium">VPN</div>
                              <div className="text-sm text-muted-foreground">
                                {item.vpn.value}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ProxyIcon className={`h-5 w-5 text-${item.proxy.color}-500`} />
                            <div>
                              <div className="text-sm font-medium">Proxy</div>
                              <div className="text-sm text-muted-foreground">
                                {item.proxy.value}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Each */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {t("whenToUse.title")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Use VPN */}
                <Card className="border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{t("whenToUse.vpnTitle")}</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.vpn1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.vpn2")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.vpn3")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.vpn4")}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Use Proxy */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">{t("whenToUse.proxyTitle")}</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.proxy1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.proxy2")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.proxy3")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t("whenToUse.proxy4")}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                {t("conclusion.title")}
              </h2>
              <div className="prose prose-lg dark:prose-invert mb-8">
                <p>{t("conclusion.paragraph1")}</p>
                <p>{t("conclusion.paragraph2")}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/reviews">
                    {t("conclusion.cta1")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides/what-is-vpn">{t("conclusion.cta2")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T: Author Box */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AuthorBox />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 lg:py-16 border-t">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t("related.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/blog/vpn-black-friday-2026">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {blogT("categories.deals")}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2">
                        {t("related.post1.title")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("related.post1.excerpt")}
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        {blogT("readMore")}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/is-vpn-legal">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {blogT("categories.security")}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2">
                        {t("related.post2.title")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("related.post2.excerpt")}
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        {blogT("readMore")}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <RelatedPages
                title="Related Articles"
                pages={[
                  { title: "Is VPN Legal?", description: "VPN legality around the world", href: "/blog/is-vpn-legal", icon: "shield" },
                  { title: "What is a VPN?", description: "Learn VPN basics", href: "/guides/what-is-vpn", icon: "shield" },
                  { title: "Best VPNs 2026", description: "Our top-rated VPN services", href: "/best/best-vpn", icon: "trophy" },
                  { title: "VPN for Streaming", description: "Best VPNs for Netflix and more", href: "/best/streaming-vpn", icon: "play" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
