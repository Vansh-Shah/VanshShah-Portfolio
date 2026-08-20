// ── pages/notfound.js ────────────────────────────────────────────────────
// A 404 page that stays in character — the URL you tried gets `cat`'d by
// the same fake shell that runs the Toolkit page, and comes back missing.
import { html } from '../components/html.js';
import { eyebrow } from '../components/helpers.js';

const escapeHtml = s => String(s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

export function renderNotFound(path) {
  const target = escapeHtml('/' + (path || ''));
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${eyebrow('404', { brand: true })}
          <h1 class="reveal toolkit-headline">This page doesn't exist.</h1>
          <p class="reveal toolkit-intro">Bad link, or a page that moved. Either way, it's not here.</p>

          <div class="terminal-panel reveal" style="max-width:600px;margin-bottom:32px;">
            <div class="terminal-panel-tab">
              <span class="terminal-dot terminal-dot--r"></span>
              <span class="terminal-dot terminal-dot--y"></span>
              <span class="terminal-dot terminal-dot--g"></span>
              <span class="terminal-panel-label">ERROR</span>
            </div>
            <pre class="terminal-panel-body"><span class="cli-prompt-echo">visitor@toolkit:~$</span> <span class="cli-typed">cat ${target}</span>
cat: ${target}: No such file or directory</pre>
          </div>

          <div class="reveal hero-cta">
            <button class="primary-btn" data-page="home">Back home</button>
            <button class="ghost-btn" data-page="toolkit">Try the real shell →</button>
          </div>

        </div>
      </section>
    </div>`;
}
