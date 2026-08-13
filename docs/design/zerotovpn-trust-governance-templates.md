# ZeroToVPN trust and governance templates

Status: design blueprint

Technical pilot: `/methodology`

Accountability pilot: `/about`

Visual references:

- `docs/design/zerotovpn-methodology-reference-concept-v1.png`
- `docs/design/zerotovpn-about-independence-concept-v1.png`
- `docs/design/zerotovpn-how-we-test-concept-v1.png`

## Separation of purpose

| Page | Reader question | Primary proof |
| --- | --- | --- |
| `/how-we-test` | What does ZeroToVPN actually do when it tests a VPN? | Visual test cycle, rig, result types, score lock, and re-test cadence |
| `/methodology` | Can I reproduce, audit, or challenge the method? | Versioned definitions, environment, weights, validity gates, evidence taxonomy, artifacts, and change log |
| `/about` | Who is accountable, why does this site exist, and what does funding influence? | Named founder, role ownership, editorial firewall, funding disclosure, limitations, and correction path |

These pages must cross-link but must not collapse into one long generic trust page.

## A. Technical methodology reference

### Required anatomy

1. Version, effective date, method owner, reviewer, downloadable specification, and change log.
2. Visual pipeline from test plan through publication and re-test.
3. Hard editorial firewall between immutable score lock and commercial link layer.
4. Method principles: repeatability, bounded claims, provenance, and affiliate separation.
5. Test environment and no-VPN baseline with location/device/target/tolerance context.
6. Complete run sequence with inputs, artifacts, and fail/retest condition.
7. Semantic metric matrix with measurement, unit/state, cadence, source type, and limitation.
8. Fixed 100% weighting model and exact formula behavior.
9. Explicit sample-data walkthrough from observation to weighted contribution.
10. Evidence and confidence taxonomy with expiry/recheck windows.
11. Freshness, event-triggered retest, stale warnings, and retained history.
12. Reproducibility artifact bundle and privacy-safe redaction policy.
13. Known-limitations matrix with mitigation and residual uncertainty.
14. Versioned revision log and public issue-reporting path.

### Reusable components

- `MethodologyDocShell`
- `MethodVersionHeader`
- `ResearchPipeline`
- `MethodPrinciples`
- `TestEnvironmentMap`
- `TestRunMatrix`
- `MetricDefinitionTable`
- `FixedWeightModel`
- `ScoringExample`
- `EvidenceTaxonomy`
- `FreshnessPolicy`
- `ArtifactBundle`
- `MethodLimitations`
- `MethodRevisionLog`

### Method integrity rules

- Weights sum to exactly 100% within a published version.
- A methodology change that can alter scores requires a version and impact note.
- Missing evidence remains missing; do not redistribute it silently without a published rule.
- Sample calculations are explicitly labelled and never presented as a provider result.
- Equipment, locations, test counts, and dates are drawn from run manifests in production.
- Commercial terms and commission rates remain outside technical scoring.

## B. Founder-led About and accountability

### Required anatomy

1. Human mission and real founder portrait.
2. Named role without invented credentials or fake team size.
3. `Why ZeroToVPN exists`: claim → test → evidence ledger → bounded verdict.
4. What the publication covers and the evidence boundary of each format.
5. Verdict workflow ending in score lock before disclosure/link insertion.
6. Accountability matrix for research owner, author, reviewer, publisher, and commercial link layer.
7. Funding flow and a clear `can influence / cannot influence` split.
8. Evidence-label glossary.
9. Honest `What we will not pretend` limitations.
10. Correction and challenge workflow.
11. Direct routes into How We Test, Methodology, and the annual research report.
12. Separate editorial, correction, and partnership contact channels.

### Reusable components

- `AboutEditorialHero`
- `FounderProfile`
- `TrustStrip`
- `WhyWeExistFlow`
- `PublicationAreas`
- `VerdictWorkflow`
- `AccountabilityMatrix`
- `FundingTransparency`
- `EvidenceLabelGlossary`
- `HonestLimitations`
- `CorrectionChallengeFlow`
- `TrustRouteShelf`

### Identity and trust rules

- Do not manufacture employees, reviewers, portraits, credentials, awards, press logos, offices, or test-volume claims.
- A role placeholder appears only as a process explanation and never as a named person.
- Show the real author and reviewer on each content record when assigned.
- Provider-supplied media is labelled as such and never presented as independent evidence.
- Partnership questions are separated from editorial corrections.
- Affiliate funding may determine which tracked link is available; it cannot edit evidence, score, criticism, ranking, or corrections.

## Accessibility and responsive behavior

- The methodology left rail collapses into an accessible jump menu.
- Equations have plain-language descriptions.
- Process diagrams have ordered-list equivalents.
- Evidence and freshness labels include text, not only color.
- Revision tables preserve row headers on small screens.
- Portrait alt text identifies Marvin by role without guessing personal attributes.
- Contact routes are visible text links and not icon-only controls.

## Acceptance criteria

- A technical reader can reproduce the scoring path from an observation to a versioned result.
- A normal reader can explain why commercial links cannot change a locked verdict.
- Method limitations are as visible as method strengths.
- The About page names a real accountable person and does not imply a fictional organization.
- Corrections and material method changes have public routes and ownership.

## Mockup prompt record

Mode: built-in image generation with local ZeroToVPN design references and the first-party Marvin portrait.

Prompt set:

- `Methodology`: a tall technical documentation page with a versioned research pipeline, exact environment, metric matrix, fixed 100% scoring model, sample-data calculation, evidence taxonomy, freshness policy, reproducibility bundle, commercial firewall, limitations, revision log, and issue-reporting path; no provider marketing or affiliate action.
- `About`: a tall founder-led editorial trust page using Marvin's real portrait, with the publication mission, claim-to-verdict flow, content areas, responsibility matrix, affiliate-funding boundary, evidence labels, honest limitations, correction workflow, research routes, and separated contact channels; no invented team members, credentials, numbers, awards, or press logos.
