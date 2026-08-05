// ── data.test.js — content-integrity checks ───────────────────────────────
// These guard against the kind of regression that only shows up as a blank
// panel or a dead link on the live site: someone edits data.js and misses
// a cross-reference (a tool pointing at a project id that no longer exists,
// a duplicate id, a category typo the filter chips don't know about).
import { describe, it, expect } from 'vitest';
import { STATS, CATS, TOOLS, EXPERIENCE, WORK_CATEGORIES, STORY, EDUCATION, PROJECTS } from '../../src/data.js';

describe('STATS', () => {
  it('is a non-empty list with a display and label for every stat', () => {
    expect(STATS.length).toBeGreaterThan(0);
    STATS.forEach(s => {
      expect(s.display).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });
});

describe('CATS', () => {
  it('starts with the "all" filter', () => {
    expect(CATS[0][0]).toBe('all');
  });

  it('has no empty ids or labels', () => {
    CATS.forEach(([id, label]) => {
      expect(id.length).toBeGreaterThan(0);
      expect(label.length).toBeGreaterThan(0);
    });
  });

  it('has unique ids', () => {
    const ids = CATS.map(([id]) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('TOOLS', () => {
  const catIds = CATS.map(([id]) => id);
  const projectIds = PROJECTS.map(p => p.id);

  it('gives every tool a name, a real category, a cadence, and what/how text', () => {
    TOOLS.forEach(t => {
      expect(t.name).toBeTruthy();
      expect(catIds).toContain(t.cat);
      expect(t.cadence).toBeTruthy();
      expect(t.what).toBeTruthy();
      expect(t.how).toBeTruthy();
    });
  });

  it('has unique tool names', () => {
    const names = TOOLS.map(t => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every tool that links to a project points at a real project id and has a label', () => {
    TOOLS.filter(t => t.project).forEach(t => {
      expect(projectIds).toContain(t.project);
      expect(t.projectLabel).toBeTruthy();
    });
  });
});

describe('EXPERIENCE', () => {
  it('gives every job a role, company, dates and at least one bullet point', () => {
    EXPERIENCE.forEach(job => {
      expect(job.role).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.dates).toBeTruthy();
      expect(Array.isArray(job.points)).toBe(true);
      expect(job.points.length).toBeGreaterThan(0);
    });
  });

  it('gives every metric a [number, label] pair where present', () => {
    EXPERIENCE.filter(job => job.metrics).forEach(job => {
      job.metrics.forEach(metric => {
        expect(metric).toHaveLength(2);
        expect(metric[0]).toBeTruthy();
        expect(metric[1]).toBeTruthy();
      });
    });
  });
});

describe('WORK_CATEGORIES', () => {
  it('has no empty category labels or empty item lists', () => {
    WORK_CATEGORIES.forEach(([label, items]) => {
      expect(label.length).toBeGreaterThan(0);
      expect(items.length).toBeGreaterThan(0);
    });
  });
});

describe('STORY', () => {
  it('gives every chapter a title, period and body', () => {
    STORY.forEach(chapter => {
      expect(chapter.chapter).toBeTruthy();
      expect(chapter.period).toBeTruthy();
      expect(chapter.body).toBeTruthy();
    });
  });
});

describe('EDUCATION', () => {
  it('gives both degrees a status, degree name and body', () => {
    [EDUCATION.unsw, EDUCATION.rmit].forEach(deg => {
      expect(deg.status).toBeTruthy();
      expect(deg.degree).toBeTruthy();
      expect(deg.body).toBeTruthy();
    });
  });
});

describe('PROJECTS', () => {
  it('has a unique id for every project', () => {
    const ids = PROJECTS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every project a title, tag, status and blurb', () => {
    PROJECTS.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tag).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.blurb).toBeTruthy();
      expect(p.overview).toBeTruthy();
      expect(Array.isArray(p.points)).toBe(true);
      expect(p.points.length).toBeGreaterThan(0);
    });
  });

  it('gives every link a non-empty [label, href] pair', () => {
    PROJECTS.forEach(p => {
      (p.links || []).forEach(link => {
        expect(link).toHaveLength(2);
        const [label, href] = link;
        expect(label).toBeTruthy();
        expect(href).toBeTruthy();
      });
    });
  });
});
