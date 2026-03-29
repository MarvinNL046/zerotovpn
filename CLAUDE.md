# CLAUDE.md - ZeroToVPN

This file provides guidance to Claude Code when working with the ZeroToVPN codebase.

## Project Overview

ZeroToVPN (zerotovpn.com) is a multilingual VPN affiliate comparison website built with Next.js 16. The site compares VPN providers, displays user reviews, and earns affiliate commissions through Short.io tracked links.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Internationalization**: next-intl (9 locales)
- **Database**: PostgreSQL via Prisma (Neon - not yet connected)
- **Themes**: next-themes (light/dark mode)

## Development Commands

```bash
# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Prisma commands
npx prisma generate          # Generate Prisma client
npx prisma db push           # Push schema to database
npx prisma studio            # Open Prisma Studio GUI
```

## Project Architecture

### Directory Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Homepage with VPN comparisons
│   │   ├── layout.tsx      # Root layout with i18n
│   │   └── reviews/
│   │       ├── page.tsx    # All reviews listing
│   │       └── [slug]/     # Individual VPN review pages
│   │           └── page.tsx
│   ├── admin/              # Admin dashboard (outside i18n)
│   │   ├── layout.tsx      # Admin layout with auth
│   │   ├── page.tsx        # Dashboard overview
│   │   ├── reviews/        # Review moderation
│   │   ├── clicks/         # Click analytics
│   │   └── settings/       # Admin settings
│   └── api/                # API routes
│       └── reviews/        # Review submission API
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── vpn/                # VPN-specific components
│   └── reviews/            # Review system components
├── lib/
│   ├── vpn-data.ts         # Static VPN provider data
│   ├── user-reviews.ts     # Review types and mock data
│   └── utils.ts            # Utility functions (cn)
├── i18n/
│   ├── routing.ts          # Locale configuration
│   └── request.ts          # i18n request handler
├── messages/               # Translation JSON files (en.json, nl.json, etc.)
└── generated/prisma/       # Generated Prisma client
```

### Supported Locales

Configured in `src/i18n/routing.ts`:
- English (en) - default
- Dutch (nl)
- German (de)
- Spanish (es)
- French (fr)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Thai (th)

### Middleware

The middleware (`src/middleware.ts`) handles i18n routing with exclusions for:
- `/api/*` - API routes
- `/admin/*` - Admin dashboard
- `/_next/*` - Next.js internals
- Static files

## Key Components

### VPN Data (`src/lib/vpn-data.ts`)

Static VPN provider data including:
- Pricing, features, ratings
- Affiliate URLs (Short.io format: `go.zerotovpn.com/vpnname`)
- Will be migrated to database once Neon is connected

### Review System

- **User reviews**: `src/components/reviews/review-form.tsx` - Public submission form
- **Review list**: `src/components/reviews/user-reviews-list.tsx` - Display component
- **Data types**: `src/lib/user-reviews.ts` - Types and mock data
- **GDPR compliant**: Optional newsletter consent checkbox

### Admin Dashboard (`/admin`)

- Simple localStorage-based authentication (8+ character key)
- Review moderation (approve/reject pending reviews)
- Click analytics (placeholder for Short.io integration)
- Settings management

## Database Schema

Prisma schema (`prisma/schema.prisma`) includes:
- `VpnProvider` - VPN data with pricing, features, ratings
- `Review` - Editorial reviews (multilingual)
- `UserReview` - User-submitted reviews with moderation
- `Click` - Affiliate click tracking
- `Subscriber` - Email newsletter subscribers
- `Page` - Static content pages

## Important Patterns

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name> -y
```

Components are installed to `src/components/ui/`.

### Translations

Add translations to `src/messages/{locale}.json`. Access via:
```typescript
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
```

### Affiliate Links

All affiliate URLs use Short.io tracking format:
```
https://go.zerotovpn.com/{vpn-slug}
```

### Admin Route Protection

Admin routes are excluded from i18n middleware. The admin layout handles its own authentication via localStorage.

## VPN Review Quality Blueprint

Current review pages are THIN CONTENT — just structured data rendered as a template. They need to be rewritten as comprehensive, EEAT-worthy articles.

### Review Content Requirements
- **2,500-4,000 words** per review — real article, not template filler
- **Playwright screenshots** of actual VPN app + pricing page (ALWAYS IN ENGLISH, not NL)
- **WebSearch + WebFetch** for real speed test data, audit dates, pricing
- **Source links** cited at bottom of every review
- **NO AI slop/fluff** — write like a journalist who actually tested the product
- **One review at a time** — thorough, not batch

### Review Article Structure
1. **Quick Verdict** — summary box with rating, price, best for
2. **Who Is It For / Not For** — audience segmentation
3. **Speed Test Results** — real numbers (mbps), comparison table vs competitors
4. **Security & Privacy** — encryption, audit details (who, when), jurisdiction, protocols
5. **Streaming Performance** — Netflix US, BBC iPlayer, Disney+ (tested results)
6. **Pricing & Plans** — table with all tiers, renewal prices, money-back guarantee
7. **Apps & Usability** — platforms, simultaneous devices, UI quality
8. **Comparison Table** — vs 2-3 competitors on 8-10 metrics
9. **What I Don't Like** — balanced honest negatives
10. **Who Should Choose This VPN?** — decision guide by persona
11. **FAQ** — 6-8 questions (auto-generates FAQSchema)
12. **Sources** — clickable reference links

### Visual Elements (CRITICAL)
- Hero screenshot of VPN app (Playwright, English UI)
- Pricing table screenshot from official site
- Speed test comparison table
- Pros/cons cards (green/red)
- Quick stats sidebar card
- Feature comparison matrix with ✓/✗

### Trust Signals (EEAT)
- "Tested for 30+ days" claim
- Independent audit citations with dates
- Specific test numbers (not vague "fast speeds")
- Affiliate disclosure
- Author with "Verified" badge
- Last updated timestamp

### Technical Implementation
- Rich content stored in `src/data/reviews/{slug}.json`
- Review page template checks for rich content, falls back to current thin template
- FAQSchema component: use `FAQSchema` (JSON-LD only) at top, `FAQAccordion` (visual) at bottom
- Affiliate links: `https://go.zerotovpn.com/{slug}` with rel="noopener nofollow sponsored"

### Priority Order (Top 5 first)
1. NordVPN (most searched, editor's choice)
2. Surfshark (best budget, unlimited devices)
3. ExpressVPN (premium, Lightway protocol)
4. CyberGhost (large server network)
5. ProtonVPN (best privacy)

### Research Data Already Collected (NordVPN)
- Speed: 903 Mbps (CyberInsider), 950+ Mbps (TechRadar)
- Audits: 6x no-logs (PwC 2018/2020, Deloitte 2022-2025)
- Pricing: Basic €3.39, Plus €3.89, Ultimate €6.89 (2-year, from nordvpn.com March 2026)
- 9,000+ servers, 130 countries
- Post-quantum cryptography, NordWhisper protocol
- Rating: 9.7/10 (Security.org)

## Other Pending Work

- **Navbar consolidation**: Mega menu for Best VPNs, Devices, Tools dropdowns
- **FAQ styling**: Fix CSS on best/* pages (accordion styling inconsistent)
- **Date consistency**: All dates must say current month (fixed November → March 2026)

## Deployment

Configured for Vercel with:
- AdSense approved (ca-pub-9667530069853985) — ads live
- 9 locales via next-intl
- Short.io affiliate tracking
# Database connected
