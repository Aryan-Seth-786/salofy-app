/* ═══════════════════════════════════════════════════
   SALOFY API CLIENT
   Talks to the Express backend when available; demo
   flows still work offline from local data.js.
   ═══════════════════════════════════════════════════ */

const SalofyAPI = (() => {
  const BASE = '';

  async function request(path, options = {}) {
    try {
      const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { ok: false, status: 0, data: { offline: true, error: String(err) } };
    }
  }

  return {
    health: () => request('/api/health'),
    listSalons: () => request('/api/salons'),
    getSalon: (id) => request(`/api/salons/${id}`),
    listServices: () => request('/api/services'),
    support: () => request('/api/support'),
    createBooking: (payload) => request('/api/bookings', { method: 'POST', body: JSON.stringify(payload) }),
    listBookings: () => request('/api/bookings'),
    requestOtp: (phone) => request('/api/auth/otp/request', { method: 'POST', body: JSON.stringify({ phone }) }),
    verifyOtp: (phone, code) => request('/api/auth/otp/verify', { method: 'POST', body: JSON.stringify({ phone, code }) }),
  };
})();

/** Normalize to E.164-ish tel: target for Android dialer */
function toTelHref(phone) {
  if (!phone) return '';
  const raw = String(phone).trim();
  if (raw.startsWith('tel:')) return raw;
  // Keep leading +, strip other non-digits
  const cleaned = raw.replace(/(?!^\+)\D/g, '');
  return cleaned ? `tel:${cleaned}` : '';
}

/**
 * Open the native phone dialer (Android Chrome / installed PWA).
 * Prefer a real <a href="tel:…"> in the UI; this is the JS fallback.
 */
function placeCall(phone) {
  const href = toTelHref(phone);
  if (!href) {
    console.warn('placeCall: missing phone number');
    return false;
  }
  // location.href is the most reliable path inside Android PWAs
  window.location.href = href;
  return true;
}
