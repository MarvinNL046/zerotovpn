# Editorial measurement loop

The committed [historical baseline](./zerotovpn-baseline-2026-08-11.json) is a screenshot transcription, clearly marked as such. The current authenticated Search Console snapshot is [gsc-baseline-2026-08-11.md](./gsc-baseline-2026-08-11.md); it covers 10 May–9 August 2026 with Search type Web and no active filters. It is stronger than the screenshot transcription but is still a UI snapshot, not a downloadable API export.

When the next exports are available, keep the raw files outside Git or in a local ignored folder and run:

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

The importer accepts localized or English headers for pages/queries, clicks, impressions, CTR, position, country and referrer, and detects comma-, semicolon- and tab-delimited exports. It also normalizes decimal commas such as `0,2%` without turning them into `2%`. The optional `--partner` export accepts conversions/sales, revenue/commission and EPC columns and writes them under `affiliate.partner`; if it is omitted, those fields remain `null`. Required GSC/Short.io paths now fail fast when omitted, and every report includes `dataQuality.rowCounts` plus an explicit `missingMetrics` list instead of silently treating missing inputs as zero. It writes normalized totals, top rows and deltas without inferring missing partner data.

Run the importer regression suite before using a new export format:

```powershell
npm run test:measure-editorial
```

Required comparison discipline:

- Keep the same Search Console property, search type, country/device filters and date-window length.
- Compare page and query exports separately; do not treat visible screenshot rows as complete tables.
- Keep Short.io and partner-dashboard windows aligned.
- Report clicks, human clicks, conversions, conversion rate and EPC as separate fields.

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
