// ── pages/home.js ─────────────────────────────────────────────────────────
import { html }             from '../components/html.js';
import { STATS, PROJECTS }  from '../data.js';

// ── Page-specific data (edit here to update the home page) ────────────────

const SELECTED_WORK = ['ssl-monitor', 'iis-log-viewer']
  .map(id => PROJECTS.find(p => p.id === id));

const NAV_CARDS = [
  { page: 'story',     title: 'Story',     sub: 'Leadership, then technology, then both' },
  { page: 'toolkit',   title: 'Toolkit',   sub: '19 tools, and where I use them'          },
  { page: 'work',      title: 'Work',      sub: 'Ultradata, Woolworths, RoboCup'          },
  { page: 'education', title: 'Education', sub: 'UNSW and RMIT in detail'                 },
  { page: 'contact',   title: 'Contact',   sub: 'Email, LinkedIn, GitHub'                  },
];

// ── Sub-components ────────────────────────────────────────────────────────

function StatCell({ display, count, suffix, label, accent }) {
  const countAttrs = count
    ? `data-count="${count}" data-suffix="${suffix}"`
    : '';
  return html`
    <div class="stat-cell ${accent ? 'stat-cell--accent' : ''}">
      <div class="sy stat-num ${accent ? 'stat-num--accent' : ''}" ${countAttrs}>${display}</div>
      <div class="stat-label">${label}</div>
    </div>`;
}

function WorkCard(p) {
  return html`
    <button class="work-card" data-project-id="${p.id}" aria-label="View ${p.title} details">
      <div class="work-card-top">
        <span class="project-tag">${p.tag}</span>
        <span class="project-status" style="color:${p.statusColor}">${p.status}</span>
      </div>
      <div class="sy work-card-title">${p.title}</div>
      <p class="work-card-desc">${p.blurb}</p>
    </button>`;
}

function NavCard({ page, title, sub }) {
  return html`
    <button class="elsewhere-card" data-page="${page}" aria-label="Go to ${title}">
      <div class="sy elsewhere-card-title">${title}</div>
      <div class="elsewhere-card-sub">${sub}</div>
    </button>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderHome() {
  return html`
    <div class="page">

      <section class="home-hero page-section">
        <div class="wrap">

          <div class="hero-label reveal">Technical Support Consultant · Ultradata Australia · Melbourne</div>

          <h1 class="sy hero-headline reveal">Technical support for the systems banks run on.</h1>

          <p class="hero-body reveal">
            Core banking, NPP payments and AML platforms for mutual banks and credit unions
            across Australia. I work priority issues directly with clients — on site and
            online — and I'm studying cybersecurity to move further upstream of them.
          </p>

          <div class="hero-cta reveal">
            <button class="cta-primary-btn" data-page="contact">Get in touch</button>
            <button class="cta-secondary-btn" data-page="story">Read the story →</button>
          </div>

          <div class="stat-grid reveal-group">
            ${STATS.map(StatCell).join('')}
          </div>

        </div>
      </section>

      <section class="current-section">
        <div class="wrap">
          <div class="reveal current-banner">
            <div class="current-label">Current</div>
            <div class="current-text">Master of Cybersecurity at UNSW, specialising in risk governance. Building small diagnostic tools for the UniVerse and IIS stacks I support day to day.</div>
          </div>
        </div>
      </section>

      <section class="selected-work-section">
        <div class="wrap">
          <div class="reveal section-row">
            <p class="nav-section-label">Selected work</p>
            <button class="text-link" data-page="projects">All projects →</button>
          </div>
          <div class="work-cards reveal-group">
            ${SELECTED_WORK.map(WorkCard).join('')}
          </div>
        </div>
      </section>

      <section class="nav-section">
        <div class="wrap">
          <p class="reveal nav-section-label">Elsewhere on this site</p>
          <div class="elsewhere-cards reveal-group">
            ${NAV_CARDS.map(NavCard).join('')}
          </div>
        </div>
      </section>

    </div>`;
}

// ── Init (wires up buttons after render) ──────────────────────────────────

export function initHome() {
  // [data-page] buttons (CTAs, "All projects", nav cards) are wired
  // generically by the router after every render.
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => window.openProject?.(card.dataset.projectId));
  });
}
