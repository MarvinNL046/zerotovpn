import { getIndexableLocalesForPath } from "@/lib/indexability";

export type CountriesDirectoryLocale = "en" | "nl";

export type CountryRegion =
  | "asia"
  | "europe-eurasia"
  | "middle-east-north-africa"
  | "americas"
  | "oceania";

export type CountryDirectoryEntry = {
  slug: string;
  flag: string;
  name: string;
  routeLocale: CountriesDirectoryLocale;
  region: CountryRegion;
  regionLabel: string;
  focus: string;
  searchTerms: string[];
};

export type CountriesDirectoryCopy = {
  locale: CountriesDirectoryLocale;
  meta: { title: string; description: string };
  breadcrumb: { home: string; countries: string };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directAnswer: string;
    cues: string[];
    panelLabel: string;
    panelTitle: string;
    steps: Array<{ number: string; title: string; body: string }>;
    metrics: Array<{ value: string; label: string }>;
  };
  boundary: {
    eyebrow: string;
    title: string;
    body: string;
  };
  directory: {
    eyebrow: string;
    title: string;
    intro: string;
    searchLabel: string;
    searchPlaceholder: string;
    filters: Array<{ id: "all" | CountryRegion; label: string }>;
    resultSingular: string;
    resultPlural: string;
    orderNote: string;
    routeLabel: string;
    checkLabel: string;
    action: string;
    englishAction: string;
    clear: string;
    noResultsTitle: string;
    noResultsBody: string;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
    methodologyLabel: string;
  };
  checklist: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
    travelGuideLabel: string;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  entries: CountryDirectoryEntry[];
};

type SharedCountry = {
  slug: string;
  flag: string;
  region: CountryRegion;
  name: Record<CountriesDirectoryLocale, string>;
  focus: Record<CountriesDirectoryLocale, string>;
  aliases?: string[];
};

// This source catalog deliberately stores no legal status, blocking level or
// provider result. `getCountriesDirectoryCopy` admits a route only through the
// central indexability policy before it reaches a card or schema item.
const sharedCountries: SharedCountry[] = [
  {
    slug: "australia",
    flag: "🇦🇺",
    region: "oceania",
    name: { en: "Australia", nl: "Australië" },
    focus: {
      en: "Privacy, public Wi-Fi and access while travelling.",
      nl: "Privacy, openbare wifi en toegang tijdens het reizen.",
    },
  },
  {
    slug: "brazil",
    flag: "🇧🇷",
    region: "americas",
    name: { en: "Brazil", nl: "Brazilië" },
    focus: {
      en: "Local rules, messaging access and safer connections.",
      nl: "Lokale regels, toegang tot berichtenapps en veiliger verbinden.",
    },
  },
  {
    slug: "china",
    flag: "🇨🇳",
    region: "asia",
    name: { en: "China", nl: "China" },
    focus: {
      en: "App availability, setup before travel and changing network access.",
      nl: "Beschikbaarheid van apps, installatie vóór vertrek en wisselende toegang.",
    },
  },
  {
    slug: "egypt",
    flag: "🇪🇬",
    region: "middle-east-north-africa",
    name: { en: "Egypt", nl: "Egypte" },
    focus: {
      en: "Current local rules, service access and travel preparation.",
      nl: "Actuele lokale regels, toegang tot diensten en voorbereiding op reis.",
    },
  },
  {
    slug: "france",
    flag: "🇫🇷",
    region: "europe-eurasia",
    name: { en: "France", nl: "Frankrijk" },
    focus: {
      en: "Privacy, public networks and access from abroad.",
      nl: "Privacy, openbare netwerken en toegang vanuit het buitenland.",
    },
  },
  {
    slug: "germany",
    flag: "🇩🇪",
    region: "europe-eurasia",
    name: { en: "Germany", nl: "Duitsland" },
    focus: {
      en: "Privacy, public Wi-Fi and questions about file sharing.",
      nl: "Privacy, openbare wifi en vragen over bestanden delen.",
    },
  },
  {
    slug: "india",
    flag: "🇮🇳",
    region: "asia",
    name: { en: "India", nl: "India" },
    focus: {
      en: "Provider rules, server-location notes and public Wi-Fi.",
      nl: "Providerregels, serverlocaties en openbare wifi.",
    },
  },
  {
    slug: "indonesia",
    flag: "🇮🇩",
    region: "asia",
    name: { en: "Indonesia", nl: "Indonesië" },
    focus: {
      en: "Changing access, local rules and setup before travel.",
      nl: "Wisselende toegang, lokale regels en installatie vóór vertrek.",
    },
  },
  {
    slug: "iran",
    flag: "🇮🇷",
    region: "middle-east-north-africa",
    name: { en: "Iran", nl: "Iran" },
    focus: {
      en: "Personal safety, installation limits and changing network access.",
      nl: "Persoonlijke veiligheid, installatiebeperkingen en wisselende toegang.",
    },
  },
  {
    slug: "japan",
    flag: "🇯🇵",
    region: "asia",
    name: { en: "Japan", nl: "Japan" },
    focus: {
      en: "Travel setup, privacy and access to services from abroad.",
      nl: "Instellen voor je reis, privacy en toegang vanuit het buitenland.",
    },
  },
  {
    slug: "malaysia",
    flag: "🇲🇾",
    region: "asia",
    name: { en: "Malaysia", nl: "Maleisië" },
    focus: {
      en: "Current rules, service access and public-network safety.",
      nl: "Actuele regels, toegang tot diensten en veiligheid op openbare netwerken.",
    },
  },
  {
    slug: "mexico",
    flag: "🇲🇽",
    region: "americas",
    name: { en: "Mexico", nl: "Mexico" },
    focus: {
      en: "Travel connections, privacy and access to home services.",
      nl: "Verbindingen op reis, privacy en toegang tot diensten thuis.",
    },
  },
  {
    slug: "netherlands",
    flag: "🇳🇱",
    region: "europe-eurasia",
    name: { en: "Netherlands", nl: "Nederland" },
    focus: {
      en: "Privacy, public Wi-Fi and access while abroad.",
      nl: "Privacy, openbare wifi en toegang in het buitenland.",
    },
  },
  {
    slug: "pakistan",
    flag: "🇵🇰",
    region: "asia",
    name: { en: "Pakistan", nl: "Pakistan" },
    focus: {
      en: "Current rules, app access and preparation for interruptions.",
      nl: "Actuele regels, app-toegang en voorbereiding op onderbrekingen.",
    },
  },
  {
    slug: "russia",
    flag: "🇷🇺",
    region: "europe-eurasia",
    name: { en: "Russia", nl: "Rusland" },
    focus: {
      en: "Current rules, app availability and changing network access.",
      nl: "Actuele regels, beschikbaarheid van apps en wisselende toegang.",
    },
  },
  {
    slug: "saudi-arabia",
    flag: "🇸🇦",
    region: "middle-east-north-africa",
    name: { en: "Saudi Arabia", nl: "Saoedi-Arabië" },
    focus: {
      en: "Local rules, communication services and travel preparation.",
      nl: "Lokale regels, communicatiediensten en voorbereiding op reis.",
    },
  },
  {
    slug: "south-korea",
    flag: "🇰🇷",
    region: "asia",
    name: { en: "South Korea", nl: "Zuid-Korea" },
    focus: {
      en: "Privacy, fast networks and access to services from abroad.",
      nl: "Privacy, snelle netwerken en toegang vanuit het buitenland.",
    },
  },
  {
    slug: "thailand",
    flag: "🇹🇭",
    region: "asia",
    name: { en: "Thailand", nl: "Thailand" },
    focus: {
      en: "Travel setup, local rules and safer public Wi-Fi.",
      nl: "Instellen voor je reis, lokale regels en veiliger openbare wifi.",
    },
  },
  {
    slug: "turkey",
    flag: "🇹🇷",
    region: "europe-eurasia",
    name: { en: "Turkey", nl: "Turkije" },
    focus: {
      en: "Current rules, changing access and setup before travel.",
      nl: "Actuele regels, wisselende toegang en installatie vóór vertrek.",
    },
    aliases: ["Türkiye"],
  },
  {
    slug: "uae",
    flag: "🇦🇪",
    region: "middle-east-north-africa",
    name: { en: "United Arab Emirates", nl: "Verenigde Arabische Emiraten" },
    focus: {
      en: "Current local rules, communication apps and travel setup.",
      nl: "Actuele lokale regels, communicatie-apps en installatie op reis.",
    },
    aliases: ["UAE", "Dubai", "VAE"],
  },
  {
    slug: "united-kingdom",
    flag: "🇬🇧",
    region: "europe-eurasia",
    name: { en: "United Kingdom", nl: "Verenigd Koninkrijk" },
    focus: {
      en: "Privacy, public networks and access while travelling.",
      nl: "Privacy, openbare netwerken en toegang tijdens het reizen.",
    },
    aliases: ["UK", "Britain", "VK"],
  },
  {
    slug: "vietnam",
    flag: "🇻🇳",
    region: "asia",
    name: { en: "Vietnam", nl: "Vietnam" },
    focus: {
      en: "Current rules, changing access and setup before travel.",
      nl: "Actuele regels, wisselende toegang en installatie vóór vertrek.",
    },
  },
];

const regionLabels: Record<
  CountriesDirectoryLocale,
  Record<CountryRegion, string>
> = {
  en: {
    asia: "Asia",
    "europe-eurasia": "Europe & Eurasia",
    "middle-east-north-africa": "Middle East & North Africa",
    americas: "Americas",
    oceania: "Oceania",
  },
  nl: {
    asia: "Azië",
    "europe-eurasia": "Europa & Eurazië",
    "middle-east-north-africa": "Midden-Oosten & Noord-Afrika",
    americas: "Noord- en Zuid-Amerika",
    oceania: "Oceanië",
  },
};

const baseCopies: Record<
  CountriesDirectoryLocale,
  Omit<CountriesDirectoryCopy, "entries">
> = {
  en: {
    locale: "en",
    meta: {
      title: "VPN Country Guides: Rules, Access & Travel Checks",
      description:
        "Browse the available VPN country guides by region. Check changing local rules, app access and travel setup without unreliable country scores or connection guarantees.",
    },
    breadcrumb: { home: "Home", countries: "Country guides" },
    hero: {
      eyebrow: "Country guide atlas",
      title: "Check the country before you trust the connection",
      intro:
        "VPN rules, app stores and network access can change quickly. Choose a country guide, then check its date, sources and limits before you act.",
      directAnswer:
        "Start with local rules. Next, confirm that you can install and update the app. Only then test the connection on the network you will actually use.",
      cues: [
        "No country safety score",
        "No guaranteed connection claims",
        "Only live guide routes",
      ],
      panelLabel: "Three checks first",
      panelTitle: "A country page is a starting point",
      steps: [
        {
          number: "01",
          title: "Check the rule",
          body: "Use an official local source or qualified legal advice for your situation.",
        },
        {
          number: "02",
          title: "Check app access",
          body: "Make sure download, sign-in and updates are available before you depend on them.",
        },
        {
          number: "03",
          title: "Check the network",
          body: "A result on another route, device or day is not a promise for yours.",
        },
      ],
      metrics: [
        { value: "0", label: "available country guides" },
        { value: "0", label: "represented regions" },
        { value: "0", label: "guaranteed outcomes" },
      ],
    },
    boundary: {
      eyebrow: "Evidence boundary",
      title: "We do not colour a country red or green",
      body: "One label can hide the difference between law, app availability and live network access. This atlas keeps those questions separate and sends you to the full guide.",
    },
    directory: {
      eyebrow: "Explore the atlas",
      title: "Find a country guide",
      intro:
        "Search by country or use a region filter. Countries are shown alphabetically, not ranked by sales value or commission.",
      searchLabel: "Search country guides",
      searchPlaceholder: "Search a country",
      filters: [
        { id: "all", label: "All regions" },
        { id: "asia", label: "Asia" },
        { id: "europe-eurasia", label: "Europe & Eurasia" },
        {
          id: "middle-east-north-africa",
          label: "Middle East & North Africa",
        },
        { id: "americas", label: "Americas" },
        { id: "oceania", label: "Oceania" },
      ],
      resultSingular: "guide shown",
      resultPlural: "guides shown",
      orderNote: "Alphabetical order · no ranking",
      routeLabel: "Country guide",
      checkLabel: "Check the page date and sources first",
      action: "Open country guide",
      englishAction: "Open English country guide",
      clear: "Clear filters",
      noResultsTitle: "No matching guide",
      noResultsBody: "Try another country name or clear the region filter.",
    },
    method: {
      eyebrow: "Read in the right order",
      title: "Separate three different questions",
      intro:
        "A legal answer does not prove an app is available. An available app does not prove a connection works. Keep each claim inside its evidence boundary.",
      items: [
        {
          title: "1. Local rules",
          body: "Who published the rule, when was it checked and does it apply to your intended use?",
        },
        {
          title: "2. App availability",
          body: "Can you get the official app, sign in and receive security updates on your device?",
        },
        {
          title: "3. Live access",
          body: "Was the same device, route and protocol tested recently—and can you repeat the result?",
        },
      ],
      methodologyLabel: "Read our evidence method",
    },
    checklist: {
      eyebrow: "Before you travel",
      title: "Prepare a safe fallback before you need one",
      body: "Do not make one VPN app your only way to reach important information or people.",
      items: [
        "Read current local rules from an official or qualified source.",
        "Install official apps and updates before departure where appropriate.",
        "Save essential contacts, tickets and maps for offline use.",
        "Test on your own device without sharing personal results publicly.",
      ],
      travelGuideLabel: "Open the VPN travel guide",
    },
    faq: {
      title: "Country guide questions",
      items: [
        {
          question: "Can a country guide guarantee that a VPN will connect?",
          answer:
            "No. Access can differ by network, route, device, protocol and time. A dated result is useful evidence, not a permanent promise.",
        },
        {
          question: "Are VPNs legal in every country?",
          answer:
            "No single answer covers every country or every use. Rules can also change. Check a current official local source or qualified legal advice before you act.",
        },
        {
          question: "Why is there no red or green country status?",
          answer:
            "A simple colour mixes law, app access and connection results into one label. We keep those questions separate so uncertainty stays visible.",
        },
        {
          question: "What should I check before travelling?",
          answer:
            "Check current rules, official app availability, updates and a safe offline fallback. Do this before you depend on a connection.",
        },
      ],
    },
  },
  nl: {
    locale: "nl",
    meta: {
      title: "VPN-landengidsen: regels, toegang en reischecks",
      description:
        "Bekijk de beschikbare VPN-landengidsen per regio. Controleer lokale regels, app-toegang en voorbereiding zonder onbetrouwbare landenscores of verbindingsgaranties.",
    },
    breadcrumb: { home: "Start", countries: "Landengidsen" },
    hero: {
      eyebrow: "Atlas met landengidsen",
      title: "Controleer het land vóór je de verbinding vertrouwt",
      intro:
        "VPN-regels, appwinkels en netwerktoegang kunnen snel veranderen. Kies een landengids en controleer daarna datum, bronnen en beperkingen.",
      directAnswer:
        "Begin bij de lokale regels. Controleer daarna of je de app kunt installeren en bijwerken. Test pas dan de verbinding op het netwerk dat jij echt gebruikt.",
      cues: [
        "Geen veiligheidsscore per land",
        "Geen garantie op verbinding",
        "Alleen bestaande gidsroutes",
      ],
      panelLabel: "Eerst drie checks",
      panelTitle: "Een landengids is een startpunt",
      steps: [
        {
          number: "01",
          title: "Controleer de regel",
          body: "Gebruik een officiële lokale bron of passend juridisch advies voor jouw situatie.",
        },
        {
          number: "02",
          title: "Controleer app-toegang",
          body: "Zorg dat downloaden, inloggen en bijwerken lukt vóór je ervan afhankelijk bent.",
        },
        {
          number: "03",
          title: "Controleer het netwerk",
          body: "Een resultaat op een andere route, apparaat of dag is geen belofte voor jou.",
        },
      ],
      metrics: [
        { value: "0", label: "beschikbare landengidsen" },
        { value: "0", label: "vertegenwoordigde regio's" },
        { value: "0", label: "gegarandeerde uitkomsten" },
      ],
    },
    boundary: {
      eyebrow: "Grens van het bewijs",
      title: "We kleuren een land niet rood of groen",
      body: "Eén label verbergt het verschil tussen wet, app-beschikbaarheid en actuele netwerktoegang. Deze atlas houdt die vragen apart en brengt je naar de volledige gids.",
    },
    directory: {
      eyebrow: "Bekijk de atlas",
      title: "Vind een landengids",
      intro:
        "Zoek op land of gebruik een regiofilter. Landen staan alfabetisch en worden niet gerangschikt op verkoopwaarde of commissie.",
      searchLabel: "Zoek landengidsen",
      searchPlaceholder: "Zoek een land",
      filters: [
        { id: "all", label: "Alle regio's" },
        { id: "asia", label: "Azië" },
        { id: "europe-eurasia", label: "Europa & Eurazië" },
        {
          id: "middle-east-north-africa",
          label: "Midden-Oosten & Noord-Afrika",
        },
        { id: "americas", label: "Noord- en Zuid-Amerika" },
        { id: "oceania", label: "Oceanië" },
      ],
      resultSingular: "gids getoond",
      resultPlural: "gidsen getoond",
      orderNote: "Alfabetische volgorde · geen ranglijst",
      routeLabel: "Landengids",
      checkLabel: "Controleer eerst datum en bronnen",
      action: "Open landengids",
      englishAction: "Open Engelse landengids",
      clear: "Wis filters",
      noResultsTitle: "Geen passende gids",
      noResultsBody: "Probeer een andere landnaam of wis het regiofilter.",
    },
    method: {
      eyebrow: "Lees in de juiste volgorde",
      title: "Houd drie verschillende vragen uit elkaar",
      intro:
        "Een juridisch antwoord bewijst niet dat een app beschikbaar is. Een beschikbare app bewijst niet dat een verbinding werkt. Houd elke claim binnen de grens van het bewijs.",
      items: [
        {
          title: "1. Lokale regels",
          body: "Wie publiceerde de regel, wanneer is die gecontroleerd en geldt die voor jouw gebruik?",
        },
        {
          title: "2. Beschikbaarheid van de app",
          body: "Kun je de officiële app krijgen, inloggen en beveiligingsupdates ontvangen?",
        },
        {
          title: "3. Actuele toegang",
          body: "Is hetzelfde apparaat, dezelfde route en hetzelfde protocol recent getest en herhaalbaar?",
        },
      ],
      methodologyLabel: "Lees onze methode voor bewijs",
    },
    checklist: {
      eyebrow: "Vóór je op reis gaat",
      title: "Regel een veilige uitweg vóór je die nodig hebt",
      body: "Maak één VPN-app niet je enige manier om belangrijke informatie of mensen te bereiken.",
      items: [
        "Lees actuele lokale regels bij een officiële of deskundige bron.",
        "Installeer waar passend officiële apps en updates vóór vertrek.",
        "Bewaar belangrijke contacten, tickets en kaarten ook offline.",
        "Test op je eigen apparaat zonder persoonlijke resultaten openbaar te delen.",
      ],
      travelGuideLabel: "Open de VPN-reisgids",
    },
    faq: {
      title: "Vragen over landengidsen",
      items: [
        {
          question: "Kan een landengids garanderen dat een VPN verbindt?",
          answer:
            "Nee. Toegang verschilt per netwerk, route, apparaat, protocol en moment. Een gedateerd resultaat is nuttig bewijs, maar geen blijvende belofte.",
        },
        {
          question: "Zijn VPN's in ieder land legaal?",
          answer:
            "Eén antwoord geldt niet voor ieder land of ieder gebruik. Regels veranderen ook. Controleer vóór gebruik een actuele officiële lokale bron of passend juridisch advies.",
        },
        {
          question: "Waarom staat er geen rode of groene landenstatus?",
          answer:
            "Een simpele kleur mengt wet, app-toegang en verbindingsresultaten in één label. We houden die vragen apart zodat onzekerheid zichtbaar blijft.",
        },
        {
          question: "Wat controleer ik vóór een reis?",
          answer:
            "Controleer actuele regels, de officiële app, updates en een veilige offline uitweg. Doe dit vóór je afhankelijk bent van een verbinding.",
        },
      ],
    },
  },
};

export function isCountriesDirectoryLocale(
  locale: string,
): locale is CountriesDirectoryLocale {
  return locale === "en" || locale === "nl";
}

export function getCountriesDirectoryCopy(
  locale: string,
): CountriesDirectoryCopy {
  const selectedLocale = isCountriesDirectoryLocale(locale) ? locale : "en";
  const base = baseCopies[selectedLocale];
  const entries = sharedCountries
    .flatMap((country): CountryDirectoryEntry[] => {
      const admittedLocales =
        getIndexableLocalesForPath(`/countries/${country.slug}`) ?? [];
      const routeLocale = admittedLocales.includes(selectedLocale)
        ? selectedLocale
        : admittedLocales.includes("en")
          ? "en"
          : null;

      if (!routeLocale) return [];

      return [
        {
          slug: country.slug,
          flag: country.flag,
          name: country.name[selectedLocale],
          routeLocale,
          region: country.region,
          regionLabel: regionLabels[selectedLocale][country.region],
          focus: country.focus[selectedLocale],
          searchTerms: [
            country.name.en,
            country.name.nl,
            ...(country.aliases ?? []),
          ],
        },
      ];
    })
    .sort((left, right) =>
      left.name.localeCompare(right.name, selectedLocale, {
        sensitivity: "base",
      }),
    );

  const representedRegions = new Set(entries.map((entry) => entry.region));
  const filters = base.directory.filters.filter(
    (filter) => filter.id === "all" || representedRegions.has(filter.id),
  );

  return {
    ...base,
    meta: {
      ...base.meta,
      description:
        selectedLocale === "nl"
          ? `Bekijk ${entries.length} beschikbare VPN-landengidsen per regio. Controleer lokale regels, app-toegang en voorbereiding zonder onbetrouwbare landenscores of verbindingsgaranties.`
          : `Browse ${entries.length} available VPN country guides by region. Check changing local rules, app access and travel setup without unreliable country scores or connection guarantees.`,
    },
    hero: {
      ...base.hero,
      metrics: [
        { ...base.hero.metrics[0], value: String(entries.length) },
        { ...base.hero.metrics[1], value: String(representedRegions.size) },
        base.hero.metrics[2],
      ],
    },
    directory: { ...base.directory, filters },
    entries,
  };
}
