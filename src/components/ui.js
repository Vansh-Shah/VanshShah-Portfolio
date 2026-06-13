// ── ui.js — shared UI helpers ─────────────────────────────────────────────
import { SKILL_INFO } from '../data.js';
import { Icons } from './icons.js';

let activePill  = null;
let popupLocked = false; // prevents the same click from opening then immediately closing

// ── Skill pills ──

export function pillsHtml(arr) {
  return arr
    .map(s => `<span class="pill" data-skill="${s.replace(/"/g, '&quot;')}" role="button" tabindex="0" aria-label="${s} — click for details">${s}</span>`)
    .join('');
}

function showSkillInfo(el) {
  const popup = document.getElementById('skill-popup');
  const skill  = el.dataset.skill || el.textContent.trim();
  const info   = SKILL_INFO[skill];
  if (!info) return;

  // Toggle off if same pill clicked again
  if (activePill === el && popup.style.display !== 'none') {
    hidePopup();
    return;
  }

  if (activePill) activePill.classList.remove('active-pill');
  activePill = el;
  el.classList.add('active-pill');

  popup.innerHTML = `
    <div>
      <div style="font-size:12px;font-weight:500;color:var(--accent);margin-bottom:6px;letter-spacing:.04em">${skill}</div>
      <div style="font-size:13px;color:var(--body);line-height:1.7">${info}</div>
    </div>`;

  popup.style.display = 'block';

  // Position near the pill, keep within viewport
  const pw = 280;
  const ph = popup.offsetHeight || 120;
  const rect = el.getBoundingClientRect();
  let left = rect.left;
  let top  = rect.bottom + 8;
  if (left + pw > window.innerWidth  - 12) left = window.innerWidth  - pw - 12;
  if (left < 8)                             left = 8;
  if (top  + ph > window.innerHeight - 12) top  = rect.top - ph - 8;
  popup.style.left = left + 'px';
  popup.style.top  = top  + 'px';

  // Lock briefly so the document click fired by the same mouseup doesn't dismiss it
  popupLocked = true;
  setTimeout(() => { popupLocked = false; }, 50);
}

export function hidePopup() {
  if (popupLocked) return;
  const popup = document.getElementById('skill-popup');
  if (popup) popup.style.display = 'none';
  if (activePill) { activePill.classList.remove('active-pill'); activePill = null; }
}

// ── Scroll reveal ──

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

export function initReveal() {
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
    el.classList.remove('visible');
    revealObserver.observe(el);
  });
}

// ── Stat counters ──

export function animateCounters() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach(el => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const isInt    = Number.isInteger(target);
    if (reduce) { el.textContent = (isInt ? target : target.toFixed(1)) + suffix; return; }
    const duration = 900;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = (isInt ? Math.round(target * eased) : (target * eased).toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── Scroll progress bar ──

function updateProgress() {
  const max = document.body.scrollHeight - window.innerHeight;
  document.getElementById('prog').style.width = max > 0
    ? (window.scrollY / max * 100) + '%'
    : '0%';
}

// ── Init (called once on boot) ──

export function initUI() {
  // Resolve theme: saved choice wins, else follow system preference.
  // (HTML defaults to .dark, so only act when light is wanted.)
  (function resolveTheme() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    const prefersLight = window.matchMedia
      && window.matchMedia('(prefers-color-scheme: light)').matches;
    const wantLight = saved === 'light' || (saved === null && prefersLight);
    if (wantLight) {
      const app = document.getElementById('app');
      const tog = document.getElementById('togBtn');
      const meta = document.getElementById('themeColorMeta');
      app.classList.remove('dark');
      if (tog) {
        tog.innerHTML = Icons.moon;
        tog.setAttribute('aria-pressed', 'false');
        tog.setAttribute('aria-label', 'Switch to dark mode');
      }
      if (meta) meta.content = '#FAFAF8';
    }
  })();


  // Pill clicks — event delegation so it works after every re-render
  document.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (pill) {
      showSkillInfo(pill);
    } else {
      hidePopup();
    }
  });

  // Pill keyboard support
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('pill')) {
      e.preventDefault();
      showSkillInfo(e.target);
    }
    if (e.key === 'Escape') {
      popupLocked = false;
      hidePopup();
    }
  });

  // Arrow key navigation between nav buttons (WCAG menubar pattern)
  const navLinks = document.querySelector('.nav-links');
  navLinks.addEventListener('keydown', e => {
    const navBtns = [...navLinks.querySelectorAll('button.np')];
    const idx = navBtns.indexOf(document.activeElement);
    if (idx === -1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      navBtns[(idx + 1) % navBtns.length].focus();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navBtns[(idx - 1 + navBtns.length) % navBtns.length].focus();
    }
    if (e.key === 'Home') { e.preventDefault(); navBtns[0].focus(); }
    if (e.key === 'End')  { e.preventDefault(); navBtns[navBtns.length - 1].focus(); }
  });

  // Scroll progress
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Mobile menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    // Focus first item in mobile menu
    const firstItem = mobileMenu.querySelector('button');
    if (firstItem) firstItem.focus();
  }

  hamburgerBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close mobile menu on Escape
  mobileMenu.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMobileMenu(); hamburgerBtn.focus(); }
  });

  document.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && e.target !== hamburgerBtn) closeMobileMenu();
  });

  // Nav logo
  const navLogo = document.getElementById('nav-logo');
  navLogo.addEventListener('click', () => window.goTo('home'));
  navLogo.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.goTo('home'); }
  });

  // Theme toggle — swap SVG icon, persist choice, update aria + meta
  const togBtn    = document.getElementById('togBtn');
  const themeMeta = document.getElementById('themeColorMeta');
  const sunSVG  = Icons.sun;
  const moonSVG = Icons.moon;
  togBtn.addEventListener('click', () => {
    const isDark = document.getElementById('app').classList.toggle('dark');
    togBtn.innerHTML = isDark ? sunSVG : moonSVG;
    togBtn.setAttribute('aria-pressed', String(isDark));
    togBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeMeta) themeMeta.content = isDark ? '#0D0D0C' : '#FAFAF8';
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });
}
