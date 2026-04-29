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

  // User + time
  const userName = (AppState && AppState.user && AppState.user.name)
    ? AppState.user.name.split(' ')[0] : 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const genderFilter = AppState.genderFilter || 'all';

  // Personal zone
  const nextBooking = bookings.find(b => b.status === 'upcoming');
  const nextSalon = nextBooking ? salons.find(s => s.id === nextBooking.salonId) : null;
  const nextBookingLabel = nextBooking
    ? (nextBooking.services || (nextSalon && (nextSalon.packages.find(p => p.id === nextBooking.pkgId) || {}).name) || '')
    : '';
  const completedSalonIds = [...new Set(bookings.filter(b => b.status === 'completed').map(b => b.salonId))];
  const rebookSalons = completedSalonIds.map(id => salons.find(s => s.id === id)).filter(Boolean).slice(0, 5);

  // Discovery data
  const dealSalons = salons.filter(s => s.flash || s.deal);
  const topRated = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const trendingSalons = [...salons].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const budgetSalons = salons.filter(s => Math.min(...Object.values(s.services)) <= 499);
  const flashSalon = salons.find(s => s.flash);

  // Personalization: "Because you booked" or fallback to popular
  const lastCompleted = bookings.find(b => b.status === 'completed');
  const lastCompletedSalon = lastCompleted ? salons.find(s => s.id === lastCompleted.salonId) : null;
  let personalSalons, personalHeader;
  if (lastCompletedSalon) {
    const lastSvcKeys = Object.keys(lastCompletedSalon.services);
    personalSalons = salons
      .filter(s => s.id !== lastCompletedSalon.id && lastSvcKeys.some(sid => s.services[sid]))
      .slice(0, 4);
    const shortName = lastCompletedSalon.name.split(' ').slice(0, 2).join(' ');
    personalHeader = `Because you booked ${shortName}`;
  } else {
    personalSalons = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 4);
    personalHeader = 'Popular in your area';
  }

  // Salon Stories stub — first staff member from top salon
  const storySalon = salons[0];
  const storyStylist = storySalon.staff && storySalon.staff.length > 0 ? storySalon.staff[0] : null;

  // Time-of-day contextual banner
  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  let todayMsg, todaySub;
  if (isWeekend) {
    todayMsg = 'Weekend self-care ✨';
    todaySub = 'Deep conditioning & spa under ₹599';
  } else if (hour >= 12 && hour < 14) {
    todayMsg = 'Quick lunch-hour trims ⚡';
    todaySub = 'Slots open near you right now';
  } else if (hour >= 17) {
    todayMsg = 'Evening glow-up 🌙';
    todaySub = 'Post-work facials & blow-dries';
  } else {
    todayMsg = 'Make time for yourself 🌿';
    todaySub = 'Discover salons near you';
  }

  // Directory — all salons by rating
  const directorySalons = [...salons].sort((a, b) => b.rating - a.rating);

  const tagline = nextBooking ? `You're booked for ${nextBooking.date}.` : 'Your next fresh look starts here.';
  const isNewUser = typeof localStorage !== 'undefined' && !localStorage.getItem('salofy_htw_seen');

  return Shell(`

    <!-- ─── §1. Sticky header: location · Salofy+ · Saved · Bell ─── -->
    <div style="padding:40px 16px 8px;background:rgba(251,249,248,0.94);backdrop-filter:blur(14px);position:sticky;top:0;z-index:10">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:flex-start;gap:5px;cursor:pointer">
          <div style="margin-top:3px;flex-shrink:0">${Icons.mapPin(13, C.primary)}</div>
          <div>
            <div style="font-size:10px;color:${C.text3};font-weight:600;letter-spacing:0.06em;text-transform:uppercase;line-height:1.2">Your area</div>
            <div style="font-size:14px;font-weight:700;color:${C.ink900};display:flex;align-items:center;gap:3px;line-height:1.25">Sector 17, Chandigarh <span style="font-size:10px;color:${C.primary}">▾</span></div>
            <div style="font-size:10px;color:${C.ink400};line-height:1.2;margin-top:1px">flat no. - 403, Tower n…</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <!-- Salofy+ loyalty chip -->
          <div style="display:flex;align-items:center;gap:3px;background:var(--grad-saffron);border-radius:10px;padding:5px 9px;cursor:pointer;box-shadow:0 2px 6px rgba(245,158,11,0.3)">
            <span style="font-size:10px;font-weight:800;color:#fff;letter-spacing:0.02em">✦</span>
            <span style="font-size:10px;font-weight:800;color:#fff;letter-spacing:0.02em">PRO</span>
            <span style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.85);margin-left:2px">₹1</span>
          </div>
          <!-- Saved heart -->
          <div data-nav="favorites" style="width:36px;height:36px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS};cursor:pointer">
            ${Icons.heart(16, C.ink600, false)}
          </div>
          <!-- Bell -->
          <div data-nav="notifications" style="position:relative;width:36px;height:36px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS};cursor:pointer">
            ${Icons.bell(16, C.ink700)}
            <div style="position:absolute;top:7px;right:7px;width:7px;height:7px;background:${C.error};border-radius:50%;border:2px solid #fff"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── §2. Search bar + M / W gender toggle ─── -->
    <div style="padding:10px 16px 12px;display:flex;align-items:center;gap:8px">
      <!-- Search pill -->
      <div data-nav="search" style="flex:1;min-width:0;background:#fff;border-radius:14px;padding:0 14px;height:48px;display:flex;align-items:center;gap:8px;box-shadow:var(--shadow-sm);cursor:pointer;border:1px solid ${C.borderS}">
        ${Icons.search(16, C.ink400)}
        <div style="flex:1;min-width:0;color:${C.ink400};font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Search "haircut", "facial", or salon</div>
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${C.ink400}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          <div style="width:1px;height:16px;background:${C.border}"></div>
          ${Icons.filter(14, C.ink700)}
        </div>
      </div>
      <!-- M / W gender toggle pill -->
      <div style="background:#fff;border-radius:14px;border:1px solid ${C.borderS};box-shadow:var(--shadow-sm);height:48px;display:flex;align-items:center;overflow:hidden;flex-shrink:0">
        <div onclick="AppState.genderFilter=(AppState.genderFilter==='men'?'all':'men');navigate('home')" style="width:34px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;background:${genderFilter === 'men' ? C.primary : 'transparent'}">
          <span style="font-size:11px;font-weight:800;color:${genderFilter === 'men' ? '#fff' : C.ink500};line-height:1">M</span>
          <span style="font-size:8px;font-weight:600;color:${genderFilter === 'men' ? 'rgba(255,255,255,0.75)' : C.ink400};line-height:1">Men</span>
        </div>
        <div style="width:1px;height:26px;background:${C.borderS}"></div>
        <div onclick="AppState.genderFilter=(AppState.genderFilter==='women'?'all':'women');navigate('home')" style="width:34px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;background:${genderFilter === 'women' ? C.primary : 'transparent'}">
          <span style="font-size:11px;font-weight:800;color:${genderFilter === 'women' ? '#fff' : C.ink500};line-height:1">W</span>
          <span style="font-size:8px;font-weight:600;color:${genderFilter === 'women' ? 'rgba(255,255,255,0.75)' : C.ink400};line-height:1">Women</span>
        </div>
      </div>
    </div>

    <!-- ─── §3. Hero: Video promo OR Upcoming booking ─── -->
    ${nextBooking && nextSalon ? `
      <div style="padding:0 16px 14px">
        <div style="background:#fff;border-radius:20px;padding:16px;border:1px solid ${C.borderS};box-shadow:var(--shadow-sm)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
            <div style="flex:1;min-width:0">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${C.primary};margin-bottom:4px">Upcoming</div>
              <div style="font-size:16px;font-weight:700;color:${C.ink900}">${nextSalon.name}</div>
              <div style="font-size:12px;color:${C.text3};margin-top:2px">${nextBooking.date} · ${nextBooking.time}</div>
              ${nextBookingLabel ? `<div style="font-size:12px;color:${C.text2};margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${nextBookingLabel}</div>` : ''}
            </div>
            ${nextSalon.cover ? `
              <div style="width:56px;height:56px;border-radius:14px;overflow:hidden;flex-shrink:0;border:1px solid ${C.borderS}">
                <img src="${nextSalon.cover}" alt="${nextSalon.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
              </div>
            ` : ''}
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <div data-nav="reschedule" onclick="AppState.rescheduleBooking=bookings[${nextBooking.idx}]" style="flex:1;padding:9px;background:${C.primaryS};border-radius:999px;text-align:center;font-size:12px;font-weight:700;color:${C.primary};cursor:pointer">Reschedule</div>
            <div data-nav="my-bookings" style="flex:1;padding:9px;background:${C.ink100};border-radius:999px;text-align:center;font-size:12px;font-weight:700;color:${C.ink700};cursor:pointer">View Booking</div>
          </div>
        </div>
      </div>
    ` : `
      <div style="padding:0 16px 14px">
        <div style="position:relative;height:200px;border-radius:20px;overflow:hidden;background:var(--grad-rose)">
          <!-- Autoplaying ambient video — replace src with production asset -->
          <video autoplay muted loop playsinline preload="auto"
            poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=450&fit=crop&crop=center"
            style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
          </video>
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(244,63,94,0.72) 0%,rgba(18,15,13,0.58) 100%)"></div>
          <div style="position:absolute;inset:0;padding:22px 20px;display:flex;flex-direction:column;justify-content:flex-end">
            <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.saffron};margin-bottom:6px">✦ SALOFY FLASH</div>
            <div style="font-family:var(--font-heading);font-size:32px;font-weight:700;color:#fff;line-height:1;letter-spacing:-0.02em">30% OFF</div>
            <div style="font-family:var(--font-heading);font-size:16px;font-weight:500;color:rgba(255,255,255,0.88);margin-bottom:5px">Your first salon visit</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:16px">Limited time — book today</div>
            <div>
              <div data-nav="deals" style="display:inline-flex;align-items:center;gap:5px;background:#fff;border-radius:999px;padding:9px 20px;font-size:13px;font-weight:700;color:${C.primary};cursor:pointer">Book now ${Icons.forward(12, C.primary)}</div>
            </div>
          </div>
        </div>
      </div>
    `}

    <!-- Greeting line -->
    <div style="padding:0 16px 16px">
      <span style="font-size:13px;color:${C.text3}">${greeting}, <span style="font-weight:600;color:${C.ink800}">${userName}</span> 👋 &mdash; ${tagline}</span>
    </div>

    <!-- ─── §4. Round photo category rail ─── -->
    <div style="padding:0 0 18px">
      <div style="font-size:10px;font-weight:700;color:${C.text3};letter-spacing:0.08em;text-transform:uppercase;padding:0 16px;margin-bottom:12px">Browse by service</div>
      <div style="display:flex;gap:16px;padding:0 16px;overflow-x:auto" class="hide-sb">
        <!-- All tile -->
        <div data-nav="search" style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0;cursor:pointer">
          <div style="width:64px;height:64px;border-radius:50%;background:${C.primaryS};display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);border:1.5px solid rgba(244,63,94,0.2)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${C.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <span style="font-size:11px;color:${C.ink700};font-weight:600;text-align:center">All</span>
        </div>
        ${popularSvcs.map(s => `
          <div data-nav="search" onclick="AppState.selectedServices=['${s.id}']" style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0;cursor:pointer">
            <div style="width:64px;height:64px;border-radius:50%;overflow:hidden;box-shadow:var(--shadow-sm)">
              <img src="${s.photo}" alt="${s.label}" loading="lazy" width="64" height="64" style="width:100%;height:100%;object-fit:cover;display:block">
            </div>
            <span style="font-size:11px;color:${C.ink700};font-weight:600;text-align:center;white-space:nowrap">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ─── §5. Filter chip row ─── -->
    <div style="padding:0 16px 20px;display:flex;gap:8px;overflow-x:auto" class="hide-sb">
      <div data-nav="search" style="display:inline-flex;align-items:center;gap:5px;background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;box-shadow:var(--shadow-sm);cursor:pointer;flex-shrink:0">
        <span style="font-size:12px;color:${C.ink700};font-weight:600">⇅ Filters</span>
      </div>
      <div data-nav="search" style="display:inline-flex;align-items:center;gap:5px;background:${C.primaryS};border:1px solid rgba(244,63,94,0.25);border-radius:999px;padding:7px 14px;box-shadow:var(--shadow-sm);cursor:pointer;flex-shrink:0">
        <span style="font-size:12px;color:${C.primary};font-weight:700">⚡ Open now</span>
      </div>
      <div data-nav="search" style="display:inline-flex;align-items:center;gap:5px;background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;box-shadow:var(--shadow-sm);cursor:pointer;flex-shrink:0">
        <span style="font-size:12px;color:${C.ink700};font-weight:600">Under ₹500</span>
      </div>
      <div data-nav="search" style="display:inline-flex;align-items:center;gap:5px;background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;box-shadow:var(--shadow-sm);cursor:pointer;flex-shrink:0">
        <span style="font-size:12px;color:${C.ink700};font-weight:600">Near me</span>
      </div>
    </div>

    <!-- ─── §6. RECOMMENDED WITH DEALS — 2-column grid ─── -->
    ${dealSalons.length > 0 ? `
      <div style="padding:0 16px 24px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">
          <div style="font-size:10px;font-weight:700;color:${C.text3};letter-spacing:0.08em;text-transform:uppercase">Recommended with deals</div>
          <span data-nav="deals" style="font-size:12px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${dealSalons.map(s => `
            <div data-goto-salon="${s.id}" style="cursor:pointer;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS}">
              <div style="position:relative;padding-top:100%">
                ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : `<div style="position:absolute;inset:0;background:${C.surface2}"></div>`}
                <!-- Deal badge top-left -->
                <div style="position:absolute;top:8px;left:8px;background:rgba(18,15,13,0.82);border-radius:7px;padding:3px 7px;backdrop-filter:blur(4px)">
                  <span style="font-size:10px;font-weight:700;color:#fff">${s.flash ? '50% OFF' : s.deal}</span>
                </div>
                <!-- Rating pill bottom-left -->
                <div style="position:absolute;bottom:8px;left:8px;background:rgba(18,15,13,0.72);border-radius:7px;padding:3px 7px;display:flex;align-items:center;gap:3px;backdrop-filter:blur(4px)">
                  <span style="font-size:10px;color:${C.saffron}">★</span>
                  <span style="font-size:10px;font-weight:700;color:#fff">${s.rating}</span>
                </div>
              </div>
              <div style="padding:9px 10px 11px">
                <div style="font-size:13px;font-weight:600;color:${C.ink900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
                <div style="font-size:11px;color:${C.text3};margin-top:3px;display:flex;align-items:center;gap:3px">${Icons.mapPin(9, C.text3)} ${s.dist} · Open</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- ─── §7. Book again rail ─── -->
    ${rebookSalons.length > 0 ? `
      <div style="padding:0 16px 24px">
        <div style="font-size:14px;font-weight:700;color:${C.ink800};margin-bottom:12px">Book again <span style="color:${C.primary}">→</span></div>
        <div style="display:flex;gap:14px;overflow-x:auto" class="hide-sb">
          ${rebookSalons.map(s => `
            <div data-goto-salon="${s.id}" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0">
              <div style="width:58px;height:58px;border-radius:16px;overflow:hidden;border:2px solid ${C.borderS};box-shadow:var(--shadow-sm)">
                ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">` : `<div style="width:100%;height:100%;background:${C.surface2};display:flex;align-items:center;justify-content:center">${Icons.scissors(20, C.text3)}</div>`}
              </div>
              <span style="font-size:10px;color:${C.ink700};font-weight:500;text-align:center;max-width:64px;line-height:1.2">${s.name.split(' ').slice(0,2).join(' ')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- ─── §8. Wedding Season Ready — editorial card ─── -->
    <div style="padding:0 16px 24px">
      <div style="background:${C.primaryS};border:1px solid rgba(244,63,94,0.18);border-radius:18px;padding:18px 16px;display:flex;align-items:center;gap:14px;overflow:hidden">
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${C.primary};margin-bottom:7px">Occasion</div>
          <div style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:${C.ink900};letter-spacing:-0.01em;line-height:1.1;margin-bottom:5px">Wedding Season<br>Ready</div>
          <div style="font-size:12px;color:${C.text2};margin-bottom:12px">Bridal packages from ₹4,999</div>
          <div data-nav="search" onclick="AppState.selectedServices=['bridal']" style="display:inline-flex;align-items:center;gap:4px;background:${C.primary};color:#fff;font-size:11px;font-weight:700;padding:7px 14px;border-radius:999px;cursor:pointer">Browse bridal ${Icons.forward(10, '#fff')}</div>
        </div>
        <div style="width:88px;height:88px;border-radius:14px;overflow:hidden;flex-shrink:0;border:2px solid rgba(244,63,94,0.2)">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop&crop=faces,center" alt="Bridal" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>
    </div>

    <!-- ─── §9. Top rated near you ─── -->
    <div style="padding:0 16px 8px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:16px;font-weight:700;color:${C.ink900}">Top rated near you</span>
      <span data-nav="search" style="font-size:12px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
    </div>
    <div style="padding:8px 16px 24px;display:flex;flex-direction:column;gap:14px">
      ${topRated.map(s => `
        <div data-goto-salon="${s.id}">
          ${SalonResultCard(s, [], AppState.favorites.has(s.id))}
        </div>
      `).join('')}
    </div>

    <!-- ─── §10. Trending in [Area] — 2-col compact grid ─── -->
    <div style="padding:0 16px 24px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">
        <div>
          <div style="font-size:10px;font-weight:700;color:${C.text3};letter-spacing:0.08em;text-transform:uppercase">Trending in</div>
          <span style="font-size:16px;font-weight:700;color:${C.ink900}">Sector 17</span>
        </div>
        <span data-nav="search" style="font-size:12px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${trendingSalons.map((s, i) => i < 2 ? `
          <div data-goto-salon="${s.id}" style="cursor:pointer;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS}">
            <div style="position:relative;padding-top:100%">
              ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : `<div style="position:absolute;inset:0;background:${C.surface2}"></div>`}
              <div style="position:absolute;bottom:8px;left:8px;background:rgba(18,15,13,0.78);border-radius:7px;padding:3px 7px;display:inline-flex;align-items:center;gap:3px;backdrop-filter:blur(4px)">
                <span style="font-size:9px">🔥</span>
                <span style="font-size:9px;font-weight:700;color:#fff">${s.reviews} booked</span>
              </div>
            </div>
            <div style="padding:9px 10px 11px">
              <div style="font-size:13px;font-weight:600;color:${C.ink900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
              <div style="font-size:11px;color:${C.text3};margin-top:3px">★ ${s.rating} · ${s.dist}</div>
            </div>
          </div>
        ` : i === 2 ? `
          <div data-goto-salon="${s.id}" style="grid-column:1/-1;cursor:pointer;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS};display:flex;align-items:center;gap:12px;padding:12px">
            <div style="width:68px;height:68px;border-radius:12px;overflow:hidden;flex-shrink:0">
              ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">` : `<div style="width:100%;height:100%;background:${C.surface2}"></div>`}
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600;color:${C.ink900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
              <div style="font-size:11px;color:${C.text3};margin-top:3px">★ ${s.rating} · ${s.dist}</div>
              <div style="display:inline-flex;align-items:center;gap:3px;margin-top:6px;background:${C.primaryS};border-radius:7px;padding:3px 8px">
                <span style="font-size:10px">🔥</span>
                <span style="font-size:10px;font-weight:700;color:${C.primary}">${s.reviews} booked today</span>
              </div>
            </div>
            ${Icons.forward(14, C.text3)}
          </div>
        ` : '').join('')}
      </div>
    </div>

    <!-- ─── §11. Flash sale banner #1 — saffron strip ─── -->
    ${flashSalon ? `
      <div style="padding:0 16px 24px">
        <div data-nav="deals" style="background:var(--grad-saffron);border-radius:16px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;box-shadow:0 4px 16px rgba(245,158,11,0.28)">
          <div style="flex:1;min-width:0">
            <div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:rgba(18,15,13,0.55);margin-bottom:4px">Flash sale</div>
            <div style="font-size:15px;font-weight:700;color:${C.ink900};line-height:1.25">⚡ ${flashSalon.flash.title}</div>
            <div style="font-size:12px;color:${C.ink700};margin-top:3px">Ends in ${flashSalon.flash.hrs}h ${flashSalon.flash.min}m &bull; ${flashSalon.name}</div>
          </div>
          <div style="background:rgba(18,15,13,0.12);border-radius:10px;padding:8px 12px;flex-shrink:0">
            <div style="font-size:11px;font-weight:700;color:${C.ink900}">Book now →</div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- ─── §12. Because you booked / Popular in area — horizontal rail ─── -->
    ${personalSalons.length > 0 ? `
      <div style="padding:0 0 24px">
        <div style="padding:0 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-size:15px;font-weight:700;color:${C.ink900}">${personalHeader}</span>
          <span data-nav="search" style="font-size:12px;color:${C.primary};font-weight:600;cursor:pointer">See all</span>
        </div>
        <div style="display:flex;gap:12px;padding:0 16px;overflow-x:auto" class="hide-sb">
          ${personalSalons.map(s => `
            <div data-goto-salon="${s.id}" style="min-width:172px;flex-shrink:0;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS};cursor:pointer">
              <div style="position:relative;height:108px">
                ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">` : `<div style="width:100%;height:100%;background:${C.surface2}"></div>`}
                ${s.deal ? `<div style="position:absolute;top:8px;left:8px;background:rgba(18,15,13,0.8);border-radius:6px;padding:2px 7px"><span style="font-size:9px;font-weight:700;color:#fff">${s.deal}</span></div>` : ''}
              </div>
              <div style="padding:9px 10px 11px">
                <div style="font-size:13px;font-weight:600;color:${C.ink900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
                <div style="font-size:11px;color:${C.text3};margin-top:3px">★ ${s.rating} · ${s.dist}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- ─── §13. Salon Stories — editorial card ─── -->
    ${storyStylist ? `
      <div style="padding:0 16px 24px">
        <div style="position:relative;height:140px;border-radius:18px;overflow:hidden;background:${C.ink900}">
          <img src="${storySalon.cover}" alt="${storySalon.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0.38">
          <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(18,15,13,0.94) 40%,rgba(18,15,13,0.25) 100%);padding:18px 20px;display:flex;flex-direction:column;justify-content:center">
            <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${C.saffron};margin-bottom:6px">Meet the stylist</div>
            <div style="font-family:var(--font-heading);font-size:19px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:4px">${storyStylist.n}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:12px">${storyStylist.r} &bull; ${storySalon.name}</div>
            <div style="display:inline-flex;align-items:center;gap:4px;cursor:pointer">
              <span style="font-size:11px;font-weight:700;color:#fff">Read story</span>
              ${Icons.forward(10, '#fff')}
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- ─── §14. Try something new — round-icon carousel ─── -->
    <div style="padding:0 0 24px">
      <div style="padding:0 16px;font-size:15px;font-weight:700;color:${C.ink900};margin-bottom:12px">Try something new</div>
      <div style="display:flex;gap:16px;padding:0 16px;overflow-x:auto" class="hide-sb">
        ${[
          { label: 'Keratin',     id: 'color',   photo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=120&h=120&fit=crop&crop=center' },
          { label: 'Hydrafacial', id: 'facial',  photo: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=120&h=120&fit=crop&crop=center' },
          { label: 'Nail Art',    id: 'manicure',photo: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=120&h=120&fit=crop&crop=center' },
          { label: 'Hair Spa',    id: 'spa',     photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&h=120&fit=crop&crop=center' },
          { label: 'Beard Color', id: 'beard',   photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=120&h=120&fit=crop&crop=center' },
          { label: 'Bridal',      id: 'bridal',  photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=120&h=120&fit=crop&crop=center' },
        ].map(sv => `
          <div data-nav="search" onclick="AppState.selectedServices=['${sv.id}']" style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0;cursor:pointer">
            <div style="width:64px;height:64px;border-radius:50%;overflow:hidden;box-shadow:var(--shadow-sm)">
              <img src="${sv.photo}" alt="${sv.label}" loading="lazy" width="64" height="64" style="width:100%;height:100%;object-fit:cover;display:block">
            </div>
            <span style="font-size:11px;color:${C.ink700};font-weight:600;text-align:center;white-space:nowrap">${sv.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ─── §15. Under ₹499 — value-grid block ─── -->
    ${budgetSalons.length > 0 ? `
      <div style="padding:0 16px 24px">
        <div style="margin-bottom:14px">
          <div style="font-size:10px;font-weight:700;color:${C.text3};letter-spacing:0.08em;text-transform:uppercase">Budget picks</div>
          <div style="font-size:16px;font-weight:700;color:${C.ink900}">Great cuts under ₹499</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${budgetSalons.slice(0, 4).map(s => {
            const minPrice = Math.min(...Object.values(s.services));
            return `
            <div data-goto-salon="${s.id}" style="cursor:pointer;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);border:1px solid ${C.borderS}">
              <div style="position:relative;padding-top:100%">
                ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : `<div style="position:absolute;inset:0;background:${C.surface2}"></div>`}
                <div style="position:absolute;top:8px;left:8px;background:${C.saffron};border-radius:7px;padding:3px 7px">
                  <span style="font-size:10px;font-weight:800;color:#fff">from ₹${minPrice}</span>
                </div>
              </div>
              <div style="padding:9px 10px 11px">
                <div style="font-size:13px;font-weight:600;color:${C.ink900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
                <div style="font-size:11px;color:${C.text3};margin-top:3px">★ ${s.rating} · ${s.dist}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- ─── §16. Time-of-day contextual banner ─── -->
    <div style="padding:0 16px 24px">
      <div data-nav="search" style="background:${C.primaryS};border:1px solid rgba(244,63,94,0.18);border-radius:16px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer">
        <div style="flex:1;min-width:0">
          <div style="font-size:15px;font-weight:700;color:${C.ink900};margin-bottom:3px">${todayMsg}</div>
          <div style="font-size:12px;color:${C.text2}">${todaySub}</div>
        </div>
        <div style="width:38px;height:38px;border-radius:50%;background:${C.primary};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:var(--shadow-rose)">
          ${Icons.forward(14, '#fff')}
        </div>
      </div>
    </div>

    <!-- ─── §17. All salons near you — directory anchor + sort tabs ─── -->
    <div style="margin:0 16px;height:1px;background:${C.border}"></div>
    <div style="padding:20px 16px 12px">
      <div style="font-size:16px;font-weight:700;color:${C.ink900};margin-bottom:12px">All salons near you</div>
      <div style="display:flex;gap:7px;overflow-x:auto" class="hide-sb">
        <div data-nav="search" style="background:${C.primary};border-radius:999px;padding:7px 14px;cursor:pointer;flex-shrink:0">
          <span style="font-size:12px;font-weight:700;color:#fff">📍 Near me</span>
        </div>
        <div data-nav="search" style="background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;cursor:pointer;flex-shrink:0;box-shadow:var(--shadow-sm)">
          <span style="font-size:12px;font-weight:600;color:${C.ink700}">★ Top rated</span>
        </div>
        <div data-nav="search" style="background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;cursor:pointer;flex-shrink:0;box-shadow:var(--shadow-sm)">
          <span style="font-size:12px;font-weight:600;color:${C.ink700}">₹ Price ↑</span>
        </div>
        <div data-nav="search" style="background:#fff;border:1px solid ${C.borderS};border-radius:999px;padding:7px 14px;cursor:pointer;flex-shrink:0;box-shadow:var(--shadow-sm)">
          <span style="font-size:12px;font-weight:600;color:${C.ink700}">🟢 Open now</span>
        </div>
      </div>
    </div>
    <div style="padding:0 16px;display:flex;flex-direction:column;gap:14px">
      ${directorySalons.map(s => `
        <div data-goto-salon="${s.id}">
          ${SalonResultCard(s, [], AppState.favorites.has(s.id))}
        </div>
      `).join('')}
    </div>
    <div data-nav="search" style="margin:18px 16px 0;padding:14px;background:#fff;border:1px solid ${C.borderS};border-radius:14px;text-align:center;cursor:pointer;box-shadow:var(--shadow-sm)">
      <span style="font-size:13px;font-weight:700;color:${C.primary}">Continue browsing all salons →</span>
    </div>

    <!-- ─── §18. How Salofy works — new users only, bottom of feed ─── -->
    ${isNewUser ? `
      <div id="htw-card" style="margin:18px 16px 0;background:${C.primaryS};border-radius:16px;border:1px solid rgba(244,63,94,0.18);padding:14px 16px">
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

    <div style="height:28px"></div>
  `, { activeTab: 'home' });
}
