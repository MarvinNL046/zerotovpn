// Static coupon data for VPN deals
// This will be replaced with database queries once Neon is configured

export interface Coupon {
  id: string;
  vpnSlug: string;
  code: string;
  discount: string; // e.g., "83% OFF" or "3 months free"
  description?: string;
  expiresAt?: Date;
  isVerified: boolean;
  clickCount: number;
  createdAt: Date;
}

export const coupons: Coupon[] = [
  {
    id: "nordvpn-zerotovpn",
    vpnSlug: "nordvpn",
    code: "ZEROTOVPN",
    discount: "83% OFF",
    description: "Save 83% on 2-year plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "surfshark-zero25",
    vpnSlug: "surfshark",
    code: "ZERO25",
    discount: "81% OFF + 3 months free",
    description: "Get 81% off plus 3 extra months on 2-year plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "expressvpn-zerovpn",
    vpnSlug: "expressvpn",
    code: "ZEROVPN",
    discount: "49% OFF",
    description: "Save 49% on annual plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "cyberghost-cyber25",
    vpnSlug: "cyberghost",
    code: "CYBER25",
    discount: "85% OFF + 3 months free",
    description: "Massive discount on 2-year plan",
    expiresAt: new Date("2026-06-30"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "protonvpn-promo",
    vpnSlug: "protonvpn",
    code: "PROMO50",
    discount: "50% OFF",
    description: "Half price on 2-year plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
];

export function getCouponsByVpnSlug(vpnSlug: string): Coupon[] {
  return coupons
    .filter((coupon) => coupon.vpnSlug === vpnSlug)
    .filter((coupon) => !coupon.expiresAt || coupon.expiresAt > new Date())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getAllActiveCoupons(): Coupon[] {
  return coupons
    .filter((coupon) => !coupon.expiresAt || coupon.expiresAt > new Date())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getCouponById(id: string): Coupon | undefined {
  return coupons.find((coupon) => coupon.id === id);
}

export function hasActiveCoupon(vpnSlug: string): boolean {
  return getCouponsByVpnSlug(vpnSlug).length > 0;
}

export function getDaysUntilExpiry(expiresAt?: Date): number | null {
  if (!expiresAt) return null;
  const now = new Date();
  const diffTime = expiresAt.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
