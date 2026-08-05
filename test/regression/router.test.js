// ── router.test.js — end-to-end navigation regression tests ───────────────
// Boots the real app (main.js) against the real index.html markup and
// drives it the way a visitor would: clicking nav buttons, using
// browser back/forward, and following deep links. Catches regressions
// where a page render breaks or a nav id / hash route gets renamed.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mountApp } from '../helpers/dom.js';

async function bootApp(hash = '') {
  vi.resetModules();
  mountApp();
  location.hash = hash;
  await import('../../src/main.js');
}

describe('app boot & routing', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the home page by default', async () => {
    await bootApp();
    expect(document.getElementById('main').innerHTML).toContain('hero-headline');
    expect(document.getElementById('nav-home').classList.contains('active')).toBe(true);
  });

  it('navigates to every primary page via its nav button and updates the URL hash', async () => {
    await bootApp();
    const pages = {
      story: 'The story',
      work: 'Work',
      education: 'Education',
      projects: 'Projects',
      toolkit: 'Toolkit',
      contact: 'Contact',
    };
    for (const [page, label] of Object.entries(pages)) {
      document.getElementById('nav-' + page).click();
      expect(document.getElementById('main').innerHTML).toContain(`>${label}<`);
      expect(location.hash).toBe('#' + page);
      expect(document.getElementById('nav-' + page).classList.contains('active')).toBe(true);
    }
  });

  it('responds to browser back/forward via popstate without pushing new history entries', async () => {
    await bootApp();
    document.getElementById('nav-work').click();
    expect(document.getElementById('main').innerHTML).toContain('>Work<');

    window.dispatchEvent(new PopStateEvent('popstate', { state: { page: 'home' } }));
    expect(document.getElementById('main').innerHTML).toContain('hero-headline');
    expect(document.getElementById('nav-home').classList.contains('active')).toBe(true);
  });

  it('opens a project detail page from a deep link on load', async () => {
    await bootApp('#projects/ssl-monitor');
    expect(document.getElementById('main').innerHTML).toContain('SSL/TLS Certificate Monitor');
    expect(document.getElementById('backToProjects')).toBeTruthy();
  });

  it('falls back to the home page for an unknown hash', async () => {
    await bootApp('#not-a-real-page');
    expect(document.getElementById('main').innerHTML).toContain('hero-headline');
    expect(location.hash).toBe('#home');
  });

  it('wires up the mobile nav so it navigates and closes the menu', async () => {
    await bootApp();
    document.getElementById('mnav-toolkit').click();
    expect(document.getElementById('main').innerHTML).toContain('>Toolkit<');
    expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(false);
  });
});
