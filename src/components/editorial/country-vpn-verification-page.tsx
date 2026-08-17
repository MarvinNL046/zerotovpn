import { EvidenceLedVpnUseCasePage } from "@/components/editorial/evidence-led-vpn-use-case-page";

type CountryVpnVerificationPageProps = {
  locale: string;
  route: string;
  country: string;
  context: string;
};

const failureConditions = [
  "Current authoritative guidance does not support your intended use, travel context, or organization policy.",
  "The provider cannot document a lawful, supported setup for your exact device and network context.",
  "Connection behavior becomes unstable, exposes an unexpected fallback path, or cannot recover safely.",
  "You cannot obtain support, updates, account access, or a refund through channels available to you.",
] as const;

const evidenceChecks = [
  {
    title: "Current legal and policy context",
    body: "Check current government, regulator, consular, employer, school, and service terms that apply to your use. A consumer comparison is not legal advice or an authorization to use a service.",
  },
  {
    title: "Provider-stated availability",
    body: "Ask the provider for a dated answer covering the country, network type, app distribution, supported protocol, account access, and update path. Record unknowns instead of treating silence as support.",
  },
  {
    title: "Failure and fallback behavior",
    body: "Understand what the app does when connection fails, the device sleeps, Wi-Fi changes, or a protocol is unavailable. Disable any fallback that conflicts with your threat model.",
  },
  {
    title: "Operational exit plan",
    body: "Keep official support details, refund terms, recovery codes, updates, and an alternative communication plan available without depending on the same blocked or unstable path.",
  },
] as const;

const verificationSteps = [
  "Define the lawful purpose, devices, networks, data sensitivity, and failure conditions before comparing providers.",
  "Check current authoritative rules and organization policies; save the source and date you relied on.",
  "Verify official app distribution, updates, support access, account recovery, and refund terms for your situation.",
  "If lawful, run a bounded test on the actual device and network while recording protocol, server region, time, reconnect behavior, and failures.",
  "Stop using the setup when legal context, provider support, app provenance, or observed failure behavior no longer meets the written boundary.",
] as const;

const iranEvidenceMatrix = [
  {
    criterion: "Current legal and policy context",
    status: "Needs test",
    evidence:
      "Save current authoritative guidance and the policy that applies to your purpose before installing anything.",
  },
  {
    criterion: "Official app and update path",
    status: "Needs test",
    evidence:
      "Confirm official distribution, updates, account recovery, and support access on the actual device.",
  },
  {
    criterion: "Network and protocol behavior",
    status: "Unknown",
    evidence:
      "No retained, reproducible record currently proves a stable result across Iranian networks and dates.",
  },
  {
    criterion: "Failure and fallback behavior",
    status: "Needs test",
    evidence:
      "Record reconnects, Wi-Fi changes, protocol fallback, and any traffic leak or account-access failure.",
  },
] as const;

const iranProviderDossiers = [
  "nordvpn",
  "surfshark",
  "protonvpn",
  "mullvad",
  "expressvpn",
].map((slug) => ({
  name:
    slug === "protonvpn"
      ? "Proton VPN"
      : slug
          .replace("vpn", " VPN")
          .replace(/^./, (letter) => letter.toUpperCase()),
  slug,
  status: "Dossier pending" as const,
  body: "A general provider dossier exists, but it is not evidence that this provider currently works in Iran. The country-specific record remains to be tested and dated.",
}));

const iranRelatedGuides = [
  {
    label: "Iran VPN research",
    href: "/blog/best-vpn-for-iran-2026-bypass-internet-censorship",
    body: "Read the current testing notes, obfuscation checks, and preparation steps.",
  },
  {
    label: "Unblock Telegram",
    href: "/blog/best-vpn-for-telegram-2026",
    body: "See how restricted messaging fits into the wider censorship cluster.",
  },
  {
    label: "Explore country guides",
    href: "/countries",
    body: "Browse country guides with clearly scoped legal, network, and operational questions.",
  },
  {
    label: "VPN finder",
    href: "/quiz",
    body: "Turn your device, network, and preferences into a shortlist to verify.",
  },
  {
    label: "How we research VPNs",
    href: "/methodology",
    body: "See how source dates, observations, and commercial links are separated.",
  },
] as const;

const iranFaq = [
  {
    question: "Does ZeroToVPN currently recommend one VPN for Iran?",
    answer:
      "No. The historical ranking is withheld until current, reproducible records cover the relevant networks, devices, dates, and legal context.",
  },
  {
    question: "Why is a provider dossier not enough?",
    answer:
      "A general review can document product behavior or provider statements, but it cannot prove current availability on your network. Treat the country-specific test as a separate evidence record.",
  },
  {
    question: "What should I record during a lawful test?",
    answer:
      "Record the device, network, protocol, server region, date and time, reconnect behavior, fallback behavior, and any support or account-access failure.",
  },
] as const;

export function CountryVpnVerificationPage({
  locale,
  route,
  country,
  context,
}: CountryVpnVerificationPageProps) {
  return (
    <EvidenceLedVpnUseCasePage
      locale={locale}
      route={route}
      eyebrow={`${country} VPN verification`}
      title={`Plan for ${country} with current evidence and a failure-safe boundary.`}
      introduction={`${context} Availability, rules, enforcement, app distribution, and network behavior can change. Verify the legal and operational context that applies to you instead of relying on a permanent-access claim.`}
      status={`The historical "best VPN for ${country}" ranking and access claims are withheld because ZeroToVPN does not have complete, current, reproducible records for the relevant networks, devices, dates, and legal context. No provider is substituted from marketing copy.`}
      failureConditions={failureConditions}
      evidenceChecks={evidenceChecks}
      verificationSteps={verificationSteps}
      decisionBoundary={`A connection observed in ${country} is time-, network-, device-, server-, and policy-specific. It does not guarantee future access, anonymity, safety, legality, or the same outcome for another person. Stop when any legal or operational boundary becomes uncertain.`}
      matrixRows={iranEvidenceMatrix}
      candidateProviders={iranProviderDossiers}
      relatedGuides={iranRelatedGuides}
      faq={iranFaq}
    />
  );
}
