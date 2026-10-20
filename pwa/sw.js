/* ═══════════════════════════════════════════════════
   GLAZZ SERVICE WORKER
   - Precache the app shell (this list must be kept in
     sync with pwa/index.html script/css tags)
   - Network-first for pages & assets (fresh deploys),
     cache fallback when offline
   - /api/* never cached (auth + live data)
   ═══════════════════════════════════════════════════ */

const VERSION = 'glazz-v5';
const SHELL_CACHE = `${VERSION}-shell`;

const SHELL_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/css/tokens.css',
  '/css/shell.css',
  '/css/components.css',
  '/css/screens.css',
  '/css/app-mode.css',
  '/js/data.js',
  '/js/icons.js',
  '/js/shell.js',
  '/js/components.js',
  '/js/components/service-card.js',
  '/js/components/package-card.js',
  '/js/screens/splash.js',
  '/js/screens/login.js',
  '/js/screens/otp.js',
  '/js/screens/home.js',
  '/js/screens/search-input.js',
  '/js/screens/search-results.js',
  '/js/screens/map.js',
  '/js/screens/salon-profile.js',
  '/js/screens/booking.js',
  '/js/screens/booking-confirmed.js',
  '/js/screens/service-detail.js',
  '/js/screens/notifications.js',
  '/js/screens/my-bookings.js',
  '/js/screens/reschedule.js',
  '/js/screens/favorites.js',
  '/js/screens/profile.js',
  '/js/screens/deals.js',
  '/js/screens/edit-profile.js',
  '/js/screens/saved-addresses.js',
  '/js/screens/refer-earn.js',
  '/js/screens/notification-settings.js',
  '/js/screens/help-support.js',
  '/js/screens/dashboard-growth.js',
  '/js/screens/dashboard-premium.js',
  '/js/api.js',
  '/js/app-prod.js',
  '/pwa/icons/icon-192.png',
  '/pwa/icons/icon-512.png',
  '/pwa/icons/icon-maskable-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => Promise.allSettled(SHELL_ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;         // let CDN images etc. hit the network
  if (url.pathname.startsWith('/api/')) return;       // live data: never cached

  /* navigations: network first → cache → offline page */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then(hit => hit || caches.match('/'))
            .then(hit => hit || caches.match('/offline.html'))
        )
    );
    return;
  }

  /* static assets: stale-while-revalidate */
  e.respondWith(
    caches.match(req).then((hit) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
