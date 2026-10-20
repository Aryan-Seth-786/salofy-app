/* ═══════════════════════════════════════════════════
   GLAZZ DATA STORE
   Two backends behind one async interface:
   - Postgres (DATABASE_URL set)  → production on Render
   - In-memory (no DATABASE_URL) → local dev / mock mode
   ═══════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const uid = () => crypto.randomBytes(12).toString('hex');
const token = () => crypto.randomBytes(32).toString('hex');
const hash = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const nowPlusDays = (d) => new Date(Date.now() + d * 86400000);

/* ── Catalog (seed data, generated from js/data.js) ── */
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'catalog.json'), 'utf8'));

function computeBookingTotal(salonId, svcIds, pkgIds) {
  const salon = catalog.salons.find(s => s.id === salonId);
  if (!salon) return { error: 'unknown salon' };
  const svcIds2 = (svcIds || []).filter(id => salon.services[id]);
  const pkgIds2 = (pkgIds || []).filter(id => (salon.packages || []).some(p => p.id === id));
  const svcTotal = svcIds2.reduce((a, id) => a + (salon.services[id] || 0), 0);
  const pkgTotal = pkgIds2.reduce((a, id) => a + ((salon.packages || []).find(p => p.id === id) || {}).price || 0, 0);
  const subtotal = svcTotal + pkgTotal;
  const dp = salon.deal ? parseInt(salon.deal) || 0 : 0;
  const discount = (salon.tier !== 'starter' && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  if (svcIds2.length + pkgIds2.length === 0) return { error: 'no valid services or packages' };
  return { svcIds: svcIds2, pkgIds: pkgIds2, total: subtotal - discount };
}

/* ═════════════════════ In-memory store ═════════════════════ */
function memoryStore() {
  const db = {
    users: new Map(), otp: new Map(), sessions: new Map(), salons: new Map(),
    favorites: new Map(), bookings: new Map(), addresses: new Map(), notifications: new Map(),
  };
  return {
    mode: 'memory',
    async init() {
      if (db.salons.size === 0) catalog.salons.forEach(s => db.salons.set(s.id, s));
    },
    async health() { return { mode: 'memory' }; },
    async getCatalog() { return catalog; },
    async upsertOtp(phone, code, expiresAt) { db.otp.set(phone, { code_hash: hash(code), expires_at: expiresAt, attempts: 0 }); },
    async getOtp(phone) { return db.otp.get(phone) || null; },
    async bumpOtpAttempts(phone) { const o = db.otp.get(phone); if (o) o.attempts++; },
    async upsertUserByPhone(phone) {
      for (const u of db.users.values()) if (u.phone === phone) return u;
      const u = { id: uid(), phone, name: null, email: null, gender: null };
      db.users.set(u.id, u); return u;
    },
    async createSession(userId) { const t = token(); db.sessions.set(t, { userId, expiresAt: nowPlusDays(90) }); return t; },
    async getSessionUser(t) {
      const s = db.sessions.get(t);
      if (!s || s.expiresAt < new Date()) return null;
      return db.users.get(s.userId) || null;
    },
    async deleteSession(t) { db.sessions.delete(t); },
    async updateUser(id, patch) {
      const u = db.users.get(id); if (!u) return null;
      for (const k of ['name', 'email', 'gender']) if (patch[k] !== undefined) u[k] = patch[k];
      return u;
    },
    async getFavorites(userId) {
      const set = db.favorites.get(userId) || new Set();
      return [...set];
    },
    async setFavorite(userId, salonId, on) {
      if (!db.favorites.has(userId)) db.favorites.set(userId, new Set());
      const set = db.favorites.get(userId);
      if (on) set.add(salonId); else set.delete(salonId);
      return [...set];
    },
    async listBookings(userId) {
      return [...db.bookings.values()].filter(b => b.user_id === userId)
        .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
    },
    async createBooking(userId, fields) {
      const b = { id: 'BK' + uid().slice(0, 6).toUpperCase(), user_id: userId, status: 'upcoming', ...fields, created_at: new Date().toISOString() };
      db.bookings.set(b.id, b); return b;
    },
    async updateBooking(id, patch) {
      const b = db.bookings.get(id); if (!b) return null;
      Object.assign(b, patch); return b;
    },
    async listAddresses(userId) {
      return [...db.addresses.values()].filter(a => a.user_id === userId);
    },
    async createAddress(userId, { label, address, isDefault }) {
      const a = { id: uid(), user_id: userId, label, address, isDefault: !!isDefault };
      db.addresses.set(a.id, a); return a;
    },
    async deleteAddress(id, userId) {
      const a = db.addresses.get(id);
      if (a && a.user_id === userId) db.addresses.delete(id);
    },
    async listNotifications(userId) {
      return [...db.notifications.values()].filter(n => n.user_id === userId)
        .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    },
    async createNotification(userId, n) {
      const row = { id: uid(), user_id: userId, ...n, created_at: new Date().toISOString() };
      db.notifications.set(row.id, row); return row;
    },
  };
}

/* ═════════════════════ Postgres store ═════════════════════ */
function pgStore(databaseUrl) {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: databaseUrl, max: 8, ssl: databaseUrl.includes('sslmode') ? undefined : { rejectUnauthorized: false } });

  const q = (text, params) => pool.query(text, params);
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

  return {
    mode: 'postgres',
    async init() {
      await q(schema);
      const { rows } = await q('SELECT COUNT(*)::int AS n FROM salons');
      if (rows[0].n === 0) {
        for (const s of catalog.salons) await q('INSERT INTO salons (id, data) VALUES ($1, $2) ON CONFLICT DO NOTHING', [s.id, JSON.stringify(s)]);
      }
    },
    async health() {
      await q('SELECT 1');
      return { mode: 'postgres' };
    },
    async getCatalog() { return catalog; },
    async upsertOtp(phone, code, expiresAt) {
      await q(`INSERT INTO otp_codes (phone, code_hash, expires_at, attempts)
               VALUES ($1, $2, $3, 0)
               ON CONFLICT (phone) DO UPDATE SET code_hash = $2, expires_at = $3, attempts = 0`,
        [phone, hash(code), expiresAt]);
    },
    async getOtp(phone) {
      const { rows } = await q('SELECT * FROM otp_codes WHERE phone = $1', [phone]);
      return rows[0] || null;
    },
    async bumpOtpAttempts(phone) { await q('UPDATE otp_codes SET attempts = attempts + 1 WHERE phone = $1', [phone]); },
    async upsertUserByPhone(phone) {
      const { rows } = await q(
        `INSERT INTO users (id, phone) VALUES ($1, $2)
         ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone
         RETURNING *`, [uid(), phone]);
      return rows[0];
    },
    async createSession(userId) {
      const t = token();
      await q('INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)', [t, userId, nowPlusDays(90)]);
      return t;
    },
    async getSessionUser(t) {
      const { rows } = await q(
        `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
         WHERE s.token = $1 AND s.expires_at > now()`, [t]);
      return rows[0] || null;
    },
    async deleteSession(t) { await q('DELETE FROM sessions WHERE token = $1', [t]); },
    async updateUser(id, patch) {
      const { rows } = await q(
        `UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), gender = COALESCE($4, gender)
         WHERE id = $1 RETURNING *`, [id, patch.name ?? null, patch.email ?? null, patch.gender ?? null]);
      return rows[0] || null;
    },
    async getFavorites(userId) {
      const { rows } = await q('SELECT salon_id FROM favorites WHERE user_id = $1 ORDER BY salon_id', [userId]);
      return rows.map(r => r.salon_id);
    },
    async setFavorite(userId, salonId, on) {
      if (on) await q('INSERT INTO favorites (user_id, salon_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, salonId]);
      else await q('DELETE FROM favorites WHERE user_id = $1 AND salon_id = $2', [userId, salonId]);
      return this.getFavorites(userId);
    },
    async listBookings(userId) {
      const { rows } = await q('SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
      return rows.map(r => ({ ...r, svc_ids: r.svc_ids || [], pkg_ids: r.pkg_ids || [] }));
    },
    async createBooking(userId, f) {
      const id = 'BK' + uid().slice(0, 6).toUpperCase();
      await q(
        `INSERT INTO bookings (id, user_id, salon_id, svc_ids, pkg_ids, date, time, status, total)
         VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, 'upcoming', $8)`,
        [id, userId, f.salon_id, JSON.stringify(f.svc_ids), JSON.stringify(f.pkg_ids), f.date, f.time, f.total]);
      const { rows } = await q('SELECT * FROM bookings WHERE id = $1', [id]);
      return rows[0];
    },
    async updateBooking(id, patch) {
      const sets = [], params = [id];
      if (patch.date !== undefined) { params.push(patch.date); sets.push(`date = $${params.length}`); }
      if (patch.time !== undefined) { params.push(patch.time); sets.push(`time = $${params.length}`); }
      if (patch.status !== undefined) { params.push(patch.status); sets.push(`status = $${params.length}`); }
      if (!sets.length) return null;
      const { rows } = await q(`UPDATE bookings SET ${sets.join(', ')} WHERE id = $1 RETURNING *`, params);
      return rows[0] || null;
    },
    async listAddresses(userId) {
      const { rows } = await q('SELECT * FROM addresses WHERE user_id = $1', [userId]);
      return rows;
    },
    async createAddress(userId, a) {
      const id = uid();
      const { rows } = await q(
        'INSERT INTO addresses (id, user_id, label, address, is_default) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, userId, a.label, a.address, !!a.isDefault]);
      return rows[0];
    },
    async deleteAddress(id, userId) {
      await q('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [id, userId]);
    },
    async listNotifications(userId) {
      const { rows } = await q('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return rows;
    },
    async createNotification(userId, n) {
      const id = uid();
      const { rows } = await q(
        `INSERT INTO notifications (id, user_id, icon, bg, title, body, time, category, action, goto_salon)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [id, userId, n.icon, n.bg, n.title, n.body, n.time, n.category, n.action ?? null, n.goto_salon ?? null]);
      return rows[0];
    },
  };
}

module.exports = { store: process.env.DATABASE_URL ? pgStore(process.env.DATABASE_URL) : memoryStore(), computeBookingTotal, catalog, uid, token, hash };
