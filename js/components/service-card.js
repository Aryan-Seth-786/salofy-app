/* ═══════════════════════════════════════════════════
   SERVICE CARD — canonical component
   Variants: 'select' (interactive, salon-profile),
             'compact' (read-only row, booking summary)
   ═══════════════════════════════════════════════════ */

function ServiceCard(svcKey, price, selected, discPrice, variant) {
  const svc = getSvc(svcKey);
  if (!svc) return '';
  variant = variant || 'select';

  if (variant === 'compact') {
    return `
      <div style="display:flex;justify-content:space-between;font-size:13px;color:${C.text};margin-bottom:6px">
        <span style="color:${C.text3};display:flex;align-items:center;gap:5px">
          ${svcIcon(svc.icon, 12, C.text3)} ${svc.label}
        </span>
        <span>₹${price}</span>
      </div>`;
  }

  // 'select' variant — interactive checkbox row
  return `
    <div class="service-select${selected ? ' service-select--active' : ''}" data-svc-toggle="${svcKey}">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="service-select__check">
          ${selected ? Icons.check(14, '#fff') : ''}
        </div>
        <div class="service-select__icon">
          ${svcIcon(svc.icon, 18, selected ? C.primary : C.text2)}
        </div>
        <div>
          <div style="font-size:13px;font-weight:500;color:${C.text}">${svc.label}</div>
          <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:1px">
            <span style="font-size:11px;color:${C.text3}">${svc.time}</span>
            ${discPrice ? '<span class="service-select__disc-badge">Online Booking Discount</span>' : ''}
          </div>
        </div>
      </div>
      ${discPrice
        ? `<div style="text-align:right">
             <div style="font-size:11px;color:${C.text3};text-decoration:line-through">₹${price}</div>
             <div style="font-size:14px;font-weight:700;color:${C.success}">₹${discPrice}</div>
           </div>`
        : `<div style="font-size:14px;font-weight:700;color:${C.ink900};font-variant-numeric:tabular-nums">₹${price}</div>`
      }
    </div>`;
}
