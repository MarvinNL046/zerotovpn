import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Go2NetworkSection } from "@/components/seo/go2-network-section";
import { Link } from "@/i18n/navigation";
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Plane, Shield, Tv, Wifi, Globe } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

const content: Record<string, {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  badge: string;
  h1: string;
  intro: string;
  wifiTitle: string;
  wifiDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  contentTitle: string;
  contentDesc: string;
  picksTitle: string;
  getVpn: string;
  readReview: string;
  researchTitle: string;
  dataSource: string;
  scoringRules: string;
  methodology: string;
  interactiveFilters: string;
  vpnIndex: string;
  relatedTitle: string;
  related: { title: string; description: string; href: string; icon: string }[];
}> = {
  en: {
    metaTitle: "Best VPN for Morocco - Travel, Privacy & Public WiFi",
    metaDescription: "Independent picks for using a VPN in Morocco: safe public WiFi use, stronger privacy, and stable access while traveling.",
    ogTitle: "Best VPN for Morocco",
    ogDescription: "Data-driven VPN picks for Morocco travel, day-to-day privacy, and streaming access.",
    badge: "Morocco travel intent page",
    h1: "Best VPN for Morocco",
    intro: "For trips through Morocco, VPN quality matters on hotel and public networks. We focus on practical performance, privacy transparency, and reliable app access for travelers.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Encrypt traffic on hotel, airport, and cafe networks where interception risk is higher.",
    privacyTitle: "Privacy Standards",
    privacyDesc: "We prioritize no-logs evidence, clear ownership, and kill switch reliability.",
    contentTitle: "Content Access",
    contentDesc: "Stable international server performance for streaming and region-based services.",
    picksTitle: "Top VPN picks for Morocco",
    getVpn: "Get",
    readReview: "Read full review",
    researchTitle: "How this page connects to our research stack",
    dataSource: "Data source:",
    scoringRules: "Scoring rules:",
    methodology: "Methodology",
    interactiveFilters: "Interactive filters:",
    vpnIndex: "VPN Index dashboard",
    relatedTitle: "Related internal guides",
    related: [
      { title: "VPN for Travel", description: "How to stay connected and private while moving across countries.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Public WiFi Safety", description: "Practical steps to secure your traffic on open networks.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Best VPN for Privacy", description: "VPNs with the strongest transparency and privacy credentials.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Best VPN for Streaming", description: "Comparison focused on streaming unlock consistency.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Cheap", description: "Value-first picks if budget matters most.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Marokko - Reizen, Privacy & Openbare WiFi",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in Marokko: veilig openbaar WiFi-gebruik, sterkere privacy en stabiele toegang onderweg.",
    ogTitle: "Beste VPN voor Marokko",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Marokko, dagelijkse privacy en streamingtoegang.",
    badge: "Marokko reisgericht",
    h1: "Beste VPN voor Marokko",
    intro: "Voor reizen door Marokko is VPN-kwaliteit belangrijk op hotel- en openbare netwerken. We richten ons op praktische prestaties, privacytransparantie en betrouwbare app-toegang voor reizigers.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Versleutel je verkeer op hotel-, luchthaven- en cafénetwerken waar het onderscheppingsrisico hoger is.",
    privacyTitle: "Privacystandaarden",
    privacyDesc: "We geven prioriteit aan no-logs bewijs, duidelijk eigenaarschap en betrouwbare kill switch-functionaliteit.",
    contentTitle: "Contenttoegang",
    contentDesc: "Stabiele internationale serverprestaties voor streaming en regiogebonden diensten.",
    picksTitle: "Beste VPN-keuzes voor Marokko",
    getVpn: "Kies",
    readReview: "Lees volledige review",
    researchTitle: "Hoe deze pagina samenhangt met ons onderzoek",
    dataSource: "Databron:",
    scoringRules: "Beoordelingsregels:",
    methodology: "Methodologie",
    interactiveFilters: "Interactieve filters:",
    vpnIndex: "VPN Index-dashboard",
    relatedTitle: "Gerelateerde interne gidsen",
    related: [
      { title: "VPN voor op reis", description: "Hoe je verbonden en privé blijft tijdens reizen tussen landen.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Openbare WiFi-veiligheid", description: "Praktische stappen om je verkeer te beveiligen op open netwerken.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Beste VPN voor privacy", description: "VPN's met de sterkste transparantie- en privacyreferenties.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Beste VPN voor streaming", description: "Vergelijking gericht op betrouwbaarheid van het ontgrendelen van streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste goedkope VPN", description: "Prijsbewuste keuzes als budget het belangrijkst is.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für Marokko – Reisen, Privatsphäre & öffentliches WLAN",
    metaDescription: "Unabhängige Empfehlungen für VPNs in Marokko: sicheres öffentliches WLAN, stärkere Privatsphäre und stabiler Zugang unterwegs.",
    ogTitle: "Bestes VPN für Marokko",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Marokko-Reisen, alltägliche Privatsphäre und Streaming-Zugang.",
    badge: "Marokko-Reiseseite",
    h1: "Bestes VPN für Marokko",
    intro: "Für Reisen durch Marokko ist die VPN-Qualität in Hotel- und öffentlichen Netzwerken entscheidend. Wir konzentrieren uns auf praktische Leistung, Privatsphäre-Transparenz und zuverlässigen App-Zugang für Reisende.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Verschlüssle deinen Datenverkehr in Hotel-, Flughafen- und Café-Netzwerken, wo das Abfangrisiko höher ist.",
    privacyTitle: "Privatsphäre-Standards",
    privacyDesc: "Wir legen Wert auf No-Logs-Nachweise, klare Eigentumsverhältnisse und zuverlässige Kill-Switch-Funktion.",
    contentTitle: "Zugang zu Inhalten",
    contentDesc: "Stabile internationale Serverleistung für Streaming und regionsgebundene Dienste.",
    picksTitle: "Top-VPN-Empfehlungen für Marokko",
    getVpn: "Zu",
    readReview: "Vollständigen Test lesen",
    researchTitle: "Wie diese Seite mit unserem Forschungssystem zusammenhängt",
    dataSource: "Datenquelle:",
    scoringRules: "Bewertungsregeln:",
    methodology: "Methodik",
    interactiveFilters: "Interaktive Filter:",
    vpnIndex: "VPN-Index-Dashboard",
    relatedTitle: "Verwandte interne Ratgeber",
    related: [
      { title: "VPN für Reisen", description: "So bleibst du unterwegs verbunden und geschützt.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Öffentliches WLAN absichern", description: "Praktische Schritte zur Absicherung deines Datenverkehrs in offenen Netzwerken.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Bestes VPN für Privatsphäre", description: "VPNs mit den stärksten Transparenz- und Datenschutzreferenzen.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Bestes VPN für Streaming", description: "Vergleich mit Fokus auf zuverlässiges Entsperren von Streaming-Diensten.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes günstiges VPN", description: "Preis-Leistungs-Empfehlungen, wenn das Budget zählt.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para Marruecos - Viajes, Privacidad y WiFi Público",
    metaDescription: "Selecciones independientes de VPN para Marruecos: uso seguro de WiFi público, mayor privacidad y acceso estable mientras viajas.",
    ogTitle: "Mejor VPN para Marruecos",
    ogDescription: "Selecciones de VPN basadas en datos para viajar a Marruecos, privacidad diaria y acceso a streaming.",
    badge: "Página de viajes a Marruecos",
    h1: "Mejor VPN para Marruecos",
    intro: "Para viajar por Marruecos, la calidad del VPN importa en redes de hoteles y públicas. Nos centramos en el rendimiento práctico, la transparencia en privacidad y el acceso fiable a aplicaciones para viajeros.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Cifra tu tráfico en redes de hoteles, aeropuertos y cafeterías donde el riesgo de interceptación es mayor.",
    privacyTitle: "Estándares de privacidad",
    privacyDesc: "Priorizamos evidencia de no registros, propiedad clara y fiabilidad del kill switch.",
    contentTitle: "Acceso a contenido",
    contentDesc: "Rendimiento estable en servidores internacionales para streaming y servicios con restricción geográfica.",
    picksTitle: "Mejores VPN para Marruecos",
    getVpn: "Ir a",
    readReview: "Leer análisis completo",
    researchTitle: "Cómo se conecta esta página con nuestra investigación",
    dataSource: "Fuente de datos:",
    scoringRules: "Reglas de puntuación:",
    methodology: "Metodología",
    interactiveFilters: "Filtros interactivos:",
    vpnIndex: "Panel del Índice VPN",
    relatedTitle: "Guías internas relacionadas",
    related: [
      { title: "VPN para viajar", description: "Cómo mantener la conexión y privacidad al moverte entre países.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Seguridad en WiFi público", description: "Pasos prácticos para proteger tu tráfico en redes abiertas.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Mejor VPN para privacidad", description: "VPN con las credenciales de transparencia y privacidad más sólidas.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Mejor VPN para streaming", description: "Comparativa centrada en la fiabilidad de desbloqueo de streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN barato", description: "Selecciones orientadas al valor cuando el presupuesto es lo primero.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Países", description: "Censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour le Maroc – Voyage, Confidentialité et WiFi public",
    metaDescription: "Sélections indépendantes de VPN pour le Maroc : utilisation sécurisée du WiFi public, meilleure confidentialité et accès stable en voyage.",
    ogTitle: "Meilleur VPN pour le Maroc",
    ogDescription: "Sélections VPN basées sur les données pour voyager au Maroc, confidentialité au quotidien et accès au streaming.",
    badge: "Page voyage Maroc",
    h1: "Meilleur VPN pour le Maroc",
    intro: "Pour voyager au Maroc, la qualité du VPN compte sur les réseaux d'hôtels et publics. Nous nous concentrons sur les performances pratiques, la transparence en matière de confidentialité et un accès fiable aux applications pour les voyageurs.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Chiffrez votre trafic sur les réseaux d'hôtels, d'aéroports et de cafés où le risque d'interception est plus élevé.",
    privacyTitle: "Standards de confidentialité",
    privacyDesc: "Nous privilégions les preuves de non-journalisation, la transparence sur la propriété et la fiabilité du kill switch.",
    contentTitle: "Accès aux contenus",
    contentDesc: "Performances stables des serveurs internationaux pour le streaming et les services géo-restreints.",
    picksTitle: "Meilleurs VPN pour le Maroc",
    getVpn: "Choisir",
    readReview: "Lire l'avis complet",
    researchTitle: "Comment cette page s'intègre à notre système de recherche",
    dataSource: "Source des données :",
    scoringRules: "Règles de notation :",
    methodology: "Méthodologie",
    interactiveFilters: "Filtres interactifs :",
    vpnIndex: "Tableau de bord de l'index VPN",
    relatedTitle: "Guides internes associés",
    related: [
      { title: "VPN pour voyager", description: "Comment rester connecté et protégé en se déplaçant entre les pays.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Sécurité WiFi public", description: "Étapes pratiques pour sécuriser votre trafic sur les réseaux ouverts.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "Meilleur VPN pour la confidentialité", description: "VPN avec les meilleures références en transparence et confidentialité.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Meilleur VPN pour le streaming", description: "Comparatif axé sur la fiabilité du déblocage streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN pas cher", description: "Sélections rapport qualité-prix quand le budget prime.", href: "/best/vpn-cheap", icon: "price" },
      { title: "Pays", description: "Censure et accès VPN pays par pays.", href: "/countries", icon: "location" },
    ],
  },
  zh: {
    metaTitle: "摩洛哥最佳VPN - 旅行、隐私和公共WiFi",
    metaDescription: "独立推荐适合在摩洛哥使用的VPN：安全使用公共WiFi、更强的隐私保护，以及旅行中稳定的网络访问。",
    ogTitle: "摩洛哥最佳VPN",
    ogDescription: "基于数据的摩洛哥旅行VPN推荐，适合日常隐私保护和流媒体访问。",
    badge: "摩洛哥旅行专页",
    h1: "摩洛哥最佳VPN",
    intro: "在摩洛哥旅行时，酒店和公共网络上的VPN质量至关重要。我们专注于实际性能、隐私透明度以及为旅行者提供可靠的应用访问。",
    wifiTitle: "公共WiFi安全",
    wifiDesc: "在拦截风险较高的酒店、机场和咖啡馆网络上加密您的流量。",
    privacyTitle: "隐私标准",
    privacyDesc: "我们优先考虑无日志证据、明确的所有权信息和可靠的终止开关功能。",
    contentTitle: "内容访问",
    contentDesc: "稳定的国际服务器性能，支持流媒体和基于地区的服务。",
    picksTitle: "摩洛哥最佳VPN推荐",
    getVpn: "获取",
    readReview: "阅读完整评测",
    researchTitle: "本页面与我们研究体系的关联",
    dataSource: "数据来源：",
    scoringRules: "评分规则：",
    methodology: "方法论",
    interactiveFilters: "交互式筛选：",
    vpnIndex: "VPN指数仪表板",
    relatedTitle: "相关内部指南",
    related: [
      { title: "旅行VPN指南", description: "在不同国家间移动时保持连接和隐私的实用方法。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "公共WiFi安全", description: "在开放网络上保护流量的实用步骤。", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "隐私最佳VPN", description: "拥有最强透明度和隐私资质的VPN。", href: "/best/vpn-privacy", icon: "shield" },
      { title: "流媒体最佳VPN", description: "专注于流媒体解锁稳定性的对比。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "最便宜的VPN", description: "预算有限时的高性价比选择。", href: "/best/vpn-cheap", icon: "price" },
      { title: "国家", description: "各国审查制度和VPN访问情况。", href: "/countries", icon: "location" },
    ],
  },
  ja: {
    metaTitle: "モロッコにおすすめのVPN - 旅行、プライバシー、公共WiFi",
    metaDescription: "モロッコでのVPN利用に関する独自の厳選：安全な公共WiFi利用、より強力なプライバシー保護、旅行中の安定したアクセス。",
    ogTitle: "モロッコにおすすめのVPN",
    ogDescription: "モロッコ旅行、日常のプライバシー保護、ストリーミングアクセスのためのデータに基づくVPN厳選。",
    badge: "モロッコ旅行向けページ",
    h1: "モロッコにおすすめのVPN",
    intro: "モロッコ旅行では、ホテルや公共ネットワークでのVPN品質が重要です。旅行者向けに、実用的なパフォーマンス、プライバシーの透明性、信頼できるアプリアクセスに重点を置いています。",
    wifiTitle: "公共WiFiの安全性",
    wifiDesc: "傍受リスクが高いホテル、空港、カフェのネットワークで通信を暗号化します。",
    privacyTitle: "プライバシー基準",
    privacyDesc: "ノーログの証拠、明確な運営体制、キルスイッチの信頼性を重視しています。",
    contentTitle: "コンテンツアクセス",
    contentDesc: "ストリーミングや地域制限サービスのための安定した海外サーバーパフォーマンス。",
    picksTitle: "モロッコ向けおすすめVPN",
    getVpn: "取得",
    readReview: "詳細レビューを読む",
    researchTitle: "このページと当サイトの調査体制の関連性",
    dataSource: "データソース：",
    scoringRules: "スコアリングルール：",
    methodology: "テスト手法",
    interactiveFilters: "インタラクティブフィルター：",
    vpnIndex: "VPNインデックスダッシュボード",
    relatedTitle: "関連する内部ガイド",
    related: [
      { title: "旅行向けVPNガイド", description: "国をまたいで移動する際の接続とプライバシーの維持方法。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "公共WiFiの安全対策", description: "オープンネットワークで通信を保護する実践的な手順。", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "プライバシーにおすすめのVPN", description: "透明性とプライバシー資質が最も優れたVPN。", href: "/best/vpn-privacy", icon: "shield" },
      { title: "ストリーミングにおすすめのVPN", description: "ストリーミングのアンロック安定性に焦点を当てた比較。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "格安おすすめVPN", description: "予算重視の方向けのコスパの高い選択肢。", href: "/best/vpn-cheap", icon: "price" },
      { title: "国別情報", description: "国ごとの検閲状況とVPNアクセスの背景。", href: "/countries", icon: "location" },
    ],
  },
  ko: {
    metaTitle: "모로코 최고의 VPN - 여행, 개인정보 보호 및 공용 WiFi",
    metaDescription: "모로코에서 VPN을 사용하기 위한 독립 추천: 안전한 공용 WiFi 사용, 강력한 개인정보 보호, 여행 중 안정적인 접속.",
    ogTitle: "모로코 최고의 VPN",
    ogDescription: "모로코 여행, 일상 개인정보 보호, 스트리밍 접속을 위한 데이터 기반 VPN 추천.",
    badge: "모로코 여행 전용 페이지",
    h1: "모로코 최고의 VPN",
    intro: "모로코 여행 시 호텔과 공용 네트워크에서의 VPN 품질이 중요합니다. 실질적인 성능, 개인정보 보호 투명성, 여행자를 위한 안정적인 앱 접속에 중점을 두고 있습니다.",
    wifiTitle: "공용 WiFi 보안",
    wifiDesc: "도청 위험이 높은 호텔, 공항, 카페 네트워크에서 트래픽을 암호화합니다.",
    privacyTitle: "개인정보 보호 기준",
    privacyDesc: "노로그 증거, 명확한 소유 구조, 킬 스위치 안정성을 최우선으로 평가합니다.",
    contentTitle: "콘텐츠 접속",
    contentDesc: "스트리밍 및 지역 기반 서비스를 위한 안정적인 해외 서버 성능.",
    picksTitle: "모로코를 위한 VPN 추천",
    getVpn: "선택",
    readReview: "전체 리뷰 읽기",
    researchTitle: "이 페이지와 연구 체계의 연관성",
    dataSource: "데이터 출처:",
    scoringRules: "평가 기준:",
    methodology: "테스트 방법론",
    interactiveFilters: "인터랙티브 필터:",
    vpnIndex: "VPN 인덱스 대시보드",
    relatedTitle: "관련 내부 가이드",
    related: [
      { title: "여행용 VPN 가이드", description: "국가 간 이동 시 연결과 개인정보를 유지하는 방법.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "공용 WiFi 보안 가이드", description: "개방형 네트워크에서 트래픽을 보호하기 위한 실용적인 단계.", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "개인정보 보호 최고의 VPN", description: "투명성과 개인정보 보호 자격이 가장 뛰어난 VPN.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "스트리밍 최고의 VPN", description: "스트리밍 차단 해제 안정성에 초점을 맞춘 비교.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "저렴한 VPN 추천", description: "예산이 중요할 때 가성비 우선 선택.", href: "/best/vpn-cheap", icon: "price" },
      { title: "국가별 정보", description: "국가별 검열 현황과 VPN 접속 환경.", href: "/countries", icon: "location" },
    ],
  },
  th: {
    metaTitle: "VPN ที่ดีที่สุดสำหรับโมร็อกโก - ท่องเที่ยว ความเป็นส่วนตัว และ WiFi สาธารณะ",
    metaDescription: "คำแนะนำ VPN อิสระสำหรับใช้ในโมร็อกโก: ใช้ WiFi สาธารณะอย่างปลอดภัย ความเป็นส่วนตัวที่แข็งแกร่งขึ้น และการเข้าถึงที่เสถียรขณะเดินทาง",
    ogTitle: "VPN ที่ดีที่สุดสำหรับโมร็อกโก",
    ogDescription: "คำแนะนำ VPN จากข้อมูลจริง สำหรับเดินทางโมร็อกโก ความเป็นส่วนตัวประจำวัน และการเข้าถึงสตรีมมิ่ง",
    badge: "หน้าเฉพาะสำหรับการท่องเที่ยวโมร็อกโก",
    h1: "VPN ที่ดีที่สุดสำหรับโมร็อกโก",
    intro: "สำหรับการเดินทางในโมร็อกโก คุณภาพของ VPN มีความสำคัญบนเครือข่ายโรงแรมและเครือข่ายสาธารณะ เราเน้นที่ประสิทธิภาพการใช้งานจริง ความโปร่งใสด้านความเป็นส่วนตัว และการเข้าถึงแอปที่เชื่อถือได้สำหรับนักเดินทาง",
    wifiTitle: "ความปลอดภัยบน WiFi สาธารณะ",
    wifiDesc: "เข้ารหัสข้อมูลบนเครือข่ายโรงแรม สนามบิน และคาเฟ่ที่มีความเสี่ยงต่อการดักข้อมูลสูง",
    privacyTitle: "มาตรฐานความเป็นส่วนตัว",
    privacyDesc: "เราให้ความสำคัญกับหลักฐานไม่เก็บบันทึก ความชัดเจนของผู้เป็นเจ้าของ และความน่าเชื่อถือของ kill switch",
    contentTitle: "การเข้าถึงเนื้อหา",
    contentDesc: "ประสิทธิภาพเซิร์ฟเวอร์ต่างประเทศที่เสถียรสำหรับสตรีมมิ่งและบริการตามภูมิภาค",
    picksTitle: "VPN แนะนำสำหรับโมร็อกโก",
    getVpn: "เลือก",
    readReview: "อ่านรีวิวฉบับเต็ม",
    researchTitle: "หน้านี้เชื่อมโยงกับระบบวิจัยของเราอย่างไร",
    dataSource: "แหล่งข้อมูล:",
    scoringRules: "เกณฑ์การให้คะแนน:",
    methodology: "วิธีการทดสอบ",
    interactiveFilters: "ตัวกรองแบบโต้ตอบ:",
    vpnIndex: "แดชบอร์ด VPN Index",
    relatedTitle: "คู่มือภายในที่เกี่ยวข้อง",
    related: [
      { title: "VPN สำหรับเดินทาง", description: "วิธีรักษาการเชื่อมต่อและความเป็นส่วนตัวเมื่อเดินทางข้ามประเทศ", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "ความปลอดภัยบน WiFi สาธารณะ", description: "ขั้นตอนที่ใช้งานได้จริงเพื่อปกป้องข้อมูลบนเครือข่ายเปิด", href: "/guides/public-wifi-safety", icon: "shield" },
      { title: "VPN ที่ดีที่สุดสำหรับความเป็นส่วนตัว", description: "VPN ที่มีความโปร่งใสและคุณสมบัติด้านความเป็นส่วนตัวแข็งแกร่งที่สุด", href: "/best/vpn-privacy", icon: "shield" },
      { title: "VPN ที่ดีที่สุดสำหรับสตรีมมิ่ง", description: "การเปรียบเทียบที่เน้นความสม่ำเสมอในการปลดบล็อกสตรีมมิ่ง", href: "/best/vpn-streaming", icon: "tv" },
      { title: "VPN ราคาถูกที่ดีที่สุด", description: "ตัวเลือกที่เน้นความคุ้มค่าเมื่องบประมาณมาก่อน", href: "/best/vpn-cheap", icon: "price" },
      { title: "ประเทศ", description: "สถานการณ์การเซ็นเซอร์และการเข้าถึง VPN แยกตามประเทศ", href: "/countries", icon: "location" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();
  const t = content[locale] || content.en;
  return {
    metadataBase: new URL(baseUrl),
    title: `${t.metaTitle} (${shortMonthYear})`,
    description: t.metaDescription,
    alternates: generateAlternates("/best/vpn-morocco", locale),
    openGraph: {
      title: `${t.ogTitle} (${shortMonthYear})`,
      description: t.ogDescription,
      type: "article",
    },
  };
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export default async function VpnMoroccoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const expressvpn = await getVpnBySlug("expressvpn");

  const picks = [nordvpn, surfshark, expressvpn].filter(isDefined);
  const t = content[locale] || content.en;

  return (
    <div className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-morocco" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <Plane className="h-3.5 w-3.5 mr-1" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{t.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{t.intro}</p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/20">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                {t.wifiTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.wifiDesc}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                {t.privacyTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.privacyDesc}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tv className="h-4 w-4 text-primary" />
                {t.contentTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.contentDesc}</CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold">{t.picksTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {picks.map((vpn) => (
              <Card key={vpn.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{vpn.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Speed score: {vpn.speedScore}%</p>
                  <p>Streaming score: {vpn.streamingScore}%</p>
                  <p>Servers: {vpn.servers.toLocaleString()} across {vpn.countries} countries</p>
                  <p>From ${vpn.priceTwoYear ?? vpn.priceYearly}/mo</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} size="sm">
                      {t.getVpn} {vpn.name}
                    </AffiliateButton>
                    <Link href={`/reviews/${vpn.slug}`} className="text-primary hover:underline text-xs">
                      {t.readReview}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Go2NetworkSection locale={locale} />

      <section className="py-10">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t.researchTitle}
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              {t.dataSource}{" "}
              <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">
                VPN Transparency &amp; Performance Index 2026
              </Link>
            </li>
            <li>
              {t.scoringRules}{" "}
              <Link href="/methodology" className="text-primary hover:underline">
                {t.methodology}
              </Link>
            </li>
            <li>
              {t.interactiveFilters}{" "}
              <Link href="/vpn-index" className="text-primary hover:underline">
                {t.vpnIndex}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-12">
        <div className="container max-w-6xl">
          <RelatedPages title={t.relatedTitle} pages={t.related} />
        </div>
      </section>
    </div>
  );
}
