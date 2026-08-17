export type BestVpnRoundupLocale = "en" | "nl";
export type BestVpnProviderSlug = "nordvpn" | "surfshark" | "protonvpn";

export type BestVpnProvider = {
  slug: BestVpnProviderSlug;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  fitLabel: string;
  fit: string;
  reasons: string[];
  watchOut: string;
  evidenceStatus: string;
  evidenceDate: string;
  testStatus: string;
  cta: string;
  review: string;
};

export type BestVpnRoundupCopy = {
  locale: BestVpnRoundupLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    answer: string;
    reviewed: string;
    author: string;
    facts: Array<{
      value: string;
      label: string;
      tone: "lime" | "blue" | "amber";
    }>;
  };
  disclosureLink: string;
  nav: Array<{ href: string; label: string }>;
  decisions: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string; href: string }>;
  };
  shortlist: {
    eyebrow: string;
    title: string;
    intro: string;
    fits: string;
    watchOut: string;
    evidence: string;
    test: string;
    officialFallback: string;
    partnerLabel: string;
  };
  compare: {
    eyebrow: string;
    title: string;
    intro: string;
    columns: {
      question: string;
      nordvpn: string;
      surfshark: string;
      protonvpn: string;
    };
    rows: Array<{
      question: string;
      nordvpn: string;
      surfshark: string;
      protonvpn: string;
    }>;
    caption: string;
  };
  boundary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      body: string;
      tone: "known" | "claim" | "open";
    }>;
    methodology: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  paths: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  faq: { title: string; items: Array<{ question: string; answer: string }> };
  sources: {
    eyebrow: string;
    title: string;
    intro: string;
    checked: string;
    items: Array<{ provider: string; label: string; href: string }>;
  };
  providers: BestVpnProvider[];
};

const providerMarks = {
  nordvpn: { logo: "/logos/nordvpn.svg", logoWidth: 142, logoHeight: 32 },
  surfshark: { logo: "/logos/surfshark.svg", logoWidth: 137, logoHeight: 32 },
  protonvpn: { logo: "/logos/protonvpn.svg", logoWidth: 36, logoHeight: 36 },
} as const;

const sharedSources = [
  {
    provider: "NordVPN",
    href: "https://support.nordvpn.com/hc/en-us/articles/19476515228305-How-many-devices-can-I-use-with-NordVPN",
  },
  {
    provider: "NordVPN",
    href: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
  },
  {
    provider: "Surfshark",
    href: "https://support.surfshark.com/hc/en-us/articles/360003069434-How-many-devices-can-I-use-with-Surfshark-simultaneously",
  },
  {
    provider: "Surfshark",
    href: "https://surfshark.com/wp-content/uploads/2025/06/ISAE_3000-_Report-Surfshark_No_Log_VPN.pdf",
  },
  {
    provider: "Proton VPN",
    href: "https://protonvpn.com/support/proton-vpn-plans",
  },
  { provider: "Proton VPN", href: "https://github.com/ProtonVPN" },
] as const;

const en: BestVpnRoundupCopy = {
  locale: "en",
  meta: {
    title: "Best VPN in 2026: 3 Clear Starting Points",
    description:
      "Compare NordVPN, Surfshark and Proton VPN by device needs, privacy evidence and current test limits. No mystery scores, old prices or fixed winner.",
  },
  breadcrumb: { home: "Home", current: "Best VPN options" },
  hero: {
    eyebrow: "Commercial guide · checked 16 August 2026",
    title: "Best VPN options in 2026: start with your real need",
    intro:
      "There is no VPN that is best for every person, device and network. This page gives you three sensible starting points and shows the limit beside every claim.",
    answer:
      "Start with NordVPN when its documented apps and 10-device limit fit you, Surfshark when more than 10 devices matter, or Proton VPN when a free start and open-source apps matter. Then check the live plan and test it on your own network.",
    reviewed: "Reviewed 16 August 2026",
    author: "Reviewed by Marvin Smit",
    facts: [
      { value: "3", label: "equal starting points", tone: "blue" },
      { value: "0", label: "overall scores", tone: "lime" },
      { value: "0", label: "fixed price claims", tone: "lime" },
      { value: "Open", label: "matched speed test", tone: "amber" },
    ],
  },
  disclosureLink: "How we fund this site",
  nav: [
    { href: "#choose", label: "Choose" },
    { href: "#shortlist", label: "3 options" },
    { href: "#compare", label: "Compare" },
    { href: "#evidence", label: "Evidence" },
    { href: "#steps", label: "4 steps" },
    { href: "#faq", label: "FAQ" },
  ],
  decisions: {
    eyebrow: "The short answer",
    title: "Which VPN should you check first?",
    intro:
      "Pick the question that sounds most like yours. These are decision paths, not first, second and third place.",
    items: [
      {
        question: "Do you need more than 10 devices at once?",
        answer:
          "Check Surfshark first. It says one account has no device limit.",
        href: "#surfshark",
      },
      {
        question: "Do you want a free place to start?",
        answer: "Check Proton VPN first. It documents a separate free plan.",
        href: "#protonvpn",
      },
      {
        question:
          "Are 10 connections enough, and does NordVPN document apps for your devices?",
        answer:
          "Put NordVPN on your list, then compare its live plan with the others.",
        href: "#nordvpn",
      },
    ],
  },
  shortlist: {
    eyebrow: "Three equal starting points",
    title: "What fits, what to watch and what we can prove",
    intro:
      "Each provider gets the same space and one plan link. We do not use a bigger payment or an affiliate deal to decide the order.",
    fits: "Fits when",
    watchOut: "Watch out",
    evidence: "Evidence status",
    test: "ZeroToVPN test status",
    officialFallback: "Open official plans",
    partnerLabel: "Commission link",
  },
  compare: {
    eyebrow: "Side by side",
    title: "Compare the questions that can change your choice",
    intro:
      "We leave out speed, streaming wins and exact prices because we do not have one new matched test or one price that stays current.",
    columns: {
      question: "Question",
      nordvpn: "NordVPN",
      surfshark: "Surfshark",
      protonvpn: "Proton VPN",
    },
    rows: [
      {
        question: "Useful starting point",
        nordvpn: "Documented apps for common devices and up to 10 connections",
        surfshark: "More than 10 devices on one account",
        protonvpn: "A free start and open-source apps",
      },
      {
        question: "What supports that",
        nordvpn: "Device guide and a dated outside privacy check",
        surfshark: "Device guide and a public dated privacy report",
        protonvpn: "Free-plan guide and public app source code",
      },
      {
        question: "Main limit",
        nordvpn: "The full latest privacy report needs an account",
        surfshark: "No device limit does not prove better performance",
        protonvpn: "Free and paid plans have different limits",
      },
      {
        question: "Performance answer",
        nordvpn: "New matched test needed",
        surfshark: "New matched test needed",
        protonvpn: "New matched test needed",
      },
      {
        question: "Price answer",
        nordvpn: "Check today's total and renewal",
        surfshark: "Check today's total and renewal",
        protonvpn: "Check the free and paid plan limits",
      },
    ],
    caption: "An unordered comparison of three VPN starting points",
  },
  boundary: {
    eyebrow: "Proof boundary",
    title: "A source can answer one question, not every question",
    intro:
      "We keep company information, dated outside checks and our own test status apart. That makes the limits easy to see.",
    items: [
      {
        title: "Dated outside check",
        body: "An outside firm checked a named claim during a set period. It is useful evidence, but not a promise for all future systems.",
        tone: "known",
      },
      {
        title: "Provider information",
        body: "The company explains a plan, feature or device limit. This proves what it publishes, not how it works on your network.",
        tone: "claim",
      },
      {
        title: "New test needed",
        body: "We need the same device, route and date for every VPN before we can name a speed or streaming winner.",
        tone: "open",
      },
    ],
    methodology: "Read the full ZeroToVPN method",
  },
  steps: {
    eyebrow: "Four simple checks",
    title: "Choose without guessing",
    intro:
      "You can make a better choice in a few minutes without trusting a single score.",
    items: [
      {
        title: "Write down your need",
        body: "Count your devices and name the app, country or network that matters.",
      },
      {
        title: "Open the live plan",
        body: "Check what you pay now, the renewal total and the refund rules.",
      },
      {
        title: "Check your device",
        body: "Make sure the needed app and connection type are available on your platform.",
      },
      {
        title: "Run your own test",
        body: "Test the service during an eligible refund period and save the date and setup.",
      },
    ],
  },
  paths: {
    eyebrow: "Narrower questions",
    title: "Use the page that matches your next decision",
    items: [
      {
        title: "NordVPN vs Surfshark",
        body: "Compare device limits, privacy checks and open test gaps.",
        href: "/compare/nordvpn-vs-surfshark",
        action: "Open the comparison",
      },
      {
        title: "VPN privacy",
        body: "Learn which privacy evidence matters and where it stops.",
        href: "/best/vpn-privacy",
        action: "Compare privacy paths",
      },
      {
        title: "Free VPN plans",
        body: "Check operator, limits and privacy before using a free service.",
        href: "/best/free-vpn",
        action: "Check free options",
      },
    ],
  },
  faq: {
    title: "Best VPN questions",
    items: [
      {
        question: "What is the best VPN in 2026?",
        answer:
          "There is no single winner for every person. NordVPN, Surfshark and Proton VPN each fit a different starting question. Your device, plan, network and own test decide the better fit.",
      },
      {
        question: "Which VPN is fastest?",
        answer:
          "We do not name a speed winner here. A fair answer needs every VPN tested on the same device, connection, route and day. That matched test is still open.",
      },
      {
        question: "Which VPN is cheapest?",
        answer:
          "Prices change by country, currency, plan and renewal. Compare the full amount due today and the later renewal in each live checkout.",
      },
      {
        question: "Which VPN supports the most devices?",
        answer:
          "Surfshark says one account has no device limit. NordVPN allows up to 10 connections at once. Proton VPN limits depend on the plan. Check the current provider rules before buying.",
      },
      {
        question: "Do outside privacy checks prove a VPN never keeps logs?",
        answer:
          "No. A dated check covers a named claim, period and set of systems. It is useful evidence, but it cannot promise what every future system will do.",
      },
    ],
  },
  sources: {
    eyebrow: "Sources",
    title: "Current records behind this shortlist",
    intro:
      "These first-party pages and dated reports support the narrow statements above. They do not prove speed, streaming access or a universal winner.",
    checked: "Links checked 16 August 2026",
    items: sharedSources.map((source, index) => ({
      ...source,
      label: [
        "Simultaneous-device guide",
        "Sixth no-logs assurance announcement",
        "Simultaneous-device guide",
        "Deloitte no-logs assurance report",
        "Free-plan documentation",
        "Public app source code",
      ][index],
    })),
  },
  providers: [
    {
      slug: "nordvpn",
      name: "NordVPN",
      ...providerMarks.nordvpn,
      fitLabel: "10-device app check",
      fit: "NordVPN documents apps for your devices and 10 simultaneous connections cover your household.",
      reasons: [
        "Up to 10 connections are documented",
        "NordLynx, OpenVPN and NordWhisper are named options",
        "A sixth no-logs assurance check was announced for 2025",
      ],
      watchOut:
        "The newest full privacy report needs a Nord Account, and our new matched speed and streaming test is not complete.",
      evidenceStatus:
        "Provider guides plus a dated Deloitte assurance announcement",
      evidenceDate: "Sources checked 16 August 2026",
      testStatus: "New matched performance test needed",
      cta: "Check current NordVPN plans",
      review: "Read the NordVPN review",
    },
    {
      slug: "surfshark",
      name: "Surfshark",
      ...providerMarks.surfshark,
      fitLabel: "Many-device check",
      fit: "One account must cover more than 10 devices at the same time.",
      reasons: [
        "Surfshark says there is no device limit",
        "WireGuard, OpenVPN and IKEv2 are named options",
        "A public Deloitte no-logs report is dated June 2025",
      ],
      watchOut:
        "An unlimited device claim does not prove better speed, stability or streaming on every screen.",
      evidenceStatus: "Provider guides plus a public dated Deloitte report",
      evidenceDate: "Sources checked 16 August 2026",
      testStatus: "New matched performance test needed",
      cta: "Check current Surfshark plans",
      review: "Read the Surfshark review",
    },
    {
      slug: "protonvpn",
      name: "Proton VPN",
      ...providerMarks.protonvpn,
      fitLabel: "Privacy and free-plan check",
      fit: "You want a free place to start or you value open-source apps.",
      reasons: [
        "A separate free plan is documented",
        "App source code is public",
        "Paid plans add features that the free plan may not include",
      ],
      watchOut:
        "Free and paid plans have different server, device and feature limits. Check the tier you will actually use.",
      evidenceStatus: "Provider plan guides plus inspectable public app code",
      evidenceDate: "Sources checked 16 August 2026",
      testStatus: "New matched performance test needed",
      cta: "Check current Proton VPN plans",
      review: "Read the Proton VPN review",
    },
  ],
};

const nl: BestVpnRoundupCopy = {
  ...en,
  locale: "nl",
  meta: {
    title: "Beste VPN in 2026: 3 duidelijke keuzes",
    description:
      "Vergelijk NordVPN, Surfshark en Proton VPN op apparaten, privacybewijs en testgrenzen. Zonder vage scores, oude prijzen of vaste winnaar.",
  },
  breadcrumb: {
    home: "Home",
    current: "Beste VPN-opties",
  },
  hero: {
    eyebrow: "Commerciële gids · gecontroleerd op 16 augustus 2026",
    title: "Beste VPN-opties in 2026: begin bij wat jij nodig hebt",
    intro:
      "Geen enkele VPN is het beste voor iedere persoon, ieder apparaat en ieder netwerk. Deze pagina geeft drie logische startpunten en toont bij elke claim de grens.",
    answer:
      "Begin bij NordVPN als de beschreven apps en limiet van 10 apparaten bij je passen, bij Surfshark als meer dan 10 apparaten belangrijk zijn, of bij Proton VPN als je gratis wilt starten en openbare appcode belangrijk vindt. Controleer daarna het live abonnement en test op je eigen netwerk.",
    reviewed: "Beoordeeld op 16 augustus 2026",
    author: "Beoordeeld door Marvin Smit",
    facts: [
      { value: "3", label: "gelijke startpunten", tone: "blue" },
      { value: "0", label: "totaalscores", tone: "lime" },
      { value: "0", label: "vaste prijsclaims", tone: "lime" },
      { value: "Open", label: "gelijke snelheidstest", tone: "amber" },
    ],
  },
  disclosureLink: "Zo financieren we deze site",
  nav: [
    { href: "#choose", label: "Kiezen" },
    { href: "#shortlist", label: "3 opties" },
    { href: "#compare", label: "Vergelijken" },
    { href: "#evidence", label: "Bewijs" },
    { href: "#steps", label: "4 stappen" },
    { href: "#faq", label: "FAQ" },
  ],
  decisions: {
    eyebrow: "Het korte antwoord",
    title: "Welke VPN controleer je als eerste?",
    intro:
      "Kies de vraag die het beste bij jou past. Dit zijn keuzeroutes, geen eerste, tweede en derde plaats.",
    items: [
      {
        question: "Heb je meer dan 10 apparaten tegelijk?",
        answer:
          "Bekijk Surfshark eerst. Het bedrijf noemt geen apparaatlimiet per account.",
        href: "#surfshark",
      },
      {
        question: "Wil je gratis kunnen beginnen?",
        answer:
          "Bekijk Proton VPN eerst. Het bedrijf beschrijft een apart gratis abonnement.",
        href: "#protonvpn",
      },
      {
        question:
          "Zijn 10 verbindingen genoeg en beschrijft NordVPN apps voor jouw apparaten?",
        answer:
          "Zet NordVPN op je lijst en vergelijk daarna het live abonnement met de andere opties.",
        href: "#nordvpn",
      },
    ],
  },
  shortlist: {
    eyebrow: "Drie gelijke startpunten",
    title: "Wat past, waar let je op en wat kunnen we bewijzen?",
    intro:
      "Elke aanbieder krijgt dezelfde ruimte en één abonnementslink. De vergoeding van een partnerlink bepaalt de volgorde niet.",
    fits: "Past als",
    watchOut: "Let op",
    evidence: "Status van het bewijs",
    test: "Status ZeroToVPN-test",
    officialFallback: "Open officiële abonnementen",
    partnerLabel: "Commissielink",
  },
  compare: {
    eyebrow: "Naast elkaar",
    title: "Vergelijk de vragen die je keuze echt veranderen",
    intro:
      "We laten snelheidswinnaars, streamingwinnaars en exacte prijzen weg. Daarvoor ontbreekt één nieuwe gelijke test of een prijs die actueel blijft.",
    columns: {
      question: "Vraag",
      nordvpn: "NordVPN",
      surfshark: "Surfshark",
      protonvpn: "Proton VPN",
    },
    rows: [
      {
        question: "Nuttig startpunt",
        nordvpn:
          "Apps voor Windows, macOS, Android, iPhone, Linux en tv; maximaal 10 verbindingen",
        surfshark: "Meer dan 10 apparaten op één account",
        protonvpn: "Gratis starten en openbare appcode",
      },
      {
        question: "Welk bewijs hoort daarbij",
        nordvpn: "Apparaatgids en een gedateerde externe privacycontrole",
        surfshark: "Apparaatgids en een openbaar gedateerd privacyrapport",
        protonvpn: "Gids voor het gratis plan en openbare appcode",
      },
      {
        question: "Belangrijkste grens",
        nordvpn: "Het nieuwste volledige privacyrapport vraagt om een account",
        surfshark: "Geen apparaatlimiet bewijst geen betere prestaties",
        protonvpn: "Gratis en betaalde plannen hebben andere grenzen",
      },
      {
        question: "Antwoord over prestaties",
        nordvpn: "Nieuwe gelijke test nodig",
        surfshark: "Nieuwe gelijke test nodig",
        protonvpn: "Nieuwe gelijke test nodig",
      },
      {
        question: "Antwoord over prijs",
        nordvpn: "Controleer totaalprijs en verlenging",
        surfshark: "Controleer totaalprijs en verlenging",
        protonvpn: "Controleer de grenzen van gratis en betaald",
      },
    ],
    caption: "Een vergelijking zonder rangorde van drie VPN-startpunten",
  },
  boundary: {
    eyebrow: "Grens van het bewijs",
    title: "Eén bron beantwoordt één vraag, niet alle vragen",
    intro:
      "We houden informatie van een aanbieder, gedateerde controles van buitenaf en onze eigen teststatus apart. Zo zie je de grenzen meteen.",
    items: [
      {
        title: "Gedateerde externe controle",
        body: "Een bedrijf van buiten controleerde een genoemde claim in een vaste periode. Dat is nuttig bewijs, maar geen belofte voor alle toekomstige systemen.",
        tone: "known",
      },
      {
        title: "Informatie van de aanbieder",
        body: "Het bedrijf legt een abonnement, functie of apparaatlimiet uit. Dat bewijst wat het publiceert, niet hoe het op jouw netwerk werkt.",
        tone: "claim",
      },
      {
        title: "Nieuwe test nodig",
        body: "We hebben hetzelfde apparaat, dezelfde route en dezelfde dag nodig voordat we een winnaar voor snelheid of streaming noemen.",
        tone: "open",
      },
    ],
    methodology: "Lees de volledige ZeroToVPN-methode",
  },
  steps: {
    eyebrow: "Vier simpele controles",
    title: "Kies zonder te gokken",
    intro:
      "Je kunt in een paar minuten beter kiezen zonder één totaalscore te vertrouwen.",
    items: [
      {
        title: "Schrijf je behoefte op",
        body: "Tel je apparaten en noteer welke app, welk land of welk netwerk belangrijk is.",
      },
      {
        title: "Open het live abonnement",
        body: "Controleer wat je nu betaalt, de verlengprijs en de terugbetaalregels.",
      },
      {
        title: "Controleer je apparaat",
        body: "Kijk of de nodige app en het verbindingstype op jouw apparaat bestaan.",
      },
      {
        title: "Doe je eigen test",
        body: "Test tijdens een geldige bedenktermijn en bewaar de datum en je opstelling.",
      },
    ],
  },
  paths: {
    eyebrow: "Gerichtere vragen",
    title: "Ga verder met de pagina die bij je volgende keuze past",
    items: [
      {
        title: "NordVPN vs Surfshark",
        body: "Vergelijk apparaatlimieten, privacycontroles en open testvragen.",
        href: "/compare/nordvpn-vs-surfshark",
        action: "Open de vergelijking",
      },
      {
        title: "VPN en privacy",
        body: "Leer welk privacybewijs nuttig is en waar het bewijs stopt.",
        href: "/guides/vpn-privacy-guide",
        action: "Vergelijk privacykeuzes",
      },
      {
        title: "VPN-keuzehulp",
        body: "Beantwoord enkele vragen en bepaal welke eigenschappen voor jou belangrijk zijn.",
        href: "/quiz",
        action: "Start de keuzehulp",
      },
    ],
  },
  faq: {
    title: "Vragen over de beste VPN",
    items: [
      {
        question: "Wat is de beste VPN in 2026?",
        answer:
          "Er is geen enkele winnaar voor iedereen. NordVPN, Surfshark en Proton VPN passen ieder bij een andere startvraag. Je apparaat, abonnement, netwerk en eigen test bepalen welke beter past.",
      },
      {
        question: "Welke VPN is het snelst?",
        answer:
          "Op deze pagina noemen we geen snelheidswinnaar. Een eerlijk antwoord vraagt om dezelfde test op hetzelfde apparaat, dezelfde verbinding, dezelfde route en dezelfde dag. Die test staat nog open.",
      },
      {
        question: "Welke VPN is het goedkoopst?",
        answer:
          "Prijzen veranderen per land, munt, abonnement en verlenging. Vergelijk in elke live betaalpagina het hele bedrag van vandaag en het bedrag van de latere verlenging.",
      },
      {
        question: "Welke VPN ondersteunt de meeste apparaten?",
        answer:
          "Surfshark noemt geen apparaatlimiet per account. NordVPN staat maximaal 10 verbindingen tegelijk toe. Bij Proton VPN hangt de limiet af van het abonnement. Controleer de actuele regels voor je koopt.",
      },
      {
        question:
          "Bewijst een externe privacycontrole dat een VPN nooit logs bewaart?",
        answer:
          "Nee. Een gedateerde controle gaat over een genoemde claim, periode en groep systemen. Dat is nuttig bewijs, maar geen belofte voor ieder toekomstig systeem.",
      },
    ],
  },
  sources: {
    eyebrow: "Bronnen",
    title: "Actuele gegevens achter deze keuzehulp",
    intro:
      "Deze pagina's van aanbieders en gedateerde rapporten steunen de kleine claims hierboven. Ze bewijzen geen snelheid, toegang tot streaming of algemene winnaar.",
    checked: "Links gecontroleerd op 16 augustus 2026",
    items: sharedSources.map((source, index) => ({
      ...source,
      label: [
        "Gids voor gelijktijdige apparaten",
        "Aankondiging van de zesde no-logs-controle",
        "Gids voor gelijktijdige apparaten",
        "Deloitte-rapport over de no-logs-claim",
        "Uitleg over het gratis abonnement",
        "Openbare broncode van de apps",
      ][index],
    })),
  },
  providers: [
    {
      slug: "nordvpn",
      name: "NordVPN",
      ...providerMarks.nordvpn,
      fitLabel: "Controle voor 10 apparaten",
      fit: "NordVPN apps voor jouw apparaten beschrijft en 10 gelijktijdige verbindingen genoeg zijn voor jouw huishouden.",
      reasons: [
        "Maximaal 10 verbindingen staan beschreven",
        "NordLynx, OpenVPN en NordWhisper staan als opties genoemd",
        "Voor 2025 is een zesde no-logs-controle aangekondigd",
      ],
      watchOut:
        "Voor het nieuwste volledige privacyrapport heb je een Nord Account nodig. Onze nieuwe gelijke test voor snelheid en streaming is nog niet klaar.",
      evidenceStatus:
        "Gidsen van NordVPN en een gedateerde aankondiging van Deloitte-onderzoek",
      evidenceDate: "Bronnen gecontroleerd op 16 augustus 2026",
      testStatus: "Nieuwe gelijke prestatietest nodig",
      cta: "Bekijk actuele NordVPN-abonnementen",
      review: "Lees de NordVPN-review",
    },
    {
      slug: "surfshark",
      name: "Surfshark",
      ...providerMarks.surfshark,
      fitLabel: "Controle voor veel apparaten",
      fit: "Eén account meer dan 10 apparaten tegelijk moet dekken.",
      reasons: [
        "Surfshark noemt geen apparaatlimiet",
        "WireGuard, OpenVPN en IKEv2 staan als opties genoemd",
        "Een openbaar Deloitte-rapport over no-logs is gedateerd in juni 2025",
      ],
      watchOut:
        "Geen apparaatlimiet bewijst niet dat snelheid, stabiliteit of streaming op ieder scherm beter is.",
      evidenceStatus:
        "Gidsen van Surfshark en een openbaar gedateerd rapport van Deloitte",
      evidenceDate: "Bronnen gecontroleerd op 16 augustus 2026",
      testStatus: "Nieuwe gelijke prestatietest nodig",
      cta: "Bekijk actuele Surfshark-abonnementen",
      review: "Lees de Surfshark-review",
    },
    {
      slug: "protonvpn",
      name: "Proton VPN",
      ...providerMarks.protonvpn,
      fitLabel: "Controle voor privacy en gratis plan",
      fit: "Je gratis wilt kunnen beginnen of openbare appcode belangrijk vindt.",
      reasons: [
        "Een apart gratis abonnement staat beschreven",
        "De broncode van de apps is openbaar",
        "Betaalde plannen hebben functies die niet altijd in het gratis plan zitten",
      ],
      watchOut:
        "Gratis en betaalde plannen hebben andere grenzen voor servers, apparaten en functies. Controleer het plan dat je echt gaat gebruiken.",
      evidenceStatus:
        "Uitleg van Proton VPN en controleerbare openbare appcode",
      evidenceDate: "Bronnen gecontroleerd op 16 augustus 2026",
      testStatus: "Nieuwe gelijke prestatietest nodig",
      cta: "Bekijk actuele Proton VPN-abonnementen",
      review: "Lees de Proton VPN-review",
    },
  ],
};

export function isBestVpnRoundupLocale(
  locale: string,
): locale is BestVpnRoundupLocale {
  return locale === "en" || locale === "nl";
}

export function getBestVpnRoundupCopy(locale: string): BestVpnRoundupCopy {
  return locale === "nl" ? nl : en;
}
