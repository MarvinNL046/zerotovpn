# Sitemap performance recheck — 12 August 2026

The full production sitemap audit checked **2,279/2,279** URLs. All returned HTTP 200, self-canonical, indexable and exactly one H1. Six samples exceeded two seconds during the concurrent sweep; each was rechecked three times sequentially.

| Sample group | Recheck range | Result |
| --- | ---: | --- |
| `/fr/compare/protonvpn-vs-x-vpn` | 289–619 ms | transient sweep outlier; healthy |
| `/compare/expressvpn-vs-vpn-unlimited` | 272–426 ms | transient sweep outlier; healthy |
| `/nl/compare/expressvpn-vs-vpn-unlimited` | 333–430 ms | transient sweep outlier; healthy |
| `/nl/countries/spain` | 333–494 ms | transient sweep outlier; healthy |
| `/es/countries/spain` | 239–486 ms | transient sweep outlier; healthy |
| `/ja/countries/spain` | 417–548 ms | transient sweep outlier; healthy |

No route or content change is justified by this sample. Full results: [sitemap-audit-2026-08-12.md](./sitemap-audit-2026-08-12.md).
