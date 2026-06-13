(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`Banking Infrastructure`,`Incident Response`,`Technical Leadership`,`Next: Cybersecurity`],t={"Core Banking Systems":`Software platforms that handle the central operations of a bank — accounts, transactions, interest, and compliance. Ultradata's core banking platform serves mutual banks and credit unions across Australia.`,"AML Systems":`Anti-Money Laundering systems monitor transactions for suspicious patterns to comply with financial regulations. Vansh manages reporting databases for these systems across client banking environments.`,"NPP Payments":`The New Payments Platform — Australia's real-time payments infrastructure. Outages here mean customers can't transfer money instantly. Responding to NPP failures is a critical part of the incident response role.`,"UniVerse DB":`A multidimensional NoSQL database by Rocket Software, widely used in legacy banking systems. Vansh administers UniVerse environments to keep banking clients running.`,"SQL Server":`Microsoft's relational database engine. Used extensively at Ultradata for managing client reporting, AML data, and operational queries.`,IIS:`Internet Information Services — Microsoft's web server. Used to host and troubleshoot client-facing banking web applications.`,"High-Pressure Incident Management":`The ability to stay calm, communicate clearly, and drive resolution when systems are down in a live banking environment — where every minute of downtime has real financial consequences.`,"Escalation Leadership":`Acting as the senior escalation point for complex or unresolved incidents — owning client communication and coordinating resolution across the team.`,"Production Outage Response":`End-to-end handling of live system failures: triage, diagnosis, stakeholder communication, resolution, and post-incident documentation.`,"SSL/TLS Management":`Managing security certificates that encrypt communication between banking applications and users. Expired or misconfigured certs take down client-facing services.`,"Team Leadership":`Built across six years at Woolworths and refined at Ultradata — leading teams under pressure, delegating by expertise, and keeping people focused when things go wrong.`,"Mentoring & Training":`Onboarding new technical staff at Ultradata, giving them the context and skills to become effective quickly in a complex banking support environment.`,"Sprint Planning":`Organising work into structured delivery cycles using Agile methodology — applied during the RoboCup capstone and in technical workflow management.`,"Task Delegation":`Assigning cases and responsibilities based on team member expertise and current workload — a core part of the Assistant Manager role.`,"Client Communication":`Managing expectations with banking clients during incidents — translating technical status into clear, reassuring updates that maintain trust.`,"Microsoft SQL":`Industry-standard relational database used for querying, reporting, and managing structured data across banking environments.`,"Server Networking":`Practical knowledge of how servers communicate across networks — including TCP/IP fundamentals, DNS resolution, firewall rules, port configuration, and diagnosing connectivity issues between client and server environments.`,Scripting:`Writing shell and batch scripts to automate repetitive tasks, streamline system administration, and reduce manual overhead — applied across Windows and Unix-based environments.`,Unix:`The foundational operating system underlying many banking and enterprise systems. Command-line proficiency is essential for server-side troubleshooting.`,"Remote Desktop":`RDP-based remote access used daily to connect to and manage client server environments without physical access.`,Git:`Version control system used for tracking code changes, collaborating on projects, and maintaining a history of deployments — used in the RoboCup capstone and open-source release.`,VirtualBox:`Desktop virtualisation tool used to spin up isolated environments for testing and development without impacting production systems.`,"IIS Configuration":`Setting up and managing IIS sites, application pools, bindings, and certificates — essential for hosting banking web applications reliably.`,"Web Application Hosting":`Deploying and maintaining web-based banking applications in live environments, including SSL setup, port configuration, and performance monitoring.`,"Windows Event Viewer":`Windows diagnostic tool used to read system and application logs to identify the root cause of crashes, failures, and service interruptions.`,"Log Analysis":`Reading IIS logs, application trace logs, and event logs to trace the source of production issues — a primary diagnostic skill in the support role.`,"Risk Governance":`The frameworks and policies that define how an organisation identifies, assesses, and manages cybersecurity risks — the focus of Vansh's UNSW specialisation.`,"Compliance Frameworks":`Standards like ISO 27001, NIST, and the Australian Cyber Security Centre's Essential Eight that guide how organisations secure their systems and demonstrate due diligence.`,"Digital Business Security":`Foundational RMIT subject covering how businesses protect their digital assets, manage access, and respond to security incidents.`,"Systems Deployment":`The process of releasing software into production environments safely — including configuration management, rollback planning, and change control.`},n=[[`Banking Technology`,[`Core Banking Systems`,`AML Systems`,`NPP Payments`,`UniVerse DB`,`SQL Server`,`IIS`]],[`Incident Response`,[`High-Pressure Incident Management`,`Escalation Leadership`,`Production Outage Response`,`SSL/TLS Management`]],[`Leadership`,[`Team Leadership`,`Mentoring & Training`,`Sprint Planning`,`Task Delegation`,`Client Communication`]],[`Technical Systems`,[`Microsoft SQL`,`Server Networking`,`Scripting`,`Unix`,`Remote Desktop`,`Git`,`VirtualBox`]],[`Web & Infrastructure`,[`IIS Configuration`,`Web Application Hosting`,`Windows Event Viewer`,`Log Analysis`]],[`Cybersecurity (Foundational)`,[`Risk Governance`,`Compliance Frameworks`,`Digital Business Security`,`Systems Deployment`]]],r=[{role:`Assistant Technical Support Manager`,company:`Ultradata Australia`,loc:`Malvern, Victoria`,dates:`Feb 2024 — Present`,promoted:`Promoted from Technical Support Consultant · Sep 2024`,context:`Ultradata powers the technology behind mutual banks and credit unions across Australia — core banking, payment infrastructure, and AML compliance systems. When systems fail in banking, real people feel it. This is the team that fixes it.`,points:[`Manage and maintain SQL databases including reporting and AML systems across client environments`,`Administer UniVerse database environments, ensuring optimal performance and uptime for banking clients`,`Handle SSL/TLS certificate management — updates and renewals across live and development environments`,`Configure and manage IIS for hosting and troubleshooting client-facing web applications`,`Respond to high-pressure incidents including application outages and NPP (New Payments Platform) failures`,`Act as the team's senior escalation point — own client communication, manage expectations, drive resolution`,`Provide operational oversight as second-in-command; delegate cases based on expertise and workload`,`Develop and maintain knowledge bases and technical documentation to sharpen team efficiency`,`Train and mentor new team members, giving them the context and skills to get up to speed quickly`],metrics:[[`30+`,`Cases / month`],[`#1`,`Escalation point`],[`2+`,`Years fintech`]]},{role:`Front End Supervisor`,company:`Woolworths`,loc:`Highett, Victoria`,dates:`Aug 2018 — Nov 2024`,context:`Six years of managing people, pressure, and process — before a single SQL query. The instinct for calm communication and holding a team together when things go wrong was built here, long before IT.`,points:[`Led and supervised front-end operations, maintaining consistently high service standards`,`Trained and mentored new and existing staff, improving team efficiency and policy adherence`,`Managed cash handling and financial reconciliation with minimal discrepancies`,`Resolved customer escalations professionally, finding quick solutions that maintained trust`,`Identified and addressed workflow bottlenecks, reducing wait times and improving performance`]},{role:`Capstone Team Member`,company:`RMIT RedBackBots`,loc:`RMIT University, Melbourne`,dates:`Jul 2023 — Nov 2023`,badge:`3rd Place · International RoboCup`,website:`https://redbackbots.com/`,context:`An RMIT team that took on the world. We finished third in the Challenge Shield Division at the 2024 international RoboCup — and learned what it takes to deliver under real deadlines with real stakes.`,points:[`Led a multidisciplinary team preparing robots for the 2024 international RoboCup competition`,`Developed and executed marketing strategies, created promotional materials, acquired sponsors`,`Managed project timelines using Agile methodologies throughout`,`Used Git for version control and released the codebase publicly, contributing to open-source`]}],i=[{chapter:`Leadership before tech`,period:`2018 – 2024`,body:`It didn't start in IT. Before any SQL query or incident ticket, I spent six years supervising the front end at Woolworths — managing teams under real pressure, de-escalating difficult situations, and learning that calm under pressure is a skill you have to earn. Six years. Every shift. That foundation doesn't come from a textbook.`},{chapter:`Learning the technology`,period:`2021 – 2023`,body:`RMIT's Bachelor of Information Technology gave me the language to match the instincts I'd already developed. Systems thinking, database design, security fundamentals, software engineering. The degree connected the dots — and opened the door to a career in something I'd come to care about deeply.`},{chapter:`Joining Ultradata`,period:`Feb 2024 – Present`,body:`Ultradata Australia provides core banking systems, payment infrastructure, and AML compliance platforms to mutual banks and credit unions across the country. I joined as a Technical Support Consultant in February 2024 and was promoted to Assistant Technical Support Manager in September 2024. When banking systems go down, the consequences aren't abstract. This is where leadership and technical depth come together.`},{chapter:`The next chapter`,period:`Now → 2028`,body:`A Master of Cybersecurity at UNSW — averaging 80% — is the natural progression from responding to incidents to preventing them. The goal is senior security leadership. Not just someone who can fix things, but someone who can build organisations that are resilient before things break.`}],a=[{id:`ssl-monitor`,title:`SSL/TLS Certificate Monitor`,tag:`Python · Security`,status:`Live`,statusColor:`#16A34A`,desc:`Desktop GUI + CLI tool that checks SSL/TLS certificate expiry across multiple domains in parallel. Features a full domain manager (add, edit, remove, reorder), colour-coded results table, JSON/CSV export, and CI-friendly exit codes. Zero external dependencies.`,github:`https://github.com/Vansh-Shah/SSL-Monitor`,detail:!0},{id:`portfolio`,title:`This Portfolio`,tag:`Vite · Design`,status:`Live`,statusColor:`#16A34A`,desc:`Rebuilt from a single-page résumé layout into a narrative-driven multi-page personal brand site. Modular Vite architecture, dark/light theme, scroll-driven interactions.`,github:`https://github.com/Vansh-Shah/VanshShah-Portfolio`,detail:!0},{id:`robocup`,title:`RoboCup Capstone`,tag:`Robotics · Agile`,status:`3rd Place`,statusColor:`var(--accent)`,desc:`Led the RMIT RedBackBots team to 3rd place internationally at the 2024 RoboCup Challenge Shield Division. Managed timelines, sponsorships, and public codebase release.`,github:`https://github.com/rmit-computing-technologies/redbackbots-coderelease`,website:`https://redbackbots.com/`,detail:!0},{id:`qr-security`,title:`QR Code Security Analysis`,tag:`Security Engineering · Research`,status:`Published`,statusColor:`#16A34A`,desc:`A structured security engineering analysis of QR code systems — covering threat modelling (STRIDE, attack trees), data flow analysis, cryptographic controls, real-world attack techniques (quishing, physical replacement, payload delivery), and multi-layered recommendations. Completed as part of the Principles of Security Engineering unit.`,github:null,pdf:`/qr-security-analysis.pdf`,detail:!0}],o={arrow:`→`,sun:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,moon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,download:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,arrowRight:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,linkedin:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,github:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,email:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,linkedinSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,githubSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,emailSm:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`},s=null,c=!1;function l(e){return e.map(e=>`<span class="pill" data-skill="${e.replace(/"/g,`&quot;`)}" role="button" tabindex="0" aria-label="${e} — click for details">${e}</span>`).join(``)}function u(e){let n=document.getElementById(`skill-popup`),r=e.dataset.skill||e.textContent.trim(),i=t[r];if(!i)return;if(s===e&&n.style.display!==`none`){d();return}s&&s.classList.remove(`active-pill`),s=e,e.classList.add(`active-pill`),n.innerHTML=`
    <div>
      <div style="font-size:12px;font-weight:500;color:var(--accent);margin-bottom:6px;letter-spacing:.04em">${r}</div>
      <div style="font-size:13px;color:var(--body);line-height:1.7">${i}</div>
    </div>`,n.style.display=`block`;let a=n.offsetHeight||120,o=e.getBoundingClientRect(),l=o.left,u=o.bottom+8;l+280>window.innerWidth-12&&(l=window.innerWidth-280-12),l<8&&(l=8),u+a>window.innerHeight-12&&(u=o.top-a-8),n.style.left=l+`px`,n.style.top=u+`px`,c=!0,setTimeout(()=>{c=!1},50)}function d(){if(c)return;let e=document.getElementById(`skill-popup`);e&&(e.style.display=`none`),s&&=(s.classList.remove(`active-pill`),null)}var f=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`visible`),f.unobserve(e.target))})},{threshold:.1,rootMargin:`0px 0px -40px 0px`});function p(){document.querySelectorAll(`.reveal, .reveal-group`).forEach(e=>{e.classList.remove(`visible`),f.observe(e)})}function m(){let e=window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;document.querySelectorAll(`[data-count]`).forEach(t=>{let n=parseFloat(t.dataset.count),r=t.dataset.suffix||``,i=Number.isInteger(n);if(e){t.textContent=(i?n:n.toFixed(1))+r;return}let a=performance.now();function o(e){let s=Math.min((e-a)/900,1),c=1-(1-s)**3;t.textContent=(i?Math.round(n*c):(n*c).toFixed(1))+r,s<1&&requestAnimationFrame(o)}requestAnimationFrame(o)})}function ee(){let e=document.body.scrollHeight-window.innerHeight;document.getElementById(`prog`).style.width=e>0?window.scrollY/e*100+`%`:`0%`}function h(){(function(){let e=null;try{e=localStorage.getItem(`theme`)}catch{}let t=window.matchMedia&&window.matchMedia(`(prefers-color-scheme: light)`).matches;if(e===`light`||e===null&&t){let e=document.getElementById(`app`),t=document.getElementById(`togBtn`),n=document.getElementById(`themeColorMeta`);e.classList.remove(`dark`),t&&(t.innerHTML=o.moon,t.setAttribute(`aria-pressed`,`false`),t.setAttribute(`aria-label`,`Switch to dark mode`)),n&&(n.content=`#FAFAF8`)}})(),document.addEventListener(`click`,e=>{let t=e.target.closest(`.pill`);t?u(t):d()}),document.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&e.target.classList.contains(`pill`)&&(e.preventDefault(),u(e.target)),e.key===`Escape`&&(c=!1,d())});let e=document.querySelector(`.nav-links`);e.addEventListener(`keydown`,t=>{let n=[...e.querySelectorAll(`button.np`)],r=n.indexOf(document.activeElement);r!==-1&&(t.key===`ArrowRight`&&(t.preventDefault(),n[(r+1)%n.length].focus()),t.key===`ArrowLeft`&&(t.preventDefault(),n[(r-1+n.length)%n.length].focus()),t.key===`Home`&&(t.preventDefault(),n[0].focus()),t.key===`End`&&(t.preventDefault(),n[n.length-1].focus()))}),window.addEventListener(`scroll`,ee,{passive:!0});let t=document.getElementById(`hamburgerBtn`),n=document.getElementById(`mobileMenu`);function r(){n.classList.remove(`open`),t.setAttribute(`aria-expanded`,`false`),n.setAttribute(`aria-hidden`,`true`)}function i(){n.classList.add(`open`),t.setAttribute(`aria-expanded`,`true`),n.setAttribute(`aria-hidden`,`false`);let e=n.querySelector(`button`);e&&e.focus()}t.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.contains(`open`)?r():i()}),n.addEventListener(`keydown`,e=>{e.key===`Escape`&&(r(),t.focus())}),document.addEventListener(`click`,e=>{!n.contains(e.target)&&e.target!==t&&r()});let a=document.getElementById(`nav-logo`);a.addEventListener(`click`,()=>window.goTo(`home`)),a.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),window.goTo(`home`))});let s=document.getElementById(`togBtn`),l=document.getElementById(`themeColorMeta`),f=o.sun,p=o.moon;s.addEventListener(`click`,()=>{let e=document.getElementById(`app`).classList.toggle(`dark`);s.innerHTML=e?f:p,s.setAttribute(`aria-pressed`,String(e)),s.setAttribute(`aria-label`,e?`Switch to light mode`:`Switch to dark mode`),l&&(l.content=e?`#0D0D0C`:`#FAFAF8`);try{localStorage.setItem(`theme`,e?`dark`:`light`)}catch{}})}var g=(e,...t)=>e.reduce((e,n,r)=>e+n+(t[r]===void 0?``:t[r]),``),te=[`home`,`story`,`work`,`education`,`projects`,`contact`];function _(e){return g`
    <button class="footer-nav-btn" data-page="${e}">${e.charAt(0).toUpperCase()+e.slice(1)}</button>`}function v(e,t,n,r=``){return g`
    <a href="${e}" ${r} class="footer-icon" aria-label="${t}">${n}</a>`}function y(){document.getElementById(`site-footer`).innerHTML=g`
    <div class="wrap footer-inner">

      <div class="footer-top">
        <div class="footer-identity">
          <div class="sy footer-name">Vansh Shah</div>
          <div class="footer-sub">Assistant Technical Support Manager · Ultradata Australia</div>
          <div class="footer-sub">Melbourne, VIC · Available for opportunities</div>
        </div>
        <nav aria-label="Footer navigation" class="footer-nav">
          ${te.map(_).join(``)}
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Vansh Shah. Built by hand.</p>
        <div class="footer-social">
          ${v(`https://linkedin.com/in/vansh-shah-840b331a6`,`LinkedIn`,o.linkedinSm,`target="_blank" rel="noopener noreferrer"`)}
          ${v(`https://github.com/Vansh-Shah`,`GitHub`,o.githubSm,`target="_blank" rel="noopener noreferrer"`)}
          ${v(`mailto:svansh3212@gmail.com`,`Email`,o.emailSm)}
        </div>
      </div>

    </div>`,document.querySelectorAll(`.footer-nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{window.goTo(e.dataset.page),window.scrollTo(0,0)})})}var b=[{display:`6+`,count:`6`,suffix:`+`,label:`Years Experience`},{display:`2+`,count:`2`,suffix:`+`,label:`Years in FinTech`},{display:`80%`,count:`80`,suffix:`%`,label:`Masters Average`},{display:`3rd`,count:null,label:`RoboCup Intl`}],x=[{page:`story`,title:`The Story`,sub:`Leadership → Fintech → Cybersecurity`},{page:`work`,title:`Work`,sub:`Ultradata, Woolworths, RoboCup`},{page:`education`,title:`Education`,sub:`UNSW & RMIT — expanded detail`},{page:`projects`,title:`Projects`,sub:`Portfolio, Runbooks, Labs`}];function S({display:e,count:t,suffix:n,label:r}){return g`
    <div class="stat-cell">
      <div class="sy stat-num" ${t?`data-count="${t}" data-suffix="${n}"`:``}>${e}</div>
      <div class="stat-label">${r}</div>
    </div>`}function C({page:e,title:t,sub:n}){return g`
    <button class="nav-card" data-page="${e}" aria-label="Go to ${t}">
      <div>
        <div class="sy nav-card-title">${t}</div>
        <div class="nav-card-sub">${n}</div>
      </div>
      <span class="nav-card-arrow" aria-hidden="true">${o.arrow}</span>
    </button>`}function w(){return g`
    <div class="page">

      <section class="home-hero page-section">
        <div class="wrap">

          <div class="avail-badge reveal">
            <span class="avail-dot"></span>
            Available for opportunities
          </div>

          <div class="name-banner reveal">
            <h1 class="sy hero-name">
              Vansh<br>
              <span class="hero-name-accent">Shah</span>
            </h1>
          </div>

          <div class="phrase-wrap reveal">
            <p id="phrase" class="phrase-text">Banking Infrastructure</p>
          </div>

          <p class="hero-body reveal">
            Six years leading teams under pressure. Two years keeping banking systems
            online for mutual banks and credit unions across Australia. Now building
            toward cybersecurity leadership — Master of Cybersecurity at UNSW, averaging 80%.
          </p>

          <div class="hero-cta reveal">
            <button class="cta-primary" data-page="contact">Get in touch</button>
            <button class="cta-secondary" data-page="story">Read the story →</button>
          </div>

          <div class="stat-grid reveal-group">
            ${b.map(S).join(``)}
          </div>

        </div>
      </section>

      <section class="nav-section">
        <div class="wrap">
          <p class="reveal nav-section-label">Navigate</p>
          <div class="nav-cards reveal-group">
            ${x.map(C).join(``)}
          </div>
        </div>
      </section>

    </div>`}function ne(){document.querySelectorAll(`.nav-card, .cta-primary, .cta-secondary`).forEach(e=>{e.dataset.page&&e.addEventListener(`click`,()=>window.goTo(e.dataset.page))})}function T(e){return g`
    <div class="sec-lbl reveal">
      <span class="sec-num">—</span>
      <p class="sec-tag">${e}</p>
    </div>`}function re(e){return g`<span class="tag-pill">${e}</span>`}function ie(e){return e.map(re).join(``)}function E(e){return g`<div class="info-grid reveal-group">${e.map(([e,t])=>g`
    <div class="info-cell">
      <div class="info-cell-title">${e}</div>
      <p class="info-cell-body">${t}</p>
    </div>`).join(``)}</div>`}function D(e){return g`
    <div class="divid"></div>
    <div class="sec-lbl sec-lbl--sm reveal">
      <span class="sec-num sec-num--sm">—</span>
      <p class="sec-tag">The Toolkit</p>
    </div>
    <p class="reveal toolkit-hint">
      Organised by capability, not by tool.
      <span class="toolkit-hint-accent">Click any skill</span> to learn more.
    </p>
    <div id="skills-container">${e.map(([e,t])=>g`
    <div class="skill-row reveal">
      <span class="skill-cat">${e}</span>
      <div class="skill-pills">${l(t)}</div>
    </div>`).join(``)}</div>`}function O(e){return e?g`<div class="metric-row reveal-group">${e.map(([e,t])=>g`
    <div class="metric-card">
      <div class="sy metric-num">${e}</div>
      <div class="metric-label">${t}</div>
    </div>`).join(``)}</div>`:``}function k(e){let t=e.points.map(e=>g`<li class="bullet">${e}</li>`).join(``);return g`
    <div class="reveal">
      <div class="job-header">
        <div class="job-title-row">
          <span class="sy job-title">${e.role}</span>
          ${e.badge?g`<span class="job-badge">${e.badge}</span>`:``}
        </div>
        <span class="job-dates">${e.dates}</span>
      </div>

      <div class="job-company-row">
        <p class="job-company">${e.company} · ${e.loc}</p>
        ${e.website?g`
          <a href="${e.website}" target="_blank" rel="noopener noreferrer"
             class="job-website-link">Visit website ↗</a>`:``}
      </div>

      ${e.promoted?g`<p class="job-promoted">${e.promoted}</p>`:``}

      ${O(e.metrics)}

      <p class="job-context">${e.context}</p>
      <ul class="bullet-list">${t}</ul>
    </div>`}function A(){return g`
    <button class="back-btn" id="backToProjects">
      ← Back to Projects
    </button>`}function j({chapter:e,period:t,body:n},r){return g`
    <div class="story-row reveal">
      <div class="chapter-meta">
        <div class="chapter-num">Chapter ${String(r+1).padStart(2,`0`)}</div>
        <div class="chapter-period">${t}</div>
      </div>
      <div class="chapter-body">
        <div class="sy chapter-title">${e}</div>
        <p class="chapter-text">${n}</p>
      </div>
    </div>`}function M(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${T(`The Story`)}

          <h2 class="sy reveal story-headline">
            "Keeping banks running.<br>Building what's next."
          </h2>

          <p class="reveal story-sub">
            A career built in layers — leadership first, then technology,
            then the intersection of both.
          </p>

          ${i.map(j).join(``)}

        </div>
      </section>
    </div>`}function N(){let e=r.map((e,t)=>g`
      ${t>0?g`<div class="divid"></div>`:``}
      ${k(e)}`).join(``);return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${T(`Work`)}
          ${e}
          ${D(n)}

        </div>
      </section>
    </div>`}var P={status:`In Progress · Current — Est. Mar 2028`,degree:`Master of Cybersecurity`,specialisation:`Specialisation: Risk Governance &amp; Management`,institution:`UNSW Sydney · Online`,average:`80%`,body:`The UNSW Master of Cybersecurity is a 12-course online program designed to develop
    senior security capability — either through the Security Engineering or Security
    Management specialisation. The Risk Governance &amp; Management track is built for
    professionals moving toward strategic and compliance-oriented security leadership,
    focusing on how organisations identify, assess, and govern cyber risk at scale.`,quote:`"Cybersecurity isn't just the next career step — it's the natural evolution of
    everything that came before. Understanding how systems can be compromised is the
    first step to making them resilient."`,grid:[[`Program structure`,`12 courses across core foundations and a chosen specialisation, including a capstone project integrating real-world security challenges.`],[`Specialisation focus`,`Risk Governance &amp; Management — covering GRC frameworks, cyber risk strategy, compliance standards, and security leadership.`],[`Career outcomes`,`Graduates are positioned for roles including Cybersecurity Analyst, Security Architect, Risk Manager, and CISO across finance, government, defence, and tech.`],[`Industry context`,`Cybersecurity Analyst roles in Australia are projected to grow by 38.9% over the next five years (Seek, 2026). UNSW is ranked in the global top 20 by QS World University Rankings.`]],units:[`Foundations of Cyber Security`,`Governance, Risk &amp; Compliance`,`Cyber Risk Strategy`,`Security Management`,`Threat Modelling`,`Digital Forensics`,`Cybersecurity Law &amp; Ethics`,`Capstone Project`]},F={status:`Completed · Mar 2021 — Nov 2023`,degree:`Bachelor of Information Technology`,institution:`RMIT University · Melbourne City Campus`,body:`RMIT's Bachelor of IT is a three-year, industry-focused degree built around
    real-world problem solving — from websites to enterprise systems to network
    programming. The program is structured to expose students to a range of
    specialisations early, with work-integrated learning embedded throughout.
    Vansh graduated with a pathway toward cyber security and enterprise systems,
    building the technical foundation that made the move into Ultradata's banking
    environment possible.`,grid:[[`Majors available`,`Cyber Security, Enterprise System Development, and Digital Innovation — with 15 IT specialisation minors including cloud computing, AI, data science, and networking.`],[`Learning approach`,`Industry-based, practical learning with real-world group projects and assignments. Lecturers bring direct industry experience into the classroom.`],[`Work-integrated learning`,`Hands-on industry experience is embedded in the degree, giving students the chance to build professional networks and apply skills in real environments before graduating.`],[`Technical breadth`,`Subjects span web programming, software engineering, database applications, AI foundations in Python, digital business security, and systems deployment and operations.`]],subjects:[`Web Programming`,`Software Engineering`,`Database Applications`,`AI Foundations (Python)`,`Digital Business Security`,`Systems Deployment &amp; Ops`,`Networking Fundamentals`,`Capstone: RoboCup`]};function I(e,t){return g`
    <div class="reveal tag-block">
      <div class="tag-block-label">${e}</div>
      <div class="tag-block-pills">${ie(t)}</div>
    </div>`}function L(){return g`
    <div class="reveal edu-block">
      <div class="edu-header">
        <div>
          <span class="edu-status edu-status--accent">${P.status}</span>
          <div class="sy edu-degree">${P.degree}</div>
          <div class="edu-specialisation">${P.specialisation}</div>
          <div class="edu-institution">${P.institution}</div>
        </div>
        <div class="edu-avg-card">
          <div class="sy edu-avg-num">${P.average}</div>
          <div class="edu-avg-label">Current avg.</div>
        </div>
      </div>

      <p class="reveal edu-body">${P.body}</p>

      ${E(P.grid)}

      <div class="reveal edu-quote">
        <p>${P.quote}</p>
      </div>

      ${I(`Units covering`,P.units)}
    </div>`}function R(){return g`
    <div class="reveal edu-block">
      <span class="edu-status edu-status--muted">${F.status}</span>
      <div class="sy edu-degree">${F.degree}</div>
      <div class="edu-institution">${F.institution}</div>

      <p class="reveal edu-body">${F.body}</p>

      ${E(F.grid)}

      ${I(`Key subjects`,F.subjects)}
    </div>`}function z(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${T(`Education`)}
          ${L()}
          <div class="divid"></div>
          ${R()}

        </div>
      </section>
    </div>`}function B(e){return g`
    <div class="project-card ${e.detail?`project-card--clickable`:``}"
         role="article"
         ${e.detail?`data-project-id="${e.id}" tabindex="0" aria-label="View ${e.title} details"`:``}>
      <div class="project-card-top">
        <span class="project-tag">${e.tag}</span>
        <span class="project-status" style="color:${e.statusColor}">${e.status}</span>
      </div>
      <div class="sy project-title">${e.title}</div>
      <p class="project-desc">${e.desc}</p>
      <div class="project-card-footer">
        <div class="project-card-links">
          ${e.github?g`
            <a href="${e.github}" target="_blank" rel="noopener noreferrer"
               class="project-link" onclick="event.stopPropagation()">GitHub ↗</a>`:``}
          ${e.website?g`
            <a href="${e.website}" target="_blank" rel="noopener noreferrer"
               class="project-link" onclick="event.stopPropagation()">Website ↗</a>`:``}
        </div>
        ${e.detail?g`<span class="project-detail-link">View details →</span>`:``}
      </div>
    </div>`}function V(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${T(`Projects`)}

          <p class="reveal projects-intro">
            A mix of live tools, academic work, and ongoing learning —
            the things built alongside the job.
          </p>

          <div class="project-grid reveal-group">
            ${a.map(B).join(``)}
          </div>

          <div class="reveal coming-up-card">
            <div class="sy coming-up-title">Coming up</div>
            <p class="coming-up-body">
              Incident response case studies · CTF writeups · Log analyser CLI
            </p>
          </div>

        </div>
      </section>
    </div>`}function ae(){document.querySelectorAll(`.project-card--clickable`).forEach(e=>{let t=()=>H(e.dataset.projectId);e.addEventListener(`click`,t),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),t())})})}function H(e){let t={"ssl-monitor":G,"qr-security":K,portfolio:q,robocup:J}[e];t&&(document.getElementById(`main`).innerHTML=t(),window.scrollTo(0,0),requestAnimationFrame(()=>requestAnimationFrame(()=>{window.initReveal?.(),U()})))}function U(){document.getElementById(`backToProjects`)?.addEventListener(`click`,()=>window.goTo(`projects`))}function W(e){return g`
    <div class="feature-grid reveal-group">
      ${e.map(([e,t])=>g`
        <div class="feature-card">
          <div class="sy feature-title">${e}</div>
          <p class="feature-desc">${t}</p>
        </div>`).join(``)}
    </div>`}function G(){let e=[`Python 3.10+`,`tkinter (stdlib)`,`ssl (stdlib)`,`socket (stdlib)`,`concurrent.futures`,`threading`,`argparse`,`json / csv`],t=[[`Domain manager`,`Add, edit (double-click), remove, and reorder domains in a proper list — no more editing raw text files.`],[`Add / Edit dialog`,`Clean modal for adding or editing a domain. Strips https:// automatically. Duplicate detection built in.`],[`Keyboard shortcuts`,`Delete or Backspace to remove. Double-click to edit. Enter to confirm in dialogs.`],[`Load & save list`,`Load domains from any .txt file or save the current list back to disk directly from the GUI.`],[`Live domain count`,`The domain count updates in real time as you add and remove entries.`],[`Results table`,`Colour-coded rows with domain, status, days left, expiry date, and issuer. Click any row for full details.`],[`Stat bar`,`Running totals across OK / Warning / Critical / Error update after every scan.`],[`One-click export`,`Export the last scan to JSON or CSV via a file picker — no terminal needed.`]],n=[[`Parallel checks`,`Checks all domains concurrently — 50 domains takes roughly the same time as 1.`],[`Colour-coded terminal`,`Green for OK, amber for warning, red for critical or expired, grey for errors.`],[`Configurable thresholds`,`Default 30-day warning and 7-day critical. Adjustable per run with --warn-days.`],[`JSON & CSV export`,`Export results for dashboards, email reports, or downstream tooling.`],[`CI-friendly exit codes`,`Exits with code 1 if any cert is critical, expired, or errored — drops into pipelines.`],[`Zero dependencies`,`Standard library only. No pip install required on any platform.`]],r={gui:`python gui.py`,cli:`python ssl_monitor.py`,single:`python ssl_monitor.py -d example.com`,full:`python ssl_monitor.py -f domains.txt --warn-days 60 --json report.json`,domains:`# domains.txt — one domain per line, # lines are ignored
google.com
github.com
your-banking-client.com.au`,output:`Checking 5 domain(s)…

SSL/TLS Certificate Monitor  —  2026-06-12 09:41:00
Warn threshold: 30 days   Critical threshold: 7 days
────────────────────────────────────────────────────────────────
  google.com          2026-08-20   OK          (69 days)
  github.com          2026-07-15   OK          (33 days)
  expiring-soon.io    2026-06-18   WARNING     (18 days)
  critical-cert.com   2026-06-14   CRITICAL    (2 days)
  broken-dns.xyz      —            ERROR       DNS resolution failed
────────────────────────────────────────────────────────────────
  Total: 5  OK: 2  Warning: 1  Critical/Expired: 1  Error: 1`,cron:`# Run every morning at 8am, save JSON report
0 8 * * * python3 /path/to/ssl_monitor.py -f domains.txt --json /var/log/ssl.json`};return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${A()}

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
              <pre class="code-block">${r.gui}</pre>
            </div>
            ${W(t)}
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
            ${W(n)}
            <div class="reveal">
              <p class="project-section-body">Create a <code class="inline-code">domains.txt</code> file:</p>
              <pre class="code-block">${r.domains}</pre>
              <p class="project-section-body">Then run:</p>
              <pre class="code-block">${r.cli}</pre>
              <p class="project-section-body">Other options:</p>
              <pre class="code-block">${r.single}\n${r.full}</pre>
            </div>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Sample CLI Output</h2>
            <pre class="code-block code-block--output">${r.output}</pre>
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
            <pre class="code-block">${r.cron}</pre>
          </div>

          <div class="divid"></div>

          <div class="reveal project-section">
            <h2 class="sy project-section-title">Built With</h2>
            <p class="project-section-body">
              Entirely standard library — no pip install, runs anywhere Python 3.10+ is installed.
            </p>
            <div class="tech-pills">
              ${e.map(e=>g`<span class="tag-pill">${e}</span>`).join(``)}
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
    </div>`}function K(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${A()}

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
            ${W([[`Technical Foundations`,`QR code structure, encoding mechanics, data lifecycle, and the security implications of how QR codes are designed — including why opacity is a core vulnerability.`],[`Security Architecture`,`Digital signatures, Public Key Infrastructure (PKI), offline verification models, and trust models in QR systems — plus the limitations of current security architectures.`],[`Threat Modelling`,`Formal threat modelling with STRIDE analysis, attack trees, asset identification, threat actor profiles, attack surface analysis, and risk assessment.`],[`Data Flow Analysis`,`Level 0 and Level 1 data flow diagrams, component analysis, trust boundary mapping, data flow risks by use case, and security controls mapped to flow.`],[`Attack Techniques`,`Quishing (QR phishing), QR code replacement attacks, malicious payload delivery, backend and API exploitation — with real case studies including parking meter payment scams and fake WiFi access.`],[`Comparative Analysis`,`Signed vs unsigned, static vs dynamic, online vs offline verification, dedicated vs generic scanner apps, and centralised vs decentralised trust models across a security maturity matrix.`],[`Security Recommendations`,`Multi-layered recommendations across cryptographic controls, secure system design, operational security, and user awareness and governance.`]])}
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
    </div>`}function q(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${A()}

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
            ${W([[`Modular Vite architecture`,`Single-page app pattern with a custom client-side router — each page is its own JS module. No React, no Vue, no build complexity beyond Vite itself.`],[`Project detail pages`,`Every project card links through to a full detail page with its own layout, content, and download or external links — all routed client-side without a page reload.`],[`Dark / light theme`,`Manual toggle with system preference detection on load. Theme persists across all navigation within the session.`],[`Scroll-driven reveals`,`IntersectionObserver-powered animations on scroll — no animation library, no layout shift, works cleanly across all pages including detail views.`],[`Skill popup tooltips`,`Every skill tag on the Work page has a contextual description explaining what it is and why it matters in the banking support context. Click any pill to see it.`],[`Contact form`,`Formspree-backed contact form with client-side validation, loading state, and clear success and error feedback. No server required.`],[`Responsive layout`,`Mobile-first CSS with a hamburger nav, responsive grids, and consistent typography across all breakpoints.`],[`GitHub Pages deployment`,`Built with Vite and deployed via GitHub Actions — every push to main automatically rebuilds and redeploys the site. No manual upload steps.`]])}
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
    </div>`}function J(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${A()}

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
            ${W([[`Team leadership`,`Led a multidisciplinary team through the full project lifecycle — from initial planning to competition day. Kept people aligned and focused under real deadline pressure.`],[`Agile project management`,`Managed timelines and deliverables using Agile methodologies — sprint planning, task delegation, and regular retrospectives across a semester-long project.`],[`Sponsorship & marketing`,`Developed and executed a marketing strategy, created promotional materials, and secured sponsorships to support the team's competition entry and travel.`],[`Open-source release`,`Used Git for version control throughout, then coordinated the public release of the full codebase — contributing to the broader RoboCup and open-source robotics community.`]])}
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
    </div>`}var oe=[{label:`LinkedIn`,sublabel:`Connect professionally`,href:`https://linkedin.com/in/vansh-shah-840b331a6`,icon:o.linkedin,color:`#0A66C2`},{label:`GitHub`,sublabel:`See what I'm building`,href:`https://github.com/Vansh-Shah`,icon:o.github,color:`var(--ink)`},{label:`Email`,sublabel:`svansh3212@gmail.com`,href:`mailto:svansh3212@gmail.com`,icon:o.email,color:`var(--accent)`}],se=[`Senior Technical Roles`,`Cybersecurity Opportunities`,`Fintech & Banking`,`Security Leadership`],ce=`https://formspree.io/f/mrevokzl`;function le({label:e,sublabel:t,href:n,icon:r,color:i}){return g`
    <a href="${n}" target="_blank" rel="noopener noreferrer"
       class="social-card" aria-label="${e}">
      <span class="social-card-icon" style="color:${i}">${r}</span>
      <div class="social-card-text">
        <div class="social-card-name">${e}</div>
        <div class="social-card-sub">${t}</div>
      </div>
      <span class="social-card-arrow">${o.arrowRight}</span>
    </a>`}function ue(){return g`
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
    </form>`}function Y(){return g`
    <div class="contact-sidebar">
      <div class="reveal">
        <p class="sidebar-label">Find me on</p>
        <div class="social-cards">
          ${oe.map(le).join(``)}
        </div>
      </div>
      <div class="reveal looking-for-card">
        <div class="sy looking-for-title">What I'm looking for</div>
        <div class="looking-for-pills">
          ${se.map(e=>g`<span class="tag-pill">${e}</span>`).join(``)}
        </div>
      </div>
    </div>`}function de(){return g`
    <div class="page">
      <section class="page-section">
        <div class="wrap">

          ${T(`Contact`)}

          <h2 class="sy reveal contact-headline">Let's talk.</h2>
          <p class="reveal contact-intro">
            Whether you're hiring, collaborating, or just want to connect —
            fill out the form below.
          </p>

          <div class="contact-layout">
            <div class="reveal contact-form-wrap">
              ${ue()}
            </div>
            ${Y()}
          </div>

        </div>
      </section>
    </div>`}function fe(){let e=document.getElementById(`contactForm`),t=document.getElementById(`formNote`),n=document.getElementById(`formSubmit`),r=document.getElementById(`submitLabel`),i=document.getElementById(`submitIcon`);if(!e)return;e.addEventListener(`submit`,async t=>{t.preventDefault();let o=document.getElementById(`cf-name`).value.trim(),s=document.getElementById(`cf-email`).value.trim(),c=document.getElementById(`cf-subject`).value.trim(),l=document.getElementById(`cf-message`).value.trim();if(!o||!s||!c||!l){a(`Please fill in all fields.`,`error`);return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)){a(`Please enter a valid email address.`,`error`);return}n.disabled=!0,r.textContent=`Sending…`,i.textContent=``;try{if((await fetch(ce,{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({name:o,email:s,subject:c,message:l})})).ok)e.reset(),r.textContent=`Sent ✓`,a(`Message sent — I'll get back to you soon.`,`success`);else throw Error(`Server error`)}catch{a(`Something went wrong. Email me at svansh3212@gmail.com`,`error`),r.textContent=`Send message`,i.textContent=`→`}finally{n.disabled=!1}});function a(e,n){t.textContent=e,t.className=`form-note form-note--${n}`}}var X={home:w,story:M,work:N,education:z,projects:V,contact:de},Z=null,Q=0;function $(e,t=!0){t&&history.pushState({page:e},``,`#${e}`),document.querySelectorAll(`.np`).forEach(e=>e.classList.remove(`active`)),[`nav-`,`mnav-`].forEach(t=>{let n=document.getElementById(t+e);n&&n.classList.add(`active`)});let n=X[e]||w;document.getElementById(`main`).innerHTML=n(),window.scrollTo(0,0);let r=document.getElementById(`main`);r&&r.focus(),requestAnimationFrame(()=>requestAnimationFrame(()=>{p(),e===`home`&&(ne(),pe(),setTimeout(m,300)),e===`contact`&&fe(),e===`projects`&&(ae(),U())}))}function pe(){Z&&clearInterval(Z),Q=0,Z=setInterval(()=>{let t=document.getElementById(`phrase`);if(!t){clearInterval(Z);return}t.style.opacity=`0`,t.style.transform=`translateY(8px)`,setTimeout(()=>{Q=(Q+1)%e.length;let t=document.getElementById(`phrase`);t&&(t.textContent=e[Q],t.style.opacity=`1`,t.style.transform=`translateY(0)`)},380)},2800)}function me(){history.replaceState({page:`home`},``,`#home`),window.addEventListener(`popstate`,e=>{$(e.state?.page||`home`,!1)}),Object.keys(X).forEach(e=>{let t=document.getElementById(`nav-`+e);t&&t.addEventListener(`click`,()=>$(e))}),Object.keys(X).forEach(e=>{let t=document.getElementById(`mnav-`+e);t&&t.addEventListener(`click`,()=>{$(e),document.getElementById(`mobileMenu`).classList.remove(`open`),document.getElementById(`hamburgerBtn`).setAttribute(`aria-expanded`,`false`)})})}window.goTo=$,window.initReveal=p,window.animateCounters=m,h(),y(),me(),$(`home`,!1);