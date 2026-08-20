// ── pages/education.js ────────────────────────────────────────────────────
import { html }                        from '../components/html.js';
import { secLabel, infoGrid, tagCloud } from '../components/helpers.js';
import { EDUCATION }                   from '../data.js';

const { unsw: UNSW, rmit: RMIT } = EDUCATION;

// ── Sub-components ────────────────────────────────────────────────────────

function TagBlock(items) {
  return html`
    <div class="reveal tag-block">
      <div class="tag-block-pills">${tagCloud(items)}</div>
    </div>`;
}

function UnswBlock() {
  return html`
    <div class="reveal feature-card edu-block edu-block--accent">
      <div class="edu-header">
        <div>
          <span class="edu-status edu-status--accent">${UNSW.status}</span>
          <h2 class="edu-degree">${UNSW.degree}</h2>
          <div class="edu-institution">${UNSW.specialisation}</div>
        </div>
        <div class="edu-avg-card">
          <div class="edu-avg-num">${UNSW.average}</div>
          <div class="edu-avg-label">Current avg</div>
        </div>
      </div>

      <p class="reveal edu-body">${UNSW.body}</p>

      ${infoGrid(UNSW.grid)}

      ${TagBlock(UNSW.units)}
    </div>`;
}

function RmitBlock() {
  return html`
    <div class="reveal feature-card edu-block">
      <span class="edu-status edu-status--muted">${RMIT.status}</span>
      <h2 class="edu-degree">${RMIT.degree}</h2>
      <div class="edu-institution">${RMIT.institution}</div>

      <p class="reveal edu-body">${RMIT.body}</p>

      ${infoGrid(RMIT.grid)}

      ${TagBlock(RMIT.subjects)}
    </div>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderEducation() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Education')}
          <h1 class="reveal edu-headline">Two degrees, one direction.</h1>
          ${UnswBlock()}
          <div class="divid"></div>
          ${RmitBlock()}

        </div>
      </section>
    </div>`;
}
