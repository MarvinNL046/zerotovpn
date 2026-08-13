# ZeroToVPN interactive tools — design templates

Status: design-ready; no application code changed

Mode: built-in image generation (ui-mockup), using existing ZeroToVPN mockups as style references

Created: 13 August 2026

## Deliverables

| Route | Mockup | Primary state shown |
| --- | --- | --- |
| /quiz | zerotovpn-vpn-finder-concept-v1.png | question 2 plus transparent top-three results |
| /tools/dns-leak-test | zerotovpn-dns-leak-test-concept-v1.png | warning result plus idle/running/safe/warning/error system |
| /speed-test | zerotovpn-speed-test-concept-v1.png | completed benchmark plus every test phase |
| /tools | zerotovpn-tools-hub-concept-v1.png | utility discovery, live snapshot, workflows and recent local results |

The images are visual specifications. Provider prices, scores, dates, locations and test numbers inside them are illustrative and must be bound to verified production data.

## Shared visual system

- Keep the established electric-blue announcement strip and deep-navy ZeroToVPN navigation.
- Use editorial serif display headings, a highly legible sans-serif UI face and tabular numerals for measurements.
- Use warm-white editorial surfaces around dark diagnostic consoles. Blue/cyan identifies interactive and informational states; green means a measured safe/pass state; amber means uncertainty; red is reserved for a hard failure.
- Prefer small original diagrams, charts, route maps and result tables over repeated shield icons.
- Put the tool or question before commercial content. Evidence boundaries, test context and methodology links remain visible.
- Every result explains what it measured, what it did not measure and what the user can do next.

## Route anatomy

### VPN Finder — /quiz

1. Hero with time, privacy and methodology trust cues.
2. Five-step progress, large answer tiles, keyboard-selectable state and editable answer summary.
3. Published-weight strip explaining how the match is calculated.
4. Results header with the active answer chips and disclosure.
5. Three provider matches with evidence bars, honest drawback, tested date, price snapshot and separate review/provider actions.
6. Expandable “Why this matched” reasoning and a compact comparison table.
7. Alternative use-case routes, FAQ, neutral newsletter and footer.

### DNS Leak Test — /tools/dns-leak-test

1. Diagnostic hero and prominent evidence-boundary notice.
2. Main stateful console: result headline, masked public IP, VPN signal, resolver table and route diagram.
3. State rail for idle, running, safe, warning and error.
4. Interpretation table: signal / possible meaning / what it cannot prove.
5. Numbered fix flow with OS-specific tabs.
6. Broader checks: IP, WebRTC and speed.
7. Contextual provider documentation only after diagnosis and after an affiliate disclosure.
8. FAQ, evidence ledger, newsletter and footer.

### Speed Test — /speed-test

1. Benchmark hero, local-storage note and browser-test limitation.
2. Main console with gauge, download, upload, ping, jitter and explicit test context.
3. Phase rail: idle, ping, download, upload and complete, including stop/cancel behavior.
4. Baseline versus VPN-on workflow with calculated deltas and plain-language verdict.
5. Repeated-run line chart, retained-speed comparison and accessible data alternative.
6. Filterable local history with export and deletion controls.
7. Use-case interpretation, methodology, related tools, newsletter and footer.

### Tools Hub — /tools

1. Searchable hero with concise privacy promise.
2. Masked connection snapshot and most-used tools.
3. Category filters and rich cards with purpose, duration and expected output.
4. Guided workflows for “Is my VPN working?”, “Why is my connection slow?” and “Which VPN fits me?”.
5. Evidence-boundary section separating route, browser and performance checks.
6. Local-only recent results plus empty state and data controls.
7. Learning routes, FAQ, newsletter and footer.

## Current-route audit highlights

### /quiz

- Preserve: localized metadata and alternates, five-question progress, keyboard-native radio inputs, top-three results and existing review links.
- Improve: the location answer currently awards points from total country coverage rather than the chosen region. The result percentage therefore looks more precise than the model is.
- Improve: make weights, tie-breaking, missing-data behavior and match reasons visible. Version the scoring model and record the data snapshot used.
- Improve: the result link uses sponsored/nofollow attributes, but the results UI needs an explicit disclosure before the first commercial link.
- Guardrail: do not say recommendations are “not affiliate deals.” Say rankings are not sold and that outbound links may earn commission.

### /tools/dns-leak-test

- Preserve: the English editorial route already has a strong evidence boundary, interpretation table, fix checklist, FAQ and source ledger.
- Critical prerequisite: the current widget comments explicitly say it “simulate[s] DNS resolution checks.” It reads public-IP values from Cloudflare trace endpoints and falls back to IP-based inference; it does not observe the browser’s resolver through unique DNS probe domains.
- Do not ship a definitive “DNS leak detected” label from that heuristic. Either build a real tokenized DNS-probe service and resolver callback pipeline or rename the widget to a connection-route heuristic.
- Add a real error state; the current catch path becomes no-vpn and can hide failures.
- Retain uncertainty language: a resolver result cannot prove anonymity, no logging or protection for every app/device.

### /speed-test

- Preserve: real Cloudflare download/upload requests, separate ping/download/upload phases, abort control, animated gauge, local-only history and before/after support.
- Improve: add an explicit error/retry state instead of silently returning to idle, expose test endpoint/method context, and capture comparable baseline/VPN runs rather than inferring from the last two tests.
- Improve: split the 1,100+ line widget into measurement, state machine, gauge, history and comparison components.
- Guardrail: a browser test is not a lab-grade universal ISP result; explain Wi-Fi, device, endpoint, server load and time-of-day variance.

### /tools

- Current page exposes only IP, DNS and speed cards followed by a large direct NordVPN banner.
- Replace the sales-first banner with tool discovery, guided workflows, evidence boundaries and related learning. Commercial recommendations may appear only after a relevant diagnostic result and disclosure.
- Reuse the already working IP, DNS and speed widgets as deep links or compact summaries; do not make the hub run every expensive test automatically.

## Reusable component map

- LabPageShell: announcement, nav, breadcrumb, content rail and footer.
- TrustCueRow: no signup, local storage, browser-based and methodology labels.
- EvidenceBoundary: amber or blue statement of scope and limitations.
- ToolStateFrame: discriminated idle/running/safe/warning/error wrapper with aria-live copy.
- StateRail: compact preview or progress representation of every state.
- MetricCard and TestContextCard: value, unit, source, timestamp and status.
- ResultTable: semantic table with compact mobile card alternative.
- NetworkRouteDiagram: expected and unexpected paths with text/line-style redundancy.
- LocalResultHistory: view, compare, export and delete locally stored runs.
- RelatedToolCard and WorkflowRoute: intentional diagnostic hand-offs.
- MethodologyPanel and SourceLedger: evidence provenance and last-reviewed date.
- WizardProgress, AnswerTile, AnswerSummary and WizardNavigation.
- MatchExplanation, ProviderMatchCard and MatchComparisonTable.
- AffiliateDisclosure: rendered before the first commercial link, never only in the footer.

Recommended data contracts:

- ToolState = idle | running | safe | warning | error.
- TestResultEnvelope = id, tool, state, startedAt, completedAt, context, observations, interpretation, limitations, schemaVersion.
- MatchResult = providerId, modelVersion, dataSnapshotAt, score, scoreParts, matchedReasons, limitations, priceVerifiedAt.

## Guardrails

- Use RFC 5737 documentation addresses in fixtures: 192.0.2.0/24, 198.51.100.0/24 or 203.0.113.0/24.
- Never claim a VPN makes a user anonymous, that one green test proves no logging, or that a single browser result covers every app/device.
- Do not invent a resolver, endpoint location, provider audit, plan price or discount. Show source and verification date.
- Store history locally by default; disclose storage and provide clear delete/export controls.
- Separate editorial match score from commercial relationship. A provider cannot buy rank.
- Respect Nord promotion rules: no unauthorized coupon language, cashback/incentives, pop-under advertising, deceptive urgency or provider links on unsuitable content.
- The email exit-intent flow is separate from these mockups and must remain consent-based, dismissible and unrelated to fake test urgency.

## Responsive and accessibility requirements

- Desktop: 12-column grid; tablet: supporting rail moves below the primary tool; mobile: one column with the active control and result first.
- Tables gain a semantic card view below 720px; do not rely on horizontal scrolling as the only mobile solution.
- Minimum 44×44px targets, visible focus rings, native radios/checkboxes behind custom tiles, keyboard-operable tabs/accordions.
- Announce test phase and completion through a polite aria-live region; errors use role=alert without repeatedly stealing focus.
- Status is encoded by icon, label and border/pattern as well as color. Maintain WCAG AA contrast.
- Charts require a caption, legend, exact value table and non-color line/marker differences.
- Respect prefers-reduced-motion; keep results stable during animated gauges and progress changes.
- Preserve the user’s answers when navigating back, and make reset/delete actions explicit and reversible where practical.

## Exact image-generation prompt records

All four images used the built-in image generation mode. No CLI/API fallback was used.

### VPN Finder prompt

> Use case: ui-mockup
> Asset type: complete tall desktop website mockup for ZeroToVPN VPN Finder at /quiz
> Primary request: Create a polished, production-ready full-page VPN recommendation wizard and transparent results experience, visually consistent with the supplied ZeroToVPN reference pages. This is an interactive editorial product, not a generic SaaS landing page.
> Input images: Image 1 is the primary ZeroToVPN visual-system reference for navy header, electric-blue accents, editorial hierarchy and card density. Image 2 is a reference for evidence-led technical diagrams and trust language. Image 3 is a reference for provider comparison cards and measured-result presentation.
> Canvas and composition: tall desktop page, approximately 1440px-wide responsive web layout shown from header through footer, dense but highly scannable, complete page with no cropped bottom. Use a 12-column grid, generous white space, crisp borders, large cards, and a sticky mini progress rail.
> Header: slim electric-blue announcement strip; dark navy ZeroToVPN navigation with logo text "ZeroToVPN", links "Best VPNs", "Reviews", "Countries", "Devices", "Guides", "How we test", search icon, and active button "VPN Finder".
> Hero: eyebrow "PERSONALIZED VPN MATCHER"; editorial serif headline "Find the right VPN for how you actually use the internet"; concise copy explaining five questions, no email required, recommendations based on published test data. Add trust chips "Takes 60 seconds", "No signup", "Methodology published".
> Main wizard: a large white card with step indicator "STEP 2 OF 5" and progress 40%. Question headline "What matters most to you?" Display six large visual answer tiles with original technical/lifestyle images or illustrations: Streaming, Privacy, Travel, Gaming, Remote work, Lowest price. One selected tile has bright blue border and check. Buttons "Back" and "Continue". At right, a narrow "Your answers" card summarizes Region: United States, Priority: Privacy, Devices: 6–10 and says answers can be changed.
> Transparency strip: dark navy panel titled "How matching works" with four weighted inputs: Privacy tests 35%, Speed 25%, Usability 20%, Value 20%, plus link "Read scoring methodology".
> Results section below, clearly a second UI state labeled "RESULTS PREVIEW". Headline "Your best matches" and summary chips based on answers. Show three refined ranked result cards, not ad banners: #1 NordVPN 94% match, #2 Proton VPN 91%, #3 Surfshark 88%. Each includes provider logo area, evidence bars for Privacy, Speed, Streaming, Ease of use; one honest drawback; tested date; price snapshot marked "Check live price"; buttons "Read full review" and blue "Visit provider". Include visible "Sponsored links may earn us a commission; rankings follow our published scoring model."
> Add an expandable "Why this matched" evidence drawer for the top result with checkmarks tied to user's selected needs and one warning/limitation. Add side-by-side mini comparison table for the top three.
> Lower page: "Need a different kind of VPN?" use-case cards, FAQ accordion, neutral email newsletter "The Privacy Brief", then full dark navy ZeroToVPN footer.
> Style/medium: realistic high-fidelity product UI, modern editorial lab aesthetic, not concept art; legible Inter-like sans-serif body plus confident magazine-style serif headings.
> Color palette: deep navy #04152f, electric blue #126bff, cyan #23c8ff, white and warm off-white, restrained lime for verified states, amber for limitations.
> Text (verbatim where shown): "Find the right VPN for how you actually use the internet", "What matters most to you?", "How matching works", "Your best matches", "Why this matched", "No signup", "Methodology published".
> Constraints: maintain clear visual continuity with reference images; show a realistic interactive state and a realistic result state on one complete tall page; prices are snapshots, never promise discounts; accessible contrast; visible focus/selected state; no popup; no fake testimonials; no exaggerated security claims; no dark patterns; no watermark; no browser chrome.
> Avoid: generic gradient SaaS hero, huge empty areas, excessive rounded pills, tiny unreadable text, provider domination above the wizard, cropped footer.

References: zerotovpn-homepage-concept-v3-visual-editorial.png; zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png; zerotovpn-review-detail-concept-v1-nordvpn.png.

### DNS Leak Test prompt

> Use case: ui-mockup
> Asset type: complete tall desktop website mockup for ZeroToVPN DNS Leak Test at /tools/dns-leak-test
> Primary request: Create a polished production-ready privacy diagnostic page that makes a DNS leak understandable, shows the live test as the focal product, and visibly documents all important UI states: idle, running, safe, warning, and error. Preserve the supplied ZeroToVPN editorial-lab design.
> Input images: Image 1 is the primary ZeroToVPN visual-system reference for the navy header and editorial card grid. Image 2 is the technical explainer reference for clean network diagrams, evidence boundaries, tables and tool modules.
> Canvas and composition: tall full desktop page from nav through footer, about 1440px wide, complete uncropped page; 12-column grid with a main diagnostic workspace and a supporting interpretation rail.
> Header: electric-blue announcement strip; dark navy ZeroToVPN nav with "Best VPNs", "Reviews", "Countries", "Devices", "Guides", "How we test", search, "VPN Finder".
> Hero: breadcrumb "Tools / DNS Leak Test"; eyebrow "PRIVACY DIAGNOSTIC"; large serif headline "DNS Leak Test: Is your VPN routing DNS correctly?"; concise explanation. Trust row "Runs in your browser", "No signup", "Results are not stored". Prominent amber evidence note: "A DNS result is a route check—not a complete VPN privacy audit."
> Primary diagnostic: oversized dark navy-to-blue lab panel. Main displayed state is WARNING with shield icon and headline "Possible DNS leak detected". Show "Your public IP" masked as 203.0.113.••, VPN detected: Yes, three resolver rows in a clear table: resolver, organization, country, route. One row labeled ISP resolver and highlighted amber; two labeled VPN resolver with green checks. Include buttons "Test again" and "How to fix this". Add a compact network-path diagram Device → VPN tunnel → DNS resolver → Website, with the unexpected ISP route in amber dashed line.
> State system strip immediately below titled "COMPONENT STATES": five small but legible cards showing Idle ("Ready to test" + "Run DNS test"), Running ("Checking resolver 2 of 3" + progress), Safe ("No obvious DNS leak detected"), Warning ("Possible DNS leak detected"), Error ("Test could not complete" + "Try again"). Make each visually distinct and accessible without color alone.
> Interpretation section: headline "What your result can—and cannot—tell you". Three-column table: Signal, What it may indicate, What it cannot prove. Include ISP resolver appears, VPN resolver appears, Mixed providers. Use icon/status labels.
> Fix flow: a visual numbered troubleshooting path with six steps: Save baseline, Reconnect VPN, Check app DNS, Review Secure DNS/DoH, Test IPv4 + IPv6, Contact provider with evidence. Include small OS tabs Windows, macOS, Android, iOS.
> Broader privacy check panel: three linked tool cards "Check your IP", "Test WebRTC", "Run speed test", plus a quiet link to methodology.
> Contextual recommendations only after diagnostics: section "VPN options to verify" with three compact provider cards framed as settings/documentation checks, not guarantees; clear affiliate disclosure before first commercial link.
> Bottom: DNS leak FAQ accordion, cited sources/evidence ledger, neutral newsletter, full ZeroToVPN footer.
> Style/medium: realistic high-fidelity product UI, editorial privacy lab, readable technical dashboard, not concept art.
> Color palette: navy #04152f, electric blue #126bff, cyan, white/off-white, green for safe, amber for uncertain/warning, red only for hard failure.
> Text (verbatim where shown): "DNS Leak Test: Is your VPN routing DNS correctly?", "Possible DNS leak detected", "A DNS result is a route check—not a complete VPN privacy audit.", "COMPONENT STATES", "What your result can—and cannot—tell you", "How to fix this".
> Constraints: show all five states clearly; diagnostic first, monetization later; mask example IPs; accessible labels and contrast; no claim that a green result proves anonymity or no logging; no popup; no fake live geolocation; no watermark; no browser chrome; complete footer visible.
> Avoid: giant generic shield hero, sales-first VPN card wall, overuse of red, unreadable table text, cropped lower sections.

References: zerotovpn-homepage-concept-v3-visual-editorial.png; zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png.

### Speed Test prompt

> Use case: ui-mockup
> Asset type: complete tall desktop website mockup for ZeroToVPN Internet + VPN Speed Test at /speed-test
> Primary request: Create a polished production-ready network benchmark tool that feels like an independent test lab. Show the completed result as the main experience plus the full phase/state model, repeatable before-and-after VPN testing, history, interpretation and methodology. Preserve the supplied ZeroToVPN editorial visual language.
> Input images: Image 1 is the primary visual-system reference for navigation, dark lab panels, electric blue, cards and visual density. Image 2 is the technical explainer reference for diagrams, evidence boundaries and accessible tables. Image 3 is the review reference for measured charts and honest verdict cards.
> Canvas and composition: complete tall desktop page from top nav through footer, around 1440px wide, 12-column responsive grid, dense and highly scannable, no cropped bottom.
> Header: blue announcement bar; dark navy ZeroToVPN nav links; search; active "VPN Finder".
> Hero: breadcrumb "Tools / Internet Speed Test"; eyebrow "NETWORK BENCHMARK"; serif H1 "Internet & VPN Speed Test"; subcopy "Measure download, upload, ping and jitter—then compare the same connection before and after a VPN." Trust chips "No signup", "Results stay on this device", "Methodology published". Add evidence note that browser tests vary by device, Wi-Fi, server load and time of day.
> Primary benchmark panel: large dark lab console. Center-left is a refined circular speed gauge reading "468 Mbps" in completed state with blue/cyan needle and subtle graph. Right side shows four big metrics: Download 468 Mbps, Upload 213 Mbps, Ping 18 ms, Jitter 3 ms. Badge "Very fast". Primary button "Test again"; secondary "Share results". Display test context: Amsterdam test endpoint, Wi-Fi, Chrome, Aug 13 2026 21:55.
> State/phase strip: five compact state cards labeled Idle, Ping, Download, Upload, Complete. Use meaningful icons and progress indicators, including a Stop control during running states. Must remain legible without relying only on color.
> Before/after lab workflow: headline "Measure your VPN’s real impact". Two side-by-side result cards Baseline (VPN off) and VPN on, then a calculated delta panel: Download −8%, Upload −4%, Ping +7 ms. Honest verdict "Small speed loss; latency remains good for streaming and calls." Add button "Save this comparison".
> Visual data section: a clean line chart of five repeated runs by time of day and a horizontal bar chart comparing retained speed across three VPN locations. Include note "Illustrative UI data—production uses your recorded runs."
> History table: date/time, VPN status, endpoint, download, upload, ping, jitter, actions; filter tabs All, Baseline, VPN on. Show export CSV and clear history controls.
> Interpretation: practical threshold cards for 4K streaming, video calls, gaming, large downloads; clear caveat that latency stability matters as well as headline Mbps.
> Methodology: dark evidence panel explaining endpoints, sample size, browser limitations and how to run a fair comparison; link "Read the full testing method".
> Related tools: Check your IP, DNS leak test, WebRTC test. FAQ, neutral newsletter, complete dark footer.
> Style/medium: realistic high-fidelity product UI, independent network lab blended with editorial magazine, not futuristic sci-fi.
> Color palette: deep navy, electric blue, cyan, white/off-white, emerald for completed good state, amber for caveats, purple only for upload metric.
> Text (verbatim where shown): "Internet & VPN Speed Test", "Measure your VPN’s real impact", "468 Mbps", "Download", "Upload", "Ping", "Jitter", "Small speed loss; latency remains good for streaming and calls.", "Save this comparison".
> Constraints: show completed main state plus five phase states; no claims of universal ISP speed; example data labeled illustrative where appropriate; accessible charts with labels; no popup; no fake endorsements; no watermark; no browser chrome; footer fully visible.
> Avoid: generic Ookla clone, neon sci-fi overload, only one giant gauge, tiny history table, hidden methodology, cropped footer.

References: zerotovpn-homepage-concept-v3-visual-editorial.png; zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png; zerotovpn-review-detail-concept-v1-nordvpn.png.

### Tools Hub prompt

> Use case: ui-mockup
> Asset type: complete tall desktop website mockup for ZeroToVPN Privacy Tools Hub at /tools
> Primary request: Create a polished production-ready utility hub that feels like a coherent privacy lab, not three generic link cards. It should help users choose the right check, surface a useful live snapshot, connect diagnostics into workflows, and route naturally to explainers and methodology. Preserve the supplied ZeroToVPN editorial design.
> Input images: Image 1 is the primary ZeroToVPN visual-system reference for hero grids, editorial imagery, navy header, electric blue accents and scanability. Image 2 is the explainer reference for clean technical diagrams, tool modules, trust language and evidence boundaries. Image 3 is the blog reference for topic navigation and dense content discovery.
> Canvas and composition: complete tall desktop page from announcement bar to footer, about 1440px wide, 12-column responsive layout, visually rich but clean, no cropped bottom.
> Header: blue announcement strip; dark navy ZeroToVPN nav with standard links, search and "VPN Finder".
> Hero: eyebrow "ZEROTOVPN LAB"; large serif headline "Free privacy & VPN tools"; subcopy "Check what your browser and network reveal—then understand what each result actually means." Search field "Find a tool or check…" and trust chips "No signup", "Browser-based", "Methodology published".
> Hero grid: large featured live snapshot card on left titled "Your connection at a glance" with masked IP 203.0.113.••, approximate region Netherlands, ISP hidden, VPN status "Not detected", DNS status "Not tested", WebRTC "Not tested", and a blue button "Run privacy checkup". Right side stacked "Most used" cards for DNS Leak Test, Internet Speed Test, What Is My IP, each with original technical imagery/mini visualization rather than generic icons.
> Tool category navigation tabs: All tools, Privacy, Network, VPN testing, Troubleshooting.
> Main tool library: visually rich cards arranged by task with title, one-line purpose, time estimate, and explicit output:
> 1 What Is My IP — "See the public IP and network details websites receive"
> 2 DNS Leak Test — "See which resolvers answer your browser"
> 3 WebRTC Leak Test — "Check whether browser peer connections reveal another IP"
> 4 Internet & VPN Speed Test — "Measure download, upload, ping and jitter"
> 5 VPN Comparison Builder — "Compare evidence side by side"
> 6 Password Strength Check — "Estimate resistance locally in your browser"
> 7 Browser Privacy Check — "Inspect cookies, fingerprint signals and permissions"
> 8 VPN Finder — "Match needs to independently tested providers"
> Use original mini data visualizations, route diagrams, gauges and browser panels; avoid repeated shield icons.
> Guided workflows: dark navy section "Not sure where to start?" with three horizontal journeys:
> "Is my VPN working?" → IP → DNS → WebRTC
> "Why is my connection slow?" → Speed baseline → VPN on → Compare
> "Which VPN fits me?" → Finder → Review → Comparison
> Each step is clickable and numbered.
> Lab standards section: "What these tools do—and don’t prove" with three cards Route checks, Browser checks, Performance checks and a clear note that tools do not prove provider logging practices or anonymity. Link "Read our testing methodology".
> Recent saved results: compact local-only timeline showing last speed test and DNS check with "Stored on this device"; empty-state example included.
> Learning center: four visual explainer cards How VPNs work, DNS explained, IP addresses explained, How to test a VPN; then FAQ, newsletter and complete ZeroToVPN footer.
> Style/medium: realistic high-fidelity editorial product UI, human-readable technical lab, practical and polished, not concept art.
> Color palette: deep navy #04152f, electric blue #126bff, cyan, white, warm off-white, restrained green/amber/red status accents.
> Text (verbatim where shown): "Free privacy & VPN tools", "Check what your browser and network reveal—then understand what each result actually means.", "Your connection at a glance", "Run privacy checkup", "Not sure where to start?", "What these tools do—and don’t prove".
> Constraints: privacy-first tool discovery, diagnostics before affiliate content; mask all example identifiers; show no provider sales banner; accessible contrast; no popup; no fake live data claim; no watermark; no browser chrome; complete footer visible.
> Avoid: sparse three-card page, generic icon grid, sales-first CTA, duplicated shield imagery, huge empty hero, cropped bottom.

References: zerotovpn-homepage-concept-v3-visual-editorial.png; zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png; zerotovpn-blog-overview-concept-v1.png.

## Visual QA result

- All four renders contain the complete header, core experience, supporting sections and footer.
- No render is materially cropped or broken, so no image-generation iteration was needed.
- The DNS state rail and speed phase rail are sufficiently distinct to guide implementation, but their small copy should not be copied pixel-for-pixel; use semantic responsive components.
- Generated provider values and diagnostic numbers are visual placeholders, not publishable evidence.
