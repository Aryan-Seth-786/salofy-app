function renderSplash() {
  setTimeout(() => {
    initGlazzSplashPhysics();
  }, 100);

  return Shell(`
    <div class="glazz-splash-container" data-action="go-login" id="glazzSplashShell">
      <canvas class="glazz-splash-canvas" id="glazzSplashCanvas"></canvas>
      <div class="glazz-impact-shockwave" id="glazzShockwave"></div>

      <div class="glazz-drop-actor" id="glazzDropActor">
        <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="drop3dShell" cx="42%" cy="38%" r="65%">
              <stop offset="0%" stop-color="#ffa0b4"/>
              <stop offset="35%" stop-color="#f43f5e"/>
              <stop offset="75%" stop-color="#b5123b"/>
              <stop offset="100%" stop-color="#62071f"/>
            </radialGradient>
            <linearGradient id="swirlCurveShell" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
              <stop offset="40%" stop-color="#ff738a" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="
            M30,2
            C32,18 48,34 54,48
            C60,62 58,74 48,82
            C38,90 22,90 12,82
            C2,74 0,60 6,46
            C12,32 28,18 30,2 Z
          " fill="url(#drop3dShell)"/>
          <path d="
            M30,12
            C26,26 14,44 14,60
            C14,74 24,80 34,78
          " stroke="url(#swirlCurveShell)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
          <ellipse cx="22" cy="48" rx="3.5" ry="8" transform="rotate(-20 22 48)" fill="#ffffff" opacity="0.75"/>
        </svg>
      </div>

      <div class="glazz-wordmark-stage">
        <span class="glazz-part-glaz" id="glazzPartGlaz">GLAZ</span>
        <span class="glazz-target-zz" id="glazzTargetZz">
          <span class="glazz-part-zz" id="glazzPartZz">Z</span>
        </span>
      </div>
      <div class="glazz-splash-tagline" id="glazzTagline">Discover · Book · Glow</div>
      <div class="glazz-splash-hint" id="glazzHint">Tap to continue</div>
    </div>
  `, { noNav: true, statusDark: true });
}

function initGlazzSplashPhysics() {
  const shell = document.getElementById('glazzSplashShell');
  if (!shell) return;
  const canvas = document.getElementById('glazzSplashCanvas');
  const shockwave = document.getElementById('glazzShockwave');
  const dropActor = document.getElementById('glazzDropActor');
  const zzTarget = document.getElementById('glazzTargetZz');
  const charGlaz = document.getElementById('glazzPartGlaz');
  const charZz = document.getElementById('glazzPartZz');
  const tagline = document.getElementById('glazzTagline');
  const hint = document.getElementById('glazzHint');

  if (!canvas || !dropActor || !zzTarget) return;

  const ctx = canvas.getContext('2d');
  const rect = shell.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  let particles = [];
  let animId = null;

  class Particle {
    constructor(x, y, vx, vy, size, color, decay) {
      this.x = x; this.y = y; this.vx = vx; this.vy = vy;
      this.size = size; this.color = color; this.alpha = 1;
      this.decay = decay || 0.024; this.gravity = 0.38;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.vy += this.gravity;
      this.vx *= 0.96; this.alpha -= this.decay;
    }
    draw(c) {
      if (this.alpha <= 0) return;
      c.save();
      c.globalAlpha = Math.max(0, this.alpha);
      c.fillStyle = this.color;
      c.shadowColor = '#f43f5e'; c.shadowBlur = 8;
      c.beginPath();
      c.arc(this.x, this.y, Math.max(0.5, this.size * this.alpha), 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    if (particles.length > 0) animId = requestAnimationFrame(loop);
  }

  const sRect = shell.getBoundingClientRect();
  const zRect = zzTarget.getBoundingClientRect();
  const targetX = (zRect.left - sRect.left) + (zRect.width / 2);
  const targetY = (zRect.top - sRect.top) + (zRect.height / 2);

  const startX = targetX + 16;
  const startY = -80;

  dropActor.style.transition = 'none';
  dropActor.style.opacity = '1';
  dropActor.style.left = `${startX - 22}px`;
  dropActor.style.top = `${startY}px`;
  dropActor.style.transform = 'scale(0.85, 1.25) rotate(-6deg)';

  requestAnimationFrame(() => {
    dropActor.style.transition = 'top 0.72s cubic-bezier(0.55, 0.055, 0.675, 0.19), left 0.72s ease-out, transform 0.72s ease-in';
    dropActor.style.top = `${targetY - 50}px`;
    dropActor.style.left = `${targetX - 22}px`;
    dropActor.style.transform = 'scale(0.7, 1.45) rotate(0deg)';

    setTimeout(() => {
      dropActor.style.transition = 'transform 0.09s ease-out, opacity 0.09s ease-out';
      dropActor.style.transform = 'scale(1.85, 0.35) translateY(14px)';
      dropActor.style.opacity = '0';

      shockwave.style.left = `${targetX}px`;
      shockwave.style.top = `${targetY + 4}px`;
      shockwave.style.width = '120px';
      shockwave.style.height = '120px';
      shockwave.classList.add('burst');

      // Splash explosion
      const colors = ['#ffffff', '#ffa0b4', '#ff607d', '#f43f5e', '#b5123b'];
      for (let i = 0; i < 36; i++) {
        const a = (Math.PI * 2 * (i / 36)) + (Math.random() * 0.4 - 0.2);
        const s = 4 + Math.random() * 8;
        particles.push(new Particle(targetX, targetY + 4, Math.cos(a)*s, Math.sin(a)*s - 3, Math.random()*4 + 2, colors[i%colors.length], 0.02 + Math.random()*0.02));
      }
      for (let i = 0; i < 20; i++) {
        const a = Math.random() * Math.PI * 2;
        particles.push(new Particle(targetX, targetY + 4, Math.cos(a)*2, Math.sin(a)*2 - 1.5, Math.random()*2 + 1, '#ff9ab0', 0.035));
      }
      loop();

      charZz.classList.add('reveal');
      setTimeout(() => charGlaz.classList.add('reveal'), 140);
      setTimeout(() => tagline.classList.add('reveal'), 480);
      setTimeout(() => hint.classList.add('reveal'), 820);
    }, 710);
  });
}
