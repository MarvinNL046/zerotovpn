export type MethodologyPageCopy = {
  locale: "en" | "nl";
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
  };
  labels: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      tone: "provider" | "outside" | "observed" | "unknown";
      title: string;
      body: string;
    }>;
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  gates: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  limits: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string; href?: string }>;
  };
  corrections: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  links: Array<{ href: string; title: string; body: string }>;
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: MethodologyPageCopy = {
  locale: "en",
  meta: {
    title: "How ZeroToVPN checks VPN evidence",
    description:
      "See how ZeroToVPN separates provider claims, outside checks, our own observations and unknowns. Learn the publication gates used for reviews and tools.",
  },
  breadcrumb: { home: "Home", current: "Methodology" },
  hero: {
    eyebrow: "ZeroToVPN methodology",
    title: "Show the evidence. Keep the limits visible.",
    intro:
      "We do not treat a provider claim, an outside audit and our own test as the same thing. Every important statement should show where it came from, when it was checked and what it does not prove.",
    directLabel: "The method in one sentence",
    directAnswer:
      "Ask a clear question, use the best available source, repeat a test when possible and publish the limitation beside the result.",
    checked: "Method checked 16 August 2026",
    cues: [
      "No score without a method",
      "Unknown stays unknown",
      "Commission is separate",
    ],
  },
  labels: {
    eyebrow: "Four evidence labels",
    title: "Where does a statement come from?",
    intro:
      "The label tells you how much weight to give a statement. It is not a grade for the whole provider.",
    items: [
      {
        tone: "provider",
        title: "Provider information",
        body: "The VPN company publishes the feature, price, device limit or policy. We date the check and do not call it an independent result.",
      },
      {
        tone: "outside",
        title: "Outside check",
        body: "A named organisation checked a defined part of a claim. The date and scope matter; it is not a guarantee for the future.",
      },
      {
        tone: "observed",
        title: "ZeroToVPN observation",
        body: "We used a recorded device, app, route or browser test. The page must show the conditions and avoid claims beyond that run.",
      },
      {
        tone: "unknown",
        title: "Not yet known",
        body: "The source is missing, too old or cannot answer the question. We show the gap instead of filling it with a number.",
      },
    ],
  },
  workflow: {
    eyebrow: "A repeatable workflow",
    title: "How a test moves from question to page",
    intro:
      "Not every page needs a lab test. When we do run a test, these steps make the result easier to inspect and repeat.",
    steps: [
      {
        title: "Define one question",
        body: "Example: does the kill switch stop traffic on this device when the VPN connection drops?",
      },
      {
        title: "Record the setup",
        body: "Save the date, device, operating system, app version, network, server and settings that can change the result.",
      },
      {
        title: "Measure a baseline",
        body: "When relevant, measure the same route without the VPN before comparing a run with the VPN on.",
      },
      {
        title: "Repeat the same run",
        body: "Use the same conditions more than once. Keep failed and unclear attempts instead of showing only the best number.",
      },
      {
        title: "Check another source",
        body: "Compare the observation with current provider documentation and a strong outside source when one exists.",
      },
      {
        title: "Publish the boundary",
        body: "State what the result supports, what it does not support and when a fresh test is needed.",
      },
    ],
  },
  gates: {
    eyebrow: "Publication gates",
    title: "What must be true before we make a strong claim?",
    intro:
      "A page can still be useful when a gate is not met. It must then use careful language and show the missing evidence.",
    items: [
      {
        title: "Numbers need a record",
        body: "A speed, latency or success number needs a dated method, units, sample count and conditions. Otherwise we do not publish it as our result.",
      },
      {
        title: "Comparisons need equal conditions",
        body: "Two VPNs are not called faster or better unless the same question and test conditions were used for both.",
      },
      {
        title: "Prices need checkout context",
        body: "Show the market, currency, tax status, period, total due now, renewal terms and check date—or link to the current checkout without a price claim.",
      },
      {
        title: "Privacy checks need scope",
        body: "A no-logs assessment supports only the systems and period that were examined. It cannot prove all future behaviour.",
      },
      {
        title: "Access claims expire",
        body: "Streaming and restricted-network access can change by server and time. One successful connection is not a permanent promise.",
      },
      {
        title: "Commercial links need disclosure",
        body: "A commission notice must appear before or beside the first commercial link. Commission is never evidence for a claim.",
      },
    ],
  },
  limits: {
    eyebrow: "Current boundaries",
    title: "What ZeroToVPN does not claim",
    intro:
      "These limits prevent a clear-looking page from promising more than the evidence can support.",
    items: [
      {
        title: "We do not test every VPN every month",
        body: "Reviews show a check date and a new-test-needed label when current performance evidence is missing.",
        href: "/reviews",
      },
      {
        title: "The speed tool measures one browser route",
        body: "It measures this browser to Cloudflare at one moment. It does not grade every website, game or VPN server.",
        href: "/speed-test",
      },
      {
        title: "The DNS page is currently a guided check",
        body: "The built-in step does not measure resolver IPs yet. A real resolver step uses an outside tool and the page stays out of search until the in-site probe is real.",
        href: "/tools/dns-leak-test",
      },
      {
        title: "The IP checker does not detect a VPN",
        body: "It can show the public request route and approximate network context. VPN or proxy detection is marked as not performed.",
        href: "/tools/what-is-my-ip",
      },
      {
        title: "The VPN finder gives a shortlist",
        body: "It uses a small, source-linked provider set. A match is not a guarantee for price, access or performance on your network.",
        href: "/quiz",
      },
    ],
  },
  corrections: {
    eyebrow: "Corrections",
    title: "Found a source, date or test problem?",
    body: "Send the page URL, the exact statement and a dated public source. We review the evidence and update the page when a correction is needed.",
    cta: "Contact the editorial team",
  },
  links: [
    {
      href: "/editorial-policy",
      title: "Editorial policy",
      body: "Rules for corrections, authorship and careful evidence language.",
    },
    {
      href: "/affiliate-disclosure",
      title: "Affiliate disclosure",
      body: "What commission may and may not change.",
    },
    {
      href: "/reviews",
      title: "Review library",
      body: "See evidence labels and limits on current provider reviews.",
    },
  ],
  faq: {
    eyebrow: "Method questions",
    title: "Plain answers",
    items: [
      {
        question: "Does ZeroToVPN give every VPN a score?",
        answer:
          "No. A score needs a published model and current evidence for every important input. When that is missing, we use a written decision with visible limits.",
      },
      {
        question: "Does an outside audit prove a VPN keeps no logs?",
        answer:
          "No. It is useful evidence for the period and systems in the audit scope. It cannot prove every system, future change or event outside that work.",
      },
      {
        question: "How often are pages checked?",
        answer:
          "There is no fake fixed schedule for every page. Important pages show a review or check date, and we prioritise updates after product, policy or evidence changes.",
      },
      {
        question: "Can an affiliate relationship change a test result?",
        answer:
          "No. Commission must stay outside the test method and evidence. Commercial links are labelled separately from the result.",
      },
    ],
  },
};

const nl: MethodologyPageCopy = {
  locale: "nl",
  meta: {
    title: "Zo controleert ZeroToVPN VPN-bewijs",
    description:
      "Lees hoe ZeroToVPN claims van aanbieders, externe controles, eigen waarnemingen en onbekende punten uit elkaar houdt bij reviews en tools.",
  },
  breadcrumb: { home: "Start", current: "Methodologie" },
  hero: {
    eyebrow: "Methodologie van ZeroToVPN",
    title: "Toon het bewijs. Laat de beperkingen staan.",
    intro:
      "Een claim van een aanbieder, een externe controle en onze eigen test zijn niet hetzelfde. Bij belangrijke uitspraken hoort te staan waar ze vandaan komen, wanneer ze zijn gecontroleerd en wat ze niet bewijzen.",
    directLabel: "De methode in één zin",
    directAnswer:
      "Stel één duidelijke vraag, gebruik de beste bron, herhaal een test als dat kan en zet de beperking naast de uitslag.",
    checked: "Methode gecontroleerd op 16 augustus 2026",
    cues: [
      "Geen cijfer zonder methode",
      "Onbekend blijft onbekend",
      "Commissie staat apart",
    ],
  },
  labels: {
    eyebrow: "Vier bewijslabels",
    title: "Waar komt een uitspraak vandaan?",
    intro:
      "Het label laat zien hoeveel gewicht je aan een uitspraak kunt geven. Het is geen cijfer voor de hele aanbieder.",
    items: [
      {
        tone: "provider",
        title: "Informatie van de aanbieder",
        body: "Het VPN-bedrijf publiceert de functie, prijs, apparaatlimiet of regel. We noemen de controledatum en noemen dit geen onafhankelijke uitslag.",
      },
      {
        tone: "outside",
        title: "Externe controle",
        body: "Een genoemde organisatie controleerde een bepaald deel van een claim. Datum en bereik tellen; dit is geen garantie voor de toekomst.",
      },
      {
        tone: "observed",
        title: "Waarneming van ZeroToVPN",
        body: "We gebruikten een vastgelegd apparaat, app, route of browsertest. De pagina toont de omstandigheden en belooft niet meer dan die test.",
      },
      {
        tone: "unknown",
        title: "Nog niet bekend",
        body: "De bron ontbreekt, is te oud of beantwoordt de vraag niet. We tonen het gat in plaats van een cijfer te verzinnen.",
      },
    ],
  },
  workflow: {
    eyebrow: "Een herhaalbare werkwijze",
    title: "Zo gaat een test van vraag naar pagina",
    intro:
      "Niet elke pagina heeft een labtest nodig. Als we wel testen, maken deze stappen de uitslag beter te controleren en herhalen.",
    steps: [
      {
        title: "Stel één vraag",
        body: "Voorbeeld: stopt de kill switch het verkeer op dit apparaat als de VPN-verbinding wegvalt?",
      },
      {
        title: "Leg de opstelling vast",
        body: "Bewaar datum, apparaat, besturingssysteem, appversie, netwerk, server en instellingen die de uitslag kunnen veranderen.",
      },
      {
        title: "Meet eerst zonder VPN",
        body: "Meet waar nuttig dezelfde route zonder VPN voordat je vergelijkt met een meting waarbij de VPN aanstaat.",
      },
      {
        title: "Herhaal dezelfde test",
        body: "Gebruik dezelfde omstandigheden meer dan één keer. Bewaar ook mislukte en onduidelijke pogingen.",
      },
      {
        title: "Controleer een andere bron",
        body: "Vergelijk de waarneming met actuele uitleg van de aanbieder en een sterke externe bron als die bestaat.",
      },
      {
        title: "Publiceer de grens",
        body: "Leg uit wat de uitslag ondersteunt, wat niet en wanneer een nieuwe test nodig is.",
      },
    ],
  },
  gates: {
    eyebrow: "Publicatievoorwaarden",
    title: "Wat moet kloppen voor een sterke uitspraak?",
    intro:
      "Een pagina kan nog steeds nuttig zijn als iets ontbreekt. Dan gebruiken we voorzichtige taal en tonen we welk bewijs mist.",
    items: [
      {
        title: "Getallen hebben een verslag nodig",
        body: "Een snelheids-, vertraging- of succesgetal heeft een datum, methode, eenheid, aantal metingen en omstandigheden nodig.",
      },
      {
        title: "Vergelijken vraagt gelijke omstandigheden",
        body: "We noemen twee VPN's niet sneller of beter als de vraag en testomstandigheden niet hetzelfde waren.",
      },
      {
        title: "Prijzen hebben betaalcontext nodig",
        body: "Noem markt, munt, belasting, periode, totaalbedrag, verlenging en controledatum, of link zonder vaste prijs naar de actuele betaalpagina.",
      },
      {
        title: "Privacycontroles hebben een bereik",
        body: "Een no-logs-onderzoek ondersteunt alleen de systemen en periode die zijn bekeken. Het bewijst niet al het latere gedrag.",
      },
      {
        title: "Toegang kan snel veranderen",
        body: "Streaming en beperkte netwerken verschillen per server en tijdstip. Eén goede verbinding is geen blijvende belofte.",
      },
      {
        title: "Commerciële links hebben uitleg nodig",
        body: "Een commissiemelding staat voor of naast de eerste commerciële link. Commissie is nooit bewijs voor een claim.",
      },
    ],
  },
  limits: {
    eyebrow: "Huidige grenzen",
    title: "Wat ZeroToVPN niet beweert",
    intro:
      "Deze grenzen voorkomen dat een duidelijke pagina meer belooft dan het bewijs kan dragen.",
    items: [
      {
        title: "We testen niet elke VPN elke maand",
        body: "Reviews tonen een controledatum en het label 'nieuwe test nodig' als actueel prestatiebewijs ontbreekt.",
        href: "/reviews",
      },
      {
        title: "De snelheidstest meet één browserroute",
        body: "Hij meet deze browser naar Cloudflare op één moment. Hij geeft geen cijfer aan elke website, game of VPN-server.",
        href: "/speed-test",
      },
      {
        title: "De DNS-pagina is nu een begeleide controle",
        body: "De ingebouwde stap meet nog geen DNS-resolver. De echte resolverstap gebruikt een externe tool en de pagina blijft uit zoekmachines tot de eigen meting echt werkt.",
        href: "/tools/dns-leak-test",
      },
      {
        title: "De IP-checker herkent geen VPN",
        body: "Hij toont de openbare route en grove netwerkcontext. VPN- of proxydetectie staat duidelijk als niet uitgevoerd.",
        href: "/tools/what-is-my-ip",
      },
      {
        title: "De VPN-keuzehulp geeft een shortlist",
        body: "Hij gebruikt een kleine groep providers met bronlinks. Een match garandeert geen prijs, toegang of prestatie op jouw netwerk.",
        href: "/quiz",
      },
    ],
  },
  corrections: {
    eyebrow: "Correcties",
    title: "Een probleem met een bron, datum of test gevonden?",
    body: "Stuur de URL, de precieze uitspraak en een openbare bron met datum. We beoordelen het bewijs en passen de pagina aan als een correctie nodig is.",
    cta: "Neem contact op met de redactie",
  },
  links: [
    {
      href: "/editorial-policy",
      title: "Redactioneel beleid",
      body: "Regels voor correcties, auteurs en duidelijke bewijstaal.",
    },
    {
      href: "/affiliate-disclosure",
      title: "Uitleg over affiliatelinks",
      body: "Wat commissie wel en niet mag veranderen.",
    },
    {
      href: "/reviews",
      title: "Bibliotheek met reviews",
      body: "Bekijk bewijslabels en beperkingen in actuele providerreviews.",
    },
  ],
  faq: {
    eyebrow: "Vragen over de methode",
    title: "Duidelijke antwoorden",
    items: [
      {
        question: "Geeft ZeroToVPN elke VPN een cijfer?",
        answer:
          "Nee. Een cijfer vraagt een gepubliceerd model en actueel bewijs voor alle belangrijke onderdelen. Ontbreekt dat, dan gebruiken we een geschreven oordeel met zichtbare beperkingen.",
      },
      {
        question: "Bewijst een externe controle dat een VPN geen logs bewaart?",
        answer:
          "Nee. Het is nuttig bewijs voor de periode en systemen binnen het onderzoek. Het bewijst niet elk systeem, elke latere wijziging of wat buiten de opdracht viel.",
      },
      {
        question: "Hoe vaak worden pagina's gecontroleerd?",
        answer:
          "We verzinnen geen vaste planning voor elke pagina. Belangrijke pagina's tonen een controle- of reviewdatum. We geven voorrang aan updates na veranderingen in product, beleid of bewijs.",
      },
      {
        question: "Kan een affiliaterelatie een testuitslag veranderen?",
        answer:
          "Nee. Commissie hoort buiten de testmethode en het bewijs te blijven. Commerciële links krijgen een apart label.",
      },
    ],
  },
};

export function isMethodologyLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getMethodologyPageCopy(locale: string): MethodologyPageCopy {
  return locale === "nl" ? nl : en;
}
