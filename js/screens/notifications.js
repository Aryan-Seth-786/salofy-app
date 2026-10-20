function notifIcon(name) {
  if (name === 'check') return Icons.check(16, '#fff');
  if (name === 'clock') return Icons.clock(16, '#fff');
  if (name === 'x') return Icons.close(16, '#fff');
  if (name === 'lightning') return Icons.lightning(16, '#fff');
  if (name === 'gift') return Icons.gift(16, '#fff');
  if (name === 'star') return Icons.starFilled(16, '#fff');
  return Icons.mapPin(16, '#fff');
}

function renderNotifications() {
  const isProd = (typeof APP_MODE !== 'undefined') && APP_MODE === 'prod';
  const live = AppState.notifications && AppState.notifications.length;
  /* Demo reference keeps sample alerts so the screen has a layout to review.
     Prod must not invent bookings or deals the server never sent. */
  const ns = live
    ? AppState.notifications.map(n => ({
        icon: notifIcon(n.icon),
        bg: (n.bg && n.bg.startsWith('var(')) ? n.bg : 'var(--info)',
        title: n.title, body: n.body, time: n.time,
        category: n.category, action: n.action, gotoSalon: n.goto_salon || n.gotoSalon,
      }))
    : (isProd ? [] : [
      { icon: Icons.lightning(16, '#fff'), bg: C.error, title: 'Flash Deal: 50% Off Facials!', body: 'Luxe Hair Studio \u2014 only 2 hrs left.', time: '12 min ago', category: 'flash', action: 'go-deals' },
      { icon: Icons.mapPin(16, '#fff'), bg: C.primary, title: 'Weekend Picks Near You', body: '3 salons in Kharar have special offers.', time: '2 hrs ago', category: 'foryou', action: 'show-results' },
      { icon: Icons.gift(16, '#fff'), bg: C.success, title: 'New Salon Alert', body: 'Blade & Co. joined with \u20B999 head wash!', time: 'Yesterday', category: 'foryou', gotoSalon: 3 },
      { icon: Icons.check(16, '#fff'), bg: C.info, title: 'Booking Confirmed', body: 'Urban Style on Sun, Mar 29 at 10:30 AM.', time: '2 days ago', category: 'booking', action: 'view-bookings' },
      { icon: Icons.clock(16, '#fff'), bg: C.surface3, title: 'Appointment Reminder', body: 'Your haircut at Glow Beauty is tomorrow.', time: '3 days ago', category: 'booking', action: 'view-bookings' },
      { icon: Icons.starFilled(16, '#fff'), bg: C.saffron, title: 'Rate Your Visit', body: 'How was Glow Beauty?', time: '5 days ago', category: 'booking', gotoSalon: 5 },
    ]);

  const section = (label, color, icon, category, alert) => {
    const items = ns.filter(n => n.category === category);
    if (!items.length) return '';
    return `
      <div style="font-size:11px;font-weight:800;color:${color};text-transform:uppercase;letter-spacing:0.1em;margin:16px 0 10px;display:flex;align-items:center;gap:5px">${icon || ''}${label}</div>
      ${items.map(n => `
        <div class="notif-item${alert ? ' notif-item--alert' : ''}" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}`;
  };

  const body = ns.length
    ? `${section('Flash Alert', C.error, Icons.lightning(12, C.error), 'flash', true)}
       ${section('For You', C.primary, Icons.mapPin(12, C.primary), 'foryou', false)}
       ${section('Booking Updates', C.text3, '', 'booking', false)}`
    : `<div class="empty-state" style="padding:56px 12px">
        <div class="empty-state__icon">${Icons.bell(28, C.primary)}</div>
        <div class="empty-state__title">No notifications yet</div>
        <div class="empty-state__subtitle">Booking updates and offers from salons will show up here.</div>
      </div>`;

  return Shell(`
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px;display:flex;align-items:center;gap:6px">${Icons.bell(20, C.text)} Notifications</span>
    </div>

    <div style="padding:8px 20px 24px">
      ${body}
    </div>
  `, { activeTab: 'home' });
}
