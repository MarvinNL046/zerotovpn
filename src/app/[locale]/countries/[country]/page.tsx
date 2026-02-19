import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  getCountryBySlug,
  STATIC_COUNTRY_SLUGS,
} from "@/lib/country-data";
import {
  getCountryTranslation,
  getCountryPageLabels,
} from "@/lib/country-translations";
import { generateAlternates } from "@/lib/seo-utils";
import {
  Shield,
  CheckCircle,
  Clock,
  Scale,
  Lock,
  Ban,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

const baseUrl = "https://zerotovpn.com";
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const data = getCountryBySlug(country);

  if (!data) {
    return { title: "Country Not Found" };
  }

  // Use translated metadata if available
  const translated = getCountryTranslation(country, locale);
  const metaTitle = translated?.metaTitle || data.metaTitle;
  const metaDescription = translated?.metaDescription || data.metaDescription;

  return {
    metadataBase: new URL(baseUrl),
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
    },
    alternates: generateAlternates(`/countries/${country}`, locale),
  };
}

export default async function DynamicCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);

  // Don't render for static country slugs (those have dedicated pages)
  if (STATIC_COUNTRY_SLUGS.includes(country)) {
    notFound();
  }

  const data = getCountryBySlug(country);
  if (!data) {
    notFound();
  }

  // Get translated content (falls back to English if not available)
  const translated = getCountryTranslation(country, locale);
  const labels = getCountryPageLabels(locale);

  // Merge translated content with base data
  const content = {
    statusLabel: translated?.statusLabel || data.statusLabel,
    heroSubtitle: translated?.heroSubtitle || data.heroSubtitle,
    legalSummary: translated?.legalSummary || data.legalSummary,
    whyVpn: translated?.whyVpn || data.whyVpn,
    blockedServices: translated?.blockedServices || data.blockedServices,
    keyFeatures: translated?.keyFeatures || data.keyFeatures,
    tips: translated?.tips || data.tips,
    faq: translated?.faq || data.faq,
    metaTitle: translated?.metaTitle || data.metaTitle,
    metaDescription: translated?.metaDescription || data.metaDescription,
  };

  const allVpns = await getAllVpns();
  const recommendedVpns = allVpns.filter((vpn) =>
    data.recommendedVpnSlugs.includes(vpn.slug)
  );

  const getStatusIcon = () => {
    switch (data.status) {
      case "restricted":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "legal-restricted":
        return <Shield className="h-5 w-5 text-yellow-500" />;
      case "legal":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case "restricted":
        return "bg-red-500 text-white";
      case "legal-restricted":
        return "bg-yellow-500 text-yellow-950";
      case "legal":
        return "bg-green-500 text-white";
    }
  };

  // Helper to replace placeholders in label strings
  const t = (template: string, vars: Record<string, string | number>) => {
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
      result = result.replace(`{${key}}`, String(value));
    }
    return result;
  };

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.metaTitle,
    description: content.metaDescription,
    datePublished: "2026-01-15",
    dateModified: "2026-02-15",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroToVPN",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: labels.allCountryGuides, href: "/countries" },
            { name: data.name, href: `/countries/${data.slug}` },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {labels.badge}
            </Badge>
            <div className="text-7xl mb-4">{data.flag}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t(labels.bestVpnFor, { country: data.name })}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.heroSubtitle}
            </p>
            <Badge className={getStatusColor()}>
              {getStatusIcon()}
              <span className="ml-1">{content.statusLabel}</span>
            </Badge>
          </div>
        </div>
      </section>

      {/* Legal Status Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <Scale className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-3">
                      {t(labels.legalStatusTitle, { country: data.name })}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {content.legalSummary}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {getStatusIcon()}
                      <span className="font-medium">{content.statusLabel}</span>
                      {data.internetFreedomScore > 0 && (
                        <span className="text-sm text-muted-foreground ml-4">
                          {t(labels.internetFreedomScore, {
                            score: data.internetFreedomScore,
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why You Need a VPN Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t(labels.whyTitle, { country: data.name })}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whyVpn.map((reason, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background border"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blocked Services Section (only if there are blocked services) */}
      {content.blockedServices.length > 0 && (
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {t(labels.blockedTitle, { country: data.name })}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.blockedServices.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20"
                  >
                    <Ban className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommended VPNs Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {t(labels.bestVpnsTitle, { country: data.name })}
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              {t(labels.bestVpnsSubtitle, { country: data.name })}
            </p>
            <div className="space-y-6">
              {recommendedVpns.map((vpn, index) => {
                const bestPrice = vpn.priceTwoYear || vpn.priceYearly;
                const savings = Math.round(
                  ((vpn.priceMonthly - bestPrice) / vpn.priceMonthly) * 100
                );

                return (
                  <Card
                    key={vpn.id}
                    className={`p-6 relative overflow-hidden ${
                      index === 0 ? "border-2 border-primary" : ""
                    }`}
                  >
                    {index === 0 && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground px-3 py-1">
                          {t(labels.topPick, { country: data.name })}
                        </Badge>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* VPN Info */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                          <VpnLogo name={vpn.name} size="lg" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{vpn.name}</h3>
                          <RatingStars rating={vpn.overallRating} size="sm" />
                        </div>
                      </div>

                      {/* Key Stats */}
                      <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {labels.servers}
                          </div>
                          <div className="font-bold">
                            {vpn.servers.toLocaleString()}+
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {labels.countries}
                          </div>
                          <div className="font-bold">{vpn.countries}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {labels.devices}
                          </div>
                          <div className="font-bold">
                            {vpn.maxDevices >= 100
                              ? labels.unlimited
                              : vpn.maxDevices}
                          </div>
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground line-through">
                            ${vpn.priceMonthly.toFixed(2)}/mo
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            ${bestPrice.toFixed(2)}/mo
                          </div>
                          {savings > 0 && (
                            <Badge variant="secondary" className="mt-1">
                              {t(labels.save, { n: savings })}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <AffiliateButton
                            vpnId={vpn.id}
                            vpnName={vpn.name}
                            affiliateUrl={vpn.affiliateUrl}
                            size="sm"
                          >
                            {t(labels.visitVpn, { vpnName: vpn.name })}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </AffiliateButton>
                          <Link
                            href={`/reviews/${vpn.slug}`}
                            className="text-xs text-center text-primary hover:underline"
                          >
                            {labels.readFullReview}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Features row */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                      {vpn.killSwitch && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          {labels.killSwitch}
                        </Badge>
                      )}
                      {vpn.noLogs && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          {labels.noLogs}
                        </Badge>
                      )}
                      {vpn.netflixSupport && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          {labels.netflix}
                        </Badge>
                      )}
                      {vpn.torrentSupport && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          {labels.p2p}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        <Lock className="h-3 w-3 mr-1" />
                        {vpn.encryption}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features to Look For */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t(labels.featuresTitle, { country: data.name })}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.keyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border"
                >
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t(labels.tipsTitle, { country: data.name })}
            </h2>
            <div className="space-y-4">
              {content.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg border"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {labels.faqTitle}
            </h2>
            <div className="space-y-4">
              {content.faq.map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-2">{item.q}</h3>
                        <p className="text-muted-foreground">{item.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12">
        <div className="container">
          <RelatedPages
            title={labels.relatedTitle}
            pages={[
              {
                title: labels.allCountryGuides,
                description: labels.allCountryGuidesDesc,
                href: "/countries",
                icon: "globe",
              },
              {
                title: labels.bestVpn2026,
                description: labels.bestVpn2026Desc,
                href: "/best/best-vpn",
                icon: "trophy",
              },
              {
                title: labels.vpnComparison,
                description: labels.vpnComparisonDesc,
                href: "/compare",
                icon: "check",
              },
              {
                title: labels.whatIsVpn,
                description: labels.whatIsVpnDesc,
                href: "/guides/what-is-vpn",
                icon: "shield",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
