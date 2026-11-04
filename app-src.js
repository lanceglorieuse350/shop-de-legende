document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.');
    return;
  }
  try {
    LeCart.init({
      lecartApiKey: 'lecart_0-Bbby0TVjcRqMSvtHx0iZ-ELLmhAKUTFyJFYkIGwlY',
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9IHDIDELHXsO4A5R2ppIQKlBEpev5Q4XX6qRjrTpVHRzcVgaKdykQEm8kVDLKkBXcdPIu33UV008Oeu1wN7',
      currency: 'EUR',
      language: 'fr',
      theme: 'dark',
      collectShippingAddress: true,
      collectPhoneNumber: true
    });
  } catch(e) {
    console.error('[LeCart] Erreur :', e);
  }
});

(function(){
  "use strict";
  function majCompteur() {
    var badge = document.getElementById("panierCount");
    if (!badge) return;
    var count = 0;
    try {
      var cart = JSON.parse(localStorage.getItem("lecart_cart") || "[]");
      if (Array.isArray(cart)) count = cart.length;
      if (count === 0) {
        var cart2 = JSON.parse(localStorage.getItem("lecart-cart") || "[]");
        if (Array.isArray(cart2)) count = cart2.length;
      }
    } catch(e) { count = 0; }
    if (typeof LeCart !== 'undefined' && typeof LeCart.getCart === 'function') {
      try {
        var c = LeCart.getCart();
        if (Array.isArray(c)) count = c.length;
      } catch(e) {}
    }
    if (count > 0) { badge.style.display = "inline-block"; badge.textContent = count; }
    else { badge.style.display = "none"; }
  }
  document.addEventListener("DOMContentLoaded", majCompteur);
  window.addEventListener("lecart:cart-updated", majCompteur);
  window.addEventListener("lecart:updated", majCompteur);
  window.addEventListener("lecart:item-added", majCompteur);
  window.addEventListener("lecart:item-removed", majCompteur);
  window.addEventListener("lecart:quantity-changed", majCompteur);
  window.addEventListener("storage", function(e) { if (e.key && (e.key.includes("lecart") || e.key.includes("cart"))) majCompteur(); });
  setInterval(majCompteur, 1500);
  document.addEventListener("click", function(e){
    var btn = e.target.closest("[data-lecart-add]");
    if (btn) {
      var badge = document.getElementById("panierCount");
      if (badge) {
        badge.classList.remove("bump");
        void badge.offsetWidth;
        badge.classList.add("bump");
        setTimeout(function(){ badge.classList.remove("bump"); }, 500);
      }
      setTimeout(majCompteur, 300);
      setTimeout(majCompteur, 800);
    }
  });
})();

(function(){
  "use strict";
  var FORCER_MAINTENANCE = false;
  function getPage(){ return document.getElementById("maintenance-page"); }
  function getContenu(){
    return [
      document.querySelector(".navbar"),
      document.querySelector(".marquee-bar"),
      document.querySelector(".audio-player"),
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector(".music-widget"),
      document.getElementById("chatbot-toggle"),
      document.getElementById("chatbot-window"),
      document.getElementById("top"),
      document.getElementById("panierFlottant")
    ].filter(Boolean);
  }
  function appliquer(actif){
    var page = getPage(); var els = getContenu(); if (!page) return;
    if (actif) {
      els.forEach(function(el){ if (!el.dataset.maintDisplay) el.dataset.maintDisplay = el.style.display || "__DEFAULT__"; el.style.display = "none"; });
      page.style.display = "flex";
      document.title = "🔧 Maintenance — GUILLET IV";
      document.body.style.overflow = "auto";
    } else {
      els.forEach(function(el){ var saved = el.dataset.maintDisplay; el.style.display = (saved && saved !== "__DEFAULT__") ? saved : ""; delete el.dataset.maintDisplay; });
      page.style.display = "none";
      document.title = "GUILLET IV — L'Ordre de l'Indépendance";
      document.body.style.overflow = "";
      if (typeof window.actualiserBoutonHaut === "function") setTimeout(window.actualiserBoutonHaut, 0);
      var cw = document.getElementById("chatbot-window");
      if (cw && !window.chatOuvert) cw.classList.remove("open");
    }
  }
  document.addEventListener("DOMContentLoaded", function(){ appliquer(FORCER_MAINTENANCE); });
  window.__setMaintenance = appliquer;
})();

(function () {
  var els = document.querySelectorAll('#security-dashboard .reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

window.TRANSLATIONS = {
  en: {
    // === NAV & HEADER ===
    maintenance: "MAINTENANCE",
    maintenance_motto: "The GUILLET IV site is currently under maintenance. We will be back very soon.",
    maintenance_info: "⏳ Work in progress — Thank you for your patience",
    contact_us: "📧 Contact us",
    order_independence: "THE ORDER OF INDEPENDENCE",
    search_product: "Search for a product",
    clear_search: "Clear search",
    matching_products: "Matching products",
    toggle_mode: "Toggle light/dark mode",
    nav_home: "🏠 Home",
    nav_about: "📜 About",
    nav_shop: "🛒 Shop",
    nav_vinted: "👕 Vinted",
    nav_beauty: "💅 Nails & Beauty",
    nav_parrainage: "🤝 Referral",
    nav_cyber: "🛡️ Cybersecurity",
    nav_harassment: "🚨 Harassment",
    nav_contact: "✉️ Contact",
    nav_faq: "❓ FAQ",
    nav_cgv: "📄 Terms",
    nav_privacy: "📄 Privacy",
    nav_legal: "⚖️ Legal & Security",
    
    // === MARQUEE ===
    marquee_welcome: "✨ Welcome to GUILLET IV — The Order of Independence ✨",
    marquee_delivery: "🚚 Fast and secure delivery",
    marquee_payment: "🛡️ 100% secure payment",
    marquee_motto: "👑 Create your path. Defend your autonomy. Build the future.",
    marquee_products: "💎 Products chosen for autonomy and practical life",
    marquee_warranty: "🛡️ 2-year warranty on all our products",
    marquee_music: "🎵 Discover our exclusive music selection",

    // === AUDIO ===
    site_music: "🎵 Site music",
    choose_music: "Choose a music",
    track_genetiquement: "[FR] 🧬 Genetically Modifier",
    track_polygone: "[FR] 🔷 Polygon",
    track_quelques_notes: "[FR] 🎵 A few notes",
    track_bilar_phoenix: "[FR] 🔥 Bilar – Phoenix",
    track_cenza: "[FR] 🕶️ Cenza – Unknown",
    track_confinement: "[FR] 🧪 Bilar – Confinement #2",
    track_dark_blues: "[EN] 🌑 Dark Blues Vol",
    track_iam: "[FR] 🌍 IAM – The end of their world",
    track_issaba: "[FR] ⚡ Issaba – You know",
    track_kery: "[FR] 📜 Kery James – Post-Scriptum",
    track_exit: "[FR] 🧬 L'EXI-T – Venom Zirko / HYPERTHYMESIA",
    track_sakage: "[FR] 🌒 Sakage – Premise",
    track_sks_tsunami_2: "[FR] ⚡ SKS Crew – Tsunami 2",
    track_sks_tsunami: "[FR] 🌊 SKS Crew – Tsunami",
    track_sks: "[FR] 💥 SKS CREW",
    track_mysa_ralliement: "[FR] 🚩 Mysa – The Rally",
    track_rockin_luta: "[FR] ✊ Rockin'Squat – A Luta Continua",
    track_rockin_eternel: "[FR] 📚 Rockin'Squat – Eternal Apprentice",
    track_rcknsqt_verlaine: "[FR] 🖋️ RCKNSQT – VERLAINE",
    track_mysa_autopsy: "[FR] 🩸 Mysa – Autopsy",
    track_fourmiliere: "[FR] 🐜 The Anthill – Smile",
    track_shurikn: "[FR] 🗡️ Shurikn – Samurai",
    track_proser: "[FR] 🔥 Proser – The Rage (Monf x Poups)",
    track_rohff: "[FR] ⚔️ Rohff – Fitna",
    track_mysa_fou: "[FR] 🧠 Mysa – Like a Madman",
    track_mysa_dystopie: "[FR] 🏙️ Mysa – Dystopia19",
    track_mysa_mortel: "[FR] 💀 Mysa – Lethal",
    track_mysa_piqure: "[FR] 💉 Mysa – Booster Shot",
    track_mysa_revolu: "[FR] 🔁 Mysa – Bygone",
    track_millesime: "[FR] 🏛️ Millésime K – Republic",
    track_rockin_aimer: "[FR] ❤️ Rockin'Squat – Love Without Possessing",
    track_rockin_ils: "[FR] 💔 Rockin'Squat – They Don't Want to Love",
    track_rcknsqt_vocab: "[FR] 🔤 RCKNSQT – VOCAB",
    track_miyagi_kosandra: "[RU] 🌌 Miyagi & Andy Panda – Kosandra",
    track_miyagi_capitaine: "[RU] ⚓ Miyagi – Captain",
    track_miyagi_tumani: "[RU] 🎭 Miyagi – Tumani / YO / KADI / Bismarck",

    // === HERO / DOCTRINE ===
    motto: "“Create your path. Defend your autonomy. Build the future.”",
    baseline: "Company · Entrepreneurial independence movement · Vision",
    doctrine_title: "⚔️ The GUILLET IV Doctrine",
    doctrine_desc: "GUILLET IV brings together the power of business, the strength of an identity, and the vision of a movement. Our founding principle: do not wait for your place, but build it through action, discipline, and creation.",
    authority: "🖤 Authority",
    authority_desc: "Black embodies self-control, rigor, and solidity.",
    willpower: "❤️ Willpower",
    willpower_desc: "Red represents energy, courage, and determination.",
    legitimacy: "👑 Legitimacy",
    legitimacy_desc: "Gold symbolizes the value created, requirement, and recognition.",
    vision: "🚀 Vision",
    vision_desc: "Blue opens the way to innovation and the future.",
    authenticity: "🌑 Authenticity",
    authenticity_desc: "Raw truth, real identity, what you are without a mask or compromise.",
    revelation: "✨ Revelation",
    revelation_desc: "The light that reveals what was hidden. Awakening, understanding, clarity.",
    truth: "⚡ Truth",
    truth_desc: "The straight line, the right word, what does not lie and does not tremble.",
    awareness: "🧠 Awareness",
    awareness_desc: "Lucidity, height, the ability to see beyond appearances.",
    power: "🜂 Power",
    power_desc: "The ability to act, impose your direction, transform your environment.",
    discipline: "🜁 Discipline",
    discipline_desc: "Order, structure, consistency that forges success.",
    creation: "🜄 Creation",
    creation_desc: "The art of producing, innovating, building what does not yet exist.",
    ascension: "🜃 Ascension",
    ascension_desc: "The rise, evolution, surpassing oneself and limits.",

    // === SHOP ===
    shop_title: "🛒 GUILLET IV Shop",
    shop_intro: "Products chosen for autonomy, security, outdoor, and practical life.",
    no_products: "No product matches this search.",
    see_more: "See more",
    see_less: "See less",
    full_desc: "Full description",
    details: "Details",
    utility: "Utility",
    how_to_use: "How to use",
    features: "Features",

    // Drone
    drone_title: "KY108 DRONE – THE EYE OF THE FUTURE IS IN YOUR HANDS",
    drone_tagline: "Dominate the sky… or it will dominate you. Be eyes without needing to see.",
    drone_desc: "A drone designed for creators, explorers, and ambitious pilots. Capture the world with surgical precision.",
    drone_full_1: "The KY108 is not just a drone: it is a vision tool, an instrument of mastery, an aerial ally that transforms every flight into a futuristic experience.",
    drone_full_2: "Thanks to its dual HD camera, 90x zoom, omnidirectional obstacle avoidance, and brushless motors, it offers you stability and power that few drones in its category can match.",
    drone_full_3: "Foldable, compact, intelligent: the KY108 is ready to follow you anywhere.",
    drone_detail_1: "Dual HD camera with 90x zoom",
    drone_detail_2: "Omnidirectional obstacle avoidance",
    drone_detail_3: "Powerful and durable brushless motor",
    drone_detail_4: "Remote control with integrated FPV screen",
    drone_detail_5: "Foldable drone, easy to transport",
    drone_util_1: "Film landscapes in high quality",
    drone_util_2: "Create content for TikTok and Instagram",
    drone_util_3: "Monitor an area respecting privacy",
    drone_util_4: "Learn drone piloting",
    drone_util_5: "Take professional aerial photos",
    drone_use_1: "Unfold the drone and check the propellers.",
    drone_use_2: "Turn on the remote control.",
    drone_use_3: "Connect the HD camera.",
    drone_use_4: "Take off in assisted mode.",
    drone_use_5: "Pilot via the integrated FPV screen.",
    drone_use_note: "Remember to respect applicable flight rules and the privacy of people filmed.",
    cart_89: "💳 Add to cart — €89",

    // Projector
    proj_title: "Rotating solar LED projector",
    proj_desc: "Outdoor solar LED projector with PIR sensor and rotating panels.",
    proj_full_1: "Outdoor LED projector powered by solar panel, equipped with a PIR sensor and rotating panels.",
    proj_util_1: "Secure an entrance",
    proj_util_2: "Light up a dark area",
    proj_util_3: "Deter intrusions",
    proj_util_4: "Works without electricity",
    proj_use_1: "Fix the projector on a wall",
    proj_use_2: "Orient the LED panels",
    proj_use_3: "Adjust the PIR sensor",
    proj_use_4: "Let the solar panel charge",
    cart_35: "💳 Add to cart — €35",

    // Winter Pack
    badge_winter: "WINTER PACK",
    pack_title: "Winter Survival Pack – Premium Edition",
    pack_desc: "The ultimate pack to face winter, stay warm, lit, and autonomous.",
    pack_item_1: "🧤 1. Smart Electric Heated Gloves (USB)",
    pack_item_1_desc: "High-performance winter gloves, designed to provide immediate and controlled heat.",
    pack_item_1_b1: "Double-sided heating on the palm",
    pack_item_1_b2: "Three adjustable temperature levels",
    pack_item_1_b3: "Touchscreen design",
    pack_item_1_b4: "USB interface operation, powerbank compatible",
    pack_item_2: "🔦 2. Powerful LED Flashlights – USB Rechargeable (x2)",
    pack_item_2_desc: "Ultra-bright tactical lamp for power outages, night travel, car.",
    pack_item_2_b1: "7 light modes",
    pack_item_2_b2: "USB rechargeable",
    pack_item_2_b3: "Built-in battery",
    pack_item_2_b4: "Weather resistant",
    pack_item_3: "🔋 3. 12,000 mAh Power Bank – USB Heating Special",
    pack_item_3_desc: "High-capacity powerbank compatible with all USB devices and heated clothing.",
    pack_item_3_b1: "12,000 mAh → long-lasting autonomy",
    pack_item_3_b2: "5V 2.4A output",
    pack_item_3_b3: "Compatible with iPhone / Samsung / iPad",
    pack_item_4: "🛏️ 4. Multi-Season Mummy Sleeping Bag (210 × 75 cm)",
    pack_item_4_desc: "Lightweight, compact, and comfortable sleeping bag, ideal for camping and emergency situations.",
    pack_item_4_b1: "Integrated hood",
    pack_item_4_b2: "Robust 170T polyester",
    pack_item_4_b3: "Folds into a duvet / blanket",
    pack_item_4_b4: "Storage bag included",
    cart_9999: "💳 Add to cart — €99.99",

    // Endoscope
    badge_new: "NEW",
    endo_title: "Inspection camera endoscope with screen",
    endo_desc: "1080P inspection endoscope with 4.3-inch integrated screen, 10-meter semi-rigid cable, 2.0 MP camera, adjustable LED lighting, and IP68 waterproof design.",
    endo_full_1: "The essential tool for inspecting hard-to-reach areas: ducts, engines, pipes, conduits, technical installations, or tight spaces.",
    endo_util_1: "Inspection of engines, ducts, and pipes",
    endo_util_2: "Home improvement: plumbing, ventilation, wiring",
    endo_util_3: "Fast mechanical diagnosis",
    endo_util_4: "Visual control in dark areas",
    endo_feat_1: "Full HD 1080P resolution",
    endo_feat_2: "2.0 MP camera with adjustable LED lighting",
    endo_feat_3: "4.3-inch integrated screen",
    endo_feat_4: "10-meter semi-rigid cable",
    endo_feat_5: "IP68 waterproof certification",
    cart_95: "💳 Add to cart — €95",

    // Security Pack
    badge_security: "🛡️ SECURITY PACK",
    pack_secu_title: "Premium Security Pack",
    pack_secu_tagline: "Complete protection. 10-minute installation. Turnkey.",
    pack_secu_promo: "Limited promo",
    pack_secu_desc: "Protect your entire home with an AI camera, a complete alarm, 4 sensors, and a ready-to-use system. Ideal for individuals and small businesses.",
    pack_secu_full_1: "The Premium Security Pack brings together everything you need to secure a house, apartment, business, garage, cellar, or office — without technical skills or complex wiring. Everything is already configured: you install, you connect, it's ready in 10 minutes.",
    pack_secu_contents: "📦 Pack contents (exact)",
    pack_secu_c1: "1 Tiiwee Alarm (siren + remotes)",
    pack_secu_c2: "1 TP-Link Tapo C245D AI Camera (night vision + detection)",
    pack_secu_c3: "4 SONOFF Opening Sensors (doors / windows / garage / balcony)",
    pack_secu_c4: "Installation guide",
    pack_secu_c5: "30-day assistance",
    pack_secu_f1: "Instant smartphone alerts",
    pack_secu_f2: "Smart detection (AI)",
    pack_secu_f3: "Powerful siren",
    pack_secu_f4: "HD night vision",
    pack_secu_f5: "Live monitoring",
    pack_secu_f6: "High-precision sensors",
    pack_secu_secure_for: "Secures",
    pack_secu_s1: "🏠 House",
    pack_secu_s2: "🏢 Apartment",
    pack_secu_s3: "🏪 Business",
    pack_secu_s4: "🚗 Garage",
    pack_secu_s5: "🕳️ Cellar",
    pack_secu_s6: "💼 Office",
    pack_secu_use_1: "Plug in the Tiiwee alarm and the Tapo camera.",
    pack_secu_use_2: "Stick the 4 SONOFF sensors on doors / windows / garage / balcony.",
    pack_secu_use_3: "Connect the devices to the app (Tapo + SONOFF).",
    pack_secu_use_4: "Configure smartphone alerts.",
    pack_secu_use_5: "Test siren and detection. Ready in 10 minutes.",
    pack_secu_warranty_support: "Warranty & Support",
    pack_secu_ws1: "24-month warranty",
    pack_secu_ws2: "30-day customer support",
    pack_secu_ws3: "Installation assistance if needed",
    pack_secu_why: "Why this pack?",
    pack_secu_why_text: "Because it protects your entire home with an AI camera, a complete alarm, 4 sensors, and a ready-to-use system. Turnkey pack — ideal for individuals and small businesses.",
    cart_pack_secu: "💳 Add to cart — €350",

    // === INFO & REVIEWS ===
    guarantees: "🛡️ Guarantees & Services",
    warranty_24: "✔ Warranty: 24 months",
    secure_payment: "✔ Secure payment",
    fast_delivery: "✔ Fast delivery",
    reviews_title: "⭐ Customer Reviews (Vinted)",
    review_zohra: "thank you",
    review_limitless_1: "Glad everything is perfect, GUILLET IV 🔥",
    review_zlatoff: "Everything is ok thank you",
    review_limitless_2: "Gratitude 🤲 thank you",

    // === ABOUT ===
    learn_more: "🏢 Learn more",
    company_movement: "Company · Movement · Independence",
    about_intro: "GUILLET IV is a company and an entrepreneurial independence movement. It defends the idea that everyone can build their own path through work, creation, and autonomy.",
    about_service: "I sell on Vinted (profile: limitless95) with 5★ reviews, responsive customer service, and a desire to offer serious, well-presented products with a real shop experience.",
    about_contact: "For any questions, contact me via the Contact page or directly on Vinted.",
    contact_me: "✉️ Contact me",
    view_my_vinted: "👕 View my Vinted",
    back_home: "⬅ Back to home",
    brand_king: "👑 GUILLET IV",
    back_shop: "⬅ Back to shop",

    // === SPONSORSHIP ===
    parrainage_title: "🤝 Referral",
    parrainage_sub: "Boursorama · Starlink · Vinted · Crédit Agricole · Octopus Energy",
    parrainage_intro: "Open an account, subscribe to a service, or sign up on Vinted with my referral links. Information is pre-filled automatically, and you enjoy the benefits!",
    parrainage_boursorama_title: "🏦 Boursorama Referral",
    parrainage_boursorama_text: "Open your Boursorama account with my referral link: my information will be filled in automatically, you have nothing to re-enter. And you enjoy welcome bonuses!",
    boursorama_b1: "Welcome bonus offered upon opening",
    boursorama_b2: "Zero account maintenance fees",
    boursorama_b3: "100% online registration, in a few minutes",
    parrainage_btn_boursorama: "🏦 Open my Boursorama account",
    parrainage_starlink_title: "🛰️ Starlink Referral",
    parrainage_starlink_text: "Subscribe to Starlink with my referral link and enjoy a free month on your subscription. High-speed internet via satellite, everywhere, even in isolated areas.",
    starlink_b1: "One free month on your subscription",
    starlink_b2: "High-speed internet everywhere, even in isolated areas",
    starlink_b3: "Simple and fast installation",
    parrainage_btn_starlink: "🛰️ Subscribe to Starlink",
    parrainage_vinted_title: "👕 Vinted Referral",
    parrainage_vinted_text: "Sign up on Vinted with my invitation link and join the community. Buy, sell, and give a second life to your clothes while enjoying welcome benefits.",
    vinted_b1: "Welcome benefit for your first order",
    vinted_b2: "Sell your clothes in a few clicks",
    vinted_b3: "Secure delivery and payment",
    parrainage_btn_vinted: "👕 Join Vinted",
    parrainage_credit_agricole_title: "🏛️ Crédit Agricole Referral",
    parrainage_credit_agricole_text: "Do you want to open an account at Crédit Agricole? Use my single-use referral code and click on the link to discover your benefits.",
    credit_agricole_b1: "Welcome benefits upon opening an account",
    credit_agricole_b2: "A local bank, present everywhere in France",
    credit_agricole_b3: "Single-use referral code EGYYLFH",
    parrainage_btn_credit_agricole: "🏛️ Open my Crédit Agricole account",
    parrainage_octopus_title: "🐙 Octopus Energy Referral",
    parrainage_octopus_text: "Join Octopus Energy with my referral link and enjoy a benefit on your electricity bill. Greener, simpler, and cheaper energy.",
    octopus_b1: "Welcome benefit on your electricity bill",
    octopus_b2: "100% renewable energy and fair prices",
    octopus_b3: "Responsive customer service and no commitment",
    parrainage_btn_octopus: "🐙 Join Octopus Energy",
    parrainage_step1_title: "Click on the link",
    parrainage_step1_text: "You are redirected to the official registration page (Boursorama, Starlink, Vinted, Crédit Agricole or Octopus Energy) with my referral code already integrated.",
    parrainage_step2_title: "Your info is pre-filled",
    parrainage_step2_text: "My referral information is automatically filled in. You just need to complete yours.",
    parrainage_step3_title: "Validate your registration",
    parrainage_step3_text: "Finalize your account opening, subscription, or registration in a few minutes and enjoy the benefits.",
    parrainage_step4_title: "Everyone wins",
    parrainage_step4_text: "You receive your welcome benefit, and so do I. A true win-win.",
    parrainage_note_title: "ℹ️ Good to know:",
    parrainage_note_text: "Referral links are official Boursorama, Starlink, Vinted, Crédit Agricole, and Octopus Energy links. Opening a Boursorama account is free and without commitment. Bonuses and benefits are subject to the conditions of each service. The Crédit Agricole code EGYYLFH is single-use.",

    // === VINTED PAGE ===
    my_vinted: "👕 My Vinted",
    vinted_intro: "Find my verified sales, my 5★ ratings, and my products available on Vinted.",
    verified_reviews: "Verified Vinted Reviews",
    vinted_desc: "I am limitless95 on Vinted. I offer serious, well-presented items with responsive customer service.",
    view_vinted_profile: "👕 View my Vinted profile",

    // === BEAUTY PAGE ===
    beauty_title: "💅 Nails & Beauty — SHAYNAILS",
    beauty_sub: "Elegance · Care · In-person in Guignen",
    beauty_intro: "In-person services only in Guignen. Booking by phone or Instagram.",
    beauty_prices_title: "💶 Price list",
    beauty_presentiel_note: "⚠️ Services in-person only in Guignen — no online sales.",
    beauty_gallery_title: "✨ Client achievements",
    beauty_video_title: "🎬 In video",
    video_fallback: "Your browser does not support video playback.",
    beauty_book_title: "📅 Book a service",
    beauty_book_text: "All services take place in-person in Guignen.<br>Booking by phone or Instagram.",
    click_photo_zoom: "💡 Click on a photo to enlarge",

    // === CYBERSECURITY PAGE ===
    cyber_title: "🛡️ Cybersecurity Prevention",
    cyber_subtitle: "Computer attacks in France",
    cyber_intro: "Phishing, data theft, fraudulent access, and identity theft: understanding the risks helps to better protect your accounts, devices, and personal information.",
    cyber_intro_2: "Prevention combines prudent habits, appropriate technical protections, and rapid reaction when an incident occurs.",
    prevention_themes: "📋 Prevention themes",
    cyber_step1: "🔑 Step 1 — Saved passwords",
    cyber_step2: "🎣 Step 2 — Social engineering and phishing",
    cyber_step3: "💻 Step 3 — Attacks against passwords",
    cyber_step4: "🗝️ Step 4 — Photos of keys and physical security",
    cyber_step5: "👤 Step 5 — Personal information",
    cyber_step6: "⚖️ Step 6 — French law and hacking",
    cyber_step7: "📨 Step 7 — Phishing, fraud and identity",
    cyber_step8: "🗂️ Step 8 — Personal data and GDPR",
    cyber_step9: "✅ Step 9 — Authorized security tests",
    cyber_step10: "🚨 Step 10 — What to do in case of an incident?",
    cyber_conclusion: "🏁 General conclusion",
    cyber_s1_title: "🔑 Step 1 — Saved passwords: comfort, protection and vigilance",
    cyber_s1_p1: "Saving your passwords in a text file, an unprotected note, or a shared document exposes your accounts if the file is stolen or the device is compromised.",
    cyber_s2_title: "🎣 Step 2 — Social engineering and phishing: you can be the target",
    cyber_s2_p1: "Phishing is a technique that consists of pretending to be a trusted person or organization in order to obtain information, a payment, or a risky action.",
    cyber_s3_title: "💻 Step 3 — Attacks against passwords",
    cyber_s3_p1: "Attempts to guess or reuse a password take several forms and do not all work the same way.",
    cyber_s4_title: "🗝️ Step 4 — Photos of keys and physical security",
    cyber_s4_p1: "Publishing a detailed photo of a house, garage, or vehicle key can reveal characteristics useful to a malicious person.",
    cyber_s5_title: "👤 Step 5 — Personal information and privacy",
    cyber_s5_p1: "Avoid passwords based on details that are easy to find or guess.",
    cyber_s6_title: "⚖️ Step 6 — French law: fraudulent access, hacking and sanctions",
    cyber_s6_p1: "In France, attacks on automated data processing systems (STAD) are mainly provided for by articles 323-1 et seq. of the Penal Code.",
    cyber_s7_title: "📨 Step 7 — Phishing, fraud and identity theft",
    cyber_s7_p1: "Phishing describes a method, not in itself the final qualification of an offense.",
    cyber_s8_title: "🗂️ Step 8 — Personal data, GDPR and security obligations",
    cyber_s8_p1: "Organizations that process personal data must in particular implement appropriate security measures.",
    cyber_s9_title: "✅ Step 9 — Audit and security test: obtain clear authorization",
    cyber_s9_p1: "An audit, a penetration test, or a vulnerability search must be carried out within an authorized framework.",
    cyber_s10_title: "🚨 Step 10 — What to do if an account or device is compromised?",
    cyber_s10_p1: "From a healthy device, change the password concerned and those that were reused.",
    cyber_conclusion_title: "🏁 General conclusion",
    cyber_conclusion_p1: "Cybercriminals can exploit technical flaws, but also trust, habits, and information shared online.",

    // === LEGAL & SECURITY AUDIT ===
    legal_notice: "⚖️ Legal Notice & Security",
    legal_info: "1. Legal information",
    legal_company: "Company name:",
    legal_status: "Status:",
    legal_address: "Address:",
    legal_hosting: "2. Site hosting",
    legal_ip: "3. Intellectual property",
    legal_ip_p1: "All site content (texts, images, design, logo, structure) is the exclusive property of GUILLET IV.",
    legal_ip_p2: "Any reproduction, distribution, or exploitation without authorization is strictly prohibited.",
    legal_data_title: "4. Personal data",
    legal_data_p1: "The data collected (name, email, address, phone) is used only for order processing and customer support.",
    legal_data_p2: "No personal data is transmitted, sold, shared, or communicated to companies, platforms, third-party services, or state bodies, in France or elsewhere.",
    legal_data_p3: "In accordance with the GDPR, you can request the deletion or modification of your data at any time via: lanceglorieuse@gmail.com.",
    legal_cookies_title: "5. Cookies",
    legal_cookies_p1: "The site may use technical cookies to improve the user experience (cart, display preferences).",
    legal_cookies_p2: "No advertising cookies are used.",
    legal_liability_title: "6. Liability",
    legal_liability_p1: "GUILLET IV cannot be held liable for damages related to the use of the site or products, unless proof of direct fault.",
    legal_disputes_title: "7. Disputes",
    legal_disputes_p1: "In the event of a dispute, an amicable solution will be sought as a priority.",
    legal_disputes_p2: "Failing that, the French courts will be competent.",
    security_audit_title: "🛡️ Technical Security Audit (Nmap & curl)",
    security_audit_subtitle: "🔐 Security of the Shop de Légende site",
    security_audit_p1: "The security of visitors and customers is strictly controlled on Shop de Légende. The site applies advanced, rigorous, and non-bypassable protections to guarantee reliable navigation, secure payments, and total confidentiality.",
    security_audit_p2: "In-depth technical analyses carried out with Nmap and curl confirm that the site presents no flaws, no dangerous elements, no data exposure, and that all detected mechanisms are normal and expected protections.",
    security_audit_p3: "👉 No risk, no threat, no anomaly.",
    security_audit_1_title: "🔒 Secure connection (HTTPS / TLS 1.3)",
    security_audit_1_p1: "The site uses the strictest security standards:",
    security_audit_1_l1: "full data encryption",
    security_audit_1_l2: "protection against interception",
    security_audit_1_l3: "automatic redirection to HTTPS",
    security_audit_1_l4: "TLS 1.3 protocol, international banking standard",
    security_audit_1_footer: "👉 Nmap confirms that port 443 is open, secure, and presents no vulnerability.",
    security_audit_2_title: "🛡️ Advanced protection against attacks (CSP)",
    security_audit_2_p1: "The site's Content Security Policy blocks:",
    security_audit_2_l1: "malicious scripts",
    security_audit_2_l2: "code injections",
    security_audit_2_l3: "unauthorized resources",
    security_audit_2_l4: "hacking attempts",
    security_audit_2_footer: "👉 Nmap's http-headers scan confirms a complete, strict, and locked CSP. No dangerous behavior detected.",
    security_audit_3_title: "🧱 Anti-fraud & Anti-clickjacking",
    security_audit_3_footer: "👉 Active protection, non-bypassable, preventing any attempt at interface hijacking.",
    security_audit_4_title: "🔐 Secure payments with Stripe",
    security_audit_4_p1: "Payments are processed by Stripe, a certified banking solution:",
    security_audit_4_l1: "PCI-DSS compliance",
    security_audit_4_l2: "full encryption",
    security_audit_4_l3: "no retention of banking data",
    security_audit_4_l4: "cards never stored on the site",
    security_audit_4_footer: "👉 Nmap confirms that Stripe endpoints are secure, valid, and without risk.",
    security_audit_5_title: "🧭 Enhanced privacy",
    security_audit_5_p1: "The site applies strict policies:",
    security_audit_5_l1: "Referrer Policy: <code>strict-origin-when-cross-origin</code>",
    security_audit_5_l2: "Permissions Policy: no camera, no microphone, no geolocation",
    security_audit_5_l3: "X-Content-Type-Options: <code>nosniff</code>",
    security_audit_5_l4: "Cross-Origin-Opener-Policy: <code>same-origin</code>",
    security_audit_5_l5: "Cross-Origin-Embedder-Policy: <code>credentialless</code>",
    security_audit_5_l6: "Cross-Origin-Resource-Policy: <code>same-origin</code>",
    security_audit_5_footer: "👉 These protections are active, strict, and have no negative impact for visitors.",
    security_audit_6_title: "🌍 Protection against external sites (CORS)",
    security_audit_6_p1: "The site only allows its own domain:",
    security_audit_6_footer: "👉 No leaks, no unauthorized external access.",
    security_audit_7_title: "🧪 Secure hosting on Vercel",
    security_audit_7_p1: "The site benefits from Vercel protections:",
    security_audit_7_l1: "enhanced security",
    security_audit_7_l2: "automatic updates",
    security_audit_7_l3: "DDoS protection",
    security_audit_7_l4: "reliable global infrastructure",
    security_audit_7_l5: "active anti-bot system",
    security_audit_7_footer: "👉 Nmap detects: X-Vercel-Challenge-Token, X-Vercel-Mitigated: challenge, Vercel Security Checkpoint. These mechanisms are normal, automatic, and never concern human visitors.",
    security_audit_8_title: "🛠️ Continuous monitoring & maintenance",
    security_audit_8_p1: "The site is subject to:",
    security_audit_8_l1: "regular audits",
    security_audit_8_l2: "technical updates",
    security_audit_8_l3: "SSL checks",
    security_audit_8_l4: "anti-attack tests",
    security_audit_8_footer: "👉 Analyses confirm constant, active security, without flaws.",
    security_audit_9_title: "📡 Technical verification (Nmap & curl)",
    security_audit_9_p1: "External analyses show:",
    security_audit_9_l1: "no flaws",
    security_audit_9_l2: "no dangerous methods",
    security_audit_9_l3: "no unnecessary ports",
    security_audit_9_l4: "no information leaks",
    security_audit_9_l5: "no exposed services",
    security_audit_9_l6: "no abnormal behavior",
    security_audit_9_l7: "no risk for visitors",
    security_audit_9_nmap1_title: "✔️ Nmap — http-headers",
    security_audit_9_nmap1_text: "Detected headers: complete CSP, active HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy, X-Content-Type-Options, strict CORS, Vercel protections.",
    security_audit_9_nmap1_footer: "👉 All these elements are protections. No danger.",
    security_audit_9_nmap2_title: "✔️ Nmap — http-methods",
    security_audit_9_nmap2_text: "GET, HEAD, POST, OPTIONS",
    security_audit_9_nmap2_footer: "👉 No dangerous method.",
    security_audit_9_nmap3_title: "✔️ Nmap — http-title",
    security_audit_9_nmap3_text: "Site doesn't have a title (text/plain)",
    security_audit_9_nmap3_footer: "👉 Normal technical response. No impact for visitors.",
    security_audit_9_nmap4_title: "✔️ Nmap — http-security-headers",
    security_audit_9_nmap4_text: "Nmap confirms: HSTS, strict CSP, X-Frame-Options, X-Content-Type-Options, secure Cache-Control.",
    security_audit_9_nmap4_footer: "👉 Security compliant with OWASP standards.",
    security_audit_9_nmap5_title: "✔️ Nmap — http-server-header",
    security_audit_9_nmap5_text: "Server: Vercel",
    security_audit_9_nmap5_footer: "👉 Normal and secure.",
    security_audit_9_nmap6_title: "✔️ Nmap — fingerprint",
    security_audit_9_nmap6_text: "400 Bad Request · 404 Not Found · DEPLOYMENT_NOT_FOUND",
    security_audit_9_nmap6_footer: "👉 Internal Vercel responses to unusual requests. No danger.",
    security_audit_9_nmap7_title: "✔️ Nmap — http-enum",
    security_audit_9_nmap7_text: "443/tcp open https",
    security_audit_9_nmap7_footer: "👉 No sensitive resource, no hidden page, no exposed service.",
    security_audit_9_curl_title: "✔️ Curl result",
    security_audit_9_curl_text: "Curl displays only: protections, security headers, anti-bot mechanisms.",
    security_audit_9_curl_footer: "👉 No anomaly, no flaw, no risk.",
    security_conclusion_title: "🟢 Firm conclusion",
    security_conclusion_p1: "Nmap and curl analyses prove that:",
    security_conclusion_l1: "the site is secure",
    security_conclusion_l2: "protections are active",
    security_conclusion_l3: "no flaw exists",
    security_conclusion_l4: "no dangerous element has been detected",
    security_conclusion_l5: "nothing impacts visitors",
    security_conclusion_l6: "the configuration is professional, strict, and compliant",
    security_conclusion_final: "👉 Shop de Légende is a highly secure, reliable, and protected site.",
    security_engagement_title: "A security commitment",
    security_engagement_p1: "As a <strong>professional pentester</strong>, I master security flaws and attack mechanisms. This site was designed, developed, and audited with the same requirements as a banking environment.",
    security_engagement_p2: "If you are a security researcher, developer, or curious user and you detect an anomaly, flaw, or suspicious behavior, <strong>contact me immediately</strong>:",
    security_engagement_phone: "<strong>Phone:</strong> <a href=\"tel:0780204749\">07.80.20.47.49</a>",
    security_engagement_email: "<strong>Email:</strong> <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a>",
    security_engagement_thanks: "Thank you in advance for your vigilance and your contribution to the security of this site. 🙏",

    // === CGV ===
    terms_sale: "📄 Terms of Sale – GUILLET IV",
    cgv_object: "1. Purpose",
    cgv_object_text1: "These Terms of Sale govern the sales of products offered on the GUILLET IV Shop.",
    cgv_object_text2: "Any order implies full and complete acceptance of these Terms.",
    cgv_products: "2. Products",
    cgv_products_text1: "The products offered are described with the greatest precision.",
    cgv_products_text2: "Photographs are non-contractual.",
    cgv_products_text3: "Availability is indicated on each product sheet.",
    cgv_price: "3. Price",
    cgv_price_text1: "Prices are indicated in euros (€), all taxes included (TTC).",
    cgv_price_text2: "The seller reserves the right to modify prices at any time, but products will be invoiced based on the rate in force at the time of order validation.",
    cgv_order: "4. Order",
    cgv_order_text1: "The customer selects the products they wish to purchase, validates their cart, and proceeds to payment.",
    cgv_order_text2: "An order confirmation is sent by email.",
    cgv_order_text3: "The seller reserves the right to refuse an order in the event of a payment problem or prior dispute.",
    cgv_payment: "5. Payment",
    cgv_payment_text1: "Payment is secure via <a href=\"https://stripe.com/fr\" target=\"_blank\" rel=\"noopener\">Stripe</a> or via the options offered by <a href=\"https://www.vinted.fr\" target=\"_blank\" rel=\"noopener\">Vinted</a>.",
    cgv_payment_text2: "Banking data is never kept by GUILLET IV.",
    cgv_delivery: "6. Delivery",
    cgv_delivery_text1: "Products are shipped quickly according to their availability.",
    cgv_delivery_text2: "Indicative times: 2 to 5 working days.",
    cgv_delivery_text3: "Areas served: Metropolitan France.",
    cgv_delivery_text4: "A tracking number can be provided when available.",
    cgv_delivery_text5: "In case of delay or loss, the customer must contact the seller for assistance.",
    cgv_retractation: "7. Right of withdrawal (14 days)",
    cgv_retractation_text1: "In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">article L221-18 of the Consumer Code</a>, the customer has 14 days to exercise their right of withdrawal, without justification.",
    cgv_retractation_text2: "The product must be returned in its original condition.",
    cgv_retractation_text3: "In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">article L221-23 of the Consumer Code</a>, direct return costs are the responsibility of the customer, except in the case of seller error.",
    cgv_retractation_text4: "In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">article L221-24 of the Consumer Code</a>, the refund is made within a maximum of 14 days from notification of withdrawal, and at the latest after recovery of the product or proof of its shipment.",
    cgv_return: "8. Return and refund",
    cgv_return_text1: "Returns must be sent to the address provided by the seller.",
    cgv_return_text2: "Refunds follow Vinted or Stripe rules depending on the purchase method.",
    cgv_return_text3: "No refund will be made for a product damaged by the customer.",
    cgv_legal_warranties: "9. Legal warranties",
    cgv_legal_warranties_text: "The seller applies the mandatory legal warranties provided by the <a href=\"https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006069565\" target=\"_blank\" rel=\"noopener\">Consumer Code</a> and the <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">Civil Code</a>.",
    cgv_conformity: "10. Legal warranties",
    cgv_conformity_text1: "<strong>Legal warranty of conformity (2 years):</strong> in accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">articles L217-3 et seq. of the Consumer Code</a>, the customer benefits from a warranty covering conformity defects existing at the time of delivery of the good.",
    cgv_conformity_text2: "<strong>Warranty of hidden defects:</strong> in accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">article 1641 of the Civil Code</a>, the seller is required to guarantee hidden defects making the product unfit for its intended use or significantly reducing this use.",
    cgv_conformity_text3: "<strong>Possible commercial warranty:</strong> if GUILLET IV offers a commercial warranty, its conditions, duration, scope, and implementation are specified on the product sheet or the document given with the product.",
    cgv_conformity_exclude_title: "Legal warranties do not cover:",
    cgv_conformity_exclude1: "normal wear and tear;",
    cgv_conformity_exclude2: "damage caused by misuse;",
    cgv_conformity_exclude3: "product modifications.",
    cgv_data: "11. Personal data (GDPR)",
    cgv_data_text1: "The data collected (name, email, address, phone) is used only for order processing and customer support, in accordance with the <a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">GDPR</a>.",
    cgv_data_text2: "No data is sold or shared.",
    cgv_data_text3: "The customer can request access, rectification, portability, or deletion of their data via <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a>.",
    cgv_liability: "12. Liability",
    cgv_liability_text1: "The seller is only liable for direct damages related to a defective product.",
    cgv_liability_text2: "They cannot be held liable for indirect damages (data loss, financial loss, etc.).",
    cgv_service: "13. Customer service",
    cgv_service_text: "For any questions: <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a> — Response within 48 hours.",
    cgv_mediation: "14. Mediation",
    cgv_mediation_text1: "In the event of a dispute, an amicable solution will be sought as a priority.",
    cgv_mediation_text2: "If no agreement is found, the customer can contact a consumer mediator for free via <a href=\"https://www.economie.gouv.fr/mediation-conso\" target=\"_blank\" rel=\"noopener\">economie.gouv.fr/mediation-conso</a>.",
    cgv_law: "15. Applicable law",
    cgv_law_text1: "These Terms are governed by French law.",
    cgv_law_text2: "In the event of a dispute, the French courts will be competent, in compliance with the rules of jurisdiction applicable to consumers.",

    // === PRIVACY ===
    privacy_title: "📄 Privacy Policy (GDPR)",
    privacy_intro: "The protection of your personal data is a priority. This policy explains what data is collected, why, how it is protected, and how to exercise your rights.",
    privacy_s1_title: "1. Data collected",
    privacy_s1_intro: "We collect only the data necessary for the operation of the site and the processing of orders:",
    privacy_s1_l1: "last name, first name",
    privacy_s1_l2: "postal address",
    privacy_s1_l3: "email",
    privacy_s1_l4: "phone number",
    privacy_s1_l5: "order information",
    privacy_s1_l6: "IP address (security and fraud prevention)",
    privacy_s1_note: "No sensitive data is collected.",
    privacy_s2_title: "2. Purposes of processing",
    privacy_s2_intro: "Your data is used to:",
    privacy_s2_l1: "process and ship your orders",
    privacy_s2_l2: "provide customer support",
    privacy_s2_l3: "manage your customer account",
    privacy_s2_l4: "secure the site and prevent fraud",
    privacy_s2_l5: "comply with legal obligations (invoicing)",
    privacy_s3_title: "3. Legal basis",
    privacy_s3_intro: "Processing is based on:",
    privacy_s3_l1: "performance of the contract (order)",
    privacy_s3_l2: "legitimate interest (security, anti-fraud)",
    privacy_s3_l3: "consent (non-essential cookies)",
    privacy_s4_title: "4. Processors",
    privacy_s4_intro: "To ensure the operation of the site, certain providers may process your data:",
    privacy_s4_l1: "Vercel (site hosting)",
    privacy_s4_l2: "Stripe / PayPal (secure payments)",
    privacy_s4_l3: "Email service (order confirmation)",
    privacy_s4_note: "These providers comply with the GDPR or have equivalent guarantees.",
    privacy_s5_title: "5. Retention period",
    privacy_s5_l1: "Data necessary for processing and invoicing orders: 10 years, in accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">article L123-22 of the Commercial Code</a>.",
    privacy_s5_l2: "Inactive customer data: 3 years",
    privacy_s5_l3: "Technical cookies: 13 months",
    privacy_s6_title: "6. Your rights",
    privacy_s6_intro: "In accordance with the GDPR, you have the following rights:",
    privacy_s6_l1: "access to your data",
    privacy_s6_l2: "rectification",
    privacy_s6_l3: "deletion",
    privacy_s6_l4: "objection",
    privacy_s6_l5: "portability",
    privacy_s6_contact: "To exercise your rights: lanceglorieuse@gmail.com",
    privacy_s7_title: "7. Cookies",
    privacy_s7_intro: "The site uses only:",
    privacy_s7_l1: "technical cookies (cart, session, security)",
    privacy_s7_note: "No advertising or marketing tracking cookies are used. An information banner may appear on your first visit.",
    privacy_s8_title: "8. Security",
    privacy_s8_intro: "We apply strict measures to protect your data:",
    privacy_s8_l1: "HTTPS / TLS 1.3 encryption",
    privacy_s8_l2: "anti-bot protections",
    privacy_s8_l3: "advanced security headers (CSP, HSTS, X-Frame-Options, etc.)",
    privacy_s8_l4: "secure Vercel infrastructure",
    privacy_s8_l5: "PCI-DSS certified payments via Stripe",
    privacy_s8_note: "No banking data is stored on the site.",
    privacy_s9_title: "9. Transfers outside the EU",
    privacy_s9_text: "Vercel hosting may involve processing outside the European Union. These transfers are framed by guarantees compliant with the GDPR.",
    privacy_s10_title: "10. Contact",
    privacy_s10_text: "For any questions regarding your personal data:",
    privacy_s11_title: "11. Legal references and complaints",
    privacy_s11_text1: "This policy is established in accordance with the <a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">General Data Protection Regulation (GDPR)</a> and the <a href=\"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031701594\" target=\"_blank\" rel=\"noopener\">Data Protection Act</a>.",
    privacy_s11_text2: "Data necessary for invoicing is kept for 10 years, in accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">article L123-22 of the Commercial Code</a>.",
    privacy_s11_text3: "You can file a complaint with the <a href=\"https://www.cnil.fr/fr/plaintes\" target=\"_blank\" rel=\"noopener\">CNIL</a>.",

    // === FAQ ===
    faq_title: "❓ Frequently Asked Questions",
    faq_delivery: "📦 Delivery",
    faq_ship_time: "What is the shipping time?",
    faq_ship_time_text: "Items are shipped quickly, usually within 24 to 48 hours depending on their availability.",
    faq_delivery_time: "What are the delivery times?",
    faq_delivery_time_text: "Delivery takes an average of 2 to 5 working days after shipping, depending on the carrier and delivery area.",
    faq_zones: "What areas are delivered?",
    faq_zones_text: "Delivery is provided in Metropolitan France, via the options offered by Vinted or the available carriers.",
    faq_tracking: "How to track my package?",
    faq_tracking_text: "A tracking number is provided upon shipment when available. You can track your package directly via the carrier's website or via Vinted.",
    faq_delay_lost: "What to do in case of delay or lost package?",
    faq_delay_lost_text: "Contact GUILLET IV customer service. An investigation will be opened with the carrier.",
    faq_payment: "🔒 Secure payment",
    faq_payment_q: "How does payment work?",
    faq_payment_text: "All transactions are secure and carried out via Vinted or Stripe.",
    faq_bank_protection: "Is my banking data protected?",
    faq_bank_protection_text: "Yes. Your banking data is never stored by GUILLET IV. Processing is entirely managed by secure payment platforms.",
    faq_payment_methods: "What payment methods are accepted?",
    faq_payment_methods_intro: "Depending on the platform:",
    faq_payment_card: "Credit card",
    faq_payment_apple_google: "Apple Pay / Google Pay (Stripe)",
    faq_payment_vinted: "Integrated Vinted payment",
    faq_refund: "🔁 Return & Refund",
    faq_return_q: "Can I return an item?",
    faq_return_text: "Yes. In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">article L221-18 of the Consumer Code</a>, you have 14 days to request a return.",
    faq_how_return: "How to make a return?",
    faq_how_return_text: "Contact the seller to obtain the instructions and return address. The product must be returned in its original condition.",
    faq_return_fees: "Are return costs at my expense?",
    faq_return_fees_text: "In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">article L221-23 of the Consumer Code</a>, return costs are the responsibility of the customer, except in the case of seller error or defective product.",
    faq_refund_q: "How does the refund work?",
    faq_refund_text: "Refunds are processed according to Vinted rules or directly by the seller. In accordance with <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">article L221-24 of the Consumer Code</a>, the refund occurs within a maximum of 14 days from notification of withdrawal, and at the latest after recovery of the product or proof of its shipment.",
    faq_refund_refused_q: "In what cases can a refund be refused?",
    faq_refund_refused_1: "Product damaged by the customer",
    faq_refund_refused_2: "Incomplete product",
    faq_refund_refused_3: "Product used or modified",
    faq_warranty: "🛡️ Warranty",
    faq_warranty_q: "What does the 24-month warranty cover?",
    faq_warranty_text: "The commercial warranty covers manufacturing defects and failures not attributable to the user.",
    faq_legal_warranty_q: "What are the legal warranties?",
    faq_legal_warranty_intro: "All products automatically benefit from:",
    faq_legal_warranty_1: "the <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">2-year legal warranty of conformity</a>,",
    faq_legal_warranty_2: "the <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">warranty of hidden defects</a>.",
    faq_not_covered_q: "What is not covered?",
    faq_not_covered_1: "Normal wear and tear",
    faq_not_covered_2: "Damage caused by misuse",
    faq_not_covered_3: "Shocks, liquids, negligence",
    faq_not_covered_4: "Unauthorized modifications or repairs",
    faq_claim_warranty_q: "How to claim the warranty?",
    faq_claim_warranty_intro: "Contact customer service with:",
    faq_claim_warranty_1: "your order number,",
    faq_claim_warranty_2: "a description of the problem,",
    faq_claim_warranty_3: "photos or videos of the defect.",
    faq_service: "📞 Customer service",
    faq_contact_q: "How to contact GUILLET IV?",
    faq_contact_text: "📧 Email: lanceglorieuse@gmail.com — Response within 48 hours.",

    // === CONTACT ===
    contact_title: "✉️ Contact us",
    contact_intro: "A question? A project? Do not hesitate to write to us.",
    phone: "Phone",
    location: "Location",
    france_ille: "France, Ille-et-Vilaine",
    hours: "Hours",
    your_name: "Your name",
    your_email: "Your email address",
    your_message: "Your message...",
    send_message: "Send message",
    message_prepared: "Your message has been prepared. You can now send it via your email application.",
    footer_location: "📍 Ille-et-Vilaine · 🕒 9am – 8pm",
    footer_payment: "🔒 Secure payment — 🚚 Fast delivery",
    copyright: "© 2026 GUILLET IV — The Order of Independence",
    follow_tiktok: "🎵 Follow us on TikTok",
    back_top: "Back to top",
    open_chat: "Open advice chat",
    advice_chat: "🤖 GUILLET IV Advice",
    ask_question: "Ask me a question...",

    // === PREVENTION HARASSMENT ===
    prevention_harassment: "🛡️ Harassment Prevention",
    harassment_is_crime: "Harassment is a crime. It destroys lives.",
    harassment_intro_2: "Whether physical, psychological, or virtual, French law severely punishes perpetrators.",
    harassment_intro_3: "Here are the penalties incurred, alone or in an organized group.",
    moral_harassment: "💻 Moral harassment",
    school_harassment: "🎓 School harassment",
    sexual_harassment: "🤬 Sexual harassment",
    organized_group: "🚨 In an organized group",
    where_help: "📞 Where to find help?",
    moral_harassment_desc: "Repeated words or behaviors degrading living conditions, causing an alteration of physical or mental health.",
    basic_penalty: "Basic penalty",
    aggravating_simple: "Simple aggravating circumstance",
    two_aggravating: "Two cumulative aggravating circumstances",
    up_to_10_years: "Up to 10 years + €300,000",
    organized_group_desc: "each participant can be prosecuted, even for a single message, if the collective nature of the harassment is established.",
    school_harassment_desc: "Moral harassment committed by a student or staff member against a student of the same establishment.",
    itt_over_8: "ITT > 8 days",
    victim_suicide: "If the victim commits suicide or attempts suicide",
    school_harassment_note: "The facts remain punishable even after the end of schooling.",
    sexual_harassment_desc: "Repeated words or behaviors of a sexual or sexist nature, undermining dignity or creating an intimidating, hostile, or offensive situation.",
    organized_group_law: "🚨 In an organized group: what the law says",
    collective_responsibility: "⚖️ Collective responsibility",
    collective_desc: "Online or group harassment is an aggravating circumstance. Even if you only sent one message, liked or shared harassing content, you can be prosecuted.",
    online_moral_harassment: "Online moral harassment",
    sexual_harassment_multiple: "Sexual harassment by several people",
    multiple_aggravating: "Harassment with several aggravating circumstances",
    law_punishes_each: "The law punishes each participant, not just the leader.",
    dont_stay_alone: "⚠️ Do not stay alone. Speak up.",
    call_3018: "📞 3018 — Free, anonymous number, 7 days a week (9am-11pm)",
    report_17cyber: "🌐 17Cyber.gouv.fr — Online reporting",
    report_17cyber_btn: "🚨 Report on 17Cyber",
    call_3018_btn: "📞 Call 3018",
    prevention_footer_note: "Information from the French Penal Code (Légifrance). Last update: 2026.",

    // === CHATBOT ===
    chat_hello: "👋 Hello and welcome to <strong>GUILLET IV</strong>!",
    chat_prompt: "Ask me a question:",
    chat_unknown: "I'm not sure I understand 🤔",
    chat_menu_title: "Here are all the sections of the site:",
    chat_parrainage_reply: "🤝 Open a Boursorama account, subscribe to Starlink, sign up on Vinted, at Crédit Agricole or Octopus Energy with my referral links: info is pre-filled automatically!",
    chat_contact_reply: "📞 We are available from 9am to 8pm at <strong>07.80.20.47.49</strong>.",
    chat_delivery_reply: "🚚 Delivery is <strong>fast and secure</strong>.",
    chat_drone_reply: "🎥 The <strong>Drone KY108</strong> (€89).",
    chat_proj_reply: "💡 The <strong>Solar LED Projector</strong> (€35).",
    chat_endo_reply: "🔍 The <strong>Endoscope</strong> (€95).",
    chat_beauty_reply: "💅 The <strong>Nails & Beauty</strong> section.",
    chat_price_reply: "💰 Drone: €89 • Projector: €35 • Winter Pack: €99.99 • Endoscope: €95 • Premium Security Pack: €350",
    chat_thanks_reply: "You're welcome! 🙏",
    chat_btn_home: "🏠 Home",
    chat_btn_shop: "🛒 Shop",
    chat_btn_vinted: "👕 Vinted",
    chat_btn_beauty: "💅 Nails & Beauty",
    chat_btn_parrainage: "🤝 Referral",
    chat_btn_about: "📜 About",
    chat_btn_contact: "✉️ Contact",
    chat_btn_faq: "❓ FAQ",
    chat_btn_cyber: "🛡️ Cybersecurity",
    chat_btn_harass: "🚨 Harassment",
    chat_btn_see: "See",
    chat_btn_see_section: "See section",
    chat_btn_all_pages: "📋 See all pages",
    chat_btn_prices: "💶 See prices",
    chat_btn_contact_me: "📞 Contact you",
    chat_btn_delivery: "🚚 Delivery",
    chat_btn_menu: "📋 Page menu"
  },

  ru: {
    // === NAV & HEADER ===
    maintenance: "ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ",
    maintenance_motto: "Сайт GUILLET IV в настоящее время находится на техническом обслуживании. Мы скоро вернемся.",
    maintenance_info: "⏳ Идут работы — Спасибо за ваше терпение",
    contact_us: "📧 Связаться с нами",
    order_independence: "ОРДЕН НЕЗАВИСИМОСТИ",
    search_product: "Искать товар",
    clear_search: "Очистить поиск",
    matching_products: "Подходящие товары",
    toggle_mode: "Переключить светлый/темный режим",
    nav_home: "🏠 Главная",
    nav_about: "📜 О нас",
    nav_shop: "🛒 Магазин",
    nav_vinted: "👕 Vinted",
    nav_beauty: "💅 Ногти и красота",
    nav_parrainage: "🤝 Реферальная программа",
    nav_cyber: "🛡️ Кибербезопасность",
    nav_harassment: "🚨 Харассмент",
    nav_contact: "✉️ Контакты",
    nav_faq: "❓ FAQ",
    nav_cgv: "📄 Условия",
    nav_privacy: "📄 Конфиденциальность",
    nav_legal: "⚖️ Право и безопасность",
    
    // === MARQUEE ===
    marquee_welcome: "✨ Добро пожаловать в GUILLET IV — Орден Независимости ✨",
    marquee_delivery: "🚚 Быстрая и безопасная доставка",
    marquee_payment: "🛡️ 100% безопасная оплата",
    marquee_motto: "👑 Создай свой путь. Защити свою автономию. Построй будущее.",
    marquee_products: "💎 Товары, выбранные для автономии и практичной жизни",
    marquee_warranty: "🛡️ 2-летняя гарантия на все наши товары",
    marquee_music: "🎵 Откройте для себя нашу эксклюзивную музыкальную подборку",

    // === AUDIO ===
    site_music: "🎵 Музыка сайта",
    choose_music: "Выбрать музыку",
    track_genetiquement: "[FR] 🧬 Génétiquement Modifier",
    track_polygone: "[FR] 🔷 Polygone",
    track_quelques_notes: "[FR] 🎵 Quelques notes",
    track_bilar_phoenix: "[FR] 🔥 Bilar – Phénix",
    track_cenza: "[FR] 🕶️ Cenza – Inconnu",
    track_confinement: "[FR] 🧪 Bilar – ConFinement n°2",
    track_dark_blues: "[EN] 🌑 Dark Blues.Vol",
    track_iam: "[FR] 🌍 IAM – La fin de leur monde",
    track_issaba: "[FR] ⚡ Issaba – Tu connais",
    track_kery: "[FR] 📜 Kery James – Post-Scriptum",
    track_exit: "[FR] 🧬 L'EXI-T – Venom Zirko / HYPERTHYMÉSIE",
    track_sakage: "[FR] 🌒 Sakage – Prémice",
    track_sks_tsunami_2: "[FR] ⚡ SKS Crew – Tsunami 2",
    track_sks_tsunami: "[FR] 🌊 SKS Crew – Tsunami",
    track_sks: "[FR] 💥 SKS CREW",
    track_mysa_ralliement: "[FR] 🚩 Mysa – Le Ralliement",
    track_rockin_luta: "[FR] ✊ Rockin'Squat – A Luta Continua",
    track_rockin_eternel: "[FR] 📚 Rockin'Squat – Eternel Apprenti",
    track_rcknsqt_verlaine: "[FR] 🖋️ RCKNSQT – VERLAINE",
    track_mysa_autopsy: "[FR] 🩸 Mysa – Autopsy",
    track_fourmiliere: "[FR] 🐜 La fourmilière – Sourire",
    track_shurikn: "[FR] 🗡️ Shurikn – Samouraï",
    track_proser: "[FR] 🔥 Proser – La Rage (Monf x Poups)",
    track_rohff: "[FR] ⚔️ Rohff – Fitna",
    track_mysa_fou: "[FR] 🧠 Mysa – Comme Un Fou",
    track_mysa_dystopie: "[FR] 🏙️ Mysa – Dystopie19",
    track_mysa_mortel: "[FR] 💀 Mysa – Mortel",
    track_mysa_piqure: "[FR] 💉 Mysa – Piqûre de Rappel",
    track_mysa_revolu: "[FR] 🔁 Mysa – Révolu",
    track_millesime: "[FR] 🏛️ Millésime K – République",
    track_rockin_aimer: "[FR] ❤️ Rockin'Squat – Aimer Sans Posséder",
    track_rockin_ils: "[FR] 💔 Rockin'Squat – Ils Ne Veulent Pas Aimer",
    track_rcknsqt_vocab: "[FR] 🔤 RCKNSQT – VOCAB",
    track_miyagi_kosandra: "[RU] 🌌 Miyagi & Andy Panda – Kosandra",
    track_miyagi_capitaine: "[RU] ⚓ Miyagi – Capitaine",
    track_miyagi_tumani: "[RU] 🎭 Miyagi – Tumani / YO / KADI / Bismarck",

    // === HERO / DOCTRINE ===
    motto: "«Создай свой путь. Защити свою автономию. Построй будущее.»",
    baseline: "Компания · Движение предпринимательской независимости · Видение",
    doctrine_title: "⚔️ Доктрина GUILLET IV",
    doctrine_desc: "GUILLET IV объединяет силу бизнеса, силу идентичности и видение движения. Наш основополагающий принцип: не ждать своего места, а строить его через действие, дисциплину и созидание.",
    authority: "🖤 Власть",
    authority_desc: "Черный олицетворяет самоконтроль, строгость и прочность.",
    willpower: "❤️ Воля",
    willpower_desc: "Красный представляет энергию, мужество и решимость.",
    legitimacy: "👑 Легитимность",
    legitimacy_desc: "Золото символизирует созданную ценность, требовательность и признание.",
    vision: "🚀 Видение",
    vision_desc: "Синий открывает путь к инновациям и будущему.",
    authenticity: "🌑 Аутентичность",
    authenticity_desc: "Чистая правда, реальная идентичность, то, что вы есть без маски и компромиссов.",
    revelation: "✨ Откровение",
    revelation_desc: "Свет, который раскрывает скрытое. Пробуждение, понимание, ясность.",
    truth: "⚡ Истина",
    truth_desc: "Прямая линия, правильное слово, то, что не лжет и не дрожит.",
    awareness: "🧠 Осознанность",
    awareness_desc: "Ясность, высота, способность видеть за пределами внешности.",
    power: "🜂 Сила",
    power_desc: "Способность действовать, навязывать свое направление, преобразовывать окружающую среду.",
    discipline: "🜁 Дисциплина",
    discipline_desc: "Порядок, структура, последовательность, которые куют успех.",
    creation: "🜄 Творение",
    creation_desc: "Искусство производить, внедрять инновации, строить то, чего еще не существует.",
    ascension: "🜃 Восхождение",
    ascension_desc: "Восход, эволюция, преодоление себя и пределов.",

    // === SHOP ===
    shop_title: "🛒 Магазин GUILLET IV",
    shop_intro: "Товары, выбранные для автономии, безопасности, активного отдыха и практичной жизни.",
    no_products: "Ни один товар не соответствует этому запросу.",
    see_more: "Читать далее",
    see_less: "Скрыть",
    full_desc: "Полное описание",
    details: "Детали",
    utility: "Полезность",
    how_to_use: "Как использовать",
    features: "Характеристики",

    // Drone
    drone_title: "ДРОН KY108 – ОКО БУДУЩЕГО В ВАШИХ РУКАХ",
    drone_tagline: "Доминируй в небе... или оно будет доминировать над тобой. Будь глазами, не нуждаясь в зрении.",
    drone_desc: "Дрон, созданный для творцов, исследователей и амбициозных пилотов. Запечатлей мир с хирургической точностью.",
    drone_full_1: "KY108 — это не просто дрон: это инструмент видения, инструмент мастерства, воздушный союзник, который превращает каждый полет в футуристический опыт.",
    drone_full_2: "Благодаря двойной HD-камере, 90-кратному зуму, всенаправленному обходу препятствий и бесколлекторным двигателям, он предлагает вам стабильность и мощность, которых могут достичь немногие дроны в его категории.",
    drone_full_3: "Складной, компактный, умный: KY108 готов следовать за вами повсюду.",
    drone_detail_1: "Двойная HD-камера с 90-кратным зумом",
    drone_detail_2: "Всенаправленный обход препятствий",
    drone_detail_3: "Мощный и долговечный бесколлекторный двигатель",
    drone_detail_4: "Пульт дистанционного управления со встроенным FPV-экраном",
    drone_detail_5: "Складной дрон, легко транспортируется",
    drone_util_1: "Снимайте пейзажи в высоком качестве",
    drone_util_2: "Создавайте контент для TikTok и Instagram",
    drone_util_3: "Наблюдайте за территорией, уважая частную жизнь",
    drone_util_4: "Научитесь пилотировать дрон",
    drone_util_5: "Делайте профессиональные аэрофотоснимки",
    drone_use_1: "Разложите дрон и проверьте пропеллеры.",
    drone_use_2: "Включите пульт дистанционного управления.",
    drone_use_3: "Подключите HD-камеру.",
    drone_use_4: "Взлетайте в вспомогательном режиме.",
    drone_use_5: "Пилотируйте через встроенный FPV-экран.",
    drone_use_note: "Не забывайте соблюдать применимые правила полетов и частную жизнь снимаемых людей.",
    cart_89: "💳 Добавить в корзину — 89 €",

    // Projector
    proj_title: "Поворотный солнечный светодиодный прожектор",
    proj_desc: "Уличный солнечный светодиодный прожектор с PIR-датчиком и поворотными панелями.",
    proj_full_1: "Уличный светодиодный прожектор, питающийся от солнечной панели, оснащенный PIR-датчиком и поворотными панелями.",
    proj_util_1: "Обезопасить вход",
    proj_util_2: "Осветить темную зону",
    proj_util_3: "Отпугнуть вторжения",
    proj_util_4: "Работает без электричества",
    proj_use_1: "Закрепите прожектор на стене",
    proj_use_2: "Сориентируйте светодиодные панели",
    proj_use_3: "Отрегулируйте PIR-датчик",
    proj_use_4: "Дайте солнечной панели зарядиться",
    cart_35: "💳 Добавить в корзину — 35 €",

    // Winter Pack
    badge_winter: "ЗИМНИЙ НАБОР",
    pack_title: "Winter Survival Pack – Премиум издание",
    pack_desc: "Идеальный набор, чтобы пережить зиму, оставаться в тепле, со светом и автономным.",
    pack_item_1: "🧤 1. Умные электрические перчатки с подогревом (USB)",
    pack_item_1_desc: "Высокоэффективные зимние перчатки, созданные для обеспечения немедленного и контролируемого тепла.",
    pack_item_1_b1: "Двусторонний нагрев на ладони",
    pack_item_1_b2: "Три регулируемых уровня температуры",
    pack_item_1_b3: "Сенсорный дизайн",
    pack_item_1_b4: "Работа через USB-интерфейс, совместимость с повербанком",
    pack_item_2: "🔦 2. Мощные светодиодные фонарики – аккумуляторные USB (x2)",
    pack_item_2_desc: "Ультраяркая тактическая лампа для отключений электроэнергии, ночных поездок, автомобиля.",
    pack_item_2_b1: "7 режимов освещения",
    pack_item_2_b2: "Зарядка через USB",
    pack_item_2_b3: "Встроенный аккумулятор",
    pack_item_2_b4: "Устойчивость к погодным условиям",
    pack_item_3: "🔋 3. Внешний аккумулятор 12 000 мАч – специально для USB-обогрева",
    pack_item_3_desc: "Повербанк высокой емкости, совместимый со всеми USB-устройствами и одеждой с подогревом.",
    pack_item_3_b1: "12 000 мАч → длительная автономность",
    pack_item_3_b2: "Выход 5V 2.4A",
    pack_item_3_b3: "Совместим с iPhone / Samsung / iPad",
    pack_item_4: "🛏️ 4. Многосезонный спальный мешок-кокон (210 × 75 см)",
    pack_item_4_desc: "Легкий, компактный и удобный спальный мешок, идеально подходит для кемпинга и чрезвычайных ситуаций.",
    pack_item_4_b1: "Встроенный капюшон",
    pack_item_4_b2: "Прочный полиэстер 170T",
    pack_item_4_b3: "Складывается в пуховое одеяло / одеяло",
    pack_item_4_b4: "Сумка для хранения в комплекте",
    cart_9999: "💳 Добавить в корзину — 99,99 €",

    // Endoscope
    badge_new: "НОВИНКА",
    endo_title: "Эндоскоп с камерой и экраном",
    endo_desc: "Инспекционный эндоскоп 1080P со встроенным экраном 4,3 дюйма, полужестким кабелем 10 метров, камерой 2,0 МП, регулируемой светодиодной подсветкой и водонепроницаемым дизайном IP68.",
    endo_full_1: "Незаменимый инструмент для осмотра труднодоступных мест: воздуховодов, двигателей, труб, кабелепроводов, технических установок или узких пространств.",
    endo_util_1: "Осмотр двигателей, воздуховодов и труб",
    endo_util_2: "Домашние работы: сантехника, вентиляция, электропроводка",
    endo_util_3: "Быстрая механическая диагностика",
    endo_util_4: "Визуальный контроль в темных зонах",
    endo_feat_1: "Разрешение Full HD 1080P",
    endo_feat_2: "Камера 2,0 МП с регулируемой светодиодной подсветкой",
    endo_feat_3: "Встроенный экран 4,3 дюйма",
    endo_feat_4: "Полужесткий кабель 10 метров",
    endo_feat_5: "Водонепроницаемость IP68",
    cart_95: "💳 Добавить в корзину — 95 €",

    // Security Pack
    badge_security: "🛡️ НАБОР БЕЗОПАСНОСТИ",
    pack_secu_title: "Премиум набор безопасности",
    pack_secu_tagline: "Полная защита. Установка за 10 минут. Под ключ.",
    pack_secu_promo: "Ограниченная акция",
    pack_secu_desc: "Защитите весь свой дом с помощью ИИ-камеры, полной сигнализации, 4 датчиков и готовой к использованию системы. Идеально для частных лиц и малого бизнеса.",
    pack_secu_full_1: "Премиум набор безопасности объединяет все необходимое для защиты дома, квартиры, магазина, гаража, подвала или офиса — без технических навыков и сложной проводки. Все уже настроено: вы устанавливаете, подключаете, готово за 10 минут.",
    pack_secu_contents: "📦 Состав набора (точный)",
    pack_secu_c1: "1 сигнализация Tiiwee (сирена + пульты)",
    pack_secu_c2: "1 ИИ-камера TP-Link Tapo C245D (ночное видение + обнаружение)",
    pack_secu_c3: "4 датчика открытия SONOFF (двери / окна / гараж / балкон)",
    pack_secu_c4: "Инструкция по установке",
    pack_secu_c5: "Поддержка 30 дней",
    pack_secu_f1: "Мгновенные оповещения на смартфон",
    pack_secu_f2: "Умное обнаружение (ИИ)",
    pack_secu_f3: "Мощная сирена",
    pack_secu_f4: "HD ночное видение",
    pack_secu_f5: "Прямая трансляция",
    pack_secu_f6: "Высокоточные датчики",
    pack_secu_secure_for: "Защищает",
    pack_secu_s1: "🏠 Дом",
    pack_secu_s2: "🏢 Квартира",
    pack_secu_s3: "🏪 Магазин",
    pack_secu_s4: "🚗 Гараж",
    pack_secu_s5: "🕳️ Подвал",
    pack_secu_s6: "💼 Офис",
    pack_secu_use_1: "Подключите сигнализацию Tiiwee и камеру Tapo.",
    pack_secu_use_2: "Прикрепите 4 датчика SONOFF на двери / окна / гараж / балкон.",
    pack_secu_use_3: "Подключите устройства к приложению (Tapo + SONOFF).",
    pack_secu_use_4: "Настройте оповещения на смартфон.",
    pack_secu_use_5: "Проверьте сирену и обнаружение. Готово за 10 минут.",
    pack_secu_warranty_support: "Гарантия и поддержка",
    pack_secu_ws1: "Гарантия 24 месяца",
    pack_secu_ws2: "Поддержка клиентов 30 дней",
    pack_secu_ws3: "Помощь в установке при необходимости",
    pack_secu_why: "Почему этот набор?",
    pack_secu_why_text: "Потому что он защищает весь ваш дом с помощью ИИ-камеры, полной сигнализации, 4 датчиков и готовой к использованию системы. Набор под ключ — идеально для частных лиц и малого бизнеса.",
    cart_pack_secu: "💳 Добавить в корзину — 350 €",

    // === INFO & REVIEWS ===
    guarantees: "🛡️ Гарантии и услуги",
    warranty_24: "✔ Гарантия: 24 месяца",
    secure_payment: "✔ Безопасная оплата",
    fast_delivery: "✔ Быстрая доставка",
    reviews_title: "⭐ Отзывы клиентов (Vinted)",
    review_zohra: "спасибо",
    review_limitless_1: "Рад, что все идеально, GUILLET IV 🔥",
    review_zlatoff: "Все ок, спасибо",
    review_limitless_2: "Благодарность 🤲 спасибо",

    // === ABOUT ===
    learn_more: "🏢 Узнать больше",
    company_movement: "Компания · Движение · Независимость",
    about_intro: "GUILLET IV — это компания и движение предпринимательской независимости. Он защищает идею о том, что каждый может построить свой собственный путь через работу, творчество и автономию.",
    about_service: "Я продаю на Vinted (профиль: limitless95) с отзывами 5★, отзывчивым обслуживанием клиентов и желанием предлагать серьезные, хорошо представленные товары с реальным опытом магазина.",
    about_contact: "По любым вопросам свяжитесь со мной через страницу Контакты или напрямую на Vinted.",
    contact_me: "✉️ Связаться со мной",
    view_my_vinted: "👕 Мой Vinted",
    back_home: "⬅ На главную",
    brand_king: "👑 GUILLET IV",
    back_shop: "⬅ Назад в магазин",

    // === SPONSORSHIP ===
    parrainage_title: "🤝 Реферальная программа",
    parrainage_sub: "Boursorama · Starlink · Vinted · Crédit Agricole · Octopus Energy",
    parrainage_intro: "Откройте счет, подпишитесь на услугу или зарегистрируйтесь на Vinted по моим реферальным ссылкам. Информация заполняется автоматически, и вы пользуетесь преимуществами!",
    parrainage_boursorama_title: "🏦 Реферальная программа Boursorama",
    parrainage_boursorama_text: "Откройте свой счет Boursorama по моей реферальной ссылке: моя информация заполнится автоматически, вам ничего не нужно вводить повторно. И вы получаете приветственные бонусы!",
    boursorama_b1: "Приветственный бонус при открытии",
    boursorama_b2: "Ноль комиссий за обслуживание счета",
    boursorama_b3: "100% онлайн-регистрация за несколько минут",
    parrainage_btn_boursorama: "🏦 Открыть счет Boursorama",
    parrainage_starlink_title: "🛰️ Реферальная программа Starlink",
    parrainage_starlink_text: "Подпишитесь на Starlink по моей реферальной ссылке и получите бесплатный месяц подписки. Высокоскоростной интернет через спутник, везде, даже в изолированных районах.",
    starlink_b1: "Один бесплатный месяц подписки",
    starlink_b2: "Высокоскоростной интернет везде, даже в изолированных районах",
    starlink_b3: "Простая и быстрая установка",
    parrainage_btn_starlink: "🛰️ Подписаться на Starlink",
    parrainage_vinted_title: "👕 Реферальная программа Vinted",
    parrainage_vinted_text: "Зарегистрируйтесь на Vinted по моей ссылке-приглашению и присоединяйтесь к сообществу. Покупайте, продавайте и давайте вторую жизнь своей одежде, пользуясь приветственными преимуществами.",
    vinted_b1: "Приветственное преимущество на первый заказ",
    vinted_b2: "Продавайте одежду в несколько кликов",
    vinted_b3: "Безопасная доставка и оплата",
    parrainage_btn_vinted: "👕 Присоединиться к Vinted",
    parrainage_credit_agricole_title: "🏛️ Реферальная программа Crédit Agricole",
    parrainage_credit_agricole_text: "Хотите открыть счет в Crédit Agricole? Используйте мой одноразовый реферальный код и перейдите по ссылке, чтобы узнать о своих преимуществах.",
    credit_agricole_b1: "Приветственные преимущества при открытии счета",
    credit_agricole_b2: "Местный банк, присутствующий по всей Франции",
    credit_agricole_b3: "Одноразовый реферальный код EGYYLFH",
    parrainage_btn_credit_agricole: "🏛️ Открыть счет Crédit Agricole",
    parrainage_octopus_title: "🐙 Реферальная программа Octopus Energy",
    parrainage_octopus_text: "Присоединяйтесь к Octopus Energy по моей реферальной ссылке и получите преимущество на счет за электроэнергию. Более зеленая, простая и дешевая энергия.",
    octopus_b1: "Приветственное преимущество на счет за электроэнергию",
    octopus_b2: "100% возобновляемая энергия и справедливые цены",
    octopus_b3: "Отзывчивая поддержка клиентов и без обязательств",
    parrainage_btn_octopus: "🐙 Присоединиться к Octopus Energy",
    parrainage_step1_title: "Нажмите на ссылку",
    parrainage_step1_text: "Вы перенаправляетесь на официальную страницу регистрации (Boursorama, Starlink, Vinted, Crédit Agricole или Octopus Energy) с уже встроенным реферальным кодом.",
    parrainage_step2_title: "Ваша информация предварительно заполнена",
    parrainage_step2_text: "Моя реферальная информация заполняется автоматически. Вам нужно только заполнить свою.",
    parrainage_step3_title: "Подтвердите регистрацию",
    parrainage_step3_text: "Завершите открытие счета, подписку или регистрацию за несколько минут и воспользуйтесь преимуществами.",
    parrainage_step4_title: "Все в выигрыше",
    parrainage_step4_text: "Вы получаете приветственное преимущество, и я тоже. Настоящий беспроигрышный вариант.",
    parrainage_note_title: "ℹ️ Полезно знать:",
    parrainage_note_text: "Реферальные ссылки являются официальными ссылками Boursorama, Starlink, Vinted, Crédit Agricole и Octopus Energy. Открытие счета Boursorama бесплатно и без обязательств. Бонусы и преимущества зависят от условий каждого сервиса. Код Crédit Agricole EGYYLFH является одноразовым.",

    // === VINTED PAGE ===
    my_vinted: "👕 Мой Vinted",
    vinted_intro: "Найдите мои проверенные продажи, мои рейтинги 5★ и мои товары, доступные на Vinted.",
    verified_reviews: "Проверенные отзывы Vinted",
    vinted_desc: "Я limitless95 на Vinted. Я предлагаю серьезные, хорошо представленные товары с отзывчивым обслуживанием клиентов.",
    view_vinted_profile: "👕 Мой профиль Vinted",

    // === BEAUTY PAGE ===
    beauty_title: "💅 Ногти и красота — SHAYNAILS",
    beauty_sub: "Элегантность · Уход · Лично в Гиньене",
    beauty_intro: "Услуги только лично в Гиньене. Запись по телефону или в Instagram.",
    beauty_prices_title: "💶 Прайс-лист",
    beauty_presentiel_note: "⚠️ Услуги только лично в Гиньене — без онлайн-продаж.",
    beauty_gallery_title: "✨ Достижения клиентов",
    beauty_video_title: "🎬 В видео",
    video_fallback: "Ваш браузер не поддерживает воспроизведение видео.",
    beauty_book_title: "📅 Записаться на услугу",
    beauty_book_text: "Все услуги проводятся лично в Гиньене.<br>Запись по телефону или в Instagram.",
    click_photo_zoom: "💡 Нажмите на фото, чтобы увеличить",

    // === CYBERSECURITY PAGE ===
    cyber_title: "🛡️ Профилактика кибербезопасности",
    cyber_subtitle: "Компьютерные атаки во Франции",
    cyber_intro: "Фишинг, кража данных, мошеннический доступ и кража личных данных: понимание рисков помогает лучше защитить ваши учетные записи, устройства и личную информацию.",
    cyber_intro_2: "Профилактика сочетает в себе благоразумные привычки, соответствующие технические средства защиты и быструю реакцию при возникновении инцидента.",
    prevention_themes: "📋 Темы профилактики",
    cyber_step1: "🔑 Шаг 1 — Сохраненные пароли",
    cyber_step2: "🎣 Шаг 2 — Социальная инженерия и фишинг",
    cyber_step3: "💻 Шаг 3 — Атаки на пароли",
    cyber_step4: "🗝️ Шаг 4 — Фотографии ключей и физическая безопасность",
    cyber_step5: "👤 Шаг 5 — Личная информация",
    cyber_step6: "⚖️ Шаг 6 — Французское право и хакерство",
    cyber_step7: "📨 Шаг 7 — Фишинг, мошенничество и идентичность",
    cyber_step8: "🗂️ Шаг 8 — Персональные данные и GDPR",
    cyber_step9: "✅ Шаг 9 — Авторизованные тесты безопасности",
    cyber_step10: "🚨 Шаг 10 — Что делать в случае инцидента?",
    cyber_conclusion: "🏁 Общее заключение",
    cyber_s1_title: "🔑 Шаг 1 — Сохраненные пароли: комфорт, защита и бдительность",
    cyber_s1_p1: "Сохранение паролей в текстовом файле, незащищенной заметке или общем документе подвергает ваши учетные записи риску, если файл украден или устройство скомпрометировано.",
    cyber_s2_title: "🎣 Шаг 2 — Социальная инженерия и фишинг: вы можете стать целью",
    cyber_s2_p1: "Фишинг — это метод, который заключается в выдаче себя за доверенное лицо или организацию для получения информации, платежа или рискованного действия.",
    cyber_s3_title: "💻 Шаг 3 — Атаки на пароли",
    cyber_s3_p1: "Попытки угадать или повторно использовать пароль принимают различные формы, и не все они работают одинаково.",
    cyber_s4_title: "🗝️ Шаг 4 — Фотографии ключей и физическая безопасность",
    cyber_s4_p1: "Публикация подробной фотографии ключа от дома, гаража или автомобиля может раскрыть характеристики, полезные злоумышленнику.",
    cyber_s5_title: "👤 Шаг 5 — Личная информация и конфиденциальность",
    cyber_s5_p1: "Избегайте паролей, основанных на деталях, которые легко найти или угадать.",
    cyber_s6_title: "⚖️ Шаг 6 — Французское право: мошеннический доступ, хакерство и санкции",
    cyber_s6_p1: "Во Франции посягательства на автоматизированные системы обработки данных (STAD) в основном предусмотрены статьями 323-1 и последующими Уголовного кодекса.",
    cyber_s7_title: "📨 Шаг 7 — Фишинг, мошенничество и кража личных данных",
    cyber_s7_p1: "Фишинг описывает метод, а не сам по себе окончательную квалификацию правонарушения.",
    cyber_s8_title: "🗂️ Шаг 8 — Персональные данные, GDPR и обязательства по безопасности",
    cyber_s8_p1: "Организации, обрабатывающие персональные данные, должны, в частности, внедрять соответствующие меры безопасности.",
    cyber_s9_title: "✅ Шаг 9 — Аудит и тестирование безопасности: получение четкого разрешения",
    cyber_s9_p1: "Аудит, тестирование на проникновение или поиск уязвимостей должны проводиться в авторизованных рамках.",
    cyber_s10_title: "🚨 Шаг 10 — Что делать, если учетная запись или устройство скомпрометированы?",
    cyber_s10_p1: "С чистого устройства смените соответствующий пароль и те, которые были повторно использованы.",
    cyber_conclusion_title: "🏁 Общее заключение",
    cyber_conclusion_p1: "Киберпреступники могут использовать технические уязвимости, а также доверие, привычки и информацию, которой делятся в Интернете.",

    // === LEGAL & SECURITY AUDIT ===
    legal_notice: "⚖️ Правовая информация и безопасность",
    legal_info: "1. Правовая информация",
    legal_company: "Название компании:",
    legal_status: "Статус:",
    legal_address: "Адрес:",
    legal_hosting: "2. Хостинг сайта",
    legal_ip: "3. Интеллектуальная собственность",
    legal_ip_p1: "Весь контент сайта (тексты, изображения, дизайн, логотип, структура) является исключительной собственностью GUILLET IV.",
    legal_ip_p2: "Любое воспроизведение, распространение или использование без разрешения строго запрещено.",
    legal_data_title: "4. Персональные данные",
    legal_data_p1: "Собранные данные (имя, электронная почта, адрес, телефон) используются только для обработки заказов и поддержки клиентов.",
    legal_data_p2: "Никакие личные данные не передаются, не продаются, не передаются и не сообщаются компаниям, платформам, сторонним сервисам или государственным органам во Франции или где-либо еще.",
    legal_data_p3: "В соответствии с GDPR вы можете в любое время запросить удаление или изменение своих данных по адресу: lanceglorieuse@gmail.com.",
    legal_cookies_title: "5. Файлы cookie",
    legal_cookies_p1: "Сайт может использовать технические файлы cookie для улучшения пользовательского опыта (корзина, настройки отображения).",
    legal_cookies_p2: "Рекламные файлы cookie не используются.",
    legal_liability_title: "6. Ответственность",
    legal_liability_p1: "GUILLET IV не несет ответственности за ущерб, связанный с использованием сайта или продуктов, за исключением случаев доказанной прямой вины.",
    legal_disputes_title: "7. Споры",
    legal_disputes_p1: "В случае спора в первую очередь будет предпринята попытка мирного урегулирования.",
    legal_disputes_p2: "В противном случае компетентными будут французские суды.",
    security_audit_title: "🛡️ Аудит технической безопасности (Nmap & curl)",
    security_audit_subtitle: "🔐 Безопасность сайта Shop de Légende",
    security_audit_p1: "Безопасность посетителей и клиентов строго контролируется на Shop de Légende. Сайт применяет передовые, строгие и не поддающиеся обходу меры защиты для обеспечения надежной навигации, безопасных платежей и полной конфиденциальности.",
    security_audit_p2: "Глубокий технический анализ, проведенный с помощью Nmap и curl, подтверждает, что сайт не имеет недостатков, опасных элементов, утечек данных, а все обнаруженные механизмы являются нормальными и ожидаемыми мерами защиты.",
    security_audit_p3: "👉 Нет риска, нет угрозы, нет аномалий.",
    security_audit_1_title: "🔒 Безопасное соединение (HTTPS / TLS 1.3)",
    security_audit_1_p1: "Сайт использует самые строгие стандарты безопасности:",
    security_audit_1_l1: "полное шифрование данных",
    security_audit_1_l2: "защита от перехвата",
    security_audit_1_l3: "автоматическое перенаправление на HTTPS",
    security_audit_1_l4: "протокол TLS 1.3, международный банковский стандарт",
    security_audit_1_footer: "👉 Nmap подтверждает, что порт 443 открыт, защищен и не имеет уязвимостей.",
    security_audit_2_title: "🛡️ Расширенная защита от атак (CSP)",
    security_audit_2_p1: "Политика безопасности контента сайта блокирует:",
    security_audit_2_l1: "вредоносные скрипты",
    security_audit_2_l2: "внедрение кода",
    security_audit_2_l3: "несанкционированные ресурсы",
    security_audit_2_l4: "попытки взлома",
    security_audit_2_footer: "👉 Сканирование http-headers Nmap подтверждает полную, строгую и заблокированную CSP. Опасного поведения не обнаружено.",
    security_audit_3_title: "🧱 Анти-мошенничество и анти-кликджекинг",
    security_audit_3_footer: "👉 Активная защита, не поддающаяся обходу, предотвращающая любые попытки перехвата интерфейса.",
    security_audit_4_title: "🔐 Безопасные платежи через Stripe",
    security_audit_4_p1: "Платежи обрабатываются Stripe, сертифицированным банковским решением:",
    security_audit_4_l1: "соответствие PCI-DSS",
    security_audit_4_l2: "полное шифрование",
    security_audit_4_l3: "отсутствие хранения банковских данных",
    security_audit_4_l4: "карты никогда не хранятся на сайте",
    security_audit_4_footer: "👉 Nmap подтверждает, что конечные точки Stripe безопасны, действительны и не представляют риска.",
    security_audit_5_title: "🧭 Усиленная конфиденциальность",
    security_audit_5_p1: "Сайт применяет строгие политики:",
    security_audit_5_l1: "Referrer Policy: <code>strict-origin-when-cross-origin</code>",
    security_audit_5_l2: "Permissions Policy: без камеры, без микрофона, без геолокации",
    security_audit_5_l3: "X-Content-Type-Options: <code>nosniff</code>",
    security_audit_5_l4: "Cross-Origin-Opener-Policy: <code>same-origin</code>",
    security_audit_5_l5: "Cross-Origin-Embedder-Policy: <code>credentialless</code>",
    security_audit_5_l6: "Cross-Origin-Resource-Policy: <code>same-origin</code>",
    security_audit_5_footer: "👉 Эти меры защиты активны, строги и не оказывают негативного влияния на посетителей.",
    security_audit_6_title: "🌍 Защита от внешних сайтов (CORS)",
    security_audit_6_p1: "Сайт разрешает только свой собственный домен:",
    security_audit_6_footer: "👉 Никаких утечек, никакого несанкционированного внешнего доступа.",
    security_audit_7_title: "🧪 Безопасный хостинг на Vercel",
    security_audit_7_p1: "Сайт пользуется защитой Vercel:",
    security_audit_7_l1: "усиленная безопасность",
    security_audit_7_l2: "автоматические обновления",
    security_audit_7_l3: "защита от DDoS",
    security_audit_7_l4: "надежная глобальная инфраструктура",
    security_audit_7_l5: "активная анти-бот система",
    security_audit_7_footer: "👉 Nmap обнаруживает: X-Vercel-Challenge-Token, X-Vercel-Mitigated: challenge, Vercel Security Checkpoint. Эти механизмы нормальны, автоматичны и никогда не касаются людей-посетителей.",
    security_audit_8_title: "🛠️ Непрерывный мониторинг и обслуживание",
    security_audit_8_p1: "Сайт подвергается:",
    security_audit_8_l1: "регулярным аудитам",
    security_audit_8_l2: "техническим обновлениям",
    security_audit_8_l3: "проверкам SSL",
    security_audit_8_l4: "тестам на атаки",
    security_audit_8_footer: "👉 Анализы подтверждают постоянную, активную безопасность без недостатков.",
    security_audit_9_title: "📡 Техническая проверка (Nmap & curl)",
    security_audit_9_p1: "Внешние анализы показывают:",
    security_audit_9_l1: "отсутствие недостатков",
    security_audit_9_l2: "отсутствие опасных методов",
    security_audit_9_l3: "отсутствие ненужных портов",
    security_audit_9_l4: "отсутствие утечек информации",
    security_audit_9_l5: "отсутствие открытых сервисов",
    security_audit_9_l6: "отсутствие аномального поведения",
    security_audit_9_l7: "отсутствие риска для посетителей",
    security_audit_9_nmap1_title: "✔️ Nmap — http-headers",
    security_audit_9_nmap1_text: "Обнаруженные заголовки: полная CSP, активный HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy, X-Content-Type-Options, строгий CORS, защиты Vercel.",
    security_audit_9_nmap1_footer: "👉 Все эти элементы являются защитой. Опасности нет.",
    security_audit_9_nmap2_title: "✔️ Nmap — http-methods",
    security_audit_9_nmap2_text: "GET, HEAD, POST, OPTIONS",
    security_audit_9_nmap2_footer: "👉 Опасных методов нет.",
    security_audit_9_nmap3_title: "✔️ Nmap — http-title",
    security_audit_9_nmap3_text: "Site doesn't have a title (text/plain)",
    security_audit_9_nmap3_footer: "👉 Нормальный технический ответ. Без влияния на посетителей.",
    security_audit_9_nmap4_title: "✔️ Nmap — http-security-headers",
    security_audit_9_nmap4_text: "Nmap подтверждает: HSTS, строгий CSP, X-Frame-Options, X-Content-Type-Options, безопасный Cache-Control.",
    security_audit_9_nmap4_footer: "👉 Безопасность соответствует стандартам OWASP.",
    security_audit_9_nmap5_title: "✔️ Nmap — http-server-header",
    security_audit_9_nmap5_text: "Server: Vercel",
    security_audit_9_nmap5_footer: "👉 Нормально и безопасно.",
    security_audit_9_nmap6_title: "✔️ Nmap — fingerprint",
    security_audit_9_nmap6_text: "400 Bad Request · 404 Not Found · DEPLOYMENT_NOT_FOUND",
    security_audit_9_nmap6_footer: "👉 Внутренние ответы Vercel на необычные запросы. Опасности нет.",
    security_audit_9_nmap7_title: "✔️ Nmap — http-enum",
    security_audit_9_nmap7_text: "443/tcp open https",
    security_audit_9_nmap7_footer: "👉 Нет конфиденциальных ресурсов, нет скрытых страниц, нет открытых сервисов.",
    security_audit_9_curl_title: "✔️ Результат curl",
    security_audit_9_curl_text: "Curl отображает только: защиты, заголовки безопасности, анти-бот механизмы.",
    security_audit_9_curl_footer: "👉 Никаких аномалий, никаких недостатков, никакого риска.",
    security_conclusion_title: "🟢 Твердое заключение",
    security_conclusion_p1: "Анализы Nmap и curl доказывают, что:",
    security_conclusion_l1: "сайт безопасен",
    security_conclusion_l2: "защиты активны",
    security_conclusion_l3: "недостатков нет",
    security_conclusion_l4: "опасных элементов не обнаружено",
    security_conclusion_l5: "ничего не влияет на посетителей",
    security_conclusion_l6: "конфигурация профессиональная, строгая и соответствующая требованиям",
    security_conclusion_final: "👉 Shop de Légende — это высокобезопасный, надежный и защищенный сайт.",
    security_engagement_title: "Обязательство по безопасности",
    security_engagement_p1: "Как <strong>профессиональный пентестер</strong>, я владею информацией об уязвимостях безопасности и механизмах атак. Этот сайт был спроектирован, разработан и проверен с теми же требованиями, что и банковская среда.",
    security_engagement_p2: "Если вы исследователь в области безопасности, разработчик или любопытный пользователь и обнаружили аномалию, уязвимость или подозрительное поведение, <strong>немедленно свяжитесь со мной</strong>:",
    security_engagement_phone: "<strong>Телефон:</strong> <a href=\"tel:0780204749\">07.80.20.47.49</a>",
    security_engagement_email: "<strong>Электронная почта:</strong> <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a>",
    security_engagement_thanks: "Заранее благодарю за вашу бдительность и вклад в безопасность этого сайта. 🙏",

    // === CGV ===
    terms_sale: "📄 Условия продажи – GUILLET IV",
    cgv_object: "1. Цель",
    cgv_object_text1: "Настоящие Условия продажи регулируют продажу продуктов, предлагаемых в магазине GUILLET IV.",
    cgv_object_text2: "Любой заказ подразумевает полное и безоговорочное принятие настоящих Условий.",
    cgv_products: "2. Продукты",
    cgv_products_text1: "Предлагаемые продукты описаны с максимальной точностью.",
    cgv_products_text2: "Фотографии не являются договорными.",
    cgv_products_text3: "Наличие указано на каждой карточке товара.",
    cgv_price: "3. Цена",
    cgv_price_text1: "Цены указаны в евро (€), включая все налоги (TTC).",
    cgv_price_text2: "Продавец оставляет за собой право изменять цены в любое время, но продукты будут выставлены к оплате по тарифу, действующему на момент подтверждения заказа.",
    cgv_order: "4. Заказ",
    cgv_order_text1: "Клиент выбирает продукты, которые хочет купить, подтверждает корзину и переходит к оплате.",
    cgv_order_text2: "Подтверждение заказа отправляется по электронной почте.",
    cgv_order_text3: "Продавец оставляет за собой право отказать в заказе в случае проблемы с оплатой или предыдущего спора.",
    cgv_payment: "5. Оплата",
    cgv_payment_text1: "Оплата безопасна через <a href=\"https://stripe.com/fr\" target=\"_blank\" rel=\"noopener\">Stripe</a> или через опции, предлагаемые <a href=\"https://www.vinted.fr\" target=\"_blank\" rel=\"noopener\">Vinted</a>.",
    cgv_payment_text2: "Банковские данные никогда не хранятся GUILLET IV.",
    cgv_delivery: "6. Доставка",
    cgv_delivery_text1: "Продукты отправляются быстро в зависимости от их наличия.",
    cgv_delivery_text2: "Ориентировочные сроки: 2-5 рабочих дней.",
    cgv_delivery_text3: "Обслуживаемые районы: континентальная Франция.",
    cgv_delivery_text4: "Номер отслеживания может быть предоставлен при наличии.",
    cgv_delivery_text5: "В случае задержки или потери клиент должен связаться с продавцом для получения помощи.",
    cgv_retractation: "7. Право на отказ (14 дней)",
    cgv_retractation_text1: "В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">статьей L221-18 Потребительского кодекса</a>, клиент имеет 14 дней для осуществления своего права на отказ без объяснения причин.",
    cgv_retractation_text2: "Продукт должен быть возвращен в исходном состоянии.",
    cgv_retractation_text3: "В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">статьей L221-23 Потребительского кодекса</a>, прямые расходы на возврат несет клиент, за исключением ошибки продавца.",
    cgv_retractation_text4: "В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">статьей L221-24 Потребительского кодекса</a>, возврат средств производится в течение максимум 14 дней с момента уведомления об отказе и не позднее, чем после получения продукта или доказательства его отправки.",
    cgv_return: "8. Возврат и возврат средств",
    cgv_return_text1: "Возвраты должны быть отправлены по адресу, указанному продавцом.",
    cgv_return_text2: "Возврат средств осуществляется по правилам Vinted или Stripe в зависимости от способа покупки.",
    cgv_return_text3: "Возврат средств не производится за продукт, поврежденный клиентом.",
    cgv_legal_warranties: "9. Законные гарантии",
    cgv_legal_warranties_text: "Продавец применяет обязательные законные гарантии, предусмотренные <a href=\"https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006069565\" target=\"_blank\" rel=\"noopener\">Потребительским кодексом</a> и <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">Гражданским кодексом</a>.",
    cgv_conformity: "10. Законные гарантии",
    cgv_conformity_text1: "<strong>Законная гарантия соответствия (2 года):</strong> в соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">статьями L217-3 и последующими Потребительского кодекса</a>, клиент пользуется гарантией, покрывающей дефекты соответствия, существовавшие на момент доставки товара.",
    cgv_conformity_text2: "<strong>Гарантия скрытых дефектов:</strong> в соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">статьей 1641 Гражданского кодекса</a>, продавец обязан гарантировать скрытые дефекты, делающие продукт непригодным для предполагаемого использования или значительно снижающие это использование.",
    cgv_conformity_text3: "<strong>Возможная коммерческая гарантия:</strong> если GUILLET IV предлагает коммерческую гарантию, ее условия, продолжительность, объем и реализация указаны на карточке товара или в документе, прилагаемом к продукту.",
    cgv_conformity_exclude_title: "Законные гарантии не покрывают:",
    cgv_conformity_exclude1: "нормальный износ;",
    cgv_conformity_exclude2: "ущерб, вызванный неправильным использованием;",
    cgv_conformity_exclude3: "модификации продукта.",
    cgv_data: "11. Персональные данные (GDPR)",
    cgv_data_text1: "Собранные данные (имя, электронная почта, адрес, телефон) используются только для обработки заказов и поддержки клиентов в соответствии с <a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">GDPR</a>.",
    cgv_data_text2: "Данные не продаются и не передаются.",
    cgv_data_text3: "Клиент может запросить доступ, исправление, переносимость или удаление своих данных по адресу <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a>.",
    cgv_liability: "12. Ответственность",
    cgv_liability_text1: "Продавец несет ответственность только за прямой ущерб, связанный с дефектным продуктом.",
    cgv_liability_text2: "Он не может нести ответственность за косвенный ущерб (потеря данных, финансовые потери и т.д.).",
    cgv_service: "13. Обслуживание клиентов",
    cgv_service_text: "По любым вопросам: <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a> — Ответ в течение 48 часов.",
    cgv_mediation: "14. Медиация",
    cgv_mediation_text1: "В случае спора в первую очередь будет предпринята попытка мирного урегулирования.",
    cgv_mediation_text2: "Если соглашение не будет достигнуто, клиент может бесплатно обратиться к потребительскому медиатору через <a href=\"https://www.economie.gouv.fr/mediation-conso\" target=\"_blank\" rel=\"noopener\">economie.gouv.fr/mediation-conso</a>.",
    cgv_law: "15. Применимое право",
    cgv_law_text1: "Настоящие Условия регулируются французским законодательством.",
    cgv_law_text2: "В случае спора компетентными будут французские суды в соответствии с правилами подсудности, применимыми к потребителям.",

    // === PRIVACY ===
    privacy_title: "📄 Политика конфиденциальности (GDPR)",
    privacy_intro: "Защита ваших персональных данных является приоритетом. В этой политике объясняется, какие данные собираются, почему, как они защищены и как вы можете осуществить свои права.",
    privacy_s1_title: "1. Собираемые данные",
    privacy_s1_intro: "Мы собираем только данные, необходимые для работы сайта и обработки заказов:",
    privacy_s1_l1: "фамилия, имя",
    privacy_s1_l2: "почтовый адрес",
    privacy_s1_l3: "электронная почта",
    privacy_s1_l4: "номер телефона",
    privacy_s1_l5: "информация о заказе",
    privacy_s1_l6: "IP-адрес (безопасность и предотвращение мошенничества)",
    privacy_s1_note: "Конфиденциальные данные не собираются.",
    privacy_s2_title: "2. Цели обработки",
    privacy_s2_intro: "Ваши данные используются для:",
    privacy_s2_l1: "обработки и отправки ваших заказов",
    privacy_s2_l2: "обеспечения поддержки клиентов",
    privacy_s2_l3: "управления вашей учетной записью клиента",
    privacy_s2_l4: "защиты сайта и предотвращения мошенничества",
    privacy_s2_l5: "соблюдения юридических обязательств (выставление счетов)",
    privacy_s3_title: "3. Правовая основа",
    privacy_s3_intro: "Обработка основана на:",
    privacy_s3_l1: "исполнении договора (заказ)",
    privacy_s3_l2: "законном интересе (безопасность, борьба с мошенничеством)",
    privacy_s3_l3: "согласии (несущественные файлы cookie)",
    privacy_s4_title: "4. Обработчики",
    privacy_s4_intro: "Для обеспечения работы сайта некоторые провайдеры могут обрабатывать ваши данные:",
    privacy_s4_l1: "Vercel (хостинг сайта)",
    privacy_s4_l2: "Stripe / PayPal (безопасные платежи)",
    privacy_s4_l3: "Служба электронной почты (подтверждение заказа)",
    privacy_s4_note: "Эти провайдеры соблюдают GDPR или имеют эквивалентные гарантии.",
    privacy_s5_title: "5. Срок хранения",
    privacy_s5_l1: "Данные, необходимые для обработки и выставления счетов по заказам: 10 лет, в соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">статьей L123-22 Коммерческого кодекса</a>.",
    privacy_s5_l2: "Данные неактивных клиентов: 3 года",
    privacy_s5_l3: "Технические файлы cookie: 13 месяцев",
    privacy_s6_title: "6. Ваши права",
    privacy_s6_intro: "В соответствии с GDPR вы имеете следующие права:",
    privacy_s6_l1: "доступ к вашим данным",
    privacy_s6_l2: "исправление",
    privacy_s6_l3: "удаление",
    privacy_s6_l4: "возражение",
    privacy_s6_l5: "переносимость",
    privacy_s6_contact: "Чтобы осуществить свои права: lanceglorieuse@gmail.com",
    privacy_s7_title: "7. Файлы cookie",
    privacy_s7_intro: "Сайт использует только:",
    privacy_s7_l1: "технические файлы cookie (корзина, сессия, безопасность)",
    privacy_s7_note: "Рекламные или маркетинговые файлы cookie для отслеживания не используются. При первом посещении может появиться информационный баннер.",
    privacy_s8_title: "8. Безопасность",
    privacy_s8_intro: "Мы применяем строгие меры для защиты ваших данных:",
    privacy_s8_l1: "шифрование HTTPS / TLS 1.3",
    privacy_s8_l2: "анти-бот защиты",
    privacy_s8_l3: "расширенные заголовки безопасности (CSP, HSTS, X-Frame-Options и т.д.)",
    privacy_s8_l4: "безопасная инфраструктура Vercel",
    privacy_s8_l5: "платежи, сертифицированные PCI-DSS, через Stripe",
    privacy_s8_note: "Банковские данные не хранятся на сайте.",
    privacy_s9_title: "9. Передача за пределы ЕС",
    privacy_s9_text: "Хостинг Vercel может включать обработку за пределами Европейского Союза. Эти передачи регулируются гарантиями, соответствующими GDPR.",
    privacy_s10_title: "10. Контакт",
    privacy_s10_text: "По любым вопросам, касающимся ваших персональных данных:",
    privacy_s11_title: "11. Правовые ссылки и жалобы",
    privacy_s11_text1: "Эта политика составлена в соответствии с <a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">Общим регламентом по защите данных (GDPR)</a> и <a href=\"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031701594\" target=\"_blank\" rel=\"noopener\">Законом о защите данных</a>.",
    privacy_s11_text2: "Данные, необходимые для выставления счетов, хранятся в течение 10 лет в соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">статьей L123-22 Коммерческого кодекса</a>.",
    privacy_s11_text3: "Вы можете подать жалобу в <a href=\"https://www.cnil.fr/fr/plaintes\" target=\"_blank\" rel=\"noopener\">CNIL</a>.",

    // === FAQ ===
    faq_title: "❓ Часто задаваемые вопросы",
    faq_delivery: "📦 Доставка",
    faq_ship_time: "Какое время отправки?",
    faq_ship_time_text: "Товары отправляются быстро, обычно в течение 24-48 часов в зависимости от их наличия.",
    faq_delivery_time: "Каковы сроки доставки?",
    faq_delivery_time_text: "Доставка занимает в среднем 2-5 рабочих дней после отправки, в зависимости от перевозчика и района доставки.",
    faq_zones: "Какие районы обслуживаются?",
    faq_zones_text: "Доставка осуществляется в континентальную Францию через опции, предлагаемые Vinted или доступными перевозчиками.",
    faq_tracking: "Как отследить мою посылку?",
    faq_tracking_text: "Номер отслеживания предоставляется при отправке, когда он доступен. Вы можете отслеживать свою посылку напрямую через сайт перевозчика или через Vinted.",
    faq_delay_lost: "Что делать в случае задержки или потери посылки?",
    faq_delay_lost_text: "Свяжитесь со службой поддержки клиентов GUILLET IV. С перевозчиком будет открыто расследование.",
    faq_payment: "🔒 Безопасная оплата",
    faq_payment_q: "Как происходит оплата?",
    faq_payment_text: "Все транзакции безопасны и осуществляются через Vinted или Stripe.",
    faq_bank_protection: "Защищены ли мои банковские данные?",
    faq_bank_protection_text: "Да. Ваши банковские данные никогда не хранятся GUILLET IV. Обработка полностью управляется безопасными платежными платформами.",
    faq_payment_methods: "Какие способы оплаты принимаются?",
    faq_payment_methods_intro: "В зависимости от платформы:",
    faq_payment_card: "Кредитная карта",
    faq_payment_apple_google: "Apple Pay / Google Pay (Stripe)",
    faq_payment_vinted: "Встроенная оплата Vinted",
    faq_refund: "🔁 Возврат и возврат средств",
    faq_return_q: "Могу ли я вернуть товар?",
    faq_return_text: "Да. В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">статьей L221-18 Потребительского кодекса</a> у вас есть 14 дней, чтобы запросить возврат.",
    faq_how_return: "Как сделать возврат?",
    faq_how_return_text: "Свяжитесь с продавцом, чтобы получить инструкции и адрес возврата. Продукт должен быть возвращен в исходном состоянии.",
    faq_return_fees: "Расходы на возврат за мой счет?",
    faq_return_fees_text: "В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">статьей L221-23 Потребительского кодекса</a> расходы на возврат несет клиент, за исключением ошибки продавца или дефектного продукта.",
    faq_refund_q: "Как происходит возврат средств?",
    faq_refund_text: "Возврат средств обрабатывается согласно правилам Vinted или напрямую продавцом. В соответствии со <a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">статьей L221-24 Потребительского кодекса</a> возврат средств происходит в течение максимум 14 дней с момента уведомления об отказе и не позднее, чем после получения продукта или доказательства его отправки.",
    faq_refund_refused_q: "В каких случаях может быть отказано в возврате средств?",
    faq_refund_refused_1: "Продукт поврежден клиентом",
    faq_refund_refused_2: "Неполный продукт",
    faq_refund_refused_3: "Продукт использовался или был изменен",
    faq_warranty: "🛡️ Гарантия",
    faq_warranty_q: "Что покрывает 24-месячная гарантия?",
    faq_warranty_text: "Коммерческая гарантия покрывает производственные дефекты и неисправности, не связанные с пользователем.",
    faq_legal_warranty_q: "Каковы законные гарантии?",
    faq_legal_warranty_intro: "Все продукты автоматически пользуются:",
    faq_legal_warranty_1: "<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">2-летней законной гарантией соответствия</a>,",
    faq_legal_warranty_2: "<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">гарантией скрытых дефектов</a>.",
    faq_not_covered_q: "Что не покрывается?",
    faq_not_covered_1: "Нормальный износ",
    faq_not_covered_2: "Ущерб, вызванный неправильным использованием",
    faq_not_covered_3: "Удары, жидкости, небрежность",
    faq_not_covered_4: "Несанкционированные модификации или ремонт",
    faq_claim_warranty_q: "Как заявить о гарантии?",
    faq_claim_warranty_intro: "Свяжитесь со службой поддержки клиентов с:",
    faq_claim_warranty_1: "вашим номером заказа,",
    faq_claim_warranty_2: "описанием проблемы,",
    faq_claim_warranty_3: "фотографиями или видео дефекта.",
    faq_service: "📞 Обслуживание клиентов",
    faq_contact_q: "Как связаться с GUILLET IV?",
    faq_contact_text: "📧 Электронная почта: lanceglorieuse@gmail.com — Ответ в течение 48 часов.",

    // === CONTACT ===
    contact_title: "✉️ Свяжитесь с нами",
    contact_intro: "Вопрос? Проект? Не стесняйтесь писать нам.",
    phone: "Телефон",
    location: "Местоположение",
    france_ille: "Франция, Иль-э-Вилен",
    hours: "Часы работы",
    your_name: "Ваше имя",
    your_email: "Ваш адрес электронной почты",
    your_message: "Ваше сообщение...",
    send_message: "Отправить сообщение",
    message_prepared: "Ваше сообщение подготовлено. Теперь вы можете отправить его через приложение электронной почты.",
    footer_location: "📍 Иль-э-Вилен · 🕒 9:00 – 20:00",
    footer_payment: "🔒 Безопасная оплата — 🚚 Быстрая доставка",
    copyright: "© 2026 GUILLET IV — Орден Независимости",
    follow_tiktok: "🎵 Подписывайтесь на нас в TikTok",
    back_top: "Наверх",
    open_chat: "Открыть чат советов",
    advice_chat: "🤖 Советы GUILLET IV",
    ask_question: "Задайте мне вопрос...",

    // === PREVENTION HARASSMENT ===
    prevention_harassment: "🛡️ Профилактика харассмента",
    harassment_is_crime: "Харассмент — это преступление. Это разрушает жизни.",
    harassment_intro_2: "Будь то физический, психологический или виртуальный, французский закон сурово наказывает виновных.",
    harassment_intro_3: "Вот наказания, предусмотренные в одиночку или в организованной группе.",
    moral_harassment: "💻 Моральный харассмент",
    school_harassment: "🎓 Школьный харассмент",
    sexual_harassment: "🤬 Сексуальный харассмент",
    organized_group: "🚨 В организованной группе",
    where_help: "📞 Где найти помощь?",
    moral_harassment_desc: "Повторяющиеся слова или поведение, унижающие условия жизни, вызывающие ухудшение физического или психического здоровья.",
    basic_penalty: "Базовое наказание",
    aggravating_simple: "Простое отягчающее обстоятельство",
    two_aggravating: "Два совокупных отягчающих обстоятельства",
    up_to_10_years: "До 10 лет + 300 000 €",
    organized_group_desc: "каждый участник может быть привлечен к ответственности, даже за одно сообщение, если установлен коллективный характер харассмента.",
    school_harassment_desc: "Моральный харассмент, совершенный учеником или сотрудником в отношении ученика того же учебного заведения.",
    itt_over_8: "ITT > 8 дней",
    victim_suicide: "Если жертва совершает самоубийство или пытается покончить с собой",
    school_harassment_note: "Факты остаются наказуемыми даже после окончания учебы.",
    sexual_harassment_desc: "Повторяющиеся слова или поведение сексуального или сексистского характера, унижающие достоинство или создающие запугивающую, враждебную или оскорбительную ситуацию.",
    organized_group_law: "🚨 В организованной группе: что говорит закон",
    collective_responsibility: "⚖️ Коллективная ответственность",
    collective_desc: "Харассмент в Интернете или в группе является отягчающим обстоятельством. Даже если вы отправили только одно сообщение, поставили лайк или поделились контентом харассмента, вы можете быть привлечены к ответственности.",
    online_moral_harassment: "Моральный харассмент в Интернете",
    sexual_harassment_multiple: "Сексуальный харассмент несколькими людьми",
    multiple_aggravating: "Харассмент с несколькими отягчающими обстоятельствами",
    law_punishes_each: "Закон наказывает каждого участника, а не только лидера.",
    dont_stay_alone: "⚠️ Не оставайтесь один. Говорите.",
    call_3018: "📞 3018 — Бесплатный, анонимный номер, 7 дней в неделю (9:00-23:00)",
    report_17cyber: "🌐 17Cyber.gouv.fr — Сообщение онлайн",
    report_17cyber_btn: "🚨 Сообщить на 17Cyber",
    call_3018_btn: "📞 Позвонить 3018",
    prevention_footer_note: "Информация из французского Уголовного кодекса (Légifrance). Последнее обновление: 2026.",

    // === CHATBOT ===
    chat_hello: "👋 Здравствуйте и добро пожаловать в <strong>GUILLET IV</strong>!",
    chat_prompt: "Задайте мне вопрос:",
    chat_unknown: "Я не уверен, что понимаю 🤔",
    chat_menu_title: "Вот все разделы сайта:",
    chat_parrainage_reply: "🤝 Откройте счет Boursorama, подпишитесь на Starlink, зарегистрируйтесь на Vinted, в Crédit Agricole или Octopus Energy по моим реферальным ссылкам: информация заполняется автоматически!",
    chat_contact_reply: "📞 Мы доступны с 9:00 до 20:00 по телефону <strong>07.80.20.47.49</strong>.",
    chat_delivery_reply: "🚚 Доставка <strong>быстрая и безопасная</strong>.",
    chat_drone_reply: "🎥 <strong>Дрон KY108</strong> (89€).",
    chat_proj_reply: "💡 <strong>Солнечный светодиодный прожектор</strong> (35€).",
    chat_endo_reply: "🔍 <strong>Эндоскоп</strong> (95€).",
    chat_beauty_reply: "💅 Раздел <strong>Ногти и красота</strong>.",
    chat_price_reply: "💰 Дрон: 89€ • Прожектор: 35€ • Зимний набор: 99,99€ • Эндоскоп: 95€ • Премиум набор безопасности: 350€",
    chat_thanks_reply: "Пожалуйста! 🙏",
    chat_btn_home: "🏠 Главная",
    chat_btn_shop: "🛒 Магазин",
    chat_btn_vinted: "👕 Vinted",
    chat_btn_beauty: "💅 Ногти и красота",
    chat_btn_parrainage: "🤝 Реферальная программа",
    chat_btn_about: "📜 О нас",
    chat_btn_contact: "✉️ Контакты",
    chat_btn_faq: "❓ FAQ",
    chat_btn_cyber: "🛡️ Кибербезопасность",
    chat_btn_harass: "🚨 Харассмент",
    chat_btn_see: "Посмотреть",
    chat_btn_see_section: "Посмотреть раздел",
    chat_btn_all_pages: "📋 Все страницы",
    chat_btn_prices: "💶 Посмотреть цены",
    chat_btn_contact_me: "📞 Связаться с вами",
    chat_btn_delivery: "🚚 Доставка",
    chat_btn_menu: "📋 Меню страниц"
  },

  zh: {
    // === NAV & HEADER ===
    maintenance: "维护中",
    maintenance_motto: "GUILLET IV 网站目前正在维护中。我们将很快回来。",
    maintenance_info: "⏳ 正在施工 — 感谢您的耐心",
    contact_us: "📧 联系我们",
    order_independence: "独立秩序",
    search_product: "搜索产品",
    clear_search: "清除搜索",
    matching_products: "匹配的产品",
    toggle_mode: "切换浅色/深色模式",
    nav_home: "🏠 首页",
    nav_about: "📜 关于",
    nav_shop: "🛒 商店",
    nav_vinted: "👕 Vinted",
    nav_beauty: "💅 美甲与美容",
    nav_parrainage: "🤝 推荐",
    nav_cyber: "🛡️ 网络安全",
    nav_harassment: "🚨 骚扰",
    nav_contact: "✉️ 联系方式",
    nav_faq: "❓ 常见问题",
    nav_cgv: "📄 条款",
    nav_privacy: "📄 隐私",
    nav_legal: "⚖️ 法律与安全",
    
    // === MARQUEE ===
    marquee_welcome: "✨ 欢迎来到 GUILLET IV — 独立秩序 ✨",
    marquee_delivery: "🚚 快速安全的配送",
    marquee_payment: "🛡️ 100% 安全支付",
    marquee_motto: "👑 创造你的道路。捍卫你的自主权。建设未来。",
    marquee_products: "💎 为自主和实用生活挑选的产品",
    marquee_warranty: "🛡️ 我们所有产品均有 2 年保修",
    marquee_music: "🎵 探索我们的独家音乐精选",

    // === AUDIO ===
    site_music: "🎵 网站音乐",
    choose_music: "选择音乐",
    track_genetiquement: "[FR] 🧬 Génétiquement Modifier",
    track_polygone: "[FR] 🔷 Polygone",
    track_quelques_notes: "[FR] 🎵 Quelques notes",
    track_bilar_phoenix: "[FR] 🔥 Bilar – Phénix",
    track_cenza: "[FR] 🕶️ Cenza – Inconnu",
    track_confinement: "[FR] 🧪 Bilar – ConFinement n°2",
    track_dark_blues: "[EN] 🌑 Dark Blues.Vol",
    track_iam: "[FR] 🌍 IAM – La fin de leur monde",
    track_issaba: "[FR] ⚡ Issaba – Tu connais",
    track_kery: "[FR] 📜 Kery James – Post-Scriptum",
    track_exit: "[FR] 🧬 L'EXI-T – Venom Zirko / HYPERTHYMÉSIE",
    track_sakage: "[FR] 🌒 Sakage – Prémice",
    track_sks_tsunami_2: "[FR] ⚡ SKS Crew – Tsunami 2",
    track_sks_tsunami: "[FR] 🌊 SKS Crew – Tsunami",
    track_sks: "[FR] 💥 SKS CREW",
    track_mysa_ralliement: "[FR] 🚩 Mysa – Le Ralliement",
    track_rockin_luta: "[FR] ✊ Rockin'Squat – A Luta Continua",
    track_rockin_eternel: "[FR] 📚 Rockin'Squat – Eternel Apprenti",
    track_rcknsqt_verlaine: "[FR] 🖋️ RCKNSQT – VERLAINE",
    track_mysa_autopsy: "[FR] 🩸 Mysa – Autopsy",
    track_fourmiliere: "[FR] 🐜 La fourmilière – Sourire",
    track_shurikn: "[FR] 🗡️ Shurikn – Samouraï",
    track_proser: "[FR] 🔥 Proser – La Rage (Monf x Poups)",
    track_rohff: "[FR] ⚔️ Rohff – Fitna",
    track_mysa_fou: "[FR] 🧠 Mysa – Comme Un Fou",
    track_mysa_dystopie: "[FR] 🏙️ Mysa – Dystopie19",
    track_mysa_mortel: "[FR] 💀 Mysa – Mortel",
    track_mysa_piqure: "[FR] 💉 Mysa – Piqûre de Rappel",
    track_mysa_revolu: "[FR] 🔁 Mysa – Révolu",
    track_millesime: "[FR] 🏛️ Millésime K – République",
    track_rockin_aimer: "[FR] ❤️ Rockin'Squat – Aimer Sans Posséder",
    track_rockin_ils: "[FR] 💔 Rockin'Squat – Ils Ne Veulent Pas Aimer",
    track_rcknsqt_vocab: "[FR] 🔤 RCKNSQT – VOCAB",
    track_miyagi_kosandra: "[RU] 🌌 Miyagi & Andy Panda – Kosandra",
    track_miyagi_capitaine: "[RU] ⚓ Miyagi – Capitaine",
    track_miyagi_tumani: "[RU] 🎭 Miyagi – Tumani / YO / KADI / Bismarck",

    // === HERO / DOCTRINE ===
    motto: "“创造你的道路。捍卫你的自主权。建设未来。”",
    baseline: "企业 · 创业独立运动 · 愿景",
    doctrine_title: "⚔️ GUILLET IV 信条",
    doctrine_desc: "GUILLET IV 汇聚了企业的力量、身份的力量和运动的愿景。我们的创始原则：不要等待你的位置，而是通过行动、纪律和创造来建立它。",
    authority: "🖤 权威",
    authority_desc: "黑色代表自我控制、严谨和坚实。",
    willpower: "❤️ 意志",
    willpower_desc: "红色代表能量、勇气和决心。",
    legitimacy: "👑 合法性",
    legitimacy_desc: "金色象征创造的价值、要求和认可。",
    vision: "🚀 愿景",
    vision_desc: "蓝色开启创新和未来之路。",
    authenticity: "🌑 真实性",
    authenticity_desc: "原始真相，真实身份，毫不掩饰或妥协的你。",
    revelation: "✨ 启示",
    revelation_desc: "揭示隐藏事物的光。觉醒、理解、清晰。",
    truth: "⚡ 真理",
    truth_desc: "直线，正确的话，不撒谎也不颤抖。",
    awareness: "🧠 意识",
    awareness_desc: "清醒，高度，看清外表之外的能力。",
    power: "🜂 力量",
    power_desc: "行动的能力，强加你的方向，改变你的环境。",
    discipline: "🜁 纪律",
    discipline_desc: "秩序、结构、铸就成功的恒心。",
    creation: "🜄 创造",
    creation_desc: "生产、创新、建造尚不存在的事物的艺术。",
    ascension: "🜃 上升",
    ascension_desc: "上升、进化、超越自我和极限。",

    // === SHOP ===
    shop_title: "🛒 GUILLET IV 商店",
    shop_intro: "为自主、安全、户外和实用生活挑选的产品。",
    no_products: "没有产品符合此搜索。",
    see_more: "查看更多",
    see_less: "收起",
    full_desc: "完整描述",
    details: "详情",
    utility: "实用性",
    how_to_use: "如何使用",
    features: "功能",

    // Drone
    drone_title: "KY108 无人机 – 未来的眼睛掌握在你手中",
    drone_tagline: "主宰天空……否则它将主宰你。成为不需要看见的眼睛。",
    drone_desc: "专为创作者、探险家和雄心勃勃的飞行员设计的无人机。以手术般的精准度捕捉世界。",
    drone_full_1: "KY108 不仅仅是一架无人机：它是一种视觉工具，一种掌控工具，一个将每次飞行都变成未来体验的空中盟友。",
    drone_full_2: "凭借其双高清摄像头、90 倍变焦、全向避障和无刷电机，它为您提供同类产品中很少有无人机能匹敌的稳定性和动力。",
    drone_full_3: "可折叠、紧凑、智能：KY108 随时准备跟随你到任何地方。",
    drone_detail_1: "带 90 倍变焦的双高清摄像头",
    drone_detail_2: "全向避障",
    drone_detail_3: "强大耐用的无刷电机",
    drone_detail_4: "带集成 FPV 屏幕的遥控器",
    drone_detail_5: "可折叠无人机，易于运输",
    drone_util_1: "高清拍摄风景",
    drone_util_2: "为 TikTok 和 Instagram 创作内容",
    drone_util_3: "在尊重隐私的情况下监控区域",
    drone_util_4: "学习无人机驾驶",
    drone_util_5: "拍摄专业航拍照片",
    drone_use_1: "展开无人机并检查螺旋桨。",
    drone_use_2: "打开遥控器。",
    drone_use_3: "连接高清摄像头。",
    drone_use_4: "在辅助模式下起飞。",
    drone_use_5: "通过集成的 FPV 屏幕驾驶。",
    drone_use_note: "请记住遵守适用的飞行规则和被拍摄者的隐私。",
    cart_89: "💳 加入购物车 — 89 €",

    // Projector
    proj_title: "旋转太阳能 LED 投影仪",
    proj_desc: "带 PIR 传感器和旋转面板的户外太阳能 LED 投影仪。",
    proj_full_1: "由太阳能电池板供电的户外 LED 投影仪，配备 PIR 传感器和旋转面板。",
    proj_util_1: "保护入口安全",
    proj_util_2: "照亮黑暗区域",
    proj_util_3: "阻止入侵",
    proj_util_4: "无需电力即可工作",
    proj_use_1: "将投影仪固定在墙上",
    proj_use_2: "调整 LED 面板的方向",
    proj_use_3: "调整 PIR 传感器",
    proj_use_4: "让太阳能电池板充电",
    cart_35: "💳 加入购物车 — 35 €",

    // Winter Pack
    badge_winter: "冬季套装",
    pack_title: "冬季生存包 – 高级版",
    pack_desc: "应对冬季、保持温暖、照明和自主的终极套装。",
    pack_item_1: "🧤 1. 智能电加热手套 (USB)",
    pack_item_1_desc: "高性能冬季手套，旨在提供即时和受控的热量。",
    pack_item_1_b1: "手掌双面加热",
    pack_item_1_b2: "三个可调温度等级",
    pack_item_1_b3: "触摸屏设计",
    pack_item_1_b4: "USB 接口操作，兼容充电宝",
    pack_item_2: "🔦 2. 强力 LED 手电筒 – USB 可充电 (x2)",
    pack_item_2_desc: "超亮战术灯，适用于停电、夜间旅行、汽车。",
    pack_item_2_b1: "7 种灯光模式",
    pack_item_2_b2: "USB 可充电",
    pack_item_2_b3: "内置电池",
    pack_item_2_b4: "耐候性",
    pack_item_3: "🔋 3. 12,000 mAh 充电宝 – USB 加热专用",
    pack_item_3_desc: "高容量充电宝，兼容所有 USB 设备和加热服装。",
    pack_item_3_b1: "12,000 mAh → 持久续航",
    pack_item_3_b2: "5V 2.4A 输出",
    pack_item_3_b3: "兼容 iPhone / Samsung / iPad",
    pack_item_4: "🛏️ 4. 多季木乃伊睡袋 (210 × 75 cm)",
    pack_item_4_desc: "轻便、紧凑、舒适的睡袋，非常适合露营和紧急情况。",
    pack_item_4_b1: "一体式风帽",
    pack_item_4_b2: "坚固的 170T 涤纶",
    pack_item_4_b3: "可折叠成被子 / 毯子",
    pack_item_4_b4: "包含储物袋",
    cart_9999: "💳 加入购物车 — 99,99 €",

    // Endoscope
    badge_new: "新品",
    endo_title: "带屏幕的检测摄像头内窥镜",
    endo_desc: "1080P 检测内窥镜，带 4.3 英寸集成屏幕、10 米半刚性电缆、200 万像素摄像头、可调 LED 照明和 IP68 防水设计。",
    endo_full_1: "检查难以到达区域（管道、发动机、管道、导管、技术安装或狭窄空间）的必备工具。",
    endo_util_1: "检查发动机、管道和管道",
    endo_util_2: "家庭装修：管道、通风、布线",
    endo_util_3: "快速机械诊断",
    endo_util_4: "在黑暗区域进行视觉控制",
    endo_feat_1: "全高清 1080P 分辨率",
    endo_feat_2: "200 万像素摄像头，带可调 LED 照明",
    endo_feat_3: "4.3 英寸集成屏幕",
    endo_feat_4: "10 米半刚性电缆",
    endo_feat_5: "IP68 防水认证",
    cart_95: "💳 加入购物车 — 95 €",

    // Security Pack
    badge_security: "🛡️ 安全套装",
    pack_secu_title: "高级安全套装",
    pack_secu_tagline: "全面保护。10 分钟安装。交钥匙。",
    pack_secu_promo: "限时促销",
    pack_secu_desc: "使用 AI 摄像头、完整警报器、4 个传感器和即用型系统保护您的整个家庭。非常适合个人和小型企业。",
    pack_secu_full_1: "高级安全套装汇集了保护房屋、公寓、企业、车库、地窖或办公室所需的一切——无需技术技能或复杂布线。一切均已配置好：您安装、连接，10 分钟即可完成。",
    pack_secu_contents: "📦 套装内容（确切）",
    pack_secu_c1: "1 个 Tiiwee 警报器（警笛 + 遥控器）",
    pack_secu_c2: "1 个 TP-Link Tapo C245D AI 摄像头（夜视 + 检测）",
    pack_secu_c3: "4 个 SONOFF 门窗传感器（门 / 窗 / 车库 / 阳台）",
    pack_secu_c4: "安装指南",
    pack_secu_c5: "30 天协助",
    pack_secu_f1: "智能手机即时警报",
    pack_secu_f2: "智能检测 (AI)",
    pack_secu_f3: "强力警笛",
    pack_secu_f4: "高清夜视",
    pack_secu_f5: "实时监控",
    pack_secu_f6: "高精度传感器",
    pack_secu_secure_for: "保护",
    pack_secu_s1: "🏠 房屋",
    pack_secu_s2: "🏢 公寓",
    pack_secu_s3: "🏪 企业",
    pack_secu_s4: "🚗 车库",
    pack_secu_s5: "🕳️ 地窖",
    pack_secu_s6: "💼 办公室",
    pack_secu_use_1: "插入 Tiiwee 警报器和 Tapo 摄像头。",
    pack_secu_use_2: "将 4 个 SONOFF 传感器粘贴在门 / 窗 / 车库 / 阳台上。",
    pack_secu_use_3: "将设备连接到应用程序（Tapo + SONOFF）。",
    pack_secu_use_4: "配置智能手机警报。",
    pack_secu_use_5: "测试警笛和检测。10 分钟即可完成。",
    pack_secu_warranty_support: "保修与支持",
    pack_secu_ws1: "24 个月保修",
    pack_secu_ws2: "30 天客户支持",
    pack_secu_ws3: "需要时提供安装协助",
    pack_secu_why: "为什么选择此套装？",
    pack_secu_why_text: "因为它通过 AI 摄像头、完整警报器、4 个传感器和即用型系统保护您的整个家庭。交钥匙套装 — 非常适合个人和小型企业。",
    cart_pack_secu: "💳 加入购物车 — 350 €",

    // === INFO & REVIEWS ===
    guarantees: "🛡️ 保修与服务",
    warranty_24: "✔ 保修：24 个月",
    secure_payment: "✔ 安全支付",
    fast_delivery: "✔ 快速配送",
    reviews_title: "⭐ 客户评价 (Vinted)",
    review_zohra: "谢谢",
    review_limitless_1: "很高兴一切完美，GUILLET IV 🔥",
    review_zlatoff: "一切都好，谢谢",
    review_limitless_2: "感恩 🤲 谢谢",

    // === ABOUT ===
    learn_more: "🏢 了解更多",
    company_movement: "企业 · 运动 · 独立",
    about_intro: "GUILLET IV 是一家企业和创业独立运动。它捍卫每个人都能够通过工作、创造和自主来建立自己的道路的理念。",
    about_service: "我在 Vinted 上销售（个人资料：limitless95），拥有 5 星评价、响应迅速的客户服务，并致力于提供严肃、展示良好的产品和真正的商店体验。",
    about_contact: "如有任何问题，请通过“联系方式”页面或直接在 Vinted 上与我联系。",
    contact_me: "✉️ 联系我",
    view_my_vinted: "👕 查看我的 Vinted",
    back_home: "⬅ 返回首页",
    brand_king: "👑 GUILLET IV",
    back_shop: "⬅ 返回商店",

    // === SPONSORSHIP ===
    parrainage_title: "🤝 推荐",
    parrainage_sub: "Boursorama · Starlink · Vinted · Crédit Agricole · Octopus Energy",
    parrainage_intro: "使用我的推荐链接开设账户、订阅服务或在 Vinted 上注册。信息会自动预填，您可以享受优惠！",
    parrainage_boursorama_title: "🏦 Boursorama 推荐",
    parrainage_boursorama_text: "使用我的推荐链接开设您的 Boursorama 账户：我的信息将自动填写，您无需重新输入。而且您可以享受欢迎奖金！",
    boursorama_b1: "开户即赠欢迎奖金",
    boursorama_b2: "零账户维护费",
    boursorama_b3: "100% 在线注册，只需几分钟",
    parrainage_btn_boursorama: "🏦 开设我的 Boursorama 账户",
    parrainage_starlink_title: "🛰️ Starlink 推荐",
    parrainage_starlink_text: "使用我的推荐链接订阅 Starlink，即可享受一个月的免费订阅。通过卫星提供高速互联网，无处不在，即使在偏远地区也是如此。",
    starlink_b1: "一个月免费订阅",
    starlink_b2: "在任何地方提供高速互联网，即使在偏远地区",
    starlink_b3: "安装简单快捷",
    parrainage_btn_starlink: "🛰️ 订阅 Starlink",
    parrainage_vinted_title: "👕 Vinted 推荐",
    parrainage_vinted_text: "使用我的邀请链接在 Vinted 上注册并加入社区。购买、出售并赋予您的衣服第二次生命，同时享受欢迎优惠。",
    vinted_b1: "首次订单享受欢迎优惠",
    vinted_b2: "只需点击几下即可出售您的衣服",
    vinted_b3: "安全的配送和支付",
    parrainage_btn_vinted: "👕 加入 Vinted",
    parrainage_credit_agricole_title: "🏛️ Crédit Agricole 推荐",
    parrainage_credit_agricole_text: "您想在 Crédit Agricole 开户吗？使用我的一次性推荐码并点击链接了解您的优惠。",
    credit_agricole_b1: "开户即享欢迎优惠",
    credit_agricole_b2: "遍布法国的本地银行",
    credit_agricole_b3: "一次性推荐码 EGYYLFH",
    parrainage_btn_credit_agricole: "🏛️ 开设我的 Crédit Agricole 账户",
    parrainage_octopus_title: "🐙 Octopus Energy 推荐",
    parrainage_octopus_text: "使用我的推荐链接加入 Octopus Energy，享受电费优惠。更绿色、更简单、更便宜的能源。",
    octopus_b1: "电费享受欢迎优惠",
    octopus_b2: "100% 可再生能源和公平的价格",
    octopus_b3: "响应迅速的客户服务，无承诺",
    parrainage_btn_octopus: "🐙 加入 Octopus Energy",
    parrainage_step1_title: "点击链接",
    parrainage_step1_text: "您将被重定向到官方注册页面（Boursorama、Starlink、Vinted、Crédit Agricole 或 Octopus Energy），并且已经集成了我的推荐码。",
    parrainage_step2_title: "您的信息已预填",
    parrainage_step2_text: "我的推荐信息会自动填写。您只需填写您的信息即可。",
    parrainage_step3_title: "验证您的注册",
    parrainage_step3_text: "在几分钟内完成您的开户、订阅或注册，并享受优惠。",
    parrainage_step4_title: "双赢",
    parrainage_step4_text: "您获得欢迎优惠，我也获得。真正的双赢。",
    parrainage_note_title: "ℹ️ 了解详情：",
    parrainage_note_text: "推荐链接是 Boursorama、Starlink、Vinted、Crédit Agricole 和 Octopus Energy 的官方链接。开设 Boursorama 账户免费且无承诺。奖金和优惠受每项服务的条件约束。Crédit Agricole 代码 EGYYLFH 是一次性的。",

    // === VINTED PAGE ===
    my_vinted: "👕 我的 Vinted",
    vinted_intro: "查找我的已验证销售、5 星评价以及 Vinted 上的可用产品。",
    verified_reviews: "已验证的 Vinted 评价",
    vinted_desc: "我在 Vinted 上是 limitless95。我提供严肃、展示良好的商品，并提供响应迅速的客户服务。",
    view_vinted_profile: "👕 查看我的 Vinted 个人资料",

    // === BEAUTY PAGE ===
    beauty_title: "💅 美甲与美容 — SHAYNAILS",
    beauty_sub: "优雅 · 呵护 · 在 Guignen 线下",
    beauty_intro: "仅在 Guignen 线下提供服务。通过电话或 Instagram 预约。",
    beauty_prices_title: "💶 价目表",
    beauty_presentiel_note: "⚠️ 仅在 Guignen 线下提供服务 — 不进行在线销售。",
    beauty_gallery_title: "✨ 客户作品",
    beauty_video_title: "🎬 视频",
    video_fallback: "您的浏览器不支持视频播放。",
    beauty_book_title: "📅 预约服务",
    beauty_book_text: "所有服务均在 Guignen 线下进行。<br>通过电话或 Instagram 预约。",
    click_photo_zoom: "💡 点击照片放大",

    // === CYBERSECURITY PAGE ===
    cyber_title: "🛡️ 网络安全防范",
    cyber_subtitle: "法国的计算机攻击",
    cyber_intro: "网络钓鱼、数据盗窃、欺诈访问和身份盗窃：了解风险有助于更好地保护您的账户、设备和个人信息。",
    cyber_intro_2: "防范结合了谨慎的习惯、适当的技术保护以及在事件发生时快速反应。",
    prevention_themes: "📋 防范主题",
    cyber_step1: "🔑 第 1 步 — 保存的密码",
    cyber_step2: "🎣 第 2 步 — 社会工程与网络钓鱼",
    cyber_step3: "💻 第 3 步 — 针对密码的攻击",
    cyber_step4: "🗝️ 第 4 步 — 钥匙照片与物理安全",
    cyber_step5: "👤 第 5 步 — 个人信息",
    cyber_step6: "⚖️ 第 6 步 — 法国法律与黑客行为",
    cyber_step7: "📨 第 7 步 — 网络钓鱼、欺诈与身份",
    cyber_step8: "🗂️ 第 8 步 — 个人数据与 GDPR",
    cyber_step9: "✅ 第 9 步 — 授权的安全测试",
    cyber_step10: "🚨 第 10 步 — 发生事件时该怎么办？",
    cyber_conclusion: "🏁 总体结论",
    cyber_s1_title: "🔑 第 1 步 — 保存的密码：舒适、保护与警惕",
    cyber_s1_p1: "将密码保存在文本文件、未受保护的笔记或共享文档中，如果文件被盗或设备被入侵，就会暴露您的账户。",
    cyber_s2_title: "🎣 第 2 步 — 社会工程与网络钓鱼：您可能是目标",
    cyber_s2_p1: "网络钓鱼是一种技术，包括冒充受信任的人或组织，以获取信息、付款或冒险行动。",
    cyber_s3_title: "💻 第 3 步 — 针对密码的攻击",
    cyber_s3_p1: "猜测或重用密码的尝试有多种形式，并非所有形式都以相同方式起作用。",
    cyber_s4_title: "🗝️ 第 4 步 — 钥匙照片与物理安全",
    cyber_s4_p1: "发布房屋、车库或车辆钥匙的详细照片可能会泄露对恶意人员有用的特征。",
    cyber_s5_title: "👤 第 5 步 — 个人信息与隐私",
    cyber_s5_p1: "避免使用基于容易找到或猜测的细节的密码。",
    cyber_s6_title: "⚖️ 第 6 步 — 法国法律：欺诈访问、黑客行为与制裁",
    cyber_s6_p1: "在法国，对自动化数据处理系统 (STAD) 的攻击主要由《刑法》第 323-1 条及后续条款规定。",
    cyber_s7_title: "📨 第 7 步 — 网络钓鱼、欺诈与身份盗窃",
    cyber_s7_p1: "网络钓鱼描述了一种方法，本身并不构成犯罪的最终定性。",
    cyber_s8_title: "🗂️ 第 8 步 — 个人数据、GDPR 与安全义务",
    cyber_s8_p1: "处理个人数据的组织必须特别实施适当的安全措施。",
    cyber_s9_title: "✅ 第 9 步 — 审计与安全测试：获得明确授权",
    cyber_s9_p1: "审计、渗透测试或漏洞搜索必须在授权的框架内进行。",
    cyber_s10_title: "🚨 第 10 步 — 如果账户或设备被入侵怎么办？",
    cyber_s10_p1: "从健康的设备更改相关密码以及被重用的密码。",
    cyber_conclusion_title: "🏁 总体结论",
    cyber_conclusion_p1: "网络犯罪分子可以利用技术漏洞，也可以利用信任、习惯和在线共享的信息。",

    // === LEGAL & SECURITY AUDIT ===
    legal_notice: "⚖️ 法律声明与安全",
    legal_info: "1. 法律信息",
    legal_company: "公司名称：",
    legal_status: "状态：",
    legal_address: "地址：",
    legal_hosting: "2. 网站托管",
    legal_ip: "3. 知识产权",
    legal_ip_p1: "网站的所有内容（文本、图像、设计、徽标、结构）均为 GUILLET IV 的专有财产。",
    legal_ip_p2: "严禁未经授权复制、分发或利用。",
    legal_data_title: "4. 个人数据",
    legal_data_p1: "收集的数据（姓名、电子邮件、地址、电话）仅用于订单处理和客户支持。",
    legal_data_p2: "在法国或其他地方，任何个人数据均不会传输、出售、共享或传达给公司、平台、第三方服务或国家机构。",
    legal_data_p3: "根据 GDPR，您可以随时通过以下方式请求删除或修改您的数据：lanceglorieuse@gmail.com。",
    legal_cookies_title: "5. Cookie",
    legal_cookies_p1: "网站可能会使用技术性 Cookie 来改善用户体验（购物车、显示偏好）。",
    legal_cookies_p2: "未使用广告 Cookie。",
    legal_liability_title: "6. 责任",
    legal_liability_p1: "除非有直接过错的证据，否则 GUILLET IV 不对与使用网站或产品相关的损害承担责任。",
    legal_disputes_title: "7. 争议",
    legal_disputes_p1: "如果发生争议，将优先寻求友好解决方案。",
    legal_disputes_p2: "否则，法国法院将具有管辖权。",
    security_audit_title: "🛡️ 技术安全审计 (Nmap & curl)",
    security_audit_subtitle: "🔐 Shop de Légende 网站的安全性",
    security_audit_p1: "Shop de Légende 严格监控访客和客户的安全。网站应用了先进、严格且不可绕过的保护措施，以保证可靠的导航、安全的支付和完全的机密性。",
    security_audit_p2: "使用 Nmap 和 curl 进行的深入技术分析证实，网站没有缺陷、没有危险元素、没有数据暴露，并且检测到的所有机制都是正常和预期的保护措施。",
    security_audit_p3: "👉 没有风险，没有威胁，没有异常。",
    security_audit_1_title: "🔒 安全连接 (HTTPS / TLS 1.3)",
    security_audit_1_p1: "网站使用最严格的安全标准：",
    security_audit_1_l1: "完整数据加密",
    security_audit_1_l2: "防拦截保护",
    security_audit_1_l3: "自动重定向到 HTTPS",
    security_audit_1_l4: "TLS 1.3 协议，国际银行标准",
    security_audit_1_footer: "👉 Nmap 确认端口 443 已打开、安全且不存在漏洞。",
    security_audit_2_title: "🛡️ 针对攻击的高级保护 (CSP)",
    security_audit_2_p1: "网站的 Content Security Policy 阻止：",
    security_audit_2_l1: "恶意脚本",
    security_audit_2_l2: "代码注入",
    security_audit_2_l3: "未经授权的资源",
    security_audit_2_l4: "黑客尝试",
    security_audit_2_footer: "👉 Nmap 的 http-headers 扫描确认了完整、严格且锁定的 CSP。未检测到危险行为。",
    security_audit_3_title: "🧱 反欺诈与反点击劫持",
    security_audit_3_footer: "👉 主动保护，不可绕过，防止任何界面劫持尝试。",
    security_audit_4_title: "🔐 使用 Stripe 的安全支付",
    security_audit_4_p1: "支付由认证银行解决方案 Stripe 处理：",
    security_audit_4_l1: "PCI-DSS 合规",
    security_audit_4_l2: "完整加密",
    security_audit_4_l3: "不保留银行数据",
    security_audit_4_l4: "卡从不存储在网站上",
    security_audit_4_footer: "👉 Nmap 确认 Stripe 端点安全、有效且无风险。",
    security_audit_5_title: "🧭 增强隐私",
    security_audit_5_p1: "网站应用严格政策：",
    security_audit_5_l1: "Referrer Policy: <code>strict-origin-when-cross-origin</code>",
    security_audit_5_l2: "Permissions Policy: 无摄像头、无麦克风、无地理定位",
    security_audit_5_l3: "X-Content-Type-Options: <code>nosniff</code>",
    security_audit_5_l4: "Cross-Origin-Opener-Policy: <code>same-origin</code>",
    security_audit_5_l5: "Cross-Origin-Embedder-Policy: <code>credentialless</code>",
    security_audit_5_l6: "Cross-Origin-Resource-Policy: <code>same-origin</code>",
    security_audit_5_footer: "👉 这些保护措施是积极的、严格的，并且对访客没有负面影响。",
    security_audit_6_title: "🌍 防止外部网站访问 (CORS)",
    security_audit_6_p1: "网站仅允许其自己的域名：",
    security_audit_6_footer: "👉 无泄露，无未经授权的外部访问。",
    security_audit_7_title: "🧪 Vercel 上的安全托管",
    security_audit_7_p1: "网站受益于 Vercel 的保护：",
    security_audit_7_l1: "增强的安全性",
    security_audit_7_l2: "自动更新",
    security_audit_7_l3: "DDoS 保护",
    security_audit_7_l4: "可靠的全球基础设施",
    security_audit_7_l5: "活跃的反机器人系统",
    security_audit_7_footer: "👉 Nmap 检测到：X-Vercel-Challenge-Token、X-Vercel-Mitigated: challenge、Vercel Security Checkpoint。这些机制是正常的、自动的，并且从不涉及人类访客。",
    security_audit_8_title: "🛠️ 持续监控与维护",
    security_audit_8_p1: "网站受到以下约束：",
    security_audit_8_l1: "定期审计",
    security_audit_8_l2: "技术更新",
    security_audit_8_l3: "SSL 检查",
    security_audit_8_l4: "反攻击测试",
    security_audit_8_footer: "👉 分析证实了持续、积极的安全，没有缺陷。",
    security_audit_9_title: "📡 技术验证 (Nmap & curl)",
    security_audit_9_p1: "外部分析显示：",
    security_audit_9_l1: "没有缺陷",
    security_audit_9_l2: "没有危险方法",
    security_audit_9_l3: "没有不必要的端口",
    security_audit_9_l4: "没有信息泄露",
    security_audit_9_l5: "没有暴露的服务",
    security_audit_9_l6: "没有异常行为",
    security_audit_9_l7: "对访客没有风险",
    security_audit_9_nmap1_title: "✔️ Nmap — http-headers",
    security_audit_9_nmap1_text: "检测到的标头：完整的 CSP、活动的 HSTS、X-Frame-Options、Permissions-Policy、Referrer-Policy、X-Content-Type-Options、严格的 CORS、Vercel 保护。",
    security_audit_9_nmap1_footer: "👉 所有这些元素都是保护措施。没有危险。",
    security_audit_9_nmap2_title: "✔️ Nmap — http-methods",
    security_audit_9_nmap2_text: "GET, HEAD, POST, OPTIONS",
    security_audit_9_nmap2_footer: "👉 没有危险方法。",
    security_audit_9_nmap3_title: "✔️ Nmap — http-title",
    security_audit_9_nmap3_text: "Site doesn't have a title (text/plain)",
    security_audit_9_nmap3_footer: "👉 正常的技术响应。对访客没有影响。",
    security_audit_9_nmap4_title: "✔️ Nmap — http-security-headers",
    security_audit_9_nmap4_text: "Nmap 确认：HSTS、严格的 CSP、X-Frame-Options、X-Content-Type-Options、安全的 Cache-Control。",
    security_audit_9_nmap4_footer: "👉 符合 OWASP 标准的安全性。",
    security_audit_9_nmap5_title: "✔️ Nmap — http-server-header",
    security_audit_9_nmap5_text: "Server: Vercel",
    security_audit_9_nmap5_footer: "👉 正常且安全。",
    security_audit_9_nmap6_title: "✔️ Nmap — fingerprint",
    security_audit_9_nmap6_text: "400 Bad Request · 404 Not Found · DEPLOYMENT_NOT_FOUND",
    security_audit_9_nmap6_footer: "👉 Vercel 对异常请求的内部响应。没有危险。",
    security_audit_9_nmap7_title: "✔️ Nmap — http-enum",
    security_audit_9_nmap7_text: "443/tcp open https",
    security_audit_9_nmap7_footer: "👉 没有敏感资源、没有隐藏页面、没有暴露的服务。",
    security_audit_9_curl_title: "✔️ Curl 结果",
    security_audit_9_curl_text: "Curl 仅显示：保护措施、安全标头、反机器人机制。",
    security_audit_9_curl_footer: "👉 没有异常，没有缺陷，没有风险。",
    security_conclusion_title: "🟢 坚定结论",
    security_conclusion_p1: "Nmap 和 curl 分析证明：",
    security_conclusion_l1: "网站是安全的",
    security_conclusion_l2: "保护措施是积极的",
    security_conclusion_l3: "不存在任何缺陷",
    security_conclusion_l4: "未检测到任何危险元素",
    security_conclusion_l5: "没有任何东西影响访客",
    security_conclusion_l6: "配置是专业的、严格的且合规的",
    security_conclusion_final: "👉 Shop de Légende 是一个高度安全、可靠且受保护的网站。",
    security_engagement_title: "安全承诺",
    security_engagement_p1: "作为一名<strong>专业渗透测试员</strong>，我掌握安全漏洞和攻击机制。该网站的设计、开发和审计要求与银行环境相同。",
    security_engagement_p2: "如果您是安全研究人员、开发人员或好奇的用户，并且检测到异常、漏洞或可疑行为，请<strong>立即联系我</strong>：",
    security_engagement_phone: "<strong>电话：</strong> <a href=\"tel:0780204749\">07.80.20.47.49</a>",
    security_engagement_email: "<strong>电子邮件：</strong> <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a>",
    security_engagement_thanks: "提前感谢您的警惕和对本网站安全的贡献。🙏",

    // === CGV ===
    terms_sale: "📄 销售条款 – GUILLET IV",
    cgv_object: "1. 目的",
    cgv_object_text1: "本销售条款规范 GUILLET IV 商店提供的产品销售。",
    cgv_object_text2: "任何订单均意味着完全接受本条款。",
    cgv_products: "2. 产品",
    cgv_products_text1: "所提供的产品描述尽可能精确。",
    cgv_products_text2: "照片不具合同效力。",
    cgv_products_text3: "每个产品页面上均标明了可用性。",
    cgv_price: "3. 价格",
    cgv_price_text1: "价格以欧元 (€) 表示，含所有税费 (TTC)。",
    cgv_price_text2: "卖家保留随时修改价格的权利，但产品将按订单验证时生效的价格计费。",
    cgv_order: "4. 订单",
    cgv_order_text1: "客户选择他们希望购买的产品，验证购物车，然后进行付款。",
    cgv_order_text2: "订单确认将通过电子邮件发送。",
    cgv_order_text3: "如果出现付款问题或先前发生争议，卖家保留拒绝订单的权利。",
    cgv_payment: "5. 付款",
    cgv_payment_text1: "通过 <a href=\"https://stripe.com/fr\" target=\"_blank\" rel=\"noopener\">Stripe</a> 或 <a href=\"https://www.vinted.fr\" target=\"_blank\" rel=\"noopener\">Vinted</a> 提供的选项进行安全付款。",
    cgv_payment_text2: "GUILLET IV 从不保留银行数据。",
    cgv_delivery: "6. 配送",
    cgv_delivery_text1: "产品根据其可用性快速发货。",
    cgv_delivery_text2: "指示性时间：2 至 5 个工作日。",
    cgv_delivery_text3: "服务区域：法国本土。",
    cgv_delivery_text4: "在可用时可以提供追踪号码。",
    cgv_delivery_text5: "如果发生延迟或丢失，客户必须联系卖家寻求帮助。",
    cgv_retractation: "7. 撤销权（14 天）",
    cgv_retractation_text1: "根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-18 条</a>，客户有 14 天的时间行使撤销权，无需说明理由。",
    cgv_retractation_text2: "产品必须以其原始状态退回。",
    cgv_retractation_text3: "根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-23 条</a>，直接退货费用由客户承担，除非是卖家的错误。",
    cgv_retractation_text4: "根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-24 条</a>，退款将在通知撤销后最多 14 天内完成，最迟在收回产品或证明其已发货后完成。",
    cgv_return: "8. 退货与退款",
    cgv_return_text1: "退货必须发送至卖家提供的地址。",
    cgv_return_text2: "退款遵循 Vinted 或 Stripe 规则，具体取决于购买方式。",
    cgv_return_text3: "对于客户损坏的产品，不予退款。",
    cgv_legal_warranties: "9. 法定保证",
    cgv_legal_warranties_text: "卖家适用<a href=\"https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006069565\" target=\"_blank\" rel=\"noopener\">《消费者法典》</a>和<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">《民法典》</a>规定的强制性法定保证。",
    cgv_conformity: "10. 法定保证",
    cgv_conformity_text1: "<strong>法定合规保证（2 年）：</strong>根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L217-3 条及后续条款</a>，客户享有涵盖交货时存在的合规缺陷的保证。",
    cgv_conformity_text2: "<strong>隐藏缺陷保证：</strong>根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">《民法典》第 1641 条</a>，卖家必须保证使产品不适合其预期用途或大大降低这种用途的隐藏缺陷。",
    cgv_conformity_text3: "<strong>可能的商业保证：</strong>如果 GUILLET IV 提供商业保证，其条件、期限、范围和实施将在产品页面或随产品提供的文件中说明。",
    cgv_conformity_exclude_title: "法定保证不包括：",
    cgv_conformity_exclude1: "正常磨损；",
    cgv_conformity_exclude2: "因误用造成的损坏；",
    cgv_conformity_exclude3: "产品修改。",
    cgv_data: "11. 个人数据 (GDPR)",
    cgv_data_text1: "收集的数据（姓名、电子邮件、地址、电话）仅用于订单处理和客户支持，符合<a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">GDPR</a>。",
    cgv_data_text2: "数据不出售或共享。",
    cgv_data_text3: "客户可以通过 <a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a> 请求访问、更正、可携带性或删除其数据。",
    cgv_liability: "12. 责任",
    cgv_liability_text1: "卖家仅对与缺陷产品相关的直接损害负责。",
    cgv_liability_text2: "他们不对间接损害（数据丢失、经济损失等）负责。",
    cgv_service: "13. 客户服务",
    cgv_service_text: "如有任何问题：<a href=\"mailto:lanceglorieuse@gmail.com\">lanceglorieuse@gmail.com</a> — 48 小时内回复。",
    cgv_mediation: "14. 调解",
    cgv_mediation_text1: "如果发生争议，将优先寻求友好解决方案。",
    cgv_mediation_text2: "如果未达成协议，客户可以通过 <a href=\"https://www.economie.gouv.fr/mediation-conso\" target=\"_blank\" rel=\"noopener\">economie.gouv.fr/mediation-conso</a> 免费联系消费者调解员。",
    cgv_law: "15. 适用法律",
    cgv_law_text1: "本条款受法国法律管辖。",
    cgv_law_text2: "如果发生争议，法国法院将具有管辖权，并遵守适用于消费者的管辖权规则。",

    // === PRIVACY ===
    privacy_title: "📄 隐私政策 (GDPR)",
    privacy_intro: "保护您的个人数据是我们的首要任务。本政策说明了收集了哪些数据、为什么收集、如何保护以及如何行使您的权利。",
    privacy_s1_title: "1. 收集的数据",
    privacy_s1_intro: "我们仅收集网站运营和订单处理所必需的数据：",
    privacy_s1_l1: "姓氏、名字",
    privacy_s1_l2: "邮政地址",
    privacy_s1_l3: "电子邮件",
    privacy_s1_l4: "电话号码",
    privacy_s1_l5: "订单信息",
    privacy_s1_l6: "IP 地址（安全和欺诈预防）",
    privacy_s1_note: "不收集敏感数据。",
    privacy_s2_title: "2. 处理目的",
    privacy_s2_intro: "您的数据用于：",
    privacy_s2_l1: "处理和运送您的订单",
    privacy_s2_l2: "提供客户支持",
    privacy_s2_l3: "管理您的客户账户",
    privacy_s2_l4: "保护网站安全并防止欺诈",
    privacy_s2_l5: "遵守法律义务（开具发票）",
    privacy_s3_title: "3. 法律依据",
    privacy_s3_intro: "处理基于：",
    privacy_s3_l1: "履行合同（订单）",
    privacy_s3_l2: "合法利益（安全、反欺诈）",
    privacy_s3_l3: "同意（非必要 Cookie）",
    privacy_s4_title: "4. 处理者",
    privacy_s4_intro: "为确保网站运营，某些提供商可能会处理您的数据：",
    privacy_s4_l1: "Vercel（网站托管）",
    privacy_s4_l2: "Stripe / PayPal（安全支付）",
    privacy_s4_l3: "电子邮件服务（订单确认）",
    privacy_s4_note: "这些提供商遵守 GDPR 或具有同等的保证。",
    privacy_s5_title: "5. 保留期限",
    privacy_s5_l1: "处理和开具订单发票所需的数据：10 年，根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">《商法典》第 L123-22 条</a>。",
    privacy_s5_l2: "不活跃客户数据：3 年",
    privacy_s5_l3: "技术性 Cookie：13 个月",
    privacy_s6_title: "6. 您的权利",
    privacy_s6_intro: "根据 GDPR，您拥有以下权利：",
    privacy_s6_l1: "访问您的数据",
    privacy_s6_l2: "更正",
    privacy_s6_l3: "删除",
    privacy_s6_l4: "反对",
    privacy_s6_l5: "可携带性",
    privacy_s6_contact: "行使您的权利：lanceglorieuse@gmail.com",
    privacy_s7_title: "7. Cookie",
    privacy_s7_intro: "网站仅使用：",
    privacy_s7_l1: "技术性 Cookie（购物车、会话、安全）",
    privacy_s7_note: "未使用广告或营销跟踪 Cookie。首次访问时可能会出现信息横幅。",
    privacy_s8_title: "8. 安全",
    privacy_s8_intro: "我们采取严格措施保护您的数据：",
    privacy_s8_l1: "HTTPS / TLS 1.3 加密",
    privacy_s8_l2: "反机器人保护",
    privacy_s8_l3: "高级安全标头（CSP、HSTS、X-Frame-Options 等）",
    privacy_s8_l4: "安全的 Vercel 基础设施",
    privacy_s8_l5: "通过 Stripe 进行 PCI-DSS 认证的支付",
    privacy_s8_note: "网站上不存储任何银行数据。",
    privacy_s9_title: "9. 欧盟以外的传输",
    privacy_s9_text: "Vercel 托管可能涉及欧盟以外的处理。这些传输受符合 GDPR 的保证框架约束。",
    privacy_s10_title: "10. 联系方式",
    privacy_s10_text: "有关您的个人数据的任何问题：",
    privacy_s11_title: "11. 法律参考和投诉",
    privacy_s11_text1: "本政策根据<a href=\"https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679\" target=\"_blank\" rel=\"noopener\">《通用数据保护条例》(GDPR)</a>和<a href=\"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031701594\" target=\"_blank\" rel=\"noopener\">《数据保护法》</a>制定。",
    privacy_s11_text2: "开具发票所需的数据保留 10 年，根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006316689/\" target=\"_blank\" rel=\"noopener\">《商法典》第 L123-22 条</a>。",
    privacy_s11_text3: "您可以向 <a href=\"https://www.cnil.fr/fr/plaintes\" target=\"_blank\" rel=\"noopener\">CNIL</a> 提出投诉。",

    // === FAQ ===
    faq_title: "❓ 常见问题",
    faq_delivery: "📦 配送",
    faq_ship_time: "发货时间是多久？",
    faq_ship_time_text: "商品发货迅速，通常根据其可用性在 24 到 48 小时内发货。",
    faq_delivery_time: "交货时间是多久？",
    faq_delivery_time_text: "根据承运人和交货区域的不同，发货后平均需要 2 到 5 个工作日送达。",
    faq_zones: "提供哪些区域的配送？",
    faq_zones_text: "通过 Vinted 或可用承运人提供的选项，在法国本土提供配送服务。",
    faq_tracking: "如何追踪我的包裹？",
    faq_tracking_text: "发货时会提供追踪号码（如果有）。您可以直接通过承运人的网站或通过 Vinted 追踪您的包裹。",
    faq_delay_lost: "如果发生延迟或包裹丢失怎么办？",
    faq_delay_lost_text: "联系 GUILLET IV 客户服务。将与承运人展开调查。",
    faq_payment: "🔒 安全支付",
    faq_payment_q: "付款如何进行？",
    faq_payment_text: "所有交易均通过 Vinted 或 Stripe 安全进行。",
    faq_bank_protection: "我的银行数据受到保护吗？",
    faq_bank_protection_text: "是的。GUILLET IV 从不存储您的银行数据。处理完全由安全的支付平台管理。",
    faq_payment_methods: "接受哪些付款方式？",
    faq_payment_methods_intro: "取决于平台：",
    faq_payment_card: "信用卡",
    faq_payment_apple_google: "Apple Pay / Google Pay (Stripe)",
    faq_payment_vinted: "集成 Vinted 支付",
    faq_refund: "🔁 退货与退款",
    faq_return_q: "我可以退货吗？",
    faq_return_text: "是的。根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-18 条</a>，您有 14 天的时间要求退货。",
    faq_how_return: "如何退货？",
    faq_how_return_text: "联系卖家以获取说明和退货地址。产品必须以其原始状态退回。",
    faq_return_fees: "退货运费由我承担吗？",
    faq_return_fees_text: "根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226830/2016-08-10\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-23 条</a>，退货运费由客户承担，除非是卖家错误或产品有缺陷。",
    faq_refund_q: "退款如何进行？",
    faq_refund_text: "退款根据 Vinted 规则或由卖家直接处理。根据<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226828/2024-11-16\" target=\"_blank\" rel=\"noopener\">《消费者法典》第 L221-24 条</a>，退款在通知撤销后最多 14 天内进行，最迟在收回产品或证明其已发货后进行。",
    faq_refund_refused_q: "在什么情况下可以拒绝退款？",
    faq_refund_refused_1: "客户损坏的产品",
    faq_refund_refused_2: "不完整的产品",
    faq_refund_refused_3: "使用过或修改过的产品",
    faq_warranty: "🛡️ 保修",
    faq_warranty_q: "24 个月保修涵盖哪些内容？",
    faq_warranty_text: "商业保修涵盖非用户造成的制造缺陷和故障。",
    faq_legal_warranty_q: "法定保证有哪些？",
    faq_legal_warranty_intro: "所有产品自动享有：",
    faq_legal_warranty_1: "<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142579\" target=\"_blank\" rel=\"noopener\">2 年法定合规保证</a>，",
    faq_legal_warranty_2: "<a href=\"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006441924/1976-01-01\" target=\"_blank\" rel=\"noopener\">隐藏缺陷保证</a>。",
    faq_not_covered_q: "哪些不在保修范围内？",
    faq_not_covered_1: "正常磨损",
    faq_not_covered_2: "因误用造成的损坏",
    faq_not_covered_3: "撞击、液体、疏忽",
    faq_not_covered_4: "未经授权的修改或维修",
    faq_claim_warranty_q: "如何申请保修？",
    faq_claim_warranty_intro: "联系客户服务并提供：",
    faq_claim_warranty_1: "您的订单号，",
    faq_claim_warranty_2: "问题描述，",
    faq_claim_warranty_3: "缺陷的照片或视频。",
    faq_service: "📞 客户服务",
    faq_contact_q: "如何联系 GUILLET IV？",
    faq_contact_text: "📧 电子邮件：lanceglorieuse@gmail.com — 48 小时内回复。",

    // === CONTACT ===
    contact_title: "✉️ 联系我们",
    contact_intro: "有疑问？有项目？请随时给我们写信。",
    phone: "电话",
    location: "位置",
    france_ille: "法国，伊勒-维莱讷省",
    hours: "营业时间",
    your_name: "您的名字",
    your_email: "您的电子邮件地址",
    your_message: "您的留言...",
    send_message: "发送消息",
    message_prepared: "您的消息已准备好。您现在可以通过电子邮件应用程序发送它。",
    footer_location: "📍 伊勒-维莱讷省 · 🕒 上午 9 点 – 晚上 8 点",
    footer_payment: "🔒 安全支付 — 🚚 快速配送",
    copyright: "© 2026 GUILLET IV — 独立秩序",
    follow_tiktok: "🎵 在 TikTok 上关注我们",
    back_top: "返回顶部",
    open_chat: "打开咨询聊天",
    advice_chat: "🤖 GUILLET IV 咨询",
    ask_question: "问我一个问题...",

    // === PREVENTION HARASSMENT ===
    prevention_harassment: "🛡️ 骚扰防范",
    harassment_is_crime: "骚扰是一种犯罪。它摧毁生命。",
    harassment_intro_2: "无论是身体上、心理上还是虚拟的，法国法律都会严厉惩罚肇事者。",
    harassment_intro_3: "以下是单独或团伙作案所面临的刑罚。",
    moral_harassment: "💻 精神骚扰",
    school_harassment: "🎓 校园骚扰",
    sexual_harassment: "🤬 性骚扰",
    organized_group: "🚨 团伙作案",
    where_help: "📞 去哪里寻求帮助？",
    moral_harassment_desc: "反复贬低生活条件的言语或行为，导致身心健康受损。",
    basic_penalty: "基本刑罚",
    aggravating_simple: "简单加重情节",
    two_aggravating: "两个累积加重情节",
    up_to_10_years: "最高 10 年 + 300,000 €",
    organized_group_desc: "如果确立了骚扰的集体性质，每个参与者都可能被起诉，即使只发了一条消息。",
    school_harassment_desc: "学生或教职员工对同一学校的学生实施的精神骚扰。",
    itt_over_8: "ITT > 8 天",
    victim_suicide: "如果受害者自杀或企图自杀",
    school_harassment_note: "即使在学业结束后，事实仍然应受惩罚。",
    sexual_harassment_desc: "反复带有性意味或性别歧视的言语或行为，损害尊严或造成恐吓、敌意或冒犯性的环境。",
    organized_group_law: "🚨 团伙作案：法律如何规定",
    collective_responsibility: "⚖️ 集体责任",
    collective_desc: "在线或团体骚扰是加重情节。即使您只发了一条消息、点赞或分享了骚扰内容，您也可能被起诉。",
    online_moral_harassment: "在线精神骚扰",
    sexual_harassment_multiple: "多人性骚扰",
    multiple_aggravating: "具有多个加重情节的骚扰",
    law_punishes_each: "法律惩罚每个参与者，而不仅仅是头目。",
    dont_stay_alone: "⚠️ 不要独自承受。说出来。",
    call_3018: "📞 3018 — 免费、匿名电话，每周 7 天（上午 9 点至晚上 11 点）",
    report_17cyber: "🌐 17Cyber.gouv.fr — 在线报告",
    report_17cyber_btn: "🚨 在 17Cyber 上报告",
    call_3018_btn: "📞 拨打 3018",
    prevention_footer_note: "信息来自法国刑法典 (Légifrance)。最后更新：2026 年。",

    // === CHATBOT ===
    chat_hello: "👋 您好，欢迎来到 <strong>GUILLET IV</strong>！",
    chat_prompt: "问我一个问题：",
    chat_unknown: "我不确定我明白了 🤔",
    chat_menu_title: "以下是网站的所有部分：",
    chat_parrainage_reply: "🤝 使用我的推荐链接开设 Boursorama 账户、订阅 Starlink、在 Vinted、Crédit Agricole 或 Octopus Energy 上注册：信息会自动预填！",
    chat_contact_reply: "📞 我们的服务时间为上午 9 点至晚上 8 点，电话 <strong>07.80.20.47.49</strong>。",
    chat_delivery_reply: "🚚 配送<strong>快速且安全</strong>。",
    chat_drone_reply: "🎥 <strong>KY108 无人机</strong>（89€）。",
    chat_proj_reply: "💡 <strong>太阳能 LED 投影仪</strong>（35€）。",
    chat_endo_reply: "🔍 <strong>内窥镜</strong>（95€）。",
    chat_beauty_reply: "💅 <strong>美甲与美容</strong>部分。",
    chat_price_reply: "💰 无人机：89€ • 投影仪：35€ • 冬季套装：99.99€ • 内窥镜：95€ • 高级安全套装：350€",
    chat_thanks_reply: "不客气！🙏",
    chat_btn_home: "🏠 首页",
    chat_btn_shop: "🛒 商店",
    chat_btn_vinted: "👕 Vinted",
    chat_btn_beauty: "💅 美甲与美容",
    chat_btn_parrainage: "🤝 推荐",
    chat_btn_about: "📜 关于",
    chat_btn_contact: "✉️ 联系方式",
    chat_btn_faq: "❓ 常见问题",
    chat_btn_cyber: "🛡️ 网络安全",
    chat_btn_harass: "🚨 骚扰",
    chat_btn_see: "查看",
    chat_btn_see_section: "查看部分",
    chat_btn_all_pages: "📋 查看所有页面",
    chat_btn_prices: "💶 查看价格",
    chat_btn_contact_me: "📞 联系您",
    chat_btn_delivery: "🚚 配送",
    chat_btn_menu: "📋 页面菜单"
  }
};

(function(){
  "use strict";

  var ORI_TEXT = new WeakMap(); var ORI_ATTR = new WeakMap(); var ORI_HTML = new WeakMap(); var CURRENT_LANG = "fr";
  function getDict(lang){ return lang === "fr" ? null : (window.TRANSLATIONS[lang] || null); }
  window.__getDict = function(){ return getDict(CURRENT_LANG); };

  function trNode(node, dict){
    if (!ORI_TEXT.has(node)) ORI_TEXT.set(node, node.nodeValue);
    var original = ORI_TEXT.get(node); if (!original || !original.trim()) return;
    if (CURRENT_LANG === "fr") { node.nodeValue = original; return; }
    var p = node.parentElement;
    if (p && p.dataset && p.dataset.i18n && dict && dict[p.dataset.i18n]) { node.nodeValue = dict[p.dataset.i18n]; return; }
    var t = original.trim();
    if (dict && Object.prototype.hasOwnProperty.call(dict, t)) {
      var lead = original.match(/^\s*/)[0], trail = original.match(/\s*$/)[0];
      node.nodeValue = lead + dict[t] + trail;
    } else node.nodeValue = original;
  }

  function trTree(root, dict){
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        var p = node.parentElement; if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.tagName; if (["SCRIPT","STYLE","NOSCRIPT","CODE","TEXTAREA"].indexOf(tag) !== -1) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n; while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function(node){ trNode(node, dict); });
  }

  function applyAll(){
    var dict = getDict(CURRENT_LANG);
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.dataset.i18n;
      if (!ORI_HTML.has(el)) ORI_HTML.set(el, el.innerHTML);
      if (CURRENT_LANG === "fr") { el.innerHTML = ORI_HTML.get(el); }
      else if (dict && dict[key]) { el.textContent = dict[key]; }
      else { el.innerHTML = ORI_HTML.get(el); }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){
      var key = el.dataset.i18nPlaceholder;
      if (!ORI_ATTR.has(el)) ORI_ATTR.set(el, { ph: el.placeholder, aria: el.getAttribute("aria-label") });
      var o = ORI_ATTR.get(el);
      if (CURRENT_LANG === "fr") { el.placeholder = o.ph; }
      else if (dict && dict[key]) { el.placeholder = dict[key]; }
      else { el.placeholder = o.ph; }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){
      var key = el.dataset.i18nAria;
      if (!ORI_ATTR.has(el)) ORI_ATTR.set(el, { aria: el.getAttribute("aria-label") });
      var o = ORI_ATTR.get(el);
      if (CURRENT_LANG === "fr") { el.setAttribute("aria-label", o.aria); }
      else if (dict && dict[key]) { el.setAttribute("aria-label", dict[key]); }
      else { el.setAttribute("aria-label", o.aria); }
    });
    trTree(document.body, dict);
  }
  
  window.reapplyLanguage = function(){ applyAll(); };
  
  window.applyLanguage = function(lang){
    if (lang !== "fr" && !window.TRANSLATIONS[lang]) lang = "fr";
    CURRENT_LANG = lang; document.documentElement.lang = lang;
    if (typeof window.retranslateChat === "function") {
      window.retranslateChat();
    }
    applyAll();
    var sel = document.getElementById("langSelect"); if (sel) sel.value = lang;
    try { localStorage.setItem("guillet_lang", lang); } catch(e){}
  };
  
  window.changeLanguage = function(lang){ window.applyLanguage(lang); };

  document.addEventListener("DOMContentLoaded", function(){
    // 👉 CORRECTION ICI : On rebranche l'événement sur le menu déroulant
    var sel = document.getElementById("langSelect");
    if (sel) {
      sel.addEventListener("change", function(e) {
        window.changeLanguage(e.target.value);
      });
    }

    var saved = "fr"; try { saved = localStorage.getItem("guillet_lang") || "fr"; } catch(e){}
    if (!window.TRANSLATIONS[saved] && saved !== "fr") saved = "fr";
    if (saved !== "fr") setTimeout(function(){ window.applyLanguage(saved); }, 150);
  });
})();

(function(){
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVIGATION & UI GLOBALE
    // ==========================================
    window.navigateTo = function(p, a){
      if (a === undefined) a = null;
      document.querySelectorAll(".page-section").forEach(function(s){ s.classList.remove("active"); });
      var t = document.getElementById("page-" + p); if (t) t.classList.add("active");
      var newHash = "#" + p;
      if (location.hash !== newHash) history.pushState(null, null, newHash);
      document.querySelectorAll(".nav-link").forEach(function(l){ l.classList.remove("active-link"); if (l.getAttribute("href") === newHash) l.classList.add("active-link"); });
      if (a) { setTimeout(function(){ var b = document.getElementById(a); if (b) b.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); }
      else { window.scrollTo({ top: 0, behavior: "smooth" }); }
      if (typeof window.reapplyLanguage === "function") setTimeout(window.reapplyLanguage, 120);
    };

    // Délégation d'événements pour la navigation et les interactions UI
    document.body.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-nav]');
      if (navLink) {
        e.preventDefault();
        const target = navLink.getAttribute('data-nav');
        const section = navLink.getAttribute('data-section');
        window.navigateTo(target, section);
      }
      
      const zoomImg = e.target.closest('[data-zoom]');
      if (zoomImg) {
        e.preventDefault();
        window.ouvrirZoom(zoomImg.src);
      }
    });

    // Gestion de l'accessibilité au clavier (Entrée sur les éléments role=button)
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const navLink = e.target.closest('[data-nav]');
        if (navLink) {
          e.preventDefault();
          window.navigateTo(navLink.getAttribute('data-nav'), navLink.getAttribute('data-section'));
        }
        const zoomImg = e.target.closest('[data-zoom]');
        if (zoomImg) {
          e.preventDefault();
          window.ouvrirZoom(zoomImg.src);
        }
      }
    });

    const modeBtn = document.getElementById('themeToggleBtn');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        document.body.classList.toggle("light-mode");
        try { localStorage.setItem("guillet_mode", document.body.classList.contains("light-mode") ? "light" : "dark"); } catch(e){}
      });
    }

    // ==========================================
    // 2. RETOUR EN HAUT & SCROLL
    // ==========================================
    const topBtn = document.getElementById('top');
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    window.actualiserBoutonHaut = function(){
      var b = document.getElementById("top"); if (!b) return;
      var w = window.scrollY > 200;
      if (w) b.classList.add("visible");
      else b.classList.remove("visible");
    };
    window.addEventListener("scroll", window.actualiserBoutonHaut, { passive: true });

    // ==========================================
    // 3. AUDIO & MUSIQUE
    // ==========================================
    var pl = document.getElementById("player"), ms = document.getElementById("musicSelect"), mms = document.getElementById("miniMusicSelect"), mpb = document.getElementById("miniPlayBtn"), vol = document.getElementById("volumeSlider");
    var eq = document.getElementById("musicEq");
    var v = (function(){ try { var v0 = parseFloat(localStorage.getItem("guillet_volume")); return (!isNaN(v0) && v0 >= 0 && v0 <= 1) ? v0 : 1; } catch(e){ return 1; } })();
    
    if (pl) pl.volume = v;
    if (vol) vol.value = Math.round(v * 100);
    if (ms && mms) { mms.innerHTML = ms.innerHTML; mms.value = ms.value; }

    window.changerMusique = function(f){
      try { localStorage.setItem("guillet_track", f); } catch(e){}
      var p = !pl.paused && !pl.ended;
      pl.src = "Musique/" + encodeURIComponent(f); pl.load();
      if (ms) ms.value = f;
      if (mms) mms.value = f;
      pl.volume = v;
      if (p) pl.play().catch(function(){});
      updBtn();
    };
    
    window.togglePlayMusique = function(){
      if (pl.paused) pl.play().catch(function(){}); else pl.pause();
      updBtn();
    };

    function updBtn(){
      if (mpb) {
        if (pl.paused) {
          mpb.textContent = "▶";
          mpb.classList.remove("playing");
          if (eq) eq.classList.remove("visible");
        } else {
          mpb.textContent = "⏸";
          mpb.classList.add("playing");
          if (eq) eq.classList.add("visible");
        }
      }
    }

    if (mpb) mpb.addEventListener('click', window.togglePlayMusique);
    if (ms) ms.addEventListener('change', (e) => window.changerMusique(e.target.value));
    if (mms) mms.addEventListener('change', (e) => window.changerMusique(e.target.value));
    
    if (vol) vol.addEventListener("input", function(e){
      v = e.target.value / 100; pl.volume = v;
      try { localStorage.setItem("guillet_volume", String(v)); } catch(e2){}
    });
    if (pl) {
      pl.addEventListener("volumechange", function(){ if (vol) vol.value = Math.round(pl.volume * 100); });
      pl.addEventListener("play", updBtn);
      pl.addEventListener("pause", updBtn);
      pl.addEventListener("ended", updBtn);
    }
    updBtn();

    // ==========================================
    // 4. DETAILS PRODUITS (Voir plus)
    // ==========================================
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-toggle-details]');
      if (btn) {
        const d = btn.nextElementSibling;
        const o = btn.getAttribute("aria-expanded") !== "true";
        d.style.display = o ? "block" : "none";
        btn.setAttribute("aria-expanded", String(o));
        var dict = window.__getDict ? window.__getDict() : null;
        var key = o ? "see_less" : "see_more";
        var fb = o ? "Voir moins" : "Voir plus";
        btn.textContent = (dict && dict[key]) || fb;
      }
    });

    // ==========================================
    // 5. FORMULAIRE CONTACT
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var n = document.getElementById("nom"), em = document.getElementById("email"), m = document.getElementById("message");
        if (!n || !em || !m) return;
        var nv = n.value.trim(), ev = em.value.trim(), mv = m.value.trim();
        var dict = window.__getDict ? window.__getDict() : null;
        if (!nv || !ev || !mv) { alert((dict && dict["fill_all_fields"]) || "Veuillez remplir tous les champs."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ev)) { alert((dict && dict["invalid_email"]) || "Adresse email invalide."); return; }
        var mailto = "mailto:lanceglorieuse@gmail.com?subject=" + encodeURIComponent("Message de " + nv) + "&body=" + encodeURIComponent("Email : " + ev + "\n\n" + mv);
        var c = document.getElementById("confirmation");
        if (c) { c.hidden = false; c.style.display = "block"; }
        window.location.href = mailto;
      });
    }

    // ==========================================
    // 6. ZOOM IMAGES
    // ==========================================
    window.ouvrirZoom = function(s){
      window.ancienFocus = document.activeElement;
      document.getElementById("zoomImg").src = s;
      document.getElementById("zoomModal").style.display = "flex";
      document.querySelector(".zoom-close").focus();
    };
    window.fermerZoom = function(){
      document.getElementById("zoomModal").style.display = "none";
      if (window.ancienFocus) { window.ancienFocus.focus(); window.ancienFocus = null; }
    };

    const zoomModal = document.getElementById("zoomModal");
    if (zoomModal) {
      zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal || e.target.classList.contains('zoom-close')) {
          window.fermerZoom();
        }
      });
    }

    // ==========================================
    // 7. RECHERCHE
    // ==========================================
    const sf = document.getElementById("searchForm"), si = document.getElementById("searchInput"), sc = document.getElementById("clearSearch"), ss = document.getElementById("searchSuggestions"), sr = document.getElementById("searchResults"), sst = document.getElementById("searchStatus"), np = document.getElementById("noProducts");
    
    if (sf && si) {
      var fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
      function norm(t){ return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr").replace(/[’']/g, " ").replace(/[^\p{L}\p{N}]+/gu, " ").trim(); }
      
      var cards = Array.from(document.querySelectorAll(".product-card")).map(function(c){
        var n = c.dataset.name || "";
        var d = c.querySelector(".desc") ? c.querySelector(".desc").textContent : "";
        var det = c.querySelector(".details") ? c.querySelector(".details").textContent : "";
        return { carte: c, nom: n, prix: Number(c.dataset.price), texte: norm(n + " " + d + " " + det) };
      });
      var res = [], timer;
      
      function hide(){ if (ss) { ss.hidden = true; si.setAttribute("aria-expanded", "false"); } }
      function show(){ if (!si.value.trim()) { hide(); return; } if (ss) { ss.hidden = false; si.setAttribute("aria-expanded", "true"); } }
      
      function filter(showSuggestions){
        if (showSuggestions === undefined) showSuggestions = true;
        var r = norm(si.value), m = r.split(/\s+/).filter(Boolean);
        res = cards.filter(function(p){ return m.every(function(mot){ return p.texte.includes(mot); }); });
        cards.forEach(function(p){ p.carte.hidden = res.indexOf(p) === -1; });
        if (sc) sc.hidden = si.value.length === 0;
        if (np) np.hidden = m.length === 0 || res.length > 0;
        if (sr) sr.replaceChildren();
        if (!m.length) { if (sst) sst.textContent = ""; hide(); return; }
        var dict = window.__getDict ? window.__getDict() : null;
        if (sst) sst.textContent = res.length === 0 ? ((dict && dict["no_products_found"]) || "Aucun produit trouvé.") : res.length + " " + ((dict && dict["products_found"]) || "produit(s) trouvé(s).");
        
        if (!res.length) {
          var li = document.createElement("li"); li.className = "search-empty";
          li.textContent = (dict && dict["no_products_try"]) || "Aucun produit trouvé. Essaie un autre mot.";
          if (sr) sr.appendChild(li);
        } else {
          res.forEach(function(p){
            var li = document.createElement("li");
            var a = document.createElement("a");
            var n = document.createElement("span");
            var pr = document.createElement("span");
            a.className = "search-result"; a.href = "#" + p.carte.id;
            n.textContent = p.nom; pr.textContent = fmt.format(p.prix); pr.className = "search-result-price";
            a.append(n, pr); li.appendChild(a);
            if (sr) sr.appendChild(li);
            a.addEventListener("click", function(e){ 
              e.preventDefault(); 
              window.navigateTo("accueil");
              si.value = p.nom; filter(false); hide();
              cards.forEach(function(e){ e.carte.classList.remove("search-highlight"); });
              p.carte.classList.add("search-highlight");
              setTimeout(function(){ p.carte.focus({ preventScroll: true }); p.carte.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
              setTimeout(function(){ p.carte.classList.remove("search-highlight"); }, 2500);
            });
          });
        }
        if (showSuggestions) show();
      }
      
      si.addEventListener("input", function(){ clearTimeout(timer); timer = setTimeout(function(){ filter(); }, 200); });
      si.addEventListener("focus", function(){ if (si.value.trim()) filter(); });
      si.addEventListener("keydown", function(e){
        if (e.key === "ArrowDown") { var p = sr ? sr.querySelector("a") : null; if (p) { e.preventDefault(); show(); p.focus(); } }
        if (e.key === "Escape") hide();
      });
      sf.addEventListener("submit", function(e){
        e.preventDefault(); filter(false); hide();
        if (!si.value.trim()) return;
        if (res.length === 1) { 
          window.navigateTo("accueil");
          si.value = res[0].nom; filter(false); hide();
          res[0].carte.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        else { window.navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produits"); if (p) p.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); }
      });
      if (sc) sc.addEventListener("click", function(){ si.value = ""; filter(false); si.focus(); });
      document.addEventListener("click", function(e){ if (sf && !sf.contains(e.target)) hide(); });
    }

    // ==========================================
    // 8. CHATBOT
    // ==========================================
    const cw = document.getElementById("chatbot-window"), cm = document.getElementById("chat-messages"), ci = document.getElementById("chat-input"), cToggle = document.getElementById("chatbot-toggle"), cClose = document.querySelector(".chat-close"), cSend = document.getElementById("chat-send");
    
    window.toggleChatbot = function(){
      window.chatOuvert = !window.chatOuvert;
      if (window.chatOuvert) {
        if (cw) cw.classList.add("open");
        if (cm && cm.children.length === 0) initChat();
        var badge = document.getElementById("chatbot-badge");
        if (badge) badge.style.display = "none";
        try { localStorage.setItem("guillet_chat_opened", "1"); } catch(e){}
        setTimeout(function(){ if (ci) ci.focus(); }, 300);
      } else {
        if (cw) cw.classList.remove("open");
      }
    };

    if (cToggle) cToggle.addEventListener('click', window.toggleChatbot);
    if (cClose) cClose.addEventListener('click', window.toggleChatbot);
    
    if (ci) {
      ci.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.envoyerMessageChat(); });
    }
    if (cSend) {
      cSend.addEventListener('click', () => window.envoyerMessageChat());
    }

    function addMsgText(text, ty){
      if (!cm) return;
      var m = document.createElement("div");
      m.className = "chat-msg " + (ty || "user");
      m.textContent = text;
      cm.appendChild(m);
      cm.scrollTop = cm.scrollHeight;
    }

    function addMsg(html, ty, o, key){
      if (!cm) return;
      var m = document.createElement("div");
      m.className = "chat-msg " + (ty || "bot");
      if (key) m.dataset.i18nKey = key;
      m.innerHTML = html;
      cm.appendChild(m);
      if (o && o.length) {
        var z = document.createElement("div"); z.className = "chat-options";
        o.forEach(function(opt){
          var b = document.createElement("button");
          b.type = "button"; b.className = "chat-option"; b.textContent = opt.label;
          if (opt.labelKey) b.dataset.i18nKey = opt.labelKey;
          b.addEventListener('click', () => { addMsgText(opt.label, "user"); opt.action(); });
          z.appendChild(b);
        });
        cm.appendChild(z);
      }
      cm.scrollTop = cm.scrollHeight;
    }

    function reply(t, o, key){
      if (!cm) return;
      var m = document.createElement("div"); m.className = "chat-msg bot";
      m.innerHTML = '<span style="opacity:.6">…</span>';
      cm.appendChild(m); cm.scrollTop = cm.scrollHeight;
      setTimeout(function(){ m.remove(); addMsg(t, "bot", o, key); }, 500);
    }

    window.envoyerMessageChat = function(tF){
      if (tF === undefined) tF = null;
      var t = tF || (ci ? ci.value.trim() : ""); if (!t) return;
      if (!tF) addMsgText(t, "user");
      if (ci) ci.value = "";
      var dict = window.__getDict ? window.__getDict() : null;
      var m = match(t);
      
      if (m) {
        var txtKey = m.reponseKey;
        var txt = (dict && dict[txtKey]) ? dict[txtKey] : m.reponse;
        var opts = m.options ? m.options.map(function(o){
          return {
            label: (dict && dict[o.labelKey]) ? dict[o.labelKey] : o.label,
            labelKey: o.labelKey,
            action: o.action
          };
        }) : null;
        reply(txt, opts, txtKey);
      } else {
        var keyU = "chat_unknown";
        var defaultMsg = (dict && dict[keyU]) ? dict[keyU] : "Je ne suis pas sûr de bien comprendre 🤔";
        reply(defaultMsg, [
          { labelKey: "chat_btn_all_pages", label: "📋 Voir toutes les pages", action: function(){ window.envoyerMessageChat("menu"); } },
          { labelKey: "chat_btn_prices",    label: "💶 Voir les prix",         action: function(){ window.envoyerMessageChat("prix"); } },
          { labelKey: "chat_btn_contact_me",label: "📞 Vous contacter",        action: function(){ window.envoyerMessageChat("contact"); } },
          { labelKey: "chat_btn_delivery",  label: "🚚 Livraison",             action: function(){ window.envoyerMessageChat("livraison"); } }
        ], keyU);
      }
    };

    function initChat(){
      var dict = window.__getDict ? window.__getDict() : null;
      var helloKey = "chat_hello";
      var hello = (dict && dict[helloKey]) ? dict[helloKey] : "👋 Bonjour et bienvenue chez <strong>GUILLET IV</strong> !";
      setTimeout(function(){ addMsg(hello, "bot", null, helloKey); }, 200);
      setTimeout(function(){
        var promptKey = "chat_prompt";
        var prompt = (dict && dict[promptKey]) ? dict[promptKey] : "Posez-moi une question :";
        reply(prompt, [
          { labelKey: "chat_btn_menu",     label: "📋 Menu des pages", action: function(){ window.envoyerMessageChat("menu"); } },
          { labelKey: "chat_btn_prices",   label: "💶 Les prix",        action: function(){ window.envoyerMessageChat("prix"); } },
          { labelKey: "chat_btn_delivery", label: "🚚 Livraison",       action: function(){ window.envoyerMessageChat("livraison"); } }
        ], promptKey);
      }, 900);
    }

    var intents = [
      { intention: "menu", motsCles: ["menu","sommaire","tout","liste","pages"], reponseKey: "chat_menu_title", reponse: "Voici toutes les sections du site :", options: [
        { labelKey: "chat_btn_home", label: "🏠 Accueil", action: function(){ navigateTo("accueil"); toggleChatbot(); } },
        { labelKey: "chat_btn_shop", label: "🛒 Boutique", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produits"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } },
        { labelKey: "chat_btn_vinted", label: "👕 Vinted", action: function(){ navigateTo("vinted"); toggleChatbot(); } },
        { labelKey: "chat_btn_beauty", label: "💅 Ongles & Beauté", action: function(){ navigateTo("ongles-beaute"); toggleChatbot(); } },
        { labelKey: "chat_btn_parrainage", label: "🤝 Parrainage", action: function(){ navigateTo("parrainage"); toggleChatbot(); } },
        { labelKey: "chat_btn_about", label: "📜 À propos", action: function(){ navigateTo("apropos"); toggleChatbot(); } },
        { labelKey: "chat_btn_contact", label: "✉️ Contact", action: function(){ navigateTo("contact"); toggleChatbot(); } },
        { labelKey: "chat_btn_faq", label: "❓ FAQ", action: function(){ navigateTo("faq"); toggleChatbot(); } },
        { labelKey: "chat_btn_cyber", label: "🛡️ Cybersécurité", action: function(){ navigateTo("prevention-cyber"); toggleChatbot(); } },
        { labelKey: "chat_btn_harass", label: "🚨 Harcèlement", action: function(){ navigateTo("harcelement"); toggleChatbot(); } }
      ] },
      { intention: "parrainage", motsCles: ["parrainage","boursorama","starlink","vinted","credit","agricole","banque","compte","prime","parrain","internet","satellite","invitation","octopus","energie","électricité"], reponseKey: "chat_parrainage_reply", reponse: "🤝 Ouvre un compte Boursorama, souscris à Starlink, inscris-toi sur Vinted, au Crédit Agricole ou chez Octopus Energy avec mes liens de parrainage : les infos sont pré-remplies automatiquement !", options: [
        { labelKey: "chat_btn_parrainage", label: "🤝 Voir la page Parrainage", action: function(){ navigateTo("parrainage"); toggleChatbot(); } }
      ] },
      { intention: "contact", motsCles: ["horaire","telephone","mail","contact","appeler","numero","joindre"], reponseKey: "chat_contact_reply", reponse: "📞 Nous sommes disponibles de 9h à 20h au <strong>07.80.20.47.49</strong>." },
      { intention: "livraison", motsCles: ["livraison","envoi","delai","colis","recevoir","expedition"], reponseKey: "chat_delivery_reply", reponse: "🚚 La livraison est <strong>rapide et sécurisée</strong>." },
      { intention: "drone", motsCles: ["drone","ky108","camera","filmer","video"], reponseKey: "chat_drone_reply", reponse: "🎥 Le <strong>Drone KY108</strong> (89€).", options: [
        { labelKey: "chat_btn_see", label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-drone"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } }
      ] },
      { intention: "projecteur", motsCles: ["projecteur","lampe","pir","solaire"], reponseKey: "chat_proj_reply", reponse: "💡 Le <strong>Projecteur LED solaire</strong> (35€).", options: [
        { labelKey: "chat_btn_see", label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-projecteur"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } }
      ] },
      { intention: "endoscope", motsCles: ["endoscope","inspect","moteur","tuyau"], reponseKey: "chat_endo_reply", reponse: "🔍 L'<strong>Endoscope</strong> (95€).", options: [
        { labelKey: "chat_btn_see", label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-endoscope"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } }
      ] },
      { intention: "beaute", motsCles: ["ongle","ongles","beaute","beauté","vernis","manucure","nail"], reponseKey: "chat_beauty_reply", reponse: "💅 La section <strong>Ongles & Beauté</strong>.", options: [
        { labelKey: "chat_btn_see_section", label: "Voir la section", action: function(){ navigateTo("ongles-beaute"); toggleChatbot(); } }
      ] },
      { intention: "prix", motsCles: ["prix","tarif","combien","cout"], reponseKey: "chat_price_reply", reponse: "💰 Drone: 89€ • Projecteur: 35€ • Pack Hiver: 99,99€ • Endoscope: 95€ • Pack Sécurité Premium: 350€" },
      { intention: "merci", motsCles: ["merci","super","parfait","top"], reponseKey: "chat_thanks_reply", reponse: "Avec plaisir ! 🙏" }
    ];

    function match(t){
      var tx = t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "");
      var mm = null, ms2 = 0;
      intents.forEach(function(item){
        var s = 0;
        item.motsCles.forEach(function(mc){ if (tx.includes(mc)) s += 1; });
        if (s > ms2) { ms2 = s; mm = item; }
      });
      return ms2 > 0 ? mm : null;
    }

    // ==========================================
    // 9. INITIALISATION ET GESTION DES HASH
    // ==========================================
    var ih = window.location.hash.replace("#", "") || "accueil";
    // Ajout de "harcelement" dans la liste des pages normales
    var cp = ["accueil","apropos","vinted","ongles-beaute","parrainage","prevention-cyber","harcelement","mentions","cgv","confidentialite","faq","contact"];
    var ca = ["mots-de-passe","phishing","force-brute","photos-cles","vie-personnelle","loi-hacking","phishing-droit","donnees-personnelles","test-autorise","incident","conclusion-cyber"];
    var ha = ["prevention-moral","prevention-scolaire","prevention-sexuel","prevention-bande","prevention-aide"];
    
    if (ca.indexOf(ih) !== -1) activerPageCyberEtScroll(ih, false);
    else if (ha.indexOf(ih) !== -1) { navigateTo("harcelement"); setTimeout(function(){ scrollToElementWithOffset(document.getElementById(ih), 80); }, 150); }
    else navigateTo(cp.indexOf(ih) !== -1 ? ih : "accueil");

    try {
      var sm = localStorage.getItem("guillet_mode");
      var pl2 = window.matchMedia("(prefers-color-scheme: light)").matches;
      if (sm === "light" || (sm === null && pl2)) document.body.classList.add("light-mode");
    } catch(e){}

    document.querySelectorAll(".summary-cyber a").forEach(function(l){
      l.addEventListener("click", function(e){
        var h = l.getAttribute("href");
        if (h && h.startsWith("#")) { var a = h.substring(1); if (ca.indexOf(a) !== -1) { e.preventDefault(); activerPageCyberEtScroll(a, true); } }
      });
    });
    
    // Liens du sommaire Harcèlement (défilement normal)
    document.querySelectorAll(".prevention-summary a").forEach(function(l){
      l.addEventListener("click", function(e){
        var h = l.getAttribute("href");
        if (h && h.startsWith("#")) { 
          var a = h.substring(1); 
          if (ha.indexOf(a) !== -1) { 
            e.preventDefault(); 
            scrollToElementWithOffset(document.getElementById(a), 80);
            history.pushState(null, null, "#" + a);
          } 
        }
      });
    });

    if (ms) {
      var mt = "quelques-notes.mp3";
      try { mt = localStorage.getItem("guillet_track") || mt; } catch(e){}
      if (ms.querySelector('option[value="' + mt.replace(/"/g,'\\"') + '"]')) {
        ms.value = mt;
        pl.src = "Musique/" + encodeURIComponent(mt);
        pl.load();
      }
    }

    window.addEventListener("popstate", function(){
      var h = window.location.hash.replace("#", "") || "accueil";
      if (ca.indexOf(h) !== -1) activerPageCyberEtScroll(h, false);
      else if (ha.indexOf(h) !== -1) { navigateTo("harcelement"); setTimeout(function(){ scrollToElementWithOffset(document.getElementById(h), 80); }, 150); }
      else if (cp.indexOf(h) !== -1) navigateTo(h);
      else navigateTo("accueil");
    });

    actualiserBoutonHaut();

    document.addEventListener("keydown", function(e){
      var m = document.getElementById("zoomModal");
      if (m && m.style.display === "flex" && e.key === "Escape") fermerZoom();
    });

    var sl = document.querySelectorAll(".hero-slide"); var cs = 0;
    if (sl.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInterval(function(){ cs = (cs + 1) % sl.length; sl.forEach(function(s, p){ s.classList.toggle("active", p === cs); }); }, 5000);
    }

    var chatBadge = document.getElementById("chatbot-badge");
    if (chatBadge) {
      try {
        var chatOpened = localStorage.getItem("guillet_chat_opened");
        chatBadge.style.display = chatOpened ? "none" : "block";
      } catch(e) { chatBadge.style.display = "block"; }
    }

    // Fonctions utilitaires de défilement
    window.scrollToElementWithOffset = function(e, o){
      if (o === undefined) o = 80; if (!e) return;
      window.scrollTo({ top: e.getBoundingClientRect().top + window.pageYOffset - o, behavior: "smooth" });
    };

    window.activerPageCyberEtScroll = function(a, p){
      if (p === undefined) p = true;
      document.querySelectorAll(".page-section").forEach(function(s){ s.classList.remove("active"); });
      var c = document.getElementById("page-prevention-cyber"); if (c) c.classList.add("active");
      try { if (p) history.pushState(null, null, "#" + a); else history.replaceState(null, null, "#" + a); } catch(e){}
      document.querySelectorAll(".nav-link").forEach(function(l){ l.classList.remove("active-link"); if (l.getAttribute("href") === "#prevention-cyber") l.classList.add("active-link"); });
      setTimeout(function(){ var e = document.getElementById(a); if (e) scrollToElementWithOffset(e, 80); }, 50);
      if (typeof window.reapplyLanguage === "function") setTimeout(window.reapplyLanguage, 120);
    };
  });
})();

(function () {
  "use strict";

  // ==========================================
  // 1. CONFIGURATION SUPABASE
  // ==========================================
  const SUPABASE_URL = "https://wrhokeajjmupnxpfurcc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";

  // Vérification que le SDK Supabase est bien chargé
  if (typeof supabase === "undefined" || typeof supabase.createClient !== "function") {
    console.error("[AUTH] Le SDK Supabase n'est pas chargé. Vérifie le CDN dans le <head>.");
    return;
  }

  // ✅ CORRECTION : On crée une seule instance globale pour éviter le warning
  if (!window.supabaseClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  const supabaseClient = window.supabaseClient;

  // ==========================================
  // 2. RÉCUPÉRATION DES ÉLÉMENTS HTML
  // ==========================================
  const authModal      = document.getElementById("authModal");
  const authBtn        = document.getElementById("authBtn");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const authForm       = document.getElementById("authForm");
  const authEmail      = document.getElementById("authEmail");
  const authPassword   = document.getElementById("authPassword");
  const authMessage    = document.getElementById("authMessage");
  const googleAuthBtn  = document.getElementById("googleAuthBtn");
  const authSubmitBtn  = document.getElementById("authSubmitBtn");
  const authNewsletter = document.getElementById("authNewsletter");

  // Éléments du profil
  const profileModal       = document.getElementById("profileModal");
  const closeProfileModal  = document.getElementById("closeProfileModal");
  const profileForm        = document.getElementById("profileForm");
  const profileMessage     = document.getElementById("profileMessage");

  if (!authModal || !authBtn || !authForm) {
    console.warn("[AUTH] Éléments HTML essentiels manquants (modal / bouton / formulaire).");
    return;
  }

  // ==========================================
  // 3. ÉTAT
  // ==========================================
  let currentUser = null;
  let isLoading   = false;

  // ==========================================
  // 4. HELPERS (Messages et chargement)
  // ==========================================
  function showMessage(text, color) {
    if (!authMessage) return;
    authMessage.textContent = text || "";
    authMessage.style.color = color || "#fff";
  }

  function setLoading(loading) {
    isLoading = !!loading;
    if (!authSubmitBtn) return;
    authSubmitBtn.disabled      = loading;
    authSubmitBtn.style.opacity = loading ? "0.6" : "1";
    authSubmitBtn.style.cursor  = loading ? "wait" : "pointer";
    authSubmitBtn.textContent   = loading ? "⏳ Chargement..." : "Se connecter / S'inscrire";
  }

  function openModal() {
    if (!authModal) return;
    authModal.style.display = "flex";
    showMessage("");
    if (currentUser && authEmail) authEmail.value = currentUser.email || "";
  }

  function closeModal() {
    if (!authModal) return;
    authModal.style.display = "none";
    showMessage("");
    if (authForm) authForm.reset();
  }

  function updateButton(user) {
    if (!authBtn) return;
    currentUser = user || null;

    if (user) {
      const label = user.email ? user.email.split("@")[0] : "Mon Compte";
      authBtn.textContent = "👤 " + label;
      authBtn.style.background = "var(--gold)";
      authBtn.style.color      = "#000";
      authBtn.style.border     = "none";
      authBtn.setAttribute("data-logged-in", "true");
    } else {
      authBtn.textContent = "🔐 Connexion";
      authBtn.style.background = "transparent";
      authBtn.style.color      = "var(--gold)";
      authBtn.style.border     = "1px solid var(--gold)";
      authBtn.setAttribute("data-logged-in", "false");
    }
  }

  // ==========================================
  // 5. ÉVÉNEMENTS UI (Clics sur les boutons)
  // ==========================================
  authBtn.addEventListener("click", async () => {
    if (authBtn.getAttribute("data-logged-in") === "true") {
      // Si connecté : on demande s'il veut voir son profil ou se déconnecter
      const choice = confirm("Voulez-vous ouvrir votre profil ?\n(Cliquez sur ANNULER pour vous déconnecter)");
      if (choice) {
        openProfileModal();
      } else {
        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
          supabaseClient.auth.signOut();
        }
      }
    } else {
      openModal();
    }
  });

  if (closeAuthModal) closeAuthModal.addEventListener("click", closeModal);

  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (authModal.style.display === "flex") closeModal();
      if (profileModal && profileModal.style.display === "flex") closeProfileModalFn();
    }
  });

  // ==========================================
  // 6. CONNEXION / INSCRIPTION
  // ==========================================
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const email    = (authEmail.value || "").trim();
    const password = authPassword.value || "";
    const wantsNewsletter = authNewsletter?.checked || false;

    if (!email || !password) {
      showMessage("Veuillez remplir tous les champs.", "var(--red)");
      return;
    }
    if (password.length < 6) {
      showMessage("Le mot de passe doit contenir au moins 6 caractères.", "var(--red)");
      return;
    }

    setLoading(true);
    showMessage("Vérification en cours...", "#fff");

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          // Tentative d'inscription
          const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                newsletter: wantsNewsletter
              }
            }
          });

          if (signUpError) {
            showMessage("Erreur : " + signUpError.message, "var(--red)");
          } else {
            // C'est le Trigger SQL qui gère l'enregistrement dans la table `clients`.
            if (signUpData.session) {
              showMessage("✅ Inscription réussie !", "var(--accent-safe)");
              authForm.reset();
              setTimeout(closeModal, 1500);
            } else {
              showMessage(
                "✅ Inscription réussie ! Vérifie tes e-mails pour confirmer ton compte.",
                "var(--accent-safe)"
              );
              authForm.reset();
            }
          }
        } else if (error.message.includes("Email not confirmed")) {
          showMessage(
            "📧 Ton e-mail n'est pas encore confirmé. Vérifie ta boîte de réception.",
            "var(--neon-gold)"
          );
        } else {
          showMessage("Erreur : " + error.message, "var(--red)");
        }
      } else {
        // Connexion réussie
        showMessage("✅ Connexion réussie !", "var(--accent-safe)");
        authForm.reset();
        setTimeout(closeModal, 1500);
      }
    } catch (err) {
      console.error("[AUTH] Erreur inattendue :", err);
      showMessage("Erreur inattendue. Réessaie dans un instant.", "var(--red)");
    } finally {
      setLoading(false);
    }
  });

  // ==========================================
  // 7. CONNEXION GOOGLE
  // ==========================================
  if (googleAuthBtn) {
    googleAuthBtn.addEventListener("click", async () => {
      showMessage("Redirection vers Google...", "#fff");

      const redirectUrl = window.location.origin + window.location.pathname;

      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl }
      });

      if (error) {
        showMessage("Erreur Google : " + error.message, "var(--red)");
      }
    });
  }

  // ==========================================
  // 8. ÉCOUTE DES CHANGEMENTS D'AUTH
  // ==========================================
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("[AUTH] Événement :", event);
    const user = session ? session.user : null;
    updateButton(user);

    if (event === "SIGNED_IN" && authModal.style.display === "flex") {
      setTimeout(closeModal, 800);
    }
  });

  // ==========================================
  // 9. INITIALISATION
  // ==========================================
  (async () => {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      updateButton(session ? session.user : null);
    } catch (err) {
      console.error("[AUTH] Erreur d'initialisation :", err);
      updateButton(null);
    }
  })();

  // ==========================================
  // 10. GESTION DU PROFIL CLIENT
  // ==========================================
  function openProfileModal() {
    if (!profileModal) return;
    profileModal.style.display = "flex";
    if (profileMessage) profileMessage.textContent = "";
    
    loadProfileData();
    loadOrders(); 
  }

  function closeProfileModalFn() {
    if (!profileModal) return;
    profileModal.style.display = "none";
    if (profileForm) profileForm.reset();
  }

  async function loadProfileData() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const { data, error } = await supabaseClient
      .from('clients')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      document.getElementById("profileNom").value = data.nom_complet || "";
      document.getElementById("profileTel").value = data.telephone || "";
      document.getElementById("profileAdresse").value = data.adresse || "";
      document.getElementById("profileCP").value = data.code_postal || "";
      document.getElementById("profileVille").value = data.ville || "";
    }
  }

  if (closeProfileModal) {
    closeProfileModal.addEventListener("click", closeProfileModalFn);
  }

  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) closeProfileModalFn();
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      profileMessage.textContent = "Enregistrement en cours...";
      profileMessage.style.color = "#fff";

      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const updates = {
        nom_complet: document.getElementById("profileNom").value,
        telephone: document.getElementById("profileTel").value,
        adresse: document.getElementById("profileAdresse").value,
        code_postal: document.getElementById("profileCP").value,
        ville: document.getElementById("profileVille").value
      };

      const { error } = await supabaseClient
        .from('clients')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        profileMessage.textContent = "Erreur : " + error.message;
        profileMessage.style.color = "var(--red)";
      } else {
        profileMessage.textContent = "✅ Profil mis à jour avec succès !";
        profileMessage.style.color = "var(--accent-safe)";
        setTimeout(() => { closeProfileModalFn(); }, 2000);
      }
    });
  }

  // ==========================================
  // 11. AFFICHAGE DES COMMANDES
  // ==========================================
  async function loadOrders() {
    const ordersList = document.getElementById("ordersList");
    if (!ordersList) return;

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const { data, error } = await supabaseClient
      .from('commandes')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      ordersList.innerHTML = `<p style="color:var(--red);">Erreur lors du chargement des commandes.</p>`;
      return;
    }

    if (!data || data.length === 0) {
      ordersList.innerHTML = `<p style="color:#aaa;">Vous n'avez pas encore passé de commande.</p>`;
      return;
    }

    let html = "";
    data.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString('fr-FR');
      
      let produitsHtml = "";
      if (order.details_produits && Array.isArray(order.details_produits)) {
        order.details_produits.forEach(prod => {
          produitsHtml += `<li>${prod.quantite || 1}x ${prod.nom || 'Produit'} - ${prod.prix_unitaire || 0} €</li>`;
        });
      } else {
        produitsHtml = "<li>Produits (détails indisponibles)</li>";
      }

      // ✅ AJOUT DU NUMÉRO DE SUIVI ICI
      let trackingHtml = '';
      if (order.numero_suivi) {
        trackingHtml = `<div style="margin-top: 8px; padding: 8px; background: rgba(255,215,0,0.1); border-radius: 4px; border-left: 3px solid var(--gold); font-size: 0.85rem;">
          <span style="color:#fff; font-weight:bold;">📦 Suivi : </span>
          ${order.lien_suivi ? `<a href="${order.lien_suivi}" target="_blank" rel="noopener" style="color:var(--gold); text-decoration:underline;">${order.numero_suivi}</a>` : `<span style="color:var(--gold);">${order.numero_suivi}</span>`}
        </div>`;
      }

      html += `
        <div style="background:#111; border:1px solid #333; padding:10px; border-radius:5px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <strong style="color:var(--gold);">Commande du ${date}</strong>
            <span style="color:var(--accent-safe); font-weight:bold;">${order.montant_total} €</span>
          </div>
          <ul style="margin-left: 20px; margin-bottom: 5px; color: #ccc;">
            ${produitsHtml}
          </ul>
          <div style="font-size:0.8rem; color:#888; margin-bottom:5px;">Statut : <strong style="color:#fff;">${order.statut || 'En attente'}</strong></div>
          ${trackingHtml}
        </div>
      `;
    });

    ordersList.innerHTML = html;
  }

})();

(function () {
  // ✅ CORRECTION : On utilise la connexion globale créée par auth.js
  const supabaseClient = window.supabaseClient;

  if (!supabaseClient) {
    console.error("[PRODUITS] Supabase n'est pas initialisé. Vérifiez auth.js.");
    return;
  }

  // ============================================================
  // 1. DONNÉES DES PRODUITS & TEXTES AMÉLIORÉS
  // ============================================================
  const produitsHTML = {
    // --------------------------------------------------------
    // DRONE
    // --------------------------------------------------------
    "price_1URq5TRNu37iEZT9kBjY7X1G": {
      name: "KY108 Drone",
      price: "89.00",
      image: "photo1.png",
      html: `
    <div class="product-card" id="produit-drone" data-name="Drone Ky108" data-price="89" tabindex="-1">
      <div class="product-images">
        <img src="photo1.png" class="product-image" alt="Drone KY108 — vue principale" loading="lazy" decoding="async" data-zoom>
        <img src="photo2.png" class="product-image" alt="Drone KY108 — vue secondaire" loading="lazy" decoding="async" data-zoom>
      </div>
      <div class="product-info">
        <span class="badge" data-i18n="badge_new">NOUVEAU</span>
        <h3 class="product-title" data-i18n="drone_title">KY108 DRONE – L'ŒIL DU FUTUR</h3>
        <p class="tagline" data-i18n="drone_tagline">Dominez le ciel. Captures 4K. Précision chirurgicale.</p>
        <div class="price"><span class="promo">89 €</span></div>
        <p class="desc" data-i18n="drone_desc">Conçu pour les créateurs, explorateurs et pilotes exigeants. Prenez le contrôle des airs et ramenez des images spectaculaires avec une stabilité inégalée.</p>
        
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-drone" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-drone">
          <h4 data-i18n="full_desc">Description complète</h4>
          <p data-i18n="drone_full_1">Le KY108 n'est pas un simple drone : c'est un outil de vision, un instrument de maîtrise, un allié aérien qui transforme chaque vol en expérience futuriste.</p>
          <p data-i18n="drone_full_2">Grâce à sa double caméra HD, son zoom 90x, son évitement d'obstacles omnidirectionnel et ses moteurs brushless, il vous offre une stabilité et une puissance que peu de drones de sa catégorie peuvent atteindre.</p>
          <p data-i18n="drone_full_3">Pliable, compact, intelligent : le KY108 est prêt à vous suivre partout.</p>
          <h4 data-i18n="details">Détails</h4>
          <ul>
            <li data-i18n="drone_detail_1">Double caméra HD avec zoom 90x</li>
            <li data-i18n="drone_detail_2">Évitement d'obstacles omnidirectionnel</li>
            <li data-i18n="drone_detail_3">Moteur brushless puissant et durable</li>
            <li data-i18n="drone_detail_4">Télécommande avec écran FPV intégré</li>
            <li data-i18n="drone_detail_5">Drone pliable, facile à transporter</li>
          </ul>
          <h4 data-i18n="utility">Utilité</h4>
          <ul>
            <li data-i18n="drone_util_1">Filmer des paysages en haute qualité</li>
            <li data-i18n="drone_util_2">Créer du contenu pour TikTok et Instagram</li>
            <li data-i18n="drone_util_3">Surveiller une zone dans le respect de la vie privée</li>
            <li data-i18n="drone_util_4">Apprendre le pilotage de drone</li>
            <li data-i18n="drone_util_5">Réaliser des photos aériennes professionnelles</li>
          </ul>
          <h4 data-i18n="how_to_use">Utilisation</h4>
          <ol>
            <li data-i18n="drone_use_1">Déplier le drone et vérifier les hélices.</li>
            <li data-i18n="drone_use_2">Allumer la télécommande.</li>
            <li data-i18n="drone_use_3">Connecter la caméra HD.</li>
            <li data-i18n="drone_use_4">Décoller en mode assisté.</li>
            <li data-i18n="drone_use_5">Piloter via l'écran FPV intégré.</li>
          </ol>
          <p data-i18n="drone_use_note">Pensez à respecter les règles de vol applicables et la vie privée des personnes filmées.</p>
        </div>
        
        {{STOCK}}
        {{BOUTON}}

        <!-- VIDÉO PLACÉE TOUT EN BAS -->
        <div class="drone-video-wrapper">
          <video src="publicite_drone.mp4" controls preload="none" playsinline class="video-full" aria-label="Publicité du drone KY108" poster="photo1.png">
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </div>
      </div>
    </div>
      `
    },

    // --------------------------------------------------------
    // PROJECTEUR
    // --------------------------------------------------------
    "price_1URs5zRNu37iEZT9MkNDMhFW": {
      name: "Projecteur LED rotatif",
      price: "35.00",
      image: "produit.png",
      html: `
    <div class="product-card" id="produit-projecteur" data-name="Projecteur LED rotatif solaire" data-price="35" tabindex="-1">
      <div class="product-images">
        <img src="produit.png" class="product-image" alt="Projecteur LED solaire rotatif" loading="lazy" decoding="async" data-zoom>
        <img src="produit1.png" class="product-image" alt="Deuxième vue du projecteur LED solaire" loading="lazy" decoding="async" data-zoom>
      </div>
      <div class="product-info">
        <h3 class="product-title" data-i18n="proj_title">Projecteur LED rotatif solaire</h3>
        <p class="tagline" data-i18n="proj_tagline">Éclairez vos nuits. Zéro facture d'électricité.</p>
        <div class="price">35,00 €</div>
        <p class="desc" data-i18n="proj_desc">Illuminez votre extérieur en toute autonomie. Projecteur LED avec détecteur de mouvement PIR et panneaux solaires orientables pour une sécurité optimale.</p>
        
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-projecteur" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-projecteur">
          <h4 data-i18n="full_desc">Description complète</h4>
          <p data-i18n="proj_full_1">Projecteur LED extérieur alimenté par panneau solaire, équipé d'un détecteur PIR et de panneaux rotatifs pour s'adapter à tous les angles de votre maison.</p>
          <h4 data-i18n="utility">Utilité</h4>
          <ul>
            <li data-i18n="proj_util_1">Sécuriser une entrée</li>
            <li data-i18n="proj_util_2">Éclairer une zone sombre</li>
            <li data-i18n="proj_util_3">Dissuader les intrusions</li>
            <li data-i18n="proj_util_4">Fonctionne sans électricité</li>
          </ul>
          <h4 data-i18n="how_to_use">Utilisation</h4>
          <ul>
            <li data-i18n="proj_use_1">Fixer le projecteur sur un mur</li>
            <li data-i18n="proj_use_2">Orienter les panneaux LED</li>
            <li data-i18n="proj_use_3">Régler le détecteur PIR</li>
            <li data-i18n="proj_use_4">Laisser charger le panneau solaire</li>
          </ul>
        </div>
        
        {{STOCK}}
        {{BOUTON}}
      </div>
    </div>
      `
    },

    // --------------------------------------------------------
    // PACK HIVER
    // --------------------------------------------------------
    "price_1URsA0RNu37iEZT9Yq7pXGpL": {
      name: "Winter Survival Pack",
      price: "99.99",
      image: "Winter-Survival.png",
      html: `
    <div class="product-card" id="produit-pack-hiver" data-name="Winter Survival Pack – Édition Premium" data-price="99.99" tabindex="-1">
      <div class="product-images">
        <img src="Winter-Survival.png" class="product-image" alt="Winter Survival Pack Édition Premium" loading="lazy" decoding="async" data-zoom>
      </div>
      <div class="product-info">
        <span class="badge" data-i18n="badge_winter">PACK HIVER</span>
        <h3 class="product-title" data-i18n="pack_title">Winter Survival Pack – Édition Premium</h3>
        <p class="tagline" data-i18n="pack_tagline">L'autonomie totale face aux éléments.</p>
        <div class="price">99,99 €</div>
        <p class="desc" data-i18n="pack_desc">Ne laissez plus l'hiver dicter vos limites. Le pack ultime pour rester au chaud, éclairé et parfaitement équipé, même lorsque le réseau lâche.</p>
        
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-pack" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-pack">
          <h4 data-i18n="pack_item_1">🧤 1. Gants Chauffants Électriques Intelligents (USB)</h4>
          <p data-i18n="pack_item_1_desc">Gants d'hiver haute performance, conçus pour offrir une chaleur immédiate et contrôlée.</p>
          <ul>
            <li data-i18n="pack_item_1_b1">Chauffage double face sur la paume</li>
            <li data-i18n="pack_item_1_b2">Trois niveaux de température réglables</li>
            <li data-i18n="pack_item_1_b3">Design tactile</li>
            <li data-i18n="pack_item_1_b4">Fonctionnement via interface USB, compatible powerbank</li>
          </ul>
          <h4 data-i18n="pack_item_2">🔦 2. Torches LED Puissantes – Rechargeables USB (x2)</h4>
          <p data-i18n="pack_item_2_desc">Lampe tactique ultra lumineuse pour coupures de courant, déplacements nocturnes, voiture.</p>
          <ul>
            <li data-i18n="pack_item_2_b1">7 modes de lumière</li>
            <li data-i18n="pack_item_2_b2">Rechargeable par USB</li>
            <li data-i18n="pack_item_2_b3">Batterie intégrée</li>
            <li data-i18n="pack_item_2_b4">Résistante aux intempéries</li>
          </ul>
          <h4 data-i18n="pack_item_3">🔋 3. Batterie Externe 12 000 mAh – Spéciale Chauffage USB</h4>
          <p data-i18n="pack_item_3_desc">Powerbank haute capacité compatible avec tous les appareils USB et vêtements chauffants.</p>
          <ul>
            <li data-i18n="pack_item_3_b1">12 000 mAh → autonomie longue durée</li>
            <li data-i18n="pack_item_3_b2">Sortie 5V 2.4A</li>
            <li data-i18n="pack_item_3_b3">Compatible iPhone / Samsung / iPad</li>
          </ul>
          <h4 data-i18n="pack_item_4">🛏️ 4. Sac de Couchage Momie Multi-Saison (210 × 75 cm)</h4>
          <p data-i18n="pack_item_4_desc">Sac de couchage léger, compact et confortable, idéal pour le camping et les situations d'urgence.</p>
          <ul>
            <li data-i18n="pack_item_4_b1">Capuche intégrée</li>
            <li data-i18n="pack_item_4_b2">Polyester 170T robuste</li>
            <li data-i18n="pack_item_4_b3">Pliable en couette / couverture</li>
            <li data-i18n="pack_item_4_b4">Sac de rangement inclus</li>
          </ul>
        </div>
        
        {{STOCK}}
        {{BOUTON}}
      </div>
    </div>
      `
    },

    // --------------------------------------------------------
    // ENDOSCOPE
    // --------------------------------------------------------
    "price_1US30aRNu37iEZT9EGBkxLCy": {
      name: "Endoscope caméra d'inspection",
      price: "95.00",
      image: "photo-endoscope.png",
      html: `
    <div class="product-card" id="produit-endoscope" data-name="Endoscope caméra d'inspection avec écran" data-price="95" tabindex="-1">
      <div class="product-images">
        <img src="photo-endoscope.png" class="product-image" alt="Endoscope caméra d'inspection avec écran" loading="lazy" decoding="async" data-zoom>
      </div>
      <div class="product-info">
        <span class="badge" data-i18n="badge_new">NOUVEAU</span>
        <h3 class="product-title" data-i18n="endo_title">Endoscope d'Inspection HD</h3>
        <p class="tagline" data-i18n="endo_tagline">Voyez l'invisible. Ne ratez plus aucun détail.</p>
        <div class="price">95 €</div>
        <p class="desc" data-i18n="endo_desc">L'outil indispensable des professionnels et bricoleurs. Écran intégré 4,3", câble semi-rigide de 10 m et caméra 1080P étanche (IP68). Explorez l'inaccessible avec une clarté absolue.</p>
        
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-endoscope" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-endoscope">
          <h4 data-i18n="full_desc">Description complète</h4>
          <p data-i18n="endo_full_1">L'outil indispensable pour inspecter les zones difficiles d'accès : conduits, moteurs, tuyaux, gaines, installations techniques ou espaces étroits.</p>
          <h4 data-i18n="utility">Utilité</h4>
          <ul>
            <li data-i18n="endo_util_1">Inspection de moteurs, conduits et tuyaux</li>
            <li data-i18n="endo_util_2">Travaux domestiques : plomberie, ventilation, câblage</li>
            <li data-i18n="endo_util_3">Diagnostic mécanique rapide</li>
            <li data-i18n="endo_util_4">Contrôle visuel dans les zones sombres</li>
          </ul>
          <h4 data-i18n="features">Caractéristiques</h4>
          <ul>
            <li data-i18n="endo_feat_1">Résolution Full HD 1080P</li>
            <li data-i18n="endo_feat_2">Caméra 2.0 MP avec éclairage LED réglable</li>
            <li data-i18n="endo_feat_3">Écran intégré 4,3 pouces</li>
            <li data-i18n="endo_feat_4">Câble semi-rigide de 10 mètres</li>
            <li data-i18n="endo_feat_5">Certification IP68 waterproof</li>
          </ul>
        </div>
        
        {{STOCK}}
        {{BOUTON}}
      </div>
    </div>
      `
    },

    // --------------------------------------------------------
    // PACK SECURITE
    // --------------------------------------------------------
    "price_1UV4VuRNu37iEZT9QXBQFhLp": {
      name: "Pack Sécurité Premium",
      price: "379.00",
      image: "Pack-Sécu.jpg",
      html: `
    <div class="product-card" id="produit-pack-securite" data-name="Pack Sécurité Premium" data-price="379" tabindex="-1">
      <div class="product-images">
        <img src="Pack-Sécu.jpg" class="product-image" alt="Pack Sécurité Premium — Alarme Tiiwee + Caméra Tapo C245D + 4 capteurs SONOFF" loading="lazy" decoding="async" data-zoom>
      </div>
      <div class="product-info">
        <span class="badge" data-i18n="badge_security">🛡️ PACK SÉCURITÉ</span>
        <h3 class="product-title" data-i18n="pack_secu_title">Pack Sécurité Premium</h3>
        <p class="tagline" data-i18n="pack_secu_tagline">Votre forteresse numérique et physique.</p>
        <div class="price">379 €</div>
        <p class="desc" data-i18n="pack_secu_desc">Alarme Tiiwee, caméra Tapo IA et 4 capteurs SONOFF. Protégez votre foyer ou votre commerce avec un système complet, intelligent et prêt à l'emploi. Installation en 10 minutes.</p>
        
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-pack-secu" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-pack-secu">
          <h4 data-i18n="full_desc">Description complète</h4>
          <p data-i18n="pack_secu_full_1">Le Pack Sécurité Premium réunit tout ce qu'il faut pour sécuriser une maison, un appartement, un commerce, un garage, une cave ou un bureau — sans compétence technique, sans câblage complexe. Tout est déjà configuré : vous installez, vous connectez, c'est prêt en 10 minutes.</p>
          <h4 data-i18n="pack_secu_contents">📦 Contenu du pack (exact)</h4>
          <ul>
            <li data-i18n="pack_secu_c1">1 Alarme Tiiwee (sirène + télécommandes)</li>
            <li data-i18n="pack_secu_c2">1 Caméra IA TP-Link Tapo C245D (vision nocturne + détection)</li>
            <li data-i18n="pack_secu_c3">4 Capteurs d'ouverture SONOFF (portes / fenêtres / garage / balcon)</li>
            <li data-i18n="pack_secu_c4">Notice d'installation</li>
            <li data-i18n="pack_secu_c5">Assistance 30 jours</li>
          </ul>
          <h4 data-i18n="features">Fonctionnalités</h4>
          <ul>
            <li data-i18n="pack_secu_f1">Alertes instantanées sur smartphone</li>
            <li data-i18n="pack_secu_f2">Détection intelligente (IA)</li>
            <li data-i18n="pack_secu_f3">Sirène puissante</li>
            <li data-i18n="pack_secu_f4">Vision nocturne HD</li>
            <li data-i18n="pack_secu_f5">Surveillance en direct</li>
            <li data-i18n="pack_secu_f6">Capteurs haute précision</li>
          </ul>
          <h4 data-i18n="pack_secu_secure_for">Sécurise</h4>
          <ul>
            <li data-i18n="pack_secu_s1">🏠 Maison</li>
            <li data-i18n="pack_secu_s2">🏢 Appartement</li>
            <li data-i18n="pack_secu_s3">🏪 Commerce</li>
            <li data-i18n="pack_secu_s4">🚗 Garage</li>
            <li data-i18n="pack_secu_s5">🕳️ Cave</li>
            <li data-i18n="pack_secu_s6">💼 Bureau</li>
          </ul>
          <h4 data-i18n="how_to_use">Installation</h4>
          <ol>
            <li data-i18n="pack_secu_use_1">Brancher l'alarme Tiiwee et la caméra Tapo.</li>
            <li data-i18n="pack_secu_use_2">Coller les 4 capteurs SONOFF sur portes / fenêtres / garage / balcon.</li>
            <li data-i18n="pack_secu_use_3">Connecter les appareils à l'application (Tapo + SONOFF).</li>
            <li data-i18n="pack_secu_use_4">Configurer les alertes smartphone.</li>
            <li data-i18n="pack_secu_use_5">Tester sirène et détection. C'est prêt en 10 minutes.</li>
          </ol>
          <h4 data-i18n="pack_secu_warranty_support">Garantie & Support</h4>
          <ul>
            <li data-i18n="pack_secu_ws1">Garantie 24 mois</li>
            <li data-i18n="pack_secu_ws2">Support client 30 jours</li>
            <li data-i18n="pack_secu_ws3">Assistance installation si besoin</li>
          </ul>
          <h4 data-i18n="pack_secu_why">Pourquoi ce pack ?</h4>
          <p data-i18n="pack_secu_why_text">Parce qu'il protège toute votre habitation avec une caméra IA, une alarme complète, 4 capteurs et un système prêt à l'emploi. Pack clé en main — idéal pour particuliers et petits commerces.</p>
        </div>
        
        {{STOCK}}
        {{BOUTON}}
      </div>
    </div>
      `
    }
  };

  // ============================================================
  // 2. AFFICHAGE INSTANTANÉ
  // ============================================================
  function renderProductsInstantly() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    let finalHTML = "";
    
    for (const [priceId, data] of Object.entries(produitsHTML)) {
      // Bouton par défaut (Panier)
      const defaultBtn = `<button type="button" class="payment-btn" data-lecart-add data-stripe-price-id="${priceId}" data-product-name="${data.name}" data-product-price="${data.price}" data-product-image="${data.image}">💳 Ajouter au panier — ${parseFloat(data.price)} €</button>`;
      
      // Badge de stock initial
      const tempStock = `<div class="stock-badge" data-id="${priceId}">⏳ Vérification du stock...</div>`;
      
      // Remplacement des variables dans le HTML
      finalHTML += data.html.replace("{{STOCK}}", tempStock).replace("{{BOUTON}}", defaultBtn);
    }
    
    grid.innerHTML = finalHTML;
    
    // Initialisation du panier LeCart
    if (window.LeCart && typeof window.LeCart.init === 'function') {
      window.LeCart.init();
    }
  }

  // ============================================================
  // 3. MISE À JOUR DES STOCKS
  // ============================================================
  async function checkStocks() {
    try {
      const { data: dbProduits, error } = await supabaseClient
        .from('produits')
        .select('stripe_price_id, stock');

      if (error || !dbProduits) return;

      dbProduits.forEach(prod => {
        const stockEl = document.querySelector(`.stock-badge[data-id="${prod.stripe_price_id}"]`);
        const btnEl = document.querySelector(`button[data-stripe-price-id="${prod.stripe_price_id}"]`);

        if (stockEl) {
          if (prod.stock > 5) {
            // Stock confortable
            stockEl.className = "stock-badge stock-in";
            stockEl.innerHTML = `🟢 En stock (${prod.stock} disponibles)`;
          } else if (prod.stock > 0 && prod.stock <= 5) {
            // Stock faible (Urgence)
            stockEl.className = "stock-badge stock-low";
            stockEl.innerHTML = `🟠 Plus que ${prod.stock} en stock !`;
          } else {
            // Rupture de stock
            stockEl.className = "stock-badge stock-out";
            stockEl.innerHTML = `🔴 Rupture de stock`;
          }
        }

        // Désactivation du bouton si rupture de stock
        if (prod.stock <= 0 && btnEl) {
          btnEl.disabled = true;
          btnEl.classList.remove("payment-btn"); // On retire le style doré
          btnEl.classList.add("btn-out-of-stock"); // On ajoute le style rouge/transparent
          btnEl.innerHTML = "❌ Produit épuisé";
          btnEl.removeAttribute("data-lecart-add"); // On empêche l'ajout au panier
        }
      });
    } catch (err) {
      console.error("[PRODUITS] Erreur de vérification des stocks:", err);
    }
  }

  // Lancement au chargement de la page
  document.addEventListener("DOMContentLoaded", () => {
    renderProductsInstantly();
    checkStocks();
  });

})();