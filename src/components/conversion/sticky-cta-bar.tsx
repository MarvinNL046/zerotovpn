"use client";

import { useState, useEffect } from "react";
import { X, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface StickyCTABarProps {
  vpnName?: string;
  discountPercent?: number;
  affiliateUrl?: string;
  position?: "top" | "bottom";
}

export function StickyCTABar({
  vpnName = "NordVPN",
  discountPercent = 68,
  affiliateUrl = "https://go.zerotovpn.com/nordvpn",
  position = "bottom",
}: StickyCTABarProps) {
  const t = useTranslations("stickyBar");
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the bar in this session
    const dismissed = sessionStorage.getItem("stickyBarDismissed");
    if (dismissed) {
      // Intentional setState in effect to restore session state from storage
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDismissed(true);
      return;
    }

    // Show bar after scrolling down 300px
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("stickyBarDismissed", "true");
  };

  const handleClick = () => {
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };

  if (isDismissed || !isVisible) return null;

  const positionClasses = position === "top"
    ? "top-0 border-b"
    : "bottom-0 border-t";

  return (
    <div
      className={`fixed left-0 right-0 ${positionClasses} bg-primary text-primary-foreground z-40 shadow-lg animate-in slide-in-from-bottom duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Content */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-primary-foreground/20 rounded-full flex-shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg whitespace-nowrap">
                  {discountPercent}% OFF
                </span>
                <span className="hidden md:inline text-primary-foreground/90">
                  {t("getExclusive", { vpn: vpnName })}
                </span>
                <span className="md:hidden text-primary-foreground/90 truncate">
                  {vpnName}
                </span>
              </div>
              <p className="text-sm text-primary-foreground/80 hidden lg:block">
                {t("limitedOffer")}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              className="font-bold whitespace-nowrap"
              onClick={handleClick}
            >
              <span className="hidden sm:inline">{t("claimDeal")}</span>
              <span className="sm:hidden">{t("getDeal")}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label={t("dismiss")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
