---
name: 04 Auth
overview: Better Auth — users, orgs, Email & Password, Google/Apple, passkeys, 2FA, Polar plugin. Email integration deferred to step 05.
parentPlan: ziron_tap_structure_plan_43dd61bf.plan.md
order: 4
todos: []
---

# Implementation Plan 04: Auth

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

`packages/auth` — Better Auth config, org plugin, session store (Redis/Valkey), Polar plugin. Wire email in step 05.

## Deliverables

- [ ] `packages/auth/package.json` — better-auth, @polar-sh/better-auth, @better-auth/passkey, @ziron/email (for step 05)
- [ ] `src/index.ts` — auth config export
- [ ] `src/org.ts` — org plugin
- [ ] `src/session.ts` — Redis/Valkey session store
- [ ] `src/polar.ts` — Polar plugin (checkout, webhooks, portal)
- [ ] Email integration placeholders — wire in step 05

## Dependencies

- Better Auth
- @polar-sh/better-auth
- @polar-sh/sdk
- @better-auth/passkey
- @ziron/email (after step 05)

## Env

- `DATABASE_URL`, `REDIS_URL`
- `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`

## Next

→ [05 Email](05-email.plan.md)
