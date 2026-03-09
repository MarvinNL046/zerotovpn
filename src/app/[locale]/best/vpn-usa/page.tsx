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
import { Plane, Shield, Tv, Wifi, Globe } from "lucide-react";

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
  privacyTitle: string;
  privacyDesc: string;
  streamingTitle: string;
  streamingDesc: string;
  wifiTitle: string;
  wifiDesc: string;
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
    metaTitle: "Best VPN for USA - Privacy, Streaming & Travel",
    metaDescription: "Independent picks for using a VPN in the United States: privacy on public networks, stable speeds, and reliable access while traveling.",
    ogTitle: "Best VPN for USA",
    ogDescription: "Data-driven VPN picks for US travel, privacy, and streaming use cases.",
    badge: "USA travel intent page",
    h1: "Best VPN for USA",
    intro: "Whether you are in the US or traveling abroad with a need for US services, your VPN should be transparent, fast, and stable for day-to-day work, streaming, and public network security.",
    privacyTitle: "Privacy Layer",
    privacyDesc: "Keep traffic encrypted on open networks and add protection against passive tracking.",
    streamingTitle: "US Streaming Access",
    streamingDesc: "Reliable access to US libraries and stable playback performance across devices.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Essential for airport, hotel, and coworking WiFi during domestic and international travel.",
    picksTitle: "Top VPN picks for USA",
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
      { title: "Best VPN for Streaming", description: "Comparison focused on Netflix, Disney+, and streaming reliability.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Netflix", description: "Detailed tests for library unlocks and playback consistency.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Best VPN for Privacy", description: "VPNs with clear ownership and stronger no-logs evidence.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Public WiFi Safety", description: "How to stay safer on open WiFi networks.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN for Travel", description: "How to use VPNs while moving across countries and networks.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor de VS - Privacy, Streaming & Reizen",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in de Verenigde Staten: privacy op openbare netwerken, stabiele snelheden en betrouwbare toegang onderweg.",
    ogTitle: "Beste VPN voor de VS",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar de VS, privacy en streaming.",
    badge: "VS reisgericht",
    h1: "Beste VPN voor de VS",
    intro: "Of je nu in de VS bent of in het buitenland reist met behoefte aan Amerikaanse diensten, je VPN moet transparant, snel en stabiel zijn voor dagelijks werk, streaming en beveiliging op openbare netwerken.",
    privacyTitle: "Privacylaag",
    privacyDesc: "Houd verkeer versleuteld op open netwerken en voeg bescherming toe tegen passieve tracking.",
    streamingTitle: "Amerikaanse streamingtoegang",
    streamingDesc: "Betrouwbare toegang tot Amerikaanse bibliotheken en stabiele afspeelprestaties op alle apparaten.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Essentieel voor luchthaven-, hotel- en coworking-WiFi tijdens binnenlandse en internationale reizen.",
    picksTitle: "Beste VPN-keuzes voor de VS",
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
      { title: "Beste VPN voor streaming", description: "Vergelijking gericht op Netflix, Disney+ en streamingbetrouwbaarheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste VPN voor Netflix", description: "Gedetailleerde tests voor het ontgrendelen van bibliotheken en afspeelconsistentie.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Beste VPN voor privacy", description: "VPN's met duidelijk eigenaarschap en sterker no-logsbewijs.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Openbare WiFi-veiligheid", description: "Hoe je veiliger blijft op open WiFi-netwerken.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN voor op reis", description: "Hoe je VPN's gebruikt tijdens reizen tussen landen en netwerken.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für die USA – Privatsphäre, Streaming & Reisen",
    metaDescription: "Unabhängige Empfehlungen für VPNs in den USA: Privatsphäre in öffentlichen Netzwerken, stabile Geschwindigkeiten und zuverlässiger Zugang unterwegs.",
    ogTitle: "Bestes VPN für die USA",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Reisen in die USA, Privatsphäre und Streaming.",
    badge: "USA-Reiseseite",
    h1: "Bestes VPN für die USA",
    intro: "Ob du in den USA bist oder im Ausland reist und US-Dienste brauchst – dein VPN sollte transparent, schnell und stabil sein für Arbeit, Streaming und Sicherheit in öffentlichen Netzwerken.",
    privacyTitle: "Privatsphäre-Schutz",
    privacyDesc: "Halte deinen Datenverkehr in offenen Netzwerken verschlüsselt und schütze dich vor passivem Tracking.",
    streamingTitle: "US-Streaming-Zugang",
    streamingDesc: "Zuverlässiger Zugriff auf US-Bibliotheken und stabile Wiedergabe auf allen Geräten.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Unverzichtbar für Flughafen-, Hotel- und Coworking-WLAN auf Inlands- und Auslandsreisen.",
    picksTitle: "Top-VPN-Empfehlungen für die USA",
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
      { title: "Bestes VPN für Streaming", description: "Vergleich mit Fokus auf Netflix, Disney+ und Streaming-Zuverlässigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes VPN für Netflix", description: "Detaillierte Tests zum Entsperren von Bibliotheken und Wiedergabekonsistenz.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Bestes VPN für Privatsphäre", description: "VPNs mit klaren Eigentumsverhältnissen und stärkeren No-Logs-Nachweisen.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Öffentliches WLAN absichern", description: "So bleibst du in offenen WLAN-Netzwerken sicherer.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN für Reisen", description: "So nutzt du VPNs beim Wechsel zwischen Ländern und Netzwerken.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para EE. UU. – Privacidad, Streaming y Viajes",
    metaDescription: "Selección independiente de VPN para Estados Unidos: privacidad en redes públicas, velocidades estables y acceso fiable mientras viajas.",
    ogTitle: "Mejor VPN para EE. UU.",
    ogDescription: "Selección de VPN basada en datos para viajes a EE. UU., privacidad y streaming.",
    badge: "Página de viaje a EE. UU.",
    h1: "Mejor VPN para EE. UU.",
    intro: "Ya sea que estés en Estados Unidos o viajando al extranjero y necesites acceder a servicios estadounidenses, tu VPN debe ser transparente, rápida y estable para el trabajo diario, el streaming y la seguridad en redes públicas.",
    privacyTitle: "Capa de privacidad",
    privacyDesc: "Mantén tu tráfico cifrado en redes abiertas y añade protección contra el rastreo pasivo.",
    streamingTitle: "Acceso a streaming de EE. UU.",
    streamingDesc: "Acceso fiable a catálogos estadounidenses y reproducción estable en todos los dispositivos.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Imprescindible para WiFi de aeropuertos, hoteles y coworkings en viajes nacionales e internacionales.",
    picksTitle: "Mejores VPN para EE. UU.",
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
      { title: "Mejor VPN para streaming", description: "Comparativa centrada en Netflix, Disney+ y fiabilidad de streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN para Netflix", description: "Pruebas detalladas de desbloqueo de catálogos y consistencia de reproducción.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Mejor VPN para privacidad", description: "VPN con titularidad clara y mayor evidencia de no registros.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Seguridad en WiFi público", description: "Cómo mantenerte más seguro en redes WiFi abiertas.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN para viajar", description: "Cómo usar VPN al desplazarte entre países y redes.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Países", description: "Contexto de censura y acceso VPN país por país.", href: "/countries", icon: "location" },
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
    alternates: generateAlternates("/best/vpn-usa", locale),
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

export default async function VpnUsaPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-usa" }]} className="mb-8" />
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
                <Shield className="h-4 w-4 text-primary" />
                {t.privacyTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.privacyDesc}</CardContent>
          </Card>
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
            <Globe className="h-5 w-5 text-primary" />
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
