export type IpCheckerLocale = "en" | "nl";

export type IpCheckerCopy = {
  locale: IpCheckerLocale;
  metadata: {
    title: string;
    description: string;
    ogAlt: string;
  };
  breadcrumb: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    cues: string[];
    reviewed: string;
    privacyTitle: string;
    privacyBody: string;
  };
  navigation: {
    result: string;
    meaning: string;
    compare: string;
    faq: string;
  };
  tool: {
    eyebrow: string;
    title: string;
    intro: string;
    loadingTitle: string;
    loadingBody: string;
    observedTitle: string;
    observedBody: string;
    localTitle: string;
    localBody: string;
    partialTitle: string;
    partialBody: string;
    errorTitle: string;
    errorBody: string;
    labels: {
      publicIp: string;
      localAddress: string;
      addressType: string;
      approximateLocation: string;
      timezone: string;
      network: string;
      vpnCheck: string;
      observedAt: string;
      unavailable: string;
      notPerformed: string;
      localPreview: string;
      approximate: string;
    };
    copy: string;
    copied: string;
    show: string;
    hide: string;
    retry: string;
    refresh: string;
    limitation: string;
  };
  nordOption: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    disclosure: string;
    disclosureLink: string;
  };
  meaning: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; body: string }>;
    routeTitle: string;
    routeIntro: string;
    routeSteps: Array<{ label: string; detail: string }>;
  };
  compare: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    warningTitle: string;
    warningBody: string;
  };
  related: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      body: string;
      href: string;
      action: string;
    }>;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    link: string;
  };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  sources: {
    title: string;
    intro: string;
    checked: string;
    open: string;
  };
  newsletter: {
    title: string;
    body: string;
  };
};

const en: IpCheckerCopy = {
  locale: "en",
  metadata: {
    title: "What Is My IP? Check Your Public IP Address",
    description:
      "See the public IP address this site receives, its address type and an approximate location. Learn what this check can—and cannot—say about your connection.",
    ogAlt:
      "ZeroToVPN public IP checker with an example masked address and clear measurement limits",
  },
  breadcrumb: "What is my IP?",
  hero: {
    eyebrow: "Public network check",
    title: "What is my IP? See the public address this site receives",
    intro:
      "This page shows the public IP used for this request and, when available, a rough location from the hosting network. It does not detect a VPN or proxy.",
    directAnswer:
      "Your public IP is the address websites receive for this route. Several people or devices can share one address, and it may change over time.",
    cues: ["No account", "No VPN guess", "No separate IP lookup service"],
    reviewed: "Content and tool reviewed 16 August 2026",
    privacyTitle: "What happens when this page loads",
    privacyBody:
      "ZeroToVPN's host already receives your public IP as part of the web request. This tool reads that request and does not send the IP to a separate geolocation service. Normal hosting logs may still apply.",
  },
  navigation: {
    result: "Your result",
    meaning: "What it means",
    compare: "Compare routes",
    faq: "FAQ",
  },
  tool: {
    eyebrow: "Live route snapshot",
    title: "The address received for this request",
    intro:
      "Refresh the check after changing network or connecting a VPN. A different address is only one signal—not proof that every privacy feature works.",
    loadingTitle: "Reading this request",
    loadingBody: "This normally takes only a moment.",
    observedTitle: "Public route observed",
    observedBody:
      "The address below was received for this browser request. Location, when shown, is approximate.",
    localTitle: "Local development route",
    localBody:
      "This page is running on a local network, so there is no useful public visitor address to show here.",
    partialTitle: "IP found; extra context unavailable",
    partialBody:
      "The public address was received, but the hosting network did not provide a location or time zone.",
    errorTitle: "The public route could not be read",
    errorBody:
      "No result was measured. Check the connection and try again; do not treat this as a VPN result.",
    labels: {
      publicIp: "Public IP address",
      localAddress: "Local request address",
      addressType: "Address type",
      approximateLocation: "Approximate location",
      timezone: "Reported time zone",
      network: "Network owner",
      vpnCheck: "VPN or proxy check",
      observedAt: "Observed at",
      unavailable: "Not available",
      notPerformed: "Not performed",
      localPreview: "Local preview",
      approximate: "Approximate",
    },
    copy: "Copy IP",
    copied: "Copied",
    show: "Show IP",
    hide: "Hide IP",
    retry: "Try again",
    refresh: "Check again",
    limitation:
      "This result covers one request from this browser. Another app, device, IPv4/IPv6 route or later request can use a different address.",
  },
  nordOption: {
    eyebrow: "Optional commercial next step",
    title: "Want to compare this route with a VPN?",
    body: "NordVPN is one commercial option to research. This IP check does not determine whether a VPN is active, and this link is not based on your result.",
    cta: "Check current NordVPN plans",
    disclosure:
      "Commission link · we may earn a commission if you buy. This does not change or explain your IP result.",
    disclosureLink: "How affiliate links work",
  },
  meaning: {
    eyebrow: "Read the result",
    title: "What an IP address tells you—and what it does not",
    intro:
      "An IP address helps the internet return data to your connection. It is useful network information, but it is not a name, home address or complete privacy test.",
    cards: [
      {
        title: "It identifies a network route",
        body: "A public IP points to the route used for this request. Home routers, mobile networks and company networks often let many devices share it.",
      },
      {
        title: "Location is only an estimate",
        body: "IP databases and hosting headers may place the network near a city or region. They do not provide your GPS position or prove where you live.",
      },
      {
        title: "It cannot confirm a VPN",
        body: "This check does not inspect encryption, DNS, WebRTC, IPv6, a kill switch or provider logging. A changed IP alone cannot prove those features work.",
      },
    ],
    routeTitle: "How this request reaches the site",
    routeIntro:
      "The public address belongs to the route seen at the edge of the website—not necessarily to one device.",
    routeSteps: [
      { label: "Your browser", detail: "Makes this page request" },
      { label: "Your network route", detail: "Home, mobile, work or VPN" },
      { label: "Public IP", detail: "Address received at the site" },
      { label: "ZeroToVPN", detail: "Returns this snapshot" },
    ],
  },
  compare: {
    eyebrow: "A fair before-and-after check",
    title: "Compare your route without guessing",
    intro:
      "If you want to see whether a VPN changes this public route, keep the device and network the same and change one thing at a time.",
    steps: [
      {
        title: "Check with the VPN off",
        body: "Write down the address type and the first part of the IP. Do not publish the full address.",
      },
      {
        title: "Connect one VPN server",
        body: "Wait until the app says it is connected. Keep the same browser and Wi-Fi or mobile network.",
      },
      {
        title: "Run this check again",
        body: "A changed public IP is consistent with a different route. It still does not test DNS, WebRTC or a kill switch.",
      },
    ],
    warningTitle: "Do not share a full IP in screenshots",
    warningBody:
      "An IP is not a password, but it is still personal network data. Mask part of it before posting a screenshot or asking for help.",
  },
  related: {
    eyebrow: "Continue checking",
    title: "One IP snapshot is only the start",
    intro:
      "Use a separate test for each question. No single green badge can prove complete privacy.",
    items: [
      {
        title: "Check the DNS route",
        body: "Learn which DNS-server result you should compare before and after connecting a VPN.",
        href: "/tools/dns-leak-test",
        action: "Open DNS guide",
      },
      {
        title: "Compare connection speed",
        body: "Measure the same browser-to-Cloudflare route with a clear VPN-off or VPN-on label.",
        href: "/speed-test",
        action: "Run speed test",
      },
      {
        title: "Find a VPN for your needs",
        body: "Answer five short questions and see up to three evidence-gated options.",
        href: "/quiz",
        action: "Open VPN finder",
      },
    ],
  },
  method: {
    eyebrow: "How the check works",
    title: "A small tool with a clear boundary",
    intro:
      "The API reads the trusted address and approximate country, region, city and time-zone headers supplied by Vercel. Missing values stay missing.",
    bullets: [
      "No third-party IP geolocation lookup from this tool",
      "No VPN, proxy or protection verdict",
      "No invented network owner when the host does not provide one",
      "No caching of the personalised API response",
    ],
    link: "Read our methodology",
  },
  faqTitle: "Questions about public IP addresses",
  faqs: [
    {
      question: "What is a public IP address?",
      answer:
        "A public IP address is the network address a website receives for an internet request. A router, mobile provider or company network may let several devices share it.",
    },
    {
      question: "What is the difference between IPv4 and IPv6?",
      answer:
        "IPv4 uses shorter addresses such as 198.51.100.24. IPv6 uses a much larger address space and contains groups separated by colons. A device can use both on different routes.",
    },
    {
      question: "How accurate is an IP location?",
      answer:
        "It is an estimate of where a network address is registered or routed. It can point to a nearby city, a network hub or another region. It is not GPS and does not prove a home address.",
    },
    {
      question: "Can this page tell whether I use a VPN?",
      answer:
        "No. It shows the route received for this request. It does not run a VPN or proxy detector and does not label you protected or unprotected.",
    },
    {
      question: "Does a changed IP prove my VPN works?",
      answer:
        "No. A changed IP is consistent with a different public route. Test DNS, WebRTC, IPv4 and IPv6 separately and check the current app settings before reaching a broader conclusion.",
    },
    {
      question: "Why do several devices show the same public IP?",
      answer:
        "Home routers and internet providers often share one public address across several devices or customers. This is normal and means a public IP does not identify one device by itself.",
    },
  ],
  sources: {
    title: "Sources and technical limits",
    intro:
      "The platform headers and IP standards below define the route data used by this page. Platform behaviour can change.",
    checked: "Sources checked 16 August 2026",
    open: "Open source",
  },
  newsletter: {
    title: "Get clear privacy and network checks",
    body: "One useful update every two weeks. No fake alerts or countdowns.",
  },
};

const nl: IpCheckerCopy = {
  ...en,
  locale: "nl",
  metadata: {
    title: "Wat is mijn IP? Bekijk je openbare IP-adres",
    description:
      "Bekijk welk openbaar IP-adres deze site ontvangt, welk adrestype het is en een geschatte locatie. Lees ook wat deze controle niet over je verbinding zegt.",
    ogAlt:
      "ZeroToVPN IP-checker met een gemaskeerd voorbeeldadres en duidelijke grenzen van de meting",
  },
  breadcrumb: "Wat is mijn IP?",
  hero: {
    eyebrow: "Openbare netwerkcheck",
    title: "Wat is mijn IP? Bekijk het openbare adres dat deze site ontvangt",
    intro:
      "Deze pagina toont het openbare IP-adres van dit verzoek. Als de hosting het doorgeeft, tonen we ook een grove locatie. De tool herkent geen VPN of proxy.",
    directAnswer:
      "Je openbare IP is het adres dat websites voor deze route ontvangen. Meerdere mensen of apparaten kunnen hetzelfde adres delen. Het kan later veranderen.",
    cues: ["Geen account", "Geen VPN-gok", "Geen aparte IP-opzoekdienst"],
    reviewed: "Inhoud en tool beoordeeld op 16 augustus 2026",
    privacyTitle: "Wat er gebeurt als deze pagina laadt",
    privacyBody:
      "De hosting van ZeroToVPN ontvangt je openbare IP al bij het webverzoek. Deze tool leest dat verzoek en stuurt het IP niet naar een aparte locatiedienst. Gewone technische hostinglogs kunnen wel bestaan.",
  },
  navigation: {
    result: "Jouw uitslag",
    meaning: "Wat het betekent",
    compare: "Routes vergelijken",
    faq: "Vragen",
  },
  tool: {
    ...en.tool,
    eyebrow: "Huidige netwerkroute",
    title: "Het adres dat voor dit verzoek is ontvangen",
    intro:
      "Controleer opnieuw nadat je van netwerk wisselt of verbinding maakt met een VPN. Een ander adres is maar één signaal. Het bewijst niet dat elke privacyfunctie werkt.",
    loadingTitle: "Dit verzoek lezen",
    loadingBody: "Dit duurt normaal maar even.",
    observedTitle: "Openbare route waargenomen",
    observedBody:
      "Het adres hieronder is ontvangen bij het verzoek van deze browser. Een getoonde locatie blijft een schatting.",
    localTitle: "Lokale ontwikkelroute",
    localBody:
      "Deze pagina draait op een lokaal netwerk. Daardoor is er hier geen bruikbaar openbaar bezoekersadres om te tonen.",
    partialTitle: "IP gevonden; extra informatie ontbreekt",
    partialBody:
      "Het openbare adres is ontvangen, maar de hosting gaf geen locatie of tijdzone door.",
    errorTitle: "De openbare route kon niet worden gelezen",
    errorBody:
      "Er is geen uitslag gemeten. Controleer de verbinding en probeer opnieuw. Zie dit niet als een VPN-uitslag.",
    labels: {
      publicIp: "Openbaar IP-adres",
      localAddress: "Lokaal adres van dit verzoek",
      addressType: "Adrestype",
      approximateLocation: "Geschatte locatie",
      timezone: "Gemelde tijdzone",
      network: "Netwerkeigenaar",
      vpnCheck: "VPN- of proxycontrole",
      observedAt: "Waargenomen om",
      unavailable: "Niet beschikbaar",
      notPerformed: "Niet uitgevoerd",
      localPreview: "Lokale preview",
      approximate: "Geschat",
    },
    copy: "Kopieer IP",
    copied: "Gekopieerd",
    show: "Toon IP",
    hide: "Verberg IP",
    retry: "Probeer opnieuw",
    refresh: "Controleer opnieuw",
    limitation:
      "Deze uitslag geldt voor één verzoek uit deze browser. Een andere app, apparaat, IPv4/IPv6-route of later verzoek kan een ander adres gebruiken.",
  },
  nordOption: {
    eyebrow: "Optionele commerciële vervolgstap",
    title: "Wil je deze route met een VPN vergelijken?",
    body: "NordVPN is één commerciële optie om te bekijken. Deze IP-check stelt niet vast of een VPN actief is en deze link is niet gebaseerd op je uitslag.",
    cta: "Bekijk actuele NordVPN-abonnementen",
    disclosure:
      "Commissielink · wij kunnen commissie ontvangen als je koopt. Dit verandert of verklaart je IP-uitslag niet.",
    disclosureLink: "Zo werken affiliatelinks",
  },
  meaning: {
    eyebrow: "Lees de uitslag",
    title: "Wat een IP-adres wel en niet vertelt",
    intro:
      "Een IP-adres helpt het internet om gegevens naar je verbinding terug te sturen. Het is nuttige netwerkinformatie, maar geen naam, woonadres of volledige privacytest.",
    cards: [
      {
        title: "Het wijst naar een netwerkroute",
        body: "Een openbaar IP hoort bij de route van dit verzoek. Thuisrouters, mobiele netwerken en bedrijfsnetwerken laten vaak meerdere apparaten hetzelfde adres delen.",
      },
      {
        title: "De locatie is maar een schatting",
        body: "Gegevens van de hosting kunnen een netwerk in de buurt van een stad of regio plaatsen. Ze geven niet je GPS-positie en bewijzen niet waar je woont.",
      },
      {
        title: "Het bevestigt geen VPN",
        body: "Deze check meet geen versleuteling, DNS, WebRTC, IPv6, kill switch of logbeleid. Alleen een ander IP bewijst niet dat die onderdelen werken.",
      },
    ],
    routeTitle: "Hoe dit verzoek de site bereikt",
    routeIntro:
      "Het openbare adres hoort bij de route die aan de rand van de website wordt gezien. Het hoort niet altijd bij één apparaat.",
    routeSteps: [
      { label: "Jouw browser", detail: "Vraagt deze pagina op" },
      { label: "Jouw netwerkroute", detail: "Thuis, mobiel, werk of VPN" },
      { label: "Openbaar IP", detail: "Adres dat de site ontvangt" },
      { label: "ZeroToVPN", detail: "Stuurt deze uitslag terug" },
    ],
  },
  compare: {
    eyebrow: "Eerlijk voor en na vergelijken",
    title: "Vergelijk je route zonder te gokken",
    intro:
      "Wil je zien of een VPN deze openbare route verandert? Houd apparaat en netwerk gelijk en verander steeds maar één ding.",
    steps: [
      {
        title: "Controleer met de VPN uit",
        body: "Noteer het adrestype en het eerste deel van het IP. Publiceer nooit het volledige adres.",
      },
      {
        title: "Verbind één VPN-server",
        body: "Wacht tot de app aangeeft dat de VPN is verbonden. Houd dezelfde browser en hetzelfde wifi- of mobiele netwerk.",
      },
      {
        title: "Voer de check opnieuw uit",
        body: "Een ander openbaar IP past bij een andere route. Het test nog steeds geen DNS, WebRTC of kill switch.",
      },
    ],
    warningTitle: "Deel geen volledig IP in screenshots",
    warningBody:
      "Een IP is geen wachtwoord, maar wel persoonlijke netwerkinformatie. Maak een deel onleesbaar voordat je een screenshot plaatst of hulp vraagt.",
  },
  related: {
    eyebrow: "Verder controleren",
    title: "Eén IP-controle is pas het begin",
    intro:
      "Gebruik voor elke vraag een aparte test. Geen enkel groen schildje kan volledige privacy bewijzen.",
    items: [
      {
        title: "Controleer de DNS-route",
        body: "Lees welke DNS-serveruitkomst je vóór en na het verbinden van een VPN moet vergelijken.",
        href: "/tools/dns-leak-test",
        action: "Open DNS-uitleg",
      },
      {
        title: "Vergelijk je snelheid",
        body: "Meet dezelfde route van browser naar Cloudflare met een duidelijk label voor VPN uit of aan.",
        href: "/speed-test",
        action: "Start snelheidstest",
      },
      {
        title: "Vind een passende VPN",
        body: "Beantwoord vijf korte vragen en bekijk maximaal drie opties met gecontroleerde feiten.",
        href: "/quiz",
        action: "Open VPN-keuzehulp",
      },
    ],
  },
  method: {
    eyebrow: "Hoe de check werkt",
    title: "Een kleine tool met een duidelijke grens",
    intro:
      "De API leest het adres en de grove locatiegegevens die Vercel met het webverzoek meestuurt. Ontbrekende gegevens blijven leeg.",
    bullets: [
      "Geen externe IP-locatiedienst vanuit deze tool",
      "Geen oordeel over VPN, proxy of bescherming",
      "Geen verzonnen netwerkeigenaar als de hosting die niet geeft",
      "Geen caching van het persoonlijke API-antwoord",
    ],
    link: "Lees onze methodologie",
  },
  faqTitle: "Vragen over openbare IP-adressen",
  faqs: [
    {
      question: "Wat is een openbaar IP-adres?",
      answer:
        "Een openbaar IP-adres is het netwerkadres dat een website voor een internetverzoek ontvangt. Een router, mobiele provider of bedrijfsnetwerk kan meerdere apparaten hetzelfde adres laten delen.",
    },
    {
      question: "Wat is het verschil tussen IPv4 en IPv6?",
      answer:
        "IPv4 gebruikt korte adressen zoals 198.51.100.24. IPv6 heeft veel meer mogelijke adressen en gebruikt groepen met dubbele punten. Een apparaat kan beide gebruiken op verschillende routes.",
    },
    {
      question: "Hoe nauwkeurig is een IP-locatie?",
      answer:
        "Het is een schatting van waar een netwerkadres is geregistreerd of gerouteerd. De uitslag kan een nabije stad, een netwerkknooppunt of een andere regio tonen. Het is geen GPS en bewijst geen woonadres.",
    },
    {
      question: "Kan deze pagina zien of ik een VPN gebruik?",
      answer:
        "Nee. De pagina toont de route die voor dit verzoek is ontvangen. Er wordt geen VPN- of proxyherkenning uitgevoerd en je krijgt geen label beschermd of onbeschermd.",
    },
    {
      question: "Bewijst een ander IP dat mijn VPN werkt?",
      answer:
        "Nee. Een ander IP past bij een andere openbare route. Test DNS, WebRTC, IPv4 en IPv6 apart en controleer de actuele appinstellingen voordat je een bredere conclusie trekt.",
    },
    {
      question: "Waarom tonen meerdere apparaten hetzelfde openbare IP?",
      answer:
        "Thuisrouters en internetproviders delen vaak één openbaar adres over meerdere apparaten of klanten. Dat is normaal. Een openbaar IP wijst daarom niet vanzelf naar één apparaat.",
    },
  ],
  sources: {
    title: "Bronnen en technische grenzen",
    intro:
      "De platformheaders en IP-standaarden hieronder bepalen welke routegegevens deze pagina gebruikt. De werking van het platform kan veranderen.",
    checked: "Bronnen gecontroleerd op 16 augustus 2026",
    open: "Open bron",
  },
  newsletter: {
    title: "Ontvang duidelijke privacy- en netwerkchecks",
    body: "Eens per twee weken één nuttige update. Geen nepmeldingen of aftelklokken.",
  },
};

export function getIpCheckerCopy(locale: string): IpCheckerCopy {
  return locale === "nl" ? nl : en;
}

export function isIpCheckerLocale(locale: string): locale is IpCheckerLocale {
  return locale === "en" || locale === "nl";
}

export const ipCheckerSources = [
  {
    name: "Vercel request headers",
    href: "https://vercel.com/docs/headers/request-headers",
  },
  {
    name: "IETF RFC 1918 · Private IPv4 address space",
    href: "https://www.rfc-editor.org/rfc/rfc1918",
  },
  {
    name: "IETF RFC 4291 · IPv6 addressing architecture",
    href: "https://www.rfc-editor.org/rfc/rfc4291",
  },
] as const;
