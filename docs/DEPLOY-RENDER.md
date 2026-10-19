# Deploy Salofy (PWA + API) on Render

This repo is a **Progressive Web App** with a small **Express** demo backend. Render’s free web service is enough for demos.

## What you get

| URL path | Purpose |
|----------|---------|
| `https://YOUR-SERVICE.onrender.com/` | Installable PWA (Android Chrome) |
| `/api/health` | Health check |
| `/api/salons` | Salon list (includes `phone` for `tel:` calls) |
| `/api/salons/:id` | Salon detail |
| `/api/bookings` | List / create demo bookings |
| `/api/auth/otp/*` | Demo OTP (`1234`) |
| `/api/support` | Support phone + email |

Free Render dynos **spin down** after idle time; the first request after sleep can take ~30–60s.

---

## Option A — Blueprint (recommended)

1. Push this branch (or merge to `main`) to GitHub.
2. Open [https://dashboard.render.com](https://dashboard.render.com) and sign in (GitHub login works).
3. **New +** → **Blueprint**.
4. Connect the `salofy-app` repository.
5. Render reads `render.yaml` and creates a free **web** service named `salofy-app`.
6. Click **Apply**.
7. When the deploy is live, open the service URL (e.g. `https://salofy-app.onrender.com`).

---

## Option B — Manual web service

1. **New +** → **Web Service**.
2. Connect the GitHub repo `Aryan-Seth-786/salofy-app`.
3. Settings:

   | Field | Value |
   |-------|--------|
   | Runtime | Node |
   | Branch | `main` (or this feature branch) |
   | Build command | `npm install` |
   | Start command | `npm start` |
   | Instance type | **Free** |
   | Health check path | `/api/health` |

4. Add env var `NODE_ENV` = `production`.
5. Deploy.

---

## Local smoke test (before deploy)

```bash
npm install
npm start
# open http://localhost:3000
curl http://localhost:3000/api/health
```

---

## Android PWA install + Call button

1. Open the Render URL in **Chrome on Android**.
2. Menu → **Install app** / **Add to Home screen**.
3. Open a salon → tap the **phone** icon (or Help → **Call Us**).
4. Android should open the **Phone** dialer with the number filled in (`tel:+91…`).

Notes:

- `tel:` links need a real device (or an emulator with a dialer). Desktop browsers usually won’t open a phone app.
- iOS install / call quirks can be handled in a follow-up; this pass is Android-first.
- HTTPS is required for installability — Render provides it automatically.

---

## Custom domain (optional)

In the Render service → **Settings** → **Custom Domains**, add e.g. `app.glazz.in`, then point a CNAME at the Render hostname Render shows you.
