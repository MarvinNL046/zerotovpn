# Affiliate telemetry browser smoke test

**Date:** 11 August 2026  
**Route:** `https://www.zerotovpn.com/best/best-vpn`  
**Browser:** installed Google Chrome, controlled headlessly through Playwright at a 1280×800 viewport

## Checks

The test loaded the production page, selected the first affiliate link, intercepted the first-party `/api/click` request so no synthetic click was sent to production analytics, and then triggered the real link handler.

| Check | Result |
|---|---|
| HTTP response | 200 |
| H1 count | 1 |
| Body rendered | Yes (11,729 characters) |
| Affiliate slug in server-rendered link | `nordvpn` |
| Affiliate destination | `https://go.zerotovpn.com/nordvpn` |
| Link attributes | `noopener noreferrer sponsored nofollow` |
| Beacon `vpnId` | `nordvpn` |
| Beacon `affiliateSlug` | `nordvpn` |
| Beacon page | `/nl/best/best-vpn` |
| Framework error overlay | None |
| First-party HTTP errors | 0 |

One external Google AdSense request returned 403 during the page load. It was not a ZeroToVPN route and did not affect rendering or the click beacon.

## Interpretation

The page/Short.io-slug measurement contract is ready for the 14-day comparison. Short.io remains the source of truth for redirect clicks; the first-party beacon is diagnostic context that joins a click to the page and provider slug.
