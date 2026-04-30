function renderSplash() {
  return Shell(`
    <div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg, var(--ink-900) 0%, var(--ink-800) 50%, var(--ink-900) 100%);margin-top:-40px;padding-bottom:60px">
      <div style="width:90px;height:90px;border-radius:24px;background:var(--grad-rose);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-rose);margin-bottom:24px">
        ${Icons.scissors(40, '#fff')}
      </div>
      <div style="font-family:var(--font-heading);font-size:38px;font-weight:700;color:var(--primary);margin-bottom:4px">Salofy</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:4px;text-transform:uppercase">Discover &bull; Book &bull; Glow</div>
      <div style="margin-top:40px;width:32px;height:32px;border:3px solid var(--primary-border);border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite"></div>
    </div>
  `, { noNav: true, statusDark: true });
}
