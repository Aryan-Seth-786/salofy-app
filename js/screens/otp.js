function renderOTP() {
  const digits = ['4', '7', '2', '9', '', ''];
  return Shell(`
    <div style="padding:60px 24px 24px">
      ${BackBtn()}
      <div style="font-family:var(--font-body);font-size:24px;font-weight:600;color:${C.text};margin-bottom:6px;margin-top:28px;letter-spacing:-0.3px">Verify your number</div>
      <div style="font-size:13px;color:${C.text2};margin-bottom:36px;line-height:1.5">We sent a 6-digit code to <span style="font-weight:600;color:${C.text}">+91 98765 43210</span></div>

      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:36px">
        ${digits.map((d, i) => `
          <div style="width:46px;height:58px;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:24px;font-weight:700;background:${d ? C.primaryS : C.surface};border:none;border-bottom:3px solid ${d ? C.primary : C.border};color:${d ? C.primary : C.text3};border-radius:0;transition:border-color 0.2s">${d}</div>
        `).join('')}
      </div>

      <button data-action="go-home" class="btn btn--primary">Verify & Continue</button>

      <div style="text-align:center;margin-top:20px;font-size:13px;color:${C.text3}">
        Resend code in <span style="font-weight:600;color:${C.text}">24s</span>
      </div>
    </div>
  `, { noNav: true });
}
