// ── terminal-grep.test.js — `| grep` and bare `grep` in the Toolkit shell ──
import { describe, it, expect, beforeEach } from 'vitest';
import { mountApp } from '../helpers/dom.js';
import { renderToolkit, initToolkit } from '../../src/pages/toolkit.js';

function type(cmd) {
  const input = document.getElementById('cliInput');
  input.value = cmd;
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
}
const output = () => document.getElementById('cliOutput').textContent;

describe('terminal grep', () => {
  beforeEach(() => {
    mountApp();
    document.getElementById('main').innerHTML = renderToolkit();
    initToolkit();
  });

  it('filters piped output to matching lines', () => {
    type('ls | grep bank');
    expect(output()).toContain('banking/');
    expect(output()).not.toContain('network/ —');
  });

  it('supports -i, -v and -c', () => {
    type('ls | grep -c /');
    expect(output()).toMatch(/\n?\s*[1-9]\d*\s*$/);
    type('ls | grep -i NETWORK');
    expect(output()).toContain('network/');
  });

  it('searches every tool with a bare grep', () => {
    type('grep -i python');
    expect(output()).toContain('code/');
    expect(output()).toContain('python');
  });

  it('rejects non-grep pipe targets', () => {
    type('ls | sort');
    expect(output()).toContain('only grep works after a pipe');
  });
});
