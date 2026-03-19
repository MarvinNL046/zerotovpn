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
  privacyTitle: string;
  privacyDesc: string;
  streamingTitle: string;
  streamingDesc: string;
  wifiTitle: string;
  wifiDesc: string;
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
    metaTitle: "Best VPN for USA - Privacy, Streaming & Travel",
    metaDescription: "Independent picks for using a VPN in the United States: privacy on public networks, stable speeds, and reliable access while traveling.",
    ogTitle: "Best VPN for USA",
    ogDescription: "Data-driven VPN picks for US travel, privacy, and streaming use cases.",
    badge: "USA travel intent page",
    h1: "Best VPN for USA",
    intro: "Whether you are in the US or traveling abroad with a need for US services, your VPN should be transparent, fast, and stable for day-to-day work, streaming, and public network security.",
    privacyTitle: "Privacy Layer",
    privacyDesc: "Keep traffic encrypted on open networks and add protection against passive tracking.",
    streamingTitle: "US Streaming Access",
    streamingDesc: "Reliable access to US libraries and stable playback performance across devices.",
    wifiTitle: "Public WiFi Safety",
    wifiDesc: "Essential for airport, hotel, and coworking WiFi during domestic and international travel.",
    picksTitle: "Top VPN picks for USA",
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
      { title: "Best VPN for Streaming", description: "Comparison focused on Netflix, Disney+, and streaming reliability.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Best VPN for Netflix", description: "Detailed tests for library unlocks and playback consistency.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Best VPN for Privacy", description: "VPNs with clear ownership and stronger no-logs evidence.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Public WiFi Safety", description: "How to stay safer on open WiFi networks.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN for Travel", description: "How to use VPNs while moving across countries and networks.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Countries", description: "Country-by-country censorship and VPN access context.", href: "/countries", icon: "location" },
    ],
  },
  nl: {
    metaTitle: "Beste VPN voor de VS - Privacy, Streaming & Reizen",
    metaDescription: "Onafhankelijke aanbevelingen voor een VPN in de Verenigde Staten: privacy op openbare netwerken, stabiele snelheden en betrouwbare toegang onderweg.",
    ogTitle: "Beste VPN voor de VS",
    ogDescription: "Datagedreven VPN-aanbevelingen voor reizen naar de VS, privacy en streaming.",
    badge: "VS reisgericht",
    h1: "Beste VPN voor de VS",
    intro: "Of je nu in de VS bent of in het buitenland reist met behoefte aan Amerikaanse diensten, je VPN moet transparant, snel en stabiel zijn voor dagelijks werk, streaming en beveiliging op openbare netwerken.",
    privacyTitle: "Privacylaag",
    privacyDesc: "Houd verkeer versleuteld op open netwerken en voeg bescherming toe tegen passieve tracking.",
    streamingTitle: "Amerikaanse streamingtoegang",
    streamingDesc: "Betrouwbare toegang tot Amerikaanse bibliotheken en stabiele afspeelprestaties op alle apparaten.",
    wifiTitle: "Openbare WiFi-veiligheid",
    wifiDesc: "Essentieel voor luchthaven-, hotel- en coworking-WiFi tijdens binnenlandse en internationale reizen.",
    picksTitle: "Beste VPN-keuzes voor de VS",
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
      { title: "Beste VPN voor streaming", description: "Vergelijking gericht op Netflix, Disney+ en streamingbetrouwbaarheid.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Beste VPN voor Netflix", description: "Gedetailleerde tests voor het ontgrendelen van bibliotheken en afspeelconsistentie.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Beste VPN voor privacy", description: "VPN's met duidelijk eigenaarschap en sterker no-logsbewijs.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Openbare WiFi-veiligheid", description: "Hoe je veiliger blijft op open WiFi-netwerken.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN voor op reis", description: "Hoe je VPN's gebruikt tijdens reizen tussen landen en netwerken.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Landen", description: "Land-voor-land overzicht van censuur en VPN-toegang.", href: "/countries", icon: "location" },
    ],
  },
  de: {
    metaTitle: "Bestes VPN für die USA – Privatsphäre, Streaming & Reisen",
    metaDescription: "Unabhängige Empfehlungen für VPNs in den USA: Privatsphäre in öffentlichen Netzwerken, stabile Geschwindigkeiten und zuverlässiger Zugang unterwegs.",
    ogTitle: "Bestes VPN für die USA",
    ogDescription: "Datenbasierte VPN-Empfehlungen für Reisen in die USA, Privatsphäre und Streaming.",
    badge: "USA-Reiseseite",
    h1: "Bestes VPN für die USA",
    intro: "Ob du in den USA bist oder im Ausland reist und US-Dienste brauchst – dein VPN sollte transparent, schnell und stabil sein für Arbeit, Streaming und Sicherheit in öffentlichen Netzwerken.",
    privacyTitle: "Privatsphäre-Schutz",
    privacyDesc: "Halte deinen Datenverkehr in offenen Netzwerken verschlüsselt und schütze dich vor passivem Tracking.",
    streamingTitle: "US-Streaming-Zugang",
    streamingDesc: "Zuverlässiger Zugriff auf US-Bibliotheken und stabile Wiedergabe auf allen Geräten.",
    wifiTitle: "Sicherheit im öffentlichen WLAN",
    wifiDesc: "Unverzichtbar für Flughafen-, Hotel- und Coworking-WLAN auf Inlands- und Auslandsreisen.",
    picksTitle: "Top-VPN-Empfehlungen für die USA",
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
      { title: "Bestes VPN für Streaming", description: "Vergleich mit Fokus auf Netflix, Disney+ und Streaming-Zuverlässigkeit.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Bestes VPN für Netflix", description: "Detaillierte Tests zum Entsperren von Bibliotheken und Wiedergabekonsistenz.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Bestes VPN für Privatsphäre", description: "VPNs mit klaren Eigentumsverhältnissen und stärkeren No-Logs-Nachweisen.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Öffentliches WLAN absichern", description: "So bleibst du in offenen WLAN-Netzwerken sicherer.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN für Reisen", description: "So nutzt du VPNs beim Wechsel zwischen Ländern und Netzwerken.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Länder", description: "Zensur und VPN-Zugang nach Ländern.", href: "/countries", icon: "location" },
    ],
  },
  es: {
    metaTitle: "Mejor VPN para EE. UU. – Privacidad, Streaming y Viajes",
    metaDescription: "Selección independiente de VPN para Estados Unidos: privacidad en redes públicas, velocidades estables y acceso fiable mientras viajas.",
    ogTitle: "Mejor VPN para EE. UU.",
    ogDescription: "Selección de VPN basada en datos para viajes a EE. UU., privacidad y streaming.",
    badge: "Página de viaje a EE. UU.",
    h1: "Mejor VPN para EE. UU.",
    intro: "Ya sea que estés en Estados Unidos o viajando al extranjero y necesites acceder a servicios estadounidenses, tu VPN debe ser transparente, rápida y estable para el trabajo diario, el streaming y la seguridad en redes públicas.",
    privacyTitle: "Capa de privacidad",
    privacyDesc: "Mantén tu tráfico cifrado en redes abiertas y añade protección contra el rastreo pasivo.",
    streamingTitle: "Acceso a streaming de EE. UU.",
    streamingDesc: "Acceso fiable a catálogos estadounidenses y reproducción estable en todos los dispositivos.",
    wifiTitle: "Seguridad en WiFi público",
    wifiDesc: "Imprescindible para WiFi de aeropuertos, hoteles y coworkings en viajes nacionales e internacionales.",
    picksTitle: "Mejores VPN para EE. UU.",
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
      { title: "Mejor VPN para streaming", description: "Comparativa centrada en Netflix, Disney+ y fiabilidad de streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Mejor VPN para Netflix", description: "Pruebas detalladas de desbloqueo de catálogos y consistencia de reproducción.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Mejor VPN para privacidad", description: "VPN con titularidad clara y mayor evidencia de no registros.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Seguridad en WiFi público", description: "Cómo mantenerte más seguro en redes WiFi abiertas.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN para viajar", description: "Cómo usar VPN al desplazarte entre países y redes.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Países", description: "Contexto de censura y acceso VPN país por país.", href: "/countries", icon: "location" },
    ],
  },
  fr: {
    metaTitle: "Meilleur VPN pour les États-Unis – Confidentialité, Streaming et Voyage",
    metaDescription: "Sélections indépendantes de VPN pour les États-Unis : confidentialité sur les réseaux publics, vitesses stables et accès fiable en déplacement.",
    ogTitle: "Meilleur VPN pour les États-Unis",
    ogDescription: "Sélections VPN basées sur les données pour voyager aux USA, confidentialité et streaming.",
    badge: "Page voyage États-Unis",
    h1: "Meilleur VPN pour les États-Unis",
    intro: "Que vous soyez aux États-Unis ou en voyage à l'étranger avec un besoin d'accéder aux services américains, votre VPN doit être transparent, rapide et stable pour le travail quotidien, le streaming et la sécurité sur les réseaux publics.",
    privacyTitle: "Couche de confidentialité",
    privacyDesc: "Gardez votre trafic chiffré sur les réseaux ouverts et ajoutez une protection contre le pistage passif.",
    streamingTitle: "Accès au streaming US",
    streamingDesc: "Accès fiable aux catalogues américains et lecture stable sur tous les appareils.",
    wifiTitle: "Sécurité WiFi public",
    wifiDesc: "Indispensable pour le WiFi d'aéroports, d'hôtels et de coworkings lors de voyages nationaux et internationaux.",
    picksTitle: "Meilleurs VPN pour les États-Unis",
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
      { title: "Meilleur VPN pour le streaming", description: "Comparatif axé sur Netflix, Disney+ et la fiabilité du streaming.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Meilleur VPN pour Netflix", description: "Tests détaillés de déblocage de catalogues et cohérence de lecture.", href: "/best/vpn-netflix", icon: "play" },
      { title: "Meilleur VPN pour la confidentialité", description: "VPN avec propriété claire et preuves solides de non-journalisation.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "Sécurité WiFi public", description: "Comment rester protégé sur les réseaux WiFi ouverts.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN pour voyager", description: "Comment utiliser un VPN en se déplaçant entre pays et réseaux.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "Pays", description: "Censure et accès VPN pays par pays.", href: "/countries", icon: "location" },
    ],
  },
  zh: {
    metaTitle: "美国最佳VPN - 隐私、流媒体和旅行",
    metaDescription: "独立推荐适合在美国使用的VPN：公共网络上的隐私保护、稳定速度以及旅行中的可靠访问。",
    ogTitle: "美国最佳VPN",
    ogDescription: "基于数据的美国旅行、隐私和流媒体VPN推荐。",
    badge: "美国旅行专页",
    h1: "美国最佳VPN",
    intro: "无论您身在美国还是出国旅行需要访问美国服务，您的VPN都应该透明、快速且稳定，满足日常工作、流媒体和公共网络安全需求。",
    privacyTitle: "隐私保护层",
    privacyDesc: "在开放网络上保持流量加密，增加对被动追踪的防护。",
    streamingTitle: "美国流媒体访问",
    streamingDesc: "可靠访问美国内容库，在各设备上稳定播放。",
    wifiTitle: "公共WiFi安全",
    wifiDesc: "在国内和国际旅行中使用机场、酒店和共享办公空间WiFi时必不可少。",
    picksTitle: "美国最佳VPN推荐",
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
      { title: "流媒体最佳VPN", description: "专注于Netflix、Disney+和流媒体可靠性的对比。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Netflix最佳VPN", description: "片库解锁和播放稳定性的详细测试。", href: "/best/vpn-netflix", icon: "play" },
      { title: "隐私最佳VPN", description: "拥有明确所有权和更强无日志证据的VPN。", href: "/best/vpn-privacy", icon: "shield" },
      { title: "公共WiFi安全", description: "如何在开放WiFi网络上保持更安全。", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "旅行VPN指南", description: "在不同国家和网络间移动时如何使用VPN。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "国家", description: "各国审查制度和VPN访问情况。", href: "/countries", icon: "location" },
    ],
  },
  ja: {
    metaTitle: "アメリカにおすすめのVPN - プライバシー、ストリーミング、旅行",
    metaDescription: "アメリカでの使用に最適なVPNを独自に推薦：公共ネットワークでのプライバシー保護、安定した速度、旅行中の確実なアクセス。",
    ogTitle: "アメリカにおすすめのVPN",
    ogDescription: "データに基づくアメリカ旅行・プライバシー・ストリーミング向けVPN推薦。",
    badge: "アメリカ旅行ガイド",
    h1: "アメリカにおすすめのVPN",
    intro: "アメリカ国内にいる場合も、海外からアメリカのサービスにアクセスしたい場合も、VPNは日常業務、ストリーミング、公共ネットワークのセキュリティに対応できる透明性、速度、安定性を備えている必要があります。",
    privacyTitle: "プライバシー保護",
    privacyDesc: "オープンネットワーク上でトラフィックを暗号化し、受動的な追跡からの保護を強化します。",
    streamingTitle: "アメリカのストリーミングアクセス",
    streamingDesc: "アメリカのコンテンツライブラリへの確実なアクセスと、すべてのデバイスでの安定した再生。",
    wifiTitle: "公共WiFiの安全性",
    wifiDesc: "国内・海外旅行中の空港、ホテル、コワーキングスペースのWiFi利用に不可欠です。",
    picksTitle: "アメリカ向けおすすめVPN",
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
      { title: "ストリーミングにおすすめのVPN", description: "Netflix、Disney+、ストリーミングの信頼性に特化した比較。", href: "/best/vpn-streaming", icon: "tv" },
      { title: "NetflixにおすすめのVPN", description: "ライブラリのアンロックと再生の安定性に関する詳細テスト。", href: "/best/vpn-netflix", icon: "play" },
      { title: "プライバシーにおすすめのVPN", description: "所有権が明確でノーログの証拠がより強力なVPN。", href: "/best/vpn-privacy", icon: "shield" },
      { title: "公共WiFiの安全対策", description: "オープンWiFiネットワークでより安全に過ごす方法。", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "旅行向けVPNガイド", description: "国やネットワークをまたいで移動する際のVPN活用法。", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "国別ガイド", description: "各国の検閲状況とVPNアクセスの概要。", href: "/countries", icon: "location" },
    ],
  },
  ko: {
    metaTitle: "미국 최고의 VPN - 개인정보 보호, 스트리밍 및 여행",
    metaDescription: "미국에서 VPN을 사용하기 위한 독립 추천: 공용 네트워크에서의 개인정보 보호, 안정적인 속도, 여행 중 신뢰할 수 있는 접속.",
    ogTitle: "미국 최고의 VPN",
    ogDescription: "미국 여행, 개인정보 보호, 스트리밍을 위한 데이터 기반 VPN 추천.",
    badge: "미국 여행 전용 페이지",
    h1: "미국 최고의 VPN",
    intro: "미국에 있거나 해외에서 미국 서비스에 접속해야 할 때, VPN은 일상 업무, 스트리밍, 공용 네트워크 보안을 위해 투명하고 빠르며 안정적이어야 합니다.",
    privacyTitle: "개인정보 보호 계층",
    privacyDesc: "개방형 네트워크에서 트래픽을 암호화하고 수동적 추적에 대한 보호를 강화합니다.",
    streamingTitle: "미국 스트리밍 접속",
    streamingDesc: "미국 콘텐츠 라이브러리에 안정적으로 접속하고 모든 기기에서 원활한 재생을 지원합니다.",
    wifiTitle: "공용 WiFi 보안",
    wifiDesc: "국내외 여행 중 공항, 호텔, 코워킹 스페이스 WiFi 이용 시 필수적입니다.",
    picksTitle: "미국을 위한 VPN 추천",
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
      { title: "스트리밍 최고의 VPN", description: "Netflix, Disney+ 및 스트리밍 안정성에 초점을 맞춘 비교.", href: "/best/vpn-streaming", icon: "tv" },
      { title: "Netflix 최고의 VPN", description: "라이브러리 차단 해제 및 재생 안정성에 대한 상세 테스트.", href: "/best/vpn-netflix", icon: "play" },
      { title: "개인정보 보호 최고의 VPN", description: "명확한 소유 구조와 강력한 노로그 증거를 갖춘 VPN.", href: "/best/vpn-privacy", icon: "shield" },
      { title: "공용 WiFi 보안 가이드", description: "개방형 WiFi 네트워크에서 안전하게 지내는 방법.", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "여행용 VPN 가이드", description: "국가와 네트워크를 이동하며 VPN을 활용하는 방법.", href: "/guides/vpn-for-travel", icon: "map" },
      { title: "국가별 정보", description: "국가별 검열 현황과 VPN 접속 환경.", href: "/countries", icon: "location" },
    ],
  },
  th: {
    metaTitle: "VPN ที่ดีที่สุดสำหรับสหรัฐอเมริกา - ความเป็นส่วนตัว สตรีมมิง และการเดินทาง",
    metaDescription: "คำแนะนำ VPN อิสระสำหรับใช้งานในสหรัฐอเมริกา: ความเป็นส่วนตัวบนเครือข่ายสาธารณะ ความเร็วที่เสถียร และการเข้าถึงที่เชื่อถือได้ขณะเดินทาง",
    ogTitle: "VPN ที่ดีที่สุดสำหรับสหรัฐอเมริกา",
    ogDescription: "คำแนะนำ VPN จากข้อมูลจริงสำหรับการเดินทางในสหรัฐฯ ความเป็นส่วนตัว และสตรีมมิง",
    badge: "หน้าแนะนำสำหรับเดินทางในสหรัฐฯ",
    h1: "VPN ที่ดีที่สุดสำหรับสหรัฐอเมริกา",
    intro: "ไม่ว่าคุณจะอยู่ในสหรัฐฯ หรือเดินทางไปต่างประเทศและต้องการเข้าถึงบริการของสหรัฐฯ VPN ของคุณควรโปร่งใส รวดเร็ว และเสถียรสำหรับการทำงานประจำวัน สตรีมมิง และความปลอดภัยบนเครือข่ายสาธารณะ",
    privacyTitle: "ชั้นความเป็นส่วนตัว",
    privacyDesc: "เข้ารหัสทราฟฟิกบนเครือข่ายเปิดและเพิ่มการป้องกันจากการติดตามแบบพาสซีฟ",
    streamingTitle: "เข้าถึงสตรีมมิงสหรัฐฯ",
    streamingDesc: "เข้าถึงคลังเนื้อหาสหรัฐฯ ได้อย่างเสถียรและเล่นวิดีโอได้ราบรื่นบนทุกอุปกรณ์",
    wifiTitle: "ความปลอดภัยบน WiFi สาธารณะ",
    wifiDesc: "จำเป็นสำหรับ WiFi ที่สนามบิน โรงแรม และพื้นที่ทำงานร่วมขณะเดินทางในประเทศและต่างประเทศ",
    picksTitle: "VPN แนะนำสำหรับสหรัฐอเมริกา",
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
      { title: "VPN ที่ดีที่สุดสำหรับสตรีมมิง", description: "เปรียบเทียบโดยเน้น Netflix, Disney+ และความเสถียรในการสตรีม", href: "/best/vpn-streaming", icon: "tv" },
      { title: "VPN ที่ดีที่สุดสำหรับ Netflix", description: "ทดสอบการปลดล็อกคลังเนื้อหาและความเสถียรในการเล่นอย่างละเอียด", href: "/best/vpn-netflix", icon: "play" },
      { title: "VPN ที่ดีที่สุดสำหรับความเป็นส่วนตัว", description: "VPN ที่มีโครงสร้างความเป็นเจ้าของชัดเจนและหลักฐานไม่เก็บล็อกที่แข็งแกร่ง", href: "/best/vpn-privacy", icon: "shield" },
      { title: "ความปลอดภัยบน WiFi สาธารณะ", description: "วิธีรักษาความปลอดภัยบนเครือข่าย WiFi เปิด", href: "/guides/public-wifi-safety", icon: "wifi" },
      { title: "VPN สำหรับการเดินทาง", description: "วิธีใช้ VPN ขณะเดินทางข้ามประเทศและเครือข่าย", href: "/guides/vpn-for-travel", icon: "map" },
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
    alternates: generateAlternates("/best/vpn-usa", locale),
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

export default async function VpnUsaPage({ params }: Props) {
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
          <BreadcrumbSchema items={[{ name: t.h1, href: "/best/vpn-usa" }]} className="mb-8" />
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
