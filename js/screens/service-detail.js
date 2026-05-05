/* ═══════════════════════════════════════════════════
   SERVICE DETAIL SCREEN
   Renders a deep-detail view for a single service or package.
   Only services/packages with entries in salon.serviceDetails /
   salon.packageDetails are reachable here (Growth+ tiers only).
   ═══════════════════════════════════════════════════ */

function renderServiceDetail() {
  const salonId = AppState.detailSalonId;
  const type    = AppState.detailType || 'service';
  const id      = AppState.detailId;
  const salon   = salons.find(s => s.id === salonId) || AppState.selectedSalon;
  if (!salon || !id) {
    return Shell(`<div style="padding:60px 24px;text-align:center;color:${C.text3}">Service not found.</div>`, { noNav: true });
  }

  const isPremium = salon.tier === 'premium';
  const isPackage = type === 'package';

  let title, duration, price, originalPrice, baseDesc, baseIncludes, details, alreadyAdded;

  if (isPackage) {
    const pkg = (salon.packages || []).find(p => p.id === id);
    if (!pkg) return Shell(`<div style="padding:60px 24px;text-align:center;color:${C.text3}">Package not found.</div>`, { noNav: true });
    details       = (salon.packageDetails && salon.packageDetails[id]) || {};
    title         = pkg.name;
    duration      = pkg.duration;
    price         = pkg.price;
    originalPrice = pkg.price + pkg.savings;
    baseDesc      = pkg.desc;
    baseIncludes  = (pkg.services || []).map(sid => getSvc(sid)?.label).filter(Boolean);
    alreadyAdded  = (AppState.salonPackages || []).includes(id);
  } else {
    const svc = getSvc(id);
    if (!svc || !salon.services[id]) return Shell(`<div style="padding:60px 24px;text-align:center;color:${C.text3}">Service not found.</div>`, { noNav: true });
    details       = (salon.serviceDetails && salon.serviceDetails[id]) || {};
    title         = svc.label;
    duration      = svc.time;
    price         = (salon.serviceDiscounts && salon.serviceDiscounts[id]) || salon.services[id];
    originalPrice = (salon.serviceDiscounts && salon.serviceDiscounts[id]) ? salon.services[id] : null;
    baseDesc      = svc.desc || '';
    baseIncludes  = svc.includes || [];
    alreadyAdded  = (AppState.salonServices || []).includes(id);
  }

  const longDesc = details.longDesc || baseDesc;
  const includes = (details.includes && details.includes.length) ? details.includes : baseIncludes;
  const gallery  = details.gallery && details.gallery.length ? details.gallery : (details.hero ? [details.hero] : []);
  const stylists = (details.stylistIds || []).map(i => salon.staff[i]).filter(Boolean);

  /* ── Hero gallery ── */
  // Back button overlaid on hero matches the salon-profile pattern.
  const overlayBack = `<div data-nav="back" style="position:absolute;top:48px;left:16px;width:40px;height:40px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow-sm);z-index:2">${Icons.back(18, C.ink900)}</div>`;

  const heroHtml = gallery.length ? `
    <div style="position:relative;width:100%;height:240px;overflow:hidden;background:${C.surface2}">
      <div style="display:flex;height:100%;overflow-x:auto;scroll-snap-type:x mandatory" class="hide-sb">
        ${gallery.map(url => `
          <div style="flex:0 0 100%;height:100%;scroll-snap-align:start;position:relative">
            <img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
          </div>
        `).join('')}
      </div>
      ${overlayBack}
      ${gallery.length > 1 ? `<div style="position:absolute;bottom:10px;left:0;right:0;display:flex;justify-content:center;gap:5px">
        ${gallery.map((_, i) => `<span style="width:6px;height:6px;border-radius:50%;background:${i === 0 ? '#fff' : 'rgba(255,255,255,0.5)'}"></span>`).join('')}
      </div>` : ''}
      ${isPackage ? `<div style="position:absolute;top:48px;right:16px;z-index:2"><span class="pkg-badge">PACKAGE</span></div>` : ''}
    </div>
  ` : `
    <div style="position:relative;height:140px;background:linear-gradient(135deg, var(--rose-50), var(--surface-2));display:flex;align-items:flex-end;padding:20px">
      ${overlayBack}
      ${isPackage ? `<div style="position:absolute;top:48px;right:16px;z-index:2"><span class="pkg-badge">PACKAGE</span></div>` : ''}
    </div>
  `;

  /* ── Title row + price ── */
  const titleHtml = `
    <div style="padding:18px 20px 16px;border-bottom:1px solid ${C.borderS}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
        <div style="flex:1;min-width:0">
          <div style="font-family:var(--font-heading);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.3px;line-height:1.2">${title}</div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:8px;font-size:13px;color:${C.text3}">
            <span style="display:inline-flex;align-items:center;gap:4px">${Icons.clock(11, C.text3)} ${duration}</span>
          </div>
        </div>
        ${PriceDisplay(originalPrice, price, { variant: 'stacked', emphasis: 'primary' })}
      </div>
    </div>
  `;

  /* ── Salon mini-card (always renders — links to full profile) ── */
  const salonCardHtml = `
    <div data-goto-salon="${salon.id}" style="margin:14px 20px 0;padding:12px;background:${C.surface};border:1px solid ${C.border};border-radius:12px;display:flex;align-items:center;gap:12px;cursor:pointer">
      <div style="width:44px;height:44px;border-radius:10px;background:${C.surface2};overflow:hidden;flex-shrink:0">
        ${salon.cover ? `<img src="${salon.cover}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">` : ''}
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;font-size:14px;font-weight:600;color:${C.text}">
          ${salon.name}
          ${isPremium ? TopDot() : salon.tier === 'growth' ? VerifiedDot() : ''}
        </div>
        <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:${C.text3};margin-top:2px">
          ${StarRow(salon.rating, salon.reviews)}
          <span style="opacity:0.5">•</span>
          <span>${salon.dist}</span>
        </div>
      </div>
      ${Icons.forward(14, C.text3)}
    </div>
  `;

  /* ── Trust strip — always renders, gives the page weight ── */
  const trustItems = [
    { icon: Icons.shield(16, C.success),  label: 'Pay at salon',     sub: 'No upfront' },
    { icon: Icons.check(16, C.primary),   label: 'Sanitised tools',  sub: 'Per booking' },
    { icon: Icons.calendar(16, C.primary),label: 'Free reschedule',  sub: 'Up to 2 hrs' },
    { icon: Icons.starFilled(16, C.saffron), label: `${salon.rating} rating`, sub: `${salon.reviews || 0} reviews` },
  ];
  const trustStripHtml = `
    <div style="padding:14px 20px 4px">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${trustItems.map(t => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${C.surface};border:1px solid ${C.borderS};border-radius:10px">
            <div style="width:30px;height:30px;border-radius:8px;background:${C.surface2};display:flex;align-items:center;justify-content:center;flex-shrink:0">${t.icon}</div>
            <div style="min-width:0">
              <div style="font-size:13px;font-weight:600;color:${C.text};line-height:1.2">${t.label}</div>
              <div style="font-size:11px;color:${C.text3};margin-top:1px">${t.sub}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  /* ── About ── */
  const aboutHtml = longDesc ? `
    <div style="padding:18px 20px 14px">
      <div class="sd-eyebrow">About this ${isPackage ? 'package' : 'service'}</div>
      <div style="font-size:14px;line-height:1.55;color:${C.text2}">${longDesc}</div>
    </div>
  ` : '';

  /* ── Includes — checklist style (visually distinct from category chips) ── */
  const includesHtml = includes.length ? `
    <div style="padding:6px 20px 18px">
      <div class="sd-eyebrow">What's included</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 14px">
        ${includes.map(it => `
          <div style="display:flex;align-items:flex-start;gap:8px">
            <span style="width:18px;height:18px;border-radius:50%;background:var(--success-surface);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${Icons.check(11, C.success)}</span>
            <span style="font-size:13.5px;color:${C.text};line-height:1.4">${it}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  /* ── Hygiene ── */
  const hygieneHtml = details.hygiene ? `
    <div style="padding:14px 20px 18px;border-top:1px solid ${C.borderS}">
      <div class="sd-eyebrow" style="display:flex;align-items:center;gap:5px;color:${C.success}">
        ${Icons.shield(12, C.success)} Hygiene & setup
      </div>
      <div style="display:flex;gap:12px;align-items:flex-start">
        ${details.hygiene.photo ? `<img src="${details.hygiene.photo}" loading="lazy" style="width:96px;height:96px;border-radius:10px;object-fit:cover;flex-shrink:0">` : ''}
        <div style="font-size:13px;line-height:1.55;color:${C.text2};flex:1">${details.hygiene.caption || ''}</div>
      </div>
    </div>
  ` : '';

  /* ── Past work ── */
  const pastWorkHtml = (details.pastWork && details.pastWork.length) ? `
    <div style="padding:14px 20px 18px;border-top:1px solid ${C.borderS}">
      <div class="sd-eyebrow">Past work</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${details.pastWork.slice(0, 4).map(url => `
          <div style="aspect-ratio:1;border-radius:8px;overflow:hidden;background:${C.surface2}">
            <img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  /* ── Stylist(s) ── */
  const stylistHtml = stylists.length ? `
    <div style="padding:14px 20px 18px;border-top:1px solid ${C.borderS}">
      <div class="sd-eyebrow">Your stylist${stylists.length > 1 ? 's' : ''}</div>
      <div style="display:flex;gap:14px;overflow-x:auto" class="hide-sb">
        ${stylists.map(st => StaffCard(st, isPremium)).join('')}
      </div>
    </div>
  ` : '';

  /* ── More from this salon ── */
  let moreItems = [];
  if (isPackage) {
    moreItems = (salon.packages || []).filter(p => p.id !== id).slice(0, 3).map(p => ({
      kind: 'package', id: p.id, label: p.name, sub: p.duration, price: p.price, original: p.price + p.savings,
    }));
  } else {
    moreItems = Object.entries(salon.services).filter(([k]) => k !== id).slice(0, 4).map(([k, v]) => {
      const svc = getSvc(k);
      const disc = salon.serviceDiscounts && salon.serviceDiscounts[k];
      return svc ? { kind: 'service', id: k, label: svc.label, sub: svc.time, price: disc || v, original: disc ? v : null } : null;
    }).filter(Boolean);
  }

  const moreHtml = moreItems.length ? `
    <div style="padding:14px 20px 22px;border-top:1px solid ${C.borderS}">
      <div class="sd-eyebrow">More from ${salon.name}</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${moreItems.map(it => {
          const enriched = it.kind === 'service'
            ? !!(salon.serviceDetails && salon.serviceDetails[it.id])
            : !!(salon.packageDetails && salon.packageDetails[it.id]);
          const tapAttrs = enriched
            ? ` data-action="open-service-detail" data-detail-type="${it.kind}" data-detail-id="${it.id}" data-detail-salon="${salon.id}"`
            : '';
          return `
            <div${tapAttrs} style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:${C.surface};border:1px solid ${C.borderS};border-radius:10px;${enriched ? 'cursor:pointer' : ''}">
              <div style="min-width:0">
                <div style="font-size:14px;font-weight:600;color:${C.text}">${it.label}</div>
                <div style="font-size:12px;color:${C.text3};margin-top:1px">${it.sub}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                ${PriceDisplay(it.original, it.price, { variant: 'inline', emphasis: 'ink' })}
                ${enriched ? Icons.forward(12, C.text3) : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  /* ── Pay-at-salon reassurance bar ── */
  const payHtml = `<div style="padding:0 20px 14px">${PayAtSalon()}</div>`;

  /* ── Reviews ── */
  const reviewsHtml = `
    <div style="padding:14px 20px 24px;border-top:1px solid ${C.borderS};flex:1">
      <div class="sd-eyebrow">Reviews for this ${isPackage ? 'package' : 'service'}</div>
      ${ReviewCard('Priya S.', 5, 'Loved the experience — exactly as described, professional and on-time.')}
      ${ReviewCard('Aman K.', 4, 'Great service, would book again. Hygienic and very welcoming.')}
    </div>
  `;

  /* ── Sticky CTA ── */
  const ctaAction = alreadyAdded ? 'detail-back-to-return' : 'detail-add-to-booking';
  const ctaClass  = alreadyAdded ? 'btn btn--secondary' : 'btn btn--primary';
  const ctaInner  = alreadyAdded
    ? `${Icons.check(16, '#6d2db0')}<span>Added · Continue</span>`
    : `<span>Add to booking</span><span style="opacity:0.85">·</span><span style="font-variant-numeric:tabular-nums">₹${price}</span>`;
  const ctaHtml = `
    <div style="position:sticky;bottom:0;left:0;right:0;padding:12px 16px 16px;background:${C.surface};border-top:1px solid ${C.border};box-shadow:0 -8px 24px -10px rgba(0,0,0,0.12);z-index:5">
      <button class="${ctaClass}" data-action="${ctaAction}">${ctaInner}</button>
    </div>
  `;

  return Shell(`
    <div style="display:flex;flex-direction:column;min-height:100%">
      ${heroHtml}
      ${titleHtml}
      ${salonCardHtml}
      ${trustStripHtml}
      ${aboutHtml}
      ${includesHtml}
      ${hygieneHtml}
      ${pastWorkHtml}
      ${stylistHtml}
      ${payHtml}
      ${moreHtml}
      ${reviewsHtml}
      ${ctaHtml}
    </div>
  `, { noNav: true });
}
