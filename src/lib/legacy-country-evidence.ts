import type { Metadata } from "next";

import { createEvidenceFirstMetadata } from "@/lib/evidence-first-route";

type LocalizedCountryName = {
  en: string;
  nl: string;
};

type LegacyCountryEvidenceContent = {
  title: string;
  description: string;
  subject: string;
  sectionLabel: string;
  notes: readonly string[];
};

const countryNames: Record<string, LocalizedCountryName> = {
  argentina: { en: "Argentina", nl: "Argentinië" },
  australia: { en: "Australia", nl: "Australië" },
  austria: { en: "Austria", nl: "Oostenrijk" },
  bangladesh: { en: "Bangladesh", nl: "Bangladesh" },
  belgium: { en: "Belgium", nl: "België" },
  brazil: { en: "Brazil", nl: "Brazilië" },
  cambodia: { en: "Cambodia", nl: "Cambodja" },
  canada: { en: "Canada", nl: "Canada" },
  china: { en: "China", nl: "China" },
  colombia: { en: "Colombia", nl: "Colombia" },
  "czech-republic": { en: "the Czech Republic", nl: "Tsjechië" },
  denmark: { en: "Denmark", nl: "Denemarken" },
  egypt: { en: "Egypt", nl: "Egypte" },
  finland: { en: "Finland", nl: "Finland" },
  france: { en: "France", nl: "Frankrijk" },
  germany: { en: "Germany", nl: "Duitsland" },
  greece: { en: "Greece", nl: "Griekenland" },
  "hong-kong": { en: "Hong Kong", nl: "Hongkong" },
  hungary: { en: "Hungary", nl: "Hongarije" },
  india: { en: "India", nl: "India" },
  indonesia: { en: "Indonesia", nl: "Indonesië" },
  israel: { en: "Israel", nl: "Israël" },
  italy: { en: "Italy", nl: "Italië" },
  japan: { en: "Japan", nl: "Japan" },
  kazakhstan: { en: "Kazakhstan", nl: "Kazachstan" },
  kenya: { en: "Kenya", nl: "Kenia" },
  malaysia: { en: "Malaysia", nl: "Maleisië" },
  mexico: { en: "Mexico", nl: "Mexico" },
  myanmar: { en: "Myanmar", nl: "Myanmar" },
  nepal: { en: "Nepal", nl: "Nepal" },
  "new-zealand": { en: "New Zealand", nl: "Nieuw-Zeeland" },
  nigeria: { en: "Nigeria", nl: "Nigeria" },
  norway: { en: "Norway", nl: "Noorwegen" },
  pakistan: { en: "Pakistan", nl: "Pakistan" },
  philippines: { en: "the Philippines", nl: "de Filipijnen" },
  poland: { en: "Poland", nl: "Polen" },
  portugal: { en: "Portugal", nl: "Portugal" },
  romania: { en: "Romania", nl: "Roemenië" },
  russia: { en: "Russia", nl: "Rusland" },
  "saudi-arabia": { en: "Saudi Arabia", nl: "Saoedi-Arabië" },
  singapore: { en: "Singapore", nl: "Singapore" },
  "south-africa": { en: "South Africa", nl: "Zuid-Afrika" },
  "south-korea": { en: "South Korea", nl: "Zuid-Korea" },
  spain: { en: "Spain", nl: "Spanje" },
  "sri-lanka": { en: "Sri Lanka", nl: "Sri Lanka" },
  sweden: { en: "Sweden", nl: "Zweden" },
  switzerland: { en: "Switzerland", nl: "Zwitserland" },
  taiwan: { en: "Taiwan", nl: "Taiwan" },
  thailand: { en: "Thailand", nl: "Thailand" },
  turkey: { en: "Turkey", nl: "Turkije" },
  uae: {
    en: "the United Arab Emirates",
    nl: "de Verenigde Arabische Emiraten",
  },
  ukraine: { en: "Ukraine", nl: "Oekraïne" },
  "united-kingdom": { en: "the United Kingdom", nl: "het Verenigd Koninkrijk" },
  "united-states": { en: "the United States", nl: "de Verenigde Staten" },
  uzbekistan: { en: "Uzbekistan", nl: "Oezbekistan" },
  vietnam: { en: "Vietnam", nl: "Vietnam" },
};

function getCountryName(slug: string, fallbackName: string, locale: string) {
  const names = countryNames[slug];
  if (!names) {
    return fallbackName;
  }

  return locale === "nl" ? names.nl : names.en;
}

export function getLegacyCountryEvidenceContent(
  locale: string,
  slug: string,
  fallbackName: string,
): LegacyCountryEvidenceContent {
  const countryName = getCountryName(slug, fallbackName, locale);

  if (locale === "nl") {
    return {
      title: `VPN voor ${countryName}: wat je controleert vóór je verbindt`,
      description: `Beoordeel VPN-gebruik in ${countryName} met een controlelijst op basis van bronnen. We publiceren geen winnaar, actuele prijs of verbindingsgarantie zolang het bewijs niet opnieuw is gecontroleerd.`,
      subject: `VPN-gebruik in ${countryName}`,
      sectionLabel: "Landengidsen",
      notes: [
        `Netwerktoegang en appbeschikbaarheid in ${countryName} kunnen per locatie, aanbieder en datum verschillen.`,
        "Controleer lokale regels en installeer benodigde apps voordat je ervan afhankelijk bent.",
      ],
    };
  }

  return {
    title: `VPN for ${countryName}: what to verify before connecting`,
    description: `Assess VPN use in ${countryName} with a source-led checklist. We do not publish a winner, live price or connection guarantee until the evidence has been reviewed again.`,
    subject: `VPN use in ${countryName}`,
    sectionLabel: "Country guides",
    notes: [
      `Network access and app availability in ${countryName} can vary by location, provider and date.`,
      "Check local rules and install any required apps before you depend on them.",
    ],
  };
}

export function createLegacyCountryEvidenceMetadata(
  locale: string,
  slug: string,
  fallbackName: string,
): Metadata {
  const content = getLegacyCountryEvidenceContent(locale, slug, fallbackName);

  return createEvidenceFirstMetadata({
    locale,
    path: `/countries/${slug}`,
    title: content.title,
    description: content.description,
  });
}
