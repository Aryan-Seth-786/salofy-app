/* js/data.js */
/* ═══════════════════════════════════════════════════
   SALOFY DATA
   Color constants, services, and salon sample data
   ═══════════════════════════════════════════════════ */

const C = {
  bg: "#FAFAF7", surface: "#FFFFFF", surface2: "#F5F0E8", surface3: "#EDE6D8",
  border: "#E2D9C8", borderS: "#EDE6D8", text: "#1A1A2E", text2: "#4A4A5A",
  text3: "#8A8A96", primary: "#B8860B", primaryL: "#D4A017", primaryD: "#8B6508",
  primaryS: "rgba(184, 134, 11, 0.08)", success: "#2D8B55", successS: "rgba(45, 139, 85, 0.08)",
  error: "#C0392B", errorS: "rgba(192, 57, 43, 0.08)", info: "#5B7FA5",
  rose: "#C4756E", verified: "#7B68AE",
};

const allServices = [
  { id: "haircut", label: "Haircut", icon: "scissors", time: "30 min" },
  { id: "headwash", label: "Head Wash", icon: "droplet", time: "15 min" },
  { id: "beard", label: "Beard Trim", icon: "beard", time: "20 min" },
  { id: "color", label: "Hair Color", icon: "palette", time: "60 min" },
  { id: "facial", label: "Facial", icon: "sparkle", time: "45 min" },
  { id: "waxing", label: "Waxing", icon: "flower", time: "30 min" },
  { id: "spa", label: "Spa", icon: "spa", time: "60 min" },
  { id: "bridal", label: "Bridal", icon: "crown", time: "3 hrs" },
  { id: "manicure", label: "Manicure", icon: "nails", time: "40 min" },
  { id: "threading", label: "Threading", icon: "needle", time: "15 min" },
  { id: "shave", label: "Clean Shave", icon: "razor", time: "20 min" },
  { id: "massage", label: "Head Massage", icon: "massage", time: "20 min" },
];

const salons = [
  {
    id: 1, name: "Luxe Hair Studio", loc: "Sector 17, Chandigarh", dist: "1.2 km",
    rating: 4.8, reviews: 312, tier: "premium", photos: 32,
    hours: "10 AM - 10 PM", deal: "30% Off First Visit",
    flash: { title: "50% Off All Facials", sub: "Today Only", hrs: "02", min: "34", sec: "11" },
    staff: [
      { n: "Simran", r: "Head Stylist", gender: "f" },
      { n: "Arjun", r: "Color Master", gender: "m" },
      { n: "Meera", r: "Bridal Specialist", gender: "f" },
      { n: "Ravi", r: "Skin Expert", gender: "m" }
    ],
    services: { haircut: 400, headwash: 100, beard: 200, color: 1200, facial: 1000, waxing: 800, spa: 1500, bridal: 8000, manicure: 500, threading: 100, shave: 150, massage: 300 }
  },
  {
    id: 2, name: "Urban Style", loc: "Kharar Main Road", dist: "3.8 km",
    rating: 4.5, reviews: 124, tier: "growth", photos: 15,
    hours: "9 AM - 9 PM", deal: "20% Off First Visit",
    staff: [
      { n: "Rajesh", r: "Senior Stylist", gender: "m" },
      { n: "Vikram", r: "Color Expert", gender: "m" },
      { n: "Neha", r: "Facial Specialist", gender: "f" }
    ],
    services: { haircut: 250, headwash: 50, beard: 150, color: 800, facial: 600, shave: 100, massage: 200, threading: 40 }
  },
  {
    id: 3, name: "Glow Beauty Parlour", loc: "Phase 3B2, Mohali", dist: "5.1 km",
    rating: 4.1, reviews: 38, tier: "starter", photos: 5,
    hours: "10 AM - 8 PM",
    staff: [],
    services: { haircut: 200, headwash: 30, facial: 400, waxing: 350, manicure: 250, threading: 50 }
  },
  {
    id: 4, name: "Royal Cuts", loc: "Phase 5, Mohali", dist: "2.4 km",
    rating: 4.7, reviews: 198, tier: "premium", photos: 28,
    hours: "9 AM - 9 PM", deal: "15% Off Combo",
    staff: [
      { n: "Harpreet", r: "Owner & Stylist", gender: "m" },
      { n: "Jaspreet", r: "Beard Expert", gender: "m" }
    ],
    services: { haircut: 350, headwash: 80, beard: 180, color: 1000, shave: 130, massage: 250, spa: 1200 }
  },
  {
    id: 5, name: "Neha's Salon", loc: "Patiala Gate", dist: "6.3 km",
    rating: 3.9, reviews: 22, tier: "starter", photos: 4,
    hours: "10 AM - 7 PM",
    staff: [],
    services: { haircut: 180, facial: 350, threading: 40, waxing: 300, manicure: 200 }
  },
  {
    id: 6, name: "Blade & Co.", loc: "Sector 22, Chandigarh", dist: "2.1 km",
    rating: 4.6, reviews: 87, tier: "growth", photos: 12,
    hours: "10 AM - 9 PM", deal: "\u20B999 Head Wash",
    staff: [
      { n: "Karan", r: "Master Barber", gender: "m" }
    ],
    services: { haircut: 300, headwash: 99, beard: 160, shave: 120, massage: 180, color: 900 }
  },
];

function getSvc(id) {
  return allServices.find(s => s.id === id);
}


/* js/icons.js */
/* ═══════════════════════════════════════════════════
   SALOFY SVG ICON SYSTEM
   All icons return raw SVG strings.
   Usage: Icons.scissors(24, '#B8860B')
   Consistent: viewBox 0 0 24 24, stroke-based,
   round caps/joins, stroke-width 1.5-2
   ═══════════════════════════════════════════════════ */

const Icons = {
  /* ── Service Icons ── */
  scissors: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,

  droplet: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,

  beard: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5 5 9c0 2 .5 3.5 1.5 5C8 16 10 20 12 22c2-2 4-6 5.5-8 1-1.5 1.5-3 1.5-5 0-4-3-7-7-7z"/><path d="M9 9h.01M15 9h.01"/><path d="M8 13c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5"/></svg>`,

  palette: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="${c}"/><circle cx="17.5" cy="10.5" r="0.5" fill="${c}"/><circle cx="8.5" cy="7.5" r="0.5" fill="${c}"/><circle cx="6.5" cy="12.5" r="0.5" fill="${c}"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,

  sparkle: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275z"/></svg>`,

  flower: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15"/><circle cx="12" cy="12" r="3"/><path d="M12 22v-3m0-14V2M2 12h3m14 0h3"/></svg>`,

  spa: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s-4 6-4 10a4 4 0 0 0 8 0c0-4-4-10-4-10z"/><path d="M4.93 15.5C3.36 17 2.5 19 2.5 21h19c0-2-.86-4-2.43-5.5"/><path d="M12 16v6"/></svg>`,

  crown: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l4 12h12l4-12-5.5 4L12 4l-4.5 8L2 8z"/><path d="M6 20h12"/></svg>`,

  nails: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1.5 0-3 .5-4 2-1 1.5-1 4-.5 6s2 4 4.5 4 4-2 4.5-4 .5-4.5-.5-6c-1-1.5-2.5-2-4-2z"/><path d="M10 15v4a2 2 0 0 0 4 0v-4"/><path d="M9 7l1.5 4M15 7l-1.5 4"/></svg>`,

  needle: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 2L22 6.5 6.5 22 2 17.5z"/><path d="M12 8l4 4"/><path d="M2 22l4-4"/></svg>`,

  razor: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="8" rx="2"/><path d="M10 10v10a2 2 0 0 0 4 0V10"/><line x1="12" y1="14" x2="12" y2="14.01"/></svg>`,

  massage: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,

  /* ── UI Icons ── */
  star: (s=24, c='currentColor', fill=false) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill?c:'none'}" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`,

  starFilled: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`,

  heart: (s=24, c='currentColor', fill=false) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill?c:'none'}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,

  search: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,

  home: (s=24, c='currentColor', fill=false) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill?c:'none'}" stroke="${fill?'none':c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 8h-3v10h-5v-6h-2v6H6V11H3z"/></svg>`,

  calendar: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,

  user: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,

  bell: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,

  back: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,

  forward: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,

  check: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,

  close: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,

  lightning: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" stroke="none"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>`,

  shield: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,

  clock: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,

  mapPin: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,

  phone: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,

  share: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,

  camera: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,

  gift: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,

  settings: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,

  help: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,

  logout: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,

  edit: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,

  plus: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,

  filter: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,

  fire: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,

  eye: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,

  chartBar: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>`,

  message: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,

  lock: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  mail: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,

  play: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,

  document: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,

  person: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21c0-4.5 2.9-7 6.5-7s6.5 2.5 6.5 7"/></svg>`,

  google: (s=24) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,

  copy: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,

  trash: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,

  address: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,

  briefcase: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,

  trendingUp: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,

  trendingDown: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`,

  lightbulb: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`,

  headphones: (s=24, c='currentColor') =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
};

function svcIcon(iconName, size, color) {
  return Icons[iconName] ? Icons[iconName](size, color) : Icons.sparkle(size, color);
}


/* js/shell.js */
/* ═══════════════════════════════════════════════════
   SHELL & NAVIGATION
   Phone frame wrapper and bottom navigation
   ═══════════════════════════════════════════════════ */

function Shell(innerHTML, opts = {}) {
  const { noNav = false, statusDark = false, activeTab = 'home', navType = 'customer' } = opts;
  return `
    <div class="phone-shell${statusDark ? ' phone-shell--dark' : ''}">
      <div class="phone-notch${statusDark ? ' phone-notch--dark' : ''}"></div>
      <div class="phone-status${statusDark ? ' phone-status--dark' : ''}">
        <span>9:41</span>
        <span class="phone-status__icons">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="${statusDark?'#fff':C.text}"><rect x="0" y="8" width="3" height="4" rx="0.5" opacity="0.4"/><rect x="4" y="5" width="3" height="7" rx="0.5" opacity="0.6"/><rect x="8" y="2" width="3" height="10" rx="0.5" opacity="0.8"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="${statusDark?'#fff':C.text}" stroke-width="1.5"><path d="M1 8.5C3.5 3.5 12.5 3.5 15 8.5"/><path d="M4 7C5.8 4.5 10.2 4.5 12 7"/><circle cx="8" cy="9.5" r="1.5" fill="${statusDark?'#fff':C.text}" stroke="none"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none" stroke="${statusDark?'#fff':C.text}" stroke-width="1"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5"/><rect x="22" y="3.5" width="2.5" height="5" rx="1" fill="${statusDark?'#fff':C.text}"/><rect x="2" y="2" width="16" height="8" rx="1" fill="${statusDark?'#fff':C.text}"/></svg>
        </span>
      </div>
      <div class="phone-content${noNav ? ' phone-content--no-nav' : ''} hide-sb">
        ${innerHTML}
      </div>
      ${noNav ? '' : (navType === 'dashboard' ? DashboardNav(activeTab) : BottomNav(activeTab))}
    </div>
  `;
}

function BottomNav(active) {
  const items = [
    { key: 'home', label: 'Home', icon: (c, f) => Icons.home(22, c, f) },
    { key: 'search', label: 'Search', icon: (c) => Icons.search(22, c) },
    { key: 'favorites', label: 'Saved', icon: (c, f) => Icons.heart(22, c, f) },
    { key: 'bookings', label: 'Bookings', icon: (c) => Icons.calendar(22, c) },
    { key: 'profile', label: 'Profile', icon: (c) => Icons.user(22, c) },
  ];
  return `
    <div class="bottom-nav">
      ${items.map(it => {
        const a = active === it.key;
        const color = a ? C.primary : C.text3;
        return `<button class="bottom-nav__item${a ? ' bottom-nav__item--active' : ''}" data-nav="${it.key}">
          ${it.icon(color, a)}
          ${it.label}
        </button>`;
      }).join('')}
    </div>
  `;
}

function DashboardNav(active) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: (c) => Icons.chartBar(22, c) },
    { key: 'dash-bookings', label: 'Bookings', icon: (c) => Icons.calendar(22, c) },
    { key: 'dash-analytics', label: 'Analytics', icon: (c) => Icons.trendingUp(22, c) },
    { key: 'dash-settings', label: 'Settings', icon: (c) => Icons.settings(22, c) },
  ];
  return `
    <div class="bottom-nav bottom-nav--dashboard">
      ${items.map(it => {
        const a = active === it.key;
        const color = a ? C.primaryL : '#6E6E7A';
        return `<button class="bottom-nav__item${a ? ' bottom-nav__item--active' : ''}" data-nav="${it.key}">
          ${it.icon(color)}
          ${it.label}
        </button>`;
      }).join('')}
    </div>
  `;
}

function BackBtn(color) {
  return `<div class="back-btn" data-action="back">${Icons.back(18, color || C.text)}</div>`;
}


/* js/components.js */
/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
   HTML string generators for reusable UI pieces
   ═══════════════════════════════════════════════════ */

function TopBadge() {
  return `<span class="badge badge--top">${Icons.starFilled(8, '#fff')} Top Salon</span>`;
}

function VerifiedBadge() {
  return `<span class="badge badge--verified">${Icons.check(8, '#fff')} Verified</span>`;
}

function DealTag(text) {
  return `<span class="badge badge--deal">${text}</span>`;
}

function TopDot() {
  return `<span class="dot-badge dot-badge--top">${Icons.starFilled(8, '#fff')}</span>`;
}

function VerifiedDot() {
  return `<span class="dot-badge dot-badge--verified">${Icons.check(8, '#fff')}</span>`;
}

function StarRow(rating) {
  return `<span class="star-row">${Icons.starFilled(12, C.primaryL)} ${rating}</span>`;
}

function PayAtSalon() {
  return `<div class="pay-at-salon">${Icons.shield(14, C.success)} Pay at Salon &mdash; No online payment needed</div>`;
}

function SalonResultCard(s, selectedSvcs = [], isFav = false) {
  const matched = selectedSvcs.filter(sid => s.services[sid]);
  const combo = matched.reduce((a, sid) => a + s.services[sid], 0);
  const dp = s.deal ? parseInt(s.deal) || 0 : 0;
  const disc = dp > 0 ? Math.round(combo * (1 - dp / 100)) : null;

  let servicesHtml = '';
  if (selectedSvcs.length > 0 && matched.length > 0) {
    servicesHtml = `
      <div class="salon-card__services">
        ${matched.map(sid => {
          const svc = getSvc(sid);
          return `<span class="service-tag service-tag--matched">${svcIcon(svc.icon, 12, C.text2)} ${svc.label} \u20B9${s.services[sid]}</span>`;
        }).join('')}
        ${selectedSvcs.length > matched.length ? `<span class="service-tag" style="color:${C.error}">+${selectedSvcs.length - matched.length} unavailable</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:14px;font-weight:700;color:${C.primary}">\u20B9${disc || combo}</span>
        ${disc ? `<span style="font-size:12px;color:${C.text3};text-decoration:line-through">\u20B9${combo}</span>` : ''}
        <span style="font-size:10px;color:${C.text3}">for ${matched.length} service${matched.length > 1 ? 's' : ''}</span>
      </div>`;
  } else {
    const entries = Object.entries(s.services).slice(0, 3);
    servicesHtml = `
      <div class="salon-card__services">
        ${entries.map(([k, v]) => {
          const svc = getSvc(k);
          return `<span class="service-tag">${svc ? svc.label : k} \u20B9${v}</span>`;
        }).join('')}
        <span class="service-tag service-tag--more">+${Math.max(0, Object.keys(s.services).length - 3)} more</span>
      </div>`;
  }

  return `
    <div class="salon-card${s.tier === 'premium' ? ' salon-card--premium' : ''}" data-goto-salon="${s.id}" style="cursor:pointer">
      <div class="salon-card__hero">
        <div class="salon-card__hero-icon">${Icons.scissors(28, C.text3)}</div>
        <div class="salon-card__badges">
          ${s.tier === 'premium' ? TopBadge() : ''}
          ${(s.tier === 'growth' || s.tier === 'premium') ? VerifiedBadge() : ''}
        </div>
        ${s.deal ? `<div class="salon-card__deal">${DealTag(s.deal)}</div>` : ''}
        <div class="salon-card__fav">${Icons.heart(16, isFav ? C.error : C.text3, isFav)}</div>
      </div>
      <div class="salon-card__body">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="salon-card__name">
            ${s.name}
            ${s.tier === 'premium' ? TopDot() : ''}
            ${s.tier === 'growth' ? VerifiedDot() : ''}
          </div>
          ${StarRow(s.rating)}
        </div>
        <div class="salon-card__meta">${s.loc} &bull; ${s.dist}</div>
        ${servicesHtml}
        <div style="margin-top:8px">${PayAtSalon()}</div>
      </div>
    </div>`;
}

function StaffCard(st, isPremium) {
  return `
    <div style="min-width:90px;text-align:center;flex-shrink:0">
      <div style="width:60px;height:60px;border-radius:50%;background:${C.surface2};margin:0 auto 6px;display:flex;align-items:center;justify-content:center;border:${isPremium ? `2px solid ${C.primaryL}` : `1px solid ${C.border}`}">
        ${Icons.person(24, C.text3)}
      </div>
      <div style="font-size:12px;font-weight:600;color:${C.text}">${st.n}</div>
      <div style="font-size:10px;color:${C.text3}">${st.r}</div>
    </div>`;
}

function ServiceListItem(svc, price, showBorder) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;${showBorder ? `border-bottom:1px solid ${C.borderS}` : ''}">
      <div>
        <div style="font-size:13px;font-weight:500;color:${C.text};display:flex;align-items:center;gap:6px">${svcIcon(svc.icon, 16, C.text2)} ${svc.label}</div>
        <div style="font-size:11px;color:${C.text3};margin-top:2px">${svc.time}</div>
      </div>
      <div style="font-size:14px;font-weight:600;color:${C.primary}">\u20B9${price}</div>
    </div>`;
}

function ReviewCard(name, stars, text) {
  return `
    <div style="background:${C.surface2};border-radius:8px;padding:12px;margin-bottom:8px;border:1px solid ${C.borderS}">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;font-weight:600;color:${C.text}">${name}</span>
        <span style="font-size:11px;color:${C.primaryL};display:flex;gap:1px">${Array(stars).fill(Icons.starFilled(11, C.primaryL)).join('')}${Array(5 - stars).fill(Icons.star(11, C.border)).join('')}</span>
      </div>
      <div style="font-size:12px;color:${C.text2};line-height:1.5">${text}</div>
    </div>`;
}

function FlashDealCard(title, sub, salon, hrs, min, sec) {
  return `
    <div class="flash-card">
      <div class="flash-card__label">${Icons.lightning(14, C.error)} FLASH DEAL &mdash; Ends in</div>
      <div class="flash-card__title">${title}</div>
      <div class="flash-card__sub">${salon ? salon + ' &bull; ' : ''}${sub}</div>
      <div class="timer">
        ${[{v:hrs,l:'HRS'},{v:min,l:'MIN'},{v:sec,l:'SEC'}].map(t => `
          <div class="timer__box"><div class="timer__val">${t.v}</div><div class="timer__label">${t.l}</div></div>
        `).join('')}
      </div>
    </div>`;
}

function ToggleSwitch(on) {
  return `<div class="toggle${on ? ' toggle--on' : ''}"><div class="toggle__knob"></div></div>`;
}

function SectionHeader(text, seeAll, iconHtml) {
  return `
    <div class="section-header">
      <span class="section-header__icon">${iconHtml || ''}${text}</span>
      ${seeAll ? `<span class="section-header__see-all">See all</span>` : ''}
    </div>`;
}


/* js/screens/splash.js */
function renderSplash() {
  return Shell(`
    <div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg, #1A1A2E 0%, #2a2040 50%, #1A1A2E 100%);margin-top:-40px;padding-bottom:60px">
      <div style="width:90px;height:90px;border-radius:24px;background:linear-gradient(135deg, #B8860B, #D4A017);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(184,134,11,0.4);margin-bottom:24px">
        ${Icons.scissors(40, '#fff')}
      </div>
      <div style="font-family:var(--font-heading);font-size:38px;font-weight:700;color:#D4A017;margin-bottom:4px">Salofy</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:4px;text-transform:uppercase">Discover &bull; Book &bull; Glow</div>
      <div style="margin-top:40px;width:32px;height:32px;border:3px solid rgba(212,160,23,0.3);border-top-color:#D4A017;border-radius:50%;animation:spin 1s linear infinite"></div>
    </div>
  `, { noNav: true, statusDark: true });
}


/* js/screens/login.js */
function renderLogin() {
  return Shell(`
    <div style="padding:60px 24px 24px">
      <div style="font-family:var(--font-heading);font-size:28px;font-weight:700;color:${C.primary};margin-bottom:4px">Salofy</div>
      <div style="font-size:13px;color:${C.text3};margin-bottom:40px">Your salon, simplified.</div>

      <div style="font-family:var(--font-heading);font-size:22px;font-weight:600;color:${C.text};margin-bottom:6px">Welcome back</div>
      <div style="font-size:13px;color:${C.text2};margin-bottom:28px">Enter your phone number to continue</div>

      <div class="input-label">Phone Number</div>
      <div style="display:flex;gap:10px;margin-bottom:24px">
        <div style="padding:14px 12px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;font-size:14px;font-weight:600;color:${C.text}">+91</div>
        <input class="input" value="98765 43210" style="flex:1" readonly>
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


/* js/screens/otp.js */
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


/* js/screens/home.js */
function renderHome() {
  const popularSvcs = [
    { id: 'haircut', icon: 'scissors', label: 'Haircut' },
    { id: 'facial',  icon: 'sparkle',  label: 'Facial'  },
    { id: 'color',   icon: 'palette',  label: 'Color'   },
    { id: 'beard',   icon: 'beard',    label: 'Beard'   },
    { id: 'spa',     icon: 'spa',      label: 'Spa'     },
    { id: 'bridal',  icon: 'crown',    label: 'Bridal'  },
    { id: 'waxing',  icon: 'flower',   label: 'Waxing'  },
    { id: 'manicure',icon: 'nails',    label: 'Nails'   },
  ];

  const trending = [
    { t: 'Bridal Season',   sub: '12 salons with bridal packages', icon: 'crown',   svcId: 'bridal'  },
    { t: 'Beard Grooming',  sub: '8 salons \u2022 Starting \u20B999', icon: 'beard', svcId: 'beard'  },
    { t: 'Summer Facials',  sub: 'Trending near you',              icon: 'sparkle', svcId: 'facial'  },
  ];

  return Shell(`
    <!-- Header -->
    <div style="padding:44px 20px 14px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-family:var(--font-heading);font-size:22px;font-weight:700;color:${C.primary}">Salofy</div>
        <div style="font-size:12px;color:${C.text3};margin-top:2px">Hey Aryan, find your next salon</div>
      </div>
      <div data-nav="notifications" style="position:relative;cursor:pointer;width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid ${C.border}">
        ${Icons.bell(22, C.text2)}
        <div style="position:absolute;top:6px;right:6px;width:8px;height:8px;background:${C.error};border-radius:50%;border:2px solid ${C.surface}"></div>
      </div>
    </div>

    <!-- Search Bar (tap to open search) -->
    <div data-nav="search" style="margin:0 20px 4px;background:${C.surface2};border-radius:12px;padding:13px 16px;display:flex;align-items:center;gap:10px;color:${C.text3};font-size:13px;border:1px solid ${C.border};cursor:pointer">
      ${Icons.search(16, C.text3)} Search salons, services, areas...
    </div>

    <!-- Popular Services -->
    <div style="padding:12px 0 4px">
      <div style="padding:0 20px;font-size:15px;font-weight:600;color:${C.text};margin-bottom:12px">Popular Services</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 20px">
        ${popularSvcs.map(s => `
          <div data-nav="search" onclick="AppState.selectedServices=['${s.id}']" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};cursor:pointer">
            <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:${C.primaryS};border-radius:10px">
              ${svcIcon(s.icon, 20, C.primary)}
            </div>
            <span style="font-size:11px;color:${C.text2};font-weight:500">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Top Salons Carousel -->
    <div style="padding:16px 0 8px">
      ${SectionHeader('Top Salons', true, Icons.starFilled(14, C.primaryL) + ' ')}
      <div style="display:flex;gap:12px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${salons.filter(s => s.tier === 'premium').map(s => `
          <div data-goto-salon="${s.id}" style="min-width:250px;height:130px;border-radius:12px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#2a2040,#1e3a4f)">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 30%,transparent 70%);padding:14px;display:flex;flex-direction:column;justify-content:flex-end">
              <div style="display:flex;gap:6px;margin-bottom:6px">${TopBadge()}${s.deal ? DealTag(s.deal) : ''}</div>
              <div style="font-size:14px;font-weight:600;color:#fff">${s.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${s.loc}</div>
            </div>
          </div>
        `).join('')}
        ${salons.filter(s => s.tier === 'growth').slice(0,1).map(s => `
          <div data-goto-salon="${s.id}" style="min-width:250px;height:130px;border-radius:12px;overflow:hidden;position:relative;flex-shrink:0;cursor:pointer;background:linear-gradient(135deg,#1a2d3e,#2d1a3e)">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 30%,transparent 70%);padding:14px;display:flex;flex-direction:column;justify-content:flex-end">
              <div style="display:flex;gap:6px;margin-bottom:6px">${VerifiedBadge()}</div>
              <div style="font-size:14px;font-weight:600;color:#fff">${s.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${s.loc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Flash Deal -->
    <div style="padding:8px 20px" data-action="open-deals" style="cursor:pointer">
      ${FlashDealCard('50% Off All Facials', 'Today Only', 'Luxe Hair Studio \u2022 Sector 17', '02', '34', '11')}
    </div>

    <!-- Trending -->
    <div style="padding:12px 0 4px">
      ${SectionHeader('Trending This Week', false, Icons.fire(14, C.error) + ' ')}
      <div style="display:flex;gap:10px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${trending.map(c => `
          <div data-nav="search" onclick="AppState.selectedServices=['${c.svcId}']" style="min-width:160px;padding:14px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};flex-shrink:0;cursor:pointer">
            <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:${C.primaryS};border-radius:10px;margin-bottom:8px">
              ${svcIcon(c.icon, 22, C.primary)}
            </div>
            <div style="font-size:13px;font-weight:600;color:${C.text}">${c.t}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:2px">${c.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Near You -->
    <div style="padding:16px 20px 4px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:15px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:6px">${Icons.mapPin(14, C.primary)} Near You</span>
      <span data-nav="search" style="font-size:12px;color:${C.primary};font-weight:500;cursor:pointer">See all</span>
    </div>
    <div style="padding:4px 20px;display:flex;flex-direction:column;gap:12px">
      ${salons.slice(0, 3).map(s => `
        <div data-goto-salon="${s.id}">
          ${SalonResultCard(s, [], AppState.favorites.has(s.id))}
        </div>
      `).join('')}
    </div>

    <!-- Recently Viewed -->
    <div style="padding:16px 0 4px">
      ${SectionHeader('Recently Viewed', false, Icons.clock(14, C.text3) + ' ')}
      <div style="display:flex;gap:10px;padding:0 20px;overflow-x:auto" class="hide-sb">
        ${salons.slice(0, 3).map(s => `
          <div data-goto-salon="${s.id}" style="min-width:140px;background:${C.surface};border-radius:12px;border:1px solid ${C.border};overflow:hidden;flex-shrink:0;cursor:pointer">
            <div style="height:60px;background:${C.surface2};display:flex;align-items:center;justify-content:center">${Icons.scissors(22, C.text3)}</div>
            <div style="padding:8px 10px">
              <div style="font-size:12px;font-weight:600;color:${C.text}">${s.name}</div>
              <div style="font-size:10px;color:${C.text3}">${s.dist}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- How It Works -->
    <div style="padding:16px 20px 8px">
      <div style="font-size:15px;font-weight:600;color:${C.text};margin-bottom:12px">How Salofy Works</div>
      ${[
        { n:'1', t:'Choose Services',  d:'Select what you need \u2014 haircut, facial, combo' },
        { n:'2', t:'Compare & Pick',   d:'See prices across salons, find the best fit' },
        { n:'3', t:'Book & Walk In',   d:'Confirm your slot. Pay at the salon. Done.' },
      ].map(s => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:${C.primaryS};border:1.5px solid rgba(212,160,23,0.25);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${C.primary};flex-shrink:0">${s.n}</div>
          <div>
            <div style="font-size:13px;font-weight:600;color:${C.text}">${s.t}</div>
            <div style="font-size:12px;color:${C.text3};margin-top:2px">${s.d}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'home' });
}


/* js/screens/search-input.js */
function renderSearchInput() {
  const selSvcs = AppState.selectedServices || [];
  const recent  = ['Haircut + Head Wash', 'Facial', 'Beard Trim', 'Bridal Package'];

  return Shell(`
    <!-- Search Header -->
    <div style="padding:44px 20px 0;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <div style="flex:1;position:relative">
        <input class="input" placeholder="Search services, salons..." style="padding-left:36px;${selSvcs.length > 0 ? `border-color:${C.primary}` : ''}" readonly>
        <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%)">${Icons.search(16, selSvcs.length > 0 ? C.primary : C.text3)}</div>
      </div>
    </div>

    <!-- Selected Services Pills -->
    ${selSvcs.length > 0 ? `
    <div style="padding:12px 20px 0">
      <div style="font-size:11px;font-weight:600;color:${C.text2};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Selected (${selSvcs.length})</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${selSvcs.map(sid => {
          const svc = getSvc(sid);
          return `<span class="pill pill--active" style="font-size:12px;padding:6px 12px" data-search-svc="${sid}">
            ${svcIcon(svc.icon, 14, C.primary)} ${svc.label}
            <span style="opacity:0.6;margin-left:2px;pointer-events:none">${Icons.close(12, C.primary)}</span>
          </span>`;
        }).join('')}
        <span data-action="go-search" style="font-size:11px;color:${C.error};font-weight:500;padding:6px 8px;cursor:pointer">Clear all</span>
      </div>
    </div>` : ''}

    <!-- Recent Searches -->
    <div style="padding:16px 20px 8px">
      <div style="font-size:11px;font-weight:600;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Recent Searches</div>
      ${recent.map(r => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid ${C.borderS};cursor:pointer">
          ${Icons.clock(16, C.text3)}
          <span style="font-size:13px;color:${C.text2};flex:1">${r}</span>
          ${Icons.forward(14, C.text3)}
        </div>
      `).join('')}
    </div>

    <!-- All Services -->
    <div style="padding:8px 20px 100px">
      <div style="font-size:11px;font-weight:600;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">All Services</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${allServices.map(svc => {
          const sel = selSvcs.includes(svc.id);
          return `<div class="pill${sel ? ' pill--active' : ''}" data-search-svc="${svc.id}">
            ${svcIcon(svc.icon, 15, sel ? C.primary : C.text2)} ${svc.label}
            ${sel ? Icons.check(12, C.primary) : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Bottom CTA -->
    <div style="position:sticky;bottom:0;left:0;right:0;padding:12px 20px 28px;background:linear-gradient(to top,${C.bg} 70%,transparent)">
      <button data-action="show-results" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:14px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
        ${selSvcs.length > 0 ? `Show Results for ${selSvcs.length} Service${selSvcs.length > 1 ? 's' : ''}` : 'Browse All Salons'}
        ${Icons.forward(16, '#fff')}
      </button>
    </div>
  `, { noNav: true });
}


/* js/screens/search-results.js */
function renderSearchResults() {
  const selSvcs = AppState.selectedServices || [];
  const results = salons
    .filter(s => selSvcs.length === 0 || selSvcs.some(sid => s.services[sid]))
    .sort((a, b) => ({ premium: 0, growth: 1, starter: 2 })[a.tier] - ({ premium: 0, growth: 1, starter: 2 })[b.tier]);

  return Shell(`
    <!-- Search Bar (tap to edit) -->
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <div data-nav="search" style="flex:1;background:${C.surface2};border:1px solid ${C.border};border-radius:10px;padding:11px 14px;color:${selSvcs.length > 0 ? C.text : C.text3};font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px">
        ${Icons.search(16, C.text3)}
        ${selSvcs.length > 0 ? `${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''} selected` : 'Search salons, services...'}
      </div>
    </div>

    <!-- Selected pills -->
    ${selSvcs.length > 0 ? `
    <div style="display:flex;gap:6px;padding:4px 20px 8px;overflow-x:auto;align-items:center" class="hide-sb">
      ${selSvcs.map(sid => {
        const svc = getSvc(sid);
        return `<span style="font-size:11px;padding:5px 10px;background:${C.primaryS};border:1px solid rgba(212,160,23,0.25);border-radius:16px;color:${C.primary};font-weight:500;white-space:nowrap;display:inline-flex;align-items:center;gap:4px">
          ${svcIcon(svc.icon, 12, C.primary)} ${svc.label}
        </span>`;
      }).join('')}
      <span data-nav="search" style="font-size:11px;color:${C.primary};font-weight:600;white-space:nowrap;cursor:pointer">${Icons.plus(12, C.primary)} Edit</span>
    </div>` : ''}

    <div style="padding:4px 20px 8px;font-size:12px;color:${C.text3}">
      ${results.length} salon${results.length !== 1 ? 's' : ''} found${selSvcs.length > 0 ? ` \u2022 showing prices for your services` : ''}
    </div>

    <!-- Pinned -->
    ${results.some(s => s.tier === 'premium') ? `
    <div style="padding:4px 20px;font-size:10px;font-weight:700;color:${C.primary};text-transform:uppercase;letter-spacing:1px;display:flex;align-items:center;gap:4px">
      ${Icons.mapPin(12, C.primary)} Top Salons in Your Area
    </div>` : ''}

    <!-- Results -->
    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${results.map((s, i) => {
        const divider = (i > 0 && results[i-1].tier === 'premium' && s.tier !== 'premium')
          ? `<div style="height:1px;background:${C.border};margin:4px 0 12px"></div>` : '';
        return `${divider}<div data-goto-salon="${s.id}">${SalonResultCard(s, selSvcs, AppState.favorites.has(s.id))}</div>`;
      }).join('')}
    </div>
  `, { activeTab: 'search' });
}


/* js/screens/salon-profile.js */
function renderSalonProfile() {
  const s = AppState.selectedSalon;
  const isPremium = s.tier === 'premium';
  const isGrowth  = s.tier === 'growth';
  const isStarter = s.tier === 'starter';
  const activeTab = AppState.salonTab || 'Services';
  const selSvcs   = AppState.salonServices || [];

  const tabs = isStarter
    ? ['Services', 'Reviews', 'Photos']
    : ['Services', 'Staff', 'Reviews', 'Photos', 'Video'];

  const heroGrad  = isPremium
    ? 'linear-gradient(135deg, #3a2058, #1e3a4f)'
    : `linear-gradient(135deg, ${C.surface2}, ${C.surface3})`;
  const heroColor = isPremium ? 'rgba(255,255,255,0.35)' : C.text3;
  const backColor = isPremium ? '#fff' : C.text;

  const subtotal = selSvcs.filter(sid => s.services[sid]).reduce((a, sid) => a + s.services[sid], 0);
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (!isStarter && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  const isFav    = AppState.favorites.has(s.id);

  /* ── Tab Panels ── */

  // SERVICES panel
  const servicesPanel = `
    <div class="tab-panel" data-panel="Services" style="${activeTab === 'Services' ? '' : 'display:none'}">
      <div style="padding:0 20px 4px">
        ${isStarter ? '' : `<div style="font-size:11px;color:${C.text3};margin-bottom:10px">Tap a service to select it for booking</div>`}
        ${Object.entries(s.services).map(([k, v], i, arr) => {
          const svc = getSvc(k);
          if (!svc) return '';
          const sel = selSvcs.includes(k);
          return `
            <div class="service-select${sel ? ' service-select--active' : ''}" data-svc-toggle="${k}">
              <div style="display:flex;align-items:center;gap:10px">
                <div class="svc-chk service-select__check" style="background:${sel ? C.primary : 'transparent'};border-color:${sel ? C.primary : C.border}">
                  ${sel ? Icons.check(14, '#fff') : ''}
                </div>
                <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:${sel ? C.primaryS : C.surface2};border-radius:9px">
                  ${svcIcon(svc.icon, 18, sel ? C.primary : C.text2)}
                </div>
                <div>
                  <div style="font-size:13px;font-weight:500;color:${C.text}">${svc.label}</div>
                  <div style="font-size:11px;color:${C.text3}">${svc.time}</div>
                </div>
              </div>
              <div style="font-size:14px;font-weight:600;color:${C.primary}">\u20B9${v}</div>
            </div>`;
        }).join('')}
      </div>
      <!-- Sticky summary bar -->
      <div class="salon-summary-bar" style="display:${selSvcs.length > 0 ? 'flex' : 'none'};position:sticky;bottom:0;left:0;right:0;padding:10px 20px 12px;background:${C.bg};border-top:1px solid ${C.border};align-items:center;justify-content:space-between;gap:12px">
        <div>
          <div style="font-size:11px;color:${C.text3}"><span class="ssb-count">${selSvcs.length} service${selSvcs.length > 1 ? 's' : ''}</span> selected</div>
          <div style="font-size:16px;font-weight:700;color:${C.primary}"><span class="ssb-price">\u20B9${subtotal}</span>${discount > 0 ? ` <span style="font-size:11px;color:${C.success};font-weight:500">-\u20B9${discount} off</span>` : ''}</div>
        </div>
        <button data-action="book-now" style="padding:12px 22px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer">Book Now</button>
      </div>
    </div>`;

  // STAFF panel
  const staffPanel = s.staff.length > 0 ? `
    <div class="tab-panel" data-panel="Staff" style="${activeTab === 'Staff' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:13px;color:${C.text2};margin-bottom:14px">Our professional team</div>
        <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:8px" class="hide-sb">
          ${s.staff.map(st => `
            <div style="min-width:96px;text-align:center;flex-shrink:0;padding:14px 10px;background:${C.surface2};border-radius:12px;border:1px solid ${C.border}">
              <div style="width:56px;height:56px;border-radius:50%;background:${C.surface3};margin:0 auto 8px;display:flex;align-items:center;justify-content:center;border:${isPremium ? `2px solid ${C.primaryL}` : `1px solid ${C.border}`}">
                ${Icons.person(26, C.text3)}
              </div>
              <div style="font-size:12px;font-weight:600;color:${C.text}">${st.n}</div>
              <div style="font-size:10px;color:${C.text3};margin-top:2px">${st.r}</div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px">
          <div style="font-size:13px;font-weight:600;color:${C.text};margin-bottom:10px">Prefer a specific stylist?</div>
          <div style="background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:10px;padding:12px;font-size:12px;color:${C.text2}">
            You can request your preferred staff member when you book. Just add a note in the booking.
          </div>
        </div>
      </div>
    </div>` : '';

  // REVIEWS panel
  const reviewsPanel = `
    <div class="tab-panel" data-panel="Reviews" style="${activeTab === 'Reviews' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <!-- Rating Summary -->
        <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid ${C.border};margin-bottom:12px">
          <div style="text-align:center">
            <div style="font-size:36px;font-weight:800;color:${C.text}">${s.rating}</div>
            <div style="display:flex;gap:2px;justify-content:center;margin:4px 0">${Array(5).fill(0).map((_,i) => Icons.starFilled(12, i < Math.round(s.rating) ? C.primaryL : C.border)).join('')}</div>
            <div style="font-size:11px;color:${C.text3}">${s.reviews} reviews</div>
          </div>
          <div style="flex:1">
            ${[5,4,3,2,1].map(star => {
              const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
              return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                <span style="font-size:10px;color:${C.text3};width:8px">${star}</span>
                ${Icons.starFilled(9, C.primaryL)}
                <div style="flex:1;height:5px;background:${C.surface3};border-radius:3px">
                  <div style="width:${pct}%;height:100%;background:${C.primaryL};border-radius:3px"></div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
        ${ReviewCard('Ananya R.', 5, 'Amazing experience! The staff is incredibly professional and friendly. My hair colour came out exactly as I wanted.')}
        ${ReviewCard('Sahil M.', 4, 'Great haircut, but had to wait about 15 minutes past my slot. The quality itself is top notch.')}
        ${ReviewCard('Priya K.', 5, 'Love this place! Always my go-to for facials. The environment is very clean and relaxing.')}
        <div style="text-align:center;padding:10px 0 4px">
          <span style="font-size:12px;color:${C.primary};font-weight:500;cursor:pointer">See all ${s.reviews} reviews</span>
        </div>
      </div>
    </div>`;

  // PHOTOS panel
  const photosPanel = `
    <div class="tab-panel" data-panel="Photos" style="${activeTab === 'Photos' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:12px;color:${C.text3};margin-bottom:10px">${s.photos} photos</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${Array.from({ length: Math.min(s.photos, 6) }).map((_, i) => `
            <div style="height:${i === 0 ? '160' : '100'}px;${i === 0 ? 'grid-column:span 2;' : ''}background:linear-gradient(135deg,${C.surface2},${C.surface3});border-radius:10px;border:1px solid ${C.borderS};display:flex;align-items:center;justify-content:center;position:relative">
              ${Icons.camera(i === 0 ? 32 : 22, C.text3)}
              ${i === 0 ? `<div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:8px">Salon Interior</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;

  // VIDEO panel
  const videoPanel = !isStarter ? `
    <div class="tab-panel" data-panel="Video" style="${activeTab === 'Video' ? '' : 'display:none'}">
      <div style="padding:0 20px">
        <div style="font-size:12px;color:${C.text3};margin-bottom:10px">Salon reels</div>
        ${isPremium ? `
          <div style="display:flex;gap:10px;overflow-x:auto;margin-bottom:12px" class="hide-sb">
            ${['Salon Tour', 'Hair Color Demo'].map(title => `
              <div style="min-width:200px;height:120px;flex-shrink:0;background:linear-gradient(135deg,#2a2040,#1e3a4f);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative">
                <div style="width:40px;height:40px;background:rgba(184,134,11,0.8);border-radius:50%;display:flex;align-items:center;justify-content:center">${Icons.play(16, '#fff')}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.7)">${title}</div>
              </div>`).join('')}
          </div>` : `
          <div style="height:180px;background:linear-gradient(135deg,${C.surface2},${C.surface3});border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1px solid ${C.border}">
            <div style="width:48px;height:48px;background:${C.primary};border-radius:50%;display:flex;align-items:center;justify-content:center">${Icons.play(20, '#fff')}</div>
            <div style="font-size:12px;color:${C.text3}">Salon Reel</div>
          </div>`}
      </div>
    </div>` : '';

  return Shell(`
    <!-- Hero -->
    <div style="height:200px;background:${heroGrad};position:relative;display:flex;align-items:center;justify-content:center">
      <div style="opacity:0.3">${Icons.scissors(42, heroColor)}</div>
      <!-- Back -->
      <div data-nav="back" style="position:absolute;top:48px;left:12px;width:34px;height:34px;background:rgba(255,255,255,${isPremium ? '0.18' : '0.6'});backdrop-filter:blur(8px);border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,255,255,0.2)">
        ${Icons.back(18, backColor)}
      </div>
      <!-- Badges -->
      <div style="position:absolute;top:48px;right:12px;display:flex;flex-direction:column;gap:4px;align-items:flex-end">
        ${isPremium ? TopBadge() : ''}
        ${(isGrowth || isPremium) ? VerifiedBadge() : ''}
      </div>
      <div style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.5);color:#fff;font-size:11px;padding:3px 10px;border-radius:12px">1/${s.photos} photos</div>
    </div>

    <!-- Info -->
    <div style="padding:16px 20px 8px">
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:20px;font-weight:700;color:${C.text}">${s.name}</span>
        ${isPremium ? TopDot() : ''}${(isGrowth || isPremium) ? VerifiedDot() : ''}
      </div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px;display:flex;align-items:center;gap:6px">
        ${Icons.mapPin(12, C.text3)} ${s.loc} &bull;
        ${Icons.clock(12, C.text3)} ${s.hours}
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
        ${StarRow(s.rating)}
        <span style="font-size:13px;color:${C.text3}">${s.reviews} reviews</span>
        <span style="font-size:11px;color:${C.text3}">&bull; ${s.dist}</span>
      </div>
    </div>

    <!-- Action buttons -->
    <div style="display:flex;gap:10px;padding:8px 20px 12px">
      <button data-action="book-now" style="flex:1;padding:12px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">
        ${selSvcs.length > 0 ? `Book ${selSvcs.length} Service${selSvcs.length > 1 ? 's' : ''}` : 'Book Now'}
      </button>
      <button class="btn btn--ghost" onclick="navigator.clipboard && navigator.clipboard.writeText('${s.name}')">
        ${Icons.phone(18, C.text2)}
      </button>
      <button class="btn btn--ghost">
        ${Icons.mapPin(18, C.text2)}
      </button>
      <button class="fav-btn btn btn--ghost" data-fav="${s.id}" style="${isFav ? `background:${C.errorS};border-color:rgba(192,57,43,0.3)` : ''}">
        ${Icons.heart(18, isFav ? C.error : C.text2, isFav)}
      </button>
    </div>

    <div style="padding:0 20px 10px">${PayAtSalon()}</div>

    <!-- Deal banner -->
    ${s.deal && !isStarter ? `
      <div style="margin:0 20px 10px;background:${C.successS};border:1px solid rgba(45,139,85,0.3);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px">
        ${Icons.gift(16, C.success)}
        <div>
          <div style="font-size:13px;font-weight:600;color:${C.success}">${s.deal}</div>
          <div style="font-size:11px;color:${C.text3}">Applied automatically at checkout</div>
        </div>
      </div>` : ''}

    <!-- Flash deal (premium) -->
    ${s.flash && isPremium ? `
      <div style="padding:0 20px 10px">
        ${FlashDealCard(s.flash.title, s.flash.sub, '', s.flash.hrs, s.flash.min, s.flash.sec)}
      </div>` : ''}

    <!-- Tab bar -->
    <div class="tab-bar" style="margin-bottom:0">
      ${tabs.map(t => `<button class="tab${t === activeTab ? ' tab--active' : ''}" data-panel="${t}">${t}</button>`).join('')}
    </div>

    <!-- Tab panels -->
    ${servicesPanel}
    ${staffPanel}
    ${reviewsPanel}
    ${photosPanel}
    ${videoPanel}
  `, { activeTab: 'search' });
}


/* js/screens/booking.js */
function renderBooking() {
  const s       = AppState.selectedSalon || salons[1];
  const selSvcs = (AppState.salonServices && AppState.salonServices.length > 0)
    ? AppState.salonServices.filter(sid => s.services[sid])
    : Object.keys(s.services).slice(0, 2);
  const dates   = [
    { d:'Today',n:'28' },{ d:'Sun',n:'29' },{ d:'Mon',n:'30' },
    { d:'Tue',n:'31'  },{ d:'Wed',n:'1'  },{ d:'Thu',n:'2'  },
  ];
  const times   = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','2:00','2:30','3:00','3:30'];
  const selDate = AppState.booking.dateIdx;
  const selTime = AppState.booking.time;
  const subtotal = selSvcs.reduce((a, sid) => a + (s.services[sid] || 0), 0);
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (s.tier !== 'starter' && dp > 0) ? Math.round(subtotal * dp / 100) : 0;

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <span style="font-size:18px;font-weight:700;color:${C.text}">Book Appointment</span>
    </div>

    <!-- Salon info -->
    <div style="padding:0 20px 12px;display:flex;gap:12px;align-items:center">
      <div style="width:50px;height:50px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid ${C.border}">${Icons.scissors(22, C.text3)}</div>
      <div>
        <div style="font-size:14px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:4px">
          ${s.name}${s.tier !== 'starter' ? ' ' + VerifiedDot() : ''}
        </div>
        <div style="font-size:11px;color:${C.text3}">${s.loc}</div>
      </div>
    </div>

    <!-- Steps indicator -->
    <div style="display:flex;gap:8px;padding:0 20px 16px">
      ${['Services', 'Date & Time'].map((label, i) => `
        <div style="flex:1;display:flex;align-items:center;gap:6px">
          <div style="width:24px;height:24px;border-radius:50%;background:${i === 0 ? C.success : C.primary};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">
            ${i === 0 ? Icons.check(12, '#fff') : '2'}
          </div>
          <span style="font-size:12px;font-weight:${i === 1 ? 600 : 400};color:${i === 1 ? C.text : C.text3}">${label}</span>
        </div>
      `).join('')}
    </div>

    <!-- Selected services summary (editable) -->
    <div style="padding:0 20px 12px">
      <div style="font-size:12px;font-weight:600;color:${C.text2};margin-bottom:6px">Your services</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
        ${selSvcs.map(sid => {
          const svc = getSvc(sid);
          return `<span style="font-size:11px;padding:4px 10px;background:${C.primaryS};border:1px solid rgba(212,160,23,0.25);border-radius:16px;color:${C.primary};font-weight:500;display:inline-flex;align-items:center;gap:4px">
            ${svcIcon(svc.icon, 12, C.primary)} ${svc.label} \u20B9${s.services[sid]}
          </span>`;
        }).join('')}
        <span data-nav="back" style="font-size:11px;color:${C.primary};font-weight:600;padding:4px 8px;cursor:pointer;display:inline-flex;align-items:center;gap:3px">
          ${Icons.edit(11, C.primary)} Edit
        </span>
      </div>
    </div>

    <!-- Date picker -->
    <div style="padding:0 20px 12px">
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">Select Date</div>
      <div style="display:flex;gap:8px;overflow-x:auto" class="hide-sb">
        ${dates.map((dt, i) => `
          <div class="date-chip${i === selDate ? ' date-chip--active' : ''}" onclick="AppState.booking.dateIdx=${i};this.closest('.phone-content').querySelectorAll('.date-chip').forEach((c,j)=>c.classList.toggle('date-chip--active',j===${i}));this.closest('.phone-content').querySelectorAll('.date-chip .date-chip__num').forEach((n,j)=>n.style.color=j===${i}?'${C.primary}':'${C.text}')">
            <div class="date-chip__day">${dt.d}</div>
            <div class="date-chip__num" style="color:${i === selDate ? C.primary : C.text}">${dt.n}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Time picker -->
    <div style="padding:0 20px 12px">
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">Select Time</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
        ${times.map(t => `
          <div class="time-chip${t === selTime ? ' time-chip--active' : ''}" onclick="AppState.booking.time='${t}';this.closest('.phone-content').querySelectorAll('.time-chip').forEach(c=>c.classList.toggle('time-chip--active',c.textContent.trim()==='${t}'))">
            ${t}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Summary -->
    <div style="margin:0 20px 8px;padding:14px;background:${C.surface2};border-radius:12px;border:1px solid ${C.border}">
      ${selSvcs.map(sid => {
        const svc = getSvc(sid);
        return `<div style="display:flex;justify-content:space-between;font-size:13px;color:${C.text};margin-bottom:6px">
          <span style="color:${C.text3};display:flex;align-items:center;gap:5px">${svcIcon(svc.icon, 12, C.text3)} ${svc.label}</span>
          <span>\u20B9${s.services[sid]}</span>
        </div>`;
      }).join('')}
      ${discount > 0 ? `
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px">
          <span style="color:${C.success}">Discount (${dp}%)</span>
          <span style="color:${C.success}">-\u20B9${discount}</span>
        </div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;color:${C.primary};border-top:1px solid ${C.border};padding-top:8px;margin-top:8px">
        <span>Total</span><span>\u20B9${subtotal - discount}</span>
      </div>
    </div>

    <div style="padding:0 20px 8px">${PayAtSalon()}</div>

    <div style="padding:0 20px 20px">
      <button data-action="confirm-booking" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Confirm Booking
      </button>
    </div>
  `, { activeTab: 'bookings' });
}


/* js/screens/booking-confirmed.js */
function renderBookingConfirmed() {
  const s = AppState.selectedSalon || salons[1];
  const selSvcs = (AppState.salonServices && AppState.salonServices.length > 0)
    ? AppState.salonServices.filter(sid => s.services[sid])
    : Object.keys(s.services).slice(0, 2);
  const subtotal = selSvcs.reduce((a, sid) => a + (s.services[sid] || 0), 0);
  const dp       = s.deal ? parseInt(s.deal) || 0 : 0;
  const discount = (s.tier !== 'starter' && dp > 0) ? Math.round(subtotal * dp / 100) : 0;
  const dates    = ['Today','Sun 29','Mon 30','Tue 31','Wed 1','Thu 2'];
  const dateStr  = dates[AppState.booking.dateIdx] || 'Sun, Mar 29';
  const timeStr  = AppState.booking.time || '10:30 AM';

  return Shell(`
    <div style="display:flex;flex-direction:column;align-items:center;padding:80px 24px 24px;text-align:center">
      <!-- Success Icon -->
      <div style="width:72px;height:72px;border-radius:50%;background:${C.success};display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 8px 24px rgba(45,139,85,0.25)">
        ${Icons.check(32, '#fff')}
      </div>
      <div style="font-family:var(--font-heading);font-size:24px;font-weight:700;color:${C.text};margin-bottom:8px">Booking Confirmed!</div>
      <div style="font-size:14px;color:${C.text2};margin-bottom:24px">Your appointment has been booked</div>

      <!-- Booking Card -->
      <div style="background:${C.surface2};border-radius:14px;padding:20px;width:100%;border:1px solid ${C.border};text-align:left">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
          <div style="width:48px;height:48px;background:${C.surface3};border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.scissors(22, C.text3)}</div>
          <div>
            <div style="font-size:15px;font-weight:600;color:${C.text}">${s.name}</div>
            <div style="font-size:11px;color:${C.text3}">${s.loc}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
          <div>
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Date</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${dateStr}</div>
          </div>
          <div>
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Time</div>
            <div style="font-size:13px;font-weight:600;color:${C.text};margin-top:2px">${timeStr}</div>
          </div>
          <div>
            <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Total</div>
            <div style="font-size:13px;font-weight:600;color:${C.primary};margin-top:2px">\u20B9${subtotal - discount}</div>
          </div>
        </div>
        <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Services</div>
        <div style="font-size:12px;color:${C.text2};margin-bottom:12px">${selSvcs.map(sid => getSvc(sid)?.label || sid).join(', ')}</div>
        <div style="padding-top:10px;border-top:1px solid ${C.border}">${PayAtSalon()}</div>
      </div>

      <!-- Booking Reference -->
      <div style="background:${C.primaryS};border:1px solid ${C.primary}33;border-radius:10px;padding:12px 16px;width:100%;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px">Booking Ref</div>
          <div style="font-size:14px;font-weight:700;color:${C.primary};letter-spacing:2px">SF2930</div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:11px;color:${C.text3};cursor:pointer">${Icons.copy(14, C.text3)} Copy</div>
      </div>

      <button data-action="go-home" style="margin-top:24px;width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Back to Home
      </button>
      <button data-action="view-bookings" style="margin-top:10px;width:100%;padding:14px;background:${C.surface2};color:${C.primary};border:1.5px solid ${C.primary};border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer">
        View My Bookings
      </button>
    </div>
  `, { activeTab: 'bookings' });
}


/* js/screens/notifications.js */
function renderNotifications() {
  const ns = [
    { icon: Icons.lightning(16, '#fff'), bg: C.error, title: 'Flash Deal: 50% Off Facials!', body: 'Luxe Hair Studio \u2014 only 2 hrs left.', time: '12 min ago', category: 'flash', action: 'go-deals' },
    { icon: Icons.mapPin(16, '#fff'), bg: C.primary, title: 'Weekend Picks Near You', body: '3 salons in Kharar have special offers.', time: '2 hrs ago', category: 'foryou', action: 'show-results' },
    { icon: Icons.gift(16, '#fff'), bg: C.success, title: 'New Salon Alert', body: 'Blade & Co. joined with \u20B999 head wash!', time: 'Yesterday', category: 'foryou', gotoSalon: 3 },
    { icon: Icons.check(16, '#fff'), bg: C.info, title: 'Booking Confirmed', body: 'Urban Style on Sun, Mar 29 at 10:30 AM.', time: '2 days ago', category: 'booking', action: 'view-bookings' },
    { icon: Icons.clock(16, '#fff'), bg: C.surface3, title: 'Appointment Reminder', body: 'Your haircut at Glow Beauty is tomorrow.', time: '3 days ago', category: 'booking', action: 'view-bookings' },
    { icon: Icons.starFilled(16, '#fff'), bg: C.primaryL, title: 'Rate Your Visit', body: 'How was Glow Beauty?', time: '5 days ago', category: 'booking', gotoSalon: 5 },
  ];

  return Shell(`
    <div style="padding:44px 20px 10px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-size:18px;font-weight:700;color:${C.text};display:flex;align-items:center;gap:6px">${Icons.bell(20, C.text)} Notifications</span>
    </div>

    <div style="padding:8px 20px">
      <!-- Flash Alert -->
      <div style="font-size:10px;font-weight:700;color:${C.error};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:flex;align-items:center;gap:4px">${Icons.lightning(12, C.error)} Flash Alert</div>
      ${ns.filter(n => n.category === 'flash').map(n => `
        <div class="notif-item notif-item--alert" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}

      <!-- For You -->
      <div style="font-size:10px;font-weight:700;color:${C.primary};text-transform:uppercase;letter-spacing:0.5px;margin:12px 0 8px;display:flex;align-items:center;gap:4px">${Icons.mapPin(12, C.primary)} For You</div>
      ${ns.filter(n => n.category === 'foryou').map(n => `
        <div class="notif-item" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}

      <!-- Booking Updates -->
      <div style="font-size:10px;font-weight:700;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin:12px 0 8px">Booking Updates</div>
      ${ns.filter(n => n.category === 'booking').map(n => `
        <div class="notif-item" ${n.action ? `data-action="${n.action}"` : ''} ${n.gotoSalon ? `data-goto-salon="${n.gotoSalon}"` : ''} style="cursor:pointer">
          <div class="notif-item__icon" style="background:${n.bg}">${n.icon}</div>
          <div style="flex:1">
            <div class="notif-item__title">${n.title}</div>
            <div class="notif-item__body">${n.body}</div>
            <div class="notif-item__time">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'home' });
}


/* js/screens/my-bookings.js */
function renderMyBookings() {
  const bks = [
    { idx: 0, salon: salons[1], date: 'Sun, Mar 29', time: '10:30 AM', services: "Men's Haircut, Beard Styling", status: 'upcoming' },
    { idx: 1, salon: salons[0], date: 'Sat, Mar 22', time: '2:00 PM',  services: 'Gold Facial',                status: 'completed' },
    { idx: 2, salon: salons[2], date: 'Mon, Mar 15', time: '11:00 AM', services: 'Basic Facial, Waxing',        status: 'completed' },
  ];

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="font-size:20px;font-weight:700;color:${C.text}">My Bookings</div>
      <div style="display:flex;gap:8px;margin-top:12px">
        ${['Upcoming', 'Completed'].map((t, i) => `
          <div class="pill${i === 0 ? ' pill--primary' : ''}">${t}</div>
        `).join('')}
      </div>
    </div>

    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${bks.map(b => `
        <div class="booking-card${b.status === 'upcoming' ? ' booking-card--upcoming' : ''}" data-booking-idx="${b.idx}">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
            <div data-goto-salon="${b.salon.id}" style="width:44px;height:44px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">${Icons.scissors(20, C.text3)}</div>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:600;color:${C.text}">${b.salon.name}</div>
              <div style="font-size:11px;color:${C.text3}">${b.salon.loc}</div>
            </div>
            <span style="font-size:10px;font-weight:600;padding:3px 10px;border-radius:6px;background:${b.status === 'upcoming' ? C.primaryS : C.successS};color:${b.status === 'upcoming' ? C.primary : C.success};text-transform:uppercase">${b.status}</span>
          </div>

          <div style="display:flex;gap:16px;font-size:12px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:4px">${Icons.calendar(12, C.text3)}<span style="color:${C.text3}"> ${b.date}</span></div>
            <div style="display:flex;align-items:center;gap:4px">${Icons.clock(12, C.text3)}<span style="color:${C.text3}"> ${b.time}</span></div>
          </div>
          <div style="font-size:12px;color:${C.text2};margin-top:6px">${b.services}</div>

          ${b.status === 'upcoming' ? `
            <div style="margin-top:8px">${PayAtSalon()}</div>
            <div style="display:flex;gap:8px;margin-top:10px">
              <button onclick="AppState.rescheduleBooking={salon:salons[${b.salon.id-1}],date:'${b.date}',time:'${b.time}',services:'${b.services}'};navigate('reschedule')"
                style="flex:1;padding:10px;background:${C.primary};color:#fff;border:none;border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer">
                Reschedule
              </button>
              <button onclick="confirmCancelBooking(${b.idx})"
                style="flex:1;padding:10px;background:${C.errorS};color:${C.error};border:1px solid rgba(192,57,43,0.3);border-radius:8px;font-family:inherit;font-weight:600;font-size:12px;cursor:pointer">
                Cancel
              </button>
            </div>
          ` : `
            <div style="display:flex;gap:8px;margin-top:10px">
              <button data-goto-salon="${b.salon.id}"
                style="flex:1;padding:10px;background:${C.surface2};color:${C.text};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-weight:500;font-size:12px;cursor:pointer">
                Book Again
              </button>
              <button style="flex:1;padding:10px;background:${C.primaryS};color:${C.primary};border:1px solid ${C.primary}33;border-radius:8px;font-family:inherit;font-weight:500;font-size:12px;cursor:pointer">
                ${Icons.starFilled(11, C.primary)} Rate Visit
              </button>
            </div>
          `}
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'bookings' });
}


/* js/screens/favorites.js */
function renderFavorites() {
  const favSalons = [salons[0], salons[3]]; // Luxe and Royal Cuts

  return Shell(`
    <div style="padding:44px 20px 14px">
      <div style="font-size:20px;font-weight:700;color:${C.text};display:flex;align-items:center;gap:8px">${Icons.heart(20, C.error, true)} Saved Salons</div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px">${favSalons.length} salons saved</div>
    </div>

    <div style="padding:8px 20px;display:flex;flex-direction:column;gap:12px">
      ${favSalons.map(s => SalonResultCard(s, [], true)).join('')}
    </div>
  `, { activeTab: 'favorites' });
}


/* js/screens/profile.js */
function renderProfile() {
  const menuItems = [
    { icon: Icons.user(16, C.text2),     label: 'Edit Profile',          sub: 'Name, email, phone',     nav: 'edit-profile'            },
    { icon: Icons.mapPin(16, C.text2),   label: 'Saved Addresses',       sub: 'Home, work locations',   nav: 'saved-addresses'         },
    { icon: Icons.gift(16, C.text2),     label: 'Refer & Earn',          sub: 'Share Salofy, get \u20B9100', nav: 'refer-earn'         },
    { icon: Icons.bell(16, C.text2),     label: 'Notification Settings', sub: 'Push, email',            nav: 'notification-settings'   },
    { icon: Icons.help(16, C.text2),     label: 'Help & Support',        sub: 'FAQs, contact us',       nav: 'help-support'            },
    { icon: Icons.document(16, C.text2), label: 'Terms & Privacy',       sub: 'Legal info',             nav: ''                        },
  ];

  return Shell(`
    <div style="padding:44px 20px 20px">
      <div style="font-size:20px;font-weight:700;color:${C.text};margin-bottom:20px">My Profile</div>

      <!-- Avatar Row -->
      <div style="display:flex;gap:14px;align-items:center;margin-bottom:20px">
        <div style="position:relative">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#B8860B,#D4A017);display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;font-weight:700">A</div>
        </div>
        <div>
          <div style="font-size:17px;font-weight:600;color:${C.text}">Aryan</div>
          <div style="font-size:12px;color:${C.text3}">+91 98765 43210</div>
          <div data-nav="edit-profile" style="font-size:11px;color:${C.primary};font-weight:500;margin-top:2px;cursor:pointer;display:inline-flex;align-items:center;gap:3px">
            ${Icons.edit(11, C.primary)} Edit profile
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px">
        ${[
          { v:'12', l:'Bookings',  action: 'view-bookings' },
          { v:'3',  l:'Favorites', action: 'go-favorites'  },
          { v:'\u20B92,400', l:'Saved',    action: ''               },
        ].map(s => `
          <div data-action="${s.action}" style="background:${C.surface2};border:1px solid ${C.border};border-radius:12px;padding:12px 10px;text-align:center;${s.action ? 'cursor:pointer' : ''}">
            <div style="font-size:18px;font-weight:700;color:${C.primary}">${s.v}</div>
            <div style="font-size:10px;color:${C.text3};margin-top:2px">${s.l}</div>
          </div>
        `).join('')}
      </div>

      <!-- Menu -->
      ${menuItems.map((it, i) => `
        <div ${it.nav ? `data-nav="${it.nav}"` : ''} style="display:flex;align-items:center;gap:12px;padding:14px 0;${i < menuItems.length - 1 ? `border-bottom:1px solid ${C.borderS}` : ''};${it.nav ? 'cursor:pointer' : ''}">
          <div style="width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${it.icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500;color:${C.text}">${it.label}</div>
            <div style="font-size:11px;color:${C.text3}">${it.sub}</div>
          </div>
          ${Icons.forward(16, C.text3)}
        </div>
      `).join('')}

      <!-- Logout -->
      <button data-action="go-login" style="width:100%;margin-top:20px;padding:14px;background:${C.errorS};color:${C.error};border:1px solid rgba(192,57,43,0.2);border-radius:12px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${Icons.logout(16, C.error)} Log Out
      </button>
      <div style="text-align:center;margin-top:16px;font-size:11px;color:${C.text3}">Salofy v1.0</div>
    </div>
  `, { activeTab: 'profile' });
}


/* js/screens/deals.js */
function renderDeals() {
  const deals = [
    { salon: salons[1], percent: '20%', title: '20% Off Your First Visit', desc: 'Valid on all services for new customers', icon: 'scissors' },
    { salon: salons[0], percent: '30%', title: '30% Off Hair Color Services', desc: 'Premium hair color with top products', icon: 'palette' },
    { salon: salons[5], percent: '15%', title: 'Mani-Pedi Combo Deal', desc: 'Manicure + Pedicure at special price', icon: 'nails' },
  ];

  const filters = ['All Deals', 'Flash', 'Haircut', 'Facial', 'Spa'];

  return Shell(`
    <div style="padding:44px 20px 10px">
      <div style="font-size:20px;font-weight:700;color:${C.text};display:flex;align-items:center;gap:8px">${Icons.fire(20, C.error)} Deals & Offers</div>
      <div style="font-size:12px;color:${C.text3};margin-top:4px">Best deals from salons near you</div>
    </div>

    <!-- Filter Pills -->
    <div style="display:flex;gap:8px;padding:12px 20px;overflow-x:auto" class="hide-sb">
      ${filters.map((f, i) => `
        <div class="pill${i === 0 ? ' pill--primary' : ''}" style="font-size:12px">
          ${i === 1 ? Icons.lightning(12, i === 0 ? '#fff' : C.error) + ' ' : ''}${f}
        </div>
      `).join('')}
    </div>

    <!-- Flash Deal -->
    <div style="padding:8px 20px 16px">
      ${FlashDealCard('50% Off All Facials', 'Today Only', 'Luxe Hair Studio \u2022 Sector 17', '02', '34', '11')}
    </div>

    <!-- Deal Cards -->
    <div style="padding:0 20px">
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">Salon Deals</div>
      ${deals.map(d => `
        <div style="background:${C.surface};border:1px solid ${C.border};border-radius:10px;overflow:hidden;margin-bottom:12px">
          <div style="height:90px;background:linear-gradient(135deg, ${C.surface2}, ${C.surface3});display:flex;align-items:center;justify-content:center;position:relative">
            <div style="opacity:0.3">${svcIcon(d.icon, 36, C.text3)}</div>
            <div style="position:absolute;top:8px;right:8px">
              ${DealTag(d.percent + ' OFF')}
            </div>
            ${d.salon.tier === 'premium' ? `<div style="position:absolute;top:8px;left:8px">${TopBadge()}</div>` : ''}
            ${d.salon.tier === 'growth' ? `<div style="position:absolute;top:8px;left:8px">${VerifiedBadge()}</div>` : ''}
          </div>
          <div style="padding:12px">
            <div style="font-size:11px;color:${C.primary};font-weight:500">${d.salon.name}</div>
            <div style="font-size:14px;font-weight:600;color:${C.text};margin-top:2px">${d.title}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:4px">${d.desc}</div>
            <button data-goto-salon="${d.salon.id}" class="btn btn--primary-sm" style="width:100%;margin-top:10px;padding:10px;font-size:12px">Book This Deal</button>
          </div>
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'search' });
}


/* js/screens/dashboard-growth.js */
function renderDashboardGrowth() {
  const stats = [
    { label: 'Profile Views', value: '1,247', change: '+23%', up: true, sub: 'vs last month' },
    { label: 'Bookings', value: '89', change: '+12%', up: true, sub: 'vs last month' },
    { label: 'Conversion Rate', value: '7.1%', change: '-2%', up: false, sub: 'vs last month' },
    { label: 'Peak Hours', value: '10\u201312 AM', change: 'Sat busiest', up: true, sub: '' },
  ];

  const topServices = [
    { name: "Men's Haircut", views: 324 },
    { name: 'Beard Styling', views: 218 },
    { name: 'Premium Facial', views: 156 },
  ];

  const barHeights = [45, 68, 85, 72, 95, 60, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return Shell(`
    <div style="padding:44px 20px 14px;background:#0F0F17;min-height:100%">
      <div style="font-size:18px;font-weight:700;color:#F0EDE6">Salon Dashboard</div>
      <div style="display:inline-flex;align-items:center;gap:4px;margin-top:4px;font-size:11px;padding:3px 10px;border-radius:12px;background:rgba(123,104,174,0.15);color:${C.verified}">
        ${Icons.check(10, C.verified)} Growth Plan
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="stat-card__label">${s.label}</div>
            <div class="stat-card__value">${s.value}</div>
            <div class="stat-card__change ${s.up ? 'stat-card__change--up' : 'stat-card__change--down'}">
              ${s.up ? Icons.trendingUp(10, '#4ECB71') : Icons.trendingDown(10, '#FF6B6B')} ${s.change} ${s.sub}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Bookings Chart -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:#F0EDE6;margin-bottom:12px">Bookings This Month</div>
        <div style="height:150px;background:#1A1A28;border:1px solid #363648;border-radius:10px;display:flex;align-items:flex-end;padding:16px;gap:8px">
          ${barHeights.map((h, i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <div style="width:100%;height:${h}px;background:${C.verified};border-radius:4px 4px 0 0;opacity:0.7"></div>
              <div style="font-size:8px;color:#6E6E7A">${days[i]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Top Services -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:#F0EDE6;margin-bottom:12px">Most Viewed Services</div>
        ${topServices.map((s, i) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#1A1A28;border:1px solid #363648;border-radius:8px;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="font-size:14px;font-weight:700;color:#6E6E7A;width:20px">${i + 1}</div>
              <span style="font-size:13px;color:#F0EDE6">${s.name}</span>
            </div>
            <span style="font-size:12px;color:#B0AEAD;display:flex;align-items:center;gap:4px">${Icons.eye(14, '#6E6E7A')} ${s.views}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `, { activeTab: 'dashboard', statusDark: true, navType: 'dashboard' });
}


/* js/screens/dashboard-premium.js */
function renderDashboardPremium() {
  const stats = [
    { label: 'Profile Views', value: '3,842', change: '+41%', up: true, sub: 'vs last month' },
    { label: 'Bookings', value: '267', change: '+28%', up: true, sub: 'vs last month' },
    { label: 'Conversion Rate', value: '6.9%', change: '+0.5%', up: true, sub: 'vs last month' },
    { label: 'Flash Deal Conv.', value: '18.2%', change: '+5%', up: true, sub: 'vs last deal' },
  ];

  const competitors = [
    { service: 'Haircut', you: 400, avg: 320 },
    { service: 'Hair Color', you: 1200, avg: 1350 },
    { service: 'Facial', you: 500, avg: 580 },
    { service: 'Bridal Pkg', you: 8000, avg: 9200 },
  ];

  return Shell(`
    <div style="padding:44px 20px 14px;background:#0F0F17;min-height:100%">
      <div style="font-size:18px;font-weight:700;color:#F0EDE6">Salon Dashboard</div>
      <div style="display:inline-flex;align-items:center;gap:4px;margin-top:4px;font-size:11px;padding:3px 10px;border-radius:12px;background:rgba(245,200,66,0.15);color:${C.primaryL}">
        ${Icons.starFilled(10, C.primaryL)} Premium Plan
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="stat-card__label">${s.label}</div>
            <div class="stat-card__value" style="color:${C.primaryL}">${s.value}</div>
            <div class="stat-card__change ${s.up ? 'stat-card__change--up' : 'stat-card__change--down'}">
              ${s.up ? Icons.trendingUp(10, '#4ECB71') : Icons.trendingDown(10, '#FF6B6B')} ${s.change} ${s.sub}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- AI Insight -->
      <div style="margin-top:16px;padding:14px;background:linear-gradient(135deg, rgba(212,160,23,0.08), rgba(196,117,110,0.05));border:1px solid rgba(212,160,23,0.2);border-radius:10px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:${C.primaryL};font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:4px">${Icons.lightbulb(14, C.primaryL)} Performance Insight</div>
        <div style="font-size:12px;color:#B0AEAD;line-height:1.5">Your <strong style="color:#F0EDE6">Gold Facial</strong> is getting 3x more views this week. Consider running a <strong style="color:${C.primaryL}">Flash Deal</strong> to convert browsing into bookings.</div>
      </div>

      <!-- Competitor Pricing -->
      <div style="margin-top:16px">
        <div style="font-size:14px;font-weight:600;color:#F0EDE6;margin-bottom:12px">Competitor Pricing (Your Area)</div>
        <div style="background:#1A1A28;border:1px solid #363648;border-radius:10px;overflow:hidden">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                <th style="font-size:10px;color:#6E6E7A;text-align:left;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Service</th>
                <th style="font-size:10px;color:#6E6E7A;text-align:right;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Your Price</th>
                <th style="font-size:10px;color:#6E6E7A;text-align:right;padding:10px 12px;border-bottom:1px solid #363648;font-weight:500">Area Avg</th>
              </tr>
            </thead>
            <tbody>
              ${competitors.map(c => `
                <tr>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;color:#F0EDE6">${c.service}</td>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;text-align:right;color:${c.you <= c.avg ? '#4ECB71' : '#FF6B6B'};font-weight:600">\u20B9${c.you.toLocaleString()}</td>
                  <td style="font-size:12px;padding:10px 12px;border-bottom:1px solid #2A2A3C;text-align:right;color:#B0AEAD">\u20B9${c.avg.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Dedicated Support -->
      <div style="margin-top:16px;padding:14px;background:#1A1A28;border:1px solid #363648;border-radius:10px;display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;background:rgba(45,139,85,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.headphones(20, '#4ECB71')}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:#F0EDE6">Dedicated Support</div>
          <div style="font-size:11px;color:#6E6E7A;margin-top:2px">Chat with your account manager</div>
        </div>
        <button style="padding:6px 16px;background:#4ECB71;color:#0F0F17;border:none;border-radius:8px;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer">Open</button>
      </div>

      <!-- Monthly Review -->
      <div style="margin-top:16px;padding:14px;background:linear-gradient(135deg, rgba(212,160,23,0.06), rgba(123,104,174,0.06));border:1px solid rgba(212,160,23,0.15);border-radius:10px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#6E6E7A;font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:4px">${Icons.document(14, '#6E6E7A')} Team Review \u2014 Mar 2026</div>
        <div style="font-size:12px;color:#B0AEAD;line-height:1.5">Bridal packages saw a 40% increase in bookings. Consider adding a complementary bridal consultation to increase the average order value.</div>
      </div>
    </div>
  `, { activeTab: 'dashboard', statusDark: true, navType: 'dashboard' });
}


/* js/screens/edit-profile.js */
function renderEditProfile() {
  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-size:18px;font-weight:700;color:${C.text}">Edit Profile</span>
    </div>

    <div style="padding:0 20px">
      <!-- Avatar -->
      <div style="display:flex;flex-direction:column;align-items:center;margin:16px 0 28px">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, #B8860B, #D4A017);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700;position:relative">
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


/* js/screens/saved-addresses.js */
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


/* js/screens/refer-earn.js */
function renderReferEarn() {
  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-size:18px;font-weight:700;color:${C.text}">Refer & Earn</span>
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
        <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Your Referral Code</div>
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


/* js/screens/notification-settings.js */
function renderNotificationSettings() {
  const settings = [
    { label: 'Push Notifications', sub: 'Receive alerts on your device', on: true, icon: Icons.bell(16, C.text2) },
    { label: 'Email Notifications', sub: 'Booking confirmations & updates', on: true, icon: Icons.mail(16, C.text2) },
    { label: 'SMS Alerts', sub: 'Text messages for bookings', on: false, icon: Icons.message(16, C.text2) },
    { label: 'Flash Deal Alerts', sub: 'Get notified of time-limited deals', on: true, icon: Icons.lightning(16, C.error) },
    { label: 'Booking Reminders', sub: 'Reminders before appointments', on: true, icon: Icons.clock(16, C.text2) },
    { label: 'New Salon Alerts', sub: 'When salons open near you', on: false, icon: Icons.mapPin(16, C.text2) },
    { label: 'Marketing & Promotions', sub: 'Special offers and updates', on: false, icon: Icons.gift(16, C.text2) },
  ];

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      ${BackBtn()}
      <span style="font-size:18px;font-weight:700;color:${C.text}">Notification Settings</span>
    </div>

    <div style="padding:0 20px">
      <div style="font-size:12px;color:${C.text3};margin-bottom:16px;line-height:1.5">Choose which notifications you'd like to receive. You can change these anytime.</div>

      ${settings.map((s, i) => `
        <div style="display:flex;align-items:center;gap:12px;padding:14px 0;${i < settings.length - 1 ? `border-bottom:1px solid ${C.borderS}` : ''}">
          <div style="width:36px;height:36px;background:${C.surface2};border-radius:10px;display:flex;align-items:center;justify-content:center">${s.icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500;color:${C.text}">${s.label}</div>
            <div style="font-size:11px;color:${C.text3};margin-top:1px">${s.sub}</div>
          </div>
          ${ToggleSwitch(s.on)}
        </div>
      `).join('')}
    </div>
  `, { activeTab: 'profile' });
}


/* js/screens/help-support.js */
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
      <span style="font-size:18px;font-weight:700;color:${C.text}">Help & Support</span>
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
        <div style="width:40px;height:40px;background:rgba(91,127,165,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.mail(18, C.info)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${C.text}">Email Support</div>
          <div style="font-size:11px;color:${C.text3}">help@salofy.in</div>
        </div>
        ${Icons.forward(16, C.text3)}
      </div>

      <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer">
        <div style="width:40px;height:40px;background:rgba(45,139,85,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center">${Icons.message(18, C.success)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${C.text}">Live Chat</div>
          <div style="font-size:11px;color:${C.text3}">Usually replies within 5 min</div>
        </div>
        ${Icons.forward(16, C.text3)}
      </div>
    </div>
  `, { activeTab: 'profile' });
}


/* js/screens/reschedule.js */
function renderReschedule() {
  const bk = AppState.rescheduleBooking || {
    salon: salons[1], date: 'Sun, Mar 29', time: '10:30 AM', services: "Men's Haircut, Beard Styling"
  };
  const s = bk.salon;
  const dates = [
    { d:'Today',n:'28' },{ d:'Sun',n:'29' },{ d:'Mon',n:'30' },
    { d:'Tue',n:'31'  },{ d:'Wed',n:'1'  },{ d:'Thu',n:'2'  },
    { d:'Fri',n:'3'   },{ d:'Sat',n:'4'  },
  ];
  const times = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','2:00','2:30','3:00','3:30'];
  const selDate = AppState.booking.dateIdx;
  const selTime = AppState.booking.time;

  return Shell(`
    <div style="padding:44px 20px 12px;display:flex;align-items:center;gap:10px">
      <div data-nav="back" class="back-btn">${Icons.back(18, C.text)}</div>
      <span style="font-size:18px;font-weight:700;color:${C.text}">Reschedule</span>
    </div>

    <!-- Current booking info -->
    <div style="margin:0 20px 16px;background:${C.surface2};border:1px solid ${C.border};border-radius:12px;padding:14px">
      <div style="font-size:10px;color:${C.text3};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Current Appointment</div>
      <div style="display:flex;gap:10px;align-items:center">
        <div style="width:40px;height:40px;background:${C.surface3};border-radius:8px;display:flex;align-items:center;justify-content:center">${Icons.scissors(18, C.text3)}</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:${C.text}">${s.name}</div>
          <div style="font-size:11px;color:${C.text3}">${bk.date} at ${bk.time}</div>
          <div style="font-size:11px;color:${C.text2};margin-top:1px">${bk.services}</div>
        </div>
      </div>
    </div>

    <div style="padding:0 20px 8px">
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:${C.text2};margin-bottom:14px">
        ${Icons.calendar(14, C.primary)}
        <span>Choose your new date and time</span>
      </div>

      <!-- Date picker -->
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">New Date</div>
      <div style="display:flex;gap:8px;overflow-x:auto;margin-bottom:16px" class="hide-sb">
        ${dates.map((dt, i) => `
          <div class="date-chip${i === selDate ? ' date-chip--active' : ''}" onclick="AppState.booking.dateIdx=${i};this.closest('.phone-content').querySelectorAll('.date-chip').forEach((c,j)=>{c.classList.toggle('date-chip--active',j===${i});c.querySelector('.date-chip__num').style.color=j===${i}?'${C.primary}':'${C.text}'})">
            <div class="date-chip__day">${dt.d}</div>
            <div class="date-chip__num" style="color:${i === selDate ? C.primary : C.text}">${dt.n}</div>
          </div>
        `).join('')}
      </div>

      <!-- Time picker -->
      <div style="font-size:13px;font-weight:600;color:${C.text2};margin-bottom:10px">New Time</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
        ${times.map(t => `
          <div class="time-chip${t === selTime ? ' time-chip--active' : ''}" onclick="AppState.booking.time='${t}';this.closest('.phone-content').querySelectorAll('.time-chip').forEach(c=>c.classList.toggle('time-chip--active',c.textContent.trim()==='${t}'))">
            ${t}
          </div>
        `).join('')}
      </div>

      <!-- Free cancellation notice -->
      <div style="background:${C.successS};border:1px solid rgba(45,139,85,0.25);border-radius:10px;padding:12px 14px;display:flex;gap:8px;align-items:flex-start;margin-bottom:16px">
        ${Icons.shield(16, C.success)}
        <div style="font-size:12px;color:${C.text2};line-height:1.5">
          <strong style="color:${C.success}">Free rescheduling</strong> &mdash; you can reschedule up to 2 hours before your appointment at no charge.
        </div>
      </div>

      <button data-action="view-bookings" style="width:100%;padding:14px;background:${C.primary};color:#fff;border:none;border-radius:12px;font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">
        Confirm Reschedule
      </button>
    </div>
  `, { activeTab: 'bookings' });
}


/* js/app.js */
/* ═══════════════════════════════════════════════════
   SALOFY APP CONTROLLER
   State management, navigation, event delegation
   ═══════════════════════════════════════════════════ */

/* ── Global App State ── */
const AppState = {
  currentScreen: 'home',
  history: [],
  selectedSalon: salons[0],          // salon object
  selectedServices: [],              // services picked in search (pre-fill salon)
  salonServices: [],                 // services selected on salon profile page
  salonTab: 'Services',
  favorites: new Set([1, 4]),
  searchQuery: '',
  booking: { dateIdx: 1, time: '10:30' },
  rescheduleBooking: null,           // booking being rescheduled
};

/* ── Screen Registry ── */
const screens = [
  // Auth
  { id: 'splash',              label: 'Splash',              group: 'Auth',       render: renderSplash },
  { id: 'login',               label: 'Login',               group: 'Auth',       render: renderLogin },
  { id: 'otp',                 label: 'OTP',                 group: 'Auth',       render: renderOTP },
  // Customer
  { id: 'home',                label: 'Home',                group: 'Customer',   render: renderHome },
  { id: 'search-input',        label: 'Search',              group: 'Customer',   render: renderSearchInput },
  { id: 'search-results',      label: 'Results',             group: 'Customer',   render: renderSearchResults },
  { id: 'salon-starter',       label: 'Salon (Starter)',     group: 'Customer',   render: () => { AppState.selectedSalon = salons[2]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'salon-growth',        label: 'Salon (Growth)',      group: 'Customer',   render: () => { AppState.selectedSalon = salons[1]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'salon-premium',       label: 'Salon (Premium)',     group: 'Customer',   render: () => { AppState.selectedSalon = salons[0]; AppState.salonServices = []; AppState.salonTab = 'Services'; return renderSalonProfile(); } },
  { id: 'booking',             label: 'Booking',             group: 'Customer',   render: renderBooking },
  { id: 'booking-confirmed',   label: 'Confirmed',           group: 'Customer',   render: renderBookingConfirmed },
  { id: 'deals',               label: 'Deals',               group: 'Customer',   render: renderDeals },
  // Activity
  { id: 'notifications',       label: 'Alerts',              group: 'Activity',   render: renderNotifications },
  { id: 'my-bookings',         label: 'My Bookings',         group: 'Activity',   render: renderMyBookings },
  { id: 'reschedule',          label: 'Reschedule',          group: 'Activity',   render: renderReschedule },
  { id: 'favorites',           label: 'Saved',               group: 'Activity',   render: renderFavorites },
  // Account
  { id: 'profile',             label: 'Profile',             group: 'Account',    render: renderProfile },
  { id: 'edit-profile',        label: 'Edit Profile',        group: 'Account',    render: renderEditProfile },
  { id: 'saved-addresses',     label: 'Addresses',           group: 'Account',    render: renderSavedAddresses },
  { id: 'refer-earn',          label: 'Refer & Earn',        group: 'Account',    render: renderReferEarn },
  { id: 'notification-settings',label: 'Notif. Settings',   group: 'Account',    render: renderNotificationSettings },
  { id: 'help-support',        label: 'Help',                group: 'Account',    render: renderHelpSupport },
  // Dashboard
  { id: 'dashboard-growth',    label: 'Dashboard (Growth)',  group: 'Dashboard',  render: renderDashboardGrowth },
  { id: 'dashboard-premium',   label: 'Dashboard (Premium)', group: 'Dashboard',  render: renderDashboardPremium },
];

/* ── Navigation ── */
function navigate(screenId, params = {}) {
  // Push current to history (for back button)
  if (AppState.currentScreen !== screenId) {
    AppState.history.push(AppState.currentScreen);
    if (AppState.history.length > 20) AppState.history.shift();
  }

  // Apply state params
  Object.assign(AppState, params);
  AppState.currentScreen = screenId;

  // Re-render target screen
  const screen = screens.find(s => s.id === screenId);
  if (!screen) return;
  const container = document.getElementById('screen-' + screenId);
  if (container) {
    container.innerHTML = screen.render() + `<div class="screen-label">${screen.label}<span>${screen.group}</span></div>`;
  }

  // Update visible screen
  document.querySelectorAll('.screen-container').forEach(el => {
    el.classList.toggle('screen-container--active', el.id === 'screen-' + screenId);
  });
  // Update nav pills
  document.querySelectorAll('.screen-nav__btn').forEach(btn => {
    btn.classList.toggle('screen-nav__btn--active', btn.dataset.screen === screenId);
  });

  // Scroll phone content to top
  const pc = container && container.querySelector('.phone-content');
  if (pc) pc.scrollTop = 0;
}

function goBack() {
  const prev = AppState.history.pop();
  navigate(prev || 'home');
}

/* ── Go To Salon ── */
function goToSalon(salonId, preSelected = []) {
  const salon = salons.find(s => s.id === salonId);
  if (!salon) return;
  const screenId = salon.tier === 'starter' ? 'salon-starter' : salon.tier === 'growth' ? 'salon-growth' : 'salon-premium';
  navigate(screenId, {
    selectedSalon: salon,
    salonServices: preSelected.filter(sid => salon.services[sid]),
    salonTab: 'Services',
  });
}

/* ── Service Toggle (on salon page) ── */
function toggleSalonService(svcId, phoneEl) {
  const s = AppState.selectedSalon;
  if (!s.services[svcId]) return;
  const idx = AppState.salonServices.indexOf(svcId);
  if (idx > -1) AppState.salonServices.splice(idx, 1);
  else AppState.salonServices.push(svcId);

  // Update row appearance
  const row = phoneEl.querySelector(`[data-svc-toggle="${svcId}"]`);
  if (row) {
    const sel = AppState.salonServices.includes(svcId);
    row.classList.toggle('service-select--active', sel);
    const chk = row.querySelector('.svc-chk');
    if (chk) {
      chk.style.background = sel ? C.primary : 'transparent';
      chk.style.borderColor = sel ? C.primary : C.border;
      chk.innerHTML = sel ? Icons.check(14, '#fff') : '';
    }
  }
  updateSalonSummaryBar(phoneEl);
}

function updateSalonSummaryBar(phoneEl) {
  const s = AppState.selectedSalon;
  const svcs = AppState.salonServices.filter(sid => s.services[sid]);
  const subtotal = svcs.reduce((a, sid) => a + s.services[sid], 0);
  const bar = phoneEl.querySelector('.salon-summary-bar');
  if (!bar) return;
  if (svcs.length === 0) {
    bar.style.display = 'none';
  } else {
    bar.style.display = 'flex';
    const countEl = bar.querySelector('.ssb-count');
    const priceEl = bar.querySelector('.ssb-price');
    if (countEl) countEl.textContent = `${svcs.length} service${svcs.length > 1 ? 's' : ''}`;
    if (priceEl) priceEl.textContent = `\u20B9${subtotal}`;
  }
}

/* ── Tab Switching ── */
function switchTab(panelName, phoneEl) {
  phoneEl.querySelectorAll('.tab[data-panel]').forEach(t => {
    t.classList.toggle('tab--active', t.dataset.panel === panelName);
  });
  phoneEl.querySelectorAll('.tab-panel').forEach(p => {
    p.style.display = p.dataset.panel === panelName ? '' : 'none';
  });
  AppState.salonTab = panelName;
}

/* ── Favorites ── */
function toggleFav(salonId) {
  if (AppState.favorites.has(salonId)) AppState.favorites.delete(salonId);
  else AppState.favorites.add(salonId);
  // Update heart icons on current screen
  document.querySelectorAll(`.fav-btn[data-fav="${salonId}"]`).forEach(btn => {
    const isFav = AppState.favorites.has(salonId);
    btn.innerHTML = Icons.heart(16, isFav ? C.error : C.text3, isFav);
  });
}

/* ── Toggle Switch ── */
function handleToggle(el) {
  el.classList.toggle('toggle--on');
}

/* ── Cancel Booking Inline ── */
function confirmCancelBooking(idx) {
  const row = document.querySelector(`[data-booking-idx="${idx}"]`);
  if (!row) return;
  row.innerHTML = `
    <div style="text-align:center;padding:12px 0">
      <div style="font-size:13px;font-weight:600;color:${C.error};margin-bottom:10px">Cancel this booking?</div>
      <div style="display:flex;gap:8px">
        <button onclick="this.closest('[data-booking-idx]').outerHTML=''" style="flex:1;padding:10px;background:${C.surface2};border:1px solid ${C.border};border-radius:8px;font-family:inherit;font-size:12px;cursor:pointer;color:${C.text}">Keep Booking</button>
        <button onclick="navigate('home')" style="flex:1;padding:10px;background:${C.error};color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer">Yes, Cancel</button>
      </div>
    </div>`;
}

/* ── Event Delegation ── */
function initEvents() {
  document.getElementById('app').addEventListener('click', function(e) {
    // Bottom nav & data-nav links
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
      e.stopPropagation();
      const nav = navEl.dataset.nav;
      switch (nav) {
        case 'home':         navigate('home'); break;
        case 'search':       navigate('search-input'); break;
        case 'favorites':    navigate('favorites'); break;
        case 'bookings':     navigate('my-bookings'); break;
        case 'profile':      navigate('profile'); break;
        case 'back':         goBack(); break;
        case 'notifications':navigate('notifications'); break;
        case 'deals':        navigate('deals'); break;
        default:             navigate(nav);
      }
      return;
    }

    // Tab switching
    const tabEl = e.target.closest('.tab[data-panel]');
    if (tabEl) {
      switchTab(tabEl.dataset.panel, tabEl.closest('.phone-shell'));
      return;
    }

    // Service toggle on salon page
    const svcEl = e.target.closest('[data-svc-toggle]');
    if (svcEl) {
      toggleSalonService(svcEl.dataset.svcToggle, svcEl.closest('.phone-shell'));
      return;
    }

    // Favorite toggle
    const favEl = e.target.closest('.fav-btn[data-fav]');
    if (favEl) {
      e.stopPropagation();
      toggleFav(parseInt(favEl.dataset.fav));
      return;
    }

    // Go to salon from card
    const salonCard = e.target.closest('[data-goto-salon]');
    if (salonCard && !e.target.closest('.fav-btn')) {
      goToSalon(parseInt(salonCard.dataset.gotoSalon), AppState.selectedServices);
      return;
    }

    // Generic data-action buttons
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      switch (action) {
        case 'go-otp':      navigate('otp'); break;
        case 'go-home':     navigate('home'); break;
        case 'go-search':   navigate('search-input', { selectedServices: [] }); break;
        case 'show-results':
          navigate('search-results', { selectedServices: [...AppState.selectedServices] });
          break;
        case 'book-now':
          navigate('booking', { salonServices: [...AppState.salonServices] });
          break;
        case 'confirm-booking':
          navigate('booking-confirmed');
          break;
        case 'view-bookings':
          navigate('my-bookings');
          break;
        case 'go-login':
          navigate('login');
          break;
        case 'go-profile':
          navigate('profile');
          break;
        case 'open-deals':
        case 'go-deals':
          navigate('deals');
          break;
        case 'go-notifications':
          navigate('notifications');
          break;
        case 'go-otp':
          navigate('otp');
          break;
        case 'go-home':
          navigate('home');
          break;
      }
      return;
    }

    // Toggle switch
    const toggleEl = e.target.closest('.toggle');
    if (toggleEl) {
      handleToggle(toggleEl);
      return;
    }

    // Accordion
    const accordionHeader = e.target.closest('.accordion__header');
    if (accordionHeader) {
      const item = accordionHeader.closest('.accordion__item');
      const wasOpen = item.classList.contains('accordion__item--open');
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => i.classList.remove('accordion__item--open'));
      if (!wasOpen) item.classList.add('accordion__item--open');
      return;
    }

    // Search service pill toggle
    const searchSvcEl = e.target.closest('[data-search-svc]');
    if (searchSvcEl) {
      const svcId = searchSvcEl.dataset.searchSvc;
      const idx = AppState.selectedServices.indexOf(svcId);
      if (idx > -1) AppState.selectedServices.splice(idx, 1);
      else AppState.selectedServices.push(svcId);
      // Re-render search input
      const scr = AppState.currentScreen;
      if (scr === 'search-input') {
        const container = document.getElementById('screen-search-input');
        const screen = screens.find(s => s.id === 'search-input');
        container.innerHTML = screen.render() + `<div class="screen-label">Search<span>Customer</span></div>`;
      }
      return;
    }
  });
}

/* ── Show screen without re-render (top nav pill click) ── */
function showScreenFromNav(screenId) {
  navigate(screenId);
}

/* ── Initialise ── */
function init() {
  const wrapper = document.getElementById('app');

  // Build top nav
  const groups = [...new Set(screens.map(s => s.group))];
  let navHtml = '<div class="screen-nav">';
  groups.forEach(group => {
    navHtml += '<div class="screen-nav__group">';
    screens.filter(s => s.group === group).forEach(s => {
      navHtml += `<button class="screen-nav__btn${s.id === AppState.currentScreen ? ' screen-nav__btn--active' : ''}" data-screen="${s.id}" onclick="showScreenFromNav('${s.id}')">${s.label}</button>`;
    });
    navHtml += '</div>';
  });
  navHtml += '</div>';

  // Build all screen containers
  let screensHtml = '';
  screens.forEach(s => {
    screensHtml += `<div id="screen-${s.id}" class="screen-container${s.id === AppState.currentScreen ? ' screen-container--active' : ''}">
      ${s.render()}
      <div class="screen-label">${s.label}<span>${s.group}</span></div>
    </div>`;
  });

  wrapper.innerHTML = `
    <div class="demo-header">
      <div class="demo-header__logo">Salofy</div>
      <div class="demo-header__sub">Complete Frontend Design Reference &mdash; All flows interactive</div>
    </div>
    ${navHtml}
    ${screensHtml}
  `;

  initEvents();
}

document.addEventListener('DOMContentLoaded', init);
