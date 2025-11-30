import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleJsonLd } from "@/components/structured-data";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  ArrowRight,
  Info,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";
const publishDate = "2025-11-28";
const slug = "is-vpn-legal";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Is Using a VPN Legal? Country-by-Country Guide 2025 | ZeroToVPN",
    nl: "Is het gebruik van een VPN legaal? Land-voor-land gids 2025 | ZeroToVPN",
    de: "Ist die Verwendung eines VPN legal? Länderführer 2025 | ZeroToVPN",
    es: "¿Es legal usar una VPN? Guía por país 2025 | ZeroToVPN",
    fr: "L'utilisation d'un VPN est-elle légale? Guide par pays 2025 | ZeroToVPN",
    zh: "使用VPN合法吗？2025年各国指南 | ZeroToVPN",
    ja: "VPNの使用は合法ですか？国別ガイド2025 | ZeroToVPN",
    ko: "VPN 사용은 합법인가요? 국가별 가이드 2025 | ZeroToVPN",
    th: "การใช้ VPN ถูกกฎหมายหรือไม่? คู่มือแยกตามประเทศ 2025 | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Complete guide to VPN legality worldwide. Learn which countries ban or restrict VPNs, and where you can use them safely. Updated for 2025.",
    nl: "Volledige gids over VPN-legaliteit wereldwijd. Leer welke landen VPN's verbieden of beperken, en waar je ze veilig kunt gebruiken. Bijgewerkt voor 2025.",
    de: "Vollständiger Leitfaden zur VPN-Legalität weltweit. Erfahren Sie, welche Länder VPNs verbieten oder einschränken und wo Sie sie sicher verwenden können. Aktualisiert für 2025.",
    es: "Guía completa sobre la legalidad de las VPN en todo el mundo. Descubre qué países prohíben o restringen las VPN y dónde puedes usarlas de forma segura. Actualizado para 2025.",
    fr: "Guide complet sur la légalité des VPN dans le monde. Découvrez quels pays interdisent ou restreignent les VPN et où vous pouvez les utiliser en toute sécurité. Mis à jour pour 2025.",
    zh: "全球VPN合法性完整指南。了解哪些国家禁止或限制VPN，以及在哪里可以安全使用。2025年更新。",
    ja: "世界中のVPN合法性に関する完全ガイド。VPNを禁止または制限している国と、安全に使用できる場所を学びましょう。2025年更新。",
    ko: "전 세계 VPN 합법성에 대한 완전한 가이드. VPN을 금지하거나 제한하는 국가와 안전하게 사용할 수 있는 곳을 알아보세요. 2025년 업데이트.",
    th: "คู่มือครบวงจรเกี่ยวกับความถูกต้องตามกฎหมายของ VPN ทั่วโลก เรียนรู้ว่าประเทศใดห้ามหรือจำกัด VPN และที่ไหนที่คุณสามารถใช้ได้อย่างปลอดภัย อัปเดตสำหรับปี 2025",
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
      authors: ["ZeroToVPN Team"],
    },
  };
}

export default async function VpnLegalityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(`blog.posts.${slug}`);
  const blogT = await getTranslations("blog");

  const legalStatus = {
    fullyLegal: [
      { country: "United States", note: "" },
      { country: "Canada", note: "" },
      { country: "United Kingdom", note: "" },
      { country: "Germany", note: "" },
      { country: "France", note: "" },
      { country: "Netherlands", note: "" },
      { country: "Australia", note: "" },
      { country: "Japan", note: "" },
      { country: "South Korea", note: "" },
    ],
    restricted: [
      { country: "China", note: "Only government-approved VPNs allowed" },
      { country: "Russia", note: "Only government-approved VPNs allowed" },
      { country: "UAE", note: "Illegal for certain uses" },
      { country: "Turkey", note: "Some VPN services blocked" },
      { country: "Iran", note: "Only government-approved VPNs allowed" },
      { country: "Egypt", note: "Some VPN services blocked" },
    ],
    banned: [
      { country: "North Korea", note: "Complete ban" },
      { country: "Belarus", note: "VPNs and Tor banned" },
      { country: "Turkmenistan", note: "Complete ban" },
      { country: "Iraq", note: "VPNs banned since 2014" },
    ],
  };

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
              { name: "Is VPN Legal?", href: "/blog/is-vpn-legal" }
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
                  <Shield className="h-3 w-3" />
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
                <Globe className="h-4 w-4 text-primary" />
                <span>{t("author")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">
                        {t("quickAnswer.title")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("quickAnswer.answer")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

        {/* Legal Status by Country */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {t("countries.title")}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Fully Legal */}
                <Card className="border-green-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {t("countries.fullyLegal")}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {legalStatus.fullyLegal.map((item) => (
                        <li
                          key={item.country}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{item.country}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Restricted */}
                <Card className="border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-yellow-500/10">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {t("countries.restricted")}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {legalStatus.restricted.map((item) => (
                        <li key={item.country} className="text-sm">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">{item.country}</div>
                              <div className="text-muted-foreground text-xs">
                                {item.note}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Banned */}
                <Card className="border-red-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-red-500/10">
                        <XCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {t("countries.banned")}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {legalStatus.banned.map((item) => (
                        <li key={item.country} className="text-sm">
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">{item.country}</div>
                              <div className="text-muted-foreground text-xs">
                                {item.note}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <AlertTriangle className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {t("disclaimer.title")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("disclaimer.text")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* When is VPN use illegal */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{t("illegal.title")}</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{t("illegal.intro")}</p>
                <ul>
                  <li>{t("illegal.point1")}</li>
                  <li>{t("illegal.point2")}</li>
                  <li>{t("illegal.point3")}</li>
                  <li>{t("illegal.point4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Safe VPN Use */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{t("safeUse.title")}</h2>
              <div className="prose prose-lg dark:prose-invert mb-8">
                <ul>
                  <li>{t("safeUse.tip1")}</li>
                  <li>{t("safeUse.tip2")}</li>
                  <li>{t("safeUse.tip3")}</li>
                  <li>{t("safeUse.tip4")}</li>
                </ul>
              </div>
              <Button size="lg" asChild>
                <Link href="/reviews">
                  {t("safeUse.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                {t("conclusion.title")}
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{t("conclusion.paragraph1")}</p>
                <p>{t("conclusion.paragraph2")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 lg:py-16 border-t bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t("related.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/blog/vpn-black-friday-2025">
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
                <Link href="/blog/vpn-vs-proxy">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {blogT("categories.tips")}
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
        <section className="py-12 lg:py-16 border-t">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <RelatedPages
                title="Related Articles"
                pages={[
                  { title: "VPN vs Proxy", description: "Differences and when to use each", href: "/blog/vpn-vs-proxy", icon: "zap" },
                  { title: "VPN Guide: China", description: "VPN legality and use in China", href: "/countries/china", icon: "globe" },
                  { title: "VPN Guide: Russia", description: "VPN restrictions in Russia", href: "/countries/russia", icon: "globe" },
                  { title: "What is a VPN?", description: "Learn VPN basics", href: "/guides/what-is-vpn", icon: "shield" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
