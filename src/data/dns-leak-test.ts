export const DNS_ROUTE_CHECK_VERSION = "dns-route-check-2026-08-16-v1";
export const DNS_LEAK_PAGE_REVIEWED_AT = "2026-08-16";

export type DnsLeakLocale = "en" | "nl";

type DnsStatePreview = {
  id: "idle" | "running" | "observed" | "error";
  label: string;
  body: string;
};

type DnsInterpretationRow = {
  signal: string;
  meaning: string;
  limitation: string;
  tone: "info" | "good" | "warning";
};

export type DnsFixTab = {
  id: "windows" | "macos" | "android" | "ios";
  label: string;
  steps: string[];
};

export type DnsLeakCopy = {
  locale: DnsLeakLocale;
  metadata: { title: string; description: string; ogAlt: string };
  breadcrumb: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    boundaryTitle: string;
    boundaryBody: string;
    cues: string[];
    reviewed: string;
  };
  navigation: Array<{ href: string; label: string }>;
  tool: {
    eyebrow: string;
    title: string;
    intro: string;
    idleTitle: string;
    idleBody: string;
    start: string;
    runningTitle: string;
    runningBody: string;
    phases: string[];
    observedTitle: string;
    observedBody: string;
    errorTitle: string;
    errorBody: string;
    retry: string;
    runAgain: string;
    openResolverTest: string;
    externalNote: string;
    labels: {
      publicIp: string;
      approximateRegion: string;
      network: string;
      vpnSignal: string;
      dnsResolver: string;
      storage: string;
      notMeasured: string;
      unsupported: string;
      notStored: string;
      unknown: string;
    };
    route: {
      title: string;
      device: string;
      publicRoute: string;
      resolver: string;
      destination: string;
      measured: string;
      notMeasured: string;
    };
    statesTitle: string;
    statesIntro: string;
    states: DnsStatePreview[];
  };
  interpret: {
    eyebrow: string;
    title: string;
    intro: string;
    headers: [string, string, string];
    rows: DnsInterpretationRow[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  deviceFix: {
    title: string;
    intro: string;
    tabsHint: string;
    tabs: DnsFixTab[];
    sourceNote: string;
  };
  related: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  providers: {
    eyebrow: string;
    title: string;
    intro: string;
    disclosure: string;
    disclosureLink: string;
    sourceLabel: string;
    documentation: string;
    review: string;
    plans: string;
  };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  sources: {
    eyebrow: string;
    title: string;
    intro: string;
    open: string;
  };
  newsletter: { eyebrow: string; title: string; body: string };
};

const sharedNavigationEn = [
  { href: "#check", label: "Route check" },
  { href: "#interpret", label: "Read results" },
  { href: "#fix", label: "Fix steps" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Sources" },
];

const sharedNavigationNl = [
  { href: "#check", label: "Routecheck" },
  { href: "#interpret", label: "Uitslag lezen" },
  { href: "#fix", label: "Oplossen" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Bronnen" },
];

const en: DnsLeakCopy = {
  locale: "en",
  metadata: {
    title: "DNS Leak Test: Check Your VPN DNS Route | ZeroToVPN",
    description:
      "Run a DNS leak test, compare your normal and VPN DNS routes, and learn what each resolver result can—and cannot—show about your connection and privacy.",
    ogAlt:
      "ZeroToVPN DNS leak test guide with a browser route check and resolver comparison",
  },
  breadcrumb: "DNS leak test",
  hero: {
    eyebrow: "Privacy diagnostic",
    title: "DNS leak test: check your route without false promises",
    subtitle:
      "Start with a browser route check, then compare real DNS resolver results before and after connecting your VPN. We show exactly what is measured—and what is not.",
    boundaryTitle: "Important limit",
    boundaryBody:
      "This page can read your public web route, but this version cannot see which DNS resolver answered your request. It therefore never labels your VPN leak-free or leaking.",
    cues: ["No signup", "IP masked on screen", "Hosting may keep logs"],
    reviewed: "Reviewed 16 August 2026",
  },
  navigation: sharedNavigationEn,
  tool: {
    eyebrow: "Step 1 · browser route",
    title: "Capture your current connection route",
    intro:
      "This quick check reads the public route this browser uses. It prepares a useful baseline, but it is not the resolver test itself.",
    idleTitle: "Ready for a route check",
    idleBody:
      "The route lookup sends a normal request to ZeroToVPN hosting. The hosting may attach a coarse location and may keep technical request logs. This feature does not intentionally save the result.",
    start: "Run route check",
    runningTitle: "Checking the browser route",
    runningBody: "Keep this tab open for a moment.",
    phases: [
      "Requesting the public route",
      "Reading network context",
      "Preparing the DNS comparison steps",
    ],
    observedTitle: "Route captured—DNS resolver not measured",
    observedBody:
      "Use this as your baseline. Continue with a resolver test before and after you connect the VPN; only that comparison can reveal an unexpected DNS path.",
    errorTitle: "The route check could not finish",
    errorBody:
      "The check did not return a result. Check the connection and try again, or continue with the manual DNS comparison below.",
    retry: "Try again",
    runAgain: "Run again",
    openResolverTest: "Open independent resolver test",
    externalNote:
      "This opens BrowserLeaks in a new tab. That third party receives the network requests needed for its test; read its privacy information first.",
    labels: {
      publicIp: "Public IP",
      approximateRegion: "Approximate region",
      network: "Network owner",
      vpnSignal: "VPN detection",
      dnsResolver: "DNS resolver",
      storage: "Result storage",
      notMeasured: "Not measured",
      unsupported: "Not supported by this check",
      notStored: "No dedicated result database",
      unknown: "Unknown",
    },
    route: {
      title: "What this browser check sees",
      device: "Your browser",
      publicRoute: "Public web route",
      resolver: "DNS resolver",
      destination: "Website",
      measured: "Measured now",
      notMeasured: "Needs resolver probe",
    },
    statesTitle: "Clear result states",
    statesIntro:
      "We keep an uncertain result uncertain. A green or red DNS verdict stays disabled until a real resolver probe is available.",
    states: [
      { id: "idle", label: "Ready", body: "No request has started." },
      {
        id: "running",
        label: "Checking",
        body: "The route request is active.",
      },
      {
        id: "observed",
        label: "Route captured",
        body: "Public route only; DNS is still unknown.",
      },
      {
        id: "error",
        label: "Could not finish",
        body: "No result was returned. You can try again.",
      },
    ],
  },
  interpret: {
    eyebrow: "Step 2 · compare resolvers",
    title: "What a real resolver result can—and cannot—tell you",
    intro:
      "Run the same resolver test without the VPN and with the VPN. Look at the organisation and country together; location databases can be wrong.",
    headers: ["What you see", "What it may mean", "What it does not prove"],
    rows: [
      {
        signal: "Your ISP appears while the VPN is on",
        meaning:
          "A DNS request may be leaving by the local network instead of the route you expected.",
        limitation:
          "One browser result does not show what every app or device does.",
        tone: "warning",
      },
      {
        signal: "A VPN or data-centre resolver appears",
        meaning:
          "The tested browser request may be using a resolver near the VPN route.",
        limitation:
          "It does not prove anonymity, no logging or a working kill switch.",
        tone: "good",
      },
      {
        signal: "Several providers or countries appear",
        meaning:
          "Browser Secure DNS, custom DNS, IPv6 or another fallback route may be active.",
        limitation:
          "Mixed results are a reason to repeat the test—not an automatic leak verdict.",
        tone: "info",
      },
    ],
  },
  workflow: {
    eyebrow: "Repeatable check",
    title: "Compare the same connection in six simple steps",
    intro:
      "Change one thing at a time. That makes it easier to see which setting changed the result.",
    steps: [
      {
        title: "Save a baseline",
        body: "Disconnect the VPN and note the resolver organisations and countries.",
      },
      {
        title: "Connect the VPN",
        body: "Choose the server you normally use and wait until the app says connected.",
      },
      {
        title: "Run the same resolver test",
        body: "Use the same browser and test site. Do not change networks yet.",
      },
      {
        title: "Compare the names",
        body: "Look for your home or mobile provider in the VPN-on result.",
      },
      {
        title: "Repeat after a network switch",
        body: "Try Wi-Fi and mobile data, plus IPv4 and IPv6 when available.",
      },
      {
        title: "Save useful evidence",
        body: "Record the time, device, app version, server and unexpected resolver.",
      },
    ],
  },
  deviceFix: {
    title: "Check the settings on your device",
    intro:
      "Browser and operating-system DNS settings can choose a different route. Names and menus may change after an update.",
    tabsHint: "Swipe or scroll to reach iPhone/iPad",
    tabs: [
      {
        id: "windows",
        label: "Windows",
        steps: [
          "Open Settings → Network & internet and select the active connection.",
          "Check whether DNS is automatic or manually set.",
          "Review the DNS over HTTPS setting and whether plain-text fallback is allowed.",
          "Reconnect the VPN and repeat the same resolver test.",
        ],
      },
      {
        id: "macos",
        label: "macOS",
        steps: [
          "Open System Settings → Network and select the active service.",
          "Open Details → DNS and note any manually added servers.",
          "Do not delete a work or school setting unless you know why it is there.",
          "Reconnect the VPN and repeat the same resolver test.",
        ],
      },
      {
        id: "android",
        label: "Android",
        steps: [
          "Open Settings → Network & internet → Private DNS.",
          "Note whether it is Off, Automatic or set to a provider hostname.",
          "Check the VPN app for custom DNS or split-tunnel settings.",
          "Reconnect and test again on Wi-Fi and mobile data.",
        ],
      },
      {
        id: "ios",
        label: "iPhone/iPad",
        steps: [
          "Open Settings → VPN and confirm the expected VPN profile is active.",
          "Check whether another DNS, security or work profile is installed.",
          "Temporarily compare Wi-Fi and mobile data without removing managed profiles.",
          "Reconnect the VPN and repeat the resolver test.",
        ],
      },
    ],
    sourceNote:
      "Follow the current instructions from your operating-system and VPN provider before changing managed or work settings.",
  },
  related: {
    eyebrow: "Broader checks",
    title: "A DNS result is only one part of the route",
    items: [
      {
        title: "Check your public IP",
        body: "See the IP and approximate network context websites receive.",
        href: "/tools/what-is-my-ip",
        action: "Check IP",
      },
      {
        title: "Compare connection speed",
        body: "Measure the same connection before and after turning on a VPN.",
        href: "/speed-test",
        action: "Run speed test",
      },
      {
        title: "Find a VPN for your needs",
        body: "Use five questions and see an evidence-gated shortlist.",
        href: "/quiz",
        action: "Open VPN finder",
      },
    ],
  },
  providers: {
    eyebrow: "Provider settings",
    title: "Check the documentation before changing your VPN app",
    intro:
      "These cards link to current provider instructions. They show what each provider says—not an independent ZeroToVPN leak result.",
    disclosure:
      "We may earn a commission if you buy through a provider link. You pay no extra. Documentation links are not sponsored.",
    disclosureLink: "How we fund this site",
    sourceLabel: "Provider documentation checked 16 August 2026",
    documentation: "Open DNS instructions",
    review: "Read review",
    plans: "Check plans",
  },
  faqTitle: "DNS leak test questions",
  faqs: [
    {
      question: "What is a DNS leak?",
      answer:
        "A DNS leak means a domain lookup used a route outside the VPN path you expected. For example, your home provider may answer while the VPN is connected.",
    },
    {
      question: "Can this page tell whether I have a DNS leak?",
      answer:
        "Not by itself. The built-in check records the public browser route but cannot see the DNS resolver. Use the linked resolver test before and after connecting the VPN, then compare the organisations shown.",
    },
    {
      question: "Does a different DNS country always mean a leak?",
      answer:
        "No. Resolver and IP location databases can be imprecise, and a VPN may use infrastructure in a nearby country. Compare the organisation, network and repeated results.",
    },
    {
      question: "Can Secure DNS or DNS over HTTPS change the result?",
      answer:
        "Yes. A browser can send DNS to its chosen HTTPS resolver instead of the operating-system or VPN setting. Check the browser setting separately before deciding what happened.",
    },
    {
      question: "Does a clean DNS result prove my VPN is private?",
      answer:
        "No. It does not test provider logging, app permissions, cookies, account data, WebRTC, every device or every reconnect. It checks only the DNS route used by that test.",
    },
    {
      question: "When should I repeat the test?",
      answer:
        "Repeat it after an app or system update, a VPN-server change, switching between Wi-Fi and mobile data, changing DNS settings or waking the device from sleep.",
    },
  ],
  sources: {
    eyebrow: "Evidence ledger",
    title: "Sources and limits",
    intro:
      "Operating-system and provider behaviour changes. These sources were opened on 16 August 2026; provider pages describe their own products.",
    open: "View all sources",
  },
  newsletter: {
    eyebrow: "The Privacy Brief",
    title: "Get practical privacy checks",
    body: "One useful update every two weeks. No fake alerts, countdowns or diagnostic scare tactics.",
  },
};

const nl: DnsLeakCopy = {
  ...en,
  locale: "nl",
  metadata: {
    title: "DNS-lektest: controleer de DNS-route van je VPN | ZeroToVPN",
    description:
      "Doe een DNS-lektest, vergelijk je normale DNS-route met die van je VPN en lees wat de uitslag wel en niet zegt over je verbinding en online privacy. Start nu.",
    ogAlt:
      "ZeroToVPN DNS-lektestgids met browser-routecheck en vergelijking van DNS-servers",
  },
  breadcrumb: "DNS-lektest",
  hero: {
    eyebrow: "Privacycontrole",
    title: "DNS-lektest: controleer je route zonder valse zekerheid",
    subtitle:
      "Begin met een routecheck in je browser. Vergelijk daarna echte DNS-serverresultaten vóór en na het verbinden van je VPN. We laten precies zien wat wel en niet is gemeten.",
    boundaryTitle: "Belangrijke grens",
    boundaryBody:
      "Deze pagina kan je openbare webroute lezen. Deze versie kan nog niet zien welke DNS-server antwoordde. Daarom noemen we je VPN nooit zomaar lekvrij of lek.",
    cues: ["Geen account", "IP gemaskeerd", "Hosting kan logs bewaren"],
    reviewed: "Beoordeeld op 16 augustus 2026",
  },
  navigation: sharedNavigationNl,
  tool: {
    eyebrow: "Stap 1 · browserroute",
    title: "Leg je huidige verbindingsroute vast",
    intro:
      "Deze korte check leest de openbare route van deze browser. Dat is een nuttige startmeting, maar nog niet de DNS-servermeting zelf.",
    idleTitle: "Klaar voor de routecheck",
    idleBody:
      "De routecheck stuurt een gewoon verzoek naar de hosting van ZeroToVPN. De hosting kan een grove locatie meesturen en technische verzoeklogs bewaren. Deze functie slaat de uitslag niet bewust op.",
    start: "Start routecheck",
    runningTitle: "Browserroute controleren",
    runningBody: "Laat dit tabblad heel even open.",
    phases: [
      "Openbare route opvragen",
      "Netwerkinformatie lezen",
      "Stappen voor de DNS-vergelijking klaarzetten",
    ],
    observedTitle: "Route vastgelegd—DNS-server niet gemeten",
    observedBody:
      "Gebruik dit als startmeting. Doe daarna een DNS-servermeting vóór en na het verbinden van je VPN. Alleen die vergelijking kan een onverwachte DNS-route laten zien.",
    errorTitle: "De routecheck kon niet worden afgerond",
    errorBody:
      "De check gaf geen uitslag. Controleer je verbinding en probeer het opnieuw, of ga verder met de handmatige DNS-vergelijking hieronder.",
    retry: "Probeer opnieuw",
    runAgain: "Opnieuw uitvoeren",
    openResolverTest: "Open onafhankelijke DNS-servermeting",
    externalNote:
      "Dit opent BrowserLeaks in een nieuw tabblad. Die andere website ontvangt de netwerkverzoeken die voor de test nodig zijn. Lees eerst het privacybeleid.",
    labels: {
      publicIp: "Openbaar IP-adres",
      approximateRegion: "Geschatte regio",
      network: "Netwerkeigenaar",
      vpnSignal: "VPN-herkenning",
      dnsResolver: "DNS-server",
      storage: "Opslag van uitslag",
      notMeasured: "Niet gemeten",
      unsupported: "Niet ondersteund door deze check",
      notStored: "Geen aparte resultatendatabase",
      unknown: "Onbekend",
    },
    route: {
      title: "Wat deze browsercheck ziet",
      device: "Jouw browser",
      publicRoute: "Openbare webroute",
      resolver: "DNS-server",
      destination: "Website",
      measured: "Nu gemeten",
      notMeasured: "DNS-meting nodig",
    },
    statesTitle: "Duidelijke statussen",
    statesIntro:
      "Een onzekere uitkomst blijft onzeker. We tonen pas een groene of rode DNS-uitslag als een echte DNS-servermeting beschikbaar is.",
    states: [
      { id: "idle", label: "Klaar", body: "Er is nog geen verzoek gestart." },
      {
        id: "running",
        label: "Bezig",
        body: "Het routeverzoek wordt uitgevoerd.",
      },
      {
        id: "observed",
        label: "Route vastgelegd",
        body: "Alleen de webroute; DNS is nog onbekend.",
      },
      {
        id: "error",
        label: "Niet gelukt",
        body: "Er kwam geen uitslag terug. Je kunt opnieuw proberen.",
      },
    ],
  },
  interpret: {
    eyebrow: "Stap 2 · DNS-servers vergelijken",
    title: "Wat een echte DNS-uitslag wel en niet vertelt",
    intro:
      "Doe dezelfde DNS-servermeting zonder VPN en met VPN. Bekijk de organisatie en het land samen; locatiedatabases kunnen fouten bevatten.",
    headers: ["Wat je ziet", "Wat dit kan betekenen", "Wat dit niet bewijst"],
    rows: [
      {
        signal: "Je internetprovider verschijnt terwijl de VPN aanstaat",
        meaning:
          "Een DNS-verzoek gaat mogelijk via je lokale netwerk in plaats van de verwachte route.",
        limitation:
          "Eén browsermeting laat niet zien wat elke app of elk apparaat doet.",
        tone: "warning",
      },
      {
        signal: "Een VPN- of datacenter-DNS-server verschijnt",
        meaning:
          "Het geteste browserverzoek gaat mogelijk via een DNS-server bij de VPN-route.",
        limitation:
          "Dit bewijst geen anonimiteit, geen no-logs-beleid en geen werkende kill switch.",
        tone: "good",
      },
      {
        signal: "Meerdere aanbieders of landen verschijnen",
        meaning:
          "Beveiligde DNS in je browser, handmatige DNS, IPv6 of een andere reserveroute kan actief zijn.",
        limitation:
          "Gemengde resultaten zijn een reden om opnieuw te testen, niet direct bewijs van een lek.",
        tone: "info",
      },
    ],
  },
  workflow: {
    eyebrow: "Herhaalbare controle",
    title: "Vergelijk dezelfde verbinding in zes eenvoudige stappen",
    intro:
      "Verander steeds één ding. Zo zie je beter welke instelling de uitkomst veranderde.",
    steps: [
      {
        title: "Bewaar een startmeting",
        body: "Verbreek de VPN en noteer de organisaties en landen bij de DNS-servers.",
      },
      {
        title: "Verbind de VPN",
        body: "Kies de server die je normaal gebruikt en wacht tot de app verbonden zegt.",
      },
      {
        title: "Doe dezelfde DNS-meting",
        body: "Gebruik dezelfde browser en testsite. Wissel nog niet van netwerk.",
      },
      {
        title: "Vergelijk de namen",
        body: "Zoek je thuis- of mobiele provider in de uitslag met VPN.",
      },
      {
        title: "Herhaal na een netwerkwissel",
        body: "Probeer wifi en mobiel internet, plus IPv4 en IPv6 als die beschikbaar zijn.",
      },
      {
        title: "Bewaar nuttige informatie",
        body: "Noteer tijd, apparaat, appversie, VPN-server en onverwachte DNS-server.",
      },
    ],
  },
  deviceFix: {
    title: "Controleer de instellingen op je apparaat",
    intro:
      "Je browser en besturingssysteem kunnen een andere DNS-route kiezen. Namen en menu's kunnen na een update veranderen.",
    tabsHint: "Veeg of scrol door naar iPhone/iPad",
    tabs: [
      {
        id: "windows",
        label: "Windows",
        steps: [
          "Open Instellingen → Netwerk en internet en kies de actieve verbinding.",
          "Controleer of DNS automatisch of handmatig is ingesteld.",
          "Bekijk de instelling voor DNS via HTTPS en of onversleutelde terugval is toegestaan.",
          "Verbind de VPN opnieuw en doe dezelfde DNS-servermeting.",
        ],
      },
      {
        id: "macos",
        label: "macOS",
        steps: [
          "Open Systeeminstellingen → Netwerk en kies de actieve verbinding.",
          "Open Details → DNS en noteer handmatig toegevoegde servers.",
          "Verwijder geen werk- of schoolinstelling als je niet weet waarom die er staat.",
          "Verbind de VPN opnieuw en doe dezelfde DNS-servermeting.",
        ],
      },
      {
        id: "android",
        label: "Android",
        steps: [
          "Open Instellingen → Netwerk en internet → Privé-DNS.",
          "Noteer of die Uit, Automatisch of op een hostnaam staat.",
          "Controleer in de VPN-app of handmatige DNS of split tunneling aanstaat.",
          "Verbind opnieuw en test via wifi en mobiel internet.",
        ],
      },
      {
        id: "ios",
        label: "iPhone/iPad",
        steps: [
          "Open Instellingen → VPN en controleer of het juiste VPN-profiel actief is.",
          "Kijk of er nog een DNS-, beveiligings- of werkprofiel is geïnstalleerd.",
          "Vergelijk wifi en mobiel internet zonder beheerde profielen te verwijderen.",
          "Verbind de VPN opnieuw en doe dezelfde DNS-servermeting.",
        ],
      },
    ],
    sourceNote:
      "Volg de actuele uitleg van je besturingssysteem en VPN-aanbieder voordat je beheerde of zakelijke instellingen wijzigt.",
  },
  related: {
    eyebrow: "Meer controles",
    title: "Een DNS-uitslag is maar één deel van de route",
    items: [
      {
        title: "Controleer je openbare IP",
        body: "Bekijk het IP-adres en de geschatte netwerkinformatie die websites ontvangen.",
        href: "/tools/what-is-my-ip",
        action: "Controleer IP",
      },
      {
        title: "Vergelijk je snelheid",
        body: "Meet dezelfde verbinding vóór en na het aanzetten van een VPN.",
        href: "/speed-test",
        action: "Start snelheidstest",
      },
      {
        title: "Vind een passende VPN",
        body: "Beantwoord vijf vragen en bekijk een shortlist met gecontroleerde feiten.",
        href: "/quiz",
        action: "Open VPN-keuzehulp",
      },
    ],
  },
  providers: {
    eyebrow: "Instellingen per aanbieder",
    title: "Lees de uitleg voordat je de VPN-app wijzigt",
    intro:
      "Deze kaarten linken naar actuele uitleg van de aanbieders. Ze tonen wat de aanbieder zelf zegt, niet een onafhankelijke lekuitslag van ZeroToVPN.",
    disclosure:
      "Wij kunnen een commissie krijgen als je via een providerlink koopt. Jij betaalt niets extra. Links naar uitleg zijn niet gesponsord.",
    disclosureLink: "Hoe we deze site betalen",
    sourceLabel: "Uitleg van aanbieder bekeken op 16 augustus 2026",
    documentation: "Open DNS-uitleg",
    review: "Lees review",
    plans: "Bekijk abonnementen",
  },
  faqTitle: "Vragen over DNS-lektests",
  faqs: [
    {
      question: "Wat is een DNS-lek?",
      answer:
        "Bij een DNS-lek gebruikt een domeinzoekopdracht een route buiten de VPN-route die je verwachtte. Je internetprovider kan bijvoorbeeld antwoorden terwijl de VPN verbonden is.",
    },
    {
      question: "Kan deze pagina zien of ik een DNS-lek heb?",
      answer:
        "Niet zelfstandig. De ingebouwde check legt je openbare browserroute vast, maar ziet de DNS-server niet. Gebruik de gelinkte DNS-servermeting vóór en na het verbinden van de VPN en vergelijk daarna de organisaties.",
    },
    {
      question: "Betekent een ander DNS-land altijd dat ik een lek heb?",
      answer:
        "Nee. Locatiedatabases voor DNS-servers en IP-adressen kunnen fouten bevatten. Een VPN kan ook servers in een buurland gebruiken. Bekijk de organisatie, het netwerk en meerdere metingen.",
    },
    {
      question: "Kan beveiligde DNS in de browser de uitkomst veranderen?",
      answer:
        "Ja. Een browser kan DNS via HTTPS naar een zelfgekozen server sturen in plaats van de instelling van het systeem of de VPN. Controleer die browserinstelling apart.",
    },
    {
      question: "Bewijst een schone DNS-uitslag dat mijn VPN privé is?",
      answer:
        "Nee. De test controleert niet het logbeleid, apprechten, cookies, accountgegevens, WebRTC, elk apparaat of elke nieuwe verbinding. De test bekijkt alleen de DNS-route van dat testverzoek.",
    },
    {
      question: "Wanneer moet ik de test opnieuw doen?",
      answer:
        "Herhaal de test na een update, een andere VPN-server, een wissel tussen wifi en mobiel internet, een DNS-wijziging of nadat het apparaat uit slaapstand komt.",
    },
  ],
  sources: {
    eyebrow: "Bronnenlijst",
    title: "Bronnen en grenzen",
    intro:
      "De werking van besturingssystemen en VPN-apps verandert. Deze bronnen zijn geopend op 16 augustus 2026. Providerpagina's beschrijven hun eigen product.",
    open: "Bekijk alle bronnen",
  },
  newsletter: {
    eyebrow: "De Privacy Brief",
    title: "Ontvang praktische privacychecks",
    body: "Eens per twee weken één nuttige update. Geen nepmeldingen, aftelklokken of bangmakerij met testuitslagen.",
  },
};

export function getDnsLeakCopy(locale: string): DnsLeakCopy {
  return locale === "nl" ? nl : en;
}

export function isDnsLeakLocaleFullyLocalized(locale: string): boolean {
  return locale === "en" || locale === "nl";
}

export const dnsProviderGuides = [
  {
    id: "nordvpn",
    name: "NordVPN",
    logo: "/logos/nordvpn.svg",
    documentationUrl:
      "https://support.nordvpn.com/hc/en-us/articles/19587726859793-What-are-NordVPN-DNS-server-addresses",
    descriptionEn:
      "NordVPN says its native apps use NordVPN DNS servers while connected. Check the current device instructions before changing a manual DNS setting.",
    descriptionNl:
      "NordVPN zegt dat de eigen apps tijdens de verbinding NordVPN-DNS gebruiken. Lees de actuele uitleg voor je apparaat voordat je handmatige DNS wijzigt.",
    reviewHref: "/reviews/nordvpn",
  },
  {
    id: "protonvpn",
    name: "Proton VPN",
    logo: "/logos/protonvpn.svg",
    documentationUrl: "https://protonvpn.com/support/dns-leaks-privacy",
    descriptionEn:
      "Proton explains how custom DNS and browser DNS over HTTPS can change the route. The page is provider documentation, not our test evidence.",
    descriptionNl:
      "Proton legt uit hoe handmatige DNS en DNS via HTTPS in de browser de route kunnen veranderen. Dit is uitleg van de aanbieder, geen eigen testbewijs.",
    reviewHref: "/reviews/protonvpn",
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    logo: "/logos/expressvpn.svg",
    documentationUrl:
      "https://www.expressvpn.com/support/troubleshooting/dns-leaks-windows-app-antivirus/",
    descriptionEn:
      "ExpressVPN documents a Windows case where security software can change DNS routing. Confirm the app, antivirus and device versions in use.",
    descriptionNl:
      "ExpressVPN beschrijft een Windows-situatie waarin beveiligingssoftware de DNS-route kan veranderen. Controleer je app-, antivirus- en apparaatversie.",
    reviewHref: "/reviews/expressvpn",
  },
] as const;

export const dnsLeakSources = [
  {
    labelEn: "BrowserLeaks DNS resolver test",
    labelNl: "BrowserLeaks DNS-servermeting",
    organisation: "BrowserLeaks",
    typeEn: "Independent diagnostic reference",
    typeNl: "Onafhankelijke testreferentie",
    url: "https://browserleaks.com/dns",
  },
  {
    labelEn: "Firefox DNS over HTTPS settings",
    labelNl: "Firefox-instellingen voor DNS via HTTPS",
    organisation: "Mozilla",
    typeEn: "Browser documentation",
    typeNl: "Browserdocumentatie",
    url: "https://support.mozilla.org/en-US/kb/dns-over-https",
  },
  {
    labelEn: "Windows network and DNS settings",
    labelNl: "Windows-netwerk- en DNS-instellingen",
    organisation: "Microsoft",
    typeEn: "Operating-system documentation",
    typeNl: "Uitleg van besturingssysteem",
    url: "https://support.microsoft.com/en-us/windows/experience/connectivity-networking/essential-network-settings-and-tasks-in-windows",
  },
  {
    labelEn: "Android Private DNS settings",
    labelNl: "Android-instellingen voor Privé-DNS",
    organisation: "Google",
    typeEn: "Operating-system documentation",
    typeNl: "Uitleg van besturingssysteem",
    url: "https://support.google.com/pixelphone/answer/2819583?hl=en",
  },
  {
    labelEn: "Change DNS settings on Mac",
    labelNl: "DNS-instellingen wijzigen op de Mac",
    organisation: "Apple",
    typeEn: "Operating-system documentation",
    typeNl: "Uitleg van besturingssysteem",
    url: "https://support.apple.com/guide/mac-help/change-dns-settings-on-mac-mh14127/mac",
  },
  ...dnsProviderGuides.map((provider) => ({
    labelEn: `${provider.name} DNS guidance`,
    labelNl: `${provider.name} DNS-uitleg`,
    organisation: provider.name,
    typeEn: "Provider documentation",
    typeNl: "Uitleg van aanbieder",
    url: provider.documentationUrl,
  })),
] as const;
