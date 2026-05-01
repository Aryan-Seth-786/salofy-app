function renderReferEarn() {
  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Refer & Earn</span>
    </div>

    <div style="padding:0 20px">
      <!-- Hero -->
      <div style="text-align:center;padding:20px 0 24px">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, ${C.primaryS}, rgba(196,117,110,0.08));border:2px solid ${C.primary}33;display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          ${Icons.gift(36, C.primary)}
        </div>
        <div style="font-family:var(--font-heading);font-size:22px;font-weight:700;color:${C.text};margin-bottom:4px">Give \u20B9100, Get \u20B9100</div>
        <div style="font-size:13px;color:${C.text2};line-height:1.5">Share your code with friends. When they book their first salon, you both get \u20B9100 off!</div>
      </div>

      <!-- Referral Code -->
      <div style="background:${C.surface2};border:2px dashed ${C.primary}44;border-radius:14px;padding:16px;text-align:center;margin-bottom:20px">
        <div style="font-size:10px;font-weight:800;color:${C.text3};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Your Referral Code</div>
        <div style="font-size:28px;font-weight:800;color:${C.primary};letter-spacing:4px;margin-bottom:10px">ARYAN100</div>
        <button style="padding:8px 20px;background:${C.surface};border:1.5px solid ${C.border};border-radius:10px;font-family:inherit;font-size:12px;font-weight:600;color:${C.text};cursor:pointer;display:inline-flex;align-items:center;gap:6px">
          ${Icons.copy(14, C.text2)} Copy Code
        </button>
      </div>

      <!-- Share Options -->
      <div style="font-size:13px;font-weight:600;color:${C.text};margin-bottom:12px">Share via</div>
      <div style="display:flex;gap:12px;margin-bottom:24px">
        ${[
          { label: 'WhatsApp', color: '#25D366' },
          { label: 'Message', color: C.info },
          { label: 'Email', color: C.primary },
          { label: 'More', color: C.text3 },
        ].map(s => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer">
            <div style="width:48px;height:48px;border-radius:50%;background:${s.color}15;border:1px solid ${s.color}33;display:flex;align-items:center;justify-content:center">
              ${Icons.share(20, s.color)}
            </div>
            <span style="font-size:10px;color:${C.text3}">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <!-- How It Works -->
      <div style="font-size:13px;font-weight:600;color:${C.text};margin-bottom:12px">How It Works</div>
      ${[
        { n: '1', t: 'Share your code', d: 'Send your unique code to friends' },
        { n: '2', t: 'Friend books a salon', d: 'They use your code on their first booking' },
        { n: '3', t: 'You both earn \u20B9100', d: 'Credits are added to both accounts' },
      ].map(s => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start">
          <div style="width:28px;height:28px;border-radius:50%;background:${C.primaryS};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${C.primary};flex-shrink:0">${s.n}</div>
          <div>
            <div style="font-size:13px;font-weight:600;color:${C.text}">${s.t}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:2px">${s.d}</div>
          </div>
        </div>
      `).join('')}

      <!-- Stats -->
      <div style="background:${C.surface2};border:1px solid ${C.border};border-radius:12px;padding:14px;margin-top:8px">
        <div style="display:flex;justify-content:space-around;text-align:center">
          <div>
            <div style="font-size:18px;font-weight:700;color:${C.primary}">5</div>
            <div style="font-size:10px;color:${C.text3}">Friends Referred</div>
          </div>
          <div style="width:1px;background:${C.border}"></div>
          <div>
            <div style="font-size:18px;font-weight:700;color:${C.success}">\u20B9500</div>
            <div style="font-size:10px;color:${C.text3}">Total Earned</div>
          </div>
        </div>
      </div>
    </div>
  `, { activeTab: 'profile' });
}
