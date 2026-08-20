// ── components/terminal.js ───────────────────────────────────────────────
// An interactive fake shell for the Toolkit page. The filesystem is built
// straight from TOOLS/CATS in data.js — categories are directories, tools
// are files. Ships with a handful of easter eggs (try `sudo`, `rm -rf /`,
// `exit`, `matrix`, `coffee`, `vim`...).
import { html }           from './html.js';
import { TOOLS, CATS }   from '../data.js';
import { PROJECTS }      from '../data.js';
import { fireConfetti }  from './confetti.js';

const DIRS = CATS.filter(([id]) => id !== 'all'); // [[id, label], ...]
const CADENCE_RANK = { Daily: 0, Regular: 1, Learning: 2 };

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// dirId -> [{...tool, slug}], sorted usage-first same as the grid view
const FILES_BY_DIR = Object.fromEntries(DIRS.map(([id]) => [
  id,
  TOOLS
    .filter(t => t.cat === id)
    .map(t => Object.assign({ slug: slug(t.name) }, t))
    .sort((a, b) => CADENCE_RANK[a.cadence] - CADENCE_RANK[b.cadence]),
]));

const SUDO_PASSWORD = 'resilient';
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// ── Per-instance state (module-level — persists across mode toggles and
//    page navigation within the SPA session, until explicitly reset) ──────
function freshState() {
  return {
    path: [],            // [] = root, [dirId] = inside a directory
    cmdHistory: [],
    histIndex: -1,
    sudoPending: false,
    sudoAttempts: 0,
    locked: false,
    outputHtml: null,    // null = show WELCOME banner; set on first output
  };
}
let state = freshState();

export function resetTerminal() {
  state = freshState();
  const out = document.getElementById('cliOutput');
  if (out) out.innerHTML = WELCOME;
  refresh();
}

// ── Rendering ───────────────────────────────────────────────────────────

function prompt() {
  const loc = state.path.length ? `~/${state.path[0]}` : '~';
  return `visitor@toolkit:${loc}$`;
}

function currentDirLabel() {
  if (!state.path.length) return null;
  return (DIRS.find(([id]) => id === state.path[0]) || [null, state.path[0]])[1];
}

const WELCOME = [
  `<span class="cli-muted">VanshOS 2.4 LTS (on-call build) — type</span> <span class="cli-cmd">help</span> <span class="cli-muted">to get started</span>`,
  `<span class="cli-muted">19 tools across 4 directories. ` +
    `<span class="cli-cmd">ls</span> to look around, <span class="cli-cmd">cd</span> into one, <span class="cli-cmd">cat</span> a file.</span>`,
].map(l => `<div class="cli-line">${l}</div>`).join('');

function renderHints() {
  let hints;
  if (state.sudoPending) {
    hints = [];
  } else if (!state.path.length) {
    hints = ['ls', ...DIRS.map(([id]) => `cd ${id}`), 'tree', 'help'];
  } else {
    const files = FILES_BY_DIR[state.path[0]];
    hints = ['ls', files[0] ? `cat ${files[0].slug}` : null, 'cd ..', 'pwd'].filter(Boolean);
  }
  if (!hints.length) return '';
  return html`<div class="cli-hints" id="cliHints">
    ${hints.map(h => html`<button class="hint-pill" data-cmd="${h}">${h}</button>`).join('')}
  </div>`;
}

export function renderTerminal() {
  return html`
    <div class="terminal-panel cli-panel reveal">
      <div class="terminal-panel-tab">
        <span class="terminal-dot terminal-dot--r"></span>
        <span class="terminal-dot terminal-dot--y"></span>
        <span class="terminal-dot terminal-dot--g"></span>
        <span class="terminal-panel-label">TOOLKIT.SH</span>
        <button class="cli-reset-btn" id="cliResetBtn" type="button" aria-label="Reset terminal session">reset</button>
      </div>
      <div class="cli-output" id="cliOutput" role="log" aria-live="polite">${state.outputHtml ?? WELCOME}</div>
      <div class="cli-inputrow">
        <span class="cli-prompt" id="cliPrompt">${state.sudoPending ? 'Password:' : prompt()}</span>
        <input class="cli-input" id="cliInput" type="${state.sudoPending ? 'password' : 'text'}" autocomplete="off"
               autocapitalize="off" spellcheck="false"
               aria-label="Toolkit terminal command input" />
      </div>
      ${renderHints()}
    </div>

    <div class="cli-password-field reveal" id="cliPasswordField">
      <p class="eyebrow eyebrow--muted">Think you know the password?</p>
      <div class="cli-password-row">
        <input class="cli-password-input" id="cliPasswordGuess" type="password"
               placeholder="root password" autocomplete="off" aria-label="Root password guess" />
        <button class="ghost-btn" id="cliPasswordSubmit" type="button">Unlock root</button>
      </div>
      <p class="cli-password-msg" id="cliPasswordMsg"></p>
    </div>`;
}

// ── Command implementations ────────────────────────────────────────────

function printRaw(htmlStr) {
  const line = `<div class="cli-line">${htmlStr}</div>`;
  state.outputHtml = (state.outputHtml ?? WELCOME) + line;
  const out = document.getElementById('cliOutput');
  if (!out) return;
  out.insertAdjacentHTML('beforeend', line);
  out.scrollTop = out.scrollHeight;
}
function printText(text, cls = '') {
  printRaw(`<span class="${cls}">${escapeHtml(text)}</span>`);
}

function cmd_ls() {
  if (!state.path.length) {
    DIRS.forEach(([id, label]) => printRaw(
      `<span class="cli-dir">${id}/</span><span class="cli-muted"> — ${escapeHtml(label)}</span>`));
    return;
  }
  const files = FILES_BY_DIR[state.path[0]];
  files.forEach(t => printRaw(
    `<span class="cli-file">${t.slug}</span>` +
    `<span class="cli-tag ${t.cadence === 'Daily' ? 'cli-tag--accent' : ''}">${t.cadence}</span>`));
}

function cmd_cd(arg) {
  if (!arg || arg === '~' || arg === '/') { state.path = []; return; }
  if (arg === '..') { state.path = []; return; }
  const dir = DIRS.find(([id]) => id === arg);
  if (!dir) { printText(`cd: ${arg}: No such directory`, 'cli-error'); return; }
  state.path = [dir[0]];
}

function cmd_pwd() {
  printText(state.path.length ? `/${state.path[0]}` : '/');
}

function cmd_cat(arg) {
  if (!arg) { printText('cat: missing file operand', 'cli-error'); return; }
  if (!state.path.length) {
    printText(`cat: ${arg}: Is a directory (cd into it first)`, 'cli-error');
    return;
  }
  const t = FILES_BY_DIR[state.path[0]].find(f => f.slug === arg);
  if (!t) { printText(`cat: ${arg}: No such file`, 'cli-error'); return; }
  printRaw(`<span class="cli-heading"># ${escapeHtml(t.name)}</span>`);
  printRaw(`<span class="cli-muted">category: ${escapeHtml(currentDirLabel())}   cadence: ${escapeHtml(t.cadence)}</span>`);
  printRaw(`<span class="cli-subheading">## what it is</span>`);
  printText(t.what);
  printRaw(`<span class="cli-subheading">## how i use it</span>`);
  printText(t.how);
  if (t.project) {
    printRaw(`<span class="cli-hint-line">→ hint: run <span class="cli-cmd">open ${t.project}</span> to see the project this produced</span>`);
  }
}

function cmd_tree() {
  printRaw(`<span class="cli-dir">./</span>`);
  DIRS.forEach(([id], di) => {
    const last = di === DIRS.length - 1;
    printRaw(`<span class="cli-muted">${last ? '└──' : '├──'}</span> <span class="cli-dir">${id}/</span>`);
    const files = FILES_BY_DIR[id];
    files.forEach((t, fi) => {
      const branch = last ? '  ' : '│  ';
      const glyph  = fi === files.length - 1 ? '└──' : '├──';
      printRaw(`<span class="cli-muted">${branch}${glyph}</span> <span class="cli-file">${t.slug}</span>`);
    });
  });
}

function cmd_whoami() {
  printText('vansh-shah — technical support consultant @ ultradata australia.');
  printText('banking infra, on-call, and a master of cybersecurity in progress.');
}

function cmd_open(arg) {
  if (!arg) { printText('open: missing project id — try `open ssl-monitor`', 'cli-error'); return; }
  const p = PROJECTS.find(x => x.id === arg);
  if (!p) { printText(`open: ${arg}: no such project`, 'cli-error'); return; }
  printText(`opening ${p.title}…`, 'cli-success');
  setTimeout(() => window.openProject?.(p.id), 500);
}

const HELP_LINES = [
  ['ls',            'list directories, or files inside one'],
  ['cd <dir>',       'enter a directory (cd .. to go back)'],
  ['pwd',           'print the current directory'],
  ['cat <file>',     'show what a tool is and how I use it'],
  ['tree',          'show the whole filesystem at once'],
  ['whoami',        'about me'],
  ['open <project>','jump to a project this tool produced'],
  ['clear',         'clear the screen'],
];

function cmd_help() {
  HELP_LINES.forEach(([c, d]) => printRaw(
    `<span class="cli-cmd">${escapeHtml(c.padEnd(16, ' '))}</span><span class="cli-muted">${escapeHtml(d)}</span>`));
}

// ── Easter eggs ─────────────────────────────────────────────────────────
const EGGS = {
  'su':          () => printText("su: Permission denied. This account isn't in /etc/sudoers — or Ultradata's on-call roster.", 'cli-error'),
  'exit':        () => printText("you can't exit a portfolio. try `cd ..` instead.", 'cli-muted'),
  'logout':      () => printText("you can't exit a portfolio. try `cd ..` instead.", 'cli-muted'),
  'hack':        () => printText('this is not that kind of website. nice try though.', 'cli-muted'),
  'matrix':      () => printText('wake up... wrong site. try `ls` instead.', 'cli-muted'),
  'coffee':      () => printText('☕ correlates with resolution_time. studies pending.', 'cli-muted'),
  'ping':        () => printText('pong', 'cli-success'),
  'vim':         () => printText(':wq — real ops don\'t get stuck in the editor.', 'cli-muted'),
  'nano':        () => printText(':wq — real ops don\'t get stuck in the editor.', 'cli-muted'),
  'status':      () => printText('all systems operational. (this has been true 99.9% of the time.)', 'cli-success'),
};

function tryRmrf(input) {
  return /^rm\s+(-\w+\s+)*(-rf|-fr|\/|\*)/.test(input) || /rm\s+-rf/.test(input);
}

// ── Dispatch ────────────────────────────────────────────────────────────

function run(raw) {
  const input = raw.trim();
  const wasSudoPending = state.sudoPending;
  const echoText = wasSudoPending ? '*'.repeat(raw.length) : escapeHtml(raw);
  printRaw(`<span class="cli-prompt-echo">${wasSudoPending ? 'Password:' : prompt()}</span> <span class="cli-typed">${echoText}</span>`);
  if (!input) return;

  state.cmdHistory.push(raw);
  state.histIndex = state.cmdHistory.length;

  if (wasSudoPending) {
    state.sudoPending = false;
    if (input === SUDO_PASSWORD) {
      printText('Access granted. root@fingerprint:~# ...just kidding, no root here. Nice work finding that.', 'cli-success');
      fireConfetti();
    } else {
      state.sudoAttempts++;
      if (state.sudoAttempts >= 3) {
        state.locked = true;
        printText('su: Authentication failure. Incident escalated to security team (not really — but stop trying).', 'cli-error');
      } else {
        printText('Sorry, try again.', 'cli-error');
      }
    }
    return;
  }

  const [cmd, ...rest] = input.split(/\s+/);
  // Accept flags on any command (ls -l, ls -la, cat -n foo, tree -a, ...) —
  // we only have one output format per command, so flags are recognised
  // and silently ignored rather than tripping "command not found".
  const flags = rest.filter(r => /^-\w+$/.test(r));
  const args  = rest.filter(r => !flags.includes(r));
  const arg   = args.join(' ');
  const cdArg = (cmd === 'cd' && rest.length === 1 && rest[0] === '-') ? '..' : arg;

  if (cmd === 'sudo') {
    if (state.locked) { printText('su: Authentication failure.', 'cli-error'); return; }
    printText('[sudo] password for visitor: ', 'cli-muted');
    state.sudoPending = true;
    return;
  }
  if (tryRmrf(input)) {
    printText("not happening. read the logs before you theorise.", 'cli-error');
    return;
  }
  if (EGGS[cmd]) { EGGS[cmd](); return; }

  switch (cmd) {
    case 'ls':
    case 'dir':     cmd_ls(); break;
    case 'cd':      cmd_cd(cdArg); break;
    case 'pwd':     cmd_pwd(); break;
    case 'cat':     cmd_cat(arg); break;
    case 'tree':    cmd_tree(); break;
    case 'whoami':  cmd_whoami(); break;
    case 'open':    cmd_open(arg); break;
    case 'help':    cmd_help(); break;
    case 'clear': {
      state.outputHtml = '';
      const out = document.getElementById('cliOutput');
      if (out) out.innerHTML = '';
      return;
    }
    default:
      printText(`command not found: ${cmd} — try \`help\``, 'cli-error');
  }
}

function refresh() {
  const promptEl = document.getElementById('cliPrompt');
  if (promptEl) promptEl.textContent = state.sudoPending ? 'Password:' : prompt();
  const inputEl = document.getElementById('cliInput');
  if (inputEl) inputEl.type = state.sudoPending ? 'password' : 'text';
  const hintsEl = document.getElementById('cliHints');
  if (hintsEl) hintsEl.outerHTML = renderHints();
  wireHints();
}

function wireHints() {
  document.querySelectorAll('.hint-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('cliInput');
      if (!input) return;
      run(btn.dataset.cmd);
      refresh();
      input.focus();
    });
  });
}

export function initTerminal() {
  const panel = document.querySelector('.cli-panel');
  const input = document.getElementById('cliInput');
  if (!panel || !input) return;

  panel.addEventListener('click', e => {
    if (e.target.closest('#cliResetBtn')) return;
    input.focus();
  });
  input.focus();
  wireHints();

  document.getElementById('cliResetBtn')?.addEventListener('click', () => resetTerminal());

  const guessInput  = document.getElementById('cliPasswordGuess');
  const guessSubmit = document.getElementById('cliPasswordSubmit');
  const guessMsg    = document.getElementById('cliPasswordMsg');
  const tryGuess = () => {
    if (!guessInput.value) return;
    if (guessInput.value === SUDO_PASSWORD) {
      guessMsg.textContent = 'Correct. Access granted — nice work.';
      guessMsg.className = 'cli-password-msg cli-password-msg--ok';
      fireConfetti();
    } else {
      guessMsg.textContent = 'Nope, try again.';
      guessMsg.className = 'cli-password-msg cli-password-msg--err';
    }
    guessInput.value = '';
  };
  guessSubmit?.addEventListener('click', tryGuess);
  guessInput?.addEventListener('keydown', e => { if (e.key === 'Enter') tryGuess(); });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      run(val);
      refresh();
      input.value = '';
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!state.cmdHistory.length) return;
      state.histIndex = Math.max(0, state.histIndex - 1);
      input.value = state.cmdHistory[state.histIndex] || '';
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!state.cmdHistory.length) return;
      state.histIndex = Math.min(state.cmdHistory.length, state.histIndex + 1);
      input.value = state.cmdHistory[state.histIndex] || '';
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value;
      const candidates = !state.path.length
        ? ['ls', 'cd', 'tree', 'help', 'whoami', 'pwd', ...DIRS.map(([id]) => `cd ${id}`)]
        : ['ls', 'cat', 'cd ..', 'pwd', 'tree', ...FILES_BY_DIR[state.path[0]].map(t => `cat ${t.slug}`)];
      const match = candidates.find(c => c.startsWith(val) && c !== val);
      if (match) input.value = match;
    }
  });
}
