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

**Parent plan:** [full-project.plan.md](full-project.plan.md) — §2 Apps Breakdown, §2.3 portal (providers, routing, sidebar), §7 Key File Locations

**Prerequisites:** Plans 01–11 (all packages); [13 Inngest](13-inngest.plan.md) mounts job handler in portal

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
- `/[orgSlug]/cards`, `/[orgSlug]/links`, `/[orgSlug]/qr`, `/[orgSlug]/reviews`, `/[orgSlug]/media`, `/[orgSlug]/members`, `/[orgSlug]/billing`, `/[orgSlug]/settings`
- `/settings` — Account-level (profile, security, notifications, api-keys)
- `/admin/organizations`, `/admin/users`, `/admin/logs` — Super admin only

---

## Implementation Steps

1. **Marketing** — Minimal shell; pricing page with Polar checkout CTA
2. **Client** — Routes; card/review render using templates; redirect handler
3. **Portal** — [orgSlug] layout; sidebar; route scaffolding; providers per full-project §2.3: theme-provider, nuqs-provider, jotai-provider, tanstack-provider, page-load-progress-provider, keyboard-shortcut-provider, analytics-provider, pdf-worker-provider (optional: react-scan-provider)
4. **Shell pages** — Placeholders; user designs UI per conventions
5. **Inngest** — Mount jobs handler at `apps/portal/src/app/api/inngest/route.ts` per [13 Inngest](13-inngest.plan.md) and full-project §13

