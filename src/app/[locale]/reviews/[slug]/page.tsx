import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/vpn/rating-stars";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { UserReviewsList } from "@/components/reviews/user-reviews-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { CouponList } from "@/components/coupons/coupon-list";
import { getVpnBySlug, getAllVpns } from "@/lib/vpn-data-layer";
import { getReviewsByVpnSlug, getAverageUserRating } from "@/lib/user-reviews";
import { getCouponsByVpnSlug } from "@/lib/coupon-data";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Check,
  X,
  ArrowLeft,
  Tv,
  MessageSquare,
  Ticket,
} from "lucide-react";
import {
  VpnReviewSchema,
  VpnProductSchema,
  BreadcrumbSchema,
} from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateStaticParams() {
  const vpns = await getAllVpns();
  const locales = routing.locales;

  return locales.flatMap((locale) =>
    vpns.map((vpn) => ({
      locale,
      slug: vpn.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const vpn = await getVpnBySlug(slug);

  if (!vpn) {
    return { title: "VPN Not Found" };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews/${vpn.slug}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/reviews/${vpn.slug}` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews/${vpn.slug}`;
  });

  // Generate locale-specific descriptions
  const descriptions: Record<string, string> = {
    en: `Complete ${vpn.name} review 2025. ${vpn.shortDescription} Speed score: ${vpn.speedScore}%, Security: ${vpn.securityScore}%. From $${vpn.priceTwoYear || vpn.priceYearly}/mo.`,
    nl: `Volledige ${vpn.name} review 2025. ${vpn.shortDescription} Snelheid: ${vpn.speedScore}%, Beveiliging: ${vpn.securityScore}%. Vanaf $${vpn.priceTwoYear || vpn.priceYearly}/maand.`,
    de: `Vollständiger ${vpn.name} Test 2025. ${vpn.shortDescription} Geschwindigkeit: ${vpn.speedScore}%, Sicherheit: ${vpn.securityScore}%. Ab $${vpn.priceTwoYear || vpn.priceYearly}/Monat.`,
    es: `Reseña completa de ${vpn.name} 2025. ${vpn.shortDescription} Velocidad: ${vpn.speedScore}%, Seguridad: ${vpn.securityScore}%. Desde $${vpn.priceTwoYear || vpn.priceYearly}/mes.`,
    fr: `Avis complet sur ${vpn.name} 2025. ${vpn.shortDescription} Vitesse: ${vpn.speedScore}%, Sécurité: ${vpn.securityScore}%. À partir de $${vpn.priceTwoYear || vpn.priceYearly}/mois.`,
    zh: `${vpn.name} 2025完整评测。${vpn.shortDescription} 速度：${vpn.speedScore}%，安全性：${vpn.securityScore}%。每月$${vpn.priceTwoYear || vpn.priceYearly}起。`,
    ja: `${vpn.name} 2025年完全レビュー。${vpn.shortDescription} 速度：${vpn.speedScore}%、セキュリティ：${vpn.securityScore}%。月額$${vpn.priceTwoYear || vpn.priceYearly}から。`,
    ko: `${vpn.name} 2025 완전 리뷰. ${vpn.shortDescription} 속도: ${vpn.speedScore}%, 보안: ${vpn.securityScore}%. 월 $${vpn.priceTwoYear || vpn.priceYearly}부터.`,
    th: `รีวิว ${vpn.name} 2025 ฉบับสมบูรณ์ ${vpn.shortDescription} ความเร็ว: ${vpn.speedScore}%, ความปลอดภัย: ${vpn.securityScore}% เริ่มต้น $${vpn.priceTwoYear || vpn.priceYearly}/เดือน`,
  };

  const titles: Record<string, string> = {
    en: `${vpn.name} Review 2025 - Honest Test & Rating`,
    nl: `${vpn.name} Review 2025 - Eerlijke Test & Beoordeling`,
    de: `${vpn.name} Test 2025 - Ehrlicher Test & Bewertung`,
    es: `${vpn.name} Reseña 2025 - Prueba Honesta y Calificación`,
    fr: `${vpn.name} Avis 2025 - Test Honnête et Note`,
    zh: `${vpn.name} 评测 2025 - 诚实测试与评分`,
    ja: `${vpn.name} レビュー 2025 - 正直なテストと評価`,
    ko: `${vpn.name} 리뷰 2025 - 정직한 테스트 및 평가`,
    th: `รีวิว ${vpn.name} 2025 - ทดสอบและให้คะแนนอย่างตรงไปตรงมา`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      vpn.name,
      `${vpn.name} review`,
      `${vpn.name} test`,
      `${vpn.name} 2025`,
      "VPN review",
      "VPN test",
      "best VPN",
      `${vpn.name} price`,
      `${vpn.name} speed`,
      vpn.netflixSupport ? `${vpn.name} Netflix` : "",
      vpn.torrentSupport ? `${vpn.name} torrenting` : "",
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      locale: locale,
      type: "article",
      images: vpn.ogImage ? [
        {
          url: vpn.ogImage,
          width: 1200,
          height: 630,
          alt: `${vpn.name} Review`,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: vpn.ogImage ? [vpn.ogImage] : undefined,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { locale: _locale, slug } = await params;
  setRequestLocale(_locale);
  const t = await getTranslations("vpnReview");

  const vpn = await getVpnBySlug(slug);

  if (!vpn) {
    notFound();
  }

  const prefix = _locale === "en" ? "" : `/${_locale}`;
  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
    { name: `${vpn.name} Review`, url: `${baseUrl}${prefix}/reviews/${vpn.slug}` },
  ];

  return (
    <>
      <VpnReviewSchema vpn={vpn} />
      <VpnProductSchema vpn={vpn} />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Screenshot Section */}
      {vpn.screenshot && (
        <section className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
          <Image
            src={vpn.screenshot}
            alt={`${vpn.name} website screenshot`}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </section>
      )}

      <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/reviews"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToReviews")}
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {vpn.editorChoice && (
                <Badge className="bg-yellow-500 text-yellow-950">
                  {t("editorChoice")}
                </Badge>
              )}
              {vpn.freeTier && <Badge variant="secondary">{t("freeTierAvailable")}</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-4">{t("reviewTitle", { name: vpn.name })}</h1>
            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={vpn.overallRating} size="lg" />
              <span className="text-muted-foreground">
                {t("basedOnTesting")}
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {vpn.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <AffiliateButton
                vpnId={vpn.id}
                vpnName={vpn.name}
                affiliateUrl={vpn.affiliateUrl}
                size="lg"
              >
                {t("getVpnPrice", { name: vpn.name, price: String(vpn.priceTwoYear || vpn.priceYearly) })}
              </AffiliateButton>
            </div>
          </div>

          {/* Quick Stats Card */}
          <Card className="lg:w-80">
            <CardHeader>
              <CardTitle className="text-lg">{t("quickStats.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quickStats.servers")}</span>
                <span className="font-semibold">
                  {vpn.servers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quickStats.countries")}</span>
                <span className="font-semibold">{vpn.countries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quickStats.devices")}</span>
                <span className="font-semibold">
                  {vpn.maxDevices >= 999 ? t("quickStats.unlimited") : vpn.maxDevices}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quickStats.moneyBack")}</span>
                <span className="font-semibold">{t("quickStats.days", { count: vpn.moneyBackDays })}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("quickStats.startingAt")}</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">
                    ${vpn.priceTwoYear || vpn.priceYearly}
                  </span>
                  <span className="text-muted-foreground">{t("quickStats.perMonth")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{t("scores.speed")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.speedScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${vpn.speedScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">{t("scores.security")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.securityScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${vpn.securityScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">{t("scores.streaming")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.streamingScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${vpn.streamingScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center gap-2">
                <Check className="h-5 w-5" />
                {t("prosAndCons.pros")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {vpn.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <X className="h-5 w-5" />
                {t("prosAndCons.cons")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {vpn.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
            <TabsTrigger value="pricing">{t("tabs.pricing")}</TabsTrigger>
            <TabsTrigger value="security">{t("tabs.security")}</TabsTrigger>
            <TabsTrigger value="streaming">{t("tabs.streaming")}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="pt-6 prose prose-gray max-w-none">
                <h3>{t("overview.about", { name: vpn.name })}</h3>
                <p>
                  {t("overview.description", {
                    name: vpn.name,
                    servers: vpn.servers.toLocaleString(),
                    countries: vpn.countries,
                    devices: vpn.maxDevices >= 999 ? t("quickStats.unlimited").toLowerCase() : String(vpn.maxDevices)
                  })}
                </p>
                <h4>{t("overview.keyFeatures")}</h4>
                <ul>
                  <li>
                    <strong>{t("overview.serverNetwork")}</strong>{" "}
                    {t("overview.serversInCountries", { servers: vpn.servers.toLocaleString(), countries: vpn.countries })}
                  </li>
                  <li>
                    <strong>{t("overview.protocols")}</strong> {vpn.protocols.join(", ")}
                  </li>
                  <li>
                    <strong>{t("overview.encryption")}</strong> {vpn.encryption}
                  </li>
                  <li>
                    <strong>{t("overview.killSwitch")}</strong>{" "}
                    {vpn.killSwitch ? t("overview.yes") : t("overview.no")}
                  </li>
                  <li>
                    <strong>{t("overview.noLogsPolicy")}</strong>{" "}
                    {vpn.noLogs ? t("overview.yesAudited") : t("overview.limited")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pricing" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  {t("pricing.title", { name: vpn.name })}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t("pricing.monthly")}
                    </div>
                    <div className="text-3xl font-bold">${vpn.priceMonthly}</div>
                    <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center border-primary bg-primary/5">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t("pricing.yearly")}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      ${vpn.priceYearly}
                    </div>
                    <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                    <Badge className="mt-2">{t("pricing.mostPopular")}</Badge>
                  </div>
                  {vpn.priceTwoYear && (
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        {t("pricing.twoYears")}
                      </div>
                      <div className="text-3xl font-bold">${vpn.priceTwoYear}</div>
                      <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                      <Badge variant="secondary" className="mt-2">
                        {t("pricing.bestValue")}
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  {t("pricing.moneyBackGuarantee", { days: vpn.moneyBackDays })}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  {t("securityFeatures.title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {vpn.noLogs ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>{t("securityFeatures.noLogsPolicy")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {vpn.killSwitch ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>{t("securityFeatures.killSwitch")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t("securityFeatures.encryption", { type: vpn.encryption })}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t("securityFeatures.supportedProtocols")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {vpn.protocols.map((protocol) => (
                        <Badge key={protocol} variant="outline">
                          {protocol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="streaming" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  {t("streamingSection.title")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.netflix")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.disneyPlus")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.amazonPrime")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.bbcIplayer")}</span>
                  </div>
                </div>
                {vpn.torrentSupport && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">{t("streamingSection.p2pSupported")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("streamingSection.torrentDescription", { name: vpn.name })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Coupon Section */}
        <CouponSection vpn={vpn} locale={_locale} t={t} />

        {/* Verdict */}
        <Card className="mb-12 border-primary">
          <CardHeader>
            <CardTitle>{t("verdict.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              {t("verdict.description", {
                name: vpn.name,
                rating: vpn.overallRating,
                servers: vpn.servers.toLocaleString(),
                countries: vpn.countries
              })}
              {vpn.editorChoice && t("verdict.editorChoiceNote")}
            </p>
            <AffiliateButton
              vpnId={vpn.id}
              vpnName={vpn.name}
              affiliateUrl={vpn.affiliateUrl}
              size="lg"
            >
              {t("verdict.getVpnNow", { name: vpn.name, price: String(vpn.priceTwoYear || vpn.priceYearly) })}
            </AffiliateButton>
          </CardContent>
        </Card>

        {/* User Reviews Section */}
        <UserReviewsSection vpn={vpn} locale={_locale} title={t("userReviews.title")} />
      </div>
      </div>
    </>
  );
}

// Coupon Section Component
function CouponSection({
  vpn,
  locale,
  t
}: {
  vpn: { slug: string; name: string; affiliateUrl: string };
  locale: string;
  t: (key: string, params?: Record<string, string>) => string;
}) {
  const coupons = getCouponsByVpnSlug(vpn.slug);

  if (coupons.length === 0) {
    return null;
  }

  return (
    <section id="coupons" className="mb-12">
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Ticket className="h-6 w-6 text-orange-600" />
            <CardTitle className="text-2xl">
              {t("coupons.title", { name: vpn.name })}
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            {t("coupons.subtitle")}
          </p>
        </CardHeader>
        <CardContent>
          <CouponList
            coupons={coupons}
            vpnName={vpn.name}
            affiliateUrl={vpn.affiliateUrl}
          />
        </CardContent>
      </Card>
    </section>
  );
}

// User Reviews Section Component
function UserReviewsSection({ vpn, locale, title }: { vpn: { slug: string; name: string }; locale: string; title: string }) {
  const userReviews = getReviewsByVpnSlug(vpn.slug, locale);
  const { average, count } = getAverageUserRating(vpn.slug);

  return (
    <section id="user-reviews" className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Review Form */}
      <ReviewForm vpnSlug={vpn.slug} vpnName={vpn.name} locale={locale} />

      {/* Reviews List */}
      <UserReviewsList
        reviews={userReviews}
        locale={locale}
        averageRating={average}
        totalReviews={count}
      />
    </section>
  );
}
