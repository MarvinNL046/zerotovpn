# Proton VPN vs AirVPN staged comparison browser smoke

**Date:** 13 August 2026  
**Surface:** local Next.js dev server at `http://localhost:3001/compare/protonvpn-vs-airvpn`  
**Scope:** staged English renderer only; this route is not in `LINKED_COMPARISONS` or the sitemap.

## Observed output

- The route rendered the evidence-led title **“Proton VPN vs AirVPN (August 2026): Privacy, Price and Port Forwarding”**.
- Exactly one `h1` was present.
- The page exposed the decision, criteria, verification, FAQ and sources sections.
- One semantic comparison table was present with a caption, scoped column headers and scoped row headers.
- FAQ JSON-LD was present.
- Two commercial links resolved through `https://go.zerotovpn.com/protonvpn`; both exposed `rel="noopener noreferrer sponsored nofollow"`.
- No AirVPN affiliate destination was present. AirVPN was linked only to its review and first-party evidence pages.
- No error marker was present and the measured document width matched the viewport width (`2545px` each in the desktop smoke).
- The staged route is marked `noindex, follow` while it remains outside the sitemap and production editorial gate.

## Interpretation

The pair-renderer gate is locally satisfied: the legacy score/winner/streaming-claim renderer is bypassed for the English ProtonVPN/AirVPN pair and the staged page uses bounded evidence language. This is a local implementation check, not a production deployment or a conversion result. The page must remain outside the sitemap until the Nord sub-ID field is confirmed and the production editorial/live gates explicitly include the route.
