function renderFavorites() {
  const favSalons = salons.filter(s => AppState.favorites.has(s.id));
  const isEmpty = favSalons.length === 0;

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="display:flex;align-items:center;gap:10px">
        ${BackBtn()}
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-family:var(--font-body);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Saved Salons</span>
            ${Icons.heart(18, C.error, true)}
          </div>
          <div style="font-size:13px;color:${C.text3};margin-top:4px">${favSalons.length} salon${favSalons.length !== 1 ? 's' : ''} saved</div>
        </div>
      </div>
    </div>

    ${isEmpty ? `
    <div style="padding:40px 20px;text-align:center">
      <div style="width:64px;height:64px;border-radius:50%;background:${C.surface2};display:flex;align-items:center;justify-content:center;margin:0 auto 14px">${Icons.heart(26, C.text3)}</div>
      <div style="font-size:16px;font-weight:700;color:${C.text};margin-bottom:6px">Nothing saved yet</div>
      <div style="font-size:13px;color:${C.text3};line-height:1.5;margin-bottom:18px">Tap the heart on any salon to save it here for quick booking.</div>
      <button data-action="show-results" class="btn btn--primary" style="border-radius:12px">Browse salons</button>
    </div>` : `
    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${favSalons.map(s => SalonResultCard(s, [], true)).join('')}
    </div>`}
  `, { activeTab: 'favorites' });
}
