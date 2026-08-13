# ZeroToVPN evergreen explainer template

Status: design blueprint  
Canonical pilot: `/guides/how-vpn-works`  
Companion page: `/guides/what-is-vpn`  
Visual reference: `docs/design/zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png`

## Purpose

This template turns a central educational topic into a visual, technically reviewed reference page. It is deliberately different from a provider review, country roundup, or comparison page:

- education and understanding are the primary conversion;
- diagrams, matrices, tools, and evidence carry at least half of the page;
- commercial routes appear only after the reader understands the limits;
- provider placement is neutral and contextual, never the hero;
- every important technical claim can be traced to a source or test method.

For the pilot, `/guides/what-is-vpn` remains the beginner overview: what a VPN is, common uses, benefits, and limitations. `/guides/how-vpn-works` owns the deeper mechanism intent: packet flow, tunnel boundaries, encryption, protocols, and what each party can see. The two pages should link to one another but must not repeat the same introduction and section set.

## Visual system

- Warm off-white editorial canvas with dark navy masthead and lab sections.
- Electric blue for navigation, links, packet flow, and primary tools.
- Lime is reserved for verified evidence or successful checks.
- Amber marks a dependency, nuance, or limitation; red marks a genuine non-capability.
- Display serif for major editorial headings; compact sans serif for interface copy and data.
- Twelve-column desktop grid, generous whitespace, restrained corner radius.
- Target visual-to-text ratio: about 50/50.
- Use wide explanatory modules, not an endless stack of small SaaS cards.
- Desktop uses a sticky section rail; mobile uses horizontally scrollable jump links.

## Page anatomy

### 1. Utility and site header

- Optional report/news strip.
- Main navigation: Best VPNs, Reviews, Countries, Devices, Guides, How we test.
- Search and VPN Finder remain available.
- Breadcrumb uses the canonical locale-aware route.

### 2. Answer-first hero

Required:

- intent label such as `VPN BASICS`;
- one H1;
- 40–55 word direct answer that can stand alone in a snippet;
- named author and technical reviewer;
- real modified date and estimated reading time;
- visible sources link;
- trust row: technically reviewed, sources cited, no paid placement.

The hero visual must explain the mechanism. For `How does a VPN work?`, show:

`Your device → encrypted device-to-server tunnel → VPN server → internet`

Place the ISP outside the tunnel and state precisely what it can still observe. Do not use a generic shield as the main image.

### 3. Thirty-second explanation

Combine a short definition with a large before/after flow:

- without VPN: device → ISP → destination;
- with VPN: device → encrypted tunnel → VPN server → destination;
- destination sees the server IP, not the user's original public IP;
- the VPN does not remove account, cookie, fingerprint, payment, or signed-in identity.

Always include the trust-transfer nuance: the reader shifts trust from the local network and ISP toward the VPN provider.

### 4. Packet journey

Use a six-step visual timeline:

1. Connect to a server.
2. Negotiate keys and authenticate.
3. Wrap traffic in protected packets.
4. Send packets through the local network and ISP.
5. Decrypt at the VPN endpoint and forward the request.
6. Return the response through the tunnel.

Each step gets one diagram and one compact explanation. An optional expanded cutaway can show headers, encrypted payload, DNS path, and the point where ordinary HTTPS continues to matter.

### 5. Visibility matrix

Use a real semantic table, not card-shaped paragraphs. Suggested columns:

| Data or signal | Local network / ISP | VPN provider | Destination website | Important limitation |
| --- | --- | --- | --- | --- |
| HTTPS content | Cannot read content | Sees encrypted/forwarded connection metadata depending on implementation | Destination receives request | HTTPS already protects content to the destination |
| DNS requests | Depends on resolver and leak protection | May process requests | Usually not directly | Configuration and leaks matter |
| Public IP | Sees the VPN connection | Sees the source IP | Sees VPN server IP | The provider becomes a trust party |
| Approximate location | Can infer source network | Depends | Sees server location plus other signals | Browser and account signals can reveal more |
| Account identity | Not removed | Not removed | Visible when signed in | A VPN is not anonymity |
| Cookies/fingerprinting | Not removed | Not removed | Can still track | Browser controls are separate |
| Malware/phishing | Not inherently blocked | Not inherently blocked | Not inherently blocked | Use layered security |

Cell states must distinguish `protected`, `visible`, `depends`, and `not solved`. Each state has a text label as well as a color/icon.

### 6. Encryption and protocols

Start with a lock/unlock packet diagram. Then compare standards in equal cards or a table:

- WireGuard;
- OpenVPN;
- IKEv2/IPsec.

Each entry includes best fit, strengths, limitations, evidence/source link, and a route to its own protocol explainer. Do not call a protocol universally “fastest” or “most secure”. Provider-specific protocol variants are implementations, not independent standards.

### 7. Interactive privacy lab

Offer useful first-party tools where feasible:

- public IP before/after check;
- DNS leak check;
- WebRTC exposure check;
- browser/network explanation.

Default to local or privacy-minimizing processing. Explain what the result does and does not prove. An exposed result leads to educational remediation, not an aggressive provider offer.

### 8. Helps versus cannot do

Use image-led use-case tiles for public Wi-Fi, travel, remote work, ISP privacy, and access to a reader's own services. Pair them with an equally prominent limitation panel:

- does not guarantee anonymity;
- does not remove malware;
- does not stop phishing;
- does not hide activity performed while signed in;
- does not replace HTTPS, updates, a password manager, or multi-factor authentication.

### 9. Myths checked

Use wide `MYTH / REALITY` rows for high-intent questions. Keep the language nuanced and link naturally to deeper cluster pages. Good starters:

- A VPN makes you anonymous.
- Incognito mode replaces a VPN.
- All VPN traffic is invisible.
- Free VPNs are always unsafe.
- A VPN always makes the internet faster.

### 10. Trustworthy choice bridge

Only after the educational core, show the evaluation criteria:

- independent audits and evidence;
- ownership and jurisdiction;
- protocol support;
- leak protection;
- transparency;
- reproducible test results.

Primary action: `Compare independently tested VPNs`. Secondary action: `Read our testing methodology`. A provider link is allowed only when the paragraph genuinely discusses that provider and the affiliate disclosure appears before the first commercial link.

### 11. Knowledge footer

- Glossary for the page's technical terms.
- Numbered sources and technical-review record.
- Six to eight concise FAQs.
- Continue-learning cards to adjacent guides and tools.
- Neutral newsletter capture for explainers and test updates.
- Full editorial and legal footer.

## Reusable component map

Build shared modules instead of page-specific markup:

- `ExplainerPageShell`
- `ExplainerHero`
- `TunnelFlowHero`
- `BeforeAfterNetworkFlow`
- `PacketJourney`
- `VisibilityMatrix`
- `ProtocolComparison`
- `PrivacyToolLab`
- `UseCaseGallery`
- `CapabilityLimits`
- `MythRealityRows`
- `TrustChecklist`
- `GlossaryGrid`
- `SourceLedger`
- `ExplainerFaq`
- `ContinueLearning`

Reuse the existing breadcrumb, locale navigation, FAQ accordion, related-content, and JSON-LD primitives where their semantics remain correct.

## Existing strengths to preserve

The current routes already provide a useful base:

- `/guides/what-is-vpn` and `/guides/how-vpn-works` are separate canonical pages;
- locale-aware permanent redirects exist for `/what-is-a-vpn` and `/how-does-a-vpn-work`;
- the technical page already uses a single H1, logical headings, alternates, Article JSON-LD, breadcrumbs, FAQs, and related content;
- all nine locales have message namespaces for both explainers;
- the content graph already connects protocols, privacy, speed, and related guides.

## Required fixes before implementation is complete

1. Replace the future `dateModified="2026-11-28"` in the technical page with the real publication workflow date.
2. Add a real page-specific Open Graph image. `ArticleJsonLd` currently falls back to `/og-image.png`, while the working generic route is `/opengraph-image`.
3. Localize Open Graph copy, Article JSON-LD, breadcrumb labels, FAQs, and manually authored related cards instead of emitting English on non-English pages.
4. Make the Guides breadcrumb locale-aware.
5. Remove the internal redirect hop from `/are-vpns-safe` to `/what-is-a-vpn`; link to `/guides/what-is-vpn` directly.
6. Reconsider `HowToSchema`: the current schema describes how to use a VPN, not how VPN transport works. Use Article schema alone or add a genuinely task-based, visible step sequence.
7. Add named author/reviewer information and a source ledger to visible copy and structured data.
8. Replace universal AES-256, “military-grade”, “fastest”, “most secure”, government-protection, universal unblocking, and travel-price claims with protocol-specific, sourced language.
9. Clarify that tunnel encryption ends at the VPN server and that HTTPS remains responsible for end-to-end website transport protection.
10. Keep approved partner videos provider-labeled and separate from independent test evidence. Generate accessible poster images and transcripts before publishing video.

## SEO and internal-link rules

- `what-is-vpn` owns beginner definition intent; `how-vpn-works` owns technical mechanism intent.
- Put natural inline links where the concept first appears, not only in a large related-links footer.
- Link packet flow to IP, DNS, encryption, and protocol explainers.
- Link limitations to incognito, fingerprinting, malware, and anonymity guides.
- Link evaluation criteria to the testing methodology and comparison pillar.
- Keep one canonical per locale and preserve existing legacy redirects.
- Article and BreadcrumbList are the default structured-data types. Add FAQ structured data only if current search-engine policy and visible content support it.
- Never fabricate live tool outcomes, test dates, reviewer identities, sources, or verification states.

## Affiliate and partner-asset rules

- The educational hero and tool lab are provider-neutral.
- No provider price, coupon, countdown, urgency, or buy button above the educational core.
- Partner media is labeled as provider-supplied and never presented as independent ZeroToVPN evidence.
- Any affiliate link is contextual, disclosed before the first link, and uses `rel="sponsored nofollow"`.
- Email capture may use an exit-intent modal, but it must remain a newsletter invitation—not a disguised NordVPN discount or incentive.

## Accessibility and responsive behavior

- Diagrams need an adjacent text explanation and meaningful alt text.
- Do not encode table state in color alone.
- Tables scroll with visible row labels on small screens.
- Packet journey becomes a vertical sequence on mobile.
- Jump navigation remains keyboard accessible and respects reduced motion.
- Tool results use live regions and retain a non-JavaScript explanation.
- Minimum touch target is 44×44 pixels; focus states remain visible.

## Acceptance criteria

- A reader can explain the VPN boundary after the hero and quick-answer block.
- The page explicitly states what the ISP, VPN provider, and destination can observe.
- Technical claims have a visible source or evidence status.
- At least four major modules are visual, tabular, or interactive.
- The limitation block appears before the comparison CTA.
- No provider receives paid-looking placement in the educational hero.
- The two canonical explainer pages do not compete for the same section outline.
- All locale, metadata, schema, accessibility, and redirect checks pass.
- The page works without interaction; tools and animation progressively enhance it.

## Mockup prompt record

Mode: built-in image generation with five visual references.

Prompt intent: create a tall, shippable ZeroToVPN desktop explainer for `How does a VPN work?`; preserve the established ZeroToVPN editorial system; reinterpret supplied Nord educational material into original provider-neutral diagrams; show the tunnel boundary, before/after flow, six-step packet journey, visibility matrix, protocol comparison, privacy tools, use cases, limitations, myths, trust checklist, glossary, sources, FAQ, learning cards, newsletter, and footer; prohibit provider branding, affiliate offers, anonymity claims, coupons, urgency, and generic shield-led cybersecurity imagery.
