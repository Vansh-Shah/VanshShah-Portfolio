// ── main.js — entry point ─────────────────────────────────────────────────
// This file just boots the app. All logic lives in components/ and pages/.
import './styles.css';
import { initUI, initReveal, animateCounters } from './components/ui.js';
import { renderFooter }                         from './components/footer.js';
import { initRouter, navigateFromLocation, goTo } from './components/router.js';
import { openProject }                          from './pages/projects.js';
import { initTheme }                            from './components/theme.js';

window.goTo            = goTo;
window.initReveal      = initReveal;
window.animateCounters = animateCounters;
window.openProject     = openProject;

initTheme();
initUI();
renderFooter();
initRouter();
navigateFromLocation(); // respects deep links like /work or /projects/ssl-monitor
