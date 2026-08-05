// ── ui.test.js ──────────────────────────────────────────────────────────
// initUI()'s DOM wiring (theme toggle, mobile menu, arrow-key nav) is
// exercised end-to-end by test/regression/router.test.js, which boots the
// real app. Here we only unit-test the two pure-DOM helpers that don't
// need the full page shell.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initReveal, animateCounters } from '../../src/components/ui.js';

describe('initReveal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="reveal visible" id="a"></div>
      <div class="reveal-group visible" id="b"></div>
      <div id="c"></div>`;
  });

  it('clears the "visible" class from every .reveal / .reveal-group element so it can re-animate in', () => {
    initReveal();
    expect(document.getElementById('a').classList.contains('visible')).toBe(false);
    expect(document.getElementById('b').classList.contains('visible')).toBe(false);
  });

  it('leaves unrelated elements untouched', () => {
    initReveal();
    expect(document.getElementById('c')).toBeTruthy();
  });
});

describe('animateCounters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('jumps straight to the final value when prefers-reduced-motion is on', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true });
    document.body.innerHTML = `
      <div data-count="6" data-suffix="+" id="statA"></div>
      <div data-count="80" data-suffix="%" id="statB"></div>`;

    animateCounters();

    expect(document.getElementById('statA').textContent).toBe('6+');
    expect(document.getElementById('statB').textContent).toBe('80%');
  });

  it('does nothing when there are no [data-count] elements on the page', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true });
    document.body.innerHTML = '<div id="empty"></div>';
    expect(() => animateCounters()).not.toThrow();
  });
});
