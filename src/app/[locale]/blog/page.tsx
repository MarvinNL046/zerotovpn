import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Globe,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getCachedPostSummaries } from "@/lib/pipeline/blog-service";

// Revalidate every 10 minutes — new posts appear within 10 min without sacrificing speed
export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

function formatDateLong(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const months: Record<string, string[]> = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    nl: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
    de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
  };
  const m = (months[locale] || months.en);
  return `${m[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatDateShort(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const months: Record<string, string[]> = {
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    nl: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],
    de: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
    es: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
    fr: ["jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc"],
  };
  const m = (months[locale] || months.en);
  return `${m[date.getMonth()]} ${date.getDate()}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN Blog - News, Tips & Security Guides | ZeroToVPN",
    nl: "VPN Blog - Nieuws, Tips & Beveiligingsgidsen | ZeroToVPN",
    de: "VPN Blog - Neuigkeiten, Tipps & Sicherheitsleitfäden | ZeroToVPN",
    es: "Blog VPN - Noticias, Consejos y Guías de Seguridad | ZeroToVPN",
    fr: "Blog VPN - Actualités, Conseils et Guides de Sécurité | ZeroToVPN",
    zh: "VPN博客 - 新闻、技巧和安全指南 | ZeroToVPN",
    ja: "VPNブログ - ニュース、ヒント、セキュリティガイド | ZeroToVPN",
    ko: "VPN 블로그 - 뉴스, 팁 및 보안 가이드 | ZeroToVPN",
    th: "VPN บล็อก - ข่าว เคล็ดลับ และคู่มือความปลอดภัย | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Stay updated with the latest VPN news, security tips, and in-depth guides. Learn about VPN deals, privacy, and online security.",
    nl: "Blijf op de hoogte van het laatste VPN-nieuws, beveiligingstips en uitgebreide gidsen. Leer over VPN-deals, privacy en online beveiliging.",
    de: "Bleiben Sie auf dem Laufenden mit den neuesten VPN-Nachrichten, Sicherheitstipps und ausführlichen Leitfäden. Erfahren Sie mehr über VPN-Angebote, Datenschutz und Online-Sicherheit.",
    es: "Mantente actualizado con las últimas noticias de VPN, consejos de seguridad y guías detalladas. Aprende sobre ofertas de VPN, privacidad y seguridad en línea.",
    fr: "Restez informé des dernières actualités VPN, conseils de sécurité et guides détaillés. Apprenez-en plus sur les offres VPN, la confidentialité et la sécurité en ligne.",
    zh: "了解最新的VPN新闻、安全提示和深入指南。学习VPN优惠、隐私和在线安全知识。",
    ja: "最新のVPNニュース、セキュリティのヒント、詳細なガイドで最新情報を入手。VPNのお得な情報、プライバシー、オンラインセキュリティについて学びましょう。",
    ko: "최신 VPN 뉴스, 보안 팁 및 심층 가이드로 최신 정보를 유지하세요. VPN 거래, 개인 정보 보호 및 온라인 보안에 대해 알아보세요.",
    th: "อัปเดตข่าวสาร VPN ล่าสุด เคล็ดลับความปลอดภัย และคู่มือเชิงลึก เรียนรู้เกี่ยวกับดีล VPN ความเป็นส่วนตัว และความปลอดภัยออนไลน์",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
    alternates: generateAlternates("/blog", locale),
  };
}

// Blog posts data
const blogPosts = [
  {
    slug: "vpn-black-friday-2026",
    category: "deals",
    date: "2025-11-29",
    readTime: "5 min",
  },
  {
    slug: "is-vpn-legal",
    category: "security",
    date: "2026-01-15",
    readTime: "8 min",
  },
  {
    slug: "vpn-vs-proxy",
    category: "tips",
    date: "2026-01-10",
    readTime: "6 min",
  },
];

const categoryConfig: Record<string, {
  icon: typeof TrendingUp;
  color: string;
  gradient: string;
  iconColor: string;
  bgPattern: string;
  label: string;
}> = {
  deals: {
    icon: TrendingUp,
    color: "text-green-600",
    gradient: "from-emerald-500/20 via-green-500/10 to-yellow-500/20",
    iconColor: "text-emerald-600",
    bgPattern: "bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]",
    label: "deals",
  },
  deal: {
    icon: TrendingUp,
    color: "text-green-600",
    gradient: "from-emerald-500/20 via-green-500/10 to-yellow-500/20",
    iconColor: "text-emerald-600",
    bgPattern: "bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]",
    label: "deals",
  },
  security: {
    icon: Shield,
    color: "text-blue-600",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    iconColor: "text-blue-600",
    bgPattern: "bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]",
    label: "security",
  },
  tips: {
    icon: Globe,
    color: "text-purple-600",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconColor: "text-orange-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.15),transparent_50%)]",
    label: "tips",
  },
  guide: {
    icon: Globe,
    color: "text-purple-600",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconColor: "text-orange-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.15),transparent_50%)]",
    label: "tips",
  },
  news: {
    icon: Newspaper,
    color: "text-orange-600",
    gradient: "from-rose-500/20 via-pink-500/10 to-orange-500/20",
    iconColor: "text-rose-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_70%,rgba(244,63,94,0.15),transparent_50%)]",
    label: "news",
  },
  comparison: {
    icon: Shield,
    color: "text-blue-600",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    iconColor: "text-blue-600",
    bgPattern: "bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]",
    label: "security",
  },
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  // Fetch dynamic posts from DB (graceful fallback on error)
  let dynamicPosts: Array<{
    slug: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    hasFeaturedImage: boolean;
    isDynamic: true;
  }> = [];

  try {
    // Fetch locale + English fallback in parallel for speed
    const [localePosts, enPosts] = await Promise.all([
      getCachedPostSummaries(locale),
      locale !== "en" ? getCachedPostSummaries("en") : Promise.resolve([]),
    ]);

    const dbPosts = [...localePosts];
    const seenSlugs = new Set(dbPosts.map((p) => p.slug));

    // Add English posts that don't have a translation in the current locale
    for (const enPost of enPosts) {
      if (!seenSlugs.has(enPost.slug)) {
        dbPosts.push(enPost);
      }
    }

    dynamicPosts = dbPosts.map((post) => ({
      slug: post.slug,
      category: post.category,
      date: (post.publishedAt ? new Date(post.publishedAt).toISOString().split("T")[0] : null) || new Date(post.createdAt).toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(post.excerpt.length / 300))} min`,
      title: post.title,
      excerpt: post.excerpt,
      hasFeaturedImage: post.hasFeaturedImage,
      isDynamic: true as const,
    }));
  } catch (err) {
    // DB might not be available during build — continue with static posts only
    console.error("[blog] DB fetch failed:", err instanceof Error ? err.message : err);
  }

  // Merge static + dynamic, then sort newest first
  const allPosts = [
    ...blogPosts.map((p) => ({ ...p, isDynamic: false as const, title: "", excerpt: "", hasFeaturedImage: false })),
    ...dynamicPosts,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPost = allPosts[0]; // Already sorted newest-first
  const otherPosts = allPosts.slice(1);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Blog", href: "/blog" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default" className="cursor-pointer">
              {t("categories.all")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.deals")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.security")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.tips")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.news")}
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{t("featured.title")}</h2>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Image */}
                    <div
                      className={cn(
                        "aspect-video md:aspect-auto flex items-center justify-center relative overflow-hidden",
                        "bg-gradient-to-br",
                        categoryConfig[featuredPost.category]?.gradient || "from-primary/20 to-primary/5",
                        categoryConfig[featuredPost.category]?.bgPattern
                      )}
                    >
                      {featuredPost.isDynamic && featuredPost.hasFeaturedImage ? (
                        <Image
                          src={`/api/blog-image/${featuredPost.slug}`}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-grid-white/5" />
                          {(() => {
                            const FeaturedIcon = categoryConfig[featuredPost.category]?.icon || TrendingUp;
                            return (
                              <FeaturedIcon
                                className={cn(
                                  "h-20 w-20 relative z-10",
                                  categoryConfig[featuredPost.category]?.iconColor || "text-primary/40"
                                )}
                              />
                            );
                          })()}
                        </>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="default">
                          {t(`categories.${categoryConfig[featuredPost.category]?.label || featuredPost.category}`)}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateLong(featuredPost.date, locale)}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {t(`posts.${featuredPost.slug}.title`)}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t(`posts.${featuredPost.slug}.excerpt`)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          {t("readMore")}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{t("recent.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => {
              const config = categoryConfig[post.category];
              const CategoryIcon = config?.icon || Newspaper;

              // Dynamic posts use DB title/excerpt; static posts use i18n
              const postTitle = post.isDynamic
                ? post.title
                : t(`posts.${post.slug}.title`);
              const postExcerpt = post.isDynamic
                ? post.excerpt
                : t(`posts.${post.slug}.excerpt`);

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div
                        className={cn(
                          "aspect-video flex items-center justify-center border-b relative overflow-hidden",
                          "bg-gradient-to-br",
                          config?.gradient || "from-muted to-muted/50",
                          config?.bgPattern,
                          "group-hover:scale-105 transition-transform duration-300"
                        )}
                      >
                        {post.isDynamic && post.hasFeaturedImage ? (
                          <Image
                            src={`/api/blog-image/${post.slug}`}
                            alt={postTitle}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-grid-white/5" />
                            <CategoryIcon
                              className={cn(
                                "h-14 w-14 relative z-10",
                                config?.iconColor || "text-muted-foreground/40"
                              )}
                            />
                          </>
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {t(`categories.${categoryConfig[post.category]?.label || post.category}`)}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateShort(post.date, locale)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {postTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {postExcerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1 text-primary font-medium">
                            {t("readMore")}
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("cta.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <RelatedPages
              title="Explore More"
              pages={[
                { title: "Best VPNs 2026", description: "Our top-rated VPN services", href: "/best/best-vpn", icon: "trophy" },
                { title: "VPN Black Friday Deals", description: "Biggest discounts of the year", href: "/blog/vpn-black-friday-2026", icon: "tag" },
                { title: "Is VPN Legal?", description: "VPN legality around the world", href: "/blog/is-vpn-legal", icon: "shield" },
                { title: "VPN vs Proxy", description: "Differences and when to use each", href: "/blog/vpn-vs-proxy", icon: "zap" }
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
