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
  Phone,
  Building,
  DollarSign,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for UAE & Dubai 2025: Legal Guide & Top Picks | ZeroToVPN",
    nl: "Beste VPN voor VAE & Dubai 2025: Juridische Gids & Top Keuzes | ZeroToVPN",
    de: "Beste VPN für VAE & Dubai 2025: Rechtlicher Leitfaden | ZeroToVPN",
    es: "Mejor VPN para EAU y Dubái 2025: Guía Legal y Mejores Opciones | ZeroToVPN",
    fr: "Meilleur VPN pour EAU et Dubaï 2025: Guide Juridique | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Using a VPN in Dubai & UAE? Know the laws first. VPNs are legal for legitimate use but fines up to AED 2M for misuse. Find safe, working VPNs.",
    nl: "VPN gebruiken in Dubai & VAE? Ken eerst de wetten. VPNs zijn legaal voor legitiem gebruik maar boetes tot AED 2M voor misbruik.",
    de: "VPN in Dubai & VAE nutzen? Kennen Sie zuerst die Gesetze. VPNs sind für legitime Nutzung legal, aber Strafen bis zu AED 2M.",
    es: "¿Usar VPN en Dubái y EAU? Conoce las leyes primero. Los VPN son legales para uso legítimo pero multas hasta AED 2M.",
    fr: "Utiliser un VPN à Dubaï et aux EAU? Connaissez d'abord les lois. Les VPN sont légaux pour un usage légitime.",
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

export default async function UAEVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const uaeVpns = allVpns.filter((vpn) =>
    ["nordvpn", "surfshark", "expressvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for UAE & Dubai",
      subtitle: "Navigate UAE's VPN regulations safely and access restricted content",
      legalNotice: "Important Legal Information",
      legalNoticeText:
        "VPNs are NOT banned in the UAE. They are legal for legitimate business and personal use. However, using a VPN to commit crimes or access illegal content can result in fines of AED 500,000 to AED 2,000,000 (approximately $136,000 to $545,000).",
      legalStatus: "VPN Legal Status in UAE",
      legalPoints: [
        {
          icon: "check",
          title: "Legal for Business",
          desc: "Banks, corporations, and remote workers legally use VPNs daily",
        },
        {
          icon: "check",
          title: "Legal for Privacy",
          desc: "Using VPN for personal security and privacy is permitted",
        },
        {
          icon: "warning",
          title: "Illegal for Crime",
          desc: "Using VPN to commit crimes or hide criminal activity is illegal",
        },
        {
          icon: "x",
          title: "VoIP Restrictions",
          desc: "Using VPN to bypass VoIP blocks (WhatsApp calls) is technically illegal",
        },
      ],
      fines: "Potential Penalties",
      finesList: [
        { amount: "AED 500,000", desc: "Minimum fine for VPN misuse" },
        { amount: "AED 2,000,000", desc: "Maximum fine for serious violations" },
        { amount: "Imprisonment", desc: "Possible for criminal activities" },
      ],
      whatWorks: "Recommended VPNs for UAE (2025)",
      whatWorksText:
        "These VPNs offer obfuscated servers that work in the UAE's restrictive environment. Choose providers based outside the UAE with strong no-logs policies.",
      keyFeatures: "Essential Features for UAE",
      features: [
        {
          title: "Obfuscated Servers",
          desc: "Essential for bypassing UAE's internet restrictions",
        },
        {
          title: "No-Logs Policy",
          desc: "Choose providers that don't store your activity data",
        },
        {
          title: "Based Outside UAE",
          desc: "Panama, Netherlands, BVI - beyond UAE jurisdiction",
        },
        {
          title: "Strong Encryption",
          desc: "AES-256 encryption to protect your data",
        },
      ],
      blockedServices: "Commonly Restricted in UAE",
      blocked: [
        "VoIP calls (WhatsApp, FaceTime, Skype voice/video)",
        "Some dating apps and websites",
        "Gambling websites",
        "Adult content",
        "Some news and political content",
        "Certain streaming content",
      ],
      tips: "Tips for VPN Use in UAE",
      tipsList: [
        "Install your VPN before arriving in the UAE",
        "Use for legitimate purposes only (business, privacy, streaming)",
        "Avoid using VPN for VoIP calls if concerned about legal gray area",
        "Don't use free VPNs - they lack proper security features",
        "Keep your VPN updated for best compatibility",
        "Use obfuscated/stealth mode when connecting",
      ],
      faqTitle: "UAE VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in Dubai?",
          a: "Yes, VPNs are legal in Dubai and the UAE for legitimate purposes. Businesses, remote workers, and individuals can use VPNs for privacy and security. The law targets illegal activities performed while using a VPN, not the VPN itself.",
        },
        {
          q: "Can I use WhatsApp calls with a VPN in UAE?",
          a: "Technically, bypassing VoIP restrictions is against UAE regulations. However, many expats and tourists use VPNs for this purpose. The risk is relatively low for personal use, but it's a legal gray area you should be aware of.",
        },
        {
          q: "Will I get in trouble for using a VPN as a tourist?",
          a: "Using a VPN as a tourist for normal activities (checking email, streaming, privacy) is very unlikely to cause problems. The UAE primarily targets illegal activities, not regular VPN usage for privacy.",
        },
        {
          q: "Which VPNs work best in UAE?",
          a: "NordVPN, ExpressVPN, and Surfshark consistently work well in the UAE due to their obfuscation technology. Install before arrival as some VPN websites may be blocked.",
        },
      ],
      getVpn: "Get VPN",
      worksInUAE: "Works in UAE",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor VAE & Dubai",
      subtitle: "Navigeer veilig door de VAE VPN-regelgeving",
      legalNotice: "Belangrijke Juridische Informatie",
      legalNoticeText:
        "VPNs zijn NIET verboden in de VAE. Ze zijn legaal voor legitiem zakelijk en persoonlijk gebruik. Echter, het gebruik van een VPN om misdaden te plegen kan leiden tot boetes van AED 500.000 tot AED 2.000.000.",
      legalStatus: "VPN Juridische Status in VAE",
      legalPoints: [
        {
          icon: "check",
          title: "Legaal voor Bedrijven",
          desc: "Banken, bedrijven en remote workers gebruiken dagelijks legaal VPNs",
        },
        {
          icon: "check",
          title: "Legaal voor Privacy",
          desc: "VPN gebruiken voor persoonlijke veiligheid is toegestaan",
        },
        {
          icon: "warning",
          title: "Illegaal voor Misdaad",
          desc: "VPN gebruiken om misdaden te plegen is illegaal",
        },
        {
          icon: "x",
          title: "VoIP Beperkingen",
          desc: "VPN gebruiken om VoIP-blokkades te omzeilen is technisch illegaal",
        },
      ],
      fines: "Mogelijke Boetes",
      finesList: [
        { amount: "AED 500.000", desc: "Minimale boete voor VPN-misbruik" },
        { amount: "AED 2.000.000", desc: "Maximale boete voor ernstige overtredingen" },
        { amount: "Gevangenisstraf", desc: "Mogelijk voor criminele activiteiten" },
      ],
      whatWorks: "Aanbevolen VPNs voor VAE (2025)",
      whatWorksText:
        "Deze VPNs bieden obfuscated servers die werken in de VAE. Kies providers buiten de VAE met sterke no-logs policies.",
      keyFeatures: "Essentiële Functies voor VAE",
      features: [
        {
          title: "Obfuscated Servers",
          desc: "Essentieel voor het omzeilen van VAE internetbeperkingen",
        },
        {
          title: "No-Logs Policy",
          desc: "Kies providers die je activiteit niet opslaan",
        },
        {
          title: "Buiten VAE Gevestigd",
          desc: "Panama, Nederland, BVI - buiten VAE jurisdictie",
        },
        {
          title: "Sterke Encryptie",
          desc: "AES-256 encryptie om je data te beschermen",
        },
      ],
      blockedServices: "Veelvoorkomende Beperkingen in VAE",
      blocked: [
        "VoIP-gesprekken (WhatsApp, FaceTime, Skype)",
        "Sommige dating apps en websites",
        "Gokwebsites",
        "Volwassen content",
        "Sommige nieuws- en politieke content",
        "Bepaalde streaming content",
      ],
      tips: "Tips voor VPN Gebruik in VAE",
      tipsList: [
        "Installeer je VPN voordat je naar de VAE gaat",
        "Gebruik alleen voor legitieme doeleinden",
        "Vermijd VPN voor VoIP-gesprekken als je bezorgd bent",
        "Gebruik geen gratis VPNs - ze missen goede beveiliging",
        "Houd je VPN up-to-date",
        "Gebruik obfuscated/stealth modus bij verbinden",
      ],
      faqTitle: "VAE VPN FAQ",
      faqs: [
        {
          q: "Zijn VPNs legaal in Dubai?",
          a: "Ja, VPNs zijn legaal in Dubai en de VAE voor legitieme doeleinden. Bedrijven en individuen kunnen VPNs gebruiken voor privacy en veiligheid.",
        },
        {
          q: "Kan ik WhatsApp-gesprekken voeren met een VPN in de VAE?",
          a: "Technisch gezien is het omzeilen van VoIP-beperkingen tegen de VAE-regelgeving. Veel expats gebruiken VPNs hiervoor, maar het is een juridisch grijs gebied.",
        },
        {
          q: "Krijg ik problemen als toerist met een VPN?",
          a: "VPN gebruiken als toerist voor normale activiteiten zal waarschijnlijk geen problemen veroorzaken. De VAE richt zich vooral op illegale activiteiten.",
        },
        {
          q: "Welke VPNs werken het beste in de VAE?",
          a: "NordVPN, ExpressVPN en Surfshark werken consistent goed in de VAE dankzij hun obfuscatie-technologie.",
        },
      ],
      getVpn: "Download VPN",
      worksInUAE: "Werkt in VAE",
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">🇦🇪</span>
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

      {/* Legal Notice */}
      <section className="py-8">
        <div className="container">
          <Card className="border-blue-500 bg-blue-500/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Scale className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {t.legalNotice}
                  </h2>
                  <p className="text-muted-foreground">{t.legalNoticeText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Status Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.legalStatus}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.legalPoints.map((point, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted">
                      {point.icon === "check" && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {point.icon === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      {point.icon === "x" && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fines Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.fines}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.finesList.map((fine, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-500">{fine.amount}</div>
                  <p className="text-sm text-muted-foreground mt-1">{fine.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VPNs That Work */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.whatWorksText}
            </p>
          </div>

          <div className="space-y-6">
            {uaeVpns.map((vpn, index) => (
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
                        <span className="text-sm">{t.worksInUAE}</span>
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
      <section className="py-16">
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
                      {index === 2 && <Building className="h-6 w-6 text-primary" />}
                      {index === 3 && <Lock className="h-6 w-6 text-primary" />}
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
      <section className="py-16 bg-muted/30">
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
      <section className="py-16">
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
      <section className="py-16 bg-muted/30">
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
                  href="https://www.khaleejtimes.com/uae/legal/is-vpn-banned-in-uae-rules-fines-what-you-need-to-know"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Khaleej Times - Is VPN banned in UAE?
                </a>
              </li>
              <li>
                <a
                  href="https://blog.jobxdubai.com/2024/09/08/vpn-in-uae-legal-guidelines-regulations-for-safe-usage-in-2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  JobXDubai - VPN in UAE Legal Guidelines 2024
                </a>
              </li>
              <li>
                <a
                  href="https://www.lexology.com/library/detail.aspx?g=4a58f6f3-1806-4c29-889e-1958a5be10ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Lexology - Understanding VPN Use in the UAE
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
