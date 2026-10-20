/* ═══════════════════════════════════════════════════
   GLAZZ APP CONTROLLER (PROD / PWA MODE)
   Single-screen navigation wired to the live API:
   login once → session persists, real bookings,
   favorites, profile, addresses, notifications.
   Interaction wiring mirrors js/app.js (the demo
   controller) — port changes there to here too.
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
  addingAddress: false,
  detailSalonId: null,
  detailType: null,
  detailId: null,
  detailReturnTo: null,
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

/* Picker chips are unlabeled (9–11 morning · 12 and 1–6 afternoon).
   fmtTime('2:30') → '2:30 PM'; already-labeled times pass through. */
function fmtTime(t) {
  const m = String(t || '').match(/^(\d+):(\d+)\s*(AM|PM)?$/i);
  if (!m) return t || '';
  let h = parseInt(m[1]); const mm = m[2];
  let ap = m[3] ? m[3].toUpperCase() : null;
  if (!ap) ap = ((h >= 1 && h <= 6) || h >= 12) ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mm} ${ap}`;
}

/* '10:30 AM' → '10:30' (picker chip format) */
function chipTime(displayTime) {
  const m = String(displayTime || '').match(/^(\d+:\d+)\s*(AM|PM)?$/i);
  return m ? m[1] : (displayTime || '10:30');
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
  { id: 'profile',             render: renderProfile },
  { id: 'edit-profile',        render: renderEditProfile },
  { id: 'saved-addresses',     render: renderSavedAddresses },
  { id: 'refer-earn',          render: renderReferEarn },
  { id: 'notification-settings', render: renderNotificationSettings },
  { id: 'help-support',        render: renderHelpSupport },
  { id: 'dashboard-growth',    render: renderDashboardGrowth },
  { id: 'dashboard-premium',   render: renderDashboardPremium },
];

/* ── Navigation (guarded: unknown ids never corrupt state) ── */
function navigate(screenId, params = {}, opts = {}) {
  const screen = screens.find(s => s.id === screenId);
  if (!screen) return;
  if (!opts.skipHistory && AppState.currentScreen !== screenId) {
    AppState.history.push(AppState.currentScreen);
    if (AppState.history.length > 20) AppState.history.shift();
  }
  Object.assign(AppState, params);
  AppState.currentScreen = screenId;
  document.getElementById('app').innerHTML = screen.render();
  dockSalonSummaryBar();
  const pc = document.querySelector('.phone-content');
  if (pc) pc.scrollTop = 0;
}

function goBack() {
  const prev = AppState.history.pop();
  navigate(prev || 'home', {}, { skipHistory: true });
}

function goToSalon(salonId, preSelected = [], tab = 'Services', preSelectedPkgs = []) {
  const salon = salons.find(s => s.id === salonId);
  if (!salon) return;
  const screenId = salon.tier === 'starter' ? 'salon-starter' : salon.tier === 'growth' ? 'salon-growth' : 'salon-premium';
  navigate(screenId, {
    selectedSalon: salon,
    salonServices: preSelected.filter(sid => salon.services[sid]),
    salonPackages: preSelectedPkgs.filter(pkgId => (salon.packages || []).some(p => p.id === pkgId)),
    salonTab: tab,
  });
}

/* ── Service selection (mirrors app.js) ── */
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
    const chk = row.querySelector('.service-select__check');
    if (chk) chk.innerHTML = sel ? Icons.check(14, '#fff') : '';
  }
  updateSalonSummaryBar(phoneEl);
  updateSuggestedPackages(phoneEl);
}

/* ── Package selection (mirrors app.js) ── */
function toggleSalonPackage(pkgId, phoneEl) {
  const s = AppState.selectedSalon;
  const pkg = (s.packages || []).find(p => p.id === pkgId);
  if (!pkg) return;
  const idx = AppState.salonPackages.indexOf(pkgId);
  if (idx > -1) {
    AppState.salonPackages.splice(idx, 1);
  } else {
    AppState.salonPackages.push(pkgId);
    // Deselect individually-selected services covered by this package
    (pkg.services || []).forEach(svcId => {
      const svcIdx = AppState.salonServices.indexOf(svcId);
      if (svcIdx > -1) {
        AppState.salonServices.splice(svcIdx, 1);
        const row = phoneEl.querySelector(`[data-svc-toggle="${svcId}"]`);
        if (row) {
          row.classList.remove('service-select--active');
          const chk = row.querySelector('.service-select__check');
          if (chk) chk.innerHTML = '';
        }
      }
    });
    updateSuggestedPackages(phoneEl);
  }

  const card = phoneEl.querySelector(`[data-pkg-toggle="${pkgId}"]`);
  if (card) {
    const sel = AppState.salonPackages.includes(pkgId);
    card.classList.toggle('pkg-card--active', sel);
    const chk = card.querySelector('.service-select__check');
    if (chk) chk.innerHTML = sel ? Icons.check(14, '#fff') : '';
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
  const pkgs = AppState.salonPackages.filter(pkgId => (s.packages || []).some(p => p.id === pkgId));
  const svcTotal = svcs.reduce((a, sid) => a + s.services[sid], 0);
  const pkgTotal = pkgs.reduce((a, pkgId) => { const p = (s.packages || []).find(pk => pk.id === pkgId); return a + (p ? p.price : 0); }, 0);
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
  dockSalonSummaryBar(phoneEl);
}

/* ── Tab switch / toggle ── */
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
  API.toggleFavorite(salonId, on).then((favorites) => {
    patchMeCache({ favorites: favorites || [...AppState.favorites] });
  }).catch(err => {
    if (on) AppState.favorites.delete(salonId); else AppState.favorites.add(salonId);
    toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message);
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
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
}

/* ── Auth actions ── */
async function doRequestOtp() {
  const input = document.getElementById('login-phone');
  /* on the login screen use the typed number; on the OTP screen (resend) reuse pendingPhone */
  const phone = (input ? input.value : (AppState.pendingPhone || '')).replace(/\D/g, '');
  if (phone.length !== 10) { toast('Enter a valid 10-digit phone number'); return; }
  try {
    const d = await API.requestOtp(phone);
    AppState.pendingPhone = phone;
    AppState.demoOtp = d.demoOtp || null;
    if (AppState.currentScreen === 'otp') {
      navigate('otp'); /* re-render with the fresh demo code */
      toast('New code sent');
    } else {
      navigate('otp');
    }
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
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
    toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message);
  }
}

async function doLogout() {
  await API.logout();
  clearMeCache();
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
  const pkgIds = AppState.salonPackages.filter(pkgId => (s.packages || []).some(p => p.id === pkgId));
  if (svcIds.length + pkgIds.length === 0) { toast('Select at least one service or package'); return; }
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
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
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
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
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
    patchMeCache({ user: d.user }); /* keep the offline snapshot fresh */
    toast('Profile saved ✓');
    navigate('profile');
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
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
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
}

async function doDeleteAddress(id) {
  try {
    await API.deleteAddress(id);
    await hydrateMe();
    navigate('saved-addresses');
  } catch (err) { toast(String(err).includes('fetch') ? 'You appear to be offline' : err.message); }
}

/* ── Event delegation (mirrors app.js wiring + prod actions) ── */
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

    /* inline expand chevrons (before svc/pkg toggles) */
    const expandSvcEl = e.target.closest('[data-svc-expand]');
    if (expandSvcEl) {
      e.stopPropagation();
      const row = expandSvcEl.closest('.service-row');
      const panel = row && row.querySelector('.svc-expand-panel');
      if (panel) {
        const isOpen = panel.style.display !== 'none';
        panel.style.display = isOpen ? 'none' : 'block';
        expandSvcEl.classList.toggle('svc-chevron--open', !isOpen);
      }
      return;
    }
    const expandPkgEl = e.target.closest('[data-pkg-expand]');
    if (expandPkgEl) {
      e.stopPropagation();
      const row = expandPkgEl.closest('.pkg-row');
      const panel = row && row.querySelector('.svc-expand-panel');
      if (panel) {
        const isOpen = panel.style.display !== 'none';
        panel.style.display = isOpen ? 'none' : 'block';
        expandPkgEl.classList.toggle('svc-chevron--open', !isOpen);
      }
      return;
    }

    /* package-card service chip → service detail or inline info (before pkg-toggle) */
    const pkgSvcLinkEl = e.target.closest('[data-pkg-svc-link]');
    if (pkgSvcLinkEl) {
      e.stopPropagation();
      const sid = pkgSvcLinkEl.dataset.pkgSvcLink;
      const salonId = pkgSvcLinkEl.dataset.detailSalon ? parseInt(pkgSvcLinkEl.dataset.detailSalon) : (AppState.selectedSalon && AppState.selectedSalon.id);
      const salon = salons.find(s => s.id === salonId);
      const enriched = !!(salon && salon.serviceDetails && salon.serviceDetails[sid]);

      if (enriched) {
        navigate('service-detail', {
          detailSalonId: salonId, detailType: 'service', detailId: sid,
          detailReturnTo: AppState.currentScreen,
        });
        return;
      }

      const svc = getSvc(sid);
      const pkgRow = pkgSvcLinkEl.closest('.pkg-row');
      const panel = pkgRow && pkgRow.querySelector('.pkg-svc-info-panel');
      if (!svc || !panel) return;

      const price = salon && salon.services[sid];
      const desc = svc.desc || '';
      const includes = svc.includes || [];
      const alreadyOpenForSvc = panel.dataset.openSvc === sid && panel.style.display !== 'none';

      if (alreadyOpenForSvc) {
        panel.style.display = 'none';
        panel.dataset.openSvc = '';
      } else {
        panel.dataset.openSvc = sid;
        panel.style.display = 'block';
        panel.innerHTML = `
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px">
            <div style="min-width:0;flex:1">
              <div style="font-size:14px;font-weight:600;color:var(--text)">${svc.label}</div>
              <div style="font-size:12px;color:var(--text-3);margin-top:2px">${svc.time}${price ? ' · ₹' + price : ''}</div>
            </div>
            <button class="pkg-svc-info-close" aria-label="Close">${Icons.close(14, 'var(--text-3)')}</button>
          </div>
          ${desc ? `<div style="font-size:13px;color:var(--text-2);line-height:1.5;margin-bottom:${includes.length ? '8' : '0'}px">${desc}</div>` : ''}
          ${includes.length ? `<div style="display:flex;flex-wrap:wrap;gap:10px 14px">
            ${includes.map(i => `<span class="svc-include-chip">${i}</span>`).join('')}
          </div>` : ''}
        `;
      }
      return;
    }

    const pkgSvcCloseEl = e.target.closest('.pkg-svc-info-close');
    if (pkgSvcCloseEl) {
      e.stopPropagation();
      const panel = pkgSvcCloseEl.closest('.pkg-svc-info-panel');
      if (panel) {
        panel.style.display = 'none';
        panel.dataset.openSvc = '';
        panel.innerHTML = '';
      }
      return;
    }

    /* service / package selection toggles (skip when click came from a detail/action button) */
    const svcEl = e.target.closest('[data-svc-toggle]');
    if (svcEl && !e.target.closest('[data-action]')) {
      toggleSalonService(svcEl.dataset.svcToggle, svcEl.closest('.phone-shell'));
      return;
    }
    const pkgEl = e.target.closest('[data-pkg-toggle]');
    if (pkgEl && !e.target.closest('[data-action]')) {
      toggleSalonPackage(pkgEl.dataset.pkgToggle, pkgEl.closest('.phone-shell'));
      return;
    }

    /* suggested package tap — pre-select it and jump to Packages tab */
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

    /* favorites */
    const favEl = e.target.closest('.fav-btn[data-fav]');
    if (favEl) {
      e.stopPropagation();
      toggleFav(parseInt(favEl.dataset.fav));
      return;
    }

    /* edit-profile gender pills (prod) */
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

    /* map pin tap (highlight / open salon) */
    const mapPinEl = e.target.closest('[data-map-pin]');
    if (mapPinEl) {
      e.stopPropagation();
      const salonId = parseInt(mapPinEl.dataset.mapPin);
      const salon = salons.find(s => s.id === salonId);
      if (salon) {
        if (AppState.mapActiveSalon && AppState.mapActiveSalon.id === salonId) {
          goToSalon(salonId, []);
        } else {
          AppState.mapActiveSalon = salon;
          navigate('map');
        }
      }
      return;
    }

    /* go to salon Packages tab (search popular-packages cards) */
    const pkgSalonEl = e.target.closest('[data-goto-package-salon]');
    if (pkgSalonEl) {
      e.stopPropagation();
      goToSalon(parseInt(pkgSalonEl.dataset.gotoPackageSalon), [], 'Packages');
      return;
    }

    /* go to a specific pre-selected package (search package-match callouts) */
    const gotoPackageEl = e.target.closest('[data-goto-package]');
    if (gotoPackageEl) {
      e.stopPropagation();
      const parts = gotoPackageEl.dataset.gotoPackage.split(':');
      goToSalon(parseInt(parts[0]), [], 'Packages', [parts[1]]);
      return;
    }

    /* go to salon from card */
    const salonCard = e.target.closest('[data-goto-salon]');
    if (salonCard && !e.target.closest('.fav-btn')) {
      goToSalon(parseInt(salonCard.dataset.gotoSalon), AppState.selectedServices, 'Services', AppState.salonPackages);
      return;
    }

    /* generic data-action buttons */
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
        case 'book-now':         navigate('booking', { salonServices: [...AppState.salonServices], salonPackages: [...AppState.salonPackages] }); break;
        case 'confirm-booking':  doConfirmBooking(); break;
        case 'view-bookings':
          if (AppState.currentScreen === 'reschedule') doReschedule();
          else navigate('my-bookings');
          break;

        /* service detail */
        case 'open-service-detail': {
          const sid = actionEl.dataset.detailSalon ? parseInt(actionEl.dataset.detailSalon) : (AppState.selectedSalon && AppState.selectedSalon.id);
          navigate('service-detail', {
            detailSalonId: sid,
            detailType: actionEl.dataset.detailType || 'service',
            detailId: actionEl.dataset.detailId,
            detailReturnTo: AppState.currentScreen,
          });
          break;
        }
        case 'detail-add-to-booking': {
          if (AppState.detailType === 'package') {
            if (!AppState.salonPackages.includes(AppState.detailId)) AppState.salonPackages.push(AppState.detailId);
          } else {
            if (!AppState.salonServices.includes(AppState.detailId)) AppState.salonServices.push(AppState.detailId);
          }
          /* falls through to return handling */
        }
        /* eslint-disable no-fallthrough */
        case 'detail-back-to-return': {
          const ret = AppState.detailReturnTo;
          if (ret && ret !== 'service-detail') navigate(ret);
          else goBack();
          break;
        }

        /* search & filters */
        case 'go-search':        navigate('search-input', { selectedServices: [] }); break;
        case 'show-results':
          AppState.activeFilters = new Set();
          navigate('search-results', { selectedServices: [...AppState.selectedServices] });
          break;
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

        /* profile / addresses */
        case 'save-profile':       doSaveProfile(); break;
        case 'add-address':        doAddAddress(); break;
        case 'open-add-address':  AppState.addingAddress = true;  navigate('saved-addresses'); break;
        case 'cancel-add-address': AppState.addingAddress = false; navigate('saved-addresses'); break;
        case 'delete-address':    doDeleteAddress(actionEl.dataset.addrId); break;

        /* misc */
        case 'go-home':          navigate('home'); break;
        case 'go-profile':       navigate('profile'); break;
        case 'open-deals':
        case 'go-deals':         navigate('deals'); break;
        case 'go-notifications': navigate('notifications'); break;
        default:                 break;
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
    if (document.getElementById('pwa-install-banner')) return;
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
      if (API.token) {
        /* transient failure (offline / 5xx / cold start) — keep the session.
           Restore the last-known me snapshot if we have one. */
        const cached = restoreMeCache();
        if (cached) {
          toast('Offline \u2014 showing your last saved data');
        } else {
          bookings.length = 0;
          AppState.favorites = new Set();
          AppState.notifications = [];
          toast('Couldn\u2019t reach the server \u2014 check your connection');
        }
        /* honor the ?screen= deep link (manifest shortcuts) even in recovery */
        navigate(deepLink && screens.some(s => s.id === deepLink) ? deepLink : 'home');
        return;
      }
      /* API.call cleared the token on 401 — genuinely expired */
    }
  }

  /* not logged in: splash → login */
  setTimeout(() => {
    if (AppState.currentScreen === 'splash') navigate('login');
  }, 1600);
}

document.addEventListener('DOMContentLoaded', init);
