# Short.io API export — 12 August 2026

This report records a read-only API export from the production Short.io workspace for `go.zerotovpn.com`.

## Scope and provenance

- Domain: `go.zerotovpn.com` (Short.io domain ID `1577582`)
- Date range: **28 July 2026 – 10 August 2026**
- Time zone: UTC
- Source: Short.io Statistics API, authenticated with the production `SHORTIO_API_KEY` already stored in Vercel
- Secret handling: the key was injected through `vercel env run`; it was never printed, committed or written to the report
- Raw API details: `.cache/metrics/shortio-2026-08-12/details.json` (ignored)
- Measurement CSV: `.cache/metrics/shortio-2026-08-12/clicks.csv` (ignored)
- Export command: `scripts/export-shortio-metrics.mjs`

## Domain-level totals

| Metric | Value |
| --- | ---: |
| Total clicks | **7,663** |
| Human clicks | **3,008** |
| Human-click rate | **39.25%** |

The domain endpoint is the authoritative total for the window. The popular-path endpoint also returned the wildcard path `/*`, which cannot be safely attributed to an editorial page or current provider link.

## Current-link attribution export

The per-link CSV contains **39 current links** and joins cleanly to the measurement importer:

| Metric | Value |
| --- | ---: |
| Current-link clicks | **2,241** |
| Current-link human clicks | **1,791** |
| Unattributed residual versus domain total | **5,422 clicks / 1,217 human clicks** |

The residual is intentionally not allocated to pages or providers. It includes wildcard/deleted or otherwise non-current paths. This means the CSV is a real export but is not yet a complete attribution dataset for page selection.

## Top current provider links

| Short.io slug | Clicks | Human clicks |
| --- | ---: | ---: |
| `protonvpn` | 710 | 674 |
| `surfshark` | 266 | 244 |
| `nordvpn` | 225 | 193 |
| `windscribe` | 167 | 157 |
| `expressvpn` | 113 | 95 |
| `tunnelbear` | 89 | 70 |
| `cyberghost` | 66 | 49 |
| `private-internet-access` | 37 | 26 |
| `mullvad` | 26 | 14 |

## Popular paths (separate, not joined)

The API's popular-path view returned `/*` (1,325), `/protonvpn` (577), `/surfshark` (235), `/nordvpn` (173), `/windscribe` (129), `/expressvpn` (93), `/` (79), `/tunnelbear` (59), `/cyberghost` (41), `/private-internet-access` (18) and `/mullvad` (7). These scores are retained as a diagnostic view only because they do not reconcile one-to-one with the per-link totals and do not include page attribution.

## Interpretation boundary

This closes the “real Short.io export exists” part of the measurement work, but not the full conversion gate. The importer can now join Search Console rows to current Short.io slugs; it must keep residual wildcard/deleted traffic separate. Partner conversions, revenue and EPC are still absent and must remain `null` rather than inferred from clicks.
