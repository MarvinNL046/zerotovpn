import { getIndexableLocalesForPath } from "@/lib/indexability";

export type ComparisonDirectoryLocale = "en" | "nl";

export type ComparisonDirectoryEntry = {
  id: string;
  providers: [string, string];
  href: `/compare/${string}`;
  languages: ComparisonDirectoryLocale[];
  eyebrow: string;
  status: string;
  languageNote: string;
  answer: string;
  bestFor: string[];
  evidence: string;
  limitation: string;
  checkedAt: string;
  checkedLabel: string;
  action: string;
};

export type ComparisonDirectoryCopy = {
  locale: ComparisonDirectoryLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; compare: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    cues: string[];
    boardTitle: string;
    boardRows: Array<{
      label: string;
      value: string;
      tone: "lime" | "blue" | "amber";
    }>;
  };
  directory: {
    eyebrow: string;
    title: string;
    intro: string;
    bestForLabel: string;
    evidenceLabel: string;
    limitationLabel: string;
  };
  questions: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ number: string; title: string; body: string }>;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    noteTitle: string;
    noteBody: string;
    action: string;
  };
  boundary: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  next: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  entries: ComparisonDirectoryEntry[];
};

const enEntries: ComparisonDirectoryEntry[] = [
  {
    id: "nordvpn-surfshark",
    providers: ["NordVPN", "Surfshark"],
    href: "/compare/nordvpn-vs-surfshark",
    languages: ["en", "nl"],
    eyebrow: "Devices, privacy and plan terms",
    status: "Full evidence-led comparison",
    languageNote: "English and Dutch",
    answer:
      "Surfshark has the clear advantage if you need more than 10 devices at once. If 10 devices are enough, the current evidence does not show one overall winner.",
    bestFor: [
      "Choosing by device limit",
      "Checking privacy reports",
      "Comparing total and renewal terms",
    ],
    evidence:
      "Provider documentation and dated privacy checks, with source limits shown.",
    limitation:
      "A new speed and streaming test under the same conditions is still needed.",
    checkedAt: "2026-08-16",
    checkedLabel: "Comparison reviewed 16 Aug 2026",
    action: "Compare NordVPN and Surfshark",
  },
  {
    id: "protonvpn-airvpn",
    providers: ["Proton VPN", "AirVPN"],
    href: "/compare/protonvpn-vs-airvpn",
    languages: ["en"],
    eyebrow: "Privacy tools and advanced controls",
    status: "Focused evidence-led comparison",
    languageNote: "English",
    answer:
      "Use this comparison when open-source apps, a free starting point or advanced controls such as port forwarding matter more than a simple winner label.",
    bestFor: [
      "Comparing privacy tools",
      "Checking port-forwarding needs",
      "Understanding free and paid limits",
    ],
    evidence:
      "Public documentation, app information and dated catalog snapshots.",
    limitation:
      "Live prices, renewal terms and performance still need a fresh check before buying.",
    checkedAt: "2026-08-13",
    checkedLabel: "Comparison reviewed 13 Aug 2026",
    action: "Compare Proton VPN and AirVPN",
  },
];

const nlEntries: ComparisonDirectoryEntry[] = [
  {
    ...enEntries[0],
    eyebrow: "Apparaten, privacy en voorwaarden",
    status: "Volledige vergelijking met bronlabels",
    languageNote: "Nederlands en Engels",
    answer:
      "Surfshark heeft een duidelijk voordeel als je meer dan 10 apparaten tegelijk gebruikt. Zijn 10 apparaten genoeg? Dan laat het huidige bewijs geen algemene winnaar zien.",
    bestFor: [
      "Kiezen op aantal apparaten",
      "Privacyrapporten controleren",
      "Eerste betaling en verlenging vergelijken",
    ],
    evidence:
      "Informatie van de aanbieders en gedateerde privacycontroles, met de grenzen erbij.",
    limitation:
      "Een nieuwe snelheids- en streamingtest onder gelijke omstandigheden ontbreekt nog.",
    checkedLabel: "Vergelijking beoordeeld op 16 aug 2026",
    action: "Vergelijk NordVPN en Surfshark",
  },
  {
    ...enEntries[1],
    eyebrow: "Privacyfuncties en extra instellingen",
    status: "Gerichte vergelijking met bronlabels",
    languageNote: "Opent in het Engels",
    answer:
      "Gebruik deze vergelijking als openbare appcode, een gratis start of extra instellingen zoals port forwarding belangrijker zijn dan één winnaar.",
    bestFor: [
      "Privacyfuncties vergelijken",
      "Port forwarding controleren",
      "Gratis en betaalde grenzen begrijpen",
    ],
    evidence:
      "Openbare documentatie, appinformatie en gedateerde catalogusgegevens.",
    limitation:
      "Controleer vóór aankoop opnieuw de live prijs, verlenging en prestaties.",
    checkedLabel: "Vergelijking beoordeeld op 13 aug 2026",
    action: "Vergelijk Proton VPN en AirVPN",
  },
];

const copies: Record<ComparisonDirectoryLocale, ComparisonDirectoryCopy> = {
  en: {
    locale: "en",
    meta: {
      title: "Compare VPNs by Evidence, Limits and Fit",
      description:
        "Choose an evidence-led VPN comparison by device limit, privacy checks and plan terms. See clear answers, source limits and what still needs a fair retest.",
    },
    breadcrumb: { home: "Home", compare: "Compare VPNs" },
    hero: {
      eyebrow: "VPN comparison library",
      title: "Compare the difference that matters to you",
      intro:
        "A VPN comparison should answer a real question. Pick a pair below to see what is known, what remains uncertain and what you should check before paying.",
      directAnswer:
        "Start with your device limit, privacy needs and renewal terms. We only name a winner when a useful difference has clear support.",
      cues: [
        "No mystery scores",
        "No universal winner",
        "Unknown stays unknown",
      ],
      boardTitle: "Library at a glance",
      boardRows: [
        { label: "Evidence-led comparisons", value: "2", tone: "lime" },
        { label: "Available in Dutch", value: "1", tone: "blue" },
        { label: "Invented ranks or scores", value: "0", tone: "lime" },
        { label: "Same-condition retests needed", value: "2", tone: "amber" },
      ],
    },
    directory: {
      eyebrow: "Choose a comparison",
      title: "Which two VPNs are you weighing up?",
      intro:
        "The library is intentionally small. We publish a pair here only when the page explains its evidence and limits in plain language.",
      bestForLabel: "Useful when you need to",
      evidenceLabel: "What the page uses",
      limitationLabel: "What still needs checking",
    },
    questions: {
      eyebrow: "Before you open a comparison",
      title: "Write down three answers first",
      intro:
        "A clear need is more useful than a long feature list. These questions keep the comparison focused.",
      items: [
        {
          number: "01",
          title: "How many devices?",
          body: "Count the phones, computers, tablets and TVs that may connect at the same time.",
        },
        {
          number: "02",
          title: "What must the app do?",
          body: "Name the device, network and task you will actually use. Do not buy for features you do not need.",
        },
        {
          number: "03",
          title: "What will the full plan cost?",
          body: "Compare the amount due today, the plan length, tax and the later renewal—not only the monthly headline.",
        },
      ],
    },
    method: {
      eyebrow: "A fair comparison",
      title: "How we decide whether one side really wins",
      intro:
        "A provider claim can describe a feature. It cannot prove speed, reliability or safety by itself.",
      steps: [
        {
          title: "Match the source to the claim",
          body: "Plan terms can support a device limit. A repeatable test is needed for speed or connection behaviour.",
        },
        {
          title: "Use the same conditions",
          body: "Performance only compares fairly on the same device, route, protocol and day.",
        },
        {
          title: "Show the limit",
          body: "Every result has a date and scope. A past check is not a promise for all future versions.",
        },
        {
          title: "Leave ties and gaps visible",
          body: "If the evidence cannot separate two VPNs, we say so instead of making a score look exact.",
        },
      ],
      noteTitle: "Why is this comparison library small?",
      noteBody:
        "Older pair pages are being checked before they join this library. A small truthful directory is more useful than dozens of pages that repeat old catalog scores.",
      action: "Read the full comparison method",
    },
    boundary: {
      eyebrow: "What this hub does not claim",
      title: "One page cannot predict every network or future plan",
      body: "VPN apps, routes, prices and terms change. Use a comparison to narrow your choice, then test the service on your own device and check the live checkout.",
      items: [
        {
          title: "No permanent speed winner",
          body: "Speed can change by location, server, time and internet connection.",
        },
        {
          title: "No safety from a logo",
          body: "Read privacy evidence, ownership, app behaviour and account requirements together.",
        },
        {
          title: "No price without context",
          body: "An advertised monthly average can hide the upfront total and later renewal.",
        },
      ],
    },
    faq: {
      title: "VPN comparison questions",
      items: [
        {
          question: "Which VPN is best for everyone?",
          answer:
            "None. The useful choice depends on your devices, network, privacy needs and current plan terms.",
        },
        {
          question: "Why are there no scores on this page?",
          answer:
            "A single score hides different needs and can look more exact than the evidence. We show the supported difference and the main limit instead.",
        },
        {
          question: "Can I trust an old speed test?",
          answer:
            "It can show what happened in that setup on that date. It cannot promise the same result on your route today.",
        },
        {
          question: "What should I check before buying?",
          answer:
            "Check the total due now, renewal price, refund rules, device support and the feature you actually need.",
        },
      ],
    },
    next: {
      eyebrow: "Need a different starting point?",
      title: "Choose the next useful step",
      items: [
        {
          title: "Read a provider review",
          body: "Check one VPN in more detail, including the main evidence gap.",
          href: "/reviews",
          action: "Open VPN reviews",
        },
        {
          title: "Build a shortlist",
          body: "Answer a few simple questions before you compare names.",
          href: "/quiz",
          action: "Use the VPN finder",
        },
        {
          title: "Learn how a VPN works",
          body: "See what a VPN changes—and what it cannot hide.",
          href: "/guides/what-is-vpn",
          action: "Read the starter guide",
        },
      ],
    },
    entries: enEntries,
  },
  nl: {
    locale: "nl",
    meta: {
      title: "VPN's vergelijken op bewijs, grenzen en gebruik",
      description:
        "Kies een duidelijke VPN-vergelijking op apparaten, privacy en voorwaarden. Bekijk wat vaststaat, welke bron is gebruikt en wat nog gelijk getest moet worden.",
    },
    breadcrumb: { home: "Start", compare: "VPN's vergelijken" },
    hero: {
      eyebrow: "Bibliotheek met VPN-vergelijkingen",
      title: "Vergelijk het verschil dat voor jou telt",
      intro:
        "Een VPN-vergelijking moet een echte vraag beantwoorden. Kies hieronder een paar en zie wat bekend is, wat onzeker blijft en wat je controleert vóór je betaalt.",
      directAnswer:
        "Begin bij je aantal apparaten, privacywensen en verlengprijs. We noemen alleen een winnaar als een nuttig verschil duidelijk wordt ondersteund.",
      cues: [
        "Geen mysterieuze cijfers",
        "Geen winnaar voor iedereen",
        "Onbekend blijft onbekend",
      ],
      boardTitle: "De bibliotheek in het kort",
      boardRows: [
        { label: "Vergelijkingen met bronlabels", value: "2", tone: "lime" },
        { label: "Beschikbaar in het Nederlands", value: "1", tone: "blue" },
        { label: "Verzonnen ranglijsten of scores", value: "0", tone: "lime" },
        { label: "Gelijke hertests nodig", value: "2", tone: "amber" },
      ],
    },
    directory: {
      eyebrow: "Kies een vergelijking",
      title: "Tussen welke twee VPN's twijfel je?",
      intro:
        "De bibliotheek is bewust klein. Een paar komt hier pas bij als de pagina het bewijs en de grenzen in gewone taal uitlegt.",
      bestForLabel: "Nuttig wanneer je wilt",
      evidenceLabel: "Waar de pagina op steunt",
      limitationLabel: "Wat je nog moet controleren",
    },
    questions: {
      eyebrow: "Vóór je een vergelijking opent",
      title: "Schrijf eerst drie antwoorden op",
      intro:
        "Een duidelijke behoefte helpt meer dan een lange lijst functies. Deze vragen houden je keuze overzichtelijk.",
      items: [
        {
          number: "01",
          title: "Hoeveel apparaten?",
          body: "Tel de telefoons, computers, tablets en tv's die misschien tegelijk verbinden.",
        },
        {
          number: "02",
          title: "Wat moet de app doen?",
          body: "Noem het apparaat, netwerk en doel dat je echt gebruikt. Betaal niet voor functies die je niet nodig hebt.",
        },
        {
          number: "03",
          title: "Wat kost het hele abonnement?",
          body: "Vergelijk het bedrag van vandaag, de looptijd, belasting en verlenging—niet alleen het maandbedrag in de advertentie.",
        },
      ],
    },
    method: {
      eyebrow: "Eerlijk vergelijken",
      title: "Zo bepalen we of één kant echt wint",
      intro:
        "Een uitspraak van een aanbieder kan een functie beschrijven. Die bewijst niet vanzelf snelheid, betrouwbaarheid of veiligheid.",
      steps: [
        {
          title: "Gebruik de juiste bron",
          body: "Voorwaarden kunnen een apparaatlimiet ondersteunen. Voor snelheid of verbindingen is een herhaalbare test nodig.",
        },
        {
          title: "Test onder gelijke omstandigheden",
          body: "Prestaties zijn pas eerlijk te vergelijken op hetzelfde apparaat, dezelfde route, hetzelfde protocol en dezelfde dag.",
        },
        {
          title: "Toon de grens",
          body: "Elke uitslag heeft een datum en afbakening. Een eerdere controle is geen belofte voor elke nieuwe versie.",
        },
        {
          title: "Laat gelijke standen zichtbaar",
          body: "Kan het bewijs twee VPN's niet uit elkaar houden? Dan zeggen we dat, zonder een precies lijkend cijfer te verzinnen.",
        },
      ],
      noteTitle: "Waarom is deze bibliotheek nog klein?",
      noteBody:
        "Oudere vergelijkingspagina's worden gecontroleerd voordat ze in deze bibliotheek komen. Een kleine eerlijke lijst helpt meer dan tientallen pagina's met oude cataloguscijfers.",
      action: "Lees de volledige vergelijkingsmethode",
    },
    boundary: {
      eyebrow: "Wat deze pagina niet belooft",
      title: "Eén pagina voorspelt niet elk netwerk of toekomstig abonnement",
      body: "VPN-apps, routes, prijzen en voorwaarden veranderen. Gebruik een vergelijking om je keuze kleiner te maken. Test daarna op je eigen apparaat en controleer de live betaalpagina.",
      items: [
        {
          title: "Geen blijvende snelheidswinnaar",
          body: "Snelheid kan veranderen door locatie, server, tijdstip en internetverbinding.",
        },
        {
          title: "Een logo bewijst geen veiligheid",
          body: "Lees privacybewijs, eigendom, appgedrag en accountregels samen.",
        },
        {
          title: "Geen prijs zonder uitleg",
          body: "Een gemiddeld maandbedrag kan het bedrag vooraf en de latere verlenging verbergen.",
        },
      ],
    },
    faq: {
      title: "Vragen over VPN's vergelijken",
      items: [
        {
          question: "Welke VPN is het beste voor iedereen?",
          answer:
            "Geen enkele. De nuttige keuze hangt af van je apparaten, netwerk, privacywensen en actuele voorwaarden.",
        },
        {
          question: "Waarom staan hier geen cijfers?",
          answer:
            "Eén cijfer verbergt verschillende behoeften en kan preciezer lijken dan het bewijs. Daarom tonen we het ondersteunde verschil en de belangrijkste grens.",
        },
        {
          question: "Kan ik een oude snelheidstest vertrouwen?",
          answer:
            "Die kan tonen wat op die datum in die opstelling gebeurde. De test belooft niet dezelfde uitslag op jouw route van vandaag.",
        },
        {
          question: "Wat controleer ik vóór aankoop?",
          answer:
            "Controleer het bedrag van vandaag, de verlengprijs, terugbetalingsregels, apparaatondersteuning en de functie die je echt nodig hebt.",
        },
      ],
    },
    next: {
      eyebrow: "Wil je anders beginnen?",
      title: "Kies de volgende nuttige stap",
      items: [
        {
          title: "Lees een providerreview",
          body: "Bekijk één VPN uitgebreider, inclusief het belangrijkste gat in het bewijs.",
          href: "/reviews",
          action: "Open VPN-reviews",
        },
        {
          title: "Maak een shortlist",
          body: "Beantwoord een paar simpele vragen voordat je merknamen vergelijkt.",
          href: "/quiz",
          action: "Gebruik de VPN-keuzehulp",
        },
        {
          title: "Leer hoe een VPN werkt",
          body: "Bekijk wat een VPN verandert en welke gegevens niet verdwijnen.",
          href: "/guides/what-is-vpn",
          action: "Lees de startgids",
        },
      ],
    },
    entries: nlEntries,
  },
};

export function isComparisonDirectoryLocale(
  locale: string,
): locale is ComparisonDirectoryLocale {
  return locale === "en" || locale === "nl";
}

export function getComparisonDirectoryCopy(
  locale: string,
): ComparisonDirectoryCopy {
  const selectedLocale = isComparisonDirectoryLocale(locale) ? locale : "en";
  const base = copies[selectedLocale];
  const entries = base.entries.flatMap((entry): ComparisonDirectoryEntry[] => {
    const admittedLocales =
      getIndexableLocalesForPath(entry.href)?.filter(
        (candidate): candidate is ComparisonDirectoryLocale =>
          candidate === "en" || candidate === "nl",
      ) ?? [];
    const routeLocale = admittedLocales.includes(selectedLocale)
      ? selectedLocale
      : admittedLocales.includes("en")
        ? "en"
        : null;

    if (!routeLocale) return [];

    return [{ ...entry, languages: [...admittedLocales] }];
  });
  const dutchCount = entries.filter((entry) =>
    entry.languages.includes("nl"),
  ).length;

  return {
    ...base,
    hero: {
      ...base.hero,
      boardRows: [
        { ...base.hero.boardRows[0], value: String(entries.length) },
        { ...base.hero.boardRows[1], value: String(dutchCount) },
        base.hero.boardRows[2],
        { ...base.hero.boardRows[3], value: String(entries.length) },
      ],
    },
    entries,
  };
}
