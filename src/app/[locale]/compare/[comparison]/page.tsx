import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { ComparisonHero } from "@/components/compare/comparison-hero";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import type { VpnData } from "@/lib/db/vpn-service";

type Props = {
  params: Promise<{ locale: string; comparison: string }>;
};

const baseUrl = "https://zerotovpn.com";
export const revalidate = 86400;

// Parse comparison slug (e.g., "nordvpn-vs-surfshark") into two VPN slugs
function parseComparisonSlug(comparison: string): { slug1: string; slug2: string } | null {
  const parts = comparison.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }
  return { slug1: parts[0], slug2: parts[1] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, comparison } = await params;

  const slugs = parseComparisonSlug(comparison);
  if (!slugs) {
    return { title: "Comparison Not Found" };
  }

  const { slug1, slug2 } = slugs;
  const vpn1 = await getVpnBySlug(slug1);
  const vpn2 = await getVpnBySlug(slug2);

  if (!vpn1 || !vpn2) {
    return {
      title: "Comparison Not Found",
    };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/compare/${comparison}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/compare/${comparison}`,
  };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/compare/${comparison}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: `${vpn1.name} vs ${vpn2.name}: Which is Better in 2026? - ZeroToVPN`,
    description: `Compare ${vpn1.name} and ${vpn2.name} side by side. See the differences in speed, security, pricing, features, and more to choose the best VPN for your needs.`,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${vpn1.name} vs ${vpn2.name}: VPN Comparison 2026`,
      description: `Detailed comparison of ${vpn1.name} and ${vpn2.name}. Find out which VPN is faster, more secure, and offers better value.`,
      url: canonicalUrl,
      type: "article",
    },
  };
}

// Comparison Schema for SEO
function ComparisonSchema({ vpn1, vpn2 }: { vpn1: VpnData; vpn2: VpnData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    name: `${vpn1.name} vs ${vpn2.name} Comparison`,
    description: `Detailed comparison of ${vpn1.name} and ${vpn2.name} VPN services`,
    itemReviewed: [
      {
        "@type": "SoftwareApplication",
        name: vpn1.name,
        applicationCategory: "SecurityApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vpn1.overallRating,
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          price: vpn1.priceMonthly,
          priceCurrency: "USD",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: vpn2.name,
        applicationCategory: "SecurityApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vpn2.overallRating,
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          price: vpn2.priceMonthly,
          priceCurrency: "USD",
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

export default async function ComparisonPage({ params }: Props) {
  const { locale, comparison } = await params;
  setRequestLocale(locale);

  // Parse the comparison slug
  const slugs = parseComparisonSlug(comparison);
  if (!slugs) {
    notFound();
  }

  const { slug1, slug2 } = slugs;

  // Fetch both VPNs
  const vpn1 = await getVpnBySlug(slug1);
  const vpn2 = await getVpnBySlug(slug2);

  // If either VPN doesn't exist, show 404
  if (!vpn1 || !vpn2) {
    notFound();
  }

  // Determine overall winner based on rating
  const overallWinner =
    vpn1.overallRating > vpn2.overallRating
      ? "vpn1"
      : vpn1.overallRating < vpn2.overallRating
      ? "vpn2"
      : "tie";

  return (
    <>
      <ComparisonSchema vpn1={vpn1} vpn2={vpn2} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Compare VPNs", href: "/compare" },
              {
                name: `${vpn1.name} vs ${vpn2.name}`,
                href: `/compare/${comparison}`,
              },
            ]}
          />
        </div>

        {/* Hero Section */}
        <ComparisonHero vpn1={vpn1} vpn2={vpn2} overallWinner={overallWinner} />

        {/* Detailed Comparison Table */}
        <ComparisonTable vpn1={vpn1} vpn2={vpn2} />

        {/* Pros and Cons Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pros and Cons
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* VPN 1 Pros/Cons */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">{vpn1.name}</h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-lg">Pros</h4>
                  </div>
                  <ul className="space-y-2">
                    {vpn1.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <X className="h-5 w-5 text-red-400" />
                    <h4 className="font-semibold text-lg">Cons</h4>
                  </div>
                  <ul className="space-y-2">
                    {vpn1.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* VPN 2 Pros/Cons */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">{vpn2.name}</h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-lg">Pros</h4>
                  </div>
                  <ul className="space-y-2">
                    {vpn2.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <X className="h-5 w-5 text-red-400" />
                    <h4 className="font-semibold text-lg">Cons</h4>
                  </div>
                  <ul className="space-y-2">
                    {vpn2.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Final Verdict
              </h2>

              <div className="bg-card border rounded-xl p-8 mb-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {overallWinner === "vpn1" && (
                    <p>
                      <strong>{vpn1.name}</strong> comes out ahead in this
                      comparison with a higher overall rating of{" "}
                      {vpn1.overallRating}/5 compared to {vpn2.name}&apos;s{" "}
                      {vpn2.overallRating}/5. {vpn1.shortDescription}
                    </p>
                  )}
                  {overallWinner === "vpn2" && (
                    <p>
                      <strong>{vpn2.name}</strong> comes out ahead in this
                      comparison with a higher overall rating of{" "}
                      {vpn2.overallRating}/5 compared to {vpn1.name}&apos;s{" "}
                      {vpn1.overallRating}/5. {vpn2.shortDescription}
                    </p>
                  )}
                  {overallWinner === "tie" && (
                    <p>
                      Both <strong>{vpn1.name}</strong> and{" "}
                      <strong>{vpn2.name}</strong> are excellent VPNs with
                      identical overall ratings of {vpn1.overallRating}/5. Your
                      choice should depend on your specific needs and
                      priorities.
                    </p>
                  )}

                  <h3 className="text-xl font-bold mt-6 mb-3">
                    Choose {vpn1.name} if:
                  </h3>
                  <ul className="space-y-2">
                    {vpn1.speedScore > vpn2.speedScore && (
                      <li>You prioritize faster speeds ({vpn1.speedScore}%)</li>
                    )}
                    {vpn1.securityScore > vpn2.securityScore && (
                      <li>
                        You need stronger security ({vpn1.securityScore}%)
                      </li>
                    )}
                    {vpn1.servers > vpn2.servers && (
                      <li>
                        You want more server options ({vpn1.servers.toLocaleString()}+
                        servers)
                      </li>
                    )}
                    {(vpn1.priceTwoYear || vpn1.priceYearly) <
                      (vpn2.priceTwoYear || vpn2.priceYearly) && (
                      <li>
                        You&apos;re looking for better value ($
                        {vpn1.priceTwoYear || vpn1.priceYearly}/mo)
                      </li>
                    )}
                  </ul>

                  <h3 className="text-xl font-bold mt-6 mb-3">
                    Choose {vpn2.name} if:
                  </h3>
                  <ul className="space-y-2">
                    {vpn2.speedScore > vpn1.speedScore && (
                      <li>You prioritize faster speeds ({vpn2.speedScore}%)</li>
                    )}
                    {vpn2.securityScore > vpn1.securityScore && (
                      <li>
                        You need stronger security ({vpn2.securityScore}%)
                      </li>
                    )}
                    {vpn2.servers > vpn1.servers && (
                      <li>
                        You want more server options ({vpn2.servers.toLocaleString()}+
                        servers)
                      </li>
                    )}
                    {(vpn2.priceTwoYear || vpn2.priceYearly) <
                      (vpn1.priceTwoYear || vpn1.priceYearly) && (
                      <li>
                        You&apos;re looking for better value ($
                        {vpn2.priceTwoYear || vpn2.priceYearly}/mo)
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-xl">{vpn1.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {vpn1.overallRating}/5 Rating
                        </Badge>
                        <Badge variant="outline">
                          ${vpn1.priceTwoYear || vpn1.priceYearly}/mo
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <AffiliateButton
                      vpnId={vpn1.id}
                      vpnName={vpn1.name}
                      affiliateUrl={vpn1.affiliateUrl}
                      className="w-full"
                    >
                      Get {vpn1.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/reviews/${vpn1.slug}`}>Read Full Review</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-xl">{vpn2.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {vpn2.overallRating}/5 Rating
                        </Badge>
                        <Badge variant="outline">
                          ${vpn2.priceTwoYear || vpn2.priceYearly}/mo
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <AffiliateButton
                      vpnId={vpn2.id}
                      vpnName={vpn2.name}
                      affiliateUrl={vpn2.affiliateUrl}
                      className="w-full"
                    >
                      Get {vpn2.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/reviews/${vpn2.slug}`}>Read Full Review</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Comparisons CTA */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Compare More VPNs</h2>
              <p className="text-muted-foreground">
                Not sure yet? Check out our full VPN comparison tool or read
                detailed reviews of each service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/compare">View All Comparisons</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/best/best-vpn">See Best VPNs 2026</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
