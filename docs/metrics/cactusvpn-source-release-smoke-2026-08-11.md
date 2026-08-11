# CactusVPN source correction release smoke

**Deployment:** `dpl_3BrpErvcnu1EBDQ34ZBw76PTdbcK`  
**Route:** `https://www.zerotovpn.com/reviews/cactusvpn`  
**Checked:** 11 August 2026

The production route returned HTTP 200 after the deployment. The rendered HTML contains the qualified “FAQ lists a 3-day trial” wording and the “Trial availability differs across provider pages” limitation. The old “Free trial available” provider-pros phrase is absent. A remaining `Free Tier` string belongs to unrelated provider data embedded in the shared review payload, not to the CactusVPN badge; the CactusVPN record itself is now `freeTier: false`.

The full affiliate-context audit then checked all **2,279/2,279** sitemap URLs: **12** active manual promotion flags, 0 missing-rel pages, 0 missing-disclosure pages, 0 interruptive markers and 0 fetch failures.
