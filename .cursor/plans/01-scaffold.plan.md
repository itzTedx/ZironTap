---
name: 01 Scaffold
overview: Tooling, Husky, docker-compose, shadcn init. Requires 00-project-structure-packages first.
todos: []
isProject: false
---

# Implementation Plan 01: Scaffold

**Parent:** [full-project.plan.md](full-project.plan.md) — §4 Tooling, §6 Tooling and Workspace Config, §9 Implementation Order (step 1)

**Previous:** [00 Project Structure & Packages](00-project-structure-packages.plan.md)

## Scope

Tooling packages (biome, typescript-config, vitest-config, commitlint, dependency-rules), Husky, lint-staged, docker-compose, `.changeset`, shadcn monorepo init. Assumes project structure and packages from plan 00 exist.

## Deliverables

- `turbo.json` — tasks: build, dev, lint, format, test, test:e2e, test:deps, knip, db:* (pnpm-workspace and root package.json from plan 00)
- `tooling/biome/` — biome.json, shared lint + format
- `tooling/typescript-config/` — base.json, nextjs.json
- `tooling/vitest-config/` — base.config.ts
- `tooling/commitlint/` — commitlint.config.js
- `tooling/dependency-rules/` — .dependency-cruiser.cjs
- `turbo/generators/` — Plop config, templates
- `.husky/pre-commit`, `.husky/commit-msg`
- `lint-staged.config.js`
- `docker-compose.yml` — postgres, redis/valkey, mailpit
- `.changeset/config.json`
- `.vscode/settings.json`, `extensions.json`
- `.cursor/rules/` — conventions.mdc, naming.mdc, react.mdc
- `.nvmrc`, `.editorconfig`, `.gitattributes`
- `components.json` — run `npx shadcn@latest init --monorepo` for UI setup (use npx; pnpm dlx may fail)

## Commands

```bash
pnpm init
npx shadcn@latest init --monorepo
pnpm dlx husky init
docker compose up -d
```

## Next

→ [02 DB](02-db.plan.md)