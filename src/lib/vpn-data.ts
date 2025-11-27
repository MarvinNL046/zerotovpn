// Static VPN data for initial development (before database is set up)
// This can be replaced with database queries once Neon is configured

export interface VpnProvider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  affiliateUrl: string;
  priceMonthly: number;
  priceYearly: number;
  priceTwoYear?: number;
  moneyBackDays: number;
  freeTier: boolean;
  servers: number;
  countries: number;
  maxDevices: number;
  speedScore: number;
  securityScore: number;
  streamingScore: number;
  protocols: string[];
  encryption: string;
  killSwitch: boolean;
  noLogs: boolean;
  netflixSupport: boolean;
  torrentSupport: boolean;
  overallRating: number;
  editorChoice: boolean;
  shortDescription: string;
  pros: string[];
  cons: string[];
  featured: boolean;
  sortOrder: number;
}

export const vpnProviders: VpnProvider[] = [
  {
    id: "nordvpn",
    name: "NordVPN",
    slug: "nordvpn",
    logo: "/logos/nordvpn.svg",
    website: "https://nordvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/nordvpn",
    priceMonthly: 12.99,
    priceYearly: 4.99,
    priceTwoYear: 2.99,
    moneyBackDays: 30,
    freeTier: false,
    servers: 7400,
    countries: 118,
    maxDevices: 10,
    speedScore: 94,
    securityScore: 98,
    streamingScore: 95,
    protocols: ["NordLynx", "OpenVPN", "IKEv2"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.8,
    editorChoice: true,
    shortDescription: "Industry-leading VPN with exceptional speed and security features.",
    pros: [
      "Excellent speeds with NordLynx protocol",
      "Huge server network (6,400+ servers)",
      "Advanced security features",
      "Works with Netflix and streaming",
      "Strict no-logs policy (audited)",
    ],
    cons: [
      "Slightly more expensive than competitors",
      "Occasional connectivity issues",
      "No free tier available",
    ],
    featured: true,
    sortOrder: 1,
  },
  {
    id: "surfshark",
    name: "Surfshark",
    slug: "surfshark",
    logo: "/logos/surfshark.svg",
    website: "https://surfshark.com",
    affiliateUrl: "https://go.zerotovpn.com/surfshark",
    priceMonthly: 15.45,
    priceYearly: 3.19,
    priceTwoYear: 1.99,
    moneyBackDays: 30,
    freeTier: false,
    servers: 4500,
    countries: 100,
    maxDevices: 999, // Unlimited
    speedScore: 90,
    securityScore: 95,
    streamingScore: 92,
    protocols: ["WireGuard", "OpenVPN", "IKEv2"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.6,
    editorChoice: false,
    shortDescription: "Best value VPN with unlimited device connections.",
    pros: [
      "Unlimited simultaneous connections",
      "Very affordable long-term plans",
      "Good streaming support",
      "CleanWeb ad blocker included",
      "Camouflage mode for extra privacy",
    ],
    cons: [
      "Smaller server network",
      "Speeds can vary",
      "Based in the Netherlands (14 Eyes)",
    ],
    featured: true,
    sortOrder: 2,
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    slug: "expressvpn",
    logo: "/logos/expressvpn.svg",
    website: "https://expressvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/expressvpn",
    priceMonthly: 12.95,
    priceYearly: 8.32,
    moneyBackDays: 30,
    freeTier: false,
    servers: 3000,
    countries: 105,
    maxDevices: 8,
    speedScore: 96,
    securityScore: 97,
    streamingScore: 98,
    protocols: ["Lightway", "OpenVPN", "IKEv2"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.7,
    editorChoice: false,
    shortDescription: "Premium VPN with fastest speeds and best streaming support.",
    pros: [
      "Fastest VPN speeds overall",
      "Best for streaming (works everywhere)",
      "Easy-to-use apps",
      "Excellent customer support",
      "TrustedServer technology",
    ],
    cons: [
      "Most expensive option",
      "Only 8 simultaneous connections",
      "No dedicated IP option",
    ],
    featured: true,
    sortOrder: 3,
  },
  {
    id: "cyberghost",
    name: "CyberGhost",
    slug: "cyberghost",
    logo: "/logos/cyberghost.svg",
    website: "https://cyberghostvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/cyberghost",
    priceMonthly: 12.99,
    priceYearly: 4.29,
    priceTwoYear: 2.03,
    moneyBackDays: 45,
    freeTier: false,
    servers: 11690,
    countries: 100,
    maxDevices: 7,
    speedScore: 85,
    securityScore: 90,
    streamingScore: 88,
    protocols: ["WireGuard", "OpenVPN", "IKEv2"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.4,
    editorChoice: false,
    shortDescription: "Largest server network with specialized streaming servers.",
    pros: [
      "Huge server network (11,000+)",
      "45-day money-back guarantee",
      "Dedicated streaming servers",
      "Very affordable",
      "User-friendly interface",
    ],
    cons: [
      "Slower speeds than competitors",
      "Owned by Kape Technologies",
      "Some servers are crowded",
    ],
    featured: true,
    sortOrder: 4,
  },
  {
    id: "protonvpn",
    name: "ProtonVPN",
    slug: "protonvpn",
    logo: "/logos/protonvpn.svg",
    website: "https://protonvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/protonvpn",
    priceMonthly: 9.99,
    priceYearly: 4.99,
    priceTwoYear: 2.49,
    moneyBackDays: 30,
    freeTier: true,
    servers: 15000,
    countries: 120,
    maxDevices: 10,
    speedScore: 88,
    securityScore: 99,
    streamingScore: 80,
    protocols: ["WireGuard", "OpenVPN", "IKEv2"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.5,
    editorChoice: false,
    shortDescription: "Swiss-based VPN with strongest privacy focus and free tier.",
    pros: [
      "Free tier available (no data limits)",
      "Based in privacy-friendly Switzerland",
      "Open source and audited",
      "Secure Core servers",
      "Integrates with ProtonMail",
    ],
    cons: [
      "Free tier has limited servers",
      "Streaming support is inconsistent",
      "Fewer server locations",
    ],
    featured: true,
    sortOrder: 5,
  },
  {
    id: "pia",
    name: "Private Internet Access",
    slug: "private-internet-access",
    logo: "/logos/pia.svg",
    website: "https://privateinternetaccess.com",
    affiliateUrl: "https://go.zerotovpn.com/pia",
    priceMonthly: 11.95,
    priceYearly: 3.33,
    priceTwoYear: 2.19,
    moneyBackDays: 30,
    freeTier: false,
    servers: 35000,
    countries: 91,
    maxDevices: 999,
    speedScore: 82,
    securityScore: 92,
    streamingScore: 75,
    protocols: ["WireGuard", "OpenVPN"],
    encryption: "AES-256",
    killSwitch: true,
    noLogs: true,
    netflixSupport: true,
    torrentSupport: true,
    overallRating: 4.3,
    editorChoice: false,
    shortDescription: "Veteran VPN with massive server network and proven no-logs policy.",
    pros: [
      "Massive server network (35,000+)",
      "Unlimited simultaneous connections",
      "Proven no-logs policy (court-tested)",
      "Very affordable",
      "Open source apps",
    ],
    cons: [
      "Based in the US (5 Eyes)",
      "Streaming support is hit or miss",
      "Dated interface on some apps",
    ],
    featured: false,
    sortOrder: 6,
  },
];

export function getVpnBySlug(slug: string): VpnProvider | undefined {
  return vpnProviders.find((vpn) => vpn.slug === slug);
}

export function getFeaturedVpns(): VpnProvider[] {
  return vpnProviders.filter((vpn) => vpn.featured).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllVpns(): VpnProvider[] {
  return vpnProviders.sort((a, b) => a.sortOrder - b.sortOrder);
}
