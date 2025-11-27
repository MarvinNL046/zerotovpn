import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Monitor,
  Server,
  Globe,
  Check,
  X,
} from "lucide-react";
import type { VpnProvider } from "@/lib/vpn-data";

interface VpnCardProps {
  vpn: VpnProvider;
  rank?: number;
  locale: string;
}

export function VpnCard({ vpn, rank, locale }: VpnCardProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {rank && (
          <Badge variant="secondary" className="font-bold">
            #{rank}
          </Badge>
        )}
        {vpn.editorChoice && (
          <Badge className="bg-yellow-500 text-yellow-950">
            Editor&apos;s Choice
          </Badge>
        )}
      </div>

      <CardHeader className="pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{vpn.name}</h3>
            <RatingStars rating={vpn.overallRating} size="md" />
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">From</div>
            <div className="text-3xl font-bold text-primary">
              ${vpn.priceTwoYear || vpn.priceYearly}
            </div>
            <div className="text-xs text-muted-foreground">/month</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm">{vpn.shortDescription}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Server className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{vpn.servers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Servers</div>
          </div>
          <div>
            <Globe className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{vpn.countries}</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </div>
          <div>
            <Monitor className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">
              {vpn.maxDevices >= 999 ? "∞" : vpn.maxDevices}
            </div>
            <div className="text-xs text-muted-foreground">Devices</div>
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Speed
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${vpn.speedScore}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{vpn.speedScore}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Security
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${vpn.securityScore}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{vpn.securityScore}%</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {vpn.netflixSupport && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> Netflix
            </Badge>
          )}
          {vpn.torrentSupport && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> Torrenting
            </Badge>
          )}
          {vpn.noLogs && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> No-Logs
            </Badge>
          )}
          {vpn.freeTier && (
            <Badge variant="outline" className="text-xs bg-green-50">
              Free Tier
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <AffiliateButton
          vpnId={vpn.id}
          vpnName={vpn.name}
          affiliateUrl={vpn.affiliateUrl}
          className="flex-1"
        >
          Get {vpn.name}
        </AffiliateButton>
        <Button variant="outline" asChild>
          <Link href={`/reviews/${vpn.slug}`}>Review</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
