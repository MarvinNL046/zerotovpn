# ZeroToVPN browser-route check tool card

## Purpose

Current editorial screenshot for the Journal tools module. It shows the
ZeroToVPN browser-route check in its untouched English idle state. The image is
an interface capture, not evidence of a DNS resolver result, VPN detection or a
successful privacy test.

## Source and capture

- Canonical source route: `/tools/dns-leak-test`
- Source URL during capture:
  `http://127.0.0.1:3001/tools/dns-leak-test`
- Captured: 17 August 2026
- Locale: canonical locale-less English route (`html[lang="en"]` asserted)
- Browser: Playwright 1.57 with the installed Chromium or system-Chrome fallback
- Viewport: 1440 × 1000, light theme, reduced motion
- Element: `section[data-status="idle"]`
- Routine: `node scripts/capture-blog-lab-asset.mjs`
- Raw QA capture:
  `artifacts/visual-qa-blog-lab-current/dns-route-check--en--idle.png`

The routine asserts the English canonical URL, a successful HTTP response, the
idle state, and the visible boundary that this is not the resolver test itself.
It rejects a capture if sensitive result fields are present. The route check was
not started, so no public IP, network owner, approximate location or resolver
result was requested or rendered.

## Transform

The element screenshot is fitted without cropping to a 1200 × 675 canvas and
encoded as WebP at quality 86. No UI text is added, removed or altered in the
raster.

## Outputs

- Public path: `/images/blog/dns-route-check-tool-card-2026-08-17.webp`
- Repository path:
  `public/images/blog/dns-route-check-tool-card-2026-08-17.webp`
- Dimensions: 1200 × 675
- SHA-256:
  `76a5582fa4f4f99cc0c02e835d0bef040394d8788bc68fafa11d9d0d67183f66`

## Editorial boundary

- Safe claim: this screenshot shows the current English ZeroToVPN
  browser-route-check interface before the check starts.
- It does not show or prove a DNS resolver measurement.
- It does not show or prove a DNS leak, a leak-free connection, VPN use,
  anonymity or provider performance.
- Caption the asset as an English interface capture and keep the limitation
  visible in surrounding copy.
