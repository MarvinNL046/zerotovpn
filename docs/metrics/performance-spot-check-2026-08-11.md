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
