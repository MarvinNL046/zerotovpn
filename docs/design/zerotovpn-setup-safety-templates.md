# ZeroToVPN setup tutorial and safety-verdict templates

Status: design blueprint

Setup pilot: `/guides/vpn-on-mobile`

Safety pilot: `/is-nordvpn-safe`

Visual references:

- `docs/design/zerotovpn-setup-tutorial-concept-v1-mobile.png`
- `docs/design/zerotovpn-provider-safety-verdict-concept-v1-nordvpn.png`

These two templates close different intent gaps. A setup tutorial helps a reader complete a task and prove that it worked. A safety verdict helps a reader evaluate a bounded claim against evidence and their own threat model. Neither should inherit the structure of a generic blog post or provider review.

## Shared visual system

- Dark navy global masthead and electric-blue report strip.
- Warm off-white editorial canvas.
- Electric blue for navigation, actions, and neutral test states.
- Lime only for completed steps or supported evidence.
- Amber for context, trade-offs, or unresolved dependencies.
- Red only for a confirmed failure or poor fit.
- Editorial serif headings with compact sans-serif UI and metadata.
- Wide diagrams, timelines, and semantic tables instead of repeated SaaS cards.
- Provider-supplied screenshots may inform a diagram but are not independent test evidence.

## A. Procedural setup tutorial

### Purpose

The setup template owns procedural intent: install, configure, verify, and troubleshoot. The pilot replaces the prose-heavy experience on `/guides/vpn-on-mobile`; the legacy `/how-to-set-up-vpn` redirect remains intact.

### Required anatomy

1. Answer-first hero with prerequisites and a visual `Install → Connect → Verify` sequence.
2. Platform selector with server-rendered iPhone and Android instructions.
3. Sticky five-stage progress rail: Choose, Install, Connect, Verify, Lock down.
4. `Before you start` checklist covering trusted app source, account access, base connection, and recovery access.
5. Six numbered steps per platform.
6. A visible `Done when…` criterion for every step.
7. Provider-neutral verification lab for public IP, DNS leaks, and kill-switch behavior.
8. Recommended-settings matrix with default, exception, and rationale.
9. Diagnostic branches for install, connection, internet, battery, and stale-region problems.
10. Public-Wi-Fi checklist and a clear phishing/malware limitation.
11. Neutral provider-selection bridge only after the full independent procedure.
12. FAQ, evidence, related setup guides, newsletter, and footer.

### Reusable components

- `TutorialPageShell`
- `TutorialHero`
- `PlatformSelector`
- `TutorialProgressRail`
- `PrerequisiteChecklist`
- `StepSequence`
- `DoneWhenCriterion`
- `ConnectionVerificationLab`
- `RecommendedSettingsMatrix`
- `SetupDiagnosticTree`
- `PublicWifiChecklist`
- `TutorialEvidenceLedger`

### Content and evidence rules

- Show the operating-system permission prompt when it matters; do not imply that a VPN profile can be installed without user approval.
- A connected icon is not proof of leak protection. Verification remains a separate stage.
- Never place a real IP address, account email, credential, or device identifier in a reusable screenshot.
- Distinguish operating-system behavior from provider-specific behavior.
- Use a provider screenshot only when the provider and capture date are visible in the evidence record.
- Do not recommend disabling a kill switch without explaining the temporary exposure.

### Responsive and accessibility behavior

- Six desktop steps become a vertical ordered list on small screens.
- Platform tabs retain direct links and work without client JavaScript.
- Each screenshot has adjacent instruction text and meaningful alt text.
- Progress is not communicated through color alone.
- Tool results use live regions and include a textual explanation.
- Minimum target size is 44×44 pixels.

### Acceptance criteria

- A beginner can complete setup without reading an unrelated provider review.
- Every step has a verifiable completion state.
- The page explains how to prove that the VPN is working.
- Troubleshooting changes one variable at a time.
- Commercial navigation appears only after the independent task is complete.

## B. Provider safety verdict

### Purpose

The safety-verdict template answers a narrower question than a provider review: whether a provider is safe for a specified user and threat model, what criticism is documented, and how strong the supporting evidence is.

The pilot uses NordVPN because the existing page already exposes a useful editorial conflict: ZeroToVPN often recommends and monetizes NordVPN, so the objections, evidence, and alternatives must be more visible—not less.

### Required anatomy

1. Prominent commission context and named author/reviewer.
2. Direct verdict with scope, not a star score.
3. Four-axis evidence summary: tunnel security, logging evidence, transparency history, and high-risk suitability.
4. Sticky navigation matching the real sections.
5. `What holds up` versus `What you should know` quick-answer blocks.
6. Reminder that safety is not anonymity.
7. Dense claim ledger with:
   - the claim;
   - what the evidence shows;
   - who should care;
   - evidence strength;
   - direct source.
8. Incident-and-response timeline separating event, disclosure, mitigation, audit, and current review.
9. Evidence-type labels: provider claim, independent audit, ZeroToVPN test, documented event, or unverified allegation.
10. Threat-model matrix for everyday privacy, travel/public Wi-Fi, port-forwarding needs, and state-level targeting.
11. Balanced alternatives tied to the exact limitation they solve.
12. Contextual review/price actions only after the evidence, with disclosure and no urgency.
13. Public source ledger, methodology, FAQ, related safety guides, and newsletter.

### Reusable components

- `SafetyVerdictShell`
- `ScopedVerdictHero`
- `EvidenceAxisSummary`
- `SafetyQuickAnswer`
- `ClaimLedger`
- `EvidenceStrengthBadge`
- `IncidentResponseTimeline`
- `EvidenceTypeLegend`
- `ThreatModelMatrix`
- `LimitationAlternative`
- `ContextualAffiliateBridge`
- `PublicSourceLedger`

### Verdict vocabulary

Use stable, bounded labels:

| Label | Meaning |
| --- | --- |
| Supported | Multiple relevant sources or repeatable tests support the claim. |
| Fair criticism | The limitation or event is documented and material for some users. |
| Needs context | The underlying fact is real but the broad conclusion does not automatically follow. |
| Not demonstrated | No adequate public evidence was found for the allegation. |
| Poor fit | The product lacks a capability required by this explicit threat model. |
| Re-evaluate | New evidence could materially change the verdict. |

Never substitute `debunked` for `not demonstrated` unless evidence affirmatively disproves the claim.

### Affiliate and legal guardrails

- State the commercial relationship before the first affiliate link.
- The hero action is `Read the evidence`, not `Buy now`.
- Do not use coupons, countdowns, unassigned promotions, hidden redirects, or fake scarcity.
- Provider trade marks identify the subject; they do not imply endorsement of ZeroToVPN's verdict.
- Contextual affiliate links use `rel="sponsored nofollow"` and a stable placement identifier.
- A provider-supplied asset is labeled and cannot be cited as independent proof.
- High-risk safety guidance is qualified and points readers to professional or organizational support when appropriate.

### Structured data and SEO

- Use `Article` or `Report` semantics, not `Product` review rating markup unless the page actually contains a review.
- Include `mainEntityOfPage`, `inLanguage`, named author, reviewer, publication/modification dates, and citations where supported.
- Keep the provider-review canonical separate; the safety page owns the safety/controversy intent.
- Link each criticism to its primary source as close as possible to the claim.
- Link naturally to the complete review, methodology, alternatives, port-forwarding guide, open-source explanation, and relevant incident record.

### Acceptance criteria

- A reader can state the verdict and its scope after the first screen.
- Criticism is not hidden below provider benefits or affiliate CTAs.
- Documented events and allegations are visually and linguistically distinct.
- Every material claim exposes evidence type, strength, checked date, and source.
- Alternatives solve a stated limitation rather than functioning as generic upsells.

## Mockup prompt record

Mode: built-in image generation with local ZeroToVPN design references, provider-source screenshots used only as visual references, and the first-party author portrait.

Prompt set:

- `Setup tutorial`: create a complete mobile-VPN procedural page with a platform selector, five-stage progress rail, parallel iPhone/Android step sequences, `Done when…` criteria, independent verification lab, settings matrix, troubleshooting branches, public-Wi-Fi warning, and a commercial bridge only after task completion.
- `Provider safety verdict`: create a complete NordVPN safety claim-check page with an answer-first scoped verdict, criticism ledger, incident/response timeline, evidence-type system, threat-model matrix, balanced alternatives, public sources, and a restrained disclosed affiliate bridge after the evidence.
