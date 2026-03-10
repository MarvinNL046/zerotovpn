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
import { Plane, Shield, Tv, Wifi, MessageCircle } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

const content: Record<string, {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  badge: string;
  h1: string;
  intro: string;
  streamingTitle: string;
  streamingDesc: string;
  wifiTitle: string;
  wifiDesc: string;
  appTitle: string;
  appDesc: string;
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
    metaTitle: "Best VPN for Vietnam - Travel, Privacy & Streaming",
    metaDescription: "Independent picks for using a VPN in Vietnam: safer public WiFi, consistent app access, and stronger privacy while traveling.",
    ogTitle: "Best VPN for Vietnam",
    ogDescription: "Data-driven VPN picks for Vietnam travel, work, and streaming use cases.",
    badge: "Vietnam travel intent page",
    h1: "Best VPN for Vietnam",
    intro: "For Vietnam travel and remote work, your VPN should offer stable speeds, safe WiFi protection, and transparent privacy standards. This page summarizes practical picks based on our test data.",
    streamingTitle: "Streaming Access",
    streamingDesc: "Reliable unlock performance for common streaming libraries and travel media habits.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Encrypt traffic on airport, cafe, hotel, and coworking networks.",
    appTitle: "Everyday App Access",
    appDesc: "Stable protocols help keep messaging and calling apps available while moving between networks.",
    picksTitle: "Top VPN picks for Vietnam",
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
      { title: "VPN for Travel", description: "How to stay connected and private while moving between countries.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Vietnam country guide", description: "Country-level context for internet access and restrictions.", href: "/countries/vietnam", icon: "location" },
      { title: "Best VPN for Streaming", description: "Unlock reliability and speed comparisons.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Mobile", description: "Top VPNs for phones and tablets while traveling.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Best VPN for Thailand", description: "Neighboring travel route with detailed VPN picks.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor Vietnam - Reizen, Privacy & Streaming",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in Vietnam: veiliger openbaar WiFi, consistente app-toegang en sterkere privacy onderweg.",
    ogTitle: "Beste VPN voor Vietnam",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar Vietnam, werken en streaming.",
    badge: "Vietnam reisgericht",
    h1: "Beste VPN voor Vietnam",
    intro: "Voor reizen en thuiswerken in Vietnam moet je VPN stabiele snelheden, veilige WiFi-bescherming en transparante privacystandaarden bieden. Deze pagina vat praktische keuzes samen op basis van onze testgegevens.",
    streamingTitle: "Streamingtoegang",
    streamingDesc: "Betrouwbare ontgrendelingsprestaties voor veelgebruikte streamingbibliotheken en mediagewoonten onderweg.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Versleutel verkeer op luchthaven-, café-, hotel- en coworkingnetwerken.",
    appTitle: "Dagelijkse app-toegang",
    appDesc: "Stabiele protocollen houden berichten- en bel-apps beschikbaar terwijl je wisselt tussen netwerken.",
    picksTitle: "Beste VPN-keuzes voor Vietnam",
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
      { title: "Vietnam landengids", description: "Landelijke context voor internettoegang en beperkingen.", href: "/countries/vietnam", icon: "location" },
      { title: "Beste VPN voor streaming", description: "Vergelijkingen van ontgrendelingsbetrouwbaarheid en snelheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste mobiele VPN", description: "Top VPN's voor telefoons en tablets tijdens het reizen.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Beste VPN voor Thailand", description: "Aangrenzende reisroute met gedetailleerde VPN-aanbevelingen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für Vietnam – Reisen, Privatsphäre & Streaming",
    metaDescription: "Unabhängige Empfehlungen für VPNs in Vietnam: sicheres öffentliches WLAN, zuverlässiger App-Zugang und stärkere Privatsphäre unterwegs.",
    ogTitle: "Bestes VPN für Vietnam",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Vietnam-Reisen, Arbeit und Streaming.",
    badge: "Vietnam-Reiseseite",
    h1: "Bestes VPN für Vietnam",
    intro: "Für Reisen und Homeoffice in Vietnam sollte dein VPN stabile Geschwindigkeiten, sicheren WLAN-Schutz und transparente Datenschutzstandards bieten. Diese Seite fasst praktische Empfehlungen auf Basis unserer Testdaten zusammen.",
    streamingTitle: "Streaming-Zugang",
    streamingDesc: "Zuverlässige Entsperrleistung für gängige Streaming-Bibliotheken und Mediengewohnheiten unterwegs.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Verschlüssle deinen Datenverkehr in Flughafen-, Café-, Hotel- und Coworking-Netzwerken.",
    appTitle: "Alltäglicher App-Zugang",
    appDesc: "Stabile Protokolle halten Messenger- und Telefonie-Apps beim Wechsel zwischen Netzwerken verfügbar.",
    picksTitle: "Top-VPN-Empfehlungen für Vietnam",
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
      { title: "Vietnam Länderguide", description: "Länderkontext für Internetzugang und Einschränkungen.", href: "/countries/vietnam", icon: "location" },
      { title: "Bestes VPN für Streaming", description: "Vergleiche zu Entsperrzuverlässigkeit und Geschwindigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes mobiles VPN", description: "Top-VPNs für Smartphones und Tablets auf Reisen.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Bestes VPN für Thailand", description: "Benachbarte Reiseroute mit detaillierten VPN-Empfehlungen.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para Vietnam – Viajes, Privacidad y Streaming",
    metaDescription: "Selección independiente de VPN para Vietnam: WiFi público más seguro, acceso estable a apps y mayor privacidad mientras viajas.",
    ogTitle: "Mejor VPN para Vietnam",
    ogDescription: "Selección de VPN basada en datos para viajes a Vietnam, trabajo y streaming.",
    badge: "Página de viaje a Vietnam",
    h1: "Mejor VPN para Vietnam",
    intro: "Para viajar y trabajar en remoto en Vietnam, tu VPN debe ofrecer velocidades estables, protección en WiFi público y estándares de privacidad transparentes. Esta página resume las mejores opciones según nuestros datos de prueba.",
    streamingTitle: "Acceso a streaming",
    streamingDesc: "Desbloqueo fiable de catálogos de streaming populares y hábitos de consumo multimedia en viajes.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Cifra tu tráfico en redes de aeropuertos, cafeterías, hoteles y coworkings.",
    appTitle: "Acceso diario a apps",
    appDesc: "Los protocolos estables mantienen disponibles las apps de mensajería y llamadas al cambiar entre redes.",
    picksTitle: "Mejores VPN para Vietnam",
    getVpn: "Obtener",
    readReview: "Leer reseña completa",
    researchTitle: "Cómo se conecta esta página con nuestro sistema de investigación",
    dataSource: "Fuente de datos:",
    scoringRules: "Reglas de puntuación:",
    methodology: "Metodología",
    interactiveFilters: "Filtros interactivos:",
    vpnIndex: "Panel del índice VPN",
    relatedTitle: "Guías internas relacionadas",
    related: [
      { title: "VPN para viajar", description: "Cómo mantenerte conectado y protegido al moverte entre países.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Guía de Vietnam", description: "Contexto a nivel de país sobre acceso a internet y restricciones.", href: "/countries/vietnam", icon: "location" },
      { title: "Mejor VPN para streaming", description: "Comparativas de fiabilidad de desbloqueo y velocidad.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN para móvil", description: "Las mejores VPN para teléfonos y tablets en viajes.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Mejor VPN para Tailandia", description: "Ruta de viaje cercana con selección detallada de VPN.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Países", description: "Contexto de censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour le Vietnam – Voyage, Confidentialité et Streaming",
    metaDescription: "Sélections indépendantes de VPN pour le Vietnam : WiFi public plus sûr, accès stable aux applications et meilleure confidentialité en voyage.",
    ogTitle: "Meilleur VPN pour le Vietnam",
    ogDescription: "Sélections VPN basées sur les données pour voyager au Vietnam, travailler et streamer.",
    badge: "Page voyage Vietnam",
    h1: "Meilleur VPN pour le Vietnam",
    intro: "Pour voyager et travailler à distance au Vietnam, votre VPN doit offrir des vitesses stables, une protection WiFi fiable et des standards de confidentialité transparents. Cette page résume les meilleures options selon nos données de test.",
    streamingTitle: "Accès au streaming",
    streamingDesc: "Déblocage fiable des catalogues de streaming populaires et habitudes médias en déplacement.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Chiffrez votre trafic sur les réseaux d'aéroports, de cafés, d'hôtels et de coworkings.",
    appTitle: "Accès quotidien aux applications",
    appDesc: "Des protocoles stables maintiennent les applications de messagerie et d'appel disponibles lors des changements de réseau.",
    picksTitle: "Meilleurs VPN pour le Vietnam",
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
      { title: "Guide du Vietnam", description: "Contexte national sur l'accès à internet et les restrictions.", href: "/countries/vietnam", icon: "location" },
      { title: "Meilleur VPN pour le streaming", description: "Comparatifs de fiabilité de déblocage et de vitesse.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN mobile", description: "Les meilleurs VPN pour téléphones et tablettes en voyage.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "Meilleur VPN pour la Thaïlande", description: "Itinéraire de voyage voisin avec sélection détaillée de VPN.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "Pays", description: "Censure et accès VPN pays par pays.", href: "/countries", icon: "location" },
    ],
  },
  zh: {
    metaTitle: "越南最佳VPN - 旅行、隐私和流媒体",
    metaDescription: "独立推荐适合在越南使用的VPN：更安全的公共WiFi、稳定的应用访问以及旅行中更强的隐私保护。",
    ogTitle: "越南最佳VPN",
    ogDescription: "基于数据的越南旅行、工作和流媒体VPN推荐。",
    badge: "越南旅行专页",
    h1: "越南最佳VPN",
    intro: "在越南旅行和远程办公时，您的VPN应提供稳定的速度、安全的WiFi防护和透明的隐私标准。本页面根据我们的测试数据总结了实用推荐。",
    streamingTitle: "流媒体访问",
    streamingDesc: "可靠地解锁常用流媒体内容库，满足旅途中的媒体观看需求。",
    wifiTitle: "公共WiFi安全",
    wifiDesc: "在机场、咖啡馆、酒店和共享办公空间网络上加密流量。",
    appTitle: "日常应用访问",
    appDesc: "稳定的协议有助于在切换网络时保持即时通讯和通话应用的可用性。",
    picksTitle: "越南最佳VPN推荐",
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
      { title: "旅行VPN指南", description: "在不同国家间移动时保持连接和隐私的方法。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "越南国家指南", description: "越南互联网访问和限制的国家级背景。", href: "/countries/vietnam", icon: "location" },
      { title: "流媒体最佳VPN", description: "解锁可靠性和速度对比。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "最佳移动VPN", description: "旅行时适合手机和平板的顶级VPN。", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "泰国最佳VPN", description: "相邻旅行路线的详细VPN推荐。", href: "/best/vpn-thailand", icon: "globe" },
      { title: "国家", description: "各国审查制度和VPN访问情况。", href: "/countries", icon: "location" },
    ],
  },
  ja: {
    metaTitle: "ベトナムにおすすめのVPN - 旅行・プライバシー・ストリーミング",
    metaDescription: "ベトナムでのVPN利用を独自に厳選：安全な公共WiFi、安定したアプリアクセス、旅行中のプライバシー強化。",
    ogTitle: "ベトナムにおすすめのVPN",
    ogDescription: "データに基づくベトナム旅行・仕事・ストリーミング向けVPN推薦。",
    badge: "ベトナム旅行ガイド",
    h1: "ベトナムにおすすめのVPN",
    intro: "ベトナムでの旅行やリモートワークには、安定した速度、安全なWiFi保護、透明性のあるプライバシー基準を備えたVPNが必要です。このページでは、テストデータに基づく実用的なおすすめをまとめています。",
    streamingTitle: "ストリーミングアクセス",
    streamingDesc: "主要なストリーミングライブラリの確実なアンロックと、旅行中のメディア視聴への対応。",
    wifiTitle: "公共WiFiの安全性",
    wifiDesc: "空港、カフェ、ホテル、コワーキングスペースのネットワーク上でトラフィックを暗号化します。",
    appTitle: "日常アプリへのアクセス",
    appDesc: "安定したプロトコルにより、ネットワーク切り替え時もメッセージングや通話アプリの利用を維持できます。",
    picksTitle: "ベトナム向けおすすめVPN",
    getVpn: "入手",
    readReview: "詳細レビューを読む",
    researchTitle: "このページと当サイトの調査体系との関連",
    dataSource: "データソース：",
    scoringRules: "スコアリングルール：",
    methodology: "方法論",
    interactiveFilters: "インタラクティブフィルター：",
    vpnIndex: "VPNインデックスダッシュボード",
    relatedTitle: "関連する内部ガイド",
    related: [
      { title: "旅行向けVPNガイド", description: "国をまたいで移動する際に接続とプライバシーを維持する方法。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "ベトナム国別ガイド", description: "ベトナムのインターネットアクセスと規制に関する概要。", href: "/countries/vietnam", icon: "location" },
      { title: "ストリーミングにおすすめのVPN", description: "アンロックの信頼性と速度の比較。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "モバイルにおすすめのVPN", description: "旅行中のスマートフォンやタブレットに最適なVPN。", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "タイにおすすめのVPN", description: "近隣の旅行ルートに対応した詳細なVPN推薦。", href: "/best/vpn-thailand", icon: "globe" },
      { title: "国別ガイド", description: "各国の検閲状況とVPNアクセスの概要。", href: "/countries", icon: "location" },
    ],
  },
  ko: {
    metaTitle: "베트남 최고의 VPN - 여행, 개인정보 보호 및 스트리밍",
    metaDescription: "베트남에서 VPN을 사용하기 위한 독립 추천: 안전한 공용 WiFi, 안정적인 앱 접속, 여행 중 강화된 개인정보 보호.",
    ogTitle: "베트남 최고의 VPN",
    ogDescription: "베트남 여행, 업무, 스트리밍을 위한 데이터 기반 VPN 추천.",
    badge: "베트남 여행 전용 페이지",
    h1: "베트남 최고의 VPN",
    intro: "베트남 여행과 원격 근무를 위해 VPN은 안정적인 속도, 안전한 WiFi 보호, 투명한 개인정보 보호 기준을 제공해야 합니다. 이 페이지에서는 테스트 데이터를 기반으로 한 실용적인 추천을 정리했습니다.",
    streamingTitle: "스트리밍 접속",
    streamingDesc: "주요 스트리밍 라이브러리의 안정적인 차단 해제와 여행 중 미디어 이용 지원.",
    wifiTitle: "공용 WiFi 보안",
    wifiDesc: "공항, 카페, 호텔, 코워킹 스페이스 네트워크에서 트래픽을 암호화합니다.",
    appTitle: "일상 앱 접속",
    appDesc: "안정적인 프로토콜로 네트워크 전환 시에도 메시징 및 통화 앱을 원활하게 사용할 수 있습니다.",
    picksTitle: "베트남을 위한 VPN 추천",
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
      { title: "베트남 국가 가이드", description: "베트남의 인터넷 접속 및 제한에 대한 개요.", href: "/countries/vietnam", icon: "location" },
      { title: "스트리밍 최고의 VPN", description: "차단 해제 안정성과 속도 비교.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "최고의 모바일 VPN", description: "여행 중 스마트폰과 태블릿에 최적화된 VPN.", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "태국 최고의 VPN", description: "인접 여행 루트에 대한 상세 VPN 추천.", href: "/best/vpn-thailand", icon: "globe" },
      { title: "국가별 정보", description: "국가별 검열 현황과 VPN 접속 환경.", href: "/countries", icon: "location" },
    ],
  },
  th: {
    metaTitle: "VPN ที่ดีที่สุดสำหรับเวียดนาม - เดินทาง ความเป็นส่วนตัว และสตรีมมิง",
    metaDescription: "คำแนะนำ VPN อิสระสำหรับใช้งานในเวียดนาม: WiFi สาธารณะที่ปลอดภัยขึ้น เข้าถึงแอปได้สม่ำเสมอ และความเป็นส่วนตัวที่แข็งแกร่งขณะเดินทาง",
    ogTitle: "VPN ที่ดีที่สุดสำหรับเวียดนาม",
    ogDescription: "คำแนะนำ VPN จากข้อมูลจริงสำหรับการเดินทาง ทำงาน และสตรีมมิงในเวียดนาม",
    badge: "หน้าแนะนำสำหรับเดินทางในเวียดนาม",
    h1: "VPN ที่ดีที่สุดสำหรับเวียดนาม",
    intro: "สำหรับการเดินทางและทำงานทางไกลในเวียดนาม VPN ของคุณควรมีความเร็วที่เสถียร การป้องกัน WiFi ที่ปลอดภัย และมาตรฐานความเป็นส่วนตัวที่โปร่งใส หน้านี้สรุปตัวเลือกที่ใช้งานได้จริงจากข้อมูลการทดสอบของเรา",
    streamingTitle: "เข้าถึงสตรีมมิง",
    streamingDesc: "ปลดล็อกคลังสตรีมมิงยอดนิยมได้อย่างเสถียรและรองรับนิสัยการรับชมสื่อขณะเดินทาง",
    wifiTitle: "ความปลอดภัยบน WiFi สาธารณะ",
    wifiDesc: "เข้ารหัสทราฟฟิกบนเครือข่ายสนามบิน คาเฟ่ โรงแรม และพื้นที่ทำงานร่วม",
    appTitle: "เข้าถึงแอปในชีวิตประจำวัน",
    appDesc: "โปรโตคอลที่เสถียรช่วยให้แอปส่งข้อความและโทรศัพท์ใช้งานได้ต่อเนื่องขณะสลับระหว่างเครือข่าย",
    picksTitle: "VPN แนะนำสำหรับเวียดนาม",
    getVpn: "เลือกใช้",
    readReview: "อ่านรีวิวฉบับเต็ม",
    researchTitle: "หน้านี้เชื่อมโยงกับระบบวิจัยของเราอย่างไร",
    dataSource: "แหล่งข้อมูล:",
    scoringRules: "เกณฑ์การให้คะแนน:",
    methodology: "วิธีการทดสอบ",
    interactiveFilters: "ตัวกรองแบบโต้ตอบ:",
    vpnIndex: "แดชบอร์ด VPN Index",
    relatedTitle: "คู่มือที่เกี่ยวข้อง",
    related: [
      { title: "VPN สำหรับการเดินทาง", description: "วิธีรักษาการเชื่อมต่อและความเป็นส่วนตัวขณะเดินทางข้ามประเทศ", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "คู่มือประเทศเวียดนาม", description: "ข้อมูลระดับประเทศเกี่ยวกับการเข้าถึงอินเทอร์เน็ตและข้อจำกัด", href: "/countries/vietnam", icon: "location" },
      { title: "VPN ที่ดีที่สุดสำหรับสตรีมมิง", description: "เปรียบเทียบความเสถียรในการปลดล็อกและความเร็ว", href: "/best/vpn-streaming", icon: "tv" },
      { title: "VPN ที่ดีที่สุดสำหรับมือถือ", description: "VPN อันดับต้นสำหรับสมาร์ทโฟนและแท็บเล็ตขณะเดินทาง", href: "/best/vpn-mobile", icon: "smartphone" },
      { title: "VPN ที่ดีที่สุดสำหรับไทย", description: "เส้นทางท่องเที่ยวใกล้เคียงพร้อมคำแนะนำ VPN โดยละเอียด", href: "/best/vpn-thailand", icon: "globe" },
      { title: "ข้อมูลรายประเทศ", description: "สถานการณ์การเซ็นเซอร์และการเข้าถึง VPN แยกตามประเทศ", href: "/countries", icon: "location" },
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
    alternates: generateAlternates("/best/vpn-vietnam", locale),
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

export default async function VpnVietnamPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-vietnam" }]} className="mb-8" />
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
                <Tv className="h-4 w-4 text-primary" />
                {t.streamingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.streamingDesc}</CardContent>
          </Card>
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
                <MessageCircle className="h-4 w-4 text-primary" />
                {t.appTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{t.appDesc}</CardContent>
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
            <Shield className="h-5 w-5 text-primary" />
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
