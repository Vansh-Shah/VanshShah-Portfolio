// ── seo.js — per-route metadata ──────────────────────────────────────────
// Single source of truth for titles, descriptions and canonical paths.
// Used twice: by the router at runtime (so the tab title and canonical tag
// track client-side navigation) and by scripts/prerender.js at build time
// (so each route ships a real static HTML file with its own metadata).
import { PROJECTS } from './data.js';

export const SITE_ORIGIN = 'https://vansh-shah.github.io';
export const SITE_BASE   = '/VanshShah-Portfolio';
export const SITE_URL    = SITE_ORIGIN + SITE_BASE;

const NAME = 'Vansh Shah';

export const PAGE_META = {
  home: {
    path: '/',
    title: `${NAME} — Banking Infrastructure & Cybersecurity`,
    description: 'Technical Support Consultant at Ultradata Australia, working core banking, NPP payments and AML systems for mutual banks and credit unions. Now studying a Master of Cybersecurity at UNSW.',
  },
  story: {
    path: '/story/',
    title: `Story — ${NAME}`,
    description: 'From six years leading a retail front end, through an RMIT IT degree, into live banking incident response at Ultradata — and now toward security leadership.',
  },
  work: {
    path: '/work/',
    title: `Work Experience — ${NAME}`,
    description: 'Technical Support Consultant at Ultradata Australia: core banking, NPP payment failures, AML reporting and production deployments for mutual banks and credit unions across Australia.',
  },
  education: {
    path: '/education/',
    title: `Education — ${NAME}`,
    description: 'Master of Cybersecurity at UNSW Sydney (Risk Governance & Management, 80% average) and a Bachelor of Information Technology from RMIT University.',
  },
  projects: {
    path: '/projects/',
    title: `Projects — ${NAME}`,
    description: 'Diagnostic and security tools built out of live banking support work: an SSL/TLS certificate monitor, an IIS log viewer, a UniVerse lock analyser, and a QR code security analysis.',
  },
  toolkit: {
    path: '/toolkit/',
    title: `Toolkit — ${NAME}`,
    description: 'The 30 systems and skills I actually work in day to day — core banking, UniVerse, SQL Server, NPP payments, IIS, SSL/TLS — browsable as a grid or through an interactive shell.',
  },
  contact: {
    path: '/contact/',
    title: `Contact — ${NAME}`,
    description: `Get in touch with ${NAME} — banking infrastructure support and cybersecurity, based in Melbourne, Australia.`,
  },
};

export const NOT_FOUND_META = {
  path: '/404.html',
  title: `Page not found — ${NAME}`,
  description: 'That page does not exist.',
};

// Project detail pages get their own metadata, derived from the project data
// so a copy change in data.js flows straight through to the page's SEO.
export function projectMeta(project) {
  return {
    path: `/projects/${project.id}/`,
    title: `${project.title} — ${NAME}`,
    description: project.blurb,
  };
}

export function metaFor(page, projectId) {
  if (page === 'projects' && projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) return projectMeta(project);
  }
  return PAGE_META[page] || PAGE_META.home;
}

// Every route that should end up in the sitemap and as a prerendered file.
export function allRoutes() {
  const pages = Object.entries(PAGE_META).map(([page, meta]) => ({
    page, projectId: null, ...meta,
  }));
  const projects = PROJECTS.map(p => ({
    page: 'projects', projectId: p.id, ...projectMeta(p),
  }));
  return [...pages, ...projects];
}
