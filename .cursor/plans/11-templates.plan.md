---
name: Templates Package + UI Components
overview: Implement packages/templates (business-card layout styles Default/Compact/Tiles, theme presets per layout, predefined blocks) and packages/ui (layout components, theme preset picker, review-card templates). v1 = predefined blocks + customization; no external JSON-driven layout libs.
todos:
  - id: layout-styles
    content: Define 3 layout styles (Default, Compact, Tiles) and layout-specific theme presets
    status: pending
  - id: theme-presets
    content: Theme preset definitions and getThemePresets(layoutStyle) API
    status: pending
  - id: business-card-blocks
    content: Predefined block types and per-layout block config (customization)
    status: pending
  - id: review-card
    content: Create src/review-card/ (minimal, stars, thank_you templates)
    status: pending
  - id: ui-templates
    content: packages/ui layout components, theme preset picker UI, review-card-templates
    status: pending
isProject: false
---

# Implementation Plan 11: Templates + UI Components

**Parent plan:** [full-project.plan.md](.cursor/plans/full-project.plan.md)

**Prerequisites:** Plan 2 (DB), Plan 7 (Media)

---

## Scope

- **3 layout styles** — Default, Compact, Tiles (business card). Each has distinct structure (hero placement, content density, tiles grid).
- **Dynamic theme presets** — Presets can be global or layout-specific; user picks layout style then theme preset (grid UI: swatch + label + selection).
- **v1 customization** — Predefined blocks with per-block customization (visibility, content, order within layout). Custom layouts in v1 = choose layout + theme + block options. No dependency on unmaintained JSON-driven layout packages.
- `packages/templates` — Layout/theme/block logic only (no React).
- `packages/ui` — Layout components, theme preset picker, review-card components.

---

## Key Files


| File                                             | Purpose                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| `packages/templates/src/layouts.ts`              | Layout style IDs and metadata (Default, Compact, Tiles)                  |
| `packages/templates/src/theme.ts`                | Theme preset definitions, token sets, `getThemePresets(layoutStyle?)`    |
| `packages/templates/src/business-card/blocks.ts` | Predefined block types and per-layout block config                       |
| `packages/templates/src/review-card/`            | minimal, stars, thank_you (review card templates)                        |
| `packages/ui/src/business-card-layouts/`         | Default, Compact, Tiles layout components (wireframes → real components) |
| `packages/ui/src/theme-preset-picker/`           | Grid of preset cards (swatch, label, radio, optional "New" badge)        |
| `packages/ui/src/review-card-templates/`         | Minimal, Stars, ThankYou components                                      |


---

## V1: Layout styles, theme presets, predefined blocks

### 1. Three layout styles (business card)


| Layout ID | Name    | Structure (from design)                                                                                                            |
| --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `default` | Default | Large centered profile; stacked name/title; wide content blocks; list pairs; CTA at bottom. Vertical, information-heavy.           |
| `compact` | Compact | Smaller profile on right; name/title beside it; compact list; small icon blocks (e.g. social); denser.                             |
| `tiles`   | Tiles   | Header/banner + centered profile; name/title; main content = grid of tiles (e.g. 2×3); then short blocks. Visual/category-focused. |


- **Data model:** Card stores `layoutStyle: 'default' | 'compact' | 'tiles'` and `themePresetId: string`. Optionally `blockOverrides` (visibility/content per block).
- **Rendering:** One React component per layout in `packages/ui` (e.g. `DefaultLayout.tsx`, `CompactLayout.tsx`, `TilesLayout.tsx`). Registry: `layoutStyle → Component`. Each receives `card.data` and resolved theme tokens.

### 2. Dynamic theme presets (per layout)

- **Presets:** Each preset has `id`, `name`, `swatch` (CSS gradient or color for picker preview), and a **token set** (colors, fonts). Optional `layoutStyles?: ('default'|'compact'|'tiles')[]` so a preset can be limited to certain layouts; if omitted, available for all.
- **API:** `getThemePresets(layoutStyle?)` returns presets for that layout (or all). `resolveTheme(presetId)` returns the token set.
- **UI (theme preset picker):** Grid of cards: swatch (gradient/color), name (e.g. "Default"), radio; selected = border + filled radio. Optional "New" badge. Matches the Theme Preset grid in your design.

### 3. Predefined blocks and v1 customization

- **Predefined blocks:** Block types defined in code (e.g. `hero` | `name_title` | `contact_list` | `cta_buttons` | `tiles_grid` | `social_links` | `bio`). Each **layout** declares which blocks it uses and in what order (e.g. Default: hero → name_title → bio → contact_list → cta_buttons; Tiles: hero → name_title → tiles_grid → contact_list → cta_buttons).
- **Customization (v1):** Per block: **visibility** (show/hide), **content** (fields from `card.data`). Order can stay fixed per layout in v1; reorder in v2.
- **No external JSON layout engine in v1:** Layouts are real React components that compose block components. Block components read `card.data` and theme. Type-safe and maintainable; no reliance on unmaintained packages.

### 4. Custom layouts in v1

- **Meaning:** User picks (1) **Layout style** (Default / Compact / Tiles), (2) **Theme preset** (from presets for that layout), (3) **Block options** (what to show, content). That combination is the "custom layout" for v1. v2+ can add reorder, more layouts, or user-defined block sets.

---

## Implementation Steps

1. **Theme & presets** — Define token structure; theme presets with swatch and `getThemePresets(layoutStyle?)`, `resolveTheme(presetId)`.
2. **Layout styles** — Constants and metadata for Default, Compact, Tiles; layout → block list in `packages/templates`.
3. **Business card blocks** — Predefined block types and per-layout block config; block customization schema (visibility, content).
4. **UI** — Layout components (Default, Compact, Tiles), theme preset picker grid, review-card-templates.

---

## Solutions & implementation approaches

Below are concrete patterns and tools you can use to implement `packages/templates` and the UI layer. Pick one approach per area and stay consistent.

### 1. Theme engine & design tokens (`src/theme.ts`, colors, fonts)

**Options:**


| Approach                       | Description                                                                                                                                                                                          | Use when                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **CSS custom properties only** | Define primitives and semantic tokens as CSS variables in a single file or generated from JSON. No runtime lib.                                                                                      | You want minimal deps and full control; theme switch via class or `data-theme` on root.            |
| **Style Dictionary**           | Tokens in JSON → build step → CSS vars, Tailwind theme, JS/TS. [Style Dictionary](https://styledictionary.com/), [Tokens Studio + SD](https://docs.tokens.studio/transform-tokens/style-dictionary). | You have Figma tokens (e.g. Tokens Studio) and want one source of truth for web + other platforms. |
| **TokiForge**                  | Small (<3KB) design-token engine; runtime theme switch, dark mode, Tailwind integration, Figma sync. [TokiForge](https://github.com/TokiForge/tokiforge).                                            | You want runtime theme switching and optional Figma sync without a heavy design system.            |
| **react-design-tokens**        | Lightweight; `createTheming()` → `useTheme`, `ThemeProvider`, CSS variables, optional SSR. [react-design-tokens](https://github.com/mimshins/react-design-tokens).                                   | You want a React-specific theme provider and hooks with minimal footprint.                         |


**Recommendation for ZironTap:** Keep **logic** in `packages/templates` (token names, structure, default values). Keep **output** (CSS vars, Tailwind theme) in `packages/ui` or a small build step. Use a **three-tier structure**: primitives (raw values) → mapping (semantic: `color.primary`, `spacing.md`) → component tokens (`button.primary.background`). If you use Figma, add Style Dictionary + `@tokens-studio/sd-transforms` to turn Figma exports into CSS vars and Tailwind config.

---

### 2. Business card “blocks” and theme engine (`src/business-card/`)

**Options:**


| Approach                            | Description                                                                                                                                                                                        | Use when                                                                                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Template registry (recommended)** | A map `templateId → component`. Card stores `template: 'minimal'` and optional `theme`; renderer does `const Component = registry[template]; return <Component data={card.data} theme={theme} />`. | You have a fixed set of card layouts (e.g. minimal, compact, full). Simple and type-safe. |
| **Block list + component map**      | Card `data` is a list of blocks: `[{ type: 'header', props }, { type: 'contact', props }]`. A block registry maps `type` → React component; renderer loops and renders each block.                 | You want users to reorder or optionally hide sections without new “templates”.            |
| **JSON-driven layout (not for v1)** | Full layout in JSON via third-party libs. Older packages (json-react-layouts, react-json-schema) are unmaintained; skip for v1. Revisit in v2+ if you need no-code layout editing.                 | —                                                                                         |


**Recommendation for ZironTap:** Implement the **3 layout styles** (Default, Compact, Tiles) as three layout components; each declares its block list and order in `packages/templates`. Theme from `resolveTheme(themePresetId)`; presets can be layout-specific via `getThemePresets(layoutStyle)`. V1 uses **predefined blocks** + layout registry only — no unmaintained JSON-driven layout packages.

---

### 3. Review card templates (minimal, stars, thank_you)

Same **template registry** pattern:

- **In `packages/templates`:** Define template IDs (e.g. `'minimal' | 'stars' | 'thank_you'`), default theme per template, and any config schema (e.g. star count, CTA text).
- **In `packages/ui`:** One React component per template under `src/review-card-templates/` (e.g. `Minimal.tsx`, `Stars.tsx`, `ThankYou.tsx`). They receive `reviewCard` (slug, title, headline, buttonLabel, logo, theme, primaryColor) and optional `reviews` for display.
- **Rendering:** Client app (`apps/client`) and portal preview both do: `const Template = REVIEW_TEMPLATE_REGISTRY[reviewCard.template]; return <Template {...reviewCard} />`.

Keep **logic** (which template exists, default config) in `packages/templates`; **presentation** (actual JSX and styling) in `packages/ui` so the UI package stays the single place for components and design tokens.

---

### 4. Separation of concerns: `packages/templates` vs `packages/ui`


| Layer                    | Responsibility                                                         | Contents                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**packages/templates`** | Template and theme **logic** only (no React components).               | Template IDs and metadata; theme IDs and token sets (primitives/semantic); `resolveTheme(themeId)`, `getTemplateMetadata(templateId)`; optional block type definitions and validation schemas.  |
| `**packages/ui`**        | **Presentation**: React components that render cards and review cards. | Theme provider and CSS variables (from tokens); template registry (map id → component); business-card and review-card components that read `template` + `theme` and render the right component. |


So: **templates** = “what templates exist and what theme options they have”; **ui** = “how they look and how they’re rendered.” The client/portal import from `@ziron/ui` for rendering and from `@ziron/templates` for template list, defaults, and theme resolution.

---

### 5. Suggested file layout (concrete)

`**packages/templates`**

- `src/theme.ts` — Theme type, default themes (e.g. `default`, `dark`, `brand`). Exports `resolveTheme(themeId)`, `getThemeIds()`.
- `src/layouts.ts` — Layout style IDs and metadata: `BUSINESS_CARD_LAYOUTS = ['default', 'compact', 'tiles']`; optional `getBlockOrder(layoutStyle)`.
- `src/theme.ts` — Theme presets (id, name, swatch, token set), `resolveTheme(presetId)`, `getThemePresets(layoutStyle?)`.
- `src/business-card/blocks.ts` — Predefined block types and per-layout block config (customization schema).
- `src/review-card/index.ts` — Review template IDs and config.
- `src/index.ts` — Public API: `resolveTheme`, `getThemePresets`, `getLayoutMetadata`, block types.

`**packages/ui`**

- `src/theme/` — Token files, generated CSS vars, ThemeProvider.
- `src/business-card-layouts/` — DefaultLayout, CompactLayout, TilesLayout; layout registry.
- `src/theme-preset-picker/` — Grid of preset cards (swatch, label, radio, optional "New" badge).
- `src/review-card-templates/` — Minimal, Stars, ThankYou; registry.
- `<CardRenderer layoutStyle={...} themePresetId={...} data={...} />` (and optional block overrides) using layout + theme from `@ziron/templates`.

---

### 6. References (docs, repos, articles)

- **Design tokens / theme:** [Style Dictionary](https://styledictionary.com/), [Tokens Studio → Style Dictionary](https://docs.tokens.studio/transform-tokens/style-dictionary), [TokiForge](https://github.com/TokiForge/tokiforge), [react-design-tokens](https://github.com/mimshins/react-design-tokens).
- **Template/layout registry (v1):** [Building a component registry in React](https://medium.com/front-end-weekly/building-a-component-registry-in-react-4504ca271e56), [react-component-catalog](https://github.com/natterstefan/react-component-catalog). Pattern: map `id → Component`; use for layout style and block type. JSON-driven layout libs (json-react-layouts, react-json-schema) are unmaintained — not used in v1.
- **Digital card structure:** [digital-business-card](https://github.com/milliorn/digital-business-card), [digital-card (Figma → component)](https://github.com/rzsm/digital-card).

