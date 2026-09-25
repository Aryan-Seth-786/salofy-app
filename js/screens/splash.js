function renderSplash() {
  const dropSvg = `
    <svg viewBox="0 0 72 96" aria-hidden="true">
      <defs>
        <linearGradient id="glazzDropGrad" x1="20%" y1="5%" x2="80%" y2="95%">
          <stop offset="0%" stop-color="#ff6b7e"/>
          <stop offset="50%" stop-color="#f43f5e"/>
          <stop offset="100%" stop-color="#b5123b"/>
        </linearGradient>
      </defs>
      <path fill="url(#glazzDropGrad)" d="M36 4C36 4 64 42 64 62a28 28 0 1 1-56 0C8 42 36 4 36 4z"/>
      <ellipse class="shine" cx="26" cy="40" rx="8" ry="14" fill="#fff" opacity="0.35"/>
    </svg>
  `;

  return Shell(`
    <div class="glazz-splash" data-action="go-login">
      <div class="glazz-splash__stage">
        <div class="glazz-splash__drop">${dropSvg}</div>
        <div class="glazz-splash__ripple" aria-hidden="true"></div>
      </div>
      <div class="glazz-splash__word">GLAZ<span class="glazz-splash__slash"></span><span>Z</span></div>
      <div class="glazz-splash__tag">Discover · Book · Glow</div>
      <div class="glazz-splash__hint">Tap to continue</div>
    </div>
  `, { noNav: true, statusDark: true });
}
