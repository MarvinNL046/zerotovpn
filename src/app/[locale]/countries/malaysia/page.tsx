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
    en: "Best VPN for Malaysia 2026: Unblock Sites & Protect Privacy | ZeroToVPN",
    nl: "Beste VPN voor Maleisië 2026: Deblokkeer Sites & Bescherm Privacy | ZeroToVPN",
    de: "Beste VPN für Malaysia 2026: Websites Entsperren & Privatsphäre Schützen | ZeroToVPN",
    es: "Mejor VPN para Malasia 2026: Desbloquea Sitios y Protege tu Privacidad | ZeroToVPN",
    fr: "Meilleur VPN pour la Malaisie 2026: Débloquer les Sites & Protéger la Vie Privée | ZeroToVPN",
    zh: "2026年马来西亚最佳VPN：解锁网站和保护隐私 | ZeroToVPN",
    ja: "マレーシアに最適なVPN 2026：サイトのブロック解除とプライバシー保護 | ZeroToVPN",
    ko: "2026년 말레이시아 최고의 VPN: 사이트 차단 해제 및 개인정보 보호 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับมาเลเซีย 2026: ปลดบล็อกเว็บไซต์และปกป้องความเป็นส่วนตัว | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Malaysia blocks gambling, adult content, and political sites through MCMC. Find VPNs that bypass MCMC blocks and protect your privacy in Malaysia.",
    nl: "Maleisië blokkeert gok-, volwassen- en politieke sites via MCMC. Vind VPNs die MCMC-blokkades omzeilen en je privacy beschermen.",
    de: "Malaysia blockiert Glücksspiel-, Erwachsenen- und politische Seiten über MCMC. Finden Sie VPNs, die MCMC-Sperren umgehen.",
    es: "Malasia bloquea sitios de apuestas, adultos y políticos a través de MCMC. Encuentra VPNs que evitan los bloqueos MCMC.",
    fr: "La Malaisie bloque les sites de jeux, adultes et politiques via MCMC. Trouvez des VPN qui contournent les blocages MCMC.",
    zh: "马来西亚通过MCMC封锁赌博、成人和政治网站。找到绕过MCMC封锁并保护您隐私的VPN。",
    ja: "マレーシアはMCMCを通じてギャンブル、アダルト、政治サイトをブロックしています。MCMCブロックを回避するVPNを見つけましょう。",
    ko: "말레이시아는 MCMC를 통해 도박, 성인, 정치 사이트를 차단합니다. MCMC 차단을 우회하는 VPN을 찾으세요.",
    th: "มาเลเซียบล็อกเว็บไซต์การพนัน เนื้อหาสำหรับผู้ใหญ่ และเว็บไซต์การเมืองผ่าน MCMC ค้นหา VPN ที่หลีกเลี่ยงการบล็อก MCMC",
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
    alternates: generateAlternates("/countries/malaysia", locale),
  };
}

export default async function MalaysiaVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const countryVpns = allVpns.filter((vpn) =>
    ["nordvpn", "expressvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated March 2026",
      title: "Best VPN for Malaysia",
      subtitle: "Bypass MCMC content blocks and protect your privacy in Malaysia",
      legalStatus: "VPN Legal Status in Malaysia",
      legalStatusText:
        "VPN use is legal in Malaysia. The Malaysian Communications and Multimedia Commission (MCMC) blocks thousands of websites, including gambling, adult content, and politically sensitive material. Internet shutdowns during protests have occurred.",
      blockedVpns: "Content Restrictions in Malaysia",
      blockedList: [
        "Online gambling sites",
        "Adult content websites",
        "Some political websites",
        "Certain news outlets",
        "LGBTQ+ content",
        "Some file-sharing sites",
      ],
      internetFreedom: "Malaysia Internet Freedom Score",
      freedomStats: [
        { value: "96.8%", label: "Internet users (2024)" },
        { value: "Thousands", label: "Sites blocked by MCMC" },
        { value: "39/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Malaysia (2026)",
      whatWorksText:
        "Malaysian ISPs use DNS-based blocking, which most VPNs easily bypass. All major VPN services work reliably in Malaysia.",
      keyFeatures: "Essential Features for Malaysia",
      features: [
        {
          title: "DNS Leak Protection",
          desc: "Prevent DNS requests from bypassing VPN and revealing blocked site access",
        },
        {
          title: "Fast Asian Servers",
          desc: "Connect to Singapore servers for the best speed from Malaysia",
        },
        {
          title: "No-Logs Policy",
          desc: "Ensure your browsing history cannot be shared with authorities",
        },
        {
          title: "Kill Switch",
          desc: "Automatically disconnect if VPN drops to prevent ISP monitoring",
        },
      ],
      blockedServices: "Services Blocked or Restricted in Malaysia",
      blocked: [
        "Gambling websites (MCMC-blocked)",
        "Adult content (DNS-filtered)",
        "Some political opposition websites",
        "Certain independent news portals",
        "LGBTQ+ advocacy sites",
        "Some torrent/file-sharing sites",
      ],
      tips: "Tips for VPN Use in Malaysia",
      tipsList: [
        "Malaysian ISPs use DNS-based blocking - any quality VPN easily bypasses this",
        "Connect to Singapore servers for the best speeds from Malaysia",
        "Use WireGuard protocol for optimal performance",
        "Enable DNS leak protection in your VPN settings",
        "Split tunneling can help with local Malaysian banking apps",
        "Download your VPN before traveling to Malaysia as a precaution",
      ],
      faqTitle: "Malaysia VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in Malaysia?",
          a: "Yes, VPNs are completely legal in Malaysia. There are no laws prohibiting VPN use for personal purposes.",
        },
        {
          q: "What websites are blocked in Malaysia?",
          a: "Malaysia blocks gambling sites, adult content, some political websites, and content deemed to threaten national security through MCMC filtering.",
        },
        {
          q: "Can I access blocked content with a VPN in Malaysia?",
          a: "Yes, since Malaysia uses DNS-based blocking, a VPN can easily bypass these restrictions by routing your traffic through servers in other countries.",
        },
        {
          q: "What is MCMC?",
          a: "The Malaysian Communications and Multimedia Commission (MCMC) is the government body responsible for regulating and blocking internet content in Malaysia.",
        },
      ],
      getVpn: "Get VPN",
      worksInCountry: "Works in Malaysia",
      obfuscation: "DNS Protection",
      lastUpdated: "Last updated: March 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt maart 2026",
      title: "Beste VPN voor Maleisië",
      subtitle: "Omzeil MCMC-inhoudsblokkades en bescherm je privacy in Maleisië",
      legalStatus: "VPN Juridische Status in Maleisië",
      legalStatusText:
        "VPN-gebruik is legaal in Maleisië. De Malaysian Communications and Multimedia Commission (MCMC) blokkeert duizenden websites, waaronder gok-, volwassen- en politiek gevoelig materiaal.",
      blockedVpns: "Inhoudsbeperkingen in Maleisië",
      blockedList: [
        "Online goksites",
        "Websites met volwassen inhoud",
        "Sommige politieke websites",
        "Bepaalde nieuwssites",
        "LGBTQ+ inhoud",
        "Sommige bestandsdeelsites",
      ],
      internetFreedom: "Maleisië Internet Vrijheid Score",
      freedomStats: [
        { value: "96.8%", label: "Internetgebruikers (2024)" },
        { value: "Duizenden", label: "Sites geblokkeerd door MCMC" },
        { value: "39/100", label: "Vrijheidsscore (Gedeeltelijk Vrij)" },
      ],
      whatWorks: "Beste VPNs voor Maleisië (2026)",
      whatWorksText:
        "Maleisische ISP's gebruiken DNS-gebaseerde blokkering, die de meeste VPNs gemakkelijk omzeilen. Alle grote VPN-diensten werken betrouwbaar in Maleisië.",
      keyFeatures: "Essentiële Functies voor Maleisië",
      features: [
        { title: "DNS-Lekbescherming", desc: "Voorkom dat DNS-verzoeken de VPN omzeilen" },
        { title: "Snelle Aziatische Servers", desc: "Verbind met Singapore-servers voor de beste snelheid" },
        { title: "Geen-Logs Beleid", desc: "Zorg ervoor dat je browsegeschiedenis niet gedeeld kan worden" },
        { title: "Kill Switch", desc: "Verbreek automatisch de verbinding als VPN wegvalt" },
      ],
      blockedServices: "Geblokkeerde of Beperkte Diensten in Maleisië",
      blocked: [
        "Gokwebsites (MCMC-geblokkeerd)",
        "Volwassen inhoud (DNS-gefilterd)",
        "Sommige politieke oppositiewebsites",
        "Bepaalde onafhankelijke nieuwsportals",
        "LGBTQ+ belangenbehartigingssites",
        "Sommige torrent/bestandsdeelsites",
      ],
      tips: "Tips voor VPN Gebruik in Maleisië",
      tipsList: [
        "Maleisische ISP's gebruiken DNS-blokkering - elke kwaliteits-VPN omzeilt dit",
        "Verbind met Singapore-servers voor de beste snelheden",
        "Gebruik WireGuard-protocol voor optimale prestaties",
        "Schakel DNS-lekbescherming in",
        "Split tunneling kan helpen met lokale Maleisische bank-apps",
        "Download je VPN voordat je naar Maleisië reist",
      ],
      faqTitle: "Maleisië VPN FAQ",
      faqs: [
        { q: "Zijn VPNs legaal in Maleisië?", a: "Ja, VPNs zijn volledig legaal in Maleisië." },
        { q: "Welke websites zijn geblokkeerd in Maleisië?", a: "Maleisië blokkeert goksites, volwassen inhoud, sommige politieke websites en inhoud die de nationale veiligheid bedreigt." },
        { q: "Kan ik geblokkeerde inhoud bereiken met een VPN?", a: "Ja, aangezien Maleisië DNS-blokkering gebruikt, kan een VPN deze beperkingen gemakkelijk omzeilen." },
        { q: "Wat is MCMC?", a: "De Malaysian Communications and Multimedia Commission (MCMC) is het overheidsorgaan dat verantwoordelijk is voor het reguleren en blokkeren van internetinhoud." },
      ],
      getVpn: "Download VPN",
      worksInCountry: "Werkt in Maleisië",
      obfuscation: "DNS-Bescherming",
      lastUpdated: "Laatst bijgewerkt: maart 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert März 2026",
      title: "Beste VPN für Malaysia",
      subtitle: "Umgehen Sie MCMC-Inhaltssperren und schützen Sie Ihre Privatsphäre in Malaysia",
      legalStatus: "VPN-Rechtsstatus in Malaysia",
      legalStatusText:
        "Die Verwendung eines VPN ist in Malaysia legal. Die Malaysian Communications and Multimedia Commission (MCMC) blockiert Tausende von Websites, darunter Glücksspiel, Erwachseneninhalte und politisch sensibles Material.",
      blockedVpns: "Inhaltsbeschränkungen in Malaysia",
      blockedList: [
        "Online-Glücksspielseiten",
        "Websites mit Erwachseneninhalten",
        "Einige politische Websites",
        "Bestimmte Nachrichtenseiten",
        "LGBTQ+-Inhalte",
        "Einige Filesharing-Seiten",
      ],
      internetFreedom: "Malaysia Internet-Freiheitswert",
      freedomStats: [
        { value: "96.8%", label: "Internetnutzer (2024)" },
        { value: "Tausende", label: "Von MCMC blockierte Seiten" },
        { value: "39/100", label: "Freiheitswert (Teilweise Frei)" },
      ],
      whatWorks: "Beste VPNs für Malaysia (2026)",
      whatWorksText:
        "Malaysische ISPs verwenden DNS-basierte Blockierung, die die meisten VPNs leicht umgehen. Alle großen VPN-Dienste funktionieren zuverlässig in Malaysia.",
      keyFeatures: "Wesentliche Funktionen für Malaysia",
      features: [
        { title: "DNS-Leckschutz", desc: "Verhindern Sie, dass DNS-Anfragen den VPN umgehen" },
        { title: "Schnelle asiatische Server", desc: "Verbinden Sie sich mit Singapur-Servern für beste Geschwindigkeit" },
        { title: "Keine-Logs-Richtlinie", desc: "Stellen Sie sicher, dass Ihr Browserverlauf nicht geteilt werden kann" },
        { title: "Kill Switch", desc: "Automatische Trennung bei VPN-Ausfall" },
      ],
      blockedServices: "Blockierte oder eingeschränkte Dienste in Malaysia",
      blocked: [
        "Glücksspiel-Websites (MCMC-blockiert)",
        "Erwachseneninhalte (DNS-gefiltert)",
        "Einige politische Oppositionswebsites",
        "Bestimmte unabhängige Nachrichtenportale",
        "LGBTQ+-Interessenvertretungsseiten",
        "Einige Torrent/Filesharing-Seiten",
      ],
      tips: "Tipps für VPN-Nutzung in Malaysia",
      tipsList: [
        "Malaysische ISPs verwenden DNS-Blockierung - jedes Qualitäts-VPN umgeht dies leicht",
        "Verbinden Sie sich mit Singapur-Servern für die besten Geschwindigkeiten",
        "Verwenden Sie das WireGuard-Protokoll für optimale Leistung",
        "Aktivieren Sie den DNS-Leckschutz in Ihren VPN-Einstellungen",
        "Split-Tunneling kann bei lokalen malaysischen Banking-Apps helfen",
        "Laden Sie Ihr VPN vor der Reise nach Malaysia herunter",
      ],
      faqTitle: "Malaysia VPN FAQ",
      faqs: [
        { q: "Sind VPNs in Malaysia legal?", a: "Ja, VPNs sind in Malaysia vollständig legal." },
        { q: "Welche Websites sind in Malaysia blockiert?", a: "Malaysia blockiert Glücksspielseiten, Erwachseneninhalte, politische Websites und Inhalte, die die nationale Sicherheit bedrohen." },
        { q: "Kann ich blockierte Inhalte mit einem VPN erreichen?", a: "Ja, da Malaysia DNS-Blockierung verwendet, kann ein VPN diese Einschränkungen leicht umgehen." },
        { q: "Was ist MCMC?", a: "Die Malaysian Communications and Multimedia Commission (MCMC) ist die Regierungsbehörde, die für die Regulierung und Sperrung von Internetinhalten zuständig ist." },
      ],
      getVpn: "VPN erhalten",
      worksInCountry: "Funktioniert in Malaysia",
      obfuscation: "DNS-Schutz",
      lastUpdated: "Zuletzt aktualisiert: März 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado marzo 2026",
      title: "Mejor VPN para Malasia",
      subtitle: "Evita los bloqueos de contenido MCMC y protege tu privacidad en Malasia",
      legalStatus: "Estado legal de VPN en Malasia",
      legalStatusText:
        "El uso de VPN es legal en Malasia. La Comisión de Comunicaciones y Multimedia de Malasia (MCMC) bloquea miles de sitios web, incluyendo juegos de azar, contenido adulto y material políticamente sensible.",
      blockedVpns: "Restricciones de contenido en Malasia",
      blockedList: ["Sitios de apuestas online", "Sitios de contenido adulto", "Algunos sitios web políticos", "Ciertos medios de noticias", "Contenido LGBTQ+", "Algunos sitios de compartición de archivos"],
      internetFreedom: "Puntuación de libertad de internet de Malasia",
      freedomStats: [
        { value: "96.8%", label: "Usuarios de internet (2024)" },
        { value: "Miles", label: "Sitios bloqueados por MCMC" },
        { value: "39/100", label: "Puntuación de libertad (Parcialmente Libre)" },
      ],
      whatWorks: "Mejores VPNs para Malasia (2026)",
      whatWorksText: "Los ISP de Malasia usan bloqueo basado en DNS, que la mayoría de las VPNs evitan fácilmente.",
      keyFeatures: "Características esenciales para Malasia",
      features: [
        { title: "Protección contra fugas DNS", desc: "Evita que las solicitudes DNS eludan la VPN" },
        { title: "Servidores rápidos en Asia", desc: "Conéctate a servidores en Singapur para la mejor velocidad" },
        { title: "Política sin registros", desc: "Asegura que tu historial de navegación no se comparta" },
        { title: "Kill Switch", desc: "Desconexión automática si la VPN cae" },
      ],
      blockedServices: "Servicios bloqueados o restringidos en Malasia",
      blocked: ["Sitios de apuestas (MCMC)", "Contenido adulto (DNS)", "Sitios de oposición política", "Portales de noticias independientes", "Sitios LGBTQ+", "Sitios torrent"],
      tips: "Consejos para usar VPN en Malasia",
      tipsList: [
        "Los ISP de Malasia usan bloqueo DNS - cualquier VPN de calidad lo evita",
        "Usa servidores en Singapur para las mejores velocidades",
        "Usa el protocolo WireGuard para rendimiento óptimo",
        "Habilita la protección contra fugas DNS",
        "Split tunneling ayuda con apps bancarias locales",
        "Descarga tu VPN antes de viajar a Malasia",
      ],
      faqTitle: "FAQ VPN Malasia",
      faqs: [
        { q: "¿Son legales las VPNs en Malasia?", a: "Sí, las VPNs son completamente legales en Malasia." },
        { q: "¿Qué sitios están bloqueados en Malasia?", a: "Malasia bloquea sitios de apuestas, contenido adulto, algunos sitios políticos y contenido que amenaza la seguridad nacional." },
        { q: "¿Puedo acceder a contenido bloqueado con VPN?", a: "Sí, como Malasia usa bloqueo DNS, una VPN puede eludir fácilmente estas restricciones." },
        { q: "¿Qué es MCMC?", a: "La Comisión de Comunicaciones y Multimedia de Malasia (MCMC) es el organismo gubernamental responsable de regular y bloquear contenido de internet." },
      ],
      getVpn: "Obtener VPN",
      worksInCountry: "Funciona en Malasia",
      obfuscation: "Protección DNS",
      lastUpdated: "Última actualización: marzo 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour mars 2026",
      title: "Meilleur VPN pour la Malaisie",
      subtitle: "Contournez les blocages MCMC et protégez votre vie privée en Malaisie",
      legalStatus: "Statut légal du VPN en Malaisie",
      legalStatusText:
        "L'utilisation d'un VPN est légale en Malaisie. La Commission des Communications et du Multimédia de Malaisie (MCMC) bloque des milliers de sites web, y compris les jeux d'argent, le contenu adulte et le matériel politiquement sensible.",
      blockedVpns: "Restrictions de contenu en Malaisie",
      blockedList: ["Sites de jeux d'argent en ligne", "Sites de contenu adulte", "Certains sites politiques", "Certains médias", "Contenu LGBTQ+", "Certains sites de partage de fichiers"],
      internetFreedom: "Score de liberté internet de la Malaisie",
      freedomStats: [
        { value: "96.8%", label: "Utilisateurs internet (2024)" },
        { value: "Milliers", label: "Sites bloqués par MCMC" },
        { value: "39/100", label: "Score de liberté (Partiellement Libre)" },
      ],
      whatWorks: "Meilleurs VPNs pour la Malaisie (2026)",
      whatWorksText: "Les FAI malaisiens utilisent le blocage DNS, que la plupart des VPNs contournent facilement.",
      keyFeatures: "Fonctionnalités essentielles pour la Malaisie",
      features: [
        { title: "Protection contre les fuites DNS", desc: "Empêchez les requêtes DNS de contourner le VPN" },
        { title: "Serveurs asiatiques rapides", desc: "Connectez-vous aux serveurs de Singapour pour la meilleure vitesse" },
        { title: "Politique sans journaux", desc: "Assurez-vous que votre historique ne peut pas être partagé" },
        { title: "Kill Switch", desc: "Déconnexion automatique si le VPN tombe" },
      ],
      blockedServices: "Services bloqués ou restreints en Malaisie",
      blocked: ["Sites de jeux d'argent (MCMC)", "Contenu adulte (DNS)", "Sites d'opposition politique", "Portails d'actualités indépendants", "Sites LGBTQ+", "Sites torrent"],
      tips: "Conseils pour l'utilisation de VPN en Malaisie",
      tipsList: [
        "Les FAI malaisiens utilisent le blocage DNS - tout VPN de qualité le contourne",
        "Utilisez des serveurs à Singapour pour les meilleures vitesses",
        "Utilisez le protocole WireGuard pour des performances optimales",
        "Activez la protection contre les fuites DNS",
        "Le split tunneling aide avec les apps bancaires locales",
        "Téléchargez votre VPN avant de voyager en Malaisie",
      ],
      faqTitle: "FAQ VPN Malaisie",
      faqs: [
        { q: "Les VPNs sont-ils légaux en Malaisie ?", a: "Oui, les VPNs sont entièrement légaux en Malaisie." },
        { q: "Quels sites sont bloqués en Malaisie ?", a: "La Malaisie bloque les sites de jeux, le contenu adulte, certains sites politiques et le contenu menaçant la sécurité nationale." },
        { q: "Puis-je accéder au contenu bloqué avec un VPN ?", a: "Oui, comme la Malaisie utilise le blocage DNS, un VPN peut facilement contourner ces restrictions." },
        { q: "Qu'est-ce que le MCMC ?", a: "La Commission des Communications et du Multimédia de Malaisie (MCMC) est l'organisme gouvernemental responsable de la régulation et du blocage du contenu internet." },
      ],
      getVpn: "Obtenir VPN",
      worksInCountry: "Fonctionne en Malaisie",
      obfuscation: "Protection DNS",
      lastUpdated: "Dernière mise à jour : mars 2026",
      sources: "Sources",
    },
    zh: {
      badge: "更新于2026年3月",
      title: "马来西亚最佳VPN",
      subtitle: "绕过MCMC内容封锁，保护您在马来西亚的隐私",
      legalStatus: "马来西亚VPN法律状态",
      legalStatusText: "在马来西亚使用VPN是合法的。马来西亚通信与多媒体委员会（MCMC）封锁了数千个网站，包括赌博、成人内容和政治敏感材料。",
      blockedVpns: "马来西亚内容限制",
      blockedList: ["在线赌博网站", "成人内容网站", "一些政治网站", "某些新闻网站", "LGBTQ+内容", "一些文件共享网站"],
      internetFreedom: "马来西亚互联网自由评分",
      freedomStats: [
        { value: "96.8%", label: "互联网用户（2024）" },
        { value: "数千", label: "MCMC封锁的网站" },
        { value: "39/100", label: "自由评分（部分自由）" },
      ],
      whatWorks: "马来西亚最佳VPN（2026）",
      whatWorksText: "马来西亚ISP使用基于DNS的封锁，大多数VPN可以轻松绕过。所有主要VPN服务在马来西亚都能可靠运行。",
      keyFeatures: "马来西亚的关键功能",
      features: [
        { title: "DNS泄漏保护", desc: "防止DNS请求绕过VPN" },
        { title: "快速亚洲服务器", desc: "连接到新加坡服务器获得最佳速度" },
        { title: "无日志政策", desc: "确保您的浏览历史不会被共享" },
        { title: "终止开关", desc: "VPN断开时自动断开连接" },
      ],
      blockedServices: "马来西亚封锁或限制的服务",
      blocked: ["赌博网站（MCMC封锁）", "成人内容（DNS过滤）", "一些政治反对派网站", "某些独立新闻门户", "LGBTQ+倡导网站", "一些种子/文件共享网站"],
      tips: "马来西亚VPN使用技巧",
      tipsList: ["马来西亚ISP使用DNS封锁 - 任何优质VPN都可以轻松绕过", "连接到新加坡服务器获得最佳速度", "使用WireGuard协议获得最佳性能", "在VPN设置中启用DNS泄漏保护", "分流隧道可以帮助处理本地马来西亚银行应用", "在前往马来西亚之前下载VPN"],
      faqTitle: "马来西亚VPN常见问题",
      faqs: [
        { q: "VPN在马来西亚合法吗？", a: "是的，VPN在马来西亚完全合法。" },
        { q: "马来西亚封锁了哪些网站？", a: "马来西亚通过MCMC过滤封锁赌博网站、成人内容、一些政治网站和威胁国家安全的内容。" },
        { q: "我可以用VPN访问被封锁的内容吗？", a: "是的，由于马来西亚使用DNS封锁，VPN可以轻松绕过这些限制。" },
        { q: "什么是MCMC？", a: "马来西亚通信与多媒体委员会（MCMC）是负责监管和封锁互联网内容的政府机构。" },
      ],
      getVpn: "获取VPN",
      worksInCountry: "在马来西亚可用",
      obfuscation: "DNS保护",
      lastUpdated: "最后更新：2026年3月",
      sources: "来源",
    },
    ja: {
      badge: "2026年3月更新",
      title: "マレーシアに最適なVPN",
      subtitle: "MCMCコンテンツブロックを回避してマレーシアでプライバシーを保護",
      legalStatus: "マレーシアのVPN法的地位",
      legalStatusText: "マレーシアではVPNの使用は合法です。マレーシア通信マルチメディア委員会（MCMC）は、ギャンブル、アダルトコンテンツ、政治的に敏感な素材を含む数千のウェブサイトをブロックしています。",
      blockedVpns: "マレーシアのコンテンツ制限",
      blockedList: ["オンラインギャンブルサイト", "アダルトコンテンツサイト", "一部の政治サイト", "特定のニュースサイト", "LGBTQ+コンテンツ", "一部のファイル共有サイト"],
      internetFreedom: "マレーシアのインターネット自由度スコア",
      freedomStats: [
        { value: "96.8%", label: "インターネットユーザー（2024）" },
        { value: "数千", label: "MCMCによりブロック" },
        { value: "39/100", label: "自由度スコア（部分的に自由）" },
      ],
      whatWorks: "マレーシアで最適なVPN（2026）",
      whatWorksText: "マレーシアのISPはDNSベースのブロッキングを使用しており、ほとんどのVPNが簡単に回避できます。",
      keyFeatures: "マレーシアに必須の機能",
      features: [
        { title: "DNSリーク保護", desc: "DNSリクエストがVPNをバイパスするのを防止" },
        { title: "高速アジアサーバー", desc: "シンガポールのサーバーに接続して最高速度を実現" },
        { title: "ノーログポリシー", desc: "ブラウジング履歴が共有されないことを確保" },
        { title: "キルスイッチ", desc: "VPNが切断された場合に自動的に接続を切断" },
      ],
      blockedServices: "マレーシアでブロックまたは制限されているサービス",
      blocked: ["ギャンブルサイト（MCMCブロック）", "アダルトコンテンツ（DNSフィルタリング）", "一部の政治野党サイト", "特定の独立ニュースポータル", "LGBTQ+アドボカシーサイト", "一部のトレント/ファイル共有サイト"],
      tips: "マレーシアでのVPN使用のヒント",
      tipsList: ["マレーシアのISPはDNSブロッキングを使用 - 品質の高いVPNなら簡単に回避", "最高の速度のためにシンガポールのサーバーに接続", "WireGuardプロトコルで最適なパフォーマンスを実現", "VPN設定でDNSリーク保護を有効に", "スプリットトンネリングでローカルのマレーシアバンキングアプリに対応", "マレーシアへの旅行前にVPNをダウンロード"],
      faqTitle: "マレーシアVPN FAQ",
      faqs: [
        { q: "マレーシアでVPNは合法ですか？", a: "はい、マレーシアではVPNは完全に合法です。" },
        { q: "マレーシアではどのウェブサイトがブロックされていますか？", a: "マレーシアはMCMCフィルタリングを通じてギャンブルサイト、アダルトコンテンツ、一部の政治サイト、国家安全保障を脅かすコンテンツをブロックしています。" },
        { q: "VPNでブロックされたコンテンツにアクセスできますか？", a: "はい、マレーシアはDNSブロッキングを使用しているため、VPNでこれらの制限を簡単に回避できます。" },
        { q: "MCMCとは何ですか？", a: "マレーシア通信マルチメディア委員会（MCMC）は、インターネットコンテンツの規制とブロックを担当する政府機関です。" },
      ],
      getVpn: "VPNを取得",
      worksInCountry: "マレーシアで機能",
      obfuscation: "DNS保護",
      lastUpdated: "最終更新：2026年3月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 3월 업데이트",
      title: "말레이시아 최고의 VPN",
      subtitle: "MCMC 콘텐츠 차단을 우회하고 말레이시아에서 개인정보를 보호하세요",
      legalStatus: "말레이시아의 VPN 법적 지위",
      legalStatusText: "말레이시아에서 VPN 사용은 합법입니다. 말레이시아 통신멀티미디어위원회(MCMC)는 도박, 성인 콘텐츠, 정치적으로 민감한 자료를 포함한 수천 개의 웹사이트를 차단합니다.",
      blockedVpns: "말레이시아의 콘텐츠 제한",
      blockedList: ["온라인 도박 사이트", "성인 콘텐츠 웹사이트", "일부 정치 웹사이트", "특정 뉴스 매체", "LGBTQ+ 콘텐츠", "일부 파일 공유 사이트"],
      internetFreedom: "말레이시아 인터넷 자유 점수",
      freedomStats: [
        { value: "96.8%", label: "인터넷 사용자 (2024)" },
        { value: "수천", label: "MCMC 차단 사이트" },
        { value: "39/100", label: "자유 점수 (부분적 자유)" },
      ],
      whatWorks: "말레이시아 최고의 VPN (2026)",
      whatWorksText: "말레이시아 ISP는 DNS 기반 차단을 사용하며, 대부분의 VPN이 쉽게 우회할 수 있습니다.",
      keyFeatures: "말레이시아를 위한 필수 기능",
      features: [
        { title: "DNS 누출 보호", desc: "DNS 요청이 VPN을 우회하는 것을 방지" },
        { title: "빠른 아시아 서버", desc: "싱가포르 서버에 연결하여 최고의 속도 확보" },
        { title: "무로그 정책", desc: "브라우징 기록이 공유되지 않도록 보장" },
        { title: "킬 스위치", desc: "VPN이 끊어지면 자동으로 연결 해제" },
      ],
      blockedServices: "말레이시아에서 차단되거나 제한된 서비스",
      blocked: ["도박 웹사이트 (MCMC 차단)", "성인 콘텐츠 (DNS 필터링)", "일부 정치 야당 웹사이트", "특정 독립 뉴스 포털", "LGBTQ+ 옹호 사이트", "일부 토렌트/파일 공유 사이트"],
      tips: "말레이시아에서 VPN 사용 팁",
      tipsList: ["말레이시아 ISP는 DNS 차단을 사용 - 품질 좋은 VPN이면 쉽게 우회", "최고의 속도를 위해 싱가포르 서버에 연결", "최적의 성능을 위해 WireGuard 프로토콜 사용", "VPN 설정에서 DNS 누출 보호 활성화", "분할 터널링으로 현지 말레이시아 뱅킹 앱 사용", "말레이시아 여행 전 VPN 다운로드"],
      faqTitle: "말레이시아 VPN FAQ",
      faqs: [
        { q: "말레이시아에서 VPN은 합법입니까?", a: "네, 말레이시아에서 VPN은 완전히 합법입니다." },
        { q: "말레이시아에서 어떤 웹사이트가 차단됩니까?", a: "말레이시아는 MCMC 필터링을 통해 도박 사이트, 성인 콘텐츠, 일부 정치 웹사이트, 국가 안보를 위협하는 콘텐츠를 차단합니다." },
        { q: "VPN으로 차단된 콘텐츠에 액세스할 수 있습니까?", a: "네, 말레이시아는 DNS 차단을 사용하므로 VPN으로 이러한 제한을 쉽게 우회할 수 있습니다." },
        { q: "MCMC란 무엇입니까?", a: "말레이시아 통신멀티미디어위원회(MCMC)는 인터넷 콘텐츠 규제 및 차단을 담당하는 정부 기관입니다." },
      ],
      getVpn: "VPN 받기",
      worksInCountry: "말레이시아에서 작동",
      obfuscation: "DNS 보호",
      lastUpdated: "마지막 업데이트: 2026년 3월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตมีนาคม 2026",
      title: "VPN ที่ดีที่สุดสำหรับมาเลเซีย",
      subtitle: "หลีกเลี่ยงการบล็อกเนื้อหา MCMC และปกป้องความเป็นส่วนตัวของคุณในมาเลเซีย",
      legalStatus: "สถานะทางกฎหมายของ VPN ในมาเลเซีย",
      legalStatusText: "การใช้ VPN ถูกกฎหมายในมาเลเซีย คณะกรรมการการสื่อสารและมัลติมีเดียมาเลเซีย (MCMC) บล็อกเว็บไซต์หลายพันแห่ง รวมถึงการพนัน เนื้อหาสำหรับผู้ใหญ่ และสื่อที่อ่อนไหวทางการเมือง",
      blockedVpns: "ข้อจำกัดเนื้อหาในมาเลเซีย",
      blockedList: ["เว็บไซต์การพนันออนไลน์", "เว็บไซต์เนื้อหาสำหรับผู้ใหญ่", "เว็บไซต์การเมืองบางแห่ง", "สำนักข่าวบางแห่ง", "เนื้อหา LGBTQ+", "เว็บไซต์แชร์ไฟล์บางแห่ง"],
      internetFreedom: "คะแนนเสรีภาพอินเทอร์เน็ตของมาเลเซีย",
      freedomStats: [
        { value: "96.8%", label: "ผู้ใช้อินเทอร์เน็ต (2024)" },
        { value: "หลายพัน", label: "เว็บไซต์ถูกบล็อกโดย MCMC" },
        { value: "39/100", label: "คะแนนเสรีภาพ (เสรีบางส่วน)" },
      ],
      whatWorks: "VPN ที่ดีที่สุดสำหรับมาเลเซีย (2026)",
      whatWorksText: "ISP ของมาเลเซียใช้การบล็อกแบบ DNS ซึ่ง VPN ส่วนใหญ่สามารถหลีกเลี่ยงได้ง่าย",
      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับมาเลเซีย",
      features: [
        { title: "การป้องกันการรั่วไหลของ DNS", desc: "ป้องกันคำขอ DNS จากการข้าม VPN" },
        { title: "เซิร์ฟเวอร์เอเชียที่รวดเร็ว", desc: "เชื่อมต่อกับเซิร์ฟเวอร์ในสิงคโปร์เพื่อความเร็วที่ดีที่สุด" },
        { title: "นโยบายไม่เก็บบันทึก", desc: "ให้แน่ใจว่าประวัติการเรียกดูไม่สามารถแชร์ได้" },
        { title: "Kill Switch", desc: "ตัดการเชื่อมต่อโดยอัตโนมัติหาก VPN ขาดหาย" },
      ],
      blockedServices: "บริการที่ถูกบล็อกหรือจำกัดในมาเลเซีย",
      blocked: ["เว็บไซต์การพนัน (MCMC บล็อก)", "เนื้อหาสำหรับผู้ใหญ่ (DNS กรอง)", "เว็บไซต์ฝ่ายค้านการเมืองบางแห่ง", "พอร์ทัลข่าวอิสระบางแห่ง", "เว็บไซต์สนับสนุน LGBTQ+", "เว็บไซต์ทอร์เรนต์/แชร์ไฟล์บางแห่ง"],
      tips: "เคล็ดลับสำหรับการใช้ VPN ในมาเลเซีย",
      tipsList: ["ISP ของมาเลเซียใช้การบล็อก DNS - VPN คุณภาพใดก็หลีกเลี่ยงได้", "เชื่อมต่อกับเซิร์ฟเวอร์ในสิงคโปร์เพื่อความเร็วที่ดีที่สุด", "ใช้โปรโตคอล WireGuard เพื่อประสิทธิภาพสูงสุด", "เปิดใช้งานการป้องกันการรั่วไหลของ DNS", "Split tunneling ช่วยกับแอปธนาคารมาเลเซีย", "ดาวน์โหลด VPN ก่อนเดินทางไปมาเลเซีย"],
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ VPN มาเลเซีย",
      faqs: [
        { q: "VPN ถูกกฎหมายในมาเลเซียหรือไม่?", a: "ใช่ VPN ถูกกฎหมายอย่างเต็มที่ในมาเลเซีย" },
        { q: "เว็บไซต์ใดถูกบล็อกในมาเลเซีย?", a: "มาเลเซียบล็อกเว็บไซต์การพนัน เนื้อหาสำหรับผู้ใหญ่ เว็บไซต์การเมืองบางแห่ง และเนื้อหาที่คุกคามความมั่นคงของชาติ" },
        { q: "ฉันสามารถเข้าถึงเนื้อหาที่ถูกบล็อกด้วย VPN ได้หรือไม่?", a: "ได้ เนื่องจากมาเลเซียใช้การบล็อก DNS VPN สามารถหลีกเลี่ยงข้อจำกัดเหล่านี้ได้ง่าย" },
        { q: "MCMC คืออะไร?", a: "คณะกรรมการการสื่อสารและมัลติมีเดียมาเลเซีย (MCMC) เป็นหน่วยงานรัฐบาลที่รับผิดชอบในการกำกับดูแลและบล็อกเนื้อหาอินเทอร์เน็ต" },
      ],
      getVpn: "รับ VPN",
      worksInCountry: "ใช้งานได้ในมาเลเซีย",
      obfuscation: "การป้องกัน DNS",
      lastUpdated: "อัปเดตล่าสุด: มีนาคม 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">{"\ud83c\uddf2\ud83c\uddfe"}</span>
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
                    Content filtered
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.internetFreedom}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.freedomStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.whatWorksText}</p>
          </div>
          <div className="space-y-6">
            {countryVpns.map((vpn, index) => (
              <Card key={vpn.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-muted-foreground">#{index + 1}</div>
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
                          <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="flex-1">
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

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.blockedServices}</h2>
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
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
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

      <section className="py-8 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold mb-4">{t.sources}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a href="https://freedomhouse.org/country/malaysia/freedom-net/2024" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Freedom House - Malaysia: Freedom on the Net 2024
                </a>
              </li>
              <li>
                <a href="https://www.mcmc.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Malaysian Communications and Multimedia Commission (MCMC)
                </a>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <RelatedPages
            title="Related Guides"
            pages={[
              { title: "VPN Guide: Thailand", description: "Bypass content blocks in Thailand", href: "/countries/thailand", icon: "globe" },
              { title: "VPN Guide: Indonesia", description: "Navigate Indonesia's internet restrictions", href: "/countries/indonesia", icon: "globe" },
              { title: "VPN Guide: Singapore", description: "Privacy and content access in Singapore", href: "/countries/singapore", icon: "globe" },
              { title: "All Country Guides", description: "VPN guides for all countries", href: "/countries", icon: "map" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
