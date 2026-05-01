function renderHelpSupport() {
  const faqs = [
    { q: 'How do I book an appointment?', a: 'Search for a salon or service, select the services you want, choose a date & time, and confirm your booking. You pay directly at the salon.' },
    { q: 'Can I cancel or reschedule?', a: 'Yes! Go to My Bookings, find your upcoming appointment, and tap Reschedule or Cancel. Cancellations are free up to 2 hours before your appointment.' },
    { q: 'How does "Pay at Salon" work?', a: 'Salofy does not collect payments online. You pay the salon directly when you visit. The price you see on the app is the price you pay.' },
    { q: 'What are Flash Deals?', a: 'Flash Deals are time-limited offers from premium salons. They appear on the home screen and in notifications. Book quickly before they expire!' },
    { q: 'How do I become a verified salon?', a: 'Salons on the Growth or Premium plan get a verified badge. This means their services, pricing, and staff are verified by the Salofy team.' },
  ];

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:${C.text};letter-spacing:-0.3px">Help & Support</span>
    </div>

    <div style="padding:0 20px">
      <!-- FAQ -->
      <div style="font-size:14px;font-weight:600;color:${C.text};margin-bottom:12px">Frequently Asked Questions</div>
      <div class="accordion">
        ${faqs.map((f, i) => `
          <div class="accordion__item${i === 0 ? ' accordion__item--open' : ''}">
            <div class="accordion__header">
              <span>${f.q}</span>
              ${i === 0 ? Icons.back(14, C.primary) : Icons.forward(14, C.text3)}
            </div>
            <div class="accordion__body">${f.a}</div>
          </div>
        `).join('')}
      </div>

      <!-- Contact -->
      <div style="font-size:14px;font-weight:600;color:${C.text};margin:24px 0 12px">Contact Us</div>

      <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer">
        <div style="width:40px;height:40px;background:${C.primaryS};border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.phone(18, C.primary)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${C.text}">Call Us</div>
          <div style="font-size:11px;color:${C.text3}">+91 800 123 4567</div>
        </div>
        ${Icons.forward(16, C.text3)}
      </div>

      <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer">
        <div style="width:40px;height:40px;background:${C.infoS};border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.mail(18, C.info)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${C.text}">Email Support</div>
          <div style="font-size:11px;color:${C.text3}">help@salofy.in</div>
        </div>
        ${Icons.forward(16, C.text3)}
      </div>

      <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer">
        <div style="width:40px;height:40px;background:var(--success-surface);border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.message(18, C.success)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${C.text}">Live Chat</div>
          <div style="font-size:11px;color:${C.text3}">Usually replies within 5 min</div>
        </div>
        ${Icons.forward(16, C.text3)}
      </div>
    </div>
  `, { activeTab: 'profile' });
}
