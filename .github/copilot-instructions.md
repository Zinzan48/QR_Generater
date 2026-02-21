# QR Forge — Copilot Instructions

## Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # tsc -b && vite build  (always run to validate changes)
npm run lint      # ESLint
npm run preview   # Serve built dist/ locally
```

> There are no tests. `npm run build` is the primary correctness check — it runs TypeScript compilation before bundling.

## Architecture

**Fully static SPA** — no backend, no API, no database. Deployed to Cloudflare Pages via `wrangler.jsonc` (SPA mode: all routes → `dist/index.html`).

```
src/
  App.tsx                    # Root: tab state + theme wiring
  hooks/
    useTheme.ts              # data-theme attr on <html>; localStorage key: "qr-forge-theme"
    useQrGenerator.ts        # QRCodeStyling instance lifecycle + debounced update
    useQrDecoder.ts          # QrScanner.scanImage wrapper
  components/
    Header.tsx               # Sticky nav: tabs + theme toggle + author link
    ThemeToggle.tsx
    generator/
      GeneratorTab.tsx       # Main layout: two-column grid (controls | sticky preview)
      QrPreview.tsx          # Exports useQrPreviewRef() hook only (no component)
      Collapsible.tsx        # CSS grid-template-rows accordion
      DownloadButtons.tsx
      [pickers…]             # ErrorCorrectionPicker, SizePicker, DotStylePicker,
                             #   CornerStylePicker, ColorPicker, LogoUploader
    decoder/
      DecoderTab.tsx         # document paste listener lives here
      DropZone.tsx
      DecodeResult.tsx
```

**QR generation pattern:** `useQrPreviewRef(options)` in `GeneratorTab` creates a `containerRef` that is attached to a `<div>`. `useQrGenerator` initialises `QRCodeStyling` once (appends canvas to that div), then calls `.update()` on every options change debounced at 300 ms. **Never re-create the QRCodeStyling instance** — always call `.update()`.

**QR decoding:** `qr-scanner` uses a Web Worker internally. CSP in `public/_headers` must include `worker-src 'self' blob:` — do not tighten this.

## Theming

- **Dark mode is the default** (no attribute on `<html>`).
- Light mode sets `document.documentElement.setAttribute('data-theme', 'light')`.
- CSS variables are declared in `:root {}` (dark) and overridden in `[data-theme="light"] {}`.
- **No Tailwind `darkMode` key** — theming is CSS-variable-only.
- All Tailwind colour tokens (`bg-primary`, `text-main`, etc.) reference `var(--)` values defined in `tailwind.config.js`. Never hardcode hex colours in components; use CSS variables or Tailwind tokens.

## CSS Conventions (`src/index.css`)

| Class | Purpose |
|-------|---------|
| `.glass-card` | Glassmorphism card with backdrop-blur |
| `.glass-nav` | Sticky header glass |
| `.hud-label` | Monospace section label; `::before` injects `//` via CSS — don't add `//` in JSX |
| `.hud-divider` | Horizontal gradient separator |
| `.hud-frame` | Two-corner bracket decoration (top-left + bottom-right) |
| `.hud-frame-4c` | Four-corner bracket frame using background-image gradients |
| `.hud-btn` / `.hud-btn-primary` | HUD-style buttons |
| `.beam-border` | Animated conic-gradient rotating border (used around download section) |
| `.nav-tab` | Header tab buttons; active state via `data-active="true"` attribute |
| `.collapsible-grid` | CSS `grid-template-rows: 0fr ↔ 1fr` accordion |

`html { font-size: 18px }` — all `rem` values are relative to this, not the browser default 16px.

## UI Language

All user-visible text must be in **Traditional Chinese (繁體中文)**. Code identifiers, type names, and comments stay in English.

## Key Files for Styling Changes

- `src/index.css` — all design tokens and utility classes; single source of truth for the design system
- `tailwind.config.js` — maps Tailwind class names to CSS variables

## Deployment

Build output goes to `dist/`. Deploy with:
```bash
npx wrangler pages deploy dist
```
