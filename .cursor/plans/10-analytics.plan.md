---
name: Analytics Package
overview: Implement packages/analytics for clicks, views, events with DB persistence and real-time SSE. Integrates with oRPC Event Iterator for live dashboards.
todos:
  - id: track
    content: Implement track.ts (trackClick, trackView, trackEvent)
  - id: query
    content: Implement query.ts for aggregations by link/card/QR
  - id: umami
    content: Optional Umami/Plausible integration in umami.ts
  - id: sse-publish
    content: Publish to org channel on track for SSE
isProject: false
---

# Implementation Plan 10: Analytics Package

**Parent plan:** [ziron_tap_structure_plan_43dd61bf.plan.md](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

**Prerequisites:** Plan 2 (DB schema for analytics_events), Plan 6 (API, notifications publisher)

---

## Scope

- `trackClick`, `trackView`, `trackEvent` — persist to analytics_events
- Publish to `org:{orgId}:notifications` for SSE (live dashboard updates)
- Query aggregations by link/card/QR
- Optional Umami/Plausible integration

---

## Key Files

| File | Purpose |
|------|---------|
| `packages/analytics/src/track.ts` | trackClick, trackView, trackEvent |
| `packages/analytics/src/query.ts` | Aggregations by entity |
| `packages/analytics/src/umami.ts` | Optional Umami integration |

---

## Implementation Steps

1. **Track** — Insert into analytics_events; batch inserts (buffer 100ms) where possible
2. **Publish** — On each track, publish to org channel for SSE
3. **Query** — Aggregations for dashboards; use analytics_daily_summary for scale
4. **Umami** — Optional integration if desired
