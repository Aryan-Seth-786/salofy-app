/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
   HTML string generators for reusable UI pieces
   ═══════════════════════════════════════════════════ */

function TopBadge() {
  return `<span class="badge badge--top">${Icons.starFilled(8, '#fff')} Top Salon</span>`;
}

function VerifiedBadge() {
  return `<span class="badge badge--verified">${Icons.check(8, '#fff')} Verified</span>`;
}

function DealTag(text) {
  return `<span class="badge badge--deal">${text}</span>`;
}

function TopDot() {
  return `<span class="dot-badge dot-badge--top">${Icons.starFilled(8, '#fff')}</span>`;
}

function VerifiedDot() {
  return `<span class="dot-badge dot-badge--verified">${Icons.check(8, '#fff')}</span>`;
}

function StarRow(rating) {
  return `<span class="star-row">${Icons.starFilled(12, C.primaryL)} ${rating}</span>`;
}

function PayAtSalon() {
  return `<div class="pay-at-salon">${Icons.shield(14, C.success)} Pay at Salon &mdash; No online payment needed</div>`;
}

function SalonResultCard(s, selectedSvcs = [], isFav = false) {
  const matched = selectedSvcs.filter(sid => s.services[sid]);
  const combo = matched.reduce((a, sid) => a + s.services[sid], 0);
  const dp = s.deal ? parseInt(s.deal) || 0 : 0;
  const disc = dp > 0 ? Math.round(combo * (1 - dp / 100)) : null;

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
      </div>`;
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
    <div class="salon-card${s.tier === 'premium' ? ' salon-card--premium' : ''}" data-goto-salon="${s.id}" style="cursor:pointer">
      <div class="salon-card__hero">
        <div class="salon-card__hero-icon">${Icons.scissors(28, C.text3)}</div>
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
          ${StarRow(s.rating)}
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
      <div style="font-size:14px;font-weight:600;color:${C.primary}">\u20B9${price}</div>
    </div>`;
}

function ReviewCard(name, stars, text) {
  return `
    <div style="background:${C.surface2};border-radius:8px;padding:12px;margin-bottom:8px;border:1px solid ${C.borderS}">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;font-weight:600;color:${C.text}">${name}</span>
        <span style="font-size:11px;color:${C.primaryL};display:flex;gap:1px">${Array(stars).fill(Icons.starFilled(11, C.primaryL)).join('')}${Array(5 - stars).fill(Icons.star(11, C.border)).join('')}</span>
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
