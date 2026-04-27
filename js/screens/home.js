function renderHome() {
  const popularSvcs = [
    { id: 'haircut', label: 'Haircut',  photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop&crop=faces,center' },
    { id: 'facial',  label: 'Facial',   photo: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop&crop=faces,center' },
    { id: 'color',   label: 'Color',    photo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=center' },
    { id: 'beard',   label: 'Beard',    photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=faces,center' },
    { id: 'spa',     label: 'Spa',      photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop&crop=center' },
    { id: 'bridal',  label: 'Bridal',   photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop&crop=faces,center' },
    { id: 'waxing',  label: 'Waxing',   photo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&crop=center' },
    { id: 'manicure',label: 'Nails',    photo: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop&crop=center' },
  ];

  const userName = (AppState && AppState.user && AppState.user.name)
    ? AppState.user.name.split(' ')[0]
    : 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Personal zone
  const nextBooking = bookings.find(b => b.status === 'upcoming');
  const nextSalon = nextBooking ? salons.find(s => s.id === nextBooking.salonId) : null;
  const nextBookingLabel = nextBooking
    ? (nextBooking.services || (nextSalon && (nextSalon.packages.find(p => p.id === nextBooking.pkgId) || {}).name) || '')
    : '';

  const completedSalonIds = [...new Set(bookings.filter(b => b.status === 'completed').map(b => b.salonId))];
  const rebookSalons = completedSalonIds.map(id => salons.find(s => s.id === id)).filter(Boolean).slice(0, 5);

  // Discovery zone
  const dealSalons = salons.filter(s => s.flash || s.deal);

  function parseHour(str) {
    const m = str.trim().match(/(\d+)\s*(AM|PM)/i);
    if (!m) return -1;
    let h = parseInt(m[1]);
    const period = m[2].toUpperCase();
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h;
  }
  function isOpenNow(hoursStr) {
    const parts = hoursStr.split(' - ');
    if (parts.length !== 2) return false;
    const open = parseHour(parts[0]);
    const close = parseHour(parts[1]);
    const now = new Date().getHours();
    return open >= 0 && close >= 0 && now >= open && now < close;
  }
  const openNowSalons = salons.filter(s => isOpenNow(s.hours)).map(s => ({
    ...s, closePart: s.hours.split(' - ')[1] || ''
  }));

  // Monetization zone
  const featuredSalons = salons.filter(s => s.tier === 'premium');

  // Explore zone
  const topRated = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const tagline = nextBooking ? `You're booked for ${nextBooking.date}.` : 'Your next fresh cut starts here.';

  const isNewUser = typeof localStorage !== 'undefined' && !localStorage.getItem('salofy_htw_seen');

  return Shell(`
    <!-- Header: location + bell -->
    <div style="padding:44px 20px 10px;background:rgba(251,249,248,0.88);backdrop-filter:blur(12px);position:sticky;top:0;z-index:10">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:4px;cursor:pointer">
          ${Icons.mapPin(14, C.primary)}
          <div>
            <div style="font-size:10px;color:${C.text3};font-weight:600;letter-spacing:0.06em;text-transform:uppercase">Your area</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:3px">Sector 17, Chandigarh <span style="font-size:10px;color:${C.primary}">▾</span></div>
          </div>
        </div>
        <div data-nav="notifications" style="position:relative;cursor:pointer;width:38px;height:38px;background:#fff;border-radius:999px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS}">
          ${Icons.bell(18, C.ink700)}
          <div style="position:absolute;top:8px;right:8px;width:7px;height:7px;background:${C.error};border-radius:50%;border:2px solid #fff"></div>
        </div>
      </div>
    </div>

    <!-- Greeting -->
    <div style="padding:14px 20px 12px">
      <div style="font-family:var(--font-heading);font-size:26px;font-weight:600;color:${C.ink900};letter-spacing:-0.02em;line-height:1.1">${greeting}, ${userName} 👋</div>
      <div style="font-size:13px;color:${C.text3};margin-top:4px">${tagline}</div>
    </div>

    <!-- Search Bar -->
    <div data-nav="search" style="margin:0 20px 18px;background:#fff;border-radius:14px;padding:13px 16px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-sm);cursor:pointer;border:1px solid ${C.borderS}">
      ${Icons.search(17, C.ink400)}
      <div style="flex:1;color:${C.ink400};font-size:14px">Haircut, facial, or salon name</div>
      <div style="width:1px;height:18px;background:${C.border}"></div>
      ${Icons.filter(17, C.ink700)}
    </div>

    <!-- How It Works (new users only) -->
    ${isNewUser ? `
      <div id="htw-card" style="margin:0 20px 18px;background:${C.primaryS};border-radius:16px;border:1px solid rgba(244,63,94,0.18);padding:14px 16px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
          <div>
            <div style="font-size:13px;font-weight:700;color:${C.ink900}">How Salofy works</div>
            <div style="font-size:11px;color:${C.text3};margin-top:2px">Get started in 3 simple steps</div>
          </div>
          <div onclick="localStorage.setItem('salofy_htw_seen','1');document.getElementById('htw-card').style.display='none'" style="width:26px;height:26px;border-radius:50%;background:rgba(18,15,13,0.07);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:12px;color:${C.text3};margin-left:8px">✕</div>
        </div>
        ${[
          { n:'1', t:'Choose services',  d:'Haircut, facial, combo — whatever you need' },
          { n:'2', t:'Compare & pick',   d:'Browse salons, compare prices, find your fit' },
          { n:'3', t:'Book & walk in',   d:'Confirm your slot. Pay at the salon. Done.' },
        ].map((s, i, arr) => `
          <div style="display:flex;gap:12px;align-items:flex-start${i < arr.length - 1 ? ';margin-bottom:10px' : ''}">
            <div style="width:24px;height:24px;border-radius:50%;background:${C.primary};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">${s.n}</div>
            <div style="padding-top:3px">
              <div style="font-size:12px;font-weight:600;color:${C.ink900}">${s.t}</div>
              <div style="font-size:11px;color:${C.text3};margin-top:1px">${s.d}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <!-- Upcoming Booking Card -->
    ${nextBooking && nextSalon ? `
      <div style="padding:0 20px 18px">
        <div style="background:#fff;border-radius:16px;padding:14px 16px;border:1px solid ${C.borderS};box-shadow:var(--shadow-sm)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
            <div style="flex:1;min-width:0">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${C.primary};margin-bottom:4px">Upcoming</div>
              <div style="font-size:15px;font-weight:700;color:${C.ink900}">${nextSalon.name}</div>
              <div style="font-size:12px;color:${C.text3};margin-top:2px">${nextBooking.date} · ${nextBooking.time}</div>
              ${nextBookingLabel ? `<div style="font-size:12px;color:${C.text2};margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${nextBookingLabel}</div>` : ''}
            </div>
            ${nextSalon.cover ? `
              <div style="width:52px;height:52px;border-radius:12px;overflow:hidden;flex-shrink:0;border:1px solid ${C.borderS}">
                <img src="${nextSalon.cover}" alt="${nextSalon.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
              </div>
            ` : ''}
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <div data-nav="reschedule" onclick="AppState.rescheduleBooking=bookings[${nextBooking.idx}]" style="flex:1;padding:8px;background:${C.primaryS};border-radius:999px;text-align:center;font-size:12px;font-weight:600;color:${C.primary};cursor:pointer">Reschedule</div>
            <div data-nav="my-bookings" style="flex:1;padding:8px;background:${C.ink100};border-radius:999px;text-align:center;font-size:12px;font-weight:600;color:${C.ink700};cursor:pointer">View Booking</div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Quick Rebook -->
    ${rebookSalons.length > 0 ? `
      <div style="padding:0 20px 20px">
        <div style="font-size:13px;font-weight:600;color:${C.text3};margin-bottom:10px">Book again →</div>
        <div style="display:flex;gap:12px;overflow-x:auto" class="hide-sb">
          ${rebookSalons.map(s => `
            <div data-goto-salon="${s.id}" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0">
              <div style="width:54px;height:54px;border-radius:14px;overflow:hidden;border:2px solid ${C.borderS};box-shadow:var(--shadow-sm)">
                ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">` : `<div style="width:100%;height:100%;background:${C.surface2};display:flex;align-items:center;justify-content:center">${Icons.scissors(20, C.text3)}</div>`}
              </div>
              <span style="font-size:10px;color:${C.ink700};font-weight:500;text-align:center;max-width:60px;line-height:1.2">${s.name.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Category Chips (horizontal scroll) -->
    <div style="padding:0 20px 20px">
      <div style="font-size:15px;font-weight:700;color:${C.ink900};margin-bottom:12px">What are you booking?</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px" class="hide-sb">
        ${popularSvcs.map(s => `
          <div data-nav="search" onclick="AppState.selectedServices=['${s.id}']" style="display:flex;align-items:center;gap:8px;cursor:pointer;flex-shrink:0;background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:6px 14px 6px 6px;box-shadow:var(--shadow-sm)">
            <div style="width:30px;height:30px;border-radius:50%;overflow:hidden;flex-shrink:0">
              <img src="${s.photo}" alt="${s.label}" loading="lazy" width="30" height="30" style="width:100%;height:100%;object-fit:cover;display:block">
            </div>
            <span style="font-size:12px;color:${C.ink800};font-weight:600;white-space:nowrap">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Flash Deals Carousel -->
    ${dealSalons.length > 0 ? `
      <div style="padding:0 0 22px">
        <div style="padding:0 20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-size:15px;font-weight:700;color:${C.ink900}">Flash deals</span>
          <span data-nav="deals" style="font-size:13px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
        </div>
        <div style="display:flex;gap:12px;padding:0 20px;overflow-x:auto" class="hide-sb">
          ${dealSalons.map(s => `
            <div data-goto-salon="${s.id}" style="min-width:200px;height:132px;border-radius:16px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#1f1a17,#332c28)">
              ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0.55">` : ''}
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(18,15,13,.85) 45%,transparent 80%);padding:12px;display:flex;flex-direction:column;justify-content:flex-end">
                ${s.flash ? `<div style="background:${C.primary};color:#fff;font-size:9px;font-weight:700;letter-spacing:0.06em;padding:3px 8px;border-radius:999px;display:inline-block;margin-bottom:6px;width:fit-content">⏱ ${s.flash.hrs}h ${s.flash.min}m left</div>` : ''}
                <div style="font-size:13px;font-weight:700;color:#fff;line-height:1.25">${s.flash ? s.flash.title : s.deal}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.65);margin-top:3px">${s.name} · ${s.dist}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Open Now -->
    ${openNowSalons.length >= 2 ? `
      <div style="padding:0 0 22px">
        <div style="padding:0 20px;display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="font-size:15px;font-weight:700;color:${C.ink900}">Open now</span>
          <span style="font-size:11px;color:${C.success};font-weight:600;background:${C.successS};padding:2px 8px;border-radius:999px">● ${openNowSalons.length} salons</span>
        </div>
        <div style="display:flex;gap:12px;padding:0 20px;overflow-x:auto" class="hide-sb">
          ${openNowSalons.map(s => `
            <div data-goto-salon="${s.id}" style="min-width:180px;height:120px;border-radius:14px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#1f1a17,#332c28)">
              ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : ''}
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(18,15,13,.75) 40%,transparent 80%);padding:12px;display:flex;flex-direction:column;justify-content:flex-end">
                <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;color:#fff;line-height:1.2">${s.name}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.72);margin-top:3px">★ ${s.rating} · ${s.dist}</div>
              </div>
              <div style="position:absolute;top:8px;left:8px;background:${C.success};color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:999px">Until ${s.closePart}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Featured Salons (Sponsored) -->
    <div style="padding:0 0 22px">
      <div style="padding:0 20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:15px;font-weight:700;color:${C.ink900}">Featured</span>
          <span style="font-size:10px;color:${C.text3};font-weight:600;background:${C.surface2};padding:2px 8px;border-radius:999px;border:1px solid ${C.borderS}">Sponsored</span>
        </div>
        <span data-nav="search" style="font-size:13px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
      </div>
      <div style="display:flex;gap:12px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${featuredSalons.map(s => `
          <div data-goto-salon="${s.id}" style="min-width:240px;height:136px;border-radius:16px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:var(--grad-rose)">
            ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : ''}
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(18,15,13,.72) 30%,transparent 70%);padding:14px;display:flex;flex-direction:column;justify-content:flex-end">
              <div style="display:flex;gap:6px;margin-bottom:6px">${TopBadge()}${s.deal ? DealTag(s.deal) : ''}</div>
              <div style="font-family:var(--font-heading);font-size:15px;font-weight:600;color:#fff;letter-spacing:-0.01em">${s.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;display:flex;align-items:center;gap:4px">${Icons.mapPin(10,'rgba(255,255,255,0.7)')} ${s.loc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Top Rated Near You -->
    <div style="padding:0 20px 6px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:15px;font-weight:700;color:${C.ink900}">Top rated near you</span>
      <span data-nav="search" style="font-size:13px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
    </div>
    <div style="padding:4px 20px 24px;display:flex;flex-direction:column;gap:14px">
      ${topRated.map(s => `
        <div data-goto-salon="${s.id}">
          ${SalonResultCard(s, [], AppState.favorites.has(s.id))}
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'home' });
}
