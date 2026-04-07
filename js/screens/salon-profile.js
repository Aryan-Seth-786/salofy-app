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
    ? 'linear-gradient(135deg, #3a2058, #1e3a4f)'
    : `linear-gradient(135deg, ${C.surface2}, ${C.surface3})`;
  const heroColor = isPremium ? 'rgba(255,255,255,0.35)' : C.text3;
  const backColor = isPremium ? '#fff' : C.text;

  const svcTotal = selSvcs.filter(sid => s.services[sid]).reduce((a, sid) => a + s.services[sid], 0);
  const pkgTotal = selPkgs.reduce((a, pkgId) => { const p = (s.packages||[]).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
  const subtotal = svcTotal + pkgTotal;
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (!isStarter && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  const totalItems = selSvcs.length + selPkgs.length;
  const isFav    = AppState.favorites.has(s.id);

  /* ── Tab Panels ── */

  // SERVICES panel
  const servicesPanel = `
    <div class="tab-panel" data-panel="Services" style="${activeTab === 'Services' ? '' : 'display:none'}">
      <div style="padding:0 20px 4px">
        ${isStarter ? '' : `<div style="font-size:11px;color:${C.text3};margin-bottom:10px">Tap a service to select it for booking</div>`}
        ${Object.entries(s.services).map(([k, v], i, arr) => {
          const svc = getSvc(k);
          if (!svc) return '';
          const sel = selSvcs.includes(k);
          return `
            <div class="service-select${sel ? ' service-select--active' : ''}" data-svc-toggle="${k}">
              <div style="display:flex;align-items:center;gap:10px">
                <div class="svc-chk service-select__check" style="background:${sel ? C.primary : 'transparent'};border-color:${sel ? C.primary : C.border}">
                  ${sel ? Icons.check(14, '#fff') : ''}
                </div>
                <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:${sel ? C.primaryS : C.surface2};border-radius:9px">
                  ${svcIcon(svc.icon, 18, sel ? C.primary : C.text2)}
                </div>
                <div>
                  <div style="font-size:13px;font-weight:500;color:${C.text}">${svc.label}</div>
                  <div style="font-size:11px;color:${C.text3}">${svc.time}</div>
                </div>
              </div>
              <div style="font-size:14px;font-weight:600;color:${C.primary}">\u20B9${v}</div>
            </div>`;
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
          return `
            <div class="pkg-card${sel ? ' pkg-card--active' : ''}" data-pkg-toggle="${pkg.id}">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
                <div style="flex:1">
                  <div style="font-size:14px;font-weight:600;color:${C.text}">${pkg.name}</div>
                  <div style="font-size:11px;color:${C.text3};margin-top:2px">${pkg.desc}</div>
                </div>
                <div class="pkg-card__check" style="width:22px;height:22px;border-radius:6px;border:2px solid ${sel ? C.primary : C.border};background:${sel ? C.primary : 'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                  ${sel ? Icons.check(13, '#fff') : ''}
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
                ${pkg.services.map(sid => { const svc = getSvc(sid); return svc ? `<span style="font-size:10px;padding:3px 8px;background:${sel ? C.primaryS : C.surface2};border:1px solid ${sel ? C.primary+'44' : C.border};border-radius:10px;color:${sel ? C.primary : C.text2}">${svc.label}</span>` : ''; }).join('')}
                <span style="font-size:10px;padding:3px 8px;background:${C.surface2};border:1px solid ${C.border};border-radius:10px;color:${C.text3}">${pkg.duration}</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <div>
                  <span style="font-size:17px;font-weight:700;color:${C.primary}">\u20B9${pkg.price}</span>
                  <span style="font-size:11px;color:${C.success};font-weight:500;margin-left:6px">Save \u20B9${pkg.savings}</span>
                </div>
                <div style="font-size:10px;color:${C.text3}">vs \u20B9${pkg.price + pkg.savings} separately</div>
              </div>
            </div>`;
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
              <div style="width:56px;height:56px;border-radius:50%;background:${C.surface3};margin:0 auto 8px;display:flex;align-items:center;justify-content:center;border:${isPremium ? `2px solid ${C.primaryL}` : `1px solid ${C.border}`}">
                ${Icons.person(26, C.text3)}
              </div>
              <div style="font-size:12px;font-weight:600;color:${C.text}">${st.n}</div>
              <div style="font-size:10px;color:${C.text3};margin-top:2px">${st.r}</div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px">
          <div style="font-size:13px;font-weight:600;color:${C.text};margin-bottom:10px">Prefer a specific stylist?</div>
          <div style="background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:10px;padding:12px;font-size:12px;color:${C.text2}">
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
            <div style="display:flex;gap:2px;justify-content:center;margin:4px 0">${Array(5).fill(0).map((_,i) => Icons.starFilled(12, i < Math.round(s.rating) ? C.primaryL : C.border)).join('')}</div>
            <div style="font-size:11px;color:${C.text3}">${s.reviews} reviews</div>
          </div>
          <div style="flex:1">
            ${[5,4,3,2,1].map(star => {
              const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
              return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                <span style="font-size:10px;color:${C.text3};width:8px">${star}</span>
                ${Icons.starFilled(9, C.primaryL)}
                <div style="flex:1;height:5px;background:${C.surface3};border-radius:3px">
                  <div style="width:${pct}%;height:100%;background:${C.primaryL};border-radius:3px"></div>
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
          ${Array.from({ length: Math.min(s.photos, 6) }).map((_, i) => `
            <div style="height:${i === 0 ? '160' : '100'}px;${i === 0 ? 'grid-column:span 2;' : ''}background:linear-gradient(135deg,${C.surface2},${C.surface3});border-radius:10px;border:1px solid ${C.borderS};display:flex;align-items:center;justify-content:center;position:relative">
              ${Icons.camera(i === 0 ? 32 : 22, C.text3)}
              ${i === 0 ? `<div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:8px">Salon Interior</div>` : ''}
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
              <div style="min-width:200px;height:120px;flex-shrink:0;background:linear-gradient(135deg,#2a2040,#1e3a4f);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative">
                <div style="width:40px;height:40px;background:rgba(184,134,11,0.8);border-radius:50%;display:flex;align-items:center;justify-content:center">${Icons.play(16, '#fff')}</div>
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
    <!-- Hero -->
    <div style="height:200px;background:${heroGrad};position:relative;display:flex;align-items:center;justify-content:center">
      <div style="opacity:0.3">${Icons.scissors(42, heroColor)}</div>
      <!-- Back -->
      <div data-nav="back" style="position:absolute;top:48px;left:12px;width:34px;height:34px;background:rgba(255,255,255,${isPremium ? '0.18' : '0.6'});backdrop-filter:blur(8px);border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,255,255,0.2)">
        ${Icons.back(18, backColor)}
      </div>
      <!-- Badges -->
      <div style="position:absolute;top:48px;right:12px;display:flex;flex-direction:column;gap:4px;align-items:flex-end">
        ${isPremium ? TopBadge() : ''}
        ${(isGrowth || isPremium) ? VerifiedBadge() : ''}
      </div>
      <div style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.5);color:#fff;font-size:11px;padding:3px 10px;border-radius:12px">1/${s.photos} photos</div>
    </div>

    <!-- Info -->
    <div style="padding:16px 20px 8px">
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:20px;font-weight:700;color:${C.text}">${s.name}</span>
        ${isPremium ? TopDot() : ''}${(isGrowth || isPremium) ? VerifiedDot() : ''}
      </div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px;display:flex;align-items:center;gap:6px">
        ${Icons.mapPin(12, C.text3)} ${s.loc} &bull;
        ${Icons.clock(12, C.text3)} ${s.hours}
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
        ${StarRow(s.rating)}
        <span style="font-size:13px;color:${C.text3}">${s.reviews} reviews</span>
        <span style="font-size:11px;color:${C.text3}">&bull; ${s.dist}</span>
      </div>
    </div>

    <!-- Action buttons -->
    <div style="display:flex;gap:10px;padding:8px 20px 12px">
      <button data-action="book-now" style="flex:1;padding:12px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">
        ${selSvcs.length > 0 ? `Book ${selSvcs.length} Service${selSvcs.length > 1 ? 's' : ''}` : 'Book Now'}
      </button>
      <button class="btn btn--ghost" onclick="navigator.clipboard && navigator.clipboard.writeText('${s.name}')">
        ${Icons.phone(18, C.text2)}
      </button>
      <button class="btn btn--ghost">
        ${Icons.mapPin(18, C.text2)}
      </button>
      <button class="fav-btn btn btn--ghost" data-fav="${s.id}" style="${isFav ? `background:${C.errorS};border-color:rgba(192,57,43,0.3)` : ''}">
        ${Icons.heart(18, isFav ? C.error : C.text2, isFav)}
      </button>
    </div>

    <div style="padding:0 20px 10px">${PayAtSalon()}</div>

    <!-- Deal banner -->
    ${s.deal && !isStarter ? `
      <div style="margin:0 20px 10px;background:${C.successS};border:1px solid rgba(45,139,85,0.3);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px">
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
