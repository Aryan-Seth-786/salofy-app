function renderSearchInput() {
  const selSvcs = AppState.selectedServices || [];
  const recent  = ['Haircut + Head Wash', 'Facial', 'Beard Trim', 'Bridal Package'];

  return Shell(`
    <!-- Search Header -->
    <div style="padding:44px 20px 0;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <div style="flex:1;position:relative">
        <input class="input" placeholder="Search services, salons..." style="padding-left:36px;${selSvcs.length > 0 ? `border-color:${C.primary}` : ''}" readonly>
        <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%)">${Icons.search(16, selSvcs.length > 0 ? C.primary : C.text3)}</div>
      </div>
    </div>

    <!-- Selected Services Pills -->
    ${selSvcs.length > 0 ? `
    <div style="padding:12px 20px 0">
      <div style="font-size:11px;font-weight:600;color:${C.text2};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Selected (${selSvcs.length})</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${selSvcs.map(sid => {
          const svc = getSvc(sid);
          return `<span class="pill pill--active" style="font-size:12px;padding:6px 12px" data-search-svc="${sid}">
            ${svcIcon(svc.icon, 14, C.primary)} ${svc.label}
            <span style="opacity:0.6;margin-left:2px;pointer-events:none">${Icons.close(12, C.primary)}</span>
          </span>`;
        }).join('')}
        <span data-action="go-search" style="font-size:11px;color:${C.error};font-weight:500;padding:6px 8px;cursor:pointer">Clear all</span>
      </div>
    </div>` : ''}

    <!-- Recent Searches -->
    <div style="padding:16px 20px 8px">
      <div style="font-size:11px;font-weight:600;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Recent Searches</div>
      ${recent.map(r => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid ${C.borderS};cursor:pointer">
          ${Icons.clock(16, C.text3)}
          <span style="font-size:13px;color:${C.text2};flex:1">${r}</span>
          ${Icons.forward(14, C.text3)}
        </div>
      `).join('')}
    </div>

    <!-- All Services -->
    <div style="padding:8px 20px 100px">
      <div style="font-size:11px;font-weight:600;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">All Services</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${allServices.map(svc => {
          const sel = selSvcs.includes(svc.id);
          return `<div class="pill${sel ? ' pill--active' : ''}" data-search-svc="${svc.id}">
            ${svcIcon(svc.icon, 15, sel ? C.primary : C.text2)} ${svc.label}
            ${sel ? Icons.check(12, C.primary) : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Bottom CTA -->
    <div style="position:sticky;bottom:0;left:0;right:0;padding:12px 20px 28px;background:linear-gradient(to top,${C.bg} 70%,transparent)">
      <button data-action="show-results" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:14px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
        ${selSvcs.length > 0 ? `Show Results for ${selSvcs.length} Service${selSvcs.length > 1 ? 's' : ''}` : 'Browse All Salons'}
        ${Icons.forward(16, '#fff')}
      </button>
    </div>
  `, { noNav: true });
}
