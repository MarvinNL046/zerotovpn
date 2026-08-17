export type ComparisonLocale = "en" | "nl";
export type ComparisonOutcome = "nordvpn" | "surfshark" | "tie" | "retest";
export type EvidenceState = "desk" | "provider" | "retest";

export interface ComparisonCopy {
  locale: ComparisonLocale;
  metadata: { title: string; description: string; imageAlt: string };
  breadcrumbs: { compare: string; current: string };
  eyebrow: string;
  title: string;
  dek: string;
  reviewedLabel: string;
  testStatus: string;
  methodologyLabel: string;
  disclosureLinkLabel: string;
  verdict: {
    label: string;
    title: string;
    body: string;
    caveat: string;
  };
  providers: Record<
    "nordvpn" | "surfshark",
    {
      bestFor: string;
      summary: string;
      facts: string[];
      limit: string;
      cta: string;
      review: string;
    }
  >;
  quick: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{
      title: string;
      body: string;
      points: string[];
      tone: "nord" | "surf" | "neutral";
    }>;
  };
  nav: Array<{ href: string; label: string }>;
  matrix: {
    eyebrow: string;
    title: string;
    intro: string;
    columns: {
      category: string;
      outcome: string;
      reason: string;
      evidence: string;
    };
    rows: Array<{
      category: string;
      outcome: ComparisonOutcome;
      outcomeLabel: string;
      reason: string;
      evidence: EvidenceState;
      evidenceLabel: string;
      href: string;
    }>;
  };
  tests: {
    eyebrow: string;
    title: string;
    intro: string;
    pending: string;
    labels: { baseline: string; nord: string; surf: string; result: string };
    steps: Array<{ title: string; body: string }>;
    note: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    sharedOwnershipTitle: string;
    sharedOwnershipBody: string;
    cards: Record<
      "nordvpn" | "surfshark",
      {
        title: string;
        date: string;
        body: string;
        scope: string;
        limitation: string;
        sourceLabel: string;
      }
    >;
  };
  apps: {
    eyebrow: string;
    title: string;
    intro: string;
    tasks: Array<{
      task: string;
      nordvpn: string;
      surfshark: string;
      result: string;
    }>;
    deviceTitle: string;
    deviceBody: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    verify: string;
    rows: Array<{ label: string; nordvpn: string; surfshark: string }>;
    nordCta: string;
    surfCta: string;
    partnerLabel: string;
    warningTitle: string;
    warningBody: string;
  };
  useCases: {
    eyebrow: string;
    title: string;
    cards: Array<{
      title: string;
      outcome: string;
      body: string;
      href: string;
    }>;
  };
  chapters: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Record<
      "nordvpn" | "surfshark",
      {
        title: string;
        leads: string[];
        fallsShort: string[];
        review: string;
        cta: string;
      }
    >;
  };
  alternatives: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{ name: string; reason: string; href: string }>;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: Array<{ value: string; label: string }>;
    states: Array<{ label: string; body: string }>;
    link: string;
    changeTitle: string;
    changeBody: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  faqTitle: string;
  sourcesTitle: string;
  sourcesIntro: string;
  relatedTitle: string;
  related: Array<{ title: string; body: string; href: string }>;
  newsletterTitle: string;
  newsletterBody: string;
}

const en: ComparisonCopy = {
  locale: "en",
  metadata: {
    title: "NordVPN vs Surfshark (2026): Which Fits You Better?",
    description:
      "Compare NordVPN and Surfshark by device limits, privacy checks, apps and plan terms. See when Surfshark has a clear advantage and when there is no clear winner.",
    imageAlt: "ZeroToVPN comparison graphic for NordVPN and Surfshark",
  },
  breadcrumbs: { compare: "Compare VPNs", current: "NordVPN vs Surfshark" },
  eyebrow: "Checked side by side",
  title: "NordVPN vs Surfshark: which VPN fits you better?",
  dek: "Need a VPN on more than 10 devices at once? Surfshark has the clear advantage. NordVPN allows 10 devices, while Surfshark says there is no device limit. If 10 devices are enough, our current evidence does not show a clear overall winner.",
  reviewedLabel: "Reviewed by Marvin Smit · 16 August 2026",
  testStatus: "Same speed test for both: still needed",
  methodologyLabel: "See how we compare VPNs",
  disclosureLinkLabel: "How we fund this site",
  verdict: {
    label: "The short answer",
    title: "Surfshark for more than 10 devices; otherwise no clear winner",
    body: "Choose Surfshark if one account must cover more than 10 devices at the same time. If 10 devices are enough, compare the total price, renewal price and app support you need. We have not run the same new speed and streaming test for both, so we do not name a winner there.",
    caveat:
      "Both brands are part of the same parent group, but say they operate separately. Their apps, servers and privacy checks are not automatically the same.",
  },
  providers: {
    nordvpn: {
      bestFor: "Device limit: 10 at once",
      summary:
        "NordVPN allows 10 devices at the same time and supports NordLynx, OpenVPN and NordWhisper. Deloitte checked its no-logs claim again in 2025.",
      facts: [
        "10 devices at once",
        "Three named connection types",
        "Deloitte privacy check from December 2025",
      ],
      limit: "No clear overall advantage when 10 devices are enough.",
      cta: "Check current NordVPN plans",
      review: "Read the NordVPN review",
    },
    surfshark: {
      bestFor: "Best fit: more than 10 devices",
      summary:
        "Surfshark says one account can connect an unlimited number of devices. It supports WireGuard, OpenVPN and IKEv2. Deloitte checked its no-logs claim in 2025.",
      facts: [
        "No stated device limit",
        "Three common connection types",
        "Deloitte privacy check from June 2025",
      ],
      limit: "More devices does not prove better speed or streaming.",
      cta: "Check current Surfshark plans",
      review: "Read the Surfshark review",
    },
  },
  quick: {
    eyebrow: "Choose in 30 seconds",
    title: "Start with your number of devices",
    intro:
      "The device limit is the only clear winner in our current comparison. For other needs, compare the details below.",
    cards: [
      {
        title: "Consider NordVPN if…",
        body: "You need no more than 10 connections and its current price or app support suits you better.",
        points: [
          "You need NordLynx or NordWhisper",
          "You value its December 2025 privacy check",
          "You checked the total and renewal price",
        ],
        tone: "nord",
      },
      {
        title: "Choose Surfshark if…",
        body: "You need one account on more than 10 devices at once.",
        points: [
          "No stated device limit is the key benefit",
          "You need WireGuard, OpenVPN or IKEv2",
          "You checked the total and renewal price",
        ],
        tone: "surf",
      },
      {
        title: "Look elsewhere if…",
        body: "You want open-source apps, very little account data or a free starting point.",
        points: [
          "Use the privacy guide to compare account data and ownership",
          "Check current provider plan and app documentation",
          "Test any VPN on the network you will use",
        ],
        tone: "neutral",
      },
    ],
  },
  nav: [
    { href: "#verdict", label: "Verdict" },
    { href: "#matrix", label: "Compare" },
    { href: "#pricing", label: "Pricing" },
    { href: "#apps", label: "Apps" },
    { href: "#privacy", label: "Privacy" },
    { href: "#tests", label: "Speed" },
    { href: "#alternatives", label: "Alternatives" },
    { href: "#faq", label: "FAQ" },
  ],
  matrix: {
    eyebrow: "Quick comparison",
    title: "What is clear — and what is not",
    intro:
      "We only name a winner when a useful difference is supported by a current source or the same test for both VPNs.",
    columns: {
      category: "Question",
      outcome: "Answer",
      reason: "Why",
      evidence: "Source type",
    },
    rows: [
      {
        category: "More than 10 devices",
        outcome: "surfshark",
        outcomeLabel: "Surfshark",
        reason:
          "Surfshark says there is no device limit; NordVPN allows 10 at once.",
        evidence: "provider",
        evidenceLabel: "Provider information",
        href: "#apps",
      },
      {
        category: "Privacy checks",
        outcome: "tie",
        outcomeLabel: "No clear winner",
        reason:
          "Deloitte checked both no-logs claims in 2025, but on different dates and with different limits.",
        evidence: "desk",
        evidenceLabel: "Dated report",
        href: "#privacy",
      },
      {
        category: "Speed and delay",
        outcome: "retest",
        outcomeLabel: "Same test needed",
        reason: "We have not tested both on the same device, route and day.",
        evidence: "retest",
        evidenceLabel: "New test needed",
        href: "#tests",
      },
      {
        category: "Streaming",
        outcome: "retest",
        outcomeLabel: "Same test needed",
        reason: "Results can change by service, account, country and server.",
        evidence: "retest",
        evidenceLabel: "New test needed",
        href: "#tests",
      },
      {
        category: "Connection types",
        outcome: "tie",
        outcomeLabel: "Depends on your device",
        reason:
          "Both offer common options and their own extras. Support differs by device.",
        evidence: "provider",
        evidenceLabel: "Provider information",
        href: "#apps",
      },
      {
        category: "Money-back period",
        outcome: "tie",
        outcomeLabel: "30 days, with conditions",
        reason:
          "Both state 30 days for eligible first purchases. Some stores and products are excluded.",
        evidence: "desk",
        evidenceLabel: "Terms checked",
        href: "#pricing",
      },
      {
        category: "Lowest renewal price",
        outcome: "retest",
        outcomeLabel: "Check the live price",
        reason:
          "The advertised monthly price does not show both today's total and the later renewal.",
        evidence: "retest",
        evidenceLabel: "Live checkout needed",
        href: "#pricing",
      },
    ],
  },
  tests: {
    eyebrow: "Speed test",
    title: "Which is faster? We do not know yet",
    intro:
      "A fair answer needs both VPNs tested on the same device, internet connection, server route and day. Older tests done in different conditions cannot decide this.",
    pending: "Same test still needed",
    labels: {
      baseline: "Speed without a VPN",
      nord: "Same test with NordVPN",
      surf: "Same test with Surfshark",
      result: "Show the normal result and failed runs",
    },
    steps: [
      {
        title: "Start without a VPN",
        body: "Measure download, upload and delay on one device.",
      },
      {
        title: "Keep conditions the same",
        body: "Test both VPNs on similar nearby and far-away servers.",
      },
      {
        title: "Show every result",
        body: "Include normal results and failed runs, not only the fastest score.",
      },
    ],
    note: "Until this test is complete, we do not name a speed winner.",
  },
  privacy: {
    eyebrow: "Privacy checks",
    title: "Do they keep what you do online?",
    intro:
      "Both VPNs say they do not keep logs of your VPN activity. Deloitte checked this claim for both in 2025. Each check covered a set date and selected systems, so it is not a promise for all time.",
    sharedOwnershipTitle: "Are NordVPN and Surfshark the same company?",
    sharedOwnershipBody:
      "Surfshark and Nord Security joined the same parent group in 2022. They say the brands still work separately. This does not mean they use the same servers, rules or test results.",
    cards: {
      nordvpn: {
        title: "NordVPN privacy check",
        date: "Checked: 10 Nov–12 Dec 2025",
        body: "NordVPN says Deloitte Lithuania completed its sixth check of the no-logs claim under the ISAE 3000 standard.",
        scope:
          "Deloitte looked at selected server types, settings and support work during this period.",
        limitation:
          "This was a check at one point in time. You need a Nord Account to read the full report.",
        sourceLabel: "Read NordVPN's privacy-check announcement",
      },
      surfshark: {
        title: "Surfshark privacy check",
        date: "Checked: 10 June 2025",
        body: "Surfshark published a Deloitte report under the ISAE 3000 standard about its no-logs claim.",
        scope:
          "Deloitte looked at the systems and support work named in the report on that date.",
        limitation:
          "This was also a check at one point in time. It does not cover later changes or anything outside the report.",
        sourceLabel: "Read Surfshark's privacy-check report",
      },
    },
  },
  apps: {
    eyebrow: "Apps and devices",
    title: "Surfshark supports more devices at once",
    intro:
      "The providers list the options below. We have not yet tested the same everyday tasks on both apps, so we do not name an ease-of-use winner.",
    tasks: [
      {
        task: "Devices at once",
        nordvpn: "10, with extra rules on the same server",
        surfshark: "No stated limit under one account",
        result: "Surfshark wins if you need more than 10",
      },
      {
        task: "Connection types",
        nordvpn: "NordLynx, OpenVPN and NordWhisper",
        surfshark: "WireGuard, OpenVPN and IKEv2; Dausos is limited",
        result: "The useful option depends on your device and network",
      },
      {
        task: "Connect and change server",
        nordvpn: "Steps explained by NordVPN",
        surfshark: "Steps explained by Surfshark",
        result: "Same hands-on test still needed",
      },
      {
        task: "Internet cut-off feature",
        nordvpn: "Support differs by device",
        surfshark: "Support differs by device",
        result: "Same leak and connection-drop test still needed",
      },
    ],
    deviceTitle: "More devices does not automatically mean better performance",
    deviceBody:
      "Surfshark's lack of a device limit is useful for a large household. It does not prove that every device will be fast. NordVPN's limit of 10 may already be enough for you. One NordVPN router connection can cover several devices on that network.",
  },
  pricing: {
    eyebrow: "Price check",
    title: "What do you pay now — and at renewal?",
    intro:
      "Prices change by country, currency and plan. Open both checkouts and compare the total due today with the later renewal.",
    verify: "Verify at checkout",
    rows: [
      {
        label: "Price due today",
        nordvpn: "Verify current total",
        surfshark: "Verify current total",
      },
      {
        label: "First plan period",
        nordvpn: "Check the term and extra months",
        surfshark: "Check the term and extra months",
      },
      {
        label: "Renewal",
        nordvpn: "Verify next term and total",
        surfshark: "Verify next term and total",
      },
      {
        label: "Refund",
        nordvpn: "30 days for eligible initial purchases",
        surfshark: "30 days for eligible initial purchases",
      },
      {
        label: "Connections",
        nordvpn: "10 simultaneous devices",
        surfshark: "Unlimited VPN connections",
      },
      {
        label: "Tax and app-store purchases",
        nordvpn: "Can change the total or refund steps",
        surfshark: "Can change the total or refund steps",
      },
    ],
    nordCta: "Open current NordVPN checkout",
    surfCta: "Open current Surfshark checkout",
    partnerLabel: "Commission link",
    warningTitle: "Do not compare only the advertised monthly price",
    warningBody:
      "A low monthly number may be an average over a long first period. Compare what you pay today and what the next renewal costs.",
  },
  useCases: {
    eyebrow: "Which fits your situation?",
    title: "Start with what you need",
    cards: [
      {
        title: "More than 10 devices",
        outcome: "Surfshark",
        body: "Surfshark says one account has no device limit; NordVPN allows 10 at once.",
        href: "#apps",
      },
      {
        title: "10 devices or fewer",
        outcome: "No clear winner",
        body: "Compare the live total, renewal and the app support you need.",
        href: "#pricing",
      },
      {
        title: "Gaming",
        outcome: "No winner yet",
        body: "We still need the same test for delay and stability on both VPNs.",
        href: "#tests",
      },
      {
        title: "Streaming",
        outcome: "Test it yourself",
        body: "Results change. Test your service, account and country during an eligible money-back period.",
        href: "#tests",
      },
      {
        title: "Very little account data",
        outcome: "Use the privacy guide",
        body: "Compare account data, ownership and privacy evidence before choosing a provider.",
        href: "/guides/vpn-privacy-guide",
      },
    ],
  },
  chapters: {
    eyebrow: "The same check for both",
    title: "Strengths and limits at a glance",
    intro:
      "We ask both VPNs the same questions. Commission does not change the result.",
    cards: {
      nordvpn: {
        title: "NordVPN",
        leads: [
          "10 devices may cover a small household",
          "Six no-logs checks are listed",
          "NordWhisper is made for restricted networks",
        ],
        fallsShort: [
          "Limit of 10 direct connections",
          "The full 2025 privacy report needs an account",
          "No new side-by-side speed result",
        ],
        review: "Read the full NordVPN review",
        cta: "Check NordVPN plans",
      },
      surfshark: {
        title: "Surfshark",
        leads: [
          "No stated device limit under one account",
          "The 2025 Deloitte report is public",
          "Several common connection types are listed",
        ],
        fallsShort: [
          "More devices does not prove better speed",
          "Some options are not on every device",
          "No new side-by-side speed result",
        ],
        review: "Read the full Surfshark review",
        cta: "Check Surfshark plans",
      },
    },
  },
  alternatives: {
    eyebrow: "Other options",
    title: "Look elsewhere for these needs",
    intro:
      "These VPNs may fit better when you need something NordVPN and Surfshark do not offer as clearly.",
    cards: [
      {
        name: "Proton VPN",
        reason: "You want a good free plan and open-source apps.",
        href: "/reviews/protonvpn",
      },
      {
        name: "VPN privacy guide",
        reason:
          "You want to compare account data, ownership and privacy evidence before choosing.",
        href: "/guides/vpn-privacy-guide",
      },
      {
        name: "Compare more VPNs",
        reason:
          "Travel, streaming or another special need decides your choice.",
        href: "/compare",
      },
    ],
  },
  method: {
    eyebrow: "How we compare",
    title: "We show where each statement comes from",
    intro:
      "Provider pages show what each company says. Dated reports show what an outside expert checked. Our tests show what happened in our setup. We keep these three types apart.",
    facts: [
      { value: "2", label: "VPNs checked the same way" },
      { value: "7", label: "questions with a source label" },
    ],
    states: [
      {
        label: "Dated report",
        body: "An outside expert checked a named claim at a set time.",
      },
      {
        label: "Provider information",
        body: "This tells you what the company offers, not how it worked in our test.",
      },
      {
        label: "New test needed",
        body: "We need to test both VPNs in the same conditions before naming a winner.",
      },
    ],
    link: "Read the full ZeroToVPN methodology",
    changeTitle: "What changed on 16 August 2026",
    changeBody:
      "We removed old prices and unsupported speed or streaming winners. We added clear source labels and the device-limit result.",
  },
  faqs: [
    {
      question: "Is NordVPN better than Surfshark?",
      answer:
        "Not based on our current evidence. Surfshark is the clear choice only when you need more than 10 devices at once. Otherwise, compare the live total, renewal and app support you need.",
    },
    {
      question: "Does one company own both VPNs?",
      answer:
        "They are part of the same parent group since 2022. The brands say they still operate separately.",
    },
    {
      question: "Which is cheaper?",
      answer:
        "Prices change by country, currency, plan and offer. Compare today's total and the later renewal in both live checkouts.",
    },
    {
      question: "Which is faster?",
      answer:
        "We do not know yet. A fair answer needs both VPNs tested on the same device, connection, route and day.",
    },
    {
      question: "Which supports more devices?",
      answer:
        "Surfshark says one account has no device limit. NordVPN allows 10 devices at once, with extra rules when they use the same server.",
    },
    {
      question: "Which is better for privacy?",
      answer:
        "Deloitte checked both no-logs claims in 2025. The dates and limits differ, and neither report is a promise for all time.",
    },
    {
      question: "Which is better for streaming?",
      answer:
        "There is no lasting winner. Results change by service, account, country and server. Test your service during an eligible money-back period.",
    },
  ],
  faqTitle: "NordVPN vs Surfshark FAQ",
  sourcesTitle: "Sources and check dates",
  sourcesIntro:
    "Provider pages show current product details. Dated reports show what an outside expert checked. Neither replaces our own side-by-side test.",
  relatedTitle: "Continue your comparison",
  related: [
    {
      title: "NordVPN review",
      body: "See its sources, limits and plan checks.",
      href: "/reviews/nordvpn",
    },
    {
      title: "Surfshark review",
      body: "See its sources, limits and app questions.",
      href: "/reviews/surfshark",
    },
    {
      title: "How we test VPN speed",
      body: "See why we repeat the same test for every VPN.",
      href: "/guides/vpn-speed-guide",
    },
    {
      title: "Best VPN guide",
      body: "Compare more VPNs by what you need.",
      href: "/best/best-vpn",
    },
  ],
  newsletterTitle: "Get price and test updates",
  newsletterBody: "Receive useful VPN updates and practical guides by email.",
};

const nl: ComparisonCopy = {
  ...en,
  locale: "nl",
  metadata: {
    title: "NordVPN vs Surfshark (2026): welke past beter?",
    description:
      "Vergelijk NordVPN en Surfshark op apparaten, privacycontroles, apps en voorwaarden. Zie wanneer Surfshark duidelijk voorloopt en wanneer er geen duidelijke winnaar is.",
    imageAlt: "ZeroToVPN-vergelijkingsafbeelding voor NordVPN en Surfshark",
  },
  breadcrumbs: {
    compare: "VPN's vergelijken",
    current: "NordVPN vs Surfshark",
  },
  eyebrow: "Naast elkaar gecontroleerd",
  title: "NordVPN vs Surfshark: welke VPN past beter bij jou?",
  dek: "Wil je de VPN op meer dan 10 apparaten tegelijk gebruiken? Dan heeft Surfshark het duidelijke voordeel. NordVPN staat 10 apparaten toe; Surfshark noemt geen limiet. Zijn 10 apparaten genoeg, dan laat ons huidige bewijs geen duidelijke winnaar zien.",
  reviewedLabel: "Beoordeeld door Marvin Smit · 16 augustus 2026",
  testStatus: "Dezelfde snelheidstest voor beide: nog nodig",
  methodologyLabel: "Bekijk hoe wij VPN's vergelijken",
  disclosureLinkLabel: "Hoe we deze site financieren",
  verdict: {
    label: "Het korte antwoord",
    title:
      "Surfshark voor meer dan 10 apparaten; anders geen duidelijke winnaar",
    body: "Kies Surfshark als één account meer dan 10 apparaten tegelijk moet bedienen. Zijn 10 apparaten genoeg, vergelijk dan de totaalprijs, de verlengprijs en de apps die je nodig hebt. We hebben snelheid en streaming nog niet opnieuw op dezelfde manier getest, dus daar noemen we geen winnaar.",
    caveat:
      "Beide merken horen bij dezelfde moedergroep, maar zeggen apart te werken. Hun apps, servers en privacycontroles zijn daardoor niet automatisch hetzelfde.",
  },
  providers: {
    nordvpn: {
      bestFor: "Apparaatlimiet: 10 tegelijk",
      summary:
        "NordVPN staat 10 apparaten tegelijk toe en biedt verschillende manieren om verbinding te maken. Deloitte controleerde in 2025 een deel van het privacybeleid.",
      facts: [
        "10 apparaten tegelijk",
        "Meerdere manieren om verbinding te maken",
        "Privacycontrole uit december 2025",
      ],
      limit: "Geen duidelijk totaalvoordeel als 10 apparaten genoeg zijn.",
      cta: "Bekijk actuele NordVPN-abonnementen",
      review: "Lees de NordVPN-review",
    },
    surfshark: {
      bestFor: "Beste keuze: meer dan 10 apparaten",
      summary:
        "Surfshark zegt dat één account geen apparaatlimiet heeft. Het biedt verschillende manieren om verbinding te maken. Deloitte controleerde in 2025 een deel van het privacybeleid.",
      facts: [
        "Geen genoemde apparaatlimiet",
        "Meerdere manieren om verbinding te maken",
        "Privacycontrole uit juni 2025",
      ],
      limit: "Meer apparaten bewijst geen betere snelheid of streaming.",
      cta: "Bekijk actuele Surfshark-abonnementen",
      review: "Lees de Surfshark-review",
    },
  },
  quick: {
    eyebrow: "Kies in 30 seconden",
    title: "Begin bij je aantal apparaten",
    intro:
      "Surfshark heeft het voordeel bij meer dan 10 apparaten en was goedkoper in onze Nederlandse prijsmomentopname. Dat maakt het nog niet voor iedereen de beste VPN.",
    cards: [
      {
        title: "Overweeg NordVPN als…",
        body: "Je niet meer dan 10 verbindingen nodig hebt en de actuele prijs of app-ondersteuning beter bij je past.",
        points: [
          "Je NordLynx of NordWhisper nodig hebt",
          "Je de privacycontrole uit december 2025 belangrijk vindt",
          "Je totaalprijs en verlengprijs hebt bekeken",
        ],
        tone: "nord",
      },
      {
        title: "Kies Surfshark als…",
        body: "Je één account op meer dan 10 apparaten tegelijk wilt gebruiken.",
        points: [
          "Geen genoemde apparaatlimiet het belangrijkste voordeel is",
          "Je WireGuard, OpenVPN of IKEv2 nodig hebt",
          "Je totaalprijs en verlengprijs hebt bekeken",
        ],
        tone: "surf",
      },
      {
        title: "Kijk verder als…",
        body: "Je open apps, heel weinig accountgegevens of een gratis startpunt wilt.",
        points: [
          "Gebruik de privacygids om accountgegevens en eigendom te vergelijken",
          "Controleer actuele abonnements- en appdocumentatie van providers",
          "Test elke VPN op het netwerk dat je gaat gebruiken",
        ],
        tone: "neutral",
      },
    ],
  },
  nav: [
    { href: "#verdict", label: "Oordeel" },
    { href: "#matrix", label: "Vergelijk" },
    { href: "#pricing", label: "Prijzen" },
    { href: "#apps", label: "Apps" },
    { href: "#privacy", label: "Privacy" },
    { href: "#tests", label: "Snelheid" },
    { href: "#alternatives", label: "Alternatieven" },
    { href: "#faq", label: "FAQ" },
  ],
  matrix: {
    eyebrow: "Snelle vergelijking",
    title: "Wat is duidelijk — en wat niet?",
    intro:
      "We noemen alleen een winnaar als een actuele bron of dezelfde test voor beide VPN's een nuttig verschil laat zien.",
    columns: {
      category: "Vraag",
      outcome: "Antwoord",
      reason: "Waarom",
      evidence: "Soort bron",
    },
    rows: [
      {
        category: "Meer dan 10 apparaten",
        outcome: "surfshark",
        outcomeLabel: "Surfshark",
        reason:
          "Surfshark noemt geen apparaatlimiet; NordVPN staat 10 apparaten tegelijk toe.",
        evidence: "provider",
        evidenceLabel: "Informatie van aanbieder",
        href: "#apps",
      },
      {
        category: "Privacycontroles",
        outcome: "tie",
        outcomeLabel: "Geen duidelijke winnaar",
        reason:
          "Deloitte controleerde in 2025 bij beide VPN's een deel van het privacybeleid, maar op andere datums en met andere grenzen.",
        evidence: "desk",
        evidenceLabel: "Rapport met datum",
        href: "#privacy",
      },
      {
        category: "Snelheid en vertraging",
        outcome: "retest",
        outcomeLabel: "Dezelfde test nodig",
        reason:
          "We hebben beide nog niet op hetzelfde apparaat, dezelfde route en dezelfde dag getest.",
        evidence: "retest",
        evidenceLabel: "Nieuwe test nodig",
        href: "#tests",
      },
      {
        category: "Streaming",
        outcome: "retest",
        outcomeLabel: "Dezelfde test nodig",
        reason: "De uitslag kan wisselen per dienst, account, land en server.",
        evidence: "retest",
        evidenceLabel: "Nieuwe test nodig",
        href: "#tests",
      },
      {
        category: "Verbindingstypen",
        outcome: "tie",
        outcomeLabel: "Hangt af van je apparaat",
        reason:
          "Beide bieden bekende opties en eigen extra's. Ondersteuning verschilt per apparaat.",
        evidence: "provider",
        evidenceLabel: "Informatie van aanbieder",
        href: "#apps",
      },
      {
        category: "Geld-terug-periode",
        outcome: "tie",
        outcomeLabel: "30 dagen, met voorwaarden",
        reason:
          "Beide noemen 30 dagen voor geschikte eerste aankopen. Sommige winkels en producten vallen erbuiten.",
        evidence: "desk",
        evidenceLabel: "Voorwaarden bekeken",
        href: "#pricing",
      },
      {
        category: "Prijs in Nederland op 16 augustus",
        outcome: "surfshark",
        outcomeLabel: "Surfshark",
        reason:
          "Voor dezelfde eerste 27 maanden was Surfshark €32,67 goedkoper inclusief btw. Ook de vermelde jaarlijkse verlengprijs was lager.",
        evidence: "desk",
        evidenceLabel: "Officiële prijzen bekeken",
        href: "#pricing",
      },
    ],
  },
  tests: {
    eyebrow: "Snelheidstest",
    title: "Welke is sneller? Dat weten we nog niet",
    intro:
      "Voor een eerlijk antwoord moeten we beide VPN's testen op hetzelfde apparaat, internet, dezelfde serverroute en dezelfde dag. Oudere tests onder andere omstandigheden geven geen eerlijk antwoord.",
    pending: "Dezelfde test nog nodig",
    labels: {
      baseline: "Snelheid zonder VPN",
      nord: "Dezelfde test met NordVPN",
      surf: "Dezelfde test met Surfshark",
      result: "Toon de normale uitslag en mislukte tests",
    },
    steps: [
      {
        title: "Begin zonder VPN",
        body: "Meet download, upload en vertraging op één apparaat.",
      },
      {
        title: "Houd alles gelijk",
        body: "Test beide VPN's op vergelijkbare nabije en verre servers.",
      },
      {
        title: "Toon elke uitslag",
        body: "Laat de normale uitslag en mislukte tests zien, niet alleen de snelste score.",
      },
    ],
    note: "Tot deze test klaar is, noemen we geen snelheidswinnaar.",
  },
  privacy: {
    eyebrow: "Privacycontroles",
    title: "Bewaren ze wat je online doet?",
    intro:
      "Beide VPN's zeggen dat ze niet bijhouden wat je via de VPN doet. Deloitte controleerde dit bij beide in 2025. Elke controle ging over een vaste datum en een beperkt deel van de systemen. Het is dus geen belofte voor altijd.",
    sharedOwnershipTitle: "Zijn NordVPN en Surfshark hetzelfde bedrijf?",
    sharedOwnershipBody:
      "Surfshark en Nord Security kwamen in 2022 bij dezelfde moedergroep. Ze zeggen dat de merken apart blijven werken. Dit betekent niet dat ze dezelfde servers, regels of testresultaten gebruiken.",
    cards: {
      nordvpn: {
        title: "Privacycontrole van NordVPN",
        date: "Gecontroleerd: 10 nov–12 dec 2025",
        body: "NordVPN zegt dat Deloitte voor de zesde keer controleerde of het bedrijf zijn privacybeleid volgde.",
        scope:
          "Deloitte keek in deze periode naar gekozen servertypen, instellingen en ondersteunend werk.",
        limitation:
          "De controle gold alleen voor wat toen is bekeken. Voor het volledige rapport heb je een Nord-account nodig.",
        sourceLabel: "Lees de aankondiging van NordVPN",
      },
      surfshark: {
        title: "Privacycontrole van Surfshark",
        date: "Gecontroleerd: 10 juni 2025",
        body: "Surfshark publiceerde een Deloitte-rapport over de vraag of het bedrijf zijn privacybeleid volgde.",
        scope:
          "Deloitte keek op die datum naar de systemen en het ondersteunende werk uit het rapport.",
        limitation:
          "De controle gold alleen voor wat toen is bekeken. Latere veranderingen en andere systemen vallen erbuiten.",
        sourceLabel: "Lees het rapport van Surfshark",
      },
    },
  },
  apps: {
    eyebrow: "Apps en apparaten",
    title: "Surfshark ondersteunt meer apparaten tegelijk",
    intro:
      "De aanbieders noemen de opties hieronder. We hebben dezelfde dagelijkse taken nog niet in beide apps getest. Daarom noemen we geen winnaar voor gebruiksgemak.",
    tasks: [
      {
        task: "Apparaten tegelijk",
        nordvpn: "10, met extra regels op dezelfde server",
        surfshark: "Geen genoemde limiet onder één account",
        result: "Surfshark wint als je meer dan 10 nodig hebt",
      },
      {
        task: "Verbindingstypen",
        nordvpn: "NordLynx, OpenVPN en NordWhisper",
        surfshark: "WireGuard, OpenVPN en IKEv2; Dausos is beperkt",
        result: "De nuttige optie hangt af van je apparaat en netwerk",
      },
      {
        task: "Verbinden en server wisselen",
        nordvpn: "Stappen uitgelegd door NordVPN",
        surfshark: "Stappen uitgelegd door Surfshark",
        result: "Dezelfde praktijktest nog nodig",
      },
      {
        task: "Internet blokkeren bij VPN-uitval",
        nordvpn: "Ondersteuning verschilt per apparaat",
        surfshark: "Ondersteuning verschilt per apparaat",
        result: "Dezelfde lek- en uitvaltest nog nodig",
      },
    ],
    deviceTitle: "Meer apparaten betekent niet automatisch betere prestaties",
    deviceBody:
      "Geen apparaatlimiet is handig voor een groot huishouden, maar bewijst niet dat elk apparaat snel is. De 10 apparaten van NordVPN zijn misschien al genoeg voor jou. Eén NordVPN-verbinding op een router kan meerdere apparaten op dat netwerk bedienen.",
  },
  pricing: {
    eyebrow: "NL-prijsmomentopname · 16 augustus 2026",
    title: "Surfshark was goedkoper in onze Nederlandse prijscheck",
    intro:
      "We vergeleken de instapplannen met 24 + 3 maanden op de officiële Nederlandse betaalpagina's. De bedragen van vandaag zijn inclusief 21% btw; de getoonde advertentie- en verlengprijzen zijn exclusief btw.",
    verify: "Momentopname 16 augustus 2026",
    rows: [
      {
        label: "Vandaag afrekenen, inclusief 21% btw",
        nordvpn: "€114,02",
        surfshark: "€81,35",
      },
      {
        label: "Getoonde prijs, exclusief btw",
        nordvpn: "€94,23",
        surfshark: "€67,23",
      },
      {
        label: "Eerste periode",
        nordvpn: "24 + 3 maanden",
        surfshark: "24 + 3 maanden",
      },
      {
        label: "Vermelde verlenging",
        nordvpn: "€139,08 per jaar, exclusief btw",
        surfshark: "€68,28 per jaar, exclusief btw",
      },
      {
        label: "Geld terug",
        nordvpn:
          "30 dagen bij een eerste aankoop; voorwaarden en uitzonderingen gelden",
        surfshark:
          "30 dagen bij een eerste aankoop; voorwaarden en uitzonderingen gelden",
      },
      {
        label: "Verbindingen",
        nordvpn: "10 apparaten tegelijk",
        surfshark: "Onbeperkt VPN-verbindingen",
      },
    ],
    nordCta: "Open actuele NordVPN-betaalpagina",
    surfCta: "Open actuele Surfshark-betaalpagina",
    partnerLabel: "Commissielink",
    warningTitle: "Dit is een momentopname, geen vaste prijs",
    warningBody:
      "De betaalbedragen bevatten 21% btw; de getoonde advertentie- en verlengprijzen nog niet. Prijzen kunnen veranderen. Vergelijk daarom het volledige bedrag van vandaag met de volgende verlenging.",
  },
  useCases: {
    eyebrow: "Welke past bij jouw situatie?",
    title: "Begin bij wat je nodig hebt",
    cards: [
      {
        title: "Meer dan 10 apparaten",
        outcome: "Surfshark",
        body: "Surfshark noemt geen apparaatlimiet; NordVPN staat 10 apparaten tegelijk toe.",
        href: "#apps",
      },
      {
        title: "10 apparaten of minder",
        outcome: "Geen duidelijke winnaar",
        body: "Vergelijk de actuele totaalprijs, verlenging en de apps die je nodig hebt.",
        href: "#pricing",
      },
      {
        title: "Gamen",
        outcome: "Nog geen winnaar",
        body: "We moeten vertraging en stabiliteit nog op dezelfde manier bij beide testen.",
        href: "#tests",
      },
      {
        title: "Streaming",
        outcome: "Test het zelf",
        body: "De uitslag verandert. Test jouw dienst, account en land binnen een geschikte geld-terug-periode.",
        href: "#tests",
      },
      {
        title: "Heel weinig accountgegevens",
        outcome: "Gebruik de privacygids",
        body: "Vergelijk accountgegevens, eigendom en privacybewijs voordat je een provider kiest.",
        href: "/guides/vpn-privacy-guide",
      },
    ],
  },
  chapters: {
    eyebrow: "Dezelfde controle voor beide",
    title: "Sterke punten en beperkingen",
    intro:
      "We stellen beide VPN's dezelfde vragen. Commissie verandert de uitkomst niet.",
    cards: {
      nordvpn: {
        title: "NordVPN",
        leads: [
          "10 apparaten zijn genoeg voor veel kleine huishoudens",
          "Zes no-logs-controles staan genoemd",
          "NordWhisper is gemaakt voor beperkte netwerken",
        ],
        fallsShort: [
          "Limiet van 10 directe verbindingen",
          "Het volledige privacyrapport uit 2025 vraagt om een account",
          "Geen nieuwe snelheidstest naast Surfshark",
        ],
        review: "Lees de volledige NordVPN-review",
        cta: "Bekijk NordVPN-abonnementen",
      },
      surfshark: {
        title: "Surfshark",
        leads: [
          "Geen genoemde apparaatlimiet onder één account",
          "Het Deloitte-rapport uit 2025 is openbaar",
          "Verschillende bekende verbindingstypen staan genoemd",
        ],
        fallsShort: [
          "Meer apparaten bewijst geen hogere snelheid",
          "Sommige opties werken niet op elk apparaat",
          "Geen nieuwe snelheidstest naast NordVPN",
        ],
        review: "Lees de volledige Surfshark-review",
        cta: "Bekijk Surfshark-abonnementen",
      },
    },
  },
  alternatives: {
    eyebrow: "Andere opties",
    title: "Kijk voor deze wensen verder",
    intro:
      "Deze VPN's passen misschien beter als je iets zoekt dat NordVPN en Surfshark minder duidelijk bieden.",
    cards: [
      {
        name: "VPN-keuzehulp",
        reason:
          "Je wilt je keuze beginnen bij apparaten, gebruik en privacybehoeften.",
        href: "/quiz",
      },
      {
        name: "VPN-privacygids",
        reason:
          "Je wilt accountgegevens, eigendom en privacybewijs vergelijken voordat je kiest.",
        href: "/guides/vpn-privacy-guide",
      },
      {
        name: "Meer VPN's vergelijken",
        reason:
          "Reizen, streaming of een andere speciale wens bepaalt je keuze.",
        href: "/compare",
      },
    ],
  },
  method: {
    eyebrow: "Zo vergelijken we",
    title: "We laten zien waar elke uitspraak vandaan komt",
    intro:
      "Pagina's van aanbieders tonen wat bedrijven zeggen. Rapporten met een datum tonen wat een externe partij controleerde. Onze tests tonen wat er bij ons gebeurde. We houden deze drie soorten informatie apart.",
    facts: [
      { value: "2", label: "VPN's op dezelfde manier bekeken" },
      { value: "7", label: "vragen met een bronlabel" },
    ],
    states: [
      {
        label: "Rapport met datum",
        body: "Een externe partij controleerde een genoemde claim op een vast moment.",
      },
      {
        label: "Informatie van aanbieder",
        body: "Dit vertelt wat het bedrijf aanbiedt, niet hoe het in onze test werkte.",
      },
      {
        label: "Nieuwe test nodig",
        body: "We moeten beide VPN's hetzelfde testen voordat we een winnaar noemen.",
      },
    ],
    link: "Lees de volledige ZeroToVPN-methode",
    changeTitle: "Wat veranderde op 16 augustus 2026",
    changeBody:
      "We verwijderden oude prijzen en onbewezen winnaars voor snelheid of streaming. We voegden duidelijke bronlabels en de uitslag voor apparaten toe.",
  },
  faqs: [
    {
      question: "Is NordVPN beter dan Surfshark?",
      answer:
        "Niet volgens ons huidige bewijs. Surfshark is alleen duidelijk beter als je meer dan 10 apparaten tegelijk nodig hebt. Vergelijk anders de actuele totaalprijs, verlenging en app-ondersteuning die je nodig hebt.",
    },
    {
      question: "Zijn beide VPN's van hetzelfde bedrijf?",
      answer:
        "Ze horen sinds 2022 bij dezelfde moedergroep. De merken zeggen dat ze apart blijven werken.",
    },
    {
      question: "Welke is goedkoper?",
      answer:
        "Surfshark was goedkoper in onze Nederlandse EUR-momentopname van 16 augustus 2026, zowel vandaag als bij verlenging. Prijzen kunnen veranderen, dus bekijk de actuele bedragen hierboven en op beide betaalpagina's.",
    },
    {
      question: "Welke is sneller?",
      answer:
        "Dat weten we nog niet. Voor een eerlijk antwoord moeten we beide testen op hetzelfde apparaat, internet, dezelfde route en dezelfde dag.",
    },
    {
      question: "Welke ondersteunt meer apparaten?",
      answer:
        "Surfshark noemt geen apparaatlimiet onder één account. NordVPN staat 10 apparaten tegelijk toe, met extra regels als ze dezelfde server gebruiken.",
    },
    {
      question: "Welke is beter voor privacy?",
      answer:
        "Deloitte controleerde in 2025 bij beide VPN's een deel van het privacybeleid. De datums en grenzen verschillen. Geen van beide rapporten is een belofte voor altijd.",
    },
    {
      question: "Welke is beter voor streaming?",
      answer:
        "Er is geen blijvende winnaar. De uitslag wisselt per dienst, account, land en server. Test jouw dienst binnen een geschikte geld-terug-periode.",
    },
  ],
  faqTitle: "Veelgestelde vragen over NordVPN vs Surfshark",
  sourcesTitle: "Bronnen en controledatums",
  sourcesIntro:
    "Pagina's van aanbieders tonen actuele productgegevens. Rapporten met een datum tonen wat een externe partij controleerde. Geen van beide vervangt onze eigen test naast elkaar.",
  relatedTitle: "Ga verder met vergelijken",
  related: [
    {
      title: "NordVPN-review",
      body: "Bekijk de bronnen, beperkingen en prijscontroles.",
      href: "/reviews/nordvpn",
    },
    {
      title: "Vergelijkingshub",
      body: "Bekijk welke providervergelijkingen al redactioneel zijn gecontroleerd.",
      href: "/compare",
    },
    {
      title: "Zo testen we VPN-snelheid",
      body: "Lees waarom we bij elke VPN dezelfde test herhalen.",
      href: "/guides/vpn-speed-guide",
    },
    {
      title: "Gids voor de beste VPN",
      body: "Vergelijk meer VPN's op basis van wat je nodig hebt.",
      href: "/best/best-vpn",
    },
  ],
  newsletterTitle: "Ontvang prijs- en testupdates",
  newsletterBody: "Krijg nuttige VPN-updates en praktische gidsen per e-mail.",
};

export const NORDVPN_SURFSHARK_UPDATED_AT = "2026-08-16";
export const NORDVPN_SURFSHARK_SLUG = "nordvpn-vs-surfshark";

export function getNordvpnSurfsharkCopy(locale: string): ComparisonCopy {
  return locale === "nl" ? nl : en;
}

export function isIndexableNordvpnSurfsharkLocale(
  locale: string,
): locale is ComparisonLocale {
  return locale === "en" || locale === "nl";
}

export const nordvpnSurfsharkSources = [
  {
    id: "nord-pricing",
    provider: "NordVPN",
    label: "Nederlandse prijzen en betaalpagina",
    url: "https://nordvpn.com/nl/pricing/",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-pricing",
    provider: "Surfshark",
    label: "Nederlandse prijzen en betaalpagina",
    url: "https://surfshark.com/nl/pricing",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-renewal",
    provider: "Surfshark",
    label: "Vermelde verlengprijzen",
    url: "https://surfshark.com/nl/terms-of-service/pricing",
    checkedAt: "2026-08-16",
  },
  {
    id: "nord-devices",
    provider: "NordVPN",
    label: "Simultaneous-device support",
    url: "https://support.nordvpn.com/hc/en-us/articles/19476515228305-How-many-devices-can-I-use-with-NordVPN",
    checkedAt: "2026-08-16",
  },
  {
    id: "nord-refund",
    provider: "NordVPN",
    label: "Refund policy",
    url: "https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy",
    checkedAt: "2026-08-16",
  },
  {
    id: "nord-privacy",
    provider: "NordVPN",
    label: "Sixth no-logs assurance announcement",
    url: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
    checkedAt: "2026-08-16",
  },
  {
    id: "nord-protocols",
    provider: "NordVPN",
    label: "Protocol support",
    url: "https://support.nordvpn.com/hc/en-us/articles/19482810153745-Which-NordVPN-protocol-should-I-choose",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-devices",
    provider: "Surfshark",
    label: "Simultaneous-device support",
    url: "https://support.surfshark.com/hc/en-us/articles/360003069434-How-many-devices-can-I-use-with-Surfshark-simultaneously",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-refund",
    provider: "Surfshark",
    label: "Terms, renewal and refund policy",
    url: "https://surfshark.com/terms-of-service",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-privacy",
    provider: "Surfshark",
    label: "Deloitte no-logs assurance report",
    url: "https://surfshark.com/wp-content/uploads/2025/06/ISAE_3000-_Report-Surfshark_No_Log_VPN.pdf",
    checkedAt: "2026-08-16",
  },
  {
    id: "surf-protocols",
    provider: "Surfshark",
    label: "Protocol support",
    url: "https://support.surfshark.com/hc/en-us/articles/360010324739-What-protocols-can-I-use-with-Surfshark",
    checkedAt: "2026-08-16",
  },
  {
    id: "ownership",
    provider: "Surfshark",
    label: "Company history and operating structure",
    url: "https://surfshark.com/about-us",
    checkedAt: "2026-08-16",
  },
] as const;
