# ZeroToVPN DNS leak-test tool card capture

- Capture date: 16 August 2026
- Status: approved dated ZeroToVPN interface capture

## Purpose

Editorial image for the English ZeroToVPN Journal and related internal links to
the DNS leak-test tool.

- Canonical source route: `/tools/dns-leak-test`.
- Captured source selector: `section#test`.
- Tool state: initial state, before pressing `Start DNS Leak Test`.
- Page language: English (`html[lang="en"]`).

## Source capture

- QA manifest:
  `artifacts/visual-qa-dns-tool/manifest.json`.
- Element capture:
  `artifacts/visual-qa-dns-tool/tools-dns-leak-test--en--section-test--desktop-1440--light.png`.
- Capture dimensions: 1216 x 594 pixels.
- File size: 45,041 bytes.
- SHA-256:
  `222BAA79647A53A0AFFD4F73431CB387B96008E6031BBC9525B62BF0241F74F1`.
- Method: Playwright 1.57 with the installed system Chrome browser, a 1440 x
  1000 desktop viewport, `en-US` locale, light colour scheme and reduced
  motion. Fixed overlays were hidden before capturing the complete
  `section#test` element.

The capture was made against the local English route after a successful visual
QA run. The page returned HTTP 200, used the expected locale-less canonical
URL, had one H1 and showed no horizontal overflow, error overlay or page
exception. One unrelated external request returned HTTP 403 in the source QA
run; it did not affect the tool card.

## Privacy inspection

The test was not started. The captured section contains no resolver result,
public IP address, ISP, account name, email address, token, credential, form
input or other personal data. The capture script also rejected the image when
an IP-shaped value, credential-shaped text or input control was present.

## Production derivative

- Public path: `/images/blog/dns-leak-test-tool-card-2026-08-16.webp`.
- Repository path:
  `public/images/blog/dns-leak-test-tool-card-2026-08-16.webp`.
- Dimensions: 1200 x 675 pixels (16:9).
- File size: 27,902 bytes.
- SHA-256:
  `BB40ECE13013F7DF0DE5D558D881F783A5968CFCE7F7E7FBA4550F1AA583AD64`.
- Mechanical transform: proportionally resized to fit within 1200 x 675,
  centred on a white canvas so the complete heading, explanation, tool card
  and start button remain visible, then encoded as WebP at quality 84, effort
  6. No UI content was cropped, rearranged or retouched.

## Editorial and evidence boundary

This is a dated screenshot of ZeroToVPN's own idle-state tool interface. It is
not a completed DNS test, live resolver output, provider comparison, product
test or evidence that a VPN prevents DNS leaks. Do not present the start screen
as a passing result. Any technical claim must remain in HTML and be supported
by separately documented research or a dated, reproducible test result.

Suggested English alt text:

> ZeroToVPN DNS leak test start screen with an orange shield and start button.
