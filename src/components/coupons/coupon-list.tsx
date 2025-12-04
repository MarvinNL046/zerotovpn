"use client";

import { CouponCard } from "./coupon-card";
import { useTranslations } from "next-intl";
import type { Coupon } from "@/lib/coupon-data";

interface CouponListProps {
  coupons: Coupon[];
  vpnName?: string;
  vpnSlug?: string;
  affiliateUrl?: string;
}

export function CouponList({ coupons, vpnName, affiliateUrl }: CouponListProps) {
  const t = useTranslations("coupons");

  if (coupons.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("noCoupons")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          vpnName={vpnName}
          affiliateUrl={affiliateUrl}
        />
      ))}
    </div>
  );
}
