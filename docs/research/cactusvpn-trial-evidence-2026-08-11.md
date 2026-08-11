# CactusVPN trial and free-tier evidence

**Checked:** 11 August 2026  
**Scope:** CactusVPN review copy, free-tier classification and affiliate-context audit

## Finding

CactusVPN should not be labelled as a permanent free tier. Its official FAQ describes a limited three-day trial, while the current pricing page presents paid plans and a 30-day money-back policy and explains why the provider does not describe that policy as a free trial. The two first-party pages are therefore not interchangeable evidence.

## Source record

| Source | What it supports | Editorial treatment |
|---|---|---|
| [CactusVPN VPN FAQ](https://www.cactusvpn.com/support/faq-vpn/) | The FAQ says the trial is active for three days and describes the trial scope. | Keep a qualified “FAQ lists a 3-day trial” note; do not imply universal availability. |
| [CactusVPN pricing](https://www.cactusvpn.com/pricing/) | Current paid plans, 30-day refund language and the provider's explanation that the refund is not a limited trial. | Do not call the refund a free tier or an unconditional trial. |

## Code changes

- `src/lib/vpn-data.ts` now sets `freeTier: false`; a time-limited trial is not a permanent free plan.
- The CactusVPN description and pros/cons use qualified wording instead of an unqualified “free trial” claim.
- The CactusVPN review remains a genuine provider-selection context, so its disclosed `sponsored nofollow` affiliate links may remain.

Recheck both first-party URLs whenever the CactusVPN review is refreshed. If the FAQ and pricing pages converge on a new offer, update the provider record and this evidence note together.
