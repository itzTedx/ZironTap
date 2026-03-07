# ZironTap — Project Overview for AI

> **Purpose:** This document gives AI assistants quick context for "vibe coding" — understanding the project structure, stack, and conventions without reading the full spec.

## What is ZironTap?

ZironTap is a **production-ready Turborepo monorepo** SaaS platform for:

- **Digital business cards** — Shareable cards with profile, cover, contact info
- **URL shortener** — Short links with redirect + click analytics
- **QR generator** — Multi-type QR (url, vCard, WiFi, etc.) with logo/colors
- **Review cards** — Collect and display customer reviews

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | Turborepo, pnpm workspaces |
| Apps | Next.js 16 App Router |
| Auth | Better Auth (orgs, Google, Apple, passkeys, Polar) |
| API | oRPC (type-safe RPC) |
| DB | Drizzle ORM, Postgres |
| UI | shadcn + Base UI, TanStack Form, Jotai, nuqs |
| Validation | Zod (`@ziron/validators`) — single source for API + forms |
| Lint/Format | **Biome only** (no Prettier, no ESLint) |
| Jobs | Inngest (swappable) |
| Payments | Polar (one-time) |

## Apps

| App | Purpose | Key Routes |
|-----|---------|------------|
| **marketing** | Landing, pricing, Polar checkout CTA | `/`, `/pricing`, `/features` |
| **client** | Public-facing | `/[slug]` cards, `/r/[shortCode]` redirects, `/review/[slug]` |
| **portal** | Admin dashboard | `/[orgSlug]/cards`, `/links`, `/qr`, `/reviews`, `/media`, `/billing` |

## Packages (Shared)

| Package | Role |
|---------|------|
| `@ziron/auth` | Better Auth, orgs, Polar plugin |
| `@ziron/api` | oRPC routers, context, rate-limit |
| `@ziron/db` | Drizzle schema, migrations |
| `@ziron/validators` | Zod schemas — API + form validation |
| `@ziron/ui` | shadcn, form components, image editor |
| `@ziron/media` | WebP, thumbnails, compress/resize |
| `@ziron/qr` | QR encode + render |
| `@ziron/analytics` | trackView, trackClick, trackEvent |
| `@ziron/templates` | Theme/template logic |
| `@ziron/email` | nodemailer + react-email |
| `@ziron/jobs` | Inngest background jobs |
| `@ziron/sync` | Offline-first (IndexedDB, queue) |
| `@ziron/config` | Env validation (t3-oss/env-nextjs) |
| `@ziron/rate-limit` | rate-limiter-flexible |

## Key Conventions

- **Org-scoped:** All resources (cards, links, QR, reviews) belong to `organizationId`. Routes use `[orgSlug]`.
- **Roles:** Super admin > Admin > Member (per org).
- **Validation:** Use `@ziron/validators` — never duplicate schemas.
- **Forms:** TanStack Form + `@tanstack/zod-form-adapter` + shadcn form components.
- **Frontend design:** User owns page layouts and styling. AI provides logic, structure, API wiring, placeholders.

## Where Things Live

| Concern | Location |
|---------|----------|
| Card public page | `apps/client/src/app/[slug]/page.tsx` |
| Short-link redirect | `apps/client/src/app/r/[shortCode]/page.tsx` |
| oRPC router | `packages/api/src/router.ts` |
| Drizzle schema | `packages/db/src/schema/` |
| Form components | `packages/ui/src/components/form/` |
| Image editor | `packages/ui/src/components/image-editor/` |
| Providers | `apps/portal/src/providers/` |

## Dependency management

- **Versions** are managed by the pnpm **catalog** in `pnpm-workspace.yaml` (default catalog and named catalogs, e.g. `react19`). Packages use `catalog:` or `catalog:react19` in `package.json`; upgrade dependencies by editing the catalog only.
- **Dependency structure** (who may depend on whom) is enforced by **@ziron/dependency-rules** via dependency-cruiser and `tooling/dependency-rules/.dependency-cruiser.cjs`: no circular deps, packages must not depend on apps, `@ziron/ui` must not depend on `@ziron/api`.

## Commands

- `pnpm dev` — Run all apps
- `pnpm build` — Build workspace
- `pnpm lint` / `pnpm format` — Biome
- `pnpm ui:add button` — Add shadcn component to `@ziron/ui`
- `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:studio` — Drizzle

## Full Spec

See `plans/FULL_PROJECT_PROMPT.md` for the complete structure, routes, DB schema, and implementation details.
