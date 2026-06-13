// ── footer.js — site-wide footer ─────────────────────────────────────────
import { html }  from './html.js';
import { Icons } from './icons.js';

const NAV_PAGES = ['home', 'story', 'work', 'education', 'projects', 'contact'];

function NavLink(page) {
  const label = page.charAt(0).toUpperCase() + page.slice(1);
  return html`
    <button class="footer-nav-btn" data-page="${page}">${label}</button>`;
}

function IconLink(href, ariaLabel, icon, extra = '') {
  return html`
    <a href="${href}" ${extra} class="footer-icon" aria-label="${ariaLabel}">${icon}</a>`;
}

export function renderFooter() {
  document.getElementById('site-footer').innerHTML = html`
    <div class="wrap footer-inner">

      <div class="footer-top">
        <div class="footer-identity">
          <div class="sy footer-name">Vansh Shah</div>
          <div class="footer-sub">Assistant Technical Support Manager · Ultradata Australia</div>
          <div class="footer-sub">Melbourne, VIC · Available for opportunities</div>
        </div>
        <nav aria-label="Footer navigation" class="footer-nav">
          ${NAV_PAGES.map(NavLink).join('')}
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Vansh Shah. Built by hand.</p>
        <div class="footer-social">
          ${IconLink('https://linkedin.com/in/vansh-shah-840b331a6', 'LinkedIn', Icons.linkedinSm, 'target="_blank" rel="noopener noreferrer"')}
          ${IconLink('https://github.com/Vansh-Shah',      'GitHub',   Icons.githubSm,   'target="_blank" rel="noopener noreferrer"')}
          ${IconLink('mailto:svansh3212@gmail.com',       'Email',    Icons.emailSm)}
        </div>
      </div>

    </div>`;

  // Wire footer nav buttons (goTo is on window)
  document.querySelectorAll('.footer-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.goTo(btn.dataset.page);
      window.scrollTo(0, 0);
    });
  });
}
