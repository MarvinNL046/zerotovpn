# Affiliate sub-ID diagnostic beacon

**Date:** 13 August 2026  
**Scope:** first-party `/api/click` telemetry and the shared affiliate button

## Change

The browser beacon now preserves the generated public `aff_sub` value as
`affiliateSubId` when it is present in the tracked destination URL. The API
route logs that value together with the existing provider slug and page path.

The server-rendered blog normalizer now applies the same placement ID to raw
Nord anchors in evidence-led article content. It receives the locale and
public slug from the route, so a page such as
`/en/blog/vpn-simultaneous-connections-limits-workarounds-2026` renders
`aff_sub=zt_en-blog-vpn-simultaneous-connections-limits-workarounds-2026` before
the browser click occurs. Other providers remain unchanged.

The value is deliberately limited to the deterministic public page slug
(`zt_<public-page-slug>`). It contains no user identifier, cookie value, email
address or other personal data. Malformed destinations fail closed for the
diagnostic field and never block affiliate navigation.

## Measurement boundary

This beacon is first-party diagnostic context only. Short.io remains the source
of truth for redirect clicks, and the Nord/TUNE partner report remains the
source of truth for conversions, payout and EPC. The beacon does not create a
conversion, claim a partner match or replace the required `Stat.affiliate_info1`
retention check.

## Verification

- Targeted ESLint: pass (0 errors).
- `npm run test:affiliate-attribution`: pass (4 attribution cases).
- `npm run audit:editorial`: **165/165** checks passed.
- `npm run test:measure-editorial`: pass (8 cases).
- `git diff --check`: pass.
