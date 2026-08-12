# Interim 14-day measurement — 12 August 2026

This is the first machine-generated join of real Search Console exports and real Short.io API data for **28 July–10 August 2026**.

## Inputs

- Search Console Pages CSV: `.cache/metrics/gsc-2026-08-12/Pages.csv` (1,000 exported rows)
- Search Console Queries CSV: `.cache/metrics/gsc-2026-08-12/Queries.csv` (1,000 exported rows)
- Short.io current-link CSV: `.cache/metrics/shortio-2026-08-12/clicks.csv` (39 current links)
- Partner export: **not provided**
- Machine report: [measurement-interim-2026-08-12.json](./measurement-interim-2026-08-12.json)

## Joined observations

| Source | Metric | Value |
| --- | --- | ---: |
| Search Console Pages export | clicks in downloaded rows | 93 |
| Search Console Pages export | impressions in downloaded rows | 37,217 |
| Search Console Pages export | average position (row-impression weighted) | 34.19 |
| Short.io current-link export | clicks | 2,241 |
| Short.io current-link export | human clicks | 1,791 |

For the authoritative Search Console period totals, use [gsc-export-2026-08-12.md](./gsc-export-2026-08-12.md): `Chart.csv` reports 36,763 impressions and position 33.42. The page/query downloads are top-1,000 tables and are not interchangeable with the chart total.

## Gate status

`npm run measure:check-inputs` now accepts both real GSC files and the real Short.io CSV. The command correctly remains `ready: false` because there is no partner export. Conversions, revenue, EPC and conversion rate are therefore `null`; no affiliate outcome is inferred from clicks.

The Short.io export also documents a **5,422-click / 1,217-human-click** residual at domain level from wildcard/deleted paths. Those clicks remain unattributed and are excluded from page-selection decisions until a stable path/sub-ID export is available.
