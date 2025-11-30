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
  Clock,
  ArrowRight,
  Info,
  Scale,
  Smartphone,
  Lock,
  Ban,
  TrendingUp,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Turkey 2025: Bypass Blocks & Stay Connected | ZeroToVPN",
    nl: "Beste VPN voor Turkije 2025: Omzeil Blokkades & Blijf Verbonden | ZeroToVPN",
    de: "Beste VPN für die Türkei 2025: Sperren Umgehen | ZeroToVPN",
    es: "Mejor VPN para Turquía 2025: Evita Bloqueos | ZeroToVPN",
    fr: "Meilleur VPN pour la Turquie 2025: Contourner les Blocages | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "VPN use is legal in Turkey, but many VPN services are blocked. Find VPNs with obfuscation that still work in Turkey's restrictive internet environment.",
    nl: "VPN-gebruik is legaal in Turkije, maar veel VPN-diensten zijn geblokkeerd. Vind VPNs met obfuscatie die nog werken.",
    de: "VPN-Nutzung ist in der Türkei legal, aber viele VPN-Dienste sind gesperrt. Finden Sie VPNs mit Verschleierung.",
    es: "El uso de VPN es legal en Turquía, pero muchos servicios VPN están bloqueados. Encuentra VPNs con ofuscación.",
    fr: "L'utilisation de VPN est légale en Turquie, mais de nombreux services VPN sont bloqués. Trouvez des VPN avec obfuscation.",
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

export default async function TurkeyVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const turkeyVpns = allVpns.filter((vpn) =>
    ["nordvpn", "expressvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for Turkey",
      subtitle: "Stay connected despite Turkey's extensive internet censorship",
      legalStatus: "VPN Legal Status in Turkey",
      legalStatusText:
        "Using a VPN is legal in Turkey. However, many VPN services (27+) have been blocked by the government. There are no reports of individuals being arrested for VPN use alone.",
      blockedVpns: "VPNs Blocked in Turkey",
      blockedList: [
        "ProtonVPN",
        "Surfshark (partially)",
        "IPVanish",
        "CyberGhost",
        "TunnelBear",
        "Cloudflare WARP",
        "And 21+ other services",
      ],
      internetFreedom: "Turkey Internet Freedom Score",
      freedomStats: [
        { value: "88.8%", label: "Internet users (2024)" },
        { value: "27+", label: "VPNs blocked" },
        { value: "32/100", label: "Freedom score (Not Free)" },
      ],
      whatWorks: "VPNs That Still Work in Turkey (2025)",
      whatWorksText:
        "VPNs with strong obfuscation technology can bypass Turkey's traffic-blocking measures. These VPNs disguise VPN traffic as regular HTTPS traffic.",
      keyFeatures: "Essential Features for Turkey",
      features: [
        {
          title: "Obfuscation Required",
          desc: "Turkey blocks VPN traffic - obfuscation makes it look like regular traffic",
        },
        {
          title: "Install Before Arrival",
          desc: "Many VPN websites are blocked in Turkey - download beforehand",
        },
        {
          title: "Multiple Protocols",
          desc: "Have backup protocols ready when one gets blocked",
        },
        {
          title: "Tor Browser Backup",
          desc: "Using Tor to connect to VPN can help bypass restrictions",
        },
      ],
      blockedServices: "Services Blocked or Restricted in Turkey",
      blocked: [
        "Instagram (blocked periodically)",
        "Twitter/X (frequently restricted)",
        "Wikipedia (was blocked 2017-2020)",
        "Many news websites",
        "Some VPN provider websites",
        "Various social media during events",
      ],
      tips: "Tips for VPN Use in Turkey",
      tipsList: [
        "Download VPN app before entering Turkey - websites may be blocked",
        "Use obfuscated servers or stealth mode specifically",
        "Keep multiple VPNs installed as backup",
        "Try connecting through Tor Browser if direct connection fails",
        "ExpressVPN website is blocked - use a temporary VPN to sign up",
        "Connect to nearby servers (Bulgaria, Greece, Romania) for best speeds",
      ],
      faqTitle: "Turkey VPN FAQ",
      faqs: [
        {
          q: "Is using a VPN illegal in Turkey?",
          a: "No, using a VPN is legal in Turkey. There have been no reports of anyone being arrested simply for using a VPN. However, using VPN for illegal activities remains illegal.",
        },
        {
          q: "Why are so many VPNs blocked in Turkey?",
          a: "The Turkish government blocks VPNs to enforce internet censorship. As of 2024, 27+ VPN services have been blocked. Turkey uses traffic analysis to identify and block VPN protocols.",
        },
        {
          q: "Which VPN works best in Turkey?",
          a: "NordVPN and ExpressVPN are most reliable due to their advanced obfuscation. ExpressVPN obfuscates all connections by default, making it harder to detect.",
        },
        {
          q: "Can I access Instagram and Twitter in Turkey with a VPN?",
          a: "Yes, a working VPN will allow you to access social media platforms that may be blocked in Turkey. Many residents and tourists use VPNs for this purpose.",
        },
      ],
      getVpn: "Get VPN",
      worksInTurkey: "Works in Turkey",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor Turkije",
      subtitle: "Blijf verbonden ondanks Turkije's uitgebreide internetcensuur",
      legalStatus: "VPN Juridische Status in Turkije",
      legalStatusText:
        "Het gebruik van een VPN is legaal in Turkije. Echter, veel VPN-diensten (27+) zijn geblokkeerd door de overheid. Er zijn geen meldingen van arrestaties alleen voor VPN-gebruik.",
      blockedVpns: "Geblokkeerde VPNs in Turkije",
      blockedList: [
        "ProtonVPN",
        "Surfshark (gedeeltelijk)",
        "IPVanish",
        "CyberGhost",
        "TunnelBear",
        "Cloudflare WARP",
        "En 21+ andere diensten",
      ],
      internetFreedom: "Turkije Internet Vrijheid Score",
      freedomStats: [
        { value: "88.8%", label: "Internetgebruikers (2024)" },
        { value: "27+", label: "VPNs geblokkeerd" },
        { value: "32/100", label: "Vrijheidsscore (Niet Vrij)" },
      ],
      whatWorks: "VPNs Die Nog Werken in Turkije (2025)",
      whatWorksText:
        "VPNs met sterke obfuscatie-technologie kunnen Turkije's traffic-blocking omzeilen. Deze VPNs vermommen VPN-verkeer als gewoon HTTPS-verkeer.",
      keyFeatures: "Essentiële Functies voor Turkije",
      features: [
        {
          title: "Obfuscatie Vereist",
          desc: "Turkije blokkeert VPN-verkeer - obfuscatie laat het lijken op gewoon verkeer",
        },
        {
          title: "Installeer Voor Aankomst",
          desc: "Veel VPN-websites zijn geblokkeerd in Turkije - download vooraf",
        },
        {
          title: "Meerdere Protocollen",
          desc: "Heb backup-protocollen klaar wanneer één wordt geblokkeerd",
        },
        {
          title: "Tor Browser Backup",
          desc: "Tor gebruiken om te verbinden met VPN kan helpen bij beperkingen",
        },
      ],
      blockedServices: "Geblokkeerde of Beperkte Diensten in Turkije",
      blocked: [
        "Instagram (periodiek geblokkeerd)",
        "Twitter/X (regelmatig beperkt)",
        "Wikipedia (was geblokkeerd 2017-2020)",
        "Veel nieuwswebsites",
        "Sommige VPN-provider websites",
        "Diverse sociale media tijdens evenementen",
      ],
      tips: "Tips voor VPN Gebruik in Turkije",
      tipsList: [
        "Download VPN-app voordat je Turkije binnenkomt",
        "Gebruik specifiek obfuscated servers of stealth modus",
        "Houd meerdere VPNs geïnstalleerd als backup",
        "Probeer te verbinden via Tor Browser als directe verbinding faalt",
        "ExpressVPN website is geblokkeerd - gebruik een tijdelijke VPN om aan te melden",
        "Verbind met nabije servers (Bulgarije, Griekenland, Roemenië)",
      ],
      faqTitle: "Turkije VPN FAQ",
      faqs: [
        {
          q: "Is het gebruik van een VPN illegaal in Turkije?",
          a: "Nee, het gebruik van een VPN is legaal in Turkije. Er zijn geen meldingen van arrestaties alleen voor VPN-gebruik. Echter, VPN gebruiken voor illegale activiteiten blijft illegaal.",
        },
        {
          q: "Waarom zijn zoveel VPNs geblokkeerd in Turkije?",
          a: "De Turkse overheid blokkeert VPNs om internetcensuur af te dwingen. Per 2024 zijn 27+ VPN-diensten geblokkeerd.",
        },
        {
          q: "Welke VPN werkt het beste in Turkije?",
          a: "NordVPN en ExpressVPN zijn het meest betrouwbaar vanwege hun geavanceerde obfuscatie.",
        },
        {
          q: "Kan ik Instagram en Twitter bereiken in Turkije met een VPN?",
          a: "Ja, een werkende VPN geeft je toegang tot sociale media platforms die mogelijk geblokkeerd zijn in Turkije.",
        },
      ],
      getVpn: "Download VPN",
      worksInTurkey: "Werkt in Turkije",
      obfuscation: "Obfuscatie",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
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
              <span className="text-6xl">🇹🇷</span>
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

      {/* Legal Status */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Scale className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                <p className="text-muted-foreground mb-4">{t.legalStatusText}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VPN use legal
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                    <Ban className="h-3 w-3 mr-1" />
                    Many VPNs blocked
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freedom Stats */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.internetFreedom}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.freedomStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blocked VPNs */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">{t.blockedVpns}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.blockedList.map((vpn, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{vpn}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            {turkeyVpns.map((vpn, index) => (
              <Card key={vpn.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold">{vpn.name}</h3>
                        <RatingStars rating={vpn.overallRating} size="sm" />
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{t.worksInTurkey}</span>
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
                      {index === 2 && <TrendingUp className="h-6 w-6 text-primary" />}
                      {index === 3 && <Globe className="h-6 w-6 text-primary" />}
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
                  href="https://freedomhouse.org/country/turkey/freedom-net/2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Freedom House - Turkey: Freedom on the Net 2024
                </a>
              </li>
              <li>
                <a
                  href="https://stockholmcf.org/turkey-blocks-access-to-27-popular-vpn-services-amid-tightening-internet-restrictions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Stockholm Center for Freedom - Turkey blocks 27 VPN services
                </a>
              </li>
              <li>
                <a
                  href="https://www.vpnmentor.com/blog/are-vpns-legal-in-turkey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  VPNMentor - Are VPNs Legal in Turkey?
                </a>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
