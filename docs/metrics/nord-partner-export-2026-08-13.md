# Nord partner export — matched reporting window

**Captured:** 13 August 2026  
**Dashboard:** Nord Security affiliate Performance Report  
**Reporting window:** **28 July–10 August 2026**  
**Raw export:** retained outside Git at `.cache/metrics/nord-partner-2026-08-13/partner.csv`

## Export contents

The dashboard was configured to include Offer, Offer URL, clicks, conversions, payout, date and EPC. Nord prefixes its CSV headers (`Offer.name`, `OfferUrl.name`, `Stat.clicks`, `Stat.conversions`, `Stat.payout`, `Stat.date`, `Stat.erpc`); the importer now normalizes these headers directly.

| Offer / offer URL | Date | Clicks | Conversions | Payout | EPC |
| --- | --- | ---: | ---: | ---: | ---: |
| NordVPN / Cyber 3y deal | 2026-08-10 | 1 | 0 | $0.00 | $0.00 |
| NordVPN Arabia / Default | 2026-08-10 | 1 | 0 | $0.00 | $0.00 |
| **Dated total** | 2026-08-10 | **2** | **0** | **$0.00** | **$0.00** |

The downloaded CSV also contained one unlabeled grand-total row. The importer ignores that row because it has no date or offer identity; otherwise the two dated rows would be double-counted and the window guard would fail closed.

## Measurement result and boundary

- `npm run measure:check-inputs` now reports `ready: true`; the partner window is `matched` with two dated rows.
- `npm run test:measure-editorial` passes, including a regression case for Nord's prefixed headers.
- The joined report is [post-14d-2026-08-13.json](./post-14d-2026-08-13.json). It records Search Console **93 clicks / 36,763 impressions**, Short.io **2,241 clicks / 1,791 human clicks**, and Nord partner **2 clicks / 0 conversions / $0 revenue / $0 EPC** for the shared window.
- This is a valid dated partner report, but it is not page-level attribution: its offer labels (`Cyber 3y deal`, `Default`) do not match the Short.io `nordvpn` slug or expose the originating page. Treat partner totals as diagnostic for this window, not as a page/cluster conversion ranking. The next 4–8 page selection therefore still needs an attribution-complete Short.io/partner join or a report with a shared sub-ID/link field.
