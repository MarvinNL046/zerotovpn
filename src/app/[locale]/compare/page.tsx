import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { VpnComparisonTool } from "@/components/conversion/vpn-comparison-tool";
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Compare VPNs Side by Side - ZeroToVPN",
    description:
      "Compare the best VPN services side by side. See detailed comparisons of speed, security, pricing, features, and more to find the perfect VPN for your needs.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const vpns = await getAllVpns();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="px-4 py-1">
              Updated November 2025
            </Badge>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Compare VPNs Side by Side
            </h1>
            <p className="text-lg text-muted-foreground">
              See how the top VPN services stack up against each other. Compare
              speeds, security features, pricing, and more.
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
          <h2 className="text-2xl font-bold mb-6 text-center">Full Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 bg-muted/50 font-semibold sticky left-0 min-w-[200px]">
                    VPN Provider
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
                            Editor&apos;s Choice
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
                      Overall Rating
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
                      Monthly Price
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">${vpn.priceMonthly}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </td>
                  ))}
                </tr>

                {/* Best Price */}
                <tr className="border-b hover:bg-muted/30 bg-green-50/50 dark:bg-green-900/10">
                  <td className="p-4 font-medium sticky left-0 bg-green-50/50 dark:bg-green-900/10">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Best Price (2yr plan)
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="text-xl font-bold text-green-600">
                        ${vpn.priceTwoYear || vpn.priceYearly}
                      </span>
                      <span className="text-muted-foreground">/mo</span>
                    </td>
                  ))}
                </tr>

                {/* Money Back Guarantee */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Money-Back Guarantee
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">{vpn.moneyBackDays}</span>{" "}
                      days
                    </td>
                  ))}
                </tr>

                {/* Free Tier */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Free Tier
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
                      Total Servers
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
                      Countries
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
                      Simultaneous Devices
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">
                        {vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Speed Score */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Speed Score
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
                      Security Score
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
                      Streaming Score
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
                      Protocols
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
                      Encryption
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
                      Kill Switch
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
                      No-Logs Policy
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
                      Netflix Support
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
                      Torrenting Support
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
                    Get Started
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
                          Visit {vpn.name}
                        </AffiliateButton>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reviews/${vpn.slug}`}>Read Review</Link>
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
            <h2 className="text-2xl font-bold mb-2">Quick Comparison</h2>
            <p className="text-muted-foreground">
              Here&apos;s how the top VPNs compare in key categories
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Best Overall */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Best Overall</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">NordVPN</span>
                <Badge className="bg-yellow-500 text-yellow-950">Winner</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Excellent balance of speed, security, and features. Our top pick
                for most users.
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
                <h3 className="font-bold">Best Value</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">Surfshark</span>
                <Badge variant="secondary">$1.99/mo</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Unlimited devices at the lowest price. Perfect for families and
                budget-conscious users.
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
                <h3 className="font-bold">Fastest VPN</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ExpressVPN</span>
                <Badge variant="secondary">96% Speed</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Consistently the fastest VPN in our tests. Best for streaming and
                gaming.
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
                <h3 className="font-bold">Best Security</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ProtonVPN</span>
                <Badge variant="secondary">99% Security</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Swiss-based with Secure Core servers. Open source and audited for
                maximum privacy.
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
                <h3 className="font-bold">Most Servers</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">PIA</span>
                <Badge variant="secondary">35,000+</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Massive server network with proven no-logs policy. Unlimited
                connections included.
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
                <h3 className="font-bold">Best Free Option</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ProtonVPN</span>
                <Badge className="bg-green-500 text-white">Free Tier</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Only trustworthy free VPN with no data limits or ads. Limited
                servers but fully secure.
              </p>
              <AffiliateButton
                vpnId="protonvpn"
                vpnName="ProtonVPN"
                affiliateUrl="https://go.zerotovpn.com/protonvpn"
                className="w-full"
              >
                Try Free
              </AffiliateButton>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              How We Compare VPNs
            </h2>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Speed Testing
                </h3>
                <p className="text-muted-foreground text-sm">
                  We test download and upload speeds across 50+ server locations
                  using standardized conditions. Speeds are measured multiple
                  times and averaged.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Analysis
                </h3>
                <p className="text-muted-foreground text-sm">
                  We evaluate encryption protocols, check for DNS/WebRTC leaks,
                  review privacy policies, and consider the jurisdiction of each
                  provider.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" />
                  Streaming Tests
                </h3>
                <p className="text-muted-foreground text-sm">
                  We test each VPN with Netflix, Disney+, BBC iPlayer, and other
                  popular streaming services across multiple regions.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Value Assessment
                </h3>
                <p className="text-muted-foreground text-sm">
                  We compare pricing, features, and performance to determine which
                  VPNs offer the best value for money at each price point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Need Help Deciding?</h2>
            <p className="text-muted-foreground">
              Check out our detailed reviews for in-depth analysis of each VPN, or
              read our guide to learn more about what to look for in a VPN.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/best/best-vpn">View Best VPNs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guides/what-is-vpn">What is a VPN?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
