// ── html.js ───────────────────────────────────────────────────────────────
//
// A tagged template literal that does nothing at runtime but signals to
// editors (VS Code + lit-html plugin) to syntax-highlight the HTML inside.
//
// Usage:
//   import { html } from '../components/html.js';
//   const markup = html`<div class="foo">${value}</div>`;
//
// Install the VS Code extension "lit-html" for full colour highlighting.

export const html = (strings, ...values) =>
  strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? values[i] : ''), '');
