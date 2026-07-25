/**
 * Port forwarding per VPN, nagelezen bij de bron.
 *
 * Waarom dit een eigen bestand is: port forwarding staat in geen enkel veld
 * van vpn-data, en het is precies het punt waarop de grote aanbieders van
 * elkaar verschillen. Het kwam bovendrijven in de PAA en de gerelateerde
 * zoekopdrachten bij "best vpn for torrenting", en het is verifieerbaar —
 * anders dan "snelheid", waar iedereen zijn eigen meting bij haalt.
 *
 * Het punt waarop de meeste lijsten verouderd zijn: Mullvad stond er jarenlang
 * als aanrader op en heeft de functie op 1 juli 2023 verwijderd. Lijsten die
 * Mullvad nog noemen zijn dus minstens twee jaar oud, ook als er "2026" boven
 * staat.
 *
 * `status`:
 *   ja         — werkt, inbegrepen in het abonnement
 *   betaald    — werkt, maar kost extra
 *   verwijderd — had het, heeft het niet meer
 *   nee        — heeft het nooit gehad of biedt het bewust niet aan
 */
export type PortForwardingStatus = "ja" | "betaald" | "verwijderd" | "nee";

export interface PortForwarding {
  slug: string;
  status: PortForwardingStatus;
  /** Hoe het werkt, of waarom het er niet is. */
  details: string;
  /** Waar het werkt — servers, besturingssystemen. */
  beperkingen?: string;
  bron: { label: string; url: string };
}

export const PORT_FORWARDING: PortForwarding[] = [
  {
    slug: "protonvpn",
    status: "ja",
    details:
      "Up to five ports, chosen by you rather than assigned at random. Included in the paid plans at no extra cost.",
    beperkingen:
      "Works on the P2P-optimised servers, via the Windows and Linux apps. Not available in the macOS app.",
    bron: {
      label: "All About Cookies — best VPNs with port forwarding",
      url: "https://allaboutcookies.org/best-vpns-with-port-forwarding",
    },
  },
  {
    slug: "private-internet-access",
    status: "ja",
    details:
      "One port, assigned at random rather than chosen. Included in the standard subscription and available on every platform.",
    beperkingen: "Works on most locations, but not on the US servers.",
    bron: {
      label: "All About Cookies — best VPNs with port forwarding",
      url: "https://allaboutcookies.org/best-vpns-with-port-forwarding",
    },
  },
  {
    slug: "purevpn",
    status: "betaald",
    details:
      "Up to fifteen ports, manually configured — the most flexible of the three. It is an add-on, so it costs extra on top of the subscription.",
    beperkingen:
      "Requires the dedicated servers, and works on Windows, macOS and Android.",
    bron: {
      label: "All About Cookies — best VPNs with port forwarding",
      url: "https://allaboutcookies.org/best-vpns-with-port-forwarding",
    },
  },
  {
    slug: "mullvad",
    status: "verwijderd",
    details:
      "Mullvad offered port forwarding for years and removed it on 1 July 2023, announced on 29 May. The reason was abuse: forwarded ports were used to host malicious services, which led to law enforcement contact, blacklisted IPs and hosting providers dropping them.",
    beperkingen:
      "Lists that still recommend Mullvad for port forwarding are at least two years out of date, whatever year is in the title.",
    bron: {
      label: "Mullvad — Removing the support for forwarded ports",
      url: "https://mullvad.net/en/blog/removing-the-support-for-forwarded-ports",
    },
  },
  {
    slug: "nordvpn",
    status: "nee",
    details:
      "Not offered on any server. NordVPN presents this as a deliberate security choice — an open port is an attack surface — which is defensible, but it does not help if you need one.",
    bron: {
      label: "Engadget — NordVPN review",
      url: "https://www.engadget.com/cybersecurity/vpn/nordvpn-review-2025-innovative-features-a-few-missteps-163000578.html",
    },
  },
  {
    slug: "expressvpn",
    status: "nee",
    details: "Not offered.",
    bron: {
      label: "All About Cookies — best VPNs with port forwarding",
      url: "https://allaboutcookies.org/best-vpns-with-port-forwarding",
    },
  },
  {
    slug: "cyberghost",
    status: "nee",
    details:
      "Not offered, despite the dedicated P2P servers. Worth knowing if you picked CyberGhost specifically for torrenting.",
    bron: {
      label: "All About Cookies — best VPNs with port forwarding",
      url: "https://allaboutcookies.org/best-vpns-with-port-forwarding",
    },
  },
];
