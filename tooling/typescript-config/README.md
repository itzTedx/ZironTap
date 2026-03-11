# `@ziron/typescript-config`

Shared typescript configuration for the workspace.

- **base.json** — Type-checking and bundler-oriented defaults; does not set `declaration` or `declarationMap`.
- **internal-package.json** — Extends base and enables `declaration`, `declarationMap`, and `outDir` for packages that emit compiled output. Use this (or set `declaration`/`declarationMap` locally) for any package that has an `outDir` and should produce `.d.ts` for consumers.
