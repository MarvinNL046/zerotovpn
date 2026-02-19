import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnBySlug, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { getShortMonthYear, generateAlternates } from "@/lib/seo-utils";
import { LastUpdated } from "@/components/last-updated";
import {
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  XCircle,
  HelpCircle,
  DollarSign,
  Server,
  Monitor,
  Globe,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const shortMonthYear = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `5 Cheapest VPNs (Tested ${shortMonthYear}) - Best Budget From $1.99/mo | ZeroToVPN`,
    nl: `5 Goedkoopste VPNs (Getest ${shortMonthYear}) - Budget Vanaf $1,99/maand | ZeroToVPN`,
    de: `5 Günstigste VPNs (Getestet ${shortMonthYear}) - Budget Ab $1,99/Monat | ZeroToVPN`,
    es: `5 VPNs Más Baratos (Probados ${shortMonthYear}) - Económicos Desde $1,99/mes | ZeroToVPN`,
    fr: `5 VPNs les Moins Chers (Testés ${shortMonthYear}) - Budget Dès $1,99/mois | ZeroToVPN`,
    zh: `5款最便宜VPN (测试于 ${shortMonthYear}) - 低至$1.99/月 | ZeroToVPN`,
    ja: `5つの最安VPN (テスト済み ${shortMonthYear}) - 月額$1.99から | ZeroToVPN`,
    ko: `5가지 가장 저렴한 VPN (테스트됨 ${shortMonthYear}) - 월 $1.99부터 | ZeroToVPN`,
    th: `5 VPN ราคาถูกที่สุด (ทดสอบ ${shortMonthYear}) - เริ่มต้น $1.99/เดือน | ZeroToVPN`,
  };

  const descriptions: Record<string, string> = {
    en: `We tested budget VPNs under $3/month. Expert picks updated ${shortMonthYear} with speeds, streaming & security compared. Best value picks from $1.99/mo.`,
    nl: "Op zoek naar een goedkope VPN die echt werkt? We testten budget VPNs onder $3/maand op snelheid, streaming, beveiliging en privacy. Deze 5 bieden de beste waarde.",
    de: "Auf der Suche nach einem gunstigen VPN? Wir haben Budget-VPNs unter $3/Monat auf Geschwindigkeit, Streaming, Sicherheit und Datenschutz getestet.",
    es: "Buscas un VPN barato que funcione? Probamos VPNs economicos por menos de $3/mes en velocidad, streaming, seguridad y privacidad.",
    fr: "Vous cherchez un VPN pas cher? Nous avons teste des VPN a moins de $3/mois pour la vitesse, le streaming, la securite et la confidentialite.",
    zh: "寻找真正好用的便宜VPN？我们测试了月费低于$3的VPN的速度、流媒体、安全性和隐私。这5款在2026年提供最佳性价比。",
    ja: "安くて使えるVPNをお探しですか？月額$3以下の低価格VPNを速度、ストリーミング、セキュリティ、プライバシーでテスト。2026年最高のコスパ5選。",
    ko: "실제로 작동하는 저렴한 VPN을 찾고 계신가요? 월 $3 이하의 예산 VPN을 속도, 스트리밍, 보안, 개인정보 보호 측면에서 테스트했습니다.",
    th: "มองหา VPN ราคาถูกที่ใช้งานได้จริง? เราทดสอบ VPN งบประมาณต่ำกว่า $3/เดือน ด้านความเร็ว สตรีมมิ่ง ความปลอดภัย และความเป็นส่วนตัว",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
    alternates: generateAlternates("/best/vpn-cheap", locale),
  };
}

function ItemListSchema({ vpns }: { vpns: { vpn: VpnProvider | null }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cheapest VPN Services 2026",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.vpn?.name || "",
      url: `https://zerotovpn.com/reviews/${item.vpn?.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function VpnCheapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const surfshark = await getVpnBySlug("surfshark");
  const cyberghost = await getVpnBySlug("cyberghost");
  const nordvpn = await getVpnBySlug("nordvpn");
  const protonvpn = await getVpnBySlug("protonvpn");
  const privateInternetAccess = await getVpnBySlug("private-internet-access");

  const cheapVpns = [
    {
      vpn: surfshark,
      badge: "Best Value",
      badgeColor: "green",
      monthlyPrice: "$1.99",
      planLength: "2 years",
      devices: "Unlimited",
      servers: "3,200+",
      streaming: true,
      torrenting: true,
      speed: "88 Mbps",
      moneyBack: "30 days",
    },
    {
      vpn: cyberghost,
      badge: "Best Long-Term",
      badgeColor: "blue",
      monthlyPrice: "$2.19",
      planLength: "2 years",
      devices: "7",
      servers: "9,000+",
      streaming: true,
      torrenting: true,
      speed: "82 Mbps",
      moneyBack: "45 days",
    },
    {
      vpn: privateInternetAccess,
      badge: "Most Servers",
      badgeColor: "purple",
      monthlyPrice: "$2.03",
      planLength: "3 years",
      devices: "Unlimited",
      servers: "35,000+",
      streaming: true,
      torrenting: true,
      speed: "76 Mbps",
      moneyBack: "30 days",
    },
    {
      vpn: nordvpn,
      badge: "Best Overall",
      badgeColor: "yellow",
      monthlyPrice: "$2.99",
      planLength: "2 years",
      devices: "10",
      servers: "6,000+",
      streaming: true,
      torrenting: true,
      speed: "92 Mbps",
      moneyBack: "30 days",
    },
    {
      vpn: protonvpn,
      badge: "Best Free Tier",
      badgeColor: "red",
      monthlyPrice: "$3.99",
      planLength: "2 years",
      devices: "10",
      servers: "2,900+",
      streaming: true,
      torrenting: true,
      speed: "78 Mbps",
      moneyBack: "30 days",
    },
  ];

  const content = {
    en: {
      badge: "Updated February 2026",
      title: "Cheapest VPNs in 2026",
      subtitle:
        "You do not need to spend $10+/month on a VPN. These 5 budget options start at just $1.99/month and still deliver excellent speeds, streaming support, and strong security.",
      topPicks: "Top Budget VPNs",
      priceTitle: "Price Comparison",
      priceDesc: "All prices shown are for the cheapest available plan (usually 2-3 year commitment).",
      tableHeaders: { vpn: "VPN", price: "Price/mo", plan: "Plan", devices: "Devices", servers: "Servers", streaming: "Streaming", torrenting: "P2P", moneyBack: "Refund" },
      tradeoffTitle: "Cheap vs Premium: What You Get and What You Lose",
      tradeoffGet: [
        "AES-256 encryption (same as expensive VPNs)",
        "Kill switch and DNS leak protection",
        "No-logs policies (audited)",
        "Streaming support (Netflix, Disney+, etc.)",
        "P2P/torrenting support",
        "Apps for all major platforms",
      ],
      tradeoffLose: [
        "Slightly slower speeds vs top-tier (5-15% difference)",
        "Fewer advanced features (some lack port forwarding)",
        "Smaller server networks (except PIA)",
        "Customer support may be slower",
        "Requires longer commitment (2-3 years) for best price",
      ],
      tradeoffGetTitle: "What You Still Get",
      tradeoffLoseTitle: "Potential Tradeoffs",
      faqTitle: "Cheap VPN FAQs",
      faqs: [
        {
          question: "Is a cheap VPN safe to use?",
          answer: "Yes, all VPNs on our list use AES-256 encryption, have audited no-logs policies, and include kill switches. Being cheap does not mean insecure. Avoid free VPNs though, as many monetize by selling user data. Budget VPNs like Surfshark and CyberGhost are much safer than free alternatives.",
        },
        {
          question: "Why are some VPNs so cheap?",
          answer: "Budget VPNs achieve low prices by offering discounts on long-term plans (2-3 years paid upfront). The monthly price for Surfshark is $15.45 but drops to $1.99/month on a 2-year plan. They also have lower marketing budgets compared to ExpressVPN.",
        },
        {
          question: "What is the cheapest VPN overall?",
          answer: "Surfshark at $1.99/month (2-year plan) is the cheapest premium VPN in 2026 that we recommend. It offers unlimited devices, fast speeds, and unblocks Netflix and other streaming services. For a free option, ProtonVPN has a limited free tier.",
        },
        {
          question: "Can cheap VPNs unblock Netflix?",
          answer: "Yes. Surfshark, CyberGhost, NordVPN, and PIA all successfully unblock Netflix US and other libraries. Cheap does not mean they cannot stream - all our recommended budget VPNs are tested monthly for streaming compatibility.",
        },
        {
          question: "Should I get a free VPN instead?",
          answer: "We do not recommend free VPNs for most users. They typically have severe data limits (500MB-2GB/month), very slow speeds, and many sell your browsing data. ProtonVPN is the only trustworthy free option but its free tier lacks streaming support. Surfshark at $1.99/month is a much better investment.",
        },
      ],
      getVpnButton: "Get",
      ctaTitle: "Get Premium VPN Protection for Less",
      ctaSubtitle: "No need to overpay. These budget VPNs deliver the same encryption, speed, and streaming access as expensive alternatives.",
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: February 2026",
    },
    nl: {
      badge: "Bijgewerkt februari 2026", title: "Goedkoopste VPNs in 2026",
      subtitle: "Je hoeft geen $10+/maand uit te geven aan een VPN. Deze 5 budgetopties beginnen bij slechts $1,99/maand en leveren uitstekende snelheden, streaming ondersteuning en sterke beveiliging.",
      topPicks: "Top Budget VPNs", priceTitle: "Prijsvergelijking", priceDesc: "Alle prijzen zijn voor het goedkoopste beschikbare abonnement (meestal 2-3 jaar).",
      tableHeaders: { vpn: "VPN", price: "Prijs/ma", plan: "Plan", devices: "Apparaten", servers: "Servers", streaming: "Streaming", torrenting: "P2P", moneyBack: "Restitutie" },
      tradeoffTitle: "Goedkoop vs Premium: Wat Je Krijgt en Wat Je Mist",
      tradeoffGet: ["AES-256 versleuteling", "Kill switch en DNS lekbescherming", "No-logs beleid (geauditeerd)", "Streaming ondersteuning", "P2P/torrenting ondersteuning", "Apps voor alle platforms"],
      tradeoffLose: ["Iets lagere snelheden (5-15% verschil)", "Minder geavanceerde functies", "Kleinere servernetwerken (behalve PIA)", "Klantenservice kan trager zijn", "Vereist langere verplichting (2-3 jaar)"],
      tradeoffGetTitle: "Wat Je Nog Steeds Krijgt", tradeoffLoseTitle: "Mogelijke Compromissen",
      faqTitle: "Goedkope VPN Veelgestelde Vragen",
      faqs: [
        { question: "Is een goedkope VPN veilig?", answer: "Ja, alle VPNs op onze lijst gebruiken AES-256 versleuteling, hebben geauditeerde no-logs beleids en bevatten kill switches. Goedkoop betekent niet onveilig." },
        { question: "Waarom zijn sommige VPNs zo goedkoop?", answer: "Budget VPNs bereiken lage prijzen door kortingen op langetermijnplannen (2-3 jaar vooraf betaald)." },
        { question: "Wat is de goedkoopste VPN?", answer: "Surfshark voor $1,99/maand (2-jarig plan) is de goedkoopste premium VPN die we aanbevelen in 2026." },
        { question: "Kunnen goedkope VPNs Netflix deblokkeren?", answer: "Ja. Surfshark, CyberGhost, NordVPN en PIA deblokkeren allemaal Netflix US en andere bibliotheken." },
        { question: "Moet ik een gratis VPN nemen?", answer: "We raden gratis VPNs niet aan. Ze hebben meestal strenge datalimieten en trage snelheden. Surfshark voor $1,99/maand is een veel betere investering." },
      ],
      getVpnButton: "Krijg", ctaTitle: "Premium VPN Bescherming voor Minder", ctaSubtitle: "Niet te veel betalen. Deze budget VPNs leveren dezelfde encryptie en streaming.",
      viewAllVpns: "Bekijk Alle VPN Reviews", lastUpdated: "Laatst bijgewerkt: februari 2026",
    },
    de: {
      badge: "Aktualisiert Februar 2026", title: "Gunstigste VPNs in 2026",
      subtitle: "Sie mussen kein $10+/Monat fur ein VPN ausgeben. Diese 5 Budget-Optionen starten bei nur $1,99/Monat.",
      topPicks: "Top Budget VPNs", priceTitle: "Preisvergleich", priceDesc: "Alle Preise gelten fur den gunstigsten Plan (meist 2-3 Jahre).",
      tableHeaders: { vpn: "VPN", price: "Preis/Mo", plan: "Plan", devices: "Gerate", servers: "Server", streaming: "Streaming", torrenting: "P2P", moneyBack: "Erstattung" },
      tradeoffTitle: "Gunstig vs Premium: Was Sie Bekommen und Was Nicht", tradeoffGet: ["AES-256 Verschlusselung", "Kill Switch und DNS-Leckschutz", "No-Logs-Richtlinie", "Streaming-Unterstutzung", "P2P-Unterstutzung", "Apps fur alle Plattformen"],
      tradeoffLose: ["Etwas langsamere Geschwindigkeiten", "Weniger erweiterte Funktionen", "Kleinere Servernetzwerke", "Langsamerer Support", "Langere Verpflichtung"],
      tradeoffGetTitle: "Was Sie Bekommen", tradeoffLoseTitle: "Mogliche Kompromisse",
      faqTitle: "Haufige Fragen",
      faqs: [
        { question: "Ist ein gunstiges VPN sicher?", answer: "Ja, alle VPNs verwenden AES-256 Verschlusselung und haben auditierte No-Logs-Richtlinien." },
        { question: "Warum sind manche VPNs so gunstig?", answer: "Budget-VPNs erzielen niedrige Preise durch Rabatte auf Langzeitplane." },
        { question: "Was ist das gunstigste VPN?", answer: "Surfshark fur $1,99/Monat (2-Jahres-Plan)." },
        { question: "Konnen gunstige VPNs Netflix entsperren?", answer: "Ja, alle unsere empfohlenen Budget-VPNs entsperren Netflix." },
        { question: "Sollte ich ein kostenloses VPN nehmen?", answer: "Nicht empfohlen. Surfshark fur $1,99/Monat ist viel besser." },
      ],
      getVpnButton: "Holen", ctaTitle: "Premium VPN-Schutz Fur Weniger", ctaSubtitle: "Nicht zu viel bezahlen.",
      viewAllVpns: "Alle Bewertungen", lastUpdated: "Zuletzt aktualisiert: Februar 2026",
    },
    es: {
      badge: "Actualizado febrero 2026", title: "VPNs Mas Baratos en 2026",
      subtitle: "No necesitas gastar $10+/mes en un VPN. Estas 5 opciones economicas comienzan desde $1,99/mes.",
      topPicks: "Mejores VPNs Economicos", priceTitle: "Comparacion de Precios", priceDesc: "Precios mostrados para el plan mas barato (2-3 anos).",
      tableHeaders: { vpn: "VPN", price: "Precio/mes", plan: "Plan", devices: "Dispositivos", servers: "Servidores", streaming: "Streaming", torrenting: "P2P", moneyBack: "Reembolso" },
      tradeoffTitle: "Barato vs Premium", tradeoffGet: ["Encriptacion AES-256", "Kill switch y proteccion DNS", "Sin registros (auditado)", "Soporte streaming", "Soporte P2P", "Apps para todas las plataformas"],
      tradeoffLose: ["Velocidades ligeramente menores", "Menos funciones avanzadas", "Redes de servidores mas pequenas", "Soporte mas lento", "Compromiso mas largo"],
      tradeoffGetTitle: "Lo Que Obtienes", tradeoffLoseTitle: "Posibles Sacrificios",
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        { question: "Es seguro un VPN barato?", answer: "Si, todos usan encriptacion AES-256 y politicas sin registros auditadas." },
        { question: "Por que son tan baratos?", answer: "Ofrecen descuentos en planes a largo plazo (2-3 anos)." },
        { question: "Cual es el mas barato?", answer: "Surfshark a $1,99/mes (plan de 2 anos)." },
        { question: "Pueden desbloquear Netflix?", answer: "Si, todos desbloquean Netflix US y otras bibliotecas." },
        { question: "Deberia usar un VPN gratis?", answer: "No recomendado. Surfshark a $1,99/mes es mucho mejor." },
      ],
      getVpnButton: "Obtener", ctaTitle: "Proteccion VPN Premium por Menos", ctaSubtitle: "No pagues de mas.",
      viewAllVpns: "Ver Todas las Resenas", lastUpdated: "Ultima actualizacion: febrero 2026",
    },
    fr: {
      badge: "Mis a jour fevrier 2026", title: "VPN les Moins Chers en 2026",
      subtitle: "Pas besoin de depenser $10+/mois pour un VPN. Ces 5 options budget commencent a $1,99/mois.",
      topPicks: "Meilleurs VPN Budget", priceTitle: "Comparaison des Prix", priceDesc: "Prix affiches pour le plan le moins cher (2-3 ans).",
      tableHeaders: { vpn: "VPN", price: "Prix/mois", plan: "Plan", devices: "Appareils", servers: "Serveurs", streaming: "Streaming", torrenting: "P2P", moneyBack: "Remboursement" },
      tradeoffTitle: "Budget vs Premium", tradeoffGet: ["Chiffrement AES-256", "Kill switch et protection DNS", "Sans logs (audite)", "Support streaming", "Support P2P", "Apps pour toutes les plateformes"],
      tradeoffLose: ["Vitesses legerement inferieures", "Moins de fonctionnalites avancees", "Reseaux de serveurs plus petits", "Support plus lent", "Engagement plus long"],
      tradeoffGetTitle: "Ce Que Vous Obtenez", tradeoffLoseTitle: "Compromis Possibles",
      faqTitle: "FAQ",
      faqs: [
        { question: "Un VPN pas cher est-il sur?", answer: "Oui, tous utilisent le chiffrement AES-256 et des politiques sans logs auditees." },
        { question: "Pourquoi certains VPN sont-ils si bon marche?", answer: "Ils offrent des reductions sur les plans long terme (2-3 ans)." },
        { question: "Quel est le moins cher?", answer: "Surfshark a $1,99/mois (plan 2 ans)." },
        { question: "Peuvent-ils debloquer Netflix?", answer: "Oui, tous debloquent Netflix US et d'autres bibliotheques." },
        { question: "Devrais-je prendre un VPN gratuit?", answer: "Non recommande. Surfshark a $1,99/mois est bien meilleur." },
      ],
      getVpnButton: "Obtenir", ctaTitle: "Protection VPN Premium Pour Moins", ctaSubtitle: "Ne payez pas trop.",
      viewAllVpns: "Voir Tous les Avis", lastUpdated: "Derniere mise a jour : fevrier 2026",
    },
    zh: {
      badge: "2026年2月更新", title: "2026年最便宜的VPN", subtitle: "你不需要每月花$10+购买VPN。这5个预算选项从$1.99/月起。",
      topPicks: "最佳预算VPN", priceTitle: "价格比较", priceDesc: "所有价格为最便宜方案（通常2-3年）。",
      tableHeaders: { vpn: "VPN", price: "价格/月", plan: "方案", devices: "设备", servers: "服务器", streaming: "流媒体", torrenting: "P2P", moneyBack: "退款" },
      tradeoffTitle: "便宜vs高级：你得到什么和失去什么", tradeoffGet: ["AES-256加密", "Kill Switch和DNS泄漏保护", "无日志政策（已审计）", "流媒体支持", "P2P支持", "所有平台应用"],
      tradeoffLose: ["速度略低（差5-15%）", "高级功能较少", "服务器网络较小", "客服可能较慢", "需要更长承诺期"],
      tradeoffGetTitle: "你仍然获得", tradeoffLoseTitle: "可能的权衡",
      faqTitle: "常见问题",
      faqs: [
        { question: "便宜的VPN安全吗？", answer: "是的，所有VPN都使用AES-256加密和经审计的无日志政策。" },
        { question: "为什么有些VPN这么便宜？", answer: "通过长期方案（2-3年预付）提供折扣。" },
        { question: "最便宜的VPN是什么？", answer: "Surfshark $1.99/月（2年方案）。" },
        { question: "便宜的VPN能解锁Netflix吗？", answer: "是的，所有推荐的预算VPN都能解锁Netflix。" },
        { question: "应该用免费VPN吗？", answer: "不推荐。Surfshark $1.99/月是更好的投资。" },
      ],
      getVpnButton: "获取", ctaTitle: "花更少获得高级VPN保护", ctaSubtitle: "无需多付。",
      viewAllVpns: "查看所有VPN评测", lastUpdated: "最后更新：2026年2月",
    },
    ja: {
      badge: "2026年2月更新", title: "2026年最安VPN", subtitle: "VPNに月額$10+も払う必要はありません。この5つの低価格オプションは月額$1.99から。",
      topPicks: "トップ低価格VPN", priceTitle: "価格比較", priceDesc: "すべての価格は最安プラン（通常2-3年）のものです。",
      tableHeaders: { vpn: "VPN", price: "価格/月", plan: "プラン", devices: "デバイス", servers: "サーバー", streaming: "ストリーミング", torrenting: "P2P", moneyBack: "返金" },
      tradeoffTitle: "低価格vs高級：何を得て何を失うか", tradeoffGet: ["AES-256暗号化", "キルスイッチとDNSリーク保護", "ノーログポリシー（監査済み）", "ストリーミング対応", "P2P対応", "全プラットフォーム対応"],
      tradeoffLose: ["やや遅い速度（5-15%差）", "高度な機能が少ない", "サーバーネットワークが小さい", "サポートが遅い場合あり", "長期契約が必要"],
      tradeoffGetTitle: "得られるもの", tradeoffLoseTitle: "トレードオフ",
      faqTitle: "FAQ",
      faqs: [
        { question: "安いVPNは安全？", answer: "はい、すべてAES-256暗号化と監査済みノーログポリシーを使用。" },
        { question: "なぜ安い？", answer: "長期プラン（2-3年前払い）で割引を提供。" },
        { question: "最安VPNは？", answer: "Surfshark月額$1.99（2年プラン）。" },
        { question: "Netflixを解除できる？", answer: "はい、すべての推奨VPNでNetflixを解除可能。" },
        { question: "無料VPNを使うべき？", answer: "非推奨。Surfshark月額$1.99が良い投資。" },
      ],
      getVpnButton: "取得", ctaTitle: "より少ないコストでプレミアムVPN保護", ctaSubtitle: "払いすぎる必要はありません。",
      viewAllVpns: "すべてのVPNレビュー", lastUpdated: "最終更新：2026年2月",
    },
    ko: {
      badge: "2026년 2월 업데이트", title: "2026년 가장 저렴한 VPN", subtitle: "VPN에 월 $10+ 이상 쓸 필요 없습니다. 이 5가지 예산 옵션은 월 $1.99부터 시작합니다.",
      topPicks: "최고의 예산 VPN", priceTitle: "가격 비교", priceDesc: "모든 가격은 가장 저렴한 플랜(보통 2-3년)입니다.",
      tableHeaders: { vpn: "VPN", price: "가격/월", plan: "플랜", devices: "기기", servers: "서버", streaming: "스트리밍", torrenting: "P2P", moneyBack: "환불" },
      tradeoffTitle: "저렴 vs 프리미엄", tradeoffGet: ["AES-256 암호화", "킬 스위치 및 DNS 유출 보호", "노로그 정책 (감사됨)", "스트리밍 지원", "P2P 지원", "모든 플랫폼 앱"],
      tradeoffLose: ["약간 느린 속도 (5-15% 차이)", "적은 고급 기능", "작은 서버 네트워크", "느린 고객 지원", "장기 약정 필요"],
      tradeoffGetTitle: "얻는 것", tradeoffLoseTitle: "잠재적 절충",
      faqTitle: "FAQ",
      faqs: [
        { question: "저렴한 VPN이 안전한가요?", answer: "네, 모두 AES-256 암호화와 감사된 노로그 정책을 사용합니다." },
        { question: "왜 그렇게 저렴한가요?", answer: "장기 플랜(2-3년 선불)에 할인을 제공합니다." },
        { question: "가장 저렴한 VPN은?", answer: "Surfshark 월 $1.99 (2년 플랜)." },
        { question: "Netflix 차단 해제 가능?", answer: "네, 모든 추천 예산 VPN이 Netflix를 차단 해제합니다." },
        { question: "무료 VPN을 사용해야 하나요?", answer: "추천하지 않습니다. Surfshark 월 $1.99가 훨씬 나은 투자입니다." },
      ],
      getVpnButton: "받기", ctaTitle: "더 적은 비용으로 프리미엄 VPN 보호", ctaSubtitle: "과도한 비용을 지불할 필요 없습니다.",
      viewAllVpns: "모든 VPN 리뷰 보기", lastUpdated: "마지막 업데이트: 2026년 2월",
    },
    th: {
      badge: "อัปเดตกุมภาพันธ์ 2026", title: "VPN ราคาถูกที่สุดในปี 2026", subtitle: "ไม่ต้องจ่าย $10+/เดือนสำหรับ VPN ตัวเลือก 5 ตัวนี้เริ่มต้นเพียง $1.99/เดือน",
      topPicks: "VPN งบประมาณชั้นนำ", priceTitle: "เปรียบเทียบราคา", priceDesc: "ราคาทั้งหมดสำหรับแผนที่ถูกที่สุด (2-3 ปี)",
      tableHeaders: { vpn: "VPN", price: "ราคา/เดือน", plan: "แผน", devices: "อุปกรณ์", servers: "เซิร์ฟเวอร์", streaming: "สตรีมมิ่ง", torrenting: "P2P", moneyBack: "คืนเงิน" },
      tradeoffTitle: "ถูก vs พรีเมียม", tradeoffGet: ["เข้ารหัส AES-256", "Kill switch และป้องกัน DNS leak", "นโยบายไม่เก็บ log (ตรวจสอบแล้ว)", "รองรับสตรีมมิ่ง", "รองรับ P2P", "แอปสำหรับทุกแพลตฟอร์ม"],
      tradeoffLose: ["ความเร็วช้ากว่าเล็กน้อย", "ฟีเจอร์ขั้นสูงน้อยกว่า", "เครือข่ายเซิร์ฟเวอร์เล็กกว่า", "การสนับสนุนอาจช้ากว่า", "ต้องผูกพันนานกว่า"],
      tradeoffGetTitle: "สิ่งที่คุณยังได้รับ", tradeoffLoseTitle: "สิ่งที่อาจต้องแลก",
      faqTitle: "คำถามที่พบบ่อย",
      faqs: [
        { question: "VPN ราคาถูกปลอดภัยไหม?", answer: "ใช่ ทุกตัวใช้เข้ารหัส AES-256 และมีนโยบายไม่เก็บ log ที่ตรวจสอบแล้ว" },
        { question: "ทำไมถึงราคาถูก?", answer: "ให้ส่วนลดสำหรับแผนระยะยาว (2-3 ปี)" },
        { question: "ตัวไหนถูกที่สุด?", answer: "Surfshark ที่ $1.99/เดือน (แผน 2 ปี)" },
        { question: "ปลดบล็อก Netflix ได้ไหม?", answer: "ได้ VPN งบประมาณที่แนะนำทั้งหมดปลดบล็อก Netflix ได้" },
        { question: "ควรใช้ VPN ฟรีไหม?", answer: "ไม่แนะนำ Surfshark ที่ $1.99/เดือนเป็นการลงทุนที่ดีกว่า" },
      ],
      getVpnButton: "รับ", ctaTitle: "การปกป้อง VPN พรีเมียมในราคาที่น้อยกว่า", ctaSubtitle: "ไม่ต้องจ่ายเกิน",
      viewAllVpns: "ดูบทวิจารณ์ VPN ทั้งหมด", lastUpdated: "อัปเดตล่าสุด: กุมภาพันธ์ 2026",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const relatedPages = [
    { title: "Best Free VPN", description: "Free VPN options with limited features.", href: "/best/free-vpn", icon: "gift" as const },
    { title: "Best VPN for Streaming", description: "VPNs that unblock Netflix, Disney+, and more.", href: "/best/vpn-streaming", icon: "play" as const },
    { title: "Best VPN for Torrenting", description: "VPNs with fast P2P speeds and no-logs.", href: "/best/vpn-torrenting", icon: "download" as const },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Best VPN Guides", href: "/best" }, { name: "Cheapest VPN", href: "/best/vpn-cheap" }]} />
      <ItemListSchema vpns={cheapVpns} />
      <FAQSchema faqs={t.faqs} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">{t.badge}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-yellow-600 dark:from-emerald-400 dark:to-yellow-400 bg-clip-text text-transparent">{t.title}</h1>
              <div className="flex justify-center mb-4">
                <LastUpdated locale={locale} />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.topPicks}</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {cheapVpns.map((item, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-4 md:min-w-[200px]">
                        <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">#{index + 1}</span>
                        {item.vpn && <VpnLogo name={item.vpn.name} size="lg" />}
                        <div>
                          <h3 className="text-xl font-bold">{item.vpn?.name}</h3>
                          <RatingStars rating={item.vpn?.overallRating || 0} />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm"><DollarSign className="w-4 h-4 text-green-500" /><span>{item.monthlyPrice}/mo</span></div>
                        <div className="flex items-center gap-2 text-sm"><Monitor className="w-4 h-4 text-blue-500" /><span>{item.devices} devices</span></div>
                        <div className="flex items-center gap-2 text-sm"><Server className="w-4 h-4 text-purple-500" /><span>{item.servers}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-yellow-500" /><span>{item.speed}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-blue-500" /><span>{item.moneyBack}</span></div>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:min-w-[160px]">
                        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{item.monthlyPrice}</p>
                        <span className="text-xs text-gray-500">{item.planLength} plan</span>
                        <AffiliateButton vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="gap-2 w-full">
                          {t.getVpnButton} {item.vpn?.name}<ArrowRight className="w-4 h-4" />
                        </AffiliateButton>
                      </div>
                    </div>
                    {item.badge && <Badge className={`absolute top-4 right-4 ${item.badgeColor === "yellow" ? "bg-yellow-500" : item.badgeColor === "blue" ? "bg-blue-500" : item.badgeColor === "green" ? "bg-green-500" : item.badgeColor === "purple" ? "bg-purple-500" : "bg-red-500"} text-white`}>{item.badge}</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Price Comparison Table */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.priceTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t.priceDesc}</p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-4 text-left">{t.tableHeaders.vpn}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.price}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.plan}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.devices}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.streaming}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.torrenting}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.moneyBack}</th>
                  </tr>
                </thead>
                <tbody>
                  {cheapVpns.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">{item.vpn?.name}</td>
                      <td className="px-3 py-4 text-center font-bold text-emerald-600">{item.monthlyPrice}</td>
                      <td className="px-3 py-4 text-center text-sm">{item.planLength}</td>
                      <td className="px-3 py-4 text-center text-sm">{item.devices}</td>
                      <td className="px-3 py-4 text-center">{item.streaming ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center">{item.torrenting ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center text-sm">{item.moneyBack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tradeoffs Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.tradeoffTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">{t.tradeoffGetTitle}</h3>
                  <ul className="space-y-3">
                    {t.tradeoffGet.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">{t.tradeoffLoseTitle}</h3>
                  <ul className="space-y-3">
                    {t.tradeoffLose.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-yellow-600 dark:from-emerald-700 dark:to-yellow-700 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {cheapVpns.slice(0, 3).map((item) => (
                <AffiliateButton key={item.vpn?.slug} vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="bg-white text-emerald-600 hover:bg-gray-100">
                  {t.getVpnButton} {item.vpn?.name} - {item.monthlyPrice}
                </AffiliateButton>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.faqTitle}</h2>
            <div className="space-y-6">
              {t.faqs.map((faq, index) => (
                <Card key={index}><CardContent className="p-6"><div className="flex items-start gap-3"><HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-3">{faq.question}</h3><p className="text-gray-600 dark:text-gray-300">{faq.answer}</p></div></div></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        <RelatedPages pages={relatedPages} />

        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.lastUpdated}</p>
            <Link href="/reviews" className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-2">{t.viewAllVpns}<ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
