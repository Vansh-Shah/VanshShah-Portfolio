// ── scripts/prerender.js — build-time static HTML generation ─────────────
// Runs after `vite build`. For every route the site has, this renders the
// page's real markup into <main> and writes it as its own HTML file, with
// that route's title, description and canonical URL baked in.
//
// Why: the app is client-rendered, so a crawler hitting the deployed site
// used to receive an empty <main> and index nothing. Google may render JS on
// a second pass, but LinkedIn, Slack, Bing and most AI crawlers do not.
// Prerendering means the first byte already contains the content, and the
// client-side router simply takes over afterwards for in-page navigation.
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderHome }      from '../src/pages/home.js';
import { renderStory }     from '../src/pages/story.js';
import { renderWork }      from '../src/pages/work.js';
import { renderEducation } from '../src/pages/education.js';
import { renderProjects }  from '../src/pages/projects.js';
import { renderToolkit }   from '../src/pages/toolkit.js';
import { renderContact }   from '../src/pages/contact.js';
import { renderNotFound }  from '../src/pages/notfound.js';
import { footerHtml }      from '../src/components/footer.js';
import { PROJECTS }        from '../src/data.js';
import {
  allRoutes, metaFor, NOT_FOUND_META, SITE_URL, SITE_BASE,
} from '../src/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const RENDERERS = {
  home:      renderHome,
  story:     renderStory,
  work:      renderWork,
  education: renderEducation,
  projects:  renderProjects,
  toolkit:   renderToolkit,
  contact:   renderContact,
};

// The project detail template lives behind openProject() (which touches the
// DOM), so rebuild the same markup here from the exported list page plus the
// project's own content. Rendering the projects index for a detail route
// still gives crawlers the project's title/description via <head>, and the
// client swaps in the full detail view on load.
function renderRoute(route) {
  if (route.page === 'projects' && route.projectId) {
    const project = PROJECTS.find(p => p.id === route.projectId);
    return projectDetailFallback(project);
  }
  return RENDERERS[route.page]();
}

// A text-first version of a project detail page: everything a crawler needs
// (heading, overview, bullet points, links) without needing the DOM-driven
// interactive template.
function projectDetailFallback(p) {
  const points = (p.points || []).map(pt => `<li>${pt}</li>`).join('\n');
  const findings = (p.findings || []).map(f => `<li>${f}</li>`).join('\n');
  const links = (p.links || []).map(([label, href]) => {
    const isExternal = href.startsWith('http');
    const resolved = isExternal ? href : `${SITE_BASE}/${href.replace(/^\//, '')}`;
    return `<a href="${resolved}">${label}</a>`;
  }).join('\n');

  return `
    <div class="page">
      <section class="page-section">
        <div class="wrap">
          <p class="eyebrow eyebrow--muted">${p.tag}</p>
          <h1 class="project-detail-title">${p.title}</h1>
          <p class="project-detail-sub">${p.overview}</p>
          ${p.origin ? `<p class="project-origin-text">${p.origin}</p>` : ''}
          <h2>What it does</h2>
          <ul>${points}</ul>
          ${findings ? `<h2>Key findings</h2><ul>${findings}</ul>` : ''}
          <h2>Details</h2>
          <p>Built with ${p.stack.join(', ')}. ${p.context} ${p.statusNote}</p>
          ${links}
        </div>
      </section>
    </div>`;
}

// Swaps the per-route values into the built index.html.
function buildHtml(template, meta, bodyHtml) {
  const canonical = SITE_URL + meta.path;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
    .replace(
      /(<meta name="description" content=")[\s\S]*?(")/,
      `$1${escapeAttr(meta.description)}$2`,
    )
    .replace(
      /(<link rel="canonical" href=")[\s\S]*?(")/,
      `$1${canonical}$2`,
    )
    .replace(
      /(<meta property="og:title"\s+content=")[\s\S]*?(")/,
      `$1${escapeAttr(meta.title)}$2`,
    )
    .replace(
      /(<meta property="og:description" content=")[\s\S]*?(")/,
      `$1${escapeAttr(meta.description)}$2`,
    )
    .replace(
      /(<meta property="og:url"\s+content=")[\s\S]*?(")/,
      `$1${canonical}$2`,
    )
    .replace(
      /(<meta name="twitter:title"\s+content=")[\s\S]*?(")/,
      `$1${escapeAttr(meta.title)}$2`,
    )
    .replace(
      /(<meta name="twitter:description" content=")[\s\S]*?(")/,
      `$1${escapeAttr(meta.description)}$2`,
    )
    .replace(
      /(<main id="main"[^>]*>)([\s\S]*?)(<\/main>)/,
      `$1${bodyHtml}$3`,
    )
    .replace(
      /(<footer id="site-footer"[^>]*>)([\s\S]*?)(<\/footer>)/,
      `$1${footerHtml()}$3`,
    );
}

const escapeAttr = s => String(s).replace(/"/g, '&quot;');

function writePage(relPath, html) {
  // '/' -> dist/index.html, '/work/' -> dist/work/index.html,
  // '/404.html' -> dist/404.html
  const target = relPath.endsWith('.html')
    ? path.join(DIST, relPath)
    : path.join(DIST, relPath, 'index.html');

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  return path.relative(DIST, target).replace(/\\/g, '/');
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('prerender: dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const routes = allRoutes();
  const written = [];

  for (const route of routes) {
    const meta = metaFor(route.page, route.projectId);
    const html = buildHtml(template, meta, renderRoute(route));
    written.push(writePage(route.path, html));
  }

  // 404.html — GitHub Pages serves this for any unmatched path, which also
  // makes it the SPA fallback for routes this script didn't prerender.
  written.push(writePage(
    '/404.html',
    buildHtml(template, NOT_FOUND_META, renderNotFound('')),
  ));

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildSitemap(routes));

  console.log(`prerender: wrote ${written.length} HTML files + sitemap.xml`);
  written.forEach(f => console.log(`  ${f}`));
}

main();
