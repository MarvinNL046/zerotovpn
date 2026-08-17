export type JournalTopic =
  | "privacy-security"
  | "censorship-access"
  | "apps-devices"
  | "speed-troubleshooting"
  | "tests-evidence"
  | "industry-policy";

export type JournalStory = {
  slug: string;
  topic: JournalTopic;
  contentType:
    | "analysis"
    | "explainer"
    | "guide"
    | "policy"
    | "research"
    | "troubleshooting";
  eyebrow: string;
  title: string;
  excerpt: string;
};

export type JournalCopy = {
  locale: string;
  contentLocale: "en" | "nl";
  isFallback: boolean;
  metadata: {
    title: string;
    description: string;
    imageAlt: string;
  };
  masthead: {
    eyebrow: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    browseTopics: string;
    rss: string;
  };
  navigation: Array<{ topic: JournalTopic | "latest"; label: string }>;
  topics: Record<JournalTopic, { label: string; description: string }>;
  sections: {
    lead: string;
    editorsPicks: string;
    secondary: string;
    check: {
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: string;
      secondaryAction: string;
    };
    latest: string;
    deepReads: string;
    exploreTopics: string;
    archive: string;
    archiveDescription: string;
    availableInEnglish: string;
    availableInEnglishDescription: string;
  };
  story: {
    read: string;
    updated: string;
    minutes: (minutes: number) => string;
  };
  archive: {
    searchLabel: string;
    searchPlaceholder: string;
    topicLabel: string;
    allTopics: string;
    sortLabel: string;
    newest: string;
    recentlyUpdated: string;
    resultCount: (count: number) => string;
    emptyTitle: string;
    emptyDescription: string;
    previous: string;
    next: string;
    page: (page: number, total: number) => string;
  };
  newsletter: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    consent: string;
  };
  knowledge: {
    title: string;
    items: Array<{ href: string; label: string; description: string }>;
  };
};

export type JournalMedia = {
  src: string;
  alt: Record<"en" | "nl", string>;
  kind: "editorial" | "explainer";
  focalPoint: string;
  caption?: Record<"en" | "nl", string>;
};

export type BlogOverviewCuration = {
  locale: string;
  contentLocale: "en" | "nl";
  isFallback: boolean;
  lead: JournalStory;
  secondary: JournalStory[];
  editorsPicks: JournalStory[];
  latest: JournalStory[];
  deepReads: JournalStory[];
};

export type JournalPostLike = {
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  tags?: readonly string[] | null;
};

const EN_COPY: JournalCopy = {
  locale: "en",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "VPN News, Privacy Research & Practical Guides | ZeroToVPN",
    description:
      "Read clear VPN news, privacy explainers and practical fixes for blocked networks, apps, devices and connection problems.",
    imageAlt:
      "ZeroToVPN Journal with VPN research, privacy explainers and practical guides",
  },
  masthead: {
    eyebrow: "ZeroToVPN Journal",
    title: "VPN news, privacy research and practical fixes",
    description:
      "Clear answers about VPNs, privacy and blocked networks. Learn what matters and what you can do next.",
    searchLabel: "Search the Journal",
    searchPlaceholder: "Search guides and research",
    browseTopics: "Browse topics",
    rss: "RSS feed",
  },
  navigation: [
    { topic: "latest", label: "Latest" },
    { topic: "privacy-security", label: "Privacy & security" },
    { topic: "censorship-access", label: "Censorship & access" },
    { topic: "apps-devices", label: "Apps & devices" },
    { topic: "speed-troubleshooting", label: "Speed & fixes" },
    { topic: "tests-evidence", label: "Tests & evidence" },
    { topic: "industry-policy", label: "Industry & policy" },
  ],
  topics: {
    "privacy-security": {
      label: "Privacy & security",
      description:
        "What a VPN protects, what stays visible and how to reduce common risks.",
    },
    "censorship-access": {
      label: "Censorship & access",
      description:
        "Careful guidance for blocked services and restricted networks.",
    },
    "apps-devices": {
      label: "Apps & devices",
      description:
        "Set up and use VPNs on phones, computers, browsers, routers and TVs.",
    },
    "speed-troubleshooting": {
      label: "Speed & fixes",
      description:
        "Find the cause of slow speeds, dropped connections and setup problems.",
    },
    "tests-evidence": {
      label: "Tests & evidence",
      description:
        "Repeatable checks for leaks, performance, provider claims and privacy reports.",
    },
    "industry-policy": {
      label: "Industry & policy",
      description:
        "Ownership, laws, terms and changes that can affect a VPN service.",
    },
  },
  sections: {
    lead: "Start here",
    editorsPicks: "Editor’s picks",
    secondary: "Worth reading",
    check: {
      eyebrow: "Guided check",
      title: "See what this browser route reveals",
      description:
        "The built-in check shows the public route used by this browser and explains its limits. It does not measure the DNS resolver. A clearly labelled external step is needed for that.",
      primaryAction: "Open the guided route check",
      secondaryAction: "See how we test",
    },
    latest: "Latest stories",
    deepReads: "Deep reads",
    exploreTopics: "Explore by topic",
    archive: "Search the Journal",
    archiveDescription:
      "Search the reviewed archive or choose a topic. Use the numbered pages to browse everything.",
    availableInEnglish: "More articles in English",
    availableInEnglishDescription:
      "These stories are not translated yet and open on the English page.",
  },
  story: {
    read: "Read story",
    updated: "Updated",
    minutes: (minutes) => `${minutes} min read`,
  },
  archive: {
    searchLabel: "Search articles",
    searchPlaceholder: "Try ‘DNS leak’ or ‘Android’",
    topicLabel: "Topic",
    allTopics: "All topics",
    sortLabel: "Sort",
    newest: "Newest first",
    recentlyUpdated: "Recently updated",
    resultCount: (count) => `${count} ${count === 1 ? "article" : "articles"}`,
    emptyTitle: "No articles found",
    emptyDescription: "Try a shorter search or choose another topic.",
    previous: "Previous",
    next: "Next",
    page: (page, total) => `Page ${page} of ${total}`,
  },
  newsletter: {
    eyebrow: "The Privacy Brief",
    title: "Useful VPN and privacy updates",
    description:
      "One clear update every two weeks. No discounts, rewards or spam.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submit: "Subscribe",
    consent: "You can unsubscribe at any time.",
  },
  knowledge: {
    title: "Explore ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPN basics",
        description: "Learn what a VPN does and does not hide.",
      },
      {
        href: "/reviews",
        label: "Reviews",
        description: "Read our independent provider reviews.",
      },
      {
        href: "/best/best-vpn",
        label: "Best VPNs",
        description: "Compare options for a specific need.",
      },
      {
        href: "/countries",
        label: "Countries",
        description: "Check access, laws and privacy risks by country.",
      },
      {
        href: "/tools",
        label: "Tools",
        description: "Use practical privacy and connection checks.",
      },
      {
        href: "/methodology",
        label: "How we test",
        description: "See how we review claims and record results.",
      },
    ],
  },
};

const NL_COPY: JournalCopy = {
  locale: "nl",
  contentLocale: "nl",
  isFallback: false,
  metadata: {
    title: "VPN-nieuws, privacy en praktische tips | ZeroToVPN",
    description:
      "Lees duidelijk VPN-nieuws, privacy-uitleg en praktische oplossingen. Onafhankelijke artikelen van ZeroToVPN, zonder technische omwegen.",
    imageAlt:
      "ZeroToVPN Journal met VPN-onderzoek, privacy-uitleg en praktische gidsen",
  },
  masthead: {
    eyebrow: "ZeroToVPN Journal",
    title: "VPN-nieuws, privacy en praktische oplossingen",
    description:
      "Duidelijke uitleg over VPN’s, online privacy en geblokkeerde netwerken. Lees wat er speelt en wat je zelf kunt doen.",
    searchLabel: "Zoek in het Journal",
    searchPlaceholder: "Zoek gidsen en onderzoek",
    browseTopics: "Bekijk onderwerpen",
    rss: "RSS-feed",
  },
  navigation: [
    { topic: "latest", label: "Nieuw" },
    { topic: "privacy-security", label: "Privacy en beveiliging" },
    { topic: "censorship-access", label: "Censuur en toegang" },
    { topic: "apps-devices", label: "Apps en apparaten" },
    { topic: "speed-troubleshooting", label: "Snelheid en oplossingen" },
    { topic: "tests-evidence", label: "Tests en bewijs" },
    { topic: "industry-policy", label: "Bedrijven en beleid" },
  ],
  topics: {
    "privacy-security": {
      label: "Privacy en beveiliging",
      description:
        "Wat een VPN beschermt, wat zichtbaar blijft en hoe je risico’s beperkt.",
    },
    "censorship-access": {
      label: "Censuur en toegang",
      description:
        "Voorzichtige uitleg over geblokkeerde diensten en beperkte netwerken.",
    },
    "apps-devices": {
      label: "Apps en apparaten",
      description:
        "Gebruik een VPN op telefoons, computers, browsers, routers en tv’s.",
    },
    "speed-troubleshooting": {
      label: "Snelheid en oplossingen",
      description:
        "Vind de oorzaak van lage snelheid, verbroken verbindingen en andere problemen.",
    },
    "tests-evidence": {
      label: "Tests en bewijs",
      description:
        "Herhaalbare controles voor lekken, prestaties, claims en privacyrapporten.",
    },
    "industry-policy": {
      label: "Bedrijven en beleid",
      description:
        "Eigendom, wetten, voorwaarden en veranderingen bij VPN-diensten.",
    },
  },
  sections: {
    lead: "Begin hier",
    editorsPicks: "Keuze van de redactie",
    secondary: "Ook interessant",
    check: {
      eyebrow: "Begeleide controle",
      title: "Bekijk wat deze browserroute toont",
      description:
        "De ingebouwde controle toont de openbare route van deze browser en legt de grenzen uit. Hij meet de DNS-resolver niet. Daarvoor is een duidelijk gemarkeerde externe stap nodig.",
      primaryAction: "Open de begeleide routecontrole",
      secondaryAction: "Bekijk hoe we testen",
    },
    latest: "Nieuwste artikelen",
    deepReads: "Uitgebreide artikelen",
    exploreTopics: "Bekijk per onderwerp",
    archive: "Zoek in het Journal",
    archiveDescription:
      "Zoek in het beoordeelde archief of kies een onderwerp. Met de paginanummers kun je alles bekijken.",
    availableInEnglish: "Meer artikelen in het Engels",
    availableInEnglishDescription:
      "Deze artikelen zijn nog niet vertaald en openen op de Engelse pagina.",
  },
  story: {
    read: "Lees artikel",
    updated: "Bijgewerkt",
    minutes: (minutes) => `${minutes} min leestijd`,
  },
  archive: {
    searchLabel: "Zoek artikelen",
    searchPlaceholder: "Probeer ‘DNS-lek’ of ‘Android’",
    topicLabel: "Onderwerp",
    allTopics: "Alle onderwerpen",
    sortLabel: "Sorteren",
    newest: "Nieuwste eerst",
    recentlyUpdated: "Onlangs bijgewerkt",
    resultCount: (count) => `${count} ${count === 1 ? "artikel" : "artikelen"}`,
    emptyTitle: "Geen artikelen gevonden",
    emptyDescription:
      "Probeer een kortere zoekopdracht of kies een ander onderwerp.",
    previous: "Vorige",
    next: "Volgende",
    page: (page, total) => `Pagina ${page} van ${total}`,
  },
  newsletter: {
    eyebrow: "De Privacy Brief",
    title: "Nuttige updates over VPN’s en privacy",
    description:
      "Eens per twee weken één duidelijke update. Geen kortingen, beloningen of spam.",
    emailLabel: "E-mailadres",
    emailPlaceholder: "jij@voorbeeld.nl",
    submit: "Aanmelden",
    consent: "Je kunt je op elk moment afmelden.",
  },
  knowledge: {
    title: "Ontdek ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPN-basis",
        description: "Leer wat een VPN wel en niet verbergt.",
      },
      {
        href: "/reviews",
        label: "Reviews",
        description: "Lees onze onafhankelijke reviews van aanbieders.",
      },
      {
        href: "/best/best-vpn",
        label: "Beste VPN’s",
        description: "Vergelijk opties voor een bepaald doel.",
      },
      {
        href: "/countries",
        label: "Landen",
        description: "Bekijk toegang, regels en privacyrisico’s per land.",
      },
      {
        href: "/tools",
        label: "Tools",
        description: "Gebruik praktische privacy- en verbindingstests.",
      },
      {
        href: "/methodology",
        label: "Hoe we testen",
        description: "Bekijk hoe we claims en resultaten controleren.",
      },
    ],
  },
};

const DE_COPY: JournalCopy = {
  locale: "de",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "VPN-News, Datenschutz und praktische Tipps | ZeroToVPN",
    description:
      "Lies klare VPN-News, einfache Erklärungen zum Datenschutz und praktische Hilfe für gesperrte Netze, Apps und Verbindungsprobleme.",
    imageAlt:
      "ZeroToVPN Journal mit VPN-Recherchen, Erklärungen zum Datenschutz und praktischen Ratgebern",
  },
  masthead: {
    eyebrow: "ZeroToVPN Journal",
    title: "VPN-News, Datenschutz und praktische Lösungen",
    description:
      "Klare Antworten zu VPNs, Datenschutz und gesperrten Netzen. Erfahre, was wichtig ist und was du als Nächstes tun kannst.",
    searchLabel: "Journal durchsuchen",
    searchPlaceholder: "Ratgeber und Recherchen suchen",
    browseTopics: "Themen ansehen",
    rss: "RSS-Feed",
  },
  navigation: [
    { topic: "latest", label: "Aktuell" },
    { topic: "privacy-security", label: "Datenschutz & Sicherheit" },
    { topic: "censorship-access", label: "Zensur & Zugang" },
    { topic: "apps-devices", label: "Apps & Geräte" },
    { topic: "speed-troubleshooting", label: "Geschwindigkeit & Hilfe" },
    { topic: "tests-evidence", label: "Tests & Belege" },
    { topic: "industry-policy", label: "Branche & Regeln" },
  ],
  topics: {
    "privacy-security": {
      label: "Datenschutz & Sicherheit",
      description:
        "Was ein VPN schützt, was sichtbar bleibt und wie du häufige Risiken senkst.",
    },
    "censorship-access": {
      label: "Zensur & Zugang",
      description:
        "Vorsichtige Hilfe für gesperrte Dienste und eingeschränkte Netze.",
    },
    "apps-devices": {
      label: "Apps & Geräte",
      description:
        "VPNs auf Handys, Computern, Browsern, Routern und Fernsehern einrichten und nutzen.",
    },
    "speed-troubleshooting": {
      label: "Geschwindigkeit & Hilfe",
      description:
        "Finde die Ursache für langsame Verbindungen, Abbrüche und Probleme bei der Einrichtung.",
    },
    "tests-evidence": {
      label: "Tests & Belege",
      description:
        "Wiederholbare Prüfungen für Lecks, Leistung, Anbieterangaben und Datenschutzberichte.",
    },
    "industry-policy": {
      label: "Branche & Regeln",
      description:
        "Eigentümer, Gesetze, Bedingungen und Änderungen, die einen VPN-Dienst betreffen können.",
    },
  },
  sections: {
    lead: "Hier beginnen",
    editorsPicks: "Empfehlungen der Redaktion",
    secondary: "Lesenswert",
    check: {
      eyebrow: "Geführte Prüfung",
      title: "Sieh, was diese Browserroute zeigt",
      description:
        "Die integrierte Prüfung zeigt die öffentliche Route dieses Browsers und erklärt ihre Grenzen. Sie misst nicht den DNS-Resolver. Dafür ist ein klar gekennzeichneter externer Schritt nötig.",
      primaryAction: "Geführte Routenprüfung öffnen",
      secondaryAction: "So testen wir",
    },
    latest: "Neue Artikel",
    deepReads: "Ausführliche Artikel",
    exploreTopics: "Nach Thema ansehen",
    archive: "Journal durchsuchen",
    archiveDescription:
      "Durchsuche das geprüfte Archiv oder wähle ein Thema. Mit den Seitennummern kannst du alle Artikel ansehen.",
    availableInEnglish: "Weitere Artikel auf Englisch",
    availableInEnglishDescription:
      "Diese Artikel sind noch nicht übersetzt und öffnen die englische Seite.",
  },
  story: {
    read: "Artikel lesen",
    updated: "Aktualisiert",
    minutes: (minutes) => `${minutes} Min. Lesezeit`,
  },
  archive: {
    searchLabel: "Artikel suchen",
    searchPlaceholder: "Zum Beispiel „DNS-Leck“ oder „Android“",
    topicLabel: "Thema",
    allTopics: "Alle Themen",
    sortLabel: "Sortieren",
    newest: "Neueste zuerst",
    recentlyUpdated: "Zuletzt aktualisiert",
    resultCount: (count) => `${count} ${count === 1 ? "Artikel" : "Artikel"}`,
    emptyTitle: "Keine Artikel gefunden",
    emptyDescription:
      "Versuche eine kürzere Suche oder wähle ein anderes Thema.",
    previous: "Zurück",
    next: "Weiter",
    page: (page, total) => `Seite ${page} von ${total}`,
  },
  newsletter: {
    eyebrow: "Der Privacy Brief",
    title: "Nützliche Updates zu VPNs und Datenschutz",
    description:
      "Alle zwei Wochen ein klares Update. Keine Rabatte, Belohnungen oder Spam.",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "du@beispiel.de",
    submit: "Abonnieren",
    consent: "Du kannst dich jederzeit abmelden.",
  },
  knowledge: {
    title: "ZeroToVPN entdecken",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPN-Grundlagen",
        description: "Erfahre, was ein VPN verbirgt und was nicht.",
      },
      {
        href: "/reviews",
        label: "Tests",
        description: "Lies unsere unabhängigen Tests von VPN-Anbietern.",
      },
      {
        href: "/best/best-vpn",
        label: "Beste VPNs",
        description: "Vergleiche Angebote für einen bestimmten Zweck.",
      },
      {
        href: "/countries",
        label: "Länder",
        description: "Prüfe Zugang, Gesetze und Datenschutzrisiken nach Land.",
      },
      {
        href: "/tools",
        label: "Tools",
        description: "Nutze praktische Datenschutz- und Verbindungstests.",
      },
      {
        href: "/methodology",
        label: "So testen wir",
        description: "Sieh, wie wir Angaben prüfen und Ergebnisse festhalten.",
      },
    ],
  },
};

const ES_COPY: JournalCopy = {
  locale: "es",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "Noticias de VPN, privacidad y consejos prácticos | ZeroToVPN",
    description:
      "Lee noticias claras sobre VPN, explicaciones de privacidad y soluciones prácticas para redes bloqueadas, aplicaciones y problemas de conexión.",
    imageAlt:
      "ZeroToVPN Journal con estudios sobre VPN, explicaciones de privacidad y guías prácticas",
  },
  masthead: {
    eyebrow: "ZeroToVPN Journal",
    title: "Noticias de VPN, privacidad y soluciones prácticas",
    description:
      "Respuestas claras sobre VPN, privacidad y redes bloqueadas. Aprende qué importa y qué puedes hacer ahora.",
    searchLabel: "Buscar en el Journal",
    searchPlaceholder: "Buscar guías y estudios",
    browseTopics: "Ver temas",
    rss: "Canal RSS",
  },
  navigation: [
    { topic: "latest", label: "Lo último" },
    { topic: "privacy-security", label: "Privacidad y seguridad" },
    { topic: "censorship-access", label: "Censura y acceso" },
    { topic: "apps-devices", label: "Aplicaciones y dispositivos" },
    { topic: "speed-troubleshooting", label: "Velocidad y soluciones" },
    { topic: "tests-evidence", label: "Pruebas y evidencia" },
    { topic: "industry-policy", label: "Sector y políticas" },
  ],
  topics: {
    "privacy-security": {
      label: "Privacidad y seguridad",
      description:
        "Qué protege una VPN, qué sigue visible y cómo reducir riesgos comunes.",
    },
    "censorship-access": {
      label: "Censura y acceso",
      description:
        "Guías prudentes para servicios bloqueados y redes restringidas.",
    },
    "apps-devices": {
      label: "Aplicaciones y dispositivos",
      description:
        "Configura y usa una VPN en móviles, ordenadores, navegadores, routers y televisores.",
    },
    "speed-troubleshooting": {
      label: "Velocidad y soluciones",
      description:
        "Encuentra la causa de una conexión lenta, cortes y problemas de configuración.",
    },
    "tests-evidence": {
      label: "Pruebas y evidencia",
      description:
        "Comprobaciones que puedes repetir para detectar fugas, medir el rendimiento y revisar afirmaciones.",
    },
    "industry-policy": {
      label: "Sector y políticas",
      description:
        "Propietarios, leyes, condiciones y cambios que pueden afectar a un servicio VPN.",
    },
  },
  sections: {
    lead: "Empieza aquí",
    editorsPicks: "Selección editorial",
    secondary: "También merece la pena",
    check: {
      eyebrow: "Comprobación guiada",
      title: "Mira qué muestra la ruta de este navegador",
      description:
        "La comprobación integrada muestra la ruta pública de este navegador y explica sus límites. No mide el resolver DNS. Para eso hace falta un paso externo claramente indicado.",
      primaryAction: "Abrir la comprobación guiada",
      secondaryAction: "Cómo hacemos las pruebas",
    },
    latest: "Últimos artículos",
    deepReads: "Lecturas en profundidad",
    exploreTopics: "Explorar por tema",
    archive: "Buscar en el Journal",
    archiveDescription:
      "Busca en el archivo revisado o elige un tema. Usa las páginas numeradas para ver todos los artículos.",
    availableInEnglish: "Más artículos en inglés",
    availableInEnglishDescription:
      "Estos artículos aún no están traducidos y se abren en la página en inglés.",
  },
  story: {
    read: "Leer artículo",
    updated: "Actualizado",
    minutes: (minutes) => `${minutes} min de lectura`,
  },
  archive: {
    searchLabel: "Buscar artículos",
    searchPlaceholder: "Prueba con «fuga de DNS» o «Android»",
    topicLabel: "Tema",
    allTopics: "Todos los temas",
    sortLabel: "Ordenar",
    newest: "Más recientes primero",
    recentlyUpdated: "Actualizados recientemente",
    resultCount: (count) =>
      `${count} ${count === 1 ? "artículo" : "artículos"}`,
    emptyTitle: "No se encontraron artículos",
    emptyDescription: "Prueba una búsqueda más corta o elige otro tema.",
    previous: "Anterior",
    next: "Siguiente",
    page: (page, total) => `Página ${page} de ${total}`,
  },
  newsletter: {
    eyebrow: "The Privacy Brief",
    title: "Novedades útiles sobre VPN y privacidad",
    description:
      "Una actualización clara cada dos semanas. Sin descuentos, premios ni spam.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.es",
    submit: "Suscribirme",
    consent: "Puedes cancelar la suscripción cuando quieras.",
  },
  knowledge: {
    title: "Explora ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "Conceptos básicos",
        description: "Aprende qué oculta una VPN y qué no.",
      },
      {
        href: "/reviews",
        label: "Análisis",
        description: "Lee nuestros análisis independientes de proveedores.",
      },
      {
        href: "/best/best-vpn",
        label: "Mejores VPN",
        description: "Compara opciones para una necesidad concreta.",
      },
      {
        href: "/countries",
        label: "Países",
        description:
          "Consulta el acceso, las leyes y los riesgos de privacidad por país.",
      },
      {
        href: "/tools",
        label: "Herramientas",
        description: "Usa pruebas prácticas de privacidad y conexión.",
      },
      {
        href: "/methodology",
        label: "Cómo probamos",
        description:
          "Descubre cómo revisamos afirmaciones y guardamos resultados.",
      },
    ],
  },
};

const FR_COPY: JournalCopy = {
  locale: "fr",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "Actualités VPN, vie privée et conseils pratiques | ZeroToVPN",
    description:
      "Lisez des actualités VPN claires, des explications sur la vie privée et des solutions pratiques pour les réseaux bloqués, les applications et les problèmes de connexion.",
    imageAlt:
      "ZeroToVPN Journal avec des recherches VPN, des explications sur la vie privée et des guides pratiques",
  },
  masthead: {
    eyebrow: "ZeroToVPN Journal",
    title: "Actualités VPN, vie privée et solutions pratiques",
    description:
      "Des réponses claires sur les VPN, la vie privée et les réseaux bloqués. Comprenez l’essentiel et sachez quoi faire ensuite.",
    searchLabel: "Rechercher dans le Journal",
    searchPlaceholder: "Rechercher des guides et des études",
    browseTopics: "Voir les thèmes",
    rss: "Flux RSS",
  },
  navigation: [
    { topic: "latest", label: "À la une" },
    { topic: "privacy-security", label: "Vie privée et sécurité" },
    { topic: "censorship-access", label: "Censure et accès" },
    { topic: "apps-devices", label: "Applications et appareils" },
    { topic: "speed-troubleshooting", label: "Vitesse et dépannage" },
    { topic: "tests-evidence", label: "Tests et preuves" },
    { topic: "industry-policy", label: "Secteur et règles" },
  ],
  topics: {
    "privacy-security": {
      label: "Vie privée et sécurité",
      description:
        "Ce qu’un VPN protège, ce qui reste visible et comment réduire les risques courants.",
    },
    "censorship-access": {
      label: "Censure et accès",
      description:
        "Des conseils prudents pour les services bloqués et les réseaux restreints.",
    },
    "apps-devices": {
      label: "Applications et appareils",
      description:
        "Configurez et utilisez un VPN sur téléphone, ordinateur, navigateur, routeur et téléviseur.",
    },
    "speed-troubleshooting": {
      label: "Vitesse et dépannage",
      description:
        "Trouvez la cause d’une connexion lente, de coupures ou de problèmes de réglage.",
    },
    "tests-evidence": {
      label: "Tests et preuves",
      description:
        "Des contrôles reproductibles pour les fuites, les performances, les affirmations et les rapports de confidentialité.",
    },
    "industry-policy": {
      label: "Secteur et règles",
      description:
        "Propriétaires, lois, conditions et changements qui peuvent toucher un service VPN.",
    },
  },
  sections: {
    lead: "Commencez ici",
    editorsPicks: "Choix de la rédaction",
    secondary: "À lire aussi",
    check: {
      eyebrow: "Vérification guidée",
      title: "Voyez ce que montre cette route du navigateur",
      description:
        "La vérification intégrée montre la route publique de ce navigateur et explique ses limites. Elle ne mesure pas le résolveur DNS. Cette mesure demande une étape externe clairement signalée.",
      primaryAction: "Ouvrir la vérification guidée",
      secondaryAction: "Voir notre méthode de test",
    },
    latest: "Derniers articles",
    deepReads: "Analyses approfondies",
    exploreTopics: "Explorer par thème",
    archive: "Rechercher dans le Journal",
    archiveDescription:
      "Recherchez dans les archives vérifiées ou choisissez un thème. Utilisez les pages numérotées pour tout parcourir.",
    availableInEnglish: "Plus d’articles en anglais",
    availableInEnglishDescription:
      "Ces articles ne sont pas encore traduits et s’ouvrent sur la page anglaise.",
  },
  story: {
    read: "Lire l’article",
    updated: "Mis à jour",
    minutes: (minutes) => `${minutes} min de lecture`,
  },
  archive: {
    searchLabel: "Rechercher des articles",
    searchPlaceholder: "Essayez « fuite DNS » ou « Android »",
    topicLabel: "Thème",
    allTopics: "Tous les thèmes",
    sortLabel: "Trier",
    newest: "Plus récents d’abord",
    recentlyUpdated: "Mis à jour récemment",
    resultCount: (count) => `${count} ${count === 1 ? "article" : "articles"}`,
    emptyTitle: "Aucun article trouvé",
    emptyDescription:
      "Essayez une recherche plus courte ou choisissez un autre thème.",
    previous: "Précédent",
    next: "Suivant",
    page: (page, total) => `Page ${page} sur ${total}`,
  },
  newsletter: {
    eyebrow: "The Privacy Brief",
    title: "Des nouvelles utiles sur les VPN et la vie privée",
    description:
      "Une mise à jour claire toutes les deux semaines. Sans réductions, récompenses ni spam.",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.fr",
    submit: "S’abonner",
    consent: "Vous pouvez vous désabonner à tout moment.",
  },
  knowledge: {
    title: "Explorer ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "Les bases du VPN",
        description: "Découvrez ce qu’un VPN masque et ce qu’il ne masque pas.",
      },
      {
        href: "/reviews",
        label: "Avis",
        description: "Lisez nos avis indépendants sur les fournisseurs.",
      },
      {
        href: "/best/best-vpn",
        label: "Meilleurs VPN",
        description: "Comparez les options pour un besoin précis.",
      },
      {
        href: "/countries",
        label: "Pays",
        description: "Consultez l’accès, les lois et les risques par pays.",
      },
      {
        href: "/tools",
        label: "Outils",
        description:
          "Utilisez des tests pratiques de confidentialité et de connexion.",
      },
      {
        href: "/methodology",
        label: "Comment nous testons",
        description:
          "Découvrez comment nous vérifions les affirmations et notons les résultats.",
      },
    ],
  },
};

const ZH_COPY: JournalCopy = {
  locale: "zh",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "VPN 新闻、隐私研究与实用指南 | ZeroToVPN",
    description:
      "阅读清楚易懂的 VPN 新闻、隐私说明，以及有关受限网络、应用、设备和连接问题的实用方法。",
    imageAlt: "ZeroToVPN 专栏中的 VPN 研究、隐私说明和实用指南",
  },
  masthead: {
    eyebrow: "ZeroToVPN 专栏",
    title: "VPN 新闻、隐私研究与实用解决方法",
    description:
      "用简单的语言了解 VPN、网络隐私和受限网络。看看哪些信息重要，以及你下一步可以做什么。",
    searchLabel: "搜索专栏",
    searchPlaceholder: "搜索指南和研究",
    browseTopics: "浏览主题",
    rss: "RSS 订阅",
  },
  navigation: [
    { topic: "latest", label: "最新" },
    { topic: "privacy-security", label: "隐私与安全" },
    { topic: "censorship-access", label: "网络限制与访问" },
    { topic: "apps-devices", label: "应用与设备" },
    { topic: "speed-troubleshooting", label: "速度与故障排除" },
    { topic: "tests-evidence", label: "测试与证据" },
    { topic: "industry-policy", label: "行业与政策" },
  ],
  topics: {
    "privacy-security": {
      label: "隐私与安全",
      description:
        "了解 VPN 能保护什么、哪些信息仍然可见，以及如何减少常见风险。",
    },
    "censorship-access": {
      label: "网络限制与访问",
      description: "了解如何谨慎处理被屏蔽的服务和受限网络。",
    },
    "apps-devices": {
      label: "应用与设备",
      description: "在手机、电脑、浏览器、路由器和电视上设置并使用 VPN。",
    },
    "speed-troubleshooting": {
      label: "速度与故障排除",
      description: "找出网速慢、连接中断和设置问题的原因。",
    },
    "tests-evidence": {
      label: "测试与证据",
      description: "通过可重复的检查了解泄漏、性能、服务商说法和隐私报告。",
    },
    "industry-policy": {
      label: "行业与政策",
      description: "了解所有权、法律、条款和可能影响 VPN 服务的变化。",
    },
  },
  sections: {
    lead: "从这里开始",
    editorsPicks: "编辑推荐",
    secondary: "值得一读",
    check: {
      eyebrow: "引导式检查",
      title: "查看这条浏览器网络路线显示了什么",
      description:
        "内置检查会显示此浏览器使用的公开网络路线，并说明其限制。它不会测量 DNS 解析器；这需要一个明确标注的外部步骤。",
      primaryAction: "打开引导式路线检查",
      secondaryAction: "了解我们的测试方法",
    },
    latest: "最新文章",
    deepReads: "深度文章",
    exploreTopics: "按主题浏览",
    archive: "搜索专栏",
    archiveDescription:
      "搜索已审核的文章，或选择一个主题。使用页码浏览全部内容。",
    availableInEnglish: "更多英文文章",
    availableInEnglishDescription: "这些文章尚未翻译，将打开英文页面。",
  },
  story: {
    read: "阅读文章",
    updated: "更新于",
    minutes: (minutes) => `阅读约 ${minutes} 分钟`,
  },
  archive: {
    searchLabel: "搜索文章",
    searchPlaceholder: "例如“DNS 泄漏”或“Android”",
    topicLabel: "主题",
    allTopics: "所有主题",
    sortLabel: "排序",
    newest: "最新发布",
    recentlyUpdated: "最近更新",
    resultCount: (count) => `${count} 篇文章`,
    emptyTitle: "没有找到文章",
    emptyDescription: "请缩短搜索内容，或选择其他主题。",
    previous: "上一页",
    next: "下一页",
    page: (page, total) => `第 ${page} 页，共 ${total} 页`,
  },
  newsletter: {
    eyebrow: "隐私简报",
    title: "实用的 VPN 和隐私更新",
    description: "每两周发送一次清楚易懂的更新。没有折扣、奖励或垃圾邮件。",
    emailLabel: "电子邮箱",
    emailPlaceholder: "you@example.com",
    submit: "订阅",
    consent: "你可以随时取消订阅。",
  },
  knowledge: {
    title: "探索 ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPN 基础",
        description: "了解 VPN 能隐藏什么，以及不能隐藏什么。",
      },
      {
        href: "/reviews",
        label: "评测",
        description: "阅读我们的独立 VPN 服务评测。",
      },
      {
        href: "/best/best-vpn",
        label: "最佳 VPN",
        description: "根据具体用途比较不同选择。",
      },
      {
        href: "/countries",
        label: "国家和地区",
        description: "查看不同国家和地区的访问情况、法律和隐私风险。",
      },
      {
        href: "/tools",
        label: "工具",
        description: "使用实用的隐私和连接检查工具。",
      },
      {
        href: "/methodology",
        label: "我们的测试方法",
        description: "了解我们如何检查说法并记录结果。",
      },
    ],
  },
};

const JA_COPY: JournalCopy = {
  locale: "ja",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "VPNニュース・プライバシー調査・実用ガイド | ZeroToVPN",
    description:
      "VPNニュース、プライバシーの解説、制限されたネットワークやアプリ、端末、接続問題の解決方法を分かりやすく紹介します。",
    imageAlt:
      "VPN調査、プライバシー解説、実用ガイドを掲載するZeroToVPNジャーナル",
  },
  masthead: {
    eyebrow: "ZeroToVPN ジャーナル",
    title: "VPNニュース、プライバシー調査、実用的な解決方法",
    description:
      "VPN、ネット上のプライバシー、制限されたネットワークについて分かりやすく説明します。大切な点と、次にできることを確認できます。",
    searchLabel: "ジャーナルを検索",
    searchPlaceholder: "ガイドや調査を検索",
    browseTopics: "トピックを見る",
    rss: "RSSフィード",
  },
  navigation: [
    { topic: "latest", label: "最新" },
    { topic: "privacy-security", label: "プライバシーと安全" },
    { topic: "censorship-access", label: "アクセス制限" },
    { topic: "apps-devices", label: "アプリと端末" },
    { topic: "speed-troubleshooting", label: "速度と問題解決" },
    { topic: "tests-evidence", label: "テストと根拠" },
    { topic: "industry-policy", label: "業界と方針" },
  ],
  topics: {
    "privacy-security": {
      label: "プライバシーと安全",
      description:
        "VPNが守る情報、見えるままの情報、よくあるリスクを減らす方法を説明します。",
    },
    "censorship-access": {
      label: "アクセス制限",
      description:
        "ブロックされたサービスや制限されたネットワークを安全に考えるためのガイドです。",
    },
    "apps-devices": {
      label: "アプリと端末",
      description:
        "スマートフォン、パソコン、ブラウザ、ルーター、テレビでVPNを使う方法です。",
    },
    "speed-troubleshooting": {
      label: "速度と問題解決",
      description: "速度低下、接続切れ、設定ミスの原因と直し方を確認できます。",
    },
    "tests-evidence": {
      label: "テストと根拠",
      description:
        "漏えい、性能、サービス側の説明、プライバシー報告を繰り返し確認できる方法です。",
    },
    "industry-policy": {
      label: "業界と方針",
      description:
        "運営会社、法律、利用条件、VPNサービスに影響する変更を説明します。",
    },
  },
  sections: {
    lead: "まずはこちら",
    editorsPicks: "編集部のおすすめ",
    secondary: "あわせて読みたい",
    check: {
      eyebrow: "ガイド付きチェック",
      title: "このブラウザ経路で見える情報を確認する",
      description:
        "内蔵チェックは、このブラウザが使う公開経路と確認できない範囲を示します。DNSリゾルバーは測定しません。その確認には、明示された外部手順が必要です。",
      primaryAction: "ガイド付き経路チェックを開く",
      secondaryAction: "テスト方法を見る",
    },
    latest: "最新記事",
    deepReads: "詳しい解説",
    exploreTopics: "トピックから探す",
    archive: "ジャーナルを検索",
    archiveDescription:
      "確認済みの記事を検索するか、トピックを選んでください。ページ番号からすべての記事を見られます。",
    availableInEnglish: "英語の記事をもっと見る",
    availableInEnglishDescription:
      "これらの記事はまだ翻訳されていないため、英語ページが開きます。",
  },
  story: {
    read: "記事を読む",
    updated: "更新",
    minutes: (minutes) => `読了目安 ${minutes}分`,
  },
  archive: {
    searchLabel: "記事を検索",
    searchPlaceholder: "「DNS漏えい」や「Android」など",
    topicLabel: "トピック",
    allTopics: "すべてのトピック",
    sortLabel: "並び順",
    newest: "新しい順",
    recentlyUpdated: "更新が新しい順",
    resultCount: (count) => `${count}件の記事`,
    emptyTitle: "記事が見つかりません",
    emptyDescription: "短い言葉で検索するか、別のトピックを選んでください。",
    previous: "前へ",
    next: "次へ",
    page: (page, total) => `${page} / ${total} ページ`,
  },
  newsletter: {
    eyebrow: "プライバシー・ブリーフ",
    title: "役立つVPNとプライバシーの最新情報",
    description:
      "2週間に1回、分かりやすい情報をお届けします。割引、特典、迷惑メールはありません。",
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@example.com",
    submit: "登録する",
    consent: "いつでも登録を解除できます。",
  },
  knowledge: {
    title: "ZeroToVPNをもっと見る",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPNの基本",
        description: "VPNが隠す情報と、隠さない情報を学べます。",
      },
      {
        href: "/reviews",
        label: "レビュー",
        description: "VPNサービスの独立レビューを読めます。",
      },
      {
        href: "/best/best-vpn",
        label: "おすすめVPN",
        description: "目的に合う選択肢を比べられます。",
      },
      {
        href: "/countries",
        label: "国・地域",
        description:
          "国や地域ごとのアクセス状況、法律、プライバシーの注意点を確認できます。",
      },
      {
        href: "/tools",
        label: "ツール",
        description: "プライバシーや接続状態を確認できます。",
      },
      {
        href: "/methodology",
        label: "テスト方法",
        description: "説明内容の確認方法と結果の記録方法を紹介します。",
      },
    ],
  },
};

const KO_COPY: JournalCopy = {
  locale: "ko",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "VPN 뉴스, 개인정보 연구 및 실용 가이드 | ZeroToVPN",
    description:
      "VPN 뉴스와 개인정보 설명, 제한된 네트워크, 앱, 기기, 연결 문제를 해결하는 방법을 쉽게 알아보세요.",
    imageAlt: "VPN 연구, 개인정보 설명, 실용 가이드를 제공하는 ZeroToVPN 저널",
  },
  masthead: {
    eyebrow: "ZeroToVPN 저널",
    title: "VPN 뉴스, 개인정보 연구와 실용적인 해결 방법",
    description:
      "VPN, 온라인 개인정보, 제한된 네트워크를 쉽게 설명합니다. 중요한 내용과 다음에 할 일을 확인하세요.",
    searchLabel: "저널 검색",
    searchPlaceholder: "가이드와 연구 검색",
    browseTopics: "주제 둘러보기",
    rss: "RSS 피드",
  },
  navigation: [
    { topic: "latest", label: "최신" },
    { topic: "privacy-security", label: "개인정보와 보안" },
    { topic: "censorship-access", label: "차단과 접속" },
    { topic: "apps-devices", label: "앱과 기기" },
    { topic: "speed-troubleshooting", label: "속도와 문제 해결" },
    { topic: "tests-evidence", label: "테스트와 근거" },
    { topic: "industry-policy", label: "업계와 정책" },
  ],
  topics: {
    "privacy-security": {
      label: "개인정보와 보안",
      description:
        "VPN이 보호하는 정보, 계속 보이는 정보, 흔한 위험을 줄이는 방법을 알아봅니다.",
    },
    "censorship-access": {
      label: "차단과 접속",
      description:
        "차단된 서비스와 제한된 네트워크를 안전하게 살펴보는 안내입니다.",
    },
    "apps-devices": {
      label: "앱과 기기",
      description:
        "휴대전화, 컴퓨터, 브라우저, 공유기, TV에서 VPN을 설정하고 사용합니다.",
    },
    "speed-troubleshooting": {
      label: "속도와 문제 해결",
      description:
        "느린 속도, 연결 끊김, 설정 문제의 원인과 해결 방법을 찾습니다.",
    },
    "tests-evidence": {
      label: "테스트와 근거",
      description:
        "정보 유출, 성능, 업체 설명, 개인정보 보고서를 반복해서 확인하는 방법입니다.",
    },
    "industry-policy": {
      label: "업계와 정책",
      description:
        "소유 회사, 법률, 이용 조건, VPN 서비스에 영향을 주는 변화를 설명합니다.",
    },
  },
  sections: {
    lead: "여기서 시작하세요",
    editorsPicks: "편집자 추천",
    secondary: "함께 읽을 글",
    check: {
      eyebrow: "단계별 확인",
      title: "이 브라우저 경로에 보이는 정보 확인하기",
      description:
        "내장 확인은 이 브라우저가 사용하는 공개 경로와 확인 범위를 보여 줍니다. DNS 리졸버는 측정하지 않으며, 이를 확인하려면 명확히 표시된 외부 단계가 필요합니다.",
      primaryAction: "단계별 경로 확인 열기",
      secondaryAction: "테스트 방법 보기",
    },
    latest: "최신 글",
    deepReads: "깊이 읽기",
    exploreTopics: "주제별로 보기",
    archive: "저널 검색",
    archiveDescription:
      "검토된 글을 검색하거나 주제를 선택하세요. 페이지 번호로 모든 글을 둘러볼 수 있습니다.",
    availableInEnglish: "영문 글 더 보기",
    availableInEnglishDescription:
      "아직 번역되지 않은 글이며 영어 페이지로 열립니다.",
  },
  story: {
    read: "글 읽기",
    updated: "업데이트",
    minutes: (minutes) => `약 ${minutes}분`,
  },
  archive: {
    searchLabel: "글 검색",
    searchPlaceholder: "‘DNS 유출’ 또는 ‘Android’ 검색",
    topicLabel: "주제",
    allTopics: "모든 주제",
    sortLabel: "정렬",
    newest: "최신순",
    recentlyUpdated: "최근 업데이트순",
    resultCount: (count) => `${count}개 글`,
    emptyTitle: "글을 찾지 못했습니다",
    emptyDescription: "검색어를 짧게 입력하거나 다른 주제를 선택하세요.",
    previous: "이전",
    next: "다음",
    page: (page, total) => `${total}페이지 중 ${page}페이지`,
  },
  newsletter: {
    eyebrow: "개인정보 브리핑",
    title: "도움이 되는 VPN과 개인정보 소식",
    description:
      "2주에 한 번 쉽고 유용한 소식을 보냅니다. 할인, 보상, 스팸은 없습니다.",
    emailLabel: "이메일 주소",
    emailPlaceholder: "you@example.com",
    submit: "구독하기",
    consent: "언제든지 구독을 취소할 수 있습니다.",
  },
  knowledge: {
    title: "ZeroToVPN 둘러보기",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "VPN 기본",
        description:
          "VPN이 숨길 수 있는 정보와 숨기지 못하는 정보를 알아봅니다.",
      },
      {
        href: "/reviews",
        label: "리뷰",
        description: "VPN 서비스에 대한 독립적인 리뷰를 읽어보세요.",
      },
      {
        href: "/best/best-vpn",
        label: "추천 VPN",
        description: "필요한 용도에 맞는 선택지를 비교하세요.",
      },
      {
        href: "/countries",
        label: "국가",
        description: "국가별 접속 상황, 법률, 개인정보 위험을 확인하세요.",
      },
      {
        href: "/tools",
        label: "도구",
        description: "개인정보와 연결 상태를 직접 확인하세요.",
      },
      {
        href: "/methodology",
        label: "테스트 방법",
        description: "설명을 확인하고 결과를 기록하는 방법을 알아보세요.",
      },
    ],
  },
};

const TH_COPY: JournalCopy = {
  locale: "th",
  contentLocale: "en",
  isFallback: false,
  metadata: {
    title: "ข่าว VPN งานวิจัยความเป็นส่วนตัว และคู่มือใช้งาน | ZeroToVPN",
    description:
      "อ่านข่าว VPN คำอธิบายเรื่องความเป็นส่วนตัว และวิธีแก้ปัญหาเครือข่ายที่ถูกจำกัด แอป อุปกรณ์ และการเชื่อมต่อ",
    imageAlt:
      "วารสาร ZeroToVPN ที่มีงานวิจัย VPN คำอธิบายความเป็นส่วนตัว และคู่มือใช้งาน",
  },
  masthead: {
    eyebrow: "วารสาร ZeroToVPN",
    title: "ข่าว VPN งานวิจัยความเป็นส่วนตัว และวิธีแก้ปัญหา",
    description:
      "คำอธิบายที่เข้าใจง่ายเกี่ยวกับ VPN ความเป็นส่วนตัวออนไลน์ และเครือข่ายที่ถูกจำกัด ดูว่าเรื่องใดสำคัญและคุณทำอะไรต่อได้บ้าง",
    searchLabel: "ค้นหาในวารสาร",
    searchPlaceholder: "ค้นหาคู่มือและงานวิจัย",
    browseTopics: "ดูหัวข้อ",
    rss: "ฟีด RSS",
  },
  navigation: [
    { topic: "latest", label: "ล่าสุด" },
    { topic: "privacy-security", label: "ความเป็นส่วนตัวและความปลอดภัย" },
    { topic: "censorship-access", label: "การจำกัดและการเข้าถึง" },
    { topic: "apps-devices", label: "แอปและอุปกรณ์" },
    { topic: "speed-troubleshooting", label: "ความเร็วและการแก้ปัญหา" },
    { topic: "tests-evidence", label: "การทดสอบและหลักฐาน" },
    { topic: "industry-policy", label: "ธุรกิจและนโยบาย" },
  ],
  topics: {
    "privacy-security": {
      label: "ความเป็นส่วนตัวและความปลอดภัย",
      description:
        "ดูว่า VPN ปกป้องอะไร ข้อมูลใดยังมองเห็นได้ และลดความเสี่ยงทั่วไปอย่างไร",
    },
    "censorship-access": {
      label: "การจำกัดและการเข้าถึง",
      description:
        "คำแนะนำอย่างระมัดระวังสำหรับบริการที่ถูกบล็อกและเครือข่ายที่ถูกจำกัด",
    },
    "apps-devices": {
      label: "แอปและอุปกรณ์",
      description:
        "ตั้งค่าและใช้ VPN บนโทรศัพท์ คอมพิวเตอร์ เบราว์เซอร์ เราเตอร์ และทีวี",
    },
    "speed-troubleshooting": {
      label: "ความเร็วและการแก้ปัญหา",
      description:
        "หาสาเหตุของความเร็วต่ำ การเชื่อมต่อหลุด และปัญหาในการตั้งค่า",
    },
    "tests-evidence": {
      label: "การทดสอบและหลักฐาน",
      description:
        "การตรวจสอบที่ทำซ้ำได้สำหรับข้อมูลรั่ว ประสิทธิภาพ คำอธิบายของผู้ให้บริการ และรายงานความเป็นส่วนตัว",
    },
    "industry-policy": {
      label: "ธุรกิจและนโยบาย",
      description:
        "เจ้าของบริษัท กฎหมาย เงื่อนไข และการเปลี่ยนแปลงที่อาจมีผลต่อบริการ VPN",
    },
  },
  sections: {
    lead: "เริ่มที่นี่",
    editorsPicks: "บทความที่กองบรรณาธิการเลือก",
    secondary: "เรื่องที่น่าอ่าน",
    check: {
      eyebrow: "การตรวจสอบแบบมีขั้นตอน",
      title: "ดูว่าเส้นทางของเบราว์เซอร์นี้แสดงอะไร",
      description:
        "การตรวจสอบในหน้านี้แสดงเส้นทางสาธารณะที่เบราว์เซอร์ใช้และอธิบายข้อจำกัด แต่ไม่ได้วัด DNS resolver ซึ่งต้องใช้ขั้นตอนภายนอกที่ระบุไว้อย่างชัดเจน",
      primaryAction: "เปิดการตรวจสอบเส้นทางแบบมีขั้นตอน",
      secondaryAction: "ดูวิธีที่เราทดสอบ",
    },
    latest: "บทความล่าสุด",
    deepReads: "บทความเชิงลึก",
    exploreTopics: "ดูตามหัวข้อ",
    archive: "ค้นหาในวารสาร",
    archiveDescription:
      "ค้นหาบทความที่ผ่านการตรวจสอบหรือเลือกหัวข้อ ใช้หมายเลขหน้าเพื่อดูบทความทั้งหมด",
    availableInEnglish: "บทความภาษาอังกฤษเพิ่มเติม",
    availableInEnglishDescription:
      "บทความเหล่านี้ยังไม่ได้แปลและจะเปิดเป็นหน้าภาษาอังกฤษ",
  },
  story: {
    read: "อ่านบทความ",
    updated: "อัปเดต",
    minutes: (minutes) => `อ่านประมาณ ${minutes} นาที`,
  },
  archive: {
    searchLabel: "ค้นหาบทความ",
    searchPlaceholder: "ลองค้นหา “DNS รั่ว” หรือ “Android”",
    topicLabel: "หัวข้อ",
    allTopics: "ทุกหัวข้อ",
    sortLabel: "เรียงตาม",
    newest: "ใหม่ล่าสุด",
    recentlyUpdated: "อัปเดตล่าสุด",
    resultCount: (count) => `${count} บทความ`,
    emptyTitle: "ไม่พบบทความ",
    emptyDescription: "ลองใช้คำค้นที่สั้นลงหรือเลือกหัวข้ออื่น",
    previous: "ก่อนหน้า",
    next: "ถัดไป",
    page: (page, total) => `หน้า ${page} จาก ${total}`,
  },
  newsletter: {
    eyebrow: "สรุปข่าวความเป็นส่วนตัว",
    title: "ข่าว VPN และความเป็นส่วนตัวที่มีประโยชน์",
    description:
      "รับข้อมูลที่เข้าใจง่ายหนึ่งครั้งทุกสองสัปดาห์ ไม่มีส่วนลด รางวัล หรือสแปม",
    emailLabel: "อีเมล",
    emailPlaceholder: "you@example.com",
    submit: "สมัครรับข่าว",
    consent: "คุณยกเลิกการรับข่าวได้ทุกเมื่อ",
  },
  knowledge: {
    title: "สำรวจ ZeroToVPN",
    items: [
      {
        href: "/guides/what-is-vpn",
        label: "พื้นฐาน VPN",
        description: "เรียนรู้ว่า VPN ซ่อนอะไรได้และซ่อนอะไรไม่ได้",
      },
      {
        href: "/reviews",
        label: "รีวิว",
        description: "อ่านรีวิวผู้ให้บริการ VPN ที่เป็นอิสระ",
      },
      {
        href: "/best/best-vpn",
        label: "VPN ที่เหมาะกับคุณ",
        description: "เปรียบเทียบตัวเลือกตามการใช้งานที่ต้องการ",
      },
      {
        href: "/countries",
        label: "ประเทศ",
        description:
          "ตรวจสอบการเข้าถึง กฎหมาย และความเสี่ยงด้านความเป็นส่วนตัวในแต่ละประเทศ",
      },
      {
        href: "/tools",
        label: "เครื่องมือ",
        description: "ใช้เครื่องมือตรวจสอบความเป็นส่วนตัวและการเชื่อมต่อ",
      },
      {
        href: "/methodology",
        label: "วิธีที่เราทดสอบ",
        description: "ดูวิธีตรวจสอบคำอธิบายและบันทึกผลลัพธ์",
      },
    ],
  },
};

const EN_CURATION: BlogOverviewCuration = {
  locale: "en",
  contentLocale: "en",
  isFallback: false,
  lead: {
    slug: "vpn-connection-drops-why-disconnects-how-to-fix-2026",
    topic: "speed-troubleshooting",
    contentType: "troubleshooting",
    eyebrow: "Troubleshooting",
    title: "VPN keeps disconnecting? Try these fixes first",
    excerpt:
      "Check your Wi-Fi, VPN app, protocol and kill switch in this order. You can often find the cause without changing providers.",
  },
  secondary: [
    {
      slug: "best-vpn-for-iran-2026-bypass-internet-censorship",
      topic: "censorship-access",
      contentType: "guide",
      eyebrow: "Restricted networks",
      title: "VPN access in Iran: what to check before you rely on it",
      excerpt:
        "Compare setup options, app access and clear limits before you depend on a VPN connection in Iran.",
    },
    {
      slug: "can-vpn-hide-from-isp",
      topic: "privacy-security",
      contentType: "explainer",
      eyebrow: "Privacy basics",
      title: "What can your internet provider still see?",
      excerpt:
        "A VPN hides some traffic details, but not the fact that you are connected. See where the privacy boundary sits.",
    },
    {
      slug: "vpn-leak-testing-tools-compared-2026",
      topic: "tests-evidence",
      contentType: "guide",
      eyebrow: "Practical check",
      title: "How to test your VPN for leaks",
      excerpt:
        "Check IP, DNS, WebRTC and IPv6 results without treating one green screen as proof of complete protection.",
    },
  ],
  editorsPicks: [
    {
      slug: "is-brave-vpn-free-2026",
      topic: "apps-devices",
      contentType: "explainer",
      eyebrow: "Browser privacy",
      title: "Is Brave VPN really free?",
      excerpt:
        "See what the free browser includes and what belongs to a separate VPN product.",
    },
    {
      slug: "best-vpn-for-telegram-2026",
      topic: "censorship-access",
      contentType: "guide",
      eyebrow: "Blocked services",
      title: "Telegram blocked? Check these options first",
      excerpt:
        "Separate an account problem from a network block before you change settings.",
    },
    {
      slug: "vpn-simultaneous-connections-limits-workarounds-2026",
      topic: "apps-devices",
      contentType: "explainer",
      eyebrow: "Devices",
      title: "How many devices can use one VPN?",
      excerpt:
        "Learn the difference between installed apps, active connections and router coverage.",
    },
    {
      slug: "vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "App privacy",
      title: "Fitness apps and VPNs: what stays visible",
      excerpt:
        "A VPN protects the network path, but it does not turn off GPS or health-data collection.",
    },
    {
      slug: "does-vpn-reduce-ping-gaming-2026",
      topic: "speed-troubleshooting",
      contentType: "analysis",
      eyebrow: "Gaming",
      title: "Does a VPN lower gaming ping?",
      excerpt:
        "Compare the same game route with and without a VPN before drawing a conclusion.",
    },
  ],
  latest: [
    {
      slug: "best-country-for-vpn-server-location-2026",
      topic: "speed-troubleshooting",
      contentType: "analysis",
      eyebrow: "Server choice",
      title: "Choose a VPN server for speed, privacy or access",
      excerpt:
        "A nearby server can reduce delay, but distance is not the only factor that matters.",
    },
    {
      slug: "vpn-account-sharing-safe-guide-2026",
      topic: "apps-devices",
      contentType: "explainer",
      eyebrow: "Accounts",
      title: "Can your family share one VPN account?",
      excerpt:
        "Check device limits, household rules and account security before sharing a login.",
    },
    {
      slug: "best-vpn-for-chatgpt-2026",
      topic: "privacy-security",
      contentType: "guide",
      eyebrow: "AI privacy",
      title: "What a VPN changes when you use ChatGPT",
      excerpt:
        "A VPN changes the network path, but it does not control what you type or what an account stores.",
    },
    {
      slug: "best-free-vpn-reddit-2026",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "Free VPNs",
      title: "Free VPN advice on Reddit: what to check",
      excerpt:
        "Use community comments as a starting point, then verify limits, privacy terms and app safety.",
    },
  ],
  deepReads: [
    {
      slug: "who-owns-vpn-2026-ownership-breakdown",
      topic: "industry-policy",
      contentType: "research",
      eyebrow: "Ownership",
      title: "Who owns your VPN service?",
      excerpt:
        "Look past the brand name to the parent company, related products and published privacy terms.",
    },
    {
      slug: "vpn-logging-policies-decoded-2026",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "Privacy policy",
      title: "How to read a VPN logging policy",
      excerpt:
        "Find the data a provider collects, why it is kept and how long it may remain available.",
    },
    {
      slug: "vpn-audits-independent-security-reviews-verify-claims-2026",
      topic: "tests-evidence",
      contentType: "research",
      eyebrow: "Outside reviews",
      title: "What a VPN audit can and cannot prove",
      excerpt:
        "Check the date, scope and full report before treating an audit as a permanent guarantee.",
    },
  ],
};

const NL_CURATION: BlogOverviewCuration = {
  locale: "nl",
  contentLocale: "nl",
  isFallback: false,
  lead: {
    slug: "best-vpn-for-iran-2026-bypass-internet-censorship",
    topic: "censorship-access",
    contentType: "guide",
    eyebrow: "Beperkte netwerken",
    title: "VPN gebruiken in Iran: wat moet je eerst controleren?",
    excerpt:
      "Vergelijk installatie, app-toegang en duidelijke beperkingen voordat je op een VPN-verbinding vertrouwt.",
  },
  secondary: [
    {
      slug: "vpn-kill-switch-vs-dns-leak-protection-2026",
      topic: "privacy-security",
      contentType: "explainer",
      eyebrow: "Privacy",
      title: "Kill switch of DNS-lekbescherming: wat is het verschil?",
      excerpt:
        "De twee functies lossen een ander probleem op. Bekijk wanneer je ze nodig hebt.",
    },
    {
      slug: "vpn-public-wifi-banking-shopping-security-2026",
      topic: "privacy-security",
      contentType: "guide",
      eyebrow: "Openbare wifi",
      title: "Zo bescherm je bank- en winkelverkeer op openbare wifi",
      excerpt:
        "Controleer het netwerk, gebruik veilige websites en deel zo min mogelijk gevoelige gegevens.",
    },
    {
      slug: "vpn-encryption-protocols-wireguard-openvpn-ikev2-2026",
      topic: "speed-troubleshooting",
      contentType: "explainer",
      eyebrow: "Protocollen",
      title: "WireGuard, OpenVPN of IKEv2: welk protocol kies je?",
      excerpt:
        "Vergelijk snelheid, betrouwbaarheid en ondersteuning op jouw apparaat en netwerk.",
    },
  ],
  editorsPicks: [
    {
      slug: "best-free-vpns-2026",
      topic: "privacy-security",
      contentType: "guide",
      eyebrow: "Gratis VPN’s",
      title: "Gratis VPN’s: waar moet je op letten?",
      excerpt:
        "Controleer datalimieten, privacyvoorwaarden, advertenties en appveiligheid voordat je kiest.",
    },
    {
      slug: "vpn-logging-policies-decoded-2026",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "Privacybeleid",
      title: "Zo lees je een VPN-logbeleid",
      excerpt:
        "Zoek welke gegevens worden verzameld, waarom dat gebeurt en hoelang ze worden bewaard.",
    },
    {
      slug: "vpn-remote-work-corporate-vs-consumer-2026",
      topic: "apps-devices",
      contentType: "explainer",
      eyebrow: "Thuiswerken",
      title: "Bedrijfs-VPN of gewone VPN: wat heb je nodig?",
      excerpt:
        "Een bedrijfs-VPN geeft toegang tot werk. Een gewone VPN heeft een ander doel.",
    },
    {
      slug: "vpn-split-tunneling-work-from-home-security-2026",
      topic: "apps-devices",
      contentType: "guide",
      eyebrow: "Instellingen",
      title: "Split tunneling: welke apps gaan door de VPN?",
      excerpt:
        "Kies bewust welke apps de VPN gebruiken en test of gevoelige apps goed zijn ingesteld.",
    },
    {
      slug: "vpn-credentials-theft-prevention-2026",
      topic: "privacy-security",
      contentType: "guide",
      eyebrow: "Accountbeveiliging",
      title: "Zo bescherm je het account van je VPN",
      excerpt:
        "Gebruik een uniek wachtwoord, zet extra beveiliging aan en let op valse inlogpagina’s.",
    },
  ],
  latest: [
    {
      slug: "vpn-authentication-methods-compared-2026",
      topic: "privacy-security",
      contentType: "explainer",
      eyebrow: "Inloggen",
      title: "Wachtwoord, biometrie of beveiligingssleutel?",
      excerpt:
        "Vergelijk gemak, herstelmogelijkheden en bescherming tegen accountmisbruik.",
    },
    {
      slug: "vpn-for-torrenting-safely-2026-legal-risks-protocols",
      topic: "privacy-security",
      contentType: "guide",
      eyebrow: "Bestanden delen",
      title: "Torrenting met een VPN: regels, risico’s en instellingen",
      excerpt:
        "Een VPN maakt verboden delen niet legaal. Controleer de regels en je software-instellingen.",
    },
    {
      slug: "best-free-vpn-streaming-netflix-2026",
      topic: "apps-devices",
      contentType: "guide",
      eyebrow: "Streaming",
      title: "Gratis VPN voor streaming: begrijp eerst de beperkingen",
      excerpt:
        "Gratis diensten kunnen limieten hebben voor data, snelheid, locaties en privacy.",
    },
    {
      slug: "vpn-refund-policies-money-back-guarantee-comparison-2026",
      topic: "industry-policy",
      contentType: "policy",
      eyebrow: "Voorwaarden",
      title: "Zo controleer je de terugbetalingsregels van een VPN",
      excerpt:
        "Lees de betaalperiode, uitzonderingen en aanvraagtermijn voordat je een abonnement neemt.",
    },
  ],
  deepReads: [
    {
      slug: "vpn-logging-policies-decoded-2026",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "Privacybeleid",
      title: "Welke gegevens bewaart een VPN-aanbieder?",
      excerpt:
        "Leer hoe je bewaartermijnen, doeleinden en uitzonderingen in een privacybeleid vindt.",
    },
    {
      slug: "vpn-location-spoofing-internet-speed-performance-test-2026",
      topic: "speed-troubleshooting",
      contentType: "analysis",
      eyebrow: "Snelheid",
      title: "Waarom een verre VPN-server vaak langzamer is",
      excerpt:
        "Afstand, route en serverdruk kunnen allemaal invloed hebben op snelheid en vertraging.",
    },
    {
      slug: "vpn-authentication-methods-compared-2026",
      topic: "privacy-security",
      contentType: "analysis",
      eyebrow: "Accountbeveiliging",
      title: "Veilig inloggen zonder herstel onmogelijk te maken",
      excerpt:
        "Vergelijk sterke wachtwoorden, biometrie en hardware met een bruikbaar herstelplan.",
    },
  ],
};

const MEDIA_BY_SLUG: Readonly<Record<string, JournalMedia>> = {
  "vpn-connection-drops-why-disconnects-how-to-fix-2026": {
    src: "/images/blog/journal-vpn-disconnect-lead-v1.webp",
    alt: {
      en: "Laptop showing a dropped VPN connection beside a router and connected phone",
      nl: "Laptop met een verbroken VPN-verbinding naast een router en verbonden telefoon",
    },
    kind: "editorial",
    focalPoint: "50% 50%",
  },
  "best-vpn-for-iran-2026-bypass-internet-censorship": {
    src: "/images/home/iran-tehran-editorial-card-v2.webp",
    alt: {
      en: "Editorial view of Tehran with the Milad Tower and Alborz mountains",
      nl: "Redactioneel beeld van Teheran met de Miladtoren en het Alborzgebergte",
    },
    kind: "editorial",
    focalPoint: "50% 45%",
    caption: {
      en: "ZeroToVPN editorial illustration; not a live connectivity test.",
      nl: "Redactionele illustratie van ZeroToVPN; geen live verbindingstest.",
    },
  },
};

const EXPLICIT_TOPIC_BY_SLUG: Readonly<Record<string, JournalTopic>> = {
  "best-vpn-for-iran-2026-bypass-internet-censorship": "censorship-access",
  "best-vpn-for-telegram-2026": "censorship-access",
  "can-vpn-hide-from-isp": "privacy-security",
  "does-vpn-reduce-ping-gaming-2026": "speed-troubleshooting",
  "is-brave-vpn-free-2026": "apps-devices",
  "vpn-account-sharing-safe-guide-2026": "apps-devices",
  "vpn-connection-drops-why-disconnects-how-to-fix-2026":
    "speed-troubleshooting",
  "vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy":
    "privacy-security",
  "vpn-leak-testing-tools-compared-2026": "tests-evidence",
  "vpn-simultaneous-connections-limits-workarounds-2026": "apps-devices",
  "who-owns-vpn-2026-ownership-breakdown": "industry-policy",
};

const JOURNAL_BREADCRUMBS: Readonly<
  Record<string, { home: string; journal: string }>
> = {
  en: { home: "Home", journal: "Journal" },
  nl: { home: "Start", journal: "Journal" },
  de: { home: "Startseite", journal: "Journal" },
  es: { home: "Inicio", journal: "Revista" },
  fr: { home: "Accueil", journal: "Journal" },
  zh: { home: "首页", journal: "专栏" },
  ja: { home: "ホーム", journal: "ジャーナル" },
  ko: { home: "홈", journal: "저널" },
  th: { home: "หน้าแรก", journal: "วารสาร" },
};

function normalizeLocale(locale: string): string {
  return locale.trim().toLowerCase().split(/[-_]/, 1)[0] || "en";
}

export function isJournalLocaleFullyLocalized(locale: string): boolean {
  const normalized = normalizeLocale(locale);
  // EN and NL have a fully localized article corpus and curation. The other
  // locales have localized Journal chrome but intentionally surface clearly
  // labelled English stories until their own editorial corpus is ready.
  return normalized === "en" || normalized === "nl";
}

export function getJournalBreadcrumbLabels(locale: string): {
  home: string;
  journal: string;
} {
  return JOURNAL_BREADCRUMBS[normalizeLocale(locale)] ?? JOURNAL_BREADCRUMBS.en;
}

export function getJournalCopy(locale: string): JournalCopy {
  const normalized = normalizeLocale(locale);
  if (normalized === "nl") return NL_COPY;
  if (normalized === "de") return DE_COPY;
  if (normalized === "es") return ES_COPY;
  if (normalized === "fr") return FR_COPY;
  if (normalized === "zh") return ZH_COPY;
  if (normalized === "ja") return JA_COPY;
  if (normalized === "ko") return KO_COPY;
  if (normalized === "th") return TH_COPY;
  if (normalized === "en") return EN_COPY;

  return {
    ...EN_COPY,
    locale: normalized,
    isFallback: true,
  };
}

export function getBlogOverviewCuration(locale: string): BlogOverviewCuration {
  const normalized = normalizeLocale(locale);
  if (normalized === "nl") return NL_CURATION;
  if (normalized === "en") return EN_CURATION;

  return {
    ...EN_CURATION,
    locale: normalized,
    isFallback: true,
  };
}

export function getJournalMedia(slug: string): JournalMedia | undefined {
  return MEDIA_BY_SLUG[slug];
}

export function getJournalTopic(postLike: JournalPostLike): JournalTopic {
  const slug = postLike.slug?.toLowerCase() ?? "";
  const explicitTopic = EXPLICIT_TOPIC_BY_SLUG[slug];
  if (explicitTopic) return explicitTopic;

  const haystack = [
    slug,
    postLike.title ?? "",
    postLike.category ?? "",
    ...(postLike.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (
    /(leak[ -]?test|dns[ -]?leak|webrtc|ipv6|audit|benchmark|methodology|test results?|evidence)/.test(
      haystack,
    )
  ) {
    return "tests-evidence";
  }

  if (
    /(iran|china|russia|turkey|censorship|restricted network|obfuscat|stealth mode|unblock telegram|telegram block)/.test(
      haystack,
    )
  ) {
    return "censorship-access";
  }

  if (
    /(disconnect|connection drop|reconnect|latency|ping|speed|bandwidth|packet loss|timeout|server load|slow internet|troubleshoot)/.test(
      haystack,
    )
  ) {
    return "speed-troubleshooting";
  }

  if (
    /(android|iphone|ipad|ios|macos|windows|linux|chromebook|firestick|nvidia shield|smart tv|router|browser extension|device|pfsense|app permission)/.test(
      haystack,
    )
  ) {
    return "apps-devices";
  }

  if (
    postLike.category?.toLowerCase() === "news" ||
    /(ownership|parent company|vpn industry|acquisition|subscription|refund polic|terms of service|regulation|legislation|subpoena|law enforcement|legal risks?)/.test(
      haystack,
    )
  ) {
    return "industry-policy";
  }

  return "privacy-security";
}
