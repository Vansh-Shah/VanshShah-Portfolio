// ── ui.js — shared UI helpers ─────────────────────────────────────────────

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

// ── Theme colours applied to the browser chrome (meta[theme-color]) ──
const THEME_META = { dark: '#09090b', light: '#fafafc' };

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
      const app  = document.getElementById('app');
      const tog  = document.getElementById('togBtn');
      const meta = document.getElementById('themeColorMeta');
      app.classList.remove('dark');
      if (tog) {
        const label = document.getElementById('togLabel');
        if (label) label.textContent = 'Dark';
        tog.setAttribute('aria-pressed', 'false');
        tog.setAttribute('aria-label', 'Switch to dark mode');
      }
      if (meta) meta.content = THEME_META.light;
    }
  })();

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

  // Theme toggle — swap label, persist choice, update aria + meta
  const togBtn    = document.getElementById('togBtn');
  const togLabel  = document.getElementById('togLabel');
  const themeMeta = document.getElementById('themeColorMeta');
  togBtn.addEventListener('click', () => {
    const isDark = document.getElementById('app').classList.toggle('dark');
    if (togLabel) togLabel.textContent = isDark ? 'Light' : 'Dark';
    togBtn.setAttribute('aria-pressed', String(isDark));
    togBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeMeta) themeMeta.content = isDark ? THEME_META.dark : THEME_META.light;
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });
}
