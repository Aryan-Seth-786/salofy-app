function renderDashboardPremium() {
  const stats = [
    { label: 'Profile Views', value: '3,842', change: '+41%', up: true, sub: 'vs last month' },
    { label: 'Bookings', value: '267', change: '+28%', up: true, sub: 'vs last month' },
    { label: 'Conversion Rate', value: '6.9%', change: '+0.5%', up: true, sub: 'vs last month' },
    { label: 'Flash Deal Conv.', value: '18.2%', change: '+5%', up: true, sub: 'vs last deal' },
  ];

  const competitors = [
    { service: 'Haircut', you: 400, avg: 320 },
    { service: 'Hair Color', you: 1200, avg: 1350 },
    { service: 'Facial', you: 500, avg: 580 },
    { service: 'Bridal Pkg', you: 8000, avg: 9200 },
  ];

  return Shell(`
    <div style="padding:44px 20px 14px;background:#0F0F17;min-height:100%">
      <div style="font-size:18px;font-weight:700;color:var(--ink-50)">Salon Dashboard</div>
      <div style="display:inline-flex;align-items:center;gap:4px;margin-top:4px;font-size:11px;padding:3px 10px;border-radius:12px;background:rgba(245,200,66,0.15);color:${C.saffron}">
        ${Icons.starFilled(10, C.saffron)} Premium Plan
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="stat-card__label">${s.label}</div>
            <div class="stat-card__value" style="color:${C.saffron}">${s.value}</div>
            <div class="stat-card__change ${s.up ? 'stat-card__change--up' : 'stat-card__change--down'}">
              ${s.up ? Icons.trendingUp(10, '#4ECB71') : Icons.trendingDown(10, '#FF6B6B')} ${s.change} ${s.sub}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- AI Insight -->
      <div style="margin-top:16px;padding:14px;background:linear-gradient(135deg, rgba(212,160,23,0.08), rgba(196,117,110,0.05));border:1px solid rgba(212,160,23,0.2);border-radius:10px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:${C.saffron};font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:4px">${Icons.lightbulb(14, C.saffron)} Performance Insight</div>
        <div style="font-size:12px;color:#B0AEAD;line-height:1.5">Your <strong style="color:var(--ink-50)">Gold Facial</strong> is getting 3x more views this week. Consider running a <strong style="color:${C.saffron}">Flash Deal</strong> to convert browsing into bookings.</div>
      </div>

      <!-- Competitor Pricing -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:var(--ink-50);margin-bottom:12px">Competitor Pricing (Your Area)</div>
        <div style="background:#1A1A28;border:1px solid #363648;border-radius:10px;overflow:hidden">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                <th style="font-size:10px;color:#6E6E7A;text-align:left;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Service</th>
                <th style="font-size:10px;color:#6E6E7A;text-align:right;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Your Price</th>
                <th style="font-size:10px;color:#6E6E7A;text-align:right;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Area Avg</th>
              </tr>
            </thead>
            <tbody>
              ${competitors.map(c => `
                <tr>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;color:var(--ink-50)">${c.service}</td>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;text-align:right;color:${c.you <= c.avg ? '#4ECB71' : '#FF6B6B'};font-weight:600">\u20B9${c.you.toLocaleString()}</td>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;text-align:right;color:#B0AEAD">\u20B9${c.avg.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Dedicated Support -->
      <div style="margin-top:16px;padding:14px;background:#1A1A28;border:1px solid #363648;border-radius:10px;display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;background:rgba(45,139,85,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.headphones(20, '#4ECB71')}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:var(--ink-50)">Dedicated Support</div>
          <div style="font-size:11px;color:#6E6E7A;margin-top:2px">Chat with your account manager</div>
        </div>
        <button style="padding:6px 16px;background:#4ECB71;color:#0F0F17;border:none;border-radius:8px;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer">Open</button>
      </div>

      <!-- Monthly Review -->
      <div style="margin-top:16px;padding:14px;background:linear-gradient(135deg, rgba(212,160,23,0.06), rgba(123,104,174,0.06));border:1px solid rgba(212,160,23,0.15);border-radius:10px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#6E6E7A;font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:4px">${Icons.document(14, '#6E6E7A')} Team Review \u2014 Mar 2026</div>
        <div style="font-size:12px;color:#B0AEAD;line-height:1.5">Bridal packages saw a 40% increase in bookings. Consider adding a complementary bridal consultation to increase the average order value.</div>
      </div>
    </div>
  `, { activeTab: 'dashboard', statusDark: true, navType: 'dashboard' });
}
