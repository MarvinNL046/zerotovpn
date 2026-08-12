# NordVPN Promotion Rules audit

**Audit date:** 2026-08-10  
**Scope:** ZeroToVPN website and codebase  
**Offer:** NordVPN Offer 15  
**Rules source:** Nord Affiliate Program Promotion Rules supplied by the account owner

## Executive conclusion

The Offer 15 redirect is now configured correctly, but the website is **not yet compliant for a site-wide NordVPN rollout**. The most urgent issues are a global exit-intent popup with a NordVPN affiliate CTA and discount claim, a global sticky CTA with a hard-coded discount claim, and Nord affiliate CTAs on torrenting/P2P pages.

## Remediation update — 2026-08-10

The three urgent placements have now been neutralized in the codebase: the exit-intent dialog is a consented newsletter/VPN-finder prompt with no affiliate URL, the sticky bar links only to the internal quiz/comparison flow, and the global security banner no longer advertises NordVPN. Nord affiliate CTAs were also removed from the torrenting/P2P guide and ranking pages. The legacy price/deal page was subsequently blocked and redirected to the evidence-led cheap-VPN pillar because it contained unassigned coupon language and stale savings claims. Nord promotion should stay limited to clearly relevant, compliant review and comparison pages.

## Findings

### Critical — remove before promoting NordVPN site-wide

1. **Exit-intent affiliate popup (remediated)**

   `src/components/conversion/exit-intent-popup.tsx` is mounted globally through `src/components/lazy-conversion-widgets.tsx` and `src/app/[locale]/layout.tsx`. It displays a NordVPN CTA, a calculated percentage discount, and a “claim deal” action. This is pop-up advertising and also presents a discount that is not confirmed as assigned to the account.

2. **Global sticky commercial CTA (remediated)**

   `src/components/conversion/sticky-cta-bar.tsx` defaults to NordVPN, hard-codes `discountPercent = 68`, and uses “OFF”, “limited offer” and “claim deal” messaging. The hard-coded discount is not an assigned coupon and the component is globally available.

3. **Nord affiliate links on restricted content (priority routes remediated)**

   The codebase and live HTML show Nord affiliate links on or through pages covering torrenting/P2P and circumvention-related topics, including:

   - `/best/vpn-torrenting`
   - `/guides/vpn-for-torrenting`
   - `/best-vpn-for-torrenting`
   - country pages whose copy promotes bypassing piracy/DMCA blocks

   The torrenting guide and ranking page now render no Nord affiliate URLs. Keep this as a regression check whenever new P2P content is added.

4. **Central provider data has no content-context guard**

   `src/lib/vpn-data.ts` injects a Nord affiliate URL into the provider object, and many page templates inherit it automatically. The existing `VPN_APPROVED_AFFILIATE_IDS` and `AFFILIATE_VPN_NORDVPN_URL` placeholders are not read by application code.

### High — commercial copy requires cleanup

5. **Discount and coupon claims**

   Nord discount language appears in the IP lookup and DNS leak widgets, translation files, and editorial content. Examples include “NordVPN — X% Off”, “68% off”, and NordVPN price claims. These must be removed or replaced with neutral copy unless the exact promotion is assigned to this account in the Nord dashboard.

6. **Risky legacy content**

`src/content/blog/best-free-vpn-reddit-2026.md` and `src/content/blog/is-brave-vpn-free-2026.md` contain Nord coupon links and promotional price claims. These are not safe to publish under the current rules without offer-specific approval.

7. **Legacy price/deal page (remediated)**

`/blog/vpn-price-comparison-best-deals` and its locale variants contained unassigned coupon-code language, “exclusive” offers and stale percentage savings. The slug is now blocked from the published post corpus and permanently redirects to `/best/vpn-cheap`; a build-time regression check protects the block and redirect.

### Passed / no evidence found in static scan

- `go.zerotovpn.com` does not contain a Nord trademark in the domain name.
- Affiliate buttons use `rel="sponsored nofollow"`.
- No Nord affiliate links were found in the email sending code or automated comment-posting code.
- No evidence was found of cashback, referral rewards, or self-order automation.
- Ordinary editorial NordVPN mentions and review links are allowed by the supplied Promotion Rules, provided they are not black-hat SEO or paid brand bidding.

## Live redirect verification

The public link `https://go.zerotovpn.com/nordvpn` now returns a 302 to the direct NordVPN Offer 15 tracking URL. The previous `tpo.lv` destination is no longer used.

## Required remediation order

1. **Done:** Replace the global exit-intent NordVPN popup with an email-only, consented newsletter prompt. It may remain enabled for first-party email collection, but must never contain an affiliate URL, provider offer, coupon, discount, cashback or incentive.
2. **Done:** Remove or neutralize the global sticky discount CTA; no “OFF”, “limited offer”, coupon or deal language without an assigned offer.
3. **Partially done:** Remove Nord links from current torrenting/P2P routes and keep a route-level regression check for new restricted content.
4. Remove legacy Nord coupon links and unverified discount claims from all locales and content formats.
5. Wire the approved-provider environment variables into the link resolver so Nord is fail-closed by default.
6. Add a build-time audit that fails when a Nord affiliate URL appears in a restricted route or when an unapproved discount claim is introduced.
7. Ask the Nord account manager in writing whether a site may contain separate educational P2P content while Nord links are limited to compliant pages.

## Operating rule

Until remediation is complete, treat NordVPN as approved only for general reviews, comparisons, privacy guides and legitimate streaming/device pages. Do not place Nord affiliate CTAs on P2P/torrenting, piracy, hacking or circumvention content, and do not use discount or coupon language.
