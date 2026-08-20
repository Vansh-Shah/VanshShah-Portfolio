// ── components/theme.js ──────────────────────────────────────────────────
// Light/dark toggle. The Fingerprint design.md specs light-only — this is
// a deliberate departure at the user's request, so it stays isolated here
// rather than woven through the token system the spec defines.
const STORAGE_KEY = 'theme';

function applyLabel(dark) {
  const toggle = document.getElementById('themeToggle');
  const label  = document.getElementById('themeToggleLabel');
  if (label) label.textContent = dark ? 'Light' : 'Dark';
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

export function initTheme() {
  const root = document.documentElement;

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const wantDark = saved === 'dark' || (saved === null && prefersDark);

  root.classList.toggle('dark', wantDark);
  applyLabel(wantDark);

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    applyLabel(isDark);
    try { localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light'); } catch (e) {}
  });
}
