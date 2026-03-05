# Progress

## Session 1 — 2026-03-04

### What we built

**Project scaffold**
- Vite 7 + React 19 + Tailwind CSS v4 (via `@tailwindcss/vite` — no config file needed)
- Git repo initialized, `.gitignore` tuned, pushed to GitHub at `github.com/72/Protobase`
- `CLAUDE.md` added for future Claude Code sessions

**Canvas**
- Fixed 393×852px iPhone 16 canvas centered on a `#EBEBEB` background
- 36px border radius, layered box shadow + 1px ring

**Touch cursor**
- Native cursor hidden globally (`cursor: none !important` on `*`)
- 40×40 semi-transparent circle follows the mouse, scales to 78% on press
- `mixBlendMode: multiply` so it reads well over any background

**Persistent chrome**
- `StatusBar`: live clock, signal bars, wifi, battery — rendered as an absolute overlay at `z-index: 200` so it never animates with screen transitions
- Home indicator: centered pill (134×5px) at bottom, also `z-index: 200`
- Every screen uses a 50px top spacer and `paddingBottom: 34` on scroll containers to respect both bars

**Navigation engine** (`App.jsx`)
- Stack-based (`[{ id, key }]`), no router
- Three phases: `idle → forward → back`
- CSS keyframe animations: `slideInFromRight`, `slideToBack`, `slideOutToRight`, `slideFromBack`
- Screens behind the active one sit at `translateX(-28%)` for Apple's characteristic parallax depth
- Transitions locked during animation (320ms, `cubic-bezier(0.4, 0, 0.2, 1)`)

**ScrollView component**
- Drop-in scroll container with mouse-drag + touch-drag momentum
- Velocity sampled over a 6-frame rolling window, 0.95 friction decay via `requestAnimationFrame`
- Mouse wheel still works natively (`overflow-y: scroll`)
- 4px drag threshold so taps/clicks inside still fire correctly
- Scrollbar hidden via `.no-scrollbar` CSS class

**Three demo screens**
- `HomeScreen` — large title + list of nav rows
- `ScreenA` — feed layout (posts with avatars, like/repost/share actions)
- `ScreenB` — profile layout (avatar, stats, follow button, recent posts)
- `ScreenC` — contacts list (23 alphabetical sections, ~70 entries) — primary showcase for momentum scrolling

**Global polish**
- `user-select: none` on `*` — no text is selectable anywhere
- All icons are inline SVGs, no icon libraries

---

### Key decisions

| Decision | Rationale |
|---|---|
| No router — stack array in App.jsx | Simpler than React Router for prototype navigation; easy to reason about |
| CSS keyframes over Framer Motion | Zero dependencies, sufficient for the transition types needed |
| Persistent chrome as absolute overlays | Lifting status bar / home indicator above the stack prevents them from animating with screen transitions |
| `pointerdown` on element, `pointermove`/`pointerup` on `window` | Dragging outside the scroll container mid-gesture still works; avoids `setPointerCapture` issues with child click events |
| Inline styles for component layout, Tailwind only for page-level | Keeps component styles co-located and explicit; Tailwind for coarse layout only |
| No icon library | Keeps bundle minimal; inline SVGs are trivial for chevrons and simple icons |

---

### What's next

The project's direction is to build a **component and pattern library** for mobile prototyping. Future sessions should add:

**Overlay surfaces**
- Bottom sheet / panel (gesture-dismissible, snap points)
- Modal dialog (slide up from bottom, backdrop tap to dismiss)
- Contextual menu (tap-triggered, auto-positioned)
- Tooltip

**Additional transition types**
- Modal push (slides up from bottom, distinct from the horizontal push nav)
- Sheet dismiss (drag down with momentum, threshold-based snap)
- Fade transition
- Full-screen overlay takeover

**Gesture primitives**
- Swipe-to-dismiss (horizontal, for cards/sheets)
- Long-press detection
- Pull-to-refresh indicator

**Structural**
- A dedicated `src/components/primitives/` folder once the pattern library grows
- Consider a lightweight demo/kitchen-sink screen that showcases all available components in one place, making it easy to verify the foundation before forking
