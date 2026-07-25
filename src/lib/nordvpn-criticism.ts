/**
 * De kritiek op NordVPN, per punt gewogen.
 *
 * Waarom deze pagina bestaat: twee van de vijf People-Also-Ask-vragen bij
 * "best vpn for torrenting" gaan over waarom je NordVPN zou mijden, en
 * "why avoid nordvpn" heeft een eigen zoekvolume. Deze site zet NordVPN
 * overal op één en verdient er commissie aan. Dan is het antwoord op die vraag
 * geen bijzaak maar de kern van de geloofwaardigheid.
 *
 * Regel voor dit bestand: elk punt krijgt een oordeel én een bron. Kritiek die
 * nergens op steunt komt er óók in, met de weerlegging erbij — dat is nuttiger
 * dan hem weglaten, want de lezer heeft hem elders al gezien.
 *
 * `oordeel`:
 *   terecht    — feitelijk juist en relevant voor de keuze
 *   genuanceerd — waar, maar met belangrijke context
 *   onbewezen  — circuleert breed, maar er is geen bewijs voor
 */
export type Oordeel = "terecht" | "genuanceerd" | "onbewezen";

export interface KritiekPunt {
  id: string;
  kop: string;
  kritiek: string;
  oordeel: Oordeel;
  onsOordeel: string;
  bron?: { label: string; url: string };
}

export const NORDVPN_KRITIEK: KritiekPunt[] = [
  {
    id: "port-forwarding",
    kop: "No port forwarding",
    kritiek:
      "NordVPN does not offer port forwarding on any server, which slows down torrenting on poorly seeded files and blocks remote access to a home network.",
    oordeel: "terecht",
    onsOordeel:
      "True, and it matters if you seed. NordVPN presents it as a deliberate security decision — open ports are an attack surface — which is a defensible position, but it does not change the outcome for you. Proton VPN and Private Internet Access do offer it.",
    bron: {
      label: "Engadget — NordVPN review",
      url: "https://www.engadget.com/cybersecurity/vpn/nordvpn-review-2025-innovative-features-a-few-missteps-163000578.html",
    },
  },
  {
    id: "renewal",
    kop: "The renewal price is much higher than the first term",
    kritiek:
      "The advertised price applies to the first subscription period only. After that it renews at a considerably higher rate, and complaints about automatic renewal are common.",
    oordeel: "terecht",
    onsOordeel:
      "This is normal across the industry, but that does not make it harmless: the price you compare on any review site — ours included — is the introductory one. Check what the second term costs before you commit, and set a reminder before it renews.",
    bron: {
      label: "PCWorld — Reddit users hate NordVPN. Are their criticisms legit?",
      url: "https://www.pcworld.com/article/3070345/reddit-users-hate-nordvpn-are-their-criticisms-legit.html",
    },
  },
  {
    id: "jurisdiction",
    kop: "Panama on paper, Europe in practice",
    kritiek:
      "NordVPN markets its Panama incorporation as being outside intelligence-sharing alliances, while the team largely works from Lithuania and the Netherlands — the latter a 9 Eyes member.",
    oordeel: "genuanceerd",
    onsOordeel:
      "Both halves are true, and PCWorld calls the concern fair. Whether it matters depends on your threat model: incorporation determines which courts can compel data, staff location does not. If your threat model includes a state actor, this is a reason to look at Mullvad or Proton instead.",
    bron: {
      label: "PCWorld — Reddit users hate NordVPN. Are their criticisms legit?",
      url: "https://www.pcworld.com/article/3070345/reddit-users-hate-nordvpn-are-their-criticisms-legit.html",
    },
  },
  {
    id: "breach",
    kop: "The 2018 server breach was disclosed late",
    kritiek:
      "An unauthorised party reached a single rented server in Finland in March 2018. NordVPN did not disclose it publicly until late 2019.",
    oordeel: "genuanceerd",
    onsOordeel:
      "The breach itself was limited — one rented server, no user credentials taken, and it led to the move to RAM-only servers. The delay is the real problem: a company whose product is trust took over a year to tell its users. That is a fact about its behaviour, not about its encryption.",
    bron: {
      label: "VPN.com — the 2018 server incident",
      url: "https://www.vpn.com/vpn/nordvpn/security/",
    },
  },
  {
    id: "closed-source",
    kop: "The apps are not open source",
    kritiek:
      "Privacy-focused communities do not recommend NordVPN because its clients are proprietary, so the code cannot be independently inspected.",
    oordeel: "genuanceerd",
    onsOordeel:
      "Correct as a fact. Whether it disqualifies NordVPN depends on what you want: audits by a third party are a weaker guarantee than open code, but they are not nothing. Mullvad and Proton VPN publish their clients; if that is your bar, they are the shortlist.",
    bron: {
      label: "Privacy Guides — Is NordVPN reliable?",
      url: "https://discuss.privacyguides.net/t/is-nordvpn-reliable/27055",
    },
  },
  {
    id: "tesonet",
    kop: "The Tesonet and Oxylabs connection",
    kritiek:
      "NordVPN's founders are also listed as founders of Tesonet, which owns the web-scraping company Oxylabs. The claim is that user traffic feeds a data-harvesting business.",
    oordeel: "onbewezen",
    onsOordeel:
      "The shared founders are real; the data-sharing is not. PCWorld examined the claim and found that no link has been demonstrated. We list it because you will run into it, not because it holds up.",
    bron: {
      label: "PCWorld — Reddit users hate NordVPN. Are their criticisms legit?",
      url: "https://www.pcworld.com/article/3070345/reddit-users-hate-nordvpn-are-their-criticisms-legit.html",
    },
  },
];

/** Wat er tegenover staat. Zonder dit is het geen weging maar een aanklacht. */
export const NORDVPN_STERK = [
  {
    kop: "Repeatedly audited",
    tekst:
      "The no-logs policy has been checked by external firms more than once, most recently by Deloitte. That is a stronger position than most providers can show.",
    bron: {
      label: "PCWorld",
      url: "https://www.pcworld.com/article/3070345/reddit-users-hate-nordvpn-are-their-criticisms-legit.html",
    },
  },
  {
    kop: "RAM-only servers",
    tekst:
      "Servers run from memory, so a seized machine holds nothing after a reboot. This came out of the 2018 incident — a criticism that led to a real change.",
  },
  {
    kop: "It is genuinely fast",
    tekst:
      "The NordLynx protocol is consistently near the top in independent speed testing, which is why it still leads most of our own lists.",
  },
];
