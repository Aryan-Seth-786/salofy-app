/* ═══════════════════════════════════════════════════
   ONBOARDING
   5 steps:
     0 — "Discover deals near you"   (intro)
     1 — "Book in seconds"           (intro)
     2 — "Pay at the salon"          (intro, hero)
     3 — gender picker
     4 — city picker
   ═══════════════════════════════════════════════════ */

function renderOnboarding() {
  const step = AppState.onboardStep || 0;
  const totalSteps = 5;

  /* Step indicator — active segment is wider */
  const stepBar = `
    <div style="display:flex;gap:5px;align-items:center;margin-top:20px;margin-bottom:32px">
      ${Array.from({ length: totalSteps }).map((_, i) => `
        <div style="
          height:5px;border-radius:999px;
          width:${i === step ? '28px' : '5px'};
          background:${i === step ? C.primary : i < step ? 'rgba(244,63,94,0.45)' : C.border};
          transition:all 0.3s var(--ease-out)
        "></div>
      `).join('')}
    </div>
  `;

  /* Skip button — only on intro slides */
  const skipBtn = step <= 2 ? `
    <button data-action="onboard-skip-intro" style="position:absolute;top:56px;right:20px;background:none;border:none;font-family:inherit;font-size:14px;color:${C.text3};font-weight:500;cursor:pointer">
      Skip
    </button>
  ` : '';

  /* ── Intro slide layout helper ── */
  function introSlide({ iconHtml, accent, headline, subline, ctaLabel, hero }) {
    return Shell(`
      <div style="position:relative;padding:56px 24px 32px;min-height:100%;display:flex;flex-direction:column">
        ${BackBtn()}
        ${skipBtn}
        ${stepBar}

        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px 0">
          <div style="width:${hero ? '128px' : '104px'};height:${hero ? '128px' : '104px'};border-radius:${hero ? '36px' : '28px'};background:${accent || 'var(--rose-50)'};display:flex;align-items:center;justify-content:center;margin-bottom:32px;${hero ? 'box-shadow:0 16px 40px -12px rgba(244,63,94,0.35)' : ''}">
            ${iconHtml}
          </div>
          <div style="font-family:var(--font-heading);font-size:${hero ? '34px' : '28px'};font-weight:700;color:${C.text};letter-spacing:-0.5px;line-height:1.15;margin-bottom:14px;max-width:320px">
            ${headline}
          </div>
          <div style="font-size:15px;color:${C.text3};line-height:1.55;max-width:300px">
            ${subline}
          </div>
        </div>

        <button data-action="onboard-next" class="btn btn--primary" style="margin-top:24px">
          ${ctaLabel || 'Next'}
        </button>
      </div>
    `, { noNav: true });
  }

  /* ── Step 0: Discover deals ── */
  if (step === 0) {
    return introSlide({
      iconHtml: Icons.gift(56, C.primary),
      accent: 'var(--rose-50)',
      headline: 'Discover deals<br>near you',
      subline: 'Browse exclusive offers from top salons in your area — updated daily.',
      ctaLabel: 'Next',
    });
  }

  /* ── Step 1: Book in seconds ── */
  if (step === 1) {
    return introSlide({
      iconHtml: Icons.calendar(56, C.primary),
      accent: 'var(--rose-50)',
      headline: 'Book in<br>seconds',
      subline: 'Pick a service, choose a time, and confirm. That’s it.',
      ctaLabel: 'Next',
    });
  }

  /* ── Step 2: Pay at the salon (HERO) ── */
  if (step === 2) {
    return introSlide({
      iconHtml: Icons.shield(64, '#fff'),
      accent: C.saffron,
      headline: 'Pay at<br>the salon',
      subline: 'No upfront payment. No card on file. You only pay when your service is done.',
      ctaLabel: 'Got it',
      hero: true,
    });
  }

  /* ── Step 3: Gender picker (was original step 1) ── */
  if (step === 3) {
    const gender = AppState.onboardGender || 'all';
    const name   = AppState.user?.name || '';
    const genders = [
      { key: 'men',   label: "Men's",   photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=360&fit=crop&crop=faces,center' },
      { key: 'women', label: "Women's", photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=360&fit=crop&crop=faces,center' },
      { key: 'all',   label: 'All',     photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=360&fit=crop&crop=faces,center' },
    ];

    return Shell(`
      <div style="position:relative;padding:56px 24px 32px;min-height:100%;display:flex;flex-direction:column">
        ${BackBtn()}
        ${stepBar}

        <div style="font-family:var(--font-heading);font-size:32px;font-weight:700;color:${C.text};letter-spacing:-0.5px;line-height:1.2;margin-bottom:8px">
          Nice to<br>meet you
        </div>
        <div style="font-size:15px;color:${C.text3};line-height:1.5;margin-bottom:20px">
          Just a couple of details so we can personalise your experience
        </div>

        <div style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.text3};margin-bottom:8px">Your name</div>
        <input
          class="input"
          value="${name}"
          placeholder="e.g. Priya"
          readonly
          style="margin-bottom:24px;background:${C.surface};border:1.5px solid ${C.border}"
        >

        <div style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.text3};margin-bottom:10px">I'm looking for</div>
        <div style="display:flex;gap:8px;margin-bottom:28px">
          ${genders.map(g => {
            const active = gender === g.key;
            return `
              <button
                data-action="onboard-gender"
                data-value="${g.key}"
                style="
                  flex:1;padding:0;border-radius:16px;overflow:hidden;
                  border:2px solid ${active ? C.primary : C.border};
                  background:${C.surface};font-family:inherit;cursor:pointer;
                  display:flex;flex-direction:column;
                  box-shadow:${active ? '0 6px 20px -6px rgba(244,63,94,0.3)' : C.shadowSm};
                  transition:all 0.18s var(--ease-out)
                "
              >
                <div style="position:relative;width:100%;height:88px;overflow:hidden">
                  <img src="${g.photo}" alt="${g.label}" loading="lazy"
                    style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.3s var(--ease-out);transform:scale(${active ? '1.04' : '1'})">
                  ${active ? `<div style="position:absolute;inset:0;background:rgba(244,63,94,0.18)"></div>
                    <div style="position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:${C.primary};display:flex;align-items:center;justify-content:center">
                      ${Icons.check(12, '#fff')}
                    </div>` : ''}
                </div>
                <div style="padding:10px 8px 11px;text-align:center;background:${active ? 'var(--rose-50)' : C.surface}">
                  <span style="font-size:15px;font-weight:${active ? '600' : '500'};color:${active ? C.primary : C.text}">${g.label}</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <div style="flex:1;min-height:24px"></div>
        <button data-action="onboard-next" class="btn btn--primary" style="margin-top:8px">
          Next
        </button>
      </div>
    `, { noNav: true });
  }

  /* ── Step 4: City picker (was original step 2) ── */
  const city = AppState.onboardCity || null;
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

  return Shell(`
    <div style="position:relative;padding:56px 24px 32px;min-height:100%;display:flex;flex-direction:column">
      ${BackBtn()}
      ${stepBar}

      <div style="font-family:var(--font-heading);font-size:32px;font-weight:700;color:${C.text};letter-spacing:-0.5px;line-height:1.2;margin-bottom:8px">
        Where are<br>you based?
      </div>
      <div style="font-size:15px;color:${C.text3};line-height:1.5;margin-bottom:24px">
        Pick your city so we can show salons near you
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${cities.map(cityName => {
          const active = city === cityName;
          return `
            <button
              data-action="onboard-city"
              data-value="${cityName}"
              style="
                padding:8px 18px;border-radius:999px;
                border:1.5px solid ${active ? C.primary : C.border};
                background:${active ? 'var(--rose-50)' : C.surface};
                font-family:inherit;font-size:15px;
                font-weight:${active ? '600' : '500'};
                color:${active ? C.primary : C.text2};
                cursor:pointer;
                box-shadow:${active ? '0 2px 8px -2px rgba(244,63,94,0.2)' : 'none'};
                transition:all 0.18s var(--ease-out)
              "
            >${cityName}</button>
          `;
        }).join('')}
      </div>

      <div style="flex:1;min-height:24px"></div>
      <button data-action="go-home" class="btn btn--primary" style="margin-top:28px">
        Let's Go
      </button>
    </div>
  `, { noNav: true });
}
