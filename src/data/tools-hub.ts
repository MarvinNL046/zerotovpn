export type ToolsHubLocale = "en" | "nl";
export type ToolCategory = "connection" | "privacy" | "performance" | "choice";
export type ToolMode = "automatic" | "interactive" | "guided" | "advisor";
export type ToolMaturity = "available" | "limited";
export type ToolIcon = "globe" | "network" | "gauge" | "compass";

export type ToolCatalogItem = {
  id: "ip" | "dns" | "speed" | "finder";
  href: string;
  locales: ToolsHubLocale[];
  category: ToolCategory;
  mode: ToolMode;
  maturity: ToolMaturity;
  icon: ToolIcon;
  commercial: boolean;
  thirdParties: string[];
  title: string;
  eyebrow: string;
  summary: string;
  measures: string;
  limit: string;
  privacy: string;
  duration: string;
  status: string;
  action: string;
  searchTerms: string[];
};

export type ToolsHubCopy = {
  locale: ToolsHubLocale;
  metadata: { title: string; description: string; ogAlt: string };
  breadcrumb: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    cues: string[];
    visualTitle: string;
    visualRows: Array<{ label: string; value: string; state: string }>;
    visualNote: string;
  };
  directory: {
    eyebrow: string;
    title: string;
    intro: string;
    searchLabel: string;
    searchPlaceholder: string;
    resultSingular: string;
    resultPlural: string;
    noResultsTitle: string;
    noResultsBody: string;
    clear: string;
    filters: Array<{ id: "all" | ToolCategory; label: string }>;
  };
  tools: ToolCatalogItem[];
  chooser: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      body: string;
      href: string;
      action: string;
      icon: ToolIcon;
    }>;
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    note: string;
  };
  boundary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string; state: string }>;
    warning: string;
    methodLink: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    headers: [string, string, string];
  };
  learning: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  newsletter: { eyebrow: string; title: string; body: string };
};

const enTools: ToolCatalogItem[] = [
  {
    id: "ip",
    href: "/tools/what-is-my-ip",
    locales: ["en", "nl"],
    category: "connection",
    mode: "automatic",
    maturity: "available",
    icon: "globe",
    commercial: false,
    thirdParties: [],
    eyebrow: "Public route",
    title: "What is my IP?",
    summary:
      "See the public IP this site receives, the address type and an approximate location when available.",
    measures: "The public IPv4 or IPv6 route received by ZeroToVPN hosting.",
    limit: "It does not detect a VPN, proxy, DNS leak or exact location.",
    privacy:
      "The response is not cached or saved by the feature. Normal hosting logs may still apply.",
    duration: "Opens immediately",
    status: "Available now",
    action: "Open IP checker",
    searchTerms: ["ip", "ipv4", "ipv6", "address", "location", "route"],
  },
  {
    id: "dns",
    href: "/tools/dns-leak-test",
    locales: ["en", "nl"],
    category: "privacy",
    mode: "guided",
    maturity: "limited",
    icon: "network",
    commercial: false,
    thirdParties: ["BrowserLeaks (only after you choose its external link)"],
    eyebrow: "DNS route guide",
    title: "Check your DNS route",
    summary:
      "Learn how to compare DNS results before and after connecting a VPN, starting with a public-route baseline.",
    measures:
      "The built-in step captures only this browser's public web route.",
    limit:
      "ZeroToVPN does not yet measure the answering DNS server, so it gives no leak verdict.",
    privacy:
      "The route step uses ZeroToVPN hosting. An optional resolver check opens a clearly labelled third party.",
    duration: "About 3 minutes",
    status: "Guide · resolver not measured",
    action: "Open DNS guide",
    searchTerms: ["dns", "resolver", "leak", "route", "privacy"],
  },
  {
    id: "speed",
    href: "/speed-test",
    locales: ["en", "nl"],
    category: "performance",
    mode: "interactive",
    maturity: "available",
    icon: "gauge",
    commercial: false,
    thirdParties: ["Cloudflare"],
    eyebrow: "Browser benchmark",
    title: "Internet speed test",
    summary:
      "Measure download, upload, response time and response-time variation on this browser's route to Cloudflare.",
    measures: "One browser-to-Cloudflare route at the time you start the test.",
    limit:
      "One run does not rank a VPN or predict every website, game or server.",
    privacy:
      "Cloudflare receives the test traffic. Up to ten completed results can stay in this browser.",
    duration: "About 30 seconds",
    status: "Available now",
    action: "Start speed test",
    searchTerms: [
      "speed",
      "download",
      "upload",
      "ping",
      "latency",
      "cloudflare",
    ],
  },
  {
    id: "finder",
    href: "/quiz",
    locales: ["en", "nl"],
    category: "choice",
    mode: "advisor",
    maturity: "available",
    icon: "compass",
    commercial: true,
    thirdParties: [],
    eyebrow: "Guided shortlist",
    title: "VPN finder",
    summary:
      "Answer five short questions and see up to three options supported by the current provider records.",
    measures:
      "Your stated devices, connection limit, main use and must-have feature.",
    limit:
      "A shortlist is not a guarantee. Missing evidence can remove a provider from the result.",
    privacy:
      "Answers stay in the current page session. Provider links are labelled when a commission may apply.",
    duration: "About 1 minute",
    status: "Available now",
    action: "Start VPN finder",
    searchTerms: ["finder", "quiz", "choose", "compare", "devices", "vpn"],
  },
];

const nlTools: ToolCatalogItem[] = enTools.map((tool) => {
  const localized: Record<ToolCatalogItem["id"], Partial<ToolCatalogItem>> = {
    ip: {
      eyebrow: "Openbare route",
      title: "Wat is mijn IP?",
      summary:
        "Bekijk welk openbaar IP deze site ontvangt, het adrestype en een geschatte locatie als die beschikbaar is.",
      measures: "De openbare IPv4- of IPv6-route die ZeroToVPN ontvangt.",
      limit: "Dit herkent geen VPN, proxy, DNS-lek of exacte locatie.",
      privacy:
        "De functie bewaart of cachet de uitslag niet. Gewone hostinglogs kunnen wel bestaan.",
      duration: "Opent direct",
      status: "Nu beschikbaar",
      action: "Open IP-check",
      searchTerms: ["ip", "ipv4", "ipv6", "adres", "locatie", "route"],
    },
    dns: {
      eyebrow: "Gids voor je DNS-route",
      title: "Controleer je DNS-route",
      summary:
        "Leer hoe je DNS-resultaten vóór en na het verbinden van een VPN vergelijkt, met een openbare route als startpunt.",
      measures:
        "De ingebouwde stap legt alleen de openbare webroute van deze browser vast.",
      limit:
        "ZeroToVPN meet de antwoordende DNS-server nog niet en geeft daarom geen lekoordeel.",
      privacy:
        "De routestap gebruikt ZeroToVPN-hosting. Een optionele resolvercheck opent een duidelijk genoemde externe site.",
      duration: "Ongeveer 3 minuten",
      status: "Gids · resolver niet gemeten",
      action: "Open DNS-gids",
      searchTerms: ["dns", "resolver", "lek", "route", "privacy"],
    },
    speed: {
      eyebrow: "Browsertest",
      title: "Internetsnelheidstest",
      summary:
        "Meet download, upload, reactietijd en verschil tussen reactietijden op de route van deze browser naar Cloudflare.",
      measures:
        "Eén route van deze browser naar Cloudflare op het moment van de test.",
      limit:
        "Eén meting rangschikt geen VPN en voorspelt niet elke website, game of server.",
      privacy:
        "Cloudflare ontvangt het testverkeer. Maximaal tien afgeronde uitslagen kunnen in deze browser blijven.",
      duration: "Ongeveer 30 seconden",
      status: "Nu beschikbaar",
      action: "Start snelheidstest",
      searchTerms: [
        "snelheid",
        "download",
        "upload",
        "ping",
        "reactietijd",
        "cloudflare",
      ],
    },
    finder: {
      eyebrow: "Begeleide shortlist",
      title: "VPN-keuzehulp",
      summary:
        "Beantwoord vijf korte vragen en bekijk maximaal drie opties die passen bij de huidige providergegevens.",
      measures:
        "Je apparaten, verbindingslimiet, belangrijkste gebruik en noodzakelijke functie.",
      limit:
        "Een shortlist is geen garantie. Ontbrekend bewijs kan een aanbieder uitsluiten.",
      privacy:
        "Antwoorden blijven in de huidige paginasessie. Providerlinks krijgen een label als commissie mogelijk is.",
      duration: "Ongeveer 1 minuut",
      status: "Nu beschikbaar",
      action: "Start VPN-keuzehulp",
      searchTerms: [
        "keuzehulp",
        "quiz",
        "kiezen",
        "vergelijken",
        "apparaten",
        "vpn",
      ],
    },
  };

  return { ...tool, ...localized[tool.id] };
});

const en: ToolsHubCopy = {
  locale: "en",
  metadata: {
    title: "Free Online Privacy Tools: IP, DNS & Speed",
    description:
      "Use three free browser tools to check your public IP, review your DNS route and measure connection speed. No account needed. Clear limits, no fake verdicts.",
    ogAlt:
      "ZeroToVPN privacy tools dashboard with a masked example IP, DNS route and browser speed bars",
  },
  breadcrumb: "Tools",
  hero: {
    eyebrow: "ZeroToVPN network lab",
    title: "Free VPN and privacy tools that explain what they check",
    intro:
      "Check the public IP this site receives, understand your DNS route, measure browser speed or build a VPN shortlist. Every tool explains what its result can and cannot prove.",
    directAnswer:
      "Start with the question you want to answer. A changed IP does not prove every VPN feature works, and one speed run cannot rank a provider.",
    cues: ["No account", "Scope shown first", "No fake protection score"],
    visualTitle: "Connection toolbox",
    visualRows: [
      {
        label: "Public IP",
        value: "198.51.100.•••",
        state: "Example · masked",
      },
      {
        label: "DNS resolver",
        value: "Not measured here",
        state: "Guided check",
      },
      { label: "Speed", value: "— Mbps", state: "Starts on request" },
    ],
    visualNote:
      "Example values only. No personal route is loaded in this overview.",
  },
  directory: {
    eyebrow: "Tool directory",
    title: "Choose one job at a time",
    intro:
      "Search by question or filter by topic. The cards show the output, data use and most important limit before you open anything.",
    searchLabel: "Search tools",
    searchPlaceholder: "Try IP, DNS, speed or choosing a VPN",
    resultSingular: "tool shown",
    resultPlural: "tools shown",
    noResultsTitle: "No tool matches that search",
    noResultsBody: "Try a shorter word or show all tools.",
    clear: "Show all tools",
    filters: [
      { id: "all", label: "All" },
      { id: "connection", label: "Connection" },
      { id: "privacy", label: "Privacy" },
      { id: "performance", label: "Speed" },
      { id: "choice", label: "Choosing a VPN" },
    ],
  },
  tools: enTools,
  chooser: {
    eyebrow: "Not sure where to start?",
    title: "Pick the question that sounds like yours",
    intro: "Each route below opens the smallest tool that can help.",
    items: [
      {
        title: "Did my public route change?",
        body: "Compare the public IP before and after you connect. Treat the change as one signal, not a complete VPN test.",
        href: "/tools/what-is-my-ip",
        action: "Check the public route",
        icon: "globe",
      },
      {
        title: "Why does the connection feel slower?",
        body: "Save a VPN-off baseline, change one thing and repeat the same browser-to-Cloudflare test.",
        href: "/speed-test",
        action: "Compare speed runs",
        icon: "gauge",
      },
      {
        title: "Which VPN could fit my devices?",
        body: "Answer five questions. The finder shows a shortlist only when the current records support it.",
        href: "/quiz",
        action: "Open the VPN finder",
        icon: "compass",
      },
    ],
  },
  workflow: {
    eyebrow: "A fair before-and-after check",
    title: "Change one thing, then repeat",
    intro:
      "A simple sequence makes two results easier to compare. Keep the device, network and tool the same.",
    steps: [
      {
        title: "Record the baseline",
        body: "Run the relevant check with the VPN off.",
      },
      {
        title: "Connect one server",
        body: "Keep the same browser, device and network.",
      },
      {
        title: "Repeat the same check",
        body: "Do not change several settings at once.",
      },
      {
        title: "Read the stated limit",
        body: "A browser result never covers every app or route.",
      },
    ],
    note: "If the conditions changed, label the comparison uncertain instead of forcing a winner.",
  },
  boundary: {
    eyebrow: "Evidence boundary",
    title: "What these tools know—and what stays unknown",
    intro:
      "A useful result names its source and its limit. These three checks answer different questions.",
    items: [
      {
        title: "Public web route",
        body: "The IP checker reads the route received by this site and may receive a coarse hosting location.",
        state: "Measured",
      },
      {
        title: "DNS resolver",
        body: "The DNS page explains a comparison, but ZeroToVPN does not yet run its own resolver probe.",
        state: "Not measured here",
      },
      {
        title: "Browser performance",
        body: "The speed test measures one route from this browser to Cloudflare at one moment.",
        state: "Measured on request",
      },
    ],
    warning:
      "No browser tool can prove full anonymity, a provider's logging policy or protection inside every app.",
    methodLink: "Read our testing method",
  },
  privacy: {
    eyebrow: "Data and privacy",
    title: "Know where each request goes",
    intro:
      "The detail page explains data use before a test starts. This overview loads no personal route or test result.",
    headers: ["Tool", "Request or storage", "Important limit"],
  },
  learning: {
    eyebrow: "Learn before you test",
    title: "Short guides for the next question",
    items: [
      {
        title: "How VPN speed tests work",
        body: "Learn why the same device, route and time matter in a comparison.",
        href: "/guides/vpn-speed-guide",
        action: "Read the speed guide",
      },
      {
        title: "What a VPN changes",
        body: "Understand the tunnel, public IP and limits of a VPN in plain language.",
        href: "/guides/what-is-vpn",
        action: "Read the VPN guide",
      },
      {
        title: "How ZeroToVPN checks claims",
        body: "See how provider statements, external reviews and our own tests stay separate.",
        href: "/methodology",
        action: "Open the methodology",
      },
    ],
  },
  faqTitle: "Questions about the free tools",
  faqs: [
    {
      question: "Are the ZeroToVPN tools free?",
      answer:
        "Yes. The tools on this page need no paid account. The speed test uses network data, so check your mobile or metered-data limit before you start.",
    },
    {
      question: "Can these tools tell whether my VPN works?",
      answer:
        "They can show separate signals such as a changed public IP or a speed difference. They cannot prove every VPN feature, app and route works correctly.",
    },
    {
      question: "Why does the DNS guide not show pass or fail?",
      answer:
        "ZeroToVPN does not yet run the authoritative DNS probe needed to see the answering resolver. The page therefore explains the comparison without inventing a result.",
    },
    {
      question: "Where are tool results saved?",
      answer:
        "The IP route response is not stored by the feature. The speed test can keep up to ten completed runs in your browser until you clear them. Normal hosting and third-party technical logs may still apply.",
    },
    {
      question: "Which check should I run first?",
      answer:
        "Start with the exact question you have. Use the IP checker for the public route, the speed test for a before-and-after benchmark and the DNS guide for resolver comparison steps.",
    },
  ],
  newsletter: {
    eyebrow: "The privacy brief",
    title: "Get useful updates about browser and VPN checks",
    body: "One clear update every two weeks. No countdowns or fake alerts.",
  },
};

const nl: ToolsHubCopy = {
  ...en,
  locale: "nl",
  metadata: {
    title: "Gratis privacytools: IP, DNS en snelheid",
    description:
      "Gebruik drie gratis browsertools om je openbare IP te bekijken, je DNS-route te controleren en je snelheid te meten. Geen account en geen valse uitslagen.",
    ogAlt:
      "ZeroToVPN-dashboard met privacytools, een gemaskeerd voorbeeld-IP, DNS-route en browsersnelheid",
  },
  breadcrumb: "Tools",
  hero: {
    eyebrow: "ZeroToVPN-netwerklab",
    title: "Gratis VPN- en privacytools die uitleggen wat ze meten",
    intro:
      "Bekijk welk openbaar IP deze site ontvangt, begrijp je DNS-route, meet je browsersnelheid of maak een VPN-shortlist. Elke tool legt uit wat de uitslag wel en niet bewijst.",
    directAnswer:
      "Begin met de vraag die je wilt beantwoorden. Een ander IP bewijst niet dat elke VPN-functie werkt en één snelheidsmeting rangschikt geen aanbieder.",
    cues: ["Geen account", "Eerst de meetgrens", "Geen nep-beschermingsscore"],
    visualTitle: "Jouw gereedschapskist",
    visualRows: [
      {
        label: "Openbaar IP",
        value: "198.51.100.•••",
        state: "Voorbeeld · gemaskeerd",
      },
      {
        label: "DNS-resolver",
        value: "Hier niet gemeten",
        state: "Begeleide controle",
      },
      { label: "Snelheid", value: "— Mbps", state: "Start alleen na klik" },
    ],
    visualNote:
      "Alleen voorbeeldwaarden. Dit overzicht laadt geen persoonlijke route.",
  },
  directory: {
    eyebrow: "Overzicht van tools",
    title: "Kies steeds één taak",
    intro:
      "Zoek op je vraag of filter per onderwerp. Elke kaart toont vooraf de uitslag, het datagebruik en de belangrijkste beperking.",
    searchLabel: "Zoek tools",
    searchPlaceholder: "Probeer IP, DNS, snelheid of VPN kiezen",
    resultSingular: "tool getoond",
    resultPlural: "tools getoond",
    noResultsTitle: "Geen tool past bij deze zoekopdracht",
    noResultsBody: "Probeer een korter woord of toon alle tools.",
    clear: "Toon alle tools",
    filters: [
      { id: "all", label: "Alles" },
      { id: "connection", label: "Verbinding" },
      { id: "privacy", label: "Privacy" },
      { id: "performance", label: "Snelheid" },
      { id: "choice", label: "VPN kiezen" },
    ],
  },
  tools: nlTools,
  chooser: {
    eyebrow: "Weet je niet waar je begint?",
    title: "Kies de vraag die op jouw situatie lijkt",
    intro: "Elke route opent de kleinste tool die kan helpen.",
    items: [
      {
        title: "Is mijn openbare route veranderd?",
        body: "Vergelijk het openbare IP vóór en na het verbinden. Zie de verandering als één signaal, niet als volledige VPN-test.",
        href: "/tools/what-is-my-ip",
        action: "Controleer de openbare route",
        icon: "globe",
      },
      {
        title: "Waarom voelt de verbinding trager?",
        body: "Bewaar een startmeting met VPN uit, verander één ding en herhaal dezelfde test naar Cloudflare.",
        href: "/speed-test",
        action: "Vergelijk snelheidsmetingen",
        icon: "gauge",
      },
      {
        title: "Welke VPN past bij mijn apparaten?",
        body: "Beantwoord vijf vragen. De keuzehulp toont alleen een shortlist als de huidige gegevens dit ondersteunen.",
        href: "/quiz",
        action: "Open de VPN-keuzehulp",
        icon: "compass",
      },
    ],
  },
  workflow: {
    eyebrow: "Een eerlijke voor-en-na-controle",
    title: "Verander één ding en herhaal",
    intro:
      "Met een simpele volgorde kun je twee uitslagen beter vergelijken. Houd apparaat, netwerk en tool gelijk.",
    steps: [
      {
        title: "Bewaar de startmeting",
        body: "Doe de passende controle met de VPN uit.",
      },
      {
        title: "Verbind één server",
        body: "Houd dezelfde browser, hetzelfde apparaat en netwerk.",
      },
      {
        title: "Herhaal dezelfde controle",
        body: "Verander niet meerdere instellingen tegelijk.",
      },
      {
        title: "Lees de beperking",
        body: "Een browseruitslag dekt nooit elke app of route.",
      },
    ],
    note: "Veranderden de omstandigheden? Noem de vergelijking dan onzeker in plaats van een winnaar af te dwingen.",
  },
  boundary: {
    eyebrow: "Grens van het bewijs",
    title: "Wat deze tools weten en wat onbekend blijft",
    intro:
      "Een nuttige uitslag noemt de bron en de beperking. Deze drie controles beantwoorden andere vragen.",
    items: [
      {
        title: "Openbare webroute",
        body: "De IP-check leest de route die deze site ontvangt en kan een grove locatie van de hosting krijgen.",
        state: "Gemeten",
      },
      {
        title: "DNS-resolver",
        body: "De DNS-pagina legt de vergelijking uit, maar ZeroToVPN voert nog geen eigen resolvermeting uit.",
        state: "Hier niet gemeten",
      },
      {
        title: "Browserprestaties",
        body: "De snelheidstest meet één route van deze browser naar Cloudflare op één moment.",
        state: "Gemeten na je start",
      },
    ],
    warning:
      "Geen browsertool bewijst volledige anonimiteit, het logbeleid van een aanbieder of bescherming in elke app.",
    methodLink: "Lees onze testmethode",
  },
  privacy: {
    eyebrow: "Data en privacy",
    title: "Weet waar elk verzoek naartoe gaat",
    intro:
      "De detailpagina legt het datagebruik uit voordat een test start. Dit overzicht laadt geen persoonlijke route of testuitslag.",
    headers: ["Tool", "Verzoek of opslag", "Belangrijkste beperking"],
  },
  learning: {
    eyebrow: "Leer voordat je test",
    title: "Korte uitleg voor je volgende vraag",
    items: [
      {
        title: "Zo werken VPN-snelheidstests",
        body: "Lees waarom hetzelfde apparaat, dezelfde route en hetzelfde tijdstip belangrijk zijn.",
        href: "/guides/vpn-speed-guide",
        action: "Lees de snelheidsgids",
      },
      {
        title: "Wat verandert een VPN?",
        body: "Begrijp de tunnel, het openbare IP en de beperkingen van een VPN in gewone taal.",
        href: "/guides/what-is-vpn",
        action: "Lees de VPN-gids",
      },
      {
        title: "Zo controleert ZeroToVPN claims",
        body: "Bekijk hoe claims van aanbieders, externe controles en onze eigen tests gescheiden blijven.",
        href: "/methodology",
        action: "Open de methodologie",
      },
    ],
  },
  faqTitle: "Vragen over de gratis tools",
  faqs: [
    {
      question: "Zijn de tools van ZeroToVPN gratis?",
      answer:
        "Ja. Voor de tools op deze pagina heb je geen betaald account nodig. De snelheidstest gebruikt netwerkdata. Controleer daarom vooraf je mobiele databundel of datalimiet.",
    },
    {
      question: "Kunnen deze tools zien of mijn VPN werkt?",
      answer:
        "Ze kunnen losse signalen tonen, zoals een ander openbaar IP of een snelheidsverschil. Ze bewijzen niet dat elke VPN-functie, app en route goed werkt.",
    },
    {
      question: "Waarom geeft de DNS-gids geen goed- of foutmelding?",
      answer:
        "ZeroToVPN voert nog niet de speciale DNS-meting uit die nodig is om de antwoordende resolver te zien. De pagina legt daarom de vergelijking uit zonder een uitslag te verzinnen.",
    },
    {
      question: "Waar worden uitslagen bewaard?",
      answer:
        "De IP-functie bewaart de route-uitslag niet. De snelheidstest kan maximaal tien afgeronde metingen in je browser bewaren tot je ze wist. Gewone technische logs van hosting en externe diensten kunnen wel bestaan.",
    },
    {
      question: "Welke controle kan ik het beste eerst doen?",
      answer:
        "Begin met je precieze vraag. Gebruik de IP-check voor de openbare route, de snelheidstest voor een voor-en-na-meting en de DNS-gids voor de stappen van een resolververgelijking.",
    },
  ],
  newsletter: {
    eyebrow: "De privacybrief",
    title: "Ontvang nuttige updates over browser- en VPN-controles",
    body: "Eens per twee weken één duidelijke update. Geen aftelklokken of nepmeldingen.",
  },
};

export function getToolsHubCopy(locale: string): ToolsHubCopy {
  return locale === "nl" ? nl : en;
}

export function isToolsHubLocale(locale: string): locale is ToolsHubLocale {
  return locale === "en" || locale === "nl";
}
