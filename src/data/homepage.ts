import { asianHomepageCopies } from "./homepage-locales-asian";
import { westernHomepageCopies } from "./homepage-locales-western";

export interface HomepageStoryCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface HomepageUseCaseCopy {
  label: string;
  description: string;
}

export interface HomepageEditorialCopy {
  providerSuppliedLabel: string;
  protectionBar: {
    checking: string;
    visibleIp: string;
    localPreview: string;
    estimatedLocation: string;
    network: string;
    unavailable: string;
    disclaimer: string;
    cta: string;
    partner: string;
    review: string;
  };
  announcement: { label: string; text: string; cta: string };
  lead: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    alt: string;
  };
  supportingStories: HomepageStoryCopy[];
  trendingTitle: string;
  trending: HomepageStoryCopy[];
  freshness: { updated: string; methodology: string; disclosure: string };
  useCasesTitle: string;
  useCases: HomepageUseCaseCopy[];
  picks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclosure: string;
    score: string;
    bestFor: string;
    strength: string;
    limitation: string;
    review: string;
    visit: string;
    methodology: string;
    providerDetails: Record<
      string,
      { bestFor: string; strength: string; limitation: string }
    >;
  };
  comparison: {
    eyebrow: string;
    title: string;
    subtitle: string;
    caption: string;
    headers: {
      provider: string;
      rating: string;
      privacy: string;
      speed: string;
      streaming: string;
      fit: string;
      action: string;
    };
    fit: Record<string, string>;
  };
  methodology: {
    eyebrow: string;
    title: string;
    description: string;
    featuredProviders: string;
    scoreFactors: string;
    commissionWeight: string;
    chartTitle: string;
    chartNote: string;
    published: string;
    weights: {
      speed: string;
      logging: string;
      streaming: string;
      latency: string;
      audit: string;
    };
    cta: string;
    howWeTest: string;
  };
  latest: {
    eyebrow: string;
    title: string;
    all: string;
    items: HomepageStoryCopy[];
  };
  finder: {
    eyebrow: string;
    title: string;
    description: string;
    tags: string[];
    cta: string;
    note: string;
  };
  tools: { eyebrow: string; title: string; items: string[] };
  newsletter: { eyebrow: string; title: string; description: string };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
}

const english: HomepageEditorialCopy = {
  providerSuppliedLabel: "Provider-supplied visual",
  protectionBar: {
    checking: "Checking your public network address…",
    visibleIp: "Websites currently see this public IP",
    localPreview: "Local preview",
    estimatedLocation: "Estimated location",
    network: "Network",
    unavailable: "Your public IP could not be checked.",
    disclaimer:
      "This check cannot determine whether a VPN is active. With a VPN, websites usually see the VPN server's IP.",
    cta: "Open the IP checker",
    partner: "",
    review: "Open the IP checker",
  },
  announcement: {
    label: "Research register",
    text: "See which claims have sources, outside checks or an open test gap.",
    cta: "Open the register",
  },
  lead: {
    eyebrow: "Clear VPN guidance",
    title: "Choose a VPN without relying on mystery scores.",
    description:
      "Compare what providers say, what outside checks found and what still needs the same fair test.",
    cta: "Compare three starting points",
    alt: "Laptop, router and phone in a ZeroToVPN editorial workspace",
  },
  supportingStories: [
    {
      eyebrow: "Guide",
      title: "Understand VPN speed before you compare providers",
      description: "Learn what one speed test can and cannot tell you.",
    },
    {
      eyebrow: "Provider review",
      title: "NordVPN: our latest evidence-led review",
      description: "Strengths, limits and the current product record.",
    },
    {
      eyebrow: "Head to head",
      title: "NordVPN vs Surfshark: the supported differences",
      description:
        "Compare devices, prices and evidence without a fake winner.",
    },
  ],
  trendingTitle: "Trending now",
  trending: [
    { eyebrow: "Country", title: "Can a VPN protect you in Iran?" },
    { eyebrow: "Privacy", title: "What a VPN hides — and what it does not" },
    {
      eyebrow: "Finder",
      title: "Which VPN fits the way you use the internet?",
    },
    {
      eyebrow: "Reviews",
      title: "Browse reviews with sources and limitations",
    },
    { eyebrow: "Explainer", title: "Why VPN speed changes when you test it" },
  ],
  freshness: {
    updated: "Research reviewed",
    methodology: "Sources, dates and open gaps shown",
    disclosure:
      "Some provider links can earn us a commission. That does not turn a claim into evidence.",
  },
  useCasesTitle: "What do you need a VPN for?",
  useCases: [
    {
      label: "Speed and streaming",
      description: "Measure first, then compare like for like",
    },
    { label: "Privacy", description: "Logging, ownership and leak protection" },
    {
      label: "Find your match",
      description: "Start with your devices, budget and main use",
    },
    {
      label: "Read reviews",
      description: "Sources, limits and open test gaps",
    },
  ],
  picks: {
    eyebrow: "Decision shortlist",
    title: "Three VPNs to compare first",
    subtitle:
      "Three starting points, each with an explicit strength and limitation.",
    disclosure:
      "Commercial section · provider links are marked. The three starting points are shown alphabetically, not ranked.",
    score: "Evidence snapshot",
    bestFor: "Best for",
    strength: "Why it stands out",
    limitation: "Keep in mind",
    review: "Read review",
    visit: "Check current plan",
    methodology: "How we check claims",
    providerDetails: {
      nordvpn: {
        bestFor: "Apps for well-known devices",
        strength:
          "NordVPN documents apps for common devices and a 10-device limit.",
        limitation:
          "Check the total price, renewal terms and the features on your device.",
      },
      surfshark: {
        bestFor: "Households with many devices",
        strength: "Surfshark documents unlimited simultaneous connections.",
        limitation: "Unlimited devices do not prove better speed or privacy.",
      },
      protonvpn: {
        bestFor: "A free starting point and open-source apps",
        strength:
          "Proton publishes app source code and offers a limited free plan.",
        limitation:
          "Free-plan devices, locations and features are more limited.",
      },
    },
  },
  comparison: {
    eyebrow: "Compare the evidence",
    title: "The shortlist at a glance",
    subtitle:
      "Start with the supported difference. Open the full page for its source and limitation.",
    caption: "Unranked comparison of three VPN starting points",
    headers: {
      provider: "VPN",
      rating: "Evidence",
      privacy: "Claim source",
      speed: "Test status",
      streaming: "Main limit",
      fit: "Best fit",
      action: "Next step",
    },
    fit: {
      nordvpn: "Balanced feature set",
      surfshark: "Many household devices",
      protonvpn: "Free start and open-source apps",
    },
  },
  methodology: {
    eyebrow: "How we test",
    title: "Recommendations need an audit trail.",
    description:
      "We separate provider statements, outside checks and our own repeatable tests. Missing evidence stays visible instead of becoming a score.",
    featuredProviders: "equal provider starting points",
    scoreFactors: "evidence layers",
    commissionWeight: "invented overall scores",
    chartTitle: "Three evidence layers",
    chartNote:
      "A source can support one narrow statement. It does not prove every feature, server or future result.",
    published: "Limits included",
    weights: {
      speed: "Our own results need the same device, route and date",
      logging: "Provider statements are labelled as provider information",
      streaming: "Access claims stay unverified without a fresh matched run",
      latency: "Unknown results remain unknown",
      audit: "Outside checks show who checked what and when",
    },
    cta: "Open the methodology",
    howWeTest: "See how we test",
  },
  latest: {
    eyebrow: "From the research desk",
    title: "Guides checked for English and Dutch readers",
    all: "Browse all articles",
    items: [
      {
        eyebrow: "Start here",
        title: "What is a VPN, and what does it not do?",
        description:
          "A plain-language guide to the tunnel, limits and common uses.",
      },
      {
        eyebrow: "Country guide",
        title: "VPNs in the Netherlands: rules, privacy and practical checks",
        description:
          "Current official sources without a made-up country score.",
      },
      {
        eyebrow: "Privacy",
        title: "How to read a VPN privacy policy",
        description:
          "Check data categories, audits, ownership and app behavior.",
      },
      {
        eyebrow: "Speed",
        title: "How to compare VPN speed fairly",
        description:
          "Use the same device, route and test conditions each time.",
      },
    ],
  },
  finder: {
    eyebrow: "VPN Finder",
    title: "Find a better fit in about 60 seconds.",
    description:
      "Answer a few practical questions. We match your priorities to the same provider fields used across our comparisons.",
    tags: ["Privacy", "Streaming", "Travel", "Budget", "Devices"],
    cta: "Start the VPN Finder",
    note: "Useful results first. Email is optional after the recommendation.",
  },
  tools: {
    eyebrow: "Free tools",
    title: "Check your connection before you buy anything.",
    items: [
      "What is my IP?",
      "DNS check guide",
      "Speed test",
      "Research register",
    ],
  },
  newsletter: {
    eyebrow: "Stay informed",
    title: "Useful research updates, not daily noise.",
    description:
      "Get source updates, plain-language explainers and new test notes. Unsubscribe at any time.",
  },
  faqTitle: "VPN questions, answered carefully",
  faqs: [
    {
      question: "What does a VPN actually protect?",
      answer:
        "A VPN encrypts traffic between your device and the VPN server and replaces the IP address websites normally see. It does not make you anonymous, remove malware or replace HTTPS and good account security.",
    },
    {
      question: "How does ZeroToVPN compare providers?",
      answer:
        "We compare the same decision point with the same kind of evidence. If a fair test or current source is missing, we show the gap instead of inventing a winner.",
    },
    {
      question: "Are free VPNs always unsafe?",
      answer:
        "No, but the trade-offs vary. Check the business model, data limits, logging policy, audits and app permissions. A reputable limited free tier can be useful; an unknown unlimited service deserves extra scrutiny.",
    },
    {
      question: "Do affiliate links change the recommendations?",
      answer:
        "They should not. Commercial links are labelled and use sponsored attributes. A commission does not count as evidence and must not decide the order or conclusion.",
    },
  ],
};

const dutch: HomepageEditorialCopy = {
  ...english,
  providerSuppliedLabel: "Beeld aangeleverd door provider",
  protectionBar: {
    checking: "Je openbare netwerkadres wordt gecontroleerd…",
    visibleIp: "Websites zien momenteel dit openbare IP-adres",
    localPreview: "Lokale preview",
    estimatedLocation: "Geschatte locatie",
    network: "Netwerk",
    unavailable: "Je openbare IP-adres kon niet worden gecontroleerd.",
    disclaimer:
      "Deze controle kan niet vaststellen of een VPN actief is. Met een VPN zien websites meestal het IP-adres van de VPN-server.",
    cta: "Open de IP-checker",
    partner: "",
    review: "Open de IP-checker",
  },
  announcement: {
    label: "Onderzoeksregister",
    text: "Bekijk welke claims een bron, externe controle of open testgat hebben.",
    cta: "Open het register",
  },
  lead: {
    eyebrow: "Duidelijke VPN-hulp",
    title: "Kies een VPN zonder vage totaalscores.",
    description:
      "Vergelijk wat aanbieders zeggen, wat extern is gecontroleerd en wat nog dezelfde eerlijke test nodig heeft.",
    cta: "Vergelijk drie startpunten",
    alt: "Laptop, router en telefoon in de redactionele werkplek van ZeroToVPN",
  },
  supportingStories: [
    {
      eyebrow: "Gids",
      title: "Begrijp VPN-snelheid voordat je aanbieders vergelijkt",
      description: "Lees wat één snelheidstest wel en niet kan vertellen.",
    },
    {
      eyebrow: "Providerreview",
      title: "NordVPN: onze nieuwste evidence-led review",
      description: "Sterke punten, beperkingen en het actuele productdossier.",
    },
    {
      eyebrow: "Vergelijking",
      title: "NordVPN vs Surfshark: de onderbouwde verschillen",
      description: "Vergelijk apparaten, prijzen en bewijs zonder nepwinnaar.",
    },
  ],
  trendingTitle: "Nu populair",
  trending: [
    { eyebrow: "Land", title: "Kan een VPN je beschermen in Iran?" },
    { eyebrow: "Privacy", title: "Wat een VPN verbergt — en wat niet" },
    { eyebrow: "Keuzehulp", title: "Welke VPN past bij jouw internetgebruik?" },
    { eyebrow: "Reviews", title: "Bekijk reviews met bronnen en beperkingen" },
    {
      eyebrow: "Uitleg",
      title: "Waarom VPN-snelheid verandert tijdens een test",
    },
  ],
  freshness: {
    updated: "Onderzoek beoordeeld",
    methodology: "Bronnen, datums en open gaten zichtbaar",
    disclosure:
      "Sommige providerlinks kunnen commissie opleveren. Dat maakt een claim nog geen bewijs.",
  },
  useCasesTitle: "Waarvoor heb jij een VPN nodig?",
  useCases: [
    {
      label: "Snelheid en streaming",
      description: "Meet eerst en vergelijk daarna eerlijk",
    },
    { label: "Privacy", description: "Logs, eigendom en lekbeveiliging" },
    {
      label: "Vind jouw match",
      description: "Begin bij apparaten, budget en gebruik",
    },
    {
      label: "Lees reviews",
      description: "Bronnen, grenzen en open testgaten",
    },
  ],
  picks: {
    eyebrow: "Beslisshortlist",
    title: "Drie VPN's om eerst te vergelijken",
    subtitle:
      "Drie goede startpunten, ieder met een duidelijke kracht en beperking.",
    disclosure:
      "Commerciële sectie · providerlinks zijn gemarkeerd. De drie startpunten staan alfabetisch en vormen geen ranglijst.",
    score: "Bewijsmomentopname",
    bestFor: "Beste voor",
    strength: "Waarom deze opvalt",
    limitation: "Houd rekening met",
    review: "Lees review",
    visit: "Bekijk actueel abonnement",
    methodology: "Zo controleren we claims",
    providerDetails: {
      nordvpn: {
        bestFor: "Apps voor computer, telefoon en tv",
        strength:
          "NordVPN beschrijft apps voor Windows, macOS, Android, iPhone, Linux en tv, met maximaal 10 gelijktijdige verbindingen.",
        limitation:
          "Controleer totaalprijs, verlenging en functies op jouw apparaat.",
      },
      surfshark: {
        bestFor: "Huishoudens met veel apparaten",
        strength: "Surfshark beschrijft onbeperkt gelijktijdige verbindingen.",
        limitation:
          "Onbeperkte apparaten bewijzen geen betere snelheid of privacy.",
      },
      protonvpn: {
        bestFor: "Gratis starten en apps met openbare broncode",
        strength:
          "Proton publiceert appcode en biedt een beperkte gratis versie.",
        limitation:
          "De gratis versie heeft minder apparaten, locaties en functies.",
      },
    },
  },
  comparison: {
    eyebrow: "Vergelijk het bewijs",
    title: "De shortlist in één oogopslag",
    subtitle:
      "Begin bij het onderbouwde verschil. Open de volledige pagina voor bron en beperking.",
    caption: "Vergelijking zonder rangorde van drie VPN-startpunten",
    headers: {
      provider: "VPN",
      rating: "Bewijs",
      privacy: "Soort bron",
      speed: "Teststatus",
      streaming: "Belangrijkste grens",
      fit: "Past bij",
      action: "Volgende stap",
    },
    fit: {
      nordvpn: "Apps voor computer, telefoon en tv",
      surfshark: "Veel apparaten in één huishouden",
      protonvpn: "Gratis starten en apps met openbare broncode",
    },
  },
  methodology: {
    eyebrow: "Zo testen we",
    title: "Een aanbeveling heeft een controleerbaar spoor nodig.",
    description:
      "We scheiden informatie van aanbieders, externe controles en eigen herhaalbare tests. Ontbrekend bewijs blijft zichtbaar en wordt geen score.",
    featuredProviders: "gelijke providerstartpunten",
    scoreFactors: "bewijssoorten",
    commissionWeight: "verzonnen totaalscores",
    chartTitle: "Drie soorten bewijs",
    chartNote:
      "Een bron kan één kleine uitspraak steunen. Ze bewijst niet elke functie, server of toekomstige uitslag.",
    published: "Grenzen inbegrepen",
    weights: {
      speed:
        "Eigen resultaten vragen hetzelfde apparaat, dezelfde route en datum",
      logging: "Uitspraken van aanbieders krijgen het label providerinformatie",
      streaming: "Toegang blijft onzeker zonder een nieuwe gelijke test",
      latency: "Onbekende resultaten blijven onbekend",
      audit: "Externe controles tonen wie wat wanneer bekeek",
    },
    cta: "Open de methodologie",
    howWeTest: "Bekijk hoe we testen",
  },
  latest: {
    eyebrow: "Van de onderzoeksdesk",
    title: "Gidsen gecontroleerd voor Nederlands en Engels",
    all: "Bekijk alle artikelen",
    items: [
      {
        eyebrow: "Begin hier",
        title: "Wat is een VPN en wat doet hij niet?",
        description:
          "Een eenvoudige gids over de tunnel, grenzen en normaal gebruik.",
      },
      {
        eyebrow: "Landengids",
        title: "VPN's in Nederland: regels, privacy en praktische controles",
        description: "Actuele officiële bronnen zonder verzonnen landenscore.",
      },
      {
        eyebrow: "Privacy",
        title: "Zo lees je een VPN-privacybeleid",
        description: "Controleer gegevens, audits, eigendom en appgedrag.",
      },
      {
        eyebrow: "Snelheid",
        title: "Zo vergelijk je VPN-snelheid eerlijk",
        description: "Gebruik steeds hetzelfde apparaat, route en testmoment.",
      },
    ],
  },
  finder: {
    eyebrow: "VPN Finder",
    title: "Vind binnen ongeveer 60 seconden een betere match.",
    description:
      "Beantwoord een paar praktische vragen. We koppelen je prioriteiten aan dezelfde providervelden als in onze vergelijkingen.",
    tags: ["Privacy", "Streaming", "Reizen", "Budget", "Apparaten"],
    cta: "Start de VPN Finder",
    note: "Eerst een bruikbaar resultaat. E-mail is pas daarna optioneel.",
  },
  tools: {
    eyebrow: "Gratis tools",
    title: "Controleer je verbinding voordat je iets koopt.",
    items: [
      "Wat is mijn IP?",
      "DNS-controlegids",
      "Snelheidstest",
      "Onderzoeksregister",
    ],
  },
  newsletter: {
    eyebrow: "Blijf op de hoogte",
    title: "Nuttige onderzoeksupdates, geen dagelijkse ruis.",
    description:
      "Ontvang bronupdates, duidelijke uitleg en nieuwe testnotities. Uitschrijven kan altijd.",
  },
  faqTitle: "VPN-vragen, zorgvuldig beantwoord",
  faqs: [
    {
      question: "Wat beschermt een VPN werkelijk?",
      answer:
        "Een VPN versleutelt verkeer tussen je apparaat en de VPN-server en vervangt het IP-adres dat websites normaal zien. Het maakt je niet anoniem, verwijdert geen malware en vervangt HTTPS en goede accountbeveiliging niet.",
    },
    {
      question: "Hoe vergelijkt ZeroToVPN providers?",
      answer:
        "We vergelijken hetzelfde beslispunt met hetzelfde soort bewijs. Ontbreekt een eerlijke test of actuele bron, dan tonen we het gat in plaats van een winnaar te verzinnen.",
    },
    {
      question: "Zijn gratis VPN's altijd onveilig?",
      answer:
        "Nee, maar de concessies verschillen. Controleer het verdienmodel, datalimieten, logbeleid, audits en appmachtigingen. Een beperkte gratis versie van een betrouwbare provider kan nuttig zijn; een onbekende onbeperkte dienst vraagt extra controle.",
    },
    {
      question: "Veranderen affiliate links de aanbevelingen?",
      answer:
        "Dat horen ze niet te doen. Commerciële links zijn gemarkeerd en hebben sponsored-attributen. Een commissie is geen bewijs en mag de volgorde of conclusie niet bepalen.",
    },
  ],
};

export function getHomepageEditorialCopy(
  locale: string,
): HomepageEditorialCopy {
  const localizedCopies: Record<string, HomepageEditorialCopy> = {
    en: english,
    nl: dutch,
    ...westernHomepageCopies,
    ...asianHomepageCopies,
  };

  return localizedCopies[locale] ?? english;
}
