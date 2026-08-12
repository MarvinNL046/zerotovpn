# ZeroToVPN editorial, SEO & affiliate conversion roadmap

**Version:** 1.0 — 11 August 2026  
**Scope:** editorial templates, topical authority, organic CTR and compliant affiliate conversion  
**Primary references:**

- `C:\Users\M_Smi\Projecten\obsidian-vault\On-page SEO — 80+ Point Checklist.md`
- `C:\Projecten\zerotovpn\docs\research\tomsguide-best-vpn-page-analysis-2026-08-11.md`
- `C:\Projecten\zerotovpn\docs\plans\zerotovpn-masterplan-2026.md`

## Execution log

- **12 August 2026 — shared quick-pick template refinement:** Updated `EditorialQuickPickCard`, used by the Best VPN and Iran editorial surfaces, to show the provider's branded logo with meaningful alt text and an explicit plan/refund context line below the tracked price. This follows the Tom's Guide top-3 pattern while keeping the amount a transparent catalog value and the CTA compliant. The shared editorial guard now requires the provider mark and plan context; local checks pass **47/47**, targeted ESLint passes and the full Webpack build remains **4,447 routes**.

- **12 August 2026 — quick-pick production release:** Commit `8c600ac` deployed to Vercel production as `dpl_HCk1MiiaCm7ZTw7Q6AiBNx4jwwxM` and aliased to `https://www.zerotovpn.com`. A live browser check of `/best/best-vpn` confirmed one H1, three branded provider logo images with alt text, three plan/refund context lines, clickable prices and provider CTAs, the comparison table and the early disclosure/jump navigation.

- **12 August 2026 — partner export remains gated by authentication:** The Nord affiliate dashboard resolves to its login screen in the available browser session. No partner CSV/API response was accessible, so conversions, revenue and EPC remain `null`; the roadmap does not infer them from Short.io clicks. The next required input is a same-window Nord partner export after an authenticated dashboard session.

- **12 August 2026 — real Short.io API export captured:** Used the production `SHORTIO_API_KEY` through Vercel's environment runner to export the 28 July–10 August window. Domain totals are **7,663 clicks / 3,008 human clicks**; the current-link attribution CSV covers **39 links / 2,241 clicks / 1,791 human clicks**. The **5,422-click** residual is kept separate because Short.io reports wildcard/deleted paths that cannot be mapped to current page slugs. Evidence: [shortio-export-2026-08-12.md](../metrics/shortio-export-2026-08-12.md); reusable exporter: `scripts/export-shortio-metrics.mjs`. Partner conversions/revenue/EPC remain missing, so the formal conversion gate stays open.

- **12 August 2026 — real-export header validation:** The measurement input checker now recognizes Search Console's plural `Top queries` export header. The authenticated Pages and Queries files both pass header validation; `npm run test:measure-editorial` remains green.

- **12 August 2026 — real Search Console export captured:** Downloaded the authenticated `sc-domain:zerotovpn.com` Web-search export for **28 July–10 August 2026**. `Chart.csv` reports **93 clicks**, **36,763 impressions**, **0.253% CTR** and impression-weighted average position **33.42**. The 1,000-row Pages and Queries files are retained in ignored `.cache/metrics/gsc-2026-08-12/` and documented in [gsc-export-2026-08-12.md](../metrics/gsc-export-2026-08-12.md). The Search Console row in the completion matrix is now complete; Short.io and partner exports remain required before page selection or conversion conclusions.

- **12 August 2026 — exit-intent email collection confirmed:** The exit-intent dialog remains enabled as a first-party email/newsletter prompt. Added an explicit `data-email-collection-only="true"` contract to the dialog and extended the editorial guard so future changes fail if that marker, the newsletter source or the email-only copy contract disappears. The dialog contains no provider link, affiliate URL, coupon, discount, cashback, incentive or deal CTA. Commit `8201361` is pushed to `main`; Vercel production deployment `dpl_Ed7mHmrjYSwmWngmpi8bqxHEP6uf` is Ready. `npm run audit:editorial` passes **46/46**.

- **12 August 2026 — shared ranking-row price links:** Added an opt-in `priceLink` prop to `RankedVpnRow` and enabled it on the genuine commercial comparison routes `/best/vpn-streaming`, `/best/vpn-netflix` and `/best/vpn-firestick`. The torrenting route intentionally keeps its existing empty affiliate boundary and is guarded against accidental price linking. Local editorial checks pass **46/46** and the full Webpack build generates **4,447 routes**. Production deployment `dpl_F6ZyMUe1hpdn69y1L7R6xowDMvCY` is Ready; live HTML shows 13 affiliate nodes on each enabled route and none on the bounded torrenting route. The post-deploy gate remains **22/22**, and the full affiliate audit reports **2,279/2,279** URLs, **8,450** links, 0 missing-rel pages, 0 disclosure failures, 0 interruptive markers and 0 fetch failures.

- **12 August 2026 — cheap-VPN conversion pass:** Added tracked inline price links to the five ranked rows and five comparison-table prices on `/best/vpn-cheap`, using the shared `AffiliateTextLink` component. Added a regression guard so the page cannot lose its price-link contract. Local editorial checks now pass **44/44** and the full Webpack build generates **4,447 routes**. Production deployment `dpl_CYLb5e9X4cQ9shXTVJ69coau7y9o` is Ready; live browser QA confirmed one H1, ten price links, zero affiliate-rel violations, no horizontal overflow and no application error. The full affiliate-context audit checked **2,279/2,279** URLs and **8,315** links with **0** missing-rel pages, **0** disclosure failures, **0** interruptive markers and **0** fetch failures. The newsletter exit-intent remains email-only.

- **12 August 2026 — free-trial intent refinement:** Added Article JSON-LD with a dated modification signal to `/best/vpn-free-trial` and a contextual link to the evidence-led `/best/free-vpn` comparison in the permanent-free-plan section. The page remains affiliate-contextual and source-led; the exit-intent popup remains enabled exclusively for first-party email collection. Targeted ESLint, `npm run audit:editorial` (**43/43**) and the full Webpack build (**4,447 routes**) pass.

- **12 August 2026 — free-trial release:** Commit `152b5d5` deployed to Vercel production as `dpl_CMM4QwDiS5czQ9BMAgaqTjQ9CbAJ` (Ready). Live `/best/vpn-free-trial` returns HTTP 200, one H1, Article JSON-LD with `dateModified: 2026-08-12`, and the contextual `/best/free-vpn` links. The post-deploy editorial gate remains **22/22** with 123 affiliate links and zero metadata, freshness, schema-date, image, rel, slug or cluster-link failures. The popup policy remains newsletter-only; no provider links are present inside the popup.

- **12 August 2026 — inline price conversion:** Added four contextual price links to `/best/vpn-free-trial` using the shared `AffiliateTextLink` contract, so each visible plan price is a tracked `sponsored nofollow` link alongside the primary provider CTA. Local ESLint, the **43/43** editorial suite and the full **4,447-route** build pass. Production deployment `dpl_2U8VZxKdmM98estNDvZ9yFjB41dg` is Ready; live HTML returns HTTP 200, one H1 and four price links, while the post-deploy gate passes **22/22** with **127** affiliate links and zero rel, slug, metadata, image, freshness, schema-date or cluster-link failures. A live browser check confirmed one H1, four price links, no horizontal overflow and zero anchors inside the newsletter popup.

- **12 August 2026:** Removed the retired localized free-VPN implementation and its serialized translation payload. `/best/free-vpn`, `/fr/best/free-vpn` and `/nl/best/free-vpn` now expose the same evidence-led structure and locale-correct Article JSON-LD URLs; production HTML contains no legacy percentage/test-count claims. Local editorial checks pass **19/19**, the live editorial gate passes **15/15** with 94 affiliate links and zero metadata, freshness, schema, image, rel, slug or cluster-link failures. Deployment `dpl_4o7n2NxeqyjYNcV1dGAvxZdXB4c9` is Ready and aliased to `https://www.zerotovpn.com`. The full post-deploy audits remain healthy: **2,279/2,279** sitemap URLs and **1,755 pages / 8,189 affiliate links**, with zero technical policy or fetch failures. Evidence: [editorial-live-audit-2026-08-11.md](../metrics/editorial-live-audit-2026-08-11.md), [sitemap-audit-2026-08-11.md](../metrics/sitemap-audit-2026-08-11.md), [affiliate-context-audit-2026-08-11.md](../metrics/affiliate-context-audit-2026-08-11.md).

- **12 August 2026 — measurement gate:** Re-ran the production editorial, sitemap and affiliate-context audits after the free-VPN cleanup; all three remain green (**15/15**, **2,279/2,279**, and **1,755 pages / 8,189 affiliate links**, with zero technical failures). The local metrics folder still contains only explicitly named fixture exports, not real Search Console, Short.io or Nord affiliate data. The next 4–8 page selection therefore remains paused until matched 14-day exports are available; the review checkpoint is **25 August 2026**. The exit-intent popup remains enabled only as a first-party email/newsletter prompt. A production browser smoke confirmed the dialog contains the email form and dismiss controls but zero anchor elements: [exit-intent-popup-browser-smoke-2026-08-12.md](../metrics/exit-intent-popup-browser-smoke-2026-08-12.md).

- **12 August 2026 — DataForSEO pipeline gate:** Added tracked `DATAFORSEO_BASE64`, `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` placeholders to `.env.example` and a `npm run seo:smoke` command that correctly unwraps the Labs response. Using the existing local credentials only in the process, the smoke call returned real values for `yoga mat`: search volume **110,000**, keyword difficulty **37**, intent **transactional**; no secret was copied into the repository. The editorial and measurement regression suites still pass (19/19 and all four measurement cases).

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
- The 12 remaining promotion-term flags are the previously classified free-trial/plan wording on the dedicated trial pages and explanatory “incentives” language in privacy articles. The manual review record now points to the 12 August audit; no unassigned coupon, cashback, fake-expiry or irrelevant NordVPN placement was found.

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
