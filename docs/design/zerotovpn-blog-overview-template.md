# ZeroToVPN blog overview template

Status: design blueprint  
Canonical pilot: `/blog`  
Sibling template still required: generic `/blog/[slug]` detail  
Visual reference: `docs/design/zerotovpn-blog-overview-concept-v1.png`

## Purpose

The ZeroToVPN Journal is the site's current editorial layer. It surfaces timely reporting, product and policy changes, practical fixes, field notes, investigations, and new evidence from the test lab.

It is not:

- the main ZeroToVPN homepage;
- the evergreen learning environment under `/guides`;
- the provider database under `/reviews`;
- a warehouse for commercial rankings that belong under `/best`;
- the generic blog-detail layout.

Editorial routing rule: if a subject has no meaningful date, change, event, investigation, or new evidence, it probably belongs in Guides, Reviews, Best, Compare, Countries, or Tools instead of the Journal.

## Positioning and masthead

Use the publication label `ZEROTOVPN JOURNAL` with the SEO H1:

> VPN News, Privacy Analysis & Field Notes

Supporting description:

> Independent reporting, practical fixes and fresh evidence from the ZeroToVPN test lab.

The masthead stays compact. It includes search, topic discovery, and RSS; it does not spend the entire first viewport on a decorative illustration.

## Visual system

- Preserve the dark navy global ZeroToVPN header.
- Use a warm off-white editorial canvas.
- Electric blue is for navigation, links, and primary actions.
- Lime means tested or verified; do not use it as decoration.
- Amber means a caveat or evidence that needs refresh.
- Use display serif for major editorial headlines and compact sans serif for metadata and controls.
- Target roughly 55% imagery/data and 45% text/UI.
- Vary the editorial rhythm: one large story, short lists, horizontal rows, charts, and topic shelves.
- Avoid an endless collection of identical rounded cards.
- Avoid generic hooded-hacker stock photography and repetitive shield imagery.
- Keep story headlines in HTML, never baked into images.

## Page anatomy

### 1. Global and Journal navigation

Global navigation remains consistent with the rest of ZeroToVPN. Below it, add a crawlable Journal navigation:

- Latest;
- News & policy;
- Privacy & security;
- Censorship & access;
- Apps & devices;
- Lab notes;
- Deep reads.

These are real links, not pointer-shaped badges with no action.

### 2. Journal masthead

Required elements:

- eyebrow `ZEROTOVPN JOURNAL`;
- one H1 and concise description;
- Journal search field;
- browse-topics link;
- RSS/Atom link.

On mobile, the topic navigation becomes horizontally scrollable. Search remains available without covering the lead story.

### 3. Editorial front page

Use an asymmetric twelve-column layout.

#### Lead story

The lead story occupies seven to eight columns and must be chosen editorially. It is never simply the newest row in the dataset. It includes:

- original or properly sourced image;
- content type;
- edited display headline;
- compact deck;
- named author;
- publication or meaningful update date;
- content-derived reading time;
- optional evidence/update reason.

The pilot lead is a troubleshooting story: `Why does my VPN keep disconnecting? Causes and fixes`.

#### Secondary stories

Two image-led stories sit below the lead. Good roles include:

- one visual explainer or analysis;
- one field note or lab comparison.

#### Editor's Picks

The right rail contains a numbered list of four or five curated stories with small thumbnails. Label it `EDITOR'S PICKS`. Do not call it `Trending` unless real, documented analytics determine the order.

### 4. From the ZeroToVPN lab

This dark navy, full-width module is the signature differentiator of the Journal. It includes:

- one current finding, report, or test update;
- a real chart, test image, or evidence visual;
- test date and setup summary;
- evidence status;
- link to the full report;
- link to `/how-we-test` or `/methodology`.

Never invent provider winners or precise performance outcomes for a decorative chart. Concept mockup labels must be replaced with actual test records before implementation.

### 5. Latest stories and editorial sidebar

Desktop uses an eight/four-column split.

#### Chronological feed

Each horizontal story row contains:

- fixed-aspect image;
- content type;
- headline;
- two-line summary;
- author;
- publication/update date;
- correct reading time.

Six to eight rows are enough before the reader reaches the next visual module. Use regular pagination; do not force infinite scroll.

#### Sidebar

The sidebar combines:

- Explore the Journal topic links with honest counts;
- recent reports with dates;
- `The Privacy Brief` newsletter form;
- no provider deal banner.

The working `NewsletterBlogCTA` component should power the form rather than a heading that looks interactive but does nothing.

### 6. Deep reads

Use three larger cards for investigations, research dossiers, policy trackers, and long analyses. Every card gives a concrete reason to read, such as:

- `12 min analysis`;
- `Based on 18 tests`;
- `Research dossier`;
- `Updated after new evidence`.

### 7. Explore by topic

Use a bold image shelf for the stable editorial taxonomy:

- News & policy;
- Privacy & security;
- Censorship & access;
- Apps & devices;
- VPN industry;
- Lab notes & research.

Guides, Reviews, Best, and Comparisons remain separate products; do not disguise them as Journal categories.

### 8. Searchable archive

After the curated Journal experience, expose the complete archive with:

- search;
- topic filter;
- sort control;
- result count;
- compact article previews;
- crawlable numbered pagination.

Prefer stable URLs such as `/blog/page/2` for page archives and real category URLs for topics. Search results and thin tag pages should be `noindex` by default.

### 9. Newsletter and knowledge routes

Use an inline newsletter module and permit the same neutral offer in the exit-intent popup:

> Independent reporting, lab notes and practical fixes—straight to your inbox.

No discount, cashback, coupon, or affiliate incentive. Follow with routes to Guides, Reviews, Countries, Tools, and Methodology, then the full legal/editorial footer.

## Content model

Every Journal record should expose:

- `slug`;
- `language` and translation relationship;
- `contentType`: News, Analysis, Field note, Investigation, Update, or Troubleshooting;
- one primary Journal category;
- entities and tags;
- cluster/pillar relationship;
- `publishedAt`;
- `updatedAt` plus update reason;
- author ID;
- optional technical reviewer ID;
- excerpt and edited display headline;
- content-derived reading time;
- featured image URL;
- image alt text, source, rights status, and focal point;
- evidence/methodology state when applicable;
- optional report or dataset relationship.

Cards use semantic `<article>` elements. The title and image may link to the detail page, but avoid wrapping the entire card if it contains additional entity or category links.

## Reusable component map

- `BlogMasthead`
- `BlogCategoryNav`
- `LeadStory`
- `TopStoriesList`
- `EditorialStoryCard`
- `StoryMeta`
- `FromTheLabFeature`
- `LatestStoryFeed`
- `JournalSidebar`
- `DeepReadShelf`
- `TopicShelf`
- `BlogArchiveSearch`
- `EditorialNewsletter`
- `BlogPagination`
- `BlogIndexJsonLd`

The future blog-detail template will share `StoryMeta`, author/reviewer UI, content-type labels, image attribution, source ledger, newsletter, and related-story cards, but not the overview grid itself.

## Current implementation audit

The existing `/blog` route is technically functional but behaves as an archive rather than an editorial destination.

Current corpus snapshot on 13 August 2026:

- 249 English overview items: 247 dynamic records plus two static articles;
- 11 paginated archive pages at 24 items per page;
- 137 of 247 dynamic English posts have a featured image;
- 110 dynamic English posts have no featured image;
- the dominant category is `guide`, even though it does not match the visible filters;
- recent upgraded editorial content is not reliably surfaced because selection follows published date rather than editorial curation or meaningful updates.

Critical defects:

1. The visible category badges are inert; they have pointer styling but no link, handler, or category parameter.
2. Visible category labels do not match the real content taxonomy. `guide` and `comparison` are collapsed into unrelated visual labels.
3. Every dynamic article displays `1 min` because reading time is derived from excerpt length rather than article content.
4. The featured story is simply the newest publication. At audit time it is an English article without an image rather than the strongest recently reviewed story.
5. Non-English overview pages silently mix in mostly English fallback content; roughly 89–94% of cards are English in those locale archives.
6. Important August editorial updates can remain buried because `updatedAt` does not drive curation.
7. The featured image is lazy-loaded even when it is the likely LCP element.
8. The CTA does not contain a working field or action even though a reusable newsletter component exists.
9. The overview lacks search, real topic navigation, authors, reviewer/evidence metadata, and a coherent cluster architecture.
10. The page lacks CollectionPage/ItemList structured data and a dedicated social image.
11. Locale breadcrumb output and hard-coded lower related links need localization.
12. Comments still describe database fetching even though the current adapter reads committed repository JSON.

## SEO and discovery rules

- Use `Blog` or `CollectionPage`, `ItemList`, and `BreadcrumbList` structured data.
- Preserve locale-aware canonicals and hreflang.
- Give paginated archives self-canonicals; do not canonicalize every page to page one.
- Keep crawlable HTML pagination.
- Add RSS or Atom.
- Index a category only when it has enough unique content and an authored category introduction.
- Default internal search and thin tag combinations to `noindex, follow`.
- Put only translated content above the fold on locale pages. If English fallback remains, separate it under an explicit `Available in English` heading.
- Timely articles link early to their evergreen pillar; pillars may link back to truly current developments.
- Move evergreen tutorials to Guides, rankings to Best, comparisons to Compare, and provider reviews to Reviews with signal-preserving redirects where needed.

## Image and evidence policy

- Use original ZeroToVPN editorial art, real test visuals, maps, charts, and timestamped screenshots.
- Store source, rights, captured date, and focal-point metadata.
- Third-party screenshots appear only in the exact story context and are visibly sourced.
- Provider-supplied lifestyle images are promotional source material, not ZeroToVPN test evidence.
- Never reproduce volatile ratings, prices, discounts, download counts, or claims in overview thumbnails unless recaptured, dated, and necessary to the story.
- Generate a deliberate neutral fallback-art system for the 110 posts without images; do not rely on repeated Lucide icons over gradients.
- Lead image uses `priority`/eager loading and correct responsive sizes. Feed images lazy-load below the initial viewport.

## Accessibility and responsive behavior

- Use descriptive image alt text and visible image attribution where relevant.
- Do not place essential story text inside raster artwork.
- Maintain a logical heading hierarchy and keyboard-visible focus.
- Mobile order: lead story, up to three Editor's Picks, two secondary stories, lab feature, latest feed.
- The sidebar joins the mobile feed after the fourth article.
- Category navigation scrolls horizontally and exposes active state without color alone.
- Minimum target size is 44×44 pixels.
- Charts have textual summaries and do not rely on color alone.
- Respect reduced-motion settings.

## Implementation order

1. Normalize content type and category values.
2. Store or calculate real reading time from article content.
3. Add explicit editorial curation and update-reason fields.
4. Correct locale fallback behavior.
5. Build the shared Journal components and index structured data.
6. Add search/category URLs and crawlable archive routing.
7. Create or source missing visual art with image provenance.
8. Connect the existing newsletter form.
9. Replace duplicate generic RelatedContent/RelatedPages blocks with intentional knowledge routes.
10. Validate performance, schema, pagination, locale output, and accessibility.

## Acceptance criteria

- The first viewport communicates what the Journal covers and why the lead matters now.
- The lead story is explicitly curated and has valid image, author, date, and reading-time data.
- Editor's Picks are not mislabeled as analytics-driven trending content.
- From-the-Lab evidence links to a real record and methodology.
- Every topic control navigates or filters for real.
- Locale archives do not silently present an English-dominated front page.
- The complete archive remains crawlable without overwhelming the editorial front page.
- No overview card contains stale price, discount, coupon, or unsupported performance copy.
- The newsletter works and remains non-incentivized.
- The page passes responsive, keyboard, image, metadata, schema, and LCP checks.

## Mockup prompt record

Mode: built-in image generation with five visual references.

Prompt intent: create a complete tall ZeroToVPN Journal overview in the established editorial brand; add a compact masthead, an image-led troubleshooting lead, curated Editor's Picks, two secondary stories, a dark From-the-Lab chart module, chronological feed and sidebar, deep reads, topic shelves, searchable paginated archive, neutral newsletter, knowledge routes, and footer; use provider screenshots only inside their exact story contexts; prohibit live prices, promotions, affiliate CTAs, fake trending labels, repeated generic cards, hooded-hacker imagery, and provider-branded lead art.
