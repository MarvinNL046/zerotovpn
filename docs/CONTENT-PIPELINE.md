# Automated Content Pipeline - Setup Guide

Volledig automatische content pipeline die dagelijks SEO-geoptimaliseerde blogposts genereert met AI (tekst + afbeeldingen), publiceert, en interne links dynamisch uit de sitemap haalt.

## Architectuur

```
GitHub Actions (cron)
  |
  | 06:00 UTC - Scraper: VPN data + nieuws ophalen
  | 08:00 UTC - Blog generation triggeren
  v
POST /api/pipeline/generate  (Next.js API route)
  |
  | Maakt job in ContentQueue tabel
  | Triggert Netlify Background Function (fire-and-forget)
  v
netlify/functions/generate-blog-background.ts
  |
  | 1. AI kiest uniek topic (checkt bestaande posts in DB)
  | 2. Fetcht sitemap.xml voor interne links
  | 3. Claude Haiku genereert 2000+ woorden HTML content
  | 4. Gemini genereert featured image + 2 infographics
  | 5. Slaat op in BlogPost tabel + publiceert
  v
Blogpost live op /blog/[slug]
```

## Benodigde Services

| Service | Waarvoor | Kosten |
|---------|----------|--------|
| **NeonDB** (PostgreSQL) | Database voor posts, queue, scrape jobs | Free tier voldoende |
| **Netlify** | Hosting + Background Functions (15 min) | Free tier voldoende |
| **Anthropic API** | Claude Haiku voor tekst generatie | ~$0.02 per blogpost |
| **Google Gemini API** | Afbeeldingen genereren (featured + infographics) | Gratis (flash model) |
| **GitHub Actions** | Cron scheduling | Gratis (2000 min/maand) |

## Environment Variables

Stel deze in als **Netlify Environment Variables** EN als **GitHub Secrets**:

```env
# Database (NeonDB)
DATABASE_URL=postgresql://...pooler...?sslmode=require
DIRECT_URL=postgresql://...?sslmode=require

# AI Providers
ANTHROPIC_API_KEY=sk-ant-...          # Claude API key
GEMINI_API_KEY=AIzaSy...              # Google Gemini API key

# Pipeline Auth
PIPELINE_SECRET=<random-64-char-hex>  # Zelf genereren: openssl rand -hex 32

# Site URL (automatisch op Netlify, handmatig als GitHub Secret)
SITE_URL=https://jouwsite.com
```

**GitHub Secrets** (Settings > Secrets > Actions):
- `SITE_URL` = `https://jouwsite.com`
- `PIPELINE_SECRET` = zelfde waarde als Netlify env var

## Bestanden Overzicht

```
project/
├── .github/workflows/
│   ├── content-generate.yml      # Dagelijkse blog generatie cron
│   └── vpn-scrape.yml            # Dagelijkse data scraper cron
│
├── netlify/functions/
│   └── generate-blog-background.ts  # Netlify Background Function (core)
│
├── src/
│   ├── app/
│   │   ├── api/pipeline/
│   │   │   ├── generate/route.ts    # Start/status/publish API
│   │   │   ├── scrape/route.ts      # Scraper trigger API
│   │   │   ├── posts/route.ts       # Post CRUD API
│   │   │   ├── status/route.ts      # Pipeline health dashboard
│   │   │   └── sync-links/route.ts  # Affiliate link sync API
│   │   │
│   │   ├── [locale]/blog/
│   │   │   ├── page.tsx             # Blog listing (static + dynamic)
│   │   │   └── [slug]/page.tsx      # Individual blog post
│   │   │
│   │   └── sitemap.ts               # Dynamische sitemap (incl. blog posts)
│   │
│   └── lib/
│       ├── db/
│       │   └── schema.ts            # Database schema (BlogPost, ContentQueue, etc.)
│       │
│       └── pipeline/
│           ├── ai-provider.ts       # Claude + OpenAI API wrapper
│           ├── blog-service.ts      # Blog CRUD (getAllPublishedPosts, etc.)
│           ├── content-generator.ts # Prompt builder + content orchestration
│           ├── image-generator.ts   # Gemini image generation
│           ├── scraper.ts           # Web scraper (Jina.ai)
│           └── affiliate-sync.ts    # Short.io link sync
```

## Database Schema

### BlogPost tabel
```sql
CREATE TABLE "BlogPost" (
  "id"              TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug"            TEXT NOT NULL,
  "language"        TEXT NOT NULL DEFAULT 'en',
  "title"           TEXT NOT NULL,
  "excerpt"         TEXT NOT NULL,
  "content"         TEXT NOT NULL,        -- Volledige HTML content
  "metaTitle"       TEXT,
  "metaDescription" TEXT,
  "category"        TEXT NOT NULL,        -- news | guide | comparison | deal
  "tags"            TEXT[],
  "featuredImage"   TEXT,                 -- data:image/... base64 of URL
  "aiModel"         TEXT,                 -- claude-haiku | gpt-5-nano
  "aiPrompt"        TEXT,                 -- Het topic dat gebruikt is
  "sourceData"      TEXT,                 -- JSON scrape data als context
  "published"       BOOLEAN DEFAULT false,
  "publishedAt"     TIMESTAMP,
  "createdAt"       TIMESTAMP DEFAULT now(),
  "updatedAt"       TIMESTAMP DEFAULT now(),
  UNIQUE("slug", "language")
);
```

### ContentQueue tabel
```sql
CREATE TABLE "ContentQueue" (
  "id"           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "type"         TEXT NOT NULL,           -- blog-post
  "status"       TEXT NOT NULL DEFAULT 'pending',  -- pending | processing | completed | failed
  "priority"     INTEGER DEFAULT 0,
  "input"        TEXT NOT NULL,           -- JSON: { topic, publish }
  "output"       TEXT,                    -- JSON: { postId, slug, title }
  "aiModel"      TEXT NOT NULL,
  "error"        TEXT,
  "attempts"     INTEGER DEFAULT 0,
  "maxAttempts"  INTEGER DEFAULT 3,
  "createdAt"    TIMESTAMP DEFAULT now(),
  "processedAt"  TIMESTAMP
);
```

### ScrapeJob tabel
```sql
CREATE TABLE "ScrapeJob" (
  "id"           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "type"         TEXT NOT NULL,           -- vpn-data | pricing | news
  "status"       TEXT NOT NULL DEFAULT 'pending',
  "source"       TEXT NOT NULL,           -- URL die gescraped is
  "vpnSlug"      TEXT,
  "result"       TEXT,                    -- JSON scraped data
  "error"        TEXT,
  "startedAt"    TIMESTAMP NOT NULL,
  "completedAt"  TIMESTAMP,
  "createdAt"    TIMESTAMP DEFAULT now()
);
```

## Stap-voor-stap Setup (nieuw project)

### 1. Database tabellen aanmaken

Voeg de tabellen toe aan je Drizzle schema (`src/lib/db/schema.ts`), dan:

```bash
npx drizzle-kit push
```

### 2. Netlify Background Function

Kopieer `netlify/functions/generate-blog-background.ts`.

**Belangrijk**: Dit bestand heeft een **inline schema** omdat Netlify Functions niet kunnen importeren uit `src/`. De schema definitie staat dus dubbel (in schema.ts EN in de function). Houd ze in sync!

De function naam MOET eindigen op `-background` voor Netlify Background Function support (v1 format). Dit zorgt ervoor dat Netlify direct 202 returnt en de function tot 15 minuten kan draaien.

### 3. API Routes

Kopieer de hele `src/app/api/pipeline/` map. De `generate/route.ts` is de belangrijkste:

- **POST met `phase: "start"`** → Maakt job aan, triggert background function
- **POST met `phase: "status"`** → Pollt job status (GitHub Actions gebruikt dit)
- **POST met `phase: "publish"`** → Publiceert een draft post

Auth gaat via `x-pipeline-key` header met `PIPELINE_SECRET` env var.

### 4. Pipeline Library

Kopieer `src/lib/pipeline/`. Pas aan voor je niche:

**`content-generator.ts`** — Hier zit de prompt. De prompt is al generiek:
- Haalt interne links dynamisch uit de sitemap
- Gebruikt `SITE_URL` env var (geen hardcoded domein)
- Structuur: Key Takeaways table, genummerde H2s, Did You Know callouts, vergelijkingstabellen, infographic placeholders

**`ai-provider.ts`** — Raw fetch naar Claude + OpenAI API. Geen SDK dependencies.

**`image-generator.ts`** — Gemini 2.5 Flash Image model. Prompts zeggen expliciet "ZERO text in images".

**`scraper.ts`** — Web scraping via Jina.ai. Pas de URLs aan voor je niche.

### 5. Blog Pages

**Listing page** (`src/app/[locale]/blog/page.tsx`):
- `export const dynamic = "force-dynamic"` → altijd vers uit DB
- Combineert statische posts (hardcoded) met dynamische posts (DB)
- Strips base64 data uit content voor leestijd berekening

**Detail page** (`src/app/[locale]/blog/[slug]/page.tsx`):
- Haalt post via `getPostBySlug(slug, locale)` met English fallback
- Rendert HTML content via `dangerouslySetInnerHTML`
- E-E-A-T componenten: AuthorBox, FactCheckedBadge, SourcesSection

### 6. Blog CSS

Voeg toe aan `globals.css` (of je globale stylesheet):

```css
/* Blog content styling */
.blog-content { color: var(--foreground); font-size: 1rem; line-height: 1.75; }
.blog-content > * + * { margin-top: 1rem; }
.blog-content h2 { font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem;
  padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
.blog-content h3 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.blog-content a { color: var(--primary); text-underline-offset: 2px; text-decoration: underline; }
.blog-content table { border-collapse: collapse; border: 1px solid var(--border);
  width: 100%; display: block; overflow: auto hidden; }
.blog-content th, .blog-content td { border: 1px solid var(--border);
  text-align: left; vertical-align: top; min-width: 180px; padding: 0.7rem 0.8rem; }
.blog-content th { background: rgba(0,0,0,0.03); font-weight: 600; }
.blog-content blockquote { border-left: 3px solid var(--primary);
  background: rgba(0,0,0,0.02); padding: 1rem 1.25rem; font-style: normal; }
.blog-content ul, .blog-content ol { padding-left: 1.5em; }
.blog-content li { margin-top: 0.25em; }
.blog-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; }
```

### 7. Sitemap

Update `src/app/sitemap.ts` om dynamische blog posts toe te voegen:

```typescript
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";

// In je sitemap functie:
const dynamicSlugs = await getAllPublishedSlugs();
for (const { slug, updatedAt } of dynamicSlugs) {
  addLocalizedPath(`/blog/${slug}`, {
    priority: 0.7,
    changeFrequency: "weekly",
    lastModified: updatedAt.toISOString(),
  });
}
```

### 8. GitHub Actions Workflows

Kopieer `.github/workflows/content-generate.yml`:

```yaml
name: Daily Blog Post Generation

on:
  schedule:
    - cron: "0 8 * * *"      # Elke dag 08:00 UTC
  workflow_dispatch:
    inputs:
      topic:
        description: "Blog post topic (leave empty for auto-select)"
        required: false
        default: "auto"
      model:
        description: "AI model to use"
        required: false
        default: "claude-haiku"
        type: choice
        options:
          - claude-haiku
          - gpt-5-nano
      publish:
        description: "Publish immediately?"
        required: false
        default: "false"
        type: choice
        options:
          - "false"
          - "true"

jobs:
  generate-text:
    runs-on: ubuntu-latest
    timeout-minutes: 8
    outputs:
      post_id: ${{ steps.poll.outputs.post_id }}
      slug: ${{ steps.poll.outputs.slug }}
      title: ${{ steps.poll.outputs.title }}
    steps:
      - name: Start background generation
        id: start
        run: |
          TOPIC="${{ github.event.inputs.topic || 'auto' }}"
          MODEL="${{ github.event.inputs.model || 'claude-haiku' }}"
          PUBLISH="${{ github.event.inputs.publish || 'false' }}"

          RESPONSE=$(curl -s --http1.1 -X POST \
            "${{ secrets.SITE_URL }}/api/pipeline/generate" \
            -H "Content-Type: application/json" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            -d "{\"type\": \"blog-post\", \"phase\": \"start\", \"topic\": \"$TOPIC\", \"model\": \"$MODEL\", \"publish\": $PUBLISH}" \
            --max-time 30)

          JOB_ID=$(echo "$RESPONSE" | jq -r '.jobId // empty')
          if [ -z "$JOB_ID" ]; then
            echo "::error::No jobId in response: $RESPONSE"
            exit 1
          fi
          echo "job_id=$JOB_ID" >> "$GITHUB_OUTPUT"

      - name: Poll for completion
        id: poll
        run: |
          JOB_ID="${{ steps.start.outputs.job_id }}"
          for i in $(seq 1 36); do
            sleep 10
            RESPONSE=$(curl -s --http1.1 -X POST \
              "${{ secrets.SITE_URL }}/api/pipeline/generate" \
              -H "Content-Type: application/json" \
              -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
              -d "{\"type\": \"blog-post\", \"phase\": \"status\", \"jobId\": \"$JOB_ID\"}" \
              --max-time 15)

            STATUS=$(echo "$RESPONSE" | jq -r '.status // empty')
            echo "Attempt $i/36: status=$STATUS"

            if [ "$STATUS" = "completed" ]; then
              echo "post_id=$(echo $RESPONSE | jq -r '.postId')" >> "$GITHUB_OUTPUT"
              echo "slug=$(echo $RESPONSE | jq -r '.slug')" >> "$GITHUB_OUTPUT"
              echo "title=$(echo $RESPONSE | jq -r '.title')" >> "$GITHUB_OUTPUT"
              exit 0
            elif [ "$STATUS" = "failed" ]; then
              echo "::error::Generation failed: $(echo $RESPONSE | jq -r '.error')"
              exit 1
            fi
          done
          echo "::error::Timed out after 6 minutes"
          exit 1

  publish-post:
    runs-on: ubuntu-latest
    needs: [generate-text]
    if: >-
      always() && needs.generate-text.result == 'success' &&
      (github.event.inputs.publish == 'true' || github.event_name == 'schedule')
    steps:
      - name: Publish blog post
        run: |
          RESPONSE=$(curl -s --http1.1 -X POST \
            "${{ secrets.SITE_URL }}/api/pipeline/generate" \
            -H "Content-Type: application/json" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            -d "{\"type\": \"blog-post\", \"phase\": \"publish\", \"postId\": \"${{ needs.generate-text.outputs.post_id }}\"}" \
            --max-time 30)

          PUBLISHED=$(echo "$RESPONSE" | jq -r '.published // false')
          if [ "$PUBLISHED" != "true" ]; then
            echo "::error::Publish failed"
            exit 1
          fi
          echo "Published: ${{ needs.generate-text.outputs.title }}"
```

Stel de **GitHub Secrets** in (repo Settings > Secrets > Actions):
- `SITE_URL` = je Netlify URL (bijv. `https://jouwsite.com`)
- `PIPELINE_SECRET` = zelfde als je Netlify env var

## Aanpassen voor Andere Niches

De pipeline is **niche-agnostisch**. Om het aan te passen:

### 1. Content prompt aanpassen

In `generate-blog-background.ts`, pas de `autoSelectTopic()` prompt aan:

```typescript
// Verander dit:
"About VPNs, online privacy, cybersecurity, or related subjects"
// Naar bijv:
"About airconditioning, HVAC installation, energy efficiency, or climate control"
```

De `buildPrompt()` functie is al generiek — het haalt interne links uit de sitemap en gebruikt `SITE_URL`.

### 2. Scraper aanpassen

In `scraper.ts`, pas de URLs aan voor je niche. Of verwijder de scraper als je geen externe data nodig hebt.

### 3. Categorieën aanpassen

In `schema.ts` en de blog pages, verander de categorieën:
```
news | guide | comparison | deal  →  jouw categorieën
```

### 4. E-E-A-T componenten

Pas `AuthorBox` en `FactCheckedBadge` aan met je eigen team/bedrijf info.

## Handmatig Testen

```bash
# Blog post genereren (test)
curl -X POST https://jouwsite.com/api/pipeline/generate \
  -H "Content-Type: application/json" \
  -H "x-pipeline-key: JOUW_PIPELINE_SECRET" \
  -d '{"type": "blog-post", "phase": "start", "topic": "auto", "model": "claude-haiku", "publish": false}'

# Status pollen
curl -X POST https://jouwsite.com/api/pipeline/generate \
  -H "Content-Type: application/json" \
  -H "x-pipeline-key: JOUW_PIPELINE_SECRET" \
  -d '{"type": "blog-post", "phase": "status", "jobId": "JOB_ID_HIER"}'

# Publiceren
curl -X POST https://jouwsite.com/api/pipeline/generate \
  -H "Content-Type: application/json" \
  -H "x-pipeline-key: JOUW_PIPELINE_SECRET" \
  -d '{"type": "blog-post", "phase": "publish", "postId": "POST_ID_HIER"}'

# Pipeline status bekijken
curl https://jouwsite.com/api/pipeline/status \
  -H "x-pipeline-key: JOUW_PIPELINE_SECRET"
```

Of via GitHub Actions: ga naar Actions tab > "Daily Blog Post Generation" > Run workflow.

## Kosten Overzicht (per maand, dagelijks 1 post)

| Component | Kosten |
|-----------|--------|
| Claude Haiku (30 posts × ~$0.02) | ~$0.60 |
| Gemini Flash (90 images, gratis tier) | $0.00 |
| NeonDB (free tier, ~100MB) | $0.00 |
| Netlify (free tier) | $0.00 |
| GitHub Actions (~30 min/maand) | $0.00 |
| **Totaal** | **~$0.60/maand** |

## Troubleshooting

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| "No jobId in response" | API route auth failed | Check PIPELINE_SECRET in GitHub Secrets |
| "Generation timed out" | Background function te traag | Check Netlify function logs |
| Duplicate slug error | Zelfde topic gegenereerd | autoSelectTopic checkt nu DB, + slug dedup |
| Lege blog listing | Page is static cached | `export const dynamic = "force-dynamic"` |
| Reading time 1788 min | Base64 images in content | Strip `data:[^"]+` voor berekening |
| Hydration mismatch | `toLocaleDateString` verschilt server/client | Gebruik deterministische `formatDate` functie |
| Images met tekst | Gemini negeert "no text" soms | Prompt zegt nu "ZERO text, ZERO letters" etc. |
