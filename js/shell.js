/* ═══════════════════════════════════════════════════
   SHELL & NAVIGATION
   Phone frame wrapper and bottom navigation
   ═══════════════════════════════════════════════════ */

function Shell(innerHTML, opts = {}) {
  const { noNav = false, statusDark = false, activeTab = 'home', navType = 'customer' } = opts;
  return `
    <div class="phone-shell${statusDark ? ' phone-shell--dark' : ''}">
      <div class="phone-notch${statusDark ? ' phone-notch--dark' : ''}"></div>
      <div class="phone-status${statusDark ? ' phone-status--dark' : ''}">
        <span>9:41</span>
        <span class="phone-status__icons">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="${statusDark?'#fff':C.text}"><rect x="0" y="8" width="3" height="4" rx="0.5" opacity="0.4"/><rect x="4" y="5" width="3" height="7" rx="0.5" opacity="0.6"/><rect x="8" y="2" width="3" height="10" rx="0.5" opacity="0.8"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="${statusDark?'#fff':C.text}" stroke-width="1.5"><path d="M1 8.5C3.5 3.5 12.5 3.5 15 8.5"/><path d="M4 7C5.8 4.5 10.2 4.5 12 7"/><circle cx="8" cy="9.5" r="1.5" fill="${statusDark?'#fff':C.text}" stroke="none"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none" stroke="${statusDark?'#fff':C.text}" stroke-width="1"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5"/><rect x="22" y="3.5" width="2.5" height="5" rx="1" fill="${statusDark?'#fff':C.text}"/><rect x="2" y="2" width="16" height="8" rx="1" fill="${statusDark?'#fff':C.text}"/></svg>
        </span>
      </div>
      <div class="phone-content${noNav ? ' phone-content--no-nav' : ''} hide-sb" style="overflow-y:auto">
        ${innerHTML}
      </div>
      ${noNav ? '' : (navType === 'dashboard' ? DashboardNav(activeTab) : BottomNav(activeTab))}
    </div>
  `;
}

function BottomNav(active) {
  const items = [
    { key: 'home', label: 'Home', icon: (c, f) => Icons.home(22, c, f) },
    { key: 'map', label: 'Map', icon: (c) => Icons.mapPin(22, c) },
    { key: 'favorites', label: 'Saved', icon: (c, f) => Icons.heart(22, c, f) },
    { key: 'bookings', label: 'Bookings', icon: (c) => Icons.calendar(22, c) },
    { key: 'profile', label: 'Profile', icon: (c) => Icons.user(22, c) },
  ];
  return `
    <div class="bottom-nav">
      ${items.map(it => {
        const a = active === it.key;
        const color = a ? C.primary : C.text3;
        return `<button class="bottom-nav__item${a ? ' bottom-nav__item--active' : ''}" data-nav="${it.key}">
          ${it.icon(color, a)}
          ${it.label}
        </button>`;
      }).join('')}
    </div>
  `;
}

function DashboardNav(active) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: (c) => Icons.chartBar(22, c) },
    { key: 'dash-bookings', label: 'Bookings', icon: (c) => Icons.calendar(22, c) },
    { key: 'dash-analytics', label: 'Analytics', icon: (c) => Icons.trendingUp(22, c) },
    { key: 'dash-settings', label: 'Settings', icon: (c) => Icons.settings(22, c) },
  ];
  return `
    <div class="bottom-nav bottom-nav--dashboard">
      ${items.map(it => {
        const a = active === it.key;
        const color = a ? C.primaryL : '#6E6E7A';
        return `<button class="bottom-nav__item${a ? ' bottom-nav__item--active' : ''}" data-nav="${it.key}">
          ${it.icon(color)}
          ${it.label}
        </button>`;
      }).join('')}
    </div>
  `;
}

function BackBtn(color) {
  return `<div class="back-btn" data-action="back">${Icons.back(18, color || C.text)}</div>`;
}
