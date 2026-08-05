// ── pages/projects.js ─────────────────────────────────────────────────────
import { html }              from '../components/html.js';
import { secLabel, backBtn, tagCloud } from '../components/helpers.js';
import { PROJECTS }          from '../data.js';

// ── Project list ──────────────────────────────────────────────────────────

function ProjectCard(p) {
  return html`
    <button class="project-row" data-project-id="${p.id}" aria-label="View ${p.title} details">
      <div class="project-row-main">
        <div class="project-tag">${p.tag}</div>
        <div class="sy project-row-title">${p.title}</div>
        <div class="project-row-blurb">${p.blurb}</div>
      </div>
      <div class="project-row-side">
        <span class="project-status-badge" style="color:${p.statusColor};border-color:${p.statusColor}">${p.status}</span>
        <div class="project-row-more">Read more →</div>
      </div>
    </button>`;
}

export function renderProjects() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Projects')}
          <h1 class="sy reveal projects-headline">Tools built from the day job.</h1>
          <p class="reveal projects-intro">
            Most of these started as something I needed on a live case and couldn't find. A couple came out of study.
          </p>

          <div class="project-list reveal-group">
            ${PROJECTS.map(ProjectCard).join('')}
          </div>

        </div>
      </section>
    </div>`;
}

export function initProjects() {
  document.querySelectorAll('.project-row').forEach(card => {
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
             class="detail-link-btn detail-link-btn--primary">${label}</a>`;
        }).join('')}
      </div>` : '';

  const codeBlock = p.code ? html`
    <div class="reveal project-section">
      <div class="project-section-heading">${p.codeLabel || 'Usage'}</div>
      <pre class="code-block">${p.code}</pre>
    </div>` : '';

  const note = p.note ? html`
    <div class="reveal project-note">${p.note}</div>` : '';

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-meta">
            <span class="project-tag">${p.tag}</span>
            <span class="project-status-badge" style="color:${p.statusColor};border-color:${p.statusColor}">${p.status}</span>
          </div>
          <h1 class="sy reveal project-detail-title">${p.title}</h1>
          <p class="reveal project-detail-sub">${p.overview}</p>

          ${links}

          <div class="project-detail-layout">
            <div>
              <div class="project-section-heading project-section-heading--rule">What it does</div>
              <div class="reveal-group project-points">
                ${p.points.map(pt => html`<div class="project-point">${pt}</div>`).join('')}
              </div>

              ${codeBlock}
              ${note}
            </div>

            <div class="reveal project-sidebar">
              <div class="project-sidebar-label">Details</div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Built with</div>
                <div class="project-sidebar-pills">${tagCloud(p.stack)}</div>
              </div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Context</div>
                <div class="project-sidebar-text">${p.context}</div>
              </div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Status</div>
                <div class="project-sidebar-text">${p.statusNote}</div>
              </div>
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
