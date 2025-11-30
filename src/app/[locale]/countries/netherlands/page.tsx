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
  CheckCircle,
  Globe,
  Clock,
  ArrowRight,
  Info,
  Smartphone,
  Lock,
  Eye,
  Tv,
  Wifi,
  Server,
  FileWarning,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Netherlands 2025: Privacy, Streaming & Security | ZeroToVPN",
    nl: "Beste VPN voor Nederland 2025: Privacy, Streaming & Veiligheid | ZeroToVPN",
    de: "Beste VPN für die Niederlande 2025: Datenschutz & Streaming | ZeroToVPN",
    es: "Mejor VPN para Países Bajos 2025: Privacidad y Streaming | ZeroToVPN",
    fr: "Meilleur VPN pour les Pays-Bas 2025: Confidentialité et Streaming | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "VPNs are fully legal in the Netherlands. Find the best VPN for Dutch privacy, streaming NPO/Ziggo abroad, and secure public WiFi. Expert-tested picks.",
    nl: "VPNs zijn volledig legaal in Nederland. Vind de beste VPN voor privacy, NPO/Ziggo in het buitenland kijken, en veilig openbaar WiFi.",
    de: "VPNs sind in den Niederlanden legal. Finden Sie das beste VPN für Datenschutz und niederländisches Streaming.",
    es: "Los VPN son legales en los Países Bajos. Encuentra el mejor VPN para privacidad y streaming holandés.",
    fr: "Les VPN sont légaux aux Pays-Bas. Trouvez le meilleur VPN pour la confidentialité et le streaming néerlandais.",
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

export default async function NetherlandsVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const nlVpns = allVpns.filter((vpn) =>
    ["nordvpn", "surfshark", "expressvpn", "protonvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for Netherlands",
      subtitle: "Protect your privacy, stream Dutch content abroad, and stay secure online",
      legalStatus: "VPN Status in the Netherlands",
      legalStatusText:
        "VPNs are completely legal in the Netherlands. The country is known for high internet freedom. However, the Netherlands is part of the 14 Eyes surveillance alliance, making privacy-focused VPNs valuable for Dutch users.",
      whyVpn: "Why Dutch Users Need a VPN",
      whyVpnList: [
        {
          icon: "eye",
          title: "14 Eyes Surveillance",
          desc: "Netherlands is part of the 14 Eyes intelligence alliance. A VPN with no-logs policy protects your data from potential surveillance.",
        },
        {
          icon: "tv",
          title: "Watch Dutch TV Abroad",
          desc: "Access NPO, Ziggo Go, Videoland, and KIJK when traveling outside the Netherlands with a Dutch IP address.",
        },
        {
          icon: "wifi",
          title: "Public WiFi Security",
          desc: "Protect yourself on public WiFi in cafes, trains (NS), and airports with encrypted VPN connections.",
        },
        {
          icon: "globe",
          title: "Access Global Content",
          desc: "Watch US Netflix, BBC iPlayer, and other geo-restricted content from the Netherlands.",
        },
      ],
      topVpns: "Best VPNs for Dutch Users (2025)",
      topVpnsText:
        "These VPNs offer Dutch servers for streaming local content, strong privacy protections, and fast speeds for the Netherlands.",
      privacyConsiderations: "Privacy Considerations",
      privacyPoints: [
        {
          title: "14 Eyes Alliance",
          desc: "Netherlands shares intelligence with 13 other countries. Choose a VPN based outside these nations.",
        },
        {
          title: "Data Retention",
          desc: "EU Data Retention Directive was invalidated in 2014, but ISPs may still collect some data under GDPR.",
        },
        {
          title: "No-Logs Policy",
          desc: "Essential for privacy. Choose VPNs with audited no-logs policies so there's nothing to hand over.",
        },
        {
          title: "GDPR Protection",
          desc: "GDPR provides strong data protection, but a VPN adds an extra layer of privacy for your online activities.",
        },
      ],
      streamingGuide: "Streaming Guide for Dutch Users",
      streamingList: [
        { service: "NPO", location: "Watch Dutch public broadcasting from anywhere" },
        { service: "Ziggo Go", location: "Access your Ziggo subscription while traveling" },
        { service: "Videoland", location: "Stream RTL's streaming service abroad" },
        { service: "KIJK", location: "Watch Talpa Network content outside NL" },
        { service: "US Netflix", location: "Access the larger US Netflix library" },
        { service: "BBC iPlayer", location: "Watch British content with UK server" },
      ],
      features: "Key Features for Dutch Users",
      featuresList: [
        {
          title: "Dutch Servers",
          desc: "Amsterdam servers for fast local connections and watching Dutch content abroad",
        },
        {
          title: "No-Logs Policy",
          desc: "Audited privacy policies protect you from 14 Eyes data requests",
        },
        {
          title: "Fast Speeds",
          desc: "WireGuard protocol for minimal speed loss on Dutch fiber connections",
        },
        {
          title: "Streaming Support",
          desc: "Works with Netflix, NPO, Ziggo Go, and other streaming services",
        },
      ],
      useCases: "Common Use Cases",
      useCasesList: [
        "Watching NPO, Ziggo, or Videoland while on vacation",
        "Accessing US Netflix larger content library",
        "Protecting privacy from ISP and 14 Eyes surveillance",
        "Securing connection on public WiFi (NS trains, Schiphol, cafes)",
        "Safe torrenting with Dutch-friendly privacy laws",
        "Accessing work resources securely while traveling",
      ],
      faqTitle: "Netherlands VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in the Netherlands?",
          a: "Yes, VPNs are completely legal in the Netherlands. You can use them freely for privacy, streaming, and security purposes. Only using a VPN for illegal activities (like downloading copyrighted content) remains illegal.",
        },
        {
          q: "Why do I need a VPN in the Netherlands?",
          a: "Even though the Netherlands has high internet freedom, a VPN protects your privacy from ISPs and the 14 Eyes surveillance alliance. It also lets you watch Dutch TV abroad and access international content.",
        },
        {
          q: "Which VPN has the best Dutch servers?",
          a: "NordVPN has over 225 servers in the Netherlands, offering excellent coverage. ExpressVPN has servers in Amsterdam, Rotterdam, and The Hague. Surfshark (based in the Netherlands) also offers strong Dutch server coverage.",
        },
        {
          q: "Can I watch NPO outside the Netherlands?",
          a: "Yes! Connect to a VPN server in the Netherlands to get a Dutch IP address, and you can watch NPO, Ziggo Go, Videoland, and other Dutch streaming services from anywhere in the world.",
        },
        {
          q: "Is Surfshark based in the Netherlands?",
          a: "Yes, Surfshark is headquartered in the Netherlands. While this means it's within the 14 Eyes jurisdiction, Surfshark maintains a strict no-logs policy that has been independently audited.",
        },
      ],
      getVpn: "Get VPN",
      dutchServers: "Dutch servers",
      noLogs: "No-logs policy",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
      freeTierNote: "Free Tier Available",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor Nederland",
      subtitle: "Bescherm je privacy, stream Nederlandse content in het buitenland, en blijf veilig online",
      legalStatus: "VPN Status in Nederland",
      legalStatusText:
        "VPNs zijn volledig legaal in Nederland. Het land staat bekend om hoge internetvrijheid. Nederland maakt echter deel uit van de 14 Eyes surveillance alliantie, wat privacy-gerichte VPNs waardevol maakt.",
      whyVpn: "Waarom Nederlanders een VPN Nodig Hebben",
      whyVpnList: [
        {
          icon: "eye",
          title: "14 Eyes Surveillance",
          desc: "Nederland maakt deel uit van de 14 Eyes inlichtingen alliantie. Een VPN met no-logs beleid beschermt je data.",
        },
        {
          icon: "tv",
          title: "Nederlandse TV in het Buitenland",
          desc: "Krijg toegang tot NPO, Ziggo Go, Videoland en KIJK wanneer je buiten Nederland reist.",
        },
        {
          icon: "wifi",
          title: "Openbare WiFi Beveiliging",
          desc: "Bescherm jezelf op openbare WiFi in cafés, treinen (NS) en luchthavens.",
        },
        {
          icon: "globe",
          title: "Toegang tot Wereldwijde Content",
          desc: "Kijk Amerikaanse Netflix, BBC iPlayer en andere geo-restricted content.",
        },
      ],
      topVpns: "Beste VPNs voor Nederlanders (2025)",
      topVpnsText:
        "Deze VPNs bieden Nederlandse servers voor lokale content, sterke privacybescherming en snelle snelheden.",
      privacyConsiderations: "Privacy Overwegingen",
      privacyPoints: [
        {
          title: "14 Eyes Alliantie",
          desc: "Nederland deelt inlichtingen met 13 andere landen. Kies een VPN gevestigd buiten deze landen.",
        },
        {
          title: "Data Retentie",
          desc: "EU Data Retentie Richtlijn werd ongeldig verklaard in 2014, maar ISPs kunnen nog steeds data verzamelen onder GDPR.",
        },
        {
          title: "No-Logs Beleid",
          desc: "Essentieel voor privacy. Kies VPNs met geauditeerd no-logs beleid zodat er niets over te dragen is.",
        },
        {
          title: "GDPR Bescherming",
          desc: "GDPR biedt sterke databescherming, maar een VPN voegt een extra privacylaag toe.",
        },
      ],
      streamingGuide: "Streaming Gids voor Nederlanders",
      streamingList: [
        { service: "NPO", location: "Kijk Nederlandse publieke omroep overal" },
        { service: "Ziggo Go", location: "Toegang tot je Ziggo abonnement tijdens reizen" },
        { service: "Videoland", location: "Stream RTL's streamingdienst in het buitenland" },
        { service: "KIJK", location: "Kijk Talpa Network content buiten NL" },
        { service: "US Netflix", location: "Toegang tot de grotere Amerikaanse Netflix bibliotheek" },
        { service: "BBC iPlayer", location: "Kijk Britse content met UK server" },
      ],
      features: "Belangrijke Features voor Nederlanders",
      featuresList: [
        {
          title: "Nederlandse Servers",
          desc: "Amsterdam servers voor snelle lokale verbindingen en Nederlandse content in het buitenland",
        },
        {
          title: "No-Logs Beleid",
          desc: "Geauditeerde privacy policies beschermen je tegen 14 Eyes data-verzoeken",
        },
        {
          title: "Snelle Snelheden",
          desc: "WireGuard protocol voor minimaal snelheidsverlies op Nederlandse glasvezel",
        },
        {
          title: "Streaming Support",
          desc: "Werkt met Netflix, NPO, Ziggo Go en andere streamingdiensten",
        },
      ],
      useCases: "Veelvoorkomende Gebruik",
      useCasesList: [
        "NPO, Ziggo of Videoland kijken tijdens vakantie",
        "Toegang tot grotere Amerikaanse Netflix bibliotheek",
        "Privacy beschermen tegen ISP en 14 Eyes surveillance",
        "Verbinding beveiligen op openbare WiFi (NS treinen, Schiphol, cafés)",
        "Veilig torrenten met Nederlandse privacy-vriendelijke wetten",
        "Veilig toegang tot werkbronnen tijdens reizen",
      ],
      faqTitle: "Nederland VPN FAQ",
      faqs: [
        {
          q: "Zijn VPNs legaal in Nederland?",
          a: "Ja, VPNs zijn volledig legaal in Nederland. Je kunt ze vrij gebruiken voor privacy, streaming en beveiliging. Alleen het gebruik van een VPN voor illegale activiteiten blijft illegaal.",
        },
        {
          q: "Waarom heb ik een VPN nodig in Nederland?",
          a: "Hoewel Nederland hoge internetvrijheid heeft, beschermt een VPN je privacy tegen ISPs en de 14 Eyes surveillance alliantie. Het laat je ook Nederlandse TV kijken in het buitenland.",
        },
        {
          q: "Welke VPN heeft de beste Nederlandse servers?",
          a: "NordVPN heeft meer dan 225 servers in Nederland. ExpressVPN heeft servers in Amsterdam, Rotterdam en Den Haag. Surfshark (gevestigd in Nederland) biedt ook sterke dekking.",
        },
        {
          q: "Kan ik NPO kijken buiten Nederland?",
          a: "Ja! Verbind met een VPN-server in Nederland om een Nederlands IP-adres te krijgen, en je kunt NPO, Ziggo Go, Videoland en andere Nederlandse streamingdiensten overal ter wereld kijken.",
        },
        {
          q: "Is Surfshark gevestigd in Nederland?",
          a: "Ja, Surfshark heeft zijn hoofdkantoor in Nederland. Dit betekent dat het binnen de 14 Eyes jurisdictie valt, maar Surfshark handhaaft een strikt no-logs beleid dat onafhankelijk is geauditeerd.",
        },
      ],
      getVpn: "Download VPN",
      dutchServers: "Nederlandse servers",
      noLogs: "No-logs beleid",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
      freeTierNote: "Gratis Tier Beschikbaar",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">🇳🇱</span>
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
              <Shield className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                <p className="text-muted-foreground mb-4">{t.legalStatusText}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Fully legal
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200">
                    <Eye className="h-3 w-3 mr-1" />
                    High internet freedom
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why VPN */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyVpn}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyVpnList.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {item.icon === "eye" && <Eye className="h-6 w-6 text-primary" />}
                      {item.icon === "tv" && <Tv className="h-6 w-6 text-primary" />}
                      {item.icon === "wifi" && <Wifi className="h-6 w-6 text-primary" />}
                      {item.icon === "globe" && <Globe className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top VPNs */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.topVpns}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.topVpnsText}
            </p>
          </div>

          <div className="space-y-6">
            {nlVpns.map((vpn, index) => (
              <Card key={vpn.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold">{vpn.name}</h3>
                          {vpn.freeTier && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {t.freeTierNote}
                            </Badge>
                          )}
                        </div>
                        <RatingStars rating={vpn.overallRating} size="sm" />
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{t.dutchServers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">{t.noLogs}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-purple-500" />
                        <span className="text-sm">{vpn.countries} countries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-green-500" />
                        <span className="text-sm">
                          {vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices} devices
                        </span>
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

      {/* Privacy Considerations */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.privacyConsiderations}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.privacyPoints.map((point, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {index === 0 && <Eye className="h-6 w-6 text-primary" />}
                      {index === 1 && <FileWarning className="h-6 w-6 text-primary" />}
                      {index === 2 && <Lock className="h-6 w-6 text-primary" />}
                      {index === 3 && <Shield className="h-6 w-6 text-primary" />}
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

      {/* Streaming Guide */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.streamingGuide}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {t.streamingList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Tv className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{item.service}</div>
                        <div className="text-sm text-muted-foreground">{item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.useCases}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {t.useCasesList.map((useCase, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{useCase}</span>
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
                  href="https://www.security.org/vpn/best/netherlands/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Security.org - Best VPN for Netherlands
                </a>
              </li>
              <li>
                <a
                  href="https://www.comparitech.com/blog/vpn-privacy/best-vpn-netherlands/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Comparitech - Best VPNs for the Netherlands
                </a>
              </li>
              <li>
                <a
                  href="https://www.cloudwards.net/best-vpn-for-the-netherlands/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Cloudwards - Best VPN for the Netherlands
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
