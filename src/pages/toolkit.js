// ── pages/toolkit.js ─────────────────────────────────────────────────────
// Tool cards are styled after the spec's Accordion Use Case Item (hairline
// border, 4px radius, orange marker + chevron) while keeping the original
// filter/grid/detail-panel interaction rather than a literal expand/collapse
// accordion — 19 tools in a true accordion would be a very long scroll.
import { html }                          from '../components/html.js';
import { secLabel }                      from '../components/helpers.js';
import { Icons }                         from '../components/icons.js';
import { TOOLS, CATS }                   from '../data.js';
import { renderTerminal, initTerminal }  from '../components/terminal.js';

let filter   = 'all';
let selected = 0;
let mode     = 'terminal'; // 'terminal' | 'grid' — starts in the terminal each visit

const catLabel = id => (CATS.find(c => c[0] === id) || [null, id])[1];

// ── Sub-components ────────────────────────────────────────────────────────

function ChipsHtml() {
  return CATS.map(([id, label]) => html`
    <button class="toolkit-chip ${filter === id ? 'toolkit-chip--active' : ''}" data-cat="${id}">${label}</button>`
  ).join('');
}

// Usage first (Daily beats Regular beats Learning), importance second —
// ties broken by original authored order, which is curated by importance.
const CADENCE_RANK = { Daily: 0, Regular: 1, Learning: 2 };

function shownTools() {
  return TOOLS
    .map((t, i) => Object.assign({ i }, t))
    .filter(t => filter === 'all' || t.cat === filter)
    .sort((a, b) => CADENCE_RANK[a.cadence] - CADENCE_RANK[b.cadence] || a.i - b.i);
}

function CountHtml() {
  const shown = shownTools();
  return shown.length === TOOLS.length
    ? `${TOOLS.length} tools`
    : `${shown.length} of ${TOOLS.length} tools`;
}

function GridHtml() {
  return shownTools().map(t => html`
    <button class="tool-card ${t.i === selected ? 'tool-card--active' : ''}" data-index="${t.i}">
      <span class="tool-card-icon">${Icons.markerDot}</span>
      <div class="tool-card-body">
        <div class="tool-card-top">
          <span class="tool-card-name">${t.name}</span>
          <span class="tool-card-cadence ${t.cadence === 'Daily' ? 'tool-card-cadence--accent' : ''}">${t.cadence}</span>
        </div>
        <span class="tool-card-cat">${catLabel(t.cat)}</span>
      </div>
      <span class="tool-card-chevron">${Icons.chevron}</span>
    </button>`
  ).join('');
}

function PanelHtml() {
  const t = TOOLS[selected] || TOOLS[0];
  return html`
    <p class="eyebrow eyebrow--brand">${catLabel(t.cat)} · ${t.cadence}</p>
    <h2 class="toolkit-panel-name">${t.name}</h2>
    <div class="toolkit-panel-heading">What it is</div>
    <p class="toolkit-panel-text">${t.what}</p>
    <div class="toolkit-panel-heading">How I use it</div>
    <p class="toolkit-panel-text toolkit-panel-text--main">${t.how}</p>
    ${t.project ? html`
      <a href="#" class="toolkit-panel-link" data-project-id="${t.project}">${t.projectLabel} →</a>` : ''}`;
}

// ── Page render ───────────────────────────────────────────────────────────

function ModeToggle() {
  return html`
    <button class="ghost-btn toolkit-mode-toggle" id="toolkitModeToggle">
      ${mode === 'terminal' ? 'Switch to Grid view' : 'Switch to Terminal'}
    </button>`;
}

function GridSection() {
  return html`
    <div class="reveal toolkit-filter-row">
      <div class="toolkit-chips">${ChipsHtml()}</div>
      <div class="toolkit-count" id="toolkitCount">${CountHtml()}</div>
    </div>

    <div class="reveal toolkit-legend">
      <span class="eyebrow eyebrow--muted">How often:</span>
      <span class="toolkit-legend-item"><span class="toolkit-legend-dot toolkit-legend-dot--daily"></span>Daily</span>
      <span class="toolkit-legend-item"><span class="toolkit-legend-dot"></span>Regular</span>
      <span class="toolkit-legend-item"><span class="toolkit-legend-dot"></span>Learning</span>
    </div>

    <div class="toolkit-layout reveal-group">
      <div class="tool-grid" id="toolkitGrid">${GridHtml()}</div>
      <div class="toolkit-panel feature-card" id="toolkitPanel">${PanelHtml()}</div>
    </div>`;
}

export function renderToolkit() {
  filter = 'all';
  selected = 0;
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          <div class="reveal toolkit-head-row">
            <div>
              ${secLabel('Toolkit')}
              <h1 class="toolkit-headline">What I actually work in.</h1>
              <p class="toolkit-intro">
                Not a list of logos. ${mode === 'terminal'
                  ? html`Real shell — <span class="cli-cmd">ls</span>, <span class="cli-cmd">cd</span>, <span class="cli-cmd">cat</span> your way through it.`
                  : `Pick anything and it'll tell you what it is and where I use it.`}
                Sorted by how often that actually happens.
              </p>
            </div>
            ${ModeToggle()}
          </div>

          <div id="toolkitBody">${mode === 'terminal' ? renderTerminal() : GridSection()}</div>

        </div>
      </section>
    </div>`;
}

// ── Init (wires up filter chips, tool cards, and the detail panel) ────────

export function initToolkit() {
  const toggleBtn = document.getElementById('toolkitModeToggle');
  toggleBtn?.addEventListener('click', () => {
    mode = mode === 'terminal' ? 'grid' : 'terminal';
    window.goTo('toolkit');
  });

  if (mode === 'terminal') { initTerminal(); return; }

  const chipsEl = document.querySelector('.toolkit-chips');
  const gridEl  = document.getElementById('toolkitGrid');
  const panelEl = document.getElementById('toolkitPanel');
  const countEl = document.getElementById('toolkitCount');
  if (!chipsEl || !gridEl || !panelEl) return;

  chipsEl.addEventListener('click', e => {
    const chip = e.target.closest('.toolkit-chip');
    if (!chip) return;
    filter = chip.dataset.cat;
    chipsEl.querySelectorAll('.toolkit-chip').forEach(c =>
      c.classList.toggle('toolkit-chip--active', c === chip));
    gridEl.innerHTML  = GridHtml();
    countEl.textContent = CountHtml();
  });

  gridEl.addEventListener('click', e => {
    const card = e.target.closest('.tool-card');
    if (!card) return;
    selected = Number(card.dataset.index);
    gridEl.querySelectorAll('.tool-card').forEach(c =>
      c.classList.toggle('tool-card--active', Number(c.dataset.index) === selected));
    panelEl.innerHTML = PanelHtml();
  });

  panelEl.addEventListener('click', e => {
    const link = e.target.closest('[data-project-id]');
    if (!link) return;
    e.preventDefault();
    window.openProject?.(link.dataset.projectId);
  });
}
