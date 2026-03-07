---
name: Templates Package + UI Components
overview: Implement packages/templates (business-card, review-card, theme) and packages/ui review-card-templates. Drives card and review rendering.
todos:
  - id: business-card
    content: Create src/business-card/ blocks and theme engine
  - id: review-card
    content: Create src/review-card/ (minimal, stars, thank_you templates)
  - id: theme
    content: Create src/theme.ts (colors, fonts, design tokens)
  - id: ui-templates
    content: Create packages/ui review-card-templates (Minimal, Stars, ThankYou)
isProject: false
---

# Implementation Plan 11: Templates + UI Components

**Parent plan:** [ziron_tap_structure_plan_43dd61bf.plan.md](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

**Prerequisites:** Plan 2 (DB), Plan 7 (Media)

---

## Scope

- `packages/templates` — Theme/template logic; business-card blocks, review-card templates
- `packages/ui` — Review card template components (Minimal, Stars, ThankYou)
- Theme engine (colors, fonts, design tokens)

---

## Key Files

| File | Purpose |
|------|---------|
| `packages/templates/src/business-card/` | Blocks, theme engine |
| `packages/templates/src/review-card/` | minimal, stars, thank_you |
| `packages/templates/src/theme.ts` | Colors, fonts, tokens |
| `packages/ui/src/review-card-templates/` | Minimal, Stars, ThankYou components |

---

## Implementation Steps

1. **Theme** — Define primitives, mapping, component tokens
2. **Business card** — Blocks and theme engine for card rendering
3. **Review card templates** — minimal, stars, thank_you in packages/templates
4. **UI components** — Render components in packages/ui driven by template data
