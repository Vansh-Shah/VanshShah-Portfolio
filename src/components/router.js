// ── router.js — navigation ────────────────────────────────────────────────
import { renderHome, initHome } from '../pages/home.js';
import { renderStory }     from '../pages/story.js';
import { renderWork }      from '../pages/work.js';
import { renderEducation } from '../pages/education.js';
import { renderProjects, initProjects, initProjectDetail, openProject } from '../pages/projects.js';
import { renderToolkit, initToolkit } from '../pages/toolkit.js';
import { renderContact, initContact } from '../pages/contact.js';
import { renderNotFound }              from '../pages/notfound.js';
import { initReveal, animateCounters } from './ui.js';

const PAGES = {
  home:      renderHome,
  story:     renderStory,
  work:      renderWork,
  education: renderEducation,
  projects:  renderProjects,
  toolkit:   renderToolkit,
  contact:   renderContact,
};

export function goTo(page, pushState = true) {
  if (pushState) {
    history.pushState({ page }, '', `#${page}`);
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

// Navigate to whatever the URL hash says — used on initial page load so
// deep links like #work or #projects/ssl-monitor actually open that view.
// An unrecognised page, or a project id that doesn't exist, renders 404.
export function navigateFromHash() {
  const raw = location.hash.replace('#', '');
  const [page, projectId] = raw.split('/');

  if (page && !PAGES[page]) {
    renderNotFoundPage(raw);
    return;
  }

  const target = page || 'home';
  history.replaceState(
    { page: target, projectId: projectId || null },
    '',
    target === 'projects' && projectId ? `#projects/${projectId}` : `#${target}`
  );
  goTo(target, false);
  if (target === 'projects' && projectId) {
    const found = openProject(projectId, false);
    if (!found) renderNotFoundPage(raw);
  }
}

export function initRouter() {
  // Handle browser back/forward and mouse back/forward buttons —
  // including in and out of project detail views
  window.addEventListener('popstate', e => {
    const { page = 'home', projectId = null } = e.state || {};
    goTo(page, false); // false = don't push another entry, we're navigating existing history
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
