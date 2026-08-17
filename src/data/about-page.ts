export type AboutEvidenceTone = "provider" | "outside" | "observed" | "unknown";

export type AboutPageCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    cardLabel: string;
    cardTitle: string;
    cardItems: Array<{ label: string; value: string }>;
    checked: string;
    cues: string[];
  };
  founder: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    role: string;
    body: string;
    boundaryTitle: string;
    boundaryBody: string;
    profileCta: string;
    imageAlt: string;
  };
  principles: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      tone: AboutEvidenceTone;
      title: string;
      body: string;
    }>;
  };
  boundaries: {
    eyebrow: string;
    title: string;
    intro: string;
    canTitle: string;
    canItems: string[];
    cannotTitle: string;
    cannotItems: string[];
    migrationTitle: string;
    migrationBody: string;
    methodologyCta: string;
  };
  accountability: {
    eyebrow: string;
    title: string;
    intro: string;
    affiliate: {
      title: string;
      body: string;
      cta: string;
    };
    corrections: {
      title: string;
      body: string;
      cta: string;
    };
  };
  links: {
    eyebrow: string;
    title: string;
    items: Array<{ href: string; title: string; body: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: AboutPageCopy = {
  locale: "en",
  meta: {
    title: "About ZeroToVPN: people, evidence and limits",
    description:
      "Meet the person behind ZeroToVPN and see how the site labels sources, tests, unknowns, affiliate links and corrections without claiming an imaginary lab.",
  },
  breadcrumb: { home: "Home", current: "About" },
  hero: {
    eyebrow: "About ZeroToVPN",
    title: "A VPN guide that shows where its claims come from",
    intro:
      "ZeroToVPN helps readers understand VPN reviews, comparisons and tools. Marvin Smit builds the site and is responsible for pages with his byline. Important claims should show their source, date and limit.",
    cardLabel: "The short version",
    cardTitle: "A small publication with visible boundaries",
    cardItems: [
      { label: "Run by", value: "Marvin Smit, founder and developer" },
      { label: "Publishes", value: "Guides, reviews, comparisons and tools" },
      {
        label: "Does not claim",
        value: "A certified security lab or a fresh test of every VPN",
      },
      {
        label: "Commercial model",
        value: "Some marked links may pay a commission",
      },
    ],
    checked: "About page checked 16 August 2026",
    cues: ["Named responsibility", "Source labels", "Visible limits"],
  },
  founder: {
    eyebrow: "Who is behind the site?",
    title: "Marvin builds ZeroToVPN and carries the byline",
    lead: "There is no need to invent a large expert team. The named person and the evidence on each page matter more.",
    name: "Marvin Smit",
    role: "Founder and developer of ZeroToVPN",
    body: "Marvin is a Dutch web developer and digital entrepreneur. He builds and maintains ZeroToVPN, its publishing templates and its technical checks. On pages with his name, he takes editorial responsibility for the wording, source status and visible limits.",
    boundaryTitle: "What the byline does not prove",
    boundaryBody:
      "A byline is not a security certificate or proof of a lab test. When ZeroToVPN runs a direct check, the page should also show the setup, date and scope. Without that record, a provider statement stays a provider statement.",
    profileCta: "View Marvin's author profile",
    imageAlt: "Marvin Smit, founder and developer of ZeroToVPN",
  },
  principles: {
    eyebrow: "Why the site exists",
    title: "Clear before impressive",
    intro:
      "VPN pages often mix marketing, outside research and one-off tests. ZeroToVPN tries to keep those things separate so a reader can judge the evidence.",
    items: [
      {
        title: "Show the source",
        body: "Say whether information came from a VPN provider, an outside source or a recorded ZeroToVPN observation.",
      },
      {
        title: "Name the limit",
        body: "A result for one device, route or date should not become a promise for every user and every future moment.",
      },
      {
        title: "Keep money separate",
        body: "A commission may help fund the site, but it is not proof that a provider is safer, faster or better.",
      },
    ],
  },
  evidence: {
    eyebrow: "How to read a ZeroToVPN page",
    title: "Four labels, four different meanings",
    intro:
      "These labels tell you where a statement came from. They are not scores for a whole VPN company.",
    items: [
      {
        tone: "provider",
        title: "Provider information",
        body: "The VPN company published the feature, price or policy. We can date the check, but it is not an independent result.",
      },
      {
        tone: "outside",
        title: "Outside check",
        body: "A named organisation examined a defined claim. Its date and scope matter, and it cannot promise future behaviour.",
      },
      {
        tone: "observed",
        title: "ZeroToVPN observation",
        body: "A recorded device, app, route or browser check was used. The statement should stay inside those conditions.",
      },
      {
        tone: "unknown",
        title: "Not yet known",
        body: "The source is missing, too old or cannot answer the question. We show the gap instead of filling it with a score.",
      },
    ],
  },
  boundaries: {
    eyebrow: "What the site can and cannot say",
    title: "Useful information needs an honest boundary",
    intro:
      "Not every page needs a lab test. It does need wording that matches the evidence available on that page.",
    canTitle: "ZeroToVPN can",
    canItems: [
      "Explain provider features and policies with a current source and check date.",
      "Summarise a named outside audit or report within its stated scope.",
      "Publish a direct observation when the setup, date and limits are recorded.",
      "Build browser tools and explain exactly what they measure and miss.",
    ],
    cannotTitle: "ZeroToVPN does not claim",
    cannotItems: [
      "That every mentioned VPN was bought and tested for weeks.",
      "That every review receives a new full test each month or quarter.",
      "That a provider document is the same as an independent test.",
      "That Marvin or ZeroToVPN is a certified VPN security laboratory.",
    ],
    migrationTitle: "Older pages are still being improved",
    migrationBody:
      "Some older pages do not yet use the full evidence-label system. If a page does not show the source or test setup, treat the claim as unconfirmed until the page is checked and updated.",
    methodologyCta: "Read the full methodology",
  },
  accountability: {
    eyebrow: "Commercial and editorial boundaries",
    title: "How readers can hold us to the rules",
    intro:
      "The rules are public so a reader can check whether a page follows them.",
    affiliate: {
      title: "Affiliate links are labelled",
      body: "ZeroToVPN may receive a commission through some links. This must not buy a ranking, change a test result or turn a provider claim into evidence.",
      cta: "Read the affiliate disclosure",
    },
    corrections: {
      title: "Corrections need a clear route",
      body: "Send the page URL, the exact statement and a dated public source. We review the evidence and update a factual error when a correction is needed.",
      cta: "Report an error",
    },
  },
  links: {
    eyebrow: "Check our work",
    title: "The pages behind the promise",
    items: [
      {
        href: "/authors/marvin-smit",
        title: "Author profile",
        body: "Marvin's role, responsibilities and evidence boundary.",
      },
      {
        href: "/methodology",
        title: "Methodology",
        body: "Evidence labels, test steps and publication gates.",
      },
      {
        href: "/editorial-policy",
        title: "Editorial policy",
        body: "Rules for authorship, careful language and corrections.",
      },
      {
        href: "/affiliate-disclosure",
        title: "Affiliate disclosure",
        body: "What commission may and may not change.",
      },
      {
        href: "/contact",
        title: "Contact",
        body: "Question a claim, share a source or report an error.",
      },
    ],
  },
  faq: {
    eyebrow: "About questions",
    title: "Plain answers",
    items: [
      {
        question: "Is ZeroToVPN an independent security laboratory?",
        answer:
          "No. ZeroToVPN is a VPN information website, not a certified security laboratory. A direct test counts only when the page shows its setup, date and limits.",
      },
      {
        question: "Does ZeroToVPN test every VPN it mentions?",
        answer:
          "No. Some statements come from provider documentation or named outside sources. Pages should label that source instead of presenting it as a ZeroToVPN test.",
      },
      {
        question: "Who is responsible for the site?",
        answer:
          "Marvin Smit is the founder and developer of ZeroToVPN. His author profile explains what his byline means and what it does not prove.",
      },
      {
        question: "Can a VPN provider pay for a better place?",
        answer:
          "A commission must not buy a ranking or change evidence. Commercial links should be labelled and kept separate from the reason for an editorial decision.",
      },
    ],
  },
};

const nl: AboutPageCopy = {
  locale: "nl",
  meta: {
    title: "Over ZeroToVPN: mensen, bewijs en grenzen",
    description:
      "Maak kennis met de persoon achter ZeroToVPN en lees hoe de site bronnen, tests, onbekende punten, affiliatelinks en correcties benoemt zonder een nep-lab te claimen.",
  },
  breadcrumb: { home: "Home", current: "Over ons" },
  hero: {
    eyebrow: "Over ZeroToVPN",
    title: "Een VPN-gids die laat zien waar claims vandaan komen",
    intro:
      "ZeroToVPN helpt lezers VPN-reviews, vergelijkingen en tools te begrijpen. Marvin Smit bouwt de site en is verantwoordelijk voor pagina's met zijn naam. Belangrijke claims horen hun bron, datum en grens te tonen.",
    cardLabel: "De korte versie",
    cardTitle: "Een kleine publicatie met zichtbare grenzen",
    cardItems: [
      {
        label: "Beheerd door",
        value: "Marvin Smit, oprichter en ontwikkelaar",
      },
      {
        label: "Publiceert",
        value: "Gidsen, reviews, vergelijkingen en tools",
      },
      {
        label: "Claimt niet",
        value: "Een gecertificeerd securitylab of een verse test van elke VPN",
      },
      {
        label: "Verdienmodel",
        value: "Sommige gemarkeerde links kunnen commissie opleveren",
      },
    ],
    checked: "Over-ons-pagina gecontroleerd op 16 augustus 2026",
    cues: [
      "Duidelijke verantwoordelijkheid",
      "Bronlabels",
      "Zichtbare grenzen",
    ],
  },
  founder: {
    eyebrow: "Wie zit achter de site?",
    title: "Marvin bouwt ZeroToVPN en draagt de auteursnaam",
    lead: "We hoeven geen groot expertteam te verzinnen. De genoemde persoon en het bewijs op de pagina zijn belangrijker.",
    name: "Marvin Smit",
    role: "Oprichter en ontwikkelaar van ZeroToVPN",
    body: "Marvin is een Nederlandse webontwikkelaar en digitale ondernemer. Hij bouwt en onderhoudt ZeroToVPN, de publicatietemplates en de technische controles. Op pagina's met zijn naam is hij redactioneel verantwoordelijk voor de tekst, bronstatus en zichtbare grenzen.",
    boundaryTitle: "Wat de auteursnaam niet bewijst",
    boundaryBody:
      "Een auteursnaam is geen securitycertificaat en geen bewijs van een labtest. Wanneer ZeroToVPN zelf iets controleert, hoort de pagina ook de opstelling, datum en scope te tonen. Zonder die informatie blijft een uitspraak van een provider een providerclaim.",
    profileCta: "Bekijk het auteursprofiel van Marvin",
    imageAlt: "Marvin Smit, oprichter en ontwikkelaar van ZeroToVPN",
  },
  principles: {
    eyebrow: "Waarom de site bestaat",
    title: "Duidelijk vóór indrukwekkend",
    intro:
      "VPN-pagina's mengen vaak marketing, extern onderzoek en losse tests. ZeroToVPN probeert die zaken te scheiden, zodat een lezer het bewijs zelf kan beoordelen.",
    items: [
      {
        title: "Toon de bron",
        body: "Vertel of informatie van een VPN-provider, een externe bron of een vastgelegde ZeroToVPN-observatie komt.",
      },
      {
        title: "Benoem de grens",
        body: "Een resultaat voor één apparaat, route of datum mag geen belofte worden voor elke gebruiker en elk toekomstig moment.",
      },
      {
        title: "Houd geld apart",
        body: "Een commissie kan de site helpen betalen, maar bewijst niet dat een provider veiliger, sneller of beter is.",
      },
    ],
  },
  evidence: {
    eyebrow: "Zo lees je een ZeroToVPN-pagina",
    title: "Vier labels met vier verschillende betekenissen",
    intro:
      "Deze labels vertellen waar een uitspraak vandaan komt. Het zijn geen scores voor een heel VPN-bedrijf.",
    items: [
      {
        tone: "provider",
        title: "Providerinformatie",
        body: "Het VPN-bedrijf publiceerde de functie, prijs of regel. We kunnen de controle dateren, maar dit is geen onafhankelijk resultaat.",
      },
      {
        tone: "outside",
        title: "Externe controle",
        body: "Een genoemde organisatie onderzocht een duidelijke claim. De datum en scope tellen mee en het onderzoek belooft niets over de toekomst.",
      },
      {
        tone: "observed",
        title: "ZeroToVPN-observatie",
        body: "Er is een vastgelegde controle met een apparaat, app, route of browser. De uitspraak hoort binnen die omstandigheden te blijven.",
      },
      {
        tone: "unknown",
        title: "Nog niet bekend",
        body: "De bron ontbreekt, is te oud of beantwoordt de vraag niet. We tonen het gat in plaats van het te vullen met een score.",
      },
    ],
  },
  boundaries: {
    eyebrow: "Wat de site wel en niet kan zeggen",
    title: "Nuttige informatie heeft een eerlijke grens nodig",
    intro:
      "Niet elke pagina heeft een labtest nodig. De tekst moet wel passen bij het bewijs dat op die pagina beschikbaar is.",
    canTitle: "ZeroToVPN kan",
    canItems: [
      "Providerfuncties en regels uitleggen met een actuele bron en controledatum.",
      "Een genoemd extern onderzoek samenvatten binnen de beschreven scope.",
      "Een eigen observatie publiceren wanneer opstelling, datum en grenzen zijn vastgelegd.",
      "Browsertools bouwen en precies uitleggen wat ze wel en niet meten.",
    ],
    cannotTitle: "ZeroToVPN claimt niet",
    cannotItems: [
      "Dat elke genoemde VPN is gekocht en wekenlang is getest.",
      "Dat elke review iedere maand of elk kwartaal een nieuwe volledige test krijgt.",
      "Dat providerdocumentatie hetzelfde is als een onafhankelijke test.",
      "Dat Marvin of ZeroToVPN een gecertificeerd VPN-securitylab is.",
    ],
    migrationTitle: "Oudere pagina's worden nog verbeterd",
    migrationBody:
      "Sommige oudere pagina's gebruiken het volledige systeem met bewijslabels nog niet. Toont een pagina geen bron of testopstelling? Zie de claim dan als onbevestigd totdat de pagina is gecontroleerd en bijgewerkt.",
    methodologyCta: "Lees de volledige methodologie",
  },
  accountability: {
    eyebrow: "Commerciële en redactionele grenzen",
    title: "Zo kunnen lezers ons aan de regels houden",
    intro:
      "De regels zijn openbaar, zodat een lezer kan controleren of een pagina zich eraan houdt.",
    affiliate: {
      title: "Affiliatelinks krijgen een label",
      body: "ZeroToVPN kan via sommige links commissie ontvangen. Daarmee mag je geen plek in een ranglijst kopen, testresultaat veranderen of providerclaim tot bewijs maken.",
      cta: "Lees de affiliate-disclosure",
    },
    corrections: {
      title: "Correcties hebben een duidelijke route",
      body: "Stuur de pagina-URL, de precieze uitspraak en een openbare bron met datum. We beoordelen het bewijs en passen een feitelijke fout aan wanneer een correctie nodig is.",
      cta: "Meld een fout",
    },
  },
  links: {
    eyebrow: "Controleer ons werk",
    title: "De pagina's achter de belofte",
    items: [
      {
        href: "/authors/marvin-smit",
        title: "Auteursprofiel",
        body: "De rol, verantwoordelijkheden en bewijsgrens van Marvin.",
      },
      {
        href: "/methodology",
        title: "Methodologie",
        body: "Bewijslabels, teststappen en regels vóór publicatie.",
      },
      {
        href: "/editorial-policy",
        title: "Redactioneel beleid",
        body: "Regels voor auteurschap, voorzichtige taal en correcties.",
      },
      {
        href: "/affiliate-disclosure",
        title: "Affiliate-disclosure",
        body: "Wat een commissie wel en niet mag veranderen.",
      },
      {
        href: "/contact",
        title: "Contact",
        body: "Betwist een claim, deel een bron of meld een fout.",
      },
    ],
  },
  faq: {
    eyebrow: "Vragen over ZeroToVPN",
    title: "Duidelijke antwoorden",
    items: [
      {
        question: "Is ZeroToVPN een onafhankelijk securitylab?",
        answer:
          "Nee. ZeroToVPN is een informatieve VPN-website en geen gecertificeerd securitylab. Een eigen test telt pas mee wanneer de pagina de opstelling, datum en grenzen toont.",
      },
      {
        question: "Test ZeroToVPN elke VPN die wordt genoemd?",
        answer:
          "Nee. Sommige uitspraken komen uit providerdocumentatie of genoemde externe bronnen. Pagina's horen die bron te labelen in plaats van de uitspraak als een ZeroToVPN-test te presenteren.",
      },
      {
        question: "Wie is verantwoordelijk voor de site?",
        answer:
          "Marvin Smit is de oprichter en ontwikkelaar van ZeroToVPN. Zijn auteursprofiel legt uit wat zijn naam bij een pagina betekent en wat die naam niet bewijst.",
      },
      {
        question: "Kan een VPN-provider betalen voor een betere plek?",
        answer:
          "Een commissie mag geen plek in een ranglijst kopen en geen bewijs veranderen. Commerciële links horen een label te krijgen en mogen niet de reden zijn voor een redactioneel oordeel.",
      },
    ],
  },
};

export function isAboutLocale(
  locale: string,
): locale is AboutPageCopy["locale"] {
  return locale === "en" || locale === "nl";
}

export function getAboutPageCopy(locale: string): AboutPageCopy {
  return locale === "nl" ? nl : en;
}
