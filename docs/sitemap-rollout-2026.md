# ZeroToVPN Sitemap Rollout 2026

## Goal
Align `zerotovpn.com` URL structure with the target authority sitemap while preserving existing content and SEO equity.

## Phase Status
- Phase 1: URL gap mapping -> completed
- Phase 2: Legacy URL compatibility redirects (301) -> completed
- Phase 3: Priority native pages (replace redirects where needed) -> in progress
: Native pages shipped for `/editorial-policy`, `/how-we-test`, `/best-vpn-for-digital-nomads`, `/best-no-log-vpn`, `/are-vpns-safe`.
- Phase 4: Internal linking and nav alignment -> in progress
- Phase 5: Final QA and publish checklist -> pending

## Implemented in this rollout
All missing target URLs now resolve via static locale-aware redirect routes under `src/app/[locale]/...`.

Examples:
- `/best-vpn` -> `/best/best-vpn`
- `/best-vpn-for-netflix` -> `/best/vpn-netflix`
- `/best-vpn-for-digital-nomads` -> `/best/vpn-bali`
- `/vpn-for-uk` -> `/countries/united-kingdom`
- `/vpn-index/2026` -> `/reports/vpn-transparency-performance-index-2026`
- `/editorial-policy` -> `/about`
- `/how-we-test` -> `/methodology`
- `/disclosure` -> `/affiliate-disclosure`

## Notes
- Redirects are implemented as `permanentRedirect` in app-router pages, locale-aware.
- Existing canonical content URLs remain unchanged for now.
- Next step is to convert key redirect routes (e.g. editorial-policy, digital nomads, no-log policy) into dedicated canonical pages.
