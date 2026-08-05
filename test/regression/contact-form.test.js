// ── contact-form.test.js ───────────────────────────────────────────────────
// Regression coverage for the contact form's validation and submit flow —
// the one page on the site with real interactive logic and an external
// side effect (the Formspree POST), both easy to silently break.
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mountApp } from '../helpers/dom.js';
import { renderContact, initContact } from '../../src/pages/contact.js';

function mountContactForm() {
  mountApp();
  document.getElementById('main').innerHTML = renderContact();
  initContact();
}

function fillField(id, value) {
  const el = document.getElementById(id);
  el.value = value;
  el.dispatchEvent(new Event('blur'));
}

describe('contact form validation', () => {
  beforeEach(() => {
    mountContactForm();
  });

  it('shows a required-field error and blocks submission when fields are empty', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    document.getElementById('contactForm').dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    await Promise.resolve();

    expect(document.getElementById('cf-name-err').textContent).toMatch(/name/i);
    expect(document.getElementById('formNote').textContent).toMatch(/fix the highlighted/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('flags an invalid email address on blur', () => {
    fillField('cf-email', 'not-an-email');
    expect(document.getElementById('cf-email-err').textContent).toMatch(/doesn't look right/i);
    expect(document.getElementById('cf-email').classList.contains('form-input--error')).toBe(true);
  });

  it('clears the error once a valid value is entered', () => {
    fillField('cf-email', 'bad');
    expect(document.getElementById('cf-email-err').textContent).not.toBe('');

    const input = document.getElementById('cf-email');
    input.value = 'vansh@example.com';
    input.dispatchEvent(new Event('input'));

    expect(document.getElementById('cf-email-err').textContent).toBe('');
    expect(input.classList.contains('form-input--error')).toBe(false);
  });

  it('submits valid data to Formspree and shows a success message', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

    fillField('cf-name', 'Vansh Shah');
    fillField('cf-email', 'vansh@example.com');
    fillField('cf-subject', 'Hello');
    fillField('cf-message', 'Great portfolio!');

    document.getElementById('contactForm').dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://formspree.io/f/mrevokzl');
    const body = JSON.parse(options.body);
    expect(body).toEqual({
      name: 'Vansh Shah',
      email: 'vansh@example.com',
      subject: 'Hello',
      message: 'Great portfolio!',
    });
    expect(document.getElementById('formNote').textContent).toMatch(/sent/i);
  });

  it('shows a fallback error message when the request fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false });

    fillField('cf-name', 'Vansh Shah');
    fillField('cf-email', 'vansh@example.com');
    fillField('cf-subject', 'Hello');
    fillField('cf-message', 'Great portfolio!');

    document.getElementById('contactForm').dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(document.getElementById('formNote').textContent).toMatch(/something went wrong/i);
  });
});
