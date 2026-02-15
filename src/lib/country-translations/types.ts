// Translatable content for dynamic country pages
export interface TranslatedCountryContent {
  metaTitle: string;
  metaDescription: string;
  statusLabel: string;
  heroSubtitle: string;
  legalSummary: string;
  whyVpn: string[];
  blockedServices: string[];
  keyFeatures: string[];
  tips: string[];
  faq: { q: string; a: string }[];
}

// UI labels for the dynamic country page template
export interface CountryPageLabels {
  badge: string; // "Updated February 2026"
  bestVpnFor: string; // "Best VPN for {country}"
  legalStatusTitle: string; // "VPN Legal Status in {country}"
  internetFreedomScore: string; // "Internet Freedom Score: {score}/100 (Freedom House)"
  whyTitle: string; // "Why You Need a VPN in {country}"
  blockedTitle: string; // "Blocked Services in {country}"
  bestVpnsTitle: string; // "Best VPNs for {country} in 2026"
  bestVpnsSubtitle: string; // "Tested and verified to work reliably in {country}"
  topPick: string; // "#1 Pick for {country}"
  servers: string;
  countries: string;
  devices: string;
  unlimited: string;
  save: string; // "Save {n}%"
  visitVpn: string; // "Visit {vpnName}"
  readFullReview: string;
  killSwitch: string;
  noLogs: string;
  netflix: string;
  p2p: string;
  featuresTitle: string; // "Key VPN Features for {country}"
  tipsTitle: string; // "Tips for Using a VPN in {country}"
  faqTitle: string;
  relatedTitle: string;
  allCountryGuides: string;
  allCountryGuidesDesc: string;
  bestVpn2026: string;
  bestVpn2026Desc: string;
  vpnComparison: string;
  vpnComparisonDesc: string;
  whatIsVpn: string;
  whatIsVpnDesc: string;
  readMore: string;
}
