import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VpnCard } from "@/components/vpn/vpn-card";
import { ComparisonTable } from "@/components/vpn/comparison-table";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Server,
  Monitor,
  Trophy,
  Crown,
  Star,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN November 2025: Top 6 VPNs Tested & Ranked | ZeroToVPN",
    nl: "Beste VPN November 2025: Top 6 VPNs Getest & Beoordeeld | ZeroToVPN",
    de: "Beste VPN November 2025: Top 6 VPNs Getestet & Bewertet | ZeroToVPN",
    es: "Mejor VPN Noviembre 2025: Top 6 VPNs Probadas y Clasificadas | ZeroToVPN",
    fr: "Meilleur VPN Novembre 2025: Top 6 VPNs Testés et Classés | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Looking for the best VPN in 2025? We tested 35+ VPNs for speed, security, and streaming. See our expert rankings and find your perfect VPN today.",
    nl: "Op zoek naar de beste VPN in 2025? We hebben 35+ VPNs getest op snelheid, veiligheid en streaming. Bekijk onze expert rankings.",
    de: "Suchen Sie das beste VPN 2025? Wir haben über 35 VPNs auf Geschwindigkeit, Sicherheit und Streaming getestet. Sehen Sie unsere Experten-Rankings.",
    es: "¿Buscas la mejor VPN en 2025? Probamos más de 35 VPNs en velocidad, seguridad y streaming. Mira nuestras clasificaciones de expertos.",
    fr: "Vous cherchez le meilleur VPN en 2025? Nous avons testé plus de 35 VPNs pour la vitesse, la sécurité et le streaming. Voir nos classements d'experts.",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
  };
}

// Structured Data for ItemList (Rankings)
function ItemListSchema({ vpns }: { vpns: VpnProvider[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN Services 2025",
    description: "Expert-tested and ranked VPN services for privacy, streaming, and security",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((vpn, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vpn.name,
      url: `https://zerotovpn.com/reviews/${vpn.slug}`,
      item: {
        "@type": "Product",
        name: vpn.name,
        description: vpn.shortDescription,
        brand: { "@type": "Brand", name: vpn.name },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vpn.overallRating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 100 + index * 50,
        },
        offers: {
          "@type": "Offer",
          price: vpn.priceTwoYear || vpn.priceYearly,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BestVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();

  // Content translations
  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN Services in 2025",
      subtitle: "We tested 35+ VPNs to find the best options for privacy, streaming, and security. Here are our top picks based on extensive real-world testing.",
      quickPicks: "Quick Picks",
      bestOverall: "Best Overall",
      bestValue: "Best Value",
      bestSpeed: "Fastest VPN",
      topRated: "Top-Rated VPNs",
      topRatedSubtitle: "Our expert-tested rankings based on speed, security, and value",
      whyTrust: "Why Trust Our Rankings?",
      trustPoints: [
        "35+ VPNs tested over 3 years",
        "500+ speed tests conducted",
        "Independent testing methodology",
        "No sponsored rankings",
        "Regular retesting and updates",
        "Real-world streaming tests",
      ],
      comparisonTitle: "Full VPN Comparison",
      comparisonSubtitle: "Compare all features side by side",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is the best VPN overall?",
          a: "Based on our testing, NordVPN is the best VPN overall in 2025. It offers the best combination of speed, security features, and streaming capabilities at a competitive price.",
        },
        {
          q: "What is the best cheap VPN?",
          a: "Surfshark offers the best value for money with prices starting at $1.99/month on the 2-year plan, plus unlimited device connections.",
        },
        {
          q: "What is the fastest VPN?",
          a: "ExpressVPN consistently delivers the fastest speeds in our tests, thanks to its proprietary Lightway protocol. NordVPN is a close second with excellent WireGuard-based performance.",
        },
        {
          q: "Are free VPNs safe?",
          a: "Most free VPNs are not recommended due to data logging and security concerns. ProtonVPN is the only free VPN we recommend, offering a trustworthy free tier with no data limits.",
        },
        {
          q: "Do I really need a VPN?",
          a: "A VPN is essential if you want to protect your privacy online, access geo-restricted content, or secure your connection on public WiFi networks.",
        },
      ],
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: November 2025",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN Diensten in 2025",
      subtitle: "We hebben 35+ VPNs getest om de beste opties voor privacy, streaming en veiligheid te vinden. Hier zijn onze topkeuzes op basis van uitgebreide tests.",
      quickPicks: "Snelle Keuzes",
      bestOverall: "Beste Algemeen",
      bestValue: "Beste Prijs-Kwaliteit",
      bestSpeed: "Snelste VPN",
      topRated: "Hoogst Beoordeelde VPNs",
      topRatedSubtitle: "Onze expert-geteste rankings op basis van snelheid, veiligheid en waarde",
      whyTrust: "Waarom Onze Rankings Vertrouwen?",
      trustPoints: [
        "35+ VPNs getest over 3 jaar",
        "500+ snelheidstests uitgevoerd",
        "Onafhankelijke testmethodologie",
        "Geen gesponsorde rankings",
        "Regelmatige hertests en updates",
        "Echte streaming tests",
      ],
      comparisonTitle: "Volledige VPN Vergelijking",
      comparisonSubtitle: "Vergelijk alle functies naast elkaar",
      faqTitle: "Veelgestelde Vragen",
      faqs: [
        {
          q: "Wat is de beste VPN overall?",
          a: "Op basis van onze tests is NordVPN de beste VPN overall in 2025. Het biedt de beste combinatie van snelheid, beveiligingsfuncties en streamingmogelijkheden voor een concurrerende prijs.",
        },
        {
          q: "Wat is de beste goedkope VPN?",
          a: "Surfshark biedt de beste prijs-kwaliteitverhouding met prijzen vanaf €1,99/maand op het 2-jarig abonnement, plus onbeperkte apparaatverbindingen.",
        },
        {
          q: "Wat is de snelste VPN?",
          a: "ExpressVPN levert consistent de snelste snelheden in onze tests, dankzij het eigen Lightway-protocol. NordVPN is een goede tweede met uitstekende WireGuard-prestaties.",
        },
        {
          q: "Zijn gratis VPNs veilig?",
          a: "De meeste gratis VPNs worden niet aanbevolen vanwege data-logging en beveiligingsproblemen. ProtonVPN is de enige gratis VPN die we aanbevelen.",
        },
        {
          q: "Heb ik echt een VPN nodig?",
          a: "Een VPN is essentieel als je je privacy online wilt beschermen, geo-geblokkeerde content wilt bekijken, of je verbinding op openbare WiFi wilt beveiligen.",
        },
      ],
      viewAllVpns: "Bekijk Alle VPN Reviews",
      lastUpdated: "Laatst bijgewerkt: november 2025",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Get top 3 for quick picks
  const topVpns = allVpns.slice(0, 3);
  const [bestOverall, bestValue, bestSpeed] = [
    allVpns.find((v) => v.slug === "nordvpn"),
    allVpns.find((v) => v.slug === "surfshark"),
    allVpns.find((v) => v.slug === "expressvpn"),
  ];

  return (
    <>
      <ItemListSchema vpns={allVpns} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[{ name: "Best VPNs", href: "/best/best-vpn" }]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Picks Section */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t.quickPicks}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Best Overall */}
              {bestOverall && (
                <Card className="relative border-2 border-yellow-500/50 bg-gradient-to-b from-yellow-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-yellow-950">
                      <Crown className="h-3 w-3 mr-1" />
                      {t.bestOverall}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestOverall.name}</h3>
                    <RatingStars rating={bestOverall.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestOverall.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestOverall.priceTwoYear || bestOverall.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestOverall.id}
                      vpnName={bestOverall.name}
                      affiliateUrl={bestOverall.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestOverall.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {/* Best Value */}
              {bestValue && (
                <Card className="relative border-2 border-green-500/50 bg-gradient-to-b from-green-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-green-950">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {t.bestValue}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestValue.name}</h3>
                    <RatingStars rating={bestValue.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestValue.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestValue.priceTwoYear || bestValue.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestValue.id}
                      vpnName={bestValue.name}
                      affiliateUrl={bestValue.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestValue.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {/* Fastest VPN */}
              {bestSpeed && (
                <Card className="relative border-2 border-blue-500/50 bg-gradient-to-b from-blue-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-blue-950">
                      <Zap className="h-3 w-3 mr-1" />
                      {t.bestSpeed}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestSpeed.name}</h3>
                    <RatingStars rating={bestSpeed.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestSpeed.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestSpeed.priceTwoYear || bestSpeed.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestSpeed.id}
                      vpnName={bestSpeed.name}
                      affiliateUrl={bestSpeed.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestSpeed.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Top Rated VPNs - Full Cards */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.topRated}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.topRatedSubtitle}
              </p>
            </div>

            <div className="space-y-8">
              {allVpns.map((vpn, index) => (
                <Card key={vpn.id} className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Rank Badge */}
                    <div className="lg:w-24 flex-shrink-0 bg-muted/50 flex items-center justify-center p-6 lg:p-0">
                      <div className="text-center">
                        {index === 0 ? (
                          <Trophy className="h-10 w-10 text-yellow-500 mx-auto" />
                        ) : (
                          <span className="text-4xl font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Main Content */}
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* VPN Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold">{vpn.name}</h3>
                            {vpn.editorChoice && (
                              <Badge className="bg-yellow-500 text-yellow-950">
                                Editor&apos;s Choice
                              </Badge>
                            )}
                            {vpn.freeTier && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Free Tier
                              </Badge>
                            )}
                          </div>
                          <RatingStars rating={vpn.overallRating} size="lg" showValue />
                          <p className="text-muted-foreground">{vpn.shortDescription}</p>

                          {/* Key Stats */}
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Server className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.servers.toLocaleString()} servers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.countries} countries</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices} devices</span>
                            </div>
                          </div>

                          {/* Pros */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {vpn.pros.slice(0, 4).map((pro, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{pro}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="lg:w-64 flex-shrink-0 space-y-4 lg:text-center lg:border-l lg:pl-6">
                          <div>
                            <div className="text-sm text-muted-foreground">Starting at</div>
                            <div className="text-4xl font-bold text-primary">
                              ${vpn.priceTwoYear || vpn.priceYearly}
                            </div>
                            <div className="text-sm text-muted-foreground">/month</div>
                          </div>
                          <div className="space-y-2">
                            <AffiliateButton
                              vpnId={vpn.id}
                              vpnName={vpn.name}
                              affiliateUrl={vpn.affiliateUrl}
                              className="w-full"
                              size="lg"
                            >
                              Get {vpn.name}
                            </AffiliateButton>
                            <Button variant="outline" className="w-full" asChild>
                              <Link href={`/reviews/${vpn.slug}`}>
                                Read Full Review
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {vpn.moneyBackDays}-day money-back guarantee
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t.whyTrust}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.trustPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.comparisonTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.comparisonSubtitle}
              </p>
            </div>
            <ComparisonTable vpns={allVpns} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                title={t.faqTitle}
                faqs={[
                  {
                    question: "What is the best VPN in 2025?",
                    answer: "Based on our extensive testing, NordVPN is the best VPN in 2025. It offers the best combination of speed (up to 6,730 Mbps), security features (AES-256 encryption, kill switch, no-logs policy), and streaming capabilities at a competitive price of $2.99/month. With 7,000+ servers in 127 countries and excellent 24/7 support, it's our top choice for most users."
                  },
                  {
                    question: "Are VPNs legal to use?",
                    answer: "Yes, VPNs are legal in most countries including the US, UK, Canada, Australia, and throughout the EU. However, some countries like China, Russia, Iran, and UAE restrict or ban VPN usage. Even where legal, using a VPN for illegal activities (like copyright infringement or hacking) remains illegal. Always check your local laws and the terms of service of websites you visit."
                  },
                  {
                    question: "How much does a good VPN cost?",
                    answer: "Quality VPNs typically cost between $2-12 per month. Budget options like Surfshark start at $1.99/month on 2-year plans. Mid-range options like NordVPN cost around $2.99/month, while premium services like ExpressVPN are about $6.67/month. Longer subscriptions (1-2 years) offer significant discounts compared to monthly plans. All top VPNs offer 30-day money-back guarantees."
                  },
                  {
                    question: "Can a VPN slow down my internet?",
                    answer: "A VPN can slow down your internet slightly because it encrypts your data and routes it through a remote server. However, top VPNs like ExpressVPN and NordVPN typically reduce speeds by only 10-20% on nearby servers. With fast protocols like WireGuard and Lightway, many users don't notice any slowdown. In some cases, a VPN can actually improve speeds by bypassing ISP throttling."
                  },
                  {
                    question: "Do I need a VPN if I have nothing to hide?",
                    answer: "Yes, even if you have 'nothing to hide,' a VPN is essential for privacy. Your ISP can see and sell your browsing history to advertisers. Public WiFi networks are vulnerable to hackers who can intercept your data. Websites track your location and activity to build detailed profiles. A VPN encrypts your traffic, hides your IP address, and protects you from surveillance, data breaches, and targeted advertising."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Find Your Perfect VPN
              </h2>
              <p className="text-lg text-muted-foreground">
                Still not sure? Read our detailed reviews or compare all features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/reviews">
                    {t.viewAllVpns}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <RelatedPages
              title="Explore More VPN Categories"
              pages={[
                { title: "Best Free VPNs", description: "Top free VPN options with no subscription", href: "/best/free-vpn", icon: "gift" },
                { title: "Best VPN for Gaming", description: "Low-latency VPNs for online gaming", href: "/best/vpn-gaming", icon: "gamepad" },
                { title: "Best VPN for China", description: "VPNs that bypass the Great Firewall", href: "/best/vpn-china", icon: "globe" },
                { title: "Best VPN for Russia", description: "Access blocked content in Russia", href: "/best/vpn-russia", icon: "globe" },
                { title: "Best Mobile VPNs", description: "VPNs optimized for smartphones", href: "/best/vpn-mobile", icon: "smartphone" },
                { title: "Best Tablet VPNs", description: "VPNs for iPad and Android tablets", href: "/best/vpn-tablet", icon: "tablet" },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
