# ZeroToVPN editorial, SEO & affiliate conversion roadmap

**Version:** 1.0 — 11 August 2026  
**Scope:** editorial templates, topical authority, organic CTR and compliant affiliate conversion  
**Primary references:**

- `C:\Users\M_Smi\Projecten\obsidian-vault\On-page SEO — 80+ Point Checklist.md`
- `C:\Projecten\zerotovpn\docs\research\tomsguide-best-vpn-page-analysis-2026-08-11.md`
- `C:\Projecten\zerotovpn\docs\plans\zerotovpn-masterplan-2026.md`

## Current status — 13 August 2026

**Release state:** live and technically green. The latest production checks cover 26/26 editorial targets with 143 compliant affiliate links, zero missing affiliate `rel`/slug attributes, zero disclosure failures, zero cluster-link/content-brief/social-image failures and zero fetch failures. The latest full affiliate-context audit checked 2,271/2,271 sitemap URLs, including 1,755 affiliate pages and 8,799 tracked links, with zero slow responses or functional failures. A separate full sitemap audit returned HTTP 200 for all 2,271 URLs with zero noindex, canonical or H1 problems (one transient slow response in the earlier run). Its 11 raw contextual matches are classified in [the manual review](../compliance/nordvpn-contextual-flag-review-2026-08-13.md), not treated as hidden exceptions.

**Editorial state:** the shared Tom’s Guide-inspired comparison architecture, evidence blocks, inline tracked prices, branded provider marks, captions/table semantics, cluster links, localized free-VPN pages and email-only exit-intent prompt are implemented and deployed. No new URL batch should be published while the next measurement join is incomplete.

**Measurement state:** the real Search Console and Short.io inputs for **28 July–10 August 2026** are retained and documented. The partner conversion/revenue/EPC input is still missing; the user-supplied Nord dashboard screenshot is only a non-matching **6–12 August** observation (19 clicks, 0 conversions, $0 payout, $0 EPC). The roadmap therefore remains active until an authenticated Nord export for the shared window passes the input and date guards and produces a matched `measure:editorial` report.

**Next action:** obtain the dated Nord partner export, run the commands in the completion matrix, then use the joined cluster report to choose the next 4–8 existing-page improvements. Until then, preserve the current production copy and treat DataForSEO as hypothesis support rather than a reason to create thin variants.

## Execution log

- **12 August 2026 — shared quick-pick template refinement:** Updated `EditorialQuickPickCard`, used by the Best VPN and Iran editorial surfaces, to show the provider's branded logo with meaningful alt text and an explicit plan/refund context line below the tracked price. This follows the Tom's Guide top-3 pattern while keeping the amount a transparent catalog value and the CTA compliant. The shared editorial guard now requires the provider mark and plan context; local checks pass **47/47**, targeted ESLint passes and the full Webpack build remains **4,447 routes**.

- **12 August 2026 — quick-pick production release:** Commit `8c600ac` deployed to Vercel production as `dpl_HCk1MiiaCm7ZTw7Q6AiBNx4jwwxM` and aliased to `https://www.zerotovpn.com`. A live browser check of `/best/best-vpn` confirmed one H1, three branded provider logo images with alt text, three plan/refund context lines, clickable prices and provider CTAs, the comparison table and the early disclosure/jump navigation.

- **12 August 2026 — partner export remains gated by authentication:** The Nord affiliate dashboard resolves to its login screen in the available browser session. No partner CSV/API response was accessible, so conversions, revenue and EPC remain `null`; the roadmap does not infer them from Short.io clicks. The next required input is a same-window Nord partner export after an authenticated dashboard session.

- **12 August 2026 — real Short.io API export captured:** Used the production `SHORTIO_API_KEY` through Vercel's environment runner to export the 28 July–10 August window. Domain totals are **7,663 clicks / 3,008 human clicks**; the current-link attribution CSV covers **39 links / 2,241 clicks / 1,791 human clicks**. The **5,422-click** residual is kept separate because Short.io reports wildcard/deleted paths that cannot be mapped to current page slugs. Evidence: [shortio-export-2026-08-12.md](../metrics/shortio-export-2026-08-12.md); reusable exporter: `scripts/export-shortio-metrics.mjs`. Partner conversions/revenue/EPC remain missing, so the formal conversion gate stays open.

- **12 August 2026 — real-export header validation:** The measurement input checker now recognizes Search Console's plural `Top queries` export header and validates the authoritative Chart.csv shape. The authenticated Pages, Queries and Chart files pass header validation; `npm run test:measure-editorial` remains green.

- **12 August 2026 — real Search Console export captured:** Downloaded the authenticated `sc-domain:zerotovpn.com` Web-search export for **28 July–10 August 2026**. `Chart.csv` reports **93 clicks**, **36,763 impressions**, **0.253% CTR** and impression-weighted average position **33.42**. The 1,000-row Pages and Queries files are retained in ignored `.cache/metrics/gsc-2026-08-12/` and documented in [gsc-export-2026-08-12.md](../metrics/gsc-export-2026-08-12.md). The Search Console row in the completion matrix is now complete; Short.io and partner exports remain required before page selection or conversion conclusions.

- **12 August 2026 — exit-intent email collection confirmed:** The exit-intent dialog remains enabled as a first-party email/newsletter prompt. Added an explicit `data-email-collection-only="true"` contract to the dialog and extended the editorial guard so future changes fail if that marker, the newsletter source or the email-only copy contract disappears. The dialog contains no provider link, affiliate URL, coupon, discount, cashback, incentive or deal CTA. Commit `8201361` is pushed to `main`; Vercel production deployment `dpl_Ed7mHmrjYSwmWngmpi8bqxHEP6uf` is Ready. `npm run audit:editorial` passes **46/46**.

- **12 August 2026 — shared ranking-row price links:** Added an opt-in `priceLink` prop to `RankedVpnRow` and enabled it on the genuine commercial comparison routes `/best/vpn-streaming`, `/best/vpn-netflix` and `/best/vpn-firestick`. The torrenting route intentionally keeps its existing empty affiliate boundary and is guarded against accidental price linking. Local editorial checks pass **46/46** and the full Webpack build generates **4,447 routes**. Production deployment `dpl_F6ZyMUe1hpdn69y1L7R6xowDMvCY` is Ready; live HTML shows 13 affiliate nodes on each enabled route and none on the bounded torrenting route. The post-deploy gate remains **22/22**, and the full affiliate audit reports **2,279/2,279** URLs, **8,450** links, 0 missing-rel pages, 0 disclosure failures, 0 interruptive markers and 0 fetch failures.

- **12 August 2026 — cheap-VPN conversion pass:** Added tracked inline price links to the five ranked rows and five comparison-table prices on `/best/vpn-cheap`, using the shared `AffiliateTextLink` component. Added a regression guard so the page cannot lose its price-link contract. Local editorial checks now pass **44/44** and the full Webpack build generates **4,447 routes**. Production deployment `dpl_CYLb5e9X4cQ9shXTVJ69coau7y9o` is Ready; live browser QA confirmed one H1, ten price links, zero affiliate-rel violations, no horizontal overflow and no application error. The full affiliate-context audit checked **2,279/2,279** URLs and **8,315** links with **0** missing-rel pages, **0** disclosure failures, **0** interruptive markers and **0** fetch failures. The newsletter exit-intent remains email-only.

- **12 August 2026 — free-trial intent refinement:** Added Article JSON-LD with a dated modification signal to `/best/vpn-free-trial` and a contextual link to the evidence-led `/best/free-vpn` comparison in the permanent-free-plan section. The page remains affiliate-contextual and source-led; the exit-intent popup remains enabled exclusively for first-party email collection. Targeted ESLint, `npm run audit:editorial` (**43/43**) and the full Webpack build (**4,447 routes**) pass.

- **12 August 2026 — free-trial release:** Commit `152b5d5` deployed to Vercel production as `dpl_CMM4QwDiS5czQ9BMAgaqTjQ9CbAJ` (Ready). Live `/best/vpn-free-trial` returns HTTP 200, one H1, Article JSON-LD with `dateModified: 2026-08-12`, and the contextual `/best/free-vpn` links. The post-deploy editorial gate remains **22/22** with 123 affiliate links and zero metadata, freshness, schema-date, image, rel, slug or cluster-link failures. The popup policy remains newsletter-only; no provider links are present inside the popup.

- **12 August 2026 — inline price conversion:** Added four contextual price links to `/best/vpn-free-trial` using the shared `AffiliateTextLink` contract, so each visible plan price is a tracked `sponsored nofollow` link alongside the primary provider CTA. Local ESLint, the **43/43** editorial suite and the full **4,447-route** build pass. Production deployment `dpl_2U8VZxKdmM98estNDvZ9yFjB41dg` is Ready; live HTML returns HTTP 200, one H1 and four price links, while the post-deploy gate passes **22/22** with **127** affiliate links and zero rel, slug, metadata, image, freshness, schema-date or cluster-link failures. A live browser check confirmed one H1, four price links, no horizontal overflow and zero anchors inside the newsletter popup.

- **12 August 2026:** Removed the retired localized free-VPN implementation and its serialized translation payload. `/best/free-vpn`, `/fr/best/free-vpn` and `/nl/best/free-vpn` now expose the same evidence-led structure and locale-correct Article JSON-LD URLs; production HTML contains no legacy percentage/test-count claims. Local editorial checks pass **19/19**, the live editorial gate passes **15/15** with 94 affiliate links and zero metadata, freshness, schema, image, rel, slug or cluster-link failures. Deployment `dpl_4o7n2NxeqyjYNcV1dGAvxZdXB4c9` is Ready and aliased to `https://www.zerotovpn.com`. The full post-deploy audits remain healthy: **2,279/2,279** sitemap URLs and **1,755 pages / 8,189 affiliate links**, with zero technical policy or fetch failures. Evidence: [editorial-live-audit-2026-08-11.md](../metrics/editorial-live-audit-2026-08-11.md), [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md), [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).

- **12 August 2026 — measurement gate (historical pre-export checkpoint):** Re-ran the production editorial, sitemap and affiliate-context audits after the free-VPN cleanup; all three remained green (**15/15**, **2,279/2,279**, and **1,755 pages / 8,189 affiliate links**, with zero technical failures). At that earlier checkpoint the local metrics folder still contained only explicitly named fixture exports. The later authenticated Pages, Queries, Chart and Short.io exports are now recorded separately; the next 4–8 page selection remains paused until the matched Nord partner export is available. The review checkpoint is **25 August 2026**. The exit-intent popup remains enabled only as a first-party email/newsletter prompt. A production browser smoke confirmed the dialog contains the email form and dismiss controls but zero anchor elements: [exit-intent-popup-browser-smoke-2026-08-12.md](../metrics/exit-intent-popup-browser-smoke-2026-08-12.md).

- **12 August 2026 — DataForSEO pipeline gate:** Added tracked `DATAFORSEO_BASE64`, `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` placeholders to `.env.example` and a `npm run seo:smoke` command that correctly unwraps the Labs response. Using the existing local credentials only in the process, the smoke call returned real values for `yoga mat`: search volume **110,000**, keyword difficulty **37**, intent **transactional**; no secret was copied into the repository. The editorial and measurement regression suites still pass.

- **12 August 2026 — homepage evidence gate:** Replaced the unsupported homepage trust strip (`50+` tested, `100K+` readers, `500+` speed tests and `24/7` updated) with four verifiable signals: current comparison count, transparency-report year, methodology/test-plan availability and current review month. Removed the retired trust-indicator messages from the client bundle and added a regression guard. Local editorial checks pass **20/20**, the Webpack build generates **4,447 routes**, and production deployment `dpl_EkqaBrXwacJyHZxmz8gEFMRjBN8j` is Ready and aliased to `https://www.zerotovpn.com`. A live `/` and `/nl` smoke confirms the old labels and serialized `trustIndicators` key are absent; desktop and 390px browser checks show one H1 and no horizontal overflow. Evidence: [homepage-evidence-signals-smoke-2026-08-12.md](../metrics/homepage-evidence-signals-smoke-2026-08-12.md).

- **11 August 2026:** Re-ran the current production release gates against `https://www.zerotovpn.com`. The local editorial guard passes **17/17** and the live editorial gate passes **13/13** with 88 affiliate links, 0 missing `sponsored nofollow`/slug attributes, 0 missing cluster links, 0 metadata, freshness, schema-date, social-image or image-SEO failures. The full sitemap audit passes **2,279/2,279** URLs (HTTP 200, indexable, self-canonical and one H1); the affiliate-context audit passes **1,755 affiliate pages / 8,213 links** with 0 missing rel, disclosure, interruptive or fetch failures and 12 already-classified manual review flags. Evidence: [editorial-live-audit-2026-08-11.md](../metrics/editorial-live-audit-2026-08-11.md), [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md), [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).

- **11 August 2026:** Cleared the repository release checks: `npm run lint` now exits successfully with warnings only, and the full 4,447-route production build passes with TypeScript and static generation. The build script now uses Next's Webpack builder because the local Turbopack font loader intermittently fails on external Google-font fetches; this keeps the required `npm run build` gate deterministic without changing the rendered font configuration.

- **11 August 2026:** Deployed commit `2cb3032` to Vercel production as `dpl_6prSSJ1ESSTgKrYTUvdBG8bavjbq`. The remote Webpack build completed all **4,447** routes successfully and the production alias remains `https://www.zerotovpn.com`; the deployment is Ready.

- **11 August 2026:** Audited the localized free-VPN routes against the same evidence standard as the English pillar. The old translated metadata and body contained unsupported percentage/test-count/universal-safety claims, so all locales now use the evidence-led free-tier template with locale-correct Article JSON-LD URLs until separately translated copy passes the claim audit. Added French and Dutch representatives to the live gate; no new URLs were created.

- **11 August 2026:** Ran a real 390px Chrome smoke test on /countries/iran and /. Both routes rendered with HTTP 200, one H1, no horizontal overflow, no framework error overlay and no page errors. The test caught and fixed a removed /best breadcrumb prefetch plus a locale-dependent homepage number formatter that caused a React hydration warning. Evidence: [mobile-browser-smoke-2026-08-11.md](../metrics/mobile-browser-smoke-2026-08-11.md); deployment dpl_Hqx6frvFzixrTptRBYp6Wo56BMbt is Ready.

- **11 August 2026:** Hardened the newsletter-only exit-intent guard: `npm run audit:editorial` now checks the popup component and verifies that every locale's rendered popup title/subtitle remains free of affiliate, deal, coupon, discount, promotion, cashback and incentive language. The guard passes **16/16** checks.

- **11 August 2026:** Extended the affiliate click beacon with the Short.io path (`affiliateSlug`) while preserving the existing page path, provider ID and referrer fields. The shared affiliate links also expose `data-affiliate-slug` for browser QA; the production build still generates **4,447 routes** and the editorial audit remains **16/16**.

- **11 August 2026:** Verified the slug attribute in production HTML and fixed its SSR/client determinism so the attribute is present before hydration. Deployment `dpl_CMMgm7paQ9NLnzRfwFegxhWxrKE6` is Ready; the post-deploy editorial live gate passes **12/12** with 81 affiliate links, 0 missing rel attributes, 0 missing cluster links and 0 metadata/image/schema failures.

- **11 August 2026:** Ran a production Chrome/Playwright click smoke test. The first affiliate link rendered the `nordvpn` slug before hydration, preserved `sponsored nofollow`, and emitted a beacon with `vpnId`, `affiliateSlug` and `/nl/best/best-vpn`; there were 0 first-party HTTP errors and no framework overlay. Evidence: [affiliate-telemetry-browser-smoke-2026-08-11.md](../metrics/affiliate-telemetry-browser-smoke-2026-08-11.md).

- **11 August 2026:** Rechecked the three sitemap responses that exceeded two seconds. Three production samples per route all stayed below 1.3 seconds (medians 0.63–0.87 s), so no content or routing change is justified. Evidence: [performance-spot-check-2026-08-11.md](../metrics/performance-spot-check-2026-08-11.md).

- **11 August 2026:** Promoted Short.io slug telemetry into `npm run audit:editorial-live` and fixed the homepage's standalone NordVPN CTA to use the shared tracked affiliate component. Deployment `dpl_HTvYv9Yoa8gzqM8TMwmxHrd1vyWw` is Ready; the live gate passes **12/12**, checking 81 affiliate links with 0 missing `sponsored nofollow` attributes and 0 missing slug attributes.

- **11 August 2026:** Replaced the homepage's stale “38+ VPNs / ranks #1 / 94% speed retention / 4.8 rating” block with a catalog-labelled, evidence-bounded shortlist explanation and dynamic catalog fields. Deployment `dpl_HA3GP8hobZH4L6yyFht3XRYvUxKc` is Ready; production HTML contains the new copy and no old claims. A 390px Chrome smoke test passes with no overflow or errors. Evidence: [homepage-claims-browser-smoke-2026-08-11.md](../metrics/homepage-claims-browser-smoke-2026-08-11.md).

- **11 August 2026:** Added a freshness gate to `npm run audit:editorial-live`: every non-homepage commercial/cluster target must expose a visible updated/reviewed signal or `dateModified` structured data. The current production audit passes **12/12** with `freshnessFailureCount: 0`.

- **11 August 2026:** Made `npm run measure:editorial` cluster-aware for the next review. Reports now group Search Console pages/queries into the roadmap clusters and group Short.io/partner rows by link slug, with regression coverage for censorship, commercial-pillar and NordVPN slug totals. No new URLs are being selected until the real 14-day exports are available.

- **11 August 2026:** Resolved the CactusVPN manual affiliate-context flag by separating a time-limited provider trial from a permanent free tier. The provider record now uses qualified copy, `freeTier: false` and a dated first-party evidence note. Production deployment `dpl_3BrpErvcnu1EBDQ34ZBw76PTdbcK` is Ready; the post-deploy audit reduced active promotion-term flags from **21 to 12** while keeping 0 missing-rel, disclosure, interruptive or fetch failures.

- **11 August 2026:** Added `/best/vpn-free-trial` to the formal live editorial gate. The page now exposes a visible review date, methodology link, source anchor and shared social-image metadata; the gate will prevent future trial/commercial changes from bypassing the same release checks as the main pillar.

- **11 August 2026:** Deployed the free-trial gate changes in `dpl_29jpAZt2okZsMSPVQAEQK5bPv1a5`. Production HTML exposes the review date, methodology link, source anchor, one H1 and seven slug-attributed affiliate links; the live editorial gate now passes **13/13** with 88 affiliate links and 0 metadata, freshness, rel, slug, cluster-link or social-image failures.

- **11 August 2026:** Re-ran the full sitemap audit after the free-trial deployment: **2,279/2,279** URLs returned 200, indexable, self-canonical and one H1, with 0 failures. Three transient responses over two seconds were rechecked three times each and all stayed below two seconds; evidence is in [performance-spot-check-2026-08-11.md](../metrics/performance-spot-check-2026-08-11.md).

- **11 August 2026:** Removed the stale hard-coded 25 July table/source date from the free-trial comparison; each row now points to its own checked source date while the page carries the current 11 August review signal. Deployment `dpl_2dCnKaoLEuAdTPNy75F1XdPufDuF` is Ready and the live editorial gate remains **13/13**.

- **11 August 2026:** Extracted `BestVpnEditorialTemplate` and `EditorialQuickPickCard` into `src/components/editorial/best-vpn-editorial-template.tsx`, then refactored the Best VPN page and dynamic blog route to use the shared disclosure/jump-nav pattern. ESLint, production build and local browser checks pass.
- **11 August 2026:** Added the [Iran editorial brief](../research/iran-vpn-editorial-brief-2026-08-11.md) with the research fields, evidence boundary, internal-link map and affiliate compliance gates for the first content refresh.
- **11 August 2026:** Ran the first cached DataForSEO US/English pass for the Iran cluster: keyword overview, related suggestions, five SERP/PAA samples and competitor domains. Results are recorded in `docs/research/dataforseo-iran-cluster-2026-08-11.{json,md}`; missing current volume is explicitly not treated as zero demand.
- **11 August 2026:** Replaced the stale English Iran article body with an evidence-bounded editorial version, added official-source citations, PAA FAQ schema, reciprocal censorship-cluster links and a contextual NordVPN/Surfshark/ProtonVPN shortlist. Local browser QA confirmed six sponsored/no-follow CTA links and no overflow; production deployment `dpl_ECe2WSNo7qccAHtAxG8nrh4d5Qrh` is Ready and live at `https://www.zerotovpn.com/blog/best-vpn-for-iran-2026-bypass-internet-censorship`.
- **11 August 2026:** Audited and refreshed the Telegram supporting page using a new DataForSEO dossier and Telegram's official MTProxy documentation. The new version separates account blocks from network filtering, compares MTProxy/SOCKS5/VPN scope, adds feature-specific test steps, FAQ schema, reciprocal country/protocol links and contextual provider CTAs. Local browser QA passes; deployment follows after the release gate.
- **11 August 2026:** Audited the Russia country page with a new DataForSEO dossier and replaced the English route's stale claim-heavy layout with a shared evidence-led editorial shell. It now uses dated Freedom House context, a decision table, bounded test plan, reciprocal Iran/Telegram/China links, FAQ schema and a contextual shortlist. Desktop and 390px browser checks pass; deployment follows after the release gate.
- **11 August 2026:** Audited the China country page with a new DataForSEO dossier and replaced the English route's stale provider-success and legal-certainty claims with a shared evidence-led editorial shell. It now uses dated Freedom House and travel guidance, a decision table, bounded test plan, reciprocal cluster links, FAQ schema and contextual provider CTAs. Release QA is next.
- **11 August 2026:** Built and deployed the protocol support page at `/guides/vpn-protocols-explained` from a fresh DataForSEO dossier. The page targets the strongest current signals (`wireguard vs openvpn` and `openvpn tcp vs udp`), adds decision cards, a comparison table, bounded obfuscation guidance, a reproducible test plan, PAA FAQ schema, official sources and reciprocal links to Iran/Russia/China/Telegram. Added `npm run audit:editorial`; all six editorial/compliance checks pass. Local and production desktop/390px browser checks pass with six sponsored/no-follow CTAs and no overflow. Production deployment: `dpl_GkosyHK3BhG4XekdRyvc45YTND39`.
- **11 August 2026:** Converted the supplied Search Console, AI-visibility, indexing and Short.io screenshots into the [performance baseline and next-pillar gate](./zerotovpn-performance-baseline-2026-08-11.md). The next commercial pillar is `/best/best-vpn`: it already has hub-level visibility, but the current implementation still contains stale test counts, speed/coverage figures and universal legal/access wording that must be qualified or sourced before the next release.
- **11 August 2026:** Rebuilt the English `/best/best-vpn` pillar with the shared Tom's Guide-style top-three cards, contextual clickable prices, provider dossiers, a decision table, bounded methodology, cluster links, FAQ schema and freshness labels. Local and production desktop/390px checks pass with no overflow; the page no longer renders the stale `6,730 Mbps`/`35+ VPNs` claims. Commit `dcb0892` is pushed and production deployment `dpl_81gHiJq265MZu1VAzgkX8RQWedHz` is Ready and aliased to `https://www.zerotovpn.com`.
- **11 August 2026:** Added a machine-readable screenshot baseline at `docs/metrics/zerotovpn-baseline-2026-08-11.json`, CSV measurement importer `npm run measure:editorial`, and operator instructions in `docs/metrics/README.md`. A localized-header fixture run produced normalized CTR and click deltas successfully; no conversion/EPC values were invented.
- **11 August 2026:** Added and deployed the canonical English supporting page `/guides/vpn-obfuscation-explained` from the protocol DataForSEO/PAA brief. It answers what obfuscation does, what it cannot promise, platform/protocol evidence to save, a bounded test plan, FAQ schema and links back to the censorship and protocol clusters. Local and production desktop/390px browser checks pass with six compliant CTA links and no overflow. Production deployment: `dpl_EcSFxP2Cf4pPQATAtjLmucfVpAUp`.
- **11 August 2026:** Added and deployed `/guides/vpn-for-restricted-networks` from a fresh DataForSEO restricted-network/PAA brief. The page classifies Wi-Fi, ISP, country-level and account restrictions; adds lawful preparation guidance, a bounded test plan, FAQ schema, dated Freedom House context and reciprocal cluster links. Local and production desktop/390px browser checks pass with six compliant CTA links, disclosure, all section anchors and no horizontal overflow. Commit `3e1109a`; production deployment `dpl_DSv98yEqxrXvH2tpHkgHGHmjrU4V` is Ready at `https://www.zerotovpn.com/guides/vpn-for-restricted-networks`.
- **11 August 2026:** Replaced the English `/guides/vpn-for-travel` route with an evidence-led travel page after a fresh DataForSEO dossier. Removed absolute access, “essential as your passport”, guaranteed-savings and “VPN required” claims; added official State Department/CISA/GOV.UK sources, pre-departure preparation, a decision table, FAQ schema and reciprocal restricted-network links. Local and production desktop/390px browser checks pass with six compliant CTA links, disclosure and no overflow. Commit `35fd8ec`; production deployment `dpl_2LRsmKEKeAbDwXqAWByG5V7ph1om` is Ready at `https://www.zerotovpn.com/guides/vpn-for-travel`.
- **11 August 2026:** Replaced the English `/best/free-vpn` route with an evidence-led free-tier comparison after a DataForSEO dossier. Removed the unsupported “99% sell your data” and blanket streaming/access claims; added first-party Proton/Windscribe/TunnelBear plan links, free-tier boundaries, a safety checklist, FAQ schema and contextual paid-upgrade guidance. Local and production desktop/390px browser checks pass with three compliant CTA links, disclosure and no overflow. Commits `64dd1b7`/`f8e9d50`; production deployment `dpl_FCWYCQWCCFYxMBBR879S6KS5XHDA` is Ready at `https://www.zerotovpn.com/best/free-vpn`.
- **11 August 2026:** Ran the new `npm run audit:sitemap` against all 2,285 live sitemap URLs. Before the fix, 2,277 were healthy and 8 localized Iran URLs were incorrectly `noindex` in the sitemap; all URLs otherwise returned 200, self-canonical and one H1. Updated locale-aware route detection so English obfuscation/restricted-network pages are included while noindex translations are excluded. The corrected generator now emits 90 static paths and filters the locale exceptions in `src/app/sitemap.ts`; rerun the full audit after deployment as the release gate.
- **11 August 2026:** Deployed the locale-aware sitemap fix in production (`dpl_GJ2MjSYGreN4u2W3vTT9e8zHrbjH`, commit `0d347fa`). The post-deploy audit checked 2,279 live sitemap URLs: 2,279 returned 200, were self-canonical, indexable and had exactly one H1; no noindex-in-sitemap or canonical mismatches remain. One localized disclosure page exceeded two seconds (2.18s) and is retained as a performance observation, not an indexation failure. Full evidence: [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md).
- **11 August 2026:** Kept the exit-intent component as an owned newsletter-consent prompt only. It contains no provider, affiliate link, coupon, discount, incentive or deal CTA; the NordVPN rule is therefore applied to affiliate advertising, while the email prompt remains a separate first-party lead-capture surface.
- **11 August 2026:** Added `npm run audit:affiliate-context` and normalized legacy blog/source links so every live affiliate anchor carries `sponsored nofollow`. After deployment `dpl_BRHMGyKdzcKdUMEgD7YayVowvh6X`, the full 2,279-URL audit found 1,756 affiliate pages and 8,216 links with **0 missing-rel pages, 0 missing-disclosure pages, 0 interruptive-promotion markers and 0 fetch failures**. The initial 32 promotion-term flags were reduced to 22 after removing unverified percentage-off CTA language; the remaining flags are editorial free-trial/incentive wording in dedicated comparison or educational contexts and remain manual-review items, not automatic violations. Evidence: [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Deployed the neutral pricing language across mobile/tablet comparison routes (`dpl_FFi4ke8dm9js1forpYXNgPdAwKHE`). The production build generated 4,447 routes successfully; the post-deploy affiliate audit still reports zero technical compliance failures and 22 contextual review flags.
- **11 August 2026:** Added a restricted-context guard for the blockchain/privacy article: affiliate anchors are rendered as plain provider text on that page, so commercial destinations are not placed beside mixer/non-KYC workflow content. Production deployment `dpl_YA2wPMrE9Dv599iMatt66P7m4Ttu` is Ready and aliased to `https://www.zerotovpn.com`; the live audit now reports 1,755 affiliate pages, 8,213 links, **0 missing-rel pages, 0 missing-disclosure pages, 0 interruptive markers and 0 fetch failures**. Contextual review flags fell from 22 to 21. Evidence: [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Captured the authenticated Search Console 3-month Web baseline (10 May–9 August 2026) directly from the UI: 395 clicks, approximately 184K impressions, 0.2% CTR and average position 32.7. The leading URLs confirm Iran (position 9.1) and Telegram (9.9) as current page-one winners, while `/best/best-vpn` has 6,301 impressions at position 51.5 and remains the main commercial uplift target. Evidence: [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md).
- **11 August 2026:** Extended `npm run measure:editorial` to accept an optional partner-dashboard CSV for conversions, revenue/commission and EPC. A fixture run calculated conversion rate and EPC correctly; a run without the optional export kept those values `null`. Commit `f0046ef` is pushed. The real 14-day measurement remains pending until the Search Console, Short.io and partner exports are available.
- **11 August 2026:** Hardened the measurement importer: it now detects comma/semicolon/tab CSVs, parses decimal commas such as `0,2%`, fails fast when required GSC or Short.io files are omitted, and records row counts plus explicit missing metrics. Added `npm run test:measure-editorial`; English, localized and missing-input cases pass.
- **11 August 2026:** Added `npm run audit:editorial-live` as a page-level release gate for the English commercial/cluster pages and homepage hub. It checks metadata, canonical/indexability, one H1, disclosure, methodology, required anchors, FAQ schema, required cluster links, internal links and affiliate rel attributes. The first deployed run passed **10/10 pages**, with 72 affiliate links, 0 missing `sponsored nofollow` attributes and 0 missing required cluster links. Evidence: [editorial-live-audit-2026-08-11.md](../metrics/editorial-live-audit-2026-08-11.md).
- **11 August 2026:** Extended the live release gate with complete Open Graph/Twitter card checks and image alt/dimension hygiene. Added one shared `DEFAULT_OG_IMAGE` for child metadata and fixed the Iran featured image's missing intrinsic dimensions. Production deployment `dpl_2GT3sPpk9b8jQTVxJrdk1yYbgisC` is Ready; the post-deploy audit passes **10/10 pages** with 0 Open Graph failures, 0 Twitter failures and 0 image-SEO failures.
- **11 August 2026:** Added a future-date check for Article JSON-LD and corrected the China/Russia country schemas from `2026-11-30` to the actual review date `2026-08-11`. Production deployment `dpl_FuMaJfUX86sqDFAFNWeUBgPnVY6f` is Ready; the live audit now reports 0 future structured-data dates across all ten target pages.
- **11 August 2026:** Fixed the locale middleware matcher so `/opengraph-image` and `/twitter-image` remain publicly reachable. The release gate now fetches the declared social image and requires an image content type; deployment `dpl_C3swvrLEbtRWG9CGiRnCYEidBZHT` is Ready, with 0 broken social-image URLs and **10/10** pages passing.
- **11 August 2026:** Added the homepage hub to the editorial release gate and linked it naturally to the Iran evidence dossier and protocol guide. Production deployment `dpl_Akt4QHHnotnSVn1D8rFDktZKHDQ3` is Ready (commit `bf7dcb6`); the live audit now passes **11/11 pages**, with 81 affiliate links, 0 missing `sponsored nofollow` attributes, 0 missing cluster links, 0 broken social-image URLs and 0 image-SEO failures.
- **11 August 2026:** Added the existing `/countries/iran` evidence checklist to the release gate, aligned its social metadata with the shared preview image, made the no-affiliate research boundary explicit, and corrected its China cluster link to `/countries/china`. Production deployment `dpl_8rQQ6XwJq2Lch7dP7Lb74bYM17tx` is Ready; the live audit now passes **12/12 pages** with 0 metadata, schema-date, social-image, image-SEO, affiliate-rel or cluster-link failures.
- **11 August 2026:** Re-ran the broad post-deploy audits against the live sitemap: all **2,279/2,279** URLs returned 200, were indexable, self-canonical and had one H1; all **1,755 affiliate pages / 8,213 links** had disclosure and `sponsored nofollow`, with 0 interruptive markers and 0 fetch failures. Three sitemap responses exceeded two seconds and remain performance observations, not indexation failures. Evidence: [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md) and [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).
- **11 August 2026:** Classified the 12 active affiliate-audit promotion flags in [affiliate-context-review-2026-08-11.md](../metrics/affiliate-context-review-2026-08-11.md). Free-trial wording is permitted only as a verified provider feature; “incentive” mentions in privacy articles are explanatory text. Any unclassified flag now requires removing the commercial destination before release.
- **11 August 2026:** Extended `npm run audit:editorial` to cover the global sticky CTA as well as the newsletter popup and restricted-context renderer. Both global conversion surfaces are now required to remain site-owned and non-commercial; the audit passes 15/15 checks.

- **12 August 2026 - localized pillar claim gate:** Audited all localized `/best/best-vpn` variants after the sitemap scan found legacy copy in their shared FAQ and trust sections. Replaced unsupported provider/test-count, speed, coverage, support and fixed-price claims with catalog-aware, date-bounded language; the exit-intent popup remains enabled only for first-party email collection. Added a regression check for all localized variants; local editorial checks pass **21/21**, lint passes with the existing 53 warnings, and the full Webpack build still generates **4,447 routes**. Production deployment `dpl_Gzy9ERxg2wegoyDHx7WNqifH864K` is Ready and aliased to `https://www.zerotovpn.com`; live checks across English and all eight localized routes return 200, one H1 and no retired claim patterns. The live editorial gate remains green at **15/15**.

- **12 August 2026 - secondary claim cleanup:** A full live scan of **2,279** sitemap URLs found stale quantified marketing language in the About page and device/use-case pages. Replaced unsupported reader/test-count claims and the `35+` provider-count claims across About, Linux, Windows, laptops, privacy, gaming and Chromebook routes with dated, setup-specific and catalog-aware wording. Added six use-case guards plus an About guard; local editorial checks pass **28/28**, lint has 0 errors (53 existing warnings), and the full Webpack build still generates **4,447 routes**. Production deployment `dpl_J4FonKHzTARShUUpGX8UUGd67988` is Ready and aliased to `https://www.zerotovpn.com`; the expanded live editorial gate passes **22/22** with 123 affiliate links and zero metadata, Open Graph, image, freshness, rel, slug or cluster-link failures. The full sitemap audit passes **2,279/2,279** URLs with zero status, indexability, canonical, H1 or slow-response failures.

- **12 August 2026 - residual claim cleanup:** The follow-up live scan found one remaining macOS metadata count and one undated Shield TV speed-retention percentage. Replaced them with catalog-aware macOS metadata and a dated March 2026 Shield test observation that names its 500 Mbps baseline and variability, then synchronized the rendered Shield JSON record used by the route. Added both source and rendered record to the editorial regression suite; local checks now pass **31/31** and lint remains 0 errors with the existing 53 warnings. Production deployment `dpl_EvhmUNqmQBSZ85TYnnwXHntQmHJS` is Ready and aliased to `https://www.zerotovpn.com`; the full live editorial gate passes **22/22** with 123 affiliate links and zero metadata, Open Graph, image, freshness, rel, slug or cluster-link failures. Evidence: [editorial-live-audit-2026-08-12.md](../metrics/editorial-live-audit-2026-08-12.md). The newsletter exit-intent popup remains intentionally enabled as a first-party email prompt only.

- **12 August 2026 - supporting-article claim cleanup:** The compact production scan separated numeric speed values from unsupported provider-count marketing. Three genuine residual claims were found in the BBC iPlayer, Reddit torrenting and biometric-payment articles; their markdown and rendered JSON records now use current provider evidence, dated checks or explicit network-layer limits. The shared blog author box also no longer claims an unsupported total and now uses current records and dated checks. Added seven source/record guards; local editorial checks pass **37/37**, lint passes with 0 errors (53 existing warnings), and the full Webpack build still generates **4,447 routes**. Deployment and the post-deploy 22-page gate follow this release.

## Outcome we are building

ZeroToVPN should feel like an independent testing publication, not a collection of affiliate landing pages. Every high-intent page must answer the query quickly, prove why the recommendation exists, give the reader a fair alternative, and make the relevant next action obvious without urgency tricks or irrelevant promotion.

The operating loop is:

```text
Search Console + DataForSEO
        ↓
Cluster brief + evidence dossier
        ↓
Editorial page using the standard template
        ↓
Browser / SEO / compliance QA
        ↓
Deploy + Search Console observation
        ↓
CTR, rankings, affiliate clicks and conversions
```

## Standard page architecture

Use this structure for `/best/*`, country pages, comparisons and commercial blog posts:

1. **Intent-matched title, H1 and update date**
   - Primary query near the beginning.
   - One clear answer in the opening paragraph.
   - Last-tested date visible whenever prices, features or censorship conditions can change.
2. **Early trust and disclosure layer**
   - Independent editorial statement.
   - Affiliate disclosure before or alongside the first commercial CTA.
   - Link to methodology and editorial policy.
3. **Quick picks / top 3 overview**
   - Provider logo or branded mark.
   - One-line use case and recommendation.
   - Current price context with the amount itself clickable to the relevant affiliate URL.
   - Descriptive internal review link.
   - One visible `Visit ...` affiliate CTA.
4. **Decision table**
   - Only fields that help this query: price, tested speed, security, streaming, locations, devices and refund terms.
   - Add a table caption, concise headers and a methodology link.
5. **Provider dossiers**
   - Ranking, who it is for, who should skip it, test result, pros, limitations, plan breakdown and one contextually repeated CTA.
   - Price labels and plan amounts can be affiliate links; never imply an unverified coupon or guaranteed discount.
6. **Evidence and method**
   - Test conditions, source URLs, checked date and uncertainty.
   - Separate first-party tests from provider claims.
7. **Cluster links and FAQ/PAA**
   - 3–5 meaningful internal links for supporting pages; more on pillar pages.
   - Descriptive anchors, never “click here”.
   - 4–8 direct answers from Search Console/DataForSEO PAA research with FAQ schema where eligible.
8. **Final choice guide and related content**
   - Help the reader choose based on privacy, streaming, travel, censorship, price or device.
   - Link back to the cluster hub and to relevant provider reviews.

## SEO checklist gates

Before a page is published, the implementation must pass these gates from the Obsidian checklist:

- One H1, logical H2/H3 hierarchy and natural keyword use.
- Title, meta description, canonical, Open Graph and Twitter metadata.
- Breadcrumbs, descriptive anchors and contextual internal links.
- FAQ/PAA answers and correct schema for the page type.
- Author/editor, published or updated date, methodology and source citations.
- Responsive layout, 16px+ body text, 48px touch targets and no page-level horizontal scroll.
- Optimised images with meaningful alt text and fixed dimensions.
- Affiliate links use `rel="sponsored nofollow"`; authoritative non-commercial sources use normal editorial linking.
- No affiliate pop-up/under advertising, fake urgency, keyword stuffing, doorway pages, unauthorised coupons or irrelevant provider promotion. A consented owned-newsletter prompt may collect email only when it contains no provider, coupon, discount or affiliate CTA.

## Content production plan

### Phase 1 — Template and measurement (week 1)

- Extract a shared `BestVpnEditorialTemplate` from the current Best VPN page.
- Make quick picks, price links, provider dossiers, tables, disclosures, FAQs and related links reusable props.
- Add a page-level content brief type: `primaryKeyword`, `intent`, `cluster`, `lastReviewedAt`, `evidence`, `affiliateContext`, `schemaType`.
- Add automated checks for missing disclosure, missing methodology link, missing canonical metadata and affiliate links without `sponsored nofollow`. The editorial gate now covers 12 shared and cluster-specific checks through `npm run audit:editorial`.
- Create a Search Console baseline for the existing Best VPN, Iran, Russia and Telegram pages. The authenticated UI baseline is now documented in [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md); use matched CSV/API exports for the post-14-day statistical comparison.

### Phase 2 — Upgrade existing winners (weeks 2–3)

Prioritise pages that already have impressions but weak CTR or positions 11–40:

1. Best VPN for Iran — primary censorship hub.
2. Best VPN for Telegram — supporting censorship/use-case page.
3. Best VPN for Russia — country cluster expansion.
4. Best VPN for China — evidence-led country page.
5. Best VPN overall — commercial pillar and internal-link hub.

For each page, improve the first viewport, the comparison table, provider card structure, inline affiliate price links, internal anchors, FAQ answers and freshness metadata before creating new URLs.

### Phase 3 — First new editorial post (week 4)

Shipped first editorial post:

**“Best VPN for Iran in 2026: tested options for censorship, privacy and safer travel”**

Why this was first:

- It aligns with existing Search Console impressions and near-page-one visibility.
- It naturally supports Iran, Telegram, Russia, China, obfuscation and VPN-protocol clusters.
- It allows affiliate promotion only in a genuine VPN-selection context.
- It can reuse the Tom’s Guide top-3 pattern while differentiating with ZeroToVPN evidence, uncertainty and legality context.

Suggested outline:

1. Short answer and safety disclaimer.
2. Top 3 overview with tested reason, current plan price and direct affiliate price link.
3. Comparison table.
4. How we tested access, speed, kill switch and obfuscation.
5. Provider dossiers with pros, limitations and “who should skip this” notes.
6. Practical setup guidance for restrictive networks.
7. Legal and safety context with authoritative sources.
8. PAA/FAQ section.
9. Related censorship and travel links.

### Phase 4 — Controlled cluster expansion (weeks 5–8)

The first controlled expansion is now live. The reciprocal support set around the censorship and commercial hubs is:

- [VPN obfuscation explained](/guides/vpn-obfuscation-explained)
- [How to use a VPN on restricted networks](/guides/vpn-for-restricted-networks)
- [VPN protocols explained](/guides/vpn-protocols-explained)
- [VPNs for travel](/guides/vpn-for-travel)
- [Best free VPN](/best/free-vpn)
- [Best VPN for Telegram](/blog/best-vpn-for-telegram-2026)
- [VPN for Russia](/countries/russia)
- [VPN for China](/countries/china)

The next 4–8 page selection is paused until the 14-day Search Console and Short.io exports are available. DataForSEO may refine the hypothesis, but it should not be used to manufacture another large URL batch without measured demand.

Each page must link to the hub, at least two related guides and one relevant review or comparison. Do not create thin country/keyword variations without a distinct question and evidence.

## Affiliate conversion rules

- Use one primary provider CTA per provider card plus contextual inline price/recommendation links.
- Make the visible price, plan term and destination clear; the affiliate landing page remains the source of truth for live pricing.
- Use Short.io slugs or sub-identifiers per cluster when available: `iran`, `russia`, `telegram`, `best-vpn`, `review`.
- Keep affiliate disclosure close to the first CTA and in the persistent editorial navigation on long pages.
- Never use an unauthorised coupon, fake expiry, incentive, pop-up/under ad, keyword-stuffed copy or irrelevant NordVPN placement.
- Audit country pages and educational pages before adding affiliate links; remove the link when the page context is not genuinely VPN selection or safety.

## QA and release sequence

For every page or template change:

1. `npm run lint` or targeted ESLint.
2. `npm run build` and sitemap generation.
3. Browser test at desktop and 390px mobile viewport.
4. Verify H1, title, canonical, disclosure, table headers, internal anchors and CTA destinations.
5. Verify affiliate links resolve to the intended Short.io slug and carry `sponsored nofollow`.
6. Deploy to Vercel preview, inspect, then promote production.
7. Record URL, query cluster, update date and baseline metrics in the execution log.

## Measurement targets

Review every two weeks by cluster:

- Organic CTR on pages with impressions: target 0.2% → 0.8%+.
- Keywords in positions 1–10 and 11–20.
- Search Console clicks to the hub and supporting pages.
- Affiliate clicks by page and Short.io slug.
- Affiliate conversion rate and EPC when available from the partner dashboard.
- Indexed/canonical/sitemap mismatch count.
- AI citations and referenced URLs as a separate authority metric.

## Definition of done for the next milestone

- Shared editorial template extracted and used on the Best VPN and Iran pages.
- First new Iran post published with evidence dossier, FAQ schema and compliant CTAs.
- At least five supporting cluster links live and reciprocal.
- Search Console baseline recorded before publishing and reviewed after 14 days.
- No affiliate links on pages that fail the NordVPN promotion-context audit.
- Deployment, browser QA and page-level compliance notes recorded.

## Baseline update: 11 August 2026

The screenshot-based baseline remains useful as historical context, but the current release gate now uses the authenticated Search Console baseline in [gsc-baseline-2026-08-11.md](../metrics/gsc-baseline-2026-08-11.md). The `/best/best-vpn` implementation is complete and live with the shared Tom's Guide-style shortlist, evidence table, contextual inline affiliate links and reciprocal cluster links. Matched Search Console, Short.io and partner exports must still be captured after the 14-day window so CTR, affiliate clicks, conversion rate and EPC are measured separately.

The machine-readable screenshot transcription is [zerotovpn-baseline-2026-08-11.json](../metrics/zerotovpn-baseline-2026-08-11.json). `npm run measure:editorial` now normalizes localized Search Console/Short.io CSV exports and writes a comparable report; the importer was verified with a local fixture and deliberately leaves conversions/EPC null until the partner dashboard export is joined.

The exit-intent popup remains enabled as an owned-media newsletter prompt. It contains only the newsletter form and a dismiss action; an editorial audit now fails if affiliate URLs, provider offers, coupons, discounts or incentives are added to that component. The global popup/sticky guards and restricted-context renderer remain covered by the release gate; the latest verified production deployment is `dpl_CZ8uQN2379cYGxtGnLBPdw2c8wJm`.

### Release and claim-audit update: 12 August 2026

- The About page and its Person structured-data description now use evidence-bounded trust language (current provider records, dated test notes and documented comparisons) instead of an unsupported lifetime provider-count claim.
- Production deployment `dpl_CZ8uQN2379cYGxtGnLBPdw2c8wJm` is Ready and aliases `www.zerotovpn.com`, `zerotovpn.com` and `zerotovpn.vercel.app`.
- `npm run audit:editorial-live` passed **22/22** targets after deployment: 123 affiliate links, 0 missing affiliate rel/slug, 0 cluster-link failures, 0 metadata/image/freshness/schema-date failures. The newsletter-only exit-intent popup remains present in the production bundle.
- A reproducible full-sitemap claim audit is now available as `npm run audit:claims-live` (`scripts/audit-claims-live.mjs`). The 12 August production run checked **2,279/2,279** sitemap URLs with **0 fetch errors** and flagged **253 URLs** for manual review, all from legacy provider-count language; no reader-count, speed-test-count, max-speed, speed-retention or rank patterns were found. This is a backlog signal, not an automatic rewrite: the next content pass should group the 183 unique canonical paths by cluster, verify evidence, and update or retire claims in batches.

### Cluster claim-batch update: 12 August 2026

- Refreshed the localized streaming pillar copy and metadata to describe a five-provider comparison with dated records and platform-specific checks, removing unsupported lifetime provider-count language from the English, Dutch, German, Spanish and French variants.
- Updated the dynamic blog renderer so every localized Iran route uses the evidence-led editorial body rather than stale translated JSON content. The route keeps the localized URL and metadata while sharing the same bounded evidence and safety limits.
- Added two regression checks to `npm run audit:editorial`, bringing the local suite to **39/39**.
- The production deployment `dpl_9sf5Mxroa2DQRrVfV14LMiTm8BkE` is Ready. Live checks for the English/translated streaming routes and localized Iran routes return 200, one H1 and no retired provider-count patterns. `npm run audit:editorial-live` remains **22/22**.
- The full claim audit now flags **233 URLs** (down from 245) across 2,279 checked URLs, with zero fetch errors. The remaining findings are legacy blog/deal corpus items and remain a staged review backlog; no bulk rewrite is being inferred from the pattern match alone.

### Security-content claim batch: 12 August 2026

- Qualified the repeated “50+ VPN” language in the credential-theft and kill-switch/DNS-leak articles across the available locale records. The articles retain their threat-model, setup and testing guidance, but now refer to multiple provider records instead of an unsupported lifetime sample size.
- Added two data-record guards to `npm run audit:editorial`, bringing the local editorial suite to **41/41** and preventing the quantified wording from returning in these slugs.
- Production deployment `dpl_9sf5Mxroa2DQRrVfV14LMiTm8BkE` is Ready. Focused live checks returned HTTP 200, one H1 and no retired provider-count pattern on English and localized routes. The full live editorial gate remains **22/22**.
- The full sitemap claim audit now reports **233 flagged URLs**, 2,279/2,279 checked and 0 fetch errors. This batch removed 12 flagged route variants; the remaining corpus will continue in cluster-sized batches.

### Free-VPN legacy claim batch: 12 August 2026

- Qualified unsupported provider-count wording in all nine available `best-free-vpns-2026` locale records, including Japanese, Korean, Thai and Chinese variants. Numeric limits such as data caps and Mbps values were retained; only the unverified lifetime sample-size language was removed.
- Added a locale-aware regression guard for the free-VPN records. `npm run audit:editorial` now passes **42/42** and protects the two security slugs plus this legacy free-VPN slug from the retired provider-count patterns.
- The canonical `/best/free-vpn` evidence-led pillar remains unchanged. The legacy `/blog/best-free-vpns-2026` routes remain self-canonical (no redirect was inferred) but now render qualified content in every available locale.
- Production deployment `dpl_FqF3Dv4X2syi4xc87hhfuUED8Mkf` is Ready with the aliases `www.zerotovpn.com`, `zerotovpn.com` and `zerotovpn.vercel.app`. Focused live checks for the pillar and English, Dutch, German and Spanish legacy routes returned HTTP 200, one H1 and no retired provider-count pattern. The newsletter-only exit-intent popup remains present.
- `npm run audit:editorial-live` passed **22/22** with 123 affiliate links and zero compliance, metadata, image or freshness failures. The full sitemap claim audit now reports **226 flagged URLs** (down from 233), with **2,279/2,279** URLs checked and zero fetch errors. Remaining findings are staged legacy-corpus reviews, not an instruction to mass-rewrite unrelated pages.

### Legacy provider-count corpus batch: 12 August 2026

- Qualified unsupported 35/38/50+ provider and test-sample wording across the available localized post records and post index metadata. Numeric speed, data-limit, server-location and comparison-table values were retained; only unverified lifetime sample-size language was replaced with bounded wording such as “multiple provider records”.
- Updated localized Netflix and streaming route metadata and added a corpus-level regression guard so retired provider-count patterns fail `npm run audit:editorial` if they return. The exit-intent popup remains intentionally enabled for first-party newsletter collection only; its audit rejects affiliate URLs, provider offers, coupons, discounts and incentives.
- Local release gate: `npm run audit:editorial` **43/43**, `npm run lint` 0 errors (53 existing warnings), and `npm run build` generated 4,447 pages successfully.
- Production deployment `dpl_HVU2E6SD13v5mKebQbkXM6E5Bhhv` is Ready with aliases `www.zerotovpn.com`, `zerotovpn.com` and `zerotovpn.vercel.app`. Live editorial audit passed **22/22** with 123 affiliate links and no rel/slug, cluster-link, metadata, image or freshness failures.
- The full live claim audit checked **2,279/2,279** URLs with 0 fetch errors and **0 findings** across provider-count, reader-count, speed-test-count, max-speed, speed-retention and rank-claim patterns. A visible browser smoke test confirmed one H1, compliant `sponsored nofollow` affiliate links and the newsletter form on the live Netflix route.

### Russia PAA refinement: 12 August 2026

- Refreshed the Russia DataForSEO dossier with current US/English SERP/PAA samples and competitor data. The new PAA set reinforces four answer intents: legality, current provider availability, free-tier limitations and Telegram access; it does not establish that any provider works on a particular Russian ISP.
- Added bounded FAQ answers for “Is there a free VPN for Russia?” and “Is NordVPN still available in Russia?” to the English Russia dossier, updated its freshness/schema date to 12 August, and kept all affiliate links inside the genuine VPN-selection context.
- Verification: `npm run audit:editorial` **43/43**, `npm run lint` 0 errors (53 existing warnings), `npm run build` generated **4,447** pages successfully, and the post-deploy Russia route returned HTTP 200 with one H1, both new FAQ questions, `dateModified` 2026-08-12, compliant affiliate rel attributes and no retired provider-count patterns. Production deployment `dpl_2jop2sccLCyKB1stWbWPAfq3tbv4` is Ready. The 14-day KPI checkpoint remains 25 August because no real Search Console, Short.io or partner export is present yet.

### Commercial pillar PAA refinement: 12 August 2026

- Added a dedicated [commercial DataForSEO dossier](../research/dataforseo-commercial-cluster-2026-08-12.md) for `best vpn`, `vpn comparison`, privacy, streaming and cheap-VPN subintents. Current volume was missing in the API response, so historical monthly values are not treated as current demand.
- Updated the English `/best/best-vpn` pillar with PAA-aligned FAQ answers for “Which VPN is actually the best?”, FBI/VPN tracking, streaming reliability and reasons a reader might avoid NordVPN. Answers stay use-case-specific and non-incentivised; affiliate links remain confined to comparison cards and contextual price links.
- Post-deploy verification on `dpl_BQKZCT7K6zwNipqQSajmWYMdWmwn` passed the full live editorial gate **22/22**: 123 affiliate links, zero rel/slug, metadata, cluster-link, image, schema-date or freshness failures. The 14-day KPI checkpoint remains the next measurement gate rather than a reason to manufacture current volume from stale API history.

### Free-VPN PAA refinement: 12 August 2026

- Refreshed the US/English DataForSEO free-VPN dossier with 6 overview rows, 84 suggestions and 6 SERP/PAA rows. Current volume was missing for most commercial seeds, so stale historical values are not used as current demand.
- Added bounded FAQ coverage to `/best/free-vpn` for VPN legality, traceability, no-credit-card signup and streaming blocks. The answers keep provider claims conditional and do not add affiliate links to educational FAQ copy.
- Updated the page freshness/schema date and source note to 12 August 2026. The newsletter-only exit-intent popup remains enabled and unchanged.
- Local verification: `npm run audit:editorial` **43/43**, `npm run lint` 0 errors (53 existing warnings), and `npm run build` generated **4,447** pages successfully. Production deployment `dpl_4zQVAKpNKGynQRg2XouDnjiQirER` is Ready with the production aliases; the live free-VPN smoke returned HTTP 200, one H1, all four new FAQ questions, `dateModified` 2026-08-12, no retired claims and the newsletter marker. `npm run audit:editorial-live` passed **22/22** with 123 affiliate links and zero compliance/metadata failures.

### Telegram-cluster PAA refinement: 12 August 2026

- Refreshed the US/English DataForSEO Telegram dossier after the page-one baseline. The response contains 4 overview rows, 63 related-keyword rows, 5 SERP/PAA rows and 19 competitor domains; current volume remains unavailable for most head terms, so older history is not treated as current demand.
- Added FAQ coverage for the new “which free VPN”, “should I use a VPN with Telegram?” and safe-link/provenance questions. Answers distinguish VPN-wide routing from Telegram's proxy scope, warn against unverified channel links and retain the evidence boundary around provider access.
- Updated the editorial source date to 12 August 2026. Affiliate links remain inside the documented Telegram-evaluation context; the newsletter-only exit-intent popup is unchanged.
- Local verification: `npm run audit:editorial` **43/43**, `npm run lint` 0 errors (53 existing warnings), and `npm run build` generated **4,447** pages. Production deployment `dpl_BtkQcneA1JwuRppJme3qJCZEgcqF` is Ready; the live Telegram smoke returned HTTP 200, one H1, all three new FAQ questions, `dateModified` 2026-08-12, FAQ schema, six compliant affiliate links and no retired claims. The 390px browser evidence is recorded in [telegram-browser-smoke-2026-08-12.md](../metrics/telegram-browser-smoke-2026-08-12.md); the newsletter-only popup marker remains present.

### Blog index pagination and live performance: 12 August 2026

- The blog index was serving roughly 2.73 MB of HTML and about 498 article cards in one response. It now renders one featured article plus 24 recent-post slots per page; article URLs remain unchanged.
- Pagination variants use `?page=N`, keep the canonical `/blog` URL, and emit `noindex, follow` for pages after the first. The sitemap generator was made query-aware so the canonical blog route remains in the sitemap.
- Production deployment `dpl_7xMCUNm16n4gMbJFWWbwf6z5ehc5` is Ready. The live Spanish index measured about 678 KB; 390px browser checks showed one H1, 23 cards on page one, 24 on page two and no horizontal overflow. Evidence is recorded in [blog-pagination-browser-smoke-2026-08-12.md](../metrics/blog-pagination-browser-smoke-2026-08-12.md).
- `npm run audit:editorial-live` passed **22/22** after deployment. The exit-intent popup remains a newsletter-only owned-media prompt and is not part of affiliate promotion.

### Localized pagination UX: 12 August 2026

- Localized the new blog pagination controls for all nine supported locales instead of leaving `Previous`, `Next` and the page counter in English.
- Production deployment `dpl_6L6YosrPQjWDwZYa8ukoz85asiKa` is Ready. Chrome checks for Spanish, Dutch and German page two confirmed translated labels, `noindex, follow`, one H1 and no 390px overflow. Evidence: [blog-pagination-localization-smoke-2026-08-12.md](../metrics/blog-pagination-localization-smoke-2026-08-12.md).
- The production editorial gate remains **22/22** with 123 compliant affiliate links. No popup or affiliate-context behavior changed.

### Cluster content map: 12 August 2026

- Added [zerotovpn-cluster-content-map-2026-08-12.md](./zerotovpn-cluster-content-map-2026-08-12.md), which maps the live commercial, censorship, free/trial, protocol, travel and trust clusters to their existing pillars and supporting URLs.
- The map defines the internal-link contract (pillar, two siblings, evidence/methodology and next-step bridge) and a measured post-checkpoint queue. It explicitly blocks thin new keyword variants until the matched 25 August exports are available.
- The exit-intent popup remains first-party newsletter-only; affiliate links remain restricted to genuine VPN-selection contexts and the current compliance gates.

### Commercial cluster bridge update: 12 August 2026

- The `/best/best-vpn` pillar now links contextually to the five measured decision branches: privacy, streaming, value, free tiers and trials. These are editorial navigation links, not additional affiliate CTAs.
- Added those routes to the live editorial gate so the bridge cannot silently disappear in a future refactor. Production deployment `dpl_91UP9Vrwk8X1zVNfqbZdZHjTsjJ6` is Ready; the gate remains **22/22** and the 390px browser smoke is recorded in [commercial-cluster-bridge-browser-smoke-2026-08-12.md](../metrics/commercial-cluster-bridge-browser-smoke-2026-08-12.md).

### Reproducible cluster-link audit: 12 August 2026

- Added `npm run audit:cluster-links`, a live route-level check for the commercial, censorship, technical and travel clusters. It verifies required parent/sibling bridges, follows permanent redirects and excludes legacy aliases from the canonical cluster count.
- The production run checked **21 canonical pages across 4 clusters**: **21/21 passing**, **0 missing required links** and **0 fetch failures**. Evidence is recorded in [cluster-link-audit-2026-08-12.md](../metrics/cluster-link-audit-2026-08-12.md).
- The audit clarified that `/best-vpn-for-travel`, `/best-vpn-for-public-wifi` and `/vpn-encryption-explained` are redirect aliases, not separate content nodes. This prevents duplicate-route work from distorting the topical-authority map.

### Post-release sitemap health: 12 August 2026

- The full production sitemap audit checked **2,279/2,279** URLs: all returned 200, were indexable, self-canonical and had exactly one H1. There were **0** canonical mismatches, noindex-in-sitemap entries or H1 failures.
- Six concurrent samples crossed two seconds, but three sequential rechecks for each stayed between **239 ms and 619 ms**. They are transient performance observations, not evidence for a route rewrite. Evidence: [sitemap-performance-recheck-2026-08-12.md](../metrics/sitemap-performance-recheck-2026-08-12.md).

### Measurement input guard: 12 August 2026

- Added `npm run measure:check-inputs` to reject fixture/sample/example files, validate export headers and require a real partner export before reporting the KPI gate as ready.
- The current `.cache/metrics` inventory still contains only explicitly named fixtures, so the gate correctly remains not ready. No KPI or conversion values have been inferred.

### Roadmap completion matrix: 12 August 2026

- Added [zerotovpn-roadmap-completion-matrix-2026-08-12.md](./zerotovpn-roadmap-completion-matrix-2026-08-12.md) with requirement-level evidence for the delivered template, Iran post, reciprocal cluster links, baseline, compliance, popup and deployment work.
- The matrix keeps the 14-day Search Console, Short.io and partner review explicitly **pending** until real exports exist; it does not treat fixtures as evidence.

### Full-sitemap claim regression: 12 August 2026

- Re-ran `npm run audit:claims-live` across **2,279/2,279** production URLs after the cluster/navigation work.
- Result: **0** fetch errors and **0** findings across provider/test counts, reader counts, speed-test counts, maximum-speed claims, speed-retention claims and unqualified ranking claims.

### NordVPN promotion-context audit: 12 August 2026

- Re-ran `npm run audit:affiliate-context` against all **2,279/2,279** live sitemap URLs: **1,755** pages with affiliate links and **8,189** links checked.
- Hard compliance gates remain clean: **0** missing `sponsored nofollow`, **0** missing disclosure pages, **0** interruptive-promotion markers and **0** fetch failures. The newsletter-only exit-intent popup remains separate from affiliate advertising.
- The 12 promotion-term flags are the previously classified free-trial/plan wording on the dedicated trial pages and explanatory “incentives” language in privacy articles. The manual review record points to the 12 August audit; no unassigned coupon, cashback, fake-expiry or irrelevant NordVPN placement was found.

### Travel-cluster DataForSEO refresh: 12 August 2026

- Refreshed the US/English travel dossier with current Labs suggestions and five SERP/PAA samples. The live signals continue to centre on travel need, international travel, hotel/airport Wi-Fi, captive-portal or protocol blocking and price questions; historical monthly values remain labelled as historical rather than current demand.
- Added one bounded FAQ answer to `/guides/vpn-for-travel` for the new hotel-Wi-Fi blocking question. It explains completing the captive portal first, retrying with a supported protocol and keeping an approved fallback; it makes no access, legality or savings promise.
- Updated the page/schema freshness date to **12 August 2026**. The newsletter exit-intent popup remains enabled as first-party email collection only; no affiliate CTA or popup behavior changed.
- Local production build completed with **4,447** routes. Commit `0e690fd` is live in Vercel deployment `dpl_BMyapD4RrHFXk3CYfwqGeEYHi4iV`; the live travel route returned HTTP 200, one H1, the new FAQ, `dateModified` 2026-08-12 and the newsletter marker. The full live editorial gate remains **22/22** with 123 compliant affiliate links.

### Search Console interim window: 12 August 2026

- Captured a fresh authenticated UI snapshot for **27 July–9 August 2026**: **86 clicks**, **36,178 impressions**, **0.2% CTR** and **33.7 average position**. The visible query rows reinforce free/trial, Russia and comparison intent.
- Recorded the snapshot in [gsc-interim-window-2026-08-12.md](../metrics/gsc-interim-window-2026-08-12.md). It is explicitly an interim observation, not a complete export; the 14-day page/query, Short.io and partner-export gate remains pending.
- Added the detailed top-page/query extraction in [gsc-interim-window-detail-2026-08-12.md](../metrics/gsc-interim-window-detail-2026-08-12.md). It identifies `/best/best-vpn` and `/best/vpn-free-trial` as impression-rich refresh hypotheses while keeping the next 4–8 page selection paused until redirect and partner outcomes are joined.

### Short.io interim window: 12 August 2026

- Read the authenticated Short.io domain dashboard for the same **27 July–9 August** window: **8,123 total clicks**, **3,115 human clicks**, with `/protonvpn` at **585**, `/surfshark` at **238**, `/nordvpn` at **182** and `/windscribe` at **129** human clicks.
- Recorded the observation in [shortio-interim-window-2026-08-12.md](../metrics/shortio-interim-window-2026-08-12.md). The aggregate `/*` path is intentionally not attributed to a page, and the formal measurement gate remains pending until a downloadable Short.io export and partner conversions/revenue/EPC are joined.

### Quick Pick price-freshness release: 12 August 2026

- Added a visible last-price-check line to the shared Quick Pick cards, plus optional `priceLastVerified`/`priceSource` data fields and an editorial regression guard. This makes the clickable price context auditable without presenting a catalog value as a guaranteed offer.
- Local verification: `npm run audit:editorial` **47/47**, `npm run build` generated **4,447** routes, `npm run audit:editorial-live` **22/22**, and `npm run audit:claims-live` checked **2,279/2,279** URLs with **0 findings**.
- Production deployment `dpl_3HDW8FDNzpXoE4XPvx4GcPEKQyy1` is Ready and aliased to `https://www.zerotovpn.com`. Live `/best/best-vpn` shows three `Price checked: 2026-07-25` lines, three long-term-plan/refund context lines, branded provider logo alt text, comparison table price links and the newsletter-only popup marker.

### Page-level content brief contract: 12 August 2026

- Added the typed `EditorialContentBrief` contract in `src/lib/editorial-content-brief.ts` with `primaryKeyword`, intent, cluster, review date, evidence references, affiliate context and schema type. The Best VPN pillar now supplies a concrete `commercial-choice` brief to the shared template, which exposes auditable data attributes without adding keyword-stuffed visible copy.
- Added a local regression check and a live editorial gate for the brief fields. Local checks pass **48/48**; the production build generates **4,447** routes; the live editorial gate passes **22/22** with **0** content-brief failures; the claim audit remains **2,279/2,279** with **0 findings**.
- Production deployment `dpl_4CzAAKixgSfWZXz6ExeKWsmjvmwF` is Ready. The read-only browser smoke is recorded in [content-brief-browser-smoke-2026-08-12.md](../metrics/content-brief-browser-smoke-2026-08-12.md).

### Iran content brief alignment: 12 August 2026

- Added the same typed brief to the Iran editorial hub: `best vpn for iran`, commercial intent, `censorship-restricted-networks`, review date 11 August, three evidence references and the `vpn-selection` affiliate boundary. The brief is passed only for the Iran dossier; other blog posts keep their existing non-commercial or restricted-context handling.
- The live gate now verifies both core briefs. Production deployment `dpl_AWWJCK3Uwjpc3hUPMNpaQmji5z7S` is Ready; editorial audit **22/22**, content-brief failures **0**, claim audit **2,279/2,279** with **0 findings**. Both one-H1 browser checks are recorded in [content-brief-browser-smoke-2026-08-12.md](../metrics/content-brief-browser-smoke-2026-08-12.md).

### Shared cluster brief coverage: 12 August 2026

- Centralized briefs for the China, Russia, free-VPN, travel, restricted-network, obfuscation and protocol pages in `src/lib/editorial-content-briefs.ts`. Each brief names the actual query, intent, roadmap cluster, dated evidence references and the applicable `vpn-selection` boundary; no new URLs were created.
- The live gate now checks **12 routes** with a brief (10 distinct content routes plus French and Dutch free-VPN variants). Production deployment `dpl_HvzVBT15ywDyKyjEXq2bHE56exNs` is Ready; build **4,447 routes**, local editorial audit **49/49**, live editorial audit **22/22** with **0** content-brief failures, and claim audit **2,279/2,279** with **0 findings**. The shared-cluster browser smoke is recorded in [content-brief-browser-smoke-2026-08-12.md](../metrics/content-brief-browser-smoke-2026-08-12.md).

### Telegram brief alignment: 12 August 2026

- Added the Telegram dossier to the centralized censorship-cluster brief map with `best vpn for telegram`, commercial intent, a dated 12 August review, the Telegram proxy documentation and the existing VPN-selection affiliate boundary. The generic blog route only receives this brief for the dedicated Telegram slug.
- Production deployment `dpl_34HbqZvP9x31DWHLyLmMYGNE4Too` is Ready. The live editorial gate remains **22/22** with **0** content-brief failures; the Telegram browser smoke returned one H1, three provider marks and all brief fields. The measurement gate remains unchanged.

### Measurement-window manifest correction: 12 August 2026

- Added [measurement-window-manifest-2026-08-12.json](../metrics/measurement-window-manifest-2026-08-12.json) and its readable summary to make the 28 July–10 August join reproducible. It records real authenticated GSC and Short.io inputs, the intentionally unassigned Short.io wildcard/deleted residual, and the non-matching 6–12 August Nord screenshot.
- This manifest supersedes older interim log wording that predated the authenticated exports. The gate remains `matched: false` and `ready: false`; no conversion, revenue or EPC value is inferred.

### Authoritative Chart input guard: 12 August 2026

- Made `--gsc-chart` a required input for `npm run measure:check-inputs`; Pages and Queries alone can no longer look like a complete Search Console site-total export.
- Added Chart.csv header regression coverage and re-ran the real input check: Pages, Queries, Chart and Short.io are `ready`; the gate remains `ready: false` only because the Nord partner export is absent.

### Partner window matching guard: 12 August 2026

- `measure:editorial` now requires `--gsc-chart` whenever a measurement window is supplied and validates every partner row date against that same ISO window. Invalid dates or rows outside the window fail closed; missing partner data remains explicitly `not-provided`.
- Regression coverage includes an in-window partner export, an empty-but-dated partner export, and an out-of-window partner export. The real interim report records `partnerWindow: not-provided` rather than inferring a conversion result.

### Input-check window guard: 12 August 2026

- `npm run measure:check-inputs` now accepts the same paired `--window-start`/`--window-end` flags and verifies that Chart.csv dates, plus any supplied partner dates, fall inside that window before the gate can proceed.
- The real four-input check reports Chart `matched` for 28 July–10 August and partner `optional-missing`; the command remains intentionally not ready until the Nord export is supplied.

### Nord export access recheck: 12 August 2026

- A fresh read-only dashboard navigation was attempted against the Nord performance endpoint. The available session redirected to `https://affiliates.nordvpn.com/login`; no CSV/API response was exposed, so no partner values were added or inferred.
- The next required action remains an authenticated download for 28 July–10 August with dated clicks, conversions, payout/revenue and EPC columns. The measurement gate stays closed until that file passes both input and partner-window validation.

### Full release verification: 12 August 2026

- `npm run build` completed successfully with the Webpack builder and generated **4,447/4,447** routes; sitemap generation reported 90 static locale routes, excluding 33 redirect-only and one noindex route.
- Fresh production audits remain green: editorial **22/22**, claim audit **2,279/2,279** with 0 findings and 0 fetch errors, and cluster links **21/21** across 4 clusters with 0 missing links or fetch failures.
- This confirms release quality after the measurement-tooling changes; it does not close the Nord conversion/EPC gate.

### Post-checkpoint candidate hypotheses: 12 August 2026

- Added [post-checkpoint-candidate-hypotheses-2026-08-12.md](../metrics/post-checkpoint-candidate-hypotheses-2026-08-12.md) with six existing-page hypotheses from the downloaded Search Console Pages table: commercial pillar, localized free-VPN, trial, Russia hub, cheap-VPN and Russia decision page.
- This is deliberately not a 4–8 page selection. Each row lists the missing query, attribution and partner evidence required before editing; no new URLs are created while the matched gate is open.

### Current production verification snapshot: 12 August 2026

- Fresh live checks against `https://www.zerotovpn.com` pass **22/22** editorial targets with **127** compliant affiliate links, zero brief/metadata/freshness/image/schema/rel/slug/cluster-link failures, and zero social-image failures.
- The fresh full-sitemap claim audit checked **2,279/2,279** URLs with **0** fetch errors and **0** findings across all configured provider-count, reader-count, speed-test-count, maximum-speed, speed-retention and ranking patterns. This supersedes the earlier staged claim-backlog counts recorded in the historical execution entries above.
- These are release-quality and claim-safety checks, not conversion evidence. The matched partner export remains the only open measurement-gate input.

### Measurement window enforcement: 12 August 2026

- Extended `scripts/measure-editorial.mjs` with paired `--window-start` and `--window-end` flags plus `--gsc-chart`. The importer now records the exact ISO window in every report, keeps authoritative daily Search Console totals separate from top-1,000 page/query sums, and fails closed for partial, malformed or reversed dates.
- Regression coverage includes exact-window persistence and reversed-window rejection. The real-input dry run records **28 July–10 August 2026**, 1,000 GSC page rows, 1,000 query rows and 39 Short.io rows; partner conversions/revenue/EPC remain explicitly missing.
- The next matched run must use `--window-start 2026-07-28 --window-end 2026-08-10` (or the actual shared export window), `--gsc-chart Chart.csv`, and all five source files: Pages, Queries, Chart, Short.io and partner.

### Commercial CTA source consistency: 12 August 2026

- Audited the markdown import sources for the three impression-bearing use-case posts **FFXIV**, **MLB.TV** and **Fortnite**. Their labelled “Get NordVPN” CTAs now all use the approved `https://go.zerotovpn.com/nordvpn` tracking destination; no direct `nordvpn.com` CTA remains in those source files.
- Added a regression guard to `npm run audit:editorial` so a future markdown import cannot silently restore an untracked commercial destination. The rendered `src/data/posts/en` records were already on the tracked route, so this closes source/render drift without changing copy or creating URLs.
- Verification: local editorial audit **50/50** and production build **4,447/4,447** routes. This is an attribution/compliance correction; it does not change the open matched-window Nord conversion/EPC gate.

### Review CTA source consistency: 12 August 2026

- Audited the stored review records for **NordLayer** and **Perfect Privacy**. Their commercial “NordVPN” alternative links now use `https://go.zerotovpn.com/nordvpn`; first-party NordVPN source citations remain direct editorial references.
- Added a regression guard to `npm run audit:editorial` for both records. The live review renderer already exposed tracked CTAs; this closes the dormant source-record drift before a future importer can reintroduce an untracked commercial link.
- Verification: local editorial audit **51/51** and production build **4,447/4,447** routes. Production deployment `dpl_4w8RdVFVmWJTmU5vDogekZ3SEWnK` is Ready and aliased to `https://www.zerotovpn.com`; Vercel error-log scan returned no logs, and both review URLs return HTTP 200, one H1, tracked CTA links and zero direct bare NordVPN destinations. The matched Nord partner-export gate remains unchanged.

### Review template methodology and live markup gate: 12 August 2026

- Extended the shared review template with a localized, visible `How we test` link to `/methodology` and added NordVPN, Surfshark and Mullvad reviews to the production editorial gate. This makes the methodology path explicit on commercial review pages and keeps review pages inside the same cluster-quality contract.
- The first live run exposed two review sidebar links without Short.io slug telemetry and missing width/height metadata on review author images. Replaced the raw sidebar anchor with the shared `AffiliateTextLink` and migrated the author image to `next/image`, then re-ran the production deployment.
- Local editorial audit remains **52/52** and the production build generated **4,447/4,447** routes. Deployment `zerotovpn-c60fpd4hw-marvinnl046s-projects.vercel.app` is Ready; the final live gate passes **25/25**, checking **135** affiliate links with 0 missing sponsored/nofollow attributes, 0 missing slugs, 0 image-SEO failures, 0 missing cluster links and 0 social-image failures.
- This improves review-page compliance and attribution hygiene; it does not close the matched Nord conversion/EPC gate, which still requires the dated partner export for 28 July–10 August.

### Full corpus compliance recheck: 12 August 2026

- Re-ran the full production claim scan across **2,279/2,279** sitemap URLs: **0** provider-count, reader-count, speed-test-count, maximum-speed, speed-retention or rank findings, with 0 fetch errors.
- Re-ran the Nord promotion-context audit across the same **2,279/2,279** URLs: **1,755** pages and **8,450** affiliate links, 0 missing `sponsored nofollow` pages, 0 disclosure failures, 0 interruptive-promotion flags and 0 fetch failures. Twelve contextual flags remain the documented manual-review set (free-trial or explanatory incentive language), not technical violations.
- These fresh scans strengthen release confidence but do not provide conversions, revenue or EPC; the matched Nord partner export remains the only open measurement-gate input.

### Short.io path-level export guard: 12 August 2026

- Extended `scripts/export-shortio-metrics.mjs` with a separate `--paths-out` diagnostic CSV and a machine-readable `popularPathExport` section. The exporter now preserves wildcard/deleted/path-level observations without silently treating them as current-page attribution.
- The current-link CSV remains the source for stable Short.io slug joins; the path CSV is a reconciliation aid and cannot close the conversion gate by itself. The Nord partner export is still required for conversions, revenue and EPC.

### Nord dashboard access recheck: 12 August 2026

- A fresh read-only Chrome check found no open Nord affiliate tab in the connected session. Opening the performance-report URL directly redirected to `https://affiliates.nordvpn.com/login`, so no authenticated CSV/API response was available.
- No credentials, cookies or session data were inspected or copied. The partner gate remains correctly closed until an authenticated dashboard export for 28 July–10 August is available.

### Nord affiliate interim screenshot: 12 August 2026

- The user-supplied authenticated Nord Performance Report screenshot for **6–12 August 2026** shows **19 clicks** (NordVPN 15, NordVPN China 2, NordVPN Arabia 2), **0 conversions**, **$0.00 payout** and **$0.00 EPC**. Full evidence and interpretation boundaries are recorded in [nord-partner-interim-screenshot-2026-08-12.md](../metrics/nord-partner-interim-screenshot-2026-08-12.md).
- This is not a downloadable export and does not match the 28 July–10 August GSC/Short.io window, so the partner conversion/revenue/EPC gate remains open. The next required input is a filtered Nord export for the matched window with timezone, clicks, conversions, payout/revenue and EPC.

### Nord network-claim consistency pass: 12 August 2026

- Audited public network wording after comparing the affiliate Offer 15 location list with the provider snapshot. The dashboard's **232 included locations** is campaign geography for eligibility, not NordVPN's server-network country count; public copy remains **7,400+ servers in 118 countries** from `src/lib/vpn-data.ts` and is not changed to 232.
- Removed stale hardcoded NordVPN server counts (`7,000+` and `6,400+`) from Android, tablet and iPad/iPhone surfaces. Those stats now render from the same `vpn-data.ts` record as reviews and comparison tables; the privacy and fastest-VPN surfaces now do the same.
- Added `npm run test:network-claims`, which locks the 7,400/118 snapshot, rejects retired literals and prevents affiliate geography from entering locale message copy. This is a consistency guard, not a claim of fresh provider evidence; the snapshot still needs a dated source refresh when the provider record is updated.
- Verification: network-claim regression passes, local editorial audit **52/52**, production build **4,447/4,447** and live editorial audit **25/25** with 135 compliant affiliate links. Latest deployment `dpl_J4wXrLvT61dMhZ64HaBz8rFVpXUi` is Ready and aliased to `https://www.zerotovpn.com`; live network routes return HTTP 200 with 7,400/118 and no retired 7,000/6,400 or 232-location copy. The Nord conversion/EPC partner gate is unaffected and remains open.

### Locale network-copy cleanup: 12 August 2026

- The browser smoke exposed the same retired 7,000/3,200 comparison wording inside localized Android benefit lists, even though the visible server stat was already dynamic. Replaced those stale numeric comparisons in all nine locale message files with bounded qualitative wording (large network / smaller than NordVPN).
- Extended the network regression to scan every locale message file for retired 7,000/6,400 literals. The public 232-location affiliate geography remains absent from locale product copy.

### Public article network-copy cleanup: 12 August 2026

- Updated the live-source and rendered English records for `is-brave-vpn-free-2026` and `best-country-for-vpn-server-location-2026`. Retired NordVPN/Surfshark/ProtonVPN network counts are replaced with the current provider snapshot where used, with a visible instruction to verify provider coverage before subscribing.
- Added regression coverage to `npm run test:network-claims` for both source/render pairs. It rejects retired 7,000/6,400/3,200 literals and requires the bounded current markers, preventing future importer drift.
- Verification: network-claim test passed, editorial audit **52/52**, production build **4,447/4,447**, lint **0 errors** (52 existing warnings), and live editorial audit **25/25** with **135** compliant affiliate links and zero rel, slug, metadata, freshness, image, schema, cluster or social-image failures.
- Production deployment `dpl_96sH29RSKkhSidCmLiagGcV21cA9` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and Chrome UI smoke checks returned one H1 per article, showed 7,400, and found no 7,000/6,400/3,200 remnants. This remains a claim-consistency release; the matched Nord conversion/revenue/EPC gate is still open.

### Comparison-table semantics and claim recheck: 12 August 2026

- Added explicit `scope="col"` semantics to every header in the Best VPN pillar comparison table and made the shared `TableHead` primitive emit the same scope for localized comparison tables. The tables already had captions or row headers where applicable; this closes the remaining header-association gap in the on-page accessibility/SEO checklist.
- Added the semantic requirement to `npm run audit:editorial`, so a future table refactor cannot silently remove column-header scope. The fresh full live claim audit checked **2,279/2,279** URLs with **0** findings and **0** fetch errors across all configured claim patterns.
- Local verification: editorial audit **53/53**, network-claim regression passed and production build **4,447/4,447**. Production deployment `dpl_CNxtncuN49BW5NqVBQVeAo8MriMX` is Ready and aliased to `https://www.zerotovpn.com`; the English pillar returned HTTP 200, one H1, six `scope="col"` headers and five `scope="row"` cells in both HTTP and Chrome UI smoke checks. The change is limited to markup semantics; affiliate destinations, disclosure and newsletter-only popup behavior are unchanged.

### Shared comparison-table inline prices: 12 August 2026

- Updated the shared localized/homepage comparison table so every displayed monthly price is an inline tracked affiliate link, alongside the existing provider CTA. Links use the shared `AffiliateTextLink` contract, expose the provider's Short.io slug, and retain `rel="noopener noreferrer sponsored nofollow"`; a regression guard now requires this price-link contract.
- Production deployment `dpl_2x6teyDMvtged4qKCspW4wZ34Pfu` is Ready and aliased to `https://www.zerotovpn.com`. Live Dutch Best VPN smoke returned HTTP 200, one H1 and **38** price links; the first link resolved to `https://go.zerotovpn.com/nordvpn` with the expected rel and `nordvpn` slug. The homepage rendered 5 price links.
- Fresh release gates: editorial **25/25** with **140** compliant affiliate links; full affiliate-context audit **2,279/2,279** URLs, **8,799** links, **0** missing rel pages, **0** disclosure failures, **0** interruptive-promotion markers and **0** fetch failures. The 12 classified contextual review flags remain unchanged.

### Shared comparison-table captions: 12 August 2026

- Added a visually hidden, localized `<caption>` to the shared homepage and localized comparison table. The nine supported locale message files now provide a clear table description, while the existing `scope="col"` headers and tracked inline prices remain unchanged.
- Extended `npm run audit:editorial` so the shared comparison component must retain both the caption primitive and its localized `caption` key. This protects the table's accessible name during future refactors without adding visual clutter or changing affiliate destinations.
- Production deployment `dpl_3fJ8FUzjo3sowoDU7a2XsTvRaD33` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and browser smoke checks returned one H1, `VPN-vergelijkingstabel`, **38** tracked price links on `/nl/best/best-vpn`, and **5** on `/nl`; the first price link still resolves to `https://go.zerotovpn.com/nordvpn` with `sponsored nofollow`.
- Fresh live release gates remain green: editorial **25/25** with **140** compliant affiliate links; affiliate-context **2,279/2,279** URLs, **1,755** affiliate pages, **8,799** links, 0 missing rel, 0 disclosure failures, 0 interruptive flags and 0 fetch errors. The 12 classified contextual flags and the matched Nord conversion/EPC gate are unchanged.

### Commercial pillar SERP metadata experiment: 12 August 2026

- Used the authenticated 28 July–10 August Search Console export to prioritize the existing English `/best/best-vpn` pillar: **2,554 impressions**, **1 click**, **0.04% CTR** and average position **52.47**. This is a measured CTR hypothesis, not a claim that metadata alone caused the performance.
- Reworked only the English title and description to lead with the query and decision criteria: `Best VPN 2026: Compare Privacy, Streaming & Value Picks` and a description covering privacy, streaming, speed, price, current plans, protocols and dated checks. The page body, rankings, affiliate destinations and localized metadata were not changed.
- Added a regression guard for the new commercial-intent metadata and rejected the retired generic title. Local editorial checks pass **55/55** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_6Znhox4GzkoFRfCGG4QVJ3Nx6vqi` is Ready. HTTP and browser checks confirm the English route returns one H1, nine FAQ items, the new title/description and 21 compliant affiliate links; the live editorial gate remains **25/25** with **140** affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster or social-image failures.
- Measurement protocol: retain the current title for the next matched Search Console window, then compare impressions, CTR, position and qualified Short.io clicks. Do not publish new commercial URLs or infer conversions/EPC until the Nord partner export is joined.

### Iran pillar SERP metadata experiment: 12 August 2026

- Used the same authenticated Search Console window to prioritize the canonical English Iran article: **746 impressions**, **4 clicks**, **0.54% CTR** and average position **10.08**. Separate legacy/locale Iran URLs remain outside this experiment so cannibalisation is visible rather than hidden.
- Reworked the canonical article's shared editorial title and excerpt to lead with the exact query and the evidence-led decision criteria: `Best VPN for Iran 2026: Tested Options & Setup Limits`, with obfuscation, app access, privacy evidence and bounded testing in the description. No provider performance guarantee, legal claim or affiliate destination was added.
- Added a regression guard for the new Iran metadata and rejected the former long title. Local editorial checks pass **56/56** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_9tErEq8ckUHiUBA4cXUFXu4CbXnv` is Ready. HTTP and browser checks confirm one H1, 11 H2s, 17 H3s, six tracked affiliate links, visible disclosure and the new title/description; the live editorial gate remains **25/25** with **140** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster or social-image failures.
- Measurement protocol: compare the canonical article and its legacy/locale siblings separately in the next matched Search Console window; keep conclusions about conversions/EPC closed until the Nord partner export is joined.

### Russia pillar SERP metadata and table semantics: 12 August 2026

- Used the authenticated Search Console window to prioritize the canonical English `/countries/russia` hub: **1,016 impressions**, **2 clicks**, **0.20% CTR** and average position **21.35**. The separate `/best/vpn-russia` route remains a comparison point with its own **185 impressions**, **1.08% CTR** and position **24.98**; it was not edited in this experiment.
- Reworked only the English Russia metadata and matching editorial H1 to lead with the query and evidence-led decision criteria: `VPN for Russia 2026: Obfuscation, Setup & What to Verify`. The description now covers app access, privacy evidence, preparation and ISP/device/protocol-specific testing without promising permanent access.
- Added explicit `scope="col"` to the Russia decision table's three headers and extended the regression guard for both semantics and metadata. Local editorial checks pass **57/57** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_5zdxPtt5nGNAiNfNkeBnVJBL4CU4` is Ready. HTTP and browser checks confirm one H1, six H2s, 11 H3s, three scoped table headers, six tracked affiliate links and visible disclosure; the live editorial gate remains **25/25** with **140** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster or social-image failures.
- Measurement protocol: compare `/countries/russia` and `/best/vpn-russia` separately in the next matched Search Console window, then join qualified Short.io clicks and the Nord partner export before drawing conversion conclusions.

### Free-trial pillar SERP metadata and table semantics: 12 August 2026

- Used the authenticated 28 July–10 August Search Console export to prioritize the existing English `/best/vpn-free-trial` pillar: **1,251 impressions**, **4 clicks**, **0.32% CTR** and average position **51.42**. The query mix includes `free trial vpn` (**443 impressions**, position **45.63**), `vpn free trial` (**191 impressions**, **1 click**, **0.52% CTR**) and `vpn free trial no credit card` (**16 impressions**, position **64**).
- Reworked only the English title, description and H1 to lead with the search intent: `Best VPN Free Trials (Aug 2026): 7-Day & No-Card Options` and `Best VPN Free Trials: Real Trials, Refunds & No-Card Options`. Existing provider terms, source dates, refund boundaries, affiliate destinations and newsletter-only popup behavior remain unchanged.
- Added a visually hidden comparison-table caption and explicit `scope="col"` semantics to all five trial-table headers. The local editorial regression audit passes **58/58** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_2HmNZKyD6ENEKhvM8Q7ZWWTabEs7` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and browser checks confirm status 200, one H1, the new title/description, caption `VPN free trial comparison`, five scoped column headers, 22 tracked affiliate URLs in the HTML response (11 visible browser anchors after client rendering) and a visible affiliate disclosure.
- Fresh live release gate: **25/25** editorial targets pass with **140** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures. Measurement protocol: retain this title for the next matched Search Console window and compare impressions, CTR, position and qualified Short.io clicks; do not infer conversions/EPC until the dated Nord partner export is joined.

### French free-VPN pillar localization: 12 August 2026

- Used the authenticated Search Console export to prioritize `/fr/best/free-vpn`: **1,948 impressions**, **1 click**, **0.05% CTR** and average position **59.55**. Query evidence is clearly French-led, including `vpn gratuit` (**414 impressions**, **1 click**, **0.24% CTR**), `meilleur vpn gratuit` (**131 impressions**) and `comparatif vpn gratuit` (**91 impressions**).
- Localized the existing evidence-led template for the French route instead of changing only the title tag: metadata, H1, navigation, free-tier cards, safety checklist, paid-upgrade boundary, FAQ, source labels and JSON-LD now use French copy. Provider facts, official source URLs, affiliate destinations, disclosure and bounded claims remain the same as the English page.
- Added a shared typed copy map in `src/components/editorial/free-vpn-copy.ts`, kept English output unchanged, and added a regression guard for both localized evidence copy and the template contract. Local editorial audit passes **60/60** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_JBxyLaQi8GkoyTEarDQt1fP5RZaZ` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and browser checks confirm `/fr/best/free-vpn` returns 200, one French H1, nine FAQ items, French disclosure/navigation and three rendered affiliate anchors; the English canonical still renders its original English copy.
- Fresh live release gate: **25/25** editorial targets pass with **140** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures. Measurement protocol: compare French impressions, CTR, position and qualified Short.io clicks in the next matched window; do not infer conversions/EPC until the dated Nord partner export is joined.

### Spanish free-VPN pillar localization: 12 August 2026

- Used the authenticated Search Console export to prioritize `/es/best/free-vpn`: **478 impressions**, **1 click**, **0.21% CTR** and average position **49.44**. Spanish query evidence includes `vpn gratis` (**42 impressions**, **1 click**, **2.38% CTR**), `gratis vpn` (**47 impressions**) and `mejor vpn gratis` (**22 impressions**).
- Extended the same evidence-led copy map to Spanish: metadata, H1, navigation, free-tier cards, safety checklist, paid-upgrade boundary, FAQ, source labels and JSON-LD are now Spanish. Provider facts, official source URLs, affiliate destinations, disclosure and bounded claims remain unchanged.
- Added Spanish copy to the typed localization guard. Local editorial audit passes **60/60** and the Webpack build generates **4,447/4,447** routes.
- Production deployment `dpl_5WPpg13sR9KWe3HPR9Ek4E1NTfUr` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and browser checks confirm `/es/best/free-vpn` returns 200, one Spanish H1, nine FAQ items, Spanish navigation/disclosure and three rendered affiliate anchors; English and French routes remain correctly localized.
- Fresh live release gates: editorial **25/25** with **140** compliant affiliate links; full affiliate-context audit **2,279/2,279** URLs, **1,755** affiliate pages, **8,799** links, zero disclosure/rel/interruptive/fetch failures and the same 12 manual contextual flags. Measurement protocol: compare Spanish impressions, CTR, position and qualified Short.io clicks in the next matched window; do not infer conversions/EPC until the dated Nord partner export is joined.

### Affiliate-context recheck after cheap-VPN release: 12 August 2026

- Re-ran the Nord promotion-context audit across **2,279/2,279** sitemap URLs after the final cheap-VPN deployment: **1,755** affiliate pages, **8,799** tracked affiliate links, **0** missing `sponsored nofollow` pages, **0** disclosure failures, **0** interruptive-promotion flags and **0** fetch failures.
- The same **12** contextual flags remain the documented manual-review set (free-trial or explanatory incentive language); no new coupon, cashback, popup-affiliate or unrelated-content violation was introduced. Evidence is stored in [affiliate-context-audit-2026-08-12.md](../metrics/affiliate-context-audit-2026-08-12.md).

### Cheap-VPN pillar SERP metadata and table semantics: 12 August 2026

- Used the authenticated 28 July–10 August Search Console export to prioritize the existing English `/best/vpn-cheap` pillar: **856 impressions**, **1 click**, **0.12% CTR** and average position **54.26**. The query mix is led by `cheap vpn` (**171 impressions**, position **51.3**), `cheapest vpn` (**104 impressions**, position **49.05**) and `vpn cheap` (**60 impressions**, position **53.17**), with related value-intent variants such as `affordable vpn` and `best cheap vpn`.
- Reworked only the English title, description and H1 to match that intent: `Best Cheap VPNs (Aug 2026): Cheapest Plans Compared` and `Best Cheap VPNs in 2026: Cheapest Plans Compared`. Existing provider prices, source boundaries, affiliate destinations and newsletter-only popup behavior remain unchanged.
- Added a visually hidden comparison-table caption and explicit `scope="col"` semantics to all seven cheap-VPN table headers. The local editorial regression audit passes **59/59** and the Webpack build generates **4,447/4,447** routes.
- Replaced the page's stale hardcoded server-count strings with the shared provider snapshot and labelled them `Provider-stated` (live values now render 4,500+, 11,690+, 35,000+, 7,400+ and 15,000+ for the five listed providers). This keeps the value page aligned with the network-claim consistency guard and avoids presenting the Nord offer's 232 eligible locations as a server count.
- Production deployment `dpl_Dh1bktEyF6SL4uKVDdph8L6huz5d` is Ready and aliased to `https://www.zerotovpn.com`. HTTP and browser checks confirm status 200, one H1, the new title/description, caption `Cheap VPN price comparison`, seven scoped column headers, 36 tracked affiliate URLs in the HTML response (18 visible browser anchors after client rendering), the five dynamic provider-stated values and a visible affiliate disclosure.
- Fresh live release gate: **25/25** editorial targets pass with **140** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures. Measurement protocol: retain this title for the next matched Search Console window and compare impressions, CTR, position and qualified Short.io clicks; do not infer conversions/EPC until the dated Nord partner export is joined.

### Russia alias/canonicalisation check: 12 August 2026

- Confirmed that `/best/vpn-russia` has no independent page source: `src/lib/blog-redirects.generated.json` permanently redirects it to the canonical `/countries/russia` hub. The alias therefore remains intentionally untouched; editing it would create duplicate intent and hide the existing comparison signal.
- The matched Search Console window still reports the alias separately (**185 impressions**, **1 click**, **1.08% CTR**, position **24.98**) and the canonical hub separately (**1,016 impressions**, **2 clicks**, **0.20% CTR**, position **21.35**). The Russia metadata/H1/table experiment applies only to the canonical hub, so the next window can measure consolidation rather than a second page rewrite.

### ChatGPT page SERP/cluster refinement: 12 August 2026

- Prioritized the existing `/blog/best-vpn-for-chatgpt-2026` page from the same Search Console window: **536 impressions**, **2 clicks**, **0.37% CTR**, average position **9.22**. French and Spanish fallbacks add **106** and **42** impressions respectively, so the page already has international demand without creating new URLs.
- The English page now uses the tighter decision title `Best VPNs for ChatGPT 2026: What Works in Restricted Countries` and a bounded description focused on access checks, latency, mobile setup and privacy limits. The rendered H1 and Article JSON-LD use the same title; no new provider performance or permanent-access claim was added.
- Added a three-link AI-privacy cluster block to the existing blog template: the best-VPN hub, an AI privacy/data-leak explainer and the China country guide. Existing affiliate normalization still adds `sponsored nofollow` to tracked anchors, and no popup/discount/coupon CTA was introduced.
- Verification completed: targeted lint passed with the existing single image optimization warning, the Webpack build generated **4,447/4,447** routes, and production deployment `dpl_BXCfuKPA8i6puVs42mNKZVJuqK1K` is Ready and aliased to `https://www.zerotovpn.com`. Live HTTP smoke returned status 200, one H1, the new title and all three cluster hrefs. The production editorial gate remains **25/25** with **140** compliant affiliate links; the full affiliate-context audit remains **2,279/2,279** URLs with 0 missing rel pages, 0 disclosure failures, 0 interruptive flags and 0 fetch failures. Keep the title for the next matched Search Console window; do not infer conversions/EPC from the interim Nord screenshot.

### Legacy deal/coupon page compliance remediation: 12 August 2026

- Search Console still showed `/blog/vpn-price-comparison-best-deals` as an impression-bearing legacy page (**718 impressions**, **0 clicks**, average position **40.54**). Source inspection found unassigned coupon-code language, stale “up to 83%” savings, “exclusive” offers and daily-deal claims, which do not satisfy the Nord promotion rules.
- Added a publication block for the legacy slug and locale variants, plus permanent redirects to the evidence-led `/best/vpn-cheap` pillar. The old page is no longer in the sitemap; live checks return **308** to `/best/vpn-cheap` (and `/nl/best/vpn-cheap` for the Dutch variant), while the target returns **200** with one H1.
- Added regression checks for both the publication block and locale-aware redirect. Local editorial audit passes **62/62**, the build generates **4,438/4,438** routes after removing the blocked post from static generation, and the post-release affiliate-context audit checks **2,271/2,271** sitemap URLs with 0 disclosure, rel, interruptive or fetch failures. The 12 existing manual contextual flags remain unchanged.

### Legacy free-VPN promotion cleanup: 12 August 2026

- Audited the two remaining high-impression legacy pages named in the Nord compliance report: `/blog/best-free-vpn-reddit-2026` (**623 impressions**, **1 click**, position **9.78**) and `/blog/is-brave-vpn-free-2026` (**557 impressions**, **0 clicks**, position **20.21**).
- Removed the unassigned Nord coupon/discount language and `/coupons/*` links from both the markdown sources and the rendered English records. Relevant review links remain editorial; no Nord affiliate destination was added to either page. A reusable sanitizer script documents the mechanical record update, and `audit:editorial` now fails if these pages regain coupon markers.
- Production smoke after deployment `dpl_FjXS6gTfHwoDSL8huCAJkFv5frKN` confirms both pages return **200**, one H1, visible disclosure, zero coupon markers inside the article body and zero Nord affiliate destinations. Local editorial checks pass **63/63** and the release build remains **4,438/4,438** routes.

### Nvidia Shield promotion cleanup: 12 August 2026

- A second legacy commercial pattern was found in `/blog/best-vpn-for-nvidia-shield-2026`: the NordVPN and Surfshark rows used coupon/deal labels even though the page is an Android TV setup and streaming guide. The links had already normalized to review destinations in the rendered record, but the labels still implied unassigned promotions.
- Replaced both labels with neutral `Compare current plan terms` links to the evidence-led cheap-VPN pillar in the markdown source and English rendered record. No affiliate destination, price fact or disclosure behavior changed.
- Added a fail-closed editorial regression check covering the source and all rendered locale records. Local editorial checks now pass **64/64**; the Nord partner screenshot remains an interim **19-click / 0-conversion** observation for 6–12 August and is not joined to the 28 July–10 August Search Console/Short.io window.

### Seasonal Black Friday route compliance: 12 August 2026

- The dedicated `/blog/vpn-black-friday-2026` route was `noindex` but still rendered unverified percentage discounts, limited-time language and NordVPN affiliate CTAs outside the active promotion window. `noindex` alone did not satisfy the Nord promotion rules.
- Removed the route from the app surface and blocked its slug from the published blog corpus. English and all supported locale variants now permanently redirect to the evidence-led `/best/vpn-cheap` pillar; the seasonal route is excluded from the sitemap.
- Added publication and redirect regression checks. The clean build now generates **4,429/4,429** routes (18 seasonal route variants removed), and the Nord partner screenshot remains an interim **19-click / 0-conversion** observation rather than matched conversion evidence.
- Verification: production deployment `zerotovpn-e0whvcoaw-marvinnl046s-projects.vercel.app` is Ready; all 9 locale redirects return **308** to the corresponding `/best/vpn-cheap` path, the seasonal slug is absent from the live sitemap, and the full sitemap audit passes **2,271/2,271** with zero status, indexability, canonical, H1 or slow-response failures.

### Fail-closed NordVPN affiliate configuration: 12 August 2026

- Wired `VPN_APPROVED_AFFILIATE_IDS` and `AFFILIATE_VPN_NORDVPN_URL` into `src/lib/vpn-links.ts`. `getVpnAffiliateUrl("nordvpn")` now returns an affiliate destination only when `nordvpn` is explicitly approved, the destination parses as HTTPS, and the server-side URL is present; otherwise it returns an empty value instead of silently using a hard-coded Nord destination.
- Added a source regression guard and verified the resolver in three isolated cases: no approval → empty, approved HTTPS → `https://go.zerotovpn.com/nordvpn`, non-HTTPS → empty. Configured the approved ID and owned Short.io destination in local ignored env and Vercel Production without exposing credentials.
- Local editorial checks now pass **69/69**, including the retired-promotion payload guard. Production verification on the environment-backed deployment confirms approved commercial pages retain Nord links while restricted routes retain their empty affiliate boundary: `/best/best-vpn` returned 200 with 21 affiliate anchors (including five `data-affiliate-slug="nordvpn"` anchors), `/best/vpn-torrenting` returned 200 with zero affiliate anchors, and the Shield guide returned 200 with zero direct affiliate anchors.

### Global promotion-copy neutralization: 13 August 2026

- Replaced generic “exclusive deals/offers” language in the global Open Graph image, Twitter image, JSON-LD descriptions, locale metadata and English homepage/newsletter metadata with evidence-led comparisons, current plan terms and buying guidance. This keeps the email-only exit-intent collection prompt available without presenting an unassigned Nord offer.
- Added regression checks to `scripts/editorial-audit.mjs` for the global metadata/owned-media surfaces and retired promotion namespaces in the client payload. Local editorial audit now passes **69/69**.
- Production deployment `zerotovpn-iojkvidp2-marvinnl046s-projects.vercel.app` is Ready. Live `/en` and `/nl` HTML checks return 200 with no legacy exclusive-offer, coupon or claim-deal markers; the full editorial audit passes **25/25**, and the affiliate-context audit checks **2,271/2,271** URLs with **0** missing-rel, disclosure, interruptive, fetch or slow-response failures. The 11 remaining manual contextual flags are documented and are not inferred as policy violations.

### Educational video-call guide promotion cleanup: 13 August 2026

- The affiliate-context audit identified one manual flag on `/blog/vpn-leaks-video-calls-slack-discord-teams-2026`: a setup step recommended a “free trial” next to contextual provider links. The page is educational, but neutral refund-window wording is clearer and avoids sounding like an unassigned incentive.
- Replaced that sentence in the English rendered record with `documented refund window`, extended `scripts/sanitize-legacy-promotion-records.mjs` for repeatability, and added an editorial regression guard. Local editorial audit now passes **70/70** and the production build generates **4,429/4,429** routes.
- The live affiliate-context audit remains the release gate after deployment; the dedicated free-trial pillar retains its legitimate trial-intent language and remains a separate contextual review item. The manual flag count drops from 12 to 11 after this change.

### Contextual promotion-flag classification and measurement-pipeline checks: 13 August 2026

- Added [the contextual flag review](../compliance/nordvpn-contextual-flag-review-2026-08-13.md), classifying the 11 remaining raw matches into nine locale variants of the legitimate free-trial comparison pillar and two educational uses of “incentives” describing data-collection economics. The raw audit remains intentionally strict; these are documented context decisions, not hidden allowlist entries.
- Re-ran `npm run test:measure-editorial` and `npm run test:measurement-inputs`. Both suites pass, including localized CSV parsing, empty-partner handling, required-input validation, date-window matching and partner-window mismatch rejection.
- The 14-day KPI gate is still open: Search Console and Short.io evidence is real and cached, but no authenticated Nord partner export matching 2026-07-28 through 2026-08-10 is available. Do not infer conversions, revenue, EPC or attribution from the interim screenshot.

- Added the [Nord partner export handoff](../metrics/nord-partner-export-handoff-2026-08-13.md) with the exact shared window, accepted column names, fail-closed validation behavior and reproducible commands for the final joined report. This removes format ambiguity without treating the dashboard screenshot as a substitute for dated export data.
- The documentation-only release is also live: Vercel deployment `dpl_8S6T6eAVA6zE5w96Yy9MjjVRHEHz` for commit `9ba95d8` reached **READY**, aliases `www.zerotovpn.com` and `zerotovpn.com`, and the live Best VPN pillar returned HTTP 200.

### Port-forwarding comparison intent refinement: 13 August 2026

- Used the authenticated Search Console query export to refine the existing `/best/vpn-port-forwarding` page. The query group contains **35 impressions** for `vpn with port forwarding`, **16** for `port forwarding vpn`, **14** for `best vpn with port forwarding` and **12** for `vpn port forwarding`; all currently sit outside page one, so the change targets intent clarity rather than claiming a ranking win.
- Updated the English title/H1 to `Best VPNs With Port Forwarding (Aug 2026): Providers Compared`, rewrote the description around provider comparison and source-checked limits, and added a reciprocal protocol-guide link. No new URL, discount, coupon or Nord CTA was introduced; the existing affiliate boundary remains provider-selection-only.
- Added the route to the live editorial target list and a build-time metadata/cluster-link regression guard. Local editorial audit passes **71/71**, lint has **0 errors** (51 existing warnings), and the production build generates **4,429/4,429** routes. The result is a controlled on-page hypothesis to measure in the next matched Search Console window, not a conversion conclusion.
- The first live target run caught a missing Open Graph image on this newly added route. Added the shared `DEFAULT_OG_IMAGE`, redeployed commit `afeb12a` as Vercel production deployment `dpl_5fPK3V7vG18CjNB4LiBrCR7BR9aG`, and re-ran the live gate: **26/26** targets pass with **143** compliant affiliate links and zero metadata, image, freshness, schema, rel, slug, cluster-link, content-brief or social-image failures. A compact HTTP smoke of the production page returned 200, the refined title, one H1, the shared `og:image`, FAQ schema and the reciprocal protocol-guide reference.

### Port-forwarding PAA expansion and DataForSEO dossier: 13 August 2026

- Added a cached US/English DataForSEO dossier for the existing port-forwarding page: four keyword-overview rows, 23 related suggestions, five SERP/PAA samples and 19 domain-competitor signals. The API returned `n/a` current volume and February 2024 as the latest non-zero history for the overview rows, so the dossier is explicitly treated as a structural/PAA brief rather than current demand proof. Evidence: [dataforseo-port-forwarding-cluster-2026-08-13.md](../research/dataforseo-port-forwarding-cluster-2026-08-13.md); reusable command: `npm run seo:port-forwarding`.
- Expanded the existing page's FAQ with four directly observed PAA intents: free-plan availability, setup steps, port 443 versus inbound forwarding, and static-IP boundaries. The answers remain provider-neutral and source-bounded; no new URL, discount, coupon or Nord CTA was introduced. Added all four questions to the local editorial regression guard.
- Local editorial audit passes **71/71**, targeted ESLint passes with **0 errors**, the new research script passes `node --check`, and the production build generates **4,429/4,429** routes. This is a controlled topical-authority improvement while the matched Nord partner KPI export remains pending.
- Production deployment `dpl_DXgHp577D3HcQ8WKBvjFTsdSHAer` for commit `ae6c00e` reached **READY**. Live HTML returned HTTP 200, the refined title, one H1, FAQ schema and all four PAA-derived questions; the post-deploy editorial gate remains **26/26** with **143** compliant affiliate links and zero metadata, image, freshness, schema, rel, slug, cluster-link, content-brief or social-image failures. Evidence: [editorial-live-audit-2026-08-12.md](../metrics/editorial-live-audit-2026-08-12.md).
- The post-release affiliate-context audit rechecked **2,271/2,271** sitemap URLs after the FAQ expansion: **1,755** affiliate pages, **8,799** links, zero missing rel/disclosure/interruptive/fetch failures and zero slow responses. The same 11 contextual flags remain classified for manual review; the new PAA answers introduced no new promotional flag.
- The post-release audit record was committed as `381e6d9` and deployed to production as `dpl_3WxR92tDjASGpdaW9UM7QZ7h2J33` (READY, aliased to `www.zerotovpn.com`). A fresh live smoke of `/best/vpn-port-forwarding` returned HTTP 200, the refined title, one H1, FAQ content and no Vercel runtime errors. This confirms the documentation/audit release is live; it does not close the matched Nord conversion/EPC gate.
- A fresh `npm run audit:editorial-live` recheck on 13 August again passed **26/26** targets with **143** compliant affiliate links and zero metadata, freshness, image, schema, rel, slug, cluster-link, content-brief or social-image failures. The refreshed evidence is stored in [editorial-live-audit-2026-08-12.md](../metrics/editorial-live-audit-2026-08-12.md); response durations are retained as observations, not conversion evidence.

### Reproducible measurement recheck: 13 August 2026

- Re-ran `npm run measure:editorial` against the retained authenticated Search Console Pages/Queries/Chart exports and the real Short.io click export for **28 July–10 August 2026**. The run processed **1,000** page rows, **1,000** query rows, **14** chart days and **39** Short.io rows, and reproduced the existing interim report exactly: **93** authoritative Search Console clicks, **36,763** impressions and cluster totals of 14 censorship, 11 commercial-pillar, 4 free-VPN, 0 travel and 0 protocols clicks in the downloaded page table.
- The importer records `requiredInputsPresent: true` but leaves `affiliate.partner.conversions`, `affiliate.partner.revenue` and `affiliate.partner.epc` missing because no Nord partner export was supplied. The output is kept in the ignored `.cache/metrics` folder; it is a reproducibility check, not a KPI conclusion or a page-selection decision.

### Commercial-pillar DataForSEO brief: 13 August 2026

- Added `npm run seo:best-vpn` and ran it against the existing US/English DataForSEO credentials without copying secrets into the repository. The dossier contains five keyword-overview rows, 75 deduplicated suggestions and six organic SERP/PAA samples for the existing commercial pillar; evidence is stored in [dataforseo-best-vpn-cluster-2026-08-13.md](../research/dataforseo-best-vpn-cluster-2026-08-13.md).
- Current volume fields were unavailable for these terms; the latest non-zero history is February 2024 (for example, 49,500 for `best vpn`). The PAA set is therefore used only to refine intent coverage and FAQ prioritisation. No page, price, affiliate destination or URL batch was changed, and the matched Nord KPI gate remains open.

### Commercial-pillar dossier release verification: 13 August 2026

- Commit `ae85619` (the reusable `seo:best-vpn` runner and its cached JSON/Markdown evidence) is deployed to Vercel production as [`dpl_E2gop4j8pVvqXcYUbn7x3N8UUtXT`](https://vercel.com/marvinnl046s-projects/zerotovpn/E2gop4j8pVvqXcYUbn7x3N8UUtXT), with the production aliases `www.zerotovpn.com` and `zerotovpn.com` remaining healthy.
- The post-deploy smoke of `/best/vpn-port-forwarding` returned HTTP 200, the refined title `Best VPNs With Port Forwarding (Aug 2026): Providers Compared`, exactly one H1 and all four PAA-derived FAQ questions. Vercel reported no runtime errors in the selected one-hour window.
- The repository is clean and the local editorial regression suite remains **71/71**; measurement-input and measurement-report regression suites also pass. This release changes research evidence and tooling only, so it intentionally creates no new URL batch and does not alter affiliate destinations or the open Nord partner-export gate.

### Locale homepage trust-copy cleanup: 13 August 2026

- A source-level review found that the homepage still rendered the unsupported `hero.trusted`/`home.hero.trusted` strings in all nine locales, even though the visible evidence-signal strip had already been rebuilt. These strings claimed more than 100,000 readers and were therefore inconsistent with the evidence-bounded homepage contract.
- Replaced both copies per locale with a neutral statement about independent, evidence-led VPN comparisons. No affiliate destination, popup behavior, ranking claim or URL changed.
- Added a fail-closed `npm run audit:editorial` check for both locale trust-copy paths. The local suite now passes **72/72**; the change is ready for the next production deployment and remains independent of the open Nord partner-export measurement gate.
- Commit `69c0b36` is now live in Vercel production as [`dpl_78ebtg8f1VAd4iHSuTj2ovrUdgG7`](https://vercel.com/marvinnl046s-projects/zerotovpn/78ebtg8f1VAd4iHSuTj2ovrUdgG7). Live `/` and `/nl` checks return HTTP 200 with one H1, the old reader-count strings absent and the neutral evidence-led copy present; the live sitemap returns 2,271 URLs and Vercel reports no runtime errors in the selected hour.

### Post-cleanup production audit: 13 August 2026

- Re-ran the live editorial gate after the locale trust-copy release: **26/26** targets pass with **143** compliant affiliate links, zero missing rel/slug attributes, zero missing cluster links, zero metadata/image/schema/freshness/content-brief/social-image failures and zero future structured-data dates. Evidence: [editorial-live-audit-2026-08-13.md](../metrics/editorial-live-audit-2026-08-13.md).
- Re-ran the full sitemap affiliate-context audit: **2,271/2,271** URLs, **1,755** affiliate pages and **8,799** links checked; missing-rel, disclosure, interruptive and fetch failures are all zero, as are responses over two seconds. The same **11** documented contextual review flags remain unchanged. Evidence: [affiliate-context-audit-2026-08-13.md](../metrics/affiliate-context-audit-2026-08-13.md).
- The full live claim audit also checked **2,271/2,271** URLs with zero fetch errors and zero findings for provider-count, reader-count, speed-test-count, maximum-speed, speed-retention or ranking claims. The sitemap audit independently confirms **2,271/2,271** HTTP 200 responses, zero noindex/canonical/H1 problems and zero responses over two seconds. Evidence: [claim-audit-2026-08-13.md](../metrics/claim-audit-2026-08-13.md) and [sitemap-audit-2026-08-13.md](../metrics/sitemap-audit-2026-08-13.md).

### Nord partner dashboard observation: 13 August 2026

- Transcribed the user-supplied authenticated Nord Performance Report screenshot for the selected **6–12 August 2026** period: **19 clicks**, **0 conversions**, **$0.00 payout** and **$0.00 EPC**. The offer split was NordVPN **15** clicks, NordVPN China **2**, and NordVPN Arabia **2**.
- This is retained as a provenance note only: it is an aggregate screenshot with no dated row, short-link key or page attribution, and it does not match the required **28 July–10 August** join window. It is not loaded into the measurement pipeline and does not change the next-page selection. Evidence: [nord-partner-observation-2026-08-13.md](../metrics/nord-partner-observation-2026-08-13.md).

### Commercial pillar PAA coverage: 13 August 2026

- Used the cached US/English DataForSEO dossier to extend the existing `/best/best-vpn` FAQ with four directly observed PAA intents: whether VPNs are worth it in 2026, the best VPN for streaming, Netflix detection when using a VPN, and the best free VPN for the USA.
- Answers stay provider-neutral and evidence-bounded: they explain variability by service, country, device and date, avoid permanent-unblocking or anonymity claims, and point readers back to current plan terms and documented free-tier limits. No new URL, discount, coupon or affiliate destination was added.
- Updated the pillar's content-brief and Article JSON-LD review date to **13 August 2026** and added a fail-closed source guard for all four PAA questions. Local editorial audit passes **73/73**; the production build generates **4,429/4,429** routes with no TypeScript errors.
- The matched Nord partner-export gate remains open. This is an on-page topical-authority refinement of an existing commercial URL, not a new 4–8 page selection or a conversion conclusion.
- Production deployment `dpl_CrbVMTbnBogVGMxFc8kcrZm9kCso` is READY and aliased to `https://www.zerotovpn.com`. The refreshed live editorial gate passes **26/26** targets with **143** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures; the page smoke returned HTTP 200, one H1, FAQ schema and all four PAA questions. Evidence: [editorial-live-audit-2026-08-13.md](../metrics/editorial-live-audit-2026-08-13.md).

### Localized structured-data freshness correction: 13 August 2026

- A source scan outside the current 26-route live target list found two localized guide branches with a future `dateModified` value (`2026-11-28`): `guides/vpn-protocols-explained` and `guides/what-is-vpn`. Future dates can mislead crawlers and make freshness signals inconsistent with the editorial record.
- Corrected both localized JSON-LD dates to **13 August 2026** and added fail-closed source guards so the future value cannot return unnoticed. No copy, URL, affiliate destination, CTA or popup behavior changed.
- Local editorial audit now passes **75/75**; the production build generates **4,429/4,429** routes. This is a bounded structured-data hygiene fix and does not close the pending Nord partner-export KPI gate.
- Commit `19f4063` is live in Vercel production as deployment `dpl_GjhC4yLbh3ePkheWGYfcbSDULnK6` (READY). Live `/nl/guides/vpn-protocols-explained` and `/nl/guides/what-is-vpn` both return HTTP 200, exactly one H1, `dateModified` **2026-08-13**, and no `2026-11-28`. The post-deploy editorial gate remains **26/26** with **143** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures.

### Free-trial pillar refresh and DataForSEO dossier: 13 August 2026

- Created the reusable `npm run seo:free-trial` runner and cached a US/English dossier for the existing `/best/vpn-free-trial` URL: six keyword-overview rows, 58 deduplicated suggestions and six SERP/PAA samples. The largest historical signal was `vpn free trial` at **9,900** (February 2024); current volume fields were unavailable, so these data are used for question coverage rather than demand or conversion claims. Evidence: [dataforseo-free-trial-cluster-2026-08-13.md](../research/dataforseo-free-trial-cluster-2026-08-13.md).
- Rechecked the provider sources before editing the page. Surfshark and CyberGhost still document their dated trial/device rules; ExpressVPN documents a 3-day iOS/Android trial separately from its 30-day money-back guarantee; NordVPN's current trial page now documents **7 days for new users on 1- and 2-year plans**, plus a separate 3-day Android route. The source-of-truth records in `src/lib/vpn-trials.ts` are dated **13 August 2026** and link to the first-party pages.
- Updated the existing page's rendered Nord verdict and FAQ coverage for no-card eligibility, automatic charging, 30-day refund-versus-trial distinction, provider selection and permanent free tiers. The newsletter exit-intent remains email-only and no new URL, coupon, unassigned offer or affiliate destination was introduced. Added regression guards for the updated date, provider terms and three PAA-derived questions. Local editorial audit passes **76/76**; targeted lint has **0 errors**; the production build generates **4,429/4,429** routes.
- This is a controlled existing-page refresh. Deployment `dpl_13vooWi8kDa3pEYuY1imaPJztCCZ` is READY and aliased to `https://www.zerotovpn.com`. Live `/best/vpn-free-trial` and `/nl/best/vpn-free-trial` return HTTP 200 with one H1, the 13 August structured-data date, all three new PAA questions and the updated seven-day Nord verdict; the post-deploy editorial gate remains **26/26** with **143** compliant affiliate links and zero metadata, freshness, schema, image, rel, slug, cluster-link, content-brief or social-image failures. This does not close the matched Nord partner-export gate or justify a new trial variant.

### Social-image cold-render hardening: 13 August 2026

- Vercel runtime logs showed one historical 300-second timeout on a cache-miss `GET /opengraph-image` during deployment `dpl_GjhC4yLbh3ePkheWGYfcbSDULnK6`; the same endpoint otherwise returned a valid PNG. The shared Open Graph and Twitter image routes now explicitly use `force-static` and synchronous `ImageResponse` renderers, with no external fetches.
- Commit `cde0229` is live as deployment `dpl_9qEgSSXrPuwifABoaWJmnd7tXnLR` (READY). Three cache-busting requests to each route returned HTTP 200, `image/png`, 35,536 bytes, and sub-2-second responses; no new runtime errors were recorded after 00:54 UTC. The earlier timeout remains historical Vercel telemetry, not a post-fix failure.

### Russia pillar PAA refresh and current dossier: 13 August 2026

- Refreshed the existing `/countries/russia` research with the authenticated US/English DataForSEO runner: five keyword-overview rows, 30 deduplicated suggestions, five SERP/PAA samples and 19 competitor-domain signals. Current volume fields were unavailable; the latest non-zero history is retained as context only. Evidence: [dataforseo-russia-cluster-2026-08-13.md](../research/dataforseo-russia-cluster-2026-08-13.md).
- Added three directly observed PAA questions to the English Russia FAQ: `Which VPNs work in Russia in 2026?`, `Which VPN supports Russia?` and `Can you use a VPN in Russia?`. Answers remain bounded by ISP, region, protocol, app version and changing legal conditions; no provider is presented as guaranteed and no legal advice is offered.
- Updated the English page review marker, Article JSON-LD dateModified and content brief to **13 August 2026**. The research script now writes date-stamped dossier filenames so future refreshes cannot silently overwrite an older evidence record. No new URL, coupon, discount or affiliate destination was introduced.
- Local editorial audit passes **78/78**, targeted ESLint reports **0 errors**, and the production build generates **4,429/4,429** routes. Local browser smoke on the new dev server returned HTTP 200-equivalent rendered content, one H1, ten FAQ questions, no Next error overlay and no console errors.
- Commit `026f6d1` deployed as `dpl_EMr1vJBonCgJicua54Thn4fZMo7c` (READY), then the live checker target was refreshed to the new `lastReviewedAt` date in commit `831e312`, deployed as `dpl_FmoHGSRuSbhqCae5q2HsFACdAmYQ` (READY). The final production gate passes **26/26** targets with **143** compliant affiliate links and zero metadata, image, freshness, schema, rel, slug, cluster-link, content-brief or social-image failures. Browser smoke of the final deployment returned one H1, all ten FAQ questions (including the three new PAA questions), FAQ schema, no error overlay and no console errors; Vercel reports no runtime errors after release.

### Free-VPN pillar PAA refresh and current dossier: 13 August 2026

- Refreshed the existing `/best/free-vpn` research with the authenticated US/English DataForSEO runner: six keyword-overview rows, 84 deduplicated suggestions and six SERP/PAA samples. Current volume was unavailable for most terms; only `are free vpns safe` returned a current 590 signal, so the dossier is treated as structural/PAA evidence rather than broad demand proof. Evidence: [dataforseo-free-vpn-cluster-2026-08-13.md](../research/dataforseo-free-vpn-cluster-2026-08-13.md).
- Added the directly observed PAA question `What’s the best free VPN right now?` to the existing English FAQ. The answer stays provider-neutral and evidence-bounded: it directs readers to compare documented data, location, device and privacy limits and verify current provider terms before installing. No new URL, coupon, discount or affiliate destination was introduced; the email-only exit-intent capture remains unchanged.
- Refreshed the English, French and Spanish visible review markers, Article JSON-LD dateModified and shared content brief to **13 August 2026**. Official Proton, Windscribe and TunnelBear pages remain the source links for the documented free-tier limits; the page does not imply that a free tier is universally best or permanently unblocking.
- Local editorial audit passes **78/78**, targeted ESLint reports **0 errors**, and the production build generates **4,429/4,429** routes. Browser smoke on the local dev server returned the English title, one H1, ten FAQ questions including the new PAA, FAQ schema, 62 links, no error overlay and no console errors; the French and Dutch routes also rendered one H1 without console errors.
- This is a controlled existing-page refinement while the matched Nord partner-export and Short.io attribution join remain pending. It does not reopen the paused 4–8 page selection or justify a new free-VPN URL batch.
- Commit `6eb8830` is live in Vercel production as [`dpl_2xa7CTNeAHCvQw2i5agAxCSdRHDk`](https://vercel.com/marvinnl046s-projects/zerotovpn/2xa7CTNeAHCvQw2i5agAxCSdRHDk), aliased to `https://www.zerotovpn.com`. The post-deploy editorial gate passes **26/26** targets with **143** compliant affiliate links and zero metadata, freshness, image, schema, rel, slug, cluster-link, content-brief or social-image failures; evidence: [editorial-live-audit-2026-08-13.md](../metrics/editorial-live-audit-2026-08-13.md).
- Production browser smoke returned HTTP 200-equivalent rendered content for `/best/free-vpn`, one H1, all ten FAQ questions including the new PAA, FAQ schema, the 13 August marker, no error overlay and no console errors. The email-only exit-intent behavior remains covered by the local regression suite.

### Nord partner-export access recheck: 13 August 2026

- Performed a read-only check of the available Nord affiliate browser session at `affiliates.nordvpn.com/publisher/#!/performance`; the session currently resolves to the Nord login page rather than an authenticated report. No credentials, cookies or private session data were inspected or transmitted.
- The measurement gate therefore remains intentionally open. The only available Nord performance evidence is still the user-supplied aggregate screenshot for 6–12 August (19 clicks, 0 conversions, $0 payout, $0 EPC), which does not match the required 28 July–10 August join window and cannot be attributed to page slugs.
- The exact export requirements and fail-closed commands remain in [nord-partner-export-handoff-2026-08-13.md](../metrics/nord-partner-export-handoff-2026-08-13.md). Once an authenticated dated CSV is available, run `measure:check-inputs`, `test:measure-editorial` and the documented `measure:editorial` command before selecting the next existing-page improvements. Until then, no conversion, revenue or EPC conclusion is made and no new URL batch is published.

### Gaming VPN intent refresh and DataForSEO dossier: 13 August 2026

- Prioritized the existing `/best/vpn-gaming` page from the retained Search Console window: **613 impressions**, **0 clicks** and average position **47**. This is an existing-page refinement hypothesis, not a ranking or conversion result.
- Added the reusable `npm run seo:gaming` runner and a dated US/English dossier with **7** keyword-overview rows, **80** deduplicated suggestions and **7** SERP/PAA samples. The largest historical signals were `gaming vpn` / `vpn for gaming` at **3,600** (February 2024); current volume is unavailable, so the dossier is used for intent coverage only. Evidence: [dataforseo-gaming-cluster-2026-08-13.md](../research/dataforseo-gaming-cluster-2026-08-13.md).
- Added bounded answers for the observed PAA intents `Do VPNs really work for gaming?`, `Will a VPN slow down gaming?`, `Can a VPN protect you from DDoS?` and `Can you put a VPN on an Xbox or PlayStation?`. Removed fixed English latency figures from the comparison cards/table and state the network-dependent test boundary instead. Added a table caption and scoped column headers; no new URL, discount, coupon or affiliate destination was introduced.
- Local editorial audit passes **79/79**, targeted lint has **0 errors**, and the production build generates **4,429/4,429** routes. The local browser smoke rendered one H1, the new table caption, route-dependent values, no overlay and no console errors (the current locale cookie selected Dutch; English FAQ/schema is covered by the source regression guard).
- This controlled gaming-page refresh remains separate from the open Nord partner-export gate and does not justify a new gaming URL batch.
