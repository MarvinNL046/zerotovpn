import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  Info,
  Laptop,
  Link2,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { ReviewReadingProgress } from "@/components/editorial/review-reading-progress";
import { BreadcrumbSchema, FaqSchema } from "@/components/structured-data";
import { getVpnById, vpnProviders, type VpnProvider } from "@/lib/vpn-data";
import { getIndexableLocalesForPath } from "@/lib/indexability";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import {
  nordReviewSeoExpansion,
  type NordReviewParent,
  type NordReviewSeoExpansion,
} from "@/data/review-detail/nordvpn-review-seo";
import styles from "./nordvpn-review-editorial-page.module.css";

const PUBLISHED_AT = "2026-08-13";
const REVIEWED_AT = "2026-08-14";
const HERO_IMAGE = "/images/reviews/nordvpn/editorial-review-hero-v1.webp";
const INLINE_LINK_CLASS =
  "font-semibold text-[#1268f3] underline decoration-[#1268f3]/35 underline-offset-4 transition hover:decoration-[#1268f3]";
const INLINE_AFFILIATE_LINK_CLASS =
  "font-semibold text-[#1268f3] underline decoration-[#b8e34a] decoration-2 underline-offset-4 transition hover:text-[#0d56cb]";

type ReviewLocale = "en" | "nl";

type ReviewCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbs: [string, string, string];
  independent: string;
  h1: string;
  dek: string;
  byline: string;
  reviewed: string;
  lastTested: string;
  evidencePolicy: string;
  fundingLink: string;
  nav: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  verdictEyebrow: string;
  verdictTitle: string;
  verdictBody: string;
  bestFor: string;
  bestForValue: string;
  strengths: string[];
  limitation: string;
  heroCta: string;
  primaryCta: string;
  fallbackCta: string;
  refundNote: string;
  suppliedHeroCaption: string;
  tocTitle: string;
  methodTitle: string;
  methodBody: string;
  methodLink: string;
  atGlance: string;
  jurisdiction: string;
  logging: string;
  loggingValue: string;
  devices: string;
  refund: string;
  quickTitle: string;
  quickIntro: string;
  scoreLabels: [string, string, string];
  statusCards: Array<{ title: string; status: string; body: string }>;
  scoreNote: string;
  prosTitle: string;
  consTitle: string;
  pros: string[];
  cons: string[];
  chooseTitle: string;
  chooseBody: string;
  skipTitle: string;
  skipBody: string;
  evidenceTitle: string;
  evidenceIntro: string;
  evidenceRows: Array<{
    question: string;
    evidence: string;
    limit: string;
    status: string;
  }>;
  evidenceCaption: string;
  performanceTitle: string;
  performanceIntro: string;
  scorecardTitle: string;
  scorecardNote: string;
  process: Array<{ title: string; body: string }>;
  privacyTitle: string;
  privacyIntro: string;
  privacyImageCaption: string;
  specsCaption: string;
  specs: Array<[string, string]>;
  auditTitle: string;
  auditNote: string;
  appsTitle: string;
  appsIntro: string;
  settingsCaption: string;
  appCards: Array<{ title: string; body: string }>;
  pricingTitle: string;
  pricingIntro: string;
  monthly: string;
  annual: string;
  longTerm: string;
  livePrice: string;
  billingNote: string;
  renewalTitle: string;
  renewalBody: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonCaption: string;
  comparisonHeaders: [string, string, string, string];
  finalTitle: string;
  finalBody: string;
  finalBestFor: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  newsletterTitle: string;
  newsletterBody: string;
  sourcesTitle: string;
  sourcesIntro: string;
  sources: Array<{ label: string; href: string }>;
  relatedTitle: string;
  sourceBadge: string;
  currentData: string;
  unknown: string;
  pricingUnknown: string;
};

const copies: Record<ReviewLocale, ReviewCopy> = {
  en: {
    metaTitle: "NordVPN review 2026: apps, privacy checks, and price",
    metaDescription:
      "Our NordVPN review explains its apps, no-logs checks, prices, and limits. See who it may suit and what to check before you buy.",
    breadcrumbs: ["Home", "Reviews", "NordVPN review"],
    independent: "Independent NordVPN review",
    h1: "NordVPN review 2026: good apps, but check the details",
    dek: "NordVPN is a large paid VPN with apps for most popular devices. Its no-logs claim has had outside checks. You should still check the renewal price and test the servers you need.",
    byline: "Reviewed by Marvin Smit · ZeroToVPN editor",
    reviewed: "Page reviewed",
    lastTested: "Our latest performance test",
    evidencePolicy:
      "We keep NordVPN's claims, dated source documents, and our own tests separate.",
    fundingLink: "How we fund this site",
    nav: [
      "Verdict",
      "Evidence",
      "Performance",
      "Privacy",
      "Apps",
      "Pricing",
      "Compare",
      "FAQ",
    ],
    verdictEyebrow: "Our verdict",
    verdictTitle: "A good all-round VPN, but not right for everyone",
    verdictBody:
      "NordVPN has apps for Windows, macOS, Android, iPhone, Linux and TV devices. It also says Deloitte checked its no-logs claim for a sixth time. It may suit people who use several of those platforms. Before you buy, check the full price, renewal price, and the servers you need.",
    bestFor: "Best for",
    bestForValue: "Daily use on several types of devices",
    strengths: [
      "Apps for most computers, phones, and tablets",
      "NordVPN reports six outside checks of its no-logs claim",
      "Use it on up to 10 devices at once",
    ],
    limitation:
      "Price and speed can change with the plan, server, and renewal date.",
    heroCta: "See plans and pricing",
    primaryCta: "Check the current NordVPN price",
    fallbackCta: "Compare VPN alternatives",
    refundNote:
      "Some new plans bought directly from NordVPN may qualify for a refund within 30 days. Check the current rules before you buy.",
    suppliedHeroCaption:
      "This ZeroToVPN image shows a VPN on a laptop and phone. It gives context, but it is not proof from a product test.",
    tocTitle: "On this page",
    methodTitle: "How we review",
    methodBody:
      "We keep NordVPN's claims, source documents, and our own test results separate.",
    methodLink: "See our methodology",
    atGlance: "At a glance",
    jurisdiction: "Company location",
    logging: "No-logs claim",
    loggingValue: "Checked by an outside firm",
    devices: "Devices at once",
    refund: "Refund period",
    quickTitle: "What you need to know",
    quickIntro:
      "These cards show what we know, what comes from NordVPN, and what we still need to test ourselves.",
    scoreLabels: [
      "Privacy policy check",
      "Apps and devices",
      "Speed and streaming",
    ],
    statusCards: [
      {
        title: "Privacy policy check",
        status: "Outside check, dated 2025",
        body: "Deloitte checked part of NordVPN's no-logs policy. The result only covers the systems and dates it reviewed. You need a Nord account to read the full report.",
      },
      {
        title: "Apps and devices",
        status: "Information from NordVPN",
        body: "NordVPN says you can connect 10 devices at once. Features can differ by device and app version.",
      },
      {
        title: "Speed and streaming",
        status: "Not retested yet",
        body: "ZeroToVPN has not completed a new speed and streaming test. That is why we do not show a score yet.",
      },
    ],
    scoreNote:
      "We only score our own tests when we can run and check them again.",
    prosTitle: "Good points",
    consTitle: "Downsides",
    pros: [
      "Apps for most popular devices",
      "A clear limit of 10 devices at once",
      "NordVPN reports six outside checks of its no-logs claim",
      "Kill switch and a choice of VPN protocols",
    ],
    cons: [
      "Renewal can cost much more than the first offer",
      "More than 10 devices may need a router or another VPN",
      "Speed and streaming can change by server",
    ],
    chooseTitle: "Who it may suit",
    chooseBody:
      "Travellers and households that use Windows, macOS, Android, iPhone, Linux or TV devices and are comfortable using a large VPN company.",
    skipTitle: "Who may want another VPN",
    skipBody:
      "Compare other VPNs if you want open-source apps first, cash payment without a name, port forwarding, or the lowest renewal price.",
    evidenceTitle: "What we can prove — and what we cannot",
    evidenceIntro:
      "For each claim, we show the date, source, and limit. This is stricter than a marketing list.",
    evidenceCaption:
      "NordVPN evidence ledger with source status and limitations",
    evidenceRows: [
      {
        question: "No-logs claim",
        evidence:
          "NordVPN says Deloitte Lithuania checked part of its no-logs policy for the sixth time. The work ran from 10 November to 12 December 2025.",
        limit:
          "This check covered that period and only the systems Deloitte reviewed. You need a Nord Account to read the full report.",
        status: "NordVPN announcement · 2025",
      },
      {
        question: "Plan and renewal prices",
        evidence:
          "We do not show one fixed price. The currency, total due today, first plan period, and renewal price must be checked together.",
        limit:
          "Prices, taxes, and renewal rules can change by country and where you buy.",
        status: "Check the live order page",
      },
      {
        question: "Apps and device limit",
        evidence:
          "NordVPN says one account can connect up to 10 devices at once. A router setup works differently.",
        limit:
          "Features can differ by device, operating system, and app version.",
        status: "NordVPN help page",
      },
      {
        question: "Speed and streaming",
        evidence:
          "We do not publish a current ZeroToVPN speed or streaming result on this page.",
        limit:
          "We need new tests for each server before we publish speed, delay, or streaming claims.",
        status: "New ZeroToVPN test needed",
      },
    ],
    performanceTitle: "Speed and streaming: what we still need to test",
    performanceIntro:
      "We do not publish new speed or streaming scores without a test log that someone else can repeat. A fair test records the normal speed, server, VPN protocol, time, and several test runs.",
    scorecardTitle: "How we will run the next test",
    scorecardNote:
      "We do not have a current lab score. These steps compare the normal connection with several VPN runs and save the date.",
    process: [
      {
        title: "Test without the VPN",
        body: "Measure delay, download speed, upload speed, and lost data on the same device.",
      },
      {
        title: "Repeat the same VPN test",
        body: "Use the same server location, protocol, and time for several runs.",
      },
      {
        title: "Show failed results too",
        body: "Publish the app version, test date, and any failed or unclear result.",
      },
    ],
    privacyTitle: "Privacy and security",
    privacyIntro:
      "NordVPN includes common security controls and special server types. These features can be useful. Its outside no-logs check covered a set time; it is not a promise about the future.",
    privacyImageCaption:
      "This ZeroToVPN diagram shows the path from your device to a VPN server. It explains our review, but it is not a NordVPN test result.",
    specsCaption:
      "Key privacy and security specifications with qualifying context",
    specs: [
      ["Company location", "Panama"],
      ["No-logs claim", "Checked by an outside firm at set dates"],
      [
        "VPN protocols",
        "NordVPN lists NordLynx, OpenVPN, and other choices that depend on the device",
      ],
      [
        "Encryption",
        "Changes by protocol. Check the latest app and protocol guide",
      ],
      [
        "Kill switch",
        "Shown in NordVPN settings. Test how it works on your device",
      ],
      [
        "App controls",
        "NordVPN images show how to choose a location and connect",
      ],
    ],
    auditTitle: "Reported no-logs checks",
    auditNote:
      "NordVPN reports six outside checks: PwC in 2018 and 2020, then Deloitte in 2022, 2023, 2024, and 2025. Each check covered a set period and part of the service.",
    appsTitle: "Apps and useful settings",
    appsIntro:
      "NordVPN has apps for the main devices, but some features work differently or are missing on Windows, Mac, Android, iPhone, Linux, and TV devices.",
    settingsCaption:
      "This ZeroToVPN diagram shows where to find protocol, kill switch, split tunnelling, and unsafe Wi-Fi settings. Check each feature on your own device.",
    appCards: [
      {
        title: "VPN protocol",
        body: "Automatic is easiest. Manual choices can help if the connection fails.",
      },
      {
        title: "Kill switch",
        body: "Test what it blocks on the device you use.",
      },
      {
        title: "Apps outside the VPN",
        body: "This feature can work differently on each operating system.",
      },
      {
        title: "Unsafe Wi-Fi warning",
        body: "This warning can help, but always check that the VPN is connected.",
      },
    ],
    pricingTitle: "Plans and pricing",
    pricingIntro:
      "We do not show one fixed monthly price until we can check the country, currency, total due today, first plan period, and renewal price together. The buttons open NordVPN's current order page through our tracked partner link.",
    monthly: "Monthly option",
    annual: "One-year cost",
    longTerm: "Long-term cost",
    livePrice: "Check today's price",
    billingNote:
      "Before you pay, check the plan length, total due today, included products, tax, and renewal price.",
    renewalTitle: "Check the renewal price separately",
    renewalBody:
      "The monthly price shown for the first period may not match the amount charged today or at renewal. We show a discount only when NordVPN assigned it, it is still live, and we can check it.",
    comparisonTitle: "NordVPN compared with other VPNs",
    comparisonIntro:
      "This table shows the main reason to consider each VPN. We do not use scores that we cannot support. Open each full review to see its sources and limits.",
    comparisonCaption: "NordVPN and selected alternatives",
    comparisonHeaders: [
      "VPN",
      "Best known for",
      "Evidence status",
      "Read next",
    ],
    finalTitle: "Final verdict",
    finalBody:
      "NordVPN may be a good choice for everyday use. Its apps and reported history of outside no-logs checks are its strongest points. Before you buy, check the exact plan and test the servers you need during the refund period.",
    finalBestFor:
      "Best for: people who use the VPN on computers, phones and TV devices.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "Is NordVPN worth it in 2026?",
        answer:
          "It can be a strong choice when its current plan terms, app coverage and privacy evidence fit your needs. That does not make it the right service for every threat model.",
      },
      {
        question: "Does NordVPN keep logs?",
        answer:
          "NordVPN states that it operates under a no-logs policy and reports a sixth assurance engagement completed in December 2025. That engagement is dated and scoped; it is not a guarantee about every future system or activity.",
      },
      {
        question: "Is the 30-day refund window a free trial?",
        answer:
          "No. A refund window and a free trial are different. Eligibility depends on the current policy and purchase channel, so read the terms before subscribing.",
      },
      {
        question: "How fast is NordVPN?",
        answer:
          "Your result depends on baseline connection, route, protocol, congestion and destination. We do not publish a current numeric result here; test the same route repeatedly with and without the VPN.",
      },
      {
        question: "Does NordVPN always work with streaming services?",
        answer:
          "Streaming access can change by catalogue, route and platform, so permanent access should never be assumed. Treat every result as dated and check the service terms.",
      },
    ],
    newsletterTitle: "Stay informed",
    newsletterBody:
      "Get dated VPN research, retest notes and practical privacy guides. No affiliate offer is required to subscribe.",
    sourcesTitle: "Sources and update history",
    sourcesIntro:
      "We use NordVPN's own pages for its current terms and product claims. These pages show what NordVPN says; they are not independent proof.",
    sources: [
      {
        label: "NordVPN: sixth no-logs check",
        href: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
      },
      {
        label: "NordVPN: current refund policy",
        href: "https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy",
      },
      {
        label: "NordVPN: device limit",
        href: "https://nordvpn.com/features/vpn-for-multiple-devices/",
      },
      {
        label: "NordVPN: current server list",
        href: "https://support.nordvpn.com/hc/en-us/articles/19383127694225-Where-can-I-find-the-NordVPN-server-list",
      },
      {
        label: "NordVPN: protocol guide",
        href: "https://support.nordvpn.com/hc/en-us/articles/19482810153745-Which-NordVPN-protocol-should-I-choose",
      },
    ],
    relatedTitle: "Continue comparing",
    sourceBadge: "Provider supplied",
    currentData: "What we found",
    unknown: "What this does not prove",
    pricingUnknown: "Check today's price",
  },
  nl: {
    metaTitle: "NordVPN review 2026: apps, privacy en prijs",
    metaDescription:
      "Onze NordVPN-review legt apps, privacycontroles, prijzen en nadelen helder uit. Bekijk voor wie NordVPN past en wat je vóór aankoop rustig controleert.",
    breadcrumbs: ["Home", "Reviews", "NordVPN review"],
    independent: "Onafhankelijke NordVPN-review",
    h1: "NordVPN review 2026: fijne apps, maar let op de voorwaarden",
    dek: "NordVPN is een betaalde VPN met apps voor Windows, macOS, Android, iPhone, Linux en tv. Een externe partij bekeek de belofte dat NordVPN je internetactiviteiten niet bewaart. Controleer wel de verlengprijs en test de servers die jij nodig hebt.",
    byline: "Beoordeeld door Marvin Smit · ZeroToVPN-redacteur",
    reviewed: "Pagina beoordeeld",
    lastTested: "Onze laatste prestatietest",
    evidencePolicy:
      "Bij elk punt tonen we of de informatie van NordVPN, een externe controle of onze eigen test komt.",
    fundingLink: "Hoe wij deze site financieren",
    nav: [
      "Oordeel",
      "Bewijs",
      "Prestaties",
      "Privacy",
      "Apps",
      "Prijzen",
      "Vergelijken",
      "FAQ",
    ],
    verdictEyebrow: "Ons oordeel",
    verdictTitle: "Goede apps voor dagelijks gebruik, maar niet voor iedereen",
    verdictBody:
      "NordVPN heeft apps voor Windows, macOS, Android, iPhone, Linux en tv. In 2025 bekeek een externe partij opnieuw de belofte dat NordVPN je internetactiviteiten niet bewaart. Dat is een positief signaal, maar geen garantie. Controleer ook de totaalprijs, de latere verlengprijs en de servers die jij wilt gebruiken.",
    bestFor: "Beste voor",
    bestForValue: "Dagelijks gebruik en verzorgde apps op meerdere platforms",
    strengths: [
      "Apps voor computers, telefoons en tablets",
      "Externe privacycontrole uit 2025",
      "10 apparaten tegelijk volgens NordVPN",
    ],
    limitation:
      "Prijs, snelheid en streaming kunnen verschillen per abonnement, server en moment.",
    heroCta: "Bekijk abonnementen en prijzen",
    primaryCta: "Bekijk de actuele NordVPN-prijs",
    fallbackCta: "Vergelijk VPN-alternatieven",
    refundNote:
      "Bij geschikte abonnementen die je direct bij NordVPN koopt, geldt volgens NordVPN 30 dagen bedenktijd. Controleer de actuele voorwaarden.",
    suppliedHeroCaption:
      "Afbeelding gemaakt voor ZeroToVPN. Ze toont een VPN op een laptop en telefoon. Dit is geen foto van onze test.",
    tocTitle: "Op deze pagina",
    methodTitle: "Hoe wij beoordelen",
    methodBody:
      "We tonen apart wat NordVPN zegt, wat een externe partij controleerde en wat we zelf testten.",
    methodLink: "Bekijk onze methodologie",
    atGlance: "In één oogopslag",
    jurisdiction: "Bedrijf gevestigd in",
    logging: "Bewaart NordVPN je internetactiviteiten?",
    loggingValue: "NordVPN zegt van niet · extern onderzocht",
    devices: "Apparaten tegelijk",
    refund: "Periode om geld terug te vragen",
    quickTitle: "NordVPN in het kort",
    quickIntro:
      "Deze drie kaarten laten zien wat we weten, welke informatie van NordVPN komt en wat we nog zelf moeten testen.",
    scoreLabels: [
      "Controle van het privacybeleid",
      "Apps en apparaten",
      "Snelheid en streaming",
    ],
    statusCards: [
      {
        title: "Controle van het privacybeleid",
        status: "Extern onderzocht in 2025",
        body: "Deloitte bekeek een deel van de belofte dat NordVPN je internetactiviteiten niet bewaart. De controle ging alleen over de onderzochte systemen en periode. Het volledige rapport is alleen met een Nord-account te lezen.",
      },
      {
        title: "Apps en apparaten",
        status: "Informatie van NordVPN",
        body: "NordVPN zegt dat je 10 apparaten tegelijk kunt verbinden. Welke functies je krijgt, verschilt per apparaat en appversie.",
      },
      {
        title: "Snelheid en streaming",
        status: "Nog niet opnieuw getest",
        body: "ZeroToVPN heeft nog geen nieuwe eigen test met snelheids- en streamingcijfers. Daarom tonen we hier nog geen score.",
      },
    ],
    scoreNote:
      "We geven pas een cijfer als we de test zelf kunnen herhalen en controleren.",
    prosTitle: "Sterke punten",
    consTitle: "Nadelen",
    pros: [
      "Apps voor Windows, macOS, Android, iPhone, Linux en tv",
      "Duidelijke uitleg over het aantal apparaten",
      "Meerdere externe privacycontroles",
      "Internet-noodstop en keuze uit verschillende verbindingen",
    ],
    cons: [
      "Na de eerste abonnementsperiode kan de prijs stijgen",
      "Voor meer dan 10 apparaten heb je een router of andere VPN nodig",
      "Snelheid en streaming kunnen per server verschillen",
    ],
    chooseTitle: "Past goed bij",
    chooseBody:
      "Reizigers en huishoudens die één VPN-dienst op hun computer, telefoon en tv willen. Test wel zelf de servers en diensten die voor jou belangrijk zijn.",
    skipTitle: "Kijk verder als",
    skipBody:
      "Openbare broncode, contante betaling, port forwarding of de laagst mogelijke verlengprijs belangrijk voor je is.",
    evidenceTitle: "Welk bewijs is er — en wat bewijst het niet?",
    evidenceIntro:
      "Bij elk punt tonen we waar de informatie vandaan komt, wanneer ze is gecontroleerd en wat nog onzeker is.",
    evidenceCaption: "NordVPN-bewijsregister met bronstatus en beperkingen",
    evidenceRows: [
      {
        question: "Bewaart NordVPN je internetactiviteiten?",
        evidence:
          "NordVPN zegt dat Deloitte Lithuania deze privacybelofte voor de zesde keer onderzocht. Het onderzoek liep van 10 november tot 12 december 2025.",
        limit:
          "De controle ging alleen over de onderzochte systemen en periode. Het volledige rapport is alleen met een Nord-account te lezen.",
        status: "Extern onderzoek gemeld in 2025",
      },
      {
        question: "Prijs en abonnement",
        evidence:
          "We tonen geen vaste prijs. Die kan verschillen per land, munt en aanbieding. We willen de eerste betaling en de latere verlengprijs samen controleren.",
        limit:
          "Belasting, totaalprijs en verlengprijs kunnen verschillen per land en plaats van aankoop.",
        status: "Controleer de actuele betaalpagina",
      },
      {
        question: "Apps en apparaten",
        evidence:
          "NordVPN zegt dat je 10 apparaten tegelijk kunt verbinden. Een VPN op een router werkt anders.",
        limit:
          "Welke functies je krijgt, verschilt per apparaat, besturingssysteem en appversie.",
        status: "Informatie van NordVPN",
      },
      {
        question: "Snelheid en streaming",
        evidence: "We hebben nog geen nieuwe eigen testcijfers voor NordVPN.",
        limit:
          "Voordat we snelheid, vertraging of streamingtoegang noemen, moeten we meerdere servers herhaald testen.",
        status: "Nog niet opnieuw getest",
      },
    ],
    performanceTitle: "Snelheid en streaming: onze nieuwe test ontbreekt nog",
    performanceIntro:
      "We tonen pas nieuwe cijfers als we de test kunnen herhalen. Een goede test noteert de snelheid zonder VPN, de gekozen server, het verbindingstype, het tijdstip en meerdere metingen.",
    scorecardTitle: "Zo testen we opnieuw",
    scorecardNote:
      "Er zijn nog geen actuele cijfers. We meten eerst zonder VPN, herhalen dezelfde test met VPN en bewaren de datum en instellingen.",
    process: [
      {
        title: "Meet eerst zonder VPN",
        body: "Meet ping, download en upload op hetzelfde apparaat.",
      },
      {
        title: "Herhaal dezelfde VPN-test",
        body: "Gebruik dezelfde server, hetzelfde verbindingstype en ongeveer hetzelfde tijdstip.",
      },
      {
        title: "Laat alle uitkomsten zien",
        body: "Noem de appversie, testdatum en ook mislukte of onduidelijke resultaten.",
      },
    ],
    privacyTitle: "Privacy en beveiliging",
    privacyIntro:
      "NordVPN beschrijft een kill switch, Threat Protection en speciale servers. Dat zijn nuttige functies. Een externe controle uit 2025 bewijst alleen wat toen binnen die controle is bekeken; het is geen garantie voor de toekomst.",
    privacyImageCaption:
      "Dit schema laat zien hoe een verbinding via een VPN-server loopt. Het legt onze uitleg uit en is geen uitslag van een NordVPN-test.",
    specsCaption:
      "Belangrijke privacy- en beveiligingsspecificaties met context",
    specs: [
      ["Bedrijf gevestigd in", "Panama, volgens NordVPN"],
      [
        "Internetactiviteiten bewaren",
        "NordVPN zegt dat het je internetactiviteiten niet bewaart. Een externe partij bekeek deze belofte op vaste momenten.",
      ],
      [
        "Soort verbinding",
        "NordVPN noemt NordLynx en OpenVPN. De beschikbare keuzes verschillen per apparaat.",
      ],
      [
        "Versleuteling",
        "Hangt af van het gekozen verbindingstype. Controleer de actuele uitleg in de app.",
      ],
      [
        "Internet-noodstop",
        "Deze functie hoort je internet te stoppen als de VPN uitvalt. Test dit op jouw apparaat.",
      ],
      [
        "Appscherm",
        "NordVPN toont een landenlijst en knoppen om verbinding te maken.",
      ],
    ],
    auditTitle: "Wanneer de privacybelofte extern is onderzocht",
    auditNote:
      "NordVPN meldt zes onderzoeken: door PwC in 2018 en 2020 en door Deloitte in 2022, 2023, 2024 en 2025. Elk onderzoek keek naar een eigen periode en een beperkt deel van de systemen.",
    appsTitle: "Apps en handige instellingen",
    appsIntro:
      "NordVPN heeft apps voor Windows, macOS, Android, iPhone, Linux en tv. Niet elke functie werkt op ieder platform hetzelfde.",
    settingsCaption:
      "Dit overzicht toont vier instellingen. Controleer in de app of ze op jouw apparaat beschikbaar zijn.",
    appCards: [
      {
        title: "Verbindingstype",
        body: "Automatisch kiezen is meestal prima. Kies handmatig een ander type als de verbinding problemen geeft.",
      },
      {
        title: "Internet-noodstop",
        body: "Test of je internet echt stopt wanneer de VPN-verbinding wegvalt.",
      },
      {
        title: "Apps buiten de VPN",
        body: "Je kunt sommige apps buiten de VPN laten werken. Deze instelling werkt niet op elk systeem hetzelfde.",
      },
      {
        title: "Waarschuwing bij onveilige wifi",
        body: "Handige waarschuwing, maar controleer altijd of de VPN echt verbonden is.",
      },
    ],
    pricingTitle: "Abonnementen en prijzen",
    pricingIntro:
      "We tonen geen vast maandbedrag. De prijs kan veranderen per land, munt, abonnement en aanbieding. De knoppen openen via onze partnerlink de actuele betaalpagina van NordVPN.",
    monthly: "Abonnement van 1 maand",
    annual: "Jaarabonnement: prijs per maand",
    longTerm: "Lang abonnement: prijs per maand",
    livePrice: "Bekijk actuele prijs",
    billingNote:
      "Controleer vóór betaling de periode, het totaalbedrag van vandaag, de inbegrepen producten, belasting en de latere verlengprijs.",
    renewalTitle: "Let op de prijs na de eerste periode",
    renewalBody:
      "De getoonde maandprijs kan een gemiddelde over een lange eerste periode zijn. Dit is niet altijd het bedrag dat je vandaag of bij verlenging betaalt. We tonen alleen een kortingspercentage als NordVPN dit aan ons heeft toegewezen en het nog actueel is.",
    comparisonTitle: "NordVPN tegenover andere VPN's",
    comparisonIntro:
      "De tabel laat zien waarom iemand voor een aanbieder kan kiezen. We geven geen cijfer zonder goed bewijs. Open een review voor de details en nadelen.",
    comparisonCaption: "NordVPN en een paar bekende alternatieven",
    comparisonHeaders: [
      "VPN",
      "Kan passen als je…",
      "Waar de informatie vandaan komt",
      "Lees meer",
    ],
    finalTitle: "Eindoordeel",
    finalBody:
      "NordVPN kan een goede keuze zijn voor dagelijks gebruik. De apps en externe privacycontroles zijn de sterkste punten. Controleer vóór aankoop het exacte abonnement. Test daarna de servers die jij nodig hebt zolang je nog geld terug kunt vragen.",
    finalBestFor:
      "Past het best bij mensen die één VPN-dienst op hun computer, telefoon en tv willen.",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Is NordVPN het waard in 2026?",
        answer:
          "Dat kan zo zijn als de apps, prijs en privacycontroles bij jou passen. NordVPN is niet automatisch de beste keuze voor iedereen.",
      },
      {
        question: "Bewaart NordVPN wat ik online doe?",
        answer:
          "NordVPN zegt dat het je internetactiviteiten niet bewaart. Een externe partij onderzocht een deel van deze belofte in december 2025. Dat is een positief signaal, maar geen garantie voor de toekomst.",
      },
      {
        question: "Zijn 30 dagen geld terug hetzelfde als gratis proberen?",
        answer:
          "Nee. Je betaalt eerst en kunt alleen geld terugvragen als je aan de actuele regels voldoet. Die regels kunnen verschillen per plek waar je het abonnement koopt.",
      },
      {
        question: "Hoe snel is NordVPN?",
        answer:
          "Dat hangt af van je normale internet, de gekozen server, het verbindingstype en de drukte. We tonen nog geen nieuw eigen cijfer. Test daarom dezelfde server meerdere keren met en zonder VPN.",
      },
      {
        question: "Werkt NordVPN altijd met streamingdiensten?",
        answer:
          "Geen provider kan permanente toegang tot iedere catalogus of ieder platform garanderen. Behandel streamingresultaten als gedateerd en controleer de voorwaarden van de dienst.",
      },
    ],
    newsletterTitle: "Blijf op de hoogte",
    newsletterBody:
      "Ontvang nieuwe VPN-tests en eenvoudige privacygidsen per e-mail. Je krijgt geen verborgen partneraanbieding.",
    sourcesTitle: "Bronnen en laatste update",
    sourcesIntro:
      "Voor prijzen, voorwaarden en functies gebruikten we pagina's van NordVPN. Die pagina's laten zien wat NordVPN zegt. Ze zijn geen onafhankelijk bewijs dat alles altijd hetzelfde werkt.",
    sources: [
      {
        label: "NordVPN over de externe privacycontrole van 2025",
        href: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
      },
      {
        label: "NordVPN over de regels voor terugbetaling",
        href: "https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy",
      },
      {
        label: "NordVPN over het aantal apparaten",
        href: "https://nordvpn.com/features/vpn-for-multiple-devices/",
      },
      {
        label: "NordVPN over beschikbare servers",
        href: "https://support.nordvpn.com/hc/en-us/articles/19383127694225-Where-can-I-find-the-NordVPN-server-list",
      },
      {
        label: "NordVPN over verbindingstypen",
        href: "https://support.nordvpn.com/hc/en-us/articles/19482810153745-Which-NordVPN-protocol-should-I-choose",
      },
    ],
    relatedTitle: "Verder vergelijken",
    sourceBadge: "Door provider aangeleverd",
    currentData: "Wat we weten",
    unknown: "Wat nog onzeker is",
    pricingUnknown: "Bekijk actuele prijs",
  },
};

export const nordvpnReviewTitle = copies.en.metaTitle;
export const nordvpnReviewDescription = copies.en.metaDescription;

export function getNordVpnReviewMetadataCopy(locale: string) {
  return copies[locale === "nl" ? "nl" : "en"];
}

function localeForReview(locale: string): ReviewLocale {
  return locale === "nl" ? "nl" : "en";
}

function isAdmittedReviewLink(pathname: string, locale: ReviewLocale): boolean {
  return Boolean(getIndexableLocalesForPath(pathname)?.includes(locale));
}

function formattedDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function AtAGlance({
  vpn,
  copy,
  affiliateUrl,
  reviewLocale,
  className = "",
}: {
  vpn: VpnProvider;
  copy: ReviewCopy;
  affiliateUrl: string;
  reviewLocale: ReviewLocale;
  className?: string;
}) {
  const isEnglish = reviewLocale === "en";
  const details = [
    [
      copy.jurisdiction,
      isEnglish ? "Panama · stated by NordVPN" : "Panama · volgens NordVPN",
    ],
    [copy.logging, copy.loggingValue],
    [
      copy.devices,
      isEnglish ? "10 · stated by NordVPN" : "10 · volgens NordVPN",
    ],
    [
      copy.refund,
      isEnglish ? "30 days · rules apply" : "30 dagen · controleer de regels",
    ],
  ];

  return (
    <aside
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}
      aria-label={copy.atGlance}
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1268f3]">
        {copy.atGlance}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Image
          src="/logos/nordvpn.svg"
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-xl bg-[#f3f7ff] p-2"
        />
        <div>
          <p className="text-xl font-bold">NordVPN</p>
          <p className="text-sm text-muted-foreground">nordvpn.com</p>
        </div>
      </div>
      <dl className="mt-5 divide-y divide-slate-100 text-sm dark:divide-slate-800">
        {details.map(([term, value]) => (
          <div key={term} className="grid grid-cols-[0.9fr_1.1fr] gap-3 py-3">
            <dt className="text-muted-foreground">{term}</dt>
            <dd className="text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <ReviewCta
        vpn={vpn}
        copy={copy}
        affiliateUrl={affiliateUrl}
        className={`${styles.sidebarCta} mt-5 w-full bg-[#b8e34a] text-[#071226] hover:bg-[#a9d63d]`}
      />
      <p className="mt-3 text-center text-[11px] leading-4 text-muted-foreground">
        {copy.refundNote}
      </p>
    </aside>
  );
}

function ReviewCta({
  vpn,
  copy,
  affiliateUrl,
  className = "",
  label,
  size = "default",
}: {
  vpn: VpnProvider;
  copy: ReviewCopy;
  affiliateUrl: string;
  className?: string;
  label?: string;
  size?: "default" | "lg";
}) {
  const mergedClassName = `${styles.reviewCta} ${className}`;
  if (!affiliateUrl) {
    return (
      <Link
        href="/compare"
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition ${mergedClassName}`}
      >
        {copy.fallbackCta}
        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
      </Link>
    );
  }
  return (
    <AffiliateButton
      vpnId={vpn.id}
      vpnName={vpn.name}
      affiliateUrl={affiliateUrl}
      size={size}
      className={mergedClassName}
    >
      {label ?? copy.primaryCta}
      <ArrowRight className="ml-2 size-4" aria-hidden="true" />
    </AffiliateButton>
  );
}

function countWords(value: unknown): number {
  if (typeof value === "string")
    return value.trim().split(/\s+/u).filter(Boolean).length;
  if (Array.isArray(value))
    return value.reduce((total, item) => total + countWords(item), 0);
  if (value && typeof value === "object")
    return Object.values(value).reduce(
      (total, item) => total + countWords(item),
      0,
    );
  return 0;
}

function ReviewDetailBlocks({
  parent,
  expansion,
  reviewLocale,
}: {
  parent: NordReviewParent;
  expansion: NordReviewSeoExpansion;
  reviewLocale: ReviewLocale;
}) {
  const blocks = expansion.blocks.filter((block) => block.parent === parent);
  if (blocks.length === 0) return null;

  const sourcesLabel =
    reviewLocale === "nl"
      ? "Bronnen voor dit onderdeel"
      : "Sources for this section";
  const relatedLabel = reviewLocale === "nl" ? "Lees ook" : "Related guide";
  const moreLabel =
    reviewLocale === "nl" ? "Meer uitleg" : "Read the full explanation";
  const quickMoreLabel =
    reviewLocale === "nl"
      ? "Meer uitleg: wat een VPN wel en niet doet"
      : "More detail: what a VPN can and cannot do";

  const renderBlockBody = (
    block: NordReviewSeoExpansion["blocks"][number],
    showHeading = true,
    collapseParagraphs = true,
  ) => (
    <>
      {showHeading ? (
        <>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1268f3]">
            {block.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
            {block.title}
          </h3>
        </>
      ) : null}
      <p className="mt-4 text-lg font-medium leading-8 text-slate-700 dark:text-slate-200">
        {block.lead}
      </p>
      {collapseParagraphs ? (
        <details className="group mt-5 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-bold text-[#1268f3] outline-none focus-visible:ring-2 focus-visible:ring-[#1268f3] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <span>{moreLabel}</span>
            <span
              aria-hidden="true"
              className="text-xl leading-none transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="space-y-4 border-t border-slate-200 px-5 py-5 text-base leading-7 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ) : (
        <div className="mt-5 space-y-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
        <p className="font-bold">{block.checklistTitle}</p>
        <ul className="mt-3 grid gap-3 text-base leading-7 sm:grid-cols-2">
          {block.bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <Check
                className="mt-1 size-5 shrink-0 rounded bg-[#b8e34a] p-0.5 text-[#071226]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="mt-5 border-l-4 border-[#b8e34a] bg-[#f4fbdc] px-5 py-4 text-base leading-7 text-[#071226] dark:bg-[#b8e34a]/10 dark:text-slate-100">
        <strong>{block.takeawayLabel}:</strong> {block.takeaway}
      </aside>
      {block.sources.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {sourcesLabel}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {block.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1268f3] hover:border-[#1268f3] dark:border-slate-700 dark:bg-slate-900"
                >
                  <Link2 className="size-4 shrink-0" aria-hidden="true" />
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {block.related ? (
        <p className="mt-5 text-base leading-7">
          <span className="font-bold">{relatedLabel}: </span>
          <Link href={block.related.href} className={INLINE_LINK_CLASS}>
            {block.related.label}
          </Link>
        </p>
      ) : null}
    </>
  );

  return (
    <div className="mt-9 space-y-10 border-t border-slate-200 pt-8 dark:border-slate-700">
      {blocks.map((block) =>
        parent === "quick" ? (
          <details
            key={block.id}
            id={block.id}
            className="group scroll-mt-36 rounded-2xl border border-[#1268f3]/20 bg-[#eef4ff] dark:border-slate-700 dark:bg-slate-800/70"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-bold text-[#071226] outline-none focus-visible:ring-2 focus-visible:ring-[#1268f3] focus-visible:ring-offset-2 dark:text-white [&::-webkit-details-marker]:hidden">
              <span>{quickMoreLabel}</span>
              <span
                aria-hidden="true"
                className="text-xl leading-none text-[#1268f3] transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="border-t border-[#1268f3]/15 px-5 pb-6 pt-2">
              {renderBlockBody(block, true, false)}
            </div>
          </details>
        ) : (
          <div key={block.id} id={block.id} className="scroll-mt-36">
            {renderBlockBody(block)}
          </div>
        ),
      )}
      <p className="rounded-xl bg-[#eef4ff] px-4 py-3 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {expansion.partnerSourceNote}
      </p>
    </div>
  );
}

function PrivacyEvidenceVisual({
  caption,
  reviewLocale,
}: {
  caption: string;
  reviewLocale: ReviewLocale;
}) {
  const steps =
    reviewLocale === "nl"
      ? ["Apparaat", "Versleutelde tunnel", "VPN-server", "Bestemming"]
      : ["Device", "Encrypted tunnel", "VPN server", "Destination"];

  return (
    <figure className="overflow-hidden rounded-2xl bg-[#071226] text-white">
      <div
        className="relative min-h-80 p-6 sm:p-8"
        role="img"
        aria-label={steps.join(", ")}
      >
        <div
          className="absolute -right-20 -top-24 size-64 rounded-full bg-[#1268f3]/35 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex min-h-64 flex-col justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full font-black ${index === 1 ? "bg-[#b8e34a] text-[#071226]" : "border border-white/20 bg-white/10 text-[#7ad9e8]"}`}
              >
                {index + 1}
              </span>
              <div
                className="h-px flex-1 bg-gradient-to-r from-[#7ad9e8] to-[#b8e34a]"
                aria-hidden="true"
              />
              <span className="w-32 text-right text-sm font-bold sm:w-40">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-white/10 bg-white/10 px-5 py-4 text-sm leading-6 text-slate-200">
        {caption}
      </figcaption>
    </figure>
  );
}

function AppControlsVisual({
  caption,
  reviewLocale,
}: {
  caption: string;
  reviewLocale: ReviewLocale;
}) {
  const items =
    reviewLocale === "nl"
      ? ["Protocol", "Kill switch", "Split tunneling", "Onveilige wifi"]
      : ["Protocol", "Kill switch", "Split tunnelling", "Unsafe Wi-Fi"];
  const icons = [Sparkles, ShieldCheck, MonitorSmartphone, Smartphone];

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-[#eef4ff] dark:border-slate-700 dark:bg-slate-800">
      <div
        className="grid min-h-80 grid-cols-2 gap-3 p-5 sm:p-7"
        role="img"
        aria-label={items.join(", ")}
      >
        {items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div
              key={item}
              className="flex flex-col justify-between rounded-2xl border border-[#1268f3]/15 bg-white p-4 shadow-sm dark:bg-slate-900"
            >
              <Icon className="size-7 text-[#1268f3]" aria-hidden="true" />
              <span className="mt-8 text-sm font-bold">{item}</span>
              <span
                className="mt-3 h-2 w-full rounded-full bg-gradient-to-r from-[#1268f3] via-[#7ad9e8] to-[#b8e34a]"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
      <figcaption className="border-t border-slate-200 bg-white/80 px-5 py-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        {caption}
      </figcaption>
    </figure>
  );
}

export async function NordVpnReviewEditorialPage({
  locale = "en",
}: {
  locale?: string;
}) {
  const reviewLocale = localeForReview(locale);
  const copy = copies[reviewLocale];
  const expansion = nordReviewSeoExpansion[reviewLocale];
  const faqs = expansion.paaFaqs;
  const estimatedWordCount = countWords(copy) + countWords(expansion);
  const readingMinutes = Math.max(1, Math.ceil(estimatedWordCount / 225));
  const vpn = getVpnById("nordvpn");
  if (!vpn) return null;

  const affiliateUrl = getVpnAffiliateUrl("nordvpn");
  const prefix = locale === "en" ? "" : `/${locale}`;
  const comparisonCandidates = [
    vpn,
    ...["surfshark", "protonvpn", "mullvad"]
      .map((slug) => vpnProviders.find((item) => item.slug === slug))
      .filter((item): item is VpnProvider => Boolean(item)),
  ];
  const comparisonRows = comparisonCandidates.flatMap((provider) => {
    const isCurrent = provider.slug === "nordvpn";
    const reviewHref = `/reviews/${provider.slug}`;
    const comparisonHref = `/compare/nordvpn-vs-${provider.slug}`;
    const targetHref = isAdmittedReviewLink(reviewHref, reviewLocale)
      ? reviewHref
      : isAdmittedReviewLink(comparisonHref, reviewLocale)
        ? comparisonHref
        : null;
    if (!targetHref) return [];

    const angle =
      reviewLocale === "nl"
        ? ((
            {
              nordvpn: "Eenvoudige apps voor veel apparaten",
              surfshark: "Veel apparaten op één account",
              protonvpn: "Privacy en apps met openbare broncode",
              mullvad: "Weinig accountgegevens en een eenvoudige prijs",
            } as Record<string, string>
          )[provider.slug] ?? "Een andere VPN")
        : ((
            {
              nordvpn: "Apps for most popular devices",
              surfshark: "Many devices on one account",
              protonvpn: "Privacy focus and open-source apps",
              mullvad: "Simple account and privacy-first design",
            } as Record<string, string>
          )[provider.slug] ?? "Another VPN");
    return [
      {
        provider,
        angle,
        evidence: isCurrent ? copy.evidenceRows[0].status : copy.methodLink,
        targetHref,
        next: isCurrent
          ? copy.nav[0]
          : targetHref === comparisonHref
            ? reviewLocale === "nl"
              ? `Open de vergelijking met ${provider.name}`
              : `Open the comparison with ${provider.name}`
            : reviewLocale === "nl"
              ? `Lees onze ${provider.name}-review`
              : `Read our ${provider.name} review`,
      },
    ];
  });
  const comparisonLinks = comparisonCandidates.flatMap((provider) => {
    if (provider.slug === "nordvpn") return [];
    const href = `/compare/nordvpn-vs-${provider.slug}`;
    return isAdmittedReviewLink(href, reviewLocale) ? [{ href, provider }] : [];
  });
  const toc = [
    ["#verdict", reviewLocale === "nl" ? "Samenvatting" : "Summary"],
    ["#quick-picks", copy.nav[0]],
    ["#evidence", copy.nav[1]],
    ["#performance", copy.nav[2]],
    ["#privacy", copy.nav[3]],
    ["#apps", copy.nav[4]],
    ["#pricing", copy.nav[5]],
    ["#compare", copy.nav[6]],
    ["#sources", copy.sourcesTitle],
    ["#final-verdict", copy.finalTitle],
    ["#faq", copy.nav[7]],
  ] as const;
  const allSources = Array.from(
    new Map(
      [
        ...copy.sources,
        ...expansion.blocks.flatMap((block) => block.sources),
      ].map((source) => [source.href, source]),
    ).values(),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: copy.h1,
            description: copy.metaDescription,
            datePublished: PUBLISHED_AT,
            dateModified: REVIEWED_AT,
            inLanguage: reviewLocale === "nl" ? "nl-NL" : "en-US",
            mainEntityOfPage: `https://www.zerotovpn.com${prefix}/reviews/nordvpn`,
            image: `https://www.zerotovpn.com${HERO_IMAGE}`,
            wordCount: estimatedWordCount,
            author: {
              "@type": "Person",
              "@id": `https://www.zerotovpn.com${prefix}/authors/marvin-smit#person`,
              name: "Marvin Smit",
              url: `https://www.zerotovpn.com${prefix}/authors/marvin-smit`,
            },
            reviewedBy: {
              "@type": "Person",
              "@id": `https://www.zerotovpn.com${prefix}/authors/marvin-smit#person`,
              name: "Marvin Smit",
            },
            publisher: {
              "@type": "Organization",
              name: "ZeroToVPN",
              logo: {
                "@type": "ImageObject",
                url: "https://www.zerotovpn.com/icon-512.png",
              },
            },
            about: {
              "@type": "SoftwareApplication",
              name: "NordVPN",
              applicationCategory: "VPN service",
            },
            citation: allSources.map((source) => source.href),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `https://www.zerotovpn.com${prefix}/authors/marvin-smit#person`,
            name: "Marvin Smit",
            url: `https://www.zerotovpn.com${prefix}/authors/marvin-smit`,
            image: "https://www.zerotovpn.com/images/team/marvin.webp",
            jobTitle: expansion.authorRole,
            worksFor: {
              "@type": "Organization",
              name: "ZeroToVPN",
              url: "https://www.zerotovpn.com",
            },
          }),
        }}
      />
      <BreadcrumbSchema
        items={[
          {
            name: copy.breadcrumbs[0],
            url: `https://www.zerotovpn.com${prefix}`,
          },
          {
            name: copy.breadcrumbs[1],
            url: `https://www.zerotovpn.com${prefix}/reviews`,
          },
          {
            name: copy.breadcrumbs[2],
            url: `https://www.zerotovpn.com${prefix}/reviews/nordvpn`,
          },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <article
        id="review-top"
        aria-labelledby="nordvpn-review-title"
        className="bg-[#f7f7f2] text-[#071226] dark:bg-slate-900 dark:text-white"
      >
        <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="container max-w-7xl py-8 lg:py-12">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <Link
                href="/"
                className="inline-flex min-h-12 min-w-12 items-center justify-center"
              >
                {copy.breadcrumbs[0]}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/reviews"
                className="inline-flex min-h-12 min-w-12 items-center justify-center"
              >
                {copy.breadcrumbs[1]}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">NordVPN</span>
            </nav>
            <header className="mt-7 max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1268f3]">
                {copy.independent}
              </p>
              <h1
                id="nordvpn-review-title"
                className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
              >
                {copy.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
                {expansion.directAnswer}
              </p>
              <AffiliateDisclosure
                variant="inline"
                className="mt-5 max-w-3xl"
                linkLabel={copy.fundingLink}
              />
              <div className="mt-3 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
                <ReviewCta
                  vpn={vpn}
                  copy={copy}
                  affiliateUrl={affiliateUrl}
                  className="min-h-12 bg-[#b8e34a] px-6 text-[#071226] hover:bg-[#a9d63d]"
                />
                <Link
                  href="/methodology"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#1268f3] hover:border-[#1268f3] dark:border-slate-700 dark:bg-slate-900"
                >
                  {copy.methodLink}
                </Link>
              </div>
              <aside className="mt-6 max-w-3xl rounded-2xl border border-[#1268f3]/20 bg-[#eef4ff] p-5 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1268f3]">
                  {expansion.researchScopeLabel}
                </p>
                <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {expansion.researchScope}
                </p>
              </aside>
            </header>

            <section
              id="verdict"
              className={`${styles.heroSection} scroll-mt-36 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900`}
            >
              <div className={styles.heroGrid}>
                <figure className={`${styles.heroFigure} bg-[#e9f2ff]`}>
                  <Image
                    src={HERO_IMAGE}
                    alt={
                      reviewLocale === "nl"
                        ? "Redactionele illustratie van een beveiligde VPN-verbinding op laptop en smartphone"
                        : "Editorial illustration of a secure VPN connection on a laptop and smartphone"
                    }
                    width={1200}
                    height={800}
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="h-full min-h-80 w-full object-cover lg:min-h-[32rem]"
                  />
                  <figcaption
                    className={`${styles.heroCaption} absolute inset-x-0 bottom-0 border-t border-slate-200/80 px-5 py-3 text-xs font-medium leading-5 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]`}
                  >
                    {copy.suppliedHeroCaption}
                  </figcaption>
                </figure>
                <div className="flex flex-col justify-center bg-[#071226] p-7 text-white sm:p-9 lg:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7ad9e8]">
                    {copy.verdictEyebrow}
                  </p>
                  <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#b8e34a]/50 bg-[#b8e34a]/10 px-4 py-2 text-sm font-bold text-[#b8e34a]">
                    <FileCheck2 className="size-4" aria-hidden="true" />
                    {copy.currentData}
                  </div>
                  <p className="mt-3 text-xs text-white/60">
                    {copy.evidenceRows[3].status} ·{" "}
                    <Link
                      href="/methodology"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      {copy.methodLink}
                    </Link>
                  </p>
                  <h2 className="mt-5 text-2xl font-bold">
                    {copy.verdictTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {copy.verdictBody}
                  </p>
                  <p className="mt-5 text-sm">
                    <span className="font-bold text-[#b8e34a]">
                      {copy.bestFor}:
                    </span>{" "}
                    {copy.bestForValue}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {copy.strengths.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check
                          className="mt-0.5 size-4 shrink-0 rounded bg-[#b8e34a] p-0.5 text-[#071226]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="flex gap-2">
                      <X
                        className="mt-0.5 size-4 shrink-0 rounded bg-orange-500 p-0.5 text-white"
                        aria-hidden="true"
                      />
                      <span>{copy.limitation}</span>
                    </li>
                  </ul>
                  <a
                    href="#pricing"
                    className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#b8e34a] px-6 py-3 text-sm font-bold text-[#071226] transition hover:bg-[#a9d63d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e34a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071226]"
                  >
                    {copy.heroCta}
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-center text-xs leading-5 text-white/65">
                    {copy.refundNote}
                  </p>
                </div>
              </div>
            </section>

            <div
              className={`${styles.reviewMetaBand} mt-4 rounded-2xl border border-slate-200 bg-[#fbfcff] shadow-sm dark:border-slate-700 dark:bg-slate-900`}
            >
              <div className="flex flex-col justify-center gap-3">
                <Link
                  href="/authors/marvin-smit"
                  className="flex min-h-12 items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1268f3]"
                >
                  <Image
                    src="/images/team/marvin.webp"
                    alt=""
                    width={38}
                    height={38}
                    className="size-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-[#071226] underline decoration-slate-300 underline-offset-4 hover:decoration-[#1268f3] dark:text-white">
                    {copy.byline}
                  </span>
                </Link>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                    {expansion.publishedLabel}:{" "}
                    <time dateTime={PUBLISHED_AT}>
                      {formattedDate(PUBLISHED_AT, reviewLocale)}
                    </time>
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                    {expansion.updatedLabel}:{" "}
                    <time dateTime={REVIEWED_AT}>
                      {formattedDate(REVIEWED_AT, reviewLocale)}
                    </time>
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                    {expansion.readingTimeLabel}: {readingMinutes}{" "}
                    {expansion.minuteLabel}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                    {copy.lastTested}: {copy.evidenceRows[3].status}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-[#eef4ff] p-4 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <FileCheck2
                  className="mt-1 size-4 shrink-0 text-[#1268f3]"
                  aria-hidden="true"
                />
                <p>{copy.evidencePolicy}</p>
              </div>
              <AffiliateDisclosure
                variant="card"
                className={styles.reviewDisclosure}
                linkLabel={copy.fundingLink}
              />
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900">
          <nav
            aria-label={copy.tocTitle}
            className="container flex max-w-7xl gap-1 overflow-x-auto py-2"
          >
            {toc.map(([href, label], index) => (
              <a
                key={href}
                href={href}
                className={`inline-flex min-h-12 items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-[#eaf1ff] hover:text-[#1268f3] dark:hover:bg-slate-800 ${index === 0 ? "bg-[#eaf1ff] text-[#1268f3] dark:bg-slate-800" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <ReviewReadingProgress
            label={reviewLocale === "nl" ? "Leesvoortgang" : "Reading progress"}
          />
        </div>

        <div className="container max-w-7xl py-8 lg:py-12">
          <AtAGlance
            vpn={vpn}
            copy={copy}
            affiliateUrl={affiliateUrl}
            reviewLocale={reviewLocale}
            className={`${styles.mobileGlance} mb-8`}
          />
          <div className={styles.bodyGrid}>
            <aside className={styles.desktopSidebar}>
              <div className={`${styles.stickySidebar} space-y-5`}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="font-bold">{copy.tocTitle}</p>
                  <nav
                    aria-label={copy.tocTitle}
                    className="mt-4 flex flex-col gap-1 text-sm"
                  >
                    {toc.map(([href, label]) => (
                      <a
                        key={href}
                        href={href}
                        className="inline-flex min-h-12 items-center rounded-lg px-2 text-slate-600 hover:bg-[#eef4ff] hover:text-[#1268f3] dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="rounded-2xl border border-[#b8e34a]/60 bg-[#f4fbdc] p-5 dark:bg-[#b8e34a]/10">
                  <ShieldCheck
                    className="size-6 text-[#1268f3]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-bold">{copy.methodTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {copy.methodBody}
                  </p>
                  <Link
                    href="/methodology"
                    className="mt-3 inline-flex min-h-12 items-center gap-1 text-sm font-bold text-[#1268f3]"
                  >
                    {copy.methodLink}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-10">
              <section
                id="quick-picks"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {copy.quickTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {copy.quickIntro}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      Lees eerst{" "}
                      <Link href="/methodology" className={INLINE_LINK_CLASS}>
                        hoe we VPN-providers beoordelen
                      </Link>{" "}
                      en leg dit oordeel daarna naast onze{" "}
                      <Link href="/best/best-vpn" className={INLINE_LINK_CLASS}>
                        actuele vergelijking van de beste VPN&apos;s
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      Start with{" "}
                      <Link href="/methodology" className={INLINE_LINK_CLASS}>
                        how we evaluate VPN providers
                      </Link>
                      , then place this verdict alongside our{" "}
                      <Link href="/best/best-vpn" className={INLINE_LINK_CLASS}>
                        current best VPN comparison
                      </Link>
                      .
                    </>
                  )}
                </p>
                <div className="mt-7 grid gap-6">
                  <div>
                    <div className="grid gap-3">
                      {copy.statusCards.map((item, index) => {
                        const Icon = [
                          ShieldCheck,
                          MonitorSmartphone,
                          FileCheck2,
                        ][index];
                        return (
                          <article
                            key={item.title}
                            className="rounded-xl border border-[#1268f3]/15 bg-white p-4 dark:bg-slate-900"
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${index === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" : index === 1 ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" : "bg-[#f4fbdc] text-[#4f6814] dark:bg-[#b8e34a]/10 dark:text-[#b8e34a]"}`}
                              >
                                <Icon className="size-5" aria-hidden="true" />
                              </span>
                              <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="mt-2 inline-flex rounded-full bg-[#eef4ff] px-2.5 py-1 text-xs font-bold text-[#1268f3] dark:bg-slate-800 dark:text-cyan-300">
                                  {item.status}
                                </p>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                              {item.body}
                            </p>
                          </article>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                      {copy.scoreNote}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/20">
                      <h3 className="flex items-center gap-2 font-bold text-green-800 dark:text-green-300">
                        <CheckCircle2 className="size-5" />
                        {copy.prosTitle}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-5">
                        {copy.pros.map((item) => (
                          <li key={item} className="flex gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-green-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950/20">
                      <h3 className="flex items-center gap-2 font-bold text-orange-800 dark:text-orange-300">
                        <Info className="size-5" />
                        {copy.consTitle}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-5">
                        {copy.cons.map((item) => (
                          <li key={item} className="flex gap-2">
                            <X className="mt-0.5 size-4 shrink-0 text-orange-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                    <h3 className="font-bold text-[#1268f3]">
                      {copy.chooseTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {reviewLocale === "nl" ? (
                        <>
                          <Link href="/quiz" className={INLINE_LINK_CLASS}>
                            Gebruik de keuzehulp
                          </Link>{" "}
                          als je één VPN-dienst op meerdere soorten apparaten
                          wilt. Test wel zelf de servers en diensten die voor
                          jou belangrijk zijn.
                        </>
                      ) : (
                        <>
                          <Link
                            href="/guides/vpn-for-travel"
                            className={INLINE_LINK_CLASS}
                          >
                            Travellers
                          </Link>{" "}
                          and households that use the VPN on computers, phones
                          and TV devices and are comfortable using a large VPN
                          company.
                        </>
                      )}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                    <h3 className="font-bold text-orange-700 dark:text-orange-400">
                      {copy.skipTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {reviewLocale === "nl" ? (
                        <>
                          Kijk verder als openbare broncode, contante betaling,
                          port forwarding of de laagst mogelijke verlengprijs
                          belangrijk voor je is. Je kunt dan{" "}
                          <Link
                            href="/best/best-vpn"
                            className={INLINE_LINK_CLASS}
                          >
                            andere VPN-keuzes vergelijken
                          </Link>
                          .
                        </>
                      ) : (
                        <>
                          Compare other VPNs if you want open-source apps first,
                          cash payment without a name,{" "}
                          <Link
                            href="/best/vpn-port-forwarding"
                            className={INLINE_LINK_CLASS}
                          >
                            port forwarding
                          </Link>
                          , or the lowest renewal price.
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <ReviewDetailBlocks
                  parent="quick"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="evidence"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1268f3]">
                  {copy.currentData}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {copy.evidenceTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {copy.evidenceIntro}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      Voor de context achter loggingclaims lees je onze{" "}
                      <Link
                        href="/guides/vpn-privacy-guide"
                        className={INLINE_LINK_CLASS}
                      >
                        VPN-privacygids
                      </Link>
                      ; het{" "}
                      <Link href="/reports" className={INLINE_LINK_CLASS}>
                        rapportenoverzicht
                      </Link>{" "}
                      laat zien hoe we bewijs tussen providers scheiden.
                    </>
                  ) : (
                    <>
                      For context behind logging claims, read our{" "}
                      <Link
                        href="/guides/vpn-privacy-guide"
                        className={INLINE_LINK_CLASS}
                      >
                        VPN privacy guide
                      </Link>
                      ; the{" "}
                      <Link href="/reports" className={INLINE_LINK_CLASS}>
                        reports hub
                      </Link>{" "}
                      shows how we separate evidence across providers.
                    </>
                  )}
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                  <table
                    className="w-full text-left text-sm"
                    style={{ minWidth: "38rem" }}
                  >
                    <caption className="sr-only">
                      {copy.evidenceCaption}
                    </caption>
                    <thead className="bg-[#071226] text-white">
                      <tr>
                        <th scope="col" className="p-4">
                          {copy.nav[1]}
                        </th>
                        <th scope="col" className="p-4">
                          {copy.currentData}
                        </th>
                        <th scope="col" className="p-4">
                          {copy.unknown}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {copy.evidenceRows.map((row) => (
                        <tr
                          key={row.question}
                          className="border-t border-slate-200 align-top dark:border-slate-700"
                        >
                          <th scope="row" className="p-4">
                            <span className="font-bold">{row.question}</span>
                            <span className="mt-2 block w-fit rounded-full bg-[#eaf1ff] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1268f3]">
                              {row.status}
                            </span>
                          </th>
                          <td className="p-4 leading-6 text-slate-600 dark:text-slate-300">
                            {row.evidence}
                          </td>
                          <td className="p-4 leading-6 text-slate-600 dark:text-slate-300">
                            {row.limit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ReviewDetailBlocks
                  parent="evidence"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="performance"
                className="scroll-mt-36 rounded-3xl bg-[#071226] p-6 text-white sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7ad9e8]">
                  {copy.nav[2]}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {copy.performanceTitle}
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                  {copy.performanceIntro}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      Zelf meten? Gebruik onze{" "}
                      <Link
                        href="/speed-test"
                        className="font-semibold text-[#7ad9e8] underline decoration-[#7ad9e8]/40 underline-offset-4 hover:decoration-[#7ad9e8]"
                      >
                        VPN-snelheidstest
                      </Link>{" "}
                      en lees waarom de{" "}
                      <Link
                        href="/guides/vpn-speed-guide"
                        className="font-semibold text-[#7ad9e8] underline decoration-[#7ad9e8]/40 underline-offset-4 hover:decoration-[#7ad9e8]"
                      >
                        uitleg over VPN-prestaties
                      </Link>{" "}
                      de uitkomst kan veranderen.
                    </>
                  ) : (
                    <>
                      Want to measure it yourself? Use our{" "}
                      <Link
                        href="/speed-test"
                        className="font-semibold text-[#7ad9e8] underline decoration-[#7ad9e8]/40 underline-offset-4 hover:decoration-[#7ad9e8]"
                      >
                        VPN speed test
                      </Link>{" "}
                      and learn why{" "}
                      <Link
                        href="/guides/vpn-protocols-explained"
                        className="font-semibold text-[#7ad9e8] underline decoration-[#7ad9e8]/40 underline-offset-4 hover:decoration-[#7ad9e8]"
                      >
                        VPN protocol choice
                      </Link>{" "}
                      can change the result.
                    </>
                  )}
                </p>
                <div className="mt-7 grid gap-5 xl:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                    <h3 className="font-bold">{copy.scorecardTitle}</h3>
                    <div
                      className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                      role="img"
                      aria-label={copy.scorecardNote}
                    >
                      {copy.process.map((item, index) => (
                        <div key={item.title} className="contents">
                          <div className="flex min-h-28 flex-1 flex-col justify-center rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
                            <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-[#b8e34a] font-black text-[#071226]">
                              {index + 1}
                            </span>
                            <span className="mt-3 text-sm font-bold">
                              {item.title}
                            </span>
                          </div>
                          {index < copy.process.length - 1 ? (
                            <ArrowRight
                              className="mx-auto size-5 shrink-0 rotate-90 text-[#7ad9e8] sm:rotate-0"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs leading-5 text-slate-400">
                      {copy.scorecardNote}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {copy.process.map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/15 bg-white/5 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#b8e34a] font-black text-[#071226]">
                            {index + 1}
                          </span>
                          <h3 className="font-bold">{item.title}</h3>
                        </div>
                        <p className="mt-2 pl-11 text-sm leading-6 text-slate-300">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 rounded-2xl bg-white p-5 text-[#071226] dark:bg-slate-900 dark:text-white sm:p-6">
                  <ReviewDetailBlocks
                    parent="performance"
                    expansion={expansion}
                    reviewLocale={reviewLocale}
                  />
                </div>
              </section>

              <section
                id="privacy"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {copy.privacyTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {copy.privacyIntro}
                </p>
                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                  <PrivacyEvidenceVisual
                    caption={copy.privacyImageCaption}
                    reviewLocale={reviewLocale}
                  />
                  <div className="min-w-0 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                    <table
                      className="w-full text-left text-sm"
                      style={{ minWidth: "30rem" }}
                    >
                      <caption className="sr-only">{copy.specsCaption}</caption>
                      <tbody>
                        {copy.specs.map(([label, value]) => (
                          <tr
                            key={label}
                            className="border-t first:border-t-0 dark:border-slate-700"
                          >
                            <th
                              scope="row"
                              className="w-2/5 bg-slate-50 p-4 font-bold dark:bg-slate-800"
                            >
                              {label}
                            </th>
                            <td className="p-4 leading-6 text-slate-600 dark:text-slate-300">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-[#b8e34a]/60 bg-[#f4fbdc] p-5 dark:bg-[#b8e34a]/10">
                  <h3 className="font-bold">{copy.auditTitle}</h3>
                  <div
                    className="mt-4 flex items-center gap-2 overflow-x-auto pb-2"
                    aria-label={copy.auditTitle}
                  >
                    {["2018", "2020", "2022", "2023", "2024", "2025"].map(
                      (year, index) => (
                        <div
                          key={year}
                          className="flex min-w-max items-center gap-2"
                        >
                          <span className="rounded-full bg-[#071226] px-3 py-1.5 text-xs font-bold text-white">
                            {year}
                          </span>
                          {index < 5 ? (
                            <span
                              className="h-px w-5 bg-[#1268f3]"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                      ),
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {copy.auditNote}
                  </p>
                </div>
                <ReviewDetailBlocks
                  parent="privacy"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="apps"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {copy.appsTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      NordVPN heeft apps voor Windows, macOS, Android, iPhone,
                      Linux en tv. Niet elke functie werkt op ieder platform
                      hetzelfde. Bekijk ook de{" "}
                      <Link
                        href="/guides/what-is-vpn"
                        className={INLINE_LINK_CLASS}
                      >
                        VPN-basisgids
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      NordVPN has apps for Windows, macOS, Android, iPhone,
                      Linux and TV devices. Features may differ by platform. See
                      also the{" "}
                      <Link
                        href="/best/vpn-mobile"
                        className={INLINE_LINK_CLASS}
                      >
                        Android and iPhone apps
                      </Link>
                      .
                    </>
                  )}
                </p>
                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                  <AppControlsVisual
                    caption={copy.settingsCaption}
                    reviewLocale={reviewLocale}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {copy.appCards.map((item, index) => {
                      const Icon = [
                        Sparkles,
                        ShieldCheck,
                        MonitorSmartphone,
                        Smartphone,
                      ][index];
                      return (
                        <article
                          key={item.title}
                          className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700"
                        >
                          <Icon
                            className="size-6 text-[#1268f3]"
                            aria-hidden="true"
                          />
                          <h3 className="mt-3 font-bold">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {item.body}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <ReviewDetailBlocks
                  parent="apps"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="pricing"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {copy.pricingTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {copy.pricingIntro}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      Wil je de voorwaarden zelf controleren?{" "}
                      {affiliateUrl ? (
                        <AffiliateTextLink
                          vpnId={vpn.id}
                          vpnName={vpn.name}
                          affiliateUrl={affiliateUrl}
                          dataPriceLink
                          className={INLINE_AFFILIATE_LINK_CLASS}
                        >
                          Open de actuele betaalpagina en bekijk ook de
                          verlengprijs
                        </AffiliateTextLink>
                      ) : (
                        <Link href="/compare" className={INLINE_LINK_CLASS}>
                          vergelijk de beschikbare VPN-alternatieven
                        </Link>
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {affiliateUrl ? "(partnerlink)" : null}
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Want to check the terms yourself?{" "}
                      {affiliateUrl ? (
                        <AffiliateTextLink
                          vpnId={vpn.id}
                          vpnName={vpn.name}
                          affiliateUrl={affiliateUrl}
                          dataPriceLink
                          className={INLINE_AFFILIATE_LINK_CLASS}
                        >
                          Open NordVPN&apos;s current order page and check the
                          renewal price
                        </AffiliateTextLink>
                      ) : (
                        <Link href="/compare" className={INLINE_LINK_CLASS}>
                          compare the available VPN alternatives
                        </Link>
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {affiliateUrl ? "(partner link)" : null}
                      </span>
                      .
                    </>
                  )}
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[copy.monthly, copy.annual, copy.longTerm].map(
                    (label, index) => (
                      <article
                        key={label}
                        className={`relative rounded-2xl border p-5 ${index === 2 ? "border-[#1268f3] bg-[#f5f8ff] dark:bg-[#1268f3]/10" : "border-slate-200 dark:border-slate-700"}`}
                      >
                        <p className="text-sm font-bold">{label}</p>
                        <p className="mt-4 text-lg font-black text-[#1268f3]">
                          {copy.pricingUnknown}
                        </p>
                        <p className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">
                          {copy.billingNote}
                        </p>
                        <ReviewCta
                          vpn={vpn}
                          copy={copy}
                          affiliateUrl={affiliateUrl}
                          label={copy.livePrice}
                          className={`mt-5 w-full ${styles.pricingCta}`}
                        />
                      </article>
                    ),
                  )}
                </div>
                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                  <Info className="mt-1 size-4 shrink-0" />
                  {copy.billingNote}
                </p>
                <aside className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950/20">
                  <h3 className="flex items-center gap-2 font-bold">
                    <CircleDollarSign className="size-5 text-orange-600" />
                    {copy.renewalTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {copy.renewalBody}
                  </p>
                </aside>
                <ReviewDetailBlocks
                  parent="pricing"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="compare"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {copy.comparisonTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {copy.comparisonIntro}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {reviewLocale === "nl" ? (
                    <>
                      Gebruik de{" "}
                      <Link href="/compare" className={INLINE_LINK_CLASS}>
                        VPN-vergelijker
                      </Link>{" "}
                      om functies naast elkaar te zetten. In onze{" "}
                      <Link
                        href="/editorial-policy"
                        className={INLINE_LINK_CLASS}
                      >
                        redactionele regels
                      </Link>{" "}
                      lees je hoe we betaalde links buiten het oordeel houden.
                    </>
                  ) : (
                    <>
                      Use our{" "}
                      <Link href="/compare" className={INLINE_LINK_CLASS}>
                        VPN comparison tool
                      </Link>{" "}
                      to compare features. Our{" "}
                      <Link
                        href="/editorial-policy"
                        className={INLINE_LINK_CLASS}
                      >
                        editorial policy
                      </Link>{" "}
                      explains how we keep paid links out of the verdict.
                    </>
                  )}
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                  <table
                    className="w-full text-left text-sm"
                    style={{ minWidth: "38rem" }}
                  >
                    <caption className="sr-only">
                      {copy.comparisonCaption}
                    </caption>
                    <thead className="bg-[#071226] text-white">
                      <tr>
                        {copy.comparisonHeaders.map((header) => (
                          <th key={header} scope="col" className="p-4">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr
                          key={row.provider.slug}
                          className={`border-t border-slate-200 dark:border-slate-700 ${row.provider.slug === "nordvpn" ? "bg-[#f4fbdc] dark:bg-[#b8e34a]/10" : ""}`}
                        >
                          <th scope="row" className="p-4">
                            <Link
                              href={row.targetHref}
                              className="font-bold text-[#1268f3] hover:underline"
                            >
                              {row.provider.name}
                            </Link>
                          </th>
                          <td className="p-4">{row.angle}</td>
                          <td className="p-4">{row.evidence}</td>
                          <td className="p-4">
                            <Link
                              href={row.targetHref}
                              className="font-semibold text-[#1268f3] hover:underline"
                            >
                              {row.next}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {comparisonLinks.map(({ href, provider }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex min-h-12 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:border-[#1268f3] hover:text-[#1268f3] dark:border-slate-700"
                    >
                      NordVPN vs {provider.name}
                      <ArrowRight className="size-4" />
                    </Link>
                  ))}
                </div>
                <ReviewDetailBlocks
                  parent="compare"
                  expansion={expansion}
                  reviewLocale={reviewLocale}
                />
              </section>

              <section
                id="sources"
                className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              >
                <h2 className="text-2xl font-bold">{copy.sourcesTitle}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {copy.sourcesIntro} {expansion.partnerSourceNote}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {allSources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-12 items-start gap-2 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-[#1268f3] hover:border-[#1268f3] dark:border-slate-700"
                      >
                        <Link2
                          className="mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-muted-foreground">
                  {expansion.publishedLabel}:{" "}
                  <time dateTime={PUBLISHED_AT}>
                    {formattedDate(PUBLISHED_AT, reviewLocale)}
                  </time>{" "}
                  · {expansion.updatedLabel}:{" "}
                  <time dateTime={REVIEWED_AT}>
                    {formattedDate(REVIEWED_AT, reviewLocale)}
                  </time>{" "}
                  · {copy.lastTested}: {copy.evidenceRows[3].status}
                </p>
              </section>
            </div>

            <div className={styles.desktopSidebar}>
              <div className={styles.stickySidebar}>
                <AtAGlance
                  vpn={vpn}
                  copy={copy}
                  affiliateUrl={affiliateUrl}
                  reviewLocale={reviewLocale}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <section
              id="final-verdict"
              className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-bold">{copy.finalTitle}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                {copy.finalBody}
              </p>
              <p className="mt-4 text-base font-bold">{copy.finalBestFor}</p>
              <ReviewCta
                vpn={vpn}
                copy={copy}
                affiliateUrl={affiliateUrl}
                className="mt-5 w-full bg-[#b8e34a] text-[#071226] hover:bg-[#a9d63d]"
              />
            </section>
            <section
              id="faq"
              className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-bold">{copy.faqTitle}</h2>
              <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-1">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold">
                      <span>{faq.question}</span>
                      <span
                        className="text-[#1268f3] transition group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
            <section className="relative overflow-hidden rounded-3xl bg-[#071226] p-6 text-white">
              <div
                className="absolute right-0 top-0 size-28 rounded-bl-full bg-[#b8e34a] opacity-90"
                aria-hidden="true"
              />
              <Laptop
                className="relative size-7 text-[#7ad9e8]"
                aria-hidden="true"
              />
              <p className="relative mt-4 text-2xl font-bold">
                {copy.newsletterTitle}
              </p>
              <p className="relative mt-3 text-base leading-7 text-slate-300">
                {copy.newsletterBody}
              </p>
              <NewsletterForm
                variant="inline"
                source="nordvpn-review"
                className="relative mt-5 text-slate-200"
              />
            </section>
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xl font-bold">{copy.relatedTitle}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/best/best-vpn"
                className="inline-flex min-h-12 items-center rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-bold text-[#1268f3]"
              >
                {reviewLocale === "nl" ? "Beste VPN" : "Best VPN"}
              </Link>
              <Link
                href={
                  reviewLocale === "nl"
                    ? "/guides/vpn-privacy-guide"
                    : "/best/vpn-privacy"
                }
                className="inline-flex min-h-12 items-center rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-bold text-[#1268f3]"
              >
                {reviewLocale === "nl"
                  ? "Beste VPN voor privacy"
                  : "Best VPN for privacy"}
              </Link>
              <Link
                href="/reports"
                className="inline-flex min-h-12 items-center rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-bold text-[#1268f3]"
              >
                {reviewLocale === "nl"
                  ? "Transparantierapport"
                  : "Transparency report"}
              </Link>
              <Link
                href="/methodology"
                className="inline-flex min-h-12 items-center rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-bold text-[#1268f3]"
              >
                {copy.methodLink}
              </Link>
              <Link
                href="/affiliate-disclosure"
                className="inline-flex min-h-12 items-center rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-bold text-[#1268f3]"
              >
                {copy.fundingLink}
              </Link>
            </div>
          </section>

          <section className="mt-8 grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <Image
              src="/images/team/marvin.webp"
              alt=""
              width={112}
              height={112}
              className="size-24 rounded-2xl object-cover sm:size-28"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1268f3]">
                {expansion.authorHeading}
              </p>
              <p className="mt-2 text-2xl font-bold">Marvin Smit</p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {expansion.authorRole}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {expansion.authorBio}
              </p>
              <Link
                href="/authors/marvin-smit"
                className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#eef4ff] px-4 py-2 text-sm font-bold text-[#1268f3] hover:bg-[#dfeaff] dark:bg-slate-800"
              >
                {expansion.authorLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <a
              href="#review-top"
              className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#1268f3] hover:border-[#1268f3] dark:border-slate-700 dark:bg-slate-900"
            >
              {expansion.backToTop}
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
