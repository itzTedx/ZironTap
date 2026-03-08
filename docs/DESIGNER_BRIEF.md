# ZironTap — UI/UX Designer Brief

A short overview of the product, all services, and where design is needed. No implementation details—focus on screens, flows, and UX.

**Source of truth:** This brief is the design-facing view of the **full project plan** (`.cursor/plans/full-project.plan.md`). Every functionality listed there that touches the user has a corresponding screen, state, or pattern described here so the product can be built with **comprehensive, modern, best-in-class UX in one place**.

---

## What is ZironTap?

ZironTap is a **SaaS platform** where users (and teams) create and manage:

1. **Digital business cards** — Shareable profile pages (photo, name, title, contact, company, links). Often opened by tapping an NFC card.
2. **Short links** — Custom short URLs that redirect to any target URL, with click tracking.
3. **QR codes** — Multi-type QR codes (URL, vCard, WiFi, etc.) with optional logo and colors with password protection.
4. **Review cards** — Pages that collect and display customer reviews (with templates like minimal, stars, thank-you).

All of the above are **organization-scoped**: a user belongs to one or more organizations; cards, links, QR codes, and review cards belong to an organization and are managed inside that org.

---

## The three “apps” (experiences)


| App           | Who uses it               | Purpose                                                                         |
| ------------- | ------------------------- | ------------------------------------------------------------------------------- |
| **Marketing** | Visitors, prospects       | Landing, features, pricing, sign-up / checkout                                  |
| **Client**    | Anyone with a link        | Public view only: view a card, follow a short link, or leave a review           |
| **Portal**    | Logged-in users (per org) | Admin dashboard: create/edit cards, links, QR, reviews; team, billing, settings |


Design work spans all three.

---

## Routes reference (all pages to design)

Use this as the master list. `[orgSlug]` = organization URL slug (e.g. `acme`); `[slug]`, `[shortCode]`, `[id]` = dynamic segments.

### Marketing app


| Route       | Page purpose                 |
| ----------- | ---------------------------- |
| `/`         | Home / landing               |
| `/pricing`  | Pricing, plans, checkout CTA |
| `/features` | Product features             |
| `/about`    | About (optional)             |


### Auth & onboarding (portal or shared)

Design these so they feel part of the same product (tokens, tone). Exact paths may be defined by the auth library (e.g. sign-in, sign-up, forgot-password).


| Context              | Pages to design                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Sign in**          | Email/password; optional “Sign in with Google/Apple”; link to Sign up, Forgot password                                       |
| **Sign up**          | Email, password, optional name; CTA to checkout or to dashboard; link to Sign in                                             |
| **Forgot password**  | Email input; “Send reset link”; success state                                                                                |
| **Verify email**     | “Check your inbox” / “Email verified”                                                                                        |
| **Accept invite**    | Org name, role, “Accept” / “Decline”; success → redirect to org                                                              |
| **Checkout (Polar)** | Handled by Polar; we only need a clear CTA from Pricing or Billing that redirects to Polar and return to `/checkout/success` |


### Client app (public)


| Route            | Page purpose                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/[slug]`        | Digital business card — template-driven (blocks + theme); contact labels (Primary/Work/Personal); full public view        |
| `/r/[shortCode]` | Short-link redirect — minimal “Redirecting…” then redirect; **expired link** shows "This link has expired" (410)          |
| `/review/[slug]` | Review card — title, headline, buttonLabel, primaryColor, template, logo; form + thank-you; optional sign-in for reviewer |


### Portal app — Organization-scoped (`/[orgSlug]/...`)


| Route                          | Page purpose                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `/`                            | Homepage — org switcher, quick actions, upgrade CTA (no org in URL)                                           |
| `/[orgSlug]`                   | Org dashboard — overview, quick create                                                                        |
| `/[orgSlug]/cards`             | Cards — list, search, filters, CSV import/export                                                              |
| `/[orgSlug]/cards/create`      | Create new card                                                                                               |
| `/[orgSlug]/cards/[id]`        | View single card + analytics                                                                                  |
| `/[orgSlug]/cards/[id]/edit`   | Edit card                                                                                                     |
| `/[orgSlug]/cards/tags`        | *Card tags management*                                                                                        |
| `/[orgSlug]/cards/templates`   | Card templates library                                                                                        |
| `/[orgSlug]/cards/analytics`   | Cards section analytics                                                                                       |
| `/[orgSlug]/links`             | Short links — list                                                                                            |
| `/[orgSlug]/links/create`      | Create short link                                                                                             |
| `/[orgSlug]/links/[id]`        | View single link + analytics                                                                                  |
| `/[orgSlug]/links/tags`        | Link tags                                                                                                     |
| `/[orgSlug]/links/analytics`   | Links section analytics                                                                                       |
| `/[orgSlug]/qr`                | QR codes — list                                                                                               |
| `/[orgSlug]/qr/create`         | Create QR (multi-type)                                                                                        |
| `/[orgSlug]/qr/[id]`           | View single QR + analytics                                                                                    |
| `/[orgSlug]/qr/analytics`      | QR section analytics                                                                                          |
| `/[orgSlug]/reviews`           | Review cards — list                                                                                           |
| `/[orgSlug]/reviews/create`    | Create review card                                                                                            |
| `/[orgSlug]/reviews/[id]`      | View single review card + analytics                                                                           |
| `/[orgSlug]/reviews/analytics` | Review cards section analytics                                                                                |
| `/[orgSlug]/media`             | Media library — uploads, grid/list                                                                            |
| `/[orgSlug]/templates`         | Shared templates (cards, QR, reviews)                                                                         |
| `/[orgSlug]/tags`              | Shared tags (cards, links)                                                                                    |
| `/[orgSlug]/analytics`         | Analytics — cross-resource overview                                                                           |
| `/[orgSlug]/analytics/events`  | Analytics — events log                                                                                        |
| `/[orgSlug]/analytics/traffic` | Analytics — traffic (geo, device, referrer)                                                                   |
| `/[orgSlug]/analytics/reports` | Analytics — reports, export, scheduled                                                                        |
| `/[orgSlug]/members`           | Team — members list, invite, remove                                                                           |
| `/[orgSlug]/members/roles`     | Team — roles                                                                                                  |
| `/[orgSlug]/members/invites`   | Team — pending invites                                                                                        |
| `/[orgSlug]/billing`           | Billing — plans, invoices, usage (admin only). Design as one page with tabs/sections: Plans, Invoices, Usage. |
| `/[orgSlug]/settings`          | Org settings                                                                                                  |


### Portal app — Account-level (no org in URL)


| Route                     | Page purpose                   |
| ------------------------- | ------------------------------ |
| `/settings`               | Account — profile, preferences |
| `/settings/security`      | Password, 2FA, passkeys        |
| `/settings/notifications` | Notification preferences       |
| `/settings/api-keys`      | API keys                       |
| `/settings/integrations`  | Integrations                   |
| `/checkout/success`       | Post-payment success           |


### Portal app — Super admin only


| Route                  | Page purpose             |
| ---------------------- | ------------------------ |
| `/admin/organizations` | All organizations        |
| `/admin/users`         | All users                |
| `/admin/logs`          | System logs              |
| `/admin/features`      | Feature flags (optional) |


---

## Portal navigation & sidebar — design target

**Goal:** One place for all navigation. Modern, comprehensive, best-in-class UX with a **dynamic sidebar** (and optional secondary nav) that adapts to the current context — similar in quality and behavior to **dub.sh** and **Vercel’s new dashboard**: clear hierarchy, contextual sub-nav, and minimal cognitive load.

### Principles

- **Single navigation surface** — All primary navigation lives in one sidebar (or equivalent). No competing nav bars or scattered links.
- **Context-aware** — Sidebar content and/or secondary nav **change by route context**: org home vs a service (Cards, Links, QR, Reviews) vs Library vs Analytics vs Team vs Billing vs Settings (org vs account) vs Super admin.
- **URL as source of truth** — Active state and expanded sections are driven by the current path (`/[orgSlug]/cards`, `/[orgSlug]/cards/[id]/edit`, etc.). Navigating updates the sidebar/sub-nav; no “dead” or stale highlights.
- **Progressive disclosure** — Top-level items for main sections; expand or reveal sub-items (list, create, tags, templates, analytics) so the sidebar stays scannable without clutter.
- **Consistency** — Same interaction patterns across services (e.g. each service has List | Create | Tags/Templates | Analytics where applicable).

### Reference quality bar

- **dub.sh** — Clean sidebar, clear service grouping, sub-routes (links, domains, analytics, settings) that feel part of one product; quick actions and search.
- **Vercel dashboard (new)** — Collapsible sidebar, project/team context, dynamic sub-nav per section (Deployments, Analytics, Settings, etc.), command palette (⌘K), top bar with team switcher and notifications.

Aim for this level: comprehensive, modern, and “all in one place” so users always know where they are and where to go next.

### Suggested structure (dynamic by context)

**1. Top bar (global, always visible in portal)**  

- **Org/team switcher** — Dropdown to switch organization (or “No org” on `/`). Current org name/slug visible; selecting updates `[orgSlug]` and all org-scoped routes.
- **Search / command palette (⌘K)** — Quick jump to pages, create card/link/QR/review, search resources. One shortcut for power users.
- **Notifications** — Bell + dropdown (notification center); optional unread badge.
- **User menu** — Avatar + dropdown: Account settings, Security, Billing (if applicable), Sign out. Links to account-level `/settings/`* and optionally org switcher.

**2. Sidebar (primary nav) — content depends on route**

- **When on `/` (no org)**  
  - Focus: org switcher, “Create organization”, “Go to dashboard” (after selecting org). Minimal sidebar or prompt to select org.
- **When on `/[orgSlug]` or any `/[orgSlug]/...` (org context)**  
Sidebar shows **org-scoped** items; current section and sub-routes reflect the URL.
  - **Dashboard** — `/[orgSlug]` (overview, quick create).
  - **Cards** — Group or single entry; when active, **secondary nav or expanded sub-items**: All cards | Create | Tags | Templates | Analytics (each maps to the route).
  - **Short links** — Same pattern: All links | Create | Tags | Analytics.
  - **QR codes** — All QR | Create | Analytics (and Templates if in scope).
  - **Review cards** — All reviews | Create | Analytics (and Templates if in scope).
  - **Library** — Group with: Media | Templates | Tags (shared).
  - **Analytics** — Overview | Events | Traffic | Reports.
  - **Team** — Members | Roles | Invites.
  - **Billing** — Single entry (admin only; hide or disable for Members).
  - **Settings** — Org settings (single or sub: General, Security, etc.).
  **Dynamic behavior:**  
  - For “Cards”, “Links”, “QR”, “Reviews”, the **active sub-item** (e.g. “All cards” vs “Create” vs “Tags”) is determined by the path (`/cards`, `/cards/create`, `/cards/tags`, …).  
  - Optional: when on a detail page (e.g. `/[orgSlug]/cards/[id]`), show a **breadcrumb** (e.g. Cards > [Card name]) and keep “Cards” expanded in the sidebar with “All cards” active.  
  - Same idea for Links, QR, Reviews, Analytics, Team: URL drives which item is active and which group is expanded.
- **When on `/settings` or `/settings/`* (account context)**  
Sidebar (or a dedicated settings layout) shows **account-level** items:  
Profile / Preferences | Security | Notifications | API keys | Integrations.  
Current path drives active state (`/settings`, `/settings/security`, etc.).  
Org switcher can still be in the top bar so the user can jump back to an org.
- **When on `/admin/`* (super admin)**  
Sidebar shows **admin-only** items: Organizations | Users | Logs | Feature flags.  
Clearly separated from normal org/account nav (e.g. different visual treatment or section).

**3. Secondary nav (optional but recommended)**  

- When a section has multiple sub-routes (e.g. Cards, Analytics, Team, Settings), a **horizontal tab-like or pill nav** under the top bar (or below the sidebar header) can show: All | Create | Tags | Templates | Analytics.  
- This “sub-nav” is **dynamic**: it changes per section (Cards vs Links vs Analytics vs Settings). One component, content driven by current `/[orgSlug]/<section>`.

**4. Detail pages (e.g. card/link/QR/review by id)**  

- Breadcrumb: e.g. **Cards > [Card name]** or **Short links > [Link title/code]**.  
- Page title and actions (Edit, Duplicate, Delete, Copy link) clear.  
- Sidebar keeps parent section expanded and “All cards” (or “All links”, etc.) active so going “back to list” is one click.

### Mobile / small viewports

- **Collapsible sidebar** — Drawer or overlay; same structure as desktop so navigation is consistent.  
- Or **bottom nav** for top-level sections (Dashboard, Cards, Links, QR, Reviews, More) with “More” opening Library, Analytics, Team, Billing, Settings.  
- Org switcher and user menu in header; command palette (⌘K) can be a search icon.  
- Sub-routes (Create, Tags, Analytics) available from the open section’s screen (tabs or list).

### Summary for the designer

- **One sidebar** (or one primary nav) for the whole portal; **content is dynamic** by route (org vs account vs admin; and within org by service).  
- **Sub-nav or expandable groups** per section so List / Create / Tags / Templates / Analytics are always one click away and clearly tied to the current service.  
- **Top bar:** org switcher, ⌘K command palette, notifications, user menu.  
- **URL drives state:** active item and expanded group always match the current path.  
- **Aim for dub.sh / Vercel dashboard level:** comprehensive, modern, all-in-one-place navigation with minimal friction.

---

## 1. Marketing app

**Purpose:** Convert visitors into sign-ups and paying customers.

- **Home** — Landing: value proposition, hero, social proof, CTA to sign up or pricing.
- **Features** — What the product does (cards, links, QR, reviews).
- **Pricing** — Plans, comparison, CTA to checkout (e.g. “Get Pro”).
- **About** (optional) — Company story, team, etc.

**Design focus:** Clear hierarchy, trust, strong CTAs, mobile-first. Checkout is handled by Polar (payment provider); we only need a clear path *to* checkout (e.g. button → redirect to Polar).

---

## 2. Client app (public-facing)

**Purpose:** Show content and capture actions. No login required for viewing or submitting a review.


| Page                                     | What it is                                                                                                                                                                                          | Design focus                                                                                                           |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Digital business card** `/[slug]`      | Full card view: profile image, name, title, bio, company, contact (phones/emails can have labels: Primary, Work, Personal), links, attachments. **Template-driven layout** (blocks + theme engine). | First impression, readability, clear CTAs (call, email, open link, save contact). Often viewed on phone after NFC tap. |
| **Short-link redirect** `/r/[shortCode]` | Minimal page that immediately redirects to the target URL. Optional: brief “Redirecting…” or branding.                                                                                              | Fast, minimal; optional branding and loading state.                                                                    |
| **Review card** `/review/[slug]`         | Page that shows the business and invites the visitor to leave a review (form + submit). May show existing reviews and template (minimal, stars, thank-you).                                         | Clear “Leave a review” CTA, simple form, thank-you / success state; template variations (minimal, stars, thank-you).   |


**Design focus:** Speed and clarity; mobile-first (especially for card and review). Templates and themes (colors, fonts) come from a shared theme/template system and should feel consistent with the rest of the product.

---

## 3. Portal app (admin dashboard)

**Purpose:** One place to manage organizations, cards, short links, QR codes, review cards, media, team, billing, and settings.

### 3.1 Global structure

- **Org switcher** — User may have multiple organizations; switching changes the context (all routes below are per-org).
- **Sidebar (per org)** — Main nav: Dashboard, Cards, Short Links, QR Codes, Review Cards, Library (Media, Templates, Tags), Analytics, Team, Billing, Settings.
- **Account-level** — Profile, security, notifications, API keys, integrations (e.g. `/settings`, `/settings/security`).
- **Super admin** (platform admins only) — Organizations list, users list, logs, optional feature flags.

### 3.2 Service areas and key screens

**Dashboard** `/[orgSlug]`  

- Overview: quick stats, recent activity, quick actions (e.g. create card, create link). Optional upgrade CTA for free tier.

**Cards**

- List: cards with search, filters, tags; inline metrics (e.g. views, last 7d). **CSV import/export** — bulk import cards from CSV; export list to CSV.
- Create/Edit: form for all card fields (profile image, cover, name, title, bio, company, phones, emails, links, attachments). **Live preview:** compact inline preview + “Full preview” in a sheet (mobile frame). Image editor for profile/cover (crop, adjust, then upload; optional: paste image URL, Unsplash search).
- Detail: view one card + analytics tab/section (views, clicks, timeline).
- Tags, Templates: manage card tags and choose from card templates.

**Short links**

- List: links with search, filters, tags; inline metrics (clicks, last 7d). Links can have **expiration** (expiresAt); expired links show "This link has expired" (410) on the client.
- Create: target URL, optional short code, **expiration date**, tags.
- Detail: view one link + analytics (clicks, referrers, timeline).
- Tags, Analytics: link tags; section-level analytics.

**QR codes**

- List: QR list with type, label; inline metrics (scans).
- Create: **multi-type** — URL, PDF, socials, file, contact (vCard), plain text, WiFi, map location, NFC. **Customization:** logo, colors, margin, error level. **Layout presets:** square, rounded, with label. Payload inputs depend on type (e.g. WiFi: SSID, password, encryption).
- Detail: view one QR + analytics; optional PDF export.
- Templates, Analytics: QR templates; section-level analytics.

**Review cards**

- List: review cards with slug, review URL; inline metrics (submissions, views).
- Create/Edit: slug, review URL, title, headline, **button label**, template, theme, **primary color**, logo.
- Detail: view one review card + analytics (submissions, timeline).
- Templates, Analytics: review templates; section-level analytics.

**Library**

- **Media** — Uploads (images, files); reuse across cards, QR, review cards. Grid/list, upload dropzone, progress, delete.
- **Templates** — Shared templates for cards, QR, reviews.
- **Tags** — Shared tags for cards and links (name, color).

**Analytics**

- **Global** — Cross-resource: overall views/clicks, top cards/links/QR/reviews, trends, traffic (geo, device, referrer), events, **reports: export + scheduled reports** (e.g. weekly email). Design scheduling UI if scheduled reports are in scope.
- **Contextual** — In each section (e.g. Cards analytics, Links analytics) and on each resource detail (e.g. single card analytics). Same chart types and metric cards for consistency.

**Team**

- **Members** — List members, roles (Admin, Member), invite, remove.
- **Roles** — Role definitions and permissions (if exposed in UI).
- **Invites** — Pending invites, resend, revoke.

**Billing** (admin only)

- **Plans** — current plan, upgrade/change plan CTA. **Invoices** — list and download. **Usage** — usage metrics if shown per plan. Design as one Billing page with clear sections or tabs for Plans | Invoices | Usage. Optional: link to **Polar customer portal** (e.g. "Manage billing" → external) if the product uses it.

**Settings (org)**  

- Org name, slug, security, etc.

**Settings (account)**  

- **Profile** — preferences. **Security** — password, **2FA**, **passkeys**; design these settings screens clearly. **Notifications** — preferences. **API keys** — list, create, revoke. **Integrations** — connected services.

**Post-checkout**  

- Success page after payment (e.g. `/checkout/success`) — thank you, next steps.

### 3.3 Recurring UX patterns (design-relevant)

- **Live preview (cards)** — Inline “sneak peek” (e.g. name, avatar, title) + full preview in a sheet inside a mobile frame; both update as the user types (debounced).
- **Image editor** — Modal for profile (circular, 1:1) and cover (e.g. 1200×630): crop, rotate, flip, adjust (brightness, contrast, etc.), then save → upload. Optional: “Paste image URL” and “Search Unsplash” as image sources.
- **Unsaved changes bar** — When a form is dirty: sticky bar with “Unsaved changes”, “Discard”, “Save”. Clear and accessible.
- **Notifications** — Toast for ephemeral feedback (e.g. “Synced”, “Export ready”). Navbar notification center for things the user may revisit (e.g. “Someone viewed your card”, “New review”, “Export ready” with download link).
- **Progress toasts** — For multi-step flows (e.g. “Processing…”, “Uploading…”, “Done”) so the user knows what’s happening.
- **Lists** — Tables or cards with search, filters, sort; optional tags and inline metrics. **Empty states** per section (cards, links, QR, reviews, media, invites) with CTA (e.g. "Create your first card"). **Loading states**: skeletons or spinners for lists, charts, forms.
- **Forms** — Consistent field layout (label, optional badge, control, error/description). Validation errors: clear, user-friendly messages; optional error modal for bulk validation.
- **Attachments (card form)** — Drag-and-drop + "Browse file"; per-file progress, cancel/edit/delete. JPG, PNG, PDF, DOC/DOCX; max 10 MB. Optional "Import from URL". Design for multiple files in a list.
- **Org limits & upgrade** — When plan or org limit reached: upgrade CTA or "Add organization" → checkout. Design limit-reached states (e.g. disabled Create with message + upgrade button).

### 3.4 Global UX (from full project plan)

- **Page load progress bar** — Thin progress bar at top of viewport on route change (e.g. NProgress-style). Design so it is visible but not distracting.
- **Real-time analytics** — Analytics dashboards receive live updates (no refresh). Design charts and metric counters so they can update in place (e.g. "12 views" → "13 views"); avoid layouts that jump.
- **Offline & sync** — When the user is offline or syncing (cards): show **offline indicator** (e.g. banner or header badge) and **sync status** ("Syncing…" / "Synced") via toast. Design for "back online" and "sync complete" moments.
- **Recent activity (dashboard)** — Dashboard can show an activity feed (e.g. "Jane created a card", "Link x was clicked"). Design a compact, scannable activity list or timeline.
- **Error & not-found states** — **404 / not-found page** for missing cards, links, orgs. **403 Forbidden** when user has no access to org/resource. **Error boundary page** for unexpected failures. **User-facing error messages** for API errors (e.g. "Sign in to continue", "You don't have permission", "This name is already taken", "You've reached your plan limit", "Too many requests — wait a moment and try again") — warm, clear copy per plan; design where these appear (toast, inline, modal).
- **URL-driven list state (nuqs)** — List views (cards, links, QR, reviews) use URL for **filters, pagination, modals** so state is shareable and back button works. Design list UIs so filter/pagination can be reflected in the URL without clutter.

### 3.5 Additional details from full project plan

**Soft delete & recovery**  

- Cards, links, QR, reviews, media use **soft delete** (deleted_at). Enables audit, **recovery, undo**. Design: after delete, show **undo toast** (e.g. "Card deleted" with "Undo"); or a **Trash / Deleted** view with **Restore** and permanent delete. Hard delete runs after retention (e.g. 30 days).

**Conflict resolution (409)**  

- When saving a card (or other entity) and the server has a newer version: API returns **409**. Design **conflict flow** — e.g. "This was updated elsewhere. Refresh to see changes?" with **Refresh** and optionally **Discard your changes** / **Overwrite**.

**PDF export**  

- **Card export** and **QR PDF export** use a PDF worker. Design **export buttons** (e.g. "Export as PDF") and **loading state** while the PDF is generating (can be slow).

**Image editor (detailed)**  

- **Two tabs:** Crop (rotate, flip H/V, zoom, straighten) and **Adjust** (brightness, contrast, saturation, vignette). Modal **~70% cropper / 30% controls**; **Save changes** CTA. Profile: circular, 1080×1080; cover: 1200×630, "4MB max", "Recommended size: 1200 x 630".

**Unsaved changes bar (styling)**  

- Dark bar, rounded corners; **red Discard** button, **blue/purple Save** button (per Figma tokens). Disable Save when submitting.

**Form components (reference)**  

- **Phone input:** Country selector — searchable, **virtualized** list (200+ countries), country name + dial code + flag. Output E.164.  
- **Contact labels** on card: **Primary, Work, Personal** for phones and emails.  
- Form set includes: input, textarea, **phone**, attachments, **color-picker**, **date-picker**, select, popover, **switch**, **toggle**, checkbox, **radio**, **radio-card**. Use where needed (e.g. theme color → color picker; date → date-picker).

**Invite expired**  

- Invites have **expiresAt**. When invite is expired or invalid: design **expired-invite state** on the accept-invite page ("This invite has expired" or "Invalid invite").

**Create organization**  

- When user has **no orgs**: empty state with **Create organization** CTA. When at **org limit**: "Add organization" → checkout (upgrade or add-on). Design both flows.

**Optional: QR/barcode scan (react-scan)**  

- If the product exposes **QR or barcode scanning**: camera view, scan overlay, result. Design as optional feature (e.g. "Scan QR" in portal).

**Optional: Audit / activity log**  

- Sensitive actions (role changes, billing, org delete, invite accept) are logged. Optional **audit log** or activity view (e.g. under Settings or Team) for admins to see who did what.

**Optional: Feature flags (super admin)**  

- Super admin may have a **Feature flags** page to enable/disable risky features (e.g. new QR types). Design toggles or list if in scope.

**Optional: PDF Compressor (attachments)**  

- For attachments: optional "PDF Compressor" or similar **helper link** so users can compress PDFs before upload (external or in-app).

**List virtualization**  

- When a list has many rows (e.g. 50+), the app uses **virtualized** lists (e.g. for cards, links, QR, reviews, country selector). Design list/table layouts so they work with virtualization (e.g. consistent row height or variable height handled by the component).

---

## Design tokens and theming

- **Source of truth:** Figma. We use a three-tier token system: **primitives** (raw values), **mapping** (semantic, e.g. primary, surface), **component-level** (e.g. button.primary.background).
- **Output:** Tokens are exported (e.g. Tokens Studio / Style Dictionary / Figma Variables) to JSON, then turned into CSS variables and Tailwind theme so the UI package (shadcn + Base UI) stays in sync with Figma.
- **Dark mode:** Supported; semantic tokens switch for light/dark.
- **Templates/themes:** Business cards and review cards use templates and themes (colors, fonts) driven by this system; public client pages and portal previews should feel consistent.

---

## Roles (for UI copy and access)

- **Super admin** — Platform-wide; sees admin routes (organizations, users, logs).
- **Admin** (per org) — Full org access: cards, links, QR, reviews, media, members, billing, settings.
- **Member** (per org) — Can manage cards, links, QR, reviews, media; no billing, no member management.

Design should make it clear who can do what (e.g. disable or hide billing for Members, show “Admin only” where needed).

---

## Summary checklist for design

Use the **Routes reference** above to ensure every route has a designed page. In addition:

- **Marketing:** Home, Features, Pricing, About; CTAs to sign-up and checkout.
- **Client:** Card view, short-link redirect, review card (view + submit form + thank-you); all mobile-friendly.
- **Portal:** Navigation per **Portal navigation & sidebar** (one place, dynamic by route, dub.sh/Vercel-level): sidebar + top bar (org switcher, ⌘K, notifications, user menu), contextual sub-nav per section, breadcrumbs on detail pages, mobile drawer/bottom nav.
- **Portal:** Library (Media, Templates, Tags); Global + contextual Analytics; Team (Members, Invites); Billing; Org and account Settings; Checkout success.
- **Patterns:** Live preview (inline + sheet), image editor (incl. URL/Unsplash), unsaved-changes bar, toasts + notification center (toast vs navbar per event type), progress toasts, attachments UI, org-limit/upgrade states, form error modal.
- **Global UX:** Page load progress bar, real-time analytics (live-updating counters/charts), offline/sync indicator and toasts, dashboard activity feed, 404/error pages and user-facing error copy.
- **Auth & onboarding:** Sign in, Sign up, Forgot password, Verify email, Accept invite (incl. expired-invite state); checkout success.
- **Client details:** Expired short-link state (410); review card primaryColor, buttonLabel; optional sign-in for reviewer; card contact labels (Primary/Work/Personal); template-driven blocks + theme.
- **Portal details:** URL-driven list state (nuqs: filters, pagination); soft delete + undo/Trash/Restore; 409 conflict flow; PDF export + loading; image editor (Crop + Adjust tabs, 70/30 layout); unsaved bar (red Discard, blue Save); phone + country selector (virtualized); form components (color, date, switch, radio-card, etc.); create org + org-limit flows; 403 + rate-limit copy; scheduled reports; Polar portal link; optional: scan UI, audit log, feature flags, PDF Compressor link.
- **Tokens:** Figma primitives → mapping → component tokens; dark mode; consistency with card/review templates.

**Best solution (in one place):** One portal navigation (dynamic sidebar + top bar, dub.sh/Vercel-level). All routes and features from the full project plan covered: marketing, auth, client (card, redirect, review), portal (dashboard, cards with CSV, links, QR multi-type, reviews, library, analytics global + contextual, team, billing Plans/Invoices/Usage, org + account settings), super admin, checkout success. Recurring patterns (live preview, image editor, unsaved bar, toast vs navbar, progress toasts, attachments, org limits, error modal) and global UX (progress bar, real-time analytics, offline/sync, activity feed, error/404 and friendly error copy) are specified so the product is comprehensive, modern, and consistent.

Use this brief as the single reference for scope: all four services (digital business cards, short links, QR codes, review cards) and all three apps (marketing, client, portal) are in scope for UI/UX design. It is aligned with the full project plan so that every planned functionality that touches the user has a corresponding design target.