# ZeroToVPN — Topical Cluster & Internal Linking Optimization Plan

**Date:** 2026-03-14
**Status:** Draft — ready for implementation in dedicated session
**Goal:** Strengthen topical authority through better cluster organization, contextual internal links, and missing content gaps.

---

## Current State

ZeroToVPN already has strong foundations:
- **135 page routes** across 8 locales (~1,080 URLs)
- **452 pre-mapped content links** in `src/lib/content-links.ts`
- **3 linking components**: `related-content.tsx`, `related-pages.tsx`, `breadcrumb-schema.tsx`
- **Smart scoring algorithm** for related content (VPN slug overlap, tag matching, type diversity)
- **5 existing cluster patterns**: VPN-based, feature-based, country-based, comparison, guide

**What's missing:**
1. No explicit cluster navigation component (like go2thailand's ClusterNav)
2. Contextual in-content links are sparse — most linking is at page bottom
3. Some clusters lack a clear pillar/hub page
4. Cross-cluster linking could be stronger (e.g., country pages don't link to device pages)
5. Content gaps in some clusters reduce topical authority

---

## Cluster Architecture

### Cluster 1: VPN Reviews (pillar: `/reviews/`)

**Hub:** `/reviews/` — all VPN reviews listing
**Spokes:** `/reviews/[slug]/` — individual VPN review (33 VPNs)
**Cross-links needed:**
- [ ] Each review → comparison pages featuring that VPN
- [ ] Each review → best-of pages where that VPN appears
- [ ] Each review → country pages where that VPN is recommended
- [ ] Review hub → top 5 editor's choice with featured cards
- [ ] Review hub → "compare any two VPNs" CTA → `/compare/`

**Component:** Create `<ClusterNav type="review" vpnSlug="nordvpn" />` that renders:
- "Also compare: NordVPN vs ExpressVPN, NordVPN vs Surfshark" (auto-generated)
- "Best for: streaming, privacy, gaming" (from VPN data tags)
- "Available in: China, UAE, Turkey" (from country page cross-ref)

### Cluster 2: Best VPN for... (pillar: `/best-vpn/`)

**Hub:** `/best-vpn/` — overall best VPN ranking
**Spokes:** 35 best-of pages in `/best/` directory
**Sub-clusters:**
- **By use case:** streaming, gaming, torrenting, privacy, cheap
- **By device:** windows, mac, ios, android, linux, chromebook, firestick, tablet
- **By country:** china, thailand, bali, india, japan, etc.

**Cross-links needed:**
- [ ] Hub page → all sub-clusters with category grouping
- [ ] Each spoke → back to hub + sibling spokes in same sub-cluster
- [ ] Each spoke → relevant VPN reviews
- [ ] Add "Related best-of guides" section with 3-4 contextual picks

**Component:** Create `<BestOfClusterNav category="device" current="vpn-windows" />` showing:
- Other device pages: "Also see: Best VPN for Mac | iOS | Android | Linux"
- Parent link: "← Back to Best VPN 2026"

### Cluster 3: VPN by Country (pillar: `/countries/`)

**Hub:** `/countries/` — all country VPN guides
**Spokes:** 29 static country pages + dynamic catch-all
**Also linked:** `/vpn-for-[country]/` pages (duplicate pattern — consolidate?)

**Issues found:**
- [ ] **Duplicate routes**: Both `/countries/china/` AND `/vpn-for-china/` exist — pick one canonical, redirect other
- [ ] Country pages at `/vpn-for-*` (top-level) vs `/countries/*` — inconsistent

**Cross-links needed:**
- [ ] Each country → neighboring/related countries (e.g., UAE → Saudi Arabia → Turkey)
- [ ] Each country → relevant best-of (e.g., China → best-vpn-for-streaming, best-vpn-for-privacy)
- [ ] Each country → relevant guides (e.g., are-vpns-legal)
- [ ] Country hub → regional groupings (Asia, Middle East, Europe, Americas)

**Component:** Create `<CountryClusterNav region="asia" current="thailand" />` showing:
- Regional siblings: "VPN guides: China | Japan | Indonesia | Vietnam | India"
- Related: "Is a VPN legal here? | Best free VPN"

### Cluster 4: Educational Guides (pillar: `/guides/`)

**Hub:** `/guides/` — all VPN guides
**Spokes:** 10 guide pages + standalone educational pages

**Issue:** Educational content is split between:
- `/guides/what-is-vpn/` (in guides dir)
- `/what-is-a-vpn/` (top-level standalone)
- `/how-does-a-vpn-work/` (top-level)
- `/vpn-encryption-explained/` (top-level)
- `/are-vpns-safe/` (top-level)
- `/are-vpns-legal/` (top-level)

**Action needed:**
- [ ] Keep standalone URLs (they rank individually) but add cluster navigation linking them all together
- [ ] Create a "learning path" component: What is VPN → How it works → Protocols → Encryption → No-log policy
- [ ] Each guide → CTA to best-vpn (TOFU → BOFU funnel)

**Component:** Create `<GuideLearningPath current="what-is-vpn" />` showing:
- Sequential: "1. What is a VPN → **2. How it works** → 3. Protocols → 4. Encryption"
- Related: "Ready to choose? See our Best VPN 2026 ranking"

### Cluster 5: VPN Comparisons (pillar: `/compare/`)

**Hub:** `/compare/` — all comparisons
**Spokes:** Dynamic `/compare/[comparison]/` pages

**Cross-links needed:**
- [ ] Each comparison → full reviews of both VPNs
- [ ] Each comparison → other comparisons involving same VPNs
- [ ] Comparison hub → most popular matchups
- [ ] Each comparison → relevant best-of (e.g., NordVPN vs Surfshark → best for streaming)

**Already partially done** via `getRelatedContent()` — enhance with:
- "Read full NordVPN review →" and "Read full Surfshark review →" prominent CTAs
- "Other [VPN] comparisons:" horizontal scroll

---

## Implementation Tasks

### Task 1: Cluster Navigation Component
**Files:** `src/components/seo/cluster-nav.tsx` (NEW)
**What:** Reusable component that renders contextual navigation for any cluster type
**Props:** `type`, `current`, `category?`, `vpnSlug?`
**Renders:** Breadcrumb-style parent link + sibling links + cross-cluster CTAs

### Task 2: Contextual In-Content Links
**Files:** Update all page templates
**What:** Add `<ClusterNav>` to every page between content and existing `<RelatedContent>`
**Pattern:**
```
[Page content]
[ClusterNav — sibling/parent links]  ← NEW
[RelatedContent — smart scored links] ← EXISTS
```

### Task 3: Consolidate Duplicate Routes
**Files:** `src/app/[locale]/vpn-for-*/`, redirect config
**What:** Audit `/vpn-for-[country]` vs `/countries/[country]` overlap
**Decision:** Keep best-ranking URL, 301 redirect the other
**Candidates:**
- `/vpn-for-china/` vs `/countries/china/`
- `/vpn-for-thailand/` vs `/countries/thailand/`
- etc.

### Task 4: Extend content-links.ts
**File:** `src/lib/content-links.ts`
**What:** Add cluster metadata to existing links:
```typescript
{
  ...existingLink,
  cluster: "best-of",           // which cluster
  subCluster: "device",         // sub-grouping
  parentHub: "/best-vpn/",      // pillar page
  siblings: ["/best/vpn-mac/", "/best/vpn-linux/"]  // same level
}
```

### Task 5: Learning Path Component for Guides
**File:** `src/components/seo/learning-path.tsx` (NEW)
**What:** Sequential navigation for educational content
**Shows:** Numbered steps with current highlight, prev/next arrows

### Task 6: Cross-Cluster Bridge Links
**Files:** Update page templates
**What:** Add strategic links between clusters:
- Country pages → "Best VPN for [use case] in [country]"
- Device pages → "Best VPN for [device] for streaming/gaming"
- Guide pages → "Ready to choose? Best VPN 2026" CTA
- Review pages → "Compare [VPN] with alternatives" CTA

### Task 7: Hub Page Enhancement
**Files:** Update hub/index pages
**What:** Make pillar pages true authority hubs:
- `/best-vpn/` → category cards linking to all sub-clusters
- `/countries/` → world map or regional grouping
- `/guides/` → learning path + category grid
- `/compare/` → popular matchups + "build your comparison" tool
- `/reviews/` → editor's choice + sortable table

---

## Priority Order

1. **Task 1 + 2**: ClusterNav component + add to pages (biggest SEO impact)
2. **Task 3**: Fix duplicate routes (prevents cannibalization)
3. **Task 4**: Extend content-links metadata (enables smarter linking)
4. **Task 6**: Cross-cluster bridges (strengthens topical authority)
5. **Task 7**: Hub page enhancement (improves pillar page authority)
6. **Task 5**: Learning path (nice-to-have, good UX)

---

## Content Gaps to Fill (Future)

These pages would strengthen existing clusters:

### Best-of cluster gaps:
- `/best/vpn-router/` — VPN for routers
- `/best/vpn-smart-tv/` — VPN for smart TVs
- `/best/vpn-families/` — family-friendly VPN
- `/best/vpn-small-business/` — business VPN

### Country cluster gaps:
- `/countries/philippines/`
- `/countries/colombia/`
- `/countries/nigeria/`
- `/countries/south-africa/`

### Guide cluster gaps:
- `/guides/vpn-for-beginners/` — absolute beginner guide
- `/guides/vpn-kill-switch-explained/`
- `/guides/free-vs-paid-vpn/`
- `/guides/vpn-logging-policies-compared/`

### Comparison cluster:
- Auto-generate top 50 most-searched VPN comparisons
- Currently dynamic but could benefit from pre-rendered popular matchups

---

## Technical Notes

- **Framework:** Next.js 16 App Router — use server components where possible
- **i18n:** next-intl with 8 locales — new components need translation keys
- **Existing system:** Build on `content-links.ts` scoring algorithm, don't replace it
- **Performance:** ClusterNav should be lightweight — no extra data fetching, derive from existing content-links
- **SEO:** All new links should be `<Link>` (not `<a>`) for client-side navigation + crawlability
