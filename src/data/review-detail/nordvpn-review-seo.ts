export type NordReviewParent =
  | "quick"
  | "evidence"
  | "performance"
  | "privacy"
  | "apps"
  | "pricing"
  | "compare";

export type NordReviewDetailBlock = {
  parent: NordReviewParent;
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  checklistTitle: string;
  bullets: string[];
  takeawayLabel: string;
  takeaway: string;
  sources: Array<{ label: string; href: string }>;
  related?: { label: string; href: string };
};

export type NordReviewSeoExpansion = {
  publishedLabel: string;
  updatedLabel: string;
  readingTimeLabel: string;
  minuteLabel: string;
  directAnswer: string;
  researchScope: string;
  researchScopeLabel: string;
  authorHeading: string;
  authorRole: string;
  authorBio: string;
  authorLink: string;
  backToTop: string;
  partnerSourceNote: string;
  blocks: NordReviewDetailBlock[];
  paaFaqs: Array<{ question: string; answer: string }>;
};

const en: NordReviewSeoExpansion = {
  publishedLabel: "Published",
  updatedLabel: "Last reviewed",
  readingTimeLabel: "Estimated reading time",
  minuteLabel: "min",
  directAnswer:
    "NordVPN may be worth a look in 2026 if you use Windows, macOS, Android, iPhone, Linux or TV devices and need up to 10 connections at once. The no-logs claim has had outside checks. NordVPN is not right for everyone: we still need a new speed and streaming test, and you should compare today's total with the renewal price.",
  researchScopeLabel: "What is current — and what is not",
  researchScope:
    "The information about privacy, the 10-device limit, cancellation, and refunds was updated on 14 August 2026. Speed, leaks, the kill switch, and Netflix have not yet been retested by ZeroToVPN. We therefore show no new scores or guarantees for those points.",
  authorHeading: "About this review",
  authorRole: "ZeroToVPN editor and publisher",
  authorBio:
    "Marvin Smit keeps ZeroToVPN's review templates, source lists, affiliate checks, and technical SEO checks up to date. On this page, he keeps NordVPN's own claims separate from our tests. He marks missing or old results instead of turning them into a score.",
  authorLink: "View Marvin's author profile",
  backToTop: "Back to the top",
  partnerSourceNote:
    "Source note: NordVPN says this. We have not tested every device and server.",
  blocks: [
    {
      parent: "quick",
      id: "what-nordvpn-does",
      eyebrow: "What a VPN can and cannot do",
      title: "What does NordVPN actually do?",
      lead: "A VPN sends your internet traffic through a VPN server. This can protect traffic on the local network and change the public IP address that websites see. It does not make you anonymous or remove every privacy risk.",
      paragraphs: [
        "NordVPN supplies apps that create an encrypted tunnel from the device to a selected VPN server. Your internet provider can still see that a connection exists and how much data moves, while the VPN provider becomes part of the trust chain because traffic exits through its infrastructure. Websites may still identify you through sign-ins, cookies, browser fingerprinting, payment records or information you submit yourself. HTTPS remains important after traffic leaves the VPN server.",
        "That boundary matters when judging marketing language. A changed IP address can help with network privacy and location-based routing, but it does not erase an account history or protect a compromised device. Malware, phishing, weak passwords and unsafe browser extensions sit outside the basic VPN tunnel. Some Nord plans include adjacent security products, yet those products should be assessed separately instead of treating a bundle as proof that the VPN itself blocks every threat.",
        "Our verdict therefore focuses on the decisions a VPN can actually influence: app coverage, tunnel controls, protocol choice, route availability, provider policy, checkout terms and the quality of dated evidence. We do not award points for vague promises such as complete anonymity. We also avoid treating a long server list, an attractive map or a high affiliate payout as a substitute for repeatable measurements.",
        "For most households, the practical question is narrower: does the app run on every important device, does it reconnect predictably, are the privacy terms acceptable, and can the buyer understand the total cost? NordVPN looks credible on the first two product-documentation questions, but our performance status remains open until a new run is recorded. That is why this review uses documented, unknown and retest labels rather than one precise score.",
      ],
      checklistTitle: "What a VPN can and cannot help with",
      bullets: [
        "Protect traffic between your device and the VPN server on a network you do not fully trust.",
        "Change the public IP address and apparent server location seen by many destinations.",
        "Do not expect a VPN to remove account logins, cookies, fingerprinting or information you share.",
        "Keep operating-system updates, HTTPS, strong authentication and backups in the security plan.",
      ],
      takeawayLabel: "Remember",
      takeaway:
        "Choose NordVPN for its apps, features, price, and available evidence. Do not choose it because a VPN promises to make you invisible.",
      sources: [
        {
          label: "NIST guide to VPN technologies",
          href: "https://csrc.nist.gov/pubs/sp/800/113/final",
        },
      ],
      related: {
        label: "Read how a VPN works",
        href: "/guides/what-is-vpn",
      },
    },
    {
      parent: "evidence",
      id: "nordvpn-trustworthiness",
      eyebrow: "Evidence about trust",
      title: "Can you trust NordVPN?",
      lead: "Trust can change. We look at who owns the VPN, where the company is based, how it works, what its privacy policy says, how it handles problems, and what outside reviewers checked.",
      paragraphs: [
        "NordVPN states that it operates under a no-logs policy and reports six external assurance engagements. The latest announcement describes fieldwork performed by Deloitte Lithuania from November to December 2025. That is relevant evidence because it gives the claim a named assessor, scope and date. It remains a point-in-time engagement: it cannot prove every future configuration, employee action or system outside the examined scope.",
        "The full report is available only through a Nord Account, which limits public scrutiny. We can verify the announcement and the history Nord publishes, but readers without an account cannot inspect every underlying procedure from this page. Our evidence ledger therefore says 'dated primary source' rather than 'independently proven forever'. A stronger future dossier would preserve the report, scope, systems reviewed, exceptions and the exact date on which ZeroToVPN checked it.",
        "Jurisdiction is another input, not a verdict by itself. A provider can be incorporated in a privacy-friendly location and still make poor technical or operational choices. Conversely, good controls, minimal data collection and transparent incident response can matter more than a flag on a comparison table. We display Panama because NordVPN documents that jurisdiction, but we do not turn the country into a numerical privacy score.",
        "A cautious answer is therefore yes, NordVPN presents meaningful trust signals, especially its repeated assurance history, but those signals deserve the same limitations as any other evidence. People with a sensitive threat model should examine account data, payment choices, software transparency, legal exposure and whether they prefer a provider with open-source clients or anonymous cash payments. Mainstream convenience and maximum anonymity are different goals.",
      ],
      checklistTitle: "A useful privacy check tells us",
      bullets: [
        "A named assessor and a report or announcement that states the review period.",
        "A visible scope: systems, policies and exclusions rather than only a badge.",
        "Clear separation between a provider statement and ZeroToVPN's own observation.",
        "A retest or review date so old evidence cannot silently appear current.",
      ],
      takeawayLabel: "Our conclusion",
      takeaway:
        "The outside checks are a positive sign, but not a promise. Decide how much proof you need for the risks you face.",
      sources: [
        {
          label: "NordVPN's sixth assurance announcement",
          href: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
        },
      ],
      related: {
        label: "Open the VPN privacy guide",
        href: "/guides/vpn-privacy-guide",
      },
    },
    {
      parent: "privacy",
      id: "servers-specialty-routes",
      eyebrow: "Choosing a server",
      title: "Which NordVPN server should you choose?",
      lead: "NordVPN offers normal and special servers. A nearby normal server is usually the best place to start. Special servers can help with certain tasks, but they are not automatically faster or safer.",
      paragraphs: [
        "A standard nearby server is the sensible baseline for everyday browsing. It normally adds fewer network hops than a multi-hop route and gives a cleaner starting point for speed tests. Double VPN deliberately sends traffic through two VPN servers, which can add latency and reduce throughput. That trade-off may be acceptable for a specialised threat model, but it should not be the default simply because two tunnels sound twice as safe.",
        "Obfuscated servers target networks that try to identify or block VPN traffic. NordVPN's current support page says the option depends on OpenVPN on several platforms, and a user may need to change protocols before it appears. Availability can differ by device and country. We therefore describe obfuscation as a documented capability, not a promise that it will bypass every firewall or remain legal in every location.",
        "Onion over VPN combines a VPN entry point with routing through the Tor network. It changes who can observe different parts of the path, but it also introduces additional latency and does not remove browser or account-level identifiers. P2P-labelled servers indicate provider support for that traffic category; they do not make unlawful sharing legal or guarantee that a torrent client cannot leak outside the tunnel. Client binding and kill-switch behaviour still require platform-specific checks.",
        "A dedicated IP solves a different problem: fewer shared-IP challenges and a stable address for allowlists. The privacy trade-off is that a single address can be easier to associate with one subscriber or organisation than a large shared exit address. It is usually a paid add-on. Compare it as a separate product and verify whether the app, protocol and destination you use support it.",
      ],
      checklistTitle: "Choose a route deliberately",
      bullets: [
        "Start with a nearby standard server and record the baseline before changing modes.",
        "Expect extra hops such as Double VPN or Tor to affect latency and throughput.",
        "Check protocol and platform requirements before relying on obfuscation.",
        "Treat a dedicated IP as an identity and access trade-off, not a universal upgrade.",
      ],
      takeawayLabel: "What the server list cannot tell you",
      takeaway:
        "Network size and specialty labels do not reveal route quality at your location. The useful evidence is a dated test on the same device, protocol, destination and time window.",
      sources: [
        {
          label: "NordVPN server categories",
          href: "https://support.nordvpn.com/hc/en-us/articles/19479130821521-Different-NordVPN-server-categories-explained",
        },
        {
          label: "NordVPN obfuscated-server setup",
          href: "https://support.nordvpn.com/hc/en-us/articles/19615332252561-How-to-connect-and-disconnect-from-NordVPN-s-obfuscated-servers",
        },
      ],
      related: {
        label: "Browse country-by-country VPN guidance",
        href: "/countries",
      },
    },
    {
      parent: "performance",
      id: "netflix-blocking",
      eyebrow: "Streaming limits",
      title: "Why might Netflix block NordVPN?",
      lead: "Netflix can spot a VPN address when many people share it or when the chosen location does not match. A server may work today and be blocked later.",
      paragraphs: [
        "Netflix's own help centre says that a VPN or proxy can make a device appear to connect from another place and can trigger its VPN/proxy message. It also notes restrictions for ad-supported experiences and live events. That means a successful connection to a VPN server does not equal guaranteed access to a catalogue. The platform, account plan, device, DNS path and selected server can all affect the outcome.",
        "A responsible review records more than 'worked' or 'failed'. We need the date, Netflix plan, app and operating-system versions, destination catalogue, VPN protocol, server location, whether the title actually played and whether the result survived a reconnect. One successful home-page load is not an unblock test. A permanent guarantee would be misleading because streaming services and providers continually change infrastructure.",
        "If Netflix shows a VPN or proxy message, first confirm that the client country reported by the connection test matches the intended location. Then reconnect once, try another provider-documented server in the same country, check for custom DNS or a second VPN, and restart the app. Avoid rapidly cycling through many countries because that makes the diagnosis harder. If the chosen Netflix plan does not support VPN use, changing servers does not solve the account-level restriction.",
        "We have not published a fresh NordVPN streaming run for this update, so the page does not call NordVPN a guaranteed streaming winner. Readers who care about one specific service should test that service during an eligible refund period and save the result with a date. The same caution applies to BBC iPlayer, Disney+, sports platforms and local broadcaster apps.",
      ],
      checklistTitle: "A streaming test should record",
      bullets: [
        "Service, account plan, destination catalogue and exact title or live event.",
        "Device, app version, VPN protocol, exit country and test time.",
        "Playback result, resolution, buffering and whether a reconnect changed it.",
        "Failure evidence as well as success; do not hide blocked routes.",
      ],
      takeawayLabel: "Current ZeroToVPN status",
      takeaway:
        "Streaming remains unverified on this review until a fresh run log exists. NordVPN may work on a given route, but neither our page nor an affiliate link turns that into a standing guarantee.",
      sources: [
        {
          label: "Netflix VPN and proxy error guidance",
          href: "https://help.netflix.com/en/node/277",
        },
      ],
      related: {
        label: "Compare VPN evidence and limitations",
        href: "/best/best-vpn",
      },
    },
    {
      parent: "apps",
      id: "setup-troubleshooting",
      eyebrow: "Daily use",
      title: "Apps, installation and troubleshooting",
      lead: "A good-looking app only helps if its settings work as expected on your device. NordVPN has apps for the main computer and phone systems, but names and features can change by device and app version.",
      paragraphs: [
        "Start by installing from the provider's official download page or the platform's verified app store. Sign in, leave protocol selection on automatic for the first connection and choose a nearby server. Record whether the operating system displays an active VPN profile and whether the public IP changes. On a shared computer, decide whether auto-connect and launch-at-startup fit every user before enabling them.",
        "The kill switch deserves a separate test because products use the term for different behaviours. Some modes block all network traffic when the tunnel drops; others target selected apps. A reliable check closes the tunnel deliberately, confirms whether traffic stops and repeats the test after sleep, Wi-Fi changes and a reboot. Do not assume the setting works merely because the toggle is visible in provider material.",
        "Split tunnelling also varies. It can exclude an app from the VPN or include only selected apps, depending on platform and implementation. That changes which public IP, DNS resolver and local devices each app can reach. Keep the rule set small, document why each exception exists and retest after an app or operating-system update. A forgotten exclusion can make a later privacy test look inconsistent.",
        "When a connection fails, change one variable at a time: server, protocol, network, firewall rule or app version. Capture the error before reinstalling. Switching between OpenVPN and NordLynx can solve compatibility problems but also changes the test conditions. If a workplace, school or country restricts VPNs, review local rules and provider documentation before enabling obfuscation or manual profiles.",
      ],
      checklistTitle: "Five-minute setup check",
      bullets: [
        "Install from an official source and verify the publisher before signing in.",
        "Connect nearby, confirm the public IP changed and save the app version.",
        "Test kill-switch behaviour instead of trusting the label.",
        "Review split-tunnel exceptions after every material app or OS update.",
      ],
      takeawayLabel: "Usability verdict",
      takeaway:
        "NordVPN documents broad platform coverage and visible controls. Feature parity and failure behaviour remain platform-specific, so the app on your actual device is the unit that must be tested.",
      sources: [
        {
          label: "NordVPN feature documentation",
          href: "https://support.nordvpn.com/hc/en-us/articles/19559429814545-List-of-NordVPN-features",
        },
      ],
      related: {
        label: "Open the mobile VPN guide",
        href: "/best/vpn-mobile",
      },
    },
    {
      parent: "pricing",
      id: "price-cancellation-refund",
      eyebrow: "What you really pay",
      title: "Check the first price, renewal price, and refund rules",
      lead: "A low monthly number may cover only the first offer. The real cost depends on what you pay today, what is included, tax, the renewal price, and refund rules. That is why we do not show one 'best price' forever.",
      paragraphs: [
        "Before paying, write down the billing currency, term length and total amount due now. Divide the total only if a monthly equivalent helps comparison, and label that figure as an equivalent rather than a monthly payment. Check whether extra security products are bundled, whether they renew together and whether the offer applies to new customers or a specific market. A price from another country or app store may not match the direct checkout.",
        "Renewal deserves its own line. An introductory multi-year term can renew for a different duration or amount. Save the checkout summary and confirmation email, then set a calendar reminder well before the renewal date. Turning off auto-renewal is not the same as deleting an account, and cancelling future renewal is not automatically a request for a refund.",
        "NordVPN's support page says direct subscribers can manage auto-renewal through Nord Account, while Apple, Google, Amazon and other purchase channels have their own processes. The refund page describes a 30-day window for eligible new subscriptions and explains channel-specific limitations. Eligibility is therefore a policy question, not a slogan. Verify the current text at the moment of purchase and keep proof of the channel used.",
        "This page uses an affiliate link only to open the current checkout. It does not inject a coupon, promise a saving or change our verdict. If the tracked destination is unavailable, the page falls back to the internal comparison. Readers should never buy a plan through their own affiliate account, and the partner disclosure remains visible before sponsored destinations.",
      ],
      checklistTitle: "Record these five numbers",
      bullets: [
        "Total charged today and the currency used.",
        "Length of the introductory term and its monthly equivalent, if shown.",
        "Renewal date, renewal term and renewal amount.",
        "Taxes, add-ons and products included in the same subscription.",
        "Refund deadline and the purchase channel that controls the request.",
      ],
      takeawayLabel: "Price verdict",
      takeaway:
        "There is no single global NordVPN monthly price we can responsibly freeze on this page. The live checkout is useful only when you compare its complete terms with at least one alternative.",
      sources: [
        {
          label: "NordVPN cancellation instructions",
          href: "https://support.nordvpn.com/hc/en-us/articles/19556844985489-How-to-cancel-a-subscription",
        },
        {
          label: "NordVPN refund policy",
          href: "https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy",
        },
      ],
      related: {
        label: "Compare current plan and refund terms",
        href: "/best/best-vpn",
      },
    },
    {
      parent: "compare",
      id: "nordvpn-disadvantages",
      eyebrow: "Downsides",
      title: "What are the disadvantages of NordVPN?",
      lead: "NordVPN's main downsides add up: renewal can be confusing, you must trust one large provider, features differ by device, and results can change by server.",
      paragraphs: [
        "First, cost is harder to compare than a headline monthly equivalent suggests. Long introductory terms reduce the displayed equivalent but increase the amount committed upfront. Renewal may use a different amount or term. Buyers who dislike monitoring subscriptions may prefer a provider with a simpler flat monthly price even when its first-year equivalent looks higher.",
        "Second, the account and payment model may not fit the most privacy-sensitive user. NordVPN offers mainstream convenience, but people who prioritise minimal account data, open-source-first tooling or anonymous cash payment should compare providers built around those choices. A repeated assurance history is useful evidence; it does not remove the basic need to trust the service operating the exit infrastructure.",
        "Third, feature parity is incomplete. A setting shown on Android may work differently or be absent on iOS, Linux, a browser extension or a television. Specialty routes can depend on a particular protocol. Router installations change the number of devices covered but also move control away from the individual app. Check the exact platform matrix rather than assuming one screenshot describes every device.",
        "Finally, NordVPN does not offer every advanced networking feature that every niche user wants. Port forwarding is an example that can matter for self-hosting or lawful peer-to-peer workflows. Streaming access and speed are also route-dependent. Anyone buying for one narrow use case should test that use case and keep an alternative in mind instead of choosing from an all-rounder label alone.",
      ],
      checklistTitle: "Reasons to choose another provider",
      bullets: [
        "You want a simple flat price with less renewal administration.",
        "Anonymous cash payment or minimal account data is central to your threat model.",
        "You require port forwarding or another niche networking feature.",
        "A specific Linux, router, TV or mobile feature must work exactly the same everywhere.",
      ],
      takeawayLabel: "Balanced verdict",
      takeaway:
        "The disadvantages do not make NordVPN unusable; they define who should compare further. A good review makes those exit criteria visible before the first sponsored click.",
      sources: [],
      related: {
        label: "Compare VPNs with port forwarding",
        href: "/best/vpn-port-forwarding",
      },
    },
    {
      parent: "compare",
      id: "nordvpn-alternatives",
      eyebrow: "Alternatives",
      title: "Which VPN is better than NordVPN?",
      lead: "No VPN is best for everyone. The best choice depends on what matters most: simple pricing, open-source apps, little account data, many devices, or advanced network tools.",
      paragraphs: [
        "Surfshark is the obvious comparison for households with many devices because its account policy is positioned differently. The meaningful check is not a marketing feature count: compare the exact device policy, app support, privacy evidence, renewal amount and the routes your household uses. A cheaper equivalent is not better if the total commitment or renewal is unclear.",
        "Proton VPN deserves attention when open-source apps and a privacy-focused product ecosystem carry more weight. Compare audit scope, account model, free-plan limitations and the paid features you actually need. Mullvad is the stronger contrast for people who value a minimal account identifier and simple pricing; it may be less aligned with users who want a polished streaming-oriented commercial bundle.",
        "AirVPN and other technical providers can suit people who need deeper networking controls, but usability and device support may demand more effort. ExpressVPN is another mainstream rival and a high-volume comparison query, yet a fair head-to-head requires the same test routes, dates and price definition for both providers. We will not declare a winner from two incompatible catalog scores.",
        "Use the comparison table as a shortlist, then open each evidence page. Eliminate any provider that misses a must-have platform, payment method or networking feature. Verify the complete cost, run the same route tests and read the cancellation terms. The provider left after those steps is better for that use case—even if it is not the provider with the highest generic rating elsewhere.",
      ],
      checklistTitle: "Match the alternative to the priority",
      bullets: [
        "Many-device household: compare NordVPN with Surfshark.",
        "Open-source and privacy ecosystem: compare Proton VPN.",
        "Minimal account model and simple pricing: compare Mullvad.",
        "Advanced networking controls: inspect AirVPN and specialist providers.",
      ],
      takeawayLabel: "Comparison rule",
      takeaway:
        "A better VPN is the service that passes your must-have criteria with current evidence. Keep price, platform and test dates defined the same way before choosing a winner.",
      sources: [],
      related: { label: "Build your own VPN comparison", href: "/compare" },
    },
  ],
  paaFaqs: [
    {
      question: "Is NordVPN still trustworthy?",
      answer:
        "NordVPN shows useful signs of trust. It says Deloitte checked its no-logs claim for a sixth time, with the latest work ending in December 2025. That check covered a set time and limited part of the service. It does not promise that every future system or action will be safe.",
    },
    {
      question: "Is it worth it to use NordVPN?",
      answer:
        "It may be worth it if you use Windows, macOS, Android, iPhone, Linux or TV devices, need up to 10 connections at once, and value a no-logs claim that has had outside checks. Before you buy, check today's total and the renewal price. We have not run a new ZeroToVPN speed test for this update.",
    },
    {
      question: "Why is Netflix blocking NordVPN?",
      answer:
        "Netflix may block an IP address shared by many VPN users. It may also see a location mismatch or a plan that limits VPN use. Reconnect once, check the country shown, and read Netflix's latest help page. No VPN can promise access to every library forever.",
    },
    {
      question: "What are the disadvantages of NordVPN?",
      answer:
        "The main downsides are confusing renewal prices, the need to trust a large account-based company, features that differ by device, and speed or streaming that can change by server. NordVPN may also not suit people who need cash payment without a name or port forwarding.",
    },
    {
      question: "Can the FBI track NordVPN?",
      answer:
        "A VPN does not make you invisible. What law enforcement can learn depends on data kept by NordVPN and other companies, evidence on your device, account activity, and the law. No VPN can truthfully promise that you can never be tracked.",
    },
    {
      question: "Which VPN is better than NordVPN?",
      answer:
        "Surfshark may suit homes with many devices. Proton VPN may suit people who want open-source apps. Mullvad may suit people who want a simple account. The best VPN is the one that meets your needs when each service is tested in the same way.",
    },
  ],
};

const nl: NordReviewSeoExpansion = {
  publishedLabel: "Gepubliceerd",
  updatedLabel: "Laatst beoordeeld",
  readingTimeLabel: "Geschatte leestijd",
  minuteLabel: "min",
  directAnswer:
    "NordVPN is het bekijken waard als je een eenvoudige VPN-app wilt voor veel apparaten. Volgens NordVPN kun je 10 apparaten tegelijk verbinden. Een externe partij bekeek meerdere keren de belofte dat NordVPN je internetactiviteiten niet bewaart. Toch raden we NordVPN niet automatisch aan. We hebben snelheid en streaming nog niet opnieuw zelf getest. Controleer ook wat je nu betaalt en wat het abonnement later kost.",
  researchScopeLabel: "Wat actueel is — en wat nog niet",
  researchScope:
    "De informatie over privacy, 10 apparaten, opzeggen en geld terug is bijgewerkt op 14 augustus 2026. Snelheid, datalekken, de internet-noodstop en Netflix zijn nog niet opnieuw door ZeroToVPN getest. Daarom tonen we daarvoor geen nieuwe cijfers of garanties.",
  authorHeading: "Over deze review",
  authorRole: "ZeroToVPN-redacteur en uitgever",
  authorBio:
    "Marvin Smit beheert de reviews, bronnen, regels voor partnerlinks en vindbaarheid van ZeroToVPN. Op deze pagina maakt hij duidelijk welke informatie van NordVPN komt, wat we zelf hebben getest en wat nog onzeker is.",
  authorLink: "Bekijk Marvins auteursprofiel",
  backToTop: "Terug naar boven",
  partnerSourceNote:
    "Deze informatie komt van NordVPN. Ze laat zien wat NordVPN belooft of ondersteunt, maar bewijst niet dat een functie op elk apparaat, elke server en elk moment hetzelfde werkt.",
  blocks: [
    {
      parent: "quick",
      id: "wat-nordvpn-doet",
      eyebrow: "Wat een VPN wel en niet doet",
      title: "Wat doet NordVPN precies?",
      lead: "Een VPN stuurt je internetverkeer eerst naar een VPN-server. Dat kan je verkeer op openbare wifi beter beschermen en verandert het IP-adres dat websites zien. Een VPN maakt je niet volledig anoniem.",
      paragraphs: [
        "De NordVPN-app maakt een versleutelde verbinding tussen je apparaat en een NordVPN-server. Je internetprovider ziet nog steeds dat je online bent en hoeveel data je gebruikt. NordVPN wordt een partij die je moet vertrouwen, omdat je verkeer via zijn servers loopt.",
        "Websites kunnen je nog herkennen als je inlogt, cookies bewaart, betaalt of zelf gegevens invult. Een VPN verwijdert ook geen malware en beschermt je niet tegen phishing of zwakke wachtwoorden. HTTPS en updates blijven dus belangrijk.",
        "Daarom beoordelen we alleen dingen die een VPN echt kan beïnvloeden: apps, instellingen, verbindingstypen, beschikbare servers, privacybeleid, prijs en controleerbaar bewijs. We geven geen punten voor vage beloften over volledige anonimiteit.",
        "Voor de meeste mensen zijn de vragen simpel: werkt de app op mijn apparaten, blijft de verbinding stabiel, vind ik het privacybeleid goed genoeg en begrijp ik de totale prijs? NordVPN beschrijft veel apps en functies. Onze nieuwe eigen snelheids- en streamingtest ontbreekt nog.",
      ],
      checklistTitle: "Waar een VPN wel en niet bij helpt",
      bullets: [
        "Beschermt verkeer tussen je apparaat en de VPN-server.",
        "Verandert het openbare IP-adres dat veel websites zien.",
        "Verwijdert geen accounts, cookies of gegevens die je zelf deelt.",
        "Vervangt geen updates, sterke wachtwoorden, HTTPS en back-ups.",
      ],
      takeawayLabel: "Onthoud",
      takeaway:
        "Kies NordVPN om de apps, functies, prijs en het beschikbare bewijs. Kies het niet omdat een VPN je onzichtbaar zou maken.",
      sources: [
        {
          label: "NIST-gids over VPN-technologie",
          href: "https://csrc.nist.gov/pubs/sp/800/113/final",
        },
      ],
      related: {
        label: "Lees hoe een VPN werkt",
        href: "/guides/what-is-vpn",
      },
    },
    {
      parent: "evidence",
      id: "betrouwbaarheid-nordvpn",
      eyebrow: "Bewijs over vertrouwen",
      title: "Is NordVPN te vertrouwen?",
      lead: "Vertrouwen is geen keurmerk dat voor altijd geldt. We kijken naar het bedrijf, de techniek, het privacybeleid, externe controles, reacties op problemen en de datum van het bewijs.",
      paragraphs: [
        "NordVPN zegt geen gebruikslogs te bewaren en meldt zes externe controles. Volgens NordVPN onderzocht Deloitte Lithuania het beleid van november tot december 2025. Dat is nuttig bewijs, omdat we weten wie controleerde en wanneer.",
        "Zo'n controle blijft een momentopname. Ze bewijst niet wat later gebeurt of wat buiten het onderzoek viel. Het volledige rapport is alleen met een Nord-account te lezen. Bezoekers zonder account kunnen dus niet alle details controleren.",
        "Ook het land waar een bedrijf staat ingeschreven is geen bewijs op zichzelf. NordVPN noemt Panama als vestigingsland. Goede techniek, weinig opgeslagen gegevens en duidelijke reacties op problemen zijn minstens zo belangrijk.",
        "Ons voorzichtige oordeel: NordVPN laat nuttige vertrouwenssignalen zien, maar geen garantie. Wie extra bescherming nodig heeft, moet ook kijken naar accountgegevens, betaalmogelijkheden, openbare broncode en anonieme betaling.",
      ],
      checklistTitle: "Een goede privacycontrole laat dit zien",
      bullets: [
        "Wie de controle deed en wanneer.",
        "Welke systemen wel en niet zijn bekeken.",
        "Of de informatie van NordVPN of van ZeroToVPN komt.",
        "Een datum, zodat oud bewijs niet nieuw lijkt.",
      ],
      takeawayLabel: "Onze conclusie",
      takeaway:
        "De externe controles zijn positief, maar geen garantie. Bepaal zelf hoeveel bewijs je voor jouw situatie nodig hebt.",
      sources: [
        {
          label: "NordVPN over de zesde externe privacycontrole",
          href: "https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/",
        },
      ],
      related: {
        label: "Open de VPN-privacygids",
        href: "/guides/vpn-privacy-guide",
      },
    },
    {
      parent: "privacy",
      id: "servers-speciale-routes",
      eyebrow: "Een server kiezen",
      title: "Welke NordVPN-server kies je?",
      lead: "NordVPN heeft gewone en speciale servers. Een server dichtbij is meestal de beste eerste keuze. Speciale servers kunnen nuttig zijn, maar zijn niet automatisch sneller of veiliger.",
      paragraphs: [
        "Een gewone server dichtbij is meestal de beste start voor dagelijks gebruik. Je verbinding maakt dan vaak minder omwegen. Meet eerst je snelheid zonder VPN en daarna met deze server. Double VPN stuurt je verkeer via twee VPN-servers. Dat kan meer vertraging geven en je verbinding langzamer maken. Gebruik deze stand daarom alleen als je begrijpt waarom je hem nodig hebt.",
        "Versluierde servers proberen te verbergen dat je een VPN gebruikt. Dat kan helpen op een netwerk dat VPN-verkeer blokkeert. Volgens NordVPN werkt deze keuze niet op elk apparaat en heb je soms OpenVPN nodig. Zie dit niet als een belofte dat iedere blokkade verdwijnt. Controleer ook altijd of VPN-gebruik op jouw locatie is toegestaan.",
        "Onion over VPN stuurt je verbinding ook door het Tor-netwerk. Dat kan extra privacy geven op een deel van de route, maar maakt de verbinding meestal trager. P2P-servers zijn bedoeld voor programma's die bestanden rechtstreeks tussen gebruikers delen. Ze maken verboden delen niet legaal. Test ook of de internet-noodstop werkt als de VPN plots wegvalt.",
        "Een eigen vast IP-adres wordt niet met veel andere klanten gedeeld. Dat kan sommige blokkades voorkomen en is handig als een netwerk alleen jouw vaste adres mag toelaten. Het nadeel is dat zo'n adres makkelijker aan één klant is te koppelen. Het kost meestal extra. Controleer daarom eerst of jouw app en doel dit echt nodig hebben.",
      ],
      checklistTitle: "Kies stap voor stap",
      bullets: [
        "Begin met een gewone server dichtbij en meet eerst je snelheid zonder VPN.",
        "Double VPN en Tor maken de verbinding meestal trager.",
        "Controleer op welke apparaten versluierde servers werken.",
        "Neem alleen een vast IP-adres als je weet waarom je het nodig hebt.",
      ],
      takeawayLabel: "Wat de serverlijst niet vertelt",
      takeaway:
        "Veel servers en mooie labels zeggen niet hoe goed de VPN bij jou werkt. Test op hetzelfde apparaat, met dezelfde server en ongeveer hetzelfde tijdstip. Bewaar ook de datum.",
      sources: [
        {
          label: "NordVPN-uitleg over servercategorieën",
          href: "https://support.nordvpn.com/hc/en-us/articles/19479130821521-Different-NordVPN-server-categories-explained",
        },
        {
          label: "Instellen van versluierde NordVPN-servers",
          href: "https://support.nordvpn.com/hc/en-us/articles/19615332252561-How-to-connect-and-disconnect-from-NordVPN-s-obfuscated-servers",
        },
      ],
      related: { label: "Bekijk VPN-advies per land", href: "/countries" },
    },
    {
      parent: "performance",
      id: "netflix-blokkade",
      eyebrow: "Grenzen bij streaming",
      title: "Waarom blokkeert Netflix NordVPN soms?",
      lead: "Netflix kan een VPN-adres herkennen wanneer veel mensen hetzelfde adres delen of wanneer de gekozen locatie niet klopt. Daardoor kan een server vandaag werken en later worden geblokkeerd.",
      paragraphs: [
        "Netflix legt uit dat een VPN je apparaat uit een ander land kan laten lijken te komen. Daardoor kan Netflix een VPN-melding tonen. Ook je abonnement en het soort programma kunnen verschil maken. Een werkende VPN-verbinding betekent dus niet automatisch dat elke film of serie opent. De gekozen server, je apparaat en de locatie die Netflix ziet spelen allemaal mee.",
        "Een goede test schrijft meer op dan alleen werkt of werkt niet. Noteer de datum, je Netflix-abonnement, je apparaat, de appversie, het gekozen land en de VPN-server. Controleer of de film echt begint en of hij na opnieuw verbinden nog werkt. Alleen de startpagina van Netflix openen is geen echte test. De uitkomst kan later veranderen.",
        "Krijg je een VPN-melding? Controleer eerst welk land de verbinding laat zien. Verbind daarna één keer opnieuw en probeer eventueel een andere server in hetzelfde land. Herstart ook de Netflix-app. Wissel niet snel tussen veel landen, want dan wordt het moeilijker om de oorzaak te vinden. Sommige Netflix-abonnementen hebben extra regels die een andere server niet oplost.",
        "Voor deze update hebben we geen nieuwe eigen NordVPN-streamingtest gedaan. Daarom beloven we niet dat NordVPN altijd met Netflix werkt. Is één streamingdienst belangrijk voor je? Test die dienst dan zolang je nog geld terug kunt vragen en schrijf de datum op. Doe hetzelfde voor Disney+, sportdiensten en lokale tv-apps.",
      ],
      checklistTitle: "Een streamingtest legt vast",
      bullets: [
        "Streamingdienst, abonnement en de film, serie of wedstrijd die je test.",
        "Apparaat, appversie, soort VPN-verbinding, gekozen land en testtijd.",
        "Of de video start, hoe scherp hij is en of hij blijft laden.",
        "Zowel mislukte als geslaagde tests.",
      ],
      takeawayLabel: "Huidige ZeroToVPN-status",
      takeaway:
        "We geven pas een nieuw streamingoordeel na een eigen test met een duidelijk testverslag. Een geslaagde test of partnerlink is nooit een belofte dat Netflix altijd blijft werken.",
      sources: [
        {
          label: "Netflix-uitleg over VPN- en proxymeldingen",
          href: "https://help.netflix.com/en/node/277",
        },
      ],
      related: {
        label: "Vergelijk VPN-bewijs en beperkingen",
        href: "/best/best-vpn",
      },
    },
    {
      parent: "apps",
      id: "installatie-probleemoplossing",
      eyebrow: "Dagelijks gebruik",
      title: "Apps, installatie en probleemoplossing",
      lead: "Een mooie app is pas nuttig als de instellingen goed werken op jouw apparaat. NordVPN heeft apps voor Windows, macOS, Android, iPhone, Linux en tv, maar functies kunnen per platform en appversie verschillen.",
      paragraphs: [
        "Download de app via de officiële website of de echte appwinkel van je apparaat. Meld je aan, laat het soort verbinding eerst op automatisch staan en kies een server dichtbij. Controleer daarna of het VPN-teken op je apparaat verschijnt en of je openbare IP-adres verandert. Op een gedeelde computer moet je eerst beslissen of de VPN voor iedere gebruiker automatisch mag starten.",
        "Test de internet-noodstop apart. Deze instelling hoort je internet te blokkeren als de VPN uitvalt. Sommige versies stoppen al het verkeer, terwijl andere alleen gekozen apps stoppen. Verbreek de VPN daarom bewust en kijk wat er gebeurt. Herhaal dit na de slaapstand, na een wissel van wifi en na een herstart. Een zichtbare knop bewijst niet dat de functie goed werkt.",
        "Je kunt sommige apps ook buiten de VPN laten werken. Dit heet vaak split tunneling. De precieze werking verschilt per apparaat. Houd de lijst met uitzonderingen kort en schrijf op waarom een app buiten de VPN staat. Controleer de lijst opnieuw na een update. Een vergeten uitzondering kan verklaren waarom een app je gewone IP-adres blijft zien.",
        "Werkt de verbinding niet? Verander dan steeds maar één ding: de server, het soort verbinding, het netwerk, een beveiligingsregel of de appversie. Bewaar de foutmelding voordat je de app opnieuw installeert. Wisselen tussen OpenVPN en NordLynx kan helpen, maar verandert ook je test. Controleer op school, werk of reis altijd eerst de lokale regels.",
      ],
      checklistTitle: "Controle in vijf minuten",
      bullets: [
        "Installeer de app alleen via de officiële website of appwinkel.",
        "Kies een server dichtbij en controleer of je openbare IP-adres verandert.",
        "Test de internet-noodstop in plaats van alleen de knop te vertrouwen.",
        "Controleer na een update welke apps buiten de VPN staan.",
      ],
      takeawayLabel: "Gebruiksoordeel",
      takeaway:
        "NordVPN heeft apps voor veel apparaten, maar niet elke functie werkt overal hetzelfde. Test daarom altijd de app op je eigen apparaat.",
      sources: [
        {
          label: "NordVPN-functiedocumentatie",
          href: "https://support.nordvpn.com/hc/en-us/articles/19559429814545-List-of-NordVPN-features",
        },
      ],
      related: {
        label: "Open de VPN-basisgids",
        href: "/guides/what-is-vpn",
      },
    },
    {
      parent: "pricing",
      id: "prijs-opzeggen-restitutie",
      eyebrow: "Wat je echt betaalt",
      title: "Hoe duur is NordVPN per maand?",
      lead: "De geadverteerde maandprijs is vaak een gemiddelde over een langere eerste periode. Controleer het totaalbedrag van vandaag, de verlengprijs, belasting, inbegrepen producten en de regels voor terugbetaling.",
      paragraphs: [
        "Schrijf vóór betaling de munt, looptijd en het totaalbedrag van vandaag op. Een lage maandprijs is vaak alleen een gemiddelde over een lang abonnement. Kijk ook welke extra producten zijn inbegrepen en of die later samen worden verlengd. Een prijs uit een ander land of uit een appwinkel kan anders zijn dan de prijs op de website van NordVPN.",
        "Bekijk de verlengprijs apart. Na de eerste periode kan NordVPN een ander bedrag of een andere looptijd gebruiken. Bewaar de samenvatting van de betaalpagina en de bevestigingsmail. Zet ook ruim vóór de verlengdatum een herinnering. Automatisch verlengen uitzetten verwijdert je account niet en vraagt niet vanzelf je geld terug.",
        "Kocht je rechtstreeks bij NordVPN? Dan beheer je automatisch verlengen volgens NordVPN via je Nord Account. Kocht je via Apple, Google of Amazon? Dan gelden de stappen van die winkel. Voor sommige nieuwe abonnementen noemt NordVPN een periode van 30 dagen om geld terug te vragen. Lees de actuele regels en bewaar waar je hebt gekocht.",
        "Een partnerlink op deze pagina opent alleen de actuele betaalpagina. De link voegt geen eigen kortingscode toe en verandert ons oordeel niet. Als de link niet werkt, sturen we je naar onze vergelijking. Gebruik je eigen partneraccount nooit om voor jezelf te kopen. Onze uitleg over partnerlinks staat altijd vóór de eerste betaalde link.",
      ],
      checklistTitle: "Schrijf dit op vóór je betaalt",
      bullets: [
        "Totaalbedrag dat vandaag wordt afgeschreven en de gebruikte valuta.",
        "Duur van de eerste periode en de gemiddelde maandprijs, als die wordt getoond.",
        "Verlengdatum, verlengperiode en verlengbedrag.",
        "Belastingen, uitbreidingen en producten binnen hetzelfde abonnement.",
        "Laatste dag waarop je geld kunt terugvragen en waar je hebt gekocht.",
      ],
      takeawayLabel: "Prijsoordeel",
      takeaway:
        "Er is niet één vaste NordVPN-prijs voor iedereen. Open de actuele betaalpagina en vergelijk het totaalbedrag, de verlengprijs en de regels met minstens één andere VPN.",
      sources: [
        {
          label: "NordVPN-instructies voor opzeggen",
          href: "https://support.nordvpn.com/hc/en-us/articles/19556844985489-How-to-cancel-a-subscription",
        },
        {
          label: "NordVPN-restitutiebeleid",
          href: "https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy",
        },
      ],
      related: {
        label: "Vergelijk actuele abonnementen en restitutieregels",
        href: "/best/best-vpn",
      },
    },
    {
      parent: "compare",
      id: "nadelen-nordvpn",
      eyebrow: "Kanttekeningen",
      title: "Wat zijn de nadelen van NordVPN?",
      lead: "De belangrijkste nadelen zijn de mogelijke prijsstijging na verlenging, functies die per apparaat verschillen en prestaties die per server wisselen. Ook vertrouw je je verbinding toe aan één grote aanbieder.",
      paragraphs: [
        "De prijs is lastiger dan één groot maandbedrag doet lijken. Bij een lang abonnement lijkt de prijs per maand lager, maar betaal je vaak veel vooraf. De verlengprijs kan ook hoger zijn. Wil je niet steeds op verlengingen letten? Dan kan een VPN met een eenvoudige vaste maandprijs beter passen, ook als de eerste prijs iets hoger lijkt.",
        "NordVPN gebruikt een gewoon account en bekende betaalmethoden. Dat is makkelijk, maar past niet bij iedereen. Sommige mensen willen zo weinig mogelijk accountgegevens delen, de broncode van de app kunnen bekijken of contant betalen zonder naam. De externe privacycontroles zijn positief, maar je blijft NordVPN vertrouwen omdat je verbinding via zijn servers loopt.",
        "Functies verschillen per apparaat. Een instelling op Android kan anders werken of ontbreken op iPhone, Linux, een browser of televisie. Sommige speciale servers werken alleen met een bepaald soort verbinding. Een VPN op je router kan meer apparaten beschermen, maar je bedient de VPN dan anders. Controleer daarom jouw eigen apparaat in plaats van op één screenshot te vertrouwen.",
        "NordVPN heeft ook niet elke bijzondere netwerkfunctie. Port forwarding kan bijvoorbeeld belangrijk zijn als je zelf een server draait. Snelheid en streaming kunnen per server veranderen. Koop je een VPN voor één speciaal doel? Test precies dat doel en houd een alternatief achter de hand.",
      ],
      checklistTitle: "Redenen om een andere provider te kiezen",
      bullets: [
        "Je wilt een eenvoudige vaste prijs met minder verlengadministratie.",
        "Je wilt contant betalen of zo weinig mogelijk accountgegevens delen.",
        "Je hebt port forwarding of een andere bijzondere netwerkfunctie nodig.",
        "Een specifieke Linux-, router-, tv- of mobiele functie moet overal hetzelfde werken.",
      ],
      takeawayLabel: "Evenwichtig oordeel",
      takeaway:
        "Deze nadelen maken NordVPN niet slecht. Ze laten vooral zien voor wie een andere VPN beter kan passen. Daarom tonen we ze vóór de eerste partnerlink.",
      sources: [],
      related: {
        label: "Vergelijk andere VPN-keuzes",
        href: "/best/best-vpn",
      },
    },
    {
      parent: "compare",
      id: "alternatieven-nordvpn",
      eyebrow: "Alternatieven",
      title: "Welke VPN past beter dan NordVPN?",
      lead: "Er is geen VPN die voor iedereen het beste is. Kies op basis van jouw belangrijkste eis: duidelijke prijs, weinig accountgegevens, apps met openbare broncode, veel apparaten of speciale netwerkfuncties.",
      paragraphs: [
        "Surfshark is interessant voor huishoudens met veel apparaten. Vergelijk niet alleen een lijst met mooie functies. Kijk hoeveel apparaten je echt kunt gebruiken, welke apps beschikbaar zijn, wat de privacy-informatie zegt en wat je na de eerste periode betaalt. Een lagere gemiddelde maandprijs is niet beter als het totaalbedrag of de verlengprijs onduidelijk blijft.",
        "Proton VPN kan beter passen als je apps met openbare broncode belangrijk vindt. Kijk ook welke gegevens nodig zijn voor een account en wat wel of niet in het gratis abonnement zit. Mullvad is interessant voor mensen die weinig accountgegevens en een eenvoudige prijs willen. Het kan minder goed passen als streaming en een zeer eenvoudige app het belangrijkst zijn.",
        "AirVPN en andere technische VPN's geven vaak meer instellingen, maar zijn soms moeilijker te gebruiken. ExpressVPN is een andere bekende keuze. Vergelijk beide VPN's op dezelfde dag, met dezelfde apparaten en dezelfde soorten servers. We noemen geen winnaar als de tests en prijzen niet op dezelfde manier zijn gemeten.",
        "Gebruik de tabel om een korte lijst te maken en open daarna elke volledige review. Schrap een VPN als hij niet werkt op jouw apparaat, betaalmethode of belangrijke functie. Vergelijk de volledige kosten, herhaal dezelfde tests en lees hoe je opzegt. De VPN die daarna overblijft, past beter bij jouw gebruik, ook als hij ergens anders niet op nummer één staat.",
      ],
      checklistTitle: "Koppel het alternatief aan de prioriteit",
      bullets: [
        "Huishouden met veel apparaten: vergelijk NordVPN met Surfshark.",
        "Apps met openbare broncode: vergelijk Proton VPN.",
        "Weinig accountgegevens en een eenvoudige prijs: vergelijk Mullvad.",
        "Veel technische instellingen: bekijk AirVPN en andere gespecialiseerde VPN's.",
      ],
      takeawayLabel: "Vergelijkingsregel",
      takeaway:
        "Een betere VPN is de VPN die aan jouw belangrijkste eisen voldoet. Vergelijk bij elke kandidaat dezelfde prijsperiode, dezelfde apparaten en dezelfde testdatum.",
      sources: [],
      related: { label: "Bouw je eigen VPN-vergelijking", href: "/compare" },
    },
  ],
  paaFaqs: [
    {
      question: "Is NordVPN te vertrouwen?",
      answer:
        "NordVPN laat nuttige signalen zien. Het bedrijf meldt dat zijn no-logs-beleid in december 2025 voor de zesde keer extern is onderzocht. Dat onderzoek keek naar een bepaalde periode en een beperkt deel van de systemen. Het is dus positief bewijs, maar geen garantie voor de toekomst.",
    },
    {
      question: "Hoe duur is NordVPN per maand?",
      answer:
        "Er is niet één prijs voor iedereen. De prijs kan verschillen per land, munt, looptijd en aanbieding. Controleer daarom wat je vandaag in totaal betaalt én wat het abonnement later bij verlenging kost.",
    },
    {
      question: "Wat zijn de nadelen van NordVPN?",
      answer:
        "De prijs na verlenging kan hoger zijn. Functies verschillen per apparaat. Snelheid en streaming kunnen per server wisselen. NordVPN past ook minder goed als je contant wilt betalen of port forwarding nodig hebt.",
    },
    {
      question: "Wat is het voordeel van NordVPN?",
      answer:
        "NordVPN heeft apps voor Windows, macOS, Android, iPhone, Linux en tv en laat volgens de eigen uitleg 10 verbindingen tegelijk toe. Het bedrijf meldt meerdere externe controles van zijn no-logs-beleid. Een nieuwe eigen ZeroToVPN-snelheidstest ontbreekt nog.",
    },
    {
      question: "Waarom is VPN onzin?",
      answer:
        "Een VPN is niet nutteloos, maar maakt je ook niet volledig anoniem. Een VPN kan verkeer tussen je apparaat en de VPN-server beschermen en je openbare IP-adres veranderen. Accounts, cookies, malware en gegevens die je zelf deelt blijven bestaan.",
    },
    {
      question: "Is NordVPN echt veilig?",
      answer:
        "NordVPN beschrijft onder meer een kill switch en speciale servers en meldt meerdere externe controles van zijn no-logs-beleid. Veiligheid hangt ook af van je apparaat, instellingen en gebruik. Omdat onze nieuwe tests ontbreken, beloven we niet dat alles altijd veilig werkt.",
    },
    {
      question: "Is NordVPN legaal in Nederland?",
      answer:
        "Een VPN gebruiken is in Nederland meestal legaal. Verboden activiteiten blijven verboden en de regels van websites en apps blijven gelden. Controleer bij gebruik in een ander land altijd de actuele lokale regels.",
    },
    {
      question: "Waarom blokkeert Netflix NordVPN?",
      answer:
        "Netflix kan herkennen dat veel mensen hetzelfde VPN-adres delen of dat de gekozen locatie niet klopt. Verbind één keer opnieuw en controleer welk land de verbinding toont. Geen enkele VPN kan blijvend toegang tot elke Netflix-catalogus beloven.",
    },
  ],
};

export const nordReviewSeoExpansion: Record<
  "en" | "nl",
  NordReviewSeoExpansion
> = { en, nl };
