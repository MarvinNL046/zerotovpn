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

## Attribution boundary

This is the first real Nord export queried after the page-sub-ID rollout was deployed, but the two clicks do **not** expose a returned sub-ID. The report therefore does not yet prove whether the clicks occurred before the deployment reached the visitor, whether Nord records the value under another field, or whether the network dashboard omits it from this report. It cannot be joined to an editorial page and does not close the roadmap conversion gate.

The importer now accepts Nord's UI/API spelling (`Stat.affiliate_info1`, plus the `Stat.adv_sub1` and direct `aff_sub` variants) and groups non-empty values under `affiliate.partner.bySubId`. The current export correctly produces no page-level group because `Sub ID 1` is blank.

## Next measurement action

Keep the existing `aff_sub=zt_<public-page-slug>` implementation live. Capture another dated export after fresh production clicks have had time to settle, retaining **Sub ID 1** and **Advertiser Sub ID 1** in the report fields. If both remain blank, ask Nord support which report/API field exposes the affiliate sub-ID before changing the redirect contract.

