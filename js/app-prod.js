/* ═══════════════════════════════════════════════════
   GLAZZ APP CONTROLLER (PROD / PWA MODE)
   Single-screen navigation wired to the live API:
   login once → session persists, real bookings,
   favorites, profile, addresses, notifications.
   Load order: after js/api.js, last of all scripts.
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── Global App State ── */
const AppState = {
  currentScreen: 'splash',
  history: [],
  selectedSalon: salons[0],
  selectedServices: [],
  salonServices: [],
  salonPackages: [],
  salonTab: 'Services',
  bookingsTab: null,
  user: null,
  favorites: new Set(),
  searchQuery: '',
  booking: { dateIdx: 1, time: '10:30' },
  rescheduleBooking: null,
  searchViewMode: 'list',
  activeFilters: new Set(),
  genderFilter: 'men',
  mapActiveSalon: null,
  onboardGender: 'all',
  onboardCity: null,
  onboardStep: 0,
  addresses: [],
  notifications: [],
  pendingPhone: null,
  demoOtp: null,
  lastBooking: null,
  editGender: null,
  detailSalonId: null,
  detailType: null,
  detailId: null,
};

/* ── Dynamic booking dates (today + n-1) ── */
function BookingDates(n) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const out = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    out.push({ d: i === 0 ? 'Today' : days[d.getDay()], n: String(d.getDate()), full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}` });
  }
  return out;
}

function fmtTime(t) {
  const m = String(t || '').match(/^(\d+):(\d+)/);
  if (!m) return t || '';
  let h = parseInt(m[1]); const mm = m[2];
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mm} ${ap}`;
}

/* ── Screen Registry ── */
const screens = [
  { id: 'splash',              render: renderSplash },
  { id: 'login',               render: renderLogin },
  { id: 'otp',                 render: renderOTP },
  { id: 'home',                render: renderHome },
  { id: 'map',                 render: renderMap },
  { id: 'search-input',        render: renderSearchInput },
  { id: 'search-results',      render: renderSearchResults },
  { id: 'salon-starter',       render: renderSalonProfile },
  { id: 'salon-growth',        render: renderSalonProfile },
  { id: 'salon-premium',       render: renderSalonProfile },
  { id: 'booking',             render: renderBooking },
  { id: 'booking-confirmed',   render: renderBookingConfirmed },
  { id: 'service-detail',      render: renderServiceDetail },
  { id: 'deals',               render: renderDeals },
  { id: 'notifications',       render: renderNotifications },
  { id: 'my-bookings',         render: renderMyBookings },
  { id: 'reschedule',          render: renderReschedule },
  { id: 'favorites',           render: renderFavorites },
  { id: 'profile',              render: renderProfile },
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

/* ── Service selection (same as demo controller) ── */
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
  if (svcs.length === 0) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  const countEl = bar.querySelector('.ssb-count');
  const priceEl = bar.querySelector('.ssb-price');
  if (countEl) countEl.textContent = `${svcs.length} service${svcs.length > 1 ? 's' : ''}`;
  if (priceEl) priceEl.textContent = `\u20B9${subtotal}`;
}

function switchTab(panelName, phoneEl) {
  phoneEl.querySelectorAll('.tab[data-panel]').forEach(t => {
    t.classList.toggle('tab--active', t.dataset.panel === panelName);
  });
  phoneEl.querySelectorAll('.tab-panel').forEach(p => {
    p.style.display = p.dataset.panel === panelName ? '' : 'none';
  });
  AppState.salonTab = panelName;
}

function handleToggle(el) { el.classList.toggle('toggle--on'); }

/* ── Favorites (API-backed, optimistic) ── */
function toggleFav(salonId) {
  if (!API.token) { toast('Log in to save salons'); navigate('login'); return; }
  const on = !AppState.favorites.has(salonId);
  if (on) AppState.favorites.add(salonId); else AppState.favorites.delete(salonId);
  document.querySelectorAll(`.fav-btn[data-fav="${salonId}"]`).forEach(btn => {
    const isFav = AppState.favorites.has(salonId);
    btn.innerHTML = Icons.heart(16, isFav ? C.error : C.text3, isFav);
  });
  API.toggleFavorite(salonId, on).catch(err => {
    if (on) AppState.favorites.delete(salonId); else AppState.favorites.add(salonId);
    toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message);
  });
}

/* ── Cancel booking (inline confirm, API-backed) ── */
function confirmCancelBooking(idx) {
  const row = document.querySelector(`[data-booking-idx="${idx}"]`);
  if (!row) return;
  row.innerHTML = `
    <div style="text-align:center;padding:12px 0">
      <div style="font-size:13px;font-weight:600;color:${C.error};margin-bottom:10px">Cancel this booking?</div>
      <div style="display:flex;gap:8px">
        <button onclick="this.closest('[data-booking-idx]').outerHTML=''" style="flex:1;padding:10px;background:${C.surface2};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-size:12px;cursor:pointer;color:${C.text}">Keep Booking</button>
        <button onclick="doCancelBooking(${idx})" class="btn--danger-solid">Yes, Cancel</button>
      </div>
    </div>`;
}

async function doCancelBooking(idx) {
  const b = bookings[idx];
  try {
    if (b && b.id) await API.cancelBooking(b.id);
    await hydrateMe();
    toast('Booking cancelled');
    navigate('my-bookings');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

/* ── Auth actions ── */
async function doRequestOtp() {
  const input = document.getElementById('login-phone');
  const phone = (input ? input.value : '').replace(/\D/g, '');
  if (phone.length !== 10) { toast('Enter a valid 10-digit phone number'); return; }
  try {
    const d = await API.requestOtp(phone);
    AppState.pendingPhone = phone;
    AppState.demoOtp = d.demoOtp || null;
    navigate('otp');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

async function doVerifyOtp() {
  const digits = [...document.querySelectorAll('.otp-digit')].map(i => i.value || '').join('');
  if (digits.length !== 6) { toast('Enter the 6-digit code'); return; }
  try {
    await API.verifyOtp(AppState.pendingPhone, digits);
    await hydrateMe();
    AppState.demoOtp = null;
    toast(`Welcome${AppState.user && AppState.user.name ? ', ' + AppState.user.name.split(' ')[0] : ''} 👋`);
    navigate('home');
  } catch (err) {
    [...document.querySelectorAll('.otp-digit')].forEach(i => i.value = '');
    const first = document.querySelector('.otp-digit');
    if (first) first.focus();
    toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message);
  }
}

async function doLogout() {
  await API.logout();
  AppState.user = null;
  AppState.favorites = new Set();
  AppState.notifications = [];
  AppState.addresses = [];
  AppState.bookingsTab = null;
  bookings.length = 0;
  toast('Logged out');
  navigate('login');
}

/* ── Booking actions ── */
async function doConfirmBooking() {
  const s = AppState.selectedSalon;
  if (!s) return;
  const svcIds = AppState.salonServices.filter(sid => s.services[sid]);
  const pkgIds = AppState.salonPackages || [];
  if (svcIds.length + pkgIds.length === 0) { toast('Select at least one service'); return; }
  const date = (BookingDates(6)[AppState.booking.dateIdx] || BookingDates(6)[1]).full;
  const time = fmtTime(AppState.booking.time);
  try {
    const d = await API.createBooking({ salonId: s.id, svcIds, pkgIds, date, time });
    AppState.lastBooking = {
      id: d.booking.id, date, time,
      salon: s, svcIds, pkgIds, total: d.booking.total,
    };
    await hydrateMe();
    navigate('booking-confirmed');
    /* clear the selection once the confirmation has rendered */
    setTimeout(() => { AppState.salonServices = []; AppState.salonPackages = []; }, 400);
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

async function doReschedule() {
  const bk = AppState.rescheduleBooking;
  const date = (BookingDates(8)[AppState.booking.dateIdx] || BookingDates(8)[1]).full;
  const time = fmtTime(AppState.booking.time);
  try {
    if (bk && bk.id) {
      await API.rescheduleBooking(bk.id, date, time);
      await hydrateMe();
      toast('Rescheduled ✓');
    }
    AppState.rescheduleBooking = null;
    navigate('my-bookings');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

/* ── Profile / address actions ── */
async function doSaveProfile() {
  const name = (document.getElementById('ep-name') || {}).value;
  const email = (document.getElementById('ep-email') || {}).value;
  const gender = AppState.editGender;
  try {
    const d = await API.updateMe({
      name: name ? name.trim() : undefined,
      email: email ? email.trim() : undefined,
      gender: gender || undefined,
    });
    AppState.user = d.user;
    toast('Profile saved ✓');
    navigate('profile');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

async function doAddAddress() {
  const label = (document.getElementById('addr-label') || {}).value;
  const address = (document.getElementById('addr-text') || {}).value;
  if (!label || !label.trim() || !address || !address.trim()) { toast('Fill in both fields'); return; }
  try {
    await API.addAddress(label.trim(), address.trim());
    await hydrateMe();
    toast('Address saved ✓');
    navigate('saved-addresses');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

async function doDeleteAddress(id) {
  try {
    await API.deleteAddress(id);
    await hydrateMe();
    navigate('saved-addresses');
  } catch (err) { toast(err.message === 'Failed to fetch' ? 'You appear to be offline' : err.message); }
}

/* ── Event delegation ── */
function initEvents() {
  document.getElementById('app').addEventListener('click', function (e) {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
      e.stopPropagation();
      const nav = navEl.dataset.nav;
      switch (nav) {
        case 'home':          navigate('home'); break;
        case 'map':           navigate('map'); break;
        case 'search':        AppState.activeFilters = new Set(); navigate('search-input'); break;
        case 'favorites':    navigate('favorites'); break;
        case 'bookings':      navigate('my-bookings'); break;
        case 'profile':      navigate('profile'); break;
        case 'back':          goBack(); break;
        case 'notifications': navigate('notifications'); break;
        case 'deals':         navigate('deals'); break;
        default:              navigate(nav);
      }
      return;
    }

    const tabEl = e.target.closest('.tab[data-panel]');
    if (tabEl) { switchTab(tabEl.dataset.panel, tabEl.closest('.phone-shell')); return; }

    const svcEl = e.target.closest('[data-svc-toggle]');
    if (svcEl) { toggleSalonService(svcEl.dataset.svcToggle, svcEl.closest('.phone-shell')); return; }

    const favEl = e.target.closest('.fav-btn[data-fav]');
    if (favEl) { e.stopPropagation(); toggleFav(parseInt(favEl.dataset.fav)); return; }

    const genderEl = e.target.closest('[data-gender-pill]');
    if (genderEl) {
      AppState.editGender = genderEl.dataset.genderPill;
      document.querySelectorAll('[data-gender-pill]').forEach(p => {
        const on = p === genderEl;
        p.classList.toggle('pill--active', on);
        p.style.borderColor = on ? C.primary : 'transparent';
      });
      return;
    }

    const salonCard = e.target.closest('[data-goto-salon]');
    if (salonCard && !e.target.closest('.fav-btn')) {
      goToSalon(parseInt(salonCard.dataset.gotoSalon), AppState.selectedServices, 'Services', AppState.salonPackages);
      return;
    }

    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      switch (action) {
        /* auth */
        case 'go-otp':           doRequestOtp(); break;
        case 'verify-otp':       doVerifyOtp(); break;
        case 'go-onboarding':    navigate('home'); break;
        case 'go-login':
          if (API.token && AppState.currentScreen === 'profile') doLogout();
          else navigate('login');
          break;
        /* booking */
        case 'book-now':         navigate('booking', { salonServices: [...AppState.salonServices], salonPackages: [...(AppState.salonPackages || [])] }); break;
        case 'confirm-booking':  doConfirmBooking(); break;
        case 'view-bookings':
          if (AppState.currentScreen === 'reschedule') doReschedule();
          else navigate('my-bookings');
          break;
        /* search & filters */
        case 'go-search':        navigate('search-input', { selectedServices: [] }); break;
        case 'show-results':     navigate('search-results', { selectedServices: [...AppState.selectedServices] }); break;
        case 'filter-open-now':  AppState.activeFilters = new Set(['open-now']);  navigate('search-results'); break;
        case 'filter-under-500': AppState.activeFilters = new Set(['under-500']); navigate('search-results'); break;
        case 'filter-near-me':
          Geo.getPosition().then(() => {
            AppState.activeFilters = new Set(['near-me']);
            navigate('search-results');
          }).catch(() => {
            toast('Location unavailable — showing default distances');
            AppState.activeFilters = new Set(['near-me']);
            navigate('search-results');
          });
          break;
        case 'clear-filter':     AppState.activeFilters.delete(actionEl.dataset.filter); navigate('search-results'); break;
        case 'search-view-list': AppState.searchViewMode = 'list'; navigate('search-results'); break;
        case 'search-view-map':  AppState.searchViewMode = 'map';  navigate('search-results'); break;
        /* service detail */
        case 'open-service-detail':
          navigate('service-detail', {
            detailSalonId: parseInt(actionEl.dataset.detailSalon),
            detailType: actionEl.dataset.detailType,
            detailId: actionEl.dataset.detailId,
          });
          break;
        /* profile / addresses */
        case 'save-profile':     doSaveProfile(); break;
        case 'add-address':      doAddAddress(); break;
        case 'open-add-address': AppState.addingAddress = true;  navigate('saved-addresses'); break;
        case 'cancel-add-address': AppState.addingAddress = false; navigate('saved-addresses'); break;
        case 'delete-address':   doDeleteAddress(actionEl.dataset.addrId); break;
        /* misc */
        case 'go-home':          navigate('home'); break;
        case 'go-profile':       navigate('profile'); break;
        case 'go-deals':         navigate('deals'); break;
        case 'go-notifications': navigate('notifications'); break;
        default:                 navigate(action);
      }
      return;
    }

    const toggleEl = e.target.closest('.toggle');
    if (toggleEl) { handleToggle(toggleEl); return; }

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

/* ── PWA install prompt (Android banner) ── */
let deferredInstall = null;
function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstall = e;
    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.innerHTML = `
      <div style="width:40px;height:40px;border-radius:10px;flex-shrink:0">
        <img src="/pwa/icons/icon-192.png" alt="" style="width:40px;height:40px;border-radius:10px">
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:700;color:${C.text}">Install GLAZZ</div>
        <div style="font-size:12px;color:${C.text3}">Quick access from your home screen</div>
      </div>
      <button id="pwa-install-yes" style="padding:9px 16px;background:${C.primary};color:#fff;border:none;border-radius:10px;font-family:inherit;font-weight:700;font-size:13px;cursor:pointer">Install</button>
      <button id="pwa-install-no" style="padding:9px;background:none;border:none;color:${C.text3};font-family:inherit;font-size:17px;cursor:pointer">&times;</button>`;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('on'));
    banner.querySelector('#pwa-install-yes').onclick = async () => {
      banner.remove();
      if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; }
    };
    banner.querySelector('#pwa-install-no').onclick = () => banner.remove();
  });
}

/* ── Boot ── */
async function init() {
  initEvents();
  initInstallPrompt();
  registerSW();
  navigate('splash');
  Geo.init();

  await hydrateCatalog();
  if (Geo.pos) Geo.applyToSalons();

  const deepLink = new URLSearchParams(location.search).get('screen');

  if (API.token) {
    /* login once — valid session goes straight in */
    try {
      await hydrateMe();
      navigate(deepLink && screens.some(s => s.id === deepLink) ? deepLink : 'home');
      return;
    } catch (err) {
      if (err instanceof TypeError) {
        /* offline: keep the session, empty user data (no mock bookings as yours) */
        bookings.length = 0;
        AppState.favorites = new Set();
        AppState.notifications = [];
        toast('You\u2019re offline \u2014 showing cached data');
        navigate('home');
        return;
      }
      API.token = null; /* invalid/expired session */
    }
  }

  /* not logged in: splash → login */
  setTimeout(() => {
    if (AppState.currentScreen === 'splash') navigate('login');
  }, 1600);
}

document.addEventListener('DOMContentLoaded', init);
