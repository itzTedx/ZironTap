---
name: 00 Project Structure and Packages
overview: Create the root folder structure and all package scaffolds (apps, packages, tooling). Must be done first before any implementation. Establishes the monorepo skeleton with pnpm workspace and Turbo.
parentPlan: ziron_tap_structure_plan_43dd61bf.plan.md
order: 0
todos: []
---

# Implementation Plan 00: Project Structure and Packages

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

Create the complete folder structure and scaffold every package using CLIs. No manual file creation—leverage `create-turbo`, `create-next-app`, `shadcn init`, and `turbo gen` to bootstrap the monorepo skeleton.

## 1. Bootstrap with create-turbo

Use the official Turborepo CLI to scaffold the monorepo with pnpm:

```bash
pnpm dlx create-turbo@latest -m pnpm
```

When prompted, choose a project name (e.g. `ziron-tap`). This creates:

- Root `package.json`, `turbo.json`, `pnpm-workspace.yaml`
- Default apps (e.g. `web`, `docs`) — we will add/rename to match our structure
- Default packages (e.g. `ui`, `eslint-config`) — we will add our packages

**Alternative:** Use an example for a closer match:

```bash
pnpm dlx create-turbo@latest -m pnpm --example basic
```

The `basic` example gives two Next.js apps. Rename or add apps as needed.

## 2. Add Next.js Apps with create-next-app

Create each app using the Next.js CLI:

```bash
# Marketing app
pnpm create next-app@latest apps/marketing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm

# Client app (public-facing)
pnpm create next-app@latest apps/client --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm

# Portal app (admin dashboard)
pnpm create next-app@latest apps/portal --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

If `create-turbo` already created apps, either remove the default ones and run the above, or rename them (e.g. `web` → `marketing`).

## 3. Add UI Package with shadcn (monorepo)

Initialize shadcn in monorepo mode—this creates or configures the `packages/ui` package. Use `npx` (pnpm dlx may not work):

```bash
npx shadcn@latest init --monorepo
```

Follow prompts: select `packages/ui` as the component location, Tailwind, etc. This sets up `components.json`, `tailwind.config`, and the UI package structure.

## 4. Add Packages with turbo gen

Use Turborepo's generator to scaffold new packages:

```bash
# Add @turbo/gen if not present
pnpm add -D -w @turbo/gen

# Generate each package (run for each: auth, analytics, qr, templates, media, db, email, api, config, validators, rate-limit, jobs, sync)
pnpm exec turbo gen init
```

When prompted: package name `@ziron/<name>`, add to `packages/`, minimal `src/index.ts`.

**If turbo gen is not configured:** Use `pnpm init` in each package folder and add minimal `package.json`, `tsconfig.json`, `src/index.ts` manually—or use a simple script/loop.

## 5. Add Tooling Packages

Tooling packages (biome, typescript-config, vitest-config, commitlint, dependency-rules) are typically added via:

```bash
# Biome
pnpm add -D -w @biomejs/biome
# Then add tooling/biome with shared biome.json (or use root biome.json)

# TypeScript configs — create tooling/typescript-config with base.json, nextjs.json
# Vitest — pnpm add -D -w vitest, then tooling/vitest-config
# Commitlint — pnpm add -D -w @commitlint/cli @commitlint/config-conventional
# dependency-cruiser — pnpm add -D -w dependency-cruiser
```

Or use `turbo gen init` to create each tooling package if the generator supports it.

## 6. Update pnpm-workspace.yaml

Ensure workspace includes all paths:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'tooling/*'
  - 'turbo/generators'
```

## 7. Root Files (minimal manual tweaks)

- **`.nvmrc`** — `echo "22" > .nvmrc`
- **`.gitignore`** — Usually created by create-turbo; add `.env.local`, `dist`, `.turbo` if missing

## Deliverables

- [ ] Monorepo bootstrapped via `create-turbo`
- [ ] Apps: `marketing`, `client`, `portal` via `create-next-app`
- [ ] `packages/ui` via `shadcn init --monorepo`
- [ ] All other packages via `turbo gen` or minimal scaffold
- [ ] `pnpm-workspace.yaml` with `apps/*`, `packages/*`, `tooling/*`, `turbo/generators`
- [ ] `.nvmrc`, `.gitignore`

## CLI Reference

| CLI | Purpose |
|-----|---------|
| `pnpm dlx create-turbo@latest -m pnpm` | Bootstrap Turborepo monorepo |
| `pnpm create next-app@latest apps/<name>` | Add Next.js app |
| `npx shadcn@latest init --monorepo` | Setup UI package with shadcn (use npx; pnpm dlx may fail) |
| `pnpm exec turbo gen init` | Add new package (if @turbo/gen configured) |

## Next

→ [01 Scaffold](01-scaffold.plan.md) — Tooling configs, Husky, docker-compose, refine setup
