/* ═══════════════════════════════════════════════════
   PACKAGE CARD — canonical component
   Variants:
     'select'     — interactive, salon-profile packages tab
     'summary'    — read-only, booking / booking-confirmed
     'suggestion' — green upsell strip (SuggestedPackages)
   ═══════════════════════════════════════════════════ */

function PackageCard(pkg, selected, variant, salonId) {
  variant = variant || 'select';

  if (variant === 'summary') {
    return `
      <div class="pkg-card--summary">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="pkg-badge">PACKAGE</span>
            <span style="font-size:13px;font-weight:600;color:${C.text}">${pkg.name}</span>
          </div>
          <span style="font-size:13px;font-weight:700;color:${C.primary}">₹${pkg.price}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${pkg.services.map(sid => {
            const svc = getSvc(sid);
            return svc ? `<span class="pkg-svc-chip">${svc.label}</span>` : '';
          }).join('')}
          <span style="font-size:10px;padding:2px 7px;background:${C.successS};color:${C.success};border-radius:8px">Save ₹${pkg.savings}</span>
        </div>
      </div>`;
  }

  if (variant === 'suggestion') {
    const selSvcs  = (salonId ? [] : []);
    return PackageCard.__suggestion(pkg, selSvcs);
  }

  // 'select' variant — full interactive card for salon-profile packages tab
  const limit    = 4;
  const shown    = pkg.services.slice(0, limit);
  const hidden   = pkg.services.slice(limit);
  const extra    = hidden.length;
  const hiddenId = `pkg-extra-${pkg.id}`;

  return `
    <div class="pkg-card${selected ? ' pkg-card--active' : ''}" data-pkg-toggle="${pkg.id}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:${C.text}">${pkg.name}</div>
          <div style="font-size:11px;color:${C.text3};margin-top:2px">${pkg.desc}</div>
        </div>
        <div class="service-select__check" style="flex-shrink:0">
          ${selected ? Icons.check(13, '#fff') : ''}
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
        ${shown.map(sid => {
          const svc = getSvc(sid);
          return svc ? `<span style="font-size:10px;padding:3px 8px;background:${selected ? C.primaryS : C.surface2};border:1px solid ${selected ? C.primary + '44' : C.border};border-radius:10px;color:${selected ? C.primary : C.text2}">${svc.label}</span>` : '';
        }).join('')}
        ${extra > 0 ? `
          <span id="${hiddenId}" style="display:none;flex-wrap:wrap;gap:5px;">
            ${hidden.map(sid => {
              const svc = getSvc(sid);
              return svc ? `<span style="font-size:10px;padding:3px 8px;background:${selected ? C.primaryS : C.surface2};border:1px solid ${selected ? C.primary + '44' : C.border};border-radius:10px;color:${selected ? C.primary : C.text2}">${svc.label}</span>` : '';
            }).join('')}
          </span>
          <span onclick="event.stopPropagation();const el=document.getElementById('${hiddenId}');const isOpen=el.style.display!=='none';el.style.display=isOpen?'none':'inline-flex';this.textContent=isOpen?'+${extra} more':'Show less';"
            style="font-size:10px;padding:3px 8px;background:${C.surface3};border:1px solid ${C.border};border-radius:10px;color:${C.primary};font-weight:600;cursor:pointer">+${extra} more</span>` : ''}
        <span style="font-size:10px;padding:3px 8px;background:${C.surface2};border:1px solid ${C.border};border-radius:10px;color:${C.text3}">${pkg.duration}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <span style="font-size:17px;font-weight:700;color:${C.primary}">₹${pkg.price}</span>
          <span style="font-size:11px;color:${C.success};font-weight:500;margin-left:6px">Save ₹${pkg.savings}</span>
        </div>
        <div style="font-size:10px;color:${C.text3}">vs ₹${pkg.price + pkg.savings} separately</div>
      </div>
      <div style="margin-top:7px">
        <span class="service-select__disc-badge">Online Booking Discount</span>
      </div>
    </div>`;
}

/* Internal helper for suggestion variant — receives selSvcs from caller */
PackageCard.suggestion = function(pkg, selSvcs) {
  selSvcs = selSvcs || [];
  const matchedSvcs = selSvcs.filter(sid => pkg.services.includes(sid));
  const bonusSvcs   = pkg.services.filter(sid => !selSvcs.includes(sid));
  const showBonus   = bonusSvcs.slice(0, selSvcs.length >= 1 ? 2 : 3);
  const hiddenCount = bonusSvcs.length - showBonus.length;

  return `
    <div data-suggest-pkg="${pkg.id}" class="pkg-card--suggestion">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
          <span style="font-size:13px;font-weight:600;color:${C.text}">${pkg.name}</span>
          <span class="pkg-save-badge">Save ₹${pkg.savings}</span>
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">
          ${matchedSvcs.map(sid => { const svc = getSvc(sid); return svc ? `<span class="pkg-svc-chip pkg-svc-chip--matched">${svc.label}</span>` : ''; }).join('')}
          ${showBonus.map(sid => { const svc = getSvc(sid); return svc ? `<span class="pkg-svc-chip pkg-svc-chip--bonus">${svc.label}</span>` : ''; }).join('')}
          ${hiddenCount > 0 ? `<span style="font-size:9px;color:${C.text3}">+${hiddenCount} more</span>` : ''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:14px;font-weight:700;color:${C.primary}">₹${pkg.price}</div>
        <div style="font-size:10px;color:${C.text3};white-space:nowrap">${pkg.duration}</div>
      </div>
      ${Icons.forward(14, C.success)}
    </div>`;
};
