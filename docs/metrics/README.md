# Editorial measurement loop

The committed [historical baseline](./zerotovpn-baseline-2026-08-11.json) is a screenshot transcription, clearly marked as such. The earlier authenticated Search Console snapshot is [gsc-baseline-2026-08-11.md](./gsc-baseline-2026-08-11.md); the newer downloadable window is documented in [gsc-export-2026-08-12.md](./gsc-export-2026-08-12.md). The Short.io API export for that same window is documented in [shortio-export-2026-08-12.md](./shortio-export-2026-08-12.md).

Keep raw exports outside Git or in a local ignored folder and run:

```powershell
npm run measure:editorial -- `
  --label post-14d `
  --gsc-pages .cache/metrics/gsc-pages.csv `
  --gsc-queries .cache/metrics/gsc-queries.csv `
  --shortio .cache/metrics/shortio.csv `
  --partner .cache/metrics/nord-affiliate.csv `
  --baseline docs/metrics/gsc-baseline-2026-08-11.json `
  --out docs/metrics/post-14d-2026-08-25.json
```

Before running the importer, validate that the paths are real exports rather than fixtures:

```powershell
npm run measure:check-inputs -- `
  --gsc-pages .cache/metrics/gsc-pages.csv `
  --gsc-queries .cache/metrics/gsc-queries.csv `
  --shortio .cache/metrics/shortio.csv `
  --partner .cache/metrics/nord-affiliate.csv
```

The check rejects filenames containing `fixture`, `sample` or `example`, checks the header shape and requires a readable partner export before reporting `ready: true`. A missing partner export is intentional during the current pre-checkpoint state.

For the Short.io window, inject the production API key through Vercel without copying it into the shell or repository:

```powershell
npx vercel env run --environment=production -- `
  npm run export:shortio -- `
  --start 2026-07-28 --end 2026-08-10 `
  --out .cache/metrics/shortio-2026-08-12/clicks.csv `
  --json .cache/metrics/shortio-2026-08-12/details.json
```

The exporter records current-link totals plus domain-level totals and keeps wildcard/deleted paths separate. See [shortio-export-2026-08-12.md](./shortio-export-2026-08-12.md) for the attribution boundary.

The importer accepts localized or English headers for pages/queries, clicks, impressions, CTR, position, country and referrer, and detects comma-, semicolon- and tab-delimited exports. It also normalizes decimal commas such as `0,2%` without turning them into `2%`. The optional `--partner` export accepts conversions/sales, revenue/commission and EPC columns and writes them under `affiliate.partner`; if it is omitted, those fields remain `null`. Required GSC/Short.io paths now fail fast when omitted, and every report includes `dataQuality.rowCounts` plus an explicit `missingMetrics` list instead of silently treating missing inputs as zero. It writes normalized totals, top rows and deltas without inferring missing partner data.

Each report also includes `searchConsole.pages.byCluster` and `searchConsole.queries.byCluster` for the roadmap groups (`censorship`, `free-vpn`, `commercial-pillar`, `protocols`, `travel`, `other`). Short.io and partner rows are grouped under `affiliate.bySlug` and `affiliate.partner.bySlug`; use these for cluster-specific review when links have dedicated slugs, while treating an aggregate provider slug as diagnostic rather than page attribution.

Run the importer regression suite before using a new export format:

```powershell
npm run test:measure-editorial
npm run test:measurement-inputs
```

Run the page-level release gate against the current English commercial/cluster pages and homepage hub:

```powershell
npm run audit:editorial-live
```

This checks title/description, complete Open Graph and Twitter card metadata, a reachable image URL for those cards, canonical/indexability, one H1, disclosure, methodology, tables where the page type requires them, FAQ schema, required section anchors, internal links, affiliate `sponsored nofollow` attributes, image alt/dimension hygiene and future structured-data dates. Card-based pages such as `/best/free-vpn` explicitly opt out of the table check because their free-tier comparison is represented as structured cards.

Non-homepage commercial and cluster targets must also expose a freshness signal: a visible updated/reviewed label or `dateModified` structured-data field.

Required comparison discipline:

- Keep the same Search Console property, search type, country/device filters and date-window length.
- Compare page and query exports separately; do not treat visible screenshot rows as complete tables.
- Keep Short.io and partner-dashboard windows aligned.
- Report clicks, human clicks, conversions, conversion rate and EPC as separate fields.
- First-party affiliate click beacons now include `vpnId`, `affiliateSlug` (the `go.zerotovpn.com/<slug>` path), page and referrer. Treat this as diagnostic telemetry; Short.io remains the source of truth for redirect clicks and the partner dashboard remains the source of truth for conversions and EPC.

## Sitemap health audit

The live sitemap audit checks every sitemap URL for a 200 response, self-canonical, indexable robots state and exactly one H1:

```powershell
npm run audit:sitemap
```

Use `AUDIT_CONCURRENCY=4` to lower request pressure or `AUDIT_LIMIT=100` for a smoke run. The report is written to `docs/metrics/sitemap-audit-YYYY-MM-DD.{json,md}`. A URL with a 200 response can still be a sitemap error when it is `noindex`; fix the sitemap generator or the page metadata rather than counting it as indexed.

## Affiliate context audit

The affiliate context audit fetches every URL in the live sitemap and checks affiliate-link rel attributes, disclosure text, and review flags for coupon/incentive or interruptive-promotion markers. The site may show an owned newsletter consent prompt, but it must not contain a provider, coupon, discount or affiliate CTA:

```powershell
npm run audit:affiliate-context
```

Use `AFFILIATE_AUDIT_CONCURRENCY=8` to lower request pressure or `AFFILIATE_AUDIT_LIMIT=100` for a smoke run. Promotion terms are manual-review flags because an editorial policy page may mention prohibited techniques while explaining them; missing `sponsored`/`nofollow` is an actionable technical failure.

The current flag classifications and release gate are recorded in [affiliate-context-review-2026-08-11.md](./affiliate-context-review-2026-08-11.md). Treat an unclassified flag as a reason to remove the affiliate destination before publishing.

## Current measurement checkpoint — 12 August 2026

The production release gates were rerun after the cluster-template work: the live editorial target set is **22/22** with **127** compliant affiliate links and zero content-brief, metadata, freshness, image, disclosure, rel, slug or cluster-link failures. The sitemap remains **2,279/2,279** healthy URLs, and the affiliate-context scan reports **1,755 affiliate pages / 8,189 links** with zero missing disclosure, rel, interruptive-promotion or fetch failures. These checks validate release quality; they are not traffic or revenue evidence.

The exact matched-window contract is machine-readable in [measurement-window-manifest-2026-08-12.json](./measurement-window-manifest-2026-08-12.json) and summarized in [measurement-window-manifest-2026-08-12.md](./measurement-window-manifest-2026-08-12.md). It supersedes earlier interim wording that predated the authenticated GSC and Short.io exports; the Nord partner export is still the only missing gate input.

`measure:editorial` now records the shared window when called with paired `--window-start` and `--window-end` flags and rejects malformed or reversed dates. This prevents a valid-looking report from losing its period when the partner export is joined later.

Real Search Console Pages/Queries exports and a real Short.io API export now exist for **28 July–10 August 2026**; see [gsc-export-2026-08-12.md](./gsc-export-2026-08-12.md), [shortio-export-2026-08-12.md](./shortio-export-2026-08-12.md) and the interim join [measurement-interim-2026-08-12.md](./measurement-interim-2026-08-12.md). The partner conversion/revenue/EPC export is still absent, and Short.io has a documented wildcard/deleted residual that is not attributed to pages. `measure:check-inputs` therefore correctly remains `ready: false`; keep the next 4–8 page selection paused until the partner export and an attribution-complete Short.io join are available. The planned comparison checkpoint remains **25 August 2026**.
