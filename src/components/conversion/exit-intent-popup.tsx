"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Gift, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ExitIntentPopupProps {
  vpnName?: string;
  discountCode?: string;
  discountPercent?: number;
  affiliateUrl?: string;
}

export function ExitIntentPopup({
  vpnName = "NordVPN",
  discountCode = "ZEROTOVPN",
  discountPercent = 68,
  affiliateUrl = "https://go.zerotovpn.com/nordvpn",
}: ExitIntentPopupProps) {
  const t = useTranslations("exitPopup");
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleExitIntent = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        // Check if popup was shown in this session
        const popupShown = sessionStorage.getItem("exitPopupShown");
        if (!popupShown) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitPopupShown", "true");
        }
      }
    },
    [hasShown]
  );

  useEffect(() => {
    // Check if already shown in this session
    const popupShown = sessionStorage.getItem("exitPopupShown");
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Add event listener after a delay to avoid immediate triggering
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleExitIntent);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [handleExitIntent]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    // Track the click (you can add analytics here)
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
          aria-label={t("close")}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("waitTitle")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("specialOffer")}
          </p>

          {/* Discount box */}
          <div className="bg-primary/10 border-2 border-dashed border-primary/30 rounded-xl p-4 mb-6">
            <div className="text-5xl font-black text-primary mb-1">
              {discountPercent}% OFF
            </div>
            <div className="text-lg font-semibold">
              {vpnName}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
              <Clock className="h-4 w-4" />
              {t("limitedTime")}
            </div>
          </div>

          {/* Discount code */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">{t("useCode")}</p>
            <div className="inline-block bg-muted px-4 py-2 rounded-lg font-mono text-lg font-bold tracking-wider">
              {discountCode}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg font-bold"
            onClick={handleClaim}
          >
            {t("claimDeal")}
          </Button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              {t("moneyBack")}
            </div>
          </div>

          {/* No thanks link */}
          <button
            onClick={handleClose}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            {t("noThanks")}
          </button>
        </div>
      </div>
    </div>
  );
}
