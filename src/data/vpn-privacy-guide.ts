export type VpnPrivacyGuideCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; guides: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    directAnswer: string;
    author: string;
    reviewed: string;
    readTime: string;
  };
  visual: {
    title: string;
    before: string;
    provider: string;
    after: string;
    trustMoved: string;
    labels: [string, string, string, string];
    caption: string;
  };
  providerView: {
    eyebrow: string;
    title: string;
    intro: string;
    storedNote: string;
    items: Array<{
      icon: "account" | "payment" | "connection" | "activity" | "telemetry";
      title: string;
      body: string;
      question: string;
    }>;
  };
  noLogs: {
    eyebrow: string;
    title: string;
    intro: string;
    claimLabel: string;
    claim: string;
    translationLabel: string;
    translation: string;
    categories: Array<{ title: string; body: string }>;
  };
  context: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      label: string;
      title: string;
      body: string;
      proves: string;
      doesNotProve: string;
    }>;
    provesLabel: string;
    doesNotProveLabel: string;
  };
  checklist: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  questions: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    sourceLabel: string;
    checkedLabel: string;
    sources: Array<{ title: string; body: string; href: string }>;
    methodTitle: string;
    methodBody: string;
    methodCta: string;
    policyTitle: string;
    policyBody: string;
    policyCta: string;
    correctionTitle: string;
    correctionBody: string;
    correctionCta: string;
  };
  related: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; body: string; href: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

const en: VpnPrivacyGuideCopy = {
  locale: "en",
  meta: {
    title: "VPN privacy guide: check the data, not the badge",
    description:
      "Learn what a VPN service can see, what no-logs claims mean, how to read an audit and which privacy questions to ask before you choose.",
  },
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "VPN privacy guide",
  },
  hero: {
    eyebrow: "Provider-neutral privacy guide",
    title: "VPN privacy: check the data, not the badge",
    intro:
      "A VPN hides part of your route from the local network and internet provider. It also puts the VPN service in that route. Good privacy starts by checking which data reaches that service, what it stores and for how long.",
    directLabel: "The short answer",
    directAnswer:
      "A VPN does not remove trust. It moves trust. Read the data categories, retention rules and evidence behind a privacy claim before you rely on it.",
    author: "Written by the ZeroToVPN editorial team",
    reviewed: "Reviewed by Marvin Smit on 16 August 2026",
    readTime: "About 10 minutes",
  },
  visual: {
    title: "Where the trust moves",
    before: "Before the VPN",
    provider: "VPN service",
    after: "After the VPN",
    trustMoved: "The VPN service becomes part of the route",
    labels: [
      "Your IP reaches the VPN server",
      "Connection details may exist",
      "Traffic is forwarded",
      "HTTPS still protects content",
    ],
    caption:
      "Handling data for a live connection is not the same as saving it. A useful privacy policy says which data is stored, why, for how long and by whom.",
  },
  providerView: {
    eyebrow: "Follow the data",
    title: "What can reach a VPN service?",
    intro:
      "The service needs some data to create and run a connection. Its account, app and payment systems may receive other data too. The exact collection differs by service and app version.",
    storedNote:
      "Important: technically visible does not automatically mean stored. A no-logs claim should explain that difference for every category.",
    items: [
      {
        icon: "account",
        title: "Account data",
        body: "An email address, account ID, sign-in time, support messages or recovery details can link use to an account.",
        question:
          "Can I use the service without giving more account data than needed?",
      },
      {
        icon: "payment",
        title: "Payment data",
        body: "The service may receive a payment reference, plan and purchase time. A payment company may hold the full card or bank details instead.",
        question:
          "Which payment data goes to the VPN service and which goes only to its processor?",
      },
      {
        icon: "connection",
        title: "Connection data",
        body: "A server handles your source IP, chosen server, connection time and amount of traffic while it carries the connection.",
        question:
          "Which connection details are saved, and when are they deleted?",
      },
      {
        icon: "activity",
        title: "Traffic and destinations",
        body: "The service forwards traffic to its next destination. HTTPS normally hides page content, but destination, DNS or timing clues may still be visible depending on the setup.",
        question:
          "Does the policy separately name browsing activity, DNS requests and destination data?",
      },
      {
        icon: "telemetry",
        title: "App and device telemetry",
        body: "Apps can send crash reports, feature use, device type, operating system, identifiers or diagnostics. Third-party SDKs may receive some of it.",
        question: "Is telemetry optional, and are third-party tools named?",
      },
    ],
  },
  noLogs: {
    eyebrow: "Read past the slogan",
    title: "‘No logs’ needs a data list",
    intro:
      "There is no single public meaning that every VPN company must use for the words ‘no logs’. One service may mean no browsing history. Another may still keep connection or account data.",
    claimLabel: "Marketing claim",
    claim: "We keep no logs.",
    translationLabel: "Useful version",
    translation:
      "We do not store these named data types. We use these other data types for these reasons, keep them for this long and share them with these named parties.",
    categories: [
      {
        title: "Activity logs",
        body: "Sites, DNS requests, app traffic or content linked to a person or session.",
      },
      {
        title: "Connection logs",
        body: "Source IP, server choice, start and end time, session ID or traffic volume.",
      },
      {
        title: "Account and payment",
        body: "Contact details, account ID, subscription, invoices, payment reference and support history.",
      },
      {
        title: "App telemetry",
        body: "Crashes, diagnostics, device details, identifiers, feature use and analytics events.",
      },
      {
        title: "Security and abuse events",
        body: "Failed sign-ins, rate limits, fraud signals or records used to handle misuse.",
      },
      {
        title: "Retention and deletion",
        body: "The time each category stays in live systems, backups and third-party systems.",
      },
    ],
  },
  context: {
    eyebrow: "Evidence has a boundary",
    title: "Audit, ownership and country: useful context, not a shortcut",
    intro:
      "These facts can help you ask better questions. None of them alone proves that every privacy promise is true.",
    provesLabel: "It can show",
    doesNotProveLabel: "It does not prove",
    items: [
      {
        label: "External assurance",
        title: "Read the report, not only the badge",
        body: "Check the auditor, date or period, systems, data categories, criteria, exceptions and whether the full report is available.",
        proves:
          "What the practitioner examined and concluded inside the stated scope.",
        doesNotProve:
          "Every system, every app version or behaviour after the covered date or period.",
      },
      {
        label: "Ownership",
        title: "Find the company behind the app",
        body: "The app name may differ from the legal operator, parent company, payment company or analytics suppliers.",
        proves:
          "Who appears to control the service and which other companies may process data.",
        doesNotProve:
          "That a known or small owner automatically keeps less data or has better security.",
      },
      {
        label: "Jurisdiction",
        title: "Law is part of the picture",
        body: "Country and legal entity can affect rules and official requests. Actual collection, retention and technical controls still need separate evidence.",
        proves:
          "Which legal setting may apply to the operator and its records.",
        doesNotProve:
          "Privacy quality. A country outside an intelligence group is not a no-logs guarantee.",
      },
      {
        label: "App-store label",
        title: "Use it as a lead, not an audit",
        body: "A data-safety label can list account, device, analytics and sharing categories before install. Compare it with the full policy.",
        proves:
          "What the developer declared to the app store for that app listing.",
        doesNotProve:
          "That the declaration is complete, independently tested or equal across every platform.",
      },
    ],
  },
  checklist: {
    eyebrow: "Before you rely on a claim",
    title: "An eight-step privacy check",
    intro:
      "Save the policy and evidence you used. Both can change after you subscribe.",
    items: [
      {
        title: "Name your privacy need",
        body: "Decide who you want to hide data from and which data matters. A VPN cannot solve every tracking or device risk.",
      },
      {
        title: "Identify the operator",
        body: "Find the legal company, parent company and contact details, not only the app or product name.",
      },
      {
        title: "Make a data list",
        body: "Check account, payment, connection, activity, telemetry, support, security and abuse data separately.",
      },
      {
        title: "Write down each purpose",
        body: "Look for a plain reason for every collected category, such as billing, support, app repair or fraud control.",
      },
      {
        title: "Find a real retention time",
        body: "‘As long as needed’ is vague. Look for a time or clear deletion event, including backups where explained.",
      },
      {
        title: "Check recipients and SDKs",
        body: "See which payment, analytics, crash, support and hosting companies can receive data.",
      },
      {
        title: "Open the outside evidence",
        body: "For an audit or test, read the date, scope, criteria, result and limits. A logo is not enough.",
      },
      {
        title: "Check your installed app",
        body: "Review permissions, privacy controls and telemetry choices on the exact device and app version you use.",
      },
    ],
  },
  questions: {
    eyebrow: "Copy this list",
    title: "Questions to ask a VPN service",
    intro:
      "A clear answer should name data, purpose, time and recipient. Save the answer with its date.",
    items: [
      "Which source-IP and connection details touch your systems, and which are stored?",
      "Do you store DNS requests, destination data, browsing activity or traffic content?",
      "What account, payment and support data can be linked to a subscription?",
      "Which app telemetry is on by default, and can I turn it off?",
      "Which processors and software kits receive my data?",
      "How long does each category remain in live systems and backups?",
      "What exact systems, criteria and period did the latest outside review cover?",
      "How do you publish policy changes, incidents, official requests and corrections?",
    ],
  },
  evidence: {
    eyebrow: "Sources and corrections",
    title: "How this guide was checked",
    intro:
      "We used provider-neutral technical, consumer-protection and assurance sources. We separate what a system can handle from what a company says it stores.",
    sourceLabel: "Open source",
    checkedLabel: "Checked 16 August 2026",
    sources: [
      {
        title: "NIST SP 800-77 Rev. 1",
        body: "Technical guidance on IPsec VPNs and protection at the network layer. It does not verify a provider's logging policy.",
        href: "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      },
      {
        title: "FTC: In the market for a VPN app?",
        body: "Explains that VPN traffic is routed through the service and advises checking permissions, encryption and third-party sharing.",
        href: "https://www.ftc.gov/business-guidance/blog/2018/02/market-vpn-app",
      },
      {
        title: "EFF: Choosing the VPN That's Right for You",
        body: "Provider-neutral questions about claims, trust, data collection and outside reviews.",
        href: "https://ssd.eff.org/module/choosing-vpn-thats-right-you",
      },
      {
        title: "Google Play Data safety guidance",
        body: "Lists app data categories and explains that developers are responsible for complete and accurate declarations.",
        href: "https://support.google.com/googleplay/android-developer/answer/10787469?hl=en",
      },
      {
        title: "IAASB: ISAE 3000 (Revised)",
        body: "The international standard for assurance work outside historical financial statements; useful context for reading scope and criteria.",
        href: "https://www.iaasb.org/publications/international-standard-assurance-engagements-isae-3000-revised-assurance-engagements-other-audits-or",
      },
    ],
    methodTitle: "Read our method",
    methodBody:
      "See how we label sources, dates, limits and unknowns before publishing a strong privacy claim.",
    methodCta: "View the methodology",
    policyTitle: "Our editorial rules",
    policyBody:
      "See how evidence, commercial relationships and corrections are kept separate from the conclusion.",
    policyCta: "Read the editorial policy",
    correctionTitle: "Found a problem?",
    correctionBody:
      "Send the page URL, exact sentence and a dated public source. We will review the claim.",
    correctionCta: "Contact the editorial team",
  },
  related: {
    eyebrow: "Keep learning",
    title: "Related privacy guides and tools",
    items: [
      {
        title: "What is a VPN?",
        body: "Start with the route, tunnel and limits in plain language.",
        href: "/guides/what-is-vpn",
      },
      {
        title: "How we verify VPN claims",
        body: "See how we separate provider statements, outside checks and repeatable tests.",
        href: "/methodology",
      },
      {
        title: "VPN on a phone",
        body: "Check mobile permissions, background use and app settings.",
        href: "/best/vpn-mobile",
      },
      {
        title: "Check your current IP",
        body: "Record the public address your current connection exposes before comparing routes.",
        href: "/tools/what-is-my-ip",
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    title: "Plain answers about VPN privacy",
    items: [
      {
        question: "Does ‘no logs’ mean that a VPN stores nothing?",
        answer:
          "Not automatically. The words do not have one shared technical meaning. Check activity, connection, account, payment, telemetry, support and security data separately, including retention times.",
      },
      {
        question: "Can a VPN service see the websites I visit?",
        answer:
          "The service is in the traffic route and may see or infer destination and timing data, depending on DNS, protocol and connection design. HTTPS normally hides the page content and messages sent inside an encrypted website connection.",
      },
      {
        question: "Does an audit prove that a VPN will never log data?",
        answer:
          "No. An outside report can support a conclusion about the named systems, criteria and date or period. Read the scope and exceptions. It cannot prove every future version or action.",
      },
      {
        question:
          "Is a VPN private because it is outside the Five or Fourteen Eyes?",
        answer:
          "No. Jurisdiction is context, not proof. The operator, actual data collection, retention, technical controls, processors and outside evidence all matter too.",
      },
      {
        question: "Can my payment identify my VPN account?",
        answer:
          "It can, depending on the payment method and account design. Check which reference the VPN service receives and which details stay with the payment company.",
      },
      {
        question: "Is an app-store privacy label enough?",
        answer:
          "No. It is a useful list to compare with the privacy policy and app permissions, but it is based on information supplied by the developer. It is not the same as an independent audit.",
      },
    ],
  },
};

const nl: VpnPrivacyGuideCopy = {
  locale: "nl",
  meta: {
    title: "VPN-privacygids: controleer data, niet het label",
    description:
      "Leer wat een VPN-dienst kan zien, wat no-logs betekent, hoe je een audit leest en welke privacyvragen je voor je keuze stelt.",
  },
  breadcrumb: {
    home: "Start",
    guides: "Gidsen",
    current: "VPN-privacygids",
  },
  hero: {
    eyebrow: "Providerneutrale privacygids",
    title: "VPN-privacy: controleer data, niet het label",
    intro:
      "Een VPN verbergt een deel van je internetroute voor het lokale netwerk en je internetprovider. De VPN-dienst komt zelf in die route te staan. Goede privacy begint dus bij de vraag welke data de dienst ontvangt, opslaat en weer verwijdert.",
    directLabel: "Het korte antwoord",
    directAnswer:
      "Een VPN haalt vertrouwen niet weg, maar verplaatst het. Lees de datacategorieën, bewaartermijnen en het bewijs achter een privacyclaim voordat je erop vertrouwt.",
    author: "Geschreven door de redactie van ZeroToVPN",
    reviewed: "Beoordeeld door Marvin Smit op 16 augustus 2026",
    readTime: "Ongeveer 10 minuten",
  },
  visual: {
    title: "Waar het vertrouwen heen gaat",
    before: "Voor de VPN",
    provider: "VPN-dienst",
    after: "Na de VPN",
    trustMoved: "De VPN-dienst wordt onderdeel van de route",
    labels: [
      "Je IP-adres bereikt de VPN-server",
      "Verbindingsdata kan bestaan",
      "Verkeer wordt doorgestuurd",
      "HTTPS beschermt de inhoud",
    ],
    caption:
      "Data verwerken voor een actieve verbinding is niet hetzelfde als data bewaren. Een nuttig privacybeleid zegt wat wordt opgeslagen, waarom, hoelang en door wie.",
  },
  providerView: {
    eyebrow: "Volg de data",
    title: "Welke data kan een VPN-dienst bereiken?",
    intro:
      "De dienst heeft data nodig om een verbinding te maken en te laten werken. De systemen voor accounts, apps en betalingen kunnen daarnaast andere data ontvangen. De precieze verzameling verschilt per dienst en appversie.",
    storedNote:
      "Belangrijk: technisch zichtbaar betekent niet automatisch opgeslagen. Een no-logs-claim hoort dat verschil per categorie uit te leggen.",
    items: [
      {
        icon: "account",
        title: "Accountdata",
        body: "Een e-mailadres, accountnummer, inlogtijd, supportbericht of herstelgegeven kan gebruik aan een account koppelen.",
        question:
          "Kan ik de dienst gebruiken zonder meer accountdata te geven dan nodig?",
      },
      {
        icon: "payment",
        title: "Betaaldata",
        body: "De dienst kan een betaalreferentie, abonnement en kooptijd ontvangen. Een betaalbedrijf kan de volledige kaart- of bankgegevens bewaren.",
        question:
          "Welke betaaldata krijgt de VPN-dienst en welke data blijft bij de betaalverwerker?",
      },
      {
        icon: "connection",
        title: "Verbindingsdata",
        body: "Een server verwerkt je bron-IP, gekozen server, verbindingstijd en hoeveelheid verkeer terwijl de verbinding actief is.",
        question:
          "Welke verbindingsdata wordt opgeslagen en wanneer wordt die verwijderd?",
      },
      {
        icon: "activity",
        title: "Verkeer en bestemmingen",
        body: "De dienst stuurt verkeer door. HTTPS verbergt normaal de pagina-inhoud, maar bestemming, DNS of tijdstippen kunnen door de opzet nog zichtbaar zijn.",
        question:
          "Noemt het beleid browseractiviteit, DNS-verzoeken en bestemmingsdata apart?",
      },
      {
        icon: "telemetry",
        title: "App- en apparaatgegevens",
        body: "Apps kunnen crashes, functiegebruik, apparaattype, besturingssysteem, codes of diagnosegegevens sturen. Externe software kan iets ontvangen.",
        question:
          "Kan ik metingen uitzetten en worden externe hulpmiddelen bij naam genoemd?",
      },
    ],
  },
  noLogs: {
    eyebrow: "Lees verder dan de slogan",
    title: "‘No logs’ heeft een datalijst nodig",
    intro:
      "Er is geen openbare betekenis die ieder VPN-bedrijf verplicht voor de woorden ‘no logs’ gebruikt. De ene dienst bedoelt geen browsergeschiedenis. Een andere bewaart misschien nog wel verbindings- of accountdata.",
    claimLabel: "Reclameclaim",
    claim: "Wij bewaren geen logs.",
    translationLabel: "Bruikbare versie",
    translation:
      "Wij slaan deze genoemde soorten data niet op. Deze andere data gebruiken we om deze redenen, bewaren we zo lang en delen we met deze genoemde partijen.",
    categories: [
      {
        title: "Activiteitslogs",
        body: "Sites, DNS-verzoeken, appverkeer of inhoud die aan een persoon of sessie is gekoppeld.",
      },
      {
        title: "Verbindingslogs",
        body: "Bron-IP, serverkeuze, begin- en eindtijd, sessiecode of hoeveelheid verkeer.",
      },
      {
        title: "Account en betaling",
        body: "Contactdata, accountnummer, abonnement, facturen, betaalreferentie en supportgeschiedenis.",
      },
      {
        title: "Appmetingen",
        body: "Crashes, diagnose, apparaatgegevens, codes, functiegebruik en gebeurtenissen voor analyse.",
      },
      {
        title: "Veiligheids- en misbruikdata",
        body: "Mislukte logins, limieten, fraudesignalen of gegevens om misbruik af te handelen.",
      },
      {
        title: "Bewaren en verwijderen",
        body: "Hoelang iedere categorie in actieve systemen, back-ups en externe systemen blijft staan.",
      },
    ],
  },
  context: {
    eyebrow: "Bewijs heeft grenzen",
    title: "Audit, eigenaar en land: nuttige context, geen snel bewijs",
    intro:
      "Deze feiten helpen om betere vragen te stellen. Geen enkel feit bewijst in zijn eentje dat iedere privacybelofte klopt.",
    provesLabel: "Dit kan het laten zien",
    doesNotProveLabel: "Dit bewijst het niet",
    items: [
      {
        label: "Externe controle",
        title: "Lees het rapport, niet alleen het label",
        body: "Controleer onderzoeker, datum of periode, systemen, datacategorieën, regels, uitzonderingen en of het hele rapport beschikbaar is.",
        proves:
          "Wat de onderzoeker binnen het genoemde bereik controleerde en concludeerde.",
        doesNotProve:
          "Ieder systeem, iedere appversie of gedrag na de genoemde datum of periode.",
      },
      {
        label: "Eigendom",
        title: "Vind het bedrijf achter de app",
        body: "De appnaam kan anders zijn dan de juridische beheerder, het moederbedrijf, betaalbedrijf of de partijen voor analyse.",
        proves:
          "Wie de dienst lijkt te beheren en welke andere bedrijven data kunnen verwerken.",
        doesNotProve:
          "Dat een bekende of kleine eigenaar automatisch minder data bewaart of veiliger is.",
      },
      {
        label: "Rechtsgebied",
        title: "De wet is een deel van het plaatje",
        body: "Land en juridisch bedrijf kunnen invloed hebben op regels en officiële verzoeken. Verzameling, bewaartijd en techniek hebben apart bewijs nodig.",
        proves:
          "Welke juridische omgeving mogelijk geldt voor de beheerder en zijn gegevens.",
        doesNotProve:
          "Goede privacy. Een land buiten een inlichtingengroep is geen no-logs-garantie.",
      },
      {
        label: "Label in de appwinkel",
        title: "Gebruik het als aanwijzing, niet als audit",
        body: "Een datalabel kan voor installatie account-, apparaat-, analyse- en deelcategorieën tonen. Vergelijk het met het hele beleid.",
        proves:
          "Wat de ontwikkelaar voor die app aan de appwinkel heeft opgegeven.",
        doesNotProve:
          "Dat de uitleg compleet, onafhankelijk getest of voor elk platform gelijk is.",
      },
    ],
  },
  checklist: {
    eyebrow: "Voor je een claim vertrouwt",
    title: "Privacycontrole in acht stappen",
    intro:
      "Bewaar het beleid en bewijs waarop je keuze rust. Beide kunnen na je abonnement veranderen.",
    items: [
      {
        title: "Noem je privacydoel",
        body: "Bepaal voor wie je data wilt verbergen en welke data telt. Een VPN lost niet ieder volg- of apparaatrisico op.",
      },
      {
        title: "Zoek de beheerder",
        body: "Vind het juridische bedrijf, moederbedrijf en contactgegevens, niet alleen de app- of productnaam.",
      },
      {
        title: "Maak een datalijst",
        body: "Controleer account, betaling, verbinding, activiteit, appmetingen, support, veiligheid en misbruik apart.",
      },
      {
        title: "Schrijf elk doel op",
        body: "Zoek een duidelijke reden voor iedere categorie, zoals betaling, support, appreparatie of fraudecontrole.",
      },
      {
        title: "Vind een echte bewaartermijn",
        body: "‘Zolang nodig’ is vaag. Zoek een tijd of duidelijke verwijderactie, en controleer uitleg over back-ups.",
      },
      {
        title: "Controleer ontvangers en software",
        body: "Bekijk welke betaal-, analyse-, crash-, support- en hostingbedrijven data kunnen ontvangen.",
      },
      {
        title: "Open het externe bewijs",
        body: "Lees bij een audit of test de datum, het bereik, de regels, uitkomst en grenzen. Een logo is niet genoeg.",
      },
      {
        title: "Controleer je geïnstalleerde app",
        body: "Bekijk rechten, privacyknoppen en meetkeuzes op precies het apparaat en de appversie die jij gebruikt.",
      },
    ],
  },
  questions: {
    eyebrow: "Kopieer deze lijst",
    title: "Vragen voor een VPN-dienst",
    intro:
      "Een duidelijk antwoord noemt data, doel, tijd en ontvanger. Bewaar het antwoord samen met de datum.",
    items: [
      "Welke bron-IP- en verbindingsdata raakt jullie systemen en wat slaan jullie daarvan op?",
      "Bewaren jullie DNS-verzoeken, bestemmingsdata, browseractiviteit of verkeersinhoud?",
      "Welke account-, betaal- en supportdata kan aan een abonnement worden gekoppeld?",
      "Welke appmetingen staan standaard aan en kan ik die uitzetten?",
      "Welke verwerkers en softwarepakketten ontvangen mijn data?",
      "Hoelang blijft iedere categorie in actieve systemen en back-ups?",
      "Welke systemen, regels en periode omvatte de laatste externe controle precies?",
      "Hoe publiceren jullie beleidswijzigingen, incidenten, officiële verzoeken en correcties?",
    ],
  },
  evidence: {
    eyebrow: "Bronnen en correcties",
    title: "Zo is deze gids gecontroleerd",
    intro:
      "We gebruikten providerneutrale bronnen over techniek, consumentenbescherming en assurance. We houden apart wat een systeem kan verwerken en wat een bedrijf zegt te bewaren.",
    sourceLabel: "Open bron",
    checkedLabel: "Gecontroleerd op 16 augustus 2026",
    sources: [
      {
        title: "NIST SP 800-77 Rev. 1",
        body: "Technische uitleg over IPsec-VPN's en bescherming op netwerkniveau. De bron controleert geen logbeleid van een provider.",
        href: "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      },
      {
        title: "FTC: In the market for a VPN app?",
        body: "Legt uit dat verkeer via de dienst loopt en adviseert om rechten, versleuteling en delen met derden te controleren.",
        href: "https://www.ftc.gov/business-guidance/blog/2018/02/market-vpn-app",
      },
      {
        title: "EFF: Choosing the VPN That's Right for You",
        body: "Providerneutrale vragen over claims, vertrouwen, dataverzameling en externe controles.",
        href: "https://ssd.eff.org/module/choosing-vpn-thats-right-you",
      },
      {
        title: "Uitleg over Google Play Data safety",
        body: "Noemt datacategorieën voor apps en legt uit dat ontwikkelaars verantwoordelijk zijn voor complete en juiste uitleg.",
        href: "https://support.google.com/googleplay/android-developer/answer/10787469?hl=en",
      },
      {
        title: "IAASB: ISAE 3000 (Revised)",
        body: "De internationale standaard voor assurance buiten historische financiële informatie; nuttige context voor bereik en regels.",
        href: "https://www.iaasb.org/publications/international-standard-assurance-engagements-isae-3000-revised-assurance-engagements-other-audits-or",
      },
    ],
    methodTitle: "Lees onze methode",
    methodBody:
      "Bekijk hoe we bronnen, datums, grenzen en onbekende punten aangeven voordat we een sterke privacyclaim publiceren.",
    methodCta: "Bekijk de methodologie",
    policyTitle: "Onze redactieregels",
    policyBody:
      "Bekijk hoe bewijs, commerciële relaties en correcties los blijven staan van de conclusie.",
    policyCta: "Lees het redactiebeleid",
    correctionTitle: "Een probleem gevonden?",
    correctionBody:
      "Stuur de URL, de precieze zin en een openbare bron met datum. We bekijken de claim opnieuw.",
    correctionCta: "Neem contact op met de redactie",
  },
  related: {
    eyebrow: "Verder leren",
    title: "Bijpassende privacygidsen en hulpmiddelen",
    items: [
      {
        title: "Wat is een VPN?",
        body: "Begin bij de route, tunnel en grenzen in simpele taal.",
        href: "/guides/what-is-vpn",
      },
      {
        title: "VPN-snelheid begrijpen",
        body: "Bekijk hoe route, afstand en netwerkcondities de gemeten snelheid beïnvloeden.",
        href: "/guides/vpn-speed-guide",
      },
      {
        title: "VPN-keuzehulp",
        body: "Begin bij je apparaten, gebruik en privacybehoeften voordat je een dienst kiest.",
        href: "/quiz",
      },
      {
        title: "Controleer je huidige IP-adres",
        body: "Noteer welk openbaar adres je huidige verbinding toont voordat je routes vergelijkt.",
        href: "/tools/what-is-my-ip",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Duidelijke antwoorden over VPN-privacy",
    items: [
      {
        question: "Betekent ‘no logs’ dat een VPN niets bewaart?",
        answer:
          "Niet automatisch. De woorden hebben geen vaste technische betekenis. Controleer activiteit, verbinding, account, betaling, appmetingen, support en veiligheidsdata apart, samen met de bewaartermijnen.",
      },
      {
        question: "Kan een VPN-dienst zien welke websites ik bezoek?",
        answer:
          "De dienst staat in de verkeersroute en kan door de opzet mogelijk bestemming en tijdstippen zien of afleiden. HTTPS verbergt normaal de pagina-inhoud en berichten binnen een versleutelde websiteverbinding.",
      },
      {
        question: "Bewijst een audit dat een VPN nooit data zal loggen?",
        answer:
          "Nee. Een extern rapport kan een conclusie steunen over genoemde systemen, regels en een datum of periode. Lees bereik en uitzonderingen. Het bewijst niet iedere toekomstige versie of handeling.",
      },
      {
        question:
          "Is een VPN privé omdat het buiten de Five or Fourteen Eyes valt?",
        answer:
          "Nee. Het rechtsgebied is context, geen bewijs. De beheerder, echte dataverzameling, bewaartijd, techniek, verwerkers en extern bewijs tellen ook mee.",
      },
      {
        question: "Kan mijn betaling mijn VPN-account herkenbaar maken?",
        answer:
          "Dat kan, afhankelijk van de betaalmethode en de opzet van het account. Controleer welke referentie de VPN-dienst krijgt en welke gegevens bij het betaalbedrijf blijven.",
      },
      {
        question: "Is een privacylabel in de appwinkel genoeg?",
        answer:
          "Nee. Het is een nuttige lijst om met het privacybeleid en de apprechten te vergelijken, maar de ontwikkelaar levert de informatie aan. Het is niet hetzelfde als een onafhankelijke audit.",
      },
    ],
  },
};

export function isVpnPrivacyGuideLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getVpnPrivacyGuideCopy(locale: string): VpnPrivacyGuideCopy {
  return locale === "nl" ? nl : en;
}
