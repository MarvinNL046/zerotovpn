export type VpnSpeedGuideCopy = {
  locale: "en" | "nl";
  meta: { title: string; description: string };
  breadcrumb: { home: string; guides: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    directAnswer: string;
    reviewed: string;
    readTime: string;
    cues: string[];
  };
  visual: {
    title: string;
    route: [string, string, string];
    metricLabels: [string, string, string, string];
    boundary: string;
  };
  boundary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  metrics: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; unit: string; body: string; limit: string }>;
    precision: string;
  };
  factors: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      icon: "wifi" | "device" | "endpoint" | "server" | "protocol" | "time";
      title: string;
      body: string;
    }>;
  };
  comparison: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    readTitle: string;
    readPoints: string[];
  };
  tool: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: string[];
    cta: string;
    privacyLink: string;
  };
  notMeasured: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  troubleshoot: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
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

const en: VpnSpeedGuideCopy = {
  locale: "en",
  meta: {
    title: "How to test VPN speed fairly",
    description:
      "Learn how to compare VPN-off and VPN-on speed with a baseline, three repeat runs and clear limits for download, upload and browser response time.",
  },
  breadcrumb: { home: "Home", guides: "Guides", current: "VPN speed guide" },
  hero: {
    eyebrow: "Evidence-led speed guide",
    title: "How to test VPN speed fairly",
    intro:
      "A speed test is one observation on one route at one moment. To learn what a VPN changed, measure the normal connection first, repeat the same test and keep the device, network and endpoint the same.",
    directLabel: "The useful rule",
    directAnswer:
      "Run three VPN-off tests and three VPN-on tests. Compare the middle result and the spread, not the single highest number.",
    reviewed: "Method and copy checked 16 August 2026",
    readTime: "About 10 minutes",
    cues: ["No universal pass mark", "No provider ranking", "Keep every run"],
  },
  visual: {
    title: "The route you are measuring",
    route: ["This browser", "Your current route", "Cloudflare edge"],
    metricLabels: ["Download", "Upload", "Response time", "Variation"],
    boundary: "Change the endpoint and you change the question.",
  },
  boundary: {
    eyebrow: "First, set the boundary",
    title: "One route and one moment",
    intro:
      "A result belongs to the setup that produced it. It is not a permanent score for your internet plan, VPN or provider.",
    items: [
      {
        title: "One browser route",
        body: "The ZeroToVPN tool sends test traffic between this browser and Cloudflare's network edge. Another test location can give another result.",
      },
      {
        title: "One network moment",
        body: "Wi-Fi traffic, ISP routing, VPN load and the time of day can change while you test.",
      },
      {
        title: "One recorded setup",
        body: "Write down the device, browser, Wi-Fi or cable, VPN server, protocol, endpoint and time before comparing runs.",
      },
    ],
  },
  metrics: {
    eyebrow: "Read all four observations",
    title: "What each number means",
    intro:
      "A large download number can sit beside slow or unstable responses. Read the numbers together and keep their limits visible.",
    items: [
      {
        title: "Download",
        unit: "Mbps",
        body: "How quickly this browser received generated test data from the Cloudflare edge during the download window.",
        limit:
          "It does not prove the speed to every website, stream, game or VPN exit.",
      },
      {
        title: "Upload",
        unit: "Mbps",
        body: "How quickly generated test data left this browser for the Cloudflare edge during the upload window.",
        limit:
          "It does not prove that every call, backup or livestream will stay stable.",
      },
      {
        title: "Browser response time",
        unit: "ms",
        body: "The middle round-trip time from several small browser requests made before the transfer tests.",
        limit:
          "It is not the ping to a game server, meeting service or another country.",
      },
      {
        title: "Response-time variation",
        unit: "ms",
        body: "How much neighbouring response-time samples changed during this short run.",
        limit:
          "It does not reveal the exact cause and is not a full packet-jitter test.",
      },
    ],
    precision:
      "A decimal is display detail, not certainty. Treat 84.2 and 83.9 Mbps as two close observations unless repeated runs show a clear pattern.",
  },
  factors: {
    eyebrow: "Why runs change",
    title: "Six parts of the route can move the result",
    intro:
      "Change one part at a time. Otherwise you cannot tell which change helped or hurt.",
    items: [
      {
        icon: "wifi",
        title: "Wi-Fi and local traffic",
        body: "Distance from the router, walls, radio noise and other people using the connection can change every run.",
      },
      {
        icon: "device",
        title: "Device and browser",
        body: "Power saving, background downloads, extensions, CPU load and the browser can limit a test.",
      },
      {
        icon: "endpoint",
        title: "Test endpoint and route",
        body: "Your ISP or VPN may take a different path to Cloudflare than it takes to the app you actually use.",
      },
      {
        icon: "server",
        title: "VPN server",
        body: "Distance, current load and the route from the VPN server to the endpoint can all matter.",
      },
      {
        icon: "protocol",
        title: "Protocol and settings",
        body: "A supported protocol, transport mode, split tunnel or extra feature can change work on the device and route.",
      },
      {
        icon: "time",
        title: "Time and network traffic",
        body: "Congestion and routing can change across minutes, evenings, updates and incidents.",
      },
    ],
  },
  comparison: {
    eyebrow: "A fair VPN-off / VPN-on comparison",
    title: "Use three runs on each side",
    intro:
      "The goal is not to find the best-looking number. The goal is to see whether the same change produces a repeatable pattern.",
    steps: [
      {
        title: "Prepare the route",
        body: "Pause large transfers. Keep the same device, browser, network and place. Record the endpoint and time.",
      },
      {
        title: "Measure a VPN-off baseline",
        body: "Turn the VPN off and complete three runs. Keep all results, including the slowest one.",
      },
      {
        title: "Connect one VPN setup",
        body: "Choose one server and one protocol. Wait until the app confirms the connection. Do not change anything else.",
      },
      {
        title: "Repeat three VPN-on runs",
        body: "Use the same test soon afterwards. Keep the same endpoint, browser and local network.",
      },
      {
        title: "Compare the middle and spread",
        body: "For each set, find the middle of the three results. Also note the lowest and highest result to see variation.",
      },
      {
        title: "Check the real destination",
        body: "If a game, call or download matters, test that service too. The Cloudflare route cannot answer every app question.",
      },
    ],
    readTitle: "Read the pattern carefully",
    readPoints: [
      "A stable small change is often more useful than one high result followed by two low results.",
      "Compare like with like. Do not compare Wi-Fi with cable, another device or another endpoint.",
      "Repeat the full comparison later if the route was busy or the spread was wide.",
      "Do not turn the percentage from six short runs into a permanent provider score.",
    ],
  },
  tool: {
    eyebrow: "ZeroToVPN browser tool",
    title: "Run the same route with and without the VPN",
    intro:
      "The speed test lets you label a run as VPN off or VPN on. It never guesses whether a VPN is active.",
    facts: [
      "Traffic goes directly between your browser and speed.cloudflare.com.",
      "A full run is capped at 120 MB download and 40 MB upload payload, plus normal request overhead.",
      "Upload uses generated test bytes, not files from your device.",
      "Cloudflare can see your public IP and may keep ordinary technical request logs.",
      "ZeroToVPN keeps up to ten completed results in this browser and does not send the numbers to its own result database.",
    ],
    cta: "Open the internet speed test",
    privacyLink: "Read the privacy policy",
  },
  notMeasured: {
    eyebrow: "Do not fill the gaps with guesses",
    title: "What this browser test does not measure",
    intro:
      "A missing metric stays missing. A speed result is not proof about privacy, safety or every destination.",
    items: [
      {
        title: "Packet loss",
        body: "The current ZeroToVPN run does not send a separate packet-loss measurement.",
      },
      {
        title: "Response time under load",
        body: "It does not measure how response time changes while the connection is fully busy.",
      },
      {
        title: "A specific app or server",
        body: "It does not contact your game server, meeting room, streaming title or file host.",
      },
      {
        title: "Long-term stability",
        body: "A short run cannot prove how the route behaves for an hour, a day or during another busy period.",
      },
      {
        title: "The exact cause of a problem",
        body: "A slow number does not tell you whether Wi-Fi, the ISP, device, VPN server or endpoint caused it.",
      },
      {
        title: "A VPN's privacy or security",
        body: "Speed does not prove logging behaviour, app safety, leak protection or who operates the service.",
      },
    ],
  },
  troubleshoot: {
    eyebrow: "Find the problem one step at a time",
    title: "A simple speed-check routine",
    intro:
      "Start before the VPN. If the normal connection is unstable, changing the VPN may hide the real cause.",
    steps: [
      {
        title: "Check the baseline spread",
        body: "If three VPN-off runs differ a lot, pause. Fix the local connection before judging the VPN.",
      },
      {
        title: "Reduce local noise",
        body: "Move near the router or use a cable, pause updates and transfers, and close heavy browser tabs.",
      },
      {
        title: "Reconnect one nearby server",
        body: "Use a server near the destination you need. Wait for a full connection, then repeat the same route.",
      },
      {
        title: "Change one supported protocol",
        body: "Try one other protocol offered by the app. Keep the server and all other conditions the same.",
      },
      {
        title: "Try another network",
        body: "A second trusted network can help separate a local or ISP problem from the device or VPN setup.",
      },
      {
        title: "Test the service that matters",
        body: "If only one app is slow, test that app and check its status. Save times, routes and failed runs before asking support.",
      },
    ],
  },
  evidence: {
    eyebrow: "Sources, method and corrections",
    title: "How this guide was checked",
    intro:
      "The tool boundary comes from the current ZeroToVPN speed-test code and copy. Cloudflare sources explain the endpoint and why several network metrics matter.",
    sourceLabel: "Open source",
    sources: [
      {
        title: "Cloudflare: Test your home network performance",
        body: "Cloudflare's explanation of its speed endpoint, repeat measurements and download, upload and latency observations.",
        href: "https://blog.cloudflare.com/test-your-home-network-performance/",
      },
      {
        title: "Cloudflare privacy policy",
        body: "The current policy for information Cloudflare receives when its services handle a request.",
        href: "https://www.cloudflare.com/policies/privacy/",
      },
    ],
    methodTitle: "Read our method",
    methodBody:
      "See how ZeroToVPN labels a test, records limits and avoids turning one observation into a broad claim.",
    methodCta: "View the methodology",
    correctionTitle: "Found a mismatch?",
    correctionBody:
      "Send the page URL, the exact sentence and a dated source or repeatable test record.",
    correctionCta: "Contact the editorial team",
  },
  related: {
    eyebrow: "Keep learning",
    title: "Related network guides",
    items: [
      {
        title: "What is a VPN?",
        body: "See which part of the route a VPN changes and which risks stay outside the tunnel.",
        href: "/guides/what-is-vpn",
      },
      {
        title: "VPN protocols explained",
        body: "Learn why a protocol can change compatibility, route and performance.",
        href: "/guides/vpn-protocols-explained",
      },
      {
        title: "How we test VPNs",
        body: "See how we separate repeatable measurements from provider claims.",
        href: "/methodology",
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    title: "Plain answers about VPN speed tests",
    items: [
      {
        question: "What is a good VPN speed?",
        answer:
          "There is no universal pass mark. You need enough download, upload and response quality for the service and devices you use. Check that service's current needs and test its real route.",
      },
      {
        question: "How many VPN speed tests should I run?",
        answer:
          "Start with three VPN-off runs and three VPN-on runs under the same conditions. Compare the middle result and the spread. Repeat later if the results vary widely.",
      },
      {
        question: "Why does every speed test give a different result?",
        answer:
          "The endpoint, Wi-Fi, device load, route, server load and network traffic can change. Even two tests a minute apart are separate observations.",
      },
      {
        question: "Can this test tell me which VPN is fastest?",
        answer:
          "No. It measures one browser route to Cloudflare at one moment. A fair provider comparison needs the same repeated method across providers, servers, times and relevant destinations.",
      },
      {
        question: "Will a VPN always make my internet slower?",
        answer:
          "Not by one fixed amount. Encryption and another route add work, but the new route can be better or worse at that moment. Repeated VPN-off and VPN-on tests show what happened on your route.",
      },
      {
        question: "Is response-time variation the same as packet jitter?",
        answer:
          "Not exactly. The ZeroToVPN number shows how much neighbouring browser response-time samples changed. It is a useful clue, not a full packet-level jitter measurement.",
      },
    ],
  },
};

const nl: VpnSpeedGuideCopy = {
  locale: "nl",
  meta: {
    title: "Zo test je VPN-snelheid eerlijk",
    description:
      "Leer hoe je VPN-uit en VPN-aan eerlijk vergelijkt met een nulmeting, drie herhalingen en duidelijke grenzen voor download, upload en reactietijd.",
  },
  breadcrumb: {
    home: "Start",
    guides: "Gidsen",
    current: "Gids voor VPN-snelheid",
  },
  hero: {
    eyebrow: "Snelheidsgids op basis van bewijs",
    title: "Zo test je VPN-snelheid eerlijk",
    intro:
      "Een snelheidstest is één waarneming op één route en één moment. Wil je weten wat de VPN veranderde? Meet dan eerst de normale verbinding, herhaal dezelfde test en houd apparaat, netwerk en meetpunt gelijk.",
    directLabel: "De nuttige regel",
    directAnswer:
      "Doe drie tests met de VPN uit en drie met de VPN aan. Vergelijk de middelste uitslag en de spreiding, niet alleen het hoogste getal.",
    reviewed: "Methode en tekst gecontroleerd op 16 augustus 2026",
    readTime: "Ongeveer 10 minuten",
    cues: ["Geen vaste slaaggrens", "Geen ranglijst", "Bewaar elke meting"],
  },
  visual: {
    title: "De route die je meet",
    route: ["Deze browser", "Je huidige route", "Cloudflare-rand"],
    metricLabels: ["Download", "Upload", "Reactietijd", "Variatie"],
    boundary: "Verander het meetpunt en je stelt een andere vraag.",
  },
  boundary: {
    eyebrow: "Bepaal eerst de grens",
    title: "Eén route en één moment",
    intro:
      "Een uitslag hoort bij de opstelling die hem maakte. Het is geen vaste score voor je internetabonnement, VPN of aanbieder.",
    items: [
      {
        title: "Eén browserroute",
        body: "De tool van ZeroToVPN stuurt testverkeer tussen deze browser en de rand van het Cloudflare-netwerk. Een ander meetpunt kan een andere uitslag geven.",
      },
      {
        title: "Eén netwerkmoment",
        body: "Wifi-verkeer, routes van je provider, drukte op de VPN en het tijdstip kunnen tijdens de test veranderen.",
      },
      {
        title: "Eén vastgelegde opstelling",
        body: "Schrijf apparaat, browser, wifi of kabel, VPN-server, protocol, meetpunt en tijd op voordat je metingen vergelijkt.",
      },
    ],
  },
  metrics: {
    eyebrow: "Lees alle vier de waarnemingen",
    title: "Wat elk getal betekent",
    intro:
      "Een groot downloadgetal kan naast trage of onrustige reacties staan. Lees de getallen samen en houd hun grenzen zichtbaar.",
    items: [
      {
        title: "Download",
        unit: "Mbps",
        body: "Hoe snel deze browser tijdens het downloaddeel gemaakte testdata van de Cloudflare-rand ontving.",
        limit:
          "Het bewijst niet de snelheid naar elke website, stream, game of VPN-uitgang.",
      },
      {
        title: "Upload",
        unit: "Mbps",
        body: "Hoe snel gemaakte testdata tijdens het uploaddeel van deze browser naar de Cloudflare-rand ging.",
        limit:
          "Het bewijst niet dat elk gesprek, elke back-up of livestream stabiel blijft.",
      },
      {
        title: "Reactietijd in de browser",
        unit: "ms",
        body: "De middelste heen-en-terugtijd van meerdere kleine browserverzoeken vóór de overdrachtstests.",
        limit:
          "Dit is niet de ping naar een gameserver, vergaderdienst of ander land.",
      },
      {
        title: "Variatie in reactietijd",
        unit: "ms",
        body: "Hoeveel opeenvolgende metingen van de reactietijd tijdens deze korte test veranderden.",
        limit:
          "Het toont niet de precieze oorzaak en is geen volledige meting van jitter op pakketniveau.",
      },
    ],
    precision:
      "Een cijfer achter de komma is weergave, geen zekerheid. Zie 84,2 en 83,9 Mbps als twee metingen die dicht bij elkaar liggen, tenzij herhalingen een duidelijk patroon tonen.",
  },
  factors: {
    eyebrow: "Waarom metingen veranderen",
    title: "Zes delen van de route kunnen de uitslag veranderen",
    intro:
      "Verander steeds één onderdeel. Anders weet je niet welke verandering hielp of juist tegenwerkte.",
    items: [
      {
        icon: "wifi",
        title: "Wifi en lokaal verkeer",
        body: "Afstand tot de router, muren, storing en andere mensen op de verbinding kunnen elke meting veranderen.",
      },
      {
        icon: "device",
        title: "Apparaat en browser",
        body: "Energiebesparing, downloads op de achtergrond, extensies, processorgebruik en de browser kunnen een test beperken.",
      },
      {
        icon: "endpoint",
        title: "Meetpunt en route",
        body: "Je internetprovider of VPN kan een andere route naar Cloudflare nemen dan naar de app die je echt gebruikt.",
      },
      {
        icon: "server",
        title: "VPN-server",
        body: "Afstand, huidige drukte en de route van de VPN-server naar het meetpunt kunnen allemaal meetellen.",
      },
      {
        icon: "protocol",
        title: "Protocol en instellingen",
        body: "Een ondersteund protocol, soort transport, split tunnel of extra functie kan het werk op apparaat en route veranderen.",
      },
      {
        icon: "time",
        title: "Tijd en netwerkverkeer",
        body: "Drukte en routes kunnen veranderen per minuut, avond, update of storing.",
      },
    ],
  },
  comparison: {
    eyebrow: "Een eerlijke vergelijking met VPN uit en aan",
    title: "Gebruik aan beide kanten drie metingen",
    intro:
      "Het doel is niet het mooiste getal vinden. Je wilt zien of dezelfde verandering een patroon oplevert dat terugkomt.",
    steps: [
      {
        title: "Maak de route klaar",
        body: "Pauzeer grote overdrachten. Houd apparaat, browser, netwerk en plek gelijk. Schrijf meetpunt en tijd op.",
      },
      {
        title: "Doe een nulmeting met de VPN uit",
        body: "Zet de VPN uit en rond drie metingen af. Bewaar alle uitslagen, ook de langzaamste.",
      },
      {
        title: "Verbind één VPN-opstelling",
        body: "Kies één server en één protocol. Wacht tot de app de verbinding bevestigt. Verander verder niets.",
      },
      {
        title: "Herhaal drie metingen met de VPN aan",
        body: "Gebruik kort daarna dezelfde test. Houd meetpunt, browser en lokaal netwerk gelijk.",
      },
      {
        title: "Vergelijk midden en spreiding",
        body: "Zoek voor elke groep het middelste van de drie getallen. Noteer ook laagste en hoogste uitslag om de spreiding te zien.",
      },
      {
        title: "Controleer de echte bestemming",
        body: "Is een game, gesprek of download belangrijk? Test die dienst dan ook. De Cloudflare-route beantwoordt niet elke appvraag.",
      },
    ],
    readTitle: "Lees het patroon voorzichtig",
    readPoints: [
      "Een kleine stabiele verandering is vaak nuttiger dan één hoge uitslag met daarna twee lage.",
      "Vergelijk hetzelfde met hetzelfde. Vergelijk wifi niet met kabel, een ander apparaat of een ander meetpunt.",
      "Herhaal de hele vergelijking later als de route druk was of de spreiding groot.",
      "Maak van het percentage uit zes korte metingen geen vaste score voor een aanbieder.",
    ],
  },
  tool: {
    eyebrow: "Browsertest van ZeroToVPN",
    title: "Test dezelfde route met en zonder VPN",
    intro:
      "Bij de snelheidstest geef je zelf aan of de VPN uit of aan staat. De tool raadt nooit of een VPN actief is.",
    facts: [
      "Verkeer gaat rechtstreeks tussen je browser en speed.cloudflare.com.",
      "Een volledige test gebruikt maximaal 120 MB download- en 40 MB uploaddata, plus gewone informatie rond de verzoeken.",
      "De upload gebruikt gemaakte testbytes, geen bestanden van je apparaat.",
      "Cloudflare kan je openbare IP-adres zien en gewone technische logs van verzoeken bewaren.",
      "ZeroToVPN bewaart maximaal tien voltooide metingen in deze browser en stuurt de cijfers niet naar een eigen resultatendatabase.",
    ],
    cta: "Open de internetsnelheidstest",
    privacyLink: "Lees het privacybeleid",
  },
  notMeasured: {
    eyebrow: "Vul gaten niet met een gok",
    title: "Wat deze browsertest niet meet",
    intro:
      "Een ontbrekende meting blijft ontbreken. Een snelheidsuitslag is geen bewijs over privacy, veiligheid of elke bestemming.",
    items: [
      {
        title: "Pakketverlies",
        body: "De huidige test van ZeroToVPN doet geen aparte meting van verloren netwerkpakketten.",
      },
      {
        title: "Reactietijd tijdens zware belasting",
        body: "De test meet niet hoe de reactietijd verandert terwijl de verbinding helemaal wordt gebruikt.",
      },
      {
        title: "Een bepaalde app of server",
        body: "De test maakt geen contact met je gameserver, vergaderruimte, streamingtitel of bestandenserver.",
      },
      {
        title: "Stabiliteit voor een lange tijd",
        body: "Een korte test bewijst niet hoe de route zich een uur, dag of tijdens een andere drukke periode gedraagt.",
      },
      {
        title: "De precieze oorzaak van een probleem",
        body: "Een laag getal zegt niet of wifi, provider, apparaat, VPN-server of meetpunt de oorzaak is.",
      },
      {
        title: "Privacy of veiligheid van een VPN",
        body: "Snelheid bewijst niets over logs, veiligheid van de app, bescherming tegen lekken of wie de dienst beheert.",
      },
    ],
  },
  troubleshoot: {
    eyebrow: "Vind het probleem stap voor stap",
    title: "Een simpele controle bij snelheidsproblemen",
    intro:
      "Begin vóór de VPN. Als de gewone verbinding onrustig is, kan een wijziging van de VPN de echte oorzaak verbergen.",
    steps: [
      {
        title: "Bekijk de spreiding van de nulmeting",
        body: "Verschillen drie metingen met de VPN uit sterk? Stop dan. Herstel de lokale verbinding voordat je de VPN beoordeelt.",
      },
      {
        title: "Verminder lokale drukte",
        body: "Ga dichter bij de router of gebruik een kabel. Pauzeer updates en overdrachten en sluit zware browsertabbladen.",
      },
      {
        title: "Verbind opnieuw met één server dichtbij",
        body: "Gebruik een server dicht bij de bestemming die je nodig hebt. Wacht op een volledige verbinding en herhaal dezelfde route.",
      },
      {
        title: "Verander één ondersteund protocol",
        body: "Probeer één ander protocol uit de app. Houd server en alle andere omstandigheden hetzelfde.",
      },
      {
        title: "Probeer een ander netwerk",
        body: "Een tweede vertrouwd netwerk helpt een lokaal probleem of providerprobleem te scheiden van apparaat of VPN-opstelling.",
      },
      {
        title: "Test de dienst die voor jou telt",
        body: "Is maar één app langzaam? Test die app en controleer de status. Bewaar tijden, routes en mislukte metingen voordat je hulp vraagt.",
      },
    ],
  },
  evidence: {
    eyebrow: "Bronnen, methode en correcties",
    title: "Zo is deze gids gecontroleerd",
    intro:
      "De grens van de tool komt uit de actuele code en tekst van de ZeroToVPN-snelheidstest. Bronnen van Cloudflare leggen het meetpunt uit en waarom meerdere netwerkmetingen tellen.",
    sourceLabel: "Open bron",
    sources: [
      {
        title: "Cloudflare: Test your home network performance",
        body: "Uitleg van Cloudflare over het snelheidsmeetpunt, herhaalde metingen en download, upload en reactietijd.",
        href: "https://blog.cloudflare.com/test-your-home-network-performance/",
      },
      {
        title: "Privacybeleid van Cloudflare",
        body: "Het actuele beleid voor informatie die Cloudflare ontvangt wanneer zijn diensten een verzoek verwerken.",
        href: "https://www.cloudflare.com/policies/privacy/",
      },
    ],
    methodTitle: "Lees onze methode",
    methodBody:
      "Bekijk hoe ZeroToVPN een test benoemt, grenzen vastlegt en één waarneming niet verandert in een brede claim.",
    methodCta: "Bekijk de methodologie",
    correctionTitle: "Klopt iets niet?",
    correctionBody:
      "Stuur de URL, de precieze zin en een bron met datum of een testverslag dat iemand kan herhalen.",
    correctionCta: "Neem contact op met de redactie",
  },
  related: {
    eyebrow: "Verder leren",
    title: "Bijpassende netwerkgidsen",
    items: [
      {
        title: "Wat is een VPN?",
        body: "Bekijk welk deel van de route een VPN verandert en welke risico's buiten de tunnel blijven.",
        href: "/guides/what-is-vpn",
      },
      {
        title: "VPN-privacygids",
        body: "Leer welk privacybewijs bruikbaar is en welke risico's buiten de tunnel blijven.",
        href: "/guides/vpn-privacy-guide",
      },
      {
        title: "Zo testen we VPN's",
        body: "Bekijk hoe we herhaalbare metingen scheiden van claims van aanbieders.",
        href: "/methodology",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Duidelijke antwoorden over VPN-snelheidstests",
    items: [
      {
        question: "Wat is een goede VPN-snelheid?",
        answer:
          "Er is geen vaste slaaggrens. Je hebt genoeg download, upload en reactiekwaliteit nodig voor de dienst en apparaten die je gebruikt. Bekijk de actuele eisen van die dienst en test de echte route.",
      },
      {
        question: "Hoeveel VPN-snelheidstests moet ik doen?",
        answer:
          "Begin met drie metingen met de VPN uit en drie met de VPN aan onder dezelfde omstandigheden. Vergelijk de middelste uitslag en de spreiding. Herhaal later als de uitslagen sterk verschillen.",
      },
      {
        question: "Waarom geeft elke snelheidstest een andere uitslag?",
        answer:
          "Meetpunt, wifi, drukte op het apparaat, route, serverdrukte en netwerkverkeer kunnen veranderen. Zelfs twee tests met één minuut ertussen zijn aparte waarnemingen.",
      },
      {
        question: "Kan deze test vertellen welke VPN het snelst is?",
        answer:
          "Nee. De test meet één browserroute naar Cloudflare op één moment. Een eerlijke vergelijking van aanbieders vraagt dezelfde herhaalde methode voor aanbieders, servers, tijden en belangrijke bestemmingen.",
      },
      {
        question: "Maakt een VPN mijn internet altijd langzamer?",
        answer:
          "Niet met één vast verschil. Versleuteling en een andere route geven extra werk, maar de nieuwe route kan op dat moment beter of slechter zijn. Herhaalde tests met de VPN uit en aan tonen wat op jouw route gebeurde.",
      },
      {
        question:
          "Is variatie in reactietijd hetzelfde als jitter van pakketten?",
        answer:
          "Niet precies. Het getal van ZeroToVPN toont hoeveel opeenvolgende reactietijden in de browser veranderden. Het is een nuttige aanwijzing, geen volledige meting van jitter op pakketniveau.",
      },
    ],
  },
};

export function isVpnSpeedGuideLocale(locale: string): locale is "en" | "nl" {
  return locale === "en" || locale === "nl";
}

export function getVpnSpeedGuideCopy(locale: string): VpnSpeedGuideCopy {
  return locale === "nl" ? nl : en;
}
