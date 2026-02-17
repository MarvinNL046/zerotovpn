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
import { getVpnBySlug } from "@/lib/vpn-data-layer";
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
  FaqSchema,
} from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { getShortMonthYear, getLocalizedMonthYear } from "@/lib/seo-utils";
import { LastUpdated } from "@/components/last-updated";
import { vpnProviders } from "@/lib/vpn-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate a "Best For" label dynamically from VPN attributes
function generateBestFor(vpn: {
  editorChoice: boolean;
  streamingScore: number;
  speedScore: number;
  torrentSupport: boolean;
  netflixSupport: boolean;
  securityScore: number;
  noLogs: boolean;
  priceMonthly: number;
}): string {
  if (vpn.editorChoice) return "All-around use";
  if (vpn.streamingScore >= 90 && vpn.netflixSupport) return "Streaming & Netflix";
  if (vpn.speedScore >= 90) return "Speed & gaming";
  if (vpn.torrentSupport && vpn.noLogs) return "Torrenting & privacy";
  if (vpn.securityScore >= 90) return "Security & privacy";
  if (vpn.priceMonthly <= 3) return "Budget users";
  return "Everyday privacy";
}

// Generate a short verdict sentence dynamically from VPN attributes
function generateVerdictText(vpn: {
  name: string;
  overallRating: number;
  speedScore: number;
  streamingScore: number;
  netflixSupport: boolean;
  noLogs: boolean;
  editorChoice: boolean;
  torrentSupport: boolean;
}): string {
  if (vpn.editorChoice) {
    return `${vpn.name} is our top-rated VPN, excelling across speed, security, and streaming. It is one of the best all-around choices for any user.`;
  }
  if (vpn.overallRating >= 4.5) {
    const streaming = vpn.netflixSupport ? " and reliably unblocks Netflix" : "";
    return `${vpn.name} is an excellent VPN with a ${vpn.speedScore}% speed score${streaming}. A top choice for users who want premium performance without compromise.`;
  }
  if (vpn.streamingScore >= 85 && vpn.netflixSupport) {
    return `${vpn.name} is a strong pick for streaming fans, unblocking Netflix and other platforms with ease. Its ${vpn.speedScore}% speed score ensures smooth HD playback.`;
  }
  if (vpn.torrentSupport && vpn.noLogs) {
    return `${vpn.name} is well-suited for privacy-focused users and torrenters. Its strict no-logs policy and dedicated P2P servers make it a reliable privacy tool.`;
  }
  return `${vpn.name} is a solid VPN with a ${vpn.speedScore}% speed score and ${vpn.streamingScore}% streaming score, making it a reliable choice for everyday online privacy.`;
}

// Generate FAQ items dynamically from VPN data
function generateFaqs(vpn: {
  name: string;
  netflixSupport: boolean;
  streamingScore: number;
  priceMonthly: number;
  priceYearly: number;
  priceTwoYear?: number | null;
  encryption: string;
  killSwitch: boolean;
  noLogs: boolean;
  moneyBackDays: number;
  speedScore: number;
  servers: number;
  countries: number;
}): { question: string; answer: string }[] {
  return [
    {
      question: `Does ${vpn.name} work with Netflix?`,
      answer: vpn.netflixSupport
        ? `Yes, ${vpn.name} reliably works with Netflix. With a streaming score of ${vpn.streamingScore}%, it can unblock Netflix libraries from multiple countries including the US, UK, and more.`
        : `${vpn.name} has limited Netflix support. Its streaming score is ${vpn.streamingScore}%, so results may vary depending on the server location you choose.`,
    },
    {
      question: `How much does ${vpn.name} cost in 2026?`,
      answer: `${vpn.name} offers flexible pricing plans. The monthly plan costs $${vpn.priceMonthly}/month, the 1-year plan costs $${vpn.priceYearly}/month, and the best value${vpn.priceTwoYear ? ` 2-year plan costs $${vpn.priceTwoYear}/month` : ` 1-year plan at $${vpn.priceYearly}/month`}. All plans come with a ${vpn.moneyBackDays}-day money-back guarantee.`,
    },
    {
      question: `Is ${vpn.name} safe to use?`,
      answer: `Yes, ${vpn.name} is safe. It uses ${vpn.encryption} encryption${vpn.killSwitch ? ", includes a kill switch that cuts your internet if the VPN drops" : ""}, and ${vpn.noLogs ? "has a strict no-logs policy that has been independently audited" : "maintains a no-logs policy for your privacy"}.`,
    },
    {
      question: `Does ${vpn.name} have a free trial?`,
      answer: `${vpn.name} does not offer a free trial, but it comes with a ${vpn.moneyBackDays}-day money-back guarantee. This gives you plenty of time to test the service risk-free and get a full refund if you are not satisfied.`,
    },
    {
      question: `How fast is ${vpn.name}?`,
      answer: `${vpn.name} scores ${vpn.speedScore}% in our speed tests, which places it ${vpn.speedScore >= 90 ? "among the fastest VPNs available" : vpn.speedScore >= 75 ? "above average in speed" : "at average speed levels"}. In practice this means ${vpn.speedScore >= 90 ? "minimal impact on your connection for streaming, gaming, and large downloads" : vpn.speedScore >= 75 ? "a smooth experience for most everyday tasks including HD streaming" : "adequate performance for browsing and standard-definition streaming"}.`,
    },
    {
      question: `How many servers does ${vpn.name} have?`,
      answer: `${vpn.name} operates a network of ${vpn.servers.toLocaleString("en-US")} servers across ${vpn.countries} countries. This large network helps you find a fast nearby server and access geo-restricted content from many regions around the world.`,
    },
  ];
}

const baseUrl = "https://zerotovpn.com";
export const revalidate = 86400;

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

  const shortMonthYear = getShortMonthYear();
  const isNordVpn = vpn.slug === "nordvpn";

  // Generate locale-specific descriptions
  const descriptions: Record<string, string> = {
    en: isNordVpn
      ? `NordVPN Review 2026: We tested NordVPN for 30+ days. Speeds, security, streaming & honest verdict. Is it still the best VPN? From $2.99/mo · ${vpn.moneyBackDays}-day guarantee.`
      : `We tested ${vpn.name} for 30+ days. See speeds, security, streaming results & our honest verdict. Updated ${shortMonthYear}. ${vpn.moneyBackDays}-day money-back guarantee.`,
    nl: `Volledige ${vpn.name} review ${shortMonthYear}. ${vpn.shortDescription} Snelheid: ${vpn.speedScore}%, Beveiliging: ${vpn.securityScore}%. Vanaf $${vpn.priceTwoYear || vpn.priceYearly}/maand.`,
    de: `Vollständiger ${vpn.name} Test ${shortMonthYear}. ${vpn.shortDescription} Geschwindigkeit: ${vpn.speedScore}%, Sicherheit: ${vpn.securityScore}%. Ab $${vpn.priceTwoYear || vpn.priceYearly}/Monat.`,
    es: `Reseña completa de ${vpn.name} ${shortMonthYear}. ${vpn.shortDescription} Velocidad: ${vpn.speedScore}%, Seguridad: ${vpn.securityScore}%. Desde $${vpn.priceTwoYear || vpn.priceYearly}/mes.`,
    fr: `Avis complet sur ${vpn.name} ${shortMonthYear}. ${vpn.shortDescription} Vitesse: ${vpn.speedScore}%, Sécurité: ${vpn.securityScore}%. À partir de $${vpn.priceTwoYear || vpn.priceYearly}/mois.`,
    zh: `${vpn.name} ${shortMonthYear}完整评测。${vpn.shortDescription} 速度：${vpn.speedScore}%，安全性：${vpn.securityScore}%。每月$${vpn.priceTwoYear || vpn.priceYearly}起。`,
    ja: `${vpn.name} ${shortMonthYear}完全レビュー。${vpn.shortDescription} 速度：${vpn.speedScore}%、セキュリティ：${vpn.securityScore}%。月額$${vpn.priceTwoYear || vpn.priceYearly}から。`,
    ko: `${vpn.name} ${shortMonthYear} 완전 리뷰. ${vpn.shortDescription} 속도: ${vpn.speedScore}%, 보안: ${vpn.securityScore}%. 월 $${vpn.priceTwoYear || vpn.priceYearly}부터.`,
    th: `รีวิว ${vpn.name} ${shortMonthYear} ฉบับสมบูรณ์ ${vpn.shortDescription} ความเร็ว: ${vpn.speedScore}%, ความปลอดภัย: ${vpn.securityScore}% เริ่มต้น $${vpn.priceTwoYear || vpn.priceYearly}/เดือน`,
  };

  const titles: Record<string, string> = {
    en: isNordVpn
      ? `NordVPN Review 2026: Is It Still the Best VPN? (Tested) | ZeroToVPN`
      : `${vpn.name} Review (${shortMonthYear}) - Tested & Rated | ZeroToVPN`,
    nl: `${vpn.name} Review (${getLocalizedMonthYear("nl")}) - Eerlijke Test & Beoordeling | ZeroToVPN`,
    de: `${vpn.name} Test (${getLocalizedMonthYear("de")}) - Ehrlicher Test & Bewertung | ZeroToVPN`,
    es: `${vpn.name} Reseña (${getLocalizedMonthYear("es")}) - Prueba Honesta y Calificación | ZeroToVPN`,
    fr: `${vpn.name} Avis (${getLocalizedMonthYear("fr")}) - Test Honnête et Note | ZeroToVPN`,
    zh: `${vpn.name} 评测 (${getLocalizedMonthYear("zh")}) - 诚实测试与评分 | ZeroToVPN`,
    ja: `${vpn.name} レビュー (${getLocalizedMonthYear("ja")}) - 正直なテストと評価 | ZeroToVPN`,
    ko: `${vpn.name} 리뷰 (${getLocalizedMonthYear("ko")}) - 정직한 테스트 및 평가 | ZeroToVPN`,
    th: `รีวิว ${vpn.name} (${getLocalizedMonthYear("th")}) - ทดสอบและให้คะแนนอย่างตรงไปตรงมา | ZeroToVPN`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: isNordVpn && locale === "en"
      ? [
          "nordvpn review",
          "nordvpn review 2026",
          "nordvpn 2026",
          "best vpn 2026",
          "nordvpn speed test",
          "nordvpn price",
          "nordvpn netflix",
          "is nordvpn worth it",
          "nordvpn vs expressvpn",
        ]
      : [
          vpn.name,
          `${vpn.name} review`,
          `${vpn.name} test`,
          `${vpn.name} 2026`,
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

  const faqs = generateFaqs(vpn);

  return (
    <>
      <VpnReviewSchema vpn={vpn} />
      <VpnProductSchema vpn={vpn} />
      <BreadcrumbSchema items={breadcrumbs} />
      <FaqSchema faqs={faqs} />

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
            <h1 className="text-4xl font-bold mb-2">{t("reviewTitle", { name: vpn.name })}</h1>
            <LastUpdated locale={_locale} className="mb-4" />
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

        {/* Quick Verdict Summary Box */}
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8 my-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold">Quick Verdict</span>
            <span className="bg-primary text-primary-foreground text-sm font-bold px-2.5 py-0.5 rounded-full">
              {vpn.overallRating}/5
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Best For</div>
              <div className="font-semibold">{generateBestFor(vpn)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Price</div>
              <div className="font-semibold">From ${vpn.priceTwoYear ?? vpn.priceYearly}/mo</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Servers</div>
              <div className="font-semibold">{vpn.servers.toLocaleString()}+ in {vpn.countries} countries</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Money-Back</div>
              <div className="font-semibold">{vpn.moneyBackDays}-day guarantee</div>
            </div>
          </div>

          <p className="text-muted-foreground">
            {generateVerdictText(vpn)}
          </p>
        </div>

        {/* NordVPN Top Pick Sidebar Card - shown on non-NordVPN review pages */}
        {vpn.slug !== "nordvpn" && (
          <div className="rounded-lg border bg-muted/50 p-4 mt-6 mb-8">
            <div className="text-sm font-semibold mb-1">See Our #1 Pick</div>
            <div className="text-lg font-bold mb-2">NordVPN</div>
            <div className="text-sm text-muted-foreground mb-3">
              Rated 4.8/5 · From $2.99/mo · 7,400+ servers
            </div>
            <div className="flex gap-2 flex-wrap">
              <a
                href="https://go.zerotovpn.com/nordvpn"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition"
              >
                Get NordVPN →
              </a>
              <Link
                href={`/reviews/nordvpn`}
                className="text-sm border px-3 py-1.5 rounded-md font-medium hover:bg-muted transition"
              >
                Read Review
              </Link>
            </div>
          </div>
        )}

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
                <h3>Is {vpn.name} Worth It?</h3>
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
                  How Much Does {vpn.name} Cost?
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
                  Is {vpn.name} Safe?
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
                  Does {vpn.name} Work with Netflix?
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
        <CouponSection vpn={vpn} t={t} />

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

        {/* FAQ Section */}
        <FaqSection faqs={faqs} vpnName={vpn.name} />

        {/* Compare with Other VPNs Section */}
        <CompareWithOtherVpns vpn={vpn} />

        {/* User Reviews Section */}
        <UserReviewsSection vpn={vpn} locale={_locale} title={t("userReviews.title")} />
      </div>
      </div>
    </>
  );
}

// Compare with Other VPNs Section Component
function CompareWithOtherVpns({
  vpn,
}: {
  vpn: { slug: string; name: string };
}) {
  // Pick the top 5 VPNs by sortOrder for comparisons, excluding the current VPN
  const topVpns = vpnProviders
    .filter((v) => v.slug !== vpn.slug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 5);

  // For NordVPN's review page, compare with top competitors (no NordVPN)
  // For other pages, always put NordVPN first, then add 2-3 more
  let comparisonVpns: typeof topVpns;
  if (vpn.slug === "nordvpn") {
    comparisonVpns = topVpns.slice(0, 4);
  } else {
    const nordvpn = vpnProviders.find((v) => v.slug === "nordvpn");
    const others = topVpns.filter((v) => v.slug !== "nordvpn").slice(0, 3);
    comparisonVpns = nordvpn ? [nordvpn, ...others] : others.slice(0, 4);
  }

  return (
    <section className="mt-12 mb-12">
      <h2 className="text-xl font-bold mb-4">
        Compare {vpn.name} with Other VPNs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {comparisonVpns.map((otherVpn) => {
          const slug1 = vpn.slug;
          const slug2 = otherVpn.slug;
          return (
            <Link
              key={otherVpn.slug}
              href={`/compare/${slug1}-vs-${slug2}`}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium hover:bg-muted/60 hover:border-primary/50 transition-colors"
            >
              <span>
                {vpn.name} vs {otherVpn.name}
              </span>
              <span className="text-muted-foreground">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// FAQ Section Component (visible accordion-style Q&A)
function FaqSection({
  faqs,
  vpnName,
}: {
  faqs: { question: string; answer: string }[];
  vpnName: string;
}) {
  return (
    <section id="faq" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Frequently Asked Questions about {vpnName}
      </h2>
      <div className="divide-y divide-border rounded-lg border">
        {faqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-base font-medium hover:bg-muted/50 list-none">
              {faq.question}
              <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-4 pt-2 text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Coupon Section Component
function CouponSection({
  vpn,
  t
}: {
  vpn: { slug: string; name: string; affiliateUrl: string };
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
