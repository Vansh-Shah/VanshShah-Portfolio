// ── main.js — entry point (10 lines) ─────────────────────────────────────
// This file just boots the app. All logic lives in components/ and pages/.
import './styles.css';
import { initUI, initReveal, animateCounters } from './components/ui.js';
import { renderFooter }                         from './components/footer.js';
import { initRouter, goTo }                     from './components/router.js';

window.goTo           = goTo;
window.initReveal     = initReveal;
window.animateCounters= animateCounters;

initUI();
renderFooter();
initRouter();
goTo('home', false);
