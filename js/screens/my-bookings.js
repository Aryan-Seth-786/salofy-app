function renderMyBookings() {
  const bks = [
    { idx: 0, salon: salons[1], date: 'Sun, Mar 29', time: '10:30 AM', services: "Men's Haircut, Beard Styling", status: 'upcoming' },
    { idx: 1, salon: salons[0], date: 'Wed, Mar 26', time: '11:00 AM', pkg: salons[0].packages[2], status: 'upcoming' },
    { idx: 2, salon: salons[0], date: 'Sat, Mar 22', time: '2:00 PM',  services: 'Gold Facial',                status: 'completed' },
    { idx: 3, salon: salons[2], date: 'Mon, Mar 15', time: '11:00 AM', services: 'Basic Facial, Waxing',        status: 'completed' },
  ];

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="font-size:20px;font-weight:700;color:${C.text}">My Bookings</div>
      <div style="display:flex;gap:8px;margin-top:12px">
        ${['Upcoming', 'Completed'].map((t, i) => `
          <div class="pill${i === 0 ? ' pill--primary' : ''}">${t}</div>
        `).join('')}
      </div>
    </div>

    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${bks.map(b => `
        <div class="booking-card${b.status === 'upcoming' ? ' booking-card--upcoming' : ''}" data-booking-idx="${b.idx}">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
            <div data-goto-salon="${b.salon.id}" style="width:44px;height:44px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">${Icons.scissors(20, C.text3)}</div>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:600;color:${C.text}">${b.salon.name}</div>
              <div style="font-size:11px;color:${C.text3}">${b.salon.loc}</div>
            </div>
            <span style="font-size:10px;font-weight:600;padding:3px 10px;border-radius:6px;background:${b.status === 'upcoming' ? C.primaryS : C.successS};color:${b.status === 'upcoming' ? C.primary : C.success};text-transform:uppercase">${b.status}</span>
          </div>

          <div style="display:flex;gap:16px;font-size:12px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:4px">${Icons.calendar(12, C.text3)}<span style="color:${C.text3}"> ${b.date}</span></div>
            <div style="display:flex;align-items:center;gap:4px">${Icons.clock(12, C.text3)}<span style="color:${C.text3}"> ${b.time}</span></div>
          </div>
          ${b.pkg ? `
            <div style="background:${C.primaryS};border:1px solid rgba(212,160,23,0.3);border-radius:10px;padding:8px 10px;margin-top:6px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <div style="display:flex;align-items:center;gap:5px">
                  <span style="font-size:9px;font-weight:700;letter-spacing:0.5px;color:#fff;background:${C.primary};padding:2px 5px;border-radius:5px">PACKAGE</span>
                  <span style="font-size:12px;font-weight:600;color:${C.text}">${b.pkg.name}</span>
                </div>
                <span style="font-size:12px;font-weight:700;color:${C.primary}">\u20B9${b.pkg.price}</span>
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
                style="flex:1;padding:10px;background:${C.errorS};color:${C.error};border:1px solid rgba(192,57,43,0.3);border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer">
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
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'bookings' });
}
