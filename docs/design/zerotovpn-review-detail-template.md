# ZeroToVPN visual review detail template

Status: preferred review-page direction

Visual reference: `zerotovpn-review-detail-concept-v1-nordvpn.png`

The NordVPN mockup demonstrates the reusable structure. Provider names, prices, scores, feature counts, test dates, and offer language shown in a concept image are placeholders unless they are supplied by the project data layer and verified at render time.

## Page objective

Help a visitor answer three questions quickly:

1. Is this VPN right for my needs?
2. What evidence supports the verdict?
3. What is the next sensible action: read deeper, compare, or visit the provider?

The page remains an independent editorial review. Affiliate conversion is a consequence of a clear decision path, not the visual identity of the page.

## Page anatomy

### Editorial header

- breadcrumbs;
- independent-review label;
- descriptive H1 containing the provider and year;
- one-sentence dek with the main trade-off;
- author, update date, last-tested date;
- visible affiliate disclosure and methodology link.

### Hero verdict

Two-column visual block:

- provider/app image on the left;
- dark verdict panel on the right;
- overall rating plus a link explaining scoring;
- best-for statement;
- three strengths and one limitation;
- one tracked primary CTA;
- money-back information only when verified.

Provider partner material can be used here when licensed. Remove original campaign navigation, discount copy, and promotional UI that is not part of the current verified offer.

### Anchor navigation

Sticky horizontal navigation for:

- Verdict;
- Speed;
- Privacy;
- Streaming;
- Apps;
- Pricing;
- Alternatives;
- FAQ.

### Three-column reading shell

Desktop:

- left: compact sticky table of contents and methodology link;
- center: review evidence and editorial analysis;
- right: sticky at-a-glance decision card.

Mobile:

- collapse to one column;
- move at-a-glance below the hero;
- render the table of contents as a disclosure or horizontally scrolling anchor row;
- do not show a persistent affiliate overlay.

### Quick answer

- five explainable sub-scores;
- pros and cons;
- “Who should choose it?”;
- “Who should skip it?”;
- short verdict before the long-form evidence.

Every score must link to or state its measurement method. Avoid arbitrary precision when the underlying evidence does not support it.

### Test-results module

Use the most decision-relevant evidence:

- one chart;
- four compact metrics;
- test date, location, platform, protocol, and baseline;
- one real screenshot or testing-workstation image;
- methodology link.

Do not mix first-party tests and third-party benchmarks without labelling the source.

### Topic sections

Each major section follows the same rhythm:

1. clear editorial conclusion;
2. visual proof such as a chart, screenshot, timeline, or table;
3. short interpretation;
4. honest limitation;
5. internal link to a deeper guide or comparison where useful.

Core sections:

- Privacy and security;
- Speed and reliability;
- Streaming and everyday use;
- Apps and device support;
- Plans and pricing;
- Alternatives and comparisons.

### Pricing

- fetch current pricing from the verified data source;
- label billing period and upfront cost;
- separate introductory and renewal pricing;
- avoid unassigned coupons and unverified discount percentages;
- one primary CTA for the selected plan, plus plain internal plan explanation;
- apply the deterministic affiliate sub-ID helper.

### Comparison

Use an accessible HTML table with dimensions that matter to the decision. Include internal links to provider reviews and head-to-head comparisons. Do not make every cell an affiliate link.

### Final decision layer

- final verdict;
- one compliant CTA;
- related-review image cards;
- FAQ;
- newsletter signup;
- sources and update history.

## Visual-density rules

- target roughly 45–55% imagery/infographics and 45–55% copy/UI;
- introduce meaningful visual evidence every one or two sections;
- paragraphs should generally stay around 45–75 words;
- use a table only where values truly compare;
- prefer one strong chart over several decorative metrics;
- keep provider imagery editorially framed and distinguish it from ZeroToVPN-owned testing evidence.

## Affiliate rules

- disclosure appears before the first affiliate link;
- no affiliate popup or exit-intent offer;
- newsletter popup may collect email without affiliate promotion;
- no unapproved coupon language;
- no fake urgency or countdown timer;
- CTA labels describe the action, such as “Check current price”;
- primary CTA, inline price links, and provider links use the existing attribution layer;
- NordVPN material is used only on eligible, relevant content and within its promotion rules.

## Reusable component map

Build or adapt:

- `ReviewEditorialHeader`;
- `ReviewVerdictHero`;
- `ReviewAnchorNav`;
- `ReviewAtAGlance`;
- `ReviewScoreBreakdown`;
- `ReviewAudienceFit`;
- `ReviewEvidenceChart`;
- `ReviewMetricGrid`;
- `ReviewSpecsTable`;
- `ReviewPricingGrid`;
- `ReviewComparisonTable`;
- `ReviewFinalVerdict`.

Reuse the existing affiliate buttons, affiliate text links, table of contents, related content, provider data layer, structured data, disclosure, and localization utilities. The visual redesign must not create a second source of provider facts.

## Acceptance criteria

- verdict, trade-off, rating, disclosure, test date, and next action are visible above the fold;
- the page has exactly one H1;
- heading nesting remains logical;
- all tables have captions and accessible headers;
- every chart has a text equivalent;
- no production claim is sourced from the concept image;
- images are responsive, correctly sized, and do not cause layout shift;
- mobile users can reach every section without a blocking overlay;
- affiliate attribution and editorial audit tests remain green.

