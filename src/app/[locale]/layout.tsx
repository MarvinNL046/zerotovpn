import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
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
    en: "ZeroToVPN - Best VPN Reviews & Comparisons 2025",
    nl: "ZeroToVPN - Beste VPN Reviews & Vergelijkingen 2025",
    de: "ZeroToVPN - Beste VPN Tests & Vergleiche 2025",
    es: "ZeroToVPN - Mejores Reseñas y Comparaciones de VPN 2025",
    fr: "ZeroToVPN - Meilleurs Avis et Comparaisons VPN 2025",
    zh: "ZeroToVPN - 2025年最佳VPN评测与比较",
    ja: "ZeroToVPN - 2025年ベストVPNレビュー＆比較",
    ko: "ZeroToVPN - 2025년 최고의 VPN 리뷰 및 비교",
    th: "ZeroToVPN - รีวิวและเปรียบเทียบ VPN ที่ดีที่สุด 2025",
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

  const baseUrl = "https://zerotovpn.com";
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = l === "en" ? baseUrl : `${baseUrl}/${l}`;
  });

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
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
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
    <>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#3b82f6" />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col" lang={locale}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  );
}
