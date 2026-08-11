# Affiliate context manual review

**Audit:** [affiliate-context-audit-2026-08-11.json](./affiliate-context-audit-2026-08-11.json)  
**Reviewed:** 11 August 2026

The live audit produced 21 promotion-term flags after the restricted blockchain context was removed from affiliate destinations. These are review queues, not automatic violations. The NordVPN rules prohibit unauthorised coupons, incentives, interruptive ads and irrelevant affiliate placement; they do not prohibit an editorial page from accurately explaining a provider's documented trial or from using the word “incentive” in a privacy explanation.

## Classification

| Flag group | Pages | Decision | Required control |
|---|---:|---|---|
| `free\\s+(?:months?|trial)` on `/best/vpn-free-trial` and locale variants | 9 | Keep as editorial offer-comparison pages only when the trial/plan is confirmed on the provider's current first-party page. | No unassigned coupon, no fake expiry, no cashback/reward language, and keep the affiliate disclosure beside the shortlist. |
| `free\\s+(?:months?|trial)` on CactusVPN reviews and locale variants | 9 | Keep as a product feature only if the review's source evidence still confirms it. | Treat “free trial” as a factual plan attribute, not as a ZeroToVPN incentive; re-check at each review update. |
| `incentive(?:s)?` on the AI-chatbot privacy and email-privacy articles | 2 | Contextual explanatory language, not a promotion or CTA. | Keep affiliate links limited to the VPN-selection paragraphs and retain `sponsored nofollow` plus disclosure. |
| `free\\s+(?:months?|trial)` on the video-call privacy article | 1 | Contextual test recommendation; not a coupon or popup. | Remove the phrase if it becomes a provider-specific inducement or cannot be verified at source. |

## Explicitly removed

The blockchain/privacy article contains mixer and non-KYC workflow material. Affiliate destinations are therefore stripped at render time while provider names remain readable. This prevents commercial links from appearing beside content that could facilitate unlawful financial activity.

## Release gate

The queue is acceptable only while all of the following remain true:

- `missingRelPageCount === 0`
- `noDisclosurePageCount === 0`
- `interruptiveFlagPageCount === 0`
- `failedFetchCount === 0`
- every flagged phrase is classified above and has a first-party verification path

If a flag cannot be classified, remove the affiliate destination first and investigate the editorial copy separately.
