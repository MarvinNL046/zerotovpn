export const VPN_LINKS = {
  nordvpn: {
    website: "https://nordvpn.com",
  },
  surfshark: {
    website: "https://surfshark.com",
  },
  expressvpn: {
    website: "https://expressvpn.com",
  },
  protonvpn: {
    website: "https://protonvpn.com",
  },
  cyberghost: {
    website: "https://cyberghostvpn.com",
  },
  "private-internet-access": {
    website: "https://privateinternetaccess.com",
  },
  pia: {
    website: "https://privateinternetaccess.com",
  },
  mullvad: {
    website: "https://mullvad.net",
  },
  windscribe: {
    website: "https://windscribe.com",
  },
  tunnelbear: {
    website: "https://tunnelbear.com",
  },
  "hide-me": {
    website: "https://hide.me",
  },
  hideme: {
    website: "https://hide.me",
  },
  astrill: {
    website: "https://astrill.com",
  },
  vyprvpn: {
    website: "https://vyprvpn.com",
  },
  nordpass: {
    website: "https://nordpass.com",
  },
} as const;

export type VpnLinkSlug = keyof typeof VPN_LINKS;

const approvedAffiliateIds = new Set(
  (process.env.VPN_APPROVED_AFFILIATE_IDS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),
);

const configuredAffiliateUrls: Partial<
  Record<VpnLinkSlug, string | undefined>
> = {
  nordvpn: process.env.AFFILIATE_VPN_NORDVPN_URL,
  surfshark: process.env.AFFILIATE_VPN_SURFSHARK_URL,
  expressvpn: process.env.AFFILIATE_VPN_EXPRESSVPN_URL,
  protonvpn: process.env.AFFILIATE_VPN_PROTONVPN_URL,
  cyberghost: process.env.AFFILIATE_VPN_CYBERGHOST_URL,
  "private-internet-access":
    process.env.AFFILIATE_VPN_PRIVATE_INTERNET_ACCESS_URL,
  pia: process.env.AFFILIATE_VPN_PIA_URL,
  mullvad: process.env.AFFILIATE_VPN_MULLVAD_URL,
  windscribe: process.env.AFFILIATE_VPN_WINDSCRIBE_URL,
  tunnelbear: process.env.AFFILIATE_VPN_TUNNELBEAR_URL,
  "hide-me": process.env.AFFILIATE_VPN_HIDE_ME_URL,
  hideme: process.env.AFFILIATE_VPN_HIDEME_URL,
  astrill: process.env.AFFILIATE_VPN_ASTRILL_URL,
  vyprvpn: process.env.AFFILIATE_VPN_VYPRVPN_URL,
  nordpass: process.env.AFFILIATE_NORDPASS_URL,
};

function getConfiguredAffiliateUrl(slug: VpnLinkSlug): string {
  if (!approvedAffiliateIds.has(slug)) return "";
  const configured = configuredAffiliateUrls[slug]?.trim() ?? "";
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
  return getConfiguredAffiliateUrl(slug);
}

export function getVpnPricingUrl(slug: VpnLinkSlug): string {
  return `${getVpnWebsiteUrl(slug).replace(/\/$/, "")}/pricing/`;
}
