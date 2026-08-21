// ── router.test.js — end-to-end navigation regression tests ───────────────
// Boots the real app (main.js) against the real index.html markup and
// drives it the way a visitor would: clicking nav buttons, using
// browser back/forward, and following deep links. Catches regressions
// where a page render breaks or a nav id / route path gets renamed.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mountApp } from '../helpers/dom.js';

// Routes are real paths now, so tests drive location.pathname rather than
// a hash. jsdom runs on a localhost origin, so the app's BASE resolves to ''
// here and paths look like '/work/'.
async function bootApp(pathname = '/') {
  vi.resetModules();
  mountApp();
  history.replaceState(null, '', pathname);
  await import('../../src/main.js');
}

describe('app boot & routing', () => {
  afterEach(() => {
    vi.useRealTimers();
    history.replaceState(null, '', '/');
  });

  it('renders the home page by default', async () => {
    await bootApp();
    expect(document.getElementById('main').innerHTML).toContain('hero-headline');
    expect(document.getElementById('nav-home').classList.contains('active')).toBe(true);
  });

  it('navigates to every primary page via its nav button and updates the URL path', async () => {
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
      expect(location.pathname).toBe(`/${page}/`);
      expect(document.getElementById('nav-' + page).classList.contains('active')).toBe(true);
    }
  });

  it('sets a per-page title and description as you navigate', async () => {
    await bootApp();
    document.getElementById('nav-work').click();
    expect(document.title).toContain('Work Experience');
    expect(document.querySelector('meta[name="description"]').getAttribute('content'))
      .toContain('Ultradata');
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
    await bootApp('/projects/ssl-monitor/');
    expect(document.getElementById('main').innerHTML).toContain('SSL/TLS Certificate Monitor');
    expect(document.getElementById('backToProjects')).toBeTruthy();
  });

  it('redirects a legacy #hash link onto the equivalent real path', async () => {
    vi.resetModules();
    mountApp();
    history.replaceState(null, '', '/');
    location.hash = '#work';
    await import('../../src/main.js');

    expect(location.pathname).toBe('/work/');
    expect(document.getElementById('main').innerHTML).toContain('>Work<');
  });

  it('renders the 404 page for an unknown path, preserving the URL', async () => {
    await bootApp('/not-a-real-page/');
    expect(document.getElementById('main').innerHTML).toContain("doesn't exist");
    expect(document.getElementById('main').innerHTML).toContain('not-a-real-page');
    expect(location.pathname).toBe('/not-a-real-page/');
  });

  it('renders the 404 page for a project id that does not exist', async () => {
    await bootApp('/projects/no-such-project/');
    expect(document.getElementById('main').innerHTML).toContain("doesn't exist");
  });

  it('wires up the mobile nav so it navigates and closes the menu', async () => {
    await bootApp();
    document.getElementById('mnav-toolkit').click();
    expect(document.getElementById('main').innerHTML).toContain('>Toolkit<');
    expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(false);
  });
});
