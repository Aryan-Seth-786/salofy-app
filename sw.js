/* Salofy PWA service worker — Android-first install + offline shell */
const CACHE_VERSION = 'salofy-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/css/tokens.css',
  '/css/shell.css',
  '/css/components.css',
  '/css/screens.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/js/data.js',
  '/js/icons.js',
  '/js/shell.js',
  '/js/components.js',
  '/js/components/service-card.js',
  '/js/components/package-card.js',
  '/js/screens/splash.js',
  '/js/screens/login.js',
  '/js/screens/otp.js',
  '/js/screens/onboarding.js',
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
  '/js/screens/favorites.js',
  '/js/screens/profile.js',
  '/js/screens/deals.js',
  '/js/screens/dashboard-growth.js',
  '/js/screens/dashboard-premium.js',
  '/js/screens/edit-profile.js',
  '/js/screens/saved-addresses.js',
  '/js/screens/refer-earn.js',
  '/js/screens/notification-settings.js',
  '/js/screens/help-support.js',
  '/js/screens/reschedule.js',
  '/js/api.js',
  '/js/pwa.js',
  '/js/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // API: network-first, no hard fail if offline
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((res) => res)
        .catch(() => new Response(JSON.stringify({ ok: false, offline: true }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }))
    );
    return;
  }

  // App shell: cache-first, refresh in background
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
