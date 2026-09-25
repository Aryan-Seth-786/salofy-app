# GLAZZ.in — Play Store Prep Pack

Use this while waiting for Play Console / App Store account access.
Anything marked **DO NOW** does not need uncle’s login.
Anything marked **WAIT** needs Play Console (or Apple) access.

---

## 0. What this app is (for listing copy)

GLAZZ.in is a salon discovery & booking app:

- Discover salons and deals near you
- Search / filter services (haircut, facial, bridal, etc.)
- Book in seconds
- Pay at the salon (no upfront payment)
- Manage bookings, favorites, profile

Old working name in code: **Salofy**. Store-facing name should be **GLAZZ.in** (or a short variant below).

---

## 1. App name brainstorm

Play Store **app name** limit: **30 characters**.

### Recommended store name

| Option | Chars | Notes |
|--------|------:|-------|
| **GLAZZ.in** | 8 | Final brand. Clear, unique, matches domain. **Recommended.** |
| GLAZZ | 5 | Shorter; loses the `.in` brand signal |
| GLAZZ Salon Booking | 19 | More searchable, but weaker brand-first |
| GLAZZ - Book Salons | 19 | Descriptive; still brand-led |
| GLAZZ Beauty & Salon | 20 | Category-clear; slightly generic |

**Recommendation:** use **`GLAZZ.in`** as the Play Store title. Put searchable phrases in the short/full description, not in the title.

### Tagline options (for feature graphic / short description)

1. Discover · Book · Glow *(matches current splash)*
2. Book salons. Pay at the chair.
3. Salon deals near you — book in seconds
4. Find your glow. Book nearby.
5. Beauty bookings, zero upfront

### Package / application ID (decide now — hard to change later)

Pick one and lock it before first upload:

- `in.glazz.app` ✅ preferred (matches brand + India)
- `com.glazz.app`
- `in.glazz.android`

**Do not** ship with `com.salofy…` if the public brand is GLAZZ.in.

---

## 2. DO NOW vs WAIT (checklist mapped)

### DO NOW — no Play Console needed

| # | Item | Your action |
|---|------|-------------|
| A | Final app name | Confirm **GLAZZ.in** (or pick from §1) |
| B | Package / application ID | Lock with Android engineer / build config |
| C | Free vs Paid | Decide: almost certainly **Free** |
| D | Default language | **English (India)** or **English (US)** — pick one |
| E | Category | **Lifestyle** or **Beauty** (Beauty if available; else Lifestyle) |
| F | Short + full description | Copy from §3 below; edit as needed |
| G | Store icon 512×512 PNG | Design / export (**max 1 MB**) |
| H | Feature graphic 1024×500 | Design / export |
| I | Phone screenshots (6–8) | Capture from release build — plan in §4 |
| J | Privacy policy page | Write + host on **HTTPS** (e.g. `https://glazz.in/privacy`) |
| K | In-app privacy policy link | Add in Profile / Help if not already |
| L | Account / data deletion flow | Backend + in-app path + policy wording |
| M | Reviewer test account | Create phone number + OTP path that works for Google |
| N | Data Safety answers draft | Fill §5 with real SDK list from the Android app |
| O | Ads declaration answer | Confirm: ads yes/no (and which SDK) |
| P | Target audience | Adults / general; **not** designed for children |
| Q | Permissions audit | Camera, location, notifications, media — only keep what’s used |
| R | Signed release AAB | Build + test on a clean device |
| S | Production config | Prod API URL, Firebase, no debug logs/endpoints |
| T | Signing key backup | Store upload key / keystore offline safely |
| U | Release notes | Use §6 template |
| V | Internal testers list | Collect 5–20 emails/phones for Internal Testing |

### WAIT — needs uncle’s Play Console login

| # | Item | Why it waits |
|---|------|--------------|
| 1 | Developer account verified | Console access |
| 2 | Create new app in Console | Console access |
| 3 | Upload AAB to Internal Testing | Console access |
| 4 | Upload store listing text/graphics | Console access |
| 5 | Paste privacy policy URL | Console access |
| 6 | Data Safety form submit | Console access |
| 7 | Ads / Audience / Content rating | Console questionnaires |
| 8 | App access / reviewer instructions | Console form |
| 9 | Category & tags select | Console |
| 10 | Production release submit | Console |
| 11 | Merchant / payments profile | Only if IAP/subscriptions (likely N/A if pay-at-salon) |

**Apple App Store** (if applicable later): same split — prepare assets/copy now; account + submit when uncle shares Apple Developer access.

---

## 3. Store listing — ready to paste

### App name (≤30)

```
GLAZZ.in
```

### Short description (≤80) — pick one

**Option A (recommended):**
```
Discover salons near you, book in seconds, and pay at the salon. No upfront payment.
```
(79 chars)

**Option B:**
```
Book nearby salons & beauty deals. Discover, book, glow — pay only at the chair.
```
(78 chars)

**Option C:**
```
Find salons, compare deals, and book appointments. Pay at the salon — not online.
```
(80 chars)

### Full description (≤4,000)

```
GLAZZ.in helps you discover salons and beauty services near you — then book in seconds.

Whether you need a haircut, facial, bridal package, or a quick grooming session, GLAZZ.in makes it simple to find the right salon, pick a service, and confirm your slot.

Why GLAZZ.in?

• Discover deals near you — browse offers from salons in your area
• Book in seconds — pick a service, choose a time, confirm
• Pay at the salon — no upfront payment and no card required to book
• Search & filter — find salons and services that match what you need
• Packages & savings — see bundled services and what you save
• Manage bookings — view upcoming visits, reschedule when needed
• Save favorites — keep your preferred salons close
• Stay updated — get alerts about bookings and offers

How it works

1. Sign in with your phone number
2. Choose your city and preferences
3. Explore salons, services, and deals nearby
4. Book your appointment
5. Visit the salon and pay there

GLAZZ.in is built for people who want beauty bookings without friction — clear prices, fast booking, and payment only when the service is done.

Download GLAZZ.in and find your next glow-up nearby.
```

### Release notes (initial)

```
Initial release of GLAZZ.in

• Discover salons and deals near you
• Search and browse services and packages
• Book appointments in seconds
• Pay at the salon — no upfront payment
• Manage bookings, favorites, and profile
```

---

## 4. Graphics & screenshot plan

### Required assets

| Asset | Spec | Status |
|-------|------|--------|
| App icon | 512 × 512 PNG, ≤1 MB, no transparency preferred for Play | ⬜ |
| Feature graphic | 1024 × 500 | ⬜ |
| Phone screenshots | Multiple; min usually 2; aim for **6–8** | ⬜ |

### Screenshot shot list (from checklist §7)

Capture from a **production-like** build. No debug banners, fake “localhost”, or unfinished UI.

1. **Home** — main value (deals / nearby salons)
2. **Search** — discovery entry
3. **Filters / service selection**
4. **Search results**
5. **Salon detail / profile**
6. **Packages or key service flow**
7. **Deals / savings** screen
8. **Booking confirmed** (or checkout-style confirmation)

Tips:
- Use readable text; avoid tiny labels
- Prefer real (or realistic) salon names/prices
- Capture light mode if that’s the primary UI; add dark only if the app ships it
- Same device frame style across all shots

### Feature graphic idea

- Left: **GLAZZ.in** wordmark large
- Right / background: salon atmosphere photo (real visual, not abstract purple gradient)
- Thin supporting line: `Discover · Book · Glow` or `Book salons. Pay at the chair.`
- No fake ratings, “#1 app”, or award badges

---

## 5. Privacy, Data Safety, permissions (draft)

> Confirm every line against the **real Android app + SDKs** (Firebase, Maps, analytics, crash reporting, OTP, etc.). This draft is based on the product flow in this repo.

### Privacy policy — must cover

- Account: phone number, name, gender preference, city/address
- Location: city selection / nearby search / map (if used)
- Bookings & favorites history
- Device / crash / analytics data (if Crashlytics / GA / similar)
- Profile photo (if camera/gallery used)
- Notifications (FCM tokens if used)
- Sharing with salons / payment partners (if any)
- Retention, deletion, contact email
- Third-party SDKs list

**Host at:** `https://glazz.in/privacy` (or your real domain) over **HTTPS**.

Also add in-app access: Profile → Privacy Policy (or Help & Support).

### Likely Data Safety categories (verify)

| Data type | Collected? | Shared? | Notes |
|-----------|------------|---------|-------|
| Phone number | Yes | Maybe (OTP / backend) | Account login |
| Name | Yes | Possibly with salon | Profile |
| Location | Likely | Backend | Nearby / map / city |
| Photos | If profile pic | Backend | Optional |
| App activity | If analytics | Analytics vendor | Events |
| Crash logs | If Crashlytics | Google | Diagnostics |
| Device IDs | If analytics/push | Vendors | FCM / analytics |

Encryption in transit: **Yes** (HTTPS) if that’s true for your API.

### Ads

- If **no ad SDK and no ads shown** → declare **No ads**
- If AdMob / any banner/interstitial → declare **Yes** and update Data Safety

### Target audience

- Primary: **18+** adults booking salons
- Do **not** include children / Families program unless the product is redesigned for kids

### Content rating

Answer the questionnaire honestly: lifestyle / utility booking; no violence, gambling, etc. (adjust if deals/referrals change that).

### Sensitive permissions likely in app

| Permission | When to keep |
|------------|--------------|
| Location | Only if nearby/map is real in release |
| Notifications | Booking alerts / offers |
| Camera / photos | Profile photo only — request at use time |
| Microphone | Remove if unused |
| Background location | **Do not** request |

### App access / reviewer instructions (prepare text now)

```
GLAZZ.in uses phone OTP login.

Test account:
• Phone: <PROVIDE_WORKING_TEST_NUMBER>
• OTP: <PROVIDE_FIXED_OTP_OR_INSTRUCTIONS>

Steps for reviewers:
1. Open the app
2. Enter the test phone number above
3. Enter the OTP provided (or check the note below)
4. Complete onboarding (gender/city) if prompted
5. Home → Search → open any salon → book a service

Notes:
• No payment is required inside the app (pay at salon).
• Location permission: allow for nearby results; city can also be selected manually.
• If OTP SMS is delayed in your region, use the fixed test OTP above.
```

Create that test number **before** Console access so uncle can paste it immediately.

### Account / data deletion

Google requires a way to delete accounts/data if users can create accounts.

Prepare:
1. In-app: Profile → Delete account
2. Web fallback: `https://glazz.in/delete-account` (form or email)
3. Privacy policy section explaining what is deleted vs retained (e.g. completed booking records for legal reasons)

---

## 6. Release AAB prep (engineering — DO NOW)

- [ ] Signed release `.aab` with production signing
- [ ] `applicationId` = final package (`in.glazz.app` or chosen)
- [ ] `versionCode` unique / starting at 1 for first upload
- [ ] `versionName` e.g. `1.0.0`
- [ ] Production API / Firebase / Maps keys
- [ ] No test endpoints, staging hosts, or verbose debug logs
- [ ] Target SDK meets current Play requirement (verify in Console when available)
- [ ] Install release build on clean device and run §7 tests
- [ ] Backup keystore + passwords offline (password manager + second sealed copy)

---

## 7. Testing before production (DO NOW on release build)

- [ ] Login / OTP
- [ ] Onboarding
- [ ] Search + filters
- [ ] Salon detail + packages
- [ ] Booking + confirmation
- [ ] My bookings / reschedule
- [ ] Favorites
- [ ] Profile edit / logout
- [ ] Account deletion
- [ ] Permissions allow + deny paths
- [ ] No network / slow network
- [ ] Android back navigation
- [ ] App kill + relaunch mid-flow
- [ ] Notifications (if enabled)
- [ ] Crash reporting receives a test crash (staging or carefully)

---

## 8. When uncle shares Console access — paste order

1. Create app → name **GLAZZ.in** → App → Free → default language  
2. Store listing → paste short/full description → upload icon, feature graphic, screenshots  
3. Set category + tags  
4. Privacy policy URL  
5. App content: Ads, Audience, Content rating, Data Safety, App access  
6. Upload AAB → **Internal testing** first → add testers  
7. Fix any blockers → Closed testing if needed  
8. Production release + release notes → submit  

---

## 9. Handoff kit for uncle (zip these)

Put these in one folder / Drive link:

1. Final app name + package ID decision  
2. Short description + full description (`.txt`)  
3. Release notes  
4. Icon `icon-512.png`  
5. Feature graphic `feature-1024x500.png`  
6. Screenshots folder (ordered 01–08)  
7. Privacy policy URL  
8. Data Safety answer sheet (from §5, filled with real SDKs)  
9. Reviewer access instructions + test OTP  
10. Signed `.aab` + versionCode/versionName note  
11. Category choice + ads yes/no  

Once that kit is ready, Console work is mostly paste-and-upload.

---

## 10. Decisions still needed from you

1. Confirm store title: **GLAZZ.in** vs shorter **GLAZZ**  
2. Confirm package ID: prefer `in.glazz.app`  
3. Confirm domain for privacy: does `glazz.in` already exist?  
4. Ads: yes or no in the real Android build?  
5. Which SDKs ship in production? (list them for Data Safety)  
6. Is pay-at-salon still true for v1 (no in-app payments)?  
