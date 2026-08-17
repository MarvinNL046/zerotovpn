export type ReportsHubLocale = "en" | "nl";

export type ReportsHubCopy = {
  locale: ReportsHubLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    directAnswer: string;
    checked: string;
    cues: string[];
    boardTitle: string;
    boardRows: Array<{
      label: string;
      value: string;
      tone: "lime" | "blue" | "amber";
    }>;
  };
  terms: {
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
      tone: "provider" | "outside" | "observed" | "unknown";
      title: string;
      body: string;
    }>;
  };
  register: {
    eyebrow: string;
    title: string;
    intro: string;
    noticeTitle: string;
    noticeBody: string;
    items: Array<{
      title: string;
      status: string;
      summary: string;
      knownLabel: string;
      known: string;
      gapLabel: string;
      gap: string;
      nextLabel: string;
      next: string;
    }>;
  };
  reading: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  resources: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string; href: string; action: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: ReportsHubCopy = {
  locale: "en",
  meta: {
    title: "VPN research reports and evidence notes",
    description:
      "Read ZeroToVPN research status, evidence labels and report limits. No VPN ranking is published here until its sources and test record pass review.",
  },
  breadcrumb: { home: "Home", current: "Reports" },
  hero: {
    eyebrow: "ZeroToVPN research desk",
    title: "Reports should explain the evidence, not hide it.",
    intro:
      "This hub shows which VPN research is ready, which work is still being checked and how to read a result. A clear-looking table is not enough: sources, dates and limits must be visible too.",
    directLabel: "The short answer",
    directAnswer:
      "No VPN ranking report is published in this hub right now. Older index pages are being checked because their public source and test records are not complete enough for a current ranking.",
    checked: "Research register checked 16 August 2026",
    cues: [
      "No scores without records",
      "Unknown stays visible",
      "No partner links",
    ],
    boardTitle: "Publication check",
    boardRows: [
      { label: "Current ranking reports", value: "None", tone: "lime" },
      { label: "Older index work", value: "In review", tone: "amber" },
      { label: "Evidence language", value: "Four labels", tone: "blue" },
    ],
  },
  terms: {
    eyebrow: "Start with four words",
    title: "What does a research page actually tell you?",
    intro:
      "These words stop one result from sounding bigger or newer than it really is.",
    items: [
      {
        title: "Report",
        body: "A report answers a clear question and shows the sources or test record used for the answer.",
      },
      {
        title: "Snapshot",
        body: "A result from one date and setup. It does not promise the same result on every device, route or future version.",
      },
      {
        title: "Source",
        body: "The place a statement comes from, such as provider terms, a named outside review or a recorded ZeroToVPN check.",
      },
      {
        title: "Limitation",
        body: "What the source or test cannot answer. A good report puts this beside the result, not in tiny print.",
      },
    ],
  },
  evidence: {
    eyebrow: "Evidence labels",
    title: "Four labels, four different meanings",
    intro:
      "A provider statement is useful, but it is not the same as an outside check or a recorded observation. The label tells you which kind you are reading.",
    items: [
      {
        tone: "provider",
        title: "Provider says",
        body: "The VPN company publishes the feature, rule or policy. We show it as a claim and date the check.",
      },
      {
        tone: "outside",
        title: "Outside research",
        body: "A named organisation examined a defined subject. Its date and scope decide what it can support.",
      },
      {
        tone: "observed",
        title: "ZeroToVPN viewed",
        body: "We recorded what happened in a stated app, browser or test setup. The result stays tied to that setup.",
      },
      {
        tone: "unknown",
        title: "Still unknown",
        body: "The source is missing, too old or too weak for the question. We leave the gap open instead of guessing.",
      },
    ],
  },
  register: {
    eyebrow: "Research register",
    title: "What is being checked before publication?",
    intro:
      "The register is a status view, not a ranking. Its order does not mean first, best or most important.",
    noticeTitle: "Why are the older index pages not linked here?",
    noticeBody:
      "They contain ranking and performance fields that need a clearer public method, source history and equal-condition test record. A route existing is not enough to call it a current report.",
    items: [
      {
        title: "VPN transparency and performance research",
        status: "Evidence check open",
        summary:
          "Work that brings provider ownership, privacy evidence and performance observations into one view.",
        knownLabel: "What is clear",
        known:
          "The intended subjects and field names are visible in the older research page.",
        gapLabel: "What is missing",
        gap: "A complete public source log, repeatable setup and evidence for every score and rank.",
        nextLabel: "Publication gate",
        next: "Remove unsupported scores or publish the records and limits needed to check each result.",
      },
      {
        title: "VPN index dashboard",
        status: "Not a current report",
        summary:
          "An older dashboard that combines provider fields and filters into a quick overview.",
        knownLabel: "What is clear",
        known:
          "It is designed to help people compare several VPN fields in one place.",
        gapLabel: "What is missing",
        gap: "A complete weight model, update history and equal-condition test record for the rankings.",
        nextLabel: "Publication gate",
        next: "Rebuild it as a dated evidence table before it appears in the public report library.",
      },
    ],
  },
  reading: {
    eyebrow: "Read without the guesswork",
    title: "Four checks before you use a result",
    intro:
      "You do not need to be a researcher. These simple checks reveal most weak reports.",
    steps: [
      {
        title: "Find the question",
        body: "A report should say exactly what it tried to learn. A broad title can hide a very small test.",
      },
      {
        title: "Check the date",
        body: "Apps, routes, terms and audits change. A date tells you when the result was true enough to record.",
      },
      {
        title: "Match claim to source",
        body: "Terms can support a device limit. They cannot prove real speed or that a kill switch worked in a test.",
      },
      {
        title: "Read the limit",
        body: "Look for the device, region, sample size and missing evidence before applying the result to your situation.",
      },
    ],
  },
  resources: {
    eyebrow: "Useful now",
    title: "See the rules behind future reports",
    intro:
      "These pages are current, non-commercial starting points while the research register is being rebuilt.",
    items: [
      {
        title: "Evidence methodology",
        body: "See the publication gates for numbers, comparisons, privacy claims and changing access results.",
        href: "/methodology",
        action: "Read the method",
      },
      {
        title: "Affiliate disclosure",
        body: "Learn why commission is kept separate from evidence and editorial decisions.",
        href: "/affiliate-disclosure",
        action: "See the rules",
      },
      {
        title: "Corrections and contact",
        body: "Send a page URL, the exact statement and a dated public source to the editorial team.",
        href: "/contact",
        action: "Report an issue",
      },
    ],
  },
  faq: {
    eyebrow: "Report questions",
    title: "Plain answers",
    items: [
      {
        question: "Why is there no best-VPN report here?",
        answer:
          "A ranking needs current evidence for every important field and a public way to understand the result. The older index work does not yet meet that gate.",
      },
      {
        question: "Does a provider audit count as a ZeroToVPN test?",
        answer:
          "No. It is outside evidence for the systems and time inside that audit. We name the source and do not present it as our own test.",
      },
      {
        question: "Can a snapshot predict my VPN speed?",
        answer:
          "No. It can show what happened on one route and setup. Your location, device, server, protocol and time can change the result.",
      },
      {
        question: "How can I report a problem in a future report?",
        answer:
          "Send the page URL, the exact claim and a dated public source through the contact page. We review the evidence and correct the page when needed.",
      },
    ],
  },
};

const nl: ReportsHubCopy = {
  locale: "nl",
  meta: {
    title: "VPN-onderzoeksrapporten en bewijsnotities",
    description:
      "Bekijk de onderzoeksstatus, bewijslabels en grenzen van ZeroToVPN. Er komt pas een VPN-ranglijst als bronnen en testgegevens zijn gecontroleerd.",
  },
  breadcrumb: { home: "Start", current: "Rapporten" },
  hero: {
    eyebrow: "Onderzoeksdesk van ZeroToVPN",
    title: "Een rapport moet het bewijs uitleggen, niet verstoppen.",
    intro:
      "Deze hub laat zien welk VPN-onderzoek klaar is, wat nog wordt gecontroleerd en hoe je een uitslag leest. Een mooie tabel is niet genoeg: bronnen, datums en beperkingen moeten ook zichtbaar zijn.",
    directLabel: "Het korte antwoord",
    directAnswer:
      "Op dit moment staat hier geen VPN-ranglijst. Oudere indexpagina's worden gecontroleerd, omdat hun openbare bronnen en testgegevens niet compleet genoeg zijn voor een actuele ranglijst.",
    checked: "Onderzoeksregister gecontroleerd op 16 augustus 2026",
    cues: [
      "Geen cijfer zonder verslag",
      "Onbekend blijft zichtbaar",
      "Geen partnerlinks",
    ],
    boardTitle: "Publicatiecontrole",
    boardRows: [
      { label: "Actuele ranglijstrapporten", value: "Geen", tone: "lime" },
      { label: "Ouder indexwerk", value: "In controle", tone: "amber" },
      { label: "Soorten bewijs", value: "Vier labels", tone: "blue" },
    ],
  },
  terms: {
    eyebrow: "Begin met vier woorden",
    title: "Wat vertelt een onderzoekspagina echt?",
    intro:
      "Deze woorden voorkomen dat één uitslag groter of nieuwer klinkt dan hij is.",
    items: [
      {
        title: "Rapport",
        body: "Een rapport beantwoordt een duidelijke vraag en toont de bronnen of testgegevens achter het antwoord.",
      },
      {
        title: "Momentopname",
        body: "Een uitslag van één datum en opstelling. Hij belooft niet hetzelfde op elk apparaat, elke route of latere versie.",
      },
      {
        title: "Bron",
        body: "De plek waar een uitspraak vandaan komt, zoals voorwaarden, een genoemd extern onderzoek of een vastgelegde controle van ZeroToVPN.",
      },
      {
        title: "Beperking",
        body: "Wat de bron of test niet kan beantwoorden. Een goed rapport zet dit naast de uitslag, niet in kleine letters.",
      },
    ],
  },
  evidence: {
    eyebrow: "Bewijslabels",
    title: "Vier labels met vier verschillende betekenissen",
    intro:
      "Een uitspraak van een aanbieder is nuttig, maar niet hetzelfde als een externe controle of vastgelegde waarneming. Het label vertelt welke soort je leest.",
    items: [
      {
        tone: "provider",
        title: "De aanbieder zegt",
        body: "Het VPN-bedrijf publiceert de functie, regel of het beleid. We tonen het als claim en noemen de controledatum.",
      },
      {
        tone: "outside",
        title: "Extern onderzocht",
        body: "Een genoemde organisatie bekeek een duidelijk onderwerp. Datum en bereik bepalen wat het onderzoek ondersteunt.",
      },
      {
        tone: "observed",
        title: "Door ZeroToVPN bekeken",
        body: "We legden vast wat er gebeurde in een genoemde app, browser of test. De uitslag blijft bij die opstelling.",
      },
      {
        tone: "unknown",
        title: "Nog onbekend",
        body: "De bron ontbreekt, is te oud of te zwak voor de vraag. We laten het gat open in plaats van te gokken.",
      },
    ],
  },
  register: {
    eyebrow: "Onderzoeksregister",
    title: "Wat wordt vóór publicatie gecontroleerd?",
    intro:
      "Het register toont een status, geen ranglijst. De volgorde betekent niet eerste, beste of belangrijkste.",
    noticeTitle: "Waarom linken we de oudere indexpagina's hier niet?",
    noticeBody:
      "Ze bevatten ranglijsten en prestatievelden die een duidelijkere openbare methode, bronhistorie en test onder gelijke omstandigheden nodig hebben. Alleen een bestaande URL maakt nog geen actueel rapport.",
    items: [
      {
        title: "Onderzoek naar VPN-transparantie en prestaties",
        status: "Bewijscontrole loopt",
        summary:
          "Werk dat eigendom, privacybewijs en waarnemingen over prestaties in één overzicht wil zetten.",
        knownLabel: "Wat duidelijk is",
        known:
          "De bedoelde onderwerpen en veldnamen zijn zichtbaar op de oudere onderzoekspagina.",
        gapLabel: "Wat ontbreekt",
        gap: "Een compleet openbaar bronnenlog, herhaalbare opstelling en bewijs voor elk cijfer en elke rang.",
        nextLabel: "Voorwaarde voor publicatie",
        next: "Haal niet-ondersteunde cijfers weg of publiceer de gegevens en grenzen waarmee elke uitslag te controleren is.",
      },
      {
        title: "Dashboard met VPN-index",
        status: "Geen actueel rapport",
        summary:
          "Een ouder dashboard dat providergegevens en filters in één snel overzicht zet.",
        knownLabel: "Wat duidelijk is",
        known:
          "Het is bedoeld om meerdere VPN-onderdelen op één plek te vergelijken.",
        gapLabel: "Wat ontbreekt",
        gap: "Een compleet weegmodel, wijzigingsgeschiedenis en testgegevens onder gelijke omstandigheden.",
        nextLabel: "Voorwaarde voor publicatie",
        next: "Bouw het opnieuw als gedateerde bewijstabel voordat het in de openbare rapportbibliotheek komt.",
      },
    ],
  },
  reading: {
    eyebrow: "Lezen zonder giswerk",
    title: "Vier controles voordat je een uitslag gebruikt",
    intro:
      "Je hoeft geen onderzoeker te zijn. Met deze simpele controles herken je de meeste zwakke rapporten.",
    steps: [
      {
        title: "Zoek de vraag",
        body: "Een rapport hoort precies te zeggen wat het wilde weten. Een brede titel kan een heel kleine test verbergen.",
      },
      {
        title: "Controleer de datum",
        body: "Apps, routes, voorwaarden en audits veranderen. Een datum laat zien wanneer de uitslag is vastgelegd.",
      },
      {
        title: "Koppel claim aan bron",
        body: "Voorwaarden kunnen een apparaatlimiet steunen. Ze bewijzen geen echte snelheid of werkende kill switch.",
      },
      {
        title: "Lees de beperking",
        body: "Zoek apparaat, regio, aantal metingen en ontbrekend bewijs voordat je de uitslag op jezelf toepast.",
      },
    ],
  },
  resources: {
    eyebrow: "Nu al nuttig",
    title: "Bekijk de regels achter toekomstige rapporten",
    intro:
      "Deze pagina's zijn actuele, niet-commerciële startpunten terwijl het onderzoeksregister opnieuw wordt opgebouwd.",
    items: [
      {
        title: "Methode voor bewijs",
        body: "Bekijk de publicatievoorwaarden voor cijfers, vergelijkingen, privacyclaims en veranderende toegang.",
        href: "/methodology",
        action: "Lees de methode",
      },
      {
        title: "Uitleg over affiliatelinks",
        body: "Lees waarom commissie apart blijft van bewijs en redactionele beslissingen.",
        href: "/affiliate-disclosure",
        action: "Bekijk de regels",
      },
      {
        title: "Correcties en contact",
        body: "Stuur een URL, de precieze uitspraak en een openbare bron met datum naar de redactie.",
        href: "/contact",
        action: "Meld een probleem",
      },
    ],
  },
  faq: {
    eyebrow: "Vragen over rapporten",
    title: "Duidelijke antwoorden",
    items: [
      {
        question: "Waarom staat hier geen rapport met de beste VPN?",
        answer:
          "Een ranglijst heeft actueel bewijs voor alle belangrijke onderdelen nodig. Ook moet de uitslag openbaar te begrijpen zijn. Het oudere indexwerk voldoet daar nog niet aan.",
      },
      {
        question: "Is een audit van een aanbieder een test van ZeroToVPN?",
        answer:
          "Nee. Het is extern bewijs voor de systemen en periode binnen die audit. We noemen de bron en doen niet alsof het onze eigen test is.",
      },
      {
        question: "Kan een momentopname mijn VPN-snelheid voorspellen?",
        answer:
          "Nee. Hij kan tonen wat er op één route en opstelling gebeurde. Locatie, apparaat, server, protocol en tijdstip kunnen de uitslag veranderen.",
      },
      {
        question: "Hoe meld ik een probleem in een later rapport?",
        answer:
          "Stuur via de contactpagina de URL, de precieze uitspraak en een openbare bron met datum. We controleren het bewijs en passen de pagina aan als dat nodig is.",
      },
    ],
  },
};

export function isReportsHubLocale(locale: string): locale is ReportsHubLocale {
  return locale === "en" || locale === "nl";
}

export function getReportsHubCopy(locale: string): ReportsHubCopy {
  return locale === "nl" ? nl : en;
}
