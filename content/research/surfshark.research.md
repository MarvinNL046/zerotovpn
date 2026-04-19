# Surfshark Review — SERP Research (2026-04-19)

Audit trail for the deep Surfshark review. 5 SerpAPI calls used (budget 6).

## SerpAPI calls

1. `surfshark review 2026` (gl=us) — general intent
2. `surfshark vs nordvpn` (gl=us) — comparison intent
3. `is surfshark safe` (gl=us) — trust/PAA
4. `best cheap vpn 2026` (gl=us) — competitive angle
5. `surfshark netflix` (gl=us) — streaming gap check

## Top 5 competitors (aggregated from queries 1 + 2)

1. **vpnmentor.com** — "A Cheap VPN, but Can It Be Trusted?" (#1 for `surfshark review 2026`). Trust-skeptical angle.
2. **security.org** — "Is It Any Good?" (#2). Notes temporary IP logging — a vulnerability other reviewers copy.
3. **allaboutcookies.org** — "Great Value, But is It Safe?" Gives Surfshark 5/5.
4. **thebestvpn.com** — "Best for Streaming & Torrenting 2026." Affiliate-heavy.
5. **cybernews.com** — detailed review with speed retention data (81% WireGuard retention, 97% local).

## People-Also-Ask (FAQ goldmine)

From `surfshark vs nordvpn` + `is surfshark safe` + `surfshark netflix`:

- Is NordVPN better than Surfshark?
- What are the downsides of Surfshark?
- Has Netflix blocked Surfshark?
- Is Surfshark VPN really safe?
- Is Surfshark owned by China? *(misconception — actually Nord Security, Lithuania/NL)*
- Can we trust Surfshark?
- Will Netflix ban me if I use VPN?
- Which VPN can Netflix not detect?

## Related searches (long-tail)

- Surfshark reviews complaints
- Is Surfshark safe for banking
- Is Surfshark legit
- Surfshark vs NordVPN vs Proton
- Surfshark Netflix household *(2026-specific: Netflix's household rule)*
- Surfshark Netflix proxy detected

## Content gaps identified (what top-10 does poorly)

1. **Nord Security merger context is underexplained.** Competitors mention "owned by Nord" but don't unpack what that means for the user (same infra? shared logs? pricing alignment?). Gap: explain the 2022 merger cleanly, address the "Is Surfshark Chinese?" misconception head-on, and note the competitive-but-independent product roadmap.
2. **2025 Deloitte re-audit rarely cited.** Most top-10 reviews cite older 2022/2023 audits. The June 2025 Deloitte ISAE 3000 reverification is fresh and underused. Gap: lead with the 2025 audit date and link the ISAE 3000 PDF.
3. **Netflix "Proxy Detected" failure path.** Top-10 says "works with Netflix" but doesn't explain what to do when it fails (server rotation, MultiHop workaround, different region). Related-search `Surfshark Netflix proxy detected` confirms user demand.
4. **Dausos protocol (2026 launch) completely missing.** Surfshark launched a new proprietary protocol called Dausos (spotted on surfshark.com homepage during Playwright navigation). No top-10 review covers it yet — this is a timeliness differentiator.
5. **Incogni bundle (One+) underexplained.** Top reviewers skim over this; it's one of the strongest differentiators vs ExpressVPN (which has no data-broker removal service).

## Hard facts to anchor the review

- Deloitte audit concluded **10 June 2025** (ISAE 3000 Type 2-equivalent reasonable assurance). Second Deloitte no-logs verification.
- Speed (cybernews.com 2026 test): 81% WireGuard retention avg, 97% local retention, ~780 Mbps on 940 Mbps baseline.
- Pricing (April 2026, from multiple sources): Starter 24-mo $1.99/mo, One 24-mo $2.49/mo, One+ 24-mo $4.29/mo. 30-day money-back. Bonus 3 free months on 24-mo plans.
- Server count: 4,500+ (confirmed by surfshark.com/features).
- HQ: Amsterdam, Netherlands (incorporated in BVI originally; Nord Security group since Feb 2022).
- Feb 2022: Nord Security + Surfshark merger announced (kept separate products).
- Protocols: WireGuard (default, via Everlink stability layer), OpenVPN, IKEv2, and new **Dausos** (2026).

## Angle for this review

Lead with honest Nord-Security context (many reviewers hide it, user feedback rule says don't). Use the 2025 Deloitte audit + Dausos launch as the "fresh 2026" hooks. Frame the review around "cheap but legit" — which is what the top-ranking vpnmentor.com title implies but doesn't deliver on with specifics.
