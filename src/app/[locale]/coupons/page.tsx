import { setRequestLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CouponList } from "@/components/coupons/coupon-list";
import { getAllActiveCoupons } from "@/lib/coupon-data";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { Ticket, TrendingDown, Clock, Shield } from "lucide-react";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/coupons`;

  const titles: Record<string, string> = {
    en: "VPN Coupons & Discount Codes 2025 - Save Up To 83% OFF",
    nl: "VPN Kortingscodes 2025 - Bespaar tot 83%",
    de: "VPN Gutscheine 2025 - Sparen Sie bis zu 83%",
    es: "Cupones VPN 2025 - Ahorra hasta 83%",
    fr: "Codes Promo VPN 2025 - Économisez jusqu'à 83%",
    zh: "VPN优惠券2025 - 节省高达83%",
    ja: "VPNクーポン2025 - 最大83%割引",
    ko: "VPN 쿠폰 2025 - 최대 83% 할인",
    th: "คูปอง VPN 2025 - ประหยัดสูงสุด 83%",
  };

  const descriptions: Record<string, string> = {
    en: "Get the best VPN deals with verified discount codes. Save up to 83% OFF on NordVPN, Surfshark, ExpressVPN and more. Exclusive coupons updated daily.",
    nl: "De beste VPN-deals met geverifieerde kortingscodes. Bespaar tot 83% op NordVPN, Surfshark, ExpressVPN en meer. Exclusieve kortingen dagelijks bijgewerkt.",
    de: "Die besten VPN-Angebote mit verifizierten Gutscheincodes. Sparen Sie bis zu 83% bei NordVPN, Surfshark, ExpressVPN und mehr. Exklusive Gutscheine täglich aktualisiert.",
    es: "Las mejores ofertas de VPN con códigos de descuento verificados. Ahorra hasta el 83% en NordVPN, Surfshark, ExpressVPN y más. Cupones exclusivos actualizados diariamente.",
    fr: "Les meilleures offres VPN avec des codes de réduction vérifiés. Économisez jusqu'à 83% sur NordVPN, Surfshark, ExpressVPN et plus. Coupons exclusifs mis à jour quotidiennement.",
    zh: "获取经过验证的VPN折扣码最佳优惠。NordVPN、Surfshark、ExpressVPN等可节省高达83%。每日更新独家优惠券。",
    ja: "認証済み割引コードで最高のVPN取引を入手。NordVPN、Surfshark、ExpressVPNなどで最大83%割引。毎日更新される限定クーポン。",
    ko: "검증된 할인 코드로 최고의 VPN 거래를 받으세요. NordVPN, Surfshark, ExpressVPN 등에서 최대 83% 할인. 매일 업데이트되는 독점 쿠폰.",
    th: "รับดีลVPNที่ดีที่สุดพร้อมรหัสส่วนลดที่ยืนยันแล้ว ประหยัดสูงสุด 83% สำหรับ NordVPN, Surfshark, ExpressVPN และอื่นๆ คูปองพิเศษอัปเดตทุกวัน",
  };

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/coupons` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/coupons`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "VPN coupons",
      "VPN discount codes",
      "VPN deals",
      "VPN promo codes",
      "NordVPN coupon",
      "Surfshark coupon",
      "ExpressVPN coupon",
      "cheap VPN",
      "VPN sale",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

export default async function CouponsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("couponsPage");

  const allCoupons = await getAllActiveCoupons();

  // Group coupons by VPN
  const couponsByVpn = allCoupons.reduce((acc, coupon) => {
    if (!acc[coupon.vpnSlug]) {
      acc[coupon.vpnSlug] = [];
    }
    acc[coupon.vpnSlug].push(coupon);
    return acc;
  }, {} as Record<string, typeof allCoupons>);

  return (
    <div className="py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Ticket className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-10 w-10 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2">{t("features.verified")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("features.verifiedDesc")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingDown className="h-10 w-10 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">{t("features.savings")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("features.savingsDesc")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-10 w-10 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">{t("features.updated")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("features.updatedDesc")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Ticket className="h-10 w-10 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">{t("features.exclusive")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("features.exclusiveDesc")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* All Coupons by VPN */}
        <div className="space-y-12">
          {await Promise.all(Object.entries(couponsByVpn).map(async ([vpnSlug, coupons]) => {
            const vpn = await getVpnBySlug(vpnSlug);
            if (!vpn) return null;

            return (
              <section key={vpnSlug} id={vpnSlug}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {vpn.logo && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={vpn.logo}
                            alt={`${vpn.name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-2xl">
                          {vpn.name} {t("coupons")}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {coupons.length} {coupons.length === 1 ? t("activeCoupon") : t("activeCoupons")}
                        </p>
                      </div>
                      {vpn.editorChoice && (
                        <Badge className="bg-yellow-500 text-yellow-950 ml-auto">
                          {t("editorChoice")}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CouponList
                      coupons={coupons}
                      vpnName={vpn.name}
                      affiliateUrl={vpn.affiliateUrl}
                    />
                  </CardContent>
                </Card>
              </section>
            );
          }))}
        </div>

        {/* How to Use Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>{t("howToUse.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t("howToUse.step1")}</h4>
                  <p className="text-sm text-muted-foreground">{t("howToUse.step1Desc")}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t("howToUse.step2")}</h4>
                  <p className="text-sm text-muted-foreground">{t("howToUse.step2Desc")}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t("howToUse.step3")}</h4>
                  <p className="text-sm text-muted-foreground">{t("howToUse.step3Desc")}</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
