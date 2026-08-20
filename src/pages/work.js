// ── pages/work.js ─────────────────────────────────────────────────────────
import { html }                                from '../components/html.js';
import { secLabel, jobEntry, workCategories }  from '../components/helpers.js';
import { EXPERIENCE, WORK_CATEGORIES }         from '../data.js';

// ── Page render ───────────────────────────────────────────────────────────

export function renderWork() {
  // Separate job entries with a divider
  const jobs = EXPERIENCE
    .map((job, i) => html`
      ${i > 0 ? html`<div class="divid"></div>` : ''}
      ${jobEntry(job)}`)
    .join('');

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Work')}
          <h1 class="reveal work-headline">Where the experience comes from.</h1>
          ${jobs}
          <div class="divid"></div>
          ${workCategories(WORK_CATEGORIES)}

        </div>
      </section>
    </div>`;
}
