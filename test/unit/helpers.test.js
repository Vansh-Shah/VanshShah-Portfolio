import { describe, it, expect } from 'vitest';
import {
  secLabel,
  tagPill,
  tagCloud,
  infoGrid,
  workCategories,
  jobMetrics,
  jobEntry,
  backBtn,
} from '../../src/components/helpers.js';

describe('secLabel', () => {
  it('renders the given text inside a heading', () => {
    expect(secLabel('Work')).toContain('<p class="eyebrow eyebrow--muted">Work</p>');
  });
});

describe('tagPill / tagCloud', () => {
  it('wraps text in a tag pill span', () => {
    expect(tagPill('SQL')).toBe('<span class="tag-pill">SQL</span>');
  });

  it('renders one pill per item, concatenated', () => {
    const out = tagCloud(['SQL', 'Git']);
    expect(out).toBe('<span class="tag-pill">SQL</span><span class="tag-pill">Git</span>');
  });

  it('renders nothing for an empty list', () => {
    expect(tagCloud([])).toBe('');
  });
});

describe('infoGrid', () => {
  it('renders a cell per [title, body] pair', () => {
    const out = infoGrid([['Degree', 'Master of Cybersecurity'], ['Uni', 'UNSW']]);
    expect(out).toContain('Degree');
    expect(out).toContain('Master of Cybersecurity');
    expect(out).toContain('Uni');
    expect((out.match(/info-cell-title/g) || []).length).toBe(2);
  });
});

describe('workCategories', () => {
  it('renders every category label and its items', () => {
    const out = workCategories([
      ['Banking systems', ['Core banking platforms', 'UniVerse DB']],
      ['Operations', ['SSL/TLS certificates']],
    ]);
    expect(out).toContain('Banking systems');
    expect(out).toContain('Core banking platforms');
    expect(out).toContain('Operations');
    expect(out).toContain('SSL/TLS certificates');
    expect((out.match(/class="reveal work-cat"/g) || []).length).toBe(2);
  });

  it('includes the "What I work in" section label', () => {
    expect(workCategories([['A', ['x']]])).toContain('What I work in');
  });
});

describe('jobMetrics', () => {
  it('renders a metric card per [num, label] pair', () => {
    const out = jobMetrics([['30+', 'Cases / month'], ['#1', 'Escalation point']]);
    expect(out).toContain('30+');
    expect(out).toContain('Cases / month');
    expect((out.match(/metric-card/g) || []).length).toBe(2);
  });

  it('renders an empty string when there are no metrics', () => {
    expect(jobMetrics(null)).toBe('');
    expect(jobMetrics(undefined)).toBe('');
  });
});

describe('jobEntry', () => {
  const baseJob = {
    role: 'Technical Support Consultant',
    company: 'Ultradata Australia',
    loc: 'Malvern, Victoria',
    dates: 'Feb 2024 — Present',
    context: 'Core banking support.',
    points: ['Maintain SQL databases', 'Handle SSL/TLS certificates'],
  };

  it('renders the role, company, dates and every bullet point', () => {
    const out = jobEntry(baseJob);
    expect(out).toContain(baseJob.role);
    expect(out).toContain(baseJob.company);
    expect(out).toContain(baseJob.dates);
    baseJob.points.forEach(pt => expect(out).toContain(pt));
    expect((out.match(/class="bullet"/g) || []).length).toBe(baseJob.points.length);
  });

  it('omits the badge and website link when absent', () => {
    const out = jobEntry(baseJob);
    expect(out).not.toContain('job-badge');
    expect(out).not.toContain('job-website-link');
  });

  it('includes the badge when present', () => {
    const out = jobEntry({ ...baseJob, badge: '3rd Place · Intl' });
    expect(out).toContain('job-badge');
    expect(out).toContain('3rd Place · Intl');
  });

  it('includes a website link only when a website is given', () => {
    expect(jobEntry({ ...baseJob, website: 'https://redbackbots.com/' }))
      .toContain('https://redbackbots.com/');
  });

  it('renders metric cards when the job has metrics', () => {
    const out = jobEntry({ ...baseJob, metrics: [['30+', 'Cases / month']] });
    expect(out).toContain('metric-card');
    expect(out).toContain('30+');
  });
});

describe('backBtn', () => {
  it('renders a button that can be located by its id', () => {
    expect(backBtn()).toContain('id="backToProjects"');
  });
});
