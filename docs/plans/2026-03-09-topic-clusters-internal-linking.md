# Topic Clusters & Internal Linking Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an automatic internal linking system that creates topic clusters between reviews, best-of pages, comparisons, blog posts, and guides — for EN + NL first.

**Architecture:** A content-link mapping module (`src/lib/content-links.ts`) that defines topic clusters and resolves related content per page. No new DB tables — uses existing VPN data, blog post tags/categories, and static page metadata. A new `<RelatedContent />` server component renders type-differentiated cards (reviews, blogs, comparisons). Existing pages get the component added at the bottom.

**Tech Stack:** Next.js 16 App Router (server components), Drizzle ORM, existing `<RelatedPages />` as base, TypeScript.

---

### Task 1: Define Topic Cluster Mapping

**Files:**
- Create: `src/lib/content-links.ts`

**Step 1: Create the cluster mapping module**

This file defines all topic clusters (pillar → cluster content) and a function to resolve related content for any given page.

```typescript
// src/lib/content-links.ts

export type ContentType = "review" | "best-of" | "comparison" | "blog" | "guide";

export interface ContentLink {
  type: ContentType;
  title: string;
  titleNl: string;
  description: string;
  descriptionNl: string;
  href: string;
  vpnSlugs?: string[];   // VPNs mentioned/relevant
  tags?: string[];        // topic tags for matching
  icon?: string;          // lucide icon key
}

export interface TopicCluster {
  pillar: ContentLink;
  content: ContentLink[];
}

// All "best-of" pillar pages with their associated tags
const bestOfPages: ContentLink[] = [
  {
    type: "best-of",
    title: "Best VPN 2026",
    titleNl: "Beste VPN 2026",
    description: "Our top-rated VPN picks for every need",
    descriptionNl: "Onze best beoordeelde VPN-keuzes",
    href: "/best/best-vpn",
    tags: ["general", "overview", "ranking"],
    icon: "trophy",
  },
  {
    type: "best-of",
    title: "Best Free VPN",
    titleNl: "Beste Gratis VPN",
    description: "Top free VPN services that are actually safe",
    descriptionNl: "Beste gratis VPN-diensten die veilig zijn",
    href: "/best/free-vpn",
    tags: ["free", "budget", "pricing"],
    icon: "gift",
  },
  {
    type: "best-of",
    title: "Best VPN for Gaming",
    titleNl: "Beste VPN voor Gaming",
    description: "Lowest ping and fastest speeds for gaming",
    descriptionNl: "Laagste ping en snelste speeds voor gaming",
    href: "/best/vpn-gaming",
    tags: ["gaming", "speed", "ping"],
    icon: "gamepad",
  },
  {
    type: "best-of",
    title: "Best VPN for iPhone",
    titleNl: "Beste VPN voor iPhone",
    description: "Top VPN apps for iOS devices",
    descriptionNl: "Beste VPN-apps voor iOS-apparaten",
    href: "/best/vpn-iphone",
    tags: ["ios", "iphone", "mobile", "apple"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Android",
    titleNl: "Beste VPN voor Android",
    description: "Top VPN apps for Android phones",
    descriptionNl: "Beste VPN-apps voor Android-telefoons",
    href: "/best/vpn-android",
    tags: ["android", "mobile"],
    icon: "smartphone",
  },
  {
    type: "best-of",
    title: "Best VPN for Streaming",
    titleNl: "Beste VPN voor Streaming",
    description: "Unblock Netflix, Disney+ and more",
    descriptionNl: "Deblokkeer Netflix, Disney+ en meer",
    href: "/best/best-vpn",  // or /best/vpn-streaming if exists
    tags: ["streaming", "netflix", "disney"],
    icon: "play",
  },
  {
    type: "best-of",
    title: "Best VPN for China",
    titleNl: "Beste VPN voor China",
    description: "VPNs that actually work in China",
    descriptionNl: "VPN's die echt werken in China",
    href: "/best/vpn-china",
    tags: ["china", "censorship", "geo-restriction"],
    icon: "globe",
  },
  {
    type: "best-of",
    title: "Best VPN for Laptops",
    titleNl: "Beste VPN voor Laptops",
    description: "Top VPN software for Windows and Mac laptops",
    descriptionNl: "Beste VPN-software voor Windows en Mac laptops",
    href: "/best/vpn-laptops",
    tags: ["laptop", "desktop", "windows", "mac"],
    icon: "laptop",
  },
];

// Guide pages
const guidePages: ContentLink[] = [
  {
    type: "guide",
    title: "What is a VPN?",
    titleNl: "Wat is een VPN?",
    description: "Everything you need to know about VPNs",
    descriptionNl: "Alles wat je moet weten over VPN's",
    href: "/guides/what-is-vpn",
    tags: ["beginner", "general", "overview", "education"],
    icon: "help",
  },
  {
    type: "guide",
    title: "VPN Protocols Explained",
    titleNl: "VPN-protocollen Uitgelegd",
    description: "WireGuard, OpenVPN, IKEv2 and more compared",
    descriptionNl: "WireGuard, OpenVPN, IKEv2 en meer vergeleken",
    href: "/guides/vpn-protocols",
    tags: ["protocols", "security", "technical", "wireguard", "openvpn"],
    icon: "shield",
  },
  {
    type: "guide",
    title: "How to Set Up a VPN",
    titleNl: "VPN Installeren: Stap voor Stap",
    description: "Step-by-step guide for all devices",
    descriptionNl: "Stap-voor-stap handleiding voor alle apparaten",
    href: "/guides/setup-vpn",
    tags: ["setup", "installation", "beginner", "howto"],
    icon: "settings",
  },
];

// Top comparison pages
const comparisonPages: ContentLink[] = [
  {
    type: "comparison",
    title: "NordVPN vs Surfshark",
    titleNl: "NordVPN vs Surfshark",
    description: "Two top VPNs compared head-to-head",
    descriptionNl: "Twee top VPN's vergeleken",
    href: "/compare/nordvpn-vs-surfshark",
    vpnSlugs: ["nordvpn", "surfshark"],
    tags: ["comparison", "popular"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "NordVPN vs ExpressVPN",
    titleNl: "NordVPN vs ExpressVPN",
    description: "Premium VPN showdown",
    descriptionNl: "Premium VPN vergelijking",
    href: "/compare/nordvpn-vs-expressvpn",
    vpnSlugs: ["nordvpn", "expressvpn"],
    tags: ["comparison", "premium"],
    icon: "zap",
  },
  {
    type: "comparison",
    title: "Surfshark vs ExpressVPN",
    titleNl: "Surfshark vs ExpressVPN",
    description: "Value vs premium compared",
    descriptionNl: "Betaalbaar vs premium vergeleken",
    href: "/compare/surfshark-vs-expressvpn",
    vpnSlugs: ["surfshark", "expressvpn"],
    tags: ["comparison"],
    icon: "zap",
  },
];

// All static content links combined
const allStaticLinks: ContentLink[] = [
  ...bestOfPages,
  ...guidePages,
  ...comparisonPages,
];

/**
 * Build a review ContentLink from a VPN slug.
 */
export function reviewLink(
  slug: string,
  name: string,
  rating: number
): ContentLink {
  return {
    type: "review",
    title: `${name} Review`,
    titleNl: `${name} Review`,
    description: `Rated ${rating}/5 — full review with speed tests and features`,
    descriptionNl: `Beoordeeld ${rating}/5 — volledige review met snelheidstests`,
    href: `/reviews/${slug}`,
    vpnSlugs: [slug],
    tags: ["review"],
    icon: "star",
  };
}

/**
 * Build a blog ContentLink from a blog post.
 */
export function blogLink(
  slug: string,
  title: string,
  titleNl: string,
  excerpt: string,
  excerptNl: string,
  tags: string[]
): ContentLink {
  return {
    type: "blog",
    title,
    titleNl,
    description: excerpt,
    descriptionNl: excerptNl,
    href: `/blog/${slug}`,
    tags: ["blog", ...tags],
    icon: "document",
  };
}

interface GetRelatedContentOptions {
  /** Current page href (to exclude from results) */
  currentHref: string;
  /** VPN slugs relevant to current page */
  vpnSlugs?: string[];
  /** Tags relevant to current page */
  tags?: string[];
  /** Content type of current page (deprioritize same type) */
  currentType?: ContentType;
  /** Max results */
  limit?: number;
  /** Extra content links to include in pool (e.g. dynamically built review/blog links) */
  extraLinks?: ContentLink[];
}

/**
 * Get related content for a page based on VPN slugs, tags, and content type diversity.
 * Returns up to `limit` items, prioritizing:
 * 1. Same VPN slug matches (strongest signal)
 * 2. Tag overlap (topic relevance)
 * 3. Content type diversity (mix of types)
 */
export function getRelatedContent(
  options: GetRelatedContentOptions
): ContentLink[] {
  const {
    currentHref,
    vpnSlugs = [],
    tags = [],
    currentType,
    limit = 6,
    extraLinks = [],
  } = options;

  const pool = [...allStaticLinks, ...extraLinks].filter(
    (link) => link.href !== currentHref
  );

  // Score each link
  const scored = pool.map((link) => {
    let score = 0;

    // VPN slug match = strongest signal (3 points per match)
    if (vpnSlugs.length > 0 && link.vpnSlugs) {
      const vpnOverlap = link.vpnSlugs.filter((s) => vpnSlugs.includes(s)).length;
      score += vpnOverlap * 3;
    }

    // Tag overlap (1 point per matching tag)
    if (tags.length > 0 && link.tags) {
      const tagOverlap = link.tags.filter((t) => tags.includes(t)).length;
      score += tagOverlap;
    }

    // Diversity bonus: different content type gets +1
    if (currentType && link.type !== currentType) {
      score += 1;
    }

    return { link, score };
  });

  // Sort by score descending, then ensure type diversity
  scored.sort((a, b) => b.score - a.score);

  const result: ContentLink[] = [];
  const typeCounts: Record<string, number> = {};

  for (const { link, score } of scored) {
    if (result.length >= limit) break;
    if (score === 0) continue; // no relevance at all

    // Limit max 2 of same type to ensure diversity
    const typeCount = typeCounts[link.type] || 0;
    if (typeCount >= 2) continue;

    result.push(link);
    typeCounts[link.type] = typeCount + 1;
  }

  // If we have fewer than limit, fill with highest-scored remaining
  if (result.length < limit) {
    for (const { link, score } of scored) {
      if (result.length >= limit) break;
      if (score === 0) continue;
      if (result.includes(link)) continue;
      result.push(link);
    }
  }

  return result;
}

/**
 * Get pillar page for a given content link (reverse lookup).
 * Used for "back to pillar" breadcrumb-style linking.
 */
export function getPillarForContent(
  tags: string[],
  vpnSlugs: string[]
): ContentLink | null {
  // Find the best-matching best-of page
  let bestMatch: ContentLink | null = null;
  let bestScore = 0;

  for (const page of bestOfPages) {
    let score = 0;
    if (page.tags) {
      score += page.tags.filter((t) => tags.includes(t)).length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = page;
    }
  }

  return bestMatch;
}
```

**Step 2: Verify the file compiles**

Run: `cd /home/marvin/Projecten/zerotovpn && npx tsc --noEmit src/lib/content-links.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/content-links.ts
git commit -m "feat: add topic cluster mapping and related content resolver"
```

---

### Task 2: Create RelatedContent Server Component

**Files:**
- Create: `src/components/seo/related-content.tsx`

**Step 1: Create the component**

Builds on existing `<RelatedPages />` design but adds type badges, VPN ratings, and locale support.

```tsx
// src/components/seo/related-content.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Lock,
  Star,
  Play,
  FileText,
  Settings,
  HelpCircle,
  Trophy,
  Gift,
  Gamepad2,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import type { ContentLink, ContentType } from "@/lib/content-links";

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  globe: Globe,
  shield: Shield,
  zap: Zap,
  lock: Lock,
  star: Star,
  play: Play,
  document: FileText,
  settings: Settings,
  help: HelpCircle,
  trophy: Trophy,
  gift: Gift,
  gamepad: Gamepad2,
  laptop: Laptop,
};

const typeBadgeConfig: Record<ContentType, { label: string; labelNl: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  review: { label: "Review", labelNl: "Review", variant: "default" },
  "best-of": { label: "Best Pick", labelNl: "Beste Keuze", variant: "secondary" },
  comparison: { label: "Compare", labelNl: "Vergelijk", variant: "outline" },
  blog: { label: "Blog", labelNl: "Blog", variant: "secondary" },
  guide: { label: "Guide", labelNl: "Gids", variant: "outline" },
};

interface RelatedContentProps {
  links: ContentLink[];
  locale: string;
  title?: string;
  className?: string;
}

export function RelatedContent({
  links,
  locale,
  title,
  className = "",
}: RelatedContentProps) {
  if (links.length === 0) return null;

  const isNl = locale === "nl";
  const sectionTitle = title || (isNl ? "Gerelateerde Content" : "Related Content");

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">{sectionTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => {
          const IconComponent = link.icon ? iconMap[link.icon] || Globe : Globe;
          const badge = typeBadgeConfig[link.type];
          const linkTitle = isNl ? link.titleNl : link.title;
          const linkDesc = isNl ? link.descriptionNl : link.description;
          const badgeLabel = isNl ? badge.labelNl : badge.label;
          const readMore = isNl ? "Lees meer" : "Read more";

          return (
            <Link
              key={index}
              href={link.href}
              className="group block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {linkTitle}
                      </CardTitle>
                    </div>
                    <Badge variant={badge.variant} className="text-xs shrink-0">
                      {badgeLabel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {linkDesc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    <span>{readMore}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
```

**Step 2: Verify the file compiles**

Run: `cd /home/marvin/Projecten/zerotovpn && npx tsc --noEmit src/components/seo/related-content.tsx`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/seo/related-content.tsx
git commit -m "feat: add RelatedContent component with type badges and locale support"
```

---

### Task 3: Integrate RelatedContent into VPN Review Pages

**Files:**
- Modify: `src/app/[locale]/reviews/[slug]/page.tsx`

**Step 1: Add related content to review pages**

At the top of the file, add imports:

```typescript
import { getRelatedContent, reviewLink } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";
```

Inside the page component, after fetching VPN data, compute related content:

```typescript
// Build related content links
const allVpns = await getAllVpns();
const reviewLinks = allVpns
  .filter((v) => v.slug !== vpn.slug)
  .slice(0, 10)
  .map((v) => reviewLink(v.slug, v.name, Number(v.overallRating)));

const relatedLinks = getRelatedContent({
  currentHref: `/reviews/${vpn.slug}`,
  vpnSlugs: [vpn.slug],
  tags: [
    "review",
    ...(vpn.netflixSupport ? ["streaming", "netflix"] : []),
    ...(vpn.torrentSupport ? ["torrenting"] : []),
    ...(vpn.freeTier ? ["free", "budget"] : []),
    ...(vpn.speedScore >= 80 ? ["speed", "gaming"] : []),
    ...(vpn.securityScore >= 85 ? ["security", "privacy"] : []),
  ],
  currentType: "review",
  limit: 6,
  extraLinks: reviewLinks,
});
```

Add the component before the closing of the page, after the existing content:

```tsx
<RelatedContent
  links={relatedLinks}
  locale={locale}
  className="mt-12"
/>
```

**Step 2: Verify the page builds**

Run: `cd /home/marvin/Projecten/zerotovpn && npm run build -- --filter reviews`
Or: `npm run dev` and visit a review page to check rendering.

**Step 3: Commit**

```bash
git add src/app/[locale]/reviews/[slug]/page.tsx
git commit -m "feat: add related content section to VPN review pages"
```

---

### Task 4: Integrate RelatedContent into Best-Of Pages

**Files:**
- Modify: `src/app/[locale]/best/best-vpn/page.tsx` (and other best-of pages)

**Step 1: Add related content to best-vpn page**

Same pattern as Task 3. Import the functions, compute related links with tags matching the best-of category:

```typescript
import { getRelatedContent, reviewLink } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";

// In the component:
const topVpnLinks = vpns
  .slice(0, 5)
  .map((v) => reviewLink(v.slug, v.name, Number(v.overallRating)));

const relatedLinks = getRelatedContent({
  currentHref: "/best/best-vpn",
  tags: ["general", "overview", "ranking", "streaming", "security"],
  currentType: "best-of",
  limit: 6,
  extraLinks: topVpnLinks,
});
```

Replace existing hardcoded `<RelatedPages />` with `<RelatedContent />`.

**Step 2: Repeat for other best-of pages** with appropriate tags per category.

**Step 3: Commit**

```bash
git add src/app/[locale]/best/
git commit -m "feat: add dynamic related content to best-of pages"
```

---

### Task 5: Integrate RelatedContent into Blog Pages

**Files:**
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`
- Modify: `src/app/[locale]/blog/page.tsx`

**Step 1: Add related content to blog post pages**

Blog posts already have `tags` and `category` in the DB schema. Use these for matching:

```typescript
import { getRelatedContent, blogLink, reviewLink } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";

// After fetching the blog post:
const relatedLinks = getRelatedContent({
  currentHref: `/blog/${post.slug}`,
  tags: post.tags || [],
  currentType: "blog",
  limit: 6,
  extraLinks: otherBlogLinks, // build from other blog posts
});
```

**Step 2: Add related content to blog index page**

Link to best-of pages and guides from the blog index.

**Step 3: Commit**

```bash
git add src/app/[locale]/blog/
git commit -m "feat: add related content cross-linking to blog pages"
```

---

### Task 6: Integrate RelatedContent into Comparison Pages

**Files:**
- Modify: `src/app/[locale]/compare/[comparison]/page.tsx`

**Step 1: Add related content to comparison pages**

Comparison pages have 2 VPN slugs — use both for matching:

```typescript
const relatedLinks = getRelatedContent({
  currentHref: `/compare/${slug1}-vs-${slug2}`,
  vpnSlugs: [slug1, slug2],
  tags: ["comparison"],
  currentType: "comparison",
  limit: 6,
  extraLinks: [
    reviewLink(slug1, vpn1.name, Number(vpn1.overallRating)),
    reviewLink(slug2, vpn2.name, Number(vpn2.overallRating)),
  ],
});
```

**Step 2: Verify rendering**

Run dev server, visit a comparison page, confirm related content shows reviews for both VPNs + relevant best-of pages.

**Step 3: Commit**

```bash
git add src/app/[locale]/compare/
git commit -m "feat: add related content to comparison pages"
```

---

### Task 7: Integrate RelatedContent into Guide Pages

**Files:**
- Modify: `src/app/[locale]/guides/page.tsx`
- Modify individual guide pages if they exist as separate files

**Step 1: Add related content to guides**

Guides link to relevant best-of pages, blog posts, and reviews:

```typescript
const relatedLinks = getRelatedContent({
  currentHref: `/guides/${slug}`,
  tags: ["guide", "education", "beginner", ...guideTags],
  currentType: "guide",
  limit: 6,
});
```

**Step 2: Commit**

```bash
git add src/app/[locale]/guides/
git commit -m "feat: add related content to guide pages"
```

---

### Task 8: Expand Topic Cluster Mapping with All Best-Of Pages

**Files:**
- Modify: `src/lib/content-links.ts`

**Step 1: Check all existing best-of pages**

Run: `ls src/app/[locale]/best/` to find all best-of page directories.

**Step 2: Add missing best-of pages to `bestOfPages` array**

Add entries for all existing best-of pages (vpn-linux, vpn-macos, vpn-windows, vpn-chromebook, vpn-tablet, vpn-ipad, vpn-android-tablet, vpn-russia, vpn-uae, vpn-iran, etc.)

**Step 3: Add more comparison pages to `comparisonPages`**

Check existing comparison slugs from sitemap and add the most important ones.

**Step 4: Commit**

```bash
git add src/lib/content-links.ts
git commit -m "feat: expand topic clusters with all best-of and comparison pages"
```

---

### Task 9: Visual Verification & Testing

**Step 1: Start dev server**

Run: `cd /home/marvin/Projecten/zerotovpn && npm run dev`

**Step 2: Check each page type**

Visit and verify related content renders correctly:
- [ ] `/reviews/nordvpn` — shows comparisons, best-of pages, other reviews
- [ ] `/best/best-vpn` — shows reviews, guides, blog posts
- [ ] `/blog` — shows guides, best-of pages
- [ ] `/compare/nordvpn-vs-surfshark` — shows both VPN reviews + best-of
- [ ] `/guides/what-is-vpn` — shows best-of pages, blog posts
- [ ] `/nl/reviews/nordvpn` — verify Dutch translations

**Step 3: Check link diversity**

Each page should show a mix of content types (not all reviews or all best-of).

**Step 4: Commit any fixes**

---

### Task 10: Deploy & Verify in Production

**Step 1: Build check**

Run: `cd /home/marvin/Projecten/zerotovpn && npm run build`
Expected: Build succeeds without errors.

**Step 2: Push and deploy**

```bash
git push origin master
```

Vercel will auto-deploy. Check production URLs after deployment.
