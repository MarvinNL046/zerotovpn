# ZeroToVPN homepage redesign plan

Status: concept v1 — visual direction and implementation brief

Reference concepts:

- `zerotovpn-homepage-concept-v1.png` — initial decision-dashboard exploration;
- `zerotovpn-homepage-concept-v2-editorial.png` — editorial transition;
- `zerotovpn-homepage-concept-v3-visual-editorial.png` — preferred image-led magazine direction.

## Objective

Turn the homepage from an information directory into an editorial VPN decision hub. A first-time visitor should understand the ZeroToVPN promise, see a credible recommendation, choose a route by intent, and reach a relevant review or provider CTA without hunting through the navigation.

The design combines:

- That Fit Friend’s strong brand personality, visual content scenes, founder trust, and finder experience;
- SoundGuys’ lab authority, quick picks, update history, scores, and product data;
- Tom’s Guide’s comparison and affiliate conversion patterns;
- ZeroToVPN’s existing research, methodology, tools, clusters, and compliant affiliate attribution.

## Design direction

### Brand system

- Deep navy: `#0B1736` for navigation, authority blocks, and high-contrast surfaces.
- Electric blue: `#2563EB` for primary actions and active links.
- Cyan: `#19C3D8` for testing, technology, and secondary accents.
- Lime: `#B8E34A` for positive test results and trust indicators.
- Warm off-white: `#F7F7F2` for the editorial canvas.
- Charcoal: `#172033` for body text.
- Use one consistent icon stroke and one card radius system; avoid unrelated gradients and generic AI imagery.

### Tone

Clear, evidence-led, practical, and human. The site should make a recommendation while stating the trade-off. Avoid hype, fake urgency, unexplained scores, and vague claims such as “the most secure VPN” without test context.

## Homepage information architecture

### Visual-density rule

The homepage must behave like an editorial front page, not a SaaS dashboard. Above the fold, target roughly 60% visual surface and 40% copy/UI. Use one dominant lead image, supporting thumbnail stories, a numbered trending rail, and short headlines that remain understandable without excerpts. Comparison tables and detailed scores belong after the visual discovery layer.

Scanning order:

1. dominant field-test story;
2. current reviews and comparisons in the side rail;
3. numbered trending topics;
4. visual use-case navigation;
5. commercial top picks;
6. methodology and latest content.

### 1. Research announcement bar

Purpose: show freshness without looking like an affiliate ad.

Example: “New: our 2026 VPN performance report is live — see how providers compare.”

Do not use this bar for NordVPN discounts or unassigned coupons.

### 2. Header

Primary navigation should expose five decision routes:

- Best VPNs
- Reviews
- Countries
- Devices
- Guides

Secondary actions: How we test, VPN Finder, search, language switcher.

On mobile, keep the same route order and make the VPN Finder a visible action rather than hiding it inside a deep menu.

### 3. Hero

Content:

- eyebrow: “Independent VPN research”;
- H1: “Find the right VPN for your needs”;
- supporting copy explaining real-world testing;
- primary CTA: “Explore top VPNs”;
- secondary CTA: “Take the VPN finder”;
- visual: original shield/world-map illustration or testing visual;
- trust line: last research update, methodology, and affiliate disclosure.

The homepage no longer needs a large conventional marketing hero. In the preferred concept, a compact editorial lead story performs this job: a bold test image, a short field-test label, and a headline explaining what ZeroToVPN learned. The mission is visible through the story itself instead of a generic shield illustration.

Use a conventional text-led hero only on campaign landing pages or when no strong editorial feature is available.

### 3a. Editorial lead mosaic

The first viewport uses an asymmetrical magazine grid:

- one dominant, landscape field-test story;
- three supporting image cards for a guide, provider review, and comparison;
- a numbered “Trending now” rail with five compact entries;
- concise category labels and headlines;
- strong 16:9 or 4:3 thumbnail crops with consistent ZeroToVPN art direction.

No excerpt should exceed two lines in this area. The image and headline must carry the click decision.

### 4. Top VPN picks

Place this section after the editorial mosaic and visual use-case navigation. Three compact recommendation cards, not a wall of providers. Every card includes:

- rank and provider identity;
- rating with scoring context;
- “Best for” label;
- two or three strengths;
- one honest limitation;
- current price where verified;
- “View deal” affiliate CTA;
- internal “Read full review” link.

Price links and CTAs must use the existing affiliate attribution helper and remain compliant with each partner’s promotion rules.

### 5. Comparison table

Keep the first table decision-focused:

- VPN;
- privacy;
- speed;
- streaming;
- device coverage;
- value;
- review link.

Use a real accessible HTML table with a caption, `thead`, `tbody`, and row headers. On mobile, provide a horizontal scroll treatment plus a stacked card fallback for the top three providers.

### 6. Why trust ZeroToVPN?

A dark authority block should show real, maintainable metrics:

- providers tested;
- speed tests completed;
- countries/regions tested;
- platforms tested;
- last methodology update;
- link to methodology.

Include one small readable test chart. Do not turn metrics into decorative numbers; each value needs a source or calculation path.

### 7. Explore VPN guides

Four high-level cluster cards:

- Streaming;
- Privacy;
- Countries;
- Devices.

Each card contains a one-sentence explanation and one cluster CTA. These cards are the homepage’s topical-authority bridge into the deeper site.

### 8. Latest research and reviews

Use an editorial feature grid rather than a raw chronological feed:

- one large lead story;
- two supporting stories;
- a compact “latest updates” list.

Every tile needs a real takeaway, not only a title. Use branded thumbnails, consistent aspect ratios, descriptive alt text, and visible update dates.

### 9. VPN Finder

Promote the existing quiz as a first-class product:

- “Find your VPN in 60 seconds”;
- one short explanation of the matching logic;
- start button;
- optional email capture after the result, not before the first useful interaction.

The email popup may remain for newsletter collection, but it must not contain an affiliate offer or an unapproved discount.

### 10. Tools and transparency

Small links to:

- IP checker;
- DNS leak test;
- speed test;
- VPN index;
- transparency reports;
- editorial policy;
- affiliate disclosure.

This block differentiates ZeroToVPN from generic affiliate pages and creates useful internal links.

### 11. Newsletter and footer

Newsletter copy should promise a specific benefit: new test results, privacy explainers, and meaningful VPN updates. Keep the form short, state that unsubscribing is easy, and link to privacy information.

## Component mapping to the current codebase

Reuse before rebuilding:

- `Header` for navigation and accessibility behavior;
- `VpnReviewCard` for provider recommendation cards;
- `ComparisonTable` for the first comparison layer;
- `AffiliateButton` and `AffiliateTextLink` for compliant tracked links;
- `TableOfContents`, `RelatedPages`, and `RelatedContent` for downstream pages;
- `quiz-wizard` and `quiz-results` for the VPN Finder;
- newsletter components for email collection;
- existing methodology, disclosure, schema, and attribution utilities.

Create only the missing homepage composition layer and visual primitives first. Avoid creating a second, competing card system.

## Content and visual ratios

For the homepage:

- above the fold: approximately 60% imagery and 40% copy/UI;
- whole page: 35–45% editorial discovery;
- 25–35% decision content: picks, comparison, finder;
- 15–25% trust and methodology;
- 10–15% cluster navigation and newsletter;
- no more than one prominent affiliate CTA per recommendation card;
- no affiliate pop-up or overlay;
- use 6–10 visual assets per 1,500 words on long-form pages;
- use a short paragraph rhythm of roughly 45–75 words on review pages;
- use one meaningful table per 1,000–1,500 words when structured specs exist.

## Implementation phases

### Phase 1 — visual shell

- establish tokens for navy, blue, cyan, lime, surface, borders, type scale, spacing, and radii;
- update homepage section order;
- build hero and top-picks composition;
- add the authority block and guide cluster cards;
- keep existing routes and data sources unchanged.

### Phase 2 — decision UX

- add comparison-table mobile fallback;
- promote VPN Finder;
- add review/update metadata;
- standardize card CTAs and inline price links;
- ensure all links retain `zt_...` sub-ID attribution.

### Phase 3 — editorial depth

- apply the new review template to `/best/best-vpn`, `/best/vpn-streaming`, `/countries/iran`, and `/reviews/nordvpn`;
- add score explanations, test screenshots, and compact specs tables;
- add “who should use it / who should avoid it” blocks;
- connect each page to its cluster hub and comparison pages.

### Phase 4 — measurement and iteration

Track:

- CTA clicks by position and provider;
- price-link clicks versus button clicks;
- comparison-table interactions;
- VPN Finder starts and completions;
- newsletter conversion;
- scroll depth;
- conversions by page and `aff_sub`.

Do not judge the redesign by clicks alone. The success metric is qualified provider clicks followed by attributed conversions.

## Acceptance criteria

- A new visitor can identify the site’s purpose within five seconds.
- The top three VPN recommendations are visible without navigating away.
- Every provider card has a clear use case, trade-off, review link, and compliant CTA.
- The first comparison table is accessible on desktop and mobile.
- Methodology and disclosure are visible before or adjacent to commercial recommendations.
- No affiliate offer is delivered through a popup, exit-intent overlay, or unapproved coupon treatment.
- Existing attribution, SEO schema, and localization tests remain green.
- The homepage loads without layout shift from hero or card imagery.

## Partner asset usage

NordVPN campaign and product assets are already available in `assets/affiliate-source/` and selected production-ready visuals exist under `public/images/reviews/nordvpn/` and `public/logos/nordvpn.svg`.

Use them in NordVPN-specific review and offer modules where the campaign and geography are valid. Do not place a campaign-specific discount banner in the global homepage hero unless the offer, dates, locations, and copy have been verified. The global hero should remain editorial and provider-neutral; provider assets belong in the relevant provider card, review dossier, and compliant offer block.

## Visual concept

The first generated concept is a direction, not production copy or final provider data. It demonstrates the intended hierarchy: branded hero → quick picks → comparison table → trust metrics → cluster cards → newsletter.

The second concept adds editorial character through a large feature story and supporting guide cards.

The third concept is the preferred direction. It replaces the conventional hero with an image-led editorial mosaic, adds a numbered trending rail, makes the use-case navigation photographic and delays commercial top picks until after editorial discovery. It also demonstrates the correct use of approved NordVPN material: inside a clearly labelled NordVPN review card, without copying campaign discount text into the global homepage.
