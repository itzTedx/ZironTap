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

`packages/api` — oRPC root router, context, middleware stack, domain routers (cards, short-links, qr, reviews, analytics, notifications).

## Deliverables

- `packages/api/package.json` — orpc, @ziron/db, @ziron/validators, @ziron/rate-limit, @ziron/email
- `src/router.ts` — root router, merge domain routers
- `src/context.ts` — auth context, org context
- `src/middleware/` — base, auth, db, rate-limit, errors, index
- `src/cards/` — mutation, query; card update accepts `version`, increments on save; return 409 CONFLICT if `version` mismatch (client must refresh and retry or show conflict)
- `src/short-links/` — index
- `src/qr/` — index
- `src/reviews/` — index
- `src/analytics/` — index
- `src/notifications/` — router (SSE Event Iterator), publisher
- Type-safe errors (UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT for version mismatch, etc.)
- Invite procedure → sendInviteEmail from @ziron/email

## Next

→ [07 Media](07-media.plan.md)