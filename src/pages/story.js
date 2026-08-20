// ── pages/story.js ────────────────────────────────────────────────────────
import { html }     from '../components/html.js';
import { secLabel } from '../components/helpers.js';
import { STORY }    from '../data.js';

// ── Sub-components ────────────────────────────────────────────────────────

function Chapter({ chapter, period, body }, index) {
  const num = String(index + 1).padStart(2, '0');
  return html`
    <div class="story-row reveal feature-card">
      <div class="chapter-meta">
        <div class="chapter-num">Chapter ${num}</div>
        <div class="chapter-period">${period}</div>
      </div>
      <div class="chapter-body">
        <h3 class="chapter-title">${chapter}</h3>
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

          ${secLabel('The story')}

          <h2 class="reveal story-headline">
            Keeping banks running. Building what's next.
          </h2>

          <p class="reveal story-sub">
            A career built in layers — leadership first, then the technology, then the place where the two meet.
          </p>

          ${STORY.map(Chapter).join('')}

          <div class="reveal story-cta">
            <button class="ghost-btn" data-page="work">See the work →</button>
          </div>

        </div>
      </section>
    </div>`;
}
