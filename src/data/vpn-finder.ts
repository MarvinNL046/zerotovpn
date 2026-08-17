export const VPN_FINDER_MODEL_VERSION = "finder-2026-08-16-v1";
export const VPN_FINDER_DATA_CHECKED_AT = "2026-08-16";

export type FinderLocale = "en" | "nl";
export type FinderQuestionId =
  "primaryUse" | "platforms" | "deviceCount" | "mustHave" | "network";

export type FinderPlatform =
  "desktop" | "android" | "ios" | "linux" | "tv" | "router";

export type FinderAnswers = {
  primaryUse?: "privacy" | "streaming" | "gaming" | "travel" | "work";
  platforms?: FinderPlatform[];
  deviceCount?: "one-two" | "three-five" | "six-ten" | "more-ten" | "unsure";
  mustHave?: "free" | "open-source" | "minimal-account" | "none";
  network?: "home" | "public-wifi" | "restricted" | "work-school" | "unsure";
};

export type FinderOption = {
  value: string;
  label: string;
  description: string;
  icon:
    | "shield"
    | "play"
    | "gamepad"
    | "plane"
    | "briefcase"
    | "monitor"
    | "smartphone"
    | "tablet"
    | "terminal"
    | "tv"
    | "router"
    | "devices"
    | "gift"
    | "code"
    | "user"
    | "sparkles"
    | "home"
    | "wifi"
    | "lock"
    | "building"
    | "help";
};

export type FinderQuestion = {
  id: FinderQuestionId;
  eyebrow: string;
  title: string;
  description: string;
  type: "single" | "multi";
  options: FinderOption[];
};

export type FinderProviderId =
  "nordvpn" | "surfshark" | "protonvpn" | "mullvad";

export type FinderProviderProfile = {
  id: FinderProviderId;
  name: string;
  slug: string;
  logo: string;
  officialUrl: string;
  platforms: FinderPlatform[];
  paidDeviceLimit: number | null;
  freeDeviceLimit: number | null;
  hasFreePlan: boolean;
  openSourceApps: boolean;
  minimalAccount: boolean;
  restrictedNetworkTool: string;
  privacyEvidence: string;
  sourceIds: string[];
};

export type FinderProviderLink = {
  id: FinderProviderId;
  affiliateUrl: string;
};

export type FinderProvider = FinderProviderProfile & FinderProviderLink;

export type FinderSource = {
  id: string;
  provider: string;
  label: string;
  labelNl: string;
  url: string;
  checkedAt: string;
};

export type FinderResult = {
  provider: FinderProvider;
  fit: "strong" | "possible";
  reasons: string[];
  limitations: string[];
  sourceIds: string[];
};

export type FinderCopy = {
  locale: FinderLocale;
  metadata: { title: string; description: string; ogAlt: string };
  breadcrumb: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    caveat: string;
    cues: string[];
  };
  disclosure: string;
  disclosureLink: string;
  progress: { step: string; of: string; complete: string };
  answers: {
    title: string;
    empty: string;
    edit: string;
    reset: string;
    mobileSummary: string;
  };
  questions: FinderQuestion[];
  navigation: {
    back: string;
    next: string;
    results: string;
    chooseOne: string;
  };
  results: {
    eyebrow: string;
    title: string;
    subtitle: string;
    noWinner: string;
    partial: string;
    noMatchTitle: string;
    noMatchBody: string;
    answersLabel: string;
    noMatchReasonTitle: string;
    noMatchReasonBody: string;
    relax: string;
    strong: string;
    possible: string;
    why: string;
    caution: string;
    checked: string;
    readReview: string;
    checkPlans: string;
    officialSite: string;
    partner: string;
    change: string;
    restart: string;
    compare: string;
    noSpeedWinner: string;
    sourceDetails: string;
  };
  providerCopy: Record<
    FinderProviderId,
    { summary: string; baseLimit: string }
  >;
  methodology: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
    modelLabel: string;
    link: string;
  };
  related: {
    title: string;
    items: Array<{ title: string; body: string; href: string }>;
  };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  sourcesTitle: string;
  sourcesIntro: string;
};

const enQuestions: FinderQuestion[] = [
  {
    id: "primaryUse",
    eyebrow: "Your main goal",
    title: "What do you want the VPN to help with most?",
    description:
      "Pick the one reason that matters most. You can still use the VPN for other things.",
    type: "single",
    options: [
      {
        value: "privacy",
        label: "Protect my privacy",
        description:
          "Hide my home IP from websites. Logins, cookies and fingerprints can still identify me.",
        icon: "shield",
      },
      {
        value: "streaming",
        label: "Watch streaming services",
        description:
          "Access can change, so we do not promise a permanent winner.",
        icon: "play",
      },
      {
        value: "gaming",
        label: "Game with a stable connection",
        description: "A fair winner needs the same live test for every VPN.",
        icon: "gamepad",
      },
      {
        value: "travel",
        label: "Use public or restricted networks",
        description: "Look for documented tools and prepare before you travel.",
        icon: "plane",
      },
      {
        value: "work",
        label: "Use shared networks for work",
        description:
          "Add an encrypted VPN tunnel on hotel, café and other shared networks.",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "platforms",
    eyebrow: "Your devices",
    title: "Which devices must the VPN support?",
    description:
      "Choose every device you plan to use. This is the only question where you can select more than one answer.",
    type: "multi",
    options: [
      {
        value: "desktop",
        label: "Windows or Mac",
        description: "Laptop or desktop computer.",
        icon: "monitor",
      },
      {
        value: "android",
        label: "Android",
        description: "Phone, tablet or Chromebook app.",
        icon: "smartphone",
      },
      {
        value: "ios",
        label: "iPhone or iPad",
        description: "Apple mobile devices.",
        icon: "tablet",
      },
      {
        value: "linux",
        label: "Linux",
        description: "A Linux app or supported setup.",
        icon: "terminal",
      },
      {
        value: "tv",
        label: "TV or streaming device",
        description: "For example Android TV, Fire TV or Apple TV.",
        icon: "tv",
      },
      {
        value: "router",
        label: "Router",
        description: "Cover devices through a compatible router.",
        icon: "router",
      },
    ],
  },
  {
    id: "deviceCount",
    eyebrow: "Connections at once",
    title: "How many devices will use the VPN at the same time?",
    description: "Count active connections, not every device you own.",
    type: "single",
    options: [
      {
        value: "one-two",
        label: "1–2 devices",
        description: "One person or a small setup.",
        icon: "smartphone",
      },
      {
        value: "three-five",
        label: "3–5 devices",
        description: "Several personal devices.",
        icon: "devices",
      },
      {
        value: "six-ten",
        label: "6–10 devices",
        description: "A household with many active devices.",
        icon: "devices",
      },
      {
        value: "more-ten",
        label: "More than 10",
        description: "A large household or many shared devices.",
        icon: "devices",
      },
      {
        value: "unsure",
        label: "I am not sure",
        description: "We will keep the device limit visible in your shortlist.",
        icon: "help",
      },
    ],
  },
  {
    id: "mustHave",
    eyebrow: "One must-have",
    title: "Which extra requirement matters most?",
    description: "A must-have can remove providers that do not meet it.",
    type: "single",
    options: [
      {
        value: "free",
        label: "A real free plan",
        description: "Limits are fine, but I do not want a paid plan.",
        icon: "gift",
      },
      {
        value: "open-source",
        label: "Open-source apps",
        description: "The app code should be available for inspection.",
        icon: "code",
      },
      {
        value: "minimal-account",
        label: "Very little account information",
        description: "I prefer an account model with fewer personal details.",
        icon: "user",
      },
      {
        value: "none",
        label: "No special requirement",
        description: "Keep all providers that meet my other answers.",
        icon: "sparkles",
      },
    ],
  },
  {
    id: "network",
    eyebrow: "Your usual network",
    title: "Where will you use the VPN most often?",
    description:
      "Network restrictions can matter more than the size of a provider's server list.",
    type: "single",
    options: [
      {
        value: "home",
        label: "At home or on mobile data",
        description: "A normal connection without known VPN blocks.",
        icon: "home",
      },
      {
        value: "public-wifi",
        label: "Public Wi‑Fi while travelling",
        description: "Hotels, airports, cafés and other shared networks.",
        icon: "wifi",
      },
      {
        value: "restricted",
        label: "A network that blocks VPNs or websites",
        description: "Availability can change; no tool works everywhere.",
        icon: "lock",
      },
      {
        value: "work-school",
        label: "Work or school",
        description:
          "Follow local rules and your organisation's access policy.",
        icon: "building",
      },
      {
        value: "unsure",
        label: "I am not sure",
        description: "We will show the network limitation clearly.",
        icon: "help",
      },
    ],
  },
];

const nlQuestions: FinderQuestion[] = [
  {
    id: "primaryUse",
    eyebrow: "Je belangrijkste doel",
    title: "Waar wil je de VPN vooral voor gebruiken?",
    description:
      "Kies de reden die voor jou het belangrijkst is. Je kunt de VPN natuurlijk ook voor andere dingen gebruiken.",
    type: "single",
    options: [
      {
        value: "privacy",
        label: "Mijn privacy beter beschermen",
        description:
          "Verberg je thuis-IP voor websites. Accounts, cookies en browserkenmerken kunnen je nog herkennen.",
        icon: "shield",
      },
      {
        value: "streaming",
        label: "Streamingdiensten kijken",
        description:
          "Toegang kan veranderen. Daarom beloven we geen vaste winnaar.",
        icon: "play",
      },
      {
        value: "gaming",
        label: "Gamen met een stabiele verbinding",
        description:
          "Een eerlijke winnaar vraagt dezelfde live test voor elke VPN.",
        icon: "gamepad",
      },
      {
        value: "travel",
        label: "Openbare of beperkte netwerken gebruiken",
        description:
          "Kijk naar duidelijke hulpmiddelen en bereid je voor op reis.",
        icon: "plane",
      },
      {
        value: "work",
        label: "Gedeelde netwerken gebruiken voor werk",
        description:
          "Voeg een versleutelde VPN-tunnel toe op hotel-, café- en andere gedeelde netwerken.",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "platforms",
    eyebrow: "Je apparaten",
    title: "Op welke apparaten moet de VPN werken?",
    description:
      "Kies alle apparaten die je wilt gebruiken. Alleen bij deze vraag kun je meer dan één antwoord kiezen.",
    type: "multi",
    options: [
      {
        value: "desktop",
        label: "Windows of Mac",
        description: "Laptop of desktopcomputer.",
        icon: "monitor",
      },
      {
        value: "android",
        label: "Android",
        description: "Telefoon, tablet of Chromebook-app.",
        icon: "smartphone",
      },
      {
        value: "ios",
        label: "iPhone of iPad",
        description: "Mobiele apparaten van Apple.",
        icon: "tablet",
      },
      {
        value: "linux",
        label: "Linux",
        description: "Een Linux-app of ondersteunde installatie.",
        icon: "terminal",
      },
      {
        value: "tv",
        label: "Tv of streamingapparaat",
        description: "Bijvoorbeeld Android TV, Fire TV of Apple TV.",
        icon: "tv",
      },
      {
        value: "router",
        label: "Router",
        description: "Bescherm apparaten via een geschikte router.",
        icon: "router",
      },
    ],
  },
  {
    id: "deviceCount",
    eyebrow: "Tegelijk verbonden",
    title: "Hoeveel apparaten gebruiken de VPN tegelijk?",
    description: "Tel actieve verbindingen, niet alle apparaten die je bezit.",
    type: "single",
    options: [
      {
        value: "one-two",
        label: "1–2 apparaten",
        description: "Eén persoon of een kleine opstelling.",
        icon: "smartphone",
      },
      {
        value: "three-five",
        label: "3–5 apparaten",
        description: "Meerdere persoonlijke apparaten.",
        icon: "devices",
      },
      {
        value: "six-ten",
        label: "6–10 apparaten",
        description: "Een huishouden met veel actieve apparaten.",
        icon: "devices",
      },
      {
        value: "more-ten",
        label: "Meer dan 10",
        description: "Een groot huishouden of veel gedeelde apparaten.",
        icon: "devices",
      },
      {
        value: "unsure",
        label: "Ik weet het niet",
        description: "We houden de apparaatlimiet zichtbaar in je shortlist.",
        icon: "help",
      },
    ],
  },
  {
    id: "mustHave",
    eyebrow: "Eén harde eis",
    title: "Welke extra eis vind je het belangrijkst?",
    description:
      "Een harde eis kan aanbieders verwijderen die er niet aan voldoen.",
    type: "single",
    options: [
      {
        value: "free",
        label: "Een echt gratis abonnement",
        description:
          "Beperkingen zijn prima, maar ik wil geen betaald abonnement.",
        icon: "gift",
      },
      {
        value: "open-source",
        label: "Apps met openbare broncode",
        description: "De code van de app moet te bekijken zijn.",
        icon: "code",
      },
      {
        value: "minimal-account",
        label: "Zo weinig mogelijk accountgegevens",
        description:
          "Ik wil liever een account met minder persoonlijke gegevens.",
        icon: "user",
      },
      {
        value: "none",
        label: "Geen speciale eis",
        description:
          "Behoud alle aanbieders die bij mijn andere antwoorden passen.",
        icon: "sparkles",
      },
    ],
  },
  {
    id: "network",
    eyebrow: "Je gewone netwerk",
    title: "Op welk netwerk gebruik je de VPN meestal?",
    description:
      "Netwerkblokkades kunnen belangrijker zijn dan de grootte van een serverlijst.",
    type: "single",
    options: [
      {
        value: "home",
        label: "Thuis of op mobiele data",
        description: "Een normale verbinding zonder bekende VPN-blokkade.",
        icon: "home",
      },
      {
        value: "public-wifi",
        label: "Openbare wifi tijdens reizen",
        description: "Hotels, vliegvelden, cafés en andere gedeelde netwerken.",
        icon: "wifi",
      },
      {
        value: "restricted",
        label: "Een netwerk dat VPN's of websites blokkeert",
        description:
          "Beschikbaarheid kan veranderen; geen hulpmiddel werkt overal.",
        icon: "lock",
      },
      {
        value: "work-school",
        label: "Werk of school",
        description:
          "Volg lokale regels en het toegangsbeleid van je organisatie.",
        icon: "building",
      },
      {
        value: "unsure",
        label: "Ik weet het niet",
        description: "We tonen de beperking voor netwerken duidelijk.",
        icon: "help",
      },
    ],
  },
];

const enCopy: FinderCopy = {
  locale: "en",
  metadata: {
    title: "VPN Finder: Find the Right VPN for You | ZeroToVPN",
    description:
      "Answer five simple questions and compare transparent VPN matches for your needs, devices and network. See why every option fits before you choose.",
    ogAlt:
      "ZeroToVPN finder showing a clear path from five questions to an explained VPN shortlist",
  },
  breadcrumb: "VPN finder",
  hero: {
    eyebrow: "Personal VPN finder",
    title: "Find a VPN that fits how you use the internet",
    subtitle:
      "Answer five short questions. We show up to four checked options and explain why each one fits — and where it falls short.",
    caveat:
      "A match is a shortlist, not a guarantee. Features, prices and access can change.",
    cues: ["About 60 seconds", "No email needed", "Method explained"],
  },
  disclosure:
    "We may earn a commission if you buy through a provider link. You pay no extra, and commission never changes the order.",
  disclosureLink: "How we fund this site",
  progress: { step: "Step", of: "of", complete: "complete" },
  answers: {
    title: "Your answers",
    empty: "Not answered yet",
    edit: "Edit",
    reset: "Start over",
    mobileSummary: "View your answers",
  },
  questions: enQuestions,
  navigation: {
    back: "Back",
    next: "Continue",
    results: "Show my shortlist",
    chooseOne: "Choose at least one answer to continue.",
  },
  results: {
    eyebrow: "Your explained shortlist",
    title: "VPNs that fit your hard requirements",
    subtitle:
      "We show only providers from our checked pilot set that meet every hard requirement you selected. The list is alphabetical, not a ranking.",
    noWinner:
      "There is no honest speed or streaming winner yet. Those claims need the same fresh test for every VPN, so the list is not ranked.",
    partial:
      "Not every checked provider met your hard requirements. We do not fill the list with weaker options.",
    noMatchTitle: "We cannot give a reliable match for this combination yet",
    noMatchBody:
      "None of the checked providers meets every hard requirement. Change one answer instead of accepting a weak recommendation.",
    answersLabel: "Your choices",
    noMatchReasonTitle: "Why there is no match",
    noMatchReasonBody:
      "Two or more hard requirements conflict in our checked provider set. Review the choices above and change the least important one.",
    relax: "Change my answers",
    strong: "Strong fit",
    possible: "Worth comparing",
    why: "Why this fits",
    caution: "Keep in mind",
    checked: "Provider information checked",
    readReview: "Read our review",
    checkPlans: "Check current plans",
    officialSite: "Visit official site",
    partner: "Commission link",
    change: "Change last answer",
    restart: "Start over",
    compare: "Compare the shortlisted VPNs",
    noSpeedWinner: "No speed or streaming score is used in this order.",
    sourceDetails: "See sources",
  },
  providerCopy: {
    nordvpn: {
      summary:
        "A paid VPN with apps for common devices, 10 simultaneous connections and documented tools for blocked networks.",
      baseLimit:
        "NordVPN allows 10 devices at once. Its restricted-network tools are provider claims, not a connection guarantee.",
    },
    surfshark: {
      summary:
        "A paid VPN whose provider says one account has no set device limit and includes NoBorders for restrictive networks.",
      baseLimit:
        "No device limit does not prove better speed. NoBorders is provider documentation, not a guarantee on every network.",
    },
    protonvpn: {
      summary:
        "A VPN with open-source apps, a free plan for one device and a documented Stealth connection option.",
      baseLimit:
        "The free plan supports one active device. Paid-plan limits and features are different.",
    },
    mullvad: {
      summary:
        "A paid VPN that uses an account number, supports five devices and documents Bridge mode for restrictive firewalls.",
      baseLimit:
        "Mullvad supports up to five devices and does not offer a free plan.",
    },
  },
  methodology: {
    eyebrow: "How the finder works",
    title: "Hard requirements first — commission never counts",
    intro:
      "The finder checks a small provider set with current source links. It removes providers that miss a device, platform, free-plan or account requirement before it looks for helpful extras.",
    items: [
      {
        title: "1. Remove poor fits",
        body: "A provider is left out when it cannot meet a hard requirement.",
      },
      {
        title: "2. Explain every fit",
        body: "Each card connects your answer to a checked provider fact.",
      },
      {
        title: "3. Show what is unknown",
        body: "We do not invent speed, streaming or privacy scores when a fair test is missing.",
      },
      {
        title: "4. Keep money out of the order",
        body: "Affiliate commission is not part of the matching rules.",
      },
    ],
    modelLabel: "Rules and sources checked",
    link: "Read the full methodology",
  },
  related: {
    title: "Prefer to research by topic?",
    items: [
      {
        title: "Compare VPNs side by side",
        body: "Start with provider differences instead of a quiz.",
        href: "/compare",
      },
      {
        title: "VPNs for travel",
        body: "Prepare apps and backup options before a trip.",
        href: "/guides/vpn-for-travel",
      },
      {
        title: "How VPN speed tests work",
        body: "See why we do not name a speed winner without equal tests.",
        href: "/guides/vpn-speed-guide",
      },
    ],
  },
  faqTitle: "VPN finder questions",
  faqs: [
    {
      question: "Does the first result mean it is the fastest VPN?",
      answer:
        "No. This finder does not use old or unmatched speed scores. A speed winner needs every VPN tested on the same connection, device, route and day.",
    },
    {
      question: "Do affiliate payments change the result?",
      answer:
        "No. Hard requirements, documented product facts and evidence limits decide the order. A commission is never a matching factor.",
    },
    {
      question: "Are my answers saved or sent anywhere?",
      answer:
        "No. Your answers stay in this browser tab while you use the finder. The finder does not ask for your email or account.",
    },
    {
      question: "Why does the finder check only four VPNs?",
      answer:
        "This first version uses a small evidence-gated set. We will add providers only when the required device, account and network information has a current source.",
    },
    {
      question: "Can a VPN always work on a restricted network?",
      answer:
        "No. Providers can document tools for blocked networks, but availability changes by place, provider, network and time. Install and test before you depend on one.",
    },
  ],
  sourcesTitle: "What the shortlist is based on",
  sourcesIntro:
    "These provider pages describe current product limits and tools. They do not replace an independent live speed, streaming or restricted-network test.",
};

const nlCopy: FinderCopy = {
  locale: "nl",
  metadata: {
    title: "VPN-keuzehulp: vind de VPN die bij je past | ZeroToVPN",
    description:
      "Beantwoord vijf simpele vragen en vergelijk duidelijke VPN-matches voor jouw gebruik en apparaten. Bekijk waarom elke uitkomst past voordat je kiest.",
    ogAlt:
      "ZeroToVPN-keuzehulp met een duidelijke route van vijf vragen naar een uitgelegde VPN-shortlist",
  },
  breadcrumb: "VPN-keuzehulp",
  hero: {
    eyebrow: "Persoonlijke VPN-keuzehulp",
    title: "Vind een VPN die past bij hoe jij internet gebruikt",
    subtitle:
      "Beantwoord vijf korte vragen. We tonen maximaal vier gecontroleerde opties en leggen uit waarom ze passen — en waar niet.",
    caveat:
      "Een match is een shortlist, geen garantie. Functies, prijzen en toegang kunnen veranderen.",
    cues: ["Ongeveer 60 seconden", "Geen e-mail nodig", "Methode uitgelegd"],
  },
  disclosure:
    "Wij kunnen een commissie krijgen als je via een providerlink koopt. Jij betaalt niets extra en de commissie verandert de volgorde nooit.",
  disclosureLink: "Zo financieren we de site",
  progress: { step: "Stap", of: "van", complete: "voltooid" },
  answers: {
    title: "Jouw antwoorden",
    empty: "Nog niet beantwoord",
    edit: "Wijzig",
    reset: "Begin opnieuw",
    mobileSummary: "Bekijk je antwoorden",
  },
  questions: nlQuestions,
  navigation: {
    back: "Terug",
    next: "Verder",
    results: "Toon mijn shortlist",
    chooseOne: "Kies minimaal één antwoord om verder te gaan.",
  },
  results: {
    eyebrow: "Jouw uitgelegde shortlist",
    title: "VPN's die aan jouw harde eisen voldoen",
    subtitle:
      "We tonen alleen aanbieders uit onze gecontroleerde proefgroep die aan al jouw harde eisen voldoen. De lijst staat op alfabet en is geen ranglijst.",
    noWinner:
      "Er is nog geen eerlijke winnaar voor snelheid of streaming. Daarvoor is dezelfde nieuwe test voor elke VPN nodig. De lijst is daarom niet gerangschikt.",
    partial:
      "Niet alle gecontroleerde aanbieders voldeden aan je harde eisen. We vullen de lijst niet op met zwakkere opties.",
    noMatchTitle:
      "Voor deze combinatie kunnen we nog geen betrouwbare match geven",
    noMatchBody:
      "Geen van de gecontroleerde aanbieders voldoet aan al je harde eisen. Wijzig liever één antwoord dan dat je een zwakke aanbeveling krijgt.",
    answersLabel: "Jouw keuzes",
    noMatchReasonTitle: "Waarom er geen match is",
    noMatchReasonBody:
      "Twee of meer harde eisen botsen binnen onze gecontroleerde groep. Bekijk je keuzes hierboven en wijzig de minst belangrijke.",
    relax: "Wijzig mijn antwoorden",
    strong: "Sterke match",
    possible: "Het vergelijken waard",
    why: "Waarom dit past",
    caution: "Let hierop",
    checked: "Informatie gecontroleerd",
    readReview: "Lees onze review",
    checkPlans: "Bekijk actuele abonnementen",
    officialSite: "Bezoek officiële site",
    partner: "Commissielink",
    change: "Wijzig laatste antwoord",
    restart: "Begin opnieuw",
    compare: "Vergelijk de VPN's uit je shortlist",
    noSpeedWinner:
      "Snelheids- en streamingscores tellen niet mee in deze volgorde.",
    sourceDetails: "Bekijk bronnen",
  },
  providerCopy: {
    nordvpn: {
      summary:
        "Een betaalde VPN met apps voor Windows, macOS, Android, iPhone, Linux en tv, 10 gelijktijdige verbindingen en beschreven hulpmiddelen voor geblokkeerde netwerken.",
      baseLimit:
        "NordVPN laat 10 apparaten tegelijk toe. De hulpmiddelen voor beperkte netwerken zijn informatie van NordVPN, geen verbindingsgarantie.",
    },
    surfshark: {
      summary:
        "Een betaalde VPN waarvan de aanbieder zegt dat één account geen vaste apparaatlimiet heeft en NoBorders bevat voor beperkte netwerken.",
      baseLimit:
        "Geen apparaatlimiet bewijst geen hogere snelheid. NoBorders is informatie van Surfshark, geen garantie op elk netwerk.",
    },
    protonvpn: {
      summary:
        "Een VPN met apps met openbare broncode, een gratis abonnement voor één apparaat en de beschreven Stealth-verbinding.",
      baseLimit:
        "Het gratis abonnement ondersteunt één actief apparaat. Bij betaalde abonnementen zijn de limieten en functies anders.",
    },
    mullvad: {
      summary:
        "Een betaalde VPN die een accountnummer gebruikt, vijf apparaten ondersteunt en Bridge mode beschrijft voor beperkte netwerken.",
      baseLimit:
        "Mullvad ondersteunt maximaal vijf apparaten en heeft geen gratis abonnement.",
    },
  },
  methodology: {
    eyebrow: "Zo werkt de keuzehulp",
    title: "Eerst je harde eisen — commissie telt nooit mee",
    intro:
      "De keuzehulp controleert een kleine groep aanbieders met actuele bronlinks. Eerst vallen VPN's af die niet passen bij je apparaten, gratis eis of accountwens. Daarna kijken we naar nuttige extra's.",
    items: [
      {
        title: "1. Zwakke matches vallen af",
        body: "Een aanbieder verdwijnt als die niet aan een harde eis voldoet.",
      },
      {
        title: "2. Elke match krijgt uitleg",
        body: "Elke kaart koppelt jouw antwoord aan controleerbare informatie.",
      },
      {
        title: "3. Onzekerheid blijft zichtbaar",
        body: "We verzinnen geen score voor snelheid, streaming of privacy als een eerlijke test ontbreekt.",
      },
      {
        title: "4. Geld bepaalt de volgorde niet",
        body: "Affiliatecommissie zit niet in de regels van de keuzehulp.",
      },
    ],
    modelLabel: "Regels en bronnen gecontroleerd",
    link: "Lees de volledige methode",
  },
  related: {
    title: "Liever zelf per onderwerp zoeken?",
    items: [
      {
        title: "Vergelijk VPN's naast elkaar",
        body: "Begin met verschillen tussen aanbieders in plaats van een vragenlijst.",
        href: "/compare",
      },
      {
        title: "VPN gebruiken op reis",
        body: "Installeer apps en reserveopties voordat je vertrekt.",
        href: "/guides/vpn-for-travel",
      },
      {
        title: "Zo werken VPN-snelheidstests",
        body: "Lees waarom we zonder gelijke test geen snelheidswinnaar noemen.",
        href: "/guides/vpn-speed-guide",
      },
    ],
  },
  faqTitle: "Vragen over de VPN-keuzehulp",
  faqs: [
    {
      question: "Betekent het eerste resultaat dat dit de snelste VPN is?",
      answer:
        "Nee. Deze keuzehulp gebruikt geen oude of ongelijk uitgevoerde snelheidsscores. Een snelheidswinnaar vraagt dezelfde verbinding, hetzelfde apparaat, dezelfde route en dezelfde testdag.",
    },
    {
      question: "Verandert een affiliatebetaling de uitkomst?",
      answer:
        "Nee. Harde eisen, productinformatie en duidelijke beperkingen bepalen de volgorde. Commissie is nooit een onderdeel van de match.",
    },
    {
      question: "Worden mijn antwoorden opgeslagen of verstuurd?",
      answer:
        "Nee. Je antwoorden blijven in dit browsertabblad zolang je de keuzehulp gebruikt. We vragen niet om je e-mailadres of account.",
    },
    {
      question: "Waarom controleert de keuzehulp maar vier VPN's?",
      answer:
        "Deze eerste versie gebruikt een kleine groep met duidelijke broninformatie. We voegen pas aanbieders toe als de benodigde informatie over apparaten, accounts en netwerken actueel is.",
    },
    {
      question: "Werkt een VPN altijd op een beperkt netwerk?",
      answer:
        "Nee. Aanbieders kunnen hulpmiddelen voor geblokkeerde netwerken beschrijven, maar de werking verandert per plaats, aanbieder, netwerk en moment. Installeer en test voordat je ervan afhankelijk bent.",
    },
  ],
  sourcesTitle: "Waarop de shortlist is gebaseerd",
  sourcesIntro:
    "Deze pagina's van aanbieders beschrijven actuele productlimieten en hulpmiddelen. Ze vervangen geen onafhankelijke live test voor snelheid, streaming of beperkte netwerken.",
};

export const vpnFinderProviderProfiles: FinderProviderProfile[] = [
  {
    id: "nordvpn",
    name: "NordVPN",
    slug: "nordvpn",
    logo: "/logos/nordvpn.svg",
    officialUrl: "https://nordvpn.com/",
    platforms: ["desktop", "android", "ios", "linux", "tv", "router"],
    paidDeviceLimit: 10,
    freeDeviceLimit: null,
    hasFreePlan: false,
    openSourceApps: false,
    minimalAccount: false,
    restrictedNetworkTool: "Obfuscated servers and NordWhisper",
    privacyEvidence:
      "NordVPN published a dated Deloitte no-logs check for 2025",
    sourceIds: [
      "nord-devices",
      "nord-platforms",
      "nord-restricted",
      "nord-privacy",
    ],
  },
  {
    id: "surfshark",
    name: "Surfshark",
    slug: "surfshark",
    logo: "/logos/surfshark.svg",
    officialUrl: "https://surfshark.com/",
    platforms: ["desktop", "android", "ios", "linux", "tv", "router"],
    paidDeviceLimit: null,
    freeDeviceLimit: null,
    hasFreePlan: false,
    openSourceApps: false,
    minimalAccount: false,
    restrictedNetworkTool: "NoBorders",
    privacyEvidence:
      "Surfshark published a dated Deloitte no-logs report for 2025",
    sourceIds: [
      "surf-devices",
      "surf-platforms",
      "surf-restricted",
      "surf-privacy",
    ],
  },
  {
    id: "protonvpn",
    name: "Proton VPN",
    slug: "protonvpn",
    logo: "/logos/protonvpn.svg",
    officialUrl: "https://protonvpn.com/",
    platforms: ["desktop", "android", "ios", "linux", "tv", "router"],
    paidDeviceLimit: 10,
    freeDeviceLimit: 1,
    hasFreePlan: true,
    openSourceApps: true,
    minimalAccount: false,
    restrictedNetworkTool: "Stealth",
    privacyEvidence:
      "Proton publishes its app source code and links to app audits",
    sourceIds: [
      "proton-free",
      "proton-paid-devices",
      "proton-platforms",
      "proton-open-source",
      "proton-restricted",
    ],
  },
  {
    id: "mullvad",
    name: "Mullvad VPN",
    slug: "mullvad",
    logo: "/logos/mullvad.svg",
    officialUrl: "https://mullvad.net/",
    platforms: ["desktop", "android", "ios", "linux"],
    paidDeviceLimit: 5,
    freeDeviceLimit: null,
    hasFreePlan: false,
    openSourceApps: true,
    minimalAccount: true,
    restrictedNetworkTool: "Bridge mode with Shadowsocks",
    privacyEvidence: "Mullvad uses an account number as the service identifier",
    sourceIds: [
      "mullvad-account",
      "mullvad-devices",
      "mullvad-platforms",
      "mullvad-open-source",
      "mullvad-restricted",
    ],
  },
];

export const vpnFinderSources: FinderSource[] = [
  {
    id: "nord-devices",
    provider: "NordVPN",
    label: "Simultaneous device support",
    labelNl: "Aantal apparaten tegelijk",
    url: "https://support.nordvpn.com/hc/en-us/articles/19476515228305-How-many-devices-can-I-use-with-NordVPN",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "nord-platforms",
    provider: "NordVPN",
    label: "Supported apps and downloads",
    labelNl: "Ondersteunde apps en downloads",
    url: "https://nordvpn.com/download/",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "nord-restricted",
    provider: "NordVPN",
    label: "Connection help for restricted countries",
    labelNl: "Verbindingshulp voor landen met beperkingen",
    url: "https://support.nordvpn.com/hc/en-us/articles/38297515575697-I-can-t-connect-from-a-country-with-internet-restrictions",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "nord-privacy",
    provider: "NordVPN",
    label: "2025 no-logs check announcement",
    labelNl: "Aankondiging no-logs-controle uit 2025",
    url: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "surf-devices",
    provider: "Surfshark",
    label: "Simultaneous device support",
    labelNl: "Aantal apparaten tegelijk",
    url: "https://support.surfshark.com/hc/en-us/articles/360003069434-How-many-devices-can-I-use-with-Surfshark-simultaneously",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "surf-platforms",
    provider: "Surfshark",
    label: "Supported apps and downloads",
    labelNl: "Ondersteunde apps en downloads",
    url: "https://surfshark.com/download",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "surf-restricted",
    provider: "Surfshark",
    label: "NoBorders documentation",
    labelNl: "Uitleg over NoBorders",
    url: "https://support.surfshark.com/hc/en-us/articles/360010423359-How-to-use-Surfshark-NoBorders",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "surf-privacy",
    provider: "Surfshark",
    label: "2025 Deloitte no-logs report",
    labelNl: "Deloitte-rapport over no-logs uit 2025",
    url: "https://surfshark.com/wp-content/uploads/2025/06/ISAE_3000-_Report-Surfshark_No_Log_VPN.pdf",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "proton-free",
    provider: "Proton VPN",
    label: "Free plan and one-device limit",
    labelNl: "Gratis abonnement en limiet van één apparaat",
    url: "https://protonvpn.com/support/how-to-create-free-vpn-account",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "proton-paid-devices",
    provider: "Proton VPN",
    label: "Paid plan and ten-device limit",
    labelNl: "Betaald abonnement en limiet van tien apparaten",
    url: "https://protonvpn.com/features/multi-platform-support",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "proton-platforms",
    provider: "Proton VPN",
    label: "Supported apps and downloads",
    labelNl: "Ondersteunde apps en downloads",
    url: "https://protonvpn.com/support/download-protonvpn",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "proton-open-source",
    provider: "Proton VPN",
    label: "Open-source apps",
    labelNl: "Apps met openbare broncode",
    url: "https://protonvpn.com/blog/open-source",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "proton-restricted",
    provider: "Proton VPN",
    label: "Stealth connection option",
    labelNl: "Stealth-verbindingsoptie",
    url: "https://protonvpn.com/support/how-to-change-vpn-protocols",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "mullvad-account",
    provider: "Mullvad VPN",
    label: "Account number and stored data",
    labelNl: "Accountnummer en opgeslagen gegevens",
    url: "https://mullvad.net/en/help/no-logging-data-policy",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "mullvad-devices",
    provider: "Mullvad VPN",
    label: "Five-device limit",
    labelNl: "Limiet van vijf apparaten",
    url: "https://mullvad.net/en/help/using-mullvad-vpn-app",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "mullvad-platforms",
    provider: "Mullvad VPN",
    label: "Supported apps",
    labelNl: "Ondersteunde apps",
    url: "https://mullvad.net/en/help/using-mullvad-vpn-app",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "mullvad-open-source",
    provider: "Mullvad VPN",
    label: "Open-source projects",
    labelNl: "Projecten met openbare broncode",
    url: "https://mullvad.net/en/open-source",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
  {
    id: "mullvad-restricted",
    provider: "Mullvad VPN",
    label: "Bridge mode for restrictive firewalls",
    labelNl: "Bridge mode voor beperkende firewalls",
    url: "https://mullvad.net/en/help/faq",
    checkedAt: VPN_FINDER_DATA_CHECKED_AT,
  },
];

export function isFinderLocaleFullyLocalized(
  locale: string,
): locale is FinderLocale {
  return locale === "en" || locale === "nl";
}

export function getVpnFinderCopy(locale: string): FinderCopy {
  return locale === "nl" ? nlCopy : enCopy;
}

function requestedDeviceLimit(
  answer: FinderAnswers["deviceCount"],
): number | null {
  if (answer === "one-two") return 2;
  if (answer === "three-five") return 5;
  if (answer === "six-ten") return 10;
  if (answer === "more-ten") return 11;
  return null;
}

function localReason(
  locale: FinderLocale,
  key: string,
  provider: FinderProviderProfile,
): string {
  const nl = locale === "nl";
  const privacyReasons: Record<FinderProviderId, { en: string; nl: string }> = {
    nordvpn: {
      en: "NordVPN published a dated announcement about a Deloitte check of part of its no-logs policy in 2025.",
      nl: "NordVPN publiceerde een gedateerde aankondiging over een Deloitte-controle van een deel van het no-logs-beleid in 2025.",
    },
    surfshark: {
      en: "Surfshark published a dated Deloitte report about part of its no-logs policy in 2025.",
      nl: "Surfshark publiceerde een gedateerd Deloitte-rapport over een deel van het no-logs-beleid in 2025.",
    },
    protonvpn: {
      en: "Proton publishes the source code of its apps and links to app audits.",
      nl: "Proton publiceert de broncode van zijn apps en verwijst naar controles van de apps.",
    },
    mullvad: {
      en: "Mullvad uses an account number instead of a normal username as the service identifier.",
      nl: "Mullvad gebruikt een accountnummer in plaats van een gewone gebruikersnaam als herkenning voor de dienst.",
    },
  };
  const reasons: Record<string, string> = {
    platforms: nl
      ? "Werkt volgens de aanbieder op alle gekozen soorten apparaten."
      : "The provider lists support for every selected device type.",
    devices:
      provider.paidDeviceLimit === null
        ? nl
          ? "De aanbieder noemt geen vaste limiet voor gelijktijdige VPN-verbindingen."
          : "The provider states no fixed limit for simultaneous VPN connections."
        : nl
          ? `Ondersteunt maximaal ${provider.paidDeviceLimit} apparaten tegelijk.`
          : `Supports up to ${provider.paidDeviceLimit} devices at once.`,
    free: nl
      ? "Heeft een echt gratis abonnement; dat ondersteunt één actief apparaat."
      : "Offers a real free plan; it supports one active device.",
    open: nl
      ? "De aanbieder publiceert de broncode van zijn apps."
      : "The provider publishes its app source code.",
    account: nl
      ? "Je logt in met een accountnummer in plaats van een gewone gebruikersnaam."
      : "You sign in with an account number instead of a normal username.",
    restricted: nl
      ? `Beschrijft ${provider.restrictedNetworkTool} voor netwerken die VPN-verkeer blokkeren.`
      : `Documents ${provider.restrictedNetworkTool} for networks that block VPN traffic.`,
    public: nl
      ? "Ondersteunt de gekozen apparaten voor gebruik op gedeelde netwerken."
      : "Supports the selected devices for use on shared networks.",
    privacy: nl
      ? privacyReasons[provider.id].nl
      : privacyReasons[provider.id].en,
    general: nl
      ? "Voldoet aan je gekozen apparaat- en verbindingslimieten."
      : "Meets your selected platform and connection limits.",
  };
  return reasons[key];
}

export function buildVpnFinderResults(
  answers: FinderAnswers,
  providers: FinderProvider[],
  locale: string,
): FinderResult[] {
  const copy = getVpnFinderCopy(locale);
  const requestedPlatforms = answers.platforms ?? [];
  const minimumDevices = requestedDeviceLimit(answers.deviceCount);

  return providers
    .flatMap((provider): FinderResult[] => {
      const activeLimit =
        answers.mustHave === "free"
          ? provider.freeDeviceLimit
          : provider.paidDeviceLimit;

      if (answers.mustHave === "free" && !provider.hasFreePlan) return [];
      if (answers.mustHave === "open-source" && !provider.openSourceApps)
        return [];
      if (answers.mustHave === "minimal-account" && !provider.minimalAccount)
        return [];
      if (
        minimumDevices &&
        (activeLimit === null ? false : activeLimit < minimumDevices)
      )
        return [];
      if (
        requestedPlatforms.some(
          (platform) => !provider.platforms.includes(platform),
        )
      )
        return [];

      const reasons = [localReason(copy.locale, "platforms", provider)];
      const sourceIds = new Set<string>([`${provider.id}-platforms`]);
      let strong = false;

      if (minimumDevices) {
        reasons.push(localReason(copy.locale, "devices", provider));
        sourceIds.add(
          provider.id === "protonvpn"
            ? "proton-paid-devices"
            : `${provider.id}-devices`,
        );
      }
      if (answers.mustHave === "free") {
        reasons.push(localReason(copy.locale, "free", provider));
        sourceIds.add("proton-free");
        strong = true;
      } else if (answers.mustHave === "open-source") {
        reasons.push(localReason(copy.locale, "open", provider));
        sourceIds.add(
          provider.id === "protonvpn"
            ? "proton-open-source"
            : "mullvad-open-source",
        );
        strong = true;
      } else if (answers.mustHave === "minimal-account") {
        reasons.push(localReason(copy.locale, "account", provider));
        sourceIds.add("mullvad-account");
        strong = true;
      }

      if (
        answers.deviceCount === "more-ten" &&
        provider.paidDeviceLimit === null
      ) {
        strong = true;
      }

      if (answers.network === "restricted" || answers.primaryUse === "travel") {
        reasons.push(localReason(copy.locale, "restricted", provider));
        sourceIds.add(`${provider.id}-restricted`);
      } else if (
        answers.network === "public-wifi" ||
        answers.primaryUse === "work"
      ) {
        reasons.push(localReason(copy.locale, "public", provider));
      }

      if (answers.primaryUse === "privacy") {
        reasons.push(localReason(copy.locale, "privacy", provider));
        if (provider.id === "nordvpn" || provider.id === "surfshark")
          sourceIds.add(`${provider.id}-privacy`);
        if (provider.id === "protonvpn") sourceIds.add("proton-open-source");
        if (provider.id === "mullvad") sourceIds.add("mullvad-account");
      } else {
        reasons.push(localReason(copy.locale, "general", provider));
      }

      const limitations = [copy.providerCopy[provider.id].baseLimit];
      if (
        answers.primaryUse === "streaming" ||
        answers.primaryUse === "gaming"
      ) {
        limitations.push(copy.results.noWinner);
      }
      if (answers.network === "restricted") {
        limitations.push(
          copy.locale === "nl"
            ? "Een beschreven blokkadefunctie bewijst niet dat de VPN op jouw netwerk werkt. Test vóórdat je ervan afhankelijk bent."
            : "A documented blocking tool does not prove the VPN will work on your network. Test before you depend on it.",
        );
      }

      return [
        {
          provider,
          fit: strong ? "strong" : "possible",
          reasons: [...new Set(reasons)].slice(0, 4),
          limitations: [...new Set(limitations)].slice(0, 2),
          sourceIds: [...sourceIds],
        },
      ];
    })
    .sort((a, b) => a.provider.name.localeCompare(b.provider.name));
}
