import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/vpn/rating-stars";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { UserReviewsList } from "@/components/reviews/user-reviews-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { getVpnBySlug, getAllVpns } from "@/lib/vpn-data";
import { getReviewsByVpnSlug, getAverageUserRating } from "@/lib/user-reviews";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Check,
  X,
  ArrowLeft,
  Tv,
  MessageSquare,
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
  const vpns = getAllVpns();
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
  const vpn = getVpnBySlug(slug);

  if (!vpn) {
    return { title: "VPN Not Found" };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews/${vpn.slug}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {};
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
      images: [
        {
          url: `/vpn/${vpn.slug}-og.png`,
          width: 1200,
          height: 630,
          alt: `${vpn.name} Review`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`/vpn/${vpn.slug}-og.png`],
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vpn = getVpnBySlug(slug);

  if (!vpn) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
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
      <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/reviews"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reviews
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {vpn.editorChoice && (
                <Badge className="bg-yellow-500 text-yellow-950">
                  Editor&apos;s Choice
                </Badge>
              )}
              {vpn.freeTier && <Badge variant="secondary">Free Tier Available</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-4">{vpn.name} Review 2025</h1>
            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={vpn.overallRating} size="lg" />
              <span className="text-muted-foreground">
                Based on our comprehensive testing
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
                Get {vpn.name} - ${vpn.priceTwoYear || vpn.priceYearly}/mo
              </AffiliateButton>
            </div>
          </div>

          {/* Quick Stats Card */}
          <Card className="lg:w-80">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servers</span>
                <span className="font-semibold">
                  {vpn.servers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Countries</span>
                <span className="font-semibold">{vpn.countries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Devices</span>
                <span className="font-semibold">
                  {vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Money-back</span>
                <span className="font-semibold">{vpn.moneyBackDays} days</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Starting at</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">
                    ${vpn.priceTwoYear || vpn.priceYearly}
                  </span>
                  <span className="text-muted-foreground">/mo</span>
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
                  <span className="font-semibold">Speed</span>
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
                  <span className="font-semibold">Security</span>
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
                  <span className="font-semibold">Streaming</span>
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
                Pros
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
                Cons
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="streaming">Streaming</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="pt-6 prose prose-gray max-w-none">
                <h3>About {vpn.name}</h3>
                <p>
                  {vpn.name} is one of the leading VPN providers in the market,
                  offering {vpn.servers.toLocaleString()} servers across{" "}
                  {vpn.countries} countries. With support for up to{" "}
                  {vpn.maxDevices >= 999 ? "unlimited" : vpn.maxDevices} simultaneous
                  connections, it&apos;s suitable for individuals and families alike.
                </p>
                <h4>Key Features</h4>
                <ul>
                  <li>
                    <strong>Server Network:</strong> {vpn.servers.toLocaleString()}{" "}
                    servers in {vpn.countries} countries
                  </li>
                  <li>
                    <strong>Protocols:</strong> {vpn.protocols.join(", ")}
                  </li>
                  <li>
                    <strong>Encryption:</strong> {vpn.encryption}
                  </li>
                  <li>
                    <strong>Kill Switch:</strong>{" "}
                    {vpn.killSwitch ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>No-Logs Policy:</strong>{" "}
                    {vpn.noLogs ? "Yes (audited)" : "Limited"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pricing" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  {vpn.name} Pricing Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      Monthly
                    </div>
                    <div className="text-3xl font-bold">${vpn.priceMonthly}</div>
                    <div className="text-sm text-muted-foreground">/month</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center border-primary bg-primary/5">
                    <div className="text-sm text-muted-foreground mb-2">
                      Yearly
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      ${vpn.priceYearly}
                    </div>
                    <div className="text-sm text-muted-foreground">/month</div>
                    <Badge className="mt-2">Most Popular</Badge>
                  </div>
                  {vpn.priceTwoYear && (
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        2 Years
                      </div>
                      <div className="text-3xl font-bold">${vpn.priceTwoYear}</div>
                      <div className="text-sm text-muted-foreground">/month</div>
                      <Badge variant="secondary" className="mt-2">
                        Best Value
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  All plans include a {vpn.moneyBackDays}-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  Security & Privacy Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {vpn.noLogs ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>No-Logs Policy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {vpn.killSwitch ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>Kill Switch</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{vpn.encryption} Encryption</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Supported Protocols</h4>
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
                  Streaming Compatibility
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Netflix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Disney+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Amazon Prime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>BBC iPlayer</span>
                  </div>
                </div>
                {vpn.torrentSupport && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">P2P/Torrenting Supported</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {vpn.name} allows torrenting on dedicated servers with
                      optimized speeds.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Verdict */}
        <Card className="mb-12 border-primary">
          <CardHeader>
            <CardTitle>Our Verdict</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              {vpn.name} scores {vpn.overallRating}/5 in our comprehensive testing.
              With {vpn.servers.toLocaleString()} servers across {vpn.countries}{" "}
              countries, it offers excellent coverage and reliable performance.
              {vpn.editorChoice &&
                " It has earned our Editor's Choice award for its outstanding combination of speed, security, and value."}
            </p>
            <AffiliateButton
              vpnId={vpn.id}
              vpnName={vpn.name}
              affiliateUrl={vpn.affiliateUrl}
              size="lg"
            >
              Get {vpn.name} Now - ${vpn.priceTwoYear || vpn.priceYearly}/mo
            </AffiliateButton>
          </CardContent>
        </Card>

        {/* User Reviews Section */}
        <UserReviewsSection vpn={vpn} locale={locale} />
      </div>
      </div>
    </>
  );
}

// User Reviews Section Component
function UserReviewsSection({ vpn, locale }: { vpn: { slug: string; name: string }; locale: string }) {
  const userReviews = getReviewsByVpnSlug(vpn.slug, locale);
  const { average, count } = getAverageUserRating(vpn.slug);

  return (
    <section id="user-reviews" className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">User Reviews</h2>
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
