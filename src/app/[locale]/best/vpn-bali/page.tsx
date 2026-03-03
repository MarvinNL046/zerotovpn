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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();
  return {
    metadataBase: new URL(baseUrl),
    title: `Best VPN for Bali (${shortMonthYear}) - Remote Work, Streaming & Public WiFi`,
    description:
      "Independent picks for using a VPN in Bali: safer public WiFi, stable streaming access, and privacy while traveling or working remotely.",
    alternates: generateAlternates("/best/vpn-bali", locale),
    openGraph: {
      title: `Best VPN for Bali (${shortMonthYear})`,
      description:
        "Data-driven VPN picks for Bali travel, digital nomads, streaming, and privacy.",
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

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: "Best VPN for Bali", href: "/best/vpn-bali" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Plane className="h-3.5 w-3.5 mr-1" />
            Bali travel intent page
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Best VPN for Bali</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Bali is a hotspot for travelers and digital nomads. Your VPN should stay stable on cafe and villa
            WiFi, protect sensitive logins, and reliably unlock your usual apps and streaming libraries.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tv className="h-4 w-4 text-primary" />
                Streaming Access
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Keep access to Netflix, Disney+, and region-locked content while on the move.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                Public WiFi Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reduce risk on airport, coworking, cafe, and hotel networks across Bali.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Laptop className="h-4 w-4 text-primary" />
                Remote Work Reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reliable protocols and kill switch behavior matter for calls, admin panels, and client systems.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">Top VPN picks for Bali</h2>
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
                      Get {vpn.name}
                    </AffiliateButton>
                    <Link href={`/reviews/${vpn.slug}`} className="text-primary hover:underline text-xs">
                      Read full review
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
            How this page connects to our research stack
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              Data source:{" "}
              <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">
                VPN Transparency &amp; Performance Index 2026
              </Link>
            </li>
            <li>
              Scoring rules:{" "}
              <Link href="/methodology" className="text-primary hover:underline">
                Methodology
              </Link>
            </li>
            <li>
              Interactive filters:{" "}
              <Link href="/vpn-index" className="text-primary hover:underline">
                VPN Index dashboard
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-12">
        <div className="container max-w-6xl">
          <RelatedPages
            title="Related internal guides"
            pages={[
              {
                title: "VPN for Travel",
                description: "Practical setup for staying private while moving between countries.",
                href: "/guides/vpn-for-travel",
                icon: "map",
              },
              {
                title: "Best VPN for Indonesia",
                description: "Country context and tested picks for Indonesia.",
                href: "/best/vpn-indonesia",
                icon: "globe",
              },
              {
                title: "Best VPN for Thailand",
                description: "Neighboring travel-intent VPN page with tested picks.",
                href: "/best/vpn-thailand",
                icon: "globe",
              },
              {
                title: "Best VPN for Streaming",
                description: "Comparisons focused on unblocking reliability and speed.",
                href: "/best/vpn-streaming",
                icon: "tv",
              },
              {
                title: "Best Mobile VPN",
                description: "VPN choices optimized for phones and tablets.",
                href: "/best/vpn-mobile",
                icon: "smartphone",
              },
              {
                title: "Countries",
                description: "Country-by-country censorship and VPN access context.",
                href: "/countries",
                icon: "location",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
