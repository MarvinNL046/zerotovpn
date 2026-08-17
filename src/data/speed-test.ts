export type SpeedTestLocale = "en" | "nl";

export interface SpeedTestWidgetCopy {
  title: string;
  intro: string;
  contextTitle: string;
  contextEndpoint: string;
  contextEndpointValue: string;
  contextMethod: string;
  contextMethodValue: string;
  contextStorage: string;
  contextStorageValue: string;
  privacyNote: string;
  dataUseNote: string;
  privacyLink: string;
  runKindLabel: string;
  baseline: string;
  baselineHelp: string;
  vpn: string;
  vpnHelp: string;
  unsure: string;
  unsureHelp: string;
  start: string;
  stop: string;
  testAgain: string;
  retry: string;
  idleStatus: string;
  runningStatus: string;
  stoppedStatus: string;
  completeStatus: string;
  completeUnsavedStatus: string;
  errorTitle: string;
  errorBody: string;
  phaseIdle: string;
  phasePing: string;
  phaseDownload: string;
  phaseUpload: string;
  phaseComplete: string;
  phaseIdleHelp: string;
  phasePingHelp: string;
  phaseDownloadHelp: string;
  phaseUploadHelp: string;
  phaseCompleteHelp: string;
  download: string;
  upload: string;
  ping: string;
  jitter: string;
  mbps: string;
  ms: string;
  measuredAt: string;
  share: string;
  copied: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonMissingBaseline: string;
  comparisonMissingVpn: string;
  comparisonConfirm: string;
  comparisonUnconfirmed: string;
  comparisonDownload: string;
  comparisonUpload: string;
  comparisonPing: string;
  retained: string;
  changedBy: string;
  comparisonBoundary: string;
  historyTitle: string;
  historyIntro: string;
  historyEmpty: string;
  exportCsv: string;
  clear: string;
  confirmClear: string;
  cancelClear: string;
  localOnly: string;
}

export interface SpeedTestCopy {
  locale: SpeedTestLocale;
  metadata: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  directTip: string;
  boundaryTitle: string;
  boundary: string;
  trustCues: string[];
  updatedLabel: string;
  nav: {
    test: string;
    compare: string;
    understand: string;
    method: string;
    faq: string;
  };
  widget: SpeedTestWidgetCopy;
  metrics: {
    eyebrow: string;
    title: string;
    intro: string;
    headers: [string, string, string];
    rows: Array<{ name: string; tells: string; limit: string }>;
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  useCases: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string; note: string }>;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    link: string;
  };
  related: {
    title: string;
    items: Array<{ title: string; body: string; action: string; href: string }>;
  };
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  sources: { title: string; intro: string; checked: string; open: string };
}

const widgetEn: SpeedTestWidgetCopy = {
  title: "Browser benchmark",
  intro:
    "Choose what you are measuring. Run a baseline with the VPN off, then repeat with the VPN on.",
  contextTitle: "Test context",
  contextEndpoint: "Endpoint",
  contextEndpointValue: "Cloudflare network edge",
  contextMethod: "Method",
  contextMethodValue: "Browser download, upload and response-time samples",
  contextStorage: "Result storage",
  contextStorageValue: "This browser only",
  privacyNote:
    "The test sends traffic directly between your browser and speed.cloudflare.com. Cloudflare can see your public IP and may keep technical request logs. ZeroToVPN does not send the measured numbers to its own result database.",
  dataUseNote:
    "A full run is capped at 120 MB of downloaded and 40 MB of uploaded test payload, plus normal request overhead. Avoid metered mobile connections. Upload uses generated test bytes, not your files.",
  privacyLink: "Read the privacy policy",
  runKindLabel: "What are you testing?",
  baseline: "VPN off · baseline",
  baselineHelp: "Save the normal connection first.",
  vpn: "VPN on",
  vpnHelp: "Repeat on the same device and network.",
  unsure: "Not sure · single test",
  unsureHelp: "Save a snapshot without comparing it.",
  start: "Start test",
  stop: "Stop test",
  testAgain: "Test again",
  retry: "Try again",
  idleStatus: "Ready to start",
  runningStatus: "Measurement in progress",
  stoppedStatus: "Test stopped. No final result was saved.",
  completeStatus: "Run saved in this browser",
  completeUnsavedStatus:
    "Run finished, but this browser blocked local history storage",
  errorTitle: "The test did not finish",
  errorBody:
    "No complete result was saved. Check the connection or content blocker, then try again.",
  phaseIdle: "Ready",
  phasePing: "Response time",
  phaseDownload: "Download",
  phaseUpload: "Upload",
  phaseComplete: "Complete",
  phaseIdleHelp: "Choose a run type.",
  phasePingHelp: "Taking small response-time samples.",
  phaseDownloadHelp: "Receiving test data from Cloudflare.",
  phaseUploadHelp: "Sending generated test data to Cloudflare.",
  phaseCompleteHelp: "All four observations are available.",
  download: "Download",
  upload: "Upload",
  ping: "Response time",
  jitter: "Ping variation",
  mbps: "Mbps",
  ms: "ms",
  measuredAt: "Measured",
  share: "Share result",
  copied: "Copied",
  comparisonTitle: "Measure your VPN’s impact",
  comparisonIntro:
    "We compare the latest run you marked ‘VPN off’ with the latest run marked ‘VPN on’. We never guess whether a VPN was active.",
  comparisonMissingBaseline:
    "Run and save a VPN-off baseline to start the comparison.",
  comparisonMissingVpn: "Now connect your VPN and save a second run.",
  comparisonConfirm:
    "I used the same device, browser and network for these two runs.",
  comparisonUnconfirmed:
    "Confirm that the test conditions matched before we calculate the difference.",
  comparisonDownload: "Download retained",
  comparisonUpload: "Upload retained",
  comparisonPing: "Response-time change",
  retained: "of baseline",
  changedBy: "changed by",
  comparisonBoundary:
    "This comparison applies only to these two browser runs and this route to Cloudflare. It is not a permanent provider score.",
  historyTitle: "Results saved in this browser",
  historyIntro:
    "Up to ten runs are stored locally. No IP address, account or browser fingerprint is included.",
  historyEmpty: "No completed runs yet.",
  exportCsv: "Export CSV",
  clear: "Clear history",
  confirmClear: "Delete all local runs?",
  cancelClear: "Keep history",
  localOnly: "Local result",
};

const widgetNl: SpeedTestWidgetCopy = {
  title: "Browsertest",
  intro:
    "Kies wat je meet. Doe eerst een meting met de VPN uit en herhaal dezelfde test daarna met de VPN aan.",
  contextTitle: "Testinformatie",
  contextEndpoint: "Meetpunt",
  contextEndpointValue: "Cloudflare-netwerkrand",
  contextMethod: "Methode",
  contextMethodValue: "Browsermetingen voor download, upload en reactietijd",
  contextStorage: "Opslag van uitslagen",
  contextStorageValue: "Alleen in deze browser",
  privacyNote:
    "De test verstuurt verkeer rechtstreeks tussen je browser en speed.cloudflare.com. Cloudflare kan je openbare IP-adres zien en technische verzoeklogs bewaren. ZeroToVPN stuurt de gemeten cijfers niet naar een eigen resultatendatabase.",
  dataUseNote:
    "Een volledige test gebruikt maximaal 120 MB download- en 40 MB uploaddata, plus gewone verzoekinformatie. Vermijd mobiele verbindingen met een datalimiet. De upload gebruikt gemaakte testbytes, niet jouw bestanden.",
  privacyLink: "Lees het privacybeleid",
  runKindLabel: "Wat ga je meten?",
  baseline: "VPN uit · startmeting",
  baselineHelp: "Bewaar eerst je normale verbinding.",
  vpn: "VPN aan",
  vpnHelp: "Herhaal op hetzelfde apparaat en netwerk.",
  unsure: "Niet zeker · losse test",
  unsureHelp: "Bewaar een meting zonder vergelijking.",
  start: "Start test",
  stop: "Stop test",
  testAgain: "Test opnieuw",
  retry: "Probeer opnieuw",
  idleStatus: "Klaar om te starten",
  runningStatus: "De meting loopt",
  stoppedStatus: "Test gestopt. Er is geen volledige uitslag opgeslagen.",
  completeStatus: "Meting opgeslagen in deze browser",
  completeUnsavedStatus:
    "Meting afgerond, maar deze browser blokkeerde lokale opslag",
  errorTitle: "De test is niet afgerond",
  errorBody:
    "Er is geen volledige uitslag opgeslagen. Controleer je verbinding of blokkering en probeer opnieuw.",
  phaseIdle: "Klaar",
  phasePing: "Reactietijd",
  phaseDownload: "Download",
  phaseUpload: "Upload",
  phaseComplete: "Voltooid",
  phaseIdleHelp: "Kies het soort meting.",
  phasePingHelp: "We nemen kleine metingen van de reactietijd.",
  phaseDownloadHelp: "We ontvangen testdata van Cloudflare.",
  phaseUploadHelp: "We sturen gemaakte testdata naar Cloudflare.",
  phaseCompleteHelp: "Alle vier de metingen zijn beschikbaar.",
  download: "Download",
  upload: "Upload",
  ping: "Reactietijd",
  jitter: "Pingvariatie",
  mbps: "Mbps",
  ms: "ms",
  measuredAt: "Gemeten",
  share: "Deel uitslag",
  copied: "Gekopieerd",
  comparisonTitle: "Meet de invloed van je VPN",
  comparisonIntro:
    "We vergelijken de laatste meting die jij ‘VPN uit’ noemde met de laatste meting ‘VPN aan’. We raden nooit zelf of een VPN actief was.",
  comparisonMissingBaseline: "Doe eerst een startmeting met de VPN uit.",
  comparisonMissingVpn: "Verbind nu je VPN en bewaar een tweede meting.",
  comparisonConfirm:
    "Ik gebruikte voor beide metingen hetzelfde apparaat, dezelfde browser en hetzelfde netwerk.",
  comparisonUnconfirmed:
    "Bevestig eerst dat de testomstandigheden gelijk waren. Daarna berekenen we het verschil.",
  comparisonDownload: "Download behouden",
  comparisonUpload: "Upload behouden",
  comparisonPing: "Verschil in reactietijd",
  retained: "van de startmeting",
  changedBy: "veranderde met",
  comparisonBoundary:
    "Deze vergelijking geldt alleen voor deze twee browsermetingen en deze route naar Cloudflare. Het is geen vaste score voor een VPN-aanbieder.",
  historyTitle: "Uitslagen in deze browser",
  historyIntro:
    "We bewaren maximaal tien metingen lokaal. Er staat geen IP-adres, account of browservingerafdruk in.",
  historyEmpty: "Nog geen voltooide metingen.",
  exportCsv: "Exporteer CSV",
  clear: "Wis geschiedenis",
  confirmClear: "Alle lokale metingen verwijderen?",
  cancelClear: "Bewaar geschiedenis",
  localOnly: "Lokale uitslag",
};

const en: SpeedTestCopy = {
  locale: "en",
  metadata: {
    title: "Internet Speed Test: Download, Upload & Ping",
    description:
      "Test download, upload, response time and ping variation to Cloudflare. Compare repeat runs with and without a VPN on the same device, network and test edge.",
  },
  eyebrow: "Network benchmark",
  title: "Internet speed test: measure download, upload and ping",
  intro:
    "This test shows how fast data moves between this browser and Cloudflare right now. It measures download, upload, response time and variation in response time.",
  directTip:
    "Test once with the VPN off. Then turn it on and repeat on the same device and network.",
  boundaryTitle: "One route, one moment",
  boundary:
    "Use this as a snapshot, not a grade for your internet plan or VPN. Wi-Fi, your device, network traffic, the endpoint and the time can change the result.",
  trustCues: ["No signup", "Results stay in this browser", "Method published"],
  updatedLabel: "Content and method checked 16 August 2026",
  nav: {
    test: "Run test",
    compare: "Compare VPN",
    understand: "Read results",
    method: "Method",
    faq: "FAQ",
  },
  widget: widgetEn,
  metrics: {
    eyebrow: "Read each number",
    title: "What the result can—and cannot—tell you",
    intro:
      "A large download number does not cancel out unstable response times. Read every metric as one observation on the tested route.",
    headers: ["Metric", "What it tells you", "What it cannot prove"],
    rows: [
      {
        name: "Download",
        tells:
          "How quickly this browser received test data from the Cloudflare edge.",
        limit: "Speed to every website, game, stream or VPN exit.",
      },
      {
        name: "Upload",
        tells: "How quickly generated test data left this browser.",
        limit: "That every call, backup or livestream will stay stable.",
      },
      {
        name: "Response time",
        tells: "The normal round-trip time across the tested route.",
        limit: "The ping to a different game server, country or app.",
      },
      {
        name: "Ping variation",
        tells: "How much the response-time samples changed during this run.",
        limit: "The exact cause of a Wi-Fi, ISP or VPN problem.",
      },
    ],
  },
  workflow: {
    eyebrow: "Fair comparison",
    title: "Compare the VPN without changing everything else",
    intro:
      "Change one thing at a time. Two careful runs are more useful than one impressive number.",
    steps: [
      {
        title: "Save a baseline",
        body: "Turn the VPN off. Keep the same device, Wi-Fi and browser.",
      },
      {
        title: "Connect one VPN server",
        body: "Pick the server you plan to use and wait until the app says connected.",
      },
      {
        title: "Repeat soon afterwards",
        body: "Run the same test before network conditions change too much.",
      },
      {
        title: "Look for a pattern",
        body: "Repeat both runs if a number looks unusual. Do not keep only the best result.",
      },
    ],
  },
  useCases: {
    title: "Which number matters most?",
    intro:
      "The service you use sets the real requirement. These cards explain the direction to watch, not a universal pass mark.",
    items: [
      {
        title: "Streaming",
        body: "Download headroom matters, but the service and route still decide what works.",
        note: "Watch download stability.",
      },
      {
        title: "Video calls",
        body: "Upload, response time and variation can matter more than a high download result.",
        note: "Watch sudden changes.",
      },
      {
        title: "Online games",
        body: "A stable low response time to the game server matters more than headline Mbps.",
        note: "This endpoint is not your game server.",
      },
      {
        title: "Large transfers",
        body: "Sustained download or upload speed matters over a longer period.",
        note: "Repeat with a real transfer.",
      },
    ],
  },
  method: {
    eyebrow: "How this browser test works",
    title: "Method and limits",
    intro:
      "The widget sends generated data to and from Cloudflare’s public speed endpoint. It records four browser observations and stores completed runs locally.",
    bullets: [
      "Several small requests estimate normal response time and variation.",
      "Parallel streams sample download and upload throughput for a fixed window.",
      "A failed or incomplete phase becomes an error, never a zero-speed verdict.",
      "Packet loss, loaded latency and destination-specific performance are not measured.",
      "VPN-off and VPN-on labels always come from you, not IP guessing.",
    ],
    link: "Read the full testing method",
  },
  related: {
    title: "Continue your network check",
    items: [
      {
        title: "Check your public IP",
        body: "See the address and approximate network context websites receive.",
        action: "Open IP checker",
        href: "/tools/what-is-my-ip",
      },
      {
        title: "VPN speed guide",
        body: "Learn why server distance, Wi-Fi and protocols can change results.",
        action: "Read speed guide",
        href: "/guides/vpn-speed-guide",
      },
      {
        title: "Gaming and ping",
        body: "Learn why a route to a game can differ from this test endpoint.",
        action: "Read ping guide",
        href: "/blog/does-vpn-reduce-ping-gaming-2026",
      },
    ],
  },
  faqTitle: "Internet and VPN speed test FAQ",
  faqs: [
    {
      question: "How accurate is this internet speed test?",
      answer:
        "It is a useful snapshot of one route from this browser to Cloudflare. Wi-Fi, device load, background traffic, the Cloudflare edge and network traffic can change it. Repeat comparable runs before drawing a conclusion.",
    },
    {
      question: "Which internet speed test is the most accurate?",
      answer:
        "No test is always the most accurate. Services use different locations and methods. Use the same test for a before-and-after comparison, then test the app or service that matters.",
    },
    {
      question: "What is a good download speed?",
      answer:
        "There is no single good number. You need enough speed for the things and devices in use at the same time. Check the current requirements of the service you use.",
    },
    {
      question: "Why is my VPN making the internet slower?",
      answer:
        "A VPN adds encryption and a different route. A distant or busy server, Wi-Fi, your device or the network can lower speed or raise response time. Try a nearby server and another supported protocol, then repeat the same test.",
    },
    {
      question: "Will a VPN always make my internet slower?",
      answer:
        "Not always, and not by one fixed amount. A different route may be better or worse at that moment. Compare repeated VPN-off and VPN-on runs on the same device and network.",
    },
    {
      question: "How do I test my VPN speed?",
      answer:
        "Choose VPN off and make a baseline. Connect to one VPN server, choose VPN on and repeat. Keep the device, network and test service the same. Compare all four measurements.",
    },
  ],
  sources: {
    title: "Sources and checked method",
    intro:
      "Cloudflare documents the public test endpoint and explains why throughput alone is not a full network-quality score.",
    checked: "Sources opened 16 August 2026",
    open: "Open source",
  },
};

const nl: SpeedTestCopy = {
  ...en,
  locale: "nl",
  metadata: {
    title: "Internetsnelheidstest: download, upload en ping",
    description:
      "Meet download, upload, reactietijd en pingvariatie via Cloudflare. Vergelijk meerdere tests met en zonder VPN op hetzelfde apparaat, netwerk en tijdstip.",
  },
  eyebrow: "Netwerkmeting",
  title: "Internetsnelheidstest: meet download, upload en ping",
  intro:
    "Deze test meet hoe snel gegevens nu tussen deze browser en Cloudflare gaan. Je ziet download, upload, reactietijd en verschil tussen de reactietijden.",
  directTip:
    "Test eerst met de VPN uit. Zet hem daarna aan en herhaal op hetzelfde apparaat en netwerk.",
  boundaryTitle: "Eén route, één moment",
  boundary:
    "Gebruik dit als momentopname, niet als cijfer voor je abonnement of VPN. Wifi, je apparaat, netwerkverkeer, het meetpunt en het tijdstip kunnen de uitslag veranderen.",
  trustCues: [
    "Geen account",
    "Uitslagen blijven in deze browser",
    "Methode gepubliceerd",
  ],
  updatedLabel: "Inhoud en methode gecontroleerd op 16 augustus 2026",
  nav: {
    test: "Start test",
    compare: "Vergelijk VPN",
    understand: "Lees uitslag",
    method: "Methode",
    faq: "FAQ",
  },
  widget: widgetNl,
  metrics: {
    eyebrow: "Lees elk getal apart",
    title: "Wat de uitslag wel en niet vertelt",
    intro:
      "Een hoge downloadsnelheid maakt een onstabiele reactietijd niet goed. Zie elk getal als één meting op de geteste route.",
    headers: ["Meting", "Wat dit vertelt", "Wat dit niet bewijst"],
    rows: [
      {
        name: "Download",
        tells:
          "Hoe snel deze browser testdata ontving van de Cloudflare-netwerkrand.",
        limit: "De snelheid naar elke website, game, stream of VPN-server.",
      },
      {
        name: "Upload",
        tells: "Hoe snel gemaakte testdata vanuit deze browser werd verstuurd.",
        limit: "Dat elk gesprek, elke back-up of livestream stabiel blijft.",
      },
      {
        name: "Reactietijd",
        tells: "De normale heen-en-terugtijd op de geteste route.",
        limit: "De ping naar een andere gameserver, land of app.",
      },
      {
        name: "Pingvariatie",
        tells: "Hoe sterk de reactietijden tijdens deze test veranderden.",
        limit:
          "De precieze oorzaak van een probleem met wifi, provider of VPN.",
      },
    ],
  },
  workflow: {
    eyebrow: "Eerlijke vergelijking",
    title: "Vergelijk de VPN zonder alles tegelijk te veranderen",
    intro:
      "Verander steeds één ding. Twee zorgvuldige metingen zeggen meer dan één indrukwekkend getal.",
    steps: [
      {
        title: "Bewaar een startmeting",
        body: "Zet de VPN uit. Houd hetzelfde apparaat, wifi-netwerk en dezelfde browser.",
      },
      {
        title: "Verbind één VPN-server",
        body: "Kies de server die je echt wilt gebruiken en wacht tot de app verbonden zegt.",
      },
      {
        title: "Herhaal kort daarna",
        body: "Doe dezelfde test voordat de netwerkomstandigheden te veel veranderen.",
      },
      {
        title: "Zoek naar een patroon",
        body: "Herhaal beide metingen bij een vreemde uitslag. Bewaar niet alleen het beste getal.",
      },
    ],
  },
  useCases: {
    title: "Welk getal is voor jou belangrijk?",
    intro:
      "De dienst die je gebruikt bepaalt de echte eis. Deze kaarten tonen waar je op let, niet één vaste voldoende.",
    items: [
      {
        title: "Streaming",
        body: "Ruimte in je downloadsnelheid helpt, maar de dienst en route bepalen wat werkt.",
        note: "Let op een stabiele download.",
      },
      {
        title: "Videobellen",
        body: "Upload, reactietijd en variatie kunnen belangrijker zijn dan een hoge download.",
        note: "Let op plotselinge verschillen.",
      },
      {
        title: "Online games",
        body: "Een stabiele, lage reactietijd naar de gameserver telt meer dan alleen Mbps.",
        note: "Dit meetpunt is niet je gameserver.",
      },
      {
        title: "Grote bestanden",
        body: "Een blijvende download- of uploadsnelheid telt over een langere periode.",
        note: "Herhaal met een echte overdracht.",
      },
    ],
  },
  method: {
    eyebrow: "Zo werkt deze browsertest",
    title: "Methode en beperkingen",
    intro:
      "De widget verstuurt gemaakte data van en naar het openbare snelheidsmeetpunt van Cloudflare. Hij bewaart vier browsermetingen lokaal.",
    bullets: [
      "Meerdere kleine verzoeken schatten de normale reactietijd en verschillen.",
      "Meerdere verbindingen meten download en upload binnen een vaste tijd.",
      "Een mislukte of onvolledige fase wordt een fout, nooit een nul-snelheid.",
      "Pakketverlies, reactietijd onder belasting en specifieke diensten worden niet getest.",
      "De labels VPN uit en VPN aan kies jij; we raden dit niet via je IP-adres.",
    ],
    link: "Lees de volledige testmethode",
  },
  related: {
    title: "Ga verder met je netwerkcontrole",
    items: [
      {
        title: "Controleer je openbare IP",
        body: "Bekijk het adres en de geschatte netwerkinformatie die websites ontvangen.",
        action: "Open IP-checker",
        href: "/tools/what-is-my-ip",
      },
      {
        title: "VPN-snelheidsgids",
        body: "Leer waarom serverafstand, wifi en verbindingstypen de uitslag veranderen.",
        action: "Lees snelheidsgids",
        href: "/guides/vpn-speed-guide",
      },
      {
        title: "VPN-locatie en snelheid",
        body: "Lees hoe een langere route de uitslag kan veranderen.",
        action: "Lees onderzoek",
        href: "/blog/vpn-location-spoofing-internet-speed-performance-test-2026",
      },
    ],
  },
  faqTitle: "Veelgestelde vragen over internet- en VPN-snelheid",
  faqs: [
    {
      question: "Hoe nauwkeurig is deze internetsnelheidstest?",
      answer:
        "Dit is een bruikbare momentopname van één route tussen deze browser en Cloudflare. Wifi, je apparaat, verkeer op de achtergrond, het meetpunt en drukte op het netwerk kunnen de uitslag veranderen. Herhaal vergelijkbare metingen.",
    },
    {
      question: "Welke internetsnelheidstest is het nauwkeurigst?",
      answer:
        "Geen enkele test is altijd het nauwkeurigst. Testdiensten gebruiken andere locaties en methoden. Gebruik dezelfde test voor een vergelijking en test daarna ook de app of dienst die voor jou telt.",
    },
    {
      question: "Wat is een goede downloadsnelheid?",
      answer:
        "Er is niet één goed getal. Je hebt genoeg snelheid nodig voor alle apparaten en activiteiten die tegelijk actief zijn. Bekijk de actuele eisen van de dienst die je gebruikt.",
    },
    {
      question: "Waarom wordt mijn internet trager met een VPN?",
      answer:
        "Een VPN voegt versleuteling en een andere route toe. Een verre of drukke server, wifi, je apparaat of het netwerk kan de snelheid verlagen of reactietijd verhogen. Probeer een nabije server en een ander ondersteund protocol.",
    },
    {
      question: "Maakt een VPN mijn internet altijd trager?",
      answer:
        "Niet altijd en nooit met één vast percentage. Een andere route kan op dat moment beter of slechter werken. Vergelijk meerdere metingen met VPN uit en VPN aan op hetzelfde apparaat en netwerk.",
    },
    {
      question: "Hoe test ik de snelheid van mijn VPN?",
      answer:
        "Kies VPN uit en maak een startmeting. Verbind één VPN-server, kies VPN aan en herhaal. Houd apparaat, netwerk en testdienst gelijk. Vergelijk alle vier de metingen.",
    },
  ],
  sources: {
    title: "Bronnen en gecontroleerde methode",
    intro:
      "Cloudflare beschrijft het openbare meetpunt en legt uit waarom alleen snelheid geen volledige score voor netwerkkwaliteit is.",
    checked: "Bronnen geopend op 16 augustus 2026",
    open: "Open bron",
  },
};

export function getSpeedTestCopy(locale: string): SpeedTestCopy {
  return locale === "nl" ? nl : en;
}

export function isSpeedTestLocale(locale: string): locale is SpeedTestLocale {
  return locale === "en" || locale === "nl";
}
