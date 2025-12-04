"use client";

import { useState, useMemo } from "react";
import { X, Plus, Check, Minus, Crown, Shield, Zap, Globe, Server, Monitor } from "lucide-react";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { useTranslations } from "next-intl";
import type { VpnData } from "@/lib/db/vpn-service";

interface VpnComparisonToolProps {
  vpns: VpnData[];
  maxCompare?: number;
}

interface ComparisonRowProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  valueKey: keyof VpnData;
  format?: "number" | "boolean" | "price" | "array" | "percentage";
  betterIs?: "highest" | "lowest";
  selectedVpns: VpnData[];
  maxCompare: number;
  isWinner: (vpn: VpnData, key: keyof VpnData, type: "highest" | "lowest") => boolean;
}

function ComparisonRow({
  label,
  icon: Icon,
  valueKey,
  format = "number",
  betterIs = "highest",
  selectedVpns,
  maxCompare,
  isWinner,
}: ComparisonRowProps) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-3 px-4 font-medium text-sm flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label}
      </td>
      {selectedVpns.map(vpn => {
        const value = vpn[valueKey];
        const winner = isWinner(vpn, valueKey, betterIs);

        let displayValue: React.ReactNode;
        if (format === "boolean") {
          displayValue = value ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
          );
        } else if (format === "price") {
          displayValue = `$${typeof value === "number" ? value.toFixed(2) : value}`;
        } else if (format === "array") {
          displayValue = (Array.isArray(value) ? value : []).join(", ");
        } else if (format === "percentage") {
          displayValue = (
            <div className="flex items-center gap-2 justify-center">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${winner ? "bg-primary" : "bg-muted-foreground/50"}`}
                  style={{ width: `${typeof value === "number" ? value : 0}%` }}
                />
              </div>
              <span className="text-sm">{typeof value === "number" ? value : 0}%</span>
            </div>
          );
        } else {
          displayValue = typeof value === "number" ? value.toLocaleString() : String(value ?? "");
        }

        return (
          <td
            key={vpn.id}
            className={`py-3 px-4 text-center ${winner && selectedVpns.length > 1 ? "bg-primary/5 font-semibold" : ""}`}
          >
            {displayValue}
            {winner && selectedVpns.length > 1 && format !== "boolean" && (
              <Crown className="h-3 w-3 text-yellow-500 inline ml-1" />
            )}
          </td>
        );
      })}
      {selectedVpns.length < maxCompare && <td className="py-3 px-4" />}
    </tr>
  );
}

export function VpnComparisonTool({ vpns, maxCompare = 4 }: VpnComparisonToolProps) {
  const t = useTranslations("comparisonTool");
  const [selectedVpns, setSelectedVpns] = useState<VpnData[]>([]);
  const [isSelectingVpn, setIsSelectingVpn] = useState(false);

  const availableVpns = useMemo(() => {
    return vpns.filter(vpn => !selectedVpns.some(s => s.id === vpn.id));
  }, [vpns, selectedVpns]);

  const addVpn = (vpn: VpnData) => {
    if (selectedVpns.length < maxCompare) {
      setSelectedVpns([...selectedVpns, vpn]);
      setIsSelectingVpn(false);
    }
  };

  const removeVpn = (vpnId: string) => {
    setSelectedVpns(selectedVpns.filter(v => v.id !== vpnId));
  };

  const getBestValue = (key: keyof VpnData, type: "highest" | "lowest" = "highest"): number | null => {
    if (selectedVpns.length < 2) return null;
    const values = selectedVpns
      .map(vpn => {
        const value = vpn[key];
        return typeof value === 'number' ? value : null;
      })
      .filter((v): v is number => v !== null);

    if (values.length === 0) return null;
    return type === "highest" ? Math.max(...values) : Math.min(...values);
  };

  const isWinner = (vpn: VpnData, key: keyof VpnData, type: "highest" | "lowest" = "highest"): boolean => {
    const best = getBestValue(key, type);
    const value = vpn[key];
    return best !== null && typeof value === 'number' && value === best;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("title")}</h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          {selectedVpns.length > 0 && (
            <Badge variant="secondary">
              {selectedVpns.length}/{maxCompare} {t("selected")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* VPN selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b bg-muted/30">
          {selectedVpns.map(vpn => (
            <div
              key={vpn.id}
              className="relative bg-background rounded-lg border p-4 text-center"
            >
              <button
                onClick={() => removeVpn(vpn.id)}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
                aria-label={t("remove")}
              >
                <X className="h-4 w-4" />
              </button>
              <VpnLogo name={vpn.name} size="md" className="mx-auto" />
              <p className="mt-2 font-semibold text-sm">{vpn.name}</p>
              <RatingStars rating={vpn.overallRating} size="sm" />
            </div>
          ))}

          {selectedVpns.length < maxCompare && (
            <div className="relative">
              {isSelectingVpn ? (
                <div className="bg-background rounded-lg border p-2 max-h-48 overflow-y-auto">
                  <div className="space-y-1">
                    {availableVpns.map(vpn => (
                      <button
                        key={vpn.id}
                        onClick={() => addVpn(vpn)}
                        className="w-full text-left p-2 rounded hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <VpnLogo name={vpn.name} size="sm" />
                        <span className="text-sm">{vpn.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSelectingVpn(true)}
                  className="w-full h-full min-h-24 bg-background rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Plus className="h-8 w-8" />
                  <span className="text-sm font-medium">{t("addVpn")}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Comparison table */}
        {selectedVpns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">{t("feature")}</th>
                  {selectedVpns.map(vpn => (
                    <th key={vpn.id} className="py-3 px-4 text-center font-semibold">
                      {vpn.name}
                    </th>
                  ))}
                  {selectedVpns.length < maxCompare && <th className="py-3 px-4" />}
                </tr>
              </thead>
              <tbody>
                {/* Pricing */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedVpns.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("pricing")}
                  </td>
                </tr>
                <ComparisonRow label={t("monthlyPrice")} valueKey="priceMonthly" format="price" betterIs="lowest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("yearlyPrice")} valueKey="priceYearly" format="price" betterIs="lowest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("moneyBack")} valueKey="moneyBackDays" format="number" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />

                {/* Performance */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedVpns.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("performance")}
                  </td>
                </tr>
                <ComparisonRow label={t("speedScore")} icon={Zap} valueKey="speedScore" format="percentage" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("securityScore")} icon={Shield} valueKey="securityScore" format="percentage" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("streamingScore")} icon={Monitor} valueKey="streamingScore" format="percentage" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />

                {/* Network */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedVpns.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("network")}
                  </td>
                </tr>
                <ComparisonRow label={t("servers")} icon={Server} valueKey="servers" format="number" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("countries")} icon={Globe} valueKey="countries" format="number" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("devices")} icon={Monitor} valueKey="maxDevices" format="number" betterIs="highest" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />

                {/* Features */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedVpns.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("features")}
                  </td>
                </tr>
                <ComparisonRow label={t("netflix")} valueKey="netflixSupport" format="boolean" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("torrenting")} valueKey="torrentSupport" format="boolean" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("killSwitch")} valueKey="killSwitch" format="boolean" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("noLogs")} valueKey="noLogs" format="boolean" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("protocols")} valueKey="protocols" format="array" selectedVpns={selectedVpns} maxCompare={maxCompare} isWinner={isWinner} />

                {/* CTA Row */}
                <tr className="border-t-2">
                  <td className="py-4 px-4 font-semibold">{t("getStarted")}</td>
                  {selectedVpns.map(vpn => (
                    <td key={vpn.id} className="py-4 px-4 text-center">
                      <AffiliateButton
                        vpnId={vpn.id}
                        vpnName={vpn.name}
                        affiliateUrl={vpn.affiliateUrl}
                        size="sm"
                        className="w-full"
                      >
                        {t("visitSite")}
                      </AffiliateButton>
                    </td>
                  ))}
                  {selectedVpns.length < maxCompare && <td className="py-4 px-4" />}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("noVpnsSelected")}</h3>
            <p className="text-muted-foreground mb-4">{t("selectToCompare")}</p>
            <Button onClick={() => setIsSelectingVpn(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("addFirstVpn")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
