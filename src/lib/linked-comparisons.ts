// De vergelijkingen die daadwerkelijk vanaf de site gelinkt worden
// (content-links.ts + PopularComparisons) en dus vooraf gerenderd zijn.
//
// Waarom dit een gedeelde lijst is: 38 VPN's leveren 703 paarsgewijze
// combinaties op. Die allemaal in de sitemap zetten nodigde Google uit om
// ~6.300 URL's te crawlen die nergens vandaan gelinkt worden en pas bij het
// eerste bezoek gerenderd worden — crawlbudget dat wegloopt naar lege pagina's.
// De sitemap adverteert daarom alleen wat hier staat; andere combinaties
// blijven bereikbaar via ISR als iemand ze handmatig intypt of ernaar linkt.
export const LINKED_COMPARISONS = [
  "nordvpn-vs-surfshark",
  "nordvpn-vs-expressvpn",
  "nordvpn-vs-cyberghost",
  "nordvpn-vs-protonvpn",
  "surfshark-vs-expressvpn",
  "surfshark-vs-cyberghost",
  "surfshark-vs-protonvpn",
  "expressvpn-vs-cyberghost",
  "protonvpn-vs-mullvad",
] as const;
