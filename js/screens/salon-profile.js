function renderSalonProfile() {
  const s = AppState.selectedSalon;
  const isPremium = s.tier === 'premium';
  const isGrowth  = s.tier === 'growth';
  const isStarter = s.tier === 'starter';
  const activeTab = AppState.salonTab || 'Services';
  const selSvcs   = AppState.salonServices || [];
  const selPkgs   = AppState.salonPackages || [];

  const tabs = isStarter
    ? ['Services', 'Packages', 'Reviews', 'Photos']
    : ['Services', 'Packages', 'Staff', 'Reviews', 'Photos', 'Video'];

  const heroGrad  = isPremium
    ? 'var(--grad-rose)'
    : isGrowth
      ? 'linear-gradient(135deg, var(--rose-100), var(--plum-200))'
      : 'linear-gradient(135deg, var(--rose-50), var(--ink-200))';
  const heroColor = (isPremium || isGrowth) ? 'rgba(255,255,255,0.25)' : C.ink400;
  const backColor = (isPremium || isGrowth) ? '#fff' : C.ink900;

  const svcTotal = selSvcs.filter(sid => s.services[sid]).reduce((a, sid) => a + ((s.serviceDiscounts && s.serviceDiscounts[sid]) || s.services[sid]), 0);
  const pkgTotal = selPkgs.reduce((a, pkgId) => { const p = (s.packages||[]).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
  const subtotal = svcTotal + pkgTotal;
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (!isStarter && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  const totalItems = selSvcs.length + selPkgs.length;
  const isFav    = AppState.favorites.has(s.id);

  const pastVisits = bookings.filter(b => b.salonId === s.id && b.status === 'completed');
  const lastVisit  = pastVisits[0];

  /* ── Tab Panels ── */

  // SERVICES panel
  const servicesPanel = `
    <div class="tab-panel" data-panel="Services" style="${activeTab === 'Services' ? '' : 'display:none'}">
      <!-- Suggested packages — re-rendered in-place on service toggle -->
      <div data-suggested-pkgs style="padding:12px 20px 0">
        ${SuggestedPackagesHtml(s, selSvcs)}
      </div>
      <div style="padding:0 20px 4px">
        ${isStarter ? '' : `<div style="font-size:11px;color:${C.text3};margin-bottom:10px">Tap a service to select it for booking</div>`}
        ${Object.entries(s.services).map(([k, v]) => {
          const sel       = selSvcs.includes(k);
          const discPrice = s.serviceDiscounts && s.serviceDiscounts[k];
          return ServiceCard(k, v, sel, discPrice, 'select');
        }).join('')}
      </div>
    </div>`;

  // PACKAGES panel
  const packagesPanel = `
    <div class="tab-panel" data-panel="Packages" style="${activeTab === 'Packages' ? '' : 'display:none'}">
      <div style="padding:0 20px 4px">
        <div style="font-size:11px;color:${C.text3};margin-bottom:12px">Pre-bundled services at a special price</div>
        ${(s.packages || []).map(pkg => {
          const sel = selPkgs.includes(pkg.id);
          return PackageCard(pkg, sel, 'select');
        }).join('')}
      </div>
    </div>`;

  // STAFF panel
  const staffPanel = s.staff.length > 0 ? `
    <div class="tab-panel" data-panel="Staff" style="${activeTab === 'Staff' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:13px;color:${C.text2};margin-bottom:14px">Our professional team</div>
        <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:8px" class="hide-sb">
          ${s.staff.map(st => `
            <div style="min-width:96px;text-align:center;flex-shrink:0;padding:14px 10px;background:${C.surface2};border-radius:12px;border:1px solid ${C.border}">
              <div style="width:56px;height:56px;border-radius:50%;background:${C.surface3};margin:0 auto 8px;display:flex;align-items:center;justify-content:center;border:${isPremium ? `2px solid ${C.saffron}` : `1px solid ${C.border}`}">
                ${Icons.person(26, C.text3)}
              </div>
              <div style="font-size:12px;font-weight:600;color:${C.text}">${st.n}</div>
              <div style="font-size:10px;color:${C.text3};margin-top:2px">${st.r}</div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px">
          <div style="font-size:13px;font-weight:600;color:${C.text};margin-bottom:10px">Prefer a specific stylist?</div>
          <div style="background:${C.primaryS};border:1px solid var(--primary-border);border-radius:10px;padding:12px;font-size:12px;color:${C.text2}">
            You can request your preferred staff member when you book. Just add a note in the booking.
          </div>
        </div>
      </div>
    </div>` : '';

  // REVIEWS panel
  const reviewsPanel = `
    <div class="tab-panel" data-panel="Reviews" style="${activeTab === 'Reviews' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <!-- Rating Summary -->
        <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid ${C.border};margin-bottom:12px">
          <div style="text-align:center">
            <div style="font-size:36px;font-weight:800;color:${C.text}">${s.rating}</div>
            <div style="display:flex;gap:2px;justify-content:center;margin:4px 0">${Array(5).fill(0).map((_,i) => Icons.starFilled(12, i < Math.round(s.rating) ? C.saffron : C.border)).join('')}</div>
            <div style="font-size:11px;color:${C.text3}">${s.reviews} reviews</div>
          </div>
          <div style="flex:1">
            ${[5,4,3,2,1].map(star => {
              const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
              return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                <span style="font-size:10px;color:${C.text3};width:8px">${star}</span>
                ${Icons.starFilled(9, C.saffron)}
                <div style="flex:1;height:5px;background:${C.surface3};border-radius:3px">
                  <div style="width:${pct}%;height:100%;background:${C.saffron};border-radius:3px"></div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
        ${ReviewCard('Ananya R.', 5, 'Amazing experience! The staff is incredibly professional and friendly. My hair colour came out exactly as I wanted.')}
        ${ReviewCard('Sahil M.', 4, 'Great haircut, but had to wait about 15 minutes past my slot. The quality itself is top notch.')}
        ${ReviewCard('Priya K.', 5, 'Love this place! Always my go-to for facials. The environment is very clean and relaxing.')}
        <div style="text-align:center;padding:10px 0 4px">
          <span style="font-size:12px;color:${C.primary};font-weight:500;cursor:pointer">See all ${s.reviews} reviews</span>
        </div>
      </div>
    </div>`;

  // PHOTOS panel
  const photosPanel = `
    <div class="tab-panel" data-panel="Photos" style="${activeTab === 'Photos' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:12px;color:${C.text3};margin-bottom:10px">${s.photos} photos</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${(s.gallery || []).slice(0, 6).map((url, i) => `
            <div style="height:${i === 0 ? '160' : '100'}px;${i === 0 ? 'grid-column:span 2;' : ''}border-radius:10px;overflow:hidden;position:relative">
              <img src="${url}" alt="Salon photo ${i + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;

  // VIDEO panel
  const videoPanel = !isStarter ? `
    <div class="tab-panel" data-panel="Video" style="${activeTab === 'Video' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:12px;color:${C.text3};margin-bottom:10px">Salon reels</div>
        ${isPremium ? `
          <div style="display:flex;gap:10px;overflow-x:auto;margin-bottom:12px" class="hide-sb">
            ${['Salon Tour', 'Hair Color Demo'].map(title => `
              <div style="min-width:200px;height:120px;flex-shrink:0;background:linear-gradient(135deg,${C.ink800},${C.ink900});border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative">
                <div style="width:40px;height:40px;background:var(--saffron-400);border-radius:50%;opacity:0.9;display:flex;align-items:center;justify-content:center">${Icons.play(16, '#fff')}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.7)">${title}</div>
              </div>`).join('')}
          </div>` : `
          <div style="height:180px;background:linear-gradient(135deg,${C.surface2},${C.surface3});border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1px solid ${C.border}">
            <div style="width:48px;height:48px;background:${C.primary};border-radius:50%;display:flex;align-items:center;justify-content:center">${Icons.play(20, '#fff')}</div>
            <div style="font-size:12px;color:${C.text3}">Salon Reel</div>
          </div>`}
      </div>
    </div>` : '';

  return Shell(`
    <!-- Hero cover: 240px tall, warm gradient, protection gradients -->
    <div style="height:240px;background:${heroGrad};position:relative;overflow:hidden">
      ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">` : `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.15">${Icons.scissors(56, heroColor)}</div>`}
      <!-- top protection -->
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(18,15,13,.2) 0%,transparent 35%,transparent 55%,rgba(18,15,13,.55) 100%)"></div>
      <!-- Back button -->
      <div data-nav="back" style="position:absolute;top:48px;left:16px;width:40px;height:40px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow-sm)">
        ${Icons.back(20, C.ink900)}
      </div>
      <!-- Heart / fav button -->
      <button class="fav-btn" data-fav="${s.id}" style="position:absolute;top:48px;right:16px;width:40px;height:40px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-radius:999px;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow-sm)">
        ${Icons.heart(20, isFav ? C.error : C.ink700, isFav)}
      </button>
      <!-- Photo count pill -->
      <div style="position:absolute;bottom:54px;right:16px;background:rgba(18,15,13,.55);color:#fff;font-size:11px;padding:4px 10px;border-radius:999px;backdrop-filter:blur(4px)">1/${s.photos} photos</div>
    </div>

    <!-- Floating info card — lifts over cover -->
    <div style="padding:0 16px;margin-top:-40px;position:relative;z-index:2">
      <div style="background:#fff;border-radius:18px;padding:18px;box-shadow:var(--shadow-md)">
        <!-- Badges row -->
        <div style="display:flex;gap:6px;margin-bottom:10px">
          ${isPremium ? TopBadge() : ''}
          ${(isGrowth || isPremium) ? VerifiedBadge() : ''}
        </div>
        <!-- Name in Fraunces -->
        <div style="font-family:var(--font-heading);font-size:24px;font-weight:600;letter-spacing:-0.02em;color:${C.ink900};line-height:1.15">${s.name}</div>
        <div style="font-size:13px;color:${C.text3};margin-top:4px">${isStarter ? 'Salon' : isPremium ? 'Premium salon' : 'Verified salon'} · ${s.loc}</div>
        <!-- Stat row: rating · distance · hours -->
        <div style="display:flex;align-items:center;gap:0;margin-top:14px;padding-top:14px;border-top:1px solid ${C.borderS}">
          <div style="display:flex;align-items:center;gap:5px;flex:1">
            ${StarRow(s.rating, s.reviews)}
          </div>
          <div style="width:1px;height:14px;background:${C.border};margin:0 10px"></div>
          <div style="display:flex;align-items:center;gap:5px;flex:1">
            ${Icons.mapPin(13, C.ink500)}
            <span style="font-size:13px;color:${C.ink700}">${s.dist}</span>
          </div>
          <div style="width:1px;height:14px;background:${C.border};margin:0 10px"></div>
          <div style="display:flex;align-items:center;gap:5px;flex:1">
            ${Icons.clock(13, C.success)}
            <span style="font-size:12px;color:${C.success};font-weight:600">${s.hours.split(' - ')[1] ? 'Till ' + s.hours.split(' - ')[1] : s.hours}</span>
          </div>
        </div>
        ${lastVisit ? `
        <div style="display:flex;align-items:center;gap:6px;margin-top:10px">
          ${Icons.calendar(11, C.success)}
          <span style="font-size:11px;color:${C.success};font-weight:500">Visited ${pastVisits.length} time${pastVisits.length > 1 ? 's' : ''} · Last: ${lastVisit.date}</span>
          <span onclick="AppState.bookingsTab='Completed';navigate('my-bookings')"
            style="font-size:11px;color:${C.primary};font-weight:600;cursor:pointer;margin-left:2px">History</span>
        </div>` : ''}
      </div>
    </div>

    <!-- Action buttons -->
    <div style="display:flex;gap:10px;padding:14px 16px 8px">
      <button data-action="book-now" style="flex:1;padding:13px;background:${C.primary};color:#fff;border:none;border-radius:14px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;box-shadow:${C.shadowRose};transition:transform 120ms">
        ${selSvcs.length > 0 ? `Book ${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''}` : 'Book now'}
      </button>
      <button class="btn btn--ghost" onclick="navigator.clipboard && navigator.clipboard.writeText('${s.name}')">
        ${Icons.phone(18, C.ink600)}
      </button>
      <button class="btn btn--ghost">
        ${Icons.mapPin(18, C.ink600)}
      </button>
    </div>

    <div style="padding:0 20px 10px">${PayAtSalon()}</div>

    <!-- Deal banner -->
    ${s.deal && !isStarter ? `
      <div style="margin:0 20px 10px;background:${C.successS};border:1px solid var(--success-border);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px">
        ${Icons.gift(16, C.success)}
        <div>
          <div style="font-size:13px;font-weight:600;color:${C.success}">${s.deal}</div>
          <div style="font-size:11px;color:${C.text3}">Applied automatically at checkout</div>
        </div>
      </div>` : ''}

    <!-- Flash deal (premium) -->
    ${s.flash && isPremium ? `
      <div style="padding:0 20px 10px">
        ${FlashDealCard(s.flash.title, s.flash.sub, '', s.flash.hrs, s.flash.min, s.flash.sec)}
      </div>` : ''}

    <!-- Tab bar -->
    <div class="tab-bar" style="margin-bottom:0">
      ${tabs.map(t => `<button class="tab${t === activeTab ? ' tab--active' : ''}" data-panel="${t}">${t}</button>`).join('')}
    </div>

    <!-- Tab panels -->
    ${servicesPanel}
    ${packagesPanel}
    ${staffPanel}
    ${reviewsPanel}
    ${photosPanel}
    ${videoPanel}

    <!-- Global sticky summary bar (services + packages) -->
    <div class="salon-summary-bar" style="display:${totalItems > 0 ? 'flex' : 'none'};position:sticky;bottom:0;left:0;right:0;padding:10px 20px 12px;background:${C.bg};border-top:1px solid ${C.border};align-items:center;justify-content:space-between;gap:12px">
      <div>
        <div style="font-size:11px;color:${C.text3}"><span class="ssb-count">${selSvcs.length > 0 && selPkgs.length > 0 ? `${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''} + ${selPkgs.length} package${selPkgs.length > 1 ? 's' : ''}` : selSvcs.length > 0 ? `${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''}` : `${selPkgs.length} package${selPkgs.length > 1 ? 's' : ''}`}</span> selected</div>
        <div style="font-size:16px;font-weight:700;color:${C.primary}"><span class="ssb-price">\u20B9${subtotal}</span>${discount > 0 ? ` <span style="font-size:11px;color:${C.success};font-weight:500">-\u20B9${discount} off</span>` : ''}</div>
      </div>
      <button data-action="book-now" style="padding:12px 22px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer">Book Now</button>
    </div>
  `, { activeTab: 'search' });
}
