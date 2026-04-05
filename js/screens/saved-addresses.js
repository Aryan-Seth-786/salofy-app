function renderSavedAddresses() {
  const addresses = [
    { label: 'Home', icon: Icons.address(18, C.primary), address: '123, Phase 3B2, Mohali, Punjab 160059', isDefault: true },
    { label: 'Work', icon: Icons.briefcase(18, C.text2), address: 'IT Park, Tower C, Sector 13, Chandigarh 160101', isDefault: false },
  ];

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-size:18px;font-weight:700;color:${C.text}">Saved Addresses</span>
    </div>

    <div style="padding:0 20px">
      ${addresses.map(a => `
        <div style="background:${C.surface};border:1px solid ${a.isDefault ? C.primary + '44' : C.border};border-radius:14px;padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:36px;height:36px;background:${a.isDefault ? C.primaryS : C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${a.icon}</div>
              <div>
                <div style="font-size:14px;font-weight:600;color:${C.text}">${a.label}</div>
                ${a.isDefault ? `<span style="font-size:9px;font-weight:600;padding:2px 6px;background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:4px;color:${C.primary};text-transform:uppercase">Default</span>` : ''}
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <div style="cursor:pointer">${Icons.edit(16, C.text3)}</div>
              <div style="cursor:pointer">${Icons.trash(16, C.error)}</div>
            </div>
          </div>
          <div style="font-size:12px;color:${C.text2};line-height:1.5;padding-left:44px">${a.address}</div>
        </div>
      `).join('')}

      <!-- Add New Address -->
      <button style="width:100%;padding:14px;background:${C.surface};border:2px dashed ${C.border};border-radius:14px;font-family:inherit;font-size:13px;color:${C.primary};font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px">
        ${Icons.plus(16, C.primary)} Add New Address
      </button>
    </div>
  `, { activeTab: 'profile' });
}
