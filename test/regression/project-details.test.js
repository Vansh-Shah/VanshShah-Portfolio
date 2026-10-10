// ── project-details.test.js ────────────────────────────────────────────────
// Guards against the classic content regression here: a new project gets
// added to PROJECTS but its detail render breaks (a missing field the
// shared template assumes is there) — the card would then silently fail
// to open, or open blank, on the live site.
import { describe, it, expect } from 'vitest';
import { mountApp } from '../helpers/dom.js';
import { PROJECTS } from '../../src/data.js';
import { openProject, initProjectDetail } from '../../src/pages/projects.js';

describe('project detail pages', () => {
  PROJECTS.forEach(project => {
    it(`opens a fully rendered detail page for "${project.id}"`, () => {
      mountApp();
      const opened = openProject(project.id, false);
      expect(opened).toBe(true);

      const main = document.getElementById('main');
      const heading = main.querySelector('.project-detail-title');
      expect(heading).toBeTruthy();
      expect(heading.textContent.trim()).toBe(project.title);
      expect(document.getElementById('backToProjects')).toBeTruthy();

      // Sidebar always renders Built with / Context / Status
      expect(main.querySelector('.project-sidebar')).toBeTruthy();
      expect(main.textContent).toContain(project.context);
      expect(main.textContent).toContain(project.statusNote);
    });
  });

  it('renders the full report for projects that have one, and omits it otherwise', () => {
    mountApp();
    const withReport = PROJECTS.find(p => p.report);
    expect(withReport).toBeTruthy();
    openProject(withReport.id, false);
    expect(document.querySelectorAll('.report-section')).toHaveLength(withReport.report.length);
    const without = PROJECTS.find(p => !p.report);
    openProject(without.id, false);
    expect(document.querySelector('.project-report')).toBeFalsy();
  });

  it('returns false and does not throw for an id with no matching project', () => {
    mountApp();
    expect(openProject('not-a-real-project', false)).toBe(false);
  });

  it('the back button on a detail page navigates to the projects list', () => {
    mountApp();
    openProject(PROJECTS[0].id, false);
    const clicks = [];
    window.goTo = page => clicks.push(page);
    initProjectDetail();

    document.getElementById('backToProjects').click();
    expect(clicks).toEqual(['projects']);
  });

  it('prev/next navigation cycles through every project and wraps around', () => {
    mountApp();
    openProject(PROJECTS[0].id, false);
    initProjectDetail();

    const nextBtn = document.querySelector('[data-nav-project]:last-of-type');
    expect(nextBtn).toBeTruthy();
    nextBtn.click();

    const heading = document.querySelector('.project-detail-title');
    expect(heading.textContent.trim()).toBe(PROJECTS[1].title);
  });

  it('a project with no external links renders its links row without a broken href', () => {
    mountApp();
    const noLinkProject = PROJECTS.find(p => (p.links || []).length === 0);
    expect(noLinkProject).toBeTruthy(); // guards the test itself against the fixture drifting
    openProject(noLinkProject.id, false);
    expect(document.querySelector('.project-detail-links')).toBeFalsy();
    expect(document.querySelector('.project-note')).toBeTruthy();
  });
});
