function renderSavedAddresses() {
  const isProd = (typeof APP_MODE !== 'undefined') && APP_MODE === 'prod';
  const addresses = (AppState.addresses && AppState.addresses.length)
    ? AppState.addresses
    : isProd
      ? []
      : [
        { id: 'demo1', label: 'Home', icon: Icons.address(18, C.primary), address: '123, Phase 3B2, Mohali, Punjab 160059', isDefault: true },
        { id: 'demo2', label: 'Work', icon: Icons.briefcase(18, C.text2), address: 'IT Park, Tower C, Sector 13, Chandigarh 160101', isDefault: false },
      ];
  const adding = AppState.addingAddress;

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-body);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Saved Addresses</span>
    </div>

    <div style="padding:0 20px">
      ${addresses.length === 0 ? `
      <div style="padding:36px 8px;text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;background:${C.surface2};display:flex;align-items:center;justify-content:center;margin:0 auto 14px">${Icons.address(26, C.text3)}</div>
        <div style="font-size:16px;font-weight:700;color:${C.text};margin-bottom:6px">No saved addresses</div>
        <div style="font-size:13px;color:${C.text3};line-height:1.5;margin-bottom:18px">Save your home or work location for faster checkout.</div>
      </div>` : ''}

      ${addresses.map(a => `
        <div style="background:${C.surface};border:1px solid ${a.isDefault ? C.primary + '44' : C.border};border-radius:14px;padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:36px;height:36px;background:${a.isDefault ? C.primaryS : C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${a.icon}</div>
              <div>
                <div style="font-size:15px;font-weight:600;color:${C.text}">${a.label}</div>
                ${a.isDefault ? `<span style="font-size:9px;font-weight:600;padding:2px 6px;background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:4px;color:${C.primary};text-transform:uppercase">Default</span>` : ''}
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <div style="cursor:pointer">${Icons.edit(16, C.text3)}</div>
              <div data-action="delete-address" data-addr-id="${a.id}" style="cursor:pointer">${Icons.trash(16, C.error)}</div>
            </div>
          </div>
          <div style="font-size:13px;color:${C.text2};line-height:1.5;padding-left:44px">${a.address}</div>
        </div>
      `).join('')}

      ${adding ? `
      <!-- Add address form -->
      <div style="background:${C.surface};border:1.5px solid ${C.primary}55;border-radius:14px;padding:16px;margin-bottom:12px">
        <div class="input-label">Label</div>
        <input id="addr-label" class="input" maxlength="24" placeholder="Home, Work, Gym…" style="margin-bottom:14px;background:${C.surface};border:1.5px solid ${C.border}">
        <div class="input-label">Address</div>
        <input id="addr-text" class="input" maxlength="120" placeholder="House no, street, area, city" style="margin-bottom:16px;background:${C.surface};border:1.5px solid ${C.border}">
        <div style="display:flex;gap:10px">
          <button data-action="cancel-add-address" class="btn" style="flex:1;padding:12px;background:${C.surface2};color:${C.text};border:1px solid ${C.border};border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">Cancel</button>
          <button data-action="add-address" class="btn btn--primary" style="flex:2;border-radius:12px">Save Address</button>
        </div>
      </div>` : ''}

      <!-- Add New Address -->
      <button data-action="open-add-address" style="width:100%;padding:14px;background:${C.surface};border:2px dashed ${C.border};border-radius:14px;font-family:inherit;font-size:15px;color:${C.primary};font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px">
        ${Icons.plus(16, C.primary)} ${adding ? 'Adding address below…' : 'Add New Address'}
      </button>
    </div>
  `, { activeTab: 'profile' });
}
