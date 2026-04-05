function renderFavorites() {
  const favSalons = [salons[0], salons[3]]; // Luxe and Royal Cuts

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="font-size:20px;font-weight:700;color:${C.text};display:flex;align-items:center;gap:8px">${Icons.heart(20, C.error, true)} Saved Salons</div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px">${favSalons.length} salons saved</div>
    </div>

    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${favSalons.map(s => SalonResultCard(s, [], true)).join('')}
    </div>
  `, { activeTab: 'favorites' });
}
