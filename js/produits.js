(function () {
  // ✅ On utilise la connexion globale créée par auth.js
  const supabaseClient = window.supabaseClient;

  if (!supabaseClient) {
    console.warn("[PRODUITS] Supabase n'est pas initialisé. Les stocks ne seront pas vérifiés.");
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
      
      // ✅ CORRECTION 1 : On multiplie par 100 pour envoyer le prix en centimes à Stripe (8900 au lieu de 89.00)
      const priceInCents = Math.round(parseFloat(data.price) * 100);

      // Bouton par défaut (Panier)
      const defaultBtn = `<button type="button" class="payment-btn" data-lecart-add data-stripe-price-id="${priceId}" data-product-name="${data.name}" data-product-price="${priceInCents}" data-product-image="${data.image}">💳 Ajouter au panier — ${parseFloat(data.price)} €</button>`;
      
      // Badge de stock initial
      const tempStock = `<div class="stock-badge" data-id="${priceId}">⏳ Vérification du stock...</div>`;
      
      // Remplacement des variables dans le HTML
      finalHTML += data.html.replace("{{STOCK}}", tempStock).replace("{{BOUTON}}", defaultBtn);
    }
    
    grid.innerHTML = finalHTML;
    
    // ❌ SUPPRIMÉ : window.LeCart.init(); (C'est jslecart-init.js qui gère ça maintenant)
  }

  // ============================================================
  // 3. MISE À JOUR DES STOCKS
  // ============================================================
  async function checkStocks() {
    // Si Supabase n'est pas chargé, on affiche un stock par défaut
    if (!supabaseClient) {
      document.querySelectorAll(".stock-badge").forEach(el => {
        el.className = "stock-badge";
        el.textContent = "📦 Disponibilité à confirmer";
      });
      return;
    }

    try {
      const { data: dbProduits, error } = await supabaseClient
        .from('produits')
        .select('stripe_price_id, stock');

      if (error || !dbProduits) return;

      const seen = new Set();

      dbProduits.forEach(prod => {
        seen.add(prod.stripe_price_id);
        const stockEl = document.querySelector(`.stock-badge[data-id="${prod.stripe_price_id}"]`);
        const btnEl = document.querySelector(`button[data-stripe-price-id="${prod.stripe_price_id}"]`);

        if (stockEl) {
          if (prod.stock > 5) {
            stockEl.className = "stock-badge stock-in";
            stockEl.innerHTML = `🟢 En stock (${prod.stock} disponibles)`;
          } else if (prod.stock > 0 && prod.stock <= 5) {
            stockEl.className = "stock-badge stock-low";
            stockEl.innerHTML = `🟠 Plus que ${prod.stock} en stock !`;
          } else {
            stockEl.className = "stock-badge stock-out";
            stockEl.innerHTML = `🔴 Rupture de stock`;
          }
        }

        if (prod.stock <= 0 && btnEl) {
          btnEl.disabled = true;
          btnEl.classList.remove("payment-btn");
          btnEl.classList.add("btn-out-of-stock");
          btnEl.innerHTML = "❌ Produit épuisé";
          btnEl.removeAttribute("data-lecart-add");
        }
      });

      // Fallback pour les produits absents de la DB
      document.querySelectorAll(".stock-badge").forEach(el => {
        if (!seen.has(el.dataset.id)) {
          el.className = "stock-badge";
          el.textContent = "📦 Disponibilité à confirmer";
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