/* ═══════════════════════════════════════════════════
   PACKAGE CARD — canonical component
   Variants:
     'select'     — interactive, salon-profile packages tab
     'summary'    — read-only, booking / booking-confirmed
     'suggestion' — saffron upsell strip (SuggestedPackages)
   ═══════════════════════════════════════════════════ */

function PackageCard(pkg, selected, variant, salonId, salon) {
  variant = variant || 'select';

  if (variant === 'summary') {
    const original = pkg.price + pkg.savings;
    return `
      <div class="pkg-card--summary">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px">
          <div style="min-width:0;flex:1">
            <span class="pkg-badge" style="margin-bottom:6px;display:inline-block">PACKAGE</span>
            <div style="font-size:16px;font-weight:600;color:${C.text};line-height:1.25">${pkg.name}</div>
          </div>
          <div style="flex-shrink:0">
            ${PriceDisplay(original, pkg.price, { variant: 'stacked', emphasis: 'primary' })}
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${pkg.services.map(sid => {
            const svc = getSvc(sid);
            return svc ? `<span class="pkg-svc-chip">${svc.label}</span>` : '';
          }).join('')}
        </div>
      </div>`;
  }

  if (variant === 'suggestion') {
    const selSvcs = (salonId ? [] : []);
    return PackageCard.suggestion(pkg, selSvcs);
  }

  // 'select' variant — full interactive card for salon-profile packages tab
  const limit    = 4;
  const shown    = pkg.services.slice(0, limit);
  const hidden   = pkg.services.slice(limit);
  const extra    = hidden.length;
  const hiddenId = `pkg-extra-${pkg.id}`;
  const original = pkg.price + pkg.savings;

  const tier = salon ? salon.tier : null;
  const expandable = tier === 'growth' || tier === 'premium';
  const enriched = !!(salon && salon.packageDetails && salon.packageDetails[pkg.id]);
  const expandId = expandable ? `pkg-expand-${(salon ? salon.id : 'x')}-${pkg.id}` : '';
  const longDesc = (salon && salon.packageDetails && salon.packageDetails[pkg.id] && salon.packageDetails[pkg.id].longDesc)
    ? salon.packageDetails[pkg.id].longDesc
    : pkg.desc;
  const includes = (salon && salon.packageDetails && salon.packageDetails[pkg.id] && salon.packageDetails[pkg.id].includes)
    ? salon.packageDetails[pkg.id].includes
    : [];

  return `
    <div class="pkg-row">
      <div class="pkg-card${selected ? ' pkg-card--active' : ''}" data-pkg-toggle="${pkg.id}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:600;color:${C.text}">${pkg.name}</div>
            <div style="font-size:12px;color:${C.text3};margin-top:2px">${pkg.desc}</div>
          </div>
          <div class="service-select__check" style="flex-shrink:0">
            ${selected ? Icons.check(14, '#fff') : ''}
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
          ${shown.map(sid => {
            const svc = getSvc(sid);
            return svc ? `<span style="font-size:11px;padding:3px 8px;background:${selected ? C.primaryS : C.surface2};border:1px solid ${selected ? C.primary + '44' : C.border};border-radius:10px;color:${selected ? C.primary : C.text2}">${svc.label}</span>` : '';
          }).join('')}
          ${extra > 0 ? `
            <span id="${hiddenId}" style="display:none;flex-wrap:wrap;gap:5px;">
              ${hidden.map(sid => {
                const svc = getSvc(sid);
                return svc ? `<span style="font-size:11px;padding:3px 8px;background:${selected ? C.primaryS : C.surface2};border:1px solid ${selected ? C.primary + '44' : C.border};border-radius:10px;color:${selected ? C.primary : C.text2}">${svc.label}</span>` : '';
              }).join('')}
            </span>
            <span onclick="event.stopPropagation();const el=document.getElementById('${hiddenId}');const isOpen=el.style.display!=='none';el.style.display=isOpen?'none':'inline-flex';this.textContent=isOpen?'+${extra} more':'Show less';"
              style="font-size:11px;padding:3px 8px;background:${C.surface3};border:1px solid ${C.border};border-radius:10px;color:${C.primary};font-weight:600;cursor:pointer">+${extra} more</span>` : ''}
          <span style="font-size:11px;padding:3px 8px;background:${C.surface2};border:1px solid ${C.border};border-radius:10px;color:${C.text3}">${pkg.duration}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          ${PriceDisplay(original, pkg.price, { variant: 'inline', emphasis: 'primary' })}
          ${expandable ? `<button class="svc-chevron" data-pkg-expand="${expandId}" aria-label="More info">${Icons.chevronDown(14, C.text3)}</button>` : ''}
        </div>
        <div style="margin-top:7px">
          <span class="service-select__disc-badge">Online Booking Discount</span>
        </div>
      </div>
      ${expandable ? `
        <div id="${expandId}" class="svc-expand-panel" style="display:none">
          ${longDesc ? `<div style="font-size:13px;color:${C.text2};line-height:1.5;margin-bottom:8px">${longDesc}</div>` : ''}
          ${includes.length ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:${enriched ? '10px' : '0'}">
            ${includes.map(i => `<span class="svc-include-chip">${i}</span>`).join('')}
          </div>` : ''}
          ${enriched ? `<button class="svc-detail-link" data-action="open-service-detail" data-detail-type="package" data-detail-id="${pkg.id}" data-detail-salon="${salon.id}">View full details ${Icons.forward(11, C.primary)}</button>` : ''}
        </div>` : ''}
    </div>`;
}

/* Suggestion variant — receives selSvcs from caller */
PackageCard.suggestion = function(pkg, selSvcs, salon) {
  selSvcs = selSvcs || [];
  const matchedSvcs = selSvcs.filter(sid => pkg.services.includes(sid));
  const bonusSvcs   = pkg.services.filter(sid => !selSvcs.includes(sid));
  const showBonus   = bonusSvcs.slice(0, selSvcs.length >= 1 ? 2 : 3);
  const hiddenCount = bonusSvcs.length - showBonus.length;
  const original    = pkg.price + pkg.savings;
  const pct         = Math.round((1 - pkg.price / original) * 100);
  const enriched    = !!(salon && salon.packageDetails && salon.packageDetails[pkg.id]);

  return `
    <div data-suggest-pkg="${pkg.id}" class="pkg-card--suggestion">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
          <span style="font-size:15px;font-weight:600;color:${C.text}">${pkg.name}</span>
          <span class="price-badge" style="font-size:10px">${pct}% OFF</span>
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">
          ${matchedSvcs.map(sid => { const svc = getSvc(sid); return svc ? `<span class="pkg-svc-chip pkg-svc-chip--matched">${svc.label}</span>` : ''; }).join('')}
          ${showBonus.map(sid => { const svc = getSvc(sid); return svc ? `<span class="pkg-svc-chip pkg-svc-chip--bonus">${svc.label}</span>` : ''; }).join('')}
          ${hiddenCount > 0 ? `<span style="font-size:9px;color:${C.text3}">+${hiddenCount} more</span>` : ''}
        </div>
        ${enriched ? `<button class="svc-detail-link" data-action="open-service-detail" data-detail-type="package" data-detail-id="${pkg.id}" data-detail-salon="${salon.id}" style="margin-top:6px;font-size:11px">View details ${Icons.forward(10, C.primary)}</button>` : ''}
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:15px;font-weight:700;color:${C.primary};font-variant-numeric:tabular-nums">₹${pkg.price}</div>
        <div style="font-size:11px;color:${C.text3};text-decoration:line-through;font-variant-numeric:tabular-nums">₹${original}</div>
      </div>
      ${Icons.forward(14, C.primary)}
    </div>`;
};
