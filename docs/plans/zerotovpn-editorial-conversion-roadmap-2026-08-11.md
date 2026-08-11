# ZeroToVPN editorial, SEO & affiliate conversion roadmap

**Version:** 1.0 — 11 August 2026  
**Scope:** editorial templates, topical authority, organic CTR and compliant affiliate conversion  
**Primary references:**

- `C:\Users\M_Smi\Projecten\obsidian-vault\On-page SEO — 80+ Point Checklist.md`
- `C:\Projecten\zerotovpn\docs\research\tomsguide-best-vpn-page-analysis-2026-08-11.md`
- `C:\Projecten\zerotovpn\docs\plans\zerotovpn-masterplan-2026.md`

## Execution log

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
- No popups, fake urgency, keyword stuffing, doorway pages, unauthorised coupons or irrelevant provider promotion.

## Content production plan

### Phase 1 — Template and measurement (week 1)

- Extract a shared `BestVpnEditorialTemplate` from the current Best VPN page.
- Make quick picks, price links, provider dossiers, tables, disclosures, FAQs and related links reusable props.
- Add a page-level content brief type: `primaryKeyword`, `intent`, `cluster`, `lastReviewedAt`, `evidence`, `affiliateContext`, `schemaType`.
- Add automated checks for missing disclosure, missing methodology link, missing canonical metadata and affiliate links without `sponsored nofollow`. The initial six-file gate now runs as `npm run audit:editorial`.
- Create a Search Console baseline for the existing Best VPN, Iran, Russia and Telegram pages. The screenshot-based baseline is documented in [zerotovpn-performance-baseline-2026-08-11.md](./zerotovpn-performance-baseline-2026-08-11.md); replace it with CSV/API exports before statistical reporting.

### Phase 2 — Upgrade existing winners (weeks 2–3)

Prioritise pages that already have impressions but weak CTR or positions 11–40:

1. Best VPN for Iran — primary censorship hub.
2. Best VPN for Telegram — supporting censorship/use-case page.
3. Best VPN for Russia — country cluster expansion.
4. Best VPN for China — evidence-led country page.
5. Best VPN overall — commercial pillar and internal-link hub.

For each page, improve the first viewport, the comparison table, provider card structure, inline affiliate price links, internal anchors, FAQ answers and freshness metadata before creating new URLs.

### Phase 3 — First new editorial post (week 4)

Recommended post:

**“Best VPN for Iran in 2026: tested options for censorship, privacy and safer travel”**

Why this first:

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

Use DataForSEO and Search Console gaps to select 4–8 pages only after the hub brief is approved. Candidate supporting pages:

- VPN obfuscation explained.
- How to use a VPN on restricted networks.
- Best VPN for Telegram calls and media.
- VPN protocols for censorship resistance.
- Is using a VPN legal when travelling?
- Best VPN for China, with evidence date and limitations.

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

The screenshot-based baseline and next release gate now live in [zerotovpn-performance-baseline-2026-08-11.md](./zerotovpn-performance-baseline-2026-08-11.md). The next implementation target is `/best/best-vpn`: first remove or qualify stale test, speed, coverage and legal/access claims; then apply the shared Tom's Guide-style shortlist, evidence table, contextual inline affiliate links and reciprocal cluster links. Search Console and Short.io exports must be captured before release and again after 14 days so CTR, affiliate clicks, conversion rate and EPC are measured separately.
