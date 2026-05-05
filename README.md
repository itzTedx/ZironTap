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

## 💻 Tech Stack

### Core
-   **Monorepo Management**: [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/) Workspaces.
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router).
-   **Language**: TypeScript.

### Backend & Data
-   **API Layer**: [oRPC](https://orpc.run/) for end-to-end type-safe RPC.
-   **Database**: [Drizzle ORM](https://orm.drizzle.team/) with **PostgreSQL**.
-   **Authentication**: [Better Auth](https://better-auth.com/) (Google, Apple, Passkeys, Organizations).
-   **Background Jobs**: [Inngest](https://www.inngest.com/).

### Frontend & UI
-   **Styling**: [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/).
-   **Form Management**: [TanStack Form](https://tanstack.com/form) + Zod validation.
-   **State Management**: [Jotai](https://jotai.org/) & [nuqs](https://nuqs.47ng.com/).

### Dev Tools
-   **Linting/Formatting**: [Biome](https://biomejs.dev/) (Strictly no Prettier/ESLint).
-   **Type Safety**: Single source of truth via `@ziron/validators`.

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

## 🗺️ Roadmap & Future Plans

### ✅ Phase 1: Digital Card MVP (Current Focus)
- [x] Base monorepo & tooling.
- [x] Core DB schema & Auth integration.
- [ ] Card editor & public profile rendering.
- [ ] Media upload & WebP optimization.

### 🚀 Phase 2: Growth & Tools
- [ ] **URL Shortener**: Redirect logic and basic click tracking.
- [ ] **QR Engine**: Dynamic generation with template support.
- [ ] **Analytics Suite**: Detailed insights for cards and links.

### 🏗️ Phase 3: Enterprise & Scaling
- [ ] **Offline Sync**: Support for card editing with optimistic updates.
- [ ] **Team Collaboration**: Advanced RBAC and activity logs.
- [ ] **White-labeling**: Custom domains for organizations.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.
