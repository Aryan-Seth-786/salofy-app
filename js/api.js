/* ═══════════════════════════════════════════════════
   GLAZZ API LAYER (prod mode)
   - Bearer-token auth stored in localStorage (login once)
   - Hydrates the app globals (salons, bookings, …) from the
     live API; js/data.js stays as the offline fallback
   - Real geolocation → live distance labels + "near me"
   - Registers the service worker
   ═══════════════════════════════════════════════════ */

'use strict';

const TOKEN_KEY = 'glazz_token';

const API = {
  get token() { try { return localStorage.getItem(TOKEN_KEY) || null; } catch { return null; } },
  set token(t) { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch {} },

  async call(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(path, {
      headers,
      method: opts.method || 'GET',
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    let data = {};
    try { data = await res.json(); } catch {}
    if (res.status === 401) { this.token = null; }
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data;
  },

  /* ── auth ── */
  async requestOtp(phone) { return this.call('/api/auth/request-otp', { method: 'POST', body: { phone } }); },
  async verifyOtp(phone, otp) {
    const d = await this.call('/api/auth/verify-otp', { method: 'POST', body: { phone, otp } });
    this.token = d.token;
    return d;
  },
  async logout() {
    try { await this.call('/api/auth/logout', { method: 'POST', body: {} }); } catch {}
    this.token = null;
  },

  /* ── data ── */
  async me() { return this.call('/api/me'); },
  async updateMe(patch) { return this.call('/api/me', { method: 'PATCH', body: patch }); },
  async toggleFavorite(salonId, on) {
    const d = await this.call('/api/favorites', { method: 'POST', body: { salonId, on } });
    return d.favorites;
  },
  async createBooking(b) { return this.call('/api/bookings', { method: 'POST', body: b }); },
  async rescheduleBooking(id, date, time) {
    return this.call(`/api/bookings/${id}`, { method: 'PATCH', body: { date, time } });
  },
  async cancelBooking(id) { return this.call(`/api/bookings/${id}`, { method: 'DELETE' }); },
  async addAddress(label, address) { return this.call('/api/addresses', { method: 'POST', body: { label, address } }); },
  async deleteAddress(id) { return this.call(`/api/addresses/${id}`, { method: 'DELETE' }); },
};

/* ── catalog hydration: replace the in-place mock globals with live data ── */
async function hydrateCatalog() {
  try {
    const d = await fetch('/api/catalog').then(r => r.json());
    if (d.salons && d.salons.length) {
      salons.length = 0;
      salons.push(...d.salons);
    }
    if (d.services && d.services.length) {
      allServices.length = 0;
      allServices.push(...d.services);
    }
    return true;
  } catch { return false; } /* offline → mock data fallback */
}

/* ── user hydration: me → AppState + bookings global ── */
const ME_CACHE_KEY = 'glazz_me_cache';

function saveMeCache(d) {
  try {
    localStorage.setItem(ME_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), ...d }));
  } catch {}
}

function restoreMeCache() {
  try {
    const raw = localStorage.getItem(ME_CACHE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d || !d.user) return null;
    applyMe(d);
    return d;
  } catch { return null; }
}

function clearMeCache() {
  try { localStorage.removeItem(ME_CACHE_KEY); } catch {}
}

/* merge a partial update into the cached me snapshot (keeps offline boot fresh
   without a refetch) */
function patchMeCache(patch) {
  try {
    const raw = localStorage.getItem(ME_CACHE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (!d || !d.user) return;
    Object.assign(d, patch);
    localStorage.setItem(ME_CACHE_KEY, JSON.stringify(d));
  } catch {}
}

function applyMe(d) {
  if (d.user) AppState.user = d.user;
  AppState.favorites = new Set(d.favorites || []);
  AppState.addresses = (d.addresses || []).map(a => ({
    id: a.id, label: a.label,
    icon: a.label.toLowerCase().includes('work') ? Icons.briefcase(18, C.text2) : Icons.address(18, C.primary),
    address: a.address, isDefault: !!a.is_default,
  }));
  hydrateBookings(d.bookings || []);
  AppState.notifications = d.notifications || [];
}

async function hydrateMe() {
  const d = await API.me();
  applyMe(d);
  saveMeCache(d);
  return d;
}

/* server booking rows → the shape the screens expect */
function toClientBooking(b) {
  const salon = salons.find(s => s.id === b.salon_id) || salons[0];
  return {
    id: b.id, idx: 0, salonId: b.salon_id,
    date: b.date, time: b.time,
    svcIds: (b.svc_ids || b.svcIds) || [],
    pkgIds: (b.pkg_ids || b.pkgIds) || [],
    pkgId: ((b.pkg_ids || b.pkgIds) || [])[0] || null,
    status: b.status, total: b.total,
    salon,
  };
}

function hydrateBookings(rows) {
  bookings.length = 0;
  bookings.push(...rows.map(toClientBooking));
  bookings.forEach((b, i) => { b.idx = i; });
}

/* ── geolocation: live distances for every salon ── */
const Geo = {
  pos: null, status: 'idle',

  distanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371, toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  applyToSalons() {
    if (!this.pos) return;
    salons.forEach(s => {
      if (typeof s.lat === 'number' && typeof s.lng === 'number') {
        const km = this.distanceKm(this.pos.coords.latitude, this.pos.coords.longitude, s.lat, s.lng);
        s.distKm = km; /* numeric — used by the near-me filter */
        s.dist = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
      }
    });
  },

  getPosition() {
    if (this.pos) return Promise.resolve(this.pos);
    if (this.status === 'denied') return Promise.reject(new Error('denied'));
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) { this.status = 'denied'; return reject(new Error('unsupported')); }
      navigator.geolocation.getCurrentPosition(
        (pos) => { this.pos = pos; this.status = 'granted'; this.applyToSalons(); resolve(pos); },
        (err) => {
          /* only an actual permission denial latches — timeouts /
             position-unavailable stay retryable for the rest of the session */
          if (err && err.code === 1) this.status = 'denied';
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  },

  /* silent check at boot — only if permission was already granted */
  init() {
    if (!navigator.permissions || !navigator.permissions.query) return;
    navigator.permissions.query({ name: 'geolocation' }).then(p => {
      if (p.state === 'granted') {
        this.getPosition().then(() => {
          if (typeof navigate === 'function' && AppState.currentScreen) navigate(AppState.currentScreen);
        }).catch(() => {});
      }
    }).catch(() => {});
  },
};

/* ── service worker ── */
function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err =>
        console.warn('SW registration failed:', err));
    });
  }
}

/* ── tiny toast (no alert() — dialogs are suppressed in TWA) ── */
function toast(msg, ms = 2600) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('on'), ms);
}
