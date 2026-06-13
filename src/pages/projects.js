// ── pages/projects.js ─────────────────────────────────────────────────────
import { html }             from '../components/html.js';
import { secLabel, backBtn } from '../components/helpers.js';
import { PROJECTS }          from '../data.js';

// ── Project list ──────────────────────────────────────────────────────────

function ProjectCard(p) {
  return html`
    <div class="project-card ${p.detail ? 'project-card--clickable' : ''}"
         role="article"
         ${p.detail ? `data-project-id="${p.id}" tabindex="0" aria-label="View ${p.title} details"` : ''}>
      <div class="project-card-top">
        <span class="project-tag">${p.tag}</span>
        <span class="project-status" style="color:${p.statusColor}">${p.status}</span>
      </div>
      <div class="sy project-title">${p.title}</div>
      <p class="project-desc">${p.desc}</p>
      <div class="project-card-footer">
        <div class="project-card-links">
          ${p.github ? html`
            <a href="${p.github}" target="_blank" rel="noopener noreferrer"
               class="project-link" onclick="event.stopPropagation()">GitHub ↗</a>` : ''}
          ${p.website ? html`
            <a href="${p.website}" target="_blank" rel="noopener noreferrer"
               class="project-link" onclick="event.stopPropagation()">Website ↗</a>` : ''}
        </div>
        ${p.detail ? html`<span class="project-detail-link">View details →</span>` : ''}
      </div>
    </div>`;
}

export function renderProjects() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Projects')}

          <p class="reveal projects-intro">
            A mix of live tools, academic work, and ongoing learning —
            the things built alongside the job.
          </p>

          <div class="project-grid reveal-group">
            ${PROJECTS.map(ProjectCard).join('')}
          </div>

          <div class="reveal coming-up-card">
            <div class="sy coming-up-title">Coming up</div>
            <p class="coming-up-body">
              Incident response case studies · CTF writeups · Log analyser CLI
            </p>
          </div>

        </div>
      </section>
    </div>`;
}

export function initProjects() {
  document.querySelectorAll('.project-card--clickable').forEach(card => {
    const open = () => renderProjectDetail(card.dataset.projectId);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

// ── Project detail routing ────────────────────────────────────────────────

function renderProjectDetail(id) {
  const DETAIL_PAGES = {
    'ssl-monitor': renderSSLMonitor,
    'qr-security': renderQRSecurity,
    'portfolio':   renderPortfolioDetail,
    'robocup':     renderRoboCupDetail,
  };
  const renderer = DETAIL_PAGES[id];
  if (!renderer) return;

  document.getElementById('main').innerHTML = renderer();
  window.scrollTo(0, 0);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.initReveal?.();
    initProjectDetail();
  }));
}

export function initProjectDetail() {
  document.getElementById('backToProjects')
    ?.addEventListener('click', () => window.goTo('projects'));
}

// ── SSL Monitor detail page ───────────────────────────────────────────────
// To add a new project detail page:
// 1. Add a render function below (copy the pattern from renderSSLMonitor)
// 2. Add it to DETAIL_PAGES above with a matching key
// 3. Set detail: true on the project in data.js

function FeatureGrid(features) {
  return html`
    <div class="feature-grid reveal-group">
      ${features.map(([title, desc]) => html`
        <div class="feature-card">
          <div class="sy feature-title">${title}</div>
          <p class="feature-desc">${desc}</p>
        </div>`).join('')}
    </div>`;
}

function renderSSLMonitor() {
  // ── Inline data for this project ────────────────────────────────────────
  const TECH_PILLS = [
    'Python 3.10+', 'tkinter (stdlib)', 'ssl (stdlib)',
    'socket (stdlib)', 'concurrent.futures', 'threading', 'argparse', 'json / csv',
  ];

  const GUI_FEATURES = [
    ['Domain manager',       'Add, edit (double-click), remove, and reorder domains in a proper list — no more editing raw text files.'],
    ['Add / Edit dialog',    'Clean modal for adding or editing a domain. Strips https:// automatically. Duplicate detection built in.'],
    ['Keyboard shortcuts',   'Delete or Backspace to remove. Double-click to edit. Enter to confirm in dialogs.'],
    ['Load & save list',     'Load domains from any .txt file or save the current list back to disk directly from the GUI.'],
    ['Live domain count',    'The domain count updates in real time as you add and remove entries.'],
    ['Results table',        'Colour-coded rows with domain, status, days left, expiry date, and issuer. Click any row for full details.'],
    ['Stat bar',             'Running totals across OK / Warning / Critical / Error update after every scan.'],
    ['One-click export',     'Export the last scan to JSON or CSV via a file picker — no terminal needed.'],
  ];

  const CLI_FEATURES = [
    ['Parallel checks',        'Checks all domains concurrently — 50 domains takes roughly the same time as 1.'],
    ['Colour-coded terminal',  'Green for OK, amber for warning, red for critical or expired, grey for errors.'],
    ['Configurable thresholds','Default 30-day warning and 7-day critical. Adjustable per run with --warn-days.'],
    ['JSON & CSV export',      'Export results for dashboards, email reports, or downstream tooling.'],
    ['CI-friendly exit codes', 'Exits with code 1 if any cert is critical, expired, or errored — drops into pipelines.'],
    ['Zero dependencies',      'Standard library only. No pip install required on any platform.'],
  ];

  // ── Code samples ─────────────────────────────────────────────────────────
  const CODE = {
    gui:     `python gui.py`,
    cli:     `python ssl_monitor.py`,
    single:  `python ssl_monitor.py -d example.com`,
    full:    `python ssl_monitor.py -f domains.txt --warn-days 60 --json report.json`,
    domains: `# domains.txt — one domain per line, # lines are ignored\ngoogle.com\ngithub.com\nyour-banking-client.com.au`,
    output:  `Checking 5 domain(s)…\n\nSSL/TLS Certificate Monitor  —  2026-06-12 09:41:00\nWarn threshold: 30 days   Critical threshold: 7 days\n────────────────────────────────────────────────────────────────\n  google.com          2026-08-20   OK          (69 days)\n  github.com          2026-07-15   OK          (33 days)\n  expiring-soon.io    2026-06-18   WARNING     (18 days)\n  critical-cert.com   2026-06-14   CRITICAL    (2 days)\n  broken-dns.xyz      —            ERROR       DNS resolution failed\n────────────────────────────────────────────────────────────────\n  Total: 5  OK: 2  Warning: 1  Critical/Expired: 1  Error: 1`,
    cron:    `# Run every morning at 8am, save JSON report\n0 8 * * * python3 /path/to/ssl_monitor.py -f domains.txt --json /var/log/ssl.json`,
  };

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-header">
            <div class="project-detail-meta">
              <span class="project-tag">Python · Security · Desktop GUI</span>
              <span class="project-status" style="color:#16A34A">Live</span>
            </div>
            <h1 class="sy project-detail-title">SSL/TLS Certificate Monitor</h1>
            <p class="project-detail-sub">
              A desktop GUI and CLI tool that checks SSL/TLS certificate expiry across
              multiple domains in parallel — built from a real operational need in a
              banking support environment where an expired cert means an immediate outage.
            </p>
            <div class="project-detail-links">
              <a href="https://github.com/Vansh-Shah/SSL-Monitor"
                 target="_blank" rel="noopener noreferrer"
                 class="detail-link-btn detail-link-btn--primary">View on GitHub ↗</a>
              <a href="/VanshShah-Portfolio/ssl-monitor.zip" download
                 class="detail-link-btn detail-link-btn--secondary">Download ZIP</a>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">The Problem</h2>
            <p class="project-section-body">
              In a banking support environment, expired SSL/TLS certificates are one of
              the most common — and most avoidable — causes of production outages. A cert
              expiring on a client-facing banking application means customers can't log in,
              transactions fail, and the phone starts ringing immediately.
            </p>
            <p class="project-section-body">
              The manual process meant checking each domain one at a time — opening a
              browser, running <code class="inline-code">openssl s_client</code> per domain,
              or clicking through an IIS certificate manager. With dozens of client
              environments that's not sustainable. This tool makes the whole check a single
              command or a single button click.
            </p>
          </div>

          <div class="divid"></div>

          <div class="project-section">
            <div class="reveal">
              <h2 class="sy project-section-title">Desktop GUI</h2>
              <p class="project-section-body">
                Run with <code class="inline-code">python gui.py</code>. No terminal needed
                after that. Built with Python's built-in
                <code class="inline-code">tkinter</code> — no installs required — and styled
                to match this portfolio's dark theme.
              </p>
              <pre class="code-block">${CODE.gui}</pre>
            </div>
            ${FeatureGrid(GUI_FEATURES)}
          </div>

          <div class="divid"></div>

          <div class="project-section">
            <div class="reveal">
              <h2 class="sy project-section-title">Command-Line Interface</h2>
              <p class="project-section-body">
                Works standalone — useful for scheduling, pipelines, or a quick terminal
                check. The GUI imports its core logic directly so there's no duplication.
              </p>
            </div>
            ${FeatureGrid(CLI_FEATURES)}
            <div class="reveal">
              <p class="project-section-body">Create a <code class="inline-code">domains.txt</code> file:</p>
              <pre class="code-block">${CODE.domains}</pre>
              <p class="project-section-body">Then run:</p>
              <pre class="code-block">${CODE.cli}</pre>
              <p class="project-section-body">Other options:</p>
              <pre class="code-block">${CODE.single}\n${CODE.full}</pre>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Sample CLI Output</h2>
            <pre class="code-block code-block--output">${CODE.output}</pre>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Scheduling</h2>
            <p class="project-section-body">
              The CLI exits with code <code class="inline-code">1</code> if any cert is
              critical, expired, or errored — so it plugs straight into a cron job or CI
              pipeline. On Windows, point Task Scheduler at
              <code class="inline-code">ssl_monitor.py</code> directly.
            </p>
            <pre class="code-block">${CODE.cron}</pre>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Built With</h2>
            <p class="project-section-body">
              Entirely standard library — no pip install, runs anywhere Python 3.10+ is installed.
            </p>
            <div class="tech-pills">
              ${TECH_PILLS.map(t => html`<span class="tag-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-detail-footer">
            <a href="https://github.com/Vansh-Shah/SSL-Monitor"
               target="_blank" rel="noopener noreferrer"
               class="detail-link-btn detail-link-btn--primary">
              View full source on GitHub ↗
            </a>
          </div>

        </div>
      </section>
    </div>`;
}

// ── QR Code Security Analysis detail page ────────────────────────────────

function renderQRSecurity() {
  const SECTIONS = [
    ['Technical Foundations',    'QR code structure, encoding mechanics, data lifecycle, and the security implications of how QR codes are designed — including why opacity is a core vulnerability.'],
    ['Security Architecture',    'Digital signatures, Public Key Infrastructure (PKI), offline verification models, and trust models in QR systems — plus the limitations of current security architectures.'],
    ['Threat Modelling',         'Formal threat modelling with STRIDE analysis, attack trees, asset identification, threat actor profiles, attack surface analysis, and risk assessment.'],
    ['Data Flow Analysis',       'Level 0 and Level 1 data flow diagrams, component analysis, trust boundary mapping, data flow risks by use case, and security controls mapped to flow.'],
    ['Attack Techniques',        'Quishing (QR phishing), QR code replacement attacks, malicious payload delivery, backend and API exploitation — with real case studies including parking meter payment scams and fake WiFi access.'],
    ['Comparative Analysis',     'Signed vs unsigned, static vs dynamic, online vs offline verification, dedicated vs generic scanner apps, and centralised vs decentralised trust models across a security maturity matrix.'],
    ['Security Recommendations', 'Multi-layered recommendations across cryptographic controls, secure system design, operational security, and user awareness and governance.'],
  ];

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-header">
            <div class="project-detail-meta">
              <span class="project-tag">Security Engineering · Research · UNSW</span>
              <span class="project-status" style="color:#16A34A">Published</span>
            </div>
            <h1 class="sy project-detail-title">Security Analysis of QR Codes in Digital Systems</h1>
            <p class="project-detail-sub">
              A 59-page structured security engineering analysis of QR code systems —
              applying formal threat modelling, data flow analysis, and comparative
              security evaluation to one of the most widely deployed yet underexamined
              attack surfaces in modern digital infrastructure.
            </p>
            <p class="project-detail-sub" style="font-size:0.85rem; opacity:0.6; margin-top:0.5rem;">
              Completed as part of the Principles of Security Engineering unit · UNSW Master of Cybersecurity
            </p>
            <div class="project-detail-links">
              <a href="/VanshShah-Portfolio/qr-security-analysis.pdf" download
                 class="detail-link-btn detail-link-btn--primary">Download Report (PDF) ↓</a>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Overview</h2>
            <p class="project-section-body">
              QR codes are embedded in nearly every domain of modern digital life — payments,
              authentication, digital certificates, identity verification, and consumer engagement.
              Despite their ubiquity, QR codes introduce serious security challenges: users cannot
              read their content before scanning, they carry no built-in authentication, and their
              trust model relies almost entirely on context and user behaviour.
            </p>
            <p class="project-section-body">
              This report applies a security engineering methodology to analyse QR code systems
              in depth — evaluating their technical architecture, examining existing cryptographic
              controls, and developing formal threat models to surface vulnerabilities and attack
              vectors across real-world deployment contexts.
            </p>
          </div>

          <div class="divid"></div>

          <div class="project-section">
            <div class="reveal">
              <h2 class="sy project-section-title">What the Report Covers</h2>
            </div>
            ${FeatureGrid(SECTIONS)}
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Key Findings</h2>
            <p class="project-section-body">
              Cryptographic enhancements such as signed QR codes significantly improve data
              integrity and authenticity — but many real-world implementations remain vulnerable.
              Attack techniques like quishing, physical code replacement, and malicious payload
              delivery are low-cost and highly effective against users who have no way to
              visually inspect a QR code before trusting it.
            </p>
            <p class="project-section-body">
              Human factors and inconsistent application design amplify these risks.
              The report concludes that QR code security is not solely a technical problem —
              it is a system-level challenge requiring coordinated mitigation: cryptographic
              controls, secure system design, and user awareness working together.
            </p>
          </div>

          <div class="divid"></div>

          <div class="reveal project-detail-footer">
            <a href="/VanshShah-Portfolio/qr-security-analysis.pdf" download
               class="detail-link-btn detail-link-btn--primary">
              Download Full Report ↓
            </a>
          </div>

        </div>
      </section>
    </div>`;
}

// ── Portfolio detail page ─────────────────────────────────────────────────

function renderPortfolioDetail() {
  const FEATURES = [
    ['Modular Vite architecture',  'Single-page app pattern with a custom client-side router — each page is its own JS module. No React, no Vue, no build complexity beyond Vite itself.'],
    ['Project detail pages',       'Every project card links through to a full detail page with its own layout, content, and download or external links — all routed client-side without a page reload.'],
    ['Dark / light theme',         'Manual toggle with system preference detection on load. Theme persists across all navigation within the session.'],
    ['Scroll-driven reveals',      'IntersectionObserver-powered animations on scroll — no animation library, no layout shift, works cleanly across all pages including detail views.'],
    ['Skill popup tooltips',       'Every skill tag on the Work page has a contextual description explaining what it is and why it matters in the banking support context. Click any pill to see it.'],
    ['Contact form',               'Formspree-backed contact form with client-side validation, loading state, and clear success and error feedback. No server required.'],
    ['Responsive layout',          'Mobile-first CSS with a hamburger nav, responsive grids, and consistent typography across all breakpoints.'],
    ['GitHub Pages deployment',    'Built with Vite and deployed via GitHub Actions — every push to main automatically rebuilds and redeploys the site. No manual upload steps.'],
  ];

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-header">
            <div class="project-detail-meta">
              <span class="project-tag">Vite · Vanilla JS · GitHub Pages</span>
              <span class="project-status" style="color:#16A34A">Live</span>
            </div>
            <h1 class="sy project-detail-title">This Portfolio</h1>
            <p class="project-detail-sub">
              A narrative-driven multi-page personal site — six pages, four project detail
              views, dark and light mode, and a fully automated deploy pipeline.
              No framework. Every line written by hand.
            </p>
            <div class="project-detail-links">
              <a href="https://github.com/Vansh-Shah/VanshShah-Portfolio"
                 target="_blank" rel="noopener noreferrer"
                 class="detail-link-btn detail-link-btn--primary">View on GitHub ↗</a>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">What it is</h2>
            <p class="project-section-body">
              A personal portfolio built to do more than list skills — it tells a story.
              Home sets the context, Story explains the arc, Work goes deep on the experience,
              Education covers the degrees, and Projects shows what's been built — each with
              its own detail page you can click through to.
            </p>
            <p class="project-section-body">
              Built with Vite and vanilla JS. The constraint was intentional: understand every
              line rather than abstract it behind a framework. A custom client-side router
              handles all navigation, CSS custom properties drive the theme system, and GitHub
              Actions handles the build and deploy automatically on every push.
            </p>
          </div>

          <div class="divid"></div>

          <div class="project-section">
            <div class="reveal">
              <h2 class="sy project-section-title">Features</h2>
            </div>
            ${FeatureGrid(FEATURES)}
          </div>

          <div class="divid"></div>

          <div class="reveal project-detail-footer">
            <a href="https://github.com/Vansh-Shah/VanshShah-Portfolio"
               target="_blank" rel="noopener noreferrer"
               class="detail-link-btn detail-link-btn--primary">
              View source on GitHub ↗
            </a>
          </div>

        </div>
      </section>
    </div>`;
}

// ── RoboCup Capstone detail page ──────────────────────────────────────────

function renderRoboCupDetail() {
  const CONTRIBUTIONS = [
    ['Team leadership',      'Led a multidisciplinary team through the full project lifecycle — from initial planning to competition day. Kept people aligned and focused under real deadline pressure.'],
    ['Agile project management', 'Managed timelines and deliverables using Agile methodologies — sprint planning, task delegation, and regular retrospectives across a semester-long project.'],
    ['Sponsorship & marketing', 'Developed and executed a marketing strategy, created promotional materials, and secured sponsorships to support the team\'s competition entry and travel.'],
    ['Open-source release',  'Used Git for version control throughout, then coordinated the public release of the full codebase — contributing to the broader RoboCup and open-source robotics community.'],
  ];

  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${backBtn()}

          <div class="reveal project-detail-header">
            <div class="project-detail-meta">
              <span class="project-tag">Robotics · Agile · RMIT Capstone</span>
              <span class="project-status" style="color:var(--accent)">3rd Place · International</span>
            </div>
            <h1 class="sy project-detail-title">RoboCup Capstone — RMIT RedBackBots</h1>
            <p class="project-detail-sub">
              RMIT's robotics team competed in the 2024 RoboCup Challenge Shield Division
              and finished third internationally. The capstone project was a semester-long
              exercise in delivering under real stakes — with a public codebase, real sponsors,
              and a competition on the line.
            </p>
            <div class="project-detail-links">
              <a href="https://github.com/rmit-computing-technologies/redbackbots-coderelease"
                 target="_blank" rel="noopener noreferrer"
                 class="detail-link-btn detail-link-btn--primary">GitHub ↗</a>
              <a href="https://redbackbots.com/" target="_blank" rel="noopener noreferrer"
                 class="detail-link-btn detail-link-btn--secondary">Team Website ↗</a>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">The competition</h2>
            <p class="project-section-body">
              RoboCup is an international robotics competition where autonomous robot teams
              compete across a range of disciplines — including robot soccer, rescue, and
              industrial challenges. The Challenge Shield Division tests teams on structured
              problem-solving tasks under competition conditions.
            </p>
            <p class="project-section-body">
              RMIT's RedBackBots team finished 3rd place internationally in 2024 —
              competing against university teams from around the world.
            </p>
          </div>

          <div class="divid"></div>

          <div class="project-section">
            <div class="reveal">
              <h2 class="sy project-section-title">My contributions</h2>
            </div>
            ${FeatureGrid(CONTRIBUTIONS)}
          </div>

          <div class="divid"></div>

          <div class="reveal project-detail-footer">
            <a href="https://github.com/rmit-computing-technologies/redbackbots-coderelease"
               target="_blank" rel="noopener noreferrer"
               class="detail-link-btn detail-link-btn--primary">
              View codebase on GitHub ↗
            </a>
          </div>

        </div>
      </section>
    </div>`;
}
