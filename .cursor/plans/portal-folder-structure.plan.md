---
name: Portal folder structure
overview: Production-grade portal app structure with features (or modules) folder, thin app routes, shared layout, and a defined auth feature layout (views, forms, other components).
todos: []
isProject: false
---

# Portal app — folder structure (production-grade)

## 1. Top-level layout

```
apps/portal/src/
├── app/                    # Routes only — thin pages that delegate to features
├── features/               # Domain/feature modules (auth, dashboard, cards, links, …)
├── components/             # Shared UI: layout (header, sidebar), providers
├── lib/                    # Shared infra: orpc, auth client, env, utils
├── hooks/                  # Shared hooks (optional; feature hooks live in features)
├── providers/              # App-level providers (optional; or keep under components)
└── types/                  # Global app types only (prefer validators + feature types)
```

---

## 2. App router (`app/`) — thin routes

- `**(auth)/login/page.tsx**` → `<LoginView />` from features/auth
- `**(auth)/register/page.tsx**` → `<RegisterView />` from features/auth
- `**(dashboard)/[orgSlug]/layout.tsx**` → uses `components/layout` (header + sidebar)
- `**(dashboard)/[orgSlug]/page.tsx**` → feature dashboard overview
- `**(dashboard)/[orgSlug]/cards/**`, **links/**, **qr/**, etc. → each route imports from the matching feature (e.g. `features/cards`)

---

## 3. Features folder — per-feature structure

Each feature can have: **components/** (with optional **forms/**), **views/**, **hooks/**, **api.ts**, **constants.ts**, **index.ts**.

### 3.1 Auth feature — views, forms, and other components

Auth is structured with **views** (page-level composition), **forms** (form-only UI), and **other components** (shared auth UI like card wrapper, error display).

```
features/auth/
├── components/
│   ├── forms/                    # Form UIs + validation (TanStack Form + validators)
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── forgot-password-form.tsx
│   ├── auth-card.tsx             # Optional: shared wrapper (card + logo/title area)
│   └── auth-error.tsx            # Optional: shared error/status message
├── views/                        # Page-level compositions (what the route renders)
│   ├── login-view.tsx
│   ├── register-view.tsx
│   └── forgot-password-view.tsx
├── hooks/                        # Optional
│   └── use-auth-session.ts
├── constants.ts                  # Optional: redirect paths, copy, etc.
└── index.ts                      # Barrel: export views + public components/hooks
```

**Roles:**


| Layer                   | Role                                                                                                                        | Consumed by                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **views/**              | Full screen for the route: layout, form, cross-links (e.g. “Sign in” / “Create account”). No route logic, only composition. | `app/(auth)/login/page.tsx` → `<LoginView />`, same for register, forgot-password |
| **components/forms/**   | Form only: fields, validation, submit handler. Reusable (e.g. in modals or other flows).                                    | Views (and any other consumer)                                                    |
| **components/** (other) | Shared auth UI: card wrapper, error display, “Continue with Google” block.                                                  | Views and/or forms                                                                |


**Flow:**

- **Page** stays thin: `app/(auth)/register/page.tsx` → `<RegisterView />`.
- **View** composes layout (e.g. `AuthCard`) + form + links. Example: `RegisterView` → `<AuthCard title="Create account"><RegisterForm /><Link to="/login">Sign in</Link></AuthCard>`.
- **Form** is only the form: inputs, validation, submit, loading/error. Uses TanStack Form + `@ziron/validators` and auth client on submit.

**Barrel (`features/auth/index.ts`):**

Export only what app routes (and other features) need:

```ts
export { LoginView, RegisterView, ForgotPasswordView } from './views';
export { LoginForm, RegisterForm, ForgotPasswordForm } from './components/forms';
// Optional: useAuthSession, AuthCard, AuthError if used outside the feature
```

Then `app/(auth)/login/page.tsx` can do: `import { LoginView } from '@/features/auth';`

### 3.2 Other features (cards, links, dashboard, etc.)

Same pattern: **components/** (optionally **components/forms/** or **pages/**), **hooks/**, **api.ts**, **index.ts**. Use **views/** only where a feature has full-page screens that benefit from a dedicated composition layer (e.g. auth). For list/detail/create, **pages/** under the feature is an alternative (e.g. `features/cards/pages/list-page.tsx`).

---

## 4. Shared components (`components/`)

- **layout/** — header, sidebar, org-switcher, sidebar-nav. Used by `app/(dashboard)/[orgSlug]/layout.tsx`.
- **theme-provider.tsx**, **providers.tsx** (or **providers/**) — app-wide.

---

## 5. Naming and conventions


| Item           | Convention | Example                                   |
| -------------- | ---------- | ----------------------------------------- |
| Feature folder | kebab-case | `features/auth/`, `features/short-links/` |
| Views          | *-view.tsx | `login-view.tsx`, `register-view.tsx`     |
| Forms          | *-form.tsx | `login-form.tsx`, `register-form.tsx`     |
| Barrel         | index.ts   | Export public API only                    |


---

## 6. Summary

- **Routes:** `app/` — thin; each auth page renders a single view from `features/auth`.
- **Auth feature:** **views/** (page composition), **components/forms/** (forms), **components/** (auth-card, auth-error), **hooks/**, **index.ts**.
- **Other features:** Same idea; add **views/** only when a feature has full-page screens that warrant it.

