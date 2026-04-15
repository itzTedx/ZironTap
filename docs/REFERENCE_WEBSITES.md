# Reference Websites

Central place to track external UI and component references for ZironTap.

## QR Code

### Dice UI - QR Code

- Category: `qr`
- URL: <https://www.diceui.com/docs/components/radix/qr-code>
- Why this is useful: Flexible QR component with canvas/SVG/image output and built-in download support.
- Key components/patterns:
  - `QRCode` root context component
  - `QRCodeCanvas`, `QRCodeSvg`, `QRCodeImage` render options
  - `QRCodeOverlay` for logo/icon center content
  - `QRCodeDownload` for file export
  - Error correction levels (`L`, `M`, `Q`, `H`) with guidance for overlays
- Notes for ZironTap:
  - Prefer high error correction (`H`) when showing center logos.
  - SVG mode is best for print-ready QR exports.
  - Keep this as a baseline reference for future `@ziron/qr` UI decisions.

---

## Image Cropping

### Dice UI - Cropper

- Category: `other`
- URL: <https://www.diceui.com/docs/components/base/cropper>
- Why this is useful: Accessible image/video cropper with built-in zoom, rotation, and crop area controls.
- Key components/patterns:
  - `Cropper` as the root with controlled state support
  - `CropperImage` and `CropperVideo` media targets
  - `CropperArea` overlay for crop selection
  - `onCropComplete` callback returning percentage and pixel crop values
- Notes for ZironTap:
  - Good reference for profile image/logo editing flows.
  - Reuse interaction patterns (zoom/rotate/crop callbacks), not visual styling.

---

## Color Selection

### Dice UI - Color Picker

- Category: `other`
- URL: <https://www.diceui.com/docs/components/base/color-picker>
- Why this is useful: Rich color input patterns with selectable formats and interaction models for product customization UIs.
- Key components/patterns:
  - Color picker root with controlled/uncontrolled value support
  - Hue, alpha, and saturation-style controls for precision editing
  - Swatch/palette interactions for quick preset selection
  - Format handling patterns (for example hex/rgb/hsl display + syncing)
- Notes for ZironTap:
  - Useful reference for theming and brand color configuration flows.
  - Reuse state/control patterns and accessibility behavior, not page styling.

---

## Slug Availability Check

> Add references here for username/slug availability checks, debounced validation, and inline status UI.

### Placeholder

- Category: `slug-check`
- URL: `<add-reference-url>`
- Why this is useful: `<add-note>`
- Key components/patterns: `<add-note>`
- Notes for ZironTap: `<add-note>`

---

## Component Animations

> Add references for micro-interactions, enter/exit transitions, and loading transitions.

### Placeholder

- Category: `animation`
- URL: `<add-reference-url>`
- Why this is useful: `<add-note>`
- Key components/patterns: `<add-note>`
- Notes for ZironTap: `<add-note>`

---

## Shimmer / Dots Background CSS

> Add references for shimmer effects, animated dots/grids, and performance-safe CSS backgrounds.

### Placeholder

- Category: `background-css`
- URL: `<add-reference-url>`
- Why this is useful: `<add-note>`
- Key components/patterns: `<add-note>`
- Notes for ZironTap: `<add-note>`

