import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo-utils";
import { Scale, FileCheck, Shield, RefreshCw, CircleAlert, HandCoins } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(baseUrl),
    title: "Editorial Policy | ZeroToVPN",
    description:
      "How ZeroToVPN protects editorial independence: scoring rules, testing standards, corrections policy, and affiliate separation.",
    alternates: generateAlternates("/editorial-policy", locale),
    openGraph: {
      title: "Editorial Policy | ZeroToVPN",
      description:
        "Our editorial policy explains exactly how rankings are created and protected from commercial influence.",
      type: "article",
    },
  };
}

export default async function EditorialPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const principles = [
    {
      title: "Measurable over marketing",
      body: "We rank VPNs on published criteria: speed, latency, logging policy, ownership, jurisdiction, streaming reliability, torrent policy, and kill switch behavior.",
      icon: FileCheck,
    },
    {
      title: "Editorial independence",
      body: "Commercial relationships never set rankings. Research and scoring are finalized before affiliate placement decisions.",
      icon: Scale,
    },
    {
      title: "Reader safety first",
      body: "We prefer providers with clearer ownership, stronger no-logs evidence, and transparent legal posture.",
      icon: Shield,
    },
    {
      title: "Visible freshness",
      body: "Review pages and report assets carry visible test timestamps to show data recency.",
      icon: RefreshCw,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: "Editorial Policy", href: "/editorial-policy" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Scale className="h-3.5 w-3.5 mr-1" />
            Trust & quality standards
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Editorial Policy</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            This policy explains how ZeroToVPN produces rankings and reviews. The goal is simple:
            measurable output, explainable scoring, repeatable testing, and transparent business boundaries.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-2">
          {principles.map((item) => (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">How rankings are governed</h2>
          <p>
            Our core ranking logic is documented publicly in <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>.
            The report surface that readers use for comparison is the <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">Transparency &amp; Performance Index</Link>.
          </p>
          <p>
            We do not promise that a VPN is "perfect". We publish trade-offs and context so readers can choose by use case.
          </p>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm">
              Editorial team members can reject sponsored requests, rating pressure, and product claims that are not supported by test evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 border-y bg-muted/20">
        <div className="container max-w-5xl space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <HandCoins className="h-5 w-5 text-primary" />
            Commercial boundaries
          </h2>
          <p>
            ZeroToVPN may earn affiliate commissions, but this does not alter rankings or test outcomes.
            Full details are available on <Link href="/affiliate-disclosure" className="text-primary hover:underline">/affiliate-disclosure</Link>.
          </p>
          <ul className="space-y-2 list-disc pl-6">
            <li>Commission rate is not a ranking variable.</li>
            <li>Affiliate status does not grant guaranteed placement.</li>
            <li>Negative findings are published even for partners.</li>
          </ul>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CircleAlert className="h-5 w-5 text-primary" />
            Corrections and updates
          </h2>
          <p>
            If a factual error is reported and verified, we update the page and refresh the relevant test entry.
            Major corrections are reflected in updated timestamps on affected pages.
          </p>
          <p>
            Report an issue via <Link href="/contact" className="text-primary hover:underline">/contact</Link> and include the URL,
            claim, and source evidence.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container max-w-6xl">
          <RelatedPages
            title="Related policy and research pages"
            pages={[
              {
                title: "Methodology",
                description: "Full scoring logic, baseline setup, and re-test cadence.",
                href: "/methodology",
                icon: "document",
              },
              {
                title: "Affiliate Disclosure",
                description: "How affiliate monetization works and what it does not influence.",
                href: "/affiliate-disclosure",
                icon: "tag",
              },
              {
                title: "Transparency Report 2026",
                description: "The main index report used as central research asset.",
                href: "/reports/vpn-transparency-performance-index-2026",
                icon: "trophy",
              },
              {
                title: "VPN Index",
                description: "Interactive filtering by use case and score profile.",
                href: "/vpn-index",
                icon: "settings",
              },
              {
                title: "About ZeroToVPN",
                description: "Team context and mission behind the project.",
                href: "/about",
                icon: "users",
              },
              {
                title: "Contact",
                description: "Report data issues or request a correction.",
                href: "/contact",
                icon: "help",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
