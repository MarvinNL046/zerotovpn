# ZeroToVPN roadmap completion matrix

**Checked:** 12 August 2026  
**Source plan:** [ZeroToVPN Editorial & Conversion Roadmap](./zerotovpn-editorial-conversion-roadmap-2026-08-11.md)

This matrix separates delivered release work from the one measurement milestone that cannot be closed without real exports.

| Roadmap requirement | Status | Evidence |
| --- | --- | --- |
| Shared editorial template used on Best VPN and Iran pages | Complete | `src/components/editorial/best-vpn-editorial-template.tsx`; production editorial gate 22/22 |
| Page-level content brief contract across audited cluster pages | Complete | `src/lib/editorial-content-brief.ts` + centralized cluster map, live attributes on 10 distinct commercial/censorship/protocol/travel/free routes plus French/Dutch free-VPN variants, and [content-brief browser smoke](../metrics/content-brief-browser-smoke-2026-08-12.md); content-brief failure count 0 |
| First Iran editorial post published with evidence dossier, FAQ schema and compliant CTAs | Complete | `/blog/best-vpn-for-iran-2026-bypass-internet-censorship`; `docs/research/iran-vpn-editorial-brief-2026-08-11.md`; live cluster audit |
| At least five supporting cluster links live and reciprocal | Complete | `docs/metrics/cluster-link-audit-2026-08-12.md`: 21/21 canonical pages across 4 clusters, 0 missing required links |
| Search Console baseline captured before the content refresh | Complete | `docs/metrics/gsc-baseline-2026-08-11.md` and `zerotovpn-baseline-2026-08-11.json` |
| 14-day Search Console review completed | Complete | Real authenticated download for 28 Jul–10 Aug 2026 recorded in `docs/metrics/gsc-export-2026-08-12.md`; raw CSVs are retained in ignored `.cache/metrics/gsc-2026-08-12/` |
| Short.io click results joined to the same measurement window | Interim export; attribution incomplete | Real API export for 28 Jul–10 Aug 2026 is recorded in `docs/metrics/shortio-export-2026-08-12.md`; current-link CSV covers 39 links, while wildcard/deleted residual traffic remains deliberately unattributed |
| Partner conversions, revenue and EPC joined | Screenshot observation only; matched export pending | [Nord interim screenshot evidence](../metrics/nord-partner-interim-screenshot-2026-08-12.md) shows 19 clicks, 0 conversions, $0 payout and $0 EPC for 6–12 Aug. It does not match the 28 Jul–10 Aug GSC/Short.io window and is not a downloadable export; the measurement guard correctly keeps the row pending |
| No affiliate links on pages failing NordVPN context rules | Complete | `affiliate-context-audit-2026-08-12` checked 2,279/2,279 URLs and 8,189 links with zero hard compliance failures |
| Exit-intent popup remains owned-media email collection only | Complete | `npm run audit:editorial` newsletter guard; popup browser smoke; no provider/coupon/discount/incentive CTA |
| Deployment, browser QA and page-level compliance recorded | Complete | Latest production deployment `dpl_91UP9Vrwk8X1zVNfqbZdZHjTsjJ6`; editorial, sitemap and cluster-link evidence in `docs/metrics/` |

## Measurement gate

The roadmap should remain active until the three pending export rows are available and a matched report is generated with `npm run measure:editorial`. Do not convert fixture output into a KPI conclusion. Once the exports arrive:

1. Run `npm run measure:check-inputs` against all four files.
2. Run `npm run test:measure-editorial`.
3. Generate the post-14-day report with the fixed Search Console/Short.io/partner window.
4. Select the next 4–8 pages from measured cluster winners, not from historical volume alone.
