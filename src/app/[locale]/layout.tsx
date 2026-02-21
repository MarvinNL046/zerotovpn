import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { ExitIntentPopup } from "@/components/conversion/exit-intent-popup";
import { StickyCTABar } from "@/components/conversion/sticky-cta-bar";
import { NewsletterPopup } from "@/components/newsletter/newsletter-popup";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "ZeroToVPN - Best VPN Reviews & Comparisons 2026",
    nl: "ZeroToVPN - Beste VPN Reviews & Vergelijkingen 2026",
    de: "ZeroToVPN - Beste VPN Tests & Vergleiche 2026",
    es: "ZeroToVPN - Mejores Reseñas y Comparaciones de VPN 2026",
    fr: "ZeroToVPN - Meilleurs Avis et Comparaisons VPN 2026",
    zh: "ZeroToVPN - 2026年最佳VPN评测与比较",
    ja: "ZeroToVPN - 2026年ベストVPNレビュー＆比較",
    ko: "ZeroToVPN - 2026년 최고의 VPN 리뷰 및 비교",
    th: "ZeroToVPN - รีวิวและเปรียบเทียบ VPN ที่ดีที่สุด 2026",
  };

  const descriptions: Record<string, string> = {
    en: "Find the perfect VPN for your needs. Expert reviews, honest comparisons, and exclusive deals on top VPN services.",
    nl: "Vind de perfecte VPN voor jouw behoeften. Expert reviews, eerlijke vergelijkingen en exclusieve deals.",
    de: "Finden Sie das perfekte VPN für Ihre Bedürfnisse. Expertenbewertungen, ehrliche Vergleiche und exklusive Angebote.",
    es: "Encuentra la VPN perfecta para tus necesidades. Reseñas de expertos, comparaciones honestas y ofertas exclusivas.",
    fr: "Trouvez le VPN parfait pour vos besoins. Avis d'experts, comparaisons honnêtes et offres exclusives.",
    zh: "找到适合您需求的完美VPN。专家评测、诚实比较和独家优惠。",
    ja: "あなたのニーズに最適なVPNを見つけましょう。専門家レビュー、正直な比較、限定特典。",
    ko: "당신의 필요에 맞는 완벽한 VPN을 찾아보세요. 전문가 리뷰, 솔직한 비교, 독점 혜택.",
    th: "ค้นหา VPN ที่สมบูรณ์แบบสำหรับความต้องการของคุณ รีวิวจากผู้เชี่ยวชาญ เปรียบเทียบอย่างตรงไปตรงมา",
  };

  const baseUrl = "https://www.zerotovpn.com";

  // OG locale mapping (ISO 639-1 → Open Graph format)
  const ogLocaleMap: Record<string, string> = {
    en: "en_US", nl: "nl_NL", de: "de_DE", es: "es_ES",
    fr: "fr_FR", zh: "zh_CN", ja: "ja_JP", ko: "ko_KR", th: "th_TH",
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: "%s | ZeroToVPN",
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "VPN",
      "VPN review",
      "best VPN",
      "VPN comparison",
      "NordVPN",
      "Surfshark",
      "ExpressVPN",
      "CyberGhost",
      "ProtonVPN",
      "Private Internet Access",
      "online privacy",
      "internet security",
      "streaming VPN",
      "cheap VPN",
    ],
    authors: [{ name: "ZeroToVPN" }],
    creator: "ZeroToVPN",
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] || "en_US",
      siteName: "ZeroToVPN",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "ZeroToVPN - Best VPN Reviews & Comparisons",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`${baseUrl}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* Conversion optimization components */}
            <ExitIntentPopup />
            <StickyCTABar />
            <NewsletterPopup />
            {/* JSON-LD Structured Data - placed in body to avoid hydration issues */}
            <OrganizationJsonLd />
            <WebsiteJsonLd />
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
  );
}
