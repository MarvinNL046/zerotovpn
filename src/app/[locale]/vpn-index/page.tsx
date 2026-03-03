import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { VpnIndexDashboard } from "@/components/vpn/vpn-index-dashboard";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { generateAlternates } from "@/lib/seo-utils";
import { getVpnIndexRows } from "@/lib/vpn-transparency-data";
import { BarChart3 } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Index 2026 | Transparency + Performance Dashboard",
    description:
      "Data dashboard with VPN scorecards, rankings, and filters for budget, privacy-first, streaming, and gaming use cases.",
    alternates: generateAlternates("/vpn-index", locale),
    openGraph: {
      title: "VPN Index 2026 | Transparency + Performance Dashboard",
      description:
        "Independent VPN rankings powered by transparent methodology and repeatable testing.",
      type: "website",
    },
  };
}

export default async function VpnIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const vpns = await getAllVpns();
  const rows = await getVpnIndexRows(vpns);

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-18 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-6xl">
          <BreadcrumbSchema items={[{ name: "VPN Index", href: "/vpn-index" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <BarChart3 className="h-3.5 w-3.5 mr-1" />
            Live index snapshot
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            VPN Index 2026
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Scorecards and rankings built on the ZeroToVPN methodology. Use filters to find
            the best fit for your use case, then open a full review for evidence and trade-offs.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-6xl">
          <VpnIndexDashboard rows={rows} />
        </div>
      </section>
    </div>
  );
}
