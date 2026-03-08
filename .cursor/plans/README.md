# ZironTap Implementation Plans

Step-by-step implementation plans derived from the [ZironTap Structure Plan (full-project.plan.md)](full-project.plan.md). Use these while building the project—you can work on UI in parallel by following the order below.

## Implementation Order

| # | Plan | Description |
|---|------|-------------|
| 00 | [00-project-structure-packages.plan.md](00-project-structure-packages.plan.md) | Project folder structure, packages setup (package.json, tsconfig), pnpm-workspace, turbo |
| 01 | [01-scaffold.plan.md](01-scaffold.plan.md) | Root workspace, tooling, Husky, docker-compose, shadcn init |
| 02 | [02-db.plan.md](02-db.plan.md) | Drizzle schema for users, orgs, cards, short_links, review_cards, analytics, qr_records, org_entitlements |
| 03 | [03-validators.plan.md](03-validators.plan.md) | Zod schemas (primitives, card, short-link, review, qr, analytics) |
| 04 | [04-auth.plan.md](04-auth.plan.md) | Better Auth + orgs + Polar plugin |
| 05 | [05-email.plan.md](05-email.plan.md) | Nodemailer + react-email; verification, reset, invites; Mailpit for dev |
| 06 | [06-api.plan.md](06-api.plan.md) | oRPC routers, context, middleware |
| 07 | [07-media.plan.md](07-media.plan.md) | WebP, thumbnails, compressAndResize, PROFILE_IMAGE/COVER_IMAGE presets |
| 08 | [08-image-editor-better-upload.plan.md](08-image-editor-better-upload.plan.md) | Image editor (react-advanced-cropper), Better Upload route, profile/cover components |
| 09 | [09-qr.plan.md](09-qr.plan.md) | QR encode + render (uses @ziron/media for logo) |
| 10 | [10-analytics.plan.md](10-analytics.plan.md) | Analytics package (track, query, real-time SSE) |
| 11 | [11-templates.plan.md](11-templates.plan.md) | Templates package + UI components |
| 12 | [12-apps.plan.md](12-apps.plan.md) | Marketing (minimal), client (routes), portal (dashboard) |
| 13 | [13-inngest.plan.md](13-inngest.plan.md) | Background jobs in portal or api package |

## Usage

- **Sequential:** Follow 00 → 13 for full implementation.
- **Parallel with UI:** After 01 (scaffold) and 02 (DB), you can start building UI components (forms, providers) while implementing 03–07. Plans 08–12 integrate UI with backend.
- **Reference:** Each plan links to [full-project.plan.md](full-project.plan.md) with specific section refs (§2, §3.x, §5, §7, §13). Related plans are cross-linked (e.g. 06 API ↔ 05 Email, 07 Media, 10 Analytics, 13 Inngest).

## Main Plan

The master plan lives at [full-project.plan.md](full-project.plan.md) and contains the complete architecture, routes, database design, packages, conventions, and (in §13) resolved decisions such as Inngest placement.
