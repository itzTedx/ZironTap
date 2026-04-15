# ZironTap — phased focus list

**Current implementation order:** finish the **digital business card** vertical end-to-end (Phases 0–8 below) before touching QR codes, short links, review cards, or other product surfaces. Those stay in Phase 10 until cards are solid in portal + public client + media + optional sync.

Use one phase at a time. Check items when done. Deeper detail lives in `.cursor/plans/` (especially `full-project.plan.md`, `roadmap.md`, `02-db.plan.md`, `04-auth.plan.md`, `06-api.plan.md`, `12-apps.plan.md`).

**Product north star (from `roadmap.md`):** v1 = digital business cards only; portal manages cards; public client is view-only online; optional portal offline sync for cards with `version` + 409 on conflict.

---

## Digital card (v1) — implement this first

Phases 0 through 8. No parallel work on QR, `review_cards`, or `/r/[shortCode]` until this block is in good shape.

---

## Phase 0 — Dev environment and repo hygiene

- [x] `docker-compose.yml`: Postgres + Valkey (or Redis) run cleanly; document ports in `.env.example` if missing.
- [ ] Root `.env.example` lists all required vars for portal + db + auth.
- [x] `pnpm install` / `pnpm dev` (portal) verified from clean clone.
- [x] Align root `README.md` with ZironTap (replace generic shadcn template text); link to `AGENTS.md` and `plans/`.
- [x] `.gitignore` excludes `.next/`, local env files, and build artifacts (avoid committing `apps/portal/.next`).

---

## Phase 1 — Database and migrations (v1 scope)

- [x] Drizzle schema complete for **v1**: organizations, members, org-scoped **cards** (include `version` or equivalent for optimistic concurrency per roadmap).
- [x] Auth-related tables aligned with Better Auth + org plugin (`04-auth.plan.md`, `packages/db/src/schema/auth.ts`).
- [x] Migrations generated and applied (`pnpm db:generate` / `pnpm db:migrate`).
- [x] `packages/db`: exports and `drizzle.config.ts` paths stay consistent across apps.

---

## Phase 2 — Validators single source of truth

- [x] Zod schemas in `@ziron/validators` for card create/update/list filters (match DB fields).
- [ ] Wire validators into oRPC inputs/outputs (`03-validators.plan.md`); no duplicated inline schemas in routers long-term.

---

## Phase 3 — Auth, sessions, and org context

- [x] Better Auth: email/password + intended OAuth/passkeys per product spec.
- [x] Session store on Valkey/Redis where planned (`roadmap.md`).
- [ ] Organization plugin: create/join org, roles; portal can resolve **current org** for RPC and routes.
- [ ] Replace or tighten `publicProcedure` on sensitive routes (`packages/api` middleware: `require-auth`, org scoping).

---

## Phase 4 — oRPC API: cards (portal-facing)

- [ ] Card procedures: list, get by id/slug, create, update, delete (soft-delete if schema uses it).
- [ ] All card mutations org-scoped and role-checked.
- [ ] Remove placeholder `createCard` test values (`name: "test"`) and use real input + validators.
- [ ] Optional: OpenAPI or internal docs for procedures (`06-api.plan.md`).

---

## Phase 5 — Portal: org routes and cards feature shell

- [ ] App Router structure: `/[orgSlug]/...` layout and guards (see `portal-folder-structure.plan.md`).
- [ ] Cards routes: list + editor entry points (you own layout; scaffold data fetching + forms only per project rules).
- [ ] Media library linked to org/card where applicable (upload flow already exists under `(root)/media` — align with org model).

---

## Phase 6 — `apps/client` (public card)

- [ ] Add `apps/client` Next app (`12-apps.plan.md`, `00-project-structure-packages.plan.md`).
- [ ] Route `src/app/[slug]/page.tsx`: load published card by slug; template-driven render (`11-templates.plan.md` when package exists).
- [ ] Minimal analytics hook or stub for `trackView` (full analytics package can wait until v2 scope).

---

## Phase 7 — Media package hardening

- [ ] `@ziron/media`: WebP, thumbnails, size limits integrated with upload pipeline (`07-media.plan.md`, `08-image-editor-better-upload.plan.md`).
- [ ] Portal upload API + RPC list/upload aligned with processed asset records (`packages/api/src/routers/media.ts`).

---

## Phase 8 — Offline sync (portal, cards only — v1)

- [ ] Add `@ziron/sync` (or agreed package): IndexedDB + outbox queue.
- [ ] Sync mutations with server; handle 409 on `version` mismatch (`roadmap.md`).
- [ ] UX hooks only — no version history table until v3.

---

## Phase 9 — Marketing app and billing (when v1 core is stable)

- [ ] Add `apps/marketing` with landing + pricing.
- [ ] Polar checkout CTA wired through Better Auth plugin (`auth` package + env).

---

## Phase 10 — After digital cards (QR, reviews, links, jobs)

**Do not start until Phases 0–8 are acceptable for cards.** This is everything that is not the core card loop.

- [ ] **QR codes** — `@ziron/qr`, portal + client surfaces (`09-qr.plan.md`).
- [ ] **Review cards** — schema, API, portal, `apps/client` `/review/[slug]`.
- [ ] **Short links** — `apps/client` `/r/[shortCode]` (and related DB if not already present).
- [ ] New or expanded packages as needed: `@ziron/analytics`, `@ziron/jobs` (Inngest), `@ziron/rate-limit` (some may already exist; wire them here, not during v1 card-only work unless unavoidable).
- [ ] Background jobs (`13-inngest.plan.md`).

---

## Quick reference — plans by topic

| Topic        | Plan file                    |
| ------------ | ---------------------------- |
| Monorepo     | `01-scaffold.plan.md`, `00-…` |
| DB           | `02-db.plan.md`              |
| Validators   | `03-validators.plan.md`      |
| Auth         | `04-auth.plan.md`          |
| Email        | `05-email.plan.md`           |
| API          | `06-api.plan.md`           |
| Media        | `07-media.plan.md`         |
| Image editor | `08-…plan.md`              |
| QR           | `09-qr.plan.md`            |
| Analytics    | `10-analytics.plan.md`     |
| Templates    | `11-templates.plan.md`     |
| Apps         | `12-apps.plan.md`          |
| Inngest      | `13-inngest.plan.md`       |

---

*Last structured from repo state: single app `apps/portal`; `packages/api` exposes minimal `card.create` + `media`; DB exports `auth`, `card`, `media`. Focus: digital card first; defer QR, reviews, short links to Phase 10.*
