# Performance spot check

**Date:** 11 August 2026  
**Purpose:** follow up the three responses over two seconds in the full sitemap audit

The full audit still passed all 2,279 URLs. The three slower samples were retested three times each against production with a cold PowerShell request loop:

| Route | Samples (ms) | Median | Max |
|---|---:|---:|---:|
| `/th/best/vpn-gaming` | 1,299 · 866 · 788 | 866 ms | 1,299 ms |
| `/ja/compare/hotspot-shield-vs-urban-vpn` | 721 · 763 · 706 | 721 ms | 763 ms |
| `/nl/compare/ivpn-vs-ovpn` | 626 · 581 · 750 | 626 ms | 750 ms |

## Decision

No application change is warranted. The one-off values above two seconds are consistent with transient network or cache warm-up variance; all repeated samples stayed below two seconds, and the routes remained 200, indexable, self-canonical and one-H1 pages in the full sitemap audit.

The later full sitemap run on deployment `dpl_29jpAZt2okZsMSPVQAEQK5bPv1a5` surfaced three different one-off observations: `/fr/blog/is-vpn-legal` (939, 799, 563 ms; median 799 ms), `/blog/vpn-vs-proxy` (643, 513, 616 ms; median 616 ms) and `/reviews/urban-vpn` (657, 539, 571 ms; median 571 ms). Each returned HTTP 200 and all three rechecks remained below two seconds, so these remain observations rather than release blockers.
