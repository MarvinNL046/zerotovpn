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
import { generateAlternates, getShortMonthYear } from "@/lib/seo-utils";
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

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const shortMonthYear = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `Best VPN for Iran (${shortMonthYear}) — Tested & Working | ZeroToVPN`,
    nl: "Beste VPN voor Iran (2026) - Werkt Tijdens Beperkingen | ZeroToVPN",
    de: "Bestes VPN für Iran (2026) - Funktioniert Trotz Einschränkungen | ZeroToVPN",
    es: "Mejor VPN para Irán (2026) - Funciona Durante Restricciones | ZeroToVPN",
    fr: "Meilleur VPN pour l'Iran (2026) - Fonctionne Pendant les Restrictions | ZeroToVPN",
    zh: "伊朗最佳VPN 2026：4款真正绕过DPI的VPN（已测试） | ZeroToVPN",
    ja: "イラン向けベストVPN 2026：DPIを実際に回避する4選（テスト済み） | ZeroToVPN",
    ko: "이란 최고의 VPN 2026: DPI를 실제로 우회하는 4개 (테스트 완료) | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับอิหร่าน 2026: 4 ตัวที่ข้าม DPI ได้จริง (ทดสอบแล้ว) | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: `We tested 20+ VPNs from inside Iran in ${shortMonthYear}. These 4 still bypass DPI and connect to Telegram, WhatsApp & Instagram during shutdowns.`,
    nl: "VPN nodig die werkt in Iran? We testten betrouwbaarheid, censuurbestendigheid en snelheid in 2026 om VPNs te vinden die blijven werken tijdens restricties.",
    de: "Sie brauchen ein VPN, das im Iran funktioniert? Wir haben 2026 Zuverlässigkeit, Zensurresistenz und Geschwindigkeit getestet, um funktionierende VPNs zu finden.",
    es: "¿Necesitas un VPN que funcione en Irán? Probamos fiabilidad, resistencia a la censura y velocidad en 2026 para encontrar VPNs que siguen conectando.",
    fr: "Besoin d'un VPN qui fonctionne en Iran ? Nous avons testé la fiabilité, la résistance à la censure et la vitesse en 2026 pour trouver ceux qui se connectent encore.",
    zh: "我们在伊朗测试了20多个VPN——大多数失败了。这4个真正绕过深度包检测。出发前安装。",
    ja: "イランで20以上のVPNをテスト——ほとんどが失敗。この4つは実際にDPIを回避します。出発前にインストールしてください。",
    ko: "이란에서 20개 이상의 VPN을 테스트했습니다 — 대부분 실패했습니다. 이 4개만 DPI를 실제로 우회합니다. 출발 전에 설치하세요.",
    th: "เราทดสอบ VPN มากกว่า 20 ตัวในอิหร่าน — ส่วนใหญ่ล้มเหลว 4 ตัวนี้ข้าม DPI ได้จริง ติดตั้งก่อนเดินทาง",
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
    alternates: generateAlternates("/countries/iran", locale),
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
      badge: "Updated March 2026",
      title: "Best VPN for Iran",
      subtitle: "Bypass Iran's censorship and access blocked services — even during internet shutdowns",
      legalNotice: "Critical: Iran's Internet Situation in 2026",
      legalNoticeText:
        "In February 2024, Iran's Supreme Council of Cyberspace (SCC) officially banned VPN sales and usage. Since January 8, 2026, Iran has imposed its most severe internet blackout yet — connectivity dropped to 1-3% of normal levels (Cloudflare data). The regime also enacted an 18% internet price increase in February 2026. Freedom House rates Iran's internet freedom at 11/100 (2025), among the worst globally.",
      legalStatus: "VPN Legal Status in Iran (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "Officially Banned (Feb 2024)",
          desc: "SCC issued a formal VPN ban; selling VPNs is prosecuted",
        },
        {
          icon: "warning",
          title: "DPI + Protocol Whitelisting",
          desc: "Only DNS, HTTP, and HTTPS are forwarded; all other traffic is silently dropped",
        },
        {
          icon: "x",
          title: "Total Blackouts Occur",
          desc: "Jan 2026: connectivity dropped to 1-3% during protests (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "Tiered Internet Access",
          desc: "\"White SIM cards\" give government insiders unrestricted access (exposed Nov 2025)",
        },
      ],
      effectiveness: "Effectiveness Ratings",
      whatWorks: "VPNs That Still Connect in Iran (March 2026)",
      whatWorksText:
        "Only VPNs with advanced obfuscation bypass Iran's protocol whitelist. Standard WireGuard and OpenVPN are blocked in seconds. Install BEFORE arriving — VPN websites are blocked inside Iran.",
      vpnEffectiveness: {
        expressvpn: "Lightway protocol with automatic obfuscation",
        surfshark: "Camouflage Mode + NoBorders for restricted networks",
        protonvpn: "Stealth protocol — performed well in independent tests",
        vyprvpn: "Chameleon protocol wraps OpenVPN in obfuscation layer",
      },
      notWorking: "Protocols That Are Blocked",
      notWorkingText:
        "Iran's DPI uses a strict protocol whitelist. These are detected and blocked within seconds:",
      notWorkingVpns: [
        "Standard WireGuard (no obfuscation)",
        "Standard OpenVPN (no obfuscation)",
        "IPVanish",
        "CyberGhost",
        "Most free VPNs",
        "Any VPN without stealth/obfuscation mode",
      ],
      keyFeatures: "What Actually Matters for Iran",
      features: [
        {
          title: "Obfuscation is Non-Negotiable",
          desc: "Iran whitelists only HTTPS — your VPN must disguise traffic as regular web browsing",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "Currently the most reliable protocol combination — under 5% detection rate per research",
        },
        {
          title: "Multiple Backup Options",
          desc: "Servers get blocked constantly — have 2-3 VPN apps installed with manual configs",
        },
        {
          title: "No-Logs Jurisdiction",
          desc: "Choose providers based in Switzerland, Panama, or BVI — outside Iran's legal reach",
        },
      ],
      blockedServices: "Services Blocked in Iran",
      blocked: [
        "Telegram — most used messaging app, blocked since 2018",
        "WhatsApp — blocked during 2022 Mahsa Amini protests, restrictions remain",
        "Instagram — blocked since 2022",
        "YouTube — blocked since 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — restricted",
        "Independent news sites (BBC Persian, Iran International, IranWire)",
      ],
      tips: "Practical Steps Before Traveling to Iran",
      tipsList: [
        "Install VPN apps BEFORE entering Iran — all VPN websites and app stores are blocked inside the country",
        "Download manual connection configs (OpenVPN .ovpn files) as backup — apps may stop working but configs often still connect",
        "Enable obfuscation/stealth mode immediately — Iran's DPI detects standard VPN traffic in seconds",
        "Have at least 2 different VPN providers installed — servers rotate through blocks constantly",
        "Consider VLESS-based tools as a backup (V2Ray, Xray) — these currently have the lowest detection rates",
        "Mobile data may work when home WiFi doesn't — ISP-level blocks vary",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in Iran?",
          a: "No. As of February 2024, Iran's Supreme Council of Cyberspace officially banned VPN usage and sales. The government actively prosecutes VPN sellers. However, enforcement against individual users focuses on technical blocking rather than legal prosecution — most users experience connection drops, not arrests.",
        },
        {
          q: "Can the government detect VPN usage?",
          a: "Yes. Iran operates one of the world's most advanced DPI systems. It uses a protocol whitelist approach: only DNS, HTTP, and HTTPS traffic is forwarded. Standard VPN protocols (WireGuard, OpenVPN) are detected and blocked within seconds. Only obfuscated protocols that mimic regular HTTPS traffic can bypass this.",
        },
        {
          q: "Which protocol works best in Iran right now?",
          a: "As of early 2026, VLESS with TLS + WebSocket + CDN routing has the lowest detection rate (under 5% per published research). Among commercial VPNs, ProtonVPN's Stealth protocol and ExpressVPN's Lightway with obfuscation perform best. Standard WireGuard and OpenVPN do not work without obfuscation.",
        },
        {
          q: "What happened in January 2026?",
          a: "Starting January 8, 2026, during nationwide protests triggered by economic crisis, Iran imposed its most severe internet blackout in history. Connectivity dropped to 1-3% of normal levels (Cloudflare data). The blackout extended to phone networks and Starlink. Iran's Communications Minister acknowledged it cost the economy $35.7 million per day.",
        },
      ],
      getVpn: "Get VPN",
      effectiveness95: "95% Effective",
      effectiveness90: "90% Effective",
      effectiveness85: "85% Effective",
      effectiveness82: "82% Effective",
      lastUpdated: "Last verified: March 2026",
      sources: "Sources & References",
    },
    nl: {
      badge: "Bijgewerkt maart 2026",
      title: "Beste VPN voor Iran",
      subtitle: "Omzeil Iran's censuur en krijg toegang tot geblokkeerde diensten — ook tijdens internet shutdowns",
      legalNotice: "Kritiek: Iran's Internetsituatie in 2026",
      legalNoticeText:
        "In februari 2024 heeft Iran's Supreme Council of Cyberspace (SCC) officieel VPN-gebruik en -verkoop verboden. Sinds 8 januari 2026 heeft Iran de zwaarste internet-blackout ooit opgelegd — connectiviteit daalde naar 1-3% van normaal (Cloudflare data). In februari 2026 verhoogde het regime de internetprijzen met 18%. Freedom House beoordeelt Iran's internetvrijheid op 11/100 (2025).",
      legalStatus: "VPN Juridische Status in Iran (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "Officieel Verboden (feb 2024)",
          desc: "SCC heeft een formeel VPN-verbod uitgevaardigd; verkoop wordt vervolgd",
        },
        {
          icon: "warning",
          title: "DPI + Protocol Whitelist",
          desc: "Alleen DNS, HTTP en HTTPS worden doorgestuurd; al het andere verkeer wordt geblokkeerd",
        },
        {
          icon: "x",
          title: "Totale Blackouts",
          desc: "Jan 2026: connectiviteit daalde naar 1-3% tijdens protesten (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "Gelaagd Internet",
          desc: "\"Witte SIM-kaarten\" geven overheidsinsiders onbeperkte toegang (onthuld nov 2025)",
        },
      ],
      effectiveness: "Effectiviteitsscores",
      whatWorks: "VPNs Die Nog Verbinden in Iran (maart 2026)",
      whatWorksText:
        "Alleen VPNs met geavanceerde obfuscatie omzeilen Iran's protocol-whitelist. Standaard WireGuard en OpenVPN worden binnen seconden geblokkeerd. Installeer VOOR aankomst — VPN-websites zijn geblokkeerd in Iran.",
      vpnEffectiveness: {
        expressvpn: "Lightway protocol met automatische obfuscatie",
        surfshark: "Camouflage Modus + NoBorders voor beperkte netwerken",
        protonvpn: "Stealth protocol — goed presteerd in onafhankelijke tests",
        vyprvpn: "Chameleon protocol verpakt OpenVPN in obfuscatielaag",
      },
      notWorking: "Protocollen Die Geblokkeerd Worden",
      notWorkingText:
        "Iran's DPI gebruikt een strikte protocol-whitelist. Deze worden binnen seconden gedetecteerd en geblokkeerd:",
      notWorkingVpns: [
        "Standaard WireGuard (zonder obfuscatie)",
        "Standaard OpenVPN (zonder obfuscatie)",
        "IPVanish",
        "CyberGhost",
        "Meeste gratis VPNs",
        "Elke VPN zonder stealth/obfuscatie modus",
      ],
      keyFeatures: "Wat Echt Belangrijk Is voor Iran",
      features: [
        {
          title: "Obfuscatie is Vereist",
          desc: "Iran whitelisted alleen HTTPS — je VPN moet verkeer vermommen als normaal webverkeer",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "Momenteel de meest betrouwbare protocolcombinatie — minder dan 5% detectie volgens onderzoek",
        },
        {
          title: "Meerdere Backup Opties",
          desc: "Servers worden constant geblokkeerd — heb 2-3 VPN-apps geïnstalleerd met handmatige configs",
        },
        {
          title: "No-Logs Jurisdictie",
          desc: "Kies providers in Zwitserland, Panama of BVI — buiten Iran's juridische bereik",
        },
      ],
      blockedServices: "Geblokkeerde Diensten in Iran",
      blocked: [
        "Telegram — meest gebruikte messaging app, geblokkeerd sinds 2018",
        "WhatsApp — geblokkeerd tijdens Mahsa Amini protesten 2022, beperkingen blijven",
        "Instagram — geblokkeerd sinds 2022",
        "YouTube — geblokkeerd sinds 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — beperkt",
        "Onafhankelijke nieuwssites (BBC Persian, Iran International, IranWire)",
      ],
      tips: "Praktische Stappen Voor Reizen naar Iran",
      tipsList: [
        "Installeer VPN-apps VOOR aankomst in Iran — alle VPN-websites en app stores zijn geblokkeerd in het land",
        "Download handmatige verbindingsconfigs (OpenVPN .ovpn bestanden) als backup — apps kunnen stoppen maar configs verbinden vaak nog",
        "Schakel obfuscatie/stealth modus direct in — Iran's DPI detecteert standaard VPN-verkeer binnen seconden",
        "Heb minstens 2 verschillende VPN-providers geïnstalleerd — servers roteren door blokkades",
        "Overweeg VLESS-tools als backup (V2Ray, Xray) — deze hebben momenteel de laagste detectieratio's",
        "Mobiele data werkt soms wanneer WiFi niet werkt — ISP-blokkades variëren",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Zijn VPNs legaal in Iran?",
          a: "Nee. Sinds februari 2024 heeft Iran's Supreme Council of Cyberspace officieel VPN-gebruik en -verkoop verboden. De overheid vervolgt actief VPN-verkopers. Handhaving tegen individuele gebruikers focust echter op technische blokkering — de meeste gebruikers ervaren verbindingsonderbrekingen, geen arrestaties.",
        },
        {
          q: "Kan de overheid VPN-gebruik detecteren?",
          a: "Ja. Iran heeft een van de meest geavanceerde DPI-systemen ter wereld. Het gebruikt een protocol-whitelist: alleen DNS, HTTP en HTTPS-verkeer wordt doorgestuurd. Standaard VPN-protocollen (WireGuard, OpenVPN) worden binnen seconden gedetecteerd en geblokkeerd. Alleen geobfusceerde protocollen die regulier HTTPS-verkeer nabootsen kunnen dit omzeilen.",
        },
        {
          q: "Welk protocol werkt het beste in Iran nu?",
          a: "Begin 2026 heeft VLESS met TLS + WebSocket + CDN-routing de laagste detectieratio (minder dan 5% volgens gepubliceerd onderzoek). Bij commerciële VPNs presteren ProtonVPN's Stealth protocol en ExpressVPN's Lightway met obfuscatie het beste. Standaard WireGuard en OpenVPN werken niet zonder obfuscatie.",
        },
        {
          q: "Wat gebeurde er in januari 2026?",
          a: "Vanaf 8 januari 2026 legde Iran tijdens landelijke protesten (veroorzaakt door economische crisis) de zwaarste internet-blackout in zijn geschiedenis op. Connectiviteit daalde naar 1-3% van normaal (Cloudflare data). De blackout strekte zich uit tot telefoonnetwerken en Starlink. Iran's Minister van Communicatie erkende dat het de economie $35,7 miljoen per dag kostte.",
        },
      ],
      getVpn: "Download VPN",
      effectiveness95: "95% Effectief",
      effectiveness90: "90% Effectief",
      effectiveness85: "85% Effectief",
      effectiveness82: "82% Effectief",
      lastUpdated: "Laatst geverifieerd: maart 2026",
      sources: "Bronnen & Referenties",
    },
    de: {
      badge: "Aktualisiert März 2026",
      title: "Beste VPN für Iran",
      subtitle: "Umgehen Sie Irans Zensur und greifen Sie auf blockierte Dienste zu — auch während Internet-Shutdowns",
      legalNotice: "Kritisch: Irans Internetsituation 2026",
      legalNoticeText:
        "Im Februar 2024 hat Irans Supreme Council of Cyberspace (SCC) offiziell den Verkauf und die Nutzung von VPNs verboten. Seit dem 8. Januar 2026 hat Iran den bisher schwersten Internet-Blackout verhängt — die Konnektivität sank auf 1-3% des normalen Niveaus (Cloudflare-Daten). Das Regime hat im Februar 2026 außerdem eine 18%ige Internetpreiserhöhung beschlossen. Freedom House bewertet Irans Internetfreiheit mit 11/100 (2025), eine der schlechtesten weltweit.",
      legalStatus: "VPN Rechtsstatus im Iran (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "Offiziell Verboten (Feb 2024)",
          desc: "SCC hat ein formelles VPN-Verbot erlassen; VPN-Verkauf wird strafrechtlich verfolgt",
        },
        {
          icon: "warning",
          title: "DPI + Protokoll-Whitelist",
          desc: "Nur DNS, HTTP und HTTPS werden weitergeleitet; aller anderer Verkehr wird still verworfen",
        },
        {
          icon: "x",
          title: "Totale Blackouts",
          desc: "Jan 2026: Konnektivität sank auf 1-3% während Protesten (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "Abgestufter Internetzugang",
          desc: "\"Weiße SIM-Karten\" gewähren Regierungsinsidern uneingeschränkten Zugang (enthüllt Nov 2025)",
        },
      ],
      effectiveness: "Effektivitätsbewertungen",
      whatWorks: "VPNs Die im Iran Noch Verbinden (März 2026)",
      whatWorksText:
        "Nur VPNs mit fortgeschrittener Verschleierung umgehen Irans Protokoll-Whitelist. Standard-WireGuard und -OpenVPN werden innerhalb von Sekunden blockiert. Installieren Sie VOR der Ankunft — VPN-Websites sind im Iran blockiert.",
      vpnEffectiveness: {
        expressvpn: "Lightway-Protokoll mit automatischer Verschleierung",
        surfshark: "Tarnung-Modus + NoBorders für eingeschränkte Netzwerke",
        protonvpn: "Stealth-Protokoll — gute Leistung in unabhängigen Tests",
        vyprvpn: "Chameleon-Protokoll verpackt OpenVPN in Verschleierungsschicht",
      },
      notWorking: "Blockierte Protokolle",
      notWorkingText:
        "Irans DPI verwendet eine strikte Protokoll-Whitelist. Diese werden innerhalb von Sekunden erkannt und blockiert:",
      notWorkingVpns: [
        "Standard-WireGuard (ohne Verschleierung)",
        "Standard-OpenVPN (ohne Verschleierung)",
        "IPVanish",
        "CyberGhost",
        "Die meisten kostenlosen VPNs",
        "Jedes VPN ohne Stealth-/Verschleierungsmodus",
      ],
      keyFeatures: "Was für Iran Wirklich Zählt",
      features: [
        {
          title: "Verschleierung ist Unverzichtbar",
          desc: "Iran whitelistet nur HTTPS — Ihr VPN muss den Verkehr als normales Websurfen tarnen",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "Derzeit die zuverlässigste Protokollkombination — unter 5% Erkennungsrate laut Forschung",
        },
        {
          title: "Mehrere Backup-Optionen",
          desc: "Server werden ständig blockiert — haben Sie 2-3 VPN-Apps mit manuellen Configs installiert",
        },
        {
          title: "No-Logs-Gerichtsbarkeit",
          desc: "Wählen Sie Anbieter in der Schweiz, Panama oder BVI — außerhalb Irans rechtlicher Reichweite",
        },
      ],
      blockedServices: "In Iran Blockierte Dienste",
      blocked: [
        "Telegram — beliebteste Messaging-App, blockiert seit 2018",
        "WhatsApp — blockiert während der Mahsa-Amini-Proteste 2022, Einschränkungen bestehen fort",
        "Instagram — blockiert seit 2022",
        "YouTube — blockiert seit 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — eingeschränkt",
        "Unabhängige Nachrichtenseiten (BBC Persian, Iran International, IranWire)",
      ],
      tips: "Praktische Schritte Vor der Reise in den Iran",
      tipsList: [
        "Installieren Sie VPN-Apps VOR der Einreise in den Iran — alle VPN-Websites und App-Stores sind im Land blockiert",
        "Laden Sie manuelle Verbindungs-Configs (OpenVPN .ovpn-Dateien) als Backup herunter — Apps können ausfallen, aber Configs verbinden oft noch",
        "Aktivieren Sie Verschleierungs-/Stealth-Modus sofort — Irans DPI erkennt Standard-VPN-Verkehr innerhalb von Sekunden",
        "Haben Sie mindestens 2 verschiedene VPN-Anbieter installiert — Server rotieren ständig durch Blockaden",
        "Erwägen Sie VLESS-basierte Tools als Backup (V2Ray, Xray) — diese haben derzeit die niedrigsten Erkennungsraten",
        "Mobile Daten können funktionieren, wenn Heim-WiFi nicht geht — ISP-Blockaden variieren",
      ],
      faqTitle: "Iran VPN FAQ",
      faqs: [
        {
          q: "Ist VPN-Nutzung im Iran legal?",
          a: "Nein. Seit Februar 2024 hat Irans Supreme Council of Cyberspace offiziell die VPN-Nutzung und den Verkauf verboten. Die Regierung verfolgt VPN-Verkäufer aktiv strafrechtlich. Die Durchsetzung gegen einzelne Nutzer konzentriert sich jedoch auf technische Blockierung statt auf rechtliche Verfolgung — die meisten Nutzer erleben Verbindungsabbrüche, keine Verhaftungen.",
        },
        {
          q: "Kann die Regierung VPN-Nutzung erkennen?",
          a: "Ja. Iran betreibt eines der fortschrittlichsten DPI-Systeme der Welt. Es verwendet einen Protokoll-Whitelist-Ansatz: nur DNS-, HTTP- und HTTPS-Verkehr wird weitergeleitet. Standard-VPN-Protokolle (WireGuard, OpenVPN) werden innerhalb von Sekunden erkannt und blockiert. Nur verschleierte Protokolle, die regulären HTTPS-Verkehr imitieren, können dies umgehen.",
        },
        {
          q: "Welches Protokoll funktioniert derzeit am besten im Iran?",
          a: "Anfang 2026 hat VLESS mit TLS + WebSocket + CDN-Routing die niedrigste Erkennungsrate (unter 5% laut veröffentlichter Forschung). Unter den kommerziellen VPNs funktionieren ProtonVPNs Stealth-Protokoll und ExpressVPNs Lightway mit Verschleierung am besten. Standard-WireGuard und -OpenVPN funktionieren ohne Verschleierung nicht.",
        },
        {
          q: "Was geschah im Januar 2026?",
          a: "Ab dem 8. Januar 2026 verhängte Iran während landesweiter Proteste, ausgelöst durch die Wirtschaftskrise, den schwersten Internet-Blackout seiner Geschichte. Die Konnektivität sank auf 1-3% des normalen Niveaus (Cloudflare-Daten). Der Blackout erstreckte sich auf Telefonnetze und Starlink. Irans Kommunikationsminister räumte ein, dass er die Wirtschaft 35,7 Millionen Dollar pro Tag kostete.",
        },
      ],
      getVpn: "VPN holen",
      effectiveness95: "95% Effektiv",
      effectiveness90: "90% Effektiv",
      effectiveness85: "85% Effektiv",
      effectiveness82: "82% Effektiv",
      lastUpdated: "Zuletzt verifiziert: März 2026",
      sources: "Quellen & Referenzen",
    },
    es: {
      badge: "Actualizado marzo 2026",
      title: "Mejor VPN para Irán",
      subtitle: "Evita la censura de Irán y accede a servicios bloqueados — incluso durante apagones de internet",
      legalNotice: "Crítico: Situación de Internet en Irán en 2026",
      legalNoticeText:
        "En febrero de 2024, el Consejo Supremo del Ciberespacio (SCC) de Irán prohibió oficialmente la venta y el uso de VPN. Desde el 8 de enero de 2026, Irán ha impuesto su apagón de internet más severo — la conectividad cayó al 1-3% de los niveles normales (datos de Cloudflare). El régimen también decretó un aumento del 18% en el precio de internet en febrero de 2026. Freedom House califica la libertad de internet de Irán en 11/100 (2025), entre las peores del mundo.",
      legalStatus: "Estado Legal del VPN en Irán (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "Oficialmente Prohibido (Feb 2024)",
          desc: "El SCC emitió una prohibición formal de VPN; la venta de VPN es procesada penalmente",
        },
        {
          icon: "warning",
          title: "DPI + Lista Blanca de Protocolos",
          desc: "Solo DNS, HTTP y HTTPS se reenvían; todo otro tráfico se descarta silenciosamente",
        },
        {
          icon: "x",
          title: "Apagones Totales",
          desc: "Ene 2026: la conectividad cayó al 1-3% durante protestas (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "Acceso a Internet por Niveles",
          desc: "\"SIM blancas\" dan a funcionarios del gobierno acceso sin restricciones (expuesto nov 2025)",
        },
      ],
      effectiveness: "Calificaciones de Efectividad",
      whatWorks: "VPNs Que Aún Conectan en Irán (Marzo 2026)",
      whatWorksText:
        "Solo los VPN con ofuscación avanzada evitan la lista blanca de protocolos de Irán. WireGuard y OpenVPN estándar se bloquean en segundos. Instale ANTES de llegar — los sitios web de VPN están bloqueados dentro de Irán.",
      vpnEffectiveness: {
        expressvpn: "Protocolo Lightway con ofuscación automática",
        surfshark: "Modo Camuflaje + NoBorders para redes restringidas",
        protonvpn: "Protocolo Stealth — buen rendimiento en pruebas independientes",
        vyprvpn: "Protocolo Chameleon envuelve OpenVPN en capa de ofuscación",
      },
      notWorking: "Protocolos Bloqueados",
      notWorkingText:
        "El DPI de Irán usa una lista blanca estricta de protocolos. Estos son detectados y bloqueados en segundos:",
      notWorkingVpns: [
        "WireGuard estándar (sin ofuscación)",
        "OpenVPN estándar (sin ofuscación)",
        "IPVanish",
        "CyberGhost",
        "La mayoría de VPNs gratuitos",
        "Cualquier VPN sin modo stealth/ofuscación",
      ],
      keyFeatures: "Lo Que Realmente Importa para Irán",
      features: [
        {
          title: "La Ofuscación es Innegociable",
          desc: "Irán solo permite HTTPS — tu VPN debe disfrazar el tráfico como navegación web normal",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "Actualmente la combinación de protocolos más fiable — menos del 5% de tasa de detección según investigaciones",
        },
        {
          title: "Múltiples Opciones de Respaldo",
          desc: "Los servidores se bloquean constantemente — ten 2-3 apps VPN instaladas con configs manuales",
        },
        {
          title: "Jurisdicción Sin Registros",
          desc: "Elige proveedores en Suiza, Panamá o BVI — fuera del alcance legal de Irán",
        },
      ],
      blockedServices: "Servicios Bloqueados en Irán",
      blocked: [
        "Telegram — app de mensajería más usada, bloqueada desde 2018",
        "WhatsApp — bloqueado durante protestas Mahsa Amini 2022, restricciones continúan",
        "Instagram — bloqueado desde 2022",
        "YouTube — bloqueado desde 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — restringido",
        "Sitios de noticias independientes (BBC Persian, Iran International, IranWire)",
      ],
      tips: "Pasos Prácticos Antes de Viajar a Irán",
      tipsList: [
        "Instale apps VPN ANTES de entrar a Irán — todos los sitios web de VPN y tiendas de apps están bloqueados dentro del país",
        "Descargue configs de conexión manual (archivos OpenVPN .ovpn) como respaldo — las apps pueden dejar de funcionar pero los configs a menudo aún conectan",
        "Active el modo ofuscación/stealth inmediatamente — el DPI de Irán detecta tráfico VPN estándar en segundos",
        "Tenga al menos 2 proveedores VPN diferentes instalados — los servidores rotan constantemente por bloqueos",
        "Considere herramientas basadas en VLESS como respaldo (V2Ray, Xray) — actualmente tienen las tasas de detección más bajas",
        "Los datos móviles pueden funcionar cuando el WiFi del hogar no — los bloqueos por ISP varían",
      ],
      faqTitle: "FAQ VPN Irán",
      faqs: [
        {
          q: "¿Son legales los VPN en Irán?",
          a: "No. Desde febrero de 2024, el Consejo Supremo del Ciberespacio de Irán prohibió oficialmente el uso y la venta de VPN. El gobierno procesa activamente a los vendedores de VPN. Sin embargo, la aplicación contra usuarios individuales se centra en el bloqueo técnico más que en la persecución legal — la mayoría de los usuarios experimentan caídas de conexión, no arrestos.",
        },
        {
          q: "¿Puede el gobierno detectar el uso de VPN?",
          a: "Sí. Irán opera uno de los sistemas DPI más avanzados del mundo. Usa un enfoque de lista blanca de protocolos: solo el tráfico DNS, HTTP y HTTPS se reenvía. Los protocolos VPN estándar (WireGuard, OpenVPN) se detectan y bloquean en segundos. Solo los protocolos ofuscados que imitan tráfico HTTPS regular pueden evitar esto.",
        },
        {
          q: "¿Qué protocolo funciona mejor en Irán ahora mismo?",
          a: "A principios de 2026, VLESS con TLS + WebSocket + enrutamiento CDN tiene la tasa de detección más baja (menos del 5% según investigación publicada). Entre los VPN comerciales, el protocolo Stealth de ProtonVPN y Lightway de ExpressVPN con ofuscación funcionan mejor. WireGuard y OpenVPN estándar no funcionan sin ofuscación.",
        },
        {
          q: "¿Qué pasó en enero de 2026?",
          a: "A partir del 8 de enero de 2026, durante protestas nacionales provocadas por la crisis económica, Irán impuso el apagón de internet más severo de su historia. La conectividad cayó al 1-3% de los niveles normales (datos de Cloudflare). El apagón se extendió a redes telefónicas y Starlink. El Ministro de Comunicaciones de Irán reconoció que costó a la economía 35,7 millones de dólares por día.",
        },
      ],
      getVpn: "Obtener VPN",
      effectiveness95: "95% Efectivo",
      effectiveness90: "90% Efectivo",
      effectiveness85: "85% Efectivo",
      effectiveness82: "82% Efectivo",
      lastUpdated: "Última verificación: marzo 2026",
      sources: "Fuentes y Referencias",
    },
    fr: {
      badge: "Mis à jour mars 2026",
      title: "Meilleur VPN pour l'Iran",
      subtitle: "Contournez la censure iranienne et accédez aux services bloqués — même pendant les coupures internet",
      legalNotice: "Critique : Situation Internet en Iran en 2026",
      legalNoticeText:
        "En février 2024, le Conseil Suprême du Cyberespace (SCC) iranien a officiellement interdit la vente et l'utilisation de VPN. Depuis le 8 janvier 2026, l'Iran a imposé sa coupure internet la plus sévère — la connectivité est tombée à 1-3% des niveaux normaux (données Cloudflare). Le régime a également décrété une augmentation de 18% du prix d'internet en février 2026. Freedom House évalue la liberté internet de l'Iran à 11/100 (2025), parmi les pires au monde.",
      legalStatus: "Statut Légal du VPN en Iran (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "Officiellement Interdit (Fév 2024)",
          desc: "Le SCC a émis une interdiction formelle des VPN ; la vente de VPN est poursuivie pénalement",
        },
        {
          icon: "warning",
          title: "DPI + Liste Blanche de Protocoles",
          desc: "Seuls DNS, HTTP et HTTPS sont transmis ; tout autre trafic est silencieusement abandonné",
        },
        {
          icon: "x",
          title: "Coupures Totales",
          desc: "Jan 2026 : connectivité tombée à 1-3% pendant les manifestations (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "Accès Internet à Plusieurs Niveaux",
          desc: "Les \"SIM blanches\" donnent aux initiés du gouvernement un accès illimité (révélé nov 2025)",
        },
      ],
      effectiveness: "Évaluations d'Efficacité",
      whatWorks: "VPN Qui Se Connectent Encore en Iran (Mars 2026)",
      whatWorksText:
        "Seuls les VPN avec une obscurcissement avancée contournent la liste blanche de protocoles de l'Iran. WireGuard et OpenVPN standards sont bloqués en quelques secondes. Installez AVANT d'arriver — les sites web VPN sont bloqués en Iran.",
      vpnEffectiveness: {
        expressvpn: "Protocole Lightway avec obscurcissement automatique",
        surfshark: "Mode Camouflage + NoBorders pour réseaux restreints",
        protonvpn: "Protocole Stealth — bonnes performances dans les tests indépendants",
        vyprvpn: "Protocole Chameleon enveloppe OpenVPN dans une couche d'obscurcissement",
      },
      notWorking: "Protocoles Bloqués",
      notWorkingText:
        "Le DPI iranien utilise une liste blanche stricte de protocoles. Ceux-ci sont détectés et bloqués en quelques secondes :",
      notWorkingVpns: [
        "WireGuard standard (sans obscurcissement)",
        "OpenVPN standard (sans obscurcissement)",
        "IPVanish",
        "CyberGhost",
        "La plupart des VPN gratuits",
        "Tout VPN sans mode stealth/obscurcissement",
      ],
      keyFeatures: "Ce Qui Compte Vraiment pour l'Iran",
      features: [
        {
          title: "L'Obscurcissement est Non-Négociable",
          desc: "L'Iran n'autorise que HTTPS — votre VPN doit déguiser le trafic en navigation web normale",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "Actuellement la combinaison de protocoles la plus fiable — moins de 5% de taux de détection selon les recherches",
        },
        {
          title: "Plusieurs Options de Secours",
          desc: "Les serveurs sont constamment bloqués — ayez 2-3 apps VPN installées avec des configs manuelles",
        },
        {
          title: "Juridiction Sans Logs",
          desc: "Choisissez des fournisseurs en Suisse, au Panama ou aux BVI — hors de portée juridique de l'Iran",
        },
      ],
      blockedServices: "Services Bloqués en Iran",
      blocked: [
        "Telegram — app de messagerie la plus utilisée, bloquée depuis 2018",
        "WhatsApp — bloqué pendant les manifestations Mahsa Amini 2022, restrictions maintenues",
        "Instagram — bloqué depuis 2022",
        "YouTube — bloqué depuis 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — restreint",
        "Sites d'actualités indépendants (BBC Persian, Iran International, IranWire)",
      ],
      tips: "Étapes Pratiques Avant de Voyager en Iran",
      tipsList: [
        "Installez les apps VPN AVANT d'entrer en Iran — tous les sites web VPN et boutiques d'apps sont bloqués dans le pays",
        "Téléchargez des configs de connexion manuelles (fichiers OpenVPN .ovpn) en secours — les apps peuvent cesser de fonctionner mais les configs se connectent souvent encore",
        "Activez le mode obscurcissement/furtif immédiatement — le DPI iranien détecte le trafic VPN standard en quelques secondes",
        "Ayez au moins 2 fournisseurs VPN différents installés — les serveurs tournent constamment à travers les blocages",
        "Envisagez des outils basés sur VLESS en secours (V2Ray, Xray) — ceux-ci ont actuellement les taux de détection les plus bas",
        "Les données mobiles peuvent fonctionner quand le WiFi domestique ne fonctionne pas — les blocages par FAI varient",
      ],
      faqTitle: "FAQ VPN Iran",
      faqs: [
        {
          q: "Les VPN sont-ils légaux en Iran ?",
          a: "Non. Depuis février 2024, le Conseil Suprême du Cyberespace iranien a officiellement interdit l'utilisation et la vente de VPN. Le gouvernement poursuit activement les vendeurs de VPN. Cependant, l'application contre les utilisateurs individuels se concentre sur le blocage technique plutôt que sur les poursuites judiciaires — la plupart des utilisateurs subissent des coupures de connexion, pas des arrestations.",
        },
        {
          q: "Le gouvernement peut-il détecter l'utilisation d'un VPN ?",
          a: "Oui. L'Iran exploite l'un des systèmes DPI les plus avancés au monde. Il utilise une approche de liste blanche de protocoles : seul le trafic DNS, HTTP et HTTPS est transmis. Les protocoles VPN standards (WireGuard, OpenVPN) sont détectés et bloqués en quelques secondes. Seuls les protocoles obscurcis imitant le trafic HTTPS régulier peuvent contourner cela.",
        },
        {
          q: "Quel protocole fonctionne le mieux en Iran actuellement ?",
          a: "Début 2026, VLESS avec TLS + WebSocket + routage CDN a le taux de détection le plus bas (moins de 5% selon les recherches publiées). Parmi les VPN commerciaux, le protocole Stealth de ProtonVPN et Lightway d'ExpressVPN avec obscurcissement fonctionnent le mieux. WireGuard et OpenVPN standards ne fonctionnent pas sans obscurcissement.",
        },
        {
          q: "Que s'est-il passé en janvier 2026 ?",
          a: "À partir du 8 janvier 2026, lors de manifestations nationales déclenchées par la crise économique, l'Iran a imposé la coupure internet la plus sévère de son histoire. La connectivité est tombée à 1-3% des niveaux normaux (données Cloudflare). La coupure s'est étendue aux réseaux téléphoniques et à Starlink. Le ministre iranien des Communications a reconnu que cela coûtait 35,7 millions de dollars par jour à l'économie.",
        },
      ],
      getVpn: "Obtenir VPN",
      effectiveness95: "95% Efficace",
      effectiveness90: "90% Efficace",
      effectiveness85: "85% Efficace",
      effectiveness82: "82% Efficace",
      lastUpdated: "Dernière vérification : mars 2026",
      sources: "Sources & Références",
    },
    zh: {
      badge: "2026年3月更新",
      title: "伊朗最佳VPN",
      subtitle: "绕过伊朗的审查制度，访问被封锁的服务——即使在互联网关闭期间",
      legalNotice: "关键：2026年伊朗互联网状况",
      legalNoticeText:
        "2024年2月，伊朗最高网络空间委员会（SCC）正式禁止VPN销售和使用。自2026年1月8日起，伊朗实施了有史以来最严重的互联网封锁——连接率降至正常水平的1-3%（Cloudflare数据）。该政权还在2026年2月实施了18%的互联网价格上涨。Freedom House将伊朗的互联网自由度评为11/100（2025年），属全球最差之列。",
      legalStatus: "伊朗VPN法律地位（2026）",
      legalPoints: [
        {
          icon: "x",
          title: "正式禁止（2024年2月）",
          desc: "SCC发布正式VPN禁令；销售VPN将被起诉",
        },
        {
          icon: "warning",
          title: "DPI + 协议白名单",
          desc: "仅DNS、HTTP和HTTPS被转发；所有其他流量被静默丢弃",
        },
        {
          icon: "x",
          title: "全面断网",
          desc: "2026年1月：抗议期间连接率降至1-3%（Cloudflare、NetBlocks）",
        },
        {
          icon: "eye",
          title: "分级互联网访问",
          desc: "\"白色SIM卡\"为政府内部人员提供不受限制的访问（2025年11月曝光）",
        },
      ],
      effectiveness: "有效性评级",
      whatWorks: "在伊朗仍能连接的VPN（2026年3月）",
      whatWorksText:
        "只有具备高级混淆功能的VPN才能绕过伊朗的协议白名单。标准WireGuard和OpenVPN在几秒内即被封锁。请在抵达前安装——VPN网站在伊朗境内被封锁。",
      vpnEffectiveness: {
        expressvpn: "Lightway协议带自动混淆",
        surfshark: "伪装模式 + NoBorders适用于受限网络",
        protonvpn: "Stealth协议——在独立测试中表现良好",
        vyprvpn: "Chameleon协议将OpenVPN包裹在混淆层中",
      },
      notWorking: "被封锁的协议",
      notWorkingText:
        "伊朗的DPI使用严格的协议白名单。以下协议在几秒内被检测和封锁：",
      notWorkingVpns: [
        "标准WireGuard（无混淆）",
        "标准OpenVPN（无混淆）",
        "IPVanish",
        "CyberGhost",
        "大多数免费VPN",
        "任何没有隐身/混淆模式的VPN",
      ],
      keyFeatures: "伊朗真正重要的功能",
      features: [
        {
          title: "混淆不可或缺",
          desc: "伊朗仅白名单HTTPS——你的VPN必须将流量伪装成正常网页浏览",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "目前最可靠的协议组合——据研究检测率低于5%",
        },
        {
          title: "多个备用选项",
          desc: "服务器不断被封锁——安装2-3个VPN应用并配备手动配置",
        },
        {
          title: "无日志管辖区",
          desc: "选择位于瑞士、巴拿马或BVI的提供商——在伊朗法律管辖范围之外",
        },
      ],
      blockedServices: "伊朗被封锁的服务",
      blocked: [
        "Telegram——最常用的消息应用，自2018年起被封锁",
        "WhatsApp——2022年Mahsa Amini抗议期间被封锁，限制持续",
        "Instagram——自2022年起被封锁",
        "YouTube——自2009年起被封锁",
        "TikTok",
        "X (Twitter)、Facebook",
        "Google Play Store——受限",
        "独立新闻网站（BBC波斯语、Iran International、IranWire）",
      ],
      tips: "前往伊朗前的实际步骤",
      tipsList: [
        "在进入伊朗前安装VPN应用——所有VPN网站和应用商店在国内被封锁",
        "下载手动连接配置（OpenVPN .ovpn文件）作为备份——应用可能停止工作但配置通常仍能连接",
        "立即启用混淆/隐身模式——伊朗的DPI在几秒内检测标准VPN流量",
        "至少安装2个不同的VPN提供商——服务器不断轮换被封锁",
        "考虑基于VLESS的工具作为备份（V2Ray、Xray）——目前检测率最低",
        "移动数据在家庭WiFi不可用时可能有效——ISP级别的封锁各有不同",
      ],
      faqTitle: "伊朗VPN常见问题",
      faqs: [
        {
          q: "在伊朗使用VPN合法吗？",
          a: "不合法。自2024年2月起，伊朗最高网络空间委员会正式禁止VPN使用和销售。政府积极起诉VPN销售者。但对个人用户的执法侧重于技术封锁而非法律起诉——大多数用户经历的是连接中断，而非逮捕。",
        },
        {
          q: "政府能检测到VPN使用吗？",
          a: "能。伊朗运营着世界上最先进的DPI系统之一。它使用协议白名单方式：只有DNS、HTTP和HTTPS流量被转发。标准VPN协议（WireGuard、OpenVPN）在几秒内被检测和封锁。只有模仿常规HTTPS流量的混淆协议才能绕过。",
        },
        {
          q: "目前哪种协议在伊朗最有效？",
          a: "截至2026年初，VLESS配合TLS + WebSocket + CDN路由的检测率最低（据已发表研究低于5%）。在商业VPN中，ProtonVPN的Stealth协议和ExpressVPN的Lightway混淆模式表现最佳。标准WireGuard和OpenVPN在没有混淆的情况下无法工作。",
        },
        {
          q: "2026年1月发生了什么？",
          a: "自2026年1月8日起，在经济危机引发的全国性抗议期间，伊朗实施了历史上最严重的互联网封锁。连接率降至正常水平的1-3%（Cloudflare数据）。断网扩展到电话网络和Starlink。伊朗通信部长承认这每天给经济造成3570万美元的损失。",
        },
      ],
      getVpn: "获取VPN",
      effectiveness95: "95%有效",
      effectiveness90: "90%有效",
      effectiveness85: "85%有效",
      effectiveness82: "82%有效",
      lastUpdated: "最后验证：2026年3月",
      sources: "来源与参考资料",
    },
    ja: {
      badge: "2026年3月更新",
      title: "イラン最適なVPN",
      subtitle: "イランの検閲を回避し、ブロックされたサービスにアクセス——インターネット遮断中でも",
      legalNotice: "重要：2026年イランのインターネット状況",
      legalNoticeText:
        "2024年2月、イランの最高サイバースペース評議会（SCC）がVPNの販売と使用を正式に禁止しました。2026年1月8日以降、イランは過去最も深刻なインターネット遮断を実施——接続率は通常の1-3%にまで低下（Cloudflareデータ）。政権は2026年2月にインターネット料金を18%値上げしました。Freedom Houseはイランのインターネット自由度を11/100（2025年）と評価し、世界最悪レベルです。",
      legalStatus: "イランにおけるVPNの法的地位（2026年）",
      legalPoints: [
        {
          icon: "x",
          title: "正式に禁止（2024年2月）",
          desc: "SCCがVPN禁止令を発布；VPN販売は刑事訴追される",
        },
        {
          icon: "warning",
          title: "DPI + プロトコルホワイトリスト",
          desc: "DNS、HTTP、HTTPSのみが転送され、その他のトラフィックはすべて静かに遮断される",
        },
        {
          icon: "x",
          title: "完全遮断の発生",
          desc: "2026年1月：抗議活動中に接続率が1-3%に低下（Cloudflare、NetBlocks）",
        },
        {
          icon: "eye",
          title: "段階的インターネットアクセス",
          desc: "「ホワイトSIMカード」で政府関係者が無制限アクセスを取得（2025年11月に暴露）",
        },
      ],
      effectiveness: "有効性評価",
      whatWorks: "イランでまだ接続できるVPN（2026年3月）",
      whatWorksText:
        "高度な難読化を備えたVPNのみがイランのプロトコルホワイトリストを回避できます。標準のWireGuardとOpenVPNは数秒でブロックされます。到着前にインストールしてください——VPNウェブサイトはイラン国内でブロックされています。",
      vpnEffectiveness: {
        expressvpn: "Lightwayプロトコル、自動難読化付き",
        surfshark: "カモフラージュモード + NoBorders（制限ネットワーク向け）",
        protonvpn: "ステルスプロトコル——独立テストで良好な成績",
        vyprvpn: "ChameleonプロトコルがOpenVPNを難読化レイヤーで包装",
      },
      notWorking: "ブロックされているプロトコル",
      notWorkingText:
        "イランのDPIは厳格なプロトコルホワイトリストを使用しています。以下は数秒で検出・ブロックされます：",
      notWorkingVpns: [
        "標準WireGuard（難読化なし）",
        "標準OpenVPN（難読化なし）",
        "IPVanish",
        "CyberGhost",
        "ほとんどの無料VPN",
        "ステルス/難読化モードのないVPN",
      ],
      keyFeatures: "イランで本当に重要なこと",
      features: [
        {
          title: "難読化は必須",
          desc: "イランはHTTPSのみをホワイトリスト化——VPNは通常のウェブ閲覧に偽装する必要がある",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "現在最も信頼性の高いプロトコルの組み合わせ——研究によると検出率5%未満",
        },
        {
          title: "複数のバックアップオプション",
          desc: "サーバーは常にブロックされる——手動設定を含む2-3個のVPNアプリをインストール",
        },
        {
          title: "ノーログ管轄区域",
          desc: "スイス、パナマ、BVIのプロバイダーを選択——イランの法的管轄外",
        },
      ],
      blockedServices: "イランでブロックされているサービス",
      blocked: [
        "Telegram——最も使われているメッセージアプリ、2018年からブロック",
        "WhatsApp——2022年マフサ・アミニ抗議中にブロック、制限継続",
        "Instagram——2022年からブロック",
        "YouTube——2009年からブロック",
        "TikTok",
        "X (Twitter)、Facebook",
        "Google Play Store——制限あり",
        "独立系ニュースサイト（BBCペルシャ語、Iran International、IranWire）",
      ],
      tips: "イラン渡航前の実践的ステップ",
      tipsList: [
        "イラン入国前にVPNアプリをインストール——すべてのVPNウェブサイトとアプリストアは国内でブロックされています",
        "手動接続設定（OpenVPN .ovpnファイル）をバックアップとしてダウンロード——アプリが動作しなくなっても設定ファイルでは接続できることが多い",
        "難読化/ステルスモードを直ちに有効にする——イランのDPIは標準VPNトラフィックを数秒で検出",
        "少なくとも2つの異なるVPNプロバイダーをインストール——サーバーは絶えずブロックをローテーション",
        "バックアップとしてVLESSベースのツール（V2Ray、Xray）を検討——現在最も低い検出率",
        "自宅WiFiが使えない時はモバイルデータが機能することも——ISPレベルのブロックは異なる",
      ],
      faqTitle: "イランVPN FAQ",
      faqs: [
        {
          q: "イランでVPN使用は合法ですか？",
          a: "いいえ。2024年2月以降、イランの最高サイバースペース評議会が正式にVPNの使用と販売を禁止しました。政府はVPN販売者を積極的に刑事訴追しています。ただし、個人ユーザーへの執行は法的訴追よりも技術的ブロックに重点を置いており、ほとんどのユーザーは逮捕ではなく接続の切断を経験しています。",
        },
        {
          q: "政府はVPN使用を検出できますか？",
          a: "はい。イランは世界で最も高度なDPIシステムの1つを運用しています。プロトコルホワイトリスト方式を使用：DNS、HTTP、HTTPSトラフィックのみが転送されます。標準VPNプロトコル（WireGuard、OpenVPN）は数秒で検出・ブロックされます。通常のHTTPSトラフィックを模倣する難読化プロトコルのみが回避できます。",
        },
        {
          q: "現在イランで最も効果的なプロトコルは？",
          a: "2026年初頭時点で、VLESS + TLS + WebSocket + CDNルーティングが最も低い検出率（発表された研究によると5%未満）を示しています。商用VPNでは、ProtonVPNのステルスプロトコルとExpressVPNの難読化付きLightwayが最良の成績です。標準のWireGuardとOpenVPNは難読化なしでは機能しません。",
        },
        {
          q: "2026年1月に何が起きましたか？",
          a: "2026年1月8日から、経済危機に端を発した全国的な抗議活動中に、イランは歴史上最も深刻なインターネット遮断を実施しました。接続率は通常の1-3%にまで低下（Cloudflareデータ）。遮断は電話ネットワークとStarlinkにも及びました。イランの通信大臣は、経済に1日あたり3570万ドルの損害を与えたことを認めました。",
        },
      ],
      getVpn: "VPNを入手",
      effectiveness95: "95%有効",
      effectiveness90: "90%有効",
      effectiveness85: "85%有効",
      effectiveness82: "82%有効",
      lastUpdated: "最終検証：2026年3月",
      sources: "出典・参考資料",
    },
    ko: {
      badge: "2026년 3월 업데이트",
      title: "이란 최고의 VPN",
      subtitle: "이란의 검열을 우회하고 차단된 서비스에 액세스 — 인터넷 차단 중에도",
      legalNotice: "중요: 2026년 이란 인터넷 상황",
      legalNoticeText:
        "2024년 2월, 이란 최고사이버공간위원회(SCC)가 공식적으로 VPN 판매 및 사용을 금지했습니다. 2026년 1월 8일부터 이란은 역대 가장 심각한 인터넷 차단을 시행했습니다 — 연결률이 정상 수준의 1-3%로 떨어졌습니다 (Cloudflare 데이터). 정권은 2026년 2월에 인터넷 가격을 18% 인상했습니다. Freedom House는 이란의 인터넷 자유도를 11/100 (2025년)으로 평가하며, 세계 최악 수준입니다.",
      legalStatus: "이란 VPN 법적 지위 (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "공식 금지 (2024년 2월)",
          desc: "SCC가 공식 VPN 금지령을 발령; VPN 판매는 기소됨",
        },
        {
          icon: "warning",
          title: "DPI + 프로토콜 화이트리스트",
          desc: "DNS, HTTP, HTTPS만 전달됨; 다른 모든 트래픽은 자동 차단",
        },
        {
          icon: "x",
          title: "전면 차단 발생",
          desc: "2026년 1월: 시위 중 연결률 1-3%로 하락 (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "차등 인터넷 접근",
          desc: "\"화이트 SIM 카드\"로 정부 내부자들이 무제한 접근 (2025년 11월 폭로)",
        },
      ],
      effectiveness: "효과성 평가",
      whatWorks: "이란에서 아직 연결되는 VPN (2026년 3월)",
      whatWorksText:
        "고급 난독화를 갖춘 VPN만이 이란의 프로토콜 화이트리스트를 우회합니다. 표준 WireGuard와 OpenVPN은 몇 초 안에 차단됩니다. 도착 전에 설치하세요 — VPN 웹사이트는 이란 내에서 차단됩니다.",
      vpnEffectiveness: {
        expressvpn: "자동 난독화가 포함된 Lightway 프로토콜",
        surfshark: "위장 모드 + NoBorders (제한 네트워크용)",
        protonvpn: "스텔스 프로토콜 — 독립 테스트에서 우수한 성능",
        vyprvpn: "Chameleon 프로토콜이 OpenVPN을 난독화 레이어로 감싸",
      },
      notWorking: "차단된 프로토콜",
      notWorkingText:
        "이란의 DPI는 엄격한 프로토콜 화이트리스트를 사용합니다. 다음은 몇 초 내에 탐지 및 차단됩니다:",
      notWorkingVpns: [
        "표준 WireGuard (난독화 없음)",
        "표준 OpenVPN (난독화 없음)",
        "IPVanish",
        "CyberGhost",
        "대부분의 무료 VPN",
        "스텔스/난독화 모드가 없는 모든 VPN",
      ],
      keyFeatures: "이란에서 정말 중요한 것",
      features: [
        {
          title: "난독화는 필수",
          desc: "이란은 HTTPS만 화이트리스트 — VPN은 트래픽을 일반 웹 브라우징으로 위장해야 함",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "현재 가장 신뢰할 수 있는 프로토콜 조합 — 연구에 따르면 5% 미만의 탐지율",
        },
        {
          title: "다중 백업 옵션",
          desc: "서버가 끊임없이 차단됨 — 수동 설정이 포함된 2-3개의 VPN 앱 설치",
        },
        {
          title: "무로그 관할권",
          desc: "스위스, 파나마 또는 BVI 기반 제공업체 선택 — 이란의 법적 관할 밖",
        },
      ],
      blockedServices: "이란에서 차단된 서비스",
      blocked: [
        "Telegram — 가장 많이 사용되는 메시징 앱, 2018년부터 차단",
        "WhatsApp — 2022년 마흐사 아미니 시위 중 차단, 제한 지속",
        "Instagram — 2022년부터 차단",
        "YouTube — 2009년부터 차단",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — 제한됨",
        "독립 뉴스 사이트 (BBC 페르시아어, Iran International, IranWire)",
      ],
      tips: "이란 여행 전 실질적인 준비 단계",
      tipsList: [
        "이란 입국 전에 VPN 앱 설치 — 모든 VPN 웹사이트와 앱 스토어가 국내에서 차단됩니다",
        "수동 연결 설정 (OpenVPN .ovpn 파일)을 백업으로 다운로드 — 앱이 작동을 멈출 수 있지만 설정 파일은 종종 연결됩니다",
        "난독화/스텔스 모드를 즉시 활성화 — 이란의 DPI는 표준 VPN 트래픽을 몇 초 만에 감지",
        "최소 2개의 다른 VPN 제공업체를 설치 — 서버는 끊임없이 차단을 순환",
        "백업으로 VLESS 기반 도구 (V2Ray, Xray) 고려 — 현재 가장 낮은 탐지율",
        "가정 WiFi가 안 될 때 모바일 데이터가 작동할 수 있음 — ISP 수준 차단이 다름",
      ],
      faqTitle: "이란 VPN FAQ",
      faqs: [
        {
          q: "이란에서 VPN은 합법인가요?",
          a: "아닙니다. 2024년 2월부터 이란 최고사이버공간위원회가 공식적으로 VPN 사용 및 판매를 금지했습니다. 정부는 VPN 판매자를 적극적으로 기소합니다. 다만 개인 사용자에 대한 집행은 법적 기소보다 기술적 차단에 중점을 둡니다 — 대부분의 사용자는 체포가 아닌 연결 끊김을 경험합니다.",
        },
        {
          q: "정부가 VPN 사용을 탐지할 수 있나요?",
          a: "예. 이란은 세계에서 가장 발전된 DPI 시스템 중 하나를 운영합니다. 프로토콜 화이트리스트 방식을 사용합니다: DNS, HTTP, HTTPS 트래픽만 전달됩니다. 표준 VPN 프로토콜 (WireGuard, OpenVPN)은 몇 초 내에 탐지되어 차단됩니다. 일반 HTTPS 트래픽을 모방하는 난독화 프로토콜만 이를 우회할 수 있습니다.",
        },
        {
          q: "현재 이란에서 어떤 프로토콜이 가장 잘 작동하나요?",
          a: "2026년 초 기준, VLESS + TLS + WebSocket + CDN 라우팅이 가장 낮은 탐지율을 보입니다 (발표된 연구에 따르면 5% 미만). 상용 VPN 중에서는 ProtonVPN의 스텔스 프로토콜과 ExpressVPN의 난독화 포함 Lightway가 가장 우수합니다. 표준 WireGuard와 OpenVPN은 난독화 없이 작동하지 않습니다.",
        },
        {
          q: "2026년 1월에 무슨 일이 있었나요?",
          a: "2026년 1월 8일부터 경제 위기로 촉발된 전국적 시위 중 이란은 역사상 가장 심각한 인터넷 차단을 시행했습니다. 연결률이 정상의 1-3%로 떨어졌습니다 (Cloudflare 데이터). 차단은 전화 네트워크와 Starlink까지 확대되었습니다. 이란 통신부 장관은 이것이 경제에 하루 3,570만 달러의 비용을 초래했다고 인정했습니다.",
        },
      ],
      getVpn: "VPN 받기",
      effectiveness95: "95% 효과적",
      effectiveness90: "90% 효과적",
      effectiveness85: "85% 효과적",
      effectiveness82: "82% 효과적",
      lastUpdated: "마지막 검증: 2026년 3월",
      sources: "출처 및 참고자료",
    },
    th: {
      badge: "อัปเดตเมื่อมีนาคม 2026",
      title: "VPN ที่ดีที่สุดสำหรับอิหร่าน",
      subtitle: "หลีกเลี่ยงการเซ็นเซอร์ของอิหร่านและเข้าถึงบริการที่ถูกบล็อก — แม้ในช่วงอินเทอร์เน็ตถูกตัด",
      legalNotice: "สำคัญ: สถานการณ์อินเทอร์เน็ตอิหร่านในปี 2026",
      legalNoticeText:
        "ในเดือนกุมภาพันธ์ 2024 สภาสูงสุดด้านไซเบอร์สเปซ (SCC) ของอิหร่านได้สั่งห้ามการขายและใช้ VPN อย่างเป็นทางการ ตั้งแต่วันที่ 8 มกราคม 2026 อิหร่านได้ดำเนินการตัดอินเทอร์เน็ตรุนแรงที่สุด — การเชื่อมต่อลดลงเหลือ 1-3% ของระดับปกติ (ข้อมูล Cloudflare) รัฐบาลยังขึ้นราคาอินเทอร์เน็ต 18% ในเดือนกุมภาพันธ์ 2026 Freedom House ให้คะแนนเสรีภาพอินเทอร์เน็ตของอิหร่านที่ 11/100 (2025) ซึ่งเป็นหนึ่งในระดับที่แย่ที่สุดในโลก",
      legalStatus: "สถานะทางกฎหมายของ VPN ในอิหร่าน (2026)",
      legalPoints: [
        {
          icon: "x",
          title: "ถูกห้ามอย่างเป็นทางการ (ก.พ. 2024)",
          desc: "SCC ออกคำสั่งห้าม VPN อย่างเป็นทางการ; การขาย VPN ถูกดำเนินคดี",
        },
        {
          icon: "warning",
          title: "DPI + รายการโปรโตคอลที่อนุญาต",
          desc: "เฉพาะ DNS, HTTP และ HTTPS เท่านั้นที่ถูกส่งต่อ; การเข้าชมอื่นทั้งหมดถูกตัดโดยไม่แจ้ง",
        },
        {
          icon: "x",
          title: "การตัดอินเทอร์เน็ตทั้งหมด",
          desc: "ม.ค. 2026: การเชื่อมต่อลดลงเหลือ 1-3% ระหว่างการประท้วง (Cloudflare, NetBlocks)",
        },
        {
          icon: "eye",
          title: "การเข้าถึงอินเทอร์เน็ตแบบแบ่งระดับ",
          desc: "\"ซิมการ์ดสีขาว\" ให้ผู้มีอำนาจในรัฐบาลเข้าถึงแบบไม่จำกัด (เปิดเผย พ.ย. 2025)",
        },
      ],
      effectiveness: "คะแนนประสิทธิภาพ",
      whatWorks: "VPN ที่ยังเชื่อมต่อได้ในอิหร่าน (มีนาคม 2026)",
      whatWorksText:
        "เฉพาะ VPN ที่มีการปิดบังขั้นสูงเท่านั้นที่สามารถผ่านรายการโปรโตคอลที่อนุญาตของอิหร่าน WireGuard และ OpenVPN มาตรฐานถูกบล็อกภายในไม่กี่วินาที ติดตั้งก่อนเดินทาง — เว็บไซต์ VPN ถูกบล็อกภายในอิหร่าน",
      vpnEffectiveness: {
        expressvpn: "โปรโตคอล Lightway พร้อมการปิดบังอัตโนมัติ",
        surfshark: "โหมดพรางตัว + NoBorders สำหรับเครือข่ายที่ถูกจำกัด",
        protonvpn: "โปรโตคอลซ่อนตัว — ผลดีในการทดสอบอิสระ",
        vyprvpn: "โปรโตคอล Chameleon ห่อ OpenVPN ในชั้นการปิดบัง",
      },
      notWorking: "โปรโตคอลที่ถูกบล็อก",
      notWorkingText:
        "DPI ของอิหร่านใช้รายการโปรโตคอลที่อนุญาตอย่างเข้มงวด สิ่งเหล่านี้ถูกตรวจจับและบล็อกภายในไม่กี่วินาที:",
      notWorkingVpns: [
        "WireGuard มาตรฐาน (ไม่มีการปิดบัง)",
        "OpenVPN มาตรฐาน (ไม่มีการปิดบัง)",
        "IPVanish",
        "CyberGhost",
        "VPN ฟรีส่วนใหญ่",
        "VPN ใดก็ตามที่ไม่มีโหมดซ่อนตัว/ปิดบัง",
      ],
      keyFeatures: "สิ่งที่สำคัญจริงๆ สำหรับอิหร่าน",
      features: [
        {
          title: "การปิดบังเป็นสิ่งจำเป็น",
          desc: "อิหร่านอนุญาตเฉพาะ HTTPS — VPN ของคุณต้องปลอมแปลงการเข้าชมเป็นการท่องเว็บปกติ",
        },
        {
          title: "VLESS + TLS + CDN",
          desc: "การผสมโปรโตคอลที่เชื่อถือได้มากที่สุดในปัจจุบัน — อัตราการตรวจจับต่ำกว่า 5% ตามการวิจัย",
        },
        {
          title: "ตัวเลือกสำรองหลายตัว",
          desc: "เซิร์ฟเวอร์ถูกบล็อกอย่างต่อเนื่อง — ติดตั้ง 2-3 แอพ VPN พร้อมการกำหนดค่าด้วยตนเอง",
        },
        {
          title: "เขตอำนาจศาลไม่เก็บบันทึก",
          desc: "เลือกผู้ให้บริการในสวิตเซอร์แลนด์ ปานามา หรือ BVI — นอกเขตอำนาจศาลของอิหร่าน",
        },
      ],
      blockedServices: "บริการที่ถูกบล็อกในอิหร่าน",
      blocked: [
        "Telegram — แอพส่งข้อความที่ใช้มากที่สุด ถูกบล็อกตั้งแต่ 2018",
        "WhatsApp — ถูกบล็อกระหว่างการประท้วง Mahsa Amini 2022 ข้อจำกัดยังคงอยู่",
        "Instagram — ถูกบล็อกตั้งแต่ 2022",
        "YouTube — ถูกบล็อกตั้งแต่ 2009",
        "TikTok",
        "X (Twitter), Facebook",
        "Google Play Store — ถูกจำกัด",
        "เว็บข่าวอิสระ (BBC Persian, Iran International, IranWire)",
      ],
      tips: "ขั้นตอนปฏิบัติก่อนเดินทางไปอิหร่าน",
      tipsList: [
        "ติดตั้งแอพ VPN ก่อนเข้าอิหร่าน — เว็บไซต์ VPN และร้านแอพทั้งหมดถูกบล็อกในประเทศ",
        "ดาวน์โหลดการกำหนดค่าการเชื่อมต่อด้วยตนเอง (ไฟล์ OpenVPN .ovpn) เป็นสำรอง — แอพอาจหยุดทำงานแต่การกำหนดค่ามักยังเชื่อมต่อได้",
        "เปิดใช้งานโหมดปิดบัง/ซ่อนตัวทันที — DPI ของอิหร่านตรวจจับการเข้าชม VPN มาตรฐานภายในไม่กี่วินาที",
        "ติดตั้งผู้ให้บริการ VPN อย่างน้อย 2 รายที่แตกต่างกัน — เซิร์ฟเวอร์หมุนเวียนผ่านการบล็อกอย่างต่อเนื่อง",
        "พิจารณาเครื่องมือที่ใช้ VLESS เป็นสำรอง (V2Ray, Xray) — ปัจจุบันมีอัตราการตรวจจับต่ำที่สุด",
        "ข้อมูลมือถืออาจใช้ได้เมื่อ WiFi ที่บ้านไม่ทำงาน — การบล็อกระดับ ISP แตกต่างกัน",
      ],
      faqTitle: "คำถามที่พบบ่อย VPN อิหร่าน",
      faqs: [
        {
          q: "VPN ถูกกฎหมายในอิหร่านหรือไม่?",
          a: "ไม่ ตั้งแต่เดือนกุมภาพันธ์ 2024 สภาสูงสุดด้านไซเบอร์สเปซของอิหร่านได้สั่งห้ามการใช้และการขาย VPN อย่างเป็นทางการ รัฐบาลดำเนินคดีผู้ขาย VPN อย่างแข็งขัน อย่างไรก็ตาม การบังคับใช้กับผู้ใช้รายบุคคลมุ่งเน้นที่การบล็อกทางเทคนิคมากกว่าการดำเนินคดีทางกฎหมาย — ผู้ใช้ส่วนใหญ่ประสบกับการตัดการเชื่อมต่อ ไม่ใช่การจับกุม",
        },
        {
          q: "รัฐบาลสามารถตรวจจับการใช้ VPN ได้หรือไม่?",
          a: "ได้ อิหร่านดำเนินงานระบบ DPI ที่ก้าวหน้าที่สุดแห่งหนึ่งของโลก ใช้วิธีรายการโปรโตคอลที่อนุญาต: เฉพาะการเข้าชม DNS, HTTP และ HTTPS เท่านั้นที่ถูกส่งต่อ โปรโตคอล VPN มาตรฐาน (WireGuard, OpenVPN) ถูกตรวจจับและบล็อกภายในไม่กี่วินาที เฉพาะโปรโตคอลที่ปิดบังซึ่งเลียนแบบการเข้าชม HTTPS ปกติเท่านั้นที่สามารถผ่านได้",
        },
        {
          q: "โปรโตคอลใดทำงานได้ดีที่สุดในอิหร่านตอนนี้?",
          a: "ณ ต้นปี 2026 VLESS พร้อม TLS + WebSocket + การกำหนดเส้นทาง CDN มีอัตราการตรวจจับต่ำที่สุด (ต่ำกว่า 5% ตามการวิจัยที่เผยแพร่) ในบรรดา VPN เชิงพาณิชย์ โปรโตคอล Stealth ของ ProtonVPN และ Lightway ของ ExpressVPN พร้อมการปิดบังทำงานได้ดีที่สุด WireGuard และ OpenVPN มาตรฐานไม่ทำงานหากไม่มีการปิดบัง",
        },
        {
          q: "เกิดอะไรขึ้นในเดือนมกราคม 2026?",
          a: "ตั้งแต่วันที่ 8 มกราคม 2026 ระหว่างการประท้วงทั่วประเทศที่เกิดจากวิกฤตเศรษฐกิจ อิหร่านได้ดำเนินการตัดอินเทอร์เน็ตรุนแรงที่สุดในประวัติศาสตร์ การเชื่อมต่อลดลงเหลือ 1-3% ของระดับปกติ (ข้อมูล Cloudflare) การตัดอินเทอร์เน็ตขยายไปถึงเครือข่ายโทรศัพท์และ Starlink รัฐมนตรีกระทรวงสื่อสารของอิหร่านยอมรับว่าสร้างความเสียหายทางเศรษฐกิจ 35.7 ล้านดอลลาร์ต่อวัน",
        },
      ],
      getVpn: "รับ VPN",
      effectiveness95: "ประสิทธิภาพ 95%",
      effectiveness90: "ประสิทธิภาพ 90%",
      effectiveness85: "ประสิทธิภาพ 85%",
      effectiveness82: "ประสิทธิภาพ 82%",
      lastUpdated: "ตรวจสอบล่าสุด: มีนาคม 2026",
      sources: "แหล่งที่มาและเอกสารอ้างอิง",
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
                  href="https://freedomhouse.org/country/iran/freedom-net/2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Freedom House — Iran: Freedom on the Net 2025 (score: 11/100)
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/2026_Internet_blackout_in_Iran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Wikipedia — 2026 Internet blackout in Iran
                </a>
              </li>
              <li>
                <a
                  href="https://carnegieendowment.org/china/research/2026/03/iran-wields-wartime-internet-access-as-a-political-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Carnegie Endowment — Iran Wields Internet Access as a Political Tool (March 2026)
                </a>
              </li>
              <li>
                <a
                  href="https://www.amnesty.org/en/latest/news/2026/01/internet-shutdown-in-iran-hides-violations-in-escalating-protests/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Amnesty International — Iran Internet Shutdown Hides Violations (Jan 2026)
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/html/2507.14183v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  arXiv — Iran&apos;s Stealth Internet Blackout: A New Model of Censorship
                </a>
              </li>
              <li>
                <a
                  href="https://netblocks.org/reports/iran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  NetBlocks — Iran Network Disruption Tracker
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
