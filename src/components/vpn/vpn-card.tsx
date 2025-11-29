"use client";

import Image from "next/image";
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
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { VpnProvider } from "@/lib/vpn-data-layer";

interface VpnCardProps {
  vpn: VpnProvider;
  rank?: number;
  locale: string;
}

export function VpnCard({ vpn, rank }: VpnCardProps) {
  const t = useTranslations("vpnCard");

  return (
    <Card className="relative overflow-hidden">
      {/* Screenshot Image */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        {vpn.cardImage ? (
          <Image
            src={vpn.cardImage}
            alt={`${vpn.name} website screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
            <Shield className="h-16 w-16 text-primary/30" />
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Badges - now positioned over image */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {rank && (
            <Badge variant="secondary" className="font-bold shadow-md">
              #{rank}
            </Badge>
          )}
          {vpn.editorChoice && (
            <Badge className="bg-yellow-500 text-yellow-950 shadow-md">
              {t("editorChoice")}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{vpn.name}</h3>
            <RatingStars rating={vpn.overallRating} size="md" />
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t("from")}</div>
            <div className="text-3xl font-bold text-primary">
              ${vpn.priceTwoYear || vpn.priceYearly}
            </div>
            <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
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
            <div className="text-xs text-muted-foreground">{t("servers")}</div>
          </div>
          <div>
            <Globe className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{vpn.countries}</div>
            <div className="text-xs text-muted-foreground">{t("countries")}</div>
          </div>
          <div>
            <Monitor className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">
              {vpn.maxDevices >= 999 ? "∞" : vpn.maxDevices}
            </div>
            <div className="text-xs text-muted-foreground">{t("devices")}</div>
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> {t("speed")}
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
              <Shield className="h-4 w-4" /> {t("security")}
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
              <Check className="h-3 w-3 mr-1" /> {t("netflix")}
            </Badge>
          )}
          {vpn.torrentSupport && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> {t("torrenting")}
            </Badge>
          )}
          {vpn.noLogs && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> {t("noLogs")}
            </Badge>
          )}
          {vpn.freeTier && (
            <Badge variant="outline" className="text-xs bg-green-50">
              {t("freeTier")}
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
          {t("getVpn", { name: vpn.name })}
        </AffiliateButton>
        <Button variant="outline" asChild>
          <Link href={`/reviews/${vpn.slug}`}>{t("review")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
