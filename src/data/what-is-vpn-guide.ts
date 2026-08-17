export type WhatIsVpnGuideCopy = {
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
    nodes: [string, string, string, string];
    tunnel: string;
    afterTunnel: string;
    caption: string;
  };
  changes: {
    eyebrow: string;
    title: string;
    intro: string;
    does: { title: string; items: string[] };
    doesNot: { title: string; items: string[] };
  };
  useCases: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      icon: "wifi" | "building" | "route" | "shield";
      title: string;
      body: string;
    }>;
  };
  limits: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  checklist: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  glossary: {
    eyebrow: string;
    title: string;
    items: Array<{ term: string; meaning: string }>;
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    sourceLabel: string;
    sources: Array<{ title: string; body: string; href: string }>;
    methodTitle: string;
    methodBody: string;
    methodCta: string;
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

const en: WhatIsVpnGuideCopy = {
  locale: "en",
  meta: {
    title: "What is a VPN? A simple guide to what it changes",
    description:
      "Learn how a VPN changes your internet route, what it can hide, what it cannot protect and when it may be useful. A clear, provider-neutral guide.",
  },
  breadcrumb: { home: "Home", guides: "Guides", current: "What is a VPN?" },
  hero: {
    eyebrow: "Beginner guide",
    title: "What is a VPN? A simple explanation",
    intro:
      "A VPN sends your internet traffic to a VPN server before it goes to a website or app. The connection from your device to that server is encrypted. Websites usually see the server's IP address instead of your home IP address.",
    directLabel: "The short answer",
    directAnswer:
      "A VPN changes the route your traffic takes. It does not make you invisible, and it does not replace safe passwords, updates or HTTPS.",
    author: "Written by the ZeroToVPN editorial team",
    reviewed: "Reviewed by Marvin Smit on 16 August 2026",
    readTime: "About 8 minutes",
  },
  visual: {
    title: "The route with a VPN",
    nodes: ["Your device", "Local network", "VPN server", "Website or app"],
    tunnel: "Encrypted VPN connection",
    afterTunnel: "The website connection continues",
    caption:
      "The VPN tunnel ends at the VPN server. HTTPS can still protect website traffic from your browser or app all the way to the website.",
  },
  changes: {
    eyebrow: "Start with the boundary",
    title: "What changes, and what stays the same?",
    intro:
      "A VPN is useful for a few clear jobs. It is not a complete privacy or security system.",
    does: {
      title: "A VPN can change this",
      items: [
        "Your local network and internet provider usually see an encrypted connection to the VPN service, not each site inside that connection.",
        "A website usually sees the IP address of the VPN server instead of the public IP address from your home or mobile network.",
        "Your traffic can leave the internet from a different server location.",
      ],
    },
    doesNot: {
      title: "A VPN does not change this",
      items: [
        "The VPN company becomes part of the route, so you still need to decide whether you trust it.",
        "A website can still know who you are when you sign in, accept cookies or use a browser it can recognise.",
        "A VPN does not remove malware, stop every scam or fix a weak password.",
      ],
    },
  },
  useCases: {
    eyebrow: "Useful jobs",
    title: "When can a VPN help?",
    intro:
      "The right answer depends on what you want to protect and who you want to protect it from.",
    items: [
      {
        icon: "wifi",
        title: "On a shared network",
        body: "A VPN can keep the local network owner from seeing the sites inside the tunnel. HTTPS still matters, and a VPN cannot make an unsafe device safe.",
      },
      {
        icon: "building",
        title: "For work or school access",
        body: "An organisation can use a VPN to give approved people access to an internal network from another place.",
      },
      {
        icon: "route",
        title: "To use another network route",
        body: "A VPN can make a site see the VPN server's location. Sites may block VPN traffic, so access is never guaranteed.",
      },
      {
        icon: "shield",
        title: "To reduce local tracking",
        body: "A VPN can hide the individual sites in the tunnel from an internet provider. It moves trust to the VPN service; it does not remove tracking everywhere.",
      },
    ],
  },
  limits: {
    eyebrow: "Important limits",
    title: "What a VPN cannot promise",
    intro:
      "Be careful when an advert promises total safety, complete anonymity or access that always works.",
    items: [
      {
        title: "No complete anonymity",
        body: "Accounts, cookies, recognisable browser details, payments and device details can still identify or connect you.",
      },
      {
        title: "No automatic protection after the VPN server",
        body: "The VPN tunnel ends at the VPN server. HTTPS and other app encryption protect later parts of the route.",
      },
      {
        title: "No permanent access guarantee",
        body: "Websites and networks can detect, slow or block a VPN server. Results can change by place and time.",
      },
      {
        title: "No legal shortcut",
        body: "Rules about VPN use and online activity differ by country and situation. A VPN does not change the law that applies to you.",
      },
      {
        title: "No fixed speed result",
        body: "Encryption and a longer route can add delay. The result depends on your network, distance, server load, device and protocol.",
      },
      {
        title: "No cure for a compromised device",
        body: "If malware or another person controls your device, they may see data before it enters the tunnel or after it leaves.",
      },
    ],
  },
  checklist: {
    eyebrow: "Before you choose",
    title: "A simple six-step checklist",
    intro:
      "Start with your need, then check the service. Do not start with a star score or a discount timer.",
    items: [
      {
        title: "Name the job",
        body: "Write down what you want the VPN to do and which person, company or network you are concerned about.",
      },
      {
        title: "Check the supported devices",
        body: "Use current official documentation to confirm that the app and feature you need work on your device.",
      },
      {
        title: "Read the data rules",
        body: "Look for what the company collects, why it collects it, how long it keeps it and who operates the service.",
      },
      {
        title: "Check outside evidence",
        body: "An audit can help, but read its date and scope. It does not prove every system or all future behaviour.",
      },
      {
        title: "Read the full payment terms",
        body: "Check the total due now, renewal price, tax, refund rules and cancellation steps before paying.",
      },
      {
        title: "Test your own route",
        body: "Try the app on the device and network that matter to you. Keep another safe way to connect if the VPN fails.",
      },
    ],
  },
  glossary: {
    eyebrow: "Small glossary",
    title: "Six words worth knowing",
    items: [
      {
        term: "IP address",
        meaning:
          "A network address used to send traffic. It can also give a rough clue about a network or location.",
      },
      {
        term: "Encryption",
        meaning:
          "A way to turn readable data into protected data that needs the right key to read.",
      },
      {
        term: "Tunnel",
        meaning:
          "A simple name for the protected connection between your device and the VPN server.",
      },
      {
        term: "VPN server",
        meaning:
          "The computer that receives your VPN traffic and sends it on to its next destination.",
      },
      {
        term: "Protocol",
        meaning:
          "The set of technical rules used to build and protect the VPN connection.",
      },
      {
        term: "HTTPS",
        meaning:
          "Protection between your browser or app and a website. It remains useful when a VPN is on.",
      },
    ],
  },
  evidence: {
    eyebrow: "Evidence and corrections",
    title: "How this guide was checked",
    intro:
      "We use provider-neutral sources for the basic network explanation and separate facts from practical advice.",
    sourceLabel: "Open source",
    sources: [
      {
        title: "NIST SP 800-77 Rev. 1",
        body: "Technical guidance about IPsec VPNs and network-layer protection. Published in 2020.",
        href: "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      },
      {
        title: "EFF: Choosing the VPN That's Right for You",
        body: "A provider-neutral explanation of routing, trust and common VPN overclaims.",
        href: "https://ssd.eff.org/module/choosing-vpn-thats-right-you",
      },
    ],
    methodTitle: "Read our method",
    methodBody:
      "See how we label sources, limits and unknowns before we publish a strong claim.",
    methodCta: "View the methodology",
    correctionTitle: "Found a problem?",
    correctionBody:
      "Send the page URL, the exact sentence and a dated public source. We will review it.",
    correctionCta: "Contact the editorial team",
  },
  related: {
    eyebrow: "Keep learning",
    title: "Related VPN guides",
    items: [
      {
        title: "VPN speed and slow connections",
        body: "Learn why a VPN can add delay and how to compare a clean baseline.",
        href: "/guides/vpn-speed-guide",
      },
      {
        title: "VPN privacy guide",
        body: "See which privacy problems a VPN can and cannot change.",
        href: "/guides/vpn-privacy-guide",
      },
      {
        title: "Preparing a VPN for travel",
        body: "Prepare apps, account recovery and a fallback before you leave.",
        href: "/guides/vpn-for-travel",
      },
      {
        title: "VPN protocols explained",
        body: "Learn why a protocol matters without memorising every technical detail.",
        href: "/guides/vpn-protocols-explained",
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    title: "Plain answers about VPNs",
    items: [
      {
        question: "Does a VPN make me anonymous?",
        answer:
          "No. It can hide your home IP address from a website, but accounts, cookies, browser details, payments and the VPN service can still connect activity to you.",
      },
      {
        question: "Can my internet provider see that I use a VPN?",
        answer:
          "Often, yes. It can usually see a connection to a VPN server and traffic details such as timing and volume. It normally cannot read the sites and data protected inside the VPN tunnel.",
      },
      {
        question: "Is a VPN the same as HTTPS?",
        answer:
          "No. A VPN protects the connection from your device to the VPN server. HTTPS protects the connection between your browser or app and a website. They can work together.",
      },
      {
        question: "Does everyone need a VPN?",
        answer:
          "No. A VPN is useful only when it matches a real need, such as using another network route or limiting what a local network can see. Other risks may need other tools.",
      },
      {
        question: "Can a VPN make my internet slower?",
        answer:
          "Yes. Encryption and a longer route can add delay. The change depends on your connection, device, protocol, server distance and server load.",
      },
    ],
  },
};

const nl: WhatIsVpnGuideCopy = {
  locale: "nl",
  meta: {
    title: "Wat is een VPN? Simpele uitleg over wat er verandert",
    description:
      "Lees hoe een VPN je internetroute verandert, wat een VPN kan verbergen, wat niet wordt beschermd en wanneer een VPN nuttig kan zijn.",
  },
  breadcrumb: { home: "Start", guides: "Gidsen", current: "Wat is een VPN?" },
  hero: {
    eyebrow: "Gids voor beginners",
    title: "Wat is een VPN? Simpel uitgelegd",
    intro:
      "Een VPN stuurt je internetverkeer eerst naar een VPN-server. Daarna gaat het naar een website of app. De verbinding van je apparaat naar die server is versleuteld. Websites zien meestal het IP-adres van de VPN-server in plaats van je thuisadres op internet.",
    directLabel: "Het korte antwoord",
    directAnswer:
      "Een VPN verandert de route van je internetverkeer. Je wordt niet onzichtbaar. Een VPN vervangt geen sterke wachtwoorden, updates of HTTPS.",
    author: "Geschreven door de redactie van ZeroToVPN",
    reviewed: "Beoordeeld door Marvin Smit op 16 augustus 2026",
    readTime: "Ongeveer 8 minuten",
  },
  visual: {
    title: "De route met een VPN",
    nodes: ["Jouw apparaat", "Lokaal netwerk", "VPN-server", "Website of app"],
    tunnel: "Versleutelde VPN-verbinding",
    afterTunnel: "De websiteverbinding gaat verder",
    caption:
      "De VPN-tunnel stopt bij de VPN-server. HTTPS kan websiteverkeer vanuit je browser of app tot aan de website blijven beschermen.",
  },
  changes: {
    eyebrow: "Begin bij de grens",
    title: "Wat verandert er en wat blijft hetzelfde?",
    intro:
      "Een VPN is nuttig voor een paar duidelijke taken. Het is geen compleet privacy- of beveiligingssysteem.",
    does: {
      title: "Een VPN kan dit veranderen",
      items: [
        "Je lokale netwerk en internetprovider zien meestal een versleutelde verbinding met de VPN-dienst, niet elke site binnen die verbinding.",
        "Een website ziet meestal het IP-adres van de VPN-server in plaats van het openbare IP-adres van je thuis- of mobiele netwerk.",
        "Je internetverkeer kan vanaf een andere serverlocatie het internet op gaan.",
      ],
    },
    doesNot: {
      title: "Een VPN verandert dit niet",
      items: [
        "Het VPN-bedrijf wordt onderdeel van de route. Je moet dus nog steeds bepalen of je het bedrijf vertrouwt.",
        "Een website kan nog steeds weten wie je bent als je inlogt, cookies accepteert of een herkenbare browser gebruikt.",
        "Een VPN verwijdert geen malware, stopt niet elke truc en maakt een zwak wachtwoord niet sterk.",
      ],
    },
  },
  useCases: {
    eyebrow: "Nuttige taken",
    title: "Wanneer kan een VPN helpen?",
    intro:
      "Het antwoord hangt af van wat je wilt beschermen en tegen welke persoon, organisatie of netwerk.",
    items: [
      {
        icon: "wifi",
        title: "Op een gedeeld netwerk",
        body: "Een VPN kan de sites in de tunnel verbergen voor de eigenaar van het lokale netwerk. HTTPS blijft belangrijk en een VPN maakt een onveilig apparaat niet veilig.",
      },
      {
        icon: "building",
        title: "Voor toegang tot werk of school",
        body: "Een organisatie kan een VPN gebruiken om goedgekeurde mensen vanaf een andere plek toegang tot een intern netwerk te geven.",
      },
      {
        icon: "route",
        title: "Voor een andere internetroute",
        body: "Een VPN kan een site de locatie van de VPN-server laten zien. Sites kunnen VPN-verkeer blokkeren. Toegang is dus nooit zeker.",
      },
      {
        icon: "shield",
        title: "Om lokaal meekijken te beperken",
        body: "Een VPN kan de losse sites in de tunnel verbergen voor een internetprovider. Het vertrouwen verhuist naar de VPN-dienst; volgen verdwijnt niet overal.",
      },
    ],
  },
  limits: {
    eyebrow: "Belangrijke grenzen",
    title: "Wat een VPN niet kan beloven",
    intro:
      "Wees voorzichtig bij advertenties die totale veiligheid, volledige anonimiteit of toegang die altijd werkt beloven.",
    items: [
      {
        title: "Geen volledige anonimiteit",
        body: "Accounts, cookies, browserkenmerken, betalingen en apparaatgegevens kunnen je nog steeds herkennen of koppelen.",
      },
      {
        title: "Geen automatische bescherming na de VPN-server",
        body: "De VPN-tunnel stopt bij de VPN-server. HTTPS en andere versleuteling in apps beschermen latere delen van de route.",
      },
      {
        title: "Geen blijvende garantie op toegang",
        body: "Websites en netwerken kunnen een VPN-server herkennen, vertragen of blokkeren. De uitkomst kan per plek en moment veranderen.",
      },
      {
        title: "Geen snelle omweg om regels heen",
        body: "Regels voor VPN-gebruik en online activiteiten verschillen per land en situatie. Een VPN verandert de wet niet.",
      },
      {
        title: "Geen vaste snelheidsuitslag",
        body: "Versleuteling en een langere route kunnen vertraging geven. Het resultaat hangt af van je netwerk, afstand, server, apparaat en protocol.",
      },
      {
        title: "Geen oplossing voor een besmet apparaat",
        body: "Als malware of iemand anders je apparaat beheert, kan die data zien voordat deze de tunnel in gaat of nadat deze eruit komt.",
      },
    ],
  },
  checklist: {
    eyebrow: "Voor je kiest",
    title: "Een simpele checklist in zes stappen",
    intro:
      "Begin bij jouw doel en controleer daarna de dienst. Begin niet bij een sterrenscore of aftellende korting.",
    items: [
      {
        title: "Noem de taak",
        body: "Schrijf op wat de VPN moet doen en over welke persoon, organisatie of netwerk je je zorgen maakt.",
      },
      {
        title: "Controleer je apparaten",
        body: "Gebruik actuele officiële uitleg om te zien of de app en functie die je nodig hebt op jouw apparaat werken.",
      },
      {
        title: "Lees de regels over data",
        body: "Zoek wat het bedrijf verzamelt, waarom, hoelang het dit bewaart en welk bedrijf de dienst beheert.",
      },
      {
        title: "Bekijk extern bewijs",
        body: "Een onderzoek kan helpen, maar lees de datum en het bereik. Het bewijst niet elk systeem of al het latere gedrag.",
      },
      {
        title: "Lees alle betaalvoorwaarden",
        body: "Controleer totaalbedrag, verlengprijs, belasting, terugbetaling en opzegstappen voordat je betaalt.",
      },
      {
        title: "Test je eigen route",
        body: "Probeer de app op het apparaat en netwerk dat voor jou telt. Zorg voor een andere veilige verbinding als de VPN uitvalt.",
      },
    ],
  },
  glossary: {
    eyebrow: "Kleine woordenlijst",
    title: "Zes woorden die handig zijn",
    items: [
      {
        term: "IP-adres",
        meaning:
          "Een netwerkadres voor internetverkeer. Het kan ook een grove aanwijzing geven over een netwerk of plek.",
      },
      {
        term: "Versleuteling",
        meaning:
          "Een manier om leesbare data te beschermen, zodat je de juiste sleutel nodig hebt om de data te lezen.",
      },
      {
        term: "Tunnel",
        meaning:
          "Een simpele naam voor de beschermde verbinding tussen je apparaat en de VPN-server.",
      },
      {
        term: "VPN-server",
        meaning:
          "De computer die je VPN-verkeer ontvangt en doorstuurt naar de volgende bestemming.",
      },
      {
        term: "Protocol",
        meaning:
          "De technische afspraken waarmee de VPN-verbinding wordt gemaakt en beschermd.",
      },
      {
        term: "HTTPS",
        meaning:
          "Bescherming tussen je browser of app en een website. HTTPS blijft nuttig als de VPN aanstaat.",
      },
    ],
  },
  evidence: {
    eyebrow: "Bewijs en correcties",
    title: "Zo is deze gids gecontroleerd",
    intro:
      "Voor de basis van de netwerkuitleg gebruiken we bronnen zonder VPN-verkoop. We houden feiten en praktisch advies uit elkaar.",
    sourceLabel: "Open bron",
    sources: [
      {
        title: "NIST SP 800-77 Rev. 1",
        body: "Technische uitleg over IPsec-VPN's en bescherming op netwerkniveau. Gepubliceerd in 2020.",
        href: "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      },
      {
        title: "EFF: Choosing the VPN That's Right for You",
        body: "Onafhankelijke uitleg over routes, vertrouwen en veel te brede VPN-beloftes.",
        href: "https://ssd.eff.org/module/choosing-vpn-thats-right-you",
      },
    ],
    methodTitle: "Lees onze methode",
    methodBody:
      "Bekijk hoe we bronnen, grenzen en onbekende punten aangeven voordat we iets stellig opschrijven.",
    methodCta: "Bekijk de methodologie",
    correctionTitle: "Een probleem gevonden?",
    correctionBody:
      "Stuur de URL, de precieze zin en een openbare bron met datum. We bekijken de informatie opnieuw.",
    correctionCta: "Neem contact op met de redactie",
  },
  related: {
    eyebrow: "Verder lezen",
    title: "Bijpassende VPN-gidsen",
    items: [
      {
        title: "VPN-snelheid en trage verbindingen",
        body: "Leer waarom een VPN vertraging kan toevoegen en hoe je met een schone nulmeting vergelijkt.",
        href: "/guides/vpn-speed-guide",
      },
      {
        title: "VPN-privacygids",
        body: "Bekijk welke privacyproblemen een VPN wel en niet verandert.",
        href: "/guides/vpn-privacy-guide",
      },
      {
        title: "Een VPN voorbereiden op reis",
        body: "Bereid apps, accountherstel en een terugvaloptie voor voordat je vertrekt.",
        href: "/guides/vpn-for-travel",
      },
      {
        title: "VPN-protocollen uitgelegd",
        body: "Leer waarom een protocol telt zonder elk technisch detail te onthouden.",
        href: "/guides/vpn-protocols-explained",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Duidelijke antwoorden over VPN's",
    items: [
      {
        question: "Maakt een VPN mij anoniem?",
        answer:
          "Nee. Een VPN kan je thuis-IP-adres voor een website verbergen. Accounts, cookies, browserkenmerken, betalingen en de VPN-dienst kunnen activiteiten nog steeds aan jou koppelen.",
      },
      {
        question: "Kan mijn internetprovider zien dat ik een VPN gebruik?",
        answer:
          "Vaak wel. De provider ziet meestal een verbinding met een VPN-server en gegevens zoals tijd en hoeveelheid verkeer. De provider kan normaal niet de sites en data binnen de VPN-tunnel lezen.",
      },
      {
        question: "Is een VPN hetzelfde als HTTPS?",
        answer:
          "Nee. Een VPN beschermt de verbinding van je apparaat naar de VPN-server. HTTPS beschermt de verbinding tussen je browser of app en een website. Ze kunnen samen werken.",
      },
      {
        question: "Heeft iedereen een VPN nodig?",
        answer:
          "Nee. Een VPN is alleen nuttig als deze past bij een echte taak, zoals een andere internetroute gebruiken of beperken wat een lokaal netwerk ziet. Voor andere risico's zijn andere hulpmiddelen nodig.",
      },
      {
        question: "Kan een VPN mijn internet langzamer maken?",
        answer:
          "Ja. Versleuteling en een langere route kunnen vertraging geven. De verandering hangt af van je verbinding, apparaat, protocol, afstand tot de server en drukte op de server.",
      },
    ],
  },
};

export function isWhatIsVpnLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getWhatIsVpnGuideCopy(locale: string): WhatIsVpnGuideCopy {
  return locale === "nl" ? nl : en;
}
