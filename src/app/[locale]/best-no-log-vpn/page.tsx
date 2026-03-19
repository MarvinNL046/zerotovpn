import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { getVpnIndexRows, type LoggingPolicyGrade, type AuditStatus } from "@/lib/vpn-transparency-data";
import { Shield, FileCheck, Lock, Building2 } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  return {
    metadataBase: new URL(baseUrl),
    title: `Best No-Log VPN (${shortMonthYear}) - Audited Privacy Picks`,
    description:
      "Data-backed no-log VPN picks with ownership, jurisdiction, audit status, and last-tested visibility.",
    alternates: generateAlternates("/best-no-log-vpn", locale),
    openGraph: {
      title: `Best No-Log VPN (${shortMonthYear})`,
      description:
        "Independent no-log VPN ranking focused on verified transparency signals.",
      type: "article",
    },
  };
}

function formatLoggingPolicy(policy: LoggingPolicyGrade): string {
  if (policy === "strict-no-logs") return "Strict no-logs";
  if (policy === "minimal-operational-logs") return "Minimal operational logs";
  return "Unclear";
}

function formatAuditStatus(status: AuditStatus): string {
  if (status === "recent-audit") return "Recent audit";
  if (status === "older-audit") return "Older audit";
  return "No public audit";
}

export default async function BestNoLogVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const targetSlugs = ["mullvad", "protonvpn", "nordvpn", "expressvpn", "surfshark"];
  const allVpns = await getAllVpns();
  const rows = await getVpnIndexRows(allVpns);

  const selectedRows = rows
    .filter((row) => targetSlugs.includes(row.slug))
    .sort((a, b) => b.transparencyScore - a.transparencyScore);

  const vpnBySlug = new Map(allVpns.map((vpn) => [vpn.slug, vpn]));

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-6xl">
          <BreadcrumbSchema items={[{ name: "Best No-Log VPN", href: "/best-no-log-vpn" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Lock className="h-3.5 w-3.5 mr-1" />
            Privacy intent page
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Best No-Log VPN</h1>
          <p className="text-lg text-muted-foreground max-w-4xl">
            A no-log claim is not enough on its own. We rank this list using independently testable signals:
            logging posture, audit status, ownership clarity, jurisdiction risk, and technical reliability.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-6xl grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                Audit posture
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Public, recent audits are weighted higher than outdated or missing audit evidence.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Ownership and jurisdiction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We prioritize providers with clearer legal structure and lower jurisdictional pressure.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Operational reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Kill switch reliability and leakage risk still matter for privacy in real-world usage.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-6xl space-y-6">
          <h2 className="text-2xl font-bold">Top no-log VPN picks</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {selectedRows.map((row, index) => {
              const vpn = vpnBySlug.get(row.slug);
              if (!vpn) return null;

              return (
                <Card key={row.slug}>
                  <CardHeader>
                    <CardTitle className="text-lg">#{index + 1} {row.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Transparency score: {row.transparencyScore}</p>
                    <p>Logging: {formatLoggingPolicy(row.loggingPolicy)}</p>
                    <p>Audit: {formatAuditStatus(row.auditStatus)}</p>
                    <p>Jurisdiction: {row.jurisdiction}</p>
                    <p>Last tested: {row.lastTested}</p>
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 border-y bg-muted/20">
        <div className="container max-w-6xl space-y-4">
          <h2 className="text-2xl font-bold">No-log transparency matrix</h2>
          <div className="overflow-x-auto border rounded-xl bg-background">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="p-3 font-semibold">VPN</th>
                  <th className="p-3 font-semibold">Logging</th>
                  <th className="p-3 font-semibold">Audit</th>
                  <th className="p-3 font-semibold">Owner</th>
                  <th className="p-3 font-semibold">Jurisdiction</th>
                  <th className="p-3 font-semibold">Risk</th>
                  <th className="p-3 font-semibold">Last tested</th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row) => (
                  <tr key={row.slug} className="border-t">
                    <td className="p-3">
                      <Link href={`/reviews/${row.slug}`} className="text-primary hover:underline">
                        {row.name}
                      </Link>
                    </td>
                    <td className="p-3">{formatLoggingPolicy(row.loggingPolicy)}</td>
                    <td className="p-3">{formatAuditStatus(row.auditStatus)}</td>
                    <td className="p-3">{row.owner}</td>
                    <td className="p-3">{row.jurisdiction}</td>
                    <td className="p-3 capitalize">{row.jurisdictionRisk}</td>
                    <td className="p-3">{row.lastTested}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Full scoring logic: <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>. Full dataset:
            <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline"> transparency report</Link>.
          </p>
        </div>
      </section>

      <section className="pb-12 pt-10">
        <div className="container max-w-6xl">
          <RelatedPages
            title="Related internal guides"
            pages={[
              {
                title: "Best VPN for Privacy",
                description: "Broader privacy-focused comparison and jurisdiction context.",
                href: "/best/vpn-privacy",
                icon: "shield",
              },
              {
                title: "VPN Privacy Guide",
                description: "How to evaluate no-log claims and legal risk in practice.",
                href: "/guides/vpn-privacy-guide",
                icon: "document",
              },
              {
                title: "Methodology",
                description: "Score model and test process behind this ranking.",
                href: "/methodology",
                icon: "settings",
              },
              {
                title: "Transparency Report 2026",
                description: "Full matrix with ranked providers and latest snapshots.",
                href: "/reports/vpn-transparency-performance-index-2026",
                icon: "trophy",
              },
              {
                title: "Affiliate Disclosure",
                description: "How monetization is separated from editorial decisions.",
                href: "/affiliate-disclosure",
                icon: "tag",
              },
              {
                title: "VPN Index",
                description: "Interactive filters for privacy-first and budget use cases.",
                href: "/vpn-index",
                icon: "globe",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
