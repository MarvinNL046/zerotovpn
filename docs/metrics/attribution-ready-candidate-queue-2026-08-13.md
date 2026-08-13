# Attribution-ready candidate queue

**Date:** 13 August 2026  
**Decision supported:** choose the next 4–8 existing pages to improve after page-level NordVPN attribution is confirmed.  
**Audience:** editorial and growth stakeholders.  
**Scope:** English Search Console pages from 28 July–10 August 2026, live affiliate-link checks on 13 August, current sitemap coverage, and existing DataForSEO dossiers.

## Executive summary

- **The next page batch is not yet a conversion leaderboard.** Search Console shows where demand and ranking opportunity exist, while the Nord export still has no page-level sub-ID. The queue therefore ranks *actionability*, not affiliate revenue.
- **The strongest immediate commercial candidate is `/compare/protonvpn-vs-airvpn`.** It already has page-one visibility (157 impressions, 1 click, average position 10.04), eight live affiliate anchors and a comparison dossier, but it is not in `LINKED_COMPARISONS` or the sitemap. It needs an evidence-led copy review before being promoted.
- **Two pages combine page-one visibility with a clear conversion surface:** the simultaneous-connections article (167 impressions, position 10.57) and the fitness-tracking article (193 impressions, position 5.68). Both have eight live affiliate anchors, so their next work should be CTR/intent refinement rather than new URL creation.
- **The connection-drops article is a high-value authority/CTR candidate, not a direct affiliate winner.** It has 400 impressions at position 15.45 but no affiliate anchors; improve the answer and internal links first, then reassess commercial placement under the contextual affiliate policy.

## What the numbers mean

The Search Console cohort is the 28 July–10 August 2026 Web-search export for `sc-domain:zerotovpn.com`. Impressions, clicks and average position are page-level values; they are not conversions. Live affiliate counts are raw anchors observed in production HTML on 13 August and are used only to confirm that a page has a measurable conversion surface. Short.io totals and Nord partner totals are currently account/offer aggregates, so they cannot be joined to a URL yet.

## Candidate queue

| Tier | Existing URL | GSC impressions | Clicks | Avg. position | Live affiliate anchors | Current status | Recommended action after attribution gate |
|---|---|---:|---:|---:|---:|---|---|
| A | `/compare/protonvpn-vs-airvpn` | 157 | 1 | 10.04 | 8 | Indexable, self-canonical, one H1, **not in sitemap**; comparison dossier exists | Review the generic comparison claims against the AirVPN/competition evidence, add a bounded decision table and sources, then consider adding it to `LINKED_COMPARISONS` and the sitemap only when internal links and audit coverage are ready |
| A | `/blog/vpn-simultaneous-connections-limits-workarounds-2026` | 167 | 0 | 10.57 | 8 | DataForSEO dossier and commercial intent already documented | Improve the SERP answer for device limits/workarounds, make plan/device wording dated, and instrument the existing CTAs; do not create a variant |
| A | `/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy` | 193 | 0 | 5.68 | 8 | Strong ranking with a CTR gap; existing conversion surface | Tighten the title/intro and PAA-style FAQ around Strava, Apple Health and Garmin privacy; preserve the evidence boundary and test whether the existing CTAs are visible at the decision point |
| B | `/blog/vpn-connection-drops-why-disconnects-how-to-fix-2026` | 400 | 0 | 15.45 | 0 | High informational demand, no affiliate surface | Add a concise diagnostic checklist, internal links to protocol/device guides and a dated troubleshooting source set; only add contextual provider links if the reader’s next step genuinely requires a VPN |
| B | `/blog/best-country-for-vpn-server-location-2026` | 261 | 0 | 11.46 | 0 | Already received a source/update pass; page-one visibility remains | Recheck title/FAQ/snippet after recrawl before editing again; prioritize internal links and measurement rather than duplicating the previous refresh |

### Recently refreshed — hold for recrawl

These pages have useful demand signals but were just changed, so another rewrite would contaminate the learning window:

| URL | GSC snapshot | Existing work |
|---|---|---|
| `/best/vpn-android-tablet` | 185 impressions, 0 clicks, position 17.70 | Android-tablet refresh in commit `8f3de557` |
| `/best/vpn-chromebook` | 354 impressions, 0 clicks, position 32.4 | Chromebook refresh in commit `af652844` |
| `/blog/best-vpn-for-chatgpt-2026` | 536 impressions, 2 clicks, position 9.22 | Stale-claim refinement already shipped |
| `/blog/best-free-vpn-reddit-2026` | 623 impressions, 1 click, position 9.78 | Audit/refinement already shipped |

## Why this queue is safer than a new URL batch

The current sitemap intentionally avoids thousands of empty pairwise comparison pages. The ProtonVPN/AirVPN page is a useful exception to investigate because it already receives impressions and clicks, but adding it to the sitemap before the generic comparison component is evidence-bounded would advertise a page whose claims have not passed the current editorial gate. The queue therefore separates:

1. **copy and evidence readiness**;
2. **internal-link and sitemap eligibility**; and
3. **conversion measurement readiness**.

Only a page that passes all three should be promoted or used as a template for another URL.

## Recommended run order

1. Capture the next dated Nord performance export with **Sub ID 1** and **Advertiser Sub ID 1** selected. Confirm that a returned value contains `zt_<locale>-<public-page-slug>`.
2. Join that value to the Short.io slug/page map and update `measure:editorial`. Keep unmatched offer totals separate.
3. Run the full editorial, sitemap and affiliate-context audits before editing any Tier A page.
4. Refresh the comparison page first if the attribution join is real; otherwise start with the simultaneous-connections and fitness-tracking pages because their existing anchors provide a bounded measurement surface.
5. Leave the connection-drops and server-location pages in the authority/CTR lane until a contextual conversion need is proven.

## Open questions

- Does the Nord dashboard expose the forwarded `aff_sub` under **Sub ID 1**, **Advertiser Sub ID 1**, or another report field?
- Should `/compare/protonvpn-vs-airvpn` be promoted into the sitemap after the component’s fixed ratings/speed/streaming claims are replaced with dated evidence?
- For pages with zero affiliate anchors, which reader action is genuinely useful enough to justify a contextual provider link?

## Caveats and sources

- No page-level Nord conversion, payout or EPC conclusion is made here. The post-rollout Nord row currently shows 2 clicks, 0 conversions, `$0` payout and a blank `Stat.affiliate_info1`; this is an attribution gap, not proof of zero page conversions.
- The affiliate-anchor count is a live HTML observation, not a click count. Global Short.io totals cannot be allocated to these URLs until the sub-ID join is returned by the partner report.
- DataForSEO supports topic and SERP hypotheses; it is not a substitute for Search Console or partner conversion data.

Primary evidence:

- `docs/metrics/post-14d-2026-08-13.json` — normalized Search Console, Short.io and Nord inputs.
- `docs/metrics/nord-partner-postrollout-2026-08-13.md` — dated post-rollout partner export and blank sub-ID observation.
- `docs/research/dataforseo-vpn-comparison-cluster-2026-08-13.md` — comparison keyword/PAA evidence.
- `docs/research/dataforseo-airvpn-review-cluster-2026-08-13.md` — AirVPN review/comparison evidence.
- `src/lib/linked-comparisons.ts` — current sitemap/linked-comparison boundary.
- `docs/plans/zerotovpn-editorial-conversion-roadmap-2026-08-11.md` — release gates and attribution decision log.
