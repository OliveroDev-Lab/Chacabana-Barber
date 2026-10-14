/* ==========================================================================
   Chacabana Barber Shop — app.js
   Bilingüe (ES/EN) · Config-driven · Agenda WhatsApp · Abierto/Cerrado · Reseñas
   Vanilla JS, sin dependencias.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var WA = cfg.whatsapp || "12100000000";
  var TZ = cfg.timezone || "America/Chicago";

  /* ===================== TRADUCCIONES (interfaz) ===================== */
  var translations = {
    es: {
      "skip": "Saltar al contenido",
      "nav.branches": "Sucursales", "nav.services": "Servicios", "nav.gallery": "Galería", "nav.book": "Agendar Cita",
      "hero.eyebrow": "★ BARBERÍA LATINA · SAN ANTONIO, TX",
      "hero.title": "El mejor corte y estilo fresco en San Antonio, TX",
      "hero.subtitle": "Precisión, sabor latino y comodidad. Tu fade, tu barba y tu estilo en manos expertas — llega como quieras, sal como leyenda.",
      "hero.cta.book": "Agendar Cita por WhatsApp", "hero.cta.locations": "Ver Ubicaciones",
      "hero.stat.rating": "Calificación Google", "hero.stat.branches": "Sucursales", "hero.stat.clients": "Cortes realizados",
      "branches.kicker": "NUESTRAS SUCURSALES", "branches.title": "Elige tu sucursal en San Antonio",
      "branches.lead": "Dos ubicaciones, el mismo estilo inconfundible. Toca una tarjeta para agendar.",
      "branch.badge1": "SUCURSAL 1", "branch.badge2": "SUCURSAL 2",
      "branch.directions": "Cómo llegar (Google Maps)", "branch.book": "Agendar en esta Sucursal",
      "hours.weekdays": "Lun – Sáb", "hours.sunday": "Domingo",
      "services.kicker": "MENÚ & PRECIOS", "services.title": "Servicios que te dejan listo",
      "services.lead": "Precios claros, tiempos estimados y resultados que hablan solos.",
      "svc.featured": "MÁS PEDIDO",
      "gallery.kicker": "GALERÍA", "gallery.title": "Nuestro trabajo habla por sí solo",
      "gallery.lead": "Cortes, barbas y transformaciones reales hechas en el sillón de Chacabana.",
      "gallery.cap1": "Skin Fade", "gallery.cap2": "Diseño de Barba", "gallery.cap3": "Burst Fade",
      "gallery.cap4": "Combo VIP", "gallery.cap5": "Corte de Niños", "gallery.cap6": "Toalla Caliente",
      "gallery.follow": "Síguenos en Instagram",
      "lb.close": "Cerrar", "lb.prev": "Anterior", "lb.next": "Siguiente",
      "reviews.kicker": "RESEÑAS DE GOOGLE", "reviews.title": "Lo que dicen nuestros clientes",
      "reviews.based": "reseñas en Google", "reviews.seeAll": "Ver todas las reseñas en Google",
      "status.open": "Abierto ahora", "status.closed": "Cerrado", "status.closesAt": "Cierra {t}", "status.opensAt": "Abre {t}",
      "book.title": "¿Listo para tu próximo corte?",
      "book.lead": "Completa tus datos y confirma tu cita directo por WhatsApp. Rápido, fácil y sin esperas.",
      "book.point1": "✅ Confirmación inmediata", "book.point2": "✅ Elige tu sucursal y barbero", "book.point3": "✅ Sin llamadas ni apps complicadas",
      "book.cta": "Agendar Cita por WhatsApp",
      "footer.tagline": "El mejor corte y estilo fresco en San Antonio, TX. Precisión, sabor latino y comodidad.",
      "footer.reviews": "Basado en reseñas de Google",
      "footer.quote": "“El mejor fade que me han hecho en San Antonio. Súper atentos y el lugar bien chido.” — Cliente verificado",
      "footer.branches": "Sucursales", "footer.rights": "Todos los derechos reservados.",
      "footer.credit": "Desarrollado con 💈 para San Antonio, TX.",
      "fab.book": "Agendar",
      "form.title": "Agenda tu cita", "form.sub": "Completa los datos y te llevamos a WhatsApp con tu mensaje listo.",
      "form.name": "Nombre del Cliente", "form.name.ph": "Tu nombre",
      "form.branch": "Sucursal", "form.service": "Servicio",
      "form.barber": "Barbero de preferencia", "form.optional": "(opcional)", "form.barber.any": "Cualquiera disponible",
      "form.date": "Fecha deseada", "form.time": "Hora aproximada",
      "form.notes": "Notas / Comentarios", "form.notes.ph": "Ej. referencia de diseño, alergias, etc.",
      "form.submit": "Confirmar y Enviar a WhatsApp", "form.hint": "Se abrirá WhatsApp con tu mensaje listo para enviar.",
      "form.required": "Por favor completa los campos obligatorios.",
      "wa.header": "¡Hola Chacabana Barber Shop! 👋 Deseo agendar una cita:",
      "wa.branch": "📍 *Sucursal:*", "wa.name": "👤 *Nombre:*", "wa.service": "✂️ *Servicio:*",
      "wa.date": "📅 *Fecha:*", "wa.time": "🕐 *Hora:*", "wa.barber": "💈 *Barbero:*", "wa.notes": "📝 *Notas:*",
      "wa.footer": "¡Gracias! 🙌"
    },
    en: {
      "skip": "Skip to content",
      "nav.branches": "Locations", "nav.services": "Services", "nav.gallery": "Gallery", "nav.book": "Book Now",
      "hero.eyebrow": "★ LATINO BARBERSHOP · SAN ANTONIO, TX",
      "hero.title": "San Antonio's Premier Barber Experience",
      "hero.subtitle": "Precision, Latino flavor and comfort. Your fade, your beard and your style in expert hands — walk in however, walk out a legend.",
      "hero.cta.book": "Book Appointment on WhatsApp", "hero.cta.locations": "View Locations",
      "hero.stat.rating": "Google Rating", "hero.stat.branches": "Locations", "hero.stat.clients": "Haircuts done",
      "branches.kicker": "OUR LOCATIONS", "branches.title": "Choose your San Antonio location",
      "branches.lead": "Two locations, the same unmistakable style. Tap a card to book.",
      "branch.badge1": "LOCATION 1", "branch.badge2": "LOCATION 2",
      "branch.directions": "Get Directions (Google Maps)", "branch.book": "Book at this Location",
      "hours.weekdays": "Mon – Sat", "hours.sunday": "Sunday",
      "services.kicker": "MENU & PRICES", "services.title": "Services that get you sharp",
      "services.lead": "Clear prices, estimated times and results that speak for themselves.",
      "svc.featured": "MOST POPULAR",
      "gallery.kicker": "GALLERY", "gallery.title": "Our work speaks for itself",
      "gallery.lead": "Real cuts, beards and transformations made in the Chacabana chair.",
      "gallery.cap1": "Skin Fade", "gallery.cap2": "Beard Design", "gallery.cap3": "Burst Fade",
      "gallery.cap4": "VIP Combo", "gallery.cap5": "Kids Cut", "gallery.cap6": "Hot Towel",
      "gallery.follow": "Follow us on Instagram",
      "lb.close": "Close", "lb.prev": "Previous", "lb.next": "Next",
      "reviews.kicker": "GOOGLE REVIEWS", "reviews.title": "What our clients say",
      "reviews.based": "Google reviews", "reviews.seeAll": "See all reviews on Google",
      "status.open": "Open now", "status.closed": "Closed", "status.closesAt": "Closes {t}", "status.opensAt": "Opens {t}",
      "book.title": "Ready for your next cut?",
      "book.lead": "Fill in your details and confirm your appointment straight through WhatsApp. Fast, easy and no waiting.",
      "book.point1": "✅ Instant confirmation", "book.point2": "✅ Choose your location and barber", "book.point3": "✅ No calls or complicated apps",
      "book.cta": "Book Appointment on WhatsApp",
      "footer.tagline": "San Antonio's premier barber experience. Precision, Latino flavor and comfort.",
      "footer.reviews": "Based on Google reviews",
      "footer.quote": "“The best fade I've had in San Antonio. Super attentive and the vibe is amazing.” — Verified client",
      "footer.branches": "Locations", "footer.rights": "All rights reserved.",
      "footer.credit": "Built with 💈 for San Antonio, TX.",
      "fab.book": "Book",
      "form.title": "Book your appointment", "form.sub": "Fill in your details and we'll take you to WhatsApp with your message ready.",
      "form.name": "Client Name", "form.name.ph": "Your name",
      "form.branch": "Location", "form.service": "Service",
      "form.barber": "Preferred barber", "form.optional": "(optional)", "form.barber.any": "Anyone available",
      "form.date": "Preferred date", "form.time": "Approximate time",
      "form.notes": "Notes / Comments", "form.notes.ph": "E.g. style reference, allergies, etc.",
      "form.submit": "Confirm & Send to WhatsApp", "form.hint": "WhatsApp will open with your message ready to send.",
      "form.required": "Please fill in the required fields.",
      "wa.header": "Hi Chacabana Barber Shop! 👋 I'd like to book an appointment:",
      "wa.branch": "📍 *Location:*", "wa.name": "👤 *Name:*", "wa.service": "✂️ *Service:*",
      "wa.date": "📅 *Date:*", "wa.time": "🕐 *Time:*", "wa.barber": "💈 *Barber:*", "wa.notes": "📝 *Notes:*",
      "wa.footer": "Thanks! 🙌"
    }
  };

  var currentLang = "es";
  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
  }

  /* ===================== HELPERS ===================== */
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function fmt12(hhmm) {
    var p = hhmm.split(":"), h = +p[0], m = p[1];
    var ap = h >= 12 ? "PM" : "AM", hh = h % 12; if (hh === 0) hh = 12;
    return hh + ":" + m + " " + ap;
  }
  function nowInTZ() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var days = { Sun: "sun", Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat" };
    var h = parseInt(o.hour, 10); if (h === 24) h = 0;
    return { day: days[o.weekday], minutes: h * 60 + parseInt(o.minute, 10) };
  }

  /* ===================== CONFIG → DOM (estático) ===================== */
  function branchById(id) {
    return (cfg.branches || []).filter(function (b) { return b.id === id; })[0];
  }

  function applyConfig() {
    // Enlaces de mapas e Instagram / Google
    document.querySelectorAll("[data-maps-link]").forEach(function (a) {
      var b = branchById(a.getAttribute("data-maps-link"));
      if (b && b.maps) a.href = b.maps;
    });
    document.querySelectorAll("[data-map]").forEach(function (f) {
      var b = branchById(f.getAttribute("data-map"));
      if (b) f.src = "https://www.google.com/maps?q=" + encodeURIComponent(b.mapQuery || b.address) + "&output=embed";
    });
    var ig = document.querySelector("[data-instagram]");
    if (ig && cfg.instagram) ig.href = cfg.instagram;
    var gr = document.querySelector("[data-google-reviews]");
    if (gr && cfg.googleReviewsUrl) gr.href = cfg.googleReviewsUrl;

    // Rating
    if (cfg.rating) {
      document.querySelectorAll("[data-rating-value]").forEach(function (el) { el.textContent = cfg.rating.value.toFixed(1); });
      document.querySelectorAll("[data-rating-count]").forEach(function (el) { el.textContent = cfg.rating.count; });
    }

    // Sucursales en el <select> del formulario
    var branchSelect = document.getElementById("f-branch");
    if (branchSelect && cfg.branches) {
      branchSelect.innerHTML = "";
      cfg.branches.forEach(function (b) {
        var o = document.createElement("option");
        o.value = b.name; o.textContent = b.name;
        branchSelect.appendChild(o);
      });
    }

    // Crédito del desarrollador
    var credit = document.querySelector(".footer-credit");
    if (credit && cfg.developerCredit) credit.setAttribute("data-i18n", "footer.credit");

    buildStructuredData();
    if (cfg.cloudflareAnalyticsToken) injectAnalytics(cfg.cloudflareAnalyticsToken);
  }

  function buildStructuredData() {
    var el = document.getElementById("ldLocal");
    if (!el || !cfg.branches) return;
    var dayMap = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
    function hoursSpec(hours) {
      return Object.keys(hours).map(function (d) {
        var r = hours[d]; if (!r) return null;
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayMap[d], opens: r[0], closes: r[1]
        };
      }).filter(Boolean);
    }
    var main = cfg.branches[0];
    var ld = {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: cfg.businessName,
      image: location.origin + "/icons/icon-512.png",
      url: location.origin,
      priceRange: "$$",
      aggregateRating: cfg.rating ? {
        "@type": "AggregateRating", ratingValue: String(cfg.rating.value), reviewCount: String(cfg.rating.count)
      } : undefined,
      address: {
        "@type": "PostalAddress", streetAddress: main.address.split(",")[0],
        addressLocality: "San Antonio", addressRegion: "TX", addressCountry: "US"
      },
      department: cfg.branches.map(function (b) {
        return {
          "@type": "HairSalon", name: cfg.businessName + " - " + b.name,
          telephone: b.phone || undefined,
          address: { "@type": "PostalAddress", streetAddress: b.address.split(",")[0], addressLocality: "San Antonio", addressRegion: "TX", addressCountry: "US" },
          openingHoursSpecification: hoursSpec(b.hours)
        };
      })
    };
    el.textContent = JSON.stringify(ld);
  }

  function injectAnalytics(token) {
    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: token }));
    document.head.appendChild(s);
  }

  /* ===================== ESTADO ABIERTO / CERRADO ===================== */
  function statusFor(b) {
    var n = nowInTZ();
    var r = b.hours && b.hours[n.day];
    if (r) {
      var om = toMin(r[0]), cm = toMin(r[1]);
      if (n.minutes >= om && n.minutes < cm) return { open: true, detail: t("status.closesAt").replace("{t}", fmt12(r[1])) };
      if (n.minutes < om) return { open: false, detail: t("status.opensAt").replace("{t}", fmt12(r[0])) };
    }
    // cerrado hoy → busca siguiente día con horario
    var order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var idx = order.indexOf(n.day);
    for (var i = 1; i <= 7; i++) {
      var d = order[(idx + i) % 7], rr = b.hours && b.hours[d];
      if (rr) return { open: false, detail: t("status.opensAt").replace("{t}", fmt12(rr[0])) };
    }
    return { open: false, detail: "" };
  }

  function renderStatuses() {
    document.querySelectorAll("[data-status]").forEach(function (el) {
      var b = branchById(el.getAttribute("data-status"));
      if (!b) return;
      var s = statusFor(b);
      el.className = "branch-status " + (s.open ? "is-open" : "is-closed");
      el.innerHTML = '<span class="dot"></span>' + (s.open ? t("status.open") : t("status.closed")) +
        (s.detail ? ' <small>· ' + s.detail + "</small>" : "");
    });
  }

  /* ===================== SERVICIOS (desde config) ===================== */
  function renderServices() {
    var grid = document.querySelector(".services-grid");
    if (!grid || !cfg.services) return;
    grid.innerHTML = "";
    cfg.services.forEach(function (s) {
      var card = document.createElement("article");
      card.className = "service-card" + (s.featured ? " service-card--featured" : "");
      var tag = s.featured ? '<span class="service-tag">' + t("svc.featured") + "</span>" : "";
      card.innerHTML =
        tag +
        '<div class="service-head"><h3></h3><span class="service-price">$' + s.price + "</span></div>" +
        '<p class="service-desc"></p>' +
        '<span class="service-time">⏱ ' + s.minutes + " min</span>";
      card.querySelector("h3").textContent = s.name[currentLang];
      card.querySelector(".service-desc").textContent = s.desc[currentLang];
      grid.appendChild(card);
    });
  }

  /* ===================== RESEÑAS (desde config) ===================== */
  function renderReviews() {
    var grid = document.getElementById("reviewsGrid");
    if (!grid || !cfg.reviews) return;
    grid.innerHTML = "";
    cfg.reviews.forEach(function (r) {
      var card = document.createElement("article");
      card.className = "review-card";
      var stars = "★★★★★".slice(0, r.rating) + "☆☆☆☆☆".slice(0, 5 - r.rating);
      card.innerHTML =
        '<div class="review-top">' +
          '<span class="review-avatar">' + (r.author || "?").charAt(0) + "</span>" +
          "<div><strong></strong><small></small></div>" +
          '<span class="review-stars" aria-label="' + r.rating + '/5">' + stars + "</span>" +
        "</div>" +
        '<p class="review-text"></p>' +
        '<span class="review-source">Google</span>';
      card.querySelector("strong").textContent = r.author;
      card.querySelector("small").textContent = r.date;
      card.querySelector(".review-text").textContent = r.text[currentLang];
      grid.appendChild(card);
    });
  }

  /* ===================== BARBEROS (desde config) ===================== */
  function renderBarbers() {
    var sel = document.getElementById("f-barber");
    if (!sel) return;
    var prev = sel.value;
    sel.innerHTML = "";
    var any = document.createElement("option");
    any.value = t("form.barber.any"); any.textContent = t("form.barber.any");
    sel.appendChild(any);
    (cfg.barbers || []).forEach(function (b) {
      var o = document.createElement("option"); o.value = b; o.textContent = b; sel.appendChild(o);
    });
    if (prev) sel.value = prev;
  }

  /* ===================== SERVICIOS EN FORM ===================== */
  function renderServiceOptions() {
    var sel = document.getElementById("f-service");
    if (!sel || !cfg.services) return;
    var prev = sel.value;
    sel.innerHTML = "";
    cfg.services.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.name[currentLang];
      o.textContent = s.name[currentLang];
      sel.appendChild(o);
    });
    if (prev) sel.value = prev;
  }

  /* ===================== NAVEGACIÓN ===================== */
  var menuBtn = document.getElementById("menuBtn");
  var mainNav = document.getElementById("mainNav");

  function closeMenu() {
    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  var navStyle = document.createElement("style");
  navStyle.textContent =
    "@media (max-width:899px){.main-nav{position:fixed;inset:68px 0 auto 0;flex-direction:column;gap:0;" +
    "background:rgba(8,19,36,.98);backdrop-filter:blur(14px);border-bottom:1px solid rgba(111,155,255,.28);" +
    "padding:8px 20px 20px;max-height:0;overflow:hidden;opacity:0;transition:max-height .35s ease,opacity .25s ease;display:flex;}" +
    ".main-nav.open{max-height:420px;opacity:1}" +
    ".main-nav a{padding:15px 4px;border-bottom:1px solid rgba(255,255,255,.06);text-align:center}" +
    ".main-nav .nav-cta{margin-top:14px;border-bottom:0}}";
  document.head.appendChild(navStyle);

  /* ===================== IDIOMA ===================== */
  var langButtons = document.querySelectorAll("[data-lang-btn]");

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    langButtons.forEach(function (b) {
      var active = b.getAttribute("data-lang-btn") === lang;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });

    // Meta / título
    if (lang === "en") {
      document.title = "Chacabana Barber Shop | Barbershop in San Antonio, TX";
    } else {
      document.title = "Chacabana Barber Shop | Barbería en San Antonio, TX";
    }

    renderServices();
    renderReviews();
    renderServiceOptions();
    renderBarbers();
    renderStatuses();
    try { localStorage.setItem("chacabana-lang", lang); } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang-btn")); });
  });

  /* ===================== MODAL ===================== */
  var modal = document.getElementById("bookingModal");
  var modalClose = document.getElementById("modalClose");
  var form = document.getElementById("bookingForm");
  var branchSelect = document.getElementById("f-branch");
  var serviceSelect = document.getElementById("f-service");
  var dateInput = document.getElementById("f-date");
  var formHint = document.querySelector(".form-hint");
  var lastFocused = null;

  dateInput.min = new Date().toISOString().split("T")[0];

  function openModal(branch) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (branch) {
      var opt = Array.prototype.slice.call(branchSelect.options).filter(function (o) { return o.value === branch; })[0];
      if (!opt) {
        var nb = branchById(branch);
        if (nb) { var o = document.createElement("option"); o.value = nb.name; o.textContent = nb.name; branchSelect.appendChild(o); }
      }
      branchSelect.value = branch;
    }
    setTimeout(function () { document.getElementById("f-name").focus(); }, 60);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-booking-trigger]").forEach(function (el) {
    el.addEventListener("click", function () {
      closeMenu();
      openModal(el.getAttribute("data-branch"));
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ===================== ENVÍO A WHATSAPP ===================== */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fields = [
      document.getElementById("f-name"), branchSelect, serviceSelect, dateInput, document.getElementById("f-time")
    ];
    var valid = true;
    fields.forEach(function (f) {
      var wrap = f.closest(".field");
      var bad = !f.value.trim();
      wrap.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });
    if (!valid) {
      formHint.textContent = t("form.required");
      formHint.style.color = "#ff4d5e";
      return;
    }

    var name = document.getElementById("f-name").value.trim();
    var branch = branchSelect.value;
    var service = serviceSelect.value;
    var barber = document.getElementById("f-barber").value;
    var date = dateInput.value;
    var time = document.getElementById("f-time").value;
    var notes = document.getElementById("f-notes").value.trim();

    var lines = [t("wa.header"), "", t("wa.branch") + " " + branch, t("wa.name") + " " + name, t("wa.service") + " " + service];
    if (date) lines.push(t("wa.date") + " " + date);
    if (time) lines.push(t("wa.time") + " " + time);
    if (barber) lines.push(t("wa.barber") + " " + barber);
    if (notes) lines.push(t("wa.notes") + " " + notes);
    lines.push("", t("wa.footer"));

    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    closeModal();
  });

  /* ===================== GALERÍA INTERACTIVA + LIGHTBOX ===================== */
  var galleryItems = [];
  var lbIndex = 0;
  var lightbox = null;
  var tsx = 0, tsy = 0;

  function buildLightbox() {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.id = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button type="button" class="lb-close" aria-label="' + t("lb.close") + '">✕</button>' +
      '<div class="lb-stage">' +
        '<button type="button" class="lb-nav lb-prev" aria-label="' + t("lb.prev") + '">‹</button>' +
        '<img class="lb-img" alt="">' +
        '<button type="button" class="lb-nav lb-next" aria-label="' + t("lb.next") + '">›</button>' +
      '</div>' +
      '<span class="lb-counter"></span>';
    document.body.appendChild(lb);

    lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); lbNext(); });
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); lbPrev(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    lb.addEventListener("touchstart", function (e) {
      tsx = e.touches[0].clientX; tsy = e.touches[0].clientY;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - tsx;
      var dy = e.changedTouches[0].clientY - tsy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? lbNext() : lbPrev(); }
    }, { passive: true });
    return lb;
  }

  function preload(i) {
    var it = galleryItems[(i + galleryItems.length) % galleryItems.length];
    if (it) { var im = new Image(); im.src = it.full; }
  }
  function updateLightbox() {
    var it = galleryItems[lbIndex];
    if (!it) return;
    var im = lightbox.querySelector(".lb-img");
    im.style.opacity = "0";
    im.onload = function () { im.style.opacity = "1"; };
    im.style.opacity = "0";
    im.src = it.full;
    im.alt = it.alt || "";
    lightbox.querySelector(".lb-counter").textContent = (lbIndex + 1) + " / " + galleryItems.length;
    preload(lbIndex + 1); preload(lbIndex - 1);
  }
  function openLightbox(i) {
    if (!lightbox) lightbox = buildLightbox();
    lbIndex = ((i % galleryItems.length) + galleryItems.length) % galleryItems.length;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (lightbox) lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  function lbNext() { lbIndex = (lbIndex + 1) % galleryItems.length; updateLightbox(); }
  function lbPrev() { lbIndex = (lbIndex - 1 + galleryItems.length) % galleryItems.length; updateLightbox(); }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") lbNext();
    else if (e.key === "ArrowLeft") lbPrev();
  });

  function renderGallery(items) {
    var grid = document.getElementById("galleryGrid");
    if (!grid || !items || !items.length) return;
    galleryItems = items;
    grid.innerHTML = "";
    items.forEach(function (it, idx) {
      var fig = document.createElement("figure");
      fig.className = "g-item";
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", (it.alt || "Foto") + " " + (idx + 1) + " de " + items.length);
      var img = document.createElement("img");
      img.src = it.thumb;
      img.alt = it.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      if (it.width && it.height) { img.width = it.width; img.height = it.height; }
      img.addEventListener("error", function () { fig.remove(); });
      fig.appendChild(img);
      fig.addEventListener("click", function () { openLightbox(idx); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(idx); }
      });
      grid.appendChild(fig);
    });
  }

  function loadGallery() {
    if (!window.fetch) return;
    fetch("gallery.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (items) { if (Array.isArray(items) && items.length) renderGallery(items); })
      .catch(function () { /* se mantiene el fallback estático */ });
  }

  /* ===================== INIT ===================== */
  document.getElementById("year").textContent = new Date().getFullYear();
  applyConfig();

  var savedLang = null;
  try { savedLang = localStorage.getItem("chacabana-lang"); } catch (e) {}
  if (!savedLang) savedLang = (navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es";
  applyLang(savedLang);
  loadGallery();

  setInterval(renderStatuses, 60000);
})();
