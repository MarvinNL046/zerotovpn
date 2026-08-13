# ZeroToVPN discovery and trust templates

Status: design specification only

Routes: `/guides`, `/reviews`, `/countries`, `/how-we-test`

Generated: 2026-08-13

Image mode: built-in `image_gen`, `ui-mockup`

This document turns four existing index/trust routes into one coherent discovery system. The mockups are visual direction, not a source of production facts. Counts, provider scores, country status, equipment names, dates, and test results must always come from repository data and stored evidence at implementation time.

## Shared visual system

- Slim electric-blue report strip above a midnight-navy global navigation.
- Warm-white editorial canvas, pale-blue section fields, hairline borders, restrained shadows.
- Editorial serif for H1/H2 display copy; crisp sans-serif for navigation, controls, labels, tables, and metrics.
- Electric blue and cyan are the primary action colors. Lime means verified/pass, amber means caveat or regulated, red means failure/restricted. Status is never communicated with color alone.
- Real editorial imagery, device photography, maps, charts, and diagrams should occupy about half of the visible surface. Avoid a site made primarily from Lucide icons in identical cards.
- One global card language: 12–16 px corner radius, meaningful labels above headlines, compact metadata, an explicit next action, and enough variation to communicate editorial hierarchy.
- Educational and trust pages use internal actions first. Commercial actions are secondary and never disguised as editorial links.

## Shared component vocabulary

Potential reusable components:

- `DiscoveryHero`
- `TrustMetaRow`
- `DirectorySearch`
- `FilterToolbar`
- `FilterSelect`
- `ActiveFilterChips`
- `EditorialFeatureCard`
- `RankedStoryList`
- `MetricTile`
- `StatusLegend`
- `StatusBadge`
- `EvidenceBand`
- `LastVerified`
- `SourceCount`
- `NewsletterBand`
- `KnowledgeRoutes`
- `DirectoryEmptyState`
- `DirectoryPagination`

Shared state rules:

- Filter state is reflected in query parameters so results are shareable and back/forward navigation works.
- The unfiltered directory remains server-rendered and crawlable.
- Search and filtering enhance the directory; they do not hide all content behind client JavaScript.
- Empty, loading, partial-evidence, stale-evidence, and error states are designed explicitly.
- Counts are derived from the same data registry that renders the result set.

---

## 1. Guides learning hub

Mockup: `zerotovpn-guides-hub-concept-v1.png`

### Current route audit

The current `src/app/[locale]/guides/page.tsx` already has useful foundations:

- localized metadata and page copy through `guidesIndex`;
- canonical and hreflang alternates through `generateAlternates`;
- breadcrumb markup, related pages, and related-content links;
- ten explicit guides split into featured and secondary groups;
- category counts and a clear path to `/guides/what-is-vpn` and `/compare`.

Current limitations:

- category badges look interactive but are static presentation elements;
- the guide registry lives inside the page and contains only metadata, which makes growth, freshness, imagery, and learning paths hard to manage;
- most cards differ only by icon and copy, so the page does not expose the visual/evidence quality of the individual guides;
- there is no search, guided learning route, glossary discovery, reviewed date, technical reviewer, or visible source state;
- the repeated topics, related pages, and related content can compete rather than form a deliberate information architecture.

### Target anatomy

1. Global report strip and navigation.
2. Two-column learning hero with search, technical-review metadata, and a visual VPN-tunnel/lab collage.
3. Three image-led start destinations: beginner, privacy, and device setup.
4. Four-step learning path from definition to connection testing.
5. Popular guide feature plus ranked reading list.
6. Six topic tiles with distinct photography or diagrams.
7. Dark `From the ZeroToVPN lab` evidence band.
8. Latest guides in a mixed magazine grid/list.
9. Searchable glossary preview.
10. Internal next-step routes, neutral newsletter, knowledge routes, footer.

### Page-specific components

- `GuideLearningHero`
- `LearningPathRail`
- `GuideStartCard`
- `GuideTopicTile`
- `PopularGuideFeature`
- `GuideDirectory`
- `GlossaryPreview`
- `LabEvidenceBand`

### Content model additions

Each guide entry should have `slug`, localized title/dek, topic, level, format, hero image, read time, published/modified/tested dates, reviewer, source state, learning-path position, related tools, and related commercial pages. Use one registry rather than a page-local array.

### SEO and conversion guardrails

- `/guides` is educational. No provider price, coupon, countdown, or direct purchase CTA in the hero.
- Soft conversion can route to `/compare`, `/reviews`, tools, and country guides.
- Keep one crawlable H1 and real anchor links for topic sections.
- Search result pages and filter combinations should not become uncontrolled indexable URL variants.
- Preserve translations, canonical alternates, breadcrumbs, and deliberate internal links.

---

## 2. Reviews directory

Mockup: `zerotovpn-reviews-directory-concept-v1.png`

### Current route audit

The current `src/app/[locale]/reviews/page.tsx`:

- loads providers through `getAllVpns()`;
- emits breadcrumbs and comparison-table structured data;
- exposes useful research links to the report, methodology, and VPN Index;
- renders every provider through `VpnCard`.

Important gaps and risks:

- metadata is localized, but the visible H1 and introductory body are hard-coded in English;
- there is no search, filtering, sort, compare selection, evidence freshness, or directory-level disclosure;
- `VpnCard` leads with a price and affiliate action, while the directory itself does not place a disclosure before the first commercial link;
- the component automatically marks NordVPN as `#1 Pick` based on name/slug, not a visible locked ranking model;
- every provider has almost the same visual weight, so the page reads as an affiliate card wall rather than an independent review index;
- prices, server counts, country counts, and scores require freshness metadata and a single auditable source;
- `ComparisonTableSchema` must describe content visibly present on the page and remain valid for the final design.

### Target anatomy

1. Independent-testing hero with provider search and lab summary.
2. Functional, labelled filter toolbar.
3. Three top independently tested scorecards with visible scope and drawback.
4. Affiliate disclosure before the first outbound commercial control.
5. Full review table/list hybrid with tested date and evidence state.
6. Compare selection tray.
7. Browse-by-priority modules.
8. Dark methodology and rating-model band.
9. Recently retested/change-log cards.
10. FAQ, newsletter, related knowledge routes, footer.

### Page-specific components

- `ReviewDirectoryHero`
- `ProviderFilterBar`
- `TopReviewScorecard`
- `ReviewDirectoryTable`
- `ReviewDirectoryMobileCard`
- `CompareTray`
- `PriorityCollectionCard`
- `RetestChangeCard`
- `RatingModelBand`

### Data rules

- Ranking, `Best for`, drawbacks, scores, and last-tested dates come from locked research data.
- A provider is never promoted to rank one by a name check.
- Exact price is displayed only when freshness and terms are available; otherwise use `Check current price` after disclosure.
- A score needs scale, test date, category breakdown, and methodology link.
- Show unknown/not-tested rather than converting missing values into zero or a positive claim.

### Affiliate guardrails

- Disclosure precedes the first affiliate link in visual and DOM order.
- `Read review` remains the primary editorial action; `Compare` is the primary decision-support action.
- Outbound buttons are explicit about destination and use the configured tracking redirect.
- No unauthorized coupons, cashback, incentives, countdowns, pop-under behavior, or black-hat doorway variants.
- Affiliate terms never influence score, rank, or verdict; make the separation visible.

---

## 3. Countries status atlas

Mockup: `zerotovpn-countries-atlas-concept-v1.png`

### Current route audit

The current `src/app/[locale]/countries/page.tsx` has a strong amount of country copy and localized labels, but it is doing too many jobs:

- a large curated country array and localized content live directly in the route;
- another dynamic country registry is rendered through `getAllDynamicCountries()`;
- country discovery is a static card grid followed by a second card grid;
- status is reduced to broad badge values such as legal, regulated, or restricted;
- there is no search, region/status filtering, evidence freshness, source count, or map/list relationship;
- the card-grid treatment is difficult to scan at global scale and can hide unknown or stale evidence.

The implementation should consolidate discovery data with `src/lib/country-data` and the translation modules rather than add a third source of truth.

### Target anatomy

1. Dark global atlas hero with search, update state, legend, and selected-country card.
2. Filter toolbar for region, access, legality, blocking reports, and verification date.
3. At-a-glance status cards without unsupported totals.
4. Six high-priority visual country guides.
5. Region-tabbed alphabetical atlas table with a mobile-card equivalent.
6. Four-part status-definition explainer.
7. Dark evidence band showing how status is verified.
8. Travel-preparation sequence.
9. Country access alerts, topic routes, footer.

### Page-specific components

- `CountryAtlasHero`
- `WorldStatusMap`
- `CountryMapFallbackTable`
- `CountryStatusLegend`
- `SelectedCountryPanel`
- `CountryFilterBar`
- `CountryEvidenceCard`
- `CountryAtlasTable`
- `StatusDefinitionGrid`
- `CountryVerificationBand`

### Country evidence model

Do not collapse independent dimensions into one ambiguous status. Store at least:

- VPN legality and legal-source date;
- app-store availability;
- website/service blocking reports;
- protocol throttling/blocking reports;
- internet shutdown risk/event history;
- censorship/access classification;
- verification state (`verified`, `reported`, `conflicting`, `stale`, `unknown`);
- last verified timestamp, reviewer, and source references.

### Legal and safety guardrails

- Prominently state that conditions change and the page is not legal advice.
- Separate official law, independent reporting, observed connection tests, and reader reports.
- Never infer legality from whether a connection happened to work.
- Avoid fear-based language and never guarantee access, safety, or anonymity.
- Unknown and conflicting evidence are first-class states.
- The map must always have an equivalent accessible list/table.

---

## 4. How We Test

Mockup: `zerotovpn-how-we-test-concept-v1.png`

### Route boundary

- `/how-we-test`: visual, public, concise explanation of the actual workflow and what a test result means.
- `/methodology`: full technical protocol, weighting governance, definitions, evidence retention, limitations, and revision history.

These pages should link to each other but should not repeat the same long copy. `/how-we-test` is the trustworthy tour; `/methodology` is the specification.

### Current route audit

`src/app/[locale]/how-we-test/page.tsx` currently contains:

- a concise hero and four workflow cards;
- the production score-weight table;
- a retest-cadence section;
- links to Methodology, VPN Index, the transparency report, editorial policy, disclosure, and contact.

Limitations:

- page copy is hard-coded in English despite the locale route;
- the process is visually generic and does not show the rig, repeat runs, charts, failure testing, or evidence trail;
- the score table is useful but disconnected from the steps that create its inputs;
- `monthly retests` and other operational claims must match actual stored runs, not aspirational copy;
- `/methodology` duplicates some positioning and should own the deeper localized framework.

### Target anatomy

1. Lab hero with the independence promise and two internal actions.
2. Six-step connected test cycle.
3. Annotated standard test bench.
4. Speed and latency test visualization.
5. Leak and kill-switch failure panel.
6. Streaming and real-world reliability matrix.
7. Exact 100% score model.
8. Editorial-independence pipeline.
9. Retest timeline and event triggers.
10. Reproducibility checklist, evidence ledger, correction log, research routes, footer.

### Exact score weights

| Factor | Weight |
|---|---:|
| Speed | 24% |
| Latency | 10% |
| Logging policy | 14% |
| Ownership clarity | 8% |
| Jurisdiction risk | 9% |
| Audit status | 10% |
| Streaming unlock | 11% |
| Torrent policy | 7% |
| Kill switch reliability | 7% |

The total is 100%. Commercial terms are not part of the formula.

### Page-specific components

- `TestLabHero`
- `TestCycle`
- `TestBenchDiagram`
- `SpeedLatencyEvidence`
- `LeakFailureTimeline`
- `StreamingReliabilityMatrix`
- `ScoreWeightModel`
- `EditorialIndependenceFlow`
- `RetestTimeline`
- `EvidenceLedgerPreview`
- `CorrectionLog`

### Research guardrails

- Use only actual equipment, locations, protocols, runs, and dates in production.
- Label example visualizations as sample data until backed by a stored run.
- Store raw evidence before publishing calculated claims.
- Distinguish measured, documented, and inferred inputs.
- State limitations and unsupported states.
- Charts need a table or downloadable data equivalent.
- The commercial team cannot edit raw data, calculated scores, or verdicts.

---

## Responsive behavior

### Desktop, 1200 px and above

- Use the full editorial grid and visible contextual side panels.
- Filter bars can remain in one row when labels stay readable.
- Directory tables use sticky headers; compare selection can use a sticky bottom tray.
- Maps and diagrams can sit beside a detail/evidence panel.

### Tablet, 768–1199 px

- Hero visuals stack below copy or use a balanced 5/7 split.
- Filter controls use a two-column grid and active-filter chips appear below.
- Six-up tiles become 2–3 columns.
- Wide tables get a deliberate priority-column set plus expandable detail.

### Mobile, below 768 px

- Navigation collapses without losing search or the active section.
- Learning steps become a numbered vertical sequence; do not rely on horizontal drag alone.
- Review and country tables become semantic card lists while preserving all critical labels.
- Compare tray must not cover the last result or consent/disclosure content.
- Map is optional enhancement; the country list is the primary accessible control.
- Charts stack with legends immediately adjacent and a data-table toggle.
- Newsletter fields and paired actions become full-width.

## Accessibility requirements

- Meet WCAG AA contrast for text, controls, chart labels, and status badges.
- Every icon has a text label when it conveys status or action.
- Use real `button`, `a`, `input`, `select`, `table`, `caption`, `th scope`, and landmark semantics.
- Provide visible focus rings and logical DOM/focus order matching the visual order.
- Announce changed result counts and active filters through a polite live region.
- Images need meaningful alt text; decorative thumbnails use empty alt text.
- Maps need a textual equivalent. Charts need summaries and data equivalents.
- Never use red/green as the only pass/fail distinction.
- Respect reduced motion; animated packet flows, map highlights, and progress rails become static.
- Preserve 44 px minimum interactive targets on touch layouts.

## Visual QA caveats before implementation

Generated mockups are directional and contain illustrative micro-data:

- The Reviews mockup visually shows `78 providers`, `125 regions`, and `8 weighted metrics`; do **not** implement those figures. Compute provider/region counts, and use the nine production weights listed above.
- The Reviews `How our ratings work` mini-legend is visual filler and does not match the production scoring formula. The production component must use the exact table in this document.
- Provider scores and `Best for` labels in the mockup are layout examples, not approved rankings.
- Country statuses, source counts, and dates in the Atlas mockup must be validated against the country evidence registry before publication.
- The How We Test rig contains illustrative equipment labels and sample results. Replace them with actual rig metadata and stored runs.
- The How We Test mockup has repeated visual section number `3` in two headings. Implementation uses the anatomy order above, not the rendered numbering.
- Generated photography and product UI are placeholders. Use owned/licensed project imagery and current screenshots in production.

## Final generation prompts

All four images were generated in built-in `image_gen` mode as new `ui-mockup` assets. Established local ZeroToVPN mockups were style references, not edit targets.

### Guides hub prompt

```text
Use case: ui-mockup
Asset type: complete tall production-grade desktop website mockup for ZeroToVPN /guides
Primary request: Design the complete ZeroToVPN visual learning hub, an image-rich guide directory that feels like an independent technology publication and research lab. It must be much more visual and scannable than a generic icon-card grid.
Brand system: slim electric-blue report strip, deep midnight-navy navigation and footer, white/warm-white canvas, electric blue and cyan accents, occasional lime status accent, subtle pale-blue section fields, strong editorial serif display headlines paired with crisp modern sans-serif UI, fine borders, restrained shadows, generous rhythm.
Hero copy: "LEARNING CENTER"; "VPN Guides & Learning Paths"; "Practical explainers, setup walkthroughs and privacy fundamentals—built from our test lab."; search "What do you want to learn?".
Required sections: three visual Start here cards; four-step learning path; Popular guides; six visual topic tiles; dark From the ZeroToVPN lab evidence band; Latest guides; VPN glossary; internal next steps; The Privacy Brief; knowledge routes; footer.
Constraints: educational first; no provider deal, price, coupon, countdown or affiliate purchase CTA; professional shippable UI; no browser chrome, watermark, random logos, neon cyberpunk or generic shield wallpaper.
```

### Reviews directory prompt

```text
Use case: ui-mockup
Asset type: complete tall production-grade desktop website mockup for ZeroToVPN /reviews
Primary request: Design the complete ZeroToVPN independent VPN reviews directory: a searchable, filterable, evidence-rich provider index that combines publication-quality visuals with lab-style scorecards. Avoid a generic three-column affiliate card wall.
Brand system: electric-blue report strip, midnight-navy header/footer, warm-white canvas, electric blue/cyan accents, lime for verified positive status, amber for caveats, editorial serif H1 with crisp sans-serif data UI.
Hero copy: "INDEPENDENT TESTING"; "VPN Reviews"; "Search independently tested VPNs. Compare real-world speed, privacy controls, streaming reliability and value—without hiding the trade-offs."; search "Search a VPN provider".
Required sections: labelled filters; three horizontal top scorecards with drawbacks and last-tested dates; disclosure before commercial action; full review table/list; compare tray; Browse by priority; dark rating-method band; recently retested; FAQ; newsletter; footer.
Constraints: rankings and claims are evidence-led; no fabricated prices, coupons or countdowns; read-review and compare actions precede commercial action; professional shippable UI; no browser chrome, watermark or neon cyberpunk.
```

### Countries atlas prompt

```text
Use case: ui-mockup
Asset type: complete tall production-grade desktop website mockup for ZeroToVPN /countries
Primary request: Design a complete ZeroToVPN global country status atlas and country-guide directory. It should feel like an evidence-led internet-access observatory plus an accessible travel guide, not a generic grid of flag emoji cards.
Hero copy: "GLOBAL ACCESS ATLAS"; "VPN Access by Country"; "Explore VPN legality, blocking reports, censorship signals and independently verified connection guidance by country."; search "Search a country or region".
Hero visual: dark world map with text-and-pattern legend for Open, Regulated, Restricted, VPN blocking reported, Needs verification; selected Iran evidence card.
Required sections: filter toolbar; global status cards without unsupported totals; six high-priority country guides; region-tabbed atlas table; status definitions; dark verification/evidence band; travel preparation; country access alerts; footer.
Constraints: prominent not-legal-advice note; distinguish official, reported, observed and unknown evidence; no access or anonymity guarantees; no commercial deal CTA; map has accessible list equivalent; no browser chrome or watermark.
```

### How We Test prompt

```text
Use case: ui-mockup
Asset type: complete tall production-grade desktop website mockup for ZeroToVPN /how-we-test
Primary request: Design the complete visual public-facing How We Test VPNs methodology/process/trust page. Make the test lab, scoring and independence tangible through photos, diagrams and real-looking data—not a wall of generic cards. /methodology remains the full technical specification.
Hero copy: "RESEARCH FRAMEWORK 2026"; "How We Test VPNs"; "Repeatable tests. Published evidence. Scores locked before commercial links are added."; actions "Explore the test process" and "Read full methodology".
Required sections: six-step test cycle; annotated standard test bench; speed and latency visualization; DNS/WebRTC/IPv6/kill-switch failure panel; multi-session streaming matrix; exact 100% nine-factor score model; editorial-independence flow; retest timeline; reproducibility checklist; evidence ledger; correction log; research routes; footer.
Constraints: use actual evidence in production; label sample results; no provider purchase actions, coupons, fake scientific seals, lab-coat theater, browser chrome, watermark, malformed charts, or neon cyberpunk.
```
