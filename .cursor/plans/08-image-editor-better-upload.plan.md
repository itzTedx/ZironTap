---
name: Image Editor + Better Upload
overview: Implement the image editor (profile/cover cropper) with react-advanced-cropper, Better Upload route in portal, and TanStack Form wiring. Depends on packages/media and packages/ui.
todos:
  - id: image-editor-modal
    content: Create image-editor-modal.tsx with Crop and Adjust tabs
  - id: crop-tab
    content: Implement crop-tab.tsx (rotate, flip, zoom, straighten)
  - id: adjust-tab
    content: Implement adjust-tab.tsx (brightness, contrast, saturation, vignette)
  - id: better-upload-route
    content: Add Better Upload route in apps/portal/src/app/api/upload/
  - id: profile-cover-components
    content: Create profile-image-upload and cover-image-upload components
  - id: tanstack-form-wiring
    content: Wire image upload to TanStack Form (form.setFieldValue)
isProject: false
---

# Implementation Plan 8: Image Editor + Better Upload

**Parent plan:** [full-project.plan.md](full-project.plan.md) — §3.8 packages/ui (Image editor), §7 Key File Locations

**Prerequisites:** [07 Media](07-media.plan.md) (compressAndResize), [06 API](06-api.plan.md) (upload handlers); portal app from [12 Apps](12-apps.plan.md)

---

## Scope

- Image editor for profile (1080×1080, circular) and cover (1200×630, rectangular)
- Better Upload route in portal for S3 uploads
- TanStack Form integration

---

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui/src/components/image-editor/image-editor-modal.tsx` | Main modal with Crop/Adjust tabs |
| `packages/ui/src/components/image-editor/crop-tab.tsx` | Rotate, flip, zoom, straighten |
| `packages/ui/src/components/image-editor/adjust-tab.tsx` | Brightness, contrast, saturation, vignette |
| `packages/ui/src/components/image-editor/use-image-editor.ts` | Editor state hook |
| `packages/ui/src/components/image-editor/export-canvas.ts` | Canvas export (crop + adjustments) |
| `apps/portal/src/app/api/upload/route.ts` | Better Upload handler |

---

## Implementation Steps

1. **Image editor structure** — Create `packages/ui/src/components/image-editor/` with modal, crop tab, adjust tab, export logic
2. **react-advanced-cropper** — Integrate CropperArea, custom stencils (circle for profile, rect for cover)
3. **Adjust tab** — Canvas filters for brightness, contrast, saturation, vignette
4. **Export flow** — `exportCanvas` → Blob → `compressAndResize` (packages/media) → upload
5. **Better Upload route** — Configure @better-upload in portal; S3 destination
6. **Profile/cover components** — Dropzone + "Upload image" button; open modal on select
7. **Progress toasts** — Sonner: "Processing…", "Compressing…", "Uploading…", "Done"
8. **Form wiring** — On success: `form.setFieldValue('profileImageKey'|'coverImageKey', objectKey)`

---

## Dependencies

- `react-advanced-cropper`
- `@better-upload/client`, `@better-upload/server`
- `packages/media` for `compressAndResize`
- `context-filter-polyfill` (Safari canvas filters)

---

## Image Source Options (from structure plan)

- **Upload / drag-and-drop** — Primary
- **Paste image URL** — Modal with URL input; fetch → open editor
- **Unsplash** — Modal to search/select; fetch → open editor
