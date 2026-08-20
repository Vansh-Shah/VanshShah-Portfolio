// ── components/confetti.js ───────────────────────────────────────────────
// A confetti burst for the sudo/password easter egg: a Higgsfield-generated
// popper graphic flares up from the bottom of the screen, while small paper
// pieces launch upward and outward from the same point — a real popper, not
// rain falling from the top.
//
// The generated graphic is on a solid black background. mix-blend-mode
// doesn't reliably composite through a position:fixed overlay in Chrome (a
// known compositor-layer quirk), so instead we chroma-key the black out
// once via canvas, producing a real alpha-transparent PNG that works
// regardless of blend-mode/compositing edge cases.
const COLORS = ['#f35b22', '#ff5e24', '#f77c55', '#88d2c3', '#8bc5f3', '#c678dd'];
// Runtime string, not a static import — Vite won't rewrite this for the
// GitHub Pages base path on its own, so build it from BASE_URL ourselves.
const BURST_SRC = import.meta.env.BASE_URL.replace(/\/$/, '') + '/confetti-burst.png';

let injected = false;
function injectStyles() {
  if (injected) return;
  injected = true;
  const style = document.createElement('style');
  style.textContent = `
    .confetti-layer {
      position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
    }
    .confetti-burst-img {
      position: absolute; bottom: -10%; left: 50%;
      width: min(70vw, 620px); height: auto;
      transform: translateX(-50%) scale(0.3);
      opacity: 0;
      animation: confetti-burst-pop 1.4s cubic-bezier(.16,1,.3,1) forwards;
    }
    @keyframes confetti-burst-pop {
      0%   { transform: translateX(-50%) scale(0.25); opacity: 0; }
      15%  { opacity: 1; }
      55%  { transform: translateX(-50%) scale(1.05); opacity: 1; }
      100% { transform: translateX(-50%) scale(1.15); opacity: 0; }
    }
    .confetti-piece {
      position: absolute; bottom: 0; will-change: transform, opacity;
      animation: confetti-launch var(--dur) cubic-bezier(.12,.68,.32,1) forwards;
    }
    @keyframes confetti-launch {
      0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
      70%  { opacity: 1; }
      100% { transform: translate(var(--driftX), var(--riseY)) rotate(var(--spin)); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Chroma-keys near-black pixels to transparent, once, and caches the result.
let burstDataUrlPromise = null;
function getTransparentBurst() {
  if (burstDataUrlPromise) return burstDataUrlPromise;
  burstDataUrlPromise = new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = frame.data;
        for (let i = 0; i < px.length; i += 4) {
          const brightness = px[i] + px[i + 1] + px[i + 2];
          if (brightness < 46) px[i + 3] = 0;          // near-black -> fully transparent
          else if (brightness < 90) px[i + 3] *= (brightness - 46) / 44; // soft edge
        }
        ctx.putImageData(frame, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        resolve(BURST_SRC); // canvas failed (e.g. tainted) — fall back to the raw asset
      }
    };
    img.onerror = () => resolve(BURST_SRC);
    img.src = BURST_SRC;
  });
  return burstDataUrlPromise;
}
// Kick off processing as soon as this module loads, so it's ready well
// before a visitor actually finds the password.
getTransparentBurst();

export function fireConfetti({ count = 90, duration = 2600 } = {}) {
  injectStyles();
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);

  const burstImg = document.createElement('img');
  burstImg.alt = '';
  burstImg.className = 'confetti-burst-img';
  getTransparentBurst().then(src => { burstImg.src = src; });
  layer.appendChild(burstImg);

  const originXPct = 50; // bottom-center, matching the burst graphic
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size    = 6 + Math.random() * 6;
    const color   = COLORS[Math.floor(Math.random() * COLORS.length)];
    const spread  = (Math.random() * 70 - 35); // degrees off straight-up
    const angle   = (spread * Math.PI) / 180;
    const power   = 55 + Math.random() * 40; // vh travelled upward
    const riseY   = -(power) + 'vh';
    const driftX  = (Math.sin(angle) * power * 1.6) + 'vh';
    const spin    = Math.floor(Math.random() * 720 - 360) + 'deg';
    const delay   = Math.random() * 220;
    const dur     = (duration * (0.75 + Math.random() * 0.5)) + 'ms';
    const round   = Math.random() > 0.5;
    const startX  = originXPct + (Math.random() * 10 - 5);

    piece.style.left = startX + '%';
    piece.style.width = size + 'px';
    piece.style.height = (round ? size : size * 0.5) + 'px';
    piece.style.background = color;
    piece.style.borderRadius = round ? '50%' : '2px';
    piece.style.setProperty('--riseY', riseY);
    piece.style.setProperty('--driftX', driftX);
    piece.style.setProperty('--spin', spin);
    piece.style.setProperty('--dur', dur);
    piece.style.animationDelay = delay + 'ms';

    layer.appendChild(piece);
  }

  setTimeout(() => layer.remove(), duration + 900);
}
