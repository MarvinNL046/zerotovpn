# Topic Clusters & Internal Linking — Design

**Date:** 2026-03-09
**Status:** Approved
**Scope:** EN + NL (2 locales first)

## Goal

Build authority through topic clusters and internal cross-linking between all content types: reviews, best-of pages, comparisons, blog posts, and guides.

## Topic Clusters

| Pillar Page | Cluster Content |
|-------------|----------------|
| `/best/best-vpn` | All 38 reviews, top comparisons, "what is a VPN" guide |
| `/best/vpn-gaming` | Gaming-related reviews, ping/speed blog posts |
| `/best/free-vpn` | Free VPN reviews, "free vs paid" blog post |
| `/best/vpn-iphone` | iOS reviews, setup guides, app comparisons |
| `/best/vpn-china` (etc.) | Country-specific reviews, travel guides, protocol explainers |

Each pillar page links to its cluster content, all cluster content links back to its pillar.

## Link Placement (3 levels)

1. **Inline contextual links** — In review/blog text, e.g. *"NordVPN also scores high in our [best VPN for streaming](/best/vpn-streaming) list"*
2. **"Related content" section at bottom** — Cards with thumbnail, title, type badge
3. **Visual differentiation per type:**
   - Reviews: compact card with VPN logo + rating
   - Blog posts: card with thumbnail + read time
   - Comparisons: "Compare also: X vs Y" with scores
   - Guides: card with icon + short description

## Technical Approach (Hybrid)

### Database (Prisma)

New `ContentLink` model with relations between content. Tags/categories system for automatic matching.

### Automatic Linking Engine

- Matches content based on: VPN slugs, tags, categories
- Generates "related content" per page
- Priority: same cluster > same VPN > same category

### Manual Override

- `featured` flag to promote specific links
- `excluded` flag to block irrelevant auto-links

## React Components

- `<RelatedContent />` — section at bottom with max 6 items
- `<InlineLink />` — contextual link helper for in-text use
- `<CompareWidget />` — "Compare also" mini-widget

## Phases

1. **Phase 1:** Database model + automatic linking engine + `<RelatedContent />` component
2. **Phase 2:** Add inline contextual links to existing content
3. **Phase 3:** Track analytics on which internal links get clicked
