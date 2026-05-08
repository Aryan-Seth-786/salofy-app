/* ═══════════════════════════════════════════════════
   PACKAGE CARD — canonical component
   Variants:
     'select'     — interactive, salon-profile packages tab
     'locked'     — full salon-page card, locked-selected, my-bookings
     'summary'    — read-only compact, booking / booking-confirmed
     'suggestion' — saffron upsell strip (SuggestedPackages)
   ═══════════════════════════════════════════════════ */

function PackageCard(pkg, selected, variant, salonId, salon) {
  variant = variant || 'select';
  const interactive   = variant === 'select';
  const lockedSelected = variant === 'locked';

  if (variant === 'summary') {
    const original = pkg.price + pkg.savings;
    return `
      <div class="pkg-card--summary pkg-card--summary--compact">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
          <div style="min-width:0;flex:1">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <span class="pkg-badge">PACKAGE</span>
              <div style="font-size:14px;font-weight:600;color:${C.text};line-height:1.25">${pkg.name}</div>
            </div>
          </div>
          <div style="flex-shrink:0">
            ${PriceDisplay(original, pkg.price, { variant: 'inline', emphasis: 'primary' })}
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${pkg.services.map(sid => {
            const svc = getSvc(sid);
            return svc ? `<span class="pkg-chip pkg-chip--sm pkg-chip--inert">${svc.label}</span>` : '';
          }).join('')}
        </div>
      </div>`;
  }

  if (variant === 'suggestion') {
    const selSvcs = (salonId ? [] : []);
    return PackageCard.suggestion(pkg, selSvcs);
  }

  // 'select' or 'locked' variant — full salon-page card
  const isSelected = lockedSelected ? true : selected;
  const limit    = 4;
  const shown    = pkg.services.slice(0, limit);
  const hidden   = pkg.services.slice(limit);
  const extra    = hidden.length;
  const hiddenId = `pkg-extra-${pkg.id}`;
  const original = pkg.price + pkg.savings;

  const tier = salon ? salon.tier : null;
  const enriched = !!(salon && salon.packageDetails && salon.packageDetails[pkg.id]);
  const expandable = (tier === 'growth' || tier === 'premium') && !enriched;
  const expandId = expandable ? `pkg-expand-${(salon ? salon.id : 'x')}-${pkg.id}-${variant}` : '';
  const longDesc = pkg.desc;
  const includes = [];
  const toggleAttr = interactive ? ` data-pkg-toggle="${pkg.id}"` : '';

  return `
    <div class="pkg-row">
      <div class="pkg-card${(isSelected && interactive) ? ' pkg-card--active' : ''}${enriched ? ' pkg-card--detail' : ''}${lockedSelected ? ' pkg-card--locked' : ''}"${toggleAttr}>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              ${lockedSelected ? '<span class="pkg-badge">PACKAGE</span>' : ''}
              <div style="font-size:15px;font-weight:600;color:${C.text}">${pkg.name}</div>
            </div>
            <div style="font-size:12px;color:${C.text3};margin-top:2px">${pkg.desc}</div>
          </div>
          ${interactive ? `<div class="service-select__check" style="flex-shrink:0">
            ${isSelected ? Icons.check(14, '#fff') : ''}
          </div>` : ''}
        </div>
        ${(() => {
          const COLLAPSE_AT = 20;
          const renderChip = (sid) => {
            const svc = getSvc(sid);
            if (!svc) return '';
            const svcEnriched = !!(salon && salon.serviceDetails && salon.serviceDetails[sid]);
            const salonHasInfo = !!(salon && (salon.tier === 'growth' || salon.tier === 'premium'));
            const hasInlineInfo = salonHasInfo && !!((svc.desc && svc.desc.length) || (svc.includes && svc.includes.length));
            const tappable = !!salon && (svcEnriched || hasInlineInfo);
            const arrow = svcEnriched ? `<span style="margin-left:3px;display:inline-flex;color:${C.primary};opacity:0.85">›</span>` : '';
            const inertClass = (!svcEnriched && !hasInlineInfo) ? ' pkg-chip--inert' : '';
            const attrs = tappable
              ? ` data-pkg-svc-link="${sid}" data-detail-salon="${salon.id}"`
              : '';
            return `<span class="pkg-chip${(isSelected && interactive) ? ' pkg-chip--selected' : ''}${svcEnriched ? ' pkg-chip--detail' : ''}${tappable ? ' pkg-chip--tappable' : ''}${inertClass}"${attrs}>${svc.label}${arrow}</span>`;
          };

          const allSvcs = pkg.services;
          const needsCollapse = allSvcs.length > COLLAPSE_AT;
          if (!needsCollapse) {
            return `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${allSvcs.map(renderChip).join('')}
              <span class="pkg-chip pkg-chip--meta">${pkg.duration}</span>
            </div>`;
          }

          // > 20: show first 6 + dropdown
          const head = allSvcs.slice(0, 6);
          const tail = allSvcs.slice(6);
          const tailId = `pkg-chips-${pkg.id}`;
          return `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
            ${head.map(renderChip).join('')}
            <span id="${tailId}" style="display:none;flex-wrap:wrap;gap:6px">
              ${tail.map(renderChip).join('')}
            </span>
            <span onclick="event.stopPropagation();const el=document.getElementById('${tailId}');const isOpen=el.style.display!=='none';el.style.display=isOpen?'none':'inline-flex';this.textContent=isOpen?'+${tail.length} more':'Show less';"
              class="pkg-chip pkg-chip--more">+${tail.length} more</span>
            <span class="pkg-chip pkg-chip--meta">${pkg.duration}</span>
          </div>`;
        })()}
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          ${PriceDisplay(original, pkg.price, { variant: 'inline', emphasis: 'primary' })}
          ${enriched
            ? `<button class="svc-chevron svc-chevron--detail" data-action="open-service-detail" data-detail-type="package" data-detail-id="${pkg.id}" data-detail-salon="${salon.id}" aria-label="View details">${Icons.forward(14, C.primary)}</button>`
            : (expandable ? `<button class="svc-chevron" data-pkg-expand="${expandId}" aria-label="More info">${Icons.chevronDown(14, C.text3)}</button>` : '')
          }
        </div>
        ${interactive ? `<div style="margin-top:7px">
          <span class="service-select__disc-badge">Online Booking Discount</span>
        </div>` : ''}
      </div>
      ${expandable ? `
        <div id="${expandId}" class="svc-expand-panel" style="display:none">
          ${longDesc ? `<div style="font-size:13px;color:${C.text2};line-height:1.5">${longDesc}</div>` : ''}
        </div>` : ''}
      <div class="pkg-svc-info-panel" data-pkg-svc-info-for="${pkg.id}" style="display:none"></div>
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
