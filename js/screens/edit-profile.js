function renderEditProfile() {
  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Edit Profile</span>
    </div>

    <div style="padding:0 20px">
      <!-- Avatar -->
      <div style="display:flex;flex-direction:column;align-items:center;margin:16px 0 28px">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--grad-rose);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700;position:relative">
          A
          <div style="position:absolute;bottom:0;right:0;width:28px;height:28px;background:${C.surface};border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid ${C.border}">${Icons.camera(14, C.primary)}</div>
        </div>
        <div style="font-size:12px;color:${C.primary};font-weight:500;margin-top:8px;cursor:pointer">Change Photo</div>
      </div>

      <!-- Name -->
      <div class="input-label">Full Name</div>
      <input class="input" value="Aryan" style="margin-bottom:16px" readonly>

      <!-- Email -->
      <div class="input-label">Email Address</div>
      <input class="input" value="aryan@gmail.com" style="margin-bottom:16px" readonly>

      <!-- Phone -->
      <div class="input-label">Phone Number</div>
      <div style="display:flex;gap:10px;margin-bottom:16px">
        <div style="padding:14px 12px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;font-size:14px;font-weight:600;color:${C.text}">+91</div>
        <input class="input" value="98765 43210" style="flex:1" readonly>
      </div>

      <!-- Gender -->
      <div class="input-label">Gender</div>
      <div style="display:flex;gap:8px;margin-bottom:24px">
        ${['Male', 'Female', 'Other'].map((g, i) => `
          <div class="pill${i === 0 ? ' pill--active' : ''}" style="flex:1;justify-content:center">${g}</div>
        `).join('')}
      </div>

      <button class="btn btn--primary">Save Changes</button>
    </div>
  `, { activeTab: 'profile' });
}
