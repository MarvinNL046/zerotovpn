# NordVPN contextual promotion-flag review

**Review date:** 2026-08-13  
**Scope:** 11 contextual matches reported by the live affiliate-context audit  
**Raw evidence:** [affiliate-context-audit-2026-08-12.md](../metrics/affiliate-context-audit-2026-08-12.md)  
**Promotion rules:** Nord Affiliate Program rules supplied by the account owner

## Outcome

All technical compliance gates remain green: the live audit checked 2,271 sitemap URLs, found 8,799 tracked affiliate links, and reported zero missing `sponsored nofollow` attributes, disclosure failures, interruptive-promotion markers, fetch failures, or slow responses. The remaining 11 matches are contextual language on pages whose search intent requires discussing trials or the economics of data collection. They are not coupon, cashback, paid-ad, popup-affiliate, or unrelated-content placements.

The raw matches remain enabled in the audit so that a future copy change cannot hide a new promotional pattern. They are classified below rather than deleted from the evidence.

## Classified matches

### Legitimate free-trial comparison intent — 9 locale routes

Routes:

- `/best/vpn-free-trial`
- `/nl/best/vpn-free-trial`
- `/de/best/vpn-free-trial`
- `/es/best/vpn-free-trial`
- `/fr/best/vpn-free-trial`
- `/zh/best/vpn-free-trial`
- `/ja/best/vpn-free-trial`
- `/ko/best/vpn-free-trial`
- `/th/best/vpn-free-trial`

The `free months?/trial` match is the page's declared query intent, not an incentive attached to an affiliate CTA. The pages compare provider-documented trial or refund terms, distinguish a true no-card trial from a refund window, link to the provider review and official source, and show the affiliate disclosure. They do not promise an account-specific discount, cashback, reward, or coupon.

Guardrail: keep this language bounded to factual comparison and source dates. Do not add “claim deal”, “exclusive”, “free months”, or unassigned coupon language to these pages.

### Educational use of “incentives” — 2 English articles

- `/blog/vpn-ai-chatbot-privacy-prevent-prompt-logging`
- `/blog/vpn-leaks-email-clients-gmail-outlook-apple-mail-2026`

The `incentive(?:s)?` match describes business or data-broker incentives to collect, retain, or sell personal data. It is explanatory privacy education, not a user reward or a call to purchase a NordVPN subscription. The provider links are contextual privacy references and retain the normal sponsored-link and disclosure controls.

Guardrail: preserve the explanatory subject (“incentives to log/sell data” or “corporate incentives”) and do not rewrite it as a customer incentive, bonus, rebate, or reward.

## Recheck protocol

After any change to these routes, run:

```powershell
npm run audit:affiliate-context
npm run audit:editorial-live
```

Review the raw `promoTerms` records before changing the allowlist or copy. A decrease in the count is not required for compliance; a new match on a non-trial, non-educational route is a release blocker until manually reviewed.

