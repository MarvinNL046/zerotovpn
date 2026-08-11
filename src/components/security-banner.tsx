"use client";

import { useEffect, useState } from "react";
import { MapPin, ShieldAlert, Wifi, X } from "lucide-react";

interface IpData {
  ip: string;
  city?: string;
  country?: string;
  isp?: string;
}

/**
 * Optional, neutral network-status banner. It intentionally contains no
 * provider, discount, coupon, or affiliate promotion so it can be reused on
 * informational pages without creating an advertising placement.
 */
export function SecurityBanner() {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("security-banner-dismissed")) {
      return;
    }

    fetch("/api/ip")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) =>
        setIpData({
          ip: data.ip || "Unknown",
          city: data.city,
          country: data.country,
          isp: data.isp,
        }),
      )
      .catch(() => setDismissed(true));
  }, []);

  if (dismissed || !ipData) return null;

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem("security-banner-dismissed", "true");
  }

  return (
    <div className="relative bg-muted text-foreground border-b">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 py-2 px-4">
        <div className="flex items-center gap-3 text-sm">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span className="font-medium">Network status</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Wifi className="h-3.5 w-3.5" />
            <code className="bg-background px-1.5 py-0.5 rounded text-xs font-mono">{ipData.ip}</code>
          </span>
          {ipData.city && ipData.country && (
            <span className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {ipData.city}, {ipData.country}
            </span>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-background transition-colors"
          aria-label="Dismiss network status"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
