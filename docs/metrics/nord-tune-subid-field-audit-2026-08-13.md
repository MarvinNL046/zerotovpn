# Nord/TUNE affiliate sub-ID field audit

**Date:** 13 August 2026  
**Scope:** identify the authoritative field for the `aff_sub` value forwarded by ZeroToVPN; do not infer page attribution from aggregate clicks.

## Authoritative mapping

- TUNE's partner-tracking documentation defines `aff_sub` as **Publisher sub ID 1**: [Customizing a Partner Tracking Link](https://support.tune.com/hc/en-us/articles/1500005236722-Customizing-a-Partner-Tracking-Link).
- TUNE's `OfferUrl` model confirms that `{aff_sub}` is the affiliate sub-ID passed in through a tracking link: [OfferUrl model](https://developers.tune.com/network-models/offerurl/).
- TUNE's affiliate stats model names the report field **`Stat.affiliate_info1`** and describes it as the affiliate sub 1 passed when the session was started: [StatReport model](https://developers.tune.com/affiliate-models/statreport/) and [Affiliate_Report::getStats](https://developers.tune.com/affiliate/affiliate_report-getstats/).
- The authenticated Nord Performance Report UI exposes the same mapping as **Sub ID 1** and **Advertiser Sub ID 1**. The 13 August row for NordVPN offer 15 / URL 902 had both columns selected, but both cells were blank.

## Current observation

The 13 August Nord row showed **2 clicks, 0 conversions, $0.00 payout and $0.00 EPC**. The blank `Stat.affiliate_info1` value proves that the report field was selected and empty; it does not prove that the two clicks came through a ZeroToVPN page URL. The production redirect and Short.io smoke already show that `aff_sub=zt_<public-page-slug>` is forwarded to TUNE.

## Decision

The field-name question is resolved: use `Stat.affiliate_info1` / Nord UI **Sub ID 1**. The remaining gate is **retention and join validation** for offer 15 / URL 902: a fresh non-self click from a known page must appear in the Nord report with its `zt_<public-page-slug>` value. Until that happens, do not rank the first 4–8 pages by Nord EPC or conversion rate.

## Next support question

Ask Nord whether offer 15 / URL 902 retains `aff_sub` in `Stat.affiliate_info1` for clicks and conversions, whether there is a propagation delay or offer-level setting, and which report/API endpoint is recommended for validating a test click without a self-referral or subscription. The existing draft is retained at [nord-support-subid-question-2026-08-13.md](nord-support-subid-question-2026-08-13.md).
