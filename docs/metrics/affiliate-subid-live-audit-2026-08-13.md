# Live affiliate sub-ID audit

Generated: 13 August 2026

The reusable `npm run audit:affiliate-subid-live` guard checks a small production representative set. It verifies HTTP 200 responses, expected Nord `aff_sub` values based on the canonical English attribution path, and that non-Nord redirects are not accidentally tagged.

## Result

- Base: `https://www.zerotovpn.com`
- Pages checked: **4**
- Nord anchors found: **2**
- Nord anchors with the expected public sub-ID: **2**
- Non-Nord redirects carrying `aff_sub`: **0**
- Result: **PASS**

The two tagged placements were:

- `zt_en-blog-vpn-simultaneous-connections-limits-workarounds-2026`
- `zt_en-blog-vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy`

The connection-drops and account-sharing guides remain affiliate-free in the sampled HTML, so they correctly produce no Nord placement. This is a deployment guard only; Nord/TUNE remains the conversion and payout source of truth, and a blank partner `Sub ID 1` still cannot be treated as a page-level join.

Run locally with:

```powershell
npm run audit:affiliate-subid-live
```
