import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { VpnComparisonTool } from "@/components/conversion/vpn-comparison-tool";
import { PopularComparisons } from "@/components/compare/popular-comparisons";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import type { VpnData } from "@/lib/db/vpn-service";
import {
  Check,
  X,
  Shield,
  Zap,
  Globe,
  Server,
  Monitor,
  DollarSign,
  Clock,
  Lock,
  Tv,
  Download,
  Scale,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/compare`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/compare` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/compare`;
  });

  const isEnglish = locale === "en";

  return {
    metadataBase: new URL(baseUrl),
    title: isEnglish
      ? "VPN Comparison 2026: Compare the Best VPN Services Side by Side"
      : "Compare VPNs Side by Side",
    description: isEnglish
      ? "VPN comparison 2026: Compare speed, security, price & features of NordVPN, ExpressVPN, Surfshark & more. Find the best VPN for your needs with our side-by-side tool."
      : "Compare the best VPN services side by side. See detailed comparisons of speed, security, pricing, features, and more to find the perfect VPN for your needs.",
    keywords: isEnglish
      ? [
          "vpn comparison",
          "vpn comparison 2026",
          "compare vpns",
          "best vpn 2026",
          "nordvpn vs expressvpn",
          "cheapest vpn",
          "fastest vpn",
          "vpn side by side",
        ]
      : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
// Structured Data for VPN Comparison List
function ItemListSchema({ vpns }: { vpns: VpnData[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VPN Comparison List",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((vpn, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vpn.name,
      url: `https://zerotovpn.com/reviews/${vpn.slug}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("comparePage");
  const vpns = await getAllVpns();

  return (
    <>
      <ItemListSchema vpns={vpns} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema items={[{ name: "Compare VPNs", href: "/compare" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="px-4 py-1">
              {t("badge")}
            </Badge>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Tool */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <VpnComparisonTool vpns={vpns} maxCompare={4} />
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("fullComparisonTable")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 bg-muted/50 font-semibold sticky left-0 min-w-[200px]">
                    {t("vpnProvider")}
                  </th>
                  {vpns.map((vpn) => (
                    <th
                      key={vpn.id}
                      className="p-4 bg-muted/50 text-center min-w-[180px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-lg">{vpn.name}</span>
                        <RatingStars rating={vpn.overallRating} size="sm" />
                        {vpn.editorChoice && (
                          <Badge className="bg-yellow-500 text-yellow-950 text-xs">
                            {t("editorsChoice")}
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Overall Rating */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("overallRating")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-primary">
                        {vpn.overallRating}
                      </span>
                      <span className="text-muted-foreground">/5</span>
                    </td>
                  ))}
                </tr>

                {/* Monthly Price */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {t("monthlyPrice")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">${vpn.priceMonthly}</span>
                      <span className="text-muted-foreground">{t("perMonth")}</span>
                    </td>
                  ))}
                </tr>

                {/* Best Price */}
                <tr className="border-b hover:bg-muted/30 bg-green-50/50 dark:bg-green-900/10">
                  <td className="p-4 font-medium sticky left-0 bg-green-50/50 dark:bg-green-900/10">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      {t("bestPrice")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="text-xl font-bold text-green-600">
                        ${vpn.priceTwoYear || vpn.priceYearly}
                      </span>
                      <span className="text-muted-foreground">{t("perMonth")}</span>
                    </td>
                  ))}
                </tr>

                {/* Money Back Guarantee */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {t("moneyBackGuarantee")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">{vpn.moneyBackDays}</span>{" "}
                      {t("days")}
                    </td>
                  ))}
                </tr>

                {/* Free Tier */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {t("freeTier")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.freeTier ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Servers */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-primary" />
                      {t("totalServers")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">
                        {vpn.servers.toLocaleString()}+
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Countries */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      {t("countries")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">{vpn.countries}</span>
                    </td>
                  ))}
                </tr>

                {/* Simultaneous Connections */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary" />
                      {t("simultaneousDevices")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">
                        {vpn.maxDevices >= 999 ? t("unlimited") : vpn.maxDevices}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Speed Score */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      {t("speedScore")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${vpn.speedScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">
                          {vpn.speedScore}%
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Security Score */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      {t("securityScore")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${vpn.securityScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">
                          {vpn.securityScore}%
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Streaming Score */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4 text-primary" />
                      {t("streamingScore")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${vpn.streamingScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">
                          {vpn.streamingScore}%
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Protocols */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("protocols")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {vpn.protocols.map((protocol) => (
                          <Badge
                            key={protocol}
                            variant="outline"
                            className="text-xs"
                          >
                            {protocol}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Encryption */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      {t("encryption")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <Badge variant="secondary">{vpn.encryption}</Badge>
                    </td>
                  ))}
                </tr>

                {/* Kill Switch */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("killSwitch")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.killSwitch ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* No-Logs Policy */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("noLogsPolicy")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.noLogs ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Netflix Support */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4 text-primary" />
                      {t("netflixSupport")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.netflixSupport ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Torrent Support */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-primary" />
                      {t("torrentingSupport")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.torrentSupport ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr className="bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-muted/30">
                    {t("getStarted")}
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex flex-col gap-2">
                        <AffiliateButton
                          vpnId={vpn.id}
                          vpnName={vpn.name}
                          affiliateUrl={vpn.affiliateUrl}
                          className="w-full"
                        >
                          {t("visit")} {vpn.name}
                        </AffiliateButton>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reviews/${vpn.slug}`}>{t("readReview")}</Link>
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Comparison Cards */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">{t("quickComparison")}</h2>
            <p className="text-muted-foreground">
              {t("quickComparisonSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Best Overall */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold">{t("bestOverall")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">NordVPN</span>
                <Badge className="bg-yellow-500 text-yellow-950">{t("winner")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("bestOverallDesc")}
              </p>
              <AffiliateButton
                vpnId="nordvpn"
                vpnName="NordVPN"
                affiliateUrl="https://go.zerotovpn.com/nordvpn"
                className="w-full"
              >
                Get NordVPN
              </AffiliateButton>
            </div>

            {/* Best Value */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-bold">{t("bestValue")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">Surfshark</span>
                <Badge variant="secondary">$1.99{t("perMonth")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("bestValueDesc")}
              </p>
              <AffiliateButton
                vpnId="surfshark"
                vpnName="Surfshark"
                affiliateUrl="https://go.zerotovpn.com/surfshark"
                className="w-full"
              >
                Get Surfshark
              </AffiliateButton>
            </div>

            {/* Fastest */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold">{t("fastestVpn")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ExpressVPN</span>
                <Badge variant="secondary">96% {t("speed")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("fastestVpnDesc")}
              </p>
              <AffiliateButton
                vpnId="expressvpn"
                vpnName="ExpressVPN"
                affiliateUrl="https://go.zerotovpn.com/expressvpn"
                className="w-full"
              >
                Get ExpressVPN
              </AffiliateButton>
            </div>

            {/* Best Security */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold">{t("bestSecurity")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ProtonVPN</span>
                <Badge variant="secondary">99% {t("security")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("bestSecurityDesc")}
              </p>
              <AffiliateButton
                vpnId="protonvpn"
                vpnName="ProtonVPN"
                affiliateUrl="https://go.zerotovpn.com/protonvpn"
                className="w-full"
              >
                Get ProtonVPN
              </AffiliateButton>
            </div>

            {/* Most Servers */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-purple-500" />
                <h3 className="font-bold">{t("mostServers")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">PIA</span>
                <Badge variant="secondary">35,000+</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("mostServersDesc")}
              </p>
              <AffiliateButton
                vpnId="pia"
                vpnName="Private Internet Access"
                affiliateUrl="https://go.zerotovpn.com/pia"
                className="w-full"
              >
                Get PIA
              </AffiliateButton>
            </div>

            {/* Best Free Option */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-bold">{t("bestFreeOption")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ProtonVPN</span>
                <Badge className="bg-green-500 text-white">{t("freeTierBadge")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("bestFreeDesc")}
              </p>
              <AffiliateButton
                vpnId="protonvpn"
                vpnName="ProtonVPN"
                affiliateUrl="https://go.zerotovpn.com/protonvpn"
                className="w-full"
              >
                {t("tryFree")}
              </AffiliateButton>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <PopularComparisons />

      {/* How We Compare */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("howWeCompare")}
            </h2>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {t("speedTesting")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("speedTestingDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("securityAnalysis")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("securityAnalysisDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" />
                  {t("streamingTests")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("streamingTestsDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  {t("valueAssessment")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("valueAssessmentDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema
              faqs={t.raw("faq") as Array<{ question: string; answer: string }>}
              title={t("faqSection.title")}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("needHelpDeciding")}</h2>
            <p className="text-muted-foreground">
              {t("needHelpDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/best/best-vpn">{t("viewBestVpns")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guides/what-is-vpn">{t("whatIsVpn")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
