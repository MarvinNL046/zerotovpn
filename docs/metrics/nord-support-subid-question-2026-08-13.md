# Nord support question — forwarded affiliate sub-ID

**Status:** draft only; not sent.  
**Purpose:** ask Nord Security which report/API field exposes the `aff_sub` value forwarded by ZeroToVPN so page-level conversion attribution can be joined safely.

## Draft message

Hello Nord Partners team,

We are using the NordVPN offer through the approved affiliate link and have added a deterministic TUNE sub-ID to the offer URL for page-level measurement:

`aff_sub=zt_<locale>-<public-page-slug>`

In the authenticated Performance Report for **13 August 2026** (Amsterdam timezone), the NordVPN / Cyber 3y deal row shows:

- 2 clicks
- 0 conversions
- $0.00 payout
- $0.00 EPC

I exported the report twice. The first export selected **Sub ID 1**. The follow-up export explicitly selected both **Sub ID 1** and **Advertiser Sub ID 1**. The CSV headers are `Stat.affiliate_info1` and `Stat.adv_sub1`, but both values are blank on the dated row.

Could you confirm:

1. Which Performance Report column or API field returns a forwarded TUNE `aff_sub` value for this offer?
2. Whether `aff_sub` is supported for offer 15 / offer URL 902 and whether it is retained on click or conversion?
3. Whether any advertiser/network setting must be enabled before the value is returned?
4. Whether there is a recommended test URL or report filter that can verify the value without generating a self-referral or a subscription?

We are not trying to attribute our own subscription. We only need the field name and a compliant way to join partner rows to public page slugs. We will keep the current redirect contract unchanged until you confirm the correct field.

Best regards,  
Marvin  
ZeroToVPN

## Evidence retained locally

- `docs/metrics/nord-partner-postrollout-2026-08-13.md`
- `.cache/metrics/nord-partner-2026-08-13/partner-2026-08-13-subid1-advid1.csv` (ignored by Git)
- `docs/metrics/nord-aff-sub-live-smoke-2026-08-13.md`

Do not attach the signed dashboard download URL or any account credential to a public issue. Use the affiliate support channel inside the authenticated dashboard.
