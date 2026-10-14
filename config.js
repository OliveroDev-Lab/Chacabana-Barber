/* ==========================================================================
   Chacabana Barber Shop — config.js
   ⚙️  ÚNICO archivo que necesitas editar para el negocio.
   Todo lo demás (HTML/CSS/JS) es la plantilla reutilizable.
   Los textos de la interfaz (botones, títulos de sección) viven en app.js.
   ========================================================================== */
window.SITE_CONFIG = {

  /* ---------- Identidad ---------- */
  businessName: "Chacabana Barber Shop",

  /* ⚠️ WhatsApp: formato internacional, SIN "+", SIN espacios ni guiones.
     Ej. EE.UU. 210-555-1234  ->  "12105551234" */
  whatsapp: "12100000000",

  /* Redes y perfiles (pon los reales) */
  instagram: "https://www.instagram.com/",
  instagramHandle: "@chacabanabarber",
  googleReviewsUrl: "https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID",
  googleProfileUrl: "https://maps.app.goo.gl/ompSfuD82TB1nF2V8",

  /* Analítica privada de Cloudflare Web Analytics.
     Crea el sitio en Cloudflare Pages > Web Analytics y pega aquí el token.
     Si lo dejas vacío, no se carga ningún script. */
  cloudflareAnalyticsToken: "",

  /* ---------- Portada (Hero) ----------
     Generado por tools/optimize_gallery.py (--hero y --hero-video) */
  hero: {
    image: "images/hero.webp",     // foto de portada (móvil y poster)
    video: "videos/hero.mp4",      // video de fondo (solo desktop, sin audio)
    poster: "images/hero.webp"
  },

  /* Footer */
  developerCredit: "Desarrollado con 💈 para San Antonio, TX.",

  /* ---------- Sucursales ---------- */
  branches: [
    {
      id: "eisenhauer",
      name: "Eisenhauer Rd",
      street: "5002 Eisenhauer Rd",
      city: "San Antonio",
      state: "TX",
      zip: "78218",
      address: "5002 Eisenhauer Rd, San Antonio, TX 78218",
      phone: "",                         // opcional: "12105551234"
      maps: "https://maps.app.goo.gl/ompSfuD82TB1nF2V8",
      /* Mapa embebido sin API key: usa la dirección */
      mapQuery: "5002 Eisenhauer Rd, San Antonio, TX 78218",
      /* Horario semanal (formato 24h). null = cerrado ese día */
      hours: {
        mon: ["09:00", "19:30"], tue: ["09:00", "19:30"], wed: ["09:00", "19:30"],
        thu: ["09:00", "19:30"], fri: ["09:00", "19:30"], sat: ["09:00", "19:30"],
        sun: ["10:00", "17:00"]
      }
    },
    {
      id: "schaefer",
      name: "Schaefer Rd",
      street: "9204 Schaefer Rd",
      city: "Converse",
      state: "TX",
      zip: "78109",
      address: "9204 Schaefer Rd, Converse, TX 78109",
      phone: "",
      maps: "https://maps.app.goo.gl/wbh9gSRRYcQfr2HS6",
      mapQuery: "9204 Schaefer Rd, Converse, TX 78109",
      hours: {
        mon: ["09:00", "19:30"], tue: ["09:00", "19:30"], wed: ["09:00", "19:30"],
        thu: ["09:00", "19:30"], fri: ["09:00", "19:30"], sat: ["09:00", "19:30"],
        sun: ["10:00", "17:00"]
      }
    }
  ],

  /* Zona horaria del negocio (para el estado "Abierto / Cerrado") */
  timezone: "America/Chicago",

  /* ---------- Servicios (edita precios y duración) ---------- */
  services: [
    { id: "regular", price: 25, minutes: 30,
      name: { es: "Corte Regular", en: "Regular Haircut" },
      desc: { es: "Corte clásico a tijera y máquina, lavado y peinado final.",
              en: "Classic scissor and clipper cut, wash and final styling." } },
    { id: "fade", price: 30, minutes: 40,
      name: { es: "Fade & Taper", en: "Fade & Taper" },
      desc: { es: "Skin Fade, Burst Fade o Taper Fade con degradado perfecto.",
              en: "Skin Fade, Burst Fade or Taper Fade with a flawless blend." } },
    { id: "beard", price: 18, minutes: 25,
      name: { es: "Barba & Toalla Caliente", en: "Beard Trim & Hot Towel" },
      desc: { es: "Perfilado con navaja, toalla caliente y aceites hidratantes.",
              en: "Razor line-up, hot towel and moisturizing oils." } },
    { id: "vip", price: 45, minutes: 60, featured: true,
      name: { es: "Combo Chacabana VIP", en: "Chacabana VIP Combo" },
      desc: { es: "Corte + Barba + Mascarilla facial. La experiencia completa.",
              en: "Haircut + Beard + Facial mask. The full experience." } },
    { id: "kids", price: 20, minutes: 25,
      name: { es: "Corte de Niños", en: "Kids Cut" },
      desc: { es: "Paciencia y estilo para los más pequeños de la casa.",
              en: "Patience and style for the little ones at home." } }
  ],

  /* ---------- Barberos (opcional) ---------- */
  barbers: ["Barbero 1", "Barbero 2"],

  /* ---------- Reseñas de Google (reemplaza por REALES) ---------- */
  rating: { value: 4.9, count: 120 },
  reviews: [
    { author: "Alexis R.", rating: 5, date: "Hace 2 semanas",
      text: { es: "El mejor fade que me han hecho en San Antonio. Súper atentos.",
              en: "The best fade I've had in San Antonio. Super attentive." } },
    { author: "Marcus T.", rating: 5, date: "Hace 1 mes",
      text: { es: "Ambiente bien chido y cortes precisos. Ya es mi barbería fija.",
              en: "Great vibe and precise cuts. This is my go-to barbershop now." } },
    { author: "Daniela G.", rating: 5, date: "Hace 1 mes",
      text: { es: "Llevé a mi hijo y quedó encantado. Muy buena atención.",
              en: "I took my son and he loved it. Excellent service." } }
  ],

  /* CTA de reseña: mensaje que se envía al cliente tras el corte (idea de automatización) */
  reviewRequestMessage: {
    es: "¡Gracias por tu visita a Chacabana! 💈 ¿Nos regalas una reseña en Google? Nos ayuda muchísimo: ",
    en: "Thanks for visiting Chacabana! 💈 Would you leave us a Google review? It helps us a lot: "
  }
};
