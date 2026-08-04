# ZeroToVPN evidence-led guide template

This is the default structure for country, device, and use-case VPN guides. It borrows the useful information architecture of high-performing commercial comparison pages while keeping ZeroToVPN's evidence and commercial-link boundaries intact.

## Standard page anatomy

1. Hero: one descriptive H1, breadcrumb, review-status badge, introduction, and a visible update/evidence note.
2. Quick summary: the current recommendation status and a link to methodology.
3. On-page navigation: anchor links on mobile and a sticky desktop sidebar.
4. Evidence matrix: a horizontal-scroll table with a sticky first column. Use evidence states (`Verified`, `Provider-stated`, `Needs test`, `Unknown`), never invented ratings, prices, or access promises.
5. Failure conditions: explicit stop rules before a reader compares providers.
6. Provider dossiers: cards are allowed to link to general provider reviews, but country-specific readiness must be stated separately. Never turn a pending dossier into a winner.
7. Reproducible test: numbered steps that capture device, network, protocol, date, reconnect, fallback, and support behavior.
8. Decision boundary: repeat the useful checklist CTA after the main research.
9. FAQ and related guides: answer the page's actual intent and create a topical cluster of relevant internal links.
10. Optional approved offer: only pass `featuredOffer` when the provider record is current and the server-side commercial resolver returns an approved destination. Otherwise the component renders no partner block.

## What we learned from VPNOverview

The reference page uses strong intent matching, a quick recommendation near the top, repeated calls to action, provider mini-tables, a comparison table, many contextual internal links, FAQ/related content, and a sticky sidebar. Its useful interaction patterns are now represented by the reusable component at `src/components/editorial/evidence-led-vpn-use-case-page.tsx`.

ZeroToVPN deliberately changes the comparison semantics: the matrix communicates evidence readiness rather than a sponsored score, and the sidebar's default action goes to the VPN Choice Helper. This preserves conversion opportunities without allowing stale or unverified affiliate claims to look like editorial findings.

## Authoring checklist

- Keep one clear search intent per route and use descriptive anchor IDs.
- Add at least three genuinely relevant cluster links; do not pad the page with navigation noise.
- Give every table a caption and row/column headers; keep it horizontally scrollable on small screens.
- Repeat the safe decision CTA after the summary and after the methodology.
- Add provider affiliate CTAs only through `AffiliateButton`; never hardcode a destination URL in page content.
- Keep country-specific observations dated and reproducible. A general provider review is not proof of access in a country.
- Re-run editorial claim audits, typecheck, lint, build, and a rendered HTML audit after changes.
