function renderDeals() {
  const deals = [
    { salon: salons[1], percent: '20%', title: '20% Off Your First Visit', desc: 'Valid on all services for new customers', icon: 'scissors' },
    { salon: salons[0], percent: '30%', title: '30% Off Hair Color Services', desc: 'Premium hair color with top products', icon: 'palette' },
    { salon: salons[5], percent: '15%', title: 'Mani-Pedi Combo Deal', desc: 'Manicure + Pedicure at special price', icon: 'nails' },
  ];

  const filters = ['All Deals', 'Flash', 'Haircut', 'Facial', 'Spa'];

  return Shell(`
    <div style="padding:44px 20px 10px">
      <div style="font-family:var(--font-heading);font-size:24px;font-weight:700;color:${C.text};letter-spacing:-0.4px;display:flex;align-items:center;gap:8px"><span style="font-family:var(--font-body);display:inline-flex">${Icons.fire(22, C.error)}</span> Deals & Offers</div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px">Best deals from salons near you</div>
    </div>

    <!-- Filter Pills -->
    <div style="display:flex;gap:8px;padding:12px 20px;overflow-x:auto" class="hide-sb">
      ${filters.map((f, i) => `
        <div class="pill${i === 0 ? ' pill--primary' : ''}" style="font-size:12px">
          ${i === 1 ? Icons.lightning(12, i === 0 ? '#fff' : C.error) + ' ' : ''}${f}
        </div>
      `).join('')}
    </div>

    <!-- Flash Deal -->
    <div style="padding:8px 20px 16px">
      ${FlashDealCard('50% Off All Facials', 'Today Only', 'Luxe Hair Studio \u2022 Sector 17', '02', '34', '11')}
    </div>

    <!-- Deal Cards -->
    <div style="padding:0 20px">
      <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px">Salon Deals</div>
      ${deals.map(d => `
        <div style="background:${C.surface};border:1px solid ${C.border};border-radius:10px;overflow:hidden;margin-bottom:12px">
          <div style="height:90px;background:linear-gradient(135deg, ${C.surface2}, ${C.surface3});display:flex;align-items:center;justify-content:center;position:relative">
            <div style="opacity:0.3">${svcIcon(d.icon, 36, C.text3)}</div>
            <div style="position:absolute;top:8px;right:8px">
              ${DealTag(d.percent + ' OFF')}
            </div>
            ${d.salon.tier === 'premium' ? `<div style="position:absolute;top:8px;left:8px">${TopBadge()}</div>` : ''}
            ${d.salon.tier === 'growth' ? `<div style="position:absolute;top:8px;left:8px">${VerifiedBadge()}</div>` : ''}
          </div>
          <div style="padding:12px">
            <div style="font-size:11px;color:${C.primary};font-weight:500">${d.salon.name}</div>
            <div style="font-size:14px;font-weight:600;color:${C.text};margin-top:2px">${d.title}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:4px">${d.desc}</div>
            <button data-goto-salon="${d.salon.id}" class="btn btn--primary-sm" style="width:100%;margin-top:10px;padding:10px;font-size:12px">Book This Deal</button>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'search' });
}
