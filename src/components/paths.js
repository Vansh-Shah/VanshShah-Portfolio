// ── paths.js — URL construction for the path-based router ────────────────
// Kept separate from router.js so pages can build URLs without importing
// the router itself (which imports every page — a cycle).

// '' in dev, '/VanshShah-Portfolio' on GitHub Pages. Vite injects
// import.meta.env at build time; the Node-side prerender script has no such
// global, so fall back to the deployed base there.
const RAW_BASE = (typeof import.meta.env !== 'undefined' && import.meta.env?.BASE_URL)
  || '/VanshShah-Portfolio/';

export const BASE = RAW_BASE.replace(/\/+$/, '');

// Prefixes a path in /public with the deploy base, for URLs built in JS
// (Vite only rewrites these automatically in HTML and CSS).
export const asset = file => `${BASE}/${String(file).replace(/^\//, '')}`;

export function pathFor(page, projectId = null) {
  if (page === 'home') return BASE + '/';
  if (page === 'projects' && projectId) return `${BASE}/projects/${projectId}/`;
  return `${BASE}/${page}/`;
}

// Splits a URL into a route, independent of the deploy base path.
export function parseLocation(pathname = location.pathname) {
  let rest = pathname;
  if (BASE && rest.startsWith(BASE)) rest = rest.slice(BASE.length);
  rest = rest.replace(/^\/+|\/+$/g, '');
  if (!rest || rest === 'index.html') return { page: 'home', projectId: null };
  const [page, projectId = null] = rest.split('/');
  return { page, projectId };
}
