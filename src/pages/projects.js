// ── pages/projects.js ─────────────────────────────────────────────────────
import { html }                                       from '../components/html.js';
import { secLabel, backBtn, terminalPanel, kvRow }    from '../components/helpers.js';
import { PROJECTS }                                   from '../data.js';

// ── Project list ──────────────────────────────────────────────────────────

// The lead project gets a wide feature cell; the rest fall into a 2-col grid.
function FeaturedCard(p) {
  return html`
    <button class="feature-card project-featured" data-project-id="${p.id}" aria-label="View ${p.title} details">
      <div class="project-featured-head">
        <span class="eyebrow eyebrow--muted">${p.tag}</span>
        <span class="project-featured-flag">Featured</span>
      </div>
      <div class="project-featured-title">${p.title}</div>
      <p class="project-featured-blurb">${p.blurb}</p>
      <div class="project-featured-foot">
        <span class="project-status-badge" style="color:${p.statusColor};border-color:${p.statusColor}">${p.status}</span>
        <span class="project-featured-more">Read more →</span>
      </div>
    </button>`;
}

function ProjectCard(p) {
  return html`
    <button class="feature-card project-card" data-project-id="${p.id}" aria-label="View ${p.title} details">
      <div class="project-card-head">
        <span class="eyebrow eyebrow--muted">${p.tag}</span>
        <span class="project-status-badge" style="color:${p.statusColor};border-color:${p.statusColor}">${p.status}</span>
      </div>
      <div class="project-card-title">${p.title}</div>
      <p class="project-card-blurb">${p.blurb}</p>
      <span class="project-card-more">Read more →</span>
    </button>`;
}

export function renderProjects() {
  const [lead, ...rest] = PROJECTS;
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Projects')}
          <h1 class="reveal projects-headline">Tools built from the day job.</h1>
          <p class="reveal projects-intro">
            Most of these started as something I needed on a live case and couldn't find. A couple came out of study.
          </p>

          <div class="reveal project-featured-wrap">
            ${FeaturedCard(lead)}
          </div>
          <div class="project-grid reveal-group">
            ${rest.map(ProjectCard).join('')}
          </div>

        </div>
      </section>
    </div>`;
}

export function initProjects() {
  document.querySelectorAll('.project-featured, .project-card').forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.projectId));
  });
}

// ── Project detail routing ────────────────────────────────────────────────

// Opens a project detail view. Pushes #projects/<id> so details are
// deep-linkable, shareable, and reachable via browser back/forward.
export function openProject(id, pushState = true) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return false;

  if (pushState) {
    history.pushState({ page: 'projects', projectId: id }, '', `#projects/${id}`);
  }

  document.getElementById('main').innerHTML = renderProjectDetail(project);
  window.scrollTo(0, 0);
  document.getElementById('main')?.focus();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.initReveal?.();
    initProjectDetail();
  }));
  return true;
}

export function initProjectDetail() {
  document.getElementById('backToProjects')
    ?.addEventListener('click', () => window.goTo('projects'));
  document.querySelectorAll('[data-nav-project]').forEach(btn => {
    btn.addEventListener('click', () => openProject(btn.dataset.navProject));
  });
}

// ── Generic project detail template ───────────────────────────────────────

function renderProjectDetail(p) {
  const idx  = PROJECTS.findIndex(x => x.id === p.id);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const links = (p.links || []).length
    ? html`
      <div class="reveal project-detail-links">
        ${p.links.map(([label, href]) => {
          const isExternal = href.startsWith('http');
          const resolvedHref = isExternal ? href
            : import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + href.replace(/^\//, '');
          return html`
          <a href="${resolvedHref}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
             class="ghost-btn detail-link-btn">${label}</a>`;
        }).join('')}
      </div>` : '';

  // Terminal Code Panel for projects with a `code` field — the spec's
  // signature dark component, reused here for real command/usage output.
  const codeBlock = p.code ? html`
    <div class="reveal project-section">
      <div class="project-section-heading">${p.codeLabel || 'Usage'}</div>
      ${terminalPanel(p.title, p.code)}
    </div>` : '';

  const note = p.note ? html`
    <div class="reveal project-note">${p.note}</div>` : '';

  const origin = p.origin ? html`
    <div class="reveal project-origin">
      <span class="eyebrow eyebrow--brand">Why it exists</span>
      <p class="project-origin-text">${p.origin}</p>
    </div>` : '';

  const findings = p.findings ? html`
    <div class="reveal project-findings">
      <div class="project-section-heading project-section-heading--rule">Key findings</div>
      <div class="reveal-group project-points">
        ${p.findings.map(f => html`<div class="project-point">${f}</div>`).join('')}
      </div>
    </div>` : '';

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-meta">
            <span class="eyebrow eyebrow--muted">${p.tag}</span>
            <span class="project-status-badge" style="color:${p.statusColor};border-color:${p.statusColor}">${p.status}</span>
          </div>
          <h1 class="reveal project-detail-title">${p.title}</h1>
          <p class="reveal project-detail-sub">${p.overview}</p>

          ${origin}
          ${links}

          <div class="project-detail-layout">
            <div>
              <div class="project-section-heading project-section-heading--rule">What it does</div>
              <div class="reveal-group project-points">
                ${p.points.map(pt => html`<div class="project-point">${pt}</div>`).join('')}
              </div>

              ${findings}
              ${codeBlock}
              ${note}
            </div>

            <div class="reveal project-sidebar">
              <div class="eyebrow eyebrow--muted project-sidebar-label">Details</div>
              ${kvRow('Built with', p.stack.join(', '))}
              ${kvRow('Context', p.context)}
              ${kvRow('Status', p.statusNote)}
            </div>
          </div>

          <div class="reveal project-detail-nav">
            <button class="project-nav-btn" data-nav-project="${prev.id}">← ${prev.title}</button>
            <button class="project-nav-btn project-nav-btn--next" data-nav-project="${next.id}">${next.title} →</button>
          </div>

        </div>
      </section>
    </div>`;
}
