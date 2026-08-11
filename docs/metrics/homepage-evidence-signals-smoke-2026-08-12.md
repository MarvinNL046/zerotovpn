# Homepage evidence-signal smoke

**Checked:** 12 August 2026  
**Deployment:** `dpl_EkqaBrXwacJyHZxmz8gEFMRjBN8j`  
**Production alias:** https://www.zerotovpn.com/

The homepage now renders four bounded signals from current site state:

- number of providers in the current comparison;
- the 2026 transparency report;
- the methodology/test plan;
- the current review month.

Both `/` and `/nl` returned HTTP 200 after deployment. The retired homepage trust-indicator bundle is not serialized (`trustIndicators` absent from production HTML), and the old labels `VPNs Tested`, `Monthly Readers`, `Speed Tests` and `24/7 Updated` are absent. The new evidence-signal labels are present in both responses.

The in-app browser smoke also passed at desktop (`1280px` viewport, document width `1265px`) and mobile (`390px` viewport, document width `375px`): both had exactly one H1, no horizontal overflow, no old labels and all four new signals.

This smoke does not claim that unrelated provider facts elsewhere on the homepage are independently tested; those remain governed by their page/source evidence and the existing editorial audit.
