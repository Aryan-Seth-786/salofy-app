/* ═══════════════════════════════════════════════════
   SERVICE CARD — canonical component
   Variants: 'select' (interactive, salon-profile),
             'compact' (read-only row, booking summary)
   ═══════════════════════════════════════════════════ */

function ServiceCard(svcKey, price, selected, discPrice, variant, salon) {
  const svc = getSvc(svcKey);
  if (!svc) return '';
  variant = variant || 'select';

  const tier = salon ? salon.tier : null;
  const enriched = !!(salon && salon.serviceDetails && salon.serviceDetails[svcKey]);

  if (variant === 'compact') {
    return `
      <div style="display:flex;justify-content:space-between;font-size:15px;color:${C.text};margin-bottom:6px">
        <span style="color:${C.text3}">${svc.label}</span>
        <span>₹${price}</span>
      </div>`;
  }

  // 'select' variant — interactive checkbox row
  const expandable = tier === 'growth' || tier === 'premium';
  const expandId = expandable ? `svc-expand-${(salon ? salon.id : 'x')}-${svcKey}` : '';
  const desc = (salon && salon.serviceDetails && salon.serviceDetails[svcKey] && salon.serviceDetails[svcKey].longDesc)
    ? salon.serviceDetails[svcKey].longDesc
    : (svc.desc || '');
  const includes = (salon && salon.serviceDetails && salon.serviceDetails[svcKey] && salon.serviceDetails[svcKey].includes)
    ? salon.serviceDetails[svcKey].includes
    : (svc.includes || []);

  return `
    <div class="service-row${expandable ? ' service-row--expandable' : ''}" data-svc-row="${svcKey}">
      <div class="service-select${selected ? ' service-select--active' : ''}" data-svc-toggle="${svcKey}">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
          <div class="service-select__check">
            ${selected ? Icons.check(14, '#fff') : ''}
          </div>
          <div style="min-width:0;flex:1">
            <div style="font-size:15px;font-weight:500;color:${C.text}">${svc.label}</div>
            <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:1px">
              <span style="font-size:12px;color:${C.text3}">${svc.time}</span>
              ${discPrice ? '<span class="service-select__disc-badge">Online Booking Discount</span>' : ''}
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
          ${discPrice
            ? PriceDisplay(price, discPrice, { variant: 'stacked', emphasis: 'ink' })
            : `<div style="font-size:15px;font-weight:700;color:${C.ink900};font-variant-numeric:tabular-nums">₹${price}</div>`
          }
          ${expandable ? `<button class="svc-chevron" data-svc-expand="${expandId}" aria-label="More info">${Icons.chevronDown(14, C.text3)}</button>` : ''}
        </div>
      </div>
      ${expandable ? `
        <div id="${expandId}" class="svc-expand-panel" style="display:none">
          ${desc ? `<div style="font-size:13px;color:${C.text2};line-height:1.5;margin-bottom:8px">${desc}</div>` : ''}
          ${includes.length ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:${enriched ? '10px' : '0'}">
            ${includes.map(i => `<span class="svc-include-chip">${i}</span>`).join('')}
          </div>` : ''}
          ${enriched ? `<button class="svc-detail-link" data-action="open-service-detail" data-detail-type="service" data-detail-id="${svcKey}" data-detail-salon="${salon.id}">View full details ${Icons.forward(11, C.primary)}</button>` : ''}
        </div>` : ''}
    </div>`;
}
