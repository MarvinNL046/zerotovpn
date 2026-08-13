# ZeroToVPN visual design review index

Use this order for the design review. It moves from brand and discovery into editorial decisions, education, tools, research, and governance.

The mockups define hierarchy, visual language, component anatomy, and interaction states. Small generated copy and illustrative metrics are not production content.

## 1. Brand and discovery

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 1 | Homepage | `/` | [Open concept](./zerotovpn-homepage-concept-v3-visual-editorial.png) | Does this immediately feel like an active, independent VPN publication? |
| 2 | Guides hub | `/guides` | [Open concept](./zerotovpn-guides-hub-concept-v1.png) | Are the learning paths clearer than a chronological article grid? |
| 3 | Reviews directory | `/reviews` | [Open concept](./zerotovpn-reviews-directory-concept-v1.png) | Can readers scan scores, drawbacks, freshness, and compare without sales pressure? |
| 4 | Countries atlas | `/countries` | [Open concept](./zerotovpn-countries-atlas-concept-v1.png) | Are status, evidence, legality, and travel actions unambiguous? |
| 5 | Blog overview | `/blog` | [Open concept](./zerotovpn-blog-overview-concept-v1.png) | Does the Journal feel curated and current rather than like a 249-card archive? |

## 2. Decision pages

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 6 | Provider review | `/reviews/nordvpn` | [Open concept](./zerotovpn-review-detail-concept-v1-nordvpn.png) | Is the verdict, evidence, drawback, price context, and affiliate action balanced? |
| 7 | Country roundup | Iran pilot | [Open concept](./zerotovpn-country-roundup-concept-v1-iran.png) | Does safety/access context lead before provider promotion? |
| 8 | Head-to-head | `/compare/nordvpn-vs-surfshark` | [Open concept](./zerotovpn-head-to-head-concept-v1-nordvpn-vs-surfshark.png) | Is there a clear winner by use case rather than a fake universal winner? |
| 9 | Comparison builder | `/compare` | [Open concept](./zerotovpn-comparison-builder-concept-v1.png) | Can readers change priorities and inspect underlying evidence? |
| 10 | Safety verdict | `/is-nordvpn-safe` | [Open concept](./zerotovpn-provider-safety-verdict-concept-v1-nordvpn.png) | Are criticism, evidence strength, incident response, and threat models visible before monetization? |
| 11 | VPN Finder | `/quiz` | [Open concept](./zerotovpn-vpn-finder-concept-v1.png) | Is the recommendation explainable and are matching weights transparent? |

## 3. Editorial and education

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 12 | Blog detail | Connection-drops pilot | [Open concept](./zerotovpn-blog-detail-concept-v1-connection-drops.png) | Does a troubleshooting article behave like a diagnosis rather than a prose wall? |
| 13 | Evergreen explainer | `/guides/how-vpn-works` | [Open concept](./zerotovpn-evergreen-explainer-concept-v1-how-vpn-works.png) | Can a reader understand the tunnel boundary, visibility, and limits visually? |
| 14 | Setup tutorial | `/guides/vpn-on-mobile` | [Open concept](./zerotovpn-setup-tutorial-concept-v1-mobile.png) | Can a beginner complete and verify each step on iPhone or Android? |

## 4. Interactive tools

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 15 | Tools hub | `/tools` | [Open concept](./zerotovpn-tools-hub-concept-v1.png) | Does the hub route readers into a useful workflow rather than an icon grid? |
| 16 | DNS diagnostic | `/tools/dns-leak-test` | [Open concept](./zerotovpn-dns-leak-test-concept-v1.png) | Are state, route, remediation, and limits clear? |
| 17 | Speed benchmark | `/speed-test` | [Open concept](./zerotovpn-speed-test-concept-v1.png) | Can users compare a no-VPN baseline with VPN-on results without mistaking one run for a universal claim? |

## 5. Data and research

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 18 | VPN Index | `/vpn-index` | [Open concept](./zerotovpn-vpn-index-concept-v1.png) | Is every score explainable, fresh, and traceable to evidence? |
| 19 | Research library | `/reports` | [Open concept](./zerotovpn-research-library-concept-v1.png) | Can readers distinguish reports, datasets, methods, field notes, and status? |
| 20 | Research report | Annual index pilot | [Open concept](./zerotovpn-research-report-concept-v1.png) | Does the report clearly separate findings, method, data, limitations, and revision history? |

## 6. Trust and governance

| # | Page type | Route | Mockup | Review question |
| --- | --- | --- | --- | --- |
| 21 | How We Test | `/how-we-test` | [Open concept](./zerotovpn-how-we-test-concept-v1.png) | Does the public process feel tangible without pretending illustrative lab data is real? |
| 22 | Methodology | `/methodology` | [Open concept](./zerotovpn-methodology-reference-concept-v1.png) | Can a technical reader reproduce the score and audit a method change? |
| 23 | About and independence | `/about` | [Open concept](./zerotovpn-about-independence-concept-v1.png) | Does the page feel human and accountable without inventing a company or credentials? |

## Companion specifications

- [Full route and template coverage](./zerotovpn-design-system-coverage.md)
- [Homepage plan](./zerotovpn-homepage-redesign-plan.md)
- [Review detail](./zerotovpn-review-detail-template.md)
- [Country roundup](./zerotovpn-country-roundup-template.md)
- [Head-to-head](./zerotovpn-head-to-head-template.md)
- [Evergreen explainer](./zerotovpn-evergreen-explainer-template.md)
- [Blog overview](./zerotovpn-blog-overview-template.md)
- [Blog detail](./zerotovpn-blog-detail-template.md)
- [Interactive tools](./zerotovpn-interactive-tools-templates.md)
- [Data and research](./zerotovpn-data-research-templates.md)
- [Discovery and How We Test](./zerotovpn-discovery-trust-templates.md)
- [Setup and safety verdict](./zerotovpn-setup-safety-templates.md)
- [Methodology and About](./zerotovpn-trust-governance-templates.md)

## Suggested review decisions

For each page, capture only four decisions:

1. `Keep`: the composition and page anatomy are approved.
2. `Change`: note the one or two structural changes, not pixel-level copy edits.
3. `Evidence needed`: list illustrative modules that require real data or media.
4. `Priority`: assign rollout phase 1, 2, 3, or later.

After the system review, create implementation tickets by shared component and data contract—not one ticket per screenshot.
