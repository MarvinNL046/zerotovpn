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
import { generateAlternates } from "@/lib/seo-utils";
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

  const titles: Record<string, string> = {
    en: "Best VPN for Iran (2026) - Works During Restrictions | ZeroToVPN",
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
    en: "Need a VPN that works in Iran? We tested reliability, censorship resistance and speed in 2026 to find VPNs that still connect during restrictions.",
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
          desc: ""白色SIM卡"为政府内部人员提供不受限制的访问（2025年11月曝光）",
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
