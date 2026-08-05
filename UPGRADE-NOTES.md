# UI/UX Upgrade — Change Log

## 2026-08 — deploy.bat: wrong-folder guard + codepage fix

Two more `deploy.bat` fixes:
- **Wrong folder**: running it from anywhere other than the actual local
  git clone (e.g. a folder with just a couple of files copied in) failed
  deep into the script with a bare `fatal: not a git repository` from
  `git add`/`git commit`. Added an early check for a `.git` folder that
  exits immediately with a clear message, before wasting time on
  install/lint/test/build/preview.
- **Garbled text**: the script used UTF-8 em dashes (`—`) in several
  `echo` lines, which render as `ÔÇö` in cmd.exe's default codepage
  (not UTF-8). Replaced every non-ASCII character with plain ASCII so
  output is readable regardless of the terminal's codepage.

## 2026-08 — deploy.bat: fix Ctrl+C killing the whole script

`npm run preview` was called directly in the main script, so pressing
Ctrl+C in that window triggered cmd.exe's own "Terminate batch job (Y/N)?"
prompt — answering Y exited the whole script before it ever reached the
commit/push step. Fixed by opening the preview server in its own window
(`start "Portfolio Preview" cmd /k npm run preview`) and `pause`-ing in the
main window instead; Ctrl+C (or just closing the window) in the preview
window no longer touches the script that's waiting to ask for a commit
message. The preview window is torn down automatically via `taskkill`
before the commit prompt.

## 2026-08 — CI/CD pipeline + role content update

- **CI/CD**: added `.github/workflows/ci.yml` (lint + test + build on every
  push to a non-main branch and every PR into main) alongside a rewritten
  `deploy.yml` — deploy to GitHub Pages now runs in two jobs, `test` (lint,
  test, build) gating `deploy`, instead of building straight to Pages with
  no checks. `deploy.bat` mirrors the same lint → test → build → preview
  sequence locally before it will commit and push.
- **Test suite**: added `vitest` (jsdom) with 8 spec files — unit tests for
  `data.js` content integrity (`helpers.js`, `html.js`, `ui.js`) and
  regression tests that boot the real app (`router.test.js`,
  `contact-form.test.js`, `project-details.test.js`, `toolkit.test.js`).
  Caught a real bug on first run: the "UniVerse DB" toolkit entry linked to
  project id `uvdiag`, which doesn't exist — the real id is
  `uvdiag-lock-analysis` — so that link silently did nothing. Fixed.
- **Linting**: added `eslint` (flat config) — `npm run lint` / `lint:fix`.
- **Role content**: added "Implement technical changes and releases
  directly into client production environments" and "Install and upgrade
  client systems to new software versions and patch releases" to the
  Ultradata Work entry and `README.md`. Added a matching Toolkit entry,
  "Production deployments & upgrades" (Operations), bringing the toolkit
  to 19 tools.

Files touched: `package.json`, `eslint.config.js` (new), `vitest.config.js`
(new), `test/**` (new), `.github/workflows/ci.yml` (new),
`.github/workflows/deploy.yml`, `deploy.bat`, `.gitignore`, `src/data.js`,
`src/pages/home.js`, `src/components/router.js` (removed a dead
`currentPage` variable lint flagged), `README.md`.

## 2026-08 — Design refresh (near-black + blue glow)

A full visual and content redesign, implemented from a Claude Design handoff.

- **Visual system**: new near-black (`#09090B`) / paper-light (`#FAFAFC`) theme
  with a soft ambient blue bloom behind the page (two drifting radial-gradient
  layers), replacing the flat off-white/near-black theme and the hero-only glow.
- **Job title corrected everywhere**: "Technical Support Consultant" (not
  "Assistant Technical Support Manager") — across the site, `README.md`,
  `index.html` meta/OG/Twitter/JSON-LD, and `public/og-preview.svg`.
- **New Toolkit page** (`/#toolkit`): 18 tools, filterable by category
  (Banking systems / Operations / Client & leadership / Studying now), each
  opening a sticky detail panel with what it is, how it's used, and — where
  one exists — a link through to the project it produced. Replaces the old
  30-item, 6-category "Skills" grid and its click-to-expand pill popovers.
- **Home page rebuilt**: fixed headline (no more rotating phrase ticker),
  a "Current" callout, a "Selected work" pair of project cards, and an
  "Elsewhere on this site" card grid.
- **Project detail pages simplified**: all six now use one shared template
  (overview, "what it does" points, one code block, a Built-with/Context/Status
  sidebar, prev/next navigation) instead of bespoke multi-section write-ups
  per project.
- **Work page**: bullets rewritten around the Technical Support Consultant
  role; the old '30+ Cases / month' and '#1 Escalation point' stats moved
  from the home hero into a metric row on the Ultradata entry; the Skills
  grid replaced by a compact "What I work in" 3-column list.
- **Live Melbourne clock** in the footer next to a slow pulsing dot.
- **`deploy.bat`** added at the repo root (previously a private, gitignored
  script) — installs, builds, runs a local preview, then commits and pushes
  on confirmation. `.github/workflows/deploy.yml` is unchanged.

Files touched: `src/data.js`, `src/styles.css`, `src/main.js`, all of
`src/pages/*.js` (including new `toolkit.js`), `src/components/router.js`,
`src/components/ui.js`, `src/components/icons.js`, `src/components/helpers.js`,
`src/components/footer.js`, `index.html`, `public/og-preview.svg`,
`public/sitemap.xml`, `README.md`, `deploy.bat`, `.gitignore`.

## Earlier — Craft-level polish pass

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
