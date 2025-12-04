import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnBySlug, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Terminal,
  Shield,
  Code,
  Zap,
  CheckCircle,
  Lock,
  Server,
  Clock,
  ArrowRight,
  Crown,
  Target,
  Globe,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Linux 2025: Native Apps, CLI Support | ZeroToVPN",
    nl: "Beste VPN voor Linux 2025: Native Apps, CLI-ondersteuning | ZeroToVPN",
    de: "Beste VPN für Linux 2025: Native Apps, CLI-Unterstützung | ZeroToVPN",
    es: "Mejor VPN para Linux 2025: Apps Nativas, Soporte CLI | ZeroToVPN",
    fr: "Meilleur VPN pour Linux 2025: Apps Natives, Support CLI | ZeroToVPN",
    zh: "2025年最佳Linux VPN：原生应用，CLI支持 | ZeroToVPN",
    janswer: "Linux用ベストVPN 2025：ネイティブアプリ、CLIサポート | ZeroToVPN",
    ko: "2025년 최고의 리눅스 VPN: 네이티브 앱, CLI 지원 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับ Linux 2025: แอปเนทีฟ, รองรับ CLI | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find the best Linux VPN for 2025. We tested 35+ VPNs for Ubuntu, Debian, Fedora, and more. Native apps, CLI tools, and OpenVPN configs included.",
    nl: "Vind de beste Linux VPN voor 2025. We hebben 35+ VPNs getest voor Ubuntu, Debian, Fedora en meer. Native apps, CLI-tools en OpenVPN-configuraties inbegrepen.",
    de: "Finden Sie das beste Linux-VPN für 2025. Wir haben über 35 VPNs für Ubuntu, Debian, Fedora und mehr getestet. Native Apps, CLI-Tools und OpenVPN-Konfigurationen inklusive.",
    es: "Encuentra la mejor VPN para Linux de 2025. Probamos más de 35 VPNs para Ubuntu, Debian, Fedora y más. Incluye apps nativas, herramientas CLI y configs OpenVPN.",
    fr: "Trouvez le meilleur VPN Linux pour 2025. Nous avons testé plus de 35 VPNs pour Ubuntu, Debian, Fedora et plus. Apps natives, outils CLI et configs OpenVPN inclus.",
    zh: "找到2025年最佳Linux VPN。我们测试了35+个VPN用于Ubuntu、Debian、Fedora等。包含原生应用、CLI工具和OpenVPN配置。",
    janswer: "2025年最高のLinux VPNを見つけよう。Ubuntu、Debian、Fedoraなど35以上のVPNをテストしました。ネイティブアプリ、CLIツール、OpenVPN設定を含みます。",
    ko: "2025년 최고의 리눅스 VPN을 찾으세요. Ubuntu, Debian, Fedora 등 35개 이상의 VPN을 테스트했습니다. 네이티브 앱, CLI 도구 및 OpenVPN 구성 포함.",
    th: "ค้นหา VPN Linux ที่ดีที่สุดในปี 2025 เราทดสอบ VPN มากกว่า 35 รายการสำหรับ Ubuntu, Debian, Fedora และอื่นๆ รวมแอปเนทีฟ, เครื่องมือ CLI และการกำหนดค่า OpenVPN",
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

// Structured Data for Linux VPNs ItemList
function ItemListSchema({ linuxVpns }: { linuxVpns: { vpn: VpnProvider | null }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Linux VPN Services 2025",
    numberOfItems: linuxVpns.length,
    itemListElement: linuxVpns.map((item, index) => ({
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

export default async function LinuxVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get Linux VPNs data
  const nordvpn = await getVpnBySlug("nordvpn");
  const expressvpn = await getVpnBySlug("expressvpn");
  const surfshark = await getVpnBySlug("surfshark");

  // Linux-specific data
  const linuxVpns = [
    {
      vpn: nordvpn,
      badge: "Best Overall",
      badgeColor: "yellow",
      cliSupport: "Full CLI",
      distros: "Ubuntu, Debian, Fedora, Mint",
      protocol: "NordLynx (WireGuard)",
      specialFeatures: ["Native Linux App", "Kill Switch", "Auto-Connect"],
      price: "$2.99/mo",
    },
    {
      vpn: expressvpn,
      badge: "Best CLI",
      badgeColor: "blue",
      cliSupport: "Advanced CLI",
      distros: "Ubuntu, Debian, Fedora, Arch",
      protocol: "Lightway",
      specialFeatures: ["Terminal Control", "Split Tunneling", "Network Lock"],
      price: "$2.44/mo",
    },
    {
      vpn: surfshark,
      badge: "Best Budget",
      badgeColor: "green",
      cliSupport: "Basic CLI",
      distros: "Ubuntu, Debian, Mint",
      protocol: "WireGuard",
      specialFeatures: ["Unlimited Devices", "CleanWeb", "MultiHop"],
      price: "$1.99/mo",
    },
  ];

  // Linux distros
  const supportedDistros = [
    { name: "Ubuntu" },
    { name: "Debian" },
    { name: "Fedora" },
    { name: "Mint" },
    { name: "Arch Linux" },
    { name: "CentOS" },
  ];

  // Content translations
  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for Linux in 2025",
      subtitle:
        "We tested 35+ VPNs specifically for Linux compatibility. These are the best options with native apps, CLI support, and comprehensive distro coverage.",
      topPicks: "Top Linux VPNs",
      whyUseVpn: "Why Use a VPN on Linux?",
      whyUsePoints: [
        {
          title: "Privacy & Security",
          desc: "Protect your online activity with military-grade encryption",
          icon: Shield,
        },
        {
          title: "Native Linux Apps",
          desc: "Full-featured GUI and CLI applications for all major distros",
          icon: Terminal,
        },
        {
          title: "Command Line Control",
          desc: "Automate VPN connections with shell scripts and cron jobs",
          icon: Code,
        },
        {
          title: "Server Administration",
          desc: "Secure SSH sessions and remote server management",
          icon: Server,
        },
        {
          title: "Open Source Friendly",
          desc: "WireGuard and OpenVPN support with config files",
          icon: Lock,
        },
        {
          title: "High Performance",
          desc: "Optimized protocols for minimal system resource usage",
          icon: Zap,
        },
      ],
      distroComparison: "Linux Distro Compatibility",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLI Support",
      },
      setupGuide: "Setup Guides",
      guiSetup: "GUI Installation",
      guiSteps: [
        "Download the .deb or .rpm package for your distro",
        "Install using: sudo dpkg -i vpn-package.deb",
        "Launch the GUI application from your menu",
        "Connect to your preferred server location",
      ],
      cliSetup: "CLI Installation",
      cliSteps: [
        "Add the VPN repository to your package manager",
        "Install via: sudo apt install vpn-package",
        "Configure with: vpn-cli login",
        "Connect using: vpn-cli connect [location]",
      ],
      featuresComparison: "Key Features for Linux Users",
      features: [
        {
          name: "Native Linux App",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Full CLI Support",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN Configs",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuard Support",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "Common CLI Commands",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "Connect to fastest server" },
        { cmd: "vpn-cli connect [country]", desc: "Connect to specific country" },
        { cmd: "vpn-cli disconnect", desc: "Disconnect from VPN" },
        { cmd: "vpn-cli status", desc: "Show connection status" },
        { cmd: "vpn-cli list", desc: "List all available servers" },
        { cmd: "vpn-cli killswitch on", desc: "Enable kill switch" },
      ],
      supportedDistros: "Supported Linux Distributions",
      supportedDistrosData: [
        "Full native support with regular updates",
        "Easy installation via package managers",
        "Community-maintained packages available",
        "OpenVPN configs work on any distro",
        "WireGuard support for modern kernels",
        "ARM support for Raspberry Pi",
      ],
      getVpnButton: "Get",
      ctaTitle: "Secure Your Linux System with a VPN",
      ctaSubtitle: "Native apps, CLI tools, and OpenVPN configs for all major distributions.",
      faqTitle: "Linux VPN FAQs",
      faqs: [
        {
          question: "Which VPN works best with Linux?",
          answer: "NordVPN is the best overall Linux VPN with native apps for Ubuntu, Debian, Fedora, and Mint. It offers a full-featured GUI, comprehensive CLI tools, and automatic kill switch. ExpressVPN has the most advanced CLI with split tunneling support. For budget users, Surfshark works well on Ubuntu and Debian.",
        },
        {
          question: "Can I use a VPN on Linux without a GUI?",
          answer: "Yes! All top Linux VPNs offer CLI (command-line interface) tools. ExpressVPN and NordVPN have the most comprehensive CLI support, allowing you to connect, disconnect, change servers, and configure settings entirely from the terminal. You can also use OpenVPN or WireGuard configs directly.",
        },
        {
          question: "Do Linux VPNs support WireGuard?",
          answer: "Yes, NordVPN uses NordLynx (based on WireGuard) and Surfshark offers native WireGuard support. WireGuard is built into the Linux kernel (5.6+) and offers excellent performance. ExpressVPN uses its proprietary Lightway protocol instead, which is also very fast.",
        },
        {
          question: "How do I install a VPN on Ubuntu or Debian?",
          answer: "Most VPNs offer .deb packages for Ubuntu/Debian. Download the package, then run 'sudo dpkg -i vpn-package.deb' followed by 'sudo apt --fix-broken install' if needed. Alternatively, add the VPN's repository and install via 'sudo apt install vpn-name'.",
        },
        {
          question: "Can I automate VPN connections on Linux?",
          answer: "Yes! With CLI tools, you can create shell scripts to automate VPN connections. You can use cron jobs to connect at startup, systemd services for automatic reconnection, or NetworkManager dispatcher scripts. This is especially useful for servers and automated tasks.",
        },
      ],
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: November 2025",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor Linux in 2025",
      subtitle:
        "We hebben 35+ VPNs specifiek getest voor Linux-compatibiliteit. Dit zijn de beste opties met native apps, CLI-ondersteuning en uitgebreide distro-dekking.",
      topPicks: "Top Linux VPNs",
      whyUseVpn: "Waarom Een VPN Gebruiken Op Linux?",
      whyUsePoints: [
        {
          title: "Privacy & Beveiliging",
          desc: "Bescherm je online activiteit met militaire encryptie",
          icon: Shield,
        },
        {
          title: "Native Linux Apps",
          desc: "Volledige GUI en CLI applicaties voor alle belangrijke distros",
          icon: Terminal,
        },
        {
          title: "Commandoregel Controle",
          desc: "Automatiseer VPN-verbindingen met shell scripts en cron jobs",
          icon: Code,
        },
        {
          title: "Serverbeheer",
          desc: "Beveilig SSH-sessies en extern serverbeheer",
          icon: Server,
        },
        {
          title: "Open Source Vriendelijk",
          desc: "WireGuard en OpenVPN ondersteuning met config bestanden",
          icon: Lock,
        },
        {
          title: "Hoge Prestaties",
          desc: "Geoptimaliseerde protocollen voor minimaal systeemgebruik",
          icon: Zap,
        },
      ],
      distroComparison: "Linux Distro Compatibiliteit",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLI Ondersteuning",
      },
      setupGuide: "Installatiegidsen",
      guiSetup: "GUI Installatie",
      guiSteps: [
        "Download het .deb of .rpm pakket voor je distro",
        "Installeer met: sudo dpkg -i vpn-package.deb",
        "Start de GUI applicatie vanuit je menu",
        "Verbind met je voorkeurslocatie",
      ],
      cliSetup: "CLI Installatie",
      cliSteps: [
        "Voeg de VPN repository toe aan je pakketbeheerder",
        "Installeer via: sudo apt install vpn-package",
        "Configureer met: vpn-cli login",
        "Verbind met: vpn-cli connect [locatie]",
      ],
      featuresComparison: "Belangrijke Functies Voor Linux Gebruikers",
      features: [
        {
          name: "Native Linux App",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Volledige CLI Ondersteuning",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN Configs",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuard Ondersteuning",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "Veelgebruikte CLI Commando's",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "Verbind met snelste server" },
        { cmd: "vpn-cli connect [land]", desc: "Verbind met specifiek land" },
        { cmd: "vpn-cli disconnect", desc: "Verbreek VPN-verbinding" },
        { cmd: "vpn-cli status", desc: "Toon verbindingsstatus" },
        { cmd: "vpn-cli list", desc: "Toon alle beschikbare servers" },
        { cmd: "vpn-cli killswitch on", desc: "Schakel kill switch in" },
      ],
      supportedDistros: "Ondersteunde Linux Distributies",
      supportedDistrosData: [
        "Volledige native ondersteuning met regelmatige updates",
        "Eenvoudige installatie via pakketbeheerders",
        "Community-onderhouden pakketten beschikbaar",
        "OpenVPN configs werken op elke distro",
        "WireGuard ondersteuning voor moderne kernels",
        "ARM ondersteuning voor Raspberry Pi",
      ],
      getVpnButton: "Krijg",
      ctaTitle: "Beveilig Je Linux Systeem Met Een VPN",
      ctaSubtitle: "Native apps, CLI-tools en OpenVPN configs voor alle belangrijke distributies.",
      faqTitle: "Linux VPN Veelgestelde Vragen",
      faqs: [
        {
          question: "Welke VPN werkt het beste met Linux?",
          answer: "NordVPN is de beste algemene Linux VPN met native apps voor Ubuntu, Debian, Fedora en Mint. Het biedt een volledig functionele GUI, uitgebreide CLI-tools en automatische kill switch. ExpressVPN heeft de meest geavanceerde CLI met split tunneling ondersteuning. Voor budgetgebruikers werkt Surfshark goed op Ubuntu en Debian.",
        },
        {
          question: "Kan ik een VPN op Linux gebruiken zonder GUI?",
          answer: "Ja! Alle top Linux VPNs bieden CLI (command-line interface) tools. ExpressVPN en NordVPN hebben de meest uitgebreide CLI-ondersteuning, waarmee je kunt verbinden, verbreken, servers wijzigen en instellingen configureren vanuit de terminal. Je kunt ook OpenVPN of WireGuard configs direct gebruiken.",
        },
        {
          question: "Ondersteunen Linux VPNs WireGuard?",
          answer: "Ja, NordVPN gebruikt NordLynx (gebaseerd op WireGuard) en Surfshark biedt native WireGuard ondersteuning. WireGuard is ingebouwd in de Linux kernel (5.6+) en biedt uitstekende prestaties. ExpressVPN gebruikt in plaats daarvan zijn eigen Lightway protocol, dat ook zeer snel is.",
        },
        {
          question: "Hoe installeer ik een VPN op Ubuntu of Debian?",
          answer: "De meeste VPNs bieden .deb pakketten voor Ubuntu/Debian. Download het pakket en voer 'sudo dpkg -i vpn-package.deb' uit gevolgd door 'sudo apt --fix-broken install' indien nodig. Of voeg de VPN repository toe en installeer via 'sudo apt install vpn-name'.",
        },
        {
          question: "Kan ik VPN-verbindingen automatiseren op Linux?",
          answer: "Ja! Met CLI-tools kun je shell scripts maken om VPN-verbindingen te automatiseren. Je kunt cron jobs gebruiken om bij het opstarten te verbinden, systemd services voor automatische herverbinding, of NetworkManager dispatcher scripts. Dit is vooral handig voor servers en geautomatiseerde taken.",
        },
      ],
      viewAllVpns: "Bekijk Alle VPN Reviews",
      lastUpdated: "Laatst bijgewerkt: november 2025",
    },
    de: {
      badge: "Aktualisiert November 2025",
      title: "Beste VPN für Linux in 2025",
      subtitle:
        "Wir haben über 35 VPNs speziell für Linux-Kompatibilität getestet. Dies sind die besten Optionen mit nativen Apps, CLI-Unterstützung und umfassender Distro-Abdeckung.",
      topPicks: "Top Linux VPNs",
      whyUseVpn: "Warum Ein VPN Auf Linux Verwenden?",
      whyUsePoints: [
        {
          title: "Privatsphäre & Sicherheit",
          desc: "Schützen Sie Ihre Online-Aktivität mit militärischer Verschlüsselung",
          icon: Shield,
        },
        {
          title: "Native Linux Apps",
          desc: "Vollständige GUI- und CLI-Anwendungen für alle wichtigen Distros",
          icon: Terminal,
        },
        {
          title: "Kommandozeilen-Steuerung",
          desc: "Automatisieren Sie VPN-Verbindungen mit Shell-Skripten und Cron-Jobs",
          icon: Code,
        },
        {
          title: "Serververwaltung",
          desc: "Sichern Sie SSH-Sitzungen und Remote-Serververwaltung",
          icon: Server,
        },
        {
          title: "Open-Source-freundlich",
          desc: "WireGuard- und OpenVPN-Unterstützung mit Konfigurationsdateien",
          icon: Lock,
        },
        {
          title: "Hohe Leistung",
          desc: "Optimierte Protokolle für minimale Systemressourcennutzung",
          icon: Zap,
        },
      ],
      distroComparison: "Linux-Distro-Kompatibilität",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLI-Unterstützung",
      },
      setupGuide: "Einrichtungsanleitungen",
      guiSetup: "GUI-Installation",
      guiSteps: [
        "Laden Sie das .deb- oder .rpm-Paket für Ihre Distro herunter",
        "Installieren Sie mit: sudo dpkg -i vpn-package.deb",
        "Starten Sie die GUI-Anwendung aus Ihrem Menü",
        "Verbinden Sie sich mit Ihrem bevorzugten Serverstandort",
      ],
      cliSetup: "CLI-Installation",
      cliSteps: [
        "Fügen Sie das VPN-Repository zu Ihrem Paketmanager hinzu",
        "Installieren Sie über: sudo apt install vpn-package",
        "Konfigurieren Sie mit: vpn-cli login",
        "Verbinden Sie mit: vpn-cli connect [standort]",
      ],
      featuresComparison: "Hauptfunktionen Für Linux-Benutzer",
      features: [
        {
          name: "Native Linux App",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Vollständige CLI-Unterstützung",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN-Konfigurationen",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuard-Unterstützung",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "Häufige CLI-Befehle",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "Mit schnellstem Server verbinden" },
        { cmd: "vpn-cli connect [land]", desc: "Mit bestimmtem Land verbinden" },
        { cmd: "vpn-cli disconnect", desc: "VPN-Verbindung trennen" },
        { cmd: "vpn-cli status", desc: "Verbindungsstatus anzeigen" },
        { cmd: "vpn-cli list", desc: "Alle verfügbaren Server auflisten" },
        { cmd: "vpn-cli killswitch on", desc: "Kill Switch aktivieren" },
      ],
      supportedDistros: "Unterstützte Linux-Distributionen",
      supportedDistrosData: [
        "Vollständige native Unterstützung mit regelmäßigen Updates",
        "Einfache Installation über Paketmanager",
        "Community-gepflegte Pakete verfügbar",
        "OpenVPN-Configs funktionieren auf jeder Distro",
        "WireGuard-Unterstützung für moderne Kernel",
        "ARM-Unterstützung für Raspberry Pi",
      ],
      getVpnButton: "Holen",
      ctaTitle: "Sichern Sie Ihr Linux-System Mit Einem VPN",
      ctaSubtitle: "Native Apps, CLI-Tools und OpenVPN-Konfigurationen für alle wichtigen Distributionen.",
      faqTitle: "Linux VPN Häufig Gestellte Fragen",
      faqs: [
        {
          question: "Welches VPN funktioniert am besten mit Linux?",
          answer: "NordVPN ist das beste Linux-VPN mit nativen Apps für Ubuntu, Debian, Fedora und Mint. Es bietet eine vollständige GUI, umfassende CLI-Tools und automatischen Kill Switch. ExpressVPN hat die fortschrittlichste CLI mit Split-Tunneling-Unterstützung. Für Budget-Nutzer funktioniert Surfshark gut auf Ubuntu und Debian.",
        },
        {
          question: "Kann ich ein VPN auf Linux ohne GUI verwenden?",
          answer: "Ja! Alle Top-Linux-VPNs bieten CLI (Command-Line-Interface) Tools. ExpressVPN und NordVPN haben die umfassendste CLI-Unterstützung, mit der Sie verbinden, trennen, Server wechseln und Einstellungen komplett über das Terminal konfigurieren können. Sie können auch OpenVPN- oder WireGuard-Configs direkt verwenden.",
        },
        {
          question: "Unterstützen Linux-VPNs WireGuard?",
          answer: "Ja, NordVPN verwendet NordLynx (basierend auf WireGuard) und Surfshark bietet native WireGuard-Unterstützung. WireGuard ist in den Linux-Kernel (5.6+) integriert und bietet exzellente Leistung. ExpressVPN verwendet stattdessen sein proprietäres Lightway-Protokoll, das ebenfalls sehr schnell ist.",
        },
        {
          question: "Wie installiere ich ein VPN auf Ubuntu oder Debian?",
          answer: "Die meisten VPNs bieten .deb-Pakete für Ubuntu/Debian. Laden Sie das Paket herunter und führen Sie 'sudo dpkg -i vpn-package.deb' aus, gefolgt von 'sudo apt --fix-broken install' falls nötig. Oder fügen Sie das VPN-Repository hinzu und installieren Sie über 'sudo apt install vpn-name'.",
        },
        {
          question: "Kann ich VPN-Verbindungen auf Linux automatisieren?",
          answer: "Ja! Mit CLI-Tools können Sie Shell-Skripte erstellen, um VPN-Verbindungen zu automatisieren. Sie können Cron-Jobs verwenden, um beim Start zu verbinden, Systemd-Dienste für automatische Wiederverbindung oder NetworkManager-Dispatcher-Skripte. Dies ist besonders nützlich für Server und automatisierte Aufgaben.",
        },
      ],
      viewAllVpns: "Alle VPN-Bewertungen Anzeigen",
      lastUpdated: "Zuletzt aktualisiert: November 2025",
    },
    es: {
      badge: "Actualizado noviembre 2025",
      title: "Mejor VPN para Linux en 2025",
      subtitle:
        "Probamos más de 35 VPNs específicamente para compatibilidad con Linux. Estas son las mejores opciones con apps nativas, soporte CLI y cobertura completa de distros.",
      topPicks: "Mejores VPNs para Linux",
      whyUseVpn: "¿Por Qué Usar Una VPN En Linux?",
      whyUsePoints: [
        {
          title: "Privacidad Y Seguridad",
          desc: "Protege tu actividad en línea con cifrado de grado militar",
          icon: Shield,
        },
        {
          title: "Apps Nativas Linux",
          desc: "Aplicaciones GUI y CLI completas para todas las distros principales",
          icon: Terminal,
        },
        {
          title: "Control De Línea De Comandos",
          desc: "Automatiza conexiones VPN con scripts shell y cron jobs",
          icon: Code,
        },
        {
          title: "Administración De Servidores",
          desc: "Asegura sesiones SSH y gestión remota de servidores",
          icon: Server,
        },
        {
          title: "Amigable Con Código Abierto",
          desc: "Soporte WireGuard y OpenVPN con archivos de configuración",
          icon: Lock,
        },
        {
          title: "Alto Rendimiento",
          desc: "Protocolos optimizados para uso mínimo de recursos del sistema",
          icon: Zap,
        },
      ],
      distroComparison: "Compatibilidad De Distros Linux",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "Soporte CLI",
      },
      setupGuide: "Guías De Configuración",
      guiSetup: "Instalación GUI",
      guiSteps: [
        "Descarga el paquete .deb o .rpm para tu distro",
        "Instala con: sudo dpkg -i vpn-package.deb",
        "Inicia la aplicación GUI desde tu menú",
        "Conéctate a tu ubicación de servidor preferida",
      ],
      cliSetup: "Instalación CLI",
      cliSteps: [
        "Añade el repositorio VPN a tu gestor de paquetes",
        "Instala vía: sudo apt install vpn-package",
        "Configura con: vpn-cli login",
        "Conéctate usando: vpn-cli connect [ubicación]",
      ],
      featuresComparison: "Características Clave Para Usuarios Linux",
      features: [
        {
          name: "App Nativa Linux",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Soporte CLI Completo",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Configs OpenVPN",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Soporte WireGuard",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "Comandos CLI Comunes",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "Conectar al servidor más rápido" },
        { cmd: "vpn-cli connect [país]", desc: "Conectar a país específico" },
        { cmd: "vpn-cli disconnect", desc: "Desconectar de VPN" },
        { cmd: "vpn-cli status", desc: "Mostrar estado de conexión" },
        { cmd: "vpn-cli list", desc: "Listar todos los servidores disponibles" },
        { cmd: "vpn-cli killswitch on", desc: "Activar kill switch" },
      ],
      supportedDistros: "Distribuciones Linux Soportadas",
      supportedDistrosData: [
        "Soporte nativo completo con actualizaciones regulares",
        "Instalación fácil vía gestores de paquetes",
        "Paquetes mantenidos por la comunidad disponibles",
        "Configs OpenVPN funcionan en cualquier distro",
        "Soporte WireGuard para kernels modernos",
        "Soporte ARM para Raspberry Pi",
      ],
      getVpnButton: "Obtener",
      ctaTitle: "Asegura Tu Sistema Linux Con Una VPN",
      ctaSubtitle: "Apps nativas, herramientas CLI y configs OpenVPN para todas las distribuciones principales.",
      faqTitle: "Preguntas Frecuentes Sobre VPN Para Linux",
      faqs: [
        {
          question: "¿Qué VPN funciona mejor con Linux?",
          answer: "NordVPN es la mejor VPN general para Linux con apps nativas para Ubuntu, Debian, Fedora y Mint. Ofrece una GUI completa, herramientas CLI completas y kill switch automático. ExpressVPN tiene la CLI más avanzada con soporte de split tunneling. Para usuarios con presupuesto, Surfshark funciona bien en Ubuntu y Debian.",
        },
        {
          question: "¿Puedo usar una VPN en Linux sin GUI?",
          answer: "¡Sí! Todas las VPNs principales de Linux ofrecen herramientas CLI (interfaz de línea de comandos). ExpressVPN y NordVPN tienen el soporte CLI más completo, permitiéndote conectar, desconectar, cambiar servidores y configurar ajustes completamente desde la terminal. También puedes usar configs OpenVPN o WireGuard directamente.",
        },
        {
          question: "¿Las VPNs de Linux soportan WireGuard?",
          answer: "Sí, NordVPN usa NordLynx (basado en WireGuard) y Surfshark ofrece soporte nativo de WireGuard. WireGuard está integrado en el kernel de Linux (5.6+) y ofrece excelente rendimiento. ExpressVPN usa su protocolo propietario Lightway en su lugar, que también es muy rápido.",
        },
        {
          question: "¿Cómo instalo una VPN en Ubuntu o Debian?",
          answer: "La mayoría de VPNs ofrecen paquetes .deb para Ubuntu/Debian. Descarga el paquete, luego ejecuta 'sudo dpkg -i vpn-package.deb' seguido de 'sudo apt --fix-broken install' si es necesario. Alternativamente, añade el repositorio de la VPN e instala vía 'sudo apt install vpn-name'.",
        },
        {
          question: "¿Puedo automatizar conexiones VPN en Linux?",
          answer: "¡Sí! Con herramientas CLI, puedes crear scripts shell para automatizar conexiones VPN. Puedes usar cron jobs para conectar al inicio, servicios systemd para reconexión automática, o scripts dispatcher de NetworkManager. Esto es especialmente útil para servidores y tareas automatizadas.",
        },
      ],
      viewAllVpns: "Ver Todas Las Reseñas De VPN",
      lastUpdated: "Última actualización: noviembre 2025",
    },
    fr: {
      badge: "Mis à jour novembre 2025",
      title: "Meilleur VPN pour Linux en 2025",
      subtitle:
        "Nous avons testé plus de 35 VPN spécifiquement pour la compatibilité Linux. Ce sont les meilleures options avec apps natives, support CLI et couverture complète des distros.",
      topPicks: "Meilleurs VPN Linux",
      whyUseVpn: "Pourquoi Utiliser Un VPN Sur Linux?",
      whyUsePoints: [
        {
          title: "Confidentialité Et Sécurité",
          desc: "Protégez votre activité en ligne avec un chiffrement de niveau militaire",
          icon: Shield,
        },
        {
          title: "Apps Linux Natives",
          desc: "Applications GUI et CLI complètes pour toutes les distros principales",
          icon: Terminal,
        },
        {
          title: "Contrôle En Ligne De Commande",
          desc: "Automatisez les connexions VPN avec des scripts shell et cron jobs",
          icon: Code,
        },
        {
          title: "Administration De Serveurs",
          desc: "Sécurisez les sessions SSH et la gestion de serveurs distants",
          icon: Server,
        },
        {
          title: "Compatible Open Source",
          desc: "Support WireGuard et OpenVPN avec fichiers de configuration",
          icon: Lock,
        },
        {
          title: "Haute Performance",
          desc: "Protocoles optimisés pour une utilisation minimale des ressources système",
          icon: Zap,
        },
      ],
      distroComparison: "Compatibilité Des Distros Linux",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "Support CLI",
      },
      setupGuide: "Guides D'installation",
      guiSetup: "Installation GUI",
      guiSteps: [
        "Téléchargez le package .deb ou .rpm pour votre distro",
        "Installez avec: sudo dpkg -i vpn-package.deb",
        "Lancez l'application GUI depuis votre menu",
        "Connectez-vous à votre emplacement de serveur préféré",
      ],
      cliSetup: "Installation CLI",
      cliSteps: [
        "Ajoutez le dépôt VPN à votre gestionnaire de paquets",
        "Installez via: sudo apt install vpn-package",
        "Configurez avec: vpn-cli login",
        "Connectez-vous avec: vpn-cli connect [emplacement]",
      ],
      featuresComparison: "Fonctionnalités Clés Pour Les Utilisateurs Linux",
      features: [
        {
          name: "App Linux Native",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Support CLI Complet",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Configs OpenVPN",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Support WireGuard",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "Commandes CLI Courantes",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "Se connecter au serveur le plus rapide" },
        { cmd: "vpn-cli connect [pays]", desc: "Se connecter à un pays spécifique" },
        { cmd: "vpn-cli disconnect", desc: "Se déconnecter du VPN" },
        { cmd: "vpn-cli status", desc: "Afficher l'état de connexion" },
        { cmd: "vpn-cli list", desc: "Lister tous les serveurs disponibles" },
        { cmd: "vpn-cli killswitch on", desc: "Activer le kill switch" },
      ],
      supportedDistros: "Distributions Linux Supportées",
      supportedDistrosData: [
        "Support natif complet avec mises à jour régulières",
        "Installation facile via gestionnaires de paquets",
        "Paquets maintenus par la communauté disponibles",
        "Les configs OpenVPN fonctionnent sur toute distro",
        "Support WireGuard pour les noyaux modernes",
        "Support ARM pour Raspberry Pi",
      ],
      getVpnButton: "Obtenir",
      ctaTitle: "Sécurisez Votre Système Linux Avec Un VPN",
      ctaSubtitle: "Apps natives, outils CLI et configs OpenVPN pour toutes les distributions principales.",
      faqTitle: "Questions Fréquentes Sur VPN Pour Linux",
      faqs: [
        {
          question: "Quel VPN fonctionne le mieux avec Linux?",
          answer: "NordVPN est le meilleur VPN Linux global avec des apps natives pour Ubuntu, Debian, Fedora et Mint. Il offre une GUI complète, des outils CLI complets et un kill switch automatique. ExpressVPN a la CLI la plus avancée avec support de split tunneling. Pour les utilisateurs à budget limité, Surfshark fonctionne bien sur Ubuntu et Debian.",
        },
        {
          question: "Puis-je utiliser un VPN sur Linux sans GUI?",
          answer: "Oui! Tous les VPN Linux principaux offrent des outils CLI (interface en ligne de commande). ExpressVPN et NordVPN ont le support CLI le plus complet, vous permettant de connecter, déconnecter, changer de serveurs et configurer les paramètres entièrement depuis le terminal. Vous pouvez aussi utiliser directement des configs OpenVPN ou WireGuard.",
        },
        {
          question: "Les VPN Linux supportent-ils WireGuard?",
          answer: "Oui, NordVPN utilise NordLynx (basé sur WireGuard) et Surfshark offre un support natif de WireGuard. WireGuard est intégré au noyau Linux (5.6+) et offre d'excellentes performances. ExpressVPN utilise son protocole propriétaire Lightway à la place, qui est également très rapide.",
        },
        {
          question: "Comment installer un VPN sur Ubuntu ou Debian?",
          answer: "La plupart des VPN offrent des paquets .deb pour Ubuntu/Debian. Téléchargez le paquet, puis exécutez 'sudo dpkg -i vpn-package.deb' suivi de 'sudo apt --fix-broken install' si nécessaire. Alternativement, ajoutez le dépôt du VPN et installez via 'sudo apt install vpn-name'.",
        },
        {
          question: "Puis-je automatiser les connexions VPN sur Linux?",
          answer: "Oui! Avec des outils CLI, vous pouvez créer des scripts shell pour automatiser les connexions VPN. Vous pouvez utiliser des cron jobs pour vous connecter au démarrage, des services systemd pour la reconnexion automatique, ou des scripts dispatcher de NetworkManager. C'est particulièrement utile pour les serveurs et les tâches automatisées.",
        },
      ],
      viewAllVpns: "Voir Toutes Les Critiques VPN",
      lastUpdated: "Dernière mise à jour: novembre 2025",
    },
    zh: {
      badge: "2025年11月更新",
      title: "2025年最佳Linux VPN",
      subtitle:
        "我们专门测试了35+个VPN的Linux兼容性。这些是具有原生应用、CLI支持和全面发行版覆盖的最佳选择。",
      topPicks: "顶级Linux VPN",
      whyUseVpn: "为什么在Linux上使用VPN？",
      whyUsePoints: [
        {
          title: "隐私与安全",
          desc: "使用军用级加密保护您的在线活动",
          icon: Shield,
        },
        {
          title: "原生Linux应用",
          desc: "适用于所有主要发行版的全功能GUI和CLI应用程序",
          icon: Terminal,
        },
        {
          title: "命令行控制",
          desc: "使用shell脚本和cron作业自动化VPN连接",
          icon: Code,
        },
        {
          title: "服务器管理",
          desc: "保护SSH会话和远程服务器管理",
          icon: Server,
        },
        {
          title: "开源友好",
          desc: "支持WireGuard和OpenVPN配置文件",
          icon: Lock,
        },
        {
          title: "高性能",
          desc: "优化协议以实现最小系统资源使用",
          icon: Zap,
        },
      ],
      distroComparison: "Linux发行版兼容性",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLI支持",
      },
      setupGuide: "设置指南",
      guiSetup: "GUI安装",
      guiSteps: [
        "下载适合您发行版的.deb或.rpm包",
        "使用以下命令安装: sudo dpkg -i vpn-package.deb",
        "从菜单启动GUI应用程序",
        "连接到您首选的服务器位置",
      ],
      cliSetup: "CLI安装",
      cliSteps: [
        "将VPN存储库添加到您的包管理器",
        "通过以下命令安装: sudo apt install vpn-package",
        "使用以下命令配置: vpn-cli login",
        "使用以下命令连接: vpn-cli connect [位置]",
      ],
      featuresComparison: "Linux用户的关键功能",
      features: [
        {
          name: "原生Linux应用",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "完整CLI支持",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "终止开关",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "分割隧道",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN配置",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuard支持",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "常用CLI命令",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "连接到最快的服务器" },
        { cmd: "vpn-cli connect [国家]", desc: "连接到特定国家" },
        { cmd: "vpn-cli disconnect", desc: "断开VPN连接" },
        { cmd: "vpn-cli status", desc: "显示连接状态" },
        { cmd: "vpn-cli list", desc: "列出所有可用服务器" },
        { cmd: "vpn-cli killswitch on", desc: "启用终止开关" },
      ],
      supportedDistros: "支持的Linux发行版",
      supportedDistrosData: [
        "定期更新的完整原生支持",
        "通过包管理器轻松安装",
        "可用社区维护的包",
        "OpenVPN配置适用于任何发行版",
        "支持现代内核的WireGuard",
        "支持Raspberry Pi的ARM",
      ],
      getVpnButton: "获取",
      ctaTitle: "使用VPN保护您的Linux系统",
      ctaSubtitle: "适用于所有主要发行版的原生应用、CLI工具和OpenVPN配置。",
      faqTitle: "Linux VPN常见问题",
      faqs: [
        {
          question: "哪个VPN最适合Linux？",
          answer: "NordVPN是最佳的Linux VPN，为Ubuntu、Debian、Fedora和Mint提供原生应用。它提供功能齐全的GUI、全面的CLI工具和自动终止开关。ExpressVPN具有最先进的CLI和分割隧道支持。对于预算用户，Surfshark在Ubuntu和Debian上运行良好。",
        },
        {
          question: "我可以在没有GUI的情况下在Linux上使用VPN吗？",
          answer: "可以！所有顶级Linux VPN都提供CLI（命令行界面）工具。ExpressVPN和NordVPN拥有最全面的CLI支持，允许您完全从终端连接、断开连接、更改服务器和配置设置。您还可以直接使用OpenVPN或WireGuard配置。",
        },
        {
          question: "Linux VPN支持WireGuard吗？",
          answer: "是的，NordVPN使用NordLynx（基于WireGuard），Surfshark提供原生WireGuard支持。WireGuard内置于Linux内核（5.6+）中，提供出色的性能。ExpressVPN改用其专有的Lightway协议，该协议也非常快。",
        },
        {
          question: "如何在Ubuntu或Debian上安装VPN？",
          answer: "大多数VPN为Ubuntu/Debian提供.deb包。下载包，然后运行'sudo dpkg -i vpn-package.deb'，如果需要，再运行'sudo apt --fix-broken install'。或者，添加VPN存储库并通过'sudo apt install vpn-name'安装。",
        },
        {
          question: "我可以在Linux上自动化VPN连接吗？",
          answer: "可以！使用CLI工具，您可以创建shell脚本来自动化VPN连接。您可以使用cron作业在启动时连接，使用systemd服务进行自动重新连接，或使用NetworkManager调度程序脚本。这对于服务器和自动化任务特别有用。",
        },
      ],
      viewAllVpns: "查看所有VPN评论",
      lastUpdated: "最后更新：2025年11月",
    },
    ja: {
      badge: "2025年11月更新",
      title: "2025年最高のLinux VPN",
      subtitle:
        "Linux互換性に特化して35以上のVPNをテストしました。ネイティブアプリ、CLIサポート、包括的なディストリビューションカバレッジを備えた最良のオプションです。",
      topPicks: "トップLinux VPN",
      whyUseVpn: "なぜLinuxでVPNを使用するのか？",
      whyUsePoints: [
        {
          title: "プライバシーとセキュリティ",
          desc: "軍事グレードの暗号化でオンライン活動を保護",
          icon: Shield,
        },
        {
          title: "ネイティブLinuxアプリ",
          desc: "すべての主要ディストリビューション用のフル機能GUIおよびCLIアプリケーション",
          icon: Terminal,
        },
        {
          title: "コマンドライン制御",
          desc: "シェルスクリプトとcronジョブでVPN接続を自動化",
          icon: Code,
        },
        {
          title: "サーバー管理",
          desc: "SSHセッションとリモートサーバー管理を保護",
          icon: Server,
        },
        {
          title: "オープンソースフレンドリー",
          desc: "設定ファイル付きのWireGuardおよびOpenVPNサポート",
          icon: Lock,
        },
        {
          title: "高性能",
          desc: "最小限のシステムリソース使用のための最適化されたプロトコル",
          icon: Zap,
        },
      ],
      distroComparison: "Linuxディストリビューション互換性",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLIサポート",
      },
      setupGuide: "セットアップガイド",
      guiSetup: "GUIインストール",
      guiSteps: [
        "ディストリビューション用の.debまたは.rpmパッケージをダウンロード",
        "次のコマンドでインストール: sudo dpkg -i vpn-package.deb",
        "メニューからGUIアプリケーションを起動",
        "お好みのサーバーロケーションに接続",
      ],
      cliSetup: "CLIインストール",
      cliSteps: [
        "パッケージマネージャーにVPNリポジトリを追加",
        "次のコマンドでインストール: sudo apt install vpn-package",
        "次のコマンドで設定: vpn-cli login",
        "次のコマンドで接続: vpn-cli connect [ロケーション]",
      ],
      featuresComparison: "Linuxユーザー向けの主要機能",
      features: [
        {
          name: "ネイティブLinuxアプリ",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "完全なCLIサポート",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "キルスイッチ",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "スプリットトンネリング",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN設定",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuardサポート",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "一般的なCLIコマンド",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "最速サーバーに接続" },
        { cmd: "vpn-cli connect [国]", desc: "特定の国に接続" },
        { cmd: "vpn-cli disconnect", desc: "VPN接続を切断" },
        { cmd: "vpn-cli status", desc: "接続ステータスを表示" },
        { cmd: "vpn-cli list", desc: "利用可能なすべてのサーバーをリスト" },
        { cmd: "vpn-cli killswitch on", desc: "キルスイッチを有効化" },
      ],
      supportedDistros: "サポートされているLinuxディストリビューション",
      supportedDistrosData: [
        "定期的な更新による完全なネイティブサポート",
        "パッケージマネージャーによる簡単なインストール",
        "コミュニティメンテナンスのパッケージが利用可能",
        "OpenVPN設定はすべてのディストリビューションで動作",
        "最新カーネル用のWireGuardサポート",
        "Raspberry Pi用のARMサポート",
      ],
      getVpnButton: "入手",
      ctaTitle: "VPNでLinuxシステムを保護",
      ctaSubtitle: "すべての主要ディストリビューション用のネイティブアプリ、CLIツール、OpenVPN設定。",
      faqTitle: "Linux VPN よくある質問",
      faqs: [
        {
          question: "Linuxで最も効果的なVPNは？",
          answer: "NordVPNは、Ubuntu、Debian、Fedora、Mint用のネイティブアプリを備えた最高の総合Linux VPNです。フル機能のGUI、包括的なCLIツール、自動キルスイッチを提供します。ExpressVPNは、スプリットトンネリングサポート付きの最先端CLIを備えています。予算重視のユーザーには、SurfsharkがUbuntuとDebianで良好に動作します。",
        },
        {
          question: "GUIなしでLinuxでVPNを使用できますか？",
          answer: "はい！すべてのトップLinux VPNはCLI（コマンドラインインターフェース）ツールを提供しています。ExpressVPNとNordVPNは最も包括的なCLIサポートを備えており、ターミナルから完全に接続、切断、サーバー変更、設定の構成が可能です。OpenVPNまたはWireGuard設定を直接使用することもできます。",
        },
        {
          question: "Linux VPNはWireGuardをサポートしていますか？",
          answer: "はい、NordVPNはNordLynx（WireGuardベース）を使用し、SurfsharkはネイティブのWireGuardサポートを提供しています。WireGuardはLinuxカーネル（5.6+）に組み込まれており、優れたパフォーマンスを提供します。ExpressVPNは代わりに独自のLightwayプロトコルを使用しており、これも非常に高速です。",
        },
        {
          question: "UbuntuまたはDebianにVPNをインストールする方法は？",
          answer: "ほとんどのVPNはUbuntu/Debian用の.debパッケージを提供しています。パッケージをダウンロードし、'sudo dpkg -i vpn-package.deb'を実行し、必要に応じて'sudo apt --fix-broken install'を実行します。または、VPNのリポジトリを追加し、'sudo apt install vpn-name'でインストールします。",
        },
        {
          question: "LinuxでVPN接続を自動化できますか？",
          answer: "はい！CLIツールを使用すると、VPN接続を自動化するシェルスクリプトを作成できます。起動時に接続するためのcronジョブ、自動再接続のためのsystemdサービス、またはNetworkManagerディスパッチャースクリプトを使用できます。これはサーバーと自動化タスクに特に便利です。",
        },
      ],
      viewAllVpns: "すべてのVPNレビューを表示",
      lastUpdated: "最終更新：2025年11月",
    },
    ko: {
      badge: "2025년 11월 업데이트",
      title: "2025년 최고의 리눅스 VPN",
      subtitle:
        "Linux 호환성을 위해 35개 이상의 VPN을 테스트했습니다. 네이티브 앱, CLI 지원 및 포괄적인 배포판 적용 범위를 갖춘 최고의 옵션입니다.",
      topPicks: "최고의 리눅스 VPN",
      whyUseVpn: "왜 리눅스에서 VPN을 사용해야 하나요?",
      whyUsePoints: [
        {
          title: "개인정보 보호 및 보안",
          desc: "군사급 암호화로 온라인 활동 보호",
          icon: Shield,
        },
        {
          title: "네이티브 리눅스 앱",
          desc: "모든 주요 배포판용 전체 기능 GUI 및 CLI 애플리케이션",
          icon: Terminal,
        },
        {
          title: "명령줄 제어",
          desc: "셸 스크립트 및 cron 작업으로 VPN 연결 자동화",
          icon: Code,
        },
        {
          title: "서버 관리",
          desc: "SSH 세션 및 원격 서버 관리 보안",
          icon: Server,
        },
        {
          title: "오픈 소스 친화적",
          desc: "구성 파일이 포함된 WireGuard 및 OpenVPN 지원",
          icon: Lock,
        },
        {
          title: "고성능",
          desc: "최소 시스템 리소스 사용을 위한 최적화된 프로토콜",
          icon: Zap,
        },
      ],
      distroComparison: "리눅스 배포판 호환성",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "CLI 지원",
      },
      setupGuide: "설정 가이드",
      guiSetup: "GUI 설치",
      guiSteps: [
        "배포판용 .deb 또는 .rpm 패키지 다운로드",
        "다음 명령으로 설치: sudo dpkg -i vpn-package.deb",
        "메뉴에서 GUI 애플리케이션 실행",
        "선호하는 서버 위치에 연결",
      ],
      cliSetup: "CLI 설치",
      cliSteps: [
        "패키지 관리자에 VPN 저장소 추가",
        "다음 명령으로 설치: sudo apt install vpn-package",
        "다음 명령으로 구성: vpn-cli login",
        "다음 명령으로 연결: vpn-cli connect [위치]",
      ],
      featuresComparison: "리눅스 사용자를 위한 주요 기능",
      features: [
        {
          name: "네이티브 리눅스 앱",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "전체 CLI 지원",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "킬 스위치",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "스플릿 터널링",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "OpenVPN 구성",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "WireGuard 지원",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "일반적인 CLI 명령",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "가장 빠른 서버에 연결" },
        { cmd: "vpn-cli connect [국가]", desc: "특정 국가에 연결" },
        { cmd: "vpn-cli disconnect", desc: "VPN 연결 해제" },
        { cmd: "vpn-cli status", desc: "연결 상태 표시" },
        { cmd: "vpn-cli list", desc: "사용 가능한 모든 서버 나열" },
        { cmd: "vpn-cli killswitch on", desc: "킬 스위치 활성화" },
      ],
      supportedDistros: "지원되는 리눅스 배포판",
      supportedDistrosData: [
        "정기 업데이트가 포함된 완전한 네이티브 지원",
        "패키지 관리자를 통한 간편한 설치",
        "커뮤니티 유지 관리 패키지 사용 가능",
        "OpenVPN 구성은 모든 배포판에서 작동",
        "최신 커널용 WireGuard 지원",
        "Raspberry Pi용 ARM 지원",
      ],
      getVpnButton: "가져오기",
      ctaTitle: "VPN으로 리눅스 시스템 보안",
      ctaSubtitle: "모든 주요 배포판용 네이티브 앱, CLI 도구 및 OpenVPN 구성.",
      faqTitle: "리눅스 VPN 자주 묻는 질문",
      faqs: [
        {
          question: "리눅스에서 가장 잘 작동하는 VPN은 무엇입니까?",
          answer: "NordVPN은 Ubuntu, Debian, Fedora 및 Mint용 네이티브 앱을 갖춘 최고의 전체 Linux VPN입니다. 전체 기능 GUI, 포괄적인 CLI 도구 및 자동 킬 스위치를 제공합니다. ExpressVPN은 스플릿 터널링 지원이 포함된 가장 고급 CLI를 보유하고 있습니다. 예산 사용자의 경우 Surfshark가 Ubuntu 및 Debian에서 잘 작동합니다.",
        },
        {
          question: "GUI 없이 리눅스에서 VPN을 사용할 수 있습니까?",
          answer: "예! 모든 최고의 Linux VPN은 CLI(명령줄 인터페이스) 도구를 제공합니다. ExpressVPN과 NordVPN은 가장 포괄적인 CLI 지원을 제공하여 터미널에서 완전히 연결, 연결 해제, 서버 변경 및 설정 구성이 가능합니다. OpenVPN 또는 WireGuard 구성을 직접 사용할 수도 있습니다.",
        },
        {
          question: "리눅스 VPN은 WireGuard를 지원합니까?",
          answer: "예, NordVPN은 NordLynx(WireGuard 기반)를 사용하고 Surfshark는 네이티브 WireGuard 지원을 제공합니다. WireGuard는 Linux 커널(5.6+)에 내장되어 있으며 우수한 성능을 제공합니다. ExpressVPN은 대신 자체 Lightway 프로토콜을 사용하며 이 역시 매우 빠릅니다.",
        },
        {
          question: "Ubuntu 또는 Debian에 VPN을 어떻게 설치합니까?",
          answer: "대부분의 VPN은 Ubuntu/Debian용 .deb 패키지를 제공합니다. 패키지를 다운로드한 다음 'sudo dpkg -i vpn-package.deb'를 실행하고 필요한 경우 'sudo apt --fix-broken install'을 실행합니다. 또는 VPN 저장소를 추가하고 'sudo apt install vpn-name'을 통해 설치합니다.",
        },
        {
          question: "리눅스에서 VPN 연결을 자동화할 수 있습니까?",
          answer: "예! CLI 도구를 사용하면 VPN 연결을 자동화하는 셸 스크립트를 만들 수 있습니다. 시작 시 연결하기 위해 cron 작업, 자동 재연결을 위한 systemd 서비스 또는 NetworkManager 디스패처 스크립트를 사용할 수 있습니다. 이는 서버 및 자동화 작업에 특히 유용합니다.",
        },
      ],
      viewAllVpns: "모든 VPN 리뷰 보기",
      lastUpdated: "마지막 업데이트: 2025년 11월",
    },
    th: {
      badge: "อัปเดตพฤศจิกายน 2025",
      title: "VPN ที่ดีที่สุดสำหรับ Linux ในปี 2025",
      subtitle:
        "เราทดสอบ VPN มากกว่า 35 รายการโดยเฉพาะสำหรับความเข้ากันได้กับ Linux นี่คือตัวเลือกที่ดีที่สุดพร้อมแอปเนทีฟ, การรองรับ CLI และการครอบคลุมดิสโทรอย่างครอบคลุม",
      topPicks: "VPN Linux ชั้นนำ",
      whyUseVpn: "ทำไมต้องใช้ VPN บน Linux?",
      whyUsePoints: [
        {
          title: "ความเป็นส่วนตัวและความปลอดภัย",
          desc: "ปกป้องกิจกรรมออนไลน์ของคุณด้วยการเข้ารหัสระดับทหาร",
          icon: Shield,
        },
        {
          title: "แอป Linux เนทีฟ",
          desc: "แอปพลิเคชัน GUI และ CLI เต็มรูปแบบสำหรับดิสโทรหลักทั้งหมด",
          icon: Terminal,
        },
        {
          title: "การควบคุมบรรทัดคำสั่ง",
          desc: "ทำให้การเชื่อมต่อ VPN เป็นอัตโนมัติด้วยสคริปต์เชลล์และงาน cron",
          icon: Code,
        },
        {
          title: "การจัดการเซิร์ฟเวอร์",
          desc: "รักษาความปลอดภัยเซสชัน SSH และการจัดการเซิร์ฟเวอร์ระยะไกล",
          icon: Server,
        },
        {
          title: "เป็นมิตรกับโอเพนซอร์ส",
          desc: "รองรับ WireGuard และ OpenVPN พร้อมไฟล์กำหนดค่า",
          icon: Lock,
        },
        {
          title: "ประสิทธิภาพสูง",
          desc: "โปรโตคอลที่ปรับให้เหมาะสมสำหรับการใช้ทรัพยากรระบบน้อยที่สุด",
          icon: Zap,
        },
      ],
      distroComparison: "ความเข้ากันได้ของดิสโทร Linux",
      distroTableHeaders: {
        vpn: "VPN",
        ubuntu: "Ubuntu/Debian",
        fedora: "Fedora/RHEL",
        arch: "Arch Linux",
        cli: "การรองรับ CLI",
      },
      setupGuide: "คู่มือการตั้งค่า",
      guiSetup: "การติดตั้ง GUI",
      guiSteps: [
        "ดาวน์โหลดแพ็กเกจ .deb หรือ .rpm สำหรับดิสโทรของคุณ",
        "ติดตั้งโดยใช้: sudo dpkg -i vpn-package.deb",
        "เปิดแอปพลิเคชัน GUI จากเมนูของคุณ",
        "เชื่อมต่อกับตำแหน่งเซิร์ฟเวอร์ที่คุณต้องการ",
      ],
      cliSetup: "การติดตั้ง CLI",
      cliSteps: [
        "เพิ่มที่เก็บ VPN ไปยังตัวจัดการแพ็กเกจของคุณ",
        "ติดตั้งผ่าน: sudo apt install vpn-package",
        "กำหนดค่าด้วย: vpn-cli login",
        "เชื่อมต่อโดยใช้: vpn-cli connect [ตำแหน่ง]",
      ],
      featuresComparison: "คุณสมบัติสำคัญสำหรับผู้ใช้ Linux",
      features: [
        {
          name: "แอป Linux เนทีฟ",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "การรองรับ CLI เต็มรูปแบบ",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "Kill Switch",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "Split Tunneling",
          nord: true,
          express: true,
          surf: false,
        },
        {
          name: "การกำหนดค่า OpenVPN",
          nord: true,
          express: true,
          surf: true,
        },
        {
          name: "การรองรับ WireGuard",
          nord: true,
          express: false,
          surf: true,
        },
      ],
      cliCommands: "คำสั่ง CLI ทั่วไป",
      cliCommandsData: [
        { cmd: "vpn-cli connect", desc: "เชื่อมต่อกับเซิร์ฟเวอร์ที่เร็วที่สุด" },
        { cmd: "vpn-cli connect [ประเทศ]", desc: "เชื่อมต่อกับประเทศที่ระบุ" },
        { cmd: "vpn-cli disconnect", desc: "ตัดการเชื่อมต่อจาก VPN" },
        { cmd: "vpn-cli status", desc: "แสดงสถานะการเชื่อมต่อ" },
        { cmd: "vpn-cli list", desc: "แสดงรายการเซิร์ฟเวอร์ที่มีทั้งหมด" },
        { cmd: "vpn-cli killswitch on", desc: "เปิดใช้งาน kill switch" },
      ],
      supportedDistros: "ดิสทริบิวชั่น Linux ที่รองรับ",
      supportedDistrosData: [
        "การรองรับเนทีฟแบบเต็มรูปแบบพร้อมการอัปเดตเป็นประจำ",
        "การติดตั้งง่ายผ่านตัวจัดการแพ็กเกจ",
        "แพ็กเกจที่ดูแลโดยชุมชนพร้อมใช้งาน",
        "การกำหนดค่า OpenVPN ทำงานบนดิสโทรใดก็ได้",
        "การรองรับ WireGuard สำหรับเคอร์เนลสมัยใหม่",
        "การรองรับ ARM สำหรับ Raspberry Pi",
      ],
      getVpnButton: "รับ",
      ctaTitle: "รักษาความปลอดภัยระบบ Linux ของคุณด้วย VPN",
      ctaSubtitle: "แอปเนทีฟ, เครื่องมือ CLI และการกำหนดค่า OpenVPN สำหรับดิสทริบิวชั่นหลักทั้งหมด",
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ VPN Linux",
      faqs: [
        {
          question: "VPN ใดทำงานได้ดีที่สุดกับ Linux?",
          answer: "NordVPN เป็น Linux VPN ที่ดีที่สุดโดยรวมพร้อมแอปเนทีฟสำหรับ Ubuntu, Debian, Fedora และ Mint มันมี GUI ที่มีคุณสมบัติครบถ้วน, เครื่องมือ CLI ที่ครอบคลุม และ kill switch อัตโนมัติ ExpressVPN มี CLI ที่ล้ำหน้าที่สุดพร้อมการรองรับ split tunneling สำหรับผู้ใช้ที่มีงบประมาณจำกัด Surfshark ทำงานได้ดีบน Ubuntu และ Debian",
        },
        {
          question: "ฉันสามารถใช้ VPN บน Linux โดยไม่มี GUI ได้หรือไม่?",
          answer: "ได้! VPN Linux ชั้นนำทั้งหมดมีเครื่องมือ CLI (command-line interface) ExpressVPN และ NordVPN มีการรองรับ CLI ที่ครอบคลุมที่สุด ช่วยให้คุณเชื่อมต่อ, ตัดการเชื่อมต่อ, เปลี่ยนเซิร์ฟเวอร์ และกำหนดค่าการตั้งค่าทั้งหมดจากเทอร์มินัล คุณยังสามารถใช้การกำหนดค่า OpenVPN หรือ WireGuard โดยตรง",
        },
        {
          question: "VPN Linux รองรับ WireGuard หรือไม่?",
          answer: "ใช่ NordVPN ใช้ NordLynx (ตาม WireGuard) และ Surfshark มีการรองรับ WireGuard แบบเนทีฟ WireGuard ถูกสร้างเข้าไปในเคอร์เนล Linux (5.6+) และมีประสิทธิภาพที่ยอดเยี่ยม ExpressVPN ใช้โปรโตคอล Lightway ของตนเองแทน ซึ่งก็เร็วมากเช่นกัน",
        },
        {
          question: "ฉันจะติดตั้ง VPN บน Ubuntu หรือ Debian ได้อย่างไร?",
          answer: "VPN ส่วนใหญ่มีแพ็กเกจ .deb สำหรับ Ubuntu/Debian ดาวน์โหลดแพ็กเกจ จากนั้นเรียกใช้ 'sudo dpkg -i vpn-package.deb' ตามด้วย 'sudo apt --fix-broken install' หากจำเป็น หรือเพิ่มที่เก็บของ VPN และติดตั้งผ่าน 'sudo apt install vpn-name'",
        },
        {
          question: "ฉันสามารถทำให้การเชื่อมต่อ VPN เป็นอัตโนมัติบน Linux ได้หรือไม่?",
          answer: "ได้! ด้วยเครื่องมือ CLI คุณสามารถสร้างสคริปต์เชลล์เพื่อทำให้การเชื่อมต่อ VPN เป็นอัตโนมัติ คุณสามารถใช้งาน cron เพื่อเชื่อมต่อเมื่อเริ่มต้นระบบ, บริการ systemd สำหรับการเชื่อมต่อใหม่อัตโนมัติ หรือสคริปต์ dispatcher ของ NetworkManager สิ่งนี้มีประโยชน์อย่างยิ่งสำหรับเซิร์ฟเวอร์และงานอัตโนมัติ",
        },
      ],
      viewAllVpns: "ดูรีวิว VPN ทั้งหมด",
      lastUpdated: "อัปเดตล่าสุด: พฤศจิกายน 2025",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const badgeColors = {
    yellow: "bg-yellow-500 text-yellow-950",
    blue: "bg-blue-500 text-blue-950",
    green: "bg-green-500 text-green-950",
  };

  return (
    <>
      <ItemListSchema linuxVpns={linuxVpns} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[
                { name: "Best VPNs", href: "/best/best-vpn" },
                { name: "Linux VPNs", href: "/best/vpn-linux" }
              ]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Top Linux VPNs */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              {t.topPicks}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {linuxVpns.map((item, index) =>
                item.vpn ? (
                  <Card
                    key={index}
                    className={`relative border-2 border-${item.badgeColor}-500/50 bg-gradient-to-b from-${item.badgeColor}-500/5 to-transparent`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge
                        className={
                          badgeColors[item.badgeColor as keyof typeof badgeColors]
                        }
                      >
                        {item.badgeColor === "yellow" && (
                          <Crown className="h-3 w-3 mr-1" />
                        )}
                        {item.badgeColor === "blue" && (
                          <Terminal className="h-3 w-3 mr-1" />
                        )}
                        {item.badgeColor === "green" && (
                          <Target className="h-3 w-3 mr-1" />
                        )}
                        {item.badge}
                      </Badge>
                    </div>
                    <CardContent className="pt-8 space-y-4">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {item.vpn.name}
                        </h3>
                        <RatingStars rating={item.vpn.overallRating} size="md" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">CLI:</span>
                          <span className="font-medium">{item.cliSupport}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Protocol:</span>
                          <span className="font-medium">{item.protocol}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Distros:</span>
                          <span className="font-medium text-xs">{item.distros}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {item.specialFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-center pt-4 border-t">
                        <div className="text-3xl font-bold text-primary mb-3">
                          {item.price}
                        </div>
                        <AffiliateButton
                          vpnId={item.vpn.id}
                          vpnName={item.vpn.name}
                          affiliateUrl={item.vpn.affiliateUrl}
                          className="w-full"
                        >
                          {t.getVpnButton} {item.vpn.name}
                        </AffiliateButton>
                      </div>
                    </CardContent>
                  </Card>
                ) : null
              )}
            </div>
          </div>
        </section>

        {/* Why Use VPN on Linux */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.whyUseVpn}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.whyUsePoints.map((point, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <point.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Distro Compatibility Table */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.distroComparison}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-4 text-left font-semibold">
                      {t.distroTableHeaders.vpn}
                    </th>
                    <th className="p-4 text-left font-semibold">
                      {t.distroTableHeaders.ubuntu}
                    </th>
                    <th className="p-4 text-left font-semibold">
                      {t.distroTableHeaders.fedora}
                    </th>
                    <th className="p-4 text-left font-semibold">
                      {t.distroTableHeaders.arch}
                    </th>
                    <th className="p-4 text-left font-semibold">
                      {t.distroTableHeaders.cli}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {linuxVpns.map((item, index) =>
                    item.vpn ? (
                      <tr key={index} className="border-t">
                        <td className="p-4 font-medium">{item.vpn.name}</td>
                        <td className="p-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </td>
                        <td className="p-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </td>
                        <td className="p-4">
                          {index === 1 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-muted-foreground text-sm">Config</span>
                          )}
                        </td>
                        <td className="p-4">{item.cliSupport}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Setup Guides */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.setupGuide}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* GUI Setup */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">{t.guiSetup}</h3>
                  </div>
                  <ol className="space-y-3">
                    {t.guiSteps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* CLI Setup */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">{t.cliSetup}</h3>
                  </div>
                  <ol className="space-y-3">
                    {t.cliSteps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.featuresComparison}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-3">
                {t.features.map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                          <span className="font-medium text-sm">{feature.name}</span>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {feature.nord ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {feature.express ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {feature.surf ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLI Commands */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t.cliCommands}</h2>
              </div>
              <div className="space-y-3">
                {t.cliCommandsData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <code className="flex-shrink-0 px-3 py-1 bg-muted rounded text-sm font-mono">
                          {item.cmd}
                        </code>
                        <p className="text-sm text-muted-foreground pt-1">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Supported Distros */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {t.supportedDistros}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportedDistros.map((distro, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-primary" />
                        <h3 className="font-bold">{distro.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t.supportedDistrosData[index]}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {t.faqTitle}
              </h2>
              <div className="space-y-6">
                {t.faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Schema */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                title="Linux VPN FAQs"
                faqs={[
                  {
                    question: "Which VPN has the best Linux support?",
                    answer: "NordVPN offers the best overall Linux support with native GUI apps for Ubuntu 20.04+, Debian 11+, Fedora 36+, and Linux Mint 20+. It includes both a full-featured GUI application and comprehensive CLI tools. The app supports all major features including kill switch, auto-connect, split tunneling, and server selection. ExpressVPN has the most advanced CLI with detailed documentation and supports Ubuntu, Debian, Fedora, and Arch Linux. For users who prefer configuration files, all three top VPNs (NordVPN, ExpressVPN, Surfshark) provide OpenVPN and WireGuard configs that work on any Linux distribution."
                  },
                  {
                    question: "Can I use a VPN on Linux without installing an app?",
                    answer: "Yes, you can use VPNs on Linux without installing their native apps in several ways: 1) OpenVPN configuration files work with the built-in openvpn package on any distro, 2) WireGuard configs work with the wireguard package (built into kernel 5.6+), 3) Network Manager can import VPN configs directly through the GUI. All major VPNs provide downloadable .ovpn config files and WireGuard configs. This method works on any Linux distribution including headless servers, containers, and minimal installations. However, you'll lose access to features like automatic kill switch, server switching, and split tunneling that come with native apps."
                  },
                  {
                    question: "Does Linux need a VPN kill switch?",
                    answer: "Yes, a kill switch is crucial on Linux, especially if you're using the VPN for privacy-sensitive activities, torrenting, or accessing geo-restricted content. A kill switch ensures that if your VPN connection drops, your internet traffic is immediately blocked to prevent IP leaks. NordVPN and ExpressVPN both offer automatic kill switches in their Linux apps. If you're using OpenVPN or WireGuard configs directly, you can implement a kill switch using iptables firewall rules or the ufw (uncomplicated firewall) utility to block all traffic except through the VPN tunnel interface."
                  },
                  {
                    question: "What's the fastest VPN protocol for Linux?",
                    answer: "WireGuard is the fastest VPN protocol for Linux because it's built directly into the Linux kernel (version 5.6 and newer) with only about 4,000 lines of code compared to OpenVPN's 100,000+. NordVPN's NordLynx protocol (based on WireGuard) and Surfshark's WireGuard implementation both offer excellent speeds on Linux. ExpressVPN's Lightway protocol is also very fast and lightweight. For older Linux kernels without WireGuard support, OpenVPN with UDP is the next best option. You can check your kernel version with 'uname -r' - if it's 5.6 or higher, WireGuard will offer the best performance."
                  },
                  {
                    question: "How do I automate VPN on Linux startup?",
                    answer: "You can automate VPN connections on Linux startup in several ways: 1) For native apps: Use systemd to enable the VPN service with 'sudo systemctl enable vpn-name', 2) For CLI tools: Add the connection command to your ~/.bashrc or ~/.profile, 3) For OpenVPN: Create a systemd service file or use 'sudo systemctl enable openvpn@config-name', 4) For WireGuard: Use 'sudo systemctl enable wg-quick@interface-name', 5) For NetworkManager: Enable 'Automatically connect to VPN' in the GUI settings. You can also use cron jobs with '@reboot' to run connection scripts. For servers, systemd services are the most reliable method as they handle reconnection automatically."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t.ctaTitle}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/reviews">
                    {t.viewAllVpns}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <div className="container">
            <RelatedPages
              title="Explore More VPN Categories"
              pages={[
                { title: "Best Overall VPNs", description: "Top-rated VPN services for all uses", href: "/best/best-vpn", icon: "trophy" },
                { title: "Best Free VPNs", description: "Top free VPN options with no subscription", href: "/best/free-vpn", icon: "gift" },
                { title: "Best VPN for Gaming", description: "Low ping VPNs for online gaming", href: "/best/vpn-gaming", icon: "gamepad" },
                { title: "Best Mobile VPNs", description: "VPNs optimized for smartphones", href: "/best/vpn-mobile", icon: "smartphone" },
                { title: "Best VPN for Privacy", description: "Maximum privacy and no-logs VPNs", href: "/best/vpn-privacy", icon: "shield" },
                { title: "VPN Setup Guides", description: "Learn how to configure your VPN", href: "/guides", icon: "map" },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
