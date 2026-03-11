---
name: 03 Validators
overview: Zod schemas — primitives, card, short-link, review, qr, analytics. Single source for API + forms.
todos: []
isProject: false
---

# Implementation Plan 03: Validators

**Parent:** [full-project.plan.md](full-project.plan.md) — §3.9.1 packages/validators

**Related:** [02 DB](02-db.plan.md) (schemas align with DB columns); [06 API](06-api.plan.md) (oRPC .input(schema)); [12 Apps](12-apps.plan.md) (forms use same schemas)

## Scope

`packages/validators` — Zod schemas for all domains. Used by oRPC, forms (@tanstack/zod-form-adapter), and DB runtime validation.

## Deliverables

- `packages/validators/package.json`, `tsconfig.json`
- `src/primitives/` — slug, shortCode, email, url, uuid, pagination, labelEnum
- `src/card/` — appearanceSchema, phonesSchema, emailsSchema, linksSchema, cardSchema, attachmentsSchema; create/update variants (update includes `version` for optimistic concurrency; API returns 409 if mismatch)
- `src/short-link/` — create, update, redirect params
- `src/review/` — review card, review submission
- `src/qr/` — QR payload types, customization
- `src/analytics/` — event payloads, date range, filters
- `src/common/` — orgId, userId, dateRange, list params
- `src/index.ts` — barrel export

## Patterns

- Export schema + type: `export const cardSchema = z.object({...}); export type Card = z.infer<typeof cardSchema>`
- Custom error messages for form validation
- API input: `.strict()` for procedures
- Same schema for API + forms (no duplication)

## Next

→ [04 Auth](04-auth.plan.md)