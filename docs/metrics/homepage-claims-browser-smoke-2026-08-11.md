# Homepage claims browser smoke test

**Date:** 11 August 2026  
**Route:** `https://www.zerotovpn.com/nl`  
**Browser:** installed Google Chrome, controlled headlessly through Playwright at 390×844

The homepage recommendation block now uses catalog labels and avoids the old unsupported-looking “38+ VPNs”, universal “ranks #1”, speed-retention and rating copy.

| Check | Result |
|---|---|
| HTTP response | 200 |
| H1 count | 1 |
| Body rendered | Yes (5,357 characters) |
| New shortlist copy visible | Yes |
| Viewport width / document width | 390 / 390 px |
| Horizontal overflow | None |
| Framework error overlay | None |
| Page errors | None |
| Affiliate slug attributes | 9 |

The homepage CTA remains a tracked affiliate link with `sponsored nofollow`; the exit-intent popup remains newsletter-only.
