import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Go2NetworkSection } from "@/components/seo/go2-network-section";
import { Link } from "@/i18n/navigation";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Plane, Shield, Tv, Wifi } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

const content: Record<string, {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  badge: string;
  h1: string;
  intro: string;
  streamingTitle: string;
  streamingDesc: string;
  wifiTitle: string;
  wifiDesc: string;
  transparencyTitle: string;
  transparencyDesc: string;
  picksTitle: string;
  getVpn: string;
  readReview: string;
  researchTitle: string;
  dataSource: string;
  scoringRules: string;
  methodology: string;
  interactiveFilters: string;
  vpnIndex: string;
  relatedTitle: string;
  related: { title: string; description: string; href: string; icon: string }[];
}> = {
  en: {
    metaTitle: "Best VPN for Thailand - Travel, Streaming & Public WiFi",
    metaDescription: "Independent picks for using a VPN in Thailand: stable streaming access, safer public WiFi, and privacy while traveling.",
    ogTitle: "Best VPN for Thailand",
    ogDescription: "Data-driven VPN picks for Thailand travel, streaming, and remote work.",
    badge: "Thailand travel intent page",
    h1: "Best VPN for Thailand",
    intro: "If you are traveling, working remotely, or streaming while in Thailand, your VPN should be fast, reliable on hotel/public networks, and transparent about logging and jurisdiction. This page summarizes our top picks based on independent testing.",
    streamingTitle: "Streaming",
    streamingDesc: "Stable access for Netflix, Disney+, and region-based content while traveling.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Strong kill switch and encryption matter on airport, cafe, and hotel networks.",
    transparencyTitle: "Transparency",
    transparencyDesc: "We prioritize verifiable no-logs policy, ownership clarity, and re-test frequency.",
    picksTitle: "Top VPN picks for Thailand",
    getVpn: "Get",
    readReview: "Read full review",
    researchTitle: "How this page connects to our research stack",
    dataSource: "Data source:",
    scoringRules: "Scoring rules:",
    methodology: "Methodology",
    interactiveFilters: "Interactive filters:",
    vpnIndex: "VPN Index dashboard",
    relatedTitle: "Related internal guides",
    related: [
      { title: "VPN for Travel", description: "How to stay connected and private while moving across countries.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Best VPN for Streaming", description: "Comparison focused on streaming unlock reliability and speed.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Netflix", description: "Detailed tests for libraries, 4K consistency, and smart DNS behavior.", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN in India", description: "Country-specific VPN context and recommendations for India.", href: "/best/vpn-india", icon: "globe" },
      { title: "VPN in Japan", description: "Country-specific VPN context and recommendations for Japan.", href: "/best/vpn-japan", icon: "globe" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Thailand - Reizen, Streaming & Openbare WiFi",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in Thailand: stabiele streamingtoegang, veiliger openbaar WiFi en privacy onderweg.",
    ogTitle: "Beste VPN voor Thailand",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Thailand, streaming en thuiswerken.",
    badge: "Thailand reisgericht",
    h1: "Beste VPN voor Thailand",
    intro: "Of je nu reist, op afstand werkt of streamt in Thailand, je VPN moet snel zijn, betrouwbaar werken op hotel- en openbare netwerken, en transparant zijn over logging en jurisdictie. Deze pagina vat onze topaanbevelingen samen op basis van onafhankelijke tests.",
    streamingTitle: "Streaming",
    streamingDesc: "Stabiele toegang tot Netflix, Disney+ en regiogebonden content tijdens het reizen.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Een sterke kill switch en versleuteling zijn essentieel op luchthaven-, café- en hotelnetwerken.",
    transparencyTitle: "Transparantie",
    transparencyDesc: "We geven prioriteit aan verifieerbaar no-logsbeleid, duidelijk eigenaarschap en hertest-frequentie.",
    picksTitle: "Beste VPN-keuzes voor Thailand",
    getVpn: "Kies",
    readReview: "Lees volledige review",
    researchTitle: "Hoe deze pagina samenhangt met ons onderzoek",
    dataSource: "Databron:",
    scoringRules: "Beoordelingsregels:",
    methodology: "Methodologie",
    interactiveFilters: "Interactieve filters:",
    vpnIndex: "VPN Index-dashboard",
    relatedTitle: "Gerelateerde interne gidsen",
    related: [
      { title: "VPN voor op reis", description: "Hoe je verbonden en privé blijft tijdens reizen tussen landen.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Beste VPN voor streaming", description: "Vergelijking gericht op betrouwbaarheid van streaming en snelheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste VPN voor Netflix", description: "Gedetailleerde tests voor bibliotheken, 4K-consistentie en smart DNS-gedrag.", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN in India", description: "Landspecifieke VPN-context en aanbevelingen voor India.", href: "/best/vpn-india", icon: "globe" },
      { title: "VPN in Japan", description: "Landspecifieke VPN-context en aanbevelingen voor Japan.", href: "/best/vpn-japan", icon: "globe" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für Thailand – Reisen, Streaming & öffentliches WLAN",
    metaDescription: "Unabhängige Empfehlungen für VPNs in Thailand: stabiler Streaming-Zugang, sicheres öffentliches WLAN und Privatsphäre unterwegs.",
    ogTitle: "Bestes VPN für Thailand",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Thailand-Reisen, Streaming und Homeoffice.",
    badge: "Thailand-Reiseseite",
    h1: "Bestes VPN für Thailand",
    intro: "Ob du in Thailand reist, remote arbeitest oder streamst – dein VPN sollte schnell sein, zuverlässig in Hotel- und öffentlichen Netzwerken funktionieren und transparent in Bezug auf Protokollierung und Gerichtsbarkeit sein. Diese Seite fasst unsere Top-Empfehlungen auf Basis unabhängiger Tests zusammen.",
    streamingTitle: "Streaming",
    streamingDesc: "Stabiler Zugang zu Netflix, Disney+ und regionengesperrten Inhalten auf Reisen.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Ein starker Kill Switch und Verschlüsselung sind auf Flughafen-, Café- und Hotelnetzwerken unverzichtbar.",
    transparencyTitle: "Transparenz",
    transparencyDesc: "Wir legen Wert auf nachweisbare No-Logs-Richtlinien, klare Eigentumsverhältnisse und regelmäßige Nachtests.",
    picksTitle: "Top-VPN-Empfehlungen für Thailand",
    getVpn: "Zu",
    readReview: "Vollständigen Test lesen",
    researchTitle: "Wie diese Seite mit unserem Forschungssystem zusammenhängt",
    dataSource: "Datenquelle:",
    scoringRules: "Bewertungsregeln:",
    methodology: "Methodik",
    interactiveFilters: "Interaktive Filter:",
    vpnIndex: "VPN-Index-Dashboard",
    relatedTitle: "Verwandte interne Ratgeber",
    related: [
      { title: "VPN für Reisen", description: "So bleibst du unterwegs verbunden und geschützt.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Bestes VPN für Streaming", description: "Vergleich mit Fokus auf Entsperrzuverlässigkeit und Geschwindigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes VPN für Netflix", description: "Detaillierte Tests für Bibliotheken, 4K-Konsistenz und Smart-DNS-Verhalten.", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN in Indien", description: "Länderspezifischer VPN-Kontext und Empfehlungen für Indien.", href: "/best/vpn-india", icon: "globe" },
      { title: "VPN in Japan", description: "Länderspezifischer VPN-Kontext und Empfehlungen für Japan.", href: "/best/vpn-japan", icon: "globe" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para Tailandia - Viajes, Streaming y WiFi Público",
    metaDescription: "Selecciones independientes de VPN para Tailandia: acceso estable a streaming, WiFi público más seguro y privacidad mientras viajas.",
    ogTitle: "Mejor VPN para Tailandia",
    ogDescription: "Selecciones de VPN basadas en datos para viajar a Tailandia, streaming y teletrabajo.",
    badge: "Página de viajes a Tailandia",
    h1: "Mejor VPN para Tailandia",
    intro: "Si viajas, trabajas en remoto o haces streaming en Tailandia, tu VPN debe ser rápido, fiable en redes de hoteles y públicas, y transparente sobre registros y jurisdicción. Esta página resume nuestras mejores selecciones basadas en pruebas independientes.",
    streamingTitle: "Streaming",
    streamingDesc: "Acceso estable a Netflix, Disney+ y contenido con restricción geográfica mientras viajas.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Un kill switch robusto y cifrado son esenciales en redes de aeropuertos, cafeterías y hoteles.",
    transparencyTitle: "Transparencia",
    transparencyDesc: "Priorizamos políticas de no registros verificables, claridad en la propiedad y frecuencia de nuevas pruebas.",
    picksTitle: "Mejores VPN para Tailandia",
    getVpn: "Ir a",
    readReview: "Leer análisis completo",
    researchTitle: "Cómo se conecta esta página con nuestra investigación",
    dataSource: "Fuente de datos:",
    scoringRules: "Reglas de puntuación:",
    methodology: "Metodología",
    interactiveFilters: "Filtros interactivos:",
    vpnIndex: "Panel del Índice VPN",
    relatedTitle: "Guías internas relacionadas",
    related: [
      { title: "VPN para viajar", description: "Cómo mantener la conexión y privacidad al moverte entre países.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Mejor VPN para streaming", description: "Comparativa centrada en la fiabilidad de desbloqueo y velocidad de streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN para Netflix", description: "Pruebas detalladas de bibliotecas, consistencia en 4K y comportamiento de Smart DNS.", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN en India", description: "Contexto y recomendaciones de VPN específicas para India.", href: "/best/vpn-india", icon: "globe" },
      { title: "VPN en Japón", description: "Contexto y recomendaciones de VPN específicas para Japón.", href: "/best/vpn-japan", icon: "globe" },
      { title: "Países", description: "Censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour la Thaïlande – Voyage, Streaming et WiFi public",
    metaDescription: "Sélections indépendantes de VPN pour la Thaïlande : accès streaming stable, WiFi public plus sûr et confidentialité en voyage.",
    ogTitle: "Meilleur VPN pour la Thaïlande",
    ogDescription: "Sélections VPN basées sur les données pour voyager en Thaïlande, streaming et télétravail.",
    badge: "Page voyage Thaïlande",
    h1: "Meilleur VPN pour la Thaïlande",
    intro: "Que vous voyagiez, travailliez à distance ou regardiez du streaming en Thaïlande, votre VPN doit être rapide, fiable sur les réseaux d'hôtels et publics, et transparent sur la journalisation et la juridiction. Cette page résume nos meilleures sélections basées sur des tests indépendants.",
    streamingTitle: "Streaming",
    streamingDesc: "Accès stable à Netflix, Disney+ et aux contenus géo-restreints en déplacement.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Un kill switch robuste et un bon chiffrement sont essentiels sur les réseaux d'aéroports, de cafés et d'hôtels.",
    transparencyTitle: "Transparence",
    transparencyDesc: "Nous privilégions une politique de non-journalisation vérifiable, la clarté sur la propriété et la fréquence des retests.",
    picksTitle: "Meilleurs VPN pour la Thaïlande",
    getVpn: "Choisir",
    readReview: "Lire l'avis complet",
    researchTitle: "Comment cette page s'intègre à notre système de recherche",
    dataSource: "Source des données :",
    scoringRules: "Règles de notation :",
    methodology: "Méthodologie",
    interactiveFilters: "Filtres interactifs :",
    vpnIndex: "Tableau de bord de l'index VPN",
    relatedTitle: "Guides internes associés",
    related: [
      { title: "VPN pour voyager", description: "Comment rester connecté et protégé en se déplaçant entre les pays.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Meilleur VPN pour le streaming", description: "Comparatif axé sur la fiabilité du déblocage et la vitesse de streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN pour Netflix", description: "Tests détaillés des catalogues, cohérence 4K et comportement Smart DNS.", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN en Inde", description: "Contexte VPN et recommandations spécifiques pour l'Inde.", href: "/best/vpn-india", icon: "globe" },
      { title: "VPN au Japon", description: "Contexte VPN et recommandations spécifiques pour le Japon.", href: "/best/vpn-japan", icon: "globe" },
      { title: "Pays", description: "Censure et accès VPN pays par pays.", href: "/countries", icon: "location" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();
  const t = content[locale] || content.en;
  return {
    metadataBase: new URL(baseUrl),
    title: `${t.metaTitle} (${shortMonthYear})`,
    description: t.metaDescription,
    alternates: generateAlternates("/best/vpn-thailand", locale),
    openGraph: {
      title: `${t.ogTitle} (${shortMonthYear})`,
      description: t.ogDescription,
      type: "article",
    },
  };
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export default async function VpnThailandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const expressvpn = await getVpnBySlug("expressvpn");

  const picks = [nordvpn, surfshark, expressvpn].filter(isDefined);
  const t = content[locale] || content.en;

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-thailand" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Plane className="h-3.5 w-3.5 mr-1" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{t.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{t.intro}</p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tv className="h-4 w-4 text-primary" />
                {t.streamingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.streamingDesc}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                {t.wifiTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.wifiDesc}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                {t.transparencyTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.transparencyDesc}</CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">{t.picksTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {picks.map((vpn) => (
              <Card key={vpn.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{vpn.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Speed score: {vpn.speedScore}%</p>
                  <p>Streaming score: {vpn.streamingScore}%</p>
                  <p>Servers: {vpn.servers.toLocaleString()} across {vpn.countries} countries</p>
                  <p>From ${vpn.priceTwoYear ?? vpn.priceYearly}/mo</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} size="sm">
                      {t.getVpn} {vpn.name}
                    </AffiliateButton>
                    <Link href={`/reviews/${vpn.slug}`} className="text-primary hover:underline text-xs">
                      {t.readReview}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Go2NetworkSection locale={locale} />

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">{t.researchTitle}</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              {t.dataSource}{" "}
              <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">
                VPN Transparency &amp; Performance Index 2026
              </Link>
            </li>
            <li>
              {t.scoringRules}{" "}
              <Link href="/methodology" className="text-primary hover:underline">
                {t.methodology}
              </Link>
            </li>
            <li>
              {t.interactiveFilters}{" "}
              <Link href="/vpn-index" className="text-primary hover:underline">
                {t.vpnIndex}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-12">
        <div className="container max-w-6xl">
          <RelatedPages title={t.relatedTitle} pages={t.related} />
        </div>
      </section>
    </div>
  );
}
