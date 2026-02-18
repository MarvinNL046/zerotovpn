"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield, ShieldAlert, ShieldCheck, MapPin, Copy, Check,
  RefreshCw, Wifi, Clock, Building2, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
  isVpn: boolean;
  isProxy: boolean;
  isHosting: boolean;
  zip?: string;
  as?: string;
  error?: string;
}

// Country code to flag emoji helper
function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌍";
  const offset = 127397;
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => c.charCodeAt(0) + offset)
  );
}

export function IpLookupWidget() {
  const t = useTranslations("ipTool");
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchIpInfo = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("/api/ip", { cache: "no-store" });
      const data = await res.json();
      setIpInfo(data);
    } catch {
      setIpInfo({
        ip: "Unable to detect", city: "", region: "", country: "",
        countryCode: "", isp: "", org: "", timezone: "",
        lat: 0, lon: 0, isVpn: false, isProxy: false, isHosting: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIpInfo(); }, []);

  const copyIp = async () => {
    if (ipInfo?.ip) {
      await navigator.clipboard.writeText(ipInfo.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isProtected = ipInfo?.isVpn || ipInfo?.isProxy || ipInfo?.isHosting;

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
              {/* Pulse ring animation */}
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/30 animate-ping" />
            </div>
            <p className="text-lg font-medium text-muted-foreground">{t("checking")}</p>
            {/* Animated dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Main IP Card */}
      <Card className={cn(
        "overflow-hidden border-2 transition-colors",
        isProtected ? "border-green-500/30" : "border-red-500/30"
      )}>
        {/* VPN Status Banner */}
        <div className={cn(
          "px-6 py-3 flex items-center gap-3",
          isProtected
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-red-500/10 text-red-600 dark:text-red-400"
        )}>
          {isProtected ? (
            <ShieldCheck className="h-5 w-5" />
          ) : (
            <ShieldAlert className="h-5 w-5" />
          )}
          <span className="font-semibold">
            {t("vpnStatus")}: {isProtected ? t("protected") : t("notProtected")}
          </span>
        </div>

        <CardContent className="p-6 md:p-8">
          {/* IP Address - Large Display */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-medium">
              {t("yourIp")}
            </p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-3xl md:text-4xl font-mono font-bold tracking-tight">
                {ipInfo?.ip}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={copyIp}
                className="shrink-0"
              >
                {copied ? (
                  <><Check className="h-4 w-4 mr-1" /> {t("copied")}</>
                ) : (
                  <><Copy className="h-4 w-4 mr-1" /> {t("copyIp")}</>
                )}
              </Button>
            </div>
            {/* IPv4/IPv6 badge */}
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {ipInfo?.ip?.includes(":") ? t("ipv6") : t("ipv4")}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{t("location")}</p>
                <p className="font-medium">
                  {ipInfo?.countryCode && countryFlag(ipInfo.countryCode)}{" "}
                  {[ipInfo?.city, ipInfo?.region, ipInfo?.country].filter(Boolean).join(", ") || "Unknown"}
                </p>
              </div>
            </div>

            {/* ISP */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Wifi className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{t("isp")}</p>
                <p className="font-medium">{ipInfo?.isp || "Unknown"}</p>
              </div>
            </div>

            {/* Organization */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{t("org")}</p>
                <p className="font-medium">{ipInfo?.org || ipInfo?.as || "Unknown"}</p>
              </div>
            </div>

            {/* Timezone */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{t("timezone")}</p>
                <p className="font-medium">{ipInfo?.timezone || "Unknown"}</p>
              </div>
            </div>
          </div>

          {/* VPN Status Description */}
          <div className={cn(
            "mt-6 p-4 rounded-lg text-sm",
            isProtected ? "bg-green-500/5 text-green-700 dark:text-green-300" : "bg-red-500/5 text-red-700 dark:text-red-300"
          )}>
            <p>{isProtected ? t("protectedDesc") : t("notProtectedDesc")}</p>
          </div>

          {/* Check Again Button */}
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={fetchIpInfo} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {t("recheckBtn")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NordVPN CTA - only when NOT protected */}
      {!isProtected && (
        <Card className="overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">{t("getProtected")}</h3>
                <p className="text-white/80 text-sm">{t("getProtectedDesc")}</p>
              </div>
              <a
                href="https://go.zerotovpn.com/nordvpn"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors shrink-0 text-sm md:text-base"
                onClick={() => {
                  fetch("/api/click", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ vpnId: "nordvpn", page: "ip-tool" }),
                  }).catch(() => {});
                }}
              >
                {t("nordvpnDeal")}
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
