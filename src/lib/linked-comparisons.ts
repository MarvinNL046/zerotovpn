// De vergelijkingen die vooraf gerenderd worden en in de sitemap staan.
//
// Waarom dit een gedeelde lijst is: 38 VPN's leveren 703 paarsgewijze
// combinaties op. Die allemaal in de sitemap zetten nodigde Google uit om
// ~6.300 URL's te crawlen die nergens vandaan gelinkt worden en pas bij het
// eerste bezoek gerenderd worden — crawlbudget dat wegloopt naar lege pagina's.
// De sitemap adverteert daarom alleen wat hier staat; andere combinaties
// blijven bereikbaar via ISR als iemand ze handmatig intypt of ernaar linkt.
//
// De selectie liep tot juli 2026 op merkbekendheid. Search Console
// (25 apr – 22 jul 2026) liet zien dat precies die keuze niet werkte: de
// klassieke merkduels kregen samen NUL klikken, terwijl nichecombinaties die
// alleen via ISR bestonden wél rankten — airvpn-vs-ivpn op positie 7,5 en
// protonvpn-vs-astrill op 5,9. Voor de hand liggende duels zijn zwaar
// bevochten; obscure paren hebben nauwelijks concurrentie.
//
// Daarom staat hieronder ook alles met minstens één gemeten klik, plus twee
// zonder klik maar met veel vertoningen op een redelijke positie. Het getal
// achter elke regel is de meting waarop hij is opgenomen; die veroudert, dus
// herijk op verse GSC-data voordat je hier iets op baseert.

/** Redactionele keuze, gelinkt vanaf PopularComparisons op /compare. */
const REDACTIONEEL = [
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

/** Opgenomen op gemeten prestatie, niet op naam. */
const BEWEZEN = [
  "airvpn-vs-ivpn", //              3 klikken, 102 vertoningen, positie 7,5
  "protonvpn-vs-astrill", //        3 klikken, 90 vertoningen, positie 5,9
  "mullvad-vs-astrill", //          2 klikken, 75 vertoningen, positie 11,8
  "protonvpn-vs-hma", //            2 klikken, 72 vertoningen, positie 5,1
  "mullvad-vs-ovpn", //             2 klikken, 45 vertoningen, positie 7,7
  "expressvpn-vs-privadovpn", //    2 klikken, 22 vertoningen, positie 45,1
  "protonvpn-vs-ovpn", //           2 klikken, 8 vertoningen, positie 4,8
  "protonvpn-vs-x-vpn", //          1 klik, 198 vertoningen, positie 6,6
  "expressvpn-vs-vpn-unlimited", // 1 klik, 177 vertoningen, positie 98,6
  "mullvad-vs-airvpn", //           1 klik, 166 vertoningen, positie 10,7
  "windscribe-vs-privadovpn", //    1 klik, 81 vertoningen, positie 5,8
  "nordvpn-vs-x-vpn", //            1 klik, 68 vertoningen, positie 8,0
  "expressvpn-vs-x-vpn", //         1 klik, 58 vertoningen, positie 12,9
  "surfshark-vs-nordlayer", //      1 klik, 56 vertoningen, positie 133,0
  "surfshark-vs-strongvpn", //      1 klik, 55 vertoningen, positie 8,9
  "surfshark-vs-x-vpn", //          1 klik, 51 vertoningen, positie 6,6
  "windscribe-vs-nordlayer", //     1 klik, 42 vertoningen, positie 160,8
  "torguard-vs-airvpn", //          1 klik, 36 vertoningen, positie 6,3
  "fastestvpn-vs-vpn-unlimited", // 1 klik, 30 vertoningen, positie 7,1
  "protonvpn-vs-betternet", //      1 klik, 25 vertoningen, positie 5,9
  "surfshark-vs-urban-vpn", //      1 klik, 24 vertoningen, positie 4,9
  "urban-vpn-vs-x-vpn", //          1 klik, 21 vertoningen, positie 6,0
  "hide-me-vs-urban-vpn", //        1 klik, 20 vertoningen, positie 4,0
  "cyberghost-vs-fastestvpn", //    1 klik, 19 vertoningen, positie 26,3
  "hotspot-shield-vs-urban-vpn", // 1 klik, 16 vertoningen, positie 8,0
  "ivpn-vs-ovpn", //                1 klik, 13 vertoningen, positie 11,8
  "ovpn-vs-nordvpn", //             1 klik, 13 vertoningen, positie 10,1
  "tunnelbear-vs-mozilla-vpn", //   1 klik, 13 vertoningen, positie 5,1
  "vyprvpn-vs-windscribe", //       1 klik, 10 vertoningen, positie 5,9
  "privadovpn-vs-x-vpn", //         1 klik, 8 vertoningen, positie 5,1
  "ivpn-vs-vpn-unlimited", //       1 klik, 6 vertoningen, positie 7,3
  "surfshark-vs-windscribe", //     1 klik, 5 vertoningen, positie 41,4
  "mozilla-vpn-vs-hide-me", //      1 klik, 4 vertoningen, positie 3,8
  "protonvpn-vs-perimeter-81", //   1 klik, 3 vertoningen, positie 3,3
  "torguard-vs-nordlayer", //       1 klik, 3 vertoningen, positie 72,3
  "mozilla-vpn-vs-fastestvpn", //   1 klik, 2 vertoningen, positie 2,0
  "airvpn-vs-nordvpn", //           0 klikken, 93 vertoningen, positie 15,1
  "airvpn-vs-surfshark", //         0 klikken, 24 vertoningen, positie 6,2
] as const;

export const LINKED_COMPARISONS = [...REDACTIONEEL, ...BEWEZEN] as const;

/** Alleen de op prestatie geselecteerde paren, voor de lijst op /compare.
 *  Ze moeten daar gelinkt worden: een pagina in de sitemap die nergens
 *  vandaan gelinkt wordt is precies wat fase 0 heeft opgeruimd. */
export const PROVEN_COMPARISONS = BEWEZEN;
