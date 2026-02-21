---
project_name: 'zerotovpn'
user_name: 'Marvin'
date: '2026-02-21'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 45
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Framework**: Next.js 16.1.6 (App Router, Turbopack) — NOT Pages Router
- **React**: 19.2.0 — uses React 19 features (use, server components native)
- **TypeScript**: 5.9.3 — strict mode, ES2017 target, `@/*` path aliases
- **CSS**: Tailwind CSS v4 — no tailwind.config.js (v4 uses CSS-based config)
- **UI**: shadcn/ui — install via `npx shadcn@latest add <name> -y`, components in `src/components/ui/`
- **i18n**: next-intl 4.5.6 — 9 locales (en/nl/de/es/fr/zh/ja/ko/th), default: en
- **Database**: Neon PostgreSQL via `@neondatabase/serverless` + Drizzle ORM
- **Auth**: @stackframe/stack (Stack Auth)
- **Email**: Resend
- **Icons**: lucide-react
- **Deployment**: Vercel (image optimization enabled)

## Critical Implementation Rules

### Language-Specific Rules

- **Path aliases required**: Always `@/components/...`, `@/lib/...` — never relative `../` imports
- **Strict mode**: `strict: true` in tsconfig — no `any` types, no implicit returns
- **Type all parameters**: Explicit types for all function params and return values
- **Drizzle schema types**: Use `InferSelectModel<typeof table>` and `InferInsertModel<typeof table>` for DB types
- **Date serialization trap**: `unstable_cache` serializes Date objects to JSON strings — always wrap with `new Date(value)` before calling `.toISOString()` or other Date methods
- **Server actions**: Top-level `"use server"` directive, must return serializable data only (no JSX)
- **`"use client"` placement**: Must be the very first line of file, before ANY imports
- **SQL template literals**: Use `sql` tagged templates from `@neondatabase/serverless` for raw queries — never string concatenation
- **Environment variables**: `DATABASE_URL` required at runtime, graceful build-phase detection via `process.env.NEXT_PHASE`

### Framework-Specific Rules

- **App Router only**: No Pages Router — all routes under `src/app/`
- **Server components by default**: Only add `"use client"` when using hooks, state, event handlers, or browser APIs
- **Custom Link component**: Import `Link` from `@/i18n/navigation` — NEVER from `next/link` directly (breaks locale routing)
- **Locale in routes**: All public pages under `src/app/[locale]/` — admin routes excluded from i18n at `src/app/admin/`
- **Locale prefix**: `"as-needed"` — English has no `/en/` prefix, all others get `/{locale}/` prefix
- **Translations**: Use `useTranslations("namespace")` from `next-intl` — every user-visible string must be translated
- **generateStaticParams**: Required for all `[dynamic]` route segments to enable static generation — include all locales
- **Metadata template**: Layout adds `" | ZeroToVPN"` suffix — page metadata must NOT include it (causes double titles)
- **SEO base URL**: Always `https://www.zerotovpn.com` (with www) — use `generateAlternates()` from `@/lib/seo-utils` for canonical/hreflang
- **Hybrid data layer**: `src/lib/vpn-data-layer.ts` — DB first, falls back to static data during build phase (`NEXT_PHASE === "phase-production-build"`)
- **Caching**: Use `unstable_cache` with explicit tags for revalidation — remember Date serialization issue
- **Blog images**: Served via `/api/blog-image/[slug]` API route from DB — never inline base64 in page HTML
- **shadcn components**: Install with `npx shadcn@latest add <name> -y` — use `cn()` from `@/lib/utils` for conditional className merging
- **Affiliate links**: Format `https://go.zerotovpn.com/{vpn-slug}` (Short.io tracking)

### Testing Rules

- **Framework**: Playwright installed (1.57.0) — no tests written yet
- **No test config exists**: When creating tests, set up `playwright.config.ts` at project root
- **Test location**: Place tests in `tests/` directory at project root (not inside `src/`)
- **E2E focus**: Primary testing strategy should be E2E tests — this is a content/affiliate site, not a complex SPA
- **i18n testing**: Test at minimum the default locale (en) and one non-default locale (nl) to catch locale routing issues
- **API route tests**: Test `/api/` routes for correct status codes and response structure
- **No unit test framework**: No Jest/Vitest configured — add only if needed for utility function testing
- **Build verification**: `npm run build` must pass as minimum CI gate — catches TypeScript errors and static generation failures

### Code Quality & Style Rules

- **ESLint**: Flat config (`eslint.config.mjs`) — uses `next/core-web-vitals` + `next/typescript` presets
- **No Prettier**: No Prettier configured — rely on ESLint and editor defaults
- **File naming**: kebab-case for all files (`vpn-card.tsx`, `seo-utils.ts`) — PascalCase for exports (`VpnCard`, `ReviewForm`)
- **Component files**: One primary export per file, named to match the PascalCase component name
- **Styling**: Tailwind CSS v4 utility classes — use `cn()` for conditional merging, never ternary in className strings
- **No comments unless necessary**: Code should be self-documenting — only add comments for non-obvious business logic
- **Imports order**: React/Next.js first, then external packages, then `@/` internal imports, then relative imports
- **Props interface**: Define `interface ComponentNameProps` above the component, include `locale: string` for i18n-aware components
- **Server actions file**: `src/app/actions.ts` — single file with `"use server"` at top, all server actions collected here
- **Utility pattern**: `cn()` from `@/lib/utils` is the ONLY utility abstraction — don't create utility wrapper files

### Development Workflow Rules

- **Branch**: Single `main` branch — push directly for now (solo developer workflow)
- **Deployment**: Vercel auto-deploys on push to `main` — every push is a production deploy
- **Dev server**: `npm run dev` (Turbopack) — auto-runs `generate:sitemap-routes` script first
- **Pre-build step**: `npm run prebuild` generates `src/app/sitemap-static-routes.json` from filesystem scan
- **Build check**: Always run `npm run build` locally before pushing — catches type errors, missing translations, static generation failures
- **Database migrations**: `npx drizzle-kit push` to push schema changes to Neon — no migration files committed
- **Environment variables**: Set in Vercel dashboard for production — `.env.local` for local development (git-ignored)
- **Image optimization**: Enabled on Vercel (no `unoptimized: true`) — use Next.js `<Image>` component, not `<img>`
- **Commit style**: Short imperative descriptions — e.g. "Fix double titles and structured data validation errors"

### Critical Don't-Miss Rules

- **NEVER use `next/link` directly** — always import `Link` from `@/i18n/navigation`, otherwise locale routing breaks silently
- **NEVER inline base64 images in pages** — blog featured images caused a 42MB page; always serve via API route with lazy loading
- **NEVER call `.toISOString()` on cached data** — `unstable_cache` turns Date objects into strings; always wrap: `new Date(value).toISOString()`
- **NEVER include `" | ZeroToVPN"` in page metadata titles** — the layout template adds it automatically, causing "Page Title | ZeroToVPN | ZeroToVPN"
- **NEVER use non-www URLs for canonical/OG tags** — site redirects to `www.zerotovpn.com`; non-www canonicals cause crawl issues
- **NEVER add header/footer links without creating the actual page** — causes 404s that harm SEO
- **NEVER fetch `featuredImage` column in list queries** — contains multi-MB base64 data; use `sql<boolean>\`"featuredImage" IS NOT NULL\`` for lightweight boolean check
- **NEVER skip `generateStaticParams`** for dynamic `[slug]` or `[country]` routes — pages won't be pre-rendered and may not get crawled
- **ALWAYS use `generateAlternates()` from `@/lib/seo-utils`** in every page's `generateMetadata` — ensures correct canonical + hreflang for all 9 locales
- **ALWAYS test with at least 2 locales** — default English (no prefix) and one other (e.g. `/nl/`) to catch routing asymmetry bugs
- **Admin routes are OUTSIDE i18n** — `src/app/admin/` is not wrapped in `[locale]`, uses `force-dynamic`, localStorage auth

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-02-21
