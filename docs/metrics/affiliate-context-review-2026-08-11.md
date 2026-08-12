# Affiliate context manual review

**Audit:** [affiliate-context-audit-2026-08-12.json](./affiliate-context-audit-2026-08-12.json)  
**Reviewed:** 12 August 2026

The latest live audit produced **12 active** promotion-term flags, down from 21 after the restricted blockchain context and the CactusVPN wording were corrected. These are review queues, not automatic violations. The NordVPN rules prohibit unauthorised coupons, incentives, interruptive ads and irrelevant affiliate placement; they do not prohibit an editorial page from accurately explaining a provider's documented trial or from using the word “incentive” in a privacy explanation.

## Classification

| Flag group | Pages | Decision | Required control |
|---|---:|---|---|
| `free\\s+(?:months?|trial)` on `/best/vpn-free-trial` and locale variants | 9 | Keep as editorial offer-comparison pages only when the trial/plan is confirmed on the provider's current first-party page. | No unassigned coupon, no fake expiry, no cashback/reward language, and keep the affiliate disclosure beside the shortlist. |
| `incentive(?:s)?` on the AI-chatbot privacy and email-privacy articles | 2 | Contextual explanatory language, not a promotion or CTA. | Keep affiliate links limited to the VPN-selection paragraphs and retain `sponsored nofollow` plus disclosure. |
| `free\\s+(?:months?|trial)` on the video-call privacy article | 1 | Contextual test recommendation; not a coupon or popup. | Remove the phrase if it becomes a provider-specific inducement or cannot be verified at source. |

## Explicitly removed

The blockchain/privacy article contains mixer and non-KYC workflow material. Affiliate destinations are therefore stripped at render time while provider names remain readable. This prevents commercial links from appearing beside content that could facilitate unlawful financial activity.

## Resolved in this audit

CactusVPN's nine review URLs no longer trigger the promotion-term audit. The provider record now distinguishes a time-limited trial from a permanent free tier and qualifies the conflicting first-party evidence. See [cactusvpn-trial-evidence-2026-08-11.md](../research/cactusvpn-trial-evidence-2026-08-11.md).

## Release gate

The queue is acceptable only while all of the following remain true:

- `missingRelPageCount === 0`
- `noDisclosurePageCount === 0`
- `interruptiveFlagPageCount === 0`
- `failedFetchCount === 0`
- every flagged phrase is classified above and has a first-party verification path

If a flag cannot be classified, remove the affiliate destination first and investigate the editorial copy separately.
