// ── test/setup.js — jsdom polyfills for browser APIs the app relies on
// that jsdom doesn't implement (IntersectionObserver, matchMedia, rAF).
import { vi } from 'vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

// jsdom ships its own scrollTo that logs a "not implemented" warning when
// called — replace it with a silent no-op instead of only filling gaps.
window.scrollTo = () => {};

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = cb => setTimeout(cb, 0);
}
