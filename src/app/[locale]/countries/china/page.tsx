import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Download,
  Clock,
  ArrowRight,
  Info,
  Scale,
  Smartphone,
  Lock,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for China 2025: Bypass the Great Firewall | ZeroToVPN",
    nl: "Beste VPN voor China 2025: Omzeil de Chinese Firewall | ZeroToVPN",
    de: "Beste VPN für China 2025: Die Große Firewall umgehen | ZeroToVPN",
    es: "Mejor VPN para China 2025: Evita el Gran Cortafuegos | ZeroToVPN",
    fr: "Meilleur VPN pour la Chine 2025: Contourner le Grand Pare-feu | ZeroToVPN",
    zh: "2025年中国最佳VPN：突破防火长城 | ZeroToVPN",
    ja: "2025年中国向けベストVPN：グレートファイアウォールを突破 | ZeroToVPN",
    ko: "2025년 중국 최고의 VPN: 만리방화벽 우회 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับจีน 2025: ข้ามกำแพงไฟจีน | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find VPNs that actually work in China in 2025. Expert-tested solutions to bypass the Great Firewall. Download before you travel!",
    nl: "Vind VPNs die echt werken in China in 2025. Expert-geteste oplossingen om de Chinese Firewall te omzeilen.",
    de: "Finden Sie VPNs, die 2025 tatsächlich in China funktionieren. Expertentestete Lösungen zur Umgehung der Großen Firewall.",
    es: "Encuentra VPNs que realmente funcionan en China en 2025. Soluciones probadas por expertos para evitar el Gran Cortafuegos.",
    fr: "Trouvez des VPN qui fonctionnent vraiment en Chine en 2025. Solutions testées par des experts pour contourner le Grand Pare-feu.",
    zh: "发现2025年真正在中国有效的VPN。经专家测试的突破防火长城解决方案。旅行前下载！",
    ja: "2025年に中国で実際に機能するVPNを見つけましょう。グレートファイアウォールを突破する専門家テスト済みソリューション。",
    ko: "2025년 중국에서 실제로 작동하는 VPN을 찾아보세요. 만리방화벽을 우회하는 전문가 테스트 솔루션.",
    th: "ค้นหา VPN ที่ใช้งานได้จริงในจีนปี 2025 โซลูชันที่ผ่านการทดสอบจากผู้เชี่ยวชาญเพื่อข้ามกำแพงไฟจีน",
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

// Country-specific schema
function CountryVpnSchema({ vpns, locale }: { vpns: VpnProvider[]; locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best VPN for China 2025",
    description: "Expert guide to VPNs that work in China, bypassing the Great Firewall",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
    },
    dateModified: "2025-11-30",
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

  // VPNs known to work in China (based on research)
  const chinaVpns = allVpns.filter((vpn) =>
    ["expressvpn", "nordvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for China",
      subtitle: "Bypass the Great Firewall with VPNs that actually work in 2025",
      criticalWarning: "Download Before You Arrive",
      criticalWarningText:
        "VPN websites and app stores are blocked in China. You MUST download and set up your VPN before entering the country.",
      legalStatus: "Legal Status in China",
      legalStatusText:
        "VPNs are legal for foreigners to use in China, though technically regulated. There are no recorded cases of foreigners being penalized for personal VPN use. Chinese nationals face stricter enforcement.",
      whatWorks: "VPNs That Work in China (2025)",
      whatWorksText:
        "The Great Firewall actively blocks most VPN services. Only VPNs with advanced obfuscation technology can reliably bypass it. These VPNs use protocols like Shadowsocks that disguise VPN traffic as regular HTTPS traffic.",
      keyFeatures: "Essential Features for China",
      features: [
        {
          title: "Obfuscation Technology",
          desc: "Disguises VPN traffic to avoid detection by the Great Firewall",
        },
        {
          title: "Multiple Protocols",
          desc: "Shadowsocks, Lightway, or custom protocols that work when others fail",
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
      blocked: [
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
          a: "Shadowsocks and proprietary obfuscated protocols work best. Standard OpenVPN and WireGuard are often blocked. ExpressVPN's Lightway and NordVPN's obfuscated servers are specifically designed to bypass the Great Firewall.",
        },
        {
          q: "Can I sign up for a VPN while in China?",
          a: "It's extremely difficult. Most VPN websites are blocked, and payment processors may not work. Always sign up and download your VPN before traveling to China.",
        },
        {
          q: "Do free VPNs work in China?",
          a: "Almost never. Free VPNs lack the obfuscation technology needed to bypass the Great Firewall. They also pose security risks. Invest in a premium VPN for reliable access.",
        },
      ],
      getVpn: "Get VPN",
      readReview: "Read Review",
      worksInChina: "Works in China",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor China",
      subtitle: "Omzeil de Grote Firewall met VPNs die echt werken in 2025",
      criticalWarning: "Download Voordat Je Vertrekt",
      criticalWarningText:
        "VPN-websites en app stores zijn geblokkeerd in China. Je MOET je VPN downloaden en instellen voordat je het land binnenkomt.",
      legalStatus: "Juridische Status in China",
      legalStatusText:
        "VPNs zijn legaal voor buitenlanders in China, hoewel technisch gereguleerd. Er zijn geen gevallen bekend van buitenlanders die gestraft zijn voor persoonlijk VPN-gebruik.",
      whatWorks: "VPNs Die Werken in China (2025)",
      whatWorksText:
        "De Grote Firewall blokkeert actief de meeste VPN-diensten. Alleen VPNs met geavanceerde obfuscatie-technologie kunnen betrouwbaar werken.",
      keyFeatures: "Essentiële Functies voor China",
      features: [
        {
          title: "Obfuscatie Technologie",
          desc: "Vermomt VPN-verkeer om detectie te voorkomen",
        },
        {
          title: "Meerdere Protocollen",
          desc: "Shadowsocks of aangepaste protocollen die werken wanneer anderen falen",
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
      blocked: [
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
          a: "Shadowsocks en eigen obfuscated protocollen werken het beste. Standaard OpenVPN en WireGuard worden vaak geblokkeerd.",
        },
        {
          q: "Kan ik me aanmelden voor een VPN terwijl ik in China ben?",
          a: "Het is erg moeilijk. De meeste VPN-websites zijn geblokkeerd. Meld je altijd aan voordat je naar China reist.",
        },
        {
          q: "Werken gratis VPNs in China?",
          a: "Bijna nooit. Gratis VPNs missen de obfuscatie-technologie die nodig is om de Grote Firewall te omzeilen.",
        },
      ],
      getVpn: "Download VPN",
      readReview: "Lees Review",
      worksInChina: "Werkt in China",
      obfuscation: "Obfuscatie",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert November 2025",
      title: "Beste VPN für China",
      subtitle: "Umgehen Sie die Große Firewall mit VPNs, die 2025 wirklich funktionieren",
      criticalWarning: "Vor der Ankunft herunterladen",
      criticalWarningText:
        "VPN-Websites und App-Stores sind in China blockiert. Sie MÜSSEN Ihr VPN herunterladen und einrichten, BEVOR Sie in das Land einreisen.",
      legalStatus: "Rechtlicher Status in China",
      legalStatusText:
        "VPNs sind für Ausländer in China legal, obwohl technisch reguliert. Es gibt keine dokumentierten Fälle von Ausländern, die für die persönliche VPN-Nutzung bestraft wurden. Chinesische Staatsangehörige unterliegen strengerer Durchsetzung.",
      whatWorks: "VPNs, die in China funktionieren (2025)",
      whatWorksText:
        "Die Große Firewall blockiert aktiv die meisten VPN-Dienste. Nur VPNs mit fortschrittlicher Verschleierungstechnologie können sie zuverlässig umgehen. Diese VPNs verwenden Protokolle wie Shadowsocks, die VPN-Traffic als regulären HTTPS-Traffic tarnen.",
      keyFeatures: "Wesentliche Funktionen für China",
      features: [
        {
          title: "Verschleierungstechnologie",
          desc: "Tarnt VPN-Traffic, um Erkennung durch die Große Firewall zu vermeiden",
        },
        {
          title: "Mehrere Protokolle",
          desc: "Shadowsocks, Lightway oder benutzerdefinierte Protokolle, die funktionieren, wenn andere versagen",
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
      blocked: [
        "Google (Suche, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Viele Nachrichtenseiten und Messaging-Apps",
      ],
      tips: "Tipps zur VPN-Nutzung in China",
      tipsList: [
        "Laden Sie mehrere VPNs als Backup herunter - eines funktioniert möglicherweise, wenn ein anderes nicht funktioniert",
        "Installieren Sie Apps und konfigurieren Sie vor der Ankunft in China",
        "Probieren Sie Hongkong- oder Japan-Server für beste Geschwindigkeiten",
        "Verwenden Sie den verschleierten/Stealth-Modus in Ihren VPN-Einstellungen",
        "Speichern Sie Offline-Karten und wichtige Dokumente vor der Reise",
        "VPN-Geschwindigkeiten können variieren - Geduld ist der Schlüssel",
      ],
      faqTitle: "China VPN FAQ",
      faqs: [
        {
          q: "Ist es sicher, als Tourist in China ein VPN zu verwenden?",
          a: "Ja, es gibt keine dokumentierten Fälle von Touristen, die für VPN-Nutzung bestraft wurden. VPNs werden von Ausländern häufig für Arbeit und Verbindung verwendet. Die Regierung zielt hauptsächlich auf nicht autorisierte VPN-Anbieter ab, nicht auf Nutzer.",
        },
        {
          q: "Welches VPN-Protokoll funktioniert am besten in China?",
          a: "Shadowsocks und proprietäre verschleierte Protokolle funktionieren am besten. Standard-OpenVPN und WireGuard werden oft blockiert. ExpressVPNs Lightway und NordVPNs verschleierte Server sind speziell dafür entwickelt, die Große Firewall zu umgehen.",
        },
        {
          q: "Kann ich mich für ein VPN anmelden, während ich in China bin?",
          a: "Es ist extrem schwierig. Die meisten VPN-Websites sind blockiert und Zahlungsabwickler funktionieren möglicherweise nicht. Melden Sie sich immer an und laden Sie Ihr VPN vor der Reise nach China herunter.",
        },
        {
          q: "Funktionieren kostenlose VPNs in China?",
          a: "Fast nie. Kostenlosen VPNs fehlt die Verschleierungstechnologie, die zum Umgehen der Großen Firewall erforderlich ist. Sie stellen auch Sicherheitsrisiken dar. Investieren Sie in ein Premium-VPN für zuverlässigen Zugang.",
        },
      ],
      getVpn: "VPN herunterladen",
      readReview: "Rezension lesen",
      worksInChina: "Funktioniert in China",
      obfuscation: "Verschleierung",
      lastUpdated: "Zuletzt aktualisiert: November 2025",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado noviembre 2025",
      title: "Mejor VPN para China",
      subtitle: "Evita el Gran Cortafuegos con VPNs que realmente funcionan en 2025",
      criticalWarning: "Descarga antes de llegar",
      criticalWarningText:
        "Los sitios web de VPN y las tiendas de aplicaciones están bloqueados en China. DEBES descargar y configurar tu VPN ANTES de entrar al país.",
      legalStatus: "Estado legal en China",
      legalStatusText:
        "Las VPN son legales para extranjeros en China, aunque técnicamente reguladas. No hay casos registrados de extranjeros penalizados por uso personal de VPN. Los ciudadanos chinos enfrentan una aplicación más estricta.",
      whatWorks: "VPNs que funcionan en China (2025)",
      whatWorksText:
        "El Gran Cortafuegos bloquea activamente la mayoría de los servicios VPN. Solo las VPN con tecnología de ofuscación avanzada pueden eludirlo de manera confiable. Estas VPN usan protocolos como Shadowsocks que disfrazan el tráfico VPN como tráfico HTTPS regular.",
      keyFeatures: "Características esenciales para China",
      features: [
        {
          title: "Tecnología de ofuscación",
          desc: "Disfraza el tráfico VPN para evitar la detección del Gran Cortafuegos",
        },
        {
          title: "Múltiples protocolos",
          desc: "Shadowsocks, Lightway o protocolos personalizados que funcionan cuando otros fallan",
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
      blocked: [
        "Google (Búsqueda, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "Muchos sitios de noticias y aplicaciones de mensajería",
      ],
      tips: "Consejos para usar VPN en China",
      tipsList: [
        "Descarga múltiples VPN como respaldo - uno puede funcionar cuando otro no",
        "Instala aplicaciones y configura antes de llegar a China",
        "Prueba servidores de Hong Kong o Japón para mejores velocidades",
        "Usa el modo ofuscado/sigiloso en la configuración de tu VPN",
        "Guarda mapas sin conexión y documentos importantes antes de viajar",
        "Las velocidades de VPN pueden variar - la paciencia es clave",
      ],
      faqTitle: "Preguntas frecuentes sobre VPN en China",
      faqs: [
        {
          q: "¿Es seguro usar una VPN en China como turista?",
          a: "Sí, no hay casos registrados de turistas penalizados por uso de VPN. Las VPN son ampliamente utilizadas por extranjeros para trabajar y mantenerse conectados. El gobierno principalmente apunta a proveedores de VPN no autorizados, no a usuarios.",
        },
        {
          q: "¿Qué protocolo VPN funciona mejor en China?",
          a: "Shadowsocks y protocolos ofuscados propietarios funcionan mejor. OpenVPN y WireGuard estándar suelen estar bloqueados. Lightway de ExpressVPN y los servidores ofuscados de NordVPN están diseñados específicamente para eludir el Gran Cortafuegos.",
        },
        {
          q: "¿Puedo registrarme en una VPN mientras estoy en China?",
          a: "Es extremadamente difícil. La mayoría de los sitios web de VPN están bloqueados y los procesadores de pago pueden no funcionar. Siempre regístrate y descarga tu VPN antes de viajar a China.",
        },
        {
          q: "¿Funcionan las VPN gratuitas en China?",
          a: "Casi nunca. Las VPN gratuitas carecen de la tecnología de ofuscación necesaria para eludir el Gran Cortafuegos. También presentan riesgos de seguridad. Invierte en una VPN premium para acceso confiable.",
        },
      ],
      getVpn: "Obtener VPN",
      readReview: "Leer reseña",
      worksInChina: "Funciona en China",
      obfuscation: "Ofuscación",
      lastUpdated: "Última actualización: noviembre 2025",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour novembre 2025",
      title: "Meilleur VPN pour la Chine",
      subtitle: "Contournez le Grand Pare-feu avec des VPN qui fonctionnent vraiment en 2025",
      criticalWarning: "Téléchargez avant d'arriver",
      criticalWarningText:
        "Les sites Web VPN et les magasins d'applications sont bloqués en Chine. Vous DEVEZ télécharger et configurer votre VPN AVANT d'entrer dans le pays.",
      legalStatus: "Statut légal en Chine",
      legalStatusText:
        "Les VPN sont légaux pour les étrangers en Chine, bien que techniquement réglementés. Il n'y a aucun cas enregistré d'étrangers pénalisés pour l'utilisation personnelle de VPN. Les ressortissants chinois font face à une application plus stricte.",
      whatWorks: "VPN qui fonctionnent en Chine (2025)",
      whatWorksText:
        "Le Grand Pare-feu bloque activement la plupart des services VPN. Seuls les VPN avec technologie d'obscurcissement avancée peuvent le contourner de manière fiable. Ces VPN utilisent des protocoles comme Shadowsocks qui déguisent le trafic VPN en trafic HTTPS régulier.",
      keyFeatures: "Fonctionnalités essentielles pour la Chine",
      features: [
        {
          title: "Technologie d'obscurcissement",
          desc: "Déguise le trafic VPN pour éviter la détection par le Grand Pare-feu",
        },
        {
          title: "Protocoles multiples",
          desc: "Shadowsocks, Lightway ou protocoles personnalisés qui fonctionnent quand d'autres échouent",
        },
        {
          title: "Serveurs à proximité",
          desc: "Serveurs à Hong Kong, Japon, Singapour pour de meilleures vitesses",
        },
        {
          title: "Support 24/7",
          desc: "Support par chat en direct pour aider en cas de problèmes de connexion",
        },
      ],
      blockedServices: "Services bloqués en Chine",
      blocked: [
        "Google (Recherche, Gmail, Maps, Drive)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "De nombreux sites d'actualités et applications de messagerie",
      ],
      tips: "Conseils pour utiliser un VPN en Chine",
      tipsList: [
        "Téléchargez plusieurs VPN comme sauvegarde - l'un peut fonctionner quand l'autre ne fonctionne pas",
        "Installez les applications et configurez avant d'arriver en Chine",
        "Essayez les serveurs de Hong Kong ou du Japon pour de meilleures vitesses",
        "Utilisez le mode obscurci/furtif dans les paramètres de votre VPN",
        "Enregistrez des cartes hors ligne et des documents importants avant de voyager",
        "Les vitesses VPN peuvent varier - la patience est essentielle",
      ],
      faqTitle: "FAQ VPN Chine",
      faqs: [
        {
          q: "Est-il sûr d'utiliser un VPN en Chine en tant que touriste ?",
          a: "Oui, il n'y a aucun cas enregistré de touristes pénalisés pour l'utilisation de VPN. Les VPN sont largement utilisés par les étrangers pour le travail et rester connectés. Le gouvernement cible principalement les fournisseurs de VPN non autorisés, pas les utilisateurs.",
        },
        {
          q: "Quel protocole VPN fonctionne le mieux en Chine ?",
          a: "Shadowsocks et les protocoles obscurcis propriétaires fonctionnent le mieux. OpenVPN et WireGuard standard sont souvent bloqués. Lightway d'ExpressVPN et les serveurs obscurcis de NordVPN sont spécifiquement conçus pour contourner le Grand Pare-feu.",
        },
        {
          q: "Puis-je m'inscrire à un VPN en étant en Chine ?",
          a: "C'est extrêmement difficile. La plupart des sites Web VPN sont bloqués et les processeurs de paiement peuvent ne pas fonctionner. Inscrivez-vous toujours et téléchargez votre VPN avant de voyager en Chine.",
        },
        {
          q: "Les VPN gratuits fonctionnent-ils en Chine ?",
          a: "Presque jamais. Les VPN gratuits manquent de la technologie d'obscurcissement nécessaire pour contourner le Grand Pare-feu. Ils présentent également des risques de sécurité. Investissez dans un VPN premium pour un accès fiable.",
        },
      ],
      getVpn: "Obtenir VPN",
      readReview: "Lire l'avis",
      worksInChina: "Fonctionne en Chine",
      obfuscation: "Obscurcissement",
      lastUpdated: "Dernière mise à jour : novembre 2025",
      sources: "Sources",
    },
    zh: {
      badge: "2025年11月更新",
      title: "中国最佳VPN",
      subtitle: "使用2025年真正有效的VPN突破防火长城",
      criticalWarning: "抵达前下载",
      criticalWarningText:
        "VPN网站和应用商店在中国被封锁。您必须在进入中国之前下载并设置您的VPN。",
      legalStatus: "中国的法律地位",
      legalStatusText:
        "VPN对外国人来说在中国是合法的，尽管在技术上受到监管。没有外国人因个人使用VPN而受到处罚的记录案例。中国公民面临更严格的执法。",
      whatWorks: "在中国有效的VPN（2025年）",
      whatWorksText:
        "防火长城主动封锁大多数VPN服务。只有具备先进混淆技术的VPN才能可靠地突破它。这些VPN使用Shadowsocks等协议将VPN流量伪装成常规HTTPS流量。",
      keyFeatures: "中国必备功能",
      features: [
        {
          title: "混淆技术",
          desc: "伪装VPN流量以避免被防火长城检测",
        },
        {
          title: "多种协议",
          desc: "Shadowsocks、Lightway或其他协议失败时仍能工作的自定义协议",
        },
        {
          title: "附近服务器",
          desc: "香港、日本、新加坡的服务器可提供更快的速度",
        },
        {
          title: "全天候支持",
          desc: "连接问题出现时提供实时聊天支持",
        },
      ],
      blockedServices: "中国封锁的服务",
      blocked: [
        "谷歌（搜索、Gmail、地图、云端硬盘）",
        "Facebook、Instagram、WhatsApp",
        "YouTube、Netflix、Spotify",
        "Twitter/X、Reddit、维基百科",
        "许多新闻网站和消息应用",
      ],
      tips: "在中国使用VPN的提示",
      tipsList: [
        "下载多个VPN作为备份 - 当一个不工作时另一个可能有效",
        "在抵达中国之前安装应用程序并配置",
        "尝试香港或日本服务器以获得最佳速度",
        "在VPN设置中使用混淆/隐身模式",
        "旅行前保存离线地图和重要文档",
        "VPN速度可能会变化 - 耐心是关键",
      ],
      faqTitle: "中国VPN常见问题",
      faqs: [
        {
          q: "作为游客在中国使用VPN安全吗？",
          a: "是的，没有游客因使用VPN而受到处罚的记录案例。外国人广泛使用VPN进行工作和保持联系。政府主要针对未经授权的VPN提供商，而非用户。",
        },
        {
          q: "哪种VPN协议在中国最有效？",
          a: "Shadowsocks和专有混淆协议效果最好。标准OpenVPN和WireGuard经常被封锁。ExpressVPN的Lightway和NordVPN的混淆服务器专门设计用于突破防火长城。",
        },
        {
          q: "我可以在中国时注册VPN吗？",
          a: "极其困难。大多数VPN网站被封锁，支付处理器可能无法使用。请务必在前往中国之前注册并下载您的VPN。",
        },
        {
          q: "免费VPN在中国有效吗？",
          a: "几乎从不有效。免费VPN缺乏突破防火长城所需的混淆技术。它们也存在安全风险。投资高级VPN以获得可靠访问。",
        },
      ],
      getVpn: "获取VPN",
      readReview: "阅读评测",
      worksInChina: "在中国有效",
      obfuscation: "混淆",
      lastUpdated: "最后更新：2025年11月",
      sources: "来源",
    },
    ja: {
      badge: "2025年11月更新",
      title: "中国向けベストVPN",
      subtitle: "2025年に実際に機能するVPNでグレートファイアウォールを突破",
      criticalWarning: "到着前にダウンロード",
      criticalWarningText:
        "VPNウェブサイトとアプリストアは中国でブロックされています。入国前にVPNをダウンロードして設定する必要があります。",
      legalStatus: "中国での法的地位",
      legalStatusText:
        "VPNは技術的には規制されていますが、外国人が中国で使用することは合法です。個人的なVPN使用で罰せられた外国人の記録はありません。中国国民はより厳しい取り締まりに直面しています。",
      whatWorks: "中国で機能するVPN（2025年）",
      whatWorksText:
        "グレートファイアウォールはほとんどのVPNサービスを積極的にブロックしています。高度な難読化技術を持つVPNのみが確実にそれを回避できます。これらのVPNはShadowsocksなどのプロトコルを使用してVPNトラフィックを通常のHTTPSトラフィックに偽装します。",
      keyFeatures: "中国に必須の機能",
      features: [
        {
          title: "難読化技術",
          desc: "グレートファイアウォールによる検出を避けるためにVPNトラフィックを偽装",
        },
        {
          title: "複数のプロトコル",
          desc: "他のプロトコルが失敗したときに機能するShadowsocks、Lightway、またはカスタムプロトコル",
        },
        {
          title: "近隣サーバー",
          desc: "より良い速度のために香港、日本、シンガポールのサーバー",
        },
        {
          title: "24時間365日サポート",
          desc: "接続問題が発生したときに役立つライブチャットサポート",
        },
      ],
      blockedServices: "中国でブロックされているサービス",
      blocked: [
        "Google（検索、Gmail、マップ、ドライブ）",
        "Facebook、Instagram、WhatsApp",
        "YouTube、Netflix、Spotify",
        "Twitter/X、Reddit、Wikipedia",
        "多くのニュースサイトとメッセージングアプリ",
      ],
      tips: "中国でVPNを使用するためのヒント",
      tipsList: [
        "バックアップとして複数のVPNをダウンロード - 1つが機能しないときに別のものが機能する可能性があります",
        "中国に到着する前にアプリをインストールして設定",
        "最高速度のために香港または日本のサーバーを試す",
        "VPN設定で難読化/ステルスモードを使用",
        "旅行前にオフラインマップと重要な書類を保存",
        "VPN速度は変動する可能性があります - 忍耐が鍵です",
      ],
      faqTitle: "中国VPN FAQ",
      faqs: [
        {
          q: "観光客として中国でVPNを使用するのは安全ですか？",
          a: "はい、VPN使用で罰せられた観光客の記録はありません。VPNは外国人が仕事や接続を維持するために広く使用されています。政府は主に無許可のVPNプロバイダーを標的にしており、ユーザーではありません。",
        },
        {
          q: "中国でどのVPNプロトコルが最も効果的ですか？",
          a: "Shadowsocksと独自の難読化プロトコルが最も効果的です。標準のOpenVPNとWireGuardはしばしばブロックされます。ExpressVPNのLightwayとNordVPNの難読化サーバーはグレートファイアウォールを回避するために特別に設計されています。",
        },
        {
          q: "中国にいる間にVPNに登録できますか？",
          a: "非常に困難です。ほとんどのVPNウェブサイトがブロックされており、支払い処理業者が機能しない可能性があります。中国に旅行する前に必ず登録してVPNをダウンロードしてください。",
        },
        {
          q: "無料VPNは中国で機能しますか？",
          a: "ほとんど機能しません。無料VPNにはグレートファイアウォールを回避するために必要な難読化技術がありません。また、セキュリティリスクもあります。信頼性の高いアクセスのためにプレミアムVPNに投資してください。",
        },
      ],
      getVpn: "VPNを入手",
      readReview: "レビューを読む",
      worksInChina: "中国で機能",
      obfuscation: "難読化",
      lastUpdated: "最終更新：2025年11月",
      sources: "情報源",
    },
    ko: {
      badge: "2025년 11월 업데이트",
      title: "중국 최고의 VPN",
      subtitle: "2025년에 실제로 작동하는 VPN으로 만리방화벽 우회",
      criticalWarning: "도착 전 다운로드",
      criticalWarningText:
        "VPN 웹사이트와 앱 스토어는 중국에서 차단됩니다. 입국 전에 VPN을 다운로드하고 설정해야 합니다.",
      legalStatus: "중국의 법적 지위",
      legalStatusText:
        "VPN은 기술적으로 규제되지만 외국인이 중국에서 사용하는 것은 합법입니다. 개인적인 VPN 사용으로 처벌받은 외국인의 기록된 사례는 없습니다. 중국 국민은 더 엄격한 집행에 직면합니다.",
      whatWorks: "중국에서 작동하는 VPN (2025년)",
      whatWorksText:
        "만리방화벽은 대부분의 VPN 서비스를 적극적으로 차단합니다. 고급 난독화 기술을 갖춘 VPN만이 안정적으로 우회할 수 있습니다. 이러한 VPN은 VPN 트래픽을 일반 HTTPS 트래픽으로 위장하는 Shadowsocks와 같은 프로토콜을 사용합니다.",
      keyFeatures: "중국 필수 기능",
      features: [
        {
          title: "난독화 기술",
          desc: "만리방화벽의 탐지를 피하기 위해 VPN 트래픽 위장",
        },
        {
          title: "다중 프로토콜",
          desc: "다른 프로토콜이 실패할 때 작동하는 Shadowsocks, Lightway 또는 사용자 지정 프로토콜",
        },
        {
          title: "인근 서버",
          desc: "더 나은 속도를 위한 홍콩, 일본, 싱가포르 서버",
        },
        {
          title: "연중무휴 지원",
          desc: "연결 문제 발생 시 도움을 주는 실시간 채팅 지원",
        },
      ],
      blockedServices: "중국에서 차단된 서비스",
      blocked: [
        "구글 (검색, Gmail, 지도, 드라이브)",
        "페이스북, 인스타그램, 왓츠앱",
        "유튜브, 넷플릭스, 스포티파이",
        "트위터/X, 레딧, 위키피디아",
        "많은 뉴스 사이트 및 메시징 앱",
      ],
      tips: "중국에서 VPN 사용 팁",
      tipsList: [
        "백업으로 여러 VPN 다운로드 - 하나가 작동하지 않을 때 다른 것이 작동할 수 있습니다",
        "중국 도착 전에 앱 설치 및 구성",
        "최상의 속도를 위해 홍콩 또는 일본 서버 시도",
        "VPN 설정에서 난독화/스텔스 모드 사용",
        "여행 전에 오프라인 지도와 중요한 문서 저장",
        "VPN 속도는 다를 수 있습니다 - 인내가 핵심입니다",
      ],
      faqTitle: "중국 VPN 자주 묻는 질문",
      faqs: [
        {
          q: "관광객으로서 중국에서 VPN을 사용하는 것이 안전한가요?",
          a: "예, VPN 사용으로 처벌받은 관광객의 기록된 사례는 없습니다. VPN은 외국인들이 업무와 연결 유지를 위해 널리 사용합니다. 정부는 주로 무허가 VPN 제공업체를 대상으로 하며 사용자는 아닙니다.",
        },
        {
          q: "중국에서 어떤 VPN 프로토콜이 가장 효과적인가요?",
          a: "Shadowsocks와 독점 난독화 프로토콜이 가장 효과적입니다. 표준 OpenVPN과 WireGuard는 종종 차단됩니다. ExpressVPN의 Lightway와 NordVPN의 난독화 서버는 만리방화벽을 우회하도록 특별히 설계되었습니다.",
        },
        {
          q: "중국에 있는 동안 VPN에 가입할 수 있나요?",
          a: "매우 어렵습니다. 대부분의 VPN 웹사이트가 차단되어 있고 결제 처리업체가 작동하지 않을 수 있습니다. 중국 여행 전에 항상 가입하고 VPN을 다운로드하세요.",
        },
        {
          q: "무료 VPN이 중국에서 작동하나요?",
          a: "거의 작동하지 않습니다. 무료 VPN은 만리방화벽을 우회하는 데 필요한 난독화 기술이 부족합니다. 또한 보안 위험이 있습니다. 안정적인 액세스를 위해 프리미엄 VPN에 투자하세요.",
        },
      ],
      getVpn: "VPN 받기",
      readReview: "리뷰 읽기",
      worksInChina: "중국에서 작동",
      obfuscation: "난독화",
      lastUpdated: "마지막 업데이트: 2025년 11월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตพฤศจิกายน 2025",
      title: "VPN ที่ดีที่สุดสำหรับจีน",
      subtitle: "ข้ามกำแพงไฟจีนด้วย VPN ที่ใช้งานได้จริงในปี 2025",
      criticalWarning: "ดาวน์โหลดก่อนเดินทางมา",
      criticalWarningText:
        "เว็บไซต์ VPN และแอปสโตร์ถูกบลอกในจีน คุณต้องดาวน์โหลดและตั้งค่า VPN ก่อนเข้าประเทศ",
      legalStatus: "สถานะทางกฎหมายในจีน",
      legalStatusText:
        "VPN ถูกกฎหมายสำหรับชาวต่างชาติในจีน แม้ว่าจะมีการควบคุมทางเทคนิค ไม่มีบันทึกกรณีของชาวต่างชาติที่ถูกลงโทษจากการใช้ VPN ส่วนตัว พลเมืองจีนเผชิญกับการบังคับใช้ที่เข้มงวดกว่า",
      whatWorks: "VPN ที่ใช้งานได้ในจีน (2025)",
      whatWorksText:
        "กำแพงไฟจีนบลอกบริการ VPN ส่วนใหญ่อย่างแข็งขัน เฉพาะ VPN ที่มีเทคโนโลยีการปิดบังขั้นสูงเท่านั้นที่สามารถข้ามได้อย่างน่าเชื่อถือ VPN เหล่านี้ใช้โปรโตคอลเช่น Shadowsocks ที่ปลอมแปลงการรับส่งข้อมูล VPN เป็นการรับส่งข้อมูล HTTPS ปกติ",
      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับจีน",
      features: [
        {
          title: "เทคโนโลยีการปิดบัง",
          desc: "ปลอมแปลงการรับส่งข้อมูล VPN เพื่อหลีกเลี่ยงการตรวจจับโดยกำแพงไฟจีน",
        },
        {
          title: "โปรโตคอลหลายแบบ",
          desc: "Shadowsocks, Lightway หรือโปรโตคอลที่กำหนดเองที่ใช้งานได้เมื่ออื่นล้มเหลว",
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
      blocked: [
        "Google (ค้นหา, Gmail, แผนที่, ไดรฟ์)",
        "Facebook, Instagram, WhatsApp",
        "YouTube, Netflix, Spotify",
        "Twitter/X, Reddit, Wikipedia",
        "เว็บไซต์ข่าวและแอปส่งข้อความหลายแห่ง",
      ],
      tips: "เคล็ดลับการใช้ VPN ในจีน",
      tipsList: [
        "ดาวน์โหลด VPN หลายตัวเป็นสำรอง - ตัวหนึ่งอาจใช้งานได้เมื่ออีกตัวไม่ได้",
        "ติดตั้งแอปและกำหนดค่าก่อนมาถึงจีน",
        "ลองใช้เซิร์ฟเวอร์ฮ่องกงหรือญี่ปุ่นเพื่อความเร็วที่ดีที่สุด",
        "ใช้โหมดปิดบัง/ซ่อนตัวในการตั้งค่า VPN ของคุณ",
        "บันทึกแผนที่ออฟไลน์และเอกสารสำคัญก่อนเดินทาง",
        "ความเร็ว VPN อาจแตกต่างกัน - ความอดทนเป็นกุญแจสำคัญ",
      ],
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ VPN ในจีน",
      faqs: [
        {
          q: "การใช้ VPN ในจีนในฐานะนักท่องเที่ยวปลอดภัยหรือไม่?",
          a: "ใช่ ไม่มีบันทึกกรณีของนักท่องเที่ยวที่ถูกลงโทษจากการใช้ VPN VPN ถูกใช้กันอย่างแพร่หลายโดยชาวต่างชาติเพื่อการทำงานและการเชื่อมต่อ รัฐบาลมุ่งเป้าหมายไปที่ผู้ให้บริการ VPN ที่ไม่ได้รับอนุญาตเป็นหลัก ไม่ใช่ผู้ใช้",
        },
        {
          q: "โปรโตคอล VPN แบบไหนที่ใช้งานได้ดีที่สุดในจีน?",
          a: "Shadowsocks และโปรโตคอลปิดบังที่เป็นกรรมสิทธิ์ใช้งานได้ดีที่สุด OpenVPN และ WireGuard มาตรฐานมักถูกบลอก Lightway ของ ExpressVPN และเซิร์ฟเวอร์ปิดบังของ NordVPN ถูกออกแบบมาโดยเฉพาะเพื่อข้ามกำแพงไฟจีน",
        },
        {
          q: "ฉันสามารถสมัคร VPN ขณะอยู่ในจีนได้หรือไม่?",
          a: "ยากมาก เว็บไซต์ VPN ส่วนใหญ่ถูกบลอกและตัวประมวลผลการชำระเงินอาจไม่ทำงาน สมัครและดาวน์โหลด VPN ของคุณก่อนเดินทางไปจีนเสมอ",
        },
        {
          q: "VPN ฟรีใช้งานได้ในจีนหรือไม่?",
          a: "แทบจะไม่เคย VPN ฟรีขาดเทคโนโลยีการปิดบังที่จำเป็นในการข้ามกำแพงไฟจีน นอกจากนี้ยังมีความเสี่ยงด้านความปลอดภัย ลงทุนใน VPN พรีเมียมเพื่อการเข้าถึงที่เชื่อถือได้",
        },
      ],
      getVpn: "รับ VPN",
      readReview: "อ่านรีวิว",
      worksInChina: "ใช้งานได้ในจีน",
      obfuscation: "การปิดบัง",
      lastUpdated: "อัปเดตล่าสุด: พฤศจิกายน 2025",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <CountryVpnSchema vpns={chinaVpns} locale={locale} />

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

        {/* VPNs That Work */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whatWorksText}
              </p>
            </div>

            <div className="space-y-6">
              {chinaVpns.map((vpn, index) => (
                <Card key={vpn.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Rank */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold">{vpn.name}</h3>
                          <RatingStars rating={vpn.overallRating} size="sm" />
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">{t.worksInChina}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">{t.obfuscation}</span>
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

        {/* Key Features */}
        <section className="py-16 bg-muted/30">
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
        <section className="py-16">
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
        <section className="py-16 bg-muted/30">
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
        <section className="py-16">
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
      </div>
    </>
  );
}
