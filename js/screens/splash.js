function renderSplash() {
  return Shell(`
    <div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg, #1A1A2E 0%, #2a2040 50%, #1A1A2E 100%);margin-top:-40px;padding-bottom:60px">
      <div style="width:90px;height:90px;border-radius:24px;background:linear-gradient(135deg, #B8860B, #D4A017);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(184,134,11,0.4);margin-bottom:24px">
        ${Icons.scissors(40, '#fff')}
      </div>
      <div style="font-family:var(--font-heading);font-size:38px;font-weight:700;color:#D4A017;margin-bottom:4px">Salofy</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:4px;text-transform:uppercase">Discover &bull; Book &bull; Glow</div>
      <div style="margin-top:40px;width:32px;height:32px;border:3px solid rgba(212,160,23,0.3);border-top-color:#D4A017;border-radius:50%;animation:spin 1s linear infinite"></div>
    </div>
  `, { noNav: true, statusDark: true });
}
