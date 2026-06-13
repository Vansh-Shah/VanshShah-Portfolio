// ── pages/story.js ────────────────────────────────────────────────────────
import { html }     from '../components/html.js';
import { secLabel } from '../components/helpers.js';
import { STORY }    from '../data.js';

// ── Sub-components ────────────────────────────────────────────────────────

function Chapter({ chapter, period, body }, index) {
  const num = String(index + 1).padStart(2, '0');
  return html`
    <div class="story-row reveal">
      <div class="chapter-meta">
        <div class="chapter-num">Chapter ${num}</div>
        <div class="chapter-period">${period}</div>
      </div>
      <div class="chapter-body">
        <div class="sy chapter-title">${chapter}</div>
        <p class="chapter-text">${body}</p>
      </div>
    </div>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderStory() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('The Story')}

          <h2 class="sy reveal story-headline">
            "Keeping banks running.<br>Building what's next."
          </h2>

          <p class="reveal story-sub">
            A career built in layers — leadership first, then technology,
            then the intersection of both.
          </p>

          ${STORY.map(Chapter).join('')}

        </div>
      </section>
    </div>`;
}
