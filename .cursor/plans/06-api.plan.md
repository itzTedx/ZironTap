---
name: 06 API
overview: oRPC routers, context (auth, org), middleware, domain routers. Rate limiting, error handling.
parentPlan: ziron_tap_structure_plan_43dd61bf.plan.md
order: 6
todos: []
---

# Implementation Plan 06: API

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

`packages/api` — oRPC root router, context, middleware stack, domain routers (cards, short-links, qr, reviews, analytics, notifications).

## Deliverables

- [ ] `packages/api/package.json` — orpc, @ziron/db, @ziron/validators, @ziron/rate-limit, @ziron/email
- [ ] `src/router.ts` — root router, merge domain routers
- [ ] `src/context.ts` — auth context, org context
- [ ] `src/middleware/` — base, auth, db, rate-limit, errors, index
- [ ] `src/cards/` — mutation, query
- [ ] `src/short-links/` — index
- [ ] `src/qr/` — index
- [ ] `src/reviews/` — index
- [ ] `src/analytics/` — index
- [ ] `src/notifications/` — router (SSE Event Iterator), publisher
- [ ] Type-safe errors (UNAUTHORIZED, FORBIDDEN, NOT_FOUND, etc.)
- [ ] Invite procedure → sendInviteEmail from @ziron/email

## Next

→ [07 Media](07-media.plan.md)
