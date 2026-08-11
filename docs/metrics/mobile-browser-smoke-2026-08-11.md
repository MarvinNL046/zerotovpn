# Mobile browser smoke check

**Checked:** 11 August 2026  
**Environment:** production https://www.zerotovpn.com  
**Browser:** installed Google Chrome, headless Playwright control  
**Viewport:** 390 × 844 CSS pixels

| Route | HTTP | H1 | Body rendered | Horizontal overflow | Framework error overlay | Page errors | Result |
|---|---:|---|---:|---:|---:|---:|---|
| /countries/iran | 200 | Present | Yes | No | No | 0 | Pass |
| / | 200 | Present | Yes | No | No | 0 | Pass |

Additional checks on /countries/iran confirmed that the breadcrumb now resolves to /nl/guides rather than the removed /nl/best route, and the China cluster link resolves to /nl/countries/china. The final run excluded third-party advertising responses from the site-error list; no first-party 4xx/5xx responses were observed.

The check also caught and led to fixes for a legacy /best breadcrumb prefetch and a locale-dependent number formatter that produced a React hydration warning on the homepage. Those fixes are in commit d9d9831, deployed as dpl_Hqx6frvFzixrTptRBYp6Wo56BMbt.
