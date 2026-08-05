(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`visible`),e.unobserve(t.target))})},{threshold:.1,rootMargin:`0px 0px -40px 0px`});function t(){document.querySelectorAll(`.reveal, .reveal-group`).forEach(t=>{t.classList.remove(`visible`),e.observe(t)})}function n(){let e=window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;document.querySelectorAll(`[data-count]`).forEach(t=>{let n=parseFloat(t.dataset.count),r=t.dataset.suffix||``,i=Number.isInteger(n);if(e){t.textContent=(i?n:n.toFixed(1))+r;return}let a=performance.now();function o(e){let s=Math.min((e-a)/900,1),c=1-(1-s)**3;t.textContent=(i?Math.round(n*c):(n*c).toFixed(1))+r,s<1&&requestAnimationFrame(o)}requestAnimationFrame(o)})}function r(){let e=document.body.scrollHeight-window.innerHeight;document.getElementById(`prog`).style.width=e>0?window.scrollY/e*100+`%`:`0%`}var i={dark:`#09090b`,light:`#fafafc`};function a(){(function(){let e=null;try{e=localStorage.getItem(`theme`)}catch{}let t=window.matchMedia&&window.matchMedia(`(prefers-color-scheme: light)`).matches;if(e===`light`||e===null&&t){let e=document.getElementById(`app`),t=document.getElementById(`togBtn`),n=document.getElementById(`themeColorMeta`);if(e.classList.remove(`dark`),t){let e=document.getElementById(`togLabel`);e&&(e.textContent=`Dark`),t.setAttribute(`aria-pressed`,`false`),t.setAttribute(`aria-label`,`Switch to dark mode`)}n&&(n.content=i.light)}})();let e=document.querySelector(`.nav-links`);e.addEventListener(`keydown`,t=>{let n=[...e.querySelectorAll(`button.np`)],r=n.indexOf(document.activeElement);r!==-1&&(t.key===`ArrowRight`&&(t.preventDefault(),n[(r+1)%n.length].focus()),t.key===`ArrowLeft`&&(t.preventDefault(),n[(r-1+n.length)%n.length].focus()),t.key===`Home`&&(t.preventDefault(),n[0].focus()),t.key===`End`&&(t.preventDefault(),n[n.length-1].focus()))}),window.addEventListener(`scroll`,r,{passive:!0});let t=document.getElementById(`hamburgerBtn`),n=document.getElementById(`mobileMenu`);function a(){n.classList.remove(`open`),t.setAttribute(`aria-expanded`,`false`),n.setAttribute(`aria-hidden`,`true`)}function o(){n.classList.add(`open`),t.setAttribute(`aria-expanded`,`true`),n.setAttribute(`aria-hidden`,`false`);let e=n.querySelector(`button`);e&&e.focus()}t.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.contains(`open`)?a():o()}),n.addEventListener(`keydown`,e=>{e.key===`Escape`&&(a(),t.focus())}),document.addEventListener(`click`,e=>{!n.contains(e.target)&&e.target!==t&&a()});let s=document.getElementById(`nav-logo`);s.addEventListener(`click`,()=>window.goTo(`home`)),s.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),window.goTo(`home`))});let c=document.getElementById(`togBtn`),l=document.getElementById(`togLabel`),u=document.getElementById(`themeColorMeta`);c.addEventListener(`click`,()=>{let e=document.getElementById(`app`).classList.toggle(`dark`);l&&(l.textContent=e?`Light`:`Dark`),c.setAttribute(`aria-pressed`,String(e)),c.setAttribute(`aria-label`,e?`Switch to light mode`:`Switch to dark mode`),u&&(u.content=e?i.dark:i.light);try{localStorage.setItem(`theme`,e?`dark`:`light`)}catch{}})}var o=(e,...t)=>e.reduce((e,n,r)=>e+n+(t[r]===void 0?``:t[r]),``),s={arrowRight:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,linkedin:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,github:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,email:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,linkedinSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,githubSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,emailSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`},c=[`home`,`story`,`work`,`education`,`projects`,`toolkit`,`contact`];function l(e){return o`
    <button class="footer-nav-btn" data-page="${e}">${e.charAt(0).toUpperCase()+e.slice(1)}</button>`}function u(e,t,n,r=``){return o`
    <a href="${e}" ${r} class="footer-icon" aria-label="${t}">${n}</a>`}var d=!1;function f(){let e=document.getElementById(`footerClock`);if(!e)return;let t;try{t=new Date().toLocaleTimeString(`en-AU`,{timeZone:`Australia/Melbourne`,hour:`numeric`,minute:`2-digit`,hour12:!0})}catch{t=new Date().toLocaleTimeString()}e.textContent=t}function ee(){f(),!d&&(d=!0,setInterval(f,1e3))}function te(){document.getElementById(`site-footer`).innerHTML=o`
    <div class="wrap footer-inner">

      <div class="footer-top">
        <div class="footer-identity">
          <div class="sy footer-name">Vansh Shah</div>
          <div class="footer-sub">Keeping banks running. Building what's next.</div>
          <div class="footer-clock">
            <span class="footer-clock-dot" aria-hidden="true"></span>
            Melbourne · <span id="footerClock" class="footer-clock-time"></span>
          </div>
        </div>
        <nav aria-label="Footer navigation" class="footer-nav">
          ${c.map(l).join(``)}
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Vansh Shah. Built by hand.</p>
        <div class="footer-social">
          ${u(`https://linkedin.com/in/vansh-shah-840b331a6`,`LinkedIn`,s.linkedinSm,`target="_blank" rel="noopener noreferrer"`)}
          ${u(`https://github.com/Vansh-Shah`,`GitHub`,s.githubSm,`target="_blank" rel="noopener noreferrer"`)}
          ${u(`mailto:svansh3212@gmail.com`,`Email`,s.emailSm)}
        </div>
      </div>

    </div>`,ee(),document.querySelectorAll(`.footer-nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{window.goTo(e.dataset.page),window.scrollTo(0,0)})})}var p=[{display:`6+`,count:`6`,suffix:`+`,label:`Yrs leading teams`},{display:`2+`,count:`2`,suffix:`+`,label:`Yrs in fintech`},{display:`80%`,count:`80`,suffix:`%`,label:`Masters average`,accent:!0},{display:`3rd`,count:null,label:`RoboCup intl 2024`}],m=[[`all`,`Everything`],[`banking`,`Banking systems`],[`ops`,`Operations`],[`client`,`Client & leadership`],[`study`,`Studying now`]],h=[{name:`Core banking platforms`,cat:`banking`,cadence:`Daily`,what:`The platform that runs a bank’s accounts, transactions, interest and compliance.`,how:`Ultradata’s core banking platform serves mutual banks and credit unions across Australia. Most cases that reach me start somewhere inside it.`},{name:`UniVerse DB`,cat:`banking`,cadence:`Daily`,what:`A multidimensional NoSQL database by Rocket Software, still carrying a lot of legacy banking.`,how:`I administer UniVerse environments — port status, locks, performance — and wrote a tool to read its diagnostic captures because doing it by hand mid-incident is slow.`,project:`uvdiag-lock-analysis`,projectLabel:`UVDiag Lock Analysis`},{name:`Microsoft SQL Server`,cat:`banking`,cadence:`Daily`,what:`Microsoft’s relational database engine.`,how:`Reporting and AML databases across client environments: querying, maintenance, and tracing where a number actually came from.`},{name:`AML systems`,cat:`banking`,cadence:`Regular`,what:`Anti-money-laundering monitoring that watches transactions for suspicious patterns under regulatory obligation.`,how:`I maintain the reporting databases behind these systems across client banking environments.`},{name:`NPP payments`,cat:`banking`,cadence:`Regular`,what:`The New Payments Platform — Australia’s real-time payments infrastructure.`,how:`When NPP fails, customers can’t move money instantly. These are the incidents that don’t wait for business hours.`},{name:`Production deployments & upgrades`,cat:`ops`,cadence:`Regular`,what:`Rolling technical changes, releases and version upgrades out to live client systems.`,how:`I implement changes directly in client production environments and handle software/patch upgrades on their systems — coordinated around the client’s go-live window, not just tested in a lab.`},{name:`SSL/TLS certificates`,cat:`ops`,cadence:`Daily`,what:`The certificates encrypting traffic between banking applications and the people using them.`,how:`Renewals and updates across live and development environments. An expired cert takes a client-facing service down with no warning, which is exactly why I built a monitor for it.`,project:`ssl-monitor`,projectLabel:`SSL/TLS Certificate Monitor`},{name:`IIS`,cat:`ops`,cadence:`Daily`,what:`Internet Information Services — Microsoft’s web server.`,how:`Sites, application pools, bindings and certificates for client-facing banking web applications.`},{name:`Log analysis`,cat:`ops`,cadence:`Daily`,what:`IIS logs, application traces and Windows Event Viewer.`,how:`Read the logs before forming a theory. I did it often enough that I built a viewer to make the pattern show up faster.`,project:`iis-log-viewer`,projectLabel:`IIS Log Viewer`},{name:`Outage response`,cat:`ops`,cadence:`Regular`,what:`Triage, diagnosis, stakeholder communication, resolution, write-up.`,how:`Live banking systems, where every minute of downtime has a cost. Staying calm and communicating clearly is most of the work.`},{name:`Unix & scripting`,cat:`ops`,cadence:`Regular`,what:`Command line work plus shell and batch automation.`,how:`Server-side troubleshooting, and automating the repetitive parts of system administration across Windows and Unix.`},{name:`Server networking`,cat:`ops`,cadence:`Regular`,what:`TCP/IP, DNS resolution, firewall rules, port configuration.`,how:`Working out why a client environment can’t reach something it reached yesterday.`},{name:`Git`,cat:`ops`,cadence:`Regular`,what:`Version control.`,how:`My own tools, and the public open-source release of the RoboCup codebase.`,project:`robocup`,projectLabel:`RoboCup Capstone`},{name:`Client communication`,cat:`client`,cadence:`Daily`,what:`Turning technical status into something a client can act on.`,how:`Priority issues on site and online, plus regular walkthroughs of ongoing cases. Managing expectations during an incident is a skill of its own.`},{name:`Case ownership`,cat:`client`,cadence:`Regular`,what:`Carrying a complex case from first contact to close.`,how:`Taking on the cases that haven’t resolved, coordinating across the team, and staying the point of contact until they’re done.`},{name:`Mentoring & onboarding`,cat:`client`,cadence:`Regular`,what:`Getting new technical staff effective inside a complex environment.`,how:`Context first, then tooling — backed by knowledge base material so it doesn’t depend on me being in the room.`},{name:`Risk governance`,cat:`study`,cadence:`Learning`,what:`How an organisation identifies, assesses and governs cyber risk at scale.`,how:`My UNSW specialisation, and the reason I’m studying at all: the move from fixing incidents to preventing them.`},{name:`Compliance frameworks`,cat:`study`,cadence:`Learning`,what:`ISO 27001, NIST, and the ACSC Essential Eight.`,how:`How an organisation demonstrates it’s doing the work. Increasingly the language banking clients ask questions in.`},{name:`Threat modelling`,cat:`study`,cadence:`Learning`,what:`STRIDE, attack trees and data flow analysis.`,how:`Applied end to end across a 59-page security engineering analysis of QR code systems.`,project:`qr-security`,projectLabel:`QR Code Security Analysis`}],ne=[{role:`Technical Support Consultant`,company:`Ultradata Australia`,loc:`Malvern, Victoria`,dates:`Feb 2024 — Present`,context:`Ultradata powers the technology behind mutual banks and credit unions across Australia — core banking, payment infrastructure and AML compliance systems. When systems fail in banking, real people feel it. This is the team that fixes it.`,metrics:[[`30+`,`Cases / month`],[`#1`,`Escalation point`]],points:[`Meet clients on priority issues — on site and online — and walk through ongoing cases with them`,`Implement technical changes and releases directly into client production environments`,`Install and upgrade client systems to new software versions and patch releases`,`Maintain SQL databases including reporting and AML systems across client environments`,`Administer UniVerse database environments for performance and uptime`,`Manage SSL/TLS certificates across live and development environments`,`Configure IIS for hosting and troubleshooting client-facing web applications`,`Respond to application outages and NPP payment failures under time pressure`,`Write knowledge base and technical documentation to sharpen team efficiency`,`Help new team members get the context they need to come up to speed`]},{role:`Front End Supervisor`,company:`Woolworths`,loc:`Highett, Victoria`,dates:`Aug 2018 — Nov 2024`,context:`Six years of managing people, pressure and process — before a single SQL query. The instinct for calm communication and holding a team together when things go wrong was built here.`,points:[`Led and supervised front-end operations at consistently high service standards`,`Trained and mentored new and existing staff, improving team efficiency`,`Managed cash handling and reconciliation with minimal discrepancies`,`Resolved customer escalations with solutions that kept trust intact`,`Identified workflow bottlenecks and cut wait times`]},{role:`Capstone Team Member`,company:`RMIT RedBackBots`,loc:`RMIT University, Melbourne`,dates:`Jul — Nov 2023`,badge:`3rd Place · Intl`,website:`https://redbackbots.com/`,context:`An RMIT team that took on the world, finishing third in the Challenge Shield Division at the 2024 international RoboCup — and learning what it takes to deliver against real deadlines.`,points:[`Led a multidisciplinary team preparing robots for the 2024 competition`,`Developed marketing strategy and acquired sponsors`,`Managed project timelines using Agile methodologies`,`Released the codebase publicly, contributing to open source`]}],re=[[`Banking systems`,[`Core banking platforms`,`UniVerse DB`,`Microsoft SQL Server`,`NPP payments`]],[`Operations`,[`Outage response`,`SSL/TLS management`,`IIS configuration`,`Log analysis`]],[`Client & governance`,[`Client communication`,`AML & compliance systems`,`Risk governance`,`Mentoring & onboarding`]]],g=[{chapter:`Leadership before tech`,period:`2018 — 2024`,body:`It didn’t start in IT. Six years supervising the front end at Woolworths — managing teams, de-escalating difficult situations, holding a line on a bad shift. Calm under pressure isn’t a personality trait; it’s earned, shift by shift, and it was earned here.`},{chapter:`Learning the technology`,period:`2021 — 2023`,body:`RMIT’s Bachelor of Information Technology gave those instincts a vocabulary: systems thinking, database design, security fundamentals, software engineering. The degree connected the dots and opened the door into fintech.`},{chapter:`Joining Ultradata`,period:`Feb 2024 — now`,body:`Ultradata Australia provides core banking systems, payment infrastructure and AML compliance platforms to mutual banks and credit unions across the country. I work priority issues directly with clients — on site and online — walk through ongoing cases with them, and step into wider team duties when they’re needed. When these systems go down, the consequences aren’t abstract.`},{chapter:`The next chapter`,period:`Now → 2028`,body:`A Master of Cybersecurity at UNSW, averaging 80%, is the natural progression from responding to incidents to preventing them. It runs alongside the day job rather than replacing it — I’m still at Ultradata, still on live banking cases, and the study keeps landing back in the same place: certificates, access, logs, the systems I already have my hands in. The goal is security leadership — not just someone who can fix things, but someone who can build organisations that are resilient before they break.`}],_={unsw:{status:`In progress · est. Mar 2028`,degree:`Master of Cybersecurity`,specialisation:`UNSW Sydney · online · Risk Governance &amp; Management`,average:`80%`,body:`A 12-course online program built to develop senior security capability. The Risk
      Governance &amp; Management track is aimed at professionals moving toward strategic,
      compliance-oriented security leadership — how organisations identify, assess and
      govern cyber risk at scale.`,grid:[[`Program structure`,`12 courses across core foundations and a chosen specialisation, including a capstone integrating real-world security challenges.`],[`Specialisation focus`,`GRC frameworks, cyber risk strategy, compliance standards and security leadership.`],[`Career direction`,`Positioned for security analyst, architect, risk manager and CISO-track roles across finance, government and tech.`],[`Why now`,`Understanding how systems get compromised is the first step to making them resilient — the natural next move after two years inside banking incidents.`]],units:[`Foundations of Cyber Security`,`Governance, Risk &amp; Compliance`,`Cyber Risk Strategy`,`Security Management`,`Threat Modelling`,`Digital Forensics`,`Cybersecurity Law &amp; Ethics`,`Capstone Project`]},rmit:{status:`Completed · Mar 2021 — Nov 2023`,degree:`Bachelor of Information Technology`,institution:`RMIT University · Melbourne City Campus`,body:`A three-year, industry-focused degree built around real-world problem solving,
      from websites to enterprise systems to network programming, with work-integrated
      learning embedded throughout. It built the technical foundation that made the move
      into Ultradata’s banking environment possible.`,grid:[[`Learning approach`,`Practical, industry-based learning with real group projects and lecturers working in the field.`],[`Technical breadth`,`Web programming, software engineering, database applications, AI foundations in Python, digital business security, systems deployment.`]],subjects:[`Web Programming`,`Software Engineering`,`Database Applications`,`AI Foundations (Python)`,`Digital Business Security`,`Systems Deployment &amp; Ops`,`Networking Fundamentals`,`Capstone: RoboCup`]}},v=[{id:`ssl-monitor`,title:`SSL/TLS Certificate Monitor`,tag:`Python · Security`,status:`Live`,statusColor:`var(--ok)`,blurb:`Parallel certificate expiry checks across many domains, GUI and CLI, zero dependencies.`,overview:`A desktop GUI and CLI tool that checks SSL/TLS certificate expiry across many domains at once. It came out of managing certificates across live and development banking environments, where an expired cert takes a client-facing service down with no warning.`,points:[`Checks certificate expiry across multiple domains in parallel, so a long domain list still returns in seconds`,`Full domain manager in the GUI — add, edit, remove and reorder the list without touching a file`,`Colour-coded results table with configurable warning and critical thresholds`,`JSON and CSV export for reporting, plus CI-friendly exit codes so it can gate a pipeline`,`Zero external dependencies — runs on a stock Python install, which matters on locked-down servers`],codeLabel:`Usage`,code:`python gui.py                # desktop GUI
python ssl_monitor.py        # CLI, uses domains.txt
python ssl_monitor.py -d example.com
python ssl_monitor.py -f domains.txt --warn-days 60 --json report.json

# scheduled daily check
0 8 * * * python3 /path/to/ssl_monitor.py -f domains.txt --json /var/log/ssl.json`,stack:[`Python`,`Tkinter`,`ssl / socket`,`No dependencies`],context:`Built for certificate management across live and development client environments.`,statusNote:`Public on GitHub and in use.`,links:[[`View on GitHub`,`https://github.com/Vansh-Shah/SSL-Monitor`]]},{id:`iis-log-viewer`,title:`IIS Log Viewer`,tag:`JavaScript · Log Analysis`,status:`Live`,statusColor:`var(--ok)`,blurb:`Single-file, client-side W3C log triage with a live histogram and substatus decoding.`,overview:`A single-file, fully client-side viewer for W3C IIS log files, built for fast IP and user-agent triage during an incident. Drop a log in, find the failing endpoint, hand back an answer. Logs never leave the browser, which is what makes it usable on client data.`,points:[`Filter, sort and search requests across a full log file with no server component`,`Drag-select a time window directly on a live request histogram`,`Decodes IIS substatus and Win32 codes into readable causes`,`Surfaces hot and failing endpoints so the pattern shows up before the theory does`,`Runs entirely in the browser — nothing is uploaded, so client logs stay client logs`],codeLabel:`Where the logs live`,code:`%SystemDrive%\\inetpub\\logs\\LogFiles\\W3SVC<siteId>\\u_ex*.log

# run it offline
git clone https://github.com/Vansh-Shah/iis-log-viewer.git
cd iis-log-viewer
start index.html    # Windows
open index.html     # macOS`,stack:[`Vanilla JavaScript`,`Canvas`,`Single HTML file`],context:`Built for IIS troubleshooting on client-facing banking web applications.`,statusNote:`Public on GitHub with a hosted version.`,links:[[`View on GitHub`,`https://github.com/Vansh-Shah/iis-log-viewer`],[`Open the tool`,`https://vansh-shah.github.io/iis-log-viewer/`]]},{id:`uvdiag-lock-analysis`,title:`UVDiag Lock Analysis`,tag:`UniVerse · Diagnostics`,status:`Internal`,statusColor:`var(--warn)`,blurb:`Blocker and deadlock reporting from UniVerse uvdiag captures, with a wait-for graph.`,overview:`A browser-based analyser for UniVerse uvdiag captures. Reading a raw capture during a live lock incident is slow and error-prone; this reads the whole thing and reports who is blocking whom.`,points:[`Ingests port status, LIST.READU EVERY output and lock daemon logs — or the whole .tar.gz at once`,`Produces a blocker and deadlock report with a wait-for graph, so the root holder is obvious`,`Exports to Markdown, HTML or PDF for attaching to a case or a post-incident write-up`,`Single file, runs in the browser — no install on a production support machine`],stack:[`Vanilla JavaScript`,`Single HTML file`,`UniVerse`],context:`Built for banking support work on UniVerse environments.`,statusNote:`Source is internal to Ultradata.`,note:`Not public: the tool is written against internal diagnostic formats and stays inside Ultradata. Happy to talk through the approach.`,links:[]},{id:`qr-security`,title:`QR Code Security Analysis`,tag:`Security Engineering · Research`,status:`Published`,statusColor:`var(--ok)`,blurb:`A 59-page security engineering analysis of QR code systems, from threat model to controls.`,overview:`A structured security engineering analysis of QR codes in digital systems, completed for the Principles of Security Engineering unit at UNSW. It works from a formal threat model through to layered, practical recommendations.`,points:[`STRIDE threat modelling and attack trees across the full QR code lifecycle`,`Data flow analysis identifying where trust is actually placed and where it breaks`,`Real-world attack techniques: quishing, physical sticker replacement, payload delivery`,`Cryptographic controls and PKI options assessed against practical deployment constraints`,`Multi-layered recommendations spanning technical controls, process and user-facing design`],stack:[`STRIDE`,`Attack trees`,`PKI`,`Security engineering`],context:`Principles of Security Engineering, UNSW Master of Cybersecurity.`,statusNote:`59 pages, submitted and marked.`,links:[[`Download report (PDF)`,`qr-security-analysis.pdf`]]},{id:`robocup`,title:`RoboCup Capstone`,tag:`Robotics · Agile`,status:`3rd Intl`,statusColor:`var(--accent)`,blurb:`Third internationally in the 2024 Challenge Shield Division with RMIT RedBackBots.`,overview:`The RMIT RedBackBots capstone: preparing autonomous robots for the 2024 international RoboCup. The team placed third in the Challenge Shield Division. My side of it was leading the team and getting it to the competition on time and funded.`,points:[`Led a multidisciplinary team through preparation for the international competition`,`Managed project timelines on Agile cycles across a mixed-skill team`,`Built the marketing approach and acquired sponsors to fund the campaign`,`Ran version control and released the full codebase publicly as open source`],stack:[`Agile`,`Git`,`Team leadership`,`C++`],context:`Capstone project, RMIT Bachelor of Information Technology.`,statusNote:`3rd place, Challenge Shield Division, RoboCup 2024.`,links:[[`Code release`,`https://github.com/rmit-computing-technologies/redbackbots-coderelease`],[`RedBackBots`,`https://redbackbots.com/`]]},{id:`portfolio`,title:`This Portfolio`,tag:`Vite · Vanilla JS`,status:`Live`,statusColor:`var(--ok)`,blurb:`Rebuilt from a single-page résumé into a narrative site with an interactive toolkit.`,overview:`Rebuilt from a single-page résumé layout into a narrative-driven multi-page site: story, work, education, an interactive toolkit, six project write-ups and contact. Content is separated from rendering, so updating a job, a tool or a project is a one-line edit.`,points:[`Nine routes client-side, including a detail page per project with prev/next navigation`,`Interactive toolkit: 19 tools filtered by category, each opening a panel that links through to the project it produced`,`Dark and light themes that follow the visitor’s system preference on first visit and persist after that`,`Motion layer — staggered hero entrance, counting stats, scroll reveals, drifting background bloom, scroll progress — with a full prefers-reduced-motion path`,`Live Melbourne clock, and a contact form that posts without a page reload`,`All copy held in one content module, so nothing about the design has to be touched to update it`],stack:[`Vite`,`Vanilla JS`,`CSS custom properties`,`IntersectionObserver`],context:`Personal site. Second rebuild, 2026 — the first moved off the résumé layout, this one added the toolkit and the motion layer.`,statusNote:`Live on GitHub Pages and still changing.`,links:[[`View on GitHub`,`https://github.com/Vansh-Shah/VanshShah-Portfolio`]]}],y=[`ssl-monitor`,`iis-log-viewer`].map(e=>v.find(t=>t.id===e)),ie=[{page:`story`,title:`Story`,sub:`Leadership, then technology, then both`},{page:`toolkit`,title:`Toolkit`,sub:`19 tools, and where I use them`},{page:`work`,title:`Work`,sub:`Ultradata, Woolworths, RoboCup`},{page:`education`,title:`Education`,sub:`UNSW and RMIT in detail`},{page:`contact`,title:`Contact`,sub:`Email, LinkedIn, GitHub`}];function b({display:e,count:t,suffix:n,label:r,accent:i}){let a=t?`data-count="${t}" data-suffix="${n}"`:``;return o`
    <div class="stat-cell ${i?`stat-cell--accent`:``}">
      <div class="sy stat-num ${i?`stat-num--accent`:``}" ${a}>${e}</div>
      <div class="stat-label">${r}</div>
    </div>`}function x(e){return o`
    <button class="work-card" data-project-id="${e.id}" aria-label="View ${e.title} details">
      <div class="work-card-top">
        <span class="project-tag">${e.tag}</span>
        <span class="project-status" style="color:${e.statusColor}">${e.status}</span>
      </div>
      <div class="sy work-card-title">${e.title}</div>
      <p class="work-card-desc">${e.blurb}</p>
    </button>`}function ae({page:e,title:t,sub:n}){return o`
    <button class="elsewhere-card" data-page="${e}" aria-label="Go to ${t}">
      <div class="sy elsewhere-card-title">${t}</div>
      <div class="elsewhere-card-sub">${n}</div>
    </button>`}function S(){return o`
    <div class="page">

      <section class="home-hero page-section">
        <div class="wrap">

          <div class="hero-label reveal">Technical Support Consultant · Ultradata Australia · Melbourne</div>

          <h1 class="sy hero-headline reveal">Technical support for the systems banks run on.</h1>

          <p class="hero-body reveal">
            Core banking, NPP payments and AML platforms for mutual banks and credit unions
            across Australia. I work priority issues directly with clients — on site and
            online — and I'm studying cybersecurity to move further upstream of them.
          </p>

          <div class="hero-cta reveal">
            <button class="cta-primary-btn" data-page="contact">Get in touch</button>
            <button class="cta-secondary-btn" data-page="story">Read the story →</button>
          </div>

          <div class="stat-grid reveal-group">
            ${p.map(b).join(``)}
          </div>

        </div>
      </section>

      <section class="current-section">
        <div class="wrap">
          <div class="reveal current-banner">
            <div class="current-label">Current</div>
            <div class="current-text">Master of Cybersecurity at UNSW, specialising in risk governance. Building small diagnostic tools for the UniVerse and IIS stacks I support day to day.</div>
          </div>
        </div>
      </section>

      <section class="selected-work-section">
        <div class="wrap">
          <div class="reveal section-row">
            <p class="nav-section-label">Selected work</p>
            <button class="text-link" data-page="projects">All projects →</button>
          </div>
          <div class="work-cards reveal-group">
            ${y.map(x).join(``)}
          </div>
        </div>
      </section>

      <section class="nav-section">
        <div class="wrap">
          <p class="reveal nav-section-label">Elsewhere on this site</p>
          <div class="elsewhere-cards reveal-group">
            ${ie.map(ae).join(``)}
          </div>
        </div>
      </section>

    </div>`}function oe(){document.querySelectorAll(`.work-card`).forEach(e=>{e.addEventListener(`click`,()=>window.openProject?.(e.dataset.projectId))})}function C(e){return o`
    <div class="sec-lbl reveal">
      <span class="sec-num">—</span>
      <h1 class="sec-tag">${e}</h1>
    </div>`}function se(e){return o`<span class="tag-pill">${e}</span>`}function w(e){return e.map(se).join(``)}function T(e){return o`<div class="info-grid reveal-group">${e.map(([e,t])=>o`
    <div class="info-cell">
      <div class="info-cell-title">${e}</div>
      <p class="info-cell-body">${t}</p>
    </div>`).join(``)}</div>`}function ce(e){return o`
    <div class="work-cats-wrap">
      <div class="sec-lbl sec-lbl--sm reveal">
        <span class="sec-num sec-num--sm">—</span>
        <p class="sec-tag">What I work in</p>
      </div>
      <div class="work-cats reveal-group">${e.map(([e,t])=>o`
    <div class="reveal work-cat">
      <div class="work-cat-label">${e}</div>
      <div class="work-cat-items">${t.join(`<br />`)}</div>
    </div>`).join(``)}</div>
    </div>`}function E(e){return e?o`<div class="metric-row reveal-group">${e.map(([e,t])=>o`
    <div class="metric-card">
      <div class="sy metric-num">${e}</div>
      <div class="metric-label">${t}</div>
    </div>`).join(``)}</div>`:``}function D(e){let t=e.points.map(e=>o`<li class="bullet">${e}</li>`).join(``);return o`
    <div class="reveal">
      <div class="job-header">
        <div class="job-title-row">
          <h2 class="sy job-title">${e.role}</h2>
          ${e.badge?o`<span class="job-badge">${e.badge}</span>`:``}
        </div>
        <span class="job-dates">${e.dates}</span>
      </div>

      <div class="job-company-row">
        <p class="job-company">${e.company} · ${e.loc}</p>
        ${e.website?o`
          <a href="${e.website}" target="_blank" rel="noopener noreferrer"
             class="job-website-link">Visit website ↗</a>`:``}
      </div>

      ${E(e.metrics)}

      <p class="job-context">${e.context}</p>
      <ul class="bullet-list">${t}</ul>
    </div>`}function O(){return o`
    <button class="back-btn" id="backToProjects">
      ← Back to Projects
    </button>`}function k({chapter:e,period:t,body:n},r){return o`
    <div class="story-row reveal">
      <div class="chapter-meta">
        <div class="chapter-num">Chapter ${String(r+1).padStart(2,`0`)}</div>
        <div class="chapter-period">${t}</div>
      </div>
      <div class="chapter-body">
        <h3 class="sy chapter-title">${e}</h3>
        <p class="chapter-text">${n}</p>
      </div>
    </div>`}function A(){return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`The story`)}

          <h2 class="sy reveal story-headline">
            Keeping banks running. Building what's next.
          </h2>

          <p class="reveal story-sub">
            A career built in layers — leadership first, then the technology, then the place where the two meet.
          </p>

          ${g.map(k).join(``)}

          <div class="reveal story-cta">
            <button class="cta-secondary-btn" data-page="work">See the work →</button>
          </div>

        </div>
      </section>
    </div>`}function j(){let e=ne.map((e,t)=>o`
      ${t>0?o`<div class="divid"></div>`:``}
      ${D(e)}`).join(``);return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`Work`)}
          <h1 class="sy reveal work-headline">Where the experience comes from.</h1>
          ${e}
          <div class="divid"></div>
          ${ce(re)}

        </div>
      </section>
    </div>`}var{unsw:M,rmit:N}=_;function P(e){return o`
    <div class="reveal tag-block tag-block--plain">
      <div class="tag-block-pills">${w(e)}</div>
    </div>`}function F(){return o`
    <div class="reveal edu-block edu-block--accent">
      <div class="edu-header">
        <div>
          <span class="edu-status edu-status--accent">${M.status}</span>
          <h2 class="sy edu-degree">${M.degree}</h2>
          <div class="edu-institution">${M.specialisation}</div>
        </div>
        <div class="edu-avg-card">
          <div class="sy edu-avg-num">${M.average}</div>
          <div class="edu-avg-label">Current avg</div>
        </div>
      </div>

      <p class="reveal edu-body">${M.body}</p>

      ${T(M.grid)}

      ${P(M.units)}
    </div>`}function I(){return o`
    <div class="reveal edu-block">
      <span class="edu-status edu-status--muted">${N.status}</span>
      <h2 class="sy edu-degree">${N.degree}</h2>
      <div class="edu-institution">${N.institution}</div>

      <p class="reveal edu-body">${N.body}</p>

      ${T(N.grid)}

      ${P(N.subjects)}
    </div>`}function L(){return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`Education`)}
          <h1 class="sy reveal edu-headline">Two degrees, one direction.</h1>
          ${F()}
          <div class="divid"></div>
          ${I()}

        </div>
      </section>
    </div>`}function R(e){return o`
    <button class="project-row" data-project-id="${e.id}" aria-label="View ${e.title} details">
      <div class="project-row-main">
        <div class="project-tag">${e.tag}</div>
        <div class="sy project-row-title">${e.title}</div>
        <div class="project-row-blurb">${e.blurb}</div>
      </div>
      <div class="project-row-side">
        <span class="project-status-badge" style="color:${e.statusColor};border-color:${e.statusColor}">${e.status}</span>
        <div class="project-row-more">Read more →</div>
      </div>
    </button>`}function z(){return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`Projects`)}
          <h1 class="sy reveal projects-headline">Tools built from the day job.</h1>
          <p class="reveal projects-intro">
            Most of these started as something I needed on a live case and couldn't find. A couple came out of study.
          </p>

          <div class="project-list reveal-group">
            ${v.map(R).join(``)}
          </div>

        </div>
      </section>
    </div>`}function B(){document.querySelectorAll(`.project-row`).forEach(e=>{e.addEventListener(`click`,()=>V(e.dataset.projectId))})}function V(e,t=!0){let n=v.find(t=>t.id===e);return n?(t&&history.pushState({page:`projects`,projectId:e},``,`#projects/${e}`),document.getElementById(`main`).innerHTML=U(n),window.scrollTo(0,0),document.getElementById(`main`)?.focus(),requestAnimationFrame(()=>requestAnimationFrame(()=>{window.initReveal?.(),H()})),!0):!1}function H(){document.getElementById(`backToProjects`)?.addEventListener(`click`,()=>window.goTo(`projects`)),document.querySelectorAll(`[data-nav-project]`).forEach(e=>{e.addEventListener(`click`,()=>V(e.dataset.navProject))})}function U(e){let t=v.findIndex(t=>t.id===e.id),n=v[(t-1+v.length)%v.length],r=v[(t+1)%v.length],i=(e.links||[]).length?o`
      <div class="reveal project-detail-links">
        ${e.links.map(([e,t])=>{let n=t.startsWith(`http`);return o`
          <a href="${n?t:`/VanshShah-Portfolio`.replace(/\/$/,``)+`/`+t.replace(/^\//,``)}" ${n?`target="_blank" rel="noopener noreferrer"`:``}
             class="detail-link-btn detail-link-btn--primary">${e}</a>`}).join(``)}
      </div>`:``,a=e.code?o`
    <div class="reveal project-section">
      <div class="project-section-heading">${e.codeLabel||`Usage`}</div>
      <pre class="code-block">${e.code}</pre>
    </div>`:``,s=e.note?o`
    <div class="reveal project-note">${e.note}</div>`:``;return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${O()}

          <div class="reveal project-detail-meta">
            <span class="project-tag">${e.tag}</span>
            <span class="project-status-badge" style="color:${e.statusColor};border-color:${e.statusColor}">${e.status}</span>
          </div>
          <h1 class="sy reveal project-detail-title">${e.title}</h1>
          <p class="reveal project-detail-sub">${e.overview}</p>

          ${i}

          <div class="project-detail-layout">
            <div>
              <div class="project-section-heading project-section-heading--rule">What it does</div>
              <div class="reveal-group project-points">
                ${e.points.map(e=>o`<div class="project-point">${e}</div>`).join(``)}
              </div>

              ${a}
              ${s}
            </div>

            <div class="reveal project-sidebar">
              <div class="project-sidebar-label">Details</div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Built with</div>
                <div class="project-sidebar-pills">${w(e.stack)}</div>
              </div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Context</div>
                <div class="project-sidebar-text">${e.context}</div>
              </div>
              <div class="project-sidebar-field">
                <div class="project-sidebar-heading">Status</div>
                <div class="project-sidebar-text">${e.statusNote}</div>
              </div>
            </div>
          </div>

          <div class="reveal project-detail-nav">
            <button class="project-nav-btn" data-nav-project="${n.id}">← ${n.title}</button>
            <button class="project-nav-btn project-nav-btn--next" data-nav-project="${r.id}">${r.title} →</button>
          </div>

        </div>
      </section>
    </div>`}var W=`all`,G=0,K=e=>(m.find(t=>t[0]===e)||[null,e])[1];function le(){return m.map(([e,t])=>o`
    <button class="toolkit-chip ${W===e?`toolkit-chip--active`:``}" data-cat="${e}">${t}</button>`).join(``)}function q(){return h.map((e,t)=>Object.assign({i:t},e)).filter(e=>W===`all`||e.cat===W)}function J(){let e=q();return e.length===h.length?`${h.length} tools`:`${e.length} of ${h.length} tools`}function Y(){return q().map(e=>o`
    <button class="tool-card ${e.i===G?`tool-card--active`:``}" data-index="${e.i}">
      <div class="tool-card-top">
        <span class="sy tool-card-name">${e.name}</span>
        <span class="tool-card-cadence ${e.cadence===`Daily`?`tool-card-cadence--accent`:``}">${e.cadence}</span>
      </div>
      <span class="tool-card-cat">${K(e.cat)}</span>
    </button>`).join(``)}function X(){let e=h[G]||h[0];return o`
    <div class="toolkit-panel-label">${K(e.cat)} · ${e.cadence}</div>
    <h2 class="sy toolkit-panel-name">${e.name}</h2>
    <div class="toolkit-panel-heading">What it is</div>
    <p class="toolkit-panel-text">${e.what}</p>
    <div class="toolkit-panel-heading">How I use it</div>
    <p class="toolkit-panel-text toolkit-panel-text--main">${e.how}</p>
    ${e.project?o`
      <a href="#" class="toolkit-panel-link" data-project-id="${e.project}">${e.projectLabel} →</a>`:``}`}function ue(){return W=`all`,G=0,o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`Toolkit`)}
          <h1 class="sy reveal toolkit-headline">What I actually work in.</h1>
          <p class="reveal toolkit-intro">
            Not a list of logos. Pick anything and it'll tell you what it is and where I use it — sorted by how often that actually happens.
          </p>

          <div class="reveal toolkit-filter-row">
            <div class="toolkit-chips">${le()}</div>
            <div class="toolkit-count" id="toolkitCount">${J()}</div>
          </div>

          <div class="toolkit-layout reveal-group">
            <div class="tool-grid" id="toolkitGrid">${Y()}</div>
            <div class="toolkit-panel" id="toolkitPanel">${X()}</div>
          </div>

        </div>
      </section>
    </div>`}function de(){let e=document.querySelector(`.toolkit-chips`),t=document.getElementById(`toolkitGrid`),n=document.getElementById(`toolkitPanel`),r=document.getElementById(`toolkitCount`);!e||!t||!n||(e.addEventListener(`click`,n=>{let i=n.target.closest(`.toolkit-chip`);i&&(W=i.dataset.cat,e.querySelectorAll(`.toolkit-chip`).forEach(e=>e.classList.toggle(`toolkit-chip--active`,e===i)),t.innerHTML=Y(),r.textContent=J())}),t.addEventListener(`click`,e=>{let r=e.target.closest(`.tool-card`);r&&(G=Number(r.dataset.index),t.querySelectorAll(`.tool-card`).forEach(e=>e.classList.toggle(`tool-card--active`,Number(e.dataset.index)===G)),n.innerHTML=X())}),n.addEventListener(`click`,e=>{let t=e.target.closest(`[data-project-id]`);t&&(e.preventDefault(),window.openProject?.(t.dataset.projectId))}))}var fe=[{label:`LinkedIn`,sublabel:`Connect professionally`,href:`https://linkedin.com/in/vansh-shah-840b331a6`,icon:s.linkedin,color:`#0A66C2`},{label:`GitHub`,sublabel:`See what I'm building`,href:`https://github.com/Vansh-Shah`,icon:s.github,color:`var(--ink)`},{label:`Email`,sublabel:`svansh3212@gmail.com`,href:`mailto:svansh3212@gmail.com`,icon:s.email,color:`var(--accent)`}],pe=`https://formspree.io/f/mrevokzl`;function me({label:e,sublabel:t,href:n,icon:r,color:i}){return o`
    <a href="${n}" target="_blank" rel="noopener noreferrer"
       class="social-card" aria-label="${e}">
      <span class="social-card-icon" style="color:${i}">${r}</span>
      <div class="social-card-text">
        <div class="social-card-name">${e}</div>
        <div class="social-card-sub">${t}</div>
      </div>
      <span class="social-card-arrow">${s.arrowRight}</span>
    </a>`}function he(){return o`
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
    </form>`}function Z(){return o`
    <div class="contact-sidebar">
      <div class="reveal">
        <p class="sidebar-label">Find me on</p>
        <div class="social-cards">
          ${fe.map(me).join(``)}
        </div>
      </div>
    </div>`}function ge(){return o`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${C(`Contact`)}

          <h2 class="sy reveal contact-headline">Let's talk.</h2>
          <p class="reveal contact-intro">
            Whether you're hiring, collaborating, or just want to connect —
            fill out the form below.
          </p>

          <div class="contact-layout">
            <div class="reveal contact-form-wrap">
              ${he()}
            </div>
            ${Z()}
          </div>

        </div>
      </section>
    </div>`}function _e(){let e=document.getElementById(`contactForm`),t=document.getElementById(`formNote`),n=document.getElementById(`formSubmit`),r=document.getElementById(`submitLabel`),i=document.getElementById(`submitIcon`);if(!e)return;let a=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,o=[{id:`cf-name`,check:e=>e?``:`Please enter your name.`},{id:`cf-email`,check:e=>e?a.test(e)?``:`That email address doesn't look right — check for typos.`:`Please enter your email address.`},{id:`cf-subject`,check:e=>e?``:`Please add a subject.`},{id:`cf-message`,check:e=>e?``:`Please write a message.`}];function s(e,t){let n=document.getElementById(e),r=document.getElementById(e+`-err`);n.classList.toggle(`form-input--error`,!!t),n.setAttribute(`aria-invalid`,t?`true`:`false`),r&&(r.textContent=t)}function c({id:e,check:t}){let n=t(document.getElementById(e).value.trim());return s(e,n),!n}o.forEach(e=>{let t=document.getElementById(e.id);t.addEventListener(`blur`,()=>c(e)),t.addEventListener(`input`,()=>{t.classList.contains(`form-input--error`)&&c(e)})}),e.addEventListener(`submit`,async t=>{t.preventDefault();let a=o.filter(e=>!c(e))[0];if(a){document.getElementById(a.id).focus(),l(`Please fix the highlighted fields.`,`error`);return}l(``,`success`);let s=document.getElementById(`cf-name`).value.trim(),u=document.getElementById(`cf-email`).value.trim(),d=document.getElementById(`cf-subject`).value.trim(),f=document.getElementById(`cf-message`).value.trim();n.disabled=!0,r.textContent=`Sending…`,i.textContent=``;try{if((await fetch(pe,{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({name:s,email:u,subject:d,message:f})})).ok)e.reset(),r.textContent=`Sent ✓`,l(`Message sent — I'll get back to you soon.`,`success`);else throw Error(`Server error`)}catch{l(`Something went wrong. Email me at svansh3212@gmail.com`,`error`),r.textContent=`Send message`,i.textContent=`→`}finally{n.disabled=!1}});function l(e,n){t.textContent=e,t.className=`form-note form-note--${n}`}}var Q={home:S,story:A,work:j,education:L,projects:z,toolkit:ue,contact:ge};function $(e,r=!0){r&&history.pushState({page:e},``,`#${e}`),document.querySelectorAll(`.np`).forEach(e=>e.classList.remove(`active`)),[`nav-`,`mnav-`].forEach(t=>{let n=document.getElementById(t+e);n&&n.classList.add(`active`)});let i=Q[e]||S;document.getElementById(`main`).innerHTML=i(),window.scrollTo(0,0);let a=document.getElementById(`main`);a&&a.focus(),document.querySelectorAll(`#main [data-page]`).forEach(e=>{e.addEventListener(`click`,()=>$(e.dataset.page))}),requestAnimationFrame(()=>requestAnimationFrame(()=>{t(),e===`home`&&(oe(),setTimeout(n,300)),e===`contact`&&_e(),e===`toolkit`&&de(),e===`projects`&&(B(),H())}))}function ve(){let[e,t]=location.hash.replace(`#`,``).split(`/`),n=Q[e]?e:`home`;history.replaceState({page:n,projectId:t||null},``,n===`projects`&&t?`#projects/${t}`:`#${n}`),$(n,!1),n===`projects`&&t&&V(t,!1)}function ye(){window.addEventListener(`popstate`,e=>{let{page:t=`home`,projectId:n=null}=e.state||{};$(t,!1),t===`projects`&&n&&V(n,!1)}),Object.keys(Q).forEach(e=>{let t=document.getElementById(`nav-`+e);t&&t.addEventListener(`click`,()=>$(e))}),Object.keys(Q).forEach(e=>{let t=document.getElementById(`mnav-`+e);t&&t.addEventListener(`click`,()=>{$(e),document.getElementById(`mobileMenu`).classList.remove(`open`),document.getElementById(`hamburgerBtn`).setAttribute(`aria-expanded`,`false`)})})}window.goTo=$,window.initReveal=t,window.animateCounters=n,window.openProject=V,a(),te(),ye(),ve();