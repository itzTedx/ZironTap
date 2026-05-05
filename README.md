# 🚀 ZironTap

![ZironTap Hero](./docs/zirontap_hero.png)

ZironTap is an all-in-one **Growth & Online Presence Platform** built to help marketing companies and their clients scale. It empowers businesses to capture leads, collect reviews, and drive offline-to-online growth through digital business cards, smart URLs, and dynamic QR codes.

---

## 🎯 Value for Marketing Clients & Platform Capabilities

-   🧲 **Lead Capture & Digital Profiles**: Instantly exchange contact info and capture new leads with highly customizable, shareable digital business cards.
-   ⭐️ **Review Collection & Reputation**: Build unshakeable social proof by easily collecting and displaying verified customer reviews.
-   🚀 **Growth & Analytics Tracking**: Drive offline traffic online and measure real-time engagement using branded short links, dynamic QR codes, and comprehensive analytics tracking.
-   🌍 **Enhanced Online Presence**: Consolidate a client's digital footprint into professional, high-converting landing pages.
-   🎨 **Modern UI & Template System**: Enjoy a fully revamped, visually stunning UI. Includes a robust template system with customization (Custom template builder coming soon).
-   💳 **NFC Card Ordering**: Seamlessly order physical NFC cards. Choose a pre-made design, request a custom design, or upload your own artwork (guidelines provided for .ai, .psd, canva, .jpg).
-   🏢 **Agency & Dynamic Billing**: Manage multiple client workspaces securely with organization-scoped access control and an organization-based dynamic payment system enforcing usage limitations.
-   🔒 **Local-First & Privacy Focused**: Robust local-first architecture ensuring privacy and offline access.
-   ⚙️ **Advanced Background Queuing**: Powerful job queuing system handling automatic image optimization, monthly reports, pushing offline changes to the database when reconnected, file security checking, and more.

---

# 🧱 Core Architecture

| Tech | Description | Usage |
|------|------------|------|
| Turborepo | Monorepo build system | Manages apps and shared packages |
| pnpm Workspaces | Fast package manager | Dependency management |
| TypeScript | Strong typing | End-to-end type safety |
| Next.js (App Router) | Fullstack framework | Frontend + backend rendering |

---

# 🎨 Frontend & UI

| Tech | Description | Usage |
|------|------------|------|
| React 19 | UI library | Core rendering |
| Tailwind CSS | Utility CSS | Styling system |
| shadcn/ui | Component library | Design system |
| Framer Motion / motion | Animation library | UI animations |
| Jotai | State management | Lightweight global state |
| TanStack React Query | Data fetching | API caching & sync |
| TanStack Form | Form management | Complex forms |
| Zod | Validation | Forms + API schemas |
| react-dropzone | File upload UI | Upload media/assets |
| maplibre-gl | Maps | Location features |
| next-themes | Theme system | Dark/light mode |
| Icon Libraries | Icons | Phosphor, Lucide, Tabler |

---

# 🔌 Backend & API Layer

| Tech | Description | Usage |
|------|------------|------|
| oRPC | Type-safe RPC | Client-server communication |
| @orpc/client/server | RPC tools | API integration |
| @orpc/openapi | API docs | OpenAPI generation |
| @orpc/tanstack-query | Integration layer | API + React Query |
| @orpc/zod | Validation | Schema enforcement |

---

# 🗄️ Database & Storage

| Tech | Description | Usage |
|------|------------|------|
| PostgreSQL | Database | Core data storage |
| Drizzle ORM | ORM | Type-safe queries |
| pg | DB driver | PostgreSQL connection |
| Redis | In-memory store | Cache, queues, rate limit |

---

# 🔐 Authentication & Security

| Tech | Description | Usage |
|------|------------|------|
| Better Auth | Auth system | Login, OAuth, org auth |
| @better-auth/api-key | API auth | Secure API access |
| @better-auth/passkey | Passwordless auth | WebAuthn login |
| @better-auth/drizzle-adapter | Adapter | Connect auth to DB |
| Zod | Validation | Input protection |

---

# 📁 File Upload & Media

| Tech | Description | Usage |
|------|------------|------|
| @better-upload/client/server | Upload system | File uploads |
| react-email | Email templates | UI email design |
| nodemailer | Email sending | SMTP delivery |
| Custom media package | Image processing | WebP, thumbnails |

---

# 📊 Logging & Monitoring

| Tech | Description | Usage |
|------|------------|------|
| Winston | Logging | Structured logs |
| @ziron/logger | Internal logger | Centralized logging |

---

# 🧩 Internal Packages

| Package | Description | Usage |
|--------|------------|------|
| @ziron/api | API layer | Business logic |
| @ziron/auth | Auth config | Authentication logic |
| @ziron/db | Database | Schema & queries |
| @ziron/ui | UI system | Components |
| @ziron/validators | Validation | Shared schemas |
| @ziron/env | Env config | Type-safe env |
| @ziron/cache | Cache utils | Redis abstraction |
| @ziron/email | Email system | Templates + sending |

---

# 🛠️ Dev Tooling

| Tech | Description | Usage |
|------|------------|------|
| Biome | Lint + format | Code quality |
| Husky | Git hooks | Pre-commit checks |
| lint-staged | Staged linting | Faster checks |
| Commitlint | Commit rules | Standard messages |
| Changesets | Versioning | Releases & changelog |
| Knip | Cleanup tool | Remove unused code |
| Syncpack | Dependency tool | Version consistency |
| dotenv-cli | Env loader | Manage env variables |

---

# 🚀 Phase 2 & Advanced Features

## ⚙️ Background Jobs & Automation

| Feature | Tech | Purpose |
|--------|------|--------|
| Background jobs | Inngest | Async workflows |
| Image optimization | Workers | Auto compression |
| Image resizing | Workers | Thumbnails |
| PDF generation | Future (Puppeteer) | Export data |
| Monthly reports | Cron jobs | Automated insights |
| File scanning | Workers | Security checks |

---

## 🤖 AI Features

| Feature | Purpose |
|--------|--------|
| AI bio generation | Auto profile creation |
| Smart suggestions | Improve user inputs |
| Content recommendations | Enhance UX |

---

## 🧑‍💼 Product Features

| Feature | Description |
|--------|------------|
| Local-first sync (Zero) | Offline access + sync |
| Organization billing | Usage-based pricing |
| NFC card ordering | Physical product system |
| Custom design uploads | Supports AI, PSD, JPG, Canva |
| Analytics tracking | Engagement insights |
| Template system | Customizable layouts |
| Template builder (future) | Drag-and-drop builder |

---

## 📈 Scalability & Future-Proofing

| Feature | Purpose |
|--------|--------|
| Import / Export | Data portability |
| Multi-tenant system | Org-based isolation |
| RBAC (future) | Permissions system |
| Offline sync engine | Real-time sync |
| Queue architecture | Scalable processing |
| White-label support | Agency branding |

---

# 💡 Summary

ZironTap is built as a **modern SaaS platform** with:

- ⚡ Full type safety (TypeScript + Zod + oRPC)
- 🧠 AI-powered enhancements
- 🔄 Offline-first architecture
- 🏢 Multi-tenant system
- ⚙️ Background job processing
---

## 📂 Project Structure

```text
.
├── apps
│   ├── portal         # Admin dashboard for managing all resources
│   ├── client         # Public-facing pages (cards, redirects, reviews)
│   └── marketing      # Landing pages and pricing
├── packages
│   ├── api            # oRPC routers and procedures
│   ├── auth           # Authentication logic and Better Auth config
│   ├── db             # Drizzle schema and migrations
│   ├── ui             # Shared UI components (shadcn/ui)
│   ├── validators     # Shared Zod schemas (Single source of truth)
│   ├── media          # Image processing (WebP, thumbnails)
│   └── ...            # Other shared utilities (qr, analytics, email, etc.)
└── tooling            # Configuration for Biome, TypeScript, etc.
```

---

## 🚀 Getting Started

### 1. Prerequisites
-   [pnpm](https://pnpm.io/installation) installed globally.
-   [Docker](https://www.docker.com/) for running local database/cache services.

### 2. Installation
```bash
pnpm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` in the root and relevant apps/packages:
```bash
cp .env.example .env
```

### 4. Database Setup
Start the local services and apply migrations:
```bash
docker-compose up -d
pnpm db:generate
pnpm db:migrate
```

### 5. Start Development
```bash
pnpm dev
```

---

## 🏗️ Technical Architecture

### oRPC Implementation
We use oRPC to bridge the client and server with full type safety. All procedures are defined in `packages/api` and consumed in the frontend apps without manual fetch wrappers or types.

### Shared Validation
The `@ziron/validators` package is the **only** place where Zod schemas are defined. These are used for:
1.  API request validation (oRPC).
2.  Form validation (TanStack Form).
3.  Database schema validation where applicable.

---

## 🗺️ Roadmap & Future-Proof Features

### ✅ Phase 1: Digital Card MVP (Current Focus)
- [x] Base monorepo & tooling (Turborepo, pnpm catalogs, Biome).
- [x] Core DB schema & Auth integration (Drizzle + Better Auth).
- [ ] Card editor & public profile rendering (oRPC + React 19).
- [ ] Media upload & WebP optimization (@ziron/media).

### 🚀 Phase 2: Scale & Automation
- **Background Processing (Inngest)**:
  - Automated image optimization & resizing.
  - PDF generation from user data and templates.
  - Monthly report aggregation for clients.
  - File security checking & vulnerability scanning.
- **AI Integration**:
  - Automatic bio generation from profile data.
  - Smart suggestions for name, job title, and company.
- **Local-First Sync (Zero/Rocicorp)**:
  - Full offline access with real-time synchronization.
- **Payments & Physical Cards**:
  - Organization-based dynamic payment system with usage limitations.
  - NFC card ordering flow with custom design uploads (.ai, .psd, Canva).

### 🏗️ Phase 3: Enterprise Ecosystem
- **Advanced Analytics**: Granular tracking for views, clicks, and conversion events.
- **Custom Template Builder**: Deep personalization for organization-specific branding.
- **Bulk Operations**: Large-scale importing/exporting for enterprise onboarding.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.
