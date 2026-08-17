# NordVPN review detail — 80+ point audit

- **Page:** `http://127.0.0.1:3001/nl/reviews/nordvpn`
- **Audit date:** 14 August 2026
- **Canonical checklist:** `C:\Users\M_Smi\Projecten\obsidian-vault\On-page SEO — 80+ Point Checklist.md`
- **Rendered contract:** `scripts/review-detail-contract.mjs`
- **Runner:** `scripts/audit-review-detail.mjs`

This is a rendered-page audit, not a source-code keyword scan. It launches Chromium at desktop and mobile sizes, reads the live DOM and metadata, parses JSON-LD, downloads the rendered images, verifies their actual dimensions/format/weight, and reports every one of the 99 canonical checklist rows as `PASS`, `FAIL`, `MANUAL`, `N/A`, or `BLOCKED`.

## Latest rendered result

| Status | Count | Meaning |
|---|---:|---|
| PASS | 74 | Automatically verified in the rendered review template |
| FAIL | 0 | No applicable automated review-template requirement is failing |
| MANUAL | 7 | Requires editorial, evidence, keyboard, or visual judgement |
| N/A | 14 | Explicitly inapplicable to an individual affiliate review |
| BLOCKED | 4 | Evidence or owner verification is missing; the site must not invent it |
| **Total** | **99** | The complete review-detail contract |

Rendered measurements at this checkpoint:

- Title: **59 characters** (target 50–60).
- Meta description: **154 characters** (target 150–160).
- Main review: **4,802 rendered words**.
- DataForSEO/content-parsing target: **4,121–6,182 words**, the ±20% band around the measured top-three average.
- Visible FAQ: **8 questions**, including **7 exact current Dutch PAA questions**.
- Contextual internal links: **21 in body copy**; 68 internal article links including navigation and utilities.
- External article links: **27**, including **19 authoritative citations** and at least four non-provider citations.
- Hero rendition: WebP, **1,080×720**, **41,220 bytes**.
- Open Graph image: WebP, **1,200×630**, **57,264 bytes**.
- Twitter image: WebP, **1,200×600**, **55,170 bytes**.
- Rendered JSON-LD includes Article, Person, Organization, SoftwareApplication, BreadcrumbList, FAQPage and WebSite types.

The measurements can change while the dev server hot-reloads. The command output is authoritative for the current build.

The final combined gate completed successfully: the existing editorial audit passed **166/166**, followed by this rendered review contract at **74 PASS / 0 FAIL / 7 MANUAL / 14 N/A / 4 BLOCKED**.

The compact affiliate disclosure is now above the fold and before the first affiliate destination, the primary CTA is visible above the fold, and `#verdict` is included in the jump-link navigation.

## Automatic review-template gate

All applicable automatically measurable requirements now pass on the rendered Dutch review page. Review-owned newsletter inputs, consent controls, comparison cards and CTAs meet the 48×48 px touch target check at 390 px. The shared desktop header controls and visible breadcrumb targets were brought to the same minimum, and the rendered runner now reports **zero undersized shared-shell targets** and no unnamed shared-shell controls.

## Manual review ledger

These rows are intentionally not auto-passed:

1. Reading level is appropriate for Dutch readers.
2. Active voice is preferred consistently.
3. External source relevance matches the claim next to each citation.
4. Real stories, numbers and opinions match the underlying evidence dossier.
5. Publisher contact/identity details have been confirmed by the owner.
6. WCAG AA contrast is verified for normal, hover, dark, disabled and sticky states.
7. Focus indicators are visually verified by keyboard navigation.

Manual verification performed on 14 August 2026 records the following outcomes without changing the machine-readable status model:

- **Reading level:** accepted. The rendered Dutch copy averages approximately 16.6 words per sentence, and 98% of substantive paragraphs contain no more than four sentences.
- **Active voice:** accepted after editorial review. The bounded passive constructions primarily describe evidence state or provider documentation; they do not dominate the copy.
- **Source relevance:** accepted. The 19 authority citations were checked against their surrounding claim and section; provider claims remain visibly distinguished from independent standards and external assessments.
- **Numbers and opinions:** accepted for the current evidence boundary. Dated provider facts are labelled, current performance is explicitly marked as requiring a new test, and no unsupported benchmark score is published.
- **Contact identity:** remains owner-confirmation pending. The page may link to the existing contact route, but this audit does not claim that a mailbox, address or phone number was independently verified.
- **Contrast:** accepted in fresh light and dark browser contexts after fixing the dark review-header and sticky-navigation surfaces. The generated page no longer produces white-on-white review headings; the lime action color remains paired with navy text.
- **Focus visibility:** accepted. Keyboard traversal through the shared header, disclosure, primary CTA, methodology link and article navigation produces a solid 3 px blue outline with 3 px offset in light mode and a lime outline in dark mode.

Responsive browser verification covered 1,440×900, 1,280×720, 1,024×768 and 390×844. It found no horizontal overflow. On the 390×844 Dutch viewport the first affiliate CTA ends at 841 px, after a visible disclosure and inside the initial viewport. Soft navigation from Dutch to English updates the URL, content, canonical and `<html lang>` value.

## Evidence-gated blockers

Blocked is not a defect to hide. It means the checklist asks for something the project cannot honestly claim yet.

- **Product + Review + reviewRating schema:** always `BLOCKED` until a documented, reproducible scoring record exists. The runner never treats a marketing score or the legacy overall rating as a pass. Adding unsupported Review/Product/rating JSON-LD would not clear this row.
- **Author credentials:** blocked until Marvin confirms real qualifications, certifications or experience claims. Do not invent years or credentials.
- **First-person hands-on experience in the opening:** blocked until a fresh, documented platform test exists. The transparent “new test required” boundary is preferable to fabricated testing.
- **Owned social-channel follow button:** blocked until an actual ZeroToVPN-owned channel is verified. Do not create a fake Pinterest, YouTube or social identity solely to tick a box.

## Explicit N/A rows

LocalBusiness, Service, HowTo and roundup ItemList schema do not describe this page type. Service-business phone, testimonials, service area, business hours, address/map and similar lead-generation requirements are replaced by the affiliate/content-site conversion model. A Pinterest pin is not required for this non-visual niche, and the reading-progress bar is optional in the canonical checklist.

## Run locally or in CI

With the dev server running on port 3001:

```powershell
npm run audit:review-detail
```

Machine-readable output:

```powershell
npm run audit:review-detail -- --json
```

Audit another rendered URL:

```powershell
$env:REVIEW_DETAIL_AUDIT_URL='http://127.0.0.1:3001/en/reviews/nordvpn'
npm run audit:review-detail
```

The combined SEO gate is:

```powershell
npm run audit:seo:ci
```

`audit:seo:ci` runs the existing editorial safety audit first and this rendered 99-point review audit second. CI must start the Next.js server before invoking it. The command exits non-zero for `FAIL`; `MANUAL`, `N/A` and evidence-gated `BLOCKED` remain visible in the report but are not converted into fake passes.
