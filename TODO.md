# TODO

Central task tracker — priorities, in-progress work, blockers, quick wins. Update daily; keep short; move items as status changes.

## This Week

- [ ] **02 DB** — Add `packages/db` with Drizzle: schema (users, organizations, organization_members, cards, short_links, review_cards, qr_records, analytics_events, org_entitlements, media, tags, templates, organization_invites, activity_log), indexes, soft deletes (`deleted_at`), `migrate.ts`, `drizzle.config.ts`; wire `db:generate`, `db:migrate`, `db:studio` in turbo
- [ ] **02 DB** — Run first migration and confirm `docker compose` Postgres + Studio
- [ ] **03 Validators** — Add `packages/validators`: primitives (slug, shortCode, email, url, uuid, pagination), `src/index.ts` barrel
- [ ] **03 Validators** — Card schemas: appearance, phones, emails, links, attachments, card create/update variants
- [ ] **03 Validators** — Short-link, review, QR, analytics + common (orgId, userId, dateRange, list params) schemas

## In Progress

- (Add current work; link branches/PRs when applicable)

## Backlog

### Auth
- [ ] **04 Auth** — Better Auth + orgs + Polar plugin (`packages/auth`)

### Cards
- [ ] Card CRUD via oRPC (after 06 API); card public page `client/[slug]` (after 12 Apps)
- [ ] **08 Image editor** — react-advanced-cropper, Better Upload, profile/cover components

### Links / Shortener
- [ ] Short-link CRUD + redirect handler `client/r/[shortCode]` (after 06 API, 12 Apps)
- [ ] **10 Analytics** — trackView, trackClick, query, real-time SSE

### QR
- [ ] **09 QR** — encode + render (url, vCard, WiFi, etc.), logo via `@ziron/media`

### Reviews
- [ ] Review card CRUD + public page `client/review/[slug]` (after 06 API, 12 Apps)

### Portal / Client / Marketing
- [ ] **05 Email** — nodemailer + react-email; verification, reset, invites; Mailpit dev
- [ ] **06 API** — oRPC routers, context, middleware (depends on DB + validators)
- [ ] **07 Media** — WebP, thumbnails, compressAndResize, presets
- [ ] **11 Templates** — templates package + theme/template UI
- [ ] **12 Apps** — marketing (landing, pricing), client (cards/redirect/review routes), portal (dashboard, `[orgSlug]` routes)
- [ ] **13 Inngest** — background jobs (portal or api package)

### Infra / Tooling
- [ ] Rate-limit package; dependency-rules checks in CI

## Blocked

- **04 Auth** — blocked until `packages/db` and migrations are in place (Better Auth needs DB)
- **06 API** — blocked until DB + validators are done (oRPC uses both)
- **12 Apps** — portal auth flows blocked until 04 Auth; client/portal data blocked until 06 API

## Done

- **00 Project structure** — monorepo layout, pnpm-workspace, turbo, package.json/tsconfig for workspace
- **01 Scaffold** — turbo tasks, tooling (biome, typescript-config, vitest-config, commitlint, dependency-rules), Husky, lint-staged, docker-compose, .changeset, shadcn monorepo init, .vscode, .cursor/rules, .nvmrc, .editorconfig, .gitattributes
- Initial `apps/web` and `packages/ui` (Next.js + shadcn button, theme-provider)
