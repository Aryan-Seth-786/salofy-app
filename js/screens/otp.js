function renderOTP() {
  const phone = (AppState.pendingPhone || '9876543210').replace(/(\d{5})(\d{5})/, '$1 $2');
  const demoHint = (typeof APP_MODE !== 'undefined' && APP_MODE === 'prod' && AppState.demoOtp)
    ? `<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin:-16px 0 22px;background:var(--primary-surface);border:1px solid var(--primary-border);border-radius:10px;padding:8px 14px;font-size:12px;color:${C.text2}">
         ${Icons.sparkle(14, C.primary)} Demo mode — your code is
         <span style="font-family:var(--font-mono);font-weight:700;color:${C.primary};letter-spacing:1px">${AppState.demoOtp}</span>
       </div>`
    : '';
  return Shell(`
    <div style="padding:60px 24px 24px">
      ${BackBtn()}
      <div style="font-family:var(--font-body);font-size:24px;font-weight:600;color:${C.text};margin-bottom:6px;margin-top:28px;letter-spacing:-0.3px">Verify your number</div>
      <div style="font-size:15px;color:${C.text2};margin-bottom:28px;line-height:1.5">We sent a 6-digit code to <span style="font-weight:600;color:${C.text}">+91 ${phone}</span></div>

      ${demoHint}

      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:30px" id="otp-boxes">
        ${[0, 1, 2, 3, 4, 5].map(i => `
          <input class="otp-digit" type="tel" inputmode="numeric" maxlength="1" autocomplete="one-time-code"
                 oninput="this.value=this.value.replace(/\D/g,'');if(this.value&&this.nextElementSibling)this.nextElementSibling.focus()"
                 onkeydown="if(event.key==='Backspace'&&!this.value&&this.previousElementSibling)this.previousElementSibling.focus()"
                 onpaste="const d=(event.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,6).split('');const bs=document.querySelectorAll('.otp-digit');bs.forEach((b,j)=>b.value=d[j]||'');(bs[Math.min(d.length,5)]||bs[5]).focus();event.preventDefault()"
                 style="width:46px;height:58px;text-align:center;font-family:var(--font-mono);font-size:24px;font-weight:700;background:${C.surface};border:none;border-bottom:3px solid ${C.border};color:${C.text};border-radius:0;transition:border-color 0.2s;outline:none"
                 onfocus="this.style.borderBottomColor='${C.primaryS}'" onblur="this.style.borderBottomColor=this.value?'${C.primary}':'${C.border}'">
        `).join('')}
      </div>

      <button data-action="${typeof APP_MODE !== 'undefined' && APP_MODE === 'prod' ? 'verify-otp' : 'go-onboarding'}" class="btn btn--primary">Verify & Continue</button>

      <div style="text-align:center;margin-top:20px;font-size:15px;color:${C.text3}">
        Didn't get it?
        <span onclick="${typeof APP_MODE !== 'undefined' && APP_MODE === 'prod' ? 'doRequestOtp()' : 'void 0'}" style="color:${C.primary};font-weight:600;cursor:pointer">Resend code</span>
      </div>
    </div>
  `, { noNav: true });
}
