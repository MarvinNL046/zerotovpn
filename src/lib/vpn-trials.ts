/**
 * Proefperiodes per VPN, nagelezen bij de aanbieder zelf.
 *
 * Waarom dit een eigen bestand is en niet in vpn-data staat: een proefperiode
 * is iets anders dan `freeTier` (een permanent gratis abonnement) en iets
 * anders dan `moneyBackDays` (eerst betalen, daarna terugvragen). Juist die
 * drie door elkaar halen is waarom de meeste "VPN met gratis proefperiode"-
 * lijstjes niet kloppen.
 *
 * Elke regel is gecontroleerd op de pagina van de aanbieder op 25 juli 2026.
 * Twee bevindingen die afwijken van wat er elders staat:
 *
 * - Googles AI Overview meldt voor ExpressVPN een proefperiode van 7 dagen.
 *   ExpressVPN schrijft zelf 3 dagen ("a 3-day free trial on iOS and Android
 *   when you sign up through the app").
 * - Security.org en TechRadar melden voor NordVPN 7 dagen op iOS én Android.
 *   NordVPN schrijft zelf 3 dagen, alleen Android.
 *
 * Bij tegenspraak wint de aanbieder. Zet `bron` op de pagina waar het staat,
 * en `gecontroleerd` op de datum waarop dat is nagekeken — zonder die datum is
 * een claim over een proefperiode niets waard.
 */
export interface VpnTrial {
  /** slug uit vpn-data */
  slug: string;
  /** Aantal dagen; null als er geen echte proefperiode is. */
  dagen: number | null;
  /** Waar de proefperiode geldt. */
  platforms: string[];
  /** Moeten er betaalgegevens ingevuld worden vóór de proefperiode start? */
  betaalgegevensNodig: boolean;
  /** Voorwaarde of beperking die de aanbieder zelf noemt. */
  voorwaarde?: string;
  moneyBackDagen: number;
  bron: string;
  gecontroleerd: string;
}

export const VPN_TRIALS: VpnTrial[] = [
  {
    slug: "surfshark",
    dagen: 7,
    platforms: ["Windows", "macOS", "Android", "iOS", "smart-tv"],
    betaalgegevensNodig: true,
    voorwaarde: "Alleen op de 12- en 24-maandsplannen; $0,00 vooraf, opzegbaar binnen de 7 dagen.",
    moneyBackDagen: 30,
    bron: "https://surfshark.com/vpn-free-trial",
    gecontroleerd: "2026-07-25",
  },
  {
    slug: "cyberghost",
    dagen: 1,
    platforms: ["Windows", "macOS"],
    betaalgegevensNodig: false,
    voorwaarde:
      "24 uur op desktop zonder betaalgegevens. Op mobiel 3 dagen (Android) en 7 dagen (iOS), maar daar eist de appstore wél een betaalmethode.",
    moneyBackDagen: 45,
    bron: "https://www.cyberghostvpn.com/vpn-free-trial",
    gecontroleerd: "2026-07-25",
  },
  {
    slug: "expressvpn",
    dagen: 3,
    platforms: ["Android", "iOS"],
    betaalgegevensNodig: true,
    voorwaarde:
      "Alleen via de App Store of Google Play. Een aankoop via de appstore valt buiten de 30 dagen geld terug — daar gelden de regels van Apple of Google.",
    moneyBackDagen: 30,
    bron: "https://www.expressvpn.com/features/vpn-trial",
    gecontroleerd: "2026-07-25",
  },
  {
    slug: "nordvpn",
    dagen: 3,
    platforms: ["Android"],
    betaalgegevensNodig: true,
    voorwaarde: "Alleen via Google Play; op andere platforms is er geen proefperiode.",
    moneyBackDagen: 30,
    bron: "https://nordvpn.com/risk-free-vpn/",
    gecontroleerd: "2026-07-25",
  },
];

/** VPN's zonder proefperiode maar met een permanent gratis abonnement — een
 *  ander product, en voor "eerst proberen" vaak de betere keuze. */
export const GRATIS_ABONNEMENT = ["protonvpn", "windscribe", "hideme", "tunnelbear"];
