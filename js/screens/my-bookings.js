function renderMyBookings() {
  const bks = bookings.map(b => ({
    ...b,
    salon: salons.find(s => s.id === b.salonId),
    pkg:   b.pkgId ? (salons.find(s => s.id === b.salonId)?.packages || []).find(p => p.id === b.pkgId) : null,
  })).filter(b => b.salon);

  const tab     = AppState.bookingsTab || null;
  const LIMIT   = 2;
  const upcoming  = bks.filter(b => b.status === 'upcoming');
  const completed = bks.filter(b => b.status === 'completed');

  const cardHtml = (b) => `
    <div class="booking-card${b.status === 'upcoming' ? ' booking-card--upcoming' : ''}" data-booking-idx="${b.idx}">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
        <div data-goto-salon="${b.salon.id}" style="width:44px;height:44px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">${Icons.scissors(20, C.text3)}</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:${C.text}">${b.salon.name}</div>
          <div style="font-size:11px;color:${C.text3}">${b.salon.loc}</div>
        </div>
        ${BookingStatusPill(b.status)}
      </div>

      <div style="display:flex;gap:16px;font-size:12px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:4px">${Icons.calendar(12, C.text3)}<span style="color:${C.text3}"> ${b.date}</span></div>
        <div style="display:flex;align-items:center;gap:4px">${Icons.clock(12, C.text3)}<span style="color:${C.text3}"> ${b.time}</span></div>
      </div>
      ${b.pkg ? `
        <div style="background:${C.primaryS};border:1px solid var(--primary-border);border-radius:10px;padding:8px 10px;margin-top:6px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <div style="display:flex;align-items:center;gap:5px">
              <span style="font-size:9px;font-weight:700;letter-spacing:0.5px;color:#fff;background:${C.primary};padding:2px 5px;border-radius:5px">PACKAGE</span>
              <span style="font-size:12px;font-weight:600;color:${C.text}">${b.pkg.name}</span>
            </div>
            <span style="font-size:12px;font-weight:700;color:${C.primary}">₹${b.pkg.price}</span>
          </div>
          <div style="font-size:11px;color:${C.text2}">${b.pkg.services.map(sid => getSvc(sid)?.label).filter(Boolean).join(' · ')}</div>
        </div>` : `<div style="font-size:12px;color:${C.text2};margin-top:6px">${b.services}</div>`}

      ${b.status === 'upcoming' ? `
        <div style="margin-top:8px">${PayAtSalon()}</div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button onclick="AppState.rescheduleBooking={salon:salons[${b.salon.id-1}],date:'${b.date}',time:'${b.time}',services:'${b.services}'};navigate('reschedule')"
            style="flex:1;padding:10px;background:${C.primary};color:#fff;border:none;border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer">
            Reschedule
          </button>
          <button onclick="confirmCancelBooking(${b.idx})"
            style="flex:1;padding:10px;background:${C.errorS};color:${C.error};border:1px solid ${C.errorB};border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer">
            Cancel
          </button>
        </div>
      ` : `
        <div style="display:flex;gap:8px;margin-top:10px">
          <button data-goto-salon="${b.salon.id}"
            style="flex:1;padding:10px;background:${C.surface2};color:${C.text};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-weight:500;font-size:12px;cursor:pointer">
            Book Again
          </button>
          <button style="flex:1;padding:10px;background:${C.primaryS};color:${C.primary};border:1px solid ${C.primary}33;border-radius:8px;font-family:inherit;font-weight:500;font-size:12px;cursor:pointer">
            ${Icons.starFilled(11, C.primary)} Rate Visit
          </button>
        </div>
      `}
    </div>`;

  let content = '';

  const emptyUpcoming = `
    <div class="empty-state">
      <div class="empty-state__icon">${Icons.calendar(28, C.primary)}</div>
      <div class="empty-state__title">No upcoming bookings</div>
      <div class="empty-state__subtitle">Book a salon visit and it'll show up here — ready to manage.</div>
      <button data-nav="search" class="btn btn--primary-sm">Explore Salons</button>
    </div>`;

  const emptyCompleted = `
    <div class="empty-state">
      <div class="empty-state__icon">${Icons.starFilled(28, C.primary)}</div>
      <div class="empty-state__title">No visits yet</div>
      <div class="empty-state__subtitle">Your completed appointments will appear here once you've had your first visit.</div>
    </div>`;

  if (tab === 'Upcoming') {
    content = upcoming.length ? upcoming.map(cardHtml).join('') : emptyUpcoming;

  } else if (tab === 'Completed') {
    content = completed.length ? completed.map(cardHtml).join('') : emptyCompleted;

  } else {
    // Overview: both sections, truncated
    const shownUpcoming  = upcoming.slice(0, LIMIT);
    const shownCompleted = completed.slice(0, LIMIT);
    const moreUpcoming   = upcoming.length  - shownUpcoming.length;
    const moreCompleted  = completed.length - shownCompleted.length;

    content = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;color:${C.text}">Upcoming</div>
        <span style="font-size:10px;font-weight:600;padding:1px 7px;background:${C.primaryS};color:${C.primary};border-radius:10px">${upcoming.length}</span>
      </div>
      ${shownUpcoming.length
        ? shownUpcoming.map(cardHtml).join('')
        : `<div style="padding:16px 0 8px;font-size:12px;color:${C.text3};display:flex;align-items:center;gap:6px">${Icons.calendar(14, C.text3)} No upcoming bookings — <span data-nav="search" style="color:${C.primary};font-weight:600;cursor:pointer">Book one now</span></div>`}
      ${moreUpcoming > 0 ? `
        <button onclick="AppState.bookingsTab='Upcoming';navigate('my-bookings')"
          style="width:100%;padding:10px;background:${C.surface2};color:${C.primary};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer;margin-top:4px">
          View ${moreUpcoming} more upcoming →
        </button>` : ''}

      <div style="height:1px;background:${C.border};margin:18px 0 16px"></div>

      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;color:${C.text}">Completed</div>
        <span style="font-size:10px;font-weight:600;padding:1px 7px;background:${C.successS};color:${C.success};border-radius:10px">${completed.length}</span>
      </div>
      ${shownCompleted.map(cardHtml).join('')}
      ${moreCompleted > 0 ? `
        <button onclick="AppState.bookingsTab='Completed';navigate('my-bookings')"
          style="width:100%;padding:10px;background:${C.surface2};color:${C.primary};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer;margin-top:8px">
          View ${moreCompleted} more completed →
        </button>` : ''}
    `;
  }

  const pillTabs = ['All', 'Upcoming', 'Completed'];

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="font-family:var(--font-body);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.3px">My Bookings</div>
      <div style="display:flex;gap:8px;margin-top:12px">
        ${pillTabs.map(t => {
          const isActive = t === 'All' ? tab === null : tab === t;
          const clickVal = t === 'All' ? 'null' : `'${t}'`;
          return `<div class="pill${isActive ? ' pill--primary' : ''}"
            onclick="AppState.bookingsTab=${clickVal};navigate('my-bookings')"
            style="cursor:pointer">${t}</div>`;
        }).join('')}
      </div>
    </div>

    <div style="padding:8px 20px 20px;display:flex;flex-direction:column;gap:12px">
      ${content}
    </div>
  `, { activeTab: 'bookings' });
}
