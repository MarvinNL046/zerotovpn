# ZeroToVPN blog detail template

Status: design blueprint  
Canonical pilot: `/blog/vpn-connection-drops-why-disconnects-how-to-fix-2026`  
Pilot subtype: `Troubleshooting`  
Visual reference: `docs/design/zerotovpn-blog-detail-concept-v1-connection-drops.png`

## Purpose

`BlogArticleShell` is the common editorial framework for timely ZeroToVPN stories. It supplies a consistent Journal header, authorship, evidence, sources, newsletter, related stories, metadata, and footer while allowing each content type to use the structure its search intent needs.

Do not force every blog article into one prose template.

| Content type | Primary reader question | Required core module |
| --- | --- | --- |
| Troubleshooting | Why is this happening now, and what do I test first? | Diagnosis tree and safe fixes |
| News | What happened, when, and who is affected? | What happened and sourced timeline |
| Analysis | What does the evidence mean? | Thesis, evidence, counterpoint, implications |
| Field note | What did ZeroToVPN observe in a bounded test? | Setup, observation, result, limitation |
| Investigation | What did the research uncover? | Finding, dataset, method, source ledger |
| Update | What changed since the previous record? | Before/after change log and impact |

Evergreen definitions and complete curricula belong under `/guides`. Product rankings belong under `/best`; provider verdicts under `/reviews`; head-to-head decisions under `/compare`.

## Visual system

- Continue the `ZEROTOVPN JOURNAL` identity established on `/blog`.
- Use the dark navy global masthead, warm off-white canvas, electric-blue actions, lime evidence status, and amber caveats.
- Use a serif display face for editorial headlines and a compact sans serif for UI and evidence metadata.
- Target about 50% visual/interactive explanation and 50% written content.
- Build wide diagrams, decision paths, annotated images, and real tables instead of a single narrow prose column.
- Do not use generic shield or hooded-hacker art as an article hero.
- Keep all headlines and essential labels in HTML rather than baking them into images.

## Shared article shell

Every subtype uses:

1. Global and Journal navigation.
2. Locale-aware breadcrumb.
3. Content-type label.
4. One H1.
5. Answer-first or summary-first deck.
6. Named author and, where relevant, reviewer.
7. Real published and modified dates.
8. Content-derived reading time.
9. Visible source/test-scope link.
10. Page-specific hero image or explanatory visual.
11. Accessible anchor navigation that matches the real section structure.
12. Explicit evidence/source ledger.
13. Article-appropriate newsletter.
14. Curated related-story shelf.
15. Full Journal/editorial footer.

The shell must be neutral by default. It must not inherit the affiliate disclosure or provider quick picks from a commercial roundup shell.

## Troubleshooting pilot anatomy

### 1. Answer-first diagnostic hero

Pilot H1:

> Why does my VPN keep disconnecting?

Recommended direct answer:

> A VPN usually disconnects because the connection underneath it is unstable, the device switches networks, the app is outdated, a protocol is blocked, one server route fails, or the kill switch blocks traffic after a tunnel drop. Test without the VPN first, then change one variable at a time.

The answer follows the H1 immediately. The second hero column visualizes:

`Device → Wi-Fi/mobile → VPN app and protocol → VPN server → Internet`

Mark possible breakpoints without implying that every breakpoint is equally likely. Primary action: `Start the diagnosis`. Secondary action: `Copy test checklist`.

Trust row:

- provider-neutral;
- technically reviewed;
- test scope shown;
- no paid placement in the diagnosis.

### 2. Article navigation and desktop shell

The sticky anchor navigation must match the visible article:

- Quick answer;
- Diagnose;
- Six safe fixes;
- By device;
- Evidence;
- Support;
- FAQ;
- Sources.

Desktop may use:

- two columns for sticky contents and safety notes;
- seven columns for the main article;
- three columns for symptom selection and test-log utilities.

The right rail contains useful troubleshooting tools, never an affiliate banner.

### 3. Before changing anything

Show four actions before the decision tree:

1. Turn the VPN off briefly.
2. Check whether the base connection also drops.
3. Record network, server, protocol, and time.
4. Change one variable per test.

Safety warning: do not leave the kill switch disabled while handling sensitive traffic.

### 4. Diagnostic decision tree

Use an accessible HTML/SVG flow with a semantic matrix below it.

1. Does the internet also fail without the VPN?
2. Does only one VPN server drop?
3. Does it follow a Wi-Fi/cellular handoff, sleep, or wake?
4. Is traffic blocked after the tunnel drops?
5. Does another documented protocol stay connected?

Possible outcomes:

- base network, router, or ISP;
- endpoint or route;
- device/background permissions;
- kill switch may be working as designed;
- protocol or firewall compatibility;
- reproduce on a second network, then escalate.

For every branch show:

- likely layer;
- first safe action;
- evidence to record;
- what the result does not prove.

### 5. Six safe fixes

Use six wide, numbered modules:

1. Establish a baseline.
2. Update and restart.
3. Change one nearby server.
4. Compare documented protocols.
5. Inspect kill-switch behaviour.
6. Check device and firewall permissions.

Each module exposes:

- `Why this matters`;
- `Try this`;
- `Useful result`;
- `Limitation`.

Natural inline links appear where the concept first matters: WireGuard/OpenVPN/IKEv2 to protocol guidance, speed changes to the speed pillar, and platform settings to device setup pages.

### 6. Device-specific persistence

Use a visible selector and server-rendered checklists for:

- iPhone/iPad;
- Android;
- Windows;
- macOS;
- router/network.

Cover background/cellular permissions, battery optimization, sleep/wake behavior, virtual adapters, firewalls, Wi-Fi bands, and router firmware. Avoid duplicating five full setup guides inside the article.

### 7. Evidence gallery

Useful panels include:

- baseline stability or packet-loss graph;
- protocol comparison log;
- kill-switch state;
- background/battery permission state.

Every evidence item needs:

- device and OS/app version;
- captured/tested date;
- source type;
- what it shows;
- what it does not prove.

Provider-supplied screenshots are labeled as provider-supplied and do not count as evidence of provider-wide reliability.

### 8. Test log

Provide a copyable or downloadable record:

| Date/time | Device/OS | Network | Server | Protocol | Kill switch | Exact symptom | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |

Actions:

- Copy test checklist;
- Download test log;
- See how we test connections.

Core note: a repeatable failure is evidence; one good or bad run is not a universal provider verdict.

### 9. Support or alternatives

`Contact support when`:

- the same error reproduces across networks;
- multiple protocols fail;
- logs show authentication or server errors.

`Consider alternatives when`:

- the base connection is stable;
- documented fixes and support do not help;
- the issue reproduces on multiple devices or routes.

Only here should the page offer the soft internal route `Compare independently tested VPNs`. A later affiliate destination requires disclosure before the first commercial link.

### 10. Sources and test scope

Use explicit claim-to-source records, not automatic domain extraction:

| Claim or check | Source/test record | Checked | Scope and limitation |
| --- | --- | --- | --- |

Valid source layers:

- operating-system documentation;
- provider/app documentation;
- protocol standards;
- dated ZeroToVPN test notes;
- public datasets and primary research.

DataForSEO is search-intent evidence, not proof of technical behavior.

### 11. Author, reviewer, FAQ, and related stories

Show the real person represented by the avatar. Keep author, reviewer, visible label, and structured data consistent. Do not call Marvin's photograph `ZeroToVPN Expert Team` while modeling the team as a `Person`.

The troubleshooting FAQ may answer six or seven high-intent questions. Related stories should remain within the problem-solving cluster:

- VPN protocols explained;
- Why VPN speed changes;
- IP/DNS/WebRTC leak testing;
- VPN setup by device.

Do not insert an unrelated best-VPN offer between the fixes and FAQ.

### 12. Newsletter and footer

Use the existing newsletter capability with the promise:

> Get new troubleshooting notes and independent VPN test updates.

State the frequency. Do not offer a discount or incentive. The email-only exit-intent popup may use the same promise. Finish with the Journal, authors, editorial policy, corrections, disclosures, privacy, RSS, and contact routes.

## Other subtype slots

### News

- `What happened` summary;
- timestamped timeline;
- who is affected;
- confirmed versus unknown;
- primary sources;
- what to do now;
- corrections and updates log.

### Analysis

- thesis;
- evidence;
- counterevidence or uncertainty;
- implications;
- method/source record;
- author conclusion.

### Field note

- observation;
- exact setup;
- result;
- limitation;
- reproducibility note;
- related dataset or method.

### Investigation

- central finding;
- dataset/sample;
- method;
- key records;
- response/right of reply;
- limitations;
- downloadable evidence where lawful.

### Update

- what changed;
- previous state;
- current state;
- reader impact;
- source and captured date;
- revision log.

## Reusable component map

- `BlogArticleShell`
- `ArticleHero`
- `StoryMeta`
- `DirectAnswerCard`
- `SectionToc`
- `TroubleshootingHero`
- `DiagnosticDecisionTree`
- `DiagnosisMatrix`
- `SafeFixSteps`
- `PlatformChecks`
- `EvidenceGallery`
- `EvidenceScreenshot`
- `TestLogTemplate`
- `EscalationDecision`
- `ArticleSourceLedger`
- `EditorialAuthor`
- `EditorialReviewer`
- `EditorialNewsletter`
- `BlogArticleFaq`
- `RelatedStoryShelf`
- `ArticleRevisionLog`

## Current implementation audit

The pilot URL already has a cautious bespoke English rewrite, but it still renders inside a generic monolith.

Current pilot content:

- approximately 1,063 words;
- eight H2 sections;
- seven visible FAQ questions;
- one useful diagnosis table;
- six ordered fixes;
- eight contextual internal links;
- zero external source links;
- zero affiliate links;
- `affiliateContext: none`.

Strengths to preserve:

- clear informational search-intent match;
- baseline-first, one-variable-at-a-time troubleshooting;
- cautious device-, route-, ISP-, protocol-, and provider-dependent language;
- useful protocol, speed, and mobile cluster links;
- visible modified date and correct canonical intent;
- FAQ content matches the English visible article;
- soft comparison route only after troubleshooting.

Required fixes:

1. Replace `BestVpnEditorialTemplate` for informational blog posts. It currently shows a generic affiliate disclosure on desktop even when the article contains no affiliate links; the disclosure disappears on mobile.
2. Replace generic anchors `Article / Cluster / Sources / Related` with navigation matching the real article sections.
3. Make evidence records visible. The content brief currently exposes evidence only as data attributes/counts.
4. Remove or repair dead anchors. `SourcesSection` returns nothing because this article has no external links, yet the navigation still links to Sources.
5. Replace domain-deduplicated automatic source extraction with a claim-level source ledger. An external link is not automatically independently verified evidence.
6. Make author identity consistent. The UI displays Marvin's photo while naming `ZeroToVPN Expert Team`; schema models that team as a `Person`.
7. Repair missing structured-data assets: the publisher references `/logo.png`, which does not exist.
8. Pass the real featured image into Article JSON-LD and page-specific Open Graph data.
9. Optimize the feature image with responsive image handling rather than a raw `<img>` with a generic declared size.
10. Replace the mostly prose `max-w-4xl` flow with structured visual modules and a useful reading shell.
11. Replace the growing set of slug booleans and nested title/content ternaries with typed content records and subtype/module configuration.
12. Move structural content away from one `dangerouslySetInnerHTML` blob where reusable interactive modules are required; typed blocks or MDX are suitable options.
13. Use the existing `NewsletterBlogCTA` in the detail flow.
14. Fix locale generation: do not emit every slug for every locale when a real translation does not exist.
15. Do not mix English metadata/FAQ schema with translated visible articles; align translated content, dates, content brief, and structured data.
16. Ensure non-English breadcrumb structured data includes the locale path.
17. Remove stale database/Postgres comments now that the adapter reads committed JSON.

## SEO and structured data

- Preserve the existing pilot URL and signals.
- Suggested title: `Why Does My VPN Keep Disconnecting? 6 Safe Fixes`.
- Use `Article` or `TechArticle` plus `BreadcrumbList`.
- Use a real `Person` author and `Organization` publisher.
- Include `mainEntityOfPage`, `inLanguage`, `articleSection`, page-specific image, and citations where the records support them.
- Do not use `HowTo` for a conditional decision tree with no single guaranteed outcome.
- FAQ markup must match visible localized content and current search-engine policy.
- Only emit hreflang for actual translations.
- Put the direct answer immediately below the H1.
- Link early to evergreen protocol, speed, and device pillars without duplicating their complete intent.

## Affiliate rules

- Troubleshooting diagnosis is provider-neutral.
- No price, coupon, countdown, provider ranking, or affiliate CTA in the hero, diagnosis tree, fixes, device checks, or evidence gallery.
- If a contextual provider link is genuinely necessary, disclose it before the first affiliate link and use `rel="sponsored nofollow"`.
- A comparison route appears only after the escalation criteria.
- Do not tell readers to switch before verifying the underlying network and reproducing the issue.

## Accessibility and responsive behavior

- On mobile, stack hero text above the diagnostic diagram.
- Convert the sticky TOC to a horizontally scrollable anchor rail.
- Render the decision tree as a vertical question path.
- Keep a semantic diagnosis matrix as the diagram's text alternative.
- Move the utility rail into the reading flow after the quick answer.
- Device navigation may scroll, but all platform content remains reachable without JavaScript.
- Tables retain row labels and allow horizontal scrolling.
- Statuses use words and icons, not color alone.
- Evidence gallery becomes a keyboard-accessible scroll-snap list with visible captions.
- No sticky affiliate bar or blocking commercial popup.
- Touch targets are at least 44×44 pixels and animations respect reduced motion.

## Acceptance criteria

- A reader knows the first safe diagnostic step after the hero.
- The decision tree separates base-network, server-route, device, kill-switch, and protocol/firewall issues.
- Every recommended change states what result is useful and what it does not prove.
- The kill-switch warning remains visible.
- The article contains a usable evidence record and test-log template.
- Author, reviewer, visible copy, and structured data agree.
- The source ledger connects claims to real records.
- The diagnostic core contains no commercial provider placement.
- The page remains distinct from the protocol/speed/device evergreen guides.
- Newsletter, locale, metadata, schema, responsive, keyboard, image, and LCP checks pass.

## Mockup prompt record

Mode: built-in image generation. The first pass used five references; the completion pass used the generated detail concept plus the Journal overview as references.

Prompt intent: create a full provider-neutral ZeroToVPN troubleshooting detail page with answer-first hero, five-breakpoint network diagram, safety-first baseline, diagnostic tree, symptom matrix, six fixes, device checks, evidence gallery, test log, support-versus-alternatives criteria, claim-level source ledger, real author/reviewer treatment, FAQ, related stories, neutral newsletter, knowledge routes, and Journal footer; prohibit provider branding, affiliate placement in the diagnostic core, prices, discounts, invented test outcomes, unsafe kill-switch advice, fake reviewer identity, and generic prose-only layout.
