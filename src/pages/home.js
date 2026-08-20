// ── pages/home.js ─────────────────────────────────────────────────────────
import { html }                                   from '../components/html.js';
import { STATS, PROJECTS, PRINCIPLES }            from '../data.js';
import { eyebrow, featureCard, terminalPanel }    from '../components/helpers.js';

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

const SYSTEMS = [
  'Ultracs Core Banking', 'UniVerse DB', 'Microsoft SQL Server',
  'NPP payments', 'AML systems', 'IIS', 'Unix',
];

// ── Sub-components ────────────────────────────────────────────────────────

function StatCell({ display, count, suffix, label, accent }) {
  const countAttrs = count
    ? `data-count="${count}" data-suffix="${suffix}"`
    : '';
  return html`
    <div class="stat-cell">
      <div class="stat-num ${accent ? 'stat-num--accent' : ''}" ${countAttrs}>${display}</div>
      <div class="stat-label">${label}</div>
    </div>`;
}

function WorkCard(p) {
  return html`
    <button class="feature-card work-card" data-project-id="${p.id}" aria-label="View ${p.title} details">
      <div class="work-card-top">
        <span class="eyebrow eyebrow--muted">${p.tag}</span>
        <span class="project-status" style="color:${p.statusColor}">${p.status}</span>
      </div>
      <div class="feature-card-title">${p.title}</div>
      <p class="feature-card-body">${p.blurb}</p>
    </button>`;
}

function NavCard({ page, title, sub }) {
  return html`
    <button class="feature-card elsewhere-card" data-page="${page}" aria-label="Go to ${title}">
      <div class="feature-card-title">${title}</div>
      <div class="feature-card-body">${sub}</div>
    </button>`;
}

function PrincipleCard([title, body]) {
  return featureCard(title, body);
}

// ── The hero's signature component: an "incident diagnostic" JSON block,
//    reframing Fingerprint's device-fingerprint motif as a case fingerprint
//    for a live banking incident. Rotates through a handful of real-shaped
//    P1/P2 incidents so the hero has some life to it. ─────────────────────
const INCIDENTS = [
  { case_id: 'INC-88213', system: 'NPP Payments',       priority: 'P1', root_cause: 'expired TLS cert',        resolution_time: 14, status: 'resolved' },
  { case_id: 'INC-88240', system: 'UniVerse DB',         priority: 'P1', root_cause: 'lock storm, port 20',     resolution_time: 22, status: 'resolved' },
  { case_id: 'INC-88267', system: 'Core Banking',        priority: 'P2', root_cause: 'batch job overrun',       resolution_time: 9,  status: 'resolved' },
  { case_id: 'INC-88291', system: 'IIS',                 priority: 'P1', root_cause: 'app pool crash loop',     resolution_time: 6,  status: 'resolved' },
  { case_id: 'INC-88309', system: 'AML Reporting',       priority: 'P2', root_cause: 'SQL timeout, nightly job', resolution_time: 18, status: 'resolved' },
];

function incidentJson(inc) {
  return html`<span class="tok-punc">{</span>
  <span class="tok-key">"case_id"</span><span class="tok-punc">:</span> <span class="tok-str">"${inc.case_id}"</span><span class="tok-punc">,</span>
  <span class="tok-key">"system"</span><span class="tok-punc">:</span> <span class="tok-str">"${inc.system}"</span><span class="tok-punc">,</span>
  <span class="tok-key">"analyst"</span><span class="tok-punc">:</span> <span class="tok-str">"Vansh Shah"</span><span class="tok-punc">,</span>
  <span class="tok-key">"priority"</span><span class="tok-punc">:</span> <span class="tok-str">"${inc.priority}"</span><span class="tok-punc">,</span>
  <span class="tok-key">"root_cause"</span><span class="tok-punc">:</span> <span class="tok-str">"${inc.root_cause}"</span><span class="tok-punc">,</span>
  <span class="tok-key">"resolution_time"</span><span class="tok-punc">:</span> <span class="tok-num">${inc.resolution_time}</span><span class="tok-punc">,</span>
  <span class="tok-key">"status"</span><span class="tok-punc">:</span> <span class="tok-str">"${inc.status}"</span>
<span class="tok-punc">}</span><span class="cli-cursor" aria-hidden="true">▍</span>`;
}

function IncidentPanel() {
  return html`<div class="hero-terminal-wrap">
    ${terminalPanel("I'M IN BANKING SUPPORT", incidentJson(INCIDENTS[0]), { className: 'hero-terminal' })}
  </div>`;
}

let incidentTimer = null;
function initIncidentRotation() {
  if (incidentTimer) clearInterval(incidentTimer);
  const body = document.querySelector('.hero-terminal .terminal-panel-body');
  if (!body) return;
  let i = 0;
  incidentTimer = setInterval(() => {
    if (!document.body.contains(body)) { clearInterval(incidentTimer); return; }
    i = (i + 1) % INCIDENTS.length;
    body.classList.add('is-swapping');
    setTimeout(() => {
      body.innerHTML = incidentJson(INCIDENTS[i]);
      body.classList.remove('is-swapping');
    }, 350);
  }, 4500);
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderHome() {
  return html`
    <div class="page">

      <section class="home-hero page-section">
        <div class="wrap">

          ${eyebrow("I'M IN BANKING SUPPORT", { brand: true })}

          <h1 class="hero-headline reveal">Technical support for the systems banks <span class="hl-word">run on</span>.</h1>

          <p class="hero-thesis reveal">Two years fixing live banking incidents — now studying to prevent them.</p>

          <p class="hero-body reveal">
            Core banking, NPP payments and AML platforms for mutual banks and credit unions
            across Australia. I work priority issues directly with clients — on site and
            online — and I'm studying cybersecurity to move further upstream of them.
          </p>

          <div class="hero-cta reveal">
            <button class="primary-btn" data-page="contact">Get in touch</button>
            <button class="ghost-btn" data-page="story">Read the story →</button>
          </div>

          <div class="hero-orgs reveal" aria-label="Where I work and study">
            <span class="hero-orgs-label">Across</span>
            <span class="hero-orgs-list">Ultradata Australia<span class="hero-orgs-dot">·</span>UNSW Sydney<span class="hero-orgs-dot">·</span>RMIT University</span>
          </div>

          <div class="reveal">${IncidentPanel()}</div>

        </div>
      </section>

      <section class="stats-section">
        <div class="wrap">
          <div class="stat-grid reveal-group">
            ${STATS.map(StatCell).join('')}
          </div>
        </div>
      </section>

      <section class="trust-section">
        <div class="wrap">
          <p class="trust-eyebrow eyebrow eyebrow--muted">SYSTEMS I WORK IN</p>
          <div class="trust-row reveal-group">
            ${SYSTEMS.map(s => html`<span class="trust-wordmark">${s}</span>`).join('')}
          </div>
        </div>
      </section>

      <section class="current-section">
        <div class="wrap">
          <div class="reveal current-banner">
            <p class="eyebrow eyebrow--brand current-label">Current</p>
            <div class="current-text">Master of Cybersecurity at UNSW, specialising in risk governance. Building small diagnostic tools for the UniVerse and IIS stacks I support day to day.</div>
          </div>
        </div>
      </section>

      <section class="selected-work-section">
        <div class="wrap">
          <div class="reveal section-row">
            <p class="eyebrow eyebrow--muted">Selected work</p>
            <button class="text-link" data-page="projects">All projects →</button>
          </div>
          <div class="work-cards reveal-group">
            ${SELECTED_WORK.map(WorkCard).join('')}
          </div>
        </div>
      </section>

      <section class="principles-section">
        <div class="wrap">
          <div class="reveal section-row">
            <p class="eyebrow eyebrow--muted">How I work when it counts</p>
          </div>
          <div class="principles-grid reveal-group">
            ${PRINCIPLES.map(PrincipleCard).join('')}
          </div>
        </div>
      </section>

      <section class="nav-section">
        <div class="wrap">
          <p class="reveal eyebrow eyebrow--muted">Elsewhere on this site</p>
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

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) initIncidentRotation();
}
