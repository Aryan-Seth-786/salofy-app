function renderEditProfile() {
  const u = AppState.user || {};
  const gender = AppState.editGender || u.gender || 'Male';
  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Edit Profile</span>
    </div>

    <div style="padding:0 20px">
      <!-- Avatar -->
      <div style="display:flex;flex-direction:column;align-items:center;margin:16px 0 28px">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--grad-rose);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700;position:relative">
          ${(u.name || 'A').trim().charAt(0).toUpperCase()}
          <div style="position:absolute;bottom:0;right:0;width:28px;height:28px;background:${C.surface};border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid ${C.border}">${Icons.camera(14, C.primary)}</div>
        </div>
        <div style="font-size:13px;color:${C.primary};font-weight:500;margin-top:8px;cursor:pointer">Change Photo</div>
      </div>

      <!-- Name -->
      <div class="input-label">Full Name</div>
      <input id="ep-name" class="input" value="${(u.name || 'Aryan') || ''}" maxlength="40" style="margin-bottom:16px;background:${C.surface};border:1.5px solid ${C.border}">

      <!-- Email -->
      <div class="input-label">Email Address</div>
      <input id="ep-email" class="input" type="email" inputmode="email" value="${(u.email || '') || ''}" maxlength="60" placeholder="you@example.com" style="margin-bottom:16px;background:${C.surface};border:1.5px solid ${C.border}">

      <!-- Phone (identity — not editable) -->
      <div class="input-label">Phone Number</div>
      <div style="display:flex;gap:10px;margin-bottom:16px">
        <div style="padding:14px 12px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;font-size:15px;font-weight:600;color:${C.text}">+91</div>
        <input class="input" value="${(u.phone || '9876543210').replace(/(\d{5})(\d{5})/, '$1 $2') || '98765 43210'}" style="flex:1" readonly>
      </div>

      <!-- Gender -->
      <div class="input-label">Gender</div>
      <div style="display:flex;gap:8px;margin-bottom:24px">
        ${['Male', 'Female', 'Other'].map(g => `
          <div class="pill${g === gender ? ' pill--active' : ''}" data-gender-pill="${g}" style="flex:1;justify-content:center;${g === gender ? `border:1.5px solid ${C.primary}` : 'border:1.5px solid transparent'}">${g}</div>
        `).join('')}
      </div>

      <button data-action="${typeof APP_MODE !== 'undefined' && APP_MODE === 'prod' ? 'save-profile' : 'go-profile'}" class="btn btn--primary">Save Changes</button>
    </div>
  `, { activeTab: 'profile' });
}
