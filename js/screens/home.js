function renderHome() {
  const popularSvcs = [
    { id: 'haircut', icon: 'scissors', label: 'Haircut' },
    { id: 'facial',  icon: 'sparkle',  label: 'Facial'  },
    { id: 'color',   icon: 'palette',  label: 'Color'   },
    { id: 'beard',   icon: 'beard',    label: 'Beard'   },
    { id: 'spa',     icon: 'spa',      label: 'Spa'     },
    { id: 'bridal',  icon: 'crown',    label: 'Bridal'  },
    { id: 'waxing',  icon: 'flower',   label: 'Waxing'  },
    { id: 'manicure',icon: 'nails',    label: 'Nails'   },
  ];

  const trending = [
    { t: 'Bridal Season',   sub: '12 salons with bridal packages', icon: 'crown',   svcId: 'bridal'  },
    { t: 'Beard Grooming',  sub: '8 salons \u2022 Starting \u20B999', icon: 'beard', svcId: 'beard'  },
    { t: 'Summer Facials',  sub: 'Trending near you',              icon: 'sparkle', svcId: 'facial'  },
  ];

  return Shell(`
    <!-- Header -->
    <div style="padding:44px 20px 14px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-family:var(--font-heading);font-size:22px;font-weight:700;color:${C.primary}">Salofy</div>
        <div style="font-size:12px;color:${C.text3};margin-top:2px">Hey Aryan, find your next salon</div>
      </div>
      <div data-nav="notifications" style="position:relative;cursor:pointer;width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid ${C.border}">
        ${Icons.bell(22, C.text2)}
        <div style="position:absolute;top:6px;right:6px;width:8px;height:8px;background:${C.error};border-radius:50%;border:2px solid ${C.surface}"></div>
      </div>
    </div>

    <!-- Search Bar (tap to open search) -->
    <div data-nav="search" style="margin:0 20px 4px;background:${C.surface2};border-radius:12px;padding:13px 16px;display:flex;align-items:center;gap:10px;color:${C.text3};font-size:13px;border:1px solid ${C.border};cursor:pointer">
      ${Icons.search(16, C.text3)} Search salons, services, areas...
    </div>

    <!-- Popular Services -->
    <div style="padding:12px 0 4px">
      <div style="padding:0 20px;font-size:15px;font-weight:600;color:${C.text};margin-bottom:12px">Popular Services</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 20px">
        ${popularSvcs.map(s => `
          <div data-nav="search" onclick="AppState.selectedServices=['${s.id}']" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};cursor:pointer">
            <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:${C.primaryS};border-radius:10px">
              ${svcIcon(s.icon, 20, C.primary)}
            </div>
            <span style="font-size:11px;color:${C.text2};font-weight:500">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Top Salons Carousel -->
    <div style="padding:16px 0 8px">
      ${SectionHeader('Top Salons', true, Icons.starFilled(14, C.primaryL) + ' ')}
      <div style="display:flex;gap:12px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${salons.filter(s => s.tier === 'premium').map(s => `
          <div data-goto-salon="${s.id}" style="min-width:250px;height:130px;border-radius:12px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#2a2040,#1e3a4f)">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 30%,transparent 70%);padding:14px;display:flex;flex-direction:column;justify-content:flex-end">
              <div style="display:flex;gap:6px;margin-bottom:6px">${TopBadge()}${s.deal ? DealTag(s.deal) : ''}</div>
              <div style="font-size:14px;font-weight:600;color:#fff">${s.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${s.loc}</div>
            </div>
          </div>
        `).join('')}
        ${salons.filter(s => s.tier === 'growth').slice(0,1).map(s => `
          <div data-goto-salon="${s.id}" style="min-width:250px;height:130px;border-radius:12px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#1a2d3e,#2d1a3e)">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 30%,transparent 70%);padding:14px;display:flex;flex-direction:column;justify-content:flex-end">
              <div style="display:flex;gap:6px;margin-bottom:6px">${VerifiedBadge()}</div>
              <div style="font-size:14px;font-weight:600;color:#fff">${s.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${s.loc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Flash Deal -->
    <div style="padding:8px 20px" data-action="open-deals" style="cursor:pointer">
      ${FlashDealCard('50% Off All Facials', 'Today Only', 'Luxe Hair Studio \u2022 Sector 17', '02', '34', '11')}
    </div>

    <!-- Trending -->
    <div style="padding:12px 0 4px">
      ${SectionHeader('Trending This Week', false, Icons.fire(14, C.error) + ' ')}
      <div style="display:flex;gap:10px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${trending.map(c => `
          <div data-nav="search" onclick="AppState.selectedServices=['${c.svcId}']" style="min-width:160px;padding:14px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};flex-shrink:0;cursor:pointer">
            <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:${C.primaryS};border-radius:10px;margin-bottom:8px">
              ${svcIcon(c.icon, 22, C.primary)}
            </div>
            <div style="font-size:13px;font-weight:600;color:${C.text}">${c.t}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:2px">${c.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Near You -->
    <div style="padding:16px 20px 4px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:15px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:6px">${Icons.mapPin(14, C.primary)} Near You</span>
      <span data-nav="search" style="font-size:12px;color:${C.primary};font-weight:500;cursor:pointer">See all</span>
    </div>
    <div style="padding:4px 20px;display:flex;flex-direction:column;gap:12px">
      ${salons.slice(0, 3).map(s => `
        <div data-goto-salon="${s.id}">
          ${SalonResultCard(s, [], AppState.favorites.has(s.id))}
        </div>
      `).join('')}
    </div>

    <!-- Recently Viewed -->
    <div style="padding:16px 0 4px">
      ${SectionHeader('Recently Viewed', false, Icons.clock(14, C.text3) + ' ')}
      <div style="display:flex;gap:10px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${salons.slice(0, 3).map(s => `
          <div data-goto-salon="${s.id}" style="min-width:140px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};overflow:hidden;flex-shrink:0;cursor:pointer">
            <div style="height:60px;background:${C.surface2};display:flex;align-items:center;justify-content:center">${Icons.scissors(22, C.text3)}</div>
            <div style="padding:8px 10px">
              <div style="font-size:12px;font-weight:600;color:${C.text}">${s.name}</div>
              <div style="font-size:10px;color:${C.text3}">${s.dist}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- How It Works -->
    <div style="padding:16px 20px 8px">
      <div style="font-size:15px;font-weight:600;color:${C.text};margin-bottom:12px">How Salofy Works</div>
      ${[
        { n:'1', t:'Choose Services',  d:'Select what you need \u2014 haircut, facial, combo' },
        { n:'2', t:'Compare & Pick',   d:'See prices across salons, find the best fit' },
        { n:'3', t:'Book & Walk In',   d:'Confirm your slot. Pay at the salon. Done.' },
      ].map(s => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:${C.primaryS};border:1.5px solid rgba(212,160,23,0.25);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${C.primary};flex-shrink:0">${s.n}</div>
          <div>
            <div style="font-size:13px;font-weight:600;color:${C.text}">${s.t}</div>
            <div style="font-size:12px;color:${C.text3};margin-top:2px">${s.d}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'home' });
}
