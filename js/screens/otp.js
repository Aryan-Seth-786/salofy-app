function renderOTP() {
  const digits = ['4', '7', '2', '9', '', ''];
  return Shell(`
    <div style="padding:60px 24px 24px">
      ${BackBtn()}
      <div style="font-family:var(--font-heading);font-size:22px;font-weight:600;color:${C.text};margin-bottom:6px;margin-top:28px">Verify your number</div>
      <div style="font-size:13px;color:${C.text2};margin-bottom:32px">We sent a 6-digit code to <span style="font-weight:600;color:${C.text}">+91 98765 43210</span></div>

      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:32px">
        ${digits.map(d => `
          <div style="width:48px;height:56px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;background:${d ? C.primaryS : C.surface2};border:2px solid ${d ? C.primary : C.border};border-radius:12px;color:${C.text}">${d}</div>
        `).join('')}
      </div>

      <button data-action="go-home" class="btn btn--primary">Verify & Continue</button>

      <div style="text-align:center;margin-top:20px;font-size:13px;color:${C.text3}">
        Resend code in <span style="font-weight:600">24s</span>
      </div>
    </div>
  `, { noNav: true });
}
