export const VPN_LINKS = {
  nordvpn: {
    website: "https://nordvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/nordvpn",
  },
  surfshark: {
    website: "https://surfshark.com",
    affiliateUrl: "https://go.zerotovpn.com/surfshark",
  },
  expressvpn: {
    website: "https://expressvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/expressvpn",
  },
  protonvpn: {
    website: "https://protonvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/protonvpn",
  },
  cyberghost: {
    website: "https://cyberghostvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/cyberghost",
  },
  "private-internet-access": {
    website: "https://privateinternetaccess.com",
    affiliateUrl: "https://go.zerotovpn.com/private-internet-access",
  },
  pia: {
    website: "https://privateinternetaccess.com",
    affiliateUrl: "https://go.zerotovpn.com/pia",
  },
  mullvad: {
    website: "https://mullvad.net",
    affiliateUrl: "https://go.zerotovpn.com/mullvad",
  },
  windscribe: {
    website: "https://windscribe.com",
    affiliateUrl: "https://go.zerotovpn.com/windscribe",
  },
  tunnelbear: {
    website: "https://tunnelbear.com",
    affiliateUrl: "https://go.zerotovpn.com/tunnelbear",
  },
  "hide-me": {
    website: "https://hide.me",
    affiliateUrl: "https://go.zerotovpn.com/hide-me",
  },
  hideme: {
    website: "https://hide.me",
    affiliateUrl: "https://go.zerotovpn.com/hideme",
  },
  astrill: {
    website: "https://astrill.com",
    affiliateUrl: "https://go.zerotovpn.com/astrill",
  },
  vyprvpn: {
    website: "https://vyprvpn.com",
    affiliateUrl: "https://go.zerotovpn.com/vyprvpn",
  },
  nordpass: {
    website: "https://nordpass.com",
    affiliateUrl: "https://go.zerotovpn.com/nordpass",
  },
} as const;

export type VpnLinkSlug = keyof typeof VPN_LINKS;

const approvedAffiliateIds = new Set(
  (process.env.VPN_APPROVED_AFFILIATE_IDS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),
);

function getConfiguredNordVpnAffiliateUrl(): string {
  if (!approvedAffiliateIds.has("nordvpn")) return "";
  const configured = process.env.AFFILIATE_VPN_NORDVPN_URL?.trim() ?? "";
  try {
    const url = new URL(configured);
    if (url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function getVpnWebsiteUrl(slug: VpnLinkSlug): string {
  return VPN_LINKS[slug].website;
}

export function getVpnAffiliateUrl(slug: VpnLinkSlug): string {
  if (slug === "nordvpn") return getConfiguredNordVpnAffiliateUrl();
  return VPN_LINKS[slug].affiliateUrl;
}

export function getVpnPricingUrl(slug: VpnLinkSlug): string {
  return `${getVpnWebsiteUrl(slug).replace(/\/$/, "")}/pricing/`;
}
