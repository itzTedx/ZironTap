# `@ziron/typescript-config`

Shared TypeScript configuration for the workspace. Reference configs as `@ziron/typescript-config/<name>.json`.

---

## Configs

### `base.json`

**Use for:** Apps and packages that are type-checked and bundled (no need to emit `.d.ts`).

- **Extends:** none (root config)
- **Purpose:** Strict, bundler-oriented defaults. No `declaration` or `declarationMap` — type-checking only; the bundler (Next.js, Vite, etc.) produces output.
- **Highlights:** `target: ESNext`, `module: ESNext`, `moduleResolution: bundler`, `strict`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `isolatedModules`, `types: ["node"]`.
- **Exclude:** `node_modules`, `build`, `dist`, `.next`, `.expo`.

---

### `internal-package.json`

**Use for:** Internal packages that emit compiled output and need `.d.ts` for consumers (e.g. `@ziron/db`, `@ziron/env`).

- **Extends:** `base.json`
- **Purpose:** Enables declaration emit so packages that use `outDir` produce typings. Default is **declaration-only** (no JS from this config).
- **Adds:** `declaration: true`, `declarationMap: true`, `emitDeclarationOnly: true`, `noEmit: false`, `outDir: "${configDir}/dist"`.
- **Override in package:** Set `emitDeclarationOnly: false` if the package should also emit JS (e.g. env); set `outDir` and `rootDir` as needed (e.g. `"outDir": "dist"`, `"rootDir": "src"`).

---

### `nextjs.json`

**Use for:** Next.js apps (marketing, client, portal).

- **Extends:** `base.json`
- **Purpose:** Next.js app compiler options and plugin.
- **Adds:** Next plugin, `allowJs`, `jsx: "preserve"`, `noEmit: true`, `target: ES2017`, `lib: ["dom", "dom.iterable", "esnext"]`.

---

### `react-library.json`

**Use for:** React/JSX packages that are consumed as source or built by a bundler (e.g. `@ziron/ui`).

- **Extends:** `base.json`
- **Purpose:** Same as base but with React JSX transform.
- **Adds:** `jsx: "react-jsx"`.

---

## Quick reference


| Config                  | Extends | Emits declarations?               | Typical use            |
| ----------------------- | ------- | --------------------------------- | ---------------------- |
| `base.json`             | —       | No                                | Type-check + bundle    |
| `internal-package.json` | base    | Yes (declaration-only by default) | Packages with `outDir` |
| `nextjs.json`           | base    | No                                | Next.js apps           |
| `react-library.json`    | base    | No                                | React/JSX libraries    |


