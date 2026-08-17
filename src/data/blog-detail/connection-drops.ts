export const CONNECTION_DROPS_SLUG =
  "vpn-connection-drops-why-disconnects-how-to-fix-2026";

export type ConnectionDropsLocale = "en" | "nl";

type ArticleLink = {
  href: string;
  label: string;
};

type SourceRecord = {
  checked: string;
  href: string;
  label: string;
  limitation: string;
  source: string;
};

export type ConnectionDropsCopy = {
  locale: ConnectionDropsLocale;
  metadata: {
    title: string;
    description: string;
    imageAlt: string;
  };
  breadcrumb: { journal: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    answer: string;
    imageAlt: string;
    imageCaption: string;
    primaryAction: string;
    secondaryAction: string;
    byline: string;
    reviewed: string;
    published: string;
    updated: string;
    readTime: string;
    trust: string[];
  };
  nav: Array<{ href: string; label: string }>;
  before: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    warningTitle: string;
    warning: string;
  };
  diagnosis: {
    eyebrow: string;
    title: string;
    intro: string;
    questions: Array<{
      question: string;
      outcome: string;
      action: string;
      record: string;
    }>;
    table: {
      symptom: string;
      layer: string;
      firstAction: string;
    };
  };
  fixes: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      why: string;
      try: string;
      result: string;
      limit: string;
      link?: ArticleLink;
    }>;
    labels: {
      why: string;
      try: string;
      result: string;
      limit: string;
    };
  };
  devices: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; checks: string[]; link?: ArticleLink }>;
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; body: string; status: string }>;
    logTitle: string;
    logIntro: string;
    headers: string[];
    rows: string[][];
    copyAction: string;
    downloadAction: string;
    copied: string;
    note: string;
  };
  support: {
    eyebrow: string;
    title: string;
    intro: string;
    contactTitle: string;
    contact: string[];
    alternativesTitle: string;
    alternatives: string[];
    comparisonLink: string;
    methodLink: string;
  };
  sources: {
    eyebrow: string;
    title: string;
    intro: string;
    records: SourceRecord[];
    columns: {
      claim: string;
      source: string;
      checked: string;
      limitation: string;
    };
  };
  author: {
    title: string;
    name: string;
    role: string;
    body: string;
    link: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  related: {
    eyebrow: string;
    title: string;
    items: Array<{ href: string; title: string; body: string }>;
  };
  newsletter: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
  };
};

const SHARED_SOURCES = {
  android: "https://support.google.com/android/answer/9089766?hl=en-GB",
  windows:
    "https://support.microsoft.com/topic/3d29aeb1-f497-f6b7-7633-115722c1009c",
  wireguard: "https://www.wireguard.com/protocol/",
  openvpn:
    "https://openvpn.net/community-docs/creating-configuration-files-for-server-and-clients.html",
} as const;

export const connectionDropsCopy: Record<
  ConnectionDropsLocale,
  ConnectionDropsCopy
> = {
  en: {
    locale: "en",
    metadata: {
      title: "Why Does My VPN Keep Disconnecting? 6 Safe Fixes",
      description:
        "Find why your VPN keeps disconnecting. Test your internet, app, server, protocol and kill switch one step at a time with six safe fixes.",
      imageAlt:
        "Router, laptop and phone showing a VPN connection that needs troubleshooting",
    },
    breadcrumb: { journal: "Journal", current: "VPN disconnecting" },
    hero: {
      eyebrow: "Troubleshooting · provider-neutral",
      title: "Why does my VPN keep disconnecting?",
      answer:
        "A VPN usually disconnects because the internet underneath it is unstable, your device changes networks, the app is outdated, one server route fails, a connection method is blocked, or the kill switch blocks traffic after a drop. First test your internet without the VPN. Then change one thing at a time.",
      imageAlt:
        "Editorial illustration of a router, laptop and phone during a VPN connection problem",
      imageCaption:
        "Original ZeroToVPN illustration. It explains the problem and is not a screenshot or test result.",
      primaryAction: "Start the diagnosis",
      secondaryAction: "Copy the test checklist",
      byline: "Written and checked by Marvin Smit",
      reviewed: "Provider-neutral troubleshooting",
      published: "Published 16 February 2026",
      updated: "Updated 16 August 2026",
      readTime: "10 min read",
      trust: [
        "No paid placement in the diagnosis",
        "One change per test",
        "Limits shown with every result",
      ],
    },
    nav: [
      { href: "#quick-answer", label: "Quick answer" },
      { href: "#diagnose", label: "Diagnose" },
      { href: "#safe-fixes", label: "6 safe fixes" },
      { href: "#by-device", label: "By device" },
      { href: "#evidence", label: "Test log" },
      { href: "#support", label: "Support" },
      { href: "#faq", label: "FAQ" },
      { href: "#sources", label: "Sources" },
    ],
    before: {
      eyebrow: "Quick answer",
      title: "Before you change any setting",
      intro:
        "These four checks tell you whether the VPN is the cause or whether the normal internet connection is already unstable.",
      steps: [
        {
          title: "Turn the VPN off briefly",
          body: "Use only a non-sensitive page while the VPN is off.",
        },
        {
          title: "Check the normal connection",
          body: "See whether Wi-Fi or mobile data also drops without the VPN.",
        },
        {
          title: "Write down the setup",
          body: "Record network, device, server, connection method and time.",
        },
        {
          title: "Change one thing",
          body: "One change per test makes the result useful.",
        },
      ],
      warningTitle: "Safety first",
      warning:
        "Do not leave the kill switch disabled while using banking, work accounts or other sensitive services. Re-enable it after a short controlled check.",
    },
    diagnosis: {
      eyebrow: "Find the failing layer",
      title: "Five questions narrow down the cause",
      intro:
        "Answer the questions in order. A yes answer points to the first layer worth checking; it does not prove that every part of that layer is broken.",
      questions: [
        {
          question: "Does the internet also fail without the VPN?",
          outcome: "Base network, router or ISP",
          action:
            "Restart the router and test another network before changing VPN settings.",
          record: "Time, Wi-Fi strength and whether another device also drops.",
        },
        {
          question: "Does only one VPN server disconnect?",
          outcome: "Server or route",
          action: "Try one nearby server in the same region.",
          record: "Old server, new server and whether the drop repeats.",
        },
        {
          question: "Does it happen after Wi-Fi/mobile switching or sleep?",
          outcome: "Device or background permissions",
          action:
            "Check background activity and network permissions for the VPN app.",
          record: "The exact handoff or wake event that triggers the drop.",
        },
        {
          question: "Is all traffic blocked after the VPN drops?",
          outcome: "Kill switch may be working",
          action: "Reconnect and check the app's documented kill-switch mode.",
          record: "Whether traffic returns only after the VPN reconnects.",
        },
        {
          question: "Does another documented connection method stay online?",
          outcome: "Protocol or firewall compatibility",
          action:
            "Keep the working method for this network and record both tests.",
          record: "Method, network, server and duration of each test.",
        },
      ],
      table: {
        symptom: "What you see",
        layer: "Check first",
        firstAction: "First safe action",
      },
    },
    fixes: {
      eyebrow: "One change at a time",
      title: "Six safe fixes",
      intro:
        "Work through these in order. Stop when a result repeats clearly; changing everything at once hides the cause.",
      labels: {
        why: "Why this matters",
        try: "Try this",
        result: "Useful result",
        limit: "What it does not prove",
      },
      items: [
        {
          title: "Measure the normal connection",
          why: "A VPN cannot repair unstable Wi-Fi, mobile data or an ISP outage.",
          try: "Turn the VPN off briefly and open a normal page or run a short speed check.",
          result: "If the normal connection also drops, fix that layer first.",
          limit:
            "One clean minute does not prove the network is always stable.",
          link: {
            href: "/guides/vpn-speed-guide",
            label: "Learn how to test VPN speed",
          },
        },
        {
          title: "Update and restart",
          why: "Old apps, operating systems and network drivers can cause reconnect loops.",
          try: "Update the VPN app and device, then restart both before the next test.",
          result:
            "A repeated stable run after the update points to an app or driver issue.",
          limit: "It does not rule out a server or network problem.",
        },
        {
          title: "Try one nearby server",
          why: "A single server or internet route can be busy or unavailable.",
          try: "Choose one nearby server and keep every other setting the same.",
          result:
            "If only the first server fails, the issue is likely limited to that route.",
          limit: "The result can change later as routes and load change.",
        },
        {
          title: "Compare documented connection methods",
          why: "Networks and firewalls do not handle every VPN method in the same way.",
          try: "Compare only methods listed by your VPN app, such as WireGuard or OpenVPN.",
          result:
            "A method that stays connected gives you a practical option for that network.",
          limit: "No connection method works on every network.",
          link: {
            href: "/guides/vpn-protocols-explained",
            label: "See VPN connection methods explained",
          },
        },
        {
          title: "Check the kill switch",
          why: "The kill switch can block internet on purpose when the VPN tunnel fails.",
          try: "Read the app's setting, reconnect and note when traffic returns.",
          result:
            "If blocking happens only after a tunnel drop, the protection may be working.",
          limit:
            "This does not explain why the tunnel dropped in the first place.",
        },
        {
          title: "Check device and firewall permissions",
          why: "Battery saving, sleep settings or a firewall can stop the VPN app in the background.",
          try: "Allow the documented background and network permissions, then repeat the same test.",
          result: "A stable repeat points to a local device setting.",
          limit:
            "Do not disable security software permanently just to keep a VPN online.",
          link: {
            href: "/guides/vpn-on-mobile",
            label: "Check mobile VPN setup",
          },
        },
      ],
    },
    devices: {
      eyebrow: "Keep it connected",
      title: "Checks by device",
      intro:
        "Names differ by device and app version. Use these as places to look, then follow the current instructions from your operating system and VPN app.",
      items: [
        {
          title: "iPhone and iPad",
          checks: [
            "Wi-Fi to mobile-data handoff",
            "Background and cellular access",
            "Sleep and wake behaviour",
          ],
          link: { href: "/best/vpn-iphone", label: "iPhone setup guide" },
        },
        {
          title: "Android",
          checks: [
            "Battery optimisation",
            "Background activity",
            "Always-on VPN setting",
          ],
          link: { href: "/best/vpn-android", label: "Android setup guide" },
        },
        {
          title: "Windows",
          checks: [
            "VPN app and network driver",
            "Firewall permissions",
            "Sleep and network changes",
          ],
          link: { href: "/best/vpn-windows", label: "Windows setup guide" },
        },
        {
          title: "macOS",
          checks: [
            "VPN network extension",
            "Firewall permissions",
            "Wake from sleep",
          ],
          link: { href: "/best/vpn-macos", label: "macOS setup guide" },
        },
        {
          title: "Router or network",
          checks: [
            "Router restart and firmware",
            "Wi-Fi band stability",
            "A second network for comparison",
          ],
          link: {
            href: "/guides/public-wifi-safety",
            label: "Public Wi-Fi safety guide",
          },
        },
      ],
    },
    evidence: {
      eyebrow: "Make the problem repeatable",
      title: "Record a result that support can use",
      intro:
        "A short, clear record is more useful than saying the VPN drops randomly. Never include passwords, private keys or account tokens.",
      cards: [
        {
          title: "Normal connection",
          body: "Note whether the internet fails with the VPN switched off.",
          status: "Start here",
        },
        {
          title: "Same setup, one change",
          body: "Keep the device and network the same while changing one server or method.",
          status: "Comparable",
        },
        {
          title: "Repeat the result",
          body: "A failure that repeats on another network or device is easier to escalate.",
          status: "Stronger evidence",
        },
      ],
      logTitle: "Example test log",
      logIntro:
        "Copy the checklist or download a blank CSV. Fill it in locally; ZeroToVPN does not receive the file.",
      headers: [
        "Date/time",
        "Device",
        "Network",
        "Server",
        "Method",
        "Kill switch",
        "Symptom",
        "Result",
      ],
      rows: [
        [
          "16 Aug, 14:30",
          "Laptop",
          "Home Wi-Fi",
          "Nearby server A",
          "WireGuard",
          "On",
          "Drops after sleep",
          "Repeated",
        ],
        [
          "16 Aug, 14:45",
          "Laptop",
          "Home Wi-Fi",
          "Nearby server A",
          "OpenVPN UDP",
          "On",
          "No drop in 15 min",
          "Not repeated",
        ],
      ],
      copyAction: "Copy test checklist",
      downloadAction: "Download blank test log",
      copied: "Checklist copied",
      note: "One good or bad run is not a universal verdict about a VPN provider.",
    },
    support: {
      eyebrow: "Know when to stop changing settings",
      title: "Contact support — or consider another VPN",
      intro:
        "Escalate only after you can describe a repeatable problem. That gives support a useful starting point and stops you from chasing random changes.",
      contactTitle: "Contact support when",
      contact: [
        "The same error repeats on more than one network.",
        "Several documented connection methods fail.",
        "The app shows an authentication or server error.",
        "You have a simple test log without sensitive data.",
      ],
      alternativesTitle: "Compare alternatives when",
      alternatives: [
        "The normal internet connection is stable.",
        "Updates, documented fixes and support do not help.",
        "The issue repeats on several devices or routes.",
        "A required feature is missing on your device.",
      ],
      comparisonLink: "Compare VPNs after troubleshooting",
      methodLink: "See how ZeroToVPN tests connections",
    },
    sources: {
      eyebrow: "Evidence and limits",
      title: "Sources and test scope",
      intro:
        "Platform and protocol documentation explains available settings and behaviour. It cannot prove that one VPN works reliably on every device or network.",
      columns: {
        claim: "Claim or check",
        source: "Source",
        checked: "Checked",
        limitation: "What it does not prove",
      },
      records: [
        {
          label: "Android VPN and Always-on settings",
          source: "Google Android Help",
          href: SHARED_SOURCES.android,
          checked: "16 Aug 2026",
          limitation:
            "Options can differ by Android version, device maker and VPN app.",
        },
        {
          label: "Windows VPN status and settings",
          source: "Microsoft Support",
          href: SHARED_SOURCES.windows,
          checked: "16 Aug 2026",
          limitation:
            "Built-in Windows guidance does not describe every commercial VPN app.",
        },
        {
          label: "WireGuard handshake and UDP transport",
          source: "WireGuard protocol documentation",
          href: SHARED_SOURCES.wireguard,
          checked: "16 Aug 2026",
          limitation:
            "Protocol design does not prove a provider's app or server is reliable.",
        },
        {
          label: "OpenVPN can use UDP or TCP",
          source: "OpenVPN community documentation",
          href: SHARED_SOURCES.openvpn,
          checked: "16 Aug 2026",
          limitation:
            "A supported mode can still be blocked or configured differently.",
        },
      ],
    },
    author: {
      title: "About the author and review",
      name: "Marvin Smit",
      role: "Founder and developer of ZeroToVPN",
      body: "Marvin is responsible for this page's source boundaries, internal test method and technical publishing. The byline does not claim a security certification or a fresh provider-wide reliability test.",
      link: "Read Marvin's author profile",
    },
    faq: {
      eyebrow: "Common questions",
      title: "VPN disconnection FAQ",
      items: [
        {
          question: "How do I stop my VPN from disconnecting?",
          answer:
            "First test the internet without the VPN. Then update the app, try one nearby server and compare one documented connection method at a time. The right fix depends on which step changes the result.",
        },
        {
          question: "Why won't my VPN stay connected?",
          answer:
            "Common causes are unstable Wi-Fi or mobile data, a network handoff, an old app, one failing server route, a blocked connection method or a kill switch blocking traffic after the tunnel drops.",
        },
        {
          question: "Why does my VPN reconnect on iPhone?",
          answer:
            "Check whether it happens when the phone moves between Wi-Fi and mobile data or wakes from sleep. Also review background and cellular access for the VPN app.",
        },
        {
          question: "Why does the VPN block my internet?",
          answer:
            "The kill switch may block traffic on purpose when the VPN tunnel is unavailable. Reconnect and check the app's documented setting before turning off protection.",
        },
        {
          question: "Can I keep a VPN connected all the time?",
          answer:
            "Always-on or auto-connect settings can help, but no setting can prevent every ISP outage, router problem, network handoff or app failure.",
        },
        {
          question: "Why does the VPN drop at random?",
          answer:
            "Random-looking drops often follow packet loss, a Wi-Fi or mobile handoff, one server route or a timeout. Record the network, server, method and exact time to find a pattern.",
        },
        {
          question: "Why does Wi-Fi fail when I turn on a VPN?",
          answer:
            "The VPN may reveal a router, firewall or compatibility problem. A kill switch may also block traffic after a failed connection. Compare one other network and one other documented connection method.",
        },
      ],
    },
    related: {
      eyebrow: "Continue troubleshooting",
      title: "More from the Journal",
      items: [
        {
          href: "/guides/vpn-protocols-explained",
          title: "VPN connection methods explained",
          body: "Understand WireGuard, OpenVPN and when a different method can help.",
        },
        {
          href: "/guides/vpn-speed-guide",
          title: "Why VPN speed changes",
          body: "Separate the normal connection, server route and VPN overhead.",
        },
        {
          href: "/blog/vpn-leak-testing-tools-compared-2026",
          title: "Test for IP, DNS and WebRTC leaks",
          body: "Run simple checks and understand what one clean result cannot prove.",
        },
        {
          href: "/guides/vpn-on-mobile",
          title: "Set up a VPN on mobile",
          body: "Check permissions, network handoffs and device settings.",
        },
      ],
    },
    newsletter: {
      eyebrow: "The troubleshooting brief",
      title: "Get useful VPN test updates",
      body: "One clear email every two weeks with new troubleshooting notes and independent test updates.",
      note: "No discounts, rewards or spam.",
    },
  },
  nl: {
    locale: "nl",
    metadata: {
      title: "Waarom verbreekt mijn VPN steeds? 6 veilige oplossingen",
      description:
        "Ontdek waarom je VPN steeds uitvalt. Test internet, app, server, verbindingstype en kill switch stap voor stap met zes veilige oplossingen.",
      imageAlt:
        "Router, laptop en telefoon met een VPN-verbinding die onderzocht moet worden",
    },
    breadcrumb: { journal: "Journal", current: "VPN valt steeds uit" },
    hero: {
      eyebrow: "Probleem oplossen · providerneutraal",
      title: "Waarom verbreekt mijn VPN steeds?",
      answer:
        "Een VPN valt meestal uit doordat de gewone internetverbinding niet stabiel is, je apparaat van netwerk wisselt, de app oud is, één serverroute faalt, een verbindingstype wordt geblokkeerd of de kill switch internet blokkeert na een storing. Test eerst internet zonder VPN. Verander daarna steeds één ding.",
      imageAlt:
        "Redactionele illustratie van een router, laptop en telefoon tijdens een VPN-verbindingsprobleem",
      imageCaption:
        "Originele illustratie van ZeroToVPN. Ze legt het probleem uit en is geen screenshot of testuitslag.",
      primaryAction: "Start de diagnose",
      secondaryAction: "Kopieer de testchecklist",
      byline: "Geschreven en gecontroleerd door Marvin Smit",
      reviewed: "Providerneutrale probleemoplossing",
      published: "Gepubliceerd op 16 februari 2026",
      updated: "Bijgewerkt op 16 augustus 2026",
      readTime: "10 minuten leestijd",
      trust: [
        "Geen betaalde plek in de diagnose",
        "Eén verandering per test",
        "Grenzen bij iedere uitkomst",
      ],
    },
    nav: [
      { href: "#quick-answer", label: "Kort antwoord" },
      { href: "#diagnose", label: "Diagnose" },
      { href: "#safe-fixes", label: "6 oplossingen" },
      { href: "#by-device", label: "Per apparaat" },
      { href: "#evidence", label: "Testlog" },
      { href: "#support", label: "Support" },
      { href: "#faq", label: "Vragen" },
      { href: "#sources", label: "Bronnen" },
    ],
    before: {
      eyebrow: "Kort antwoord",
      title: "Controleer dit voordat je een instelling wijzigt",
      intro:
        "Met deze vier controles zie je of de VPN het probleem is of dat de gewone internetverbinding al uitvalt.",
      steps: [
        {
          title: "Zet de VPN kort uit",
          body: "Open alleen een ongevaarlijke pagina terwijl de VPN uitstaat.",
        },
        {
          title: "Controleer gewoon internet",
          body: "Kijk of wifi of mobiel internet ook zonder VPN uitvalt.",
        },
        {
          title: "Schrijf de test op",
          body: "Noteer netwerk, apparaat, server, verbindingstype en tijd.",
        },
        {
          title: "Verander één ding",
          body: "Eén verandering per test maakt de uitslag bruikbaar.",
        },
      ],
      warningTitle: "Veiligheid eerst",
      warning:
        "Laat de kill switch niet uitstaan tijdens bankieren, werkaccounts of andere gevoelige diensten. Zet hem na een korte controle weer aan.",
    },
    diagnosis: {
      eyebrow: "Vind het onderdeel dat uitvalt",
      title: "Vijf vragen maken de oorzaak kleiner",
      intro:
        "Beantwoord de vragen op volgorde. Een ja-antwoord laat zien waar je eerst moet kijken, maar bewijst niet dat het hele onderdeel kapot is.",
      questions: [
        {
          question: "Valt internet ook uit zonder VPN?",
          outcome: "Gewoon netwerk, router of provider",
          action:
            "Herstart de router en test een ander netwerk voordat je VPN-instellingen wijzigt.",
          record: "Tijd, wifi-sterkte en of een tweede apparaat ook uitvalt.",
        },
        {
          question: "Valt maar één VPN-server uit?",
          outcome: "Server of route",
          action: "Test één server dichtbij in dezelfde regio.",
          record: "Oude server, nieuwe server en of de storing terugkomt.",
        },
        {
          question:
            "Gebeurt het na wisselen tussen wifi en mobiel of na slaapstand?",
          outcome: "Apparaat of achtergrondrechten",
          action:
            "Controleer achtergrondactiviteit en netwerktoegang voor de VPN-app.",
          record: "De precieze wissel of ontwaakactie die de storing start.",
        },
        {
          question: "Wordt al het verkeer geblokkeerd nadat de VPN uitvalt?",
          outcome: "Kill switch werkt misschien goed",
          action:
            "Maak opnieuw verbinding en controleer de uitleg van de kill switch in de app.",
          record: "Of internet pas terugkomt nadat de VPN weer verbonden is.",
        },
        {
          question: "Blijft een ander beschreven verbindingstype wel online?",
          outcome: "Verbindingstype of firewall",
          action:
            "Gebruik op dit netwerk tijdelijk het type dat wel stabiel blijft en noteer beide tests.",
          record: "Type, netwerk, server en duur van elke test.",
        },
      ],
      table: {
        symptom: "Wat je ziet",
        layer: "Controleer eerst",
        firstAction: "Eerste veilige stap",
      },
    },
    fixes: {
      eyebrow: "Steeds één verandering",
      title: "Zes veilige oplossingen",
      intro:
        "Werk ze op volgorde af. Stop wanneer een uitslag duidelijk terugkomt. Als je alles tegelijk wijzigt, weet je niet wat hielp.",
      labels: {
        why: "Waarom dit telt",
        try: "Probeer dit",
        result: "Nuttige uitslag",
        limit: "Wat dit niet bewijst",
      },
      items: [
        {
          title: "Meet de gewone verbinding",
          why: "Een VPN kan slechte wifi, mobiel internet of een storing bij je internetprovider niet repareren.",
          try: "Zet de VPN kort uit en open een gewone pagina of doe een korte snelheidstest.",
          result: "Valt gewoon internet ook uit? Los dat dan eerst op.",
          limit:
            "Eén goede minuut bewijst niet dat het netwerk altijd stabiel is.",
          link: {
            href: "/guides/vpn-speed-guide",
            label: "Lees hoe je VPN-snelheid test",
          },
        },
        {
          title: "Werk bij en herstart",
          why: "Oude apps, systemen en netwerkdrivers kunnen voor steeds opnieuw verbinden zorgen.",
          try: "Werk de VPN-app en het apparaat bij. Herstart ze voor de volgende test.",
          result:
            "Blijft dezelfde test daarna stabiel? Dan lag het mogelijk aan de app of driver.",
          limit: "Een server- of netwerkprobleem is daarmee niet uitgesloten.",
        },
        {
          title: "Test één server dichtbij",
          why: "Eén server of route over internet kan druk of tijdelijk onbereikbaar zijn.",
          try: "Kies één server dichtbij en laat alle andere instellingen gelijk.",
          result:
            "Werkt alleen de eerste server niet? Dan is het probleem waarschijnlijk beperkt tot die route.",
          limit: "Routes en drukte kunnen later veranderen.",
        },
        {
          title: "Vergelijk beschreven verbindingstypen",
          why: "Netwerken en firewalls behandelen niet ieder VPN-type hetzelfde.",
          try: "Vergelijk alleen typen die de app zelf noemt, zoals WireGuard of OpenVPN.",
          result:
            "Een type dat verbonden blijft is een bruikbare keuze voor dit netwerk.",
          limit: "Geen verbindingstype werkt op ieder netwerk.",
          link: {
            href: "/guides/vpn-protocols-explained",
            label: "Lees hoe VPN-verbindingstypen werken",
          },
        },
        {
          title: "Controleer de kill switch",
          why: "De kill switch kan internet expres blokkeren wanneer de VPN-verbinding wegvalt.",
          try: "Lees de instelling in de app, verbind opnieuw en noteer wanneer internet terugkomt.",
          result:
            "Blokkeert internet alleen na een VPN-storing? Dan werkt de bescherming misschien zoals bedoeld.",
          limit: "Dit verklaart nog niet waarom de VPN zelf uitviel.",
        },
        {
          title: "Controleer apparaat- en firewallrechten",
          why: "Batterijbesparing, slaapstand of een firewall kan de VPN-app op de achtergrond stoppen.",
          try: "Geef alleen de beschreven achtergrond- en netwerkrechten en herhaal dezelfde test.",
          result:
            "Een stabiele herhaling wijst op een instelling van het apparaat.",
          limit:
            "Schakel beveiligingssoftware niet blijvend uit om een VPN online te houden.",
          link: {
            href: "/guides/vpn-on-mobile",
            label: "Controleer VPN-instellingen op mobiel",
          },
        },
      ],
    },
    devices: {
      eyebrow: "Houd de verbinding actief",
      title: "Controles per apparaat",
      intro:
        "De namen verschillen per apparaat en appversie. Gebruik dit als zoekplek en volg daarna de actuele uitleg van je systeem en VPN-app.",
      items: [
        {
          title: "iPhone en iPad",
          checks: [
            "Wissel van wifi naar mobiel internet",
            "Achtergrond- en mobiele toegang",
            "Slaapstand en ontwaken",
          ],
          link: { href: "/best/vpn-iphone", label: "iPhone-handleiding" },
        },
        {
          title: "Android",
          checks: [
            "Batterijbesparing",
            "Achtergrondactiviteit",
            "Altijd-aan-VPN",
          ],
          link: { href: "/best/vpn-android", label: "Android-handleiding" },
        },
        {
          title: "Windows",
          checks: [
            "VPN-app en netwerkdriver",
            "Firewallrechten",
            "Slaapstand en netwerkwissels",
          ],
          link: { href: "/best/vpn-windows", label: "Windows-handleiding" },
        },
        {
          title: "macOS",
          checks: [
            "VPN-netwerkextensie",
            "Firewallrechten",
            "Ontwaken uit slaapstand",
          ],
          link: { href: "/best/vpn-macos", label: "macOS-handleiding" },
        },
        {
          title: "Router of netwerk",
          checks: [
            "Router herstarten en bijwerken",
            "Stabiliteit van de wifi-band",
            "Vergelijken met een tweede netwerk",
          ],
          link: {
            href: "/guides/public-wifi-safety",
            label: "Veilig gebruik van openbare wifi",
          },
        },
      ],
    },
    evidence: {
      eyebrow: "Maak het probleem herhaalbaar",
      title: "Noteer een uitslag waar support iets aan heeft",
      intro:
        "Een korte, duidelijke notitie helpt meer dan 'de VPN valt zomaar uit'. Noteer nooit wachtwoorden, privésleutels of accounttokens.",
      cards: [
        {
          title: "Gewone verbinding",
          body: "Noteer of internet ook uitvalt wanneer de VPN uitstaat.",
          status: "Begin hier",
        },
        {
          title: "Zelfde test, één verschil",
          body: "Houd apparaat en netwerk gelijk terwijl je één server of type wijzigt.",
          status: "Goed vergelijkbaar",
        },
        {
          title: "Herhaal de uitslag",
          body: "Een storing op een tweede netwerk of apparaat is makkelijker uit te leggen.",
          status: "Sterker bewijs",
        },
      ],
      logTitle: "Voorbeeld van een testlog",
      logIntro:
        "Kopieer de checklist of download een lege CSV. Je vult hem lokaal in; ZeroToVPN ontvangt het bestand niet.",
      headers: [
        "Datum/tijd",
        "Apparaat",
        "Netwerk",
        "Server",
        "Type",
        "Kill switch",
        "Probleem",
        "Uitslag",
      ],
      rows: [
        [
          "16 aug, 14:30",
          "Laptop",
          "Wifi thuis",
          "Server A dichtbij",
          "WireGuard",
          "Aan",
          "Valt uit na slaapstand",
          "Herhaald",
        ],
        [
          "16 aug, 14:45",
          "Laptop",
          "Wifi thuis",
          "Server A dichtbij",
          "OpenVPN UDP",
          "Aan",
          "15 min geen uitval",
          "Niet herhaald",
        ],
      ],
      copyAction: "Kopieer de testchecklist",
      downloadAction: "Download een leeg testlog",
      copied: "Checklist gekopieerd",
      note: "Eén goede of slechte test is geen algemeen oordeel over een VPN-aanbieder.",
    },
    support: {
      eyebrow: "Weet wanneer je moet stoppen met wijzigen",
      title: "Neem contact op met support — of vergelijk een andere VPN",
      intro:
        "Stuur het probleem door zodra je het kunt herhalen. Support krijgt dan een duidelijk beginpunt en jij hoeft niet willekeurig instellingen te blijven veranderen.",
      contactTitle: "Neem contact op met support als",
      contact: [
        "Dezelfde fout op meer dan één netwerk terugkomt.",
        "Meerdere beschreven verbindingstypen uitvallen.",
        "De app een fout over aanmelden of de server toont.",
        "Je een eenvoudig testlog zonder gevoelige gegevens hebt.",
      ],
      alternativesTitle: "Vergelijk andere VPN's als",
      alternatives: [
        "De gewone internetverbinding stabiel is.",
        "Updates, beschreven oplossingen en support niet helpen.",
        "Het probleem op meerdere apparaten of routes terugkomt.",
        "Een belangrijke functie op jouw apparaat ontbreekt.",
      ],
      comparisonLink: "Vergelijk VPN's na het onderzoeken",
      methodLink: "Bekijk hoe ZeroToVPN verbindingen test",
    },
    sources: {
      eyebrow: "Bewijs en grenzen",
      title: "Bronnen en testgrenzen",
      intro:
        "Uitleg van systemen en protocollen laat zien welke instellingen en functies bestaan. Ze bewijst niet dat één VPN op ieder apparaat en netwerk verbonden blijft.",
      columns: {
        claim: "Controle",
        source: "Bron",
        checked: "Gecontroleerd",
        limitation: "Wat dit niet bewijst",
      },
      records: [
        {
          label: "Android-VPN en Altijd-aan-instelling",
          source: "Google Android Help",
          href: SHARED_SOURCES.android,
          checked: "16 aug 2026",
          limitation:
            "Opties verschillen per Android-versie, toestelmaker en VPN-app.",
        },
        {
          label: "VPN-status en instellingen in Windows",
          source: "Microsoft Support",
          href: SHARED_SOURCES.windows,
          checked: "16 aug 2026",
          limitation:
            "De ingebouwde Windows-uitleg beschrijft niet iedere commerciële VPN-app.",
        },
        {
          label: "WireGuard-handshake en UDP-verkeer",
          source: "WireGuard-protocoldocumentatie",
          href: SHARED_SOURCES.wireguard,
          checked: "16 aug 2026",
          limitation:
            "Het ontwerp van een protocol bewijst niet dat een app of server van een provider betrouwbaar is.",
        },
        {
          label: "OpenVPN kan UDP of TCP gebruiken",
          source: "OpenVPN-communitydocumentatie",
          href: SHARED_SOURCES.openvpn,
          checked: "16 aug 2026",
          limitation:
            "Een ondersteund type kan nog steeds worden geblokkeerd of anders zijn ingesteld.",
        },
      ],
    },
    author: {
      title: "Over de auteur en controle",
      name: "Marvin Smit",
      role: "Oprichter en ontwikkelaar van ZeroToVPN",
      body: "Marvin bewaakt op deze pagina de bronstatus, testmethode en technische publicatie. Zijn naam betekent niet dat hij een beveiligingscertificaat heeft of iedere VPN-aanbieder opnieuw op betrouwbaarheid heeft getest.",
      link: "Lees het auteursprofiel van Marvin",
    },
    faq: {
      eyebrow: "Veelgestelde vragen",
      title: "Vragen over een VPN die steeds uitvalt",
      items: [
        {
          question: "Hoe voorkom ik dat mijn VPN steeds uitvalt?",
          answer:
            "Test eerst internet zonder VPN. Werk daarna de app bij, probeer één server dichtbij en vergelijk steeds één beschreven verbindingstype. De juiste oplossing is de stap die de uitslag herhaalbaar verandert.",
        },
        {
          question: "Waarom blijft mijn VPN niet verbonden?",
          answer:
            "Veelvoorkomende oorzaken zijn slechte wifi of mobiel internet, wisselen van netwerk, een oude app, één slechte serverroute, een geblokkeerd verbindingstype of de kill switch die internet blokkeert na een storing.",
        },
        {
          question: "Waarom verbindt mijn VPN op iPhone steeds opnieuw?",
          answer:
            "Kijk of het gebeurt bij wisselen tussen wifi en mobiel internet of na de slaapstand. Controleer ook achtergrond- en mobiele toegang voor de VPN-app.",
        },
        {
          question: "Waarom blokkeert de VPN mijn internet?",
          answer:
            "De kill switch kan internet expres blokkeren wanneer de VPN-verbinding wegvalt. Verbind opnieuw en lees de uitleg in de app voordat je de bescherming uitzet.",
        },
        {
          question: "Kan een VPN altijd verbonden blijven?",
          answer:
            "Altijd-aan of automatisch verbinden kan helpen. Geen instelling voorkomt iedere storing bij de internetprovider, router, netwerkwissel of app.",
        },
        {
          question: "Waarom valt mijn VPN willekeurig uit?",
          answer:
            "Willekeurige storingen volgen vaak op pakketverlies, wisselen tussen wifi en mobiel, één serverroute of een time-out. Noteer netwerk, server, type en tijd om een patroon te vinden.",
        },
        {
          question: "Waarom valt wifi uit als ik een VPN aanzet?",
          answer:
            "De VPN kan een probleem met de router, firewall of het verbindingstype zichtbaar maken. De kill switch kan ook blokkeren na een mislukte verbinding. Vergelijk één ander netwerk en één ander beschreven type.",
        },
      ],
    },
    related: {
      eyebrow: "Ga verder met onderzoeken",
      title: "Meer uit het Journal",
      items: [
        {
          href: "/guides/vpn-protocols-explained",
          title: "VPN-verbindingstypen uitgelegd",
          body: "Begrijp WireGuard, OpenVPN en wanneer een ander type kan helpen.",
        },
        {
          href: "/guides/vpn-speed-guide",
          title: "Waarom VPN-snelheid verandert",
          body: "Scheid je gewone verbinding, serverroute en extra werk van de VPN.",
        },
        {
          href: "/blog/vpn-leak-testing-tools-compared-2026",
          title: "Test op IP-, DNS- en WebRTC-lekken",
          body: "Doe eenvoudige controles en leer wat één goede uitslag niet bewijst.",
        },
        {
          href: "/guides/vpn-on-mobile",
          title: "Stel een VPN in op mobiel",
          body: "Controleer rechten, netwerkwissels en apparaatinstellingen.",
        },
      ],
    },
    newsletter: {
      eyebrow: "De probleemoplossingsbrief",
      title: "Ontvang nuttige VPN-testupdates",
      body: "Eén duidelijke e-mail per twee weken met nieuwe probleemoplossingen en onafhankelijke testupdates.",
      note: "Geen korting, beloning of spam.",
    },
  },
};

export function getConnectionDropsLocale(
  locale: string,
): ConnectionDropsLocale {
  return locale === "nl" ? "nl" : "en";
}
