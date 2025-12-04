"use client";

import { useState, useEffect } from "react";
import { Shield, Check, Globe, Zap, Lock, Server, Wifi, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseIndicator } from "@/components/ui/pulse-indicator";

// Hook to detect visitor's country
function useVisitorCountry(fallback = "Netherlands") {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    // Fetch visitor's country from IP geolocation API
    fetch("https://ipapi.co/country_name/")
      .then((res) => res.ok ? res.text() : Promise.reject())
      .then((name) => setCountry(name.trim()))
      .catch(() => setCountry(fallback));
  }, [fallback]);

  return country;
}

interface HeroIllustrationProps {
  className?: string;
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const visitorCountry = useVisitorCountry();

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Main Dashboard Card */}
      <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground flex items-center gap-2">
              <Lock className="h-3 w-3" />
              zerotovpn.com
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* VPN Status Card */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl p-4 border border-green-500/20 animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-semibold">VPN Status</span>
              </div>
              <PulseIndicator variant="success" label="Protected" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Your IP</p>
                <p className="font-mono text-sm">••••••••••</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="font-mono text-sm flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {visitorCountry ?? <span className="animate-pulse">•••</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Speed Indicator */}
          <div className="bg-muted/30 rounded-xl p-4 border animate-fade-in-up stagger-2">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Speed</span>
            </div>
            <div className="text-2xl font-bold text-gradient">850 Mbps</div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
            </div>
          </div>

          {/* Feature Pills */}
          <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2 animate-fade-in-up stagger-3">
            <FeaturePill icon={<Check className="h-3 w-3" />} label="No Logs" active />
            <FeaturePill icon={<Server className="h-3 w-3" />} label="6,000+ Servers" />
            <FeaturePill icon={<Globe className="h-3 w-3" />} label="100 Countries" />
            <FeaturePill icon={<Wifi className="h-3 w-3" />} label="Kill Switch" active />
            <FeaturePill icon={<Eye className="h-3 w-3" />} label="Ad Blocker" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 md:-right-8 animate-float">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Shield className="h-4 w-4" />
          256-bit Encryption
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 md:-left-8 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Lightning Fast
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-green-500 rounded-full" />
      </div>
    </div>
  );
}

function FeaturePill({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-muted text-muted-foreground border border-transparent"
      )}
    >
      {icon}
      {label}
    </div>
  );
}

// Simpler version for smaller spaces
export function MiniDashboard({ className }: { className?: string }) {
  const visitorCountry = useVisitorCountry();

  return (
    <div className={cn("bg-card border rounded-lg p-4 shadow-lg", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Protected</span>
        </div>
        <PulseIndicator variant="success" size="sm" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Speed</span>
          <span className="font-medium">850 Mbps</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Location</span>
          <span className="font-medium">{visitorCountry ?? "•••"}</span>
        </div>
      </div>
    </div>
  );
}
