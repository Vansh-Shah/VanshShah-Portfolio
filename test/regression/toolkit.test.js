// ── toolkit.test.js — interactive Toolkit page regression tests ───────────
// Covers the filter chips, tool grid selection, and the sticky detail
// panel's link-through to a project — the most stateful page on the site,
// and the easiest one to silently break with a data.js edit.
import { describe, it, expect, beforeEach } from 'vitest';
import { mountApp } from '../helpers/dom.js';
import { renderToolkit, initToolkit } from '../../src/pages/toolkit.js';
import { TOOLS, CATS } from '../../src/data.js';

function mountToolkit() {
  mountApp();
  document.getElementById('main').innerHTML = renderToolkit();
  initToolkit();
}

describe('toolkit page', () => {
  beforeEach(() => {
    mountToolkit();
  });

  it('shows every tool and the full count on load', () => {
    expect(document.querySelectorAll('.tool-card').length).toBe(TOOLS.length);
    expect(document.getElementById('toolkitCount').textContent).toBe(`${TOOLS.length} tools`);
  });

  it('renders one filter chip per category, starting on "Everything"', () => {
    expect(document.querySelectorAll('.toolkit-chip').length).toBe(CATS.length);
    expect(document.querySelector('.toolkit-chip--active').textContent).toBe('Everything');
  });

  it('filtering by category narrows the grid and updates the count', () => {
    const opsChip = [...document.querySelectorAll('.toolkit-chip')].find(c => c.dataset.cat === 'ops');
    const expectedCount = TOOLS.filter(t => t.cat === 'ops').length;

    opsChip.click();

    expect(document.querySelectorAll('.tool-card').length).toBe(expectedCount);
    expect(document.getElementById('toolkitCount').textContent).toBe(`${expectedCount} of ${TOOLS.length} tools`);
    expect(opsChip.classList.contains('toolkit-chip--active')).toBe(true);
  });

  it('selecting a tool updates the detail panel with its name, what-it-is and how-I-use-it text', () => {
    const target = TOOLS.findIndex(t => t.name === 'UniVerse DB');
    document.querySelector(`.tool-card[data-index="${target}"]`).click();

    const panel = document.getElementById('toolkitPanel');
    expect(panel.querySelector('.toolkit-panel-name').textContent).toBe('UniVerse DB');
    expect(panel.textContent).toContain(TOOLS[target].what);
    expect(panel.textContent).toContain(TOOLS[target].how);
  });

  it('shows a project link in the panel only for tools that produced one', () => {
    const withProject = TOOLS.findIndex(t => t.project);
    document.querySelector(`.tool-card[data-index="${withProject}"]`).click();
    expect(document.querySelector('.toolkit-panel-link')).toBeTruthy();

    const withoutProject = TOOLS.findIndex(t => !t.project);
    document.querySelector(`.tool-card[data-index="${withoutProject}"]`).click();
    expect(document.querySelector('.toolkit-panel-link')).toBeFalsy();
  });

  it('clicking the project link hands off to openProject with the right id', () => {
    const calls = [];
    window.openProject = id => calls.push(id);

    const target = TOOLS.findIndex(t => t.project);
    document.querySelector(`.tool-card[data-index="${target}"]`).click();
    document.querySelector('.toolkit-panel-link').click();

    expect(calls).toEqual([TOOLS[target].project]);
  });
});
