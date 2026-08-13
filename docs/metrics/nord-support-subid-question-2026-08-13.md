# Nord support question — forwarded affiliate sub-ID

**Status:** draft only; not sent.  
**Purpose:** ask Nord Security whether offer 15 / URL 902 retains the already-identified `aff_sub` value in `Stat.affiliate_info1` so page-level conversion attribution can be joined safely.

## Field mapping already confirmed

TUNE documents `aff_sub` as Publisher sub ID 1 and `Stat.affiliate_info1` as the corresponding stats field. Nord's authenticated Performance Report exposes those as **Sub ID 1** and **Advertiser Sub ID 1**. The open question is retention/propagation for this offer, not which column name to select. See [the field audit](nord-tune-subid-field-audit-2026-08-13.md).

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

1. Is forwarded `aff_sub` supported and retained in `Stat.affiliate_info1` for offer 15 / offer URL 902 on click and conversion?
2. Could a propagation delay, report aggregation rule or offer-level setting explain a blank Sub ID 1 value on the 13 August row?
3. Is there a recommended test URL, report/API endpoint or filter that can verify the value without generating a self-referral or subscription?

We are not trying to attribute our own subscription. We only need a compliant way to verify retention and join partner rows to public page slugs. We will keep the current redirect contract unchanged until you confirm the offer behaviour.

Best regards,  
Marvin  
ZeroToVPN

## Evidence retained locally

- `docs/metrics/nord-partner-postrollout-2026-08-13.md`
- `.cache/metrics/nord-partner-2026-08-13/partner-2026-08-13-subid1-advid1.csv` (ignored by Git)
- `docs/metrics/nord-aff-sub-live-smoke-2026-08-13.md`

Do not attach the signed dashboard download URL or any account credential to a public issue. Use the affiliate support channel inside the authenticated dashboard.

## API route discovered in authenticated dashboard

The Nord publisher dashboard exposes **Tools -> APIs -> API V3** and links to TUNE's affiliate API documentation. It states that an API key is required and offers a **Request API Key** action. No key was requested or stored during this audit because that action changes account state and could issue a credential. If the key is approved, query the performance endpoint with the same date/offer filters and inspect whether `Stat.affiliate_info1` (or an equivalent sub-ID field) is returned even when the dashboard grid is blank.

The repository now contains a credential-safe scaffold for that check:

```powershell
npm run nord:api-smoke -- --start 2026-07-28 --end 2026-08-13
```

It reads `TUNE_NETWORK_ID` and `TUNE_AFFILIATE_API_KEY` only from `.env.local`, never prints the key, requests the stats fields needed for the attribution join and reports only returned sub-ID values. TUNE's official `Affiliate_Report::getStats` documentation identifies `Stat.affiliate_info1` as affiliate sub 1 and supports date-window parameters.
