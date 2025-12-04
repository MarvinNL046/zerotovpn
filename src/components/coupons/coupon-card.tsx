"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Coupon } from "@/lib/coupon-data";
import { getDaysUntilExpiry } from "@/lib/coupon-data";

interface CouponCardProps {
  coupon: Coupon;
  vpnName?: string;
  affiliateUrl?: string;
}

export function CouponCard({ coupon, vpnName, affiliateUrl }: CouponCardProps) {
  const t = useTranslations("coupons");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Track copy event (can be used for analytics)
    if (typeof window !== "undefined") {
      console.log(`Coupon copied: ${coupon.code} for ${coupon.vpnSlug}`);
    }
  };

  const handleGetDeal = () => {
    // Track click event
    if (typeof window !== "undefined") {
      console.log(`Coupon deal clicked: ${coupon.code} for ${coupon.vpnSlug}`);
    }

    // Open affiliate link
    if (affiliateUrl) {
      window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    }
  };

  const daysUntilExpiry = getDaysUntilExpiry(coupon.expiresAt);
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 7;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        {/* Discount Badge */}
        <div className="mb-4">
          <Badge variant="default" className="text-lg px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            {coupon.discount}
          </Badge>
        </div>

        {/* Coupon Code Box */}
        <div className="relative mb-4">
          <div className="border-2 border-dashed border-primary rounded-lg p-4 bg-primary/5 flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                {t("code")}
              </div>
              <div className="text-2xl font-bold font-mono tracking-wider text-primary">
                {coupon.code}
              </div>
            </div>
            <Button
              onClick={handleCopy}
              variant={copied ? "default" : "outline"}
              className="ml-4"
              size="lg"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  {t("copy")}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Description */}
        {coupon.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {coupon.description}
          </p>
        )}

        {/* Verification Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {coupon.isVerified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Check className="h-3 w-3 mr-1" />
                {t("verified")}
              </Badge>
            )}
            {isExpiringSoon && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertCircle className="h-3 w-3 mr-1" />
                {t("expiringSoon")}
              </Badge>
            )}
          </div>
          {coupon.expiresAt && (
            <span className="text-xs text-muted-foreground">
              {t("expires")}: {coupon.expiresAt.toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Get Deal Button */}
        {affiliateUrl && (
          <Button
            onClick={handleGetDeal}
            className="w-full"
            size="lg"
          >
            {t("getDeal")} {vpnName && `- ${vpnName}`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
