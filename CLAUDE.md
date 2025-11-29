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

## Pending Work

1. **Database Connection**: Connect to Neon PostgreSQL and migrate from mock data
2. **Reviews API**: Connect `/api/reviews` to database
3. **Short.io Integration**: API integration for click analytics in admin
4. **Email System**: Newsletter functionality for collected emails

## Deployment

Configured for Netlify static hosting with:
- Image optimization disabled (`unoptimized: true`)
- Static export ready (uncomment `output: "export"` in next.config.ts)
# Database connected
