/** Provider feature records checked against dated source pages. */
export type PortForwardingStatus = "ja" | "betaald" | "verwijderd" | "nee";

export interface PortForwarding {
  slug: string;
  status: PortForwardingStatus;
  details: string;
  beperkingen?: string;
  bron: { label: string; url: string };
}

export const PORT_FORWARDING: PortForwarding[] = [
  {
    slug: "protonvpn",
    status: "ja",
    details: "Port forwarding is included on paid plans, but Proton's current support documentation says the server assigns the active port; it is not a permanent port you choose.",
    beperkingen: "Use a P2P server and the current Windows, macOS or Linux workflow. The active port can change when you reconnect, so update the client that listens on it.",
    bron: { label: "Proton VPN - port forwarding support", url: "https://protonvpn.com/support/port-forwarding" },
  },
  {
    slug: "private-internet-access",
    status: "ja",
    details: "PIA documents port forwarding as a client feature with one assigned port; the port number is not chosen manually.",
    beperkingen: "Availability varies by location and current client support. Check the provider's location list and setup guide before relying on a specific server.",
    bron: { label: "Private Internet Access - port-forwarding documentation", url: "https://helpdesk.privateinternetaccess.com/kb/articles/pdf/next-generation-port-forwarding" },
  },
  {
    slug: "purevpn",
    status: "betaald",
    details: "PureVPN's current support page advertises port forwarding for up to sixteen ports as a paid add-on.",
    beperkingen: "Confirm the add-on price, eligible servers and supported app before purchase; the feature is not included in every plan by default.",
    bron: { label: "PureVPN support - port forwarding add-on", url: "https://support.purevpn.com/en_US/port-forwarding-/purevpn-port-forwarding-addon" },
  },
  {
    slug: "mullvad",
    status: "verwijderd",
    details: "Mullvad removed forwarded ports on 1 July 2023 after documenting abuse and operational problems. Treat older comparison lists as historical, not current availability.",
    beperkingen: "The feature is not available on current Mullvad accounts; verify any future change on Mullvad's own announcement page.",
    bron: { label: "Mullvad - removal of forwarded ports", url: "https://mullvad.net/en/blog/removing-the-support-for-forwarded-ports" },
  },
  {
    slug: "nordvpn",
    status: "nee",
    details: "NordVPN's current support page says port forwarding is not offered because customers share server infrastructure.",
    bron: { label: "NordVPN support - port forwarding", url: "https://support.nordvpn.com/hc/en-us/articles/19483392309649-Does-NordVPN-offer-port-forwarding" },
  },
  {
    slug: "expressvpn",
    status: "nee",
    details: "No port-forwarding feature is documented in the current comparison record; verify the provider's support pages if this requirement is decisive.",
    bron: { label: "ExpressVPN support", url: "https://www.expressvpn.com/support/" },
  },
  {
    slug: "cyberghost",
    status: "nee",
    details: "No port-forwarding feature is documented in the current comparison record; P2P server support does not automatically mean inbound ports are available.",
    bron: { label: "CyberGhost support", url: "https://support.cyberghostvpn.com/" },
  },
];
