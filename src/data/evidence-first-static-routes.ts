export type EvidenceFirstStaticRouteCopy = {
  title: string;
  description: string;
  subject: string;
  sectionLabel: string;
};

type LocalizedRouteCopy = {
  en: EvidenceFirstStaticRouteCopy;
  nl: EvidenceFirstStaticRouteCopy;
};

const BEST_EN = "Best VPNs";
const BEST_NL = "Beste VPN's";
const GUIDES_EN = "Guides";
const GUIDES_NL = "Gidsen";

const routeCopy: Record<string, LocalizedRouteCopy> = {
  "/best-no-log-vpn": {
    en: {
      title: "Best No-Log VPNs: Evidence Check",
      description:
        "A limited checklist for assessing VPN logging claims while the underlying policies, audits and app behaviour are reviewed again.",
      subject: "VPN no-log claims",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "Beste no-log VPN's: bewijscontrole",
      description:
        "Een beperkte controlelijst voor logbeleid terwijl beleid, audits en appgedrag opnieuw worden beoordeeld.",
      subject: "no-logclaims van VPN's",
      sectionLabel: BEST_NL,
    },
  },
  "/best-vpn-for-digital-nomads": {
    en: {
      title: "VPNs for Digital Nomads: Evidence Check",
      description:
        "A cautious checklist for remote work, travel networks, device support and current VPN plan terms.",
      subject: "VPN options for digital nomads",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor digital nomads: bewijscontrole",
      description:
        "Een voorzichtige controlelijst voor werken op afstand, reisnetwerken, apparaten en actuele abonnementsvoorwaarden.",
      subject: "VPN-opties voor digital nomads",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-bali": {
    en: {
      title: "VPN for Bali: Evidence Check",
      description:
        "A limited preparation guide for devices, local networks, current rules and provider support before a trip to Bali.",
      subject: "VPN preparation for Bali",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Bali: bewijscontrole",
      description:
        "Een beperkte voorbereiding op apparaten, lokale netwerken, actuele regels en ondersteuning voor een reis naar Bali.",
      subject: "VPN-voorbereiding voor Bali",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-free-trial": {
    en: {
      title: "VPN Free Trials: Evidence Check",
      description:
        "Check trial eligibility, billing, cancellation, refund terms and feature limits without relying on stale promotions.",
      subject: "VPN free trials and refund terms",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "Gratis VPN-proefperiodes: bewijscontrole",
      description:
        "Controleer deelname, betaling, opzegging, terugbetaling en functielimieten zonder verouderde promoties te vertrouwen.",
      subject: "gratis VPN-proefperiodes en terugbetalingsregels",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-morocco": {
    en: {
      title: "VPN for Morocco: Evidence Check",
      description:
        "A limited preparation guide for devices, local networks, current rules and provider support in Morocco.",
      subject: "VPN preparation for Morocco",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Marokko: bewijscontrole",
      description:
        "Een beperkte voorbereiding op apparaten, lokale netwerken, actuele regels en ondersteuning in Marokko.",
      subject: "VPN-voorbereiding voor Marokko",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-netflix": {
    en: {
      title: "VPNs for Netflix: Evidence Check",
      description:
        "A bounded checklist for app support, streaming terms and repeatable service checks without an access guarantee.",
      subject: "VPN use with Netflix",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor Netflix: bewijscontrole",
      description:
        "Een begrensde controlelijst voor apps, streamingvoorwaarden en herhaalbare controles zonder toegangsgarantie.",
      subject: "VPN-gebruik met Netflix",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-streaming": {
    en: {
      title: "VPNs for Streaming: Evidence Check",
      description:
        "A bounded checklist for devices, services, terms and repeatable streaming tests without universal unblocking claims.",
      subject: "VPN options for streaming",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor streaming: bewijscontrole",
      description:
        "Een begrensde controlelijst voor apparaten, diensten, voorwaarden en streamingtests zonder universele toegangsclaims.",
      subject: "VPN-opties voor streaming",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-tablet": {
    en: {
      title: "VPNs for Tablets: Evidence Check",
      description:
        "Check tablet app support, permissions, network handoffs and current plan limits before choosing a provider.",
      subject: "VPN options for tablets",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor tablets: bewijscontrole",
      description:
        "Controleer appondersteuning, machtigingen, netwerkwissels en actuele abonnementslimieten voor tablets.",
      subject: "VPN-opties voor tablets",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-torrenting": {
    en: {
      title: "VPNs for Torrenting: Evidence Check",
      description:
        "A safety-first checklist for lawful P2P use, leak protection, port support and provider policy boundaries.",
      subject: "VPN options for lawful torrenting",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor torrenting: bewijscontrole",
      description:
        "Een veiligheidsgerichte controlelijst voor rechtmatig P2P-gebruik, lekbescherming, poorten en aanbiederbeleid.",
      subject: "VPN-opties voor rechtmatig torrentinggebruik",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-usa": {
    en: {
      title: "VPN for the USA: Evidence Check",
      description:
        "A limited checklist for US networks, privacy needs, device support and current provider terms.",
      subject: "VPN options for the United States",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor de Verenigde Staten: bewijscontrole",
      description:
        "Een beperkte controlelijst voor Amerikaanse netwerken, privacybehoeften, apparaten en actuele voorwaarden.",
      subject: "VPN-opties voor de Verenigde Staten",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-windows-tablet": {
    en: {
      title: "VPNs for Windows Tablets: Evidence Check",
      description:
        "Check Windows tablet compatibility, app controls, network handoffs and current plan limits.",
      subject: "VPN options for Windows tablets",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN's voor Windows-tablets: bewijscontrole",
      description:
        "Controleer compatibiliteit, appbediening, netwerkwissels en actuele abonnementslimieten voor Windows-tablets.",
      subject: "VPN-opties voor Windows-tablets",
      sectionLabel: BEST_NL,
    },
  },
  "/guides/public-wifi-safety": {
    en: {
      title: "Public Wi-Fi Safety: Evidence Check",
      description:
        "A practical checklist for assessing public Wi-Fi risks, device protections and what a VPN can and cannot cover.",
      subject: "public Wi-Fi safety",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "Veilig op openbare wifi: bewijscontrole",
      description:
        "Een praktische controlelijst voor openbare wifi, apparaatbeveiliging en wat een VPN wel en niet afdekt.",
      subject: "veiligheid op openbare wifi",
      sectionLabel: GUIDES_NL,
    },
  },
  "/guides/vpn-for-streaming": {
    en: {
      title: "Using a VPN for Streaming: Evidence Check",
      description:
        "Understand device, service and account boundaries before testing a VPN with a streaming service.",
      subject: "VPN use for streaming",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "Een VPN gebruiken voor streaming: bewijscontrole",
      description:
        "Begrijp de grenzen van apparaten, diensten en accounts voordat je een VPN met streaming test.",
      subject: "VPN-gebruik voor streaming",
      sectionLabel: GUIDES_NL,
    },
  },
  "/guides/vpn-for-torrenting": {
    en: {
      title: "Using a VPN for Torrenting: Evidence Check",
      description:
        "A safety-first guide to lawful P2P use, leak checks, kill switches, provider policies and clear limitations.",
      subject: "VPN use for lawful torrenting",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "Een VPN gebruiken voor torrenting: bewijscontrole",
      description:
        "Een veiligheidsgerichte gids voor rechtmatig P2P-gebruik, lektests, kill switches, beleid en beperkingen.",
      subject: "VPN-gebruik voor rechtmatig torrentinggebruik",
      sectionLabel: GUIDES_NL,
    },
  },
  "/guides/vpn-on-mobile": {
    en: {
      title: "VPN on Mobile: Evidence Check",
      description:
        "A practical setup checklist for official mobile apps, permissions, always-on controls and network handoffs.",
      subject: "VPN setup on mobile devices",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "VPN op mobiel: bewijscontrole",
      description:
        "Een praktische installatiecheck voor officiële apps, machtigingen, altijd-aan-instellingen en netwerkwissels.",
      subject: "VPN-installatie op mobiele apparaten",
      sectionLabel: GUIDES_NL,
    },
  },
  "/best/vpn-android-tablet": {
    en: {
      title:
        "Best VPN for Android Tablets in 2026: App Support, Setup and Trade-offs",
      description:
        "A practical Android tablet VPN comparison: verify app support, permissions, split tunneling, battery trade-offs and plan terms instead of trusting fixed scores.",
      subject: "VPN options for Android tablets",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Android-tablets: bewijscontrole",
      description:
        "Controleer appondersteuning, machtigingen, split tunneling, accugedrag en voorwaarden voor Android-tablets.",
      subject: "VPN-opties voor Android-tablets",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-android": {
    en: {
      title: "Best VPNs for Android in 2026: Apps, Battery and Setup",
      description:
        "Compare Android VPN apps by network privacy, permissions, battery trade-offs and current plan terms—not unsupported speed scores.",
      subject: "VPN options for Android",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Android: bewijscontrole",
      description:
        "Controleer Android-apps op netwerkprivacy, machtigingen, accugebruik en actuele voorwaarden.",
      subject: "VPN-opties voor Android",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-cheap": {
    en: {
      title: "Best Cheap VPNs in 2026: Compare Value, Terms and Trade-offs",
      description:
        "Compare affordable VPN plans by upfront commitment, refund window, device limits and privacy evidence—not a misleading headline price.",
      subject: "affordable VPN plans",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "Goedkope VPN's: bewijscontrole",
      description:
        "Controleer totale kosten, verlenging, terugbetaling, apparaatlimieten en privacybewijs in plaats van alleen de vanafprijs.",
      subject: "betaalbare VPN-abonnementen",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-chromebook": {
    en: {
      title:
        "Best VPNs for Chromebook in 2026: Android, Chrome Extension and Linux Options",
      description:
        "Compare Chromebook VPN setup routes by coverage, permissions, device support and privacy boundaries—not unsupported speed claims.",
      subject: "VPN options for Chromebook",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Chromebook: bewijscontrole",
      description:
        "Controleer Android-apps, Chrome-extensies en Linux-routes op dekking, machtigingen en privacygrenzen.",
      subject: "VPN-opties voor Chromebook",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-firestick": {
    en: {
      title:
        "Best VPNs for Fire TV Stick in 2026: Apps, Router Setup and Streaming Checks",
      description:
        "Compare Fire TV VPN routes by app availability, remote-friendly setup, router coverage and streaming evidence—not fixed speed or unblocking promises.",
      subject: "VPN options for Fire TV Stick",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Fire TV Stick: bewijscontrole",
      description:
        "Controleer appbeschikbaarheid, bediening, routerdekking en streamingbewijs zonder vaste snelheidsclaims.",
      subject: "VPN-opties voor Fire TV Stick",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-gaming": {
    en: {
      title:
        "Best VPNs for Gaming in 2026: Ping, Stability and DDoS Boundaries",
      description:
        "Compare gaming VPNs by route, protocol, console setup and threat model—then measure ping and stability on your own network.",
      subject: "VPN options for gaming",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor gaming: bewijscontrole",
      description:
        "Controleer route, protocol, console-installatie en dreigingsmodel en meet daarna zelf ping en stabiliteit.",
      subject: "VPN-opties voor gaming",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-ipad": {
    en: {
      title: "Best VPNs for iPad in 2026: iPadOS App, Privacy and Setup Checks",
      description:
        "Compare iPad VPN options by iPadOS app support, multitasking, network handoffs, privacy boundaries and current plan terms - not fixed ratings or battery claims.",
      subject: "VPN options for iPad",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor iPad: bewijscontrole",
      description:
        "Controleer iPadOS-apps, multitasking, netwerkwissels, privacygrenzen en actuele voorwaarden.",
      subject: "VPN-opties voor iPad",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-iphone": {
    en: {
      title: "Best VPNs for iPhone in 2026: iOS App, Privacy and Setup Checks",
      description:
        "Compare iPhone VPN options by iOS app support, network handoffs, privacy boundaries, setup checks and current plan terms - not fixed App Store or battery claims.",
      subject: "VPN options for iPhone",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor iPhone: bewijscontrole",
      description:
        "Controleer iOS-apps, netwerkwissels, privacygrenzen, installatie en actuele voorwaarden.",
      subject: "VPN-opties voor iPhone",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-laptops": {
    en: {
      title:
        "Best VPNs for Laptops in 2026: Public Wi-Fi, Travel and Device Checks",
      description:
        "Compare laptop VPN options by app coverage, auto-connect, public Wi-Fi boundaries, travel setup and current plan terms—not fixed battery or speed claims.",
      subject: "VPN options for laptops",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor laptops: bewijscontrole",
      description:
        "Controleer appdekking, automatisch verbinden, openbare wifi, reizen en actuele voorwaarden voor laptops.",
      subject: "VPN-opties voor laptops",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-linux": {
    en: {
      title: "Best VPNs for Linux in 2026: Native Apps, CLI and Distro Support",
      description:
        "Compare Linux VPNs by supported distributions, GUI and CLI options, manual profiles, kill-switch boundaries and plan terms—not fixed speed ratings.",
      subject: "VPN options for Linux",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Linux: bewijscontrole",
      description:
        "Controleer distributies, GUI- en CLI-opties, handmatige profielen, kill switches en voorwaarden.",
      subject: "VPN-opties voor Linux",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-mobile": {
    en: {
      title:
        "Best Mobile VPNs in 2026: iPhone, Android, Battery and Setup Limits",
      description:
        "Compare mobile VPN options for iPhone and Android by network privacy, app permissions, battery trade-offs and current plan terms—not unsupported speed scores.",
      subject: "VPN options for mobile devices",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor mobiele apparaten: bewijscontrole",
      description:
        "Controleer iPhone- en Android-apps op netwerkprivacy, machtigingen, accugebruik en actuele voorwaarden.",
      subject: "VPN-opties voor mobiele apparaten",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-port-forwarding": {
    en: {
      title: "Best VPNs With Port Forwarding: Current Provider Comparison",
      description:
        "Compare current VPN port-forwarding support, plan limits, platform boundaries and security trade-offs using provider documentation checked on 13 August 2026.",
      subject: "VPN port-forwarding support",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN met port forwarding: bewijscontrole",
      description:
        "Controleer actuele port-forwardingondersteuning, abonnementslimieten, platforms en veiligheidsafwegingen.",
      subject: "port-forwardingondersteuning van VPN's",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-privacy": {
    en: {
      title:
        "Best VPNs for Privacy in 2026: Compare No-Logs Evidence and Threat Models",
      description:
        "Compare privacy-focused VPNs by logging evidence, jurisdiction, app transparency, payment choices and failure boundaries—not promises of anonymity.",
      subject: "VPN options for privacy",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor privacy: bewijscontrole",
      description:
        "Controleer logbewijs, jurisdictie, apptransparantie, betaalkeuzes en faalgrenzen zonder anonimiteitsbeloftes.",
      subject: "VPN-opties voor privacy",
      sectionLabel: BEST_NL,
    },
  },
  "/best/vpn-windows": {
    en: {
      title:
        "Best VPNs for Windows in 2026: App Support, Controls and Trade-offs",
      description:
        "Compare Windows VPNs by current OS support, split tunneling, kill-switch behaviour, auto-connect, privacy evidence and plan terms—not fixed speed scores.",
      subject: "VPN options for Windows",
      sectionLabel: BEST_EN,
    },
    nl: {
      title: "VPN voor Windows: bewijscontrole",
      description:
        "Controleer Windows-ondersteuning, split tunneling, kill-switchgedrag, automatisch verbinden en actuele voorwaarden.",
      subject: "VPN-opties voor Windows",
      sectionLabel: BEST_NL,
    },
  },
  "/guides/vpn-for-travel": {
    en: {
      title: "VPN for Travel: What to Test Before You Leave",
      description:
        "A bounded travel VPN guide for hotel and airport Wi-Fi, device preparation, destination restrictions and safer connectivity.",
      subject: "VPN preparation for travel",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "VPN voor reizen: bewijscontrole",
      description:
        "Controleer hotel- en luchthavenwifi, apparaten, bestemmingsbeperkingen en alternatieve verbindingen vóór vertrek.",
      subject: "VPN-voorbereiding voor reizen",
      sectionLabel: GUIDES_NL,
    },
  },
  "/guides/vpn-for-restricted-networks": {
    en: {
      title: "VPNs on Restricted Networks: Evidence Check",
      description:
        "A bounded checklist for identifying network restrictions, checking local rules and testing supported VPN features without access guarantees.",
      subject: "VPN use on restricted networks",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "VPN op beperkte netwerken: bewijscontrole",
      description:
        "Een begrensde controlelijst voor netwerkblokkades, lokale regels en ondersteunde VPN-functies zonder toegangsgaranties.",
      subject: "VPN-gebruik op beperkte netwerken",
      sectionLabel: GUIDES_NL,
    },
  },
  "/guides/vpn-protocols-explained": {
    en: {
      title: "VPN Protocols Explained: WireGuard vs OpenVPN (2026)",
      description:
        "A practical, evidence-led guide to WireGuard, OpenVPN, TCP vs UDP and VPN obfuscation, with a bounded test plan and current sources.",
      subject: "VPN protocols and obfuscation",
      sectionLabel: GUIDES_EN,
    },
    nl: {
      title: "VPN-protocollen uitgelegd: bewijscontrole",
      description:
        "Controleer WireGuard, OpenVPN, TCP versus UDP en obfuscatie met een begrensd testplan.",
      subject: "VPN-protocollen en obfuscatie",
      sectionLabel: GUIDES_NL,
    },
  },
};

export function getEvidenceFirstStaticRouteCopy(
  path: string,
  locale: string,
): EvidenceFirstStaticRouteCopy {
  const copy = routeCopy[path];
  if (!copy) {
    throw new Error(`Missing evidence-first copy for ${path}`);
  }

  return locale === "nl" ? copy.nl : copy.en;
}
