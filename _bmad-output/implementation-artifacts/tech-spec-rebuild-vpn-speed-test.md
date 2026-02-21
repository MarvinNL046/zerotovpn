---
title: 'Rebuild VPN Speed Test'
slug: 'rebuild-vpn-speed-test'
created: '2026-02-21'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['next.js 16', 'react 19', 'typescript', 'tailwind v4', 'cloudflare speed api', 'shadcn/ui', 'next-intl', 'lucide-react']
files_to_modify: ['src/components/tools/speed-test-widget.tsx', 'src/app/[locale]/speed-test/page.tsx', 'src/messages/en.json', 'src/messages/nl.json', 'src/messages/de.json', 'src/messages/es.json', 'src/messages/fr.json', 'src/messages/zh.json', 'src/messages/ja.json', 'src/messages/ko.json', 'src/messages/th.json']
code_patterns: ['use client for interactive widget', 'useTranslations for i18n', 'cn() for conditional styles', 'generateAlternates for SEO', 'BreadcrumbSchema for structured data', 'cross-link to /guides/vpn-speed-guide/']
test_patterns: ['no test framework configured yet']
---

# Tech-Spec: Rebuild VPN Speed Test

**Created:** 2026-02-21

## Overview

### Problem Statement

The current speed test widget finishes in ~3 seconds total — too fast for accurate measurements. Download tests max at 25MB (done in ~2s on fast connections), upload tests max at 2MB (<1s), and ping only takes 10 samples. Results feel unreliable and the page has thin SEO content.

### Solution

Complete rebuild of the speed test widget and page. Realistic Cloudflare-based speed test with proper duration (~30 seconds total), multi-stream parallel testing, sustained measurement windows, professional design, and rich SEO content for organic traffic.

### Scope

**In Scope:**
- Rebuild speed test widget with realistic test duration (10-15s per phase)
- Multi-connection parallel downloads/uploads for accurate throughput
- Larger payloads with sustained measurement
- Professional visual design (theme-aware, animated gauge)
- SEO content sections (FAQ, interpretation guide, VPN speed impact)
- VPN comparison funnel (encourage test with/without VPN)
- i18n translations for all 9 locales

**Out of Scope:**
- Custom backend server (keep Cloudflare speed endpoints)
- Server-side result storage (keep localStorage)
- URL change (stays at /speed-test/)

## Context for Development

### Codebase Patterns

- Client components use `"use client"` directive at top
- Translations via `useTranslations("namespace")` from next-intl
- Styling with Tailwind CSS v4 + `cn()` utility
- SEO via `generateMetadata` + `generateAlternates()` from `@/lib/seo-utils`
- Icons from lucide-react
- UI components from shadcn/ui (Card, Button, etc.)
- Other tool widgets (IP checker, DNS leak) follow same pattern: `"use client"` component in `src/components/tools/`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/components/tools/speed-test-widget.tsx` | Current widget — full rewrite |
| `src/app/[locale]/speed-test/page.tsx` | Current page — rebuild with SEO content |
| `src/components/tools/ip-lookup-widget.tsx` | Reference: other tool widget pattern |
| `src/app/[locale]/guides/vpn-speed-guide/page.tsx` | Reference: SEO content structure, cross-link target |
| `src/messages/en.json` | English translations — `speedTest` namespace |
| `src/lib/seo-utils.ts` | `generateAlternates()` for canonical/hreflang |
| `src/components/seo/breadcrumb-schema.tsx` | Breadcrumb structured data |
| `src/lib/vpn-data.ts` | Static VPN data for "fastest VPNs" section |

### Technical Decisions

- **Cloudflare Speed API**: Keep using `speed.cloudflare.com/__down` and `__up` endpoints — free, reliable, global CDN
- **Multi-stream testing**: Use 4-6 parallel fetch streams for download, 3-4 for upload — mirrors how Ookla/Fast.com work
- **Time-based measurement**: Each phase runs for a fixed duration (10s download, 8s upload) rather than fixed payload size — ensures consistent test feel regardless of connection speed
- **Progressive payload sizing**: Start with small warmup chunk, then ramp up to 25-100MB chunks in parallel
- **Theme-aware design**: Widget respects light/dark mode — no hardcoded dark colors
- **Speedometer gauge**: SVG-based animated gauge with smooth needle animation using requestAnimationFrame

## Implementation Plan

### Tasks

- [x] Task 1: Rebuild the speed test engine (core measurement logic)
  - File: `src/components/tools/speed-test-widget.tsx` (full rewrite)
  - Action: Replace the entire widget with a new implementation:
    - **Ping measurement**: 20 samples with ICMP-like HEAD requests to `cloudflare.com/cdn-cgi/trace`, calculate median (not average — more resistant to outliers), standard deviation for jitter. Duration: ~3 seconds.
    - **Download measurement**: Time-based approach — run for 10 seconds total. Start with 1MB warmup, then spawn 6 parallel fetch streams to `speed.cloudflare.com/__down?bytes=25000000` (25MB each). Continuously measure throughput using `ReadableStream` byte counting. Report real-time speed every 250ms. Use sliding window (last 3 seconds) for stable speed calculation. Discard warmup data from final result.
    - **Upload measurement**: Time-based — run for 8 seconds. Start with 256KB warmup, then spawn 4 parallel POST streams to `speed.cloudflare.com/__up` with 2MB random payloads, continuously cycling new uploads. Report real-time speed every 250ms.
    - **State machine**: `idle` → `ping` → `download` → `upload` → `complete`. Each transition updates UI. AbortController for cancellation.
    - **Result storage**: localStorage key `speedTestHistory`, max 10 entries, each with: download, upload, ping, jitter, timestamp, ISP info (from Cloudflare trace).
  - Notes: The key difference from current impl is TIME-BASED testing with PARALLEL streams. Current impl sends sequential fixed-size requests which finishes too fast.

- [x] Task 2: Build the speedometer gauge UI component
  - File: `src/components/tools/speed-test-widget.tsx` (part of rewrite)
  - Action: Create a professional SVG speedometer gauge:
    - Semi-circular arc (180-270 degrees) with gradient from red → yellow → green
    - Animated needle using requestAnimationFrame with spring/ease-out physics
    - Scale markings: 0, 10, 25, 50, 100, 250, 500 Mbps (logarithmic scale for better visual distribution)
    - Center display: current speed in large text + "Mbps" label
    - Phase indicator below gauge: shows current test phase with progress
    - Theme-aware: uses CSS variables / Tailwind theme colors, not hardcoded slate-900
  - Notes: Logarithmic scale is important — linear makes 10Mbps look almost zero next to 500Mbps

- [x] Task 3: Build the results panel and history UI
  - File: `src/components/tools/speed-test-widget.tsx` (part of rewrite)
  - Action: After test completes, show results panel:
    - 4-column grid: Download (green), Upload (purple), Ping (cyan), Jitter (orange)
    - Speed rating badge: "Slow" (<10), "Moderate" (10-50), "Fast" (50-100), "Very Fast" (100+)
    - VPN comparison prompt: "Now connect your VPN and test again to compare!" with visual before/after comparison if 2+ results exist
    - Share button (Web Share API with clipboard fallback)
    - History section: last 5 tests with sparkline trend
    - Clear history button
  - Notes: VPN comparison is the conversion funnel — this drives users to try VPN affiliate links

- [x] Task 4: Rebuild the speed test page with SEO content
  - File: `src/app/[locale]/speed-test/page.tsx` (rebuild)
  - Action: Rebuild the page with rich SEO content:
    - **Hero**: Badge + H1 + subtitle (translated)
    - **Widget**: `<SpeedTestWidget />` component
    - **How It Works**: 3-step visual (1. Click Start, 2. Wait ~30s, 3. See Results) — builds trust
    - **Understanding Your Results**: Explain what download/upload/ping/jitter mean with speed tier table
    - **VPN Speed Impact section**: "How VPNs affect your speed" — explain 10-20% typical loss, why, and link to `/guides/vpn-speed-guide/`
    - **FAQ section**: 6-8 translated FAQ items with schema.org FAQPage JSON-LD
    - **Fastest VPNs section**: Top 3 VPNs sorted by speedScore with VpnCard components
    - **Breadcrumbs**: BreadcrumbSchema component
    - **Metadata**: generateMetadata with title, description, generateAlternates, OG tags
  - Notes: FAQ JSON-LD is critical for SEO — gives rich snippets in Google

- [x] Task 5: Add FAQ JSON-LD structured data
  - File: `src/app/[locale]/speed-test/page.tsx`
  - Action: Add FAQPage JSON-LD schema with translated FAQ items:
    ```tsx
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    }) }} />
    ```
  - Notes: Use translated FAQ items from `useTranslations("speedTest")`

- [x] Task 6: Update English translations
  - File: `src/messages/en.json`
  - Action: Replace the `speedTest` namespace with expanded translations covering:
    - Page metadata (title, description)
    - Widget UI strings (phases, buttons, results labels)
    - Speed tier labels (slow, moderate, fast, veryFast)
    - How It Works section (3 steps)
    - Understanding Results section (explanations for each metric)
    - VPN Impact section
    - FAQ items (6-8 Q&A pairs targeting SEO keywords like "what is a good internet speed", "does VPN slow down internet", "how to test VPN speed")
    - Fastest VPNs section heading
    - Share/history strings
    - VPN comparison prompt strings

- [x] Task 7: Update translations for remaining 8 locales
  - Files: `src/messages/nl.json`, `de.json`, `es.json`, `fr.json`, `zh.json`, `ja.json`, `ko.json`, `th.json`
  - Action: Translate the new `speedTest` namespace keys for each locale. Ensure FAQ items are naturally translated (not machine-translation quality).
  - Notes: Each locale file needs the same key structure as en.json speedTest namespace

### Acceptance Criteria

- [ ] AC 1: Given a user on any connection speed, when they click "Start", then the speed test runs for approximately 25-35 seconds total (3s ping + 10s download + 8s upload + transitions)
- [ ] AC 2: Given a fast connection (100+ Mbps), when download test runs, then 6 parallel streams are active and the reported speed is within 20% of actual bandwidth
- [ ] AC 3: Given the test is running, when the user clicks stop, then all fetch streams are aborted immediately and the UI resets to idle
- [ ] AC 4: Given the test completes, when results are shown, then download/upload/ping/jitter values are displayed with a speed rating badge
- [ ] AC 5: Given the test completes, when the user has no previous results, then a prompt appears suggesting "Connect your VPN and test again to compare"
- [ ] AC 6: Given the test completes twice, when results panel shows, then a before/after comparison is visible between the two most recent tests
- [ ] AC 7: Given the page is viewed in light mode, when the widget renders, then it uses theme-appropriate colors (no hardcoded dark backgrounds)
- [ ] AC 8: Given the page is viewed on mobile (< 768px), when the widget renders, then the gauge and results are fully responsive and usable
- [ ] AC 9: Given a search engine crawls `/speed-test/`, when the page is rendered, then FAQ JSON-LD structured data is present in the HTML
- [ ] AC 10: Given any of the 9 supported locales, when the page loads, then all visible text is translated (no English fallback visible)
- [ ] AC 11: Given the page loads, when viewing page source, then canonical URL uses `https://www.zerotovpn.com` and hreflang alternates exist for all 9 locales

## Additional Context

### Dependencies

- **Cloudflare Speed API**: `speed.cloudflare.com/__down` and `__up` — no API key needed, no rate limits documented, but be respectful with parallel stream count
- **Cloudflare Trace**: `cloudflare.com/cdn-cgi/trace` — returns plain text with IP, location, ISP info
- **No new npm packages needed** — everything uses existing dependencies (React, shadcn/ui, lucide-react, next-intl)

### Testing Strategy

- **Manual testing**: Run the speed test on slow (throttled to 10Mbps in DevTools), medium (50Mbps), and fast (100+ Mbps) connections to verify accuracy
- **Mobile testing**: Test on real mobile device or Chrome DevTools mobile emulation
- **i18n testing**: Verify `/nl/speed-test/` and `/ja/speed-test/` render translated content
- **Build verification**: `npm run build` must pass — no TypeScript errors, static generation works
- **SEO verification**: Check page source for FAQ JSON-LD, canonical URL, hreflang tags

### Notes

- **Cloudflare endpoint reliability**: These are the same endpoints Cloudflare's own speed.cloudflare.com uses — they're stable and globally distributed. However, they're undocumented public endpoints, not an official API. If they change, the widget breaks.
- **CORS**: Cloudflare speed endpoints allow cross-origin requests. No proxy needed.
- **Parallel stream count**: 6 download / 4 upload mirrors Ookla's approach. More streams = more accurate on high-bandwidth connections but more resource-intensive. Don't exceed 8 concurrent.
- **Logarithmic gauge scale**: Essential for UX — linear scale makes anything under 50Mbps look like nothing on a 500Mbps gauge. Use log scale so 10Mbps visually occupies ~30% of the arc.
- **localStorage quota**: 10 test results at ~200 bytes each = ~2KB. Well within 5MB localStorage limit.
