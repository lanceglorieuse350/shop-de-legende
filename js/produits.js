(function () {
  const SUPABASE_URL = "https://wrhokeajjmupnxpfucc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 1. On stocke tout votre design original ici
  const produitsHTML = {
    // DRONE
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
        <h3 class="product-title" data-i18n="drone_title">KY108 DRONE – L'ŒIL DU FUTUR EST ENTRE VOS MAINS</h3>
        <p class="tagline" data-i18n="drone_tagline">Dominez le ciel… ou il vous dominera. Soyez des yeux sans avoir besoin de voir.</p>
        <div class="price"><span class="promo">89 €</span></div>
        <p class="desc" data-i18n="drone_desc">Un drone conçu pour les créateurs, les explorateurs et les pilotes ambitieux. Capturez le monde avec une précision chirurgicale.</p>
        <div class="drone-video-wrapper">
          <video src="publicite_drone.mp4" controls preload="metadata" playsinline class="video-full" aria-label="Publicité du drone KY108">
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </div>
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
        {{BOUTON}}
      </div>
    </div>
      `
    },
    // PROJECTEUR
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
        <div class="price">35,00 €</div>
        <p class="desc" data-i18n="proj_desc">Projecteur LED extérieur solaire avec détecteur PIR et panneaux rotatifs.</p>
        <button type="button" class="more" data-toggle-details aria-expanded="false" aria-controls="details-projecteur" data-i18n="see_more">Voir plus</button>
        <div class="details" id="details-projecteur">
          <h4 data-i18n="full_desc">Description complète</h4>
          <p data-i18n="proj_full_1">Projecteur LED extérieur alimenté par panneau solaire, équipé d'un détecteur PIR et de panneaux rotatifs.</p>
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
        {{BOUTON}}
      </div>
    </div>
      `
    },
    // PACK HIVER
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
        <div class="price">99,99 €</div>
        <p class="desc" data-i18n="pack_desc">Le pack ultime pour affronter l'hiver, rester au chaud, éclairé et autonome.</p>
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
        {{BOUTON}}
      </div>
    </div>
      `
    },
    // ENDOSCOPE
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
        <h3 class="product-title" data-i18n="endo_title">Endoscope caméra d'inspection avec écran</h3>
        <div class="price">95 €</div>
        <p class="desc" data-i18n="endo_desc">Endoscope d'inspection 1080P avec écran intégré 4,3 pouces, câble semi-rigide de 10 mètres, caméra 2.0 MP, éclairage LED réglable et conception IP68 waterproof.</p>
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
        {{BOUTON}}
      </div>
    </div>
      `
    },
    // PACK SECURITE
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
        <p class="tagline" data-i18n="pack_secu_tagline">Protection complète. Installation en 10 minutes. Clé en main.</p>
        <div class="price">379 €</div>
        <p class="desc" data-i18n="pack_secu_desc">Protégez toute votre habitation avec une caméra IA, une alarme complète, 4 capteurs et un système prêt à l'emploi. Idéal pour particuliers et petits commerces.</p>
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
        {{BOUTON}}
      </div>
    </div>
      `
    }
  };

  async function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    // On récupère les stocks depuis Supabase
    const { data: dbProduits } = await supabaseClient.from('produits').select('*');
    const stockMap = {};
    if (dbProduits) {
      dbProduits.forEach(p => stockMap[p.stripe_price_id] = p.stock);
    }

    let finalHTML = "";

    // On boucle sur vos produits et on remplace {{BOUTON}} par le bon bouton
    for (const [priceId, data] of Object.entries(produitsHTML)) {
      const stock = stockMap[priceId];
      let boutonHTML = "";

      if (stock !== undefined && stock <= 0) {
        // Si le stock est à 0 : on grise le bouton
        boutonHTML = `<button type="button" class="payment-btn" disabled style="background:#555; cursor:not-allowed; border: none;">❌ Rupture de stock</button>`;
      } else {
        // Sinon : bouton normal
        boutonHTML = `<button type="button" class="payment-btn" data-lecart-add data-stripe-price-id="${priceId}" data-product-name="${data.name}" data-product-price="${data.price}" data-product-image="${data.image}">💳 Ajouter au panier — ${parseFloat(data.price)} €</button>`;
      }

      finalHTML += data.html.replace("{{BOUTON}}", boutonHTML);
    }

    grid.innerHTML = finalHTML;
    
    // On réinitialise LeCart pour que les nouveaux boutons fonctionnent
    if (window.LeCart && typeof window.LeCart.init === 'function') {
      window.LeCart.init();
    }
  }

  document.addEventListener("DOMContentLoaded", renderProducts);
})();