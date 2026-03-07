---
name: Apps (Marketing, Client, Portal)
overview: Implement the three Next.js apps — marketing (minimal), client (public routes), portal (dashboard with org-scoped layout). Includes providers, routing, and shell pages.
todos:
  - id: marketing
    content: Create apps/marketing with landing, pricing, features
    status: pending
  - id: client
    content: Create apps/client with [slug], r/[shortCode], review/[slug]
    status: pending
  - id: portal-scaffold
    content: Create apps/portal with [orgSlug] layout and routes
    status: pending
  - id: providers
    content: Add app-level providers (theme, nuqs, jotai, tanstack, etc.)
    status: pending
  - id: shell-pages
    content: Create shell pages/layouts (user designs UI)
    status: pending
isProject: false
---

# Implementation Plan 12: Apps (Marketing, Client, Portal)

**Parent plan:** [ziron_tap_structure_plan_43dd61bf.plan.md](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

**Prerequisites:** Plans 1–11 (all packages)

---

## Scope

- **Marketing** — Landing, pricing (Polar CTA), features, about
- **Client** — Public card page, short-link redirect, review page
- **Portal** — Dashboard with [orgSlug] layout; org-scoped and global routes; providers

---

## Key Routes

### Marketing

- `/` — Homepage
- `/(marketing)/pricing` — Pricing tiers, CTA
- `/(marketing)/features`, `/(marketing)/about`

### Client

- `/[slug]` — Digital business card
- `/r/[shortCode]` — Redirect + analytics
- `/review/[slug]` — Review card page

### Portal

- `/` — Org switcher, quick actions
- `/[orgSlug]` — Dashboard
- `/[orgSlug]/cards`, `/links`, `/qr`, `/reviews`, `/media`, `/members`, `/billing`, `/settings`
- `/settings` — Account-level
- `/admin/`* — Super admin

---

## Implementation Steps

1. **Marketing** — Minimal shell; pricing page with Polar checkout CTA
2. **Client** — Routes; card/review render using templates; redirect handler
3. **Portal** — [orgSlug] layout; sidebar; route scaffolding; providers (theme, nuqs, jotai, tanstack, page-load-progress, keyboard-shortcut, analytics, pdf-worker)
4. **Shell pages** — Placeholders; user designs UI per conventions

