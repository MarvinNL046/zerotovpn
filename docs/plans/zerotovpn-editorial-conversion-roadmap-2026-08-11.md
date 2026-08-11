# ZeroToVPN editorial, SEO & affiliate conversion roadmap

**Version:** 1.0 — 11 August 2026  
**Scope:** editorial templates, topical authority, organic CTR and compliant affiliate conversion  
**Primary references:**

- `C:\Users\M_Smi\Projecten\obsidian-vault\On-page SEO — 80+ Point Checklist.md`
- `C:\Projecten\zerotovpn\docs\research\tomsguide-best-vpn-page-analysis-2026-08-11.md`
- `C:\Projecten\zerotovpn\docs\plans\zerotovpn-masterplan-2026.md`

## Execution log

- **11 August 2026:** Ran a real 390px Chrome smoke test on /countries/iran and /. Both routes rendered with HTTP 200, one H1, no horizontal overflow, no framework error overlay and no page errors. The test caught and fixed a removed /best breadcrumb prefetch plus a locale-dependent homepage number formatter that caused a React hydration warning. Evidence: [mobile-browser-smoke-2026-08-11.md](../metrics/mobile-browser-smoke-2026-08-11.md); deployment dpl_Hqx6frvFzixrTptRBYp6Wo56BMbt is Ready.

- **11 August 2026:** Extracted `BestVpnEditorialTemplate` and `EditorialQuickPickCard` into `src/components/editorial/best-vpn-editorial-template.tsx`, then refactored the Best VPN page and dynamic blog route to use the shared disclosure/jump-nav pattern. ESLint, production build and local browser checks pass.
- **11 August 2026:** Added the [Iran editorial brief](../research/iran-vpn-editorial-brief-2026-08-11.md) with the research fields, evidence boundary, internal-link map and affiliate compliance gates for the first content refresh.
- **11 August 2026:** Ran the first cached DataForSEO US/English pass for the Iran cluster: keyword overview, related suggestions, five SERP/PAA samples and competitor domains. Results are recorded in `docs/research/dataforseo-iran-cluster-2026-08-11.{json,md}`; missing current volume is explicitly not treated as zero demand.
- **11 August 2026:** Replaced the stale English Iran article body with an evidence-bounded editorial version, added official-source citations, PAA FAQ schema, reciprocal censorship-cluster links and a contextual NordVPN/Surfshark/ProtonVPN shortlist. Local browser QA confirmed six sponsored/no-follow CTA links and no overflow; production deployment `dpl_ECe2WSNo7qccAHtAxG8nrh4d5Qrh` is Ready and live at `https://www.zerotovpn.com/blog/best-vpn-for-iran-2026-bypass-internet-censorship`.
- **11 August 2026:** Audited and refreshed the Telegram supporting page using a new DataForSEO dossier and Telegram's official MTProxy documentation. The new version separates account blocks from network filtering, compares MTProxy/SOCKS5/VPN scope, adds feature-specific test steps, FAQ schema, reciprocal country/protocol links and contextual provider CTAs. Local browser QA passes; deployment follows after the release gate.
- **11 August 2026:** Audited the Russia country page with a new DataForSEO dossier and replaced the English route's stale claim-heavy layout with a shared evidence-led editorial shell. It now uses dated Freedom House context, a decision table, bounded test plan, reciprocal Iran/Telegram/China links, FAQ schema and a contextual shortlist. Desktop and 390px browser checks pass; deployment follows after the release gate.
- **11 August 2026:** Audited the China country page with a new DataForSEO dossier and replaced the English route's stale provider-success and legal-certainty claims with a shared evidence-led editorial shell. It now uses dated Freedom House and travel guidance, a decision table, bounded test plan, reciprocal cluster links, FAQ schema and contextual provider CTAs. Release QA is next.
- **11 August 2026:** Built and deployed the protocol support page at `/guides/vpn-protocols-explained` from a fresh DataForSEO dossier. The page targets the strongest current signals (`wireguard vs openvpn` and `openvpn tcp vs udp`), adds decision cards, a comparison table, bounded obfuscation guidance, a reproducible test plan, PAA FAQ schema, official sources and reciprocal links to Iran/Russia/China/Telegram. Added `npm run audit:editorial`; all six editorial/compliance checks pass. Local and production desktop/390px browser checks pass with six sponsored/no-follow CTAs and no overflow. Production deployment: `dpl_GkosyHK3BhG4XekdRyvc45YTND39`.
- **11 August 2026:** Converted the supplied Search Console, AI-visibility, indexing and Short.io screenshots into the [performance baseline and next-pillar gate](./zerotovpn-performance-baseline-2026-08-11.md). The next commercial pillar is `/best/best-vpn`: it already has hub-level visibility, but the current implementation still contains stale test counts, speed/coverage figures and universal legal/access wording that must be qualified or sourced before the next release.
- **11 August 2026:** Rebuilt the English `/best/best-vpn` pillar with the shared Tom's Guide-style top-three cards, contextual clickable prices, provider dossiers, a decision table, bounded methodology, cluster links, FAQ schema and freshness labels. Local and production desktop/390px checks pass with no overflow; the page no longer renders the stale `6,730 Mbps`/`35+ VPNs` claims. Commit `dcb0892` is pushed and production deployment `dpl_81gHiJq265MZu1VAzgkX8RQWedHz` is Ready and aliased to `https://www.zerotovpn.com`.
- **11 August 2026:** Added a machine-readable screenshot baseline at `docs/metrics/zerotovpn-baseline-2026-08-11.json`, CSV measurement importer `npm run measure:editorial`, and operator instructions in `docs/metrics/README.md`. A localized-header fixture run produced normalized CTR and click deltas successfully; no conversion/EPC values were invented.
- **11 August 2026:** Added and deployed the canonical English supporting page `/guides/vpn-obfuscation-explained` from the protocol DataForSEO/PAA brief. It answers what obfuscation does, what it cannot promise, platform/protocol evidence to save, a bounded test plan, FAQ schema and links back to the censorship and protocol clusters. Local and production desktop/390px browser checks pass with six compliant CTA links and no overflow. Production deployment: `dpl_EcSFxP2Cf4pPQATAtjLmucfVpAUp`.
- **11 August 2026:** Added and deployed `/guides/vpn-for-restricted-networks` from a fresh DataForSEO restricted-network/PAA brief. The page classifies Wi-Fi, ISP, country-level and account restrictions; adds lawful preparation guidance, a bounded test plan, FAQ schema, dated Freedom House context and reciprocal cluster links. Local and production desktop/390px browser checks pass with six compliant CTA links, disclosure, all section anchors and no horizontal overflow. Commit `3e1109a`; production deployment `dpl_DSv98yEqxrXvH2tpHkgHGHmjrU4V` is Ready at `https://www.zerotovpn.com/guides/vpn-for-restricted-networks`.
- **11 August 2026:** Replaced the English `/guides/vpn-for-travel` route with an evidence-led travel page after a fresh DataForSEO dossier. Removed absolute access, “essential as your passport”, guaranteed-savings and “VPN required” claims; added official State Department/CISA/GOV.UK sources, pre-departure preparation, a decision table, FAQ schema and reciprocal restricted-network links. Local and production desktop/390px browser checks pass with six compliant CTA links, disclosure and no overflow. Commit `35fd8ec`; production deployment `dpl_2LRsmKEKeAbDwXqAWByG5V7ph1om` is Ready at `https://www.zerotovpn.com/guides/vpn-for-travel`.
- **11 August 2026:** Replaced the English `/best/free-vpn` route with an evidence-led free-tier comparison after a DataForSEO dossier. Removed the unsupported “99% sell your data” and blanket streaming/access claims; added first-party Proton/Windscribe/TunnelBear plan links, free-tier boundaries, a safety checklist, FAQ schema and contextual paid-upgrade guidance. Local and production desktop/390px browser checks pass with three compliant CTA links, disclosure and no overflow. Commits `64dd1b7`/`f8e9d50`; production deployment `dpl_FCWYCQWCCFYxMBBR879S6KS5XHDA` is Ready at `https://www.zerotovpn.com/best/free-vpn`.
- **11 August 2026:** Ran the new `npm run audit:sitemap` against all 2,285 live sitemap URLs. Before the fix, 2,277 were healthy and 8 localized Iran URLs were incorrectly `noindex` in the sitemap; all URLs otherwise returned 200, self-canonical and one H1. Updated locale-aware route detection so English obfuscation/restricted-network pages are included while noindex translations are excluded. The corrected generator now emits 90 static paths and filters the locale exceptions in `src/app/sitemap.ts`; rerun the full audit after deployment as the release gate.
- **11 August 2026:** Deployed the locale-aware sitemap fix in production (`dpl_GJ2MjSYGreN4u2W3vTT9e8zHrbjH`, commit `0d347fa`). The post-deploy audit checked 2,279 live sitemap URLs: 2,279 returned 200, were self-canonical, indexable and had exactly one H1; no noindex-in-sitemap or canonical mismatches remain. One localized disclosure page exceeded two seconds (2.18s) and is retained as a performance observation, not an indexation failure. Full evidence: [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md).
- **11 August 2026:** Kept the exit-intent component as an owned newsletter-consent prompt only. It contains no provider, affiliate link, coupon, discount, incentive or deal CTA; the NordVPN rule is therefore applied to affiliate advertising, while the email prompt remains a separate first-party lead-capture surface.
- **11 August 2026:** Added `npm run audit:affiliate-context` and normalized legacy blog/source links so every live affiliate anchor carries `sponsored nofollow`. After deployment `dpl_BRHMGyKdzcKdUMEgD7YayVowvh6X`, the full 2,279-URL audit found 1,756 affiliate pages and 8,216 links with **0 missing-rel pages, 0 missing-disclosure pages, 0 interruptive-promotion markers and 0 fetch failures**. The initial 32 promotion-term flags were reduced to 22 after removing unverified percentage-off CTA language; the remaining flags are editorial free-trial/incentive wording in dedicated comparison or educational contexts and remain manual-review items, not automatic violations. Evidence: [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Deployed the neutral pricing language across mobile/tablet comparison routes (`dpl_FFi4ke8dm9js1forpYXNgPdAwKHE`). The production build generated 4,447 routes successfully; the post-deploy affiliate audit still reports zero technical compliance failures and 22 contextual review flags.
- **11 August 2026:** Added a restricted-context guard for the blockchain/privacy article: affiliate anchors are rendered as plain provider text on that page, so commercial destinations are not placed beside mixer/non-KYC workflow content. Production deployment `dpl_YA2wPMrE9Dv599iMatt66P7m4Ttu` is Ready and aliased to `https://www.zerotovpn.com`; the live audit now reports 1,755 affiliate pages, 8,213 links, **0 missing-rel pages, 0 missing-disclosure pages, 0 interruptive markers and 0 fetch failures**. Contextual review flags fell from 22 to 21. Evidence: [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Captured the authenticated Search Console 3-month Web baseline (10 May–9 August 2026) directly from the UI: 395 clicks, approximately 184K impressions, 0.2% CTR and average position 32.7. The leading URLs confirm Iran (position 9.1) and Telegram (9.9) as current page-one winners, while `/best/best-vpn` has 6,301 impressions at position 51.5 and remains the main commercial uplift target. Evidence: [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md).
- **11 August 2026:** Extended `npm run measure:editorial` to accept an optional partner-dashboard CSV for conversions, revenue/commission and EPC. A fixture run calculated conversion rate and EPC correctly; a run without the optional export kept those values `null`. Commit `f0046ef` is pushed. The real 14-day measurement remains pending until the Search Console, Short.io and partner exports are available.
- **11 August 2026:** Hardened the measurement importer: it now detects comma/semicolon/tab CSVs, parses decimal commas such as `0,2%`, fails fast when required GSC or Short.io files are omitted, and records row counts plus explicit missing metrics. Added `npm run test:measure-editorial`; English, localized and missing-input cases pass.
- **11 August 2026:** Added `npm run audit:editorial-live` as a page-level release gate for the English commercial/cluster pages and homepage hub. It checks metadata, canonical/indexability, one H1, disclosure, methodology, required anchors, FAQ schema, required cluster links, internal links and affiliate rel attributes. The first deployed run passed **10/10 pages**, with 72 affiliate links, 0 missing `sponsored nofollow` attributes and 0 missing required cluster links. Evidence: [editorial-live-audit-2026-08-11.md](../metrics/editorial-live-audit-2026-08-11.md).
- **11 August 2026:** Extended the live release gate with complete Open Graph/Twitter card checks and image alt/dimension hygiene. Added one shared `DEFAULT_OG_IMAGE` for child metadata and fixed the Iran featured image's missing intrinsic dimensions. Production deployment `dpl_2GT3sPpk9b8jQTVxJrdk1yYbgisC` is Ready; the post-deploy audit passes **10/10 pages** with 0 Open Graph failures, 0 Twitter failures and 0 image-SEO failures.
- **11 August 2026:** Added a future-date check for Article JSON-LD and corrected the China/Russia country schemas from `2026-11-30` to the actual review date `2026-08-11`. Production deployment `dpl_FuMaJfUX86sqDFAFNWeUBgPnVY6f` is Ready; the live audit now reports 0 future structured-data dates across all ten target pages.
- **11 August 2026:** Fixed the locale middleware matcher so `/opengraph-image` and `/twitter-image` remain publicly reachable. The release gate now fetches the declared social image and requires an image content type; deployment `dpl_C3swvrLEbtRWG9CGiRnCYEidBZHT` is Ready, with 0 broken social-image URLs and **10/10** pages passing.
- **11 August 2026:** Added the homepage hub to the editorial release gate and linked it naturally to the Iran evidence dossier and protocol guide. Production deployment `dpl_Akt4QHHnotnSVn1D8rFDktZKHDQ3` is Ready (commit `bf7dcb6`); the live audit now passes **11/11 pages**, with 81 affiliate links, 0 missing `sponsored nofollow` attributes, 0 missing cluster links, 0 broken social-image URLs and 0 image-SEO failures.
- **11 August 2026:** Added the existing `/countries/iran` evidence checklist to the release gate, aligned its social metadata with the shared preview image, made the no-affiliate research boundary explicit, and corrected its China cluster link to `/countries/china`. Production deployment `dpl_8rQQ6XwJq2Lch7dP7Lb74bYM17tx` is Ready; the live audit now passes **12/12 pages** with 0 metadata, schema-date, social-image, image-SEO, affiliate-rel or cluster-link failures.
- **11 August 2026:** Re-ran the broad post-deploy audits against the live sitemap: all **2,279/2,279** URLs returned 200, were indexable, self-canonical and had one H1; all **1,755 affiliate pages / 8,213 links** had disclosure and `sponsored nofollow`, with 0 interruptive markers and 0 fetch failures. Three sitemap responses exceeded two seconds and remain performance observations, not indexation failures. Evidence: [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md) and [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Classified the 21 remaining affiliate-audit promotion flags in [affiliate-context-review-2026-08-11.md](../metrics/affiliate-context-review-2026-08-11.md). Free-trial wording is permitted only as a verified provider feature; “incentive” mentions in privacy articles are explanatory text. Any unclassified flag now requires removing the commercial destination before release.
- **11 August 2026:** Extended `npm run audit:editorial` to cover the global sticky CTA as well as the newsletter popup and restricted-context renderer. Both global conversion surfaces are now required to remain site-owned and non-commercial; the audit passes 15/15 checks.

## Outcome we are building

ZeroToVPN should feel like an independent testing publication, not a collection of affiliate landing pages. Every high-intent page must answer the query quickly, prove why the recommendation exists, give the reader a fair alternative, and make the relevant next action obvious without urgency tricks or irrelevant promotion.

The operating loop is:

```text
Search Console + DataForSEO
        ↓
Cluster brief + evidence dossier
        ↓
Editorial page using the standard template
        ↓
Browser / SEO / compliance QA
        ↓
Deploy + Search Console observation
        ↓
CTR, rankings, affiliate clicks and conversions
```

## Standard page architecture

Use this structure for `/best/*`, country pages, comparisons and commercial blog posts:

1. **Intent-matched title, H1 and update date**
   - Primary query near the beginning.
   - One clear answer in the opening paragraph.
   - Last-tested date visible whenever prices, features or censorship conditions can change.
2. **Early trust and disclosure layer**
   - Independent editorial statement.
   - Affiliate disclosure before or alongside the first commercial CTA.
   - Link to methodology and editorial policy.
3. **Quick picks / top 3 overview**
   - Provider logo or branded mark.
   - One-line use case and recommendation.
   - Current price context with the amount itself clickable to the relevant affiliate URL.
   - Descriptive internal review link.
   - One visible `Visit ...` affiliate CTA.
4. **Decision table**
   - Only fields that help this query: price, tested speed, security, streaming, locations, devices and refund terms.
   - Add a table caption, concise headers and a methodology link.
5. **Provider dossiers**
   - Ranking, who it is for, who should skip it, test result, pros, limitations, plan breakdown and one contextually repeated CTA.
   - Price labels and plan amounts can be affiliate links; never imply an unverified coupon or guaranteed discount.
6. **Evidence and method**
   - Test conditions, source URLs, checked date and uncertainty.
   - Separate first-party tests from provider claims.
7. **Cluster links and FAQ/PAA**
   - 3–5 meaningful internal links for supporting pages; more on pillar pages.
   - Descriptive anchors, never “click here”.
   - 4–8 direct answers from Search Console/DataForSEO PAA research with FAQ schema where eligible.
8. **Final choice guide and related content**
   - Help the reader choose based on privacy, streaming, travel, censorship, price or device.
   - Link back to the cluster hub and to relevant provider reviews.

## SEO checklist gates

Before a page is published, the implementation must pass these gates from the Obsidian checklist:

- One H1, logical H2/H3 hierarchy and natural keyword use.
- Title, meta description, canonical, Open Graph and Twitter metadata.
- Breadcrumbs, descriptive anchors and contextual internal links.
- FAQ/PAA answers and correct schema for the page type.
- Author/editor, published or updated date, methodology and source citations.
- Responsive layout, 16px+ body text, 48px touch targets and no page-level horizontal scroll.
- Optimised images with meaningful alt text and fixed dimensions.
- Affiliate links use `rel="sponsored nofollow"`; authoritative non-commercial sources use normal editorial linking.
- No affiliate pop-up/under advertising, fake urgency, keyword stuffing, doorway pages, unauthorised coupons or irrelevant provider promotion. A consented owned-newsletter prompt may collect email only when it contains no provider, coupon, discount or affiliate CTA.

## Content production plan

### Phase 1 — Template and measurement (week 1)

- Extract a shared `BestVpnEditorialTemplate` from the current Best VPN page.
- Make quick picks, price links, provider dossiers, tables, disclosures, FAQs and related links reusable props.
- Add a page-level content brief type: `primaryKeyword`, `intent`, `cluster`, `lastReviewedAt`, `evidence`, `affiliateContext`, `schemaType`.
- Add automated checks for missing disclosure, missing methodology link, missing canonical metadata and affiliate links without `sponsored nofollow`. The editorial gate now covers 12 shared and cluster-specific checks through `npm run audit:editorial`.
- Create a Search Console baseline for the existing Best VPN, Iran, Russia and Telegram pages. The authenticated UI baseline is now documented in [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md); use matched CSV/API exports for the post-14-day statistical comparison.

### Phase 2 — Upgrade existing winners (weeks 2–3)

Prioritise pages that already have impressions but weak CTR or positions 11–40:

1. Best VPN for Iran — primary censorship hub.
2. Best VPN for Telegram — supporting censorship/use-case page.
3. Best VPN for Russia — country cluster expansion.
4. Best VPN for China — evidence-led country page.
5. Best VPN overall — commercial pillar and internal-link hub.

For each page, improve the first viewport, the comparison table, provider card structure, inline affiliate price links, internal anchors, FAQ answers and freshness metadata before creating new URLs.

### Phase 3 — First new editorial post (week 4)

Shipped first editorial post:

**“Best VPN for Iran in 2026: tested options for censorship, privacy and safer travel”**

Why this was first:

- It aligns with existing Search Console impressions and near-page-one visibility.
- It naturally supports Iran, Telegram, Russia, China, obfuscation and VPN-protocol clusters.
- It allows affiliate promotion only in a genuine VPN-selection context.
- It can reuse the Tom’s Guide top-3 pattern while differentiating with ZeroToVPN evidence, uncertainty and legality context.

Suggested outline:

1. Short answer and safety disclaimer.
2. Top 3 overview with tested reason, current plan price and direct affiliate price link.
3. Comparison table.
4. How we tested access, speed, kill switch and obfuscation.
5. Provider dossiers with pros, limitations and “who should skip this” notes.
6. Practical setup guidance for restrictive networks.
7. Legal and safety context with authoritative sources.
8. PAA/FAQ section.
9. Related censorship and travel links.

### Phase 4 — Controlled cluster expansion (weeks 5–8)

The first controlled expansion is now live. The reciprocal support set around the censorship and commercial hubs is:

- [VPN obfuscation explained](/guides/vpn-obfuscation-explained)
- [How to use a VPN on restricted networks](/guides/vpn-for-restricted-networks)
- [VPN protocols explained](/guides/vpn-protocols-explained)
- [VPNs for travel](/guides/vpn-for-travel)
- [Best free VPN](/best/free-vpn)
- [Best VPN for Telegram](/blog/best-vpn-for-telegram-2026)
- [VPN for Russia](/countries/russia)
- [VPN for China](/countries/china)

The next 4–8 page selection is paused until the 14-day Search Console and Short.io exports are available. DataForSEO may refine the hypothesis, but it should not be used to manufacture another large URL batch without measured demand.

Each page must link to the hub, at least two related guides and one relevant review or comparison. Do not create thin country/keyword variations without a distinct question and evidence.

## Affiliate conversion rules

- Use one primary provider CTA per provider card plus contextual inline price/recommendation links.
- Make the visible price, plan term and destination clear; the affiliate landing page remains the source of truth for live pricing.
- Use Short.io slugs or sub-identifiers per cluster when available: `iran`, `russia`, `telegram`, `best-vpn`, `review`.
- Keep affiliate disclosure close to the first CTA and in the persistent editorial navigation on long pages.
- Never use an unauthorised coupon, fake expiry, incentive, pop-up/under ad, keyword-stuffed copy or irrelevant NordVPN placement.
- Audit country pages and educational pages before adding affiliate links; remove the link when the page context is not genuinely VPN selection or safety.

## QA and release sequence

For every page or template change:

1. `npm run lint` or targeted ESLint.
2. `npm run build` and sitemap generation.
3. Browser test at desktop and 390px mobile viewport.
4. Verify H1, title, canonical, disclosure, table headers, internal anchors and CTA destinations.
5. Verify affiliate links resolve to the intended Short.io slug and carry `sponsored nofollow`.
6. Deploy to Vercel preview, inspect, then promote production.
7. Record URL, query cluster, update date and baseline metrics in the execution log.

## Measurement targets

Review every two weeks by cluster:

- Organic CTR on pages with impressions: target 0.2% → 0.8%+.
- Keywords in positions 1–10 and 11–20.
- Search Console clicks to the hub and supporting pages.
- Affiliate clicks by page and Short.io slug.
- Affiliate conversion rate and EPC when available from the partner dashboard.
- Indexed/canonical/sitemap mismatch count.
- AI citations and referenced URLs as a separate authority metric.

## Definition of done for the next milestone

- Shared editorial template extracted and used on the Best VPN and Iran pages.
- First new Iran post published with evidence dossier, FAQ schema and compliant CTAs.
- At least five supporting cluster links live and reciprocal.
- Search Console baseline recorded before publishing and reviewed after 14 days.
- No affiliate links on pages that fail the NordVPN promotion-context audit.
- Deployment, browser QA and page-level compliance notes recorded.

## Baseline update: 11 August 2026

The screenshot-based baseline remains useful as historical context, but the current release gate now uses the authenticated Search Console baseline in [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md). The `/best/best-vpn` implementation is complete and live with the shared Tom's Guide-style shortlist, evidence table, contextual inline affiliate links and reciprocal cluster links. Matched Search Console, Short.io and partner exports must still be captured after the 14-day window so CTR, affiliate clicks, conversion rate and EPC are measured separately.

The machine-readable screenshot transcription is [zerotovpn-baseline-2026-08-11.json](../metrics/zerotovpn-baseline-2026-08-11.json). `npm run measure:editorial` now normalizes localized Search Console/Short.io CSV exports and writes a comparable report; the importer was verified with a local fixture and deliberately leaves conversions/EPC null until the partner dashboard export is joined.

The exit-intent popup remains enabled as an owned-media newsletter prompt. It contains only the newsletter form and a dismiss action; an editorial audit now fails if affiliate URLs, provider offers, coupons, discounts or incentives are added to that component. The global popup/sticky guards and restricted-context renderer are pushed in commits `2fde9fe` and `ee4e3f9`; the current GitHub-triggered production deployment is `dpl_A6DWyAC775mJe4ZwUzKLRc9b1ocW`.
