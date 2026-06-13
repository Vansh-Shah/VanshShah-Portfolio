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

const LOOKING_FOR = [
  'Senior Technical Roles',
  'Cybersecurity Opportunities',
  'Fintech & Banking',
  'Security Leadership',
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
        <label class="form-label" for="cf-name">Name</label>
        <input class="form-input" type="text" id="cf-name"
               placeholder="Your name" autocomplete="name" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-email">Email</label>
        <input class="form-input" type="email" id="cf-email"
               placeholder="your@email.com" autocomplete="email" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-subject">Subject</label>
        <input class="form-input" type="text" id="cf-subject"
               placeholder="e.g. Resume Request, Job Opportunity, Collaboration" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-message">Message</label>
        <textarea class="form-input form-textarea" id="cf-message"
                  placeholder="Tell me what you're thinking…"
                  rows="5" required></textarea>
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
      <div class="reveal looking-for-card">
        <div class="sy looking-for-title">What I'm looking for</div>
        <div class="looking-for-pills">
          ${LOOKING_FOR.map(t => html`<span class="tag-pill">${t}</span>`).join('')}
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
            fill out the form below.
          </p>

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

// ── Init (wires up the contact form after render) ─────────────────────────

export function initContact() {
  const form      = document.getElementById('contactForm');
  const note      = document.getElementById('formNote');
  const submitBtn = document.getElementById('formSubmit');
  const submitLbl = document.getElementById('submitLabel');
  const submitIcon= document.getElementById('submitIcon');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !subject || !message) {
      showNote('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNote('Please enter a valid email address.', 'error');
      return;
    }

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
