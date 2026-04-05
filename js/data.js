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
