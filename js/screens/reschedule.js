function renderReschedule() {
  const bk = AppState.rescheduleBooking || {
    salon: salons[1], date: 'Sun, Mar 29', time: '10:30 AM', services: "Men's Haircut, Beard Styling"
  };
  const s = bk.salon;
  const dates = [
    { d:'Today',n:'28' },{ d:'Sun',n:'29' },{ d:'Mon',n:'30' },
    { d:'Tue',n:'31'  },{ d:'Wed',n:'1'  },{ d:'Thu',n:'2'  },
    { d:'Fri',n:'3'   },{ d:'Sat',n:'4'  },
  ];
  const times = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','2:00','2:30','3:00','3:30'];
  const selDate = AppState.booking.dateIdx;
  const selTime = AppState.booking.time;

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Reschedule</span>
    </div>

    <!-- Current booking info -->
    <div style="margin:0 20px 16px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;padding:14px">
      <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Current Appointment</div>
      <div style="display:flex;gap:10px;align-items:center">
        <div style="width:40px;height:40px;background:${C.surface3};border-radius:8px;display:flex;align-items:center;justify-content:center">${Icons.scissors(18, C.text3)}</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:${C.text}">${s.name}</div>
          <div style="font-size:11px;color:${C.text3}">${bk.date} at ${bk.time}</div>
          <div style="font-size:11px;color:${C.text2};margin-top:1px">${bk.services}</div>
        </div>
      </div>
    </div>

    <div style="padding:0 20px 8px">
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:${C.text2};margin-bottom:14px">
        ${Icons.calendar(14, C.primary)}
        <span>Choose your new date and time</span>
      </div>

      <!-- Date picker -->
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">New Date</div>
      <div style="display:flex;gap:8px;overflow-x:auto;margin-bottom:16px" class="hide-sb">
        ${dates.map((dt, i) => `
          <div class="date-chip${i === selDate ? ' date-chip--active' : ''}" onclick="AppState.booking.dateIdx=${i};this.closest('.phone-content').querySelectorAll('.date-chip').forEach((c,j)=>{c.classList.toggle('date-chip--active',j===${i});c.querySelector('.date-chip__num').style.color=j===${i}?'${C.primary}':'${C.text}'})">
            <div class="date-chip__day">${dt.d}</div>
            <div class="date-chip__num" style="color:${i === selDate ? C.primary : C.text}">${dt.n}</div>
          </div>
        `).join('')}
      </div>

      <!-- Time picker -->
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">New Time</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
        ${times.map(t => `
          <div class="time-chip${t === selTime ? ' time-chip--active' : ''}" onclick="AppState.booking.time='${t}';this.closest('.phone-content').querySelectorAll('.time-chip').forEach(c=>c.classList.toggle('time-chip--active',c.textContent.trim()==='${t}'))">
            ${t}
          </div>
        `).join('')}
      </div>

      <!-- Free cancellation notice -->
      <div style="background:${C.successS};border:1px solid var(--success-border);border-radius:10px;padding:12px 14px;display:flex;gap:8px;align-items:flex-start;margin-bottom:16px">
        ${Icons.shield(16, C.success)}
        <div style="font-size:12px;color:${C.text2};line-height:1.5">
          <strong style="color:${C.success}">Free rescheduling</strong> &mdash; you can reschedule up to 2 hours before your appointment at no charge.
        </div>
      </div>

      <button data-action="view-bookings" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Confirm Reschedule
      </button>
    </div>
  `, { activeTab: 'bookings' });
}
