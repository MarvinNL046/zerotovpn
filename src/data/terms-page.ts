export type TermsPageCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    summaryLabel: string;
    summary: string;
    effective: string;
    rightsNote: string;
  };
  scope: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  rules: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      icon: "info" | "rules" | "links" | "copyright" | "misuse" | "changes";
      title: string;
      body: string[];
      points?: string[];
    }>;
  };
  policies: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string; href: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: TermsPageCopy = {
  locale: "en",
  meta: {
    title: "Website terms in plain language",
    description:
      "Read the clear rules for using ZeroToVPN, including information limits, submitted visitor reviews, external and affiliate links, copyright, misuse and policy updates.",
  },
  breadcrumb: { home: "Home", current: "Website terms" },
  hero: {
    eyebrow: "ZeroToVPN website rules",
    title: "Website terms in plain language",
    intro:
      "These rules explain how you may use ZeroToVPN and what you can expect from an information website. They do not replace rights that the law gives you.",
    summaryLabel: "The short version",
    summary:
      "Use the site lawfully, check important facts at their current source, submit only content you may share, respect our work and do not damage or misuse the site.",
    effective: "Version in effect from 17 August 2026",
    rightsNote:
      "This page is a clear site-use notice, not legal advice. If a legal question matters to your situation, ask a qualified adviser in the right country.",
  },
  scope: {
    eyebrow: "What these terms cover",
    title: "An information site, not a VPN service",
    intro:
      "ZeroToVPN publishes guides, reviews, comparisons and browser tools. We do not run the VPN services discussed on the site.",
    items: [
      {
        title: "Information, not personal advice",
        body: "Our pages give general information. They are not legal, financial or individual security advice.",
      },
      {
        title: "No promised result",
        body: "We do not promise that a provider, route, price, feature or website access will stay the same or work for every person.",
      },
      {
        title: "Your decision stays yours",
        body: "Use current official or original sources. Consider professional help when a choice could have serious effects on the law, safety or money.",
      },
      {
        title: "Visitor reviews are moderated submissions",
        body: "A visitor can send a VPN review for moderation. Sending it does not guarantee publication. The public privacy policy explains which submitted and technical fields are handled.",
      },
    ],
  },
  rules: {
    eyebrow: "Seven clear rules",
    title: "How to use this website",
    intro:
      "The rules below protect readers, the website and the context around our evidence.",
    items: [
      {
        icon: "info",
        title: "1. Check important information",
        body: [
          "We work to keep pages clear and current, but information can be incomplete, become old or contain an error.",
          "Before you act, check the current provider page, checkout, service rules, official guidance or another original source that fits your question.",
        ],
      },
      {
        icon: "rules",
        title: "2. Follow the rules that apply to you",
        body: [
          "You are responsible for following local laws and the rules of your account, device, employer, school, network and online service.",
          "A guide, tool result or link on ZeroToVPN does not give permission to bypass a rule, access another person's data or use a service unlawfully.",
        ],
      },
      {
        icon: "links",
        title: "3. External and affiliate links",
        body: [
          "A link can take you to a website that another organisation controls. That site sets its own content, prices, terms, privacy rules and checkout.",
          "Some clearly marked links may earn ZeroToVPN a commission. A commercial relationship is not evidence and does not turn an external promise into our guarantee.",
        ],
      },
      {
        icon: "copyright",
        title: "4. Intellectual property: text, design and trademarks",
        body: [
          "ZeroToVPN's original text, illustrations and design may be protected by copyright and other rights. Names and logos from other organisations belong to their owners.",
          "You may link to a public page and use a short quote with a clear source where the law allows it. Ask first before copying, republishing or selling a large part unless a law or licence allows that use.",
        ],
      },
      {
        icon: "rules",
        title: "5. Reviews and other content you submit",
        body: [
          "Submit only content that you created or have permission to share. Do not include another person's private data, confidential material, malware, threats, unlawful content, a paid or fabricated experience, or anything intended to mislead readers.",
          "You keep the rights you have in your content. By sending it, you give ZeroToVPN a non-exclusive, worldwide and royalty-free permission to store, moderate, format and display it on ZeroToVPN while it is used. You can ask us to inspect, correct or remove it; limited backups and legal duties can still apply.",
        ],
        points: [
          "A submission can be rejected, delayed, formatted for readability or removed. Publication is not guaranteed.",
          "If approved, the display name, rating and review content may become public. The email address is not returned by the public review response.",
          "Submitting a review does not subscribe you to the newsletter.",
          "The privacy policy explains moderation records, technical request data and available contact controls.",
        ],
      },
      {
        icon: "misuse",
        title: "6. Do not misuse the site",
        body: [
          "Do not try to damage the website, gain access without permission or mislead people about who operates ZeroToVPN.",
        ],
        points: [
          "Do not send malware, phishing, spam, threats or harassing content.",
          "Do not bypass security controls, rate limits or access restrictions.",
          "Do not send automated traffic that overloads the site or ignores our published rules for bots.",
          "Do not copy our content in a way that hides its source, evidence limits or commercial labels.",
        ],
      },
      {
        icon: "changes",
        title: "7. Changes and availability",
        body: [
          "We may correct, update, move or remove content and may limit access for maintenance, safety or abuse prevention.",
          "When these terms change, we update the version date. A new version applies from the date shown on that version; it does not remove rights that law says cannot be removed.",
        ],
      },
    ],
  },
  policies: {
    eyebrow: "One topic, one policy",
    title: "Where to read about data and commercial links",
    intro:
      "These terms do not repeat details about where data goes. Use the specific policy for the topic you are checking.",
    items: [
      {
        title: "Privacy policy",
        body: "What personal data is described, including visitor-review and operator sign-in records, why it may be used and which choices or rights are explained.",
        href: "/privacy-policy",
      },
      {
        title: "Cookie policy",
        body: "How cookies, local storage and similar browser technology are described and managed.",
        href: "/cookie-policy",
      },
      {
        title: "Affiliate disclosure",
        body: "How commission links are marked and why commission is kept separate from evidence.",
        href: "/affiliate-disclosure",
      },
    ],
  },
  contact: {
    eyebrow: "Questions and corrections",
    title: "Is a rule unclear or is a page wrong?",
    body: "Send the page URL and the exact sentence or problem. Do not send passwords, account details or private browsing information.",
    cta: "Contact ZeroToVPN",
  },
  faq: {
    eyebrow: "Common questions",
    title: "Plain answers about these terms",
    items: [
      {
        question: "Does ZeroToVPN sell or operate a VPN service?",
        answer:
          "No. ZeroToVPN is an information website. VPN apps, subscriptions, accounts and support are provided by the organisation named on the external site.",
      },
      {
        question: "Does a link mean that ZeroToVPN guarantees the other site?",
        answer:
          "No. External sites control their own information, security, terms and checkout. Check the destination and its current rules before sharing data or paying.",
      },
      {
        question: "May I copy a ZeroToVPN article?",
        answer:
          "You may link to a public page and use a short quote with a clear source where the law allows it. Ask us before reproducing or selling a large part unless a law or licence permits that use.",
      },
      {
        question: "What happens when I submit a visitor review?",
        answer:
          "The review goes to moderation and publication is not guaranteed. If approved, the display name, rating and review content can appear publicly. You keep your rights and give ZeroToVPN permission to store, moderate, format and display the submission while it is used. The privacy policy explains the related data flow and contact controls.",
      },
      {
        question: "What if local law or a service rule is different?",
        answer:
          "Follow the law and service rules that apply to your situation. These website terms do not give permission to ignore them and do not replace qualified legal advice.",
      },
    ],
  },
};

const nl: TermsPageCopy = {
  locale: "nl",
  meta: {
    title: "Gebruiksvoorwaarden in duidelijke taal",
    description:
      "Lees de duidelijke regels voor ZeroToVPN over informatie, ingestuurde bezoekersreviews, externe en affiliatelinks, auteursrecht, misbruik en wijzigingen.",
  },
  breadcrumb: { home: "Start", current: "Gebruiksvoorwaarden" },
  hero: {
    eyebrow: "Regels voor de website van ZeroToVPN",
    title: "Gebruiksvoorwaarden in duidelijke taal",
    intro:
      "Deze regels leggen uit hoe je ZeroToVPN mag gebruiken en wat je van een informatieve website kunt verwachten. Ze vervangen geen rechten die je volgens de wet hebt.",
    summaryLabel: "De korte versie",
    summary:
      "Gebruik de site volgens de wet, controleer belangrijke feiten bij de actuele bron, stuur alleen inhoud die je mag delen, respecteer ons werk en misbruik de site niet.",
    effective: "Versie geldig vanaf 17 augustus 2026",
    rightsNote:
      "Deze pagina legt de regels van de site uit en is geen juridisch advies. Vraag bij een belangrijke juridische vraag hulp aan een deskundige in het juiste land.",
  },
  scope: {
    eyebrow: "Waar deze voorwaarden over gaan",
    title: "Een informatieve site, geen VPN-dienst",
    intro:
      "ZeroToVPN publiceert gidsen, reviews, vergelijkingen en browsertools. We beheren de VPN-diensten op de site niet zelf.",
    items: [
      {
        title: "Informatie, geen persoonlijk advies",
        body: "Onze pagina's geven algemene informatie. Het is geen juridisch, financieel of persoonlijk beveiligingsadvies.",
      },
      {
        title: "Geen beloofde uitslag",
        body: "We beloven niet dat een aanbieder, route, prijs, functie of toegang tot een website hetzelfde blijft of voor iedereen werkt.",
      },
      {
        title: "Jij neemt zelf de beslissing",
        body: "Gebruik actuele officiële of originele bronnen. Denk aan deskundige hulp als een keuze grote gevolgen kan hebben voor wet, veiligheid of geld.",
      },
      {
        title: "Bezoekersreviews zijn gemodereerde inzendingen",
        body: "Een bezoeker kan een VPN-review insturen voor moderatie. Insturen garandeert geen publicatie. Het openbare privacybeleid legt uit welke ingezonden en technische velden worden verwerkt.",
      },
    ],
  },
  rules: {
    eyebrow: "Zeven duidelijke regels",
    title: "Zo gebruik je deze website",
    intro:
      "De regels hieronder beschermen lezers, de website en de uitleg rond ons bewijs.",
    items: [
      {
        icon: "info",
        title: "1. Controleer belangrijke informatie",
        body: [
          "We proberen pagina's duidelijk en actueel te houden. Informatie kan toch onvolledig of oud worden, of een fout bevatten.",
          "Controleer vóór je iets doet de actuele aanbiederpagina, betaalpagina, serviceregels, officiële uitleg of een andere originele bron die bij je vraag past.",
        ],
      },
      {
        icon: "rules",
        title: "2. Volg de regels die voor jou gelden",
        body: [
          "Je bent zelf verantwoordelijk voor lokale wetten en de regels van je account, apparaat, werkgever, school, netwerk en online dienst.",
          "Een gids, tooluitslag of link op ZeroToVPN geeft geen toestemming om een regel te omzeilen, data van iemand anders te bekijken of een dienst illegaal te gebruiken.",
        ],
      },
      {
        icon: "links",
        title: "3. Externe links en affiliatelinks",
        body: [
          "Een link kan je naar een website van een andere organisatie brengen. Die site bepaalt zelf de inhoud, prijzen, voorwaarden, privacyregels en betaalpagina.",
          "Sommige duidelijk gemarkeerde links kunnen ZeroToVPN commissie opleveren. Een commerciële relatie is geen bewijs en maakt een externe belofte niet onze garantie.",
        ],
      },
      {
        icon: "copyright",
        title: "4. Intellectuele eigendom: tekst, ontwerp en merken",
        body: [
          "Eigen tekst, illustraties en ontwerp van ZeroToVPN kunnen beschermd zijn door auteursrecht en andere rechten. Namen en logo's van andere organisaties blijven van hun eigenaren.",
          "Je mag naar een openbare pagina linken en een kort stuk met duidelijke bron gebruiken als de wet dat toestaat. Vraag eerst toestemming voor het kopiëren, opnieuw publiceren of verkopen van een groot deel, behalve als een wet of licentie dat gebruik toestaat.",
        ],
      },
      {
        icon: "rules",
        title: "5. Reviews en andere inhoud die je instuurt",
        body: [
          "Stuur alleen inhoud die je zelf hebt gemaakt of mag delen. Plaats geen privégegevens van iemand anders, vertrouwelijk materiaal, malware, bedreigingen, verboden inhoud, betaalde of verzonnen ervaringen of iets dat lezers bewust misleidt.",
          "Je houdt de rechten die je op je inhoud hebt. Door de inzending te versturen geef je ZeroToVPN niet-exclusieve, wereldwijde en kosteloze toestemming om die inhoud op te slaan, te modereren, op te maken en op ZeroToVPN te tonen zolang zij wordt gebruikt. Je kunt vragen om controle, verbetering of verwijdering; beperkte back-ups en wettelijke plichten kunnen nog gelden.",
        ],
        points: [
          "Een inzending kan worden geweigerd, later behandeld, leesbaar opgemaakt of verwijderd. Publicatie is niet gegarandeerd.",
          "Na goedkeuring kunnen de weergavenaam, het cijfer en de reviewinhoud openbaar worden. Het openbare reviewantwoord bevat niet het e-mailadres.",
          "Door een review in te sturen word je niet ingeschreven voor de nieuwsbrief.",
          "Het privacybeleid legt moderatiegegevens, technische aanvraaggegevens en contactmogelijkheden uit.",
        ],
      },
      {
        icon: "misuse",
        title: "6. Misbruik de site niet",
        body: [
          "Probeer de website niet te beschadigen, zonder toestemming binnen te komen of mensen te misleiden over wie ZeroToVPN beheert.",
        ],
        points: [
          "Stuur geen malware, phishing, spam, bedreigingen of berichten om iemand lastig te vallen.",
          "Omzeil geen beveiliging, snelheidslimieten of toegangsbeperkingen.",
          "Stuur geen automatisch verkeer dat de site overbelast of onze gepubliceerde regels voor bots negeert.",
          "Kopieer onze inhoud niet op een manier die de bron, bewijsgrenzen of commerciële labels verbergt.",
        ],
      },
      {
        icon: "changes",
        title: "7. Wijzigingen en beschikbaarheid",
        body: [
          "We kunnen inhoud verbeteren, bijwerken, verplaatsen of verwijderen. Voor onderhoud, veiligheid of het stoppen van misbruik kunnen we toegang beperken.",
          "Bij een wijziging van deze voorwaarden passen we de versiedatum aan. Een nieuwe versie geldt vanaf de datum op die versie en verwijdert geen rechten die volgens de wet niet mogen worden verwijderd.",
        ],
      },
    ],
  },
  policies: {
    eyebrow: "Eén onderwerp, één beleid",
    title: "Hier lees je over data en commerciële links",
    intro:
      "Deze voorwaarden herhalen geen details over waar data naartoe gaat. Gebruik het aparte beleid voor het onderwerp dat je controleert.",
    items: [
      {
        title: "Privacybeleid",
        body: "Welke persoonsgegevens worden beschreven, waaronder bezoekersreviews en de beheerderslogin, waarom ze kunnen worden gebruikt en welke keuzes of rechten worden uitgelegd.",
        href: "/privacy-policy",
      },
      {
        title: "Cookiebeleid",
        body: "Hoe cookies, lokale opslag en vergelijkbare technieken in de browser worden beschreven en beheerd.",
        href: "/cookie-policy",
      },
      {
        title: "Uitleg over affiliatelinks",
        body: "Hoe links met commissie worden aangegeven en waarom commissie losstaat van bewijs.",
        href: "/affiliate-disclosure",
      },
    ],
  },
  contact: {
    eyebrow: "Vragen en correcties",
    title: "Is een regel onduidelijk of klopt een pagina niet?",
    body: "Stuur de URL en de precieze zin of het probleem. Stuur geen wachtwoorden, accountgegevens of privé-informatie over je surfgedrag.",
    cta: "Neem contact op met ZeroToVPN",
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Duidelijke antwoorden over deze voorwaarden",
    items: [
      {
        question: "Verkoopt of beheert ZeroToVPN zelf een VPN-dienst?",
        answer:
          "Nee. ZeroToVPN is een informatieve website. VPN-apps, abonnementen, accounts en ondersteuning komen van de organisatie op de externe site.",
      },
      {
        question: "Betekent een link dat ZeroToVPN de andere site garandeert?",
        answer:
          "Nee. Externe sites beheren hun eigen informatie, veiligheid, voorwaarden en betaalpagina. Controleer de bestemming en actuele regels voordat je data deelt of betaalt.",
      },
      {
        question: "Mag ik een artikel van ZeroToVPN kopiëren?",
        answer:
          "Je mag naar een openbare pagina linken en een kort stuk met duidelijke bron gebruiken als de wet dat toestaat. Vraag ons eerst voordat je een groot deel opnieuw publiceert of verkoopt, behalve als een wet of licentie dat toestaat.",
      },
      {
        question: "Wat gebeurt er als ik een bezoekersreview instuur?",
        answer:
          "De review gaat naar moderatie en publicatie is niet gegarandeerd. Na goedkeuring kunnen de weergavenaam, het cijfer en de reviewinhoud openbaar verschijnen. Je houdt je rechten en geeft ZeroToVPN toestemming om de inzending op te slaan, te modereren, op te maken en te tonen zolang zij wordt gebruikt. Het privacybeleid legt de gegevensstroom en contactmogelijkheden uit.",
      },
      {
        question: "Wat als de lokale wet of een serviceregel iets anders zegt?",
        answer:
          "Volg de wet en serviceregels die voor jouw situatie gelden. Deze websitevoorwaarden geven geen toestemming om ze te negeren en vervangen geen deskundig juridisch advies.",
      },
    ],
  },
};

export function isTermsLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getTermsPageCopy(locale: string): TermsPageCopy {
  return locale === "nl" ? nl : en;
}
