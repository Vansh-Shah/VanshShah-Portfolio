// ── pages/contact.js ──────────────────────────────────────────────────────
import { html }     from '../components/html.js';
import { Icons }    from '../components/icons.js';
import { secLabel } from '../components/helpers.js';

// ── Page-specific data (edit here to update the Contact page) ─────────────

const SOCIAL_LINKS = [
  {
    label:    'LinkedIn',
    sublabel: 'Connect professionally',
    href:     'https://linkedin.com/in/vansh-shah-840b331a6',
    icon:     Icons.linkedin,
    color:    '#0A66C2',
  },
  {
    label:    'GitHub',
    sublabel: 'See what I\'m building',
    href:     'https://github.com/Vansh-Shah',
    icon:     Icons.github,
    color:    'var(--ink)',
  },
  {
    label:    'Email',
    sublabel: 'svansh3212@gmail.com',
    href:     'mailto:svansh3212@gmail.com',
    icon:     Icons.email,
    color:    'var(--accent)',
  },
];

// Formspree endpoint — sign up at https://formspree.io and replace YOUR_FORM_ID
const FORMSPREE_URL = 'https://formspree.io/f/mrevokzl';

// ── Sub-components ────────────────────────────────────────────────────────

function SocialCard({ label, sublabel, href, icon, color }) {
  return html`
    <a href="${href}" target="_blank" rel="noopener noreferrer"
       class="social-card" aria-label="${label}">
      <span class="social-card-icon" style="color:${color}">${icon}</span>
      <div class="social-card-text">
        <div class="social-card-name">${label}</div>
        <div class="social-card-sub">${sublabel}</div>
      </div>
      <span class="social-card-arrow">${Icons.arrowRight}</span>
    </a>`;
}

function ContactForm() {
  return html`
    <form class="contact-form" id="contactForm" novalidate>
      <div class="form-group">
        <label class="form-label" for="cf-name">Name <span class="req" aria-hidden="true">*</span></label>
        <input class="form-input" type="text" id="cf-name"
               placeholder="Your name" autocomplete="name" required
               aria-required="true" aria-describedby="cf-name-err" />
        <p class="form-error" id="cf-name-err" aria-live="polite"></p>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-email">Email <span class="req" aria-hidden="true">*</span></label>
        <input class="form-input" type="email" id="cf-email"
               placeholder="your@email.com" autocomplete="email" required
               aria-required="true" aria-describedby="cf-email-err" />
        <p class="form-error" id="cf-email-err" aria-live="polite"></p>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-subject">Subject <span class="req" aria-hidden="true">*</span></label>
        <input class="form-input" type="text" id="cf-subject"
               placeholder="e.g. Resume Request, Job Opportunity, Collaboration" required
               aria-required="true" aria-describedby="cf-subject-err" />
        <p class="form-error" id="cf-subject-err" aria-live="polite"></p>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-message">Message <span class="req" aria-hidden="true">*</span></label>
        <textarea class="form-input form-textarea" id="cf-message"
                  placeholder="Tell me what you're thinking…"
                  rows="5" required
                  aria-required="true" aria-describedby="cf-message-err"></textarea>
        <p class="form-error" id="cf-message-err" aria-live="polite"></p>
      </div>
      <button type="submit" class="form-submit" id="formSubmit">
        <span id="submitLabel">Send message</span>
        <span id="submitIcon" aria-hidden="true">→</span>
      </button>
      <p class="form-note" id="formNote" aria-live="polite"></p>
    </form>`;
}

function Sidebar() {
  return html`
    <div class="contact-sidebar">
      <div class="reveal">
        <p class="sidebar-label">Find me on</p>
        <div class="social-cards">
          ${SOCIAL_LINKS.map(SocialCard).join('')}
        </div>
      </div>
    </div>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderContact() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Contact')}

          <h2 class="sy reveal contact-headline">Let's talk.</h2>
          <p class="reveal contact-intro">
            Whether you're hiring, collaborating, or just want to connect —
            fill out the form below, or grab my email directly.
          </p>

          <div class="reveal contact-quick">
            <button class="copy-email-btn" id="copyEmailBtn" type="button"
                    data-email="svansh3212@gmail.com" aria-label="Copy email address to clipboard">
              <span class="copy-email-addr">svansh3212@gmail.com</span>
              <span class="copy-email-action" id="copyEmailAction">Copy</span>
            </button>
          </div>

          <div class="contact-layout">
            <div class="reveal contact-form-wrap">
              ${ContactForm()}
            </div>
            ${Sidebar()}
          </div>

        </div>
      </section>
    </div>`;
}

// ── Copy-email button (one-tap copy, with a text fallback) ────────────────

function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  const action = document.getElementById('copyEmailAction');
  if (!btn || !action) return;

  let resetTimer = null;
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        ok = true;
      }
    } catch { ok = false; }

    action.textContent = ok ? 'Copied ✓' : 'Select & copy';
    btn.classList.toggle('copy-email-btn--done', ok);
    if (!ok) window.getSelection?.()?.selectAllChildren?.(btn.querySelector('.copy-email-addr'));

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      action.textContent = 'Copy';
      btn.classList.remove('copy-email-btn--done');
    }, 2000);
  });
}

// ── Init (wires up the contact form after render) ─────────────────────────

export function initContact() {
  initCopyEmail();

  const form      = document.getElementById('contactForm');
  const note      = document.getElementById('formNote');
  const submitBtn = document.getElementById('formSubmit');
  const submitLbl = document.getElementById('submitLabel');
  const submitIcon= document.getElementById('submitIcon');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const FIELDS = [
    { id: 'cf-name',    check: v => v ? '' : 'Please enter your name.' },
    { id: 'cf-email',   check: v => !v ? 'Please enter your email address.'
                                : !EMAIL_RE.test(v) ? 'That email address doesn\'t look right — check for typos.' : '' },
    { id: 'cf-subject', check: v => v ? '' : 'Please add a subject.' },
    { id: 'cf-message', check: v => v ? '' : 'Please write a message.' },
  ];

  function setFieldError(id, msg) {
    const input = document.getElementById(id);
    const err   = document.getElementById(id + '-err');
    input.classList.toggle('form-input--error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
  }

  function validateField({ id, check }) {
    const msg = check(document.getElementById(id).value.trim());
    setFieldError(id, msg);
    return !msg;
  }

  // Validate on blur (not on keystroke), clear the error as soon as it's fixed
  FIELDS.forEach(f => {
    const input = document.getElementById(f.id);
    input.addEventListener('blur', () => validateField(f));
    input.addEventListener('input', () => {
      if (input.classList.contains('form-input--error')) validateField(f);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields; focus the first invalid one
    const firstInvalid = FIELDS.filter(f => !validateField(f))[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid.id).focus();
      showNote('Please fix the highlighted fields.', 'error');
      return;
    }
    showNote('', 'success');

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    submitBtn.disabled    = true;
    submitLbl.textContent = 'Sending…';
    submitIcon.textContent= '';

    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        form.reset();
        submitLbl.textContent = 'Sent ✓';
        showNote('Message sent — I\'ll get back to you soon.', 'success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      showNote('Something went wrong. Email me at svansh3212@gmail.com', 'error');
      submitLbl.textContent  = 'Send message';
      submitIcon.textContent = '→';
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showNote(msg, type) {
    note.textContent = msg;
    note.className   = `form-note form-note--${type}`;
  }
}
