export type PolicyLocale = "en" | "nl";
export type PolicyKind = "privacy" | "cookies";

export interface PolicyFact {
  id: string;
  title: string;
  body: string;
}

export interface PolicyRegisterItem {
  id: string;
  title: string;
  badge: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
}

export interface PolicyService {
  name: string;
  purpose: string;
  detail: string;
  href: string;
  linkLabel: string;
}

export interface PolicyPageCopy {
  locale: PolicyLocale;
  kind: PolicyKind;
  meta: {
    title: string;
    description: string;
  };
  breadcrumb: {
    home: string;
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    directAnswer: string;
    cues: string[];
    updatedLabel: string;
    updated: string;
  };
  map: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PolicyFact[];
  };
  register: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: [string, string, string, string];
    items: PolicyRegisterItem[];
  };
  explanation: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{
      title: string;
      body: string;
      bullets: string[];
    }>;
    noteTitle: string;
    note: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PolicyService[];
  };
  controls: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    emailLabel: string;
    emailSubject: string;
    safetyNote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  related: {
    title: string;
    items: Array<{ href: string; title: string; body: string }>;
  };
  footerNote: string;
}

export function isPolicyLocale(locale: string): locale is PolicyLocale {
  return locale === "en" || locale === "nl";
}

const services = {
  en: {
    vercel: {
      name: "Vercel",
      purpose: "Hosting and request delivery",
      detail:
        "Vercel receives ordinary request data, including a public IP address and technical headers, and can keep platform logs or logs from server functions.",
      href: "https://vercel.com/legal/privacy-policy",
      linkLabel: "Read Vercel's notice",
    },
    google: {
      name: "Google",
      purpose: "Analytics and production advertising",
      detail:
        "Google Consent Mode starts with storage denied. Limited cookieless pings can still be sent. Accepted consent enables the Google storage and advertising signals listed below.",
      href: "https://policies.google.com/technologies/partner-sites",
      linkLabel: "How Google uses site data",
    },
    convex: {
      name: "Convex",
      purpose: "Newsletter and visitor-review records",
      detail:
        "The newsletter endpoint passes the email address, language, signup source, consent status, consent-version label and server consent time to a shared Convex lead service. The visitor-review endpoint also sends the submitted review, display name, email address and technical request details to that service for moderation.",
      href: "https://www.convex.dev/legal/privacy",
      linkLabel: "Read Convex's notice",
    },
    stack: {
      name: "Stack Auth (Hexclave)",
      purpose: "Separate site-operator sign-in",
      detail:
        "The /handler sign-in flow uses the Stack Auth SDK. Its current nextjs-cookie token store can keep authentication and session material in first-party cookies. Public pages do not require this sign-in.",
      href: "https://docs.stack-auth.com/docs/rest-api/overview",
      linkLabel: "Read the Stack Auth documentation",
    },
    resend: {
      name: "Resend",
      purpose: "Newsletter email delivery",
      detail:
        "For a new signup, Resend receives the email address and language needed to send the welcome message. It also handles an email if it is used for later newsletter delivery.",
      href: "https://resend.com/legal/privacy-policy",
      linkLabel: "Read Resend's notice",
    },
    cloudflare: {
      name: "Cloudflare Speed",
      purpose: "Speed-test traffic",
      detail:
        "When a visitor starts the speed test, the browser connects directly to Cloudflare. Cloudflare sees the network request and public IP address.",
      href: "https://www.cloudflare.com/privacypolicy/",
      linkLabel: "Read Cloudflare's notice",
    },
    shortio: {
      name: "Short.io and destination sites",
      purpose: "Outbound commercial links",
      detail:
        "A commercial click can pass through go.zerotovpn.com. Short.io and the destination provider receive the outbound request and apply their own policies.",
      href: "https://short.io/uk/privacy/",
      linkLabel: "Read Short.io's notice",
    },
    browserleaks: {
      name: "BrowserLeaks",
      purpose: "Optional external DNS test",
      detail:
        "The guided DNS page links to BrowserLeaks in a new tab. That external site receives the visit only when the visitor opens it; ZeroToVPN does not control it.",
      href: "https://browserleaks.com/dns",
      linkLabel: "Open the external DNS test",
    },
  },
  nl: {
    vercel: {
      name: "Vercel",
      purpose: "Hosting en afleveren van pagina's",
      detail:
        "Vercel ontvangt normale aanvraaggegevens, zoals een openbaar IP-adres en technische headers. Het platform kan ook aanvraaglogs en logs van serverfuncties bewaren.",
      href: "https://vercel.com/legal/privacy-policy",
      linkLabel: "Lees de uitleg van Vercel",
    },
    google: {
      name: "Google",
      purpose: "Analyse en advertenties in productie",
      detail:
        "Google Consent Mode begint met opslag geweigerd. Er kunnen wel beperkte pings zonder cookies worden verstuurd. Na akkoord worden de hieronder genoemde Google-signalen aangezet.",
      href: "https://policies.google.com/technologies/partner-sites?hl=nl",
      linkLabel: "Hoe Google sitegegevens gebruikt",
    },
    convex: {
      name: "Convex",
      purpose: "Nieuwsbrief- en bezoekersreviews",
      detail:
        "Het nieuwsbriefpunt stuurt het e-mailadres, de taal, de plek van inschrijving, toestemmingsstatus, versie van de toestemming en het servermoment van toestemming naar een gedeelde Convex-dienst. Het punt voor bezoekersreviews stuurt ook de ingezonden review, weergavenaam, het e-mailadres en technische aanvraaggegevens naar die dienst voor moderatie.",
      href: "https://www.convex.dev/legal/privacy",
      linkLabel: "Lees de uitleg van Convex",
    },
    stack: {
      name: "Stack Auth (Hexclave)",
      purpose: "Aparte login voor de sitebeheerder",
      detail:
        "De login onder /handler gebruikt de Stack Auth-SDK. De huidige tokenopslag nextjs-cookie kan authenticatie- en sessiegegevens in first-party cookies bewaren. Openbare pagina's hebben deze login niet nodig.",
      href: "https://docs.stack-auth.com/docs/rest-api/overview",
      linkLabel: "Lees de documentatie van Stack Auth",
    },
    resend: {
      name: "Resend",
      purpose: "E-mails van de nieuwsbrief versturen",
      detail:
        "Bij een nieuwe inschrijving ontvangt Resend het e-mailadres en de taal die nodig zijn voor de welkomstmail. De dienst verwerkt ook een e-mail als hij later voor de nieuwsbrief wordt gebruikt.",
      href: "https://resend.com/legal/privacy-policy",
      linkLabel: "Lees de uitleg van Resend",
    },
    cloudflare: {
      name: "Cloudflare Speed",
      purpose: "Verkeer van de snelheidstest",
      detail:
        "Als een bezoeker de snelheidstest start, maakt de browser direct verbinding met Cloudflare. Cloudflare ziet de netwerkaanvraag en het openbare IP-adres.",
      href: "https://www.cloudflare.com/privacypolicy/",
      linkLabel: "Lees de uitleg van Cloudflare",
    },
    shortio: {
      name: "Short.io en de bezochte site",
      purpose: "Uitgaande commerciële links",
      detail:
        "Een commerciële klik kan via go.zerotovpn.com lopen. Short.io en de VPN-aanbieder ontvangen de uitgaande aanvraag en gebruiken hun eigen beleid.",
      href: "https://short.io/uk/privacy/",
      linkLabel: "Lees de uitleg van Short.io",
    },
    browserleaks: {
      name: "BrowserLeaks",
      purpose: "Optionele externe DNS-test",
      detail:
        "De begeleide DNS-pagina linkt in een nieuw tabblad naar BrowserLeaks. Die externe site ontvangt het bezoek pas als de bezoeker de link opent. ZeroToVPN beheert die site niet.",
      href: "https://browserleaks.com/dns",
      linkLabel: "Open de externe DNS-test",
    },
  },
} satisfies Record<PolicyLocale, Record<string, PolicyService>>;

const privacyCopy: Record<PolicyLocale, PolicyPageCopy> = {
  en: {
    locale: "en",
    kind: "privacy",
    meta: {
      title: "Privacy policy: what data moves on ZeroToVPN",
      description:
        "A plain-English map of ZeroToVPN data flows: hosting, newsletter, visitor reviews, operator sign-in, analytics, advertising, affiliate clicks and browser-based VPN tools.",
    },
    breadcrumb: { home: "Home", current: "Privacy policy" },
    hero: {
      eyebrow: "Privacy at ZeroToVPN",
      title: "What data moves when you use this site?",
      intro:
        "This page separates data kept in your browser, data handled by ZeroToVPN features, technical hosting records and visits to outside services. It does not claim that using a website leaves no trace.",
      directLabel: "The short answer",
      directAnswer:
        "You can read ZeroToVPN without an account. A public IP address and technical request data still reach our host. Some tools and links connect your browser to another service. Newsletter and visitor-review forms use an email address, while the separate site-operator login uses Stack Auth.",
      cues: [
        "No account needed to read",
        "Tool limits are shown",
        "Privacy questions by email",
      ],
      updatedLabel: "Checked against the current site code",
      updated: "17 August 2026",
    },
    map: {
      eyebrow: "Start with the location",
      title: "Four places are easy to mix up",
      intro:
        "A cookie, a server log and an outside website are not the same thing. This map makes that difference visible.",
      items: [
        {
          id: "browser",
          title: "In your browser",
          body: "Language, theme, consent, tool history and dismissed prompts can be kept in cookie, localStorage or sessionStorage on the device you use.",
        },
        {
          id: "feature",
          title: "In a ZeroToVPN feature",
          body: "Newsletter signup, visitor-review submission and commercial-click measurement send defined fields through ZeroToVPN endpoints. The exact fields are listed below.",
        },
        {
          id: "host",
          title: "At a host or service provider",
          body: "Vercel delivers the site. Convex, Resend, Stack Auth and Google handle defined tasks. Their infrastructure can keep its own operational records.",
        },
        {
          id: "external",
          title: "At an outside site",
          body: "Cloudflare Speed, BrowserLeaks, Short.io and VPN-provider sites receive a request only when the related test or link is used.",
        },
      ],
    },
    register: {
      eyebrow: "Data-flow register",
      title: "What happens, feature by feature",
      intro:
        "These entries describe the current code. A hosting platform or another service may also create normal security, request or delivery logs under its own settings.",
      labels: ["When", "What moves", "Where", "Known limit"],
      items: [
        {
          id: "browsing",
          title: "Reading pages",
          badge: "Automatic",
          first: "When a page or asset is requested.",
          second:
            "Public IP address, browser request headers, requested path and normal delivery information. Google also receives consent-aware measurement requests.",
          third:
            "Vercel delivers the request. Google tags load with storage denied by default; limited cookieless pings can still be sent.",
          fourth:
            "ZeroToVPN does not publish one fixed lifetime for hosting or Google operational records. Their settings and policies apply.",
        },
        {
          id: "newsletter",
          title: "Newsletter signup",
          badge: "After consent",
          first: "When the form is sent with its consent box checked.",
          second:
            "The zerotovpn site label, email address, page language, signup source, consent status, consent-version label and server consent time. The endpoint also uses the first forwarded IP address as the key for a one-minute request limit in server-process memory.",
          third:
            "The subscriber record goes to a shared Convex lead service. Resend receives the details needed for the welcome email. The in-memory IP map has no separate cleanup timer and a process restart clears it.",
          fourth:
            "The public site code sets no fixed subscriber lifetime. Ask us to remove an address; limited provider or legal backup retention may still apply.",
        },
        {
          id: "visitor-review",
          title: "Visitor review submission",
          badge: "After submission",
          first: "When a visitor sends a VPN review form.",
          second:
            "VPN name, rating, title, review text, display name, email address, optional use details, pros and cons, and page language. The endpoint also adds the forwarded IP address and browser user-agent.",
          third:
            "The record goes to the shared Convex review service as pending for moderation. If approved, the public review response can show the display name, rating, title, review text, use details, pros, cons, language and date. It does not return the email address, IP address or user-agent.",
          fourth:
            "Sending a review does not guarantee publication. The public site code sets no fixed retention time. Ask us to inspect, correct or remove a submission; limited service backups or legal duties may still apply.",
        },
        {
          id: "operator-auth",
          title: "Site-operator sign-in",
          badge: "Separate handler",
          first:
            "When someone opens or uses the Stack Auth flow under /handler.",
          second:
            "Authentication identifiers, session or token material and normal technical request data. The exact fields depend on the sign-in method used.",
          third:
            "Stack Auth handles the sign-in flow. The current SDK uses nextjs-cookie, so authentication and session material can be stored in first-party cookies. Vercel still delivers the request.",
          fourth:
            "Reading public ZeroToVPN pages does not require this sign-in. Stack Auth and the site configuration control the session; signing out, clearing browser data and server-side session controls are different actions.",
        },
        {
          id: "commercial-click",
          title: "Commercial link click",
          badge: "After a click",
          first: "When a marked commercial link is opened.",
          second:
            "Provider ID, public page path, the page that sent you here (referrer), browser name (user-agent), coarse country and time. NordVPN links also receive a page-based aff_sub label, not a user ID.",
          third:
            "A technical ZeroToVPN hosting log records the click event. Short.io and the destination provider receive the outbound request.",
          fourth:
            "No user account is added by ZeroToVPN. Hosting, redirect and provider retention settings can differ.",
        },
        {
          id: "ip-dns",
          title: "IP and guided DNS tools",
          badge: "Tool use",
          first:
            "The homepage and IP checker request the IP endpoint automatically. The built-in DNS guide requests it after Start.",
          second:
            "Public IP address and approximate Vercel city, region, country and timezone headers are returned to the browser.",
          third:
            "The endpoint uses no dedicated feature database and tells the browser not to cache the response. Hosting logs may still exist. BrowserLeaks is separate and opens only after a click.",
          fourth:
            "The built-in DNS guide does not inspect DNS resolvers and cannot prove a DNS leak. The IP result does not detect a VPN or proxy.",
        },
        {
          id: "speed",
          title: "Browser speed test",
          badge: "Tool use",
          first: "When the visitor starts a speed run.",
          second:
            "Generated download and upload test traffic goes directly from the browser to Cloudflare Speed. It is not made from personal files, and the request omits credentials and the page referrer.",
          third:
            "Cloudflare receives the network request and public IP. Up to ten results are stored locally under zerotovpn-speed-runs-v3.",
          fourth:
            "The saved result has no explicit IP, account or browser-fingerprint field. Clear it in the tool or delete this site's browser data.",
        },
        {
          id: "email",
          title: "Privacy or correction email",
          badge: "Your choice",
          first: "When you email hello@zerotovpn.com.",
          second: "The address, message and attachments you choose to send.",
          third:
            "Email delivery systems and the people handling the request. Do not send passwords, payment data or identity papers unless they are requested with a reason.",
          fourth:
            "Kept only as needed to answer, document the request, prevent misuse or meet applicable duties. No response-time promise is made here.",
        },
      ],
    },
    explanation: {
      eyebrow: "Purpose, choice and time",
      title: "How we decide what is needed",
      intro:
        "A short policy should not hide uncertainty. These are the rules used for the current product, without turning them into legal advice.",
      cards: [
        {
          title: "Why the data is used",
          body: "The site needs requests to deliver pages and protect endpoints. Optional data supports email, measurement, advertising or click attribution.",
          bullets: [
            "Consent is requested for newsletter email and Google storage or advertising signals.",
            "Delivery, security and rate limiting use technical data needed to run the site.",
            "The exact legal ground can depend on the use and the visitor's location.",
          ],
        },
        {
          title: "How long it can remain",
          body: "There is no honest single retention number for every system. Browser storage, technical logs, subscriber records and outside services have different controls.",
          bullets: [
            "Session storage normally ends with the browsing session; local storage remains until code or the visitor removes it.",
            "Newsletter data remains while the subscription is active or while a limited operational or legal need applies.",
            "Service logs and backups follow their configured schedules and applicable duties.",
          ],
        },
        {
          title: "What is not shown by the browser code",
          body: "The public repository does not prove every private service setting or backup schedule. We therefore do not publish a made-up period or promise that no infrastructure log exists.",
          bullets: [
            "Outside services can process data in more than one country.",
            "Their notices explain their own safeguards and retention in more detail.",
            "Ask for clarification if a decision depends on one of these details.",
          ],
        },
      ],
      noteTitle: "Plain information, not legal advice",
      note: "This page explains how the current ZeroToVPN site behaves. Privacy rights and the legal reason for using data can differ by country and situation.",
    },
    services: {
      eyebrow: "Service map",
      title: "Other companies involved",
      intro:
        "A service is listed because the current site calls it for a clear task. Opening a policy link below takes you to that company's website.",
      items: [
        services.en.vercel,
        services.en.google,
        services.en.convex,
        services.en.resend,
        services.en.stack,
        services.en.cloudflare,
        services.en.shortio,
        services.en.browserleaks,
      ],
    },
    controls: {
      eyebrow: "Your controls",
      title: "Change a choice or ask about data",
      intro:
        "The fastest control depends on where the data sits. Clearing browser data cannot remove a newsletter or submitted-review record, and emailing us cannot clear localStorage on your device.",
      steps: [
        {
          title: "Reset Google consent",
          body: "Clear ZeroToVPN site data in your browser and reload the site. The consent panel will appear again. This also clears local preferences and tool history.",
        },
        {
          title: "Clear speed-test history",
          body: "Use Clear history in the speed-test tool, or remove ZeroToVPN site data in the browser.",
        },
        {
          title: "Stop newsletter email",
          body: "Use an unsubscribe option when one is provided, or email us from the subscribed address and ask for removal.",
        },
        {
          title: "Ask about a submitted review",
          body: "Send the review page, display name and email address used for the submission. Ask us to inspect, correct or remove the pending or published record. Verification and limited backup or legal retention can apply.",
        },
        {
          title: "Ask for access, correction or deletion",
          body: "Depending on the law that applies, you may also be able to ask for restriction, objection, portability, consent withdrawal or complain to a regulator. Verification and legal exceptions can apply.",
        },
      ],
      contactTitle: "Send a privacy or correction request",
      contactBody:
        "Tell us which email, review, click, page or feature the question is about. We do not promise a fixed reply time on this page, but enough context helps us investigate.",
      contactCta: "Open the contact route",
      emailLabel: "Email hello@zerotovpn.com",
      emailSubject: "Privacy or data request",
      safetyNote:
        "Do not include a password, payment detail or identity document unless we first explain why it is needed.",
    },
    faq: {
      eyebrow: "Quick answers",
      title: "Privacy questions",
      items: [
        {
          question: "Does ZeroToVPN store my public IP address in its IP tool?",
          answer:
            "The IP endpoint reads the public IP and Vercel location headers so it can return the result to your browser. The feature has no dedicated result database and sends a no-store browser instruction. Normal hosting and request logs may still contain technical request data.",
        },
        {
          question: "Does rejecting cookies stop every request to Google?",
          answer:
            "No. Google Consent Mode keeps analytics and advertising storage denied, but the Google tag can still send limited cookieless consent and activity pings. Rejecting also does not stop ordinary hosting requests or a tool or external link you choose to use.",
        },
        {
          question: "Is my speed-test history uploaded to ZeroToVPN?",
          answer:
            "The current tool stores up to ten results in localStorage in your browser. Test traffic goes directly to Cloudflare Speed. Cloudflare receives the network request and public IP, while the saved local result does not include an explicit IP field.",
        },
        {
          question: "How can I correct or remove my data?",
          answer:
            "Clear browser data for local preferences and tool history. For a newsletter, submitted review, email or another server-side record, use the contact route or email hello@zerotovpn.com and explain what you want us to check.",
        },
        {
          question: "What becomes public when I submit a visitor review?",
          answer:
            "A review first goes to moderation. If approved, the display name, rating, title, review text, use details, pros, cons, language and date can appear publicly. The public review response does not include the email address, IP address or browser user-agent used by the submission endpoint.",
        },
      ],
    },
    related: {
      title: "Related policy pages",
      items: [
        {
          href: "/cookie-policy",
          title: "Cookie policy",
          body: "The exact browser-storage register and Google consent behavior.",
        },
        {
          href: "/affiliate-disclosure",
          title: "Affiliate disclosure",
          body: "How commercial links are marked and how the site can be funded.",
        },
        {
          href: "/terms",
          title: "Terms",
          body: "Rules for using the site, its tools and submitted visitor reviews.",
        },
      ],
    },
    footerNote:
      "We update this page when a material data flow changes. The date above records the latest code-based review, not a promise that every outside service changed on that date.",
  },
  nl: {
    locale: "nl",
    kind: "privacy",
    meta: {
      title: "Privacybeleid: welke gegevens ZeroToVPN gebruikt",
      description:
        "Een simpele kaart van gegevensstromen bij ZeroToVPN: hosting, nieuwsbrief, bezoekersreviews, beheerderslogin, analyse, advertenties, commerciële links en VPN-tools in de browser.",
    },
    breadcrumb: { home: "Home", current: "Privacybeleid" },
    hero: {
      eyebrow: "Privacy bij ZeroToVPN",
      title: "Welke gegevens bewegen als je deze site gebruikt?",
      intro:
        "Deze pagina houdt vier dingen uit elkaar: opslag in je browser, gegevens van een ZeroToVPN-functie, technische hostinggegevens en bezoeken aan een externe dienst. We doen niet alsof een websitebezoek geen enkel spoor achterlaat.",
      directLabel: "Het korte antwoord",
      directAnswer:
        "Je kunt ZeroToVPN lezen zonder account. Je openbare IP-adres en technische aanvraaggegevens bereiken wel onze host. Sommige tools en links verbinden je browser met een andere dienst. De nieuwsbrief en bezoekersreviews gebruiken een e-mailadres. De aparte beheerderslogin gebruikt Stack Auth.",
      cues: [
        "Geen account nodig om te lezen",
        "Grenzen van tools staan erbij",
        "Privacyvragen per e-mail",
      ],
      updatedLabel: "Gecontroleerd aan de hand van de huidige sitecode",
      updated: "17 augustus 2026",
    },
    map: {
      eyebrow: "Kijk eerst naar de plek",
      title: "Vier plekken worden snel door elkaar gehaald",
      intro:
        "Een cookie, een serverlog en een externe website zijn niet hetzelfde. Deze kaart maakt dat verschil zichtbaar.",
      items: [
        {
          id: "browser",
          title: "In je browser",
          body: "Taal, thema, toestemming, toolgeschiedenis en weggeklikte meldingen kunnen als cookie, localStorage of sessionStorage op je apparaat staan.",
        },
        {
          id: "feature",
          title: "In een ZeroToVPN-functie",
          body: "De nieuwsbrief, bezoekersreviews en meting van commerciële kliks sturen vaste velden via ZeroToVPN-punten. De precieze velden staan hieronder.",
        },
        {
          id: "host",
          title: "Bij een host of andere dienst",
          body: "Vercel levert de site. Convex, Resend, Stack Auth en Google voeren vaste taken uit. Hun infrastructuur kan eigen technische logs bewaren.",
        },
        {
          id: "external",
          title: "Bij een externe site",
          body: "Cloudflare Speed, BrowserLeaks, Short.io en VPN-sites ontvangen pas een aanvraag als je de bijbehorende test of link gebruikt.",
        },
      ],
    },
    register: {
      eyebrow: "Register van gegevensstromen",
      title: "Wat gebeurt er per functie?",
      intro:
        "Deze regels beschrijven de huidige code. Een hostingplatform of andere dienst kan daarnaast normale beveiligings-, aanvraag- of afleverlogs maken volgens eigen instellingen.",
      labels: ["Wanneer", "Welke gegevens", "Waarheen", "Bekende grens"],
      items: [
        {
          id: "browsing",
          title: "Pagina's lezen",
          badge: "Automatisch",
          first: "Als een pagina of bestand wordt opgevraagd.",
          second:
            "Openbaar IP-adres, browserheaders, het gevraagde pad en normale afleverinformatie. Google ontvangt ook meetaanvragen die rekening houden met toestemming.",
          third:
            "Vercel levert de aanvraag. Google-tags starten met opslag geweigerd; beperkte pings zonder cookies kunnen wel worden verstuurd.",
          fourth:
            "ZeroToVPN publiceert geen vaste bewaartijd voor hosting- of Google-logs. De instellingen en het beleid van die diensten gelden.",
        },
        {
          id: "newsletter",
          title: "Inschrijven voor de nieuwsbrief",
          badge: "Na toestemming",
          first:
            "Als het formulier met aangevinkte toestemming wordt verstuurd.",
          second:
            "Het sitelabel zerotovpn, e-mailadres, paginataal, plek van inschrijving, toestemmingsstatus, versie van de toestemming en het servermoment van toestemming. Het punt gebruikt ook het eerste doorgestuurde IP-adres als sleutel voor een aanvraaglimiet van één minuut in het geheugen van het serverproces.",
          third:
            "De inschrijving gaat naar een gedeelde Convex-dienst. Resend ontvangt wat nodig is voor de welkomstmail. De IP-kaart in het geheugen heeft geen aparte opruimtimer en verdwijnt als het serverproces opnieuw start.",
          fourth:
            "De openbare sitecode stelt geen vaste bewaartijd in. Vraag ons om een adres te verwijderen; beperkte back-ups door een dienst of wettelijke plicht kunnen nog gelden.",
        },
        {
          id: "visitor-review",
          title: "Bezoekersreview insturen",
          badge: "Na verzending",
          first:
            "Als een bezoeker het formulier voor een VPN-review verstuurt.",
          second:
            "VPN-naam, cijfer, titel, reviewtekst, weergavenaam, e-mailadres, optionele gebruiksgegevens, voor- en nadelen en paginataal. Het punt voegt ook het doorgestuurde IP-adres en de browserinformatie (user-agent) toe.",
          third:
            "De inzending gaat als wachtend op moderatie naar de gedeelde Convex-dienst voor reviews. Na goedkeuring kan het openbare reviewantwoord de weergavenaam, het cijfer, de titel, reviewtekst, gebruiksgegevens, voor- en nadelen, taal en datum tonen. Het e-mailadres, IP-adres en de user-agent komen niet mee in dat openbare antwoord.",
          fourth:
            "Insturen garandeert geen publicatie. De openbare sitecode stelt geen vaste bewaartijd in. Vraag ons om een inzending te bekijken, verbeteren of verwijderen; beperkte back-ups door een dienst of wettelijke plichten kunnen nog gelden.",
        },
        {
          id: "operator-auth",
          title: "Login voor de sitebeheerder",
          badge: "Aparte handler",
          first:
            "Als iemand de Stack Auth-stroom onder /handler opent of gebruikt.",
          second:
            "Authenticatiekenmerken, sessie- of tokengegevens en normale technische aanvraaggegevens. De precieze velden hangen af van de gekozen inlogmethode.",
          third:
            "Stack Auth verwerkt de login. De huidige SDK gebruikt nextjs-cookie. Daardoor kunnen authenticatie- en sessiegegevens in first-party cookies staan. Vercel levert de aanvraag.",
          fourth:
            "Voor het lezen van openbare ZeroToVPN-pagina's is deze login niet nodig. Stack Auth en de site-instellingen beheren de sessie. Uitloggen, browsergegevens wissen en een sessie op de server intrekken zijn verschillende acties.",
        },
        {
          id: "commercial-click",
          title: "Klik op een commerciële link",
          badge: "Na een klik",
          first: "Als een gemarkeerde commerciële link wordt geopend.",
          second:
            "Aanbieder-ID, openbaar paginapad, de verwijzende pagina (referrer), browsernaam (user-agent), grof land en tijd. NordVPN-links krijgen ook een aff_sub-label op basis van de pagina, geen gebruikers-ID.",
          third:
            "Een technische ZeroToVPN-hostinglog noteert de klik. Short.io en de bezochte aanbieder ontvangen de uitgaande aanvraag.",
          fourth:
            "ZeroToVPN voegt geen gebruikersaccount toe. Bewaartijden van hosting, omleiding en aanbieder kunnen verschillen.",
        },
        {
          id: "ip-dns",
          title: "IP- en begeleide DNS-tools",
          badge: "Gebruik van tool",
          first:
            "De homepage en IP-checker vragen het IP-punt automatisch op. De ingebouwde DNS-gids doet dit na Start.",
          second:
            "Openbaar IP-adres en geschatte Vercel-headers voor stad, regio, land en tijdzone worden teruggestuurd naar de browser.",
          third:
            "Het punt gebruikt geen eigen database voor resultaten en vraagt de browser niet te cachen. Hostinglogs kunnen wel bestaan. BrowserLeaks opent pas na een aparte klik.",
          fourth:
            "De ingebouwde DNS-gids bekijkt geen DNS-resolvers en kan geen DNS-lek bewijzen. Het IP-resultaat herkent geen VPN of proxy.",
        },
        {
          id: "speed",
          title: "Snelheidstest in de browser",
          badge: "Gebruik van tool",
          first: "Als de bezoeker een snelheidsmeting start.",
          second:
            "Gegenereerd download- en uploadverkeer gaat direct van de browser naar Cloudflare Speed. Er worden geen persoonlijke bestanden, inloggegevens of paginaverwijzer meegestuurd.",
          third:
            "Cloudflare ontvangt de netwerkaanvraag en het openbare IP-adres. Maximaal tien resultaten staan lokaal onder zerotovpn-speed-runs-v3.",
          fourth:
            "Het opgeslagen resultaat heeft geen apart IP-, account- of browservingerprintveld. Wis het in de tool of verwijder de sitegegevens in je browser.",
        },
        {
          id: "email",
          title: "Privacy- of correctiemail",
          badge: "Je eigen keuze",
          first: "Als je mailt naar hello@zerotovpn.com.",
          second: "Het adres, bericht en de bijlagen die je zelf verstuurt.",
          third:
            "E-maildiensten en de mensen die het verzoek behandelen. Stuur geen wachtwoorden, betaalgegevens of identiteitsbewijs, tenzij we eerst uitleggen waarom dat nodig is.",
          fourth:
            "Alleen zolang nodig om te antwoorden, het verzoek vast te leggen, misbruik te voorkomen of een geldende plicht te volgen. Hier staat geen belofte over antwoordtijd.",
        },
      ],
    },
    explanation: {
      eyebrow: "Doel, keuze en tijd",
      title: "Hoe we bepalen wat nodig is",
      intro:
        "Een kort beleid hoort onzekerheid niet te verbergen. Dit zijn de regels voor het huidige product, zonder er juridisch advies van te maken.",
      cards: [
        {
          title: "Waarom gegevens worden gebruikt",
          body: "De site heeft aanvragen nodig om pagina's te leveren en punten te beschermen. Optionele gegevens helpen bij e-mail, meten, advertenties of het herkennen van een commerciële klik.",
          bullets: [
            "We vragen toestemming voor nieuwsbriefmail en Google-opslag of advertentiesignalen.",
            "Voor levering, beveiliging en een aanvraaglimiet zijn technische gegevens nodig.",
            "De precieze wettelijke basis kan afhangen van het gebruik en het land van de bezoeker.",
          ],
        },
        {
          title: "Hoelang iets kan blijven staan",
          body: "Er is geen eerlijk bewaargetal dat bij elk systeem past. Browseropslag, technische logs, inschrijvingen en externe diensten hebben andere regels.",
          bullets: [
            "SessionStorage eindigt meestal met de browsersessie; localStorage blijft tot code of de bezoeker het wist.",
            "Nieuwsbriefgegevens blijven tijdens de inschrijving of zolang een beperkte technische of wettelijke reden geldt.",
            "Logs en back-ups van diensten volgen hun ingestelde planning en geldende plichten.",
          ],
        },
        {
          title: "Wat de browsercode niet kan bewijzen",
          body: "De openbare code laat niet elke interne instelling of back-upplanning van een dienst zien. Daarom verzinnen we geen bewaartijd en beloven we niet dat er nergens een infrastructuurlog bestaat.",
          bullets: [
            "Externe diensten kunnen gegevens in meer dan één land verwerken.",
            "Hun uitleg bevat meer informatie over hun eigen beveiliging en bewaartijd.",
            "Vraag om uitleg als je keuze van één van deze details afhangt.",
          ],
        },
      ],
      noteTitle: "Duidelijke informatie, geen juridisch advies",
      note: "Deze pagina legt uit hoe de huidige ZeroToVPN-site werkt. Privacyrechten en de juridische reden voor gegevensgebruik kunnen per land en situatie verschillen.",
    },
    services: {
      eyebrow: "Kaart van diensten",
      title: "Andere bedrijven die een taak uitvoeren",
      intro:
        "Een dienst staat hier omdat de huidige site hem voor een duidelijke taak aanroept. Een beleidslink hieronder brengt je naar de website van dat bedrijf.",
      items: [
        services.nl.vercel,
        services.nl.google,
        services.nl.convex,
        services.nl.resend,
        services.nl.stack,
        services.nl.cloudflare,
        services.nl.shortio,
        services.nl.browserleaks,
      ],
    },
    controls: {
      eyebrow: "Jouw knoppen",
      title: "Verander een keuze of stel een vraag over gegevens",
      intro:
        "De juiste knop hangt af van de plek. Browsergegevens wissen verwijdert geen nieuwsbriefinschrijving of ingestuurde review. Een e-mail aan ons wist geen localStorage op je apparaat.",
      steps: [
        {
          title: "Google-toestemming opnieuw kiezen",
          body: "Wis de sitegegevens van ZeroToVPN in je browser en laad de site opnieuw. Het toestemmingsvenster verschijnt weer. Dit wist ook lokale voorkeuren en toolgeschiedenis.",
        },
        {
          title: "Geschiedenis van de snelheidstest wissen",
          body: "Gebruik Geschiedenis wissen in de snelheidstest, of verwijder de ZeroToVPN-sitegegevens in je browser.",
        },
        {
          title: "Stoppen met nieuwsbriefmail",
          body: "Gebruik de afmeldoptie als die in een e-mail staat, of mail ons vanaf het ingeschreven adres en vraag om verwijdering.",
        },
        {
          title: "Vraag stellen over een ingestuurde review",
          body: "Noem de reviewpagina, weergavenaam en het e-mailadres van de inzending. Vraag ons om de wachtende of gepubliceerde review te bekijken, verbeteren of verwijderen. Controle en beperkte back-up- of wettelijke bewaarplichten kunnen gelden.",
        },
        {
          title: "Inzage, correctie of verwijdering vragen",
          body: "Afhankelijk van de wet die geldt, kun je mogelijk ook beperking, bezwaar, overdracht of intrekken van toestemming vragen of klagen bij een toezichthouder. Controle en wettelijke uitzonderingen kunnen gelden.",
        },
      ],
      contactTitle: "Stuur een privacy- of correctieverzoek",
      contactBody:
        "Vertel bij welk e-mailadres, welke review, klik, pagina of functie je vraag hoort. We beloven op deze pagina geen vaste antwoordtijd, maar genoeg uitleg helpt ons zoeken.",
      contactCta: "Open de contactroute",
      emailLabel: "Mail hello@zerotovpn.com",
      emailSubject: "Privacy- of gegevensverzoek",
      safetyNote:
        "Stuur geen wachtwoord, betaalgegevens of identiteitsbewijs mee, tenzij we eerst uitleggen waarom dit nodig is.",
    },
    faq: {
      eyebrow: "Snelle antwoorden",
      title: "Vragen over privacy",
      items: [
        {
          question: "Slaat ZeroToVPN mijn openbare IP-adres op in de IP-tool?",
          answer:
            "Het IP-punt leest het openbare IP-adres en locatieheaders van Vercel om het resultaat naar je browser terug te sturen. De functie heeft geen eigen resultatendatabase en stuurt een no-store-opdracht naar de browser. Normale hosting- en aanvraaglogs kunnen nog wel technische aanvraaggegevens bevatten.",
        },
        {
          question: "Stopt Cookies weigeren elke aanvraag aan Google?",
          answer:
            "Nee. Google Consent Mode houdt opslag voor analyse en advertenties geweigerd, maar de Google-tag kan beperkte pings zonder cookies versturen. Weigeren stopt ook geen normale hostingaanvraag en geen tool of externe link die je zelf gebruikt.",
        },
        {
          question:
            "Wordt mijn geschiedenis van de snelheidstest naar ZeroToVPN gestuurd?",
          answer:
            "De huidige tool bewaart maximaal tien resultaten in localStorage in je browser. Testverkeer gaat direct naar Cloudflare Speed. Cloudflare ontvangt de netwerkaanvraag en het openbare IP-adres. Het lokaal opgeslagen resultaat bevat geen apart IP-veld.",
        },
        {
          question: "Hoe laat ik gegevens verbeteren of verwijderen?",
          answer:
            "Wis browsergegevens voor lokale voorkeuren en toolgeschiedenis. Gebruik voor een nieuwsbriefinschrijving, ingestuurde review, e-mail of ander servergegeven de contactroute of mail hello@zerotovpn.com en leg uit wat je wilt laten controleren.",
        },
        {
          question: "Wat wordt openbaar als ik een bezoekersreview instuur?",
          answer:
            "Een review gaat eerst naar moderatie. Na goedkeuring kunnen de weergavenaam, het cijfer, de titel, reviewtekst, gebruiksgegevens, voor- en nadelen, taal en datum openbaar verschijnen. Het openbare reviewantwoord bevat niet het e-mailadres, IP-adres of de user-agent die het inzendpunt gebruikt.",
        },
      ],
    },
    related: {
      title: "Bijbehorende beleidspagina's",
      items: [
        {
          href: "/cookie-policy",
          title: "Cookiebeleid",
          body: "Het precieze register van browseropslag en Google-toestemming.",
        },
        {
          href: "/affiliate-disclosure",
          title: "Uitleg over affiliate links",
          body: "Hoe commerciële links worden gemarkeerd en de site geld kan verdienen.",
        },
        {
          href: "/terms",
          title: "Voorwaarden",
          body: "Regels voor het gebruik van de site, tools en ingestuurde bezoekersreviews.",
        },
      ],
    },
    footerNote:
      "We werken deze pagina bij als een belangrijke gegevensstroom verandert. De datum bovenaan is de laatste controle van de sitecode, niet de belofte dat elke externe dienst op die datum veranderde.",
  },
};

const cookieCopy: Record<PolicyLocale, PolicyPageCopy> = {
  en: {
    locale: "en",
    kind: "cookies",
    meta: {
      title: "Cookie policy: browser storage and consent",
      description:
        "A clear register of ZeroToVPN cookies, localStorage, sessionStorage, Google Consent Mode and storage used by browser-based tools.",
    },
    breadcrumb: { home: "Home", current: "Cookie policy" },
    hero: {
      eyebrow: "Cookies and browser storage",
      title: "What stays in your browser, and what does not?",
      intro:
        "A cookie is only one kind of browser storage. ZeroToVPN also uses localStorage and sessionStorage. Hosting logs and requests to another website are different and are explained separately.",
      directLabel: "The short answer",
      directAnswer:
        "ZeroToVPN remembers language, theme, consent, some dismissed prompts and up to ten local speed-test results. The separate site-operator sign-in can also use Stack Auth session cookies. Google storage starts denied. Rejecting keeps those Google storage signals denied, but limited cookieless pings can still be sent.",
      cues: [
        "Named storage keys",
        "No invented expiry dates",
        "Clear controls explained",
      ],
      updatedLabel: "Checked against the current site code",
      updated: "17 August 2026",
    },
    map: {
      eyebrow: "Four different things",
      title: "Cookie does not mean every data flow",
      intro:
        "The name of the technology tells you where a preference sits. It does not describe every network request made by a website.",
      items: [
        {
          id: "cookie",
          title: "Cookie",
          body: "A small value sent with matching web requests. The locale helper can use NEXT_LOCALE as a first-party session cookie. The separate Stack Auth handler can use first-party authentication and session cookies.",
        },
        {
          id: "local",
          title: "localStorage",
          body: "Browser storage that remains until the site code or the visitor removes it. It is not automatically sent with every request.",
        },
        {
          id: "session",
          title: "sessionStorage",
          body: "Browser storage intended for the current browsing session. ZeroToVPN uses it for dismissed interface prompts.",
        },
        {
          id: "network",
          title: "Network or outside service",
          body: "A host, Google tag, speed endpoint or opened external link can receive a request even when the value is not a first-party cookie.",
        },
      ],
    },
    register: {
      eyebrow: "Current storage register",
      title: "The keys and services used by this site",
      intro:
        "This register is based on the current browser code and active site components. Browser behavior, extensions and outside services can add their own controls.",
      labels: [
        "Starts when",
        "Stored value",
        "Technology and owner",
        "Lifetime or control",
      ],
      items: [
        {
          id: "locale",
          title: "Language choice",
          badge: "Functional",
          first: "A locale is selected or resolved.",
          second: "A short locale code, such as en or nl.",
          third: "NEXT_LOCALE, a first-party session cookie used by next-intl.",
          fourth:
            "A session cookie has no fixed max-age in the current setup. Remove it in browser site-data settings.",
        },
        {
          id: "theme",
          title: "Light or dark theme",
          badge: "Preference",
          first: "The theme control is used.",
          second: "The selected theme.",
          third: "theme in first-party localStorage, managed by next-themes.",
          fourth: "It remains until changed or site data is cleared.",
        },
        {
          id: "consent",
          title: "Google consent choice",
          badge: "Consent",
          first: "Accept or Reject is selected in the consent panel.",
          second: "accepted or rejected.",
          third: "cookie-consent in first-party localStorage.",
          fourth:
            "No expiry is set in the current code. Clear site data and reload to make the choice again.",
        },
        {
          id: "operator-auth",
          title: "Stack Auth operator session",
          badge: "Separate sign-in",
          first: "The Stack Auth flow under /handler is opened or used.",
          second:
            "Authentication and session token material. The exact value depends on the sign-in method and Stack Auth session.",
          third:
            "First-party cookies through the Stack Auth nextjs-cookie token store. Stack Auth also handles the authentication request.",
          fourth:
            "Public reading does not need this cookie. Stack Auth and site settings control the session. Signing out, clearing browser data and revoking a server session are different controls.",
        },
        {
          id: "speed-history",
          title: "Speed-test history",
          badge: "Tool feature",
          first: "A speed-test result is completed.",
          second:
            "Up to ten test results, including time, test mode, endpoint, method, transfer limits and measured download, upload, ping and jitter.",
          third: "zerotovpn-speed-runs-v3 in first-party localStorage.",
          fourth:
            "Use Clear history in the tool or remove browser site data. No explicit IP or account field is stored in the result.",
        },
        {
          id: "prompts",
          title: "Dismissed interface prompts",
          badge: "Interface",
          first: "A visitor closes the sticky bar or newsletter prompt.",
          second: "A true flag or dismissal time.",
          third:
            "stickyBarDismissed and exitIntentShown in sessionStorage; exitIntentDismissed in localStorage.",
          fourth:
            "Session flags last for the browsing session. The exit-prompt dismissal is checked for 30 days, then the code removes it.",
        },
        {
          id: "google",
          title: "Google Analytics and AdSense",
          badge: "Third party",
          first:
            "Google Analytics code loads after the page becomes interactive. AdSense code is limited to production editorial article, review, comparison and roundup pages. It does not load on trust or policy pages, tools, the quiz, the speed test, admin pages or authentication routes.",
          second:
            "Consent state and measurement or advertising signals. Google can receive technical request information and limited cookieless pings while storage is denied.",
          third:
            "Google network calls and, after accepted consent, Google-controlled cookies or similar identifiers according to Google's settings.",
          fourth:
            "Reject keeps analytics_storage, ad_storage, ad_personalization and ad_user_data denied. Google controls its own cookie lifetimes.",
        },
        {
          id: "outbound",
          title: "Commercial and tool destinations",
          badge: "External",
          first:
            "Only after a commercial link is clicked, a speed test is started or the external BrowserLeaks test is opened.",
          second: "The normal outbound network request and public IP address.",
          third:
            "Short.io or a VPN site, Cloudflare Speed, or BrowserLeaks. They may use their own cookies or similar storage.",
          fourth:
            "ZeroToVPN cannot clear storage on another domain. Use that service's controls and policy.",
        },
      ],
    },
    explanation: {
      eyebrow: "Consent in plain language",
      title: "What Accept and Reject change",
      intro:
        "The consent panel controls Google storage and advertising signals. It is not an on/off switch for the internet connection or every functional preference.",
      cards: [
        {
          title: "Before a choice",
          body: "Google Consent Mode sets analytics and advertising storage to denied before the interactive page loads.",
          bullets: [
            "The Google tag script still loads.",
            "Limited cookieless consent and activity pings can still be sent.",
            "Functional browser storage can be used for language, theme and tool behavior.",
          ],
        },
        {
          title: "After Accept",
          body: "The site grants Google's analytics, advertising, ad-personalization and ad-user-data consent signals.",
          bullets: [
            "Google can use cookies or similar identifiers under its own settings.",
            "Production editorial pages can also load the AdSense script.",
            "An ad or specific cookie is not guaranteed on every page view.",
          ],
        },
        {
          title: "After Reject",
          body: "The four Google storage and advertising signals remain denied and the choice is saved in localStorage.",
          bullets: [
            "Limited cookieless Google pings can still occur.",
            "Vercel still receives ordinary page requests.",
            "Cloudflare, BrowserLeaks or an outbound destination receives a request if you choose to use it.",
          ],
        },
      ],
      noteTitle: "Important difference",
      note: "Clearing cookies alone may not clear localStorage or sessionStorage. In most browsers, use the control for all site data if you want a full local reset.",
    },
    services: {
      eyebrow: "Outside storage and requests",
      title: "Services with their own rules",
      intro:
        "ZeroToVPN can explain when the current site calls a service. The other company controls cookies, logs and retention on its own domain or infrastructure.",
      items: [
        services.en.google,
        services.en.vercel,
        services.en.stack,
        services.en.cloudflare,
        services.en.shortio,
        services.en.browserleaks,
      ],
    },
    controls: {
      eyebrow: "Change your choice",
      title: "Clear, reset or ask",
      intro:
        "Use a browser control for data stored on your device. Use the contact route for a server-side question. Use an outside service's controls for its own domain.",
      steps: [
        {
          title: "Reset the consent panel",
          body: "Clear all ZeroToVPN site data in your browser and reload. The panel appears again because cookie-consent is no longer present.",
        },
        {
          title: "Keep or remove preferences",
          body: "Clearing all site data also removes the saved theme, locale cookie, tool history and dismissed-prompt flags. You can instead remove individual keys in browser developer tools if you know how.",
        },
        {
          title: "Control outside services",
          body: "Google, Stack Auth, Short.io, VPN sites, Cloudflare and BrowserLeaks have their own settings and policies. A ZeroToVPN browser reset cannot remove all data or server-side sessions held by those services.",
        },
        {
          title: "Ask about a key or request",
          body: "Use the contact route and name the storage key, page or action. Depending on applicable law, additional privacy rights and exceptions may apply.",
        },
      ],
      contactTitle: "Question about cookies or storage?",
      contactBody:
        "Tell us the key, browser action or page you mean. We do not promise a fixed reply time here, but precise details help us check the current behavior.",
      contactCta: "Open the contact route",
      emailLabel: "Email hello@zerotovpn.com",
      emailSubject: "Cookie or browser-storage question",
      safetyNote:
        "Do not send browser exports, passwords, payment details or identity papers unless we first explain why they are needed.",
    },
    faq: {
      eyebrow: "Quick answers",
      title: "Cookie and storage questions",
      items: [
        {
          question: "Does Reject stop all tracking or all network requests?",
          answer:
            "No. It keeps the four Google consent signals denied. Limited cookieless pings can still occur, Vercel still delivers the page, and an outside service receives a request when you start its tool or open its link.",
        },
        {
          question: "How do I show the consent panel again?",
          answer:
            "Clear ZeroToVPN site data in your browser and reload. This removes the cookie-consent localStorage value, but it can also remove your theme, language cookie and local speed-test history.",
        },
        {
          question: "Are speed-test results cookies?",
          answer:
            "No. Up to ten results are kept in localStorage under zerotovpn-speed-runs-v3. Use Clear history in the tool or remove the site's browser data.",
        },
        {
          question: "Can ZeroToVPN clear a VPN provider's cookie?",
          answer:
            "No. Cookies or storage on Short.io, a VPN-provider site, Cloudflare or BrowserLeaks belong to that domain. Use that service's settings or browser controls.",
        },
        {
          question: "Do I need a Stack Auth cookie to read public pages?",
          answer:
            "No. Stack Auth is used by the separate site-operator sign-in handler. Public ZeroToVPN pages can be read without that sign-in. An operator can sign out, but browser cookies and a server-side session can require separate controls.",
        },
      ],
    },
    related: {
      title: "Related policy pages",
      items: [
        {
          href: "/privacy-policy",
          title: "Privacy policy",
          body: "The map of site, hosting, newsletter, review, sign-in, click and tool data.",
        },
        {
          href: "/affiliate-disclosure",
          title: "Affiliate disclosure",
          body: "Why some outbound links are marked as commercial.",
        },
        {
          href: "/terms",
          title: "Terms",
          body: "Rules for using the site, browser tools and submitted visitor reviews.",
        },
      ],
    },
    footerNote:
      "We update this register when the site's active storage or consent behavior changes. Browser and outside-service updates can change their own behavior separately.",
  },
  nl: {
    locale: "nl",
    kind: "cookies",
    meta: {
      title: "Cookiebeleid: browseropslag en toestemming",
      description:
        "Een duidelijk register van ZeroToVPN-cookies, localStorage, sessionStorage, Google Consent Mode en opslag van tools in de browser.",
    },
    breadcrumb: { home: "Home", current: "Cookiebeleid" },
    hero: {
      eyebrow: "Cookies en browseropslag",
      title: "Wat blijft in je browser staan, en wat niet?",
      intro:
        "Een cookie is maar één soort browseropslag. ZeroToVPN gebruikt ook localStorage en sessionStorage. Hostinglogs en aanvragen aan een andere website zijn iets anders. Die leggen we apart uit.",
      directLabel: "Het korte antwoord",
      directAnswer:
        "ZeroToVPN onthoudt taal, thema, toestemming, enkele weggeklikte meldingen en maximaal tien lokale resultaten van de snelheidstest. De aparte login voor de sitebeheerder kan ook sessiecookies van Stack Auth gebruiken. Google-opslag start geweigerd. Na Weigeren blijft die opslag geweigerd, maar beperkte pings zonder cookies kunnen wel worden verstuurd.",
      cues: [
        "Opslagsleutels bij naam",
        "Geen verzonnen vervaldata",
        "Knoppen om te wissen uitgelegd",
      ],
      updatedLabel: "Gecontroleerd aan de hand van de huidige sitecode",
      updated: "17 augustus 2026",
    },
    map: {
      eyebrow: "Vier verschillende dingen",
      title: "Cookie betekent niet elke gegevensstroom",
      intro:
        "De naam van de techniek zegt waar een voorkeur staat. Het beschrijft niet elke netwerkaanvraag van een website.",
      items: [
        {
          id: "cookie",
          title: "Cookie",
          body: "Een kleine waarde die met passende webaanvragen meegaat. De taalhulp kan NEXT_LOCALE als first-party sessiecookie gebruiken. De aparte Stack Auth-handler kan first-party cookies voor authenticatie en sessies gebruiken.",
        },
        {
          id: "local",
          title: "localStorage",
          body: "Browseropslag die blijft tot de sitecode of bezoeker hem wist. Deze waarde gaat niet automatisch met elke aanvraag mee.",
        },
        {
          id: "session",
          title: "sessionStorage",
          body: "Browseropslag voor de huidige browsersessie. ZeroToVPN gebruikt dit voor weggeklikte meldingen in de interface.",
        },
        {
          id: "network",
          title: "Netwerk of externe dienst",
          body: "Een host, Google-tag, snelheidspunt of geopende externe link kan een aanvraag ontvangen zonder dat dit een first-party cookie is.",
        },
      ],
    },
    register: {
      eyebrow: "Huidig opslagregister",
      title: "De sleutels en diensten van deze site",
      intro:
        "Dit register is gebaseerd op de huidige browsercode en actieve onderdelen van de site. De browser, extensies en externe diensten kunnen eigen instellingen toevoegen.",
      labels: [
        "Begint wanneer",
        "Opgeslagen waarde",
        "Techniek en eigenaar",
        "Duur of knop",
      ],
      items: [
        {
          id: "locale",
          title: "Taalkeuze",
          badge: "Werking",
          first: "Als een taal wordt gekozen of bepaald.",
          second: "Een korte taalcode, zoals en of nl.",
          third: "NEXT_LOCALE, een first-party sessiecookie van next-intl.",
          fourth:
            "In de huidige instelling heeft deze sessiecookie geen vaste max-age. Verwijder hem via de sitegegevens in je browser.",
        },
        {
          id: "theme",
          title: "Licht of donker thema",
          badge: "Voorkeur",
          first: "Als je de themaknop gebruikt.",
          second: "Het gekozen thema.",
          third: "theme in first-party localStorage, beheerd door next-themes.",
          fourth: "Blijft tot je het verandert of de sitegegevens wist.",
        },
        {
          id: "consent",
          title: "Keuze voor Google-toestemming",
          badge: "Toestemming",
          first: "Als je Accepteren of Weigeren kiest in het venster.",
          second: "accepted of rejected.",
          third: "cookie-consent in first-party localStorage.",
          fourth:
            "De huidige code stelt geen vervaldatum in. Wis de sitegegevens en laad opnieuw om opnieuw te kiezen.",
        },
        {
          id: "operator-auth",
          title: "Beheerderssessie via Stack Auth",
          badge: "Aparte login",
          first:
            "Als de Stack Auth-stroom onder /handler wordt geopend of gebruikt.",
          second:
            "Authenticatie- en sessietokens. De precieze waarde hangt af van de inlogmethode en Stack Auth-sessie.",
          third:
            "First-party cookies via de Stack Auth-tokenopslag nextjs-cookie. Stack Auth verwerkt ook de authenticatieaanvraag.",
          fourth:
            "Openbare pagina's lezen heeft deze cookie niet nodig. Stack Auth en de site-instellingen beheren de sessie. Uitloggen, browsergegevens wissen en een sessie op de server intrekken zijn verschillende acties.",
        },
        {
          id: "speed-history",
          title: "Geschiedenis van de snelheidstest",
          badge: "Toolfunctie",
          first: "Als een snelheidsmeting klaar is.",
          second:
            "Maximaal tien resultaten met onder meer tijd, testsoort, punt, methode, overdrachtsgrenzen en gemeten download, upload, ping en jitter.",
          third: "zerotovpn-speed-runs-v3 in first-party localStorage.",
          fourth:
            "Gebruik Geschiedenis wissen in de tool of verwijder de browsergegevens. Het resultaat heeft geen apart IP- of accountveld.",
        },
        {
          id: "prompts",
          title: "Weggeklikte meldingen",
          badge: "Interface",
          first: "Als een bezoeker de vaste balk of nieuwsbriefmelding sluit.",
          second: "Een true-vlag of het moment van wegklikken.",
          third:
            "stickyBarDismissed en exitIntentShown in sessionStorage; exitIntentDismissed in localStorage.",
          fourth:
            "Sessievlaggen gelden voor de browsersessie. De weggeklikte nieuwsbriefmelding wordt 30 dagen gecontroleerd en daarna door de code verwijderd.",
        },
        {
          id: "google",
          title: "Google Analytics en AdSense",
          badge: "Derde partij",
          first:
            "Google Analytics-code laadt nadat de pagina werkt. AdSense-code is beperkt tot redactionele productiepagina's voor artikelen, reviews, vergelijkingen en roundups. De code laadt niet op vertrouwens- of beleidspagina's, tools, de quiz, snelheidstest, beheerpagina's of authenticatieroutes.",
          second:
            "Toestemmingsstatus en signalen voor meten of advertenties. Google kan technische aanvraaggegevens en beperkte pings zonder cookies ontvangen terwijl opslag is geweigerd.",
          third:
            "Google-netwerkaanvragen en, na akkoord, cookies of vergelijkbare kenmerken onder beheer van Google en zijn instellingen.",
          fourth:
            "Weigeren houdt analytics_storage, ad_storage, ad_personalization en ad_user_data geweigerd. Google beheert zijn eigen cookieduur.",
        },
        {
          id: "outbound",
          title: "Commerciële en toolbestemmingen",
          badge: "Extern",
          first:
            "Pas na een klik op een commerciële link, het starten van een snelheidstest of het openen van de externe BrowserLeaks-test.",
          second:
            "De normale uitgaande netwerkaanvraag en het openbare IP-adres.",
          third:
            "Short.io of een VPN-site, Cloudflare Speed of BrowserLeaks. Zij kunnen eigen cookies of vergelijkbare opslag gebruiken.",
          fourth:
            "ZeroToVPN kan opslag op een ander domein niet wissen. Gebruik de knoppen en uitleg van die dienst.",
        },
      ],
    },
    explanation: {
      eyebrow: "Toestemming in gewone taal",
      title: "Wat Accepteren en Weigeren veranderen",
      intro:
        "Het toestemmingsvenster bestuurt Google-opslag en advertentiesignalen. Het is geen aan-uitknop voor de internetverbinding of elke functionele voorkeur.",
      cards: [
        {
          title: "Voor een keuze",
          body: "Google Consent Mode zet opslag voor analyse en advertenties op geweigerd voordat de interactieve pagina laadt.",
          bullets: [
            "Het script van de Google-tag laadt wel.",
            "Beperkte pings over toestemming en activiteit zonder cookies kunnen nog worden verstuurd.",
            "Functionele browseropslag kan worden gebruikt voor taal, thema en tools.",
          ],
        },
        {
          title: "Na Accepteren",
          body: "De site geeft toestemming aan Google's signalen voor analyse, advertenties, advertentiepersonalisatie en advertentiegebruikersgegevens.",
          bullets: [
            "Google kan cookies of vergelijkbare kenmerken gebruiken volgens zijn instellingen.",
            "Redactionele productiepagina's kunnen ook het AdSense-script laden.",
            "Een advertentie of bepaalde cookie verschijnt niet bij elk bezoek.",
          ],
        },
        {
          title: "Na Weigeren",
          body: "De vier Google-signalen voor opslag en advertenties blijven geweigerd. De keuze staat in localStorage.",
          bullets: [
            "Beperkte Google-pings zonder cookies kunnen nog plaatsvinden.",
            "Vercel ontvangt nog steeds de normale pagina-aanvraag.",
            "Cloudflare, BrowserLeaks of een uitgaande site ontvangt een aanvraag als je die zelf gebruikt.",
          ],
        },
      ],
      noteTitle: "Belangrijk verschil",
      note: "Alleen cookies wissen verwijdert mogelijk geen localStorage of sessionStorage. Gebruik in de meeste browsers de knop voor alle sitegegevens als je lokaal helemaal opnieuw wilt beginnen.",
    },
    services: {
      eyebrow: "Externe opslag en aanvragen",
      title: "Diensten met hun eigen regels",
      intro:
        "ZeroToVPN kan uitleggen wanneer de huidige site een dienst aanroept. Het andere bedrijf beheert cookies, logs en bewaartijd op zijn eigen domein of infrastructuur.",
      items: [
        services.nl.google,
        services.nl.vercel,
        services.nl.stack,
        services.nl.cloudflare,
        services.nl.shortio,
        services.nl.browserleaks,
      ],
    },
    controls: {
      eyebrow: "Verander je keuze",
      title: "Wissen, opnieuw kiezen of vragen",
      intro:
        "Gebruik een browserknop voor gegevens op je apparaat. Gebruik de contactroute voor een vraag over de server. Gebruik de knoppen van een externe dienst voor zijn eigen domein.",
      steps: [
        {
          title: "Het toestemmingsvenster opnieuw tonen",
          body: "Wis alle ZeroToVPN-sitegegevens in je browser en laad opnieuw. Het venster verschijnt weer omdat cookie-consent niet meer aanwezig is.",
        },
        {
          title: "Voorkeuren bewaren of verwijderen",
          body: "Alle sitegegevens wissen verwijdert ook het thema, de taalcookie, toolgeschiedenis en weggeklikte meldingen. Wie weet hoe het werkt, kan losse sleutels via browserontwikkelaarstools verwijderen.",
        },
        {
          title: "Externe diensten beheren",
          body: "Google, Stack Auth, Short.io, VPN-sites, Cloudflare en BrowserLeaks hebben eigen instellingen en beleid. Een ZeroToVPN-reset kan niet alle gegevens of serversessies bij die diensten verwijderen.",
        },
        {
          title: "Vragen over een sleutel of aanvraag",
          body: "Gebruik de contactroute en noem de opslagsleutel, pagina of actie. Afhankelijk van de geldende wet kunnen meer privacyrechten en uitzonderingen gelden.",
        },
      ],
      contactTitle: "Vraag over cookies of opslag?",
      contactBody:
        "Noem de sleutel, browseractie of pagina waarover je vraag gaat. We beloven hier geen vaste antwoordtijd, maar precieze informatie helpt ons het huidige gedrag te controleren.",
      contactCta: "Open de contactroute",
      emailLabel: "Mail hello@zerotovpn.com",
      emailSubject: "Vraag over cookies of browseropslag",
      safetyNote:
        "Stuur geen browserexport, wachtwoord, betaalgegevens of identiteitsbewijs mee, tenzij we eerst uitleggen waarom dit nodig is.",
    },
    faq: {
      eyebrow: "Snelle antwoorden",
      title: "Vragen over cookies en opslag",
      items: [
        {
          question: "Stopt Weigeren alle meting of netwerkaanvragen?",
          answer:
            "Nee. Het houdt de vier Google-toestemmingssignalen geweigerd. Beperkte pings zonder cookies kunnen nog plaatsvinden, Vercel levert de pagina nog en een externe dienst ontvangt een aanvraag als je de tool start of link opent.",
        },
        {
          question: "Hoe laat ik het toestemmingsvenster opnieuw zien?",
          answer:
            "Wis de ZeroToVPN-sitegegevens in je browser en laad opnieuw. Dit verwijdert cookie-consent uit localStorage, maar kan ook je thema, taalcookie en lokale geschiedenis van de snelheidstest verwijderen.",
        },
        {
          question: "Zijn resultaten van de snelheidstest cookies?",
          answer:
            "Nee. Maximaal tien resultaten staan in localStorage onder zerotovpn-speed-runs-v3. Gebruik Geschiedenis wissen in de tool of verwijder de browsergegevens van de site.",
        },
        {
          question: "Kan ZeroToVPN een cookie van een VPN-aanbieder wissen?",
          answer:
            "Nee. Cookies of opslag op Short.io, een VPN-site, Cloudflare of BrowserLeaks horen bij dat domein. Gebruik de instellingen van die dienst of je browser.",
        },
        {
          question:
            "Heb ik een Stack Auth-cookie nodig om openbare pagina's te lezen?",
          answer:
            "Nee. Stack Auth wordt gebruikt door de aparte login voor de sitebeheerder. Openbare ZeroToVPN-pagina's zijn zonder die login te lezen. Een beheerder kan uitloggen, maar browsercookies en een sessie op de server kunnen aparte knoppen nodig hebben.",
        },
      ],
    },
    related: {
      title: "Bijbehorende beleidspagina's",
      items: [
        {
          href: "/privacy-policy",
          title: "Privacybeleid",
          body: "De kaart van site-, hosting-, nieuwsbrief-, review-, login-, klik- en toolgegevens.",
        },
        {
          href: "/affiliate-disclosure",
          title: "Uitleg over affiliate links",
          body: "Waarom sommige uitgaande links als commercieel zijn gemarkeerd.",
        },
        {
          href: "/terms",
          title: "Voorwaarden",
          body: "Regels voor het gebruik van de site, browsertools en ingestuurde bezoekersreviews.",
        },
      ],
    },
    footerNote:
      "We werken dit register bij als actieve opslag of toestemming op de site verandert. Updates van de browser en externe diensten kunnen hun eigen gedrag apart veranderen.",
  },
};

export function getPrivacyPolicyCopy(locale: string): PolicyPageCopy {
  return privacyCopy[isPolicyLocale(locale) ? locale : "en"];
}

export function getCookiePolicyCopy(locale: string): PolicyPageCopy {
  return cookieCopy[isPolicyLocale(locale) ? locale : "en"];
}
