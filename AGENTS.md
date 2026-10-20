# AGENTS.md

## What this is

GLAZZ (prototype name: **Salofy**) — a salon-booking app. Pure vanilla JS + CSS frontend (no framework, classic `<script>` tags sharing one global scope) with a zero-dependency Node backend (`server/`). No frontend bundler, no tests, no lint. `js/data.js` is the mock/fallback dataset AND the seed source for the real database.

## Three runtimes (same screen code)

1. **Prod PWA** — `pwa/index.html` + `js/api.js` + `js/app-prod.js`: single-screen app wired to the live API (`/api/*`). Served by `server/` on Render at `https://salofy-app.onrender.com`. Sets `window.APP_MODE = 'prod'` before any script; screens branch on it (e.g. OTP `verify-otp` vs demo `go-onboarding`).
2. **Demo / design reference** — root `index.html` + `js/app.js`: every screen stacked in a phone frame with a pill-bar nav. Kept for design review; still fully clickable.
3. **Legacy bundles** — `build.js` → `dist/`, `build2.js` → `dist2/` (app-mode concat builds, pre-PWA). Note: `build2.js` omits `js/components/service-card.js` + `package-card.js` — those builds are broken for salon-profile/booking screens; use the PWA instead.

## Running & building

```sh
node server/index.js        # prod app on :8090 (mock store if no DATABASE_URL)
DATABASE_URL=… node server/index.js   # Postgres mode (what Render runs)
python3 -m http.server 8090 # demo/design reference only
node -e "…"                 # regenerate server/catalog.json (below)
```

No `npm install` needed locally — the server core is `node:http` only; `pg` is lazy-required just for Postgres mode. Icons: `python3 pwa/icons/gen_icons.py` (pure stdlib; writes the PNGs in place).

## The load-order trap (most important thing here)

Script lists are duplicated by hand. Adding a screen/component file means updating **six places**:

1. Root `index.html` (demo) `<script>` tags
2. `pwa/index.html` (prod) `<script>` tags
3. `pwa/sw.js` `SHELL_ASSETS` precache list (keep in exact sync with #2)
4. `build.js` / `build2.js` `jsFiles` (legacy — optional)
5. The `screens` registry array in `js/app.js` AND `js/app-prod.js`
6. Re-generate `server/catalog.json` if you changed salons/services data

```sh
node -e "const fs=require('fs');const d=eval(fs.readFileSync('js/data.js','utf8')+';({allServices,salons})');fs.writeFileSync('server/catalog.json',JSON.stringify({version:1,services:d.allServices,salons:d.salons},null,1))"
```

`js/data.js` remains the offline fallback for the PWA — hydrate mutates the `salons`/`bookings` **arrays in place** (they're `const`), never reassigns.

## Server (`server/`)

- `index.js` — zero-dep HTTP server: static host + API. Routes: `/` → `pwa/index.html`, `/demo` → root `index.html`, `/privacy`, `/js|/css|/pwa|/docs|/.well-known` static (path-traversal guarded), `/api/*` JSON. `/api/health` is the Render health check path.
- `store.js` — one async interface, two backends: Postgres (`DATABASE_URL`) or in-memory. Schema in `schema.sql` runs + seeds salons on boot.
- Auth: phone + **demo OTP** (no SMS provider — `POST /api/auth/request-otp` returns `demoOtp` in the response and logs it; the OTP screen shows it in prod mode). Sessions: random bearer token, 90-day expiry, stored in `sessions`; the client keeps it in `localStorage` (`glazz_token`) — login once, then boot goes straight to home.
- Booking totals are **recomputed server-side** from `catalog.json` (never trust client prices).

## Prod frontend notes

- Phone-specific behaviors: **call buttons are real `<a href="tel:…">` links** (`salon.phone` in data.js); directions buttons open Google Maps (`salon.lat/lng`); geolocation (`Geo` in `js/api.js`) rewrites `salon.dist` labels and powers the `near-me` filter — works in the TWA/PWA, no app changes needed.
- `toast()` exists only in prod mode — don't use `alert/confirm/prompt` anywhere (they're suppressed in TWA).
- `Icons.*` (in `js/icons.js`) is the only sanctioned SVG source; colors via `C.*` constants (mirror of `css/tokens.css`).
- Service worker: network-first for pages/assets (fresh deploys), `/api/*` never cached, offline fallback `pwa/offline.html`. Bump `VERSION` in `pwa/sw.js` when you want clients to drop old caches.
- Canonical service/package display: `ServiceCard` / `PackageCard` (`js/components/`) — see `docs/superpowers/specs/2026-05-07-bookings-service-consistency-design.md`.

## Deployment (Render, free tier)

- Web service **salofy-app** (`srv-dbbgftlg1s2s738tdftg`): branch `full-app`, rootDir `server`, `npm install` / `npm start`, free plan, region oregon, health check `/api/health`. Auto-deploys on push to that branch. Free = spins down after 15 min idle (~1 min cold start).
- Postgres **free tier**: 1 GB, **expires 30 days after creation** (then 14-day grace, then deleted — it does NOT auto-charge; you must upgrade to keep it). Only one free DB per workspace. `DATABASE_URL` env var on the service holds the internal connection string.
- **Android**: the PWA is the packaging source — PWABuilder (pwabuilder.com) generates the TWA APK/AAB from `https://salofy-app.onrender.com`. After generating, put the APK's signing SHA256 fingerprint into `server/.well-known/assetlinks.json` (package `com.glazz.app`) and redeploy.
- GitHub Pages (`.github/workflows/static.yml`) still deploys the whole repo on push to `main` — pushes to `full-app` don't touch it.

## Context docs

- `docs/play-store/GLAZZ-in-Play-Store-Prep.md` — store naming/copy (paste-ready, don't rewrite); this repo is the product frontend+backend prototype; native apps are built from it via the TWA.
- `privacy/index.html` is hosted standalone as `https://glazz.in/privacy` (also served by the server at `/privacy`).
