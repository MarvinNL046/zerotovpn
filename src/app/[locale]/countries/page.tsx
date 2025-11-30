import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  Clock,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN by Country 2025: Find VPNs That Work in Your Location | ZeroToVPN",
    nl: "VPN per Land 2025: Vind VPNs Die Werken in Jouw Locatie | ZeroToVPN",
    de: "VPN nach Land 2025: Finden Sie VPNs für Ihren Standort | ZeroToVPN",
    es: "VPN por País 2025: Encuentra VPNs que Funcionan en tu Ubicación | ZeroToVPN",
    fr: "VPN par Pays 2025: Trouvez des VPN qui Fonctionnent dans Votre Pays | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find the best VPN for your country. Expert guides for China, Russia, UAE, Turkey, Netherlands and more. Research-backed recommendations.",
    nl: "Vind de beste VPN voor jouw land. Expert gidsen voor China, Rusland, VAE, Turkije, Nederland en meer.",
    de: "Finden Sie das beste VPN für Ihr Land. Expertenleitfäden für China, Russland, VAE, Türkei, Niederlande und mehr.",
    es: "Encuentra el mejor VPN para tu país. Guías expertas para China, Rusia, EAU, Turquía, Países Bajos y más.",
    fr: "Trouvez le meilleur VPN pour votre pays. Guides experts pour la Chine, la Russie, les EAU, la Turquie, les Pays-Bas et plus.",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
  };
}

// Country data with actual research-backed info
const countries = [
  {
    slug: "china",
    flag: "🇨🇳",
    name: { en: "China", nl: "China", de: "China", es: "China", fr: "Chine" },
    status: "restricted",
    statusText: {
      en: "Heavily restricted",
      nl: "Zwaar beperkt",
      de: "Stark eingeschränkt",
      es: "Muy restringido",
      fr: "Très restreint"
    },
    description: {
      en: "The Great Firewall blocks most VPNs. Obfuscation technology required.",
      nl: "De Grote Firewall blokkeert de meeste VPNs. Obfuscatie-technologie vereist.",
      de: "Die Große Firewall blockiert die meisten VPNs. Verschleierungstechnologie erforderlich.",
      es: "El Gran Cortafuegos bloquea la mayoría de VPNs. Tecnología de ofuscación requerida.",
      fr: "Le Grand Pare-feu bloque la plupart des VPN. Technologie d'obfuscation requise."
    },
  },
  {
    slug: "russia",
    flag: "🇷🇺",
    name: { en: "Russia", nl: "Rusland", de: "Russland", es: "Rusia", fr: "Russie" },
    status: "restricted",
    statusText: {
      en: "Increasingly restricted",
      nl: "Toenemend beperkt",
      de: "Zunehmend eingeschränkt",
      es: "Cada vez más restringido",
      fr: "De plus en plus restreint"
    },
    description: {
      en: "197+ VPNs blocked in 2024. 41% of Russians still use VPNs. Advanced obfuscation needed.",
      nl: "197+ VPNs geblokkeerd in 2024. 41% van de Russen gebruikt nog steeds VPNs.",
      de: "197+ VPNs 2024 gesperrt. 41% der Russen nutzen noch VPNs.",
      es: "197+ VPNs bloqueados en 2024. 41% de los rusos aún usan VPNs.",
      fr: "197+ VPN bloqués en 2024. 41% des Russes utilisent encore des VPN."
    },
  },
  {
    slug: "uae",
    flag: "🇦🇪",
    name: { en: "UAE & Dubai", nl: "VAE & Dubai", de: "VAE & Dubai", es: "EAU y Dubái", fr: "EAU et Dubaï" },
    status: "legal-restricted",
    statusText: {
      en: "Legal but regulated",
      nl: "Legaal maar gereguleerd",
      de: "Legal aber reguliert",
      es: "Legal pero regulado",
      fr: "Légal mais réglementé"
    },
    description: {
      en: "VPNs legal for legitimate use. Fines up to AED 2M for misuse. VoIP restrictions apply.",
      nl: "VPNs legaal voor legitiem gebruik. Boetes tot AED 2M voor misbruik.",
      de: "VPNs legal für legitime Nutzung. Strafen bis AED 2M bei Missbrauch.",
      es: "VPNs legales para uso legítimo. Multas hasta AED 2M por mal uso.",
      fr: "VPN légaux pour usage légitime. Amendes jusqu'à 2M AED pour mauvais usage."
    },
  },
  {
    slug: "turkey",
    flag: "🇹🇷",
    name: { en: "Turkey", nl: "Turkije", de: "Türkei", es: "Turquía", fr: "Turquie" },
    status: "legal-blocked",
    statusText: {
      en: "Legal, many VPNs blocked",
      nl: "Legaal, veel VPNs geblokkeerd",
      de: "Legal, viele VPNs gesperrt",
      es: "Legal, muchas VPNs bloqueadas",
      fr: "Légal, nombreux VPN bloqués"
    },
    description: {
      en: "VPN use legal but 27+ services blocked. Social media often restricted during events.",
      nl: "VPN-gebruik legaal maar 27+ diensten geblokkeerd. Sociale media vaak beperkt.",
      de: "VPN-Nutzung legal, aber 27+ Dienste gesperrt. Soziale Medien oft eingeschränkt.",
      es: "Uso de VPN legal pero 27+ servicios bloqueados. Redes sociales a menudo restringidas.",
      fr: "Utilisation de VPN légale mais 27+ services bloqués. Réseaux sociaux souvent restreints."
    },
  },
  {
    slug: "netherlands",
    flag: "🇳🇱",
    name: { en: "Netherlands", nl: "Nederland", de: "Niederlande", es: "Países Bajos", fr: "Pays-Bas" },
    status: "legal",
    statusText: {
      en: "Fully legal",
      nl: "Volledig legaal",
      de: "Vollständig legal",
      es: "Totalmente legal",
      fr: "Entièrement légal"
    },
    description: {
      en: "High internet freedom. 14 Eyes member. VPN recommended for privacy and streaming Dutch TV abroad.",
      nl: "Hoge internetvrijheid. 14 Eyes lid. VPN aanbevolen voor privacy en Nederlandse TV in het buitenland.",
      de: "Hohe Internetfreiheit. 14 Eyes Mitglied. VPN empfohlen für Datenschutz.",
      es: "Alta libertad de internet. Miembro de 14 Eyes. VPN recomendado para privacidad.",
      fr: "Grande liberté d'internet. Membre des 14 Eyes. VPN recommandé pour la confidentialité."
    },
  },
];

const content = {
  en: {
    badge: "Updated November 2025",
    title: "VPN Guides by Country",
    subtitle: "Find VPNs that work in your location with our research-backed country guides",
    intro: "Internet freedom varies dramatically by country. Some nations heavily restrict VPN access, while others embrace online privacy. Our guides help you find VPNs that actually work.",
    countriesTitle: "Select Your Country",
    restrictedLabel: "Restricted",
    legalLabel: "Legal",
    regulatedLabel: "Regulated",
    viewGuide: "View Guide",
    moreCountries: "More Country Guides Coming Soon",
    moreCountriesText: "We're researching VPN situations in more countries including Iran, India, Pakistan, Vietnam, and Saudi Arabia.",
  },
  nl: {
    badge: "Bijgewerkt november 2025",
    title: "VPN Gidsen per Land",
    subtitle: "Vind VPNs die werken in jouw locatie met onze onderzoeksgebaseerde landgidsen",
    intro: "Internetvrijheid varieert enorm per land. Sommige landen beperken VPN-toegang zwaar, anderen omarmen online privacy. Onze gidsen helpen je VPNs te vinden die echt werken.",
    countriesTitle: "Selecteer Je Land",
    restrictedLabel: "Beperkt",
    legalLabel: "Legaal",
    regulatedLabel: "Gereguleerd",
    viewGuide: "Bekijk Gids",
    moreCountries: "Meer Landgidsen Binnenkort",
    moreCountriesText: "We onderzoeken VPN-situaties in meer landen waaronder Iran, India, Pakistan, Vietnam en Saoedi-Arabië.",
  },
};

export default async function CountriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = content[locale as keyof typeof content] || content.en;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "restricted":
        return (
          <Badge className="bg-red-500 text-white">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t.restrictedLabel}
          </Badge>
        );
      case "legal-restricted":
      case "legal-blocked":
        return (
          <Badge className="bg-yellow-500 text-yellow-950">
            <Shield className="h-3 w-3 mr-1" />
            {t.regulatedLabel}
          </Badge>
        );
      case "legal":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t.legalLabel}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-12 w-12 text-primary" />
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

      {/* Intro */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.countriesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group"
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-5xl">{country.flag}</span>
                        {getStatusBadge(country.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {country.name[locale as keyof typeof country.name] || country.name.en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {country.statusText[locale as keyof typeof country.statusText] || country.statusText.en}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {country.description[locale as keyof typeof country.description] || country.description.en}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        {t.viewGuide}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t.moreCountries}</h2>
            <p className="text-muted-foreground">{t.moreCountriesText}</p>
            <div className="flex justify-center gap-4 mt-6">
              <span className="text-3xl opacity-50">🇮🇷</span>
              <span className="text-3xl opacity-50">🇮🇳</span>
              <span className="text-3xl opacity-50">🇵🇰</span>
              <span className="text-3xl opacity-50">🇻🇳</span>
              <span className="text-3xl opacity-50">🇸🇦</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
