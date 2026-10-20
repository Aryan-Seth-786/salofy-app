/* ═══════════════════════════════════════════════════
   GLAZZ SERVER — zero-dependency core (node:http)
   Serves:
     /                  → PWA (pwa/index.html, app mode)
     /demo              → original design reference (index.html)
     /privacy           → privacy/index.html
     /js, /css, /pwa    → static assets
     /sw.js             → pwa/sw.js (root scope)
     /.well-known/*     → server/.well-known/*
     /api/*             → JSON API
   Set DATABASE_URL for Postgres; without it the server
   runs in in-memory mode (local dev only).
   ═══════════════════════════════════════════════════ */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { store, computeBookingTotal, catalog, hash } = require('./store');

const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 8090;

/* ── helpers ── */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
};

function send(res, status, body, headers = {}) {
  const data = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > 64 * 1024) { reject(new Error('body too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(new Error('invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function authUser(req) {
  const h = req.headers['authorization'] || '';
  const m = h.match(/^Bearer (\w+)$/);
  return m ? store.getSessionUser(m[1]) : null;
}

/* serve a file inside ROOT, with path-traversal protection */
function serveFile(res, relPath, cache) {
  const abs = path.resolve(ROOT, relPath);
  if (!abs.startsWith(ROOT + path.sep) && abs !== path.resolve(ROOT)) return send(res, 403, { error: 'forbidden' });
  fs.readFile(abs, (err, buf) => {
    if (err) return send(res, 404, { error: 'not found' });
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': cache || 'no-cache',
    });
    res.end(buf);
  });
}

/* ── OTP rate limiting (best effort, per process) ── */
const otpSent = new Map();
function rateLimited(phone) {
  const now = Date.now();
  const rec = (otpSent.get(phone) || []).filter(t => now - t < 3600000);
  if (rec.length >= 10) return true;
  rec.push(now); otpSent.set(phone, rec);
  return false;
}

const phoneOk = p => /^\d{10}$/.test(String(p || '').replace(/\D/g, ''));

/* ── seeded promo notifications for a new user ── */
async function seedUserNotifications(userId) {
  await store.createNotification(userId, {
    icon: 'check', bg: 'var(--info)', title: 'Welcome to GLAZZ 👑',
    body: 'Browse salons, pick services and book in seconds.', time: 'just now', category: 'foryou', action: 'show-results',
  });
  const flash = catalog.salons.find(s => s.flash);
  if (flash) {
    await store.createNotification(userId, {
      icon: 'lightning', bg: 'var(--error)', title: `Flash Deal: ${flash.flash.title}`,
      body: `${flash.name} — limited hours left.`, time: 'just now', category: 'flash', action: 'go-deals', goto_salon: flash.id,
    });
  }
}

/* ═════════════════════ API routes ═════════════════════ */
async function handleApi(req, res, url) {
  const route = `${req.method} ${url.pathname}`;
  const body = (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT') ? await readBody(req) : {};

  /* health (Render health check) */
  if (route === 'GET /api/health') {
    let db = { mode: store.mode };
    try { db = await store.health(); } catch (e) { db = { mode: store.mode, error: String(e.message) }; }
    return send(res, 200, { ok: true, db: db.mode, time: new Date().toISOString() });
  }

  /* catalog (public) */
  if (route === 'GET /api/catalog') {
    const cat = await store.getCatalog();
    return send(res, 200, { services: cat.services, salons: cat.salons });
  }

  /* ── auth ── */
  if (route === 'POST /api/auth/request-otp') {
    const phone = String(body.phone || '').replace(/\D/g, '');
    if (!phoneOk(phone)) return send(res, 400, { error: 'Enter a valid 10-digit phone number' });
    if (rateLimited('otp' + phone)) return send(res, 429, { error: 'Too many OTP requests. Try again later.' });
    const code = String(cryptoRand(6)); // demo OTP — shown in the response (no SMS provider yet)
    await store.upsertOtp(phone, code, new Date(Date.now() + 10 * 60000));
    console.log(`[otp] +91${phone} → ${code}`);
    return send(res, 200, { ok: true, demoOtp: code });
  }

  if (route === 'POST /api/auth/verify-otp') {
    const phone = String(body.phone || '').replace(/\D/g, '');
    const otp = String(body.otp || '').replace(/\D/g, '');
    const rec = await store.getOtp(phone);
    if (!rec) return send(res, 400, { error: 'Request a code first' });
    if (new Date(rec.expires_at) < new Date()) return send(res, 400, { error: 'Code expired — request a new one' });
    if ((rec.attempts || 0) >= 5) return send(res, 429, { error: 'Too many attempts. Request a new code.' });
    if (hash(otp) !== rec.code_hash) {
      await store.bumpOtpAttempts(phone);
      return send(res, 400, { error: 'Incorrect code' });
    }
    const user = await store.upsertUserByPhone(phone);
    const isNew = !user.name;
    const t = await store.createSession(user.id);
    await store.deleteOtp(phone); /* one code → one login; no replay */
    if (isNew) await seedUserNotifications(user.id);
    return send(res, 200, { token: t, user: publicUser(user) });
  }

  /* everything below requires auth */
  const user = await authUser(req);
  if (!user) return send(res, 401, { error: 'unauthorized' });

  if (route === 'POST /api/auth/logout') {
    const m = (req.headers['authorization'] || '').match(/^Bearer (\w+)$/);
    if (m) await store.deleteSession(m[1]);
    return send(res, 200, { ok: true });
  }

  if (route === 'GET /api/me') {
    const [favorites, addresses, bookings, notifications] = await Promise.all([
      store.getFavorites(user.id), store.listAddresses(user.id),
      store.listBookings(user.id), store.listNotifications(user.id),
    ]);
    return send(res, 200, { user: publicUser(user), favorites, addresses, bookings, notifications });
  }

  if (route === 'PATCH /api/me') {
    const patch = {};
    for (const k of ['name', 'email', 'gender']) if (body[k] !== undefined) patch[k] = String(body[k]).slice(0, 120);
    const u = await store.updateUser(user.id, patch);
    return send(res, 200, { user: publicUser(u) });
  }

  /* ── favorites (toggle) ── */
  if (route === 'POST /api/favorites') {
    const salonId = parseInt(body.salonId);
    if (!catalog.salons.some(s => s.id === salonId)) return send(res, 400, { error: 'unknown salon' });
    const favorites = await store.setFavorite(user.id, salonId, !!body.on);
    return send(res, 200, { favorites });
  }

  /* ── bookings ── */
  if (route === 'POST /api/bookings') {
    const salonId = parseInt(body.salonId);
    const svcIds = Array.isArray(body.svcIds) ? body.svcIds.map(String).slice(0, 20) : [];
    const pkgIds = Array.isArray(body.pkgIds) ? body.pkgIds.map(String).slice(0, 20) : [];
    const calc = computeBookingTotal(salonId, svcIds, pkgIds);
    if (calc.error) return send(res, 400, { error: calc.error });
    if (!body.date || !body.time) return send(res, 400, { error: 'Pick a date and time' });
    const salon = catalog.salons.find(s => s.id === salonId);
    const booking = await store.createBooking(user.id, {
      salon_id: salonId, svc_ids: calc.svcIds, pkg_ids: calc.pkgIds,
      date: String(body.date).slice(0, 40), time: String(body.time).slice(0, 20), total: calc.total,
    });
    await store.createNotification(user.id, {
      icon: 'check', bg: 'var(--info)', title: 'Booking Confirmed',
      body: `${salon.name} on ${booking.date} at ${booking.time}.`, time: 'just now', category: 'booking', action: 'view-bookings',
    });
    return send(res, 201, { booking });
  }

  const bookPatch = route.match(/^PATCH \/api\/bookings\/([\w-]+)$/);
  if (bookPatch) {
    const id = bookPatch[1];
    const patch = {};
    if (body.date !== undefined) patch.date = String(body.date).slice(0, 40);
    if (body.time !== undefined) patch.time = String(body.time).slice(0, 20);
    const bookings = await store.listBookings(user.id);
    const b = bookings.find(x => x.id === id);
    if (!b) return send(res, 404, { error: 'booking not found' });
    const updated = await store.updateBooking(id, patch);
    const salon = catalog.salons.find(s => s.id === b.salon_id);
    if (salon) {
      await store.createNotification(user.id, {
        icon: 'clock', bg: 'var(--surface-3)', title: 'Appointment Rescheduled',
        body: `${salon.name} moved to ${updated.date} at ${updated.time}.`, time: 'just now', category: 'booking', action: 'view-bookings',
      });
    }
    return send(res, 200, { booking: updated });
  }

  const bookDelete = route.match(/^DELETE \/api\/bookings\/([\w-]+)$/);
  if (bookDelete) {
    const id = bookDelete[1];
    const bookings = await store.listBookings(user.id);
    const b = bookings.find(x => x.id === id);
    if (!b) return send(res, 404, { error: 'booking not found' });
    await store.updateBooking(id, { status: 'cancelled' });
    const salon = catalog.salons.find(s => s.id === b.salon_id);
    if (salon) {
      await store.createNotification(user.id, {
        icon: 'x', bg: 'var(--error)', title: 'Booking Cancelled',
        body: `${salon.name} on ${b.date} at ${b.time} was cancelled.`, time: 'just now', category: 'booking', action: 'view-bookings',
      });
    }
    return send(res, 200, { ok: true });
  }

  /* ── addresses ── */
  if (route === 'POST /api/addresses') {
    const label = String(body.label || '').trim().slice(0, 40);
    const address = String(body.address || '').trim().slice(0, 200);
    if (!label || !address) return send(res, 400, { error: 'Label and address are required' });
    const a = await store.createAddress(user.id, { label, address, isDefault: !!body.isDefault });
    return send(res, 201, { address: a });
  }

  const addrDelete = route.match(/^DELETE \/api\/addresses\/([\w-]+)$/);
  if (addrDelete) {
    await store.deleteAddress(addrDelete[1], user.id);
    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: 'not found' });
}

function publicUser(u) {
  return { id: u.id, phone: u.phone, name: u.name, email: u.email, gender: u.gender };
}

function cryptoRand(digits) {
  let n = parseInt(require('crypto').randomBytes(4).toString('hex'), 16);
  return String(n % (10 ** digits)).padStart(digits, '0');
}

/* ═════════════════════ static routing ═════════════════════ */
const STATIC_MAP = {
  '/': 'pwa/index.html',
  '/index.html': 'pwa/index.html',
  '/demo': 'index.html',
  '/sw.js': 'pwa/sw.js',
  '/manifest.webmanifest': 'pwa/manifest.webmanifest',
  '/offline.html': 'pwa/offline.html',
  '/privacy': 'privacy/index.html',
  '/privacy/': 'privacy/index.html',
  '/.well-known/assetlinks.json': 'server/.well-known/assetlinks.json',
};

const STATIC_DIRS = ['/js/', '/css/', '/pwa/', '/docs/', '/.well-known/'];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);

    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { error: 'method not allowed' });

    /* exact static map */
    if (STATIC_MAP[url.pathname]) {
      return serveFile(res, STATIC_MAP[url.pathname], url.pathname === '/' ? 'no-cache' : 'no-cache');
    }

    /* whitelisted directories (also .well-known files) */
    if (STATIC_DIRS.some(d => url.pathname.startsWith(d))) {
      const ext = path.extname(url.pathname).toLowerCase();
      const cache = ['.png', '.svg', '.ico'].includes(ext) ? 'public, max-age=604800' : 'no-cache';
      return serveFile(res, url.pathname.slice(1), cache);
    }

    /* everything else → the app (unknown deep links land home) */
    return serveFile(res, 'pwa/index.html', 'no-cache');
  } catch (err) {
    console.error('[error]', req.method, url.pathname, err.message);
    if (url.pathname.startsWith('/api/')) return send(res, 500, { error: 'internal error' });
    send(res, 500, 'Internal error');
  }
});

/* graceful shutdown */
process.on('SIGTERM', () => server.close(() => process.exit(0)));

store.init()
  .then(() => {
    server.listen(PORT, () => console.log(`GLAZZ server up on :${PORT} (store: ${store.mode})`));
  })
  .catch(err => {
    console.error('store init failed:', err);
    process.exit(1);
  });
