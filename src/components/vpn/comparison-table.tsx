"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { Link } from "@/i18n/navigation";
import { Check, X, Shield, Zap, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import type { VpnProvider } from "@/lib/vpn-data-layer";

interface ComparisonTableProps {
  vpns: VpnProvider[];
}

export function ComparisonTable({ vpns }: ComparisonTableProps) {
  const t = useTranslations("vpnTable");

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">{t("headers.rank")}</TableHead>
            <TableHead>{t("headers.vpn")}</TableHead>
            <TableHead>{t("headers.rating")}</TableHead>
            <TableHead className="text-center">{t("headers.speed")}</TableHead>
            <TableHead className="text-center">{t("headers.security")}</TableHead>
            <TableHead className="text-center">{t("headers.servers")}</TableHead>
            <TableHead className="text-center">{t("headers.netflix")}</TableHead>
            <TableHead className="text-right">{t("headers.price")}</TableHead>
            <TableHead className="text-right">{t("headers.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vpns.map((vpn, index) => {
            const isNordVPN = vpn.slug === "nordvpn" || vpn.name === "NordVPN";
            return (
            <TableRow
              key={vpn.id}
              className={
                isNordVPN
                  ? "hover:bg-muted/50 bg-primary/5 border-l-4 border-l-primary"
                  : "hover:bg-muted/50"
              }
            >
              <TableCell className="font-bold text-lg">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <Link
                      href={`/reviews/${vpn.slug}`}
                      className="font-semibold hover:text-primary flex items-center gap-2"
                    >
                      {vpn.name}
                      {vpn.editorChoice && (
                        <Badge className="bg-yellow-500 text-yellow-950 text-xs">
                          {t("editorChoice")}
                        </Badge>
                      )}
                      {isNordVPN && (
                        <span className="ml-2 inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                          Editor&apos;s Pick
                        </span>
                      )}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {vpn.countries} {t("countries")} • {vpn.maxDevices >= 999 ? t("unlimited") : vpn.maxDevices} {t("devices")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RatingStars rating={vpn.overallRating} size="sm" />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{vpn.speedScore}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{vpn.securityScore}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {vpn.servers.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {vpn.netflixSupport ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="font-bold text-primary">
                  ${vpn.priceTwoYear || vpn.priceYearly}
                </div>
                <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
              </TableCell>
              <TableCell className="text-right">
                <AffiliateButton
                  vpnId={vpn.id}
                  vpnName={vpn.name}
                  affiliateUrl={vpn.affiliateUrl}
                  size="sm"
                >
                  {t("visit")} <ExternalLink className="h-3 w-3 ml-1" />
                </AffiliateButton>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
