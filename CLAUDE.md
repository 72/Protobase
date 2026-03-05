# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # production build
npm run lint     # ESLint
npm run preview  # preview production build locally
```

## Purpose

Protobase is a **mobile prototyping foundation** — not an end-user product. Its goal is to accumulate reusable components and interaction patterns (overlays, dialogs, transitions, gestures) that can be forked as a base for new prototypes. Treat every addition as a building block, not a one-off.

## Stack

- **Vite 7 + React 19** — no router, state-based navigation
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js`; configured entirely in `src/index.css` with `@import "tailwindcss"`
- No external UI or animation libraries — all motion is plain CSS keyframes or `requestAnimationFrame`

## Architecture

### Canvas & navigation (`src/App.jsx`)

The entire app renders inside a fixed 393×852px canvas (iPhone 16) centered on the page. Navigation is a **stack of `{ id, key }` objects** driven by three phases: `idle | forward | back`. Each screen in the stack is `position: absolute; inset: 0` and gets a CSS transform/animation from `getStyle(index)` based on its position in the stack and the current phase.

- **Forward**: incoming screen plays `slideInFromRight`; the screen below plays `slideToBack` (shifts to −28%)
- **Back**: current screen plays `slideOutToRight`; the screen below plays `slideFromBack` (returns from −28%)
- Keyframes are defined in `src/index.css`
- Navigation is locked during transitions (`phase !== 'idle'`)

**Adding a screen**: create `src/screens/ScreenX.jsx`, add it to `SCREEN_MAP` in `App.jsx`, then call `navigate('x')` from any screen.

### Persistent chrome

`StatusBar` and the home indicator pill live as `position: absolute; z-index: 200` overlays **inside the canvas but above the screen stack**. They are `pointerEvents: none`. Every screen must include `<div style={{ height: 50, flexShrink: 0 }} />` at the top (status bar spacer) and `paddingBottom: 34` on any scrollable container (home indicator clearance).

### Screen props

Every screen receives: `navigate(id)`, `goBack()`, `canGoBack` (boolean).

### ScrollView (`src/components/ScrollView.jsx`)

Drop-in replacement for any scrollable container. Provides:
- Mouse wheel scrolling (native, via `overflow-y: scroll`)
- Mouse-drag and touch-drag scrolling with momentum (velocity sampled over 6 frames, 0.95 friction decay via `rAF`)
- `touch-action: none` to suppress browser-native touch scroll
- Hidden scrollbar via `.no-scrollbar` class

Use it wherever a screen has scrollable content. `paddingBottom: 34` should be set on the ScrollView itself for home indicator clearance.

### Touch cursor

`src/components/TouchCursor.jsx` — fixed 40×40 semi-transparent circle tracking `mousemove`, scales to 78% on `mousedown`. The native cursor is hidden globally via `* { cursor: none !important }` in `src/index.css`. Text selection is also disabled globally via `user-select: none`.

### Style conventions

- Inline styles for layout and component-specific values; Tailwind utilities for page-level layout only
- Font: `-apple-system, BlinkMacSystemFont` (San Francisco on Apple devices)
- Shared grays: `#F2F2F7` (dividers), `#8E8E93` (secondary text), `#EBEBEB` (page background)
- No icon libraries — chevrons and icons are inline SVGs

## Planned foundation components

The roadmap for future sessions — implement these as reusable, composable primitives:

**Overlays & surfaces**: bottom sheet / panel, modal dialog, contextual menu, tooltip

**Additional transition types**: modal (slide up from bottom), full-screen takeover, fade, sheet dismiss (swipe down)

When building these, follow the same pattern as the navigation engine: CSS keyframes for motion, `rAF` for gesture-driven animation, no external libraries.
