// ── footer.js — site-wide footer ─────────────────────────────────────────
import { html }  from './html.js';
import { Icons } from './icons.js';

const NAV_PAGES = ['home', 'story', 'work', 'education', 'projects', 'toolkit', 'contact'];

function NavLink(page) {
  const label = page.charAt(0).toUpperCase() + page.slice(1);
  return html`
    <button class="footer-nav-btn" data-page="${page}">${label}</button>`;
}

function IconLink(href, ariaLabel, icon, extra = '') {
  return html`
    <a href="${href}" ${extra} class="footer-icon" aria-label="${ariaLabel}">${icon}</a>`;
}

let clockStarted = false;

function tickClock() {
  const el = document.getElementById('footerClock');
  if (!el) return;
  let s;
  try {
    s = new Date().toLocaleTimeString('en-AU', {
      timeZone: 'Australia/Melbourne', hour: 'numeric', minute: '2-digit', hour12: true,
    });
  } catch (e) {
    s = new Date().toLocaleTimeString();
  }
  el.textContent = s;
}

function initClock() {
  tickClock();
  if (clockStarted) return;
  clockStarted = true;
  setInterval(tickClock, 1000);
}

// Pure markup, so the build-time prerender script can emit the footer into
// static HTML without a DOM.
export function footerHtml() {
  return html`
    <div class="wrap footer-inner">

      <div class="footer-top">
        <div class="footer-identity">
          <div class="footer-name">Vansh Shah</div>
          <div class="footer-sub">Keeping banks running. Building what's next.</div>
          <div class="footer-clock">
            <span class="footer-clock-dot" aria-hidden="true"></span>
            Melbourne · <span id="footerClock" class="footer-clock-time"></span>
          </div>
        </div>
        <nav aria-label="Footer navigation" class="footer-nav">
          ${NAV_PAGES.map(NavLink).join('')}
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Vansh Shah.</p>
        <div class="footer-social">
          ${IconLink('https://linkedin.com/in/vansh-shah-840b331a6', 'LinkedIn', Icons.linkedinSm, 'target="_blank" rel="noopener noreferrer"')}
          ${IconLink('https://github.com/Vansh-Shah',      'GitHub',   Icons.githubSm,   'target="_blank" rel="noopener noreferrer"')}
          ${IconLink('mailto:svansh3212@gmail.com',       'Email',    Icons.emailSm)}
        </div>
      </div>

    </div>`;
}

export function renderFooter() {
  document.getElementById('site-footer').innerHTML = footerHtml();

  initClock();

  // Wire footer nav buttons (goTo is on window)
  document.querySelectorAll('.footer-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.goTo(btn.dataset.page);
      window.scrollTo(0, 0);
    });
  });
}
