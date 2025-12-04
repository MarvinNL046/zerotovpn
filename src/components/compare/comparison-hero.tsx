import { Badge } from "@/components/ui/badge";
import { Trophy, Shield } from "lucide-react";
import type { VpnData } from "@/lib/db/vpn-service";

interface ComparisonHeroProps {
  vpn1: VpnData;
  vpn2: VpnData;
  overallWinner: "vpn1" | "vpn2" | "tie";
}

export function ComparisonHero({ vpn1, vpn2, overallWinner }: ComparisonHeroProps) {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              VPN Comparison 2025
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
            {vpn1.name} vs {vpn2.name}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Comprehensive comparison of features, pricing, speed, and security to help you choose the best VPN for your needs.
          </p>

          {/* Quick Stats Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* VPN 1 Card */}
            <div className={`bg-card border-2 rounded-xl p-6 ${overallWinner === "vpn1" ? "border-green-500" : "border-border"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{vpn1.name}</h2>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Rating: {vpn1.overallRating}/5
                    </span>
                  </div>
                </div>
                {overallWinner === "vpn1" && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    Winner
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Price:</span>
                  <span className="font-semibold">${vpn1.priceTwoYear || vpn1.priceYearly}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Servers:</span>
                  <span className="font-semibold">{vpn1.servers.toLocaleString()}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries:</span>
                  <span className="font-semibold">{vpn1.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Speed Score:</span>
                  <span className="font-semibold">{vpn1.speedScore}%</span>
                </div>
              </div>
            </div>

            {/* VPN 2 Card */}
            <div className={`bg-card border-2 rounded-xl p-6 ${overallWinner === "vpn2" ? "border-green-500" : "border-border"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{vpn2.name}</h2>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Rating: {vpn2.overallRating}/5
                    </span>
                  </div>
                </div>
                {overallWinner === "vpn2" && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    Winner
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Price:</span>
                  <span className="font-semibold">${vpn2.priceTwoYear || vpn2.priceYearly}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Servers:</span>
                  <span className="font-semibold">{vpn2.servers.toLocaleString()}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries:</span>
                  <span className="font-semibold">{vpn2.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Speed Score:</span>
                  <span className="font-semibold">{vpn2.speedScore}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Winner Message */}
          {overallWinner !== "tie" && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Based on our comprehensive testing, <span className="font-semibold text-foreground">{overallWinner === "vpn1" ? vpn1.name : vpn2.name}</span> comes out ahead overall.
              </p>
            </div>
          )}
          {overallWinner === "tie" && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Both VPNs are excellent choices with similar overall ratings. Your choice depends on your specific needs.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
