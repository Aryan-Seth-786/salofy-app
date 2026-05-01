function renderBookingConfirmed() {
  const s = AppState.selectedSalon || salons[1];
  const selPkgs = (AppState.salonPackages || []).filter(pkgId => (s.packages||[]).some(p => p.id === pkgId));
  const selSvcs = (AppState.salonServices && AppState.salonServices.length > 0)
    ? AppState.salonServices.filter(sid => s.services[sid])
    : selPkgs.length > 0 ? [] : Object.keys(s.services).slice(0, 2);
  const svcTotal = selSvcs.reduce((a, sid) => a + (s.services[sid] || 0), 0);
  const pkgTotal = selPkgs.reduce((a, pkgId) => { const p = (s.packages||[]).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
  const subtotal = svcTotal + pkgTotal;
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (s.tier !== 'starter' && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  const dates    = ['Today','Sun 29','Mon 30','Tue 31','Wed 1','Thu 2'];
  const dateStr  = dates[AppState.booking.dateIdx] || 'Sun, Mar 29';
  const timeStr  = AppState.booking.time || '10:30 AM';

  return Shell(`
    <div style="display:flex;flex-direction:column;align-items:center;padding:80px 24px 24px;text-align:center">
      <!-- Success Icon -->
      <div class="success-circle">
        ${Icons.check(32, '#fff')}
      </div>
      <div style="font-family:var(--font-heading);font-size:24px;font-weight:700;color:${C.text};margin-bottom:8px">Booking Confirmed!</div>
      <div style="font-size:14px;color:${C.text2};margin-bottom:24px">Your appointment has been booked</div>

      <!-- Booking Card -->
      <div style="background:${C.surface2};border-radius:14px;padding:20px;width:100%;border:1px solid ${C.border};text-align:left">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
          <div style="width:48px;height:48px;background:${C.surface3};border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.scissors(22, C.text3)}</div>
          <div>
            <div style="font-size:15px;font-weight:600;color:${C.text}">${s.name}</div>
            <div style="font-size:11px;color:${C.text3}">${s.loc}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
          <div>
            <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em">Date</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${dateStr}</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em">Time</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${timeStr}</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em">Total</div>
            <div style="font-size:13px;font-weight:600;color:${C.primary};margin-top:2px">\u20B9${subtotal - discount}</div>
          </div>
        </div>
        <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Booked</div>
        ${selPkgs.map(pkgId => {
          const pkg = (s.packages||[]).find(p => p.id === pkgId);
          if (!pkg) return '';
          return PackageCard(pkg, true, 'summary');
        }).join('')}
        ${selSvcs.length > 0 ? `<div style="font-size:12px;color:${C.text2};margin-bottom:12px">${selSvcs.map(sid => getSvc(sid)?.label || sid).join(', ')}</div>` : ''}
        <div style="padding-top:10px;border-top:1px solid ${C.border}">${PayAtSalon()}</div>
      </div>

      <!-- Booking Reference -->
      <div style="background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:10px;padding:12px 16px;width:100%;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em">Booking Ref</div>
          <div style="font-size:14px;font-weight:700;color:${C.primary};letter-spacing:2px">SF2930</div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:11px;color:${C.text3};cursor:pointer">${Icons.copy(14, C.text3)} Copy</div>
      </div>

      <button data-action="go-home" class="btn btn--primary" style="margin-top:24px;border-radius:12px">
        Back to Home
      </button>
      <button data-action="view-bookings" style="margin-top:10px;width:100%;padding:14px;background:${C.surface2};color:${C.primary};border:1.5px solid ${C.primary};border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">
        View My Bookings
      </button>
    </div>
  `, { activeTab: 'bookings' });
}
