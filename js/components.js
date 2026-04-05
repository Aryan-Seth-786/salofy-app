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
