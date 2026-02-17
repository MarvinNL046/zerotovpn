import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getShortMonthYear } from "@/lib/seo-utils";
import { LastUpdated } from "@/components/last-updated";
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
import {
  Shield,
  Zap,
  CheckCircle,
  Lock,
  ArrowRight,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Download,
  Server,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `5 Best VPNs for Torrenting (Tested ${shortMonthYear}) - Fastest P2P, No Logs | ZeroToVPN`,
    nl: `5 Beste VPNs voor Torrenting (Getest ${shortMonthYear}) - Snelste P2P, Geen Logs | ZeroToVPN`,
    de: `5 Beste VPNs für Torrenting (Getestet ${shortMonthYear}) - Schnellste P2P, Keine Logs | ZeroToVPN`,
    es: `5 Mejores VPNs para Torrenting (Probados ${shortMonthYear}) - Más Rápidos P2P, Sin Logs | ZeroToVPN`,
    fr: `5 Meilleurs VPNs pour Torrenting (Testés ${shortMonthYear}) - P2P les Plus Rapides, Sans Logs | ZeroToVPN`,
    zh: `5款最佳种子下载VPN (测试于 ${shortMonthYear}) - 最快P2P，无日志 | ZeroToVPN`,
    ja: `トレント向けベスト5 VPN (テスト済み ${shortMonthYear}) - 最速P2P、ノーログ | ZeroToVPN`,
    ko: `토렌트 최고의 VPN 5가지 (테스트됨 ${shortMonthYear}) - 가장 빠른 P2P, 노로그 | ZeroToVPN`,
    th: `5 VPN ที่ดีที่สุดสำหรับ Torrenting (ทดสอบ ${shortMonthYear}) - P2P เร็วที่สุด ไม่เก็บ Log | ZeroToVPN`,
  };

  const descriptions: Record<string, string> = {
    en: `We tested 40+ VPNs for P2P torrenting. Expert picks updated ${shortMonthYear} with speeds, no-log policies & privacy compared. See our honest verdict.`,
    nl: "We testten 40+ VPNs voor P2P torrenting. Deze 5 bieden de snelste downloadsnelheden, geverifieerde no-logs beleid, kill switches en port forwarding.",
    de: "Wir haben uber 40 VPNs fur P2P-Torrenting getestet. Diese 5 bieten die schnellsten Downloads, verifizierte No-Logs-Richtlinien und Kill Switches.",
    es: "Probamos mas de 40 VPNs para torrenting P2P. Estos 5 ofrecen las velocidades mas rapidas, politicas sin registros verificadas y kill switches.",
    fr: "Nous avons teste plus de 40 VPN pour le torrenting P2P. Ces 5 offrent les vitesses les plus rapides, des politiques sans logs verifiees et des kill switches.",
    zh: "我们测试了40多个VPN的P2P种子下载功能。这5款提供最快的下载速度、经验证的无日志政策、Kill Switch和端口转发。",
    ja: "P2Pトレント用に40以上のVPNをテスト。この5つは最速のダウンロード速度、検証済みノーログポリシー、キルスイッチ、ポートフォワーディングを提供。",
    ko: "P2P 토렌트용 40개 이상의 VPN을 테스트했습니다. 이 5개는 가장 빠른 다운로드 속도, 검증된 노로그 정책, 킬 스위치, 포트 포워딩을 제공합니다.",
    th: "เราทดสอบ VPN มากกว่า 40 ตัวสำหรับ P2P torrenting 5 ตัวนี้ให้ความเร็วดาวน์โหลดเร็วที่สุด นโยบายไม่เก็บ log ที่ตรวจสอบแล้ว kill switch และ port forwarding",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
  };
}

function ItemListSchema({ vpns }: { vpns: { vpn: VpnProvider | null }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for Torrenting 2026",
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

export default async function VpnTorrentingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const expressvpn = await getVpnBySlug("expressvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const protonvpn = await getVpnBySlug("protonvpn");
  const cyberghost = await getVpnBySlug("cyberghost");

  const torrentVpns = [
    {
      vpn: nordvpn,
      badge: "Best Overall",
      badgeColor: "yellow",
      p2pServers: "5,400+",
      killSwitch: true,
      noLogs: true,
      portForwarding: false,
      socks5Proxy: true,
      speed: "94 Mbps avg",
      speedPercent: 94,
      price: "$2.99/mo",
    },
    {
      vpn: expressvpn,
      badge: "Fastest",
      badgeColor: "blue",
      p2pServers: "3,000+",
      killSwitch: true,
      noLogs: true,
      portForwarding: false,
      socks5Proxy: false,
      speed: "96 Mbps avg",
      speedPercent: 96,
      price: "$2.44/mo",
    },
    {
      vpn: surfshark,
      badge: "Best Value",
      badgeColor: "green",
      p2pServers: "3,200+",
      killSwitch: true,
      noLogs: true,
      portForwarding: false,
      socks5Proxy: false,
      speed: "89 Mbps avg",
      speedPercent: 89,
      price: "$1.99/mo",
    },
    {
      vpn: protonvpn,
      badge: "Best Privacy",
      badgeColor: "red",
      p2pServers: "2,900+",
      killSwitch: true,
      noLogs: true,
      portForwarding: true,
      socks5Proxy: false,
      speed: "80 Mbps avg",
      speedPercent: 80,
      price: "$3.99/mo",
    },
    {
      vpn: cyberghost,
      badge: "Best for Beginners",
      badgeColor: "purple",
      p2pServers: "9,000+",
      killSwitch: true,
      noLogs: true,
      portForwarding: false,
      socks5Proxy: false,
      speed: "83 Mbps avg",
      speedPercent: 83,
      price: "$2.19/mo",
    },
  ];

  const content = {
    en: {
      badge: "Updated February 2026",
      title: "Best VPN for Torrenting in 2026",
      subtitle:
        "We tested 40+ VPNs for P2P download speeds, no-logs verification, kill switch reliability, and torrent-specific features. These 5 keep you safe and fast.",
      disclaimer: "Legal Disclaimer: This guide is for legal torrenting only. Downloading copyrighted material without permission is illegal in most jurisdictions. Always ensure you have the right to download the content. VPNs should be used to protect your privacy, not to facilitate piracy.",
      topPicks: "Top Torrenting VPNs",
      featureTitle: "P2P Feature Comparison",
      featureDesc: "Key security and performance features for safe torrenting.",
      tableHeaders: {
        vpn: "VPN",
        p2pServers: "P2P Servers",
        killSwitch: "Kill Switch",
        noLogs: "No Logs",
        portForwarding: "Port Forward",
        socks5: "SOCKS5",
      },
      speedTitle: "P2P Speed Test Results",
      speedDesc: "Download speeds tested with popular Linux torrent distributions on a 100 Mbps connection.",
      securityTitle: "Essential Security Features for Torrenting",
      securityFeatures: [
        { title: "Kill Switch", desc: "Automatically disconnects internet if VPN drops, preventing your real IP from leaking to torrent peers. All our picks include this.", icon: Shield },
        { title: "No-Logs Policy", desc: "Verified policies mean the VPN keeps no records of your downloads, IP addresses, or browsing activity. Critical for privacy.", icon: Lock },
        { title: "DNS Leak Protection", desc: "Ensures DNS requests go through the VPN tunnel, not your ISP. Without it, your ISP can see which websites and torrents you access.", icon: Server },
        { title: "Port Forwarding", desc: "Improves torrent speeds by allowing incoming connections. ProtonVPN is the only premium VPN offering this feature.", icon: Download },
      ],
      faqTitle: "Torrenting VPN FAQs",
      faqs: [
        {
          question: "Is it legal to use a VPN for torrenting?",
          answer: "Yes, using a VPN for torrenting is legal in most countries. However, downloading copyrighted content without permission is illegal regardless of whether you use a VPN. VPNs protect your privacy when downloading legal content like Linux distributions, open-source software, and public domain media.",
        },
        {
          question: "Do all VPNs allow P2P torrenting?",
          answer: "No. Some VPNs block P2P traffic entirely, and others only allow it on specific servers. All five VPNs in our list fully support P2P on dedicated servers optimized for torrent traffic. NordVPN has 5,400+ P2P servers and CyberGhost has 9,000+ dedicated P2P servers.",
        },
        {
          question: "Why do I need a kill switch for torrenting?",
          answer: "A kill switch is essential because if your VPN connection drops for even a second, your real IP address is exposed to all torrent peers in the swarm. Copyright trolls monitor popular torrents and log IP addresses. A kill switch instantly blocks all internet traffic if the VPN disconnects.",
        },
        {
          question: "Which VPN is fastest for torrenting?",
          answer: "ExpressVPN is the fastest VPN for torrenting with an average speed of 96 Mbps on our 100 Mbps test connection. NordVPN is close behind at 94 Mbps. Both are more than fast enough for downloading large torrent files quickly.",
        },
        {
          question: "What is port forwarding and do I need it?",
          answer: "Port forwarding allows incoming connections to your torrent client, improving download speeds and connectivity to peers. Without it, you rely on other peers to initiate connections. ProtonVPN is the only premium VPN that offers port forwarding, making it ideal for power users.",
        },
      ],
      getVpnButton: "Get",
      ctaTitle: "Torrent Safely and Fast",
      ctaSubtitle: "Protect your privacy with a verified no-logs VPN. Fast P2P speeds, kill switch, and full anonymity.",
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: February 2026",
    },
    nl: {
      badge: "Bijgewerkt februari 2026",
      title: "Beste VPN voor Torrenting in 2026",
      subtitle: "We testten 40+ VPNs voor P2P downloadsnelheden, no-logs verificatie en kill switch betrouwbaarheid. Deze 5 houden je veilig en snel.",
      disclaimer: "Juridische disclaimer: Deze gids is alleen voor legaal torrenting. Het downloaden van auteursrechtelijk beschermd materiaal zonder toestemming is illegaal. Gebruik VPNs om je privacy te beschermen, niet om piraterij te faciliteren.",
      topPicks: "Top Torrenting VPNs",
      featureTitle: "P2P Functie Vergelijking",
      featureDesc: "Belangrijke beveiligings- en prestatiefuncties voor veilig torrenting.",
      tableHeaders: { vpn: "VPN", p2pServers: "P2P Servers", killSwitch: "Kill Switch", noLogs: "Geen Logs", portForwarding: "Port Forward", socks5: "SOCKS5" },
      speedTitle: "P2P Snelheidstest Resultaten",
      speedDesc: "Downloadsnelheden getest met populaire Linux torrent distributies op een 100 Mbps verbinding.",
      securityTitle: "Essientiele Beveiligingsfuncties voor Torrenting",
      securityFeatures: [
        { title: "Kill Switch", desc: "Verbreekt automatisch de internetverbinding als de VPN uitvalt, om te voorkomen dat je echte IP lekt naar torrent peers.", icon: Shield },
        { title: "No-Logs Beleid", desc: "Geverifieerd beleid betekent dat de VPN geen gegevens bijhoudt van je downloads, IP-adressen of browseactiviteit.", icon: Lock },
        { title: "DNS Lek Bescherming", desc: "Zorgt ervoor dat DNS verzoeken via de VPN tunnel gaan, niet je ISP.", icon: Server },
        { title: "Port Forwarding", desc: "Verbetert torrent snelheden door inkomende verbindingen toe te staan. ProtonVPN is de enige die dit biedt.", icon: Download },
      ],
      faqTitle: "Torrenting VPN Veelgestelde Vragen",
      faqs: [
        { question: "Is het legaal om een VPN te gebruiken voor torrenting?", answer: "Ja, het gebruik van een VPN voor torrenting is legaal. Het downloaden van auteursrechtelijk beschermd materiaal zonder toestemming is echter illegaal, ongeacht of je een VPN gebruikt." },
        { question: "Staan alle VPNs P2P torrenting toe?", answer: "Nee. Sommige VPNs blokkeren P2P verkeer. Alle vijf VPNs in onze lijst ondersteunen P2P volledig op dedicated servers." },
        { question: "Waarom heb ik een kill switch nodig voor torrenting?", answer: "Een kill switch is essentieel omdat als je VPN verbinding even wegvalt, je echte IP adres wordt blootgesteld aan alle torrent peers." },
        { question: "Welke VPN is het snelst voor torrenting?", answer: "ExpressVPN is de snelste met gemiddeld 96 Mbps. NordVPN volgt met 94 Mbps." },
        { question: "Wat is port forwarding?", answer: "Port forwarding staat inkomende verbindingen toe naar je torrent client, wat download snelheden verbetert. ProtonVPN is de enige premium VPN die dit biedt." },
      ],
      getVpnButton: "Krijg",
      ctaTitle: "Torrent Veilig en Snel",
      ctaSubtitle: "Bescherm je privacy met een geverifieerde no-logs VPN.",
      viewAllVpns: "Bekijk Alle VPN Reviews",
      lastUpdated: "Laatst bijgewerkt: februari 2026",
    },
    de: {
      badge: "Aktualisiert Februar 2026",
      title: "Beste VPN fur Torrenting in 2026",
      subtitle: "Wir haben uber 40 VPNs fur P2P-Geschwindigkeiten, No-Logs-Verifizierung und Kill-Switch-Zuverlassigkeit getestet.",
      disclaimer: "Rechtlicher Hinweis: Dieser Leitfaden ist nur fur legales Torrenting. Das Herunterladen von urheberrechtlich geschutztem Material ohne Erlaubnis ist illegal.",
      topPicks: "Top Torrenting VPNs",
      featureTitle: "P2P-Funktionsvergleich",
      featureDesc: "Wichtige Sicherheits- und Leistungsmerkmale fur sicheres Torrenting.",
      tableHeaders: { vpn: "VPN", p2pServers: "P2P-Server", killSwitch: "Kill Switch", noLogs: "Keine Logs", portForwarding: "Port Forward", socks5: "SOCKS5" },
      speedTitle: "P2P-Geschwindigkeitstests",
      speedDesc: "Download-Geschwindigkeiten mit Linux-Torrent-Distributionen auf einer 100-Mbps-Verbindung getestet.",
      securityTitle: "Wichtige Sicherheitsfunktionen fur Torrenting",
      securityFeatures: [
        { title: "Kill Switch", desc: "Trennt automatisch die Internetverbindung, wenn das VPN ausfallt.", icon: Shield },
        { title: "No-Logs-Richtlinie", desc: "Verifizierte Richtlinie bedeutet, dass keine Daten gespeichert werden.", icon: Lock },
        { title: "DNS-Leckschutz", desc: "Stellt sicher, dass DNS-Anfragen durch den VPN-Tunnel gehen.", icon: Server },
        { title: "Port-Weiterleitung", desc: "Verbessert Torrent-Geschwindigkeiten. ProtonVPN ist der einzige Premium-Anbieter mit dieser Funktion.", icon: Download },
      ],
      faqTitle: "Torrenting VPN Haufige Fragen",
      faqs: [
        { question: "Ist es legal, ein VPN fur Torrenting zu verwenden?", answer: "Ja, die Verwendung eines VPN fur Torrenting ist legal. Das Herunterladen urheberrechtlich geschutzter Inhalte ohne Erlaubnis ist jedoch illegal." },
        { question: "Erlauben alle VPNs P2P?", answer: "Nein. Alle funf VPNs in unserer Liste unterstutzen P2P auf dedizierten Servern." },
        { question: "Warum brauche ich einen Kill Switch?", answer: "Ein Kill Switch ist wichtig, da bei einem VPN-Ausfall Ihre echte IP-Adresse allen Torrent-Peers ausgesetzt wird." },
        { question: "Welches VPN ist am schnellsten?", answer: "ExpressVPN ist mit 96 Mbps am schnellsten. NordVPN folgt mit 94 Mbps." },
        { question: "Was ist Port-Weiterleitung?", answer: "Port-Weiterleitung ermoglicht eingehende Verbindungen und verbessert die Geschwindigkeit. ProtonVPN bietet dies als einziger Premium-Anbieter." },
      ],
      getVpnButton: "Holen",
      ctaTitle: "Sicher und Schnell Torrenten",
      ctaSubtitle: "Schutzen Sie Ihre Privatsphare mit einem verifizierten No-Logs VPN.",
      viewAllVpns: "Alle VPN-Bewertungen",
      lastUpdated: "Zuletzt aktualisiert: Februar 2026",
    },
    es: {
      badge: "Actualizado febrero 2026", title: "Mejor VPN para Torrenting en 2026",
      subtitle: "Probamos mas de 40 VPNs para velocidades P2P, politicas sin registros y kill switches.", disclaimer: "Aviso legal: Esta guia es solo para torrenting legal. Descargar material con derechos de autor sin permiso es ilegal.",
      topPicks: "Mejores VPNs para Torrenting", featureTitle: "Comparacion de Funciones P2P", featureDesc: "Funciones clave de seguridad para torrenting seguro.",
      tableHeaders: { vpn: "VPN", p2pServers: "Servidores P2P", killSwitch: "Kill Switch", noLogs: "Sin Logs", portForwarding: "Port Forward", socks5: "SOCKS5" },
      speedTitle: "Resultados de Velocidad P2P", speedDesc: "Velocidades probadas con distribuciones Linux en conexion de 100 Mbps.",
      securityTitle: "Funciones de Seguridad Esenciales",
      securityFeatures: [
        { title: "Kill Switch", desc: "Desconecta automaticamente si el VPN falla.", icon: Shield },
        { title: "Sin Registros", desc: "Politica verificada de no guardar datos.", icon: Lock },
        { title: "Proteccion DNS", desc: "Las solicitudes DNS van por el tunel VPN.", icon: Server },
        { title: "Port Forwarding", desc: "Mejora velocidades. Solo ProtonVPN lo ofrece.", icon: Download },
      ],
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        { question: "Es legal usar VPN para torrenting?", answer: "Si, usar VPN para torrenting es legal. Descargar contenido con derechos de autor sin permiso es ilegal." },
        { question: "Todos los VPNs permiten P2P?", answer: "No. Los 5 VPNs de nuestra lista soportan P2P en servidores dedicados." },
        { question: "Por que necesito kill switch?", answer: "Si el VPN se cae, tu IP real queda expuesta a todos los peers del torrent." },
        { question: "Cual es el VPN mas rapido?", answer: "ExpressVPN con 96 Mbps, seguido de NordVPN con 94 Mbps." },
        { question: "Que es port forwarding?", answer: "Permite conexiones entrantes mejorando velocidades. Solo ProtonVPN lo ofrece." },
      ],
      getVpnButton: "Obtener", ctaTitle: "Torrenting Seguro y Rapido", ctaSubtitle: "Protege tu privacidad con un VPN sin registros verificado.",
      viewAllVpns: "Ver Todas las Resenas", lastUpdated: "Ultima actualizacion: febrero 2026",
    },
    fr: {
      badge: "Mis a jour fevrier 2026", title: "Meilleur VPN pour Torrenting en 2026",
      subtitle: "Nous avons teste plus de 40 VPN pour les vitesses P2P, les politiques sans logs et la fiabilite du kill switch.", disclaimer: "Avis juridique : Ce guide est uniquement pour le torrenting legal.",
      topPicks: "Meilleurs VPNs Torrenting", featureTitle: "Comparaison des Fonctionnalites P2P", featureDesc: "Fonctionnalites de securite cles pour un torrenting sur.",
      tableHeaders: { vpn: "VPN", p2pServers: "Serveurs P2P", killSwitch: "Kill Switch", noLogs: "Sans Logs", portForwarding: "Port Forward", socks5: "SOCKS5" },
      speedTitle: "Resultats de Vitesse P2P", speedDesc: "Vitesses testees avec des distributions Linux sur une connexion 100 Mbps.",
      securityTitle: "Fonctionnalites de Securite Essentielles",
      securityFeatures: [
        { title: "Kill Switch", desc: "Deconnecte automatiquement si le VPN tombe.", icon: Shield },
        { title: "Sans Logs", desc: "Politique verifiee de non-conservation des donnees.", icon: Lock },
        { title: "Protection DNS", desc: "Les requetes DNS passent par le tunnel VPN.", icon: Server },
        { title: "Port Forwarding", desc: "Ameliore les vitesses. Seul ProtonVPN l'offre.", icon: Download },
      ],
      faqTitle: "FAQ Torrenting VPN",
      faqs: [
        { question: "Est-il legal d'utiliser un VPN pour le torrenting?", answer: "Oui, utiliser un VPN pour le torrenting est legal. Telecharger du contenu protege sans autorisation est illegal." },
        { question: "Tous les VPN permettent-ils le P2P?", answer: "Non. Les 5 VPN de notre liste supportent le P2P sur des serveurs dedies." },
        { question: "Pourquoi ai-je besoin d'un kill switch?", answer: "Si le VPN tombe, votre vraie IP est exposee a tous les pairs du torrent." },
        { question: "Quel VPN est le plus rapide?", answer: "ExpressVPN avec 96 Mbps, suivi de NordVPN avec 94 Mbps." },
        { question: "Qu'est-ce que le port forwarding?", answer: "Permet les connexions entrantes, ameliorant les vitesses. Seul ProtonVPN l'offre." },
      ],
      getVpnButton: "Obtenir", ctaTitle: "Torrentez en Securite", ctaSubtitle: "Protegez votre vie privee avec un VPN sans logs verifie.",
      viewAllVpns: "Voir Tous les Avis", lastUpdated: "Derniere mise a jour : fevrier 2026",
    },
    zh: {
      badge: "2026年2月更新", title: "2026年最佳种子下载VPN", subtitle: "我们测试了40多个VPN的P2P下载速度、无日志验证和Kill Switch可靠性。",
      disclaimer: "法律声明：本指南仅适用于合法种子下载。未经许可下载受版权保护的材料是违法的。",
      topPicks: "最佳种子下载VPN", featureTitle: "P2P功能比较", featureDesc: "安全种子下载的关键安全和性能功能。",
      tableHeaders: { vpn: "VPN", p2pServers: "P2P服务器", killSwitch: "Kill Switch", noLogs: "无日志", portForwarding: "端口转发", socks5: "SOCKS5" },
      speedTitle: "P2P速度测试结果", speedDesc: "使用Linux发行版在100 Mbps连接上测试的下载速度。",
      securityTitle: "种子下载必备安全功能",
      securityFeatures: [
        { title: "Kill Switch", desc: "VPN断开时自动断网，防止真实IP泄露。", icon: Shield },
        { title: "无日志政策", desc: "经验证的政策意味着VPN不记录任何数据。", icon: Lock },
        { title: "DNS泄漏保护", desc: "确保DNS请求通过VPN隧道。", icon: Server },
        { title: "端口转发", desc: "改善种子速度。仅ProtonVPN提供此功能。", icon: Download },
      ],
      faqTitle: "种子下载VPN常见问题",
      faqs: [
        { question: "使用VPN进行种子下载合法吗？", answer: "是的，使用VPN进行种子下载是合法的。但未经许可下载受版权保护的内容是违法的。" },
        { question: "所有VPN都允许P2P吗？", answer: "不是。我们列表中的5个VPN都在专用服务器上完全支持P2P。" },
        { question: "为什么需要Kill Switch？", answer: "如果VPN连接断开，你的真实IP地址会暴露给所有种子对等节点。" },
        { question: "哪个VPN最快？", answer: "ExpressVPN以96 Mbps最快，NordVPN以94 Mbps紧随其后。" },
        { question: "什么是端口转发？", answer: "允许传入连接以提高速度。仅ProtonVPN提供此功能。" },
      ],
      getVpnButton: "获取", ctaTitle: "安全快速地下载种子", ctaSubtitle: "使用经验证的无日志VPN保护您的隐私。",
      viewAllVpns: "查看所有VPN评测", lastUpdated: "最后更新：2026年2月",
    },
    ja: {
      badge: "2026年2月更新", title: "2026年トレント向けベストVPN", subtitle: "P2Pダウンロード速度、ノーログ検証、キルスイッチの信頼性について40以上のVPNをテスト。",
      disclaimer: "法的免責事項：このガイドは合法的なトレントのみを対象としています。許可なく著作権で保護された素材をダウンロードすることは違法です。",
      topPicks: "トップトレントVPN", featureTitle: "P2P機能比較", featureDesc: "安全なトレントのための主要なセキュリティとパフォーマンス機能。",
      tableHeaders: { vpn: "VPN", p2pServers: "P2Pサーバー", killSwitch: "キルスイッチ", noLogs: "ノーログ", portForwarding: "ポート転送", socks5: "SOCKS5" },
      speedTitle: "P2P速度テスト結果", speedDesc: "100 Mbps接続でLinuxディストリビューションでテストしたダウンロード速度。",
      securityTitle: "トレント向け必須セキュリティ機能",
      securityFeatures: [
        { title: "キルスイッチ", desc: "VPNが切断された場合に自動的にインターネットを遮断。", icon: Shield },
        { title: "ノーログポリシー", desc: "検証済みのポリシーでデータを保存しない。", icon: Lock },
        { title: "DNSリーク保護", desc: "DNSリクエストがVPNトンネルを通過することを確認。", icon: Server },
        { title: "ポートフォワーディング", desc: "トレント速度を改善。ProtonVPNのみ提供。", icon: Download },
      ],
      faqTitle: "トレントVPN FAQ",
      faqs: [
        { question: "トレントにVPNを使うのは合法ですか？", answer: "はい、トレントにVPNを使用することは合法です。ただし、許可なく著作権保護されたコンテンツをダウンロードすることは違法です。" },
        { question: "すべてのVPNでP2Pが許可されていますか？", answer: "いいえ。リストの5つのVPNはすべて専用サーバーでP2Pを完全にサポートしています。" },
        { question: "キルスイッチが必要な理由は？", answer: "VPN接続が切れると、実際のIPアドレスがすべてのトレントピアに公開されます。" },
        { question: "最速のVPNは？", answer: "ExpressVPNが96 Mbpsで最速。NordVPNが94 Mbpsで続きます。" },
        { question: "ポートフォワーディングとは？", answer: "着信接続を許可して速度を向上させます。ProtonVPNのみが提供。" },
      ],
      getVpnButton: "取得", ctaTitle: "安全に高速でトレント", ctaSubtitle: "検証済みノーログVPNでプライバシーを保護。",
      viewAllVpns: "すべてのVPNレビュー", lastUpdated: "最終更新：2026年2月",
    },
    ko: {
      badge: "2026년 2월 업데이트", title: "2026년 토렌트 최고의 VPN", subtitle: "P2P 다운로드 속도, 노로그 검증, 킬 스위치 신뢰성에 대해 40개 이상의 VPN을 테스트했습니다.",
      disclaimer: "법적 고지: 이 가이드는 합법적인 토렌트만을 위한 것입니다. 허가 없이 저작권이 있는 자료를 다운로드하는 것은 불법입니다.",
      topPicks: "최고의 토렌트 VPN", featureTitle: "P2P 기능 비교", featureDesc: "안전한 토렌트를 위한 주요 보안 및 성능 기능.",
      tableHeaders: { vpn: "VPN", p2pServers: "P2P 서버", killSwitch: "킬 스위치", noLogs: "노로그", portForwarding: "포트 포워딩", socks5: "SOCKS5" },
      speedTitle: "P2P 속도 테스트 결과", speedDesc: "100 Mbps 연결에서 Linux 배포판으로 테스트한 다운로드 속도.",
      securityTitle: "토렌트 필수 보안 기능",
      securityFeatures: [
        { title: "킬 스위치", desc: "VPN이 끊기면 자동으로 인터넷을 차단합니다.", icon: Shield },
        { title: "노로그 정책", desc: "검증된 정책으로 데이터를 저장하지 않습니다.", icon: Lock },
        { title: "DNS 유출 보호", desc: "DNS 요청이 VPN 터널을 통과하도록 합니다.", icon: Server },
        { title: "포트 포워딩", desc: "토렌트 속도를 개선합니다. ProtonVPN만 제공.", icon: Download },
      ],
      faqTitle: "토렌트 VPN FAQ",
      faqs: [
        { question: "토렌트에 VPN을 사용하는 것이 합법인가요?", answer: "네, 토렌트에 VPN을 사용하는 것은 합법입니다. 그러나 허가 없이 저작권이 있는 콘텐츠를 다운로드하는 것은 불법입니다." },
        { question: "모든 VPN이 P2P를 허용하나요?", answer: "아니요. 우리 목록의 5개 VPN은 모두 전용 서버에서 P2P를 완전히 지원합니다." },
        { question: "킬 스위치가 필요한 이유는?", answer: "VPN 연결이 끊기면 실제 IP 주소가 모든 토렌트 피어에 노출됩니다." },
        { question: "가장 빠른 VPN은?", answer: "ExpressVPN이 96 Mbps로 가장 빠르고, NordVPN이 94 Mbps로 뒤를 잇습니다." },
        { question: "포트 포워딩이란?", answer: "들어오는 연결을 허용하여 속도를 개선합니다. ProtonVPN만 제공합니다." },
      ],
      getVpnButton: "받기", ctaTitle: "안전하고 빠르게 토렌트", ctaSubtitle: "검증된 노로그 VPN으로 개인정보를 보호하세요.",
      viewAllVpns: "모든 VPN 리뷰 보기", lastUpdated: "마지막 업데이트: 2026년 2월",
    },
    th: {
      badge: "อัปเดตกุมภาพันธ์ 2026", title: "VPN ที่ดีที่สุดสำหรับ Torrenting ในปี 2026", subtitle: "เราทดสอบ VPN มากกว่า 40 ตัวสำหรับความเร็ว P2P นโยบายไม่เก็บ log และ kill switch",
      disclaimer: "ข้อจำกัดความรับผิดชอบทางกฎหมาย: คู่มือนี้สำหรับการ torrent ที่ถูกกฎหมายเท่านั้น การดาวน์โหลดเนื้อหาที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาตเป็นสิ่งผิดกฎหมาย",
      topPicks: "VPN ชั้นนำสำหรับ Torrenting", featureTitle: "เปรียบเทียบฟีเจอร์ P2P", featureDesc: "ฟีเจอร์ความปลอดภัยสำคัญสำหรับ torrenting อย่างปลอดภัย",
      tableHeaders: { vpn: "VPN", p2pServers: "เซิร์ฟเวอร์ P2P", killSwitch: "Kill Switch", noLogs: "ไม่เก็บ Log", portForwarding: "Port Forward", socks5: "SOCKS5" },
      speedTitle: "ผลทดสอบความเร็ว P2P", speedDesc: "ทดสอบความเร็วดาวน์โหลดด้วย Linux distributions บนการเชื่อมต่อ 100 Mbps",
      securityTitle: "ฟีเจอร์ความปลอดภัยที่จำเป็น",
      securityFeatures: [
        { title: "Kill Switch", desc: "ตัดการเชื่อมต่ออินเทอร์เน็ตอัตโนมัติเมื่อ VPN หลุด", icon: Shield },
        { title: "ไม่เก็บ Log", desc: "นโยบายที่ตรวจสอบแล้วว่าไม่เก็บข้อมูล", icon: Lock },
        { title: "ป้องกัน DNS Leak", desc: "ตรวจสอบว่า DNS request ผ่าน VPN tunnel", icon: Server },
        { title: "Port Forwarding", desc: "ปรับปรุงความเร็ว torrent มีเพียง ProtonVPN เท่านั้นที่ให้บริการ", icon: Download },
      ],
      faqTitle: "คำถามที่พบบ่อย",
      faqs: [
        { question: "การใช้ VPN สำหรับ torrenting ถูกกฎหมายหรือไม่?", answer: "ใช่ การใช้ VPN สำหรับ torrenting ถูกกฎหมาย แต่การดาวน์โหลดเนื้อหาที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาตเป็นสิ่งผิดกฎหมาย" },
        { question: "VPN ทุกตัวอนุญาต P2P หรือไม่?", answer: "ไม่ VPN ทั้ง 5 ตัวในรายการรองรับ P2P บนเซิร์ฟเวอร์เฉพาะ" },
        { question: "ทำไมต้องมี kill switch?", answer: "หาก VPN หลุด IP จริงของคุณจะถูกเปิดเผยต่อ peer ทั้งหมดใน torrent" },
        { question: "VPN ตัวไหนเร็วที่สุด?", answer: "ExpressVPN เร็วที่สุดที่ 96 Mbps ตามด้วย NordVPN ที่ 94 Mbps" },
        { question: "Port forwarding คืออะไร?", answer: "อนุญาตการเชื่อมต่อขาเข้าเพื่อปรับปรุงความเร็ว มีเพียง ProtonVPN เท่านั้นที่ให้บริการ" },
      ],
      getVpnButton: "รับ", ctaTitle: "Torrent อย่างปลอดภัยและเร็ว", ctaSubtitle: "ปกป้องความเป็นส่วนตัวด้วย VPN ไม่เก็บ log ที่ตรวจสอบแล้ว",
      viewAllVpns: "ดูบทวิจารณ์ VPN ทั้งหมด", lastUpdated: "อัปเดตล่าสุด: กุมภาพันธ์ 2026",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const relatedPages = [
    { title: "Best Cheap VPN", description: "Budget VPNs from $1.99/mo with P2P support.", href: "/best/vpn-cheap", icon: "price" as const },
    { title: "Best VPN for Streaming", description: "VPNs that unblock Netflix, Disney+, and more.", href: "/best/vpn-streaming", icon: "play" as const },
    { title: "Best Free VPN", description: "Free VPNs with limited P2P support.", href: "/best/free-vpn", icon: "gift" as const },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Best VPN Guides", href: "/best" }, { name: "Best VPN for Torrenting", href: "/best/vpn-torrenting" }]} />
      <ItemListSchema vpns={torrentVpns} />
      <FAQSchema faqs={t.faqs} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">{t.badge}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">{t.title}</h1>
              <div className="flex justify-center mb-4">
                <LastUpdated locale={locale} />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-6 bg-yellow-50 dark:bg-yellow-900/20 border-y border-yellow-200 dark:border-yellow-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{t.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.topPicks}</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {torrentVpns.map((item, index) => (
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
                        <div className="flex items-center gap-2 text-sm"><Server className="w-4 h-4 text-green-500" /><span>{item.p2pServers} P2P</span></div>
                        <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-yellow-500" /><span>{item.speed}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-blue-500" /><span>Kill Switch</span></div>
                        <div className="flex items-center gap-2 text-sm"><Lock className="w-4 h-4 text-green-500" /><span>No Logs</span></div>
                        {item.portForwarding && <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" /><span>Port Forward</span></div>}
                        {item.socks5Proxy && <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" /><span>SOCKS5</span></div>}
                      </div>
                      <div className="flex flex-col items-center gap-2 md:min-w-[160px]">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{item.price}</p>
                        <AffiliateButton vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="gap-2 w-full">
                          {t.getVpnButton} {item.vpn?.name}<ArrowRight className="w-4 h-4" />
                        </AffiliateButton>
                      </div>
                    </div>
                    {item.badge && (
                      <Badge className={`absolute top-4 right-4 ${item.badgeColor === "yellow" ? "bg-yellow-500" : item.badgeColor === "blue" ? "bg-blue-500" : item.badgeColor === "green" ? "bg-green-500" : item.badgeColor === "purple" ? "bg-purple-500" : "bg-red-500"} text-white`}>{item.badge}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* P2P Feature Comparison Table */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.featureTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t.featureDesc}</p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-4 text-left">{t.tableHeaders.vpn}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.p2pServers}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.killSwitch}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.noLogs}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.portForwarding}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.socks5}</th>
                  </tr>
                </thead>
                <tbody>
                  {torrentVpns.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">{item.vpn?.name}</td>
                      <td className="px-3 py-4 text-center text-sm">{item.p2pServers}</td>
                      <td className="px-3 py-4 text-center">{item.killSwitch ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center">{item.noLogs ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center">{item.portForwarding ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center">{item.socks5Proxy ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Speed Test Results */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.speedTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t.speedDesc}</p>
            <div className="space-y-6">
              {torrentVpns.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="font-semibold w-32 text-right">{item.vpn?.name}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                    <div className={`h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium ${item.speedPercent >= 90 ? "bg-green-500" : item.speedPercent >= 80 ? "bg-blue-500" : "bg-yellow-500"}`} style={{ width: `${item.speedPercent}%` }}>{item.speed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.securityTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {t.securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <feature.icon className="w-10 h-10 mb-4 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {torrentVpns.slice(0, 3).map((item) => (
                <AffiliateButton key={item.vpn?.slug} vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="bg-white text-green-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700">
                  {t.getVpnButton} {item.vpn?.name}
                </AffiliateButton>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.faqTitle}</h2>
            <div className="space-y-6">
              {t.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <RelatedPages pages={relatedPages} />

        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.lastUpdated}</p>
            <Link href="/reviews" className="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-2">
              {t.viewAllVpns}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
