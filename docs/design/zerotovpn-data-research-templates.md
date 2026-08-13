# ZeroToVPN data & research page templates

Status: design specification only

Prepared: 13 August 2026

Generation mode: built-in `image_gen` (`ui-mockup`)

Application code changed: no

This document defines four connected page types:

1. `/vpn-index` — live, filterable evidence dashboard;
2. `/compare` — interactive provider comparison builder and index;
3. `/reports/vpn-transparency-performance-index-2026` — frozen, versioned research-report detail;
4. `/reports` — formal research-library hub.

The four pages form one evidence product rather than four unrelated templates:

- the live index helps readers explore current records;
- the comparison builder lets readers apply their own priorities without rewriting source data;
- the annual report interprets one frozen dataset edition;
- the library preserves reports, methods, datasets, test logs, versions, and corrections.

## Shared visual system

- Deep navy `#03152F` for navigation, evidence bands, report covers, and high-trust data modules.
- Electric blue `#0866FF` for primary actions, active filters, links, and selected data series.
- Cyan `#14B8E6` as a secondary chart/accent color.
- White and cool near-white backgrounds, with alternating pale-blue sections for long-page rhythm.
- Lime is reserved for a positively verified state, never for decoration.
- Amber is reserved for uncertainty, stale fields, revisions, and limitations.
- Editorial serif display type for the main page title; clean sans-serif for controls, tables, labels, and body copy.
- Large charts, report covers, source-led tables, and evidence diagrams should occupy roughly half the visible page area. These pages must not collapse into long text walls or generic card grids.

## One shared evidence language

Every factual field may carry exactly one current evidence state:

| State | Meaning | Required metadata |
|---|---|---|
| `Lab tested` | ZeroToVPN or a named test partner reproduced the measurement under a documented protocol. | run ID, test date, region/device/baseline, protocol version, source record |
| `Desk verified` | A reviewer verified the field against a primary document or public audit. | source URL/file, checked date, reviewer, scope/limitation |
| `Provider stated` | The provider supplied the claim, but ZeroToVPN has not independently verified it. | provider source, captured date, explicit non-independent label |
| `Needs retest` | The record is stale, incomplete, contradicted, or outside the current test window. | reason, previous evidence date, target retest date when known |

Status must be expressed with text plus icon; color alone is insufficient. A cell without evidence is `Unknown`, not zero, false, or average.

---

## Existing route audit

### `/vpn-index`

Existing strengths:

- canonical metadata and locale alternates already exist;
- the page reads the shared VPN data layer and `getVpnIndexRows()`;
- the legacy `/vpn-index/2026` route correctly redirects to the versioned report;
- a client dashboard already supports five simple use-case filters.

Gaps to address when implementing the template:

- the current view is a two-column card grid, not a scan-friendly data table;
- filters are hard-coded threshold functions with no visible reasoning, search, sorting, URL state, or field-level sources;
- there is no evidence drawer, change history, data freshness filter, or explicit unknown state;
- the current `transparencyScore` is actually a broad composite: speed, latency, logging, ownership, jurisdiction, audit, streaming, torrent, and kill-switch values are mixed together. Rename it to an explicit `indexScore` or expose separate dimension scores; do not present it as privacy transparency alone;
- `getTransparencySnapshot()` contains defaults and manual trust profiles. Placeholder/fallback values must never silently participate in a public ranking. Unknown or fallback fields must be excluded, visibly marked, and prevented from masquerading as measurements;
- weights, clamp rules, freshness policy, missing-data behavior, and confidence/evidence coverage must be published beside the score.

### `/compare`

Existing strengths:

- canonical/hreflang handling and `ItemList` structured data exist;
- a selector supports up to four providers;
- the English route has a careful editorial explanation, affiliate disclosure, dated price caveats, and methodology links;
- detailed comparison rows already exist for non-English routes.

Gaps to address:

- English and non-English page structures differ materially;
- provider selection is local component state only: no URL/share state, presets, saved shortlist, search, or priority weighting;
- the current tool declares row winners using numeric min/max. That encourages false certainty and ignores evidence quality, test date, ties, confidence, and whether lower/higher is meaningful for the reader;
- commercial/catalog fields and lab evidence are mixed without a shared evidence-state model;
- the complete provider table is too wide and undifferentiated; the builder should progressively reveal only selected providers and relevant criteria;
- affiliate URLs should remain isolated in existing tracked components, with disclosure before the first commercial link and a dated `Verify current price` label—not an unsupported winner CTA.

### `/reports/vpn-transparency-performance-index-2026`

Existing strengths:

- localized metadata, breadcrumbs, a report download action, KPI cards, shared data rows, and a full matrix are present;
- the route is the correct canonical destination for the legacy dated index URL.

Gaps to address:

- the page is presently a hero, four KPIs, and one very wide table;
- there is no executive summary, chart-led interpretation, formal method chapter, limitations section, frozen dataset version, citation block, revision log, source ledger, or reproducibility package;
- the displayed `Latest Retest` value is hard-coded (`March 2026`) rather than derived from records. All publication, test, dataset, and revision dates must come from one versioned report manifest;
- a PDF action must not imply a maintained report file unless a versioned artifact exists;
- add appropriate article/report JSON-LD only from real publication metadata; do not invent DOI, institution, endorsement, or citation counts.

### `/reports`

Existing strengths:

- metadata, locale alternates, breadcrumbs, and the core report link are present.

Gaps to address:

- the library currently contains one plain card;
- it lacks formal publication status, filters, search, datasets, methods, research tracks, revision/correction history, report covers, and the distinction between published and in-progress work;
- proposed research records must remain visibly `In progress`, `Reviewing`, or `Planned` until an actual versioned artifact exists;
- verify UTF-8 rendering across locale literals during implementation; terminal inspection showed potentially garbled non-Latin and punctuation output, which may be console encoding but needs browser verification.

---

## Template 1 — live VPN Index

Mockup: `zerotovpn-vpn-index-concept-v1.png`

### Page anatomy

1. Brand announcement and global navigation.
2. Breadcrumb, `LIVE EVIDENCE DASHBOARD` eyebrow, H1, explanatory dek, scoring and change-log links.
3. Small visual snapshot with radar and dated trend line.
4. Four-item trust row: independent testing, linked sources, explainable scoring, visible retest status.
5. Sticky/filterable `Find your best fit` control surface:
   - use-case chips;
   - provider search;
   - price, audit, jurisdiction, and freshness controls;
   - table/card view toggle;
   - removable active-filter chips;
   - state mirrored into URL search parameters.
6. KPI strip: providers tracked, test regions, core metrics, evidence states.
7. Ranked evidence table:
   - rank, provider, index score, speed retention, privacy evidence, price snapshot, last tested, action;
   - sortable headers with accessible descriptions;
   - compare checkbox and `Open evidence` link;
   - explicit stale/unknown states.
8. Selected-provider evidence drawer with score composition, test history, primary sources, strengths and limits.
9. Dated `What changed this month` timeline explaining movement rather than showing unexplained arrows.
10. Question-led exploration cards.
11. Dark methodology band with weights, locations, cadence, and evidence legend.
12. FAQ, related research, newsletter, footer.

### Reusable components

- `IndexHeroSnapshot`
- `IndexFilterBar`
- `ActiveFilterChips`
- `IndexKpiStrip`
- `EvidenceRankingTable`
- `EvidenceStateBadge`
- `ProviderEvidenceDrawer`
- `ScoreBreakdownRadar`
- `TestHistoryChart`
- `IndexChangeTimeline`
- `IndexQuestionCards`
- `MethodologySummaryBand`

### Interaction rules

- Filters, sorting, page, and selected provider are URL-addressable.
- A score click opens its formula and evidence coverage; it never jumps directly to an affiliate destination.
- Ranking defaults must disclose handling of missing fields and ties.
- A use-case preset changes weights/filters, not underlying measurements.
- `Needs retest` rows remain discoverable and may be filtered; they are not silently removed.

---

## Template 2 — comparison builder/index

Mockup: `zerotovpn-comparison-builder-concept-v1.png`

### Page anatomy

1. Breadcrumb and H1 `Compare VPNs side by side`.
2. Trust statement: no universal winner, up to four providers, shareable results.
3. Dark provider builder with four labeled slots, accessible search comboboxes, remove actions, compare and clear controls.
4. Quick-start presets: privacy, streaming, travel, devices, total cost.
5. `Your priorities` controls with visible percentages and reset.
6. Selected-provider summaries showing dimension score, fit statement, strength, limitation, evidence completeness, and date.
7. Sticky in-page comparison navigation.
8. Weighted fit summary with transparent calculation explainer.
9. Grouped comparison matrix for privacy, performance, apps/devices, and pricing.
10. Route-based speed and latency charts.
11. Full-cost table with checked date and renewal fields.
12. Evidence legend/methodology band.
13. Popular matchup shortcuts, comparison process, FAQ, footer.

### Reusable components

- `ProviderComparisonBuilder`
- `ProviderSearchCombobox`
- `QuickComparisonPresets`
- `PriorityWeightControls`
- `SelectedProviderSummary`
- `FitScoreExplainer`
- `GroupedEvidenceMatrix`
- `RoutePerformanceCharts`
- `FullCostComparison`
- `PopularMatchupGrid`
- `ShareComparisonControl`

### Calculation and commercial rules

- Store providers, weights, and selected sections in a stable URL format; validate all values server-side.
- The fit score is a user-specific transform. It must be labeled separately from index and category scores.
- Changing weights never changes source measurements.
- Do not award a `winner` to missing, stale, differently scoped, or incomparable records.
- Price rows require currency, country/market, plan duration, upfront total, renewal basis, capture time, and a provider-source link.
- Affiliate links use the tracked `AffiliateButton`/`AffiliateTextLink` path and appear only after disclosure. The neutral builder action remains `Compare selected`.

---

## Template 3 — research-report detail

Mockup: `zerotovpn-research-report-concept-v1.png`

### Page anatomy

1. Publication masthead with report edition, authors/reviewers, publication date, dataset version, reading time, and cover visual.
2. Real artifact actions only: PDF, CSV, citation.
3. Trust strip and sticky chapter navigation.
4. Executive summary with carefully scoped findings and study-at-a-glance metrics.
5. Index overview dot plot with evidence-completeness/confidence annotation.
6. Three large chart-led key findings:
   - evidence quality;
   - route-dependent speed;
   - repeated-run reliability.
7. Contextual transparency breakdown that avoids reducing privacy to a single no-logs badge.
8. Provider-matrix preview linked to field-level evidence and the live index.
9. Dark method band with protocol, devices, baseline, regions, windows, weights, cadence.
10. Prominent limitations chapter.
11. Reproducibility/download package with versions and checksums.
12. Citation, correction policy, revision history.
13. Source ledger and technical review.
14. Related research, newsletter, footer.

### Reusable components

- `ReportMasthead`
- `ReportArtifactActions`
- `ReportChapterNav`
- `StudyAtGlance`
- `FindingBlock`
- `AnnotatedChartFigure`
- `IndexDotPlot`
- `EvidenceCoverageChart`
- `ReliabilityRunGrid`
- `ReportMatrixPreview`
- `MethodProtocolBand`
- `LimitationsPanel`
- `ReproducibilityFiles`
- `CitationBlock`
- `RevisionTimeline`
- `SourceLedger`

### Publication manifest

Create one manifest as the authoritative source for:

- slug, edition, publication status, published/modified dates;
- authors and technical reviewers;
- frozen dataset ID/version/hash;
- protocol version and scoring version;
- PDF/CSV/JSON paths and byte sizes;
- source snapshot and test window;
- limitations and correction history;
- locale availability.

The live index may link to the report, but the frozen report must never mutate when the live dataset changes.

---

## Template 4 — research library

Mockup: `zerotovpn-research-library-concept-v1.png`

### Page anatomy

1. Research-library hero with search and trust attributes.
2. Featured versioned publication with report cover, abstract, metadata, artifact actions, and study metrics.
3. Sticky/searchable `Browse the library` filters for track, year, status, and format.
4. Visual latest-research grid with explicit statuses (`Published`, `Updated`, `In progress`, `Reviewing`).
5. Dark `Data you can inspect` file strip.
6. Research tracks: performance, privacy evidence, ownership/jurisdiction, censorship/access.
7. Publication pipeline from research question to versioned release.
8. Updates and corrections timeline.
9. Methods, standards, reviewer context, and limitations statement.
10. Bridge to live index and comparison builder.
11. FAQ, subscription preferences, footer.

### Reusable components

- `ResearchLibraryHero`
- `FeaturedPublication`
- `ResearchFilters`
- `ResearchRecordCard`
- `ArtifactFileStrip`
- `ResearchTrackGrid`
- `PublicationPipeline`
- `CorrectionTimeline`
- `MethodsStandardsPanel`
- `LiveEvidenceBridge`

### Record model

Every library record needs:

- `type`: report, dataset, method, test-log, lab-note, field-note;
- `status`: planned, in-progress, reviewing, published, updated, superseded, retracted;
- publication/updated date only when real;
- version and predecessor/successor relation;
- abstract and limitations summary;
- authors/reviewers;
- artifacts that actually exist;
- related dataset/protocol/report IDs;
- correction/change history;
- indexability rule. In-progress records should normally be non-indexable unless they contain substantial public research.

---

## Data and evidence guardrails

1. **No silent fallback measurements.** Defaults may support local layout, but public tables must expose `unknown` and never calculate rankings from placeholder values.
2. **Field-level provenance.** A provider-level badge is insufficient. Speed, policy, audit, owner, price, streaming, and reliability each need their own source and date.
3. **Separate score families.** Keep `indexScore`, `privacyEvidenceScore`, `performanceScore`, `reliabilityScore`, `valueScore`, and user-specific `fitScore` distinct.
4. **Publish the math.** Store versioned weights, normalisation functions, missing-data rules, tie rules, and caps. Render them beside the score.
5. **Freshness is per field.** A recently tested speed run does not make an old audit or price current.
6. **No false precision.** Display uncertainty/range or run count where variability matters. Do not turn a tiny observed difference into a categorical winner.
7. **Comparable scope only.** Same region, device, baseline, app/protocol, time window, and unit are required for comparative lab charts.
8. **Provider statements remain statements.** Never upgrade provider marketing or self-authored policy to lab evidence.
9. **Snapshots are immutable.** Reports cite frozen dataset versions; live dashboards point to current records and a change log.
10. **Commercial data is volatile.** Price, discount, renewal, refund, location eligibility, and plan content need capture time and checkout verification.
11. **Downloads must exist.** Do not render PDF/CSV/JSON actions until a generated, versioned artifact is available.
12. **Corrections are additive.** Preserve the old version, describe the change, publish date/reason/reviewer, and point to the new version.
13. **No affiliate influence on scoring.** Affiliate relationship, payout, or conversion performance must never enter ranking inputs.
14. **Concept numbers are not claims.** Values visible in these bitmap mockups demonstrate component anatomy only and must not be copied into production without a source record.

## Responsive and accessibility requirements

- Desktop tables use sticky criterion/provider columns; tablet/mobile switch to provider tabs or stacked criterion cards without hiding source/date/limitation fields.
- Filter and selection state remains in the URL across viewport changes.
- All controls have visible labels, keyboard operation, focus rings, error text, and at least 44×44px targets.
- Comboboxes follow the ARIA combobox/listbox pattern; sliders expose name, value, min/max, and keyboard increments.
- Charts have a text summary, data table fallback, labelled axes/units, distinguishable patterns or shapes, and do not rely on color alone.
- Evidence badges include icon and text. Tooltips cannot contain essential information.
- Data-table headings use correct `scope`; captions explain the dataset and snapshot date.
- Announce filter-result counts and provider additions/removals through a polite live region.
- Reduced-motion mode removes animated chart transitions, sticky parallax, and auto-scrolling.
- Mobile keeps the principal task above secondary editorial modules: filter/compare first, methodology and related content later.
- Avoid horizontal page overflow; if a table scrolls, make the region focusable and label the scroll affordance.

## Suggested implementation order

1. Define evidence-state, source-record, dataset-version, score-definition, and report-manifest types.
2. Prevent public scoring from fallback/default measurements.
3. Build shared evidence badges, source drawer, chart wrapper, and date/freshness helpers.
4. Implement `/vpn-index` and its URL-driven filters.
5. Reuse index records in the comparison builder; add URL state and separate fit-score math.
6. Freeze a real report dataset and implement the report manifest/artifacts.
7. Build the library from report/method/dataset manifests rather than hand-authored visual cards.
8. Run keyboard, mobile, chart-alternative, structured-data, and localization verification.

---

## Exact image-generation prompt records

All four images were generated with the built-in `image_gen` mode. No CLI/API fallback was used.

### Prompt 1 — VPN Index

```text
Use case: ui-mockup
Asset type: complete tall desktop webpage design mockup for ZeroToVPN route /vpn-index
Input images: Image 1 is the primary ZeroToVPN brand and homepage style reference; Image 2 is a reference for evidence tables, data visualization, and provider comparison components; Image 3 is a reference for typography, technical diagrams, and the dark evidence/tool strip. Generate a new page, do not edit or copy any one reference.
Primary request: Design a polished production-ready, highly visual, filterable VPN evidence dashboard named “VPN Index 2026”. It must feel like a real editorial research product, much more scan-friendly than a plain grid of cards. Show the entire page from announcement bar and navigation through footer in one tall portrait screenshot.
Style/medium: realistic high-fidelity desktop web UI, editorial data journalism, crisp shippable layout, not concept art, not a wireframe.
Composition/framing: 1440px-style centered desktop canvas shown as a tall 2:3 full-page screenshot. Compact dark navy header. White and very light warm-gray main background. Use modular alternating white and pale-blue sections. Clear information density without tiny unreadable text.
Color palette: deep navy #03152F, electric blue #0866FF, cyan #14B8E6, white, soft gray, lime only for verified positive status, amber for caution. Preserve the recognizable ZeroToVPN aesthetic and wordmark from references.
Page anatomy:
1. Thin bright blue announcement bar with exact text “NEW: 2026 VPN Performance Report →”.
2. Dark navigation with “ZeroToVPN”, Best VPNs, Reviews, Countries, Devices, Guides, How we test, search icon, bright blue “VPN Finder” button.
3. Breadcrumb “Home / VPN Index”.
4. Hero with eyebrow “LIVE EVIDENCE DASHBOARD · UPDATED AUGUST 2026”, large serif H1 “VPN Index 2026”, short explainer: “Compare VPNs by dated test results, privacy evidence and transparent scoring—not marketing claims.” Add links “How scoring works” and “View change log”. Right side: a compact visual dashboard snapshot with radar chart and small trend line.
5. Trust row: “Independent testing”, “Sources linked”, “Scores explainable”, “Retest status visible”.
6. Sticky-looking horizontal control panel titled “Find your best fit” with segmented use-case filters “All”, “Privacy”, “Speed”, “Streaming”, “Gaming”, “Budget”; search field “Search providers”; sliders/dropdowns for Price, Audit status, Jurisdiction, Last tested; view toggle Table / Cards. Show an active filter chip “Privacy-first ×”.
7. KPI strip with “12 providers tracked”, “3 test regions”, “8 core metrics”, “4 evidence states”.
8. Main ranked evidence table with 5 visible rows for NordVPN, Mullvad, Proton VPN, Surfshark, ExpressVPN. Columns: Rank, Provider, Index score, Speed retention, Privacy evidence, Price snapshot, Last tested, Action. Use prominent circular scores, tiny sparklines, test-state pills, one amber “Needs retest” status. Include “Open evidence →” and compare checkboxes. Put small disclaimer “Preview values shown in this design must be sourced before publication.”
9. A selected-provider detail drawer/card directly under the table for “Mullvad: evidence at a glance” with 5-axis radar, test history mini-chart, clear score breakdown bars: Performance 82, Privacy 94, Security 90, Streaming 62, Value 78. Add evidence chips “Lab tested”, “Desk verified”, “Provider stated”, plus source links and “Read full review →”.
10. Section “What changed this month” with a compact timeline of score movement and reasons, not unexplained arrows.
11. Section “Explore the index by question” with four large visual cards: “Most privacy evidence”, “Fastest in our tests”, “Best value snapshots”, “Needs a retest”.
12. Dark navy methodology band “Every score should be explainable” with scoring weights, test locations, test cadence, evidence legend, buttons “Read methodology” and “Download dataset”.
13. FAQ accordion and related research cards.
14. Neutral newsletter strip “Get new test results, not sales hype.”
15. Dense professional footer matching the reference.
Text (verbatim for major labels): “VPN Index 2026”, “Find your best fit”, “Open evidence”, “What changed this month”, “Every score should be explainable”, “Lab tested”, “Desk verified”, “Provider stated”, “Needs retest”.
Constraints: strong hierarchy, large readable type, real table semantics, visible labels rather than color-only status, minimum 44px controls, practical sticky/filter behavior implied, professional spacing. No fake charts without axes or labels. No unsupported “best overall” claim. No direct affiliate “buy” CTA. No pop-up. No gradients except subtle brand blue highlights. No browser chrome, no watermark, no unrelated logos, no misspelled ZeroToVPN wordmark. Render major text exactly once and legibly; avoid excessive tiny body copy.
```

References:

- `zerotovpn-homepage-concept-v3-visual-editorial.png`
- `zerotovpn-head-to-head-concept-v1-nordvpn-vs-surfshark.png`
- `zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png`

### Prompt 2 — comparison builder

```text
Use case: ui-mockup
Asset type: complete tall desktop webpage design mockup for ZeroToVPN route /compare
Input images: Image 1 is the primary ZeroToVPN brand system; Image 2 is a reference for side-by-side comparison visual language and evidence labeling, but this new page is a comparison builder/index rather than a two-provider editorial article; Image 3 is a reference for filter controls, charts, tables, and data density.
Primary request: Design a polished production-ready interactive VPN comparison builder titled “Compare VPNs side by side”. The page should help a reader choose two to four providers, set personal priorities, inspect dated evidence, then create/share a focused comparison. Show the entire page from announcement bar and navigation through footer in one tall portrait screenshot.
Style/medium: realistic high-fidelity desktop web UI, editorial product design, crisp shippable interface, not concept art, not a wireframe.
Composition/framing: 1440px-style centered desktop canvas as a tall 2:3 full-page screenshot. Compact dark navy header, white and very light cool-gray page, modular cards, generous spacing, readable text.
Color palette: deep navy #03152F, electric blue #0866FF, cyan #14B8E6, white, soft gray; teal as a secondary comparison color; lime for verified states and amber for cautions. Match ZeroToVPN references.
Page anatomy:
1. Thin bright blue announcement bar “NEW: 2026 VPN Performance Report →”.
2. Dark ZeroToVPN navigation with Best VPNs, Reviews, Countries, Devices, Guides, How we test, search icon, blue “VPN Finder”.
3. Breadcrumb “Home / Compare VPNs”.
4. Centered hero with eyebrow “INTERACTIVE COMPARISON · DATA CHECKED AUGUST 2026”, large serif H1 “Compare VPNs side by side”, subcopy “Build a comparison around your devices, budget and privacy needs. Every number shows a date and evidence state.” Trust note “No universal winner · Up to 4 providers · Shareable results”.
5. Large dark navy comparison-builder panel. Header “Choose providers”. Four horizontal provider slots: selected NordVPN, selected Mullvad, selected Proton VPN, empty “Add a VPN”. Each has icon/brand mark, remove control, and a searchable provider dropdown. Primary button “Compare selected (3)”. Secondary “Clear”.
6. Quick-start preset chips under it: “Privacy-first”, “Streaming at home”, “Frequent travel”, “Many devices”, “Lowest total cost”. Show a small link “Use a popular matchup”.
7. “Your priorities” section with five labeled weight sliders and visible percentages: Privacy 30%, Speed 25%, Streaming 15%, Apps 15%, Value 15%. Include accessible reset button and text “Weights affect the fit summary, never the underlying test data.”
8. A three-column selected-provider summary with brand header, index score ring, one-line fit statement, strengths, limitation, last tested date, evidence completeness bar, buttons “Open review” and “Add to shortlist”. Use neutral verdict language and an amber stale-data notice on one field.
9. Sticky-looking comparison navigation: “Fit summary”, “Privacy”, “Performance”, “Apps”, “Pricing”, “Evidence”.
10. “Fit summary for your priorities” with horizontal score bars for the three selected providers and a note “A fit score is a transparent calculation, not an absolute ranking.” Show “Why this score?” expandable links.
11. Large scan-friendly comparison matrix with sticky left criterion column and three provider columns. Group rows under Privacy & ownership, Performance tests, Apps & devices, Pricing snapshot. Every factual cell carries one compact state: “Lab tested”, “Desk verified”, “Provider stated”, or “Needs retest”. Include “View source” links, dates, green check, amber caveat, and text values rather than icon-only answers.
12. Visual performance section: a grouped bar chart titled “Speed retention by test route” with Nearby, US–EU, Long distance; a small latency line chart with axes and legend. Label “Illustrative interface—publish only sourced test records.”
13. Pricing section “Compare the full cost, not just the headline” with introductory monthly equivalent, upfront payment, renewal field, refund window, and “Checked Aug 2026”. Link labels “Verify current price”.
14. Dark navy evidence band “What counts as evidence?” with four state cards: Lab tested, Desk verified, Provider stated, Needs retest. Links “Read methodology” and “Open VPN Index”.
15. “Popular comparisons” grid with six visual matchup cards: NordVPN vs Surfshark, Proton VPN vs Mullvad, ExpressVPN vs NordVPN, Surfshark vs PIA, NordVPN vs Proton VPN, Mullvad vs IVPN. Each has “Build comparison →”.
16. “How to compare without fooling yourself” three-step section: define problem, check dated evidence, verify changing terms.
17. FAQ accordion, newsletter “Get new test results, not sales hype.”, dense footer.
Text (verbatim for major labels): “Compare VPNs side by side”, “Choose providers”, “Compare selected (3)”, “Your priorities”, “Fit summary for your priorities”, “A fit score is a transparent calculation, not an absolute ranking.”, “Compare the full cost, not just the headline”, “What counts as evidence?”, “Popular comparisons”.
Constraints: no unsupported winner crown, no fake certainty, no direct “buy now” CTA, no aggressive affiliate box, and no claim that weighted fit equals objective quality. Include a subtle affiliate disclosure near pricing. Large readable typography, real form labels, visible focus affordances, 44px controls, non-color status labels, sticky table semantics, responsive behavior implied. No pop-up, no browser chrome, no watermark, no unrelated logos, no misspelled ZeroToVPN wordmark. Render major copy legibly and avoid tiny paragraphs.
```

References:

- `zerotovpn-homepage-concept-v3-visual-editorial.png`
- `zerotovpn-head-to-head-concept-v1-nordvpn-vs-surfshark.png`
- `zerotovpn-vpn-index-concept-v1.png`

### Prompt 3 — research report detail

```text
Use case: ui-mockup
Asset type: complete tall desktop webpage design mockup for the ZeroToVPN research report route /reports/vpn-transparency-performance-index-2026
Input images: Image 1 is the primary ZeroToVPN brand system; Image 2 is the live VPN Index dashboard whose data this report explains; Image 3 is a reference for long-form editorial structure, authorship, evidence, and sources; Image 4 is a reference for technical diagrams and data tables. Generate a new page; do not copy any one reference.
Primary request: Design a premium, publication-grade research report detail page titled “VPN Transparency & Performance Index 2026”. It must feel like a serious independent lab report and a readable data-journalism story, not a generic blog post and not simply a giant matrix. Make the report clearly distinct from the live /vpn-index dashboard: this is a frozen, versioned research edition with findings, method, charts, limitations, downloads, and citation.
Style/medium: realistic high-fidelity desktop web UI, scientific editorial report, polished production-ready layout, not concept art, not wireframe.
Composition/framing: 1440px-style centered desktop canvas shown as a tall 2:3 full-page screenshot from announcement bar and navigation through footer. Use strong editorial rhythm, alternating white/pale-blue sections, dark navy data bands, large charts, generous whitespace, and readable labels.
Color palette: deep navy #03152F, electric blue #0866FF, cyan #14B8E6, white and soft cool gray; restrained lime for verified findings and amber for limits/retest. Match ZeroToVPN.
Page anatomy:
1. Bright blue announcement bar and dark ZeroToVPN navigation matching reference.
2. Breadcrumb “Home / Reports / VPN Transparency & Performance Index 2026”.
3. Report masthead with eyebrow “ANNUAL RESEARCH REPORT · EDITION 1.0”, large serif H1 “VPN Transparency & Performance Index 2026”, concise dek: “A reproducible look at VPN performance, privacy evidence, ownership and reliability across our 2026 test set.” Add author and technical reviewer, “Published 13 August 2026”, “Dataset v1.0”, “32 min read”. Buttons “Download PDF”, “Download data (.CSV)”, “Cite this report”. Right side: striking editorial cover graphic combining a world test map, radar plot and packet-flow lines.
4. Trust strip: “Methods published”, “Sources linked”, “Limitations stated”, “Corrections logged”.
5. Sticky horizontal chapter navigation: Summary, Key findings, Performance, Transparency, Reliability, Method, Limitations, Data, Sources.
6. Executive summary section. Left: 4 concise numbered findings with careful language, no universal winner. Right: “Study at a glance” visual cards: 12 providers, 3 test regions, 8 core metrics, 120+ test runs. Mark small “Illustrative interface—publish only sourced records.”
7. Full-width “The index in one view” ranked dot plot / horizontal bar chart of 8–10 providers with score axis 0–100, confidence/evidence-completeness markers, and clear legend. Include an annotation “Higher score means stronger evidence across this framework—not perfect privacy.”
8. “Key finding 1: Evidence quality varies as much as performance” with two charts: grouped evidence coverage bars (Lab tested, Desk verified, Provider stated, Needs retest) and an ownership/audit matrix. Add a yellow interpretation card and “View source records”.
9. “Key finding 2: Route length changes the speed story” with three-route speed-retention grouped bars, labeled Nearby, US–EU, Long distance; companion latency line chart with axes and units. Add methodology callout “Same device, baseline and test window”.
10. “Key finding 3: Reliability needs repeated runs” with reconnect success-rate plot, kill-switch outcome grid, and small test-log table with dates and evidence states.
11. “Transparency is more than a no-logs claim” section with a visual score breakdown: Ownership clarity, Jurisdiction context, Policy specificity, Independent audits, Incident history. Add contextual explainer cards, not binary greenwashing.
12. Provider matrix preview with sticky headers and columns Provider, Index score, Evidence coverage, Speed retention, Reliability, Ownership, Audit, Last tested. Buttons “Open full evidence” and “Open live VPN Index”.
13. Dark navy methodology band “How we built the 2026 index” showing test device, network baseline, regions, time windows, scoring weights and retest cadence as diagram. Buttons “Read full methodology” and “Download test protocol”.
14. “Limitations and what this report cannot prove” in a prominent amber-bordered section listing market changes, route variability, regional availability, proprietary app updates, and non-anonymity. This must be visually substantial, not a footnote.
15. “Reproduce or inspect the data” with dataset file cards: CSV, JSON, methodology PDF, change log; show version, checksum placeholder, license, machine-readable schema link.
16. Citation block with copyable citation, correction policy, revision history timeline.
17. Sources & technical review table with Source / Record / Checked / Scope & limitation.
18. Related research cards and neutral newsletter “Get new test results, not sales hype.”
19. Professional dense ZeroToVPN footer.
Text (verbatim for major labels): “VPN Transparency & Performance Index 2026”, “Executive summary”, “The index in one view”, “Key finding 1”, “Key finding 2”, “Key finding 3”, “How we built the 2026 index”, “Limitations and what this report cannot prove”, “Reproduce or inspect the data”, “Cite this report”.
Constraints: every chart needs title, axis, unit, legend and annotation. Use evidence labels in text, not color alone. No unsupported causality, absolute privacy claims, or crown/winner treatment. No affiliate CTA on this report. No fabricated citation identifier or fake external endorsement. Data shown is interface placeholder unless sourced. Large readable type, semantic tables, visible focus states, accessible contrast, responsive layout implied. No popup, no browser chrome, no watermark, no unrelated logos, no misspelled ZeroToVPN. Avoid tiny dense prose; prioritize visual storytelling and scanability.
```

References:

- `zerotovpn-homepage-concept-v3-visual-editorial.png`
- `zerotovpn-vpn-index-concept-v1.png`
- `zerotovpn-blog-detail-concept-v1-connection-drops.png`
- `zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png`

### Prompt 4 — research library

```text
Use case: ui-mockup
Asset type: complete tall desktop webpage design mockup for ZeroToVPN route /reports
Input images: Image 1 is the primary ZeroToVPN brand and editorial style; Image 2 is the design language for formal research publications and data graphics; Image 3 is a reference for a lively visual content hub, but this page must feel more formal and research-led than the blog; Image 4 is a reference for evidence labels, dashboard metrics, and methodology.
Primary request: Design a production-ready ZeroToVPN “Research Library” hub. It should organize versioned reports, datasets, methodologies, test logs and research-in-progress in a visual, scan-friendly archive. Make it clearly different from the news/blog overview: fewer lifestyle stories, more publication covers, metadata, evidence status, downloads and update history. Show the entire page from header through footer in one tall portrait screenshot.
Style/medium: realistic high-fidelity desktop web UI, editorial research library and data portal, polished shippable design, not concept art, not wireframe.
Composition/framing: 1440px-style centered desktop canvas as a tall 2:3 full-page screenshot. Dark compact header, bright white and light cool-gray body, editorial grid with report-cover art, data cards and dark methodology bands. Strong visual rhythm and generous readable spacing.
Color palette: deep navy #03152F, electric blue #0866FF, cyan #14B8E6, white, soft cool gray; lime for published/verified status, amber for in-progress or revision notices. Match ZeroToVPN.
Page anatomy:
1. Bright blue announcement bar “NEW: 2026 VPN Performance Report →”.
2. Dark ZeroToVPN navigation matching references.
3. Breadcrumb “Home / Reports”.
4. Hero with eyebrow “OPEN RESEARCH · VERSIONED & SOURCE-LINKED”, large serif H1 “VPN Research Library”, dek “Reports, datasets and methods behind our VPN reviews—published with dates, limitations and correction histories.” Add large search field “Search reports, datasets and methods”, button “Search research”, and trust row “Public methods”, “Downloadable data”, “Corrections logged”. Right hero visual: an elegant data-library collage of report covers, charts, map tiles and dataset files.
5. Featured publication section titled “Featured report”. Large split card for “VPN Transparency & Performance Index 2026” with custom dark map/chart cover art, badge “ANNUAL INDEX · EDITION 1.0”, concise abstract, author, published date, dataset version, 32 min read. Buttons “Read report”, “Download PDF”, “View dataset”. Show four small metrics: 12 providers, 3 regions, 8 metrics, 120+ runs.
6. Sticky-looking filter/search bar titled “Browse the library” with chips “All research”, “Annual indices”, “Performance”, “Privacy & security”, “Censorship & access”, “Methods”, “Datasets”; selectors Year, Status, Format, plus Sort: Newest. Show results count.
7. “Latest research” visual card grid. Include:
   - Published card “VPN Transparency & Performance Index 2026” with dark chart cover and tags Report, Dataset.
   - “VPN kill-switch reliability: test protocol and baseline” with badge “METHOD · UPDATED”.
   - “VPN ownership & audit coverage map” with badge “DATASET · IN PROGRESS”.
   - “Long-distance speed variance field notes” with badge “LAB NOTE”.
   - “DNS, IP and WebRTC leak test records” with badge “TEST LOG”.
   - “Censorship access observations: Iran” with badge “FIELD NOTES · REVIEWING”.
Each card needs cover art/mini chart, date or status, format, 1-line summary, and “Open record →”. Clearly label non-published concept items as “In progress” or “Reviewing”, not as completed findings.
8. Dark navy “Data you can inspect” strip with file tiles for CSV datasets, JSON schema, reproducible test protocol, correction log. Show version and last-updated metadata; buttons “Browse datasets” and “Read data policy”.
9. “Research tracks” section with four large visual tracks: Performance Lab, Privacy Evidence, Ownership & Jurisdiction, Censorship & Access. Each has illustration/chart, active record count and “Explore track”.
10. “How a record becomes a report” horizontal 5-step pipeline: Research question, Protocol published, Test and source capture, Technical review, Versioned publication. Include link “Read editorial standards”.
11. “Updates and corrections” timeline with three dated entries, badges “Dataset update”, “Method clarification”, “Correction”. Show before/after description and “View full change log”.
12. “Methods and standards” two-column section: left methodology cards, right reviewer/editor portrait panel and statement “We publish limitations alongside conclusions.” Links to How we test, Editorial policy, Affiliate disclosure.
13. “Looking for the live rankings?” promotional bridge to “Open VPN Index” and “Build a comparison”, explaining live dashboard versus frozen report edition.
14. FAQ accordion “Research library FAQ”.
15. Neutral research email capture “Get new test results, not sales hype.” with report cadence options.
16. Dense professional ZeroToVPN footer.
Text (verbatim for major labels): “VPN Research Library”, “Featured report”, “VPN Transparency & Performance Index 2026”, “Browse the library”, “Latest research”, “Data you can inspect”, “Research tracks”, “How a record becomes a report”, “Updates and corrections”, “We publish limitations alongside conclusions.”
Constraints: formal research tone, visual scanability, cover imagery and charts on most cards, no fake press logos or endorsements, no affiliate CTA, no universal winner claim. Concept-only future records must visibly say “In progress” or “Reviewing”. Do not imply an item is downloadable unless a file/version exists in production; the design may show file component anatomy as a mockup. Major text must be legible, status conveyed with text plus color, 44px controls, semantic card/list structure, high contrast, responsive behavior implied. No pop-up, no browser chrome, no watermark, no unrelated logos, no misspelled ZeroToVPN wordmark, no excessive tiny paragraphs.
```

References:

- `zerotovpn-homepage-concept-v3-visual-editorial.png`
- `zerotovpn-research-report-concept-v1.png`
- `zerotovpn-blog-overview-concept-v1.png`
- `zerotovpn-vpn-index-concept-v1.png`
