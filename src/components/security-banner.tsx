"use client";

import { useEffect, useState } from "react";
import { Shield, ShieldAlert, MapPin, Wifi, X } from "lucide-react";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";

interface IpData {
  ip: string;
  city?: string;
  country?: string;
  isp?: string;
  org?: string;
}

export function SecurityBanner() {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem("security-banner-dismissed")) {
      setDismissed(true);
      setLoading(false);
      return;
    }

    // Fetch user's IP data
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setIpData({
          ip: data.ip,
          city: data.city,
          country: data.country_name,
          isp: data.org,
        });
        setLoading(false);
      })
      .catch(() => {
        // Fallback: just show IP
        fetch("https://api.ipify.org?format=json")
          .then(res => res.json())
          .then(data => {
            setIpData({ ip: data.ip });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem("security-banner-dismissed", "true");
  }

  if (dismissed || loading || !ipData) return null;

  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 py-2.5 px-4">
        {/* Warning message */}
        <div className="flex items-center gap-3 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold">You are not protected!</span>
            <span className="flex items-center gap-1 opacity-90">
              <Wifi className="h-3.5 w-3.5" />
              <code className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">{ipData.ip}</code>
            </span>
            {ipData.city && ipData.country && (
              <span className="flex items-center gap-1 opacity-90">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs">{ipData.city}, {ipData.country}</span>
              </span>
            )}
            {ipData.isp && (
              <span className="text-xs opacity-75 hidden md:inline">
                ISP: {ipData.isp}
              </span>
            )}
          </div>
        </div>

        {/* CTA + dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getVpnAffiliateUrl("nordvpn")}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-red-600 text-sm font-bold rounded-lg hover:bg-white/90 transition-colors shadow-sm"
          >
            <Shield className="h-4 w-4" />
            Protect Now — 68% Off
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
