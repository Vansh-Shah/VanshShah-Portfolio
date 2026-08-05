// ── router.js — navigation ────────────────────────────────────────────────
import { renderHome, initHome } from '../pages/home.js';
import { renderStory }     from '../pages/story.js';
import { renderWork }      from '../pages/work.js';
import { renderEducation } from '../pages/education.js';
import { renderProjects, initProjects, initProjectDetail, openProject } from '../pages/projects.js';
import { renderToolkit, initToolkit } from '../pages/toolkit.js';
import { renderContact, initContact } from '../pages/contact.js';
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

// Navigate to whatever the URL hash says — used on initial page load so
// deep links like #work or #projects/ssl-monitor actually open that view.
export function navigateFromHash() {
  const [page, projectId] = location.hash.replace('#', '').split('/');
  const target = PAGES[page] ? page : 'home';
  history.replaceState(
    { page: target, projectId: projectId || null },
    '',
    target === 'projects' && projectId ? `#projects/${projectId}` : `#${target}`
  );
  goTo(target, false);
  if (target === 'projects' && projectId) openProject(projectId, false);
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
