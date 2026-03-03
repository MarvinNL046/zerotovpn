import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Go2NetworkSection } from "@/components/seo/go2-network-section";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { Laptop, Wifi, Plane, Shield, Video, Globe } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  return {
    metadataBase: new URL(baseUrl),
    title: `Best VPN for Digital Nomads (${shortMonthYear}) - Work, WiFi Safety & Streaming`,
    description:
      "Independent VPN picks for digital nomads: stable calls, safer public WiFi, and transparent privacy while working across countries.",
    alternates: generateAlternates("/best-vpn-for-digital-nomads", locale),
    openGraph: {
      title: `Best VPN for Digital Nomads (${shortMonthYear})`,
      description:
        "Data-driven VPN picks for nomad workflows: remote work reliability, privacy, and travel readiness.",
      type: "article",
    },
  };
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export default async function BestVpnForDigitalNomadsPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: "Best VPN for Digital Nomads", href: "/best-vpn-for-digital-nomads" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Laptop className="h-3.5 w-3.5 mr-1" />
            Nomad intent page
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Best VPN for Digital Nomads</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            If you work from cafes, coworking hubs, and short-term stays, your VPN is part of your daily operations.
            We prioritize connection stability, kill switch reliability, transparency, and practical price-to-value.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                Work Reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Stable video calls, dashboard logins, and cloud tools while switching between networks.
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
              Safer sessions on untrusted WiFi in airports, hostels, cafes, and coworking spaces.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Trust Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Clear ownership, no-logs evidence, and recurring re-test visibility.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">Top VPN picks for digital nomads</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {picks.map((vpn) => (
              <Card key={vpn.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{vpn.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Speed score: {vpn.speedScore}%</p>
                  <p>Security score: {vpn.securityScore}%</p>
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

      <section className="py-10 border-y bg-muted/20">
        <div className="container max-w-5xl space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            Country pages for nomad routes
          </h2>
          <p className="text-muted-foreground">
            For location-specific context and linking opportunities, use these pages:
          </p>
          <ul className="grid gap-2 md:grid-cols-2 text-sm">
            <li><Link href="/best/vpn-thailand" className="text-primary hover:underline">Best VPN for Thailand</Link></li>
            <li><Link href="/best/vpn-bali" className="text-primary hover:underline">Best VPN for Bali</Link></li>
            <li><Link href="/best/vpn-vietnam" className="text-primary hover:underline">Best VPN for Vietnam</Link></li>
            <li><Link href="/best/vpn-usa" className="text-primary hover:underline">Best VPN for USA</Link></li>
            <li><Link href="/best/vpn-japan" className="text-primary hover:underline">Best VPN for Japan</Link></li>
            <li><Link href="/best/vpn-india" className="text-primary hover:underline">Best VPN for India</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
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
                description: "How to use VPNs safely and predictably while moving between countries.",
                href: "/guides/vpn-for-travel",
                icon: "map",
              },
              {
                title: "Public WiFi Safety",
                description: "Practical security checklist for shared networks.",
                href: "/guides/public-wifi-safety",
                icon: "wifi",
              },
              {
                title: "Best VPN for Streaming",
                description: "Streaming-first comparison with unlock reliability focus.",
                href: "/best/vpn-streaming",
                icon: "tv",
              },
              {
                title: "Best VPN for Privacy",
                description: "No-logs evidence, jurisdiction context, and audit posture.",
                href: "/best/vpn-privacy",
                icon: "shield",
              },
              {
                title: "Best VPN for Digital Nomads (Bali)",
                description: "Location-specific nomad page for Bali workflows.",
                href: "/best/vpn-bali",
                icon: "globe",
              },
              {
                title: "Countries",
                description: "Country-level censorship and access context.",
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
