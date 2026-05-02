function renderNotificationSettings() {
  const settings = [
    { label: 'Push Notifications', sub: 'Receive alerts on your device', on: true, icon: Icons.bell(16, C.text2) },
    { label: 'Email Notifications', sub: 'Booking confirmations & updates', on: true, icon: Icons.mail(16, C.text2) },
    { label: 'SMS Alerts', sub: 'Text messages for bookings', on: false, icon: Icons.message(16, C.text2) },
    { label: 'Flash Deal Alerts', sub: 'Get notified of time-limited deals', on: true, icon: Icons.lightning(16, C.error) },
    { label: 'Booking Reminders', sub: 'Reminders before appointments', on: true, icon: Icons.clock(16, C.text2) },
    { label: 'New Salon Alerts', sub: 'When salons open near you', on: false, icon: Icons.mapPin(16, C.text2) },
    { label: 'Marketing & Promotions', sub: 'Special offers and updates', on: false, icon: Icons.gift(16, C.text2) },
  ];

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Notification Settings</span>
    </div>

    <div style="padding:0 20px">
      <div style="font-size:12px;color:${C.text3};margin-bottom:16px;line-height:1.5">Choose which notifications you'd like to receive. You can change these anytime.</div>

      ${settings.map((s, i) => `
        <div style="display:flex;align-items:center;gap:12px;padding:14px 0;${i < settings.length - 1 ? `border-bottom:1px solid ${C.borderS}` : ''}">
          <div style="width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${s.icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500;color:${C.text}">${s.label}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:1px">${s.sub}</div>
          </div>
          ${ToggleSwitch(s.on)}
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'profile' });
}
