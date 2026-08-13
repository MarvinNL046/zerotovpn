# Nord partner export handoff

Status: the dated export was captured and the windowed measurement gate now passes. The remaining limitation is page-level attribution: the Nord report exposes offer/offer-URL labels, but no shared Short.io slug or page sub-ID.

## Captured export

- Dashboard period: **28 July 2026 – 10 August 2026**
- Captured file (ignored raw input): `.cache/metrics/nord-partner-2026-08-13/partner.csv`
- Sanitized evidence: [nord-partner-export-2026-08-13.md](nord-partner-export-2026-08-13.md)
- Result: **2 clicks, 0 conversions, $0 payout, $0 EPC**
- Current next input: a shared Short.io slug, publisher sub-ID, or equivalent page-level field in the Nord export.

## Required window

- Start: **2026-07-28**
- End: **2026-08-10**
- Use the dashboard account's reporting timezone and record it with the file.
- Export the filtered performance/conversion report as CSV or UTF-8 text. A screenshot or an aggregate offer summary is not sufficient because it cannot be joined to the Search Console and Short.io dates.

## Required fields

The importer accepts localized header names, but every row must provide:

| Meaning | Accepted header examples |
| --- | --- |
| Dated row | `date`, `datum`, `created_at` |
| Offer/link | `link`, `short_url`, `url`, `offer` |
| Clicks | `clicks`, `kliks`, `total_clicks` |
| Conversions | `conversions`, `sales`, `orders`, `transactions` |
| Payout/revenue | `revenue`, `commission`, `earnings`, `payout`, `total_revenue` |
| EPC | `epc`, `earnings_per_click`, `revenue_per_click` |
| Page placement (new rollout) | `aff_sub`, `aff_sub1`, `sub_id`, `subid`, `affiliate_sub_id` |

Rows without a dated field are rejected for a windowed report. Rows outside 28 July–10 August are rejected rather than silently trimmed. The script also rejects fixture/sample/example paths.

For page-level attribution, retain the returned `aff_sub` value exactly. Production clicks use the format `zt_<public-page-slug>`; do not decode or replace it during export.

## Verification command

Save the export outside Git (for example, `.cache/metrics/nord-partner-2026-08-13/partner.csv`) and run:

```powershell
npm run measure:check-inputs -- `
  --window-start 2026-07-28 --window-end 2026-08-10 `
  --gsc-pages .cache/metrics/gsc-2026-08-12/Pages.csv `
  --gsc-queries .cache/metrics/gsc-2026-08-12/Queries.csv `
  --gsc-chart .cache/metrics/gsc-2026-08-12/Chart.csv `
  --shortio .cache/metrics/shortio-2026-08-12/clicks.csv `
  --partner .cache/metrics/nord-partner-2026-08-13/partner.csv
```

The command must report `ready: true`, with the partner row marked `ready` and its date window marked `matched`. Then run the regression suite and produce the joined report:

```powershell
npm run test:measure-editorial
npm run measure:editorial -- `
  --label post-14d-2026-08-13 `
  --window-start 2026-07-28 --window-end 2026-08-10 `
  --gsc-pages .cache/metrics/gsc-2026-08-12/Pages.csv `
  --gsc-queries .cache/metrics/gsc-2026-08-12/Queries.csv `
  --gsc-chart .cache/metrics/gsc-2026-08-12/Chart.csv `
  --shortio .cache/metrics/shortio-2026-08-12/clicks.csv `
  --partner .cache/metrics/nord-partner-2026-08-13/partner.csv `
  --out docs/metrics/post-14d-2026-08-13.json
```

Review `dataQuality.partnerWindow`, `affiliate.partner.totals` and `affiliate.partner.bySlug` before selecting the next 4–8 pages. Do not commit the raw partner export or any credentials; commit only the sanitized report and a provenance note.
