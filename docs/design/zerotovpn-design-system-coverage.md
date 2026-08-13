# ZeroToVPN design-system coverage

Status: complete page-type concept set

Audit date: 13 August 2026

Scope: route-to-template architecture, not live implementation

## Outcome

ZeroToVPN now has a visual concept for every genuinely distinct page type in the current application. Keyword, country, provider, device, and locale variants inherit a template; they do not receive a separate one-off design.

The library contains 23 useful page-type concepts:

- 7 concepts completed before this batch;
- 16 concepts completed in the autonomous batch;
- 11 implementation blueprints covering their shared behavior.

Generated charts, prices, statuses, counts, scores, locations, dates, equipment, and provider outcomes are visual placeholders unless the repository already contains a source-backed record. Production must bind the templates to real data, provenance, freshness, and explicit `Unknown` states.

## Canonical visual system

All page types share:

- dark navy global masthead and full footer;
- thin electric-blue report/update strip;
- warm off-white editorial canvas;
- electric blue for navigation and primary actions;
- lime only for verified evidence or completed state;
- amber for caveats, dependencies, and uncertainty;
- red only for confirmed failures, restrictions, or poor fit;
- serif editorial display headings with compact sans-serif data UI;
- restrained radii, real tables, wide diagrams, and image-led sections;
- visible authorship, dates, evidence state, limitations, and corrections;
- commercial actions after the answer or evidence, never before it.

Homepage, hubs, articles, tools, and research surfaces are allowed different density and color balance. Consistency comes from tokens, evidence semantics, navigation, typography, and editorial behavior—not from putting every page inside the same card grid.

## Route-to-template map

### Global and editorial entry points

| Route or pattern | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/` | Visual editorial homepage | `zerotovpn-homepage-concept-v3-visual-editorial.png` | `zerotovpn-homepage-redesign-plan.md` | Bespoke concept complete |
| `/blog` | Journal overview and archive | `zerotovpn-blog-overview-concept-v1.png` | `zerotovpn-blog-overview-template.md` | Bespoke concept complete |
| `/blog/[slug]` | Journal article shell with intent modules | `zerotovpn-blog-detail-concept-v1-connection-drops.png` | `zerotovpn-blog-detail-template.md` | Troubleshooting pilot complete; news/analysis/investigation inherit the shell |

Static blog pages such as `/blog/is-vpn-legal` and `/blog/vpn-vs-proxy` should either use the shared article shell or redirect to the chosen evergreen canonical. Do not maintain visually and semantically competing copies.

### Reviews, verdicts, and commercial decisions

| Route or pattern | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/reviews` | Searchable evidence-led review directory | `zerotovpn-reviews-directory-concept-v1.png` | `zerotovpn-discovery-trust-templates.md` | Bespoke concept complete |
| `/reviews/[slug]` | Provider review detail | `zerotovpn-review-detail-concept-v1-nordvpn.png` | `zerotovpn-review-detail-template.md` | Bespoke concept complete |
| `/reviews/ivacy` | Provider review detail | Review-detail template | Review-detail blueprint | Migrate bespoke route into shared shell |
| `/is-nordvpn-safe` | Provider safety and criticism verdict | `zerotovpn-provider-safety-verdict-concept-v1-nordvpn.png` | `zerotovpn-setup-safety-templates.md` | Bespoke concept complete |
| `/are-vpns-safe` | Generic safety explainer | Evergreen-explainer shell plus safety matrix | Evergreen + safety blueprints | Inherited variant; no extra mockup needed |
| `/compare` | Interactive comparison builder | `zerotovpn-comparison-builder-concept-v1.png` | `zerotovpn-data-research-templates.md` | Bespoke concept complete |
| `/compare/[comparison]` | Head-to-head comparison detail | `zerotovpn-head-to-head-concept-v1-nordvpn-vs-surfshark.png` | `zerotovpn-head-to-head-template.md` | Bespoke concept complete |

### Roundups and destination decisions

| Route or pattern | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/best/*` | Use-case, device, value, or platform roundup | `zerotovpn-country-roundup-concept-v1-iran.png` as the roundup system, with a route-specific hero and decision matrix | `zerotovpn-country-roundup-template.md` | Shared commercial-roundup template |
| `/countries/[country]` and existing static country routes | Country access guide with contextual recommendations | Country-roundup system after a country-status preface | Country-roundup + atlas blueprint | Shared country-detail variant |
| Legacy `/best-vpn*` and `/vpn-for-*` routes | Redirect aliases | No mockup | Canonical redirect contract | Keep redirect-only; never style as duplicate pages |

The country design must start with legality, access conditions, evidence date, and safety context. Provider cards belong after the status answer. Device and use-case roundups swap the country-status preface for the reader's decision criteria but retain the same comparison, testing, disclosure, and source modules.

### Guides and learning

| Route or pattern | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/guides` | Learning hub and topical pathways | `zerotovpn-guides-hub-concept-v1.png` | `zerotovpn-discovery-trust-templates.md` | Bespoke concept complete |
| `/guides/what-is-vpn`, `/guides/how-vpn-works` | Evergreen visual explainer | `zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png` | `zerotovpn-evergreen-explainer-template.md` | Bespoke system complete |
| `/guides/public-wifi-safety`, `/guides/vpn-for-restricted-networks`, `/guides/vpn-for-streaming`, `/guides/vpn-for-torrenting`, `/guides/vpn-for-travel`, `/guides/vpn-obfuscation-explained`, `/guides/vpn-privacy-guide`, `/guides/vpn-protocols-explained`, `/guides/vpn-speed-guide` | Evergreen explainer variants | Evergreen-explainer system | Evergreen blueprint | Inherit with topic-specific diagram/table |
| `/guides/vpn-on-mobile` | Procedural setup tutorial | `zerotovpn-setup-tutorial-concept-v1-mobile.png` | `zerotovpn-setup-safety-templates.md` | Bespoke concept complete |
| `/how-to-set-up-vpn` | Legacy setup alias | No mockup | Permanent redirect to canonical tutorial | Redirect-only |
| `/what-is-a-vpn`, `/how-does-a-vpn-work` | Legacy explainer aliases | No mockup | Permanent redirects | Redirect-only |
| `/are-vpns-legal`, `/common-vpn-myths`, `/vpn-encryption-explained`, `/vpn-vs-proxy`, `/vpn-vs-tor`, `/what-is-no-log-policy` | Answer-first evergreen explainers | Evergreen-explainer system | Evergreen blueprint | Inherited variants |

### Countries and access intelligence

| Route | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/countries` | Filterable global access atlas | `zerotovpn-countries-atlas-concept-v1.png` | `zerotovpn-discovery-trust-templates.md` | Bespoke concept complete |

The map always needs an accessible list/table equivalent. `Open`, `Regulated`, `Restricted`, `Blocking reported`, and `Needs verification` are evidence states, not decorative colors. Every status exposes a checked date and source basis, and the page states that it is not legal advice.

### Interactive product surfaces

| Route | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/quiz` | VPN Finder question and result states | `zerotovpn-vpn-finder-concept-v1.png` | `zerotovpn-interactive-tools-templates.md` | Bespoke concept complete |
| `/tools` | Privacy and VPN tools hub | `zerotovpn-tools-hub-concept-v1.png` | `zerotovpn-interactive-tools-templates.md` | Bespoke concept complete |
| `/tools/dns-leak-test` | Stateful diagnostic result page | `zerotovpn-dns-leak-test-concept-v1.png` | `zerotovpn-interactive-tools-templates.md` | Bespoke concept complete; backend gap noted |
| `/tools/what-is-my-ip` | Instant diagnostic detail | DNS diagnostic system with IP-specific result modules | Interactive-tools blueprint | Inherited diagnostic variant |
| `/speed-test` | Active network benchmark | `zerotovpn-speed-test-concept-v1.png` | `zerotovpn-interactive-tools-templates.md` | Bespoke concept complete |

Critical implementation constraint: the current DNS widget is not a true DNS-resolver probe. Build tokenized DNS-probe infrastructure before calling the outcome a DNS leak result, or rename and explain the current route heuristic.

### Index, data, and research

| Route | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/vpn-index`, `/vpn-index/2026` | Live filterable evidence dashboard | `zerotovpn-vpn-index-concept-v1.png` | `zerotovpn-data-research-templates.md` | Bespoke concept complete |
| `/reports` | Versioned research library | `zerotovpn-research-library-concept-v1.png` | `zerotovpn-data-research-templates.md` | Bespoke concept complete |
| `/reports/vpn-transparency-performance-index-2026` | Frozen report edition | `zerotovpn-research-report-concept-v1.png` | `zerotovpn-data-research-templates.md` | Bespoke concept complete |

The live Index, frozen report, dataset, and review score must share metric definitions but keep different publication semantics. The current composite `transparencyScore` is not sufficient for the public system: split performance, privacy/security, transparency, reliability, streaming, and value into explicit score families; attach field-level provenance; preserve `Unknown` and `Needs retest`; never rank a placeholder or fallback value as observed fact.

### Trust, methods, and governance

| Route | Page type | Visual concept | Blueprint | Status |
| --- | --- | --- | --- | --- |
| `/how-we-test` | Public visual explanation of the test process | `zerotovpn-how-we-test-concept-v1.png` | `zerotovpn-discovery-trust-templates.md` | Bespoke concept complete |
| `/methodology` | Versioned technical method specification | `zerotovpn-methodology-reference-concept-v1.png` | `zerotovpn-trust-governance-templates.md` | Bespoke concept complete |
| `/about` | Founder-led independence and accountability page | `zerotovpn-about-independence-concept-v1.png` | `zerotovpn-trust-governance-templates.md` | Bespoke concept complete |

`How we test` is the accessible public story. `Methodology` owns the exact environment, metrics, fixed weights, validity gates, evidence taxonomy, artifact bundle, revision log, and correction mechanism. `About` owns the human mission, accountability, funding model, and limits. They link to one another but do not repeat the same page.

### Standard institutional shells

| Route | Shell | Bespoke mockup needed? |
| --- | --- | --- |
| `/editorial-policy` | Versioned policy/document shell | No |
| `/affiliate-disclosure`, `/disclosure` | Disclosure shell; consolidate canonicals | No |
| `/privacy-policy`, `/terms`, `/cookie-policy` | Legal document shell with version/date/contents | No |
| `/contact` | Contact shell with editorial, correction, partnership, and privacy channels | No |

These pages inherit typography, masthead, breadcrumb, table of contents, revision metadata, contact ownership, and footer. They should remain intentionally quieter than editorial and research pages.

## Shared implementation primitives

Build these before page-by-page migration:

### Foundation

- `SiteMasthead`
- `ReportStrip`
- `SiteFooter`
- `EditorialContainer`
- `SectionAnchorNav`
- `EditorialHero`
- `ImageProvenance`
- `UpdatedAt`
- `AuthorReviewerByline`
- `NewsletterCapture`

### Evidence and trust

- `EvidenceBadge`
- `EvidenceLegend`
- `SourceLedger`
- `LastTested`
- `FreshnessStatus`
- `LimitationCallout`
- `CorrectionRecord`
- `MethodologyLink`
- `AffiliateDisclosure`
- `EditorialFirewall`

### Decisions and data

- `ProviderIdentity`
- `ScoreBreakdown`
- `ComparisonTable`
- `CompareTray`
- `ClaimLedger`
- `ThreatModelMatrix`
- `TestResultChart`
- `DiagnosticState`
- `ToolResultBoundary`

One evidence vocabulary must work across reviews, comparisons, Index, reports, safety verdicts, country status, and tools.

## Data contracts required before visual implementation

### Every publishable claim

- claim identifier;
- displayed wording;
- evidence type;
- source URL or artifact;
- source owner/publisher;
- captured or checked date;
- scope and limitation;
- confidence/evidence strength;
- next review date;
- correction history.

### Every metric

- metric family and definition;
- unit or state vocabulary;
- raw observation;
- normalization rule;
- sample count and test window;
- device, location, route, and protocol context;
- provenance at field level;
- freshness state;
- explicit `Unknown`, never a silent fallback.

### Every commercial action

- affiliate network/provider;
- stable destination or managed short link;
- placement identifier;
- locale/market eligibility;
- disclosure rendered before the first link;
- `rel="sponsored nofollow"`;
- no unassigned coupon, fake price, urgency, or incentive.

## Responsive and accessibility baseline

- All maps, diagrams, charts, and score visuals have a textual or tabular equivalent.
- State is never conveyed through color alone.
- Tables retain row identity and scroll predictably on small screens.
- Sticky navigation has a keyboard-accessible mobile equivalent.
- Progress and test results use semantic status and live regions.
- Touch targets are at least 44×44 pixels.
- Focus remains visible; reduced motion is respected.
- Essential copy remains HTML, not baked into final production artwork.
- Provider logos have accessible names; decorative images use empty alt text.

## Recommended rollout

### Phase 0 — integrity before polish

1. Lock design tokens, typography, masthead/footer, grids, and responsive behavior.
2. Define provider, metric, evidence, freshness, source, author/reviewer, and affiliate contracts.
3. Remove or quarantine fallback values that currently look like measured evidence.
4. Fix canonical/locale duplication and shared structured-data primitives.

### Phase 1 — current traffic and commercial journeys

1. Homepage.
2. Blog overview and pilot blog detail.
3. Reviews directory and provider review detail.
4. Comparison builder and head-to-head detail.
5. Country/use-case roundup and NordVPN safety verdict.

### Phase 2 — topical authority and trust

1. Guides hub and evergreen explainer.
2. Mobile setup tutorial.
3. Countries atlas.
4. How We Test, Methodology, and About.

### Phase 3 — product and data moat

1. VPN Index and research library/report.
2. Tools hub and What Is My IP.
3. Real DNS resolver probe and DNS leak test.
4. Speed-test baseline/VPN comparison flow.
5. VPN Finder with transparent matching weights.

## Batch acceptance criteria

- Every current non-redirect route maps to a bespoke concept, inherited template, or intentionally quiet institutional shell.
- No keyword or locale variant requires a one-off visual architecture.
- Every commercial surface visibly separates editorial evidence from affiliate action.
- Every data surface can render `Unknown`, `Needs retest`, and limitations.
- Tools state what they measure and what they cannot prove.
- `How we test`, `Methodology`, and `About` have distinct jobs.
- All mockup values are treated as design placeholders until bound to source-backed records.
