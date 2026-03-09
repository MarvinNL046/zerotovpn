// Topic cluster mapping and related content resolver
// Pure TypeScript module — no DB dependencies

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContentType = "review" | "best-of" | "comparison" | "blog" | "guide";

export interface ContentLink {
  type: ContentType;
  title: string;
  titleNl: string;
  description: string;
  descriptionNl: string;
  href: string;
  vpnSlugs?: string[];
  tags?: string[];
  icon?: string;
}

export interface TopicCluster {
  pillar: ContentLink;
  content: ContentLink[];
}

// ---------------------------------------------------------------------------
// Static data: Best-of pages
// ---------------------------------------------------------------------------

export const bestOfPages: ContentLink[] = [
  {
    type: "best-of",
    title: "Best VPN Services",
    titleNl: "Beste VPN-diensten",
    description:
      "Our expert ranking of the top VPN providers based on speed, security, and value.",
    descriptionNl:
      "Onze expertranglijst van de beste VPN-aanbieders op basis van snelheid, beveiliging en prijs-kwaliteit.",
    href: "/best/best-vpn",
    tags: ["general", "overview", "ranking"],
    icon: "trophy",
  },
  {
    type: "best-of",
    title: "Best Free VPNs",
    titleNl: "Beste gratis VPN's",
    description:
      "The best free VPN services that are actually safe to use — no hidden catches.",
    descriptionNl:
      "De beste gratis VPN-diensten die daadwerkelijk veilig zijn — zonder verborgen kosten.",
    href: "/best/free-vpn",
    tags: ["free", "budget", "pricing"],
    icon: "gift",
  },
  {
    type: "best-of",
    title: "Fastest VPNs",
    titleNl: "Snelste VPN's",
    description:
      "The fastest VPN services tested for download speed, upload speed, and latency.",
    descriptionNl:
      "De snelste VPN-diensten getest op downloadsnelheid, uploadsnelheid en latentie.",
    href: "/best/fastest-vpn",
    tags: ["speed", "performance", "fast"],
    icon: "zap",
  },
  {
    type: "best-of",
    title: "Best Cheap VPNs",
    titleNl: "Beste goedkope VPN's",
    description:
      "Affordable VPN services that deliver great value without sacrificing quality.",
    descriptionNl:
      "Betaalbare VPN-diensten die geweldige waarde leveren zonder in te boeten op kwaliteit.",
    href: "/best/vpn-cheap",
    tags: ["cheap", "budget", "pricing", "value"],
    icon: "tag",
  },
  {
    type: "best-of",
    title: "Best VPN for Gaming",
    titleNl: "Beste VPN voor gaming",
    description:
      "Low-ping VPNs optimised for online gaming, with DDoS protection and fast servers.",
    descriptionNl:
      "VPN's met lage ping, geoptimaliseerd voor online gaming met DDoS-bescherming en snelle servers.",
    href: "/best/vpn-gaming",
    tags: ["gaming", "speed", "ping"],
    icon: "gamepad",
  },
  {
    type: "best-of",
    title: "Best VPN for Streaming",
    titleNl: "Beste VPN voor streaming",
    description:
      "VPNs that reliably unblock Netflix, Disney+, BBC iPlayer, and other streaming platforms.",
    descriptionNl:
      "VPN's die betrouwbaar Netflix, Disney+, BBC iPlayer en andere streamingplatformen deblokkeren.",
    href: "/best/vpn-streaming",
    tags: ["streaming", "netflix", "entertainment", "unblock"],
    icon: "play",
  },
  {
    type: "best-of",
    title: "Best VPN for Netflix",
    titleNl: "Beste VPN voor Netflix",
    description:
      "VPNs that work with Netflix to unlock libraries from around the world.",
    descriptionNl:
      "VPN's die werken met Netflix om bibliotheken van over de hele wereld te ontgrendelen.",
    href: "/best/vpn-netflix",
    tags: ["netflix", "streaming", "unblock", "entertainment"],
    icon: "play",
  },
  {
    type: "best-of",
    title: "Best VPN for Torrenting",
    titleNl: "Beste VPN voor torrenting",
    description:
      "Fast, secure VPNs with P2P support and a strict no-logs policy for safe torrenting.",
    descriptionNl:
      "Snelle, veilige VPN's met P2P-ondersteuning en een strikt no-logs-beleid voor veilig torrenten.",
    href: "/best/vpn-torrenting",
    tags: ["torrenting", "p2p", "privacy", "downloads"],
    icon: "download",
  },
  {
    type: "best-of",
    title: "Best VPN for Privacy",
    titleNl: "Beste VPN voor privacy",
    description:
      "Privacy-focused VPNs with audited no-logs policies and strong encryption.",
    descriptionNl:
      "Privacy-gerichte VPN's met gecontroleerde no-logs-beleidsregels en sterke encryptie.",
    href: "/best/vpn-privacy",
    tags: ["privacy", "no-logs", "security", "encryption"],
    icon: "shield",
  },
  {
    type: "best-of",
    title: "Best VPN for iPhone",
    titleNl: "Beste VPN voor iPhone",
    description:
      "Top-rated VPN apps for iOS — easy to use and built for iPhone and iPad.",
    descriptionNl:
      "Topbeoordeelde VPN-apps voor iOS — gebruiksvriendelijk en gemaakt voor iPhone en iPad.",
    href: "/best/vpn-iphone",
    tags: ["ios", "iphone", "mobile", "apple"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Android",
    titleNl: "Beste VPN voor Android",
    description:
      "The best VPN apps for Android phones and tablets, tested for speed and reliability.",
    descriptionNl:
      "De beste VPN-apps voor Android-telefoons en tablets, getest op snelheid en betrouwbaarheid.",
    href: "/best/vpn-android",
    tags: ["android", "mobile"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Mobile",
    titleNl: "Beste VPN voor mobiel",
    description:
      "Top VPN apps for smartphones — optimised for mobile data, battery life, and ease of use.",
    descriptionNl:
      "Top VPN-apps voor smartphones — geoptimaliseerd voor mobiele data, batterijduur en gebruiksgemak.",
    href: "/best/vpn-mobile",
    tags: ["mobile", "ios", "android", "smartphone"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Tablets",
    titleNl: "Beste VPN voor tablets",
    description:
      "VPN apps optimised for tablet screens on Android and iOS devices.",
    descriptionNl:
      "VPN-apps geoptimaliseerd voor tabletschermen op Android- en iOS-apparaten.",
    href: "/best/vpn-tablet",
    tags: ["tablet", "mobile", "android"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for iPad",
    titleNl: "Beste VPN voor iPad",
    description:
      "Top VPN apps designed for iPad with split-screen support and intuitive interfaces.",
    descriptionNl:
      "Top VPN-apps ontworpen voor iPad met split-screen ondersteuning en intuïtieve interfaces.",
    href: "/best/vpn-ipad",
    tags: ["ipad", "ios", "tablet", "apple"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Android Tablets",
    titleNl: "Beste VPN voor Android-tablets",
    description:
      "VPN apps built for Android tablets with large-screen layouts and fast connections.",
    descriptionNl:
      "VPN-apps gebouwd voor Android-tablets met grote schermindelingen en snelle verbindingen.",
    href: "/best/vpn-android-tablet",
    tags: ["android", "tablet", "mobile"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Windows Tablets",
    titleNl: "Beste VPN voor Windows-tablets",
    description:
      "VPNs with touch-friendly Windows apps, perfect for Surface and other Windows tablets.",
    descriptionNl:
      "VPN's met touch-vriendelijke Windows-apps, perfect voor Surface en andere Windows-tablets.",
    href: "/best/vpn-windows-tablet",
    tags: ["windows", "tablet", "surface", "touch"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Laptops",
    titleNl: "Beste VPN voor laptops",
    description:
      "Top VPNs for Windows and Mac laptops — lightweight apps with full protection.",
    descriptionNl:
      "Top-VPN's voor Windows- en Mac-laptops — lichte apps met volledige bescherming.",
    href: "/best/vpn-laptops",
    tags: ["laptop", "desktop", "windows", "mac"],
    icon: "laptop",
  },
  {
    type: "best-of",
    title: "Best VPN for Windows",
    titleNl: "Beste VPN voor Windows",
    description:
      "Top VPN apps for Windows PCs and laptops with native clients and full feature sets.",
    descriptionNl:
      "Top VPN-apps voor Windows-pc's en laptops met native clients en volledige functies.",
    href: "/best/vpn-windows",
    tags: ["windows", "desktop", "pc"],
    icon: "laptop",
  },
  {
    type: "best-of",
    title: "Best VPN for macOS",
    titleNl: "Beste VPN voor macOS",
    description:
      "VPN apps designed for Mac — native performance, beautiful interfaces, and deep OS integration.",
    descriptionNl:
      "VPN-apps ontworpen voor Mac — native prestaties, mooie interfaces en diepe OS-integratie.",
    href: "/best/vpn-macos",
    tags: ["macos", "mac", "apple", "desktop"],
    icon: "laptop",
  },
  {
    type: "best-of",
    title: "Best VPN for Linux",
    titleNl: "Beste VPN voor Linux",
    description:
      "VPNs with native Linux clients or easy CLI setup for Ubuntu, Fedora, and more.",
    descriptionNl:
      "VPN's met native Linux-clients of eenvoudige CLI-setup voor Ubuntu, Fedora en meer.",
    href: "/best/vpn-linux",
    tags: ["linux", "desktop", "technical"],
    icon: "laptop",
  },
  {
    type: "best-of",
    title: "Best VPN for Chromebook",
    titleNl: "Beste VPN voor Chromebook",
    description:
      "VPNs that work natively on Chrome OS via Android apps or browser extensions.",
    descriptionNl:
      "VPN's die native werken op Chrome OS via Android-apps of browserextensies.",
    href: "/best/vpn-chromebook",
    tags: ["chromebook", "chrome-os", "laptop"],
    icon: "laptop",
  },
  {
    type: "best-of",
    title: "Best VPN for Fire TV Stick",
    titleNl: "Beste VPN voor Fire TV Stick",
    description:
      "VPN apps for Amazon Fire TV Stick — easy to install and fast for streaming.",
    descriptionNl:
      "VPN-apps voor Amazon Fire TV Stick — eenvoudig te installeren en snel voor streaming.",
    href: "/best/vpn-firestick",
    tags: ["firestick", "fire-tv", "streaming", "amazon"],
    icon: "tv",
  },
  {
    type: "best-of",
    title: "Best VPN for China",
    titleNl: "Beste VPN voor China",
    description:
      "VPNs that still work in China — bypass the Great Firewall safely.",
    descriptionNl:
      "VPN's die nog werken in China — omzeil de Great Firewall op een veilige manier.",
    href: "/best/vpn-china",
    tags: ["china", "censorship", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Russia",
    titleNl: "Beste VPN voor Rusland",
    description:
      "VPNs that bypass Russian internet restrictions and protect your privacy.",
    descriptionNl:
      "VPN's die Russische internetbeperkingen omzeilen en je privacy beschermen.",
    href: "/best/vpn-russia",
    tags: ["russia", "censorship", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for UAE",
    titleNl: "Beste VPN voor de VAE",
    description:
      "VPNs that work in the UAE and Dubai — unblock VoIP calls and restricted content.",
    descriptionNl:
      "VPN's die werken in de VAE en Dubai — deblokkeer VoIP-gesprekken en beperkte inhoud.",
    href: "/best/vpn-uae",
    tags: ["uae", "censorship", "middle-east"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Iran",
    titleNl: "Beste VPN voor Iran",
    description:
      "VPNs with obfuscation technology that work in Iran to bypass heavy censorship.",
    descriptionNl:
      "VPN's met obfuscatietechnologie die werken in Iran om zware censuur te omzeilen.",
    href: "/best/vpn-iran",
    tags: ["iran", "censorship", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Turkey",
    titleNl: "Beste VPN voor Turkije",
    description:
      "VPNs that unblock social media and restricted websites in Turkey.",
    descriptionNl:
      "VPN's die sociale media en beperkte websites in Turkije deblokkeren.",
    href: "/best/vpn-turkey",
    tags: ["turkey", "censorship", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for India",
    titleNl: "Beste VPN voor India",
    description:
      "VPNs with fast servers for India — protect your privacy and access global content.",
    descriptionNl:
      "VPN's met snelle servers voor India — bescherm je privacy en krijg toegang tot wereldwijde inhoud.",
    href: "/best/vpn-india",
    tags: ["india", "asia", "privacy"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Japan",
    titleNl: "Beste VPN voor Japan",
    description:
      "Fast VPNs with Japanese servers for streaming, gaming, and privacy in Japan.",
    descriptionNl:
      "Snelle VPN's met Japanse servers voor streaming, gaming en privacy in Japan.",
    href: "/best/vpn-japan",
    tags: ["japan", "asia", "streaming", "gaming"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for USA",
    titleNl: "Beste VPN voor de VS",
    description:
      "VPNs with fast US servers — access American Netflix, Hulu, and more from anywhere.",
    descriptionNl:
      "VPN's met snelle Amerikaanse servers — krijg overal toegang tot Amerikaanse Netflix, Hulu en meer.",
    href: "/best/vpn-usa",
    tags: ["usa", "america", "streaming", "netflix"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Indonesia",
    titleNl: "Beste VPN voor Indonesië",
    description:
      "VPNs that work well in Indonesia — fast connections and access to blocked content.",
    descriptionNl:
      "VPN's die goed werken in Indonesië — snelle verbindingen en toegang tot geblokkeerde inhoud.",
    href: "/best/vpn-indonesia",
    tags: ["indonesia", "asia", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Bali",
    titleNl: "Beste VPN voor Bali",
    description:
      "VPNs for digital nomads and travelers in Bali — secure public Wi-Fi and unblock content.",
    descriptionNl:
      "VPN's voor digitale nomaden en reizigers op Bali — beveilig openbare wifi en deblokkeer inhoud.",
    href: "/best/vpn-bali",
    tags: ["bali", "indonesia", "travel", "digital-nomad"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Thailand",
    titleNl: "Beste VPN voor Thailand",
    description:
      "VPNs for Thailand — bypass local restrictions and stay secure on public Wi-Fi.",
    descriptionNl:
      "VPN's voor Thailand — omzeil lokale beperkingen en blijf veilig op openbare wifi.",
    href: "/best/vpn-thailand",
    tags: ["thailand", "asia", "travel"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Vietnam",
    titleNl: "Beste VPN voor Vietnam",
    description:
      "VPNs that bypass internet restrictions in Vietnam and protect your online privacy.",
    descriptionNl:
      "VPN's die internetbeperkingen in Vietnam omzeilen en je online privacy beschermen.",
    href: "/best/vpn-vietnam",
    tags: ["vietnam", "asia", "censorship"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Morocco",
    titleNl: "Beste VPN voor Marokko",
    description:
      "VPNs that unblock VoIP and streaming services in Morocco with fast local connections.",
    descriptionNl:
      "VPN's die VoIP en streamingdiensten in Marokko deblokkeren met snelle lokale verbindingen.",
    href: "/best/vpn-morocco",
    tags: ["morocco", "africa", "voip", "geo-restriction"],
    icon: "globe",
  },
];

// ---------------------------------------------------------------------------
// Static data: Guide pages
// ---------------------------------------------------------------------------

export const guidePages: ContentLink[] = [
  {
    type: "guide",
    title: "What Is a VPN?",
    titleNl: "Wat is een VPN?",
    description:
      "A beginner-friendly explanation of how VPNs work and why you might need one.",
    descriptionNl:
      "Een heldere uitleg over hoe VPN's werken en waarom je er een nodig hebt.",
    href: "/guides/what-is-vpn",
    tags: ["beginner", "general", "overview", "education"],
    icon: "help",
  },
  {
    type: "guide",
    title: "How Does a VPN Work?",
    titleNl: "Hoe werkt een VPN?",
    description:
      "A technical look at how VPN tunnels, encryption, and protocols work under the hood.",
    descriptionNl:
      "Een technische blik op hoe VPN-tunnels, encryptie en protocollen onder de motorkap werken.",
    href: "/guides/how-vpn-works",
    tags: ["technical", "education", "encryption", "tunneling"],
    icon: "cpu",
  },
  {
    type: "guide",
    title: "VPN Protocols Explained",
    titleNl: "VPN-protocollen uitgelegd",
    description:
      "WireGuard, OpenVPN, IKEv2 — understand the protocols that keep your traffic safe.",
    descriptionNl:
      "WireGuard, OpenVPN, IKEv2 — begrijp de protocollen die je verkeer beschermen.",
    href: "/guides/vpn-protocols-explained",
    tags: ["protocols", "security", "technical", "wireguard", "openvpn"],
    icon: "shield",
  },
  {
    type: "guide",
    title: "VPN Speed Guide",
    titleNl: "VPN-snelheidsgids",
    description:
      "How to maximise your VPN speed — tips on protocols, server selection, and settings.",
    descriptionNl:
      "Hoe je je VPN-snelheid maximaliseert — tips over protocollen, serverselectie en instellingen.",
    href: "/guides/vpn-speed-guide",
    tags: ["speed", "performance", "optimization", "technical"],
    icon: "zap",
  },
  {
    type: "guide",
    title: "VPN Privacy Guide",
    titleNl: "VPN-privacygids",
    description:
      "How to protect your online privacy with a VPN — logging policies, DNS leaks, and more.",
    descriptionNl:
      "Hoe je je online privacy beschermt met een VPN — logbeleid, DNS-lekken en meer.",
    href: "/guides/vpn-privacy-guide",
    tags: ["privacy", "no-logs", "dns-leak", "security"],
    icon: "lock",
  },
  {
    type: "guide",
    title: "VPN for Streaming",
    titleNl: "VPN voor streaming",
    description:
      "How to use a VPN to unblock streaming services like Netflix, Hulu, and BBC iPlayer.",
    descriptionNl:
      "Hoe je een VPN gebruikt om streamingdiensten zoals Netflix, Hulu en BBC iPlayer te deblokkeren.",
    href: "/guides/vpn-for-streaming",
    tags: ["streaming", "netflix", "unblock", "howto"],
    icon: "play",
  },
  {
    type: "guide",
    title: "VPN for Torrenting",
    titleNl: "VPN voor torrenting",
    description:
      "How to safely torrent with a VPN — P2P settings, kill switches, and best practices.",
    descriptionNl:
      "Hoe je veilig torrent met een VPN — P2P-instellingen, kill switches en best practices.",
    href: "/guides/vpn-for-torrenting",
    tags: ["torrenting", "p2p", "privacy", "downloads"],
    icon: "download",
  },
  {
    type: "guide",
    title: "VPN for Travel",
    titleNl: "VPN voor op reis",
    description:
      "Why you need a VPN when traveling — protect yourself on public Wi-Fi and access content from home.",
    descriptionNl:
      "Waarom je een VPN nodig hebt op reis — bescherm jezelf op openbare wifi en krijg toegang tot inhoud van thuis.",
    href: "/guides/vpn-for-travel",
    tags: ["travel", "public-wifi", "security", "geo-restriction"],
    icon: "plane",
  },
  {
    type: "guide",
    title: "VPN on Mobile",
    titleNl: "VPN op mobiel",
    description:
      "How to set up and use a VPN on your phone — iOS and Android setup guides.",
    descriptionNl:
      "Hoe je een VPN instelt en gebruikt op je telefoon — iOS- en Android-installatiehandleidingen.",
    href: "/guides/vpn-on-mobile",
    tags: ["mobile", "ios", "android", "setup", "howto"],
    icon: "smartphone",
  },
  {
    type: "guide",
    title: "Public Wi-Fi Safety",
    titleNl: "Veiligheid op openbare wifi",
    description:
      "How to stay safe on public Wi-Fi networks — risks, threats, and how a VPN helps.",
    descriptionNl:
      "Hoe je veilig blijft op openbare wifi-netwerken — risico's, bedreigingen en hoe een VPN helpt.",
    href: "/guides/public-wifi-safety",
    tags: ["public-wifi", "security", "safety", "beginner"],
    icon: "wifi",
  },
];

// ---------------------------------------------------------------------------
// Static data: Comparison pages
// ---------------------------------------------------------------------------

export const comparisonPages: ContentLink[] = [
  {
    type: "comparison",
    title: "NordVPN vs Surfshark",
    titleNl: "NordVPN vs Surfshark",
    description:
      "A head-to-head comparison of two top-tier VPNs on speed, price, and features.",
    descriptionNl:
      "Een directe vergelijking van twee top-VPN's op snelheid, prijs en functies.",
    href: "/compare/nordvpn-vs-surfshark",
    vpnSlugs: ["nordvpn", "surfshark"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "NordVPN vs ExpressVPN",
    titleNl: "NordVPN vs ExpressVPN",
    description:
      "Which premium VPN comes out on top? We compare NordVPN and ExpressVPN in detail.",
    descriptionNl:
      "Welke premium VPN komt als beste uit de bus? We vergelijken NordVPN en ExpressVPN in detail.",
    href: "/compare/nordvpn-vs-expressvpn",
    vpnSlugs: ["nordvpn", "expressvpn"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "NordVPN vs CyberGhost",
    titleNl: "NordVPN vs CyberGhost",
    description:
      "NordVPN's advanced features vs CyberGhost's user-friendly approach — a detailed comparison.",
    descriptionNl:
      "De geavanceerde functies van NordVPN tegenover de gebruiksvriendelijke aanpak van CyberGhost — een gedetailleerde vergelijking.",
    href: "/compare/nordvpn-vs-cyberghost",
    vpnSlugs: ["nordvpn", "cyberghost"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "NordVPN vs ProtonVPN",
    titleNl: "NordVPN vs ProtonVPN",
    description:
      "Two privacy heavyweights go head to head — NordVPN vs ProtonVPN compared on all fronts.",
    descriptionNl:
      "Twee privacy-zwaargewichten gaan de strijd aan — NordVPN vs ProtonVPN vergeleken op alle fronten.",
    href: "/compare/nordvpn-vs-protonvpn",
    vpnSlugs: ["nordvpn", "protonvpn"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "Surfshark vs ExpressVPN",
    titleNl: "Surfshark vs ExpressVPN",
    description:
      "Surfshark's budget pricing vs ExpressVPN's premium performance — which wins?",
    descriptionNl:
      "Surfsharks budgetprijs tegenover ExpressVPN's premiumprestaties — welke wint?",
    href: "/compare/surfshark-vs-expressvpn",
    vpnSlugs: ["surfshark", "expressvpn"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "Surfshark vs CyberGhost",
    titleNl: "Surfshark vs CyberGhost",
    description:
      "Two budget-friendly VPNs compared — which offers better value for money?",
    descriptionNl:
      "Twee budgetvriendelijke VPN's vergeleken — welke biedt de beste prijs-kwaliteitverhouding?",
    href: "/compare/surfshark-vs-cyberghost",
    vpnSlugs: ["surfshark", "cyberghost"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "Surfshark vs ProtonVPN",
    titleNl: "Surfshark vs ProtonVPN",
    description:
      "Surfshark's unlimited devices vs ProtonVPN's Swiss privacy — which is the better pick?",
    descriptionNl:
      "Surfsharks onbeperkte apparaten tegenover ProtonVPN's Zwitserse privacy — welke is de betere keuze?",
    href: "/compare/surfshark-vs-protonvpn",
    vpnSlugs: ["surfshark", "protonvpn"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "ExpressVPN vs CyberGhost",
    titleNl: "ExpressVPN vs CyberGhost",
    description:
      "Premium speed vs affordable simplicity — ExpressVPN and CyberGhost compared in detail.",
    descriptionNl:
      "Premium snelheid tegenover betaalbare eenvoud — ExpressVPN en CyberGhost in detail vergeleken.",
    href: "/compare/expressvpn-vs-cyberghost",
    vpnSlugs: ["expressvpn", "cyberghost"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "ProtonVPN vs Mullvad",
    titleNl: "ProtonVPN vs Mullvad",
    description:
      "The ultimate privacy showdown — two of the most trusted VPNs for anonymity compared.",
    descriptionNl:
      "De ultieme privacy-strijd — twee van de meest vertrouwde VPN's voor anonimiteit vergeleken.",
    href: "/compare/protonvpn-vs-mullvad",
    vpnSlugs: ["protonvpn", "mullvad"],
    icon: "zap",
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Build a ContentLink for a VPN review page.
 */
export function reviewLink(
  slug: string,
  name: string,
  rating: number
): ContentLink {
  return {
    type: "review",
    title: `${name} Review`,
    titleNl: `${name} Review`,
    description: `Our in-depth review of ${name} — rated ${rating}/10 for speed, security, and value.`,
    descriptionNl: `Onze uitgebreide review van ${name} — beoordeeld met een ${rating}/10 voor snelheid, beveiliging en prijs-kwaliteit.`,
    href: `/reviews/${slug}`,
    vpnSlugs: [slug],
    icon: "star",
  };
}

/**
 * Build a ContentLink for a blog post.
 */
export function blogLink(
  slug: string,
  title: string,
  titleNl: string,
  excerpt: string,
  excerptNl: string,
  tags: string[]
): ContentLink {
  return {
    type: "blog",
    title,
    titleNl,
    description: excerpt,
    descriptionNl: excerptNl,
    href: `/blog/${slug}`,
    tags,
    icon: "document",
  };
}

// ---------------------------------------------------------------------------
// Related content resolver
// ---------------------------------------------------------------------------

export interface GetRelatedContentOptions {
  currentHref: string;
  vpnSlugs?: string[];
  tags?: string[];
  currentType?: ContentType;
  limit?: number;
  extraLinks?: ContentLink[];
}

/**
 * Score and return the most relevant content links for the current page.
 *
 * Scoring:
 *  - VPN slug overlap: +3 per matching slug
 *  - Tag overlap:      +1 per matching tag
 *  - Type diversity:   +1 if the link type differs from currentType
 *
 * At most 2 links of the same ContentType are returned to keep variety.
 */
export function getRelatedContent(
  options: GetRelatedContentOptions
): ContentLink[] {
  const {
    currentHref,
    vpnSlugs = [],
    tags = [],
    currentType,
    limit = 6,
    extraLinks = [],
  } = options;

  // Gather all candidate links
  const allLinks: ContentLink[] = [
    ...bestOfPages,
    ...guidePages,
    ...comparisonPages,
    ...extraLinks,
  ];

  // Exclude the current page
  const candidates = allLinks.filter((link) => link.href !== currentHref);

  // Score each candidate
  const scored = candidates.map((link) => {
    let score = 0;

    // VPN slug match: +3 per overlap
    if (vpnSlugs.length > 0 && link.vpnSlugs) {
      for (const slug of link.vpnSlugs) {
        if (vpnSlugs.includes(slug)) {
          score += 3;
        }
      }
    }

    // Tag overlap: +1 per match
    if (tags.length > 0 && link.tags) {
      for (const tag of link.tags) {
        if (tags.includes(tag)) {
          score += 1;
        }
      }
    }

    // Type diversity bonus
    if (currentType && link.type !== currentType) {
      score += 1;
    }

    return { link, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Pick top items, limiting max 2 of the same type
  const typeCounts: Record<string, number> = {};
  const results: ContentLink[] = [];

  for (const { link } of scored) {
    if (results.length >= limit) break;

    const count = typeCounts[link.type] ?? 0;
    if (count >= 2) continue;

    typeCounts[link.type] = count + 1;
    results.push(link);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Pillar finder
// ---------------------------------------------------------------------------

/**
 * Find the best-matching best-of pillar page for a set of tags / VPN slugs.
 * Useful for breadcrumbs and internal linking back to the pillar.
 */
export function getPillarForContent(
  tags: string[],
  vpnSlugs: string[] = []
): ContentLink | undefined {
  let best: ContentLink | undefined;
  let bestScore = 0;

  for (const page of bestOfPages) {
    let score = 0;

    if (page.tags) {
      for (const tag of page.tags) {
        if (tags.includes(tag)) score += 1;
      }
    }

    if (page.vpnSlugs) {
      for (const slug of page.vpnSlugs) {
        if (vpnSlugs.includes(slug)) score += 3;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = page;
    }
  }

  return best;
}
