// ── helpers.js — shared HTML building blocks ─────────────────────────────
// Small functions that build recurring UI patterns used across pages.
// Import only what you need in each page file.

import { html }  from './html.js';
import { Icons } from './icons.js';

// ── Section label (small mono eyebrow above every section heading) ────────
export function secLabel(text) {
  return html`
    <div class="sec-lbl reveal">
      <p class="eyebrow eyebrow--muted">${text}</p>
    </div>`;
}

// ── Eyebrow label — spec's uppercase JetBrains Mono category marker ───────
export function eyebrow(text, { brand = false } = {}) {
  return html`<p class="eyebrow ${brand ? 'eyebrow--brand' : 'eyebrow--muted'}">${text}</p>`;
}

// ── Tag pill (read-only, used in education subject clouds + project stack) ─
// Accepts 'text' or ['text', 'tooltip']; tooltip shows on hover/focus/tap.
export function tagPill(item) {
  const [text, tip] = Array.isArray(item) ? item : [item];
  return tip
    ? html`<span class="tag-pill has-tip" tabindex="0" data-tip="${tip}">${text}</span>`
    : html`<span class="tag-pill">${text}</span>`;
}

export function tagCloud(items) {
  return items.map(i => tagPill(i)).join('');
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
      ${eyebrow('What I work in')}
      <div class="work-cats reveal-group">${cols}</div>
    </div>`;
}

// ── Job metrics row (stat cards inside a job entry) ───────────────────────
export function jobMetrics(metrics) {
  if (!metrics) return '';
  const cards = metrics.map(([num, label]) => html`
    <div class="metric-card">
      <div class="metric-num">${num}</div>
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
    <div class="reveal feature-card job-card">
      <div class="job-header">
        <div class="job-title-row">
          <h2 class="job-title">${job.role}</h2>
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

// ── Feature Card — spec component: white bg, hairline border, 12px radius,
//    small orange marker icon top-left ─────────────────────────────────────
export function featureCard(title, body) {
  return html`
    <div class="feature-card">
      <span class="feature-card-icon">${Icons.markerDot}</span>
      <div class="feature-card-title">${title}</div>
      <p class="feature-card-body">${body}</p>
    </div>`;
}

// ── Terminal Code Panel — spec's signature dark component ─────────────────
// tabLabel: eyebrow text in the top tab bar (e.g. "I'M A DEVELOPER")
// contentHtml: pre-built inner markup (caller controls syntax-colour spans)
export function terminalPanel(tabLabel, contentHtml, { className = '' } = {}) {
  return html`
    <div class="terminal-panel ${className}">
      <div class="terminal-panel-tab">
        <span class="terminal-dot terminal-dot--r"></span>
        <span class="terminal-dot terminal-dot--y"></span>
        <span class="terminal-dot terminal-dot--g"></span>
        <span class="terminal-panel-label">${tabLabel}</span>
      </div>
      <pre class="terminal-panel-body">${contentHtml}</pre>
    </div>`;
}

// ── Device Detection key/value row — spec component for structured data ──
export function kvRow(label, value) {
  return html`
    <div class="kv-row">
      <div class="kv-label">${label}</div>
      <div class="kv-value">${value}</div>
    </div>`;
}
