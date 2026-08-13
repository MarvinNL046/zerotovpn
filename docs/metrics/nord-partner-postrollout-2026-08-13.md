# Nord partner post-rollout observation — 13 August 2026

**Observed:** 13 August 2026 from the authenticated Nord Security Performance Report  
**Dashboard period:** **13 August 2026 – 13 August 2026**  
**Dashboard timezone:** `(GMT +02:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna`  
**Report fields:** Offer, Offer URL, **Sub ID 1**, impressions, conversions, clicks, payout, date, CTR, CR and EPC

## Export result

The downloaded CSV was saved locally at `.cache/metrics/nord-partner-2026-08-13/partner-2026-08-13-subid1.csv` and is ignored by Git. Nord prefixes the selected sub-ID field as `Stat.affiliate_info1`.

| Offer / offer URL | Sub ID 1 | Date | Clicks | Conversions | Payout | EPC |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| NordVPN / Cyber 3y deal | *(blank)* | 2026-08-13 | 2 | 0 | $0.00 | $0.00 |

The CSV also contains one unlabeled aggregate row. It is excluded by the importer so the dated offer row is not double-counted.

## Short.io cross-check

The authenticated Short.io exporter was run for the UTC window **12–13 August 2026** (the closest safe comparison to Nord's Europe/Amsterdam day). It returned **126 current-link clicks / 109 human clicks** overall and **13 clicks / 11 human clicks** for `https://go.zerotovpn.com/nordvpn`. A separate 13-August-UTC-only request returned **0** for that link. The exact day boundary therefore matters, and the Short.io export is current-link-only rather than an account-wide Nord report.

This shows that ZeroToVPN traffic existed around the post-rollout period, but it does not identify which of Nord's two aggregate offer clicks came from the site. The Short.io raw exports remain in the ignored `.cache/metrics/shortio-2026-08-12-13/` and `.cache/metrics/shortio-2026-08-13/` directories; a rate-limited exploratory request was not used as evidence.

## Attribution boundary

This is the first real Nord export queried after the page-sub-ID rollout was deployed, but the two clicks do **not** expose a returned sub-ID. The report is an account/offer aggregate and does not identify whether either click originated on ZeroToVPN, so it cannot prove whether the clicks occurred before the deployment reached a visitor, whether Nord records the value under another field, or whether the network dashboard omits it from this report. It cannot be joined to an editorial page and does not close the roadmap conversion gate.

The importer now accepts Nord's UI/API spelling (`Stat.affiliate_info1`, plus the `Stat.adv_sub1` and direct `aff_sub` variants) and groups non-empty values under `affiliate.partner.bySubId`. The current export correctly produces no page-level group because `Sub ID 1` is blank.

## Next measurement action

Keep the existing `aff_sub=zt_<public-page-slug>` implementation live. Capture another dated export after fresh production clicks have had time to settle, retaining **Sub ID 1** and **Advertiser Sub ID 1** in the report fields. If both remain blank, ask Nord support which report/API field exposes the affiliate sub-ID before changing the redirect contract.

## Follow-up export — both sub-ID fields selected

The report was re-run in the authenticated dashboard for the same **13 August 2026** period with both **Sub ID 1** and **Advertiser Sub ID 1** selected. The dashboard showed **2 clicks, 0 conversions, $0.00 payout and $0.00 EPC** for `NordVPN / Cyber 3y deal`. Both sub-ID cells were blank:

| Offer / offer URL | Sub ID 1 | Advertiser Sub ID 1 | Date | Clicks | Conversions | Payout | EPC |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| NordVPN / Cyber 3y deal | *(blank)* | *(blank)* | 2026-08-13 | 2 | 0 | $0.00 | $0.00 |

The raw CSV is retained locally at `.cache/metrics/nord-partner-2026-08-13/partner-2026-08-13-subid1-advid1.csv` (ignored by Git). Its headers are `Stat.affiliate_info1` and `Stat.adv_sub1`, confirming that both requested fields were present in the export rather than omitted from the report. This rules out the earlier narrow explanation that only Sub ID 1 had been selected; it still does not identify the source page of either click.

The importer field probe records the same distinction under `affiliate.partner.subIdFields`: `stat_affiliate_info1` and `stat_adv_sub1` are both present with `populatedRows: 0`. The probe is diagnostic only and is not used as a matched-window KPI report.

**Measurement decision:** page-level Nord attribution remains open. The next safe action is a support question to Nord asking which Performance Report/API field exposes forwarded `aff_sub`/TUNE sub IDs, while keeping the live redirect contract unchanged.
## User-provided dashboard cross-check: 6-12 August 2026

A separate screenshot of the authenticated Performance Report shows the broader offer summary for **6 August 2026 - 12 August 2026**: NordVPN **15 clicks**, NordVPN China **2**, NordVPN Arabia **2**, for **19 total clicks**, **0 conversions**, **$0.00 payout** and **$0.00 EPC**. This is an account-level retention signal only; it is not a page-level join and is not mixed into the dated KPI files or the 13 August probe.

## Authenticated dashboard recheck: 13 August 2026

The current authenticated Performance Report view now defaults to **1 January 2007 - 13 August 2026** and shows **25 aggregate clicks**: NordVPN **21**, NordVPN China **2** and NordVPN Arabia **2**. Conversions remain **0**, payout **$0.00** and EPC **$0.00**. Opening the NordVPN offer detail does not expose a populated sub-ID field in the visible report. This confirms additional account-level activity since the 19-click screenshot, but it still cannot be joined to a ZeroToVPN page or attributed to the current `aff_sub` rollout.
