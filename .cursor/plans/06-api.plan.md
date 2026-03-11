---
name: 06 API
overview: oRPC routers, context (auth, org), middleware, domain routers. Rate limiting, error handling.
todos: []
isProject: false
---

# Implementation Plan 06: API

**Parent:** [full-project.plan.md](full-project.plan.md) — §3.7 packages/api, §3.7.1 Live Notifications, §3.7.2 Error Handling

**Related:** [03 Validators](03-validators.plan.md) (input schemas); [05 Email](05-email.plan.md) (invite → sendInviteEmail); [07 Media](07-media.plan.md) (upload handlers); [10 Analytics](10-analytics.plan.md) (track + SSE publish); [13 Inngest](13-inngest.plan.md) (procedures trigger jobs via @ziron/jobs client)

## Scope

`packages/api` — oRPC root router, context, middleware stack, shared procedures (`baseProcedure`, `protectedProcedure`), domain routers (cards, qr, notifications, contracts).

## Deliverables

- `packages/api/package.json` — orpc, @ziron/db, @ziron/validators, @ziron/rate-limit, @ziron/email
- `src/router.ts` — root router, merge domain routers and export `baseProcedure`, `protectedProcedure`
- `src/context.ts` — auth context, org context
- `src/middleware/` — base, auth, db, rate-limit, errors, index
- `src/cards/` — mutation, query; card update accepts `version`, increments on save; return 409 CONFLICT if `version` mismatch (client must refresh and retry or show conflict)
- `src/qr/` — index
- `src/notifications/` — router (SSE Event Iterator), publisher
- `src/contracts/` — index
- Type-safe errors (UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT for version mismatch, etc.)
- Invite procedure → sendInviteEmail from @ziron/email

> **Note:** Short-links, reviews, and analytics routers are deferred for a later iteration of this plan.

## Next

→ [07 Media](07-media.plan.md)