import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Download,
  Clock,
  ArrowRight,
  Info,
  Scale,
  Smartphone,
  Lock,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for China 2025: Bypass the Great Firewall | ZeroToVPN",
    nl: "Beste VPN voor China 2025: Omzeil de Chinese Firewall | ZeroToVPN",
    de: "Beste VPN für China 2025: Die Große Firewall umgehen | ZeroToVPN",
    es: "Mejor VPN para China 2025: Evita el Gran Cortafuegos | ZeroToVPN",
    fr: "Meilleur VPN pour la Chine 2025: Contourner le Grand Pare-feu | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find VPNs that actually work in China in 2025. Expert-tested solutions to bypass the Great Firewall. Download before you travel!",
    nl: "Vind VPNs die echt werken in China in 2025. Expert-geteste oplossingen om de Chinese Firewall te omzeilen.",
    de: "Finden Sie VPNs, die 2025 tatsächlich in China funktionieren. Expertentestete Lösungen zur Umgehung der Großen Firewall.",
    es: "Encuentra VPNs que realmente funcionan en China en 2025. Soluciones probadas por expertos para evitar el Gran Cortafuegos.",
    fr: "Trouvez des VPN qui fonctionnent vraiment en Chine en 2025. Solutions testées par des experts pour contourner le Grand Pare-feu.",
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

// Country-specific schema
function CountryVpnSchema({ vpns, locale }: { vpns: VpnProvider[]; locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best VPN for China 2025",
    description: "Expert guide to VPNs that work in China, bypassing the Great Firewall",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
    },
    dateModified: "2025-11-30",
    mainEntity: {
      "@type": "ItemList",
      name: "VPNs That Work in China",
      itemListElement: vpns.slice(0, 5).map((vpn, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: vpn.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: vpn.overallRating,
            bestRating: 5,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ChinaVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();

  // VPNs known to work in China (based on research)
  const chinaVpns = allVpns.filter((vpn) =>
    ["expressvpn", "nordvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for China",
      subtitle: "Bypass the Great Firewall with VPNs that actually work in 2025",
      criticalWarning: "Download Before You Arrive",
      criticalWarningText:
        "VPN websites and app stores are blocked in China. You MUST download and set up your VPN before entering the country.",
      legalStatus: "Legal Status in China",
      legalStatusText:
        "VPNs are legal for foreigners to use in China, though technically regulated. There are no recorded cases of foreigners being penalized for personal VPN use. Chinese nationals face stricter enforcement.",
      whatWorks: "VPNs That Work in China (2025)",
      whatWorksText:
        "The Great Firewall actively blocks most VPN services. Only VPNs with advanced obfuscation technology can reliably bypass it. These VPNs use protocols like Shadowsocks that disguise VPN traffic as regular HTTPS traffic.",
      keyFeatures: "Essential Features for China",
      features: [
        {
          title: "Obfuscation Technology",
          desc: "Disguises VPN traffic to avoid detection by the Great Firewall",
        },
        {
          title: "Multiple Protocols",
          desc: "Shadowsocks, Lightway, or custom protocols that work when others fail",
        },
        {
          title: "Nearby Servers",
          desc: "Servers in Hong Kong, Japan, Singapore for better speeds",
        },
        {
          title: "24/7 Support",
          desc: "Live chat support to help when connection issues arise",
        },
      ],
      blockedServices: "Services Blocked in China",
      blocked: [
        "Google (Search, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Many news sites and messaging apps",
      ],
      tips: "Tips for Using VPN in China",
      tipsList: [
        "Download multiple VPNs as backup - one might work when another doesn't",
        "Install apps and configure before arriving in China",
        "Try Hong Kong or Japan servers for best speeds",
        "Use obfuscated/stealth mode in your VPN settings",
        "Save offline maps and important documents before traveling",
        "VPN speeds may vary - patience is key",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Is it safe to use a VPN in China as a tourist?",
          a: "Yes, there are no recorded cases of tourists being penalized for VPN use. VPNs are widely used by foreigners for work and staying connected. The government primarily targets unauthorized VPN providers, not users.",
        },
        {
          q: "Which VPN protocol works best in China?",
          a: "Shadowsocks and proprietary obfuscated protocols work best. Standard OpenVPN and WireGuard are often blocked. ExpressVPN's Lightway and NordVPN's obfuscated servers are specifically designed to bypass the Great Firewall.",
        },
        {
          q: "Can I sign up for a VPN while in China?",
          a: "It's extremely difficult. Most VPN websites are blocked, and payment processors may not work. Always sign up and download your VPN before traveling to China.",
        },
        {
          q: "Do free VPNs work in China?",
          a: "Almost never. Free VPNs lack the obfuscation technology needed to bypass the Great Firewall. They also pose security risks. Invest in a premium VPN for reliable access.",
        },
      ],
      getVpn: "Get VPN",
      readReview: "Read Review",
      worksInChina: "Works in China",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor China",
      subtitle: "Omzeil de Grote Firewall met VPNs die echt werken in 2025",
      criticalWarning: "Download Voordat Je Vertrekt",
      criticalWarningText:
        "VPN-websites en app stores zijn geblokkeerd in China. Je MOET je VPN downloaden en instellen voordat je het land binnenkomt.",
      legalStatus: "Juridische Status in China",
      legalStatusText:
        "VPNs zijn legaal voor buitenlanders in China, hoewel technisch gereguleerd. Er zijn geen gevallen bekend van buitenlanders die gestraft zijn voor persoonlijk VPN-gebruik.",
      whatWorks: "VPNs Die Werken in China (2025)",
      whatWorksText:
        "De Grote Firewall blokkeert actief de meeste VPN-diensten. Alleen VPNs met geavanceerde obfuscatie-technologie kunnen betrouwbaar werken.",
      keyFeatures: "Essentiële Functies voor China",
      features: [
        {
          title: "Obfuscatie Technologie",
          desc: "Vermomt VPN-verkeer om detectie te voorkomen",
        },
        {
          title: "Meerdere Protocollen",
          desc: "Shadowsocks of aangepaste protocollen die werken wanneer anderen falen",
        },
        {
          title: "Nabije Servers",
          desc: "Servers in Hong Kong, Japan, Singapore voor betere snelheden",
        },
        {
          title: "24/7 Ondersteuning",
          desc: "Live chat support bij verbindingsproblemen",
        },
      ],
      blockedServices: "Geblokkeerde Diensten in China",
      blocked: [
        "Google (Zoeken, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Veel nieuwssites en messaging apps",
      ],
      tips: "Tips voor VPN Gebruik in China",
      tipsList: [
        "Download meerdere VPNs als backup",
        "Installeer apps voordat je naar China gaat",
        "Probeer Hong Kong of Japan servers voor beste snelheden",
        "Gebruik obfuscated/stealth modus",
        "Sla offline kaarten op voordat je reist",
        "VPN snelheden kunnen variëren - geduld is belangrijk",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Is het veilig om een VPN te gebruiken in China als toerist?",
          a: "Ja, er zijn geen gevallen bekend van toeristen die gestraft zijn voor VPN-gebruik. VPNs worden veel gebruikt door buitenlanders.",
        },
        {
          q: "Welk VPN-protocol werkt het beste in China?",
          a: "Shadowsocks en eigen obfuscated protocollen werken het beste. Standaard OpenVPN en WireGuard worden vaak geblokkeerd.",
        },
        {
          q: "Kan ik me aanmelden voor een VPN terwijl ik in China ben?",
          a: "Het is erg moeilijk. De meeste VPN-websites zijn geblokkeerd. Meld je altijd aan voordat je naar China reist.",
        },
        {
          q: "Werken gratis VPNs in China?",
          a: "Bijna nooit. Gratis VPNs missen de obfuscatie-technologie die nodig is om de Grote Firewall te omzeilen.",
        },
      ],
      getVpn: "Download VPN",
      readReview: "Lees Review",
      worksInChina: "Werkt in China",
      obfuscation: "Obfuscatie",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <CountryVpnSchema vpns={chinaVpns} locale={locale} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-background to-background" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t.badge}
              </Badge>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-6xl">🇨🇳</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="py-8">
          <div className="container">
            <Card className="border-red-500 bg-red-500/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-red-500 mb-2">
                      {t.criticalWarning}
                    </h2>
                    <p className="text-muted-foreground">
                      {t.criticalWarningText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Scale className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                  <p className="text-muted-foreground">{t.legalStatusText}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Legal for foreigners
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Technically regulated
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VPNs That Work */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whatWorksText}
              </p>
            </div>

            <div className="space-y-6">
              {chinaVpns.map((vpn, index) => (
                <Card key={vpn.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Rank */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold">{vpn.name}</h3>
                          <RatingStars rating={vpn.overallRating} size="sm" />
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">{t.worksInChina}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">{t.obfuscation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-purple-500" />
                          <span className="text-sm">{vpn.countries} countries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-orange-500" />
                          <span className="text-sm">{vpn.maxDevices} devices</span>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                        <div className="text-center lg:text-right">
                          <div className="text-3xl font-bold text-primary">
                            ${vpn.priceTwoYear || vpn.priceYearly}
                            <span className="text-sm font-normal text-muted-foreground">
                              /mo
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <AffiliateButton
                            vpnId={vpn.id}
                            vpnName={vpn.name}
                            affiliateUrl={vpn.affiliateUrl}
                            className="flex-1"
                          >
                            {t.getVpn}
                          </AffiliateButton>
                          <Button variant="outline" asChild>
                            <Link href={`/reviews/${vpn.slug}`}>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">{t.keyFeatures}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {index === 0 && <Lock className="h-6 w-6 text-primary" />}
                        {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                        {index === 2 && <Globe className="h-6 w-6 text-primary" />}
                        {index === 3 && <Info className="h-6 w-6 text-primary" />}
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blocked Services */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {t.blockedServices}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {t.blocked.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">{t.tips}</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {t.tipsList.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">{t.faqTitle}</h2>
              <div className="space-y-4">
                {t.faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="py-8 border-t">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-semibold mb-4">{t.sources}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Great_Firewall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Great Firewall - Wikipedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.privacyjournal.net/are-vpns-legal-in-china/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Privacy Journal - Are VPNs Legal in China?
                  </a>
                </li>
                <li>
                  <a
                    href="https://surfshark.com/blog/vpn-in-china"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Surfshark - Can you use a VPN in China?
                  </a>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
