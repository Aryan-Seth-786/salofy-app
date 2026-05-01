/* ═══════════════════════════════════════════════════
   SALOFY APP CONTROLLER (APP MODE)
   Single-screen navigation for webview/app converters
   ═══════════════════════════════════════════════════ */

/* ── Global App State ── */
const AppState = {
  currentScreen: 'splash',
  history: [],
  selectedSalon: salons[0],
  selectedServices: [],
  salonServices: [],
  salonTab: 'Services',
  favorites: new Set([1, 4]),
  searchQuery: '',
  booking: { dateIdx: 1, time: '10:30' },
  rescheduleBooking: null,
  activeFilters: new Set(),
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
  { id: 'splash',              render: renderSplash },
  { id: 'login',               render: renderLogin },
  { id: 'otp',                 render: renderOTP },
  { id: 'home',                render: renderHome },
  { id: 'search-input',        render: renderSearchInput },
  { id: 'search-results',      render: renderSearchResults },
  { id: 'salon-starter',       render: () => { AppState.selectedSalon = salons[2]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'salon-growth',        render: () => { AppState.selectedSalon = salons[1]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'salon-premium',       render: () => { AppState.selectedSalon = salons[0]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'booking',             render: renderBooking },
  { id: 'booking-confirmed',   render: renderBookingConfirmed },
  { id: 'deals',               render: renderDeals },
  { id: 'notifications',       render: renderNotifications },
  { id: 'my-bookings',         render: renderMyBookings },
  { id: 'reschedule',          render: renderReschedule },
  { id: 'favorites',           render: renderFavorites },
  { id: 'profile',             render: renderProfile },
  { id: 'edit-profile',        render: renderEditProfile },
  { id: 'saved-addresses',     render: renderSavedAddresses },
  { id: 'refer-earn',          render: renderReferEarn },
  { id: 'notification-settings', render: renderNotificationSettings },
  { id: 'help-support',        render: renderHelpSupport },
  { id: 'dashboard-growth',    render: renderDashboardGrowth },
  { id: 'dashboard-premium',   render: renderDashboardPremium },
];

/* ── Navigation ── */
function navigate(screenId, params = {}) {
  if (AppState.currentScreen !== screenId) {
    AppState.history.push(AppState.currentScreen);
    if (AppState.history.length > 20) AppState.history.shift();
  }
  Object.assign(AppState, params);
  AppState.currentScreen = screenId;

  const screen = screens.find(s => s.id === screenId);
  if (!screen) return;

  document.getElementById('app').innerHTML = screen.render();

  const pc = document.querySelector('.phone-content');
  if (pc) pc.scrollTop = 0;
}

function goBack() {
  const prev = AppState.history.pop();
  navigate(prev || 'home');
}

/* ── Go To Salon ── */
function goToSalon(salonId, preSelected = []) {
  const salon = salons.find(s => s.id === salonId);
  if (!salon) return;
  const screenId = salon.tier === 'starter' ? 'salon-starter' : salon.tier === 'growth' ? 'salon-growth' : 'salon-premium';
  navigate(screenId, {
    selectedSalon: salon,
    salonServices: preSelected.filter(sid => salon.services[sid]),
    salonTab: 'Services',
  });
}

/* ── Service Toggle ── */
function toggleSalonService(svcId, phoneEl) {
  const s = AppState.selectedSalon;
  if (!s.services[svcId]) return;
  const idx = AppState.salonServices.indexOf(svcId);
  if (idx > -1) AppState.salonServices.splice(idx, 1);
  else AppState.salonServices.push(svcId);

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
}

function updateSalonSummaryBar(phoneEl) {
  const s = AppState.selectedSalon;
  const svcs = AppState.salonServices.filter(sid => s.services[sid]);
  const subtotal = svcs.reduce((a, sid) => a + s.services[sid], 0);
  const bar = phoneEl.querySelector('.salon-summary-bar');
  if (!bar) return;
  if (svcs.length === 0) {
    bar.style.display = 'none';
  } else {
    bar.style.display = 'flex';
    const countEl = bar.querySelector('.ssb-count');
    const priceEl = bar.querySelector('.ssb-price');
    if (countEl) countEl.textContent = `${svcs.length} service${svcs.length > 1 ? 's' : ''}`;
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
        <button onclick="navigate('home')" class="btn--danger-solid">Yes, Cancel</button>
      </div>
    </div>`;
}

/* ── Event Delegation ── */
function initEvents() {
  document.getElementById('app').addEventListener('click', function(e) {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
      e.stopPropagation();
      const nav = navEl.dataset.nav;
      switch (nav) {
        case 'home':          navigate('home'); break;
        case 'search':        AppState.activeFilters = new Set(); navigate('search-input'); break;
        case 'favorites':     navigate('favorites'); break;
        case 'bookings':      navigate('my-bookings'); break;
        case 'profile':       navigate('profile'); break;
        case 'back':          goBack(); break;
        case 'notifications': navigate('notifications'); break;
        case 'deals':         navigate('deals'); break;
        default:              navigate(nav);
      }
      return;
    }

    const tabEl = e.target.closest('.tab[data-panel]');
    if (tabEl) {
      switchTab(tabEl.dataset.panel, tabEl.closest('.phone-shell'));
      return;
    }

    const svcEl = e.target.closest('[data-svc-toggle]');
    if (svcEl) {
      toggleSalonService(svcEl.dataset.svcToggle, svcEl.closest('.phone-shell'));
      return;
    }

    const favEl = e.target.closest('.fav-btn[data-fav]');
    if (favEl) {
      e.stopPropagation();
      toggleFav(parseInt(favEl.dataset.fav));
      return;
    }

    const salonCard = e.target.closest('[data-goto-salon]');
    if (salonCard && !e.target.closest('.fav-btn')) {
      goToSalon(parseInt(salonCard.dataset.gotoSalon), AppState.selectedServices);
      return;
    }

    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      switch (action) {
        case 'go-otp':           navigate('otp'); break;
        case 'go-home':          navigate('home'); break;
        case 'go-search':        navigate('search-input', { selectedServices: [] }); break;
        case 'show-results':     navigate('search-results', { selectedServices: [...AppState.selectedServices] }); break;
        case 'book-now':         navigate('booking', { salonServices: [...AppState.salonServices] }); break;
        case 'confirm-booking':  navigate('booking-confirmed'); break;
        case 'view-bookings':    navigate('my-bookings'); break;
        case 'go-login':         navigate('login'); break;
        case 'go-profile':       navigate('profile'); break;
        case 'open-deals':
        case 'go-deals':         navigate('deals'); break;
        case 'go-notifications': navigate('notifications'); break;
        case 'filter-open-now':  AppState.activeFilters = new Set(['open-now']);  navigate('search-results'); break;
        case 'filter-under-500': AppState.activeFilters = new Set(['under-500']); navigate('search-results'); break;
        case 'filter-near-me':   AppState.activeFilters = new Set(['near-me']);   navigate('search-results'); break;
        case 'clear-filter':     AppState.activeFilters.delete(actionEl.dataset.filter); navigate('search-results'); break;
      }
      return;
    }

    const toggleEl = e.target.closest('.toggle');
    if (toggleEl) {
      handleToggle(toggleEl);
      return;
    }

    const accordionHeader = e.target.closest('.accordion__header');
    if (accordionHeader) {
      const item = accordionHeader.closest('.accordion__item');
      const wasOpen = item.classList.contains('accordion__item--open');
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => i.classList.remove('accordion__item--open'));
      if (!wasOpen) item.classList.add('accordion__item--open');
      return;
    }

    const searchSvcEl = e.target.closest('[data-search-svc]');
    if (searchSvcEl) {
      const svcId = searchSvcEl.dataset.searchSvc;
      const idx = AppState.selectedServices.indexOf(svcId);
      if (idx > -1) AppState.selectedServices.splice(idx, 1);
      else AppState.selectedServices.push(svcId);
      if (AppState.currentScreen === 'search-input') {
        const screen = screens.find(s => s.id === 'search-input');
        document.getElementById('app').innerHTML = screen.render();
      }
      return;
    }
  });
}

/* ── Initialise ── */
function init() {
  navigate('splash');
  initEvents();
  setTimeout(() => navigate('login'), 2000);
}

document.addEventListener('DOMContentLoaded', init);
