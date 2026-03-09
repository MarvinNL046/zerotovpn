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
    title: "VPN Protocols Explained",
    titleNl: "VPN-protocollen uitgelegd",
    description:
      "WireGuard, OpenVPN, IKEv2 — understand the protocols that keep your traffic safe.",
    descriptionNl:
      "WireGuard, OpenVPN, IKEv2 — begrijp de protocollen die je verkeer beschermen.",
    href: "/guides/vpn-protocols",
    tags: ["protocols", "security", "technical", "wireguard", "openvpn"],
    icon: "shield",
  },
  {
    type: "guide",
    title: "How to Set Up a VPN",
    titleNl: "Hoe stel je een VPN in?",
    description:
      "Step-by-step instructions to install and configure a VPN on any device.",
    descriptionNl:
      "Stap-voor-stap instructies om een VPN te installeren en in te stellen op elk apparaat.",
    href: "/guides/setup-vpn",
    tags: ["setup", "installation", "beginner", "howto"],
    icon: "settings",
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
