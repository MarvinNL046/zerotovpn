import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { ArticleJsonLd } from "@/components/structured-data";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { routing } from "@/i18n/routing";
import {
  Calendar,
  Clock,
  TrendingUp,
  Tag,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";
const publishDate = "2026-11-29";
const slug = "vpn-black-friday-2026";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Black Friday VPN Deals 2026: Up to 88% Off | ZeroToVPN",
    nl: "Black Friday VPN-deals 2026: Tot 88% korting | ZeroToVPN",
    de: "Black Friday VPN-Angebote 2026: Bis zu 88% Rabatt | ZeroToVPN",
    es: "Ofertas VPN Black Friday 2026: Hasta 88% de descuento | ZeroToVPN",
    fr: "Offres VPN Black Friday 2026: Jusqu'à 88% de réduction | ZeroToVPN",
    zh: "黑色星期五VPN优惠2026：最高88%折扣 | ZeroToVPN",
    ja: "ブラックフライデーVPN セール 2026：最大88%オフ | ZeroToVPN",
    ko: "블랙 프라이데이 VPN 할인 2026: 최대 88% 할인 | ZeroToVPN",
    th: "VPN Black Friday Deals 2026: ลดสูงสุด 88% | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Don't miss the biggest VPN deals of the year! Get up to 88% off on Surfshark, NordVPN, ExpressVPN and more. Limited time Black Friday offers.",
    nl: "Mis de grootste VPN-deals van het jaar niet! Krijg tot 88% korting op Surfshark, NordVPN, ExpressVPN en meer. Beperkte Black Friday-aanbiedingen.",
    de: "Verpassen Sie nicht die größten VPN-Angebote des Jahres! Bis zu 88% Rabatt auf Surfshark, NordVPN, ExpressVPN und mehr. Zeitlich begrenzte Black Friday-Angebote.",
    es: "¡No te pierdas las mejores ofertas de VPN del año! Hasta un 88% de descuento en Surfshark, NordVPN, ExpressVPN y más. Ofertas limitadas de Black Friday.",
    fr: "Ne manquez pas les meilleures offres VPN de l'année! Jusqu'à 88% de réduction sur Surfshark, NordVPN, ExpressVPN et plus. Offres Black Friday à durée limitée.",
    zh: "不要错过今年最大的VPN优惠！Surfshark、NordVPN、ExpressVPN等最高可享受88%的折扣。限时黑色星期五优惠。",
    ja: "今年最大のVPN セールをお見逃しなく！Surfshark、NordVPN、ExpressVPNなどが最大88%オフ。期間限定のブラックフライデー特典。",
    ko: "올해 최대 VPN 할인을 놓치지 마세요! Surfshark, NordVPN, ExpressVPN 등 최대 88% 할인. 기간 한정 블랙 프라이데이 혜택.",
    th: "อย่าพลาดดีล VPN ที่ใหญ่ที่สุดของปี! รับส่วนลดสูงสุด 88% สำหรับ Surfshark, NordVPN, ExpressVPN และอื่นๆ ข้อเสนอ Black Friday จำกัดเวลา",
  };

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/blog/${slug}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/blog/${slug}` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/blog/${slug}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
      publishedTime: publishDate,
      authors: ["ZeroToVPN Team"],
    },
  };
}

export default async function BlackFridayDealsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(`blog.posts.${slug}`);
  const blogT = await getTranslations("blog");

  // Get VPN data
  const surfshark = await getVpnBySlug("surfshark");
  const nordvpn = await getVpnBySlug("nordvpn");
  const expressvpn = await getVpnBySlug("expressvpn");
  const cyberghost = await getVpnBySlug("cyberghost");
  const pia = await getVpnBySlug("private-internet-access");

  const deals = [
    {
      vpn: surfshark,
      discount: "88%",
      price: "$1.99/mo",
      months: 24,
      highlight: "Best Value",
      features: ["Unlimited devices", "CleanWeb", "GPS Override"],
    },
    {
      vpn: nordvpn,
      discount: "72%",
      price: "$2.99/mo",
      months: 24,
      highlight: "Most Popular",
      features: ["Threat Protection", "Meshnet", "Dark Web Monitor"],
    },
    {
      vpn: expressvpn,
      discount: "61%",
      price: "$6.67/mo",
      months: 12,
      highlight: "Fastest",
      features: ["TrustedServer", "Network Lock", "MediaStreamer"],
    },
    {
      vpn: cyberghost,
      discount: "83%",
      price: "$2.19/mo",
      months: 28,
      highlight: "Longest Plan",
      features: ["NoSpy servers", "45-day guarantee", "Optimized servers"],
    },
    {
      vpn: pia,
      discount: "82%",
      price: "$2.19/mo",
      months: 24,
      highlight: "Best for Privacy",
      features: ["Open Source", "MACE", "Unlimited devices"],
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
              { name: "Black Friday 2026", href: "/blog/vpn-black-friday-2026" }
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
                  <TrendingUp className="h-3 w-3" />
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
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{t("author")}</span>
              </div>
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

        {/* Deals Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("deals.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("deals.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deals.map((deal, index) => (
                  <Card
                    key={deal.vpn?.id || index}
                    className={index === 0 ? "border-primary/50 shadow-lg" : ""}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">
                              {deal.vpn?.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <RatingStars
                                rating={deal.vpn?.overallRating || 0}
                                size="sm"
                              />
                              <span className="text-sm text-muted-foreground">
                                {deal.vpn?.overallRating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="destructive" className="text-lg px-3">
                          -{deal.discount}
                        </Badge>
                      </div>

                      {index === 0 && (
                        <Badge className="mb-4">{deal.highlight}</Badge>
                      )}

                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">
                            {deal.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {deal.vpn?.priceMonthly}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {deal.months}-month plan
                        </p>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {deal.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <AffiliateButton
                        vpnId={deal.vpn?.id || ""}
                        vpnName={deal.vpn?.name || "VPN"}
                        affiliateUrl={deal.vpn?.affiliateUrl || "#"}
                        variant={index === 0 ? "default" : "outline"}
                        size="lg"
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{t("tips.title")}</h2>
              <div className="prose prose-lg dark:prose-invert">
                <ul>
                  <li>{t("tips.tip1")}</li>
                  <li>{t("tips.tip2")}</li>
                  <li>{t("tips.tip3")}</li>
                  <li>{t("tips.tip4")}</li>
                </ul>
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
                  <Link href="/compare">{t("conclusion.cta2")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 lg:py-16 border-t">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t("related.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/blog/is-vpn-legal">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {blogT("categories.security")}
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
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <RelatedPages
                title="Related Articles"
                pages={[
                  { title: "Best VPNs 2026", description: "Our top-rated VPN services", href: "/best/best-vpn", icon: "trophy" },
                  { title: "VPN Deals", description: "Current discounts and offers", href: "/deals", icon: "tag" },
                  { title: "Is VPN Legal?", description: "VPN legality around the world", href: "/blog/is-vpn-legal", icon: "shield" },
                  { title: "Best Free VPNs", description: "Top free VPN options", href: "/best/free-vpn", icon: "gift" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
