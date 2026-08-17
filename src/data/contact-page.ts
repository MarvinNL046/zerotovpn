export type ContactPageCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    directAnswer: string;
    emailLabel: string;
    note: string;
    cues: string[];
  };
  routes: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      id: "correction" | "privacy" | "press";
      title: string;
      body: string;
      subject: string;
      cta: string;
    }>;
  };
  prepare: {
    eyebrow: string;
    title: string;
    intro: string;
    includeTitle: string;
    include: string[];
    avoidTitle: string;
    avoid: string[];
  };
  selfService: {
    eyebrow: string;
    title: string;
    intro: string;
    links: Array<{
      href: string;
      title: string;
      body: string;
    }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: ContactPageCopy = {
  locale: "en",
  meta: {
    title: "Contact ZeroToVPN",
    description:
      "Contact ZeroToVPN about a correction, privacy request, press question or site feedback. Email us directly and learn what information not to send.",
  },
  breadcrumb: { home: "Home", current: "Contact" },
  hero: {
    eyebrow: "Contact ZeroToVPN",
    title: "A direct route to our editorial team",
    intro:
      "Send a correction, privacy question or press request by email. ZeroToVPN is an independent publisher, so provider account and billing support must go to the VPN company itself.",
    directLabel: "The short answer",
    directAnswer:
      "Email hello@zerotovpn.com. Tell us which page or issue you mean, but do not send passwords, payment details or VPN account credentials.",
    emailLabel: "Email ZeroToVPN",
    note: "Your email is handled by your email provider and ours. We do not use a web contact form on this page.",
    cues: ["No web form", "No account needed", "English or Dutch message"],
  },
  routes: {
    eyebrow: "Choose a clear subject",
    title: "What are you contacting us about?",
    intro:
      "A clear subject helps us understand your message. Every option opens the same verified ZeroToVPN email address.",
    items: [
      {
        id: "correction",
        title: "Correction or review feedback",
        body: "Point to the exact page and sentence. Add a public source or screenshot only when it does not contain private data.",
        subject: "Correction or review feedback",
        cta: "Email a correction",
      },
      {
        id: "privacy",
        title: "Privacy or data request",
        body: "Ask how site data is used or request help with a privacy right. Do not email identity documents unless we first explain why they are needed.",
        subject: "Privacy or data request",
        cta: "Email a privacy request",
      },
      {
        id: "press",
        title: "Press or business question",
        body: "Describe the publication, organisation and deadline. Commercial relationships do not buy a rating, rank or positive review.",
        subject: "Press or business question",
        cta: "Email a press question",
      },
    ],
  },
  prepare: {
    eyebrow: "Before you send",
    title: "Useful context, without sensitive data",
    intro:
      "A short, specific message is easier to check. Share only what is needed for the question.",
    includeTitle: "Helpful to include",
    include: [
      "The URL or page title you mean.",
      "What you expected and what happened.",
      "A public source and its date for a factual correction.",
      "Your deadline when the request is time-sensitive.",
    ],
    avoidTitle: "Do not send",
    avoid: [
      "Passwords, recovery codes or security keys.",
      "Card, bank or complete payment details.",
      "VPN login details or private connection logs.",
      "Passport or identity documents unless requested with a clear reason.",
    ],
  },
  selfService: {
    eyebrow: "Find an answer first",
    title: "Useful ZeroToVPN pages",
    intro:
      "These pages explain how our reviews work and how the site is funded. For a provider account problem, use that provider's official support page.",
    links: [
      {
        href: "/reviews",
        title: "VPN review library",
        body: "Find evidence, limits and the latest review date for each covered provider.",
      },
      {
        href: "/methodology",
        title: "How we assess evidence",
        body: "See how provider claims, outside checks and our own tests are kept apart.",
      },
      {
        href: "/affiliate-disclosure",
        title: "How the site is funded",
        body: "Read how commissions work and what they must not change.",
      },
      {
        href: "/privacy-policy",
        title: "Privacy policy",
        body: "Read which site services process data and how to contact us about privacy.",
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    title: "Before you email",
    items: [
      {
        question: "Can ZeroToVPN fix my VPN account or refund?",
        answer:
          "No. ZeroToVPN is independent from VPN providers and cannot open, cancel or refund a provider account. Contact the provider or store where you paid.",
      },
      {
        question: "Can I report a factual error?",
        answer:
          "Yes. Send the page URL, the exact statement and a dated public source. We will review the evidence and update the page when a correction is needed.",
      },
      {
        question: "Do you promise a reply time?",
        answer:
          "No fixed reply time is promised. Clear corrections and privacy requests are prioritised, but volume and the checks required can change the response time.",
      },
      {
        question: "Can a provider pay for a better review?",
        answer:
          "No. A commercial relationship must not buy a rating, rank or positive conclusion. Tell us if you see a disclosure or evidence problem.",
      },
    ],
  },
};

const nl: ContactPageCopy = {
  locale: "nl",
  meta: {
    title: "Contact met ZeroToVPN",
    description:
      "Neem contact op met ZeroToVPN over een correctie, privacyverzoek, persvraag of feedback. Mail ons direct en lees welke gegevens je niet moet sturen.",
  },
  breadcrumb: { home: "Start", current: "Contact" },
  hero: {
    eyebrow: "Contact met ZeroToVPN",
    title: "Een directe route naar onze redactie",
    intro:
      "Stuur een correctie, privacyvraag of persverzoek per e-mail. ZeroToVPN is een onafhankelijke uitgever. Voor hulp met een account of betaling moet je bij het VPN-bedrijf zelf zijn.",
    directLabel: "Het korte antwoord",
    directAnswer:
      "Mail hello@zerotovpn.com. Noem de pagina of het probleem, maar stuur geen wachtwoorden, betaalgegevens of inloggegevens van je VPN-account.",
    emailLabel: "Mail ZeroToVPN",
    note: "Je bericht loopt via jouw e-mailprovider en die van ons. Op deze pagina gebruiken we geen webformulier.",
    cues: ["Geen webformulier", "Geen account nodig", "Nederlands of Engels"],
  },
  routes: {
    eyebrow: "Kies een duidelijk onderwerp",
    title: "Waarover neem je contact op?",
    intro:
      "Met een duidelijk onderwerp begrijpen we je bericht sneller. Elke optie opent hetzelfde gecontroleerde e-mailadres van ZeroToVPN.",
    items: [
      {
        id: "correction",
        title: "Correctie of feedback op een review",
        body: "Noem de precieze pagina en zin. Voeg alleen een openbare bron of screenshot toe als daar geen privégegevens in staan.",
        subject: "Correctie of feedback op een review",
        cta: "Mail een correctie",
      },
      {
        id: "privacy",
        title: "Privacy- of gegevensverzoek",
        body: "Vraag hoe sitegegevens worden gebruikt of om hulp met een privacyrecht. Mail geen identiteitsbewijs voordat we uitleggen waarom dat nodig zou zijn.",
        subject: "Privacy- of gegevensverzoek",
        cta: "Mail een privacyverzoek",
      },
      {
        id: "press",
        title: "Pers- of zakelijke vraag",
        body: "Noem de publicatie, organisatie en deadline. Een commerciële relatie koopt geen cijfer, plek of positieve review.",
        subject: "Pers- of zakelijke vraag",
        cta: "Mail een persvraag",
      },
    ],
  },
  prepare: {
    eyebrow: "Voor je mailt",
    title: "Nuttige uitleg, zonder gevoelige gegevens",
    intro:
      "Een kort en precies bericht is makkelijker te controleren. Deel alleen wat nodig is voor je vraag.",
    includeTitle: "Handig om te noemen",
    include: [
      "De URL of titel van de pagina.",
      "Wat je verwachtte en wat er gebeurde.",
      "Een openbare bron met datum bij een feitelijke correctie.",
      "Je deadline als de vraag haast heeft.",
    ],
    avoidTitle: "Niet meesturen",
    avoid: [
      "Wachtwoorden, herstelcodes of beveiligingssleutels.",
      "Kaart-, bank- of volledige betaalgegevens.",
      "VPN-inloggegevens of privéverbindingslogs.",
      "Paspoort of identiteitsbewijs zonder duidelijke reden.",
    ],
  },
  selfService: {
    eyebrow: "Vind eerst zelf een antwoord",
    title: "Handige pagina's van ZeroToVPN",
    intro:
      "Deze pagina's leggen uit hoe onze reviews werken en hoe de site geld verdient. Gebruik voor een accountprobleem de officiële supportpagina van de VPN-aanbieder.",
    links: [
      {
        href: "/reviews",
        title: "Bibliotheek met VPN-reviews",
        body: "Bekijk het bewijs, de beperkingen en de laatste controledatum per aanbieder.",
      },
      {
        href: "/methodology",
        title: "Hoe we bewijs beoordelen",
        body: "Lees hoe we claims van aanbieders, externe controles en eigen tests uit elkaar houden.",
      },
      {
        href: "/affiliate-disclosure",
        title: "Hoe de site geld verdient",
        body: "Lees hoe commissies werken en wat ze niet mogen veranderen.",
      },
      {
        href: "/privacy-policy",
        title: "Privacybeleid",
        body: "Bekijk welke sitediensten gegevens verwerken en hoe je ons over privacy bereikt.",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Voor je een e-mail stuurt",
    items: [
      {
        question: "Kan ZeroToVPN mijn VPN-account of terugbetaling regelen?",
        answer:
          "Nee. ZeroToVPN staat los van VPN-aanbieders en kan een account niet openen, opzeggen of terugbetalen. Neem contact op met de aanbieder of winkel waar je betaalde.",
      },
      {
        question: "Kan ik een feitelijke fout melden?",
        answer:
          "Ja. Stuur de URL, de precieze uitspraak en een openbare bron met datum. We beoordelen het bewijs en passen de pagina aan als een correctie nodig is.",
      },
      {
        question: "Beloven jullie een vaste reactietijd?",
        answer:
          "Nee. Duidelijke correcties en privacyvragen krijgen voorrang, maar drukte en het benodigde onderzoek kunnen de reactietijd veranderen.",
      },
      {
        question: "Kan een aanbieder betalen voor een betere review?",
        answer:
          "Nee. Een commerciële relatie mag geen cijfer, plek of positieve conclusie kopen. Laat het ons weten als je een probleem met een disclosure of bron ziet.",
      },
    ],
  },
};

export function isContactLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getContactPageCopy(locale: string): ContactPageCopy {
  return locale === "nl" ? nl : en;
}
