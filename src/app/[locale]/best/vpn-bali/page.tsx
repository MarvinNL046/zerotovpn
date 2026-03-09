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
import { Plane, Shield, Tv, Wifi, Laptop } from "lucide-react";

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
  remoteTitle: string;
  remoteDesc: string;
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
    metaTitle: "Best VPN for Bali - Remote Work, Streaming & Public WiFi",
    metaDescription: "Independent picks for using a VPN in Bali: safer public WiFi, stable streaming access, and privacy while traveling or working remotely.",
    ogTitle: "Best VPN for Bali",
    ogDescription: "Data-driven VPN picks for Bali travel, digital nomads, streaming, and privacy.",
    badge: "Bali travel intent page",
    h1: "Best VPN for Bali",
    intro: "Bali is a hotspot for travelers and digital nomads. Your VPN should stay stable on cafe and villa WiFi, protect sensitive logins, and reliably unlock your usual apps and streaming libraries.",
    streamingTitle: "Streaming Access",
    streamingDesc: "Keep access to Netflix, Disney+, and region-locked content while on the move.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Reduce risk on airport, coworking, cafe, and hotel networks across Bali.",
    remoteTitle: "Remote Work Reliability",
    remoteDesc: "Reliable protocols and kill switch behavior matter for calls, admin panels, and client systems.",
    picksTitle: "Top VPN picks for Bali",
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
      { title: "VPN for Travel", description: "Practical setup for staying private while moving between countries.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Best VPN for Indonesia", description: "Country context and tested picks for Indonesia.", href: "/best/vpn-indonesia", icon: "globe" },
      { title: "Best VPN for Thailand", description: "Neighboring travel-intent VPN page with tested picks.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Best VPN for Streaming", description: "Comparisons focused on unblocking reliability and speed.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best Mobile VPN", description: "VPN choices optimized for phones and tablets.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Bali - Thuiswerken, Streaming & Openbare WiFi",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN op Bali: veiliger openbaar WiFi, stabiele streaming en privacy onderweg of tijdens het werken.",
    ogTitle: "Beste VPN voor Bali",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Bali, digitale nomaden, streaming en privacy.",
    badge: "Bali reisgericht",
    h1: "Beste VPN voor Bali",
    intro: "Bali is een populaire bestemming voor reizigers en digitale nomaden. Je VPN moet stabiel blijven op café- en villa-WiFi, gevoelige inloggegevens beschermen en betrouwbaar je gebruikelijke apps en streamingdiensten ontgrendelen.",
    streamingTitle: "Streamingtoegang",
    streamingDesc: "Behoud toegang tot Netflix, Disney+ en regioversleutelde content terwijl je onderweg bent.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Verminder risico's op luchthaven-, coworking-, café- en hotelnetwerken op Bali.",
    remoteTitle: "Betrouwbaarheid voor thuiswerken",
    remoteDesc: "Betrouwbare protocollen en kill switch-functionaliteit zijn belangrijk voor videobellen, adminpanelen en klantsystemen.",
    picksTitle: "Beste VPN-keuzes voor Bali",
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
      { title: "VPN voor op reis", description: "Praktische instellingen om je privacy te bewaren tijdens reizen.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Beste VPN voor Indonesië", description: "Landcontext en geteste aanbevelingen voor Indonesië.", href: "/best/vpn-indonesia", icon: "globe" },
      { title: "Beste VPN voor Thailand", description: "Reisgericht VPN-overzicht met geteste aanbevelingen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Beste VPN voor streaming", description: "Vergelijkingen gericht op ontgrendelingsbetrouwbaarheid en snelheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste mobiele VPN", description: "VPN-keuzes geoptimaliseerd voor telefoons en tablets.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für Bali – Homeoffice, Streaming & öffentliches WLAN",
    metaDescription: "Unabhängige Empfehlungen für VPNs auf Bali: sicheres öffentliches WLAN, stabiler Streaming-Zugang und Privatsphäre unterwegs oder im Homeoffice.",
    ogTitle: "Bestes VPN für Bali",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Bali-Reisen, digitale Nomaden, Streaming und Privatsphäre.",
    badge: "Bali-Reiseseite",
    h1: "Bestes VPN für Bali",
    intro: "Bali ist ein Hotspot für Reisende und digitale Nomaden. Dein VPN sollte im Café- und Villa-WLAN stabil bleiben, sensible Zugangsdaten schützen und zuverlässig deine gewohnten Apps und Streaming-Bibliotheken entsperren.",
    streamingTitle: "Streaming-Zugang",
    streamingDesc: "Behalte Zugriff auf Netflix, Disney+ und regionengesperrte Inhalte, auch unterwegs.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Reduziere Risiken in Flughafen-, Coworking-, Café- und Hotelnetzwerken auf Bali.",
    remoteTitle: "Zuverlässigkeit fürs Homeoffice",
    remoteDesc: "Zuverlässige Protokolle und Kill-Switch-Funktionen sind wichtig für Videoanrufe, Admin-Panels und Kundensysteme.",
    picksTitle: "Top-VPN-Empfehlungen für Bali",
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
      { title: "VPN für Reisen", description: "Praktische Einrichtung, um unterwegs privat zu bleiben.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Bestes VPN für Indonesien", description: "Länderkontext und getestete Empfehlungen für Indonesien.", href: "/best/vpn-indonesia", icon: "globe" },
      { title: "Bestes VPN für Thailand", description: "Reisebezogene VPN-Seite mit getesteten Empfehlungen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Bestes VPN für Streaming", description: "Vergleiche mit Fokus auf Entsperrzuverlässigkeit und Geschwindigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes mobiles VPN", description: "VPN-Optionen, optimiert für Smartphones und Tablets.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para Bali - Teletrabajo, Streaming y WiFi Público",
    metaDescription: "Selecciones independientes de VPN para Bali: WiFi público más seguro, acceso estable a streaming y privacidad al viajar o trabajar en remoto.",
    ogTitle: "Mejor VPN para Bali",
    ogDescription: "Selecciones de VPN basadas en datos para viajar a Bali, nómadas digitales, streaming y privacidad.",
    badge: "Página de viajes a Bali",
    h1: "Mejor VPN para Bali",
    intro: "Bali es un destino popular para viajeros y nómadas digitales. Tu VPN debe mantenerse estable en el WiFi de cafeterías y villas, proteger los datos de acceso sensibles y desbloquear de forma fiable tus apps y bibliotecas de streaming habituales.",
    streamingTitle: "Acceso a streaming",
    streamingDesc: "Mantén acceso a Netflix, Disney+ y contenido con restricción geográfica mientras viajas.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Reduce el riesgo en redes de aeropuertos, coworkings, cafeterías y hoteles en Bali.",
    remoteTitle: "Fiabilidad para el teletrabajo",
    remoteDesc: "Protocolos fiables y la función kill switch son fundamentales para videollamadas, paneles de administración y sistemas de clientes.",
    picksTitle: "Mejores VPN para Bali",
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
      { title: "VPN para viajar", description: "Configuración práctica para mantener la privacidad al moverte entre países.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Mejor VPN para Indonesia", description: "Contexto del país y selecciones probadas para Indonesia.", href: "/best/vpn-indonesia", icon: "globe" },
      { title: "Mejor VPN para Tailandia", description: "Página de VPN para viajeros con selecciones probadas.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Mejor VPN para streaming", description: "Comparativas centradas en fiabilidad de desbloqueo y velocidad.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN móvil", description: "Opciones de VPN optimizadas para teléfonos y tablets.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Países", description: "Censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour Bali – Télétravail, Streaming et WiFi public",
    metaDescription: "Sélections indépendantes de VPN pour Bali : WiFi public plus sûr, accès streaming stable et confidentialité en voyage ou en télétravail.",
    ogTitle: "Meilleur VPN pour Bali",
    ogDescription: "Sélections VPN basées sur les données pour voyager à Bali, nomades numériques, streaming et confidentialité.",
    badge: "Page voyage Bali",
    h1: "Meilleur VPN pour Bali",
    intro: "Bali est une destination prisée des voyageurs et des nomades numériques. Votre VPN doit rester stable sur le WiFi des cafés et des villas, protéger vos identifiants sensibles et débloquer de manière fiable vos applications et bibliothèques de streaming habituelles.",
    streamingTitle: "Accès au streaming",
    streamingDesc: "Conservez l'accès à Netflix, Disney+ et aux contenus géo-restreints lors de vos déplacements.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Réduisez les risques sur les réseaux d'aéroports, de coworkings, de cafés et d'hôtels à Bali.",
    remoteTitle: "Fiabilité pour le télétravail",
    remoteDesc: "Des protocoles fiables et un kill switch performant sont essentiels pour les appels vidéo, les panneaux d'administration et les systèmes clients.",
    picksTitle: "Meilleurs VPN pour Bali",
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
      { title: "VPN pour voyager", description: "Configuration pratique pour préserver votre confidentialité en déplacement.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Meilleur VPN pour l'Indonésie", description: "Contexte national et sélections testées pour l'Indonésie.", href: "/best/vpn-indonesia", icon: "globe" },
      { title: "Meilleur VPN pour la Thaïlande", description: "Page VPN voyage avec sélections testées.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Meilleur VPN pour le streaming", description: "Comparatifs axés sur la fiabilité du déblocage et la vitesse.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN mobile", description: "Options VPN optimisées pour smartphones et tablettes.", href: "/best/vpn-mobile", icon: "smartphone" },
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
    alternates: generateAlternates("/best/vpn-bali", locale),
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

export default async function VpnBaliPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-bali" }]} className="mb-8" />
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
                <Laptop className="h-4 w-4 text-primary" />
                {t.remoteTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.remoteDesc}</CardContent>
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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {t.researchTitle}
          </h2>
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
