function renderMap() {
  const active = AppState.mapActiveSalon;

  return Shell(`
    <!-- Header -->
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:12px">
      <div style="font-family:var(--font-heading);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.4px;flex:1">Explore</div>
      <div style="font-size:12px;color:${C.text3};display:flex;align-items:center;gap:4px">${Icons.mapPin(12, C.primary)} Chandigarh / Mohali</div>
    </div>

    <!-- Map -->
    <div style="padding:0 0 8px">
      ${AreaMap(active ? active.id : null, null)}
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:12px;padding:0 20px 12px;justify-content:center">
      <span style="display:flex;align-items:center;gap:4px;font-size:9px;color:${C.text3}"><span style="width:8px;height:8px;border-radius:50%;background:${C.primary};display:inline-block"></span> Top Salon</span>
      <span style="display:flex;align-items:center;gap:4px;font-size:9px;color:${C.text3}"><span style="width:8px;height:8px;border-radius:50%;background:${C.verified};display:inline-block"></span> Verified</span>
      <span style="display:flex;align-items:center;gap:4px;font-size:9px;color:${C.text3}"><span style="width:8px;height:8px;border-radius:50%;background:${C.text3};display:inline-block"></span> Salon</span>
      <span style="display:flex;align-items:center;gap:4px;font-size:9px;color:${C.text3}"><span style="width:8px;height:8px;border-radius:50%;background:${C.info};display:inline-block"></span> You</span>
    </div>

    <!-- Active salon card OR hint -->
    ${active ? `
    <div style="padding:0 16px 8px" data-goto-salon="${active.id}">
      ${SalonResultCard(active, [], AppState.favorites.has(active.id))}
    </div>
    ` : `
    <div style="padding:12px 20px;text-align:center;font-size:12px;color:${C.text3}">Tap a pin to see salon details</div>
    `}

    <!-- All Locations list -->
    <div style="padding:8px 20px 4px;font-family:var(--font-heading);font-size:18px;font-weight:600;color:${C.text};letter-spacing:-0.2px">All Locations</div>
    <div style="padding:4px 16px 16px;display:flex;flex-direction:column;gap:8px">
      ${salons.map(s => {
        const isActive = active && active.id === s.id;
        return `
        <div data-map-pin="${s.id}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${isActive ? C.primaryS : C.surface};border:1px solid ${isActive ? C.primary+'44' : C.border};border-radius:10px;cursor:pointer">
          <div style="width:32px;height:32px;background:${isActive ? C.primary+'18' : C.surface2};border-radius:8px;display:flex;align-items:center;justify-content:center">
            ${Icons.mapPin(16, isActive ? C.primary : C.text3)}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:4px">
              ${s.name}
              ${s.tier === 'premium' ? TopDot() : s.tier === 'growth' ? VerifiedDot() : ''}
            </div>
            <div style="font-size:11px;color:${C.text3}">${s.loc} &bull; ${s.dist}</div>
          </div>
          ${Icons.forward(14, C.text3)}
        </div>`;
      }).join('')}
    </div>
  `, { activeTab: 'map' });
}
