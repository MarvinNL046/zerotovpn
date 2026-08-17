import { getIndexableLocalesForPath } from "@/lib/indexability";

export type GuidesLocale = "en" | "nl";

export type GuideIcon =
  | "book"
  | "devices"
  | "download"
  | "globe"
  | "lock"
  | "network"
  | "phone"
  | "route"
  | "shield"
  | "speed"
  | "stream"
  | "wifi";

export type GuideEntry = {
  id: string;
  path: string;
  icon: GuideIcon;
};

export const GUIDE_ENTRIES = [
  {
    id: "what-is-vpn",
    path: "/guides/what-is-vpn",
    icon: "shield",
  },
  {
    id: "how-vpn-works",
    path: "/guides/how-vpn-works",
    icon: "network",
  },
  {
    id: "public-wifi-safety",
    path: "/guides/public-wifi-safety",
    icon: "wifi",
  },
  {
    id: "vpn-privacy-guide",
    path: "/guides/vpn-privacy-guide",
    icon: "lock",
  },
  {
    id: "vpn-speed-guide",
    path: "/guides/vpn-speed-guide",
    icon: "speed",
  },
  {
    id: "vpn-protocols-explained",
    path: "/guides/vpn-protocols-explained",
    icon: "route",
  },
  {
    id: "vpn-on-mobile",
    path: "/guides/vpn-on-mobile",
    icon: "phone",
  },
  {
    id: "vpn-for-streaming",
    path: "/guides/vpn-for-streaming",
    icon: "stream",
  },
  {
    id: "vpn-for-torrenting",
    path: "/guides/vpn-for-torrenting",
    icon: "download",
  },
  {
    id: "vpn-for-travel",
    path: "/guides/vpn-for-travel",
    icon: "globe",
  },
  {
    id: "vpn-for-restricted-networks",
    path: "/guides/vpn-for-restricted-networks",
    icon: "devices",
  },
  {
    id: "vpn-obfuscation-explained",
    path: "/guides/vpn-obfuscation-explained",
    icon: "book",
  },
] as const satisfies readonly GuideEntry[];

export type GuideId = (typeof GUIDE_ENTRIES)[number]["id"];

export type AdmittedGuideEntry = (typeof GUIDE_ENTRIES)[number] & {
  routeLocale: GuidesLocale;
};

type GuideCopy = {
  title: string;
  summary: string;
  takeaway: string;
  topic: string;
};

type LearningPath = {
  id: string;
  number: string;
  title: string;
  intro: string;
  guideIds: GuideId[];
};

export type GuidesDirectoryCopy = {
  locale: GuidesLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; guides: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    stats: Array<{ value: string; label: string }>;
  };
  jumpLabel: string;
  jumps: Array<{ id: string; label: string }>;
  start: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{
      number: string;
      guideId: GuideId;
      reason: string;
    }>;
  };
  paths: {
    eyebrow: string;
    title: string;
    intro: string;
    items: LearningPath[];
  };
  library: {
    eyebrow: string;
    title: string;
    intro: string;
    readAction: string;
    englishAction: string;
    englishNote: string;
    learnLabel: string;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    points: Array<{ title: string; body: string }>;
    action: string;
  };
  next: {
    eyebrow: string;
    title: string;
    intro: string;
    links: Array<{ title: string; body: string; href: string; action: string }>;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  guides: Record<GuideId, GuideCopy>;
};

const enGuides: Record<GuideId, GuideCopy> = {
  "what-is-vpn": {
    title: "What is a VPN?",
    summary: "Learn what a VPN changes, what it hides and what it cannot do.",
    takeaway: "Know when a VPN is useful before choosing one.",
    topic: "Start here",
  },
  "how-vpn-works": {
    title: "How does a VPN work?",
    summary:
      "Follow your data from your device, through a VPN server, to a website.",
    takeaway: "Understand the tunnel without technical jargon.",
    topic: "Start here",
  },
  "public-wifi-safety": {
    title: "Staying safer on public Wi-Fi",
    summary:
      "Use a simple checklist for cafés, airports, hotels and shared networks.",
    takeaway: "Protect the device and the account, not only the connection.",
    topic: "Privacy",
  },
  "vpn-privacy-guide": {
    title: "VPN privacy guide",
    summary:
      "Read logging claims, ownership and audits without taking marketing at face value.",
    takeaway: "Separate a provider claim from independent evidence.",
    topic: "Privacy",
  },
  "vpn-speed-guide": {
    title: "VPN speed and slow connections",
    summary:
      "Find the likely cause of a slowdown and change one setting at a time.",
    takeaway: "Compare a VPN test with a clean baseline.",
    topic: "Speed & fixes",
  },
  "vpn-protocols-explained": {
    title: "VPN protocols explained",
    summary: "Compare WireGuard, OpenVPN and IKEv2 by use, not by buzzword.",
    takeaway: "Choose a protocol that fits the network and device.",
    topic: "Speed & fixes",
  },
  "vpn-on-mobile": {
    title: "Using a VPN on your phone",
    summary:
      "Set up a VPN on iPhone or Android and check the settings that matter.",
    takeaway:
      "Keep protection practical without draining the battery needlessly.",
    topic: "Devices",
  },
  "vpn-for-streaming": {
    title: "VPNs and streaming",
    summary: "Understand region checks, app limits and why access can change.",
    takeaway: "Treat access as a test result, never as a promise.",
    topic: "Everyday use",
  },
  "vpn-for-torrenting": {
    title: "VPNs and torrenting",
    summary:
      "Learn about kill switches, leaks and the legal rules that still apply.",
    takeaway: "A VPN does not make unlawful sharing lawful.",
    topic: "Privacy",
  },
  "vpn-for-travel": {
    title: "Preparing a VPN for travel",
    summary:
      "Install, update and test before you leave home or enter a restricted network.",
    takeaway: "Prepare a backup plan before the trip.",
    topic: "Restricted networks",
  },
  "vpn-for-restricted-networks": {
    title: "Using a VPN on a restricted network",
    summary:
      "Identify the type of block and run a small, lawful connection test.",
    takeaway: "No VPN can guarantee access on every network.",
    topic: "Restricted networks",
  },
  "vpn-obfuscation-explained": {
    title: "VPN obfuscation explained",
    summary:
      "See what stealth features try to hide and where they can still fail.",
    takeaway: "Check support on your exact app and protocol.",
    topic: "Restricted networks",
  },
};

const nlGuides: Record<GuideId, GuideCopy> = {
  "what-is-vpn": {
    title: "Wat is een VPN?",
    summary:
      "Leer wat een VPN verandert, wat het verbergt en wat het niet kan.",
    takeaway: "Weet wanneer een VPN nuttig is voordat je er één kiest.",
    topic: "Begin hier",
  },
  "how-vpn-works": {
    title: "Hoe werkt een VPN?",
    summary:
      "Volg je data van je apparaat via een VPN-server naar een website.",
    takeaway: "Begrijp de tunnel zonder moeilijke woorden.",
    topic: "Begin hier",
  },
  "public-wifi-safety": {
    title: "Veiliger op openbare wifi",
    summary:
      "Gebruik een korte checklist in cafés, op vliegvelden, in hotels en op gedeelde netwerken.",
    takeaway: "Bescherm je apparaat en account, niet alleen de verbinding.",
    topic: "Privacy",
  },
  "vpn-privacy-guide": {
    title: "Gids over VPN en privacy",
    summary:
      "Lees claims over logs, eigendom en audits zonder reclame zomaar te geloven.",
    takeaway: "Zie het verschil tussen een claim en onafhankelijk bewijs.",
    topic: "Privacy",
  },
  "vpn-speed-guide": {
    title: "VPN-snelheid en trage verbindingen",
    summary:
      "Zoek de waarschijnlijke oorzaak en verander steeds één instelling.",
    takeaway: "Vergelijk een VPN-test met een meting zonder VPN.",
    topic: "Snelheid & oplossen",
  },
  "vpn-protocols-explained": {
    title: "VPN-protocollen uitgelegd",
    summary:
      "Vergelijk WireGuard, OpenVPN en IKEv2 op gebruik, niet op mooie woorden.",
    takeaway: "Kies een protocol dat bij je netwerk en apparaat past.",
    topic: "Snelheid & oplossen",
  },
  "vpn-on-mobile": {
    title: "Een VPN op je telefoon gebruiken",
    summary:
      "Stel een VPN in op iPhone of Android en controleer de belangrijke opties.",
    takeaway:
      "Blijf praktisch beschermd zonder onnodig veel batterij te gebruiken.",
    topic: "Apparaten",
  },
  "vpn-for-streaming": {
    title: "VPN's en streaming",
    summary:
      "Begrijp regiocontroles, app-beperkingen en waarom toegang kan veranderen.",
    takeaway: "Zie toegang als een testresultaat, nooit als een belofte.",
    topic: "Dagelijks gebruik",
  },
  "vpn-for-torrenting": {
    title: "VPN's en torrents",
    summary:
      "Leer over de kill switch, datalekken en de wetten die blijven gelden.",
    takeaway: "Een VPN maakt verboden delen niet legaal.",
    topic: "Privacy",
  },
  "vpn-for-travel": {
    title: "Een VPN voorbereiden voor je reis",
    summary:
      "Installeer, werk bij en test voordat je vertrekt of een beperkt netwerk gebruikt.",
    takeaway: "Maak vóór je reis een reserveplan.",
    topic: "Beperkte netwerken",
  },
  "vpn-for-restricted-networks": {
    title: "Een VPN op een beperkt netwerk gebruiken",
    summary:
      "Herken het soort blokkade en doe een kleine, toegestane verbindingstest.",
    takeaway: "Geen VPN garandeert toegang op elk netwerk.",
    topic: "Beperkte netwerken",
  },
  "vpn-obfuscation-explained": {
    title: "VPN-verkeer verbergen uitgelegd",
    summary:
      "Lees wat stealth-functies proberen te verbergen en waar ze kunnen mislukken.",
    takeaway: "Controleer steun in jouw app en voor jouw protocol.",
    topic: "Beperkte netwerken",
  },
};

export const GUIDES_DIRECTORY_COPY: Record<GuidesLocale, GuidesDirectoryCopy> =
  {
    en: {
      locale: "en",
      meta: {
        title: "VPN Guides: Privacy, Speed & Setup | ZeroToVPN",
        description:
          "Learn VPN basics, privacy, speed fixes, device setup and restricted networks in plain English. Follow a clear path or browse all 12 guides.",
      },
      breadcrumb: { home: "Home", guides: "Guides" },
      hero: {
        eyebrow: "ZeroToVPN knowledge desk",
        title: "Practical VPN guides, in plain language",
        intro:
          "Start with the basics or go straight to a problem. Each guide explains what to check, what can change and what a VPN cannot promise.",
        directAnswer:
          "New to VPNs? Read the three start guides in order. Already have a problem? Pick the learning path that matches it.",
        stats: [
          { value: "12", label: "published guides" },
          { value: "5", label: "clear learning paths" },
          { value: "0", label: "affiliate links on this hub" },
        ],
      },
      jumpLabel: "Jump to a learning path",
      jumps: [
        { id: "start", label: "Start here" },
        { id: "privacy", label: "Privacy" },
        { id: "speed", label: "Speed & fixes" },
        { id: "devices", label: "Devices" },
        { id: "restricted", label: "Restricted networks" },
      ],
      start: {
        eyebrow: "A calm first hour",
        title: "Start with these three guides",
        intro:
          "Read them in order. You will learn the idea first, then the route your data takes, then one useful safety habit.",
        steps: [
          {
            number: "01",
            guideId: "what-is-vpn",
            reason: "Learn the job of a VPN and its limits.",
          },
          {
            number: "02",
            guideId: "how-vpn-works",
            reason: "See what happens after you press Connect.",
          },
          {
            number: "03",
            guideId: "public-wifi-safety",
            reason: "Use the idea on a real shared network.",
          },
        ],
      },
      paths: {
        eyebrow: "Choose your route",
        title: "Five paths, one next step",
        intro:
          "Each path groups guides that answer the same kind of question. You can change paths at any time.",
        items: [
          {
            id: "start",
            number: "01",
            title: "Start here",
            intro: "Build a simple picture of what a VPN does.",
            guideIds: ["what-is-vpn", "how-vpn-works", "public-wifi-safety"],
          },
          {
            id: "privacy",
            number: "02",
            title: "Privacy",
            intro:
              "Check claims, leaks and the risks around shared or P2P traffic.",
            guideIds: [
              "vpn-privacy-guide",
              "public-wifi-safety",
              "vpn-for-torrenting",
            ],
          },
          {
            id: "speed",
            number: "03",
            title: "Speed & fixes",
            intro: "Test a slow connection and choose a fitting protocol.",
            guideIds: ["vpn-speed-guide", "vpn-protocols-explained"],
          },
          {
            id: "devices",
            number: "04",
            title: "Devices",
            intro: "Set up a phone and understand everyday app limits.",
            guideIds: ["vpn-on-mobile", "vpn-for-streaming"],
          },
          {
            id: "restricted",
            number: "05",
            title: "Restricted networks",
            intro:
              "Prepare before travel and test blocks without assuming success.",
            guideIds: [
              "vpn-for-travel",
              "vpn-for-restricted-networks",
              "vpn-obfuscation-explained",
            ],
          },
        ],
      },
      library: {
        eyebrow: "Full library",
        title: "Browse all VPN guides",
        intro:
          "Every card tells you what the guide answers. There are no scores, prices or provider rankings on this page.",
        readAction: "Read guide",
        englishAction: "Read in English",
        englishNote: "English only",
        learnLabel: "You will learn",
      },
      method: {
        eyebrow: "How to read our guides",
        title: "Advice with clear limits",
        intro:
          "VPN features, apps and network blocks can change. Good advice should make that uncertainty easy to see.",
        points: [
          {
            title: "A claim is not proof",
            body: "We name the difference between provider information, a dated source and our own test.",
          },
          {
            title: "Your setup matters",
            body: "The same VPN can act differently by device, app version, server and network.",
          },
          {
            title: "Safety comes first",
            body: "A VPN does not replace updates, strong sign-in security or local laws.",
          },
        ],
        action: "Read our methodology",
      },
      next: {
        eyebrow: "Ready for the next step?",
        title: "Turn what you learned into a check",
        intro:
          "Use a tool, compare two providers or read a review after you know which question you need answered.",
        links: [
          {
            title: "Run a safety check",
            body: "Use our small browser tools for IP, DNS and speed checks.",
            href: "/tools",
            action: "Open the tools",
          },
          {
            title: "Compare providers",
            body: "Put two VPNs side by side without relying on one score.",
            href: "/compare",
            action: "Open comparisons",
          },
          {
            title: "Read a provider review",
            body: "See the evidence and limits behind a single VPN.",
            href: "/reviews",
            action: "Browse reviews",
          },
        ],
      },
      faq: {
        title: "Questions about the guide library",
        items: [
          {
            question: "Which VPN guide should I read first?",
            answer:
              "Start with “What is a VPN?” Then read “How does a VPN work?” and the public Wi-Fi checklist. Together they give you the basic idea and one practical use.",
          },
          {
            question: "Will a VPN make me anonymous?",
            answer:
              "No. A VPN can hide traffic from the local network and replace the IP address a website sees. Accounts, cookies, browser fingerprints and your own actions can still identify you.",
          },
          {
            question: "Does this page contain affiliate links?",
            answer:
              "No. This guide hub only links to ZeroToVPN guides, tools, comparisons, reviews and our methodology.",
          },
          {
            question: "Why are some guides only in English?",
            answer:
              "We only label a guide as Dutch after its copy has been reviewed. Until then, the Dutch hub shows an English label and opens the canonical English page.",
          },
          {
            question: "Can a VPN always work on a restricted network?",
            answer:
              "No. Access can change by country, network, device, app version and moment. Prepare before you travel and never treat access as guaranteed.",
          },
        ],
      },
      guides: enGuides,
    },
    nl: {
      locale: "nl",
      meta: {
        title: "VPN-gidsen: privacy, snelheid en installatie | ZeroToVPN",
        description:
          "Leer in gewone taal over VPN-basis, privacy, snelheid, apparaten en beperkte netwerken. Volg een duidelijk leerpad of bekijk alle 12 gidsen.",
      },
      breadcrumb: { home: "Home", guides: "Gidsen" },
      hero: {
        eyebrow: "ZeroToVPN kennisbank",
        title: "Praktische VPN-gidsen in gewone taal",
        intro:
          "Begin bij de basis of ga meteen naar je probleem. Elke gids vertelt wat je kunt controleren, wat kan veranderen en wat een VPN niet kan beloven.",
        directAnswer:
          "Nieuw met VPN's? Lees de drie startgidsen op volgorde. Heb je al een probleem? Kies dan het leerpad dat erbij past.",
        stats: [
          { value: "12", label: "gepubliceerde gidsen" },
          { value: "5", label: "duidelijke leerpaden" },
          { value: "0", label: "partnerlinks op deze hub" },
        ],
      },
      jumpLabel: "Ga naar een leerpad",
      jumps: [
        { id: "start", label: "Begin hier" },
        { id: "privacy", label: "Privacy" },
        { id: "speed", label: "Snelheid & oplossen" },
        { id: "devices", label: "Apparaten" },
        { id: "restricted", label: "Beperkte netwerken" },
      ],
      start: {
        eyebrow: "Een rustig eerste uur",
        title: "Begin met deze drie gidsen",
        intro:
          "Lees ze op volgorde. Je leert eerst het idee, daarna de route van je data en tot slot één nuttige veiligheidsgewoonte.",
        steps: [
          {
            number: "01",
            guideId: "what-is-vpn",
            reason: "Leer de taak en de grenzen van een VPN.",
          },
          {
            number: "02",
            guideId: "how-vpn-works",
            reason: "Zie wat er gebeurt nadat je op Verbinden drukt.",
          },
          {
            number: "03",
            guideId: "public-wifi-safety",
            reason: "Gebruik het idee op een echt gedeeld netwerk.",
          },
        ],
      },
      paths: {
        eyebrow: "Kies je route",
        title: "Vijf paden, steeds één volgende stap",
        intro:
          "Elk pad groepeert gidsen met hetzelfde soort vraag. Je kunt altijd van pad wisselen.",
        items: [
          {
            id: "start",
            number: "01",
            title: "Begin hier",
            intro: "Bouw een eenvoudig beeld van wat een VPN doet.",
            guideIds: ["what-is-vpn", "how-vpn-works", "public-wifi-safety"],
          },
          {
            id: "privacy",
            number: "02",
            title: "Privacy",
            intro:
              "Controleer claims, lekken en risico's bij gedeeld of P2P-verkeer.",
            guideIds: [
              "vpn-privacy-guide",
              "public-wifi-safety",
              "vpn-for-torrenting",
            ],
          },
          {
            id: "speed",
            number: "03",
            title: "Snelheid & oplossen",
            intro: "Test een trage verbinding en kies een passend protocol.",
            guideIds: ["vpn-speed-guide", "vpn-protocols-explained"],
          },
          {
            id: "devices",
            number: "04",
            title: "Apparaten",
            intro: "Stel een telefoon in en begrijp de grenzen van apps.",
            guideIds: ["vpn-on-mobile", "vpn-for-streaming"],
          },
          {
            id: "restricted",
            number: "05",
            title: "Beperkte netwerken",
            intro:
              "Bereid je reis voor en test blokkades zonder succes te beloven.",
            guideIds: [
              "vpn-for-travel",
              "vpn-for-restricted-networks",
              "vpn-obfuscation-explained",
            ],
          },
        ],
      },
      library: {
        eyebrow: "Volledige kennisbank",
        title: "Bekijk alle VPN-gidsen",
        intro:
          "Elke kaart vertelt welke vraag de gids beantwoordt. Op deze pagina staan geen scores, prijzen of ranglijsten.",
        readAction: "Lees de gids",
        englishAction: "Lees in het Engels",
        englishNote: "Alleen Engels",
        learnLabel: "Dit leer je",
      },
      method: {
        eyebrow: "Zo lees je onze gidsen",
        title: "Advies met duidelijke grenzen",
        intro:
          "VPN-functies, apps en netwerkblokkades kunnen veranderen. Goed advies laat die onzekerheid duidelijk zien.",
        points: [
          {
            title: "Een claim is geen bewijs",
            body: "We noemen het verschil tussen info van een provider, een bron met datum en onze eigen test.",
          },
          {
            title: "Jouw situatie telt",
            body: "Dezelfde VPN kan anders werken per apparaat, app-versie, server en netwerk.",
          },
          {
            title: "Veiligheid komt eerst",
            body: "Een VPN vervangt geen updates, sterke inlogbeveiliging of plaatselijke wetten.",
          },
        ],
        action: "Lees onze werkwijze",
      },
      next: {
        eyebrow: "Klaar voor de volgende stap?",
        title: "Maak van je kennis een controle",
        intro:
          "Gebruik een tool, vergelijk twee providers of lees een review zodra je weet welke vraag je wilt beantwoorden.",
        links: [
          {
            title: "Doe een veiligheidscontrole",
            body: "Gebruik kleine browsertools voor IP-, DNS- en snelheidschecks.",
            href: "/tools",
            action: "Open de tools",
          },
          {
            title: "Vergelijk providers",
            body: "Zet twee VPN's naast elkaar zonder op één score te vertrouwen.",
            href: "/compare",
            action: "Open vergelijkingen",
          },
          {
            title: "Lees een providerreview",
            body: "Bekijk het bewijs en de grenzen achter één VPN.",
            href: "/reviews",
            action: "Bekijk reviews",
          },
        ],
      },
      faq: {
        title: "Vragen over de kennisbank",
        items: [
          {
            question: "Welke VPN-gids lees ik als eerste?",
            answer:
              "Begin met ‘Wat is een VPN?’. Lees daarna ‘Hoe werkt een VPN?’ en de checklist voor openbare wifi. Samen geven ze de basis en één praktische toepassing.",
          },
          {
            question: "Maakt een VPN mij anoniem?",
            answer:
              "Nee. Een VPN kan verkeer voor het lokale netwerk verbergen en je zichtbare IP-adres vervangen. Accounts, cookies, je browser en je eigen gedrag kunnen je nog steeds herkenbaar maken.",
          },
          {
            question: "Staan er partnerlinks op deze pagina?",
            answer:
              "Nee. Deze kennisbank linkt alleen naar ZeroToVPN-gidsen, tools, vergelijkingen, reviews en onze werkwijze.",
          },
          {
            question: "Waarom zijn sommige gidsen alleen Engels?",
            answer:
              "We noemen een gids pas Nederlands nadat de tekst is nagekeken. Tot die tijd toont de Nederlandse hub een Engels label en opent de gewone Engelse pagina.",
          },
          {
            question: "Werkt een VPN altijd op een beperkt netwerk?",
            answer:
              "Nee. Toegang kan veranderen per land, netwerk, apparaat, app-versie en moment. Bereid je reis vooraf voor en zie toegang nooit als een belofte.",
          },
        ],
      },
      guides: nlGuides,
    },
  };

export function getGuideRouteLocale(
  locale: GuidesLocale,
  guideId: GuideId,
): GuidesLocale | null {
  const entry = getGuideEntry(guideId);
  const admittedLocales = getIndexableLocalesForPath(entry.path) ?? [];

  if (admittedLocales.includes(locale)) return locale;
  if (admittedLocales.includes("en")) return "en";
  return null;
}

export function getAvailableGuideEntries(
  locale: GuidesLocale,
): AdmittedGuideEntry[] {
  return GUIDE_ENTRIES.flatMap((entry): AdmittedGuideEntry[] => {
    const routeLocale = getGuideRouteLocale(locale, entry.id);
    return routeLocale ? [{ ...entry, routeLocale }] : [];
  });
}

export function getGuidesDirectoryCopy(
  locale: GuidesLocale,
): GuidesDirectoryCopy {
  const base = GUIDES_DIRECTORY_COPY[locale];
  const entries = getAvailableGuideEntries(locale);
  const admittedGuideIds = new Set(entries.map((entry) => entry.id));
  const startSteps = base.start.steps
    .filter((step) => admittedGuideIds.has(step.guideId))
    .map((step, index) => ({
      ...step,
      number: String(index + 1).padStart(2, "0"),
    }));
  const pathItems = base.paths.items
    .map((path) => ({
      ...path,
      guideIds: path.guideIds.filter((guideId) =>
        admittedGuideIds.has(guideId),
      ),
    }))
    .filter((path) => path.guideIds.length > 0)
    .map((path, index) => ({
      ...path,
      number: String(index + 1).padStart(2, "0"),
    }));
  const visiblePathIds = new Set(pathItems.map((path) => path.id));
  const isDutch = locale === "nl";

  return {
    ...base,
    meta: {
      ...base.meta,
      description: isDutch
        ? `Leer in gewone taal met ${entries.length} gecontroleerde VPN-gidsen over basis, privacy, snelheid en beperkte netwerken.`
        : `Learn VPN basics, privacy, speed fixes and restricted networks in plain English with ${entries.length} reviewed guides.`,
    },
    hero: {
      ...base.hero,
      directAnswer: isDutch
        ? "Nieuw met VPN's? Begin met ‘Wat is een VPN?’. Heb je al een probleem? Kies dan het leerpad dat erbij past."
        : "New to VPNs? Start with “What is a VPN?”. Already have a problem? Pick the learning path that matches it.",
      stats: [
        { ...base.hero.stats[0], value: String(entries.length) },
        { ...base.hero.stats[1], value: String(pathItems.length) },
        base.hero.stats[2],
      ],
    },
    jumps: base.jumps.filter((jump) => visiblePathIds.has(jump.id)),
    start: {
      ...base.start,
      title: isDutch ? "Begin met de basis" : "Start with the foundation",
      intro: isDutch
        ? "Lees eerst de kernuitleg. Daarna kun je gericht verder met privacy, snelheid of beperkte netwerken."
        : "Read the core explanation first. Then continue with privacy, speed or restricted networks when that matches your question.",
      steps: startSteps,
    },
    paths: {
      ...base.paths,
      title: isDutch
        ? `${pathItems.length} paden, steeds één volgende stap`
        : `${pathItems.length} paths, one next step`,
      items: pathItems,
    },
    faq: {
      ...base.faq,
      items: base.faq.items.map((item, index) =>
        index === 0
          ? {
              ...item,
              answer: isDutch
                ? "Begin met ‘Wat is een VPN?’. Kies daarna de privacygids, snelheidsgids of een gids voor beperkte netwerken op basis van je vraag."
                : "Start with “What is a VPN?”. Then choose the privacy guide, speed guide or a restricted-network guide based on your question.",
            }
          : item,
      ),
    },
  };
}

export function getGuideEntry(id: GuideId) {
  const entry = GUIDE_ENTRIES.find((guide) => guide.id === id);
  if (!entry) throw new Error(`Unknown guide id: ${id}`);
  return entry;
}
