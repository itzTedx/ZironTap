---
name: Inngest Background Jobs
overview: Add Inngest (or swappable job adapter) for background jobs — soft delete, exports, GeoIP, post-upload, Polar follow-up, cache invalidation. Served from portal.
todos:
  - id: inngest-serve
    content: Mount Inngest handler in portal at /api/inngest
    status: pending
  - id: job-functions
    content: Create job definitions (soft delete, exports, GeoIP, post-upload, etc.)
    status: pending
  - id: adapter
    content: Implement packages/jobs with Inngest adapter
    status: pending
isProject: false
---

# Implementation Plan 13: Inngest Background Jobs

**Parent plan:** [full-project.plan.md](full-project.plan.md) — §3.10 packages/jobs, §13 Open Questions (Inngest placement resolved)

**Prerequisites:** [06 API](06-api.plan.md) (procedures trigger jobs via client), [12 Apps](12-apps.plan.md) (portal mounts handler)

**Resolved (per full-project §13):** Serve the Inngest HTTP worker from **apps/portal** only. Mount `packages/jobs` handler at `apps/portal/src/app/api/inngest/route.ts`. Portal and API both trigger jobs by calling `@ziron/jobs` client; no worker in API.

---

## Scope

- `packages/jobs` — Generic job package; Inngest adapter
- **Serve from portal only** at `apps/portal/src/app/api/inngest/route.ts` (or `/api/jobs`)
- Job functions: soft delete, exports, GeoIP, post-upload, Polar follow-up, cache invalidation

---

## Key Files


| File                                    | Purpose                  |
| --------------------------------------- | ------------------------ |
| `packages/jobs/src/client.ts`           | Job client export        |
| `packages/jobs/src/serve.ts`            | HTTP handler for workers |
| `packages/jobs/src/functions/`          | Job definitions          |
| `packages/jobs/src/adapters/inngest.ts` | Inngest implementation   |


---

## Implementation Steps

1. **Adapter** — Create Inngest adapter in packages/jobs (`src/adapters/inngest.ts`)
2. **Serve** — Mount handler in **portal** at `apps/portal/src/app/api/inngest/route.ts`; configure Inngest dev server for local
3. **Functions** — Define jobs in `packages/jobs/src/functions/` (soft delete, export, GeoIP, post-upload, etc.)
4. **Trigger** — Wire from API procedures (e.g. trackView → aggregation job), webhooks (Polar), portal UI (export, delete)

