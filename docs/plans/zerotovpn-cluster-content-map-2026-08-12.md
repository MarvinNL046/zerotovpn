# ZeroToVPN cluster content map

**Updated:** 12 August 2026  
**Scope:** existing live URLs, internal links and the next measured editorial queue  
**Rule:** do not create another keyword variation until the 25 August Search Console/Short.io/partner checkpoint has real exports.

This map turns the existing research dossiers into an operating topical-authority structure. It distinguishes a page that already exists and has evidence from a page that is merely a possible future idea. DataForSEO questions guide headings and FAQs; they do not replace Search Console demand or prove provider performance.

## Current cluster map

| Cluster | Pillar / hub | Live supporting pages | Primary intent | Commercial boundary | Current evidence |
| --- | --- | --- | --- | --- | --- |
| Commercial choice | `/best/best-vpn` | `/best/vpn-privacy`, `/best/vpn-streaming`, `/best/vpn-netflix`, `/best/vpn-cheap`, `/best/fastest-vpn`, `/best/vpn-free-trial` | Compare providers and choose by use case | Provider cards and contextual price links only; FAQ stays informational | Commercial DataForSEO dossier, dated comparison records and live editorial gate |
| Censorship and restricted networks | `/blog/best-vpn-for-iran-2026-bypass-internet-censorship` + `/countries/iran` | `/countries/russia`, `/countries/china`, `/blog/best-vpn-for-telegram-2026`, `/guides/vpn-obfuscation-explained`, `/guides/vpn-for-restricted-networks` | Prepare, verify and understand network-specific limits | Affiliate links only where the reader is evaluating a VPN; never promise access or legality | Iran, Russia, China and Telegram dossiers; official guidance; bounded test plans |
| Free and low-cost access | `/best/free-vpn` | `/best/vpn-free-trial`, `/best/vpn-cheap` | Separate genuinely free tiers, trials and paid value | No coupon or incentive language; free-tier facts must name the specific plan | Free-VPN dossier and provider plan evidence |
| Protocol and technical literacy | `/guides/vpn-protocols-explained` | `/guides/vpn-obfuscation-explained`, `/guides/vpn-speed-guide`, `/vpn-encryption-explained`, `/what-is-a-vpn`, `/how-does-a-vpn-work` | Learn how protocols, encryption and fallback behaviour affect a decision | Keep educational sections affiliate-free; bridge to the commercial pillar only after the explanation | Protocol/obfuscation dossiers, WireGuard/OpenVPN/first-party documentation |
| Travel and public Wi-Fi | `/guides/vpn-for-travel` | `/guides/public-wifi-safety`, `/best-vpn-for-travel`, `/best-vpn-for-public-wifi`, `/countries/*` where relevant | Prepare devices and assess travel/network risk | Commercial CTA only when the reader is choosing a provider for the described use case | Travel dossier, dated government/security sources and bounded preparation guidance |
| Trust and methodology | `/methodology` | `/how-we-test`, `/reports/vpn-transparency-performance-index-2026`, `/affiliate-disclosure`, `/editorial-policy` | Understand how claims, tests and commercial links are handled | No provider CTA in trust-policy copy; link outward to evidence, not offers | Dated test records, source dates and the newsletter-only popup guard |

## Internal-link contract

Every commercial or use-case pillar should expose these links in the body, not only in a footer widget:

1. **Parent/pillar:** one descriptive link back to the cluster hub.
2. **Two sibling pages:** choose the nearest intent or mechanism, not a random popular URL.
3. **One evidence/methodology link:** show how the claim can be checked.
4. **One next-step bridge:** educational pages may bridge to `/best/best-vpn`; commercial pages may bridge to the relevant provider review or comparison.
5. **One freshness signal:** updated/reviewed date or `dateModified` schema.

Examples already implemented:

- Iran ↔ Telegram ↔ Russia ↔ China, with protocol and obfuscation guides as mechanism bridges.
- `/best/best-vpn` ↔ free VPN, streaming, privacy and cheap/trial pages as decision branches.
- Protocol and obfuscation guides → the censorship pages and back to the commercial pillar after the educational boundary.

Use descriptive anchors such as “VPN obfuscation explained” or “Iran VPN evidence checklist”. Avoid repeated “read more” anchors and avoid adding a provider link merely to increase link count.

## Post-checkpoint content queue

Select from this queue only after joining matched exports and checking cannibalisation:

| Priority | Candidate | Why it is eligible | Required gate before editing |
| ---: | --- | --- | --- |
| 1 | Existing page with impressions in the commercial pillar | Highest conversion relevance and already has a shared template | Search Console page/query CTR, current price/source check and affiliate-context audit |
| 2 | Existing censorship support page with positions 11–40 | Strengthens the Iran/Telegram/Russia/China authority loop | Query intent, country/network evidence and no unsupported access claim |
| 3 | Existing protocol or obfuscation guide with impressions | Supplies explanatory coverage to commercial and country pages | PAA overlap check and primary documentation refresh |
| 4 | Existing free/trial page with impressions | Clarifies value intent without coupon risk | Distinguish free tier vs trial; verify current terms and refund language |
| 5 | New URL only if a measured gap remains | Prevents thin topical variants and cannibalisation | Search Console gap, DataForSEO support, distinct question, evidence brief and internal-link destination |

## Editorial safeguards

- Keep the exit-intent popup as a first-party email/newsletter prompt only. It must contain no affiliate URL, provider offer, coupon, discount, cashback or incentive.
- Keep NordVPN promotion inside genuine VPN-selection contexts and use the approved tracked slug with `sponsored nofollow`.
- Treat missing current DataForSEO volume as unknown, never as zero or as a reason to manufacture URLs.
- Keep provider claims, first-party documentation and ZeroToVPN observations visibly separate.
- Record device, network, protocol, server region and date for any reproducible test; one successful connection is not a permanent guarantee.

## Measurement hand-off

At the 25 August checkpoint, run `npm run measure:editorial` with matched Search Console pages/queries, Short.io and partner exports. Rank candidates by cluster-level clicks, impressions, CTR, position, human redirect clicks, conversions and EPC. Keep conversions/EPC null when the partner export does not provide them; never infer them from clicks.
