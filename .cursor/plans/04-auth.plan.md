---
name: 04 Auth
overview: Better Auth — users, orgs, Email & Password, Google/Apple, passkeys, 2FA, Polar plugin. Email integration deferred to step 05.
parentPlan: full-project.plan.md
order: 4
todos: []
---

# Implementation Plan 04: Auth

**Parent:** [full-project.plan.md](full-project.plan.md) — §3.1 packages/auth, §3.12 Polar & Pricing

**Related:** [05 Email](05-email.plan.md) (wire sendVerificationEmail, sendResetPassword in step 05); [12 Apps](12-apps.plan.md) (portal, marketing consume auth)

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
