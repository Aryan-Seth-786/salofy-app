/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
   HTML string generators for reusable UI pieces
   ═══════════════════════════════════════════════════ */

function TopBadge() {
  return `<span class="badge badge--top" style="letter-spacing:0.06em">✦ TOP SALON</span>`;
}

function VerifiedBadge() {
  return `<span class="badge badge--verified" style="letter-spacing:0.06em">${Icons.check(8, '#fff')} VERIFIED</span>`;
}

function DealTag(text) {
  return `<span class="badge badge--deal">${text}</span>`;
}

function TopDot() {
  return `<span class="dot-badge dot-badge--top" style="font-size:8px;color:#fff;display:inline-flex;align-items:center;justify-content:center">✦</span>`;
}

function VerifiedDot() {
  return `<span class="dot-badge dot-badge--verified">${Icons.check(8, '#fff')}</span>`;
}

function StarRow(rating, reviews) {
  const reviewsPart = reviews != null
    ? `<span style="color:${C.ink400};font-weight:400"> (${reviews})</span>`
    : '';
  return `<span class="star-row" style="font-variant-numeric:tabular-nums">${rating} <span style="color:${C.saffron}">★</span>${reviewsPart}</span>`;
}

function BookingStatusPill(status) {
  if (status === 'upcoming') {
    return `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--rose-50);color:var(--rose-700);padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;font-family:var(--font-heading);font-style:italic;letter-spacing:-0.01em">✓ Confirmed</span>`;
  }
  if (status === 'completed') {
    return `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--success-50);color:var(--success-600);padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600">✓ Completed</span>`;
  }
  return `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--plum-50);color:var(--plum-600);padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600">Pending</span>`;
}

function PayAtSalon() {
  return `<div class="pay-at-salon">${Icons.shield(14, C.success)} Pay at Salon &mdash; No online payment needed</div>`;
}

function SalonResultCard(s, selectedSvcs = [], isFav = false) {
  const matched = selectedSvcs.filter(sid => s.services[sid]);
  const combo = matched.reduce((a, sid) => a + s.services[sid], 0);
  const dp = s.deal ? parseInt(s.deal) || 0 : 0;
  const disc = dp > 0 ? Math.round(combo * (1 - dp / 100)) : null;

  // Find best package that covers ALL selected services
  const matchingPkg = selectedSvcs.length >= 2
    ? (s.packages || [])
        .filter(pkg => selectedSvcs.every(sid => pkg.services.includes(sid)))
        .sort((a, b) => b.savings - a.savings)[0]
    : null;

  let servicesHtml = '';
  if (selectedSvcs.length > 0 && matched.length > 0) {
    servicesHtml = `
      <div class="salon-card__services">
        ${matched.map(sid => {
          const svc = getSvc(sid);
          return `<span class="service-tag service-tag--matched">${svcIcon(svc.icon, 12, C.text2)} ${svc.label} \u20B9${s.services[sid]}</span>`;
        }).join('')}
        ${selectedSvcs.length > matched.length ? `<span class="service-tag" style="color:${C.error}">+${selectedSvcs.length - matched.length} unavailable</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:14px;font-weight:700;color:${C.primary}">\u20B9${disc || combo}</span>
        ${disc ? `<span style="font-size:12px;color:${C.text3};text-decoration:line-through">\u20B9${combo}</span>` : ''}
        <span style="font-size:10px;color:${C.text3}">for ${matched.length} service${matched.length > 1 ? 's' : ''}</span>
      </div>
      ${matchingPkg ? `
      <div data-goto-package="${s.id}:${matchingPkg.id}" style="display:flex;align-items:center;gap:8px;margin-top:8px;padding:8px 10px;background:${C.successS};border:1px solid rgba(45,139,85,0.25);border-radius:8px;cursor:pointer">
        ${Icons.gift(14, C.success)}
        <div style="flex:1;min-width:0;font-size:12px">
          <span style="font-weight:600;color:${C.success}">${matchingPkg.name}</span>
          <span style="color:${C.text3}"> covers all — </span>
          <span style="font-weight:600;color:${C.success}">Save \u20B9${matchingPkg.savings}</span>
        </div>
        ${Icons.forward(12, C.success)}
      </div>` : ''}`;
  } else {
    const entries = Object.entries(s.services).slice(0, 3);
    servicesHtml = `
      <div class="salon-card__services">
        ${entries.map(([k, v]) => {
          const svc = getSvc(k);
          return `<span class="service-tag">${svc ? svc.label : k} \u20B9${v}</span>`;
        }).join('')}
        <span class="service-tag service-tag--more">+${Math.max(0, Object.keys(s.services).length - 3)} more</span>
      </div>`;
  }

  return `
    <div class="salon-card${s.tier === 'premium' ? ' salon-card--premium' : s.tier === 'growth' ? ' salon-card--growth' : ''}" data-goto-salon="${s.id}" style="cursor:pointer">
      <div class="salon-card__hero">
        ${s.cover ? `<img src="${s.cover}" alt="${s.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(18,15,13,.25) 0%,transparent 60%)"></div>` : `<div class="salon-card__hero-icon">${Icons.scissors(28, C.text3)}</div>`}
        <div class="salon-card__badges">
          ${s.tier === 'premium' ? TopBadge() : ''}
          ${(s.tier === 'growth' || s.tier === 'premium') ? VerifiedBadge() : ''}
        </div>
        ${s.deal ? `<div class="salon-card__deal">${DealTag(s.deal)}</div>` : ''}
        <div class="salon-card__fav">${Icons.heart(16, isFav ? C.error : C.text3, isFav)}</div>
      </div>
      <div class="salon-card__body">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="salon-card__name">
            ${s.name}
            ${s.tier === 'premium' ? TopDot() : ''}
            ${s.tier === 'growth' ? VerifiedDot() : ''}
          </div>
          ${StarRow(s.rating, s.reviews)}
        </div>
        <div class="salon-card__meta">${s.loc} &bull; ${s.dist}</div>
        ${servicesHtml}
        <div style="margin-top:8px">${PayAtSalon()}</div>
      </div>
    </div>`;
}

function StaffCard(st, isPremium) {
  return `
    <div style="min-width:90px;text-align:center;flex-shrink:0">
      <div style="width:60px;height:60px;border-radius:50%;background:${C.surface2};margin:0 auto 6px;display:flex;align-items:center;justify-content:center;border:${isPremium ? `2px solid ${C.primaryL}` : `1px solid ${C.border}`}">
        ${Icons.person(24, C.text3)}
      </div>
      <div style="font-size:12px;font-weight:600;color:${C.text}">${st.n}</div>
      <div style="font-size:10px;color:${C.text3}">${st.r}</div>
    </div>`;
}

function ServiceListItem(svc, price, showBorder) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;${showBorder ? `border-bottom:1px solid ${C.borderS}` : ''}">
      <div>
        <div style="font-size:13px;font-weight:500;color:${C.text};display:flex;align-items:center;gap:6px">${svcIcon(svc.icon, 16, C.text2)} ${svc.label}</div>
        <div style="font-size:11px;color:${C.text3};margin-top:2px">${svc.time}</div>
      </div>
      <div style="font-size:14px;font-weight:700;color:${C.ink900};font-variant-numeric:tabular-nums">\u20B9${price}</div>
    </div>`;
}

function ReviewCard(name, stars, text) {
  return `
    <div style="background:${C.surface2};border-radius:8px;padding:12px;margin-bottom:8px;border:1px solid ${C.borderS}">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;font-weight:600;color:${C.text}">${name}</span>
        <span style="font-size:11px;color:${C.saffron};display:flex;gap:1px">${Array(stars).fill(Icons.starFilled(11, C.saffron)).join('')}${Array(5 - stars).fill(Icons.star(11, C.ink200)).join('')}</span>
      </div>
      <div style="font-size:12px;color:${C.text2};line-height:1.5">${text}</div>
    </div>`;
}

function FlashDealCard(title, sub, salon, hrs, min, sec) {
  return `
    <div class="flash-card">
      <div class="flash-card__label">${Icons.lightning(14, C.error)} FLASH DEAL &mdash; Ends in</div>
      <div class="flash-card__title">${title}</div>
      <div class="flash-card__sub">${salon ? salon + ' &bull; ' : ''}${sub}</div>
      <div class="timer">
        ${[{v:hrs,l:'HRS'},{v:min,l:'MIN'},{v:sec,l:'SEC'}].map(t => `
          <div class="timer__box"><div class="timer__val">${t.v}</div><div class="timer__label">${t.l}</div></div>
        `).join('')}
      </div>
    </div>`;
}

function AreaMap(activeSalonId, filteredSalonIds) {
  const showSalons = filteredSalonIds ? salons.filter(s => filteredSalonIds.includes(s.id)) : salons;
  const vw = 335, vh = 280;

  // Pin color by tier
  function pinColor(s) {
    if (activeSalonId === s.id) return C.primary;
    if (s.tier === 'premium') return C.primary;
    if (s.tier === 'growth') return C.verified;
    return C.text3;
  }

  // Generate salon pin SVG groups
  const pins = showSalons.map(s => {
    const x = s.mapX / 100 * vw;
    const y = s.mapY / 100 * vh;
    const col = pinColor(s);
    const isActive = activeSalonId === s.id;
    const scale = isActive ? 1.3 : 1;
    const name = s.name.length > 14 ? s.name.slice(0, 13) + '…' : s.name;
    return `
      <g data-map-pin="${s.id}" style="cursor:pointer" transform="translate(${x},${y})">
        <circle r="14" fill="transparent" />
        <g transform="scale(${scale}) translate(-8,-18)">
          <path d="M8 0C3.6 0 0 3.6 0 8c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8z" fill="${col}" opacity="${isActive ? 1 : 0.85}"/>
          <circle cx="8" cy="8" r="3" fill="#fff"/>
        </g>
        ${isActive ? `<circle r="3" cy="-8" fill="${col}"><animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>` : ''}
        <text y="8" text-anchor="middle" font-size="8" font-weight="600" fill="${C.text2}" font-family="var(--font-body)">${name}</text>
        <text y="17" text-anchor="middle" font-size="7" fill="${C.text3}" font-family="var(--font-body)">${s.dist}</text>
      </g>`;
  }).join('');

  return `
    <div style="margin:0 16px;border-radius:12px;border:1px solid ${C.border};overflow:hidden;background:${C.surface2};position:relative">
      <svg viewBox="0 0 ${vw} ${vh}" width="100%" style="display:block">
        <!-- Area fills -->
        <path d="M120 15 Q200 5 280 20 Q320 50 310 100 Q295 130 240 140 Q180 145 140 120 Q100 100 90 60 Q95 25 120 15Z" fill="${C.surface}" stroke="${C.border}" stroke-width="1"/>
        <text x="200" y="70" text-anchor="middle" font-size="10" fill="${C.text3}" font-family="var(--font-body)" font-weight="500" opacity="0.7">Chandigarh</text>

        <path d="M30 150 Q80 135 130 145 Q160 160 155 200 Q145 240 100 255 Q55 260 30 240 Q10 215 15 185 Q18 160 30 150Z" fill="${C.surface}" stroke="${C.border}" stroke-width="1"/>
        <text x="85" y="205" text-anchor="middle" font-size="10" fill="${C.text3}" font-family="var(--font-body)" font-weight="500" opacity="0.7">Mohali</text>

        <ellipse cx="270" cy="210" rx="50" ry="40" fill="${C.surface}" stroke="${C.border}" stroke-width="1" opacity="0.6"/>
        <text x="270" y="215" text-anchor="middle" font-size="9" fill="${C.text3}" font-family="var(--font-body)" font-weight="500" opacity="0.5">Kharar</text>

        <!-- Roads -->
        <line x1="50" y1="120" x2="300" y2="90" stroke="${C.border}" stroke-width="1" stroke-dasharray="6 4" opacity="0.6"/>
        <line x1="160" y1="10" x2="140" y2="260" stroke="${C.border}" stroke-width="1" stroke-dasharray="6 4" opacity="0.6"/>
        <line x1="20" y1="180" x2="310" y2="200" stroke="${C.border}" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>

        <!-- "You are here" dot -->
        <circle cx="${vw * 0.45}" cy="${vh * 0.45}" r="4" fill="${C.info}" opacity="0.9">
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${vw * 0.45}" cy="${vh * 0.45}" r="4" fill="${C.info}"/>
        <circle cx="${vw * 0.45}" cy="${vh * 0.45}" r="2" fill="#fff"/>

        <!-- Salon pins -->
        ${pins}
      </svg>
    </div>`;
}

function SuggestedPackagesHtml(s, selSvcs) {
  const pkgs = s.packages || [];
  let suggested, heading, subheading;

  if (selSvcs.length >= 1) {
    // Packages that cover ALL selected services
    suggested = pkgs
      .filter(pkg => selSvcs.every(sid => pkg.services.includes(sid)))
      .sort((a, b) => b.savings - a.savings);
    heading = 'Bundle your selection';
    subheading = 'These packages include everything you picked';
  } else {
    // No services selected — surface top packages by savings
    suggested = [...pkgs].sort((a, b) => b.savings - a.savings).slice(0, 3);
    heading = 'Popular packages here';
    subheading = 'Pre-bundled services at a special price';
  }

  if (suggested.length === 0) return '';

  return `
    <div style="margin-bottom:4px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:5px">
            ${Icons.gift(13, C.success)}
            <span style="font-size:12px;font-weight:700;color:${C.text}">${heading}</span>
          </div>
          <div style="font-size:11px;color:${C.text3};margin-top:1px">${subheading}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${suggested.map(pkg => {
          const matchedSvcs  = selSvcs.filter(sid => pkg.services.includes(sid));
          const bonusSvcs    = pkg.services.filter(sid => !selSvcs.includes(sid));
          const showBonus    = bonusSvcs.slice(0, selSvcs.length >= 1 ? 2 : 3);
          const hiddenCount  = bonusSvcs.length - showBonus.length;
          return `
            <div data-suggest-pkg="${pkg.id}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${C.successS};border:1px solid rgba(45,139,85,0.22);border-radius:10px;cursor:pointer">
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
                  <span style="font-size:13px;font-weight:600;color:${C.text}">${pkg.name}</span>
                  <span style="font-size:10px;font-weight:700;color:${C.success};background:rgba(45,139,85,0.14);padding:2px 6px;border-radius:6px;white-space:nowrap">Save \u20B9${pkg.savings}</span>
                </div>
                <div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">
                  ${matchedSvcs.map(sid => { const svc = getSvc(sid); return svc ? `<span style="font-size:9px;padding:2px 6px;background:rgba(184,134,11,0.12);border:1px solid rgba(184,134,11,0.3);border-radius:6px;color:${C.primary};font-weight:600">${svc.label}</span>` : ''; }).join('')}
                  ${showBonus.map(sid => { const svc = getSvc(sid); return svc ? `<span style="font-size:9px;padding:2px 6px;background:${C.surface};border:1px solid ${C.border};border-radius:6px;color:${C.text2}">${svc.label}</span>` : ''; }).join('')}
                  ${hiddenCount > 0 ? `<span style="font-size:9px;color:${C.text3}">+${hiddenCount} more</span>` : ''}
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div style="font-size:14px;font-weight:700;color:${C.primary}">\u20B9${pkg.price}</div>
                <div style="font-size:10px;color:${C.text3};white-space:nowrap">${pkg.duration}</div>
              </div>
              ${Icons.forward(14, C.success)}
            </div>`;
        }).join('')}
      </div>
      <div style="height:1px;background:${C.border};margin:14px 0 4px"></div>
    </div>`;
}

function ToggleSwitch(on) {
  return `<div class="toggle${on ? ' toggle--on' : ''}"><div class="toggle__knob"></div></div>`;
}

function SectionHeader(text, seeAll, iconHtml) {
  return `
    <div class="section-header">
      <span class="section-header__icon">${iconHtml || ''}${text}</span>
      ${seeAll ? `<span class="section-header__see-all">See all</span>` : ''}
    </div>`;
}
