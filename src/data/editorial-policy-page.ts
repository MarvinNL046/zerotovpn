export type EditorialPolicyPageCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    ruleLabel: string;
    rule: string;
    checked: string;
    cues: string[];
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      tone: "provider" | "outside" | "observed" | "unknown";
      title: string;
      body: string;
      wording: string;
    }>;
  };
  publishing: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  boundaries: {
    eyebrow: string;
    title: string;
    intro: string;
    commercialTitle: string;
    commercialItems: string[];
    limitsTitle: string;
    limitsItems: string[];
  };
  corrections: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ title: string; body: string }>;
    cta: string;
  };
  links: Array<{ href: string; title: string; body: string }>;
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: EditorialPolicyPageCopy = {
  locale: "en",
  meta: {
    title: "Editorial standards: evidence and corrections",
    description:
      "Read ZeroToVPN's plain-language rules for evidence labels, careful claims, commercial separation, authorship, updates and corrections.",
  },
  breadcrumb: { home: "Home", current: "Editorial policy" },
  hero: {
    eyebrow: "ZeroToVPN editorial policy",
    title: "Evidence before confidence",
    intro:
      "A clear-looking page can still be wrong. Our job is to show where an important statement came from, how current it is and where the evidence stops.",
    ruleLabel: "The short rule",
    rule: "Name the source, date the check, show the limit and keep money outside the conclusion.",
    checked: "Policy checked 16 August 2026",
    cues: [
      "No invented rank or score",
      "Unknown stays visible",
      "Commercial links are separate",
    ],
  },
  evidence: {
    eyebrow: "Use the right words",
    title: "Four labels keep different kinds of evidence apart",
    intro:
      "These labels describe one statement. They are not grades for a whole VPN company.",
    items: [
      {
        tone: "provider",
        title: "Provider information",
        body: "The VPN company publishes the feature, price, policy or device limit. It can be useful, but it is not an independent check.",
        wording: "Write: “The provider says…”",
      },
      {
        tone: "outside",
        title: "Outside check",
        body: "A named organisation checked a defined part of a claim. Its date and scope decide what the work can support.",
        wording: "Write: “This report checked…”",
      },
      {
        tone: "observed",
        title: "ZeroToVPN observation",
        body: "We recorded a specific app, device, route or browser test. The result applies to that setup, not every user or future day.",
        wording: "Write: “In this test, we saw…”",
      },
      {
        tone: "unknown",
        title: "Not yet known",
        body: "The source is missing, old or unable to answer the question. We leave the gap open instead of guessing.",
        wording: "Write: “We have not verified this.”",
      },
    ],
  },
  publishing: {
    eyebrow: "Before we publish",
    title: "Six checks for a fair and useful page",
    intro:
      "Not every article needs a lab test. Every article does need language that matches the evidence it has.",
    items: [
      {
        title: "Answer one clear reader question",
        body: "The title, short answer and sections should help with the same decision. Search terms do not decide the verdict.",
      },
      {
        title: "Show who is responsible",
        body: "A page should name an author, reviewer or responsible editorial team when that information is available.",
      },
      {
        title: "Date changing facts",
        body: "Prices, app features, policies and performance can change. A check date helps readers judge whether a fresh look is needed.",
      },
      {
        title: "Use equal conditions for comparisons",
        body: "We do not call one VPN faster or better when the question, source or test conditions are not comparable.",
      },
      {
        title: "Keep important limits close",
        body: "A warning should sit beside the claim it limits. It should not be hidden in a distant policy page or tiny note.",
      },
      {
        title: "Remove claims the record cannot carry",
        body: "When current evidence is missing, we lower the certainty, mark the point unknown or remove the claim.",
      },
    ],
  },
  boundaries: {
    eyebrow: "Editorial boundaries",
    title: "What the policy allows—and what it does not promise",
    intro:
      "These rules are designed to stop a polished page from sounding more certain or more independent than it is.",
    commercialTitle: "Money stays outside the finding",
    commercialItems: [
      "A commission must not buy a rank, rating, winner or positive conclusion.",
      "A commercial link must be clearly marked before or beside the first commercial action.",
      "A provider may supply facts or flag an error. It does not get the right to set the conclusion.",
      "A deal, payout or campaign is not evidence about privacy, speed or reliability.",
    ],
    limitsTitle: "We do not make these promises",
    limitsItems: [
      "We do not claim that every VPN we mention was tested by ZeroToVPN.",
      "We do not promise a fixed update schedule for every page.",
      "We do not guarantee access, safety, legality, speed or a future provider result.",
      "We do not turn missing evidence into a score just to complete a table.",
    ],
  },
  corrections: {
    eyebrow: "Corrections",
    title: "A supported correction belongs on the page",
    body: "Send the exact URL, the sentence that may be wrong and a dated public source. Do not send account details, passwords or private VPN logs.",
    steps: [
      {
        title: "We check the exact claim",
        body: "We compare the report with the page, its source and the evidence label used.",
      },
      {
        title: "We correct what the evidence supports",
        body: "A verified factual error is changed. If the answer is still unclear, the page should say that it is unclear.",
      },
      {
        title: "We add context when it matters",
        body: "A meaningful change may get a new check date or note so the reader can understand what changed.",
      },
    ],
    cta: "Report an editorial issue",
  },
  links: [
    {
      href: "/methodology",
      title: "Methodology",
      body: "How a question, source and test become a bounded result.",
    },
    {
      href: "/affiliate-disclosure",
      title: "Affiliate disclosure",
      body: "How commercial links work and what a commission cannot change.",
    },
    {
      href: "/authors/marvin-smit",
      title: "Author profile",
      body: "See the named editor, role and current publication record.",
    },
    {
      href: "/contact",
      title: "Contact ZeroToVPN",
      body: "Send a source, correction or disclosure report to the editorial team.",
    },
  ],
  faq: {
    eyebrow: "Plain answers",
    title: "Questions about our editorial rules",
    items: [
      {
        question: "Does ZeroToVPN test every VPN it mentions?",
        answer:
          "No. A page should label what came from a provider, an outside check, our own observation or an unknown. A mention is not proof of a test.",
      },
      {
        question: "Can a provider pay for a better score or rank?",
        answer:
          "Our rule is no. A payment or affiliate relationship must not decide a score, rank, winner or finding. Commercial links are labelled separately.",
      },
      {
        question: "How often is an article updated?",
        answer:
          "There is no fixed schedule for every page. Pages should show useful dates, and an important product, policy or evidence change can make a new check necessary.",
      },
      {
        question: "What happens when evidence is missing?",
        answer:
          "We should call the point unknown, use less certain language or remove the claim. We do not invent a number to make the page look complete.",
      },
    ],
  },
};

const nl: EditorialPolicyPageCopy = {
  locale: "nl",
  meta: {
    title: "Redactionele regels: bewijs en correcties",
    description:
      "Lees de duidelijke regels van ZeroToVPN voor bewijslabels, voorzichtige claims, commerciële scheiding, auteurs, updates en correcties.",
  },
  breadcrumb: { home: "Start", current: "Redactioneel beleid" },
  hero: {
    eyebrow: "Redactioneel beleid van ZeroToVPN",
    title: "Eerst bewijs, dan zekerheid",
    intro:
      "Een nette pagina kan nog steeds fout zijn. Wij horen te tonen waar een belangrijke uitspraak vandaan komt, hoe actueel die is en waar het bewijs stopt.",
    ruleLabel: "De korte regel",
    rule: "Noem de bron, geef de controledatum, toon de beperking en houd geld buiten de conclusie.",
    checked: "Beleid gecontroleerd op 16 augustus 2026",
    cues: [
      "Geen verzonnen plek of cijfer",
      "Onbekend blijft zichtbaar",
      "Commerciële links staan apart",
    ],
  },
  evidence: {
    eyebrow: "Gebruik de juiste woorden",
    title: "Vier labels houden verschillend bewijs uit elkaar",
    intro:
      "Deze labels beschrijven één uitspraak. Ze zijn geen cijfer voor een heel VPN-bedrijf.",
    items: [
      {
        tone: "provider",
        title: "Informatie van de aanbieder",
        body: "Het VPN-bedrijf publiceert de functie, prijs, regel of apparaatlimiet. Dat kan nuttig zijn, maar is geen onafhankelijke controle.",
        wording: "Schrijf: ‘De aanbieder zegt…’",
      },
      {
        tone: "outside",
        title: "Externe controle",
        body: "Een genoemde organisatie controleerde een bepaald deel van een claim. Datum en bereik bepalen wat dit onderzoek ondersteunt.",
        wording: "Schrijf: ‘Dit rapport controleerde…’",
      },
      {
        tone: "observed",
        title: "Waarneming van ZeroToVPN",
        body: "We legden een bepaalde app-, apparaat-, route- of browsertest vast. De uitslag geldt voor die opstelling, niet voor elke gebruiker of latere dag.",
        wording: "Schrijf: ‘In deze test zagen we…’",
      },
      {
        tone: "unknown",
        title: "Nog niet bekend",
        body: "De bron ontbreekt, is oud of kan de vraag niet beantwoorden. We laten het gat open in plaats van te gokken.",
        wording: "Schrijf: ‘Dit hebben we niet gecontroleerd.’",
      },
    ],
  },
  publishing: {
    eyebrow: "Voor publicatie",
    title: "Zes controles voor een eerlijke en nuttige pagina",
    intro:
      "Niet elk artikel heeft een labtest nodig. Elk artikel heeft wel taal nodig die past bij het bewijs dat er is.",
    items: [
      {
        title: "Beantwoord één duidelijke lezersvraag",
        body: "De titel, het korte antwoord en de secties horen bij dezelfde keuze te helpen. Zoekwoorden bepalen het oordeel niet.",
      },
      {
        title: "Toon wie verantwoordelijk is",
        body: "Een pagina hoort een auteur, reviewer of verantwoordelijke redactie te noemen als die informatie beschikbaar is.",
      },
      {
        title: "Geef veranderlijke feiten een datum",
        body: "Prijzen, appfuncties, regels en prestaties kunnen veranderen. Een controledatum laat zien of een nieuwe blik nodig is.",
      },
      {
        title: "Vergelijk onder gelijke omstandigheden",
        body: "We noemen één VPN niet sneller of beter als de vraag, bron of testomstandigheden niet vergelijkbaar zijn.",
      },
      {
        title: "Zet belangrijke grenzen dichtbij",
        body: "Een waarschuwing hoort naast de uitspraak die hij beperkt. Niet verstopt op een verre beleidspagina of in kleine tekst.",
      },
      {
        title: "Haal onbewezen claims weg",
        body: "Ontbreekt actueel bewijs, dan verlagen we de zekerheid, noemen we het punt onbekend of halen we de claim weg.",
      },
    ],
  },
  boundaries: {
    eyebrow: "Redactionele grenzen",
    title: "Wat het beleid toestaat—en wat het niet belooft",
    intro:
      "Deze regels voorkomen dat een mooie pagina zekerder of onafhankelijker klinkt dan hij echt is.",
    commercialTitle: "Geld blijft buiten de conclusie",
    commercialItems: [
      "Commissie mag geen plek, cijfer, winnaar of positieve conclusie kopen.",
      "Een commerciële link moet voor of naast de eerste commerciële actie duidelijk herkenbaar zijn.",
      "Een aanbieder mag feiten sturen of een fout melden. Hij krijgt niet het recht om de conclusie te bepalen.",
      "Een deal, vergoeding of campagne is geen bewijs voor privacy, snelheid of betrouwbaarheid.",
    ],
    limitsTitle: "Deze beloften doen we niet",
    limitsItems: [
      "We beweren niet dat elke genoemde VPN door ZeroToVPN is getest.",
      "We beloven geen vast updateschema voor elke pagina.",
      "We garanderen geen toegang, veiligheid, wettigheid, snelheid of toekomstige provideruitslag.",
      "We maken van ontbrekend bewijs geen cijfer om een tabel te vullen.",
    ],
  },
  corrections: {
    eyebrow: "Correcties",
    title: "Een onderbouwde correctie hoort op de pagina",
    body: "Stuur de precieze URL, de zin die mogelijk fout is en een openbare bron met datum. Stuur geen accountgegevens, wachtwoorden of privélogs van je VPN.",
    steps: [
      {
        title: "We controleren de precieze claim",
        body: "We vergelijken de melding met de pagina, de bron en het gebruikte bewijslabel.",
      },
      {
        title: "We herstellen wat het bewijs ondersteunt",
        body: "Een bevestigde feitelijke fout wordt aangepast. Blijft het antwoord onduidelijk, dan hoort de pagina dat te zeggen.",
      },
      {
        title: "We voegen uitleg toe als dat telt",
        body: "Een belangrijke wijziging kan een nieuwe controledatum of notitie krijgen, zodat de lezer begrijpt wat veranderde.",
      },
    ],
    cta: "Meld een redactioneel probleem",
  },
  links: [
    {
      href: "/methodology",
      title: "Methodologie",
      body: "Hoe een vraag, bron en test samen een begrensde uitslag worden.",
    },
    {
      href: "/affiliate-disclosure",
      title: "Uitleg over affiliatelinks",
      body: "Hoe commerciële links werken en wat commissie niet mag veranderen.",
    },
    {
      href: "/authors/marvin-smit",
      title: "Auteursprofiel",
      body: "Bekijk de genoemde redacteur, rol en actuele publicaties.",
    },
    {
      href: "/contact",
      title: "Contact met ZeroToVPN",
      body: "Stuur een bron, correctie of melding over een disclosure naar de redactie.",
    },
  ],
  faq: {
    eyebrow: "Duidelijke antwoorden",
    title: "Vragen over onze redactionele regels",
    items: [
      {
        question: "Test ZeroToVPN elke VPN die wordt genoemd?",
        answer:
          "Nee. Een pagina hoort te tonen wat van een aanbieder, externe controle, eigen waarneming of onbekende bron komt. Een vermelding bewijst geen test.",
      },
      {
        question: "Kan een aanbieder betalen voor een beter cijfer of plek?",
        answer:
          "Onze regel is nee. Een betaling of affiliaterelatie mag geen cijfer, plek, winnaar of conclusie bepalen. Commerciële links krijgen een apart label.",
      },
      {
        question: "Hoe vaak wordt een artikel bijgewerkt?",
        answer:
          "Er is geen vast schema voor elke pagina. Pagina's horen nuttige datums te tonen. Een belangrijke wijziging in product, beleid of bewijs kan een nieuwe controle nodig maken.",
      },
      {
        question: "Wat gebeurt er als bewijs ontbreekt?",
        answer:
          "We horen het punt onbekend te noemen, voorzichtiger te schrijven of de claim weg te halen. We verzinnen geen getal om de pagina compleet te laten lijken.",
      },
    ],
  },
};

export function isEditorialPolicyLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getEditorialPolicyPageCopy(locale: string) {
  return locale === "nl" ? nl : en;
}
