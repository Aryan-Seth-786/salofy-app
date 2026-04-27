function renderDashboardGrowth() {
  const stats = [
    { label: 'Profile Views', value: '1,247', change: '+23%', up: true, sub: 'vs last month' },
    { label: 'Bookings', value: '89', change: '+12%', up: true, sub: 'vs last month' },
    { label: 'Conversion Rate', value: '7.1%', change: '-2%', up: false, sub: 'vs last month' },
    { label: 'Peak Hours', value: '10\u201312 AM', change: 'Sat busiest', up: true, sub: '' },
  ];

  const topServices = [
    { name: "Men's Haircut", views: 324 },
    { name: 'Beard Styling', views: 218 },
    { name: 'Premium Facial', views: 156 },
  ];

  const barHeights = [45, 68, 85, 72, 95, 60, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return Shell(`
    <div style="padding:44px 20px 14px;background:#0F0F17;min-height:100%">
      <div style="font-size:18px;font-weight:700;color:var(--ink-50)">Salon Dashboard</div>
      <div style="display:inline-flex;align-items:center;gap:4px;margin-top:4px;font-size:11px;padding:3px 10px;border-radius:12px;background:rgba(123,104,174,0.15);color:${C.verified}">
        ${Icons.check(10, C.verified)} Growth Plan
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="stat-card__label">${s.label}</div>
            <div class="stat-card__value">${s.value}</div>
            <div class="stat-card__change ${s.up ? 'stat-card__change--up' : 'stat-card__change--down'}">
              ${s.up ? Icons.trendingUp(10, '#4ECB71') : Icons.trendingDown(10, '#FF6B6B')} ${s.change} ${s.sub}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Bookings Chart -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:var(--ink-50);margin-bottom:12px">Bookings This Month</div>
        <div style="height:150px;background:#1A1A28;border:1px solid #363648;border-radius:10px;display:flex;align-items:flex-end;padding:16px;gap:8px">
          ${barHeights.map((h, i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <div style="width:100%;height:${h}px;background:${C.verified};border-radius:4px 4px 0 0;opacity:0.7"></div>
              <div style="font-size:8px;color:#6E6E7A">${days[i]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Top Services -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:var(--ink-50);margin-bottom:12px">Most Viewed Services</div>
        ${topServices.map((s, i) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#1A1A28;border:1px solid #363648;border-radius:8px;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="font-size:14px;font-weight:700;color:#6E6E7A;width:20px">${i + 1}</div>
              <span style="font-size:13px;color:var(--ink-50)">${s.name}</span>
            </div>
            <span style="font-size:12px;color:#B0AEAD;display:flex;align-items:center;gap:4px">${Icons.eye(14, '#6E6E7A')} ${s.views}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `, { activeTab: 'dashboard', statusDark: true, navType: 'dashboard' });
}
