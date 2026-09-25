# GLAZZ — Play Store Prep Pack

> This repo is a **frontend prototype only**. The real Android/iOS apps live elsewhere.
> Use this doc for brand/store decisions and handoff copy — not as the shipping app source.

---

## Who owns what

### Your lane (do these)

| Item | Decision / deliverable |
|------|------------------------|
| **App store display name** | Prefer **`GLAZZ`** (see §1) |
| **Package / application ID** | Prefer **`com.glazz.app`** (see §2) — tell Android + iOS devs before first store upload |
| **Logo / store icon** | 512×512 PNG for Play (+ iOS icon set when needed) |
| **Store short + full description** | Ready in `docs/play-store/copy/` — use those in Console when you have access |
| **Privacy policy page** | Live page in repo: `privacy/index.html` → host as **`https://glazz.in/privacy`** |

Short/full description files are intentional paste-ready copy for Play Console. No need to rewrite unless the product changes.

### Uncle / Android-iOS / backend lane (not yours)

- Reviewer test phone + always-works OTP
- Real production SDK list + Data Safety answers
- Signed release AAB / iOS build, prod config, testing
- Keystore / signing backup
- Internal tester emails
- Screenshots from the real app
- Play Console / App Store account actions when logins are available
- Account deletion backend wiring (you can still own the *policy wording*)

---

## 1. App name: `GLAZZ` vs `GLAZZ.in`

### Recommendation: store name = **`GLAZZ`**

| Surface | What to use |
|---------|-------------|
| Play / App Store title | **GLAZZ** |
| Website / email | **glazz.in** |
| In-app splash / wordmark | **GLAZZ** (optionally small “glazz.in” in footer/about) |
| Marketing line | Keep India flavor in **description**, not in the title |

### Why not put `.in` in the app name?

1. **`.in` is a website TLD, not part of the brand word.** Flipkart, Zomato, Swiggy, etc. don’t put `.in` in the store title even when the site is `.in` / `.com`.
2. **Global expansion.** “GLAZZ.in” reads India-only. “GLAZZ” travels; you localize copy later.
3. **Search / sayability.** People search and say “GLAZZ”, not “GLAZZ dot in”.
4. **You still keep the India signal** via domain `glazz.in`, India-first listing text, INR/cities, and Play country targeting — without baking geography into the title.

Using **GLAZZ.in** as the title is still *allowed* (under 30 chars). It’s a style choice, not a legal requirement. Prefer **GLAZZ** unless you specifically want the domain as the brand mark.

---

## 2. Buying `glazz.in` (not `.com`) — legal / trademark notes

**Not legal advice.** For clearance, have a trademark attorney search IP India (and later USPTO/EUIPO if you expand).

### Short answer

Buying **`glazz.in`** because **`.com` was taken** is normal and **does not by itself** create a copyright or trademark problem. Domain ownership ≠ trademark rights, and missing `.com` ≠ infringement.

### What actually matters

| Layer | What it protects | Relation to `.in` |
|-------|------------------|-------------------|
| **Domain** (`glazz.in`) | Where your site lives | Fine to launch on `.in` only |
| **App store name** | Listing title uniqueness-ish | Separate from domain |
| **Trademark** | Who can use the mark for similar goods/services in a territory | **This** is the real risk surface |
| **Copyright** | Creative works (logo art, code, copy) — **not** short brand names | Names are trademark territory |

Trademark risk comes from **confusing similarity** in the **same/related classes** (for an app: typically **Class 9** downloadable software / **Class 42** software services in India), not from which TLD you bought.

### Practical risks of not owning `.com`

- Users may type `glazz.com` and land on someone else (confusion / phishing feel).
- Someone else could brand around that `.com` later.
- **Mitigations:** use `glazz.in` everywhere; later try to buy/lease `.com` if it becomes available; register social handles; file trademark in India (Classes 9/42).

None of that means “buying `.in` is illegal.”

### Quick public scan (not a formal clearance)

- India has a registered **“Glazz”** mark in **Class 19 (plywood / wood boards)** — different industry; usually low conflict with a salon booking app, but a lawyer should confirm.
- Older US **GLAZZ** (nightclubs) appears **dead**.
- Sound-alikes in beauty apps exist (e.g. **Glazii / Glazzi** nail try-on) — different spelling/product, but worth noting for “looks/sounds similar” reviews.
- Do a proper search on [IP India Public Search](https://tmrsearch.ipindia.gov.in/tmrpublicsearch/) for **GLAZZ / GLAZ / GLAZE / GLAZZI** in Classes **9** and **42** before filing.

**Bottom line:** Launching on **`glazz.in`** with store name **`GLAZZ`** is a reasonable India-first setup. The open item is **trademark clearance + eventual filing**, not “is `.in` without `.com` illegal?”

---

## 3. Package / application ID

### Recommendation: **`com.glazz.app`**

| Option | When it makes sense |
|--------|---------------------|
| **`com.glazz.app`** ✅ | Best default for India-first **and** global later. Industry-standard. Stable forever. |
| `in.glazz.app` | Strict reverse-DNS of owned domain `glazz.in`. Fine, but *looks* country-locked and is unnecessary. |
| `com.glazz.in` | Awkward; avoid. |

### Why `com.` even if you only own `.in`?

- Android package IDs are **identifiers**, not proof you own that domain. Play does not require you to own `glazz.com`.
- Changing `applicationId` after publish = **new app** (users don’t update across). Lock it once.
- Global products overwhelmingly use `com.company.app` regardless of website TLD.
- `in.` does **not** improve India SEO or Play ranking; store listing + country availability do.

**Tell the Android/iOS engineers:** lock `com.glazz.app` (and matching iOS bundle id style, e.g. `com.glazz.app`) before first upload.

---

## 4. India-first now, global later — without losing India specificity

You don’t need `.in` in the title or `in.` in the package to stay India-specific.

| Keep India-specific | Keep globally flexible |
|---------------------|------------------------|
| Website `glazz.in` | Store title **GLAZZ** |
| Default listing language: English (India) | Package **`com.glazz.app`** (never change) |
| Cities, INR, “pay at salon”, local salon inventory | Later: add Play **localized store listings** (languages/countries) |
| India-first screenshots & feature graphic | Same app binary; expand country availability in Console |
| Privacy policy under Indian DPDP / your counsel’s wording | Add regional policy sections when you enter new markets |
| Trademark file in **India** first | File other territories when expansion is real |

Play/App Store let one package serve many countries with **different listing text** per locale. So: one global ID + India-flavored default listing today; English (US)/other locales later without renaming.

---

## 5. Store listing drafts (optional for you)

### App name (≤30)

```
GLAZZ
```

### Short description (≤80)

```
Discover salons near you, book in seconds, and pay at the salon. No upfront payment.
```

### Full description / release notes / reviewer template

See `docs/play-store/copy/` — update “GLAZZ.in” → “GLAZZ” in titles where needed. Reviewer OTP remains **uncle’s** job.

---

## 6. Logo / icon (your lane)

Assets in `docs/play-store/assets/`:

| File | Use |
|------|-----|
| `icon-512.png` | Play Store upload — **exotic liquid glaze drop** (sculpted fluid physics, NO letter G) |
| `icon.svg` | Scalable vector icon of the exotic liquid drop |
| `icon-exotic-drop.png` | High-res master asset of the exotic liquid drop |
| `wordmark.png` / `wordmark.svg` | Site header, splash, feature graphic — **clean luxury typography** (pure G-L-A-Z-Z; NO artificial slashes) |
| `icon-512.png` | Play Store icon upload candidate |
| `icon-option-star-gleam.png` | Alternative App Icon: **Crystalline Beauty Star / Glow Gleam** (radiant salon finish) |
| `icon-option-monogram-zz.png` | Alternative App Icon: **Crystalline 'ZZ' Monogram** |
| `mark.png` / `mark.svg` | Glaze-drop symbol |
| `../splash-demo.html` | Interactive exotic splash prototype (drop falls on right, splashes on rose Z, reveals clean logo) |

Brand colors: rose `#f43f5e`, ink `#1f1a17`, cream `#fbf9f8`.

**Splash motion & physics (v2):**
- Exotic fluid droplet drops along an organic trajectory on the **right side** of the screen
- Terminal impact squarely hits the **ZZ** character position
- Creates dynamic liquid burst particles + luminous shockwave
- Impact reveals the glowing rose **ZZ**, shoots the slash accent, and sweeps in the white **GLAZ** wordmark from the left
- Tagline *Discover · Book · Glow* resolves underneath
- Interactive demo: open `docs/play-store/splash-demo.html` to preview & replay.

---

## 7. Privacy policy URL (your lane)

**Page source in this repo:** `privacy/index.html`

**Play Console URL to paste (once hosted on your domain):**

- `https://glazz.in/privacy`

Policy stance (as specified):
- We do **not** sell/share personal data with third parties for their marketing
- We use data to run the app and to show **more relevant** salons/results
- Booking details go to the **salon you book** (needed to fulfil the appointment)

Host this file on `glazz.in` so the path `/privacy` (or `/privacy/`) serves it over HTTPS. Until the domain is live, GitHub Pages from this repo can serve it temporarily at `/privacy/` after merge to `main`.

Contact email used in the page: `privacy@glazz.in` — change if you use a different inbox.

Also plan a deletion path later (backend): `https://glazz.in/delete-account`.

---

## 8. When uncle has Console access (their checklist, not yours)

1. Create app → name **GLAZZ** → Free  
2. Confirm package from uploaded AAB = `com.glazz.app`  
3. Paste listing + upload icon / screenshots / feature graphic  
4. Privacy URL  
5. Data Safety / ads / audience / content rating / reviewer access  
6. Internal testing → production  

---

## 9. Decisions to lock with the team

1. **Store name:** **GLAZZ** (recommended) vs GLAZZ.in  
2. **Package:** **`com.glazz.app`** (recommended) — send to Android + iOS devs  
3. **Domain:** keep **`glazz.in`**; optionally pursue `.com` later if available  
4. **Privacy URL:** `https://glazz.in/privacy`  
5. Trademark: schedule IP India Class 9/42 search + file when ready  
