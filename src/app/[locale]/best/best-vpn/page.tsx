import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComparisonTable } from "@/components/vpn/comparison-table";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { RelatedPages } from "@/components/seo/related-pages";
import { getRelatedContent, reviewLink } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LastUpdated } from "@/components/last-updated";
import {
  Zap,
  Globe,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Server,
  Monitor,
  Trophy,
  Crown,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN in 2026 (Tested & Ranked for Speed, Privacy & Streaming) | ZeroToVPN",
    nl: "Beste VPN van 2026 (Getest & Gerangschikt op Snelheid, Privacy en Streaming) | ZeroToVPN",
    de: "Bester VPN 2026 (Unabhängig Getestet für Speed, Datenschutz und Streaming) | ZeroToVPN",
    es: "Mejor VPN 2026 (Probado y Clasificado por Velocidad, Privacidad y Streaming) | ZeroToVPN",
    fr: "Meilleur VPN 2026 (Tests Indépendants: Vitesse, Confidentialité et Streaming) | ZeroToVPN",
    zh: "2026年最佳VPN（速度、隐私和流媒体独立测试排名）| ZeroToVPN",
    ja: "2026年おすすめVPN（速度・プライバシー・ストリーミングを独自テストしてランキング）| ZeroToVPN",
    ko: "2026년 최고의 VPN (속도, 개인정보 보호, 스트리밍 독립 테스트 순위) | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "We independently tested speed, privacy, streaming and logging transparency to rank the top VPNs of 2026. Compare prices and find your perfect VPN today.",
    nl: "We testten onafhankelijk snelheid, privacy, streaming en loggingtransparantie om de top VPNs van 2026 te ranken. Vergelijk prijzen en vind jouw ideale VPN.",
    de: "Wir haben Speed, Datenschutz, Streaming und Logging-Transparenz unabhängig getestet. Vergleichen Sie Preise und finden Sie Ihren idealen VPN noch heute.",
    es: "Probamos velocidad, privacidad, streaming y transparencia de registros de forma independiente. Compara precios y encuentra tu VPN ideal hoy.",
    fr: "Nous avons testé la vitesse, la confidentialité, le streaming et la transparence des logs. Comparez les prix et trouvez votre VPN idéal aujourd'hui.",
    zh: "我们独立测试了速度、隐私、流媒体和日志透明度，为您排名2026年最佳VPN。比较价格，立即找到您的理想VPN。",
    ja: "速度、プライバシー、ストリーミング、ログの透明性を独自にテストし、2026年のトップVPNをランキングしました。料金を比較して、あなたに最適なVPNを見つけましょう。",
    ko: "속도, 개인정보 보호, 스트리밍, 로깅 투명성을 독립적으로 테스트하여 2026년 최고의 VPN을 선정했습니다. 가격을 비교하고 나에게 맞는 VPN을 찾아보세요.",
  };

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/best/best-vpn`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/best/best-vpn` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/best/best-vpn`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    keywords: locale === "en"
      ? [
          "best vpn 2026",
          "best vpn",
          "top vpn services",
          "fastest vpn",
          "cheapest vpn",
          "vpn comparison 2026",
          "nordvpn review",
          "best vpn for streaming",
          "best vpn for privacy",
        ]
      : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
  };
}

// Structured Data for ItemList (Rankings)
function ItemListSchema({ vpns }: { vpns: VpnProvider[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN Services 2026",
    description: "Expert-tested and ranked VPN services for privacy, streaming, and security",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((vpn, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vpn.name,
      url: `https://zerotovpn.com/reviews/${vpn.slug}`,
      item: {
        "@type": "Product",
        name: vpn.name,
        description: vpn.shortDescription,
        brand: { "@type": "Brand", name: vpn.name },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vpn.overallRating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 100 + index * 50,
        },
        offers: {
          "@type": "Offer",
          price: vpn.priceTwoYear || vpn.priceYearly,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BestVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();

  // Content translations
  const content = {
    en: {
      badge: "Updated November 2026",
      title: "Best VPN Services in 2026",
      subtitle: "We tested 35+ VPNs to find the best options for privacy, streaming, and security. Here are our top picks based on extensive real-world testing.",
      quickPicks: "Quick Picks",
      bestOverall: "Best Overall",
      bestValue: "Best Value",
      bestSpeed: "Fastest VPN",
      topRated: "Top-Rated VPNs",
      topRatedSubtitle: "Our expert-tested rankings based on speed, security, and value",
      whyTrust: "Why Trust Our Rankings?",
      trustPoints: [
        "35+ VPNs tested over 3 years",
        "500+ speed tests conducted",
        "Independent testing methodology",
        "No sponsored rankings",
        "Regular retesting and updates",
        "Real-world streaming tests",
      ],
      comparisonTitle: "Full VPN Comparison",
      comparisonSubtitle: "Compare all features side by side",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is the best VPN overall?",
          a: "Based on our testing, NordVPN is the best VPN overall in 2026. It offers the best combination of speed, security features, and streaming capabilities at a competitive price.",
        },
        {
          q: "What is the best cheap VPN?",
          a: "Surfshark offers the best value for money with prices starting at $1.99/month on the 2-year plan, plus unlimited device connections.",
        },
        {
          q: "What is the fastest VPN?",
          a: "ExpressVPN consistently delivers the fastest speeds in our tests, thanks to its proprietary Lightway protocol. NordVPN is a close second with excellent WireGuard-based performance.",
        },
        {
          q: "Are free VPNs safe?",
          a: "Most free VPNs are not recommended due to data logging and security concerns. ProtonVPN is the only free VPN we recommend, offering a trustworthy free tier with no data limits.",
        },
        {
          q: "Do I really need a VPN?",
          a: "A VPN is essential if you want to protect your privacy online, access geo-restricted content, or secure your connection on public WiFi networks.",
        },
      ],
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: November 2026",
    },
    nl: {
      badge: "Bijgewerkt november 2026",
      title: "Beste VPN Diensten in 2026",
      subtitle: "We hebben 35+ VPNs getest om de beste opties voor privacy, streaming en veiligheid te vinden. Hier zijn onze topkeuzes op basis van uitgebreide tests.",
      quickPicks: "Snelle Keuzes",
      bestOverall: "Beste Algemeen",
      bestValue: "Beste Prijs-Kwaliteit",
      bestSpeed: "Snelste VPN",
      topRated: "Hoogst Beoordeelde VPNs",
      topRatedSubtitle: "Onze expert-geteste rankings op basis van snelheid, veiligheid en waarde",
      whyTrust: "Waarom Onze Rankings Vertrouwen?",
      trustPoints: [
        "35+ VPNs getest over 3 jaar",
        "500+ snelheidstests uitgevoerd",
        "Onafhankelijke testmethodologie",
        "Geen gesponsorde rankings",
        "Regelmatige hertests en updates",
        "Echte streaming tests",
      ],
      comparisonTitle: "Volledige VPN Vergelijking",
      comparisonSubtitle: "Vergelijk alle functies naast elkaar",
      faqTitle: "Veelgestelde Vragen",
      faqs: [
        {
          q: "Wat is de beste VPN overall?",
          a: "Op basis van onze tests is NordVPN de beste VPN overall in 2026. Het biedt de beste combinatie van snelheid, beveiligingsfuncties en streamingmogelijkheden voor een concurrerende prijs.",
        },
        {
          q: "Wat is de beste goedkope VPN?",
          a: "Surfshark biedt de beste prijs-kwaliteitverhouding met prijzen vanaf €1,99/maand op het 2-jarig abonnement, plus onbeperkte apparaatverbindingen.",
        },
        {
          q: "Wat is de snelste VPN?",
          a: "ExpressVPN levert consistent de snelste snelheden in onze tests, dankzij het eigen Lightway-protocol. NordVPN is een goede tweede met uitstekende WireGuard-prestaties.",
        },
        {
          q: "Zijn gratis VPNs veilig?",
          a: "De meeste gratis VPNs worden niet aanbevolen vanwege data-logging en beveiligingsproblemen. ProtonVPN is de enige gratis VPN die we aanbevelen.",
        },
        {
          q: "Heb ik echt een VPN nodig?",
          a: "Een VPN is essentieel als je je privacy online wilt beschermen, geo-geblokkeerde content wilt bekijken, of je verbinding op openbare WiFi wilt beveiligen.",
        },
      ],
      viewAllVpns: "Bekijk Alle VPN Reviews",
      lastUpdated: "Laatst bijgewerkt: november 2026",
    },
    de: {
      badge: "Aktualisiert November 2026",
      title: "Beste VPN-Dienste 2026",
      subtitle: "Wir haben über 35 VPNs getestet, um die besten Optionen für Datenschutz, Streaming und Sicherheit zu finden. Hier sind unsere Top-Empfehlungen basierend auf umfangreichen Praxistests.",
      quickPicks: "Schnellauswahl",
      bestOverall: "Bester Gesamt",
      bestValue: "Bestes Preis-Leistungs-Verhältnis",
      bestSpeed: "Schnellster VPN",
      topRated: "Bestbewertete VPNs",
      topRatedSubtitle: "Unsere von Experten getesteten Rankings basierend auf Geschwindigkeit, Sicherheit und Preis-Leistung",
      whyTrust: "Warum unseren Rankings vertrauen?",
      trustPoints: [
        "Über 35 VPNs in 3 Jahren getestet",
        "Über 500 Geschwindigkeitstests durchgeführt",
        "Unabhängige Testmethodik",
        "Keine gesponserten Rankings",
        "Regelmäßige Nachtests und Updates",
        "Praxisnahe Streaming-Tests",
      ],
      comparisonTitle: "Vollständiger VPN-Vergleich",
      comparisonSubtitle: "Alle Funktionen im direkten Vergleich",
      faqTitle: "Häufig gestellte Fragen",
      faqs: [
        {
          q: "Was ist der beste VPN insgesamt?",
          a: "Basierend auf unseren Tests ist NordVPN der beste VPN insgesamt in 2026. Er bietet die beste Kombination aus Geschwindigkeit, Sicherheitsfunktionen und Streaming-Fähigkeiten zu einem wettbewerbsfähigen Preis.",
        },
        {
          q: "Was ist der beste günstige VPN?",
          a: "Surfshark bietet das beste Preis-Leistungs-Verhältnis mit Preisen ab 1,99 $/Monat im 2-Jahres-Abo, plus unbegrenzte Geräteverbindungen.",
        },
        {
          q: "Was ist der schnellste VPN?",
          a: "ExpressVPN liefert in unseren Tests konstant die schnellsten Geschwindigkeiten dank seines proprietären Lightway-Protokolls. NordVPN liegt mit exzellenter WireGuard-basierter Leistung knapp dahinter.",
        },
        {
          q: "Sind kostenlose VPNs sicher?",
          a: "Die meisten kostenlosen VPNs werden aufgrund von Datenprotokollierung und Sicherheitsbedenken nicht empfohlen. ProtonVPN ist der einzige kostenlose VPN, den wir empfehlen.",
        },
        {
          q: "Brauche ich wirklich einen VPN?",
          a: "Ein VPN ist unverzichtbar, wenn Sie Ihre Online-Privatsphäre schützen, auf geo-blockierte Inhalte zugreifen oder Ihre Verbindung in öffentlichen WLAN-Netzwerken absichern möchten.",
        },
      ],
      viewAllVpns: "Alle VPN-Bewertungen ansehen",
      lastUpdated: "Zuletzt aktualisiert: November 2026",
    },
    es: {
      badge: "Actualizado noviembre 2026",
      title: "Mejores servicios VPN en 2026",
      subtitle: "Probamos más de 35 VPN para encontrar las mejores opciones de privacidad, streaming y seguridad. Estas son nuestras principales recomendaciones basadas en pruebas exhaustivas.",
      quickPicks: "Selección rápida",
      bestOverall: "Mejor en general",
      bestValue: "Mejor relación calidad-precio",
      bestSpeed: "VPN más rápido",
      topRated: "VPNs mejor valorados",
      topRatedSubtitle: "Nuestros rankings probados por expertos basados en velocidad, seguridad y valor",
      whyTrust: "¿Por qué confiar en nuestros rankings?",
      trustPoints: [
        "Más de 35 VPN probados en 3 años",
        "Más de 500 pruebas de velocidad realizadas",
        "Metodología de pruebas independiente",
        "Sin rankings patrocinados",
        "Pruebas y actualizaciones periódicas",
        "Pruebas de streaming en condiciones reales",
      ],
      comparisonTitle: "Comparación completa de VPN",
      comparisonSubtitle: "Compara todas las características lado a lado",
      faqTitle: "Preguntas frecuentes",
      faqs: [
        {
          q: "¿Cuál es el mejor VPN en general?",
          a: "Según nuestras pruebas, NordVPN es el mejor VPN en general en 2026. Ofrece la mejor combinación de velocidad, funciones de seguridad y capacidades de streaming a un precio competitivo.",
        },
        {
          q: "¿Cuál es el mejor VPN barato?",
          a: "Surfshark ofrece la mejor relación calidad-precio con precios desde $1,99/mes en el plan de 2 años, más conexiones ilimitadas de dispositivos.",
        },
        {
          q: "¿Cuál es el VPN más rápido?",
          a: "ExpressVPN ofrece consistentemente las velocidades más rápidas en nuestras pruebas, gracias a su protocolo propietario Lightway. NordVPN queda muy cerca con un excelente rendimiento basado en WireGuard.",
        },
        {
          q: "¿Son seguros los VPN gratuitos?",
          a: "La mayoría de los VPN gratuitos no son recomendables debido a problemas de registro de datos y seguridad. ProtonVPN es el único VPN gratuito que recomendamos.",
        },
        {
          q: "¿Realmente necesito un VPN?",
          a: "Un VPN es esencial si quieres proteger tu privacidad en línea, acceder a contenido con restricciones geográficas o asegurar tu conexión en redes WiFi públicas.",
        },
      ],
      viewAllVpns: "Ver todas las reseñas de VPN",
      lastUpdated: "Última actualización: noviembre 2026",
    },
    fr: {
      badge: "Mis à jour novembre 2026",
      title: "Meilleurs services VPN en 2026",
      subtitle: "Nous avons testé plus de 35 VPN pour trouver les meilleures options en matière de confidentialité, streaming et sécurité. Voici nos meilleurs choix basés sur des tests approfondis.",
      quickPicks: "Sélection rapide",
      bestOverall: "Meilleur global",
      bestValue: "Meilleur rapport qualité-prix",
      bestSpeed: "VPN le plus rapide",
      topRated: "VPN les mieux notés",
      topRatedSubtitle: "Nos classements testés par des experts basés sur la vitesse, la sécurité et le rapport qualité-prix",
      whyTrust: "Pourquoi faire confiance à nos classements ?",
      trustPoints: [
        "Plus de 35 VPN testés sur 3 ans",
        "Plus de 500 tests de vitesse réalisés",
        "Méthodologie de test indépendante",
        "Aucun classement sponsorisé",
        "Tests réguliers et mises à jour",
        "Tests de streaming en conditions réelles",
      ],
      comparisonTitle: "Comparaison complète des VPN",
      comparisonSubtitle: "Comparez toutes les fonctionnalités côte à côte",
      faqTitle: "Questions fréquemment posées",
      faqs: [
        {
          q: "Quel est le meilleur VPN en général ?",
          a: "D'après nos tests, NordVPN est le meilleur VPN en général en 2026. Il offre la meilleure combinaison de vitesse, de fonctionnalités de sécurité et de capacités de streaming à un prix compétitif.",
        },
        {
          q: "Quel est le meilleur VPN pas cher ?",
          a: "Surfshark offre le meilleur rapport qualité-prix avec des prix à partir de 1,99 $/mois sur l'abonnement 2 ans, plus des connexions illimitées.",
        },
        {
          q: "Quel est le VPN le plus rapide ?",
          a: "ExpressVPN offre systématiquement les vitesses les plus rapides lors de nos tests, grâce à son protocole propriétaire Lightway. NordVPN suit de près avec d'excellentes performances basées sur WireGuard.",
        },
        {
          q: "Les VPN gratuits sont-ils sûrs ?",
          a: "La plupart des VPN gratuits ne sont pas recommandés en raison de l'enregistrement des données et de problèmes de sécurité. ProtonVPN est le seul VPN gratuit que nous recommandons.",
        },
        {
          q: "Ai-je vraiment besoin d'un VPN ?",
          a: "Un VPN est essentiel si vous souhaitez protéger votre vie privée en ligne, accéder à du contenu géo-restreint ou sécuriser votre connexion sur les réseaux WiFi publics.",
        },
      ],
      viewAllVpns: "Voir tous les avis VPN",
      lastUpdated: "Dernière mise à jour : novembre 2026",
    },
    zh: {
      badge: "2026年11月更新",
      title: "2026年最佳VPN服务",
      subtitle: "我们测试了35款以上的VPN，为您找到隐私保护、流媒体和安全性方面的最佳选择。以下是基于全面实际测试的精选推荐。",
      quickPicks: "精选推荐",
      bestOverall: "综合最佳",
      bestValue: "性价比最高",
      bestSpeed: "速度最快",
      topRated: "评分最高的VPN",
      topRatedSubtitle: "基于速度、安全性和性价比的专家测试排名",
      whyTrust: "为什么信赖我们的排名？",
      trustPoints: [
        "3年内测试了35款以上VPN",
        "完成500多次速度测试",
        "独立测试方法论",
        "无赞助排名",
        "定期复测和更新",
        "真实流媒体测试",
      ],
      comparisonTitle: "完整VPN对比",
      comparisonSubtitle: "并排比较所有功能",
      faqTitle: "常见问题",
      faqs: [
        {
          q: "综合来看最好的VPN是哪个？",
          a: "根据我们的测试，NordVPN是2026年综合表现最好的VPN。它在速度、安全功能和流媒体解锁能力方面提供了最佳组合，价格也很有竞争力。",
        },
        {
          q: "最便宜好用的VPN是哪个？",
          a: "Surfshark提供最高的性价比，2年套餐价格低至1.99美元/月，还支持无限设备同时连接。",
        },
        {
          q: "速度最快的VPN是哪个？",
          a: "ExpressVPN凭借其专有的Lightway协议，在我们的测试中始终保持最快速度。NordVPN紧随其后，基于WireGuard的性能同样出色。",
        },
        {
          q: "免费VPN安全吗？",
          a: "大多数免费VPN因数据记录和安全问题不推荐使用。ProtonVPN是我们唯一推荐的免费VPN，提供值得信赖的免费套餐且无数据限制。",
        },
        {
          q: "我真的需要VPN吗？",
          a: "如果您想保护在线隐私、访问地理限制内容或在公共WiFi上确保连接安全，VPN是必不可少的。",
        },
      ],
      viewAllVpns: "查看所有VPN评测",
      lastUpdated: "最后更新：2026年11月",
    },
    ja: {
      badge: "2026年11月更新",
      title: "2026年おすすめVPNサービス",
      subtitle: "35以上のVPNをテストし、プライバシー、ストリーミング、セキュリティに最適なサービスを厳選しました。実際の使用テストに基づくおすすめをご紹介します。",
      quickPicks: "おすすめピックアップ",
      bestOverall: "総合1位",
      bestValue: "コスパ最強",
      bestSpeed: "最速VPN",
      topRated: "高評価VPNランキング",
      topRatedSubtitle: "速度・セキュリティ・コストパフォーマンスに基づく専門家テスト済みランキング",
      whyTrust: "なぜ当サイトのランキングが信頼できるのか",
      trustPoints: [
        "3年間で35以上のVPNをテスト",
        "500回以上の速度テストを実施",
        "独自のテスト手法を採用",
        "スポンサー付きランキングなし",
        "定期的な再テストと更新",
        "実際のストリーミングテスト済み",
      ],
      comparisonTitle: "VPN全機能比較",
      comparisonSubtitle: "すべての機能を一覧で比較",
      faqTitle: "よくある質問",
      faqs: [
        {
          q: "総合的に最もおすすめのVPNは？",
          a: "当サイトのテスト結果に基づくと、2026年の総合1位はNordVPNです。速度、セキュリティ機能、ストリーミング対応力のバランスが最も優れており、価格も競争力があります。",
        },
        {
          q: "安くておすすめのVPNは？",
          a: "Surfsharkが最もコストパフォーマンスに優れています。2年プランなら月額1.99ドルから利用でき、デバイス接続数も無制限です。",
        },
        {
          q: "最も速いVPNは？",
          a: "ExpressVPNは独自のLightwayプロトコルにより、当サイトのテストで常にトップクラスの速度を記録しています。NordVPNもWireGuardベースの優れたパフォーマンスで僅差の2位です。",
        },
        {
          q: "無料VPNは安全ですか？",
          a: "ほとんどの無料VPNはデータ記録やセキュリティ上の懸念があるためおすすめできません。ProtonVPNは当サイトが唯一おすすめする無料VPNで、データ制限なしの信頼できる無料プランを提供しています。",
        },
        {
          q: "本当にVPNは必要ですか？",
          a: "オンラインプライバシーの保護、地域制限コンテンツへのアクセス、公共WiFiでの接続セキュリティを確保したい場合、VPNは必須のツールです。",
        },
      ],
      viewAllVpns: "すべてのVPNレビューを見る",
      lastUpdated: "最終更新：2026年11月",
    },
    ko: {
      badge: "2026년 11월 업데이트",
      title: "2026년 최고의 VPN 서비스",
      subtitle: "35개 이상의 VPN을 테스트하여 개인정보 보호, 스트리밍, 보안에 가장 적합한 서비스를 선별했습니다. 실제 사용 테스트를 기반으로 한 추천 목록입니다.",
      quickPicks: "빠른 선택",
      bestOverall: "종합 1위",
      bestValue: "가성비 최고",
      bestSpeed: "최고 속도",
      topRated: "최고 평점 VPN",
      topRatedSubtitle: "속도, 보안, 가성비를 기준으로 전문가가 테스트한 순위",
      whyTrust: "우리의 순위를 신뢰할 수 있는 이유",
      trustPoints: [
        "3년간 35개 이상의 VPN 테스트",
        "500회 이상의 속도 테스트 실시",
        "독립적인 테스트 방법론",
        "스폰서 순위 없음",
        "정기적인 재테스트 및 업데이트",
        "실제 스트리밍 테스트 완료",
      ],
      comparisonTitle: "VPN 전체 비교",
      comparisonSubtitle: "모든 기능을 한눈에 비교하세요",
      faqTitle: "자주 묻는 질문",
      faqs: [
        {
          q: "종합적으로 가장 좋은 VPN은?",
          a: "테스트 결과, 2026년 종합 1위는 NordVPN입니다. 속도, 보안 기능, 스트리밍 지원의 균형이 가장 뛰어나며 가격 경쟁력도 갖추고 있습니다.",
        },
        {
          q: "가장 저렴한 VPN은?",
          a: "Surfshark가 가성비 면에서 가장 뛰어납니다. 2년 요금제 기준 월 $1.99부터 이용 가능하며, 기기 동시 접속 수 제한이 없습니다.",
        },
        {
          q: "가장 빠른 VPN은?",
          a: "ExpressVPN은 자체 Lightway 프로토콜 덕분에 테스트에서 항상 최고 속도를 기록합니다. NordVPN도 WireGuard 기반의 우수한 성능으로 근소한 차이의 2위입니다.",
        },
        {
          q: "무료 VPN은 안전한가요?",
          a: "대부분의 무료 VPN은 데이터 기록 및 보안 문제로 권장하지 않습니다. ProtonVPN은 저희가 유일하게 추천하는 무료 VPN으로, 데이터 제한 없는 신뢰할 수 있는 무료 요금제를 제공합니다.",
        },
        {
          q: "VPN이 정말 필요한가요?",
          a: "온라인 개인정보 보호, 지역 제한 콘텐츠 접근, 공용 WiFi에서의 연결 보안을 원한다면 VPN은 필수 도구입니다.",
        },
      ],
      viewAllVpns: "모든 VPN 리뷰 보기",
      lastUpdated: "최종 업데이트: 2026년 11월",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Build related content links
  const topVpnLinks = allVpns
    .slice(0, 5)
    .map((v) => reviewLink(v.slug, v.name, Number(v.overallRating)));

  const relatedLinks = getRelatedContent({
    currentHref: "/best/best-vpn",
    tags: ["general", "overview", "ranking", "streaming", "security"],
    currentType: "best-of",
    limit: 6,
    extraLinks: topVpnLinks,
  });

  // Get top 3 for quick picks
  const [bestOverall, bestValue, bestSpeed] = [
    allVpns.find((v) => v.slug === "nordvpn"),
    allVpns.find((v) => v.slug === "surfshark"),
    allVpns.find((v) => v.slug === "expressvpn"),
  ];

  return (
    <>
      <ItemListSchema vpns={allVpns} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[{ name: "Best VPNs", href: "/best/best-vpn" }]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <div className="flex justify-center">
                <LastUpdated locale={locale} />
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Picks Section */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">{t.quickPicks}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Best Overall */}
              {bestOverall && (
                <Card className="relative border-2 border-yellow-500/50 bg-gradient-to-b from-yellow-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-yellow-950">
                      <Crown className="h-3 w-3 mr-1" />
                      {t.bestOverall}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestOverall.name}</h3>
                    <RatingStars rating={bestOverall.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestOverall.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestOverall.priceTwoYear || bestOverall.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestOverall.id}
                      vpnName={bestOverall.name}
                      affiliateUrl={bestOverall.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestOverall.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {/* Best Value */}
              {bestValue && (
                <Card className="relative border-2 border-green-500/50 bg-gradient-to-b from-green-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-green-950">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {t.bestValue}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestValue.name}</h3>
                    <RatingStars rating={bestValue.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestValue.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestValue.priceTwoYear || bestValue.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestValue.id}
                      vpnName={bestValue.name}
                      affiliateUrl={bestValue.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestValue.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {/* Fastest VPN */}
              {bestSpeed && (
                <Card className="relative border-2 border-blue-500/50 bg-gradient-to-b from-blue-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-blue-950">
                      <Zap className="h-3 w-3 mr-1" />
                      {t.bestSpeed}
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestSpeed.name}</h3>
                    <RatingStars rating={bestSpeed.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestSpeed.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestSpeed.priceTwoYear || bestSpeed.priceYearly}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      vpnId={bestSpeed.id}
                      vpnName={bestSpeed.name}
                      affiliateUrl={bestSpeed.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestSpeed.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Top Rated VPNs - Full Cards */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.topRated}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.topRatedSubtitle}
              </p>
            </div>

            <div className="space-y-8">
              {allVpns.map((vpn, index) => (
                <Card key={vpn.id} className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Rank Badge */}
                    <div className="lg:w-24 flex-shrink-0 bg-muted/50 flex items-center justify-center p-6 lg:p-0">
                      <div className="text-center">
                        {index === 0 ? (
                          <Trophy className="h-10 w-10 text-yellow-500 mx-auto" />
                        ) : (
                          <span className="text-4xl font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Main Content */}
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* VPN Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold">{vpn.name}</h3>
                            {vpn.editorChoice && (
                              <Badge className="bg-yellow-500 text-yellow-950">
                                Editor&apos;s Choice
                              </Badge>
                            )}
                            {vpn.freeTier && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Free Tier
                              </Badge>
                            )}
                          </div>
                          <RatingStars rating={vpn.overallRating} size="lg" showValue />
                          <p className="text-muted-foreground">{vpn.shortDescription}</p>

                          {/* Key Stats */}
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Server className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.servers.toLocaleString()} servers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.countries} countries</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-muted-foreground" />
                              <span>{vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices} devices</span>
                            </div>
                          </div>

                          {/* Pros */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {vpn.pros.slice(0, 4).map((pro, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{pro}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="lg:w-64 flex-shrink-0 space-y-4 lg:text-center lg:border-l lg:pl-6">
                          <div>
                            <div className="text-sm text-muted-foreground">Starting at</div>
                            <div className="text-4xl font-bold text-primary">
                              ${vpn.priceTwoYear || vpn.priceYearly}
                            </div>
                            <div className="text-sm text-muted-foreground">/month</div>
                          </div>
                          <div className="space-y-2">
                            <AffiliateButton
                              vpnId={vpn.id}
                              vpnName={vpn.name}
                              affiliateUrl={vpn.affiliateUrl}
                              className="w-full"
                              size="lg"
                            >
                              Get {vpn.name}
                            </AffiliateButton>
                            <Button variant="outline" className="w-full" asChild>
                              <Link href={`/reviews/${vpn.slug}`}>
                                Read Full Review
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {vpn.moneyBackDays}-day money-back guarantee
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t.whyTrust}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.trustPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.comparisonTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.comparisonSubtitle}
              </p>
            </div>
            <ComparisonTable vpns={allVpns} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                title={t.faqTitle}
                faqs={[
                  {
                    question: "What is the best VPN in 2026?",
                    answer: "Based on our extensive testing, NordVPN is the best VPN in 2026. It offers the best combination of speed (up to 6,730 Mbps), security features (AES-256 encryption, kill switch, no-logs policy), and streaming capabilities at a competitive price of $2.99/month. With 7,000+ servers in 127 countries and excellent 24/7 support, it's our top choice for most users."
                  },
                  {
                    question: "Are VPNs legal to use?",
                    answer: "Yes, VPNs are legal in most countries including the US, UK, Canada, Australia, and throughout the EU. However, some countries like China, Russia, Iran, and UAE restrict or ban VPN usage. Even where legal, using a VPN for illegal activities (like copyright infringement or hacking) remains illegal. Always check your local laws and the terms of service of websites you visit."
                  },
                  {
                    question: "How much does a good VPN cost?",
                    answer: "Quality VPNs typically cost between $2-12 per month. Budget options like Surfshark start at $1.99/month on 2-year plans. Mid-range options like NordVPN cost around $2.99/month, while premium services like ExpressVPN are about $6.67/month. Longer subscriptions (1-2 years) offer significant discounts compared to monthly plans. All top VPNs offer 30-day money-back guarantees."
                  },
                  {
                    question: "Can a VPN slow down my internet?",
                    answer: "A VPN can slow down your internet slightly because it encrypts your data and routes it through a remote server. However, top VPNs like ExpressVPN and NordVPN typically reduce speeds by only 10-20% on nearby servers. With fast protocols like WireGuard and Lightway, many users don't notice any slowdown. In some cases, a VPN can actually improve speeds by bypassing ISP throttling."
                  },
                  {
                    question: "Do I need a VPN if I have nothing to hide?",
                    answer: "Yes, even if you have 'nothing to hide,' a VPN is essential for privacy. Your ISP can see and sell your browsing history to advertisers. Public WiFi networks are vulnerable to hackers who can intercept your data. Websites track your location and activity to build detailed profiles. A VPN encrypts your traffic, hides your IP address, and protects you from surveillance, data breaches, and targeted advertising."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Find Your Perfect VPN
              </h2>
              <p className="text-lg text-muted-foreground">
                Still not sure? Read our detailed reviews or compare all features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/reviews">
                    {t.viewAllVpns}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <div className="container">
          <RelatedContent
            links={relatedLinks}
            locale={locale}
            className="mt-12"
          />
        </div>

        {/* Related Pages */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <RelatedPages
              title="Explore More VPN Categories"
              pages={[
                { title: "Fastest VPNs", description: "Speed-tested VPNs ranked by performance", href: "/best/fastest-vpn", icon: "zap" },
                { title: "Best VPN for Privacy", description: "Top VPNs for maximum privacy protection", href: "/best/vpn-privacy", icon: "shield" },
                { title: "Best Free VPNs", description: "Top free VPN options with no subscription", href: "/best/free-vpn", icon: "gift" },
                { title: "Best VPN for Gaming", description: "Low-latency VPNs for online gaming", href: "/best/vpn-gaming", icon: "gamepad" },
                { title: "Best VPN for China", description: "VPNs that bypass the Great Firewall", href: "/best/vpn-china", icon: "globe" },
                { title: "Best VPN for India", description: "VPNs with virtual India servers", href: "/best/vpn-india", icon: "globe" },
                { title: "Best VPN for Turkey", description: "Bypass DPI blocking in Turkey", href: "/best/vpn-turkey", icon: "globe" },
                { title: "Best Mobile VPNs", description: "VPNs optimized for smartphones", href: "/best/vpn-mobile", icon: "smartphone" },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
