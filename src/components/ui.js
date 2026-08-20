// ── ui.js — shared UI helpers ─────────────────────────────────────────────
// Fingerprint specs light-only (theme: light) — the dark mode toggle lives
// separately in theme.js as a deliberate departure from the spec, so it
// doesn't get tangled up with this file's non-theme UI wiring.

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

let progressTicking = false;
function updateProgress() {
  const max = document.body.scrollHeight - window.innerHeight;
  document.getElementById('prog').style.width = max > 0
    ? (window.scrollY / max * 100) + '%'
    : '0%';
}
function onScrollProgress() {
  if (progressTicking) return;
  progressTicking = true;
  requestAnimationFrame(() => { updateProgress(); progressTicking = false; });
}

// ── Init (called once on boot) ──

export function initUI() {
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
  window.addEventListener('scroll', onScrollProgress, { passive: true });

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
    const firstItem = mobileMenu.querySelector('button');
    if (firstItem) firstItem.focus();
  }

  hamburgerBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

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

  // Nav "Get in touch" CTA (filled button, top right)
  const navCta = document.getElementById('nav-contact-cta');
  navCta?.addEventListener('click', () => window.goTo('contact'));
}
