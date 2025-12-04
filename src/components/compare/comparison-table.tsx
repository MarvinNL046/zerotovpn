import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import {
  Check,
  X,
  Trophy,
  DollarSign,
  Clock,
  Server,
  Globe,
  Monitor,
  Zap,
  Lock,
  Shield,
  Tv,
  Download,
} from "lucide-react";
import type { VpnData } from "@/lib/db/vpn-service";

interface ComparisonTableProps {
  vpn1: VpnData;
  vpn2: VpnData;
}

type FeatureValue = string | number | boolean | string[];

interface FeatureRow {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  getValue: (vpn: VpnData) => FeatureValue;
  format?: (value: FeatureValue) => React.ReactNode;
  determineWinner?: (val1: FeatureValue, val2: FeatureValue) => "vpn1" | "vpn2" | "tie";
}

export function ComparisonTable({ vpn1, vpn2 }: ComparisonTableProps) {
  const features: FeatureRow[] = [
    {
      label: "Overall Rating",
      icon: Shield,
      getValue: (vpn) => vpn.overallRating,
      format: (val) => (
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold text-primary">{val}</span>
          <span className="text-muted-foreground">/5</span>
        </div>
      ),
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Monthly Price",
      icon: DollarSign,
      getValue: (vpn) => vpn.priceMonthly,
      format: (val) => <span className="font-semibold">${val}/mo</span>,
      determineWinner: (v1, v2) => ((v1 as number) < (v2 as number) ? "vpn1" : (v1 as number) > (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Best Price (2yr plan)",
      icon: DollarSign,
      getValue: (vpn) => vpn.priceTwoYear || vpn.priceYearly,
      format: (val) => (
        <span className="text-xl font-bold text-green-600">${val}/mo</span>
      ),
      determineWinner: (v1, v2) => ((v1 as number) < (v2 as number) ? "vpn1" : (v1 as number) > (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Money-Back Guarantee",
      icon: Clock,
      getValue: (vpn) => vpn.moneyBackDays,
      format: (val) => <span className="font-semibold">{val} days</span>,
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Free Tier",
      icon: DollarSign,
      getValue: (vpn) => vpn.freeTier,
      format: (val) =>
        val ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
      determineWinner: (v1, v2) => ((v1 as boolean) && !(v2 as boolean) ? "vpn1" : !(v1 as boolean) && (v2 as boolean) ? "vpn2" : "tie"),
    },
    {
      label: "Total Servers",
      icon: Server,
      getValue: (vpn) => vpn.servers,
      format: (val) => <span className="font-semibold">{(val as number).toLocaleString()}+</span>,
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Countries",
      icon: Globe,
      getValue: (vpn) => vpn.countries,
      format: (val) => <span className="font-semibold">{val}</span>,
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Simultaneous Devices",
      icon: Monitor,
      getValue: (vpn) => vpn.maxDevices,
      format: (val) => (
        <span className="font-semibold">{(val as number) >= 999 ? "Unlimited" : val}</span>
      ),
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Speed Score",
      icon: Zap,
      getValue: (vpn) => vpn.speedScore,
      format: (val) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${val}%` }}
            />
          </div>
          <span className="font-semibold text-sm">{val}%</span>
        </div>
      ),
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Security Score",
      icon: Lock,
      getValue: (vpn) => vpn.securityScore,
      format: (val) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${val}%` }}
            />
          </div>
          <span className="font-semibold text-sm">{val}%</span>
        </div>
      ),
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Streaming Score",
      icon: Tv,
      getValue: (vpn) => vpn.streamingScore,
      format: (val) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: `${val}%` }}
            />
          </div>
          <span className="font-semibold text-sm">{val}%</span>
        </div>
      ),
      determineWinner: (v1, v2) => ((v1 as number) > (v2 as number) ? "vpn1" : (v1 as number) < (v2 as number) ? "vpn2" : "tie"),
    },
    {
      label: "Protocols",
      icon: Shield,
      getValue: (vpn) => vpn.protocols,
      format: (val) => (
        <div className="flex flex-wrap justify-center gap-1">
          {(val as string[]).map((protocol) => (
            <Badge key={protocol} variant="outline" className="text-xs">
              {protocol}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      label: "Encryption",
      icon: Lock,
      getValue: (vpn) => vpn.encryption,
      format: (val) => <Badge variant="secondary">{val}</Badge>,
    },
    {
      label: "Kill Switch",
      icon: Shield,
      getValue: (vpn) => vpn.killSwitch,
      format: (val) =>
        val ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
    {
      label: "No-Logs Policy",
      icon: Shield,
      getValue: (vpn) => vpn.noLogs,
      format: (val) =>
        val ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
    {
      label: "Netflix Support",
      icon: Tv,
      getValue: (vpn) => vpn.netflixSupport,
      format: (val) =>
        val ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
    {
      label: "Torrenting Support",
      icon: Download,
      getValue: (vpn) => vpn.torrentSupport,
      format: (val) =>
        val ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Detailed Feature Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-4 bg-muted/50 font-semibold w-1/3">
                  Feature
                </th>
                <th className="p-4 bg-muted/50 text-center w-1/3">
                  <div className="font-bold text-lg">{vpn1.name}</div>
                </th>
                <th className="p-4 bg-muted/50 text-center w-1/3">
                  <div className="font-bold text-lg">{vpn2.name}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const val1 = feature.getValue(vpn1);
                const val2 = feature.getValue(vpn2);
                const winner = feature.determineWinner?.(val1, val2);
                const Icon = feature.icon;

                return (
                  <tr
                    key={feature.label}
                    className={`border-b hover:bg-muted/30 ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/10"
                    }`}
                  >
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        {feature.label}
                      </div>
                    </td>
                    <td className="p-4 text-center relative">
                      <div className="flex items-center justify-center gap-2">
                        {winner === "vpn1" && (
                          <Trophy className="h-4 w-4 text-green-500 absolute left-2" />
                        )}
                        {feature.format ? feature.format(val1) : val1}
                      </div>
                    </td>
                    <td className="p-4 text-center relative">
                      <div className="flex items-center justify-center gap-2">
                        {winner === "vpn2" && (
                          <Trophy className="h-4 w-4 text-green-500 absolute left-2" />
                        )}
                        {feature.format ? feature.format(val2) : val2}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* CTA Row */}
              <tr className="bg-muted/50">
                <td className="p-4 font-semibold">Get Started</td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <AffiliateButton
                      vpnId={vpn1.id}
                      vpnName={vpn1.name}
                      affiliateUrl={vpn1.affiliateUrl}
                      className="w-full"
                    >
                      Visit {vpn1.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/reviews/${vpn1.slug}`}>Read Review</Link>
                    </Button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <AffiliateButton
                      vpnId={vpn2.id}
                      vpnName={vpn2.name}
                      affiliateUrl={vpn2.affiliateUrl}
                      className="w-full"
                    >
                      Visit {vpn2.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/reviews/${vpn2.slug}`}>Read Review</Link>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
