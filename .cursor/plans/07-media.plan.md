---
name: 07 Media
overview: Image processing — WebP, thumbnails, compressAndResize. PROFILE_IMAGE, COVER_IMAGE presets.
todos: []
isProject: false
---

# Implementation Plan 07: Media

**Parent:** [ZironTap Structure Plan](.cursor/plans/ziron_tap_structure_plan_43dd61bf.plan.md)

## Scope

`packages/media` — Client-side compressAndResize, size presets. Used by image editor, attachments, QR logo.

## Deliverables

- `packages/media/package.json`
- `src/process.ts` — convert to WebP, generate thumbnails; `compressAndResize(blob, { width, height, quality, format })`
- `src/upload.ts` — upload flow (Better Upload)
- `src/sizes.ts` — PROFILE_IMAGE (1080x1080), COVER_IMAGE (1200x630), avatar, thumbnail, full

## Use Cases

- Business cards: person, cover, attachments
- QR codes: logo
- Review cards: logo
- CSV import: bulk processing

## Next

→ [08 Image Editor](08-image-editor.plan.md)