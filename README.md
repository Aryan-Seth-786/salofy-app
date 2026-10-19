# Salofy

Salon booking **PWA** (Android-first) with a small Express demo API.

## Quick start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Features in this branch

- Installable PWA (`manifest.webmanifest` + service worker)
- Call buttons use `tel:` so Android opens the Phone app
- Demo API under `/api/*` (salons, bookings, OTP)
- Render-ready (`render.yaml` + [docs/DEPLOY-RENDER.md](docs/DEPLOY-RENDER.md))

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Serve PWA + API |
| `npm run build` | Bundle design-reference `dist/` |
| `npm run build:app` | Bundle compact app-mode `dist2/` |

## Deploy

See **[docs/DEPLOY-RENDER.md](docs/DEPLOY-RENDER.md)** for step-by-step Render (free) hosting.
