export type AffiliateDisclosurePageCopy = {
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
  rules: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  flow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: Array<{
      tone: "claim" | "external" | "tested" | "unknown";
      title: string;
      body: string;
    }>;
  };
  register: {
    eyebrow: string;
    title: string;
    body: string;
    legacyTitle: string;
    legacyBody: string;
    reportLabel: string;
  };
  links: Array<{ href: string; title: string; body: string }>;
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: AffiliateDisclosurePageCopy = {
  locale: "en",
  meta: {
    title: "Affiliate disclosure",
    description:
      "Learn how ZeroToVPN uses clearly marked commercial links, what a commission can and cannot change, and how provider claims stay separate from evidence.",
  },
  breadcrumb: { home: "Home", current: "Affiliate disclosure" },
  hero: {
    eyebrow: "How ZeroToVPN is funded",
    title: "A commission is not evidence",
    intro:
      "ZeroToVPN may earn money when you buy through a clearly marked provider link. You do not pay a separate fee to ZeroToVPN. The provider, offer and checkout terms can still change.",
    directLabel: "The rule in one sentence",
    directAnswer:
      "Commercial links must be labelled, must not decide an editorial conclusion, and must never be presented as proof that a VPN works.",
    checked: "Disclosure checked 16 August 2026",
    cues: [
      "Commercial links are marked",
      "Evidence is labelled separately",
      "No paid review score",
    ],
  },
  rules: {
    eyebrow: "Our publication rules",
    title: "What a commission may—and may not—do",
    intro:
      "A commercial relationship can fund the site. It cannot turn an unknown result into a fact.",
    items: [
      {
        title: "It may fund our work",
        body: "A provider or affiliate network may pay ZeroToVPN after a qualifying purchase through a marked link.",
      },
      {
        title: "It may not buy a conclusion",
        body: "A fee must not buy a rank, rating, positive finding or the removal of an important limitation.",
      },
      {
        title: "It does not prove the best price",
        body: "A marked link can open a campaign or checkout. Compare the total due today, tax, included products and renewal terms yourself.",
      },
      {
        title: "It does not prove performance",
        body: "Payment says nothing about speed, privacy, streaming or reliability. Those points need their own dated evidence.",
      },
    ],
  },
  flow: {
    eyebrow: "What happens after a click",
    title: "How a marked provider link works",
    intro:
      "The exact route can differ by provider and market. This is the normal pattern, not a promise about every checkout.",
    steps: [
      {
        title: "You see a disclosure",
        body: "The page explains that the link may earn a commission before or beside the first commercial action.",
      },
      {
        title: "You open a tracked route",
        body: "The link may pass through a ZeroToVPN redirect and then open the provider or its checkout partner.",
      },
      {
        title: "You check the provider terms",
        body: "The provider controls the final price, tax, plan, renewal and refund conditions shown at checkout.",
      },
      {
        title: "A purchase may be credited",
        body: "If the network accepts the purchase, ZeroToVPN may receive a commission. Not every click or purchase is credited.",
      },
    ],
  },
  evidence: {
    eyebrow: "Keep the labels apart",
    title: "Commercial status and evidence status are different",
    intro:
      "A provider can be a commercial partner and still have unknowns. A non-partner can still have useful evidence.",
    labels: [
      {
        tone: "claim",
        title: "Provider information",
        body: "The VPN company says this. It is useful for product details, but it is not an independent result.",
      },
      {
        tone: "external",
        title: "Outside check",
        body: "Another named organisation checked a dated and limited part of the claim.",
      },
      {
        tone: "tested",
        title: "ZeroToVPN test",
        body: "We ran and documented this specific test. The page states the device, date and limits.",
      },
      {
        tone: "unknown",
        title: "Not yet known",
        body: "The available evidence is missing, too old or not comparable. We do not fill the gap with a score.",
      },
    ],
  },
  register: {
    eyebrow: "Relationship status",
    title: "Look at the link, not an outdated provider list",
    body: "Affiliate eligibility can change by provider, offer and market. A legacy redirect can also remain in old content after a relationship changes. For that reason, the disclosure beside a current commercial link is the source of truth on the page.",
    legacyTitle: "Older pages are being migrated",
    legacyBody:
      "Some older pages may use outdated ranks, prices or disclosure placement. They are not the standard for new templates. Report a missing label or unclear commercial link so we can correct it.",
    reportLabel: "Report a disclosure problem",
  },
  links: [
    {
      href: "/methodology",
      title: "Methodology",
      body: "How claims, outside checks and our own tests are separated.",
    },
    {
      href: "/editorial-policy",
      title: "Editorial policy",
      body: "The rules for corrections, independence and evidence language.",
    },
    {
      href: "/privacy-policy",
      title: "Privacy policy",
      body: "How site and third-party services may process technical data.",
    },
    {
      href: "/contact",
      title: "Contact ZeroToVPN",
      body: "Report a missing disclosure, bad link or factual error.",
    },
  ],
  faq: {
    eyebrow: "Plain answers",
    title: "Affiliate questions",
    items: [
      {
        question: "Do I pay extra when I use an affiliate link?",
        answer:
          "You do not pay a separate fee to ZeroToVPN. The provider controls the price and terms shown at checkout, so always compare the final total and renewal amount.",
      },
      {
        question: "Does ZeroToVPN test every VPN it mentions?",
        answer:
          "No. Each page should say what we tested, what comes from a provider and what is still unknown. A mention or commercial link is not proof of a test.",
      },
      {
        question: "Are all provider links affiliate links?",
        answer:
          "No. Some links are ordinary source or product links. A commercial link should be clearly marked and include the technical sponsored relationship attribute.",
      },
      {
        question: "Can commission change the order of providers?",
        answer:
          "Our rule is that commission must not decide editorial order or conclusions. When evidence cannot support a winner, the page should say so instead of inventing a rank.",
      },
    ],
  },
};

const nl: AffiliateDisclosurePageCopy = {
  locale: "nl",
  meta: {
    title: "Uitleg over affiliatelinks",
    description:
      "Lees hoe ZeroToVPN duidelijk gemarkeerde commerciële links gebruikt, wat commissie wel en niet mag veranderen en hoe bewijs apart blijft van claims.",
  },
  breadcrumb: { home: "Start", current: "Uitleg over affiliatelinks" },
  hero: {
    eyebrow: "Hoe ZeroToVPN geld verdient",
    title: "Commissie is geen bewijs",
    intro:
      "ZeroToVPN kan geld verdienen als je via een duidelijk gemarkeerde providerlink koopt. Je betaalt geen aparte kosten aan ZeroToVPN. De aanbieder, aanbieding en betaalvoorwaarden kunnen wel veranderen.",
    directLabel: "De regel in één zin",
    directAnswer:
      "Commerciële links moeten herkenbaar zijn, mogen geen redactionele conclusie bepalen en zijn nooit bewijs dat een VPN werkt.",
    checked: "Disclosure gecontroleerd op 16 augustus 2026",
    cues: [
      "Commerciële links zijn gemarkeerd",
      "Bewijs heeft eigen labels",
      "Geen betaald reviewcijfer",
    ],
  },
  rules: {
    eyebrow: "Onze publicatieregels",
    title: "Wat commissie wel en niet mag doen",
    intro:
      "Een commerciële relatie kan de site helpen betalen. Ze kan een onbekende uitslag niet veranderen in een feit.",
    items: [
      {
        title: "Ze kan ons werk betalen",
        body: "Een aanbieder of affiliatenetwerk kan ZeroToVPN betalen na een geschikte aankoop via een gemarkeerde link.",
      },
      {
        title: "Ze koopt geen conclusie",
        body: "Een vergoeding mag geen plek, cijfer, positieve conclusie of het verbergen van een belangrijk nadeel kopen.",
      },
      {
        title: "Ze bewijst niet de beste prijs",
        body: "Een gemarkeerde link kan een campagne of betaalpagina openen. Vergelijk zelf het totaalbedrag, belasting, producten en de verlenging.",
      },
      {
        title: "Ze bewijst geen prestaties",
        body: "Een betaling zegt niets over snelheid, privacy, streaming of betrouwbaarheid. Daarvoor is eigen bewijs met datum nodig.",
      },
    ],
  },
  flow: {
    eyebrow: "Wat gebeurt er na een klik?",
    title: "Zo werkt een gemarkeerde providerlink",
    intro:
      "De precieze route verschilt per aanbieder en markt. Dit is het normale patroon, geen belofte over elke betaalpagina.",
    steps: [
      {
        title: "Je ziet een disclosure",
        body: "De pagina legt voor of naast de eerste commerciële actie uit dat de link commissie kan opleveren.",
      },
      {
        title: "Je opent een gevolgde route",
        body: "De link kan via een ZeroToVPN-redirect naar de aanbieder of zijn betaalpartner gaan.",
      },
      {
        title: "Je controleert de voorwaarden",
        body: "De aanbieder bepaalt de uiteindelijke prijs, belasting, looptijd, verlenging en regels voor terugbetaling.",
      },
      {
        title: "Een aankoop kan meetellen",
        body: "Als het netwerk de aankoop accepteert, kan ZeroToVPN commissie krijgen. Niet elke klik of aankoop telt mee.",
      },
    ],
  },
  evidence: {
    eyebrow: "Houd de labels uit elkaar",
    title: "Commerciële status en bewijsstatus zijn verschillend",
    intro:
      "Een aanbieder kan een commerciële partner zijn en toch onbekende punten hebben. Een niet-partner kan juist nuttig bewijs hebben.",
    labels: [
      {
        tone: "claim",
        title: "Informatie van de aanbieder",
        body: "Het VPN-bedrijf zegt dit. Nuttig voor productdetails, maar geen onafhankelijke uitslag.",
      },
      {
        tone: "external",
        title: "Externe controle",
        body: "Een andere genoemde organisatie controleerde op een bepaalde datum een beperkt deel van de claim.",
      },
      {
        tone: "tested",
        title: "Test van ZeroToVPN",
        body: "We voerden deze precieze test uit en legden hem vast. De pagina noemt apparaat, datum en beperkingen.",
      },
      {
        tone: "unknown",
        title: "Nog niet bekend",
        body: "Het bewijs ontbreekt, is te oud of niet eerlijk te vergelijken. We vullen het gat niet met een cijfer.",
      },
    ],
  },
  register: {
    eyebrow: "Status van een relatie",
    title: "Kijk naar de link, niet naar een verouderde providerlijst",
    body: "Of commissie mogelijk is kan wisselen per aanbieder, aanbieding en markt. Een oude redirect kan ook blijven bestaan nadat een relatie verandert. Daarom is de disclosure bij een huidige commerciële link de bron op die pagina.",
    legacyTitle: "Oudere pagina's worden vernieuwd",
    legacyBody:
      "Sommige oudere pagina's kunnen verouderde plekken, prijzen of disclosures hebben. Dat is niet de standaard voor nieuwe templates. Meld een ontbrekend label of onduidelijke commerciële link, dan kunnen we dit herstellen.",
    reportLabel: "Meld een disclosureprobleem",
  },
  links: [
    {
      href: "/methodology",
      title: "Methodologie",
      body: "Hoe we claims, externe controles en eigen tests uit elkaar houden.",
    },
    {
      href: "/editorial-policy",
      title: "Redactioneel beleid",
      body: "De regels voor correcties, onafhankelijkheid en duidelijke bewijstaal.",
    },
    {
      href: "/privacy-policy",
      title: "Privacybeleid",
      body: "Hoe site- en externe diensten technische gegevens kunnen verwerken.",
    },
    {
      href: "/contact",
      title: "Contact met ZeroToVPN",
      body: "Meld een ontbrekende disclosure, kapotte link of feitelijke fout.",
    },
  ],
  faq: {
    eyebrow: "Duidelijke antwoorden",
    title: "Vragen over affiliatelinks",
    items: [
      {
        question: "Betaal ik extra als ik een affiliatelink gebruik?",
        answer:
          "Je betaalt geen aparte kosten aan ZeroToVPN. De aanbieder bepaalt de prijs en voorwaarden op de betaalpagina. Vergelijk dus altijd het eindbedrag en de verlengprijs.",
      },
      {
        question: "Test ZeroToVPN elke VPN die wordt genoemd?",
        answer:
          "Nee. Elke pagina hoort te zeggen wat we testten, wat van een aanbieder komt en wat nog onbekend is. Een vermelding of commerciële link bewijst geen test.",
      },
      {
        question: "Is elke providerlink een affiliatelink?",
        answer:
          "Nee. Sommige links zijn gewone bron- of productlinks. Een commerciële link hoort duidelijk gemarkeerd te zijn en technisch het kenmerk sponsored te hebben.",
      },
      {
        question: "Kan commissie de volgorde van aanbieders bepalen?",
        answer:
          "Onze regel is dat commissie de redactionele volgorde of conclusie niet mag bepalen. Als bewijs geen winnaar ondersteunt, hoort de pagina dat te zeggen in plaats van een plek te verzinnen.",
      },
    ],
  },
};

export function isAffiliateDisclosureLocale(
  locale: string,
): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getAffiliateDisclosurePageCopy(locale: string) {
  return locale === "nl" ? nl : en;
}
