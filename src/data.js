// ── data.js — all static content ─────────────────────────────────────────
// Edit this file to update any text, skills, jobs, or projects on the site.

export const PHRASES = [
  'Banking Infrastructure',
  'Incident Response',
  'Technical Leadership',
  'Next: Cybersecurity',
];

export const SKILL_INFO = {
  'Core Banking Systems':             'Software platforms that handle the central operations of a bank — accounts, transactions, interest, and compliance. Ultradata\'s core banking platform serves mutual banks and credit unions across Australia.',
  'AML Systems':                      'Anti-Money Laundering systems monitor transactions for suspicious patterns to comply with financial regulations. Vansh manages reporting databases for these systems across client banking environments.',
  'NPP Payments':                     'The New Payments Platform — Australia\'s real-time payments infrastructure. Outages here mean customers can\'t transfer money instantly. Responding to NPP failures is a critical part of the incident response role.',
  'UniVerse DB':                      'A multidimensional NoSQL database by Rocket Software, widely used in legacy banking systems. Vansh administers UniVerse environments to keep banking clients running.',
  'SQL Server':                       'Microsoft\'s relational database engine. Used extensively at Ultradata for managing client reporting, AML data, and operational queries.',
  'IIS':                              'Internet Information Services — Microsoft\'s web server. Used to host and troubleshoot client-facing banking web applications.',
  'High-Pressure Incident Management':'The ability to stay calm, communicate clearly, and drive resolution when systems are down in a live banking environment — where every minute of downtime has real financial consequences.',
  'Escalation Leadership':            'Acting as the senior escalation point for complex or unresolved incidents — owning client communication and coordinating resolution across the team.',
  'Production Outage Response':       'End-to-end handling of live system failures: triage, diagnosis, stakeholder communication, resolution, and post-incident documentation.',
  'SSL/TLS Management':               'Managing security certificates that encrypt communication between banking applications and users. Expired or misconfigured certs take down client-facing services.',
  'Team Leadership':                  'Built across six years at Woolworths and refined at Ultradata — leading teams under pressure, delegating by expertise, and keeping people focused when things go wrong.',
  'Mentoring & Training':             'Onboarding new technical staff at Ultradata, giving them the context and skills to become effective quickly in a complex banking support environment.',
  'Sprint Planning':                  'Organising work into structured delivery cycles using Agile methodology — applied during the RoboCup capstone and in technical workflow management.',
  'Task Delegation':                  'Assigning cases and responsibilities based on team member expertise and current workload — a core part of the Assistant Manager role.',
  'Client Communication':             'Managing expectations with banking clients during incidents — translating technical status into clear, reassuring updates that maintain trust.',
  'Microsoft SQL':                    'Industry-standard relational database used for querying, reporting, and managing structured data across banking environments.',
  'Server Networking':                'Practical knowledge of how servers communicate across networks — including TCP/IP fundamentals, DNS resolution, firewall rules, port configuration, and diagnosing connectivity issues between client and server environments.',
  'Scripting':                        'Writing shell and batch scripts to automate repetitive tasks, streamline system administration, and reduce manual overhead — applied across Windows and Unix-based environments.',
  'Unix':                             'The foundational operating system underlying many banking and enterprise systems. Command-line proficiency is essential for server-side troubleshooting.',
  'Remote Desktop':                   'RDP-based remote access used daily to connect to and manage client server environments without physical access.',
  'Git':                              'Version control system used for tracking code changes, collaborating on projects, and maintaining a history of deployments — used in the RoboCup capstone and open-source release.',
  'VirtualBox':                       'Desktop virtualisation tool used to spin up isolated environments for testing and development without impacting production systems.',
  'IIS Configuration':                'Setting up and managing IIS sites, application pools, bindings, and certificates — essential for hosting banking web applications reliably.',
  'Web Application Hosting':          'Deploying and maintaining web-based banking applications in live environments, including SSL setup, port configuration, and performance monitoring.',
  'Windows Event Viewer':             'Windows diagnostic tool used to read system and application logs to identify the root cause of crashes, failures, and service interruptions.',
  'Log Analysis':                     'Reading IIS logs, application trace logs, and event logs to trace the source of production issues — a primary diagnostic skill in the support role.',
  'Risk Governance':                  'The frameworks and policies that define how an organisation identifies, assesses, and manages cybersecurity risks — the focus of Vansh\'s UNSW specialisation.',
  'Compliance Frameworks':            'Standards like ISO 27001, NIST, and the Australian Cyber Security Centre\'s Essential Eight that guide how organisations secure their systems and demonstrate due diligence.',
  'Digital Business Security':        'Foundational RMIT subject covering how businesses protect their digital assets, manage access, and respond to security incidents.',
  'Systems Deployment':               'The process of releasing software into production environments safely — including configuration management, rollback planning, and change control.',
};

export const SKILLS = [
  ['Banking Technology',          ['Core Banking Systems', 'AML Systems', 'NPP Payments', 'UniVerse DB', 'SQL Server', 'IIS']],
  ['Incident Response',           ['High-Pressure Incident Management', 'Escalation Leadership', 'Production Outage Response', 'SSL/TLS Management']],
  ['Leadership',                  ['Team Leadership', 'Mentoring & Training', 'Sprint Planning', 'Task Delegation', 'Client Communication']],
  ['Technical Systems',           ['Microsoft SQL', 'Server Networking', 'Scripting', 'Unix', 'Remote Desktop', 'Git', 'VirtualBox']],
  ['Web & Infrastructure',        ['IIS Configuration', 'Web Application Hosting', 'Windows Event Viewer', 'Log Analysis']],
  ['Cybersecurity (Foundational)', ['Risk Governance', 'Compliance Frameworks', 'Digital Business Security', 'Systems Deployment']],
];

export const EXPERIENCE = [
  {
    role:     'Assistant Technical Support Manager',
    company:  'Ultradata Australia',
    loc:      'Malvern, Victoria',
    dates:    'Feb 2024 — Present',
    promoted: 'Promoted from Technical Support Consultant · Sep 2024',
    context:  'Ultradata powers the technology behind mutual banks and credit unions across Australia — core banking, payment infrastructure, and AML compliance systems. When systems fail in banking, real people feel it. This is the team that fixes it.',
    points: [
      'Manage and maintain SQL databases including reporting and AML systems across client environments',
      'Administer UniVerse database environments, ensuring optimal performance and uptime for banking clients',
      'Handle SSL/TLS certificate management — updates and renewals across live and development environments',
      'Configure and manage IIS for hosting and troubleshooting client-facing web applications',
      'Respond to high-pressure incidents including application outages and NPP (New Payments Platform) failures',
      'Act as the team\'s senior escalation point — own client communication, manage expectations, drive resolution',
      'Provide operational oversight as second-in-command; delegate cases based on expertise and workload',
      'Develop and maintain knowledge bases and technical documentation to sharpen team efficiency',
      'Train and mentor new team members, giving them the context and skills to get up to speed quickly',
    ],
    metrics: [['30+', 'Cases / month'], ['#1', 'Escalation point'], ['2+', 'Years fintech']],
  },
  {
    role:    'Front End Supervisor',
    company: 'Woolworths',
    loc:     'Highett, Victoria',
    dates:   'Aug 2018 — Nov 2024',
    context: 'Six years of managing people, pressure, and process — before a single SQL query. The instinct for calm communication and holding a team together when things go wrong was built here, long before IT.',
    points: [
      'Led and supervised front-end operations, maintaining consistently high service standards',
      'Trained and mentored new and existing staff, improving team efficiency and policy adherence',
      'Managed cash handling and financial reconciliation with minimal discrepancies',
      'Resolved customer escalations professionally, finding quick solutions that maintained trust',
      'Identified and addressed workflow bottlenecks, reducing wait times and improving performance',
    ],
  },
  {
    role:    'Capstone Team Member',
    company: 'RMIT RedBackBots',
    loc:     'RMIT University, Melbourne',
    dates:   'Jul 2023 — Nov 2023',
    badge:   '3rd Place · International RoboCup',
    website: 'https://redbackbots.com/',
    context: 'An RMIT team that took on the world. We finished third in the Challenge Shield Division at the 2024 international RoboCup — and learned what it takes to deliver under real deadlines with real stakes.',
    points: [
      'Led a multidisciplinary team preparing robots for the 2024 international RoboCup competition',
      'Developed and executed marketing strategies, created promotional materials, acquired sponsors',
      'Managed project timelines using Agile methodologies throughout',
      'Used Git for version control and released the codebase publicly, contributing to open-source',
    ],
  },
];

export const STORY = [
  {
    chapter: 'Leadership before tech',
    period:  '2018 – 2024',
    body:    'It didn\'t start in IT. Before any SQL query or incident ticket, I spent six years supervising the front end at Woolworths — managing teams under real pressure, de-escalating difficult situations, and learning that calm under pressure is a skill you have to earn. Six years. Every shift. That foundation doesn\'t come from a textbook.',
  },
  {
    chapter: 'Learning the technology',
    period:  '2021 – 2023',
    body:    'RMIT\'s Bachelor of Information Technology gave me the language to match the instincts I\'d already developed. Systems thinking, database design, security fundamentals, software engineering. The degree connected the dots — and opened the door to a career in something I\'d come to care about deeply.',
  },
  {
    chapter: 'Joining Ultradata',
    period:  'Feb 2024 – Present',
    body:    'Ultradata Australia provides core banking systems, payment infrastructure, and AML compliance platforms to mutual banks and credit unions across the country. I joined as a Technical Support Consultant in February 2024 and was promoted to Assistant Technical Support Manager in September 2024. When banking systems go down, the consequences aren\'t abstract. This is where leadership and technical depth come together.',
  },
  {
    chapter: 'The next chapter',
    period:  'Now → 2028',
    body:    'A Master of Cybersecurity at UNSW — averaging 80% — is the natural progression from responding to incidents to preventing them. The goal is senior security leadership. Not just someone who can fix things, but someone who can build organisations that are resilient before things break.',
  },
];

export const PROJECTS = [
  {
    id:          'ssl-monitor',
    title:       'SSL/TLS Certificate Monitor',
    tag:         'Python · Security',
    status:      'Live',
    statusColor: '#16A34A',
    desc:        'Desktop GUI + CLI tool that checks SSL/TLS certificate expiry across multiple domains in parallel. Features a full domain manager (add, edit, remove, reorder), colour-coded results table, JSON/CSV export, and CI-friendly exit codes. Zero external dependencies.',
    github:      'https://github.com/Vansh-Shah/SSL-Monitor',
    detail:      true,
  },
  {
    id:          'portfolio',
    title:       'This Portfolio',
    tag:         'Vite · Design',
    status:      'Live',
    statusColor: '#16A34A',
    desc:        'Rebuilt from a single-page résumé layout into a narrative-driven multi-page personal brand site. Modular Vite architecture, dark/light theme, scroll-driven interactions.',
    github:      'https://github.com/Vansh-Shah/VanshShah-Portfolio',
    detail:      true,
  },
  {
    id:          'robocup',
    title:       'RoboCup Capstone',
    tag:         'Robotics · Agile',
    status:      '3rd Place',
    statusColor: 'var(--accent)',
    desc:        'Led the RMIT RedBackBots team to 3rd place internationally at the 2024 RoboCup Challenge Shield Division. Managed timelines, sponsorships, and public codebase release.',
    github:      'https://github.com/rmit-computing-technologies/redbackbots-coderelease',
    website:     'https://redbackbots.com/',
    detail:      true,
  },
  {
    id:          'qr-security',
    title:       'QR Code Security Analysis',
    tag:         'Security Engineering · Research',
    status:      'Published',
    statusColor: '#16A34A',
    desc:        'A structured security engineering analysis of QR code systems — covering threat modelling (STRIDE, attack trees), data flow analysis, cryptographic controls, real-world attack techniques (quishing, physical replacement, payload delivery), and multi-layered recommendations. Completed as part of the Principles of Security Engineering unit.',
    github:      null,
    pdf:         '/qr-security-analysis.pdf',
    detail:      true,
  },
];
