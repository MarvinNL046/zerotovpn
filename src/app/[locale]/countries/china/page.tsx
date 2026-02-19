import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { generateAlternates } from "@/lib/seo-utils";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Shield,
  AlertTriangle,
  XCircle,
  Globe,
  Clock,
  ArrowRight,
  Info,
  Scale,
  Smartphone,
  Lock,
  TrendingUp,
  Ban,
  CheckCircle,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for China 2026: Bypass the Great Firewall | ZeroToVPN",
    nl: "Beste VPN voor China 2026: Omzeil de Chinese Firewall | ZeroToVPN",
    de: "Beste VPN für China 2026: Die Große Firewall umgehen | ZeroToVPN",
    es: "Mejor VPN para China 2026: Evita el Gran Cortafuegos | ZeroToVPN",
    fr: "Meilleur VPN pour la Chine 2026: Contourner le Grand Pare-feu | ZeroToVPN",
    zh: "2026年中国最佳VPN：突破防火长城 | ZeroToVPN",
    ja: "2026年中国向けベストVPN：グレートファイアウォールを突破 | ZeroToVPN",
    ko: "2026년 중국 최고의 VPN: 만리방화벽 우회 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับจีน 2026: ข้ามกำแพงไฟจีน | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find VPNs that actually work in China in 2026. Expert-tested solutions to bypass the Great Firewall. Download before you travel!",
    nl: "Vind VPNs die echt werken in China in 2026. Expert-geteste oplossingen om de Chinese Firewall te omzeilen.",
    de: "Finden Sie VPNs, die 2026 tatsächlich in China funktionieren. Expertentestete Lösungen zur Umgehung der Großen Firewall.",
    es: "Encuentra VPNs que realmente funcionan en China en 2026. Soluciones probadas por expertos para evitar el Gran Cortafuegos.",
    fr: "Trouvez des VPN qui fonctionnent vraiment en Chine en 2026. Solutions testées par des experts pour contourner le Grand Pare-feu.",
    zh: "发现2026年真正在中国有效的VPN。经专家测试的突破防火长城解决方案。旅行前下载！",
    ja: "2026年に中国で実際に機能するVPNを見つけましょう。グレートファイアウォールを突破する専門家テスト済みソリューション。",
    ko: "2026년 중국에서 실제로 작동하는 VPN을 찾아보세요. 만리방화벽을 우회하는 전문가 테스트 솔루션.",
    th: "ค้นหา VPN ที่ใช้งานได้จริงในจีนปี 2026 โซลูชันที่ผ่านการทดสอบจากผู้เชี่ยวชาญเพื่อข้ามกำแพงไฟจีน",
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
    alternates: generateAlternates("/countries/china", locale),
  };
}

// Country-specific schema
function CountryVpnSchema({ vpns, locale }: { vpns: VpnProvider[]; locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best VPN for China 2026",
    description: "Expert guide to VPNs that work in China, bypassing the Great Firewall",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
    },
    dateModified: "2026-11-30",
    mainEntity: {
      "@type": "ItemList",
      name: "VPNs That Work in China",
      itemListElement: vpns.slice(0, 5).map((vpn, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: vpn.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: vpn.overallRating,
            bestRating: 5,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ChinaVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();

  // Top 3 VPNs that actually work in China (based on research)
  const topChinaVpns = allVpns.filter((vpn) =>
    ["expressvpn", "astrill", "surfshark"].includes(vpn.slug)
  );

  // VPNs that sometimes work (~70% success rate)
  const sometimesWorkVpns = allVpns.filter((vpn) =>
    ["nordvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2026",
      title: "Best VPN for China",
      subtitle: "Bypass the Great Firewall with VPNs that actually work in 2026",
      criticalWarning: "Download Before You Arrive",
      criticalWarningText:
        "VPN websites and app stores are blocked in China. You MUST download and set up your VPN before entering the country.",
      legalStatus: "Legal Status in China",
      legalStatusText:
        "VPNs are legal for foreigners to use in China, though technically regulated. There are no recorded cases of foreigners being penalized for personal VPN use. Chinese nationals face stricter enforcement.",

      // Top 3 that work
      topVpns: "Top 3 VPNs That Work in China (2026)",
      topVpnsText:
        "Based on extensive testing by expats and travelers, these VPNs consistently bypass the Great Firewall with advanced obfuscation technology.",
      vpnDetails: {
        expressvpn: "Most stable with RAM-only servers, stealth servers, and mirror installation links for when main site is blocked.",
        astrill: "Designed specifically for China with StealthVPN and Smart Mode. Favorite among expats living in China.",
        surfshark: "Budget-friendly option with Camouflage Mode obfuscation. Good balance of price and reliability.",
      },

      // Sometimes work
      sometimesWork: "VPNs That Sometimes Work in China (~70% Success)",
      sometimesWorkText:
        "These VPNs work during certain periods but may experience blocks during sensitive political events or government crackdowns.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "Obfuscated servers available" },
        { name: "VyprVPN", feature: "Chameleon protocol for obfuscation" },
      ],

      // Don't work
      dontWork: "VPNs That DON'T Work in China",
      dontWorkText:
        "These popular VPNs are consistently blocked by the Great Firewall. Don't waste your money if you're traveling to China.",
      dontWorkList: [
        "ProtonVPN - No obfuscation, easily detected",
        "TunnelBear - Standard protocols blocked",
        "IPVanish - No stealth servers",
        "Private Internet Access (PIA) - Consistently blocked",
        "AtlasVPN - Lacks China-specific features",
        "CyberGhost - Regular servers detected",
      ],

      // Chinese VPN warning
      chineseVpnWarning: "WARNING: Avoid Chinese VPN Apps",
      chineseVpnWarningText:
        "Chinese VPN apps are government-controlled and monitored. They log all your activity and are NOT suitable for privacy. Avoid apps like:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "Any free VPN from Chinese app stores",
      ],
      chineseVpnWarningNote:
        "These apps are unreliable, track your data, and may report your activity to authorities. Always use international VPN services from trusted providers.",

      keyFeatures: "Essential Features for China",
      features: [
        {
          title: "Obfuscation Technology",
          desc: "Disguises VPN traffic to avoid detection by the Great Firewall",
        },
        {
          title: "Multiple Protocols",
          desc: "StealthVPN, Camouflage Mode, Chameleon protocol that work when others fail",
        },
        {
          title: "Nearby Servers",
          desc: "Servers in Hong Kong, Japan, Singapore for better speeds",
        },
        {
          title: "24/7 Support",
          desc: "Live chat support to help when connection issues arise",
        },
      ],
      blockedServices: "Services Blocked in China",
      blockedList: [
        "Google (Search, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Many news sites and messaging apps",
      ],
      tips: "Tips for Using VPN in China",
      tipsList: [
        "Download multiple VPNs as backup - one might work when another doesn't",
        "Install apps and configure before arriving in China",
        "Try Hong Kong or Japan servers for best speeds",
        "Use obfuscated/stealth mode in your VPN settings",
        "Save offline maps and important documents before traveling",
        "VPN speeds may vary - patience is key",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Is it safe to use a VPN in China as a tourist?",
          a: "Yes, there are no recorded cases of tourists being penalized for VPN use. VPNs are widely used by foreigners for work and staying connected. The government primarily targets unauthorized VPN providers, not users.",
        },
        {
          q: "Which VPN protocol works best in China?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark), and proprietary obfuscated protocols work best. Standard OpenVPN and WireGuard are often blocked. These special protocols disguise VPN traffic as regular HTTPS traffic.",
        },
        {
          q: "Can I sign up for a VPN while in China?",
          a: "It's extremely difficult. Most VPN websites are blocked, and payment processors may not work. Always sign up and download your VPN before traveling to China.",
        },
        {
          q: "Do free VPNs work in China?",
          a: "Almost never. Free VPNs lack the obfuscation technology needed to bypass the Great Firewall. They also pose security risks. Invest in a premium VPN for reliable access.",
        },
        {
          q: "Does ProtonVPN work in China?",
          a: "No, ProtonVPN is consistently blocked in China. It lacks the obfuscation technology needed to bypass the Great Firewall. Choose ExpressVPN, Astrill, or Surfshark instead.",
        },
      ],
      getVpn: "Get VPN",
      readReview: "Read Review",
      worksInChina: "Works in China",
      obfuscation: "Obfuscation",
      stealth: "Stealth",
      sometimes: "Sometimes",
      blocked: "Blocked",
      lastUpdated: "Last updated: November 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2026",
      title: "Beste VPN voor China",
      subtitle: "Omzeil de Grote Firewall met VPNs die echt werken in 2026",
      criticalWarning: "Download Voordat Je Vertrekt",
      criticalWarningText:
        "VPN-websites en app stores zijn geblokkeerd in China. Je MOET je VPN downloaden en instellen voordat je het land binnenkomt.",
      legalStatus: "Juridische Status in China",
      legalStatusText:
        "VPNs zijn legaal voor buitenlanders in China, hoewel technisch gereguleerd. Er zijn geen gevallen bekend van buitenlanders die gestraft zijn voor persoonlijk VPN-gebruik.",

      topVpns: "Top 3 VPNs Die Werken in China (2026)",
      topVpnsText:
        "Op basis van uitgebreide tests door expats en reizigers omzeilen deze VPNs consequent de Grote Firewall met geavanceerde obfuscatie-technologie.",
      vpnDetails: {
        expressvpn: "Meest stabiel met RAM-only servers, stealth servers en mirror installatielinks voor wanneer de hoofdsite geblokkeerd is.",
        astrill: "Speciaal ontworpen voor China met StealthVPN en Smart Mode. Favoriet onder expats die in China wonen.",
        surfshark: "Budgetvriendelijke optie met Camouflage Mode obfuscatie. Goede balans tussen prijs en betrouwbaarheid.",
      },

      sometimesWork: "VPNs Die Soms Werken in China (~70% Succes)",
      sometimesWorkText:
        "Deze VPNs werken in bepaalde periodes maar kunnen blokkades ervaren tijdens gevoelige politieke gebeurtenissen of overheidscampagnes.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "Obfuscated servers beschikbaar" },
        { name: "VyprVPN", feature: "Chameleon protocol voor obfuscatie" },
      ],

      dontWork: "VPNs Die NIET Werken in China",
      dontWorkText:
        "Deze populaire VPNs worden consequent geblokkeerd door de Grote Firewall. Verspil je geld niet als je naar China reist.",
      dontWorkList: [
        "ProtonVPN - Geen obfuscatie, makkelijk detecteerbaar",
        "TunnelBear - Standaard protocollen geblokkeerd",
        "IPVanish - Geen stealth servers",
        "Private Internet Access (PIA) - Consequent geblokkeerd",
        "AtlasVPN - Mist China-specifieke functies",
        "CyberGhost - Reguliere servers gedetecteerd",
      ],

      chineseVpnWarning: "WAARSCHUWING: Vermijd Chinese VPN Apps",
      chineseVpnWarningText:
        "Chinese VPN apps worden gecontroleerd en gemonitord door de overheid. Ze loggen al je activiteit en zijn NIET geschikt voor privacy. Vermijd apps zoals:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "Gratis VPNs van Chinese app stores",
      ],
      chineseVpnWarningNote:
        "Deze apps zijn onbetrouwbaar, volgen je data en kunnen je activiteit rapporteren aan autoriteiten. Gebruik altijd internationale VPN-diensten van vertrouwde providers.",

      keyFeatures: "Essentiële Functies voor China",
      features: [
        {
          title: "Obfuscatie Technologie",
          desc: "Vermomt VPN-verkeer om detectie te voorkomen",
        },
        {
          title: "Meerdere Protocollen",
          desc: "StealthVPN, Camouflage Mode, Chameleon protocol die werken wanneer anderen falen",
        },
        {
          title: "Nabije Servers",
          desc: "Servers in Hong Kong, Japan, Singapore voor betere snelheden",
        },
        {
          title: "24/7 Ondersteuning",
          desc: "Live chat support bij verbindingsproblemen",
        },
      ],
      blockedServices: "Geblokkeerde Diensten in China",
      blockedList: [
        "Google (Zoeken, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Veel nieuwssites en messaging apps",
      ],
      tips: "Tips voor VPN Gebruik in China",
      tipsList: [
        "Download meerdere VPNs als backup",
        "Installeer apps voordat je naar China gaat",
        "Probeer Hong Kong of Japan servers voor beste snelheden",
        "Gebruik obfuscated/stealth modus",
        "Sla offline kaarten op voordat je reist",
        "VPN snelheden kunnen variëren - geduld is belangrijk",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Is het veilig om een VPN te gebruiken in China als toerist?",
          a: "Ja, er zijn geen gevallen bekend van toeristen die gestraft zijn voor VPN-gebruik. VPNs worden veel gebruikt door buitenlanders.",
        },
        {
          q: "Welk VPN-protocol werkt het beste in China?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark) en eigen obfuscated protocollen werken het beste. Standaard OpenVPN en WireGuard worden vaak geblokkeerd.",
        },
        {
          q: "Kan ik me aanmelden voor een VPN terwijl ik in China ben?",
          a: "Het is erg moeilijk. De meeste VPN-websites zijn geblokkeerd. Meld je altijd aan voordat je naar China reist.",
        },
        {
          q: "Werken gratis VPNs in China?",
          a: "Bijna nooit. Gratis VPNs missen de obfuscatie-technologie die nodig is om de Grote Firewall te omzeilen.",
        },
        {
          q: "Werkt ProtonVPN in China?",
          a: "Nee, ProtonVPN wordt consequent geblokkeerd in China. Het mist de obfuscatie-technologie. Kies ExpressVPN, Astrill of Surfshark.",
        },
      ],
      getVpn: "Download VPN",
      readReview: "Lees Review",
      worksInChina: "Werkt in China",
      obfuscation: "Obfuscatie",
      stealth: "Stealth",
      sometimes: "Soms",
      blocked: "Geblokkeerd",
      lastUpdated: "Laatst bijgewerkt: november 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert November 2026",
      title: "Beste VPN für China",
      subtitle: "Umgehen Sie die Große Firewall mit VPNs, die 2026 wirklich funktionieren",
      criticalWarning: "Vor der Ankunft herunterladen",
      criticalWarningText:
        "VPN-Websites und App-Stores sind in China blockiert. Sie MÜSSEN Ihr VPN herunterladen und einrichten, BEVOR Sie in das Land einreisen.",
      legalStatus: "Rechtlicher Status in China",
      legalStatusText:
        "VPNs sind für Ausländer in China legal, obwohl technisch reguliert. Es gibt keine dokumentierten Fälle von Ausländern, die für die persönliche VPN-Nutzung bestraft wurden.",

      topVpns: "Top 3 VPNs, die in China funktionieren (2026)",
      topVpnsText:
        "Basierend auf umfangreichen Tests von Expats und Reisenden umgehen diese VPNs konsequent die Große Firewall mit fortschrittlicher Verschleierungstechnologie.",
      vpnDetails: {
        expressvpn: "Am stabilsten mit RAM-Only-Servern, Stealth-Servern und Mirror-Installationslinks, wenn die Hauptseite blockiert ist.",
        astrill: "Speziell für China entwickelt mit StealthVPN und Smart Mode. Favorit unter Expats in China.",
        surfshark: "Budgetfreundliche Option mit Camouflage Mode Verschleierung. Gutes Preis-Leistungs-Verhältnis.",
      },

      sometimesWork: "VPNs, die manchmal in China funktionieren (~70% Erfolg)",
      sometimesWorkText:
        "Diese VPNs funktionieren in bestimmten Zeiträumen, können aber während sensibler politischer Ereignisse oder Regierungskampagnen blockiert werden.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "Verschleierte Server verfügbar" },
        { name: "VyprVPN", feature: "Chameleon-Protokoll zur Verschleierung" },
      ],

      dontWork: "VPNs, die in China NICHT funktionieren",
      dontWorkText:
        "Diese beliebten VPNs werden konsequent von der Großen Firewall blockiert. Verschwenden Sie kein Geld, wenn Sie nach China reisen.",
      dontWorkList: [
        "ProtonVPN - Keine Verschleierung, leicht erkennbar",
        "TunnelBear - Standardprotokolle blockiert",
        "IPVanish - Keine Stealth-Server",
        "Private Internet Access (PIA) - Konsequent blockiert",
        "AtlasVPN - Fehlen China-spezifische Funktionen",
        "CyberGhost - Reguläre Server erkannt",
      ],

      chineseVpnWarning: "WARNUNG: Vermeiden Sie chinesische VPN-Apps",
      chineseVpnWarningText:
        "Chinesische VPN-Apps werden von der Regierung kontrolliert und überwacht. Sie protokollieren alle Ihre Aktivitäten und sind NICHT für den Datenschutz geeignet. Vermeiden Sie Apps wie:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "Kostenlose VPNs aus chinesischen App-Stores",
      ],
      chineseVpnWarningNote:
        "Diese Apps sind unzuverlässig, verfolgen Ihre Daten und können Ihre Aktivitäten an Behörden melden. Verwenden Sie immer internationale VPN-Dienste vertrauenswürdiger Anbieter.",

      keyFeatures: "Wesentliche Funktionen für China",
      features: [
        {
          title: "Verschleierungstechnologie",
          desc: "Tarnt VPN-Traffic, um Erkennung zu vermeiden",
        },
        {
          title: "Mehrere Protokolle",
          desc: "StealthVPN, Camouflage Mode, Chameleon-Protokoll, die funktionieren, wenn andere versagen",
        },
        {
          title: "Nahegelegene Server",
          desc: "Server in Hongkong, Japan, Singapur für bessere Geschwindigkeiten",
        },
        {
          title: "24/7 Support",
          desc: "Live-Chat-Support bei Verbindungsproblemen",
        },
      ],
      blockedServices: "In China blockierte Dienste",
      blockedList: [
        "Google (Suche, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Viele Nachrichtenseiten und Messaging-Apps",
      ],
      tips: "Tipps zur VPN-Nutzung in China",
      tipsList: [
        "Laden Sie mehrere VPNs als Backup herunter",
        "Installieren Sie Apps vor der Ankunft in China",
        "Probieren Sie Hongkong- oder Japan-Server",
        "Verwenden Sie verschleierten/Stealth-Modus",
        "Speichern Sie Offline-Karten vor der Reise",
        "VPN-Geschwindigkeiten können variieren - Geduld ist wichtig",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Ist es sicher, als Tourist in China ein VPN zu verwenden?",
          a: "Ja, es gibt keine dokumentierten Fälle von Touristen, die für VPN-Nutzung bestraft wurden.",
        },
        {
          q: "Welches VPN-Protokoll funktioniert am besten in China?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark) und proprietäre verschleierte Protokolle funktionieren am besten.",
        },
        {
          q: "Kann ich mich für ein VPN anmelden, während ich in China bin?",
          a: "Es ist extrem schwierig. Die meisten VPN-Websites sind blockiert. Melden Sie sich immer vorher an.",
        },
        {
          q: "Funktionieren kostenlose VPNs in China?",
          a: "Fast nie. Kostenlosen VPNs fehlt die Verschleierungstechnologie.",
        },
        {
          q: "Funktioniert ProtonVPN in China?",
          a: "Nein, ProtonVPN wird konsequent blockiert. Wählen Sie ExpressVPN, Astrill oder Surfshark.",
        },
      ],
      getVpn: "VPN herunterladen",
      readReview: "Rezension lesen",
      worksInChina: "Funktioniert in China",
      obfuscation: "Verschleierung",
      stealth: "Stealth",
      sometimes: "Manchmal",
      blocked: "Blockiert",
      lastUpdated: "Zuletzt aktualisiert: November 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado noviembre 2026",
      title: "Mejor VPN para China",
      subtitle: "Evita el Gran Cortafuegos con VPNs que realmente funcionan en 2026",
      criticalWarning: "Descarga antes de llegar",
      criticalWarningText:
        "Los sitios web de VPN y las tiendas de aplicaciones están bloqueados en China. DEBES descargar y configurar tu VPN ANTES de entrar al país.",
      legalStatus: "Estado legal en China",
      legalStatusText:
        "Las VPN son legales para extranjeros en China, aunque técnicamente reguladas. No hay casos registrados de extranjeros penalizados por uso personal de VPN.",

      topVpns: "Top 3 VPNs que funcionan en China (2026)",
      topVpnsText:
        "Basado en pruebas exhaustivas de expatriados y viajeros, estas VPNs evitan consistentemente el Gran Cortafuegos con tecnología de ofuscación avanzada.",
      vpnDetails: {
        expressvpn: "Más estable con servidores solo RAM, servidores sigilosos y enlaces de instalación espejo cuando el sitio principal está bloqueado.",
        astrill: "Diseñado específicamente para China con StealthVPN y Smart Mode. Favorito entre expatriados que viven en China.",
        surfshark: "Opción económica con modo Camouflage para ofuscación. Buen equilibrio entre precio y confiabilidad.",
      },

      sometimesWork: "VPNs que a veces funcionan en China (~70% éxito)",
      sometimesWorkText:
        "Estas VPNs funcionan durante ciertos períodos pero pueden experimentar bloqueos durante eventos políticos sensibles o campañas gubernamentales.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "Servidores ofuscados disponibles" },
        { name: "VyprVPN", feature: "Protocolo Chameleon para ofuscación" },
      ],

      dontWork: "VPNs que NO funcionan en China",
      dontWorkText:
        "Estas VPN populares están consistentemente bloqueadas por el Gran Cortafuegos. No desperdicies tu dinero si viajas a China.",
      dontWorkList: [
        "ProtonVPN - Sin ofuscación, fácilmente detectado",
        "TunnelBear - Protocolos estándar bloqueados",
        "IPVanish - Sin servidores sigilosos",
        "Private Internet Access (PIA) - Consistentemente bloqueado",
        "AtlasVPN - Carece de características específicas para China",
        "CyberGhost - Servidores regulares detectados",
      ],

      chineseVpnWarning: "ADVERTENCIA: Evita las aplicaciones VPN chinas",
      chineseVpnWarningText:
        "Las aplicaciones VPN chinas están controladas y monitoreadas por el gobierno. Registran toda tu actividad y NO son adecuadas para la privacidad. Evita aplicaciones como:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "VPN gratuitas de tiendas de aplicaciones chinas",
      ],
      chineseVpnWarningNote:
        "Estas aplicaciones son poco confiables, rastrean tus datos y pueden reportar tu actividad a las autoridades. Siempre usa servicios VPN internacionales de proveedores confiables.",

      keyFeatures: "Características esenciales para China",
      features: [
        {
          title: "Tecnología de ofuscación",
          desc: "Disfraza el tráfico VPN para evitar la detección",
        },
        {
          title: "Múltiples protocolos",
          desc: "StealthVPN, Camouflage Mode, protocolo Chameleon que funcionan cuando otros fallan",
        },
        {
          title: "Servidores cercanos",
          desc: "Servidores en Hong Kong, Japón, Singapur para mejores velocidades",
        },
        {
          title: "Soporte 24/7",
          desc: "Chat en vivo para ayudar cuando surgen problemas de conexión",
        },
      ],
      blockedServices: "Servicios bloqueados en China",
      blockedList: [
        "Google (Búsqueda, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Muchos sitios de noticias y aplicaciones de mensajería",
      ],
      tips: "Consejos para usar VPN en China",
      tipsList: [
        "Descarga múltiples VPN como respaldo",
        "Instala aplicaciones antes de llegar a China",
        "Prueba servidores de Hong Kong o Japón",
        "Usa el modo ofuscado/sigiloso",
        "Guarda mapas sin conexión antes de viajar",
        "Las velocidades de VPN pueden variar - la paciencia es clave",
      ],
      faqTitle: "Preguntas frecuentes sobre VPN en China",
      faqs: [
        {
          q: "¿Es seguro usar una VPN en China como turista?",
          a: "Sí, no hay casos registrados de turistas penalizados por uso de VPN.",
        },
        {
          q: "¿Qué protocolo VPN funciona mejor en China?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark) y protocolos ofuscados propietarios funcionan mejor.",
        },
        {
          q: "¿Puedo registrarme en una VPN mientras estoy en China?",
          a: "Es extremadamente difícil. La mayoría de los sitios web de VPN están bloqueados. Siempre regístrate antes.",
        },
        {
          q: "¿Funcionan las VPN gratuitas en China?",
          a: "Casi nunca. Las VPN gratuitas carecen de la tecnología de ofuscación necesaria.",
        },
        {
          q: "¿Funciona ProtonVPN en China?",
          a: "No, ProtonVPN está consistentemente bloqueado. Elige ExpressVPN, Astrill o Surfshark.",
        },
      ],
      getVpn: "Obtener VPN",
      readReview: "Leer reseña",
      worksInChina: "Funciona en China",
      obfuscation: "Ofuscación",
      stealth: "Sigiloso",
      sometimes: "A veces",
      blocked: "Bloqueado",
      lastUpdated: "Última actualización: noviembre 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour novembre 2026",
      title: "Meilleur VPN pour la Chine",
      subtitle: "Contournez le Grand Pare-feu avec des VPN qui fonctionnent vraiment en 2026",
      criticalWarning: "Téléchargez avant d'arriver",
      criticalWarningText:
        "Les sites Web VPN et les magasins d'applications sont bloqués en Chine. Vous DEVEZ télécharger et configurer votre VPN AVANT d'entrer dans le pays.",
      legalStatus: "Statut légal en Chine",
      legalStatusText:
        "Les VPN sont légaux pour les étrangers en Chine, bien que techniquement réglementés. Il n'y a aucun cas enregistré d'étrangers pénalisés pour l'utilisation personnelle de VPN.",

      topVpns: "Top 3 VPN qui fonctionnent en Chine (2026)",
      topVpnsText:
        "Basé sur des tests approfondis par des expatriés et des voyageurs, ces VPN contournent systématiquement le Grand Pare-feu avec une technologie d'obscurcissement avancée.",
      vpnDetails: {
        expressvpn: "Le plus stable avec serveurs RAM uniquement, serveurs furtifs et liens d'installation miroir quand le site principal est bloqué.",
        astrill: "Conçu spécifiquement pour la Chine avec StealthVPN et Smart Mode. Favori des expatriés vivant en Chine.",
        surfshark: "Option économique avec mode Camouflage pour l'obscurcissement. Bon équilibre prix-fiabilité.",
      },

      sometimesWork: "VPN qui fonctionnent parfois en Chine (~70% de succès)",
      sometimesWorkText:
        "Ces VPN fonctionnent pendant certaines périodes mais peuvent subir des blocages lors d'événements politiques sensibles ou de campagnes gouvernementales.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "Serveurs obscurcis disponibles" },
        { name: "VyprVPN", feature: "Protocole Chameleon pour l'obscurcissement" },
      ],

      dontWork: "VPN qui ne fonctionnent PAS en Chine",
      dontWorkText:
        "Ces VPN populaires sont systématiquement bloqués par le Grand Pare-feu. Ne gaspillez pas votre argent si vous voyagez en Chine.",
      dontWorkList: [
        "ProtonVPN - Pas d'obscurcissement, facilement détecté",
        "TunnelBear - Protocoles standard bloqués",
        "IPVanish - Pas de serveurs furtifs",
        "Private Internet Access (PIA) - Systématiquement bloqué",
        "AtlasVPN - Manque de fonctionnalités spécifiques à la Chine",
        "CyberGhost - Serveurs réguliers détectés",
      ],

      chineseVpnWarning: "AVERTISSEMENT : Évitez les applications VPN chinoises",
      chineseVpnWarningText:
        "Les applications VPN chinoises sont contrôlées et surveillées par le gouvernement. Elles enregistrent toute votre activité et ne conviennent PAS à la confidentialité. Évitez les applications comme :",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "VPN gratuits des magasins d'applications chinois",
      ],
      chineseVpnWarningNote:
        "Ces applications sont peu fiables, suivent vos données et peuvent signaler votre activité aux autorités. Utilisez toujours des services VPN internationaux de fournisseurs de confiance.",

      keyFeatures: "Fonctionnalités essentielles pour la Chine",
      features: [
        {
          title: "Technologie d'obscurcissement",
          desc: "Déguise le trafic VPN pour éviter la détection",
        },
        {
          title: "Protocoles multiples",
          desc: "StealthVPN, Camouflage Mode, protocole Chameleon qui fonctionnent quand d'autres échouent",
        },
        {
          title: "Serveurs à proximité",
          desc: "Serveurs à Hong Kong, Japon, Singapour pour de meilleures vitesses",
        },
        {
          title: "Support 24/7",
          desc: "Support par chat en direct pour les problèmes de connexion",
        },
      ],
      blockedServices: "Services bloqués en Chine",
      blockedList: [
        "Google (Recherche, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "De nombreux sites d'actualités et applications de messagerie",
      ],
      tips: "Conseils pour utiliser un VPN en Chine",
      tipsList: [
        "Téléchargez plusieurs VPN comme sauvegarde",
        "Installez les applications avant d'arriver en Chine",
        "Essayez les serveurs de Hong Kong ou du Japon",
        "Utilisez le mode obscurci/furtif",
        "Enregistrez des cartes hors ligne avant de voyager",
        "Les vitesses VPN peuvent varier - la patience est essentielle",
      ],
      faqTitle: "FAQ VPN Chine",
      faqs: [
        {
          q: "Est-il sûr d'utiliser un VPN en Chine en tant que touriste ?",
          a: "Oui, il n'y a aucun cas enregistré de touristes pénalisés pour l'utilisation de VPN.",
        },
        {
          q: "Quel protocole VPN fonctionne le mieux en Chine ?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark) et protocoles obscurcis propriétaires fonctionnent le mieux.",
        },
        {
          q: "Puis-je m'inscrire à un VPN en étant en Chine ?",
          a: "C'est extrêmement difficile. La plupart des sites Web VPN sont bloqués. Inscrivez-vous toujours avant.",
        },
        {
          q: "Les VPN gratuits fonctionnent-ils en Chine ?",
          a: "Presque jamais. Les VPN gratuits manquent de la technologie d'obscurcissement nécessaire.",
        },
        {
          q: "ProtonVPN fonctionne-t-il en Chine ?",
          a: "Non, ProtonVPN est systématiquement bloqué. Choisissez ExpressVPN, Astrill ou Surfshark.",
        },
      ],
      getVpn: "Obtenir VPN",
      readReview: "Lire l'avis",
      worksInChina: "Fonctionne en Chine",
      obfuscation: "Obscurcissement",
      stealth: "Furtif",
      sometimes: "Parfois",
      blocked: "Bloqué",
      lastUpdated: "Dernière mise à jour : novembre 2026",
      sources: "Sources",
    },
    zh: {
      badge: "2026年11月更新",
      title: "中国最佳VPN",
      subtitle: "使用2026年真正有效的VPN突破防火长城",
      criticalWarning: "抵达前下载",
      criticalWarningText:
        "VPN网站和应用商店在中国被封锁。您必须在进入中国之前下载并设置您的VPN。",
      legalStatus: "中国的法律地位",
      legalStatusText:
        "VPN对外国人来说在中国是合法的，尽管在技术上受到监管。没有外国人因个人使用VPN而受到处罚的记录案例。",

      topVpns: "在中国有效的前3名VPN（2026年）",
      topVpnsText:
        "基于外籍人士和旅行者的广泛测试，这些VPN通过先进的混淆技术持续突破防火长城。",
      vpnDetails: {
        expressvpn: "最稳定，具有纯RAM服务器、隐形服务器和主站被封锁时的镜像安装链接。",
        astrill: "专为中国设计，具有StealthVPN和Smart Mode。在中国生活的外籍人士的最爱。",
        surfshark: "经济实惠的选择，具有Camouflage Mode混淆。价格和可靠性的良好平衡。",
      },

      sometimesWork: "在中国有时有效的VPN（约70%成功率）",
      sometimesWorkText:
        "这些VPN在某些时期有效，但在敏感政治事件或政府打击期间可能会遇到封锁。",
      sometimesWorkList: [
        { name: "NordVPN", feature: "可用混淆服务器" },
        { name: "VyprVPN", feature: "Chameleon协议用于混淆" },
      ],

      dontWork: "在中国不起作用的VPN",
      dontWorkText:
        "这些流行的VPN被防火长城持续封锁。如果您前往中国，请不要浪费金钱。",
      dontWorkList: [
        "ProtonVPN - 无混淆，易被检测",
        "TunnelBear - 标准协议被封锁",
        "IPVanish - 无隐形服务器",
        "Private Internet Access (PIA) - 持续被封锁",
        "AtlasVPN - 缺乏中国特定功能",
        "CyberGhost - 常规服务器被检测",
      ],

      chineseVpnWarning: "警告：避免中国VPN应用",
      chineseVpnWarningText:
        "中国VPN应用受政府控制和监控。它们记录您的所有活动，不适合隐私保护。避免使用以下应用：",
      chineseVpnApps: [
        "绿灯VPN",
        "翻墙VPN Pro",
        "快喵VPN",
        "中国应用商店的免费VPN",
      ],
      chineseVpnWarningNote:
        "这些应用不可靠，跟踪您的数据，可能向当局报告您的活动。始终使用来自可信提供商的国际VPN服务。",

      keyFeatures: "中国必备功能",
      features: [
        {
          title: "混淆技术",
          desc: "伪装VPN流量以避免被检测",
        },
        {
          title: "多种协议",
          desc: "StealthVPN、Camouflage Mode、Chameleon协议在其他协议失败时仍能工作",
        },
        {
          title: "附近服务器",
          desc: "香港、日本、新加坡的服务器可提供更快的速度",
        },
        {
          title: "全天候支持",
          desc: "连接问题时提供实时聊天支持",
        },
      ],
      blockedServices: "中国封锁的服务",
      blockedList: [
        "谷歌（搜索、Gmail、地图、云端硬盘）",
        "Facebook、Instagram、WhatsApp",
        "YouTube、Netflix、Spotify",
        "Twitter/X、Reddit、维基百科",
        "许多新闻网站和消息应用",
      ],
      tips: "在中国使用VPN的提示",
      tipsList: [
        "下载多个VPN作为备份",
        "在抵达中国之前安装应用程序",
        "尝试香港或日本服务器以获得最佳速度",
        "使用混淆/隐身模式",
        "旅行前保存离线地图和重要文档",
        "VPN速度可能会变化 - 耐心是关键",
      ],
      faqTitle: "中国VPN常见问题",
      faqs: [
        {
          q: "作为游客在中国使用VPN安全吗？",
          a: "是的，没有游客因使用VPN而受到处罚的记录案例。",
        },
        {
          q: "哪种VPN协议在中国最有效？",
          a: "StealthVPN（Astrill）、Camouflage Mode（Surfshark）和专有混淆协议效果最好。",
        },
        {
          q: "我可以在中国时注册VPN吗？",
          a: "极其困难。大多数VPN网站被封锁。请务必在前往中国之前注册。",
        },
        {
          q: "免费VPN在中国有效吗？",
          a: "几乎从不有效。免费VPN缺乏突破防火长城所需的混淆技术。",
        },
        {
          q: "ProtonVPN在中国有效吗？",
          a: "不，ProtonVPN在中国被持续封锁。选择ExpressVPN、Astrill或Surfshark。",
        },
      ],
      getVpn: "获取VPN",
      readReview: "阅读评测",
      worksInChina: "在中国有效",
      obfuscation: "混淆",
      stealth: "隐形",
      sometimes: "有时",
      blocked: "被封锁",
      lastUpdated: "最后更新：2026年11月",
      sources: "来源",
    },
    ja: {
      badge: "2026年11月更新",
      title: "中国向けベストVPN",
      subtitle: "2026年に実際に機能するVPNでグレートファイアウォールを突破",
      criticalWarning: "到着前にダウンロード",
      criticalWarningText:
        "VPNウェブサイトとアプリストアは中国でブロックされています。入国前にVPNをダウンロードして設定する必要があります。",
      legalStatus: "中国での法的地位",
      legalStatusText:
        "VPNは技術的には規制されていますが、外国人が中国で使用することは合法です。個人的なVPN使用で罰せられた外国人の記録はありません。",

      topVpns: "中国で機能するトップ3 VPN（2026年）",
      topVpnsText:
        "駐在員や旅行者による広範なテストに基づき、これらのVPNは高度な難読化技術でグレートファイアウォールを一貫して突破します。",
      vpnDetails: {
        expressvpn: "RAMのみのサーバー、ステルスサーバー、メインサイトがブロックされた場合のミラーインストールリンクで最も安定。",
        astrill: "StealthVPNとSmart Modeを備えた中国専用設計。中国在住の駐在員のお気に入り。",
        surfshark: "Camouflage Mode難読化を備えた予算に優しいオプション。価格と信頼性の良いバランス。",
      },

      sometimesWork: "中国で時々機能するVPN（約70%の成功率）",
      sometimesWorkText:
        "これらのVPNは特定の期間は機能しますが、政治的に敏感なイベントや政府の取り締まり中にブロックされる可能性があります。",
      sometimesWorkList: [
        { name: "NordVPN", feature: "難読化サーバー利用可能" },
        { name: "VyprVPN", feature: "難読化用のChameleonプロトコル" },
      ],

      dontWork: "中国で機能しないVPN",
      dontWorkText:
        "これらの人気のあるVPNは、グレートファイアウォールによって一貫してブロックされています。中国に旅行する場合はお金を無駄にしないでください。",
      dontWorkList: [
        "ProtonVPN - 難読化なし、簡単に検出",
        "TunnelBear - 標準プロトコルがブロック",
        "IPVanish - ステルスサーバーなし",
        "Private Internet Access (PIA) - 一貫してブロック",
        "AtlasVPN - 中国固有の機能が不足",
        "CyberGhost - 通常のサーバーが検出",
      ],

      chineseVpnWarning: "警告：中国のVPNアプリを避ける",
      chineseVpnWarningText:
        "中国のVPNアプリは政府によって管理・監視されています。すべての活動を記録し、プライバシーには適していません。次のようなアプリを避けてください：",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "中国のアプリストアの無料VPN",
      ],
      chineseVpnWarningNote:
        "これらのアプリは信頼性が低く、データを追跡し、当局に活動を報告する可能性があります。常に信頼できるプロバイダーの国際VPNサービスを使用してください。",

      keyFeatures: "中国に必須の機能",
      features: [
        {
          title: "難読化技術",
          desc: "VPNトラフィックを偽装して検出を回避",
        },
        {
          title: "複数のプロトコル",
          desc: "他のプロトコルが失敗したときに機能するStealthVPN、Camouflage Mode、Chameleonプロトコル",
        },
        {
          title: "近隣サーバー",
          desc: "より良い速度のために香港、日本、シンガポールのサーバー",
        },
        {
          title: "24時間365日サポート",
          desc: "接続問題が発生したときのライブチャットサポート",
        },
      ],
      blockedServices: "中国でブロックされているサービス",
      blockedList: [
        "Google（検索、Gmail、マップ、ドライブ）",
        "Facebook、Instagram、WhatsApp",
        "YouTube、Netflix、Spotify",
        "Twitter/X、Reddit、Wikipedia",
        "多くのニュースサイトとメッセージングアプリ",
      ],
      tips: "中国でVPNを使用するためのヒント",
      tipsList: [
        "バックアップとして複数のVPNをダウンロード",
        "中国に到着する前にアプリをインストール",
        "最高速度のために香港または日本のサーバーを試す",
        "難読化/ステルスモードを使用",
        "旅行前にオフラインマップと重要な書類を保存",
        "VPN速度は変動する可能性があります - 忍耐が鍵です",
      ],
      faqTitle: "中国VPN FAQ",
      faqs: [
        {
          q: "観光客として中国でVPNを使用するのは安全ですか？",
          a: "はい、VPN使用で罰せられた観光客の記録はありません。",
        },
        {
          q: "中国でどのVPNプロトコルが最も効果的ですか？",
          a: "StealthVPN（Astrill）、Camouflage Mode（Surfshark）、独自の難読化プロトコルが最も効果的です。",
        },
        {
          q: "中国にいる間にVPNに登録できますか？",
          a: "非常に困難です。ほとんどのVPNウェブサイトがブロックされています。常に事前に登録してください。",
        },
        {
          q: "無料VPNは中国で機能しますか？",
          a: "ほとんど機能しません。無料VPNには必要な難読化技術がありません。",
        },
        {
          q: "ProtonVPNは中国で機能しますか？",
          a: "いいえ、ProtonVPNは一貫してブロックされています。ExpressVPN、Astrill、Surfsharkを選択してください。",
        },
      ],
      getVpn: "VPNを入手",
      readReview: "レビューを読む",
      worksInChina: "中国で機能",
      obfuscation: "難読化",
      stealth: "ステルス",
      sometimes: "時々",
      blocked: "ブロック",
      lastUpdated: "最終更新：2026年11月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 11월 업데이트",
      title: "중국 최고의 VPN",
      subtitle: "2026년에 실제로 작동하는 VPN으로 만리방화벽 우회",
      criticalWarning: "도착 전 다운로드",
      criticalWarningText:
        "VPN 웹사이트와 앱 스토어는 중국에서 차단됩니다. 입국 전에 VPN을 다운로드하고 설정해야 합니다.",
      legalStatus: "중국의 법적 지위",
      legalStatusText:
        "VPN은 기술적으로 규제되지만 외국인이 중국에서 사용하는 것은 합법입니다. 개인적인 VPN 사용으로 처벌받은 외국인의 기록된 사례는 없습니다.",

      topVpns: "중국에서 작동하는 상위 3개 VPN (2026년)",
      topVpnsText:
        "주재원과 여행자의 광범위한 테스트를 기반으로 이러한 VPN은 고급 난독화 기술로 만리방화벽을 지속적으로 우회합니다.",
      vpnDetails: {
        expressvpn: "RAM 전용 서버, 스텔스 서버, 메인 사이트가 차단될 때 미러 설치 링크로 가장 안정적입니다.",
        astrill: "StealthVPN과 Smart Mode가 있는 중국 전용 설계. 중국에 거주하는 주재원들의 최애.",
        surfshark: "Camouflage Mode 난독화를 갖춘 예산 친화적인 옵션. 가격과 신뢰성의 좋은 균형.",
      },

      sometimesWork: "중국에서 때때로 작동하는 VPN (~70% 성공)",
      sometimesWorkText:
        "이러한 VPN은 특정 기간 동안 작동하지만 민감한 정치적 이벤트나 정부 단속 중에 차단될 수 있습니다.",
      sometimesWorkList: [
        { name: "NordVPN", feature: "난독화 서버 사용 가능" },
        { name: "VyprVPN", feature: "난독화를 위한 Chameleon 프로토콜" },
      ],

      dontWork: "중국에서 작동하지 않는 VPN",
      dontWorkText:
        "이러한 인기 있는 VPN은 만리방화벽에 의해 지속적으로 차단됩니다. 중국으로 여행하는 경우 돈을 낭비하지 마십시오.",
      dontWorkList: [
        "ProtonVPN - 난독화 없음, 쉽게 감지됨",
        "TunnelBear - 표준 프로토콜 차단",
        "IPVanish - 스텔스 서버 없음",
        "Private Internet Access (PIA) - 지속적으로 차단",
        "AtlasVPN - 중국 특정 기능 부족",
        "CyberGhost - 일반 서버 감지됨",
      ],

      chineseVpnWarning: "경고: 중국 VPN 앱 피하기",
      chineseVpnWarningText:
        "중국 VPN 앱은 정부가 통제하고 모니터링합니다. 모든 활동을 기록하며 개인 정보 보호에 적합하지 않습니다. 다음과 같은 앱을 피하십시오:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "중국 앱 스토어의 무료 VPN",
      ],
      chineseVpnWarningNote:
        "이러한 앱은 신뢰할 수 없고 데이터를 추적하며 당국에 활동을 보고할 수 있습니다. 항상 신뢰할 수 있는 제공업체의 국제 VPN 서비스를 사용하십시오.",

      keyFeatures: "중국 필수 기능",
      features: [
        {
          title: "난독화 기술",
          desc: "VPN 트래픽을 위장하여 감지 회피",
        },
        {
          title: "다중 프로토콜",
          desc: "다른 프로토콜이 실패할 때 작동하는 StealthVPN, Camouflage Mode, Chameleon 프로토콜",
        },
        {
          title: "인근 서버",
          desc: "더 나은 속도를 위한 홍콩, 일본, 싱가포르 서버",
        },
        {
          title: "연중무휴 지원",
          desc: "연결 문제 발생 시 실시간 채팅 지원",
        },
      ],
      blockedServices: "중국에서 차단된 서비스",
      blockedList: [
        "구글 (검색, Gmail, 지도, 드라이브)",
        "페이스북, 인스타그램, 왓츠앱",
        "유튜브, 넷플릭스, 스포티파이",
        "트위터/X, 레딧, 위키피디아",
        "많은 뉴스 사이트 및 메시징 앱",
      ],
      tips: "중국에서 VPN 사용 팁",
      tipsList: [
        "백업으로 여러 VPN 다운로드",
        "중국 도착 전에 앱 설치",
        "최상의 속도를 위해 홍콩 또는 일본 서버 시도",
        "난독화/스텔스 모드 사용",
        "여행 전에 오프라인 지도와 중요한 문서 저장",
        "VPN 속도는 다를 수 있습니다 - 인내가 핵심입니다",
      ],
      faqTitle: "중국 VPN 자주 묻는 질문",
      faqs: [
        {
          q: "관광객으로서 중국에서 VPN을 사용하는 것이 안전한가요?",
          a: "예, VPN 사용으로 처벌받은 관광객의 기록된 사례는 없습니다.",
        },
        {
          q: "중국에서 어떤 VPN 프로토콜이 가장 효과적인가요?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark), 독점 난독화 프로토콜이 가장 효과적입니다.",
        },
        {
          q: "중국에 있는 동안 VPN에 가입할 수 있나요?",
          a: "매우 어렵습니다. 대부분의 VPN 웹사이트가 차단되어 있습니다. 항상 사전에 가입하세요.",
        },
        {
          q: "무료 VPN이 중국에서 작동하나요?",
          a: "거의 작동하지 않습니다. 무료 VPN은 필요한 난독화 기술이 부족합니다.",
        },
        {
          q: "ProtonVPN이 중국에서 작동하나요?",
          a: "아니요, ProtonVPN은 지속적으로 차단됩니다. ExpressVPN, Astrill 또는 Surfshark를 선택하세요.",
        },
      ],
      getVpn: "VPN 받기",
      readReview: "리뷰 읽기",
      worksInChina: "중국에서 작동",
      obfuscation: "난독화",
      stealth: "스텔스",
      sometimes: "때때로",
      blocked: "차단됨",
      lastUpdated: "마지막 업데이트: 2026년 11월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตพฤศจิกายน 2026",
      title: "VPN ที่ดีที่สุดสำหรับจีน",
      subtitle: "ข้ามกำแพงไฟจีนด้วย VPN ที่ใช้งานได้จริงในปี 2026",
      criticalWarning: "ดาวน์โหลดก่อนเดินทางมา",
      criticalWarningText:
        "เว็บไซต์ VPN และแอปสโตร์ถูกบลอกในจีน คุณต้องดาวน์โหลดและตั้งค่า VPN ก่อนเข้าประเทศ",
      legalStatus: "สถานะทางกฎหมายในจีน",
      legalStatusText:
        "VPN ถูกกฎหมายสำหรับชาวต่างชาติในจีน แม้ว่าจะมีการควบคุมทางเทคนิค ไม่มีบันทึกกรณีของชาวต่างชาติที่ถูกลงโทษจากการใช้ VPN ส่วนตัว",

      topVpns: "VPN อันดับต้น 3 ที่ใช้งานได้ในจีน (2026)",
      topVpnsText:
        "จากการทดสอบอย่างละเอียดโดยชาวต่างชาติและนักท่องเที่ยว VPN เหล่านี้สามารถข้ามกำแพงไฟจีนได้อย่างสม่ำเสมอด้วยเทคโนโลยีการปิดบังขั้นสูง",
      vpnDetails: {
        expressvpn: "เสถียรที่สุดด้วยเซิร์ฟเวอร์ RAM เท่านั้น เซิร์ฟเวอร์ซ่อนตัว และลิงก์ติดตั้งแบบมิเรอร์เมื่อไซต์หลักถูกบลอก",
        astrill: "ออกแบบมาเฉพาะสำหรับจีนด้วย StealthVPN และ Smart Mode ที่ชื่นชอบของชาวต่างชาติที่อาศัยอยู่ในจีน",
        surfshark: "ตัวเลือกที่เป็นมิตรกับงบประมาณพร้อม Camouflage Mode ความสมดุลที่ดีของราคาและความน่าเชื่อถือ",
      },

      sometimesWork: "VPN ที่บางครั้งใช้งานได้ในจีน (~70% ความสำเร็จ)",
      sometimesWorkText:
        "VPN เหล่านี้ใช้งานได้ในช่วงเวลาหนึ่ง แต่อาจถูกบลอกในช่วงเหตุการณ์ทางการเมืองที่ละเอียดอ่อนหรือการปราบปรามของรัฐบาล",
      sometimesWorkList: [
        { name: "NordVPN", feature: "มีเซิร์ฟเวอร์ปิดบัง" },
        { name: "VyprVPN", feature: "โปรโตคอล Chameleon สำหรับการปิดบัง" },
      ],

      dontWork: "VPN ที่ไม่ใช้งานได้ในจีน",
      dontWorkText:
        "VPN ยอดนิยมเหล่านี้ถูกบลอกโดยกำแพงไฟจีนอย่างสม่ำเสมอ อย่าเสียเงินถ้าคุณกำลังเดินทางไปจีน",
      dontWorkList: [
        "ProtonVPN - ไม่มีการปิดบัง ตรวจจับได้ง่าย",
        "TunnelBear - โปรโตคอลมาตรฐานถูกบลอก",
        "IPVanish - ไม่มีเซิร์ฟเวอร์ซ่อนตัว",
        "Private Internet Access (PIA) - ถูกบลอกอย่างสม่ำเสมอ",
        "AtlasVPN - ขาดคุณสมบัติเฉพาะสำหรับจีน",
        "CyberGhost - เซิร์ฟเวอร์ปกติถูกตรวจจับ",
      ],

      chineseVpnWarning: "คำเตือน: หลีกเลี่ยงแอป VPN จีน",
      chineseVpnWarningText:
        "แอป VPN จีนถูกควบคุมและตรวจสอบโดยรัฐบาล พวกเขาบันทึกกิจกรรมทั้งหมดของคุณและไม่เหมาะสำหรับความเป็นส่วนตัว หลีกเลี่ยงแอปเช่น:",
      chineseVpnApps: [
        "绿灯VPN (Green VPN)",
        "翻墙VPN Pro (Great Firewall VPN Pro)",
        "快喵VPN (Fast Cat VPN)",
        "VPN ฟรีจากแอปสโตร์จีน",
      ],
      chineseVpnWarningNote:
        "แอปเหล่านี้ไม่น่าเชื่อถือ ติดตามข้อมูลของคุณ และอาจรายงานกิจกรรมของคุณต่อเจ้าหน้าที่ ใช้บริการ VPN ระหว่างประเทศจากผู้ให้บริการที่เชื่อถือได้เสมอ",

      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับจีน",
      features: [
        {
          title: "เทคโนโลยีการปิดบัง",
          desc: "ปลอมแปลงการรับส่งข้อมูล VPN เพื่อหลีกเลี่ยงการตรวจจับ",
        },
        {
          title: "โปรโตคอลหลายแบบ",
          desc: "StealthVPN, Camouflage Mode, โปรโตคอล Chameleon ที่ใช้งานได้เมื่ออื่นล้มเหลว",
        },
        {
          title: "เซิร์ฟเวอร์ใกล้เคียง",
          desc: "เซิร์ฟเวอร์ในฮ่องกง ญี่ปุ่น สิงคโปร์ เพื่อความเร็วที่ดีขึ้น",
        },
        {
          title: "การสนับสนุนตลอด 24/7",
          desc: "การสนับสนุนแชทสดเพื่อช่วยเหลือเมื่อเกิดปัญหาการเชื่อมต่อ",
        },
      ],
      blockedServices: "บริการที่ถูกบลอกในจีน",
      blockedList: [
        "Google (ค้นหา, Gmail, แผนที่, ไดรฟ์)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "เว็บไซต์ข่าวและแอปส่งข้อความหลายแห่ง",
      ],
      tips: "เคล็ดลับการใช้ VPN ในจีน",
      tipsList: [
        "ดาวน์โหลด VPN หลายตัวเป็นสำรอง",
        "ติดตั้งแอปก่อนมาถึงจีน",
        "ลองใช้เซิร์ฟเวอร์ฮ่องกงหรือญี่ปุ่น",
        "ใช้โหมดปิดบัง/ซ่อนตัว",
        "บันทึกแผนที่ออฟไลน์และเอกสารสำคัญก่อนเดินทาง",
        "ความเร็ว VPN อาจแตกต่างกัน - ความอดทนเป็นกุญแจสำคัญ",
      ],
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ VPN ในจีน",
      faqs: [
        {
          q: "การใช้ VPN ในจีนในฐานะนักท่องเที่ยวปลอดภัยหรือไม่?",
          a: "ใช่ ไม่มีบันทึกกรณีของนักท่องเที่ยวที่ถูกลงโทษจากการใช้ VPN",
        },
        {
          q: "โปรโตคอล VPN แบบไหนที่ใช้งานได้ดีที่สุดในจีน?",
          a: "StealthVPN (Astrill), Camouflage Mode (Surfshark) และโปรโตคอลปิดบังที่เป็นกรรมสิทธิ์ใช้งานได้ดีที่สุด",
        },
        {
          q: "ฉันสามารถสมัคร VPN ขณะอยู่ในจีนได้หรือไม่?",
          a: "ยากมาก เว็บไซต์ VPN ส่วนใหญ่ถูกบลอก สมัครก่อนเสมอ",
        },
        {
          q: "VPN ฟรีใช้งานได้ในจีนหรือไม่?",
          a: "แทบจะไม่เคย VPN ฟรีขาดเทคโนโลยีการปิดบังที่จำเป็น",
        },
        {
          q: "ProtonVPN ใช้งานได้ในจีนหรือไม่?",
          a: "ไม่ได้ ProtonVPN ถูกบลอกอย่างสม่ำเสมอ เลือก ExpressVPN, Astrill หรือ Surfshark",
        },
      ],
      getVpn: "รับ VPN",
      readReview: "อ่านรีวิว",
      worksInChina: "ใช้งานได้ในจีน",
      obfuscation: "การปิดบัง",
      stealth: "ซ่อนตัว",
      sometimes: "บางครั้ง",
      blocked: "ถูกบลอก",
      lastUpdated: "อัปเดตล่าสุด: พฤศจิกายน 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <CountryVpnSchema vpns={topChinaVpns} locale={locale} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Countries", href: "/countries" },
              { name: "China", href: "/countries/china" }
            ]}
          />
        </div>

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
                <span className="text-6xl">🇨🇳</span>
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

        {/* Critical Warning */}
        <section className="py-8">
          <div className="container">
            <Card className="border-red-500 bg-red-500/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-red-500 mb-2">
                      {t.criticalWarning}
                    </h2>
                    <p className="text-muted-foreground">
                      {t.criticalWarningText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Scale className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                  <p className="text-muted-foreground">{t.legalStatusText}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Legal for foreigners
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Technically regulated
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 VPNs That Work */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.topVpns}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.topVpnsText}
              </p>
            </div>

            <div className="space-y-6">
              {topChinaVpns.map((vpn, index) => (
                <Card key={vpn.id} className="overflow-hidden border-2 border-green-500/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Rank */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-green-500">
                          #{index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold">{vpn.name}</h3>
                          <RatingStars rating={vpn.overallRating} size="sm" />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-4">
                          {t.vpnDetails[vpn.slug as keyof typeof t.vpnDetails]}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm">{t.worksInChina}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-blue-500" />
                            <span className="text-sm">{t.stealth}</span>
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
                      </div>

                      {/* Price & CTA */}
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
              ))}
            </div>
          </div>
        </section>

        {/* VPNs That Sometimes Work */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{t.sometimesWork}</h2>
                <p className="text-muted-foreground">
                  {t.sometimesWorkText}
                </p>
              </div>
              <Card className="border-yellow-500/30">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {t.sometimesWorkList.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.feature}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* VPNs That DON'T Work */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-red-500">{t.dontWork}</h2>
                <p className="text-muted-foreground">
                  {t.dontWorkText}
                </p>
              </div>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {t.dontWorkList.map((vpn, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{vpn}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Chinese VPN Warning */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="border-red-600 bg-red-600/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Ban className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-red-600 mb-2">
                        {t.chineseVpnWarning}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {t.chineseVpnWarningText}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 ml-12">
                    {t.chineseVpnApps.map((app, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-mono">{app}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 ml-12 p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t.chineseVpnWarningNote}
                    </p>
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
                        {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                        {index === 2 && <Globe className="h-6 w-6 text-primary" />}
                        {index === 3 && <Info className="h-6 w-6 text-primary" />}
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
                    {t.blockedList.map((service, index) => (
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
                    href="https://en.wikipedia.org/wiki/Great_Firewall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Great Firewall - Wikipedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.privacyjournal.net/are-vpns-legal-in-china/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Privacy Journal - Are VPNs Legal in China?
                  </a>
                </li>
                <li>
                  <a
                    href="https://surfshark.com/blog/vpn-in-china"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Surfshark - Can you use a VPN in China?
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
                { title: "Best VPN for China", description: "Top VPNs that bypass the Great Firewall", href: "/best/vpn-china", icon: "trophy" },
                { title: "VPN Guide: Russia", description: "Internet restrictions and VPN use in Russia", href: "/countries/russia", icon: "globe" },
                { title: "VPN Guide: Iran", description: "Overcome strict DPI censorship in Iran", href: "/countries/iran", icon: "globe" },
                { title: "What is a VPN?", description: "Learn how VPNs protect your privacy", href: "/guides/what-is-vpn", icon: "shield" }
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
