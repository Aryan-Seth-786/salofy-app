function renderBooking() {
  const s       = AppState.selectedSalon || salons[1];
  const selPkgs = (AppState.salonPackages || []).filter(pkgId => (s.packages||[]).some(p => p.id === pkgId));
  const selSvcs = (AppState.salonServices && AppState.salonServices.length > 0)
    ? AppState.salonServices.filter(sid => s.services[sid])
    : selPkgs.length > 0 ? [] : Object.keys(s.services).slice(0, 2);
  const dates   = [
    { d:'Today',n:'28' },{ d:'Sun',n:'29' },{ d:'Mon',n:'30' },
    { d:'Tue',n:'31'  },{ d:'Wed',n:'1'  },{ d:'Thu',n:'2'  },
  ];
  const times   = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','2:00','2:30','3:00','3:30'];
  const selDate = AppState.booking.dateIdx;
  const selTime = AppState.booking.time;
  const svcTotal = selSvcs.reduce((a, sid) => a + (s.services[sid] || 0), 0);
  const pkgTotal = selPkgs.reduce((a, pkgId) => { const p = (s.packages||[]).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
  const subtotal = svcTotal + pkgTotal;
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (s.tier !== 'starter' && dp > 0) ? Math.round(subtotal * dp / 100) : 0;

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <span style="font-size:18px;font-weight:700;color:${C.text}">Book Appointment</span>
    </div>

    <!-- Salon info -->
    <div style="padding:0 20px 12px;display:flex;gap:12px;align-items:center">
      <div style="width:50px;height:50px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid ${C.border}">${Icons.scissors(22, C.text3)}</div>
      <div>
        <div style="font-size:14px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:4px">
          ${s.name}${s.tier !== 'starter' ? ' ' + VerifiedDot() : ''}
        </div>
        <div style="font-size:11px;color:${C.text3}">${s.loc}</div>
      </div>
    </div>

    <!-- Steps indicator -->
    <div style="display:flex;gap:8px;padding:0 20px 16px">
      ${['Services', 'Date & Time'].map((label, i) => `
        <div style="flex:1;display:flex;align-items:center;gap:6px">
          <div style="width:24px;height:24px;border-radius:50%;background:${i === 0 ? C.success : C.primary};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">
            ${i === 0 ? Icons.check(12, '#fff') : '2'}
          </div>
          <span style="font-size:12px;font-weight:${i === 1 ? 600 : 400};color:${i === 1 ? C.text : C.text3}">${label}</span>
        </div>
      `).join('')}
    </div>

    <!-- Selected services summary (editable) -->
    <div style="padding:0 20px 12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:12px;font-weight:600;color:${C.text2}">Your selection</div>
        <span data-nav="back" style="font-size:11px;color:${C.primary};font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:3px">
          ${Icons.edit(11, C.primary)} Edit
        </span>
      </div>
      ${selPkgs.map(pkgId => {
        const pkg = (s.packages||[]).find(p => p.id === pkgId);
        if (!pkg) return '';
        return `<div style="background:${C.primaryS};border:1px solid rgba(212,160,23,0.3);border-radius:12px;padding:10px 12px;margin-bottom:6px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:9px;font-weight:700;letter-spacing:0.5px;color:#fff;background:${C.primary};padding:2px 6px;border-radius:6px">PACKAGE</span>
              <span style="font-size:13px;font-weight:600;color:${C.text}">${pkg.name}</span>
            </div>
            <span style="font-size:13px;font-weight:700;color:${C.primary}">\u20B9${pkg.price}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${pkg.services.map(sid => { const svc = getSvc(sid); return svc ? `<span style="font-size:10px;padding:2px 7px;background:rgba(255,255,255,0.6);border-radius:8px;color:${C.text2}">${svc.label}</span>` : ''; }).join('')}
            <span style="font-size:10px;padding:2px 7px;background:${C.successS};color:${C.success};border-radius:8px">Save \u20B9${pkg.savings}</span>
          </div>
        </div>`;
      }).join('')}
      ${selSvcs.length > 0 ? `<div style="display:flex;gap:6px;flex-wrap:wrap">
        ${selSvcs.map(sid => {
          const svc = getSvc(sid);
          return `<span style="font-size:11px;padding:4px 10px;background:${C.primaryS};border:1px solid rgba(212,160,23,0.25);border-radius:16px;color:${C.primary};font-weight:500;display:inline-flex;align-items:center;gap:4px">
            ${svcIcon(svc.icon, 12, C.primary)} ${svc.label} \u20B9${s.services[sid]}
          </span>`;
        }).join('')}
      </div>` : ''}
    </div>

    <!-- Date picker -->
    <div style="padding:0 20px 12px">
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">Select Date</div>
      <div style="display:flex;gap:8px;overflow-x:auto" class="hide-sb">
        ${dates.map((dt, i) => `
          <div class="date-chip${i === selDate ? ' date-chip--active' : ''}" onclick="AppState.booking.dateIdx=${i};this.closest('.phone-content').querySelectorAll('.date-chip').forEach((c,j)=>c.classList.toggle('date-chip--active',j===${i}));this.closest('.phone-content').querySelectorAll('.date-chip .date-chip__num').forEach((n,j)=>n.style.color=j===${i}?'${C.primary}':'${C.text}')">
            <div class="date-chip__day">${dt.d}</div>
            <div class="date-chip__num" style="color:${i === selDate ? C.primary : C.text}">${dt.n}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Time picker -->
    <div style="padding:0 20px 12px">
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">Select Time</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
        ${times.map(t => `
          <div class="time-chip${t === selTime ? ' time-chip--active' : ''}" onclick="AppState.booking.time='${t}';this.closest('.phone-content').querySelectorAll('.time-chip').forEach(c=>c.classList.toggle('time-chip--active',c.textContent.trim()==='${t}'))">
            ${t}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Summary -->
    <div style="margin:0 20px 8px;padding:14px;background:${C.surface2};border-radius:12px;border:1px solid ${C.border}">
      ${selSvcs.map(sid => {
        const svc = getSvc(sid);
        return `<div style="display:flex;justify-content:space-between;font-size:13px;color:${C.text};margin-bottom:6px">
          <span style="color:${C.text3};display:flex;align-items:center;gap:5px">${svcIcon(svc.icon, 12, C.text3)} ${svc.label}</span>
          <span>\u20B9${s.services[sid]}</span>
        </div>`;
      }).join('')}
      ${selPkgs.map(pkgId => {
        const pkg = (s.packages||[]).find(p => p.id === pkgId);
        if (!pkg) return '';
        return `<div style="display:flex;justify-content:space-between;font-size:13px;color:${C.text};margin-bottom:6px">
          <span style="color:${C.text3};display:flex;align-items:center;gap:5px">${Icons.scissors(12, C.text3)} ${pkg.name} <span style="font-size:10px;background:${C.successS};color:${C.success};padding:1px 5px;border-radius:6px">Save \u20B9${pkg.savings}</span></span>
          <span>\u20B9${pkg.price}</span>
        </div>`;
      }).join('')}
      ${discount > 0 ? `
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px">
          <span style="color:${C.success}">Discount (${dp}%)</span>
          <span style="color:${C.success}">-\u20B9${discount}</span>
        </div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;color:${C.primary};border-top:1px solid ${C.border};padding-top:8px;margin-top:8px">
        <span>Total</span><span>\u20B9${subtotal - discount}</span>
      </div>
    </div>

    <div style="padding:0 20px 8px">${PayAtSalon()}</div>

    <div style="padding:0 20px 20px">
      <button data-action="confirm-booking" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Confirm Booking
      </button>
    </div>
  `, { activeTab: 'bookings' });
}
