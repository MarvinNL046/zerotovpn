# ProtonVPN vs AirVPN — evidence-led comparison brief

**Status:** draft for the next attribution-cleared release; no production copy or sitemap entry is changed by this brief.  
**Target:** `/compare/protonvpn-vs-airvpn`  
**Observed opportunity:** 157 Search Console impressions, 1 click and average position **10.04** in the 28 July–10 August 2026 export; 8 affiliate anchors in the live HTML; currently absent from `LINKED_COMPARISONS` and the sitemap.

## Decision this page should support

Help a reader decide whether AirVPN’s specialist, control-oriented workflow or Proton VPN’s broader everyday product path better matches their device, privacy model and feature requirements. The page must make the trade-off explicit instead of declaring a universal winner.

## Search and question coverage

The comparison dossier returned the following directional signals:

- `vpn comparison` and `compare vpn services` — commercial comparison intent.
- `vpn price comparison` — price and renewal intent.
- PAA questions around the best VPN, avoiding NordVPN, FBI tracking and Netflix restrictions.
- AirVPN-specific PAA questions around trust, cost and whether AirVPN is better than Proton.

DataForSEO is used for question coverage and section ordering only. It is not evidence of provider safety, speed, current price, streaming success or conversion value.

## Recommended page structure

1. **Intent-matched title and H1**
   - `Proton VPN vs AirVPN (August 2026): Privacy, Price and Port Forwarding`
   - Open with a two-sentence answer: Proton is the broader everyday comparison path; AirVPN is the specialist option when control and port forwarding matter. Qualify both statements as decision framing, not a performance guarantee.
2. **Early disclosure and evidence boundary**
   - State that ZeroToVPN earns from selected provider links.
   - Link to methodology and affiliate disclosure before the first commercial CTA.
3. **Decision snapshot**
   - Two provider cards with “best fit when” and “verify before subscribing” bullets.
   - No star ratings, lab-speed percentages or universal “best” label unless a dated source is attached.
4. **Criteria table**
   - Price snapshot and renewal terms.
   - Refund window.
   - Simultaneous-device wording.
   - Protocol and app support.
   - Privacy policy/audit evidence.
   - Port-forwarding availability and limits.
   - Streaming status as a test boundary, not a guarantee.
5. **Who should choose which**
   - AirVPN: technically confident users who value configuration and port-forwarding control.
   - Proton VPN: readers prioritising broader everyday usability, a free tier or a more familiar app workflow; confirm current terms in the dated provider record.
6. **Repeatable verification plan**
   - Record plan, renewal, refund, device and protocol details at the same date.
   - Test one nearby and one long-distance route on the target device.
   - Test DNS/IPv6/WebRTC exposure and reconnect behaviour.
   - For port forwarding, verify inbound reachability from an independent network.
7. **PAA FAQ**
   - Is AirVPN or Proton VPN better?
   - Is AirVPN trustworthy?
   - Which is cheaper after renewal?
   - Does either provider support port forwarding?
   - Will either VPN work with the streaming service I use?
8. **Sources and next steps**
   - Link to both provider reviews, methodology, privacy guide and the broader comparison hub.

## Evidence matrix

| Criterion | Proton VPN evidence path | AirVPN evidence path | Safe wording limit |
|---|---|---|---|
| Price and renewal | Current catalog snapshot plus Proton review/source links | Current provider pricing page; no historic fixed price | Show the checked date and tell readers to verify checkout and renewal |
| Refund | Provider terms in the current review record | Provider terms in the current review record | Do not imply eligibility outside the stated plan/region |
| Devices and apps | Catalog/device record and official app documentation | AirVPN review’s platform/setup boundary and official support pages | Separate published support from a tested experience |
| Privacy | Policy/audit scope and review evidence | Privacy notice, Network Lock and open-source client evidence | “Published evidence” is not the same as an independent no-logs proof |
| Port forwarding | Record whether the current plan documents it | AirVPN port-forwarding FAQ and account-limit checks | Explain limits; never promise inbound reachability |
| Streaming | Treat as a service/region test | Treat as a service/region test | No “reliably unblocks” claim without a dated reproducible record |
| Performance | Use only a dated ZeroToVPN test record if available | Use only a dated ZeroToVPN test record if available | No inherited `speedScore`, “fastest” or fixed percentage claims |

## Internal-link contract

The page should link naturally to:

- `/compare` — broader comparison hub.
- `/reviews/protonvpn` and `/reviews/airvpn` — provider evidence dossiers.
- `/best/vpn-privacy` — privacy decision context.
- `/best/vpn-cheap` — price/renewal context.
- `/methodology` — how claims and tests are bounded.
- `/affiliate-disclosure` — commercial transparency.

The comparison should also be reachable from `PopularComparisons` before it is added to the sitemap. Do not add a sitemap entry for a page that is not internally linked and audit-covered.

## Affiliate and compliance boundary

- Use the centralized `getVpnAffiliateUrl` resolver only for approved provider IDs.
- AirVPN is not an approved affiliate slug in the current resolver; do not invent or insert a commercial AirVPN destination.
- Any approved provider CTA or inline price must use the shared `AffiliateButton`/`AffiliateTextLink` contract with `sponsored nofollow` and the public-page `aff_sub` behavior.
- No coupon, unassigned discount, urgency, cashback, popup affiliate CTA or “guaranteed access” wording.
- Keep the newsletter exit-intent prompt separate and email-only.

## Release gates

Do not promote this draft into the sitemap or use it as the next 4–8 page conversion batch until all gates pass:

1. Nord confirms which report/API field exposes forwarded `aff_sub`; the current report still has blank Sub ID 1 and Advertiser Sub ID 1.
2. The pair route is rendered from an evidence-led component, not the legacy score/winner FAQ generator.
3. `npm run audit:editorial` and the live editorial gate cover the route, including one H1, canonical/indexability, table semantics, FAQ schema, disclosure, cluster links and affiliate rel/slug attributes.
4. A browser smoke confirms no unsupported score, speed, server-count or streaming-guarantee claims and no horizontal overflow.
5. The route is added to `LINKED_COMPARISONS` only after it has a real internal-link path and passes the sitemap audit.
6. The next matched Search Console, Short.io and Nord export is retained as a before/after baseline; no conversion uplift is claimed from impressions alone.

## Source inventory

- `docs/research/dataforseo-vpn-comparison-cluster-2026-08-13.md`
- `docs/research/dataforseo-airvpn-review-cluster-2026-08-13.md`
- `src/components/editorial/airvpn-review-editorial-page.tsx`
- `src/components/editorial/vpn-comparison-editorial-page.tsx`
- `src/app/[locale]/compare/[comparison]/page.tsx` (legacy pair renderer requiring the evidence-led refactor)
- `src/lib/linked-comparisons.ts`
- `docs/metrics/attribution-ready-candidate-queue-2026-08-13.md`
