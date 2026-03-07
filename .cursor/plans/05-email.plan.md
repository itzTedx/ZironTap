---
name: 05 Email
overview: Nodemailer + react-email. Verification, password reset, org invites. Mailpit for dev.
parentPlan: ziron_tap_structure_plan_43dd61bf.plan.md
order: 5
todos: []
---

# Implementation Plan 05: Email

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

`packages/email` — Transport, templates, public API. Wire to auth (verification, reset) and API (org invites). Mailpit in docker-compose.

## Deliverables

- [ ] `packages/email/package.json` — nodemailer, @react-email/components, @react-email/render
- [ ] `src/index.ts` — sendEmail, sendVerificationEmail, sendPasswordResetEmail, sendInviteEmail
- [ ] `src/transport.ts` — Nodemailer from env
- [ ] `src/templates/` — verification.tsx, password-reset.tsx, invite.tsx, layout.tsx
- [ ] Wire `packages/auth` — sendVerificationEmail, sendResetPassword (fire-and-forget)
- [ ] Wire `packages/api` — sendInviteEmail on invite create
- [ ] docker-compose — Mailpit (1025 SMTP, 8025 web UI)
- [ ] Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, APP_URL

## Local Dev

- SMTP_HOST=localhost, SMTP_PORT=1025 (no auth)
- View emails at http://localhost:8025

## Next

→ [06 API](06-api.plan.md)
