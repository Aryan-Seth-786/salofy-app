/* ═══════════════════════════════════════════════════
   SALOFY APP CONTROLLER
   State management, navigation, event delegation
   ═══════════════════════════════════════════════════ */

/* ── Global App State ── */
const AppState = {
  currentScreen: 'home',
  history: [],
  selectedSalon: salons[0],          // salon object
  selectedServices: [],              // services picked in search (pre-fill salon)
  salonServices: [],                 // services selected on salon profile page
  salonPackages: [],                 // packages selected on salon profile page
  salonTab: 'Services',
  bookingsTab: null,               // null = overview (all), 'Upcoming', or 'Completed'
  user: { name: 'Aryan' },
  favorites: new Set([1, 4]),
  searchQuery: '',
  booking: { dateIdx: 1, time: '10:30' },
  rescheduleBooking: null,           // booking being rescheduled
  mapActiveSalon: null,              // selected salon on map screen
  searchViewMode: 'list',            // 'list' or 'map' on search results
  genderFilter: 'all',               // 'all' | 'men' | 'women' — home screen toggle
  activeFilters: new Set(),          // active quick-filter chips
};

function isSalonOpen(salon) {
  if (!salon.hours) return false;
  const m = salon.hours.match(/(\d+)\s*(AM|PM)\s*-\s*(\d+)\s*(AM|PM)/i);
  if (!m) return false;
  let oh = parseInt(m[1]), op = m[2].toUpperCase(), ch = parseInt(m[3]), cp = m[4].toUpperCase();
  if (op === 'PM' && oh !== 12) oh += 12;
  if (op === 'AM' && oh === 12) oh = 0;
  if (cp === 'PM' && ch !== 12) ch += 12;
  if (cp === 'AM' && ch === 12) ch = 0;
  const cur = new Date().getHours() * 60 + new Date().getMinutes();
  return cur >= oh * 60 && cur < ch * 60;
}

/* ── Screen Registry ── */
const screens = [
  // Auth
  { id: 'splash',              label: 'Splash',              group: 'Auth',       render: renderSplash },
  { id: 'login',               label: 'Login',               group: 'Auth',       render: renderLogin },
  { id: 'otp',                 label: 'OTP',                 group: 'Auth',       render: renderOTP },
  // Customer
  { id: 'home',                label: 'Home',                group: 'Customer',   render: renderHome },
  { id: 'map',                 label: 'Map',                 group: 'Customer',   render: renderMap },
  { id: 'search-input',        label: 'Search',              group: 'Customer',   render: renderSearchInput },
  { id: 'search-results',      label: 'Results',             group: 'Customer',   render: renderSearchResults },
  { id: 'salon-starter',       label: 'Salon (Starter)',     group: 'Customer',   render: renderSalonProfile },
  { id: 'salon-growth',        label: 'Salon (Growth)',      group: 'Customer',   render: renderSalonProfile },
  { id: 'salon-premium',       label: 'Salon (Premium)',     group: 'Customer',   render: renderSalonProfile },
  { id: 'booking',             label: 'Booking',             group: 'Customer',   render: renderBooking },
  { id: 'booking-confirmed',   label: 'Confirmed',           group: 'Customer',   render: renderBookingConfirmed },
  { id: 'deals',               label: 'Deals',               group: 'Customer',   render: renderDeals },
  // Activity
  { id: 'notifications',       label: 'Alerts',              group: 'Activity',   render: renderNotifications },
  { id: 'my-bookings',         label: 'My Bookings',         group: 'Activity',   render: renderMyBookings },
  { id: 'reschedule',          label: 'Reschedule',          group: 'Activity',   render: renderReschedule },
  { id: 'favorites',           label: 'Saved',               group: 'Activity',   render: renderFavorites },
  // Account
  { id: 'profile',             label: 'Profile',             group: 'Account',    render: renderProfile },
  { id: 'edit-profile',        label: 'Edit Profile',        group: 'Account',    render: renderEditProfile },
  { id: 'saved-addresses',     label: 'Addresses',           group: 'Account',    render: renderSavedAddresses },
  { id: 'refer-earn',          label: 'Refer & Earn',        group: 'Account',    render: renderReferEarn },
  { id: 'notification-settings',label: 'Notif. Settings',   group: 'Account',    render: renderNotificationSettings },
  { id: 'help-support',        label: 'Help',                group: 'Account',    render: renderHelpSupport },
  // Dashboard
  { id: 'dashboard-growth',    label: 'Dashboard (Growth)',  group: 'Dashboard',  render: renderDashboardGrowth },
  { id: 'dashboard-premium',   label: 'Dashboard (Premium)', group: 'Dashboard',  render: renderDashboardPremium },
];

/* ── Navigation ── */
function navigate(screenId, params = {}) {
  // Push current to history (for back button)
  if (AppState.currentScreen !== screenId) {
    AppState.history.push(AppState.currentScreen);
    if (AppState.history.length > 20) AppState.history.shift();
  }

  // Apply state params
  Object.assign(AppState, params);
  AppState.currentScreen = screenId;

  // Re-render target screen
  const screen = screens.find(s => s.id === screenId);
  if (!screen) return;
  const container = document.getElementById('screen-' + screenId);
  if (container) {
    container.innerHTML = screen.render() + `<div class="screen-label">${screen.label}<span>${screen.group}</span></div>`;
  }

  // Update visible screen
  document.querySelectorAll('.screen-container').forEach(el => {
    el.classList.toggle('screen-container--active', el.id === 'screen-' + screenId);
  });
  // Update nav pills
  document.querySelectorAll('.screen-nav__btn').forEach(btn => {
    btn.classList.toggle('screen-nav__btn--active', btn.dataset.screen === screenId);
  });

  // Scroll phone content to top
  const pc = container && container.querySelector('.phone-content');
  if (pc) pc.scrollTop = 0;
}

function goBack() {
  const prev = AppState.history.pop();
  navigate(prev || 'home');
}

/* ── Go To Salon ── */
function goToSalon(salonId, preSelected = [], tab = 'Services', preSelectedPkgs = []) {
  const salon = salons.find(s => s.id === salonId);
  if (!salon) return;
  const screenId = salon.tier === 'starter' ? 'salon-starter' : salon.tier === 'growth' ? 'salon-growth' : 'salon-premium';
  navigate(screenId, {
    selectedSalon: salon,
    salonServices: preSelected.filter(sid => salon.services[sid]),
    salonPackages: preSelectedPkgs,
    salonTab: tab,
  });
}

/* ── Service Toggle (on salon page) ── */
function toggleSalonService(svcId, phoneEl) {
  const s = AppState.selectedSalon;
  if (!s.services[svcId]) return;
  const idx = AppState.salonServices.indexOf(svcId);
  if (idx > -1) AppState.salonServices.splice(idx, 1);
  else AppState.salonServices.push(svcId);

  // Update row appearance
  const row = phoneEl.querySelector(`[data-svc-toggle="${svcId}"]`);
  if (row) {
    const sel = AppState.salonServices.includes(svcId);
    row.classList.toggle('service-select--active', sel);
    const chk = row.querySelector('.svc-chk');
    if (chk) {
      chk.style.background = sel ? C.primary : 'transparent';
      chk.style.borderColor = sel ? C.primary : C.border;
      chk.innerHTML = sel ? Icons.check(14, '#fff') : '';
    }
  }
  updateSalonSummaryBar(phoneEl);
  updateSuggestedPackages(phoneEl);
}

/* ── Package Toggle (on salon page) ── */
function toggleSalonPackage(pkgId, phoneEl) {
  const s = AppState.selectedSalon;
  const pkg = (s.packages || []).find(p => p.id === pkgId);
  if (!pkg) return;
  const idx = AppState.salonPackages.indexOf(pkgId);
  if (idx > -1) {
    AppState.salonPackages.splice(idx, 1);
  } else {
    AppState.salonPackages.push(pkgId);
    // Deselect any individually-selected services that are covered by this package
    (pkg.services || []).forEach(svcId => {
      const svcIdx = AppState.salonServices.indexOf(svcId);
      if (svcIdx > -1) {
        AppState.salonServices.splice(svcIdx, 1);
        const row = phoneEl.querySelector(`[data-svc-toggle="${svcId}"]`);
        if (row) {
          row.classList.remove('service-select--active');
          const chk = row.querySelector('.svc-chk');
          if (chk) { chk.style.background = 'transparent'; chk.style.borderColor = C.border; chk.innerHTML = ''; }
        }
      }
    });
    updateSuggestedPackages(phoneEl);
  }

  // Update card appearance
  const card = phoneEl.querySelector(`[data-pkg-toggle="${pkgId}"]`);
  if (card) {
    const sel = AppState.salonPackages.includes(pkgId);
    card.classList.toggle('pkg-card--active', sel);
    const chk = card.querySelector('.pkg-card__check');
    if (chk) {
      chk.style.background = sel ? C.primary : 'transparent';
      chk.style.borderColor = sel ? C.primary : C.border;
      chk.innerHTML = sel ? Icons.check(13, '#fff') : '';
    }
    // Update service chips color
    card.querySelectorAll('[data-pkg-chip]').forEach(chip => {
      chip.style.background = sel ? C.primaryS : C.surface2;
      chip.style.borderColor = sel ? C.primary + '44' : C.border;
      chip.style.color = sel ? C.primary : C.text2;
    });
  }
  updateSalonSummaryBar(phoneEl);
}

function updateSuggestedPackages(phoneEl) {
  const el = phoneEl.querySelector('[data-suggested-pkgs]');
  if (!el) return;
  el.innerHTML = SuggestedPackagesHtml(AppState.selectedSalon, AppState.salonServices);
}

function updateSalonSummaryBar(phoneEl) {
  const s = AppState.selectedSalon;
  const svcs = AppState.salonServices.filter(sid => s.services[sid]);
  const pkgs = AppState.salonPackages.filter(pkgId => (s.packages||[]).some(p => p.id === pkgId));
  const svcTotal = svcs.reduce((a, sid) => a + s.services[sid], 0);
  const pkgTotal = pkgs.reduce((a, pkgId) => { const p = (s.packages||[]).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
  const subtotal = svcTotal + pkgTotal;
  const totalItems = svcs.length + pkgs.length;
  const bar = phoneEl.querySelector('.salon-summary-bar');
  if (!bar) return;
  if (totalItems === 0) {
    bar.style.display = 'none';
  } else {
    bar.style.display = 'flex';
    const countEl = bar.querySelector('.ssb-count');
    const priceEl = bar.querySelector('.ssb-price');
    if (countEl) {
      if (svcs.length > 0 && pkgs.length > 0) {
        countEl.textContent = `${svcs.length} service${svcs.length > 1 ? 's' : ''} + ${pkgs.length} package${pkgs.length > 1 ? 's' : ''}`;
      } else if (svcs.length > 0) {
        countEl.textContent = `${svcs.length} service${svcs.length > 1 ? 's' : ''}`;
      } else {
        countEl.textContent = `${pkgs.length} package${pkgs.length > 1 ? 's' : ''}`;
      }
    }
    if (priceEl) priceEl.textContent = `\u20B9${subtotal}`;
  }
}

/* ── Tab Switching ── */
function switchTab(panelName, phoneEl) {
  phoneEl.querySelectorAll('.tab[data-panel]').forEach(t => {
    t.classList.toggle('tab--active', t.dataset.panel === panelName);
  });
  phoneEl.querySelectorAll('.tab-panel').forEach(p => {
    p.style.display = p.dataset.panel === panelName ? '' : 'none';
  });
  AppState.salonTab = panelName;
}

/* ── Favorites ── */
function toggleFav(salonId) {
  if (AppState.favorites.has(salonId)) AppState.favorites.delete(salonId);
  else AppState.favorites.add(salonId);
  // Update heart icons on current screen
  document.querySelectorAll(`.fav-btn[data-fav="${salonId}"]`).forEach(btn => {
    const isFav = AppState.favorites.has(salonId);
    btn.innerHTML = Icons.heart(16, isFav ? C.error : C.text3, isFav);
  });
}

/* ── Toggle Switch ── */
function handleToggle(el) {
  el.classList.toggle('toggle--on');
}

/* ── Cancel Booking Inline ── */
function confirmCancelBooking(idx) {
  const row = document.querySelector(`[data-booking-idx="${idx}"]`);
  if (!row) return;
  row.innerHTML = `
    <div style="text-align:center;padding:12px 0">
      <div style="font-size:13px;font-weight:600;color:${C.error};margin-bottom:10px">Cancel this booking?</div>
      <div style="display:flex;gap:8px">
        <button onclick="this.closest('[data-booking-idx]').outerHTML=''" style="flex:1;padding:10px;background:${C.surface2};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-size:12px;cursor:pointer;color:${C.text}">Keep Booking</button>
        <button onclick="navigate('home')" style="flex:1;padding:10px;background:${C.error};color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer">Yes, Cancel</button>
      </div>
    </div>`;
}

/* ── Event Delegation ── */
function initEvents() {
  document.getElementById('app').addEventListener('click', function(e) {
    // Bottom nav & data-nav links
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
      e.stopPropagation();
      const nav = navEl.dataset.nav;
      switch (nav) {
        case 'home':         navigate('home'); break;
        case 'map':          navigate('map'); break;
        case 'search':       AppState.activeFilters = new Set(); navigate('search-input'); break;
        case 'favorites':    navigate('favorites'); break;
        case 'bookings':     navigate('my-bookings'); break;
        case 'profile':      navigate('profile'); break;
        case 'back':         goBack(); break;
        case 'notifications':navigate('notifications'); break;
        case 'deals':        navigate('deals'); break;
        default:             navigate(nav);
      }
      return;
    }

    // Tab switching
    const tabEl = e.target.closest('.tab[data-panel]');
    if (tabEl) {
      switchTab(tabEl.dataset.panel, tabEl.closest('.phone-shell'));
      return;
    }

    // Service toggle on salon page
    const svcEl = e.target.closest('[data-svc-toggle]');
    if (svcEl) {
      toggleSalonService(svcEl.dataset.svcToggle, svcEl.closest('.phone-shell'));
      return;
    }

    // Package toggle on salon page
    const pkgEl = e.target.closest('[data-pkg-toggle]');
    if (pkgEl) {
      toggleSalonPackage(pkgEl.dataset.pkgToggle, pkgEl.closest('.phone-shell'));
      return;
    }

    // Suggested package tap — pre-select it and jump to Packages tab
    const suggestPkgEl = e.target.closest('[data-suggest-pkg]');
    if (suggestPkgEl) {
      e.stopPropagation();
      const pkgId = suggestPkgEl.dataset.suggestPkg;
      const phoneEl = suggestPkgEl.closest('.phone-shell');
      if (!AppState.salonPackages.includes(pkgId)) {
        toggleSalonPackage(pkgId, phoneEl);
      }
      switchTab('Packages', phoneEl);
      return;
    }

    // Favorite toggle
    const favEl = e.target.closest('.fav-btn[data-fav]');
    if (favEl) {
      e.stopPropagation();
      toggleFav(parseInt(favEl.dataset.fav));
      return;
    }

    // Map pin tap (highlight salon on map screen)
    const mapPinEl = e.target.closest('[data-map-pin]');
    if (mapPinEl) {
      e.stopPropagation();
      const salonId = parseInt(mapPinEl.dataset.mapPin);
      const salon = salons.find(s => s.id === salonId);
      if (salon) {
        // If already active, navigate to salon profile
        if (AppState.mapActiveSalon && AppState.mapActiveSalon.id === salonId) {
          goToSalon(salonId, []);
        } else {
          AppState.mapActiveSalon = salon;
          navigate('map');
        }
      }
      return;
    }

    // Go to salon Packages tab (from Popular Packages cards in search)
    const pkgSalonEl = e.target.closest('[data-goto-package-salon]');
    if (pkgSalonEl) {
      e.stopPropagation();
      goToSalon(parseInt(pkgSalonEl.dataset.gotoPackageSalon), [], 'Packages');
      return;
    }

    // Go to a specific package pre-selected on salon profile (from package match callout on results card)
    const gotoPackageEl = e.target.closest('[data-goto-package]');
    if (gotoPackageEl) {
      e.stopPropagation();
      const parts = gotoPackageEl.dataset.gotoPackage.split(':');
      goToSalon(parseInt(parts[0]), [], 'Packages', [parts[1]]);
      return;
    }

    // Go to salon from card
    const salonCard = e.target.closest('[data-goto-salon]');
    if (salonCard && !e.target.closest('.fav-btn')) {
      goToSalon(parseInt(salonCard.dataset.gotoSalon), AppState.selectedServices);
      return;
    }

    // Generic data-action buttons
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      switch (action) {
        case 'go-otp':      navigate('otp'); break;
        case 'go-home':     navigate('home'); break;
        case 'go-search':   navigate('search-input', { selectedServices: [] }); break;
        case 'show-results':
          AppState.activeFilters = new Set();
          navigate('search-results', { selectedServices: [...AppState.selectedServices] });
          break;
        case 'book-now':
          navigate('booking', { salonServices: [...AppState.salonServices], salonPackages: [...AppState.salonPackages] });
          break;
        case 'confirm-booking':
          navigate('booking-confirmed');
          break;
        case 'view-bookings':
          navigate('my-bookings');
          break;
        case 'go-login':
          navigate('login');
          break;
        case 'go-profile':
          navigate('profile');
          break;
        case 'search-view-list':
          AppState.searchViewMode = 'list';
          navigate('search-results');
          break;
        case 'search-view-map':
          AppState.searchViewMode = 'map';
          navigate('search-results');
          break;
        case 'open-deals':
        case 'go-deals':
          navigate('deals');
          break;
        case 'go-notifications':
          navigate('notifications');
          break;
        case 'go-otp':
          navigate('otp');
          break;
        case 'go-home':
          navigate('home');
          break;
        case 'filter-open-now':
          AppState.activeFilters = new Set(['open-now']);
          navigate('search-results');
          break;
        case 'filter-under-500':
          AppState.activeFilters = new Set(['under-500']);
          navigate('search-results');
          break;
        case 'filter-near-me':
          AppState.activeFilters = new Set(['near-me']);
          navigate('search-results');
          break;
        case 'clear-filter':
          AppState.activeFilters.delete(actionEl.dataset.filter);
          navigate('search-results');
          break;
      }
      return;
    }

    // Toggle switch
    const toggleEl = e.target.closest('.toggle');
    if (toggleEl) {
      handleToggle(toggleEl);
      return;
    }

    // Accordion
    const accordionHeader = e.target.closest('.accordion__header');
    if (accordionHeader) {
      const item = accordionHeader.closest('.accordion__item');
      const wasOpen = item.classList.contains('accordion__item--open');
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => i.classList.remove('accordion__item--open'));
      if (!wasOpen) item.classList.add('accordion__item--open');
      return;
    }

    // Search service pill toggle
    const searchSvcEl = e.target.closest('[data-search-svc]');
    if (searchSvcEl) {
      const svcId = searchSvcEl.dataset.searchSvc;
      const idx = AppState.selectedServices.indexOf(svcId);
      if (idx > -1) AppState.selectedServices.splice(idx, 1);
      else AppState.selectedServices.push(svcId);
      // Re-render search input
      const scr = AppState.currentScreen;
      if (scr === 'search-input') {
        const container = document.getElementById('screen-search-input');
        const screen = screens.find(s => s.id === 'search-input');
        container.innerHTML = screen.render() + `<div class="screen-label">Search<span>Customer</span></div>`;
      }
      return;
    }
  });
}

/* ── Show screen without re-render (top nav pill click) ── */
function showScreenFromNav(screenId) {
  const salonDefaults = {
    'salon-starter': { selectedSalon: salons[2], salonServices: [], salonPackages: [], salonTab: 'Services' },
    'salon-growth':  { selectedSalon: salons[1], salonServices: [], salonPackages: [], salonTab: 'Services' },
    'salon-premium': { selectedSalon: salons[0], salonServices: [], salonPackages: [], salonTab: 'Services' },
  };
  navigate(screenId, salonDefaults[screenId] || {});
}

/* ── Initialise ── */
function init() {
  const wrapper = document.getElementById('app');

  // Build top nav
  const groups = [...new Set(screens.map(s => s.group))];
  let navHtml = '<div class="screen-nav">';
  groups.forEach(group => {
    navHtml += '<div class="screen-nav__group">';
    screens.filter(s => s.group === group).forEach(s => {
      navHtml += `<button class="screen-nav__btn${s.id === AppState.currentScreen ? ' screen-nav__btn--active' : ''}" data-screen="${s.id}" onclick="showScreenFromNav('${s.id}')">${s.label}</button>`;
    });
    navHtml += '</div>';
  });
  navHtml += '</div>';

  // Build all screen containers
  let screensHtml = '';
  screens.forEach(s => {
    screensHtml += `<div id="screen-${s.id}" class="screen-container${s.id === AppState.currentScreen ? ' screen-container--active' : ''}">
      ${s.render()}
      <div class="screen-label">${s.label}<span>${s.group}</span></div>
    </div>`;
  });

  wrapper.innerHTML = `
    <div class="demo-header">
      <div class="demo-header__logo">Salofy</div>
      <div class="demo-header__sub">Complete Frontend Design Reference &mdash; All flows interactive</div>
    </div>
    ${navHtml}
    ${screensHtml}
  `;

  initEvents();
}

document.addEventListener('DOMContentLoaded', init);
