import { describe, it, expect } from 'vitest';
import { html } from '../../src/components/html.js';

describe('html tagged template', () => {
  it('interpolates values between the static strings', () => {
    const name = 'World';
    expect(html`<p>Hello ${name}</p>`).toBe('<p>Hello World</p>');
  });

  it('concatenates multiple interpolations in order', () => {
    expect(html`${'a'}-${'b'}-${'c'}`).toBe('a-b-c');
  });

  it('treats undefined values as empty strings rather than the literal "undefined"', () => {
    const missing = undefined;
    expect(html`<span>${missing}</span>`).toBe('<span></span>');
  });

  it('returns plain strings unchanged when there are no interpolations', () => {
    expect(html`<div class="static"></div>`).toBe('<div class="static"></div>');
  });
});
