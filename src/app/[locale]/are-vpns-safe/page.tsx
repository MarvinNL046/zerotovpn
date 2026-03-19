import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Link } from "@/i18n/navigation";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { ShieldCheck, TriangleAlert, CheckCircle2, Lock, Eye, FileWarning } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  return {
    metadataBase: new URL(baseUrl),
    title: `Are VPNs Safe? (${shortMonthYear}) - What to Trust and What to Avoid`,
    description:
      "Are VPNs safe in practice? Learn the real risk model, red flags to avoid, and how to choose a trustworthy VPN provider.",
    alternates: generateAlternates("/are-vpns-safe", locale),
    openGraph: {
      title: `Are VPNs Safe? (${shortMonthYear})`,
      description:
        "A practical safety guide: provider risk, no-log evidence, and the checklist before you buy.",
      type: "article",
    },
  };
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export default async function AreVpnsSafePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const protonvpn = await getVpnBySlug("protonvpn");
  const picks = [nordvpn, surfshark, protonvpn].filter(isDefined);

  const safeSignals = [
    "Public no-logs policy with plain wording",
    "Recent third-party audit",
    "Clear ownership and legal entity",
    "Reliable kill switch and leak protection",
    "Transparent pricing and refund terms",
  ];

  const redFlags = [
    "No company identity or ownership listed",
    "Overpromising absolute anonymity",
    "No independent audits despite strong claims",
    "Free VPN monetized by ad injection or data resale",
    "Misleading " + '"' + "no logs" + '"' + " language with hidden retention",
  ];

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: "Are VPNs Safe", href: "/are-vpns-safe" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Security explainer
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Are VPNs Safe?</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Short answer: reputable VPNs are generally safe, but provider quality varies a lot.
            Safety depends on who runs the service, what they log, and whether their claims are auditable.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Signals of a safer VPN
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="space-y-2 list-disc pl-5">
                {safeSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TriangleAlert className="h-4 w-4 text-orange-600" />
                Red flags to avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="space-y-2 list-disc pl-5">
                {redFlags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">Trusted picks to start with</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {picks.map((vpn) => (
              <Card key={vpn.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{vpn.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Security score: {vpn.securityScore}%</p>
                  <p>No-logs policy: {vpn.noLogs ? "Yes" : "No"}</p>
                  <p>Kill switch: {vpn.killSwitch ? "Yes" : "No"}</p>
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

      <section className="py-10 border-y bg-muted/20">
        <div className="container max-w-5xl space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">How to evaluate safety before buying</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Read policies critically
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Look for precise wording about retained data, not broad privacy slogans.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Check technical controls
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Verify kill switch behavior, DNS leak resilience, and protocol support.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileWarning className="h-4 w-4 text-primary" />
                  Verify with independent sources
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cross-check audits and ownership details before treating any claim as trustworthy.
              </CardContent>
            </Card>
          </div>
          <p>
            For detailed scoring criteria see <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>,
            and for current ranking evidence see <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">the transparency report</Link>.
          </p>
        </div>
      </section>

      <section className="pb-12 pt-10">
        <div className="container max-w-6xl">
          <RelatedPages
            title="Related safety and privacy resources"
            pages={[
              {
                title: "What Is a VPN",
                description: "Core VPN concepts in plain language.",
                href: "/what-is-a-vpn",
                icon: "document",
              },
              {
                title: "VPN Privacy Guide",
                description: "No-logs, jurisdiction, and audit context.",
                href: "/guides/vpn-privacy-guide",
                icon: "shield",
              },
              {
                title: "Best No-Log VPN",
                description: "No-log shortlist with transparent criteria.",
                href: "/best-no-log-vpn",
                icon: "lock",
              },
              {
                title: "Methodology",
                description: "How tests are executed and scored.",
                href: "/methodology",
                icon: "settings",
              },
              {
                title: "Affiliate Disclosure",
                description: "Commercial model and editorial boundaries.",
                href: "/affiliate-disclosure",
                icon: "tag",
              },
              {
                title: "Best VPN for Privacy",
                description: "Privacy-oriented picks for daily use.",
                href: "/best/vpn-privacy",
                icon: "shield",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
