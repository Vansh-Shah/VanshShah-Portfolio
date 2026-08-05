// ── pages/toolkit.js ─────────────────────────────────────────────────────
import { html }            from '../components/html.js';
import { secLabel }        from '../components/helpers.js';
import { TOOLS, CATS }     from '../data.js';

let filter   = 'all';
let selected = 0;

const catLabel = id => (CATS.find(c => c[0] === id) || [null, id])[1];

// ── Sub-components ────────────────────────────────────────────────────────

function ChipsHtml() {
  return CATS.map(([id, label]) => html`
    <button class="toolkit-chip ${filter === id ? 'toolkit-chip--active' : ''}" data-cat="${id}">${label}</button>`
  ).join('');
}

function shownTools() {
  return TOOLS
    .map((t, i) => Object.assign({ i }, t))
    .filter(t => filter === 'all' || t.cat === filter);
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
      <div class="tool-card-top">
        <span class="sy tool-card-name">${t.name}</span>
        <span class="tool-card-cadence ${t.cadence === 'Daily' ? 'tool-card-cadence--accent' : ''}">${t.cadence}</span>
      </div>
      <span class="tool-card-cat">${catLabel(t.cat)}</span>
    </button>`
  ).join('');
}

function PanelHtml() {
  const t = TOOLS[selected] || TOOLS[0];
  return html`
    <div class="toolkit-panel-label">${catLabel(t.cat)} · ${t.cadence}</div>
    <h2 class="sy toolkit-panel-name">${t.name}</h2>
    <div class="toolkit-panel-heading">What it is</div>
    <p class="toolkit-panel-text">${t.what}</p>
    <div class="toolkit-panel-heading">How I use it</div>
    <p class="toolkit-panel-text toolkit-panel-text--main">${t.how}</p>
    ${t.project ? html`
      <a href="#" class="toolkit-panel-link" data-project-id="${t.project}">${t.projectLabel} →</a>` : ''}`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderToolkit() {
  filter = 'all';
  selected = 0;
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Toolkit')}
          <h1 class="sy reveal toolkit-headline">What I actually work in.</h1>
          <p class="reveal toolkit-intro">
            Not a list of logos. Pick anything and it'll tell you what it is and where I use it — sorted by how often that actually happens.
          </p>

          <div class="reveal toolkit-filter-row">
            <div class="toolkit-chips">${ChipsHtml()}</div>
            <div class="toolkit-count" id="toolkitCount">${CountHtml()}</div>
          </div>

          <div class="toolkit-layout reveal-group">
            <div class="tool-grid" id="toolkitGrid">${GridHtml()}</div>
            <div class="toolkit-panel" id="toolkitPanel">${PanelHtml()}</div>
          </div>

        </div>
      </section>
    </div>`;
}

// ── Init (wires up filter chips, tool cards, and the detail panel) ────────

export function initToolkit() {
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
