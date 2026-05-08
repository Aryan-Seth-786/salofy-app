# Bookings Service & Package Display Consistency

**Date:** 2026-05-07
**Scope:** Make services and packages render consistently inside the bookings ecosystem (booking, booking-confirmed, my-bookings), matching the canonical treatment used on the salon-profile page.

## Goal

A user who selects a service on the salon page should see the same service rendered the same way at every later step (booking, confirmation, history). Today the bookings flow uses ad-hoc flex rows, custom pill classes, and `·`-joined text strings — none of which match the salon-page row + chip system.

## Out of scope

- Salon profile (Services + Packages tabs) — already canonical.
- Salon-card service preview chips on home/search-results — keep `service-tag` rectangles. Different semantic role (passive metadata in a dense scrollable list).
- Search-results filter pills below the search bar — keep as-is. They are filter tokens, not service displays.
- `PackageCard.suggestion` (saffron/green upsell strip) — already visually close to `pkg-chip`; not worth touching.

## Two canonical treatments

| Treatment | When to use | Where it lives today |
|---|---|---|
| **`ServiceCard` row** | Showing a service AS the thing the user has selected, is consuming, or has booked. | `service-card.js`, salon-profile Services tab |
| **`pkg-chip` pill** | Showing services as compact labels inside a package. | `package-card.js` `select` variant, salon-profile Packages tab |

## Component changes

### `ServiceCard` — add `view` variant

Add a third variant alongside the existing `select` and `compact`:

- **`view`** — read-only. Same outer `service-row` / `service-select` shell as `select`, with these deltas:
  - Omit the `.service-select__check` checkbox element entirely.
  - Add modifier class `service-select--readonly` to the row: removes `cursor:pointer`, removes the active/hover lift.
  - When the service is enriched (has a detail page), keep the rose forward-arrow on the right edge — tapping it still opens the detail page.
  - When not enriched, no affordance on the right edge (just price).

Visual: identical to a deselected select-row minus the checkbox circle. Same name, same duration line, same discount badge, same price, same details tag.

The existing `compact` variant is unused after this work and is removed.

### `PackageCard('summary')` — switch chip class

In the `summary` branch of `package-card.js`, swap `<span class="pkg-svc-chip">` → `<span class="pkg-chip">`. This is the only chip change. The rest of the summary card (badge, name, price, layout) stays unchanged.

After this swap, the only remaining users of `pkg-svc-chip*` are the suggestion variant's `--matched` and `--bonus` modifiers. The default `pkg-svc-chip` class becomes unused; remove it from CSS.

### CSS

In `css/components.css`:

- Add `.service-select--readonly` modifier:
  - `cursor: default;`
  - Disable hover/active transforms.
- Remove `.pkg-svc-chip` (default class only). Keep `.pkg-svc-chip--matched` and `.pkg-svc-chip--bonus` since the suggestion variant still uses them.
- Optionally rename the `--matched`/`--bonus` modifiers to attach to `.pkg-chip` instead, but defer this — it's a follow-up cleanup, not part of this spec.

## Per-screen changes

### `js/screens/booking.js`

Two sections render selected items today; both change.

**"Your selection" block (lines 49–71):**
- Replace the custom `service-tag service-tag--matched` pill loop with a stack of `ServiceCard(sid, price, false, discPrice, 'view', s)` rows.
- Package rendering already uses `PackageCard(pkg, true, 'summary')` — unchanged (now uses `pkg-chip` automatically via the component update).

**Bottom Summary box (lines 98–129):**
- Replace the custom flex `name … ₹price` rows for both services and packages with the same `ServiceCard('view')` + `PackageCard('summary')` calls.
- Keep the discount row and the bordered total row at the bottom of the box.

The "Your selection" block and the Summary box now render the same way; this is intentional and matches the existing layout (one is editable preview, the other is the totals breakdown).

### `js/screens/booking-confirmed.js`

Same edit as the booking.js summary section. The selected services + packages list (lines 50–71) becomes `ServiceCard('view')` + `PackageCard('summary')`.

### `js/screens/my-bookings.js`

Each booking card today renders services as `·`-joined text or `svc-detail-link` chips, and packages as a one-off custom rose-tinted box.

- Replace the inline custom package box (lines 29–42) with `PackageCard(pkg, false, 'summary')`.
- Replace the `·`-joined / chip service text (lines 43–54) with a vertical stack of `ServiceCard('view')` rows.

**Density trade-off accepted:** each booking row gets taller. User-confirmed during brainstorming.

## Migration order

The component edits (ServiceCard `view` variant + PackageCard chip swap) ship first; the screen edits depend on them. Order:

1. Add `view` variant to `ServiceCard`.
2. Add `.service-select--readonly` CSS.
3. Swap `pkg-svc-chip` → `pkg-chip` in `PackageCard('summary')`.
4. Update `booking.js`.
5. Update `booking-confirmed.js`.
6. Update `my-bookings.js`.
7. Remove `.pkg-svc-chip` (default class) from CSS.
8. Remove the unused `compact` branch from `ServiceCard`.

## Testing

Manual verification per screen:

- **booking.js** — start a booking with: (a) services only, (b) package only, (c) services + package, (d) services with discount prices, (e) services with enriched detail pages. Confirm rows match salon-page styling, totals are correct, tapping enriched services opens detail page.
- **booking-confirmed.js** — confirm same booking variants render correctly.
- **my-bookings.js** — view upcoming + completed bookings; both service-only and package-based bookings render with consistent rows.
- **Salon profile** — regression check: salon-page Services and Packages tabs untouched, look identical to before.

## Files touched

- `js/components/service-card.js`
- `js/components/package-card.js`
- `js/screens/booking.js`
- `js/screens/booking-confirmed.js`
- `js/screens/my-bookings.js`
- `css/components.css`
