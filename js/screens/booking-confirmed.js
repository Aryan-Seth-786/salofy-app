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
      <div style="width:72px;height:72px;border-radius:50%;background:${C.success};display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 8px 24px rgba(45,139,85,0.25)">
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
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Date</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${dateStr}</div>
          </div>
          <div>
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Time</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${timeStr}</div>
          </div>
          <div>
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Total</div>
            <div style="font-size:13px;font-weight:600;color:${C.primary};margin-top:2px">\u20B9${subtotal - discount}</div>
          </div>
        </div>
        <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Booked</div>
        ${selPkgs.map(pkgId => {
          const pkg = (s.packages||[]).find(p => p.id === pkgId);
          if (!pkg) return '';
          return `<div style="background:${C.primaryS};border:1px solid rgba(212,160,23,0.3);border-radius:10px;padding:8px 10px;margin-bottom:6px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <div style="display:flex;align-items:center;gap:5px">
                <span style="font-size:9px;font-weight:700;letter-spacing:0.5px;color:#fff;background:${C.primary};padding:2px 5px;border-radius:5px">PACKAGE</span>
                <span style="font-size:12px;font-weight:600;color:${C.text}">${pkg.name}</span>
              </div>
              <span style="font-size:12px;font-weight:700;color:${C.primary}">\u20B9${pkg.price}</span>
            </div>
            <div style="font-size:11px;color:${C.text2}">${pkg.services.map(sid => getSvc(sid)?.label).filter(Boolean).join(' · ')}</div>
          </div>`;
        }).join('')}
        ${selSvcs.length > 0 ? `<div style="font-size:12px;color:${C.text2};margin-bottom:12px">${selSvcs.map(sid => getSvc(sid)?.label || sid).join(', ')}</div>` : ''}
        <div style="padding-top:10px;border-top:1px solid ${C.border}">${PayAtSalon()}</div>
      </div>

      <!-- Booking Reference -->
      <div style="background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:10px;padding:12px 16px;width:100%;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Booking Ref</div>
          <div style="font-size:14px;font-weight:700;color:${C.primary};letter-spacing:2px">SF2930</div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:11px;color:${C.text3};cursor:pointer">${Icons.copy(14, C.text3)} Copy</div>
      </div>

      <button data-action="go-home" style="margin-top:24px;width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Back to Home
      </button>
      <button data-action="view-bookings" style="margin-top:10px;width:100%;padding:14px;background:${C.surface2};color:${C.primary};border:1.5px solid ${C.primary};border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">
        View My Bookings
      </button>
    </div>
  `, { activeTab: 'bookings' });
}
