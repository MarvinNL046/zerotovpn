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
import { Plane, Shield, Tv, Wifi, MessageCircle } from "lucide-react";

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
  appTitle: string;
  appDesc: string;
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
    metaTitle: "Best VPN for Vietnam - Travel, Privacy & Streaming",
    metaDescription: "Independent picks for using a VPN in Vietnam: safer public WiFi, consistent app access, and stronger privacy while traveling.",
    ogTitle: "Best VPN for Vietnam",
    ogDescription: "Data-driven VPN picks for Vietnam travel, work, and streaming use cases.",
    badge: "Vietnam travel intent page",
    h1: "Best VPN for Vietnam",
    intro: "For Vietnam travel and remote work, your VPN should offer stable speeds, safe WiFi protection, and transparent privacy standards. This page summarizes practical picks based on our test data.",
    streamingTitle: "Streaming Access",
    streamingDesc: "Reliable unlock performance for common streaming libraries and travel media habits.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Encrypt traffic on airport, cafe, hotel, and coworking networks.",
    appTitle: "Everyday App Access",
    appDesc: "Stable protocols help keep messaging and calling apps available while moving between networks.",
    picksTitle: "Top VPN picks for Vietnam",
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
      { title: "VPN for Travel", description: "How to stay connected and private while moving between countries.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Vietnam country guide", description: "Country-level context for internet access and restrictions.", href: "/countries/vietnam", icon: "location" },
      { title: "Best VPN for Streaming", description: "Unlock reliability and speed comparisons.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Mobile", description: "Top VPNs for phones and tablets while traveling.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Best VPN for Thailand", description: "Neighboring travel route with detailed VPN picks.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Vietnam - Reizen, Privacy & Streaming",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in Vietnam: veiliger openbaar WiFi, consistente app-toegang en sterkere privacy onderweg.",
    ogTitle: "Beste VPN voor Vietnam",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Vietnam, werken en streaming.",
    badge: "Vietnam reisgericht",
    h1: "Beste VPN voor Vietnam",
    intro: "Voor reizen en thuiswerken in Vietnam moet je VPN stabiele snelheden, veilige WiFi-bescherming en transparante privacystandaarden bieden. Deze pagina vat praktische keuzes samen op basis van onze testgegevens.",
    streamingTitle: "Streamingtoegang",
    streamingDesc: "Betrouwbare ontgrendelingsprestaties voor veelgebruikte streamingbibliotheken en mediagewoonten onderweg.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Versleutel verkeer op luchthaven-, café-, hotel- en coworkingnetwerken.",
    appTitle: "Dagelijkse app-toegang",
    appDesc: "Stabiele protocollen houden berichten- en bel-apps beschikbaar terwijl je wisselt tussen netwerken.",
    picksTitle: "Beste VPN-keuzes voor Vietnam",
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
      { title: "Vietnam landengids", description: "Landelijke context voor internettoegang en beperkingen.", href: "/countries/vietnam", icon: "location" },
      { title: "Beste VPN voor streaming", description: "Vergelijkingen van ontgrendelingsbetrouwbaarheid en snelheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste mobiele VPN", description: "Top VPN's voor telefoons en tablets tijdens het reizen.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Beste VPN voor Thailand", description: "Aangrenzende reisroute met gedetailleerde VPN-aanbevelingen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für Vietnam – Reisen, Privatsphäre & Streaming",
    metaDescription: "Unabhängige Empfehlungen für VPNs in Vietnam: sicheres öffentliches WLAN, zuverlässiger App-Zugang und stärkere Privatsphäre unterwegs.",
    ogTitle: "Bestes VPN für Vietnam",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Vietnam-Reisen, Arbeit und Streaming.",
    badge: "Vietnam-Reiseseite",
    h1: "Bestes VPN für Vietnam",
    intro: "Für Reisen und Homeoffice in Vietnam sollte dein VPN stabile Geschwindigkeiten, sicheren WLAN-Schutz und transparente Datenschutzstandards bieten. Diese Seite fasst praktische Empfehlungen auf Basis unserer Testdaten zusammen.",
    streamingTitle: "Streaming-Zugang",
    streamingDesc: "Zuverlässige Entsperrleistung für gängige Streaming-Bibliotheken und Mediengewohnheiten unterwegs.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Verschlüssle deinen Datenverkehr in Flughafen-, Café-, Hotel- und Coworking-Netzwerken.",
    appTitle: "Alltäglicher App-Zugang",
    appDesc: "Stabile Protokolle halten Messenger- und Telefonie-Apps beim Wechsel zwischen Netzwerken verfügbar.",
    picksTitle: "Top-VPN-Empfehlungen für Vietnam",
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
      { title: "Vietnam Länderguide", description: "Länderkontext für Internetzugang und Einschränkungen.", href: "/countries/vietnam", icon: "location" },
      { title: "Bestes VPN für Streaming", description: "Vergleiche zu Entsperrzuverlässigkeit und Geschwindigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes mobiles VPN", description: "Top-VPNs für Smartphones und Tablets auf Reisen.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Bestes VPN für Thailand", description: "Benachbarte Reiseroute mit detaillierten VPN-Empfehlungen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para Vietnam – Viajes, Privacidad y Streaming",
    metaDescription: "Selección independiente de VPN para Vietnam: WiFi público más seguro, acceso estable a apps y mayor privacidad mientras viajas.",
    ogTitle: "Mejor VPN para Vietnam",
    ogDescription: "Selección de VPN basada en datos para viajes a Vietnam, trabajo y streaming.",
    badge: "Página de viaje a Vietnam",
    h1: "Mejor VPN para Vietnam",
    intro: "Para viajar y trabajar en remoto en Vietnam, tu VPN debe ofrecer velocidades estables, protección en WiFi público y estándares de privacidad transparentes. Esta página resume las mejores opciones según nuestros datos de prueba.",
    streamingTitle: "Acceso a streaming",
    streamingDesc: "Desbloqueo fiable de catálogos de streaming populares y hábitos de consumo multimedia en viajes.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Cifra tu tráfico en redes de aeropuertos, cafeterías, hoteles y coworkings.",
    appTitle: "Acceso diario a apps",
    appDesc: "Los protocolos estables mantienen disponibles las apps de mensajería y llamadas al cambiar entre redes.",
    picksTitle: "Mejores VPN para Vietnam",
    getVpn: "Obtener",
    readReview: "Leer reseña completa",
    researchTitle: "Cómo se conecta esta página con nuestro sistema de investigación",
    dataSource: "Fuente de datos:",
    scoringRules: "Reglas de puntuación:",
    methodology: "Metodología",
    interactiveFilters: "Filtros interactivos:",
    vpnIndex: "Panel del índice VPN",
    relatedTitle: "Guías internas relacionadas",
    related: [
      { title: "VPN para viajar", description: "Cómo mantenerte conectado y protegido al moverte entre países.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Guía de Vietnam", description: "Contexto a nivel de país sobre acceso a internet y restricciones.", href: "/countries/vietnam", icon: "location" },
      { title: "Mejor VPN para streaming", description: "Comparativas de fiabilidad de desbloqueo y velocidad.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN para móvil", description: "Las mejores VPN para teléfonos y tablets en viajes.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Mejor VPN para Tailandia", description: "Ruta de viaje cercana con selección detallada de VPN.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Países", description: "Contexto de censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour le Vietnam – Voyage, Confidentialité et Streaming",
    metaDescription: "Sélections indépendantes de VPN pour le Vietnam : WiFi public plus sûr, accès stable aux applications et meilleure confidentialité en voyage.",
    ogTitle: "Meilleur VPN pour le Vietnam",
    ogDescription: "Sélections VPN basées sur les données pour voyager au Vietnam, travailler et streamer.",
    badge: "Page voyage Vietnam",
    h1: "Meilleur VPN pour le Vietnam",
    intro: "Pour voyager et travailler à distance au Vietnam, votre VPN doit offrir des vitesses stables, une protection WiFi fiable et des standards de confidentialité transparents. Cette page résume les meilleures options selon nos données de test.",
    streamingTitle: "Accès au streaming",
    streamingDesc: "Déblocage fiable des catalogues de streaming populaires et habitudes médias en déplacement.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Chiffrez votre trafic sur les réseaux d'aéroports, de cafés, d'hôtels et de coworkings.",
    appTitle: "Accès quotidien aux applications",
    appDesc: "Des protocoles stables maintiennent les applications de messagerie et d'appel disponibles lors des changements de réseau.",
    picksTitle: "Meilleurs VPN pour le Vietnam",
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
      { title: "Guide du Vietnam", description: "Contexte national sur l'accès à internet et les restrictions.", href: "/countries/vietnam", icon: "location" },
      { title: "Meilleur VPN pour le streaming", description: "Comparatifs de fiabilité de déblocage et de vitesse.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN mobile", description: "Les meilleurs VPN pour téléphones et tablettes en voyage.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Meilleur VPN pour la Thaïlande", description: "Itinéraire de voyage voisin avec sélection détaillée de VPN.", href: "/best/vpn-thailand", icon: "globe" },
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
    alternates: generateAlternates("/best/vpn-vietnam", locale),
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

export default async function VpnVietnamPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-vietnam" }]} className="mb-8" />
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
                <MessageCircle className="h-4 w-4 text-primary" />
                {t.appTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.appDesc}</CardContent>
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
