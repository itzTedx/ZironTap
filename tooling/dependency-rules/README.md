# @ziron/dependency-rules

Enforces **dependency structure** (who may depend on whom) in the monorepo using [dependency-cruiser](https://github.com/sverweij/dependency-cruiser).

This tool does **not** manage dependency versions. Versions are centralized in the pnpm **catalog** in the root `pnpm-workspace.yaml`; see AGENTS.md for the distinction.

## Rules (`.dependency-cruiser.cjs`)

- **no-circular** — No circular dependencies (error).
- **packages-no-deps-on-apps** — Packages must not depend on apps (warn).
- **ui-no-deps-on-api** — `@ziron/ui` must not depend on `@ziron/api` (warn).

## Usage

From repo root, run dependency-cruiser over the workspace (e.g. with a script in root `package.json` or via `pnpm exec depcruise` from this package).
