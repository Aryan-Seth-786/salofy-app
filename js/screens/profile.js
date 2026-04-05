function renderProfile() {
  const menuItems = [
    { icon: Icons.user(16, C.text2),     label: 'Edit Profile',          sub: 'Name, email, phone',     nav: 'edit-profile'            },
    { icon: Icons.mapPin(16, C.text2),   label: 'Saved Addresses',       sub: 'Home, work locations',   nav: 'saved-addresses'         },
    { icon: Icons.gift(16, C.text2),     label: 'Refer & Earn',          sub: 'Share Salofy, get \u20B9100', nav: 'refer-earn'         },
    { icon: Icons.bell(16, C.text2),     label: 'Notification Settings', sub: 'Push, email',            nav: 'notification-settings'   },
    { icon: Icons.help(16, C.text2),     label: 'Help & Support',        sub: 'FAQs, contact us',       nav: 'help-support'            },
    { icon: Icons.document(16, C.text2), label: 'Terms & Privacy',       sub: 'Legal info',             nav: ''                        },
  ];

  return Shell(`
    <div style="padding:44px 20px 20px">
      <div style="font-size:20px;font-weight:700;color:${C.text};margin-bottom:20px">My Profile</div>

      <!-- Avatar Row -->
      <div style="display:flex;gap:14px;align-items:center;margin-bottom:20px">
        <div style="position:relative">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#B8860B,#D4A017);display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;font-weight:700">A</div>
        </div>
        <div>
          <div style="font-size:17px;font-weight:600;color:${C.text}">Aryan</div>
          <div style="font-size:12px;color:${C.text3}">+91 98765 43210</div>
          <div data-nav="edit-profile" style="font-size:11px;color:${C.primary};font-weight:500;margin-top:2px;cursor:pointer;display:inline-flex;align-items:center;gap:3px">
            ${Icons.edit(11, C.primary)} Edit profile
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px">
        ${[
          { v:'12', l:'Bookings',  action: 'view-bookings' },
          { v:'3',  l:'Favorites', action: 'go-favorites'  },
          { v:'\u20B92,400', l:'Saved',    action: ''               },
        ].map(s => `
          <div data-action="${s.action}" style="background:${C.surface2};border:1px solid ${C.border};border-radius:12px;padding:12px 10px;text-align:center;${s.action ? 'cursor:pointer' : ''}">
            <div style="font-size:18px;font-weight:700;color:${C.primary}">${s.v}</div>
            <div style="font-size:10px;color:${C.text3};margin-top:2px">${s.l}</div>
          </div>
        `).join('')}
      </div>

      <!-- Menu -->
      ${menuItems.map((it, i) => `
        <div ${it.nav ? `data-nav="${it.nav}"` : ''} style="display:flex;align-items:center;gap:12px;padding:14px 0;${i < menuItems.length - 1 ? `border-bottom:1px solid ${C.borderS}` : ''};${it.nav ? 'cursor:pointer' : ''}">
          <div style="width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${it.icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500;color:${C.text}">${it.label}</div>
            <div style="font-size:11px;color:${C.text3}">${it.sub}</div>
          </div>
          ${Icons.forward(16, C.text3)}
        </div>
      `).join('')}

      <!-- Logout -->
      <button data-action="go-login" style="width:100%;margin-top:20px;padding:14px;background:${C.errorS};color:${C.error};border:1px solid rgba(192,57,43,0.2);border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${Icons.logout(16, C.error)} Log Out
      </button>
      <div style="text-align:center;margin-top:16px;font-size:11px;color:${C.text3}">Salofy v1.0</div>
    </div>
  `, { activeTab: 'profile' });
}
