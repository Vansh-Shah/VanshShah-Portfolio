// ── router.js — navigation ────────────────────────────────────────────────
// Real path-based routing (/work, /projects/ssl-monitor) rather than hash
// fragments, so every page is its own indexable URL. The build prerenders a
// static HTML file per route, so a direct hit or a crawler gets real content
// and this script only takes over for subsequent in-page navigation.
import { renderHome, initHome } from '../pages/home.js';
import { renderStory }     from '../pages/story.js';
import { renderWork }      from '../pages/work.js';
import { renderEducation } from '../pages/education.js';
import { renderProjects, initProjects, initProjectDetail, openProject } from '../pages/projects.js';
import { renderToolkit, initToolkit } from '../pages/toolkit.js';
import { renderContact, initContact } from '../pages/contact.js';
import { renderNotFound }              from '../pages/notfound.js';
import { initReveal, animateCounters } from './ui.js';
import { metaFor, SITE_URL }           from '../seo.js';
import { BASE, pathFor, parseLocation } from './paths.js';

export { pathFor, parseLocation };

const PAGES = {
  home:      renderHome,
  story:     renderStory,
  work:      renderWork,
  education: renderEducation,
  projects:  renderProjects,
  toolkit:   renderToolkit,
  contact:   renderContact,
};

// Keeps the tab title, meta description and canonical link in step with
// client-side navigation — prerendered HTML already ships the right values,
// this covers every navigation after the first paint.
function applyMeta(page, projectId) {
  const meta = metaFor(page, projectId);
  document.title = meta.title;

  const set = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('link[rel="canonical"]', 'href', SITE_URL + meta.path);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', SITE_URL + meta.path);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
}

export function goTo(page, pushState = true, projectId = null) {
  if (pushState) {
    history.pushState({ page, projectId }, '', pathFor(page, projectId));
  }

  // Update desktop + mobile nav active states
  document.querySelectorAll('.np').forEach(b => b.classList.remove('active'));
  ['nav-', 'mnav-'].forEach(prefix => {
    const el = document.getElementById(prefix + page);
    if (el) el.classList.add('active');
  });

  // Render page
  const renderer = PAGES[page] || renderHome;
  document.getElementById('main').innerHTML = renderer();
  applyMeta(page, projectId);

  window.scrollTo(0, 0);
  // Move focus to main content for keyboard and screen reader users
  const main = document.getElementById('main');
  if (main) main.focus();

  // Generic wiring for any [data-page] button rendered by a page (CTAs,
  // "elsewhere on this site" cards, back-to-work links, etc.)
  document.querySelectorAll('#main [data-page]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.page));
  });

  // Wire up reveal animations after DOM settles
  requestAnimationFrame(() => requestAnimationFrame(() => {
    initReveal();
    if (page === 'home') {
      initHome();
      setTimeout(animateCounters, 300);
    }
    if (page === 'contact')  initContact();
    if (page === 'toolkit')  initToolkit();
    if (page === 'projects') {
      initProjects();
      initProjectDetail();
    }
  }));
}

// Renders the 404 page in place, without touching the URL — a bad link
// should stay a bad link in the address bar, not silently redirect.
function renderNotFoundPage(path) {
  document.querySelectorAll('.np').forEach(b => b.classList.remove('active'));
  const main = document.getElementById('main');
  main.innerHTML = renderNotFound(path);
  main.focus();
  requestAnimationFrame(() => requestAnimationFrame(() => initReveal()));
}

// The site used to use hash routes (#work, #projects/ssl-monitor). Anyone
// arriving on an old link gets swapped onto the equivalent real path rather
// than dumped on the home page.
function redirectLegacyHash() {
  const hash = location.hash.replace(/^#/, '');
  if (!hash) return false;
  const [page, projectId = null] = hash.split('/');
  if (!PAGES[page]) return false;

  history.replaceState({ page, projectId }, '', pathFor(page, projectId));
  goTo(page, false, projectId);
  if (page === 'projects' && projectId && !openProject(projectId, false)) {
    renderNotFoundPage(`projects/${projectId}`);
  }
  return true;
}

// Renders whatever the current URL points at — used on initial page load, so
// a direct hit on /work or /projects/ssl-monitor opens that view.
export function navigateFromLocation() {
  if (redirectLegacyHash()) return;

  const { page, projectId } = parseLocation();

  if (!PAGES[page]) {
    renderNotFoundPage(location.pathname.replace(BASE, ''));
    return;
  }

  history.replaceState({ page, projectId }, '', pathFor(page, projectId));
  goTo(page, false, projectId);

  if (page === 'projects' && projectId) {
    const found = openProject(projectId, false);
    if (!found) renderNotFoundPage(`projects/${projectId}`);
  }
}

export function initRouter() {
  // Handle browser back/forward and mouse back/forward buttons —
  // including in and out of project detail views
  window.addEventListener('popstate', e => {
    const { page = 'home', projectId = null } = e.state || parseLocation();
    if (!PAGES[page]) { renderNotFoundPage(page); return; }
    goTo(page, false, projectId); // false = don't push, we're moving through existing history
    if (page === 'projects' && projectId) openProject(projectId, false);
  });

  // Wire up desktop nav buttons
  Object.keys(PAGES).forEach(page => {
    const btn = document.getElementById('nav-' + page);
    if (btn) btn.addEventListener('click', () => goTo(page));
  });

  // Wire up mobile nav buttons (close menu after navigation)
  Object.keys(PAGES).forEach(page => {
    const btn = document.getElementById('mnav-' + page);
    if (btn) btn.addEventListener('click', () => {
      goTo(page);
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'false');
    });
  });
}
