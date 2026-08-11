# China VPN editorial brief - 11 August 2026

## Search and intent signals

The cached US/English DataForSEO pass is in `dataforseo-china-cluster-2026-08-11.{json,md}`. It returned five keyword overview rows, 47 deduplicated suggestions, five SERP samples and 19 competitor domains.

The largest suggestion signals in this pass were `vpn and china` / `vpn inside china` (8,100), `express vpn from china` (4,400), and `vpn best for china` (2,900). These are prioritisation signals, not proof of current demand or provider access. PAA intent covers current providers, legality for visitors, detection and whether a VPN is needed for travel.

## Evidence boundary

- Freedom House's [China: Freedom on the Net 2025](https://freedomhouse.org/country/china/freedom-net/2025) rates the environment Not Free and describes severe restrictions. It is not a live connectivity test or legal advice.
- [UK travel advice](https://www.gov.uk/foreign-travel-advice/china/safety-and-security) is used for current travel-safety context, not to make a blanket claim about VPN legality.
- NordVPN and Proton documentation verifies feature configuration only; it does not establish a permanent China connection.
- ZeroToVPN records device, network, protocol, server region, date and reconnect behaviour for any future hands-on result.

## Implementation

The English `/en/countries/china` route now uses the shared editorial shell with an evidence warning, contextual shortlist, decision table, bounded test plan, cluster links, FAQ schema and source list. Other locales retain their existing translation flow until separately audited.

## Affiliate gate

The shortlist is the only commercial block and is framed as options to evaluate. It uses existing Short.io routes with `sponsored nofollow`; no coupon, incentive, urgency or permanent-access promise is included.
