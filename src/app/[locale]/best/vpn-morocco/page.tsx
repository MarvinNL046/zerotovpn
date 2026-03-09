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
  wifiTitle: string;
  wifiDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  contentTitle: string;
  contentDesc: string;
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
    metaTitle: "Best VPN for Morocco - Travel, Privacy & Public WiFi",
    metaDescription: "Independent picks for using a VPN in Morocco: safe public WiFi use, stronger privacy, and stable access while traveling.",
    ogTitle: "Best VPN for Morocco",
    ogDescription: "Data-driven VPN picks for Morocco travel, day-to-day privacy, and streaming access.",
    badge: "Morocco travel intent page",
    h1: "Best VPN for Morocco",
    intro: "For trips through Morocco, VPN quality matters on hotel and public networks. We focus on practical performance, privacy transparency, and reliable app access for travelers.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Encrypt traffic on hotel, airport, and cafe networks where interception risk is higher.",
    privacyTitle: "Privacy Standards",
    privacyDesc: "We prioritize no-logs evidence, clear ownership, and kill switch reliability.",
    contentTitle: "Content Access",
    contentDesc: "Stable international server performance for streaming and region-based services.",
    picksTitle: "Top VPN picks for Morocco",
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
      { title: "Public WiFi Safety", description: "Practical steps to secure your traffic on open networks.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Best VPN for Privacy", description: "VPNs with the strongest transparency and privacy credentials.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Best VPN for Streaming", description: "Comparison focused on streaming unlock consistency.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Cheap", description: "Value-first picks if budget matters most.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Marokko - Reizen, Privacy & Openbare WiFi",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in Marokko: veilig openbaar WiFi-gebruik, sterkere privacy en stabiele toegang onderweg.",
    ogTitle: "Beste VPN voor Marokko",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Marokko, dagelijkse privacy en streamingtoegang.",
    badge: "Marokko reisgericht",
    h1: "Beste VPN voor Marokko",
    intro: "Voor reizen door Marokko is VPN-kwaliteit belangrijk op hotel- en openbare netwerken. We richten ons op praktische prestaties, privacytransparantie en betrouwbare app-toegang voor reizigers.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Versleutel je verkeer op hotel-, luchthaven- en cafénetwerken waar het onderscheppingsrisico hoger is.",
    privacyTitle: "Privacystandaarden",
    privacyDesc: "We geven prioriteit aan no-logs bewijs, duidelijk eigenaarschap en betrouwbare kill switch-functionaliteit.",
    contentTitle: "Contenttoegang",
    contentDesc: "Stabiele internationale serverprestaties voor streaming en regiogebonden diensten.",
    picksTitle: "Beste VPN-keuzes voor Marokko",
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
      { title: "Openbare WiFi-veiligheid", description: "Praktische stappen om je verkeer te beveiligen op open netwerken.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Beste VPN voor privacy", description: "VPN's met de sterkste transparantie- en privacyreferenties.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Beste VPN voor streaming", description: "Vergelijking gericht op betrouwbaarheid van het ontgrendelen van streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste goedkope VPN", description: "Prijsbewuste keuzes als budget het belangrijkst is.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
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
    alternates: generateAlternates("/best/vpn-morocco", locale),
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

export default async function VpnMoroccoPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-morocco" }]} className="mb-8" />
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
                {t.privacyTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.privacyDesc}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tv className="h-4 w-4 text-primary" />
                {t.contentTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.contentDesc}</CardContent>
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
