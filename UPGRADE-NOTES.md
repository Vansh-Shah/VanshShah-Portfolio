# UI/UX Upgrade — Change Log

A craft-level polish pass over the existing design. The visual identity
(Syne + Inter, monochrome + blue accent, dark/light) is unchanged — these
are refinements, not a redesign.

## Accessibility
- **Replaced emoji theme-toggle icons (☀️/🌙) with inline SVG sun/moon icons.**
  They swap correctly and stay in sync with `aria-pressed` and `aria-label`.
- **Added `prefers-reduced-motion` support** — disables reveal animations,
  hero glow, and the stat counter animation (counters jump to final values).
- **Global `:focus-visible` ring** on all interactive elements (2px accent).

## Theming
- **Theme now persists** to `localStorage` and respects the visitor's system
  `prefers-color-scheme` on first visit (HTML still defaults to dark).

## Motion & depth
- Soft ambient radial glow behind the hero name.
- Layered shadow system (`--shadow-sm/md/lg`) + spring easing tokens
  (`--ease-out`, `--ease-spring`) applied to nav, project, and social cards.
- Subtle hover states on stat cells; tactile press-state feedback on buttons/cards.
- `touch-action: manipulation` to remove the 300ms mobile tap delay.

## Typography
- Tabular figures on stats/metrics so counting numbers don't shift width.
- Added Inter 600 weight for crisper labels.

## Files touched
- `src/styles.css` — tokens, reduced-motion, focus, depth, hero glow, press states
- `src/components/icons.js` — added `sun` and `moon` SVG icons
- `src/components/ui.js` — SVG icon swap, theme persistence, system-pref resolver, reduced-motion guard
- `index.html` — SVG icon in toggle button (replaced emoji)

Verified in a headless browser: desktop light/dark, mobile, mobile menu,
contact page, and reduced-motion. Production build is clean.
