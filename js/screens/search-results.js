function renderSearchResults() {
  const selSvcs = AppState.selectedServices || [];
  const viewMode = AppState.searchViewMode || 'list';
  const results = salons
    .filter(s => selSvcs.length === 0 || selSvcs.some(sid => s.services[sid]))
    .sort((a, b) => ({ premium: 0, growth: 1, starter: 2 })[a.tier] - ({ premium: 0, growth: 1, starter: 2 })[b.tier]);

  return Shell(`
    <!-- Search Bar (tap to edit) -->
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <div data-nav="search" style="flex:1;background:${C.surface2};border:1px solid ${C.border};border-radius:10px;padding:11px 14px;color:${selSvcs.length > 0 ? C.text : C.text3};font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px">
        ${Icons.search(16, C.text3)}
        ${selSvcs.length > 0 ? `${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''} selected` : 'Search salons, services...'}
      </div>
    </div>

    <!-- Selected pills -->
    ${selSvcs.length > 0 ? `
    <div style="display:flex;gap:6px;padding:4px 20px 8px;overflow-x:auto;align-items:center" class="hide-sb">
      ${selSvcs.map(sid => {
        const svc = getSvc(sid);
        return `<span style="font-size:11px;padding:5px 10px;background:${C.primaryS};border:1px solid rgba(212,160,23,0.25);border-radius:16px;color:${C.primary};font-weight:500;white-space:nowrap;display:inline-flex;align-items:center;gap:4px">
          ${svcIcon(svc.icon, 12, C.primary)} ${svc.label}
        </span>`;
      }).join('')}
      <span data-nav="search" style="font-size:11px;color:${C.primary};font-weight:600;white-space:nowrap;cursor:pointer">${Icons.plus(12, C.primary)} Edit</span>
    </div>` : ''}

    <!-- Count + View Toggle -->
    <div style="padding:4px 20px 8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:12px;color:${C.text3}">
        ${results.length} salon${results.length !== 1 ? 's' : ''} found${selSvcs.length > 0 ? ` \u2022 showing prices for your services` : ''}
      </div>
      <div style="display:flex;border:1px solid ${C.border};border-radius:8px;overflow:hidden">
        <div data-action="search-view-list" style="padding:6px 12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;font-size:11px;font-weight:500;line-height:1;${viewMode === 'list' ? `background:${C.primary};color:#fff` : `background:${C.surface};color:${C.text3}`}">
          <span style="display:flex;align-items:center">${Icons.filter(11, viewMode === 'list' ? '#fff' : C.text3)}</span><span>List</span>
        </div>
        <div data-action="search-view-map" style="padding:6px 12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;font-size:11px;font-weight:500;line-height:1;${viewMode === 'map' ? `background:${C.primary};color:#fff` : `background:${C.surface};color:${C.text3}`}">
          <span style="display:flex;align-items:center">${Icons.mapPin(11, viewMode === 'map' ? '#fff' : C.text3)}</span><span>Map</span>
        </div>
      </div>
    </div>

    ${viewMode === 'map' ? `
    <!-- Map View -->
    ${AreaMap(null, results.map(s => s.id))}
    <div style="padding:12px 20px;display:flex;flex-direction:column;gap:8px">
      ${results.map(s => `
        <div data-goto-salon="${s.id}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${C.surface};border:1px solid ${C.border};border-radius:10px;cursor:pointer">
          <div style="width:32px;height:32px;background:${C.primaryS};border-radius:8px;display:flex;align-items:center;justify-content:center">
            ${Icons.mapPin(16, s.tier === 'premium' ? C.primary : s.tier === 'growth' ? C.verified : C.text3)}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:4px">
              ${s.name}
              ${s.tier === 'premium' ? TopDot() : s.tier === 'growth' ? VerifiedDot() : ''}
            </div>
            <div style="font-size:11px;color:${C.text3}">${s.loc} &bull; ${s.dist}${s.deal ? ` &bull; <span style="color:${C.primary};font-weight:500">${s.deal}</span>` : ''}</div>
          </div>
          ${Icons.forward(14, C.text3)}
        </div>
      `).join('')}
    </div>
    ` : `
    <!-- List View -->
    <!-- Pinned -->
    ${results.some(s => s.tier === 'premium') ? `
    <div style="padding:4px 20px;font-size:10px;font-weight:700;color:${C.primary};text-transform:uppercase;letter-spacing:1px;display:flex;align-items:center;gap:4px">
      ${Icons.mapPin(12, C.primary)} Top Salons in Your Area
    </div>` : ''}

    <!-- Results -->
    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${results.map((s, i) => {
        const divider = (i > 0 && results[i-1].tier === 'premium' && s.tier !== 'premium')
          ? `<div style="height:1px;background:${C.border};margin:4px 0 12px"></div>` : '';
        return `${divider}<div data-goto-salon="${s.id}">${SalonResultCard(s, selSvcs, AppState.favorites.has(s.id))}</div>`;
      }).join('')}
    </div>
    `}
  `, { activeTab: 'home' });
}
