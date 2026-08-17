export type ReviewsDirectoryLocale = "en" | "nl";

export type ReviewTopic =
  "all" | "multi-device" | "privacy" | "free" | "advanced" | "risk";

export type ReviewDirectoryEntry = {
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  reviewedAt: string;
  reviewedAtLabel: string;
  languages: ReviewsDirectoryLocale[];
  topics: Exclude<ReviewTopic, "all">[];
  eyebrow: string;
  summary: string;
  evidence: string;
  limitation: string;
  action: string;
  languageNote: string;
  searchTerms: string[];
};

export type ReviewsDirectoryCopy = {
  locale: ReviewsDirectoryLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; reviews: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    cues: string[];
    ledgerTitle: string;
    ledger: Array<{
      label: string;
      value: string;
      tone: "lime" | "blue" | "amber";
    }>;
  };
  directory: {
    eyebrow: string;
    title: string;
    intro: string;
    searchLabel: string;
    searchPlaceholder: string;
    filters: Array<{ id: ReviewTopic; label: string }>;
    resultSingular: string;
    resultPlural: string;
    clear: string;
    noResultsTitle: string;
    noResultsBody: string;
    evidenceLabel: string;
    limitationLabel: string;
  };
  boundary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
    methodology: string;
  };
  pathways: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  faq: { title: string; items: Array<{ question: string; answer: string }> };
  newsletter: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    action: string;
    consent: string;
  };
  entries: ReviewDirectoryEntry[];
};

const shared = [
  {
    slug: "nordvpn",
    name: "NordVPN",
    logo: "/logos/nordvpn.svg",
    logoWidth: 142,
    logoHeight: 32,
    reviewedAt: "2026-08-14",
    languages: ["en", "nl"] as ReviewsDirectoryLocale[],
    topics: ["multi-device", "privacy"] as const,
  },
  {
    slug: "surfshark",
    name: "Surfshark",
    logo: "/logos/surfshark.svg",
    logoWidth: 137,
    logoHeight: 32,
    reviewedAt: "2026-08-13",
    languages: ["en"] as ReviewsDirectoryLocale[],
    topics: ["multi-device", "privacy"] as const,
  },
  {
    slug: "protonvpn",
    name: "Proton VPN",
    logo: "/logos/protonvpn.svg",
    logoWidth: 36,
    logoHeight: 36,
    reviewedAt: "2026-08-13",
    languages: ["en"] as ReviewsDirectoryLocale[],
    topics: ["privacy", "free"] as const,
  },
  {
    slug: "airvpn",
    name: "AirVPN",
    logo: "/logos/airvpn.png",
    logoWidth: 363,
    logoHeight: 59,
    reviewedAt: "2026-08-13",
    languages: ["en"] as ReviewsDirectoryLocale[],
    topics: ["privacy", "advanced"] as const,
  },
  {
    slug: "urban-vpn",
    name: "Urban VPN",
    logo: "/logos/urban-vpn.svg",
    logoWidth: 200,
    logoHeight: 40,
    reviewedAt: "2026-08-13",
    languages: ["en"] as ReviewsDirectoryLocale[],
    topics: ["free", "risk"] as const,
  },
] satisfies Array<{
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  reviewedAt: string;
  languages: ReviewsDirectoryLocale[];
  topics: readonly Exclude<ReviewTopic, "all">[];
}>;

const enEntries: ReviewDirectoryEntry[] = [
  {
    ...shared[0],
    topics: [...shared[0].topics],
    reviewedAtLabel: "Reviewed 14 August 2026",
    eyebrow: "Mainstream multi-device VPN",
    summary:
      "A close look at NordVPN's apps, device limit, privacy claims, plan terms and the checks still worth doing yourself.",
    evidence: "Provider documentation and a dated external no-logs assessment.",
    limitation: "A fresh ZeroToVPN speed and streaming test is still needed.",
    action: "Read the NordVPN review",
    languageNote: "Available in English and Dutch",
    searchTerms: ["devices", "no logs", "apps", "household"],
  },
  {
    ...shared[1],
    topics: [...shared[1].topics],
    reviewedAtLabel: "Reviewed 13 August 2026",
    eyebrow: "Unlimited connections",
    summary:
      "A review of Surfshark's unlimited-device claim, privacy evidence, app coverage and plan conditions.",
    evidence: "Provider documentation and dated privacy-assurance material.",
    limitation:
      "Route performance and streaming access need a new matched test.",
    action: "Read the Surfshark review",
    languageNote: "English review",
    searchTerms: ["unlimited", "household", "devices", "no logs"],
  },
  {
    ...shared[2],
    topics: [...shared[2].topics],
    reviewedAtLabel: "Reviewed 13 August 2026",
    eyebrow: "Privacy and a free starting point",
    summary:
      "A review of Proton VPN's free plan, open-source apps, privacy position and paid-plan boundaries.",
    evidence:
      "Official plan and app documentation, with clear source boundaries.",
    limitation:
      "Current performance and plan-specific access still need direct checks.",
    action: "Read the Proton VPN review",
    languageNote: "English review",
    searchTerms: ["free", "open source", "privacy", "proton"],
  },
  {
    ...shared[3],
    topics: [...shared[3].topics],
    reviewedAtLabel: "Reviewed 13 August 2026",
    eyebrow: "Advanced controls",
    summary:
      "A review of AirVPN's port-forwarding options, open-source client, Network Lock and usability trade-offs.",
    evidence:
      "Provider documentation and inspectable open-source client material.",
    limitation: "No independent no-logs assessment is treated as proven here.",
    action: "Read the AirVPN review",
    languageNote: "English review",
    searchTerms: ["port forwarding", "advanced", "open source", "network lock"],
  },
  {
    ...shared[4],
    topics: [...shared[4].topics],
    reviewedAtLabel: "Reviewed 13 August 2026",
    eyebrow: "Free service with privacy questions",
    summary:
      "A cautious review of Urban VPN's free model, privacy terms, app permissions and safer decision checks.",
    evidence:
      "Current first-party terms separated from dated third-party reporting.",
    limitation:
      "We do not treat a free price as evidence that the service is safe.",
    action: "Read the Urban VPN review",
    languageNote: "English review",
    searchTerms: ["free", "risk", "privacy policy", "urban"],
  },
];

const nlEntries: ReviewDirectoryEntry[] = enEntries.map((entry, index) => {
  const translations = [
    {
      eyebrow: "Bekende VPN voor meerdere apparaten",
      summary:
        "Een zorgvuldige blik op de apps, apparaatlimiet, privacyclaims, voorwaarden en controles die je nog zelf moet doen.",
      evidence:
        "Informatie van NordVPN en een gedateerde externe no-logs-controle.",
      limitation:
        "Een nieuwe ZeroToVPN-test van snelheid en streaming ontbreekt nog.",
      action: "Lees de NordVPN-review",
      languageNote: "Beschikbaar in het Nederlands en Engels",
    },
    {
      eyebrow: "Onbeperkt aantal verbindingen",
      summary:
        "Een review van Surfsharks claim over onbeperkte apparaten, privacybewijs, apps en abonnementsvoorwaarden.",
      evidence:
        "Informatie van Surfshark en gedateerde stukken over de privacycontrole.",
      limitation:
        "Snelheid en streaming moeten opnieuw met dezelfde test worden vergeleken.",
      action: "Lees de Surfshark-review",
      languageNote: "Engelstalige review",
    },
    {
      eyebrow: "Privacy en een gratis start",
      summary:
        "Een review van het gratis abonnement, de openbare appcode, het privacybeleid en de grenzen van betaalde plannen.",
      evidence:
        "Officiële informatie over abonnementen en apps, met duidelijke bronlabels.",
      limitation:
        "Actuele prestaties en toegang per abonnement vragen nog een directe controle.",
      action: "Lees de Proton VPN-review",
      languageNote: "Engelstalige review",
    },
    {
      eyebrow: "Instellingen voor gevorderden",
      summary:
        "Een review van port forwarding, de openbare appcode, Network Lock en de minder eenvoudige bediening.",
      evidence: "Informatie van AirVPN en controleerbare openbare appcode.",
      limitation:
        "Een onafhankelijke controle van het no-logs-beleid is hier niet bewezen.",
      action: "Lees de AirVPN-review",
      languageNote: "Engelstalige review",
    },
    {
      eyebrow: "Gratis dienst met privacyvragen",
      summary:
        "Een voorzichtige review van het gratis model, de privacyregels, apprechten en veiligere keuzecontroles.",
      evidence:
        "Actuele voorwaarden van Urban VPN, apart van ouder onderzoek van anderen.",
      limitation: "Een gratis prijs bewijst niet dat een dienst veilig is.",
      action: "Lees de Urban VPN-review",
      languageNote: "Engelstalige review",
    },
  ][index];

  return {
    ...entry,
    ...translations,
    reviewedAtLabel:
      index === 0
        ? "Beoordeeld op 14 augustus 2026"
        : "Beoordeeld op 13 augustus 2026",
  };
});

const copies: Record<ReviewsDirectoryLocale, ReviewsDirectoryCopy> = {
  en: {
    locale: "en",
    meta: {
      title: "VPN Reviews: Evidence, Limits & Current Checks",
      description:
        "Browse evidence-led VPN reviews with clear source labels, review dates and test limits. Compare what is documented, what remains unknown and what to check next.",
    },
    breadcrumb: { home: "Home", reviews: "Reviews" },
    hero: {
      eyebrow: "Independent review library",
      title: "VPN reviews without mystery scores",
      intro:
        "Find the review that answers your question. Every card shows what the evidence covers, what remains uncertain and when the page was checked.",
      directAnswer:
        "Start with the provider you are considering. Read the limitation before any price or signup link, and compare the current checkout terms yourself.",
      cues: [
        "No paid placement in the order",
        "Sources and dates shown",
        "Unknown stays unknown",
      ],
      ledgerTitle: "Directory snapshot",
      ledger: [
        { label: "Evidence-led reviews", value: "5", tone: "blue" },
        { label: "Dutch reviews", value: "1", tone: "lime" },
        { label: "Invented scores", value: "0", tone: "lime" },
        { label: "Latest review check", value: "14 Aug 2026", tone: "amber" },
      ],
    },
    directory: {
      eyebrow: "Choose a review",
      title: "What do you want to check?",
      intro:
        "Search by provider or filter by the question you care about. The order is editorial and does not depend on commission.",
      searchLabel: "Search VPN reviews",
      searchPlaceholder: "Search a provider or topic",
      filters: [
        { id: "all", label: "All reviews" },
        { id: "multi-device", label: "Devices" },
        { id: "privacy", label: "Privacy" },
        { id: "free", label: "Free options" },
        { id: "advanced", label: "Advanced controls" },
        { id: "risk", label: "Risk checks" },
      ],
      resultSingular: "review shown",
      resultPlural: "reviews shown",
      clear: "Clear filters",
      noResultsTitle: "No matching review yet",
      noResultsBody: "Try another provider name or clear the topic filter.",
      evidenceLabel: "What the review uses",
      limitationLabel: "Main limitation",
    },
    boundary: {
      eyebrow: "How to read our reviews",
      title: "A review is a dated decision aid, not a permanent guarantee",
      intro:
        "VPN apps, prices and network routes change. We separate provider information, external checks and our own repeatable tests so one source never looks stronger than it is.",
      items: [
        {
          title: "Provider information",
          body: "Useful for documented features and terms, but still the provider's own statement.",
        },
        {
          title: "External checks",
          body: "Useful when the assessor, date and scope are clear. They remain a point-in-time check.",
        },
        {
          title: "Our tests",
          body: "Only published as a result when the setup, date and repeatable run details are available.",
        },
      ],
      methodology: "Read how we review VPN evidence",
    },
    pathways: {
      eyebrow: "Not ready for a provider review?",
      title: "Start with the decision you need to make",
      items: [
        {
          title: "Compare two VPNs",
          body: "See differences side by side without pretending there is one winner for everyone.",
          href: "/compare",
          action: "Open comparisons",
        },
        {
          title: "Find a shortlist",
          body: "Answer five questions and see which documented requirements match.",
          href: "/quiz",
          action: "Use the VPN finder",
        },
        {
          title: "Learn the basics",
          body: "Understand what a VPN changes—and what it does not hide.",
          href: "/guides/how-vpn-works",
          action: "Read the visual guide",
        },
      ],
    },
    faq: {
      title: "VPN review questions",
      items: [
        {
          question: "Do providers pay for a higher position?",
          answer:
            "No. Commercial relationships do not determine the order. Provider links can earn us a commission, but the evidence and limitations are written first.",
        },
        {
          question: "Why do some reviews have no score?",
          answer:
            "A score suggests precision. We only show one when the current method, test records and evidence support it. Otherwise we explain the decision without inventing a number.",
        },
        {
          question: "Why are some reviews only in English?",
          answer:
            "Only the NordVPN review currently has full English and Dutch editorial parity. Other cards open the English review instead of pretending an automatic translation was checked.",
        },
        {
          question: "How often can a VPN review change?",
          answer:
            "Whenever apps, ownership, prices, policies or test results materially change. Every review shows its own checked date and limitations.",
        },
      ],
    },
    newsletter: {
      eyebrow: "The Privacy Brief",
      title: "Get meaningful review updates",
      body: "One clear email when evidence, plan terms or repeatable test results materially change.",
      email: "Your email address",
      action: "Subscribe",
      consent: "I agree to receive emails and can unsubscribe at any time.",
    },
    entries: enEntries,
  },
  nl: {
    locale: "nl",
    meta: {
      title: "VPN-reviews: bewijs, grenzen en actuele checks",
      description:
        "Bekijk VPN-reviews met duidelijke bronlabels, controledatums en testgrenzen. Vergelijk wat is vastgelegd, wat onbekend blijft en wat je zelf controleert.",
    },
    breadcrumb: { home: "Start", reviews: "Reviews" },
    hero: {
      eyebrow: "Onafhankelijke reviewbibliotheek",
      title: "VPN-reviews zonder mysterieuze cijfers",
      intro:
        "Vind de review die jouw vraag beantwoordt. Elke kaart toont welk bewijs er is, wat onzeker blijft en wanneer de pagina is gecontroleerd.",
      directAnswer:
        "Begin bij de aanbieder die je overweegt. Lees de belangrijkste beperking vóór een prijs- of aanmeldlink en controleer zelf de actuele betaalvoorwaarden.",
      cues: [
        "Geen betaalde plek in de volgorde",
        "Bronnen en datums zichtbaar",
        "Onbekend blijft onbekend",
      ],
      ledgerTitle: "Stand van de bibliotheek",
      ledger: [
        { label: "Reviews met bronlabels", value: "5", tone: "blue" },
        { label: "Nederlandse reviews", value: "1", tone: "lime" },
        { label: "Verzonnen scores", value: "0", tone: "lime" },
        { label: "Laatste controle", value: "14 aug 2026", tone: "amber" },
      ],
    },
    directory: {
      eyebrow: "Kies een review",
      title: "Wat wil je controleren?",
      intro:
        "Zoek op aanbieder of filter op het onderwerp dat jij belangrijk vindt. Commissie bepaalt de volgorde niet.",
      searchLabel: "Zoek VPN-reviews",
      searchPlaceholder: "Zoek een aanbieder of onderwerp",
      filters: [
        { id: "all", label: "Alle reviews" },
        { id: "multi-device", label: "Apparaten" },
        { id: "privacy", label: "Privacy" },
        { id: "free", label: "Gratis opties" },
        { id: "advanced", label: "Meer instellingen" },
        { id: "risk", label: "Risicocontrole" },
      ],
      resultSingular: "review getoond",
      resultPlural: "reviews getoond",
      clear: "Wis filters",
      noResultsTitle: "Nog geen passende review",
      noResultsBody: "Probeer een andere aanbieder of wis het onderwerpfilter.",
      evidenceLabel: "Waar de review op steunt",
      limitationLabel: "Belangrijkste beperking",
    },
    boundary: {
      eyebrow: "Zo lees je onze reviews",
      title: "Een review is een gedateerde keuzehulp, geen blijvende garantie",
      intro:
        "VPN-apps, prijzen en netwerkroutes veranderen. We houden informatie van aanbieders, externe controles en onze eigen herhaalbare tests apart.",
      items: [
        {
          title: "Informatie van de aanbieder",
          body: "Nuttig voor beschreven functies en voorwaarden, maar het blijft een uitspraak van de aanbieder.",
        },
        {
          title: "Externe controles",
          body: "Nuttig als onderzoeker, datum en onderwerp duidelijk zijn. Het blijft een momentopname.",
        },
        {
          title: "Onze tests",
          body: "We noemen pas een uitslag als opstelling, datum en herhaalbare testgegevens beschikbaar zijn.",
        },
      ],
      methodology: "Lees hoe we VPN-bewijs beoordelen",
    },
    pathways: {
      eyebrow: "Nog niet toe aan een providerreview?",
      title: "Begin bij de keuze die je moet maken",
      items: [
        {
          title: "Vergelijk twee VPN's",
          body: "Bekijk verschillen naast elkaar zonder te doen alsof er één winnaar voor iedereen is.",
          href: "/compare",
          action: "Open vergelijkingen",
        },
        {
          title: "Maak een shortlist",
          body: "Beantwoord vijf vragen en zie welke vastgelegde eisen passen.",
          href: "/quiz",
          action: "Gebruik de VPN-keuzehulp",
        },
        {
          title: "Leer de basis",
          body: "Begrijp wat een VPN verandert en welke gegevens niet verdwijnen.",
          href: "/guides/how-vpn-works",
          action: "Lees de visuele gids",
        },
      ],
    },
    faq: {
      title: "Vragen over VPN-reviews",
      items: [
        {
          question: "Betalen aanbieders voor een hogere plek?",
          answer:
            "Nee. Commerciële relaties bepalen de volgorde niet. Via providerlinks kunnen we een commissie krijgen, maar bewijs en beperkingen schrijven we eerst.",
        },
        {
          question: "Waarom hebben sommige reviews geen cijfer?",
          answer:
            "Een cijfer lijkt heel precies. We tonen het alleen als de actuele methode, testgegevens en bronnen dit dragen. Anders leggen we de keuze uit zonder een getal te verzinnen.",
        },
        {
          question: "Waarom zijn sommige reviews alleen in het Engels?",
          answer:
            "Alleen de NordVPN-review heeft nu volledige Engelse en Nederlandse redactionele gelijkheid. Andere kaarten openen de Engelse review in plaats van een ongecontroleerde vertaling te tonen.",
        },
        {
          question: "Hoe vaak kan een VPN-review veranderen?",
          answer:
            "Wanneer apps, eigendom, prijzen, beleid of testresultaten belangrijk veranderen. Elke review toont een eigen controledatum en beperkingen.",
        },
      ],
    },
    newsletter: {
      eyebrow: "De Privacy Brief",
      title: "Ontvang belangrijke reviewupdates",
      body: "Eén duidelijke mail wanneer bewijs, voorwaarden of herhaalbare testresultaten belangrijk veranderen.",
      email: "Je e-mailadres",
      action: "Abonneren",
      consent: "Ik ga akkoord met e-mails en kan me op elk moment afmelden.",
    },
    entries: nlEntries,
  },
};

export function isReviewsDirectoryLocale(
  locale: string,
): locale is ReviewsDirectoryLocale {
  return locale === "en" || locale === "nl";
}

export function getReviewsDirectoryCopy(locale: string): ReviewsDirectoryCopy {
  return copies[isReviewsDirectoryLocale(locale) ? locale : "en"];
}
