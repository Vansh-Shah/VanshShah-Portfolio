// ── pages/home.js ─────────────────────────────────────────────────────────
import { html } from '../components/html.js';
import { Icons } from '../components/icons.js';

// ── Page-specific data (edit here to update the home page) ────────────────

const STATS = [
  { display: '6+',  count: '6',  suffix: '+', label: 'Years Experience' },
  { display: '2+',  count: '2',  suffix: '+', label: 'Years in FinTech'  },
  { display: '80%', count: '80', suffix: '%', label: 'Masters Average'   },
  { display: '3rd', count: null,              label: 'RoboCup Intl'      },
];

const NAV_CARDS = [
  { page: 'story',     title: 'The Story',   sub: 'Leadership → Fintech → Cybersecurity' },
  { page: 'work',      title: 'Work',        sub: 'Ultradata, Woolworths, RoboCup'       },
  { page: 'education', title: 'Education',   sub: 'UNSW & RMIT — expanded detail'        },
  { page: 'projects',  title: 'Projects',    sub: 'Portfolio, Runbooks, Labs'             },
];

// ── Sub-components ────────────────────────────────────────────────────────

function StatCell({ display, count, suffix, label }) {
  const countAttrs = count
    ? `data-count="${count}" data-suffix="${suffix}"`
    : '';
  return html`
    <div class="stat-cell">
      <div class="sy stat-num" ${countAttrs}>${display}</div>
      <div class="stat-label">${label}</div>
    </div>`;
}

function NavCard({ page, title, sub }) {
  return html`
    <button class="nav-card" data-page="${page}" aria-label="Go to ${title}">
      <div>
        <div class="sy nav-card-title">${title}</div>
        <div class="nav-card-sub">${sub}</div>
      </div>
      <span class="nav-card-arrow" aria-hidden="true">${Icons.arrow}</span>
    </button>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderHome() {
  return html`
    <div class="page">

      <section class="home-hero page-section">
        <div class="wrap">

          <div class="avail-badge reveal">
            <span class="avail-dot"></span>
            Available for opportunities
          </div>

          <div class="name-banner reveal">
            <h1 class="sy hero-name">
              Vansh<br>
              <span class="hero-name-accent">Shah</span>
            </h1>
          </div>

          <div class="phrase-wrap reveal">
            <p id="phrase" class="phrase-text">Banking Infrastructure</p>
          </div>

          <p class="hero-body reveal">
            Six years leading teams under pressure. Two years keeping banking systems
            online for mutual banks and credit unions across Australia. Now building
            toward cybersecurity leadership — Master of Cybersecurity at UNSW, averaging 80%.
          </p>

          <div class="hero-cta reveal">
            <button class="cta-primary" data-page="contact">Get in touch</button>
            <button class="cta-secondary" data-page="story">Read the story →</button>
          </div>

          <div class="stat-grid reveal-group">
            ${STATS.map(StatCell).join('')}
          </div>

        </div>
      </section>

      <section class="nav-section">
        <div class="wrap">
          <p class="reveal nav-section-label">Navigate</p>
          <div class="nav-cards reveal-group">
            ${NAV_CARDS.map(NavCard).join('')}
          </div>
        </div>
      </section>

    </div>`;
}

// ── Init (wires up buttons after render) ──────────────────────────────────

export function initHome() {
  document.querySelectorAll('.nav-card, .cta-primary, .cta-secondary').forEach(btn => {
    if (btn.dataset.page) {
      btn.addEventListener('click', () => window.goTo(btn.dataset.page));
    }
  });
}
