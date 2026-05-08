/* ═══════════════════════════════════════════════════
   SALOFY DATA
   Color constants, services, and salon sample data
   ═══════════════════════════════════════════════════ */

/* Color token mirror — all values map 1:1 to css/tokens.css :root vars.
   Use C.x in JS template literals; CSS handles theming. */
const C = {
  /* surfaces */
  bg:        'var(--bg)',
  surface:   'var(--surface)',
  surface2:  'var(--surface-2)',
  surface3:  'var(--surface-3)',
  /* borders */
  border:    'var(--border)',
  borderS:   'var(--border-subtle)',
  /* text */
  text:      'var(--text)',
  text2:     'var(--text-2)',
  text3:     'var(--text-3)',
  /* brand */
  primary:   'var(--primary)',
  primaryL:  'var(--primary-light)',
  primaryD:  'var(--primary-dark)',
  primaryS:  'var(--primary-surface)',
  rose:      'var(--rose-500)',
  rose50:    'var(--rose-50)',
  plum:      'var(--plum-600)',
  topSalon:  'var(--plum-600)',
  saffron:   'var(--saffron-400)',
  saffronLite: 'var(--saffron-300)',
  /* semantic */
  success:   'var(--success)',
  successS:  'var(--success-surface)',
  successB:  'var(--success-border)',
  error:     'var(--error)',
  errorS:    'var(--error-surface)',
  errorB:    'var(--error-border)',
  info:      'var(--info)',
  infoS:     'var(--info-surface)',
  verified:  'var(--verified)',
  warning:   'var(--warning)',
  /* ink scale */
  ink50:  'var(--ink-50)',  ink100: 'var(--ink-100)', ink150: 'var(--ink-150)',
  ink200: 'var(--ink-200)', ink300: 'var(--ink-300)', ink400: 'var(--ink-400)',
  ink500: 'var(--ink-500)', ink600: 'var(--ink-600)', ink700: 'var(--ink-700)',
  ink800: 'var(--ink-800)', ink900: 'var(--ink-900)',
  /* shadows */
  shadowSm:   'var(--shadow-sm)',
  shadowMd:   'var(--shadow-md)',
  shadowRose: 'var(--shadow-rose)',
};

const allServices = [
  { id: "haircut",   label: "Haircut",       icon: "scissors", time: "30 min",
    desc: "Wash, cut and style by a trained stylist.",
    includes: ["Consultation", "Wash", "Cut", "Style"] },
  { id: "headwash",  label: "Head Wash",     icon: "droplet",  time: "15 min",
    desc: "Refreshing wash with shampoo and conditioner.",
    includes: ["Shampoo", "Conditioner", "Quick dry"] },
  { id: "beard",     label: "Beard Trim",    icon: "beard",    time: "20 min",
    desc: "Shape and trim for a clean, defined beard line.",
    includes: ["Shape & line-up", "Trim", "Aftercare oil"] },
  { id: "color",     label: "Hair Color",    icon: "palette",  time: "60 min",
    desc: "Professional colour application with consultation.",
    includes: ["Consultation", "Application", "Wash & dry"] },
  { id: "facial",    label: "Facial",        icon: "sparkle",  time: "45 min",
    desc: "Cleansing facial tailored to your skin type.",
    includes: ["Cleanse", "Exfoliate", "Mask", "Moisturise"] },
  { id: "waxing",    label: "Waxing",        icon: "flower",   time: "30 min",
    desc: "Smooth, gentle hair removal using quality wax.",
    includes: ["Pre-clean", "Wax", "Soothing finish"] },
  { id: "spa",       label: "Spa",           icon: "spa",      time: "60 min",
    desc: "Relaxing spa treatment for hair and scalp.",
    includes: ["Oil massage", "Steam", "Wash & blow-dry"] },
  { id: "bridal",    label: "Bridal",        icon: "crown",    time: "3 hrs",
    desc: "Complete bridal styling for your special day.",
    includes: ["Hair", "Makeup", "Draping support"] },
  { id: "manicure",  label: "Manicure",      icon: "nails",    time: "40 min",
    desc: "Nail care, shaping and finish for your hands.",
    includes: ["Nail shape", "Cuticle care", "Polish"] },
  { id: "threading", label: "Threading",     icon: "needle",   time: "15 min",
    desc: "Precise hair removal using cotton thread.",
    includes: ["Eyebrow shape", "Upper lip optional"] },
  { id: "shave",     label: "Clean Shave",   icon: "razor",    time: "20 min",
    desc: "Hot-towel clean shave with aftercare.",
    includes: ["Hot towel", "Shave", "Aftercare balm"] },
  { id: "massage",   label: "Head Massage",  icon: "massage",  time: "20 min",
    desc: "Stress-relief head and scalp massage.",
    includes: ["Choice of oil", "Scalp massage", "Neck & shoulder"] },
];

const salons = [
  {
    id: 1, name: "Luxe Hair Studio", loc: "Sector 17, Chandigarh", dist: "1.2 km", mapX: 55, mapY: 25,
    rating: 4.8, reviews: 312, tier: "premium", photos: 32,
    cover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "10 AM - 10 PM", deal: "30% Off First Visit",
    flash: { title: "50% Off All Facials", sub: "Today Only", hrs: "02", min: "34", sec: "11" },
    staff: [
      { n: "Simran", r: "Head Stylist", gender: "f" },
      { n: "Arjun", r: "Color Master", gender: "m" },
      { n: "Meera", r: "Bridal Specialist", gender: "f" },
      { n: "Ravi", r: "Skin Expert", gender: "m" }
    ],
    services: { haircut: 400, headwash: 100, beard: 200, color: 1200, facial: 1000, waxing: 800, spa: 1500, bridal: 8000, manicure: 500, threading: 100, shave: 150, massage: 300 },
    serviceDiscounts: { facial: 799, color: 999, spa: 1199 },
    serviceDetails: {
      bridal: {
        hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=600&fit=crop',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=600&fit=crop',
        ],
        longDesc: "Our signature bridal experience. A dedicated stylist works with you on hair, makeup and final draping support so you walk out camera-ready. Includes a pre-event trial run so there are zero surprises on the big day.",
        includes: ["Pre-event trial", "HD makeup", "Bridal hair styling", "Saree/lehenga draping help", "Touch-up kit"],
        hygiene: { photo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop', caption: "Sterilised tools, single-use sponges, and freshly laundered linen for every booking." },
        pastWork: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop',
        ],
        stylistIds: [2],
      },
      facial: {
        hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&h=600&fit=crop',
        longDesc: "A deep-clean facial customised to your skin type. We start with a consultation, then move through cleanse, exfoliation, a targeted mask, and a finishing moisturiser.",
        includes: ["Skin consultation", "Deep cleanse", "Exfoliation", "Targeted mask", "Moisturiser & SPF"],
        hygiene: { photo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop', caption: "All tools sterilised between clients. Single-use applicators only." },
        stylistIds: [3],
      },
    },
    packageDetails: {
      pkg4: {
        hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=600&fit=crop',
        ],
        longDesc: "Our flagship bridal package — bridal styling, a glow-boosting facial, and full-body waxing combined into one streamlined day.",
        includes: ["Trial run included", "Bridal hair & makeup", "Glow facial", "Full body waxing", "Touch-up kit"],
        pastWork: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
        ],
        stylistIds: [2, 3],
      },
    },
    packages: [
      { id: "pkg1", name: "Groom & Go", desc: "Quick all-in-one groom", services: ["haircut", "headwash", "beard"], price: 550, savings: 150, duration: "65 min" },
      { id: "pkg2", name: "Skin Glow", desc: "Refresh your skin and hair", services: ["facial", "headwash"], price: 899, savings: 201, duration: "60 min" },
      { id: "pkg3", name: "Full Makeover", desc: "Complete hair and skin transformation", services: ["haircut", "color", "facial"], price: 2099, savings: 501, duration: "2.5 hrs" },
      { id: "pkg4", name: "Bridal Luxe", desc: "The complete bridal experience", services: ["bridal", "facial", "waxing"], price: 8499, savings: 1301, duration: "4 hrs" },
      { id: "pkg5", name: "Head-to-Toe Luxe", desc: "Every service we offer — the full works", services: ["haircut", "headwash", "beard", "color", "facial", "waxing", "spa", "manicure", "threading", "shave", "massage"], price: 12999, savings: 2451, duration: "7 hrs" },
    ]
  },
  {
    id: 2, name: "Urban Style", loc: "Kharar Main Road", dist: "3.8 km", mapX: 78, mapY: 72,
    rating: 4.5, reviews: 124, tier: "growth", photos: 15,
    cover: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "9 AM - 9 PM", deal: "20% Off First Visit",
    staff: [
      { n: "Rajesh", r: "Senior Stylist", gender: "m" },
      { n: "Vikram", r: "Color Expert", gender: "m" },
      { n: "Neha", r: "Facial Specialist", gender: "f" }
    ],
    services: { haircut: 250, headwash: 50, beard: 150, color: 800, facial: 600, shave: 100, massage: 200, threading: 40 },
    serviceDetails: {
      haircut: {
        hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&h=600&fit=crop',
        longDesc: "Our most popular haircut. Includes a consultation, wash, precision cut and a finishing style. Done by a senior stylist with 8+ years of experience.",
        includes: ["Consultation", "Wash", "Precision cut", "Finishing style"],
        hygiene: { photo: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop', caption: "Tools sanitised between every client. Fresh cape and towel for each booking." },
        stylistIds: [0],
      },
    },
    packageDetails: {
      pkg2: {
        hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&h=600&fit=crop',
        longDesc: "The full grooming routine in one sitting — haircut, beard styling and a refreshing wash. Most-booked package by our regulars.",
        includes: ["Senior stylist", "Wash", "Beard shape & line-up", "Aftercare oil"],
        stylistIds: [0],
      },
    },
    packages: [
      { id: "pkg1", name: "Quick Refresh", desc: "Haircut and wash combo", services: ["haircut", "headwash"], price: 249, savings: 51, duration: "45 min" },
      { id: "pkg2", name: "Gent's Full", desc: "Complete grooming session", services: ["haircut", "beard", "headwash"], price: 369, savings: 81, duration: "65 min" },
      { id: "pkg3", name: "Colour & Glow", desc: "Hair colour with a facial", services: ["color", "facial"], price: 1149, savings: 251, duration: "1.75 hrs" },
    ]
  },
  {
    id: 3, name: "Glow Beauty Parlour", loc: "Phase 3B2, Mohali", dist: "5.1 km", mapX: 42, mapY: 68,
    rating: 4.1, reviews: 38, tier: "starter", photos: 5,
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "10 AM - 8 PM",
    staff: [],
    services: { haircut: 200, headwash: 30, facial: 400, waxing: 350, manicure: 250, threading: 50 },
    packages: [
      { id: "pkg1", name: "Glow Package", desc: "Facial with threading", services: ["facial", "threading"], price: 379, savings: 71, duration: "1 hr" },
      { id: "pkg2", name: "Polish & Shine", desc: "Facial and manicure combo", services: ["facial", "manicure"], price: 549, savings: 101, duration: "1.5 hrs" },
    ]
  },
  {
    id: 4, name: "Royal Cuts", loc: "Phase 5, Mohali", dist: "2.4 km", mapX: 35, mapY: 52,
    rating: 4.7, reviews: 198, tier: "premium", photos: 28,
    cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "9 AM - 9 PM", deal: "15% Off Combo",
    staff: [
      { n: "Harpreet", r: "Owner & Stylist", gender: "m" },
      { n: "Jaspreet", r: "Beard Expert", gender: "m" }
    ],
    services: { haircut: 350, headwash: 80, beard: 180, color: 1000, shave: 130, massage: 250, spa: 1200 },
    serviceDiscounts: { color: 799, spa: 999 },
    packages: [
      { id: "pkg1", name: "Royal Groom", desc: "Haircut, beard & wash", services: ["haircut", "beard", "headwash"], price: 499, savings: 111, duration: "65 min" },
      { id: "pkg2", name: "King's Treat", desc: "Haircut, shave & massage", services: ["haircut", "shave", "massage"], price: 599, savings: 131, duration: "1.25 hrs" },
      { id: "pkg3", name: "Color & Spa", desc: "Hair color with full spa", services: ["color", "spa"], price: 1799, savings: 401, duration: "2 hrs" },
    ]
  },
  {
    id: 5, name: "Neha's Salon", loc: "Patiala Gate", dist: "6.3 km", mapX: 18, mapY: 82,
    rating: 3.9, reviews: 22, tier: "starter", photos: 4,
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "10 AM - 7 PM",
    staff: [],
    services: { haircut: 180, facial: 350, threading: 40, waxing: 300, manicure: 200 },
    packages: [
      { id: "pkg1", name: "Essentials", desc: "Facial with threading", services: ["facial", "threading"], price: 329, savings: 61, duration: "1 hr" },
      { id: "pkg2", name: "Full Pampering", desc: "Facial, waxing & manicure", services: ["facial", "waxing", "manicure"], price: 699, savings: 151, duration: "2 hrs" },
    ]
  },
  {
    id: 6, name: "Blade & Co.", loc: "Sector 22, Chandigarh", dist: "2.1 km", mapX: 62, mapY: 35,
    rating: 4.6, reviews: 87, tier: "growth", photos: 12,
    cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=450&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=center',
    ],
    hours: "10 AM - 9 PM", deal: "\u20B999 Head Wash",
    staff: [
      { n: "Karan", r: "Master Barber", gender: "m" }
    ],
    services: { haircut: 300, headwash: 99, beard: 160, shave: 120, massage: 180, color: 900 },
    packages: [
      { id: "pkg1", name: "The Classic", desc: "Haircut, headwash & beard trim", services: ["haircut", "headwash", "beard"], price: 449, savings: 110, duration: "65 min" },
      { id: "pkg2", name: "Barber's Best", desc: "Haircut, shave & massage", services: ["haircut", "shave", "massage"], price: 479, savings: 121, duration: "1.25 hrs" },
    ]
  },
];

function getSvc(id) {
  return allServices.find(s => s.id === id);
}

const bookings = [
  { idx: 0, salonId: 2, date: 'Sun, Mar 29', time: '10:30 AM', svcIds: ['haircut', 'beard'],                                 status: 'upcoming' },
  { idx: 1, salonId: 1, date: 'Wed, Mar 26', time: '11:00 AM', pkgId: 'pkg3',                                                status: 'upcoming' },
  { idx: 6, salonId: 1, date: 'Sat, Apr 5',  time: '12:00 PM', svcIds: ['haircut', 'headwash', 'beard', 'facial', 'manicure'], status: 'upcoming' },
  { idx: 7, salonId: 1, date: 'Sun, Apr 6',  time: '3:00 PM',  pkgId: 'pkg1', svcIds: ['facial', 'manicure'],                  status: 'upcoming' },
  { idx: 5, salonId: 4, date: 'Tue, Apr 1',  time: '4:00 PM',  svcIds: ['shave', 'massage'],                                  status: 'upcoming' },
  { idx: 2, salonId: 1, date: 'Sat, Mar 22', time: '2:00 PM',  svcIds: ['facial'],                                            status: 'completed' },
  { idx: 3, salonId: 3, date: 'Mon, Mar 15', time: '11:00 AM', svcIds: ['facial', 'waxing'],                                  status: 'completed' },
  { idx: 4, salonId: 4, date: 'Fri, Mar 7',  time: '3:00 PM',  svcIds: ['beard', 'massage'],                                  status: 'completed' },
];
