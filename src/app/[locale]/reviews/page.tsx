import { setRequestLocale } from "next-intl/server";
import { VpnCard } from "@/components/vpn/vpn-card";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema, ComparisonTableSchema } from "@/components/structured-data";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews`;
  });

  const titles: Record<string, string> = {
    en: "VPN Reviews 2025 - Expert Analysis & Ratings",
    nl: "VPN Reviews 2025 - Expert Analyse & Beoordelingen",
    de: "VPN Tests 2025 - Expertenanalyse & Bewertungen",
    es: "Reseñas de VPN 2025 - Análisis de Expertos",
    fr: "Avis VPN 2025 - Analyse d'Experts",
    zh: "VPN 评测 2025 - 专家分析与评分",
    ja: "VPN レビュー 2025 - 専門家分析",
    ko: "VPN 리뷰 2025 - 전문가 분석 및 평가",
    th: "รีวิว VPN 2025 - วิเคราะห์โดยผู้เชี่ยวชาญ",
  };

  const descriptions: Record<string, string> = {
    en: "Read our in-depth VPN reviews 2025. We test NordVPN, Surfshark, ExpressVPN & more for speed, security, streaming, and value. Find your perfect VPN.",
    nl: "Lees onze uitgebreide VPN reviews 2025. We testen NordVPN, Surfshark, ExpressVPN en meer op snelheid, beveiliging, streaming en waarde.",
    de: "Lesen Sie unsere ausführlichen VPN-Tests 2025. Wir testen NordVPN, Surfshark, ExpressVPN und mehr auf Geschwindigkeit, Sicherheit und Streaming.",
    es: "Lee nuestras reseñas detalladas de VPN 2025. Probamos NordVPN, Surfshark, ExpressVPN y más en velocidad, seguridad y streaming.",
    fr: "Lisez nos avis VPN approfondis 2025. Nous testons NordVPN, Surfshark, ExpressVPN et plus pour la vitesse, sécurité et streaming.",
    zh: "阅读我们的深度VPN评测2025。我们测试NordVPN、Surfshark、ExpressVPN等的速度、安全性和流媒体功能。",
    ja: "2025年の詳細なVPNレビューをご覧ください。NordVPN、Surfshark、ExpressVPNなどの速度、セキュリティ、ストリーミングをテスト。",
    ko: "2025년 심층 VPN 리뷰를 읽어보세요. NordVPN, Surfshark, ExpressVPN 등의 속도, 보안, 스트리밍을 테스트합니다.",
    th: "อ่านรีวิว VPN เชิงลึกของเรา 2025 เราทดสอบ NordVPN, Surfshark, ExpressVPN และอื่นๆ ด้านความเร็ว ความปลอดภัย และสตรีมมิ่ง",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "VPN reviews",
      "VPN comparison",
      "best VPN 2025",
      "NordVPN review",
      "Surfshark review",
      "ExpressVPN review",
      "VPN test",
      "VPN ratings",
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

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const vpns = await getAllVpns();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ComparisonTableSchema vpns={vpns} />
      <div className="py-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">VPN Reviews</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Honest, in-depth reviews of the most popular VPN services. Each VPN
              is tested for speed, security, streaming, and overall value.
            </p>
          </div>

          {/* VPN Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vpns.map((vpn, index) => (
              <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
