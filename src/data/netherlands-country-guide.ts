export type NetherlandsTopicKind =
  "rules" | "install" | "network" | "privacy" | "streaming";

type SourceLink = { label: string; href: string };

export type NetherlandsCountryGuideCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; countries: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    bylineLabel: string;
    byline: string;
    checked: string;
    cues: string[];
  };
  answer: {
    label: string;
    title: string;
    body: string;
    limit: string;
  };
  topics: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      kind: NetherlandsTopicKind;
      kicker: string;
      title: string;
      summary: string;
      bullets: string[];
      limitLabel: string;
      limit: string;
      sources: SourceLink[];
      sourcePrefix: string;
    }>;
  };
  checklist: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    warningTitle: string;
    warningBody: string;
  };
  sources: {
    eyebrow: string;
    title: string;
    intro: string;
    checkedLabel: string;
    supportsLabel: string;
    limitLabel: string;
    openLabel: string;
    items: Array<{
      publisher: string;
      title: string;
      href: string;
      checked: string;
      supports: string;
      limit: string;
    }>;
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

const NCSC_VPN = "https://www.ncsc.nl/edge-devices/wat-is-een-vpn";
const NCSC_WIFI = "https://www.ncsc.nl/mobiele-apparatuur/wifi-hotspots";
const ACM_OPEN_INTERNET =
  "https://consument.acm.nl/telefoon-internet-en-televisie/internet-keuze-netneutraliteit-en-snelheid/vrije-toegang-tot-internet";
const AP_INTERNET_DATA_EN =
  "https://autoriteitpersoonsgegevens.nl/en/themes/internet-and-smart-devices/personal-data-on-the-internet";
const AP_INTERNET_DATA_NL =
  "https://autoriteitpersoonsgegevens.nl/themas/internet-slimme-apparaten/persoonsgegevens-op-internet";
const DUTCH_COPYRIGHT =
  "https://www.rijksoverheid.nl/vraag-en-antwoord/intellectueel-eigendom/mag-ik-teksten-muziek-of-foto-s-van-anderen-gebruiken";
const EU_PORTABILITY_EN =
  "https://europa.eu/youreurope/citizens/consumers/internet-telecoms/access-online-content-abroad/index_en.htm";
const EU_PORTABILITY_NL =
  "https://europa.eu/youreurope/citizens/consumers/internet-telecoms/access-online-content-abroad/index_nl.htm";

const en: NetherlandsCountryGuideCopy = {
  locale: "en",
  meta: {
    title: "VPN use in the Netherlands: rules and travel",
    description:
      "An evidence-led guide to VPN use in the Netherlands: current official sources, app setup, network access, privacy limits, streaming terms and a travel checklist.",
  },
  breadcrumb: {
    home: "Home",
    countries: "Countries",
    current: "Netherlands",
  },
  hero: {
    eyebrow: "Netherlands country guide",
    title: "Using a VPN in the Netherlands: rules, privacy and travel setup",
    intro:
      "Start with the task, not a ranking. A VPN can secure one part of a connection, but it does not create anonymity, make an unlawful act lawful or guarantee access to a streaming service.",
    bylineLabel: "Editorial responsibility",
    byline: "Marvin Smit",
    checked: "Official sources checked 16 August 2026",
    cues: ["No provider ranking", "Official sources", "No access promise"],
  },
  answer: {
    label: "The short country answer",
    title: "We found no general Dutch ban on ordinary VPN use",
    body: "The official pages checked on 16 August 2026 describe VPNs as security tools and say internet providers normally must offer open access. They do not show a general ban on ordinary VPN software. You still have to follow Dutch law, a service's terms and any employer or school network rules.",
    limit:
      "This is an evidence summary, not legal advice. The sources do not answer every special situation, and rules can change.",
  },
  topics: {
    eyebrow: "Five separate questions",
    title: "Do not mix law, access, privacy and streaming",
    intro:
      "A simple 'VPNs are legal' badge hides the details. These five checks show what the current sources support and where they stop.",
    items: [
      {
        kind: "rules",
        kicker: "1 · Local rules",
        title: "No general ban found is not a free pass",
        summary:
          "Dutch public bodies openly explain VPN technology and open-internet rules. That supports normal security use, but not every possible act or setting.",
        bullets: [
          "The NCSC describes a VPN as an encrypted tunnel and discusses both private VPN servers and VPN services.",
          "ACM says providers normally may not simply block a website, app or internet service.",
          "Dutch government guidance says downloading from an illegal source is forbidden and copy protection may not be bypassed.",
        ],
        limitLabel: "What this does not prove",
        limit:
          "These public pages are not a legal opinion about your exact use. A VPN does not change copyright, fraud, harassment, work, school or court rules.",
        sourcePrefix: "Official sources",
        sources: [
          { label: "NCSC: What is a VPN?", href: NCSC_VPN },
          { label: "ACM: Open internet access", href: ACM_OPEN_INTERNET },
          { label: "Dutch government: Copyright", href: DUTCH_COPYRIGHT },
        ],
      },
      {
        kind: "install",
        kicker: "2 · App and installation",
        title: "Install before you depend on the connection",
        summary:
          "Use the provider's official site or your device's official app store. Install, update and sign in over a network you trust before travel or remote work.",
        bullets: [
          "Save the official support page and account-recovery method before leaving.",
          "Do not install random APK files, browser extensions or configuration profiles from a message or forum.",
          "The NCSC advises against downloads, installs and updates while connected to public Wi-Fi.",
        ],
        limitLabel: "What this does not prove",
        limit:
          "An official-looking app is not proof that a VPN has a good privacy policy, safe code or reliable service. Check the publisher and current documentation.",
        sourcePrefix: "Official sources",
        sources: [
          { label: "NCSC: Wi-Fi hotspots", href: NCSC_WIFI },
          { label: "NCSC: What is a VPN?", href: NCSC_VPN },
        ],
      },
      {
        kind: "network",
        kicker: "3 · Network access",
        title: "Open internet has named exceptions",
        summary:
          "ACM says Dutch internet providers must normally offer free and open access and may not simply block apps, sites or services.",
        bullets: [
          "Temporary limits may be allowed during serious network congestion.",
          "A provider may block to protect network security.",
          "A block can be required when a law or court prohibits a site, app or service.",
        ],
        limitLabel: "What this does not prove",
        limit:
          "It does not guarantee that a VPN works on every hotel, office, school, mobile or home network. A local network owner may also set its own access rules.",
        sourcePrefix: "Official source",
        sources: [
          { label: "ACM: Open internet access", href: ACM_OPEN_INTERNET },
        ],
      },
      {
        kind: "privacy",
        kicker: "4 · Privacy",
        title: "A VPN changes the route; it does not erase trust",
        summary:
          "The NCSC says traffic inside the tunnel to the VPN server is encrypted. That can reduce what people on the local network can inspect.",
        bullets: [
          "HTTPS still matters after traffic leaves the VPN server.",
          "Your VPN provider becomes part of the route, so its ownership, policy and technical behaviour matter.",
          "The Dutch privacy regulator explains limits on how an internet provider may inspect traffic content; a VPN is not the only privacy rule in force.",
        ],
        limitLabel: "What this does not prove",
        limit:
          "A tunnel does not prove that a VPN keeps no logs, stops tracking in an account or browser, blocks malware or makes you anonymous.",
        sourcePrefix: "Official sources",
        sources: [
          { label: "NCSC: What is a VPN?", href: NCSC_VPN },
          {
            label: "Dutch DPA: Personal data online",
            href: AP_INTERNET_DATA_EN,
          },
        ],
      },
      {
        kind: "streaming",
        kicker: "5 · Streaming conditions",
        title: "Start with your subscription rights and terms",
        summary:
          "EU guidance says paid online-content subscriptions should remain available during temporary travel in another EU country, under the same home-country conditions.",
        bullets: [
          "Free services may choose whether to offer the same portability.",
          "The rule covers temporary travel within the EU, not a permanent move or every country outside the EU.",
          "Check the service's current terms, supported devices and residence checks before relying on access.",
        ],
        limitLabel: "What this does not prove",
        limit:
          "A VPN does not guarantee that NPO, Ziggo, Videoland, Netflix or another service will connect. ZeroToVPN has not run one current matched access test for those services here.",
        sourcePrefix: "Official source",
        sources: [
          {
            label: "Your Europe: Online content abroad",
            href: EU_PORTABILITY_EN,
          },
        ],
      },
    ],
  },
  checklist: {
    eyebrow: "Travel and setup checklist",
    title: "Prepare on a network you trust",
    intro:
      "A short setup check before travel is more useful than changing many settings after a connection fails.",
    steps: [
      {
        title: "Define the job",
        body: "Write down whether you need a work tunnel, safer public Wi-Fi or another IP route. One task makes support easier.",
      },
      {
        title: "Use the official installer",
        body: "Download from the provider's official page or the official app store. Check the publisher before installing.",
      },
      {
        title: "Update and sign in",
        body: "Update the operating system and app, then test your account and recovery method before leaving.",
      },
      {
        title: "Learn the safety controls",
        body: "Find the connect button, protocol setting and kill-switch help page. Do not assume they behave the same on every device.",
      },
      {
        title: "Check the network first",
        body: "Confirm a hotspot's real name. Prefer mobile data for sensitive work and keep HTTPS enabled.",
      },
      {
        title: "Change one thing at a time",
        body: "If it fails, record the error, time, network and setting. Follow current provider or employer instructions instead of random fixes.",
      },
    ],
    warningTitle: "Do not use a VPN as a legal or safety shield",
    warningBody:
      "It cannot make illegal downloads lawful, remove account rules, protect a compromised device or guarantee that a service will work.",
  },
  sources: {
    eyebrow: "Source register",
    title: "What each source says—and what it cannot prove",
    intro:
      "All sources below are official public bodies. The check date shows when ZeroToVPN read the page, not when every rule on it first took effect.",
    checkedLabel: "Checked",
    supportsLabel: "Supports",
    limitLabel: "Does not prove",
    openLabel: "Open official source",
    items: [
      {
        publisher: "National Cyber Security Centre (NCSC)",
        title: "What is a VPN?",
        href: NCSC_VPN,
        checked: "16 August 2026",
        supports:
          "A VPN can create an encrypted tunnel; the page explains private servers and commercial VPN services.",
        limit:
          "It does not certify a consumer VPN, promise anonymity or give a full legal opinion.",
      },
      {
        publisher: "Authority for Consumers and Markets (ACM)",
        title: "Free access to the internet",
        href: ACM_OPEN_INTERNET,
        checked: "16 August 2026",
        supports:
          "Providers normally must offer open access; congestion, security and a law or court order are listed exceptions.",
        limit:
          "It does not guarantee one app works on every private or public network.",
      },
      {
        publisher: "National Cyber Security Centre (NCSC)",
        title: "Wi-Fi hotspots",
        href: NCSC_WIFI,
        checked: "16 August 2026",
        supports:
          "Public Wi-Fi has risks; mobile data, VPN, HTTPS and avoiding installs on the hotspot are practical controls.",
        limit:
          "It does not make public Wi-Fi risk-free and does not approve a particular VPN provider.",
      },
      {
        publisher: "Dutch Data Protection Authority (AP)",
        title: "Personal data on the internet",
        href: AP_INTERNET_DATA_EN,
        checked: "16 August 2026",
        supports:
          "The AP explains limits on an internet provider inspecting or retaining individual traffic-content analysis.",
        limit:
          "It does not describe what a chosen VPN provider collects or prove a no-logs claim.",
      },
      {
        publisher: "Your Europe",
        title: "Accessing online content abroad",
        href: EU_PORTABILITY_EN,
        checked: "16 August 2026; page last checked 1 July 2026",
        supports:
          "Paid subscriptions remain portable during temporary travel in another EU country; free services may opt in.",
        limit:
          "It does not promise access outside the EU, after a permanent move or for every free service.",
      },
      {
        publisher: "Government of the Netherlands",
        title: "Using other people's text, music or photos",
        href: DUTCH_COPYRIGHT,
        checked: "16 August 2026",
        supports:
          "Downloading from an illegal source is forbidden and copy protection may not be bypassed.",
        limit:
          "It is not a complete opinion on every copyright or VPN situation.",
      },
    ],
  },
  links: {
    eyebrow: "Continue without a sales pitch",
    title: "Useful ZeroToVPN pages",
    items: [
      {
        href: "/guides/what-is-vpn",
        title: "What is a VPN?",
        body: "Understand the tunnel before choosing a service.",
      },
      {
        href: "/guides/vpn-speed-guide",
        title: "VPN speed and slow connections",
        body: "Compare a clean baseline and change one variable at a time.",
      },
      {
        href: "/guides/vpn-for-travel",
        title: "VPN travel guide",
        body: "Prepare apps, accounts and support before leaving.",
      },
      {
        href: "/guides/vpn-privacy-guide",
        title: "VPN privacy guide",
        body: "See what a tunnel hides and what remains visible.",
      },
      {
        href: "/tools/what-is-my-ip",
        title: "Check your public IP",
        body: "Confirm the visible request route without claiming anonymity.",
      },
      {
        href: "/methodology",
        title: "How we check evidence",
        body: "Read the source labels and publication limits used here.",
      },
    ],
  },
  faq: {
    eyebrow: "Netherlands VPN questions",
    title: "Short, careful answers",
    items: [
      {
        question: "Are VPNs legal in the Netherlands?",
        answer:
          "The official sources checked on 16 August 2026 did not show a general ban on ordinary VPN use, and Dutch public bodies explain VPNs as security tools. This is not legal advice. What you do through the connection still has to follow the law and relevant network or service terms.",
      },
      {
        question: "Do I need a VPN in the Netherlands?",
        answer:
          "Not by default. A VPN can be useful for a work connection or to protect one part of the route on public Wi-Fi. Choose it for a clear task, not because a jurisdiction label says everyone needs one.",
      },
      {
        question: "Does a VPN make me anonymous?",
        answer:
          "No. Accounts, cookies, device data, the VPN provider and activity after the VPN server can still identify or track you. A tunnel is one privacy control, not invisibility.",
      },
      {
        question: "Will a VPN always open a Dutch streaming service abroad?",
        answer:
          "No. Access changes with the service, account, country, device, network and time. Paid subscriptions have portability rights during temporary EU travel, but a VPN is not an access guarantee.",
      },
      {
        question: "Is this page legal advice?",
        answer:
          "No. It is a dated summary of named official sources. For a legal, work, school or court question, check the latest official rule and ask a qualified professional when needed.",
      },
    ],
  },
};

const nl: NetherlandsCountryGuideCopy = {
  locale: "nl",
  meta: {
    title: "VPN-gebruik in Nederland: regels en reizen",
    description:
      "Een gids met bewijs over VPN-gebruik in Nederland: officiële bronnen, installatie, netwerktoegang, privacygrenzen, streamingvoorwaarden en een reischecklist.",
  },
  breadcrumb: {
    home: "Home",
    countries: "Landen",
    current: "Nederland",
  },
  hero: {
    eyebrow: "Landengids Nederland",
    title: "Een VPN gebruiken in Nederland: regels, privacy en voorbereiding",
    intro:
      "Begin bij je doel, niet bij een ranglijst. Een VPN kan één deel van een verbinding beveiligen, maar maakt je niet anoniem, maakt een verboden handeling niet legaal en belooft geen toegang tot streaming.",
    bylineLabel: "Redactioneel verantwoordelijk",
    byline: "Marvin Smit",
    checked: "Officiële bronnen gecontroleerd op 16 augustus 2026",
    cues: [
      "Geen providerranglijst",
      "Officiële bronnen",
      "Geen toegangsbelofte",
    ],
  },
  answer: {
    label: "Het korte antwoord voor Nederland",
    title: "We vonden geen algemeen Nederlands verbod op normaal VPN-gebruik",
    body: "De officiële pagina's die we op 16 augustus 2026 controleerden, beschrijven VPN's als beveiligingsmiddel en zeggen dat internetaanbieders normaal open toegang moeten geven. Ze tonen geen algemeen verbod op gewone VPN-software. Je moet je wel houden aan de Nederlandse wet, de voorwaarden van een dienst en regels van een werkgever, school of netwerk.",
    limit:
      "Dit is een samenvatting van bewijs en geen juridisch advies. De bronnen beantwoorden niet elke bijzondere situatie en regels kunnen veranderen.",
  },
  topics: {
    eyebrow: "Vijf losse vragen",
    title: "Meng regels, toegang, privacy en streaming niet",
    intro:
      "Een simpel label 'VPN's zijn legaal' verbergt de details. Deze vijf controles tonen wat de actuele bronnen steunen en waar ze stoppen.",
    items: [
      {
        kind: "rules",
        kicker: "1 · Lokale regels",
        title: "Geen algemeen verbod gevonden is geen vrijbrief",
        summary:
          "Nederlandse publieke organisaties leggen VPN-techniek en regels voor open internet uit. Dat steunt normaal beveiligingsgebruik, maar niet elke mogelijke handeling of situatie.",
        bullets: [
          "Het NCSC beschrijft een VPN als versleutelde tunnel en bespreekt eigen VPN-servers en VPN-diensten.",
          "De ACM zegt dat aanbieders normaal niet zomaar een website, app of internetdienst mogen blokkeren.",
          "De Rijksoverheid zegt dat downloaden uit een illegale bron verboden is en dat je kopieerbeveiliging niet mag omzeilen.",
        ],
        limitLabel: "Wat dit niet bewijst",
        limit:
          "Deze openbare pagina's zijn geen juridisch oordeel over jouw precieze gebruik. Een VPN verandert geen regels over auteursrecht, fraude, intimidatie, werk, school of een rechterlijk bevel.",
        sourcePrefix: "Officiële bronnen",
        sources: [
          { label: "NCSC: Wat is een VPN?", href: NCSC_VPN },
          { label: "ACM: Vrije toegang tot internet", href: ACM_OPEN_INTERNET },
          { label: "Rijksoverheid: Auteursrecht", href: DUTCH_COPYRIGHT },
        ],
      },
      {
        kind: "install",
        kicker: "2 · App en installatie",
        title: "Installeer voordat je van de verbinding afhankelijk bent",
        summary:
          "Gebruik de officiële site van de provider of de officiële appwinkel van je apparaat. Installeer, update en log in via een netwerk dat je vertrouwt voordat je reist of op afstand werkt.",
        bullets: [
          "Bewaar de officiële supportpagina en herstelmethode van je account voordat je vertrekt.",
          "Installeer geen losse APK's, browserextensies of configuratieprofielen uit een bericht of forum.",
          "Het NCSC raadt downloads, installaties en updates via openbare wifi af.",
        ],
        limitLabel: "Wat dit niet bewijst",
        limit:
          "Een officieel ogende app bewijst niet dat een VPN goed privacybeleid, veilige code of stabiele dienstverlening heeft. Controleer de uitgever en actuele documentatie.",
        sourcePrefix: "Officiële bronnen",
        sources: [
          { label: "NCSC: Wifi-hotspots", href: NCSC_WIFI },
          { label: "NCSC: Wat is een VPN?", href: NCSC_VPN },
        ],
      },
      {
        kind: "network",
        kicker: "3 · Netwerktoegang",
        title: "Open internet heeft genoemde uitzonderingen",
        summary:
          "De ACM zegt dat Nederlandse internetaanbieders normaal vrije en open toegang moeten geven en apps, sites of diensten niet zomaar mogen blokkeren.",
        bullets: [
          "Tijdelijke beperkingen kunnen bij ernstige drukte op het netwerk toegestaan zijn.",
          "Een aanbieder mag blokkeren om de veiligheid van het netwerk te beschermen.",
          "Een blokkade kan verplicht zijn wanneer een wet of rechter een site, app of dienst verbiedt.",
        ],
        limitLabel: "Wat dit niet bewijst",
        limit:
          "Dit belooft niet dat een VPN op elk hotel-, kantoor-, school-, mobiel of thuisnetwerk werkt. Een lokale netwerkbeheerder kan ook eigen toegangsregels hebben.",
        sourcePrefix: "Officiële bron",
        sources: [
          { label: "ACM: Vrije toegang tot internet", href: ACM_OPEN_INTERNET },
        ],
      },
      {
        kind: "privacy",
        kicker: "4 · Privacy",
        title: "Een VPN verandert de route, maar haalt vertrouwen niet weg",
        summary:
          "Het NCSC zegt dat verkeer in de tunnel tot de VPN-server versleuteld is. Dat kan beperken wat mensen op het lokale netwerk kunnen bekijken.",
        bullets: [
          "HTTPS blijft belangrijk nadat verkeer de VPN-server verlaat.",
          "De VPN-provider wordt onderdeel van de route. Eigendom, beleid en technisch gedrag blijven dus belangrijk.",
          "De Autoriteit Persoonsgegevens legt grenzen uit voor het bekijken van verkeersinhoud door een internetprovider; een VPN is niet de enige privacyregel.",
        ],
        limitLabel: "Wat dit niet bewijst",
        limit:
          "Een tunnel bewijst niet dat een VPN geen logs bewaart, tracking in een account of browser stopt, malware blokkeert of je anoniem maakt.",
        sourcePrefix: "Officiële bronnen",
        sources: [
          { label: "NCSC: Wat is een VPN?", href: NCSC_VPN },
          {
            label: "Autoriteit Persoonsgegevens: Data online",
            href: AP_INTERNET_DATA_NL,
          },
        ],
      },
      {
        kind: "streaming",
        kicker: "5 · Streamingvoorwaarden",
        title: "Begin bij je abonnementsrechten en voorwaarden",
        summary:
          "EU-uitleg zegt dat betaalde abonnementen voor onlinecontent tijdens tijdelijk reizen in een ander EU-land onder dezelfde thuisvoorwaarden beschikbaar horen te blijven.",
        bullets: [
          "Gratis diensten mogen zelf kiezen of zij dezelfde draagbaarheid aanbieden.",
          "De regel gaat over tijdelijk reizen binnen de EU, niet over een verhuizing of elk land buiten de EU.",
          "Controleer actuele voorwaarden, ondersteunde apparaten en woonplaatscontroles voordat je op toegang rekent.",
        ],
        limitLabel: "Wat dit niet bewijst",
        limit:
          "Een VPN belooft niet dat NPO, Ziggo, Videoland, Netflix of een andere dienst verbinding maakt. ZeroToVPN heeft hier geen nieuwe gelijke toegangstest voor deze diensten uitgevoerd.",
        sourcePrefix: "Officiële bron",
        sources: [
          {
            label: "Your Europe: Onlinecontent in het buitenland",
            href: EU_PORTABILITY_NL,
          },
        ],
      },
    ],
  },
  checklist: {
    eyebrow: "Checklist voor reizen en installatie",
    title: "Bereid alles voor op een netwerk dat je vertrouwt",
    intro:
      "Een korte controle vóór vertrek is nuttiger dan na een fout veel instellingen tegelijk veranderen.",
    steps: [
      {
        title: "Bepaal het doel",
        body: "Schrijf op of je een werktunnel, veiliger gebruik van openbare wifi of een andere IP-route nodig hebt. Eén doel maakt support makkelijker.",
      },
      {
        title: "Gebruik de officiële installer",
        body: "Download via de officiële providerpagina of appwinkel. Controleer de uitgever voordat je installeert.",
      },
      {
        title: "Update en log in",
        body: "Werk het besturingssysteem en de app bij. Test daarna je account en herstelmethode voordat je vertrekt.",
      },
      {
        title: "Leer de veiligheidsknoppen",
        body: "Zoek de verbindingsknop, protocolinstelling en uitleg over de kill switch. Ga er niet van uit dat ze op elk apparaat hetzelfde werken.",
      },
      {
        title: "Controleer eerst het netwerk",
        body: "Vraag naar de echte naam van een hotspot. Gebruik liever mobiele data voor gevoelig werk en houd HTTPS aan.",
      },
      {
        title: "Verander één ding tegelijk",
        body: "Werkt het niet? Noteer fout, tijd, netwerk en instelling. Volg actuele provider- of werkinstructies in plaats van willekeurige oplossingen.",
      },
    ],
    warningTitle: "Gebruik een VPN niet als juridisch of veiligheidschild",
    warningBody:
      "Een VPN maakt illegale downloads niet legaal, wist accountregels niet, beschermt geen besmet apparaat en garandeert niet dat een dienst werkt.",
  },
  sources: {
    eyebrow: "Bronnenregister",
    title: "Wat elke bron zegt en wat hij niet bewijst",
    intro:
      "Alle bronnen hieronder zijn officiële publieke organisaties. De controledatum zegt wanneer ZeroToVPN de pagina las, niet wanneer elke regel voor het eerst inging.",
    checkedLabel: "Gecontroleerd",
    supportsLabel: "Ondersteunt",
    limitLabel: "Bewijst niet",
    openLabel: "Open officiële bron",
    items: [
      {
        publisher: "Nationaal Cyber Security Centrum (NCSC)",
        title: "Wat is een VPN?",
        href: NCSC_VPN,
        checked: "16 augustus 2026",
        supports:
          "Een VPN kan een versleutelde tunnel maken; de pagina legt eigen servers en commerciële VPN-diensten uit.",
        limit:
          "De bron keurt geen consumenten-VPN goed, belooft geen anonimiteit en geeft geen volledig juridisch oordeel.",
      },
      {
        publisher: "Autoriteit Consument & Markt (ACM)",
        title: "Vrije toegang tot internet",
        href: ACM_OPEN_INTERNET,
        checked: "16 augustus 2026",
        supports:
          "Aanbieders moeten normaal open toegang geven; drukte, veiligheid en een wet of rechterlijk bevel zijn genoemde uitzonderingen.",
        limit:
          "De bron belooft niet dat één app op elk openbaar of privénetwerk werkt.",
      },
      {
        publisher: "Nationaal Cyber Security Centrum (NCSC)",
        title: "Wifi-hotspots",
        href: NCSC_WIFI,
        checked: "16 augustus 2026",
        supports:
          "Openbare wifi heeft risico's; mobiele data, VPN, HTTPS en niet installeren via de hotspot zijn praktische maatregelen.",
        limit:
          "De bron maakt openbare wifi niet risicoloos en keurt geen bepaalde VPN-provider goed.",
      },
      {
        publisher: "Autoriteit Persoonsgegevens (AP)",
        title: "Persoonsgegevens op internet",
        href: AP_INTERNET_DATA_NL,
        checked: "16 augustus 2026",
        supports:
          "De AP legt grenzen uit voor een internetprovider die inhoud van verkeer bekijkt of analyses per persoon bewaart.",
        limit:
          "De bron beschrijft niet wat een gekozen VPN-provider verzamelt en bewijst geen no-logs-claim.",
      },
      {
        publisher: "Your Europe",
        title: "Toegang tot onlinecontent in het buitenland",
        href: EU_PORTABILITY_NL,
        checked: "16 augustus 2026; pagina gecontroleerd op 1 juli 2026",
        supports:
          "Betaalde abonnementen blijven draagbaar tijdens tijdelijk reizen in een ander EU-land; gratis diensten mogen kiezen.",
        limit:
          "De bron belooft geen toegang buiten de EU, na een verhuizing of voor elke gratis dienst.",
      },
      {
        publisher: "Rijksoverheid",
        title: "Tekst, muziek of foto's van anderen gebruiken",
        href: DUTCH_COPYRIGHT,
        checked: "16 augustus 2026",
        supports:
          "Downloaden uit een illegale bron is verboden en kopieerbeveiliging mag niet worden omzeild.",
        limit:
          "De pagina is geen volledig oordeel over elke situatie rond auteursrecht of VPN-gebruik.",
      },
    ],
  },
  links: {
    eyebrow: "Verder zonder verkooppraatje",
    title: "Nuttige pagina's van ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        title: "Wat is een VPN?",
        body: "Begrijp de tunnel voordat je een dienst kiest.",
      },
      {
        href: "/guides/vpn-speed-guide",
        title: "VPN-snelheid en trage verbindingen",
        body: "Vergelijk met een schone nulmeting en verander één ding per keer.",
      },
      {
        href: "/best/best-vpn",
        title: "VPN's vergelijken voor vertrek",
        body: "Vergelijk apparaten, voorwaarden en privacybewijs voordat je op reis gaat.",
      },
      {
        href: "/guides/vpn-privacy-guide",
        title: "Gids over VPN en privacy",
        body: "Bekijk wat een tunnel verbergt en wat zichtbaar blijft.",
      },
      {
        href: "/tools/what-is-my-ip",
        title: "Controleer je openbare IP",
        body: "Bevestig de zichtbare route zonder anonimiteit te claimen.",
      },
      {
        href: "/methodology",
        title: "Zo controleren we bewijs",
        body: "Lees de bronlabels en publicatiegrenzen van deze pagina.",
      },
    ],
  },
  faq: {
    eyebrow: "Vragen over VPN's in Nederland",
    title: "Korte, voorzichtige antwoorden",
    items: [
      {
        question: "Zijn VPN's legaal in Nederland?",
        answer:
          "De officiële bronnen die we op 16 augustus 2026 controleerden, tonen geen algemeen verbod op normaal VPN-gebruik. Nederlandse publieke organisaties leggen VPN's uit als beveiligingsmiddel. Dit is geen juridisch advies. Wat je via de verbinding doet, moet nog steeds aan de wet en relevante netwerk- of dienstvoorwaarden voldoen.",
      },
      {
        question: "Heb ik in Nederland een VPN nodig?",
        answer:
          "Niet standaard. Een VPN kan nuttig zijn voor een werkverbinding of om één deel van de route op openbare wifi te beveiligen. Kies een VPN voor een duidelijk doel, niet omdat een label over jurisdictie zegt dat iedereen er één nodig heeft.",
      },
      {
        question: "Maakt een VPN mij anoniem?",
        answer:
          "Nee. Accounts, cookies, apparaatgegevens, de VPN-provider en activiteit na de VPN-server kunnen je nog steeds herkennen of volgen. Een tunnel is één privacymaatregel en geen onzichtbaarheidsmantel.",
      },
      {
        question:
          "Opent een VPN altijd Nederlandse streaming in het buitenland?",
        answer:
          "Nee. Toegang verandert per dienst, account, land, apparaat, netwerk en moment. Betaalde abonnementen hebben rechten tijdens tijdelijk reizen binnen de EU, maar een VPN geeft geen toegangsgarantie.",
      },
      {
        question: "Is deze pagina juridisch advies?",
        answer:
          "Nee. Dit is een gedateerde samenvatting van genoemde officiële bronnen. Controleer voor een juridische, werk-, school- of rechtbankvraag altijd de nieuwste officiële regel en vraag zo nodig een bevoegde deskundige.",
      },
    ],
  },
};

export function isNetherlandsGuideLocale(
  locale: string,
): locale is NetherlandsCountryGuideCopy["locale"] {
  return locale === "en" || locale === "nl";
}

export function getNetherlandsCountryGuideCopy(
  locale: string,
): NetherlandsCountryGuideCopy {
  return locale === "nl" ? nl : en;
}
