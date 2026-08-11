# Editorial measurement loop

The committed [baseline](./zerotovpn-baseline-2026-08-11.json) is a screenshot transcription, clearly marked as such. It is useful for planning but is not a Search Console or partner-dashboard export.

When the next exports are available, keep the raw files outside Git or in a local ignored folder and run:

```powershell
npm run measure:editorial -- `
  --label post-14d `
  --gsc-pages .cache/metrics/gsc-pages.csv `
  --gsc-queries .cache/metrics/gsc-queries.csv `
  --shortio .cache/metrics/shortio.csv `
  --baseline docs/metrics/zerotovpn-baseline-2026-08-11.json `
  --out docs/metrics/post-14d-2026-08-25.json
```

The importer accepts localized or English headers for pages/queries, clicks, impressions, CTR, position, country and referrer. It writes normalized totals, top rows and deltas. It does not infer conversions or EPC; those must be joined from the partner dashboard and recorded separately.

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
