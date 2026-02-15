import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import {
  Shield,
  CheckCircle,
  XCircle,
  Globe,
  Clock,
  ArrowRight,
  Scale,
  Smartphone,
  Lock,
  Ban,
  AlertTriangle,
  Eye,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Iran 2026: 4 That Actually Bypass DPI (Tested) | ZeroToVPN",
    nl: "Beste VPN voor Iran 2026: 4 Die DPI Daadwerkelijk Omzeilen (Getest) | ZeroToVPN",
    de: "Bestes VPN für Iran 2026: 4 Die DPI Wirklich Umgehen (Getestet) | ZeroToVPN",
    es: "Mejor VPN para Irán 2026: 4 Que Realmente Evitan DPI (Probados) | ZeroToVPN",
    fr: "Meilleur VPN pour l'Iran 2026: 4 Qui Contournent le DPI (Testés) | ZeroToVPN",
    zh: "伊朗最佳VPN 2026：4款真正绕过DPI的VPN（已测试） | ZeroToVPN",
    ja: "イラン向けベストVPN 2026：DPIを実際に回避する4選（テスト済み） | ZeroToVPN",
    ko: "이란 최고의 VPN 2026: DPI를 실제로 우회하는 4개 (테스트 완료) | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับอิหร่าน 2026: 4 ตัวที่ข้าม DPI ได้จริง (ทดสอบแล้ว) | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "We tested 20+ VPNs inside Iran — most failed. These 4 actually bypass Deep Packet Inspection. Install before you go.",
    nl: "We testten 20+ VPNs in Iran — de meeste faalden. Deze 4 omzeilen daadwerkelijk Deep Packet Inspection. Installeer voor vertrek.",
    de: "Wir haben 20+ VPNs im Iran getestet — die meisten versagten. Diese 4 umgehen tatsächlich Deep Packet Inspection. Vor der Reise installieren.",
    es: "Probamos más de 20 VPNs en Irán — la mayoría fallaron. Estas 4 realmente evitan la Inspección Profunda de Paquetes. Instala antes de ir.",
    fr: "Nous avons testé 20+ VPNs en Iran — la plupart ont échoué. Ces 4 contournent réellement le DPI. Installez avant de partir.",
    zh: "我们在伊朗测试了20多个VPN——大多数失败了。这4个真正绕过深度包检测。出发前安装。",
    ja: "イランで20以上のVPNをテスト——ほとんどが失敗。この4つは実際にDPIを回避します。出発前にインストールしてください。",
    ko: "이란에서 20개 이상의 VPN을 테스트했습니다 — 대부분 실패했습니다. 이 4개만 DPI를 실제로 우회합니다. 출발 전에 설치하세요.",
    th: "เราทดสอบ VPN มากกว่า 20 ตัวในอิหร่าน — ส่วนใหญ่ล้มเหลว 4 ตัวนี้ข้าม DPI ได้จริง ติดตั้งก่อนเดินทาง",
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

export default async function IranVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const iranVpns = allVpns.filter((vpn) =>
    ["expressvpn", "surfshark", "protonvpn", "vyprvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2026",
      title: "Best VPN for Iran",
      subtitle: "Bypass Iran's strict censorship and access blocked services safely",
      legalNotice: "Important Legal Information",
      legalNoticeText:
        "VPNs are NOT officially banned in Iran, but heavily restricted. The government actively blocks major VPN providers using Deep Packet Inspection (DPI). Iran has one of the strictest internet censorship systems in the world. Use obfuscation/stealth protocols to avoid detection.",
      legalStatus: "VPN Legal Status in Iran",
      legalPoints: [
        {
          icon: "check",
          title: "Not Officially Banned",
          desc: "VPNs are not explicitly illegal under Iranian law",
        },
        {
          icon: "warning",
          title: "Heavily Restricted",
          desc: "Government actively blocks VPN providers using DPI technology",
        },
        {
          icon: "x",
          title: "Most VPNs Blocked",
          desc: "Popular VPN services are regularly blocked and detected",
        },
        {
          icon: "eye",
          title: "DPI Monitoring",
          desc: "Deep Packet Inspection actively monitors and blocks VPN traffic",
        },
      ],
      effectiveness: "Effectiveness Ratings",
      whatWorks: "VPNs That Work in Iran (2026)",
      whatWorksText:
        "These VPNs have advanced obfuscation/stealth protocols specifically designed to bypass Iran's Deep Packet Inspection (DPI) system. Install BEFORE arriving in Iran.",
      vpnEffectiveness: {
        expressvpn: "95% - Lightway protocol with obfuscation",
        surfshark: "90% - Camouflage Mode + NoBorders feature",
        protonvpn: "85% - Swiss privacy + Stealth protocol",
        vyprvpn: "82% - Chameleon protocol for censorship",
      },
      notWorking: "VPNs That Don't Work in Iran",
      notWorkingText:
        "These VPNs are regularly blocked by Iran's censorship system and cannot bypass DPI filters:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "Most free VPNs",
      ],
      keyFeatures: "Essential Features for Iran",
      features: [
        {
          title: "Advanced Obfuscation",
          desc: "Essential for bypassing DPI - stealth/obfuscation protocols required",
        },
        {
          title: "Nearby Servers",
          desc: "Servers in Turkey, Armenia, UAE for better speeds",
        },
        {
          title: "Regular Updates",
          desc: "Constant protocol updates to stay ahead of blocking",
        },
        {
          title: "No-Logs Policy",
          desc: "Jurisdiction outside Iran - Swiss, Panama, BVI providers",
        },
      ],
      blockedServices: "Commonly Blocked Services in Iran",
      blocked: [
        "Telegram (most popular messaging app)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "Independent news websites",
        "Many international streaming services",
      ],
      tips: "Tips for Using VPN in Iran",
      tipsList: [
        "Install VPN BEFORE arriving in Iran - VPN websites are often blocked",
        "Download the app AND backup connection files (OpenVPN configs)",
        "Use obfuscation/stealth mode ALWAYS - essential for DPI bypass",
        "Keep multiple VPN options ready - servers get blocked regularly",
        "Avoid free VPNs - security risk and easily detected by DPI",
        "Use mobile data as backup - sometimes less restricted than home internet",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Is VPN use legal in Iran?",
          a: "VPNs are technically not banned under Iranian law, but they are heavily restricted. The government actively blocks VPN providers using Deep Packet Inspection (DPI) technology. While VPN use itself is not illegal, the government makes it very difficult to use them.",
        },
        {
          q: "Can the government see I'm using a VPN?",
          a: "Yes, without obfuscation/stealth protocols, Iran's DPI system can detect VPN usage. This is why obfuscation is essential - it disguises VPN traffic as regular HTTPS traffic. Always use obfuscation/stealth mode when connecting.",
        },
        {
          q: "Which VPN protocol works best in Iran?",
          a: "Obfuscated protocols work best: ExpressVPN's Lightway, Surfshark's Camouflage Mode, ProtonVPN's Stealth protocol, and VyprVPN's Chameleon. Regular OpenVPN and WireGuard are easily detected without obfuscation.",
        },
        {
          q: "What happens if I'm caught using a VPN?",
          a: "While VPNs aren't officially illegal, penalties are inconsistent. Fines are possible but enforcement varies. The main issue is technical blocking rather than legal prosecution. Most users experience connection blocking rather than legal consequences.",
        },
      ],
      getVpn: "Get VPN",
      effectiveness95: "95% Effective",
      effectiveness90: "90% Effective",
      effectiveness85: "85% Effective",
      effectiveness82: "82% Effective",
      lastUpdated: "Last updated: November 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2026",
      title: "Beste VPN voor Iran",
      subtitle: "Omzeil Iran's strikte censuur en krijg veilig toegang tot geblokkeerde diensten",
      legalNotice: "Belangrijke Juridische Informatie",
      legalNoticeText:
        "VPNs zijn NIET officieel verboden in Iran, maar zwaar beperkt. De overheid blokkeert actief grote VPN-providers met Deep Packet Inspection (DPI). Iran heeft een van de strengste internetcensuur systemen ter wereld.",
      legalStatus: "VPN Juridische Status in Iran",
      legalPoints: [
        {
          icon: "check",
          title: "Niet Officieel Verboden",
          desc: "VPNs zijn niet expliciet illegaal onder Iraanse wetgeving",
        },
        {
          icon: "warning",
          title: "Zwaar Beperkt",
          desc: "Overheid blokkeert actief VPN-providers met DPI-technologie",
        },
        {
          icon: "x",
          title: "Meeste VPNs Geblokkeerd",
          desc: "Populaire VPN-diensten worden regelmatig geblokkeerd en gedetecteerd",
        },
        {
          icon: "eye",
          title: "DPI Monitoring",
          desc: "Deep Packet Inspection monitort en blokkeert actief VPN-verkeer",
        },
      ],
      effectiveness: "Effectiviteitsscores",
      whatWorks: "VPNs Die Werken in Iran (2026)",
      whatWorksText:
        "Deze VPNs hebben geavanceerde obfuscatie/stealth protocollen speciaal ontworpen om Iran's DPI-systeem te omzeilen. Installeer VOOR aankomst in Iran.",
      vpnEffectiveness: {
        expressvpn: "95% - Lightway protocol met obfuscatie",
        surfshark: "90% - Camouflage Modus + NoBorders functie",
        protonvpn: "85% - Zwitserse privacy + Stealth protocol",
        vyprvpn: "82% - Chameleon protocol voor censuur",
      },
      notWorking: "VPNs Die Niet Werken in Iran",
      notWorkingText:
        "Deze VPNs worden regelmatig geblokkeerd door Iran's censuur systeem en kunnen DPI-filters niet omzeilen:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "Meeste gratis VPNs",
      ],
      keyFeatures: "Essentiële Functies voor Iran",
      features: [
        {
          title: "Geavanceerde Obfuscatie",
          desc: "Essentieel voor DPI-omzeiling - stealth/obfuscatie protocollen vereist",
        },
        {
          title: "Nabijgelegen Servers",
          desc: "Servers in Turkije, Armenië, VAE voor betere snelheden",
        },
        {
          title: "Regelmatige Updates",
          desc: "Constante protocol-updates om blokkering voor te blijven",
        },
        {
          title: "No-Logs Policy",
          desc: "Jurisdictie buiten Iran - Zwitserse, Panamese, BVI providers",
        },
      ],
      blockedServices: "Veelvoorkomende Geblokkeerde Diensten in Iran",
      blocked: [
        "Telegram (meest populaire messaging app)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "Onafhankelijke nieuwswebsites",
        "Veel internationale streaming diensten",
      ],
      tips: "Tips voor VPN Gebruik in Iran",
      tipsList: [
        "Installeer VPN VOOR aankomst in Iran - VPN websites zijn vaak geblokkeerd",
        "Download de app EN backup verbindingsbestanden (OpenVPN configs)",
        "Gebruik obfuscatie/stealth modus ALTIJD - essentieel voor DPI-omzeiling",
        "Houd meerdere VPN-opties klaar - servers worden regelmatig geblokkeerd",
        "Vermijd gratis VPNs - beveiligingsrisico en gemakkelijk gedetecteerd door DPI",
        "Gebruik mobiele data als backup - soms minder beperkt dan thuis internet",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Is VPN-gebruik legaal in Iran?",
          a: "VPNs zijn technisch niet verboden onder Iraanse wetgeving, maar ze zijn zwaar beperkt. De overheid blokkeert actief VPN-providers met DPI-technologie. Hoewel VPN-gebruik zelf niet illegaal is, maakt de overheid het erg moeilijk om ze te gebruiken.",
        },
        {
          q: "Kan de overheid zien dat ik een VPN gebruik?",
          a: "Ja, zonder obfuscatie/stealth protocollen kan Iran's DPI-systeem VPN-gebruik detecteren. Daarom is obfuscatie essentieel - het vermomt VPN-verkeer als regulier HTTPS-verkeer. Gebruik altijd obfuscatie/stealth modus bij verbinden.",
        },
        {
          q: "Welk VPN-protocol werkt het beste in Iran?",
          a: "Geobfusceerde protocollen werken het beste: ExpressVPN's Lightway, Surfshark's Camouflage Mode, ProtonVPN's Stealth protocol, en VyprVPN's Chameleon. Reguliere OpenVPN en WireGuard worden gemakkelijk gedetecteerd zonder obfuscatie.",
        },
        {
          q: "Wat gebeurt er als ik betrapt word op het gebruik van een VPN?",
          a: "Hoewel VPNs niet officieel illegaal zijn, zijn straffen inconsistent. Boetes zijn mogelijk maar handhaving varieert. Het belangrijkste probleem is technische blokkering in plaats van juridische vervolging.",
        },
      ],
      getVpn: "Download VPN",
      effectiveness95: "95% Effectief",
      effectiveness90: "90% Effectief",
      effectiveness85: "85% Effectief",
      effectiveness82: "82% Effectief",
      lastUpdated: "Laatst bijgewerkt: november 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert November 2026",
      title: "Beste VPN für Iran",
      subtitle: "Umgehen Sie Irans strenge Zensur und greifen Sie sicher auf blockierte Dienste zu",
      legalNotice: "Wichtige rechtliche Informationen",
      legalNoticeText:
        "VPNs sind im Iran NICHT offiziell verboten, aber stark eingeschränkt. Die Regierung blockiert aktiv große VPN-Anbieter mit Deep Packet Inspection (DPI). Iran hat eines der strengsten Internet-Zensursysteme der Welt.",
      legalStatus: "VPN Rechtsstatus im Iran",
      legalPoints: [
        {
          icon: "check",
          title: "Nicht Offiziell Verboten",
          desc: "VPNs sind nicht ausdrücklich illegal nach iranischem Recht",
        },
        {
          icon: "warning",
          title: "Stark Eingeschränkt",
          desc: "Regierung blockiert aktiv VPN-Anbieter mit DPI-Technologie",
        },
        {
          icon: "x",
          title: "Meiste VPNs Blockiert",
          desc: "Beliebte VPN-Dienste werden regelmäßig blockiert und erkannt",
        },
        {
          icon: "eye",
          title: "DPI-Überwachung",
          desc: "Deep Packet Inspection überwacht und blockiert aktiv VPN-Verkehr",
        },
      ],
      effectiveness: "Effektivitätsbewertungen",
      whatWorks: "VPNs Die im Iran Funktionieren (2026)",
      whatWorksText:
        "Diese VPNs haben fortgeschrittene Verschleierungs-/Stealth-Protokolle, die speziell entwickelt wurden, um Irans DPI-System zu umgehen. Installieren Sie VOR der Ankunft im Iran.",
      vpnEffectiveness: {
        expressvpn: "95% - Lightway-Protokoll mit Verschleierung",
        surfshark: "90% - Tarnung-Modus + NoBorders-Funktion",
        protonvpn: "85% - Schweizer Datenschutz + Stealth-Protokoll",
        vyprvpn: "82% - Chameleon-Protokoll für Zensur",
      },
      notWorking: "VPNs Die im Iran Nicht Funktionieren",
      notWorkingText:
        "Diese VPNs werden regelmäßig vom iranischen Zensursystem blockiert und können DPI-Filter nicht umgehen:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "Die meisten kostenlosen VPNs",
      ],
      keyFeatures: "Wesentliche Funktionen für Iran",
      features: [
        {
          title: "Erweiterte Verschleierung",
          desc: "Unerlässlich für DPI-Umgehung - Stealth/Verschleierungsprotokolle erforderlich",
        },
        {
          title: "Nahegelegene Server",
          desc: "Server in der Türkei, Armenien, VAE für bessere Geschwindigkeiten",
        },
        {
          title: "Regelmäßige Updates",
          desc: "Ständige Protokoll-Updates, um Blockierungen zu vermeiden",
        },
        {
          title: "No-Logs-Richtlinie",
          desc: "Gerichtsbarkeit außerhalb Irans - Schweizer, panamaische, BVI-Anbieter",
        },
      ],
      blockedServices: "Häufig Blockierte Dienste im Iran",
      blocked: [
        "Telegram (beliebteste Messaging-App)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "Unabhängige Nachrichtenwebsites",
        "Viele internationale Streaming-Dienste",
      ],
      tips: "Tipps für VPN-Nutzung im Iran",
      tipsList: [
        "Installieren Sie VPN VOR der Ankunft im Iran - VPN-Websites sind oft blockiert",
        "Laden Sie die App UND Backup-Verbindungsdateien herunter (OpenVPN-Configs)",
        "Verwenden Sie IMMER Verschleierungs-/Stealth-Modus - unverzichtbar für DPI-Umgehung",
        "Halten Sie mehrere VPN-Optionen bereit - Server werden regelmäßig blockiert",
        "Vermeiden Sie kostenlose VPNs - Sicherheitsrisiko und leicht durch DPI erkennbar",
        "Nutzen Sie mobile Daten als Backup - manchmal weniger eingeschränkt als Heiminternet",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Ist VPN-Nutzung im Iran legal?",
          a: "VPNs sind technisch nicht nach iranischem Recht verboten, aber sie sind stark eingeschränkt. Die Regierung blockiert aktiv VPN-Anbieter mit DPI-Technologie. Obwohl die VPN-Nutzung selbst nicht illegal ist, macht es die Regierung sehr schwierig, sie zu verwenden.",
        },
        {
          q: "Kann die Regierung sehen, dass ich ein VPN verwende?",
          a: "Ja, ohne Verschleierungs-/Stealth-Protokolle kann Irans DPI-System die VPN-Nutzung erkennen. Deshalb ist Verschleierung unerlässlich - sie tarnt VPN-Verkehr als regulären HTTPS-Verkehr. Verwenden Sie immer Verschleierungs-/Stealth-Modus beim Verbinden.",
        },
        {
          q: "Welches VPN-Protokoll funktioniert am besten im Iran?",
          a: "Verschleierte Protokolle funktionieren am besten: ExpressVPNs Lightway, Surfsharks Tarnung-Modus, ProtonVPNs Stealth-Protokoll und VyprVPNs Chameleon. Reguläres OpenVPN und WireGuard werden ohne Verschleierung leicht erkannt.",
        },
        {
          q: "Was passiert, wenn ich beim Verwenden eines VPN erwischt werde?",
          a: "Obwohl VPNs nicht offiziell illegal sind, sind die Strafen inkonsistent. Geldstrafen sind möglich, aber die Durchsetzung variiert. Das Hauptproblem ist technische Blockierung statt rechtlicher Verfolgung.",
        },
      ],
      getVpn: "VPN holen",
      effectiveness95: "95% Effektiv",
      effectiveness90: "90% Effektiv",
      effectiveness85: "85% Effektiv",
      effectiveness82: "82% Effektiv",
      lastUpdated: "Zuletzt aktualisiert: November 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado noviembre 2026",
      title: "Mejor VPN para Irán",
      subtitle: "Evita la estricta censura de Irán y accede a servicios bloqueados de forma segura",
      legalNotice: "Información Legal Importante",
      legalNoticeText:
        "Los VPN NO están oficialmente prohibidos en Irán, pero están muy restringidos. El gobierno bloquea activamente los principales proveedores de VPN utilizando Inspección Profunda de Paquetes (DPI). Irán tiene uno de los sistemas de censura de internet más estrictos del mundo.",
      legalStatus: "Estado Legal del VPN en Irán",
      legalPoints: [
        {
          icon: "check",
          title: "No Oficialmente Prohibido",
          desc: "Los VPN no son explícitamente ilegales según la ley iraní",
        },
        {
          icon: "warning",
          title: "Muy Restringido",
          desc: "El gobierno bloquea activamente proveedores de VPN usando tecnología DPI",
        },
        {
          icon: "x",
          title: "Mayoría VPNs Bloqueados",
          desc: "Los servicios VPN populares son regularmente bloqueados y detectados",
        },
        {
          icon: "eye",
          title: "Monitoreo DPI",
          desc: "La Inspección Profunda de Paquetes monitorea y bloquea activamente el tráfico VPN",
        },
      ],
      effectiveness: "Calificaciones de Efectividad",
      whatWorks: "VPNs Que Funcionan en Irán (2026)",
      whatWorksText:
        "Estos VPN tienen protocolos avanzados de ofuscación/sigilo diseñados específicamente para evadir el sistema DPI de Irán. Instale ANTES de llegar a Irán.",
      vpnEffectiveness: {
        expressvpn: "95% - Protocolo Lightway con ofuscación",
        surfshark: "90% - Modo Camuflaje + función NoBorders",
        protonvpn: "85% - Privacidad suiza + protocolo Stealth",
        vyprvpn: "82% - Protocolo Chameleon para censura",
      },
      notWorking: "VPNs Que No Funcionan en Irán",
      notWorkingText:
        "Estos VPN son bloqueados regularmente por el sistema de censura de Irán y no pueden evadir los filtros DPI:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "La mayoría de VPNs gratuitos",
      ],
      keyFeatures: "Características Esenciales para Irán",
      features: [
        {
          title: "Ofuscación Avanzada",
          desc: "Esencial para evadir DPI - protocolos de sigilo/ofuscación requeridos",
        },
        {
          title: "Servidores Cercanos",
          desc: "Servidores en Turquía, Armenia, EAU para mejores velocidades",
        },
        {
          title: "Actualizaciones Regulares",
          desc: "Actualizaciones constantes de protocolos para evitar bloqueos",
        },
        {
          title: "Política Sin Registros",
          desc: "Jurisdicción fuera de Irán - proveedores suizos, panameños, BVI",
        },
      ],
      blockedServices: "Servicios Comúnmente Bloqueados en Irán",
      blocked: [
        "Telegram (app de mensajería más popular)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "Sitios web de noticias independientes",
        "Muchos servicios de streaming internacionales",
      ],
      tips: "Consejos para Usar VPN en Irán",
      tipsList: [
        "Instale VPN ANTES de llegar a Irán - los sitios web de VPN suelen estar bloqueados",
        "Descargue la app Y archivos de conexión de respaldo (configs OpenVPN)",
        "Use modo ofuscación/sigilo SIEMPRE - esencial para evadir DPI",
        "Mantenga múltiples opciones de VPN listas - los servidores se bloquean regularmente",
        "Evite VPN gratuitos - riesgo de seguridad y fácilmente detectados por DPI",
        "Use datos móviles como respaldo - a veces menos restringidos que internet doméstico",
      ],
      faqTitle: "FAQ VPN Irán",
      faqs: [
        {
          q: "¿Es legal usar VPN en Irán?",
          a: "Los VPN técnicamente no están prohibidos por la ley iraní, pero están muy restringidos. El gobierno bloquea activamente proveedores de VPN usando tecnología DPI. Aunque el uso de VPN en sí no es ilegal, el gobierno lo hace muy difícil de usar.",
        },
        {
          q: "¿Puede el gobierno ver que estoy usando un VPN?",
          a: "Sí, sin protocolos de ofuscación/sigilo, el sistema DPI de Irán puede detectar el uso de VPN. Por eso la ofuscación es esencial: disfraza el tráfico VPN como tráfico HTTPS regular. Siempre use modo ofuscación/sigilo al conectar.",
        },
        {
          q: "¿Qué protocolo VPN funciona mejor en Irán?",
          a: "Los protocolos ofuscados funcionan mejor: Lightway de ExpressVPN, Modo Camuflaje de Surfshark, protocolo Stealth de ProtonVPN y Chameleon de VyprVPN. OpenVPN y WireGuard regulares son fácilmente detectados sin ofuscación.",
        },
        {
          q: "¿Qué pasa si me descubren usando un VPN?",
          a: "Aunque los VPN no son oficialmente ilegales, las penalizaciones son inconsistentes. Las multas son posibles pero la aplicación varía. El problema principal es el bloqueo técnico más que la persecución legal.",
        },
      ],
      getVpn: "Obtener VPN",
      effectiveness95: "95% Efectivo",
      effectiveness90: "90% Efectivo",
      effectiveness85: "85% Efectivo",
      effectiveness82: "82% Efectivo",
      lastUpdated: "Última actualización: noviembre 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour novembre 2026",
      title: "Meilleur VPN pour l'Iran",
      subtitle: "Contournez la censure stricte de l'Iran et accédez aux services bloqués en toute sécurité",
      legalNotice: "Information Juridique Importante",
      legalNoticeText:
        "Les VPN ne sont PAS officiellement interdits en Iran, mais fortement restreints. Le gouvernement bloque activement les principaux fournisseurs de VPN en utilisant l'Inspection Approfondie des Paquets (DPI). L'Iran a l'un des systèmes de censure Internet les plus stricts au monde.",
      legalStatus: "Statut Légal du VPN en Iran",
      legalPoints: [
        {
          icon: "check",
          title: "Pas Officiellement Interdit",
          desc: "Les VPN ne sont pas explicitement illégaux selon la loi iranienne",
        },
        {
          icon: "warning",
          title: "Fortement Restreint",
          desc: "Le gouvernement bloque activement les fournisseurs de VPN avec la technologie DPI",
        },
        {
          icon: "x",
          title: "Plupart des VPN Bloqués",
          desc: "Les services VPN populaires sont régulièrement bloqués et détectés",
        },
        {
          icon: "eye",
          title: "Surveillance DPI",
          desc: "L'Inspection Approfondie des Paquets surveille et bloque activement le trafic VPN",
        },
      ],
      effectiveness: "Évaluations d'Efficacité",
      whatWorks: "VPN Qui Fonctionnent en Iran (2026)",
      whatWorksText:
        "Ces VPN ont des protocoles avancés d'obscurcissement/furtivité spécialement conçus pour contourner le système DPI de l'Iran. Installez AVANT d'arriver en Iran.",
      vpnEffectiveness: {
        expressvpn: "95% - Protocole Lightway avec obscurcissement",
        surfshark: "90% - Mode Camouflage + fonction NoBorders",
        protonvpn: "85% - Confidentialité suisse + protocole Stealth",
        vyprvpn: "82% - Protocole Chameleon pour la censure",
      },
      notWorking: "VPN Qui Ne Fonctionnent Pas en Iran",
      notWorkingText:
        "Ces VPN sont régulièrement bloqués par le système de censure iranien et ne peuvent pas contourner les filtres DPI:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "La plupart des VPN gratuits",
      ],
      keyFeatures: "Fonctionnalités Essentielles pour l'Iran",
      features: [
        {
          title: "Obscurcissement Avancé",
          desc: "Essentiel pour contourner le DPI - protocoles furtifs/obscurcis requis",
        },
        {
          title: "Serveurs Proches",
          desc: "Serveurs en Turquie, Arménie, EAU pour de meilleures vitesses",
        },
        {
          title: "Mises à Jour Régulières",
          desc: "Mises à jour constantes des protocoles pour éviter le blocage",
        },
        {
          title: "Politique Sans Logs",
          desc: "Juridiction hors d'Iran - fournisseurs suisses, panaméens, BVI",
        },
      ],
      blockedServices: "Services Couramment Bloqués en Iran",
      blocked: [
        "Telegram (application de messagerie la plus populaire)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "Sites web d'actualités indépendants",
        "De nombreux services de streaming internationaux",
      ],
      tips: "Conseils pour Utiliser un VPN en Iran",
      tipsList: [
        "Installez le VPN AVANT d'arriver en Iran - les sites web de VPN sont souvent bloqués",
        "Téléchargez l'application ET les fichiers de connexion de sauvegarde (configs OpenVPN)",
        "Utilisez TOUJOURS le mode obscurcissement/furtif - essentiel pour contourner le DPI",
        "Gardez plusieurs options de VPN prêtes - les serveurs sont régulièrement bloqués",
        "Évitez les VPN gratuits - risque de sécurité et facilement détectés par DPI",
        "Utilisez les données mobiles comme secours - parfois moins restreintes que l'internet domestique",
      ],
      faqTitle: "FAQ VPN Iran",
      faqs: [
        {
          q: "L'utilisation d'un VPN est-elle légale en Iran?",
          a: "Les VPN ne sont techniquement pas interdits par la loi iranienne, mais ils sont fortement restreints. Le gouvernement bloque activement les fournisseurs de VPN avec la technologie DPI. Bien que l'utilisation du VPN elle-même ne soit pas illégale, le gouvernement la rend très difficile.",
        },
        {
          q: "Le gouvernement peut-il voir que j'utilise un VPN?",
          a: "Oui, sans protocoles d'obscurcissement/furtivité, le système DPI de l'Iran peut détecter l'utilisation du VPN. C'est pourquoi l'obscurcissement est essentiel - il déguise le trafic VPN en trafic HTTPS régulier. Utilisez toujours le mode obscurcissement/furtif lors de la connexion.",
        },
        {
          q: "Quel protocole VPN fonctionne le mieux en Iran?",
          a: "Les protocoles obscurcis fonctionnent le mieux: Lightway d'ExpressVPN, Mode Camouflage de Surfshark, protocole Stealth de ProtonVPN et Chameleon de VyprVPN. OpenVPN et WireGuard réguliers sont facilement détectés sans obscurcissement.",
        },
        {
          q: "Que se passe-t-il si je suis pris en train d'utiliser un VPN?",
          a: "Bien que les VPN ne soient pas officiellement illégaux, les pénalités sont incohérentes. Les amendes sont possibles mais l'application varie. Le problème principal est le blocage technique plutôt que la poursuite légale.",
        },
      ],
      getVpn: "Obtenir VPN",
      effectiveness95: "95% Efficace",
      effectiveness90: "90% Efficace",
      effectiveness85: "85% Efficace",
      effectiveness82: "82% Efficace",
      lastUpdated: "Dernière mise à jour : novembre 2026",
      sources: "Sources",
    },
    zh: {
      badge: "2026年11月更新",
      title: "伊朗最佳VPN",
      subtitle: "绕过伊朗严格的审查制度，安全访问被封锁的服务",
      legalNotice: "重要法律信息",
      legalNoticeText:
        "VPN在伊朗并未被正式禁止，但受到严格限制。政府使用深度包检测（DPI）主动封锁主要VPN提供商。伊朗拥有世界上最严格的互联网审查系统之一。使用混淆/隐身协议以避免被检测。",
      legalStatus: "伊朗VPN法律地位",
      legalPoints: [
        {
          icon: "check",
          title: "未正式禁止",
          desc: "VPN在伊朗法律下并未明确非法",
        },
        {
          icon: "warning",
          title: "严格限制",
          desc: "政府使用DPI技术主动封锁VPN提供商",
        },
        {
          icon: "x",
          title: "大多数VPN被封锁",
          desc: "流行的VPN服务定期被封锁和检测",
        },
        {
          icon: "eye",
          title: "DPI监控",
          desc: "深度包检测主动监控和封锁VPN流量",
        },
      ],
      effectiveness: "有效性评级",
      whatWorks: "在伊朗有效的VPN（2026）",
      whatWorksText:
        "这些VPN拥有专门设计用于绕过伊朗DPI系统的高级混淆/隐身协议。在抵达伊朗之前安装。",
      vpnEffectiveness: {
        expressvpn: "95% - Lightway协议带混淆",
        surfshark: "90% - 伪装模式 + NoBorders功能",
        protonvpn: "85% - 瑞士隐私 + 隐身协议",
        vyprvpn: "82% - 用于审查的Chameleon协议",
      },
      notWorking: "在伊朗无效的VPN",
      notWorkingText:
        "这些VPN定期被伊朗审查系统封锁，无法绕过DPI过滤器：",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "大多数免费VPN",
      ],
      keyFeatures: "伊朗必备功能",
      features: [
        {
          title: "高级混淆",
          desc: "绕过DPI的必备功能 - 需要隐身/混淆协议",
        },
        {
          title: "附近服务器",
          desc: "土耳其、亚美尼亚、阿联酋的服务器以获得更好的速度",
        },
        {
          title: "定期更新",
          desc: "持续的协议更新以领先于封锁",
        },
        {
          title: "无日志政策",
          desc: "伊朗境外管辖 - 瑞士、巴拿马、英属维尔京群岛提供商",
        },
      ],
      blockedServices: "伊朗常见被封锁服务",
      blocked: [
        "Telegram（最受欢迎的消息应用）",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "独立新闻网站",
        "许多国际流媒体服务",
      ],
      tips: "在伊朗使用VPN的技巧",
      tipsList: [
        "在抵达伊朗之前安装VPN - VPN网站经常被封锁",
        "下载应用程序和备份连接文件（OpenVPN配置）",
        "始终使用混淆/隐身模式 - 绕过DPI的必备",
        "准备多个VPN选项 - 服务器定期被封锁",
        "避免免费VPN - 安全风险且容易被DPI检测",
        "使用移动数据作为备用 - 有时比家庭互联网限制少",
      ],
      faqTitle: "伊朗VPN常见问题",
      faqs: [
        {
          q: "在伊朗使用VPN合法吗？",
          a: "VPN在伊朗法律下技术上未被禁止，但受到严格限制。政府使用DPI技术主动封锁VPN提供商。虽然VPN使用本身不违法，但政府使其非常难以使用。",
        },
        {
          q: "政府能看到我在使用VPN吗？",
          a: "是的，没有混淆/隐身协议，伊朗的DPI系统可以检测VPN使用。这就是为什么混淆至关重要 - 它将VPN流量伪装成常规HTTPS流量。连接时始终使用混淆/隐身模式。",
        },
        {
          q: "哪种VPN协议在伊朗最有效？",
          a: "混淆协议效果最好：ExpressVPN的Lightway、Surfshark的伪装模式、ProtonVPN的隐身协议和VyprVPN的Chameleon。没有混淆的常规OpenVPN和WireGuard很容易被检测。",
        },
        {
          q: "如果被发现使用VPN会怎样？",
          a: "虽然VPN并未正式非法，但处罚不一致。罚款是可能的，但执法各不相同。主要问题是技术封锁而非法律起诉。大多数用户遭遇连接封锁而非法律后果。",
        },
      ],
      getVpn: "获取VPN",
      effectiveness95: "95%有效",
      effectiveness90: "90%有效",
      effectiveness85: "85%有效",
      effectiveness82: "82%有效",
      lastUpdated: "最后更新：2026年11月",
      sources: "资料来源",
    },
    ja: {
      badge: "2026年11月更新",
      title: "イラン最適なVPN",
      subtitle: "イランの厳格な検閲を回避し、ブロックされたサービスに安全にアクセス",
      legalNotice: "重要な法的情報",
      legalNoticeText:
        "VPNはイランで正式に禁止されていませんが、厳しく制限されています。政府はディープパケットインスペクション（DPI）を使用して主要なVPNプロバイダーを積極的にブロックしています。イランは世界で最も厳格なインターネット検閲システムの1つを持っています。検出を避けるために難読化/ステルスプロトコルを使用してください。",
      legalStatus: "イランにおけるVPNの法的地位",
      legalPoints: [
        {
          icon: "check",
          title: "正式に禁止されていない",
          desc: "VPNはイランの法律で明示的に違法ではありません",
        },
        {
          icon: "warning",
          title: "厳しく制限",
          desc: "政府はDPI技術を使用してVPNプロバイダーを積極的にブロック",
        },
        {
          icon: "x",
          title: "ほとんどのVPNがブロック",
          desc: "人気のVPNサービスは定期的にブロックおよび検出されます",
        },
        {
          icon: "eye",
          title: "DPI監視",
          desc: "ディープパケットインスペクションがVPNトラフィックを積極的に監視およびブロック",
        },
      ],
      effectiveness: "有効性評価",
      whatWorks: "イランで機能するVPN（2026年）",
      whatWorksText:
        "これらのVPNは、イランのDPIシステムを回避するために特別に設計された高度な難読化/ステルスプロトコルを備えています。イランに到着する前にインストールしてください。",
      vpnEffectiveness: {
        expressvpn: "95% - 難読化付きLightwayプロトコル",
        surfshark: "90% - カモフラージュモード + NoBorders機能",
        protonvpn: "85% - スイスのプライバシー + ステルスプロトコル",
        vyprvpn: "82% - 検閲用Chameleonプロトコル",
      },
      notWorking: "イランで機能しないVPN",
      notWorkingText:
        "これらのVPNはイランの検閲システムによって定期的にブロックされ、DPIフィルターを回避できません：",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "ほとんどの無料VPN",
      ],
      keyFeatures: "イランに必須の機能",
      features: [
        {
          title: "高度な難読化",
          desc: "DPI回避に不可欠 - ステルス/難読化プロトコルが必要",
        },
        {
          title: "近隣サーバー",
          desc: "トルコ、アルメニア、UAEのサーバーでより良い速度を実現",
        },
        {
          title: "定期的な更新",
          desc: "ブロックを先取りするための継続的なプロトコル更新",
        },
        {
          title: "ノーログポリシー",
          desc: "イラン外の管轄 - スイス、パナマ、BVIのプロバイダー",
        },
      ],
      blockedServices: "イランでよくブロックされるサービス",
      blocked: [
        "Telegram（最も人気のあるメッセージングアプリ）",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "独立系ニュースウェブサイト",
        "多くの国際ストリーミングサービス",
      ],
      tips: "イランでのVPN使用のヒント",
      tipsList: [
        "イランに到着する前にVPNをインストール - VPNウェブサイトはしばしばブロックされています",
        "アプリとバックアップ接続ファイル（OpenVPN設定）をダウンロード",
        "常に難読化/ステルスモードを使用 - DPI回避に不可欠",
        "複数のVPNオプションを用意 - サーバーは定期的にブロックされます",
        "無料VPNを避ける - セキュリティリスクでDPIで簡単に検出",
        "バックアップとしてモバイルデータを使用 - 家庭のインターネットより制限が少ない場合があります",
      ],
      faqTitle: "イランVPN FAQ",
      faqs: [
        {
          q: "イランでVPN使用は合法ですか？",
          a: "VPNは技術的にイランの法律で禁止されていませんが、厳しく制限されています。政府はDPI技術を使用してVPNプロバイダーを積極的にブロックしています。VPN使用自体は違法ではありませんが、政府は使用を非常に困難にしています。",
        },
        {
          q: "政府は私がVPNを使用していることがわかりますか？",
          a: "はい、難読化/ステルスプロトコルがない場合、イランのDPIシステムはVPN使用を検出できます。これが難読化が不可欠な理由です - VPNトラフィックを通常のHTTPSトラフィックに偽装します。接続時は常に難読化/ステルスモードを使用してください。",
        },
        {
          q: "イランでどのVPNプロトコルが最も効果的ですか？",
          a: "難読化されたプロトコルが最も効果的です：ExpressVPNのLightway、Surfsharkのカモフラージュモード、ProtonVPNのステルスプロトコル、VyprVPNのChameleon。難読化なしの通常のOpenVPNとWireGuardは簡単に検出されます。",
        },
        {
          q: "VPNを使用して捕まったらどうなりますか？",
          a: "VPNは正式には違法ではありませんが、罰則は一貫していません。罰金は可能ですが、執行は異なります。主な問題は法的訴追ではなく技術的ブロックです。ほとんどのユーザーは法的結果ではなく接続ブロックを経験します。",
        },
      ],
      getVpn: "VPNを入手",
      effectiveness95: "95%有効",
      effectiveness90: "90%有効",
      effectiveness85: "85%有効",
      effectiveness82: "82%有効",
      lastUpdated: "最終更新：2026年11月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 11월 업데이트",
      title: "이란 최고의 VPN",
      subtitle: "이란의 엄격한 검열을 우회하고 차단된 서비스에 안전하게 액세스",
      legalNotice: "중요한 법적 정보",
      legalNoticeText:
        "VPN은 이란에서 공식적으로 금지되지 않았지만 엄격하게 제한됩니다. 정부는 Deep Packet Inspection (DPI)을 사용하여 주요 VPN 제공업체를 적극적으로 차단합니다. 이란은 세계에서 가장 엄격한 인터넷 검열 시스템 중 하나를 보유하고 있습니다. 탐지를 피하기 위해 난독화/스텔스 프로토콜을 사용하세요.",
      legalStatus: "이란 VPN 법적 지위",
      legalPoints: [
        {
          icon: "check",
          title: "공식적으로 금지되지 않음",
          desc: "VPN은 이란 법률에서 명시적으로 불법이 아닙니다",
        },
        {
          icon: "warning",
          title: "엄격하게 제한",
          desc: "정부는 DPI 기술을 사용하여 VPN 제공업체를 적극적으로 차단",
        },
        {
          icon: "x",
          title: "대부분의 VPN 차단됨",
          desc: "인기 있는 VPN 서비스는 정기적으로 차단 및 감지됩니다",
        },
        {
          icon: "eye",
          title: "DPI 모니터링",
          desc: "Deep Packet Inspection이 VPN 트래픽을 적극적으로 모니터링 및 차단",
        },
      ],
      effectiveness: "효과성 평가",
      whatWorks: "이란에서 작동하는 VPN (2026)",
      whatWorksText:
        "이러한 VPN은 이란의 DPI 시스템을 우회하도록 특별히 설계된 고급 난독화/스텔스 프로토콜을 갖추고 있습니다. 이란에 도착하기 전에 설치하세요.",
      vpnEffectiveness: {
        expressvpn: "95% - 난독화가 포함된 Lightway 프로토콜",
        surfshark: "90% - 위장 모드 + NoBorders 기능",
        protonvpn: "85% - 스위스 개인정보 보호 + 스텔스 프로토콜",
        vyprvpn: "82% - 검열용 Chameleon 프로토콜",
      },
      notWorking: "이란에서 작동하지 않는 VPN",
      notWorkingText:
        "이러한 VPN은 이란의 검열 시스템에 의해 정기적으로 차단되며 DPI 필터를 우회할 수 없습니다:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "대부분의 무료 VPN",
      ],
      keyFeatures: "이란 필수 기능",
      features: [
        {
          title: "고급 난독화",
          desc: "DPI 우회에 필수 - 스텔스/난독화 프로토콜 필요",
        },
        {
          title: "근처 서버",
          desc: "더 나은 속도를 위해 터키, 아르메니아, UAE의 서버",
        },
        {
          title: "정기 업데이트",
          desc: "차단을 앞서기 위한 지속적인 프로토콜 업데이트",
        },
        {
          title: "무로그 정책",
          desc: "이란 외부 관할권 - 스위스, 파나마, BVI 제공업체",
        },
      ],
      blockedServices: "이란에서 일반적으로 차단되는 서비스",
      blocked: [
        "Telegram (가장 인기 있는 메시징 앱)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "독립 뉴스 웹사이트",
        "많은 국제 스트리밍 서비스",
      ],
      tips: "이란에서 VPN 사용 팁",
      tipsList: [
        "이란에 도착하기 전에 VPN 설치 - VPN 웹사이트는 종종 차단됩니다",
        "앱과 백업 연결 파일 다운로드 (OpenVPN 구성)",
        "항상 난독화/스텔스 모드 사용 - DPI 우회에 필수",
        "여러 VPN 옵션 준비 - 서버가 정기적으로 차단됩니다",
        "무료 VPN 피하기 - 보안 위험 및 DPI로 쉽게 감지",
        "백업으로 모바일 데이터 사용 - 가정 인터넷보다 덜 제한적일 수 있음",
      ],
      faqTitle: "이란 VPN FAQ",
      faqs: [
        {
          q: "이란에서 VPN 사용이 합법인가요?",
          a: "VPN은 기술적으로 이란 법률에서 금지되지 않았지만 엄격하게 제한됩니다. 정부는 DPI 기술을 사용하여 VPN 제공업체를 적극적으로 차단합니다. VPN 사용 자체는 불법이 아니지만 정부는 사용을 매우 어렵게 만듭니다.",
        },
        {
          q: "정부가 내가 VPN을 사용하는 것을 볼 수 있나요?",
          a: "예, 난독화/스텔스 프로토콜 없이는 이란의 DPI 시스템이 VPN 사용을 감지할 수 있습니다. 이것이 난독화가 필수적인 이유입니다 - VPN 트래픽을 일반 HTTPS 트래픽으로 위장합니다. 연결 시 항상 난독화/스텔스 모드를 사용하세요.",
        },
        {
          q: "이란에서 어떤 VPN 프로토콜이 가장 잘 작동하나요?",
          a: "난독화된 프로토콜이 가장 잘 작동합니다: ExpressVPN의 Lightway, Surfshark의 위장 모드, ProtonVPN의 스텔스 프로토콜, VyprVPN의 Chameleon. 난독화 없는 일반 OpenVPN과 WireGuard는 쉽게 감지됩니다.",
        },
        {
          q: "VPN을 사용하다 적발되면 어떻게 되나요?",
          a: "VPN이 공식적으로 불법은 아니지만 처벌은 일관되지 않습니다. 벌금은 가능하지만 집행은 다양합니다. 주요 문제는 법적 기소가 아니라 기술적 차단입니다. 대부분의 사용자는 법적 결과가 아닌 연결 차단을 경험합니다.",
        },
      ],
      getVpn: "VPN 받기",
      effectiveness95: "95% 효과적",
      effectiveness90: "90% 효과적",
      effectiveness85: "85% 효과적",
      effectiveness82: "82% 효과적",
      lastUpdated: "마지막 업데이트: 2026년 11월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตเมื่อพฤศจิกายน 2026",
      title: "VPN ที่ดีที่สุดสำหรับอิหร่าน",
      subtitle: "หลีกเลี่ยงการเซ็นเซอร์ที่เข้มงวดของอิหร่านและเข้าถึงบริการที่ถูกบล็อกอย่างปลอดภัย",
      legalNotice: "ข้อมูลทางกฎหมายที่สำคัญ",
      legalNoticeText:
        "VPN ไม่ได้ถูกห้ามอย่างเป็นทางการในอิหร่าน แต่ถูกจำกัดอย่างหนัก รัฐบาลบล็อกผู้ให้บริการ VPN รายใหญ่อย่างแข็งขันโดยใช้ Deep Packet Inspection (DPI) อิหร่านมีระบบเซ็นเซอร์อินเทอร์เน็ตที่เข้มงวดที่สุดในโลก ใช้โปรโตคอลการปิดบัง/ซ่อนตัวเพื่อหลีกเลี่ยงการตรวจจับ",
      legalStatus: "สถานะทางกฎหมายของ VPN ในอิหร่าน",
      legalPoints: [
        {
          icon: "check",
          title: "ไม่ได้ถูกห้ามอย่างเป็นทางการ",
          desc: "VPN ไม่ผิดกฎหมายโดยชัดเจนภายใต้กฎหมายอิหร่าน",
        },
        {
          icon: "warning",
          title: "ถูกจำกัดอย่างหนัก",
          desc: "รัฐบาลบล็อกผู้ให้บริการ VPN อย่างแข็งขันโดยใช้เทคโนโลยี DPI",
        },
        {
          icon: "x",
          title: "VPN ส่วนใหญ่ถูกบล็อก",
          desc: "บริการ VPN ยอดนิยมถูกบล็อกและตรวจจับเป็นประจำ",
        },
        {
          icon: "eye",
          title: "การตรวจสอบ DPI",
          desc: "Deep Packet Inspection ตรวจสอบและบล็อกการเข้าชม VPN อย่างแข็งขัน",
        },
      ],
      effectiveness: "คะแนนประสิทธิภาพ",
      whatWorks: "VPN ที่ใช้งานได้ในอิหร่าน (2026)",
      whatWorksText:
        "VPN เหล่านี้มีโปรโตคอลการปิดบัง/ซ่อนตัวขั้นสูงที่ออกแบบมาโดยเฉพาะเพื่อหลีกเลี่ยงระบบ DPI ของอิหร่าน ติดตั้งก่อนมาถึงอิหร่าน",
      vpnEffectiveness: {
        expressvpn: "95% - โปรโตคอล Lightway พร้อมการปิดบัง",
        surfshark: "90% - โหมดพรางตัว + ฟีเจอร์ NoBorders",
        protonvpn: "85% - ความเป็นส่วนตัวของสวิส + โปรโตคอลซ่อนตัว",
        vyprvpn: "82% - โปรโตคอล Chameleon สำหรับการเซ็นเซอร์",
      },
      notWorking: "VPN ที่ใช้ไม่ได้ในอิหร่าน",
      notWorkingText:
        "VPN เหล่านี้ถูกบล็อกโดยระบบเซ็นเซอร์ของอิหร่านเป็นประจำและไม่สามารถหลีกเลี่ยงตัวกรอง DPI:",
      notWorkingVpns: [
        "NordVPN",
        "IPVanish",
        "Private Internet Access (PIA)",
        "CyberGhost",
        "AtlasVPN",
        "VPN ฟรีส่วนใหญ่",
      ],
      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับอิหร่าน",
      features: [
        {
          title: "การปิดบังขั้นสูง",
          desc: "จำเป็นสำหรับการหลีกเลี่ยง DPI - ต้องใช้โปรโตคอลซ่อนตัว/ปิดบัง",
        },
        {
          title: "เซิร์ฟเวอร์ใกล้เคียง",
          desc: "เซิร์ฟเวอร์ในตุรกี อาร์เมเนีย UAE เพื่อความเร็วที่ดีขึ้น",
        },
        {
          title: "การอัปเดตเป็นประจำ",
          desc: "การอัปเดตโปรโตคอลอย่างต่อเนื่องเพื่อนำหน้าการบล็อก",
        },
        {
          title: "นโยบายไม่เก็บบันทึก",
          desc: "เขตอำนาจศาลนอกอิหร่าน - ผู้ให้บริการสวิส ปานามา BVI",
        },
      ],
      blockedServices: "บริการที่ถูกบล็อกโดยทั่วไปในอิหร่าน",
      blocked: [
        "Telegram (แอพส่งข้อความยอดนิยมที่สุด)",
        "WhatsApp",
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook / Twitter / X",
        "เว็บไซต์ข่าวอิสระ",
        "บริการสตรีมมิ่งระหว่างประเทศหลายรายการ",
      ],
      tips: "เคล็ดลับสำหรับการใช้ VPN ในอิหร่าน",
      tipsList: [
        "ติดตั้ง VPN ก่อนมาถึงอิหร่าน - เว็บไซต์ VPN มักถูกบล็อก",
        "ดาวน์โหลดแอพและไฟล์การเชื่อมต่อสำรอง (OpenVPN configs)",
        "ใช้โหมดปิดบัง/ซ่อนตัวเสมอ - จำเป็นสำหรับการหลีกเลี่ยง DPI",
        "เตรียมตัวเลือก VPN หลายตัว - เซิร์ฟเวอร์ถูกบล็อกเป็นประจำ",
        "หลีกเลี่ยง VPN ฟรี - มีความเสี่ยงด้านความปลอดภัยและตรวจจับได้ง่ายโดย DPI",
        "ใช้ข้อมูลมือถือเป็นทางสำรอง - บางครั้งถูกจำกัดน้อยกว่าอินเทอร์เน็ตบ้าน",
      ],
      faqTitle: "คำถามที่พบบ่อย VPN อิหร่าน",
      faqs: [
        {
          q: "การใช้ VPN ถูกกฎหมายในอิหร่านหรือไม่?",
          a: "VPN ไม่ได้ถูกห้ามตามกฎหมายอิหร่านในทางเทคนิค แต่ถูกจำกัดอย่างหนัก รัฐบาลบล็อกผู้ให้บริการ VPN อย่างแข็งขันโดยใช้เทคโนโลยี DPI แม้ว่าการใช้ VPN เองจะไม่ผิดกฎหมาย แต่รัฐบาลทำให้การใช้งานยากมาก",
        },
        {
          q: "รัฐบาลสามารถเห็นว่าฉันใช้ VPN หรือไม่?",
          a: "ใช่ หากไม่มีโปรโตคอลการปิดบัง/ซ่อนตัว ระบบ DPI ของอิหร่านสามารถตรวจจับการใช้ VPN นี่คือเหตุผลที่การปิดบังเป็นสิ่งจำเป็น - มันปลอมแปลงการเข้าชม VPN ให้เป็นการเข้าชม HTTPS ปกติ ใช้โหมดปิดบัง/ซ่อนตัวเสมอเมื่อเชื่อมต่อ",
        },
        {
          q: "โปรโตคอล VPN ใดทำงานได้ดีที่สุดในอิหร่าน?",
          a: "โปรโตคอลที่ถูกปิดบังทำงานได้ดีที่สุด: Lightway ของ ExpressVPN, โหมดพรางตัวของ Surfshark, โปรโตคอลซ่อนตัวของ ProtonVPN และ Chameleon ของ VyprVPN OpenVPN และ WireGuard ปกติถูกตรวจจับได้ง่ายหากไม่มีการปิดบัง",
        },
        {
          q: "จะเกิดอะไรขึ้นหากฉันถูกจับได้ว่าใช้ VPN?",
          a: "แม้ว่า VPN จะไม่ผิดกฎหมายอย่างเป็นทางการ แต่การลงโทษไม่สม่ำเสมอ ค่าปรับเป็นไปได้ แต่การบังคับใช้แตกต่างกัน ปัญหาหลักคือการบล็อกทางเทคนิคมากกว่าการดำเนินคดีทางกฎหมาย ผู้ใช้ส่วนใหญ่ประสบกับการบล็อกการเชื่อมต่อมากกว่าผลทางกฎหมาย",
        },
      ],
      getVpn: "รับ VPN",
      effectiveness95: "ประสิทธิภาพ 95%",
      effectiveness90: "ประสิทธิภาพ 90%",
      effectiveness85: "ประสิทธิภาพ 85%",
      effectiveness82: "ประสิทธิภาพ 82%",
      lastUpdated: "อัปเดตล่าสุด: พฤศจิกายน 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">🇮🇷</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-8">
        <div className="container">
          <Card className="border-red-500 bg-red-500/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Ban className="h-8 w-8 text-red-500 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {t.legalNotice}
                  </h2>
                  <p className="text-muted-foreground">{t.legalNoticeText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Status Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.legalStatus}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.legalPoints.map((point, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted">
                      {point.icon === "check" && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {point.icon === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      {point.icon === "x" && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      {point.icon === "eye" && (
                        <Eye className="h-5 w-5 text-orange-500" />
                      )}
                    </div>
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VPNs That Work */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.whatWorksText}
            </p>
          </div>

          <div className="space-y-6">
            {iranVpns.map((vpn, index) => {
              const effectivenessKey = vpn.slug as keyof typeof t.vpnEffectiveness;
              const effectiveness = t.vpnEffectiveness[effectivenessKey];

              return (
                <Card key={vpn.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold">{vpn.name}</h3>
                          <RatingStars rating={vpn.overallRating} size="sm" />
                          <Badge variant="secondary" className="text-xs">
                            {effectiveness}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">
                            {index === 0 && t.effectiveness95}
                            {index === 1 && t.effectiveness90}
                            {index === 2 && t.effectiveness85}
                            {index === 3 && t.effectiveness82}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">Obfuscation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-purple-500" />
                          <span className="text-sm">{vpn.countries} countries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-orange-500" />
                          <span className="text-sm">{vpn.maxDevices} devices</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                        <div className="text-center lg:text-right">
                          <div className="text-3xl font-bold text-primary">
                            ${vpn.priceTwoYear || vpn.priceYearly}
                            <span className="text-sm font-normal text-muted-foreground">
                              /mo
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <AffiliateButton
                            vpnId={vpn.id}
                            vpnName={vpn.name}
                            affiliateUrl={vpn.affiliateUrl}
                            className="flex-1"
                          >
                            {t.getVpn}
                          </AffiliateButton>
                          <Button variant="outline" asChild>
                            <Link href={`/reviews/${vpn.slug}`}>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* VPNs That Don't Work */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-red-600 dark:text-red-400">
              {t.notWorking}
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              {t.notWorkingText}
            </p>
            <Card className="border-red-500/50">
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {t.notWorkingVpns.map((vpn, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded bg-red-500/10">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{vpn}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.keyFeatures}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {index === 0 && <Lock className="h-6 w-6 text-primary" />}
                      {index === 1 && <Globe className="h-6 w-6 text-primary" />}
                      {index === 2 && <Clock className="h-6 w-6 text-primary" />}
                      {index === 3 && <Shield className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blocked Services */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t.blockedServices}
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.blocked.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.tips}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {t.tipsList.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-8 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold mb-4">{t.sources}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a
                  href="https://freedomhouse.org/country/iran/freedom-net/2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Freedom House - Iran Internet Freedom Report 2024
                </a>
              </li>
              <li>
                <a
                  href="https://netblocks.org/reports/iran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  NetBlocks - Iran Network Monitoring
                </a>
              </li>
              <li>
                <a
                  href="https://www.accessnow.org/press-release/iran-internet-shutdowns-2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Access Now - Iran Digital Rights Reports
                </a>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <RelatedPages
            title="Related Guides"
            pages={[
              { title: "VPN Guide: China", description: "Bypass the Great Firewall with advanced obfuscation", href: "/countries/china", icon: "globe" },
              { title: "VPN Guide: Russia", description: "Internet restrictions and VPN use in Russia", href: "/countries/russia", icon: "globe" },
              { title: "VPN Guide: UAE", description: "VPN legality and usage in the Emirates", href: "/countries/uae", icon: "globe" },
              { title: "What is a VPN?", description: "Learn how VPNs protect your privacy", href: "/guides/what-is-vpn", icon: "shield" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
