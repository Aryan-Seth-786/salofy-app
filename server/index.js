/**
 * Salofy demo API + static PWA host
 * Deploy on Render (free web service) — see docs/DEPLOY-RENDER.md
 */
const path = require('path');
const express = require('express');
const cors = require('cors');
const { salons, services, support } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');

const bookings = [];
const otpStore = new Map(); // phone -> { code, expiresAt }

app.use(cors());
app.use(express.json({ limit: '256kb' }));

// Request logging (handy on Render logs)
app.use((req, _res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`${req.method} ${req.path}`);
  }
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'salofy-api',
    time: new Date().toISOString(),
    bookings: bookings.length,
  });
});

app.get('/api/support', (_req, res) => {
  res.json(support);
});

app.get('/api/services', (_req, res) => {
  res.json({ services });
});

app.get('/api/salons', (_req, res) => {
  res.json({
    salons: salons.map((s) => ({
      id: s.id,
      name: s.name,
      loc: s.loc,
      dist: s.dist,
      phone: s.phone,
      rating: s.rating,
      reviews: s.reviews,
      tier: s.tier,
      hours: s.hours,
      deal: s.deal || null,
      cover: s.cover,
      mapX: s.mapX,
      mapY: s.mapY,
    })),
  });
});

app.get('/api/salons/:id', (req, res) => {
  const salon = salons.find((s) => String(s.id) === String(req.params.id));
  if (!salon) return res.status(404).json({ error: 'Salon not found' });
  res.json({ salon });
});

app.get('/api/bookings', (_req, res) => {
  res.json({ bookings });
});

app.post('/api/bookings', (req, res) => {
  const body = req.body || {};
  if (!body.salonId) {
    return res.status(400).json({ error: 'salonId is required' });
  }
  const booking = {
    id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'upcoming',
    salonId: body.salonId,
    salonName: body.salonName || null,
    services: Array.isArray(body.services) ? body.services : [],
    packages: Array.isArray(body.packages) ? body.packages : [],
    dateIdx: body.dateIdx ?? null,
    time: body.time || null,
    customerName: body.customerName || 'Guest',
  };
  bookings.unshift(booking);
  // Keep demo memory bounded
  if (bookings.length > 200) bookings.length = 200;
  res.status(201).json({ ok: true, booking });
});

app.post('/api/auth/otp/request', (req, res) => {
  const phone = String((req.body && req.body.phone) || '').replace(/\D/g, '');
  if (phone.length < 10) {
    return res.status(400).json({ error: 'Valid phone required' });
  }
  // Demo OTP — always 1234 so reviewers can sign in
  const code = '1234';
  otpStore.set(phone, { code, expiresAt: Date.now() + 10 * 60 * 1000 });
  res.json({
    ok: true,
    message: 'OTP sent (demo). Use 1234.',
    demoCode: process.env.NODE_ENV === 'production' ? undefined : code,
  });
});

app.post('/api/auth/otp/verify', (req, res) => {
  const phone = String((req.body && req.body.phone) || '').replace(/\D/g, '');
  const code = String((req.body && req.body.code) || '');
  const entry = otpStore.get(phone);
  if (code === '1234' || (entry && entry.code === code && entry.expiresAt > Date.now())) {
    otpStore.delete(phone);
    return res.json({
      ok: true,
      token: `demo_${phone}_${Date.now()}`,
      user: { phone, name: 'Aryan' },
    });
  }
  res.status(401).json({ error: 'Invalid or expired OTP' });
});

// PWA: correct MIME for manifest
app.get('/manifest.webmanifest', (_req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(ROOT, 'manifest.webmanifest'));
});

// Static frontend (PWA)
app.use(express.static(ROOT, {
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (filePath.endsWith('sw.js')) {
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Service-Worker-Allowed', '/');
    }
  },
}));

// SPA-style fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Salofy listening on http://0.0.0.0:${PORT}`);
});
