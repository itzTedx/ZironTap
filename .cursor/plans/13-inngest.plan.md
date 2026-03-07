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

**Parent plan:** [ziron_tap_structure_plan_43dd61bf.plan.md](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

**Prerequisites:** Plan 6 (API), Plan 12 (Portal)

---

## Scope

- `packages/jobs` — Generic job package; Inngest adapter
- Serve from portal at `/api/inngest` or `/api/jobs`
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

1. **Adapter** — Create Inngest adapter in packages/jobs
2. **Serve** — Mount handler in portal; configure Inngest dev server for local
3. **Functions** — Define jobs (soft delete, export, GeoIP, post-upload, etc.)
4. **Trigger** — Wire from API procedures, webhooks, portal UI

