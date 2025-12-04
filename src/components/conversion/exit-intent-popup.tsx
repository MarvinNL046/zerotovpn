"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedVpns } from "@/lib/vpn-data";

const SESSION_KEY = "exitIntentShown";
const PERMANENT_DISMISS_KEY = "exitIntentDismissed";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function ExitIntentPopup() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (typeof window === "undefined") return;

    const sessionShown = sessionStorage.getItem(SESSION_KEY);
    const permanentDismiss = localStorage.getItem(PERMANENT_DISMISS_KEY);

    // Check if permanently dismissed and still within 30 days
    if (permanentDismiss) {
      const dismissTime = parseInt(permanentDismiss, 10);
      const now = Date.now();
      if (now - dismissTime < DISMISS_DURATION_MS) {
        return; // Still within dismiss period
      } else {
        // Dismiss period expired, remove it
        localStorage.removeItem(PERMANENT_DISMISS_KEY);
      }
    }

    if (sessionShown) {
      // Intentional setState in effect to restore session state from storage
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasShown(true);
      return;
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving toward top of viewport (leaving page)
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    };

    // Add event listener after a short delay to avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem(PERMANENT_DISMISS_KEY, Date.now().toString());
    setIsOpen(false);
  };

  // Get the #1 featured VPN (NordVPN)
  const featuredVpns = getFeaturedVpns();
  const topVpn = featuredVpns[0];

  if (!topVpn) return null;

  // Calculate discount percentage
  const monthlyPrice = topVpn.priceMonthly;
  const bestPrice = topVpn.priceTwoYear || topVpn.priceYearly;
  const discountPercent = Math.round(((monthlyPrice - bestPrice) / monthlyPrice) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("exitIntent.headline")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("exitIntent.subheadline")}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {/* VPN Logo and Name */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={topVpn.logo}
                    alt={topVpn.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{topVpn.name}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(topVpn.overallRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">
                      {topVpn.overallRating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {discountPercent}% {t("exitIntent.off")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("exitIntent.specialDeal")}
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {t("exitIntent.feature1", {
                    servers: topVpn.servers.toLocaleString(),
                  })}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {t("exitIntent.feature2", {
                    countries: topVpn.countries,
                  })}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {t("exitIntent.feature3", {
                    days: topVpn.moneyBackDays,
                  })}
                </li>
              </ul>

              {/* Price */}
              <div className="text-center">
                <div className="text-sm text-muted-foreground line-through">
                  ${monthlyPrice.toFixed(2)}{t("comparison.perMonth")}
                </div>
                <div className="text-2xl font-bold text-primary">
                  ${bestPrice.toFixed(2)}{t("comparison.perMonth")}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="w-full text-lg font-semibold"
                asChild
              >
                <a
                  href={topVpn.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={handleClose}
                >
                  {t("exitIntent.claimDeal")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Don't show again link */}
        <div className="text-center">
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            {t("exitIntent.dontShowAgain")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
