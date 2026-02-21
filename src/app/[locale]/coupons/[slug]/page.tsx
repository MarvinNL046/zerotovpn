import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { getVpnBySlug, getAllVpns } from "@/lib/vpn-data-layer";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import {
  CheckCircle,
  Shield,
  Server,
  Globe,
  Monitor,
  Zap,
  Clock,
  ArrowRight,
  Ticket,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

// Inline translations for all 9 locales
const translations = {
  en: {
    coupon: "Coupon",
    coupons: "Coupons",
    dealHighlight: "Current Deal",
    monthlyPrice: "Monthly",
    yearlyPrice: "1-Year Plan",
    twoYearPrice: "2-Year Plan",
    moneyBack: "Money-Back Guarantee",
    perMonth: "/mo",
    savingsLabel: "Save",
    offLabel: "off",
    ctaButton: "Claim This Deal",
    howToClaim: "How to Claim Your Discount",
    step1Title: "Click Our Exclusive Link",
    step1Desc: "Use the button above to visit the VPN website through our tracked link.",
    step2Title: "Choose Your Plan",
    step2Desc: "Select the plan that best fits your needs. Longer plans offer the best savings.",
    step3Title: "Discount Applied Automatically",
    step3Desc: "Our link automatically applies the best available discount. No coupon code needed.",
    quickSpecs: "Quick Specs",
    servers: "Servers",
    countries: "Countries",
    devices: "Devices",
    protocols: "Protocols",
    moneyBackInfo: "Money-Back Guarantee",
    moneyBackDesc: "days",
    faqTitle: "Frequently Asked Questions",
    relatedPages: "Explore More",
    reviewLink: "Full Review",
    reviewDesc: "Read our in-depth review with hands-on testing results.",
    compareLink: "Compare VPNs",
    compareDesc: "See how this VPN compares to top alternatives side by side.",
    couponsLink: "All VPN Coupons",
    couponsDesc: "Browse deals and discounts across all major VPN providers.",
    editorChoice: "Editor's Choice",
  },
  nl: {
    coupon: "Kortingscode",
    coupons: "Kortingscodes",
    dealHighlight: "Huidige Deal",
    monthlyPrice: "Per Maand",
    yearlyPrice: "1-Jaar Plan",
    twoYearPrice: "2-Jaar Plan",
    moneyBack: "Geld-Terug-Garantie",
    perMonth: "/mo",
    savingsLabel: "Bespaar",
    offLabel: "korting",
    ctaButton: "Claim Deze Deal",
    howToClaim: "Hoe Claim Je Je Korting",
    step1Title: "Klik Op Onze Exclusieve Link",
    step1Desc: "Gebruik de knop hierboven om de VPN-website via onze link te bezoeken.",
    step2Title: "Kies Je Abonnement",
    step2Desc: "Selecteer het plan dat het beste bij jouw behoeften past. Langere plannen bieden de beste besparingen.",
    step3Title: "Korting Automatisch Toegepast",
    step3Desc: "Onze link past automatisch de beste beschikbare korting toe. Geen kortingscode nodig.",
    quickSpecs: "Snelle Specificaties",
    servers: "Servers",
    countries: "Landen",
    devices: "Apparaten",
    protocols: "Protocollen",
    moneyBackInfo: "Geld-Terug-Garantie",
    moneyBackDesc: "dagen",
    faqTitle: "Veelgestelde Vragen",
    relatedPages: "Meer Ontdekken",
    reviewLink: "Volledige Review",
    reviewDesc: "Lees onze uitgebreide review met hands-on testresultaten.",
    compareLink: "Vergelijk VPNs",
    compareDesc: "Bekijk hoe deze VPN zich verhoudt tot top alternatieven.",
    couponsLink: "Alle VPN Kortingscodes",
    couponsDesc: "Bekijk deals en kortingen voor alle grote VPN-aanbieders.",
    editorChoice: "Redactiekeuze",
  },
  de: {
    coupon: "Gutschein",
    coupons: "Gutscheine",
    dealHighlight: "Aktuelles Angebot",
    monthlyPrice: "Monatlich",
    yearlyPrice: "1-Jahres-Plan",
    twoYearPrice: "2-Jahres-Plan",
    moneyBack: "Geld-zurück-Garantie",
    perMonth: "/Mo",
    savingsLabel: "Sparen",
    offLabel: "Rabatt",
    ctaButton: "Deal Beanspruchen",
    howToClaim: "Wie Du Deinen Rabatt Bekommst",
    step1Title: "Klicke auf Unseren Exklusiven Link",
    step1Desc: "Nutze den Button oben, um die VPN-Website über unseren Link zu besuchen.",
    step2Title: "Wähle Deinen Plan",
    step2Desc: "Wähle den Plan, der am besten zu deinen Bedürfnissen passt. Längere Pläne bieten die besten Ersparnisse.",
    step3Title: "Rabatt Wird Automatisch Angewendet",
    step3Desc: "Unser Link wendet automatisch den besten verfügbaren Rabatt an. Kein Gutscheincode erforderlich.",
    quickSpecs: "Schnelle Spezifikationen",
    servers: "Server",
    countries: "Länder",
    devices: "Geräte",
    protocols: "Protokolle",
    moneyBackInfo: "Geld-zurück-Garantie",
    moneyBackDesc: "Tage",
    faqTitle: "Häufig Gestellte Fragen",
    relatedPages: "Mehr Entdecken",
    reviewLink: "Vollständige Bewertung",
    reviewDesc: "Lesen Sie unsere ausführliche Bewertung mit Testergebnissen.",
    compareLink: "VPNs Vergleichen",
    compareDesc: "Vergleiche diesen VPN mit den besten Alternativen.",
    couponsLink: "Alle VPN-Gutscheine",
    couponsDesc: "Entdecke Deals und Rabatte für alle großen VPN-Anbieter.",
    editorChoice: "Redaktionswahl",
  },
  es: {
    coupon: "Cupón",
    coupons: "Cupones",
    dealHighlight: "Oferta Actual",
    monthlyPrice: "Mensual",
    yearlyPrice: "Plan 1 Año",
    twoYearPrice: "Plan 2 Años",
    moneyBack: "Garantía de Devolución",
    perMonth: "/mes",
    savingsLabel: "Ahorra",
    offLabel: "descuento",
    ctaButton: "Reclamar Esta Oferta",
    howToClaim: "Cómo Reclamar Tu Descuento",
    step1Title: "Haz Clic en Nuestro Enlace Exclusivo",
    step1Desc: "Usa el botón de arriba para visitar el sitio web del VPN a través de nuestro enlace.",
    step2Title: "Elige Tu Plan",
    step2Desc: "Selecciona el plan que mejor se adapte a tus necesidades. Los planes más largos ofrecen los mejores ahorros.",
    step3Title: "Descuento Aplicado Automáticamente",
    step3Desc: "Nuestro enlace aplica automáticamente el mejor descuento disponible. No necesitas código de cupón.",
    quickSpecs: "Especificaciones Rápidas",
    servers: "Servidores",
    countries: "Países",
    devices: "Dispositivos",
    protocols: "Protocolos",
    moneyBackInfo: "Garantía de Devolución",
    moneyBackDesc: "días",
    faqTitle: "Preguntas Frecuentes",
    relatedPages: "Explorar Más",
    reviewLink: "Reseña Completa",
    reviewDesc: "Lee nuestra reseña detallada con resultados de pruebas.",
    compareLink: "Comparar VPNs",
    compareDesc: "Compara este VPN con las mejores alternativas lado a lado.",
    couponsLink: "Todos los Cupones VPN",
    couponsDesc: "Explora ofertas y descuentos en todos los principales proveedores.",
    editorChoice: "Elección del Editor",
  },
  fr: {
    coupon: "Coupon",
    coupons: "Coupons",
    dealHighlight: "Offre Actuelle",
    monthlyPrice: "Mensuel",
    yearlyPrice: "Plan 1 An",
    twoYearPrice: "Plan 2 Ans",
    moneyBack: "Garantie de Remboursement",
    perMonth: "/mois",
    savingsLabel: "Économisez",
    offLabel: "de réduction",
    ctaButton: "Obtenir Cette Offre",
    howToClaim: "Comment Obtenir Votre Réduction",
    step1Title: "Cliquez sur Notre Lien Exclusif",
    step1Desc: "Utilisez le bouton ci-dessus pour visiter le site VPN via notre lien suivi.",
    step2Title: "Choisissez Votre Plan",
    step2Desc: "Sélectionnez le plan qui correspond le mieux à vos besoins. Les plans plus longs offrent les meilleures économies.",
    step3Title: "Réduction Appliquée Automatiquement",
    step3Desc: "Notre lien applique automatiquement la meilleure réduction disponible. Aucun code promo nécessaire.",
    quickSpecs: "Spécifications Rapides",
    servers: "Serveurs",
    countries: "Pays",
    devices: "Appareils",
    protocols: "Protocoles",
    moneyBackInfo: "Garantie de Remboursement",
    moneyBackDesc: "jours",
    faqTitle: "Questions Fréquemment Posées",
    relatedPages: "Explorer Davantage",
    reviewLink: "Avis Complet",
    reviewDesc: "Lisez notre avis détaillé avec les résultats de tests pratiques.",
    compareLink: "Comparer les VPNs",
    compareDesc: "Comparez ce VPN aux meilleures alternatives côte à côte.",
    couponsLink: "Tous les Coupons VPN",
    couponsDesc: "Parcourez les offres et réductions de tous les grands fournisseurs VPN.",
    editorChoice: "Choix de la Rédaction",
  },
  zh: {
    coupon: "优惠券",
    coupons: "优惠券",
    dealHighlight: "当前优惠",
    monthlyPrice: "按月",
    yearlyPrice: "1年计划",
    twoYearPrice: "2年计划",
    moneyBack: "退款保证",
    perMonth: "/月",
    savingsLabel: "节省",
    offLabel: "折扣",
    ctaButton: "获取此优惠",
    howToClaim: "如何获取折扣",
    step1Title: "点击我们的专属链接",
    step1Desc: "使用上方按钮通过我们的追踪链接访问VPN网站。",
    step2Title: "选择您的套餐",
    step2Desc: "选择最适合您需求的套餐。较长套餐提供最佳节省。",
    step3Title: "折扣自动应用",
    step3Desc: "我们的链接会自动应用最佳可用折扣。无需优惠券代码。",
    quickSpecs: "快速规格",
    servers: "服务器",
    countries: "国家",
    devices: "设备",
    protocols: "协议",
    moneyBackInfo: "退款保证",
    moneyBackDesc: "天",
    faqTitle: "常见问题",
    relatedPages: "探索更多",
    reviewLink: "完整评测",
    reviewDesc: "阅读我们包含实际测试结果的深度评测。",
    compareLink: "比较VPN",
    compareDesc: "并排查看此VPN与顶级替代品的比较。",
    couponsLink: "所有VPN优惠券",
    couponsDesc: "浏览所有主要VPN提供商的优惠和折扣。",
    editorChoice: "编辑推荐",
  },
  ja: {
    coupon: "クーポン",
    coupons: "クーポン",
    dealHighlight: "現在のお得情報",
    monthlyPrice: "月額",
    yearlyPrice: "1年プラン",
    twoYearPrice: "2年プラン",
    moneyBack: "返金保証",
    perMonth: "/月",
    savingsLabel: "節約",
    offLabel: "オフ",
    ctaButton: "このお得情報を入手",
    howToClaim: "割引の取得方法",
    step1Title: "専用リンクをクリック",
    step1Desc: "上のボタンを使って、当サイトのトラッキングリンク経由でVPNウェブサイトを訪問してください。",
    step2Title: "プランを選択",
    step2Desc: "ニーズに最も合ったプランを選択してください。長期プランが最もお得です。",
    step3Title: "割引は自動適用されます",
    step3Desc: "リンクが最適な割引を自動的に適用します。クーポンコードは不要です。",
    quickSpecs: "クイックスペック",
    servers: "サーバー",
    countries: "国",
    devices: "デバイス",
    protocols: "プロトコル",
    moneyBackInfo: "返金保証",
    moneyBackDesc: "日間",
    faqTitle: "よくある質問",
    relatedPages: "さらに探索",
    reviewLink: "詳細レビュー",
    reviewDesc: "実際のテスト結果を含む詳細なレビューをお読みください。",
    compareLink: "VPNを比較",
    compareDesc: "このVPNをトップの代替品と並べて比較してください。",
    couponsLink: "すべてのVPNクーポン",
    couponsDesc: "すべての主要VPNプロバイダーの割引をご覧ください。",
    editorChoice: "編集部のおすすめ",
  },
  ko: {
    coupon: "쿠폰",
    coupons: "쿠폰",
    dealHighlight: "현재 할인",
    monthlyPrice: "월간",
    yearlyPrice: "1년 플랜",
    twoYearPrice: "2년 플랜",
    moneyBack: "환불 보장",
    perMonth: "/월",
    savingsLabel: "절약",
    offLabel: "할인",
    ctaButton: "이 할인 받기",
    howToClaim: "할인 받는 방법",
    step1Title: "전용 링크 클릭",
    step1Desc: "위의 버튼을 사용하여 저희 추적 링크를 통해 VPN 웹사이트를 방문하세요.",
    step2Title: "플랜 선택",
    step2Desc: "필요에 가장 맞는 플랜을 선택하세요. 장기 플랜이 가장 많은 절약을 제공합니다.",
    step3Title: "할인 자동 적용",
    step3Desc: "링크가 자동으로 최적의 할인을 적용합니다. 쿠폰 코드가 필요 없습니다.",
    quickSpecs: "빠른 사양",
    servers: "서버",
    countries: "국가",
    devices: "기기",
    protocols: "프로토콜",
    moneyBackInfo: "환불 보장",
    moneyBackDesc: "일",
    faqTitle: "자주 묻는 질문",
    relatedPages: "더 탐색하기",
    reviewLink: "전체 리뷰",
    reviewDesc: "실제 테스트 결과가 포함된 심층 리뷰를 읽어보세요.",
    compareLink: "VPN 비교",
    compareDesc: "이 VPN을 상위 대안들과 나란히 비교해보세요.",
    couponsLink: "모든 VPN 쿠폰",
    couponsDesc: "모든 주요 VPN 제공업체의 할인을 찾아보세요.",
    editorChoice: "편집자 선택",
  },
  th: {
    coupon: "คูปอง",
    coupons: "คูปอง",
    dealHighlight: "ดีลปัจจุบัน",
    monthlyPrice: "รายเดือน",
    yearlyPrice: "แผน 1 ปี",
    twoYearPrice: "แผน 2 ปี",
    moneyBack: "รับประกันคืนเงิน",
    perMonth: "/เดือน",
    savingsLabel: "ประหยัด",
    offLabel: "ส่วนลด",
    ctaButton: "รับดีลนี้",
    howToClaim: "วิธีรับส่วนลดของคุณ",
    step1Title: "คลิกลิงก์พิเศษของเรา",
    step1Desc: "ใช้ปุ่มด้านบนเพื่อเยี่ยมชมเว็บไซต์ VPN ผ่านลิงก์ติดตามของเรา",
    step2Title: "เลือกแผนของคุณ",
    step2Desc: "เลือกแผนที่เหมาะกับความต้องการของคุณที่สุด แผนระยะยาวให้ส่วนลดดีที่สุด",
    step3Title: "ส่วนลดถูกใช้โดยอัตโนมัติ",
    step3Desc: "ลิงก์ของเราจะใช้ส่วนลดที่ดีที่สุดโดยอัตโนมัติ ไม่ต้องใช้รหัสคูปอง",
    quickSpecs: "สเปคด่วน",
    servers: "เซิร์ฟเวอร์",
    countries: "ประเทศ",
    devices: "อุปกรณ์",
    protocols: "โปรโตคอล",
    moneyBackInfo: "รับประกันคืนเงิน",
    moneyBackDesc: "วัน",
    faqTitle: "คำถามที่พบบ่อย",
    relatedPages: "สำรวจเพิ่มเติม",
    reviewLink: "รีวิวฉบับเต็ม",
    reviewDesc: "อ่านรีวิวเชิงลึกของเราพร้อมผลการทดสอบจริง",
    compareLink: "เปรียบเทียบ VPN",
    compareDesc: "ดูการเปรียบเทียบ VPN นี้กับตัวเลือกอื่นแบบเคียงข้างกัน",
    couponsLink: "คูปอง VPN ทั้งหมด",
    couponsDesc: "ดูดีลและส่วนลดจากผู้ให้บริการ VPN รายใหญ่ทั้งหมด",
    editorChoice: "ตัวเลือกของบรรณาธิการ",
  },
};

export async function generateStaticParams() {
  const vpns = await getAllVpns();
  const locales = ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"];
  return vpns.flatMap((vpn) =>
    locales.map((locale) => ({ locale, slug: vpn.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const vpn = await getVpnBySlug(slug);
  if (!vpn) return { title: "Not Found" };

  const shortMonthYear = getShortMonthYear();
  const savingsPct =
    vpn.priceTwoYear != null
      ? Math.round((1 - vpn.priceTwoYear / vpn.priceMonthly) * 100)
      : Math.round((1 - vpn.priceYearly / vpn.priceMonthly) * 100);

  const titleMap: Record<string, string> = {
    en: `${vpn.name} Coupon & Discount Code (${shortMonthYear}) - Save up to ${savingsPct}%`,
    nl: `${vpn.name} Kortingscode (${shortMonthYear}) - Bespaar tot ${savingsPct}%`,
    de: `${vpn.name} Gutschein (${shortMonthYear}) - Sparen Sie bis zu ${savingsPct}%`,
    es: `Cupón ${vpn.name} (${shortMonthYear}) - Ahorra hasta ${savingsPct}%`,
    fr: `Code Promo ${vpn.name} (${shortMonthYear}) - Économisez jusqu'à ${savingsPct}%`,
    zh: `${vpn.name}优惠券 (${shortMonthYear}) - 节省高达${savingsPct}%`,
    ja: `${vpn.name}クーポン (${shortMonthYear}) - 最大${savingsPct}%割引`,
    ko: `${vpn.name} 쿠폰 (${shortMonthYear}) - 최대 ${savingsPct}% 할인`,
    th: `คูปอง ${vpn.name} (${shortMonthYear}) - ประหยัดสูงสุด ${savingsPct}%`,
  };

  const descMap: Record<string, string> = {
    en: `Get the best ${vpn.name} deal. Save up to ${savingsPct}% with our exclusive link. ${vpn.moneyBackDays}-day money-back guarantee. No coupon code needed.`,
    nl: `Krijg de beste ${vpn.name}-deal. Bespaar tot ${savingsPct}% met onze exclusieve link. ${vpn.moneyBackDays} dagen geld-terug-garantie. Geen kortingscode nodig.`,
    de: `Holen Sie sich das beste ${vpn.name}-Angebot. Sparen Sie bis zu ${savingsPct}% mit unserem exklusiven Link. ${vpn.moneyBackDays}-tägige Geld-zurück-Garantie. Kein Gutscheincode erforderlich.`,
    es: `Obtén la mejor oferta de ${vpn.name}. Ahorra hasta ${savingsPct}% con nuestro enlace exclusivo. Garantía de devolución de ${vpn.moneyBackDays} días. Sin código de cupón necesario.`,
    fr: `Obtenez la meilleure offre ${vpn.name}. Économisez jusqu'à ${savingsPct}% avec notre lien exclusif. Garantie de remboursement de ${vpn.moneyBackDays} jours. Aucun code promo nécessaire.`,
    zh: `获取最佳${vpn.name}优惠。通过我们的专属链接节省高达${savingsPct}%。${vpn.moneyBackDays}天退款保证。无需优惠券代码。`,
    ja: `最高の${vpn.name}のお得情報を入手。専用リンクで最大${savingsPct}%節約。${vpn.moneyBackDays}日間の返金保証。クーポンコード不要。`,
    ko: `최고의 ${vpn.name} 할인을 받으세요. 전용 링크로 최대 ${savingsPct}% 절약. ${vpn.moneyBackDays}일 환불 보장. 쿠폰 코드 불필요.`,
    th: `รับดีล ${vpn.name} ที่ดีที่สุด ประหยัดสูงสุด ${savingsPct}% ด้วยลิงก์พิเศษของเรา รับประกันคืนเงิน ${vpn.moneyBackDays} วัน ไม่ต้องใช้รหัสคูปอง`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titleMap[locale] || titleMap.en,
    description: descMap[locale] || descMap.en,
    keywords: [
      `${vpn.name} coupon`,
      `${vpn.name} discount`,
      `${vpn.name} promo code`,
      `${vpn.name} deal`,
      `${vpn.name} coupon code 2026`,
      `${vpn.name} discount code`,
      "VPN coupon",
      "VPN discount",
    ],
    alternates: generateAlternates(`/coupons/${slug}`, locale),
    openGraph: {
      title: titleMap[locale] || titleMap.en,
      description: descMap[locale] || descMap.en,
      url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}/coupons/${slug}`,
      siteName: "ZeroToVPN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleMap[locale] || titleMap.en,
      description: descMap[locale] || descMap.en,
    },
  };
}

export default async function CouponSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vpn = await getVpnBySlug(slug);
  if (!vpn) notFound();

  const t = translations[locale as keyof typeof translations] ?? translations.en;
  const shortMonthYear = getShortMonthYear();

  // Calculate savings vs monthly price
  const savingsPct =
    vpn.priceTwoYear != null
      ? Math.round((1 - vpn.priceTwoYear / vpn.priceMonthly) * 100)
      : Math.round((1 - vpn.priceYearly / vpn.priceMonthly) * 100);

  const faqs = [
    {
      question: `Is there a ${vpn.name} coupon code for 2026?`,
      answer: `Yes! Our exclusive ${vpn.name} link automatically applies the best available discount for 2026 — up to ${savingsPct}% off. No separate coupon code is required. Simply click our link and choose the 2-year plan for maximum savings.`,
    },
    {
      question: `What is the best ${vpn.name} discount right now?`,
      answer: `The best ${vpn.name} discount available right now is up to ${savingsPct}% off on the long-term plan, bringing the price down to as low as $${vpn.priceTwoYear ?? vpn.priceYearly}/month. This is accessible exclusively through our affiliate link.`,
    },
    {
      question: `Does ${vpn.name} offer a free trial?`,
      answer: `${vpn.name} ${vpn.freeTier ? "offers a free tier with limited features" : "does not offer a traditional free trial"}, but it does come with a ${vpn.moneyBackDays}-day money-back guarantee. You can try it risk-free and get a full refund if you're not satisfied.`,
    },
    {
      question: `How do I apply the ${vpn.name} discount?`,
      answer: `No action is needed on your part. Simply click the "Claim This Deal" button on this page to visit ${vpn.name}'s website. Our tracked link automatically activates the best available discount. Choose your preferred plan and complete the checkout process.`,
    },
    {
      question: `Is ${vpn.name} worth the price?`,
      answer: `${vpn.name} is rated ${vpn.overallRating}/5 by our editorial team. It offers ${vpn.servers.toLocaleString()} servers across ${vpn.countries} countries and supports up to ${vpn.maxDevices} simultaneous devices. With a ${vpn.moneyBackDays}-day money-back guarantee, you can try it risk-free at the discounted rate.`,
    },
  ];

  const relatedPages = [
    {
      title: `${vpn.name} ${locale === "en" ? "Review" : t.reviewLink}`,
      description: t.reviewDesc,
      href: `/reviews/${slug}`,
      icon: "document" as const,
    },
    {
      title: t.compareLink,
      description: t.compareDesc,
      href: `/`,
      icon: "star" as const,
    },
    {
      title: t.couponsLink,
      description: t.couponsDesc,
      href: `/coupons`,
      icon: "tag" as const,
    },
  ];

  return (
    <div className="py-8">
      <div className="container max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <BreadcrumbSchema
          items={[
            { name: t.coupons, href: "/coupons" },
            { name: `${vpn.name} ${t.coupon}`, href: `/coupons/${slug}` },
          ]}
          className="mb-6"
        />

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <VpnLogo name={vpn.name} size="lg" />
            {vpn.editorChoice && (
              <Badge className="bg-yellow-500 text-yellow-950">
                {t.editorChoice}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {vpn.name} {t.coupon} &amp; Discount Code ({shortMonthYear})
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "en"
              ? `Save up to ${savingsPct}% with our exclusive ${vpn.name} deal. No coupon code needed — discount applied automatically.`
              : `${t.savingsLabel} ${savingsPct}% ${t.offLabel}.`}
          </p>
        </div>

        {/* Deal Highlight Card */}
        <Card className="mb-8 border-2 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Ticket className="h-5 w-5 text-primary" />
              {t.dealHighlight}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Monthly Price */}
              <div className="text-center p-4 rounded-lg bg-background border">
                <p className="text-sm text-muted-foreground mb-1">{t.monthlyPrice}</p>
                <p className="text-2xl font-bold">
                  ${vpn.priceMonthly.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">{t.perMonth}</span>
                </p>
              </div>

              {/* Yearly Price */}
              <div className="text-center p-4 rounded-lg bg-background border">
                <p className="text-sm text-muted-foreground mb-1">{t.yearlyPrice}</p>
                <p className="text-2xl font-bold text-primary">
                  ${vpn.priceYearly.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">{t.perMonth}</span>
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {t.savingsLabel} {Math.round((1 - vpn.priceYearly / vpn.priceMonthly) * 100)}% {t.offLabel}
                </p>
              </div>

              {/* 2-Year Price (if available) */}
              {vpn.priceTwoYear != null ? (
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs whitespace-nowrap">
                    Best Value
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-1">{t.twoYearPrice}</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${vpn.priceTwoYear.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">{t.perMonth}</span>
                  </p>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    {t.savingsLabel} {savingsPct}% {t.offLabel}
                  </p>
                </div>
              ) : (
                <div className="text-center p-4 rounded-lg bg-background border flex items-center justify-center">
                  <div className="text-sm text-muted-foreground">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p>{vpn.moneyBackDays}-day</p>
                    <p>{t.moneyBack}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <AffiliateButton
                vpnId={vpn.slug}
                vpnName={vpn.name}
                affiliateUrl={vpn.affiliateUrl}
                size="lg"
                className="text-lg px-10 py-6 h-auto font-bold"
              >
                <Ticket className="mr-2 h-5 w-5" />
                {t.ctaButton} — {t.savingsLabel} {savingsPct}%
              </AffiliateButton>
              <p className="text-sm text-muted-foreground mt-2">
                {vpn.moneyBackDays}-{locale === "en" ? "day money-back guarantee" : `${t.moneyBackDesc} ${t.moneyBack}`}
                {" · "}
                {locale === "en" ? "No coupon code required" : ""}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Claim Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t.howToClaim}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step1Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.step1Desc}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step2Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.step2Desc}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step3Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.step3Desc}</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Quick Specs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              {t.quickSpecs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Server className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xl font-bold">{vpn.servers.toLocaleString()}+</p>
                <p className="text-sm text-muted-foreground">{t.servers}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xl font-bold">{vpn.countries}</p>
                <p className="text-sm text-muted-foreground">{t.countries}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Monitor className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xl font-bold">{vpn.maxDevices}</p>
                <p className="text-sm text-muted-foreground">{t.devices}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xl font-bold">{vpn.protocols.length}</p>
                <p className="text-sm text-muted-foreground">{t.protocols}</p>
              </div>
            </div>

            {/* Protocols List */}
            <div className="mt-4 flex flex-wrap gap-2">
              {vpn.protocols.map((protocol) => (
                <Badge key={protocol} variant="secondary">
                  {protocol}
                </Badge>
              ))}
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-green-700 dark:text-green-400">
                  {vpn.moneyBackDays}-{t.moneyBackDesc} {t.moneyBackInfo}
                </span>
                {" — "}
                {locale === "en"
                  ? `Try ${vpn.name} completely risk-free for ${vpn.moneyBackDays} days.`
                  : `${vpn.name} risk-free.`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Second CTA */}
        <div className="text-center mb-10 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-lg font-semibold mb-3">
            {locale === "en"
              ? `Ready to save ${savingsPct}% on ${vpn.name}?`
              : `${t.savingsLabel} ${savingsPct}% ${t.offLabel}`}
          </p>
          <AffiliateButton
            vpnId={vpn.slug}
            vpnName={vpn.name}
            affiliateUrl={vpn.affiliateUrl}
            size="lg"
            className="px-8"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            {t.ctaButton}
          </AffiliateButton>
        </div>

        {/* FAQ Section */}
        <FAQSchema
          faqs={faqs}
          title={t.faqTitle}
          className="mb-10"
        />

        {/* Related Pages */}
        <RelatedPages
          title={t.relatedPages}
          pages={relatedPages}
          className="mb-10"
        />
      </div>
    </div>
  );
}
