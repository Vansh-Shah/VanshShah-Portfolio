// ── pages/education.js ────────────────────────────────────────────────────
import { html }                        from '../components/html.js';
import { secLabel, infoGrid, tagCloud } from '../components/helpers.js';

// ── Page-specific data (edit here to update the Education page) ───────────

const UNSW = {
  status:         'In Progress · Current — Est. Mar 2028',
  degree:         'Master of Cybersecurity',
  specialisation: 'Specialisation: Risk Governance &amp; Management',
  institution:    'UNSW Sydney · Online',
  average:        '80%',
  body: `The UNSW Master of Cybersecurity is a 12-course online program designed to develop
    senior security capability — either through the Security Engineering or Security
    Management specialisation. The Risk Governance &amp; Management track is built for
    professionals moving toward strategic and compliance-oriented security leadership,
    focusing on how organisations identify, assess, and govern cyber risk at scale.`,
  quote: `"Cybersecurity isn't just the next career step — it's the natural evolution of
    everything that came before. Understanding how systems can be compromised is the
    first step to making them resilient."`,
  grid: [
    ['Program structure',    '12 courses across core foundations and a chosen specialisation, including a capstone project integrating real-world security challenges.'],
    ['Specialisation focus', 'Risk Governance &amp; Management — covering GRC frameworks, cyber risk strategy, compliance standards, and security leadership.'],
    ['Career outcomes',      'Graduates are positioned for roles including Cybersecurity Analyst, Security Architect, Risk Manager, and CISO across finance, government, defence, and tech.'],
    ['Industry context',     'Cybersecurity Analyst roles in Australia are projected to grow by 38.9% over the next five years (Seek, 2026). UNSW is ranked in the global top 20 by QS World University Rankings.'],
  ],
  units: [
    'Foundations of Cyber Security', 'Governance, Risk &amp; Compliance',
    'Cyber Risk Strategy', 'Security Management', 'Threat Modelling',
    'Digital Forensics', 'Cybersecurity Law &amp; Ethics', 'Capstone Project',
  ],
};

const RMIT = {
  status:      'Completed · Mar 2021 — Nov 2023',
  degree:      'Bachelor of Information Technology',
  institution: 'RMIT University · Melbourne City Campus',
  body: `RMIT's Bachelor of IT is a three-year, industry-focused degree built around
    real-world problem solving — from websites to enterprise systems to network
    programming. The program is structured to expose students to a range of
    specialisations early, with work-integrated learning embedded throughout.
    Vansh graduated with a pathway toward cyber security and enterprise systems,
    building the technical foundation that made the move into Ultradata's banking
    environment possible.`,
  grid: [
    ['Majors available',         'Cyber Security, Enterprise System Development, and Digital Innovation — with 15 IT specialisation minors including cloud computing, AI, data science, and networking.'],
    ['Learning approach',        'Industry-based, practical learning with real-world group projects and assignments. Lecturers bring direct industry experience into the classroom.'],
    ['Work-integrated learning', 'Hands-on industry experience is embedded in the degree, giving students the chance to build professional networks and apply skills in real environments before graduating.'],
    ['Technical breadth',        'Subjects span web programming, software engineering, database applications, AI foundations in Python, digital business security, and systems deployment and operations.'],
  ],
  subjects: [
    'Web Programming', 'Software Engineering', 'Database Applications',
    'AI Foundations (Python)', 'Digital Business Security',
    'Systems Deployment &amp; Ops', 'Networking Fundamentals', 'Capstone: RoboCup',
  ],
};

// ── Sub-components ────────────────────────────────────────────────────────

function TagBlock(label, items) {
  return html`
    <div class="reveal tag-block">
      <div class="tag-block-label">${label}</div>
      <div class="tag-block-pills">${tagCloud(items)}</div>
    </div>`;
}

function UnswBlock() {
  return html`
    <div class="reveal edu-block">
      <div class="edu-header">
        <div>
          <span class="edu-status edu-status--accent">${UNSW.status}</span>
          <div class="sy edu-degree">${UNSW.degree}</div>
          <div class="edu-specialisation">${UNSW.specialisation}</div>
          <div class="edu-institution">${UNSW.institution}</div>
        </div>
        <div class="edu-avg-card">
          <div class="sy edu-avg-num">${UNSW.average}</div>
          <div class="edu-avg-label">Current avg.</div>
        </div>
      </div>

      <p class="reveal edu-body">${UNSW.body}</p>

      ${infoGrid(UNSW.grid)}

      <div class="reveal edu-quote">
        <p>${UNSW.quote}</p>
      </div>

      ${TagBlock('Units covering', UNSW.units)}
    </div>`;
}

function RmitBlock() {
  return html`
    <div class="reveal edu-block">
      <span class="edu-status edu-status--muted">${RMIT.status}</span>
      <div class="sy edu-degree">${RMIT.degree}</div>
      <div class="edu-institution">${RMIT.institution}</div>

      <p class="reveal edu-body">${RMIT.body}</p>

      ${infoGrid(RMIT.grid)}

      ${TagBlock('Key subjects', RMIT.subjects)}
    </div>`;
}

// ── Page render ───────────────────────────────────────────────────────────

export function renderEducation() {
  return html`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${secLabel('Education')}
          ${UnswBlock()}
          <div class="divid"></div>
          ${RmitBlock()}

        </div>
      </section>
    </div>`;
}
