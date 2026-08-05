// ── test/helpers/dom.js — mounts the real index.html markup into jsdom
// so regression tests exercise the actual nav/main/footer structure the
// app code queries by id, instead of a hand-maintained fixture that can
// drift from the real page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexHtml = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');
const bodyMatch = indexHtml.match(/<body>([\s\S]*)<\/body>/);

if (!bodyMatch) {
  throw new Error('test/helpers/dom.js: could not find <body> in index.html');
}

const bodyContent = bodyMatch[1];

export function mountApp() {
  document.body.innerHTML = bodyContent;

  if (!document.getElementById('themeColorMeta')) {
    const meta = document.createElement('meta');
    meta.id = 'themeColorMeta';
    document.head.appendChild(meta);
  }
}
