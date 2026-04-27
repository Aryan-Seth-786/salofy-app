function renderLogin() {
  return Shell(`
    <div style="padding:60px 24px 24px">
      <div style="font-family:var(--font-heading);font-size:30px;font-weight:700;color:${C.primary};margin-bottom:4px;letter-spacing:-0.5px">Salofy</div>
      <div style="font-size:13px;color:${C.text3};margin-bottom:40px;font-style:italic">Your salon, simplified.</div>

      <div style="font-family:var(--font-heading);font-size:24px;font-weight:600;color:${C.text};margin-bottom:6px;letter-spacing:-0.3px">Welcome back</div>
      <div style="font-size:13px;color:${C.text2};margin-bottom:28px;line-height:1.5">Enter your phone number to continue</div>

      <div class="input-label">Phone Number</div>
      <div style="display:flex;gap:10px;margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:6px;padding:14px 14px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;font-size:14px;font-weight:600;color:${C.text};white-space:nowrap;flex-shrink:0">
          <span style="font-size:16px">🇮🇳</span>+91
        </div>
        <input class="input" value="98765 43210" style="flex:1;background:${C.surface};border:1.5px solid ${C.border}" readonly>
      </div>

      <button data-action="go-otp" class="btn btn--primary">Get OTP</button>

      <div style="text-align:center;margin-top:20px;font-size:12px;color:${C.text3}">
        By continuing, you agree to our <span style="color:${C.primary};font-weight:500">Terms</span> & <span style="color:${C.primary};font-weight:500">Privacy Policy</span>
      </div>

      <div style="display:flex;align-items:center;gap:12px;margin:30px 0 20px">
        <div style="flex:1;height:1px;background:${C.border}"></div>
        <span style="font-size:11px;color:${C.text3}">or</span>
        <div style="flex:1;height:1px;background:${C.border}"></div>
      </div>

      <button style="width:100%;padding:14px;background:${C.surface};border:1.5px solid ${C.border};border-radius:14px;font-family:inherit;font-weight:600;font-size:13px;color:${C.text};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
        ${Icons.google(18)} Continue with Google
      </button>
    </div>
  `, { noNav: true });
}
