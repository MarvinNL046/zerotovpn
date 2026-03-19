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
  TrendingUp,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Thailand 2026: Bypass Blocks & Stay Private | ZeroToVPN",
    nl: "Beste VPN voor Thailand 2026: Omzeil Blokkades & Blijf Privé | ZeroToVPN",
    de: "Beste VPN für Thailand 2026: Sperren Umgehen & Privat Bleiben | ZeroToVPN",
    es: "Mejor VPN para Tailandia 2026: Evita Bloqueos y Protege tu Privacidad | ZeroToVPN",
    fr: "Meilleur VPN pour la Thaïlande 2026: Contourner les Blocages | ZeroToVPN",
    zh: "2026年泰国最佳VPN：绕过封锁保护隐私 | ZeroToVPN",
    ja: "タイに最適なVPN 2026：ブロックを回避してプライバシーを保護 | ZeroToVPN",
    ko: "2026년 태국 최고의 VPN: 차단 우회 및 개인정보 보호 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับประเทศไทย 2026: หลีกเลี่ยงการบล็อกและรักษาความเป็นส่วนตัว | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Thailand blocks gambling sites, news outlets, and monitors social media under lese-majeste laws. Find VPNs that work reliably in Thailand.",
    nl: "Thailand blokkeert goksites, nieuwssites en monitort sociale media onder majesteitsschennisswetten. Vind VPNs die betrouwbaar werken in Thailand.",
    de: "Thailand blockiert Glücksspielseiten, Nachrichtenseiten und überwacht soziale Medien. Finden Sie VPNs, die in Thailand zuverlässig funktionieren.",
    es: "Tailandia bloquea sitios de apuestas, medios de noticias y monitorea redes sociales. Encuentra VPNs que funcionan en Tailandia.",
    fr: "La Thaïlande bloque les sites de jeux, les médias et surveille les réseaux sociaux. Trouvez des VPN fiables en Thaïlande.",
    zh: "泰国封锁赌博网站、新闻网站，并根据不敬罪法监控社交媒体。找到在泰国可靠运行的VPN。",
    ja: "タイはギャンブルサイト、ニュースサイトをブロックし、不敬罪法の下でソーシャルメディアを監視しています。タイで確実に機能するVPNを見つけましょう。",
    ko: "태국은 도박 사이트, 뉴스 매체를 차단하고 왕실모독죄법에 따라 소셜 미디어를 모니터링합니다. 태국에서 안정적으로 작동하는 VPN을 찾으세요.",
    th: "ประเทศไทยบล็อกเว็บไซต์การพนัน สำนักข่าว และติดตามโซเชียลมีเดียภายใต้กฎหมายหมิ่นพระบรมเดชานุภาพ ค้นหา VPN ที่ใช้งานได้อย่างน่าเชื่อถือในประเทศไทย",
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
    alternates: generateAlternates("/countries/thailand", locale),
  };
}

export default async function ThailandVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const thailandVpns = allVpns.filter((vpn) =>
    ["nordvpn", "expressvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated March 2026",
      title: "Best VPN for Thailand",
      subtitle: "Bypass content blocks and protect your privacy in Thailand",
      legalStatus: "VPN Legal Status in Thailand",
      legalStatusText:
        "VPN use is legal in Thailand. However, the government blocks thousands of websites under the Computer Crime Act and lese-majeste laws. Social media monitoring is common, especially around political content.",
      blockedVpns: "Content Restrictions in Thailand",
      blockedList: [
        "Gambling websites (thousands blocked)",
        "Some news outlets",
        "Political content critical of monarchy",
        "Certain social media posts",
        "Adult content sites",
        "Some torrent sites",
      ],
      internetFreedom: "Thailand Internet Freedom Score",
      freedomStats: [
        { value: "85.3%", label: "Internet users (2024)" },
        { value: "Thousands", label: "Websites blocked" },
        { value: "36/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Thailand (2026)",
      whatWorksText:
        "Most VPNs work in Thailand without issues. The government primarily uses DNS-based blocking, which any quality VPN can bypass easily.",
      keyFeatures: "Essential Features for Thailand",
      features: [
        {
          title: "Fast Asia-Pacific Servers",
          desc: "Servers in Singapore and Hong Kong provide the best speeds from Thailand",
        },
        {
          title: "Strong Encryption",
          desc: "Protect your browsing from government surveillance and ISP monitoring",
        },
        {
          title: "No-Logs Policy",
          desc: "Ensure your online activity cannot be traced back to you",
        },
        {
          title: "Kill Switch",
          desc: "Prevent accidental exposure if your VPN connection drops",
        },
      ],
      blockedServices: "Services Blocked or Restricted in Thailand",
      blocked: [
        "Gambling websites (online gambling is illegal)",
        "Websites critical of the monarchy",
        "Some independent news outlets",
        "Certain social media posts (lese-majeste)",
        "Some adult content websites",
        "P2P/torrent sites",
      ],
      tips: "Tips for VPN Use in Thailand",
      tipsList: [
        "Download and set up your VPN before arriving in Thailand",
        "Use servers in Singapore or Hong Kong for the best speeds",
        "Avoid posting political content even with a VPN - Thai law still applies",
        "WireGuard protocol offers the best speeds in the region",
        "Use split tunneling for local Thai apps like LINE and banking",
        "Connect to nearby servers for streaming Thai content abroad",
      ],
      faqTitle: "Thailand VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in Thailand?",
          a: "Yes, VPNs are legal in Thailand. However, using a VPN to commit illegal activities remains illegal. The government does not actively block VPN services.",
        },
        {
          q: "Can I use a VPN to access blocked websites in Thailand?",
          a: "Yes, a VPN can bypass Thailand's content blocks. However, be aware that accessing certain content may still be illegal under Thai law, regardless of whether you use a VPN.",
        },
        {
          q: "What is the best VPN server location for Thailand?",
          a: "For the best speeds, connect to servers in Singapore, Hong Kong, or Japan. For accessing Thai content from abroad, look for VPNs with servers in Thailand.",
        },
        {
          q: "Is public WiFi safe in Thailand?",
          a: "Public WiFi at hotels, cafes, and airports in Thailand is often unsecured. Always use a VPN to encrypt your connection and protect your personal data.",
        },
      ],
      getVpn: "Get VPN",
      worksInCountry: "Works in Thailand",
      obfuscation: "Strong Encryption",
      lastUpdated: "Last updated: March 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt maart 2026",
      title: "Beste VPN voor Thailand",
      subtitle: "Omzeil inhoudsblokkades en bescherm je privacy in Thailand",
      legalStatus: "VPN Juridische Status in Thailand",
      legalStatusText:
        "VPN-gebruik is legaal in Thailand. De overheid blokkeert echter duizenden websites onder de Computer Crime Act en majesteitsschennisswetten. Monitoring van sociale media is gebruikelijk, vooral rond politieke inhoud.",
      blockedVpns: "Inhoudsbeperkingen in Thailand",
      blockedList: [
        "Gokwebsites (duizenden geblokkeerd)",
        "Sommige nieuwssites",
        "Politieke inhoud kritisch over monarchie",
        "Bepaalde berichten op sociale media",
        "Sites met volwassen inhoud",
        "Sommige torrentsites",
      ],
      internetFreedom: "Thailand Internet Vrijheid Score",
      freedomStats: [
        { value: "85.3%", label: "Internetgebruikers (2024)" },
        { value: "Duizenden", label: "Websites geblokkeerd" },
        { value: "36/100", label: "Vrijheidsscore (Gedeeltelijk Vrij)" },
      ],
      whatWorks: "Beste VPNs voor Thailand (2026)",
      whatWorksText:
        "De meeste VPNs werken in Thailand zonder problemen. De overheid gebruikt voornamelijk DNS-gebaseerde blokkering, die elke kwaliteits-VPN gemakkelijk kan omzeilen.",
      keyFeatures: "Essentiële Functies voor Thailand",
      features: [
        {
          title: "Snelle Asia-Pacific Servers",
          desc: "Servers in Singapore en Hong Kong bieden de beste snelheden vanuit Thailand",
        },
        {
          title: "Sterke Versleuteling",
          desc: "Bescherm je browsen tegen overheidstoezicht en ISP-monitoring",
        },
        {
          title: "Geen-Logs Beleid",
          desc: "Zorg ervoor dat je online activiteit niet naar jou te herleiden is",
        },
        {
          title: "Kill Switch",
          desc: "Voorkom onbedoelde blootstelling als je VPN-verbinding wegvalt",
        },
      ],
      blockedServices: "Geblokkeerde of Beperkte Diensten in Thailand",
      blocked: [
        "Gokwebsites (online gokken is illegaal)",
        "Websites die kritisch zijn over de monarchie",
        "Sommige onafhankelijke nieuwssites",
        "Bepaalde berichten op sociale media (majesteitsschennis)",
        "Sommige websites met volwassen inhoud",
        "P2P/torrentsites",
      ],
      tips: "Tips voor VPN Gebruik in Thailand",
      tipsList: [
        "Download en stel je VPN in voordat je naar Thailand reist",
        "Gebruik servers in Singapore of Hong Kong voor de beste snelheden",
        "Vermijd het plaatsen van politieke inhoud, zelfs met een VPN",
        "WireGuard-protocol biedt de beste snelheden in de regio",
        "Gebruik split tunneling voor lokale Thaise apps zoals LINE en bankieren",
        "Verbind met nabije servers voor het streamen van Thaise inhoud in het buitenland",
      ],
      faqTitle: "Thailand VPN FAQ",
      faqs: [
        {
          q: "Zijn VPNs legaal in Thailand?",
          a: "Ja, VPNs zijn legaal in Thailand. Het gebruik van een VPN voor illegale activiteiten blijft echter illegaal.",
        },
        {
          q: "Kan ik een VPN gebruiken om geblokkeerde websites in Thailand te bereiken?",
          a: "Ja, een VPN kan de inhoudsblokkades van Thailand omzeilen. Houd er rekening mee dat bepaalde inhoud nog steeds illegaal kan zijn onder de Thaise wet.",
        },
        {
          q: "Wat is de beste VPN-serverlocatie voor Thailand?",
          a: "Voor de beste snelheden, verbind met servers in Singapore, Hong Kong of Japan.",
        },
        {
          q: "Is openbare WiFi veilig in Thailand?",
          a: "Openbare WiFi bij hotels, cafés en luchthavens in Thailand is vaak onbeveiligd. Gebruik altijd een VPN om je verbinding te versleutelen.",
        },
      ],
      getVpn: "Download VPN",
      worksInCountry: "Werkt in Thailand",
      obfuscation: "Sterke Versleuteling",
      lastUpdated: "Laatst bijgewerkt: maart 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert März 2026",
      title: "Beste VPN für Thailand",
      subtitle: "Umgehen Sie Inhaltssperren und schützen Sie Ihre Privatsphäre in Thailand",
      legalStatus: "VPN-Rechtsstatus in Thailand",
      legalStatusText:
        "Die Verwendung eines VPN ist in Thailand legal. Die Regierung blockiert jedoch Tausende von Websites unter dem Computer Crime Act und Majestätsbeleidigungsgesetzen. Die Überwachung sozialer Medien ist üblich.",
      blockedVpns: "Inhaltsbeschränkungen in Thailand",
      blockedList: [
        "Glücksspiel-Websites (Tausende blockiert)",
        "Einige Nachrichtenseiten",
        "Politische Inhalte kritisch gegenüber der Monarchie",
        "Bestimmte Social-Media-Posts",
        "Websites mit Erwachseneninhalten",
        "Einige Torrent-Seiten",
      ],
      internetFreedom: "Thailand Internet-Freiheitswert",
      freedomStats: [
        { value: "85.3%", label: "Internetnutzer (2024)" },
        { value: "Tausende", label: "Websites blockiert" },
        { value: "36/100", label: "Freiheitswert (Teilweise Frei)" },
      ],
      whatWorks: "Beste VPNs für Thailand (2026)",
      whatWorksText:
        "Die meisten VPNs funktionieren in Thailand problemlos. Die Regierung verwendet hauptsächlich DNS-basierte Blockierung, die jedes Qualitäts-VPN leicht umgehen kann.",
      keyFeatures: "Wesentliche Funktionen für Thailand",
      features: [
        {
          title: "Schnelle Asien-Pazifik-Server",
          desc: "Server in Singapur und Hongkong bieten die besten Geschwindigkeiten aus Thailand",
        },
        {
          title: "Starke Verschlüsselung",
          desc: "Schützen Sie Ihr Surfen vor Regierungsüberwachung und ISP-Monitoring",
        },
        {
          title: "Keine-Logs-Richtlinie",
          desc: "Stellen Sie sicher, dass Ihre Online-Aktivität nicht zu Ihnen zurückverfolgt werden kann",
        },
        {
          title: "Kill Switch",
          desc: "Verhindern Sie versehentliche Offenlegung bei Verbindungsabbruch",
        },
      ],
      blockedServices: "Blockierte oder eingeschränkte Dienste in Thailand",
      blocked: [
        "Glücksspiel-Websites (Online-Glücksspiel ist illegal)",
        "Websites, die die Monarchie kritisieren",
        "Einige unabhängige Nachrichtenseiten",
        "Bestimmte Social-Media-Posts (Majestätsbeleidigung)",
        "Einige Websites mit Erwachseneninhalten",
        "P2P/Torrent-Seiten",
      ],
      tips: "Tipps für VPN-Nutzung in Thailand",
      tipsList: [
        "Laden Sie Ihre VPN-App vor der Ankunft in Thailand herunter",
        "Verwenden Sie Server in Singapur oder Hongkong für beste Geschwindigkeiten",
        "Vermeiden Sie politische Inhalte auch mit VPN - thailändisches Recht gilt weiterhin",
        "WireGuard-Protokoll bietet die besten Geschwindigkeiten in der Region",
        "Verwenden Sie Split-Tunneling für lokale Thai-Apps wie LINE und Banking",
        "Verbinden Sie sich mit nahen Servern zum Streamen thailändischer Inhalte im Ausland",
      ],
      faqTitle: "Thailand VPN FAQ",
      faqs: [
        {
          q: "Sind VPNs in Thailand legal?",
          a: "Ja, VPNs sind in Thailand legal. Die Verwendung eines VPN für illegale Aktivitäten bleibt jedoch illegal.",
        },
        {
          q: "Kann ich mit einem VPN blockierte Websites in Thailand erreichen?",
          a: "Ja, ein VPN kann Thailands Inhaltssperren umgehen. Beachten Sie jedoch, dass der Zugriff auf bestimmte Inhalte nach thailändischem Recht illegal sein kann.",
        },
        {
          q: "Welcher VPN-Serverstandort ist der beste für Thailand?",
          a: "Für die besten Geschwindigkeiten verbinden Sie sich mit Servern in Singapur, Hongkong oder Japan.",
        },
        {
          q: "Ist öffentliches WLAN in Thailand sicher?",
          a: "Öffentliches WLAN in Hotels, Cafés und Flughäfen in Thailand ist oft ungesichert. Verwenden Sie immer ein VPN.",
        },
      ],
      getVpn: "VPN erhalten",
      worksInCountry: "Funktioniert in Thailand",
      obfuscation: "Starke Verschlüsselung",
      lastUpdated: "Zuletzt aktualisiert: März 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado marzo 2026",
      title: "Mejor VPN para Tailandia",
      subtitle: "Evita bloqueos de contenido y protege tu privacidad en Tailandia",
      legalStatus: "Estado legal de VPN en Tailandia",
      legalStatusText:
        "El uso de VPN es legal en Tailandia. Sin embargo, el gobierno bloquea miles de sitios web bajo la Ley de Delitos Informáticos y las leyes de lesa majestad. El monitoreo de redes sociales es común.",
      blockedVpns: "Restricciones de contenido en Tailandia",
      blockedList: [
        "Sitios de apuestas (miles bloqueados)",
        "Algunos medios de noticias",
        "Contenido político crítico de la monarquía",
        "Ciertos posts en redes sociales",
        "Sitios de contenido adulto",
        "Algunos sitios de torrents",
      ],
      internetFreedom: "Puntuación de libertad de internet de Tailandia",
      freedomStats: [
        { value: "85.3%", label: "Usuarios de internet (2024)" },
        { value: "Miles", label: "Sitios bloqueados" },
        { value: "36/100", label: "Puntuación de libertad (Parcialmente Libre)" },
      ],
      whatWorks: "Mejores VPNs para Tailandia (2026)",
      whatWorksText:
        "La mayoría de las VPNs funcionan en Tailandia sin problemas. El gobierno utiliza principalmente bloqueo basado en DNS, que cualquier VPN de calidad puede eludir fácilmente.",
      keyFeatures: "Características esenciales para Tailandia",
      features: [
        {
          title: "Servidores rápidos en Asia-Pacífico",
          desc: "Servidores en Singapur y Hong Kong ofrecen las mejores velocidades desde Tailandia",
        },
        {
          title: "Cifrado fuerte",
          desc: "Protege tu navegación de la vigilancia gubernamental y el monitoreo del ISP",
        },
        {
          title: "Política sin registros",
          desc: "Asegura que tu actividad online no pueda ser rastreada",
        },
        {
          title: "Kill Switch",
          desc: "Previene la exposición accidental si tu conexión VPN se cae",
        },
      ],
      blockedServices: "Servicios bloqueados o restringidos en Tailandia",
      blocked: [
        "Sitios de apuestas (el juego online es ilegal)",
        "Sitios web críticos de la monarquía",
        "Algunos medios de noticias independientes",
        "Ciertos posts en redes sociales (lesa majestad)",
        "Algunos sitios de contenido adulto",
        "Sitios P2P/torrent",
      ],
      tips: "Consejos para usar VPN en Tailandia",
      tipsList: [
        "Descarga y configura tu VPN antes de llegar a Tailandia",
        "Usa servidores en Singapur o Hong Kong para las mejores velocidades",
        "Evita publicar contenido político incluso con VPN - la ley tailandesa sigue vigente",
        "El protocolo WireGuard ofrece las mejores velocidades en la región",
        "Usa split tunneling para apps locales tailandesas como LINE y banca",
        "Conéctate a servidores cercanos para streaming de contenido tailandés en el extranjero",
      ],
      faqTitle: "FAQ VPN Tailandia",
      faqs: [
        {
          q: "¿Son legales las VPNs en Tailandia?",
          a: "Sí, las VPNs son legales en Tailandia. Sin embargo, usar una VPN para actividades ilegales sigue siendo ilegal.",
        },
        {
          q: "¿Puedo usar una VPN para acceder a sitios bloqueados en Tailandia?",
          a: "Sí, una VPN puede eludir los bloqueos de contenido de Tailandia. Sin embargo, acceder a cierto contenido puede ser ilegal bajo la ley tailandesa.",
        },
        {
          q: "¿Cuál es la mejor ubicación de servidor VPN para Tailandia?",
          a: "Para las mejores velocidades, conéctate a servidores en Singapur, Hong Kong o Japón.",
        },
        {
          q: "¿Es seguro el WiFi público en Tailandia?",
          a: "El WiFi público en hoteles, cafés y aeropuertos en Tailandia a menudo no es seguro. Siempre usa una VPN.",
        },
      ],
      getVpn: "Obtener VPN",
      worksInCountry: "Funciona en Tailandia",
      obfuscation: "Cifrado Fuerte",
      lastUpdated: "Última actualización: marzo 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour mars 2026",
      title: "Meilleur VPN pour la Thaïlande",
      subtitle: "Contournez les blocages et protégez votre vie privée en Thaïlande",
      legalStatus: "Statut légal du VPN en Thaïlande",
      legalStatusText:
        "L'utilisation d'un VPN est légale en Thaïlande. Cependant, le gouvernement bloque des milliers de sites web en vertu de la loi sur la cybercriminalité et des lois de lèse-majesté. La surveillance des réseaux sociaux est courante.",
      blockedVpns: "Restrictions de contenu en Thaïlande",
      blockedList: [
        "Sites de jeux d'argent (milliers bloqués)",
        "Certains médias d'information",
        "Contenu politique critique de la monarchie",
        "Certaines publications sur les réseaux sociaux",
        "Sites de contenu adulte",
        "Certains sites torrent",
      ],
      internetFreedom: "Score de liberté internet de la Thaïlande",
      freedomStats: [
        { value: "85.3%", label: "Utilisateurs internet (2024)" },
        { value: "Milliers", label: "Sites bloqués" },
        { value: "36/100", label: "Score de liberté (Partiellement Libre)" },
      ],
      whatWorks: "Meilleurs VPNs pour la Thaïlande (2026)",
      whatWorksText:
        "La plupart des VPNs fonctionnent en Thaïlande sans problème. Le gouvernement utilise principalement le blocage DNS, que tout VPN de qualité peut facilement contourner.",
      keyFeatures: "Fonctionnalités essentielles pour la Thaïlande",
      features: [
        {
          title: "Serveurs rapides Asie-Pacifique",
          desc: "Les serveurs à Singapour et Hong Kong offrent les meilleures vitesses depuis la Thaïlande",
        },
        {
          title: "Chiffrement fort",
          desc: "Protégez votre navigation de la surveillance gouvernementale et du monitoring ISP",
        },
        {
          title: "Politique sans journaux",
          desc: "Assurez-vous que votre activité en ligne ne peut pas être retracée",
        },
        {
          title: "Kill Switch",
          desc: "Empêchez l'exposition accidentelle si votre connexion VPN tombe",
        },
      ],
      blockedServices: "Services bloqués ou restreints en Thaïlande",
      blocked: [
        "Sites de jeux d'argent (les jeux en ligne sont illégaux)",
        "Sites web critiques de la monarchie",
        "Certains médias d'information indépendants",
        "Certaines publications sur les réseaux sociaux (lèse-majesté)",
        "Certains sites de contenu adulte",
        "Sites P2P/torrent",
      ],
      tips: "Conseils pour l'utilisation de VPN en Thaïlande",
      tipsList: [
        "Téléchargez et configurez votre VPN avant d'arriver en Thaïlande",
        "Utilisez des serveurs à Singapour ou Hong Kong pour les meilleures vitesses",
        "Évitez de publier du contenu politique même avec un VPN - la loi thaïlandaise s'applique toujours",
        "Le protocole WireGuard offre les meilleures vitesses dans la région",
        "Utilisez le split tunneling pour les apps thaïlandaises locales comme LINE et la banque",
        "Connectez-vous aux serveurs proches pour le streaming de contenu thaïlandais à l'étranger",
      ],
      faqTitle: "FAQ VPN Thaïlande",
      faqs: [
        {
          q: "Les VPNs sont-ils légaux en Thaïlande ?",
          a: "Oui, les VPNs sont légaux en Thaïlande. Cependant, utiliser un VPN pour des activités illégales reste illégal.",
        },
        {
          q: "Puis-je utiliser un VPN pour accéder aux sites bloqués en Thaïlande ?",
          a: "Oui, un VPN peut contourner les blocages de contenu en Thaïlande. Cependant, l'accès à certains contenus peut être illégal en vertu de la loi thaïlandaise.",
        },
        {
          q: "Quel est le meilleur emplacement de serveur VPN pour la Thaïlande ?",
          a: "Pour les meilleures vitesses, connectez-vous aux serveurs de Singapour, Hong Kong ou Japon.",
        },
        {
          q: "Le WiFi public est-il sûr en Thaïlande ?",
          a: "Le WiFi public dans les hôtels, cafés et aéroports en Thaïlande est souvent non sécurisé. Utilisez toujours un VPN.",
        },
      ],
      getVpn: "Obtenir VPN",
      worksInCountry: "Fonctionne en Thaïlande",
      obfuscation: "Chiffrement Fort",
      lastUpdated: "Dernière mise à jour : mars 2026",
      sources: "Sources",
    },
    zh: {
      badge: "更新于2026年3月",
      title: "泰国最佳VPN",
      subtitle: "绕过内容封锁，保护您在泰国的隐私",
      legalStatus: "泰国VPN法律状态",
      legalStatusText:
        "在泰国使用VPN是合法的。但是，政府根据《计算机犯罪法》和不敬罪法封锁了数千个网站。社交媒体监控很常见，尤其是围绕政治内容。",
      blockedVpns: "泰国内容限制",
      blockedList: [
        "赌博网站（数千个被封锁）",
        "一些新闻网站",
        "批评君主制的政治内容",
        "某些社交媒体帖子",
        "成人内容网站",
        "一些种子网站",
      ],
      internetFreedom: "泰国互联网自由评分",
      freedomStats: [
        { value: "85.3%", label: "互联网用户（2024）" },
        { value: "数千", label: "网站被封锁" },
        { value: "36/100", label: "自由评分（部分自由）" },
      ],
      whatWorks: "泰国最佳VPN（2026）",
      whatWorksText:
        "大多数VPN在泰国可以正常工作。政府主要使用基于DNS的封锁，任何优质VPN都可以轻松绕过。",
      keyFeatures: "泰国的关键功能",
      features: [
        {
          title: "快速亚太服务器",
          desc: "新加坡和香港的服务器从泰国提供最佳速度",
        },
        {
          title: "强加密",
          desc: "保护您的浏览免受政府监控和ISP监控",
        },
        {
          title: "无日志政策",
          desc: "确保您的在线活动无法被追踪",
        },
        {
          title: "终止开关",
          desc: "防止VPN连接中断时意外暴露",
        },
      ],
      blockedServices: "泰国封锁或限制的服务",
      blocked: [
        "赌博网站（在线赌博是非法的）",
        "批评君主制的网站",
        "一些独立新闻网站",
        "某些社交媒体帖子（不敬罪）",
        "一些成人内容网站",
        "P2P/种子网站",
      ],
      tips: "泰国VPN使用技巧",
      tipsList: [
        "在到达泰国之前下载并设置VPN",
        "使用新加坡或香港的服务器获得最佳速度",
        "即使使用VPN也要避免发布政治内容 - 泰国法律仍然适用",
        "WireGuard协议在该地区提供最佳速度",
        "使用分流隧道处理本地泰国应用程序如LINE和银行",
        "连接到附近的服务器以在国外流媒体泰国内容",
      ],
      faqTitle: "泰国VPN常见问题",
      faqs: [
        {
          q: "VPN在泰国合法吗？",
          a: "是的，VPN在泰国是合法的。但是，使用VPN进行非法活动仍然是违法的。",
        },
        {
          q: "我可以在泰国使用VPN访问被封锁的网站吗？",
          a: "是的，VPN可以绕过泰国的内容封锁。但请注意，无论是否使用VPN，访问某些内容可能仍然是违法的。",
        },
        {
          q: "泰国最佳VPN服务器位置是哪里？",
          a: "为获得最佳速度，请连接到新加坡、香港或日本的服务器。",
        },
        {
          q: "泰国的公共WiFi安全吗？",
          a: "泰国酒店、咖啡馆和机场的公共WiFi通常不安全。始终使用VPN来加密您的连接。",
        },
      ],
      getVpn: "获取VPN",
      worksInCountry: "在泰国可用",
      obfuscation: "强加密",
      lastUpdated: "最后更新：2026年3月",
      sources: "来源",
    },
    ja: {
      badge: "2026年3月更新",
      title: "タイに最適なVPN",
      subtitle: "タイでコンテンツブロックを回避してプライバシーを保護",
      legalStatus: "タイのVPN法的地位",
      legalStatusText:
        "タイではVPNの使用は合法です。しかし、政府はコンピュータ犯罪法と不敬罪法の下で数千のウェブサイトをブロックしています。特に政治的コンテンツに関するソーシャルメディアの監視が一般的です。",
      blockedVpns: "タイのコンテンツ制限",
      blockedList: [
        "ギャンブルサイト（数千がブロック）",
        "一部のニュースサイト",
        "王室に批判的な政治コンテンツ",
        "特定のソーシャルメディア投稿",
        "アダルトコンテンツサイト",
        "一部のトレントサイト",
      ],
      internetFreedom: "タイのインターネット自由度スコア",
      freedomStats: [
        { value: "85.3%", label: "インターネットユーザー（2024）" },
        { value: "数千", label: "ウェブサイトがブロック" },
        { value: "36/100", label: "自由度スコア（部分的に自由）" },
      ],
      whatWorks: "タイで最適なVPN（2026）",
      whatWorksText:
        "ほとんどのVPNはタイで問題なく動作します。政府は主にDNSベースのブロッキングを使用しており、品質の高いVPNなら簡単に回避できます。",
      keyFeatures: "タイに必須の機能",
      features: [
        {
          title: "高速アジア太平洋サーバー",
          desc: "シンガポールと香港のサーバーがタイから最高の速度を提供",
        },
        {
          title: "強力な暗号化",
          desc: "政府の監視やISPモニタリングからブラウジングを保護",
        },
        {
          title: "ノーログポリシー",
          desc: "オンライン活動が追跡されないことを確保",
        },
        {
          title: "キルスイッチ",
          desc: "VPN接続が切断された場合の偶発的な露出を防止",
        },
      ],
      blockedServices: "タイでブロックまたは制限されているサービス",
      blocked: [
        "ギャンブルサイト（オンラインギャンブルは違法）",
        "王室を批判するウェブサイト",
        "一部の独立ニュースサイト",
        "特定のソーシャルメディア投稿（不敬罪）",
        "一部のアダルトコンテンツサイト",
        "P2P/トレントサイト",
      ],
      tips: "タイでのVPN使用のヒント",
      tipsList: [
        "タイに到着する前にVPNをダウンロードして設定",
        "最高の速度のためにシンガポールまたは香港のサーバーを使用",
        "VPNを使用していても政治的コンテンツの投稿は避ける - タイの法律は引き続き適用",
        "WireGuardプロトコルが地域で最高の速度を提供",
        "LINEやバンキングなどのローカルタイアプリにはスプリットトンネリングを使用",
        "海外からタイのコンテンツをストリーミングするには近くのサーバーに接続",
      ],
      faqTitle: "タイVPN FAQ",
      faqs: [
        {
          q: "タイでVPNは合法ですか？",
          a: "はい、タイではVPNは合法です。ただし、違法行為にVPNを使用することは違法のままです。",
        },
        {
          q: "タイでVPNを使ってブロックされたウェブサイトにアクセスできますか？",
          a: "はい、VPNはタイのコンテンツブロックを回避できます。ただし、特定のコンテンツへのアクセスはタイの法律の下で違法である可能性があります。",
        },
        {
          q: "タイに最適なVPNサーバーの場所はどこですか？",
          a: "最高の速度のためには、シンガポール、香港、または日本のサーバーに接続してください。",
        },
        {
          q: "タイの公共WiFiは安全ですか？",
          a: "タイのホテル、カフェ、空港の公共WiFiは安全でないことが多いです。常にVPNを使用してください。",
        },
      ],
      getVpn: "VPNを取得",
      worksInCountry: "タイで機能",
      obfuscation: "強力な暗号化",
      lastUpdated: "最終更新：2026年3月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 3월 업데이트",
      title: "태국 최고의 VPN",
      subtitle: "태국에서 콘텐츠 차단을 우회하고 개인정보를 보호하세요",
      legalStatus: "태국의 VPN 법적 지위",
      legalStatusText:
        "태국에서 VPN 사용은 합법입니다. 그러나 정부는 컴퓨터 범죄법과 왕실모독죄법에 따라 수천 개의 웹사이트를 차단합니다. 특히 정치적 콘텐츠에 대한 소셜 미디어 모니터링이 일반적입니다.",
      blockedVpns: "태국의 콘텐츠 제한",
      blockedList: [
        "도박 웹사이트 (수천 개 차단)",
        "일부 뉴스 매체",
        "왕실에 비판적인 정치적 콘텐츠",
        "특정 소셜 미디어 게시물",
        "성인 콘텐츠 사이트",
        "일부 토렌트 사이트",
      ],
      internetFreedom: "태국 인터넷 자유 점수",
      freedomStats: [
        { value: "85.3%", label: "인터넷 사용자 (2024)" },
        { value: "수천", label: "웹사이트 차단" },
        { value: "36/100", label: "자유 점수 (부분적 자유)" },
      ],
      whatWorks: "태국 최고의 VPN (2026)",
      whatWorksText:
        "대부분의 VPN은 태국에서 문제없이 작동합니다. 정부는 주로 DNS 기반 차단을 사용하며, 모든 품질 좋은 VPN이 쉽게 우회할 수 있습니다.",
      keyFeatures: "태국을 위한 필수 기능",
      features: [
        {
          title: "빠른 아시아 태평양 서버",
          desc: "싱가포르와 홍콩의 서버가 태국에서 최고의 속도를 제공",
        },
        {
          title: "강력한 암호화",
          desc: "정부 감시와 ISP 모니터링으로부터 브라우징 보호",
        },
        {
          title: "무로그 정책",
          desc: "온라인 활동이 추적되지 않도록 보장",
        },
        {
          title: "킬 스위치",
          desc: "VPN 연결이 끊어질 때 우발적 노출 방지",
        },
      ],
      blockedServices: "태국에서 차단되거나 제한된 서비스",
      blocked: [
        "도박 웹사이트 (온라인 도박은 불법)",
        "왕실을 비판하는 웹사이트",
        "일부 독립 뉴스 매체",
        "특정 소셜 미디어 게시물 (왕실모독죄)",
        "일부 성인 콘텐츠 웹사이트",
        "P2P/토렌트 사이트",
      ],
      tips: "태국에서 VPN 사용 팁",
      tipsList: [
        "태국에 도착하기 전에 VPN을 다운로드하고 설정하세요",
        "최고의 속도를 위해 싱가포르 또는 홍콩 서버를 사용하세요",
        "VPN을 사용하더라도 정치적 콘텐츠 게시를 피하세요 - 태국 법이 여전히 적용됩니다",
        "WireGuard 프로토콜이 지역에서 최고의 속도를 제공합니다",
        "LINE 및 뱅킹과 같은 현지 태국 앱에는 분할 터널링을 사용하세요",
        "해외에서 태국 콘텐츠를 스트리밍하려면 가까운 서버에 연결하세요",
      ],
      faqTitle: "태국 VPN FAQ",
      faqs: [
        {
          q: "태국에서 VPN은 합법입니까?",
          a: "네, 태국에서 VPN은 합법입니다. 그러나 불법 활동에 VPN을 사용하는 것은 여전히 불법입니다.",
        },
        {
          q: "태국에서 VPN으로 차단된 웹사이트에 액세스할 수 있습니까?",
          a: "네, VPN은 태국의 콘텐츠 차단을 우회할 수 있습니다. 그러나 특정 콘텐츠에 대한 액세스는 태국 법에 따라 불법일 수 있습니다.",
        },
        {
          q: "태국에 가장 좋은 VPN 서버 위치는 어디입니까?",
          a: "최고의 속도를 위해 싱가포르, 홍콩 또는 일본의 서버에 연결하세요.",
        },
        {
          q: "태국의 공용 WiFi는 안전합니까?",
          a: "태국의 호텔, 카페, 공항의 공용 WiFi는 종종 보안이 되지 않습니다. 항상 VPN을 사용하세요.",
        },
      ],
      getVpn: "VPN 받기",
      worksInCountry: "태국에서 작동",
      obfuscation: "강력한 암호화",
      lastUpdated: "마지막 업데이트: 2026년 3월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตมีนาคม 2026",
      title: "VPN ที่ดีที่สุดสำหรับประเทศไทย",
      subtitle: "หลีกเลี่ยงการบล็อกเนื้อหาและปกป้องความเป็นส่วนตัวของคุณในประเทศไทย",
      legalStatus: "สถานะทางกฎหมายของ VPN ในประเทศไทย",
      legalStatusText:
        "การใช้ VPN ถูกกฎหมายในประเทศไทย อย่างไรก็ตาม รัฐบาลบล็อกเว็บไซต์หลายพันแห่งภายใต้พระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์และกฎหมายหมิ่นพระบรมเดชานุภาพ การตรวจสอบสื่อสังคมออนไลน์เป็นเรื่องปกติ",
      blockedVpns: "ข้อจำกัดเนื้อหาในประเทศไทย",
      blockedList: [
        "เว็บไซต์การพนัน (หลายพันถูกบล็อก)",
        "สำนักข่าวบางแห่ง",
        "เนื้อหาทางการเมืองที่วิพากษ์วิจารณ์สถาบันพระมหากษัตริย์",
        "โพสต์บนโซเชียลมีเดียบางรายการ",
        "เว็บไซต์เนื้อหาสำหรับผู้ใหญ่",
        "เว็บไซต์ทอร์เรนต์บางแห่ง",
      ],
      internetFreedom: "คะแนนเสรีภาพอินเทอร์เน็ตของประเทศไทย",
      freedomStats: [
        { value: "85.3%", label: "ผู้ใช้อินเทอร์เน็ต (2024)" },
        { value: "หลายพัน", label: "เว็บไซต์ถูกบล็อก" },
        { value: "36/100", label: "คะแนนเสรีภาพ (เสรีบางส่วน)" },
      ],
      whatWorks: "VPN ที่ดีที่สุดสำหรับประเทศไทย (2026)",
      whatWorksText:
        "VPN ส่วนใหญ่ทำงานได้ในประเทศไทยโดยไม่มีปัญหา รัฐบาลใช้การบล็อกแบบ DNS เป็นหลัก ซึ่ง VPN คุณภาพใดก็สามารถหลีกเลี่ยงได้ง่าย",
      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับประเทศไทย",
      features: [
        {
          title: "เซิร์ฟเวอร์เอเชียแปซิฟิกที่รวดเร็ว",
          desc: "เซิร์ฟเวอร์ในสิงคโปร์และฮ่องกงให้ความเร็วที่ดีที่สุดจากประเทศไทย",
        },
        {
          title: "การเข้ารหัสที่แข็งแกร่ง",
          desc: "ปกป้องการเรียกดูของคุณจากการเฝ้าระวังของรัฐบาลและการตรวจสอบ ISP",
        },
        {
          title: "นโยบายไม่เก็บบันทึก",
          desc: "ให้แน่ใจว่ากิจกรรมออนไลน์ของคุณไม่สามารถติดตามกลับมาหาคุณได้",
        },
        {
          title: "Kill Switch",
          desc: "ป้องกันการเปิดเผยโดยบังเอิญหากการเชื่อมต่อ VPN ของคุณขาดหาย",
        },
      ],
      blockedServices: "บริการที่ถูกบล็อกหรือจำกัดในประเทศไทย",
      blocked: [
        "เว็บไซต์การพนัน (การพนันออนไลน์ผิดกฎหมาย)",
        "เว็บไซต์ที่วิพากษ์วิจารณ์สถาบันพระมหากษัตริย์",
        "สำนักข่าวอิสระบางแห่ง",
        "โพสต์บนโซเชียลมีเดียบางรายการ (หมิ่นพระบรมเดชานุภาพ)",
        "เว็บไซต์เนื้อหาสำหรับผู้ใหญ่บางแห่ง",
        "เว็บไซต์ P2P/ทอร์เรนต์",
      ],
      tips: "เคล็ดลับสำหรับการใช้ VPN ในประเทศไทย",
      tipsList: [
        "ดาวน์โหลดและตั้งค่า VPN ก่อนเดินทางมาถึงประเทศไทย",
        "ใช้เซิร์ฟเวอร์ในสิงคโปร์หรือฮ่องกงเพื่อความเร็วที่ดีที่สุด",
        "หลีกเลี่ยงการโพสต์เนื้อหาทางการเมืองแม้จะใช้ VPN - กฎหมายไทยยังคงใช้บังคับ",
        "โปรโตคอล WireGuard ให้ความเร็วที่ดีที่สุดในภูมิภาค",
        "ใช้ split tunneling สำหรับแอปไทยท้องถิ่นเช่น LINE และธนาคาร",
        "เชื่อมต่อกับเซิร์ฟเวอร์ใกล้เคียงเพื่อสตรีมเนื้อหาไทยในต่างประเทศ",
      ],
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ VPN ประเทศไทย",
      faqs: [
        {
          q: "VPN ถูกกฎหมายในประเทศไทยหรือไม่?",
          a: "ใช่ VPN ถูกกฎหมายในประเทศไทย อย่างไรก็ตาม การใช้ VPN สำหรับกิจกรรมที่ผิดกฎหมายยังคงผิดกฎหมาย",
        },
        {
          q: "ฉันสามารถใช้ VPN เข้าถึงเว็บไซต์ที่ถูกบล็อกในประเทศไทยได้หรือไม่?",
          a: "ได้ VPN สามารถหลีกเลี่ยงการบล็อกเนื้อหาของประเทศไทยได้ อย่างไรก็ตาม โปรดทราบว่าการเข้าถึงเนื้อหาบางอย่างอาจยังคงผิดกฎหมาย",
        },
        {
          q: "ตำแหน่งเซิร์ฟเวอร์ VPN ที่ดีที่สุดสำหรับประเทศไทยคืออะไร?",
          a: "เพื่อความเร็วที่ดีที่สุด เชื่อมต่อกับเซิร์ฟเวอร์ในสิงคโปร์ ฮ่องกง หรือญี่ปุ่น",
        },
        {
          q: "WiFi สาธารณะในประเทศไทยปลอดภัยหรือไม่?",
          a: "WiFi สาธารณะในโรงแรม คาเฟ่ และสนามบินในประเทศไทยมักไม่ปลอดภัย ใช้ VPN เสมอ",
        },
      ],
      getVpn: "รับ VPN",
      worksInCountry: "ใช้งานได้ในประเทศไทย",
      obfuscation: "การเข้ารหัสที่แข็งแกร่ง",
      lastUpdated: "อัปเดตล่าสุด: มีนาคม 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">{"\ud83c\uddf9\ud83c\udded"}</span>
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

      {/* Legal Status */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Scale className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                <p className="text-muted-foreground mb-4">{t.legalStatusText}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VPN use legal
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                    <Ban className="h-3 w-3 mr-1" />
                    Content monitored
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freedom Stats */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.internetFreedom}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.freedomStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Restrictions */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">{t.blockedVpns}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.blockedList.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            {thailandVpns.map((vpn, index) => (
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
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{t.worksInCountry}</span>
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
                      {index === 2 && <TrendingUp className="h-6 w-6 text-primary" />}
                      {index === 3 && <Globe className="h-6 w-6 text-primary" />}
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
                  href="https://freedomhouse.org/country/thailand/freedom-net/2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Freedom House - Thailand: Freedom on the Net 2024
                </a>
              </li>
              <li>
                <a
                  href="https://www.eff.org/deeplinks/2024/thailand-internet-censorship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  EFF - Internet Censorship in Thailand
                </a>
              </li>
              <li>
                <a
                  href="https://www.comparitech.com/blog/vpn-privacy/vpn-legality-thailand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Comparitech - VPN Legality in Thailand
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
              { title: "VPN Guide: Vietnam", description: "Navigate Vietnam's internet restrictions", href: "/countries/vietnam", icon: "globe" },
              { title: "VPN Guide: Indonesia", description: "Bypass content blocks in Indonesia", href: "/countries/indonesia", icon: "globe" },
              { title: "VPN Guide: Malaysia", description: "Unblock content in Malaysia", href: "/countries/malaysia", icon: "globe" },
              { title: "All Country Guides", description: "VPN guides for all countries", href: "/countries", icon: "map" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
