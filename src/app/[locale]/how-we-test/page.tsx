import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo-utils";
import { FlaskConical, Gauge, ShieldCheck, Tv, Download, Clock3, LockKeyhole } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(baseUrl),
    title: "How We Test VPNs | ZeroToVPN",
    description:
      "A practical overview of ZeroToVPN's test workflow: baseline setup, speed and latency runs, streaming checks, kill switch tests, and score publication.",
    alternates: generateAlternates("/how-we-test", locale),
    openGraph: {
      title: "How We Test VPNs | ZeroToVPN",
      description:
        "See our repeatable test process and how metrics are translated into transparent rankings.",
      type: "article",
    },
  };
}

const framework = [
  {
    title: "Baseline run",
    body: "Each cycle starts with no-VPN measurements so VPN performance is compared to a known baseline.",
    icon: Gauge,
  },
  {
    title: "Speed and latency",
    body: "We measure regional download speed (EU/US/Asia) and latency for consistency across common use cases.",
    icon: Download,
  },
  {
    title: "Streaming reliability",
    body: "We track unlock consistency for major streaming libraries and retest after platform-side detection changes.",
    icon: Tv,
  },
  {
    title: "Safety controls",
    body: "Kill switch behavior and leak resilience are verified to reduce accidental exposure when connections drop.",
    icon: LockKeyhole,
  },
];

const scoreWeights = [
  { metric: "Speed composite", weight: "24%" },
  { metric: "Latency", weight: "10%" },
  { metric: "Logging policy", weight: "14%" },
  { metric: "Ownership clarity", weight: "8%" },
  { metric: "Jurisdiction risk", weight: "9%" },
  { metric: "Audit status", weight: "10%" },
  { metric: "Streaming unlock", weight: "11%" },
  { metric: "Torrent policy", weight: "7%" },
  { metric: "Kill switch reliability", weight: "7%" },
];

export default async function HowWeTestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: "How We Test", href: "/how-we-test" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <FlaskConical className="h-3.5 w-3.5 mr-1" />
            Testing process overview
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">How We Test VPNs</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            This page is a practical summary of our VPN testing workflow. It explains the steps we repeat every cycle
            before a score or ranking is published.
          </p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-2">
          {framework.map((item) => (
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
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Score model used in production
          </h2>
          <p className="text-muted-foreground">
            The current score model is fixed and documented publicly. Commercial terms are not part of the formula.
            For implementation details, see <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>.
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="p-3 font-semibold">Metric</th>
                  <th className="p-3 font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody>
                {scoreWeights.map((row) => (
                  <tr key={row.metric} className="border-t">
                    <td className="p-3">{row.metric}</td>
                    <td className="p-3 font-medium">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-10 border-y bg-muted/20">
        <div className="container max-w-5xl space-y-4 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />
            Re-test cadence
          </h2>
          <p>
            Providers are re-tested monthly, with additional runs after major app updates, policy changes,
            and major streaming-block shifts. Freshness is exposed through visible test dates.
          </p>
          <p>
            You can see these outputs directly in the <Link href="/vpn-index" className="text-primary hover:underline">VPN Index</Link>{" "}
            and the full <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">Transparency Report</Link>.
          </p>
        </div>
      </section>

      <section className="pb-12 pt-10">
        <div className="container max-w-6xl">
          <RelatedPages
            title="Related research pages"
            pages={[
              {
                title: "Methodology",
                description: "Full protocol and governance details.",
                href: "/methodology",
                icon: "document",
              },
              {
                title: "Transparency Report 2026",
                description: "Live matrix of tested providers and metrics.",
                href: "/reports/vpn-transparency-performance-index-2026",
                icon: "trophy",
              },
              {
                title: "VPN Index",
                description: "Interactive scorecards and filters by use case.",
                href: "/vpn-index",
                icon: "settings",
              },
              {
                title: "Editorial Policy",
                description: "How rankings stay independent from commercial pressure.",
                href: "/editorial-policy",
                icon: "shield",
              },
              {
                title: "Affiliate Disclosure",
                description: "How the business model works and where boundaries sit.",
                href: "/affiliate-disclosure",
                icon: "tag",
              },
              {
                title: "Contact",
                description: "Report data issues or suggest test additions.",
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
