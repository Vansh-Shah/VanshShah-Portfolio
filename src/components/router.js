// ── router.js — navigation & phrase ticker ───────────────────────────────
import { renderHome, initHome } from '../pages/home.js';
import { renderStory }     from '../pages/story.js';
import { renderWork }      from '../pages/work.js';
import { renderEducation } from '../pages/education.js';
import { renderProjects, initProjects, initProjectDetail } from '../pages/projects.js';
import { renderContact, initContact } from '../pages/contact.js';
import { initReveal, animateCounters } from './ui.js';
import { PHRASES } from '../data.js';

const PAGES = {
  home:      renderHome,
  story:     renderStory,
  work:      renderWork,
  education: renderEducation,
  projects:  renderProjects,
  contact:   renderContact,
};

let currentPage    = 'home';
let phraseInterval = null;
let phraseIdx      = 0;

export function goTo(page, pushState = true) {
  currentPage = page;

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

  // Wire up reveal animations after DOM settles
  requestAnimationFrame(() => requestAnimationFrame(() => {
    initReveal();
    if (page === 'home') {
      initHome();
      startPhrases();
      setTimeout(animateCounters, 300);
    }
    if (page === 'contact') initContact();
    if (page === 'projects') {
      initProjects();
      initProjectDetail();
    }
  }));
}

function startPhrases() {
  if (phraseInterval) clearInterval(phraseInterval);
  phraseIdx = 0;
  phraseInterval = setInterval(() => {
    const el = document.getElementById('phrase');
    if (!el) { clearInterval(phraseInterval); return; }
    el.style.opacity   = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      phraseIdx = (phraseIdx + 1) % PHRASES.length;
      const e2 = document.getElementById('phrase');
      if (e2) {
        e2.textContent     = PHRASES[phraseIdx];
        e2.style.opacity   = '1';
        e2.style.transform = 'translateY(0)';
      }
    }, 380);
  }, 2800);
}

export function initRouter() {
  // Set the initial history entry for home without pushing a new one
  // (main.js calls goTo('home') with pushState=false right after this)
  history.replaceState({ page: 'home' }, '', '#home');

  // Handle browser back/forward and mouse back/forward buttons
  window.addEventListener('popstate', e => {
    const page = e.state?.page || 'home';
    goTo(page, false); // false = don't push another entry, we're navigating existing history
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
