function renderFavorites() {
  const favSalons = [salons[0], salons[3]]; // Luxe and Royal Cuts

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="display:flex;align-items:center;gap:10px">
        ${BackBtn()}
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-family:var(--font-body);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Saved Salons</span>
            ${Icons.heart(18, C.error, true)}
          </div>
          <div style="font-size:12px;color:${C.text3};margin-top:4px">${favSalons.length} salon${favSalons.length !== 1 ? 's' : ''} saved</div>
        </div>
      </div>
    </div>

    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${favSalons.map(s => SalonResultCard(s, [], true)).join('')}
    </div>
  `, { activeTab: 'favorites' });
}
