---
name: 03 Validators
overview: Zod schemas — primitives, card, short-link, review, qr, analytics. Single source for API + forms.
parentPlan: ziron_tap_structure_plan_43dd61bf.plan.md
order: 3
todos: []
---

# Implementation Plan 03: Validators

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

`packages/validators` — Zod schemas for all domains. Used by oRPC, forms (@tanstack/zod-form-adapter), and DB runtime validation.

## Deliverables

- [ ] `packages/validators/package.json`, `tsconfig.json`
- [ ] `src/primitives/` — slug, shortCode, email, url, uuid, pagination, labelEnum
- [ ] `src/card/` — appearanceSchema, phonesSchema, emailsSchema, linksSchema, cardSchema, attachmentsSchema; create/update variants
- [ ] `src/short-link/` — create, update, redirect params
- [ ] `src/review/` — review card, review submission
- [ ] `src/qr/` — QR payload types, customization
- [ ] `src/analytics/` — event payloads, date range, filters
- [ ] `src/common/` — orgId, userId, dateRange, list params
- [ ] `src/index.ts` — barrel export

## Patterns

- Export schema + type: `export const cardSchema = z.object({...}); export type Card = z.infer<typeof cardSchema>`
- Custom error messages for form validation
- API input: `.strict()` for procedures
- Same schema for API + forms (no duplication)

## Next

→ [04 Auth](04-auth.plan.md)
