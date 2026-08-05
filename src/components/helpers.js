// ── helpers.js — shared HTML building blocks ─────────────────────────────
// Small functions that build recurring UI patterns used across pages.
// Import only what you need in each page file.

import { html } from './html.js';

// ── Section label (the small ALL-CAPS tag above every section heading) ────
export function secLabel(text) {
  return html`
    <div class="sec-lbl reveal">
      <span class="sec-num">—</span>
      <h1 class="sec-tag">${text}</h1>
    </div>`;
}

// ── Tag pill (read-only, used in education subject clouds) ────────────────
export function tagPill(text) {
  return html`<span class="tag-pill">${text}</span>`;
}

export function tagCloud(items) {
  return items.map(tagPill).join('');
}

// ── Info grid (2-col card grid used in education) ─────────────────────────
export function infoGrid(items) {
  const cells = items.map(([title, body]) => html`
    <div class="info-cell">
      <div class="info-cell-title">${title}</div>
      <p class="info-cell-body">${body}</p>
    </div>`).join('');

  return html`<div class="info-grid reveal-group">${cells}</div>`;
}

// ── Work categories (compact "What I work in" block on the Work page) ────
export function workCategories(categories) {
  const cols = categories.map(([label, items]) => html`
    <div class="reveal work-cat">
      <div class="work-cat-label">${label}</div>
      <div class="work-cat-items">${items.join('<br />')}</div>
    </div>`).join('');

  return html`
    <div class="work-cats-wrap">
      <div class="sec-lbl sec-lbl--sm reveal">
        <span class="sec-num sec-num--sm">—</span>
        <p class="sec-tag">What I work in</p>
      </div>
      <div class="work-cats reveal-group">${cols}</div>
    </div>`;
}

// ── Job metrics row (stat cards inside a job entry) ───────────────────────
export function jobMetrics(metrics) {
  if (!metrics) return '';
  const cards = metrics.map(([num, label]) => html`
    <div class="metric-card">
      <div class="sy metric-num">${num}</div>
      <div class="metric-label">${label}</div>
    </div>`).join('');

  return html`<div class="metric-row reveal-group">${cards}</div>`;
}

// ── Single job entry (used in Work page) ─────────────────────────────────
export function jobEntry(job) {
  const bullets = job.points
    .map(pt => html`<li class="bullet">${pt}</li>`)
    .join('');

  return html`
    <div class="reveal">
      <div class="job-header">
        <div class="job-title-row">
          <h2 class="sy job-title">${job.role}</h2>
          ${job.badge ? html`<span class="job-badge">${job.badge}</span>` : ''}
        </div>
        <span class="job-dates">${job.dates}</span>
      </div>

      <div class="job-company-row">
        <p class="job-company">${job.company} · ${job.loc}</p>
        ${job.website ? html`
          <a href="${job.website}" target="_blank" rel="noopener noreferrer"
             class="job-website-link">Visit website ↗</a>` : ''}
      </div>

      ${jobMetrics(job.metrics)}

      <p class="job-context">${job.context}</p>
      <ul class="bullet-list">${bullets}</ul>
    </div>`;
}

// ── Back button (used on project detail pages) ────────────────────────────
export function backBtn() {
  return html`
    <button class="back-btn" id="backToProjects">
      ← Back to Projects
    </button>`;
}
