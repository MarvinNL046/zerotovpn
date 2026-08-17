export const IRAN_ROUNDUP_SLUG =
  "best-vpn-for-iran-2026-bypass-internet-censorship";

export const IRAN_ROUNDUP_UPDATED_AT = "2026-08-15T00:00:00.000Z";

export type IranRoundupLocale = "en" | "nl";

export type IranRoundupProvider = {
  slug: "nordvpn" | "surfshark" | "protonvpn";
  badge: string;
  bestFor: string;
  skipIf: string;
  documentedFeature: string;
  requirement: string;
  testStatus: string;
  summary: string;
  reviewLabel: string;
  ctaLabel: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type IranRoundupCopy = {
  metadataTitle: string;
  metadataDescription: string;
  home: string;
  blog: string;
  eyebrow: string;
  title: string;
  dek: string;
  directAnswerLabel: string;
  directAnswer: string;
  networkStatus: string;
  imageAlt: string;
  imageCaption: string;
  authorLine: string;
  updatedLine: string;
  evidenceLine: string;
  disclosureLink: string;
  nav: Array<{ href: string; label: string }>;
  criteriaEyebrow: string;
  criteriaTitle: string;
  criteriaIntro: string;
  criteria: Array<{ title: string; body: string }>;
  shortlistEyebrow: string;
  shortlistTitle: string;
  shortlistIntro: string;
  evidenceLegend: {
    documented: string;
    notRetested: string;
    unknown: string;
  };
  providers: IranRoundupProvider[];
  partnerLabel: string;
  compareTitle: string;
  compareIntro: string;
  compareHeaders: string[];
  compareRows: Array<{
    slug: IranRoundupProvider["slug"];
    feature: string;
    setup: string;
    devices: string;
    limit: string;
  }>;
  deepDiveEyebrow: string;
  deepDiveTitle: string;
  deepDiveIntro: string;
  nordImageAlt: string;
  nordImageCaption: string;
  methodTitle: string;
  methodIntro: string;
  methodCards: Array<{ label: string; title: string; body: string }>;
  prepareEyebrow: string;
  prepareTitle: string;
  prepareIntro: string;
  prepareSteps: Array<{ title: string; body: string }>;
  troubleTitle: string;
  troubleIntro: string;
  troubleSteps: string[];
  safetyTitle: string;
  safetyBody: string;
  safetyLink: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  sourcesTitle: string;
  sourcesIntro: string;
  sources: Array<{ label: string; url: string; note: string }>;
  authorTitle: string;
  authorRole: string;
  authorBody: string;
  authorLink: string;
  newsletterEyebrow: string;
  newsletterTitle: string;
  newsletterBody: string;
  relatedTitle: string;
  related: Array<{ href: string; label: string; body: string }>;
};

const en: IranRoundupCopy = {
  metadataTitle: "Best VPN for Iran 2026: 3 Options & Setup Checklist",
  metadataDescription:
    "Compare the best VPNs for Iran in 2026. Check obfuscation, app access, refund terms and key limits before choosing a VPN for a restricted network.",
  home: "Home",
  blog: "Blog",
  eyebrow: "VPN guide for restricted networks",
  title: "Best VPN for Iran 2026: 3 options and a setup checklist",
  dek:
    "NordVPN, Surfshark and Proton VPN document tools made for restricted networks. None is guaranteed to work on every Iranian network, device or day, so choose by setup, limits and current support — not by a star score.",
  directAnswerLabel: "The short answer",
  directAnswer:
    "Start with NordVPN if you want a documented obfuscated-server option, compare Surfshark for NoBorders on many devices, and consider Proton VPN for its Stealth protocol. Install and test the official app before you depend on it.",
  networkStatus:
    "Iran's internet environment is heavily restricted and can change quickly. A result from another person or date is not proof for your connection.",
  imageAlt:
    "Editorial view over Tehran with the Milad Tower, Alborz mountains, tea and a phone",
  imageCaption:
    "ZeroToVPN editorial scene. It is not an on-the-ground photo or a live connectivity test.",
  authorLine: "Reviewed by Marvin Smit",
  updatedLine: "Updated 15 August 2026",
  evidenceLine: "Current Iran network test: not repeated",
  disclosureLink: "How we fund this site",
  nav: [
    { href: "#how-to-choose", label: "How to choose" },
    { href: "#shortlist", label: "Top 3" },
    { href: "#comparison", label: "Compare" },
    { href: "#prepare", label: "Prepare" },
    { href: "#faq", label: "FAQ" },
  ],
  criteriaEyebrow: "Choose by evidence",
  criteriaTitle: "Four checks matter more than a star rating",
  criteriaIntro:
    "A feature on a marketing page does not prove a connection from Iran. Check the exact app, protocol and fallback you will use.",
  criteria: [
    {
      title: "Traffic hiding",
      body: "Look for a documented obfuscation or Stealth mode and note which protocol it needs.",
    },
    {
      title: "App access",
      body: "Install, update and sign in through an official source before the network becomes harder to reach.",
    },
    {
      title: "Failure behaviour",
      body: "Check what the kill switch does when the VPN drops and whether the app reconnects safely.",
    },
    {
      title: "Clear conditions",
      body: "Read the total price, renewal terms, refund rules and support options before paying.",
    },
  ],
  shortlistEyebrow: "Three options to evaluate",
  shortlistTitle: "The shortlist — without made-up Iran scores",
  shortlistIntro:
    "The order is based on documented setup options and practical fit. We have not recently repeated a connection test inside Iran, so every card shows that limit.",
  evidenceLegend: {
    documented: "Provider documentation checked",
    notRetested: "Not retested in Iran",
    unknown: "Result depends on network",
  },
  providers: [
    {
      slug: "nordvpn",
      badge: "Start here",
      bestFor: "A clear obfuscated-server setup",
      skipIf: "You need port forwarding or more than 10 direct device connections",
      documentedFeature: "Obfuscated servers and NordWhisper are documented for restricted networks.",
      requirement: "Obfuscated servers use OpenVPN TCP or UDP in supported apps.",
      testStatus: "No fresh ZeroToVPN test from an Iranian network.",
      summary:
        "NordVPN gives the clearest step-by-step support path of these three. That makes it easy to evaluate first, but documentation is not a connection guarantee.",
      reviewLabel: "Read the NordVPN review",
      ctaLabel: "Check NordVPN plans",
      sourceLabel: "Read NordVPN's restricted-network guide",
      sourceUrl:
        "https://support.nordvpn.com/hc/en-us/articles/38297515575697-I-can-t-connect-from-a-country-with-internet-restrictions",
    },
    {
      slug: "surfshark",
      badge: "Many devices",
      bestFor: "Households that want to connect many devices",
      skipIf: "You want independent proof of current Iran connectivity",
      documentedFeature: "NoBorders is documented for networks with restrictions.",
      requirement: "Feature availability depends on the app and operating system.",
      testStatus: "No fresh ZeroToVPN test from an Iranian network.",
      summary:
        "Surfshark is worth comparing when device limits matter. Check the current NoBorders instructions on the exact phone or computer you will use.",
      reviewLabel: "Read the Surfshark review",
      ctaLabel: "Check Surfshark plans",
      sourceLabel: "Read Surfshark's NoBorders guide",
      sourceUrl:
        "https://support.surfshark.com/hc/en-us/articles/360010423359-How-to-use-Surfshark-NoBorders",
    },
    {
      slug: "protonvpn",
      badge: "Privacy option",
      bestFor: "People who value open-source apps and a documented Stealth protocol",
      skipIf: "You expect every free-plan feature to match a paid plan",
      documentedFeature: "Stealth and alternative routing are documented for blocked paths.",
      requirement: "Available protocols differ by platform and app version.",
      testStatus: "No fresh ZeroToVPN test from an Iranian network.",
      summary:
        "Proton VPN has a strong privacy-focused setup and clear protocol notes. Confirm that Stealth is available on your device before relying on it.",
      reviewLabel: "Read the Proton VPN review",
      ctaLabel: "Check Proton VPN plans",
      sourceLabel: "Read Proton VPN's protocol guide",
      sourceUrl: "https://protonvpn.com/support/how-to-change-vpn-protocols",
    },
  ],
  partnerLabel: "Partner link",
  compareTitle: "NordVPN vs Surfshark vs Proton VPN for Iran",
  compareIntro:
    "This table compares documented setup choices. It does not claim that one provider currently works on every Iranian network.",
  compareHeaders: ["VPN", "Restricted-network option", "What setup needs", "Devices", "Main limit"],
  compareRows: [
    {
      slug: "nordvpn",
      feature: "Obfuscated servers; NordWhisper",
      setup: "OpenVPN for obfuscated servers",
      devices: "10, according to NordVPN",
      limit: "Feature and result vary by app and network",
    },
    {
      slug: "surfshark",
      feature: "NoBorders",
      setup: "Use a supported app and current instructions",
      devices: "Unlimited, according to Surfshark",
      limit: "No current Iran test from ZeroToVPN",
    },
    {
      slug: "protonvpn",
      feature: "Stealth; alternative routing",
      setup: "Choose a supported protocol in the app",
      devices: "Depends on the chosen plan",
      limit: "Free and paid features can differ",
    },
  ],
  deepDiveEyebrow: "What each provider documents",
  deepDiveTitle: "Look past the button before you buy",
  deepDiveIntro:
    "Each provider gets the same four checks: useful for, reason to skip, documented setting and what remains untested.",
  nordImageAlt: "NordVPN Android screen showing the Obfuscated specialty-server option",
  nordImageCaption:
    "Interface image supplied by NordVPN on 10 August 2026. It shows where the Obfuscated option appeared in the Android app; it is not ZeroToVPN test evidence and the app can change.",
  methodTitle: "What the evidence labels mean",
  methodIntro:
    "We keep three different things apart so a provider promise does not look like a successful Iran test.",
  methodCards: [
    {
      label: "Documented",
      title: "The provider explains the feature",
      body: "Useful for setup, but it only proves what the provider publishes.",
    },
    {
      label: "Observed",
      title: "A dated ZeroToVPN test exists",
      body: "We show the device, network and date when we have a repeatable result.",
    },
    {
      label: "Unknown",
      title: "The current Iran result is not known",
      body: "That is the honest status for all three providers in this update.",
    },
  ],
  prepareEyebrow: "Before you need the connection",
  prepareTitle: "Prepare the app in four simple steps",
  prepareIntro:
    "Do this while official app stores, account recovery and provider support are still easy to reach.",
  prepareSteps: [
    {
      title: "Install the official app",
      body: "Avoid random APK files, browser extensions and configuration files from strangers.",
    },
    {
      title: "Update and sign in",
      body: "Check your password, recovery method and support contact before travel or restrictions.",
    },
    {
      title: "Save the setup steps",
      body: "Keep the official obfuscation, NoBorders or Stealth instructions available offline.",
    },
    {
      title: "Test your failure plan",
      body: "Turn the VPN off once, check the kill switch and decide what to do if it cannot reconnect.",
    },
  ],
  troubleTitle: "What if the VPN will not connect?",
  troubleIntro:
    "Change one thing at a time. That makes it easier to see what helped and avoids weakening every safety setting at once.",
  troubleSteps: [
    "Confirm that the app and account still work through an official source.",
    "Try the provider's documented restricted-network option for your device.",
    "Change the server region once, then note the time and result.",
    "Stop if the legal or personal-safety risk is unclear. A VPN is not a guarantee of anonymity.",
  ],
  safetyTitle: "Legal and personal-safety note",
  safetyBody:
    "Rules, enforcement and network access can change quickly. This page is general information, not legal advice. Check current local guidance and do not use a VPN for illegal activity or to put another person at risk.",
  safetyLink: "Open the Iran evidence and safety checklist",
  faqTitle: "Questions about VPNs for Iran",
  faqs: [
    {
      question: "Can people in Iran use a VPN?",
      answer:
        "That depends on current rules, the network, the device and the purpose. A provider feature list or another person's success does not prove that your own connection is available, lawful or safe.",
    },
    {
      question: "What is the best VPN for Iran in 2026?",
      answer:
        "There is no single provider we can guarantee for every Iranian network. NordVPN, Surfshark and Proton VPN document relevant settings, but you should compare their limits and test the official app on the exact device and network you will use.",
    },
    {
      question: "How do I set up a VPN for Iran?",
      answer:
        "Install and update the official app before you need it. Sign in, save the provider's restricted-network instructions, test the kill switch and keep a lawful fallback communication plan.",
    },
    {
      question: "Does Iran ban VPNs?",
      answer:
        "Rules and enforcement have changed over time and can depend on the use. Check current authoritative guidance instead of treating an old blog post as legal advice.",
    },
    {
      question: "Is a free VPN good for Iran?",
      answer:
        "A free plan can have fewer protocols, locations and support options. Use only a reputable official app, read its privacy policy and check whether the restricted-network feature is included. Free does not automatically mean safe.",
    },
    {
      question: "Which free VPN gives me an Iran IP address?",
      answer:
        "Getting an Iranian IP address from outside Iran is a different goal from connecting safely on a restricted network inside Iran. Many providers do not offer servers in Iran, and a free app claiming otherwise deserves careful privacy and ownership checks.",
    },
    {
      question: "Does NordVPN have servers in Iran?",
      answer:
        "NordVPN's obfuscated-server feature is not the same as having a server located in Iran. Check NordVPN's current server list if you need a specific exit country, and do not assume an obfuscated server proves current access from Iran.",
    },
    {
      question: "Why can a VPN stop working on WhatsApp or other apps?",
      answer:
        "The network may block the VPN path, the chosen server can be overloaded, or the app may route traffic differently. Reconnect once, try the documented restricted-network option and check whether the kill switch is blocking traffic after a failed connection.",
    },
  ],
  sourcesTitle: "Sources checked for this update",
  sourcesIntro:
    "Provider pages show what each company documents. They do not prove current Iran connectivity. The independent country report gives wider context, not a VPN recommendation.",
  sources: [
    {
      label: "Freedom House — Iran: Freedom on the Net 2025",
      url: "https://freedomhouse.org/country/iran/freedom-net/2025",
      note: "Independent country context",
    },
    {
      label: "NordVPN — connecting from a country with internet restrictions",
      url: "https://support.nordvpn.com/hc/en-us/articles/38297515575697-I-can-t-connect-from-a-country-with-internet-restrictions",
      note: "Provider documentation",
    },
    {
      label: "Surfshark — how to use NoBorders",
      url: "https://support.surfshark.com/hc/en-us/articles/360010423359-How-to-use-Surfshark-NoBorders",
      note: "Provider documentation",
    },
    {
      label: "Proton VPN — changing VPN protocols",
      url: "https://protonvpn.com/support/how-to-change-vpn-protocols",
      note: "Provider documentation",
    },
  ],
  authorTitle: "Reviewed by Marvin Smit",
  authorRole: "Founder and developer of ZeroToVPN",
  authorBody:
    "Marvin checks that provider claims, independent sources and unknown results stay clearly separated. A byline does not mean a fresh Iran network test unless the page shows the device, network and date.",
  authorLink: "View Marvin's author profile",
  newsletterEyebrow: "Restricted-network updates",
  newsletterTitle: "Get practical VPN checks, not fake certainty",
  newsletterBody:
    "Occasional email updates about evidence, app changes and setup guides. No coupon reward and no provider pop-up.",
  relatedTitle: "Continue with the Iran and censorship cluster",
  related: [
    {
      href: "/countries/iran",
      label: "Iran evidence and safety checklist",
      body: "Separate legal, network and personal-safety questions before choosing a provider.",
    },
    {
      href: "/guides/vpn-obfuscation-explained",
      label: "How VPN obfuscation works",
      body: "Understand what traffic hiding can and cannot do.",
    },
    {
      href: "/guides/vpn-protocols-explained",
      label: "OpenVPN, WireGuard and Stealth",
      body: "Compare common protocol choices in plain language.",
    },
    {
      href: "/blog/best-vpn-for-telegram-2026",
      label: "VPN options for Telegram",
      body: "A separate guide for messaging access and setup limits.",
    },
  ],
};

const nl: IranRoundupCopy = {
  ...en,
  metadataTitle: "Beste VPN voor Iran 2026: 3 opties en stappenplan",
  metadataDescription:
    "Vergelijk 3 VPN-opties voor Iran in 2026. Bekijk versluiering, app-toegang, voorwaarden en beperkingen voordat je een VPN voor een beperkt netwerk kiest.",
  home: "Home",
  blog: "Blog",
  eyebrow: "VPN-gids voor beperkte netwerken",
  title: "Beste VPN voor Iran in 2026: 3 opties en een stappenplan",
  dek:
    "NordVPN, Surfshark en Proton VPN beschrijven functies voor beperkte netwerken. Geen enkele VPN werkt gegarandeerd op elk Iraans netwerk, apparaat of moment. Kies daarom op installatie, beperkingen en actuele hulp — niet op een sterrenscore.",
  directAnswerLabel: "Het korte antwoord",
  directAnswer:
    "Begin bij NordVPN als je duidelijke uitleg over versluierde servers wilt. Vergelijk Surfshark als je veel apparaten gebruikt en bekijk Proton VPN voor het Stealth-protocol. Installeer en test altijd de officiële app voordat je ervan afhankelijk bent.",
  networkStatus:
    "Het internet in Iran is sterk beperkt en kan snel veranderen. Een resultaat van iemand anders of een andere dag bewijst niets over jouw verbinding.",
  imageAlt:
    "Redactioneel uitzicht over Teheran met de Miladtoren, het Alborzgebergte, thee en een telefoon",
  imageCaption:
    "Redactioneel sfeerbeeld van ZeroToVPN. Het is geen foto ter plaatse en geen live verbindingstest.",
  authorLine: "Beoordeeld door Marvin Smit",
  updatedLine: "Bijgewerkt op 15 augustus 2026",
  evidenceLine: "Actuele Iran-netwerktest: niet opnieuw uitgevoerd",
  disclosureLink: "Hoe wij deze site financieren",
  nav: [
    { href: "#how-to-choose", label: "Zo kies je" },
    { href: "#shortlist", label: "Top 3" },
    { href: "#comparison", label: "Vergelijk" },
    { href: "#prepare", label: "Voorbereiden" },
    { href: "#faq", label: "FAQ" },
  ],
  criteriaEyebrow: "Kies op bewijs",
  criteriaTitle: "Vier controles zeggen meer dan een sterrenscore",
  criteriaIntro:
    "Een functie op een verkooppagina bewijst geen verbinding vanuit Iran. Controleer de precieze app, het verbindingstype en je noodplan.",
  criteria: [
    {
      title: "VPN-verkeer verbergen",
      body: "Zoek naar duidelijke uitleg over versluiering of Stealth en kijk welk verbindingstype nodig is.",
    },
    {
      title: "Toegang tot de app",
      body: "Installeer, update en log in via een officiële bron voordat het netwerk moeilijker bereikbaar wordt.",
    },
    {
      title: "Wat gebeurt bij uitval?",
      body: "Controleer wat de kill switch doet als de VPN stopt en of de app veilig opnieuw verbindt.",
    },
    {
      title: "Duidelijke voorwaarden",
      body: "Lees vóór betaling de totaalprijs, verlengprijs, regels voor terugbetaling en hulpopties.",
    },
  ],
  shortlistEyebrow: "Drie opties om te bekijken",
  shortlistTitle: "De top 3 — zonder verzonnen Iran-scores",
  shortlistIntro:
    "De volgorde is gebaseerd op beschreven instellingen en praktisch gebruik. We hebben niet onlangs opnieuw vanuit Iran getest. Daarom staat die beperking op elke kaart.",
  evidenceLegend: {
    documented: "Uitleg van provider gecontroleerd",
    notRetested: "Niet opnieuw getest in Iran",
    unknown: "Resultaat hangt af van netwerk",
  },
  providers: [
    {
      slug: "nordvpn",
      badge: "Begin hier",
      bestFor: "Een duidelijke installatie van versluierde servers",
      skipIf: "Je port forwarding of meer dan 10 directe apparaatverbindingen nodig hebt",
      documentedFeature: "NordVPN beschrijft versluierde servers en NordWhisper voor beperkte netwerken.",
      requirement: "Versluierde servers gebruiken OpenVPN TCP of UDP in ondersteunde apps.",
      testStatus: "Geen nieuwe ZeroToVPN-test vanuit een Iraans netwerk.",
      summary:
        "NordVPN heeft van deze drie de duidelijkste stap-voor-stap uitleg. Daardoor is het logisch om hier te beginnen, maar uitleg is geen verbindingsgarantie.",
      reviewLabel: "Lees de NordVPN-review",
      ctaLabel: "Bekijk NordVPN-abonnementen",
      sourceLabel: "Lees de NordVPN-gids voor beperkte netwerken",
      sourceUrl:
        "https://support.nordvpn.com/hc/en-us/articles/38297515575697-I-can-t-connect-from-a-country-with-internet-restrictions",
    },
    {
      slug: "surfshark",
      badge: "Veel apparaten",
      bestFor: "Huishoudens die veel apparaten tegelijk willen gebruiken",
      skipIf: "Je onafhankelijk bewijs van een actuele Iran-verbinding verwacht",
      documentedFeature: "Surfshark beschrijft NoBorders voor netwerken met beperkingen.",
      requirement: "De functie hangt af van de app en het besturingssysteem.",
      testStatus: "Geen nieuwe ZeroToVPN-test vanuit een Iraans netwerk.",
      summary:
        "Surfshark is interessant als het aantal apparaten belangrijk is. Controleer de actuele NoBorders-stappen op de telefoon of computer die je echt gebruikt.",
      reviewLabel: "Lees de Surfshark-review",
      ctaLabel: "Bekijk Surfshark-abonnementen",
      sourceLabel: "Lees de Surfshark-gids over NoBorders",
      sourceUrl:
        "https://support.surfshark.com/hc/en-us/articles/360010423359-How-to-use-Surfshark-NoBorders",
    },
    {
      slug: "protonvpn",
      badge: "Privacy-optie",
      bestFor: "Mensen die openbare broncode en het Stealth-protocol belangrijk vinden",
      skipIf: "Je verwacht dat het gratis abonnement alles van een betaald abonnement bevat",
      documentedFeature: "Proton VPN beschrijft Stealth en alternatieve routes voor geblokkeerde verbindingen.",
      requirement: "Beschikbare verbindingstypen verschillen per apparaat en appversie.",
      testStatus: "Geen nieuwe ZeroToVPN-test vanuit een Iraans netwerk.",
      summary:
        "Proton VPN heeft een sterke privacygerichte opzet en duidelijke uitleg over verbindingstypen. Controleer of Stealth op jouw apparaat beschikbaar is.",
      reviewLabel: "Lees de Proton VPN-review",
      ctaLabel: "Bekijk Proton VPN-abonnementen",
      sourceLabel: "Lees de Proton VPN-gids over verbindingstypen",
      sourceUrl: "https://protonvpn.com/support/how-to-change-vpn-protocols",
    },
  ],
  partnerLabel: "Partnerlink",
  compareTitle: "NordVPN, Surfshark en Proton VPN voor Iran vergeleken",
  compareIntro:
    "Deze tabel vergelijkt beschreven installatiekeuzes. Ze beweert niet dat één provider nu op elk Iraans netwerk werkt.",
  compareHeaders: ["VPN", "Optie voor beperkt netwerk", "Wat je moet instellen", "Apparaten", "Belangrijkste beperking"],
  compareRows: [
    {
      slug: "nordvpn",
      feature: "Versluierde servers; NordWhisper",
      setup: "OpenVPN voor versluierde servers",
      devices: "10, volgens NordVPN",
      limit: "Functie en resultaat verschillen per app en netwerk",
    },
    {
      slug: "surfshark",
      feature: "NoBorders",
      setup: "Gebruik een ondersteunde app en actuele uitleg",
      devices: "Onbeperkt, volgens Surfshark",
      limit: "Geen actuele Iran-test van ZeroToVPN",
    },
    {
      slug: "protonvpn",
      feature: "Stealth; alternatieve routes",
      setup: "Kies een ondersteund verbindingstype in de app",
      devices: "Hangt af van het gekozen abonnement",
      limit: "Gratis en betaalde functies kunnen verschillen",
    },
  ],
  deepDiveEyebrow: "Wat iedere provider beschrijft",
  deepDiveTitle: "Kijk verder dan de koopknop",
  deepDiveIntro:
    "Iedere provider krijgt dezelfde vier controles: geschikt voor, reden om verder te kijken, beschreven instelling en wat nog niet is getest.",
  nordImageAlt: "NordVPN-scherm op Android met de optie voor versluierde servers",
  nordImageCaption:
    "Appscherm aangeleverd door NordVPN op 10 augustus 2026. Het toont waar de optie voor versluierde servers toen stond. Dit is geen testbewijs van ZeroToVPN en de app kan veranderen.",
  methodTitle: "Wat de bewijslabels betekenen",
  methodIntro:
    "We houden drie dingen apart. Zo lijkt een belofte van een provider niet op een geslaagde test vanuit Iran.",
  methodCards: [
    {
      label: "Beschreven",
      title: "De provider legt de functie uit",
      body: "Handig voor installatie, maar het bewijst alleen wat de provider publiceert.",
    },
    {
      label: "Zelf gezien",
      title: "Er is een gedateerde ZeroToVPN-test",
      body: "We tonen het apparaat, netwerk en de datum als we een herhaalbaar resultaat hebben.",
    },
    {
      label: "Onbekend",
      title: "Het actuele resultaat in Iran is niet bekend",
      body: "Dat is bij deze update de eerlijke status voor alle drie de providers.",
    },
  ],
  prepareEyebrow: "Voordat je de verbinding nodig hebt",
  prepareTitle: "Bereid de app voor in vier simpele stappen",
  prepareIntro:
    "Doe dit wanneer officiële appwinkels, accountherstel en hulp van de provider nog goed bereikbaar zijn.",
  prepareSteps: [
    {
      title: "Installeer de officiële app",
      body: "Vermijd losse APK-bestanden, browserextensies en instellingenbestanden van onbekenden.",
    },
    {
      title: "Update en log in",
      body: "Controleer je wachtwoord, herstelmethode en hulpcontact vóór vertrek of beperkingen.",
    },
    {
      title: "Bewaar de installatiestappen",
      body: "Sla de officiële uitleg over versluiering, NoBorders of Stealth offline op.",
    },
    {
      title: "Test wat er gebeurt bij uitval",
      body: "Zet de VPN één keer uit, controleer de kill switch en bepaal wat je doet als opnieuw verbinden mislukt.",
    },
  ],
  troubleTitle: "Wat doe je als de VPN niet verbindt?",
  troubleIntro:
    "Verander steeds één ding. Zo zie je beter wat hielp en zet je niet per ongeluk alle beveiliging tegelijk uit.",
  troubleSteps: [
    "Controleer via een officiële bron of de app en je account nog werken.",
    "Probeer de beschreven optie voor beperkte netwerken op jouw apparaat.",
    "Kies één keer een andere serverregio en noteer tijd en resultaat.",
    "Stop als de regels of persoonlijke veiligheid niet duidelijk zijn. Een VPN maakt je niet onzichtbaar.",
  ],
  safetyTitle: "Let op regels en persoonlijke veiligheid",
  safetyBody:
    "Regels, handhaving en netwerktoegang kunnen snel veranderen. Deze pagina geeft algemene informatie en geen juridisch advies. Controleer actuele lokale uitleg en gebruik een VPN niet voor verboden activiteiten of om iemand anders in gevaar te brengen.",
  safetyLink: "Open de Iran-checklist voor bewijs en veiligheid",
  faqTitle: "Vragen over VPN's voor Iran",
  faqs: [
    {
      question: "Kunnen mensen in Iran een VPN gebruiken?",
      answer:
        "Dat hangt af van actuele regels, het netwerk, het apparaat en het doel. Een functielijst of succes van iemand anders bewijst niet dat jouw eigen verbinding beschikbaar, toegestaan of veilig is.",
    },
    {
      question: "Wat is de beste VPN voor Iran in 2026?",
      answer:
        "We kunnen geen provider garanderen voor elk Iraans netwerk. NordVPN, Surfshark en Proton VPN beschrijven passende instellingen. Vergelijk hun beperkingen en test de officiële app op het apparaat en netwerk dat jij echt gebruikt.",
    },
    {
      question: "Hoe stel ik een VPN voor Iran in?",
      answer:
        "Installeer en update de officiële app voordat je hem nodig hebt. Log in, bewaar de uitleg voor beperkte netwerken, test de kill switch en houd een toegestaan noodplan voor communicatie achter de hand.",
    },
    {
      question: "Zijn VPN's verboden in Iran?",
      answer:
        "Regels en handhaving zijn door de tijd veranderd en kunnen afhangen van het gebruik. Controleer actuele betrouwbare uitleg en behandel een oud blogbericht niet als juridisch advies.",
    },
    {
      question: "Is een gratis VPN goed voor Iran?",
      answer:
        "Een gratis abonnement kan minder verbindingstypen, locaties en hulp bieden. Gebruik alleen een bekende officiële app, lees het privacybeleid en controleer of de functie voor beperkte netwerken echt is inbegrepen. Gratis betekent niet automatisch veilig.",
    },
    {
      question: "Welke gratis VPN geeft een IP-adres uit Iran?",
      answer:
        "Een Iraans IP-adres krijgen vanuit het buitenland is een ander doel dan verbinden op een beperkt netwerk in Iran. Veel providers hebben geen servers in Iran. Controleer daarom extra goed wie achter een gratis app zit en welke gegevens de app bewaart.",
    },
    {
      question: "Heeft NordVPN servers in Iran?",
      answer:
        "Versluierde servers zijn niet hetzelfde als een server die in Iran staat. Controleer de actuele serverlijst van NordVPN als je een bepaald uitgaand land nodig hebt. Neem niet aan dat versluiering actuele toegang vanuit Iran bewijst.",
    },
    {
      question: "Waarom stopt een VPN bij WhatsApp of andere apps?",
      answer:
        "Het netwerk kan de VPN-verbinding blokkeren, de gekozen server kan druk zijn of de app kan verkeer anders sturen. Verbind één keer opnieuw, probeer de beschreven optie voor beperkte netwerken en controleer of de kill switch verkeer blokkeert na een mislukte verbinding.",
    },
  ],
  sourcesTitle: "Bronnen voor deze update",
  sourcesIntro:
    "Providerpagina's laten zien wat ieder bedrijf beschrijft. Ze bewijzen geen actuele verbinding vanuit Iran. Het onafhankelijke landenrapport geeft algemene context en is geen VPN-aanbeveling.",
  sources: [
    {
      label: "Freedom House — Iran: Freedom on the Net 2025",
      url: "https://freedomhouse.org/country/iran/freedom-net/2025",
      note: "Onafhankelijke landencontext",
    },
    {
      label: "NordVPN — verbinden vanuit een land met internetbeperkingen",
      url: "https://support.nordvpn.com/hc/en-us/articles/38297515575697-I-can-t-connect-from-a-country-with-internet-restrictions",
      note: "Uitleg van provider",
    },
    {
      label: "Surfshark — NoBorders gebruiken",
      url: "https://support.surfshark.com/hc/en-us/articles/360010423359-How-to-use-Surfshark-NoBorders",
      note: "Uitleg van provider",
    },
    {
      label: "Proton VPN — verbindingstypen veranderen",
      url: "https://protonvpn.com/support/how-to-change-vpn-protocols",
      note: "Uitleg van provider",
    },
  ],
  authorTitle: "Beoordeeld door Marvin Smit",
  authorRole: "Oprichter en ontwikkelaar van ZeroToVPN",
  authorBody:
    "Marvin controleert dat providerclaims, onafhankelijke bronnen en onbekende resultaten duidelijk uit elkaar blijven. Zijn naam betekent niet dat er een nieuwe Iran-test is gedaan, tenzij de pagina apparaat, netwerk en datum toont.",
  authorLink: "Bekijk het auteursprofiel van Marvin",
  newsletterEyebrow: "Updates over beperkte netwerken",
  newsletterTitle: "Praktische VPN-controles zonder schijnzekerheid",
  newsletterBody:
    "Af en toe een e-mail over bewijs, appwijzigingen en installatiegidsen. Geen kortingsbeloning en geen providerpopup.",
  relatedTitle: "Lees verder over Iran en internetbeperkingen",
  related: [
    {
      href: "/countries/iran",
      label: "Iran-checklist voor bewijs en veiligheid",
      body: "Bekijk regels, netwerkvragen en persoonlijke veiligheid voordat je een provider kiest.",
    },
    {
      href: "/guides/vpn-obfuscation-explained",
      label: "Zo werkt VPN-versluiering",
      body: "Lees wat het verbergen van VPN-verkeer wel en niet kan doen.",
    },
    {
      href: "/guides/vpn-protocols-explained",
      label: "OpenVPN, WireGuard en Stealth",
      body: "Vergelijk bekende verbindingstypen in gewone taal.",
    },
    {
      href: "/blog/best-vpn-for-telegram-2026",
      label: "VPN-opties voor Telegram",
      body: "Een aparte gids over toegang tot berichtenapps en installatiebeperkingen.",
    },
  ],
};

export const iranRoundupCopy: Record<IranRoundupLocale, IranRoundupCopy> = {
  en,
  nl,
};

export function getIranRoundupLocale(locale: string): IranRoundupLocale {
  return locale === "nl" ? "nl" : "en";
}
