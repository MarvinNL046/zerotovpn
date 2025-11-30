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
    en: "Best VPN for Russia 2025: Which VPNs Still Work? | ZeroToVPN",
    nl: "Beste VPN voor Rusland 2025: Welke VPNs Werken Nog? | ZeroToVPN",
    de: "Beste VPN für Russland 2025: Welche VPNs Funktionieren Noch? | ZeroToVPN",
    es: "Mejor VPN para Rusia 2025: ¿Qué VPNs Todavía Funcionan? | ZeroToVPN",
    fr: "Meilleur VPN pour la Russie 2025: Quels VPNs Fonctionnent Encore? | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find VPNs that still work in Russia despite 197+ blocked services. Expert-tested solutions with obfuscation technology. 41% of Russians use VPNs.",
    nl: "Vind VPNs die nog werken in Rusland ondanks 197+ geblokkeerde diensten. Expert-geteste oplossingen met obfuscatie-technologie.",
    de: "Finden Sie VPNs, die trotz 197+ gesperrter Dienste in Russland noch funktionieren. Expertenlösungen mit Verschleierungstechnologie.",
    es: "Encuentra VPNs que todavía funcionan en Rusia a pesar de 197+ servicios bloqueados. Soluciones probadas con tecnología de ofuscación.",
    fr: "Trouvez des VPN qui fonctionnent encore en Russie malgré 197+ services bloqués. Solutions testées avec technologie d'obfuscation.",
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

function CountryVpnSchema({ vpns, locale }: { vpns: VpnProvider[]; locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best VPN for Russia 2025",
    description: "Expert guide to VPNs that work in Russia despite government restrictions",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
    },
    dateModified: "2025-11-30",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function RussiaVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();

  // VPNs with best obfuscation for Russia
  const russiaVpns = allVpns.filter((vpn) =>
    ["expressvpn", "nordvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for Russia",
      subtitle: "Navigate Russia's increasing internet restrictions with VPNs that still work",
      severityWarning: "Rapidly Changing Situation",
      severityWarningText:
        "Russia blocked 197 VPN services in 2024 alone. Laws are tightening, but 41% of Russians still use VPNs. Install before traveling and expect disruptions.",
      legalStatus: "Legal Status in Russia",
      legalStatusText:
        "VPNs are not formally illegal, but everything around them is being criminalized. Since March 2024, sharing VPN guides is illegal. In July 2025, using a VPN to access 'extremist' content became an aggravating circumstance for crimes.",
      blockedVpns: "VPNs Blocked in Russia",
      blockedList: [
        "NordVPN (website blocked, may still work)",
        "ProtonVPN",
        "Surfshark (delisted from Apple Store)",
        "AdGuard VPN",
        "TurboVPN",
        "Many others (197+ blocked in 2024)",
      ],
      whatMayWork: "VPNs That May Still Work (2025)",
      whatMayWorkText:
        "Due to advanced traffic fingerprinting, only VPNs with cutting-edge obfuscation may work. Success varies by ISP and region. ExpressVPN is rated highest for Russia due to its advanced obfuscation.",
      stats: "VPN Usage Statistics",
      statsList: [
        { value: "41%", label: "of Russians use VPNs (2025)" },
        { value: "197", label: "VPN services blocked in 2024" },
        { value: "150%", label: "increase in VPN searches (Jan 2025)" },
        { value: "36%", label: "use VPNs regularly (up from 25%)" },
      ],
      keyFeatures: "Essential Features for Russia",
      features: [
        {
          title: "Advanced Obfuscation",
          desc: "Traffic must look like regular HTTPS to evade deep packet inspection",
        },
        {
          title: "Proprietary Protocols",
          desc: "Standard OpenVPN, WireGuard, IKEv2 are increasingly blocked",
        },
        {
          title: "Frequent Updates",
          desc: "VPN providers must constantly adapt to new blocking techniques",
        },
        {
          title: "Non-Russian Servers",
          desc: "Connect to servers outside Russia (Finland, Latvia, Germany)",
        },
      ],
      blockedServices: "Services Restricted in Russia",
      blocked: [
        "Instagram (blocked since 2022)",
        "Facebook, Twitter/X",
        "Many independent news sites",
        "YouTube (significantly throttled)",
        "Various foreign media outlets",
        "Opposition websites",
      ],
      tips: "Critical Tips for Russia",
      tipsList: [
        "Install VPN before entering Russia - websites are blocked",
        "Keep multiple VPN apps as backups",
        "Download VPN apps while abroad - they're removed from local app stores",
        "Use obfuscated/stealth servers specifically",
        "Be aware that VPN usage may leave traces with your ISP",
        "Check VPN provider's Russia-specific guidance regularly",
      ],
      faqTitle: "Russia VPN FAQ",
      faqs: [
        {
          q: "Is using a VPN illegal in Russia?",
          a: "VPN use itself is not explicitly illegal, but the legal situation is increasingly risky. Sharing VPN information is illegal since March 2024, and using VPNs for certain activities can be an aggravating circumstance. There have been fines but no widespread criminal prosecution for personal use.",
        },
        {
          q: "Why are so many VPNs blocked in Russia?",
          a: "Roskomnadzor (Russia's telecom regulator) actively blocks VPN services. In 2024 alone, 197 services were shut down. The government uses deep packet inspection to identify and block VPN protocols like OpenVPN and WireGuard.",
        },
        {
          q: "Which VPN works best in Russia in 2025?",
          a: "ExpressVPN is consistently rated highest due to its advanced obfuscation technology and quick response to blocking. However, no VPN is guaranteed to work 100% of the time due to constantly evolving restrictions.",
        },
        {
          q: "Can I access YouTube with a VPN in Russia?",
          a: "Yes, VPNs can help bypass YouTube throttling in Russia. Without a VPN, speeds can be as low as 128 kbps. A working VPN should restore normal speeds, though connection reliability varies.",
        },
      ],
      getVpn: "Get VPN",
      readReview: "Read Review",
      mayWorkInRussia: "May work in Russia",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
      disclaimer: "Important Disclaimer",
      disclaimerText:
        "The legal situation in Russia is evolving rapidly. This information is for educational purposes. Always verify current laws and exercise caution.",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor Rusland",
      subtitle: "Navigeer door Ruslands toenemende internetbeperkingen met werkende VPNs",
      severityWarning: "Snel Veranderende Situatie",
      severityWarningText:
        "Rusland blokkeerde 197 VPN-diensten alleen al in 2024. Wetten worden strenger, maar 41% van de Russen gebruikt nog steeds VPNs.",
      legalStatus: "Juridische Status in Rusland",
      legalStatusText:
        "VPNs zijn niet formeel illegaal, maar alles eromheen wordt gecriminaliseerd. Sinds maart 2024 is het delen van VPN-informatie illegaal.",
      blockedVpns: "Geblokkeerde VPNs in Rusland",
      blockedList: [
        "NordVPN (website geblokkeerd)",
        "ProtonVPN",
        "Surfshark (verwijderd uit App Store)",
        "AdGuard VPN",
        "TurboVPN",
        "Vele anderen (197+ geblokkeerd in 2024)",
      ],
      whatMayWork: "VPNs Die Mogelijk Nog Werken (2025)",
      whatMayWorkText:
        "Door geavanceerde traffic fingerprinting werken alleen VPNs met cutting-edge obfuscatie mogelijk nog.",
      stats: "VPN Gebruik Statistieken",
      statsList: [
        { value: "41%", label: "van Russen gebruikt VPNs (2025)" },
        { value: "197", label: "VPN-diensten geblokkeerd in 2024" },
        { value: "150%", label: "toename in VPN-zoekopdrachten (jan 2025)" },
        { value: "36%", label: "gebruikt VPNs regelmatig" },
      ],
      keyFeatures: "Essentiële Functies voor Rusland",
      features: [
        {
          title: "Geavanceerde Obfuscatie",
          desc: "Verkeer moet eruitzien als gewone HTTPS",
        },
        {
          title: "Eigen Protocollen",
          desc: "Standaard OpenVPN en WireGuard worden steeds vaker geblokkeerd",
        },
        {
          title: "Frequente Updates",
          desc: "VPN-aanbieders moeten zich constant aanpassen",
        },
        {
          title: "Niet-Russische Servers",
          desc: "Verbind met servers buiten Rusland",
        },
      ],
      blockedServices: "Geblokkeerde Diensten in Rusland",
      blocked: [
        "Instagram (geblokkeerd sinds 2022)",
        "Facebook, Twitter/X",
        "Veel onafhankelijke nieuwssites",
        "YouTube (sterk vertraagd)",
        "Diverse buitenlandse media",
        "Oppositie websites",
      ],
      tips: "Kritieke Tips voor Rusland",
      tipsList: [
        "Installeer VPN voordat je Rusland binnenkomt",
        "Houd meerdere VPN-apps als backup",
        "Download apps terwijl je in het buitenland bent",
        "Gebruik specifiek obfuscated/stealth servers",
        "Wees je ervan bewust dat VPN-gebruik sporen kan achterlaten",
        "Check regelmatig de Rusland-specifieke richtlijnen van je VPN",
      ],
      faqTitle: "Rusland VPN FAQ",
      faqs: [
        {
          q: "Is het gebruik van een VPN illegaal in Rusland?",
          a: "VPN-gebruik zelf is niet expliciet illegaal, maar de juridische situatie wordt steeds riskanter. Het delen van VPN-informatie is illegaal sinds maart 2024.",
        },
        {
          q: "Waarom zijn zoveel VPNs geblokkeerd in Rusland?",
          a: "Roskomnadzor blokkeert actief VPN-diensten. In 2024 werden 197 diensten geblokkeerd. De overheid gebruikt deep packet inspection.",
        },
        {
          q: "Welke VPN werkt het beste in Rusland in 2025?",
          a: "ExpressVPN wordt consistent het hoogst gewaardeerd vanwege geavanceerde obfuscatie. Geen enkele VPN werkt echter 100% gegarandeerd.",
        },
        {
          q: "Kan ik YouTube bereiken met een VPN in Rusland?",
          a: "Ja, VPNs kunnen helpen om YouTube-throttling te omzeilen. Zonder VPN kan de snelheid slechts 128 kbps zijn.",
        },
      ],
      getVpn: "Download VPN",
      readReview: "Lees Review",
      mayWorkInRussia: "Werkt mogelijk in Rusland",
      obfuscation: "Obfuscatie",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
      disclaimer: "Belangrijke Disclaimer",
      disclaimerText:
        "De juridische situatie in Rusland verandert snel. Deze informatie is bedoeld voor educatieve doeleinden.",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <CountryVpnSchema vpns={russiaVpns} locale={locale} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-red-500/5 to-background" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t.badge}
              </Badge>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-6xl">🇷🇺</span>
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

        {/* Severity Warning */}
        <section className="py-8">
          <div className="container">
            <Card className="border-orange-500 bg-orange-500/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-orange-500 mb-2">
                      {t.severityWarning}
                    </h2>
                    <p className="text-muted-foreground">
                      {t.severityWarningText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t.stats}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.statsList.map((stat, index) => (
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

        {/* Legal Status */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Scale className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                  <p className="text-muted-foreground mb-4">{t.legalStatusText}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Gray legal area
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200">
                      <Ban className="h-3 w-3 mr-1" />
                      Sharing VPN info illegal
                    </Badge>
                  </div>
                </div>
              </div>
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
                  <div className="space-y-3">
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

        {/* VPNs That May Work */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatMayWork}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whatMayWorkText}
              </p>
            </div>

            <div className="space-y-6">
              {russiaVpns.map((vpn, index) => (
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
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm">{t.mayWorkInRussia}</span>
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

        {/* Disclaimer */}
        <section className="py-8">
          <div className="container">
            <Card className="border-yellow-500/50 bg-yellow-500/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                      {t.disclaimer}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t.disclaimerText}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    href="https://www.cloudwards.net/russian-vpn-ban/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Cloudwards - The Russian VPN Ban 2025
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.themoscowtimes.com/2025/08/06/how-russias-new-internet-restrictions-work-and-how-to-get-around-them-a90117"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    The Moscow Times - Russia&apos;s New Internet Restrictions
                  </a>
                </li>
                <li>
                  <a
                    href="https://cepa.org/article/blocked-and-bypassed-russians-evade-internet-censorship/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    CEPA - Blocked and Bypassed: Russians Evade Internet Censorship
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
