# ZeroToVPN performance baseline and next-pillar gate

Captured from the Search Console, AI-visibility and Short.io screenshots supplied in the ZeroToVPN project thread in August 2026. This is a planning baseline, not a direct API export; replace the screenshot values with an exported CSV before making a statistical claim.

## Current baseline

### Search Console, last three months shown in the screenshot

| Metric | Baseline |
|---|---:|
| Clicks | 394 |
| Impressions | 183,000 |
| Average CTR | 0.2% |
| Average position | 32.5 |
| Window shown | 9 May–7 August 2026 |

The low CTR paired with high impressions is the clearest near-term opportunity. The priority is improving titles, first-viewport answers and eligible FAQ/structured context on pages already receiving impressions, not creating many new URLs.

### Pages to protect and improve

| URL | Clicks | Impressions | Position | Readout | Priority |
|---|---:|---:|---:|---|---|
| `/` | 30 | 1,409 | 15.0 | Commercial hub is close enough to page one to justify a conversion and snippet pass. | P0 |
| `/blog/best-vpn-for-iran-2026-bypass-internet-censorship` | 24 | 12,034 | 9.0 | Strong visibility, weak CTR; protect the evidence-led refresh and test title/FAQ wording. | P0 |
| `/countries/russia` | 13 | 4,596 | 22.3 | Supporting country page needs authority and internal-link time. | P1 |
| `/blog/best-vpn-for-telegram-2026` | 10 | 2,858 | 9.9 | Near-page-one use-case page; measure CTA and snippet changes separately. | P0 |

Visible query examples include `free vpn`, `russia vpn` and a Korean VPN query. Do not infer a single language or market strategy from three rows; export the full query/page table before changing locale priorities.

### Indexing and authority context

- Search Console showed 6.74K indexed pages and 7.33K not indexed pages.
- The submitted sitemap showed 2,285 discovered URLs. Google can discover URLs through internal links, external links, redirects or historical crawl data without those URLs appearing in the submitted sitemap count.
- The authority screenshot showed DR 0.4, UR 5, about 1.4K backlinks and 593 referring domains. Treat these as third-party directional metrics, not Search Console truth.

### Affiliate baseline: NordVPN Short.io link

The supplied last-30-day screenshot showed 341 total clicks and 286 human clicks. China represented 134 clicks, followed by the Netherlands (11), United States (10), Iran (8) and Germany (8). Referrer data showed 207 unknown and 78 from `go.zerotovpn.com`.

This is a useful distribution signal, not a conversion baseline. For the next review, export clicks by slug, page, country, device and date, then join them to the partner dashboard's conversions/EPC. Never treat a click as a sale.

## Next commercial pillar: `/best/best-vpn`

The best-overall page is the next pillar because it already receives homepage-level visibility, links naturally to every provider review and can distribute authority to the Iran, Telegram, Russia, China and protocol clusters. Before expanding the URL set, refresh the page's evidence and conversion layer.

### Release gate for the pillar

1. Replace or qualify stale claims such as `35+ VPNs`, `500+ speed tests`, `up to 6,730 Mbps`, `118 countries`, exact speed-loss percentages and universal legal statements unless each has a dated source or reproducible test record.
2. Keep the Tom's Guide-inspired top-three overview, but add “best for”, “skip if”, current plan term, clickable price, review link and one compliant primary CTA per provider.
3. Add a short methodology block before the first long ranking section, with test date, device/network scope and a clear distinction between first-party tests and provider claims.
4. Add reciprocal links to `/guides/vpn-protocols-explained`, Iran, Telegram, Russia and China pages where the reader's decision actually needs that context.
5. Retain one FAQ block with answers drawn from Search Console/PAA data; avoid guaranteed speed, access or legality language.
6. Run `npm run audit:editorial`, targeted ESLint, production build, desktop/390px browser QA and affiliate-destination checks before release.

## Two-week measurement plan

| Gate | Before release | After 14 days |
|---|---|---|
| Search Console | Export page/query clicks, impressions, CTR and position for `/`, Iran, Telegram, Russia, China and `/best/best-vpn`. | Compare same date range; record deltas by page and query cluster. |
| Affiliate | Export Short.io clicks by slug/page/country/device and partner conversions/EPC. | Compare human clicks, conversion rate and EPC; flag unexplained country spikes. |
| Technical SEO | Verify canonical, sitemap inclusion, indexability, one H1, FAQ schema and no horizontal overflow. | Recheck URL inspection/indexing status and sitemap discovered count. |
| Editorial compliance | Confirm disclosure appears before the first CTA and all affiliate links carry `sponsored nofollow`. | Re-run audit after any copy or offer change. |
| AI visibility | Record cited URLs/responses only as a separate authority signal. | Compare cited pages, not just response counts. |

## Decision rule

If the refreshed pillar gains impressions but CTR stays below 0.5%, iterate title, description, opening answer and FAQ wording before publishing more supporting pages. If CTR improves but affiliate clicks do not, inspect CTA placement, price clarity, destination slug and page intent. If both improve, expand one supporting cluster at a time and keep the same evidence/compliance template.
