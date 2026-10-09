// ── pages/story.js ────────────────────────────────────────────────────────
import { html }     from '../components/html.js';
import { secLabel } from '../components/helpers.js';
import { STORY }    from '../data.js';

// ── Sub-components ────────────────────────────────────────────────────────

function Chapter({ chapter, period, body }, index) {
  const num = String(index + 1).padStart(2, '0');
  return html`
    <div class="story-row feature-card" style="--i:${index + 1}">
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

        </div>

        <div class="story-pin">
          <div class="story-stage">
            <div class="wrap story-track">
              ${STORY.map(Chapter).join('')}
            </div>
          </div>
        </div>

        <div class="wrap">
          <p class="reveal story-close">
            Supervising a shop floor, studying systems, supporting live banking platforms and now
            moving towards security leadership: each step added a layer to the last. The common
            thread is staying calm when things break and building things that break less.
          </p>

          <div class="reveal story-cta">
            <button class="ghost-btn" data-page="work">See the work →</button>
          </div>
        </div>
      </section>
    </div>`;
}

// ── Horizontal pinned timeline (desktop, motion allowed) ──────────────────
// Same markup as the stacked mobile layout; gsap.matchMedia adds the
// horizontal behaviour only when it applies and undoes it when it stops.
let mm = null;

export function cleanupStory() {
  mm?.revert();
  mm = null;
}

export async function initStory() {
  const pin = document.querySelector('.story-pin');
  if (!pin) return;

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'), import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  if (!pin.isConnected) return; // navigated away while gsap loaded

  mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)', () => {
    const track = pin.querySelector('.story-track');
    const rows  = gsap.utils.toArray('.story-row', pin);
    const dist  = () => Math.max(0, track.scrollWidth - window.innerWidth);

    pin.classList.add('story-h');

    // Sticky stage inside a tall wrapper: wrapper height = viewport + slide
    // distance, so vertical scroll drives the horizontal slide with no
    // position:fixed pinning involved.
    const stageH = () => window.innerHeight - 64;
    const size   = () => { pin.style.height = stageH() + dist() + 'px'; };
    size();
    ScrollTrigger.addEventListener('refreshInit', size);

    // Fade each chapter in as it travels from the right edge towards centre.
    // Positions come from cached offsets + scroll progress, so scrolling never
    // forces a layout read, and only rows whose value changed are touched.
    let lefts = [], progress = 0;
    const measure = () => { lefts = rows.map(r => r.offsetLeft); };
    const last = rows.map(() => -1);
    const reveal = () => rows.forEach((row, i) => {
      const x = lefts[i] - progress * dist();
      const t = Math.round(gsap.utils.clamp(0, 1, (window.innerWidth - x) / (window.innerWidth * 0.25)) * 100) / 100;
      if (t === last[i]) return;
      last[i] = t;
      row.style.opacity   = t;
      row.style.transform = t < 1 ? `translate3d(0, ${(1 - t) * 30}px, 0)` : '';
    });
    const onRefresh = () => { measure(); reveal(); };

    gsap.to(track, {
      x: () => -dist(), ease: 'none', force3D: true,
      scrollTrigger: {
        trigger: pin, start: 'top 64px', end: () => '+=' + dist(),
        scrub: true, invalidateOnRefresh: true,
        onUpdate: self => { progress = self.progress; reveal(); },
      },
    });

    ScrollTrigger.addEventListener('refresh', onRefresh);
    onRefresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      ScrollTrigger.removeEventListener('refreshInit', size);
      pin.style.height = '';
      rows.forEach(r => { r.style.opacity = ''; r.style.transform = ''; });
      pin.classList.remove('story-h');
    };
  });
}
