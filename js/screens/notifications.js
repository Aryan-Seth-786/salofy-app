function renderNotifications() {
  const ns = [
    { icon: Icons.lightning(16, '#fff'), bg: C.error, title: 'Flash Deal: 50% Off Facials!', body: 'Luxe Hair Studio \u2014 only 2 hrs left.', time: '12 min ago', category: 'flash', action: 'go-deals' },
    { icon: Icons.mapPin(16, '#fff'), bg: C.primary, title: 'Weekend Picks Near You', body: '3 salons in Kharar have special offers.', time: '2 hrs ago', category: 'foryou', action: 'show-results' },
    { icon: Icons.gift(16, '#fff'), bg: C.success, title: 'New Salon Alert', body: 'Blade & Co. joined with \u20B999 head wash!', time: 'Yesterday', category: 'foryou', gotoSalon: 3 },
    { icon: Icons.check(16, '#fff'), bg: C.info, title: 'Booking Confirmed', body: 'Urban Style on Sun, Mar 29 at 10:30 AM.', time: '2 days ago', category: 'booking', action: 'view-bookings' },
    { icon: Icons.clock(16, '#fff'), bg: C.surface3, title: 'Appointment Reminder', body: 'Your haircut at Glow Beauty is tomorrow.', time: '3 days ago', category: 'booking', action: 'view-bookings' },
    { icon: Icons.starFilled(16, '#fff'), bg: C.saffron, title: 'Rate Your Visit', body: 'How was Glow Beauty?', time: '5 days ago', category: 'booking', gotoSalon: 5 },
  ];

  return Shell(`
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px;display:flex;align-items:center;gap:6px">${Icons.bell(20, C.text)} Notifications</span>
    </div>

    <div style="padding:8px 20px">
      <!-- Flash Alert -->
      <div style="font-size:10px;font-weight:800;color:${C.error};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;display:flex;align-items:center;gap:5px">${Icons.lightning(12, C.error)} Flash Alert</div>
      ${ns.filter(n => n.category === 'flash').map(n => `
        <div class="notif-item notif-item--alert" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}

      <!-- For You -->
      <div style="font-size:10px;font-weight:800;color:${C.primary};text-transform:uppercase;letter-spacing:0.1em;margin:16px 0 10px;display:flex;align-items:center;gap:5px">${Icons.mapPin(12, C.primary)} For You</div>
      ${ns.filter(n => n.category === 'foryou').map(n => `
        <div class="notif-item" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}

      <!-- Booking Updates -->
      <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em;margin:16px 0 10px">Booking Updates</div>
      ${ns.filter(n => n.category === 'booking').map(n => `
        <div class="notif-item" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'home' });
}
