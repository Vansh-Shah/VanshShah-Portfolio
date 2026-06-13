// ── pages/work.js ─────────────────────────────────────────────────────────
import { html }                              from '../components/html.js';
import { secLabel, jobEntry, skillsToolkit } from '../components/helpers.js';
import { EXPERIENCE, SKILLS }                from '../data.js';

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
          ${jobs}
          ${skillsToolkit(SKILLS)}

        </div>
      </section>
    </div>`;
}
