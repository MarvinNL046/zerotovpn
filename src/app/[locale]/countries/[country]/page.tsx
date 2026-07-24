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
  getAllDynamicCountries,
  STATIC_COUNTRY_SLUGS,
} from "@/lib/country-data";
import {
  getCountryTranslation,
  getCountryPageLabels,
} from "@/lib/country-translations";
import { generateAlternates } from "@/lib/seo-utils";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { RankedVpnRow } from "@/components/vpn/ranked-vpn-row";
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
import InlineAd from "@/components/ads/InlineAd";

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

const baseUrl = "https://www.zerotovpn.com";
export const revalidate = 86400;

export async function generateStaticParams() {
  const allCountries = getAllDynamicCountries();
  const { routing } = await import("@/i18n/routing");

  const params: Array<{ locale: string; country: string }> = [];
  for (const locale of routing.locales) {
    for (const c of allCountries) {
      params.push({ locale, country: c.slug });
    }
  }
  return params;
}

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

  // Strip " | ZeroToVPN" suffix before returning: the layout template adds it automatically.
  const cleanTitle = metaTitle.replace(/ \| ZeroToVPN$/i, "");

  return {
    metadataBase: new URL(baseUrl),
    title: cleanTitle,
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
            <p className="text-center text-muted-foreground mb-4">
              {t(labels.bestVpnsSubtitle, { country: data.name })}
            </p>
            {/* Disclosure vóór de eerste affiliate-knop, niet pas in de footer. */}
            <AffiliateDisclosure className="mb-8 justify-center" />
            <div className="flex flex-col gap-6">
              {recommendedVpns.map((vpn, index) => (
                <RankedVpnRow
                  key={vpn.id}
                  name={vpn.name}
                  slug={vpn.slug}
                  vpnId={vpn.id}
                  affiliateUrl={vpn.affiliateUrl}
                  rating={vpn.overallRating}
                  rank={index + 1}
                  highlight={index === 0}
                  badge={
                    index === 0
                      ? t(labels.topPick, { country: data.name })
                      : undefined
                  }
                  price={`$${(vpn.priceTwoYear || vpn.priceYearly).toFixed(2)}/mo`}
                  stats={[
                    { label: labels.servers, value: `${vpn.servers.toLocaleString()}+` },
                    { label: labels.countries, value: vpn.countries },
                    {
                      label: labels.devices,
                      value: vpn.maxDevices >= 100 ? labels.unlimited : vpn.maxDevices,
                    },
                  ]}
                  labels={{
                    cta: t(labels.visitVpn, { vpnName: vpn.name }),
                    review: labels.readFullReview,
                  }}
                >
                  {/* Pagina-specifiek: welke kenmerken er in dit land toe doen */}
                  <div className="flex flex-wrap gap-2">
                    {vpn.killSwitch && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="mr-1 size-3 text-green-600 dark:text-green-500" />
                        {labels.killSwitch}
                      </Badge>
                    )}
                    {vpn.noLogs && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="mr-1 size-3 text-green-600 dark:text-green-500" />
                        {labels.noLogs}
                      </Badge>
                    )}
                    {vpn.netflixSupport && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="mr-1 size-3 text-green-600 dark:text-green-500" />
                        {labels.netflix}
                      </Badge>
                    )}
                    {vpn.torrentSupport && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="mr-1 size-3 text-green-600 dark:text-green-500" />
                        {labels.p2p}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      <Lock className="mr-1 size-3" />
                      {vpn.encryption}
                    </Badge>
                  </div>
                </RankedVpnRow>
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
            <p className="text-center text-muted-foreground mb-4">
              {t(labels.bestVpnsSubtitle, { country: data.name })}
            </p>
            {/* Disclosure vóór de eerste affiliate-knop, niet pas in de footer. */}
            <AffiliateDisclosure className="mb-8 justify-center" />
            <div className="flex flex-col gap-6">
            </div>
          </div>
        </div>
      </section>

      {/* Ad placement */}
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <InlineAd />
        </div>
      </div>

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
